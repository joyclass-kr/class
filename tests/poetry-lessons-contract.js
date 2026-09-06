"use strict";

// 시 읽기 검사.
//   (1) 저작권 — 본문을 실은 시가 정말 실어도 되는 시인지
//   (2) 시마다 갖출 것 — 작품 설명(note)과 제 문제를 가지고 있는지
//   (3) 차시 배정 — 마무리 문제가 정확히 한 차시에만 들어가는지
//   (4) 참조 — 문제와 차시가 가리키는 시가 실제로 있는지
// 저작권 쪽은 눈으로 훑다 놓치면 그대로 사고라 기계가 막는다.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// 사후 70년. 2013년에 50년에서 70년으로 늘릴 때 이미 풀린 것은 그대로 두었으므로,
// 1962년 12월 31일까지 돌아가신 분의 작품은 만료된 것으로 본다.
const EXPIRY_CUTOFF_YEAR = 1962;
// classic은 1900년 이전에 지어진 옛 작품(시조·고전시가·옛 한시)이다.
// 지은이의 사망 연도를 모르는 경우가 많지만 보호 기간이 끝난 것은 분명하다.
const ALLOWED_BASIS = new Set(["expired", "oral", "own-translation", "classic"]);

const poetryDir = path.join(__dirname, "..", "learning", "literacy-numeracy", "poetry");
const read = (name) => fs.readFileSync(path.join(poetryDir, name), "utf8");

const context = { window: {} };
vm.createContext(context);
for (const name of ["poems-index.js", "wrap-questions.js", "lesson-wrap-counts.js", "lessons.js"]) {
    vm.runInContext(read(name), context, { filename: name });
}

// 시는 차례표(제목·지은이·저작권)와 낱낱의 시 파일(본문·낱말·설명·문제)로 나뉘어 있다.
// 검사는 예전처럼 시 한 편을 통째로 놓고 봐야 하므로 여기서 도로 합친다.
const partsDir = path.join(poetryDir, "poems");
const poems = context.window.POETRY_POEM_INDEX.map((entry) => {
    const file = path.join(partsDir, `${entry.id}.js`);
    assert.ok(fs.existsSync(file), `시 ${entry.id}: poems/${entry.id}.js가 없습니다.`);
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: `${entry.id}.js` });
    const part = context.window.POETRY_PART[entry.id];
    assert.ok(part, `시 ${entry.id}: 본문 파일이 자기 자리에 등록되지 않았습니다.`);
    return { ...entry, ...part.poem, lines: part.poem.lines || [] };
});
const questions = [
    ...context.window.POETRY_POEM_INDEX.flatMap((entry) => context.window.POETRY_PART[entry.id].questions || []),
    ...context.window.POETRY_WRAP_QUESTIONS
];

// 차례표에 적어 둔 문제 수가 실제 문제 수와 어긋나면 목록 화면이 거짓말을 한다.
for (const entry of context.window.POETRY_POEM_INDEX) {
    const actual = (context.window.POETRY_PART[entry.id].questions || []).length;
    assert.strictEqual(entry.questionCount, actual,
        `시 ${entry.id}: 차례표의 문제 수(${entry.questionCount})와 실제 문제 수(${actual})가 다릅니다.`);
}
// 차시별 마무리 문제 수도 마찬가지다.
const wrapIdSet = new Set(context.window.POETRY_WRAP_QUESTIONS.map((question) => question.id));
context.window.POETRY_LESSONS.forEach((lesson, index) => {
    const actual = (lesson.wrapIds || []).filter((id) => wrapIdSet.has(id)).length;
    assert.strictEqual(context.window.POETRY_WRAP_COUNTS[index], actual,
        `${index + 1}번째 차시: 적어 둔 마무리 문제 수와 실제 수가 다릅니다.`);
});
const lessons = context.window.POETRY_LESSONS;
const grades = context.window.POETRY_GRADES;

assert.ok(Array.isArray(poems) && poems.length > 0, "시 창고가 비어 있습니다.");
assert.ok(Array.isArray(questions) && questions.length > 0, "문제 은행이 비어 있습니다.");
assert.ok(Array.isArray(lessons) && lessons.length > 0, "차시 배정표가 비어 있습니다.");
assert.ok(Array.isArray(grades) && grades.length > 0, "학년 목록이 비어 있습니다.");

