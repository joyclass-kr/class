"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Honeycomb = require(path.resolve(__dirname, "..", "game-hub-server", "honeycomb"));

assert.equal(Honeycomb.PIECES.length, 18, "한 색은 18개의 서로 다른 조각으로 구성되어야 합니다.");
assert.equal(
  Honeycomb.PIECES.reduce((sum, piece) => sum + piece.cells.length, 0),
  72,
  "한 색의 조각은 모두 72칸이어야 합니다."
);
assert.equal(new Set(Honeycomb.PIECES.map(piece => piece.id)).size, 18);
assert.equal(Honeycomb.BOARD_CELLS.length, 169, "8칸 변의 육각 보드는 169칸이어야 합니다.");
assert.equal(Honeycomb.ORIENTATIONS.H1.length, 1, "한 칸 조각은 방향이 하나뿐입니다.");
assert.equal(Honeycomb.ORIENTATIONS.H5H.length, 3, "일직선 다섯 칸 조각은 세 방향만 서로 다릅니다.");
const freeShapeSignatures = Honeycomb.PIECES.map(piece =>
  Honeycomb.ORIENTATIONS[piece.id]
    .map(cells => cells.map(cell => `${cell.q},${cell.r}`).join(";"))
    .sort()[0]
);
assert.equal(new Set(freeShapeSignatures).size, 18, "회전·반전했을 때 서로 같은 조각이 중복되면 안 됩니다.");

// Hex distance / adjacency geometry.
assert.equal(Honeycomb.hexDistance({ q: 0, r: 0 }, { q: 0, r: 0 }), 0);
assert.equal(Honeycomb.hexDistance({ q: 0, r: 0 }, { q: 1, r: 0 }), 1);
assert.equal(Honeycomb.hexDistance({ q: 0, r: 0 }, { q: 2, r: 0 }), 2);
assert.equal(Honeycomb.commonNeighbors({ q: 0, r: 0 }, { q: 2, r: 0 }).length, 1, "일직선 두 칸 간격은 다리 칸이 하나입니다.");
assert.equal(Honeycomb.commonNeighbors({ q: 0, r: 0 }, { q: 1, r: 1 }).length, 2, "비스듬한 두 칸 간격은 다리 칸이 둘입니다.");
assert.equal(Honeycomb.inBoard({ q: 7, r: 0 }), true);
assert.equal(Honeycomb.inBoard({ q: 8, r: 0 }), false);

const twoPlayer = Honeycomb.createGame("host", "가람");
Honeycomb.addPlayer(twoPlayer, "guest", "누리");
assert.equal(Honeycomb.startGame(twoPlayer).ok, true);
assert.deepEqual(twoPlayer.turnColors, ["red", "orange", "yellow", "green", "blue", "purple"]);
assert.equal(twoPlayer.colorOwners.red, "host");
assert.equal(twoPlayer.colorOwners.yellow, "host", "2인전에서는 서로 번갈아 놓인 세 색을 한 명이 맡아야 합니다.");
assert.equal(twoPlayer.colorOwners.blue, "host");
assert.equal(twoPlayer.colorOwners.orange, "guest");
assert.equal(twoPlayer.colorOwners.green, "guest");
assert.equal(twoPlayer.colorOwners.purple, "guest");

assert.equal(
  Honeycomb.validatePlacement(twoPlayer, "red", "H1", [{ q: 6, r: 0 }]).ok,
  false,
  "첫 조각은 시작 칸을 덮어야 합니다."
);
assert.equal(Honeycomb.place(twoPlayer, "host", "H1", [{ q: 7, r: 0 }]).ok, true);
assert.equal(twoPlayer.turnColorIndex, 1);
assert.equal(Honeycomb.place(twoPlayer, "host", "H1", [{ q: -7, r: 0 }]).ok, false, "차례가 아닌 사람은 둘 수 없습니다.");

twoPlayer.turnColorIndex = 0;
twoPlayer.remaining.red.push("H1", "H1", "H2");
assert.equal(
  Honeycomb.validatePlacement(twoPlayer, "red", "H2", [{ q: 6, r: 0 }, { q: 5, r: 0 }]).ok,
  false,
  "같은 색 조각끼리는 닿을 수 없습니다."
);
assert.equal(
  Honeycomb.validatePlacement(twoPlayer, "red", "H1", [{ q: 5, r: 0 }]).ok,
  true,
  "일직선으로 한 칸 간격이 비어 있으면 놓을 수 있습니다."
);
assert.equal(
  Honeycomb.validatePlacement(twoPlayer, "red", "H1", [{ q: 0, r: 0 }]).ok,
  false,
  "같은 색과 한 칸 간격으로 이어지지 않으면 놓을 수 없습니다."
);

