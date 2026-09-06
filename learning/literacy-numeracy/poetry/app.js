(() => {
    "use strict";

    const PLAYER_NAME_KEY = "classPlayerName";
    const LESSON_PROGRESS_KEY = "poetryLessonProgressV1";
    const POEM_PROGRESS_KEY = "poetryPoemProgressV1";
    const GRADE_KEY = "poetryLastGradeV1";

    // 처음에는 제목·시인·소재만 있는 차례표를 받는다.
    // 본문과 낱말, 작품 설명, 그 시의 문제는 시를 열 때 poems/<아이디>.js로 받아 여기에 채운다.
    const poems = Array.isArray(window.POETRY_POEM_INDEX) ? window.POETRY_POEM_INDEX : [];
    const poemById = new Map(poems.map((poem) => [poem.id, poem]));
    const lessons = Array.isArray(window.POETRY_LESSONS) ? window.POETRY_LESSONS : [];
    const grades = Array.isArray(window.POETRY_GRADES) ? window.POETRY_GRADES : [];
    const wrapCounts = Array.isArray(window.POETRY_WRAP_COUNTS) ? window.POETRY_WRAP_COUNTS : [];

    // 문제는 시에 붙는다. 한 시가 여러 차시에 나와도 그 시를 열면 제 문제를 다 만난다.
    // poemId가 없는 문제는 차시를 마무리하는 문제라 차시 배정표(lesson.wrapIds)로만 모은다.
    const questionsByPoem = new Map();
    const questionById = new Map();

    const here = document.currentScript ? document.currentScript.src.replace(/[^/]*$/, "") : "";
    const version = (document.currentScript?.src.split("?v=")[1] || "");
    const loading = new Map();
    function fetchScript(file) {
        if (loading.has(file)) return loading.get(file);
        const job = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = here + file + (version ? "?v=" + version : "");
            script.onload = resolve;
            script.onerror = () => reject(new Error(file + "을 받지 못했습니다."));
            document.head.append(script);
        });
        loading.set(file, job);
        return job;
    }

    // 시 한 편의 본문과 문제를 받아 차례표 항목에 채워 넣는다.
    async function loadPoem(poem) {
        if (!poem || poem.lines) return poem;
        await fetchScript(`poems/${poem.id}.js`);
        const part = (window.POETRY_PART || {})[poem.id];
        if (!part) return poem;
        Object.assign(poem, part.poem);
        if (!poem.lines) poem.lines = [];
        questionsByPoem.set(poem.id, part.questions || []);
        (part.questions || []).forEach((question) => questionById.set(question.id, question));
        return poem;
    }

    let wrapLoaded = false;
    async function loadWrapQuestions() {
        if (wrapLoaded) return;
        await fetchScript("wrap-questions.js");
        (window.POETRY_WRAP_QUESTIONS || []).forEach((question) => questionById.set(question.id, question));
        wrapLoaded = true;
    }

    // 소재로 고르는 문. 학년 탭 끝에 '소재별' 탭 하나로 들어간다.
    const TOPIC_TAB = "topic";
    const TOPICS = ["봄", "여름", "가을", "겨울", "가족", "동물", "밤과 달", "고향",
        "그리움", "이별", "자연", "다짐", "시대", "나라", "사랑", "옛이야기", "놀이", "기다림"];
    const poemsByTopic = new Map(TOPICS.map((topic) => [topic, poems.filter((poem) => (poem.topics || []).includes(topic))]));

    const $ = (id) => document.getElementById(id);
    const elements = {
        backLink: document.querySelector(".back-link"),
        lessonScreen: $("lessonScreen"),
        lessonDetailScreen: $("lessonDetailScreen"),
        readScreen: $("readScreen"),
        quizScreen: $("quizScreen"),
        afterScreen: $("afterScreen"),
        resultScreen: $("resultScreen"),
        gradeTabs: $("gradeTabs"),
        lessonProgressSummary: $("lessonProgressSummary"),
        lessonList: $("lessonList"),
        topicChips: $("topicChips"),
        topicPoemList: $("topicPoemList"),
        lessonDetailKicker: $("lessonDetailKicker"),
        lessonDetailTitle: $("lessonDetailTitle"),
        lessonDetailNote: $("lessonDetailNote"),
        lessonPoemList: $("lessonPoemList"),
        startWrapButton: $("startWrapButton"),
        readKicker: $("readKicker"),
        poemTitle: $("poemTitle"),
        poemByline: $("poemByline"),
        poemBody: $("poemBody"),
        poemNotice: $("poemNotice"),
        poemWords: $("poemWords"),
        poemPoint: $("poemPoint"),
        readQuizButton: $("readQuizButton"),
        readListButton: $("readListButton"),
        quizKicker: $("quizKicker"),
        quizPoemCard: $("quizPoemCard"),
        quizPoemTitle: $("quizPoemTitle"),
        quizPoemByline: $("quizPoemByline"),
        quizPoemBody: $("quizPoemBody"),
        questionNumber: $("questionNumber"),
        questionTotal: $("questionTotal"),
        currentScore: $("currentScore"),
        progressFill: $("progressFill"),
        questionCategory: $("questionCategory"),
        questionPrompt: $("questionPrompt"),
        questionText: $("questionText"),
        choiceList: $("choiceList"),
        feedback: $("feedback"),
        feedbackTitle: $("feedbackTitle"),
        correctAnswer: $("correctAnswer"),
        explanation: $("explanation"),
        nextButton: $("nextButton"),
        afterKicker: $("afterKicker"),
        afterTitle: $("afterTitle"),
        afterByline: $("afterByline"),
        afterScore: $("afterScore"),
        afterBody: $("afterBody"),
        afterMissed: $("afterMissed"),
        afterMissedList: $("afterMissedList"),
        afterNextButton: $("afterNextButton"),
        afterListButton: $("afterListButton"),
        resultTitle: $("resultTitle"),
        finalScore: $("finalScore"),
        finalTotal: $("finalTotal"),
        resultMessage: $("resultMessage"),
        bestMessage: $("bestMessage"),
        perfectReview: $("perfectReview"),
        missedList: $("missedList"),
        restartButton: $("restartButton"),
        nextLessonButton: $("nextLessonButton"),
        lessonDetailButton: $("lessonDetailButton"),
        lessonListButton: $("lessonListButton"),
        announcer: $("announcer")
    };

    const screens = [
        elements.lessonScreen,
        elements.lessonDetailScreen,
        elements.readScreen,
        elements.quizScreen,
        elements.afterScreen,
        elements.resultScreen
    ];

    const state = {
        grade: grades[0] ? grades[0].grade : 3,
        topic: "",
        browse: null,
        lessonIndex: -1,
        poemIndex: -1,
        mode: "poem",
        questions: [],
        currentIndex: 0,
        score: 0,
        answered: false,
        hadWrong: false,
        firstWrongChoice: "",
        answers: []
    };

    // ── 저장 ─────────────────────────────────────────────────────
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

    function readProgress(key) {
        try {
            const parsed = JSON.parse(readStoredValue(key) || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
        } catch (error) {
            return {};
        }
    }

    function saveResult(key, itemId, score, total) {
        const progress = readProgress(key);
        const previous = progress[itemId];
        const best = Math.max(Number(previous?.best) || 0, score);
        progress[itemId] = { best, total, completedAt: Date.now() };
        writeStoredValue(key, JSON.stringify(progress));
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

    // ── 자료 묻기 ────────────────────────────────────────────────
    function questionsOfPoem(poemId) {
        return questionsByPoem.get(poemId) || [];
    }

    function wrapQuestionsOf(lesson) {
        if (!lesson) return [];
        return (lesson.wrapIds || [])
            .map((id) => questionById.get(id))
            .filter((question) => question && !question.poemId);
    }

    function isReady(lesson) {
        return Array.isArray(lesson.poemIds) && lesson.poemIds.length > 0;
    }

    function lessonsOfGrade(grade) {
        return lessons.filter((lesson) => lesson.grade === grade);
    }

    function currentLesson() {
        return lessons[state.lessonIndex] || null;
    }

    function orderInGradeOf(lesson) {
        return lessonsOfGrade(lesson.grade).indexOf(lesson) + 1;
    }

    function currentPoemList() {
        if (state.browse) return state.browse.poems;
        const lesson = currentLesson();
        if (!lesson) return [];
        return lesson.poemIds.map((id) => poemById.get(id)).filter(Boolean);
    }

    function currentPoem() {
        return currentPoemList()[state.poemIndex] || null;
    }

    // 문제 수는 아직 받지 않은 시도 세어야 하므로 차례표에 적어 둔 수를 쓴다.
    function poemQuestionCount(poem) {
        if (!poem) return 0;
        const loaded = questionsByPoem.get(poem.id);
        return loaded ? loaded.length : (poem.questionCount || 0);
    }

    function wrapCountOf(lesson) {
        if (!lesson) return 0;
        if (wrapLoaded) return wrapQuestionsOf(lesson).length;
        return wrapCounts[lessons.indexOf(lesson)] || 0;
    }

    function lessonQuestionCount(lesson) {
        const fromPoems = lesson.poemIds.reduce((sum, id) => sum + poemQuestionCount(poemById.get(id)), 0);
        return fromPoems + wrapCountOf(lesson);
    }

    function setScreen(activeScreen) {
        screens.forEach((screen) => screen?.classList.toggle("hidden", screen !== activeScreen));
    }

    function toTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
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

    function makeCard({ number, title, note, meta, onClick, disabled, className }) {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const numberEl = document.createElement("span");
        const copy = document.createElement("span");
        const titleEl = document.createElement("strong");
        const metaEl = document.createElement("span");

        button.type = "button";
        button.className = "lesson-card";
        if (className) button.classList.add(className);
        numberEl.className = "lesson-number";
        numberEl.textContent = number;
        copy.className = "lesson-copy";
        titleEl.textContent = title;
        copy.append(titleEl);
        if (note) {
            const noteEl = document.createElement("small");
            noteEl.textContent = note;
            copy.append(noteEl);
        }
        metaEl.className = "lesson-meta";
        metaEl.textContent = meta || "";

        if (disabled) {
            button.disabled = true;
            button.classList.add("is-pending");
        } else if (onClick) {
            button.addEventListener("click", onClick);
        }

        button.append(numberEl, copy, metaEl);
        item.append(button);
        return item;
    }

    // ── 차시 목록 ────────────────────────────────────────────────
    function renderGradeTabs() {
        const tabs = [...grades.map((item) => ({ key: item.grade, label: item.label })), { key: TOPIC_TAB, label: "소재별" }];
        elements.gradeTabs.replaceChildren(...tabs.map((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "grade-tab";
            button.textContent = item.label;
            button.setAttribute("role", "tab");
            const isActive = item.key === state.grade;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
            button.addEventListener("click", () => {
                state.grade = item.key;
                writeStoredValue(GRADE_KEY, item.key);
                renderGradeTabs();
                renderLessonList();
            });
            return button;
        }));
    }

    // ── 소재별 ───────────────────────────────────────────────────
    function renderTopicView() {
        if (!poemsByTopic.has(state.topic)) state.topic = TOPICS.find((topic) => poemsByTopic.get(topic).length > 0) || "";
        elements.topicChips.replaceChildren(...TOPICS.filter((topic) => poemsByTopic.get(topic).length > 0).map((topic) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "grade-tab";
            button.textContent = topic;
            button.classList.toggle("is-active", topic === state.topic);
            button.addEventListener("click", () => {
                state.topic = topic;
                renderTopicView();
            });
            return button;
        }));

        const list = poemsByTopic.get(state.topic) || [];
        const poemProgress = readProgress(POEM_PROGRESS_KEY);
        elements.topicPoemList.replaceChildren(...list.map((poem, index) => {
            const gradeLabel = grades.find((entry) => entry.grade === poem.grade);
            const record = poemProgress[poem.id];
            return makeCard({
                number: gradeLabel ? gradeLabel.short : "",
                title: poem.title,
                note: poem.point || "",
                meta: record ? `✓ ${record.best}/${record.total}` : poem.poet,
                className: record ? "is-done" : "",
                onClick: () => openBrowse(list, index)
            });
        }));
    }

    function openBrowse(list, index) {
        state.browse = { topic: state.topic, poems: list };
        state.lessonIndex = -1;
        openReading(index);
    }

    function renderLessonList() {
        const topicMode = state.grade === TOPIC_TAB;
        elements.topicChips.classList.toggle("hidden", !topicMode);
        elements.topicPoemList.classList.toggle("hidden", !topicMode);
        elements.lessonProgressSummary.classList.toggle("hidden", topicMode);
        elements.lessonList.classList.toggle("hidden", topicMode);
        if (topicMode) {
            renderTopicView();
            return;
        }

        const progress = readProgress(LESSON_PROGRESS_KEY);
        const poemProgress = readProgress(POEM_PROGRESS_KEY);
        const list = lessonsOfGrade(state.grade);
        const ready = list.filter(isReady);
        const done = ready.filter((lesson) => lesson.poemIds.every((id) => poemProgress[id])).length;
        elements.lessonProgressSummary.textContent = ready.length === 0
            ? "아직 준비 중이에요."
            : `${ready.length}차시 가운데 ${done}차시를 끝냈어요.`;

        elements.lessonList.replaceChildren(...list.map((lesson) => {
            const globalIndex = lessons.indexOf(lesson);
            if (!isReady(lesson)) {
                return makeCard({
                    number: `${orderInGradeOf(lesson)}차시`,
                    title: lesson.title,
                    note: lesson.note || "",
                    meta: "준비 중",
                    disabled: true
                });
            }

            const readCount = lesson.poemIds.filter((id) => poemProgress[id]).length;
            const allRead = readCount === lesson.poemIds.length;
            const record = progress[lesson.id];
            let meta = `시 ${lesson.poemIds.length}편 · 문제 ${lessonQuestionCount(lesson)}개`;
            if (readCount > 0 && !allRead) meta = `${lesson.poemIds.length}편 가운데 ${readCount}편 읽음`;
            else if (allRead) meta = record ? `✓ 마무리 ${record.best}/${record.total}` : "✓ 시를 다 읽음";

            return makeCard({
                number: `${orderInGradeOf(lesson)}차시`,
                title: lesson.title,
                note: lesson.note || "",
                meta,
                className: allRead ? (record && record.best === record.total ? "is-perfect" : "is-done") : "",
                onClick: () => openLessonDetail(globalIndex)
            });
        }));
    }

    function showLessonList() {
        state.lessonIndex = -1;
        state.poemIndex = -1;
        state.browse = null;
        const storedRaw = readStoredValue(GRADE_KEY);
        const stored = Number.parseInt(storedRaw, 10);
        if (storedRaw === TOPIC_TAB) state.grade = TOPIC_TAB;
        else if (grades.some((item) => item.grade === stored)) state.grade = stored;
        renderGradeTabs();
        renderLessonList();
        setScreen(elements.lessonScreen);
        toTop();
    }

    // ── 차시 상세 (시 목차) ──────────────────────────────────────
    function openLessonDetail(lessonIndex) {
        state.browse = null;
        state.lessonIndex = lessonIndex;
        state.poemIndex = -1;
        const lesson = currentLesson();
        if (!lesson) {
            showLessonList();
            return;
        }

        const gradeLabel = grades.find((item) => item.grade === lesson.grade);
        elements.lessonDetailKicker.textContent = `${gradeLabel ? gradeLabel.label : ""} · ${orderInGradeOf(lesson)}차시`;
        elements.lessonDetailTitle.textContent = lesson.title;
        elements.lessonDetailNote.textContent = lesson.note;

        const poemProgress = readProgress(POEM_PROGRESS_KEY);
        const poemList = currentPoemList();
        elements.lessonPoemList.replaceChildren(...poemList.map((poem, index) => {
            const record = poemProgress[poem.id];
            const count = poemQuestionCount(poem);
            return makeCard({
                number: `${index + 1}`,
                title: poem.title,
                note: poem.point || "",
                meta: record ? `✓ ${record.best}/${record.total}` : `${poem.poet} · 문제 ${count}개`,
                className: record ? (record.best === record.total ? "is-perfect" : "is-done") : "",
                onClick: () => openReading(index)
            });
        }));

        const wrapCount = wrapCountOf(lesson);
        elements.startWrapButton.classList.toggle("hidden", wrapCount === 0);
        elements.startWrapButton.textContent = `차시 마무리 문제 ${wrapCount}개`;

        setScreen(elements.lessonDetailScreen);
        toTop();
    }

    // ── 1단계 · 시 읽기 ──────────────────────────────────────────
    async function openReading(poemIndex) {
        state.poemIndex = poemIndex;
        const poem = currentPoem();
        if (poem) await loadPoem(poem);
        if (!poem) {
            showLessonList();
            return;
        }

        const list = currentPoemList();
        const lesson = currentLesson();
        elements.readKicker.textContent = state.browse
            ? `소재별 · ${state.browse.topic} · ${poemIndex + 1}/${list.length}`
            : `${orderInGradeOf(lesson)}차시 · ${lesson.title} · ${poemIndex + 1}/${list.length}`;

        elements.poemTitle.textContent = poem.title;
        elements.poemByline.textContent = bylineOf(poem);
        renderPoemLines(elements.poemBody, poem);

        const isProtected = poem.rights !== "public";
        elements.poemNotice.classList.toggle("hidden", !isProtected);
        elements.poemNotice.textContent = isProtected
            ? "아직 저작권이 살아 있는 시라 본문을 여기에 옮기지 못했어요. 교과서를 펴고 읽어 보세요."
            : "";

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
        elements.poemPoint.classList.toggle("hidden", !poem.point);

        const count = questionsOfPoem(poem.id).length;
        elements.readQuizButton.disabled = count === 0;
        elements.readQuizButton.textContent = count === 0 ? "문제 준비 중" : `문제 풀기 (${count}개)`;

        elements.announcer.textContent = `${poem.title}. ${poem.poet}.`;
        setScreen(elements.readScreen);
        toTop();
    }

    // ── 2단계 · 문제 풀기 ────────────────────────────────────────
    function buildSession(list) {
        return list.map((question) => ({ ...question, choices: shuffle(question.choices) }));
    }

    async function startQuiz(mode) {
        if (mode === "wrap") await loadWrapQuestions();
        const lesson = currentLesson();
        const poem = currentPoem();
        const source = mode === "wrap" ? wrapQuestionsOf(lesson) : questionsOfPoem(poem ? poem.id : "");
        const session = buildSession(source);
        if (session.length === 0) return;

        state.mode = mode;
        state.questions = session;
        state.currentIndex = 0;
        state.score = 0;
        state.answered = false;
        state.answers = [];

        elements.currentScore.textContent = "0";
        elements.questionTotal.textContent = String(session.length);
        elements.quizKicker.textContent = mode === "wrap"
            ? `${orderInGradeOf(lesson)}차시 마무리 · ${lesson.title}`
            : `${poem.title} · 문제`;
        elements.quizScreen.querySelector(".step-trail").classList.toggle("hidden", mode === "wrap");

        setScreen(elements.quizScreen);
        renderQuestion();
        toTop();
    }

    function renderQuizPoem(question) {
        const poem = question.poemId ? poemById.get(question.poemId) : null;
        elements.quizPoemCard.classList.toggle("hidden", !poem);
        if (!poem) return;
        elements.quizPoemTitle.textContent = poem.title;
        elements.quizPoemByline.textContent = bylineOf(poem);
        renderPoemLines(elements.quizPoemBody, poem);
        if (poem.rights !== "public") {
            const notice = document.createElement("p");
            notice.className = "poem-notice";
            notice.textContent = "교과서를 펴고 이 시를 읽은 뒤 답해 보세요.";
            elements.quizPoemBody.append(notice);
        }
    }

    function renderQuestion() {
        const question = state.questions[state.currentIndex];
        const total = state.questions.length;
        state.answered = false;
        state.hadWrong = false;
        state.firstWrongChoice = "";

        elements.questionNumber.textContent = String(state.currentIndex + 1);
        elements.progressFill.style.width = `${((state.currentIndex + 1) / total) * 100}%`;
        elements.questionCategory.textContent = question.category;
        elements.questionPrompt.textContent = question.prompt;
        elements.questionText.textContent = question.sentence;
        renderQuizPoem(question);
        elements.choiceList.replaceChildren();
        elements.feedback.classList.add("hidden");
        elements.feedback.classList.remove("is-wrong");
        elements.nextButton.textContent = state.currentIndex === total - 1
            ? (state.mode === "wrap" ? "결과 보기" : "작품 설명 보기")
            : "다음 문제";

        question.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            const number = document.createElement("span");

            button.type = "button";
            button.className = "choice-button";
            button.dataset.choice = choice;
            number.className = "choice-number";
            number.setAttribute("aria-hidden", "true");
            number.textContent = String(index + 1);
            button.append(number, document.createTextNode(choice));

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
        elements.announcer.textContent = `정답은 ${question.answer}입니다. ${question.explanation}`;
        elements.nextButton.focus({ preventScroll: true });
    }

    function goToNextQuestion() {
        if (!state.answered) return;
        if (state.currentIndex >= state.questions.length - 1) {
            if (state.mode === "wrap") showResults();
            else showAfterword();
            return;
        }
        state.currentIndex += 1;
        renderQuestion();
        toTop();
    }

    // ── 3단계 · 작품 설명 ────────────────────────────────────────
    function noteParagraphsOf(poem) {
        if (Array.isArray(poem.note) && poem.note.length > 0) return poem.note;
        if (typeof poem.note === "string" && poem.note.trim()) return [poem.note.trim()];
        return [];
    }

    function appendMissed(list, answerRecord) {
        const item = document.createElement("li");
        const poem = answerRecord.question.poemId ? poemById.get(answerRecord.question.poemId) : null;
        const sentence = document.createElement("span");
        const answer = document.createElement("span");
        const chosen = document.createElement("span");
        const explanation = document.createElement("span");

        sentence.className = "review-sentence";
        sentence.textContent = poem && list === elements.missedList
            ? `「${poem.title}」 ${answerRecord.question.sentence}`
            : answerRecord.question.sentence;
        answer.className = "review-answer";
        answer.textContent = `정답: ${answerRecord.question.answer}`;
        chosen.className = "review-chosen";
        chosen.textContent = `내가 고른 답: ${answerRecord.selectedChoice}`;
        explanation.className = "review-explanation";
        explanation.textContent = answerRecord.question.explanation;
        item.append(sentence, chosen, answer, explanation);
        list.append(item);
    }

    function showAfterword() {
        const poem = currentPoem();
        if (!poem) {
            showLessonList();
            return;
        }

        const total = state.questions.length;
        const { best, isNewBest } = saveResult(POEM_PROGRESS_KEY, poem.id, state.score, total);
        const list = currentPoemList();
        const lesson = currentLesson();

        elements.afterKicker.textContent = state.browse
            ? `소재별 · ${state.browse.topic}`
            : `${orderInGradeOf(lesson)}차시 · ${lesson.title}`;
        elements.afterTitle.textContent = `「${poem.title}」 읽고 나서`;

        elements.afterByline.textContent = `${poem.poet} 지음`;
        elements.afterScore.textContent = total > 0
            ? `문제 ${total}개 가운데 ${state.score}개를 한 번에 맞혔어요.${isNewBest && state.score > 0 ? " 지금까지 가장 잘한 기록이에요!" : ` 가장 잘한 기록은 ${best}/${total}이에요.`}`
            : "";

        const paragraphs = noteParagraphsOf(poem);
        elements.afterBody.replaceChildren(...(paragraphs.length > 0 ? paragraphs : [poem.point || ""])
            .filter(Boolean)
            .map((text) => {
                const p = document.createElement("p");
                p.textContent = text;
                return p;
            }));

        const missed = state.answers.filter((answer) => !answer.isCorrect);
        elements.afterMissedList.replaceChildren();
        missed.forEach((record) => appendMissed(elements.afterMissedList, record));
        elements.afterMissed.classList.toggle("hidden", missed.length === 0);

        const isLast = state.poemIndex >= list.length - 1;
        const wrapCount = state.browse ? 0 : wrapCountOf(lesson);
        if (!isLast) elements.afterNextButton.textContent = `다음 시 · ${list[state.poemIndex + 1].title}`;
        else if (wrapCount > 0) elements.afterNextButton.textContent = `차시 마무리 문제 ${wrapCount}개`;
        else elements.afterNextButton.textContent = "시 목록";

        setScreen(elements.afterScreen);
        elements.afterNextButton.focus({ preventScroll: true });
        toTop();
    }

    function goAfterNext() {
        const list = currentPoemList();
        if (state.poemIndex < list.length - 1) {
            openReading(state.poemIndex + 1);
            return;
        }
        const lesson = currentLesson();
        if (!state.browse && lesson && wrapCountOf(lesson) > 0) {
            startQuiz("wrap");
            return;
        }
        backToList();
    }

    function backToList() {
        if (state.browse) showLessonList();
        else if (state.lessonIndex >= 0) openLessonDetail(state.lessonIndex);
        else showLessonList();
    }

    // ── 차시 마무리 결과 ─────────────────────────────────────────
    function getResultMessage(score, total) {
        const playerName = getPlayerName();
        const subject = playerName ? `${playerName} 님, ` : "";
        const ratio = total > 0 ? score / total : 0;
        if (score === total) return `${subject}완벽해요! 시를 아주 잘 읽었어요.`;
        if (ratio >= 0.8) return `${subject}훌륭해요! 거의 다 짚어 냈어요.`;
        if (ratio >= 0.6) return `${subject}좋아요! 헷갈린 시만 다시 읽어 봐요.`;
        return `${subject}괜찮아요. 시를 한 번 더 읽고 도전해 봐요.`;
    }

    function showResults() {
        const lesson = currentLesson();
        if (!lesson) {
            showLessonList();
            return;
        }
        const total = state.questions.length;
        const missed = state.answers.filter((answer) => !answer.isCorrect);
        elements.finalScore.textContent = String(state.score);
        elements.finalTotal.textContent = String(total);
        elements.resultMessage.textContent = getResultMessage(state.score, total);
        elements.missedList.replaceChildren();
        missed.forEach((record) => appendMissed(elements.missedList, record));
        elements.perfectReview.classList.toggle("hidden", missed.length !== 0);
        elements.missedList.classList.toggle("hidden", missed.length === 0);

        const gradeList = lessonsOfGrade(lesson.grade);
        const nextLesson = gradeList[gradeList.indexOf(lesson) + 1];
        const { best, isNewBest } = saveResult(LESSON_PROGRESS_KEY, lesson.id, state.score, total);
        elements.resultTitle.textContent = `${orderInGradeOf(lesson)}차시 · ${lesson.title}`;
        elements.bestMessage.textContent = isNewBest
            ? `이 차시 최고 기록이에요! ${best}/${total}`
            : `이 차시 최고 기록 ${best}/${total}`;
        elements.nextLessonButton.classList.toggle("hidden", !nextLesson || !isReady(nextLesson));

        setScreen(elements.resultScreen);
        elements.restartButton.focus({ preventScroll: true });
        toTop();
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
        openLessonDetail(lessons.indexOf(nextLesson));
    }

    // ── 손놀림 ───────────────────────────────────────────────────
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

    // 뒤로 가기는 한 단계씩만 물러난다. 차시 목록에서만 사이트 메인으로 나간다.
    function handleBackNavigation(event) {
        const step = (run) => {
            event?.preventDefault();
            run();
        };
        if (!elements.readScreen.classList.contains("hidden")) return step(backToList);
        if (!elements.quizScreen.classList.contains("hidden")) {
            return step(() => {
                if (state.mode === "wrap") backToList();
                else openReading(state.poemIndex);
            });
        }
        if (!elements.afterScreen.classList.contains("hidden")) return step(backToList);
        if (!elements.resultScreen.classList.contains("hidden")) return step(backToList);
        if (!elements.lessonDetailScreen.classList.contains("hidden")) return step(showLessonList);
        // 차시 목록에서는 사이트 메인 링크 동작을 그대로 둔다.
    }

    elements.readQuizButton.addEventListener("click", () => startQuiz("poem"));
    elements.readListButton.addEventListener("click", backToList);
    elements.startWrapButton.addEventListener("click", () => startQuiz("wrap"));
    elements.nextButton.addEventListener("click", goToNextQuestion);
    elements.afterNextButton.addEventListener("click", goAfterNext);
    elements.afterListButton.addEventListener("click", backToList);
    elements.restartButton.addEventListener("click", () => startQuiz("wrap"));
    elements.nextLessonButton.addEventListener("click", goToNextLesson);
    elements.lessonDetailButton.addEventListener("click", backToList);
    elements.lessonListButton.addEventListener("click", showLessonList);
    document.addEventListener("keydown", handleKeyboard);

    elements.backLink?.addEventListener("click", handleBackNavigation);
    window.addEventListener("sitebackrequest", handleBackNavigation);

    showLessonList();
})();
