import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");

const html = read("learning/inquiry/korea-geography/index.html");
const styles = read("learning/inquiry/korea-geography/styles.css");
const app = read("learning/inquiry/korea-geography/app.js");
const dataSource = read("learning/inquiry/korea-geography/data.js");
const principlesSource = read("learning/inquiry/korea-geography/principles.js");
const riverData = JSON.parse(read("learning/inquiry/korea-geography/data/major-rivers.geojson"));
const physicalRelief = fs.readFileSync(new URL("learning/inquiry/korea-geography/assets/korea-physical-relief.webp", root));

assert.match(html, /id="map"/);
assert.match(html, /id="startPractice"/);
assert.match(html, /id="practiceTopic"/);
assert.match(html, /id="practiceDifficulty"/);
assert.match(html, /id="practiceCount"/);
assert.match(html, /id="principleGuide"/);
assert.match(html, /principles\.js\?v=20260901-7/);
assert.match(html, /연습 세트 구성/);
assert.doesNotMatch(html, /오늘의 5문제/);
assert.doesNotMatch(html, /<h1>한국지리 수능<\/h1>/);

assert.match(styles, /\.back-link,[\s\S]*?min-height:\s*44px/);
assert.match(styles, /@media \(max-width: 820px\)[\s\S]*?\.map-stage \{ height: 50dvh; min-height: 390px; \}/);
assert.match(styles, /grid-template-columns: minmax\(0, 1\.7fr\) minmax\(320px, 0\.82fr\)/);
assert.match(styles, /\.principle-button \{[^}]*min-height:\s*44px/s);

assert.match(app, /korean-museum\/data\/skorea-provinces-topo-simple\.json/);
assert.match(app, /voyager_nolabels/);
assert.doesNotMatch(app, /World_Hillshade|World_Terrain_Base/, "The geography map must not depend on Esri world terrain tiles.");
assert.match(app, /L\.imageOverlay\("assets\/korea-physical-relief\.webp/, "The terrain theme must use the self-hosted Korean Peninsula physical relief.");
assert.match(app, /opacity:\s*0\.84/, "The physical relief must remain prominent enough to reveal mountain systems.");
assert.doesNotMatch(styles, /leaflet-relief-pane[^}]*mix-blend-mode:\s*multiply/s, "The colored physical relief must not be flattened by multiply blending.");
assert.ok(physicalRelief.byteLength > 1_000_000, "The high-resolution physical-relief asset is missing or unexpectedly empty.");



assert.match(app, /map\.getZoom\(\) > 8/, "Maritime province outlines must be hidden at close zoom.");
assert.match(app, /major-rivers\.geojson/);
assert.match(app, /function riverWidthAt/);
assert.match(app, /function renderPrinciples/);
assert.match(app, /function showPrinciple/);
assert.match(app, /distanceFromMouth \/ Math\.max/);
assert.match(app, /maxWidth - minWidth/);
assert.match(app, /name === "한강" \? 3\.6/, "The Han main stem must widen after the Dumulmeori confluence.");
assert.match(app, /\["남한강", "북한강"\]\.includes\(name\) \? 2\.8/, "The two tributaries must stay visually narrower before Dumulmeori.");
assert.match(app, /43\.15, 131\.35/, "The default extent must include the full Korean Peninsula.");
assert.match(dataSource, /relief: true/);
assert.match(dataSource, /featureMarkers: false/);
assert.match(dataSource, /name: "백두산"/);
assert.match(dataSource, /name: "개마고원"/);
assert.doesNotMatch(dataSource, /name: "태백산맥", kind: "mountain", coords/);
assert.doesNotMatch(dataSource, /name: "한강", kind: "river", coords/);
assert.match(app, /localStorage\.setItem\(PROGRESS_KEY/);
assert.match(app, /function getPracticeCount/);
assert.match(app, /selected === "all" \? poolLength/);
assert.match(app, /shuffle\(pool\)\.slice\(0, count\)/);
assert.match(app, /lastTotal = total/);

const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox, { filename: "data.js" });
vm.runInNewContext(principlesSource, sandbox, { filename: "principles.js" });
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
const terrainRiverLabels = dataset.themes.terrain.annotations.filter((annotation) => annotation.kind === "river");
for (const name of ["북한강", "남한강", "한강"]) {
  assert.ok(terrainRiverLabels.some((annotation) => annotation.name === name), `${name} needs its own map label.`);
}
const chongchonLabel = terrainRiverLabels.find((annotation) => annotation.name === "청천강");
assert.ok(chongchonLabel.lat >= 40 && chongchonLabel.lng >= 126.1, "The Chongchon label must sit on the Chongchon River, not near the upper Taedong.");
assert.ok(dataset.themes.terrain.principles.length >= 13, "Terrain needs a complete CSAT principle set.");
for (const [themeKey, theme] of Object.entries(dataset.themes)) {
  assert.ok(theme.principles.length >= 5, `${themeKey} needs at least five core principles.`);
  for (const principle of theme.principles) {
    assert.ok(principle.title && principle.explanation.length >= 45, `${themeKey} has an incomplete principle explanation.`);
    assert.ok(Array.isArray(principle.steps) && principle.steps.length >= 3, `${principle.title} needs at least three reasoning steps.`);
    assert.ok(principle.focus && Number.isFinite(principle.focus.lat) && Number.isFinite(principle.focus.lng), `${principle.title} needs a map focus.`);
  }
}
for (const requiredTitle of ["수계와 양수리 두물머리", "대관령: 고개·기후·교통의 연결", "간척지는 어떻게 만들어지는가", "관동·관서·관북·해서", "금강·섬진강과 도 경계"]) {
  assert.ok(Object.values(dataset.themes).flatMap((theme) => theme.principles).some((principle) => principle.title === requiredTitle), `${requiredTitle} must be taught.`);
}
assert.ok(dataset.questions.length >= 30, "At least 30 reviewed questions are required for varied selectable practice sets.");

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
