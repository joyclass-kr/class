"use strict";

const assert = require("assert");
const {
  LEVEL_PROFILES,
  contentOverlapScore,
  createSelfStudyItems
} = require("../game-hub-server/data/reading-self-study-v2");

const items = createSelfStudyItems();
assert.equal(items.length, 896);
assert.equal(new Set(items.map((item) => item.id)).size, items.length);

for (const track of ["ko", "en"]) {
  for (let level = 1; level <= 8; level += 1) {
    const set = items.filter((item) => item.track === track && item.targetLevel === level);
    const profile = LEVEL_PROFILES[level];
    const normalize = (value) => String(value).normalize("NFC").trim().toLowerCase().replace(/\s+/g, " ");
    assert.equal(set.length, 56, `${track}${level} should have 56 generated items`);
    assert(new Set(set.map((item) => item.questionType)).size >= 2,
      `${track}${level} should not use a single question type`);
    assert(set.every((item) => item.schoolBand === profile.schoolBand));
    assert(set.every((item) => item.skillFocus === profile.focus));
    assert.equal(new Set(set.map((item) => item.familyId)).size, 14,
      `${track}${level} should draw from 14 topic families`);
    assert.equal(
      set.filter((item) => item.id.startsWith(track === "ko" ? "KO-" : "EN-")).length,
      24,
      `${track}${level} should include 24 language-native items`
    );
    assert.equal(new Set(set.map((item) => normalize(item.passageText))).size, set.length,
      `${track}${level} should not repeat a passage`);
    assert.equal(
      new Set(set.map((item) => item.choices.map(normalize).sort().join("|"))).size,
      set.length,
      `${track}${level} should not repeat a choice set`
    );
    const answerPositions = Array.from({ length: profile.choiceCount }, (_, index) =>
      set.filter((item) => item.correctIndex === index).length
    );
    assert(Math.max(...answerPositions) - Math.min(...answerPositions) <= 3,
      `${track}${level} should keep answer positions balanced`);
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
assert.equal(completeBank.length, 928);

const cueStopWords = new Set((
  "a an the this that these those it its he his she her they them their we our you your i me my "
  + "is are was were be been being do does did have has had can could may might will would shall "
  + "should to of in on at by for from with as and or but if when while after before during into "
  + "than then so what which who why how each one ones some any more most less very not no"
).split(" "));

function visualCueUnits(value, track) {
  if (track === "en") {
    return [...new Set((String(value).toLowerCase().match(/[a-z]+(?:['’][a-z]+)?/g) || [])
      .filter((word) => word.length >= 3 && !cueStopWords.has(word)))];
  }
  const source = String(value).replace(/[^가-힣]/g, "");
  return [...new Set(Array.from({ length: Math.max(0, source.length - 1) }, (_, index) =>
    source.slice(index, index + 2)
  ))];
}

function visualCueOverlap(choice, passage, track) {
  const choiceUnits = visualCueUnits(choice, track);
  const passageUnits = new Set(visualCueUnits(passage, track));
  if (!choiceUnits.length) return 0;
  return choiceUnits.filter((unit) => passageUnits.has(unit)).length / choiceUnits.length;
}

const visualCueRisks = [];
for (const item of completeBank) {
  const answer = String(item.choices[item.correctIndex]).toLowerCase()
    .replace(/[^a-z가-힣0-9]+/g, " ").trim();
  const passage = String(item.passageText).toLowerCase()
    .replace(/[^a-z가-힣0-9]+/g, " ").trim();
  assert(!answer || !passage.includes(answer),
    `${item.id || item.itemKey}: answer is visibly copied from the passage`);

  const overlaps = item.choices.map((choice) => visualCueOverlap(choice, item.passageText, item.track));
  const correctOverlap = overlaps[item.correctIndex];
  const strongestDistractor = Math.max(0, ...overlaps.filter((_, index) => index !== item.correctIndex));
  if (correctOverlap >= 0.4 && correctOverlap - strongestDistractor >= 0.2) {
    visualCueRisks.push(`${item.id || item.itemKey} (${overlaps.map((score) => score.toFixed(2)).join(",")})`);
  }
}
assert.deepEqual(visualCueRisks, [],
  `answers can be found by visual word matching:\n${visualCueRisks.join("\n")}`);

for (const track of ["ko", "en"]) {
  for (let level = 1; level <= 8; level += 1) {
    assert.equal(
      completeBank.filter((item) => item.track === track && item.targetLevel === level).length,
      58,
      `${track}${level} should expose 58 operational items`
    );
  }
}

assert(items.filter((item) => item.id.startsWith("KO-")).every((item) => item.track === "ko"));
assert(items.filter((item) => item.id.startsWith("EN-")).every((item) => item.track === "en"));

console.log("Reading self-study unit: OK");
