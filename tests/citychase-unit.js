"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const CityChase = require(path.resolve(__dirname, "..", "game-hub-server", "citychase"));

assert.ok(Object.keys(CityChase.BOARD.NODES).length >= 140, "원작 사진처럼 촘촘한 이동 칸이 필요합니다.");
assert.equal(CityChase.BOARD.BUILDINGS.length, 7, "수색 건물은 7곳이어야 합니다.");
assert.equal(CityChase.TRICK_CARD_COUNT, 9);
assert.equal(CityChase.CHECK_CARD_COUNT, 6);

const expectedPoliceCounts = { 2: 1, 3: 1, 4: 2, 5: 2, 6: 3 };
for (let count = 2; count <= 6; count += 1) {
  const teamGame = CityChase.createGame("player-1", "1번");
  for (let index = 2; index <= count; index += 1) CityChase.addPlayer(teamGame, `player-${index}`, `${index}번`);
  assert.equal(CityChase.startGame(teamGame).ok, true);
  assert.equal(teamGame.players.filter(player => player.team === "police").length, expectedPoliceCounts[count]);
  assert.equal(teamGame.players.filter(player => player.team === "thief").length, count - expectedPoliceCounts[count]);
  assert.ok(teamGame.pawns.every(pawn => pawn.controllerIds.length >= 1), `${count}인 게임에서 모든 말을 누군가 맡아야 합니다.`);
  assert.ok(teamGame.players.every(player => player.pawnIds.length >= 1), `${count}인 게임에서 모든 참가자가 말을 맡아야 합니다.`);
}

const game = CityChase.createGame("police", "경찰 대표");
CityChase.addPlayer(game, "thief", "도둑 대표");
assert.equal(CityChase.startGame(game).ok, true);
assert.equal(game.phase, "setup");
assert.deepEqual(game.players.map(player => player.team), ["police", "thief"]);
assert.equal(game.pawns.length, 6, "참가 인원과 관계없이 경찰·도둑 말 6개를 모두 사용합니다.");
assert.ok(game.pawns.filter(pawn => pawn.team === "police").every(pawn => pawn.controllerIds.includes("police")));
assert.ok(game.pawns.filter(pawn => pawn.team === "thief").every(pawn => pawn.controllerIds.includes("thief")));

assert.equal(CityChase.placeSecrets(game, "thief", { gems: ["market", "air"], undercover: "burger" }).ok, false);
assert.equal(CityChase.placeSecrets(game, "police", { gems: ["market", "air"], undercover: "burger" }).ok, true);
assert.equal(game.phase, "playing");
const policeView = CityChase.stateFor(game, "police");
const thiefView = CityChase.stateFor(game, "thief");
assert.equal(policeView.buildings.find(item => item.id === "market").content, "gem");
assert.equal(thiefView.buildings.find(item => item.id === "market").content, "hidden", "도둑 화면에는 비밀 배치가 노출되면 안 됩니다.");
assert.deepEqual(thiefView.buildings.map(item => item.content), Array(7).fill("hidden"));

assert.equal(game.turnPawnId, undefined);
assert.equal(CityChase.currentPawn(game).id, "thief-1");
assert.equal(CityChase.roll(game, "police", 2).ok, false, "상대 팀의 말을 대신 움직일 수 없어야 합니다.");
assert.equal(CityChase.roll(game, "thief", 2).ok, true);
assert.equal(CityChase.stateFor(game, "thief").validMoves.includes("p0"), true);
assert.equal(CityChase.moveStep(game, "thief", "p0").ok, true);
const firstDenseRoad = CityChase.BOARD.neighbors("p0", "thief").find(item => item.id !== "hideout").id;
assert.equal(CityChase.moveStep(game, "thief", firstDenseRoad).ok, true);
assert.equal(CityChase.currentPawn(game).id, "thief-2", "정확한 칸 수를 이동하면 다음 말 차례가 됩니다.");

const hideGame = CityChase.createGame("p", "경찰");
CityChase.addPlayer(hideGame, "t", "도둑");
CityChase.startGame(hideGame);
CityChase.placeSecrets(hideGame, "p", { gems: ["market", "air"], undercover: "burger" });
assert.equal(CityChase.hide(hideGame, "t").ok, true, "아지트에서는 이동 대신 숨을 수 있어야 합니다.");
assert.equal(hideGame.pawns.find(pawn => pawn.id === "thief-1").hidingTurns, 1);

