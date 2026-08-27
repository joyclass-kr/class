import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const dataSource = fs.readFileSync(path.join(harmony, "harmony-curriculum.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
const curriculum = context.window.HarmonyCurriculum;

const midiGroups = [];
const collectGroups = (groups, where) => {
  if (!groups) return;
  assert.ok(Array.isArray(groups), where + " audio must be an array");
  const normalized = Array.isArray(groups[0]) ? groups : [groups];
  for (const group of normalized) {
    assert.ok(Array.isArray(group) && group.length > 0, where + " contains an empty audio event");
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
      collectGroups(option.groups, id + " section audio");
    }
  }

  for (const [questionIndex, question] of skill.evidence.entries()) {
    assert.ok(question.choices.includes(question.answer), id + " question " + questionIndex + " answer is absent from choices");
    assert.equal(question.choices.filter((choice) => choice === question.answer).length, 1, id + " question " + questionIndex + " answer is duplicated");
    assert.equal(new Set(question.choices).size, question.choices.length, id + " question " + questionIndex + " has duplicate choices");
    assert.ok(question.explain && question.explain.length >= 12, id + " question " + questionIndex + " needs useful feedback");
    collectGroups(question.audioGroups, id + " question audio");
  }

  const lab = skill.lab;
  if (lab.type === "keyboard") {
    assert.ok((lab.targetMidis || lab.targetPcs || []).length >= 2, id + " keyboard activity needs a real target");
    collectGroups(lab.reference, id + " keyboard reference");
  } else if (lab.type === "aural") {
    collectGroups(lab.groups, id + " aural activity");
    assert.ok(lab.choices.includes(lab.answer), id + " aural answer is absent");
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
