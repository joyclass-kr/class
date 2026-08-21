"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Clue = require(path.resolve(__dirname, "..", "game-hub-server", "clue"));

assert.equal(Clue.CORRIDOR_CELLS.length, 72, "교차점 4곳을 공유하는 19칸짜리 복도 네 줄이어야 합니다.");
assert.deepEqual(
  [...Clue.CELL_NEIGHBORS.xTL].sort(),
  ["l5", "l7", "t5", "t7"],
  "교차점에서는 상하좌우 네 방향으로 한 칸씩 갈 수 있어야 합니다."
);
assert.equal(Object.keys(Clue.SECRET_PASSAGE_PAIRS).length, 8, "비밀통로 입구는 정확히 8곳이어야 합니다.");
for (const [entrance, exit] of Object.entries(Clue.SECRET_PASSAGE_PAIRS)) {
  assert.equal(Clue.SECRET_PASSAGE_PAIRS[exit], entrance, "비밀통로 연결은 양방향이어야 합니다.");
  const [entranceX, entranceY] = Clue.CELL_COORDS[entrance];
  const [exitX, exitY] = Clue.CELL_COORDS[exit];
  assert.ok(Math.abs(entranceX + exitX - 380) < 0.01, "비밀통로 출구는 중심을 기준으로 반대편이어야 합니다.");
  assert.ok(Math.abs(entranceY + exitY - 380) < 0.01, "비밀통로 출구는 중심에서 180도 회전한 위치여야 합니다.");
}

const expectedRoomDoors={
  0:["t3"],1:["t9"],2:["t15"],
  3:["b3"],4:["t9","b9"],5:["b15"],
  6:["b3"],7:["b9"],8:["b15"]
};
assert.deepEqual(Clue.ROOM_CELLS,expectedRoomDoors,"원본 그림에서 실제로 열린 문만 방 입구여야 합니다.");
assert.deepEqual(Clue.CELL_ROOMS,{
  t3:[0],t9:[1,4],t15:[2],
  b3:[3,6],b9:[4,7],b15:[5,8]
},"여섯 문 타일만 방과 연결되어야 합니다.");
Object.entries(Clue.ROOM_CELLS).forEach(([roomIndex,doorCells])=>{
  doorCells.forEach(cellId=>{
    assert.ok(Clue.CORRIDOR_CELLS.includes(cellId),"모든 방 입구는 실제 복도 타일이어야 합니다.");
    assert.ok(Clue.CELL_ROOMS[cellId].includes(Number(roomIndex)),"방과 문 타일의 연결은 양방향이어야 합니다.");
  });
});

const game = Clue.createGame("host", "방장");
Clue.addPlayer(game, "guest1", "하늘");
Clue.addPlayer(game, "guest2", "바다");
assert.equal(Clue.startMatch(game, () => 0).ok, true);
const dicePicks=[0,1];
assert.equal(Clue.roll(game, "host", () => dicePicks.shift()).ok, true);
assert.deepEqual(game.diceValues,[1,2]);
assert.equal(game.dice, 3);
assert.equal(game.stepsRemaining, 3);

let view = Clue.stateFor(game, "host");
assert.deepEqual(view.reachable.cells, ["t3"], "온실에서는 그림에 열린 아래쪽 문으로만 나갈 수 있어야 합니다.");
assert.deepEqual(view.reachable.rooms, []);

assert.equal(Clue.move(game, "host", "t3").ok, true);
assert.equal(game.stepsRemaining, 2);
assert.equal(game.turnPhase, "move");
view = Clue.stateFor(game, "host");
assert.deepEqual(view.reachable.cells, ["t2", "t4"], "한 번 이동한 뒤에는 바로 이웃한 타일만 보여야 합니다.");
assert.deepEqual(view.reachable.rooms, [], "온실 문 타일 건너편의 막힌 서재 벽은 입구가 아니어야 합니다.");
assert.equal(Clue.move(game, "host", "t5").ok, false, "두 칸 떨어진 타일로 점프할 수 없어야 합니다.");
assert.equal(game.players[0].cellId, "t3");

assert.equal(Clue.move(game, "host", "t4").ok, true);
assert.equal(game.stepsRemaining, 1);
view = Clue.stateFor(game, "host");
assert.deepEqual(view.reachable.cells, ["t5"], "이번 차례에 지나온 타일로 되돌아가면 안 됩니다.");
assert.equal(Clue.move(game, "host", "t5").ok, true);
assert.equal(game.stepsRemaining, 0);
assert.equal(game.moved, true);
assert.equal(game.turnPhase, "act");

const passageGame = Clue.createGame("host", "방장");
const doorGame=Clue.createGame("host","방장");
doorGame.phase="playing";
doorGame.players[0].roomIndex=-1;
doorGame.players[0].cellId="t9";
doorGame.turnPhase="move";
doorGame.diceValues=[4,4];
doorGame.dice=8;
doorGame.stepsRemaining=8;
doorGame.movePath=["t9"];
let doorView=Clue.stateFor(doorGame,"host");
assert.deepEqual(doorView.reachable.rooms,[1,4],"문 타일에서는 그 문에 직접 연결된 방만 표시해야 합니다.");
assert.equal(Clue.move(doorGame,"host","r1").ok,true);
assert.equal(doorGame.players[0].roomIndex,1);
assert.equal(doorGame.players[0].cellId,null);
assert.equal(doorGame.stepsRemaining,0,"방에 들어가면 주사위 이동이 즉시 끝나야 합니다.");
assert.equal(doorGame.turnPhase,"act");

