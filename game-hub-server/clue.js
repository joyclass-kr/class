"use strict";

const crypto = require("crypto");

const SUSPECTS = Object.freeze([
  { name: "백작부인", color: "#b03a6b" },
  { name: "집사장", color: "#2b2b2b" },
  { name: "정원사", color: "#2e7d46" },
  { name: "주치의", color: "#c17f18" },
  { name: "골동품상", color: "#1f4e8c" },
  { name: "무희", color: "#b8283a" }
]);
const WEAPONS = Object.freeze(["촛대", "밧줄", "렌치", "손전등", "만능열쇠", "유리칼"]);
const ROOMS = Object.freeze(["온실", "무도회장", "주방", "서재", "거실", "식당", "사무실", "현관", "당구실"]);
const CENTER_ROOM = 4;

// Corridor grid: two straight hallways run the width of the board - a top
// hallway between room-row 0 and room-row 1, and a bottom hallway between
// room-row 1 and room-row 2 - each cut into 7 tiles. 온실/무도회장/주방 only
// border the top hallway, 사무실/현관/당구실 only border the bottom one, and
// 서재/거실/식당 sit between the two so each has a door onto both. Every
// other hallway tile (t0/t2/t4/t6, b0/b2/b4/b6) is a secret staircase; taking
// one instantly drops you on the tile directly across the mansion from it.
const CORRIDOR_CELLS = Object.freeze([
  "t0", "t1", "t2", "t3", "t4", "t5", "t6",
  "b0", "b1", "b2", "b3", "b4", "b5", "b6"
]);
const CELL_COORDS = Object.freeze({
  t0: [20, 130], t1: [70, 130], t2: [130, 130], t3: [190, 130], t4: [250, 130], t5: [310, 130], t6: [360, 130],
  b0: [20, 250], b1: [70, 250], b2: [130, 250], b3: [190, 250], b4: [250, 250], b5: [310, 250], b6: [360, 250]
});
const CELL_NEIGHBORS = Object.freeze({
  t0: ["t1"], t1: ["t0", "t2"], t2: ["t1", "t3"], t3: ["t2", "t4"], t4: ["t3", "t5"], t5: ["t4", "t6"], t6: ["t5"],
  b0: ["b1"], b1: ["b0", "b2"], b2: ["b1", "b3"], b3: ["b2", "b4"], b4: ["b3", "b5"], b5: ["b4", "b6"], b6: ["b5"]
});
const CELL_ROOMS = Object.freeze({
  t1: [0, 3], t3: [1, 4], t5: [2, 5],
  b1: [3, 6], b3: [4, 7], b5: [5, 8]
});
const ROOM_CELLS = Object.freeze({
  0: ["t1"], 1: ["t3"], 2: ["t5"],
  3: ["t1", "b1"], 4: ["t3", "b3"], 5: ["t5", "b5"],
  6: ["b1"], 7: ["b3"], 8: ["b5"]
});
const SECRET_PASSAGE_PAIRS = Object.freeze({
  t0: "b0", b0: "t0", t2: "b2", b2: "t2", t4: "b4", b4: "t4", t6: "b6", b6: "t6"
});
const START_ROOMS = Object.freeze([0, 2, 3, 5, 6, 8]);
const MIN_PLAYERS = 3;
const MAX_PLAYERS = 6;
const TURN_TIME_MS = 45000;
const REFUTE_TIME_MS = 15000;
const AVATAR_URL_PATTERN = /^\/assets\/avatars\/[A-Za-z0-9._%()-]+\.webp$/i;

function safeAvatarUrl(url) {
  return typeof url === "string" && AVATAR_URL_PATTERN.test(url) ? url : null;
}

function randomInt(maximum) {
  return crypto.randomInt(maximum);
}

function shuffle(values, pick = randomInt) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = pick(index + 1);
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function cardType(id) {
  if (id < 6) return "suspect";
  if (id < 12) return "weapon";
  return "room";
}

function cardName(id) {
  if (id < 6) return SUSPECTS[id].name;
  if (id < 12) return WEAPONS[id - 6];
  return ROOMS[id - 12];
}

function createPlayer(id, name, avatarUrl) {
  return {
    id: String(id),
    name: String(name || "플레이어").trim() || "플레이어",
    avatarUrl: safeAvatarUrl(avatarUrl),
    roomIndex: -1,
    cellId: null,
    active: true
  };
}

