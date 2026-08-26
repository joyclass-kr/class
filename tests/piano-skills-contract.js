const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..", "learning", "arts", "music-theory", "piano-skills");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const dataSource = fs.readFileSync(path.join(root, "curriculum-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);
const data = sandbox.window.PianoSkillsData;

assert.match(html, /<title>피아노 스케일·보이싱<\/title>/);
assert.match(html, /id="midiButton"/);
assert.match(html, /id="keyboardViewport"/);
assert.match(html, /id="calibrationDialog"/);
assert.match(app, /navigator\.requestMIDIAccess/);
assert.match(app, /0x90/);
assert.match(app, /data1 === 64/);
assert.match(app, /23\.5 \* state\.pxPerMm/);
assert.match(app, /틀린 음/);
assert.match(app, /머뭇거림/);
assert.match(css, /min-height:\s*44px/);
assert.match(css, /@media \(max-width: 900px\)/);
assert.match(css, /@media \(max-width: 720px\)/);

assert.equal(Object.keys(data.scaleTypes).length, 4, "네 종류의 장·단음계를 제공해야 합니다.");
assert.equal(Object.keys(data.fingering).length, 12, "12개 조의 운지를 제공해야 합니다.");
assert.equal(data.voicingModules.length, 20, "교재의 20개 보이싱 영역을 제공해야 합니다.");
const skills = data.voicingModules.flatMap((module) => module.skills.map(Number));
assert.equal(skills.length, 123, "Skills 1-123을 모두 포함해야 합니다.");
assert.deepEqual([...skills].sort((a, b) => a - b), Array.from({ length: 123 }, (_, index) => index + 1));
assert.equal(data.practicePrinciples.length, 10, "교재의 10가지 연습 원칙을 반영해야 합니다.");
assert.ok(data.semesterTracks.foundation.length >= 14);
assert.ok(data.semesterTracks.advanced.length >= 13);

const samples = fs.readdirSync(path.join(root, "assets", "piano")).filter((name) => name.endsWith(".ogg"));
assert.equal(samples.length, 9, "기존 화성학 피아노 샘플 9개를 재사용해야 합니다.");

console.log("piano scale and voicing contracts passed");
