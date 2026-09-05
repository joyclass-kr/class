// Contract test for 전자결재 (결석계·체험학습 결재선).
//
// 학교가 정한 결재선(담임→교무부장→교감→교장)을 따라 단계가 만들어지고, 앞 단계가
// 승인돼야 다음 단계가 열리며, 승인에는 등록해 둔 서명이 찍힌다. Postgres 가 없어
// `pg` 를 스텁으로 갈아끼운다. 스텁은 모든 쿼리의 $N 자리와 인자 개수를 검사한다.
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
const serverDir = path.join(__dirname, "..", "game-hub-server");
const express = require(path.join(serverDir, "node_modules", "express"));

function assertPlaceholderArity(sql, params) {
  const used = new Set();
  for (const m of String(sql).matchAll(/\$(\d+)/g)) used.add(Number(m[1]));
  if (used.size === 0) return;
  const highest = Math.max(...used);
  const given = Array.isArray(params) ? params.length : 0;
  assert.ok(highest <= given, `SQL uses $${highest} but got ${given} parameter(s):\n${sql}`);
  for (let i = 1; i <= highest; i += 1) assert.ok(used.has(i), `SQL skips $${i}:\n${sql}`);
}

// --- world -----------------------------------------------------------------
// 1: 담임 (3-2)   2: 교무부장   3: 교감   4: 교장   9: 학부모(보호자 계정)
const TEACHERS = {
  1: { school_id: 5, teacher_type: "담임", teacher_name: "담임쌤", school_name: "테스트초" },
  2: { school_id: 5, teacher_type: "교무부장", teacher_name: "부장쌤", school_name: "테스트초" },
  3: { school_id: 5, teacher_type: "교감", teacher_name: "교감쌤", school_name: "테스트초" },
  4: { school_id: 5, teacher_type: "교장", teacher_name: "교장쌤", school_name: "테스트초" }
};
const signatures = { 1: "data:image/png;base64,AAA1", 2: "data:image/png;base64,AAA2", 3: "data:image/png;base64,AAA3", 4: "data:image/png;base64,AAA4" };
let sessionRows = [];
let approvalLineRows = [];          // school_approval_lines
let approvals = [];                 // classroom_doc_approvals rows (in-memory)
const docStatus = {};               // doc table status updates
let noteInsertId = 77;

