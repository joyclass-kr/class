// 학급·그룹 개설에 고를 것이 나오는지 본다.
//
// "개설이 안 된다"는 신고는 늘 같은 모양으로 온다 — 드롭다운에 '직접 입력'만
// 남는다. 후보는 전교생 명단에서 오고, 명단은 학년도로 갈라져 있다. 그래서
// 서버가 어느 해를 보는지, 화면이 그 해를 함께 보내는지, 못 받아 왔을 때 까닭을
// 보여 주는지 세 가지를 검사한다. Postgres 가 없어 `pg` 를 스텁으로 갈아끼운다.
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
const fs = require("node:fs");
const root = path.join(__dirname, "..");
const serverDir = path.join(root, "game-hub-server");
const express = require(path.join(serverDir, "node_modules", "express"));

// 6학년 2반·4반에 학생이 하나씩. 7번 계정은 6학년 4반 담임.
const SCHOOL_ID = 5;
const THIS_YEAR = new Date().getFullYear();
let sessionRows = [{ id: 7, email: "teacher@example.kr", display_name: "담임", role: "teacher" }];
let teacherRows = [{ user_id: 7, school_id: SCHOOL_ID, active: true }];
let studentRows = [
  { school_id: SCHOOL_ID, academic_year: THIS_YEAR, grade: 6, class_number: 2 },
  { school_id: SCHOOL_ID, academic_year: THIS_YEAR, grade: 6, class_number: 4 }
];

function answer(sql, params) {
  const text = String(sql);
  if (!Array.isArray(params)) return { rows: [], rowCount: 0 };
  if (text.includes("FROM classroom_sessions s")) return { rows: sessionRows, rowCount: sessionRows.length };
  if (text.includes("FROM classroom_teachers t") && text.includes("sc.enabled = TRUE")) {
    const hit = teacherRows.filter((row) => String(row.user_id) === String(params[0]) && row.active);
    return { rows: hit.map(() => ({ ok: 1 })), rowCount: hit.length };
  }
  if (text.includes("SELECT school_id FROM classroom_teachers")) {
    const hit = teacherRows.filter((row) => String(row.user_id) === String(params[0]) && row.active);
    return { rows: hit.map((row) => ({ school_id: row.school_id })), rowCount: hit.length };
  }
  if (text.includes("SELECT DISTINCT grade, class_number FROM school_students")) {
    const hit = studentRows.filter((row) => row.school_id === params[0] && row.academic_year === params[1]);
    const uniq = new Map(hit.map((row) => [`${row.grade}-${row.class_number}`, row]));
    return { rows: [...uniq.values()], rowCount: uniq.size };
  }
  if (text.includes("FROM school_roster_columns")) return { rows: [], rowCount: 0 };
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

const app = express();
app.use(express.json());
app.use("/api", platform.router);
app.use((error, _req, res, _next) => res.status(error.status || 500).json({ code: error.code, message: error.message }));

(async () => {
  await platform.initialize();
  const server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = (url) => fetch(base + url, { headers: { Cookie: "class_session=stub" } });

  try {
    // 1. 명단에 학생이 있으면 그 학급이 후보로 온다.
    const body = await (await get(`/api/teacher/available-groups?year=${THIS_YEAR}`)).json();
    assert.equal(body.homerooms.length, 2, "명단에 있는 학급이 후보로 와야 한다.");
    assert.equal(body.homerooms.map((room) => room.label).join(" "), "6학년 2반 6학년 4반");
    assert.equal(body.homerooms[0].name, "6-2", "그룹 이름은 학년-반 모양이어야 한다.");

    // 2. 학년도가 어긋나면 후보가 비는 자리가 바로 여기다.
    const otherYear = await (await get(`/api/teacher/available-groups?year=${THIS_YEAR - 1}`)).json();
    assert.equal(otherYear.homerooms.length, 0, "다른 해를 물으면 그 해의 명단만 봐야 한다.");

    // 3. 교직원 등록이 없으면 403 이고, 화면은 그 말을 그대로 보여 줄 수 있어야 한다.
    teacherRows = [];
    const blocked = await get(`/api/teacher/available-groups?year=${THIS_YEAR}`);
    assert.equal(blocked.status, 403, "교직원이 아니면 막아야 한다.");
    const message = (await blocked.json()).message;
    assert.ok(message && message.length > 0, "막을 때는 까닭을 함께 보내야 한다.");

    // 4. 화면 쪽: 학년도를 함께 보내고, 못 받아 왔으면 까닭을 보여 준다.
    const portal = fs.readFileSync(path.join(root, "classtools", "index.html"), "utf8");
    assert.match(portal, /available-groups\?year=\$\{portalYear\}/,
      "교사 포털이 보는 학년도를 함께 보내야 한다. 안 보내면 명단과 다른 해를 볼 수 있다.");
    assert.doesNotMatch(portal, /available-groups'\)\.catch\(\(\) => null\)/,
      "후보를 못 받아 온 까닭을 삼키면 화면에는 '고를 것이 없음'으로만 보인다.");
    assert.match(portal, /id="modal-group-notice"/,
      "왜 고를 것이 없는지 적을 자리가 있어야 한다.");
    assert.match(portal, /availableError = err\.message/,
      "서버가 보낸 까닭을 그대로 보여 줘야 한다.");

    console.log("Teacher group creation contract: OK");
  } finally {
    server.close();
    Module._load = originalLoad;
  }
})();
