const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 사라진 비단",
        beats: [
            {
                art: "01-merchant.webp",
                emoji: "🧵",
                left: [
                    "한여름이었어요.",
                    "비단 장수가 무거운 비단 짐을 지고 길을 걸었습니다.",
                    "\"아이고, 더워라.\""
                ],
                right: [
                    "길가에 커다란 돌기둥 하나가 서 있었어요. 무덤 앞에 세우는 망두석이었지요.",
                    "장수는 그 그늘에 짐을 내려놓고 잠깐 눈을 붙였답니다."
                ]
            },
            {
                art: "02-gone.webp",
                emoji: "😱",
                left: [
                    "얼마나 잤을까요. 눈을 뜬 장수는 벌떡 일어났어요.",
                    "짐이 없었습니다."
                ],
                right: [
                    "\"내 비단! 내 비단이 어디 갔어!\"",
                    "사방을 둘러봐도 사람 그림자 하나 없었어요. 장수는 그 자리에 주저앉아 엉엉 울었지요."
                ]
            },
            {
                art: "03-court.webp",
                emoji: "🏛️",
                left: [
                    "장수는 곧장 관아로 달려갔습니다.",
                    "\"사또, 제 비단을 몽땅 잃었습니다!\"",
                    "\"곁에 누가 있었느냐?\""
                ],
                right: [
                    "\"아무도 없었습니다.\"",
                    "\"정말 아무도 없었느냐?\"",
                    "\"…망두석 하나뿐이었습니다.\""
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 돌을 잡아 오너라",
        beats: [
            {
                art: "04-arrest.webp",
                emoji: "😳",
                left: [
                    "원님은 잠시 생각하더니 큰 소리로 명했어요.",
                    "\"당장 그 망두석을 잡아 오너라!\""
                ],
                right: [
                    "\"예? 도, 돌을요?\"",
                    "포졸들은 서로 얼굴만 쳐다보았습니다.",
                    "\"어허, 사또 말이 우습게 들리느냐!\""
                ]
            },
            {
                art: "05-drag.webp",
                emoji: "🪢",
                left: [
                    "포졸들이 밧줄로 돌기둥을 칭칭 감아 관아로 끌고 왔어요.",
                    "영차, 영차."
                ],
                right: [
                    "\"관아에서 돌을 재판한다더라!\"",
                    "소문을 들은 사람들이 구름처럼 몰려들었습니다. 마당은 발 디딜 틈도 없었지요."
                ]
            },
            {
                art: "06-question.webp",
                emoji: "🗿",
                left: [
                    "원님이 돌기둥을 노려보며 호통쳤어요.",
                    "\"네 이놈! 네가 그 자리에 있지 않았느냐!\"",
                    "\"도둑이 누구인지 어서 말하라!\""
                ],
                right: [
                    "돌은 아무 말이 없었어요.",
                    "당연한 일이었지요.",
                    "\"끝내 입을 열지 않겠다는 것이냐!\""
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 웃음의 값",
        beats: [
            {
                art: "07-laugh.webp",
                emoji: "😂",
                left: [
                    "그 순간이었습니다.",
                    "\"푸흡!\"",
                    "누군가 참지 못하고 웃음을 터뜨렸어요."
                ],
                right: [
                    "한 사람이 웃자 옆 사람이 웃고, 곧 마당 전체가 웃음바다가 되었습니다.",
                    "\"으하하하!\""
                ]
            },
            {
                art: "08-fine.webp",
                emoji: "😠",
                left: [
                    "원님이 상을 탁 내리쳤어요.",
                    "\"관아에서 함부로 웃다니, 이런 무엄한 일이 있느냐!\""
                ],
                right: [
                    "\"벌로 오늘 안에 비단 한 필씩 바쳐라!\"",
                    "웃던 사람들은 얼굴이 새파래져서 뿔뿔이 흩어졌답니다."
                ]
            },
            {
                art: "09-silk.webp",
                emoji: "🧶",
                left: [
                    "저녁이 되자 마당에 비단이 수북이 쌓였어요. 원님이 비단 장수를 불렀습니다.",
                    "\"이 중에 네 것이 있는지 보아라.\""
                ],
                right: [
                    "장수가 한 필 한 필 살피다가 소리쳤어요.",
                    "\"이겁니다! 이건 제가 짠 비단이 틀림없어요!\""
                ]
            },
            {
                art: "10-caught.webp",
                emoji: "⚖️",
                left: [
                    "그 비단을 바친 사람이 곧 도둑이었습니다. 포졸들이 그를 붙잡자 원님이 빙그레 웃었어요.",
                    "\"돌이 말을 해 줄 리가 있겠느냐.\""
                ],
                right: [
                    "\"나는 처음부터 사람들을 불러 모으려던 것이었다.\"",
                    "구경꾼들은 그제야 무릎을 탁 쳤답니다."
                ]
            }
        ],
        moral: "돌은 끝내 아무 말도 하지 않았어요. 하지만 원님은 처음부터 돌에게 묻고 있지 않았지요. 정면으로 답이 없어 보이는 일에도 돌아가는 길이 있답니다.",
        question: "곧장 풀리지 않는 문제를 다른 방법으로 풀어 본 적이 있나요?"
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
                ${artFrame('cover.webp', '⚖️')}
            </div>
            <div class="story-page-right">
                <h1>망두석 재판</h1>
                <p>망두석 재판은 지은이가 없는 구전 설화예요. 돌 재판이라는 이름으로도 전해진답니다.</p>
                <p>망두석은 무덤 앞 양쪽에 세우는 돌기둥이에요. 망주석이라고도 하지요. 무덤을 지키고 멀리서도 눈에 띄게 하려고 세운 것이라, 옛날에는 길가에서 흔히 볼 수 있었답니다.</p>
                <p>어려운 사건을 슬기롭게 푸는 원님이 주인공인 이야기를 송사 설화라고 불러요. 중국에는 포청천, 우리나라에는 암행어사 박문수처럼 이름난 인물이 있지요. 그런데 이 이야기의 원님은 이름이 전하지 않아요. 누구였는지보다 어떻게 풀었는지가 중요했기 때문일 거예요.</p>
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
    { q: "비단 장수는 어디에서 잠이 들었나요?", choices: ["나루터 배 안", "망두석 그늘", "주막의 방 안"], answer: 1 },
    { q: "원님은 누구를 잡아 오라고 했나요?", choices: ["비단 장수", "마을 사람", "망두석"], answer: 2 },
    { q: "돌은 원님의 물음에 어떻게 했나요?", choices: ["아무 말이 없었다", "크게 소리쳤다", "고개를 저었다"], answer: 0 },
    { q: "구경꾼들이 웃자 원님은 무엇을 시켰나요?", choices: ["하루 종일 서 있기", "집으로 돌아가기", "비단 한 필씩 내기"], answer: 2 },
    { q: "도둑은 어떻게 잡혔나요?", choices: ["훔친 비단을 내서", "스스로 자백해서", "포졸이 뒤쫓아서"], answer: 0 },
    { q: "원님이 돌을 재판한 진짜 까닭은 무엇인가요?", choices: ["돌이 말할까 봐", "사람을 모으려고", "벌을 주려고"], answer: 1 }
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
            <h2>망두석 재판 이야기를 다 읽었어요!</h2>
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
