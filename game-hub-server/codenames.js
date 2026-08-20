"use strict";

const crypto = require("crypto");
const WORD_BANK = require("./data/codenames-word-bank");

const MIN_PLAYERS = 4;
const MAX_PLAYERS = 10;
const MIN_GRADE = 1;
const MAX_GRADE = 6;
const BOARD_SIZE = 25;
const TEAMS = Object.freeze(["red", "blue"]);
const ROLES = Object.freeze(["spymaster", "operative"]);

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

function otherTeam(team) {
  return team === "red" ? "blue" : "red";
}

function wordPoolForGrade(grade) {
  const topGrade = grade <= MIN_GRADE ? MIN_GRADE : grade - 1;
  const seen = new Set();
  const pool = [];
  for (let g = MIN_GRADE; g <= topGrade; g += 1) {
    for (const word of WORD_BANK[g] || []) {
      if (!seen.has(word)) {
        seen.add(word);
        pool.push(word);
      }
    }
  }
  return pool;
}

function createPlayer(id, name) {
  return {
    id: String(id),
    name: String(name || "플레이어").trim() || "플레이어",
    team: null,
    role: null
  };
}

function createGame(hostId, hostName) {
  return {
    phase: "lobby",
    grade: 3,
    players: [createPlayer(hostId, hostName || "방장")],
    board: [],
    currentTeam: "red",
    turnStage: "hint",
    hint: null,
    guessesRemaining: 0,
    guessesUsed: 0,
    winner: null,
    winReason: null,
    log: "팀과 역할을 정하는 중입니다.",
    actionNumber: 0
  };
}

function addPlayer(game, id, name) {
  const safeId = String(id);
  if (game.phase !== "lobby" || game.players.some(player => player.id === safeId) || game.players.length >= MAX_PLAYERS) return false;
  game.players.push(createPlayer(safeId, name));
  game.log = `${String(name || "플레이어").trim() || "플레이어"}님이 입장했습니다.`;
  return true;
}

function removePlayer(game, id) {
  const safeId = String(id);
  const before = game.players.length;
  game.players = game.players.filter(player => player.id !== safeId);
  return game.players.length !== before;
}

function playerById(game, id) {
  return game.players.find(player => player.id === String(id));
}

function setGrade(game, hostId, grade) {
  if (game.phase !== "lobby") return { ok: false, error: "대기실에서만 학년을 바꿀 수 있습니다." };
  const safeGrade = Math.round(Number(grade));
  if (!Number.isInteger(safeGrade) || safeGrade < MIN_GRADE || safeGrade > MAX_GRADE) {
    return { ok: false, error: "학년 범위가 올바르지 않습니다." };
  }
  game.grade = safeGrade;
  game.log = `낱말 범위가 ${safeGrade}학년 미만(1~${safeGrade === MIN_GRADE ? MIN_GRADE : safeGrade - 1}학년)으로 설정되었습니다.`;
  return { ok: true };
}

function setTeamRole(game, playerId, team, role) {
  if (game.phase !== "lobby") return { ok: false, error: "대기실에서만 팀을 정할 수 있습니다." };
  const player = playerById(game, playerId);
  if (!player) return { ok: false, error: "참가자를 찾을 수 없습니다." };
  const safeTeam = TEAMS.includes(team) ? team : null;
  const safeRole = safeTeam && ROLES.includes(role) ? role : null;
  if (safeTeam && safeRole === "spymaster") {
    const taken = game.players.some(other => other.id !== player.id && other.team === safeTeam && other.role === "spymaster");
    if (taken) return { ok: false, error: "이미 다른 사람이 그 팀의 스파이마스터입니다." };
  }
  player.team = safeTeam;
  player.role = safeTeam ? safeRole : null;
  game.log = safeTeam
    ? `${player.name}님이 ${safeTeam === "red" ? "레드팀" : "블루팀"} ${safeRole === "spymaster" ? "스파이마스터" : "요원"}을 선택했습니다.`
    : `${player.name}님이 팀 선택을 취소했습니다.`;
  return { ok: true };
}

function teamComposition(game, team) {
  const members = game.players.filter(player => player.team === team);
  return {
    spymasters: members.filter(player => player.role === "spymaster"),
    operatives: members.filter(player => player.role === "operative")
  };
}

