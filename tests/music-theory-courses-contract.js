const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const root = path.join(__dirname, "..", "learning", "arts", "music-theory");
const harmonyHtml = fs.readFileSync(path.join(root, "harmony", "index.html"), "utf8");
const harmonyApp = fs.readFileSync(path.join(root, "harmony", "harmony-course.js"), "utf8");
const harmonyData = fs.readFileSync(path.join(root, "harmony", "harmony-curriculum.js"), "utf8");
const harmonyAudio = fs.readFileSync(path.join(root, "harmony", "piano-engine.js"), "utf8");
const harmonyCss = ["course-v2.css", "harmony-foundation.css", "harmony-course.css"].map((name) => fs.readFileSync(path.join(root, "harmony", name), "utf8")).join("\n");
const harmonyContext = { window: {} };
vm.createContext(harmonyContext);
vm.runInContext(harmonyData, harmonyContext);
const harmonyIds = harmonyContext.window.HarmonyCurriculum.strands.flatMap((strand) => Array.from(strand.skills));
const rhythmHtml = fs.readFileSync(path.join(root, "rhythm", "index.html"), "utf8");
const rhythmApp = fs.readFileSync(path.join(root, "rhythm", "app.js"), "utf8");
const rhythmCss = fs.readFileSync(path.join(root, "rhythm", "styles.css"), "utf8");

assert.match(harmonyHtml, /<title>화성학<\/title>/);
assert.match(harmonyHtml, /id="dashboard"/);
assert.match(harmonyHtml, /id="study"[^>]*hidden/);
assert.match(harmonyHtml, /id="piano"/);
assert.match(harmonyHtml, /piano-engine\.js/);
assert.equal(harmonyIds.length, 27, "화성학 학습 항목이 누락되면 안 됩니다.");
for (const id of ["INTERVAL_SPELLING", "MINOR_HARMONY", "PART_WRITING", "NON_CHORD_TONES", "MODULATION"]) assert.ok(harmonyIds.includes(id));
assert.match(harmonyApp, /musicTheoryHarmonyProgressV2/);
assert.match(harmonyAudio, /assets\/piano\//);
assert.equal(fs.readdirSync(path.join(root, "harmony", "assets", "piano")).filter((name) => name.endsWith(".ogg")).length, 9);

assert.match(rhythmHtml, /<title>리듬<\/title>/);
assert.match(rhythmHtml, /id="stageList"/);
assert.match(rhythmHtml, /id="courseOverview"[\s\S]*id="stageList"/, "리듬 첫 화면에는 목차가 있어야 합니다.");
assert.match(rhythmHtml, /id="lessonView"[^>]*hidden/, "리듬 학습 본문은 첫 진입 때 숨겨져야 합니다.");
assert.equal((rhythmApp.match(/\{ id: \d+, title:/g) || []).length, 9, "리듬은 9단계여야 합니다.");
assert.match(rhythmApp, /musicTheoryRhythmProgressV1/);
assert.match(rhythmApp, /createRhythmAudio/);
assert.match(rhythmApp, /showCourseOverview\(\);[\s\S]*if \(requestedStage\) selectStage/, "리듬은 목차를 먼저 연 뒤 명시된 단계만 열어야 합니다.");
assert.doesNotMatch(rhythmHtml + rhythmApp, /piano|\.ogg/i, "리듬은 피아노 음원에 의존하면 안 됩니다.");

assert.match(harmonyCss, /min-height:\s*44px/);
assert.match(rhythmCss, /min-height:\s*44px/);
assert.match(harmonyCss, /@media \(max-width: 900px\)/);
assert.match(rhythmCss, /@media \(max-width: 900px\)/);

const hub = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
assert.match(hub, /data-access-group="music-theory"/);
assert.match(hub, /<strong>음악 이론<\/strong>/);
assert.match(hub, /music-theory\/harmony\//);
assert.match(hub, /music-theory\/rhythm\//);
assert.doesNotMatch(hub, /<strong>화성학·리듬<\/strong>/);
console.log("music theory course contracts passed");
