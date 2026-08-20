"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const Dobble = require(path.resolve(__dirname, "..", "game-hub-server", "dobble"));

// 유한 사영평면 구성: 카드 57장, 카드당 그림 8개, 임의의 두 카드는 정확히 그림 하나만 공유해야 한다.
const deck = Dobble.buildDeckIndices(7);
assert.equal(deck.length, Dobble.TOTAL_CARDS, "카드는 57장이어야 합니다.");
deck.forEach(card => assert.equal(card.length, Dobble.SYMBOLS_PER_CARD, "카드마다 그림이 8개여야 합니다."));

const allSymbols = new Set(deck.flat());
assert.equal(allSymbols.size, Dobble.TOTAL_CARDS, "그림 종류도 57가지여야 합니다.");

for (let i = 0; i < deck.length; i += 1) {
  for (let j = i + 1; j < deck.length; j += 1) {
    const shared = deck[i].filter(symbol => deck[j].includes(symbol));
    assert.equal(shared.length, 1, `카드 ${i}와 ${j}는 그림이 정확히 1개만 겹쳐야 합니다 (실제 ${shared.length}개).`);
  }
}

function gameWithTwoPlayers() {
  const game = Dobble.createGame("host", "방장");
  Dobble.addPlayer(game, "guest1", "하늘");
  return game;
}

// 시작하면 카드가 인원에게 고르게 나뉘고 중앙에 1장 남아야 한다.
const started = gameWithTwoPlayers();
const startResult = Dobble.startGame(started, () => 0);
assert.equal(startResult.ok, true);
assert.equal(started.phase, "playing");
const totalInHands = started.players.reduce((sum, p) => sum + p.stack.length, 0);
assert.equal(totalInHands + started.centerPile.length, Dobble.TOTAL_CARDS, "모든 카드가 플레이어 손패 + 중앙 카드에 있어야 합니다.");
assert.equal(started.centerPile.length, 1);

// 정답 그림을 맞히면 카드를 내고, 오답이면 거부된다.
const claimGame = gameWithTwoPlayers();
Dobble.startGame(claimGame, () => 0);
const player = claimGame.players[0];
const centerCard = claimGame.centerPile[0];
const myCard = player.stack[0];
const realMatch = Dobble.sharedSymbol(myCard, centerCard);
assert.ok(realMatch, "손패 카드와 중앙 카드는 반드시 그림 하나가 겹쳐야 합니다.");

const wrongGuess = myCard.find(symbol => symbol !== realMatch) || "존재하지않는그림";
const badResult = Dobble.claim(claimGame, player.id, wrongGuess);
assert.equal(badResult.ok, false, "겹치지 않는 그림을 지목하면 거부되어야 합니다.");
assert.equal(claimGame.centerPile.length, 1, "오답이면 중앙 카드가 바뀌지 않아야 합니다.");

const beforeCount = player.stack.length;
const goodResult = Dobble.claim(claimGame, player.id, realMatch);
assert.equal(goodResult.ok, true);
assert.equal(player.stack.length, beforeCount - 1, "정답이면 손패가 한 장 줄어야 합니다.");
assert.equal(claimGame.centerPile[claimGame.centerPile.length - 1], myCard, "낸 카드가 새 중앙 카드가 되어야 합니다.");

// 손패를 모두 낸 사람이 즉시 승리한다.
const winGame = gameWithTwoPlayers();
Dobble.startGame(winGame, () => 0);
const winner = winGame.players[0];
while (winner.stack.length > 0) {
  const center = winGame.centerPile[winGame.centerPile.length - 1];
  const match = Dobble.sharedSymbol(winner.stack[0], center);
  const result = Dobble.claim(winGame, winner.id, match);
  assert.equal(result.ok, true, "정답 지목은 항상 성공해야 합니다.");
}
assert.equal(winGame.phase, "gameEnd", "손패를 다 내면 게임이 끝나야 합니다.");
assert.equal(winGame.winner, winner.id, "손패를 먼저 다 낸 사람이 승리해야 합니다.");

