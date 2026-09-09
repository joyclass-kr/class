// 학급 순위전 방은 교사만 연다.
//
// 학생 화면에 '학급 만들기'를 두되, 교사에게만 보이게 했다. 화면에서 단추를
// 숨기는 것만으로는 주소를 아는 사람을 못 막으므로 서버에서 한 번 더 본다.
// 이 검사는 서버 쪽 판단을 실제로 돌려 보고, 화면 쪽은 글자로 확인한다.
// Postgres 가 없어 `pg` 를 스텁으로 갈아끼운다.
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
const fs = require("node:fs");
const root = path.join(__dirname, "..");
const serverDir = path.join(root, "game-hub-server");

// --- world -----------------------------------------------------------------
// 7번: 교직원 명단에 이메일로 올라 있는 사람. 8번: 학부모. 9번: 사이트 관리자.
const TEACHER_EMAIL = "teacher@example.kr";
const USERS = {
  "teacher-token": { id: 7, email: TEACHER_EMAIL, display_name: "담임", role: "teacher" },
  "guardian-token": { id: 8, email: "parent@example.kr", display_name: "학부모", role: "guardian" },
  "admin-token": { id: 9, email: "admin@example.kr", display_name: "관리자", role: "admin" }
};
let sessionRows = [];

function answer(sql, rawParams) {
  const text = String(sql);
  if (!Array.isArray(rawParams)) return { rows: [], rowCount: 0 };
  if (text.includes("FROM classroom_sessions s")) return { rows: sessionRows, rowCount: sessionRows.length };
  if (text.includes("SELECT 1 FROM classroom_teachers")) {
    const email = String(rawParams[1] || "").toLowerCase();
    const hit = String(rawParams[0]) === "7" || email === TEACHER_EMAIL;
    return { rows: hit ? [{ ok: 1 }] : [], rowCount: hit ? 1 : 0 };
  }
  return { rows: [], rowCount: 0 };
}

class FakePool {
  async query(sql, params) { return answer(sql, params); }
  async connect() { return { query: async (s, p) => answer(s, p), release() {} }; }
  on() {}
  async end() {}
}

const originalLoad = Module._load;
Module._load = function stubbedLoad(request, parent, isMain) {
  if (request === "pg") return { Pool: FakePool };
  return originalLoad.call(this, request, parent, isMain);
};
const platformPath = path.join(serverDir, "classroom-platform.js");
delete require.cache[require.resolve(platformPath)];
const { createClassroomPlatform } = require(platformPath);
const platform = createClassroomPlatform({ databaseUrl: "postgres://stub/stub", googleClientId: "", teacherEmails: "", adminEmails: "" });

const requestAs = (token) => {
  sessionRows = token && USERS[token] ? [USERS[token]] : [];
  return { headers: { cookie: token ? `class_session=${token}` : "" } };
};

(async () => {
  await platform.initialize();
  try {
    // 1. 서버 쪽 판단.
    assert.equal(await platform.isTeacherRequest(requestAs("teacher-token")), true,
      "교직원 명단에 있는 계정은 방을 열 수 있어야 한다.");
    assert.equal(await platform.isTeacherRequest(requestAs("admin-token")), true,
      "사이트 관리자도 방을 열 수 있어야 한다.");
    assert.equal(await platform.isTeacherRequest(requestAs("guardian-token")), false,
      "학부모 계정은 방을 열 수 없어야 한다.");
    assert.equal(await platform.isTeacherRequest(requestAs("")), false,
      "로그인하지 않은 사람은 방을 열 수 없어야 한다.");

    // 2. 게임 서버가 방을 만들기 전에 그 판단을 쓰는지.
    const serverSource = fs.readFileSync(path.join(serverDir, "server.js"), "utf8");
    const createAt = serverSource.indexOf('if (type === "CREATE_ROOM")');
    assert.ok(createAt > -1, "CREATE_ROOM 자리를 찾지 못했다.");
    const createBlock = serverSource.slice(createAt, createAt + 1200);
    const guardAt = createBlock.indexOf('gameId === "quizrace" && !(await teacherSession)');
    const roomAt = createBlock.indexOf("const room = {");
    assert.ok(guardAt > -1, "학급 순위전 방을 여는 자리에 교사 확인이 없다.");
    assert.ok(roomAt === -1 || guardAt < roomAt, "방을 만들기 전에 교사인지 봐야 한다.");
    assert.match(serverSource, /classroomPlatform\.isTeacherRequest\(request\)/,
      "웹소켓이 연결될 때 교사인지 한 번 물어봐야 한다.");

    // 3. 화면 쪽: 단추는 기본으로 숨어 있고, 교사일 때만 열어 준다.
    const raceDir = path.join(root, "learning", "class-race");
    const raceHtml = fs.readFileSync(path.join(raceDir, "index.html"), "utf8");
    const raceApp = fs.readFileSync(path.join(raceDir, "app.js"), "utf8");
    assert.match(raceHtml, /id="createRaceLink"[^>]*class="[^"]*hidden/,
      "학급 만들기 단추는 처음에는 숨어 있어야 한다.");
    assert.match(raceApp, /session\?\.isTeacher === true \|\| session\?\.user\?\.role === "admin"/,
      "교사이거나 사이트 관리자일 때만 단추를 열어야 한다.");

    // 4. 교사 포털의 수업 도구에서는 뺐다.
    const classtools = fs.readFileSync(path.join(root, "classtools", "index.html"), "utf8");
    assert.doesNotMatch(classtools, /class-race/,
      "학급 순위전은 교사 포털의 수업 도구에 두지 않는다.");

    console.log("Class race teacher only contract: OK");
  } finally {
    Module._load = originalLoad;
  }
})();
