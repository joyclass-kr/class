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
let rosterEmailRows = [];
let noticeTargetRows = [];
const registeredTeachers = new Set();
let teacherContextRows = [];
let surveyQuestionRows = [];
let upsertCalls = [];
let answerInserts = [];
let questionInserts = [];
let recipientInserts = [];
let recipientRowCount = 0;

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
  if (text.includes("INSERT INTO classroom_absence_notes")) {
    return { rows: [{ id: 900, created_at: new Date() }] };
  }
  if (text.includes("INSERT INTO classroom_notice_recipients")) {
    recipientInserts.push(params);
    return { rows: [], rowCount: recipientRowCount };
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
  // studentMembership(): 로그인한 사람이 학생 본인인지.
  if (text.includes("s.roster_name,") && text.includes("s.student_email IS NOT NULL")) {
    return { rows: membershipRows };
  }
  // resolveNoticeStudent(): 제출하려는 학생의 명단 한 줄(학생/보호자 이메일 확인용).
  if (text.includes("roster_name, student_email, guardian1_email")) return { rows: rosterEmailRows };
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
        // 트랜잭션 안에서 도는 질의도 함께 적는다. 안 적으면 발송처럼 트랜잭션으로
        // 묶인 자리를 시험이 들여다볼 수 없다.
        recordedQueries.push({ sql: String(sql), params });
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

// 받는 사람을 가리는 조건문. 스텁 풀은 WHERE 를 계산하지 못하므로 조건문 자체를 읽는다.
const NOTICE_TARGET_SQL_TEXT = require("node:fs")
  .readFileSync(platformPath, "utf8")
  .match(/const NOTICE_TARGET_SQL = `[\s\S]*?`;/)[0];

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

    // ── 받는 사람 고르기 ────────────────────────────────────────────────
    // 가정통신문은 학급 것이 아니다. 업무 담당자가 동아리든, 이 반 저 반 골라
    // 담은 명단이든 원하는 사람에게 보낸다. 예전에는 고른 사람을 번호만 이어
    // 붙여 보내서 학년·반이 비었고, 그래서 아무에게도 도착하지 않았다.
    recipientInserts = [];
    recipientRowCount = 3;
    const picked = await post("/api/teacher/notices", {
      title: "오케스트라 연습 안내", contentBody: "본문",
      targetType: "students", studentIds: [21, 22, 30]
    }, cookie);
    assert.equal(picked.status, 201, `Expected 201, got ${picked.status}: ${await picked.clone().text()}`);
    assert.equal(recipientInserts.length, 1, "고른 사람은 명단 표에 적혀야 한다.");
    assert.deepEqual(recipientInserts[0][1], [21, 22, 30], "고른 사람이 그대로 실려야 한다.");
    assert.equal((await picked.json()).recipientCount, 3, "몇 명에게 갔는지 알려 줘야 한다.");

    // 받는 사람의 학년·반·번호는 요청이 아니라 명단에서 가져와야 한다. 요청에서
    // 받으면 남의 반 아무 번호나 적어 통신문을 꽂을 수 있다.
    const recipientSql = recordedQueries
      .map(q => q.sql).filter(s => s.includes("INSERT INTO classroom_notice_recipients")).pop();
    assert.match(recipientSql, /SELECT \$1, s\.school_id, s\.grade, s\.class_number/,
      "받는 사람의 학년·반·번호는 명단(school_students)에서 와야 한다.");
    assert.match(recipientSql, /s\.school_id = \$3/,
      "다른 학교 학생을 명단에 넣을 수 없어야 한다.");

    // 아무도 안 골랐는데 '고른 사람에게' 보내면 조용히 아무에게도 안 가는 게 아니라
    // 거절해야 한다.
    recipientInserts = [];
    const noOne = await post("/api/teacher/notices", {
      title: "빈 명단", contentBody: "본문", targetType: "students", studentIds: []
    }, cookie);
    assert.equal(noOne.status, 400, "받는 사람이 없으면 보낼 수 없어야 한다.");
    assert.equal(recipientInserts.length, 0);

    // 읽는 쪽도 그 명단을 봐야 한다. 스텁은 WHERE 를 계산하지 못하니 조건문 자체를
    // 확인한다 -- 여기가 빠지면 고른 사람에게 보낸 글이 다시 사라진다.
    assert.match(NOTICE_TARGET_SQL_TEXT, /FROM classroom_notice_recipients nr/,
      "받는 사람 판정이 명단 표를 봐야 한다.");
    assert.match(NOTICE_TARGET_SQL_TEXT, /nr\.grade = \$2 AND nr\.class_number = \$3/,
      "명단 표를 볼 때도 반이 섞인 채로 사람을 맞춰야 한다.");
    recipientRowCount = 0;

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

    // ── 회신과 문항은 따로 붙는다 ────────────────────────────────────────
    // 넷 중 하나를 고르는 게 아니다. 체험학습이면 동의를 받으면서 알레르기까지
    // 묻는다. 예전에는 reply_type 하나로 갈라서, 동의서에 문항을 달면 문항이
    // 통째로 사라지거나 회신이 거절됐다.
    noticeTargetRows = [{ id: 5, reply_type: "agree" }];
    surveyQuestionRows = [
      { id: 91, notice_id: 5, position: 0, question_text: "알레르기가 있나요?", question_type: "single", options: ["없음", "있음"], is_required: true }
    ];
    upsertCalls = [];
    answerInserts = [];
    const both = await post("/api/notice/replies", {
      noticeId: 5, choice: "agree",
      answers: [{ questionId: "91", choiceIndexes: [1] }]
    }, cookie);
    assert.equal(both.status, 201, `Expected 201, got ${both.status}: ${await both.clone().text()}`);
    assert.equal(upsertCalls.length, 1, "동의는 회신 줄에 남아야 한다.");
    assert.equal(upsertCalls[0][7], "agree");
    assert.equal(answerInserts.length, 1, "같은 회신에 문항 답도 함께 남아야 한다.");
    assert.deepEqual(answerInserts[0][2], [1], "고른 보기가 그대로 저장돼야 한다.");

    // 동의를 받는 글에 'submitted' 로 답할 수는 없다. 동의 여부를 골라야 한다.
    upsertCalls = [];
    const wrongOnBoth = await post("/api/notice/replies", { noticeId: 5, choice: "submitted" }, cookie);
    assert.equal(wrongOnBoth.status, 400, "동의를 받는 글은 동의 여부를 골라야 한다.");
    assert.equal(upsertCalls.length, 0);

    // 필수 문항을 비운 채로는 동의도 저장되지 않는다. 반쪽만 남으면 안 되니까.
    upsertCalls = [];
    answerInserts = [];
    const missingAnswer = await post("/api/notice/replies", {
      noticeId: 5, choice: "agree", answers: []
    }, cookie);
    assert.equal(missingAnswer.status, 400, "필수 문항을 비우면 거절해야 한다.");
    assert.equal(upsertCalls.length, 0, "거절된 회신은 동의만 따로 저장되면 안 된다.");
    surveyQuestionRows = [];

    // ── 학생 계정의 한계 ────────────────────────────────────────────────
    // 알림장과 가정통신문을 한 곳으로 합치면 학생도 가정통신문을 보게 된다.
    // 보는 것은 되지만, 회신·동의와 학부모 서류 제출은 학생이 대신할 수 없다.
    sessionRows = [{ id: 77, email: "kid@example.com", role: "student", display_name: "김철수" }];
    guardianRows = [];
    membershipRows = [{
      student_number: "12", roster_name: "김철수", academic_year: 2026,
      grade: 3, class_number: 2, school_name: "테스트초"
    }];
    schoolLookupRows = [{ school_id: 5 }];
    const kidCookie = "class_session=kid-token";

    // 19. 학생도 자기 반 가정통신문을 읽는다. 여기서 막으면 합칠 이유가 없어진다.
    noticeTargetRows = [{
      id: 1, sender_teacher_name: "담임", title: "현장체험학습 동의서", content_type: "text",
      content_body: "안내", target_type: "class", requires_signature: false,
      reply_type: "agree", created_at: new Date(), reply_choice: null, reply_note: null, replied_at: null
    }];
    const kidList = await fetch(`${base}/api/notice/list`, { headers: { Cookie: kidCookie } });
    assert.equal(kidList.status, 200);
    const kidBody = await kidList.json();
    assert.equal(kidBody.notices.length, 1, "학생도 자기 반 가정통신문을 읽을 수 있어야 한다.");
    assert.equal(kidBody.child.viewerRole, "student",
      "화면이 회신 단추를 감추려면 보는 사람이 학생이라는 걸 알아야 한다.");

    // 20. 그러나 동의서에 학생이 대신 답할 수는 없다.
    upsertCalls = [];
    const kidReply = await post("/api/notice/replies", { noticeId: 1, choice: "agree" }, kidCookie);
    assert.equal(kidReply.status, 403, "학생 계정으로는 회신할 수 없어야 한다.");
    assert.equal((await kidReply.json()).error, "GUARDIAN_ONLY");
    assert.equal(upsertCalls.length, 0, "막힌 회신은 저장되면 안 된다.");

    // 21. 결석계·체험학습·출결 예고도 보호자 서류다. 학생 본인 계정으로는 못 낸다.
    //     (명단에는 그 학생의 이메일이 있으니 '본인'으로는 통과하던 자리다.)
    rosterEmailRows = [{
      roster_name: "김철수", student_email: "kid@example.com",
      guardian1_email: "parent@example.com", guardian2_email: null
    }];
    const kidSubmit = await post("/api/notice/absence-notes", {
      schoolId: 5, grade: 3, classNumber: 2, studentNumber: "12",
      startDate: "2026-09-07", endDate: "2026-09-07", reasonType: "질병결석",
      reasonDetail: "감기", parentName: "학부모", parentSignature: "data:image/png;base64,AAA"
    }, kidCookie);
    assert.equal(kidSubmit.status, 403, "학생이 자기 결석계를 낼 수 있으면 안 된다.");
    assert.equal((await kidSubmit.json()).error, "GUARDIAN_ONLY");

    // 22. 같은 서류를 보호자 계정으로 내면 통과한다 -- 막느라 기능까지 막으면 안 되니까.
    sessionRows = [{ id: 42, email: "parent@example.com", role: "user", display_name: "학부모" }];
    membershipRows = [];
    const parentSubmit = await post("/api/notice/absence-notes", {
      schoolId: 5, grade: 3, classNumber: 2, studentNumber: "12",
      startDate: "2026-09-07", endDate: "2026-09-07", reasonType: "질병결석",
      reasonDetail: "감기", parentName: "학부모", parentSignature: "data:image/png;base64,AAA"
    }, cookie);
    assert.equal(parentSubmit.status < 400, true,
      `보호자 제출은 통과해야 한다. got ${parentSubmit.status}: ${await parentSubmit.clone().text()}`);
    rosterEmailRows = [];

    console.log(`Notice replies contract: OK (${recordedQueries.length} queries checked)`);
  } finally {
    server.close();
    Module._load = originalLoad;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
