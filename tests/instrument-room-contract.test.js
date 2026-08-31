const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'learning', 'arts', 'instrument-room');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const worklet = fs.readFileSync(path.join(root, 'instrument-worklet-v2.js'), 'utf8');
const detailSource = fs.readFileSync(path.join(root, 'instrument-details.js'), 'utf8');
const detailContext = { window: {} };
require('node:vm').createContext(detailContext);
require('node:vm').runInContext(detailSource, detailContext);
const instrumentDetails = detailContext.window.INSTRUMENT_DETAILS;

test('corrects guitar and bass artwork orientation in the stage and detail views', () => {
  assert.match(css, /\.stage-bass \.instrument-artwork, \.stage-guitar \.instrument-artwork \{[^}]*scale: -1 1;/);
  assert.match(css, /\.detail-artwork-frame > img\.corrected-handedness \{ scale: -1 1; \}/);
  assert.match(app, /elements\.detailArtwork\.classList\.toggle\("corrected-handedness"/);
});

test('keeps the instrument details button inside the control panel flow', () => {
  assert.match(html, /<aside class="control-panel"[^>]*>[\s\S]*?<div class="console-head">[\s\S]*?id="instrumentInfoButton"/);
  assert.match(css, /\.control-panel \{[^}]*display: grid;[^}]*grid-template-rows: auto minmax\(0,1fr\);/);
  assert.doesNotMatch(css, /\.instrument-info-button \{ position: fixed;/);
});
test('uses dedicated rooms for the nine primary instrument groups', () => {
  for (const family of ['keyboard', 'guitar', 'bass', 'drums', 'strings', 'woodwind', 'brass', 'percussion', 'korean']) {
    assert.match(html, new RegExp(`data-family="${family}"`));
  }
});

test('orders instrument families from Korean traditions to keyboard instruments', () => {
  const order = ['korean', 'strings', 'woodwind', 'brass', 'percussion', 'drums', 'bass', 'guitar', 'keyboard'];
  const positions = order.map((family) => html.indexOf('data-family="' + family + '"'));
  assert.equal(positions.every((position) => position >= 0), true);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(html, /class="active"[^>]*data-family="korean"[^>]*aria-selected="true"/);
  assert.match(app, /selectFamily\("korean"\)/);
});

test('keeps the instrument header compact and hides normal audio status', () => {
  assert.doesNotMatch(html, /LOCAL PHYSICAL INSTRUMENTS|level-bars/);
  assert.doesNotMatch(app, /소리 준비됨/);
  assert.match(html, /id="audioButton"[^>]*>소리 켜기<\/button>/);
  assert.match(css, /\.topbar \{ height: 50px;/);
  assert.match(app, /audioButton\.classList\.add\("hidden"\)/);
  assert.match(app, /audioButton\.classList\.remove\("hidden"\)/);
});

test('keyboard library matches the twelve supplied keyboard instruments', () => {
  for (const model of [
    'concert-grand', 'upright-piano', 'harpsichord', 'tine-ep', 'reed-ep', 'clavinet',
    'fm-dx7', 'jd800', 'hybrid-la-rhodes', 'hybrid-la-mks', 'hammond-organ', 'pipe-organ'
  ]) {
    assert.match(app, new RegExp(`id: "${model}"`));
  }
  assert.match(app, /AP · ACOUSTIC/);
  assert.match(app, /EP · TINE/);
  assert.match(app, /HYBRID · LA/);
  assert.match(app, /ORGAN · TONEWHEEL/);
});

test('keyboard models use compact per-note Ogg multisamples with recorded range metadata', () => {
  const fullRange = ['concert-grand', 'upright-piano', 'fender-rhodes', 'wurlitzer', 'clavinet', 'fm-dx7', 'jd800', 'hybrid-la-rhodes', 'hybrid-la-mks'];
  for (const folder of fullRange) {
    const sampleRoot = path.join(root, 'assets', 'audio', folder);
    const samples = fs.readdirSync(sampleRoot).filter((name) => name.endsWith('.ogg')).sort();
    const totalBytes = samples.reduce((sum, name) => sum + fs.statSync(path.join(sampleRoot, name)).size, 0);
    assert.equal(samples.length, 88, folder);
    assert.equal(samples[0], '001_a0.ogg', folder);
    assert.equal(samples.at(-1), '088_c8.ogg', folder);
    assert.ok(totalBytes < 6 * 1024 * 1024, folder);
  }
  for (const [folder, count, first, last] of [
    ['harpsichord', 39, '028_c3.ogg', '066_d6.ogg'],
    ['hammond-organ', 61, '016_c2.ogg', '076_c7.ogg'],
    ['pipe-organ', 61, '016_c2.ogg', '076_c7.ogg']
  ]) {
    const sampleRoot = path.join(root, 'assets', 'audio', folder);
    const samples = fs.readdirSync(sampleRoot).filter((name) => name.endsWith('.ogg')).sort();
    const totalBytes = samples.reduce((sum, name) => sum + fs.statSync(path.join(sampleRoot, name)).size, 0);
    assert.equal(samples.length, count, folder);
    assert.equal(samples[0], first, folder);
    assert.equal(samples.at(-1), last, folder);
    assert.ok(totalBytes < 6 * 1024 * 1024, folder);
  }
  assert.match(app, /fileMin: 21/);
  assert.match(app, /GRAND_SAMPLE_STEP = 1/);
  assert.match(app, /KEYBOARD_SAMPLE_CACHE_LIMIT = 24/);
  assert.match(app, /range: \[21, 108\]/);
  assert.match(app, /state\.family === "keyboard"/);
  assert.match(app, /\(state\.keyboardOctave \+ 1\) \* 12/);
});

test('plucked keyboards decay without an ADSR sustain stage', () => {
  assert.match(app, /sampleSet === "clavinet"/);
  assert.match(app, /sampleSet === "harpsichord"/);
  assert.match(app, /gain\.gain\.exponentialRampToValueAtTime\(\.0001, now \+ decay\)/);
  assert.match(app, /NO_PIANO_SUSTAIN_MODELS = new Set\(\["harpsichord", "clavinet", "hammond-organ", "pipe-organ"\]\)/);
  assert.match(app, /event\.code === "Space" && supportsPianoSustain\(\)/);
});
test('completed orchestral renders use compact note-grid Ogg samples', () => {
  for (const [folder, count, first, last] of [
    ['flute', 37, '040_c4.ogg', '076_c7.ogg'],
    ['oboe', 34, '038_as3.ogg', '071_g6.ogg'],
    ['trumpet', 46, '032_e3.ogg', '077_cs7.ogg'],
    ['clarinet', 39, '030_d3.ogg', '068_e6.ogg'],
    ['bass-clarinet', 52, '024_gs2.ogg', '075_b6.ogg'],
    ['piccolo-flute', 37, '052_c5.ogg', '088_c8.ogg'],
    ['french-horn', 47, '027_b2.ogg', '073_a6.ogg'],
    ['english-horn', 32, '032_e3.ogg', '063_b5.ogg'],
    ['soprano-sax', 42, '033_f3.ogg', '074_as6.ogg'],
    ['alto-trombone', 44, '025_a2.ogg', '068_e6.ogg'],
    ['alto-sax', 47, '026_as2.ogg', '072_gs6.ogg'],
    ['tenor-sax', 50, '033_f3.ogg', '082_fs7.ogg'],
    ['baritone-sax', 56, '025_a2.ogg', '080_e7.ogg'],
    ['bassoon', 42, '014_as1.ogg', '055_ds5.ogg'],
    ['contrabassoon', 49, '012_gs1.ogg', '060_gs5.ogg'],
    ['tenor-trombone', 46, '032_e3.ogg', '077_cs7.ogg'],
    ['bass-trombone', 58, '015_b1.ogg', '072_gs6.ogg'],
    ['flugelhorn', 41, '032_e3.ogg', '072_gs6.ogg'],
    ['euphonium', 55, '020_e2.ogg', '074_as6.ogg'],
    ['bass-tuba', 57, '020_e2.ogg', '076_c7.ogg'],
    ['viola', 61, '028_c3.ogg', '088_c8.ogg'],
    ['viola-pizz', 42, '028_c3.ogg', '069_f6.ogg'],
    ['violin', 54, '035_g3.ogg', '088_c8.ogg'],
    ['violin-pizz', 46, '035_g3.ogg', '080_e7.ogg'],
    ['cello', 61, '028_c3.ogg', '088_c8.ogg'],
    ['cello-pizz', 26, '028_c3.ogg', '053_cs5.ogg'],
    ['upright-bass', 57, '032_e3.ogg', '088_c8.ogg'],
    ['upright-bass-pizz', 57, '032_e3.ogg', '088_c8.ogg'],
    ['timpani', 18, '016_c2.ogg', '033_f3.ogg'],
    ['marimba', 61, '016_c2.ogg', '076_c7.ogg'],
    ['vibraphone', 37, '033_f3.ogg', '069_f6.ogg'],
    ['xylophone', 42, '028_c3.ogg', '069_f6.ogg'],
    ['glockenspiel', 17, '059_g5.ogg', '075_b6.ogg'],
    ['p-bass-finger', 36, '008_e1.ogg', '043_ds4.ogg'],
    ['p-bass-pick', 36, '008_e1.ogg', '043_ds4.ogg'],
    ['p-bass-slap', 35, '008_e1.ogg', '042_d4.ogg'],
    ['j-bass-finger', 35, '008_e1.ogg', '042_d4.ogg'],
    ['j-bass-pick', 35, '008_e1.ogg', '042_d4.ogg'],
    ['j-bass-slap', 35, '008_e1.ogg', '042_d4.ogg'],
    ['active-bass-finger', 40, '003_b0.ogg', '042_d4.ogg'],
    ['active-bass-pick', 40, '003_b0.ogg', '042_d4.ogg'],
    ['active-bass-slap', 40, '003_b0.ogg', '042_d4.ogg'],
    ['fretless-bass-finger', 35, '008_e1.ogg', '042_d4.ogg'],
    ['fretless-bass-pick', 35, '008_e1.ogg', '042_d4.ogg'],
    ['fretless-bass-slap', 35, '008_e1.ogg', '042_d4.ogg'],
    ['guitar-s-clean', 47, '020_e2.ogg', '066_d6.ogg'],
    ['guitar-s-blues', 47, '020_e2.ogg', '066_d6.ogg'],
    ['guitar-s-funk', 47, '020_e2.ogg', '066_d6.ogg'],
    ['guitar-s-rock', 47, '020_e2.ogg', '066_d6.ogg'],
    ['guitar-superstrat', 45, '020_e2.ogg', '064_c6.ogg'],
    ['guitar-hollow', 46, '020_e2.ogg', '065_cs6.ogg'],
    ['guitar-nylon', 45, '020_e2.ogg', '064_c6.ogg'],
    ['harp', 78, '005_cs1.ogg', '082_fs7.ogg'],
    ['piccolo-trumpet', 49, '032_e3.ogg', '080_e7.ogg']
  ]) {
    const sampleRoot = path.join(root, 'assets', 'audio', folder);
    const samples = fs.readdirSync(sampleRoot).filter((name) => name.endsWith('.ogg')).sort();
    assert.equal(samples.length, count, folder);
    assert.equal(samples[0], first, folder);
    assert.equal(samples.at(-1), last, folder);
  }
  assert.match(app, /isSampledPiano\(\) \|\| state\.instrument === "piano"/);
  assert.match(app, /sampleSet === "hammond-organ"[\s\S]*?"tuba"/);
  assert.match(app, /"contrabassoon"[\s\S]*?"flugelhorn"[\s\S]*?"euphonium"/);
  assert.match(app, /ONE_SHOT_SAMPLE_SETS = new Set\(\["timpani", "glockenspiel", "marimba", "vibraphone", "xylophone", "harp"\]\)/);
  assert.match(app, /const peak = Math\.min\(12, velocityGain \* calibratedGain\)/);
  assert.match(app, /const calibratedGain = Math\.pow/);
  assert.match(app, /gainDb: -5\.68/);
  assert.match(app, /gainDb: 20\.0/);
  assert.match(app, /\["violin", "viola", "cello", "upright-bass"\]\.includes\(state\.currentModel\.id\) && state\.articulation === "pizzicato"/);
  assert.match(app, /\[\["sustain", "활긋기"\], \["pizzicato", "피치카토"\]\]/);
});

test('keyboard and electronic machines use non-interactive premium artwork', () => {
  for (const asset of [
    'keyboard-concert-grand.webp', 'keyboard-upright-piano.webp',
    'keyboard-harpsichord.webp', 'keyboard-tine-ep.webp', 'keyboard-reed-ep.webp',
    'keyboard-clavinet.webp', 'keyboard-fm-dx7.webp', 'keyboard-jd800.webp',
    'keyboard-grand-tine-duo.webp', 'keyboard-ballad-digital.webp',
    'keyboard-tonewheel-organ.webp', 'keyboard-pipe-organ.webp', 'drum-808-machine.webp',
    'drum-linn-machine.webp'
  ]) {
    assert.match(app, new RegExp(asset.replace('.', '\\.')));
    assert.equal(fs.existsSync(path.join(root, 'assets', 'instruments', asset)), true, asset);
  }
  assert.match(app, /model\.art \|\| hasLayers/);
  assert.match(app, /\(model\.stage === "machine" \|\| model\.stage === "linn"\) && !model\.art/);
  assert.match(css, /\.instrument-visual\.has-artwork \.studio-stage::before/);
  assert.match(css, /pointer-events: none/);
});

test('percussion library includes dedicated kits and essential orchestral instruments', () => {
  for (const model of ['rock-kit', 'metal-kit', 'pop-kit', 'jazz-kit', 'funk-kit', 'timpani', 'glockenspiel', 'marimba', 'vibraphone', 'xylophone', 'orchestral-percussion', 'drum-808', 'linn-machine', 'samulnori']) {
    assert.match(app, new RegExp(`id: "${model}"`));
  }
  assert.match(app, /renderMachine/);
  assert.doesNotMatch(app, /renderKitHotspots|triggerVisualDrum|kitHotspots/);
  assert.doesNotMatch(html, /kitHotspots|inputHint/);
  for (const asset of ['drum-rock-kit.webp', 'drum-metal-kit.webp', 'drum-pop-kit.webp', 'drum-jazz-kit.webp', 'drum-funk-kit.webp']) {
    assert.match(app, new RegExp(asset.replace('.', '\\.')));
  }
  assert.match(app, /id: "midtom"/);
  assert.match(app, /id: "subtom"/);
  assert.match(app, /function activeDrums/);
  assert.match(app, /"jazz-kit": ACOUSTIC_DRUM_ARTICULATIONS\.concat\(\["hightom", "lowtom", "crash", "ride", "ridebell"\]\)/);
  assert.match(app, /"metal-kit": ACOUSTIC_DRUM_ARTICULATIONS\.concat\(\["hightom", "midtom", "lowtom", "subtom", "crash", "ride", "ridebell"\]\)/);
  assert.match(app, /drums\.length >= 9/);
  assert.match(worklet, /subtom: \{ family: "membrane", base: 72/);
  assert.match(css, /\.drum-pads\.extended/);
  for (const folder of ['drums-rock', 'drums-metal', 'drums-pop', 'drums-jazz', 'drums-funk', 'drums-linn', 'drums-808']) {
    const files = fs.readdirSync(path.join(root, 'assets', 'audio', folder)).filter((name) => name.endsWith('.ogg')).sort();
    assert.equal(files.length, 16, folder);
    assert.equal(files[0], 'clap.ogg', folder);
    assert.equal(files.at(-1), 'subtom.ogg', folder);
  }
  for (const id of ['ghost', 'sidestick', 'rimshot', 'clap', 'pedalhat', 'openhat', 'ridebell']) {
    assert.match(app, new RegExp(`id: "${id}"`));
  }
  assert.match(app, /ACOUSTIC_DRUM_ARTICULATIONS = \["kick", "snare", "ghost", "sidestick", "rimshot", "hat", "pedalhat", "openhat"\]/);
  assert.match(app, /ELECTRONIC_DRUM_ARTICULATIONS = \["kick", "snare", "rimshot", "clap", "hat", "pedalhat", "openhat"\]/);
  assert.doesNotMatch(app, /ELECTRONIC_DRUM_ARTICULATIONS\.concat\([^\r\n]*ridebell/);
  assert.match(app, /function chokeOpenHat/);
  assert.match(app, /\["hat", "pedalhat", "openhat"\]\.includes\(id\)/);
  assert.match(app, /const DRUM_SAMPLE_SETS/);
  assert.match(app, /function playSampledDrum/);
  assert.match(app, /preloadDrumSamples\(\)/);
  assert.match(app, /gainDb = Number\(current\.gainDb\[id\]/);
  assert.match(css, /#drumControls\.sampled-kit label \{ display: none; \}/);
});

test('string and expressive families expose virtual-instrument presentation', () => {
  for (const model of ['p-bass', 's-style', 'metal-seven', 'upright-bass', 'violin', 'harp', 'flute', 'contrabassoon', 'trumpet', 'piccolo-trumpet', 'flugelhorn', 'euphonium']) {
    assert.match(app, new RegExp(`id: "${model}"`));
  }
  assert.match(html, /id="classicalControls"/);
  assert.match(html, /id="guitarFxControls"/);
  assert.match(html, /id="soundPresetGroup"/);
  assert.match(html, /id="physicalStringControls"/);
  assert.doesNotMatch(html, /expression-tabs|expression-actions/);
  assert.match(app, /\[\["finger", "핑거"\], \["pick", "피크"\], \["slap", "슬랩"\]\]/);
  assert.match(app, /\[\["clean", "클린"\], \["blues", "블루스"\], \["funk", "펑크"\], \["rock", "록"\]\]/);
  assert.match(css, /\.classical-render/);
  assert.match(css, /\.machine-deck/);
});

test('project-bound instrument artwork exists', () => {
  for (const asset of ['bass-p-style.png', 'bass-j-style.png', 'bass-active-five.png', 'bass-fretless.png', 'guitar-s-style.png', 'guitar-metal-seven.png', 'guitar-hollowbody-jazz.png', 'guitar-dreadnought.png', 'guitar-classical-nylon.png', 'drum-rock-kit.webp', 'drum-metal-kit.webp', 'drum-pop-kit.webp', 'drum-jazz-kit.webp', 'drum-funk-kit.webp', 'violin-expressive-v2.webp', 'viola-expressive-v2.webp', 'cello-expressive.png', 'double-bass-expressive.png', 'flute-expressive.png', 'oboe-expressive.png', 'clarinet-expressive.png', 'bassoon-expressive.png', 'contrabassoon-expressive.webp', 'alto-sax-expressive.png', 'soprano-sax-expressive-v2.webp', 'tenor-sax-expressive-v2.webp', 'baritone-sax-expressive-v2.webp', 'bass-clarinet-expressive-v2.webp', 'piccolo-flute-expressive-v2.webp', 'english-horn-expressive-v2.webp', 'trumpet-expressive.png', 'flugelhorn-expressive.webp', 'euphonium-expressive.webp', 'trombone-expressive.png', 'alto-trombone-expressive-v2.webp', 'bass-trombone-expressive-v2.webp', 'french-horn-expressive.png', 'tuba-expressive-v2.webp', 'harp-concert-v2.webp', 'piccolo-trumpet-expressive.webp', 'timpani-bank.png', 'glockenspiel-concert.png', 'marimba-concert.png', 'vibraphone-concert.png', 'xylophone-compact-concert.webp', 'orchestral-percussion-station.png', 'korean-gayageum.png', 'korean-geomungo.png', 'korean-haegeum.png', 'korean-ajaeng.png', 'korean-daegeum.png', 'korean-hyangpiri.png', 'korean-taepyeongso.png', 'korean-samulnori-station.png']) {
    assert.equal(fs.existsSync(path.join(root, 'assets', 'instruments', asset)), true, asset);
  }
});

test('range controls keep computer-keyboard performance available', () => {
  assert.match(app, /event\.target\.type !== "range"/);
  assert.match(app, /id: "viola"[\s\S]*?viola-expressive-v2\.webp/);
});

test('shows actual-size guidance and keeps related instruments at different visual scales', () => {
  assert.match(html, /id="scaleGuide"/);
  assert.match(html, /id="scaleValue"/);
  assert.match(css, /--object-scale/);
  assert.match(app, /전체 높이 약 180 cm/);
  assert.match(app, /전체 길이 약 59 cm/);
  assert.match(app, /외형 길이 약 48 cm/);
  assert.match(app, /슬라이드 닫힘 약 114 cm/);
});

test('renders a full keyboard and disables notes outside each model range', () => {
  assert.match(app, /DISPLAY_RANGE = \{ start: 21, end: 108 \}/);
  assert.match(app, /\["KeyO", 13, "O"\]/);
  assert.match(app, /\["KeyP", 15, "P"\]/);
  assert.match(app, /\["Semicolon", 16, ";"\]/);
  assert.match(app, /\["Quote", 17, "'"\]/);
  assert.match(app, /key\.disabled = unavailable/);
  assert.match(app, /isPitchPlayable/);
  assert.match(app, /pitched: true, range:/);
  assert.match(html, /id="rangeLegend"/);
  assert.match(css, /\.key\.unavailable/);
});

test('offers a single-scroll accessible encyclopedia dialog without external links', () => {
  assert.match(html, /instrument-details\.js[^>]*defer/);
  assert.ok(html.indexOf('instrument-details.js') < html.indexOf('app.js'));
  assert.match(html, /id="instrumentInfoButton"[^>]*aria-haspopup="dialog"/);
  assert.match(html, /id="instrumentDetailDialog"[^>]*role="dialog"[^>]*aria-modal="true"/);
  assert.doesNotMatch(html, /data-detail-tab|detailSourceList|더 확인하기/);
  assert.match(app, /const DETAIL_SECTIONS/);
  assert.match(app, /section\.className = "detail-section"/);
  assert.doesNotMatch(app, /target = "_blank"|source\.url|DETAIL_TABS/);
  assert.match(app, /function openInstrumentDetail/);
  assert.match(app, /function closeInstrumentDetail/);
  assert.match(app, /function handleDetailKeydown/);
  assert.match(app, /if \(state\.detailOpen\) return;/);
  assert.match(css, /\.instrument-detail-dialog/);
  assert.match(css, /min-height: 44px/);
});

test('provides complete long-form guides for every model and grouped instrument', () => {
  const required = [
    'concert-grand', 'upright-piano', 'harpsichord', 'tine-ep', 'reed-ep', 'clavinet',
    'fm-dx7', 'jd800', 'hybrid-la-rhodes', 'hybrid-la-mks', 'hammond-organ', 'pipe-organ',
    'p-bass', 'j-bass', 'active-bass',
    'fretless-bass', 'upright-bass', 's-style', 'metal-seven', 'hollow-jazz', 'dreadnought',
    'classical-guitar', 'violin', 'viola', 'cello', 'harp', 'piccolo-flute', 'flute', 'oboe',
    'english-horn', 'clarinet', 'bass-clarinet', 'bassoon', 'contrabassoon', 'soprano-sax', 'saxophone', 'tenor-sax', 'baritone-sax',
    'trumpet', 'piccolo-trumpet', 'flugelhorn', 'alto-trombone', 'trombone', 'bass-trombone', 'french-horn', 'euphonium', 'tuba',
    'rock-kit', 'metal-kit',
    'pop-kit', 'jazz-kit', 'funk-kit', 'drum-808', 'linn-machine', 'timpani', 'glockenspiel',
    'marimba', 'vibraphone', 'xylophone', 'orchestral-percussion', 'orchestral-snare',
    'orchestral-bass-drum', 'orchestral-suspended-cymbal', 'orchestral-tamtam',
    'orchestral-triangle', 'gayageum', 'geomungo', 'haegeum', 'ajaeng', 'daegeum',
    'hyangpiri', 'taepyeongso', 'samulnori', 'janggu', 'buk', 'sogo', 'kkwaenggwari',
    'jing', 'pyeonjong', 'pyeongyeong', 'ritual-signals', 'bak', 'chuk', 'eo',
    'daechwita-station', 'nabal', 'nagak', 'yonggo', 'jabara'
  ];
  assert.equal(Object.keys(instrumentDetails).length, required.length);
  for (const id of required) {
    const entry = instrumentDetails[id];
    assert.ok(entry, id);
    assert.equal(entry.facts.length >= 3, true, id + ' facts');
    assert.equal(entry.sources.length >= 1, true, id + ' sources');
    for (const section of ['overview', 'mechanism', 'technique', 'role', 'history']) {
      assert.equal(typeof entry.sections[section], 'string', id + ' ' + section);
      assert.equal(entry.sections[section].length >= 45, true, id + ' ' + section + ' depth');
    }
  }
});

test('browser app source is syntactically valid', () => {
  assert.doesNotThrow(() => new Function(app));
});

test('separates Korean melody, folk, and court instrument rooms', () => {
  for (const room of ['melody', 'folk', 'court']) {
    assert.match(html, new RegExp('data-korean-room="' + room + '"'));
    assert.match(app, new RegExp('room: "' + room + '"'));
  }
  assert.match(app, /function selectKoreanRoom/);
  assert.match(app, /model: "장구 · 북 · 소고 · 꽹과리 · 징"/);
  assert.match(app, /model: "박 · 축 · 어"/);
  assert.match(app, /model: "나발 · 나각 · 용고 · 자바라 · 징 · 태평소"/);
  assert.doesNotMatch(app, /model: "(?:SAMULNORI|JANGGU|BAK · CHUK|NABAL · NAGAK|AJAENG|DAEGEUM|HYANGPIRI|TAEPYEONGSO)"/);
  for (const model of ['gayageum', 'geomungo', 'haegeum', 'ajaeng', 'daegeum', 'hyangpiri', 'taepyeongso', 'samulnori', 'pyeonjong', 'pyeongyeong', 'ritual-signals', 'daechwita-station']) {
    assert.match(app, new RegExp('id: "' + model + '"'));
  }
});

test('renders grouped percussion as independent glowing artwork layers', () => {
  assert.match(html, /id="instrumentLayers"/);
  assert.match(app, /function renderInstrumentLayers/);
  assert.match(app, /function pulseInstrumentPart/);
  assert.match(app, /toneMarkers: true/);
  assert.match(app, /drum\.sound \|\| drum\.id/);
  assert.match(css, /\.instrument-layer\.active/);
  assert.match(css, /\.tone-marker\.active/);
  for (const asset of [
    'orchestral-snare.webp', 'orchestral-bass-drum.webp',
    'orchestral-suspended-cymbal.webp', 'orchestral-tamtam.webp',
    'orchestral-triangle.webp', 'korean-janggu.webp', 'korean-buk.webp',
    'korean-sogo.webp', 'korean-kkwaenggwari.webp', 'korean-jing.webp',
    'korean-pyeonjong.webp', 'korean-pyeongyeong.webp'
  ]) {
    assert.match(app, new RegExp(asset.replace('.', '\\.')));
    assert.equal(fs.existsSync(path.join(root, 'assets', 'instruments', asset)), true, asset);
  }
  assert.doesNotMatch(app, /art: "assets\/instruments\/orchestral-percussion-station\.png"/);
});
