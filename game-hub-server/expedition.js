"use strict";

const crypto = require("crypto");

// 규칙은 테마와 무관하게 동일하다. 테마는 카드에 붙는 이름표만 바꾼다.
const THEMES = Object.freeze({
  orerun: Object.freeze({
    label: "광맥 탐사",
    site: "갱도",
    treasure: "광물",
    unit: "덩이",
    relic: "금덩이",
    hazards: Object.freeze(["낙석", "유독가스", "갱도 붕괴", "지하수", "박쥐 떼"])
  }),
  tombdig: Object.freeze({
    label: "고분 탐사",
    site: "묘도",
    treasure: "부장품",
    unit: "점",
    relic: "황금 가면",
    hazards: Object.freeze(["함정", "독충", "봉인 파손", "모래 붕괴", "저주"])
  }),
  voidrun: Object.freeze({
    label: "우주 탐사",
    site: "항로",
    treasure: "자원",
    unit: "유닛",
    relic: "우주 보석",
    hazards: Object.freeze(["운석", "태양풍", "연료 누출", "통신 두절", "중력 이상"])
  })
});
const DEFAULT_THEME = "orerun";

const TREASURE_VALUES = Object.freeze([1, 2, 3, 4, 5, 5, 7, 7, 9, 11, 11, 13, 14, 15, 17]);
const HAZARD_COPIES = 3;
const RELIC_VALUES = Object.freeze([5, 5, 5, 10, 10]);
const TOTAL_ROUNDS = 5;
// 마지막 한 명을 무한정 기다리면 나머지가 멈춘다. 이진 선택이라 이 정도면 충분하고,
// 학년군 문제를 푸는 시간까지 감안한 길이다.
const DECIDE_MS = 25000;
const MIN_PLAYERS = 3;
const MAX_PLAYERS = 8;


// 2022 개정 교육과정은 성취기준을 학년군으로 준다. 5학년과 6학년을 갈라 놓을 근거가 없다.
// 방 하나에 학년군 하나다. 방장 계정의 학년을 따르고, 학년을 모르면 가장 높은 군으로 둔다
// (관리자·게스트가 쉬운 문제를 받아 민망한 것보다 낫다).
const BANDS = Object.freeze(["primary34", "primary56", "middle"]);
const DEFAULT_BAND = "middle";

function bandForGrade(grade) {
  const value = Number(grade);
  // Number(null) 과 Number("") 은 0 이라, 정수 검사만으로는 "정보 없음" 이 초등 저학년으로 떨어진다.
  if (!Number.isInteger(value) || value < 1 || value > 12) return DEFAULT_BAND;
  if (value <= 4) return "primary34";
  if (value <= 6) return "primary56";
  return "middle";
}

