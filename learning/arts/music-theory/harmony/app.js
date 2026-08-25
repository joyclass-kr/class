(function () {
    "use strict";

    const piano = window.HarmonyPiano;
    const STORE_KEY = "musicTheoryHarmonyProgressV1";
    const NATURAL_NAMES = ["도(C)", "레(D)", "미(E)", "파(F)", "솔(G)", "라(A)", "시(B)"];
    const PITCH_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
    const INTERVALS = [
        { semitones: 1, label: "단2도" }, { semitones: 2, label: "장2도" },
        { semitones: 3, label: "단3도" }, { semitones: 4, label: "장3도" },
        { semitones: 5, label: "완전4도" }, { semitones: 7, label: "완전5도" },
        { semitones: 12, label: "완전8도" }
    ];
    const SCALES = {
        C: { label: "다장조", root: 60, names: ["C", "D", "E", "F", "G", "A", "B"] },
        G: { label: "사장조", root: 55, names: ["G", "A", "B", "C", "D", "E", "F♯"] },
        D: { label: "라장조", root: 50, names: ["D", "E", "F♯", "G", "A", "B", "C♯"] },
        F: { label: "바장조", root: 53, names: ["F", "G", "A", "B♭", "C", "D", "E"] }
    };
    const SCALE_OFFSETS = [0, 2, 4, 5, 7, 9, 11];
    const ROMANS = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
    const TRIAD_QUALITIES = ["장3화음", "단3화음", "감3화음", "장3화음", "장3화음", "단3화음", "감3화음"];
    const FUNCTION_BY_DEGREE = ["토닉", "서브도미넌트", "토닉", "서브도미넌트", "도미넌트", "토닉", "도미넌트"];

    const stages = [
        { id: 1, title: "음과 건반", short: "음이름 · 옥타브", summary: "일곱 음이름과 피아노 건반의 위치를 익혀요.", concept: "음이름은 건반에서 반복돼요", body: "도·레·미·파·솔·라·시는 C·D·E·F·G·A·B와 연결됩니다. 같은 이름의 음은 옥타브마다 다시 나타납니다.", points: ["검은건반 두 개 왼쪽의 흰건반이 도(C)", "일곱 음이름 뒤에는 다시 도가 시작", "옥타브가 달라도 음이름의 역할은 같음"], make: makeNoteQuestion },
        { id: 2, title: "반음과 온음", short: "샵 · 플랫", summary: "건반 사이의 가장 작은 거리를 배워요.", concept: "가장 가까운 건반 사이는 반음이에요", body: "흰건반과 검은건반을 가리지 않고 바로 옆 건반까지가 반음입니다. 반음 두 칸을 합치면 온음입니다.", points: ["바로 옆 건반: 반음", "반음 두 개: 온음", "샵은 반음 올리고 플랫은 반음 내림"], make: makeToneDistanceQuestion },
        { id: 3, title: "음정", short: "2도 · 3도 · 5도", summary: "두 음 사이의 거리를 이름 붙여요.", concept: "음정은 음이름의 수와 반음 수로 정해져요", body: "먼저 음이름을 세어 도수를 구하고, 반음 수를 확인해 장·단·완전 음정을 구별합니다.", points: ["음이름은 처음과 끝을 모두 셈", "1·4·5·8도는 완전 계열", "2·3·6·7도는 장·단 계열"], make: makeIntervalQuestion },
        { id: 4, title: "장음계와 조표", short: "장음계 · 오도권", summary: "장음계의 배열과 주요 조표를 익혀요.", concept: "장음계는 온·온·반·온·온·온·반", body: "어떤 음에서 시작해도 같은 간격을 지키면 장음계가 됩니다. 조표는 이 간격을 유지하도록 샵이나 플랫을 미리 표시합니다.", points: ["3–4음과 7–8음 사이는 반음", "샵 조표는 파부터 5도씩 늘어남", "플랫 조표는 시부터 4도씩 늘어남"], make: makeMajorScaleQuestion },
        { id: 5, title: "단음계", short: "자연 · 화성 · 가락", summary: "세 가지 단음계의 차이를 비교해요.", concept: "단음계는 6음과 7음이 달라져요", body: "자연단음계에서 7음을 올리면 화성단음계, 올라갈 때 6음과 7음을 모두 올리면 가락단음계가 됩니다.", points: ["자연단음계: 원래 형태", "화성단음계: 7음을 반음 올림", "가락단음계: 상행에서 6·7음을 올림"], make: makeMinorScaleQuestion },
        { id: 6, title: "3화음", short: "장 · 단 · 감 · 증", summary: "3도씩 쌓은 네 종류의 화음을 배워요.", concept: "가운데 음과 위 음의 거리가 화음의 성질을 만들어요", body: "근음 위에 3도씩 두 음을 더 쌓아 3화음을 만듭니다. 장3도와 단3도의 순서에 따라 네 종류로 나뉩니다.", points: ["장3화음: 장3도 + 단3도", "단3화음: 단3도 + 장3도", "감·증3화음도 거리로 판별"], make: makeChordQualityQuestion },
        { id: 7, title: "코드의 전위", short: "기본위치 · 전위", summary: "가장 낮은 음에 따라 달라지는 전위형을 익혀요.", concept: "같은 구성음도 베이스음이 바뀌면 전위형이 달라져요", body: "근음이 가장 아래면 기본위치, 3음이 아래면 제1전위, 5음이 아래면 제2전위입니다.", points: ["기본위치: 근음이 베이스", "제1전위: 3음이 베이스", "제2전위: 5음이 베이스"], make: makeInversionQuestion },
        { id: 8, title: "다이어토닉 코드", short: "로마숫자", summary: "한 조 안의 일곱 화음을 차례로 만들어요.", concept: "음계의 각 음 위에 3도씩 쌓아요", body: "장음계의 일곱 음을 각각 근음으로 삼아 음계 안의 음만 쌓으면 다이어토닉 코드가 됩니다.", points: ["장조의 순서: 장·단·단·장·장·단·감", "대문자는 장화음, 소문자는 단화음", "감화음에는 ° 표시"], make: makeDiatonicQuestion },
        { id: 9, title: "화음의 기능과 종지", short: "T · SD · D", summary: "화음이 만드는 안정과 긴장의 흐름을 배워요.", concept: "화음은 안정·출발·긴장의 역할을 나눠 가져요", body: "토닉은 중심과 안정, 서브도미넌트는 진행의 출발, 도미넌트는 토닉으로 해결되려는 긴장을 만듭니다.", points: ["토닉: I·iii·vi", "서브도미넌트: ii·IV", "도미넌트: V·vii°"], make: makeFunctionQuestion },
        { id: 10, title: "7화음과 코드 진행", short: "7화음 · 진행", summary: "주요 7화음과 기본 진행을 연결해 들어요.", concept: "화음은 기능의 순서로 문장을 만들어요", body: "3화음 위에 3도를 하나 더 쌓으면 7화음이 됩니다. 여러 화음의 기능이 이어지면 익숙한 코드 진행이 만들어집니다.", points: ["V7은 I로 강하게 해결", "I–IV–V–I는 기본 기능 진행", "ii–V–I는 준비·긴장·해결"], make: makeProgressionQuestion }
    ];

    const elements = {};
    const state = { stageId: 1, round: 1, correct: 0, answered: false, showingResult: false, question: null, progress: loadProgress() };

    function $(id) { return document.getElementById(id); }
    function shuffle(items) { return items.slice().sort(function () { return Math.random() - .5; }); }
    function pick(items) { return items[Math.floor(Math.random() * items.length)]; }
    function pitchName(midi) { return PITCH_NAMES[((midi % 12) + 12) % 12]; }
    function midiFromName(rootMidi, scaleIndex) { return rootMidi + SCALE_OFFSETS[scaleIndex]; }
    function choicesAround(correct, pool, size) { return shuffle([correct].concat(shuffle(pool.filter(function (item) { return item !== correct; })).slice(0, size - 1))); }

    function loadProgress() {
        try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null") || { completed: [], scores: {} }; }
        catch (error) { return { completed: [], scores: {} }; }
    }
    function saveProgress() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state.progress)); } catch (error) { /* optional */ } }

    function makeNoteQuestion() {
        const scaleIndex = Math.floor(Math.random() * 7);
        const midi = 60 + SCALE_OFFSETS[scaleIndex];
        return { prompt: "한 음을 듣고 음이름을 고르세요.", answer: NATURAL_NAMES[scaleIndex], choices: choicesAround(NATURAL_NAMES[scaleIndex], NATURAL_NAMES, 4), groups: [[midi]], explain: "이 음은 " + NATURAL_NAMES[scaleIndex] + "입니다." };
    }
    function makeToneDistanceQuestion() {
        const distance = Math.random() < .5 ? 1 : 2;
        const root = 60 + Math.floor(Math.random() * 8);
        const answer = distance === 1 ? "반음" : "온음";
        return { prompt: pitchName(root) + "와 " + pitchName(root + distance) + " 사이는 얼마일까요?", answer: answer, choices: ["반음", "온음"], groups: [[root], [root + distance]], beat: .55, explain: "건반 " + distance + "칸 거리이므로 " + answer + "입니다." };
    }
    function makeIntervalQuestion() {
        const interval = pick(INTERVALS);
        const root = 52 + Math.floor(Math.random() * 9);
        return { prompt: "두 음을 차례로 듣고 음정을 고르세요.", answer: interval.label, choices: choicesAround(interval.label, INTERVALS.map(function (item) { return item.label; }), 4), groups: [[root], [root + interval.semitones]], beat: .7, explain: interval.semitones + "반음 거리인 " + interval.label + "입니다." };
    }
    function makeMajorScaleQuestion() {
        const scale = pick(Object.values(SCALES));
        const degree = 1 + Math.floor(Math.random() * 6);
        const answer = scale.names[degree];
        return { prompt: scale.label + "의 " + (degree + 1) + "번째 음은 무엇일까요?", answer: answer, choices: choicesAround(answer, PITCH_NAMES, 4), groups: scale.names.concat(scale.names[0]).map(function (_, index) { return [scale.root + (index === 7 ? 12 : SCALE_OFFSETS[index])]; }), beat: .28, explain: scale.label + "의 " + (degree + 1) + "번째 음은 " + answer + "입니다." };
    }
    function makeMinorScaleQuestion() {
        const variants = [
            { name: "자연단음계", degree: "7번째", answer: "G", offsets: [0,2,3,5,7,8,10,12] },
            { name: "화성단음계", degree: "7번째", answer: "G♯", offsets: [0,2,3,5,7,8,11,12] },
            { name: "가락단음계(상행)", degree: "6번째", answer: "F♯", offsets: [0,2,3,5,7,9,11,12] }
        ];
        const variant = pick(variants);
        return { prompt: "가단조 " + variant.name + "의 " + variant.degree + " 음은?", answer: variant.answer, choices: choicesAround(variant.answer, ["F", "F♯", "G", "G♯"], 4), groups: variant.offsets.map(function (offset) { return [57 + offset]; }), beat: .28, explain: variant.name + "에서는 답이 " + variant.answer + "입니다." };
    }
    function makeChordQualityQuestion() {
        const types = [
            { label: "장3화음", offsets: [0,4,7] }, { label: "단3화음", offsets: [0,3,7] },
            { label: "감3화음", offsets: [0,3,6] }, { label: "증3화음", offsets: [0,4,8] }
        ];
        const type = pick(types);
        const root = 48 + Math.floor(Math.random() * 12);
        return { prompt: "화음을 듣고 3화음의 종류를 고르세요.", answer: type.label, choices: types.map(function (item) { return item.label; }), groups: [type.offsets.map(function (offset) { return root + offset; })], explain: type.label + "의 구성 간격이 들렸습니다." };
    }
    function makeInversionQuestion() {
        const options = [
            { label: "기본위치", notes: [48,52,55], bass: "근음 C" },
            { label: "제1전위", notes: [52,55,60], bass: "3음 E" },
            { label: "제2전위", notes: [55,60,64], bass: "5음 G" }
        ];
        const target = pick(options);
        return { prompt: "C 장3화음의 전위형을 듣고 고르세요.", answer: target.label, choices: options.map(function (item) { return item.label; }), groups: [target.notes], explain: "가장 낮은 음이 " + target.bass + "이므로 " + target.label + "입니다." };
    }
    function triadForScale(scale, degree) {
        const degreeOffsets = [degree, (degree + 2) % 7, (degree + 4) % 7];
        return degreeOffsets.map(function (index, noteIndex) {
            let midi = scale.root + SCALE_OFFSETS[index];
            if (noteIndex > 0 && index < degree) midi += 12;
            return midi;
        });
    }
    function chordLabel(scale, degree) { return scale.names[degree] + " " + TRIAD_QUALITIES[degree].replace("3화음", ""); }
    function makeDiatonicQuestion() {
        const scale = pick(Object.values(SCALES));
        const degree = Math.floor(Math.random() * 7);
        const answer = chordLabel(scale, degree);
        const pool = [0,1,2,3,4,5,6].map(function (index) { return chordLabel(scale, index); });
        return { prompt: scale.label + "의 " + ROMANS[degree] + " 화음은 무엇일까요?", answer: answer, choices: choicesAround(answer, pool, 4), groups: [triadForScale(scale, degree)], explain: ROMANS[degree] + "은 " + answer + "화음입니다." };
    }
    function makeFunctionQuestion() {
        const scale = SCALES.C;
        const degree = Math.floor(Math.random() * 7);
        const answer = FUNCTION_BY_DEGREE[degree];
        return { prompt: "다장조의 " + ROMANS[degree] + " 화음은 어떤 기능일까요?", answer: answer, choices: ["토닉", "서브도미넌트", "도미넌트"], groups: [triadForScale(scale, degree)], explain: ROMANS[degree] + "은 " + answer + " 기능입니다." };
    }
    function makeProgressionQuestion() {
        const scale = SCALES.C;
        const progressions = [
            { label: "I–IV–V–I", degrees: [0,3,4,0] },
            { label: "I–V–vi–IV", degrees: [0,4,5,3] },
            { label: "ii–V–I", degrees: [1,4,0] },
            { label: "I–vi–ii–V", degrees: [0,5,1,4] }
        ];
        const target = pick(progressions);
        return { prompt: "코드 진행을 듣고 로마숫자 순서를 고르세요.", answer: target.label, choices: progressions.map(function (item) { return item.label; }), groups: target.degrees.map(function (degree) { return triadForScale(scale, degree); }), beat: .72, explain: "들린 진행은 " + target.label + "입니다." };
    }

    function cacheElements() {
        ["stageList","stageKicker","stageTitle","stageSummary","stageStatus","conceptTitle","conceptBody","lessonPoints","questionTitle","roundCounter","questionPrompt","listenButton","answerChoices","feedback","nextButton","piano","pianoReadout","resetProgress","toast"].forEach(function (id) { elements[id] = $(id); });
    }
    function currentStage() { return stages.find(function (stage) { return stage.id === state.stageId; }); }

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
        renderQuestion();
    }

    function selectStage(id) {
        state.stageId = id;
        state.round = 1;
        state.correct = 0;
        state.answered = false;
        state.showingResult = false;
        renderStages();
        renderStage();
        if (window.innerWidth <= 900) document.querySelector(".lesson").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderQuestion() {
        state.question = currentStage().make();
        state.answered = false;
        state.showingResult = false;
        elements.listenButton.hidden = false;
        elements.questionTitle.textContent = state.stageId === 10 ? "흐름을 듣고 구별하세요" : "개념을 소리와 연결하세요";
        elements.roundCounter.textContent = state.round + " / 5";
        elements.questionPrompt.textContent = state.question.prompt;
        elements.feedback.textContent = "답을 골라 보세요.";
        elements.feedback.className = "feedback";
        elements.nextButton.hidden = true;
        elements.answerChoices.innerHTML = "";
        state.question.choices.forEach(function (choice) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer-choice";
            button.textContent = choice;
            button.addEventListener("click", function () { answerQuestion(choice, button); });
            elements.answerChoices.appendChild(button);
        });
    }

    function playQuestion() {
        elements.listenButton.disabled = true;
        const question = state.question;
        const playback = question.groups.length === 1
            ? piano.playNotes(question.groups[0], { duration: 1 })
            : piano.playSequence(question.groups, question.beat || .65);
        playback.catch(function () { showToast("소리를 재생할 수 없어요."); }).finally(function () { window.setTimeout(function () { elements.listenButton.disabled = false; }, 250); });
    }

    function answerQuestion(choice, button) {
        if (state.answered) return;
        state.answered = true;
        const correct = choice === state.question.answer;
        if (correct) state.correct += 1;
        elements.answerChoices.querySelectorAll("button").forEach(function (item) {
            item.disabled = true;
            if (item.textContent === state.question.answer) item.classList.add("correct");
        });
        if (!correct) button.classList.add("wrong");
        elements.feedback.textContent = (correct ? "정답! " : "다시 확인해요. ") + state.question.explain;
        elements.feedback.className = "feedback " + (correct ? "correct" : "wrong");
        elements.nextButton.hidden = false;
        elements.nextButton.textContent = state.round === 5 ? "결과 보기" : "다음 문제";
    }

    function nextQuestion() {
        if (!state.answered) return;
        if (state.showingResult) {
            state.round = 1;
            state.correct = 0;
            state.showingResult = false;
            renderQuestion();
            return;
        }
        if (state.round < 5) {
            state.round += 1;
            renderQuestion();
            return;
        }
        const passed = state.correct >= 4;
        state.progress.scores[state.stageId] = Math.max(state.progress.scores[state.stageId] || 0, state.correct);
        state.showingResult = true;
        if (passed && !state.progress.completed.includes(state.stageId)) state.progress.completed.push(state.stageId);
        saveProgress();
        renderStages();
        elements.stageStatus.textContent = passed ? "완료" : "다시 연습";
        elements.stageStatus.classList.toggle("complete", passed);
        elements.questionPrompt.textContent = "5문제 중 " + state.correct + "문제를 맞혔어요.";
        elements.answerChoices.innerHTML = "";
        elements.listenButton.hidden = true;
        elements.feedback.textContent = passed ? "이 단계를 완료했습니다. 다른 단계도 자유롭게 선택할 수 있어요." : "4문제 이상 맞히면 완료로 표시됩니다. 진도는 잠기지 않아요.";
        elements.feedback.className = "feedback " + (passed ? "correct" : "wrong");
        elements.nextButton.textContent = "다시 연습";
    }

    function renderPiano() {
        const blackPitchClasses = [1,3,6,8,10];
        const totalWhites = 15;
        let whitesSeen = 0;
        for (let midi = 48; midi <= 72; midi += 1) {
            const pitchClass = midi % 12;
            const key = document.createElement("button");
            key.type = "button";
            key.className = "piano-key " + (blackPitchClasses.includes(pitchClass) ? "black" : "white");
            key.dataset.midi = midi;
            key.setAttribute("aria-label", pitchName(midi) + " 음 듣기");
            if (!blackPitchClasses.includes(pitchClass)) {
                if ([0,2,4,5,7,9,11].includes(pitchClass)) key.innerHTML = "<span>" + pitchName(midi) + "</span>";
                whitesSeen += 1;
            } else {
                key.style.left = (whitesSeen / totalWhites * 100) + "%";
            }
            key.addEventListener("pointerdown", function (event) {
                event.preventDefault();
                piano.playMidi(midi, { duration: .8 }).catch(function () { showToast("소리를 재생할 수 없어요."); });
                elements.pianoReadout.textContent = pitchName(midi) + " 음을 연주했어요.";
                key.classList.add("active");
                window.setTimeout(function () { key.classList.remove("active"); }, 420);
            });
            elements.piano.appendChild(key);
        }
    }

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add("show");
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () { elements.toast.classList.remove("show"); }, 2200);
    }

    function bindEvents() {
        elements.listenButton.addEventListener("click", playQuestion);
        elements.nextButton.addEventListener("click", nextQuestion);
        elements.resetProgress.addEventListener("click", function () {
            if (!window.confirm("화성학 단계 완료 기록을 모두 지울까요?")) return;
            state.progress = { completed: [], scores: {} };
            saveProgress();
            renderStages();
            renderStage();
            showToast("화성학 기록을 초기화했습니다.");
        });
    }

    function init() {
        cacheElements();
        renderStages();
        renderStage();
        renderPiano();
        bindEvents();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