// stateFor는 참가자에게 본인 카드/중앙 카드만 보여주고 다른 사람 손패는 숨긴다.
const view = Dobble.stateFor(started, started.players[0].id);
assert.ok(Array.isArray(view.myCard));
assert.ok(view.players.every(p => !("stack" in p)), "다른 참가자의 손패 원본이 노출되면 안 됩니다.");

// 대기실에서만 방장이 규칙을 바꿀 수 있고, 잘못된 값은 거부된다.
const modeGame = gameWithTwoPlayers();
assert.equal(Dobble.setMode(modeGame, "catalog").ok, true);
assert.equal(modeGame.mode, "catalog");
assert.equal(Dobble.setMode(modeGame, "not-a-mode").ok, false, "알 수 없는 규칙은 거부되어야 합니다.");
Dobble.startGame(modeGame, () => 0);
assert.equal(Dobble.setMode(modeGame, "tower").ok, false, "진행 중에는 규칙을 바꿀 수 없어야 합니다.");

// 카탈로그 규칙: 기준 카드는 모두에게 공개되고, 손패 개념이 없다.
const catalogGame = gameWithTwoPlayers();
Dobble.setMode(catalogGame, "catalog");
Dobble.startGame(catalogGame, () => 0);
assert.equal(catalogGame.drawPile.length, Dobble.TOTAL_CARDS - 1);
const catalogView = Dobble.stateFor(catalogGame, catalogGame.players[0].id);
assert.equal(catalogView.myCard, null, "카탈로그에는 개인 카드가 없어야 합니다.");
assert.ok(Array.isArray(catalogView.centerCard));
assert.ok(Array.isArray(catalogView.challengerCard));

// 오답은 거부되고, 정답을 맞히면 기준 카드를 가져가며 더미 맨 위가 새 기준 카드가 된다.
const catalogPlayer = catalogGame.players[0];
const centerBefore = catalogGame.centerCard;
const challengerBefore = catalogGame.drawPile[catalogGame.drawPile.length - 1];
const catalogMatch = Dobble.sharedSymbol(centerBefore, challengerBefore);
const catalogBad = Dobble.claim(catalogGame, catalogPlayer.id, centerBefore.find(s => s !== catalogMatch));
assert.equal(catalogBad.ok, false, "겹치지 않는 그림은 거부되어야 합니다.");
const catalogGood = Dobble.claim(catalogGame, catalogPlayer.id, catalogMatch);
assert.equal(catalogGood.ok, true);
assert.deepEqual(catalogPlayer.collected[0], centerBefore, "맞히면 이전 기준 카드를 가져가야 합니다.");
assert.deepEqual(catalogGame.centerCard, challengerBefore, "방금 뒤집힌 카드가 새 기준 카드가 되어야 합니다.");

// 더미가 소진되면 가장 많이 모은 사람이 승리한다.
const catalogWinGame = gameWithTwoPlayers();
Dobble.setMode(catalogWinGame, "catalog");
Dobble.startGame(catalogWinGame, () => 0);
const catalogWinner = catalogWinGame.players[0];
while (catalogWinGame.drawPile.length > 0) {
  const challenger = catalogWinGame.drawPile[catalogWinGame.drawPile.length - 1];
  const match = Dobble.sharedSymbol(catalogWinGame.centerCard, challenger);
  const result = Dobble.claim(catalogWinGame, catalogWinner.id, match);
  assert.equal(result.ok, true, "정답 지목은 항상 성공해야 합니다.");
}
assert.equal(catalogWinGame.phase, "gameEnd", "더미가 소진되면 게임이 끝나야 합니다.");
assert.equal(catalogWinGame.winner, catalogWinner.id, "가장 많이 모은 사람이 승리해야 합니다.");
assert.equal(catalogWinner.collected.length, Dobble.TOTAL_CARDS - 1, "혼자 다 맞혔다면 기준 카드를 제외한 전부를 모아야 합니다.");

console.log("dobble-unit.js: all assertions passed");
