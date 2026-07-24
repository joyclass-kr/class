"use strict";

const assert = require("node:assert");
const core = require("../learning/academics/classical-chinese-idioms/idioms-core.js");
const data = require("../learning/academics/classical-chinese-idioms/idioms-data.js");

assert.ok(data.length >= 40, "검증된 핵심 고사성어가 40개 이상이어야 합니다.");
assert.strictEqual(new Set(data.map((item) => item.id)).size, data.length, "id는 중복될 수 없습니다.");
data.forEach((item) => {
    ["word", "hanja", "hanjaExpl", "level", "meaning", "story", "lesson", "source", "reference", "verification"].forEach((field) => {
        assert.ok(item[field], `${item.id}.${field} 값이 필요합니다.`);
    });
    assert.ok([...item.word].length >= 2 && [...item.word].length <= 6, `${item.word}의 글자 수가 학습 범위를 벗어났습니다.`);
    assert.strictEqual([...item.hanja].length, [...item.word].length, `${item.word}과 한자의 글자 수가 같아야 합니다.`);
    assert.ok(["초급", "중급", "고급"].includes(item.level), `${item.word}의 단계가 올바르지 않습니다.`);
    assert.match(item.reference, /^https:\/\//, `${item.word}의 근거 링크는 HTTPS여야 합니다.`);
});

const allDeck = core.filterDeck(data, { status: "all", progress: {} }, "전체");
assert.strictEqual(allDeck.length, data.length, "전체 덱은 모든 고사성어를 포함해야 합니다.");
const wisdomDeck = core.filterDeck(data, { status: "all", progress: {} }, "지혜·처세");
assert.ok(wisdomDeck.length >= 10, "지혜·처세 주제 덱에 충분한 성어가 포함되어야 합니다.");

["망양보뢰", "계명구도", "완벽귀조", "배중사영"].forEach((word) => {
    assert.ok(!data.some((item) => item.word === word), `${word}은 핵심 학습 목록에서 제외되어야 합니다.`);
});

const normalized = core.normalizeProgress({
    josammosa: { status: "known", updatedAt: "today" },
    gwayubulgeup: { status: "review" },
    invalid: { status: "known" },
    saeongjima: { status: "wrong" }
}, data.map((item) => item.id));

assert.deepStrictEqual(Object.keys(normalized).sort(), ["gwayubulgeup", "josammosa"]);
const summary = core.summarize(data, normalized);
assert.strictEqual(summary.known, 1);
assert.strictEqual(summary.review, 1);
assert.strictEqual(summary.unseen, data.length - 2);

const quiz = core.buildQuiz(data, 10, "meaning", () => 0.42);
assert.strictEqual(quiz.length, 10);
quiz.forEach((question) => {
    assert.strictEqual(question.options.length, 4);
    assert.strictEqual(new Set(question.options.map((option) => option.id)).size, 4);
    assert.ok(question.options.some((option) => option.id === question.answerId));
});

const baekmi = data.find((item) => item.id === "baekmi");
const gungyeilhak = data.find((item) => item.id === "gungyeilhak");
assert.ok(
    !core.selectDistractors(baekmi, data, "image", () => 0.42).some((item) => item.id === "gungyeilhak"),
    "백미 삽화 문제에서 뜻이 같은 군계일학을 오답으로 제시하면 안 됩니다."
);
assert.ok(
    !core.selectDistractors(gungyeilhak, data, "image", () => 0.42).some((item) => item.id === "baekmi"),
    "군계일학 삽화 문제에서 뜻이 같은 백미를 오답으로 제시하면 안 됩니다."
);

console.log(`idioms core unit tests: ok (${data.length} entries)`);
