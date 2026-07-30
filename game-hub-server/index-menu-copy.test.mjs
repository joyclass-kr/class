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
  /href="learning\/academics\/body-explorer\/"[\s\S]*?<strong>인체의 구조와 기능<\/strong><small>\(Human Body Systems\)<\/small>/,
  "The body-learning menu must describe both anatomy and how body systems work.",
);
assert.doesNotMatch(
  html,
  /<strong>인체 탐험<\/strong><small>\(Human Body Explorer\)<\/small>|<strong>인체<\/strong><small>\(Human Body\)<\/small>/,
  "The portal menu must not use an exploration metaphor or an overly broad label.",
);

assert.match(
  html,
  /href="learning\/academics\/korean-museum\/"[\s\S]*?<strong>\uD55C\uAD6D\uC0AC \uC720\uBB3C\u00B7\uC720\uC801<\/strong><small>\(Korean Artifacts &amp; Sites\)<\/small>/,
  "The Korean-history museum menu must name the artifacts and sites it teaches.",
);
assert.doesNotMatch(
  html,
  /<strong>\uD55C\uAD6D\uC0AC \uBCF4\uBB3C\uC9C0\uB3C4<\/strong><small>\(Korean History Treasure Map\)<\/small>/,
  "The Korean-history museum menu must not use a treasure-map metaphor.",
);

console.log("Index menu copy contract passed.");
