"use strict";

const crypto = require("crypto");

const TURN_SECONDS = 40;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const WORKERS_PER_PLAYER = 5;
const BOARD_LIMIT = 8;
const SIDES = Object.freeze(["north", "east", "south", "west"]);
const DIRECTIONS = Object.freeze([
  Object.freeze({ x: 0, y: -1 }),
  Object.freeze({ x: 1, y: 0 }),
  Object.freeze({ x: 0, y: 1 }),
  Object.freeze({ x: -1, y: 0 })
]);
const OPPOSITE = Object.freeze([2, 3, 0, 1]);
const FEATURE_LABELS = Object.freeze({ road: "길", city: "마을", monastery: "수도원" });
const PLAYER_COLORS = Object.freeze(["#e04f3f", "#2879c7", "#e2a72f", "#5b9b56"]);

const TILE_RECIPES = Object.freeze([
  Object.freeze({ kind: "road-straight", count: 6, edges: ["road", "field", "road", "field"] }),
  Object.freeze({ kind: "road-curve", count: 7, edges: ["road", "road", "field", "field"] }),
  Object.freeze({ kind: "road-junction", count: 5, edges: ["road", "road", "road", "field"] }),
  Object.freeze({ kind: "road-crossing", count: 2, edges: ["road", "road", "road", "road"] }),
  Object.freeze({ kind: "city-cap", count: 7, edges: ["city", "field", "field", "field"] }),
  Object.freeze({ kind: "city-gate", count: 7, edges: ["city", "field", "road", "field"] }),
  Object.freeze({ kind: "city-corner", count: 5, edges: ["city", "city", "field", "field"] }),
  Object.freeze({ kind: "city-road", count: 4, edges: ["city", "road", "road", "field"] }),
  Object.freeze({ kind: "city-bridge", count: 3, edges: ["city", "field", "city", "field"] }),
  Object.freeze({ kind: "monastery", count: 5, edges: ["field", "field", "field", "field"], center: "monastery" }),
  Object.freeze({ kind: "meadow", count: 3, edges: ["field", "field", "field", "field"] })
]);

function cleanName(value, fallback = "플레이어") {
  return String(value || "").trim().slice(0, 12) || fallback;
}

function randomInt(maximum) {
  return crypto.randomInt(maximum);
}

function shuffle(items, pick = randomInt) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = pick(index + 1);
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function createTileDeck() {
  const tiles = [];
  for (const recipe of TILE_RECIPES) {
    for (let copy = 1; copy <= recipe.count; copy += 1) {
      tiles.push({
        id: `${recipe.kind}-${copy}`,
        kind: recipe.kind,
        edges: [...recipe.edges],
        center: recipe.center || null
      });
    }
  }
  return tiles;
}

const BASE_TILES = Object.freeze(createTileDeck().map(tile => Object.freeze({
  ...tile,
  edges: Object.freeze([...tile.edges])
})));

const START_TILE = Object.freeze({
  id: "start-village",
  kind: "start-village",
  edges: Object.freeze(["road", "field", "road", "field"]),
  center: null
});

function rotateEdges(edges, rotation) {
  const turns = ((Number(rotation) || 0) % 4 + 4) % 4;
  return edges.map((_, index) => edges[(index - turns + 4) % 4]);
}

function boardKey(x, y) {
  return `${x},${y}`;
}

function tileAt(game, x, y) {
  return game.board.find(tile => tile.x === x && tile.y === y) || null;
}

function createPlayer(id, name, index) {
  return {
    id: String(id),
    name: cleanName(name, index === 0 ? "방장" : `플레이어 ${index + 1}`),
    color: PLAYER_COLORS[index % PLAYER_COLORS.length],
    score: 0,
    workers: WORKERS_PER_PLAYER
  };
}

function createGame(hostId, hostName) {
  return {
    phase: "lobby",
    players: [createPlayer(hostId, hostName, 0)],
    board: [],
    deck: [],
    currentTile: null,
    turnIndex: 0,
    turnNumber: 0,
    turnDeadline: null,
    winnerIds: [],
    lastAction: "2~4명이 모이면 시작할 수 있습니다.",
    revision: 0
  };
}

function addPlayer(game, playerId, playerName) {
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (game.players.length >= MAX_PLAYERS) return { ok: false, error: "왕국의 길은 최대 4명까지 참여할 수 있습니다." };
  const id = String(playerId);
  if (game.players.some(player => player.id === id)) return { ok: true };
  game.players.push(createPlayer(id, playerName, game.players.length));
  game.revision += 1;
  game.lastAction = `${cleanName(playerName)}님이 참가했습니다.`;
  return { ok: true };
}

function removePlayer(game, playerId) {
  const id = String(playerId);
  game.players = game.players.filter(player => player.id !== id);
  if (game.turnIndex >= game.players.length) game.turnIndex = 0;
  game.revision += 1;
}

