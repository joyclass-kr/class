import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const idioms = require("../learning/basics/classical-chinese-idioms/idioms-data.js");
require("../learning/basics/classical-chinese-idioms/idioms-lessons-data.js");
const lessons = globalThis.IDIOM_LESSONS;

test("고사성어 112개가 의미 차시에 빠짐없이 한 번씩 배정된다", () => {
    const dataIds = idioms.map((idiom) => idiom.id).sort();
    const assignedIds = lessons.flatMap((lesson) => lesson.ids);

    assert.equal(new Set(assignedIds).size, assignedIds.length, "중복 배정된 고사성어가 없어야 한다");
    assert.deepEqual([...assignedIds].sort(), dataIds);
});

test("차시는 고정 분량용 기타 묶음 없이 실제 학습 주제로 구성된다", () => {
    assert.ok(lessons.length > 0);
    lessons.forEach((lesson) => {
        assert.ok(lesson.title.length >= 2);
        assert.ok(lesson.description.length >= 10);
        assert.ok(lesson.ids.length > 0);
        assert.doesNotMatch(lesson.title, /기타|나머지|그 밖/);
    });
});
