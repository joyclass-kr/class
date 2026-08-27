import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const dataSource = fs.readFileSync(path.join(harmony, "harmony-curriculum.js"), "utf8");
const courseSource = fs.readFileSync(path.join(harmony, "harmony-course.js"), "utf8");

const dataContext = { window: {} };
vm.createContext(dataContext);
vm.runInContext(dataSource, dataContext);

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

const visualKeys = new Set([...dataSource.matchAll(/visual:"([^"]+)"/g)].map((match) => match[1]));
for (const key of visualKeys) {
  const score = notation.render(key);
  assert.match(score, /class="score-svg/, key + " must render a score");
  assert.doesNotMatch(score, /NaN|undefined/, key + " contains an invalid coordinate or label");
  assert.ok((score.match(/class="note-head"/g) || []).length >= 2, key + " must show actual notes");
}

const chordScore = notation.render("symbol-anatomy");
assert.equal((chordScore.match(/class="note-head"/g) || []).length, 14, "C, Cm, C7, and Cmaj7 need every chord tone");
assert.match(chordScore, /y1="114"/, "E4 must sit on the bottom treble-staff line");
assert.match(chordScore, /class="ledger"[^>]*y1="124"/, "middle C needs its ledger line");

const contrastScore = notation.render("symbol-contrast");
const centers = [...contrastScore.matchAll(/class="note-head" cx="([\d.]+)" cy="([\d.]+)"/g)].map((match) => ({ x:Number(match[1]), y:Number(match[2]) }));
assert.notEqual(centers[1].x, centers[2].x, "adjacent F4-G4 noteheads must not overlap");
assert.notEqual(centers[3].x, centers[4].x, "adjacent C4-D4 noteheads must not overlap");

const clefScore = notation.render("staff-clefs");
assert.match(clefScore, /𝄞/, "the grand-staff lesson needs a treble clef");
assert.match(clefScore, /𝄢/, "the grand-staff lesson needs a bass clef");
assert.equal((clefScore.match(/class="note-head"/g) || []).length, 10);

const spellingScore = notation.render("enharmonic-spelling");
assert.match(spellingScore, />♯<|>♭</, "enharmonic examples need visible accidentals");
const spellingCenters = [...spellingScore.matchAll(/class="note-head" cx="([\d.]+)" cy="([\d.]+)"/g)].map((match) => ({ x:Number(match[1]), y:Number(match[2]) }));
assert.notEqual(spellingCenters[1].y, spellingCenters[4].y, "C-sharp and D-flat must use different staff steps");

const scaleScore = notation.render("minor-scales");
assert.equal((scaleScore.match(/class="score-line-card"/g) || []).length, 3, "three minor-scale forms need separate staves");
assert.equal((scaleScore.match(/class="note-head"/g) || []).length, 24);

const mixedScore = notation.render("part-spacing");
assert.match(mixedScore, /viewBox="0 0 520 208"/, "four-part mixed registers need a grand staff");
assert.match(mixedScore, /𝄞/);
assert.match(mixedScore, /𝄢/);

const leadSheet = notation.render("lead-sheet");
assert.equal((leadSheet.match(/class="score-line-card"/g) || []).length, 1, "the lead sheet must be one continuous staff");
assert.equal((leadSheet.match(/class="note-annotation"/g) || []).length, 5, "every melody event needs its chord symbol");
assert.equal((leadSheet.match(/class="bar-line/g) || []).length, 5, "the lead sheet needs measure lines and a final barline");
for (const label of ["C", "G/B", "Am", "F"]) assert.match(leadSheet, new RegExp(">" + label.replace("/", "\\/") + "<"));

const registerScore = notation.render("melody-register");
assert.equal((registerScore.match(/class="note-head"/g) || []).length, 6, "the accompaniment triad and three melody notes must all appear");
assert.equal((registerScore.match(/class="note-stem"/g) || []).length, 4, "the accompaniment is one chord while the melody is sequential");

console.log("harmony notation renderer: ok");
