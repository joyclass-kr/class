"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const base = path.join(root, "learning", "arts", "music-theory", "harmony");
const read = (name) => fs.readFileSync(path.join(base, name), "utf8");
const html = read("index.html");
const css = read("course-v2.css") + read("harmony-foundation.css") + read("harmony-course.css");
const dataSource = read("harmony-curriculum.js");
const renderer = read("harmony-course.js");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataSource, context);
const curriculum = context.window.HarmonyCurriculum;
const ids = curriculum.strands.flatMap((strand) => Array.from(strand.skills));

assert.match(html, /id="dashboard"[^>]*hidden/);
assert.match(html, /id="study"[^>]*hidden/);
assert.match(html, /진도표/);
assert.match(html, /harmony-curriculum\.js/);
assert.match(html, /harmony-course\.js/);
assert.ok(html.indexOf("harmony-curriculum.js") < html.indexOf("harmony-course.js"), "data must load before rendering");
assert.doesNotMatch(html, /hero|continueCard|continue-card|실용/i);

assert.equal(ids.length, 27);
assert.equal(curriculum.strands.length, 7);
assert.equal(new Set(ids).size, ids.length);
for (const id of ids) {
  const skill = curriculum.skills[id];
  assert.ok(skill.outcome && skill.summary, id + ": explanation and outcome required");
  assert.ok(skill.sections.length >= 2, id + ": substantial explanation required");
  assert.ok(skill.sections.every((section) => section.visual && section.audioOptions?.length >= 2), id + ": every explanation needs score and audio");
  assert.ok(["keyboard", "aural", "progression"].includes(skill.lab.type), id + ": direct activity required");
  assert.ok(skill.evidence.length >= 3, id + ": checks required");
}

assert.match(renderer, /HarmonyNotation/);
assert.match(renderer, /recommendedId/);
assert.match(renderer, /prereqsMet/);
assert.match(renderer, /chordStaffSvg/);
assert.match(renderer, /sequenceStaffSvg/);
assert.match(renderer, /note-annotation/);
assert.match(renderer, /openSkill\(curriculum\.skills\[savedId\]/);
assert.match(renderer, /HarmonyPiano/);
assert.match(renderer, /renderKeyboardLab/);
assert.match(renderer, /renderAuralLab/);
assert.match(renderer, /renderProgressionLab/);

assert.match(css, /min-height:\s*44px/);
assert.match(css, /@media \(max-width:\s*900px\)/);
assert.match(css, /@media \(max-width:\s*700px\)/);
assert.match(css, /\.score-svg \.note-stem/);
assert.match(css, /\.progression-builder/);

console.log("harmony course smoke contract: ok");