function resetToLobby(game, message = "대기실로 돌아왔습니다.") {
  game.phase = "lobby";
  game.board = [];
  game.deck = [];
  game.currentTile = null;
  game.turnIndex = 0;
  game.turnNumber = 0;
  game.turnDeadline = null;
  game.winnerIds = [];
  game.players.forEach((player, index) => {
    player.score = 0;
    player.workers = WORKERS_PER_PLAYER;
    player.color = PLAYER_COLORS[index % PLAYER_COLORS.length];
  });
  game.lastAction = message;
  game.revision += 1;
  return { ok: true };
}

function activePlayer(game) {
  return game.players[game.turnIndex] || null;
}

function candidatePositions(game) {
  if (!game.board.length) return [{ x: 0, y: 0 }];
  const found = new Map();
  for (const tile of game.board) {
    DIRECTIONS.forEach(direction => {
      const x = tile.x + direction.x;
      const y = tile.y + direction.y;
      if (Math.abs(x) > BOARD_LIMIT || Math.abs(y) > BOARD_LIMIT || tileAt(game, x, y)) return;
      found.set(boardKey(x, y), { x, y });
    });
  }
  return [...found.values()];
}

function validatePlacement(game, tile, xValue, yValue, rotationValue) {
  const x = Number(xValue);
  const y = Number(yValue);
  const rotation = ((Number(rotationValue) || 0) % 4 + 4) % 4;
  if (!Number.isInteger(x) || !Number.isInteger(y) || Math.abs(x) > BOARD_LIMIT || Math.abs(y) > BOARD_LIMIT) {
    return { ok: false, error: "보드 범위를 벗어났습니다." };
  }
  if (!tile || !Array.isArray(tile.edges) || tile.edges.length !== 4) {
    return { ok: false, error: "놓을 타일 정보가 올바르지 않습니다." };
  }
  if (tileAt(game, x, y)) return { ok: false, error: "이미 타일이 놓인 자리입니다." };

  const edges = rotateEdges(tile.edges, rotation);
  let neighbors = 0;
  for (let side = 0; side < 4; side += 1) {
    const direction = DIRECTIONS[side];
    const neighbor = tileAt(game, x + direction.x, y + direction.y);
    if (!neighbor) continue;
    neighbors += 1;
    if (edges[side] !== neighbor.edges[OPPOSITE[side]]) {
      return { ok: false, error: `${SIDES[side]}쪽의 ${FEATURE_LABELS[edges[side]] || "들판"}이 이웃 지형과 맞지 않습니다.` };
    }
  }
  if (game.board.length && neighbors === 0) return { ok: false, error: "기존 왕국과 맞닿게 놓아야 합니다." };
  return { ok: true, x, y, rotation, edges, neighbors };
}

function firstLegalPlacement(game, tile = game.currentTile) {
  if (!tile) return null;
  for (const position of candidatePositions(game)) {
    for (let rotation = 0; rotation < 4; rotation += 1) {
      const result = validatePlacement(game, tile, position.x, position.y, rotation);
      if (result.ok) return result;
    }
  }
  return null;
}

function featureComponent(game, startTile, feature) {
  if (!startTile || !["road", "city"].includes(feature) || !startTile.edges.includes(feature)) {
    return { tiles: [], openEdges: 0, workers: [] };
  }
  const queue = [startTile];
  const visited = new Set();
  const tiles = [];
  const workers = [];
  let openEdges = 0;

  while (queue.length) {
    const tile = queue.shift();
    const key = boardKey(tile.x, tile.y);
    if (visited.has(key)) continue;
    visited.add(key);
    tiles.push(tile);
    if (tile.worker?.feature === feature) workers.push({ tile, playerId: tile.worker.playerId });

    for (let side = 0; side < 4; side += 1) {
      if (tile.edges[side] !== feature) continue;
      const direction = DIRECTIONS[side];
      const neighbor = tileAt(game, tile.x + direction.x, tile.y + direction.y);
      if (!neighbor || neighbor.edges[OPPOSITE[side]] !== feature) {
        openEdges += 1;
        continue;
      }
      if (!visited.has(boardKey(neighbor.x, neighbor.y))) queue.push(neighbor);
    }
  }
  return { tiles, openEdges, workers };
}

function canClaim(game, placedTile, playerId, feature) {
  const player = game.players.find(candidate => candidate.id === String(playerId));
  if (!player || player.workers <= 0) return { ok: false, error: "남은 탐험가가 없습니다." };
  if (feature === "monastery") {
    if (placedTile.center !== "monastery") return { ok: false, error: "이 타일에는 수도원이 없습니다." };
    return { ok: true };
  }
  if (!["road", "city"].includes(feature) || !placedTile.edges.includes(feature)) {
    return { ok: false, error: "이 타일에서 선택할 수 없는 지형입니다." };
  }
  const component = featureComponent(game, placedTile, feature);
  if (component.workers.length) return { ok: false, error: "이미 다른 탐험가가 활동 중인 영역입니다." };
  return { ok: true };
}

