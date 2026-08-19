import assert from "node:assert/strict";
import test from "node:test";

import Expedition from "./expedition.js";

function threePlayerGame(theme = "orerun") {
  const game = Expedition.createGame("p1", "가", theme);
  Expedition.addPlayer(game, "p2", "나");
  Expedition.addPlayer(game, "p3", "다");
  return game;
}

// startMatch 는 곧바로 첫 카드를 뒤집으므로, 검사하려는 상황만 남기고 판을 비운다.
// deck 은 pop 으로 뽑기 때문에 마지막 원소가 먼저 나온다.
function stage(game, cards) {
  game.deck = [...cards].reverse();
  game.revealed = [];
  game.hazardCounts = {};
  game.path = { gems: 0, relics: [] };
  game.lastSplit = null;
  game.lastReturn = null;
  game.players.forEach(player => {
    player.carrying = 0;
    player.inCave = true;
    player.decision = null;
  });
  game.phase = "deciding";
}

function allContinue(game) {
  game.players.filter(player => player.inCave).forEach(player => {
    Expedition.decide(game, player.id, "continue");
  });
}

test("정원 미만이면 시작하지 못한다", () => {
  const game = Expedition.createGame("p1", "가");
  Expedition.addPlayer(game, "p2", "나");
  assert.equal(Expedition.startMatch(game).ok, false);
  Expedition.addPlayer(game, "p3", "다");
  assert.equal(Expedition.startMatch(game).ok, true);
});

test("보물은 탐사 인원으로 나누고 나머지는 바닥에 남는다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  Expedition.addPlayer(game, "p4", "라");
  // 시작 후에는 입장이 막히므로 4인 분배는 별도 게임으로 확인한다.
  assert.equal(game.players.length, 3);

  stage(game, [{ kind: "treasure", value: 14 }]);
  allContinue(game);

  assert.deepEqual(game.lastSplit, { total: 14, explorers: 3, each: 4, remainder: 2 });
  assert.equal(game.path.gems, 2);
  game.players.forEach(player => assert.equal(player.carrying, 4));
});

test("나누어떨어지면 바닥에 아무것도 남지 않는다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  stage(game, [{ kind: "treasure", value: 9 }]);
  allContinue(game);

  assert.deepEqual(game.lastSplit, { total: 9, explorers: 3, each: 3, remainder: 0 });
  assert.equal(game.path.gems, 0);
});

test("같은 위험이 두 번 나오면 남아 있던 사람은 빈손이 되고 위험 카드 한 장이 게임에서 빠진다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  const poolBefore = game.pool.filter(card => card.kind === "hazard" && card.hazard === 0).length;

  stage(game, [
    { kind: "treasure", value: 12 },
    { kind: "hazard", hazard: 0 },
    { kind: "hazard", hazard: 0 }
  ]);
  allContinue(game); // 보물 12 공개
  assert.equal(game.players[0].carrying, 4);
  allContinue(game); // 위험 1회차 — 경고만
  assert.equal(game.phase, "deciding");
  allContinue(game); // 위험 2회차 — 라운드 종료

  assert.equal(game.roundReason, "hazard");
  assert.equal(game.roundHazard, 0);
  game.players.forEach(player => {
    assert.equal(player.carrying, 0);
    assert.equal(player.bank, 0);
    assert.equal(player.inCave, false);
  });
  const poolAfter = game.pool.filter(card => card.kind === "hazard" && card.hazard === 0).length;
  assert.equal(poolAfter, poolBefore - 1);
});

test("돌아가면 들고 있던 몫이 확정되고 바닥의 나머지를 다시 나눈다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  stage(game, [{ kind: "treasure", value: 14 }, { kind: "treasure", value: 3 }]);
  allContinue(game);
  assert.equal(game.path.gems, 2); // 14 ÷ 3 = 4 … 2

  // 둘이 함께 돌아가면 바닥 2개를 1개씩 나눠 갖고 0개가 남는다.
  Expedition.decide(game, "p1", "return");
  Expedition.decide(game, "p2", "return");
  Expedition.decide(game, "p3", "continue");

  assert.equal(game.players[0].bank, 5); // 들고 있던 4 + 바닥 1
  assert.equal(game.players[1].bank, 5);
  assert.equal(game.players[2].bank, 0);
  assert.equal(game.players[2].inCave, true);
  assert.equal(game.path.gems, 0);
  assert.deepEqual(game.lastReturn.names, ["가", "나"]);
});

