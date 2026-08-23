"use strict";

const crypto = require("crypto");

const TURN_SECONDS = 25;
const HAND_SIZE = 5;
const STARTING_FUSES = 3;
const LIMIT = 77;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;

function randomInt(max) {
  return crypto.randomInt(max);
}

function shuffle(items, pick = randomInt) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const chosen = pick(index + 1);
    [result[index], result[chosen]] = [result[chosen], result[index]];
  }
  return result;
}

function buildDeck() {
  const deck = [];
  for (let value = 1; value <= 10; value += 1) {
    for (let copy = 1; copy <= 4; copy += 1) {
      deck.push({ id: `charge-${value}-${copy}`, kind: "number", value });
    }
  }
  for (const [value, copies] of [[-5, 4], [-10, 3]]) {
    for (let copy = 1; copy <= copies; copy += 1) {
      deck.push({ id: `cool-${Math.abs(value)}-${copy}`, kind: "number", value });
    }
  }
  for (const [kind, copies] of [["reverse", 4], ["hold", 3], ["half", 3], ["defuse", 2]]) {
    for (let copy = 1; copy <= copies; copy += 1) {
      deck.push({ id: `${kind}-${copy}`, kind, value: null });
    }
  }
  return deck;
}

function cleanName(value, fallback) {
  return String(value || "").trim().slice(0, 12) || fallback;
}

function createGame(hostId, hostName) {
  return {
    phase: "lobby",
    players: [{ id: String(hostId), name: cleanName(hostName, "방장") }],
    hands: {},
    fuses: {},
    deck: [],
    discard: [],
    total: 0,
    direction: 1,
    turnIndex: 0,
    winnerId: null,
    round: 0,
    lastCard: null,
    lastAction: "플레이어를 기다리고 있습니다.",
    lastActionKind: "lobby",
    turnDeadline: null,
    actionNumber: 0
  };
}

function addPlayer(game, playerId, name) {
  const id = String(playerId);
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (game.players.some(player => player.id === id)) return { ok: true };
  if (game.players.length >= MAX_PLAYERS) return { ok: false, error: "방이 가득 찼습니다." };
  game.players.push({ id, name: cleanName(name, `플레이어 ${game.players.length + 1}`) });
  return { ok: true };
}

function removePlayer(game, playerId) {
  const id = String(playerId);
  game.players = game.players.filter(player => player.id !== id);
  delete game.hands[id];
  delete game.fuses[id];
}

function resetToLobby(game, message = "대기실로 돌아왔습니다.") {
  game.phase = "lobby";
  game.hands = {};
  game.fuses = {};
  game.deck = [];
  game.discard = [];
  game.total = 0;
  game.direction = 1;
  game.turnIndex = 0;
  game.winnerId = null;
  game.round = 0;
  game.lastCard = null;
  game.lastAction = message;
  game.lastActionKind = "lobby";
  game.turnDeadline = null;
  game.actionNumber += 1;
  return { ok: true };
}

function isAlive(game, playerId) {
  return Number(game.fuses[String(playerId)] || 0) > 0;
}

function activePlayer(game) {
  return game.players[game.turnIndex] || null;
}

function nextAliveIndex(game, fromIndex, direction = game.direction) {
  const count = game.players.length;
  if (!count) return 0;
  for (let step = 1; step <= count; step += 1) {
    const index = ((fromIndex + direction * step) % count + count) % count;
    if (isAlive(game, game.players[index].id)) return index;
  }
  return fromIndex;
}

function replenishDeck(game, pick = randomInt) {
  if (game.deck.length || !game.discard.length) return;
  game.deck = shuffle(game.discard, pick);
  game.discard = [];
}

function drawCard(game, playerId, pick = randomInt) {
  const hand = game.hands[String(playerId)];
  if (!hand) return null;
  replenishDeck(game, pick);
  const card = game.deck.pop() || null;
  if (card) hand.push(card);
  return card;
}

function startMatch(game, pick = randomInt) {
  if (game.phase !== "lobby" && game.phase !== "finished") {
    return { ok: false, error: "지금은 새 게임을 시작할 수 없습니다." };
  }
  if (game.players.length < MIN_PLAYERS || game.players.length > MAX_PLAYERS) {
    return { ok: false, error: "2명부터 8명까지 모여야 시작할 수 있습니다." };
  }

  game.phase = "playing";
  game.hands = Object.fromEntries(game.players.map(player => [player.id, []]));
  game.fuses = Object.fromEntries(game.players.map(player => [player.id, STARTING_FUSES]));
  game.deck = shuffle(buildDeck(), pick);
  game.discard = [];
  game.total = 0;
  game.direction = 1;
  game.turnIndex = 0;
  game.winnerId = null;
  game.round = 1;
  game.lastCard = null;

  for (let cardIndex = 0; cardIndex < HAND_SIZE; cardIndex += 1) {
    for (const player of game.players) drawCard(game, player.id, pick);
  }

  game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
  game.lastAction = `${game.players[0].name}님의 차례로 해체 작전을 시작합니다.`;
  game.lastActionKind = "start";
  game.actionNumber += 1;
  return { ok: true };
}

function totalAfter(card, currentTotal) {
  if (card.kind === "number") return Math.max(0, currentTotal + Number(card.value || 0));
  if (card.kind === "half") return Math.floor(currentTotal / 2);
  if (card.kind === "defuse") return 0;
  return currentTotal;
}

