const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..", "learning", "arts", "music-theory", "piano-skills");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const sampler = fs.readFileSync(path.join(root, "piano-sampler.js"), "utf8");
const engraving = fs.readFileSync(path.join(root, "engraved-score.js"), "utf8");
const dataSource = fs.readFileSync(path.join(root, "curriculum-data.js"), "utf8");
const catalogSource = fs.readFileSync(path.join(root, "source-catalog.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);
vm.runInNewContext(catalogSource, sandbox);
vm.runInNewContext(engraving, sandbox);
const data = sandbox.window.PianoSkillsData;
const catalog = sandbox.window.PianoSourceCatalog;
const score = sandbox.window.PianoEngraving;

assert.match(html, /<title>Piano Scales · Voicings<\/title>/);
assert.match(html, /id="midiButton"/);
assert.match(html, /id="scoreSurface"/);
assert.match(html, /id="whiteKeyChoices"/);
assert.match(html, /id="exceptionKeyChoices"/);
assert.match(html, /id="blackKeyChoices"/);
assert.match(html, /id="scaleTypeChoices"/);
assert.match(html, /id="handChoices"/);
assert.match(html, /id="skillChoices"/);
assert.match(html, /id="chapterSummary"/);
assert.match(html, /vendor\/vexflow-4\.2\.2\.js/);
assert.match(html, /engraved-score\.js/);
assert.match(html, /piano-sampler\.js/);
assert.doesNotMatch(html, /scoreImage|score-renderer\.js|assets\/scores|scaleKeySelect|scaleTypeSelect|handSelect|skillSelect/);
assert.doesNotMatch(html, /ENGRAVED SCORE|SCALE SCORE|새로 조판/);
assert.match(html, /Scales · Fingering/);
assert.match(html, /Jazz Voicings 1–123/);
assert.equal(fs.existsSync(path.join(root, "score-renderer.js")), false);
assert.match(html, /입력 확인용이며 실물 크기가 아닙니다/);

assert.match(app, /navigator\.requestMIDIAccess/);
assert.match(app, /0x90/);
assert.match(app, /PianoEngraving\.build/);
assert.match(app, /PianoEngraving\.render/);
assert.match(app, /SCALE_KEY_GROUPS/);
assert.match(app, /renderVoicingChoices/);
assert.match(app, /chapterSummary\.textContent = module\.summary/);
assert.doesNotMatch(app, /assets\/scores|scoreImage|원본 악보|scaleKeySelect|scaleTypeSelect|handSelect|skillSelect|새로 조판/);

assert.match(engraving, /Renderer\.Backends\.SVG/);
assert.match(engraving, /new VF\.Stave/);
assert.match(engraving, /new VF\.StaveNote/);
assert.match(engraving, /new VF\.Beam\(beamable\)/);
assert.match(engraving, /buildFingeringBeams/);
assert.match(engraving, /const rightBeams = buildFingeringBeams[\s\S]*rightVoice\.draw[\s\S]*rightBeams\.concat\(leftBeams\)/, "빔을 음표보다 먼저 등록해 8분음표 꼬리가 중복되지 않아야 합니다.");
assert.match(engraving, /breakBeforeThumb/);
assert.match(engraving, /SCALE_ROOT_NAMES/);
assert.match(engraving, /Ascending/);
assert.match(engraving, /Descending/);
assert.doesNotMatch(engraving, /"상행"|"하행"|"양손 두 옥타브"/);
assert.match(engraving, /return buildAdvancedDominantSkill\(skillId\)/);
assert.doesNotMatch(sampler, /createOscillator/, "피아노 샘플 실패를 합성음으로 대체하면 안 됩니다.");
assert.match(sampler, /Math\.sqrt\(size\)/, "화음의 음 수에 따라 샘플 볼륨을 정규화해야 합니다.");

assert.match(css, /min-height:\s*44px/);
assert.match(css, /\.choice-button[\s\S]*min-height:\s*44px/);
assert.match(css, /\.score-surface svg[\s\S]*width:\s*100%\s*!important/);
assert.match(css, /\.score-viewport[\s\S]*overflow:\s*hidden/);
assert.match(css, /\.score-surface[\s\S]*min-width:\s*0/);
assert.match(css, /@media \(min-width: 1024px\) and \(max-height: 850px\)/);
assert.match(css, /@media \(max-width: 820px\)/);
assert.match(css, /@media \(max-width: 620px\)/);

assert.equal(Object.keys(data.scaleTypes).length, 4, "장·자연단·화성단·가락단음계를 모두 제공해야 합니다.");
assert.equal(Object.keys(data.fingering).length, 12, "12개 조 운지를 제공해야 합니다.");
assert.equal(data.practicePrinciples.length, 10, "교재의 10가지 연습 원칙을 반영해야 합니다.");
assert.ok(data.voicingModules.every((module) => module.summary && module.concepts.length >= 3 && module.practice.length >= 3), "각 챕터의 설명·개념·연습 방법을 제공해야 합니다.");
assert.ok(data.voicingModules.every((module) => Number.isInteger(module.sourcePage)), "각 챕터 설명은 영문 교재의 도입 페이지와 연결되어야 합니다.");
assert.deepEqual(Array.from(data.voicingModules, (module) => module.sourcePage), [4,8,16,24,36,50,54,58,62,66,70,74,82,86,100,114,124,138,144,148]);
assert.deepEqual(Array.from(data.voicingModules.slice(0, 4), (module) => module.title), ["Block Chords", "Shell Voicings", "Diatonic 7th Chords", "Cycle Progressions"]);

assert.equal(catalog.skills.length, 123, "교재 Skill 1–123을 각각 선택할 수 있어야 합니다.");
assert.deepEqual(
    Array.from(catalog.skills, (skill) => skill.id),
    Array.from({ length: 123 }, (_, index) => index + 1)
);
assert.equal(catalog.skills[0].title, "Major 7ths");
assert.deepEqual(Array.from(catalog.skills[0].pages), [5]);
assert.deepEqual(Array.from(catalog.skills[36].pages), [29, 30]);
assert.equal(catalog.skills[60].title, "Blues in C · Formats a/b");
assert.deepEqual(Array.from(catalog.skills[116].pages), [145, 146, 147]);
assert.equal(catalog.skills[122].title, "Diminished Substitution · Format 2 · Transposition 3");
assert.deepEqual(Array.from(catalog.skills[122].pages), [154]);
assert.deepEqual(Array.from(catalog.referenceSections.at(-1).pages), [155, 156, 157, 158]);

const scaleModel = score.build({ mode:"scale", keyId:"C", scaleType:"major", hand:"both", tempo:60 });
assert.equal(scaleModel.pages.length, 1);
assert.equal(scaleModel.pages[0].up.right.length, 15, "두 옥타브 상행은 15개 음이어야 합니다.");
assert.equal(scaleModel.pages[0].down.left.length, 15, "두 옥타브 하행은 15개 음이어야 합니다.");
assert.equal(scaleModel.pages[0].up.right[0].finger, 1);
assert.equal(scaleModel.pages[0].keyLabel, "C");

const cSharpMinor = score.build({ mode:"scale", keyId:"Db", scaleType:"naturalMinor", hand:"both", tempo:60 });
assert.equal(cSharpMinor.pages[0].keyLabel, "C♯", "D♭ 장조와 짝을 이루는 단음계는 C♯로 표기해야 합니다.");
assert.equal(cSharpMinor.pages[0].keySignature, "E");
assert.match(cSharpMinor.pages[0].up.right[0].key, /^c#/);

const fSharpMinor = score.build({ mode:"scale", keyId:"Gb", scaleType:"harmonicMinor", hand:"both", tempo:60 });
assert.equal(fSharpMinor.pages[0].keyLabel, "F♯");

const gSharpMinor = score.build({ mode:"scale", keyId:"Ab", scaleType:"melodicMinor", hand:"both", tempo:60 });
assert.equal(gSharpMinor.pages[0].keyLabel, "G♯");

const skill2 = score.build({ mode:"voicing", skillId:2, tempo:120 });
assert.equal(skill2.pages.length, 1);
assert.equal(skill2.pages[0].groups.length, 12, "Skill 2는 12개 조를 모두 한 악보에 조판해야 합니다.");
assert.deepEqual(Array.from(skill2.pages[0].groups[0].right, (note) => note.midi), [60, 64, 67, 70]);
assert.equal(skill2.pages[0].groups[0].left[0].midi, 48);

const skill21 = score.build({ mode:"voicing", skillId:21, tempo:120 });
assert.equal(skill21.pages.length, 2, "다이어토닉 7화음의 상행·하행을 빠짐없이 조판해야 합니다.");
assert.equal(skill21.pages.flatMap((page) => page.groups).length, 15);

const skill117 = score.build({ mode:"voicing", skillId:117, tempo:96 });
assert.ok(skill117.pages.length >= 1, "고급 폴리코드 단계도 새 악보를 생성해야 합니다.");
assert.ok(skill117.audioGroups.length > 12);

assert.equal(fs.existsSync(path.join(root, "assets", "scores")), false, "원본 PDF 스캔 이미지를 사이트 자산으로 남기지 않습니다.");
const samples = fs.readdirSync(path.join(root, "assets", "piano")).filter((name) => name.endsWith(".ogg"));
assert.equal(samples.length, 9, "샘플 피아노 음원 9개를 사용해야 합니다.");

console.log("piano engraved-score contracts passed");