// ── 1. 시와 저작권 ───────────────────────────────────────────────
const poemIds = new Set();
for (const poem of poems) {
    const where = `시 ${poem.id || "(id 없음)"}`;
    assert.ok(poem.id && /^[a-z0-9-]+$/.test(poem.id), `${where}: id가 올바르지 않습니다.`);
    assert.ok(!poemIds.has(poem.id), `${where}: id가 겹칩니다.`);
    poemIds.add(poem.id);
    assert.ok(typeof poem.title === "string" && poem.title.trim(), `${where}: 제목이 없습니다.`);
    assert.ok(typeof poem.poet === "string" && poem.poet.trim(), `${where}: 지은이가 없습니다.`);
    assert.ok(typeof poem.point === "string" && poem.point.trim(), `${where}: 배울 점이 없습니다.`);
    // 시를 읽고 문제를 푼 뒤에 읽는 작품 설명. 이것이 없으면 마지막 화면이 텅 빈다.
    assert.ok(Array.isArray(poem.note) && poem.note.length >= 2,
        `${where}: 작품 설명(note)이 두 문단 이상 있어야 합니다 (지금 ${poem.note ? poem.note.length : 0}문단).`);
    for (const paragraph of poem.note) {
        assert.ok(typeof paragraph === "string" && paragraph.trim(),
            `${where}: 작품 설명에 빈 문단이 있습니다.`);
    }
    assert.ok(["public", "protected"].includes(poem.rights), `${where}: rights는 public 또는 protected여야 합니다.`);

    if (poem.rights === "protected") {
        assert.strictEqual(poem.lines.length, 0,
            `${where}: 보호 기간 안에 있는 시인데 본문이 들어 있습니다. lines를 비워야 합니다.`);
        continue;
    }

    assert.ok(ALLOWED_BASIS.has(poem.basis),
        `${where}: 본문을 실으려면 basis가 expired·oral·own-translation 중 하나여야 합니다 (지금 ${poem.basis}).`);
    assert.ok(poem.lines.length > 0, `${where}: 본문이 비어 있습니다.`);

    if (poem.basis === "oral") {
        assert.strictEqual(poem.poetDied, null, `${where}: 구전 노래는 poetDied가 null이어야 합니다.`);
        continue;
    }

    if (poem.basis === "classic") {
        // 옛 작품은 지은이의 사망 연도를 모를 수 있다. 알면 적되, 근래 사람이면 막는다.
        assert.ok(poem.poetDied === null || (Number.isInteger(poem.poetDied) && poem.poetDied <= EXPIRY_CUTOFF_YEAR),
            `${where}: 옛 작품으로 두려면 poetDied가 null이거나 ${EXPIRY_CUTOFF_YEAR}년 이전이어야 합니다 (지금 ${poem.poetDied}).`);
        continue;
    }

    // expired와 own-translation은 둘 다 원작자의 보호 기간이 끝나 있어야 한다.
    assert.ok(Number.isInteger(poem.poetDied),
        `${where}: 사망 연도가 없습니다. 확인하지 않은 시는 본문을 실을 수 없습니다.`);
    assert.ok(poem.poetDied <= EXPIRY_CUTOFF_YEAR,
        `${where}: ${poem.poet}는 ${poem.poetDied}년에 돌아가셔서 아직 보호 기간 안입니다. rights를 protected로 바꾸고 본문을 빼세요.`);
}

// ── 2. 문제 ──────────────────────────────────────────────────────
const questionIds = new Set();
const seenSentences = new Map();
for (const question of questions) {
    const where = `문제 ${question.id || "(id 없음)"}`;
    assert.ok(question.id && /^[a-z0-9-]+$/.test(question.id), `${where}: id가 올바르지 않습니다.`);
    assert.ok(!questionIds.has(question.id), `${where}: id가 겹칩니다.`);
    questionIds.add(question.id);
    assert.ok(typeof question.category === "string" && question.category.trim(), `${where}: 영역이 없습니다.`);
    assert.ok(typeof question.prompt === "string" && question.prompt.trim(), `${where}: 안내문이 없습니다.`);
    assert.ok(typeof question.sentence === "string" && question.sentence.trim(), `${where}: 물음이 없습니다.`);
    assert.ok(typeof question.explanation === "string" && question.explanation.trim(), `${where}: 해설이 없습니다.`);
    assert.ok(Array.isArray(question.choices) && question.choices.length >= 2 && question.choices.length <= 4,
        `${where}: 보기는 2~4개여야 합니다 (지금 ${question.choices?.length}).`);
    assert.strictEqual(new Set(question.choices).size, question.choices.length, `${where}: 보기가 겹칩니다.`);
    assert.ok(question.choices.includes(question.answer), `${where}: 정답이 보기 안에 없습니다.`);
    // 물음 글이 겹치면 아이가 같은 물음을 두 번 보게 되고, 해설도 어느 쪽 것인지 헷갈린다.
    assert.ok(!seenSentences.has(question.sentence),
        `${where}: 물음 글이 ${seenSentences.get(question.sentence)}와 똑같습니다. 다르게 고쳐 주세요: "${question.sentence}"`);
    seenSentences.set(question.sentence, question.id);
    assert.ok(typeof question.poemId === "string", `${where}: poemId 칸이 없습니다. 정리 문제는 빈 문자열로 둡니다.`);
    if (question.poemId) {
        assert.ok(poemIds.has(question.poemId), `${where}: 없는 시를 가리킵니다: ${question.poemId}`);
    }
}