function awardFeature(game, component, feature, complete) {
  if (!component.workers.length) return [];
  const counts = new Map();
  component.workers.forEach(worker => counts.set(worker.playerId, (counts.get(worker.playerId) || 0) + 1));
  const majority = Math.max(...counts.values());
  const winners = [...counts.entries()].filter(([, count]) => count === majority).map(([id]) => id);
  const points = feature === "city"
    ? component.tiles.length * (complete ? 2 : 1)
    : component.tiles.length;
  winners.forEach(id => {
    const player = game.players.find(candidate => candidate.id === id);
    if (player) player.score += points;
  });
  component.workers.forEach(({ tile, playerId }) => {
    const player = game.players.find(candidate => candidate.id === playerId);
    if (player) player.workers += 1;
    tile.worker = null;
  });
  return winners.map(id => ({ id, points, feature }));
}

function surroundingCount(game, tile) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if ((dx || dy) && tileAt(game, tile.x + dx, tile.y + dy)) count += 1;
    }
  }
  return count;
}

function scoreCompletedFeatures(game, placedTile) {
  const awards = [];
  for (const feature of ["road", "city"]) {
    if (!placedTile.edges.includes(feature)) continue;
    const component = featureComponent(game, placedTile, feature);
    if (component.openEdges === 0) awards.push(...awardFeature(game, component, feature, true));
  }
  for (const tile of game.board) {
    if (tile.worker?.feature !== "monastery") continue;
    if (Math.abs(tile.x - placedTile.x) > 1 || Math.abs(tile.y - placedTile.y) > 1) continue;
    if (surroundingCount(game, tile) === 8) {
      const player = game.players.find(candidate => candidate.id === tile.worker.playerId);
      if (player) {
        player.score += 9;
        player.workers += 1;
        awards.push({ id: player.id, points: 9, feature: "monastery" });
      }
      tile.worker = null;
    }
  }
  return awards;
}

function scoreIncompleteFeatures(game) {
  const visited = { road: new Set(), city: new Set() };
  for (const feature of ["road", "city"]) {
    for (const tile of game.board) {
      const key = boardKey(tile.x, tile.y);
      if (!tile.edges.includes(feature) || visited[feature].has(key)) continue;
      const component = featureComponent(game, tile, feature);
      component.tiles.forEach(entry => visited[feature].add(boardKey(entry.x, entry.y)));
      awardFeature(game, component, feature, false);
    }
  }
  for (const tile of game.board) {
    if (tile.worker?.feature !== "monastery") continue;
    const player = game.players.find(candidate => candidate.id === tile.worker.playerId);
    if (player) {
      player.score += 1 + surroundingCount(game, tile);
      player.workers += 1;
    }
    tile.worker = null;
  }
}

function finishGame(game) {
  scoreIncompleteFeatures(game);
  game.phase = "ended";
  game.currentTile = null;
  game.turnDeadline = null;
  const best = Math.max(...game.players.map(player => player.score));
  game.winnerIds = game.players.filter(player => player.score === best).map(player => player.id);
  const names = game.players.filter(player => game.winnerIds.includes(player.id)).map(player => player.name).join(", ");
  game.lastAction = `${names}님이 ${best}점으로 왕국을 완성했습니다!`;
}

function drawNextPlayableTile(game) {
  while (game.deck.length) {
    const next = game.deck.pop();
    game.currentTile = { ...next, edges: [...next.edges] };
    if (firstLegalPlacement(game, game.currentTile)) return true;
  }
  game.currentTile = null;
  return false;
}

function advanceTurn(game) {
  game.turnNumber += 1;
  game.turnIndex = game.players.length ? (game.turnIndex + 1) % game.players.length : 0;
  if (!drawNextPlayableTile(game)) {
    finishGame(game);
    return;
  }
  game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
}

function startGame(game, pick = randomInt) {
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (game.players.length < MIN_PLAYERS || game.players.length > MAX_PLAYERS) {
    return { ok: false, error: "2~4명이 모여야 시작할 수 있습니다." };
  }
  game.players.forEach((player, index) => {
    player.score = 0;
    player.workers = WORKERS_PER_PLAYER;
    player.color = PLAYER_COLORS[index];
  });
  const deckSize = ({ 2: 30, 3: 36, 4: 40 })[game.players.length];
  game.deck = shuffle(BASE_TILES.map(tile => ({ ...tile, edges: [...tile.edges] })), pick).slice(0, deckSize);
  game.board = [{
    ...START_TILE,
    edges: [...START_TILE.edges],
    x: 0,
    y: 0,
    rotation: 0,
    worker: null,
    placedBy: null,
    order: 0
  }];
  game.turnIndex = 0;
  game.turnNumber = 1;
  game.winnerIds = [];
  game.phase = "playing";
  drawNextPlayableTile(game);
  game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
  game.lastAction = `${game.players[0].name}님부터 왕국을 이어 갑니다.`;
  game.revision += 1;
  return { ok: true };
}

