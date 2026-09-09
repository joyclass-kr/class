// Contract test for the PROFILES picker on the front page.
//
// 한 사람이 한 학교의 학교 관리자이면서 다른 학교 아이의 보호자일 수 있다. 구글
// 계정에 붙는 role 은 자리가 하나뿐이라(admin > teacher > guardian) 그 자리만 보고
// 고르면 둘 중 하나는 사라진다. 카드는 실제 등록을 하나씩 세어 만들어야 한다.
// Postgres 가 없어 `pg` 를 스텁으로 갈아끼운다.
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
const fs = require("node:fs");
const root = path.join(__dirname, "..");
const serverDir = path.join(root, "game-hub-server");
const express = require(path.join(serverDir, "node_modules", "express"));

// --- world -----------------------------------------------------------------
// 7번 계정: 한 학교의 학교 관리자(구글 이메일로만 등록돼 있고 user_id 는 아직 비어
// 있다) 이면서, 다른 학교에 다니는 아이의 보호자.
const EMAIL = "school.master@example.kr";
let teacherRows = [
  {
    id: 31, teacher_name: "학교 관리자", active: true, academic_year: null, grade: null, class_number: null,
    teacher_type: "관리자", user_id: null, google_email: EMAIL,
    school_enabled: true, school_id: 5, school_name: "가나초등학교"
  }
];
let sessionRows = [{ id: 7, email: EMAIL, display_name: "보호자", picture_url: null, google_domain: "example.kr", role: "teacher" }];
const GUARDIAN_CHILD = {
  student_id: 91, student_number: "3", student_name: "테스트학생", academic_year: 2026,
  grade: 4, class_number: 1, school_id: 9, school_name: "다라초등학교"
};

function assertPlaceholderArity(sql, params) {
  const used = new Set();
  for (const m of String(sql).matchAll(/\$(\d+)/g)) used.add(Number(m[1]));
  if (used.size === 0) return;
  const highest = Math.max(...used);
  const given = Array.isArray(params) ? params.length : 0;
  assert.ok(highest <= given, `SQL uses $${highest} but got ${given} parameter(s):\n${sql}`);
  for (let i = 1; i <= highest; i += 1) assert.ok(used.has(i), `SQL skips $${i}:\n${sql}`);
}

// 스텁도 진짜 Postgres 처럼 user_id 와 google_email 두 조건을 모두 본다.
function matchesTeacher(row, userId, email) {
  if (row.user_id !== null && String(row.user_id) === String(userId)) return true;
  return Boolean(email) && String(row.google_email || "").toLowerCase() === String(email).toLowerCase();
}

function answer(sql, rawParams) {
  const text = String(sql);
  // 스키마를 만드는 DDL 은 인자가 없다. 그 문장이 컬럼 이름만 보고 아래 가지로
  // 새어 들어가지 않도록 인자 없는 문장은 바로 돌려보낸다.
  if (!Array.isArray(rawParams)) return { rows: [], rowCount: 0 };
  const params = rawParams;
  if (text.includes("FROM classroom_sessions s")) return { rows: sessionRows, rowCount: sessionRows.length };
  if (text.includes("FROM classroom_teachers t") && text.includes("JOIN classroom_schools sc")) {
    const rows = teacherRows.filter((row) => matchesTeacher(row, params[0], params[1]));
    return { rows, rowCount: rows.length };
  }
  if (text.includes("SELECT 1 FROM classroom_teachers")) {
    const rows = teacherRows.filter((row) => matchesTeacher(row, params[0], params[1])).map(() => ({ ok: 1 }));
    return { rows, rowCount: rows.length };
  }
  if (text.includes("UPDATE classroom_teachers SET user_id")) {
    const row = teacherRows.find((r) => String(r.id) === String(params[1]) && r.user_id === null);
    if (row) row.user_id = params[0];
    return { rows: [], rowCount: row ? 1 : 0 };
  }
  // 보호자로 걸린 아이들
  if (text.includes("guardian1_email")) {
    const email = String(params[0] || "").toLowerCase();
    const rows = email === EMAIL ? [GUARDIAN_CHILD] : [];
    return { rows, rowCount: rows.length };
  }
  // 이 계정은 학생 명단에는 없다.
  if (text.includes("FROM classroom_students s") && text.includes("JOIN classroom_classes c")) return { rows: [], rowCount: 0 };
  return { rows: [], rowCount: 0 };
}

