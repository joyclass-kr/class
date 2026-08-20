const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  clientMatchesToken,
  restoreRoom,
  snapshotRoom
} = require("../game-hub-server/room-snapshots");

test("room snapshots preserve game state and hashed reconnect identities", () => {
  const hostToken = "host-session-token";
  const guestToken = "guest-session-token";
  const room = {
    gameId: "expedition",
    roomCode: "2538",
    hostId: "host-1",
    expedition: { phase: "deciding", round: 3, decideUntil: Date.now() + 30000 },
    expeditionTimer: { mustNotPersist: true },
    clients: new Map([
      ["host-1", { meta: { role: "host", clientToken: hostToken } }],
      ["guest-1", { meta: { role: "guest", clientToken: guestToken } }]
    ])
  };

  const snapshot = snapshotRoom(room);
  const serialized = JSON.stringify(snapshot);
  assert.equal(snapshot.state.expedition.round, 3);
  assert.equal(snapshot.state.expeditionTimer, undefined);
  assert.equal(snapshot.state.clients, undefined);
  assert.doesNotMatch(serialized, /host-session-token|guest-session-token/);

  const restored = restoreRoom(snapshot, { closedReadyState: 3 });
  assert.equal(restored.expedition.phase, "deciding");
  assert.equal(restored.clients.size, 2);
  assert.equal(clientMatchesToken(restored.clients.get("host-1"), hostToken), true);
  assert.equal(clientMatchesToken(restored.clients.get("host-1"), guestToken), false);
  assert.equal(clientMatchesToken(restored.clients.get("guest-1"), guestToken), true);
});

test("room snapshots reject missing host reconnect identity", () => {
  const restored = restoreRoom({
    version: 1,
    state: { gameId: "expedition", roomCode: "2538", hostId: "host-1" },
    participants: []
  });
  assert.equal(restored, null);
});

test("server and client recovery contracts keep rooms through restarts", () => {
  const root = path.resolve(__dirname, "..");
  const serverSource = fs.readFileSync(path.join(root, "game-hub-server", "server.js"), "utf8");
  const platformSource = fs.readFileSync(path.join(root, "game-hub-server", "classroom-platform.js"), "utf8");
  const clientSource = fs.readFileSync(path.join(root, "assets", "network", "game-network.js"), "utf8");

  assert.match(serverSource, /ROOM_RECONNECT_GRACE_MS[^\n]+120000/);
  assert.match(serverSource, /restorePersistedRoom\(gameId, roomCode\)/);
  assert.match(serverSource, /persistRoomSnapshot\(room, true\)/);
  assert.doesNotMatch(serverSource, /clientMatchesToken\([^\n]+\) && [^\n]*readyState !== WebSocket\.OPEN/);
  assert.match(serverSource, /previousSocket\.close\(4003, "REPLACED"\)/);
  assert.match(platformSource, /CREATE TABLE IF NOT EXISTS multiplayer_room_snapshots/);
  assert.match(platformSource, /saveMultiplayerRoomSnapshot/);
  assert.match(platformSource, /loadMultiplayerRoomSnapshot/);
  assert.match(clientSource, /RECONNECT_WINDOW_MS = 120000/);
  assert.match(clientSource, /ROOM_RESUME_RETRY/);
});
