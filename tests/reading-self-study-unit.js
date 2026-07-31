"use strict";

const assert = require("assert");
const {
  contentOverlapScore,
  createSelfStudyItems
} = require("../game-hub-server/data/reading-self-study-v2");

const items = createSelfStudyItems();
assert.equal(items.length, 512);
assert.equal(new Set(items.map((item) => item.id)).size, items.length);

for (const track of ["ko", "en"]) {
  for (let level = 1; level <= 8; level += 1) {
    const set = items.filter((item) => item.track === track && item.targetLevel === level);
    assert.equal(set.length, 32, `${track}${level} should have 32 generated items`);
    assert(new Set(set.map((item) => item.questionType)).size >= 2,
      `${track}${level} should not use a single question type`);
  }
}

for (const item of items) {
  const expectedChoices = item.targetLevel <= 2 ? 3 : item.targetLevel <= 4 ? 4 : 5;
  assert.equal(item.choices.length, expectedChoices);
  assert(Number.isInteger(item.correctIndex));
  assert(item.correctIndex >= 0 && item.correctIndex < item.choices.length);
  assert(!item.passageText.includes(item.choices[item.correctIndex]), `${item.id} repeats its answer verbatim`);
  assert(item.explanation.length > 0);
  item.choices.forEach((choice, index) => {
    if (index === item.correctIndex) return;
    const obviousKoreanCue = /(없다|않다|아니다|관계없|필요하지|오직|항상|반드시|만으로|만을)/u;
    const obviousEnglishCue = /\b(no|not|never|only|always|cannot|without|regardless|unnecessary|exactly)\b/i;
    assert(
      !(item.track === "ko" ? obviousKoreanCue : obviousEnglishCue).test(choice),
      `${item.id} has an obvious false-answer cue: ${choice}`
    );
    assert(
      contentOverlapScore(choice, item.passageText, item.track) >= 1,
      `${item.id} has an off-passage distractor: ${choice}`
    );
  });
}

const ecosystemRegression = items.find((item) => item.id === "SCI-ECOSYSTEM-K1-V2");
assert.match(ecosystemRegression.passageText, /분해자/);
assert.match(ecosystemRegression.choices[ecosystemRegression.correctIndex], /분해자/);
assert.doesNotMatch(
  ecosystemRegression.choices.join(" "),
  /영향이 없다|조건이 되지 않는다|양이 커진다/,
  "The ecosystem item must require passage reading instead of obvious false statements."
);

const seed = require("../game-hub-server/data/reading-bank-seed-v1.json");
const reviewedItems = seed.topics.flatMap((topic) => topic.items);
const completeBank = items.concat(reviewedItems);
assert.equal(completeBank.length, 544);
for (const track of ["ko", "en"]) {
  for (let level = 1; level <= 8; level += 1) {
    assert.equal(
      completeBank.filter((item) => item.track === track && item.targetLevel === level).length,
      34,
      `${track}${level} should expose at least 30 operational items`
    );
  }
}

console.log("Reading self-study unit: OK");
