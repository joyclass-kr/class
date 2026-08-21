"use strict";

// Hex-grid blocking game: six colours of translucent hex-piece sets placed on a
// hexagonal board. Same-colour pieces must never touch (edge or vertex) but must
// keep exactly a one-hex gap to an earlier piece of the same colour, and that gap
// may not be sealed by a single opposing hex sitting directly between them.

const COLOR_ORDER = Object.freeze(["red", "orange", "yellow", "green", "blue", "purple"]);
const COLOR_LABELS = Object.freeze({
  red: "빨강", orange: "주황", yellow: "노랑", green: "초록", blue: "파랑", purple: "보라"
});

const BOARD_RADIUS = 7;
const TURN_SECONDS = 30;

const START_CORNERS = Object.freeze({
  red: Object.freeze({ q: BOARD_RADIUS, r: 0 }),
  orange: Object.freeze({ q: BOARD_RADIUS, r: -BOARD_RADIUS }),
  yellow: Object.freeze({ q: 0, r: -BOARD_RADIUS }),
  green: Object.freeze({ q: -BOARD_RADIUS, r: 0 }),
  blue: Object.freeze({ q: -BOARD_RADIUS, r: BOARD_RADIUS }),
  purple: Object.freeze({ q: 0, r: BOARD_RADIUS })
});

const HEX_DIRS = Object.freeze([[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]]);

const BOARD_CELLS = Object.freeze((() => {
  const cells = [];
  for (let q = -BOARD_RADIUS; q <= BOARD_RADIUS; q += 1) {
    const rMin = Math.max(-BOARD_RADIUS, -q - BOARD_RADIUS);
    const rMax = Math.min(BOARD_RADIUS, -q + BOARD_RADIUS);
    for (let r = rMin; r <= rMax; r += 1) cells.push(Object.freeze({ q, r }));
  }
  return cells;
})());

function inBoard(cell) {
  return Math.abs(cell.q) <= BOARD_RADIUS && Math.abs(cell.r) <= BOARD_RADIUS &&
    Math.abs(cell.q + cell.r) <= BOARD_RADIUS;
}

function hexDistance(a, b) {
  const dq = a.q - b.q;
  const dr = a.r - b.r;
  return (Math.abs(dq) + Math.abs(dq + dr) + Math.abs(dr)) / 2;
}

function commonNeighbors(a, b) {
  const found = [];
  for (const [dq, dr] of HEX_DIRS) {
    const neighbor = { q: a.q + dq, r: a.r + dr };
    if (hexDistance(neighbor, b) === 1) found.push(neighbor);
  }
  return found;
}

// Eighteen polyhex pieces per colour: 1 monohex, 1 dihex, 3 trihexes,
// 5 tetrahexes and 8 pentahexes (72 hexes total), matching the classic set size.
const PIECES = Object.freeze([
  { id: "H1", cells: [[0, 0]] },
  { id: "H2", cells: [[0, 0], [1, 0]] },
  { id: "H3A", cells: [[0, 1], [1, 0], [1, 1]] },
  { id: "H3B", cells: [[0, 0], [0, 1], [1, 1]] },
  { id: "H3C", cells: [[0, 0], [1, 0], [2, 0]] },
  { id: "H4A", cells: [[0, 0], [0, 1], [1, 0], [1, 1]] },
  { id: "H4B", cells: [[0, 1], [1, 1], [2, 0], [2, 1]] },
  { id: "H4C", cells: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  { id: "H4D", cells: [[0, 0], [0, 1], [1, 1], [1, 2]] },
  { id: "H4E", cells: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { id: "H5A", cells: [[0, 1], [1, 0], [1, 1], [2, 0], [2, 1]] },
  { id: "H5B", cells: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 1]] },
  { id: "H5C", cells: [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]] },
  { id: "H5D", cells: [[0, 2], [1, 1], [2, 1], [3, 0], [3, 1]] },
  { id: "H5E", cells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]] },
  { id: "H5F", cells: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]] },
  { id: "H5G", cells: [[0, 0], [1, 0], [1, 1], [2, 1], [3, 0]] },
  { id: "H5H", cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] }
].map(piece => Object.freeze({
  id: piece.id,
  cells: Object.freeze(piece.cells.map(([q, r]) => Object.freeze({ q, r })))
})));

const PIECE_BY_ID = new Map(PIECES.map(piece => [piece.id, piece]));

function normalizeCells(cells) {
  const minimumQ = Math.min(...cells.map(cell => cell.q));
  const minimumR = Math.min(...cells.map(cell => cell.r));
  return cells
    .map(cell => ({ q: cell.q - minimumQ, r: cell.r - minimumR }))
    .sort((left, right) => left.q - right.q || left.r - right.r);
}

function cellsKey(cells) {
  return normalizeCells(cells).map(cell => `${cell.q},${cell.r}`).join(";");
}

