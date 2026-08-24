"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "learning/games/sphinx/sphinx.html"), "utf8");
const fontPath = path.join(root, "learning/games/sphinx/assets/fonts/kopub-world/KoPubWorld-Batang-Medium.woff2");
const licensePath = path.join(root, "learning/games/sphinx/assets/fonts/kopub-world/LICENSE.md");

assert.equal(fs.existsSync(fontPath), true, "Sphinx must bundle the KoPubWorld Batang font for consistent student devices.");
assert.equal(fs.existsSync(licensePath), true, "The bundled KoPubWorld font must keep its license.");
assert.match(
  html,
  /@font-face\s*\{[\s\S]*font-family: "Sphinx KoPubWorld Batang";[\s\S]*KoPubWorld-Batang-Medium\.woff2/,
  "Sphinx must register the local exam-style Korean font.",
);
assert.match(
  html,
  /\.question-text\s*\{[\s\S]*font-family: "Sphinx KoPubWorld Batang"[\s\S]*font-weight: 700;[\s\S]*font-synthesis: weight;/,
  "Question text must use the exam-style font with a visibly bold weight.",
);

console.log("Sphinx typography contract passed.");
