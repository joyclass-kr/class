import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const dataSource = fs.readFileSync(path.join(harmony, "harmony-curriculum.js"), "utf8");
const traditionalSource = fs.readFileSync(path.join(harmony, "harmony-traditional-extension.js"), "utf8");
const courseSource = fs.readFileSync(path.join(harmony, "harmony-course.js"), "utf8");

const dataContext = { window: {} };
vm.createContext(dataContext);
vm.runInContext(dataSource, dataContext);
vm.runInContext(traditionalSource, dataContext);

const renderContext = {
  window: { HarmonyCurriculum: dataContext.window.HarmonyCurriculum },
  document: { readyState: "loading", addEventListener() {} },
  localStorage: { getItem() { return null; }, setItem() {} },
  setTimeout() {},
  clearTimeout() {}
};
vm.createContext(renderContext);
vm.runInContext(courseSource, renderContext);

const notation = renderContext.window.HarmonyNotation;
assert.ok(notation, "notation renderer must expose a deterministic QA surface");
assert.equal(notation.noteParts("Eb4").midi, 63);
assert.equal(notation.noteParts("F#4").midi, 66);
assert.equal(notation.noteParts("C#4").midi, notation.noteParts("Db4").midi, "enharmonic spellings must sound at the same pitch");
assert.notEqual(notation.noteParts("C#4").step, notation.noteParts("Db4").step, "enharmonic spellings must occupy different staff positions");

