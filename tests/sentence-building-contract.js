const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..", "learning", "literacy-numeracy", "sentence-building");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const curriculumSource = fs.readFileSync(path.join(root, "curriculum.js"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const hub = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

assert.match(html, /id="courseScreen"/);
assert.match(html, /id="lessonList"/);
assert.match(html, /id="lessonScreen"[^>]*hidden/);
assert.match(html, /id="resultScreen"[^>]*hidden/);
assert.doesNotMatch(html, /topbar|course-hero|hero-case|totalStars|earnedStars/);
assert.doesNotMatch(html, /backToListButton|resultListButton|>← 차시 목록<|>차시 목록<\/button>/);
assert.match(html, /curriculum\.js/);
assert.match(html, /app\.js/);
assert.match(css, /grid-template-columns:\s*repeat\(3/);
assert.match(css, /@media \(max-width: 480px\)/);
assert.match(app, /localStorage/);
assert.match(app, /sentenceCount/);
assert.doesNotMatch(html, /taskType|unitName|lessonGoal|celebration/);
assert.doesNotMatch(app, /AudioContext|confetti|celebrate/);
assert.match(app, /sitebackrequest/);

const context = { window: {} };
vm.createContext(context);
vm.runInContext(curriculumSource, context);
const course = context.window.SENTENCE_COURSE;
assert.ok(course);
assert.equal(course.units.length, 5);
assert.equal(course.lessons.length, 24);
assert.equal(new Set(course.lessons.map((lesson) => lesson.id)).size, 24);

const unitIds = new Set(course.units.map((unit) => unit.id));
for (const [lessonIndex, lesson] of course.lessons.entries()) {
    assert.ok(unitIds.has(lesson.unit), `lesson ${lessonIndex + 1}: unknown unit`);
    assert.equal(lesson.tasks.length, 3, `lesson ${lessonIndex + 1}: expected 3 tasks`);
    assert.ok(lesson.title && lesson.goal);
    for (const [taskIndex, task] of lesson.tasks.entries()) {
        const where = `lesson ${lessonIndex + 1}, task ${taskIndex + 1}`;
        assert.ok(["choice", "order", "write"].includes(task.type), `${where}: invalid type`);
        assert.ok(task.prompt && task.hint && task.explain, `${where}: missing copy`);
        if (task.type === "choice") {
            assert.ok(task.options.length >= 3, `${where}: too few choices`);
            assert.ok(Number.isInteger(task.answer) && task.answer >= 0 && task.answer < task.options.length, `${where}: invalid answer`);
        }
        if (task.type === "order") {
            assert.equal(task.tokens.length, task.answer.length, `${where}: token count mismatch`);
            assert.deepEqual([...task.tokens].sort(), [...task.answer].sort(), `${where}: answer tokens mismatch`);
        }
        if (task.type === "write") assert.ok(task.minSentences >= 3, `${where}: writing target too low`);
    }
}

const visibleCopy = `${html}\n${curriculumSource}\n${app}`;
for (const banned of ["탐정", "사건", "열쇠", "구조대", "공방", "응급실", "보고서", "연결 다리", "단서", "미션"]) {
    assert.ok(!visibleCopy.includes(banned), `unwanted themed copy remains: ${banned}`);
}

assert.match(hub, /data-access-group="grammar"/);
assert.match(hub, /<strong>문법<\/strong><small>\(Grammar\)<\/small>/);
assert.match(hub, /learning\/literacy-numeracy\/spelling\//);
assert.match(hub, /learning\/literacy-numeracy\/sentence-building\//);
assert.equal((hub.match(/href="learning\/literacy-numeracy\/sentence-building\/"/g) || []).length, 1);

console.log("sentence-building-contract: ok");
