import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const read = (name) => fs.readFileSync(path.join(harmony, name), "utf8");

const index = read("index.html");
const dataSource = read("harmony-curriculum.js");
const traditionalSource = read("harmony-traditional-extension.js");
const courseSource = read("harmony-course.js");
const css = read("course-v2.css") + read("harmony-foundation.css") + read("harmony-course.css");
const curriculumDoc = read("CURRICULUM.md");
const auditDoc = read("HARMONY-CURRICULUM-AUDIT.md");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
vm.runInContext(traditionalSource, context);
const curriculum = context.window.HarmonyCurriculum;

assert.ok(curriculum, "curriculum must be exposed to the renderer");
const listedIds = Array.from(curriculum.strands, (strand) => Array.from(strand.skills)).flat();
const implementedIds = Object.keys(curriculum.skills);
assert.ok(curriculum.strands.length > 0, "the course needs at least one content strand");
for (const strand of curriculum.strands) {
  assert.ok(strand.id && strand.title && strand.description, "every strand needs an identity and explanation");
  assert.ok(Array.isArray(strand.skills) && strand.skills.length > 0, strand.id + " must contain learning items");
}
assert.equal(new Set(listedIds).size, listedIds.length, "a learning item appears more than once");
assert.deepEqual(new Set(implementedIds), new Set(listedIds), "listed items and implemented items differ");

for (const [order, id] of listedIds.entries()) {
  const skill = curriculum.skills[id];
  assert.ok(skill.title && skill.summary && skill.outcome, id + " needs a title, explanation, and observable outcome");
  assert.ok(Array.isArray(skill.prereqs), id + " needs explicit prerequisites");
  assert.ok(Array.isArray(skill.tags) && skill.tags.length >= 2, id + " needs searchable concept tags");
  assert.ok(Array.isArray(skill.terms) && skill.terms.length >= 3, id + " needs defined terms");
  assert.ok(skill.sections.length >= 2, id + " needs more than a one-line explanation");
  assert.ok(skill.lab && ["keyboard", "aural", "rhythm", "progression"].includes(skill.lab.type), id + " needs a direct activity");
  assert.ok(skill.evidence.length >= 3, id + " needs several answerable checks");

  for (const prerequisite of skill.prereqs) {
    assert.ok(curriculum.skills[prerequisite], id + " refers to missing prerequisite " + prerequisite);
    assert.ok(listedIds.indexOf(prerequisite) < order, id + " must be taught after prerequisite " + prerequisite);
  }

  for (const section of skill.sections) {
    assert.ok(section.title && section.takeaway, id + " has an incomplete section");
    assert.ok(Array.isArray(section.body) && section.body.join("").length >= 70, id + " needs a substantial explanation");
    assert.ok(section.visual, id + " needs a score or diagram for every section");
    assert.ok(Array.isArray(section.audioOptions) && section.audioOptions.length >= 2, id + " needs an audible comparison in every section");
  }
}

assert.ok(new Set(listedIds.map((id) => curriculum.skills[id].sections.length)).size > 1, "section counts must follow the concept instead of a fixed template");
assert.ok(new Set(listedIds.map((id) => curriculum.skills[id].evidence.length)).size > 1, "question counts must follow the concept instead of a fixed template");
assert.deepEqual(new Set(listedIds.map((id) => curriculum.skills[id].lab.type)), new Set(["keyboard", "aural", "rhythm", "progression"]), "the course needs keyboard, listening, rhythm construction, and progression activities");

