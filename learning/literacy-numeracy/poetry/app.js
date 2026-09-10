(() => {
    "use strict";

    const POEM_PROGRESS_KEY = "poetryPoemProgressV1";

    // 색인 데이터: poems-index.js에서 POETRY_POEM_INDEX, lessons.js에서 POETRY_BOOKS를 받음
    const poems = Array.isArray(window.POETRY_POEM_INDEX) ? window.POETRY_POEM_INDEX : [];
    const poemById = new Map(poems.map((p) => [p.id, p]));
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
            script.onerror = () => reject(new Error(file + "을 불러오지 못했습니다."));
            document.head.append(script);
        });
        loading.set(file, job);
        return job;
    }

    // 시 한 편의 본문, 낱말, 해설, 문제 로드
    async function loadPoem(poem) {
        if (!poem) return null;
        if (poem.lines && questionsByPoem.has(poem.id)) return poem;
        try {
            await fetchScript(`poems/${poem.id}.js`);
            const part = (window.POETRY_PART || {})[poem.id];
            if (part) {
                Object.assign(poem, part.poem);
                if (!poem.lines) poem.lines = [];
                questionsByPoem.set(poem.id, part.questions || []);
            }
        } catch (e) {
            console.error(e);
        }
        return poem;
    }

    // 진도 저장 및 확인
    function getProgress() {
        try {
            return JSON.parse(localStorage.getItem(POEM_PROGRESS_KEY)) || {};
        } catch {
            return {};
        }
    }

    function savePoemSolved(poemId, questionId) {
        const prog = getProgress();
        const cur = prog[poemId] || { solved: [] };
        if (!cur.solved.includes(questionId)) {
            cur.solved.push(questionId);
        }
        const qs = questionsByPoem.get(poemId) || [];
        if (qs.length > 0 && cur.solved.length >= qs.length) {
            cur.done = true;
        }
        prog[poemId] = cur;
        try {
            localStorage.setItem(POEM_PROGRESS_KEY, JSON.stringify(prog));
        } catch (e) {}
    }

    function isPoemDone(poemId) {
        const prog = getProgress();
        return Boolean(prog[poemId]?.done);
    }

    function isBookDone(book) {
        if (!book || !book.poemIds || book.poemIds.length === 0) return false;
        return book.poemIds.every((id) => isPoemDone(id));
    }

    // 소재별 목록
    const TOPICS = [
        "봄", "여름", "가을", "겨울", "가족", "동물", "밤과 달", "고향",
        "그리움", "이별", "자연", "다짐", "시대", "나라", "사랑", "옛이야기", "놀이", "기다림"
    ];
    const poemsByTopic = new Map(
        TOPICS.map((topic) => [topic, poems.filter((poem) => (poem.topics || []).includes(topic))])
    );

    // DOM 요소 캐시
    const $ = (id) => document.getElementById(id);
    const shelfBackLink = $("shelfBackLink");
    const bookShelfBtn = $("bookShelfBtn");
    const tocBtn = $("tocBtn");
    const shelfScreen = $("shelfScreen");
    const orderTabBtn = $("orderTabBtn");
    const topicTabBtn = $("topicTabBtn");
    const orderView = $("orderView");
    const topicView = $("topicView");
    const bookShelf = $("bookShelf");
    const topicChips = $("topicChips");
    const topicPoemList = $("topicPoemList");

    const bookScreen = $("bookScreen");
    const spreadEl = $("spread");
    const folioLeftEl = $("folioLeft");
    const folioRightEl = $("folioRight");
    const prevBtn = $("prevBtn");
    const nextBtn = $("nextBtn");
    const pageIndicator = $("pageIndicator");

    // 앱 상태
    let currentBookIndex = -1;
    let currentSpreadIndex = 0;
    let spreads = [];
    let currentBookPoems = [];
    let activeTopic = TOPICS[0];

    /* ── 책갈피 & 펼침면 생성 ─────────────────────────────────── */
    function buildSpreads(book, bookPoems) {
        const list = [];

        // 1. 표지 + 차례 (Spread 0)
        list.push({
            kind: "cover",
            book,
            poems: bookPoems
        });

        // 2. 각 시마다 3개의 펼침면:
        //    (1) 시 읽기: 왼쪽(본문) / 오른쪽(감상 길잡이 & 시어 사전)
        //    (2) 문제 풀기: 왼쪽(1, 2번 문제) / 오른쪽(3, 4번 문제)
        //    (3) 작품 해설: 왼쪽(해설 전반부) / 오른쪽(해설 후반부 & 생각해 볼 거리)
        bookPoems.forEach((poem, pIdx) => {
            const qs = questionsByPoem.get(poem.id) || [];
            list.push({
                kind: "read",
                book,
                poem,
                pIdx,
                poems: bookPoems
            });
            list.push({
                kind: "quiz",
                book,
                poem,
                pIdx,
                questions: qs,
                poems: bookPoems
            });
            list.push({
                kind: "note",
                book,
                poem,
                pIdx,
                poems: bookPoems
            });
        });

        // 3. 완독 축하 펼침면 (마지막 Spread)
        list.push({
            kind: "complete",
            book,
            poems: bookPoems
        });

        return list;
    }

    /* ── 렌더링 헬퍼 ────────────────────────────────────────── */
    function escapeHtml(text) {
        return (text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    // 시 본문 행/연 분리
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

    /* ── 펼침면 렌더링 함수들 ─────────────────────────────────── */

    // 1. 표지 & 목차
    function renderCoverSpread(s) {
        const { book, poems } = s;
        const volumeBadge = book.title.includes("·") ? book.title.split("·")[0].trim() : "시집";
        const cleanTitle = book.title.includes("·") ? book.title.split("·").slice(1).join("·").trim() : book.title;

        const leftHtml = `
            <div class="story-page-left-full">
                <div class="cover-art-box">
                    <span class="cover-badge">${escapeHtml(volumeBadge)}</span>
                    <h2 class="cover-title">${escapeHtml(cleanTitle)}</h2>
                    <p class="cover-subtitle">${escapeHtml(book.note || "아름다운 우리 시를 읽고 감상해요.")}</p>
                    <div class="cover-deco">📖</div>
                    <button class="book-start-btn" id="startReadingBtn" type="button">첫 시부터 읽기 ›</button>
                </div>
            </div>
        `;

        const tocItemsHtml = poems.map((p, idx) => {
            const done = isPoemDone(p.id);
            return `
                <li>
                    <button class="book-toc-btn" type="button" data-jump-spread="${idx * 3 + 1}">
                        <span class="toc-num">${idx + 1}</span>
                        <div class="toc-info">
                            <span class="toc-title">${escapeHtml(p.title)} ${done ? "✓" : ""}</span>
                            <span class="toc-poet">${escapeHtml(p.poet || "")}</span>
                        </div>
                        <span class="toc-link-text">읽기 ›</span>
                    </button>
                </li>
            `;
        }).join("");

        const rightHtml = `
            <div class="story-page-right">
                <div class="toc-header">
                    <div class="page-head-kicker">차례</div>
                    <h2>수록된 시</h2>
                    <p class="toc-intro">총 ${poems.length}편의 시가 담겨 있습니다.</p>
                </div>
                <ul class="book-toc-list">
                    ${tocItemsHtml}
                </ul>
            </div>
        `;

        return leftHtml + rightHtml;
    }

    // 2. 시 읽기
    function renderReadSpread(s) {
        const { book, poem, pIdx } = s;
        const volText = book.title.includes("·") ? book.title.split("·")[0].trim() : "시집";

        const leftHtml = `
            <div class="story-page-left">
                <div class="page-head-kicker">${escapeHtml(volText)} · 제 ${pIdx + 1} 수</div>
                <h2 class="poem-reading-title">${escapeHtml(poem.title)}</h2>
                <div class="poem-reading-byline">${escapeHtml(poem.poet || "")}${poem.year ? ` · ${poem.year}` : ""}</div>
                <div class="poem-body-container">
                    ${formatPoemLines(poem.lines)}
                </div>
            </div>
        `;

        // 오른쪽 페이지: 감상 길잡이 & 시어 사전
        let wordsHtml = "";
        if (poem.words && poem.words.length > 0) {
            const dlInner = poem.words.map(w => `
                <dt>${escapeHtml(w.word)}</dt>
                <dd>${escapeHtml(w.mean)}</dd>
            `).join("");
            wordsHtml = `
                <div class="poem-words-box">
                    <div class="words-label">시어 사전</div>
                    <dl class="poem-words-dl">${dlInner}</dl>
                </div>
            `;
        }

        const rightHtml = `
            <div class="story-page-right">
                <div class="page-head-kicker">감상과 낱말</div>
                <div class="poem-point-box">
                    <div class="point-label">감상 길잡이</div>
                    <p class="point-text">${escapeHtml(poem.point || "시의 분위기와 시인의 마음을 가만히 헤아려 보세요.")}</p>
                </div>
                ${wordsHtml}
                <div class="spread-next-guide">
                    <button class="guide-nav-btn primary" id="btnGoQuiz" type="button">문제 풀기 ›</button>
                </div>
            </div>
        `;

        return leftHtml + rightHtml;
    }

    // 3. 문제 풀기 (왼쪽 Q1~Q2, 오른쪽 Q3~Q4)
    function renderQuizSpread(s) {
        const { poem, questions = [] } = s;
        const qLeft = questions.slice(0, 2);
        const qRight = questions.slice(2, 4);

        const prog = getProgress()[poem.id]?.solved || [];

        function renderQuestionCard(q, num) {
            if (!q) return "";
            const isSolved = prog.includes(q.id);
            const choicesHtml = (q.choices || []).map((c, cIdx) => {
                const isCorrect = c === q.answer;
                const answeredClass = isSolved && isCorrect ? "correct" : "";
                return `
                    <button class="quiz-choice-btn ${answeredClass}" type="button"
                            data-qid="${q.id}" data-choice="${escapeHtml(c)}" data-correct="${isCorrect ? '1' : '0'}">
                        ${cIdx + 1}. ${escapeHtml(c)}
                    </button>
                `;
            }).join("");

            const explBoxHtml = isSolved
                ? `<div class="quiz-expl-box"><strong>정답입니다!</strong> ${escapeHtml(q.explanation || "")}</div>`
                : `<div class="quiz-expl-box hidden" id="expl_${q.id}"><strong>정답입니다!</strong> ${escapeHtml(q.explanation || "")}</div>`;

            return `
                <div class="quiz-card" data-qid="${q.id}">
                    <span class="quiz-category-tag">${escapeHtml(q.category || "이해 확인")}</span>
                    <p class="quiz-question">${num}. ${escapeHtml(q.sentence || q.prompt || "")}</p>
                    <div class="quiz-choices-box">
                        ${choicesHtml}
                    </div>
                    ${explBoxHtml}
                </div>
            `;
        }

        const leftCardsHtml = qLeft.map((q, idx) => renderQuestionCard(q, idx + 1)).join("");
        const rightCardsHtml = qRight.map((q, idx) => renderQuestionCard(q, idx + 3)).join("");

        const leftHtml = `
            <div class="story-page-left page-quiz-col">
                <div class="page-head-kicker">${escapeHtml(poem.title)} · 문제 풀기 (1/2)</div>
                ${leftCardsHtml || '<p>등록된 문제가 없습니다.</p>'}
            </div>
        `;

        const rightHtml = `
            <div class="story-page-right page-quiz-col">
                <div class="page-head-kicker">${escapeHtml(poem.title)} · 문제 풀기 (2/2)</div>
                ${rightCardsHtml}
                <div class="spread-next-guide">
                    <button class="guide-nav-btn primary" id="btnGoNote" type="button">작품 해설 읽기 ›</button>
                </div>
            </div>
        `;

        return leftHtml + rightHtml;
    }

    // 4. 작품 해설 (왼쪽 전반부, 오른쪽 후반부 및 생각거리)
    function renderNoteSpread(s) {
        const { book, poem, pIdx, poems } = s;
        const notes = Array.isArray(poem.note) ? poem.note : (poem.note ? [poem.note] : []);

        const half = Math.ceil(notes.length / 2);
        const leftParas = notes.slice(0, half);
        const rightParas = notes.slice(half);

        const leftHtml = `
            <div class="story-page-left">
                <div class="page-head-kicker">${escapeHtml(poem.title)} · 깊이 읽기</div>
                <h3 class="note-head-title">작품 해설</h3>
                <div class="note-paras">
                    ${leftParas.map(p => `<p class="note-p">${escapeHtml(p)}</p>`).join("") || '<p class="note-p">해설을 준비하고 있습니다.</p>'}
                </div>
            </div>
        `;

        const isLastPoem = pIdx === poems.length - 1;
        const nextPoem = !isLastPoem ? poems[pIdx + 1] : null;

        const nextBtnLabel = isLastPoem
            ? "권 마무리하기 ›"
            : `다음 시 읽기: 「${escapeHtml(nextPoem.title)}」 ›`;

        const reflection = poem.reflection || (
            poem.topics?.includes("가족") ? "이 시를 읽고 나의 가족이나 소중한 사람을 떠올렸을 때 어떤 마음이 드나요?" :
            poem.topics?.includes("그리움") || poem.topics?.includes("이별") ? "내가 가장 그립고 보고 싶은 대상은 누구인가요? 그때의 감정을 떠올려 보세요." :
            "시에서 가장 마음에 와닿았던 구절은 어디인가요? 왜 그 구절이 인상 깊었는지 생각해 보세요."
        );

        const rightHtml = `
            <div class="story-page-right">
                <div class="note-paras">
                    ${rightParas.map(p => `<p class="note-p">${escapeHtml(p)}</p>`).join("")}
                </div>
                <div class="note-reflection-box">
                    <div class="reflection-label">생각해 볼 거리</div>
                    <p class="reflection-text">${escapeHtml(reflection)}</p>
                </div>
                <div class="spread-next-guide">
                    <button class="guide-nav-btn primary" id="btnGoNextAfterNote" type="button">${nextBtnLabel}</button>
                </div>
            </div>
        `;

        return leftHtml + rightHtml;
    }

    // 5. 권 완독 펼침면
    function renderCompleteSpread(s) {
        const { book, poems } = s;
        const cleanTitle = book.title;

        const listItemsHtml = poems.map((p, idx) => `
            <li>
                <span class="check-icon">✓</span>
                <span><strong>제 ${idx + 1} 수:</strong> 「${escapeHtml(p.title)}」 (${escapeHtml(p.poet || "")})</span>
            </li>
        `).join("");

        const leftHtml = `
            <div class="story-page-left page-complete-left">
                <span class="complete-badge">완독 축하</span>
                <h2 class="complete-title">${escapeHtml(cleanTitle)} 완독!</h2>
                <p class="complete-subtitle">이 책에 실린 모든 시를 읽고 문제를 풀었습니다.</p>
                <ul class="complete-poem-list">
                    ${listItemsHtml}
                </ul>
            </div>
        `;

        const hasNextBook = currentBookIndex < books.length - 1;
        const nextBook = hasNextBook ? books[currentBookIndex + 1] : null;

        const rightHtml = `
            <div class="story-page-right page-complete-right">
                <div class="complete-actions">
                    ${hasNextBook ? `
                        <button class="book-action-btn primary" id="btnNextBook" type="button">
                            다음 권 읽기: ${escapeHtml(nextBook.title)} ›
                        </button>
                    ` : ""}
                    <button class="book-action-btn secondary" id="btnReturnToShelf" type="button">
                        시집 책장으로 돌아가기
                    </button>
                    <button class="book-action-btn secondary" id="btnRestartBook" type="button">
                        이 책 처음부터 다시 읽기
                    </button>
                </div>
            </div>
        `;

        return leftHtml + rightHtml;
    }

    /* ── 화면 갱신 (Paint) ─────────────────────────────────────── */
    function paint() {
        if (!spreads.length || currentSpreadIndex < 0 || currentSpreadIndex >= spreads.length) {
            return;
        }

        const s = spreads[currentSpreadIndex];

        // 1. 펼침면 본문 HTML 주입
        let html = "";
        switch (s.kind) {
            case "cover":
                html = renderCoverSpread(s);
                break;
            case "read":
                html = renderReadSpread(s);
                break;
            case "quiz":
                html = renderQuizSpread(s);
                break;
            case "note":
                html = renderNoteSpread(s);
                break;
            case "complete":
                html = renderCompleteSpread(s);
                break;
        }
        spreadEl.innerHTML = html;

        // 2. 인디케이터 및 쪽수(Folio)
        pageIndicator.textContent = `${currentSpreadIndex + 1} / ${spreads.length}`;

        if (s.kind === "cover") {
            folioLeftEl.textContent = "";
            folioRightEl.textContent = "";
        } else {
            folioLeftEl.textContent = String(currentSpreadIndex * 2);
            folioRightEl.textContent = String(currentSpreadIndex * 2 + 1);
        }

        // 3. 이전/다음 버튼 활성/비활성
        prevBtn.disabled = currentSpreadIndex === 0;
        nextBtn.disabled = currentSpreadIndex === spreads.length - 1;

        // 4. 이벤트 바인딩
        attachSpreadEvents(s);
    }

    function attachSpreadEvents(s) {
        // A. 표지 시작 버튼
        const startBtn = $("startReadingBtn");
        if (startBtn) {
            startBtn.onclick = () => goTo(1, "next");
        }

        // B. 차례 목록 점프 버튼
        spreadEl.querySelectorAll("[data-jump-spread]").forEach((btn) => {
            btn.onclick = () => {
                const target = parseInt(btn.getAttribute("data-jump-spread"), 10);
                if (!isNaN(target)) goTo(target, target > currentSpreadIndex ? "next" : "prev");
            };
        });

        // C. 시 읽기 -> 문제 풀기 버튼
        const goQuizBtn = $("btnGoQuiz");
        if (goQuizBtn) {
            goQuizBtn.onclick = () => goTo(currentSpreadIndex + 1, "next");
        }

        // D. 문제 풀기 -> 해설 읽기 버튼
        const goNoteBtn = $("btnGoNote");
        if (goNoteBtn) {
            goNoteBtn.onclick = () => goTo(currentSpreadIndex + 1, "next");
        }

        // E. 퀴즈 보기 클릭 시 채점
        if (s.kind === "quiz") {
            spreadEl.querySelectorAll(".quiz-choice-btn").forEach((btn) => {
                btn.onclick = () => {
                    const isCorrect = btn.getAttribute("data-correct") === "1";
                    const qid = btn.getAttribute("data-qid");
                    const card = btn.closest(".quiz-card");
                    if (!card) return;

                    if (isCorrect) {
                        btn.classList.add("correct");
                        btn.classList.remove("incorrect");
                        // 같은 카드의 다른 선택지 오답 표시 정리 및 비활성화
                        card.querySelectorAll(".quiz-choice-btn").forEach((other) => {
                            if (other !== btn) {
                                other.classList.remove("incorrect");
                                other.disabled = true;
                            }
                        });
                        const explEl = card.querySelector(".quiz-expl-box");
                        if (explEl) explEl.classList.remove("hidden");

                        savePoemSolved(s.poem.id, qid);
                    } else {
                        btn.classList.add("incorrect");
                        setTimeout(() => btn.classList.remove("incorrect"), 600);
                    }
                };
            });
        }

        // F. 해설 -> 다음 시 또는 권 마무리
        const goNextAfterNote = $("btnGoNextAfterNote");
        if (goNextAfterNote) {
            goNextAfterNote.onclick = () => goTo(currentSpreadIndex + 1, "next");
        }

        // G. 완독 페이지 액션
        const btnNextBook = $("btnNextBook");
        if (btnNextBook) {
            btnNextBook.onclick = () => openBook(currentBookIndex + 1, 0);
        }
        const btnReturnToShelf = $("btnReturnToShelf");
        if (btnReturnToShelf) {
            btnReturnToShelf.onclick = () => showShelf();
        }
        const btnRestartBook = $("btnRestartBook");
        if (btnRestartBook) {
            btnRestartBook.onclick = () => goTo(0, "prev");
        }
    }

    // 페이지 이동
    function goTo(targetSpreadIndex, animDirection) {
        if (targetSpreadIndex < 0 || targetSpreadIndex >= spreads.length) return;
        const dir = animDirection || (targetSpreadIndex > currentSpreadIndex ? "next" : "prev");

        spreadEl.classList.remove("flip-next", "flip-prev");
        // 트리거 리플로우
        void spreadEl.offsetWidth;
        spreadEl.classList.add(dir === "next" ? "flip-next" : "flip-prev");

        currentSpreadIndex = targetSpreadIndex;
        paint();
    }

    /* ── 책 열기 ─────────────────────────────────────────────── */
    async function openBook(bookIndex, targetPoemIndex = -1) {
        const book = books[bookIndex];
        if (!book) return;

        currentBookIndex = bookIndex;

        // UI 모드 전환: 책장 숨김, 책 뷰 표시
        shelfScreen.hidden = true;
        bookScreen.hidden = false;
        shelfBackLink.hidden = true;
        bookShelfBtn.hidden = false;
        tocBtn.hidden = false;
        window.scrollTo(0, 0);

        // 로딩 화면 표시
        spreadEl.innerHTML = `
            <div class="story-page-left-full" style="grid-column: 1 / -1; align-items:center; justify-content:center;">
                <p style="font-size: 18px; color: var(--wood); font-weight: 700;">시집을 펼치는 중입니다...</p>
            </div>
        `;
        pageIndicator.textContent = "";

        // 해당 책에 수록된 시들을 모두 로드
        const poemsInBook = book.poemIds.map((id) => poemById.get(id)).filter(Boolean);
        await Promise.all(poemsInBook.map((p) => loadPoem(p)));
        currentBookPoems = poemsInBook;

        // 펼침면 생성
        spreads = buildSpreads(book, poemsInBook);

        if (targetPoemIndex >= 0 && targetPoemIndex < poemsInBook.length) {
            currentSpreadIndex = targetPoemIndex * 3 + 1;
        } else {
            currentSpreadIndex = 0;
        }

        paint();
    }

    /* ── 책장 화면 (Shelf Lobby) ──────────────────────────────── */
    function showShelf(activeTab = "order") {
        bookScreen.hidden = true;
        shelfScreen.hidden = false;
        shelfBackLink.hidden = false;
        bookShelfBtn.hidden = true;
        tocBtn.hidden = true;
        window.scrollTo(0, 0);

        setShelfTab(activeTab);
    }

    function setShelfTab(tab) {
        if (tab === "order") {
            orderTabBtn.classList.add("is-active");
            orderTabBtn.setAttribute("aria-selected", "true");
            topicTabBtn.classList.remove("is-active");
            topicTabBtn.setAttribute("aria-selected", "false");
            orderView.classList.remove("hidden");
            topicView.classList.add("hidden");
            renderBookShelf();
        } else {
            topicTabBtn.classList.add("is-active");
            topicTabBtn.setAttribute("aria-selected", "true");
            orderTabBtn.classList.remove("is-active");
            orderTabBtn.setAttribute("aria-selected", "false");
            topicView.classList.remove("hidden");
            orderView.classList.add("hidden");
            renderTopicView();
        }
    }

    // 책장 그리드 렌더링
    function renderBookShelf() {
        bookShelf.innerHTML = books.map((b, bIdx) => {
            const done = isBookDone(b);
            const volumeBadge = b.title.includes("·") ? b.title.split("·")[0].trim() : `제 ${bIdx + 1} 권`;
            const cleanTitle = b.title.includes("·") ? b.title.split("·").slice(1).join("·").trim() : b.title;

            return `
                <div class="book-card ${done ? 'is-done' : ''}" role="button" tabindex="0" data-book-idx="${bIdx}">
                    <div class="book-cover">
                        <span class="book-cover-badge">${escapeHtml(volumeBadge)}</span>
                        <div class="book-cover-title">${escapeHtml(cleanTitle)}</div>
                        <div class="book-cover-icon">📖</div>
                    </div>
                    <div class="book-title-meta">
                        <p class="book-card-title">${escapeHtml(b.title)}</p>
                        <p class="book-card-note">${escapeHtml(b.note || "")}</p>
                        <span class="book-card-badge">${done ? "완독 ✓" : `${b.poemIds.length}편 수록`}</span>
                    </div>
                </div>
            `;
        }).join("");

        bookShelf.querySelectorAll("[data-book-idx]").forEach((card) => {
            const idx = parseInt(card.getAttribute("data-book-idx"), 10);
            const open = () => openBook(idx);
            card.onclick = open;
            card.onkeydown = (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open();
                }
            };
        });
    }

    // 소재별 찾기 뷰 렌더링
    function renderTopicView() {
        topicChips.innerHTML = TOPICS.map((t) => `
            <button class="topic-chip ${t === activeTopic ? 'is-active' : ''}" type="button" data-topic="${t}">
                ${t}
            </button>
        `).join("");

        topicChips.querySelectorAll("[data-topic]").forEach((btn) => {
            btn.onclick = () => {
                activeTopic = btn.getAttribute("data-topic");
                renderTopicView();
            };
        });

        const list = poemsByTopic.get(activeTopic) || [];
        if (list.length === 0) {
            topicPoemList.innerHTML = `<li style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 30px;">등록된 시가 없습니다.</li>`;
            return;
        }

        topicPoemList.innerHTML = list.map((p) => {
            const done = isPoemDone(p.id);
            return `
                <li class="topic-poem-card" role="button" tabindex="0" data-poem-id="${p.id}">
                    <div>
                        <div class="topic-poem-title">${escapeHtml(p.title)} ${done ? "✓" : ""}</div>
                        <div class="topic-poem-poet">${escapeHtml(p.poet || "")}</div>
                    </div>
                    <span style="font-size: 13px; font-weight: 700; color: var(--gold);">읽기 ›</span>
                </li>
            `;
        }).join("");

        topicPoemList.querySelectorAll("[data-poem-id]").forEach((card) => {
            const poemId = card.getAttribute("data-poem-id");
            const handleSelect = () => {
                // 이 시가 속한 책 찾기
                let bIdx = books.findIndex((b) => b.poemIds.includes(poemId));
                if (bIdx < 0) bIdx = 0;
                const book = books[bIdx];
                const pIdxInBook = book.poemIds.indexOf(poemId);
                openBook(bIdx, pIdxInBook >= 0 ? pIdxInBook : 0);
            };
            card.onclick = handleSelect;
            card.onkeydown = (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect();
                }
            };
        });
    }

    /* ── 상단 네비게이션 & 키보드 & 터치 제스처 ───────────────── */
    orderTabBtn.onclick = () => setShelfTab("order");
    topicTabBtn.onclick = () => setShelfTab("topic");

    bookShelfBtn.onclick = () => showShelf();
    tocBtn.onclick = () => goTo(0, "prev");

    prevBtn.onclick = () => goTo(currentSpreadIndex - 1, "prev");
    nextBtn.onclick = () => goTo(currentSpreadIndex + 1, "next");

    // 키보드 방향키 이동
    window.addEventListener("keydown", (e) => {
        if (bookScreen.hidden) return;
        if (e.key === "ArrowLeft" || e.key === "PageUp") {
            e.preventDefault();
            goTo(currentSpreadIndex - 1, "prev");
        } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
            e.preventDefault();
            goTo(currentSpreadIndex + 1, "next");
        }
    });

    // 모바일 터치 스와이프
    let touchStartX = 0;
    let touchStartY = 0;
    spreadEl.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches[0]) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    spreadEl.addEventListener("touchend", (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx > 0) {
                    goTo(currentSpreadIndex - 1, "prev");
                } else {
                    goTo(currentSpreadIndex + 1, "next");
                }
            }
        }
    }, { passive: true });

    /* ── 초기 실행 ─────────────────────────────────────────────── */
    showShelf("order");

})();