const threePlayer = Honeycomb.createGame("a", "하나");
Honeycomb.addPlayer(threePlayer, "b", "두리");
Honeycomb.addPlayer(threePlayer, "c", "세나");
assert.equal(Honeycomb.startGame(threePlayer).ok, true);
assert.deepEqual(
  threePlayer.turnColors.map(color => threePlayer.colorOwners[color]),
  ["a", "b", "c", "a", "b", "c"]
);

const fivePlayer = Honeycomb.createGame("a", "하나");
["b", "c", "d", "e"].forEach((id, index) => Honeycomb.addPlayer(fivePlayer, id, `플레이어${index}`));
const fiveStart = Honeycomb.startGame(fivePlayer);
assert.equal(fiveStart.ok, false, "5인전은 시작할 수 없어야 합니다.");
assert.match(fiveStart.error, /2, 3, 4, 6명/);

const fourPlayer = Honeycomb.createGame("a", "하나");
["b", "c", "d"].forEach((id, index) => Honeycomb.addPlayer(fourPlayer, id, `플레이어${index}`));
assert.equal(Honeycomb.startGame(fourPlayer).ok, true);
assert.equal(fourPlayer.turnColors.length, 4, "4인전은 6색 중 4색만 사용합니다.");
assert.equal(new Set(fourPlayer.turnColors.map(color => fourPlayer.colorOwners[color])).size, 4);

const sixPlayer = Honeycomb.createGame("a", "하나");
["b", "c", "d", "e", "f"].forEach((id, index) => Honeycomb.addPlayer(sixPlayer, id, `플레이어${index}`));
assert.equal(Honeycomb.startGame(sixPlayer).ok, true);
assert.deepEqual(
  sixPlayer.turnColors.map(color => sixPlayer.colorOwners[color]),
  ["a", "b", "c", "d", "e", "f"]
);

// Bridge-crossing rule: a straight one-hex gap blocked by any placed piece is illegal,
// but a diagonal one-hex gap is always legal even when both flanking hexes are occupied.
const bridgeGame = Honeycomb.createGame("host", "가람");
Honeycomb.addPlayer(bridgeGame, "guest", "누리");
Honeycomb.startGame(bridgeGame);
Honeycomb.place(bridgeGame, "host", "H1", [{ q: 7, r: 0 }]);
bridgeGame.turnColorIndex = 0;
bridgeGame.remaining.red.push("H1", "H1");
bridgeGame.placements.push({ color: "orange", pieceId: "BLOCK", cells: [{ q: 6, r: 0 }], order: 99 });
assert.equal(
  Honeycomb.validatePlacement(bridgeGame, "red", "H1", [{ q: 5, r: 0 }]).ok,
  false,
  "일직선 간격 사이 칸이 막히면 이어질 수 없습니다."
);
const commons = Honeycomb.commonNeighbors({ q: 7, r: 0 }, { q: 6, r: -1 });
bridgeGame.placements.push({ color: "orange", pieceId: "SIDE1", cells: [commons[0]], order: 100 });
bridgeGame.placements.push({ color: "yellow", pieceId: "SIDE2", cells: [commons[1]], order: 101 });
assert.equal(
  Honeycomb.validatePlacement(bridgeGame, "red", "H1", [{ q: 6, r: -1 }]).ok,
  true,
  "비스듬한 간격은 양쪽이 막혀 있어도 이어질 수 있습니다."
);

// A fully blocked board makes pass legal and ends the game with the lowest remaining count winning.
const blocked = Honeycomb.createGame("host", "가람");
Honeycomb.addPlayer(blocked, "guest", "누리");
Honeycomb.startGame(blocked);
blocked.turnColors = ["red"];
blocked.colorOwners = { red: "host" };
blocked.remaining = { red: ["H1"] };
blocked.passed = { red: false };
blocked.placedCount = { red: 0 };
blocked.placements = [{
  color: "orange",
  pieceId: "blocked-board",
  order: 0,
  cells: Honeycomb.BOARD_CELLS.map(cell => ({ ...cell }))
}];
assert.equal(Honeycomb.firstLegalPlacement(blocked, "red"), null);
assert.equal(Honeycomb.pass(blocked, "host").ok, true);
assert.equal(blocked.phase, "ended");

