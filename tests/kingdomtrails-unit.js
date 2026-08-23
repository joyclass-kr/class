"use strict";

const assert = require("assert");
const KingdomTrails = require("../game-hub-server/kingdomtrails");

function makePlayingGame() {
  const game = KingdomTrails.createGame("p1", "가람");
  KingdomTrails.addPlayer(game, "p2", "나래");
  const started = KingdomTrails.startGame(game, () => 0);
  assert.equal(started.ok, true);
  return game;
}

{
  const rotated = KingdomTrails.rotateEdges(["city", "field", "road", "field"], 1);
  assert.deepEqual(rotated, ["field", "city", "field", "road"]);
}

{
  const game = makePlayingGame();
  assert.equal(game.phase, "playing");
  assert.equal(game.board.length, 1);
  assert.equal(game.deck.length, 29);
  assert.ok(game.currentTile);
  assert.equal(KingdomTrails.stateFor(game, "p1").players[0].workers, 5);
}

{
  const game = makePlayingGame();
  const tile = { id: "test-road", kind: "road-straight", edges: ["road", "field", "road", "field"], center: null };
  const north = KingdomTrails.validatePlacement(game, tile, 0, -1, 0);
  assert.equal(north.ok, true);
  const cityTile = { id: "test-city", kind: "city-cap", edges: ["city", "field", "field", "field"], center: null };
  const eastMismatch = KingdomTrails.validatePlacement(game, cityTile, 1, 0, 3);
  assert.equal(eastMismatch.ok, false);
  assert.match(eastMismatch.error, /맞지 않습니다/);
  const detached = KingdomTrails.validatePlacement(game, tile, 4, 4, 0);
  assert.equal(detached.ok, false);
}

{
  const game = makePlayingGame();
  const active = KingdomTrails.activePlayer(game);
  const legal = KingdomTrails.firstLegalPlacement(game);
  const beforeDeck = game.deck.length;
  const placed = KingdomTrails.placeTile(game, active.id, { ...legal, claim: null });
  assert.equal(placed.ok, true);
  assert.equal(game.board.length, 2);
  assert.equal(game.deck.length, beforeDeck - 1);
  assert.notEqual(KingdomTrails.activePlayer(game).id, active.id);
}

{
  const game = makePlayingGame();
  const nonActive = game.players[1];
  const legal = KingdomTrails.firstLegalPlacement(game);
  const result = KingdomTrails.placeTile(game, nonActive.id, { ...legal, claim: null });
  assert.equal(result.ok, false);
  assert.match(result.error, /내 차례/);
}

{
  const game = KingdomTrails.createGame("p1", "가람");
  KingdomTrails.addPlayer(game, "p2", "나래");
  game.phase = "playing";
  game.board = [
    { id: "start", kind: "start", edges: ["road", "field", "road", "field"], center: null, x: 0, y: 0, worker: null },
    { id: "north-cap", kind: "city-gate", edges: ["city", "field", "road", "field"], center: null, x: 0, y: -1, worker: { playerId: "p1", feature: "road" } }
  ];
  game.currentTile = { id: "south-cap", kind: "city-gate", edges: ["city", "field", "road", "field"], center: null };
  game.deck = [{ id: "next", kind: "meadow", edges: ["field", "field", "field", "field"], center: null }];
  game.turnIndex = 0;
  const result = KingdomTrails.placeTile(game, "p1", { x: 0, y: 1, rotation: 2, claim: null });
  assert.equal(result.ok, true);
  assert.equal(game.players[0].score, 3);
  assert.equal(game.players[0].workers, 6);
}

{
  const game = makePlayingGame();
  const player = KingdomTrails.activePlayer(game);
  const before = game.board.length;
  const result = KingdomTrails.autoPlace(game);
  assert.equal(result.ok, true);
  assert.equal(game.board.length, before + 1);
  assert.match(game.lastAction, new RegExp(player.name));
}

console.log("kingdomtrails-unit: ok");
