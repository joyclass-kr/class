(function () {
    "use strict";

    const pc = value => ((value % 12) + 12) % 12;
    const byId = id => document.getElementById(id);
    const pick = list => list[Math.floor(Math.random() * list.length)];
    const randomInt = (low, high) => low + Math.floor(Math.random() * (high - low + 1));

    const INTERVALS = [
        { id: "m2", label: "단2도", semis: 1 },
        { id: "M2", label: "장2도", semis: 2 },
        { id: "m3", label: "단3도", semis: 3 },
        { id: "M3", label: "장3도", semis: 4 },
        { id: "P4", label: "완전4도", semis: 5 },
        { id: "TT", label: "증4도", semis: 6 },
        { id: "P5", label: "완전5도", semis: 7 },
        { id: "m6", label: "단6도", semis: 8 },
        { id: "M6", label: "장6도", semis: 9 },
        { id: "m7", label: "단7도", semis: 10 },
        { id: "M7", label: "장7도", semis: 11 },
        { id: "P8", label: "완전8도", semis: 12 }
    ];

    const CHORDS = [
        { id: "maj", label: "장3화음", offs: [0, 4, 7] },
        { id: "min", label: "단3화음", offs: [0, 3, 7] },
        { id: "dim", label: "감3화음", offs: [0, 3, 6] },
        { id: "aug", label: "증3화음", offs: [0, 4, 8] },
        { id: "maj7", label: "장7화음", offs: [0, 4, 7, 11] },
        { id: "dom7", label: "속7화음", offs: [0, 4, 7, 10] },
        { id: "min7", label: "단7화음", offs: [0, 3, 7, 10] },
        { id: "m7b5", label: "반감7화음", offs: [0, 3, 6, 10] },
        { id: "dim7", label: "감7화음", offs: [0, 3, 6, 9] }
    ];

    const SCALES = [
        { id: "major", label: "장음계", steps: [0, 2, 4, 5, 7, 9, 11, 12] },
        { id: "nminor", label: "자연단음계", steps: [0, 2, 3, 5, 7, 8, 10, 12] },
        { id: "hminor", label: "화성단음계", steps: [0, 2, 3, 5, 7, 8, 11, 12] },
        { id: "mminor", label: "가락단음계", steps: [0, 2, 3, 5, 7, 9, 11, 12] },
        { id: "pmaj", label: "장5음음계", steps: [0, 2, 4, 7, 9, 12] },
        { id: "pmin", label: "단5음음계", steps: [0, 3, 5, 7, 10, 12] },
        { id: "blues", label: "블루스음계", steps: [0, 3, 5, 6, 7, 10, 12] },
        { id: "dorian", label: "도리아", steps: [0, 2, 3, 5, 7, 9, 10, 12] },
        { id: "phryg", label: "프리지아", steps: [0, 1, 3, 5, 7, 8, 10, 12] },
        { id: "lydian", label: "리디아", steps: [0, 2, 4, 6, 7, 9, 11, 12] },
        { id: "mixo", label: "믹솔리디아", steps: [0, 2, 4, 5, 7, 9, 10, 12] },
        { id: "locrian", label: "로크리아", steps: [0, 1, 3, 5, 6, 8, 10, 12] },
        { id: "whole", label: "온음음계", steps: [0, 2, 4, 6, 8, 10, 12] }
    ];

    const DEGREES = {
        "I": [0, 4, 7],
        "ii": [2, 5, 9],
        "iii": [4, 7, 11],
        "IV": [5, 9, 12],
        "V": [7, 11, 14],
        "vi": [9, 12, 16]
    };

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

    function chordVoicing(tonic, symbol) {
        const offs = DEGREES[symbol];
        const bass = tonic - 12 + pc(offs[0]);
        return [bass].concat(offs.map(off => tonic + pc(off)));
    }

    const DRILLS = [
        {
            id: "interval",
            name: "음정",
            items: INTERVALS,
            levels: [
                { id: "easy", label: "쉬움", ids: ["M2", "M3", "P5", "P8"] },
                { id: "mid", label: "보통", ids: ["m2", "M2", "m3", "M3", "P4", "P5", "M6", "m7", "P8"] },
                { id: "hard", label: "전부", ids: INTERVALS.map(item => item.id) }
            ],
            modes: [
                { id: "harmony", label: "함께" },
                { id: "up", label: "위로 차례로" },
                { id: "down", label: "아래로 차례로" },
                { id: "mixed", label: "섞어서" }
            ],
            build: function (item, mode) {
                const root = randomInt(55, 64);
                const top = root + item.semis;
                const shape = mode === "mixed" ? pick(["harmony", "up", "down"]) : mode;
                if (shape === "harmony") return { groups: [[root, top]], beat: 2 };
                if (shape === "down") return { groups: [[top], [root]], beat: .68 };
                return { groups: [[root], [top]], beat: .68 };
            }
        },
        {
            id: "chord",
            name: "화음 성질",
            items: CHORDS,
            levels: [
                { id: "easy", label: "쉬움", ids: ["maj", "min"] },
                { id: "mid", label: "보통", ids: ["maj", "min", "dim", "aug"] },
                { id: "hard", label: "전부", ids: CHORDS.map(item => item.id) }
            ],
            modes: [
                { id: "harmony", label: "함께" },
                { id: "arp", label: "펼쳐서" },
                { id: "mixed", label: "섞어서" }
            ],
            build: function (item, mode) {
                const root = randomInt(50, 60);
                const notes = item.offs.map(off => root + off);
                const shape = mode === "mixed" ? pick(["harmony", "arp"]) : mode;
                if (shape === "arp") return { groups: notes.map(note => [note]), beat: .5 };
                return { groups: [notes], beat: 2.2 };
            }
        },
        {
            id: "scale",
            name: "음계",
            items: SCALES,
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
            build: function (item, mode) {
                const root = randomInt(55, 62);
                const notes = item.steps.map(step => root + step);
                const shape = mode === "mixed" ? pick(["up", "down"]) : mode;
                const line = shape === "down" ? notes.slice().reverse() : notes;
                return { groups: line.map(note => [note]), beat: .44 };
            }
        },
        {
            id: "progression",
            name: "화음 진행",
            items: PROGRESSIONS,
            levels: [
                { id: "easy", label: "쉬움", ids: PROGRESSIONS.slice(0, 4).map(item => item.id) },
                { id: "mid", label: "보통", ids: PROGRESSIONS.slice(0, 8).map(item => item.id) },
                { id: "hard", label: "전부", ids: PROGRESSIONS.map(item => item.id) }
            ],
            modes: [],
            build: function (item) {
                const tonic = randomInt(57, 63);
                return { groups: item.chords.map(symbol => chordVoicing(tonic, symbol)), beat: 1.1 };
            }
        }
    ];

    const DRILL_BY_ID = {};
    DRILLS.forEach(drill => { DRILL_BY_ID[drill.id] = drill; });

    /* 저장 */
    const STORAGE_KEY = "earTraining.v1";
    let saved = { stats: {}, setup: {} };

    function loadSaved() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") {
                saved.stats = parsed.stats && typeof parsed.stats === "object" ? parsed.stats : {};
                saved.setup = parsed.setup && typeof parsed.setup === "object" ? parsed.setup : {};
            }
        } catch (error) { /* 저장을 못 쓰는 브라우저에서는 그냥 기록 없이 씁니다. */ }
    }

    function persist() {
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (error) { /* 무시 */ }
    }

    function statsFor(drillId) {
        if (!saved.stats[drillId]) saved.stats[drillId] = {};
        return saved.stats[drillId];
    }

    function recordAnswer(drillId, itemId, correct) {
        const table = statsFor(drillId);
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

    /* 화면 상태 */
    const els = {};
    const session = {
        drill: null,
        level: "easy",
        mode: "",
        enabled: new Set(),
        pool: [],
        current: null,
        playback: null,
        answered: false,
        right: 0,
        total: 0,
        perItem: new Map(),
        timer: 0
    };

    function showScreen(name) {
        ["menu", "setup", "drill", "result"].forEach(key => {
            els[key + "Screen"].hidden = key !== name;
        });
        session.screen = name;
        window.scrollTo({ top: 0 });
    }

    /* 갈래 고르기 */
    function renderMenu() {
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

    /* 준비 화면 */
    function openSetup(drillId) {
        const drill = DRILL_BY_ID[drillId];
        session.drill = drill;
        const remembered = saved.setup[drillId] || {};
        session.level = drill.levels.some(level => level.id === remembered.level) ? remembered.level : "easy";
        session.mode = drill.modes.length
            ? (drill.modes.some(mode => mode.id === remembered.mode) ? remembered.mode : drill.modes[0].id)
            : "";
        const rememberedItems = Array.isArray(remembered.items) ? remembered.items : null;
        const valid = rememberedItems && rememberedItems.filter(id => drill.items.some(item => item.id === id));
        session.enabled = new Set(valid && valid.length > 1 ? valid : levelIds(drill, session.level));
        els.setupTitle.textContent = drill.name;
        els.modeField.hidden = drill.modes.length === 0;
        renderSetup();
        showScreen("setup");
    }

    function levelIds(drill, levelId) {
        const level = drill.levels.find(entry => entry.id === levelId) || drill.levels[0];
        return level.ids.slice();
    }

    function renderSetup() {
        const drill = session.drill;

        els.levelRow.innerHTML = "";
        drill.levels.forEach(level => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chip";
            chip.textContent = level.label;
            chip.setAttribute("aria-pressed", String(level.id === session.level));
            chip.addEventListener("click", () => {
                session.level = level.id;
                session.enabled = new Set(levelIds(drill, level.id));
                renderSetup();
            });
            els.levelRow.append(chip);
        });

        els.modeRow.innerHTML = "";
        drill.modes.forEach(mode => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chip";
            chip.textContent = mode.label;
            chip.setAttribute("aria-pressed", String(mode.id === session.mode));
            chip.addEventListener("click", () => {
                session.mode = mode.id;
                renderSetup();
            });
            els.modeRow.append(chip);
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
                els.setupWarning.hidden = session.enabled.size > 1;
            });
            els.itemPicker.append(toggle);
        });

        els.setupWarning.hidden = session.enabled.size > 1;
    }

    /* 연습 */
    function startDrill() {
        if (session.enabled.size < 2) {
            els.setupWarning.hidden = false;
            return;
        }
        const drill = session.drill;
        saved.setup[drill.id] = {
            level: session.level,
            mode: session.mode,
            items: Array.from(session.enabled)
        };
        persist();

        session.pool = drill.items.filter(item => session.enabled.has(item.id));
        session.right = 0;
        session.total = 0;
        session.perItem = new Map();
        showScreen("drill");
        nextQuestion();
    }

    function nextQuestion() {
        window.clearTimeout(session.timer);
        const drill = session.drill;
        const previous = session.current && session.current.item.id;
        let item = pick(session.pool);
        if (session.pool.length > 2 && item.id === previous) item = pick(session.pool);

        session.current = { item: item, playback: drill.build(item, session.mode) };
        session.answered = false;

        els.feedback.textContent = "";
        els.feedback.className = "feedback";
        els.nextButton.hidden = true;
        renderChoices();
        updateScore();
        play();
    }

    function renderChoices() {
        els.choices.innerHTML = "";
        session.pool.forEach(item => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "choice";
            button.textContent = item.label;
            button.dataset.itemId = item.id;
            button.addEventListener("click", () => answer(item));
            els.choices.append(button);
        });
    }

    function play() {
        const playback = session.current && session.current.playback;
        if (!playback || !window.PianoEngine) return;
        els.replayButton.classList.add("playing");
        window.clearTimeout(session.playing);
        const span = playback.groups.length * playback.beat * 1000 + 300;
        session.playing = window.setTimeout(() => els.replayButton.classList.remove("playing"), span);
        window.PianoEngine.playSequence(playback.groups, playback.beat).catch(() => {
            els.replayButton.classList.remove("playing");
            els.feedback.textContent = "소리를 낼 수 없습니다. 소리 설정을 확인해 주세요.";
            els.feedback.className = "feedback wrong";
        });
    }

    function answer(chosen) {
        if (session.answered) return;
        session.answered = true;

        const target = session.current.item;
        const correct = chosen.id === target.id;
        session.total += 1;
        if (correct) session.right += 1;

        const tally = session.perItem.get(target.id) || { right: 0, total: 0 };
        tally.total += 1;
        if (correct) tally.right += 1;
        session.perItem.set(target.id, tally);
        recordAnswer(session.drill.id, target.id, correct);

        Array.from(els.choices.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.itemId === target.id) button.classList.add("right");
            else if (button.dataset.itemId === chosen.id) button.classList.add("wrong");
            else button.classList.add("dim");
        });

        updateScore();

        if (correct) {
            els.feedback.textContent = "맞았습니다";
            els.feedback.className = "feedback right";
            session.timer = window.setTimeout(nextQuestion, 850);
        } else {
            els.feedback.textContent = "정답은 " + target.label + "입니다";
            els.feedback.className = "feedback wrong";
            els.nextButton.hidden = false;
            els.nextButton.focus();
        }
    }

    function updateScore() {
        els.scoreText.textContent = session.total
            ? session.right + " / " + session.total + " · " + Math.round((session.right / session.total) * 100) + "%"
            : "0 / 0";
    }

    /* 결과 */
    function finishDrill() {
        window.clearTimeout(session.timer);
        if (!session.total) {
            showScreen("menu");
            renderMenu();
            return;
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

        showScreen("result");
    }

    /* 뒤로 가기: 한 단계만 */
    function goBack() {
        if (session.screen === "drill") {
            finishDrill();
            return true;
        }
        if (session.screen === "result" || session.screen === "setup") {
            renderMenu();
            showScreen("menu");
            return true;
        }
        return false;
    }

    function bindKeys() {
        document.addEventListener("keydown", event => {
            if (session.screen !== "drill") return;
            if (event.key === " " || event.key === "Spacebar") {
                event.preventDefault();
                play();
                return;
            }
            if (event.key === "Enter" && !els.nextButton.hidden) {
                event.preventDefault();
                nextQuestion();
                return;
            }
            const index = "123456789".indexOf(event.key);
            if (index >= 0 && els.choices.children[index]) {
                event.preventDefault();
                els.choices.children[index].click();
            }
        });
    }

    function init() {
        ["menuScreen", "setupScreen", "drillScreen", "resultScreen", "drillList", "setupTitle",
            "levelRow", "modeRow", "modeField", "itemPicker", "startButton", "setupWarning",
            "scoreText", "stopButton", "replayButton", "choices", "feedback", "nextButton",
            "resultScore", "resultTable", "againButton", "toMenuButton"].forEach(id => { els[id] = byId(id); });

        loadSaved();
        renderMenu();
        showScreen("menu");

        els.startButton.addEventListener("click", startDrill);
        els.replayButton.addEventListener("click", play);
        els.nextButton.addEventListener("click", nextQuestion);
        els.stopButton.addEventListener("click", finishDrill);
        els.againButton.addEventListener("click", () => {
            session.right = 0;
            session.total = 0;
            session.perItem = new Map();
            showScreen("drill");
            nextQuestion();
        });
        els.toMenuButton.addEventListener("click", () => {
            renderMenu();
            showScreen("menu");
        });

        window.addEventListener("sitebackrequest", event => {
            if (goBack()) event.preventDefault();
        });

        bindKeys();

        if (window.PianoEngine) {
            window.setTimeout(() => {
                window.PianoEngine.preload().catch(() => { /* 첫 재생 때 합성음으로 대신합니다. */ });
            }, 900);
        }
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
