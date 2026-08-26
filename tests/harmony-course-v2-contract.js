"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const base = path.join(root, "learning", "arts", "music-theory", "harmony");
const html = fs.readFileSync(path.join(base, "index.html"), "utf8");
const css = fs.readFileSync(path.join(base, "course-v2.css"), "utf8");
const js = fs.readFileSync(path.join(base, "course-v2.js"), "utf8");
const guides = fs.readFileSync(path.join(base, "course-guides.js"), "utf8");

assert.match(html, /id="dashboard"/);
assert.match(html, /id="study"[^>]*hidden/);
assert.match(html, /course-v2\.css/);
assert.match(html, /course-guides\.js/);
assert.match(html, /course-v2\.js/);
assert.match(html, /course-list-button/);
assert.match(html, /차시 목록/);
assert.doesNotMatch(html, /← 전체 과정/);
assert.ok(html.indexOf("course-guides.js") < html.indexOf("course-v2.js"), "guides must load before course rendering");

for (let id = 1; id <= 16; id += 1) {
  assert.match(js, new RegExp(`\\n  ${id}: \\{`), `lesson ${id} is missing`);
}

[
  "Staff", "Treble Clef", "Bass Clef", "Ledger Line",
  "Semitone / Half Step", "Whole Tone / Whole Step",
  "Sharp ♯", "Flat ♭", "Natural ♮", "Enharmonic Equivalent",
  "Interval Number", "Perfect Intervals", "Major & Minor Intervals",
  "Augmented & Diminished Intervals", "Interval Inversion"
].forEach(term => assert.ok(js.includes(term), `${term} is missing`));

assert.ok(!js.includes("도(C)"), "C must not be presented as fixed-do");
assert.ok(!js.includes("레(D)"), "D must not be presented as fixed-re");
assert.match(js, /FIXED_QUIZZES\.quality/);
assert.match(js, /state\.seen = new Set\(\)/);
assert.match(js, /roots = shuffled\(\[48,49,50,51,52,53,54,55,56,57,58,59\]\)/);
assert.match(js, /intervalCountStaffMarkup/);
assert.match(js, /staffGuideMarkup/);
assert.match(js, /staffStepMarkup/);
assert.match(js, /제1선","제2선","제3선","제4선","제5선/);
assert.match(js, /제1칸","제2칸","제3칸","제4칸/);
assert.doesNotMatch(js, /한 칸씩 움직이면 음이름도/);
assert.match(js, /notationMapMarkup/);
assert.match(js, /perfectExamplesMarkup/);
assert.match(js, /audioLabels: \["완전1도",\s*"완전4도",\s*"완전5도",\s*"완전8도"\]/);
assert.match(js, /data-audio-group/);
assert.doesNotMatch(js, /악보 학습에서 함께 연결할 세 감각/);
assert.match(js, /quality-aug4/);
assert.match(js, /quality-dim5/);
assert.match(js, /perfect-semitones/);
for (let id = 1; id <= 16; id += 1) {
  assert.match(guides, new RegExp(`\\n  ${id}: \\{`), `lesson guide ${id} is missing`);
}
assert.match(guides, /기준선, 기본 음이름, 변화표, 건반 위치/);
assert.match(guides, /C\(1\)–D\(2\)–E\(3\)/);
assert.match(js, /octavus/);
assert.match(js, /octaveOriginMarkup/);
assert.match(js, /registerBoundaryMarkup/);
assert.match(guides, /라틴어 octo.*octavus/);
assert.match(guides, /HARMONY_DEEP_DIVES/);
assert.match(js, /왜 이렇게 배우나요\?/);
assert.match(js, /악보와 건반에 적용해 보기/);
assert.match(css, /\.octave-origin/);
assert.match(css, /\.worked-card-grid/);

assert.match(css, /\.staff-lines/);
assert.match(css, /\.keyboard-visual/);
assert.match(css, /\.step-strip/);
assert.match(css, /\.interval-family/);
assert.match(css, /\.comparison-table/);
assert.match(css, /\.notation-map/);
assert.match(css, /\.perfect-score-grid/);
assert.match(css, /\.lesson-guide/);
assert.match(css, /\.example-controls/);
assert.match(css, /\.course-list-button/);
assert.match(css, /\.staff-position-guide/);
assert.match(css, /\.staff-note-label[^}]*font-size: 13px/s);
assert.match(css, /\.section-copy p[^}]*font-size: 17px/s);
assert.match(css, /@media \(max-width: 900px\)/);
assert.match(css, /min-height: 44px/);

assert.doesNotMatch(js, /정답은/, "오답 직후 정답을 공개하면 안 됩니다.");
assert.match(js, /다른 답을 다시 생각해 보세요/);
assert.doesNotMatch(js, /제2선 G4|제4선 F3|가운데 C\\(Middle C, C4\\)/);

console.log("harmony course v2 contract: ok");
