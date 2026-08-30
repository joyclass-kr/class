// Contract test for 학급 알리미 (class board) permissions.
//
// The board is shared: the homeroom teacher posts the daily 알림장 and subject
// teachers (전담) post to the same class board, so every student sees both in
// one place. That sharing makes the write rules the interesting part -- a
// subject teacher must not be able to wipe the homeroom teacher's posts, and
// must only reach classes in their own school.
//
// `pg` is stubbed (no Postgres in CI). The stub also checks that each query's
// $N placeholders match the parameter array it was handed.
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
const serverDir = path.join(__dirname, "..", "game-hub-server");
const express = require(path.join(serverDir, "node_modules", "express"));

function assertPlaceholderArity(sql, params) {
  const used = new Set();
  for (const match of String(sql).matchAll(/\$(\d+)/g)) used.add(Number(match[1]));
  if (used.size === 0) return;
  const highest = Math.max(...used);
  const given = Array.isArray(params) ? params.length : 0;
  assert.ok(highest <= given, `SQL uses $${highest} but got ${given} parameter(s):\n${sql}`);
  for (let i = 1; i <= highest; i += 1) {
    assert.ok(used.has(i), `SQL skips $${i}:\n${sql}`);
  }
}

// --- world -----------------------------------------------------------------
// user 1: homeroom teacher of class 100 (3학년 2반)
// user 2: subject teacher (전담, 음악) at the same school
// user 3: student in class 100
const TEACHERS = {
  1: { school_id: 5, teacher_type: "homeroom", subject_name: null },
  2: { school_id: 5, teacher_type: "전담", subject_name: "음악" }
};
const SCHOOL_CLASSES = [
  { id: "100", grade: 3, class_number: 2, teaching: true },
  { id: "101", grade: 4, class_number: 1, teaching: false }
];

let sessionRows = [];
let postDeleteRows = [];
let commentDeleteRows = [];
const deleteAttempts = [];
const insertedPosts = [];

function answer(sql, params) {
  const text = String(sql);
  if (text.includes("FROM classroom_sessions s")) return { rows: sessionRows };

  // requireTeacher's registration probe
  if (text.includes("classroom_teachers t") && text.includes("sc.enabled = TRUE")) {
    return { rows: TEACHERS[Number(params?.[0])] ? [{ ok: 1 }] : [] };
  }
  // classboardScope's teacher lookup
  if (text.includes("SELECT school_id, teacher_type FROM classroom_teachers")) {
    const t = TEACHERS[Number(params?.[0])];
    return { rows: t ? [t] : [] };
  }
  // classboardScope's school-wide class list (subject teacher / admin)
  if (text.includes("EXISTS") && text.includes("school_master_timetable m")) {
    return { rows: SCHOOL_CLASSES.map(c => ({
      id: c.id, grade: c.grade, class_number: c.class_number, teaching: c.teaching
    })) };
  }
  // userClassId -> homeroom teacher's own assignment
  if (text.includes("FROM classroom_teachers") && text.includes("grade IS NOT NULL")) {
    return { rows: Number(params?.[0]) === 1
      ? [{ school_id: 5, academic_year: 2026, grade: 3, class_number: 2, teacher_name: "담임" }]
      : [] };
  }
  if (text.includes("INSERT INTO classroom_classes")) return { rows: [{ id: 100 }] };
  if (text.includes("FROM school_students s") && text.includes("JOIN classroom_classes c")) {
    return { rows: Number(params?.[0]) === 3 ? [{ id: 100 }] : [] };
  }
  // single-class lookup used to label the scope
  if (text.includes("SELECT id, grade, class_number FROM classroom_classes WHERE id")) {
    return { rows: [{ id: 100, grade: 3, class_number: 2 }] };
  }
  if (text.includes("FROM classroom_classes WHERE id") && text.includes("teacher_user_id")) {
    return { rows: Number(params?.[1]) === 1 ? [{ ok: 1 }] : [] };
  }
  if (text.includes("INSERT INTO classroom_classboard_posts")) {
    insertedPosts.push(params);
    return { rows: [{ id: 7 }] };
  }
  if (text.includes("DELETE FROM classroom_classboard_posts")) {
    deleteAttempts.push({ sql: text, params });
    return { rows: postDeleteRows, rowCount: postDeleteRows.length };
  }
  if (text.includes("DELETE FROM classroom_classboard_comments")) {
    deleteAttempts.push({ sql: text, params });
    return { rows: commentDeleteRows, rowCount: commentDeleteRows.length };
  }
  return { rows: [], rowCount: 0 };
}