// Cube-coordinate rotation (60 degrees) and reflection, expressed back in axial form.
function rotateCells(cells) {
  return cells.map(({ q, r }) => {
    const x = q, z = r, y = -q - r;
    return { q: -z, r: -y };
  });
}

function reflectCells(cells) {
  return cells.map(({ q, r }) => {
    const x = q, z = r, y = -q - r;
    return { q: x, r: y };
  });
}

function orientationsFor(piece) {
  const found = new Map();
  for (const flipped of [false, true]) {
    let shape = flipped ? reflectCells(piece.cells) : piece.cells.map(cell => ({ ...cell }));
    for (let rotation = 0; rotation < 6; rotation += 1) {
      const normalized = normalizeCells(shape);
      found.set(cellsKey(normalized), normalized);
      shape = rotateCells(shape);
    }
  }
  return [...found.values()].map(cells => Object.freeze(cells.map(cell => Object.freeze(cell))));
}

const ORIENTATIONS = Object.freeze(Object.fromEntries(
  PIECES.map(piece => [piece.id, Object.freeze(orientationsFor(piece))])
));
const ORIENTATION_KEYS = Object.freeze(Object.fromEntries(
  Object.entries(ORIENTATIONS).map(([pieceId, orientations]) => [pieceId, new Set(orientations.map(cellsKey))])
));

function cleanName(value, fallback = "플레이어") {
  return String(value || "").trim().slice(0, 12) || fallback;
}

function createGame(hostId, hostName) {
  return {
    phase: "lobby",
    players: [{ id: String(hostId), name: cleanName(hostName, "방장") }],
    colorOwners: {},
    turnColors: [],
    turnColorIndex: 0,
    remaining: {},
    passed: {},
    placedCount: {},
    placements: [],
    winnerIds: [],
    turnDeadline: null,
    lastAction: "2, 3, 4, 6명이 모이면 시작할 수 있습니다.",
    revision: 0
  };
}

function addPlayer(game, playerId, playerName) {
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (game.players.length >= 6) return { ok: false, error: "벌집 블록은 최대 6명까지 참여할 수 있습니다." };
  const id = String(playerId);
  if (game.players.some(player => player.id === id)) return { ok: true };
  game.players.push({ id, name: cleanName(playerName, `플레이어 ${game.players.length + 1}`) });
  game.revision += 1;
  return { ok: true };
}

function removePlayer(game, playerId) {
  const id = String(playerId);
  game.players = game.players.filter(player => player.id !== id);
  game.revision += 1;
}

function resetToLobby(game, message = "대기실로 돌아왔습니다.") {
  game.phase = "lobby";
  game.colorOwners = {};
  game.turnColors = [];
  game.turnColorIndex = 0;
  game.remaining = {};
  game.passed = {};
  game.placedCount = {};
  game.placements = [];
  game.winnerIds = [];
  game.turnDeadline = null;
  game.lastAction = message;
  game.revision += 1;
  return { ok: true };
}

function assignColors(players) {
  const count = players.length;
  if (count === 6) {
    return {
      turnColors: [...COLOR_ORDER],
      owners: Object.fromEntries(COLOR_ORDER.map((color, index) => [color, players[index].id]))
    };
  }
  if (count === 3) {
    const owners = {};
    COLOR_ORDER.forEach((color, index) => { owners[color] = players[index % 3].id; });
    return { turnColors: [...COLOR_ORDER], owners };
  }
  if (count === 2) {
    const owners = {};
    COLOR_ORDER.forEach((color, index) => { owners[color] = players[index % 2].id; });
    return { turnColors: [...COLOR_ORDER], owners };
  }
  if (count === 4) {
    const used = [COLOR_ORDER[0], COLOR_ORDER[1], COLOR_ORDER[3], COLOR_ORDER[4]];
    const owners = {};
    used.forEach((color, index) => { owners[color] = players[index].id; });
    return { turnColors: used, owners };
  }
  return { turnColors: [], owners: {} };
}

function startGame(game) {
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (![2, 3, 4, 6].includes(game.players.length)) {
    return { ok: false, error: "벌집 블록은 2, 3, 4, 6명일 때 시작할 수 있습니다." };
  }
  const assignment = assignColors(game.players);
  game.colorOwners = assignment.owners;
  game.turnColors = assignment.turnColors;
  game.turnColorIndex = 0;
  game.remaining = {};
  game.passed = {};
  game.placedCount = {};
  for (const color of game.turnColors) {
    game.remaining[color] = PIECES.map(piece => piece.id);
    game.passed[color] = false;
    game.placedCount[color] = 0;
  }
  game.placements = [];
  game.winnerIds = [];
  game.phase = "playing";
  game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
  game.lastAction = `${game.players[0].name}님의 ${COLOR_LABELS[game.turnColors[0]]} 차례로 시작합니다.`;
  game.revision += 1;
  return { ok: true };
}