function canStart(game) {
  if (game.players.length < MIN_PLAYERS) return false;
  if (game.players.some(player => !player.team || !player.role)) return false;
  return TEAMS.every(team => {
    const composition = teamComposition(game, team);
    return composition.spymasters.length === 1 && composition.operatives.length >= 1;
  });
}

function buildBoard(game, pick) {
  const pool = wordPoolForGrade(game.grade);
  if (pool.length < BOARD_SIZE) return null;
  const words = shuffle(pool, pick).slice(0, BOARD_SIZE);
  const startingTeam = pick(2) === 0 ? "red" : "blue";
  const colors = shuffle([
    ...Array(9).fill(startingTeam),
    ...Array(8).fill(otherTeam(startingTeam)),
    ...Array(7).fill("neutral"),
    "bomb"
  ], pick);
  const board = words.map((word, index) => ({ word, color: colors[index], revealed: false }));
  return { board, startingTeam };
}

function startGame(game, pick = randomInt) {
  if (game.phase !== "lobby") return { ok: false, error: "이미 시작한 게임입니다." };
  if (!canStart(game)) return { ok: false, error: "두 팀 모두 스파이마스터 1명과 요원 1명 이상이 필요합니다." };
  const built = buildBoard(game, pick);
  if (!built) return { ok: false, error: "선택한 학년 범위에 낱말이 부족합니다." };
  game.board = built.board;
  game.currentTeam = built.startingTeam;
  game.turnStage = "hint";
  game.hint = null;
  game.guessesRemaining = 0;
  game.guessesUsed = 0;
  game.winner = null;
  game.winReason = null;
  game.phase = "playing";
  game.log = `${built.startingTeam === "red" ? "레드팀" : "블루팀"}부터 시작합니다. 스파이마스터가 힌트를 낼 차례입니다.`;
  game.actionNumber += 1;
  return { ok: true };
}

function remainingCount(game, team) {
  return game.board.filter(card => card.color === team && !card.revealed).length;
}

function checkVictory(game) {
  for (const team of TEAMS) {
    if (remainingCount(game, team) === 0) {
      game.winner = team;
      game.winReason = "all-words";
      game.phase = "gameEnd";
      game.log = `${team === "red" ? "레드팀" : "블루팀"}이 자기 팀 낱말을 모두 찾아 승리했습니다.`;
      return true;
    }
  }
  return false;
}

function switchTurn(game, reasonText) {
  game.currentTeam = otherTeam(game.currentTeam);
  game.turnStage = "hint";
  game.hint = null;
  game.guessesRemaining = 0;
  game.guessesUsed = 0;
  game.log = reasonText;
}

function giveHint(game, playerId, word, count) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.turnStage !== "hint") return { ok: false, error: "지금은 힌트를 낼 차례가 아닙니다." };
  const player = playerById(game, playerId);
  if (!player || player.team !== game.currentTeam || player.role !== "spymaster") {
    return { ok: false, error: "현재 팀의 스파이마스터만 힌트를 낼 수 있습니다." };
  }
  const safeWord = String(word || "").trim().slice(0, 20);
  if (!safeWord) return { ok: false, error: "힌트 낱말을 입력하세요." };
  const safeCount = Math.round(Number(count));
  if (!Number.isInteger(safeCount) || safeCount < 0 || safeCount > 9) {
    return { ok: false, error: "힌트 숫자는 0~9 사이여야 합니다." };
  }
  game.hint = { word: safeWord, count: safeCount };
  game.guessesRemaining = safeCount === 0 ? Infinity : safeCount + 1;
  game.guessesUsed = 0;
  game.turnStage = "guess";
  game.log = `${player.name}님의 힌트: "${safeWord}" ${safeCount}`;
  game.actionNumber += 1;
  return { ok: true };
}

