import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const dataSource = fs.readFileSync(path.join(harmony, "harmony-curriculum.js"), "utf8");
const traditionalSource = fs.readFileSync(path.join(harmony, "harmony-traditional-extension.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
vm.runInContext(traditionalSource, context);
const curriculum = context.window.HarmonyCurriculum;

const META_QUESTION_PATTERN = /가장 먼저|첫 단계|연주 전략|편곡을 판단|수정 방식|완성.*증거|효과적인 수정|최종 선택 근거/;
const NON_MUSICAL_CHOICE_PATTERN = /음표 색|악기 가격|코드 글자 수|제목의 글꼴|마디 번호 색|연주자 이름|악기 교체|음량이|음량 증가|페달만|페달을 더|악기 음색|손 크기|곡 삭제|모든 코드 삭제|멜로디 생략|알파벳 순서|건반의 흰색|템포가 느림|멜로디가 삭제|배운 기술|차시 수|다시 듣지|모든 음 암기|코드가 하나뿐|멜로디가 없음/;
const META_QUESTION_KINDS = new Set(["연주 전략", "분석 순서", "편곡 판단", "수정 방법", "완성 증거"]);
const AMBIGUOUS_PROMPT_PATTERN = /가장|알맞은|적절한|자연스러운|좋은|효과적인|일반적인|보통|주로|대표적인/;

const midiGroups = [];
const collectGroups = (groups, where, allowRests = false) => {
  if (!groups) return;
  assert.ok(Array.isArray(groups), where + " audio must be an array");
  const normalized = Array.isArray(groups[0]) ? groups : [groups];
  for (const group of normalized) {
    assert.ok(Array.isArray(group), where + " contains an invalid audio event");
    if (group.length === 0) {
      assert.ok(allowRests, where + " contains an undeclared empty audio event");
      continue;
    }
    for (const midi of group) {
      assert.ok(Number.isInteger(midi) && midi >= 36 && midi <= 84, where + " has an out-of-range MIDI note " + midi);
      midiGroups.push(midi);
    }
  }
};

for (const [id, skill] of Object.entries(curriculum.skills)) {
  for (const [sectionIndex, section] of skill.sections.entries()) {
    for (const option of section.audioOptions) {
      assert.ok(option.label, id + " section " + sectionIndex + " has an unlabeled audio button");
      collectGroups(option.groups, id + " section audio", option.allowRests === true);
    }
  }

  for (const [questionIndex, question] of skill.evidence.entries()) {
    assert.ok(question.choices.includes(question.answer), id + " question " + questionIndex + " answer is absent from choices");
    assert.equal(question.choices.filter((choice) => choice === question.answer).length, 1, id + " question " + questionIndex + " answer is duplicated");
    assert.equal(new Set(question.choices).size, question.choices.length, id + " question " + questionIndex + " has duplicate choices");
    assert.ok(question.explain && question.explain.length >= 12, id + " question " + questionIndex + " needs useful feedback");
    assert.doesNotMatch(question.prompt, META_QUESTION_PATTERN, id + " question " + questionIndex + " asks about learning procedure instead of music");
    assert.ok(!META_QUESTION_KINDS.has(question.kind), id + " question " + questionIndex + " uses a meta-learning question kind");
    assert.doesNotMatch(question.prompt, AMBIGUOUS_PROMPT_PATTERN, id + " question " + questionIndex + " needs a single rule-bound answer");
    for (const choice of question.choices) {
      assert.doesNotMatch(choice, NON_MUSICAL_CHOICE_PATTERN, id + " question " + questionIndex + " contains a non-musical distractor: " + choice);
    }
    collectGroups(question.audioGroups, id + " question audio");
  }

  const lab = skill.lab;
  if (lab.type === "keyboard") {
    assert.ok((lab.targetMidis || lab.targetPcs || []).length >= 2, id + " keyboard activity needs a real target");
    collectGroups(lab.reference, id + " keyboard reference");
  } else if (lab.type === "aural") {
    collectGroups(lab.groups, id + " aural activity");
    assert.ok(lab.choices.includes(lab.answer), id + " aural answer is absent");
  } else if (lab.type === "rhythm") {
    assert.ok(lab.beats > 0, id + " rhythm activity needs a target measure length");
    assert.ok(Array.isArray(lab.options) && lab.options.length >= 3, id + " rhythm activity needs several usable symbols");
    const optionIds = new Set(lab.options.map((option) => option.id));
    assert.equal(optionIds.size, lab.options.length, id + " rhythm activity has duplicate symbol ids");
    assert.ok(Array.isArray(lab.answer) && lab.answer.length >= 2, id + " rhythm activity needs one explicit ordered answer");
    for (const answerId of lab.answer) assert.ok(optionIds.has(answerId), id + " rhythm answer contains an unavailable symbol");
    const answerBeats = lab.answer.reduce((sum, answerId) => sum + lab.options.find((option) => option.id === answerId).beats, 0);
    assert.equal(answerBeats, lab.beats, id + " rhythm answer does not fill the target measure");
  } else {
    assert.ok(lab.slots >= 3, id + " progression activity is too small to show a progression");
    assert.ok(lab.accepted.length >= 1, id + " progression activity needs an accepted result");
    for (const answer of lab.accepted) {
      assert.equal(answer.length, lab.slots, id + " accepted progression has the wrong length");
      for (const chord of answer) assert.ok(lab.options.includes(chord), id + " accepted progression contains an unavailable chord");
    }
    for (const [name, notes] of Object.entries(lab.audioMap)) {
      assert.ok(lab.options.includes(name), id + " audio map contains an unavailable chord");
      collectGroups(notes, id + " progression chord " + name);
    }
  }
}

assert.ok(midiGroups.length > 500, "the course should contain substantial playable audio material");

const pianoDir = path.join(harmony, "assets", "piano");
const samples = fs.readdirSync(pianoDir).filter((name) => name.endsWith(".ogg"));
assert.equal(samples.length, 9, "the piano sampler needs all nine anchor samples");
for (const sample of samples) {
  const file = path.join(pianoDir, sample);
  assert.ok(fs.statSync(file).size > 1000, sample + " is empty or truncated");
  assert.equal(fs.readFileSync(file).subarray(0, 4).toString("ascii"), "OggS", sample + " is not an Ogg file");
}

console.log("harmony content and audio audit: ok");