function createGame(hostId, hostName, hostAvatarUrl) {
  return {
    phase: "lobby",
    players: [createPlayer(hostId, hostName || "방장", hostAvatarUrl)],
    hands: {},
    solution: null,
    turnIndex: 0,
    turnPhase: "move",
    dice: null,
    moved: false,
    suggestionUsed: false,
    pendingSuggestion: null,
    winnerId: null,
    solutionRevealed: false,
    deadline: null,
    log: "플레이어를 기다리는 중입니다.",
    actionNumber: 0
  };
}

function addPlayer(game, id, name, avatarUrl) {
  const safeId = String(id);
  if (game.phase !== "lobby" || game.players.some(player => player.id === safeId) || game.players.length >= MAX_PLAYERS) return false;
  game.players.push(createPlayer(safeId, name, avatarUrl));
  game.log = `${String(name || "플레이어").trim() || "플레이어"}님이 입장했습니다.`;
  return true;
}

function removePlayer(game, id) {
  const safeId = String(id);
  const before = game.players.length;
  game.players = game.players.filter(player => player.id !== safeId);
  delete game.hands[safeId];
  return game.players.length !== before;
}

function resetToLobby(game, notice = "대기실로 돌아왔습니다.") {
  game.phase = "lobby";
  game.players.forEach(player => {
    player.roomIndex = -1;
    player.cellId = null;
    player.active = true;
  });
  game.hands = {};
  game.solution = null;
  game.turnIndex = 0;
  game.turnPhase = "move";
  game.dice = null;
  game.moved = false;
  game.suggestionUsed = false;
  game.pendingSuggestion = null;
  game.winnerId = null;
  game.solutionRevealed = false;
  game.deadline = null;
  game.log = notice;
  game.actionNumber += 1;
}

function playerById(game, id) {
  return game.players.find(player => player.id === String(id));
}

function activePlayer(game) {
  return game.players[game.turnIndex] || null;
}

