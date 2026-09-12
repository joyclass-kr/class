(() => {
    "use strict";

    const $ = (id) => document.getElementById(id);
    const POEM_PROGRESS_KEY = "poetry_progress_v1";

    // 1. 해당 시 데이터 가져오기
    const poemId = Object.keys(window.POETRY_PART || {})[0];
    if (!poemId || !window.POETRY_PART[poemId]) {
        console.error("Poem data not found.");
        return;
    }
    const part = window.POETRY_PART[poemId];
    const poem = part.poem || {};
    const questions = part.questions || [];
    poem.id = poemId;

    // DOM 요소
    const spreadEl = $("spread");
    const folioLeftEl = $("folioLeft");
    const folioRightEl = $("folioRight");
    const prevBtn = $("prevBtn");
    const nextBtn = $("nextBtn");
    const pageIndicator = $("pageIndicator");

    // 상태 관리
    let currentSpreadIndex = 0;
    let showingModern = false;
    const quizWrongChoices = new Map();
    const quizPickedChoices = new Map();

    function getProgress() {
        try {
            return JSON.parse(localStorage.getItem(POEM_PROGRESS_KEY)) || {};
        } catch {
            return {};
        }
    }

    function savePoemSolved(pId, questionId) {
        const prog = getProgress();
        const cur = prog[pId] || { solved: [], wrong: {} };
        if (!cur.solved.includes(questionId)) {
            cur.solved.push(questionId);
        }
        if (!cur.wrong) cur.wrong = {};
        if (quizWrongChoices.has(questionId)) {
            cur.wrong[questionId] = Array.from(quizWrongChoices.get(questionId));
        }
        if (questions.length > 0 && cur.solved.length >= questions.length) {
            cur.done = true;
        }
        prog[pId] = cur;
        try {
            localStorage.setItem(POEM_PROGRESS_KEY, JSON.stringify(prog));
        } catch (e) {}
    }

    function escapeHtml(text) {
        return (text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function formatPoemLines(lines) {
        if (!lines || lines.length === 0) {
            return `<div class="poem-stanza"><p>본문을 준비하고 있습니다.</p></div>`;
        }
        let html = '<div class="poem-stanza">';
        let prevEmpty = false;
        lines.forEach((line) => {
            const trimmed = line.trim();
            if (!trimmed) {
                if (!prevEmpty) {
                    html += '</div><div class="poem-stanza">';
                    prevEmpty = true;
                }
            } else {
                html += `<div class="poem-line">${escapeHtml(line)}</div>`;
                prevEmpty = false;
            }
        });
        html += "</div>";
        return html;
    }

    // 펼침면 구성: 1. 읽기 / 2. 문제 (있을 때) / 3. 해설 (있을 때)
    const spreads = [
        { kind: "read" }
    ];
    if (questions.length > 0) {
        spreads.push({ kind: "quiz" });
    }
    const notes = Array.isArray(poem.note) ? poem.note : (poem.note ? [poem.note] : []);
    if (notes.length > 0) {
        spreads.push({ kind: "note" });
    }

    // 1. 시 읽기 펼침면
    function renderReadSpread() {
        const hasModern = Array.isArray(poem.modern) && poem.modern.length > 0;
        const currentLines = showingModern && hasModern ? poem.modern : poem.lines;

        const leftHtml = `
            <div class="story-page-left">
                <div class="poem-reading-header">
                    <h2 class="poem-reading-title">${escapeHtml(poem.title)}</h2>
                    ${hasModern ? `
                        <button id="toggleModernBtn" class="modern-toggle-btn" type="button">
                            ${showingModern ? "원문 보기" : "현대어 풀이"}
                        </button>
                    ` : ""}
                </div>
                <div class="poem-reading-byline">${escapeHtml(poem.poet || "작자 미상")}${poem.year ? ` · ${poem.year}` : ""}</div>
                <div class="poem-body-container">
                    ${formatPoemLines(currentLines)}
                </div>
            </div>
        `;

        let wordsHtml = "";
        if (poem.words && poem.words.length > 0) {
            const dlInner = poem.words.map(w => `
                <dt>${escapeHtml(w.word)}</dt>
                <dd>${escapeHtml(w.mean)}</dd>
            `).join("");
            wordsHtml = `
                <div class="poem-words-box">
                    <dl class="poem-words-dl">${dlInner}</dl>
                </div>
            `;
        }

        const rightHtml = `
            <div class="story-page-right">
                <div class="poem-point-box">
                    <p class="point-text">${escapeHtml(poem.point || "시의 분위기와 시인의 마음을 가만히 헤아려 보세요.")}</p>
                </div>
                ${wordsHtml}
            </div>
        `;

        let artHtml = "";
        if (poem.illustration) {
            artHtml = `
                <div class="read-spread-art" aria-hidden="true">
                    <img class="read-spread-art-img" src="${escapeHtml(poem.illustration)}?v=20260912" alt="" onerror="this.parentElement.style.display='none';" />
                </div>
            `;
        }

        return leftHtml + rightHtml + artHtml;
    }

    // 2. 문제 풀기 펼침면
    function renderQuizSpread() {
        const qLeft = questions.slice(0, 2);
        const qRight = questions.slice(2, 4);
        const prog = getProgress()[poem.id]?.solved || [];

        function renderQuestionCard(q, num) {
            if (!q) return "";
            const isSolved = prog.includes(q.id) || quizPickedChoices.has(q.id);
            const savedWrongs = getProgress()[poem.id]?.wrong?.[q.id] || [];
            const memoryWrongs = quizWrongChoices.get(q.id) ? Array.from(quizWrongChoices.get(q.id)) : [];
            const wrongSet = new Set([...savedWrongs, ...memoryWrongs]);

            const choicesHtml = (q.choices || []).map((c) => {
                const isCorrect = c === q.answer;
                let stateCls = "";
                if (isSolved && isCorrect) {
                    stateCls = " correct";
                } else if (wrongSet.has(c)) {
                    stateCls = " incorrect";
                }
                return `
                    <button class="quiz-choice${stateCls}" type="button"
                            data-qid="${q.id}" data-choice="${escapeHtml(c)}" data-correct="${isCorrect ? '1' : '0'}">
                        ${escapeHtml(c)}
                    </button>
                `;
            }).join("");

            return `
                <div class="quiz-item${isSolved ? ' graded' : ''}" data-qid="${q.id}">
                    <p class="quiz-question">${num}. ${escapeHtml(q.sentence || q.prompt || "")}</p>
                    <div class="quiz-choices">
                        ${choicesHtml}
                    </div>
                </div>
            `;
        }

        const leftCardsHtml = qLeft.map((q, idx) => renderQuestionCard(q, idx + 1)).join("");
        const rightCardsHtml = qRight.map((q, idx) => renderQuestionCard(q, idx + 3)).join("");

        const leftHtml = `
            <div class="story-page-left page-quiz-col">
                ${leftCardsHtml || '<p>등록된 문제가 없습니다.</p>'}
            </div>
        `;
        const rightHtml = `
            <div class="story-page-right page-quiz-col">
                ${rightCardsHtml}
            </div>
        `;

        return leftHtml + rightHtml;
    }

    // 3. 해설 펼침면
    function renderNoteSpread() {
        const half = Math.ceil(notes.length / 2);
        const leftParas = notes.slice(0, half);
        const rightParas = notes.slice(half);

        const leftHtml = `
            <div class="story-page-left">
                <h3 class="note-head-title">작품 해설</h3>
                <div class="note-paras">
                    ${leftParas.map(p => `<p class="note-p">${escapeHtml(p)}</p>`).join("") || '<p class="note-p">해설을 준비하고 있습니다.</p>'}
                </div>
            </div>
        `;

        const rightHtml = `
            <div class="story-page-right">
                <div class="note-paras">
                    ${rightParas.map(p => `<p class="note-p">${escapeHtml(p)}</p>`).join("")}
                </div>
            </div>
        `;

        return leftHtml + rightHtml;
    }

    function paint() {
        if (!spreads.length || currentSpreadIndex < 0 || currentSpreadIndex >= spreads.length) return;

        const s = spreads[currentSpreadIndex];
        let html = "";
        if (s.kind === "read") html = renderReadSpread();
        else if (s.kind === "quiz") html = renderQuizSpread();
        else if (s.kind === "note") html = renderNoteSpread();

        spreadEl.innerHTML = html;

        pageIndicator.textContent = `${currentSpreadIndex + 1} / ${spreads.length}`;
        folioLeftEl.textContent = String(currentSpreadIndex * 2 + 1);
        folioRightEl.textContent = String(currentSpreadIndex * 2 + 2);

        prevBtn.disabled = currentSpreadIndex === 0;
        nextBtn.disabled = currentSpreadIndex === spreads.length - 1;

        // 현대어 토글 버튼 이벤트
        const toggleBtn = $("toggleModernBtn");
        if (toggleBtn) {
            toggleBtn.onclick = () => {
                showingModern = !showingModern;
                paint();
            };
        }

        // 문제 풀이 채점 이벤트
        if (s.kind === "quiz") {
            spreadEl.querySelectorAll(".quiz-choice").forEach((btn) => {
                btn.onclick = () => {
                    const item = btn.closest(".quiz-item");
                    if (!item || item.classList.contains("graded")) return;

                    const isCorrect = btn.getAttribute("data-correct") === "1";
                    const qid = btn.getAttribute("data-qid");
                    const choice = btn.getAttribute("data-choice");

                    if (!isCorrect) {
                        btn.classList.add("incorrect");
                        if (!quizWrongChoices.has(qid)) {
                            quizWrongChoices.set(qid, new Set());
                        }
                        quizWrongChoices.get(qid).add(choice);
                        savePoemSolved(poem.id, qid);
                        return;
                    }

                    btn.classList.add("correct");
                    item.classList.add("graded");
                    quizPickedChoices.set(qid, choice);
                    savePoemSolved(poem.id, qid);
                };
            });
        }
    }

    function goTo(index, animDirection) {
        if (index < 0 || index >= spreads.length || index === currentSpreadIndex) return;
        const dir = animDirection || (index > currentSpreadIndex ? "next" : "prev");
        currentSpreadIndex = index;
        spreadEl.classList.remove("flip-next", "flip-prev");
        void spreadEl.offsetWidth;
        spreadEl.classList.add(dir === "next" ? "flip-next" : "flip-prev");
        paint();
    }

    prevBtn.onclick = () => goTo(currentSpreadIndex - 1, "prev");
    nextBtn.onclick = () => goTo(currentSpreadIndex + 1, "next");

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") goTo(currentSpreadIndex - 1, "prev");
        else if (e.key === "ArrowRight") goTo(currentSpreadIndex + 1, "next");
    });

    paint();
})();
