const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 산길에서 만난 둥지",
        beats: [
            {
                art: "01-road.webp",
                emoji: "🏞️",
                left: [
                    "한 선비가 과거를 보러 한양으로 가는 길이었습니다.",
                    "등에는 봇짐, 어깨에는 활을 메고 있었지요."
                ],
                right: [
                    "\"오늘 안에 저 고개를 넘어야 할 텐데.\"",
                    "산길은 깊고 인적은 없었어요. 해는 벌써 서쪽으로 기울고 있었답니다."
                ]
            },
            {
                art: "02-nest.webp",
                emoji: "🪺",
                left: [
                    "그때 요란한 소리가 들렸어요.",
                    "\"깍깍! 깍깍깍!\"",
                    "고개를 드니 커다란 나무 위에 까치 둥지가 있었습니다."
                ],
                right: [
                    "둥지 쪽으로 시커먼 구렁이가 스르르 올라가고 있었어요.",
                    "까치 두 마리가 날개를 퍼덕이며 울부짖었지만 소용없었지요."
                ]
            },
            {
                art: "03-arrow.webp",
                emoji: "🏹",
                left: [
                    "선비는 얼른 활을 당겼습니다.",
                    "\"이놈!\"",
                    "핑—"
                ],
                right: [
                    "화살을 맞은 구렁이는 나무 아래로 툭 떨어졌어요. 까치 두 마리가 선비의 머리 위를 몇 바퀴나 맴돌며 울었습니다.",
                    "\"깍깍! 깍깍!\""
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 외딴집의 밤",
        beats: [
            {
                art: "04-house.webp",
                emoji: "🏚️",
                left: [
                    "날이 캄캄해졌을 무렵, 저 멀리 불빛 하나가 보였어요.",
                    "산속 외딴집이었지요."
                ],
                right: [
                    "\"하룻밤만 묵어 갈 수 있겠습니까?\"",
                    "\"들어오세요.\"",
                    "흰옷을 입은 여인이 문을 열어 주었답니다."
                ]
            },
            {
                art: "05-coil.webp",
                emoji: "🐍",
                left: [
                    "한밤중이었어요. 선비는 몸이 무거워 눈을 떴습니다.",
                    "그런데 숨을 쉴 수가 없었어요."
                ],
                right: [
                    "커다란 구렁이 한 마리가 선비의 몸을 칭칭 감고 있었지요.",
                    "\"허, 헉!\""
                ]
            },
            {
                art: "06-revenge.webp",
                emoji: "😱",
                left: [
                    "\"낮에 네가 화살로 쏜 구렁이를 기억하느냐.\"",
                    "\"그이가 바로 내 남편이다.\""
                ],
                right: [
                    "낮에 문을 열어 주던 그 여인의 목소리였어요.",
                    "\"오늘 밤 네 목숨으로 갚아야겠다.\"",
                    "선비는 입술이 바짝 말랐습니다."
                ]
            },
            {
                art: "07-bell.webp",
                emoji: "🔔",
                left: [
                    "\"살려 주십시오. 저는 까치를 구했을 뿐입니다.\"",
                    "구렁이는 잠시 생각하더니 말했어요."
                ],
                right: [
                    "\"좋다. 날이 밝기 전에 저 산 위 절의 종이 세 번 울리면 놓아주마.\"",
                    "아무도 살지 않는 빈 절이었어요. 종을 칠 사람이 있을 리 없었지요."
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 종이 세 번 울리다",
        beats: [
            {
                art: "08-ring.webp",
                emoji: "🌄",
                left: [
                    "밤이 깊어 갔습니다. 창밖이 희끄무레해질 무렵이었어요.",
                    "뎅—",
                    "\"뭐?\""
                ],
                right: [
                    "뎅—  뎅—",
                    "틀림없이 세 번이었어요.",
                    "구렁이는 스르르 몸을 풀더니 어둠 속으로 사라졌답니다."
                ]
            },
            {
                art: "09-temple.webp",
                emoji: "⛩️",
                left: [
                    "날이 밝자 선비는 산 위 절로 달려갔습니다. 낡은 종 아래에 무언가 떨어져 있었어요. 까치 두 마리였습니다."
                ],
                right: [
                    "어제 그 까치들이었지요. 제 몸으로 종을 들이받아 세 번을 울린 것이었어요."
                ]
            },
            {
                art: "10-nest-home.webp",
                emoji: "🐦",
                left: [
                    "선비는 까치들을 조심스럽게 품에 안았어요.",
                    "\"너희가 나를 살렸구나.\"",
                    "둘 다 아직 숨이 붙어 있었지요."
                ],
                right: [
                    "선비는 과거도 미루고 까치를 돌보았습니다. 이레가 지나자 까치들은 다시 날아올랐어요.",
                    "그 뒤로 까치는 선비의 집 마당에 둥지를 틀었답니다."
                ]
            }
        ],
        moral: "베푼 마음은 어디로든 돌아와요. 선비는 아무 대가도 바라지 않고 까치를 구했지만, 그날 밤 목숨을 구한 것은 선비였답니다.",
        question: "누군가에게 아무 대가 없이 도움을 준 적이 있나요?"
    }
];

function artFrame(src, emoji) {
    return `
        <div class="art-frame">
            <img src="images/${src}" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="art-fallback" style="display:none">${emoji}</div>
        </div>`;
}

function coverToc() {
    const item = s => `
        <button type="button" data-goto="${s.num}">
            <span class="toc-num">${s.num}</span>
            <span>${s.title.replace(/^\d+장 · /, '')}</span>
        </button>`;
    return `
        <nav class="cover-toc">
            <h2>차례</h2>
            ${CHAPTERS.map(item).join('')}
            <button type="button" data-goto-kind="quiz">
                <span class="toc-num">❓</span>
                <span>이야기 문제</span>
            </button>
        </nav>`;
}

function coverPage() {
    return `
        <div class="page page-cover">
            <div class="story-page-left story-page-left-full">
                ${artFrame('cover.webp', '🐦')}
            </div>
            <div class="story-page-right">
                <h1>은혜 갚은 까치</h1>
                <p>은혜 갚은 까치는 지은이가 없는 구전 설화예요. 은혜 갚은 꿩이라는 이름으로도 전해지고, 지역에 따라 까치 대신 꿩이 나오기도 한답니다.</p>
                <p>이야기의 무대가 되는 절은 강원도 원주 치악산의 상원사로 전해져요. 치악산의 원래 이름은 붉다는 뜻의 적악산이었는데, 이 이야기 때문에 꿩을 뜻하는 글자를 넣어 치악산으로 바뀌었다는 말이 함께 전한답니다.</p>
                <p>우리 옛이야기에는 사람이 구해 준 동물이 은혜를 되갚는 이야기가 아주 많아요. 은혜 갚은 두꺼비, 은혜 갚은 호랑이처럼요. 짐승도 은혜를 아는데 사람이야 말할 것도 없다는 뜻으로 옛사람들이 즐겨 들려주던 이야기 갈래랍니다.</p>
                ${coverToc()}
            </div>
        </div>`;
}

function spreadPage(chapter, beat, isFirst) {
    const badgeHtml = isFirst ? `<div class="spread-chapter-badge">${chapter.title}</div>` : '';
    const leftHtml = beat.left.map(p => `<p>${p}</p>`).join('');
    const rightHtml = beat.right.map(p => `<p>${p}</p>`).join('');
    return `
        <div class="page page-story">
            <div class="spread-art">
                ${badgeHtml}
                ${artFrame(beat.art, beat.emoji)}
            </div>
            <div class="spread-text">
                <div class="spread-text-left">${leftHtml}</div>
                <div class="spread-text-right">${rightHtml}</div>
            </div>
        </div>`;
}

function reflectionPage(chapter) {
    return `
        <div class="page page-reflection">
            <h2>이야기를 다 읽고</h2>
            <p class="reflection-moral">${chapter.moral}</p>
            <p class="reflection-question">${chapter.question}</p>
        </div>`;
}

const QUIZ = [
    { q: "선비는 어디로 가는 길이었나요?", choices: ["장사하러 시골", "과거 보러 한양", "친척집 잔치"], answer: 1 },
    { q: "선비는 무엇으로 구렁이를 물리쳤나요?", choices: ["돌", "낫", "활"], answer: 2 },
    { q: "한밤중에 선비의 몸을 감은 것은 무엇이었나요?", choices: ["커다란 구렁이", "산속의 여인", "커다란 나무"], answer: 0 },
    { q: "구렁이는 무슨 조건을 걸었나요?", choices: ["날 밝기 전 도망가기", "까치를 데려오기", "종이 세 번 울리기"], answer: 2 },
    { q: "종을 울린 것은 누구였나요?", choices: ["까치 두 마리", "절의 스님", "지나던 나그네"], answer: 0 },
    { q: "선비는 떨어진 까치들을 어떻게 했나요?", choices: ["그냥 두고 갔다", "데려가 돌봤다", "둥지에 올렸다"], answer: 1 }
];

function quizPage() {
    const items = QUIZ.map((item, i) => `
        <div class="quiz-item" data-qindex="${i}">
            <p class="quiz-question">${i + 1}. ${item.q}</p>
            <div class="quiz-choices">
                ${item.choices.map((c, ci) => `<button type="button" class="quiz-choice" data-choice="${ci}">${c}</button>`).join('')}
            </div>
        </div>`).join('');
    return `
        <div class="page page-quiz">
            <h2>이야기 문제</h2>
            <p class="quiz-intro-text" id="quizProgress">0 / 총 ${QUIZ.length}문항 완료</p>
            <div class="quiz-list">${items}</div>
        </div>`;
}

function endPage() {
    return `
        <div class="page page-end">
            ${artFrame('end.webp', '🌟')}
            <h2>은혜 갚은 까치 이야기를 다 읽었어요!</h2>
            <a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a>
        </div>`;
}

const PAGES = [
    { kind: 'cover' },
    ...CHAPTERS.flatMap(chapter => chapter.beats.map((beat, i) => ({ kind: 'spread', chapter, beat, isFirst: i === 0 }))),
    { kind: 'reflection', chapter: CHAPTERS[CHAPTERS.length - 1] },
    { kind: 'quiz' },
    { kind: 'end' }
];

const TWO_PAGE_KINDS = new Set(['spread', 'cover']);

let folioCounter = 0;
const FOLIOS = PAGES.map(p => {
    const width = TWO_PAGE_KINDS.has(p.kind) ? 2 : 1;
    const start = folioCounter + 1;
    folioCounter += width;
    return { start, width };
});

function renderPage(page) {
    switch (page.kind) {
        case 'cover':
            return coverPage();
        case 'spread':
            return spreadPage(page.chapter, page.beat, page.isFirst);
        case 'reflection':
            return reflectionPage(page.chapter);
        case 'quiz':
            return quizPage();
        case 'end':
            return endPage();
        default:
            return '';
    }
}

let current = 0;
let animating = false;

const spreadEl = document.getElementById('spread');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorEl = document.getElementById('pageIndicator');
const folioLeftEl = document.getElementById('folioLeft');
const folioRightEl = document.getElementById('folioRight');

function paint() {
    spreadEl.innerHTML = renderPage(PAGES[current]);
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === PAGES.length - 1;
    indicatorEl.textContent = `${current + 1} / ${PAGES.length}`;

    const folio = FOLIOS[current];
    folioLeftEl.classList.toggle('folio-center', folio.width === 1);
    if (folio.width === 2) {
        folioLeftEl.textContent = folio.start;
        folioRightEl.textContent = folio.start + 1;
        folioLeftEl.hidden = false;
        folioRightEl.hidden = false;
    } else {
        folioLeftEl.textContent = folio.start;
        folioLeftEl.hidden = false;
        folioRightEl.hidden = true;
    }

    spreadEl.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => {
            const chapterNum = Number(btn.dataset.goto);
            const idx = PAGES.findIndex(p => p.kind === 'spread' && p.chapter.num === chapterNum && p.isFirst);
            if (idx >= 0) goTo(idx);
        });
    });
    spreadEl.querySelectorAll('[data-goto-kind]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = PAGES.findIndex(p => p.kind === btn.dataset.gotoKind);
            if (idx >= 0) goTo(idx);
        });
    });

    if (PAGES[current].kind === 'quiz') {
        initQuiz();
    }
}