// ── 3. 차시 ──────────────────────────────────────────────────────
const knownGrades = new Set(grades.map((item) => item.grade));
const lessonIds = new Set();
const assigned = new Map();

for (const lesson of lessons) {
    const where = `차시 ${lesson.id || "(id 없음)"}`;
    assert.ok(lesson.id && /^[a-z0-9-]+$/.test(lesson.id), `${where}: id가 올바르지 않습니다.`);
    assert.ok(!lessonIds.has(lesson.id), `${where}: id가 겹칩니다.`);
    lessonIds.add(lesson.id);
    assert.ok(knownGrades.has(lesson.grade), `${where}: 학년이 학년 목록에 없습니다: ${lesson.grade}`);
    assert.ok(typeof lesson.title === "string" && lesson.title.trim(), `${where}: 이름이 없습니다.`);
    assert.ok(typeof lesson.note === "string" && lesson.note.trim(), `${where}: 설명이 없습니다.`);
    assert.ok(Array.isArray(lesson.poemIds), `${where}: poemIds가 배열이 아닙니다.`);
    assert.ok(Array.isArray(lesson.wrapIds), `${where}: wrapIds가 배열이 아닙니다.`);

    for (const id of lesson.poemIds) {
        assert.ok(poemIds.has(id), `${where}: 없는 시를 가리킵니다: ${id}`);
    }
    for (const id of lesson.wrapIds) {
        assert.ok(questionIds.has(id), `${where}: 없는 문제를 가리킵니다: ${id}`);
        const question = questions.find((item) => item.id === id);
        assert.ok(!question.poemId,
            `${where}: 시 문제가 wrapIds에 들어 있습니다 (${id} → ${question.poemId}). 시 문제는 poemId로만 묶습니다.`);
        assert.ok(!assigned.has(id), `마무리 문제가 두 차시에 들어 있습니다: ${id} (${assigned.get(id)}, ${lesson.id})`);
        assigned.set(id, lesson.id);
    }
}

// ── 4. 남은 것이 없는지 ──────────────────────────────────────────
// 시 없는 문제는 어느 차시의 마무리 문제로든 들어가 있어야 한다. 아니면 화면에 나올 길이 없다.
for (const question of questions) {
    if (question.poemId) continue;
    assert.ok(assigned.has(question.id),
        `어느 차시의 마무리 문제도 아닌 문제가 있습니다: ${question.id}`);
}

const usedPoems = new Set(lessons.flatMap((lesson) => lesson.poemIds));
const questionCount = new Map();
for (const question of questions) {
    if (!question.poemId) continue;
    questionCount.set(question.poemId, (questionCount.get(question.poemId) || 0) + 1);
}
for (const poem of poems) {
    assert.ok(usedPoems.has(poem.id), `어느 차시에서도 읽지 않는 시가 있습니다: ${poem.id}`);
    // 시 하나가 읽기 → 문제 → 작품 설명으로 이어지므로, 문제가 없으면 그 흐름이 끊긴다.
    assert.ok((questionCount.get(poem.id) || 0) >= 2,
        `시 ${poem.id}: 제 문제가 ${questionCount.get(poem.id) || 0}개뿐입니다. 두 개 이상이어야 합니다.`);
}

const readyLessons = lessons.filter((lesson) => lesson.poemIds.length > 0);
const publicPoems = poems.filter((poem) => poem.rights === "public");
console.log(
    `시 읽기 검사 통과 — 시 ${poems.length}편(본문 게재 ${publicPoems.length}편), `
    + `문제 ${questions.length}개, 차시 ${readyLessons.length}/${lessons.length}개`
);
