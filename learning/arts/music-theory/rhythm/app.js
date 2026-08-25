(function () {
    "use strict";

    const STORE_KEY = "musicTheoryRhythmProgressV1";
    const elements = {};
    const audio = createRhythmAudio();

    const patternBanks = {
        eighth: [
            [0,2,4,6], [0,1,2,4,5,6], [0,2,3,4,6,7], [0,1,3,4,5,7], [0,2,4,5,6]
        ],
        sixteenth: [
            [0,4,8,12], [0,2,4,6,8,10,12,14], [0,3,4,7,8,11,12,15],
            [0,1,4,6,8,9,12,14], [0,2,3,6,8,10,12,15], [0,1,3,4,7,8,11,12,14]
        ],
        syncopation: [
            [1,3,5,7], [0,3,4,7], [0,1,3,5,6], [0,2,3,5,7], [1,2,4,5,7]
        ],
        compound: [
            [0,3], [0,2,3,5], [0,1,3,4], [0,2,3,4,5], [0,1,2,3,5]
        ],
        mixed: [
            [0,3,4,6,8,11,12,14], [0,1,4,6,8,9,12,15], [0,2,5,6,8,10,13,14],
            [0,3,4,7,9,12,14,15], [0,1,3,6,8,9,12,14,15], [0,2,4,7,8,10,11,13]
        ]
    };

    const stages = [
        { id: 1, title: "박과 빠르기", short: "박 · BPM", summary: "일정한 박을 듣고 몸으로 따라가요.", concept: "박은 음악의 일정한 걸음이에요", body: "음악이 흐르는 동안 같은 간격으로 느껴지는 기본 맥박을 박이라고 합니다. BPM은 1분 동안 박이 몇 번 움직이는지 나타냅니다.", points: ["박 사이의 간격은 일정하게 유지", "첫 박은 다른 박보다 강하게 느껴질 수 있음", "BPM이 커질수록 박이 빨라짐"], type: "pulse" },
        { id: 2, title: "음표와 쉼표", short: "1박 · 2박 · 4박", summary: "기본 음표와 쉼표의 길이를 익혀요.", concept: "음표는 소리의 길이, 쉼표는 쉬는 길이예요", body: "4분음표를 한 박으로 볼 때 2분음표는 두 박, 온음표는 네 박입니다. 같은 이름의 쉼표도 같은 길이만큼 쉽니다.", points: ["4분음표와 4분쉼표: 1박", "2분음표와 2분쉼표: 2박", "온음표와 온쉼표: 4박"], type: "choice", make: makeNoteValueQuestion },
        { id: 3, title: "박자표", short: "2/4 · 3/4 · 4/4", summary: "마디 안의 박 수와 기준 음표를 읽어요.", concept: "위 숫자는 한 마디의 박 수를 알려 줘요", body: "2/4, 3/4, 4/4박자의 아래 숫자 4는 4분음표가 한 박이라는 뜻이고, 위 숫자는 한 마디에 들어가는 박 수입니다.", points: ["2/4: 한 마디 두 박", "3/4: 한 마디 세 박", "4/4: 한 마디 네 박"], type: "choice", make: makeMeterQuestion },
        { id: 4, title: "8분음표", short: "한 박의 2분할", summary: "한 박을 둘로 나눈 리듬을 읽고 들어요.", concept: "8분음표 두 개가 4분음표 한 박과 같아요", body: "한 박을 정확히 반으로 나누면 두 개의 8분음표가 됩니다. ‘하나-앤’처럼 두 부분으로 세면 안정적으로 읽을 수 있습니다.", points: ["한 박에 두 칸", "박의 시작은 1·2·3·4", "중간 위치는 앤(&)"], type: "dictation", bank: "eighth", steps: 8, beats: 4, division: 2 },
        { id: 5, title: "점음표와 붙임줄", short: "늘어난 길이", summary: "음표의 길이를 더하고 이어요.", concept: "점은 원래 길이의 절반을 더해요", body: "점음표는 원래 음표 길이의 절반을 더합니다. 붙임줄은 같은 높이의 두 음 길이를 하나로 이어 줍니다.", points: ["점4분음표: 1박 + 1/2박", "점2분음표: 2박 + 1박", "붙임줄: 연결된 길이를 모두 더함"], type: "choice", make: makeDurationQuestion },
        { id: 6, title: "16분음표", short: "한 박의 4분할", summary: "한 박을 네 칸으로 나눈 리듬을 익혀요.", concept: "16분음표 네 개가 한 박이에요", body: "한 박을 네 부분으로 나누어 ‘1-e-&-a’로 셉니다. 먼저 박의 시작을 찾은 뒤 사이 음을 채우면 정확해집니다.", points: ["한 박에 네 칸", "네 칸의 간격은 모두 같음", "강박 위치는 1·5·9·13번째 칸"], type: "dictation", bank: "sixteenth", steps: 16, beats: 4, division: 4 },
        { id: 7, title: "당김음", short: "오프비트 · 악센트", summary: "여린 부분이 강조되는 리듬을 익혀요.", concept: "예상한 강박을 비켜날 때 당김음이 생겨요", body: "박과 박 사이의 음이 강조되거나 약한 위치의 음이 다음 강박까지 이어지면 당김음의 느낌이 생깁니다.", points: ["앤(&) 위치의 오프비트", "약한 위치에서 시작하는 악센트", "붙임줄로 강박을 넘어가기"], type: "dictation", bank: "syncopation", steps: 8, beats: 4, division: 2 },
        { id: 8, title: "셋잇단음표와 복합박자", short: "3분할 · 6/8", summary: "한 박을 셋으로 나누는 흐름을 익혀요.", concept: "복합박자는 큰 박 하나가 셋으로 나뉘어요", body: "6/8박자는 8분음표 여섯 개를 보통 ‘하나-둘-셋, 넷-다섯-여섯’ 두 묶음으로 느낍니다.", points: ["셋잇단음표: 한 박을 셋으로", "6/8박자: 3개씩 두 묶음", "첫째와 넷째 칸에 큰 박"], type: "dictation", bank: "compound", steps: 6, beats: 2, division: 3, compound: true },
        { id: 9, title: "리듬 읽기와 받아쓰기", short: "종합 적용", summary: "배운 리듬을 듣고 한 마디로 옮겨요.", concept: "박을 먼저 잡고 작은 단위로 나눠 들어요", body: "받아쓰기에서는 먼저 큰 박을 세고, 각 박 안이 둘 또는 넷으로 어떻게 나뉘는지 확인합니다.", points: ["첫 번째 듣기: 큰 박 확인", "두 번째 듣기: 음이 시작하는 위치 표시", "마지막 듣기: 빠진 음과 불필요한 음 점검"], type: "dictation", bank: "mixed", steps: 16, beats: 4, division: 4 }
    ];

    const state = {
        stageId: 1,
        round: 1,
        correct: 0,
        answered: false,
        showingResult: false,
        question: null,
        selectedSteps: new Set(),
        tapTimes: [],
        playbackToken: 0,
        progress: loadProgress()
    };

    function $(id) { return document.getElementById(id); }
    function pick(items) { return items[Math.floor(Math.random() * items.length)]; }
    function shuffle(items) { return items.slice().sort(function () { return Math.random() - .5; }); }
    function currentStage() { return stages.find(function (stage) { return stage.id === state.stageId; }); }
    function loadProgress() {
        try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null") || { completed: [], scores: {} }; }
        catch (error) { return { completed: [], scores: {} }; }
    }
    function saveProgress() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state.progress)); } catch (error) { /* optional */ } }

    function makeNoteValueQuestion() {
        const questions = [
            { prompt: "♩ 4분음표는 몇 박일까요?", answer: "1박" },
            { prompt: "𝅗𝅥 2분음표는 몇 박일까요?", answer: "2박" },
            { prompt: "𝅝 온음표는 몇 박일까요?", answer: "4박" },
            { prompt: "4분쉼표는 몇 박 동안 쉴까요?", answer: "1박" },
            { prompt: "2분쉼표는 몇 박 동안 쉴까요?", answer: "2박" }
        ];
        const target = pick(questions);
        return { prompt: target.prompt, answer: target.answer, choices: shuffle(["1박","2박","3박","4박"]), explain: "정답은 " + target.answer + "입니다." };
    }
    function makeMeterQuestion() {
        const meters = [{ meter: "2/4", beats: "2박" }, { meter: "3/4", beats: "3박" }, { meter: "4/4", beats: "4박" }];
        const target = pick(meters);
        return { prompt: target.meter + "박자는 한 마디에 몇 박이 들어갈까요?", answer: target.beats, choices: ["2박","3박","4박"], explain: "박자표의 위 숫자가 " + target.beats.replace("박", "") + "이므로 한 마디는 " + target.beats + "입니다." };
    }
    function makeDurationQuestion() {
        const questions = [
            { prompt: "점4분음표의 길이는 얼마일까요?", answer: "1과 1/2박" },
            { prompt: "점2분음표의 길이는 얼마일까요?", answer: "3박" },
            { prompt: "4분음표 두 개를 붙임줄로 이으면?", answer: "2박" },
            { prompt: "8분음표 두 개를 붙임줄로 이으면?", answer: "1박" }
        ];
        const target = pick(questions);
        const pool = ["1박","1과 1/2박","2박","3박","4박"];
        return { prompt: target.prompt, answer: target.answer, choices: shuffle([target.answer].concat(shuffle(pool.filter(function (item) { return item !== target.answer; })).slice(0,3))), explain: "길이를 모두 더하면 " + target.answer + "입니다." };
    }

    function cacheElements() {
        ["stageList","stageKicker","stageTitle","stageSummary","stageStatus","conceptTitle","conceptBody","lessonPoints","activityTitle","roundCounter","activityArea","feedback","nextButton","resetProgress","toast"].forEach(function (id) { elements[id] = $(id); });
    }

    function renderStages() {
        elements.stageList.innerHTML = "";
        stages.forEach(function (stage) {
            const complete = state.progress.completed.includes(stage.id);
            const button = document.createElement("button");
            button.type = "button";
            button.className = "stage-button" + (stage.id === state.stageId ? " active" : "");
            button.setAttribute("aria-current", stage.id === state.stageId ? "step" : "false");
            button.innerHTML = '<span class="stage-number">' + stage.id + '</span><span class="stage-copy"><strong>' + stage.title + '</strong><small>' + stage.short + '</small></span><span class="stage-check" aria-label="' + (complete ? "완료" : "학습 전") + '">' + (complete ? "✓" : "") + '</span>';
            button.addEventListener("click", function () { selectStage(stage.id); });
            elements.stageList.appendChild(button);
        });
    }

    function renderStage() {
        const stage = currentStage();
        const complete = state.progress.completed.includes(stage.id);
        elements.stageKicker.textContent = stage.id + "단계";
        elements.stageTitle.textContent = stage.title;
        elements.stageSummary.textContent = stage.summary;
        elements.conceptTitle.textContent = stage.concept;
        elements.conceptBody.textContent = stage.body;
        elements.lessonPoints.innerHTML = stage.points.map(function (point) { return "<li>" + point + "</li>"; }).join("");
        elements.stageStatus.textContent = complete ? "완료" : "학습 전";
        elements.stageStatus.classList.toggle("complete", complete);
        renderActivity();
    }

    function selectStage(id) {
        state.stageId = id;
        resetPractice();
        renderStages();
        renderStage();
        if (window.innerWidth <= 900) document.querySelector(".lesson").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function resetPractice() {
        state.round = 1;
        state.correct = 0;
        state.answered = false;
        state.showingResult = false;
        state.selectedSteps = new Set();
        state.tapTimes = [];
        state.playbackToken += 1;
    }

    function renderActivity() {
        const stage = currentStage();
        state.answered = false;
        state.showingResult = false;
        elements.roundCounter.textContent = state.round + " / 5";
        elements.feedback.textContent = "";
        elements.feedback.className = "feedback";
        elements.nextButton.hidden = true;
        elements.activityArea.innerHTML = "";
        if (stage.type === "choice") renderChoiceActivity(stage);
        else if (stage.type === "pulse") renderPulseActivity();
        else renderDictationActivity(stage);
    }

    function renderChoiceActivity(stage) {
        state.question = stage.make();
        elements.activityTitle.textContent = "길이와 박자를 확인해요";
        const prompt = document.createElement("p");
        prompt.className = "question-prompt";
        prompt.textContent = state.question.prompt;
        const choices = document.createElement("div");
        choices.className = "answer-choices";
        state.question.choices.forEach(function (choice) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer-choice";
            button.textContent = choice;
            button.addEventListener("click", function () {
                if (state.answered) return;
                const correct = choice === state.question.answer;
                choices.querySelectorAll("button").forEach(function (item) {
                    item.disabled = true;
                    if (item.textContent === state.question.answer) item.classList.add("correct");
                });
                if (!correct) button.classList.add("wrong");
                completeRound(correct, (correct ? "정답! " : "다시 확인해요. ") + state.question.explain);
            });
            choices.appendChild(button);
        });
        elements.activityArea.append(prompt, choices);
    }

    function renderPulseActivity() {
        const tempo = pick([72,84,96]);
        state.question = { tempo: tempo };
        state.tapTimes = [];
        elements.activityTitle.textContent = "박을 듣고 네 번 탭해요";
        const prompt = document.createElement("p");
        prompt.className = "question-prompt";
        prompt.textContent = tempo + " BPM의 네 박에 맞춰 아래 패드를 네 번 누르세요.";
        const dots = document.createElement("div");
        dots.className = "pulse-dots";
        dots.innerHTML = "<i>1</i><i>2</i><i>3</i><i>4</i>";
        const controls = document.createElement("div");
        controls.className = "action-row";
        const startButton = document.createElement("button");
        startButton.type = "button";
        startButton.className = "action-button";
        startButton.textContent = "네 박 시작";
        const tapButton = document.createElement("button");
        tapButton.type = "button";
        tapButton.className = "tap-pad";
        tapButton.textContent = "여기를 네 번 탭";
        tapButton.disabled = true;
        startButton.addEventListener("click", function () {
            if (state.answered) return;
            state.tapTimes = [];
            tapButton.disabled = false;
            tapButton.textContent = "0 / 4";
            startButton.disabled = true;
            const seconds = 60 / tempo;
            const token = ++state.playbackToken;
            const context = audio.ensure();
            if (!context) { showToast("이 브라우저에서는 소리를 재생할 수 없어요."); return; }
            for (let index = 0; index < 4; index += 1) audio.click(context.currentTime + .18 + index * seconds, index === 0);
            dots.querySelectorAll("i").forEach(function (dot, index) {
                window.setTimeout(function () {
                    if (token !== state.playbackToken) return;
                    dots.querySelectorAll("i").forEach(function (item) { item.classList.remove("active"); });
                    dot.classList.add("active");
                }, 180 + index * seconds * 1000);
            });
            window.setTimeout(function () { if (!state.answered) startButton.disabled = false; }, 250 + 4 * seconds * 1000);
        });
        tapButton.addEventListener("pointerdown", function (event) {
            event.preventDefault();
            if (tapButton.disabled || state.answered) return;
            state.tapTimes.push(performance.now());
            audio.hit(undefined, state.tapTimes.length === 1);
            tapButton.textContent = state.tapTimes.length + " / 4";
            if (state.tapTimes.length === 4) {
                tapButton.disabled = true;
                startButton.disabled = true;
                const intervals = state.tapTimes.slice(1).map(function (time, index) { return time - state.tapTimes[index]; });
                const target = 60000 / tempo;
                const averageError = intervals.reduce(function (sum, value) { return sum + Math.abs(value - target); }, 0) / intervals.length;
                const correct = averageError <= target * .22;
                completeRound(correct, correct ? "박 사이의 간격을 일정하게 유지했어요." : "박 사이 간격이 조금 흔들렸어요. 소리를 세면서 다시 해보세요.");
            }
        });
        controls.appendChild(startButton);
        elements.activityArea.append(prompt, dots, controls, tapButton);
    }

    function renderDictationActivity(stage) {
        state.selectedSteps = new Set();
        const hits = pick(patternBanks[stage.bank]).slice();
        const tempo = stage.compound ? 72 : 84;
        state.question = { hits: hits, tempo: tempo, steps: stage.steps, beats: stage.beats, division: stage.division, compound: !!stage.compound };
        elements.activityTitle.textContent = stage.id === 9 ? "한 마디 리듬 받아쓰기" : "들은 리듬의 칸을 찾아요";

        const tempoRow = document.createElement("label");
        tempoRow.className = "tempo-row";
        tempoRow.innerHTML = '<span>빠르기</span><input type="range" min="60" max="112" value="' + tempo + '" step="4"><output>' + tempo + ' BPM</output>';
        const slider = tempoRow.querySelector("input");
        const output = tempoRow.querySelector("output");
        slider.addEventListener("input", function () { state.question.tempo = Number(slider.value); output.textContent = slider.value + " BPM"; });

        const actions = document.createElement("div");
        actions.className = "action-row";
        const listen = document.createElement("button");
        listen.type = "button";
        listen.className = "action-button";
        listen.textContent = "▶ 리듬 듣기";
        const clear = document.createElement("button");
        clear.type = "button";
        clear.className = "action-button secondary";
        clear.textContent = "모두 지우기";
        actions.append(listen, clear);

        const grid = document.createElement("div");
        grid.className = "rhythm-grid";
        grid.style.gridTemplateColumns = "repeat(" + stage.steps + ", minmax(44px, 1fr))";
        grid.style.overflowX = "auto";
        grid.style.padding = "4px 3px 9px";
        for (let index = 0; index < stage.steps; index += 1) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "rhythm-step";
            button.textContent = index + 1;
            button.setAttribute("aria-label", (index + 1) + "번째 칸");
            if (index % stage.division === 0) button.style.borderLeft = "3px solid var(--accent)";
            button.addEventListener("click", function () {
                if (state.answered) return;
                if (state.selectedSteps.has(index)) state.selectedSteps.delete(index); else state.selectedSteps.add(index);
                button.classList.toggle("selected", state.selectedSteps.has(index));
                audio.hit(undefined, index % stage.division === 0);
            });
            grid.appendChild(button);
        }

        const check = document.createElement("button");
        check.type = "button";
        check.className = "action-button";
        check.textContent = "정답 확인";
        check.style.width = "100%";
        listen.addEventListener("click", function () { playDictation(grid); });
        clear.addEventListener("click", function () {
            if (state.answered) return;
            state.selectedSteps.clear();
            grid.querySelectorAll("button").forEach(function (button) { button.classList.remove("selected"); });
        });
        check.addEventListener("click", function () { checkDictation(grid, check); });
        elements.activityArea.append(tempoRow, actions, grid, check);
    }

    function playDictation(grid) {
        const question = state.question;
        const token = ++state.playbackToken;
        audio.playPattern(question);
        const beatMs = 60000 / question.tempo;
        const stepMs = beatMs / question.division;
        const countMs = question.beats * beatMs;
        grid.querySelectorAll("button").forEach(function (button, index) {
            window.setTimeout(function () {
                if (token !== state.playbackToken) return;
                grid.querySelectorAll("button").forEach(function (item) { item.classList.remove("current"); });
                button.classList.add("current");
            }, 80 + countMs + index * stepMs);
        });
        window.setTimeout(function () {
            if (token !== state.playbackToken) return;
            grid.querySelectorAll("button").forEach(function (item) { item.classList.remove("current"); });
        }, 100 + countMs + question.steps * stepMs);
    }

    function checkDictation(grid, checkButton) {
        if (state.answered) return;
        const target = new Set(state.question.hits);
        const correct = target.size === state.selectedSteps.size && Array.from(target).every(function (step) { return state.selectedSteps.has(step); });
        grid.querySelectorAll("button").forEach(function (button, index) {
            button.disabled = true;
            if (target.has(index)) button.classList.add("correct");
            if (state.selectedSteps.has(index) && !target.has(index)) button.classList.add("missed");
        });
        checkButton.disabled = true;
        completeRound(correct, correct ? "정확해요. 모든 시작 위치를 찾았습니다." : "초록 칸이 실제로 소리가 시작된 위치예요.");
    }

    function completeRound(correct, message) {
        state.answered = true;
        if (correct) state.correct += 1;
        elements.feedback.textContent = message;
        elements.feedback.className = "feedback " + (correct ? "correct" : "wrong");
        elements.nextButton.hidden = false;
        elements.nextButton.textContent = state.round === 5 ? "결과 보기" : "다음 문제";
    }

    function nextActivity() {
        if (state.showingResult) {
            resetPractice();
            renderActivity();
            return;
        }
        if (!state.answered) return;
        if (state.round < 5) {
            state.round += 1;
            renderActivity();
            return;
        }
        showResult();
    }

    function showResult() {
        const passed = state.correct >= 4;
        state.showingResult = true;
        state.progress.scores[state.stageId] = Math.max(state.progress.scores[state.stageId] || 0, state.correct);
        if (passed && !state.progress.completed.includes(state.stageId)) state.progress.completed.push(state.stageId);
        saveProgress();
        renderStages();
        elements.stageStatus.textContent = passed ? "완료" : "다시 연습";
        elements.stageStatus.classList.toggle("complete", passed);
        elements.activityTitle.textContent = "연습 결과";
        elements.activityArea.innerHTML = '<p class="question-prompt">5문제 중 ' + state.correct + '문제를 맞혔어요.</p>';
        elements.feedback.textContent = passed ? "이 단계를 완료했습니다. 다른 단계도 자유롭게 선택할 수 있어요." : "4문제 이상 맞히면 완료로 표시됩니다. 진도는 잠기지 않아요.";
        elements.feedback.className = "feedback " + (passed ? "correct" : "wrong");
        elements.nextButton.hidden = false;
        elements.nextButton.textContent = "다시 연습";
    }

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add("show");
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () { elements.toast.classList.remove("show"); }, 2200);
    }

    function bindEvents() {
        elements.nextButton.addEventListener("click", nextActivity);
        elements.resetProgress.addEventListener("click", function () {
            if (!window.confirm("리듬 단계 완료 기록을 모두 지울까요?")) return;
            state.progress = { completed: [], scores: {} };
            saveProgress();
            resetPractice();
            renderStages();
            renderStage();
            showToast("리듬 기록을 초기화했습니다.");
        });
    }

    function createRhythmAudio() {
        const audioState = { context: null, master: null };
        function ensure() {
            if (!audioState.context) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) return null;
                const context = new AudioContextClass({ latencyHint: "interactive" });
                const compressor = context.createDynamicsCompressor();
                const master = context.createGain();
                compressor.threshold.value = -14;
                compressor.ratio.value = 5;
                compressor.attack.value = .003;
                compressor.release.value = .12;
                master.gain.value = .9;
                compressor.connect(master).connect(context.destination);
                audioState.context = context;
                audioState.master = compressor;
            }
            if (audioState.context.state === "suspended") audioState.context.resume();
            return audioState.context;
        }
        function click(when, accent) {
            const context = ensure();
            if (!context) return;
            const start = Math.max(context.currentTime, when || context.currentTime);
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = "sine";
            oscillator.frequency.value = accent ? 1550 : 1050;
            gain.gain.setValueAtTime(accent ? .16 : .09, start);
            gain.gain.exponentialRampToValueAtTime(.0001, start + .065);
            oscillator.connect(gain).connect(audioState.master);
            oscillator.start(start);
            oscillator.stop(start + .07);
        }
        function hit(when, accent) {
            const context = ensure();
            if (!context) return;
            const start = Math.max(context.currentTime, when || context.currentTime);
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(accent ? 210 : 280, start);
            oscillator.frequency.exponentialRampToValueAtTime(accent ? 70 : 110, start + .1);
            gain.gain.setValueAtTime(accent ? .24 : .16, start);
            gain.gain.exponentialRampToValueAtTime(.0001, start + .14);
            oscillator.connect(gain).connect(audioState.master);
            oscillator.start(start);
            oscillator.stop(start + .15);
        }
        function playPattern(question) {
            const context = ensure();
            if (!context) return;
            const beat = 60 / question.tempo;
            const step = beat / question.division;
            const start = context.currentTime + .08;
            for (let index = 0; index < question.beats; index += 1) click(start + index * beat, index === 0);
            const patternStart = start + question.beats * beat;
            question.hits.forEach(function (index) { hit(patternStart + index * step, index % question.division === 0); });
        }
        return { ensure: ensure, click: click, hit: hit, playPattern: playPattern };
    }

    function init() {
        cacheElements();
        renderStages();
        renderStage();
        bindEvents();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
