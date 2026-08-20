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
const ROOMS = Object.freeze(["온실", "무도회장", "주방", "서재", "사무실", "식당", "거실", "현관", "당구실"]);

// Original mansion layout (not the licensed Cluedo board art): 3x3 room grid,
// index = row*3+col. Every corridor costs the same so a 1d6 roll is either
// "reach a neighbor" (3-6) or "stuck this turn" (1-2), mirroring the classic
// board's mix of easy and blocked moves without needing a full hallway grid.
const ADJACENCY = Object.freeze([
  [{ to: 1, cost: 3 }, { to: 3, cost: 3 }],
  [{ to: 0, cost: 3 }, { to: 2, cost: 3 }, { to: 4, cost: 3 }],
  [{ to: 1, cost: 3 }, { to: 5, cost: 3 }],
  [{ to: 0, cost: 3 }, { to: 4, cost: 3 }, { to: 6, cost: 3 }],
  [{ to: 1, cost: 3 }, { to: 3, cost: 3 }, { to: 5, cost: 3 }, { to: 7, cost: 3 }],
  [{ to: 2, cost: 3 }, { to: 4, cost: 3 }, { to: 8, cost: 3 }],
  [{ to: 3, cost: 3 }, { to: 7, cost: 3 }],
  [{ to: 4, cost: 3 }, { to: 6, cost: 3 }, { to: 8, cost: 3 }],
  [{ to: 5, cost: 3 }, { to: 7, cost: 3 }]
]);
const SECRET_PASSAGES = Object.freeze({ 0: 8, 8: 0, 2: 6, 6: 2 });
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
    suspectIndex: -1,
    roomIndex: -1,
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
    player.suspectIndex = -1;
    player.roomIndex = -1;
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
    player.suspectIndex = index;
    player.roomIndex = START_ROOMS[index];
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

function reachableRooms(game, player, dice) {
  const options = [];
  for (const edge of ADJACENCY[player.roomIndex]) {
    if (edge.cost <= dice) options.push(edge.to);
  }
  return options;
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

function move(game, playerId, targetRoom) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "move" || game.dice === null || game.moved) return { ok: false, error: "지금은 이동할 수 없습니다." };
  const options = reachableRooms(game, actor, game.dice);
  if (!options.includes(targetRoom)) return { ok: false, error: "주사위 눈으로 이동할 수 없는 방입니다." };
  actor.roomIndex = targetRoom;
  game.moved = true;
  game.turnPhase = "act";
  game.log = `${actor.name}님이 ${ROOMS[targetRoom]}(으)로 이동했습니다.`;
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
  game.log = `${actor.name}님이 ${ROOMS[actor.roomIndex]}에 머물렀습니다.`;
  game.actionNumber += 1;
  return { ok: true, reveals: [] };
}

function secretPassage(game, playerId) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.pendingSuggestion) return { ok: false, error: "다른 플레이어의 반박을 기다리는 중입니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (game.turnPhase !== "move" || game.dice !== null || game.moved) return { ok: false, error: "지금은 비밀통로를 사용할 수 없습니다." };
  const target = SECRET_PASSAGES[actor.roomIndex];
  if (target === undefined) return { ok: false, error: "이 방에는 비밀통로가 없습니다." };
  actor.roomIndex = target;
  game.moved = true;
  game.turnPhase = "act";
  game.log = `${actor.name}님이 비밀통로로 ${ROOMS[target]}(으)로 이동했습니다.`;
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
    if (matches.length === 1) {
      const reveal = { playerId: suggestion.suggesterId, title: `${candidate.name}님의 반박`, message: `${candidate.name}님이 ${cardName(matches[0])} 카드를 보여줍니다.`, card: matches[0] };
      game.log = `${candidate.name}님이 카드를 보여주며 반박했습니다.`;
      game.pendingSuggestion = null;
      game.deadline = Date.now() + TURN_TIME_MS;
      return { reveals: [reveal] };
    }
    if (matches.length > 1) {
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
  if (!Number.isInteger(suspect) || suspect < 0 || suspect > 5) return { ok: false, error: "용의자를 선택하세요." };
  if (!Number.isInteger(weapon) || weapon < 6 || weapon > 11) return { ok: false, error: "무기를 선택하세요." };

  const room = 12 + actor.roomIndex;
  const suggestedPlayer = game.players.find(player => player.suspectIndex === suspect);
  if (suggestedPlayer) suggestedPlayer.roomIndex = actor.roomIndex;

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
  return {
    phase: game.phase,
    hand: game.phase === "playing" || game.phase === "gameEnd" ? [...(game.hands[safeViewer] || [])] : [],
    players: game.players.map(player => ({
      id: player.id,
      name: player.name,
      avatarUrl: player.avatarUrl,
      suspectIndex: player.suspectIndex,
      roomIndex: player.roomIndex,
      active: player.active,
      handCount: (game.hands[player.id] || []).length
    })),
    turnPlayerId: game.phase === "playing" ? activePlayer(game)?.id || null : null,
    turnPhase: game.turnPhase,
    dice: game.dice,
    moved: game.moved,
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
  SUSPECTS, WEAPONS, ROOMS, ADJACENCY, SECRET_PASSAGES, START_ROOMS,
  MIN_PLAYERS, MAX_PLAYERS, TURN_TIME_MS, REFUTE_TIME_MS,
  createGame, addPlayer, removePlayer, resetToLobby,
  startMatch, roll, move, stay, secretPassage, suggest, chooseCard, accuse, endTurn, newGame,
  forceTimeout,
  stateFor, shuffle, cardName, cardType
};
