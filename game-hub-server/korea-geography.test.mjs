import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");

const html = read("learning/inquiry/korea-geography/index.html");
const styles = read("learning/inquiry/korea-geography/styles.css");
const app = read("learning/inquiry/korea-geography/app.js");
const dataSource = read("learning/inquiry/korea-geography/data.js");
const riverData = JSON.parse(read("learning/inquiry/korea-geography/data/major-rivers.geojson"));

assert.match(html, /id="map"/);
assert.match(html, /id="startPractice"/);
assert.match(html, /id="practiceTopic"/);
assert.match(html, /id="practiceDifficulty"/);
assert.match(html, /오늘의 5문제/);
assert.doesNotMatch(html, /<h1>한국지리 수능<\/h1>/);

assert.match(styles, /\.back-link,[\s\S]*?min-height:\s*44px/);
assert.match(styles, /@media \(max-width: 820px\)[\s\S]*?\.map-stage \{ height: 50dvh; min-height: 390px; \}/);
assert.match(styles, /grid-template-columns: minmax\(0, 1\.7fr\) minmax\(320px, 0\.82fr\)/);

assert.match(app, /korean-museum\/data\/skorea-provinces-topo-simple\.json/);
assert.match(app, /voyager_nolabels/);
assert.match(app, /World_Hillshade/);
assert.match(app, /World_Terrain_Base/);
assert.match(app, /major-rivers\.geojson/);
assert.match(app, /function riverWidthAt/);
assert.match(app, /distanceFromMouth \/ Math\.max/);
assert.match(app, /maxWidth - minWidth/);
assert.match(app, /43\.15, 131\.35/, "The default extent must include the full Korean Peninsula.");
assert.match(dataSource, /relief: true/);
assert.match(dataSource, /featureMarkers: false/);
assert.match(dataSource, /name: "백두산"/);
assert.match(dataSource, /name: "개마고원"/);
assert.doesNotMatch(dataSource, /name: "태백산맥", kind: "mountain", coords/);
assert.doesNotMatch(dataSource, /name: "한강", kind: "river", coords/);
assert.match(app, /localStorage\.setItem\(PROGRESS_KEY/);
assert.match(app, /shuffle\(pool\)\.slice\(0, 5\)/);

const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox, { filename: "data.js" });
const dataset = sandbox.window.KOREA_GEOGRAPHY;
assert.ok(dataset, "The static geography dataset must be exposed.");
assert.equal(riverData.features.length, 12, "Twelve actual major-river centerlines across the Korean Peninsula are required.");
const riverNames = new Set(riverData.features.map((feature) => feature.properties.name));
for (const name of ["압록강", "두만강", "대동강", "청천강", "북한강", "임진강"]) assert.ok(riverNames.has(name), `${name} must be included.`);
for (const name of ["한강", "남한강", "북한강", "임진강"]) {
  assert.equal(riverData.features.find((feature) => feature.properties.name === name)?.properties.system, "한강 수계", `${name} must be grouped into the Han River system.`);
}
assert.ok(riverData.features.every((feature) => /LineString$/.test(feature.geometry.type)), "Every river must use line geometry.");
assert.deepEqual(Object.keys(dataset.themes), ["terrain", "climate", "population", "industry", "region"]);
assert.ok(dataset.questions.length >= 25, "At least 25 reviewed questions are required for varied five-question sets.");

for (const topic of Object.keys(dataset.themes)) {
  const topicQuestions = dataset.questions.filter((question) => question.topic === topic);
  assert.ok(topicQuestions.length >= 5, `${topic} needs at least five questions.`);
  assert.ok(topicQuestions.some((question) => question.difficulty === "basic"), `${topic} needs a basic question.`);
  assert.ok(topicQuestions.some((question) => question.difficulty === "advanced"), `${topic} needs an advanced question.`);
}

for (const question of dataset.questions) {
  assert.equal(question.options.length, 5, `${question.id} must have five options.`);
  assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 5, `${question.id} has an invalid answer.`);
  assert.ok(question.explanation.length >= 35, `${question.id} needs a useful explanation.`);
  assert.ok(question.focus && Number.isFinite(question.focus.lat) && Number.isFinite(question.focus.lng), `${question.id} needs a map focus.`);
}

console.log("Korean Geography CSAT map and question-bank contract passed.");