function startMatch(game, pick = randomInt) {
  if (game.phase !== "lobby" || game.players.length < MIN_PLAYERS || game.players.length > MAX_PLAYERS) {
    return { ok: false, error: `${MIN_PLAYERS}~${MAX_PLAYERS}명이 모여야 시작할 수 있습니다.` };
  }
  game.players.forEach((player, index) => {
    player.roomIndex = START_ROOMS[index];
    player.cellId = null;
    player.active = true;
  });

  const suspectIds = shuffle([0, 1, 2, 3, 4, 5], pick);
  const weaponIds = shuffle([6, 7, 8, 9, 10, 11], pick);
  const roomIds = shuffle([12, 13, 14, 15, 16, 17, 18, 19, 20], pick);
  game.solution = { suspect: suspectIds[0], weapon: weaponIds[0], room: roomIds[0] };

  const remaining = shuffle([...suspectIds.slice(1), ...weaponIds.slice(1), ...roomIds.slice(1)], pick);
  game.hands = {};
  game.players.forEach(player => { game.hands[player.id] = []; });
  remaining.forEach((card, index) => {
    const player = game.players[index % game.players.length];
    game.hands[player.id].push(card);
  });

  game.turnIndex = 0;
  game.pendingSuggestion = null;
  game.winnerId = null;
  game.solutionRevealed = false;
  game.phase = "playing";
  resetTurnState(game);
  game.log = `${game.players[0].name}님부터 시작합니다.`;
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function resetTurnState(game) {
  game.turnPhase = "move";
  game.dice = null;
  game.moved = false;
  game.suggestionUsed = false;
  game.deadline = Date.now() + TURN_TIME_MS;
}

function advanceTurn(game) {
  const alive = game.players.filter(player => player.active);
  if (!alive.length) return;
  for (let offset = 1; offset <= game.players.length; offset += 1) {
    const nextIndex = (game.turnIndex + offset) % game.players.length;
    if (game.players[nextIndex].active) {
      game.turnIndex = nextIndex;
      resetTurnState(game);
      return;
    }
  }
}

function cellOccupant(game, cellId, excludePlayerId) {
  return game.players.find(player => player.cellId === cellId && player.id !== String(excludePlayerId));
}

// Step-by-step BFS over the corridor grid, up to `dice` tiles. Rooms are
// terminal (you can enter one but not walk back out the same turn) except
// the room the player starts the turn in. Occupied corridor tiles block
// passage, same as the real board; rooms never block.
function reachablePositions(game, player, dice) {
  const startInRoom = player.roomIndex >= 0;
  const startKey = startInRoom ? `r${player.roomIndex}` : player.cellId;
  const visited = new Set([startKey]);
  const rooms = new Set();
  const cells = new Set();
  let frontier = [{ room: startInRoom ? player.roomIndex : -1, cell: startInRoom ? null : player.cellId, steps: 0 }];
  while (frontier.length) {
    const next = [];
    for (const node of frontier) {
      if (node.steps >= dice) continue;
      if (node.room >= 0 && node.steps > 0) continue;
      const neighbors = [];
      if (node.cell) {
        for (const cellId of CELL_NEIGHBORS[node.cell]) neighbors.push({ type: "cell", value: cellId });
        for (const roomIdx of CELL_ROOMS[node.cell] || []) neighbors.push({ type: "room", value: roomIdx });
      } else if (node.room >= 0) {
        for (const cellId of ROOM_CELLS[node.room] || []) neighbors.push({ type: "cell", value: cellId });
      }
      for (const nb of neighbors) {
        const key = nb.type === "room" ? `r${nb.value}` : nb.value;
        if (visited.has(key)) continue;
        if (nb.type === "cell" && cellOccupant(game, nb.value, player.id)) continue;
        visited.add(key);
        if (nb.type === "room") rooms.add(nb.value);
        else cells.add(nb.value);
        next.push({ room: nb.type === "room" ? nb.value : -1, cell: nb.type === "cell" ? nb.value : null, steps: node.steps + 1 });
      }
    }
    frontier = next;
  }
  return { rooms: [...rooms], cells: [...cells] };
}

function roll(game, playerId, pick = randomInt) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "move" || game.dice !== null || game.moved) return { ok: false, error: "지금은 주사위를 굴릴 수 없습니다." };
  game.dice = 1 + pick(6);
  game.log = `${actor.name}님이 주사위 ${game.dice}을(를) 굴렸습니다.`;
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function move(game, playerId, target) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "move" || game.dice === null || game.moved) return { ok: false, error: "지금은 이동할 수 없습니다." };
  if (typeof target !== "string" || !target) return { ok: false, error: "이동할 곳을 선택하세요." };
  const { rooms, cells } = reachablePositions(game, actor, game.dice);
  if (target.startsWith("r")) {
    const roomIdx = Number(target.slice(1));
    if (!rooms.includes(roomIdx)) return { ok: false, error: "주사위 눈으로 이동할 수 없는 방입니다." };
    actor.roomIndex = roomIdx;
    actor.cellId = null;
    game.log = `${actor.name}님이 ${ROOMS[roomIdx]}(으)로 이동했습니다.`;
  } else {
    if (!cells.includes(target)) return { ok: false, error: "주사위 눈으로 이동할 수 없는 칸입니다." };
    actor.roomIndex = -1;
    actor.cellId = target;
    game.log = `${actor.name}님이 복도를 이동했습니다.`;
  }
  game.moved = true;
  game.turnPhase = "act";
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function stay(game, playerId) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "move" || game.moved) return { ok: false, error: "지금은 사용할 수 없습니다." };
  game.moved = true;
  game.turnPhase = "act";
  const label = actor.roomIndex >= 0 ? ROOMS[actor.roomIndex] : "복도";
  game.log = `${actor.name}님이 ${label}에 머물렀습니다.`;
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function secretPassage(game, playerId) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "move" && game.turnPhase !== "act") return { ok: false, error: "지금은 비밀통로를 사용할 수 없습니다." };
  const target = actor.cellId && SECRET_PASSAGE_PAIRS[actor.cellId];
  if (!target) return { ok: false, error: "이 위치에는 비밀통로가 없습니다." };
  actor.cellId = target;
  actor.roomIndex = -1;
  game.moved = true;
  game.turnPhase = "act";
  game.log = `${actor.name}님이 비밀통로로 이동했습니다.`;
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function checkNextRefuter(game) {
  const suggestion = game.pendingSuggestion;
  while (suggestion.checkPos < suggestion.checkOrder.length) {
    const candidateId = suggestion.checkOrder[suggestion.checkPos];
    const candidate = playerById(game, candidateId);
    const hand = game.hands[candidateId] || [];
    const matches = hand.filter(card => card === suggestion.suspect || card === suggestion.weapon || card === suggestion.room);
    if (matches.length > 0) {
      suggestion.refuterId = candidateId;
      suggestion.matchingCards = matches;
      suggestion.awaitingChoice = true;
      game.log = `${candidate.name}님이 반박할 카드를 고르는 중입니다.`;
      game.deadline = Date.now() + REFUTE_TIME_MS;
      return { reveals: [] };
    }
    suggestion.checkPos += 1;
  }
  game.log = "아무도 반박하지 못했습니다.";
  game.pendingSuggestion = null;
  game.deadline = Date.now() + TURN_TIME_MS;
  return { reveals: [] };
}