const rescueGame = CityChase.createGame("p", "경찰");
CityChase.addPlayer(rescueGame, "t", "도둑");
CityChase.startGame(rescueGame);
CityChase.placeSecrets(rescueGame, "p", { gems: ["market", "air"], undercover: "burger" });
rescueGame.pawns.filter(pawn => pawn.team === "police").forEach((pawn, index) => { pawn.position = `p${10 + index}`; });
const rescuer = rescueGame.pawns.find(pawn => pawn.id === "thief-1");
const captive = rescueGame.pawns.find(pawn => pawn.id === "thief-2");
rescuer.position = "p15";
captive.position = "jail";
captive.status = "jailed";
assert.equal(CityChase.roll(rescueGame, "t", 1).ok, true);
assert.equal(CityChase.moveStep(rescueGame, "t", "jail").ok, true);
assert.equal(rescueGame.pending.type, "rescue");
assert.equal(CityChase.choosePending(rescueGame, "t", "thief-2").ok, true);
assert.equal(rescuer.position, "hideout");
assert.equal(captive.position, "hideout");
assert.equal(captive.status, "active", "동료가 감옥으로 들어와 구출하면 두 도둑 모두 아지트로 돌아와야 합니다.");

const cardGame = CityChase.createGame("p", "경찰");
CityChase.addPlayer(cardGame, "t", "도둑");
CityChase.startGame(cardGame);
CityChase.placeSecrets(cardGame, "p", { gems: ["market", "air"], undercover: "burger" });
const trickNext = CityChase.BOARD.neighbors("p1", "police")[0].id;
assert.equal(CityChase.placeTrick(cardGame, "t", "p1", trickNext).ok, true);
assert.equal(cardGame.resources.thief.trickCards, 8);
cardGame.turnIndex = 3;
cardGame.turnMode = "awaiting_roll";
assert.equal(CityChase.placeCheck(cardGame, "p", "p2").ok, true);
assert.equal(cardGame.resources.police.checkCards, 5);

const captureGame = CityChase.createGame("p", "경찰");
CityChase.addPlayer(captureGame, "t", "도둑");
CityChase.startGame(captureGame);
CityChase.placeSecrets(captureGame, "p", { gems: ["market", "air"], undercover: "burger" });
const captureTarget = CityChase.BOARD.neighbors("p0", "police").find(item => item.id !== "hideout").id;
captureGame.pawns.find(pawn => pawn.id === "thief-1").position = captureTarget;
captureGame.pawns.find(pawn => pawn.id === "thief-2").status = "jailed";
captureGame.pawns.find(pawn => pawn.id === "thief-2").position = "jail";
captureGame.pawns.find(pawn => pawn.id === "thief-3").status = "jailed";
captureGame.pawns.find(pawn => pawn.id === "thief-3").position = "jail";
captureGame.pawns.find(pawn => pawn.id === "police-1").position = "p0";
captureGame.turnIndex = 3;
captureGame.turnMode = "awaiting_roll";
assert.equal(CityChase.roll(captureGame, "p", 1).ok, true);
assert.equal(CityChase.moveStep(captureGame, "p", captureTarget).ok, true);
assert.equal(captureGame.phase, "ended");
assert.equal(captureGame.winnerTeam, "police", "도둑 세 명을 모두 체포하면 경찰팀이 이겨야 합니다.");

const gemGame = CityChase.createGame("p", "경찰");
CityChase.addPlayer(gemGame, "t", "도둑");
CityChase.startGame(gemGame);
CityChase.placeSecrets(gemGame, "p", { gems: ["market", "air"], undercover: "burger" });
gemGame.resources.thief.securedGems = 1;
const runner = gemGame.pawns.find(pawn => pawn.id === "thief-1");
runner.position = "p0";
runner.carryingGem = true;
assert.equal(CityChase.roll(gemGame, "t", 1).ok, true);
assert.equal(CityChase.moveStep(gemGame, "t", "hideout").ok, true);
assert.equal(gemGame.phase, "ended");
assert.equal(gemGame.winnerTeam, "thief", "보석 두 개를 아지트로 옮기면 도둑팀이 이겨야 합니다.");

const html = fs.readFileSync(path.resolve(__dirname, "..", "learning", "games", "citychase", "citychase.html"), "utf8");
const css = fs.readFileSync(path.resolve(__dirname, "..", "learning", "games", "citychase", "citychase.css"), "utf8");
const client = fs.readFileSync(path.resolve(__dirname, "..", "learning", "games", "citychase", "citychase.js"), "utf8");
const server = fs.readFileSync(path.resolve(__dirname, "..", "game-hub-server", "server.js"), "utf8");
assert.match(html, /id="boardCanvas"/);
assert.match(html, /id="roomCode"/);
assert.match(client, /allowedPlayerCounts:\s*\[2,\s*3,\s*4,\s*5,\s*6\]/);
assert.match(client, /CITYCHASE_ACTION/);
assert.match(css, /min-height:\s*44px/);
assert.match(css, /\.node::after\s*\{[^}]*inset:\s*-11px/s, "작은 보드 칸에도 44px 이상의 터치 영역이 필요합니다.");
assert.match(css, /@media\s*\(orientation:\s*portrait\),\s*\(max-width:\s*820px\)/);
assert.match(server, /citychase:\s*6/);
assert.match(server, /CITYCHASE_ACTION/);
assert.match(server, /CityChase\.stateFor/);

console.log("citychase-unit: board, secrecy, movement, cards, capture, gem victory and responsive contract ok");