function initQuiz() {
    let answeredCount = 0;
    const progressEl = document.getElementById('quizProgress');

    spreadEl.querySelectorAll('.quiz-item').forEach(item => {
        const qi = Number(item.dataset.qindex);
        const q = QUIZ[qi];
        item.querySelectorAll('.quiz-choice').forEach(btn => {
            btn.addEventListener('click', () => {
                if (item.classList.contains('graded')) return;
                item.classList.add('graded');
                const chosen = Number(btn.dataset.choice);
                item.querySelectorAll('.quiz-choice').forEach(b => {
                    const ci = Number(b.dataset.choice);
                    if (ci === q.answer) b.classList.add('correct');
                    else if (ci === chosen) b.classList.add('incorrect');
                });
                answeredCount++;
                progressEl.textContent = `${answeredCount} / 총 ${QUIZ.length}문항 완료`;
            });
        });
    });
}

function goTo(index) {
    if (animating || index === current || index < 0 || index >= PAGES.length) return;
    animating = true;
    const dir = index > current ? 'flip-next' : 'flip-prev';
    spreadEl.classList.add(dir);
    setTimeout(() => {
        current = index;
        paint();
    }, 230);
    setTimeout(() => {
        spreadEl.classList.remove('flip-next', 'flip-prev');
        animating = false;
    }, 480);
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

document.getElementById('tocLink').addEventListener('click', () => {
    // 그림책은 차례가 표지에 붙어 있다.
    const idx = PAGES.findIndex(p => p.kind === 'toc');
    goTo(idx >= 0 ? idx : 0);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
});

paint();
