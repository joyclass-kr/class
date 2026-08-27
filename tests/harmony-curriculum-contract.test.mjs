import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const harmony = path.join(root, "learning", "arts", "music-theory", "harmony");
const read = (name) => fs.readFileSync(path.join(harmony, name), "utf8");

const index = read("index.html");
const dataSource = read("harmony-curriculum.js");
const courseSource = read("harmony-course.js");
const css = read("course-v2.css") + read("harmony-foundation.css") + read("harmony-course.css");
const curriculumDoc = read("CURRICULUM.md");
const auditDoc = read("HARMONY-CURRICULUM-AUDIT.md");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
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
  assert.ok(skill.lab && ["keyboard", "aural", "progression"].includes(skill.lab.type), id + " needs a direct activity");
  assert.ok(skill.evidence.length >= 3, id + " needs several checks");

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
assert.deepEqual(new Set(listedIds.map((id) => curriculum.skills[id].lab.type)), new Set(["keyboard", "aural", "progression"]), "the course needs construction, listening, and progression activities");

assert.match(index, /<title>화성학<\/title>/);
assert.match(index, /harmony-curriculum\.js/);
assert.match(index, /harmony-course\.js/);
assert.match(index, /harmony-course\.css/);
assert.ok(index.indexOf("harmony-curriculum.js") < index.indexOf("harmony-course.js"), "curriculum must load before the renderer");
assert.doesNotMatch(index, /hero|continueCard|continue-card|PRACTICAL|실용/i);
assert.match(courseSource, /openSkill\(curriculum\.skills\[savedId\]/);
assert.match(courseSource, /HarmonyPiano/);
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
assert.match(curriculumDoc, /광고형 첫 화면을 두지 않는다/);
assert.match(auditDoc, /이명동음 철자/);
assert.match(auditDoc, /조옮김.*전조/);

console.log("harmony curriculum contract: ok");
