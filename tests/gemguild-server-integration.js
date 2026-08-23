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
    host.send({ type: "CREATE_ROOM", gameId: "gemguild", roomCode: "8642", name: "가람" });
    await host.waitFor(message => message.type === "ROOM_CREATED", "방 생성");
    await host.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.phase === "lobby", "초기 상태");

    const guest = await connectClient();
    clients.push(guest);
    const guestConnected = await guest.waitFor(message => message.type === "CONNECTED", "참가자 연결");
    guest.send({ type: "JOIN_ROOM", gameId: "gemguild", roomCode: "8642", name: "나래" });
    await guest.waitFor(message => message.type === "ROOM_JOINED", "방 입장");
    await host.waitFor(message => message.type === "PLAYER_JOINED", "참가자 입장 알림");
    await guest.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.players.length === 2, "2인 대기 상태");

    host.send({ type: "GEMGUILD_ACTION", action: "START" });
    const hostStart = await host.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.phase === "playing", "방장 시작 상태");
    const guestStart = await guest.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.phase === "playing", "참가자 시작 상태");
    assert.equal(hostStart.state.market[1].length, 4);
    assert.equal(hostStart.state.market[2].length, 4);
    assert.equal(hostStart.state.market[3].length, 4);
    assert.equal(hostStart.state.turnPlayerId, hostConnected.playerId);

    host.send({ type: "GEMGUILD_ACTION", action: "TAKE", gems: ["ruby", "sapphire", "emerald"] });
    const hostAfterTake = await host.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.revision > hostStart.state.revision, "보석 획득 반영");
    const guestAfterTake = await guest.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.revision > guestStart.state.revision, "보석 획득 동기화");
    assert.equal(hostAfterTake.state.players.find(player => player.id === hostConnected.playerId).tokens.ruby, 1);
    assert.equal(hostAfterTake.state.turnPlayerId, guestConnected.playerId);

    const reservedCardId = guestAfterTake.state.market[1][0].id;
    guest.send({ type: "GEMGUILD_ACTION", action: "RESERVE", cardId: reservedCardId, tier: 1 });
    const guestAfterReserve = await guest.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.revision > guestAfterTake.state.revision, "예약 반영");
    const hostAfterReserve = await host.waitFor(message => message.type === "GEMGUILD_STATE" && message.state.revision > hostAfterTake.state.revision, "예약 비공개 동기화");
    assert.equal(guestAfterReserve.state.reserved.length, 1);
    assert.equal(guestAfterReserve.state.reserved[0].id, reservedCardId);
    assert.equal(hostAfterReserve.state.reserved.length, 0, "상대의 예약 카드 정체는 공개되면 안 됩니다.");
    assert.equal(hostAfterReserve.state.players.find(player => player.id === guestConnected.playerId).reserveCount, 1);
    assert.equal(guestAfterReserve.state.players.find(player => player.id === guestConnected.playerId).tokens.gold, 1);

    console.log("gemguild-server-integration: room, turns, bank and private reservation ok");
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