class FakePool {
  async query(sql, params) {
    assertPlaceholderArity(sql, params);
    return answer(sql, params);
  }
  async connect() {
    return {
      query: async (sql, params) => { assertPlaceholderArity(sql, params); return answer(sql, params); },
      release() {}
    };
  }
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

const platform = createClassroomPlatform({
  databaseUrl: "postgres://stub/stub", googleClientId: "", teacherEmails: "", adminEmails: ""
});

const app = express();
app.use(express.json());
app.use("/api", platform.router);
app.use((error, _req, res, _next) => {
  res.status(error.status || 500).json({ code: error.code, message: error.message });
});

const asHomeroom = () => { sessionRows = [{ id: 1, email: "hr@x.kr", role: "teacher", display_name: "담임" }]; };
const asSubject = () => { sessionRows = [{ id: 2, email: "sub@x.kr", role: "teacher", display_name: "음악쌤" }]; };
const asStudent = () => { sessionRows = [{ id: 3, email: "kid@x.kr", role: "student", display_name: "학생" }]; };

(async () => {
  await platform.initialize();
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const cookie = "class_session=stub";
  const get = (url) => fetch(base + url, { headers: { Cookie: cookie } });
  const post = (url, body) => fetch(base + url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify(body)
  });
  const del = (url) => fetch(base + url, { method: "DELETE", headers: { Cookie: cookie } });

  try {
    // 1. A subject teacher can post at all -- this is what used to fail with
    //    "선생님은 배정된 학급이 없습니다" because they own no homeroom class.
    asSubject();
    insertedPosts.length = 0;
    const subjectPost = await post("/api/classboard/posts", { content: "음악 준비물", classId: "101" });
    assert.equal(subjectPost.status, 200, `Expected 200, got ${subjectPost.status}: ${await subjectPost.clone().text()}`);
    assert.equal(insertedPosts.length, 1, "The subject teacher's post must be stored.");
    assert.equal(String(insertedPosts[0][0]), "101", "It must land on the class they chose.");
    assert.equal(insertedPosts[0][1], 2, "The author must be the subject teacher.");

    // 2. They may only post to classes in their own school's list.
    insertedPosts.length = 0;
    const foreign = await post("/api/classboard/posts", { content: "x", classId: "999" });
    assert.equal(foreign.status, 403, "Posting to a class outside the scope must be refused.");
    assert.equal(insertedPosts.length, 0);

    // 3. The homeroom teacher posts to their own class without naming it.
    asHomeroom();
    insertedPosts.length = 0;
    const hrPost = await post("/api/classboard/posts", { content: "알림장" });
    assert.equal(hrPost.status, 200, `Expected 200, got ${hrPost.status}: ${await hrPost.clone().text()}`);
    assert.equal(String(insertedPosts[0][0]), "100", "It must default to their own class.");

    // 4. A subject teacher may not delete someone else's post. The SQL must
    //    carry the author/homeroom condition, not just the class.
    asSubject();
    postDeleteRows = [];
    deleteAttempts.length = 0;
    const badDelete = await del("/api/classboard/posts/7");
    assert.equal(badDelete.status, 403, "Deleting another teacher's post must be refused.");
    // The stub cannot evaluate a WHERE clause, so assert the statement itself
    // still narrows by author/homeroom -- deleting by class alone would let any
    // subject teacher wipe the homeroom teacher's 알림장.
    assert.equal(deleteAttempts.length, 1, "The delete must be attempted once.");
    const deleteSql = deleteAttempts[0].sql;
    assert.match(deleteSql, /author_user_id\s*=\s*\$\d/,
      "The post delete must restrict to the post's author.");
    assert.match(deleteSql, /teacher_user_id\s*=\s*\$\d/,
      "The post delete must also allow that class's homeroom teacher.");

    // 5. When the row does match (own post, or homeroom), the delete succeeds.
    asHomeroom();
    postDeleteRows = [{ id: 7 }];
    const okDelete = await del("/api/classboard/posts/7");
    assert.equal(okDelete.status, 200, "The homeroom teacher may remove a post on their board.");

    // 6. Students cannot post at all.
    asStudent();
    insertedPosts.length = 0;
    const studentPost = await post("/api/classboard/posts", { content: "저요" });
    assert.equal(studentPost.status, 403, "Students must not post to the board.");
    assert.equal(insertedPosts.length, 0);

    // 7. A student's class list is just their own class, and it is read-only.
    const studentClasses = await get("/api/classboard/classes");
    assert.equal(studentClasses.status, 200);
    const sc = await studentClasses.json();
    assert.equal(sc.canPost, false, "Students must not be offered the composer.");
    assert.equal(sc.classes.length, 1, "A student sees exactly their own class.");

    // 8. A subject teacher is offered every class in their school, with the
    //    ones they actually teach first.
    asSubject();
    const subjClasses = await get("/api/classboard/classes");
    const list = await subjClasses.json();
    assert.equal(list.canPost, true);
    assert.equal(list.classes.length, 2, "The subject teacher can switch between classes.");
    assert.equal(list.classes[0].teaching, true, "Classes they teach come first.");

    console.log("Classboard permissions contract: OK");
  } finally {
    server.close();
    Module._load = originalLoad;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
