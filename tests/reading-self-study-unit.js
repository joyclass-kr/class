"use strict";

const assert = require("assert");
const {
  LEVEL_PROFILES,
  contentOverlapScore,
  createSelfStudyItems
} = require("../game-hub-server/data/reading-self-study-v2");

const items = createSelfStudyItems();
assert.equal(items.length, 512);
assert.equal(new Set(items.map((item) => item.id)).size, items.length);

for (const track of ["ko", "en"]) {
  for (let level = 1; level <= 8; level += 1) {
    const set = items.filter((item) => item.track === track && item.targetLevel === level);
    const profile = LEVEL_PROFILES[level];
    assert.equal(set.length, 32, `${track}${level} should have 32 generated items`);
    assert(new Set(set.map((item) => item.questionType)).size >= 2,
      `${track}${level} should not use a single question type`);
    assert(set.every((item) => item.schoolBand === profile.schoolBand));
    assert(set.every((item) => item.skillFocus === profile.focus));
    set.forEach((item) => {
      const sentenceCount = item.passageText.split(/[.!?](?:\s+|$)/u).filter(Boolean).length;
      assert.equal(sentenceCount, profile.detailCount, `${item.id} should match its level detail count`);
    });
  }
}

for (const item of items) {
  const expectedChoices = LEVEL_PROFILES[item.targetLevel].choiceCount;
  assert.equal(item.choices.length, expectedChoices);
  assert(Number.isInteger(item.correctIndex));
  assert(item.correctIndex >= 0 && item.correctIndex < item.choices.length);
  assert(!item.passageText.includes(item.choices[item.correctIndex]), `${item.id} repeats its answer verbatim`);
  assert(item.explanation.length > 0);
  item.choices.forEach((choice, index) => {
    if (index === item.correctIndex) return;
    const obviousKoreanCue =
      /(없다|않다|아니다|관계없|필요하지|오직|항상|반드시|전혀|모두|완전히|무조건|절대로|만으로|만을|만이)/u;
    const obviousEnglishCue =
      /\b(no|not|never|only|always|cannot|without|regardless|unnecessary|exactly|every|all|entirely|completely|impossible|useless|guarantee|must)\b/i;
    assert(
      !(item.track === "ko" ? obviousKoreanCue : obviousEnglishCue).test(choice),
      `${item.id} has an obvious false-answer cue: ${choice}`
    );
    if (item.distractorMode !== "reference") {
      assert(
        contentOverlapScore(choice, item.passageText, item.track) >= 1,
        `${item.id} has an off-passage distractor: ${choice}`
      );
    }
  });
}

assert.deepEqual(
  Object.values(LEVEL_PROFILES).map((profile) => profile.schoolBand),
  ["초3~4", "초4~5", "초5~6", "중1", "중2", "중3", "고1", "고2~3"]
);

for (const track of ["ko", "en"]) {
  const highSchoolItems = items.filter((item) => item.track === track && item.targetLevel >= 7);
  highSchoolItems.forEach((item) => {
    if (track === "ko") {
      assert(item.passageText.length <= 320, `${item.id} is too long for short-form high-school practice`);
    } else {
      const words = item.passageText.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || [];
      assert(words.length <= 100, `${item.id} is too long for short-form high-school practice`);
    }
  });
}

assert(items.filter((item) => item.targetLevel === 7)
  .every((item) => ["evidence_application", "claim_evaluation"].includes(item.questionType)));
assert(items.filter((item) => item.targetLevel === 8)
  .every((item) => ["boundary_reasoning", "claim_evaluation"].includes(item.questionType)));

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
