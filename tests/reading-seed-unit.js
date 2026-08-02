"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const readingBank = require("../game-hub-server/reading-bank");

const seed = readingBank.loadSampleSeed();
assert.equal(seed.schemaVersion, 1);
assert.equal(seed.topics.length, 2);

const items = seed.topics.flatMap((topic) => topic.items.map((item) => ({ topic, item })));
assert.equal(items.length, 32);
assert.equal(new Set(items.map(({ item }) => item.itemKey)).size, 32);

for (const topic of seed.topics) {
  assert.equal(topic.items.length, 16);
  assert.ok(topic.sources.length >= 2);
  assert.equal(new Set(topic.items.map((item) => `${item.track}-${item.targetLevel}`)).size, 16);
}

for (const { item } of items) {
  const checked = readingBank.runAutoChecks(item);
  assert.equal(checked.passed, true, `${item.itemKey}: ${checked.errors.map((error) => error.message).join(", ")}`);
  assert.equal(item.choices.length, readingBank.expectedChoiceCount(item.targetLevel));
  assert.equal(item.distractorReasons.length, item.choices.length);
  assert.ok(item.correctIndex >= 0 && item.correctIndex < item.choices.length);
  const normalizeForCopyCheck = (value) => String(value)
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  const normalizedAnswer = normalizeForCopyCheck(item.choices[item.correctIndex]);
  const normalizedPassage = normalizeForCopyCheck(item.passageText);
  assert.equal(
    normalizedPassage.includes(normalizedAnswer),
    false,
    `${item.itemKey}: the correct choice must not be copied verbatim from the passage`
  );

  const obviousCuePattern =
    /(없다|않다|아니다|관계없다|항상|반드시|오직|전혀|모두|완전히|무조건|절대로|만으로|만을|만이|\bnot\b|\bno\b|\bnever\b|\bonly\b|\balways\b|\bcannot\b|\bwithout\b|\bregardless\b|\bevery\b|\ball\b|\bentirely\b|\bcompletely\b|\bimpossible\b|\buseless\b|\bguarantee\b|\bmust\b)/i;
  item.choices.forEach((choice, index) => {
    if (index !== item.correctIndex) {
      assert.doesNotMatch(choice, obviousCuePattern, `${item.itemKey}: distractor exposes an obvious cue`);
    }
  });
}

assert.equal(path.basename(seed.sourceDocuments[0]), "수면과_기억_수직샘플_v0.1.md");
assert.equal(path.basename(seed.sourceDocuments[1]), "평균의_함정_수직샘플_v0.1.md");

console.log("Reading seed unit: OK");
