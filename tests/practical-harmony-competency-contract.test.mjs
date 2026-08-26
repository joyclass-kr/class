import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const read = (name) => fs.readFileSync(path.join(harmony, name), "utf8");

const index = read("index.html");
const dataSource = read("competency-data.js");
const courseSource = read("competency-course.js");
const css = read("competency-course.css");
const baseCss = read("practical-course.css");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
const curriculum = context.window.PracticalHarmonyCurriculum;

const expectedIds = [
  "SYMBOL_READ", "TRIAD_BUILD", "QUALITY_HEAR", "SLASH_BASS", "VOICE_LEAD",
  "KEY_MAP", "DIATONIC_BUILD", "FUNCTION_HEAR", "CADENCE_SHAPE", "PROGRESSION_PLAY",
  "SEVENTH_BUILD", "GUIDE_TONE", "COLOR_CHORD", "TRANSPOSE", "HARMONIC_RHYTHM",
  "MELODY_HARMONIZE", "SECONDARY_DOMINANT", "BORROWED_CHORD", "LEAD_SHEET_PROJECT"
];

assert.ok(curriculum, "curriculum should be exposed for the renderer");
assert.deepEqual(Object.keys(curriculum.skills), expectedIds, "semantic skill IDs should remain stable");

const listedIds = Array.from(curriculum.strands, (strand) => Array.from(strand.skills)).flat();
assert.deepEqual(listedIds, expectedIds, "every competency should appear once in the strand map");
assert.equal(new Set(listedIds).size, listedIds.length, "competencies must not be duplicated across strands");

for (const id of expectedIds) {
  const skill = curriculum.skills[id];
  assert.ok(skill.title && skill.summary && skill.outcome, `${id} needs explanation and an observable outcome`);
  assert.ok(Array.isArray(skill.prereqs), `${id} needs explicit prerequisites`);
  assert.ok(skill.sections.length >= 2, `${id} needs more than a one-line explanation`);
  assert.ok(skill.lab && ["keyboard", "aural", "progression"].includes(skill.lab.type), `${id} needs a direct performance lab`);
  assert.ok(skill.evidence.length >= 2, `${id} needs evidence questions`);
  for (const prerequisite of skill.prereqs) {
    assert.ok(curriculum.skills[prerequisite], `${id} refers to missing prerequisite ${prerequisite}`);
    assert.ok(expectedIds.indexOf(prerequisite) < expectedIds.indexOf(id), `${id} prerequisite graph must be acyclic and teach prerequisites first`);
  }
  for (const section of skill.sections) {
    assert.ok(section.body.length >= 1 && section.takeaway, `${id} sections need explanation and a practical takeaway`);
    assert.ok(section.visual, `${id} sections need a visual aid`);
    assert.ok(section.audioOptions?.length, `${id} sections need playable audio comparisons`);
  }
}

assert.deepEqual(new Set(expectedIds.map((id) => curriculum.skills[id].lab.type)), new Set(["keyboard", "aural", "progression"]), "course should include direct construction, listening, and progression-building labs");
assert.ok(new Set(expectedIds.map((id) => curriculum.skills[id].sections.length)).size > 1, "explanation length must follow the concept, not a fixed lesson template");
assert.ok(new Set(expectedIds.map((id) => curriculum.skills[id].evidence.length)).size > 1, "evidence count must follow the outcome, not an imposed question count");

assert.match(index, /역량 지도/);
assert.match(index, /competency-data\.js/);
assert.match(index, /competency-course\.js/);
assert.match(index, /competency-course\.css/);
assert.doesNotMatch(index, /practical-course\.js/);
assert.doesNotMatch(index, /완료\s*0\s*\/\s*10|적용 문제와 청음 6개|\d+차시/);

assert.match(courseSource, /recommendedId/);
assert.match(courseSource, /prereqsMet/);
assert.match(courseSource, /staffSvg/);
assert.match(courseSource, /HarmonyPiano/);
assert.match(courseSource, /renderKeyboardLab/);
assert.match(courseSource, /renderAuralLab/);
assert.match(courseSource, /renderProgressionLab/);
assert.match(courseSource, /state\.labPassed\s*\|\|\s*!state\.evidencePassed/);

const visualKeys = new Set([...dataSource.matchAll(/visual:"([^"]+)"/g)].map((match) => match[1]));
for (const key of visualKeys) {
  assert.ok(courseSource.includes(`"${key}"`), `renderer should implement visual ${key}`);
}

assert.match(css + baseCss, /min-height:\s*44px/);
assert.match(css + baseCss, /@media \(max-width:\s*900px\)/);
assert.match(css + baseCss, /@media \(max-width:\s*700px\)/);
assert.match(css, /grid-template-columns:\s*repeat\(2/);

console.log("Practical harmony competency contract passed.");
