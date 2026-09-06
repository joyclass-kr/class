(function () {
    "use strict";

    const byId = id => document.getElementById(id);
    const pick = list => list[Math.floor(Math.random() * list.length)];
    const randomInt = (low, high) => low + Math.floor(Math.random() * (high - low + 1));
    const N = window.Notation;

    /* 표기는 영어(한글)로 적는다. 괄호 앞의 U+200B는 좁은 화면에서 줄을 나눌 자리다. */
    function label(english, korean) {
        return english + "​(" + korean + ")";
    }

    /* 건반에 보이는 범위: 가온도부터 두 옥타브 위 A까지 */
    const KEY_LOW = 60;
    const KEY_HIGH = 81;

    /* 기준음은 임시표가 붙지 않는 자리에서 고른다. C4=28, G4=32, C5=35, G5=39 */
    const LOW_ROOTS = [28, 29, 30, 31, 32];
    const HIGH_ROOTS = [35, 36, 37, 38, 39];

    /* 음정 ------------------------------------------------------------- */
    const INTERVALS = [
        { id: "m2", en: "m2", ko: "단2도", degree: 1, semis: 1 },
        { id: "M2", en: "M2", ko: "장2도", degree: 1, semis: 2 },
        { id: "m3", en: "m3", ko: "단3도", degree: 2, semis: 3 },
        { id: "M3", en: "M3", ko: "장3도", degree: 2, semis: 4 },
        { id: "P4", en: "P4", ko: "완전4도", degree: 3, semis: 5 },
        { id: "A4", en: "A4", ko: "증4도", degree: 3, semis: 6 },
        { id: "P5", en: "P5", ko: "완전5도", degree: 4, semis: 7 },
        { id: "m6", en: "m6", ko: "단6도", degree: 5, semis: 8 },
        { id: "M6", en: "M6", ko: "장6도", degree: 5, semis: 9 },
        { id: "m7", en: "m7", ko: "단7도", degree: 6, semis: 10 },
        { id: "M7", en: "M7", ko: "장7도", degree: 6, semis: 11 },
        { id: "P8", en: "P8", ko: "완전8도", degree: 7, semis: 12 },
        { id: "m9", en: "m9", ko: "단9도", degree: 8, semis: 13, roots: [28, 29] },
        { id: "M9", en: "M9", ko: "장9도", degree: 8, semis: 14, roots: [28, 29] },
        { id: "m10", en: "m10", ko: "단10도", degree: 9, semis: 15, roots: [28, 29] },
        { id: "M10", en: "M10", ko: "장10도", degree: 9, semis: 16, roots: [28, 29] },
        { id: "P11", en: "P11", ko: "완전11도", degree: 10, semis: 17, roots: [28, 29] },
        { id: "A11", en: "A11", ko: "증11도", degree: 10, semis: 18, roots: [28, 29] },
        { id: "P12", en: "P12", ko: "완전12도", degree: 11, semis: 19, roots: [28, 29] }
    ];

    const SIMPLE_INTERVAL_IDS = ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"];
    const COMPOUND_INTERVAL_IDS = ["m9", "M9", "m10", "M10", "P11", "A11", "P12"];


    /* 화음 성질: (도수, 반음 수)로 적는다 ------------------------------- */
    const CHORDS = [
        { id: "maj", en: "maj", ko: "장3화음", tones: [[0, 0], [2, 4], [4, 7]] },
        { id: "min", en: "min", ko: "단3화음", tones: [[0, 0], [2, 3], [4, 7]] },
        { id: "dim", en: "dim", ko: "감3화음", tones: [[0, 0], [2, 3], [4, 6]] },
        { id: "aug", en: "aug", ko: "증3화음", tones: [[0, 0], [2, 4], [4, 8]] },
        { id: "maj7", en: "maj7", ko: "장7화음", tones: [[0, 0], [2, 4], [4, 7], [6, 11]] },
        { id: "dom7", en: "dom7", ko: "속7화음", tones: [[0, 0], [2, 4], [4, 7], [6, 10]] },
        { id: "min7", en: "m7", ko: "단7화음", tones: [[0, 0], [2, 3], [4, 7], [6, 10]] },
        { id: "mmaj7", en: "mMaj7", ko: "단장7화음", tones: [[0, 0], [2, 3], [4, 7], [6, 11]] },
        { id: "m7b5", en: "m7♭5", ko: "반감7화음", tones: [[0, 0], [2, 3], [4, 6], [6, 10]] },
        { id: "dim7", en: "dim7", ko: "감7화음", tones: [[0, 0], [2, 3], [4, 6], [6, 9]] },
        { id: "maj7s5", en: "maj7♯5", ko: "증장7화음", tones: [[0, 0], [2, 4], [4, 8], [6, 11]] }
    ];

    const TRIAD_IDS = ["maj", "min", "dim", "aug"];
    const SEVENTH_IDS = ["dom7", "maj7", "min7", "mmaj7", "m7b5", "dim7", "maj7s5"];

    /* 화음 자리 */
    const POSITIONS = [
        { id: "root", en: "root pos.", ko: "근음 자리", inversion: 0 },
        { id: "first", en: "1st inv.", ko: "첫째 자리바꿈", inversion: 1 },
        { id: "second", en: "2nd inv.", ko: "둘째 자리바꿈", inversion: 2 }
    ];

    /* 음계 -------------------------------------------------------------- */
    const SCALES = [
        { id: "major", en: "major", ko: "장음계", tones: [[0, 0], [1, 2], [2, 4], [3, 5], [4, 7], [5, 9], [6, 11], [7, 12]] },
        { id: "nminor", en: "nat. minor", ko: "자연단음계", tones: [[0, 0], [1, 2], [2, 3], [3, 5], [4, 7], [5, 8], [6, 10], [7, 12]] },
        { id: "hminor", en: "harm. minor", ko: "화성단음계", tones: [[0, 0], [1, 2], [2, 3], [3, 5], [4, 7], [5, 8], [6, 11], [7, 12]] },
        { id: "mminor", en: "mel. minor", ko: "가락단음계", tones: [[0, 0], [1, 2], [2, 3], [3, 5], [4, 7], [5, 9], [6, 11], [7, 12]] },
        { id: "pmaj", en: "maj. pent.", ko: "장5음음계", tones: [[0, 0], [1, 2], [2, 4], [4, 7], [5, 9], [7, 12]] },
        { id: "pmin", en: "min. pent.", ko: "단5음음계", tones: [[0, 0], [2, 3], [3, 5], [4, 7], [6, 10], [7, 12]] },
        { id: "blues", en: "blues", ko: "블루스음계", tones: [[0, 0], [2, 3], [3, 5], [3, 6], [4, 7], [6, 10], [7, 12]] },
        { id: "dorian", en: "dorian", ko: "도리아", tones: [[0, 0], [1, 2], [2, 3], [3, 5], [4, 7], [5, 9], [6, 10], [7, 12]] },
        { id: "phrygian", en: "phrygian", ko: "프리지아", tones: [[0, 0], [1, 1], [2, 3], [3, 5], [4, 7], [5, 8], [6, 10], [7, 12]] },
        { id: "lydian", en: "lydian", ko: "리디아", tones: [[0, 0], [1, 2], [2, 4], [3, 6], [4, 7], [5, 9], [6, 11], [7, 12]] },
        { id: "mixolydian", en: "mixolydian", ko: "믹솔리디아", tones: [[0, 0], [1, 2], [2, 4], [3, 5], [4, 7], [5, 9], [6, 10], [7, 12]] },
        { id: "locrian", en: "locrian", ko: "로크리아", tones: [[0, 0], [1, 1], [2, 3], [3, 5], [4, 6], [5, 8], [6, 10], [7, 12]] },
        { id: "whole", en: "whole tone", ko: "온음음계", tones: [[0, 0], [1, 2], [2, 4], [3, 6], [4, 8], [5, 10], [7, 12]] }
    ];

    /* 화음 진행 ---------------------------------------------------------- */
    const DEGREE_INDEX = { "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5 };
    const PROGRESSIONS = [
        ["I", "V", "vi", "IV"],
        ["I", "vi", "IV", "V"],
        ["I", "IV", "V", "I"],
        ["ii", "V", "I"],
        ["I", "V", "IV", "I"],
        ["vi", "IV", "I", "V"],
        ["I", "iii", "IV", "V"],
        ["I", "IV", "ii", "V"],
        ["I", "vi", "ii", "V"],
        ["IV", "I", "V", "vi"],
        ["I", "V", "vi", "iii"],
        ["ii", "V", "I", "vi"]
    ].map(chords => ({ id: chords.join("-"), label: chords.join("–"), chords: chords }));

    [INTERVALS, CHORDS, SCALES, POSITIONS].forEach(list => {
        list.forEach(item => { item.label = label(item.en, item.ko); });
    });

    const MAJOR_TONES = [[0, 0], [1, 2], [2, 4], [3, 5], [4, 7], [5, 9], [6, 11]];

    function majorScale(tonic) {
        return MAJOR_TONES.map(tone => N.step(tonic, tone[0], tone[1]));
    }

    function degreeTriad(scale, symbol) {
        const index = DEGREE_INDEX[symbol];
        return [0, 2, 4].map(offset => {
            const note = scale[(index + offset) % 7];
            const octaveUp = index + offset >= 7;
            return octaveUp ? N.spell(note.letterAbs + 7, note.accidental) : note;
        });
    }

    /* 한 옥타브 안으로 모아 좁은 자리에서 울리게 한다. */
    function closeVoicing(tonic, notes) {
        const floorMidi = tonic.midi;
        return notes.map(note => {
            let midi = note.midi;
            while (midi - floorMidi >= 12) midi -= 12;
            while (midi < floorMidi) midi += 12;
            return midi;
        });
    }

    /* 증3화음은 자리를 바꿔도 구조가 같아 귀로 가릴 수 없으므로 뺀다. */
    const POSITION_QUALITIES = CHORDS.filter(item => ["maj", "min", "dim"].indexOf(item.id) >= 0);

    /* 화음을 자리바꿈하고, 베이스가 너무 높아지면 한 옥타브 내린다. */
    function invertChord(notes, inversion) {
        let list = notes.slice();
        for (let step = 0; step < inversion; step += 1) {
            const low = list.shift();
            list.push(N.spell(low.letterAbs + 7, low.accidental));
        }
        while (Math.min.apply(null, list.map(note => note.midi)) >= 72) {
            list = list.map(note => N.spell(note.letterAbs - 7, note.accidental));
        }
        return list.slice().sort((a, b) => a.midi - b.midi);
    }

    function chordNotes(rootAbs, item, inversion) {
        const root = N.natural(rootAbs);
        return invertChord(item.tones.map(tone => N.step(root, tone[0], tone[1])), inversion || 0);
    }

    /* 문제 만들기 --------------------------------------------------------- */

    function intervalQuestion(item, mode) {
        const shape = mode === "mixed" ? pick(["harmony", "up", "down"]) : mode;
        const descending = shape === "down" && item.semis <= 12;
        const roots = item.roots || (descending ? HIGH_ROOTS : LOW_ROOTS);
        const given = N.natural(pick(roots));
        const other = descending
            ? N.step(given, -item.degree, -item.semis)
            : N.step(given, item.degree, item.semis);

        const groups = shape === "harmony"
            ? [[given.midi, other.midi]]
            : [[given.midi], [other.midi]];

        return {
            playback: { groups: groups, beat: shape === "harmony" ? 2 : .68 },
            staffBefore: [{ notes: [given] }, null],
            staffAfter: [{ notes: [given] }, { notes: [other] }],
            keyboard: { given: [{ midi: given.midi, text: "" }], answer: [other.midi] },
            detail: N.name(given) + " → " + N.name(other)
        };
    }

    function chordQuestion(item, mode) {
        const shape = mode === "mixed" ? pick(["harmony", "arp"]) : mode;
        const rootAbs = pick(LOW_ROOTS);
        /* 증3화음은 자리를 바꿔도 구조가 같아 귀로 가릴 수 없다. */
        const allowed = item.id === "aug" || item.id === "dim7" ? [0] : (session.inversions || [0]);
        const inversion = pick(allowed);
        const notes = chordNotes(rootAbs, item, inversion);
        const midis = notes.map(note => note.midi);
        const rootNotes = chordNotes(rootAbs, item, 0);
        return {
            playback: shape === "arp"
                ? { groups: midis.map(midi => [midi]), beat: .5 }
                : { groups: [midis], beat: 2.2 },
            arpeggio: { groups: midis.map(midi => [midi]), beat: .5 },
            rootPlay: { groups: [rootNotes.map(note => note.midi)], beat: 2.2 },
            staffBefore: [null],
            staffAfter: [{ notes: notes }],
            keyboard: null,
            detail: N.name(notes[0]) + " …  " + notes.map(N.name).join(" · ")
        };
    }

    /* 화음 자리 알아맞히기: 화음 이름을 알려 주고 어느 자리인지 묻는다. */
    function positionQuestion(item, mode) {
        const shape = mode === "arp" ? "arp" : "harmony";
        const quality = pick(POSITION_QUALITIES);
        const rootAbs = pick(LOW_ROOTS);
        const notes = chordNotes(rootAbs, quality, item.inversion);
        const midis = notes.map(note => note.midi);
        const rootNotes = chordNotes(rootAbs, quality, 0);
        return {
            playback: shape === "arp"
                ? { groups: midis.map(midi => [midi]), beat: .5 }
                : { groups: [midis], beat: 2.2 },
            arpeggio: { groups: midis.map(midi => [midi]), beat: .5 },
            rootPlay: { groups: [rootNotes.map(note => note.midi)], beat: 2.2 },
            staffBefore: [null],
            staffAfter: [{ notes: notes }],
            keyboard: null,
            ask: N.LETTER_NAMES[N.natural(rootAbs).letter] + quality.en + " — 어느 자리인가요?",
            detail: notes.map(N.name).join(" · ")
        };
    }

    function scaleQuestion(item, mode) {
        const shape = mode === "mixed" ? pick(["up", "down"]) : mode;
        const root = N.natural(pick(LOW_ROOTS));
        const notes = item.tones.map(tone => N.step(root, tone[0], tone[1]));
        const line = shape === "down" ? notes.slice().reverse() : notes;
        return {
            playback: { groups: line.map(note => [note.midi]), beat: .44 },
            staffBefore: [null],
            staffAfter: line.map(note => ({ notes: [note] })),
            keyboard: null,
            detail: N.name(root) + " " + item.label
        };
    }

    function progressionQuestion(item) {
        const tonic = N.natural(pick([28, 29, 31, 32]));
        const scale = majorScale(tonic);
        const groups = item.chords.map(symbol => {
            const triad = degreeTriad(scale, symbol);
            const voiced = closeVoicing(tonic, triad);
            return [voiced[0] - 12].concat(voiced);
        });
        return {
            playback: { groups: groups, beat: 1.1 },
            staffBefore: [null],
            staffAfter: item.chords.map(symbol => ({ notes: degreeTriad(scale, symbol) })),
            keyboard: null,
            detail: N.LETTER_NAMES[tonic.letter] + " 장조 · " + item.label
        };
    }

    function melodyQuestion(item) {
        const tonic = N.natural(pick([28, 31, 32]));
        const scale = majorScale(tonic);
        const wide = item.reach;
        let degree = randomInt(0, 2);
        const degrees = [degree];
        for (let step = 1; step < item.count; step += 1) {
            let next = degree;
            let guard = 0;
            while ((next === degree || next < 0 || next > 7) && guard < 30) {
                next = degree + randomInt(-wide, wide);
                guard += 1;
            }
            degree = Math.max(0, Math.min(7, next));
            degrees.push(degree);
        }
        const notes = degrees.map(index => {
            const note = scale[index % 7];
            return index >= 7 ? N.spell(note.letterAbs + 7, note.accidental) : note;
        });
        return {
            playback: { groups: notes.map(note => [note.midi]), beat: .62 },
            staffBefore: [{ notes: [notes[0]] }].concat(notes.slice(1).map(() => null)),
            staffAfter: notes.map(note => ({ notes: [note] })),
            keyboard: {
                given: [{ midi: notes[0].midi, text: "1" }],
                answer: notes.slice(1).map(note => note.midi)
            },
            detail: notes.map(N.name).join(" ")
        };
    }

    const DRILLS = [
        {
            id: "interval",
            name: "음정",
            ask: "무슨 음정인가요?",
            items: INTERVALS,
            inputs: ["buttons", "keyboard"],
            levels: [
                { id: "easy", label: "쉬움", ids: ["M2", "M3", "P5", "P8"] },
                { id: "mid", label: "보통", ids: ["m2", "M2", "m3", "M3", "P4", "P5", "M6", "m7", "P8"] },
                { id: "hard", label: "한 옥타브 전부", ids: SIMPLE_INTERVAL_IDS },
                { id: "compound", label: "겹음정", ids: COMPOUND_INTERVAL_IDS }
            ],
            modes: [
                { id: "harmony", label: "함께" },
                { id: "up", label: "위로" },
                { id: "down", label: "아래로" },
                { id: "mixed", label: "섞어서" }
            ],
            make: intervalQuestion
        },
        {
            id: "chord",
            name: "화음 성질",
            ask: "무슨 화음인가요?",
            items: CHORDS,
            inputs: ["buttons"],
            levels: [
                { id: "easy", label: "maj·min", ids: ["maj", "min"] },
                { id: "mid", label: "3화음", ids: TRIAD_IDS },
                { id: "seventh", label: "7화음", ids: SEVENTH_IDS },
                { id: "hard", label: "전부", ids: CHORDS.map(item => item.id) }
            ],
            inversionOption: true,
            modes: [
                { id: "harmony", label: "함께" },
                { id: "arp", label: "펼쳐서" },
                { id: "mixed", label: "섞어서" }
            ],
            make: chordQuestion
        },
        {
            id: "position",
            name: "화음 자리",
            ask: "어느 자리인가요?",
            items: POSITIONS,
            inputs: ["buttons"],
            levels: [
                { id: "easy", label: "근음 자리·첫째", ids: ["root", "first"] },
                { id: "hard", label: "셋 다", ids: POSITIONS.map(item => item.id) }
            ],
            modes: [
                { id: "harmony", label: "함께" },
                { id: "arp", label: "펼쳐서" }
            ],
            make: positionQuestion
        },
        {
            id: "scale",
            name: "음계",
            ask: "무슨 음계인가요?",
            items: SCALES,
            inputs: ["buttons"],
            levels: [
                { id: "easy", label: "쉬움", ids: ["major", "nminor"] },
                { id: "mid", label: "보통", ids: ["major", "nminor", "hminor", "mminor", "pmaj", "pmin"] },
                { id: "hard", label: "전부", ids: SCALES.map(item => item.id) }
            ],
            modes: [
                { id: "up", label: "올라가며" },
                { id: "down", label: "내려가며" },
                { id: "mixed", label: "섞어서" }
            ],
            make: scaleQuestion
        },
        {
            id: "progression",
            name: "화음 진행",
            ask: "무슨 진행인가요?",
            items: PROGRESSIONS,
            inputs: ["buttons"],
            levels: [
                { id: "easy", label: "쉬움", ids: PROGRESSIONS.slice(0, 4).map(item => item.id) },
                { id: "mid", label: "보통", ids: PROGRESSIONS.slice(0, 8).map(item => item.id) },
                { id: "hard", label: "전부", ids: PROGRESSIONS.map(item => item.id) }
            ],
            modes: [],
            make: progressionQuestion
        },
        {
            id: "melody",
            name: "가락 받아쓰기",
            ask: "들은 차례대로 누르세요",
            answerIsLabel: false,
            pickable: false,
            inputs: ["keyboard"],
            items: [
                { id: "m3", label: label("3 notes", "세 음"), count: 3, reach: 2 },
                { id: "m4", label: label("4 notes", "네 음"), count: 4, reach: 3 },
                { id: "m5", label: label("5 notes", "다섯 음"), count: 5, reach: 5 }
            ],
            levels: [
                { id: "easy", label: "세 음", ids: ["m3"] },
                { id: "mid", label: "네 음", ids: ["m4"] },
                { id: "hard", label: "다섯 음", ids: ["m5"] }
            ],
            modes: [],
            make: melodyQuestion
        }
    ];

    /* 문제 만드는 규칙을 검사 도구에서 그대로 불러 쓸 수 있게 열어 둔다. */
    window.EarTraining = { drills: DRILLS };

    const DRILL_BY_ID = {};
    DRILLS.forEach(drill => { DRILL_BY_ID[drill.id] = drill; });

    /* 저장 ---------------------------------------------------------------- */
    const STORAGE_KEY = "earTraining.v2";
    const saved = { stats: {}, setup: {}, progress: {} };

    function loadSaved() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") {
                if (parsed.stats && typeof parsed.stats === "object") saved.stats = parsed.stats;
                if (parsed.setup && typeof parsed.setup === "object") saved.setup = parsed.setup;
                if (parsed.progress && typeof parsed.progress === "object") saved.progress = parsed.progress;
            }
        } catch (error) { /* 저장을 못 쓰면 기록 없이 쓴다. */ }
    }

    function persist() {
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (error) { /* 무시 */ }
    }

    function recordAnswer(drillId, itemId, correct) {
        if (!saved.stats[drillId]) saved.stats[drillId] = {};
        const table = saved.stats[drillId];
        const entry = table[itemId] || { right: 0, total: 0 };
        entry.total += 1;
        if (correct) entry.right += 1;
        table[itemId] = entry;
        persist();
    }

    function drillRate(drillId) {
        const table = saved.stats[drillId] || {};
        let right = 0;
        let total = 0;
        Object.keys(table).forEach(key => { right += table[key].right; total += table[key].total; });
        return total ? Math.round((right / total) * 100) : null;
    }

    /* 화면 ---------------------------------------------------------------- */
    const els = {};
    let keyboard = null;
    const session = {
        screen: "menu",
        drill: null,
        level: "easy",
        mode: "",
        input: "buttons",
        limit: 10,
        inversions: [0],
        enabled: new Set(),
        pool: [],
        current: null,
        typed: [],
        answered: false,
        right: 0,
        total: 0,
        perItem: new Map(),
        timer: 0,
        playTimer: 0
    };

    function showScreen(name) {
        ["menu", "course", "lesson", "wheel", "setup", "drill", "result"].forEach(key => {
            els[key + "Screen"].hidden = key !== name;
        });
        session.screen = name;
        document.body.classList.toggle("wheel-open", name === "wheel");
        window.scrollTo({ top: 0 });
    }

    function courseProgress(course) {
        const marks = saved.progress[course.id] || {};
        const done = course.lessons.filter(lesson => marks[lesson.id]).length;
        return { done: done, total: course.lessons.length };
    }

    function renderMenu() {
        els.courseList.innerHTML = "";
        (window.EarCourses || []).forEach(course => {
            const progress = courseProgress(course);
            const button = document.createElement("button");
            button.type = "button";
            button.className = "drill-card";
            button.innerHTML = '<b></b><span class="drill-stat"></span>';
            button.querySelector("b").textContent = course.name;
            button.querySelector(".drill-stat").textContent = progress.done + " / " + progress.total + "차시";
            button.addEventListener("click", () => openCourse(course.id));
            els.courseList.append(button);
        });

        els.toolList.innerHTML = "";
        const wheelCard = document.createElement("button");
        wheelCard.type = "button";
        wheelCard.className = "drill-card";
        wheelCard.innerHTML = "<b>오도권 원판</b>";
        wheelCard.addEventListener("click", openWheel);
        els.toolList.append(wheelCard);

        els.drillList.innerHTML = "";
        DRILLS.forEach(drill => {
            const rate = drillRate(drill.id);
            const button = document.createElement("button");
            button.type = "button";
            button.className = "drill-card";
            button.innerHTML = '<b></b><span class="drill-stat"></span>';
            button.querySelector("b").textContent = drill.name;
            button.querySelector(".drill-stat").textContent = rate === null ? "" : rate + "%";
            button.addEventListener("click", () => openSetup(drill.id));
            els.drillList.append(button);
        });
    }

    function levelIds(drill, levelId) {
        const level = drill.levels.find(entry => entry.id === levelId) || drill.levels[0];
        return level.ids.slice();
    }

    function openSetup(drillId) {
        const drill = DRILL_BY_ID[drillId];
        const remembered = saved.setup[drillId] || {};
        session.drill = drill;
        session.level = drill.levels.some(level => level.id === remembered.level) ? remembered.level : "easy";
        session.mode = drill.modes.length
            ? (drill.modes.some(mode => mode.id === remembered.mode) ? remembered.mode : drill.modes[0].id)
            : "";
        session.input = drill.inputs.indexOf(remembered.input) >= 0 ? remembered.input : drill.inputs[0];
        session.limit = [10, 20, 0].indexOf(remembered.limit) >= 0 ? remembered.limit : 10;
        session.inversions = remembered.inversions === "all" ? [0, 1, 2] : [0];
        const kept = Array.isArray(remembered.items)
            ? remembered.items.filter(id => drill.items.some(item => item.id === id))
            : [];
        session.enabled = new Set(kept.length > 1 ? kept : levelIds(drill, session.level));
        els.setupTitle.textContent = drill.name;
        els.modeField.hidden = drill.modes.length === 0;
        els.inputField.hidden = drill.inputs.length < 2;
        els.inversionField.hidden = !drill.inversionOption;
        els.itemField.hidden = drill.pickable === false;
        renderSetup();
        showScreen("setup");
    }

    function chipRow(row, options, current, onPick) {
        row.innerHTML = "";
        options.forEach(option => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chip";
            chip.textContent = option.label;
            chip.setAttribute("aria-pressed", String(option.id === current));
            chip.addEventListener("click", () => onPick(option.id));
            row.append(chip);
        });
    }

    function renderSetup() {
        const drill = session.drill;

        chipRow(els.levelRow, drill.levels, session.level, id => {
            session.level = id;
            session.enabled = new Set(levelIds(drill, id));
            renderSetup();
        });

        chipRow(els.modeRow, drill.modes, session.mode, id => {
            session.mode = id;
            renderSetup();
        });

        chipRow(els.inputRow, [
            { id: "buttons", label: "이름 단추" },
            { id: "keyboard", label: "건반" }
        ].filter(option => drill.inputs.indexOf(option.id) >= 0), session.input, id => {
            session.input = id;
            renderSetup();
        });

        chipRow(els.inversionRow, [
            { id: "root", label: "근음 자리만" },
            { id: "all", label: "자리바꿈까지" }
        ], session.inversions.length > 1 ? "all" : "root", id => {
            session.inversions = id === "all" ? [0, 1, 2] : [0];
            renderSetup();
        });

        chipRow(els.limitRow, [
            { id: 10, label: "10문제" },
            { id: 20, label: "20문제" },
            { id: 0, label: "끝까지" }
        ], session.limit, id => {
            session.limit = id;
            renderSetup();
        });

        const table = saved.stats[drill.id] || {};
        els.itemPicker.innerHTML = "";
        drill.items.forEach(item => {
            const entry = table[item.id];
            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "item-toggle";
            toggle.innerHTML = '<span class="name"></span><span class="rate"></span>';
            toggle.querySelector(".name").textContent = item.label;
            toggle.querySelector(".rate").textContent = entry && entry.total
                ? Math.round((entry.right / entry.total) * 100) + "%"
                : "";
            toggle.setAttribute("aria-pressed", String(session.enabled.has(item.id)));
            toggle.addEventListener("click", () => {
                if (session.enabled.has(item.id)) session.enabled.delete(item.id);
                else session.enabled.add(item.id);
                toggle.setAttribute("aria-pressed", String(session.enabled.has(item.id)));
                els.setupWarning.hidden = session.enabled.size >= minimumItems();
            });
            els.itemPicker.append(toggle);
        });

        els.setupWarning.hidden = session.enabled.size >= minimumItems();
    }

    function minimumItems() {
        return session.drill.pickable === false ? 1 : 2;
    }



    /* 음정 성질 사슬: 반음 하나씩 넓히거나 좁힐 때 이름이 어떻게 바뀌는지 */
    const SVG_NS = "http://www.w3.org/2000/svg";

    function svgNode(tag, attrs, text) {
        const node = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs || {}).forEach(key => node.setAttribute(key, attrs[key]));
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function chainBox(parent, x, y, w, h, en, ko, kind) {
        const group = svgNode("g", { class: "chain-box is-" + kind });
        group.append(svgNode("rect", { x: x, y: y, width: w, height: h, rx: 7 }));
        group.append(svgNode("text", { class: "chain-en", x: x + w / 2, y: y + h / 2 - 3 }, en));
        group.append(svgNode("text", { class: "chain-ko", x: x + w / 2, y: y + h / 2 + 15 }, ko));
        parent.append(group);
    }

    function chainArrow(parent, x1, y1, x2, y2, note, nx, ny) {
        parent.append(svgNode("line", {
            class: "chain-arrow", x1: x1, y1: y1, x2: x2, y2: y2, "marker-end": "url(#chainHead)"
        }));
        parent.append(svgNode("text", { class: "chain-note", x: nx, y: ny }, note));
    }

    function qualityChainDiagram() {
        const svg = svgNode("svg", {
            class: "chain",
            viewBox: "0 0 720 286",
            role: "img",
            "aria-label": "완전 계열은 감과 증으로, 장·단 계열은 단에서 감으로 장에서 증으로 이름이 바뀝니다"
        });
        const defs = svgNode("defs");
        const marker = svgNode("marker", {
            id: "chainHead", viewBox: "0 0 10 10", refX: 9, refY: 5,
            markerWidth: 6, markerHeight: 6, orient: "auto-start-reverse"
        });
        marker.append(svgNode("path", { class: "chain-head", d: "M0,0 L10,5 L0,10 z" }));
        defs.append(marker);
        svg.append(defs);

        svg.append(svgNode("text", { class: "chain-family is-perfect", x: 360, y: 22 }, "1 · 4 · 5 · 8도"));
        svg.append(svgNode("text", { class: "chain-family is-majmin", x: 360, y: 186 }, "2 · 3 · 6 · 7도"));

        chainArrow(svg, 298, 60, 264, 100, "반음 −", 244, 70);
        chainArrow(svg, 422, 60, 456, 100, "반음 +", 476, 70);
        chainArrow(svg, 248, 200, 220, 156, "반음 −", 196, 196);
        chainArrow(svg, 472, 200, 500, 156, "반음 +", 524, 196);
        chainArrow(svg, 378, 220, 350, 220, "반음 −", 364, 268);
        chainArrow(svg, 168, 126, 138, 126, "반음 −", 153, 93);
        chainArrow(svg, 552, 126, 582, 126, "반음 +", 567, 93);

        chainBox(svg, 300, 30, 120, 50, "Perfect", "완전", "perfect");
        chainBox(svg, 170, 100, 100, 52, "Dim.", "감", "plain");
        chainBox(svg, 30, 100, 106, 52, "Double dim.", "겹감", "plain");
        chainBox(svg, 450, 100, 100, 52, "Aug.", "증", "plain");
        chainBox(svg, 586, 100, 106, 52, "Double aug.", "겹증", "plain");
        chainBox(svg, 250, 194, 98, 52, "Minor", "단", "majmin");
        chainBox(svg, 380, 194, 98, 52, "Major", "장", "majmin");

        return svg;
    }

    /* 과정 ---------------------------------------------------------------- */
    let course = null;
    let lessonIndex = -1;

    function courseById(id) {
        return (window.EarCourses || []).find(entry => entry.id === id) || null;
    }

    function lessonMark(courseId, lessonId) {
        return (saved.progress[courseId] || {})[lessonId] || null;
    }

    function setLessonMark(courseId, lessonId, mark) {
        if (!saved.progress[courseId]) saved.progress[courseId] = {};
        saved.progress[courseId][lessonId] = mark;
        persist();
    }

    function openCourse(courseId) {
        course = courseById(courseId);
        if (!course) return;
        els.courseTitle.textContent = course.name;
        renderLessonList();
        showScreen("course");
    }

    function renderLessonList() {
        els.lessonList.innerHTML = "";
        course.lessons.forEach((lesson, index) => {
            const mark = lessonMark(course.id, lesson.id);
            const row = document.createElement("button");
            row.type = "button";
            row.className = "lesson-row";
            row.innerHTML = '<span class="lesson-order"></span><span class="lesson-name"></span>'
                + '<span class="lesson-kind"></span><span class="lesson-mark"></span>';
            row.querySelector(".lesson-order").textContent = (index + 1) + "차시";
            row.querySelector(".lesson-name").textContent = lesson.title;
            row.querySelector(".lesson-kind").textContent = lesson.kind === "text" ? "설명" : "연습";
            const badge = row.querySelector(".lesson-mark");
            if (mark && mark.read) badge.textContent = "✓";
            else if (mark && mark.total) badge.textContent = Math.round((mark.right / mark.total) * 100) + "%";
            if (mark) row.classList.add("is-done");
            row.addEventListener("click", () => openLesson(index));
            els.lessonList.append(row);
        });
    }

    function openLesson(index) {
        const lesson = course.lessons[index];
        if (!lesson) return;
        lessonIndex = index;
        if (lesson.kind === "drill") {
            startLessonDrill(lesson);
            return;
        }
        els.lessonTitle.textContent = lesson.title;
        els.lessonBody.innerHTML = "";
        lesson.body.forEach(paragraph => {
            const node = document.createElement("p");
            node.textContent = paragraph;
            els.lessonBody.append(node);
        });
        els.lessonExamples.innerHTML = "";
        if (lesson.diagram === "quality-chain") {
            const board = document.createElement("div");
            board.className = "diagram-board";
            board.append(qualityChainDiagram());
            els.lessonExamples.append(board);
        }
        (lesson.examples || []).forEach(entry => els.lessonExamples.append(
            typeof entry === "string" ? intervalExample(entry) : chordExample(entry)
        ));
        els.lessonNext.textContent = index + 1 < course.lessons.length ? "다음 차시" : "과정 목록";
        setLessonMark(course.id, lesson.id, { read: true });
        showScreen("lesson");
    }

    const EXAMPLE_SHAPES = [
        { id: "up", label: "올라가며" },
        { id: "down", label: "내려가며" },
        { id: "harmony", label: "함께" }
    ];

    function intervalExample(intervalId) {
        const item = INTERVALS.find(entry => entry.id === intervalId);
        const root = N.natural(28);
        const top = N.step(root, item.degree, item.semis);
        const block = document.createElement("div");
        block.className = "example";

        const caption = document.createElement("p");
        caption.className = "example-caption";
        caption.textContent = item.label + " · 반음 " + item.semis + "개";
        block.append(caption);

        const row = document.createElement("div");
        row.className = "example-staves";
        EXAMPLE_SHAPES.forEach(shape => {
            const columns = shape.id === "harmony"
                ? [{ notes: [root, top] }]
                : shape.id === "down" ? [{ notes: [top] }, { notes: [root] }] : [{ notes: [root] }, { notes: [top] }];
            const groups = shape.id === "harmony"
                ? [[root.midi, top.midi]]
                : shape.id === "down" ? [[top.midi], [root.midi]] : [[root.midi], [top.midi]];
            const button = document.createElement("button");
            button.type = "button";
            button.className = "example-play";
            button.append(N.render(columns, { label: item.label + " " + shape.label }));
            const tag = document.createElement("span");
            tag.textContent = shape.label;
            button.append(tag);
            button.addEventListener("click", () => {
                window.PianoEngine.playSequence(groups, shape.id === "harmony" ? 2 : .7).catch(() => {});
            });
            row.append(button);
        });
        block.append(row);

        return block;
    }

    const POSITION_LABEL = [
        label("root pos.", "근음 자리"),
        label("1st inv.", "첫째 자리바꿈"),
        label("2nd inv.", "둘째 자리바꿈"),
        label("3rd inv.", "셋째 자리바꿈")
    ];

    function chordExample(entry) {
        const item = CHORDS.find(chord => chord.id === entry.chord);
        const inversion = entry.inversion || 0;
        const notes = chordNotes(28, item, inversion);
        const midis = notes.map(note => note.midi);

        const block = document.createElement("div");
        block.className = "example";

        const caption = document.createElement("p");
        caption.className = "example-caption";
        caption.textContent = item.label + (entry.inversion === undefined ? "" : " · " + POSITION_LABEL[inversion]);
        block.append(caption);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "example-play is-wide";
        button.append(N.render(
            [{ notes: notes }].concat(notes.map(note => ({ notes: [note] }))),
            { label: item.label }
        ));
        const tag = document.createElement("span");
        tag.textContent = "함께 · 펼쳐서";
        button.append(tag);
        button.addEventListener("click", () => {
            window.PianoEngine.playSequence([midis], 1.6).catch(() => {});
            window.setTimeout(() => {
                window.PianoEngine.playSequence(midis.map(midi => [midi]), .48).catch(() => {});
            }, 1500);
        });
        block.append(button);
        return block;
    }

    function startLessonDrill(lesson) {
        const drill = DRILL_BY_ID[lesson.drill.drillId || "interval"];
        session.drill = drill;
        session.mode = lesson.drill.mode || (drill.modes[0] && drill.modes[0].id) || "";
        session.input = lesson.drill.input || "buttons";
        session.limit = lesson.drill.limit || 10;
        session.inversions = lesson.drill.inversions || [0];
        session.enabled = new Set(lesson.drill.items);
        session.fromLesson = { courseId: course.id, lessonId: lesson.id };
        beginRound();
    }

    function nextLesson() {
        if (lessonIndex + 1 < course.lessons.length) openLesson(lessonIndex + 1);
        else { renderLessonList(); showScreen("course"); }
    }


    /* 오도권 원판 ---------------------------------------------------------- */
    let wheel = null;

    const ACC_MARK = { "-2": "♭♭", "-1": "♭", "0": "", "1": "♯", "2": "♯♯" };

    /* 원판이 가리키는 조의 다이어토닉 화음을 조표대로 적는다. */
    function wheelChordNames(home, list) {
        const tonic = N.spell(4 * 7 + home.letter, home.acc);
        const scale = majorScale(tonic);
        return list.map(entry => {
            const note = scale[entry.degree];
            const root = N.LETTER_NAMES[note.letter] + (ACC_MARK[String(note.accidental)] || "");
            return Object.assign({}, entry, {
                name: root + (entry.quality === "maj" ? "" : entry.quality === "min" ? "m" : "dim"),
                rootMidi: note.midi
            });
        });
    }

    /* 화음 하나를 가온도 언저리에서 울린다. 너무 높으면 통째로 한 옥타브 내린다. */
    function voiceChord(chord) {
        const shape = { maj: [0, 4, 7], min: [0, 3, 7], dim: [0, 3, 6] }[chord.quality];
        let root = 60 + (((chord.rootMidi - 60) % 12) + 12) % 12;
        const notes = shape.map(step => root + step);
        return notes[notes.length - 1] > 76 ? notes.map(note => note - 12) : notes;
    }

    function openWheel() {
        if (!wheel) {
            wheel = window.Wheel.create(els.wheelBoard, {
                onChange: (list, home) => renderWheelChords(wheelChordNames(home, list)),
                onPlayChord: chord => {
                    const named = wheelChordNames(wheel.home(), [chord])[0];
                    window.PianoEngine.playSequence([voiceChord(named)], 2).catch(() => {});
                },
                onPlayMode: (mode, home) => {
                    const root = 60 + home.tonic;
                    window.PianoEngine.playSequence(mode.steps.map(step => [root + step]), .42).catch(() => {});
                }
            });
        }
        showScreen("wheel");
    }

    function renderWheelChords(chords) {
        els.wheelChords.innerHTML = "";
        chords.forEach(chord => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "wheel-chord";
            button.innerHTML = '<b></b><span></span><small></small>';
            button.querySelector("b").textContent = chord.roman;
            button.querySelector("span").textContent = chord.name;
            button.querySelector("small").textContent = chord.role || "";
            button.addEventListener("click", () => {
                window.PianoEngine.playSequence([voiceChord(chord)], 2).catch(() => {});
            });
            els.wheelChords.append(button);
        });
    }

    function playCadence() {
        const named = wheelChordNames(wheel.home(), wheel.chords());
        const order = [0, 3, 4, 0].map(degree => named.find(chord => chord.degree === degree));
        window.PianoEngine.playSequence(order.map(voiceChord), 1.15).catch(() => {});
    }

    /* 연습 ---------------------------------------------------------------- */

    function startDrill() {
        if (session.enabled.size < minimumItems()) {
            els.setupWarning.hidden = false;
            return;
        }
        const drill = session.drill;
        saved.setup[drill.id] = {
            level: session.level,
            mode: session.mode,
            input: session.input,
            limit: session.limit,
            inversions: session.inversions.length > 1 ? "all" : "root",
            items: Array.from(session.enabled)
        };
        persist();
        session.fromLesson = null;
        beginRound();
    }

    function beginRound() {
        const drill = session.drill;
        session.pool = drill.items.filter(item => session.enabled.has(item.id));
        session.right = 0;
        session.total = 0;
        session.perItem = new Map();
        els.askText.textContent = drill.ask;
        showScreen("drill");
        nextQuestion();
    }

    function nextQuestion() {
        window.clearTimeout(session.timer);
        if (session.limit && session.total >= session.limit) {
            finishDrill();
            return;
        }

        const drill = session.drill;
        const previous = session.current && session.current.item.id;
        let item = pick(session.pool);
        if (session.pool.length > 2 && item.id === previous) item = pick(session.pool);

        const question = drill.make(item, session.mode);
        question.item = item;
        session.current = question;
        session.typed = [];
        session.answered = false;

        els.askText.textContent = question.ask || drill.ask;
        els.feedback.textContent = "";
        els.feedback.className = "feedback";
        els.nextButton.hidden = true;
        els.helpRow.hidden = !question.arpeggio;
        drawStaff(question.staffBefore);
        setupInput(question);
        updateScore();
        play();
    }

    function drawStaff(columns) {
        els.staff.innerHTML = "";
        els.staff.append(N.render(columns, { label: "문제 악보" }));
    }

    function setupInput(question) {
        const useKeyboard = session.input === "keyboard" && question.keyboard;
        els.keyboardWrap.hidden = !useKeyboard;
        els.choices.hidden = useKeyboard;

        if (useKeyboard) {
            keyboard.clearMarks();
            keyboard.setEnabled(true);
            question.keyboard.given.forEach(given => keyboard.mark(given.midi, "given", given.text));
            keyboard.centerOn(question.keyboard.given[0].midi);
            els.typedCount.hidden = question.keyboard.answer.length < 2;
            els.typedCount.textContent = "0 / " + question.keyboard.answer.length;
            return;
        }

        els.choices.innerHTML = "";
        session.pool.forEach(item => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "choice";
            button.textContent = item.label;
            button.dataset.itemId = item.id;
            button.addEventListener("click", () => answerByName(item));
            els.choices.append(button);
        });
        els.typedCount.hidden = true;
    }

    function play() {
        const playback = session.current && session.current.playback;
        if (!playback || !window.PianoEngine) return;
        els.replayButton.classList.add("playing");
        window.clearTimeout(session.playTimer);
        const span = playback.groups.length * playback.beat * 1000 + 320;
        session.playTimer = window.setTimeout(() => els.replayButton.classList.remove("playing"), span);
        window.PianoEngine.playSequence(playback.groups, playback.beat).catch(() => {
            els.replayButton.classList.remove("playing");
            els.feedback.textContent = "소리를 낼 수 없습니다. 소리 설정을 확인해 주세요.";
            els.feedback.className = "feedback wrong";
        });
    }

    function playExtra(which) {
        const source = session.current && session.current[which];
        if (!source || !window.PianoEngine) return;
        window.PianoEngine.playSequence(source.groups, source.beat).catch(() => {});
    }

    function answerByName(chosen) {
        if (session.answered) return;
        const target = session.current.item;
        const correct = chosen.id === target.id;
        Array.from(els.choices.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.itemId === target.id) button.classList.add("right");
            else if (button.dataset.itemId === chosen.id) button.classList.add("wrong");
            else button.classList.add("dim");
        });
        settle(correct);
    }

    function answerByKey(midi) {
        if (session.answered) return;
        const expected = session.current.keyboard.answer;
        window.PianoEngine.playSequence([[midi]], .6).catch(() => {});
        session.typed.push(midi);
        els.typedCount.textContent = session.typed.length + " / " + expected.length;
        if (session.typed.length < expected.length) {
            keyboard.mark(midi, "typed", String(session.typed.length + 1));
            return;
        }
        const correct = expected.every((value, index) => value === session.typed[index]);
        keyboard.clearMarks();
        keyboard.setEnabled(false);
        session.current.keyboard.given.forEach(given => keyboard.mark(given.midi, "given", given.text));
        expected.forEach((value, index) => {
            const wasRight = session.typed[index] === value;
            keyboard.mark(value, "right", String(index + 2));
            if (!wasRight) keyboard.mark(session.typed[index], "wrong", "");
        });
        settle(correct);
    }

    function settle(correct) {
        session.answered = true;
        const target = session.current.item;
        session.total += 1;
        if (correct) session.right += 1;

        const tally = session.perItem.get(target.id) || { right: 0, total: 0 };
        tally.total += 1;
        if (correct) tally.right += 1;
        session.perItem.set(target.id, tally);
        recordAnswer(session.drill.id, target.id, correct);

        const before = session.current.staffBefore;
        drawStaff(session.current.staffAfter.map((column, index) => {
            if (!column) return column;
            const wasHidden = !before[index];
            return wasHidden ? Object.assign({}, column, { mark: correct ? "right" : "wrong" }) : column;
        }));

        els.feedback.textContent = correct
            ? "맞았습니다 · " + answerText(target)
            : "정답은 " + answerText(target) + "입니다";
        els.feedback.className = "feedback " + (correct ? "right" : "wrong");

        updateScore();

        if (correct) session.timer = window.setTimeout(nextQuestion, 1100);
        else {
            els.nextButton.hidden = false;
            els.nextButton.focus({ preventScroll: true });
        }
    }

    function answerText(item) {
        const detail = session.current.detail;
        if (session.drill.answerIsLabel === false) return detail;
        return item.label + (detail ? " (" + detail + ")" : "");
    }


    function skipQuestion() {
        if (session.answered) { nextQuestion(); return; }
        session.answered = true;
        drawStaff(session.current.staffAfter);
        els.feedback.textContent = "정답은 " + answerText(session.current.item) + "입니다";
        els.feedback.className = "feedback wrong";
        if (session.input === "keyboard" && session.current.keyboard) {
            keyboard.setEnabled(false);
            session.current.keyboard.answer.forEach((midi, index) => keyboard.mark(midi, "right", String(index + 2)));
        } else {
            Array.from(els.choices.children).forEach(button => {
                button.disabled = true;
                if (button.dataset.itemId === session.current.item.id) button.classList.add("right");
                else button.classList.add("dim");
            });
        }
        els.nextButton.hidden = false;
    }

    function updateScore() {
        const rate = session.total ? Math.round((session.right / session.total) * 100) : 0;
        els.scoreText.textContent = session.right + " / " + session.total + " · " + rate + "%"
            + (session.limit ? " (" + session.limit + "문제)" : "");
    }

    function finishDrill() {
        window.clearTimeout(session.timer);
        if (!session.total) {
            backToHub();
            return;
        }
        if (session.fromLesson) {
            const previous = lessonMark(session.fromLesson.courseId, session.fromLesson.lessonId);
            const better = !previous || !previous.total
                || (session.right / session.total) > (previous.right / previous.total);
            if (better) setLessonMark(session.fromLesson.courseId, session.fromLesson.lessonId,
                { right: session.right, total: session.total });
        }
        els.resultScore.textContent = session.drill.name + " " + session.right + " / " + session.total
            + " · " + Math.round((session.right / session.total) * 100) + "%";

        const rows = session.pool
            .map(item => ({ item: item, tally: session.perItem.get(item.id) }))
            .filter(row => row.tally && row.tally.total)
            .sort((a, b) => (a.tally.right / a.tally.total) - (b.tally.right / b.tally.total));

        els.resultTable.innerHTML = "";
        rows.forEach(row => {
            const rate = Math.round((row.tally.right / row.tally.total) * 100);
            const line = document.createElement("div");
            line.className = "result-row " + (rate < 60 ? "weak" : rate === 100 ? "strong" : "");
            line.innerHTML = '<b></b><span class="count"></span><span class="pct"></span>';
            line.querySelector("b").textContent = row.item.label;
            line.querySelector(".count").textContent = row.tally.right + " / " + row.tally.total;
            line.querySelector(".pct").textContent = rate + "%";
            els.resultTable.append(line);
        });
        els.toMenuButton.textContent = session.fromLesson ? "차시 목록" : "다른 훈련";
        showScreen("result");
    }

    function backToHub() {
        if (session.fromLesson && course) {
            renderLessonList();
            showScreen("course");
            return;
        }
        renderMenu();
        showScreen("menu");
    }

    function goBack() {
        if (session.screen === "drill") { finishDrill(); return true; }
        if (session.screen === "result") { backToHub(); return true; }
        if (session.screen === "lesson") { renderLessonList(); showScreen("course"); return true; }
        if (session.screen === "wheel" || session.screen === "course" || session.screen === "setup") {
            renderMenu();
            showScreen("menu");
            return true;
        }
        return false;
    }

    function bindKeys() {
        document.addEventListener("keydown", event => {
            if (session.screen !== "drill") return;
            if (event.key === " ") { event.preventDefault(); play(); return; }
            if (event.key === "Enter" && !els.nextButton.hidden) { event.preventDefault(); nextQuestion(); return; }
            if (session.input === "keyboard") return;
            const index = "123456789".indexOf(event.key);
            if (index >= 0 && els.choices.children[index]) {
                event.preventDefault();
                els.choices.children[index].click();
            }
        });
    }

    function init() {
        ["menuScreen", "courseScreen", "lessonScreen", "setupScreen", "drillScreen", "resultScreen",
            "courseList", "courseTitle", "lessonList", "lessonTitle", "lessonBody", "lessonExamples",
            "lessonNext", "drillList", "toolList", "wheelScreen", "wheelBoard", "wheelChords",
            "wheelPrev", "wheelNext", "wheelFlat", "wheelCadence", "setupTitle", "inversionField", "inversionRow",
            "helpRow", "arpButton", "rootButton",
            "levelRow", "modeRow", "modeField", "inputRow", "inputField", "limitRow", "itemField",
            "itemPicker", "startButton", "setupWarning", "askText", "staff", "scoreText", "stopButton",
            "replayButton", "skipButton", "choices", "keyboardWrap", "pianoKeys", "typedCount",
            "feedback", "nextButton", "resultScore", "resultTable", "againButton",
            "toMenuButton"].forEach(id => { els[id] = byId(id); });

        loadSaved();
        keyboard = window.Keyboard.build(els.pianoKeys, KEY_LOW, KEY_HIGH, answerByKey);

        renderMenu();
        showScreen("menu");

        els.startButton.addEventListener("click", startDrill);
        els.replayButton.addEventListener("click", play);
        els.skipButton.addEventListener("click", skipQuestion);
        els.arpButton.addEventListener("click", () => playExtra("arpeggio"));
        els.rootButton.addEventListener("click", () => playExtra("rootPlay"));
        els.nextButton.addEventListener("click", nextQuestion);
        els.stopButton.addEventListener("click", finishDrill);
        els.againButton.addEventListener("click", () => {
            session.right = 0;
            session.total = 0;
            session.perItem = new Map();
            showScreen("drill");
            nextQuestion();
        });
        els.toMenuButton.addEventListener("click", backToHub);
        els.lessonNext.addEventListener("click", nextLesson);
        els.wheelPrev.addEventListener("click", () => wheel.step(-1));
        els.wheelNext.addEventListener("click", () => wheel.step(1));
        els.wheelFlat.addEventListener("click", () => wheel.toggleFlat());
        els.wheelCadence.addEventListener("click", playCadence);

        window.addEventListener("sitebackrequest", event => {
            if (goBack()) event.preventDefault();
        });

        bindKeys();

        if (window.PianoEngine) {
            window.setTimeout(() => {
                window.PianoEngine.preload().catch(() => { /* 첫 재생 때 합성음으로 대신한다. */ });
            }, 900);
        }
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