const wallGame=Clue.createGame("host","방장");
wallGame.phase="playing";
wallGame.players[0].roomIndex=-1;
wallGame.players[0].cellId="t8";
wallGame.turnPhase="move";
wallGame.diceValues=[3,3];
wallGame.dice=6;
wallGame.stepsRemaining=6;
wallGame.movePath=["t8"];
doorView=Clue.stateFor(wallGame,"host");
assert.deepEqual(doorView.reachable.rooms,[],"일반 복도 타일에서는 벽을 넘어 방에 들어갈 수 없어야 합니다.");
assert.equal(Clue.move(wallGame,"host","r1").ok,false,"지정된 문 타일이 아니면 방 입장을 거부해야 합니다.");
const occupiedGame=Clue.createGame("host","방장");
Clue.addPlayer(occupiedGame,"guest1","하늘");
occupiedGame.phase="playing";
occupiedGame.players[0].roomIndex=-1;
occupiedGame.players[0].cellId="t3";
occupiedGame.players[1].roomIndex=-1;
occupiedGame.players[1].cellId="t4";
occupiedGame.turnPhase="move";
occupiedGame.diceValues=[2,3];
occupiedGame.dice=5;
occupiedGame.stepsRemaining=5;
occupiedGame.movePath=["t3"];
const occupiedReach=Clue.reachablePositions(occupiedGame,occupiedGame.players[0],3);
assert.ok(!occupiedReach.cells.includes("t4"),"다른 플레이어가 있는 타일에는 들어갈 수 없어야 합니다.");
assert.ok(!occupiedReach.cells.includes("t5"),"다른 플레이어가 막은 타일 너머로 통과할 수 없어야 합니다.");
assert.equal(Clue.move(occupiedGame,"host","t4").ok,false,"점유 중인 타일 이동 요청은 서버가 거부해야 합니다.");
assert.equal(occupiedGame.players[0].cellId,"t3");

const blockedPassageGame=Clue.createGame("host","방장");
Clue.addPlayer(blockedPassageGame,"guest1","하늘");
blockedPassageGame.phase="playing";
blockedPassageGame.players[0].roomIndex=-1;
blockedPassageGame.players[0].cellId="t0";
blockedPassageGame.players[1].roomIndex=-1;
blockedPassageGame.players[1].cellId="b18";
blockedPassageGame.turnPhase="move";
const blockedPassageResult=Clue.secretPassage(blockedPassageGame,"host");
assert.equal(blockedPassageResult.ok,false,"비밀통로 출구 타일이 점유 중이면 이동을 거부해야 합니다.");
assert.equal(blockedPassageGame.players[0].cellId,"t0","막힌 비밀통로를 사용해도 출발 타일에 남아야 합니다.");


passageGame.phase = "playing";
passageGame.players[0].roomIndex = -1;
passageGame.players[0].cellId = "t0";
passageGame.turnPhase = "move";
assert.equal(Clue.secretPassage(passageGame, "host").ok, true);
assert.equal(passageGame.players[0].cellId, "b18", "비밀통로는 맞은편 출구로 나와야 합니다.");

const htmlPath = path.resolve(__dirname, "..", "learning", "games", "clue", "clue.html");
const html = fs.readFileSync(htmlPath, "utf8");
assert.match(html, /CELL_ORIENTATION/, "가로·세로·교차 타일의 방향을 구분해 렌더링해야 합니다.");
assert.match(html, /board-v3\.webp/, "새 #형 저택 보드 자산을 사용해야 합니다.");
assert.match(html, /class="corridorTile"/, "복도 칸이 실제 타일로 렌더링되어야 합니다.");
assert.match(html, /class="passageFrame"/, "8개 비밀통로를 계단형 입구로 렌더링해야 합니다.");
assert.match(html, /타일을 한 칸씩 이동/, "한 칸 이동 규칙을 보드에 표시해야 합니다.");
assert.match(html, /비밀통로 8곳/, "비밀통로 수와 연결 규칙을 보드에 표시해야 합니다.");
assert.match(html, /id="dieFace1"/, "첫 번째 주사위를 표시해야 합니다.");
assert.match(html, /id="dieFace2"/, "두 번째 주사위를 표시해야 합니다.");
assert.match(html, /class","tokenName"/, "아바타 머리 위에 이름표를 렌더링해야 합니다.");
assert.match(html, /nameTag\.textContent=displayName/, "이름표는 플레이어 이름을 사용해야 합니다.");
assert.match(html, /const cx=isRoom\?20\+\(index%3\)\*20:0/, "복도 아바타는 타일 로컬 중심 0,0에 고정해야 합니다.");
assert.match(html, /stepsRemaining/, "남은 이동 칸을 화면에 표시해야 합니다.");

const boardPath = path.resolve(__dirname, "..", "learning", "games", "clue", "assets", "images", "board-v3.webp");
assert.ok(fs.existsSync(boardPath), "최적화한 보드 이미지가 있어야 합니다.");
assert.ok(fs.statSync(boardPath).size < 600000, "보드 이미지는 태블릿 로딩을 위해 600KB보다 작아야 합니다.");

console.log("clue-unit: two dice, exact doors, one-player tiles, avatar names and 8 opposite secret passages ok");
