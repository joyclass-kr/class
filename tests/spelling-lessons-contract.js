"use strict";

// 맞춤법 차시 배정표 검사: 모든 문제가 정확히 한 차시에만 들어가고, 화면에 차시 학습 요소가 연결되어 있는지 확인한다.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const spellingDir = path.join(__dirname, "..", "learning", "literacy-numeracy", "spelling");
const read = (name) => fs.readFileSync(path.join(spellingDir, name), "utf8");

const context = { window: {} };
vm.createContext(context);
for (const name of ["questions.js", "questions-extra.js", "lessons.js"]) {
    vm.runInContext(read(name), context, { filename: name });
}

const questions = context.window.SPELLING_QUESTIONS;
const lessons = context.window.SPELLING_LESSONS;
assert.ok(Array.isArray(questions) && questions.length > 0, "문제 은행이 비어 있습니다.");
assert.ok(Array.isArray(lessons) && lessons.length > 0, "차시 배정표가 비어 있습니다.");

const knownIds = new Set(questions.map((question) => question.id));
const assigned = new Map();
const lessonIds = new Set();

for (const lesson of lessons) {
    assert.ok(lesson.id && /^[a-z0-9-]+$/.test(lesson.id), `차시 id가 올바르지 않습니다: ${lesson.id}`);
    assert.ok(!lessonIds.has(lesson.id), `차시 id가 겹칩니다: ${lesson.id}`);
    lessonIds.add(lesson.id);
    assert.ok(typeof lesson.title === "string" && lesson.title.trim(), `${lesson.id}: 차시 이름이 없습니다.`);
    assert.ok(typeof lesson.note === "string" && lesson.note.trim(), `${lesson.id}: 차시 설명이 없습니다.`);
    assert.ok(Array.isArray(lesson.ids) && lesson.ids.length >= 5 && lesson.ids.length <= 15,
        `${lesson.id}: 한 차시는 5~15문제여야 합니다 (지금 ${lesson.ids?.length}).`);
    for (const id of lesson.ids) {
        assert.ok(knownIds.has(id), `${lesson.id}: 없는 문제를 가리킵니다: ${id}`);
        assert.ok(!assigned.has(id), `문제가 두 차시에 들어 있습니다: ${id} (${assigned.get(id)}, ${lesson.id})`);
        assigned.set(id, lesson.id);
    }
}

const missing = [...knownIds].filter((id) => !assigned.has(id));
assert.deepStrictEqual(missing, [], `차시에 들어가지 않은 문제가 있습니다: ${missing.join(", ")}`);

const html = read("index.html");
for (const requiredId of [
    "lessonScreen", "lessonList", "questionTotal", "finalTotal",
    "nextLessonButton", "lessonListButton"
]) {
    assert.ok(html.includes(`id="${requiredId}"`), `차시 학습 화면 요소가 없습니다: #${requiredId}`);
}
assert.ok(html.includes('src="lessons.js"'), "lessons.js가 연결되어 있지 않습니다.");
assert.ok(!html.includes('id="studyScreen"'), "답을 미리 보여 주는 익히기 화면은 없어야 합니다. 차시를 누르면 바로 문제를 푼다.");
assert.ok(!/\b230문제/.test(html), "문제 수는 data-question-count로 자동 표시해야 합니다.");

const appSource = read("app.js");
assert.ok(appSource.includes("SPELLING_LESSONS"), "app.js가 차시 배정표를 읽지 않습니다.");
assert.ok(appSource.includes("LESSON_PROGRESS_KEY"), "차시 완료 기록을 저장해야 합니다.");
assert.ok(!/SESSION_SIZE - 1/.test(appSource), "문제 수는 차시마다 다르므로 SESSION_SIZE로 마지막 문제를 판단하면 안 됩니다.");

console.log(`spelling-lessons-contract: ${lessons.length}차시, ${questions.length}문제 모두 배정됨.`);