function cardLabel(card) {
  if (card.kind === "number") return `${card.value > 0 ? "+" : ""}${card.value}`;
  return { reverse: "방향 전환", hold: "합계 유지", half: "절반 감압", defuse: "완전 해제" }[card.kind] || "장비";
}

function playCard(game, playerId, message, pick = randomInt) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  const actor = activePlayer(game);
  if (!actor || actor.id !== String(playerId)) return { ok: false, error: "현재 차례가 아닙니다." };
  if (!isAlive(game, actor.id)) return { ok: false, error: "이미 퓨즈를 모두 잃었습니다." };

  const hand = game.hands[actor.id] || [];
  const cardIndex = hand.findIndex(card => card.id === String(message.cardId || ""));
  if (cardIndex < 0) return { ok: false, error: "내 손에 없는 카드입니다." };
  const [card] = hand.splice(cardIndex, 1);
  game.discard.push(card);
  game.lastCard = card;

  const before = game.total;
  game.total = totalAfter(card, game.total);
  if (card.kind === "reverse") game.direction *= -1;

  const exploded = game.total >= LIMIT;
  if (exploded) {
    game.fuses[actor.id] = Math.max(0, game.fuses[actor.id] - 1);
    const remaining = game.players.filter(player => isAlive(game, player.id));
    if (remaining.length <= 1) {
      game.phase = "finished";
      game.winnerId = remaining[0]?.id || null;
      game.turnDeadline = null;
      game.lastAction = `${actor.name}님의 합계가 ${game.total}이 되어 폭발했습니다. ${remaining[0]?.name || "생존자"}님이 최종 승리했습니다!`;
      game.lastActionKind = "finish";
      game.actionNumber += 1;
      return { ok: true, exploded: true };
    }
    game.total = 0;
    game.round += 1;
    game.turnIndex = nextAliveIndex(game, game.turnIndex);
    drawCard(game, actor.id, pick);
    game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
    game.lastAction = `${actor.name}님이 ${cardLabel(card)} 카드로 ${before}에서 폭발선을 넘었습니다. 퓨즈 1개를 잃고 합계를 0으로 재설정합니다.`;
    game.lastActionKind = "explosion";
    game.actionNumber += 1;
    return { ok: true, exploded: true };
  }

  drawCard(game, actor.id, pick);
  game.turnIndex = nextAliveIndex(game, game.turnIndex);
  game.turnDeadline = Date.now() + TURN_SECONDS * 1000;
  const directionNote = card.kind === "reverse" ? " 진행 방향이 바뀌었습니다." : "";
  game.lastAction = `${actor.name}님이 ${cardLabel(card)} 카드를 내서 합계를 ${before}에서 ${game.total}(으)로 바꿨습니다.${directionNote}`;
  game.lastActionKind = card.kind;
  game.actionNumber += 1;
  return { ok: true, exploded: false };
}

function autoPlay(game, pick = randomInt) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  const actor = activePlayer(game);
  const hand = game.hands[actor?.id] || [];
  if (!actor || !hand.length) return { ok: false, error: "자동으로 낼 카드가 없습니다." };
  const ranked = [...hand].sort((left, right) => {
    const leftTotal = totalAfter(left, game.total);
    const rightTotal = totalAfter(right, game.total);
    const leftRisk = leftTotal >= LIMIT ? 1000 + leftTotal : leftTotal;
    const rightRisk = rightTotal >= LIMIT ? 1000 + rightTotal : rightTotal;
    return leftRisk - rightRisk;
  });
  const result = playCard(game, actor.id, { cardId: ranked[0].id }, pick);
  if (result.ok && game.phase === "playing") {
    game.lastAction = `${game.lastAction} 제한 시간이 지나 안전한 카드를 자동으로 선택했습니다.`;
  }
  return result;
}

function stateFor(game, viewerId) {
  const viewer = String(viewerId);
  return {
    phase: game.phase,
    round: game.round,
    limit: LIMIT,
    total: game.total,
    direction: game.direction,
    turnPlayerId: game.phase === "playing" ? activePlayer(game)?.id || null : null,
    players: game.players.map(player => ({
      id: player.id,
      name: player.name,
      fuses: Number(game.fuses[player.id] || 0),
      eliminated: game.phase !== "lobby" && !isAlive(game, player.id),
      handCount: (game.hands[player.id] || []).length
    })),
    hand: game.phase === "playing" ? [...(game.hands[viewer] || [])] : [],
    deckCount: game.deck.length,
    lastCard: game.lastCard,
    winnerId: game.winnerId,
    lastAction: game.lastAction,
    lastActionKind: game.lastActionKind,
    turnDeadline: game.turnDeadline || null,
    turnSeconds: TURN_SECONDS,
    actionNumber: game.actionNumber
  };
}

module.exports = {
  HAND_SIZE,
  LIMIT,
  MAX_PLAYERS,
  MIN_PLAYERS,
  STARTING_FUSES,
  TURN_SECONDS,
  activePlayer,
  addPlayer,
  autoPlay,
  buildDeck,
  createGame,
  playCard,
  removePlayer,
  resetToLobby,
  shuffle,
  startMatch,
  stateFor,
  totalAfter
};