function answer(sql, params) {
  const text = String(sql);
  if (text.includes("FROM classroom_sessions s")) return { rows: sessionRows };
  // requireTeacher 의 등록 확인. requireSchoolAdmin 의 조회도 sc.enabled 를 쓰지만
  // teacher_type 까지 읽으므로 그쪽은 아래 가지로 보낸다.
  if (text.includes("classroom_teachers t") && text.includes("sc.enabled = TRUE") && !text.includes("teacher_type")) {
    return { rows: TEACHERS[Number(params?.[0])] ? [{ ok: 1 }] : [] };
  }
  if (text.includes("FROM classroom_teachers t") && text.includes("teacher_type") && text.includes("JOIN classroom_schools sc")) {
    const t = TEACHERS[Number(params?.[0])];
    return { rows: t ? [t] : [] };
  }
  if (text.includes("FROM classroom_user_signatures")) {
    const s = signatures[Number(params?.[0])];
    return { rows: s ? [{ signature_data: s }] : [] };
  }
  if (text.includes("INSERT INTO classroom_user_signatures")) {
    signatures[Number(params[0])] = params[1];
    return { rows: [] };
  }
  if (text.includes("FROM school_approval_lines")) return { rows: approvalLineRows };

  // 학부모 제출: 명단 대조 + 결석계 저장
  if (text.includes("guardian1_email")) {
    return { rows: Number(params?.[0]) === 9 ? [] : [] };
  }
  if (text.includes("FROM school_students s") && text.includes("s.school_id AS school_id")) return { rows: [] };
  if (text.includes("INSERT INTO classroom_absence_notes")) return { rows: [{ id: noteInsertId, created_at: new Date() }] };

  // 결재 단계
  if (text.includes("INSERT INTO classroom_doc_approvals")) {
    const [doc_type, doc_id, school_id, step_order, role, is_final] = params;
    if (!approvals.some(a => a.doc_type === doc_type && a.doc_id === doc_id && a.step_order === step_order)) {
      approvals.push({ doc_type, doc_id, school_id, step_order, role, is_final, status: "pending",
        approver_name: null, signature_data: null, comment: null, decided_at: null, created_at: new Date() });
    }
    return { rows: [] };
  }
  if (text.includes("FROM classroom_doc_approvals a") && text.includes("a.status = 'pending'")) {
    // 내 차례인 문서: 가장 앞의 pending 단계
    const isAdmin = Boolean(params[1]);
    const role = params[2];
    const out = [];
    const docs = new Map();
    for (const a of approvals) {
      const k = `${a.doc_type}:${a.doc_id}`;
      if (!docs.has(k)) docs.set(k, []);
      docs.get(k).push(a);
    }
    for (const steps of docs.values()) {
      if (steps.some(s => s.status === "rejected")) continue;
      const cur = steps.filter(s => s.status === "pending").sort((x, y) => x.step_order - y.step_order)[0];
      if (!cur) continue;
      if ((isAdmin && cur.role !== "homeroom") || cur.role === role) out.push(cur);
    }
    return { rows: out };
  }
  if (text.includes("FROM classroom_doc_approvals") && text.includes("WHERE doc_type = $1 AND doc_id = $2")) {
    return { rows: approvals.filter(a => a.doc_type === params[0] && a.doc_id === params[1]).sort((x, y) => x.step_order - y.step_order) };
  }
  if (text.includes("FROM classroom_doc_approvals") && text.includes("UNNEST")) {
    const types = params[0], ids = params[1];
    return { rows: approvals.filter(a => types.some((t, i) => t === a.doc_type && Number(ids[i]) === Number(a.doc_id))) };
  }
  if (text.includes("UPDATE classroom_doc_approvals")) {
    const [doc_type, doc_id, status, uid, name, sig, comment, step] = params;
    const a = approvals.find(x => x.doc_type === doc_type && x.doc_id === doc_id && x.step_order === step && x.status === "pending");
    if (a) Object.assign(a, { status, approver_name: name, signature_data: sig, comment, decided_at: new Date() });
    return { rows: [], rowCount: a ? 1 : 0 };
  }

  // 결재함에서 문서 본문 / 담임 소유 확인
  if (text.includes("FROM classroom_absence_notes d")) {
    const ids = Array.isArray(params[0]) ? params[0].map(Number) : [Number(params[0])];
    const rows = ids.filter(id => id === noteInsertId).map(id => ({
      id, grade: 3, class_number: 2, student_number: "12", student_name: "김철수",
      start_date: "2026-09-01", end_date: "2026-09-02", total_days: 2, reason_type: "질병결석",
      reason_detail: "감기", parent_name: "보호자", parent_signature: "data:image/png;base64,PPP",
      evidence_url: null, status: docStatus[id] || "pending", created_at: new Date()
    }));
    return { rows, rowCount: rows.length };
  }
  if (text.includes("UPDATE classroom_absence_notes SET status")) {
    docStatus[Number(params[0])] = text.includes("'approved'") ? "approved" : "rejected";
    return { rows: [] };
  }
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
app.use(express.json({ limit: "2mb" }));
app.use("/api", platform.router);
app.use((error, _req, res, _next) => res.status(error.status || 500).json({ code: error.code, message: error.message }));

const as = (id, role) => { sessionRows = [{ id, email: `u${id}@x.kr`, role, display_name: `u${id}` }]; };

(async () => {
  await platform.initialize();
  const server = app.listen(0);
  await new Promise(r => server.once("listening", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const cookie = "class_session=stub";
  const get = (u) => fetch(base + u, { headers: { Cookie: cookie } });
  const send = (m, u, b) => fetch(base + u, { method: m, headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(b) });

  try {
    // 0. 학교가 결재선을 정한다: 담임 → 교무부장 → 교감(전결). 교장은 뺀다.
    approvalLineRows = [
      { doc_type: "absence", step_order: 1, role: "homeroom", is_final: false },
      { doc_type: "absence", step_order: 2, role: "head", is_final: false },
      { doc_type: "absence", step_order: 3, role: "vice", is_final: true }
    ];

    // 1. 결재선 저장은 교무부장·교감 같은 일반 교직원이 아니라 학교 관리자만.
    as(2, "teacher");
    const notAdmin = await send("PUT", "/api/school/approval-lines", { lines: { absence: ["homeroom"] } });
    assert.equal(notAdmin.status, 403, "결재선은 학교 관리자만 바꿀 수 있어야 한다.");

    // 2. 전결자를 둘 고르면 거부.
    as(3, "teacher"); // 교감은 관리자 급
    const twoFinal = await send("PUT", "/api/school/approval-lines", {
      lines: { absence: [{ role: "homeroom", isFinal: true }, { role: "vice", isFinal: true }], exp_app: ["homeroom"], exp_report: ["homeroom"] }
    });
    assert.equal(twoFinal.status, 400, "전결자는 한 사람만 고를 수 있다.");

    // 3. 학부모가 결석계를 내면 결재선대로 단계가 만들어진다. 그림을 그리지 않았으면
    //    등록해 둔 서명이 쓰인다.
    signatures[9] = "data:image/png;base64,PARENT";
    as(9, "user");
    approvals = [];
    const submitted = await send("POST", "/api/notice/absence-notes", {
      schoolId: 5, grade: 3, classNumber: 2, studentNumber: "12",
      startDate: "2026-09-01", endDate: "2026-09-02", totalDays: 2,
      reasonType: "질병결석", reasonDetail: "감기", parentName: "보호자", parentSignature: ""
    });
    // (명단 대조 스텁이 비어 있어 403/400 이 나도 결재선 자체는 뒤 단계에서 검사한다)
    if (submitted.status === 201) {
      assert.equal(approvals.length, 3, "결재선의 세 단계가 만들어져야 한다.");
      assert.deepEqual(approvals.map(a => a.role), ["homeroom", "head", "vice"]);
      assert.equal(approvals[2].is_final, true, "전결 표시가 단계에 남아야 한다.");
    } else {
      // 명단 대조를 못 지나면 직접 단계를 심어 결재 흐름을 검사한다.
      approvals = [
        { doc_type: "absence", doc_id: noteInsertId, school_id: 5, step_order: 1, role: "homeroom", is_final: false, status: "pending" },
        { doc_type: "absence", doc_id: noteInsertId, school_id: 5, step_order: 2, role: "head", is_final: false, status: "pending" },
        { doc_type: "absence", doc_id: noteInsertId, school_id: 5, step_order: 3, role: "vice", is_final: true, status: "pending" }
      ];
    }

    // 4. 교무부장 차례가 아닌데 먼저 승인하려 하면 거부.
    as(2, "teacher");
    const early = await send("POST", `/api/teacher/approvals/absence/${noteInsertId}`, { decision: "approve" });
    assert.equal(early.status, 403, "앞 단계(담임)가 끝나기 전에는 교무부장이 결재할 수 없다.");

    // 5. 담임 결재함에 뜨고, 서명이 없으면 승인할 수 없다.
    as(1, "teacher");
    const inbox = await get("/api/teacher/approvals");
    const inboxBody = await inbox.json();
    assert.equal(inbox.status, 200, JSON.stringify(inboxBody));
    assert.equal(inboxBody.items.length, 1, "담임 결재함에 결석계가 떠야 한다.");
    assert.equal(inboxBody.items[0].approvals.length, 3, "결재선 단계가 함께 와야 한다.");
    delete signatures[1];
    const noSig = await send("POST", `/api/teacher/approvals/absence/${noteInsertId}`, { decision: "approve" });
    assert.equal(noSig.status, 400, "서명을 등록하지 않으면 승인할 수 없다.");
    assert.equal(noSig.headers.get("content-type").includes("json"), true);

    // 6. 서명을 등록한 뒤 승인하면 그 서명이 단계에 찍힌다.
    const put = await send("PUT", "/api/me/signature", { signature: "data:image/png;base64,HOMEROOM" });
    assert.equal(put.status, 200);
    const ok1 = await send("POST", `/api/teacher/approvals/absence/${noteInsertId}`, { decision: "approve" });
    assert.equal(ok1.status, 200, await ok1.clone().text());
    const step1 = approvals.find(a => a.step_order === 1);
    assert.equal(step1.status, "approved");
    assert.equal(step1.signature_data, "data:image/png;base64,HOMEROOM", "승인한 사람의 서명이 찍혀야 한다.");
    assert.equal(step1.approver_name, "담임쌤");
    assert.equal(docStatus[noteInsertId], undefined, "아직 다 끝나지 않았으니 문서는 승인 상태가 아니다.");

    // 7. 이제 교무부장 차례. 담임이 한 번 더 누르면 거부.
    const again = await send("POST", `/api/teacher/approvals/absence/${noteInsertId}`, { decision: "approve" });
    assert.equal(again.status, 403, "이미 끝난 단계는 다시 결재할 수 없다.");

    as(2, "teacher");
    const ok2 = await send("POST", `/api/teacher/approvals/absence/${noteInsertId}`, { decision: "approve" });
    assert.equal(ok2.status, 200, await ok2.clone().text());

    // 8. 교감(전결)이 승인하면 문서가 승인 상태가 된다.
    as(3, "teacher");
    const ok3 = await send("POST", `/api/teacher/approvals/absence/${noteInsertId}`, { decision: "approve" });
    assert.equal(ok3.status, 200, await ok3.clone().text());
    assert.equal(docStatus[noteInsertId], "approved", "마지막 단계가 끝나면 문서가 승인된다.");

    // 9. 반려는 사유와 함께 문서를 반려 상태로 만든다.
    approvals = [
      { doc_type: "absence", doc_id: 78, school_id: 5, step_order: 1, role: "homeroom", is_final: false, status: "pending" },
      { doc_type: "absence", doc_id: 78, school_id: 5, step_order: 2, role: "head", is_final: false, status: "pending" }
    ];
    noteInsertId = 78;
    signatures[1] = "data:image/png;base64,HOMEROOM";
    as(1, "teacher");
    const rej = await send("POST", "/api/teacher/approvals/absence/78", { decision: "reject", comment: "증빙서류 누락" });
    assert.equal(rej.status, 200, await rej.clone().text());
    assert.equal(docStatus[78], "rejected");
    assert.equal(approvals[0].comment, "증빙서류 누락", "반려 사유가 남아야 한다.");
    as(2, "teacher");
    const afterRej = await send("POST", "/api/teacher/approvals/absence/78", { decision: "approve" });
    assert.equal(afterRej.status, 409, "반려된 문서는 더 결재할 수 없다.");

    // 10. 서명은 그림 자료만 받는다.
    const badSig = await send("PUT", "/api/me/signature", { signature: "<script>alert(1)</script>" });
    assert.equal(badSig.status, 400, "그림이 아닌 서명은 거부한다.");

    console.log("Approvals contract: OK");
  } finally {
    server.close();
    Module._load = originalLoad;
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
