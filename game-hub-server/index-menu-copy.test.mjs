import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(
  html,
  /href="learning\/academics\/periodic-table\/"[\s\S]*?<strong>주기율표<\/strong><small>\(Periodic Table\)<\/small>/,
  "The periodic-table menu must use the concise Korean title and English translation.",
);
assert.doesNotMatch(
  html,
  /<strong>단주기 주기율표<\/strong>|<small>\(시험 필수 원소 1~20\)<\/small>/,
  "The portal menu must not show implementation details in place of an English subtitle.",
);
assert.match(
  html,
  /href="learning\/academics\/body-explorer\/"[\s\S]*?<strong>인체<\/strong><small>\(Human Body\)<\/small>/,
  "The body-learning menu must use a concise subject name, not an exploration metaphor.",
);
assert.doesNotMatch(
  html,
  /<strong>인체 탐험<\/strong><small>\(Human Body Explorer\)<\/small>/,
  "The portal menu must not present the human body as an explorer destination.",
);

console.log("Index menu copy contract passed.");