assert.match(index, /<title>화성학<\/title>/);
assert.match(index, /harmony-curriculum\.js/);
assert.match(index, /harmony-traditional-extension\.js/);
assert.match(index, /harmony-course\.js/);
assert.match(index, /harmony-course\.css/);
assert.ok(index.indexOf("harmony-curriculum.js") < index.indexOf("harmony-course.js"), "curriculum must load before the renderer");
assert.ok(index.indexOf("harmony-traditional-extension.js") < index.indexOf("harmony-course.js"), "traditional training must load before the renderer");
assert.doesNotMatch(index, /hero|continueCard|continue-card|PRACTICAL|실용/i);
assert.match(courseSource, /function showDashboard\(\)/);
assert.match(courseSource, /bindEvents\(\);\s*showDashboard\(\);/, "the progress table must be the entry screen");
assert.doesNotMatch(index + courseSource, /위에서부터 차례로|앞에서부터 익히면|첫 항목부터 차례로/);
assert.doesNotMatch(courseSource, /currentLesson\.textContent\s*=\s*"학습 "/, "the study footer must not present the item count as a fixed session count");
assert.doesNotMatch(courseSource, /progressText\.textContent\s*=\s*state\.completed\.size\s*\+\s*" \/ "/, "progress must not foreground a fixed total as class periods");
assert.equal(curriculum.strands[0].title, "기초악전");
assert.deepEqual(Array.from(curriculum.strands[0].skills), ["NOTATION_BASICS","TREBLE_CLEF","BASS_CLEF","STAFF_PITCH","ACCIDENTAL_READING","RHYTHM_NOTATION","REST_NOTATION","METER_READING"], "fundamentals must teach clefs and duration as independent ordered lessons");
assert.equal(curriculum.strands[1].title, "음정");
const intervalLessonIds = ["INTERVAL_NUMBER","INTERVAL_FORM","INTERVAL_SPELLING","INTERVAL_ALTERED","INTERVAL_INVERSION","INTERVAL_COMPOUND","INTERVAL_CONSONANCE","INTERVAL_EAR"];
assert.deepEqual(Array.from(curriculum.strands[1].skills), intervalLessonIds);
assert.equal(curriculum.strands[1].skills.length, 8, "interval study must be a multi-session unit");
const scaleLessonIds = ["SCALE_STEP","KEY_MAP","KEY_SHARPS","KEY_FLATS","FIFTHS_KEYS","RELATIVE_KEYS","MINOR_SCALE_FORMS","SCALE_DEGREES","MODE_BASICS","PENTATONIC_SCALE"];
assert.deepEqual(Array.from(curriculum.strands.find((strand) => strand.id === "scale-basics").skills), scaleLessonIds);
assert.equal(scaleLessonIds.length, 10, "scale study must be a sustained multi-session unit");
assert.ok(curriculum.strands.find((strand) => strand.id === "chord-language").skills.includes("SIX_FOUR"));
assert.ok(listedIds.length >= 1, "the course must derive its item count from required learning outcomes");
assert.ok(!curriculum.strands.some((strand) => strand.id === "chromatic"), "advanced chromatic harmony must not occupy the basic progress path");
for (const id of ["CHROMATIC_PREDOMINANT","MODULATION","LEAD_SHEET_PROJECT"]) {
  assert.ok(!curriculum.skills[id], id + " must stay outside the foundational course");
}
assert.deepEqual(Array.from(curriculum.strands.find((strand) => strand.id === "part-writing").skills), ["VOICE_LEAD","PART_WRITING","VOICE_MOTION","VOICE_ERRORS","NON_CHORD_TONES","GUIDE_TONE"]);
assert.deepEqual(Array.from(curriculum.strands.at(-1).skills), ["SECONDARY_DOMINANT","SECONDARY_DOMINANT_VOICE","SECONDARY_LEADING_TONE","BORROWED_CHORD","COLOR_CHORD"], "common song harmony extensions belong at the end of the basic course");
const partOneDepth = {
  KEY_MAP:[4, 6], INTERVAL_NUMBER:[2, 6], INTERVAL_FORM:[2, 4], INTERVAL_SPELLING:[2, 5],
  INTERVAL_ALTERED:[2, 6], INTERVAL_INVERSION:[2, 5], INTERVAL_COMPOUND:[2, 5],
  INTERVAL_CONSONANCE:[2, 5], INTERVAL_EAR:[2, 6], TRIAD_BUILD:[4, 7], QUALITY_HEAR:[3, 6],
  SLASH_BASS:[4, 7], SIX_FOUR:[4, 8], MINOR_HARMONY:[5, 8], DIATONIC_BUILD:[4, 7],
  PART_WRITING:[4, 8], VOICE_MOTION:[3, 6], VOICE_ERRORS:[4, 8], NON_CHORD_TONES:[4, 8],
  CADENCE_SHAPE:[5, 7], SEVENTH_BUILD:[5, 8], SECONDARY_DOMINANT:[4, 7],
  SECONDARY_DOMINANT_VOICE:[4, 7], SECONDARY_LEADING_TONE:[3, 6], BORROWED_CHORD:[4, 8], COLOR_CHORD:[5, 10]
};
for (const [id, [sectionMinimum, questionMinimum]] of Object.entries(partOneDepth)) {
  const skill = curriculum.skills[id];
  assert.ok(skill.sections.length >= sectionMinimum, id + " lost its full lesson sequence");
  assert.ok(skill.evidence.length >= questionMinimum, id + " lost its practice set");
  assert.ok(skill.sections.some((section) => section.worked && section.worked.steps.length >= 3), id + " needs a worked example");
  assert.ok(skill.sections.some((section) => section.mistake), id + " needs misconception feedback");
}
assert.match(courseSource, /HarmonyPiano/);
assert.doesNotMatch(index, /dashboardTitle|class="dashboard-heading"|>진도표<\/h1>/, "the dashboard must start with the learning list");
assert.ok(index.indexOf('id="unitList"') < index.indexOf('class="dashboard-tools"'), "progress controls must follow the learning list");
assert.doesNotMatch(index, /piano-panel|자유 건반/, "the lesson must not end with a redundant free-piano promotion");
assert.match(courseSource, /renderKeyboardLab/);
assert.match(courseSource, /renderAuralLab/);
assert.match(courseSource, /renderProgressionLab/);
assert.match(courseSource, /state\.labPassed\s*\|\|\s*!state\.evidencePassed/);
assert.doesNotMatch(dataSource + courseSource + index, /실용|Practical|competency/i);

assert.match(css, /min-height:\s*44px/);
assert.match(css, /@media \(max-width:\s*900px\)/);
assert.match(css, /@media \(max-width:\s*700px\)/);
assert.match(css, /\.score-svg \.note-stem/);
assert.match(css, /\.score-svg \.note-annotation/);
assert.match(css, /\.note-values-diagram/);
assert.match(css, /\.meter-diagram/);
assert.match(curriculumDoc, /광고형 첫 화면.*두지 않는다/);
assert.match(auditDoc, /이명동음 철자/);
assert.match(auditDoc, /본격 전조.*제외/);

console.log("harmony curriculum contract: ok");
