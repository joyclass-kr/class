"use strict";

const assert = require("assert");
const GemGuild = require("../game-hub-server/gemguild");

function deterministic() { return 0; }

function startedGame() {
  const game = GemGuild.createGame("a", "가람");
  assert.equal(GemGuild.addPlayer(game, "b", "나래").ok, true);
  assert.equal(GemGuild.startGame(game, deterministic).ok, true);
  return game;
}

{
  const game = startedGame();
  assert.equal(game.phase, "playing");
  assert.equal(game.market[1].length, 4);
  assert.equal(game.market[2].length, 4);
  assert.equal(game.market[3].length, 4);
  assert.equal(game.bank.ruby, 4);
  assert.equal(game.patrons.length, 3);
}

{
  const game = startedGame();
  assert.equal(GemGuild.takeGems(game, "a", ["ruby", "sapphire", "emerald"]).ok, true);
  assert.equal(game.players[0].tokens.ruby, 1);
  assert.equal(game.turnIndex, 1);
  assert.equal(GemGuild.takeGems(game, "a", ["ruby"]).ok, false, "연속 행동을 막아야 한다");
}

{
  const game = startedGame();
  assert.equal(GemGuild.takeGems(game, "a", ["ruby", "ruby"]).ok, true);
  assert.equal(game.players[0].tokens.ruby, 2);
  assert.equal(game.bank.ruby, 2);
  assert.equal(GemGuild.takeGems(game, "b", ["ruby", "ruby"]).ok, false, "은행에 4개 미만이면 같은 색 2개를 막아야 한다");
}

{
  const game = startedGame();
  const card = game.market[1][0];
  assert.equal(GemGuild.reserveCard(game, "a", card.id).ok, true);
  assert.equal(game.players[0].reserved.length, 1);
  assert.equal(game.players[0].tokens.gold, 1);
  assert.equal(game.market[1].length, 4);
}

{
  const game = startedGame();
  const player = game.players[0];
  const card = game.market[3].find(candidate => candidate.points >= 4);
  for (const gem of GemGuild.GEMS) player.tokens[gem] = 7;
  player.tokens.gold = 5;
  assert.equal(GemGuild.buyCard(game, "a", card.id).ok, true);
  assert.equal(player.cards.includes(card.id), true);
  assert.equal(player.bonuses[card.bonus], 1);
  assert.equal(player.score >= card.points, true);
}

{
  const game = startedGame();
  const privateCard = game.market[1][0];
  GemGuild.reserveCard(game, "a", privateCard.id);
  const ownerState = GemGuild.stateFor(game, "a");
  const otherState = GemGuild.stateFor(game, "b");
  assert.equal(ownerState.reserved.length, 1);
  assert.equal(otherState.reserved.length, 0, "예약 카드는 소유자에게만 공개해야 한다");
  assert.equal(otherState.players.find(player => player.id === "a").reserveCount, 1);
}

console.log("gemguild-unit: ok");
