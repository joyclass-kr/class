"use strict";

(function () {
  const curriculum = window.HarmonyCurriculum;
  if (!curriculum) return;

  const STORAGE_KEY = "musicTheoryHarmonyProgressV2";
  const CURRENT_KEY = "musicTheoryHarmonyCurrentV2";
  const NOTE_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const LETTER_STEPS = { C:0, D:1, E:2, F:3, G:4, A:5, B:6 };
  const els = {};
  const state = {
    completed: loadCompleted(),
    currentId: null,
    questionIndex: 0,
    firstTryCorrect: 0,
    attempts: 0,
    labPassed: false,
    evidencePassed: false,
    selectedMidis: new Set()
  };

  const SCORE_SETS = {
    "staff-basics": [["높은음자리표의 다섯 줄과 네 칸",["E4","F4","G4","A4","B4","C5","D5","E5","F5"],["1줄 E","1칸 F","2줄 G","2칸 A","3줄 B","3칸 C","4줄 D","4칸 E","5줄 F"]]],
    "pitch-alphabet": [["음이름은 C에서 B까지 반복됩니다",["C4","D4","E4","F4","G4","A4","B4","C5"],["C(다)","D(라)","E(마)","F(바)","G(사)","A(가)","B(나)","C(다)"]]],
    "treble-clef-map": [["높은음자리표 줄: E–G–B–D–F",["E4","G4","B4","D5","F5"],["1줄 E","2줄 G","3줄 B","4줄 D","5줄 F"]],["높은음자리표 칸: F–A–C–E",["F4","A4","C5","E5"],["1칸 F","2칸 A","3칸 C","4칸 E"]]],
    "bass-clef-map": [["낮은음자리표 줄: G–B–D–F–A",["G2","B2","D3","F3","A3"],["1줄 G","2줄 B","3줄 D","4줄 F","5줄 A"]],["낮은음자리표 칸: A–C–E–G",["A2","C3","E3","G3"],["1칸 A","2칸 C","3칸 E","4칸 G"]]],
    "ledger-lines": [["Below treble · 아래 둘째/첫째 덧줄",["A3","C4"],["A3 · 2nd","C4 · 1st"],null,"treble"],["Above treble · 위 첫째/둘째 덧줄",["A5","C6"],["A5 · 1st","C6 · 2nd"],null,"treble"],["Below bass · 아래 첫째/둘째 덧줄",["E2","C2"],["E2 · 1st","C2 · 2nd"],null,"bass"],["Above bass · 위 첫째/둘째 덧줄",["C4","E4"],["C4 · 1st","E4 · 2nd"],null,"bass"]],
    "staff-clefs": [["낮은음자리표: C3–G3",["C3","D3","E3","F3","G3"],["C3","D3","E3","F3","G3"]],["높은음자리표: C4–G4",["C4","D4","E4","F4","G4"],["C4","D4","E4","F4","G4"]]],
    "grand-staff-bridge": [["C3–C4–C5",["C3","C4","C5"]]],
    "enharmonic-spelling": [["C♯로 읽기",["C4","C#4","D4"],["C","C♯","D"]],["D♭로 읽기",["C4","Db4","D4"],["C","D♭","D"]]],
    "interval-spelling": [["장3도",["C4","E4"]],["단3도",["C4","Eb4"]],["증4도",["C4","F#4"]],["감5도",["C4","Gb4"]]],
    "interval-inversion": [["단3도",["C4","Eb4"]],["장6도",["Eb4","C5"]],["완전4도",["C4","F4"]],["완전5도",["F4","C5"]]],
    "part-spacing": [["균형 배치",["C3","G3","C4","E4"]],["과도한 벌어짐",["C3","E3","G3","E5"]]],
    "part-motion": [["베이스",["G3","C3"],["V","I"]],["소프라노",["B4","C5"],["7","1"]],["화음7음",["F4","E4"],["7음","해결"]]],
    "nonchord-motion": [["경과음",["C4","D4","E4"],["화음음","경과","화음음"]],["보조음",["E4","F4","E4"],["화음음","보조","화음음"]]],
    "suspension-resolution": [["소프라노 4–3",["C5","C5","B4"],["준비","계류","해결"]],["베이스",["C3","G2","G2"],["C","G7","G7"]]],
    "minor-scales": [["자연단음계",["A3","B3","C4","D4","E4","F4","G4","A4"]],["화성단음계",["A3","B3","C4","D4","E4","F4","G#4","A4"]],["가락단음계 상행",["A3","B3","C4","D4","E4","F#4","G#4","A4"]]],
    "minor-dominant": [["v (Em)",["E4","G4","B4"]],["V7 (E7)",["E4","G#4","B4","D5"]],["i (Am)",["A4","C5","E5"]]],
    "sequence-cycle": [["vi (Am)",["A3","C4","E4"]],["ii (Dm)",["A3","D4","F4"]],["V (G)",["G3","B3","D4"]],["I (C)",["G3","C4","E4"]]],
    "sequence-voices": [["베이스",["A2","D3","G2","C3"],["vi","ii","V","I"]],["공통·순차 성부",["C4","D4","B3","C4"]],["윗성부",["E4","F4","G4","E4"]]],
    "neapolitan-sixth": [["iv",["F3","Ab3","C4"]],["N6",["F3","Ab3","Db4"]],["V",["G3","B3","D4"]],["i",["C3","G3","Eb4"]]],
    "augmented-sixth": [["It+6",["Ab4","C5","F#5"]],["V",["G4","B4","D5"]],["Ger+6",["Ab4","C5","Eb5","F#5"]],["I6/4",["G4","C5","E5"]]],
    "tonicization-modulation": [["C: I",["C3","G3","E4"]],["V/V",["D3","C4","F#4"]],["V",["G2","G3","B3"]],["G: V",["D3","C4","F#4"]],["G: I",["G2","G3","B3"]]],
    "pivot-modulation": [["C: I",["C3","G3","E4"]],["C: vi = G: ii",["A2","A3","C4","E4"]],["G: V7",["D3","C4","F#4"]],["G: I",["G2","G3","B3"]]],
    "symbol-anatomy": [["C",["C4","E4","G4"]],["Cm",["C4","Eb4","G4"]],["C7",["C4","E4","G4","Bb4"]],["Cmaj7",["C4","E4","G4","B4"]]],
    "symbol-contrast": [["Csus4",["C4","F4","G4"]],["Cadd9",["C4","D4","E4","G4"]]],
    "triad-stack": [["D",["D4","F#4","A4"]],["Dm",["D4","F4","A4"]]],
    "triad-transpose": [["E♭",["Eb4","G4","Bb4"]],["F♯m",["F#4","A4","C#5"]]],
    "quality-pairs": [["장 4+3",["C4","E4","G4"]],["단 3+4",["C4","Eb4","G4"]],["감 3+3",["C4","Eb4","Gb4"]],["증 4+4",["C4","E4","G#4"]]],
    "quality-motion": [["Cdim",["C4","Eb4","Gb4"]],["C",["C4","E4","G4"]],["Caug",["C4","E4","G#4"]],["Fm",["C4","F4","Ab4"]]],
    "inversion-score": [["C",["C4","E4","G4"]],["C/E",["E4","G4","C5"]],["C/G",["G4","C5","E5"]]],
    "bass-line": [["C",["C3","E4","G4"]],["G/B",["B2","D4","G4"]],["Am",["A2","C4","E4"]]],
    "voice-compare": [["큰 도약",["C4","E4","G4"]],["G 근음위치",["G4","B4","D5"]],["최소 이동",["B3","D4","G4"]]],
    "voice-path": [["C",["C4","E4","G4"]],["G/B",["B3","D4","G4"]],["Am",["C4","E4","A4"]],["F",["C4","F4","A4"]]],
    "key-scale": [["C 장음계",["C4","D4","E4","F4","G4","A4","B4","C5"]],["G 장음계",["G3","A3","B3","C4","D4","E4","F#4","G4"]]],
    "leading-tone": [["C조 7→1",["B4","C5"]],["G조 7→1",["F#4","G4"]]],
    "diatonic-map": [["I",["C4","E4","G4"]],["ii",["D4","F4","A4"]],["iii",["E4","G4","B4"]],["IV",["F4","A4","C5"]],["V",["G4","B4","D5"]],["vi",["A4","C5","E5"]],["vii°",["B4","D5","F5"]]],
    "roman-transfer": [["C: I–IV–V–I",["C4","F4","G4","C5"]],["G: I–IV–V–I",["G3","C4","D4","G4"]]],
    "diatonic-sevenths": [["Imaj7",["C4","E4","G4","B4"]],["ii7",["D4","F4","A4","C5"]],["V7",["G3","B3","D4","F4"]],["viiø7",["B3","D4","F4","A4"]]],
    "function-flow": [["T",["C4","E4","G4"]],["PD",["C4","F4","A4"]],["D",["B3","D4","G4"]],["T",["C4","E4","G4"]]],
    "function-options": [["I",["C4","E4","G4"]],["vi",["C4","E4","A4"]],["ii",["D4","F4","A4"]],["IV",["C4","F4","A4"]],["V",["B3","D4","G4"]]],
    "cadence-compare": [["정격 V–I",["B3","D4","G4"]],["I",["C4","E4","G4"]],["변격 IV–I",["C4","F4","A4"]],["I",["C4","E4","G4"]]],
    "cadence-voices": [["G7",["G3","B3","F4"]],["강한 I",["C3","C4","E4"]],["약한 I6",["E3","C4","G4"]]],
    "deceptive-cadence": [["V",["B3","D4","G4"]],["vi",["C4","E4","A4"]]],
    "cadential-six-four": [["I6/4",["G3","C4","E4"]],["V",["G3","B3","D4"]],["I",["C3","G3","E4"]]],
    "passing-six-four": [["I",["C3","G3","E4"]],["V6/4",["D3","G3","B3"]],["I6",["E3","G3","C4"]]],
    "auxiliary-six-four": [["I",["C3","G3","E4"]],["IV6/4",["C3","F3","A3"]],["I",["C3","G3","E4"]]],
    "arpeggio-six-four": [["I",["C3","G3","E4"]],["I6/4",["G2","C3","E3"]],["I6",["E3","G3","C4"]]],
    "loop-leadsheet": [["C",["C4","E4","G4"]],["G/B",["B3","D4","G4"]],["Am",["C4","E4","A4"]],["F",["C4","F4","A4"]]],
    "practice-layers": [["베이스",["C3","G2","A2","F2"]],["가까운 윗성부",["C4","B3","C4","C4"]],["코드 완성",["E4","D4","E4","F4"]]],
    "seventh-family": [["Cmaj7",["C4","E4","G4","B4"]],["Dm7",["D4","F4","A4","C5"]],["G7",["G3","B3","D4","F4"]],["Bm7♭5",["B3","D4","F4","A4"]]],
    "diminished-sevenths": [["Bm7♭5",["B3","D4","F4","A4"]],["Bdim7",["B3","D4","F4","Ab4"]]],
    "seventh-inversions": [["G7",["G3","B3","D4","F4"]],["G7/B",["B3","D4","F4","G4"]],["G7/D",["D4","F4","G4","B4"]],["G7/F",["F3","G3","B3","D4"]]],
    "guide-tone": [["G7: 3·7",["B3","F4"]],["해결: 1·3",["C4","E4"]]],
    "two-five-one-guides": [["Dm7",["F4","C5"]],["G7",["F4","B4"]],["Cmaj7 해결",["E4","C5"]]],
    "sus-add": [["C",["C4","E4","G4"]],["Csus4",["C4","F4","G4"]],["Cadd9",["C4","D4","E4","G4"]]],
    "tension-map": [["Cmaj7",["C4","E4","G4","B4"]],["Cmaj9",["C4","E4","G4","B4","D5"]],["G13",["G3","B3","F4","E5"]]],
    "transpose-map": [["C: I–V–vi–IV",["C4","G4","A4","F4"]],["G: I–V–vi–IV",["G3","D4","E4","C4"]]],
    "transpose-melody": [["C조 E–D–C",["E4","D4","C4"]],["G조 B–A–G",["B4","A4","G4"]]],
    "harmonic-rhythm": [["C 유지",["C4","D4","E4"],["C","유지","유지"]],["G→C",["B3","D4","C4"],["G","유지","C"]]],
    "rhythm-density": [["느린 변화",["C4","C4","F4","G4"],["C","유지","F","G"]],["종지 전 가속",["C4","F4","D4","G4","C5"],["C","F","Dm","G","C"]]],
    "melody-candidates": [["E는 C의 3음",["C4","E4","G4"]],["E는 Am의 5음",["A3","C4","E4"]],["E는 Em의 근음",["E4","G4","B4"]]],
    "harmonize-options": [["단순 C–G–C",["E4","D4","C4"]],["확장 Am–Dm–G–C",["E4","D4","B3","C4"]]],
    "melody-register": [["반주 화음",["C3","E3","G3"],null,"chord"],["멜로디",["E4","D4","C4"]]],
    "secondary-dominant": [["D7 (V/V)",["D4","F#4","A4","C5"]],["G",["D4","G4","B4"]]],
    "secondary-chain": [["A7→Dm",["C#4","D4"],["C♯","D"]],["E7→Am",["G#3","A3"],["G♯","A"]]],
    "secondary-leading-tone": [["vii°7/V",["F#3","A3","C4","Eb4"]],["V",["G3","B3","D4"]]],
    "borrowed-compare": [["IV",["F4","A4","C5"]],["iv",["F4","Ab4","C5"]]],
    "borrowed-resolution": [["Fm",["F4","Ab4","C5"]],["C",["E4","G4","C5"]]],
    "lead-sheet": [["멜로디와 코드",["E4","D4","C4","A3","C4"],["C","G/B","Am","F","C"]]],
    "arrangement-layers": [["베이스",["C3","B2","A2","F2","C3"]],["보이싱",["E4","D4","E4","F4","E4"]],["멜로디",["E5","D5","C5","A4","C5"]]],
    "revision-loop": [["초안",["C4","G4","A4","F4"]],["가까운 연결",["C4","B3","C4","C4"]]],
    "voice-ranges": [["S: C4–A5",["C4","A5"]],["A: G3–D5",["G3","D5"]],["T: C3–G4",["C3","G4"]],["B: E2–C4",["E2","C4"]]],
    "doubling-rule": [["근음 C 중복",["C3","G3","C4","E4"]],["이끎음 B 중복",["G2","B3","B4","D5"]]],
    "open-close": [["밀집위치",["C3","G3","C4","E4"]],["개리위치",["C3","E3","C4","G4"]]],
    "motion-directions": [["동진행 시작",["C3","E4"]],["둘 다 ↑",["D3","G4"]],["반진행 시작",["C3","G4"]],["아래↑ 위↓",["D3","F4"]]],
    "similar-parallel": [["동진행 3도",["C3","E4"]],["도착 4도",["D3","G4"]],["병진행 장3도",["C3","E4"]],["도착 단3도",["D3","F4"]]],
    "contrary-oblique": [["반진행 시작",["C3","G4"]],["↑ · ↓",["D3","F4"]],["사진행 시작",["C3","E4"]],["― · ↑",["C3","F4"]]],
    "voice-crossing": [["정상 B–T–A–S",["C3","G3","C4","E4"]],["교차 T E4 > A C4",["C3","C4","E4","G4"]]],
    "voice-overlap": [["첫 S E4 · A C4",["C4","E4"]],["다음 A F4 · S A4",["F4","A4"]]],
    "parallel-errors": [["완전5도",["C3","G3"]],["같이 ↑ 완전5도",["D3","A3"]],["완전8도",["C3","C4"]],["같이 ↑ 완전8도",["D3","D4"]]],
    "hidden-perfect": [["바깥 성부 시작",["C3","E4"]],["같이 ↑, S 도약",["D3","A4"]]],
    "secondary-targets": [["V7/V D7",["D4","F#4","A4","C5"]],["목표 V G",["G3","B3","D4"]],["V7/vi E7",["E4","G#4","B4","D5"]],["목표 vi Am",["A3","C4","E4"]]],
    "secondary-root-motion": [["D→G",["D3","G2"]],["A→D",["A2","D3"]],["E→A",["E3","A2"]]],
    "secondary-resolution": [["D7 경향음",["F#4","C5"]],["G 해결",["G4","B4"]],["A7 경향음",["C#4","G4"]],["Dm 해결",["D4","F4"]]],
    "secondary-voices": [["D7",["D3","F#3","C4","A4"]],["G",["G2","G3","B3","G4"]]],
    "secondary-domino": [["A7",["A3","C#4","E4","G4"]],["D7",["D3","F#3","A3","C4"]],["G7",["G2","B3","D4","F4"]],["C",["C3","G3","C4","E4"]]],
    "secondary-leading-resolution": [["vii°7/V",["F#3","A3","C4","Eb4"]],["V",["G3","B3","D4"]]],
    "secondary-dominant-compare": [["D7 = V7/V",["D4","F#4","A4","C5"]],["F♯°7 = vii°7/V",["F#3","A3","C4","Eb4"]],["목표 G",["G3","B3","D4"]]],
    "borrowed-family": [["iv Fm",["F4","Ab4","C5"]],["♭VI A♭",["Ab3","C4","Eb4"]],["♭VII B♭",["Bb3","D4","F4"]],["I C",["C4","E4","G4"]]],
    "flat-two-compare": [["N6: F–A♭–D♭",["F3","Ab3","Db4"]],["V: G",["G3","B3","D4"]],["D♭7",["Db3","F3","Ab3","Cb4"]],["I: C",["C3","G3","E4"]]],
    "tension-stack": [["Cmaj7",["C4","E4","G4","B4"]],["+9 D",["C4","E4","G4","B4","D5"]],["G13",["G3","B3","F4","E5"]]],
    "tension-available": [["Cmaj9",["C4","E4","G4","B4","D5"]],["Cmaj7♯11",["C4","E4","G4","B4","F#5"]],["Dm11",["D4","F4","A4","C5","G5"]]],
    "tension-avoid": [["Cmaj7 + F",["C4","E4","G4","B4","F5"]],["E–F 단2도",["E4","F4"]],["Cmaj7♯11",["C4","E4","G4","B4","F#5"]]]
  };

  function byId(id) { return document.getElementById(id); }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[char];
    });
  }
  function readStorage(key) {
    try { return localStorage.getItem(key); }
    catch (error) { return null; }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, value); }
    catch (error) { /* Learning must continue when storage is unavailable. */ }
  }
  function loadCompleted() {
    try {
      const stored = readStorage(STORAGE_KEY) || "[]";
      const value = JSON.parse(stored);
      return new Set(Array.isArray(value) ? value.filter(function (id) { return curriculum.skills[id]; }) : []);
    } catch (error) { return new Set(); }
  }
  function saveCompleted() { writeStorage(STORAGE_KEY, JSON.stringify(Array.from(state.completed))); }
  function allSkillIds() { return curriculum.strands.flatMap(function (strand) { return strand.skills; }); }
  function getStrand(id) { return curriculum.strands.find(function (strand) { return strand.skills.includes(id); }); }
  function prereqsMet(id) { return curriculum.skills[id].prereqs.every(function (prereq) { return state.completed.has(prereq); }); }
  function playGroups(groups, options) {
    if (!window.HarmonyPiano || !groups || !groups.length) return;
    const settings = options || {};
    const normalized = Array.isArray(groups[0]) ? groups : [groups];
    if (normalized.length === 1) window.HarmonyPiano.playNotes(normalized[0], { duration:settings.duration || .9, arpeggio:.018 });
    else window.HarmonyPiano.playSequence(normalized, settings.stepDuration || .58);
  }
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { els.toast.classList.remove("show"); }, 2200);
  }

  const SEQUENCE_KEYS = new Set([
    "staff-basics", "pitch-alphabet", "treble-clef-map", "bass-clef-map", "ledger-lines", "staff-clefs", "enharmonic-spelling", "part-motion", "nonchord-motion", "suspension-resolution", "minor-scales", "sequence-voices",
    "key-scale", "leading-tone", "roman-transfer", "practice-layers",
    "transpose-map", "transpose-melody", "harmonic-rhythm", "rhythm-density",
    "harmonize-options", "melody-register", "secondary-chain",
    "lead-sheet", "arrangement-layers", "revision-loop"
  ]);
  const GRAND_STAFF_KEYS = new Set([
    "grand-staff-bridge", "part-spacing", "voice-ranges", "doubling-rule", "open-close",
    "motion-directions", "similar-parallel", "contrary-oblique",
    "voice-crossing", "parallel-errors", "hidden-perfect",
    "secondary-voices", "secondary-domino"
  ]);
  const LETTER_PITCHES = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 };

  function noteParts(note) {
    const match = /^([A-G])([#b]?)(-?\d)$/.exec(note);
    if (!match) return { step:28, midi:60, accidental:"", label:note };
    const octave = Number(match[3]);
    const accidentalValue = match[2] === "#" ? 1 : match[2] === "b" ? -1 : 0;
    return {
      step:octave * 7 + LETTER_STEPS[match[1]],
      midi:(octave + 1) * 12 + LETTER_PITCHES[match[1]] + accidentalValue,
      accidental:match[2] === "#" ? "♯" : match[2] === "b" ? "♭" : "",
      label:note
    };
  }
  function noteY(part, clef, grand) {
    if (grand) return 124 - (part.step - 28) * 5;
    if (clef === "bass") return 99 - (part.step - 21) * 5;
    return 124 - (part.step - 28) * 5;
  }
  function staffLines(ys, width) {
    return ys.map(function (y) { return '<line x1="28" y1="'+y+'" x2="'+(width-18)+'" y2="'+y+'"/>'; }).join("");
  }
  function ledgerLines(y, x, clef, grand) {
    const lines = [];
    let cursor;
    if (grand && clef === "bass") {
      for (cursor = 124; cursor >= y; cursor -= 10) lines.push(cursor);
      for (cursor = 184; cursor <= y; cursor += 10) lines.push(cursor);
    } else {
      for (cursor = 64; cursor >= y; cursor -= 10) lines.push(cursor);
      for (cursor = 124; cursor <= y; cursor += 10) lines.push(cursor);
    }
    return lines.map(function (lineY) {
      return '<line class="ledger" x1="'+(x-13)+'" y1="'+lineY+'" x2="'+(x+13)+'" y2="'+lineY+'"/>';
    }).join("");
  }
  function placeChordParts(noteStrings, x, grand, singleClef, stepShift) {
    const parts = noteStrings.map(noteParts).map(function (part) {
      part.step += stepShift || 0;
      const clef = grand ? (part.step >= 28 ? "treble" : "bass") : singleClef;
      return Object.assign(part, { clef:clef, y:noteY(part, clef, grand), shift:0 });
    });
    ["treble","bass"].forEach(function (clef) {
      const group = parts.filter(function (part) { return part.clef === clef; }).sort(function (a,b) { return b.y-a.y; });
      group.forEach(function (part, index) {
        if (index && Math.abs(part.y-group[index-1].y) === 5) part.shift = group[index-1].shift ? 0 : 9;
      });
    });
    return parts.map(function (part, index) {
      const noteX = x + part.shift;
      const accidentalX = noteX - 18 - (index % 2) * 3;
      return ledgerLines(part.y, noteX, part.clef, grand) +
        (part.accidental ? '<text class="accidental" x="'+accidentalX+'" y="'+(part.y+5)+'">'+part.accidental+'</text>' : "") +
        '<ellipse class="note-head" cx="'+noteX+'" cy="'+part.y+'" rx="7" ry="5" transform="rotate(-18 '+noteX+' '+part.y+')"/>';
    }).join("") + ["treble","bass"].map(function (clef) {
      const group = parts.filter(function (part) { return part.clef === clef; });
      if (!group.length) return "";
      const minY = Math.min.apply(null, group.map(function (part) { return part.y; }));
      const maxY = Math.max.apply(null, group.map(function (part) { return part.y; }));
      const stemsUp = (minY + maxY) / 2 >= 94;
      const stemX = stemsUp ? x + 8 : x - 7;
      return stemsUp
        ? '<line class="note-stem" x1="'+stemX+'" y1="'+(maxY+1)+'" x2="'+stemX+'" y2="'+(minY-27)+'"/>'
        : '<line class="note-stem" x1="'+stemX+'" y1="'+(minY-1)+'" x2="'+stemX+'" y2="'+(maxY+27)+'"/>';
    }).join("");
  }
  function placeSatbParts(noteStrings, x) {
    const roles = ["bass","tenor","alto","soprano"];
    const parts = noteStrings.map(noteParts).sort(function (a,b) { return a.step-b.step; }).map(function (part, index) {
      const role = roles[index];
      const stemUp = role === "tenor" || role === "soprano";
      return Object.assign(part, { role:role, clef:index < 2 ? "bass" : "treble", y:noteY(part, index < 2 ? "bass" : "treble", true), stemUp:stemUp, shift:stemUp ? 4 : -4 });
    });
    return parts.map(function (part, index) {
      const noteX = x + part.shift;
      const accidentalColumn = parts.slice(0,index).some(function (other) { return other.accidental && Math.abs(other.y-part.y) < 14; }) ? 29 : 21;
      const accidental = part.accidental ? '<text class="accidental" x="'+(noteX-accidentalColumn)+'" y="'+(part.y+5)+'">'+part.accidental+'</text>' : "";
      const stemX = part.stemUp ? noteX+7 : noteX-7;
      const stem = part.stemUp
        ? '<line class="note-stem voice-stem" x1="'+stemX+'" y1="'+(part.y+1)+'" x2="'+stemX+'" y2="'+(part.y-25)+'"/>'
        : '<line class="note-stem voice-stem" x1="'+stemX+'" y1="'+(part.y-1)+'" x2="'+stemX+'" y2="'+(part.y+25)+'"/>';
      return ledgerLines(part.y, noteX, part.clef, true) + accidental +
        '<ellipse class="note-head satb-note voice-'+part.role+'" cx="'+noteX+'" cy="'+part.y+'" rx="7" ry="5" transform="rotate(-18 '+noteX+' '+part.y+')"/>' + stem;
    }).join("");
  }
  function chordStaffSvg(items, title, key) {
    const width = 520;
    const allParts = items.flatMap(function (item) { return item[1].map(noteParts); });
    const spansGrandRange = allParts.some(function (part) { return part.step <= 25; }) && allParts.some(function (part) { return part.step >= 28; });
    const grand = GRAND_STAFF_KEYS.has(key) && spansGrandRange;
    const clef = "treble";
    const averageStep = allParts.reduce(function (total, part) { return total+part.step; }, 0) / Math.max(1, allParts.length);
    let displayStepShift = 0;
    if (!grand) {
      while (averageStep + displayStepShift < 31) displayStepShift += 7;
      while (averageStep + displayStepShift > 35) displayStepShift -= 7;
    }
    const height = grand ? 184 : 132;
    const yShift = grand ? -8 : -12;
    const gap = (width - 92) / Math.max(1, items.length);
    const staff = grand
      ? staffLines([74,84,94,104,114], width) + staffLines([134,144,154,164,174], width)
      : staffLines([74,84,94,104,114], width);
    const clefs = grand
      ? '<text class="music-glyph clef" x="28" y="112">𝄞</text><text class="music-glyph clef bass-clef" x="29" y="164">𝄢</text>'
      : '<text class="music-glyph clef" x="28" y="112">𝄞</text>';
    const events = items.map(function (item, index) {
      const x = 66 + gap * index + gap / 2;
      const notes = grand && item[1].length === 4 ? placeSatbParts(item[1], x) : placeChordParts(item[1], x, grand, clef, displayStepShift);
      return notes +
        '<text class="chord-label" x="'+x+'" y="26" text-anchor="middle">'+escapeHtml(item[0])+'</text>';
    }).join("");
    const heading = title ? '<p class="score-title">'+escapeHtml(title)+'</p>' : "";
    return '<div class="score-frame">'+heading+'<svg class="score-svg" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+escapeHtml(title || "화음 악보")+'"><rect width="'+width+'" height="'+height+'" rx="8" fill="#fffdf7"/><g transform="translate(0 '+yShift+')"><g class="staff-lines">'+staff+'</g>'+clefs+events+'</g></svg></div>';
  }
  function sequenceNote(part, x, clef) {
    const y = noteY(part, clef, false);
    const stemsUp = y >= 94;
    const stemX = stemsUp ? x+7 : x-7;
    const stem = stemsUp
      ? '<line class="note-stem" x1="'+stemX+'" y1="'+(y+1)+'" x2="'+stemX+'" y2="'+(y-27)+'"/>'
      : '<line class="note-stem" x1="'+stemX+'" y1="'+(y-1)+'" x2="'+stemX+'" y2="'+(y+27)+'"/>';
    return ledgerLines(y, x, clef, false) +
      (part.accidental ? '<text class="accidental" x="'+(x-18)+'" y="'+(y+5)+'">'+part.accidental+'</text>' : "") +
      '<ellipse class="note-head" cx="'+x+'" cy="'+y+'" rx="7" ry="5" transform="rotate(-18 '+x+' '+y+')"/>'+stem;
  }
  function sequenceStaffSvg(items, title, key) {
    const width = 520;
    const rows = items.map(function (item) {
      const hasAnnotations = Boolean(item[2] && item[2].some(Boolean));
      const isLedgerLesson = key === "ledger-lines";
      const height = isLedgerLesson ? 132 : (hasAnnotations ? 116 : 100);
      const yShift = isLedgerLesson ? -12 : (hasAnnotations ? -29 : -44);
      const parts = item[1].map(noteParts);
      const averageStep = parts.reduce(function (total, part) { return total+part.step; }, 0) / Math.max(1, parts.length);
      const clef = item[4] || (averageStep < 26 ? "bass" : "treble");
      const gap = (width - 126) / Math.max(1, parts.length);
      const notes = item[3] === "chord"
        ? placeChordParts(item[1], width / 2, false, clef)
        : parts.map(function (part, index) {
            const x = 92 + gap * index + gap / 2;
            const annotation = item[2] && item[2][index] ? '<text class="note-annotation" x="'+x+'" y="49" text-anchor="middle">'+escapeHtml(item[2][index])+'</text>' : "";
            return annotation + sequenceNote(part, x, clef);
          }).join("");
      const barlines = key === "lead-sheet"
        ? parts.slice(1).map(function (_, index) {
            const x = 92 + gap * (index + 1);
            return '<line class="bar-line" x1="'+x+'" y1="74" x2="'+x+'" y2="114"/>';
          }).join("") + '<line class="bar-line final" x1="'+(width-18)+'" y1="74" x2="'+(width-18)+'" y2="114"/>'
        : "";
      return '<div class="score-line-card"><strong>'+escapeHtml(item[0])+'</strong><svg class="score-svg sequence-score" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+escapeHtml(item[0])+'"><rect width="'+width+'" height="'+height+'" rx="8" fill="#fffdf7"/><g transform="translate(0 '+yShift+')"><g class="staff-lines">'+staffLines([74,84,94,104,114],width)+'</g><text class="music-glyph clef '+(clef === "bass" ? "bass-clef" : "")+'" x="28" y="'+(clef === "bass" ? 103 : 112)+'">'+(clef === "bass" ? "𝄢" : "𝄞")+'</text>'+barlines+notes+'</g></svg></div>';
    }).join("");
    const heading = title ? '<p class="score-title">'+escapeHtml(title)+'</p>' : "";
    return '<div class="score-frame">'+heading+'<div class="score-compare">'+rows+'</div></div>';
  }
  function staffSvg(items, title, key) {
    return SEQUENCE_KEYS.has(key) ? sequenceStaffSvg(items, title, key) : chordStaffSvg(items, title, key);
  }

  function noteValueIcon(kind) {
    const open = kind === "whole" || kind === "half";
    const stem = kind !== "whole" ? '<line x1="40" y1="31" x2="40" y2="7"/>' : "";
    const flag = kind === "eighth" ? '<path d="M40 7 C52 10 53 18 47 25"/>' : "";
    return '<svg class="value-note" viewBox="0 0 64 44" aria-hidden="true"><g transform="rotate(-18 32 31)"><ellipse cx="32" cy="31" rx="10" ry="6" '+(open ? 'fill="none"' : 'fill="currentColor"')+'/></g>'+stem+flag+'</svg>';
  }
  function restValueIcon(kind) {
    const drawings = {
      whole:'<path d="M8 13H56"/><rect x="24" y="13" width="17" height="8" rx="1"/>',
      half:'<path d="M8 29H56"/><rect x="24" y="21" width="17" height="8" rx="1"/>',
      quarter:'<path d="M38 5L25 19L39 28L26 42M26 42L38 34"/>',
      eighth:'<circle cx="25" cy="13" r="5"/><path d="M29 15C43 19 38 31 28 41"/>'
    };
    return '<svg class="value-rest '+kind+'" viewBox="0 0 64 48" aria-hidden="true">'+drawings[kind]+'</svg>';
  }
  function noteValuesDiagram() {
    const values = [
      ["whole","온음표","1개 = 4박"],
      ["half","2분음표","2개 = 4박"],
      ["quarter","4분음표","4개 = 4박"],
      ["eighth","8분음표","8개 = 4박"]
    ];
    return '<div class="notation-diagram note-values-diagram" role="img" aria-label="온음표 한 개는 2분음표 두 개, 4분음표 네 개, 8분음표 여덟 개와 같은 네 박">'+
      '<div class="duration-equation"><strong>온음표 1</strong><span>=</span><strong>2분음표 2</strong><span>=</span><strong>4분음표 4</strong><span>=</span><strong>8분음표 8</strong></div>'+
      '<div class="duration-lanes">'+values.map(function (value) {
        const count = { whole:1, half:2, quarter:4, eighth:8 }[value[0]];
        return '<div class="duration-lane '+value[0]+'"><div class="duration-label">'+noteValueIcon(value[0])+'<span><strong>'+value[1]+'</strong><small>'+value[2]+'</small></span></div><div class="duration-track">'+Array.from({ length:count }, function (_, index) { return '<i><b>'+(index+1)+'</b></i>'; }).join("")+'</div></div>';
      }).join("")+'</div><p class="duration-rule">세로선은 같은 시간 지점입니다. 아래로 갈수록 한 기호의 길이가 절반이 됩니다.</p></div>';
  }
  function restValuesDiagram() {
    const values = [
      ["whole","온음표","온쉼표","4박"],
      ["half","2분음표","2분쉼표","2박"],
      ["quarter","4분음표","4분쉼표","1박"],
      ["eighth","8분음표","8분쉼표","1/2박"]
    ];
    return '<div class="notation-diagram rest-values-diagram" role="img" aria-label="같은 네 박의 시간 폭에서 온쉼표 하나, 2분쉼표 둘, 4분쉼표 넷, 8분쉼표 여덟의 실제 길이를 비교">'+
      '<div class="duration-equation"><strong>온쉼표 1</strong><span>=</span><strong>2분쉼표 2</strong><span>=</span><strong>4분쉼표 4</strong><span>=</span><strong>8분쉼표 8</strong></div>'+
      '<div class="duration-lanes rest-duration-lanes">'+values.map(function (value) {
        const count = { whole:1, half:2, quarter:4, eighth:8 }[value[0]];
        return '<div class="duration-lane '+value[0]+'"><div class="duration-label rest-duration-label">'+noteValueIcon(value[0])+'<b>=</b>'+restValueIcon(value[0])+'<span><strong>'+value[2]+'</strong><small>'+value[3]+'씩</small></span></div><div class="duration-track">'+Array.from({ length:count }, function (_, index) { return '<i><b>'+(index+1)+'</b></i>'; }).join("")+'</div></div>';
      }).join("")+'</div><p class="duration-rule">소리는 사라져도 시간 폭은 그대로입니다. 아래로 갈수록 쉼표 한 개의 길이가 절반이 됩니다.</p>'+
      '<div class="silent-beat-line"><strong>4/4 한 마디</strong><span class="sound">1<br><small>소리</small></span><span class="silent">2<br><small>쉼</small></span><span class="sound">3<br><small>소리</small></span><span class="silent">4<br><small>쉼</small></span><b>쉼에서도 박은 같은 속도로 계속 흐릅니다 →</b></div></div>';
  }
  function fifthsWheelDiagram() {
    const keys = [
      ["C","Am","0"],["G","Em","1♯"],["D","Bm","2♯"],["A","F♯m","3♯"],["E","C♯m","4♯"],["B","G♯m","5♯"],
      ["F♯·G♭","D♯m·E♭m","6♯·6♭"],["D♭","B♭m","5♭"],["A♭","Fm","4♭"],["E♭","Cm","3♭"],["B♭","Gm","2♭"],["F","Dm","1♭"]
    ];
    const nodes = keys.map(function (item, index) {
      const angle = (-90 + index * 30) * Math.PI / 180;
      const x = 260 + Math.cos(angle) * 122;
      const y = 154 + Math.sin(angle) * 122;
      return '<g class="fifths-node" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><circle r="34"/><text class="wheel-major" y="-8">'+item[0]+'</text><text class="wheel-minor" y="8">'+item[1]+'</text><text class="wheel-count" y="23">'+item[2]+'</text></g>';
    }).join("");
    return '<div class="concept-diagram fifths-wheel-diagram" role="img" aria-label="C에서 오른쪽으로 완전5도씩 가면 샵이 하나씩, 왼쪽으로 가면 플랫이 하나씩 늘어나는 오도권"><svg viewBox="0 0 520 310"><circle class="wheel-ring outer" cx="260" cy="154" r="122"/><circle class="wheel-ring inner" cx="260" cy="154" r="70"/>'+nodes+'<g class="wheel-center"><text x="260" y="140">5도권</text><text x="260" y="160">장조 · 관계단조</text><text x="260" y="181">← ♭ 추가 · ♯ 추가 →</text></g></svg><div class="wheel-reading"><span><b>시계 방향</b> C→G→D · 완전5도 위 · ♯ 하나씩</span><span><b>반시계 방향</b> C→F→B♭ · 완전5도 아래 · ♭ 하나씩</span></div></div>';
  }
  function meterScore(top, bottom, groups) {
    const total = groups.reduce(function (sum, count) { return sum + count; }, 0);
    const startX = 74;
    const endX = 246;
    const gap = (endX - startX) / Math.max(1, total - 1);
    let noteIndex = 0;
    const notes = [];
    const beams = [];
    const accents = [];
    groups.forEach(function (groupSize, groupIndex) {
      const first = noteIndex;
      for (let index = 0; index < groupSize; index += 1) {
        const x = startX + noteIndex * gap;
        notes.push('<ellipse cx="'+x.toFixed(1)+'" cy="61" rx="6" ry="4" transform="rotate(-18 '+x.toFixed(1)+' 61)"/><line x1="'+(x+5).toFixed(1)+'" y1="60" x2="'+(x+5).toFixed(1)+'" y2="31"/>');
        noteIndex += 1;
      }
      const x1 = startX + first * gap + 5;
      const x2 = startX + (noteIndex - 1) * gap + 5;
      beams.push('<line class="meter-beam" x1="'+x1.toFixed(1)+'" y1="31" x2="'+x2.toFixed(1)+'" y2="31"/>');
      accents.push('<text class="meter-accent" x="'+(startX + first * gap).toFixed(1)+'" y="21">'+(groupIndex === 0 ? '강' : '박')+'</text>');
    });
    return '<svg class="meter-score" viewBox="0 0 270 86" aria-hidden="true"><g class="meter-staff"><line x1="18" y1="45" x2="258" y2="45"/><line x1="18" y1="53" x2="258" y2="53"/><line x1="18" y1="61" x2="258" y2="61"/><line x1="18" y1="69" x2="258" y2="69"/><line x1="18" y1="77" x2="258" y2="77"/></g><g class="meter-numbers"><text x="35" y="58">'+top+'</text><text x="35" y="75">'+bottom+'</text></g><g class="meter-notes">'+notes.join("")+beams.join("")+'</g>'+accents.join("")+'</svg>';
  }
  function meterBasicsDiagram() {
    const meters = [
      ["2","4","2 + 2",[2,2],"두 박 · 각 박을 8분음표 2개로"],
      ["3","4","2 + 2 + 2",[2,2,2],"세 박 · 각 박을 8분음표 2개로"],
      ["4","4","2 + 2 + 2 + 2",[2,2,2,2],"네 박 · 각 박을 8분음표 2개로"],
      ["6","8","3 + 3",[3,3],"큰 두 박 · 각 박을 8분음표 3개로"]
    ];
    return '<div class="notation-diagram meter-diagram" role="img" aria-label="실제 8분음표의 빔 묶음으로 2분의 4, 3분의 4, 4분의 4와 8분의 6을 비교">'+meters.map(function (meter) {
      return '<div class="meter-card"><header><strong>'+meter[0]+'/'+meter[1]+'</strong><span>'+meter[4]+'</span></header>'+meterScore(meter[0], meter[1], meter[3])+'<p><b>'+meter[2]+'</b><span>빔 하나가 한 박의 묶음</span></p></div>';
    }).join("")+'</div>';
  }
  window.HarmonyNotation = {
    render:function (key) { return renderVisual(key); },
    preview:function (key) { return skillPreviewMarkup({ sections:[{ visual:key }] }); },
    noteParts:noteParts,
    scoreKeys:Object.keys(SCORE_SETS),
    keyboardRange:keyboardLabRange
  };
  function formulaVisual(key) {
    const formulas = {
      "quality-pairs":[["장3화음","4 + 3"],["단3화음","3 + 4"],["감3화음","3 + 3"],["증3화음","4 + 4"]],
      "seventh-family":[["maj7","장3화음 + 장7도"],["m7","단3화음 + 단7도"],["7","장3화음 + 단7도"],["m7♭5","감3화음 + 단7도"]],
      "sus-add":[["sus2","3음을 2음으로 교체"],["sus4","3음을 4음으로 교체"],["add9","3화음에 9음 추가"],["6","3화음에 6음 추가"]]
    };
    const rows = formulas[key];
    if (!rows) return "";
    return '<div class="chord-formula-grid">'+rows.map(function (row) { return '<div class="formula-card"><strong>'+row[0]+'</strong><b>'+row[1]+'</b></div>'; }).join("")+'</div>';
  }

  function flowDiagram(label, steps) {
    return '<div class="concept-diagram flow-diagram" role="img" aria-label="'+escapeHtml(label)+'">'+steps.map(function (step, index) {
      return (index ? '<span class="concept-arrow" aria-hidden="true">→</span>' : '')+
        '<div class="concept-node '+escapeHtml(step.tone || '')+'"><strong>'+escapeHtml(step.head)+'</strong><span>'+escapeHtml(step.detail)+'</span></div>';
    }).join("")+'</div>';
  }

  function conceptVisual(key) {
    if (key === "pitch-alphabet") {
      return flowDiagram("음이름 C부터 B까지 순환", [
        { head:"C", detail:"다" }, { head:"D", detail:"라" }, { head:"E", detail:"마" }, { head:"F", detail:"바" },
        { head:"G", detail:"사" }, { head:"A", detail:"가" }, { head:"B", detail:"나" }, { head:"C", detail:"다시 시작", tone:"accent" }
      ]);
    }
    if (key === "ledger-lines") {
      return flowDiagram("덧줄 음을 읽는 네 단계", [
        { head:"1. Clef", detail:"음자리표 확인" }, { head:"2. Nearest line", detail:"가까운 끝 줄 찾기" },
        { head:"3. Ledger line", detail:"첫째·둘째 덧줄 세기" }, { head:"4. Note name", detail:"줄·칸으로 음이름 확인", tone:"accent" }
      ]);
    }
    if (key === "whole-half-map") {
      return '<div class="concept-diagram whole-half-diagram" role="img" aria-label="피아노에서 바로 이웃한 건반은 반음, 건반 하나를 건너뛴 거리는 온음이며 B C와 E F 사이는 흰건반끼리도 반음"><div class="step-keys"><span class="white">C</span><span class="black">C♯<small>D♭</small></span><span class="white">D</span><span class="black">D♯<small>E♭</small></span><span class="white">E</span><span class="white close">F</span><span class="black">F♯<small>G♭</small></span><span class="white">G</span></div><div class="step-rules"><span><b>C→C♯</b><strong>반음 1칸</strong></span><span><b>C→D</b><strong>온음 = 반음 2칸</strong></span><span><b>B–C · E–F</b><strong>흰건반 사이의 반음</strong></span></div></div>';
    }
    if (key === "sharp-order" || key === "flat-order") {
      const sharp = key === "sharp-order";
      const notes = sharp ? ["F","C","G","D","A","E","B"] : ["B","E","A","D","G","C","F"];
      const keys = sharp ? ["G","D","A","E","B","F♯","C♯"] : ["F","B♭","E♭","A♭","D♭","G♭","C♭"];
      return '<div class="concept-diagram accidental-order-diagram '+(sharp ? "sharp" : "flat")+'" role="img" aria-label="'+(sharp ? "샵 조표 순서 F C G D A E B와 마지막 샵의 반음 위가 장조 으뜸음인 관계" : "플랫 조표 순서 B E A D G C F와 끝에서 두 번째 플랫이 장조 으뜸음인 관계")+'"><header><strong>'+(sharp ? "♯ 붙는 순서" : "♭ 붙는 순서")+'</strong><span>'+notes.join(" → ")+'</span></header><div class="accidental-steps">'+notes.map(function (note, index) { return '<div><b>'+(index+1)+(sharp ? "♯" : "♭")+'</b><strong>'+keys[index]+'장조</strong><small>'+notes.slice(0,index+1).join("·")+'</small></div>'; }).join("")+'</div><p>'+(sharp ? "마지막 ♯에서 반음 위 = 장조 이름" : "끝에서 두 번째 ♭ = 장조 이름 · F장조는 ♭ 1개")+'</p></div>';
    }
    if (key === "fifths-wheel") return fifthsWheelDiagram();
    if (key === "relative-keys") {
      return '<div class="concept-diagram relative-key-diagram" role="img" aria-label="같은 조표를 공유하는 관계장조와 관계단조, 같은 으뜸음을 공유하는 나란한조 비교"><div class="relative-pairs"><span><strong>C장조</strong><b>조표 없음</b><strong>A단조</strong></span><span><strong>G장조</strong><b>♯ 1개</b><strong>E단조</strong></span><span><strong>E♭장조</strong><b>♭ 3개</b><strong>C단조</strong></span></div><div class="key-relation-rule"><p><b>관계조</b> 조표가 같음<br>장조 6음 = 관계단조 으뜸음</p><p><b>나란한조</b> 으뜸음이 같음<br>C장조 ↔ C단조 · 조표는 다름</p></div></div>';
    }
    if (key === "scale-degree-map") {
      const degrees = [["1","으뜸음","안정"],["2","위으뜸음","진행"],["3","가온음","장·단 결정"],["4","버금딸림음","3으로"],["5","딸림음","중심 지지"],["6","버금가온음","색채"],["7","이끎음","1로 반음"]];
      return '<div class="concept-diagram scale-degree-diagram" role="img" aria-label="장음계의 1음부터 7음까지 이름과 주요 경향"><div class="degree-line">'+degrees.map(function (degree) { return '<div class="degree-'+degree[0]+'"><b>'+degree[0]+'</b><strong>'+degree[1]+'</strong><small>'+degree[2]+'</small></div>'; }).join('<span>→</span>')+'</div><p><b>안정:</b> 1·3·5 &nbsp; <b>강한 경향:</b> 7→1, 4→3 &nbsp; <b>화음 분석:</b> 각 음계도 위에 I·ii·iii…를 쌓습니다.</p></div>';
    }
    if (key === "mode-map") {
      const modes = [["Ionian","아이오니안","장음계"],["Dorian","도리안","♭3 · ♭7"],["Phrygian","프리지안","♭2 · ♭3 · ♭6 · ♭7"],["Lydian","리디안","♯4"],["Mixolydian","믹솔리디안","♭7"],["Aeolian","에올리안","자연단음계"],["Locrian","로크리안","♭2 · ♭3 · ♭5 · ♭6 · ♭7"]];
      return '<div class="concept-diagram mode-map-diagram" role="img" aria-label="일곱 교회선법의 기준 장음계 대비 변화음"><header><strong>같은 일곱 음</strong><span>출발음이 바뀌면 중심과 반음 위치가 바뀝니다</span></header><div>'+modes.map(function (mode, index) { return '<span><b>'+(index+1)+'</b><strong>'+mode[1]+'</strong><small>'+mode[0]+'</small><em>'+mode[2]+'</em></span>'; }).join("")+'</div></div>';
    }
    if (key === "pentatonic-map") {
      return '<div class="concept-diagram pentatonic-diagram" role="img" aria-label="장음계에서 4음과 7음을 빼 장5음음계를 만들고 단5음음계에 플랫5를 더해 블루스음계를 만드는 관계"><div><small>장음계</small><strong>1 · 2 · 3 · 4 · 5 · 6 · 7</strong><span>4와 7을 뺌</span></div><b>↓</b><div class="pentatonic-core"><small>장5음음계</small><strong>1 · 2 · 3 · 5 · 6</strong><span>C–D–E–G–A</span></div><div class="pentatonic-core minor"><small>단5음음계</small><strong>1 · ♭3 · 4 · 5 · ♭7</strong><span>A–C–D–E–G</span></div><b>+ ♭5</b><div><small>블루스음계</small><strong>1 · ♭3 · 4 · ♭5 · 5 · ♭7</strong><span>긴장음을 지나 해결</span></div></div>';
    }
    if (key === "voice-ranges") {
      return '<div class="concept-diagram voice-range-diagram" role="img" aria-label="SATB 네 성부의 기본 활동 음역"><div><strong>S</strong><span>C4</span><i></i><span>A5</span></div><div><strong>A</strong><span>G3</span><i></i><span>D5</span></div><div><strong>T</strong><span>C3</span><i></i><span>G4</span></div><div><strong>B</strong><span>E2</span><i></i><span>C4</span></div></div>';
    }
    if (key === "staff-clefs") {
      return flowDiagram("낮은음자리표 F3에서 가온도 C4를 지나 높은음자리표 G4로 이어지는 큰보표 기준", [
        { head:"𝄢 F3", detail:"낮은음자리표 4째 줄" }, { head:"C4", detail:"두 보표 사이 가온도", tone:"accent" },
        { head:"𝄞 G4", detail:"높은음자리표 2째 줄" }
      ]);
    }
    if (key === "quality-pairs") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="장 단 감 증 3화음은 아래 3도와 위 3도의 반음 수 조합으로 구별"><div><small>장3화음</small><strong>4 + 3</strong><span>장3도 + 단3도</span></div><b>3음이 반음 내려가면<br>장 → 단</b><div><small>단3화음</small><strong>3 + 4</strong><span>단3도 + 장3도</span></div></div>';
    }
    if (key === "minor-scales") {
      return flowDiagram("자연단음계를 기준으로 화성형은 7음, 가락형 상행은 6음과 7음을 올리는 관계", [
        { head:"자연형", detail:"♭3 · ♭6 · ♭7" }, { head:"화성형", detail:"자연형 + ♯7", tone:"dominant" },
        { head:"가락형 ↑", detail:"자연형 + ♯6 · ♯7", tone:"accent" }, { head:"가락형 ↓", detail:"보통 자연형 복귀" }
      ]);
    }
    if (key === "voice-compare") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="C에서 G로 갈 때 모든 성부를 크게 옮기는 연결과 공통음 G를 유지해 최소 이동하는 연결 비교"><div><small>피해야 할 기본값</small><strong>모두 도약</strong><span>C–E–G → G–B–D</span></div><b>공통음 G 유지<br>나머지는 가까운 음</b><div><small>기본 연결</small><strong>최소 이동</strong><span>G 유지 · E→D · C→B</span></div></div>';
    }
    if (key === "nonchord-motion") {
      return flowDiagram("비화성음을 앞뒤 진행 모양으로 판별", [
        { head:"경과음", detail:"화음음 → 같은 방향 → 화음음" }, { head:"보조음", detail:"화음음 → 이웃 → 원래 음" },
        { head:"계류음", detail:"준비 · 유지 · 순차 해결" }, { head:"앞꾸밈음", detail:"도약 진입 · 순차 해결", tone:"accent" }
      ]);
    }
    if (key === "sequence-cycle") {
      return flowDiagram("같은 근음 이동과 화음 모형을 다른 음높이에서 반복하는 연속진행", [
        { head:"vi", detail:"Am" }, { head:"ii", detail:"Dm" }, { head:"V", detail:"G" }, { head:"I", detail:"C", tone:"tonic" }
      ]);
    }
    if (key === "loop-leadsheet") {
      return flowDiagram("반복 진행을 코드 이름, 베이스, 리듬, 성부 연결의 네 층으로 완성", [
        { head:"1 코드", detail:"기능 순서" }, { head:"2 베이스", detail:"근음·전위" },
        { head:"3 리듬", detail:"마디별 교체" }, { head:"4 연결", detail:"공통음·최소 이동", tone:"accent" }
      ]);
    }
    if (key === "harmonic-rhythm") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="한 마디에 코드 한 번과 두 번 바뀌는 화성 리듬 비교"><div><small>느린 화성 리듬</small><strong>| C — — — |</strong><span>한 마디 1화음</span></div><b>코드 수가 아니라<br>바뀌는 시점을 셈</b><div><small>빠른 화성 리듬</small><strong>| C — G — |</strong><span>한 마디 2화음</span></div></div>';
    }
    if (key === "transpose-map") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="C장조 진행과 G장조 진행에서 음이름은 바뀌지만 음계도와 기능은 유지"><div><small>C 장조</small><strong>C–F–G–C</strong><span>I–IV–V–I</span></div><b>모든 음을 같은 간격 이동<br>음계도는 유지</b><div><small>G 장조</small><strong>G–C–D–G</strong><span>I–IV–V–I</span></div></div>';
    }
    if (key === "melody-candidates") {
      return flowDiagram("강박의 멜로디 음에서 후보 화음을 찾고 앞뒤 기능으로 하나를 선택", [
        { head:"멜로디 E", detail:"강박 음" }, { head:"후보", detail:"C · Am · Em" },
        { head:"앞뒤 기능", detail:"T–PD–D–T" }, { head:"선택 C", detail:"E는 3음", tone:"accent" }
      ]);
    }
    if (key === "motion-directions" || key === "similar-parallel" || key === "contrary-oblique") {
      return '<div class="concept-diagram motion-card-grid" role="img" aria-label="동진행 병진행 반진행 사진행의 방향 비교"><div><strong>동진행</strong><b>↑ ↑</b><span>도수 바뀜</span></div><div><strong>병진행</strong><b>↑ ↑</b><span>도수 유지</span></div><div><strong>반진행</strong><b>↑ ↓</b><span>반대 방향</span></div><div><strong>사진행</strong><b>― ↑</b><span>한 성부 유지</span></div></div>';
    }
    if (["voice-crossing","voice-overlap","parallel-errors","hidden-perfect"].includes(key)) {
      const rows = {
        "voice-crossing":["같은 순간","T E4 > A C4","성부 교차"],
        "voice-overlap":["두 순간","다음 A F4 > 이전 S E4","성부 중복"],
        "parallel-errors":["같은 성부 쌍","P5 → P5 · 같은 방향","병행5도"],
        "hidden-perfect":["바깥 성부","같은 방향 + S 도약 → P5","숨은5도"]
      }[key];
      return '<div class="concept-diagram error-map" role="img" aria-label="'+escapeHtml(rows[2])+' 판정 조건"><span>'+escapeHtml(rows[0])+'</span><strong>'+escapeHtml(rows[1])+'</strong><b>'+escapeHtml(rows[2])+'</b></div>';
    }
    if (key === "interval-spelling") {
      return '<div class="concept-diagram interval-diagram" role="img" aria-label="C에서 E까지 음이름 세 개와 반음 네 칸을 세어 장3도를 찾는 과정"><div class="interval-count"><strong>1 · 2 · 3</strong><span>C — D — E</span><b>음이름 3개 = 3도</b></div><span class="concept-plus" aria-hidden="true">+</span><div class="interval-count semitone-count"><strong>½ + ½ + ½ + ½</strong><span>C에서 E까지 4반음</span><b>4반음 = 장</b></div><span class="concept-result">장3도</span></div>';
    }
    if (key === "interval-number") {
      return flowDiagram("C에서 G까지 양 끝을 포함하여 다섯 음이름을 세는 방법", [
        { head:"C", detail:"1 · 출발" }, { head:"D", detail:"2" }, { head:"E", detail:"3" },
        { head:"F", detail:"4" }, { head:"G", detail:"5 · 도착", tone:"accent" }
      ]);
    }
    if (key === "interval-direction") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="상행5도와 하행5도, 완전1도와 완전8도의 차이"><div><small>높이 방향</small><strong>C4 ↑ G4</strong><span>상행5도</span></div><b>방향과 도수는<br>따로 읽기</b><div><small>같은 음이름</small><strong>C4 → C5</strong><span>한 옥타브 = 8도</span></div></div>';
    }
    if (key === "interval-form") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="C와 E가 차례로 울리는 선율3도와 동시에 울리는 화성3도 비교"><div><small>차례로</small><strong>C → E</strong><span>선율3도</span></div><b>울리는 시간으로<br>구별</b><div><small>동시에</small><strong>C + E</strong><span>화성3도</span></div></div>';
    }
    if (key === "interval-simple") {
      return flowDiagram("한 옥타브 안의 단순음정 1도부터 8도", [
        { head:"1", detail:"같은 음" }, { head:"2·3", detail:"가까운 거리" }, { head:"4·5", detail:"가운데" },
        { head:"6·7", detail:"먼 거리" }, { head:"8", detail:"옥타브", tone:"accent" }
      ]);
    }
    if (key === "interval-family" || key === "interval-quality-ladder") {
      return '<div class="concept-diagram interval-family-diagram" role="img" aria-label="도수가 1 4 5 8이면 완전계열, 2 3 6 7이면 장단계열을 선택하고 반음 수에 따라 겹감 감 완전 또는 단 장 증 겹증으로 이동하는 음정 성질 관계도"><div class="quality-start"><strong>먼저 도수를 센다</strong><span>1·4·5·8도</span><span>2·3·6·7도</span></div><div class="interval-family-row perfect"><strong>완전계열</strong><b>1 · 4 · 5 · 8도</b><span><i>겹감</i><em>+½</em><i>감</i><em>+½</em><i class="core">완전</i><em>+½</em><i>증</i><em>+½</em><i>겹증</i></span></div><div class="interval-family-row major-minor"><strong>장·단계열</strong><b>2 · 3 · 6 · 7도</b><span><i>겹감</i><em>+½</em><i>감</i><em>+½</em><i>단</i><em>+½</em><i class="core">장</i><em>+½</em><i>증</i><em>+½</em><i>겹증</i></span></div><p>오른쪽으로 한 칸 갈 때 반음이 하나 늘고, 왼쪽으로 한 칸 갈 때 반음이 하나 줄어듭니다.</p></div>';
    }
    if (key === "interval-inversion") {
      return '<div class="concept-diagram inversion-diagram" role="img" aria-label="음정 전위에서 도수의 합은 9, 성질은 장과 단 또는 완전과 완전으로 바뀜"><div><strong>단3도</strong><span>3</span></div><span class="concept-swap">뒤집기</span><div><strong>장6도</strong><span>6</span></div><b>3 + 6 = 9</b><div><strong>완전4도</strong><span>4</span></div><span class="concept-swap">뒤집기</span><div><strong>완전5도</strong><span>5</span></div><b>4 + 5 = 9</b></div>';
    }
    if (key === "interval-compound") {
      return '<div class="concept-diagram interval-compound-diagram" role="img" aria-label="단순음정에 한 옥타브를 더하면 2도는 9도, 3도는 10도, 4도는 11도, 6도는 13도가 되는 관계"><div><small>단순음정</small><b>2도</b><b>3도</b><b>4도</b><b>6도</b></div><span>+ 한 옥타브<br><strong>도수에는 +7</strong></span><div><small>겹음정</small><b>9도</b><b>10도</b><b>11도</b><b>13도</b></div></div>';
    }
    if (key === "interval-consonance") {
      return '<div class="concept-diagram interval-consonance-diagram" role="img" aria-label="완전협화 불완전협화 불협화 음정 분류표"><div><strong>완전협화</strong><b>완전1 · 5 · 8도</b><span>매우 안정</span></div><div><strong>불완전협화</strong><b>장·단3 · 6도</b><span>부드러운 색채</span></div><div><strong>불협화</strong><b>2 · 7도, 증·감</b><span>긴장과 해결</span></div><small>완전4도는 성부 위치와 문맥을 확인합니다.</small></div>';
    }
    if (key === "interval-ear-process") {
      return flowDiagram("음정 청음의 네 단계", [
        { head:"1", detail:"첫 음 기억" }, { head:"2", detail:"방향 듣기" }, { head:"3", detail:"도수 후보" },
        { head:"4", detail:"반음으로 성질", tone:"accent" }
      ]);
    }
    if (key === "inversion-score") {
      return '<div class="concept-diagram bass-focus-diagram" role="img" aria-label="C화음의 베이스가 C면 기본위치, E면 1전위, G면 2전위"><div><strong>C</strong><span class="bass-note">C</span><small>기본위치</small></div><div><strong>C/E</strong><span class="bass-note">E</span><small>1전위</small></div><div><strong>C/G</strong><span class="bass-note">G</span><small>2전위</small></div></div>';
    }
    if (key === "symbol-anatomy") {
      return '<div class="concept-diagram symbol-anatomy-diagram" role="img" aria-label="코드 기호를 근음, 3화음 성질, 7음, 부가 또는 대체 지시의 네 칸으로 나누어 읽는 방법"><div class="symbol-slots"><div><strong>C</strong><span>① 근음</span><small>C·D♭·F♯</small></div><b>+</b><div><strong>m · dim · aug</strong><span>② 3화음 성질</span><small>단·감·증</small></div><b>+</b><div><strong>7 · maj7</strong><span>③ 7음 종류</span><small>단7도·장7도</small></div><b>+</b><div><strong>sus · add · 9·11·13</strong><span>④ 대체·추가</span><small>3음 교체·색채음</small></div></div><div class="symbol-worked"><strong>Gm7</strong><span>=</span><b>G 근음</b><span>+</span><b>단3화음</b><span>+</span><b>단7음</b><span>→</span><em>G–B♭–D–F</em></div></div>';
    }
    if (key === "key-scale") return fifthsWheelDiagram();
    if (key === "roman-transfer") {
      return '<div class="concept-diagram analysis-symbol-diagram" role="img" aria-label="로마숫자 대소문자와 감 기호, 전위 숫자를 해석하는 화성 분석기호 표"><div class="analysis-grammar"><div><strong>I · IV · V</strong><span>대문자 = 장3화음</span></div><div><strong>ii · iii · vi</strong><span>소문자 = 단3화음</span></div><div><strong>vii° · viiø7</strong><span>° 감 · ø 반감</span></div></div><div class="analysis-inversions"><span><b>3화음</b> I · I6 · I6/4</span><span><b>7화음</b> V7 · V6/5 · V4/3 · V4/2</span></div><div class="analysis-flow"><strong>ii7</strong><i>→</i><strong>V7</strong><i>→</i><strong>Imaj7</strong><small>프리도미넌트 → 도미넌트 → 토닉</small></div><p>예: <b>V7/V</b>는 ‘V로 향하는 도미넌트7화음’입니다. 로마숫자는 조 안의 위치, 숫자는 전위와 7음 유무를 표시합니다.</p></div>';
    }
    if (key === "diatonic-map") {
      return flowDiagram("C장조 다이어토닉 화음과 기능 묶음", [
        { head:"I · vi", detail:"토닉", tone:"tonic" }, { head:"ii · IV", detail:"프리도미넌트", tone:"predominant" },
        { head:"V · vii°", detail:"도미넌트", tone:"dominant" }, { head:"I", detail:"귀환", tone:"tonic" }
      ]);
    }
    if (key === "function-flow") {
      return flowDiagram("토닉에서 프리도미넌트와 도미넌트를 지나 토닉으로 돌아가는 흐름", [
        { head:"T", detail:"안정", tone:"tonic" }, { head:"PD", detail:"출발", tone:"predominant" },
        { head:"D", detail:"긴장", tone:"dominant" }, { head:"T", detail:"해결", tone:"tonic" }
      ]);
    }
    if (key === "cadence-compare") {
      return '<div class="concept-diagram cadence-diagram" role="img" aria-label="정격종지 V에서 I, 변격종지 IV에서 I의 방향 비교"><div><small>정격종지</small><strong>V</strong><span>→</span><strong>I</strong><b>긴장 → 해결</b></div><div><small>변격종지</small><strong>IV</strong><span>→</span><strong>I</strong><b>부드러운 닫힘</b></div></div>';
    }
    if (key === "guide-tone" || key === "two-five-one-guides") {
      return '<div class="concept-diagram tendency-diagram" role="img" aria-label="G7의 B는 C로 반음 상행하고 F는 E로 반음 하행"><div><strong>B</strong><span>반음 ↑</span><b>C</b></div><div class="resolution-brace">G7의 3음·7음</div><div><strong>F</strong><span>반음 ↓</span><b>E</b></div></div>';
    }
    if (key === "secondary-dominant") {
      return flowDiagram("C장조에서 D7이 G를 잠시 으뜸처럼 밀고 G가 C로 해결", [
        { head:"D7", detail:"V/V", tone:"secondary" }, { head:"G", detail:"V", tone:"dominant" }, { head:"C", detail:"I", tone:"tonic" }
      ]);
    }
    if (key === "secondary-targets") {
      return flowDiagram("세컨더리 도미넌트는 목표 화음에서 거꾸로 계산", [
        { head:"목표 G", detail:"C장조의 V", tone:"tonic" }, { head:"5도 위 D", detail:"도미넌트 근음", tone:"secondary" },
        { head:"D7", detail:"V7/V", tone:"dominant" }, { head:"G", detail:"해결", tone:"tonic" }
      ]);
    }
    if (key === "secondary-root-motion") {
      return flowDiagram("연속 도미넌트의 근음이 5도씩 하행", [
        { head:"A7", detail:"D 목표", tone:"secondary" }, { head:"D7", detail:"G 목표", tone:"secondary" },
        { head:"G7", detail:"C 목표", tone:"dominant" }, { head:"C", detail:"I", tone:"tonic" }
      ]);
    }
    if (key === "secondary-resolution" || key === "secondary-leading-resolution") {
      const leading = key === "secondary-resolution" ? ["F♯","G","C","B","D7의 3음·7음"] : ["F♯","G","E♭","D","vii°7/V의 바깥음"];
      return '<div class="concept-diagram tendency-diagram" role="img" aria-label="'+escapeHtml(leading[4])+' 반음 해결"><div><strong>'+leading[0]+'</strong><span>반음 ↑</span><b>'+leading[1]+'</b></div><div class="resolution-brace">'+escapeHtml(leading[4])+'</div><div><strong>'+leading[2]+'</strong><span>반음 ↓</span><b>'+leading[3]+'</b></div></div>';
    }
    if (key === "secondary-domino") {
      return flowDiagram("A7에서 D7, G7, C로 이어지는 도미넌트 연쇄", [
        { head:"A7", detail:"V7/V/V", tone:"secondary" }, { head:"D7", detail:"V7/V", tone:"secondary" },
        { head:"G7", detail:"V7", tone:"dominant" }, { head:"C", detail:"I", tone:"tonic" }
      ]);
    }
    if (key === "secondary-dominant-compare") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="G로 가는 D7과 F샤프 감7화음 비교"><div><small>목표의 5도 위</small><strong>D7</strong><span>V7/V</span></div><b>→ G ←</b><div><small>목표의 반음 아래</small><strong>F♯°7</strong><span>vii°7/V</span></div></div>';
    }
    if (key === "augmented-sixth") {
      return '<div class="concept-diagram tendency-diagram" role="img" aria-label="증6화음의 바깥음 A플랫과 F샤프가 도미넌트 G로 반음 해결"><div><strong>A♭</strong><span>반음 ↓</span><b>G</b></div><div class="resolution-brace">증6도 바깥음이 V의 근음으로 벌어져 해결</div><div><strong>F♯</strong><span>반음 ↑</span><b>G</b></div></div>';
    }
    if (key === "borrowed-compare") {
      return '<div class="concept-diagram borrowed-diagram" role="img" aria-label="C장조의 IV F장화음과 평행단조에서 빌린 iv F단화음 비교"><div><small>C장조 안</small><strong>IV · F</strong><span>F — <b>A</b> — C</span></div><span class="borrow-arrow">A → A♭</span><div><small>C단조에서 빌림</small><strong>iv · Fm</strong><span>F — <b>A♭</b> — C</span></div></div>';
    }
    if (key === "borrowed-family") {
      return '<div class="concept-diagram borrowed-family-diagram" role="img" aria-label="C장조에서 빌린 iv 플랫6 플랫7 화음"><div><strong>iv</strong><span>F–A♭–C</span><b>♭6</b></div><div><strong>♭VI</strong><span>A♭–C–E♭</span><b>♭6·♭3</b></div><div><strong>♭VII</strong><span>B♭–D–F</span><b>♭7</b></div></div>';
    }
    if (key === "flat-two-compare") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="N6와 플랫2 도미넌트7화음의 구성과 기능 비교"><div><small>♭II 3화음·제1전위</small><strong>N6</strong><span>F–A♭–D♭ → G</span></div><b>같은 ♭II 계열<br>다른 기능</b><div><small>♭II 도미넌트7화음</small><strong>D♭7</strong><span>D♭–F–A♭–C♭ → C</span></div></div>';
    }
    if (key === "tension-map") {
      return '<div class="concept-diagram tension-diagram" role="img" aria-label="코드톤 위에 9, 11, 13 텐션이 한 음씩 쌓이는 구조"><div class="chord-floor"><small>기본 골격</small><span><b>1</b><b>3</b><b>5</b><b>7</b></span></div><span class="concept-plus">+</span><div class="tension-floor"><small>색채음</small><span><b>9</b><b>11</b><b>13</b></span></div><strong class="tension-name">Cmaj9 · G13</strong></div>';
    }
    if (key === "tension-stack") {
      return '<div class="concept-diagram tension-diagram" role="img" aria-label="9 11 13은 2 4 6에 옥타브를 더한 자리"><div class="chord-floor"><small>단순음정</small><span><b>2</b><b>4</b><b>6</b></span></div><span class="concept-plus">+ 8</span><div class="tension-floor"><small>텐션 이름</small><span><b>9</b><b>11</b><b>13</b></span></div><strong class="tension-name">2+7=9 · 4+7=11 · 6+7=13</strong></div>';
    }
    if (key === "tension-available") {
      return '<div class="concept-diagram borrowed-family-diagram" role="img" aria-label="기본 규칙의 코드별 가용 텐션"><div><strong>Cmaj7</strong><span>9 · ♯11 · 13</span><b>D · F♯ · A</b></div><div><strong>Dm7</strong><span>9 · 11 · 13</span><b>E · G · B</b></div><div><strong>G7</strong><span>9 · 13</span><b>A · E</b></div></div>';
    }
    if (key === "tension-avoid") {
      return '<div class="concept-diagram theory-compare" role="img" aria-label="C메이저7에서 자연11과 샤프11의 충돌 비교"><div><small>지속 텐션 주의</small><strong>E–F</strong><span>단2도 충돌</span></div><b>F → F♯</b><div><small>이 과정의 기본 선택</small><strong>E–F♯</strong><span>장2도</span></div></div>';
    }
    return "";
  }

  function renderVisual(key) {
    if (key === "note-values") return noteValuesDiagram();
    if (key === "rest-values") return restValuesDiagram();
    if (key === "meter-basics") return meterBasicsDiagram();
    const score = SCORE_SETS[key];
    const formula = formulaVisual(key);
    if (!score) return conceptVisual(key) || '<div class="concept-map"><div class="concept-row"><strong>보기</strong><span>악보와 소리를 함께 비교하세요.</span></div></div>';
    const title = key === "lead-sheet" ? "리드시트의 코드와 멜로디"
      : key === "staff-basics" ? "다섯 줄과 네 칸"
      : key === "staff-clefs" ? "두 음자리표의 기준 음"
      : "";
    return conceptVisual(key) + (formula ? formula : "") + staffSvg(score, title, key);
  }

  const PREVIEW_LABELS = {
    "staff-basics":"5선", "pitch-alphabet":"C–B", "ledger-lines":"덧줄", "staff-clefs":"𝄞·𝄢", "enharmonic-spelling":"♯=♭", "voice-ranges":"SATB", "whole-half-map":"½·1", "sharp-order":"♯순서", "flat-order":"♭순서", "fifths-wheel":"5도권", "relative-keys":"장↔단", "scale-degree-map":"1–7", "mode-map":"Mode", "pentatonic-map":"5음",
    "note-values":"♩·𝅗𝅥", "rest-values":"쉼=박", "meter-basics":"4/4", "interval-spelling":"M3", "interval-number":"1·2·3", "interval-direction":"↑↓", "interval-form":"→ / +", "interval-simple":"1–8", "interval-family":"P·M·m", "interval-quality-ladder":"°·m·M·+", "interval-inversion":"3↔6", "interval-compound":"2→9", "interval-consonance":"협화", "interval-ear-process":"듣기",
    "part-spacing":"SATB", "part-motion":"7→1", "motion-directions":"↑↓―", "voice-crossing":"교차", "nonchord-motion":"C–D–E", "suspension-resolution":"4–3",
    "minor-scales":"m scale", "minor-dominant":"V7–i", "sequence-cycle":"vi–ii–V–I", "sequence-voices":"성부선",
    "symbol-anatomy":"C△7", "symbol-contrast":"sus·add", "triad-stack":"1·3·5", "triad-transpose":"D→E♭",
    "quality-pairs":"4+3", "quality-motion":"△·m·°", "inversion-score":"C/E", "bass-line":"Bass",
    "voice-compare":"최소이동", "voice-path":"성부선", "key-scale":"Key", "leading-tone":"7→1",
    "diatonic-map":"I–vii°", "roman-transfer":"Ⅰ→Ⅴ", "diatonic-sevenths":"7th", "function-flow":"T–PD–D",
    "function-options":"기능", "cadence-compare":"V–I", "cadence-voices":"종지선", "deceptive-cadence":"V–vi",
    "cadential-six-four":"I6/4–V", "passing-six-four":"경과6/4", "auxiliary-six-four":"보조6/4", "arpeggio-six-four":"분산6/4",
    "loop-leadsheet":"Loop", "practice-layers":"층쌓기", "seventh-family":"7th", "diminished-sevenths":"ø7·°7",
    "seventh-inversions":"7/B", "guide-tone":"3·7", "two-five-one-guides":"ii–V–I", "sus-add":"sus·add",
    "tension-map":"9·11·13", "transpose-map":"이조", "transpose-melody":"C→G", "harmonic-rhythm":"화성리듬",
    "rhythm-density":"밀도", "melody-candidates":"멜로디", "harmonize-options":"화음붙이기", "melody-register":"음역",
    "secondary-dominant":"V/V", "secondary-targets":"목표→V", "secondary-root-motion":"A→D→G", "secondary-chain":"V/x", "secondary-leading-tone":"vii°/V", "borrowed-compare":"IV↔iv",
    "borrowed-resolution":"iv–I", "lead-sheet":"Lead", "arrangement-layers":"편곡층", "revision-loop":"수정"
  };

  function skillPreviewMarkup(skill) {
    const key = skill.sections[0].visual;
    const kind = previewKind(key);
    const drawings = {
      staff:'<g class="preview-staff"><path d="M8 18H72M8 24H72M8 30H72M8 36H72M8 42H72"/></g><ellipse class="preview-ink" cx="28" cy="36" rx="6" ry="4"/><path class="preview-ink" d="M34 36V16"/><ellipse class="preview-accent" cx="54" cy="24" rx="6" ry="4"/><path class="preview-accent" d="M60 24V8"/>',
      rhythm:'<path class="preview-soft" d="M10 45H70"/><g class="preview-ink"><ellipse cx="18" cy="39" rx="5" ry="3.5"/><path d="M23 39V16"/><ellipse cx="38" cy="39" rx="5" ry="3.5"/><path d="M43 39V12M43 12H63V16"/><ellipse cx="58" cy="39" rx="5" ry="3.5"/><path d="M63 39V16"/></g><path class="preview-accent" d="M12 51H31M35 51H66"/>',
      interval:'<g class="preview-staff"><path d="M8 22H72M8 28H72M8 34H72M8 40H72"/></g><ellipse class="preview-ink" cx="22" cy="40" rx="6" ry="4"/><ellipse class="preview-accent" cx="58" cy="22" rx="6" ry="4"/><path class="preview-bracket" d="M22 15Q40 3 58 15M22 15V20M58 15V20"/>',
      scale:'<path class="preview-soft" d="M10 48H70"/><path class="preview-accent" d="M13 43L24 38L35 34L46 27L57 21L68 13"/><g class="preview-dots"><circle cx="13" cy="43" r="3"/><circle cx="24" cy="38" r="3"/><circle cx="35" cy="34" r="3"/><circle cx="46" cy="27" r="3"/><circle cx="57" cy="21" r="3"/><circle cx="68" cy="13" r="3"/></g>',
      chord:'<g class="preview-staff"><path d="M8 20H72M8 27H72M8 34H72M8 41H72"/></g><ellipse class="preview-ink" cx="38" cy="41" rx="7" ry="4"/><ellipse class="preview-accent" cx="38" cy="34" rx="7" ry="4"/><ellipse class="preview-ink" cx="38" cy="27" rx="7" ry="4"/><path class="preview-bracket" d="M53 42Q63 34 53 25"/>',
      voice:'<path class="preview-voice one" d="M10 15C26 10 37 25 70 17"/><path class="preview-voice two" d="M10 26C28 34 44 17 70 29"/><path class="preview-voice three" d="M10 38C28 30 48 47 70 37"/><path class="preview-voice four" d="M10 49C28 45 48 52 70 47"/><circle class="preview-node" cx="10" cy="15" r="3"/><circle class="preview-node" cx="70" cy="17" r="3"/>',
      melody:'<path class="preview-accent" d="M9 19C18 9 27 28 37 17S55 10 70 20"/><circle class="preview-ink" cx="9" cy="19" r="3"/><circle class="preview-ink" cx="37" cy="17" r="3"/><circle class="preview-ink" cx="70" cy="20" r="3"/><g class="preview-chord-blocks"><rect x="11" y="37" width="16" height="10" rx="2"/><rect x="32" y="37" width="16" height="10" rx="2"/><rect x="53" y="37" width="16" height="10" rx="2"/></g>',
      flow:'<path class="preview-flow-line" d="M17 30H63"/><path class="preview-flow-line" d="M57 24L63 30L57 36"/><circle class="preview-node start" cx="16" cy="30" r="8"/><circle class="preview-node middle" cx="40" cy="30" r="8"/><circle class="preview-node end" cx="64" cy="30" r="8"/>'
    };
    return '<span class="skill-preview preview-'+kind+'" aria-hidden="true"><svg viewBox="0 0 80 60">'+drawings[kind]+'</svg></span>';
  }

  function previewKind(key) {
    if (key.startsWith("interval") || key === "enharmonic-spelling") return "interval";
    if (["note-values","rest-values","meter-basics","harmonic-rhythm","rhythm-density"].includes(key)) return "rhythm";
    if (key.startsWith("staff-") || key === "pitch-alphabet" || key === "ledger-lines") return "staff";
    if (key.includes("scale") || key.startsWith("key-") || key === "leading-tone" || key.startsWith("transpose")) return "scale";
    if (key.includes("voice") || key.startsWith("part-") || key.includes("motion") || key.startsWith("nonchord") || key.startsWith("suspension") || key.includes("guide")) return "voice";
    if (key.includes("melody") || key.includes("harmonize") || key === "lead-sheet" || key.includes("arrangement") || key.includes("revision")) return "melody";
    if (key.includes("triad") || key.includes("seventh") || key.includes("quality") || key.includes("symbol") || key.includes("inversion") || key.includes("tension") || key === "sus-add") return "chord";
    return "flow";
  }

  function renderDashboard() {
    els.unitList.innerHTML = curriculum.strands.map(function (group) {
      return '<details class="unit-block skill-strand"><summary><span class="strand-mark" aria-hidden="true">'+strandIcon(group.id)+'</span><strong>'+escapeHtml(group.title)+'</strong></summary><div class="lesson-list">'+group.skills.map(skillButtonMarkup).join("")+'</div></details>';
    }).join("");
  }
  function strandIcon(id) {
    const icons = {
      fundamentals:'<path d="M6 12H34M6 17H34M6 22H34M6 27H34M6 32H34"/><ellipse cx="25" cy="27" rx="5" ry="3.5"/><path d="M30 27V10"/>',
      interval:'<circle cx="10" cy="29" r="4"/><circle cx="30" cy="14" r="4"/><path d="M10 20Q20 8 30 8M10 20V24M30 8V10"/>',
      "scale-basics":'<path d="M7 31L13 27L19 24L25 19L31 15L35 9"/><circle cx="7" cy="31" r="2"/><circle cx="19" cy="24" r="2"/><circle cx="31" cy="15" r="2"/>',
      "chord-language":'<ellipse cx="20" cy="30" rx="5" ry="3"/><ellipse cx="20" cy="22" rx="5" ry="3"/><ellipse cx="20" cy="14" rx="5" ry="3"/><path d="M29 31Q35 22 29 13"/>',
      "tonal-map":'<circle cx="9" cy="22" r="5"/><circle cx="20" cy="11" r="5"/><circle cx="31" cy="22" r="5"/><path d="M13 18L16 15M24 15L27 18M27 26L13 26"/>',
      "part-writing":'<path d="M6 9C14 7 21 16 34 11M6 17C16 25 24 13 34 20M6 26C16 20 25 34 34 27M6 34C17 30 25 37 34 33"/>',
      progression:'<circle cx="8" cy="20" r="4"/><circle cx="20" cy="20" r="4"/><circle cx="32" cy="20" r="4"/><path d="M12 20H16M24 20H28M29 16L33 20L29 24"/>',
      chromatic:'<path d="M6 29C14 29 16 12 24 12S30 22 35 22"/><path d="M20 9L24 5L28 9L24 13Z"/>',
      application:'<path d="M6 13C13 5 20 20 27 12S34 10 36 13"/><rect x="7" y="26" width="8" height="7" rx="1"/><rect x="17" y="26" width="8" height="7" rx="1"/><rect x="27" y="26" width="8" height="7" rx="1"/>',
      "basic-extension":'<circle cx="8" cy="26" r="4"/><circle cx="20" cy="14" r="4"/><circle cx="32" cy="26" r="4"/><path d="M11 23L17 17M23 17L29 23M12 28H28"/>'
    };
    return '<svg class="strand-icon" viewBox="0 0 40 40">'+(icons[id] || icons.application)+'</svg>';
  }
  function prereqMarkup(skill) {
    if (!skill.prereqs.length) return "";
    return '<p class="prereq-line"><strong>먼저 확인</strong> '+skill.prereqs.map(function (id) { return '<span class="prereq-chip '+(state.completed.has(id) ? "done" : "")+'">'+escapeHtml(curriculum.skills[id].title)+'</span>'; }).join(" ")+'</p>';
  }
  function skillButtonMarkup(id) {
    const skill = curriculum.skills[id];
    const strand = getStrand(id);
    const lessonNumber = strand.skills.indexOf(id) + 1;
    const complete = state.completed.has(id);
    const ready = prereqsMet(id);
    return '<button class="lesson-button skill-button '+(complete ? "completed" : ready ? "ready" : "needs-prereq")+'" type="button" data-open-skill="'+id+'"><span class="lesson-copy"><span class="lesson-order">'+lessonNumber+'차시</span><strong>'+escapeHtml(skill.title)+'</strong>'+(!ready && !complete ? '<span class="prereq-note">앞 진도를 먼저 익히면 이해하기 쉽습니다.</span>' : "")+'</span><span class="skill-status">'+(complete ? "✓ 완료" : id === state.currentId ? "학습 중" : "열기")+'</span></button>';
  }

  function dashboardUrl() {
    return window.location.pathname + window.location.search;
  }

  function skillUrl(id) {
    return dashboardUrl() + "#skill=" + encodeURIComponent(id);
  }

  function rememberSkillView(id) {
    const currentView = window.history.state && window.history.state.harmonyView;
    const stateValue = { harmonyView:"skill", skillId:id };
    if (currentView === "skill") window.history.replaceState(stateValue, "", skillUrl(id));
    else window.history.pushState(stateValue, "", skillUrl(id));
  }

  function openSkill(id, options) {
    const skill = curriculum.skills[id];
    if (!skill) return;
    if (!options || !options.fromHistory) rememberSkillView(id);
    state.currentId = id;
    writeStorage(CURRENT_KEY, id);
    state.questionIndex = 0;
    state.firstTryCorrect = 0;
    state.attempts = 0;
    state.labPassed = state.completed.has(id);
    state.evidencePassed = state.completed.has(id);
    state.selectedMidis = new Set();
    const strand = getStrand(id);
    const ids = allSkillIds();
    const order = ids.indexOf(id);
    const followingId = ids[order+1] || "";
    els.currentLesson.textContent = strand.title + " · " + skill.title;
    els.nextSkillNav.disabled = !followingId;
    els.nextSkillNav.dataset.nextSkill = followingId;
    els.nextSkillNav.innerHTML = followingId ? '다음 학습 <span aria-hidden="true">→</span>' : '마지막 학습';
    els.lessonUnit.textContent = strand.title;
    els.lessonTitle.textContent = skill.title;
    els.lessonEnglish.textContent = skill.english;
    els.lessonOutcome.innerHTML = '<strong>학습 목표</strong> '+escapeHtml(skill.outcome);
    els.lessonSections.innerHTML = skill.sections.map(function (section) {
      const audio = section.audioOptions && section.audioOptions.length ? '<div class="section-audio" aria-label="비교 청음">'+section.audioOptions.map(function (option, index) { return '<button type="button" data-section-audio="'+index+'">♪ '+escapeHtml(option.label)+'</button>'; }).join("")+'</div>' : "";
      const worked = section.worked ? '<div class="worked-example"><strong>'+escapeHtml(section.worked.title || "같이 풀기")+'</strong><ol>'+section.worked.steps.map(function (step) { return '<li>'+escapeHtml(step)+'</li>'; }).join("")+'</ol>'+(section.worked.answer ? '<p><b>답</b> '+escapeHtml(section.worked.answer)+'</p>' : "")+'</div>' : "";
      const intro = section.body.length ? '<p>'+escapeHtml(section.body[0])+'</p>' : "";
      const detail = section.body.slice(1).map(function (paragraph) { return '<p>'+escapeHtml(paragraph)+'</p>'; }).join("");
      return '<section class="lesson-section"><div class="section-copy section-lead"><h2>'+escapeHtml(section.title)+'</h2>'+intro+'</div><div class="visual-board lesson-visual">'+renderVisual(section.visual)+'</div><div class="section-copy section-detail">'+detail+worked+'<p class="section-takeaway"><strong>핵심 정리</strong> '+escapeHtml(section.takeaway)+'</p>'+audio+'</div></section>';
    }).join("");
    Array.from(els.lessonSections.querySelectorAll(".lesson-section")).forEach(function (sectionEl, sectionIndex) {
      sectionEl.querySelectorAll("[data-section-audio]").forEach(function (button) {
        button.addEventListener("click", function () {
          const option = skill.sections[sectionIndex].audioOptions[Number(button.dataset.sectionAudio)];
          playGroups(option.groups, option);
        });
      });
    });
    els.termList.innerHTML = skill.terms.map(function (term) { return '<div class="term-item"><strong>'+escapeHtml(term[0])+'</strong><span>'+escapeHtml(term[1])+'</span></div>'; }).join("");
    renderLab(skill);
    renderQuestion();
    els.practicePanel.open = false;
    els.dashboard.hidden = true;
    els.study.hidden = false;
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  function labHeader(lab) {
    return '<div class="lab-heading"><div><h2 id="constructionTitle">'+escapeHtml(lab.title)+'</h2><p>'+escapeHtml(lab.instruction)+'</p></div>'+(lab.reference ? '<button class="lab-reference" type="button" data-lab-reference>♪ 기준 소리</button>' : "")+'</div>';
  }
  function renderLab(skill) {
    const lab = skill.lab;
    els.constructionLab.className = "construction-lab lab-" + lab.type;
    if (lab.type === "keyboard") renderKeyboardLab(lab);
    else if (lab.type === "aural") renderAuralLab(lab);
    else if (lab.type === "rhythm") renderRhythmLab(lab);
    else renderProgressionLab(lab);
  }
  function renderKeyboardLab(lab) {
    els.constructionLab.innerHTML = labHeader(Object.assign({}, lab, { reference:true })) + '<div id="labPiano" class="piano lab-piano" aria-label="구성 실습 건반"></div><div class="lab-readout"><strong>선택한 음</strong><span id="labSelection">아직 선택한 음이 없습니다.</span></div><div class="lab-actions"><button class="lab-check" type="button" id="labCheck">구성 확인</button><button class="lab-reset" type="button" id="labReset">선택 지우기</button></div><p id="labFeedback" class="lab-feedback" aria-live="polite"></p>';
    const range = keyboardLabRange(lab);
    const piano = byId("labPiano");
    piano.setAttribute("aria-label", "구성 실습 건반 "+midiName(range.from)+"부터 "+midiName(range.to)+"까지");
    buildPiano(piano, range.from, range.to, function (midi, button) {
      if (state.selectedMidis.has(midi)) { state.selectedMidis.delete(midi); button.classList.remove("selected"); }
      else { state.selectedMidis.add(midi); button.classList.add("selected"); window.HarmonyPiano.playMidi(midi, { duration:.55 }); }
      byId("labSelection").textContent = state.selectedMidis.size ? Array.from(state.selectedMidis).sort(function (a,b) { return a-b; }).map(midiName).join(" · ") : "아직 선택한 음이 없습니다.";
    });
    byId("labCheck").addEventListener("click", function () {
      const selected = Array.from(state.selectedMidis).sort(function (a,b) { return a-b; });
      const target = lab.mode === "exact" ? (lab.targetMidis || []).slice().sort(function (a,b) { return a-b; }) : (lab.targetPcs || []).slice().sort(function (a,b) { return a-b; });
      const actual = lab.mode === "exact" ? selected : Array.from(new Set(selected.map(function (midi) { return midi % 12; }))).sort(function (a,b) { return a-b; });
      const correct = actual.length === target.length && actual.every(function (value, index) { return value === target[index]; });
      setLabFeedback(correct, correct ? lab.success : lab.hint);
    });
    byId("labReset").addEventListener("click", function () {
      state.selectedMidis.clear();
      byId("labPiano").querySelectorAll(".selected").forEach(function (button) { button.classList.remove("selected"); });
      byId("labSelection").textContent = "아직 선택한 음이 없습니다.";
      byId("labFeedback").textContent = "선택을 지웠습니다. 다시 구성해 보세요.";
      byId("labFeedback").className = "lab-feedback";
    });
    byId("constructionLab").querySelector("[data-lab-reference]").addEventListener("click", function () { playGroups([lab.reference]); });
  }
  function renderAuralLab(lab) {
    els.constructionLab.innerHTML = labHeader(lab) + '<div class="aural-console"><button class="lab-reference aural-play" type="button" id="auralPlay">♪ 문제 소리 듣기</button><div class="aural-choices">'+lab.choices.map(function (choice) { return '<button type="button" data-aural-choice="'+escapeHtml(choice)+'">'+escapeHtml(choice)+'</button>'; }).join("")+'</div><p id="labFeedback" class="lab-feedback" aria-live="polite">횟수만 세지 말고 강세와 묶임을 들으세요.</p></div>';
    byId("auralPlay").addEventListener("click", function () { playGroups(lab.groups, lab); });
    els.constructionLab.querySelectorAll("[data-aural-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        const correct = button.dataset.auralChoice === lab.answer;
        if (correct) els.constructionLab.querySelectorAll("[data-aural-choice]").forEach(function (item) { item.disabled = true; });
        setLabFeedback(correct, correct ? lab.success : lab.hint);
      });
    });
  }
  function renderRhythmLab(lab) {
    const optionById = new Map(lab.options.map(function (option) { return [option.id, option]; }));
    let selected = [];
    const optionButtons = lab.options.map(function (option) {
      return '<button type="button" data-rhythm-option="'+escapeHtml(option.id)+'"><b>'+escapeHtml(option.symbol)+'</b><span>'+escapeHtml(option.label)+'</span><small>'+option.beats+'박</small></button>';
    }).join("");
    els.constructionLab.innerHTML = labHeader(lab) + '<div class="rhythm-builder"><div class="rhythm-options">'+optionButtons+'</div><div class="rhythm-measure"><strong>4/4</strong><div id="rhythmSequence" class="rhythm-sequence"></div></div><p id="rhythmTotal" class="rhythm-total">선택: 0 / 4박</p><div class="lab-actions"><button class="lab-check" type="button" id="rhythmCheck">마디 확인</button><button class="lab-reset" type="button" id="rhythmReset">다시 만들기</button></div><p id="labFeedback" class="lab-feedback" aria-live="polite">지시된 순서대로 기호를 놓아 정확히 네 박을 채우세요.</p></div>';
    function redraw() {
      const options = selected.map(function (id) { return optionById.get(id); });
      const total = options.reduce(function (sum, option) { return sum + option.beats; }, 0);
      byId("rhythmSequence").innerHTML = options.map(function (option, index) {
        return '<span class="rhythm-piece '+(option.silent ? 'is-rest' : 'is-sound')+'" style="--units:'+(option.beats*2)+'" data-rhythm-index="'+index+'"><b>'+escapeHtml(option.symbol)+'</b><small>'+escapeHtml(option.label)+'</small></span>';
      }).join("");
      byId("rhythmTotal").textContent = "선택: " + total + " / " + lab.beats + "박";
      byId("rhythmTotal").className = "rhythm-total " + (total === lab.beats ? "is-complete" : total > lab.beats ? "is-over" : "");
    }
    els.constructionLab.querySelectorAll("[data-rhythm-option]").forEach(function (button) {
      button.addEventListener("click", function () {
        selected.push(button.dataset.rhythmOption);
        redraw();
      });
    });
    byId("rhythmSequence").addEventListener("click", function (event) {
      const piece = event.target.closest("[data-rhythm-index]");
      if (!piece) return;
      selected.splice(Number(piece.dataset.rhythmIndex), 1);
      redraw();
    });
    byId("rhythmCheck").addEventListener("click", function () {
      const correct = selected.length === lab.answer.length && selected.every(function (id, index) { return id === lab.answer[index]; });
      setLabFeedback(correct, correct ? lab.success : lab.hint);
    });
    byId("rhythmReset").addEventListener("click", function () {
      selected = [];
      redraw();
      byId("labFeedback").textContent = "선택을 지웠습니다. 지시된 순서와 총길이를 다시 확인하세요.";
      byId("labFeedback").className = "lab-feedback";
    });
    redraw();
  }
  function renderProgressionLab(lab) {
    const selects = Array.from({ length:lab.slots }, function (_, index) { return '<label><span>'+(index+1)+'마디</span><select class="progression-slot" aria-label="'+(index+1)+'마디 코드"><option value="">코드 선택</option>'+lab.options.map(function (option) { return '<option>'+escapeHtml(option)+'</option>'; }).join("")+'</select></label>'; }).join("");
    els.constructionLab.innerHTML = labHeader(lab) + '<div class="progression-builder">'+selects+'</div><div class="lab-actions"><button class="lab-reference" type="button" id="progressionPlay">♪ 내 진행 듣기</button><button class="lab-check" type="button" id="progressionCheck">진행 확인</button></div><p id="labFeedback" class="lab-feedback" aria-live="polite">코드 관계를 고른 뒤 실제 소리로 연결을 확인하세요.</p>';
    function values() { return Array.from(els.constructionLab.querySelectorAll(".progression-slot")).map(function (select) { return select.value; }); }
    byId("progressionPlay").addEventListener("click", function () {
      const chosen = values();
      if (chosen.some(function (value) { return !value; })) { setLabFeedback(false, "모든 마디의 코드를 먼저 선택하세요."); return; }
      playGroups(chosen.map(function (name) { return lab.audioMap[name]; }));
    });
    byId("progressionCheck").addEventListener("click", function () {
      const chosen = values();
      const correct = lab.accepted.some(function (answer) { return answer.every(function (value, index) { return value === chosen[index]; }); });
      setLabFeedback(correct, correct ? lab.success : lab.hint);
    });
  }
  function setLabFeedback(correct, message) {
    const feedback = byId("labFeedback");
    feedback.textContent = message;
    feedback.className = "lab-feedback " + (correct ? "success" : "error");
    if (correct) {
      state.labPassed = true;
      maybeCompleteSkill();
    }
  }

  function renderQuestion() {
    const skill = curriculum.skills[state.currentId];
    const question = skill.evidence[state.questionIndex];
    els.roundCounter.textContent = "문제 " + (state.questionIndex + 1) + " / " + skill.evidence.length;
    els.scoreText.textContent = "첫 시도 정답 " + state.firstTryCorrect + "개";
    els.questionKind.textContent = question.kind;
    els.questionPrompt.textContent = question.prompt;
    els.listenButton.hidden = !question.audioGroups;
    els.questionVisual.innerHTML = question.visual ? '<div class="visual-board">'+renderVisual(question.visual)+'</div>' : "";
    els.answerChoices.innerHTML = question.choices.map(function (choice) { return '<button class="answer-choice" type="button" data-answer="'+escapeHtml(choice)+'">'+escapeHtml(choice)+'</button>'; }).join("");
    els.feedback.textContent = "정답을 고른 뒤 설명을 확인하세요.";
    els.feedback.className = "feedback";
    els.nextButton.hidden = true;
    els.nextButton.onclick = null;
    state.attempts = 0;
    els.answerChoices.querySelectorAll("[data-answer]").forEach(function (button) {
      button.addEventListener("click", function () { answerQuestion(button, question); });
    });
    els.listenButton.onclick = function () { playGroups(question.audioGroups); };
  }
  function answerQuestion(button, question) {
    state.attempts += 1;
    if (button.dataset.answer !== question.answer) {
      button.classList.add("wrong");
      button.disabled = true;
      els.feedback.textContent = "다시 생각해 보세요. " + question.explain;
      els.feedback.className = "feedback error";
      return;
    }
    if (state.attempts === 1) state.firstTryCorrect += 1;
    els.answerChoices.querySelectorAll("[data-answer]").forEach(function (choice) { choice.disabled = true; });
    button.classList.add("correct");
    els.feedback.textContent = "맞았습니다. " + question.explain;
    els.feedback.className = "feedback success";
    els.scoreText.textContent = "첫 시도 정답 " + state.firstTryCorrect + "개";
    els.nextButton.textContent = state.questionIndex === curriculum.skills[state.currentId].evidence.length - 1 ? "수행 결과 확인" : "다음 문제";
    els.nextButton.hidden = false;
  }
  function nextQuestion() {
    const skill = curriculum.skills[state.currentId];
    if (state.questionIndex < skill.evidence.length - 1) {
      state.questionIndex += 1;
      renderQuestion();
      return;
    }
    state.evidencePassed = true;
    if (!state.labPassed) {
      els.feedback.textContent = "확인 문제를 마쳤습니다. 위의 직접 활동까지 성공하면 학습이 완료됩니다.";
      els.feedback.className = "feedback pending";
      els.nextButton.textContent = "직접 구성 수행으로 이동";
      els.nextButton.onclick = function () { els.constructionLab.scrollIntoView({ behavior:"smooth", block:"start" }); };
      return;
    }
    maybeCompleteSkill();
  }
  function maybeCompleteSkill() {
    if (!state.labPassed || !state.evidencePassed) return;
    const wasNew = !state.completed.has(state.currentId);
    state.completed.add(state.currentId);
    saveCompleted();
    if (wasNew) showToast("학습 완료 기록을 저장했습니다.");
    if (els.feedback) {
      els.feedback.textContent = "직접 활동과 확인 문제를 모두 마쳐 학습 완료로 기록했습니다.";
      els.feedback.className = "feedback success";
    }
    const ids = allSkillIds();
    const followingId = ids[ids.indexOf(state.currentId)+1];
    els.nextButton.hidden = false;
    els.nextButton.textContent = followingId ? "다음 학습으로" : "진도표 보기";
    els.nextButton.onclick = function () { if (followingId) openSkill(followingId); else showDashboard(); };
  }

  function midiName(midi) { return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1); }
  function keyboardLabRange(lab) {
    const reference = Array.isArray(lab && lab.reference) ? lab.reference : [];
    const exactTargets = Array.isArray(lab && lab.targetMidis) ? lab.targetMidis : [];
    const required = (lab && lab.mode === "exact" ? exactTargets.concat(reference) : reference).filter(Number.isFinite);
    if (!required.length) return { from:48, to:72 };
    const cAtOrBelow = function (midi) { return midi - ((midi % 12) + 12) % 12; };
    let from = cAtOrBelow(Math.min.apply(null, required));
    let to = cAtOrBelow(Math.max.apply(null, required)) + 12;
    while (to - from < 24) {
      if (from >= 48) from -= 12;
      else to += 12;
    }
    while (from < 24) { from += 12; to += 12; }
    while (to > 108) { from -= 12; to -= 12; }
    return { from:from, to:to };
  }
  function buildPiano(container, fromMidi, toMidi, onPress) {
    const whitePitchClasses = new Set([0,2,4,5,7,9,11]);
    const notes = [];
    for (let midi = fromMidi; midi <= toMidi; midi += 1) notes.push(midi);
    const whites = notes.filter(function (midi) { return whitePitchClasses.has(midi % 12); });
    container.innerHTML = "";
    whites.forEach(function (midi) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "piano-key white";
      button.dataset.midi = midi;
      button.setAttribute("aria-label", midiName(midi));
      button.innerHTML = '<span>'+midiName(midi)+'</span>';
      button.addEventListener("click", function () { onPress(midi, button); });
      container.appendChild(button);
    });
    notes.filter(function (midi) { return !whitePitchClasses.has(midi % 12); }).forEach(function (midi) {
      const priorWhites = notes.filter(function (value) { return value < midi && whitePitchClasses.has(value % 12); }).length;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "piano-key black";
      button.dataset.midi = midi;
      button.style.left = (priorWhites / whites.length * 100) + "%";
      button.setAttribute("aria-label", midiName(midi));
      button.innerHTML = '<span>'+midiName(midi)+'</span>';
      button.addEventListener("click", function () { onPress(midi, button); });
      container.appendChild(button);
    });
  }
  function showDashboard() {
    els.study.hidden = true;
    els.dashboard.hidden = false;
    renderDashboard();
    window.scrollTo({ top:0, behavior:"smooth" });
  }
  function returnToDashboard() {
    if (window.history.state && window.history.state.harmonyView === "skill") {
      window.history.back();
      return;
    }
    window.history.replaceState({ harmonyView:"dashboard" }, "", dashboardUrl());
    showDashboard();
  }
  function resetProgress() {
    if (!window.confirm("이 브라우저에 저장된 화성학 학습 기록을 지울까요?")) return;
    state.completed.clear();
    saveCompleted();
    renderDashboard();
    showToast("학습 기록을 초기화했습니다.");
  }
  function bindEvents() {
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-open-skill]");
      if (button) openSkill(button.dataset.openSkill);
    });
    els.backToCourse.addEventListener("click", returnToDashboard);
    els.nextSkillNav.addEventListener("click", function () {
      if (els.nextSkillNav.dataset.nextSkill) openSkill(els.nextSkillNav.dataset.nextSkill);
    });
    els.resetProgress.addEventListener("click", resetProgress);
    els.nextButton.addEventListener("click", nextQuestion);
  }
  function init() {
    ["dashboard","study","resetProgress","unitList","backToCourse","nextSkillNav","currentLesson","lessonUnit","lessonTitle","lessonEnglish","lessonOutcome","lessonSections","constructionLab","termList","practicePanel","roundCounter","scoreText","questionKind","questionPrompt","listenButton","questionVisual","answerChoices","feedback","nextButton","toast"].forEach(function (id) { els[id] = byId(id); });
    const requestedSkill = new URLSearchParams(window.location.hash.slice(1)).get("skill");
    window.history.replaceState({ harmonyView:"dashboard" }, "", dashboardUrl());
    renderDashboard();
    bindEvents();
    showDashboard();
    if (requestedSkill && curriculum.skills[requestedSkill]) openSkill(requestedSkill);
    window.addEventListener("popstate", function (event) {
      const view = event.state || {};
      if (view.harmonyView === "skill" && curriculum.skills[view.skillId]) openSkill(view.skillId, { fromHistory:true });
      else showDashboard();
    });
    if (window.HarmonyPiano) window.setTimeout(function () { window.HarmonyPiano.preload().catch(function () { /* First user action will use the synthesized fallback. */ }); }, 1200);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
