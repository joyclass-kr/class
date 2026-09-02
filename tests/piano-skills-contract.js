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
const voicingSource = fs.readFileSync(path.join(root, "voicing-source-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);
vm.runInNewContext(catalogSource, sandbox);
vm.runInNewContext(voicingSource, sandbox);
vm.runInNewContext(engraving, sandbox);
const data = sandbox.window.PianoSkillsData;
const catalog = sandbox.window.PianoSourceCatalog;
const score = sandbox.window.PianoEngraving;
const bodyHtml = html.slice(html.indexOf("<body"));

assert.match(html, /<title>Piano Scales · Voicings<\/title>/);
assert.doesNotMatch(bodyHtml, /Piano Scales · Voicings|Fingering과 Voicing 단계 연습/, "중복 site title과 subtitle을 화면에 표시하면 안 됩니다.");
assert.doesNotMatch(html, /class="app-header"|class="app-title"/, "상단 전용 title header를 만들면 안 됩니다.");
assert.match(html, /class="workspace-nav"[\s\S]*class="back-link"[\s\S]*class="mode-tabs"[\s\S]*id="midiButton"/, "Back, mode tabs, MIDI를 한 줄 navigation에 배치해야 합니다.");
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
assert.match(html, /voicing-source-data\.js/);
assert.doesNotMatch(html, /scoreImage|score-renderer\.js|assets\/scores|scaleKeySelect|scaleTypeSelect|handSelect|skillSelect/);
assert.doesNotMatch(html, /ENGRAVED SCORE|SCALE SCORE|새로 조판/);
assert.match(html, /Scales · Fingering/);
assert.match(html, /Jazz Voicings 1–123/);
assert.equal(fs.existsSync(path.join(root, "score-renderer.js")), false);
assert.match(html, /화면 건반은 mouse·touch용 2-octave 입력 건반/);
assert.match(html, /Mouse·touch와 MIDI 입력용 축소 건반/);

assert.match(app, /navigator\.requestMIDIAccess/);
assert.match(app, /0x90/);
assert.match(app, /createElement\("button"\)/, "화면 건반은 직접 누를 수 있는 button이어야 합니다.");
assert.match(app, /pointerdown/, "화면 건반은 mouse와 touch pointer 입력을 받아야 합니다.");
assert.match(app, /activateVirtualNote/, "화면 건반도 MIDI와 같은 연습 판정을 사용해야 합니다.");
assert.match(app, /PianoEngraving\.build/);
assert.match(app, /PianoEngraving\.render/);
assert.match(app, /SCALE_KEY_GROUPS/);
assert.match(app, /renderVoicingChoices/);
assert.match(app, /chapterSummary\.textContent = module\.summary/);
assert.doesNotMatch(app, /assets\/scores|scoreImage|원본 악보|scaleKeySelect|scaleTypeSelect|handSelect|skillSelect|새로 조판/);

assert.match(engraving, /Renderer\.Backends\.SVG/);
assert.match(engraving, /new VF\.Stave/);
assert.match(engraving, /new VF\.StaveNote/);
assert.match(engraving, /new VF\.Beam\(group\)/);
assert.match(engraving, /buildFingeringBeams/);
assert.match(engraving, /beams\.push\.apply\(beams, buildFingeringBeams[\s\S]*rightVoice\.draw[\s\S]*leftVoice\.draw[\s\S]*beams\.forEach/, "빔을 음표보다 먼저 등록하고 각 손을 해당 Staff에 그려 8분음표 꼬리가 중복되지 않아야 합니다.");
assert.match(engraving, /breakBeforeThumb/);
assert.match(engraving, /beamGroups[\s\S]*next\.unshift[\s\S]*previous\.push[\s\S]*new VF\.Beam/, "한 음짜리 eighth-note group을 인접 beam에 합쳐 flag를 섞지 않아야 합니다.");
assert.match(engraving, /SCALE_ROOT_NAMES/);
assert.match(engraving, /SCALE_ROOT_MIDIS/, "원본의 조별 시작 register map을 사용해야 합니다.");
assert.match(engraving, /addClef\("bass"\)/, "Left Hand는 Bass Clef로 조판해야 합니다.");
assert.match(engraving, /StaveConnector\.type\.BRACE/, "Both Hands는 Grand Staff로 연결해야 합니다.");
assert.match(engraving, /Left Hand · Bass Clef/, "선택한 손에 맞는 clef 안내를 표시해야 합니다.");
assert.match(engraving, /Ascending/);
assert.match(engraving, /Descending/);
assert.doesNotMatch(engraving, /"상행"|"하행"|"양손 두 옥타브"/);
assert.match(engraving, /return buildAdvancedDominantSkill\(skillId\)/);
assert.match(engraving, /buildSourceSkill/);
assert.match(engraving, /renderSourceChordPage/);
assert.doesNotMatch(sampler, /createOscillator/, "피아노 샘플 실패를 합성음으로 대체하면 안 됩니다.");
assert.match(sampler, /Math\.sqrt\(size\)/, "화음의 음 수에 따라 샘플 볼륨을 정규화해야 합니다.");
assert.match(sampler, /playTimeline/);

assert.match(css, /min-height:\s*44px/);
assert.doesNotMatch(css, /\.app-header|\.app-title/, "상단 전용 title header CSS를 남기면 안 됩니다.");
assert.match(css, /\.workspace-nav[\s\S]*grid-template-columns:\s*auto minmax\(0, 1fr\) auto/);
assert.match(css, /\.choice-button[\s\S]*min-height:\s*44px/);
assert.match(css, /\.score-surface svg[\s\S]*width:\s*100%\s*!important/);
assert.match(css, /\.score-viewport[\s\S]*overflow:\s*hidden/);
assert.match(css, /\.score-surface[\s\S]*min-width:\s*0/);
assert.match(css, /@media \(min-width: 1024px\) and \(max-height: 850px\)/);
assert.match(css, /@media \(max-width: 820px\)/);
assert.match(css, /@media \(max-width: 620px\)/);
assert.match(css, /\.piano-key[\s\S]*pointer-events:\s*auto/);
assert.match(css, /\.mini-keyboard[\s\S]*touch-action:\s*none/);

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
assert.deepEqual(Array.from(catalog.skills[47].pages), [59, 60], "Skill 48 continuation page를 포함해야 합니다.");
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

const sourceScaleRootMidis = {
    C:60, D:62, E:64, F:65,
    G:55, A:57, B:59,
    Db:61, Eb:63,
    Gb:54, Ab:56, Bb:58
};
Object.entries(sourceScaleRootMidis).forEach(([keyId, rightRoot]) => {
    Object.keys(data.scaleTypes).forEach((scaleType) => {
        const both = score.build({ mode:"scale", keyId, scaleType, hand:"both", tempo:60 });
        const right = score.build({ mode:"scale", keyId, scaleType, hand:"right", tempo:60 });
        const left = score.build({ mode:"scale", keyId, scaleType, hand:"left", tempo:60 });
        const page = both.pages[0];

        assert.equal(page.up.right[0].midi, rightRoot, `${keyId} ${scaleType} Right Hand는 원본 register에서 시작해야 합니다.`);
        assert.equal(page.up.right[14].midi, rightRoot + 24);
        assert.equal(page.down.right[0].midi, rightRoot + 24);
        assert.equal(page.down.right[14].midi, rightRoot);

        assert.equal(page.up.left[0].midi, rightRoot - 12, `${keyId} ${scaleType} Left Hand는 Right Hand보다 one octave 아래에서 시작해야 합니다.`);
        assert.equal(page.up.left[14].midi, rightRoot + 12);
        assert.equal(page.down.left[0].midi, rightRoot + 12);
        assert.equal(page.down.left[14].midi, rightRoot - 12);

        assert.deepEqual(Array.from(right.audioGroups[0]), [rightRoot]);
        assert.deepEqual(Array.from(left.audioGroups[0]), [rightRoot - 12]);
        assert.deepEqual(Array.from(both.audioGroups[0]), [rightRoot - 12, rightRoot]);
    });
});

const cSharpMinor = score.build({ mode:"scale", keyId:"Db", scaleType:"naturalMinor", hand:"both", tempo:60 });
assert.equal(cSharpMinor.pages[0].keyLabel, "C♯", "D♭ 장조와 짝을 이루는 단음계는 C♯로 표기해야 합니다.");
assert.equal(cSharpMinor.pages[0].keySignature, "E");
assert.match(cSharpMinor.pages[0].up.right[0].key, /^c#/);

const fSharpMinor = score.build({ mode:"scale", keyId:"Gb", scaleType:"harmonicMinor", hand:"both", tempo:60 });
assert.equal(fSharpMinor.pages[0].keyLabel, "F♯");

const gSharpMinor = score.build({ mode:"scale", keyId:"Ab", scaleType:"melodicMinor", hand:"both", tempo:60 });
assert.equal(gSharpMinor.pages[0].keyLabel, "G♯");

const bFlatMelodic = score.build({ mode:"scale", keyId:"Bb", scaleType:"melodicMinor", hand:"both", tempo:60 });
const bFlatMinorRight = [2,1,2,3,1,2,3,4,1,2,3,1,2,3,4];
const bFlatMinorLeft = [2,1,3,2,1,4,3,2,1,3,2,1,4,3,2];
assert.deepEqual(Array.from(bFlatMelodic.pages[0].up.right, (note) => note.finger), bFlatMinorRight, "B♭ Minor Right Hand 운지는 원본의 두 옥타브 배열과 같아야 합니다.");
assert.deepEqual(Array.from(bFlatMelodic.pages[0].up.left, (note) => note.finger), bFlatMinorLeft, "B♭ Minor Left Hand 운지는 원본의 두 옥타브 배열과 같아야 합니다.");
assert.deepEqual(Array.from(bFlatMelodic.pages[0].down.right, (note) => note.finger), bFlatMinorRight.slice().reverse());

const bFlatMajor = score.build({ mode:"scale", keyId:"Bb", scaleType:"major", hand:"both", tempo:60 });
assert.deepEqual(Array.from(bFlatMajor.pages[0].up.right, (note) => note.finger), [2,1,2,3,4,1,2,3,1,2,3,4,1,2,3], "B♭ Major와 Minor의 Right Hand 운지를 구분해야 합니다.");

Object.keys(data.fingering).forEach((keyId) => {
    Object.keys(data.scaleTypes).forEach((scaleType) => {
        const model = score.build({ mode:"scale", keyId, scaleType, hand:"both", tempo:60 });
        [model.pages[0].up.right, model.pages[0].up.left, model.pages[0].down.right, model.pages[0].down.left].forEach((line) => {
            assert.equal(line.length, 15, `${keyId} ${scaleType} 운지는 손마다 15개여야 합니다.`);
            assert.ok(line.every((note) => note.finger >= 1 && note.finger <= 5), `${keyId} ${scaleType} 운지 번호는 1-5여야 합니다.`);
        });
    });
});

const skill2 = score.build({ mode:"voicing", skillId:2, tempo:120 });
assert.equal(skill2.pages.length, 1);
assert.equal(skill2.pages[0].groups.length, 12, "Skill 2는 검증된 원본 공식으로 12개 조를 한 악보에 조판해야 합니다.");
assert.deepEqual(Array.from(skill2.pages[0].groups[0].right, (note) => note.midi), [60, 64, 67, 70]);
assert.equal(skill2.pages[0].groups[0].left[0].midi, 48);

const skill21 = score.build({ mode:"voicing", skillId:21, tempo:120 });
assert.equal(skill21.pages.length, 2, "다이어토닉 7화음의 상행·하행을 빠짐없이 조판해야 합니다.");
assert.ok(skill21.pages.flatMap((page) => page.systems.flat()).length >= 12);

const skill117 = score.build({ mode:"voicing", skillId:117, tempo:96 });
assert.ok(skill117.pages.length >= 1, "고급 폴리코드 단계도 새 악보를 생성해야 합니다.");
assert.ok(skill117.audioGroups.length > 12);
assert.deepEqual(Array.from(skill117.pages, (page) => page.sourcePage), [145,146,147]);

const skill122 = score.build({ mode:"voicing", skillId:122, tempo:96 });
assert.equal(skill122.pages.length, 1, "Skill 122는 원본의 한 페이지로 조판해야 합니다.");
assert.equal(skill122.pages[0].sourcePage, 153);
assert.equal(skill122.pages[0].systems.flat().length, 16, "Skill 122의 16 measures를 임의 transposition 페이지로 늘리면 안 됩니다.");
assert.deepEqual(
    Array.from(skill122.pages[0].systems.flat(), (measure) => {
        const event = measure.right.concat(measure.left).find((item) => item.label);
        return event ? event.label : null;
    }),
    ["D♭7","G♭Δ","D♭7","G♭Δ","E7","AΔ","E7","AΔ","G7","CΔ","G7","CΔ","B♭7","E♭Δ","B♭7","E♭Δ"],
    "Skill 122 chord symbols는 원본의 네 Dominant-to-Major pairs와 같아야 합니다."
);

const skill85 = score.build({ mode:"voicing", skillId:85, tempo:120 });
assert.equal(skill85.pages[0].audioEvents.length, 22);
assert.equal(skill85.pages[0].systems[0][0].right.find((event) => event.label).label, "CΔ");

const sourceData = sandbox.window.PianoVoicingSourceData;
assert.equal(sourceData.skillCount, 123);
assert.ok(sourceData.measureCount >= 1900);
assert.ok(sourceData.noteCount >= 13000);

assert.equal(fs.existsSync(path.join(root, "assets", "scores")), false, "원본 PDF 스캔 이미지를 사이트 자산으로 남기지 않습니다.");
const samples = fs.readdirSync(path.join(root, "assets", "piano")).filter((name) => name.endsWith(".ogg"));
assert.equal(samples.length, 9, "샘플 피아노 음원 9개를 사용해야 합니다.");

console.log("piano engraved-score contracts passed");