const visualKeys = new Set([...(dataSource + traditionalSource).matchAll(/visual:"([^"]+)"/g)].map((match) => match[1]));
for (const key of visualKeys) {
  const score = notation.render(key);
  assert.match(score, /class="(?:score-svg|notation-diagram)/, key + " must render a score or notation diagram");
  assert.doesNotMatch(score, /NaN|undefined/, key + " contains an invalid coordinate or label");
  const preview = notation.preview(key);
  assert.match(preview, /class="skill-preview [^"]+"/, key + " needs a visual preview on the progress screen");
  assert.match(preview, /<svg viewBox="0 0 80 60">/, key + " progress preview must contain a legible relation diagram");
  assert.doesNotMatch(preview, /undefined/, key + " progress preview contains an invalid label");
  if (!score.includes('class="notation-diagram')) {
    assert.ok((score.match(/class="note-head"/g) || []).length >= 2, key + " must show actual notes");
  }
}

for (const key of ["pitch-alphabet","interval-spelling","interval-inversion","inversion-score","diatonic-map","function-flow","cadence-compare","guide-tone","secondary-dominant","borrowed-compare","tension-map"]) {
  assert.match(notation.render(key), /class="concept-diagram/, key + " needs a relationship diagram in addition to the staff example");
}
for (const key of ["voice-ranges","motion-directions","voice-crossing","parallel-errors","secondary-targets","secondary-resolution","secondary-domino","borrowed-family","flat-two-compare","tension-stack","tension-available","tension-avoid"]) {
  assert.match(notation.render(key), /class="concept-diagram/, key + " needs a textbook-style explanatory diagram");
}
const augmentedSixth = notation.render("augmented-sixth");
assert.match(augmentedSixth, /class="concept-diagram/, "augmented sixths need a visible outward-resolution diagram");
assert.match(augmentedSixth, />A♭</);
assert.match(augmentedSixth, />F♯</);
assert.doesNotMatch(augmentedSixth, /bass-clef/, "a compact three-note spelling example must not create an empty bass staff");
for (const key of ["interval-number","interval-direction","interval-form","interval-simple","interval-family","interval-quality-ladder","interval-compound","interval-consonance","interval-ear-process"]) {
  assert.match(notation.render(key), /class="concept-diagram/, key + " needs its own interval-learning diagram");
}
const intervalFamily = notation.render("interval-family");
for (const label of ["완전계열","1 · 4 · 5 · 8도","장·단계열","2 · 3 · 6 · 7도","감","완전","단","장","증"]) {
  assert.match(intervalFamily, new RegExp(label.replace(/[·]/g, "\\·")), "interval quality family chart must show " + label);
}

const chordScore = notation.render("symbol-anatomy");
assert.match(chordScore, /viewBox="0 0 520 132"/, "single-staff chord examples need a compact canvas");
assert.ok(chordScore.includes('transform="translate(0 -12)"'), "single-staff content must be vertically centered");
assert.equal((chordScore.match(/class="note-head"/g) || []).length, 14, "C, Cm, C7, and Cmaj7 need every chord tone");
assert.match(chordScore, /y1="114"/, "E4 must sit on the bottom treble-staff line");
assert.match(chordScore, /class="ledger"[^>]*y1="124"/, "middle C needs its ledger line");

const contrastScore = notation.render("symbol-contrast");
const centers = [...contrastScore.matchAll(/class="note-head" cx="([\d.]+)" cy="([\d.]+)"/g)].map((match) => ({ x:Number(match[1]), y:Number(match[2]) }));
assert.notEqual(centers[1].x, centers[2].x, "adjacent F4-G4 noteheads must not overlap");
assert.notEqual(centers[3].x, centers[4].x, "adjacent C4-D4 noteheads must not overlap");

const clefScore = notation.render("staff-clefs");
assert.match(clefScore, /viewBox="0 0 520 116"/, "labeled clef examples need room for note names");
assert.ok(clefScore.includes('transform="translate(0 -29)"'), "labeled clef content must remain vertically centered");
assert.match(clefScore, /𝄞/, "the grand-staff lesson needs a treble clef");
assert.match(clefScore, /𝄢/, "the grand-staff lesson needs a bass clef");
assert.equal((clefScore.match(/class="note-head"/g) || []).length, 10);
assert.match(clefScore, /bass-clef" x="28" y="103"/, "the bass-clef dots must straddle the F3 line");
assert.match(clefScore, /cy="99"/, "bass-clef C3 must sit in the second space from the top");
assert.match(clefScore, /cy="124"/, "treble-clef middle C must sit on its ledger line");
for (const label of ["C3", "F3", "G3", "C4", "F4", "G4"]) assert.match(clefScore, new RegExp(">" + label + "<"));

const staffBasics = notation.render("staff-basics");
assert.equal((staffBasics.match(/class="note-head"/g) || []).length, 9, "five lines and four spaces need nine labeled positions");
for (const label of ["1줄 E", "1칸 F", "5줄 F"]) assert.match(staffBasics, new RegExp(">" + label + "<"));

const noteValues = notation.render("note-values");
assert.equal((noteValues.match(/class="note-value-card"/g) || []).length, 4, "four core note and rest values need separate cards");
const meters = notation.render("meter-basics");
assert.equal((meters.match(/class="meter-card"/g) || []).length, 4, "four core meters need separate cards");

const spellingScore = notation.render("enharmonic-spelling");
assert.match(spellingScore, />♯<|>♭</, "enharmonic examples need visible accidentals");
const spellingCenters = [...spellingScore.matchAll(/class="note-head" cx="([\d.]+)" cy="([\d.]+)"/g)].map((match) => ({ x:Number(match[1]), y:Number(match[2]) }));
assert.notEqual(spellingCenters[1].y, spellingCenters[4].y, "C-sharp and D-flat must use different staff steps");

const scaleScore = notation.render("minor-scales");
assert.equal((scaleScore.match(/class="score-line-card"/g) || []).length, 3, "three minor-scale forms need separate staves");
assert.equal((scaleScore.match(/class="note-head"/g) || []).length, 24);

const mixedScore = notation.render("part-spacing");
assert.match(mixedScore, /viewBox="0 0 520 184"/, "four-part mixed registers need a compact grand staff");
assert.ok(mixedScore.includes('transform="translate(0 -8)"'), "grand-staff content must remain vertically centered");
assert.match(mixedScore, /𝄞/);
assert.match(mixedScore, /𝄢/);

const leadSheet = notation.render("lead-sheet");
assert.match(leadSheet, /viewBox="0 0 520 116"/, "annotated sequences need room for chord symbols without dead space");
assert.ok(leadSheet.includes('transform="translate(0 -29)"'), "annotated sequence content must be vertically centered");
assert.equal((leadSheet.match(/class="score-line-card"/g) || []).length, 1, "the lead sheet must be one continuous staff");
assert.equal((leadSheet.match(/class="note-annotation"/g) || []).length, 5, "every melody event needs its chord symbol");
assert.equal((leadSheet.match(/class="bar-line/g) || []).length, 5, "the lead sheet needs measure lines and a final barline");
for (const label of ["C", "G/B", "Am", "F"]) assert.match(leadSheet, new RegExp(">" + label.replace("/", "\\/") + "<"));

const registerScore = notation.render("melody-register");
assert.equal((registerScore.match(/class="note-head"/g) || []).length, 6, "the accompaniment triad and three melody notes must all appear");
assert.equal((registerScore.match(/class="note-stem"/g) || []).length, 4, "the accompaniment is one chord while the melody is sequential");

for (const key of ["passing-six-four", "auxiliary-six-four", "arpeggio-six-four"]) {
  const sixFourScore = notation.render(key);
  assert.equal((sixFourScore.match(/class="note-head"/g) || []).length, 9, key + " needs all three complete triads");
  assert.match(sixFourScore, /6\/4/, key + " needs a visible six-four label");
}

console.log("harmony notation renderer: ok");