function currentColor(game) {
  return game.turnColors[game.turnColorIndex] || null;
}

function playerById(game, playerId) {
  return game.players.find(player => player.id === String(playerId)) || null;
}

function occupiedMap(game) {
  const map = new Map();
  for (const placement of game.placements) {
    for (const cell of placement.cells) map.set(`${cell.q},${cell.r}`, placement.color);
  }
  return map;
}

function validatePlacement(game, color, pieceId, proposedCells) {
  if (!game.turnColors.includes(color)) return { ok: false, error: "사용하지 않는 색입니다." };
  const piece = PIECE_BY_ID.get(String(pieceId));
  if (!piece || !(game.remaining[color] || []).includes(piece.id)) {
    return { ok: false, error: "이미 사용했거나 존재하지 않는 조각입니다." };
  }
  if (!Array.isArray(proposedCells) || proposedCells.length !== piece.cells.length) {
    return { ok: false, error: "조각의 칸 수가 올바르지 않습니다." };
  }
  const cells = proposedCells.map(cell => ({ q: Number(cell?.q), r: Number(cell?.r) }));
  if (cells.some(cell => !Number.isInteger(cell.q) || !Number.isInteger(cell.r))) {
    return { ok: false, error: "보드 좌표가 올바르지 않습니다." };
  }
  if (new Set(cells.map(cell => `${cell.q},${cell.r}`)).size !== cells.length) {
    return { ok: false, error: "한 칸을 두 번 차지할 수 없습니다." };
  }
  if (!ORIENTATION_KEYS[piece.id].has(cellsKey(cells))) {
    return { ok: false, error: "조각의 모양이 올바르지 않습니다." };
  }
  if (cells.some(cell => !inBoard(cell))) {
    return { ok: false, error: "조각이 보드 밖으로 나갔습니다." };
  }

  const occupied = occupiedMap(game);
  if (cells.some(cell => occupied.has(`${cell.q},${cell.r}`))) {
    return { ok: false, error: "이미 조각이 놓인 칸입니다." };
  }

  if ((game.placedCount[color] || 0) === 0) {
    const corner = START_CORNERS[color];
    if (!cells.some(cell => cell.q === corner.q && cell.r === corner.r)) {
      return { ok: false, error: `${COLOR_LABELS[color]}의 첫 조각은 시작 모서리를 덮어야 합니다.` };
    }
    return { ok: true, cells };
  }

  const sameColorCells = game.placements
    .filter(placement => placement.color === color)
    .flatMap(placement => placement.cells);

  for (const cell of cells) {
    for (const existing of sameColorCells) {
      if (hexDistance(cell, existing) <= 1) {
        return { ok: false, error: "같은 색 조각끼리는 붙어 있을 수 없습니다. 한 칸을 띄워야 합니다." };
      }
    }
  }

  let bridged = false;
  outer:
  for (const cell of cells) {
    for (const existing of sameColorCells) {
      if (hexDistance(cell, existing) !== 2) continue;
      const commons = commonNeighbors(cell, existing);
      if (commons.length === 1) {
        if (!occupied.has(`${commons[0].q},${commons[0].r}`)) { bridged = true; break outer; }
      } else {
        bridged = true; break outer;
      }
    }
  }
  if (!bridged) return { ok: false, error: "같은 색 조각과 한 칸 간격으로 이어져야 합니다." };
  return { ok: true, cells };
}

function firstLegalPlacement(game, color) {
  if (game.passed[color]) return null;
  for (const pieceId of game.remaining[color] || []) {
    for (const orientation of ORIENTATIONS[pieceId]) {
      for (const anchor of BOARD_CELLS) {
        const cells = orientation.map(cell => ({ q: cell.q + anchor.q, r: cell.r + anchor.r }));
        if (validatePlacement(game, color, pieceId, cells).ok) return { pieceId, cells };
      }
    }
  }
  return null;
}

function colorScore(game, color) {
  return (game.remaining[color] || []).reduce((sum, pieceId) => sum + PIECE_BY_ID.get(pieceId).cells.length, 0);
}

function finishGame(game) {
  game.phase = "ended";
  const scores = game.players.map(player => ({
    id: player.id,
    remaining: game.turnColors
      .filter(color => game.colorOwners[color] === player.id)
      .reduce((sum, color) => sum + colorScore(game, color), 0)
  }));
  const best = Math.min(...scores.map(entry => entry.remaining));
  game.winnerIds = scores.filter(entry => entry.remaining === best).map(entry => entry.id);
  const winnerNames = game.winnerIds.map(id => playerById(game, id)?.name).filter(Boolean).join(", ");
  game.lastAction = `${winnerNames || "플레이어"}님이 남은 ${best}칸으로 승리했습니다!`;
}

