(() => {
    "use strict";

    const course = window.SENTENCE_COURSE;
    if (!course || !Array.isArray(course.lessons)) return;

    const STORAGE_KEY = "joyclass-sentence-building-progress-v1";
    const elements = {
        courseScreen: document.getElementById("courseScreen"),
        lessonScreen: document.getElementById("lessonScreen"),
        resultScreen: document.getElementById("resultScreen"),
        lessonList: document.getElementById("lessonList"),
        progressText: document.getElementById("progressText"),
        progressPercent: document.getElementById("progressPercent"),
        courseProgressFill: document.getElementById("courseProgressFill"),
        missionNumber: document.getElementById("missionNumber"),
        missionTotal: document.getElementById("missionTotal"),
        missionProgressFill: document.getElementById("missionProgressFill"),
        unitName: document.getElementById("unitName"),
        lessonTitle: document.getElementById("lessonTitle"),
        lessonGoal: document.getElementById("lessonGoal"),
        taskType: document.getElementById("taskType"),
        taskPrompt: document.getElementById("taskPrompt"),
        taskScene: document.getElementById("taskScene"),
        activityArea: document.getElementById("activityArea"),
        feedback: document.getElementById("feedback"),
        feedbackTitle: document.getElementById("feedbackTitle"),
        feedbackText: document.getElementById("feedbackText"),
        hintButton: document.getElementById("hintButton"),
        checkButton: document.getElementById("checkButton"),
        nextButton: document.getElementById("nextButton"),
        backToListButton: document.getElementById("backToListButton"),
        resultMessage: document.getElementById("resultMessage"),
        resultScore: document.getElementById("resultScore"),
        nextLessonButton: document.getElementById("nextLessonButton"),
        retryButton: document.getElementById("retryButton"),
        resultListButton: document.getElementById("resultListButton"),
        celebration: document.getElementById("celebration"),
        announcer: document.getElementById("announcer")
    };

    let saved = loadProgress();
    let currentLessonIndex = 0;
    let taskIndex = 0;
    let score = 0;
    let selectedChoice = null;
    let orderTokens = [];
    let selectedOrder = [];
    let checked = false;

    function loadProgress() {
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
            if (value && value.lessons && typeof value.lessons === "object") return value;
        } catch (_) {}
        return { lessons: {}, lastLesson: null };
    }

    function saveProgress() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (_) {}
    }

    function showOnly(screen) {
        [elements.courseScreen, elements.lessonScreen, elements.resultScreen].forEach((item) => {
            item.hidden = item !== screen;
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function unitFor(id) {
        return course.units.find((unit) => unit.id === id) || course.units[0];
    }

    function lessonRecord(id) {
        return saved.lessons[id] || { bestScore: 0, completed: false };
    }

    function currentSuggestedIndex() {
        const unfinished = course.lessons.findIndex((item) => !lessonRecord(item.id).completed);
        return unfinished < 0 ? course.lessons.length - 1 : unfinished;
    }

    function renderCourse() {
        elements.lessonList.replaceChildren();
        const suggested = currentSuggestedIndex();
        let completed = 0;

        course.units.forEach((unit) => {
            const unitLessons = course.lessons.filter((item) => item.unit === unit.id);
            const unitComplete = unitLessons.filter((item) => lessonRecord(item.id).completed).length;
            completed += unitComplete;
            const section = document.createElement("section");
            section.className = "unit-section";
            section.innerHTML = `
                <header class="unit-header">
                    <div><span><h2></h2><p></p></span></div>
                    <span class="unit-count"></span>
                </header>
                <div class="lesson-grid"></div>`;
            section.querySelector("h2").textContent = unit.title;
            section.querySelector("p").textContent = unit.subtitle;
            section.querySelector(".unit-count").textContent = `${unitComplete}/${unitLessons.length} 완료`;
            const grid = section.querySelector(".lesson-grid");

            unitLessons.forEach((item) => {
                const index = course.lessons.indexOf(item);
                const record = lessonRecord(item.id);
                const button = document.createElement("button");
                button.type = "button";
                button.className = "lesson-card";
                if (record.completed) button.classList.add("is-complete");
                if (index === suggested && !record.completed) button.classList.add("is-current");
                button.setAttribute("aria-label", `${index + 1}차시 ${item.title}${record.completed ? ", 완료" : ""}`);
                button.innerHTML = `
                    <span class="lesson-number"></span>
                    <strong></strong>
                    <small></small>`;
                button.querySelector(".lesson-number").textContent = record.completed ? "✓" : String(index + 1).padStart(2, "0");
                button.querySelector("strong").textContent = item.title;
                button.querySelector("small").textContent = item.goal;
                button.addEventListener("click", () => startLesson(index));
                grid.append(button);
            });
            elements.lessonList.append(section);
        });

        const percent = Math.round((completed / course.lessons.length) * 100);
        elements.progressText.textContent = `${completed} / ${course.lessons.length}차시 완료`;
        elements.progressPercent.textContent = `${percent}%`;
        elements.courseProgressFill.style.width = `${percent}%`;
    }

    function startLesson(index) {
        currentLessonIndex = Math.max(0, Math.min(index, course.lessons.length - 1));
        taskIndex = 0;
        score = 0;
        saved.lastLesson = course.lessons[currentLessonIndex].id;
        saveProgress();
        showOnly(elements.lessonScreen);
        renderTask();
    }

    function shuffle(values) {
        const copy = values.slice();
        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function renderTask() {
        const lesson = course.lessons[currentLessonIndex];
        const unit = unitFor(lesson.unit);
        const task = lesson.tasks[taskIndex];
        checked = false;
        selectedChoice = null;
        selectedOrder = [];
        elements.feedback.hidden = true;
        elements.feedback.className = "feedback";
        elements.checkButton.hidden = false;
        elements.nextButton.hidden = true;
        elements.hintButton.hidden = false;
        elements.activityArea.replaceChildren();
        elements.unitName.textContent = unit.title;
        elements.lessonTitle.textContent = `${currentLessonIndex + 1}차시 · ${lesson.title}`;
        elements.lessonGoal.textContent = lesson.goal;
        elements.missionNumber.textContent = String(taskIndex + 1);
        elements.missionTotal.textContent = String(lesson.tasks.length);
        elements.missionProgressFill.style.width = `${(taskIndex / lesson.tasks.length) * 100}%`;
        elements.taskType.textContent = task.type === "order" ? "낱말 배열" : task.type === "write" ? "글쓰기" : "문제 풀기";
        elements.taskPrompt.textContent = task.prompt;
        elements.taskScene.textContent = task.scene || "";
        if (task.type === "choice") renderChoices(task);
        if (task.type === "order") renderOrder(task);
        if (task.type === "write") renderWriting(task);
        elements.announcer.textContent = `${taskIndex + 1}번째 문제. ${task.prompt}`;
    }

    function renderChoices(task) {
        const list = document.createElement("div");
        list.className = "choice-list";
        task.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "choice-button";
            button.textContent = `${index + 1}. ${option}`;
            button.addEventListener("click", () => {
                if (checked) return;
                selectedChoice = index;
                list.querySelectorAll("button").forEach((item) => item.classList.remove("is-selected"));
                button.classList.add("is-selected");
            });
            list.append(button);
        });
        elements.activityArea.append(list);
    }

    function renderOrder(task) {
        orderTokens = shuffle(task.tokens.map((value, index) => ({ id: `${index}-${value}`, value })));
        const board = document.createElement("div");
        board.className = "order-board";
        board.innerHTML = '<p>내가 만든 문장</p><div class="token-row selected-tokens"></div>';
        const bank = document.createElement("div");
        bank.className = "token-bank";
        bank.innerHTML = '<p>낱말 카드</p><div class="token-row bank-tokens"></div>';
        elements.activityArea.append(board, bank);

        function refresh() {
            const selected = board.querySelector(".selected-tokens");
            const available = bank.querySelector(".bank-tokens");
            selected.replaceChildren();
            available.replaceChildren();
            selectedOrder.forEach((token, selectedIndex) => {
                const button = tokenButton(token.value);
                button.setAttribute("aria-label", `${token.value} 카드 되돌리기`);
                button.addEventListener("click", () => {
                    if (checked) return;
                    selectedOrder.splice(selectedIndex, 1);
                    refresh();
                });
                selected.append(button);
            });
            orderTokens.forEach((token) => {
                const button = tokenButton(token.value);
                const used = selectedOrder.some((item) => item.id === token.id);
                button.disabled = used || checked;
                button.addEventListener("click", () => {
                    if (checked || used) return;
                    selectedOrder.push(token);
                    refresh();
                });
                available.append(button);
            });
        }
        refresh();
    }

    function tokenButton(text) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "word-token";
        button.textContent = text;
        return button;
    }

    function renderWriting(task) {
        const wrapper = document.createElement("div");
        wrapper.className = "write-area";
        const scene = document.createElement("div");
        scene.className = "writing-scene";
        scene.textContent = task.scene;
        elements.taskScene.textContent = "그림에서 장소·행동·느낌을 살펴보세요.";
        const textarea = document.createElement("textarea");
        textarea.id = "reportText";
        textarea.placeholder = "예) 가족이 공원에 소풍을 왔다.\n함께 도시락을 먹었다.\n즐거운 하루였다.";
        textarea.setAttribute("aria-label", "세 문장 글쓰기");
        const count = document.createElement("div");
        count.className = "writing-count";
        const updateCount = () => { count.textContent = `${sentenceCount(textarea.value)} / ${task.minSentences}문장`; };
        textarea.addEventListener("input", updateCount);
        wrapper.append(scene, textarea, count);
        elements.activityArea.append(wrapper);
        updateCount();
    }

    function sentenceCount(value) {
        const text = String(value || "").trim();
        if (!text) return 0;
        const ended = text.match(/[^.!?。！？\n]+[.!?。！？]+/g) || [];
        const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
        return Math.max(ended.length, lines.length);
    }

    function currentTask() {
        return course.lessons[currentLessonIndex].tasks[taskIndex];
    }

    function showFeedback(kind, title, text) {
        elements.feedback.hidden = false;
        elements.feedback.className = `feedback ${kind}`;
        elements.feedbackTitle.textContent = title;
        elements.feedbackText.textContent = text;
    }

    function validateTask(task) {
        if (task.type === "choice") {
            if (selectedChoice === null) return null;
            return selectedChoice === task.answer;
        }
        if (task.type === "order") {
            if (selectedOrder.length !== task.answer.length) return null;
            return selectedOrder.every((token, index) => token.value === task.answer[index]);
        }
        const textarea = document.getElementById("reportText");
        if (!textarea || !textarea.value.trim()) return null;
        return sentenceCount(textarea.value) >= task.minSentences && textarea.value.trim().length >= 20;
    }

    function checkAnswer() {
        if (checked) return;
        const task = currentTask();
        const correct = validateTask(task);
        if (correct === null) {
            showFeedback("hint", "답을 완성해 주세요", task.type === "order" ? "모든 낱말 카드를 문장 칸에 놓아 보세요." : task.type === "write" ? `${task.minSentences}문장 이상 써 보세요.` : "정답이라고 생각하는 문장을 먼저 골라 보세요.");
            elements.announcer.textContent = elements.feedbackText.textContent;
            return;
        }

        checked = true;
        elements.hintButton.hidden = true;
        elements.checkButton.hidden = true;
        elements.nextButton.hidden = false;
        if (correct) {
            score += 1;
            showFeedback("good", "정답입니다", task.explain);
            playTone(true);
        } else {
            showFeedback("bad", "정답을 확인해 보세요", task.explain);
            playTone(false);
        }

        if (task.type === "choice") {
            elements.activityArea.querySelectorAll(".choice-button").forEach((button, index) => {
                button.disabled = true;
                if (index === task.answer) button.classList.add("is-correct");
                if (index === selectedChoice && index !== task.answer) button.classList.add("is-wrong");
            });
        }
        elements.nextButton.textContent = taskIndex === course.lessons[currentLessonIndex].tasks.length - 1 ? "학습 완료 →" : "다음 문제 →";
        elements.announcer.textContent = `${elements.feedbackTitle.textContent}. ${task.explain}`;
    }

    function showHint() {
        const task = currentTask();
        showFeedback("hint", "힌트", task.hint);
        elements.announcer.textContent = task.hint;
    }

    function nextTask() {
        const lesson = course.lessons[currentLessonIndex];
        if (taskIndex < lesson.tasks.length - 1) {
            taskIndex += 1;
            renderTask();
        } else {
            finishLesson();
        }
    }

    function finishLesson() {
        const lesson = course.lessons[currentLessonIndex];
        const old = lessonRecord(lesson.id);
        saved.lessons[lesson.id] = {
            completed: true,
            bestScore: Math.max(old.bestScore || 0, score)
        };
        saveProgress();
        elements.resultScore.textContent = `${score}/${lesson.tasks.length}`;
        elements.resultMessage.textContent = score === lesson.tasks.length
            ? "모든 문제를 맞혔습니다."
            : "틀린 문제는 다시 도전해서 확인해 보세요.";
        elements.nextLessonButton.hidden = currentLessonIndex >= course.lessons.length - 1;
        showOnly(elements.resultScreen);
        celebrate();
    }

    function celebrate() {
        elements.celebration.replaceChildren();
        const colors = ["#ffd45b", "#4cc9d8", "#48ad78", "#f26b5b", "#7868cf"];
        for (let i = 0; i < 18; i += 1) {
            const piece = document.createElement("i");
            piece.className = "confetti";
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.background = colors[i % colors.length];
            piece.style.setProperty("--drift", `${Math.round(Math.random() * 160 - 80)}px`);
            piece.style.animationDelay = `${Math.random() * .45}s`;
            elements.celebration.append(piece);
        }
        window.setTimeout(() => elements.celebration.replaceChildren(), 2400);
    }

    function playTone(success) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const context = new AudioContext();
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = success ? "sine" : "triangle";
            oscillator.frequency.setValueAtTime(success ? 520 : 210, context.currentTime);
            if (success) oscillator.frequency.exponentialRampToValueAtTime(780, context.currentTime + .14);
            gain.gain.setValueAtTime(.0001, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(.12, context.currentTime + .02);
            gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .2);
            oscillator.connect(gain).connect(context.destination);
            oscillator.start();
            oscillator.stop(context.currentTime + .21);
            oscillator.addEventListener("ended", () => context.close());
        } catch (_) {}
    }

    elements.hintButton.addEventListener("click", showHint);
    elements.checkButton.addEventListener("click", checkAnswer);
    elements.nextButton.addEventListener("click", nextTask);
    elements.backToListButton.addEventListener("click", () => { renderCourse(); showOnly(elements.courseScreen); });
    elements.resultListButton.addEventListener("click", () => { renderCourse(); showOnly(elements.courseScreen); });
    elements.retryButton.addEventListener("click", () => startLesson(currentLessonIndex));
    elements.nextLessonButton.addEventListener("click", () => startLesson(currentLessonIndex + 1));

    renderCourse();
    showOnly(elements.courseScreen);
})();
