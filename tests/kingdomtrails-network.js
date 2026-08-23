"use strict";

const assert = require("assert");
const WebSocket = require("../game-hub-server/node_modules/ws");

const SERVER_URL = process.env.KINGDOMTRAILS_TEST_URL || "ws://127.0.0.1:10050";
const ROOM_CODE = String(7000 + Math.floor(Math.random() * 2000));

function connect() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(SERVER_URL);
    const messages = [];
    const waiters = [];
    socket.on("message", raw => {
      const message = JSON.parse(raw.toString());
      const index = waiters.findIndex(waiter => waiter.predicate(message));
      if (index >= 0) {
        const waiter = waiters.splice(index, 1)[0];
        clearTimeout(waiter.timer);
        waiter.resolve(message);
      } else messages.push(message);
    });
    socket.once("error", reject);
    socket.once("open", () => resolve({
      socket,
      waitFor(predicate, timeout = 4000) {
        const existing = messages.findIndex(predicate);
        if (existing >= 0) return Promise.resolve(messages.splice(existing, 1)[0]);
        return new Promise((resolveWait, rejectWait) => {
          const waiter = { predicate, resolve: resolveWait, timer: null };
          waiter.timer = setTimeout(() => {
            const position = waiters.indexOf(waiter);
            if (position >= 0) waiters.splice(position, 1);
            rejectWait(new Error("Timed out waiting for WebSocket message"));
          }, timeout);
          waiters.push(waiter);
        });
      },
      send(message) { socket.send(JSON.stringify(message)); }
    }));
  });
}

(async () => {
  const host = await connect();
  const hostConnected = await host.waitFor(message => message.type === "CONNECTED");
  host.send({ type: "CREATE_ROOM", gameId: "kingdomtrails", roomCode: ROOM_CODE, name: "가람" });
  await host.waitFor(message => message.type === "ROOM_CREATED");
  const lobbyState = await host.waitFor(message => message.type === "KINGDOMTRAILS_STATE");
  assert.equal(lobbyState.state.phase, "lobby");
  assert.equal(lobbyState.state.players.length, 1);

  const guest = await connect();
  const guestConnected = await guest.waitFor(message => message.type === "CONNECTED");
  guest.send({ type: "JOIN_ROOM", gameId: "kingdomtrails", roomCode: ROOM_CODE, name: "나래" });
  await guest.waitFor(message => message.type === "ROOM_JOINED");
  const joinedState = await guest.waitFor(message => message.type === "KINGDOMTRAILS_STATE" && message.state.players.length === 2);
  assert.equal(joinedState.state.players.length, 2);

  host.send({ type: "KINGDOMTRAILS_ACTION", action: "START" });
  const playing = await host.waitFor(message => message.type === "KINGDOMTRAILS_STATE" && message.state.phase === "playing");
  assert.equal(playing.state.board.length, 1);
  assert.ok(playing.state.currentTile);
  assert.ok(playing.state.suggestedPlacement);

  const actor = playing.state.activePlayerId === hostConnected.playerId ? host : guest;
  const suggestion = playing.state.suggestedPlacement;
  actor.send({
    type: "KINGDOMTRAILS_ACTION",
    action: "PLACE",
    x: suggestion.x,
    y: suggestion.y,
    rotation: suggestion.rotation,
    claim: null
  });
  const afterPlacement = await host.waitFor(message => message.type === "KINGDOMTRAILS_STATE" && message.state.board.length === 2);
  assert.equal(afterPlacement.state.board.length, 2);
  assert.equal(afterPlacement.state.turnNumber, 2);
  assert.notEqual(afterPlacement.state.activePlayerId, playing.state.activePlayerId);

  guest.socket.close();
  host.socket.close();
  console.log(`kingdomtrails-network: ok (${hostConnected.playerId}, ${guestConnected.playerId})`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
