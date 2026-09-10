(() => {
    "use strict";

    const PLAYER_NAME_KEY = "classPlayerName";
    const POEM_PROGRESS_KEY = "poetryPoemProgressV1";

    // 처음에는 제목·시인·소재만 있는 차례표를 받는다.
    // 본문과 낱말, 작품 설명, 그 시의 문제는 시를 열 때 poems/<아이디>.js로 받아 여기에 채운다.
    const poems = Array.isArray(window.POETRY_POEM_INDEX) ? window.POETRY_POEM_INDEX : [];
    const poemById = new Map(poems.map((poem) => [poem.id, poem]));
    // 시집 차례표. 학년 표시는 없다 — 배열 순서가 곧 "차례대로" 읽는 순서다.
    const books = Array.isArray(window.POETRY_BOOKS) ? window.POETRY_BOOKS : [];

    const questionsByPoem = new Map();

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
        return poem;
    }

    // 소재로 고르는 문. "소재로 찾기" 갈래에서 쓴다.
    const TOPICS = ["봄", "여름", "가을", "겨울", "가족", "동물", "밤과 달", "고향",
        "그리움", "이별", "자연", "다짐", "시대", "나라", "사랑", "옛이야기", "놀이", "기다림"];
    const poemsByTopic = new Map(TOPICS.map((topic) => [topic, poems.filter((poem) => (poem.topics || []).includes(topic))]));

    const $ = (id) => document.getElementById(id);
    const elements = {
        backLink: document.querySelector(".back-link"),
        shelfScreen: $("shelfScreen"),
        bookScreen: $("bookScreen"),
        readScreen: $("readScreen"),
        quizScreen: $("quizScreen"),
        afterScreen: $("afterScreen"),
        orderTabBtn: $("orderTabBtn"),
        topicTabBtn: $("topicTabBtn"),
        orderView: $("orderView"),
        topicView: $("topicView"),
        continueBar: $("continueBar"),
        continueButton: $("continueButton"),
        bookShelf: $("bookShelf"),
        topicChips: $("topicChips"),
        topicPoemList: $("topicPoemList"),
        bookTitle: $("bookTitle"),
        bookNote: $("bookNote"),
        bookPoemList: $("bookPoemList"),
        bookShelfButton: $("bookShelfButton"),
        readKicker: $("readKicker"),
        poemTitle: $("poemTitle"),
        poemByline: $("poemByline"),
        versionToggle: $("versionToggle"),
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
        announcer: $("announcer")
    };

    const screens = [
        elements.shelfScreen,
        elements.bookScreen,
        elements.readScreen,
        elements.quizScreen,
        elements.afterScreen
    ];

    const state = {
        shelfMode: "order",
        topic: "",
        browse: null,
        bookIndex: -1,
        poemIndex: -1,
        version: "original",
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

    function isReady(book) {
        return Array.isArray(book.poemIds) && book.poemIds.length > 0;
    }

    function orderOf(book) {
        return books.indexOf(book) + 1;
    }

    function currentBook() {
        return books[state.bookIndex] || null;
    }

    function currentPoemList() {
        if (state.browse) return state.browse.poems;
        const book = currentBook();
        if (!book) return [];
        return book.poemIds.map((id) => poemById.get(id)).filter(Boolean);
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

    function setScreen(activeScreen) {
        screens.forEach((screen) => screen?.classList.toggle("hidden", screen !== activeScreen));
    }

    function toTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ── 시 그리기 ────────────────────────────────────────────────
    function activeLines(poem) {
        if (state.version === "modern" && Array.isArray(poem.modern) && poem.modern.length > 0) return poem.modern;
        return poem.lines || [];
    }

    function renderPoemLines(container, lines) {
        container.replaceChildren();
        let stanza = document.createElement("p");
        stanza.className = "poem-stanza";
        lines.forEach((line) => {
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

    function renderReadingPoem() {
        const poem = currentPoem();
        if (!poem) return;
        // 권리 분류는 자료 관리용 메타데이터다. 본문 표시 여부는 실제로
        // 등록된 줄이 있는지로 결정한다. 허락받거나 직접 입력한 본문까지
        // rights 값 하나로 숨기지 않는다.
        renderPoemLines(elements.poemBody, activeLines(poem));
    }

    function bylineOf(poem) {
        return poem.poet;
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

    function makeBookCard(book, poemProgress) {
        const button = document.createElement("button");
        const cover = document.createElement("span");
        const titleWrap = document.createElement("span");
        const numberEl = document.createElement("b");
        const titleText = document.createTextNode(book.title);

        button.type = "button";
        button.className = "book-card";

        const readCount = book.poemIds.filter((id) => poemProgress[id]).length;
        const allRead = readCount === book.poemIds.length;
        if (allRead) button.classList.add("is-done");

        cover.className = "book-cover";
        cover.textContent = book.title;

        titleWrap.className = "book-title";
        numberEl.textContent = `${orderOf(book)}권`;
        titleWrap.append(numberEl, titleText);

        button.append(cover, titleWrap);
        button.addEventListener("click", () => {
            state.browse = null;
            openBookDetail(books.indexOf(book));
        });
        return button;
    }

    // ── 이어서 읽기 ──────────────────────────────────────────────
    function findResumePoint() {
        const progress = readProgress(POEM_PROGRESS_KEY);
        for (let bi = 0; bi < books.length; bi += 1) {
            const book = books[bi];
            if (!isReady(book)) continue;
            for (let pi = 0; pi < book.poemIds.length; pi += 1) {
                if (!progress[book.poemIds[pi]]) return { bookIndex: bi, poemIndex: pi };
            }
        }
        return null;
    }

    function renderContinueBar() {
        if (elements.continueBar) {
            elements.continueBar.classList.add("hidden");
        }
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
            const record = poemProgress[poem.id];
            return makeCard({
                number: "",
                title: poem.title,
                note: poem.point || "",
                meta: record ? `✓ ${record.best}/${record.total}` : poem.poet,
                className: record ? "is-done" : "",
                onClick: () => openBrowse(list, index)
            });
        }));
    }

    function openBrowseUnlocked(list, index) {
        state.browse = { topic: state.topic, poems: list };
        state.bookIndex = -1;
        return openReadingUnlocked(index);
    }

    function openBrowse(list, index) {
        return guardedNav(() => openBrowseUnlocked(list, index));
    }

    function setShelfMode(mode) {
        state.shelfMode = mode;
        elements.orderTabBtn.classList.toggle("is-active", mode === "order");
        elements.orderTabBtn.setAttribute("aria-selected", mode === "order" ? "true" : "false");
        elements.topicTabBtn.classList.toggle("is-active", mode === "topic");
        elements.topicTabBtn.setAttribute("aria-selected", mode === "topic" ? "true" : "false");
        elements.orderView.classList.toggle("hidden", mode !== "order");
        elements.topicView.classList.toggle("hidden", mode !== "topic");
        elements.continueBar.classList.toggle("hidden", mode !== "order");
        if (mode === "order") {
            renderBookShelf();
            renderContinueBar();
        } else {
            renderTopicView();
        }
    }

    function renderBookShelf() {
        const poemProgress = readProgress(POEM_PROGRESS_KEY);
        elements.bookShelf.replaceChildren(...books.filter(isReady).map((book) => makeBookCard(book, poemProgress)));
    }

    function showShelfUnlocked(mode) {
        state.bookIndex = -1;
        state.poemIndex = -1;
        state.browse = null;
        setShelfMode(mode || state.shelfMode || "order");
        setScreen(elements.shelfScreen);
        toTop();
    }

    function showShelf(mode) {
        return guardedNav(() => showShelfUnlocked(mode));
    }

    // ── 책 목차 ──────────────────────────────────────────────────
    function openBookDetailUnlocked(bookIndex) {
        state.browse = null;
        state.bookIndex = bookIndex;
        state.poemIndex = -1;
        const book = currentBook();
        if (!book) {
            showShelfUnlocked();
            return;
        }

        elements.bookTitle.textContent = `${orderOf(book)}권 · ${book.title}`;
        elements.bookNote.textContent = book.note;

        const poemProgress = readProgress(POEM_PROGRESS_KEY);
        const poemList = currentPoemList();
        elements.bookPoemList.replaceChildren(...poemList.map((poem, index) => {
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

        setScreen(elements.bookScreen);
        toTop();
    }

    function openBookDetail(bookIndex) {
        return guardedNav(() => openBookDetailUnlocked(bookIndex));
    }

    // ── 1단계 · 시 읽기 ──────────────────────────────────────────
    // 화면 전환은 전부 이 잠금 하나를 거쳐야 한다. 다음 시를 받는 동안(await) 같은 자리를
    // 두 번 눌러도, 두 번째 누름이 첫 번째가 아직 안 바꾼 자리를 잘못 짚어 건너뛰는 일이 없도록.
    let navBusy = false;
    async function guardedNav(run) {
        if (navBusy) return;
        navBusy = true;
        try {
            await run();
        } finally {
            navBusy = false;
        }
    }

    function openReading(poemIndex) {
        return guardedNav(() => openReadingUnlocked(poemIndex));
    }

    async function openReadingUnlocked(poemIndex) {
        state.poemIndex = poemIndex;
        state.version = "original";
        const poem = currentPoem();
        if (poem) await loadPoem(poem);
        if (!poem) {
            showShelfUnlocked();
            return;
        }

        const list = currentPoemList();
        const book = currentBook();
        elements.readKicker.textContent = state.browse
            ? `소재별 · ${state.browse.topic} · ${poemIndex + 1}/${list.length}`
            : `${orderOf(book)}권 · ${book.title} · ${poemIndex + 1}/${list.length}`;

        elements.poemTitle.textContent = poem.title;
        elements.poemByline.textContent = bylineOf(poem);

        const hasModern = Array.isArray(poem.modern) && poem.modern.length > 0;
        elements.versionToggle.classList.toggle("hidden", !hasModern);
        elements.versionToggle.querySelectorAll(".version-btn").forEach((button) => {
            button.classList.toggle("is-active", button.dataset.version === state.version);
        });

        renderReadingPoem();

        const hasLines = activeLines(poem).length > 0;
        elements.poemNotice.classList.toggle("hidden", hasLines);
        elements.poemNotice.textContent = hasLines ? "" : "본문을 준비하고 있어요.";

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

    function setVersion(nextVersion) {
        if (state.version === nextVersion) return;
        state.version = nextVersion;
        elements.versionToggle.querySelectorAll(".version-btn").forEach((button) => {
            button.classList.toggle("is-active", button.dataset.version === nextVersion);
        });
        renderReadingPoem();
    }

    // ── 2단계 · 문제 풀기 ────────────────────────────────────────
    function buildSession(list) {
        return list.map((question) => ({ ...question, choices: shuffle(question.choices) }));
    }

    function startQuiz() {
        const poem = currentPoem();
        const session = buildSession(questionsOfPoem(poem ? poem.id : ""));
        if (session.length === 0) return;

        state.questions = session;
        state.currentIndex = 0;
        state.score = 0;
        state.answered = false;
        state.answers = [];

        elements.currentScore.textContent = "0";
        elements.questionTotal.textContent = String(session.length);
        elements.quizKicker.textContent = `「${poem.title}」 · 문제`;

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
        if (poem.rights !== "public") {
            elements.quizPoemBody.replaceChildren();
            const notice = document.createElement("p");
            notice.className = "poem-notice";
            notice.textContent = "교과서를 펴고 이 시를 읽은 뒤 답해 보세요.";
            elements.quizPoemBody.append(notice);
        } else {
            renderPoemLines(elements.quizPoemBody, poem.lines || []);
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
        elements.nextButton.textContent = state.currentIndex === total - 1 ? "작품 설명 보기" : "다음 문제";

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
            showAfterword();
            return;
        }
        state.currentIndex += 1;
        renderQuestion();
        toTop();
    }

    // ── 3단계 · 작품 설명 ────────────────────────────────────────
    function noteParagraphsOf(poem) {
        const raw = Array.isArray(poem.note) && poem.note.length > 0
            ? poem.note
            : (typeof poem.note === "string" && poem.note.trim() ? [poem.note.trim()] : []);
        return raw.filter((text) => !text.includes("저작권") && !text.includes("옮기지 못했"));
    }

    function appendMissed(list, answerRecord) {
        const item = document.createElement("li");
        const sentence = document.createElement("span");
        const answer = document.createElement("span");
        const chosen = document.createElement("span");
        const explanation = document.createElement("span");

        sentence.className = "review-sentence";
        sentence.textContent = answerRecord.question.sentence;
        answer.className = "review-answer";
        answer.textContent = `정답: ${answerRecord.question.answer}`;
        chosen.className = "review-chosen";
        chosen.textContent = `내가 고른 답: ${answerRecord.selectedChoice}`;
        explanation.className = "review-explanation";
        explanation.textContent = answerRecord.question.explanation;
        item.append(sentence, chosen, answer, explanation);
        list.append(item);
    }

    // 이 시가 지금 읽는 줄에서 마지막 시인지, 다음은 무엇인지를 미리 정한다.
    function nextStopAfter() {
        const list = currentPoemList();
        if (state.poemIndex < list.length - 1) {
            return { kind: "poem", label: `다음 시 · ${list[state.poemIndex + 1].title}` };
        }
        if (state.browse) {
            return { kind: "shelf-topic", label: "소재 목록으로" };
        }
        const nextBookIndex = state.bookIndex + 1;
        const nextBook = books[nextBookIndex];
        if (nextBook && isReady(nextBook)) {
            return { kind: "book", bookIndex: nextBookIndex, label: `다음 책 · ${nextBook.title}` };
        }
        return { kind: "shelf-order", label: "책장으로" };
    }

    function showAfterword() {
        const poem = currentPoem();
        if (!poem) {
            showShelf();
            return;
        }

        const total = state.questions.length;
        const { best, isNewBest } = saveResult(POEM_PROGRESS_KEY, poem.id, state.score, total);
        const book = currentBook();

        elements.afterKicker.textContent = state.browse
            ? `소재별 · ${state.browse.topic}`
            : `${orderOf(book)}권 · ${book.title}`;
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

        elements.afterNextButton.textContent = nextStopAfter().label;
        elements.afterListButton.textContent = state.browse ? "소재 목록" : "책 목차";

        setScreen(elements.afterScreen);
        elements.afterNextButton.focus({ preventScroll: true });
        toTop();
    }

    // 다음 자리를 정하는 일과 그리로 옮겨 가는 일을 한 잠금 안에서 함께 한다.
    // 따로 하면, 두 번 눌렀을 때 두 번째 누름이 첫 번째가 아직 옮기지 않은 자리를 보고
    // 다음 자리를 잘못 짚어 시 한 편을 건너뛸 수 있다.
    function goAfterNext() {
        return guardedNav(() => {
            const stop = nextStopAfter();
            if (stop.kind === "poem") {
                return openReadingUnlocked(state.poemIndex + 1);
            }
            if (stop.kind === "book") {
                state.browse = null;
                state.bookIndex = stop.bookIndex;
                return openReadingUnlocked(0);
            }
            if (stop.kind === "shelf-topic") {
                return showShelfUnlocked("topic");
            }
            return showShelfUnlocked("order");
        });
    }

    function backToListUnlocked() {
        if (state.browse) return showShelfUnlocked("topic");
        if (state.bookIndex >= 0) return openBookDetailUnlocked(state.bookIndex);
        return showShelfUnlocked();
    }

    function backToList() {
        return guardedNav(() => backToListUnlocked());
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

    // 뒤로 가기는 한 단계씩만 물러난다. 책장에서만 사이트 메인으로 나간다.
    function handleBackNavigation(event) {
        const step = (run) => {
            event?.preventDefault();
            run();
        };
        if (!elements.readScreen.classList.contains("hidden")) return step(backToList);
        if (!elements.quizScreen.classList.contains("hidden")) return step(() => openReading(state.poemIndex));
        if (!elements.afterScreen.classList.contains("hidden")) return step(backToList);
        if (!elements.bookScreen.classList.contains("hidden")) return step(() => showShelf());
        // 책장에서는 사이트 메인 링크 동작을 그대로 둔다.
    }

    elements.orderTabBtn.addEventListener("click", () => setShelfMode("order"));
    elements.topicTabBtn.addEventListener("click", () => setShelfMode("topic"));
    elements.bookShelfButton.addEventListener("click", () => showShelf());
    elements.versionToggle.addEventListener("click", (event) => {
        const button = event.target.closest(".version-btn");
        if (button) setVersion(button.dataset.version);
    });
    elements.readQuizButton.addEventListener("click", startQuiz);
    elements.readListButton.addEventListener("click", backToList);
    elements.nextButton.addEventListener("click", goToNextQuestion);
    elements.afterNextButton.addEventListener("click", goAfterNext);
    elements.afterListButton.addEventListener("click", backToList);
    document.addEventListener("keydown", handleKeyboard);

    elements.backLink?.addEventListener("click", handleBackNavigation);
    window.addEventListener("sitebackrequest", handleBackNavigation);

    showShelf("order");
})();
