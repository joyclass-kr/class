"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const base = path.join(root, "learning", "arts", "music-theory", "harmony");
const read = (name) => fs.readFileSync(path.join(base, name), "utf8");
const html = read("index.html");
const baseCss = read("course-v2.css") + read("practical-course.css");
const competencyCss = read("competency-course.css");
const dataSource = read("competency-data.js");
const renderer = read("competency-course.js");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
const curriculum = context.window.PracticalHarmonyCurriculum;
const ids = Object.keys(curriculum.skills);

assert.match(html, /id="dashboard"/);
assert.match(html, /id="study"[^>]*hidden/);
assert.match(html, /진도표/);
assert.match(html, /competency-data\.js/);
assert.doesNotMatch(html, /PRACTICAL HARMONY|continueCard/);
assert.match(html, /competency-course\.js/);
assert.ok(html.indexOf("competency-data.js") < html.indexOf("competency-course.js"), "data must load before rendering");
assert.doesNotMatch(html, /course-guides\.js|course-v2\.js|practical-course\.js/);
assert.doesNotMatch(html, /\d+차시|완료\s*\d+\s*\/\s*\d+|적용 문제와 청음 6개/);

assert.equal(ids.length, 19);
assert.equal(curriculum.strands.length, 5);
assert.equal(new Set(curriculum.strands.flatMap((strand) => Array.from(strand.skills))).size, ids.length);
for (const id of ids) {
  const skill = curriculum.skills[id];
  assert.ok(skill.outcome && skill.summary, `${id}: explanation and outcome required`);
  assert.ok(skill.sections.length >= 2, `${id}: substantial explanation required`);
  assert.ok(skill.sections.every((section) => section.visual && section.audioOptions?.length), `${id}: every explanation needs visual and audio support`);
  assert.ok(["keyboard", "aural", "progression"].includes(skill.lab.type), `${id}: performance lab required`);
  assert.ok(skill.evidence.length >= 2, `${id}: evidence required`);
  for (const prerequisite of skill.prereqs) {
    assert.ok(curriculum.skills[prerequisite], `${id}: missing prerequisite ${prerequisite}`);
    assert.ok(ids.indexOf(prerequisite) < ids.indexOf(id), `${id}: prerequisite must appear earlier`);
  }
}

assert.match(renderer, /recommendedId/);
assert.match(renderer, /prereqsMet/);
assert.match(renderer, /staffSvg/);
assert.match(renderer, /SEQUENCE_KEYS/);
assert.match(renderer, /chordStaffSvg/);
assert.match(renderer, /sequenceStaffSvg/);
assert.match(renderer, /note-stem/);
assert.match(renderer, /\[74,84,94,104,114\]/);
assert.match(renderer, /Math\.abs\(part\.y-group\[index-1\]\.y\) === 5/);
assert.doesNotMatch(renderer, /Math\.max\(44, Math\.min\(124/);
assert.match(renderer, /openSkill\(curriculum\.skills\[savedId\]/);
assert.match(renderer, /HarmonyPiano/);
assert.match(renderer, /renderKeyboardLab/);
assert.match(renderer, /renderAuralLab/);
assert.match(renderer, /renderProgressionLab/);
assert.match(renderer, /state\.labPassed\s*\|\|\s*!state\.evidencePassed/);

const visualKeys = new Set([...dataSource.matchAll(/visual:"([^"]+)"/g)].map((match) => match[1]));
for (const key of visualKeys) assert.ok(renderer.includes(`"${key}"`), `missing visual renderer: ${key}`);

assert.match(baseCss + competencyCss, /min-height:\s*44px/);
assert.match(competencyCss, /@media \(max-width:\s*900px\)/);
assert.match(competencyCss, /@media \(max-width:\s*700px\)/);
assert.match(competencyCss, /\.score-svg/);
assert.match(competencyCss, /\.score-svg \.note-stem/);
assert.match(competencyCss, /\.progression-builder/);

console.log("harmony competency course contract: ok");
