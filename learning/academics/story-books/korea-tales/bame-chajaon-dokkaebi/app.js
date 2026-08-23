const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 개울가의 사내",
        beats: [
            {
                art: "01-nightroad.png",
                emoji: "🌙",
                left: [
                    "김 서방이 밤늦게 집으로 가는 길이었습니다.",
                    "주막에서 한잔 걸친 터라 걸음이 흥겨웠지요.",
                    "\"에헤라, 달도 밝구나.\""
                ],
                right: [
                    "개울에 놓인 징검다리를 건너려는데,",
                    "저쪽 끝에 웬 사내가 떡 버티고 서 있었어요.",
                    "\"뉘시오?\""
                ]
            },
            {
                art: "02-challenge.png",
                emoji: "👹",
                left: [
                    "사내는 키가 김 서방의 두 배는 되어 보였습니다.",
                    "달빛에 비친 머리에는 뿔이 하나 삐죽 솟아 있었지요."
                ],
                right: [
                    "\"어이, 거기 사람.\"",
                    "\"나랑 씨름 한판 하자.\"",
                    "김 서방은 그제야 알아차렸어요. 도깨비였습니다!"
                ]
            },
            {
                art: "03-grip.png",
                emoji: "💪",
                left: [
                    "\"싫다면 밤새 못 지나간다.\"",
                    "\"어허, 이거 별수 없구먼.\""
                ],
                right: [
                    "김 서방은 소매를 걷어붙이고 도깨비의 허리를 잡았어요.",
                    "도깨비도 김 서방의 허리를 턱 잡았지요.",
                    "\"자, 간다!\""
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 왼다리를 걸어라",
        beats: [
            {
                art: "04-wrestle.png",
                emoji: "🤼",
                left: [
                    "밀고, 당기고, 또 밀고.",
                    "도깨비는 힘이 어찌나 센지 바위를 미는 것 같았어요."
                ],
                right: [
                    "김 서방의 발이 자꾸 땅에서 들렸습니다.",
                    "\"헉, 헉… 이거 큰일 났네.\"",
                    "도깨비는 껄껄 웃기만 했지요."
                ]
            },
            {
                art: "05-remember.png",
                emoji: "💡",
                left: [
                    "그때 김 서방의 머릿속에 어릴 적 들은 말이 떠올랐어요.",
                    "'도깨비는 왼쪽 다리가 약하다고 했지.'"
                ],
                right: [
                    "김 서방은 슬쩍 몸을 낮췄습니다.",
                    "그러고는 도깨비의 왼다리 뒤로 발을 쑥 밀어 넣었어요."
                ]
            },
            {
                art: "06-throw.png",
                emoji: "💥",
                left: [
                    "\"이얍!\"",
                    "쿵!",
                    "도깨비가 그대로 나자빠졌습니다."
                ],
                right: [
                    "\"어어? 이게 무슨 일이야!\"",
                    "도깨비는 팔다리를 버둥거렸지만 일어나지 못했어요.",
                    "김 서방은 얼른 허리띠를 풀었지요."
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 아침에 남은 것",
        beats: [
            {
                art: "07-tied.png",
                emoji: "🪢",
                left: [
                    "김 서방은 도깨비를 개울가 버드나무에 꽁꽁 묶었어요.",
                    "몇 겹으로, 아주 단단히."
                ],
                right: [
                    "\"내일 아침에 마을 사람들 다 데려올 테니 꼼짝 말고 있어라!\"",
                    "\"이거 놔라! 놓으란 말이다!\"",
                    "도깨비의 고함이 밤새 개울가에 울렸답니다."
                ]
            },
            {
                art: "08-boast.png",
                emoji: "😤",
                left: [
                    "이튿날 아침이었어요.",
                    "\"내가 어젯밤에 도깨비를 잡았소!\""
                ],
                right: [
                    "\"뭐? 도깨비를?\"",
                    "\"버드나무에 묶어 놨으니 와서들 보시오!\"",
                    "마을 사람들이 우르르 몰려나왔지요."
                ]
            },
            {
                art: "09-broom.png",
                emoji: "🧹",
                left: [
                    "개울가 버드나무 앞에 다다랐을 때였습니다.",
                    "허리띠는 그대로 나무를 칭칭 감고 있었어요."
                ],
                right: [
                    "그런데 그 안에 묶여 있는 것은,",
                    "몽당비가 다 된 낡은 빗자루 한 자루였답니다."
                ]
            },
            {
                art: "10-laugh.png",
                emoji: "😂",
                left: [
                    "\"으하하하!\"",
                    "\"김 서방이 빗자루하고 씨름을 했구먼!\"",
                    "온 마을이 웃음바다가 되었어요."
                ],
                right: [
                    "김 서방은 얼굴이 홍시처럼 빨개졌지요.",
                    "그 뒤로 김 서방은 밤길에 빗자루만 보아도 슬금슬금 피해 다녔답니다."
                ]
            }
        ],
        moral: "밤에는 낡은 빗자루도 뿔 달린 도깨비로 보여요. 어두울 때 본 것은 날이 밝은 뒤에 다시 보면 달라 보이는 법이랍니다.",
        question: "무섭게 느껴졌던 것이 알고 보니 아무것도 아니었던 적이 있나요?"
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
                ${artFrame('cover.png', '👹')}
            </div>
            <div class="story-page-right">
                <h1>밤에 찾아온 도깨비</h1>
                <p>밤에 찾아온 도깨비는 지은이가 없는 구전 설화예요. 도깨비 씨름이라는 이름으로도 전해진답니다.</p>
                <p>우리 도깨비는 서양의 괴물과 아주 달라요. 뿔이 나고 힘은 세지만 무섭기보다 어수룩하지요. 씨름을 좋아하고, 메밀묵을 좋아하고, 심술은 부려도 사람을 해치지는 않아요. 옛사람들에게 도깨비는 두려운 존재라기보다 밤길에 만나는 짓궂은 이웃 같은 것이었답니다.</p>
                <p>도깨비는 흔히 오래 쓰다 버린 물건에서 생긴다고 했어요. 빗자루, 절굿공이, 부지깽이처럼 사람 손을 오래 탄 것들이지요. 그래서 아침이 되면 도깨비가 있던 자리에 낡은 살림살이 하나가 남아 있곤 한답니다.</p>
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
    { q: "김 서방은 어디에서 도깨비를 만났나요?", choices: ["집 마당 한가운데", "밤길 개울가에서", "장터 뒷골목에서"], answer: 1 },
    { q: "도깨비가 하자고 한 것은 무엇인가요?", choices: ["노래 대결", "달리기 내기", "씨름 한판"], answer: 2 },
    { q: "도깨비의 약한 곳은 어디라고 했나요?", choices: ["왼쪽 다리", "오른쪽 팔", "등 한가운데"], answer: 0 },
    { q: "김 서방은 도깨비를 어떻게 했나요?", choices: ["집으로 데려갔다", "그냥 놓아주었다", "나무에 묶어 두었다"], answer: 2 },
    { q: "아침에 나무에 묶여 있던 것은 무엇인가요?", choices: ["낡은 빗자루", "커다란 바위", "부러진 지게"], answer: 0 },
    { q: "그 뒤로 김 서방은 어떻게 했나요?", choices: ["매일 밤 씨름했다", "빗자루를 피해 다녔다", "도깨비를 찾아다녔다"], answer: 1 }
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
            ${artFrame('end.png', '🌟')}
            <h2>밤에 찾아온 도깨비 이야기를 다 읽었어요!</h2>
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
