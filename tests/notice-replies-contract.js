// Contract test for the guardian notice-reply flow (가정통신문 회신 수합).
//
// There is no Postgres in CI, so `pg` is stubbed with a pool that answers canned
// rows. The stub also asserts that every query's $N placeholders line up with the
// parameter array it was handed -- that is the failure mode SQL built by string
// interpolation is most prone to, and it is checked on every query the routes run.
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
// express lives in the server's own node_modules, not the repo root.
const serverDir = path.join(__dirname, "..", "game-hub-server");
const express = require(path.join(serverDir, "node_modules", "express"));

const recordedQueries = [];

function assertPlaceholderArity(sql, params) {
  const used = new Set();
  for (const match of String(sql).matchAll(/\$(\d+)/g)) used.add(Number(match[1]));
  if (used.size === 0) return;
  const highest = Math.max(...used);
  const given = Array.isArray(params) ? params.length : 0;
  assert.ok(
    highest <= given,
    `SQL uses $${highest} but only ${given} parameter(s) were passed:\n${sql}`
  );
  for (let i = 1; i <= highest; i += 1) {
    assert.ok(used.has(i), `SQL skips placeholder $${i} (gaps break node-postgres):\n${sql}`);
  }
}

// Canned answers keyed by a distinctive fragment of each query.
let sessionRows = [];
let membershipRows = [];
let guardianRows = [];
let schoolLookupRows = [];
let noticeTargetRows = [];
const registeredTeachers = new Set();
let teacherContextRows = [];
let surveyQuestionRows = [];
let upsertCalls = [];
let answerInserts = [];
let questionInserts = [];

function answer(sql, params) {
  const text = String(sql);
  if (text.includes("FROM classroom_sessions s")) return { rows: sessionRows };
  if (text.includes("INSERT INTO classroom_notice_replies")) {
    upsertCalls.push(params);
    return { rows: [{ id: 555 }] };
  }
  if (text.includes("INSERT INTO classroom_notice_answers")) {
    answerInserts.push(params);
    return { rows: [] };
  }
  if (text.includes("INSERT INTO classroom_notice_questions")) {
    questionInserts.push(params);
    return { rows: [] };
  }
  if (text.includes("INSERT INTO classroom_notices")) {
    return { rows: [{ id: 321, created_at: new Date() }] };
  }
  if (text.includes("FROM classroom_notice_questions")) {
    return { rows: surveyQuestionRows };
  }
  if (text.includes("FROM classroom_notices n") && text.includes("n.reply_type")) {
    return { rows: noticeTargetRows };
  }
  if (text.includes("school_students s") && text.includes("s.school_id AS school_id")) {
    return { rows: schoolLookupRows };
  }
  if (text.includes("guardian1_email")) return { rows: guardianRows };
  // requireTeacher() keys off the classroom_teachers registration, not user.role,
  // so these must answer per user id -- a blanket "yes" would let the test pass
  // while a guardian could really reach teacher-only routes.
  if (text.includes("FROM classroom_teachers t") && text.includes("teacher_type")) {
    return { rows: registeredTeachers.has(Number(params?.[0])) ? teacherContextRows : [] };
  }
  if (text.includes("classroom_teachers t") && text.includes("sc.enabled = TRUE")) {
    return { rows: registeredTeachers.has(Number(params?.[0])) ? [{ ok: 1 }] : [] };
  }
  return { rows: [] };
}

class FakePool {
  async query(sql, params) {
    assertPlaceholderArity(sql, params);
    recordedQueries.push({ sql: String(sql), params });
    return answer(sql, params);
  }
  async connect() {
    return {
      query: async (sql, params) => {
        assertPlaceholderArity(sql, params);
        return answer(sql, params);
      },
      release() {}
    };
  }
  on() {}
  async end() {}
}

// --- stub `pg` before the platform module is loaded -------------------------
const originalLoad = Module._load;
Module._load = function stubbedLoad(request, parent, isMain) {
  if (request === "pg") return { Pool: FakePool };
  return originalLoad.call(this, request, parent, isMain);
};

const platformPath = path.join(serverDir, "classroom-platform.js");
delete require.cache[require.resolve(platformPath)];
const { createClassroomPlatform } = require(platformPath);

const platform = createClassroomPlatform({
  databaseUrl: "postgres://stub/stub",
  googleClientId: "",
  teacherEmails: "",
  adminEmails: ""
});

const app = express();
app.use(express.json());
app.use("/api", platform.router);
app.use((error, _req, res, _next) => {
  res.status(error.status || 500).json({ code: error.code, message: error.message });
});