function guess(game, playerId, cardIndex) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.turnStage !== "guess") return { ok: false, error: "지금은 낱말을 고를 차례가 아닙니다." };
  const player = playerById(game, playerId);
  if (!player || player.team !== game.currentTeam || player.role !== "operative") {
    return { ok: false, error: "현재 팀의 요원만 낱말을 고를 수 있습니다." };
  }
  const index = Number(cardIndex);
  const card = game.board[index];
  if (!card || card.revealed) return { ok: false, error: "고를 수 없는 카드입니다." };

  card.revealed = true;
  game.guessesUsed += 1;
  game.actionNumber += 1;

  if (card.color === "bomb") {
    const winner = otherTeam(game.currentTeam);
    game.winner = winner;
    game.winReason = "bomb";
    game.phase = "gameEnd";
    game.log = `${player.name}님이 폭탄 카드를 뽑아 ${winner === "red" ? "레드팀" : "블루팀"}이 승리했습니다.`;
    return { ok: true };
  }

  if (checkVictory(game)) return { ok: true };

  if (card.color === game.currentTeam) {
    if (game.guessesUsed >= game.guessesRemaining) {
      switchTurn(game, `${card.word}: 우리 팀 낱말! 기회를 모두 사용해 차례가 넘어갑니다.`);
    } else {
      game.log = `${card.word}: 우리 팀 낱말입니다. 계속 고를 수 있습니다.`;
    }
    return { ok: true };
  }

  if (card.color === "neutral") {
    switchTurn(game, `${card.word}: 상관없는 낱말이라 차례가 넘어갑니다.`);
    return { ok: true };
  }

  switchTurn(game, `${card.word}: 상대 팀 낱말이라 차례가 넘어갑니다.`);
  return { ok: true };
}

function endGuessing(game, playerId) {
  if (game.phase !== "playing") return { ok: false, error: "진행 중인 게임이 없습니다." };
  if (game.turnStage !== "guess") return { ok: false, error: "지금은 차례를 넘길 수 없습니다." };
  const player = playerById(game, playerId);
  if (!player || player.team !== game.currentTeam || player.role !== "operative") {
    return { ok: false, error: "현재 팀의 요원만 차례를 넘길 수 있습니다." };
  }
  switchTurn(game, `${player.name}님이 차례를 넘겼습니다.`);
  game.actionNumber += 1;
  return { ok: true };
}

function newGame(game, pick = randomInt) {
  if (game.phase !== "gameEnd") return { ok: false, error: "게임이 끝난 뒤에만 다시 시작할 수 있습니다." };
  if (!canStart(game)) return { ok: false, error: "두 팀 모두 스파이마스터 1명과 요원 1명 이상이 필요합니다." };
  return startGame(game, pick);
}

function resetToLobby(game, notice = "대기실로 돌아왔습니다.") {
  game.phase = "lobby";
  game.board = [];
  game.currentTeam = "red";
  game.turnStage = "hint";
  game.hint = null;
  game.guessesRemaining = 0;
  game.guessesUsed = 0;
  game.winner = null;
  game.winReason = null;
  game.log = notice;
  game.actionNumber += 1;
}

function stateFor(game, viewerId) {
  const viewer = playerById(game, String(viewerId));
  const viewerIsSpymaster = Boolean(viewer && viewer.role === "spymaster");
  return {
    phase: game.phase,
    grade: game.grade,
    poolSize: wordPoolForGrade(game.grade).length,
    players: game.players.map(player => ({ id: player.id, name: player.name, team: player.team, role: player.role })),
    board: game.board.map(card => ({
      word: card.word,
      revealed: card.revealed,
      color: card.revealed || viewerIsSpymaster ? card.color : null
    })),
    remaining: game.phase === "lobby" ? null : { red: remainingCount(game, "red"), blue: remainingCount(game, "blue") },
    currentTeam: game.phase === "playing" ? game.currentTeam : null,
    turnStage: game.phase === "playing" ? game.turnStage : null,
    hint: game.hint,
    guessesRemaining: Number.isFinite(game.guessesRemaining) ? game.guessesRemaining : null,
    guessesUsed: game.guessesUsed,
    winner: game.winner,
    winReason: game.winReason,
    log: game.log,
    actionNumber: game.actionNumber
  };
}

module.exports = {
  MIN_PLAYERS,
  MAX_PLAYERS,
  MIN_GRADE,
  MAX_GRADE,
  BOARD_SIZE,
  TEAMS,
  createGame,
  addPlayer,
  removePlayer,
  setGrade,
  setTeamRole,
  canStart,
  startGame,
  giveHint,
  guess,
  endGuessing,
  newGame,
  resetToLobby,
  stateFor,
  wordPoolForGrade,
  shuffle
};
