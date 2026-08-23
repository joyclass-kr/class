"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const { spawn } = require("node:child_process");

const projectRoot = path.resolve(__dirname, "..");
const serverRoot = path.join(projectRoot, "game-hub-server");
const { WebSocket } = require(path.join(serverRoot, "node_modules", "ws"));
const port = 22000 + Math.floor(Math.random() * 10000);

function waitForServer(process) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("서버 시작 시간이 초과되었습니다.")), 8000);
    let errors = "";
    process.stderr.on("data", chunk => { errors += chunk.toString(); });
    process.stdout.on("data", chunk => {
      if (!chunk.toString().includes("listening on port")) return;
      clearTimeout(timer);
      resolve();
    });
    process.once("exit", code => {
      clearTimeout(timer);
      reject(new Error(`서버가 일찍 종료되었습니다. (${code}) ${errors}`));
    });
  });
}

function connectClient() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://127.0.0.1:${port}`);
    const queue = [];
    const waiters = [];
    socket.on("message", raw => {
      const message = JSON.parse(raw.toString());
      const waiterIndex = waiters.findIndex(waiter => waiter.predicate(message));
      if (waiterIndex >= 0) {
        const [waiter] = waiters.splice(waiterIndex, 1);
        clearTimeout(waiter.timer);
        waiter.resolve(message);
      } else queue.push(message);
    });
    socket.once("error", reject);
    socket.once("open", () => resolve({
      socket,
      send(message) { socket.send(JSON.stringify(message)); },
      waitFor(predicate, label = "메시지") {
        const queuedIndex = queue.findIndex(predicate);
        if (queuedIndex >= 0) return Promise.resolve(queue.splice(queuedIndex, 1)[0]);
        return new Promise((waitResolve, waitReject) => {
          const waiter = { predicate, resolve: waitResolve, timer: null };
          waiter.timer = setTimeout(() => {
            const index = waiters.indexOf(waiter);
            if (index >= 0) waiters.splice(index, 1);
            waitReject(new Error(`${label} 수신 시간이 초과되었습니다.`));
          }, 5000);
          waiters.push(waiter);
        });
      }
    }));
  });
}

async function run() {
  const server = spawn(process.execPath, [path.join(serverRoot, "server.js")], {
    cwd: serverRoot,
    env: { ...process.env, PORT: String(port), NODE_ENV: "test" },
    stdio: ["ignore", "pipe", "pipe"]
  });
  const clients = [];
  try {
    await waitForServer(server);
    const host = await connectClient();
    clients.push(host);
    const hostConnected = await host.waitFor(message => message.type === "CONNECTED", "방장 연결");
    host.send({ type: "CREATE_ROOM", gameId: "citychase", roomCode: "7319", name: "경찰" });
    await host.waitFor(message => message.type === "ROOM_CREATED", "방 생성");
    await host.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.phase === "lobby", "초기 상태");

    const guest = await connectClient();
    clients.push(guest);
    const guestConnected = await guest.waitFor(message => message.type === "CONNECTED", "참가자 연결");
    guest.send({ type: "JOIN_ROOM", gameId: "citychase", roomCode: "7319", name: "도둑" });
    await guest.waitFor(message => message.type === "ROOM_JOINED", "방 입장");
    await host.waitFor(message => message.type === "PLAYER_JOINED", "참가자 입장 알림");
    await guest.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.players.length === 2, "2인 대기 상태");

    host.send({ type: "CITYCHASE_ACTION", action: "START" });
    const hostSetup = await host.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.phase === "setup", "경찰 배치 화면");
    const guestSetup = await guest.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.phase === "setup", "도둑 대기 화면");
    assert.equal(hostSetup.state.myTeam, "police");
    assert.equal(guestSetup.state.myTeam, "thief");
    assert.equal(hostSetup.state.canSetup, true);
    assert.equal(guestSetup.state.canSetup, false);
    assert.equal(hostSetup.state.policeCaptainId, hostConnected.playerId);
    assert.equal(guestSetup.state.players.find(player => player.id === guestConnected.playerId).team, "thief");

    host.send({
      type: "CITYCHASE_ACTION",
      action: "PLACE_SECRETS",
      gems: ["market", "air"],
      undercover: "burger"
    });
    const hostPlaying = await host.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.phase === "playing", "경찰 시작 상태");
    const guestPlaying = await guest.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.phase === "playing", "도둑 시작 상태");
    assert.equal(hostPlaying.state.buildings.find(item => item.id === "market").content, "gem");
    assert.equal(guestPlaying.state.buildings.find(item => item.id === "market").content, "hidden", "기기별 상태에서 비밀 건물 정보가 분리돼야 합니다.");
    assert.equal(guestPlaying.state.turnPawnId, "thief-1");
    assert.equal(guestPlaying.state.canAct, true);

    guest.send({ type: "CITYCHASE_ACTION", action: "ROLL" });
    const guestRolled = await guest.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.turnMode === "moving", "도둑 주사위");
    const hostRolled = await host.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.revision >= guestRolled.state.revision, "주사위 동기화");
    assert.ok(guestRolled.state.die >= 1 && guestRolled.state.die <= 6);
    assert.deepEqual(guestRolled.state.validMoves, ["p0"]);
    assert.deepEqual(hostRolled.state.validMoves, [], "경찰 기기에는 도둑의 이동 버튼이 활성화되면 안 됩니다.");

    guest.send({ type: "CITYCHASE_ACTION", action: "MOVE", nodeId: "p0" });
    const guestMoved = await guest.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.pawns.some(pawn => pawn.id === "thief-1" && pawn.position === "p0"), "도둑 이동");
    const hostMoved = await host.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.revision >= guestMoved.state.revision, "이동 동기화");
    assert.equal(hostMoved.state.pawns.find(pawn => pawn.id === "thief-1").position, "p0");

    guest.socket.close(4000, "TEST_DISCONNECT");
    const reset = await host.waitFor(message => message.type === "CITYCHASE_STATE" && message.state.phase === "lobby" && /플레이어가 나가/.test(message.state.lastAction), "이탈 후 대기실 복귀");
    assert.match(reset.state.lastAction, /플레이어가 나가/);

    console.log("citychase-server-integration: room, private setup, roll, movement sync and disconnect recovery ok");
  } finally {
    for (const client of clients) {
      try { client.socket.close(4000, "TEST_COMPLETE"); } catch (_) {}
    }
    server.kill();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
