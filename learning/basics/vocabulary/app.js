(function vocabularyStudyApp() {
    "use strict";

    const DATA_URL = "assets/data/english-vocabulary-3000-v2.json";
    const IMAGE_MANIFEST_URL = "assets/data/vocabulary-word-images-v1.json";
    const SPELLING_GAME_URL = "assets/data/vocabulary-spelling-game-v1.json";
    const IMAGE_BASE_URL = "assets/images/";
    const PROGRESS_KEY = "englishVocabulary3000ProgressV1";
    const IMAGE_PREFERENCE_KEY = "englishVocabularyImagesVisibleV1";
    const SPELLING_WRONG_KEY = "englishVocabularySpellingWrongV1";
    const GAME_TIME_LIMIT = 15;
    const STAGES = [
        { code: "elementary", name: "Beginner", range: "Good for elementary school", description: "800 words · LEVEL 01-04", levels: [1, 2, 3, 4] },
        { code: "middle_common", name: "Intermediate", range: "Good for middle and high school", description: "1,200 words · LEVEL 05-10", levels: [5, 6, 7, 8, 9, 10] },
        { code: "advanced", name: "Advanced", range: "Extra challenge", description: "1,000 words · LEVEL 11-15", levels: [11, 12, 13, 14, 15] },
    ];
    const STAGE_NAMES = Object.fromEntries(STAGES.map((stage) => [stage.code, stage.name]));
    const POS_NAMES = {
        "명사": "noun", "동사": "verb", "형용사": "adjective", "부사": "adverb",
        "대명사": "pronoun", "전치사": "preposition", "접속사": "conjunction",
        "감탄사": "exclamation", "관사": "article", "한정사": "determiner", "수사": "number",
    };
    const RELATED_TYPE_NAMES = {
        "유의어": "similar", "반의어": "opposite", "관련어": "related", "파생어": "word family",
        "다른 표기": "other spelling", "변화형": "word form",
    };

    function levelName(level) {
        return `Level ${level}`;
    }

    const core = window.VocabularyCore;
    const elements = Object.fromEntries([
        "levelScreen", "studyScreen", "stageGroups", "loadingState", "toast",
        "totalKnown", "overallPercent", "overallBar", "totalStudied", "totalUnknown", "backToLevels",
        "shuffleButton", "imageToggleButton", "studyStage", "studyTitle", "cardPosition", "levelStatus", "sessionBar",
        "flashcard", "cardBadge", "wordText", "posText", "meaningText", "exampleBlock", "exampleLabel", "exampleText",
        "exampleKo", "relatedBlock", "relatedWords", "answerLayout", "wordImageBlock", "wordImage",
        "previousButton", "speakButton", "exampleSpeakButton",
        "nextButton", "unknownButton", "knownButton", "reviewUnknownButton", "studyMessage",
        "gameStartButton", "gameWordCount", "gameScreen", "backFromGame", "gameLevelButtons",
        "gameQuestionNumber", "gameScore", "gameStreak", "gameTimer", "gameTimerBar",
        "gameWord", "gameSpeakButton", "gameChoices", "gameFeedback", "gameNextButton", "gameResetButton",
        "gameQuestionPanel", "gameResultPanel", "gameResultScore", "gameResultAccuracy",
        "gameResultBestStreak", "gameWrongList", "gameRetryWrongButton", "gamePlayAgainButton",
        "spellingGameStartButton", "spellingWordCount", "spellingScreen", "backFromSpelling",
        "spellingResetButton", "spellingLevelButtons", "spellingQuestionNumber", "spellingScore",
        "spellingStreak", "spellingQuestionPanel", "spellingImage", "spellingHint", "spellingInput", "spellingBuiltWord", "spellingTileRack",
        "spellingHintButton", "spellingSpeakButton", "spellingCheckButton", "spellingFeedback",
        "spellingNextButton", "spellingResultPanel", "spellingResultScore", "spellingResultAccuracy",
        "spellingResultBestStreak", "spellingWrongList", "spellingRetryWrongButton", "spellingPlayAgainButton",
        "spellingReviewButton", "spellingStoredWrongCount", "spellingModeLabel", "spellingTitle",
    ].map((id) => [id, document.getElementById(id)]));

    const state = {
        data: null,
        imageMap: new Map(),
        levels: new Map(),
        progress: loadProgress(),
        currentLevel: null,
        currentWords: [],
        currentIndex: 0,
        revealed: false,
        unknownOnly: false,
        showImages: localStorage.getItem(IMAGE_PREFERENCE_KEY) !== "false",
        gameLevel: 0,
        gamePool: [],
        gameTargetPool: [],
        gameTarget: null,
        gameChoices: [],
        gamePreviousId: null,
        gameRoundLength: 10,
        gameAskedIds: new Set(),
        gameWrongWords: [],
        gameQuestionNumber: 0,
        gameScore: 0,
        gameStreak: 0,
        gameBestStreak: 0,
        gameTimeLeft: GAME_TIME_LIMIT,
        gameAnswered: false,
        gameHadWrong: false,
        gameTimerId: null,
        spellingIds: new Set(),
        spellingLevel: 0,
        spellingPool: [],
        spellingTargetPool: [],
        spellingTarget: null,
        spellingRoundLength: 10,
        spellingAskedIds: new Set(),
        spellingWrongEntries: [],
        spellingQuestionNumber: 0,
        spellingScore: 0,
        spellingStreak: 0,
        spellingBestStreak: 0,
        spellingAnswered: false,
        spellingWrongProgress: loadSpellingWrongProgress(),
        spellingReviewMode: false,
    };

    function loadProgress() {
        try {
            return core.normalizeProgress(JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"));
        } catch {
            return {};
        }
    }

    function saveProgress() {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
    }

    function loadSpellingWrongProgress() {
        try {
            const stored = JSON.parse(localStorage.getItem(SPELLING_WRONG_KEY) || "{}");
            if (!stored || typeof stored !== "object" || Array.isArray(stored)) return {};
            const normalized = {};
            Object.entries(stored).forEach(([id, entry]) => {
                if (!/^\d+$/.test(id) || !entry || typeof entry !== "object") return;
                normalized[id] = {
                    count: Math.max(1, Number(entry.count) || 1),
                    lastAnswer: typeof entry.lastAnswer === "string" ? entry.lastAnswer : "",
                    updatedAt: typeof entry.updatedAt === "string" ? entry.updatedAt : "",
                };
            });
            return normalized;
        } catch {
            return {};
        }
    }

    function saveSpellingWrongProgress() {
        localStorage.setItem(SPELLING_WRONG_KEY, JSON.stringify(state.spellingWrongProgress));
    }

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add("show");
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 1800);
    }

    function renderOverallProgress() {
        if (!state.data) return;
        const summary = core.summarizeWords(state.data.words, state.progress);
        const studied = summary.known + summary.unknown;
        const percent = Math.round((summary.known / state.data.totalWords) * 100);
        elements.totalKnown.textContent = summary.known.toLocaleString("ko-KR");
        elements.totalStudied.textContent = studied.toLocaleString("ko-KR");
        elements.totalUnknown.textContent = summary.unknown.toLocaleString("ko-KR");
        elements.overallPercent.textContent = `${percent}%`;
        elements.overallBar.style.width = `${percent}%`;
    }

    function createLevelButton(level, words) {
        const summary = core.summarizeWords(words, state.progress);
        const percent = Math.round((summary.known / words.length) * 100);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `level-button ${core.stageClass(words[0].stageCode)}`;
        button.setAttribute("aria-label", `${levelName(level)}, ${summary.known} words learned`);
        button.innerHTML = `
            <span class="level-number">LEVEL ${String(level).padStart(2, "0")}</span>
            <strong class="level-name">${levelName(level)}</strong>
            <span class="level-progress" aria-hidden="true"><span style="width:${percent}%"></span></span>
            <span class="level-count">Know ${summary.known} · Review ${summary.unknown}</span>
        `;
        button.addEventListener("click", () => openLevel(level));
        return button;
    }

    function renderLevelGroups() {
        elements.stageGroups.replaceChildren();
        STAGES.forEach((stage) => {
            const section = document.createElement("section");
            section.className = "stage-group";
            section.innerHTML = `
                <div class="stage-heading">
                    <span>${stage.range}</span>
                    <h2>${stage.name}</h2>
                    <p>${stage.description}</p>
                </div>
            `;
            const grid = document.createElement("div");
            grid.className = "level-grid";
            stage.levels.forEach((level) => grid.appendChild(createLevelButton(level, state.levels.get(level))));
            section.appendChild(grid);
            elements.stageGroups.appendChild(section);
        });
    }

    function openLevel(level, options = {}) {
        const baseWords = state.levels.get(level) || [];
        const unknownOnly = Boolean(options.unknownOnly);
        const unknownWords = baseWords.filter((word) => state.progress[String(word.id)]?.status === "unknown");
        if (unknownOnly && !unknownWords.length) {
            showToast("No words are marked ‘Not yet’ in this level.");
            return;
        }
        state.currentLevel = level;
        state.unknownOnly = unknownOnly;
        state.currentWords = unknownOnly ? unknownWords : [...baseWords];
        state.currentIndex = 0;
        state.revealed = false;
        elements.levelScreen.hidden = true;
        elements.studyScreen.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderStudyCard();
    }

    function currentWord() {
        return state.currentWords[state.currentIndex] || null;
    }

    function updateRevealState() {
        const word = currentWord();
        if (!word) return;
        elements.flashcard.classList.toggle("revealed", state.revealed);
        elements.flashcard.setAttribute("aria-pressed", String(state.revealed));
        elements.flashcard.setAttribute(
            "aria-label",
            state.revealed ? `${word.word}, meaning and example shown` : `${word.word}, tap to see the meaning and example`,
        );
        elements.meaningText.setAttribute("aria-hidden", String(!state.revealed));
        elements.exampleBlock.setAttribute("aria-hidden", String(!state.revealed));
        elements.relatedBlock.setAttribute("aria-hidden", String(!state.revealed || elements.relatedBlock.hidden));
        elements.wordImageBlock.setAttribute("aria-hidden", String(!state.revealed || elements.wordImageBlock.hidden));
        elements.exampleSpeakButton.disabled = !state.revealed || !word.example?.en;
    }

    function updateImagePreference() {
        elements.imageToggleButton.textContent = state.showImages ? "Pictures on" : "Pictures off";
        elements.imageToggleButton.setAttribute("aria-pressed", String(state.showImages));
    }

    function renderWordImage(word) {
        const image = state.showImages ? state.imageMap.get(String(word.id)) : null;
        elements.wordImageBlock.hidden = !image;
        elements.answerLayout.classList.toggle("has-image", Boolean(image));
        if (!image) {
            elements.wordImage.removeAttribute("src");
            return;
        }
        elements.wordImage.src = `${IMAGE_BASE_URL}${image.file}`;
    }

    function renderStudyCard() {
        const word = currentWord();
        if (!word) return;
        const status = state.progress[String(word.id)]?.status || "unseen";
        const baseWords = state.levels.get(state.currentLevel) || [];
        const summary = core.summarizeWords(baseWords, state.progress);
        const completion = Math.round(((state.currentIndex + 1) / state.currentWords.length) * 100);

        elements.studyStage.textContent = STAGE_NAMES[word.stageCode] || word.stage;
        elements.studyTitle.textContent = state.unknownOnly ? `${levelName(word.globalLevel)} · Review` : levelName(word.globalLevel);
        elements.cardPosition.textContent = `${state.currentIndex + 1} / ${state.currentWords.length}`;
        elements.levelStatus.textContent = `Know ${summary.known} · Review ${summary.unknown}`;
        elements.sessionBar.style.width = `${completion}%`;
        elements.wordText.textContent = word.word;
        elements.posText.textContent = word.pos.map((pos) => POS_NAMES[pos] || pos).join(" · ");
        elements.meaningText.textContent = word.meanings.join(" · ");
        renderWordImage(word);
        elements.exampleBlock.hidden = !word.example;
        elements.exampleLabel.textContent = "Example";
        elements.exampleText.textContent = word.example?.en || "";
        elements.exampleKo.textContent = word.example?.ko || "";
        const related = word.relatedWords || [
            ...word.alternate.map((relatedWord) => ({ word: relatedWord, type: "other spelling" })),
            ...word.relatedForms.map((relatedWord) => ({ word: relatedWord, type: "word form" })),
        ];
        elements.relatedWords.replaceChildren(...related.map((relatedWord) => {
            const chip = document.createElement("span");
            chip.className = "related-word";
            const label = document.createElement("span");
            label.textContent = relatedWord.word;
            const type = document.createElement("small");
            type.textContent = RELATED_TYPE_NAMES[relatedWord.type] || relatedWord.type;
            chip.append(label, type);
            return chip;
        }));
        elements.relatedBlock.hidden = related.length === 0;
        elements.cardBadge.textContent = status === "known" ? "Learned" : status === "unknown" ? "Review" : "New";
        elements.cardBadge.className = `card-badge ${status === "unseen" ? "" : status}`.trim();
        updateRevealState();
        elements.previousButton.disabled = state.currentIndex === 0;
        elements.nextButton.disabled = state.currentIndex === state.currentWords.length - 1;
        elements.studyMessage.textContent = state.unknownOnly ? "Reviewing words marked ‘Not yet’." : "Tap the card or press Space to see more.";
    }

    function toggleMeaning() {
        state.revealed = !state.revealed;
        updateRevealState();
    }

    function moveCard(direction) {
        const nextIndex = Math.max(0, Math.min(state.currentWords.length - 1, state.currentIndex + direction));
        if (nextIndex === state.currentIndex) return;
        state.currentIndex = nextIndex;
        state.revealed = false;
        renderStudyCard();
    }

    function markWord(status) {
        const word = currentWord();
        if (!word) return;
        state.progress[String(word.id)] = { status, updatedAt: new Date().toISOString() };
        saveProgress();
        renderOverallProgress();
        if (state.currentIndex < state.currentWords.length - 1) {
            moveCard(1);
        } else {
            renderStudyCard();
            showToast(status === "known" ? "You learned the last word!" : "You checked the last word.");
        }
    }

    function speakText(text, rate = 0.85) {
        if (!text || !("speechSynthesis" in window)) {
            showToast("Sound is not available in this browser.");
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    }

    function speakCurrentWord() {
        speakText(currentWord()?.word);
    }

    function speakCurrentExample() {
        speakText(currentWord()?.example?.en, 0.78);
    }

    function shuffleCurrentLevel() {
        state.currentWords = core.shuffleWords(state.currentWords);
        state.currentIndex = 0;
        state.revealed = false;
        renderStudyCard();
        showToast("Words shuffled!");
    }

    function backToLevels() {
        elements.studyScreen.hidden = true;
        elements.levelScreen.hidden = false;
        renderLevelGroups();
        renderOverallProgress();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function clearGameTimer() {
        if (state.gameTimerId) clearInterval(state.gameTimerId);
        state.gameTimerId = null;
    }

    function updateGameStats() {
        elements.gameQuestionNumber.textContent = String(Math.max(1, state.gameQuestionNumber));
        elements.gameScore.textContent = String(state.gameScore);
        elements.gameStreak.textContent = String(state.gameStreak);
        elements.gameTimer.textContent = String(state.gameTimeLeft);
        elements.gameTimerBar.style.width = `${Math.max(0, (state.gameTimeLeft / GAME_TIME_LIMIT) * 100)}%`;
        elements.gameTimerBar.classList.toggle("urgent", state.gameTimeLeft <= 5);
    }

    function answerGame(selectedId, timedOut = false) {
        if (state.gameAnswered || !state.gameTarget) return;
        const targetId = String(state.gameTarget.id);
        const isCorrect = String(selectedId) === targetId;
        if (!isCorrect) {
            state.gameHadWrong = true;
            if (!state.gameWrongWords.some((word) => String(word.id) === targetId)) state.gameWrongWords.push(state.gameTarget);
            if (!timedOut) {
                const selected = elements.gameChoices.querySelector(`[data-word-id="${selectedId}"]`);
                if (selected) { selected.classList.add("incorrect"); selected.disabled = true; }
            }
            elements.gameFeedback.textContent = timedOut
                ? "Time is up. Look again and pick the right picture."
                : "Try again. Pick a different picture.";
            elements.gameFeedback.className = "game-feedback incorrect";
            if (timedOut) startGameTimer();
            return;
        }
        state.gameAnswered = true;
        clearGameTimer();
        if (isCorrect) {
            if (!state.gameHadWrong) state.gameScore += 1;
            state.gameStreak += 1;
            state.gameBestStreak = Math.max(state.gameBestStreak, state.gameStreak);
        }
        elements.gameChoices.querySelectorAll(".game-choice").forEach((button) => {
            const choiceId = button.dataset.wordId;
            button.disabled = true;
            if (choiceId === targetId) button.classList.add("correct");
            else if (String(selectedId) === choiceId) button.classList.add("incorrect");
        });
        const meaning = state.gameTarget.meanings[0] || "";
        if (isCorrect) {
            elements.gameFeedback.textContent = `Correct! ${state.gameTarget.word} — ${meaning}`;
            elements.gameFeedback.className = "game-feedback correct";
        }
        elements.gameNextButton.disabled = false;
        elements.gameNextButton.textContent = state.gameQuestionNumber >= state.gameRoundLength
            ? "See results"
            : "Next";
        updateGameStats();
    }

    function startGameTimer() {
        clearGameTimer();
        state.gameTimeLeft = GAME_TIME_LIMIT;
        updateGameStats();
        state.gameTimerId = setInterval(() => {
            state.gameTimeLeft -= 1;
            updateGameStats();
            if (state.gameTimeLeft <= 0) answerGame(null, true);
        }, 1000);
    }

    function renderGameQuestion() {
        elements.gameWord.textContent = state.gameTarget.word;
        elements.gameFeedback.textContent = "Choose picture 1, 2, 3, or 4.";
        elements.gameFeedback.className = "game-feedback";
        elements.gameNextButton.disabled = true;
        elements.gameNextButton.textContent = "Next";
        elements.gameChoices.replaceChildren(...state.gameChoices.map((word, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "game-choice";
            button.dataset.wordId = String(word.id);
            button.setAttribute("aria-label", `Picture ${index + 1}`);
            const image = document.createElement("img");
            image.src = `${IMAGE_BASE_URL}${state.imageMap.get(String(word.id)).file}`;
            image.alt = "";
            image.width = 420;
            image.height = 420;
            const number = document.createElement("span");
            number.className = "game-choice-number";
            number.textContent = String(index + 1);
            button.append(image, number);
            button.addEventListener("click", () => answerGame(word.id));
            return button;
        }));
        updateGameStats();
        startGameTimer();
    }

    function nextGameQuestion() {
        const availableTargets = state.gameTargetPool.filter(
            (word) => !state.gameAskedIds.has(String(word.id)),
        );
        const question = core.createPictureQuestion(
            state.gamePool,
            state.gamePreviousId,
            Math.random,
            availableTargets,
        );
        if (!question) {
            if (state.gameQuestionNumber > 0) showGameResult();
            return;
        }
        state.gamePreviousId = question.target.id;
        state.gameAskedIds.add(String(question.target.id));
        state.gameTarget = question.target;
        state.gameChoices = question.choices;
        state.gameQuestionNumber += 1;
        state.gameAnswered = false;
        state.gameHadWrong = false;
        renderGameQuestion();
    }

    function showGameResult() {
        clearGameTimer();
        state.gameTimeLeft = 0;
        updateGameStats();
        elements.gameQuestionPanel.hidden = true;
        elements.gameResultPanel.hidden = false;
        const accuracy = Math.round((state.gameScore / state.gameRoundLength) * 100);
        elements.gameResultScore.textContent = `${state.gameScore} / ${state.gameRoundLength}`;
        elements.gameResultAccuracy.textContent = `${accuracy}%`;
        elements.gameResultBestStreak.textContent = String(state.gameBestStreak);
        if (state.gameWrongWords.length) {
            elements.gameWrongList.replaceChildren(...state.gameWrongWords.map((word) => {
                const chip = document.createElement("span");
                chip.className = "game-wrong-word";
                chip.textContent = `${word.word} · ${word.meanings[0] || ""}`;
                return chip;
            }));
        } else {
            const message = document.createElement("span");
            message.textContent = "Great job! No missed words.";
            elements.gameWrongList.replaceChildren(message);
        }
        elements.gameRetryWrongButton.hidden = state.gameWrongWords.length === 0;
    }

    function startGameRound(targetPool = state.gamePool) {
        clearGameTimer();
        state.gameTargetPool = [...targetPool];
        state.gameRoundLength = Math.min(10, state.gameTargetPool.length);
        state.gameTarget = null;
        state.gamePreviousId = null;
        state.gameAskedIds = new Set();
        state.gameWrongWords = [];
        state.gameQuestionNumber = 0;
        state.gameScore = 0;
        state.gameStreak = 0;
        state.gameBestStreak = 0;
        elements.gameQuestionPanel.hidden = false;
        elements.gameResultPanel.hidden = true;
        nextGameQuestion();
    }

    function continueGame() {
        if (!state.gameAnswered) return;
        if (state.gameQuestionNumber >= state.gameRoundLength) showGameResult();
        else nextGameQuestion();
    }

    function selectGameLevel(level) {
        state.gameLevel = Number(level);
        state.gamePool = core.pictureGamePool(
            state.data.words,
            new Set(state.imageMap.keys()),
            state.gameLevel,
        );
        elements.gameLevelButtons.querySelectorAll("[data-level]").forEach((button) => {
            button.setAttribute("aria-pressed", String(Number(button.dataset.level) === state.gameLevel));
        });
        startGameRound(state.gamePool);
    }

    function openGame() {
        elements.levelScreen.hidden = true;
        elements.studyScreen.hidden = true;
        elements.gameScreen.hidden = false;
        selectGameLevel(state.gameLevel);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function backFromGame() {
        clearGameTimer();
        elements.gameScreen.hidden = true;
        elements.levelScreen.hidden = false;
        renderLevelGroups();
        renderOverallProgress();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function storedSpellingWrongWords() {
        if (!state.data) return [];
        const wordsById = new Map(state.data.words.map((word) => [String(word.id), word]));
        return Object.keys(state.spellingWrongProgress)
            .filter((id) => state.spellingIds.has(id) && wordsById.has(id))
            .map((id) => wordsById.get(id));
    }

    function renderStoredSpellingWrong() {
        const validIds = new Set(storedSpellingWrongWords().map((word) => String(word.id)));
        Object.keys(state.spellingWrongProgress).forEach((id) => {
            if (!validIds.has(id)) delete state.spellingWrongProgress[id];
        });
        const count = validIds.size;
        elements.spellingStoredWrongCount.textContent = count.toLocaleString("ko-KR");
        elements.spellingReviewButton.hidden = count === 0;
        saveSpellingWrongProgress();
    }

    function setSpellingReviewMode(isReview) {
        state.spellingReviewMode = isReview;
        elements.spellingModeLabel.textContent = isReview ? "Saved words to try again" : "Beginner spelling";
        elements.spellingTitle.textContent = isReview ? "Try Missed Words" : "Look and Spell";
        if (isReview) {
            elements.spellingLevelButtons.querySelectorAll("[data-level]").forEach((button) => {
                button.setAttribute("aria-pressed", "false");
            });
        }
    }

    function updateSpellingStats() {
        elements.spellingQuestionNumber.textContent = String(Math.max(1, state.spellingQuestionNumber));
        elements.spellingScore.textContent = String(state.spellingScore);
        elements.spellingStreak.textContent = String(state.spellingStreak);
    }

    function renderSpellingQuestion() {
        const image = state.imageMap.get(String(state.spellingTarget.id));
        elements.spellingImage.src = `${IMAGE_BASE_URL}${image.file}`;
        elements.spellingInput.value = "";
        elements.spellingInput.disabled = false;
        elements.spellingInput.className = "spelling-input";
        elements.spellingHint.textContent = core.spellingHint(state.spellingTarget.word, false);
        elements.spellingFeedback.textContent = "Type the word.";
        elements.spellingFeedback.className = "game-feedback";
        elements.spellingHintButton.disabled = false;
        elements.spellingCheckButton.disabled = false;
        elements.spellingNextButton.disabled = true;
        elements.spellingNextButton.textContent = "Next";
        updateSpellingStats();
        renderSpellingTiles();
    }

    function renderSpellingTiles() {
        const letters = core.shuffleWords([...state.spellingTarget.word.toLowerCase()].map((letter, index) => ({ letter, index })));
        elements.spellingBuiltWord.textContent = "";
        elements.spellingTileRack.replaceChildren(...letters.map(({ letter, index }) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "letter-tile";
            button.textContent = letter;
            button.dataset.tileIndex = String(index);
            button.setAttribute("aria-label", `Letter ${letter}`);
            button.addEventListener("click", () => selectSpellingTile(button));
            return button;
        }));
        elements.spellingBuiltWord.onclick = removeLastSpellingLetter;
    }

    function selectSpellingTile(button) {
        if (state.spellingAnswered || button.disabled) return;
        button.disabled = true;
        elements.spellingInput.value += button.textContent;
        elements.spellingBuiltWord.textContent = elements.spellingInput.value;
        maybeAutoCheckSpelling();
    }

    function removeLastSpellingLetter() {
        if (state.spellingAnswered || !elements.spellingInput.value) return;
        const removed = elements.spellingInput.value.at(-1);
        elements.spellingInput.value = elements.spellingInput.value.slice(0, -1);
        elements.spellingBuiltWord.textContent = elements.spellingInput.value;
        const candidates = [...elements.spellingTileRack.querySelectorAll(".letter-tile[disabled]")];
        candidates.reverse().find((tile) => tile.textContent === removed)?.removeAttribute("disabled");
        elements.spellingFeedback.textContent = "Keep going.";
        elements.spellingFeedback.className = "game-feedback";
    }

    function maybeAutoCheckSpelling() {
        const answer = core.normalizeSpellingAnswer(elements.spellingInput.value);
        const correctAnswer = core.normalizeSpellingAnswer(state.spellingTarget?.word || "");
        if (!correctAnswer || answer.length < correctAnswer.length) return;
        if (answer === correctAnswer) {
            checkSpellingAnswer();
            return;
        }
        elements.spellingFeedback.textContent = "Not quite. Press Backspace and try again.";
        elements.spellingFeedback.className = "game-feedback incorrect";
        elements.spellingBuiltWord.animate(
            [{ transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "none" }],
            { duration: 180 },
        );
    }

    function nextSpellingQuestion() {
        const availableTargets = state.spellingTargetPool.filter(
            (word) => !state.spellingAskedIds.has(String(word.id)),
        );
        if (!availableTargets.length) {
            if (state.spellingQuestionNumber > 0) showSpellingResult();
            return;
        }
        const target = core.shuffleWords(availableTargets)[0];
        state.spellingTarget = target;
        state.spellingAskedIds.add(String(target.id));
        state.spellingQuestionNumber += 1;
        state.spellingAnswered = false;
        renderSpellingQuestion();
    }

    function checkSpellingAnswer() {
        if (state.spellingAnswered || !state.spellingTarget) return;
        const answer = core.normalizeSpellingAnswer(elements.spellingInput.value);
        if (!answer) {
            elements.spellingFeedback.textContent = "Type some letters first.";
            elements.spellingFeedback.className = "game-feedback incorrect";
            elements.spellingBuiltWord.animate([{ transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "none" }], { duration: 180 });
            return;
        }
        state.spellingAnswered = true;
        const targetId = String(state.spellingTarget.id);
        const correctAnswer = core.normalizeSpellingAnswer(state.spellingTarget.word);
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
            state.spellingScore += 1;
            state.spellingStreak += 1;
            state.spellingBestStreak = Math.max(state.spellingBestStreak, state.spellingStreak);
            delete state.spellingWrongProgress[targetId];
        } else {
            state.spellingStreak = 0;
            state.spellingWrongEntries.push({ word: state.spellingTarget, answer });
            const previous = state.spellingWrongProgress[targetId];
            state.spellingWrongProgress[targetId] = {
                count: (previous?.count || 0) + 1,
                lastAnswer: answer,
                updatedAt: new Date().toISOString(),
            };
        }
        renderStoredSpellingWrong();
        elements.spellingInput.disabled = true;
        elements.spellingInput.classList.add(isCorrect ? "correct" : "incorrect");
        elements.spellingHintButton.disabled = true;
        elements.spellingCheckButton.disabled = true;
        elements.spellingFeedback.textContent = isCorrect
            ? `Correct! ${state.spellingTarget.word}`
            : `Not quite. The word is ${state.spellingTarget.word}.`;
        elements.spellingFeedback.className = `game-feedback ${isCorrect ? "correct" : "incorrect"}`;
        elements.spellingNextButton.disabled = false;
        elements.spellingNextButton.textContent = state.spellingQuestionNumber >= state.spellingRoundLength
            ? "See results"
            : "Next";
        updateSpellingStats();
    }

    function showSpellingHint() {
        if (!state.spellingTarget || state.spellingAnswered) return;
        elements.spellingHint.textContent = core.spellingHint(state.spellingTarget.word);
        const firstLetter = state.spellingTarget.word[0].toLowerCase();
        if (!elements.spellingInput.value) {
            [...elements.spellingTileRack.querySelectorAll(".letter-tile:not([disabled])")].find((tile) => tile.textContent === firstLetter)?.click();
        }
    }

    function showSpellingResult() {
        elements.spellingQuestionPanel.hidden = true;
        elements.spellingResultPanel.hidden = false;
        const accuracy = state.spellingRoundLength
            ? Math.round((state.spellingScore / state.spellingRoundLength) * 100)
            : 0;
        elements.spellingResultScore.textContent = `${state.spellingScore} / ${state.spellingRoundLength}`;
        elements.spellingResultAccuracy.textContent = `${accuracy}%`;
        elements.spellingResultBestStreak.textContent = String(state.spellingBestStreak);
        if (state.spellingWrongEntries.length) {
            elements.spellingWrongList.replaceChildren(...state.spellingWrongEntries.map((entry) => {
                const chip = document.createElement("span");
                chip.className = "game-wrong-word";
                chip.textContent = `${entry.word.word} · You typed: ${entry.answer}`;
                return chip;
            }));
        } else {
            const message = document.createElement("span");
            message.textContent = "Great job! No missed words.";
            elements.spellingWrongList.replaceChildren(message);
        }
        elements.spellingRetryWrongButton.hidden = state.spellingWrongEntries.length === 0;
        const remainingStored = storedSpellingWrongWords().length;
        elements.spellingPlayAgainButton.textContent = state.spellingReviewMode && remainingStored
            ? `${remainingStored} missed words left`
            : "10 new questions";
    }

    function startSpellingRound(targetPool = state.spellingPool) {
        state.spellingTargetPool = [...targetPool];
        state.spellingRoundLength = Math.min(10, state.spellingTargetPool.length);
        state.spellingTarget = null;
        state.spellingAskedIds = new Set();
        state.spellingWrongEntries = [];
        state.spellingQuestionNumber = 0;
        state.spellingScore = 0;
        state.spellingStreak = 0;
        state.spellingBestStreak = 0;
        state.spellingAnswered = false;
        elements.spellingQuestionPanel.hidden = false;
        elements.spellingResultPanel.hidden = true;
        nextSpellingQuestion();
    }

    function continueSpelling() {
        if (!state.spellingAnswered) return;
        if (state.spellingQuestionNumber >= state.spellingRoundLength) showSpellingResult();
        else nextSpellingQuestion();
    }

    function restartSpellingMode() {
        if (state.spellingReviewMode) {
            const storedWords = storedSpellingWrongWords();
            if (storedWords.length) {
                startSpellingRound(storedWords);
                return;
            }
            setSpellingReviewMode(false);
        }
        selectSpellingLevel(state.spellingLevel);
    }

    function selectSpellingLevel(level) {
        setSpellingReviewMode(false);
        state.spellingLevel = Number(level);
        state.spellingPool = core.pictureGamePool(
            state.data.words,
            state.spellingIds,
            state.spellingLevel,
        );
        elements.spellingLevelButtons.querySelectorAll("[data-level]").forEach((button) => {
            button.setAttribute("aria-pressed", String(Number(button.dataset.level) === state.spellingLevel));
        });
        startSpellingRound(state.spellingPool);
    }

    function openSpellingGame() {
        clearGameTimer();
        elements.levelScreen.hidden = true;
        elements.studyScreen.hidden = true;
        elements.gameScreen.hidden = true;
        elements.spellingScreen.hidden = false;
        selectSpellingLevel(state.spellingLevel);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openSpellingReview() {
        const storedWords = storedSpellingWrongWords();
        if (!storedWords.length) {
            renderStoredSpellingWrong();
            showToast("No saved words to try again.");
            return;
        }
        clearGameTimer();
        elements.levelScreen.hidden = true;
        elements.studyScreen.hidden = true;
        elements.gameScreen.hidden = true;
        elements.spellingScreen.hidden = false;
        setSpellingReviewMode(true);
        startSpellingRound(storedWords);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function backFromSpelling() {
        elements.spellingScreen.hidden = true;
        elements.levelScreen.hidden = false;
        renderStoredSpellingWrong();
        renderLevelGroups();
        renderOverallProgress();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function bindEvents() {
        elements.flashcard.addEventListener("click", toggleMeaning);
        elements.previousButton.addEventListener("click", () => moveCard(-1));
        elements.nextButton.addEventListener("click", () => moveCard(1));
        elements.unknownButton.addEventListener("click", () => markWord("unknown"));
        elements.knownButton.addEventListener("click", () => markWord("known"));
        elements.speakButton.addEventListener("click", speakCurrentWord);
        elements.exampleSpeakButton.addEventListener("click", speakCurrentExample);
        elements.shuffleButton.addEventListener("click", shuffleCurrentLevel);
        elements.imageToggleButton.addEventListener("click", () => {
            state.showImages = !state.showImages;
            localStorage.setItem(IMAGE_PREFERENCE_KEY, String(state.showImages));
            updateImagePreference();
            renderStudyCard();
        });
        elements.wordImage.addEventListener("error", () => {
            elements.wordImageBlock.hidden = true;
            elements.answerLayout.classList.remove("has-image");
        });
        elements.backToLevels.addEventListener("click", backToLevels);
        elements.reviewUnknownButton.addEventListener("click", () => openLevel(state.currentLevel, { unknownOnly: true }));
        elements.gameStartButton.addEventListener("click", openGame);
        elements.backFromGame.addEventListener("click", backFromGame);
        elements.gameNextButton.addEventListener("click", continueGame);
        elements.gameResetButton.addEventListener("click", () => startGameRound(state.gamePool));
        elements.gameSpeakButton.addEventListener("click", () => speakText(state.gameTarget?.word));
        elements.gamePlayAgainButton.addEventListener("click", () => startGameRound(state.gamePool));
        elements.gameRetryWrongButton.addEventListener("click", () => {
            const retryWords = [...state.gameWrongWords];
            startGameRound(retryWords);
        });
        elements.gameLevelButtons.addEventListener("click", (event) => {
            const button = event.target.closest("[data-level]");
            if (button) selectGameLevel(button.dataset.level);
        });
        elements.spellingGameStartButton.addEventListener("click", openSpellingGame);
        elements.spellingReviewButton.addEventListener("click", openSpellingReview);
        elements.backFromSpelling.addEventListener("click", backFromSpelling);
        elements.spellingResetButton.addEventListener("click", restartSpellingMode);
        elements.spellingHintButton.addEventListener("click", showSpellingHint);
        elements.spellingSpeakButton.addEventListener("click", () => speakText(state.spellingTarget?.word));
        elements.spellingCheckButton.addEventListener("click", checkSpellingAnswer);
        elements.spellingNextButton.addEventListener("click", continueSpelling);
        elements.spellingPlayAgainButton.addEventListener("click", restartSpellingMode);
        elements.spellingRetryWrongButton.addEventListener("click", () => {
            const retryWords = state.spellingWrongEntries.map((entry) => entry.word);
            startSpellingRound(retryWords);
        });
        elements.spellingLevelButtons.addEventListener("click", (event) => {
            const button = event.target.closest("[data-level]");
            if (button && !button.disabled) selectSpellingLevel(button.dataset.level);
        });
        window.addEventListener("keydown", (event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (!elements.spellingScreen.hidden) {
                if (elements.spellingQuestionPanel.hidden) return;
                if (/^[a-z]$/i.test(event.key) && !state.spellingAnswered) {
                    const key = event.key.toLowerCase();
                    const tile = [...elements.spellingTileRack.querySelectorAll(".letter-tile:not([disabled])")]
                        .find((candidate) => candidate.textContent === key);
                    if (tile) {
                        event.preventDefault();
                        selectSpellingTile(tile);
                    }
                } else if (event.key === "Backspace" && !state.spellingAnswered) {
                    event.preventDefault();
                    removeLastSpellingLetter();
                } else if (event.key === "Enter") {
                    event.preventDefault();
                    if (state.spellingAnswered) continueSpelling();
                    else checkSpellingAnswer();
                }
                return;
            }
            if (!elements.gameScreen.hidden) {
                const choiceIndex = Number(event.key) - 1;
                if (choiceIndex >= 0 && choiceIndex < 4 && !state.gameAnswered) {
                    event.preventDefault();
                    elements.gameChoices.querySelectorAll(".game-choice")[choiceIndex]?.click();
                } else if (event.key === "Enter" && state.gameAnswered && !elements.gameQuestionPanel.hidden) {
                    event.preventDefault();
                    continueGame();
                }
                return;
            }
            if (elements.studyScreen.hidden) return;
            if (event.code === "Space") { event.preventDefault(); toggleMeaning(); }
            else if (event.key === "ArrowLeft") moveCard(-1);
            else if (event.key === "ArrowRight") moveCard(1);
            else if (event.key === "1") markWord("unknown");
            else if (event.key === "2") markWord("known");
        });
    }

    async function initialize() {
        try {
            const [response, imageResponse, spellingResponse] = await Promise.all([
                fetch(DATA_URL),
                fetch(IMAGE_MANIFEST_URL).catch(() => null),
                fetch(SPELLING_GAME_URL).catch(() => null),
            ]);
            if (!response.ok) throw new Error(`Vocabulary data request failed: ${response.status}`);
            state.data = await response.json();
            if (imageResponse?.ok) {
                const manifest = await imageResponse.json();
                const imageEntries = Object.entries(manifest.images || {}).filter(([id, image]) => (
                    /^\d+$/.test(id)
                    && image?.word
                    && /^[a-z0-9-]+\.webp$/.test(image?.file || "")
                ));
                state.imageMap = new Map(imageEntries);
            }
            if (state.data.totalWords !== 3000 || !Array.isArray(state.data.words)) throw new Error("Invalid vocabulary data");
            if (!state.data.words.every((word) => (
                (word.example === null || (
                    word.example?.en
                    && word.example?.ko
                    && word.example?.source !== "generated_learning_prompt"
                ))
                && Array.isArray(word.relatedWords)
            ))) {
                throw new Error("Vocabulary learning data is incomplete");
            }
            state.levels = core.groupByLevel(state.data.words);
            if (state.levels.size !== 15) throw new Error("Invalid vocabulary levels");
            if (spellingResponse?.ok) {
                const spellingManifest = await spellingResponse.json();
                const vocabularyIds = new Set(state.data.words.map((word) => String(word.id)));
                state.spellingIds = new Set((spellingManifest.wordIds || [])
                    .map(String)
                    .filter((id) => vocabularyIds.has(id) && state.imageMap.has(id)));
            }
            elements.imageToggleButton.hidden = state.imageMap.size === 0;
            const gamePool = core.pictureGamePool(state.data.words, new Set(state.imageMap.keys()));
            elements.gameWordCount.textContent = gamePool.length.toLocaleString("ko-KR");
            elements.gameStartButton.hidden = gamePool.length < 4;
            elements.gameLevelButtons.querySelectorAll("[data-level]").forEach((button) => {
                const levelPool = core.pictureGamePool(
                    state.data.words,
                    new Set(state.imageMap.keys()),
                    button.dataset.level,
                );
                button.disabled = levelPool.length < 4;
            });
            const spellingPool = core.pictureGamePool(state.data.words, state.spellingIds);
            elements.spellingWordCount.textContent = spellingPool.length.toLocaleString("ko-KR");
            elements.spellingGameStartButton.hidden = spellingPool.length === 0;
            elements.spellingLevelButtons.querySelectorAll("[data-level]").forEach((button) => {
                const levelPool = core.pictureGamePool(
                    state.data.words,
                    state.spellingIds,
                    button.dataset.level,
                );
                button.disabled = levelPool.length === 0;
            });
            renderStoredSpellingWrong();
            updateImagePreference();
            renderOverallProgress();
            renderLevelGroups();
            bindEvents();
            elements.loadingState.hidden = true;
        } catch (error) {
            console.error(error);
            elements.loadingState.querySelector("p").textContent = "We could not load the words. Please try again soon.";
        }
    }

    initialize();
})();
