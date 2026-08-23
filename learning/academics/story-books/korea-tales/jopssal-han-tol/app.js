const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 좁쌀 한 톨",
        beats: [
            {
                art: "01-depart.png",
                emoji: "🌾",
                left: [
                    "옛날에 아주 가난한 소년이 살았습니다.",
                    "어느 날 소년은 큰 세상을 보러 길을 떠나기로 했어요."
                ],
                right: [
                    "봇짐을 뒤져 보니 나올 것이 없었지요.",
                    "딱 하나, 좁쌀 한 톨.",
                    "소년은 그것을 정성스레 종이에 싸서 품에 넣었답니다."
                ]
            },
            {
                art: "02-first.png",
                emoji: "🏠",
                left: [
                    "해가 저물어 어느 집 문을 두드렸어요.",
                    "\"하룻밤만 묵어 갈 수 있을까요?\"",
                    "\"들어오게.\""
                ],
                right: [
                    "소년은 종이를 펴서 좁쌀 한 톨을 내밀었어요.",
                    "\"제 전 재산입니다. 잘 간수해 주세요.\"",
                    "주인은 웃음을 참으며 선반에 올려 두었지요."
                ]
            },
            {
                art: "03-mouse.png",
                emoji: "🐭",
                left: [
                    "이튿날 아침이었어요.",
                    "선반 위에 좁쌀이 없었습니다.",
                    "\"이런! 밤새 쥐가 먹어 버렸구먼.\""
                ],
                right: [
                    "\"미안하네. 대신 그 쥐를 잡아 줌세.\"",
                    "주인은 얼굴이 벌게져 온 집을 뒤졌어요.",
                    "소년은 쥐를 받아 들고 꾸벅 인사했답니다."
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 쥐에서 말까지",
        beats: [
            {
                art: "04-cat.png",
                emoji: "🐱",
                left: [
                    "다음 집에서도 소년은 똑같이 말했어요.",
                    "\"제 전 재산입니다. 잘 부탁드립니다.\"",
                    "\"…쥐가 말인가?\""
                ],
                right: [
                    "그런데 아침에 보니 고양이가 쥐를 물어 갔지 뭐예요.",
                    "\"어허, 이걸 어쩌나.\"",
                    "\"그럼 이 고양이를 데려가게.\""
                ]
            },
            {
                art: "05-dog.png",
                emoji: "🐕",
                left: [
                    "그다음 집에서는 고양이를 맡겼습니다.",
                    "\"제 전 재산이에요.\"",
                    "\"허, 그 말 참 자주 하는구먼.\""
                ],
                right: [
                    "아침에 보니 그 집 개가 고양이를 담 밖으로 쫓아냈어요.",
                    "주인은 머리를 긁적였지요.",
                    "\"할 수 없구먼. 이 개를 가져가게.\""
                ]
            },
            {
                art: "06-horse.png",
                emoji: "🐴",
                left: [
                    "이번에는 개를 맡겼어요.",
                    "주인은 개를 마구간 옆에 매어 두었지요."
                ],
                right: [
                    "그런데 밤중에 말이 뒷발질을 하는 바람에 개가 달아났어요.",
                    "주인이 두 손으로 얼굴을 감쌌습니다.",
                    "\"어허… 이 말을 끌고 가게.\""
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 황소를 끌고",
        beats: [
            {
                art: "07-ox.png",
                emoji: "🐂",
                left: [
                    "소년은 말을 끌고 또 길을 갔어요.",
                    "그날 밤 묵은 집에서 말을 외양간에 매어 두었지요."
                ],
                right: [
                    "아침이 되자 황소가 뿔을 휘둘러 말을 내쫓아 버렸어요.",
                    "\"…그 황소를 주시겠습니까?\"",
                    "\"어허, 어떻게 알았누?\""
                ]
            },
            {
                art: "08-road.png",
                emoji: "🛤️",
                left: [
                    "소년은 커다란 황소의 고삐를 잡고 길을 걸었습니다.",
                    "지나가던 사람들이 눈을 크게 떴어요."
                ],
                right: [
                    "\"저 어린 것이 웬 황소를 다 끌고 가누?\"",
                    "\"어디 부잣집 아들인가 보네.\"",
                    "\"제 전 재산입니다.\" 소년이 빙그레 웃었어요."
                ]
            },
            {
                art: "09-home.png",
                emoji: "🏡",
                left: [
                    "마침내 소년이 집에 닿았어요.",
                    "\"어머니, 저 왔어요!\""
                ],
                right: [
                    "문을 열고 나온 어머니는 눈이 휘둥그레졌습니다.",
                    "\"아니, 이 소는 대체 어디서 났느냐?\""
                ]
            },
            {
                art: "10-millet.png",
                emoji: "📜",
                left: [
                    "소년은 품에서 종이를 꺼내 폈어요.",
                    "좁쌀을 쌌던 바로 그 종이였지요."
                ],
                right: [
                    "\"이 안에 좁쌀 한 톨이 들어 있었잖아요.\"",
                    "\"그 한 톨로 시작한 일이랍니다.\"",
                    "황소가 커다랗게 음메— 하고 울었어요."
                ]
            }
        ],
        moral: "작다고 함부로 여기지 않는 마음이 좁쌀 한 톨을 황소로 만들었어요. 소년은 한 번도 억지를 부리지 않았어요. 그저 자기 것을 끝까지 소중히 여겼을 뿐이지요.",
        question: "지금 내 손에 있는 작은 것 가운데 소중히 여겨야 할 것은 무엇일까요?"
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
                ${artFrame('cover.png', '🌾')}
            </div>
            <div class="story-page-right">
                <h1>좁쌀 한 톨</h1>
                <p>좁쌀 한 톨은 지은이가 없는 구전 설화예요. 좁쌀 한 톨로 부자 되기라는 이름으로도 전해진답니다.</p>
                <p>작은 것이 점점 큰 것으로 바뀌어 가는 짜임을 누적담이라고 불러요. 같은 일이 되풀이되면서 조금씩 커지기 때문에, 듣는 사람이 다음에는 무엇이 나올지 저절로 기다리게 되지요. 세계 곳곳에 같은 짜임의 이야기가 있는데 일본의 볏짚 부자 이야기가 특히 닮았답니다.</p>
                <p>좁쌀은 조라는 곡식의 알갱이예요. 쌀보다 훨씬 작아서 한 톨은 눈에 겨우 보일 정도지요. 하필 가장 작은 곡식을 고른 것은 시작이 작을수록 끝이 놀라워지기 때문이랍니다.</p>
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
    { q: "소년이 길을 떠날 때 가진 것은 무엇인가요?", choices: ["엽전 한 닢", "좁쌀 한 톨", "떡 한 조각"], answer: 1 },
    { q: "좁쌀을 먹어 버린 것은 무엇인가요?", choices: ["새", "개", "쥐"], answer: 2 },
    { q: "쥐를 물어 간 것은 무엇인가요?", choices: ["고양이", "족제비", "까마귀"], answer: 0 },
    { q: "개를 놀라 달아나게 한 것은 무엇인가요?", choices: ["갑작스런 비", "한밤의 천둥", "말의 뒷발질"], answer: 2 },
    { q: "소년이 마지막으로 얻은 것은 무엇인가요?", choices: ["황소", "망아지", "염소"], answer: 0 },
    { q: "소년은 어머니에게 무엇을 꺼내 보였나요?", choices: ["황소를 산 문서", "좁쌀을 쌌던 종이", "길에서 주운 돈"], answer: 1 }
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
            <h2>좁쌀 한 톨 이야기를 다 읽었어요!</h2>
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
