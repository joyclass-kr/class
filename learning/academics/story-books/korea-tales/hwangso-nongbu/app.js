const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 일하기 싫은 농부",
        beats: [
            {
                art: "01-lazy.webp",
                emoji: "😴",
                left: [
                    "옛날 어느 마을에 농부가 하나 살았습니다.",
                    "그런데 이 농부는 농사일을 죽기보다 싫어했어요.",
                    "해가 중천에 떠도 자리에서 일어나지 않았지요."
                ],
                right: [
                    "\"여보, 밭에 좀 나가 봐요.\"",
                    "\"조금만 더 누워 있다가요.\"",
                    "\"그 조금이 벌써 사흘째예요!\""
                ]
            },
            {
                art: "02-leave.webp",
                emoji: "🚶",
                left: [
                    "농부는 잔소리가 듣기 싫어 슬그머니 집을 나왔어요."
                ],
                right: [
                    "\"세상에 일 안 하고 사는 법이 어디 없을까.\"",
                    "터덜터덜 걷다 보니 어느새 낯선 산길이었답니다."
                ]
            },
            {
                art: "03-mask.webp",
                emoji: "🎭",
                left: [
                    "커다란 나무 아래에 노인이 앉아 있었어요. 손에는 소 얼굴 모양의 탈이 들려 있었지요.",
                    "\"어르신, 그건 뭡니까?\""
                ],
                right: [
                    "\"이걸 쓰면 평생 일하지 않고 먹고산다네.\"",
                    "\"예? 정말입니까?\"",
                    "농부의 눈이 번쩍 뜨였어요."
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 탈을 쓴 날",
        beats: [
            {
                art: "04-become.webp",
                emoji: "🐂",
                left: [
                    "\"어서 주십시오!\"",
                    "농부는 탈을 냉큼 받아 얼굴에 썼습니다. 그 순간이었어요."
                ],
                right: [
                    "\"음메—!\"",
                    "손은 발굽이 되고 등에는 털이 돋았어요. 농부는 커다란 황소가 되어 버렸답니다."
                ]
            },
            {
                art: "05-sold.webp",
                emoji: "💰",
                left: [
                    "노인은 기다렸다는 듯 고삐를 매었어요. 그러고는 황소를 장으로 끌고 갔지요.",
                    "\"좋은 소요! 힘이 아주 좋소!\""
                ],
                right: [
                    "소를 산 사람에게 노인이 한마디 덧붙였습니다.",
                    "\"단, 무는 절대 먹이지 마시오. 먹으면 죽습니다.\""
                ]
            },
            {
                art: "06-work.webp",
                emoji: "🌾",
                left: [
                    "이튿날 새벽부터 일이 시작되었어요.",
                    "쟁기를 매고 밭을 갈고, 짐을 지고 언덕을 오르고.",
                    "\"이랴! 이랴!\""
                ],
                right: [
                    "'아이고, 이게 무슨 일이야.'",
                    "억울하다고 소리쳐 보았지만 입에서는 음메 소리밖에 나오지 않았답니다."
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 무밭에서",
        beats: [
            {
                art: "07-regret.webp",
                emoji: "😢",
                left: [
                    "여물은 맛이 없고 어깨는 쑤셨어요.",
                    "'집에서 밭 좀 갈걸.'"
                ],
                right: [
                    "'그게 이보다 백배는 나았는데.'",
                    "황소는 밤마다 외양간에서 눈물을 흘렸습니다. 하지만 아무도 그 마음을 알아주지 않았지요."
                ]
            },
            {
                art: "08-radish.webp",
                emoji: "🥬",
                left: [
                    "어느 날, 무밭 옆을 지날 때였어요. 배가 어찌나 고픈지 견딜 수가 없었습니다.",
                    "'에라, 모르겠다.'"
                ],
                right: [
                    "황소는 무를 하나 뽑아 씹어 먹었어요.",
                    "우적, 우적."
                ]
            },
            {
                art: "09-human.webp",
                emoji: "😲",
                left: [
                    "그때였습니다.",
                    "펑!",
                    "털이 사라지고 발굽이 손으로 돌아왔어요."
                ],
                right: [
                    "농부가 무밭 한가운데에 벌떡 서 있었지요.",
                    "\"어, 어어? 사람이잖아!\"",
                    "소 주인은 그 자리에 털썩 주저앉고 말았답니다."
                ]
            },
            {
                art: "10-work-hard.webp",
                emoji: "💪",
                left: [
                    "농부는 뒤도 안 돌아보고 집으로 달렸어요.",
                    "\"여보! 내가 왔소!\""
                ],
                right: [
                    "그날부터 그는 마을에서 제일 부지런한 사람이 되었습니다.",
                    "누가 게으름을 피우면 이렇게 말했대요.",
                    "\"그러다 소 된다!\""
                ]
            }
        ],
        moral: "일을 피하려다 더 힘든 일을 만나기도 해요. 농부는 평생 일하지 않으려다 도리어 소가 되어 죽도록 일했답니다.",
        question: "하기 싫어 미뤄 두었다가 더 힘들어진 일이 있나요?"
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
                ${artFrame('cover.webp', '🐂')}
            </div>
            <div class="story-page-right">
                <h1>황소가 된 농부</h1>
                <p>황소가 된 농부는 지은이가 없는 구전 설화예요. 소가 된 게으름뱅이라는 이름으로 더 널리 알려져 있답니다.</p>
                <p>우리 옛이야기에서 소는 성실함을 대표하는 짐승이에요. 새벽부터 밤까지 묵묵히 일하지요. 게으른 사람을 하필 소로 만든 것은, 가장 부지런한 짐승이 되어 봐야 부지런함이 무엇인지 안다는 뜻이 담긴 것이랍니다.</p>
                <p>게으름을 피우는 아이에게 어른들이 그러다 소 된다고 하는 말이 바로 이 이야기에서 나왔어요. 지금도 쓰이는 말이지요.</p>
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
    { q: "농부는 왜 집을 나왔나요?", choices: ["돈을 벌려고", "잔소리가 싫어서", "길을 잃어서"], answer: 1 },
    { q: "노인이 손에 들고 있던 것은 무엇이었나요?", choices: ["나무 지게", "짚신 한 켤레", "소 얼굴 탈"], answer: 2 },
    { q: "탈을 쓰자 농부는 어떻게 되었나요?", choices: ["황소가 되었다", "부자가 되었다", "잠이 들었다"], answer: 0 },
    { q: "노인이 소를 산 사람에게 당부한 것은 무엇인가요?", choices: ["매를 들지 말라", "밤에 재우지 말라", "무를 먹이지 말라"], answer: 2 },
    { q: "황소는 왜 무를 먹었나요?", choices: ["배가 고파서", "맛있어 보여서", "주인이 줘서"], answer: 0 },
    { q: "사람으로 돌아온 뒤 그는 어떻게 살았나요?", choices: ["다시 게을렀다", "부지런히 일했다", "마을을 떠났다"], answer: 1 }
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
            <h2>황소가 된 농부 이야기를 다 읽었어요!</h2>
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
