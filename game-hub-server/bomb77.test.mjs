import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Bomb77 = require("./bomb77");
const fixedPick = () => 0;

function gameWithPlayers(count = 3) {
  const game = Bomb77.createGame("p1", "하늘");
  for (let index = 2; index <= count; index += 1) Bomb77.addPlayer(game, `p${index}`, `학생${index}`);
  return game;
}

test("독자적인 59장 덱은 고유 id와 네 종류 장비 카드를 가진다", () => {
  const deck = Bomb77.buildDeck();
  assert.equal(deck.length, 59);
  assert.equal(new Set(deck.map(card => card.id)).size, deck.length);
  assert.deepEqual(new Set(deck.filter(card => card.kind !== "number").map(card => card.kind)), new Set(["reverse", "hold", "half", "defuse"]));
});

test("2~8명이 시작하면 각자 카드 5장과 퓨즈 3개를 받는다", () => {
  const game = gameWithPlayers(8);
  assert.equal(Bomb77.startMatch(game, fixedPick).ok, true);
  assert.equal(game.phase, "playing");
  assert.equal(game.deck.length, 19);
  for (const player of game.players) {
    assert.equal(game.hands[player.id].length, Bomb77.HAND_SIZE);
    assert.equal(game.fuses[player.id], Bomb77.STARTING_FUSES);
  }
});

test("카드를 낼 때 합계를 서버가 계산하고 차례를 넘긴다", () => {
  const game = gameWithPlayers(2);
  Bomb77.startMatch(game, fixedPick);
  game.hands.p1 = [{ id: "manual-8", kind: "number", value: 8 }];
  game.deck = [{ id: "draw-1", kind: "number", value: 1 }];
  const result = Bomb77.playCard(game, "p1", { cardId: "manual-8" }, fixedPick);
  assert.equal(result.ok, true);
  assert.equal(game.total, 8);
  assert.equal(Bomb77.activePlayer(game).id, "p2");
  assert.equal(game.hands.p1.length, 1);
});

test("77 이상이면 낸 사람의 퓨즈를 잃고 합계를 0으로 되돌린다", () => {
  const game = gameWithPlayers(3);
  Bomb77.startMatch(game, fixedPick);
  game.total = 74;
  game.hands.p1 = [{ id: "manual-5", kind: "number", value: 5 }];
  game.deck = [{ id: "draw-2", kind: "number", value: 2 }];
  const result = Bomb77.playCard(game, "p1", { cardId: "manual-5" }, fixedPick);
  assert.equal(result.exploded, true);
  assert.equal(game.fuses.p1, 2);
  assert.equal(game.total, 0);
  assert.equal(game.lastActionKind, "explosion");
});

test("감압·해제·방향 전환 장비는 각각 독자적인 효과를 적용한다", () => {
  assert.equal(Bomb77.totalAfter({ kind: "half" }, 51), 25);
  assert.equal(Bomb77.totalAfter({ kind: "defuse" }, 76), 0);
  assert.equal(Bomb77.totalAfter({ kind: "number", value: -10 }, 6), 0);
  const game = gameWithPlayers(3);
  Bomb77.startMatch(game, fixedPick);
  game.hands.p1 = [{ id: "reverse-x", kind: "reverse", value: null }];
  game.deck = [{ id: "draw-x", kind: "number", value: 1 }];
  Bomb77.playCard(game, "p1", { cardId: "reverse-x" }, fixedPick);
  assert.equal(game.direction, -1);
  assert.equal(Bomb77.activePlayer(game).id, "p3");
});

test("클라이언트 상태는 다른 사람의 손패를 공개하지 않는다", () => {
  const game = gameWithPlayers(2);
  Bomb77.startMatch(game, fixedPick);
  const state = Bomb77.stateFor(game, "p1");
  assert.equal(state.hand.length, 5);
  assert.equal(Object.hasOwn(state.players[1], "hand"), false);
  assert.equal(state.players[1].handCount, 5);
});

test("시간 초과 자동 행동은 폭발하지 않는 가장 안전한 카드를 고른다", () => {
  const game = gameWithPlayers(2);
  Bomb77.startMatch(game, fixedPick);
  game.total = 73;
  game.hands.p1 = [
    { id: "plus-10", kind: "number", value: 10 },
    { id: "minus-5", kind: "number", value: -5 }
  ];
  game.deck = [{ id: "draw-safe", kind: "number", value: 1 }];
  Bomb77.autoPlay(game, fixedPick);
  assert.equal(game.total, 68);
  assert.equal(game.fuses.p1, 3);
});