function advanceTurn(game) {
  if (game.turnColors.every(color => game.passed[color])) {
    finishGame(game);
    game.turnDeadline = null;
    return;
  }
  do {
    game.turnColorIndex = (game.turnColorIndex + 1) % game.turnColors.length;
  } while (game.passed[currentColor(game)]);
  game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
}

function skipTurn(game) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 아닙니다." };
  const color = currentColor(game);
  const player = playerById(game, game.colorOwners[color]);
  game.lastAction = `${player?.name || "플레이어"}님의 ${COLOR_LABELS[color]}이(가) 시간 초과로 차례를 넘겼습니다.`;
  advanceTurn(game);
  game.revision += 1;
  return { ok: true };
}

function place(game, playerId, pieceId, proposedCells) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 아닙니다." };
  const color = currentColor(game);
  if (game.colorOwners[color] !== String(playerId)) return { ok: false, error: "지금은 내 차례가 아닙니다." };
  const validation = validatePlacement(game, color, pieceId, proposedCells);
  if (!validation.ok) return validation;

  game.placements.push({
    color,
    pieceId: String(pieceId),
    cells: validation.cells.map(cell => ({ ...cell })),
    order: game.placements.length
  });
  game.remaining[color] = game.remaining[color].filter(id => id !== String(pieceId));
  game.placedCount[color] += 1;
  const player = playerById(game, playerId);
  game.lastAction = `${player?.name || "플레이어"}님이 ${COLOR_LABELS[color]} ${pieceId} 조각을 놓았습니다.`;
  if (game.remaining[color].length === 0) game.passed[color] = true;
  advanceTurn(game);
  game.revision += 1;
  return { ok: true };
}

function pass(game, playerId) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 아닙니다." };
  const color = currentColor(game);
  if (game.colorOwners[color] !== String(playerId)) return { ok: false, error: "지금은 내 차례가 아닙니다." };
  if (firstLegalPlacement(game, color)) return { ok: false, error: "아직 놓을 수 있는 조각이 있습니다." };
  game.passed[color] = true;
  const player = playerById(game, playerId);
  game.lastAction = `${player?.name || "플레이어"}님의 ${COLOR_LABELS[color]}은 더 놓을 수 없어 종료되었습니다.`;
  advanceTurn(game);
  game.revision += 1;
  return { ok: true };
}

function stateFor(game, playerId) {
  const id = String(playerId);
  const activeColor = currentColor(game);
  const activePlayerId = activeColor ? game.colorOwners[activeColor] : null;
  const colorStates = game.turnColors.map(color => ({
    id: color,
    label: COLOR_LABELS[color],
    ownerId: game.colorOwners[color],
    pieceCount: (game.remaining[color] || []).length,
    remainingCells: colorScore(game, color),
    passed: !!game.passed[color],
    startCorner: START_CORNERS[color]
  }));
  const players = game.players.map(player => {
    const colors = game.turnColors.filter(color => game.colorOwners[color] === player.id);
    return {
      id: player.id,
      name: player.name,
      colors,
      pieceCount: colors.reduce((sum, color) => sum + (game.remaining[color] || []).length, 0),
      remainingCells: colors.reduce((sum, color) => sum + colorScore(game, color), 0),
      out: colors.length > 0 && colors.every(color => game.passed[color])
    };
  });
  const hasMove = game.phase === "playing" && activeColor ? !!firstLegalPlacement(game, activeColor) : false;
  return {
    phase: game.phase,
    boardRadius: BOARD_RADIUS,
    players,
    colors: colorStates,
    placements: game.placements.map(placement => ({
      color: placement.color,
      pieceId: placement.pieceId,
      cells: placement.cells.map(cell => ({ ...cell })),
      order: placement.order
    })),
    remaining: Object.fromEntries(game.turnColors.map(color => [color, [...(game.remaining[color] || [])]])),
    activeColor,
    activePlayerId,
    myColors: game.turnColors.filter(color => game.colorOwners[color] === id),
    canPass: activePlayerId === id && !hasMove,
    winnerIds: [...game.winnerIds],
    lastAction: game.lastAction,
    turnDeadline: game.turnDeadline || null,
    turnSeconds: TURN_SECONDS,
    revision: game.revision
  };
}

module.exports = {
  COLOR_ORDER,
  COLOR_LABELS,
  BOARD_RADIUS,
  BOARD_CELLS,
  START_CORNERS,
  PIECES,
  ORIENTATIONS,
  TURN_SECONDS,
  inBoard,
  hexDistance,
  commonNeighbors,
  createGame,
  addPlayer,
  removePlayer,
  resetToLobby,
  assignColors,
  startGame,
  currentColor,
  validatePlacement,
  firstLegalPlacement,
  colorScore,
  place,
  pass,
  skipTurn,
  stateFor
};