function suggest(game, playerId, suspect, weapon) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "act" || game.suggestionUsed) return { ok: false, error: "지금은 추리를 발표할 수 없습니다." };
  if (actor.roomIndex < 0) return { ok: false, error: "방 안에서만 추리를 발표할 수 있습니다." };
  if (!Number.isInteger(suspect) || suspect < 0 || suspect > 5) return { ok: false, error: "용의자를 선택하세요." };
  if (!Number.isInteger(weapon) || weapon < 6 || weapon > 11) return { ok: false, error: "무기를 선택하세요." };

  const room = 12 + actor.roomIndex;

  const checkOrder = [];
  for (let offset = 1; offset < game.players.length; offset += 1) {
    const candidate = game.players[(game.turnIndex + offset) % game.players.length];
    if (candidate.active && candidate.id !== actor.id) checkOrder.push(candidate.id);
  }
  game.suggestionUsed = true;
  game.pendingSuggestion = {
    suggesterId: actor.id,
    suspect, weapon, room,
    checkOrder, checkPos: 0,
    refuterId: null, matchingCards: [], awaitingChoice: false
  };
  game.log = `${actor.name}님이 ${ROOMS[actor.roomIndex]}에서 ${SUSPECTS[suspect].name} · ${WEAPONS[weapon - 6]}을(를) 추리했습니다.`;
  game.actionNumber += 1;
  const result = checkNextRefuter(game);
  return { ok: true, reveals: result.reveals };
}

function chooseCard(game, playerId, card) {
  if (game.phase !== "playing" || !game.pendingSuggestion) return { ok: false, error: "지금은 카드를 고를 수 없습니다." };
  const suggestion = game.pendingSuggestion;
  if (!suggestion.awaitingChoice || suggestion.refuterId !== String(playerId)) return { ok: false, error: "지금은 카드를 고를 수 없습니다." };
  if (!suggestion.matchingCards.includes(card)) return { ok: false, error: "제시할 수 없는 카드입니다." };
  const refuter = playerById(game, playerId);
  const reveal = { playerId: suggestion.suggesterId, title: `${refuter.name}님의 반박`, message: `${refuter.name}님이 ${cardName(card)} 카드를 보여줍니다.`, card };
  game.log = `${refuter.name}님이 카드를 보여주며 반박했습니다.`;
  game.pendingSuggestion = null;
  game.deadline = Date.now() + TURN_TIME_MS;
  game.actionNumber += 1;
  return { ok: true, reveals: [reveal] };
}

function forceTimeout(game) {
  if (game.phase !== "playing" || !game.deadline || Date.now() < game.deadline) return { ok: false };
  if (game.pendingSuggestion && game.pendingSuggestion.awaitingChoice) {
    const suggestion = game.pendingSuggestion;
    const card = suggestion.matchingCards[0];
    const refuter = playerById(game, suggestion.refuterId);
    const reveal = { playerId: suggestion.suggesterId, title: `${refuter.name}님의 반박`, message: `${refuter.name}님이 ${cardName(card)} 카드를 보여줍니다.`, card };
    game.log = `시간 초과 · ${refuter.name}님이 자동으로 카드를 보여주며 반박했습니다.`;
    game.pendingSuggestion = null;
    game.deadline = Date.now() + TURN_TIME_MS;
    game.actionNumber += 1;
    return { ok: true, reveals: [reveal] };
  }
  const actor = activePlayer(game);
  if (actor) game.log = `${actor.name}님이 시간을 초과해 차례를 넘겼습니다.`;
  advanceTurn(game);
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function accuse(game, playerId, suspect, weapon, room) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "act") return { ok: false, error: "지금은 고발할 수 없습니다." };
  if (actor.roomIndex !== CENTER_ROOM) return { ok: false, error: `최종 고발은 ${ROOMS[CENTER_ROOM]}에 있을 때만 할 수 있습니다.` };
  if (!Number.isInteger(suspect) || suspect < 0 || suspect > 5) return { ok: false, error: "용의자를 선택하세요." };
  if (!Number.isInteger(weapon) || weapon < 6 || weapon > 11) return { ok: false, error: "무기를 선택하세요." };
  if (!Number.isInteger(room) || room < 12 || room > 20) return { ok: false, error: "장소를 선택하세요." };

  const correct = suspect === game.solution.suspect && weapon === game.solution.weapon && room === game.solution.room;
  game.actionNumber += 1;
  if (correct) {
    game.phase = "gameEnd";
    game.winnerId = actor.id;
    game.solutionRevealed = true;
    game.log = `${actor.name}님이 도둑을 밝혀냈습니다! 범인은 ${SUSPECTS[game.solution.suspect].name} · ${WEAPONS[game.solution.weapon - 6]} · ${ROOMS[game.solution.room - 12]}였습니다.`;
    return { ok: true, reveals: [] };
  }
  actor.active = false;
  game.log = `${actor.name}님의 고발이 틀렸습니다. 더 이상 움직이거나 고발할 수 없지만 반박에는 계속 참여합니다.`;
  const stillActive = game.players.filter(player => player.active);
  if (!stillActive.length) {
    game.phase = "gameEnd";
    game.winnerId = null;
    game.solutionRevealed = true;
    game.log = `아무도 도둑을 밝히지 못해 미제 사건으로 남았습니다. 범인은 ${SUSPECTS[game.solution.suspect].name} · ${WEAPONS[game.solution.weapon - 6]} · ${ROOMS[game.solution.room - 12]}였습니다.`;
  } else {
    advanceTurn(game);
  }
  return { ok: true, reveals: [] };
}