function normalizeBand(value) {
  return BANDS.includes(String(value)) ? String(value) : DEFAULT_BAND;
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

// 조사는 앞 글자 받침에 따라 갈린다. 테마마다 단어가 달라서 "이(가)"로 얼버무릴 수 없다.
function hasFinalConsonant(word) {
  const last = String(word || "").trim().slice(-1);
  const code = last.charCodeAt(0);
  if (!(code >= 0xac00 && code <= 0xd7a3)) return false;
  return (code - 0xac00) % 28 !== 0;
}

function withParticle(word, afterFinal, afterVowel) {
  return `${word}${hasFinalConsonant(word) ? afterFinal : afterVowel}`;
}

function normalizeTheme(value) {
  return Object.prototype.hasOwnProperty.call(THEMES, String(value)) ? String(value) : DEFAULT_THEME;
}

function themeOf(game) {
  return THEMES[normalizeTheme(game.theme)];
}

function hazardName(game, index) {
  return themeOf(game).hazards[index] || `위험 ${index + 1}`;
}

function createPlayer(id, name) {
  return {
    id: String(id),
    name: String(name || "플레이어").trim() || "플레이어",
    bank: 0,
    carrying: 0,
    relics: 0,
    inCave: false,
    decision: null,
    caught: false
  };
}

function basePool() {
  const pool = TREASURE_VALUES.map(value => ({ kind: "treasure", value }));
  for (let hazard = 0; hazard < THEMES[DEFAULT_THEME].hazards.length; hazard += 1) {
    for (let copy = 0; copy < HAZARD_COPIES; copy += 1) pool.push({ kind: "hazard", hazard });
  }
  return pool;
}

function createGame(hostId, hostName, theme = DEFAULT_THEME, hostBand = DEFAULT_BAND) {
  return {
    phase: "lobby",
    theme: normalizeTheme(theme),
    band: normalizeBand(hostBand),
    players: [createPlayer(hostId, hostName || "방장")],
    pool: basePool(),
    relicQueue: [...RELIC_VALUES],
    deck: [],
    revealed: [],
    hazardCounts: {},
    path: { gems: 0, relics: [] },
    round: 0,
    totalRounds: TOTAL_ROUNDS,
    lastSplit: null,
    lastReturn: null,
    roundReason: null,
    gameWinnerIds: [],
    decideUntil: 0,
    lastAction: "플레이어를 기다리는 중입니다.",
    actionNumber: 0
  };
}

function addPlayer(game, id, name) {
  const safeId = String(id);
  if (game.phase !== "lobby") return false;
  if (game.players.some(player => player.id === safeId)) return false;
  if (game.players.length >= MAX_PLAYERS) return false;
  game.players.push(createPlayer(safeId, name));
  game.lastAction = `${String(name || "플레이어").trim() || "플레이어"}님이 입장했습니다.`;
  game.actionNumber += 1;
  return true;
}

function removePlayer(game, id) {
  const safeId = String(id);
  const before = game.players.length;
  game.players = game.players.filter(player => player.id !== safeId);
  if (game.players.length === before) return false;
  // 탐사 중이던 사람이 사라지면 남은 사람들의 결정만 기다리면 되므로 여기서 정산을 재확인한다.
  if (game.phase === "deciding") settleIfEveryoneDecided(game);
  return true;
}

function setTheme(game, theme) {
  if (game.phase !== "lobby") return { ok: false, error: "대기실에서만 테마를 바꿀 수 있습니다." };
  game.theme = normalizeTheme(theme);
  game.lastAction = `테마를 '${themeOf(game).label}'${hasFinalConsonant(themeOf(game).label) ? "으로" : "로"} 바꿨습니다.`;
  game.actionNumber += 1;
  return { ok: true };
}

function resetToLobby(game, notice = "대기실로 돌아왔습니다.") {
  game.phase = "lobby";
  game.players.forEach(player => {
    player.bank = 0;
    player.carrying = 0;
    player.relics = 0;
    player.inCave = false;
    player.decision = null;
    player.caught = false;
  });
  game.pool = basePool();
  game.relicQueue = [...RELIC_VALUES];
  game.deck = [];
  game.revealed = [];
  game.hazardCounts = {};
  game.path = { gems: 0, relics: [] };
  game.round = 0;
  game.lastSplit = null;
  game.lastReturn = null;
  game.roundReason = null;
  game.gameWinnerIds = [];
  game.decideUntil = 0;
  game.lastAction = notice;
  game.actionNumber += 1;
}

function explorers(game) {
  return game.players.filter(player => player.inCave);
}

function startMatch(game, pick = randomInt) {
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (game.players.length < MIN_PLAYERS) {
    return { ok: false, error: `${MIN_PLAYERS}명 이상 모여야 시작할 수 있습니다.` };
  }
  game.players.forEach(player => {
    player.bank = 0;
    player.relics = 0;
  });
  game.pool = basePool();
  game.relicQueue = [...RELIC_VALUES];
  game.round = 0;
  game.gameWinnerIds = [];
  startRound(game, pick);
  return { ok: true };
}

function startRound(game, pick = randomInt) {
  game.round += 1;
  game.revealed = [];
  game.hazardCounts = {};
  game.path = { gems: 0, relics: [] };
  game.roundReason = null;
  game.lastSplit = null;
  game.lastReturn = null;
  game.players.forEach(player => {
    player.carrying = 0;
    player.inCave = true;
    player.decision = null;
    player.caught = false;
  });
  // 희귀 보물은 라운드마다 한 장씩 덱에 섞여 들어가고, 한 번 나오면 덱으로 돌아오지 않는다.
  const cards = [...game.pool];
  if (game.relicQueue.length) cards.push({ kind: "relic", value: game.relicQueue.shift() });
  game.deck = shuffle(cards, pick);
  game.lastAction = `${game.round}라운드 시작! 모두 ${themeOf(game).site}에 들어섰습니다.`;
  game.actionNumber += 1;
  revealCard(game);
}

function revealCard(game) {
  const active = explorers(game);
  if (!active.length) {
    endRound(game, "allReturned");
    return;
  }
  if (!game.deck.length) {
    endRound(game, "deckEmpty");
    return;
  }
  const card = game.deck.pop();
  game.revealed.push(card);

  if (card.kind === "treasure") {
    const each = Math.floor(card.value / active.length);
    const remainder = card.value - each * active.length;
    active.forEach(player => { player.carrying += each; });
    card.left = remainder;
    game.path.gems += remainder;
    // 이 값이 학년별 문제(2차)의 원천이 된다. 몫과 나머지를 그대로 보관한다.
    game.lastSplit = { total: card.value, explorers: active.length, each, remainder };
    const label = `${themeOf(game).treasure} ${card.value}${themeOf(game).unit}!`;
    if (each === 0) {
      game.lastAction = `${label} ${active.length}명이 나누기엔 모자라 전부 바닥에 남았습니다.`;
    } else if (remainder === 0) {
      game.lastAction = `${label} ${active.length}명이 ${each}${themeOf(game).unit}씩 딱 나눠 가졌습니다.`;
    } else {
      game.lastAction = `${label} ${active.length}명이 ${each}${themeOf(game).unit}씩 나눠 갖고, ${remainder}${withParticle(themeOf(game).unit, "은", "는")} 바닥에 남았습니다.`;
    }
  } else if (card.kind === "relic") {
    game.path.relics.push(card.value);
    game.lastSplit = null;
    game.lastAction = `${withParticle(themeOf(game).relic, "이", "가")} 나왔습니다. 하나뿐이라 나눌 수 없어, 혼자 돌아가는 사람만 가져갑니다.`;
  } else {
    const count = (game.hazardCounts[card.hazard] || 0) + 1;
    game.hazardCounts[card.hazard] = count;
    game.lastSplit = null;
    if (count >= 2) {
      endRound(game, "hazard", card.hazard);
      return;
    }
    game.lastAction = `${hazardName(game, card.hazard)} 발생! 한 번 더 나오면 라운드가 끝납니다.`;
  }

  game.players.forEach(player => { player.decision = null; });
  game.phase = "deciding";
  game.decideUntil = Date.now() + DECIDE_MS;
  game.actionNumber += 1;
}

function decide(game, playerId, choice) {
  if (game.phase !== "deciding") return { ok: false, error: "지금은 결정할 수 없습니다." };
  const player = game.players.find(item => item.id === String(playerId));
  if (!player) return { ok: false, error: "이 방의 플레이어가 아닙니다." };
  if (!player.inCave) return { ok: false, error: "이미 돌아온 상태입니다." };
  if (choice !== "continue" && choice !== "return") return { ok: false, error: "알 수 없는 선택입니다." };
  player.decision = choice;
  game.actionNumber += 1;
  settleIfEveryoneDecided(game);
  return { ok: true };
}

function decideTimedOut(game) {
  if (game.phase !== "deciding") return false;
  const waiting = explorers(game).filter(player => !player.decision);
  if (!waiting.length) return false;
  waiting.forEach(player => { player.decision = "return"; });
  game.lastAction = waiting.length === 1
    ? `${waiting[0].name}님이 시간 안에 정하지 못해 그대로 돌아왔습니다.`
    : `${waiting.length}명이 시간 안에 정하지 못해 그대로 돌아왔습니다.`;
  game.actionNumber += 1;
  settleIfEveryoneDecided(game);
  return true;
}

function settleIfEveryoneDecided(game) {
  if (game.phase !== "deciding") return;
  const active = explorers(game);
  if (!active.length) {
    endRound(game, "allReturned");
    return;
  }
  if (active.some(player => !player.decision)) return;

  const returners = active.filter(player => player.decision === "return");
  const stayers = active.filter(player => player.decision === "continue");

  if (returners.length) {
    const carriedTotal = returners.reduce((sum, player) => sum + player.carrying, 0);
    const share = Math.floor(game.path.gems / returners.length);
    const leftover = game.path.gems - share * returners.length;
    let relicTotal = 0;
    returners.forEach(player => {
      player.bank += player.carrying + share;
      player.carrying = 0;
      player.inCave = false;
      player.decision = null;
    });
    let picking = share * returners.length;
    for (const revealed of game.revealed) {
      if (picking <= 0) break;
      if (!revealed.left) continue;
      const take = Math.min(revealed.left, picking);
      revealed.left -= take;
      picking -= take;
    }
    game.path.gems = leftover;
    // 혼자 돌아갈 때만 바닥의 희귀 보물을 챙긴다.
    if (returners.length === 1 && game.path.relics.length) {
      relicTotal = game.path.relics.reduce((sum, value) => sum + value, 0);
      returners[0].bank += relicTotal;
      returners[0].relics += game.path.relics.length;
      game.path.relics = [];
    }
    game.lastReturn = {
      names: returners.map(player => player.name),
      carriedTotal,
      pathTotal: share * returners.length + leftover,
      share,
      leftover,
      relicTotal
    };
    const who = returners.map(player => player.name).join(", ");
    game.lastAction = relicTotal
      ? `${who}님이 혼자 돌아와 바닥의 ${themeOf(game).relic}까지 챙겼습니다. (+${relicTotal})`
      : `${who}님이 돌아왔습니다. 바닥에서 ${share}${themeOf(game).unit}씩 더 챙겼고 ${leftover}${withParticle(themeOf(game).unit, "이", "가")} 남았습니다.`;
    game.actionNumber += 1;
  } else {
    game.lastReturn = null;
  }

  if (!stayers.length) {
    endRound(game, "allReturned");
    return;
  }
  stayers.forEach(player => { player.decision = null; });
  revealCard(game);
}

function endRound(game, reason, hazard = null) {
  const lost = explorers(game);
  if (reason === "hazard") {
    lost.forEach(player => {
      player.carrying = 0;
      player.inCave = false;
      player.decision = null;
      // 스스로 돌아온 사람과 구별해야 라운드 결과 화면이 읽힌다.
      player.caught = true;
    });
    // 라운드를 끝낸 위험 카드 한 장은 게임에서 완전히 빠져 뒤 라운드가 조금 달라진다.
    const index = game.pool.findIndex(card => card.kind === "hazard" && card.hazard === hazard);
    if (index >= 0) game.pool.splice(index, 1);
    game.lastAction = `${withParticle(hazardName(game, hazard), "이", "가")} 다시 나왔습니다! 남아 있던 ${lost.length}명은 빈손으로 쫓겨났습니다.`;
  } else if (reason === "deckEmpty") {
    lost.forEach(player => {
      player.bank += player.carrying;
      player.carrying = 0;
      player.inCave = false;
      player.decision = null;
    });
    game.lastAction = "더 넘길 카드가 없어 남은 사람들이 무사히 돌아왔습니다.";
  } else {
    game.lastAction = "모두 돌아와 라운드가 끝났습니다.";
  }

  // 챙겨가지 않은 희귀 보물은 그대로 묻힌다.
  game.path = { gems: 0, relics: [] };
  game.roundReason = reason;
  game.decideUntil = 0;
  game.roundHazard = reason === "hazard" ? hazard : null;
  game.phase = game.round >= game.totalRounds ? "gameEnd" : "roundEnd";
  if (game.phase === "gameEnd") {
    const best = game.players.reduce((max, player) => Math.max(max, player.bank), 0);
    game.gameWinnerIds = game.players.filter(player => player.bank === best).map(player => player.id);
  }
  game.actionNumber += 1;
}

function nextRound(game, pick = randomInt) {
  if (game.phase !== "roundEnd") return { ok: false, error: "다음 라운드를 시작할 수 없습니다." };
  startRound(game, pick);
  return { ok: true };
}

function newGame(game, pick = randomInt) {
  if (game.phase !== "gameEnd") return { ok: false, error: "새 게임을 시작할 수 없습니다." };
  game.players.forEach(player => {
    player.bank = 0;
    player.relics = 0;
  });
  game.pool = basePool();
  game.relicQueue = [...RELIC_VALUES];
  game.round = 0;
  game.gameWinnerIds = [];
  startRound(game, pick);
  return { ok: true };
}

function remainingCounts(game) {
  const counts = { total: game.deck.length, treasure: 0, hazard: 0, relic: 0, deadly: 0 };
  game.deck.forEach(card => {
    if (card.kind === "treasure") counts.treasure += 1;
    else if (card.kind === "relic") counts.relic += 1;
    else {
      counts.hazard += 1;
      // 이미 한 번 나온 종류가 또 나오면 그 자리에서 라운드가 끝난다.
      if ((game.hazardCounts[card.hazard] || 0) >= 1) counts.deadly += 1;
    }
  });
  return counts;
}

function stateFor(game, viewerId) {
  const safeViewer = String(viewerId);
  const active = explorers(game);
  const theme = themeOf(game);
  return {
    phase: game.phase,
    theme: normalizeTheme(game.theme),
    themeLabel: theme.label,
    site: theme.site,
    treasureLabel: theme.treasure,
    unit: theme.unit,
    relicLabel: theme.relic,
    hazardNames: [...theme.hazards],
    round: game.round,
    totalRounds: game.totalRounds,
    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS,
    deckCount: game.deck.length,
    decideUntil: game.phase === "deciding" ? game.decideUntil : 0,
    band: game.band,
    remaining: remainingCounts(game),
    revealed: game.revealed.map(card => ({ ...card })),
    hazardCounts: { ...game.hazardCounts },
    path: { gems: game.path.gems, relics: [...game.path.relics] },
    explorerCount: active.length,
    // 남이 뭘 골랐는지는 모두 정하기 전까지 숨긴다. 동시 선택이 핵심이라서.
    decidedIds: active.filter(player => player.decision).map(player => player.id),
    myDecision: game.players.find(player => player.id === safeViewer)?.decision || null,
    players: game.players.map(player => ({
      id: player.id,
      name: player.name,
      bank: player.bank,
      carrying: player.carrying,
      relics: player.relics,
      inCave: player.inCave,
      caught: player.caught
    })),
    lastSplit: game.lastSplit ? { ...game.lastSplit } : null,
    lastReturn: game.lastReturn ? { ...game.lastReturn, names: [...game.lastReturn.names] } : null,
    roundReason: game.roundReason,
    roundHazard: game.roundHazard ?? null,
    gameWinnerIds: [...game.gameWinnerIds],
    lastAction: game.lastAction,
    actionNumber: game.actionNumber
  };
}

module.exports = {
  THEMES,
  BANDS,
  DEFAULT_BAND,
  bandForGrade,
  normalizeBand,
  TREASURE_VALUES,
  RELIC_VALUES,
  TOTAL_ROUNDS,
  MIN_PLAYERS,
  MAX_PLAYERS,
  createGame,
  addPlayer,
  removePlayer,
  setTheme,
  resetToLobby,
  startMatch,
  decide,
  decideTimedOut,
  DECIDE_MS,
  nextRound,
  newGame,
  stateFor,
  shuffle
};
