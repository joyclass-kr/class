"use strict";

// 공용 학급 순위전(quizrace) 서버 검사: 교사가 문제 묶음을 보내면 모든 학생이 같은 문제를 받고,
// 점수·시간으로 순위가 매겨지며, 초기화 뒤 학생이 대기실에 남는지 본다.
const assert = require("node:assert/strict");
const path = require("node:path");
const { spawn } = require("node:child_process");

const projectRoot = path.resolve(__dirname, "..");
const serverRoot = path.join(projectRoot, "game-hub-server");
const { WebSocket } = require(path.join(serverRoot, "node_modules", "ws"));
const port = 23000 + Math.floor(Math.random() * 9000);
const ROOM = "6193";

function waitForServer(process) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("서버 시작 시간이 초과되었습니다.")), 8000);
        let errors = "";
        process.stderr.on("data", (chunk) => { errors += chunk.toString(); });
        process.stdout.on("data", (chunk) => {
            if (!chunk.toString().includes("listening on port")) return;
            clearTimeout(timer);
            resolve();
        });
        process.once("exit", (code) => {
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
        socket.on("message", (raw) => {
            const message = JSON.parse(raw.toString());
            const index = waiters.findIndex((waiter) => waiter.predicate(message));
            if (index >= 0) {
                const [waiter] = waiters.splice(index, 1);
                clearTimeout(waiter.timer);
                waiter.resolve(message);
            } else {
                queue.push(message);
            }
        });
        socket.once("error", reject);
        socket.once("open", () => {
            resolve({
                socket,
                send(message) { socket.send(JSON.stringify(message)); },
                waitFor(predicate, label = "메시지") {
                    const queuedIndex = queue.findIndex(predicate);
                    if (queuedIndex >= 0) return Promise.resolve(queue.splice(queuedIndex, 1)[0]);
                    return new Promise((waitResolve, waitReject) => {
                        const waiter = { predicate, resolve: waitResolve, timer: null };
                        waiter.timer = setTimeout(() => {
                            const waiterIndex = waiters.indexOf(waiter);
                            if (waiterIndex >= 0) waiters.splice(waiterIndex, 1);
                            waitReject(new Error(`${label} 수신 시간이 초과되었습니다.`));
                        }, 5000);
                        waiters.push(waiter);
                    });
                }
            });
        });
    });
}

async function joinStudent(name, clients) {
    const client = await connectClient();
    clients.push(client);
    await client.waitFor((message) => message.type === "CONNECTED", `${name} 연결`);
    client.send({ type: "JOIN_ROOM", gameId: "quizrace", roomCode: ROOM, name });
    const joined = await client.waitFor((message) => message.type === "ROOM_JOINED", `${name} 입장`);
    return { client, playerId: String(joined.playerId) };
}

function makeQuestions(count) {
    return Array.from({ length: count }, (_, index) => ({
        id: `q-${index + 1}`,
        category: "표준어",
        prompt: "빈칸에 들어갈 알맞은 말을 고르세요.",
        sentence: `${index + 1}번 문장 ___.`,
        choices: ["맞는 말", "틀린 말", "다른 말"],
        answer: "맞는 말",
        explanation: "해설"
    }));
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
        await host.waitFor((message) => message.type === "CONNECTED", "교사 연결");
        host.send({ type: "CREATE_ROOM", gameId: "quizrace", roomCode: ROOM, name: "교사" });
        await host.waitFor((message) => message.type === "ROOM_CREATED", "방 생성");
        await host.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.phase === "lobby", "초기 상태");

        const first = await joinStudent("하늘", clients);
        const second = await joinStudent("바다", clients);
        await second.client.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.participants.length === 2, "2명 상태");

        // 잘못된 묶음은 거절한다 (답이 보기에 없음).
        host.send({ type: "QUIZRACE_ACTION", action: "START", appId: "spelling", appTitle: "한글 맞춤법", questions: [{ id: "bad", sentence: "x", choices: ["a", "b"], answer: "c" }] });
        const rejected = await host.waitFor((message) => message.type === "QUIZRACE_ERROR", "잘못된 묶음 거절");
        assert.match(rejected.message, /문제 묶음/);

        const questions = makeQuestions(7);
        host.send({ type: "QUIZRACE_ACTION", action: "START", appId: "spelling", appTitle: "한글 맞춤법", rangeTitle: "3차시", questions });
        const hostStart = await host.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.phase === "running", "교사 시작 상태");
        const firstStart = await first.client.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.phase === "running", "첫 학생 시작 상태");
        const secondStart = await second.client.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.phase === "running", "둘째 학생 시작 상태");
        assert.equal(firstStart.state.questions.length, 7, "문제 수는 교사가 보낸 대로여야 합니다.");
        assert.deepEqual(firstStart.state.questions.map((q) => q.id), questions.map((q) => q.id), "모든 학생에게 같은 문제가 같은 순서로 가야 합니다.");
        assert.equal(firstStart.state.questions[0].choices.length, 3, "보기 셋짜리 문제도 그대로 전달돼야 합니다.");
        assert.equal(firstStart.state.appTitle, "한글 맞춤법");
        assert.equal(firstStart.state.rangeTitle, "3차시");
        assert.equal(firstStart.state.sessionId, secondStart.state.sessionId);
        assert.equal(hostStart.state.rankings.length, 0);

        const late = await connectClient();
        clients.push(late);
        await late.waitFor((message) => message.type === "CONNECTED", "늦은 학생 연결");
        late.send({ type: "JOIN_ROOM", gameId: "quizrace", roomCode: ROOM, name: "노을" });
        const lateError = await late.waitFor((message) => message.type === "ERROR", "진행 중 입장 거절");
        assert.match(lateError.message, /이미 시작한/);

        // 문제 수보다 큰 점수는 거절한다.
        first.client.send({ type: "QUIZRACE_ACTION", action: "SUBMIT", sessionId: firstStart.state.sessionId, score: 8 });
        const tooHigh = await first.client.waitFor((message) => message.type === "QUIZRACE_ERROR", "점수 초과 거절");
        assert.match(tooHigh.message, /점수/);

        first.client.send({ type: "QUIZRACE_ACTION", action: "SUBMIT", sessionId: firstStart.state.sessionId, score: 5 });
        const firstResult = await first.client.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.rankings.length === 1, "첫 결과");
        assert.equal(firstResult.state.rankings[0].name, "하늘");
        assert.equal(firstResult.state.rankings[0].score, 5);
        assert.ok(Number.isFinite(firstResult.state.rankings[0].elapsedMs));

        second.client.send({ type: "QUIZRACE_ACTION", action: "SUBMIT", sessionId: secondStart.state.sessionId, score: 7 });
        const finalState = await second.client.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.phase === "ended", "최종 순위");
        assert.deepEqual(finalState.state.rankings.map((entry) => [entry.rank, entry.name, entry.score]), [
            [1, "바다", 7],
            [2, "하늘", 5]
        ]);

        host.send({ type: "QUIZRACE_ACTION", action: "RESET" });
        const resetState = await host.waitFor((message) => message.type === "QUIZRACE_STATE" && message.state.phase === "lobby" && message.state.questions.length === 0 && message.state.participants.length === 2, "새 순위전 준비");
        assert.equal(resetState.state.questionCount, 0);
        assert.equal(resetState.state.appTitle, "");

        console.log("quizrace-server-integration: shared question bundle, ranking, validation and reset ok");
    } finally {
        for (const client of clients) {
            try { client.socket.close(4000, "TEST_COMPLETE"); } catch (error) {}
        }
        server.kill();
    }
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
