(function () {
    "use strict";

    const DATA = window.PianoSkillsData;
    const STORAGE_KEY = "pianoScaleVoicingProgressV1";
    const CALIBRATION_KEY = "pianoScaleVoicingPxPerMmV1";
    const WHITE_PCS = new Set([0, 2, 4, 5, 7, 9, 11]);
    const SHARP_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const FLAT_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
    const ROOT_PC_ORDER = DATA.keys.map((key) => key.pc);
    const KEY_BY_ID = new Map(DATA.keys.map((key) => [key.id, key]));

    const elements = Object.fromEntries([
        "courseProgress", "midiButton", "midiStatus", "midiDetail", "midiInput", "railCount", "lessonList",
        "lessonEyebrow", "lessonTitle", "lessonSummary", "skillBadge", "conceptList", "methodList",
        "exerciseTitle", "passMark", "attemptSummary", "keySelect", "variantField", "variantSelect", "handField",
        "handSelect", "tempo", "tempoOutput", "targetTempo", "targetStrip", "scoreSvg", "scorePrevButton",
        "scoreNextButton", "scorePage", "scoreCaption", "listenButton", "practiceButton", "metronomeButton",
        "resetAttemptButton", "feedback", "fitModeButton", "realModeButton", "calibrateButton", "keyboardHint",
        "keyboardViewport", "keyboard", "referenceContent", "calibrationDialog", "calibrationRange", "cardGauge",
        "saveCalibration", "toast"
    ].map((id) => [id, document.getElementById(id)]));

    const state = {
        mode: "scale",
        scaleLessonId: DATA.scaleLessons[0].id,
        voicingModuleId: DATA.voicingModules[0].id,
        curriculumTrack: "foundation",
        keyId: "C",
        variant: "major",
        hand: "right",
        keyboardMode: "fit",
        pxPerMm: Number(localStorage.getItem(CALIBRATION_KEY)) || (96 / 25.4),
        exercise: null,
        practice: null,
        heldNotes: new Set(),
        midiAccess: null,
        midiInputId: "",
        metronomeTimer: null,
        metronomeContext: null,
        scorePage: 0,
        progress: loadProgress()
    };

    function loadProgress() {
        try {
            const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return parsed && Array.isArray(parsed.passed) ? parsed : { passed: [] };
        } catch (_) {
            return { passed: [] };
        }
    }

    function saveProgress() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
        updateProgressText();
    }

    function updateProgressText() {
        elements.courseProgress.textContent = `통과 ${state.progress.passed.length}`;
    }

    function currentKey() {
        return KEY_BY_ID.get(state.keyId) || DATA.keys[0];
    }

    function noteName(midiOrPc, key) {
        const names = (key || currentKey()).spelling === "flat" ? FLAT_NAMES : SHARP_NAMES;
        return names[((midiOrPc % 12) + 12) % 12];
    }

    function midiName(midi, key) {
        return `${noteName(midi, key)}${Math.floor(midi / 12) - 1}`;
    }

    function notationKey(spelling) {
        return { ...currentKey(), spelling: spelling || currentKey().spelling };
    }

    function bluesNoteName(midiOrPc) {
        const key = currentKey();
        return noteName(midiOrPc, notationKey(key.id === "C" || key.spelling === "flat" ? "flat" : key.spelling));
    }

    function baseForPc(pc, low) {
        let note = (low || 48) + pc;
        while (note < (low || 48)) note += 12;
        return note;
    }

    function makeVoicing(rootPc, intervals, label, low, split) {
        const root = baseForPc(rootPc, low || 48);
        let notes = intervals.map((interval) => root + interval);
        while (Math.max(...notes) > 88) notes = notes.map((note) => note - 12);
        const result = { label, notes };
        if (Number.isInteger(split)) {
            result.split = split;
            result.left = notes.slice(0, split);
            result.right = notes.slice(split);
        }
        return result;
    }

    function chord(rootPc, type, label, low) {
        const intervals = {
            maj7: [0, 4, 7, 11], dom7: [0, 4, 7, 10], min7: [0, 3, 7, 10],
            halfDim: [0, 3, 6, 10], dim7: [0, 3, 6, 9], sus7: [0, 5, 7, 10],
            min6: [0, 3, 7, 9], maj6: [0, 4, 7, 9]
        }[type];
        return makeVoicing(rootPc, intervals, label, low);
    }

    function getScaleExercise() {
        const key = currentKey();
        const type = DATA.scaleTypes[state.variant] || DATA.scaleTypes.major;
        const minorSharpKeys = new Set(["E", "A", "B", "Gb"]);
        const notationSpelling = state.variant === "major" ? key.spelling : minorSharpKeys.has(key.id) ? "sharp" : "flat";
        const scoreKey = notationKey(notationSpelling);
        const start = (state.hand === "left" ? 48 : 60) + key.pc;
        const ascending = type.intervals.map((interval) => start + interval);
        const descendingIntervals = type.descending || [...type.intervals].reverse();
        const descending = descendingIntervals.map((interval) => start + interval).slice(1);
        const fingers = DATA.fingering[key.id][state.hand];
        const fingerSequence = fingers.concat([...fingers].reverse().slice(1));
        const notes = ascending.concat(descending);
        return {
            id: `scale:${state.scaleLessonId}:${key.id}:${state.variant}:${state.hand}`,
            title: `${key.label} ${type.label} · ${state.hand === "right" ? "오른손" : "왼손"}`,
            badge: "1옥타브 상행·하행",
            groups: notes.map((note) => ({ label: midiName(note, scoreKey), notes: [note] })),
            fingers: fingerSequence,
            hand: state.hand,
            notationSpelling,
            match: "pitchClass"
        };
    }

    function skillOptionsFor(module) {
        if (module.id === "block") return DATA.blockSkills.map((skill) => ({ value: skill.id, label: `Skill ${skill.id} · ${skill.label}` }));
        if (module.id === "shell") return DATA.shellSkills.map((skill) => ({ value: skill.id, label: `Skill ${skill.id} · ${skill.label}` }));
        const labels = {
            cycle: ["33 · Major 7ths", "34 · Minor 7ths", "35 · Dominant 7ths", "36 · Dominant sus4", "37 · Minor→Dominant", "38 · Dominant→Major", "39 · Dominant→Minor"],
            "ii-v-i": ["40 · Major Format 1", "41 · Major Format 2", "42 · Minor Format 1", "43 · Minor Format 2", "44 · Major+상대단조 1", "45 · Major+상대단조 2"],
            "so-what": ["48 · 모든 단조", "49 · 모든 장조"],
            "fourthy-ii-v-i": ["51 · Format 1", "52 · Format 2"],
            "tritone-ii-v-i": ["53 · Format 1", "54 · Format 2"],
            "polychord-ii-v-i": ["55 · Format 1", "56 · Format 2", "57 · Format 3", "58 · Format 4"],
            "altered-dominants": ["59 · 13♭9→7♯9", "60 · 7♯5♯9→13"],
            "dominant-polychords": ["109 · Dominant 13", "110 · Dominant 7♯9", "111 · Dominant 7♭5♭9", "112 · Dominant 7♯5♯9", "113 · Dominant 13♭9", "114 · Dominant 7♯5♭9", "115 · Dominant 7♭5♯9", "116 · Dominant 13♭5♭9"],
            "diminished-sub": ["118 · Format 1 / 전조 1", "119 · Format 1 / 전조 2", "120 · Format 1 / 전조 3", "121 · Format 2 / 전조 1", "122 · Format 2 / 전조 2", "123 · Format 2 / 전조 3"]
        };
        if (labels[module.id]) return labels[module.id].map((label) => ({ value: label.match(/^\d+/)[0], label: `Skill ${label}` }));
        if (["polychord-blues", "fourthy-blues", "minor-blues"].includes(module.id)) {
            return [{ value: "a", label: "Format 1" }, { value: "b", label: "Format 2" }];
        }
        return [{ value: module.skills[0], label: `Skill ${module.skills.join("-")}` }];
    }

    function cycleRoots(startPc) {
        const roots = [];
        let current = startPc;
        for (let index = 0; index < 12; index += 1) {
            roots.push(current);
            current = (current + 5) % 12;
        }
        return roots;
    }

    function iiVI(rootPc, minor, format) {
        const ii = (rootPc + 2) % 12;
        const v = (rootPc + 7) % 12;
        if (minor) {
            return format === 2
                ? [makeVoicing(ii, [3, 10, 13], `${noteName(ii)}m7♭5`), makeVoicing(v, [10, 16, 21], `${noteName(v)}7♭9`), makeVoicing(rootPc, [3, 10, 14], `${noteName(rootPc)}m9`)]
                : [makeVoicing(ii, [10, 15, 18], `${noteName(ii)}m7♭5`), makeVoicing(v, [4, 10, 13], `${noteName(v)}7♭9`), makeVoicing(rootPc, [10, 15, 19], `${noteName(rootPc)}m7`)];
        }
        return format === 2
            ? [makeVoicing(ii, [3, 10, 14], `${noteName(ii)}m9`), makeVoicing(v, [10, 16, 21], `${noteName(v)}13`), makeVoicing(rootPc, [4, 11, 14], `${noteName(rootPc)}maj9`)]
            : [makeVoicing(ii, [10, 15, 19], `${noteName(ii)}m7`), makeVoicing(v, [4, 10, 14], `${noteName(v)}9`), makeVoicing(rootPc, [11, 16, 19], `${noteName(rootPc)}maj7`)];
    }

    function diatonicChords(rootPc) {
        const scale = [0, 2, 4, 5, 7, 9, 11];
        const qualities = ["maj7", "min7", "min7", "maj7", "dom7", "min7", "halfDim"];
        const romans = ["I", "II", "III", "IV", "V", "VI", "VII"];
        return scale.map((offset, index) => {
            const pc = (rootPc + offset) % 12;
            return chord(pc, qualities[index], `${romans[index]} · ${noteName(pc)}${["maj7", "7", "m7", "maj7", "7", "m7", "m7♭5"][index]}`);
        });
    }

    function bluesRoots(rootPc) {
        return [0, 5, 0, 0, 5, 10, 0, 9, 2, 7, 0, 7].map((offset) => (rootPc + offset) % 12);
    }

    function bluesSequence(rootPc, minor, fourthy, format) {
        const roots = bluesRoots(rootPc);
        return roots.map((pc, index) => {
            if (minor) {
                const upper = [14, 19, 24];
                const left = format === "b" ? [3, 10, 14] : [10, 15, 19];
                return makeVoicing(pc, left.concat(upper.map((value) => value + (index === 7 ? 15 : 12))), `${bluesNoteName(pc)}m9`, 48, 3);
            }
            if (fourthy) {
                const left = format === "b" ? [4, 10, 14] : [10, 16, 21];
                return makeVoicing(pc, left.concat([26, 31, 36]), `${bluesNoteName(pc)}13`, 48, 3);
            }
            const left = format === "b" ? [4, 10, 14] : [10, 16, 21];
            const upperRoot = index === 7 || index === 8 ? 3 : 0;
            const upper = format === "b"
                ? [upperRoot + 31, upperRoot + 36, upperRoot + 40]
                : [upperRoot + 28, upperRoot + 31, upperRoot + 36];
            const suffixes = format === "b"
                ? ["9", "13", "9", "9", "13", "9", "9", "7♯5♯9", "m9", "13", "9", "13"]
                : ["13", "9", "13", "13", "9", "13", "13", "7♯9", "m9", "9", "13", "9"];
            return makeVoicing(pc, left.concat(upper), `${bluesNoteName(pc)}${suffixes[index]}`, 48, 3);
        });
    }

    function getVoicingExercise() {
        const module = DATA.voicingModules.find((item) => item.id === state.voicingModuleId) || DATA.voicingModules[0];
        const key = currentKey();
        const root = key.pc;
        const variant = state.variant;
        let groups = [];
        let badge = `Skill ${variant}`;

        if (module.id === "block") {
            const skill = DATA.blockSkills.find((item) => item.id === variant) || DATA.blockSkills[0];
            groups = [makeVoicing(root, skill.intervals, `${key.label}${skill.suffix}`)];
        } else if (module.id === "shell") {
            const skill = DATA.shellSkills.find((item) => item.id === variant) || DATA.shellSkills[0];
            groups = [makeVoicing(root, skill.intervals, `${key.label}${skill.suffix}`)];
        } else if (module.id === "diatonic") {
            groups = diatonicChords(root);
            badge = `Skill ${21 + ROOT_PC_ORDER.indexOf(root)}`;
        } else if (module.id === "cycle") {
            const types = { "33": "maj7", "34": "min7", "35": "dom7", "36": "sus7" };
            if (types[variant]) groups = cycleRoots(root).map((pc) => chord(pc, types[variant], `${noteName(pc)}${types[variant] === "maj7" ? "maj7" : types[variant] === "min7" ? "m7" : types[variant] === "sus7" ? "7sus4" : "7"}`));
            else if (variant === "37") groups = cycleRoots(root).flatMap((pc) => [chord((pc + 2) % 12, "halfDim", `${noteName((pc + 2) % 12)}m7♭5`), chord((pc + 7) % 12, "dom7", `${noteName((pc + 7) % 12)}7♭9`)]);
            else if (variant === "38") groups = cycleRoots(root).flatMap((pc) => [chord((pc + 7) % 12, "dom7", `${noteName((pc + 7) % 12)}7`), chord(pc, "maj7", `${noteName(pc)}maj7`)]);
            else groups = cycleRoots(root).flatMap((pc) => [chord((pc + 7) % 12, "dom7", `${noteName((pc + 7) % 12)}7`), chord(pc, "min7", `${noteName(pc)}m7`)]);
        } else if (module.id === "ii-v-i") {
            if (["40", "41"].includes(variant)) groups = iiVI(root, false, variant === "41" ? 2 : 1);
            else if (["42", "43"].includes(variant)) groups = iiVI(root, true, variant === "43" ? 2 : 1);
            else {
                const relativeMinor = (root + 9) % 12;
                groups = iiVI(root, false, variant === "45" ? 2 : 1).concat(iiVI(relativeMinor, true, variant === "45" ? 2 : 1));
            }
        } else if (module.id === "i-iv") {
            groups = cycleRoots(root).flatMap((pc) => [chord(pc, "maj7", `${noteName(pc)}maj7`), chord((pc + 5) % 12, "maj7", `${noteName((pc + 5) % 12)}maj7`)]);
        } else if (module.id === "modal-fourths") {
            const dorian = [0, 2, 3, 5, 7, 9, 10];
            groups = dorian.map((offset) => {
                const modeNotes = dorian.concat(dorian.map((value) => value + 12));
                const index = dorian.indexOf(offset);
                return makeVoicing(root, [modeNotes[index], modeNotes[index + 3], modeNotes[index + 6]], `${index + 1}도 4도 구조`);
            });
        } else if (module.id === "so-what") {
            const modeRoot = variant === "49" ? (root + 4) % 12 : root;
            groups = [makeVoicing(modeRoot, [0, 5, 10, 15, 19], variant === "49" ? `${key.label}maj · Lydian` : `${key.label}m · Dorian`)];
        } else if (module.id === "modal-so-what") {
            const dorian = [0, 2, 3, 5, 7, 9, 10];
            const extended = dorian.concat(dorian.map((value) => value + 12), dorian.map((value) => value + 24));
            groups = dorian.map((_, index) => makeVoicing(root, [extended[index], extended[index + 3], extended[index + 6], extended[index + 9], extended[index + 11]], `${index + 1}도`));
        } else if (module.id === "fourthy-ii-v-i") {
            const iiRoot = (root + 2) % 12;
            const target = makeVoicing(root, [4, 9, 14, 19, 23], `${key.label}maj`);
            const side = target.notes.map((note) => note + (variant === "51" ? -1 : 1));
            groups = [makeVoicing(iiRoot, [0, 5, 10, 15, 19], `${noteName(iiRoot)}m7`), { label: "side-slip", notes: side }, target];
        } else if (module.id === "tritone-ii-v-i") {
            const normal = iiVI(root, false, variant === "54" ? 2 : 1);
            const flatSix = (root + 8) % 12;
            const flatTwo = (root + 1) % 12;
            groups = [normal[0], normal[1], chord(flatSix, "min7", `${noteName(flatSix)}m7`), chord(flatTwo, "dom7", `${noteName(flatTwo)}7`), normal[2]];
        } else if (module.id === "polychord-ii-v-i") {
            const format = Number(variant) - 55;
            const iiRoot = (root + 2) % 12;
            const vRoot = (root + 7) % 12;
            groups = [
                makeVoicing(iiRoot, [3, 10, 14, 19 + format, 23 + format, 26 + format], `${noteName(iiRoot)}m11`),
                makeVoicing(vRoot, [4, 10, 13, 18 + format, 22 + format, 25 + format], `${noteName(vRoot)}7 alt`),
                makeVoicing(root, [4, 11, 14, 19, 23, 26], `${key.label}maj13`)
            ];
        } else if (module.id === "altered-dominants") {
            groups = cycleRoots(root).map((pc, index) => {
                const first = variant === "59" ? [0, 10, 13, 16, 21] : [0, 4, 10, 15, 20];
                const second = variant === "59" ? [0, 4, 10, 15, 19] : [0, 10, 14, 16, 21];
                return makeVoicing(pc, index % 2 ? second : first, `${noteName(pc)}7 alt`);
            });
        } else if (module.id === "polychord-blues") {
            groups = bluesSequence(root, false, false, variant);
            badge = `Skill ${61 + ROOT_PC_ORDER.indexOf(root)}${variant}`;
        } else if (module.id === "fourthy-blues") {
            groups = bluesSequence(root, false, true, variant);
            badge = `Skill ${73 + ROOT_PC_ORDER.indexOf(root)}${variant}`;
        } else if (module.id === "major7-blues") {
            groups = bluesRoots(root).map((pc, index) => index < 4 ? chord(pc, "maj7", `${noteName(pc)}maj7`) : chord(pc, index % 3 === 0 ? "min7" : "dom7", `${noteName(pc)}${index % 3 === 0 ? "m7" : "7"}`));
            badge = `Skill ${85 + ROOT_PC_ORDER.indexOf(root)}`;
        } else if (module.id === "minor-blues") {
            groups = bluesSequence(root, true, true, variant);
            badge = `Skill ${97 + ROOT_PC_ORDER.indexOf(root)}${variant}`;
        } else if (module.id === "dominant-polychords") {
            const index = Number(variant) - 109;
            const upperOffsets = [2, 3, 6, 8, 9, 1, 3, 6];
            const minorTriad = index >= 5;
            const upper = upperOffsets[index] || 2;
            const triad = minorTriad ? [upper + 12, upper + 15, upper + 19] : [upper + 12, upper + 16, upper + 19];
            groups = [makeVoicing(root, [0, 4, 10].concat(triad), `${key.label}7 · 상부 ${noteName(root + upper)}${minorTriad ? "m" : ""}`)];
        } else if (module.id === "polychord-groups") {
            groups = [2, 3, 6, 8, 9].map((upper) => makeVoicing(root, [0, 4, 10, upper + 12, upper + 16, upper + 19], `${key.label}7 / ${noteName(root + upper)}`));
        } else if (module.id === "diminished-sub") {
            const transposition = (Number(variant) - 118) % 3;
            const direction = Number(variant) >= 121 ? -1 : 1;
            const start = root + transposition * 3;
            groups = [0, 1, 2, 3].map((index) => makeVoicing((start + direction * index * 3 + 24) % 12, [0, 4, 10, 13, 21], `13♭9 · ${index + 1}`));
            groups.push(chord(root, "maj7", `${key.label}maj7 해결`));
        }

        return {
            id: `voicing:${module.id}:${badge}:${key.id}:${variant}`,
            title: `${key.label} · ${module.title}`,
            badge,
            groups,
            fingers: [],
            notationSpelling: module.id.includes("blues") && key.id === "C" ? "flat" : key.spelling,
            match: "shape"
        };
    }

    function getExercise() {
        return state.mode === "scale" ? getScaleExercise() : getVoicingExercise();
    }

    function renderModeTabs() {
        document.querySelectorAll(".mode-tab").forEach((button) => {
            const active = button.dataset.mode === state.mode;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    function renderLessonList() {
        const items = state.mode === "scale" ? DATA.scaleLessons : state.mode === "voicing" ? DATA.voicingModules : [
            { id: "foundation", title: "기초 재즈 피아노", summary: "기초 학기 통과 순서" },
            { id: "advanced", title: "고급 재즈 피아노", summary: "고급 학기 통과 순서" }
        ];
        elements.railCount.textContent = state.mode === "voicing" ? `${DATA.voicingModules.length}영역 · 123 Skills` : `${items.length}단계`;
        elements.lessonList.replaceChildren(...items.map((item, index) => {
            const selected = state.mode === "scale" ? item.id === state.scaleLessonId : state.mode === "voicing" ? item.id === state.voicingModuleId : item.id === state.curriculumTrack;
            const button = document.createElement("button");
            button.type = "button";
            button.className = `lesson-button${selected ? " is-current" : ""}`;
            button.dataset.lessonId = item.id;
            const rangeLabel = state.mode === "voicing" ? `Skill ${item.skills[0]}${item.skills.length > 1 ? `-${item.skills[item.skills.length - 1]}` : ""}` : `단계 ${index + 1}`;
            button.innerHTML = `<span>${rangeLabel}</span><strong>${item.title}</strong><small>${item.summary || item.eyebrow}</small>`;
            return button;
        }));
    }

    function renderSelectors() {
        const keyIds = state.mode === "scale"
            ? (DATA.scaleLessons.find((item) => item.id === state.scaleLessonId) || DATA.scaleLessons[0]).keys
            : DATA.keys.map((key) => key.id);
        if (!keyIds.includes(state.keyId)) state.keyId = keyIds[0];
        elements.keySelect.replaceChildren(...keyIds.map((id) => {
            const key = KEY_BY_ID.get(id);
            return new Option(key.label, key.id, false, key.id === state.keyId);
        }));

        if (state.mode === "scale") {
            elements.variantField.firstChild.textContent = "종류 ";
            const options = Object.entries(DATA.scaleTypes).map(([id, type]) => new Option(type.label, id, false, id === state.variant));
            if (!DATA.scaleTypes[state.variant]) state.variant = "major";
            elements.variantSelect.replaceChildren(...options);
            elements.handField.hidden = false;
            elements.variantField.hidden = false;
            elements.targetTempo.textContent = "목표 80 BPM";
        } else if (state.mode === "voicing") {
            const module = DATA.voicingModules.find((item) => item.id === state.voicingModuleId) || DATA.voicingModules[0];
            const options = skillOptionsFor(module);
            if (!options.some((option) => option.value === state.variant)) state.variant = options[0].value;
            elements.variantField.firstChild.textContent = "기술 ";
            elements.variantSelect.replaceChildren(...options.map((option) => new Option(option.label, option.value, false, option.value === state.variant)));
            elements.handField.hidden = true;
            elements.variantField.hidden = options.length === 1 && module.skills.length === 1;
            elements.tempo.value = Math.min(72, module.tempo);
            elements.targetTempo.textContent = `목표 ${module.tempo} BPM`;
        }
        elements.tempoOutput.value = `${elements.tempo.value} BPM`;
    }

    function renderLesson() {
        if (state.mode === "curriculum") {
            renderCurriculumTrack();
            return;
        }
        const lesson = state.mode === "scale"
            ? DATA.scaleLessons.find((item) => item.id === state.scaleLessonId)
            : DATA.voicingModules.find((item) => item.id === state.voicingModuleId);
        elements.lessonEyebrow.textContent = state.mode === "scale" ? lesson.eyebrow : `교재 Skill ${lesson.skills[0]}-${lesson.skills[lesson.skills.length - 1]}`;
        elements.lessonTitle.textContent = lesson.title;
        elements.lessonSummary.textContent = lesson.summary;
        elements.skillBadge.textContent = state.mode === "scale" ? `${lesson.keys.length}개 조` : `${lesson.skills.length} Skills`;
        elements.conceptList.replaceChildren(...lesson.concepts.map(listItem));
        elements.methodList.replaceChildren(...lesson.practice.map(listItem));
        document.querySelector(".exercise-card").hidden = false;
        document.querySelector(".keyboard-card").hidden = false;
    }

    function renderCurriculumTrack() {
        const foundation = state.curriculumTrack === "foundation";
        elements.lessonEyebrow.textContent = foundation ? "교재 기초 학기 과정" : "교재 고급 학기 과정";
        elements.lessonTitle.textContent = foundation ? "기초 재즈 피아노 통과 순서" : "고급 재즈 피아노 통과 순서";
        elements.lessonSummary.textContent = "각 기술은 점수가 아니라 정확·무정지 연주 여부로 통과합니다. 미통과 기술은 다음 단계 전에 다시 시도합니다.";
        elements.skillBadge.textContent = foundation ? "기초 과정" : "고급 과정";
        elements.conceptList.replaceChildren(...[
            "기술은 제시된 순서대로 통과하며, 틀린 음이나 머뭇거림은 미통과로 봅니다.",
            "통과한 기술 수로 진도를 확인하고, 필요한 기술은 나중에 다시 시험할 수 있습니다.",
            "마지막에는 배운 보이싱으로 코드 진행을 초견 연주해 실제 적용력을 확인합니다."
        ].map(listItem));
        elements.methodList.replaceChildren(...DATA.semesterTracks[state.curriculumTrack].map((text, index) => listItem(`${index + 1}. ${text}`)));
        document.querySelector(".exercise-card").hidden = true;
        document.querySelector(".keyboard-card").hidden = true;
    }

    function listItem(text) {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
    }

    function renderReference() {
        const principles = DATA.practicePrinciples.map((text) => `<li>${text}</li>`).join("");
        const modules = DATA.voicingModules.map((module) => `<li><strong>Skill ${module.skills[0]}${module.skills.length > 1 ? `-${module.skills[module.skills.length - 1]}` : ""}</strong><span>${module.title}</span></li>`).join("");
        elements.referenceContent.innerHTML = `
            <section><h3>모든 연습에 적용하는 10가지 원칙</h3><ol>${principles}</ol></section>
            <section><h3>123 Skills 전체 범위</h3><ul class="skill-catalog">${modules}</ul></section>
            <section class="source-note"><h3>구성 기준</h3><p>손가락 번호 자료의 12개 조·네 음계 운지 원리와 Dan Haerle 교재의 도입, 각 단원 설명, Skills 1-123, 두 학기 과정표를 학습용 문장과 MIDI 과제로 재구성했습니다.</p></section>`;
    }

    function renderExercise() {
        if (state.mode === "curriculum") return;
        state.exercise = getExercise();
        elements.exerciseTitle.textContent = state.exercise.title;
        elements.skillBadge.textContent = state.exercise.badge;
        const passed = state.progress.passed.includes(state.exercise.id);
        elements.passMark.textContent = passed ? "통과" : "미통과";
        elements.passMark.classList.toggle("is-passed", passed);
        elements.attemptSummary.textContent = passed ? "정확·무정지 연주 완료" : "정확히 연주해 보세요";
        renderScore();
        renderKeyboardState();
        centerKeyboardOnExercise();
    }

    function renderScore() {
        if (!state.exercise || !window.PianoScoreRenderer) return;
        const currentIndex = state.practice?.active ? state.practice.index : 0;
        if (state.practice?.active) {
            state.scorePage = window.PianoScoreRenderer.pageForIndex(state.mode, currentIndex);
        }
        const scoreKey = notationKey(state.exercise.notationSpelling);
        const result = window.PianoScoreRenderer.render(elements.scoreSvg, {
            mode: state.mode,
            exercise: state.exercise,
            key: scoreKey,
            page: state.scorePage,
            currentIndex
        });
        state.scorePage = result.page;
        elements.scorePage.textContent = `${result.page + 1} / ${result.pageCount}`;
        elements.scorePrevButton.disabled = result.page === 0;
        elements.scoreNextButton.disabled = result.page >= result.pageCount - 1;
        const current = state.exercise.groups[Math.min(currentIndex, state.exercise.groups.length - 1)];
        const noteNames = current ? current.notes.map((note) => midiName(note, scoreKey)).join(" · ") : "";
        elements.scoreCaption.textContent = state.mode === "scale"
            ? `${state.hand === "right" ? "오른손" : "왼손"} 손가락 번호 · 현재 음 ${noteNames}`
            : `현재 ${current?.label || ""} · ${noteNames} · 위 보표는 오른손, 아래 보표는 왼손`;
        elements.targetStrip.textContent = state.exercise.groups
            .map((group) => `${group.label}: ${group.notes.map((note) => midiName(note, scoreKey)).join(", ")}`)
            .join(" / ");
    }

    function createKeyboard() {
        const fragment = document.createDocumentFragment();
        let whiteIndex = 0;
        for (let midi = 36; midi <= 84; midi += 1) {
            const isWhite = WHITE_PCS.has(midi % 12);
            const key = document.createElement("button");
            key.type = "button";
            key.className = `key ${isWhite ? "white" : "black"}`;
            key.dataset.midi = String(midi);
            key.setAttribute("aria-label", midiName(midi));
            if (isWhite) {
                key.style.setProperty("--key-index", whiteIndex);
                if (midi % 12 === 0) key.innerHTML = `<span>${midiName(midi)}</span><b></b>`;
                else key.innerHTML = "<b></b>";
                whiteIndex += 1;
            } else {
                key.style.setProperty("--key-index", whiteIndex);
                key.innerHTML = "<b></b>";
            }
            key.addEventListener("pointerdown", onScreenKeyDown);
            key.addEventListener("pointerup", onScreenKeyUp);
            key.addEventListener("pointercancel", onScreenKeyUp);
            fragment.appendChild(key);
        }
        elements.keyboard.replaceChildren(fragment);
        elements.keyboard.dataset.whiteCount = String(whiteIndex);
        resizeKeyboard();
    }

    function resizeKeyboard() {
        const viewportWidth = Math.max(320, elements.keyboardViewport.clientWidth || 800);
        let whiteWidth;
        if (state.keyboardMode === "real") {
            whiteWidth = 23.5 * state.pxPerMm;
            elements.keyboardHint.textContent = `보정된 흰건반 폭 ${Math.round(whiteWidth)}px · 실제 피아노 약 23.5mm 기준`;
        } else {
            const visibleWhites = viewportWidth < 700 ? 8 : viewportWidth < 1050 ? 14 : 18;
            whiteWidth = Math.max(44, Math.min(64, viewportWidth / visibleWhites));
            elements.keyboardHint.textContent = "연습 음역을 보기 편한 폭으로 맞춥니다. 실제 연주는 연결한 MIDI 건반에서 하세요.";
        }
        elements.keyboard.style.setProperty("--white-width", `${whiteWidth}px`);
        elements.keyboard.style.setProperty("--black-width", `${Math.max(30, whiteWidth * 0.58)}px`);
        elements.keyboard.style.width = `${Number(elements.keyboard.dataset.whiteCount) * whiteWidth}px`;
    }

    function onScreenKeyDown(event) {
        event.preventDefault();
        const button = event.currentTarget;
        button.setPointerCapture(event.pointerId);
        const midi = Number(button.dataset.midi);
        noteOn(midi, 92, "screen");
    }

    function onScreenKeyUp(event) {
        const midi = Number(event.currentTarget.dataset.midi);
        noteOff(midi);
    }

    function renderKeyboardState() {
        const targetNotes = new Set((state.exercise?.groups || []).flatMap((group) => group.notes));
        const nextNotes = new Set(state.practice?.active ? state.exercise.groups[state.practice.index]?.notes || [] : state.exercise?.groups[0]?.notes || []);
        document.querySelectorAll(".key").forEach((key) => {
            const midi = Number(key.dataset.midi);
            key.classList.toggle("is-target", targetNotes.has(midi));
            key.classList.toggle("is-next", nextNotes.has(midi));
            key.classList.toggle("is-played", state.heldNotes.has(midi));
            const badge = key.querySelector("b");
            if (badge) badge.textContent = "";
        });
        if (state.mode === "scale" && state.exercise) {
            state.exercise.groups.slice(0, 8).forEach((group, index) => {
                const key = elements.keyboard.querySelector(`[data-midi="${group.notes[0]}"] b`);
                if (key) key.textContent = state.exercise.fingers[index] || "";
            });
        }
    }

    function centerKeyboardOnExercise() {
        requestAnimationFrame(() => {
            const target = state.exercise?.groups[0]?.notes[0];
            const key = elements.keyboard.querySelector(`[data-midi="${target}"]`);
            if (!key) return;
            const desired = key.offsetLeft - elements.keyboardViewport.clientWidth * 0.35;
            elements.keyboardViewport.scrollTo({ left: Math.max(0, desired), behavior: "smooth" });
        });
    }

    function startPractice() {
        state.practice = { active: true, index: 0, wrong: 0, hesitations: 0, lastStepAt: performance.now(), waitingRelease: false, wrongRegistered: false };
        state.scorePage = 0;
        elements.practiceButton.textContent = "연습 중지";
        elements.practiceButton.classList.add("is-running");
        setFeedback(state.mode === "scale" ? "첫 음부터 차례로 연주하세요." : "표시된 첫 보이싱을 한 번에 누르세요.", "ready");
        renderScore();
        renderKeyboardState();
    }

    function stopPractice(message) {
        if (state.practice) state.practice.active = false;
        elements.practiceButton.textContent = "연습 시작";
        elements.practiceButton.classList.remove("is-running");
        if (message) setFeedback(message);
        renderScore();
        renderKeyboardState();
    }

    function resetAttempt() {
        stopPractice("처음부터 다시 준비했습니다.");
        state.practice = null;
        state.scorePage = 0;
        state.heldNotes.clear();
        renderScore();
        renderKeyboardState();
    }

    function noteOn(midi, velocity) {
        state.heldNotes.add(midi);
        if (window.HarmonyPiano) window.HarmonyPiano.playMidi(midi, { volume: Math.max(0.035, velocity / 1000), duration: 1.1 }).catch(() => {});
        renderKeyboardState();
        if (!state.practice?.active || state.practice.waitingRelease) return;
        if (state.mode === "scale") evaluateScaleNote(midi);
        else window.clearTimeout(state.practice.chordTimer), state.practice.chordTimer = window.setTimeout(evaluateChord, 110);
    }

    function noteOff(midi) {
        state.heldNotes.delete(midi);
        if (state.practice?.waitingRelease && state.heldNotes.size === 0) {
            state.practice.waitingRelease = false;
            state.practice.wrongRegistered = false;
            renderKeyboardState();
        }
        renderKeyboardState();
    }

    function registerTiming() {
        const now = performance.now();
        if (state.practice.index > 0 && now - state.practice.lastStepAt > 3500) state.practice.hesitations += 1;
        state.practice.lastStepAt = now;
    }

    function evaluateScaleNote(midi) {
        const target = state.exercise.groups[state.practice.index].notes[0];
        if (midi % 12 !== target % 12) {
            state.practice.wrong += 1;
            const scoreKey = notationKey(state.exercise.notationSpelling);
            setFeedback(`${midiName(midi, scoreKey)}이 아니라 ${midiName(target, scoreKey)} 차례예요.`, "error");
            return;
        }
        registerTiming();
        advancePractice();
    }

    function normalizeShape(notes) {
        const sorted = [...notes].sort((a, b) => a - b);
        return sorted.map((note) => note - sorted[0]);
    }

    function arraysEqual(a, b) {
        return a.length === b.length && a.every((value, index) => value === b[index]);
    }

    function evaluateChord() {
        if (!state.practice?.active || state.practice.waitingRelease) return;
        const target = state.exercise.groups[state.practice.index].notes;
        const played = [...state.heldNotes];
        if (played.length < target.length) return;
        if (arraysEqual(normalizeShape(played), normalizeShape(target))) {
            registerTiming();
            state.practice.waitingRelease = true;
            advancePractice();
        } else if (!state.practice.wrongRegistered) {
            state.practice.wrong += 1;
            state.practice.wrongRegistered = true;
            setFeedback("음 또는 전위가 달라요. 손을 모두 뗀 뒤 표시된 모양으로 다시 누르세요.", "error");
        }
    }

    function advancePractice() {
        state.practice.index += 1;
        if (state.practice.index >= state.exercise.groups.length) {
            finishPractice();
            return;
        }
        setFeedback(`좋아요. ${state.practice.index} / ${state.exercise.groups.length} 완료`, "success");
        renderScore();
        renderKeyboardState();
    }

    function finishPractice() {
        const clean = state.practice.wrong === 0 && state.practice.hesitations === 0;
        const summary = `틀린 음 ${state.practice.wrong} · 머뭇거림 ${state.practice.hesitations}`;
        if (clean) {
            if (!state.progress.passed.includes(state.exercise.id)) state.progress.passed.push(state.exercise.id);
            saveProgress();
            elements.passMark.textContent = "통과";
            elements.passMark.classList.add("is-passed");
            elements.attemptSummary.textContent = "정확·무정지 연주 완료";
            setFeedback(`통과했습니다. ${summary}`, "success");
        } else {
            setFeedback(`끝까지 연주했습니다. ${summary} · 속도를 낮춰 다시 통과해 보세요.`, "notice");
            elements.attemptSummary.textContent = summary;
        }
        stopPractice();
    }

    function setFeedback(message, type) {
        elements.feedback.textContent = message;
        elements.feedback.dataset.type = type || "";
    }

    function playExercise() {
        if (!window.HarmonyPiano || !state.exercise) return;
        elements.listenButton.disabled = true;
        elements.listenButton.textContent = "재생 중…";
        const seconds = 60 / Number(elements.tempo.value);
        const pageSize = window.PianoScoreRenderer?.pageSize[state.mode] || state.exercise.groups.length;
        const start = state.scorePage * pageSize;
        const visibleGroups = state.exercise.groups.slice(start, start + pageSize);
        window.HarmonyPiano.playSequence(visibleGroups.map((group) => group.notes), seconds)
            .catch(() => showToast("피아노 소리를 불러오지 못했습니다."))
            .finally(() => window.setTimeout(() => {
                elements.listenButton.disabled = false;
                elements.listenButton.textContent = "▶ 먼저 듣기";
            }, Math.max(700, visibleGroups.length * seconds * 1000)));
    }

    async function connectMidi() {
        if (!navigator.requestMIDIAccess) {
            elements.midiStatus.textContent = "이 브라우저는 Web MIDI 입력을 지원하지 않습니다.";
            elements.midiDetail.textContent = "Chrome·Edge 계열 브라우저 또는 화면 건반을 사용해 주세요.";
            showToast("MIDI를 지원하는 브라우저에서 다시 열어 주세요.");
            return;
        }
        try {
            state.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
            state.midiAccess.onstatechange = refreshMidiInputs;
            refreshMidiInputs();
            elements.midiStatus.textContent = "MIDI 권한을 허용했습니다.";
            elements.midiDetail.textContent = "입력 장치를 선택하고 아무 건반이나 눌러 확인하세요.";
        } catch (_) {
            elements.midiStatus.textContent = "MIDI 연결이 취소되었습니다.";
            elements.midiDetail.textContent = "건반을 USB로 연결한 뒤 다시 시도하세요.";
        }
    }

    function refreshMidiInputs() {
        const inputs = state.midiAccess ? [...state.midiAccess.inputs.values()] : [];
        elements.midiInput.disabled = inputs.length === 0;
        elements.midiInput.replaceChildren(...(inputs.length ? inputs.map((input) => new Option(input.name || "USB MIDI 건반", input.id)) : [new Option("연결된 장치 없음", "")]));
        const selected = inputs.find((input) => input.id === state.midiInputId) || inputs[0];
        if (selected) selectMidiInput(selected.id);
        else {
            elements.midiStatus.textContent = "MIDI 건반을 찾지 못했습니다.";
            elements.midiDetail.textContent = "USB 케이블을 연결한 뒤 장치가 켜져 있는지 확인하세요.";
            elements.midiButton.classList.remove("is-connected");
            document.querySelector(".midi-status-row").classList.remove("is-connected");
        }
    }

    function selectMidiInput(id) {
        if (!state.midiAccess) return;
        [...state.midiAccess.inputs.values()].forEach((input) => { input.onmidimessage = null; });
        const input = state.midiAccess.inputs.get(id);
        if (!input) return;
        state.midiInputId = id;
        elements.midiInput.value = id;
        input.onmidimessage = onMidiMessage;
        elements.midiStatus.textContent = `${input.name || "USB MIDI 건반"} 연결됨`;
        elements.midiDetail.textContent = "건반을 누르면 화면에 표시되고 현재 과제를 자동으로 검사합니다.";
        elements.midiButton.classList.add("is-connected");
        document.querySelector(".midi-status-row").classList.add("is-connected");
        elements.midiButton.lastChild.textContent = " 연결됨";
    }

    function onMidiMessage(event) {
        const [status, data1, data2] = event.data;
        const command = status & 0xf0;
        if (command === 0x90 && data2 > 0) noteOn(data1, data2, "midi");
        else if (command === 0x80 || (command === 0x90 && data2 === 0)) noteOff(data1);
        else if (command === 0xb0 && data1 === 64) {
            elements.midiDetail.textContent = data2 >= 64 ? "서스테인 페달 사용 중" : "MIDI 입력 정상 · 서스테인 페달 해제";
        }
    }

    function toggleMetronome() {
        if (state.metronomeTimer) {
            window.clearInterval(state.metronomeTimer);
            state.metronomeTimer = null;
            elements.metronomeButton.classList.remove("is-selected");
            elements.metronomeButton.setAttribute("aria-pressed", "false");
            return;
        }
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        state.metronomeContext = state.metronomeContext || new AudioContextClass();
        const click = () => {
            const oscillator = state.metronomeContext.createOscillator();
            const gain = state.metronomeContext.createGain();
            const now = state.metronomeContext.currentTime;
            oscillator.frequency.value = 1050;
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
            oscillator.connect(gain).connect(state.metronomeContext.destination);
            oscillator.start(now);
            oscillator.stop(now + 0.05);
        };
        click();
        state.metronomeTimer = window.setInterval(click, 60000 / Number(elements.tempo.value));
        elements.metronomeButton.classList.add("is-selected");
        elements.metronomeButton.setAttribute("aria-pressed", "true");
    }

    function openCalibration() {
        const width = Math.round(85.6 * state.pxPerMm);
        elements.calibrationRange.value = Math.max(220, Math.min(520, width));
        updateCalibrationGauge();
        elements.calibrationDialog.showModal();
    }

    function updateCalibrationGauge() {
        elements.cardGauge.style.width = `${elements.calibrationRange.value}px`;
    }

    function saveCalibration() {
        state.pxPerMm = Number(elements.calibrationRange.value) / 85.6;
        localStorage.setItem(CALIBRATION_KEY, String(state.pxPerMm));
        state.keyboardMode = "real";
        updateKeyboardModeButtons();
        resizeKeyboard();
        centerKeyboardOnExercise();
        showToast("실물 건반 폭을 이 기기에 저장했습니다.");
    }

    function updateKeyboardModeButtons() {
        const real = state.keyboardMode === "real";
        elements.realModeButton.classList.toggle("is-selected", real);
        elements.realModeButton.setAttribute("aria-pressed", String(real));
        elements.fitModeButton.classList.toggle("is-selected", !real);
        elements.fitModeButton.setAttribute("aria-pressed", String(!real));
    }

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add("is-visible");
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
    }

    function renderAll() {
        renderModeTabs();
        renderLessonList();
        renderSelectors();
        renderLesson();
        renderExercise();
        updateProgressText();
    }

    document.querySelector(".mode-tabs").addEventListener("click", (event) => {
        const button = event.target.closest(".mode-tab");
        if (!button || button.dataset.mode === state.mode) return;
        stopPractice();
        state.practice = null;
        state.scorePage = 0;
        state.mode = button.dataset.mode;
        state.variant = state.mode === "scale" ? "major" : state.mode === "voicing" ? DATA.voicingModules.find((item) => item.id === state.voicingModuleId).skills[0] : "";
        renderAll();
    });

    elements.lessonList.addEventListener("click", (event) => {
        const button = event.target.closest(".lesson-button");
        if (!button) return;
        stopPractice();
        state.practice = null;
        state.scorePage = 0;
        if (state.mode === "scale") state.scaleLessonId = button.dataset.lessonId;
        else if (state.mode === "voicing") {
            state.voicingModuleId = button.dataset.lessonId;
            state.variant = DATA.voicingModules.find((item) => item.id === state.voicingModuleId).skills[0];
        } else state.curriculumTrack = button.dataset.lessonId;
        renderAll();
        document.querySelector(".practice-workspace").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    elements.keySelect.addEventListener("change", () => { state.keyId = elements.keySelect.value; state.scorePage = 0; resetAttempt(); renderExercise(); });
    elements.variantSelect.addEventListener("change", () => { state.variant = elements.variantSelect.value; state.scorePage = 0; resetAttempt(); renderExercise(); });
    elements.handSelect.addEventListener("change", () => { state.hand = elements.handSelect.value; state.scorePage = 0; resetAttempt(); renderExercise(); });
    elements.tempo.addEventListener("input", () => { elements.tempoOutput.value = `${elements.tempo.value} BPM`; if (state.metronomeTimer) { toggleMetronome(); toggleMetronome(); } });
    elements.practiceButton.addEventListener("click", () => state.practice?.active ? stopPractice("연습을 멈췄습니다.") : startPractice());
    elements.resetAttemptButton.addEventListener("click", resetAttempt);
    elements.listenButton.addEventListener("click", playExercise);
    elements.scorePrevButton.addEventListener("click", () => { state.scorePage = Math.max(0, state.scorePage - 1); renderScore(); });
    elements.scoreNextButton.addEventListener("click", () => { state.scorePage += 1; renderScore(); });
    elements.midiButton.addEventListener("click", connectMidi);
    elements.midiInput.addEventListener("change", () => selectMidiInput(elements.midiInput.value));
    elements.metronomeButton.addEventListener("click", toggleMetronome);
    elements.fitModeButton.addEventListener("click", () => { state.keyboardMode = "fit"; updateKeyboardModeButtons(); resizeKeyboard(); centerKeyboardOnExercise(); });
    elements.realModeButton.addEventListener("click", () => { state.keyboardMode = "real"; updateKeyboardModeButtons(); resizeKeyboard(); centerKeyboardOnExercise(); });
    elements.calibrateButton.addEventListener("click", openCalibration);
    elements.calibrationRange.addEventListener("input", updateCalibrationGauge);
    elements.saveCalibration.addEventListener("click", saveCalibration);

    createKeyboard();
    renderReference();
    renderAll();
    updateKeyboardModeButtons();
    new ResizeObserver(() => { resizeKeyboard(); centerKeyboardOnExercise(); }).observe(elements.keyboardViewport);
    if (window.HarmonyPiano) window.HarmonyPiano.preload().catch(() => {});
})();
