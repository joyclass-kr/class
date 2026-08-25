"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const base = path.join(root, "learning", "arts", "music-theory", "harmony");
const html = fs.readFileSync(path.join(base, "index.html"), "utf8");
const css = fs.readFileSync(path.join(base, "course-v2.css"), "utf8");
const js = fs.readFileSync(path.join(base, "course-v2.js"), "utf8");

assert.match(html, /id="dashboard"/);
assert.match(html, /id="study"[^>]*hidden/);
assert.match(html, /course-v2\.css/);
assert.match(html, /course-v2\.js/);

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

assert.match(css, /\.staff-lines/);
assert.match(css, /\.keyboard-visual/);
assert.match(css, /\.step-strip/);
assert.match(css, /\.interval-family/);
assert.match(css, /\.comparison-table/);
assert.match(css, /@media \(max-width: 900px\)/);
assert.match(css, /min-height: 44px/);

console.log("harmony course v2 contract: ok");