function endTurn(game, playerId) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "act") return { ok: false, error: "지금은 차례를 넘길 수 없습니다." };
  advanceTurn(game);
  game.log = `${actor.name}님이 차례를 마쳤습니다.`;
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function newGame(game) {
  if (game.phase !== "gameEnd") return { ok: false, error: "새 게임을 시작할 수 없습니다." };
  return startMatch(game);
}

function stateFor(game, viewerId) {
  const safeViewer = String(viewerId);
  const suggestion = game.pendingSuggestion;
  const turnPlayer = game.phase === "playing" ? activePlayer(game) : null;
  const canShowReachable = turnPlayer && turnPlayer.id === safeViewer && game.turnPhase === "move" && game.dice !== null && !game.moved && !suggestion;
  const reachable = canShowReachable ? reachablePositions(game, turnPlayer, game.dice) : { rooms: [], cells: [] };
  return {
    phase: game.phase,
    hand: game.phase === "playing" || game.phase === "gameEnd" ? [...(game.hands[safeViewer] || [])] : [],
    players: game.players.map(player => ({
      id: player.id,
      name: player.name,
      avatarUrl: player.avatarUrl,
      roomIndex: player.roomIndex,
      cellId: player.cellId,
      active: player.active,
      handCount: (game.hands[player.id] || []).length
    })),
    turnPlayerId: turnPlayer?.id || null,
    turnPhase: game.turnPhase,
    dice: game.dice,
    moved: game.moved,
    reachable,
    suggestionUsed: game.suggestionUsed,
    deadline: game.phase === "playing" ? game.deadline : null,
    now: Date.now(),
    pendingSuggestion: suggestion ? {
      suggesterId: suggestion.suggesterId,
      suspect: suggestion.suspect,
      weapon: suggestion.weapon,
      room: suggestion.room,
      refuterId: suggestion.refuterId,
      awaitingChoice: suggestion.awaitingChoice,
      myChoices: suggestion.awaitingChoice && suggestion.refuterId === safeViewer ? [...suggestion.matchingCards] : []
    } : null,
    solution: game.solutionRevealed ? game.solution : null,
    winnerId: game.winnerId,
    log: game.log,
    actionNumber: game.actionNumber
  };
}

module.exports = {
  SUSPECTS, WEAPONS, ROOMS, CENTER_ROOM,
  CORRIDOR_CELLS, CELL_COORDS, CELL_NEIGHBORS, CELL_ROOMS, ROOM_CELLS, SECRET_PASSAGE_PAIRS,
  START_ROOMS,
  MIN_PLAYERS, MAX_PLAYERS, TURN_TIME_MS, REFUTE_TIME_MS,
  createGame, addPlayer, removePlayer, resetToLobby,
  startMatch, roll, move, stay, secretPassage, suggest, chooseCard, accuse, endTurn, newGame,
  forceTimeout, reachablePositions,
  stateFor, shuffle, cardName, cardType
};