test("바닥 나머지가 귀환 인원으로 나누어떨어지지 않으면 그대로 남는다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  stage(game, [{ kind: "treasure", value: 14 }, { kind: "treasure", value: 5 }]);
  allContinue(game); // 14 ÷ 3 = 4 … 2  → 바닥 2
  allContinue(game); // 5 ÷ 3 = 1 … 2   → 바닥 4
  assert.equal(game.path.gems, 4);
  game.players.forEach(player => assert.equal(player.carrying, 5));

  game.players.forEach(player => Expedition.decide(game, player.id, "return"));

  // 바닥 4를 3명이 나누면 1씩 갖고 1이 남는다. 귀환 시점의 값은 lastReturn 에 기록된다.
  assert.equal(game.lastReturn.share, 1);
  assert.equal(game.lastReturn.leftover, 1);
  game.players.forEach(player => assert.equal(player.bank, 6)); // 들고 있던 5 + 바닥 1
});

test("희귀 보물은 혼자 돌아갈 때만 가져간다", () => {
  const solo = threePlayerGame();
  Expedition.startMatch(solo);
  stage(solo, [{ kind: "relic", value: 10 }, { kind: "treasure", value: 3 }]);
  allContinue(solo);
  assert.deepEqual(solo.path.relics, [10]);

  Expedition.decide(solo, "p1", "return");
  Expedition.decide(solo, "p2", "continue");
  Expedition.decide(solo, "p3", "continue");
  assert.equal(solo.players[0].bank, 10);
  assert.equal(solo.players[0].relics, 1);
  assert.deepEqual(solo.path.relics, []);

  const pair = threePlayerGame();
  Expedition.startMatch(pair);
  stage(pair, [{ kind: "relic", value: 10 }, { kind: "treasure", value: 3 }]);
  allContinue(pair);
  Expedition.decide(pair, "p1", "return");
  Expedition.decide(pair, "p2", "return");
  Expedition.decide(pair, "p3", "continue");
  assert.equal(pair.players[0].bank, 0);
  assert.equal(pair.players[1].bank, 0);
  assert.deepEqual(pair.path.relics, [10]); // 아무도 못 가져가고 바닥에 남는다
});

test("전원이 결정하기 전에는 다음 카드가 열리지 않는다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  stage(game, [{ kind: "treasure", value: 6 }, { kind: "treasure", value: 9 }]);

  Expedition.decide(game, "p1", "continue");
  Expedition.decide(game, "p2", "continue");
  assert.equal(game.revealed.length, 0);
  assert.equal(game.deck.length, 2);

  Expedition.decide(game, "p3", "continue");
  assert.equal(game.revealed.length, 1);
  assert.equal(game.revealed[0].value, 6);
});

test("이미 돌아온 사람은 다시 결정할 수 없다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  stage(game, [{ kind: "treasure", value: 6 }, { kind: "treasure", value: 9 }]);
  allContinue(game);

  Expedition.decide(game, "p1", "return");
  Expedition.decide(game, "p2", "continue");
  Expedition.decide(game, "p3", "continue");
  assert.equal(game.players[0].inCave, false);
  assert.equal(Expedition.decide(game, "p1", "continue").ok, false);
});

test("모두 돌아가면 라운드가 끝나고, 5라운드가 끝나면 최다 획득자가 이긴다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);

  for (let round = 1; round <= Expedition.TOTAL_ROUNDS; round += 1) {
    assert.equal(game.round, round);
    stage(game, [{ kind: "treasure", value: 3 }]);
    game.players.filter(player => player.inCave).forEach(player => {
      Expedition.decide(game, player.id, "return");
    });
    assert.equal(game.roundReason, "allReturned");
    if (round < Expedition.TOTAL_ROUNDS) {
      assert.equal(game.phase, "roundEnd");
      assert.equal(Expedition.nextRound(game).ok, true);
    }
  }

  assert.equal(game.phase, "gameEnd");
  assert.equal(game.gameWinnerIds.length, 3); // 셋 다 같은 점수라 공동 1위
});