function placeTile(game, playerId, payload = {}) {
  const id = String(playerId);
  const player = game.players.find(candidate => candidate.id === id);
  if (game.phase !== "playing" || !game.currentTile) return { ok: false, error: "진행 중인 게임이 아닙니다." };
  if (!player || activePlayer(game)?.id !== id) return { ok: false, error: "지금은 내 차례가 아닙니다." };
  const validation = validatePlacement(game, game.currentTile, payload.x, payload.y, payload.rotation);
  if (!validation.ok) return validation;

  const placedTile = {
    ...game.currentTile,
    edges: validation.edges,
    x: validation.x,
    y: validation.y,
    rotation: validation.rotation,
    worker: null,
    placedBy: id,
    order: game.board.length
  };
  game.board.push(placedTile);

  const claim = ["road", "city", "monastery"].includes(payload.claim) ? payload.claim : null;
  if (claim) {
    const claimResult = canClaim(game, placedTile, id, claim);
    if (!claimResult.ok) {
      game.board.pop();
      return claimResult;
    }
    placedTile.worker = { playerId: id, feature: claim };
    player.workers -= 1;
  }

  const awards = scoreCompletedFeatures(game, placedTile);
  const awardPoints = awards.filter(award => award.id === id).reduce((sum, award) => sum + award.points, 0);
  const claimText = claim ? ` · ${FEATURE_LABELS[claim]}에 탐험가 배치` : "";
  const scoreText = awardPoints ? ` · ${awardPoints}점 획득` : "";
  game.lastAction = `${player.name}님이 타일을 놓았습니다${claimText}${scoreText}.`;
  game.currentTile = null;
  advanceTurn(game);
  game.revision += 1;
  return { ok: true };
}

function autoPlace(game) {
  if (game.phase !== "playing" || !game.currentTile) return { ok: false, error: "진행 중인 게임이 아닙니다." };
  const player = activePlayer(game);
  const legal = firstLegalPlacement(game);
  if (!player || !legal) {
    advanceTurn(game);
    game.revision += 1;
    return { ok: true };
  }
  const result = placeTile(game, player.id, { ...legal, claim: null });
  if (result.ok && game.phase === "playing") game.lastAction = `${player.name}님의 시간이 끝나 추천 위치에 자동 배치했습니다.`;
  return result;
}

function newGame(game, pick = randomInt) {
  resetToLobby(game, "새 왕국을 준비했습니다.");
  return startGame(game, pick);
}

function stateFor(game, playerId) {
  const id = String(playerId);
  const legal = game.phase === "playing" && game.currentTile ? firstLegalPlacement(game) : null;
  return {
    phase: game.phase,
    players: game.players.map(player => ({ ...player, isMe: player.id === id })),
    board: game.board.map(tile => ({
      id: tile.id,
      kind: tile.kind,
      edges: [...tile.edges],
      center: tile.center,
      x: tile.x,
      y: tile.y,
      rotation: tile.rotation,
      worker: tile.worker ? { ...tile.worker } : null,
      placedBy: tile.placedBy,
      order: tile.order
    })),
    currentTile: game.currentTile ? { ...game.currentTile, edges: [...game.currentTile.edges] } : null,
    activePlayerId: activePlayer(game)?.id || null,
    myId: id,
    deckCount: game.deck.length,
    turnNumber: game.turnNumber,
    winnerIds: [...game.winnerIds],
    lastAction: game.lastAction,
    turnDeadline: game.turnDeadline,
    turnSeconds: TURN_SECONDS,
    suggestedPlacement: legal ? { x: legal.x, y: legal.y, rotation: legal.rotation } : null,
    revision: game.revision
  };
}

module.exports = {
  TURN_SECONDS,
  MIN_PLAYERS,
  MAX_PLAYERS,
  WORKERS_PER_PLAYER,
  BOARD_LIMIT,
  SIDES,
  DIRECTIONS,
  OPPOSITE,
  FEATURE_LABELS,
  PLAYER_COLORS,
  TILE_RECIPES,
  BASE_TILES,
  START_TILE,
  rotateEdges,
  createGame,
  addPlayer,
  removePlayer,
  resetToLobby,
  startGame,
  activePlayer,
  candidatePositions,
  validatePlacement,
  firstLegalPlacement,
  featureComponent,
  canClaim,
  surroundingCount,
  placeTile,
  autoPlace,
  newGame,
  stateFor
};