const perfect = Honeycomb.createGame("host", "가람");
Honeycomb.addPlayer(perfect, "guest", "누리");
Honeycomb.startGame(perfect);
perfect.turnColors = ["red"];
perfect.colorOwners = { red: "host" };
perfect.remaining = { red: ["H1"] };
perfect.passed = { red: false };
perfect.placedCount = { red: 0 };
assert.equal(Honeycomb.place(perfect, "host", "H1", [{ q: 7, r: 0 }]).ok, true);
assert.equal(perfect.phase, "ended");
assert.equal(Honeycomb.colorScore(perfect, "red"), 0, "조각을 모두 놓으면 남은 칸이 0이어야 합니다.");
assert.equal(perfect.turnDeadline, null, "게임이 끝나면 제한시간도 사라져야 합니다.");

// Turn timer: each turn gets a fresh 30-second deadline, and timing out just
// skips that single turn (the colour keeps its remaining pieces).
assert.equal(Honeycomb.TURN_SECONDS, 30);
const timed = Honeycomb.createGame("host", "가람");
Honeycomb.addPlayer(timed, "guest", "누리");
Honeycomb.startGame(timed);
const firstDeadline = timed.turnDeadline;
assert.ok(Number.isFinite(firstDeadline) && firstDeadline > Date.now(), "시작하면 제한시간이 설정돼야 합니다.");
const skipResult = Honeycomb.skipTurn(timed);
assert.equal(skipResult.ok, true);
assert.equal(timed.turnColorIndex, 1, "시간 초과는 다음 색으로 차례를 넘겨야 합니다.");
assert.equal(timed.remaining.red.length, 18, "시간 초과로 넘긴 색은 조각을 그대로 유지해야 합니다.");
assert.equal(timed.passed.red, false, "시간 초과는 영구 탈락이 아니라 한 차례만 건너뛰어야 합니다.");
assert.ok(timed.turnDeadline >= firstDeadline, "다음 차례는 새 제한시간을 받아야 합니다.");
assert.match(timed.lastAction, /시간 초과로 차례를 넘겼습니다/);

const htmlPath = path.resolve(__dirname, "..", "learning", "games", "honeycomb", "honeycomb.html");
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /allowedPlayerCounts:\s*\[2,\s*3,\s*4,\s*6\]/);
  assert.match(html, /HONEYCOMB_ACTION/);
  assert.match(html, /rotate|회전/i);
  assert.match(html, /flip|뒤집/i);
  assert.match(html, /function viewRotationSteps\s*\(/, "플레이어별 보드 방향 계산이 필요합니다.");
  assert.match(html, /function toViewPoint\s*\(/, "서버 좌표를 화면 좌표로 변환해야 합니다.");
  assert.match(html, /function fromViewPoint\s*\(/, "화면에서 선택한 칸을 서버 좌표로 복원해야 합니다.");
  assert.match(html, /내 시작점이 보드 아래쪽/, "플레이어 시점 안내가 필요합니다.");
  assert.match(html, /assets\/images\/honeycomb-cover\.webp/, "벌집 블록 표지 이미지를 사용해야 합니다.");
  assert.match(html, /assets\/sound\/honeycomb-bgm\.ogg/, "벌집 블록 배경음악을 사용해야 합니다.");
  assert.match(html, /assets\/sound\/music-control\.js/, "공통 음악 컨트롤을 연결해야 합니다.");
  assert.ok(fs.statSync(path.resolve(__dirname, "..", "learning", "games", "honeycomb", "assets", "images", "honeycomb-cover.webp")).size > 0);
  assert.ok(fs.statSync(path.resolve(__dirname, "..", "learning", "games", "honeycomb", "assets", "sound", "honeycomb-bgm.ogg")).size > 0);
  assert.doesNotMatch(html, /id=["']placeBtn["']/, "별도의 배치 확정 버튼이 없어야 합니다.");
  assert.match(
    html,
    /function selectBoardCell\s*\([^)]*\)\s*\{[\s\S]*?placeSelected\(\);/,
    "보드 칸을 클릭하면 즉시 배치를 요청해야 합니다."
  );
  assert.match(html, /같은 칸을 한 번 더 터치/, "터치 배치 확인 안내가 필요합니다.");
}

const server = fs.readFileSync(path.resolve(__dirname, "..", "game-hub-server", "server.js"), "utf8");
assert.match(server, /honeycomb:\s*6/);
assert.match(server, /HONEYCOMB_ACTION/);
assert.match(server, /Honeycomb\.stateFor/);

console.log("honeycomb-unit: 18 pieces, 72 hexes, orientations, gap/bridge rules, player counts, and scoring ok");
