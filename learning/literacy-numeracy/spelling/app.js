(() => {
    "use strict";

    const SESSION_SIZE = 10;
    const PLAYER_NAME_KEY = "classPlayerName";
    const BEST_SCORE_KEY = "spellingQuizBestScore";
    const PERSONAL_DECK_KEY = "spellingPersonalQuestionDeckV1";
    const LESSON_PROGRESS_KEY = "spellingLessonProgressV1";
    const questionBank = Array.isArray(window.SPELLING_QUESTIONS)
        ? window.SPELLING_QUESTIONS
        : [];
    const questionById = new Map(questionBank.map((question) => [question.id, question]));
    const lessons = Array.isArray(window.SPELLING_LESSONS) ? window.SPELLING_LESSONS : [];

    document.querySelectorAll("[data-question-count]").forEach((node) => { node.textContent = String(questionBank.length); });
    document.querySelectorAll("[data-lesson-count]").forEach((node) => { node.textContent = String(lessons.length); });

    const elements = {
        modeScreen: document.getElementById("modeScreen"),
        lessonScreen: document.getElementById("lessonScreen"),
        studyScreen: document.getElementById("studyScreen"),
        personalScreen: document.getElementById("personalScreen"),
        quizScreen: document.getElementById("quizScreen"),
        resultScreen: document.getElementById("resultScreen"),
        lessonModeButton: document.getElementById("lessonModeButton"),
        personalModeButton: document.getElementById("personalModeButton"),
        personalStartButton: document.getElementById("personalStartButton"),
        lessonProgressSummary: document.getElementById("lessonProgressSummary"),
        lessonList: document.getElementById("lessonList"),
        studyKicker: document.getElementById("studyKicker"),
        studyLessonTitle: document.getElementById("studyLessonTitle"),
        studyNote: document.getElementById("studyNote"),
        studyIndex: document.getElementById("studyIndex"),
        studyTotal: document.getElementById("studyTotal"),
        studyRight: document.getElementById("studyRight"),
        studyWrong: document.getElementById("studyWrong"),
        studySentence: document.getElementById("studySentence"),
        studyExplanation: document.getElementById("studyExplanation"),
        studyPrevButton: document.getElementById("studyPrevButton"),
        studyNextButton: document.getElementById("studyNextButton"),
        studySkipButton: document.getElementById("studySkipButton"),
        studyBackButton: document.getElementById("studyBackButton"),
        restartButton: document.getElementById("restartButton"),
        nextLessonButton: document.getElementById("nextLessonButton"),
        lessonListButton: document.getElementById("lessonListButton"),
        resultModeButton: document.getElementById("resultModeButton"),
        nextButton: document.getElementById("nextButton"),
        headerBestScore: document.getElementById("headerBestScore"),
        quizModeLabel: document.getElementById("quizModeLabel"),
        questionNumber: document.getElementById("questionNumber"),
        questionTotal: document.getElementById("questionTotal"),
        currentScore: document.getElementById("currentScore"),
        progressFill: document.getElementById("progressFill"),
        questionCategory: document.getElementById("questionCategory"),
        questionPrompt: document.getElementById("questionPrompt"),
        questionText: document.getElementById("questionText"),
        choiceList: document.getElementById("choiceList"),
        feedback: document.getElementById("feedback"),
        feedbackTitle: document.getElementById("feedbackTitle"),
        correctAnswer: document.getElementById("correctAnswer"),
        explanation: document.getElementById("explanation"),
        resultEyebrow: document.getElementById("resultEyebrow"),
        resultTitle: document.getElementById("resultTitle"),
        finalScore: document.getElementById("finalScore"),
        finalTotal: document.getElementById("finalTotal"),
        resultMessage: document.getElementById("resultMessage"),
        bestMessage: document.getElementById("bestMessage"),
        reviewArea: document.getElementById("reviewArea"),
        perfectReview: document.getElementById("perfectReview"),
        missedList: document.getElementById("missedList"),
        announcer: document.getElementById("announcer")
    };

    const screens = [
        elements.modeScreen,
        elements.lessonScreen,
        elements.studyScreen,
        elements.personalScreen,
        elements.quizScreen,
        elements.resultScreen
    ];

    const state = {
        mode: "",
        lessonIndex: -1,
        studyIndex: 0,
        questions: [],
        currentIndex: 0,
        score: 0,
        answered: false,
        hadWrong: false,
        firstWrongChoice: "",
        answers: []
    };

    function readStoredValue(key) {
        try {
            return localStorage.getItem(key) || "";
        } catch (error) {
            return "";
        }
    }

    function writeStoredValue(key, value) {
        try {
            localStorage.setItem(key, String(value));
        } catch (error) {
            // The quiz still works when storage is unavailable.
        }
    }

    function getPlayerName() {
        return readStoredValue(PLAYER_NAME_KEY).trim();
    }

    function getBestScore() {
        const stored = Number.parseInt(readStoredValue(BEST_SCORE_KEY), 10);
        return Number.isInteger(stored) && stored >= 0 ? Math.min(stored, SESSION_SIZE) : 0;
    }

    function readLessonProgress() {
        try {
            const parsed = JSON.parse(readStoredValue(LESSON_PROGRESS_KEY) || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
        } catch (error) {
            return {};
        }
    }

    function saveLessonResult(lessonId, score, total) {
        const progress = readLessonProgress();
        const previous = progress[lessonId];
        const best = Math.max(Number(previous?.best) || 0, score);
        progress[lessonId] = { best, total, completedAt: Date.now() };
        writeStoredValue(LESSON_PROGRESS_KEY, JSON.stringify(progress));
        return { best, isNewBest: !previous || score > (Number(previous.best) || 0) };
    }

    function shuffle(items) {
        const copy = [...items];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
        }
        return copy;
    }

    function sessionSize() {
        return state.questions.length;
    }

    function currentLesson() {
        return lessons[state.lessonIndex] || null;
    }

    function takePersonalQuestionIds() {
        return window.SpellingQuestionDeck.take({
            questions: questionBank,
            size: SESSION_SIZE,
            storageKey: PERSONAL_DECK_KEY,
            storage: window.localStorage
        });
    }

    function buildSession(questionIds, limit) {
        const selected = questionIds.map((id) => questionById.get(id)).filter(Boolean);
        const trimmed = limit ? selected.slice(0, limit) : selected;
        return trimmed.map((question) => ({
            ...question,
            choices: shuffle(question.choices)
        }));
    }

    function setScreen(activeScreen) {
        screens.forEach((screen) => screen?.classList.toggle("hidden", screen !== activeScreen));
    }

    function updateHeaderBest() {
        elements.headerBestScore.textContent = `${getBestScore()}/${SESSION_SIZE}`;
    }

    function showModeScreen() {
        state.mode = "";
        state.lessonIndex = -1;
        setScreen(elements.modeScreen);
        elements.lessonModeButton.focus({ preventScroll: true });
    }

    function renderLessonList() {
        const progress = readLessonProgress();
        const completedCount = lessons.filter((lesson) => progress[lesson.id]).length;
        elements.lessonProgressSummary.textContent = `${lessons.length}차시 중 ${completedCount}차시를 끝냈어요. 차시를 골라 규칙을 익힌 뒤 확인 문제를 풀어요.`;
        elements.lessonList.replaceChildren(...lessons.map((lesson, index) => {
            const item = document.createElement("li");
            const button = document.createElement("button");
            const number = document.createElement("span");
            const copy = document.createElement("span");
            const title = document.createElement("strong");
            const note = document.createElement("small");
            const meta = document.createElement("span");
            const record = progress[lesson.id];

            button.type = "button";
            button.className = "lesson-card";
            if (record) button.classList.add("is-done");
            if (record && record.best === record.total) button.classList.add("is-perfect");
            number.className = "lesson-number";
            number.textContent = `${index + 1}차시`;
            copy.className = "lesson-copy";
            title.textContent = lesson.title;
            note.textContent = lesson.note;
            copy.append(title, note);
            meta.className = "lesson-meta";
            meta.textContent = record
                ? `${record.best === record.total ? "✓ 완벽" : "✓ 완료"} · ${record.best}/${record.total}`
                : `${lesson.ids.length}문제`;
            button.append(number, copy, meta);
            button.addEventListener("click", () => openStudy(index));
            item.append(button);
            return item;
        }));
    }

    function selectLessonMode() {
        state.mode = "lesson";
        renderLessonList();
        setScreen(elements.lessonScreen);
        elements.lessonList.querySelector("button")?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openStudy(lessonIndex) {
        state.mode = "lesson";
        state.lessonIndex = lessonIndex;
        state.studyIndex = 0;
        const lesson = currentLesson();
        elements.studyKicker.textContent = `${lessonIndex + 1}차시 · 익히기`;
        elements.studyLessonTitle.textContent = lesson.title;
        elements.studyNote.textContent = lesson.note;
        elements.studyTotal.textContent = String(lesson.ids.length);
        setScreen(elements.studyScreen);
        renderStudy();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderStudy() {
        const lesson = currentLesson();
        const question = questionById.get(lesson.ids[state.studyIndex]);
        const wrong = question.choices.find((choice) => choice !== question.answer) || "";
        const isLast = state.studyIndex === lesson.ids.length - 1;

        elements.studyIndex.textContent = String(state.studyIndex + 1);
        elements.studyRight.textContent = question.answer;
        elements.studyWrong.textContent = wrong;
        elements.studySentence.textContent = question.sentence.replace("___", question.answer);
        elements.studyExplanation.textContent = question.explanation;
        elements.studyPrevButton.disabled = state.studyIndex === 0;
        elements.studyNextButton.textContent = isLast ? "확인 문제 풀기" : "다음";
        elements.studySkipButton.classList.toggle("hidden", isLast);
        elements.announcer.textContent = `${question.answer}. ${question.explanation}`;
    }

    function moveStudy(step) {
        const lesson = currentLesson();
        const next = state.studyIndex + step;
        if (next < 0) return;
        if (next >= lesson.ids.length) {
            startLessonQuiz();
            return;
        }
        state.studyIndex = next;
        renderStudy();
        elements.studyNextButton.focus({ preventScroll: true });
    }

    function startLessonQuiz() {
        const lesson = currentLesson();
        if (!lesson) return;
        startQuiz(shuffle(lesson.ids));
    }

    function selectPersonalMode() {
        state.mode = "personal";
        setScreen(elements.personalScreen);
        elements.personalStartButton.focus({ preventScroll: true });
    }

    function startQuiz(questionIds) {
        const isLesson = state.mode === "lesson";
        const ids = Array.isArray(questionIds) ? questionIds : takePersonalQuestionIds();
        const session = buildSession(ids, isLesson ? 0 : SESSION_SIZE);
        const expected = isLesson ? ids.length : SESSION_SIZE;
        if (session.length === 0 || session.length !== expected) {
            elements.personalStartButton.textContent = "문항을 불러오지 못했어요";
            elements.personalStartButton.disabled = true;
            return;
        }

        state.questions = session;
        state.currentIndex = 0;
        state.score = 0;
        state.answered = false;
        state.answers = [];
        elements.currentScore.textContent = "0";
        elements.questionTotal.textContent = String(sessionSize());
        elements.quizModeLabel.textContent = isLesson ? `${state.lessonIndex + 1}차시 확인` : "무작위 10문제";
        setScreen(elements.quizScreen);
        renderQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderQuestion() {
        const question = state.questions[state.currentIndex];
        state.answered = false;
        state.hadWrong = false;
        state.firstWrongChoice = "";

        elements.questionNumber.textContent = String(state.currentIndex + 1);
        elements.progressFill.style.width = `${((state.currentIndex + 1) / sessionSize()) * 100}%`;
        elements.questionCategory.textContent = question.category;
        elements.questionPrompt.textContent = question.prompt;
        elements.questionText.textContent = question.sentence;
        elements.choiceList.replaceChildren();
        elements.feedback.classList.add("hidden");
        elements.feedback.classList.remove("is-wrong");
        elements.nextButton.textContent = state.currentIndex === sessionSize() - 1
            ? "결과 보기"
            : "다음 문제";

        question.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            const number = document.createElement("span");

            button.type = "button";
            button.className = "choice-button";
            button.dataset.choice = choice;
            button.append(document.createTextNode(choice));

            number.className = "choice-number";
            number.setAttribute("aria-hidden", "true");
            number.textContent = String(index + 1);
            button.append(number);

            button.addEventListener("click", () => selectAnswer(choice, button));
            elements.choiceList.append(button);
        });

        elements.choiceList.querySelector("button")?.focus({ preventScroll: true });
    }

    function selectAnswer(selectedChoice, selectedButton) {
        if (state.answered) return;
        const question = state.questions[state.currentIndex];
        const isCorrect = selectedChoice === question.answer;
        const buttons = [...elements.choiceList.querySelectorAll("button")];

        if (!isCorrect) {
            state.hadWrong = true;
            if (!state.firstWrongChoice) state.firstWrongChoice = selectedChoice;
            selectedButton.classList.add("is-wrong");
            selectedButton.disabled = true;
            elements.feedbackTitle.textContent = "다시 생각해 보세요.";
            elements.explanation.textContent = "다른 답을 골라보세요.";
            elements.correctAnswer.textContent = "";
            elements.feedback.classList.add("is-wrong");
            elements.feedback.classList.remove("hidden");
            elements.announcer.textContent = "다시 생각하고 다른 답을 골라보세요.";
            return;
        }

        state.answered = true;

        buttons.forEach((button) => {
            button.disabled = true;
            if (button.dataset.choice === question.answer) button.classList.add("is-correct");
        });

        if (!state.hadWrong) {
            state.score += 1;
            elements.currentScore.textContent = String(state.score);
        }

        state.answers.push({
            question,
            selectedChoice: state.hadWrong ? state.firstWrongChoice : selectedChoice,
            isCorrect: !state.hadWrong
        });
        elements.feedbackTitle.textContent = "정답이에요!";
        elements.feedback.classList.remove("is-wrong");
        elements.correctAnswer.textContent = `정답: ${question.answer}`;
        elements.explanation.textContent = question.explanation;
        elements.feedback.classList.remove("hidden");
        elements.announcer.textContent = `${elements.feedbackTitle.textContent} 정답은 ${question.answer}입니다. ${question.explanation}`;
        elements.nextButton.focus({ preventScroll: true });
    }

    function goToNextQuestion() {
        if (!state.answered) return;
        if (state.currentIndex >= sessionSize() - 1) {
            showResults();
            return;
        }
        state.currentIndex += 1;
        renderQuestion();
    }

    function getResultMessage(score, total) {
        const playerName = getPlayerName();
        const subject = playerName ? `${playerName} 님, ` : "";
        const ratio = total > 0 ? score / total : 0;
        if (score === total) return `${subject}완벽해요! 맞춤법 달인이네요.`;
        if (ratio >= 0.8) return `${subject}훌륭해요! 거의 다 알고 있어요.`;
        if (ratio >= 0.6) return `${subject}좋아요! 헷갈린 표현만 다시 살펴봐요.`;
        return `${subject}괜찮아요. 오답노트를 읽고 한 번 더 도전해 봐요.`;
    }

    function appendReviewItem(answerRecord) {
        const item = document.createElement("li");
        const sentence = document.createElement("span");
        const answer = document.createElement("span");
        const chosen = document.createElement("span");
        const explanation = document.createElement("span");

        sentence.className = "review-sentence";
        sentence.textContent = answerRecord.question.sentence.replace("___", answerRecord.question.answer);
        answer.className = "review-answer";
        answer.textContent = `정답: ${answerRecord.question.answer}`;
        chosen.className = "review-chosen";
        chosen.textContent = `내가 고른 답: ${answerRecord.selectedChoice}`;
        explanation.className = "review-explanation";
        explanation.textContent = answerRecord.question.explanation;
        item.append(sentence, chosen, answer, explanation);
        elements.missedList.append(item);
    }

    function showResults() {
        const total = sessionSize();
        const missed = state.answers.filter((answer) => !answer.isCorrect);
        elements.finalScore.textContent = String(state.score);
        elements.finalTotal.textContent = String(total);
        elements.resultMessage.textContent = getResultMessage(state.score, total);
        elements.missedList.replaceChildren();
        missed.forEach(appendReviewItem);
        elements.perfectReview.classList.toggle("hidden", missed.length !== 0);
        elements.missedList.classList.toggle("hidden", missed.length === 0);

        elements.nextLessonButton.classList.add("hidden");
        elements.lessonListButton.classList.add("hidden");
        elements.resultEyebrow.textContent = "LEARNING COMPLETE";
        elements.resultTitle.textContent = "학습 결과";
        elements.restartButton.textContent = "새 문제 풀기";

        if (state.mode === "lesson") {
            const lesson = currentLesson();
            const { best, isNewBest } = saveLessonResult(lesson.id, state.score, total);
            const hasNext = state.lessonIndex + 1 < lessons.length;
            elements.resultEyebrow.textContent = "LESSON COMPLETE";
            elements.resultTitle.textContent = `${state.lessonIndex + 1}차시 · ${lesson.title}`;
            elements.bestMessage.textContent = isNewBest
                ? `이 차시 최고 기록이에요! ${best}/${total}`
                : `이 차시 최고 기록 ${best}/${total}`;
            elements.restartButton.textContent = "이 차시 다시 풀기";
            elements.nextLessonButton.classList.toggle("hidden", !hasNext);
            elements.lessonListButton.classList.remove("hidden");
        } else {
            const previousBest = getBestScore();
            const isNewBest = state.score > previousBest;
            const best = Math.max(previousBest, state.score);
            if (isNewBest) writeStoredValue(BEST_SCORE_KEY, state.score);
            elements.bestMessage.textContent = isNewBest
                ? `새 개인 최고 기록이에요! ${best}/${SESSION_SIZE}`
                : `개인 최고 기록 ${best}/${SESSION_SIZE}`;
            updateHeaderBest();
        }

        setScreen(elements.resultScreen);
        elements.resultModeButton.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function restartCurrent() {
        if (state.mode === "lesson") {
            startLessonQuiz();
            return;
        }
        startQuiz();
    }

    function goToNextLesson() {
        if (state.lessonIndex + 1 >= lessons.length) {
            selectLessonMode();
            return;
        }
        openStudy(state.lessonIndex + 1);
    }

    function handleKeyboard(event) {
        if (elements.quizScreen.classList.contains("hidden")) return;
        if (!state.answered && /^[1-4]$/.test(event.key)) {
            const choice = elements.choiceList.querySelectorAll("button")[Number(event.key) - 1];
            if (choice) {
                event.preventDefault();
                choice.click();
            }
            return;
        }
        if (state.answered && event.key === "Enter" && document.activeElement !== elements.nextButton) {
            event.preventDefault();
            goToNextQuestion();
        }
    }

    elements.lessonModeButton.addEventListener("click", selectLessonMode);
    elements.personalModeButton.addEventListener("click", selectPersonalMode);
    elements.personalStartButton.addEventListener("click", () => startQuiz());
    elements.studyPrevButton.addEventListener("click", () => moveStudy(-1));
    elements.studyNextButton.addEventListener("click", () => moveStudy(1));
    elements.studySkipButton.addEventListener("click", startLessonQuiz);
    elements.studyBackButton.addEventListener("click", selectLessonMode);
    elements.restartButton.addEventListener("click", restartCurrent);
    elements.nextLessonButton.addEventListener("click", goToNextLesson);
    elements.lessonListButton.addEventListener("click", selectLessonMode);
    elements.resultModeButton.addEventListener("click", showModeScreen);
    elements.nextButton.addEventListener("click", goToNextQuestion);
    document.querySelectorAll(".mode-back-button").forEach((button) => button.addEventListener("click", showModeScreen));
    document.addEventListener("keydown", handleKeyboard);

    updateHeaderBest();
    setScreen(elements.modeScreen);
})();