(async () => {
  await platform.initialize();
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  const post = (url, body, cookie) => fetch(base + url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body)
  });

  try {
    // 1. Signed-out visitors get no notices at all -- notices are roster-only.
    const anon = await fetch(`${base}/api/notice/list`);
    assert.equal(anon.status, 200);
    assert.deepEqual((await anon.json()).notices, [], "Signed-out viewers must see no notices.");

    // 2. Replying requires a session.
    const noAuth = await post("/api/notice/replies", { noticeId: 1, choice: "agree" });
    assert.equal(noAuth.status, 401, "Anonymous replies must be rejected.");

    // --- from here on, pretend a guardian is signed in ---
    sessionRows = [{ id: 42, email: "parent@example.com", role: "user", display_name: "학부모" }];
    membershipRows = [];
    guardianRows = [{
      student_id: 7, student_number: "12", student_name: "김철수", academic_year: 2026,
      grade: 3, class_number: 2, school_id: 5, school_name: "서울계상초등학교"
    }];
    const cookie = "class_session=stub-token";

    // 3. A malformed choice is refused before any write happens.
    upsertCalls = [];
    const badChoice = await post("/api/notice/replies", { noticeId: 1, choice: "maybe" }, cookie);
    assert.equal(badChoice.status, 400, "Unknown reply choices must be refused.");
    assert.equal(upsertCalls.length, 0, "A refused reply must not be written.");

    // 4. A notice that was not addressed to this child cannot be answered.
    noticeTargetRows = [];
    const notMine = await post("/api/notice/replies", { noticeId: 99, choice: "agree" }, cookie);
    assert.equal(notMine.status, 404, "Replying to an unaddressed notice must 404.");
    assert.equal(upsertCalls.length, 0);

    // 5. A consent notice rejects a bare read receipt.
    noticeTargetRows = [{ id: 1, reply_type: "agree" }];
    const wrongKind = await post("/api/notice/replies", { noticeId: 1, choice: "confirmed" }, cookie);
    assert.equal(wrongKind.status, 400, "A consent notice must not accept 'confirmed'.");

    // 6. The happy path writes exactly one upsert carrying the child's identity.
    upsertCalls = [];
    const ok = await post("/api/notice/replies", { noticeId: 1, choice: "agree", note: "확인했습니다" }, cookie);
    assert.equal(ok.status, 201, `Expected 201, got ${ok.status}: ${await ok.clone().text()}`);
    assert.equal(upsertCalls.length, 1, "A valid reply must be persisted once.");
    const written = upsertCalls[0];
    assert.equal(written[0], 1, "notice_id must be the notice replied to.");
    assert.equal(written[2], 3, "grade must come from the roster, not the request body.");
    assert.equal(written[4], "12", "student_number must come from the roster.");
    assert.equal(written[7], "agree");

    // 7. A guardian may not answer on behalf of a child who is not theirs.
    upsertCalls = [];
    const spoof = await post(
      "/api/notice/replies",
      { noticeId: 1, choice: "agree", grade: 6, classNumber: 1, studentNumber: "30" },
      cookie
    );
    assert.equal(spoof.status, 403, "Answering for another family's child must be refused.");
    assert.equal(upsertCalls.length, 0);

    // 8. The full notice-list query runs for a signed-in guardian, so its
    //    placeholders and JOIN get exercised rather than short-circuited.
    noticeTargetRows = [{
      id: 1, sender_teacher_name: "담임", title: "현장체험학습 동의서", content_type: "text",
      content_body: "본문", target_type: "class", requires_signature: true, reply_type: "agree",
      created_at: new Date(), reply_choice: "agree", reply_note: null, updated_at: new Date()
    }];
    const listed = await fetch(`${base}/api/notice/list`, { headers: { Cookie: cookie } });
    assert.equal(listed.status, 200);
    const listBody = await listed.json();
    assert.equal(listBody.notices.length, 1, "The guardian's notice should be returned.");
    assert.equal(listBody.notices[0].replyType, "agree");
    assert.equal(listBody.notices[0].myReply.choice, "agree", "An existing answer must come back with the notice.");
    assert.equal(listBody.child.studentNumber, "12", "The list must say which child it is for.");

    // --- surveys ---------------------------------------------------------
    const surveyQuestions = [
      { id: 11, position: 0, question_text: "급식 만족도", question_type: "single",
        options: ["만족", "보통", "불만족"], is_required: true },
      { id: 12, position: 1, question_text: "바라는 점", question_type: "text",
        options: [], is_required: false }
    ];

    // 9. A survey notice must be answered with 'submitted', not a consent choice.
    noticeTargetRows = [{ id: 2, reply_type: "survey" }];
    surveyQuestionRows = surveyQuestions;
    const wrongForSurvey = await post("/api/notice/replies", { noticeId: 2, choice: "agree" }, cookie);
    assert.equal(wrongForSurvey.status, 400, "A survey must not accept a bare consent choice.");

    // 10. A required question left blank is refused.
    answerInserts = [];
    const missing = await post(
      "/api/notice/replies",
      { noticeId: 2, choice: "submitted", answers: [{ questionId: "12", text: "없습니다" }] },
      cookie
    );
    assert.equal(missing.status, 400, "A required question must be answered.");
    assert.equal(answerInserts.length, 0, "Nothing may be written when validation fails.");

    // 11. An out-of-range option index is refused rather than stored.
    const outOfRange = await post(
      "/api/notice/replies",
      { noticeId: 2, choice: "submitted", answers: [{ questionId: "11", choiceIndexes: [9] }] },
      cookie
    );
    assert.equal(outOfRange.status, 400, "Choices outside the option list must be refused.");

    // 12. Picking two options on a single-choice question is refused.
    const tooMany = await post(
      "/api/notice/replies",
      { noticeId: 2, choice: "submitted", answers: [{ questionId: "11", choiceIndexes: [0, 1] }] },
      cookie
    );
    assert.equal(tooMany.status, 400, "A single-choice question must take one answer.");

    // 13. A valid submission stores one answer row per answered question, and
    //     an answer aimed at a question from another notice is dropped.
    upsertCalls = [];
    answerInserts = [];
    const goodSurvey = await post(
      "/api/notice/replies",
      {
        noticeId: 2,
        choice: "submitted",
        answers: [
          { questionId: "11", choiceIndexes: [0] },
          { questionId: "12", text: "고맙습니다" },
          { questionId: "999", choiceIndexes: [0] }
        ]
      },
      cookie
    );
    assert.equal(goodSurvey.status, 201, `Expected 201, got ${goodSurvey.status}: ${await goodSurvey.clone().text()}`);
    assert.equal(upsertCalls.length, 1, "The survey reply row must be written once.");
    assert.equal(upsertCalls[0][7], "submitted");
    assert.equal(answerInserts.length, 2, "Only answers to this notice's questions may be stored.");
    assert.deepEqual(answerInserts[0][2], [0], "The chosen option index must be stored.");
    assert.equal(answerInserts[1][3], "고맙습니다", "The written answer must be stored.");

    // 14. Sending a survey with a choice question that has one option is refused.
    sessionRows = [{ id: 9, email: "teacher@example.com", role: "teacher", display_name: "담임" }];
    registeredTeachers.add(9);
    teacherContextRows = [{ school_id: 5, teacher_name: "담임", teacher_type: "교사", school_name: "서울계상초등학교" }];
    questionInserts = [];
    const thinSurvey = await post("/api/teacher/notices", {
      title: "설문", contentBody: "본문", replyType: "survey",
      questions: [{ text: "하나뿐", type: "single", options: ["예"] }]
    }, cookie);
    assert.equal(thinSurvey.status, 400, "A choice question needs at least two options.");
    assert.equal(questionInserts.length, 0);

    // 15. A survey with no questions at all is refused.
    const emptySurvey = await post("/api/teacher/notices", {
      title: "설문", contentBody: "본문", replyType: "survey", questions: []
    }, cookie);
    assert.equal(emptySurvey.status, 400, "A survey needs at least one question.");

    // 16. A well-formed survey stores its questions alongside the notice.
    questionInserts = [];
    const sentSurvey = await post("/api/teacher/notices", {
      title: "급식 설문", contentBody: "본문", replyType: "survey",
      questions: [
        { text: "만족도", type: "single", options: ["만족", "불만족"] },
        { text: "의견", type: "text" }
      ]
    }, cookie);
    assert.equal(sentSurvey.status, 201, `Expected 201, got ${sentSurvey.status}: ${await sentSurvey.clone().text()}`);
    assert.equal(questionInserts.length, 2, "Both questions must be stored.");
    assert.equal(questionInserts[0][1], 0, "Question order must be recorded.");
    assert.equal(questionInserts[1][3], "text");

    // 17. The teacher collection view is teacher-only.
    sessionRows = [{ id: 42, email: "parent@example.com", role: "user", display_name: "학부모" }];
    const parentPeek = await fetch(`${base}/api/teacher/notices`, { headers: { Cookie: cookie } });
    assert.equal(parentPeek.status, 403, "Guardians must not read the collection view.");

    // 10. A registered teacher reaches the collection view, exercising the
    //     scope predicate's placeholders.
    sessionRows = [{ id: 9, email: "teacher@example.com", role: "teacher", display_name: "담임" }];
    registeredTeachers.add(9);
    teacherContextRows = [{ school_id: 5, teacher_name: "담임", teacher_type: "교사", school_name: "서울계상초등학교" }];
    const teacherView = await fetch(`${base}/api/teacher/notices`, { headers: { Cookie: cookie } });
    assert.equal(teacherView.status, 200, `Expected 200, got ${teacherView.status}: ${await teacherView.clone().text()}`);
    assert.ok(Array.isArray((await teacherView.json()).notices), "The collection view must return a list.");

    console.log(`Notice replies contract: OK (${recordedQueries.length} queries checked)`);
  } finally {
    server.close();
    Module._load = originalLoad;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
