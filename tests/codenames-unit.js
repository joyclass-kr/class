"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const Codenames = require(path.resolve(__dirname, "..", "game-hub-server", "codenames"));

function gameWithFourPlayers() {
    const game = Codenames.createGame("host", "방장");
    Codenames.addPlayer(game, "guest1", "하늘");
    Codenames.addPlayer(game, "guest2", "바다");
    Codenames.addPlayer(game, "guest3", "구름");
    return game;
}

function twoTeamGame() {
    const game = gameWithFourPlayers();
    Codenames.setTeamRole(game, "host", "red", "spymaster");
    Codenames.setTeamRole(game, "guest1", "red", "operative");
    Codenames.setTeamRole(game, "guest2", "blue", "spymaster");
    Codenames.setTeamRole(game, "guest3", "blue", "operative");
    return game;
}

// 학년 범위: 1~2학년은 같은 생활 낱말 목록을 쓰고, 3학년 이상은 학기별로 갈린다.
const marchDate = new Date(2026, 3, 1); // 4월, 아직 1학기
const octDate = new Date(2026, 9, 1); // 10월, 2학기

const grade1Pool = Codenames.wordPoolForGrade(1);
const grade2Pool = Codenames.wordPoolForGrade(2);
assert.deepEqual(new Set(grade1Pool), new Set(grade2Pool), "1학년과 2학년은 같은 생활 낱말 목록을 사용합니다.");

const grade4PoolBeforeSept = Codenames.wordPoolForGrade(4, marchDate);
const grade4PoolAfterSept = Codenames.wordPoolForGrade(4, octDate);
assert.ok(
  grade4PoolAfterSept.length > grade4PoolBeforeSept.length,
  "2학기가 되면 그 학년의 1학기 낱말이 추가로 포함되어야 합니다."
);

const grade5PoolBeforeSept = Codenames.wordPoolForGrade(5, marchDate);
assert.ok(
  grade5PoolBeforeSept.length > grade4PoolBeforeSept.length,
  "5학년 범위는 4학년 전체를 더 포함해 4학년 범위보다 많아야 합니다."
);

// 6학년 2학기 전용 낱말(원주율)은 5학년 방에는 어떤 시점에도 나오면 안 된다.
const grade5PoolAfterSept = Codenames.wordPoolForGrade(5, octDate);
assert.ok(!grade5PoolBeforeSept.includes("원주율"), "6학년 전용 낱말이 5학년 방에 나오면 안 됩니다.");
assert.ok(!grade5PoolAfterSept.includes("원주율"), "6학년 전용 낱말이 5학년 방에 나오면 안 됩니다(2학기여도).");

// 팀 구성이 안 갖춰지면 시작할 수 없다.
const incomplete = gameWithFourPlayers();
Codenames.setTeamRole(incomplete, "host", "red", "spymaster");
assert.equal(Codenames.canStart(incomplete), false, "모든 인원이 팀/역할을 정해야 시작할 수 있습니다.");

// 스파이마스터 자리가 겹치면 거부한다.
const clash = gameWithFourPlayers();
Codenames.setTeamRole(clash, "host", "red", "spymaster");
const clashResult = Codenames.setTeamRole(clash, "guest1", "red", "spymaster");
assert.equal(clashResult.ok, false, "한 팀에는 스파이마스터가 한 명만 있어야 합니다.");

// 정상적으로 팀이 갖춰지면 시작할 수 있고 보드가 25장, 9/8/7/1 분포여야 한다.
const ready = twoTeamGame();
assert.equal(Codenames.canStart(ready), true);
const started = Codenames.startGame(ready, () => 0);
assert.equal(started.ok, true);
assert.equal(ready.phase, "playing");
assert.equal(ready.board.length, 25);
const colorCounts = ready.board.reduce((acc, card) => {
    acc[card.color] = (acc[card.color] || 0) + 1;
    return acc;
}, {});
assert.equal(colorCounts.bomb, 1, "폭탄 카드는 정확히 1장이어야 합니다.");
assert.equal(colorCounts.neutral, 7, "중립 카드는 정확히 7장이어야 합니다.");
assert.equal((colorCounts.red || 0) + (colorCounts.blue || 0), 17, "레드+블루 카드는 17장이어야 합니다.");
assert.ok(colorCounts.red === 9 || colorCounts.blue === 9, "시작 팀은 9장을 가져야 합니다.");

// 상대 팀 낱말을 고르면 즉시 차례가 넘어간다.
const turnGame = twoTeamGame();
Codenames.startGame(turnGame, () => 0);
const startingTeam = turnGame.currentTeam;
const otherTeam = startingTeam === "red" ? "blue" : "red";
const spymasterId = turnGame.players.find(p => p.team === startingTeam && p.role === "spymaster").id;
const operativeId = turnGame.players.find(p => p.team === startingTeam && p.role === "operative").id;
Codenames.giveHint(turnGame, spymasterId, "테스트", 2);
assert.equal(turnGame.turnStage, "guess");
const otherTeamCardIndex = turnGame.board.findIndex(card => card.color === otherTeam);
Codenames.guess(turnGame, operativeId, otherTeamCardIndex);
assert.equal(turnGame.currentTeam, otherTeam, "상대 팀 낱말을 고르면 차례가 즉시 넘어가야 합니다.");
assert.equal(turnGame.turnStage, "hint");

// 폭탄 카드를 고르면 상대 팀이 즉시 승리한다.
const bombGame = twoTeamGame();
Codenames.startGame(bombGame, () => 0);
const bombTeam = bombGame.currentTeam;
const bombOtherTeam = bombTeam === "red" ? "blue" : "red";
const bombSpymasterId = bombGame.players.find(p => p.team === bombTeam && p.role === "spymaster").id;
const bombOperativeId = bombGame.players.find(p => p.team === bombTeam && p.role === "operative").id;
Codenames.giveHint(bombGame, bombSpymasterId, "위험", 1);
const bombIndex = bombGame.board.findIndex(card => card.color === "bomb");
Codenames.guess(bombGame, bombOperativeId, bombIndex);
assert.equal(bombGame.phase, "gameEnd");
assert.equal(bombGame.winner, bombOtherTeam, "폭탄을 고른 팀이 아닌 다른 팀이 승리해야 합니다.");
assert.equal(bombGame.winReason, "bomb");

// 스파이마스터만 공개되지 않은 카드의 색을 볼 수 있다.
const visibilityGame = twoTeamGame();
Codenames.startGame(visibilityGame, () => 0);
const spyView = Codenames.stateFor(visibilityGame, visibilityGame.players.find(p => p.role === "spymaster").id);
const opView = Codenames.stateFor(visibilityGame, visibilityGame.players.find(p => p.role === "operative").id);
assert.ok(spyView.board.every(card => card.color !== null), "스파이마스터는 모든 카드의 색을 볼 수 있어야 합니다.");
assert.ok(opView.board.some(card => card.color === null), "요원은 공개되지 않은 카드의 색을 볼 수 없어야 합니다.");

console.log("codenames-unit.js: all assertions passed");
