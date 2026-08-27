import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const dataSource = fs.readFileSync(path.join(harmony, "competency-data.js"), "utf8");
const courseSource = fs.readFileSync(path.join(harmony, "competency-course.js"), "utf8");

const dataContext = { window: {} };
vm.createContext(dataContext);
vm.runInContext(dataSource, dataContext);

const renderContext = {
  window: { PracticalHarmonyCurriculum: dataContext.window.PracticalHarmonyCurriculum },
  document: { readyState: "loading", addEventListener() {} },
  localStorage: { getItem() { return null; }, setItem() {} },
  setTimeout() {},
  clearTimeout() {}
};
vm.createContext(renderContext);
vm.runInContext(courseSource, renderContext);

const notation = renderContext.window.PracticalHarmonyNotation;
assert.ok(notation, "notation renderer must expose a deterministic QA surface");
assert.equal(notation.noteParts("E♭4").label, "E♭4", "display-only Unicode spelling should not be parsed as ASCII input");
assert.equal(notation.noteParts("Eb4").midi, 63);
assert.equal(notation.noteParts("F#4").midi, 66);

const chordScore = notation.render("symbol-anatomy");
assert.equal((chordScore.match(/class="note-head"/g) || []).length, 14, "C, Cm, C7, Cmaj7 need every chord tone");
assert.equal((chordScore.match(/class="note-stem"/g) || []).length, 4, "each displayed chord needs a stem");
assert.match(chordScore, /y1="114"/, "E4 must sit on the bottom treble-staff line");
assert.match(chordScore, /class="ledger"[^>]*y1="124"/, "middle C needs its ledger line");

const contrastScore = notation.render("symbol-contrast");
assert.equal((contrastScore.match(/class="note-head"/g) || []).length, 7, "Csus4 and Cadd9 must show all seven noteheads");
const centers = [...contrastScore.matchAll(/class="note-head" cx="([\d.]+)" cy="([\d.]+)"/g)].map((match) => ({ x:Number(match[1]), y:Number(match[2]) }));
assert.notEqual(centers[1].x, centers[2].x, "adjacent F4-G4 noteheads must be offset instead of overlapping");
assert.notEqual(centers[3].x, centers[4].x, "adjacent C4-D4 noteheads must be offset instead of overlapping");

const scaleScore = notation.render("key-scale");
assert.equal((scaleScore.match(/class="score-line-card"/g) || []).length, 2, "C and G scales need separate melodic staves");
assert.equal((scaleScore.match(/class="note-head"/g) || []).length, 16, "scales must render as sixteen sequential notes, not two note clusters");
assert.equal((scaleScore.match(/class="note-stem"/g) || []).length, 16);

const layeredScore = notation.render("practice-layers");
assert.match(layeredScore, /𝄢/, "bass lines need a bass clef");
const mixedScore = notation.render("bass-line");
assert.match(mixedScore, /viewBox="0 0 520 208"/, "mixed bass and upper chord tones need a grand staff");
assert.match(mixedScore, /𝄞/);
assert.match(mixedScore, /𝄢/);

console.log("harmony notation renderer: ok");