test("테마는 규칙을 바꾸지 않고 이름표만 바꾼다", () => {
  const ore = threePlayerGame("orerun");
  const void_ = threePlayerGame("voidrun");
  assert.equal(Expedition.stateFor(ore, "p1").hazardNames[0], "낙석");
  assert.equal(Expedition.stateFor(void_, "p1").hazardNames[0], "운석");
  assert.equal(Expedition.stateFor(ore, "p1").totalRounds, Expedition.stateFor(void_, "p1").totalRounds);

  const unknown = Expedition.createGame("p1", "가", "존재하지않는테마");
  assert.equal(Expedition.stateFor(unknown, "p1").theme, "orerun");
  assert.equal(Expedition.setTheme(unknown, "tombdig").ok, true);
  assert.equal(Expedition.stateFor(unknown, "p1").theme, "tombdig");
});

test("안내 문구의 조사가 받침에 맞게 붙는다", () => {
  // 지하수(받침 없음)와 낙석(받침 있음)이 같은 문장 틀을 쓴다.
  const vowelEnding = threePlayerGame("orerun");
  Expedition.startMatch(vowelEnding);
  stage(vowelEnding, [{ kind: "hazard", hazard: 3 }, { kind: "hazard", hazard: 3 }]);
  allContinue(vowelEnding);
  allContinue(vowelEnding);
  assert.match(vowelEnding.lastAction, /^지하수가 다시 나왔습니다/);

  const consonantEnding = threePlayerGame("orerun");
  Expedition.startMatch(consonantEnding);
  stage(consonantEnding, [{ kind: "hazard", hazard: 0 }, { kind: "hazard", hazard: 0 }]);
  allContinue(consonantEnding);
  allContinue(consonantEnding);
  assert.match(consonantEnding.lastAction, /^낙석이 다시 나왔습니다/);

  // 단위도 테마마다 받침이 갈린다: 덩이 → "는", 유닛 → "은".
  const ore = threePlayerGame("orerun");
  Expedition.startMatch(ore);
  stage(ore, [{ kind: "treasure", value: 14 }, { kind: "treasure", value: 3 }]);
  allContinue(ore);
  assert.match(ore.lastAction, /2덩이는 바닥에 남았습니다/);

  const voidRun = threePlayerGame("voidrun");
  Expedition.startMatch(voidRun);
  stage(voidRun, [{ kind: "treasure", value: 14 }, { kind: "treasure", value: 3 }]);
  allContinue(voidRun);
  assert.match(voidRun.lastAction, /2유닛은 바닥에 남았습니다/);

  // 어떤 테마에서도 "이(가)" 같은 얼버무린 형태가 남아 있으면 안 된다.
  for (const theme of Object.keys(Expedition.THEMES)) {
    const game = threePlayerGame(theme);
    Expedition.startMatch(game);
    stage(game, [{ kind: "relic", value: 5 }, { kind: "treasure", value: 3 }]);
    allContinue(game);
    assert.doesNotMatch(game.lastAction, /\(가\)|\(을\)|\(으\)/);
    assert.equal(Expedition.setTheme(Expedition.createGame("p1", "가"), theme).ok, true);
  }
});

test("남의 선택은 전원이 정하기 전까지 보이지 않는다", () => {
  const game = threePlayerGame();
  Expedition.startMatch(game);
  stage(game, [{ kind: "treasure", value: 6 }, { kind: "treasure", value: 9 }]);

  Expedition.decide(game, "p1", "return");
  const seenByOther = Expedition.stateFor(game, "p2");
  assert.deepEqual(seenByOther.decidedIds, ["p1"]); // 정했다는 사실만 보인다
  assert.equal(seenByOther.myDecision, null);
  assert.equal(Expedition.stateFor(game, "p1").myDecision, "return");
  assert.equal(JSON.stringify(seenByOther).includes('"decision"'), false);
});
