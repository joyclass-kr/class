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

assert.match(html, /<title>[^<]+<\/title>/);
assert.doesNotMatch(bodyHtml, /Piano Scales · Voicings|Fingering과 Voicing 단계 연습/, "중복 site title과 subtitle을 화면에 표시하면 안 됩니다.");
assert.doesNotMatch(html, /class="app-header"|class="app-title"/, "상단 전용 title header를 만들면 안 됩니다.");
assert.match(html, /class="workspace-nav"[\s\S]*class="back-link"[\s\S]*class="mode-tabs"[\s\S]*id="midiButton"/, "Back, mode tabs, MIDI를 한 줄 navigation에 배치해야 합니다.");
assert.match(html, /id="midiButton"/);
assert.match(html, /id="scoreSurface"/);
assert.match(html, /id="whiteKeyChoices"/);
assert.match(html, /id="exceptionKeyChoices"/);
assert.match(html, /id="blackKeyChoices"/);
assert.match(html, /id="scaleTypeChoices"/);
assert.doesNotMatch(html, /id="handChoices"/);
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
assert.match(engraving, /addClef\("bass"\)/, "Left Hand는 Bass Clef로 조판해야 합니다.");
assert.match(engraving, /StaveConnector\.type\.BRACE/, "Both Hands는 Grand Staff로 연결해야 합니다.");
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
assert.doesNotMatch(css, /\.practice-dock\s*\{[^}]*position:\s*sticky/, "Practice transport must not cover the score on Chromebook or iPad landscape.");
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

const staffScaleRoots = {
    C:[60,36], D:[62,38], E:[64,40], F:[53,41], G:[55,43], A:[57,33], B:[59,35],
    Db:[61,37], Eb:[63,39], Gb:[54,42], Ab:[56,32], Bb:[58,34]
};
Object.entries(staffScaleRoots).forEach(([keyId, roots]) => {
    Object.keys(data.scaleTypes).forEach((scaleType) => {
        const rightRoot = roots[0];
        const leftRoot = keyId === "Ab" && scaleType !== "major" ? 44 : roots[1];
        const model = score.build({ mode:"scale", keyId, scaleType, hand:"both" });
        const page = model.pages[0];
        for (const [side, root, bottom, top] of [["right",rightRoot,30,38],["left",leftRoot,18,26]]) {
            assert.equal(page.up[side][0].midi, root, keyId + " " + scaleType + " " + side);
            assert.equal(page.up[side][14].midi, root + 24);
            assert.equal(page.down[side][0].midi, root + 24);
            assert.equal(page.down[side][14].midi, root);
            for (const note of page.up[side].concat(page.down[side])) {
                const [pitch, octave] = note.key.split("/");
                const step = Number(octave) * 7 + "cdefgab".indexOf(pitch[0]);
                const ledgers = Math.floor(Math.max(bottom-step, step-top, 0) / 2);
                assert.ok(ledgers <= 3, keyId + " " + side + ": too many ledger lines at " + note.key);
            }
        }
        const right = page.up.right.concat(page.down.right.slice(1));
        const left = page.up.left.concat(page.down.left.slice(1));
        model.audioGroups.forEach((group, i) => assert.deepEqual(Array.from(group), [left[i].midi,right[i].midi]));
    });
});

const skill6 = score.build({ mode:"voicing", skillId:6 });
const dbSus4 = skill6.pages.flatMap((p) => p.groups || []).find((group) => group.label === "D♭7sus4");
assert.equal(dbSus4.right.at(-1).key, "cb/5", "D♭7sus4의 flat seventh는 C♭5로 표기해야 합니다.");

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

