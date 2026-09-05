(() => {
    "use strict";

    const PLAYER_NAME_KEY = "classPlayerName";
    const LESSON_PROGRESS_KEY = "poetryLessonProgressV1";
    const GRADE_KEY = "poetryLastGradeV1";

    const questionBank = Array.isArray(window.POETRY_QUESTIONS) ? window.POETRY_QUESTIONS : [];
    const questionById = new Map(questionBank.map((question) => [question.id, question]));
    const poems = Array.isArray(window.POETRY_POEMS) ? window.POETRY_POEMS : [];
    const poemById = new Map(poems.map((poem) => [poem.id, poem]));
    const lessons = Array.isArray(window.POETRY_LESSONS) ? window.POETRY_LESSONS : [];
    const grades = Array.isArray(window.POETRY_GRADES) ? window.POETRY_GRADES : [];

    const elements = {
        lessonScreen: document.getElementById("lessonScreen"),
        readScreen: document.getElementById("readScreen"),
        quizScreen: document.getElementById("quizScreen"),
        resultScreen: document.getElementById("resultScreen"),
        gradeTabs: document.getElementById("gradeTabs"),
        lessonProgressSummary: document.getElementById("lessonProgressSummary"),
        lessonList: document.getElementById("lessonList"),
        readKicker: document.getElementById("readKicker"),
        readTitle: document.getElementById("readTitle"),
        readIndex: document.getElementById("readIndex"),
        readTotal: document.getElementById("readTotal"),
        poemTitle: document.getElementById("poemTitle"),
        poemByline: document.getElementById("poemByline"),
        poemBody: document.getElementById("poemBody"),
        poemNotice: document.getElementById("poemNotice"),
        poemWords: document.getElementById("poemWords"),
        poemPoint: document.getElementById("poemPoint"),
        readPrevButton: document.getElementById("readPrevButton"),
        readNextButton: document.getElementById("readNextButton"),
        readSkipButton: document.getElementById("readSkipButton"),
        readBackButton: document.getElementById("readBackButton"),
        quizPoemCard: document.getElementById("quizPoemCard"),
        quizPoemTitle: document.getElementById("quizPoemTitle"),
        quizPoemByline: document.getElementById("quizPoemByline"),
        quizPoemBody: document.getElementById("quizPoemBody"),
        restartButton: document.getElementById("restartButton"),
        nextLessonButton: document.getElementById("nextLessonButton"),
        lessonListButton: document.getElementById("lessonListButton"),
        nextButton: document.getElementById("nextButton"),
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
        resultTitle: document.getElementById("resultTitle"),
        finalScore: document.getElementById("finalScore"),
        finalTotal: document.getElementById("finalTotal"),
        resultMessage: document.getElementById("resultMessage"),
        bestMessage: document.getElementById("bestMessage"),
        perfectReview: document.getElementById("perfectReview"),
        missedList: document.getElementById("missedList"),
        announcer: document.getElementById("announcer")
    };

    const screens = [
        elements.lessonScreen,
        elements.readScreen,
        elements.quizScreen,
        elements.resultScreen
    ];

    const state = {
        grade: grades[0] ? grades[0].grade : 3,
        lessonIndex: -1,
        readIndex: 0,
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
            // 저장이 막혀 있어도 이번 판은 그대로 굴러간다.
        }
    }

    function getPlayerName() {
        return readStoredValue(PLAYER_NAME_KEY).trim();
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

    function isReady(lesson) {
        return Array.isArray(lesson.ids) && lesson.ids.length > 0;
    }

    function lessonsOfGrade(grade) {
        return lessons.filter((lesson) => lesson.grade === grade);
    }

    function sessionSize() {
        return state.questions.length;
    }

    function currentLesson() {
        return lessons[state.lessonIndex] || null;
    }

    function orderInGradeOf(lesson) {
        return lessonsOfGrade(lesson.grade).indexOf(lesson) + 1;
    }

    function currentLessonPoems() {
        const lesson = currentLesson();
        if (!lesson) return [];
        return lesson.poemIds.map((id) => poemById.get(id)).filter(Boolean);
    }

    function setScreen(activeScreen) {
        screens.forEach((screen) => screen?.classList.toggle("hidden", screen !== activeScreen));
    }

    // ── 시 그리기 ────────────────────────────────────────────────
    function renderPoemLines(container, poem) {
        container.replaceChildren();
        if (poem.rights !== "public") return;
        let stanza = document.createElement("p");
        stanza.className = "poem-stanza";
        poem.lines.forEach((line) => {
            if (line === "") {
                if (stanza.childNodes.length > 0) container.append(stanza);
                stanza = document.createElement("p");
                stanza.className = "poem-stanza";
                return;
            }
            if (stanza.childNodes.length > 0) stanza.append(document.createElement("br"));
            stanza.append(document.createTextNode(line));
        });
        if (stanza.childNodes.length > 0) container.append(stanza);
    }

    function bylineOf(poem) {
        const badges = [poem.poet];
        const gradeLabel = grades.find((item) => item.grade === poem.grade);
        if (gradeLabel) badges.push(gradeLabel.short);
        return badges.join(" · ");
    }

    // ── 차시 목록 ────────────────────────────────────────────────
    function renderGradeTabs() {
        elements.gradeTabs.replaceChildren(...grades.map((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "grade-tab";
            button.textContent = item.label;
            button.setAttribute("role", "tab");
            const isActive = item.grade === state.grade;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
            button.addEventListener("click", () => {
                state.grade = item.grade;
                writeStoredValue(GRADE_KEY, item.grade);
                renderGradeTabs();
                renderLessonList();
            });
            return button;
        }));
    }

    function renderLessonList() {
        const progress = readLessonProgress();
        const list = lessonsOfGrade(state.grade);
        const ready = list.filter(isReady);
        const done = ready.filter((lesson) => progress[lesson.id]).length;
        elements.lessonProgressSummary.textContent = ready.length === 0
            ? "아직 준비 중이에요."
            : `${ready.length}차시 가운데 ${done}차시를 끝냈어요.`;

        elements.lessonList.replaceChildren(...list.map((lesson) => {
            const globalIndex = lessons.indexOf(lesson);
            const item = document.createElement("li");
            const button = document.createElement("button");
            const number = document.createElement("span");
            const copy = document.createElement("span");
            const title = document.createElement("strong");
            const meta = document.createElement("span");
            const record = progress[lesson.id];

            button.type = "button";
            button.className = "lesson-card";
            number.className = "lesson-number";
            number.textContent = `${orderInGradeOf(lesson)}차시`;
            copy.className = "lesson-copy";
            title.textContent = lesson.title;
            copy.append(title);
            meta.className = "lesson-meta";

            if (!isReady(lesson)) {
                button.classList.add("is-pending");
                button.disabled = true;
                meta.textContent = "준비 중";
            } else {
                if (record) button.classList.add("is-done");
                if (record && record.best === record.total) button.classList.add("is-perfect");
                meta.textContent = record
                    ? `${record.best === record.total ? "✓ 완벽" : "✓ 완료"} · ${record.best}/${record.total}`
                    : `시 ${lesson.poemIds.length}편 · 문제 ${lesson.ids.length}개`;
                button.addEventListener("click", () => openReading(globalIndex));
            }

            button.append(number, copy, meta);
            item.append(button);
            return item;
        }));
    }

    function showLessonList() {
        state.lessonIndex = -1;
        const stored = Number.parseInt(readStoredValue(GRADE_KEY), 10);
        if (grades.some((item) => item.grade === stored)) state.grade = stored;
        renderGradeTabs();
        renderLessonList();
        setScreen(elements.lessonScreen);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ── 시 읽기 ──────────────────────────────────────────────────
    function openReading(lessonIndex) {
        state.lessonIndex = lessonIndex;
        state.readIndex = 0;
        const lesson = currentLesson();
        elements.readKicker.textContent = `${orderInGradeOf(lesson)}차시`;
        elements.readTitle.textContent = lesson.title;
        elements.readTotal.textContent = String(currentLessonPoems().length);
        setScreen(elements.readScreen);
        renderReading();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderReading() {
        const poemList = currentLessonPoems();
        const poem = poemList[state.readIndex];
        if (!poem) return;
        const isLast = state.readIndex === poemList.length - 1;

        elements.readIndex.textContent = String(state.readIndex + 1);
        elements.poemTitle.textContent = poem.title;
        elements.poemByline.textContent = bylineOf(poem);
        renderPoemLines(elements.poemBody, poem);

        const locked = poem.rights !== "public";
        elements.poemNotice.classList.toggle("hidden", !locked);
        if (locked) {
            elements.poemNotice.textContent = "이 시는 아직 저작권 보호 기간 안에 있어요. 교과서를 펴고 읽어 보세요.";
        }

        elements.poemWords.replaceChildren();
        (poem.words || []).forEach((entry) => {
            const term = document.createElement("dt");
            const desc = document.createElement("dd");
            term.textContent = entry.word;
            desc.textContent = entry.mean;
            elements.poemWords.append(term, desc);
        });
        elements.poemWords.classList.toggle("hidden", (poem.words || []).length === 0);

        elements.poemPoint.textContent = poem.point || "";
        elements.readPrevButton.disabled = state.readIndex === 0;
        elements.readNextButton.textContent = isLast ? "확인 문제 풀기" : "다음 시";
        elements.readSkipButton.classList.toggle("hidden", isLast);
        elements.announcer.textContent = `${poem.title}. ${poem.poet}. ${poem.point || ""}`;
    }

    function moveReading(step) {
        const poemList = currentLessonPoems();
        const next = state.readIndex + step;
        if (next < 0) return;
        if (next >= poemList.length) {
            startLessonQuiz();
            return;
        }
        state.readIndex = next;
        renderReading();
        elements.readNextButton.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ── 문제 ─────────────────────────────────────────────────────
    function buildSession(questionIds) {
        return questionIds
            .map((id) => questionById.get(id))
            .filter(Boolean)
            .map((question) => ({ ...question, choices: shuffle(question.choices) }));
    }

    function startLessonQuiz() {
        const lesson = currentLesson();
        if (!lesson) return;
        const session = buildSession(shuffle(lesson.ids));
        if (session.length === 0) return;

        state.questions = session;
        state.currentIndex = 0;
        state.score = 0;
        state.answered = false;
        state.answers = [];
        elements.currentScore.textContent = "0";
        elements.questionTotal.textContent = String(sessionSize());
        elements.quizModeLabel.textContent = `${orderInGradeOf(lesson)}차시 확인`;
        setScreen(elements.quizScreen);
        renderQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderQuizPoem(question) {
        const poem = question.poemId ? poemById.get(question.poemId) : null;
        elements.quizPoemCard.classList.toggle("hidden", !poem);
        if (!poem) return;
        elements.quizPoemTitle.textContent = poem.title;
        elements.quizPoemByline.textContent = bylineOf(poem);
        renderPoemLines(elements.quizPoemBody, poem);
        if (poem.rights !== "public") {
            // 본문을 실을 수 없는 시는 문제 화면에서도 교과서를 펴게 안내한다.
            const notice = document.createElement("p");
            notice.className = "poem-notice";
            notice.textContent = "교과서를 펴고 이 시를 읽은 뒤 답해 보세요.";
            elements.quizPoemBody.append(notice);
        }
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
        renderQuizPoem(question);
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function getResultMessage(score, total) {
        const playerName = getPlayerName();
        const subject = playerName ? `${playerName} 님, ` : "";
        const ratio = total > 0 ? score / total : 0;
        if (score === total) return `${subject}완벽해요! 시를 아주 잘 읽었어요.`;
        if (ratio >= 0.8) return `${subject}훌륭해요! 거의 다 짚어 냈어요.`;
        if (ratio >= 0.6) return `${subject}좋아요! 헷갈린 시만 다시 읽어 봐요.`;
        return `${subject}괜찮아요. 시를 한 번 더 읽고 도전해 봐요.`;
    }

    function appendReviewItem(answerRecord) {
        const item = document.createElement("li");
        const poem = answerRecord.question.poemId ? poemById.get(answerRecord.question.poemId) : null;
        const sentence = document.createElement("span");
        const answer = document.createElement("span");
        const chosen = document.createElement("span");
        const explanation = document.createElement("span");

        sentence.className = "review-sentence";
        sentence.textContent = poem
            ? `「${poem.title}」 ${answerRecord.question.sentence}`
            : answerRecord.question.sentence;
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
        const lesson = currentLesson();
        const total = sessionSize();
        const missed = state.answers.filter((answer) => !answer.isCorrect);
        elements.finalScore.textContent = String(state.score);
        elements.finalTotal.textContent = String(total);
        elements.resultMessage.textContent = getResultMessage(state.score, total);
        elements.missedList.replaceChildren();
        missed.forEach(appendReviewItem);
        elements.perfectReview.classList.toggle("hidden", missed.length !== 0);
        elements.missedList.classList.toggle("hidden", missed.length === 0);

        const gradeList = lessonsOfGrade(lesson.grade);
        const nextLesson = gradeList[gradeList.indexOf(lesson) + 1];
        const { best, isNewBest } = saveLessonResult(lesson.id, state.score, total);
        elements.resultTitle.textContent = `${orderInGradeOf(lesson)}차시 · ${lesson.title}`;
        elements.bestMessage.textContent = isNewBest
            ? `이 차시 최고 기록이에요! ${best}/${total}`
            : `이 차시 최고 기록 ${best}/${total}`;
        elements.nextLessonButton.classList.toggle("hidden", !nextLesson || !isReady(nextLesson));

        setScreen(elements.resultScreen);
        elements.lessonListButton.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function goToNextLesson() {
        const lesson = currentLesson();
        if (!lesson) {
            showLessonList();
            return;
        }
        const gradeList = lessonsOfGrade(lesson.grade);
        const nextLesson = gradeList[gradeList.indexOf(lesson) + 1];
        if (!nextLesson || !isReady(nextLesson)) {
            showLessonList();
            return;
        }
        openReading(lessons.indexOf(nextLesson));
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

    elements.readPrevButton.addEventListener("click", () => moveReading(-1));
    elements.readNextButton.addEventListener("click", () => moveReading(1));
    elements.readSkipButton.addEventListener("click", startLessonQuiz);
    elements.readBackButton.addEventListener("click", showLessonList);
    elements.restartButton.addEventListener("click", startLessonQuiz);
    elements.nextLessonButton.addEventListener("click", goToNextLesson);
    elements.lessonListButton.addEventListener("click", showLessonList);
    elements.nextButton.addEventListener("click", goToNextQuestion);
    document.addEventListener("keydown", handleKeyboard);

    showLessonList();
})();