class FakePool {
  async query(sql, params) { assertPlaceholderArity(sql, params); return answer(sql, params); }
  async connect() { return { query: async (s, p) => { assertPlaceholderArity(s, p); return answer(s, p); }, release() {} }; }
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
app.use(express.json({ limit: "1mb" }));
app.use("/api", platform.router);
app.use((error, _req, res, _next) => res.status(error.status || 500).json({ code: error.code, message: error.message }));

(async () => {
  await platform.initialize();
  const server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = (u) => fetch(base + u, { headers: { Cookie: "class_session=stub" } });

  try {
    // 1. 구글 이메일로만 등록된 학교 관리자도 교직원으로 읽혀야 한다. user_id 는 그
    //    계정이 새로 구글 로그인을 할 때에야 채워지기 때문이다.
    const me = await (await get("/api/auth/me")).json();
    assert.equal(me.signedIn, true);
    assert.equal(me.isTeacher, true, "이메일로만 등록된 학교 관리자도 교직원으로 읽혀야 한다.");
    assert.equal(me.guardianChildren.length, 1, "보호자로 걸린 아이가 함께 와야 한다.");
    assert.equal(me.guardianChildren[0].studentName, "테스트학생");

    // 2. 프로필 카드의 재료. 학교 관리자 등록이 그대로 실려 와야 한다.
    const profile = await (await get("/api/teacher/profile")).json();
    assert.equal(profile.profiles.length, 1, "학교 관리자 등록이 한 장 와야 한다.");
    assert.equal(profile.profiles[0].teacherType, "관리자");
    assert.equal(profile.profiles[0].schoolName, "가나초등학교");
    assert.equal(profile.registered, true);
    assert.equal(profile.profile.id, profile.profiles[0].id, "옛 이름 profile 도 남아 있어야 한다.");

    // 3. 이메일로 찾은 김에 user_id 를 채워 둔다.
    assert.equal(String(teacherRows[0].user_id), "7", "이메일로 찾은 등록은 user_id 가 채워져야 한다.");

    // 4. 학교를 옮겨 다니는 교직원은 등록 수만큼 카드를 받는다.
    teacherRows.push({
      id: 32, teacher_name: "담임", active: true, academic_year: 2026, grade: 4, class_number: 1,
      teacher_type: "담임", user_id: null, google_email: EMAIL,
      school_enabled: true, school_id: 9, school_name: "다라초등학교"
    });
    const twoSchools = await (await get("/api/teacher/profile")).json();
    assert.equal(twoSchools.profiles.length, 2, "등록이 둘이면 카드도 둘이어야 한다.");

    // 5. 등록이 하나도 없는 계정에는 카드 재료가 없다.
    teacherRows = [];
    const none = await (await get("/api/teacher/profile")).json();
    assert.deepEqual(none.profiles, []);
    assert.equal(none.profile, null);
    assert.equal(none.registered, false);
    const guardianOnly = await (await get("/api/auth/me")).json();
    assert.equal(guardianOnly.isTeacher, false);

    // 6. 화면 쪽: 카드는 등록마다 하나씩, role 자리를 보고 고르지 않는다.
    const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
    assert.match(indexHtml, /teacherProfiles\.forEach\(/,
      "학교 관리자·교직원 카드는 등록마다 하나씩 만들어야 한다.");
    assert.match(indexHtml, /state\.guardianChildren\.forEach\(child =>/,
      "보호자 카드는 아이마다 하나씩 만들어야 한다.");
    assert.doesNotMatch(indexHtml, /role === 'teacher' \|\| state\.isTeacher/,
      "교직원 카드를 role 자리로 잠그면 학교 관리자 겸 학부모가 한 장을 잃는다.");

    console.log("Profile cards contract: OK");
  } finally {
    server.close();
    Module._load = originalLoad;
  }
})();