const sourceFingeringSnapshots = {
    C:{ major:["123123412312345","543213214321321"], minor:["123123412312345","543213214321321"] },
    D:{ major:["123123412312345","543213214321321"], minor:["123123412312345","543213214321321"] },
    E:{ major:["123123412312345","543213214321321"], minor:["123123412312345","543213214321321"] },
    G:{ major:["123123412312345","543213214321321"], minor:["123123412312345","543213214321321"] },
    A:{ major:["123123412312345","543213214321321"], minor:["123123412312345","543213214321321"] },
    F:{ major:["123412341234123","543213214321321"], minor:["123412341234123","543213214321321"] },
    B:{ major:["123123412312345","432143214321432"], minor:["123123412312345","432143214321432"] },
    Db:{ major:["231234123123412","321432132143213"], minor:["231234123123412","321432132143213"] },
    Eb:{ major:["312341231234123","321432132143213"], minor:["212341231234123","214321321432132"] },
    Gb:{ major:["234123123412312","432132143213214"], minor:["234123123412312","432132143213214"] },
    Ab:{ major:["341231234123123","321432132143213"], minor:["231231234123123","321321432132143"] },
    Bb:{ major:["212341231234123","321432132143213"], minor:["212312341231234","213214321321432"] }
};
Object.entries(sourceFingeringSnapshots).forEach(([keyId, expected]) => {
    Object.entries(expected).forEach(([quality, hands]) => {
        assert.equal(data.fingering[keyId][quality].right.join(""), hands[0], `${keyId} ${quality} Right Hand fingering은 원본과 같아야 합니다.`);
        assert.equal(data.fingering[keyId][quality].left.join(""), hands[1], `${keyId} ${quality} Left Hand fingering은 원본과 같아야 합니다.`);
    });
});

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
assert.equal(skill21.pages.length, 1, "Diatonic 7th Chords의 Ascending·Descending을 한 source page에 유지해야 합니다.");
assert.equal(skill21.pages[0].systems.length, 2, "Skill 21은 원본처럼 Ascending·Descending 두 systems여야 합니다.");
assert.equal(skill21.audioGroups.length, 15, "Skill 21은 root octave를 포함한 15 attacks여야 합니다.");
assert.deepEqual(
    Array.from(skill21.pages[0].systems.flat().flatMap((measure) =>
        measure.right.concat(measure.left).filter((event) => event.label).map((event) => event.label)
    )),
    ["CΔ","Dm7","Em7","FΔ","G7","Am7","Bø","CΔ","Bø","Am7","G7","FΔ","Em7","Dm7","CΔ"]
);

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


const sourceRepairExpectations = new Map([
    [21,{ attacks:15, systems:2 }],
    [25,{ attacks:15, systems:2 }],
    [26,{ attacks:15, systems:2 }],
    [27,{ attacks:15, systems:2 }],
    [45,{ attacks:84, systems:12 }],
    [47,{ attacks:180, systems:12 }],
    [48,{ attacks:36, systems:6 }],
    [55,{ attacks:36, systems:6 }],
    [118,{ attacks:40, systems:4 }]
]);
sourceRepairExpectations.forEach((expected, skillId) => {
    const model = score.build({ mode:"voicing", skillId, tempo:120 });
    const systems = model.pages.flatMap((page) => page.systems);
    const measures = systems.flat();
    assert.equal(systems.length, expected.systems, `Skill ${skillId} source systems를 원본 줄 수로 복원해야 합니다.`);
    assert.equal(model.audioGroups.length, expected.attacks, `Skill ${skillId} playback attacks를 원본 수와 맞춰야 합니다.`);
    assert.ok(measures.every((measure) =>
        measure.right.some((event) => !event.rest) && measure.left.some((event) => !event.rest)
    ), `Skill ${skillId}의 분리된 treble/bass fragments를 Grand Staff로 다시 결합해야 합니다.`);
    assert.ok(measures.every((measure) =>
        measure.right.concat(measure.left).every((event) =>
            event.rest || new Set(event.midis).size === event.midis.length
        )
    ), `Skill ${skillId}에서 duplicated noteheads를 제거해야 합니다.`);
    assert.ok(measures.every((measure) =>
        measure.right.concat(measure.left).every((event) => !event.rest)
    ), `Skill ${skillId}에서 OMR spurious rests를 제거해야 합니다.`);
});

for (let skillId = 21; skillId <= 123; skillId += 1) {
    const model = score.build({ mode:"voicing", skillId, tempo:120 });
    model.pages.flatMap((page) => page.systems).flat().forEach((measure) => {
        measure.right.concat(measure.left).forEach((event) => {
            if (event.rest) return;
            assert.equal(event.keys.length, event.midis.length, `Skill ${skillId} key/MIDI shape가 같아야 합니다.`);
            assert.equal(new Set(event.midis).size, event.midis.length, `Skill ${skillId} chord에 duplicated MIDI가 없어야 합니다.`);
        });
    });
}

const sourceData = sandbox.window.PianoVoicingSourceData;
assert.equal(sourceData.skillCount, 123);
assert.ok(sourceData.measureCount >= 1900);
assert.ok(sourceData.noteCount >= 13000);

assert.equal(fs.existsSync(path.join(root, "assets", "scores")), false, "원본 PDF 스캔 이미지를 사이트 자산으로 남기지 않습니다.");
const samples = fs.readdirSync(path.join(root, "assets", "piano")).filter((name) => name.endsWith(".ogg"));
assert.equal(samples.length, 9, "샘플 피아노 음원 9개를 사용해야 합니다.");

console.log("piano engraved-score contracts passed");
