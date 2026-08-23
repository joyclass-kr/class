const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 하얀 조약돌",
        hook: "",
        beats: [{
            art: "01-pebbles.png",
            emoji: "🤍",
            left: [
                "숲가 오두막에 나무꾼과 두 남매가 살았어요. 그해 흉년이 들어 먹을 것이 뚝 떨어졌죠. 밤중에 새어머니가 아버지를 조르는 소리가 들렸어요. '애들을 숲에 두고 옵시다.'"
            ],
            right: [
                "'그런 소리 마오!' 아버지가 펄쩍 뛰었지만 새어머니는 막무가내였어요. 그 말을 엿들은 헨젤은 몰래 마당에 나가 달빛에 반짝이는 하얀 조약돌을 주머니 가득 주워 담았답니다."
            ]
        }]
    },
    {
        num: 2,
        title: "2장 · 다시 찾아온 길",
        hook: "",
        beats: [{
            art: "02-back-home.png",
            emoji: "🌙",
            left: [
                "이튿날 숲 깊은 곳. '여기서 잠깐 기다리렴.' 어른들이 사라지자 그레텔이 울먹였어요. '오빠, 우리 어떡해?' '걱정 마.' 헨젤이 씩 웃었죠."
            ],
            right: [
                "달이 뜨자 헨젤이 떨어뜨려 둔 조약돌이 하얗게 반짝였어요. 남매는 그 길을 따라 무사히 집에 닿았답니다. 아버지는 두 아이를 끌어안고 엉엉 울었어요."
            ]
        }]
    },
    {
        num: 3,
        title: "3장 · 새들이 먹어 버린 빵",
        hook: "",
        beats: [{
            art: "03-breadcrumbs.png",
            emoji: "🐦",
            left: [
                "얼마 뒤, 새어머니가 또 우겼어요. 이번엔 문을 미리 잠가 두어 헨젤은 조약돌을 주울 수 없었죠. '괜찮아. 빵을 부숴서 뿌리면 돼.' 헨젤이 그레텔에게 속삭였어요."
            ],
            right: [
                "하지만 숲을 나서려고 뒤를 돌아본 순간, 남매는 그 자리에 얼어붙었어요. 빵 부스러기가 하나도 없었거든요! 배고픈 새들이 죄다 쪼아 먹어 버린 뒤였답니다."
            ]
        }]
    },
    {
        num: 4,
        title: "4장 · 과자로 만든 집",
        hook: "",
        beats: [{
            art: "04-candy-house.png",
            emoji: "🍬",
            left: [
                "사흘을 헤맨 남매 앞에 이상한 집이 나타났어요. 벽은 과자, 지붕은 초콜릿, 창문은 반짝이는 사탕이었죠! '와아—' 남매는 정신없이 벽을 뜯어 먹기 시작했어요."
            ],
            right: [
                "그때 삐걱, 문이 열리며 꼬부랑 할멈이 나왔어요. '아이고, 배고팠구나. 어서 들어오렴. 따끈한 밥이 있단다.' 할멈은 웃고 있었지만, 눈빛이 어쩐지 서늘했답니다."
            ]
        }]
    },
    {
        num: 5,
        title: "5장 · 우리에 갇힌 헨젤",
        hook: "",
        beats: [{
            art: "05-cage.png",
            emoji: "🦴",
            left: [
                "할멈은 사실 아이들을 잡아먹는 마귀할멈이었어요. 다음 날 아침, 헨젤은 쇠창살 우리에 갇히고 말았죠. '살이 통통하게 오르면 잡아먹어야지. 헤헤.'"
            ],
            right: [
                "할멈은 눈이 어두워 매일 헨젤의 손가락을 만져 보며 살이 쪘는지 확인했어요. 꾀 많은 헨젤은 손가락 대신 가느다란 닭뼈를 쓱 내밀었죠. '어라? 왜 이렇게 안 찌는 거야!'"
            ]
        }]
    },
    {
        num: 6,
        title: "6장 · 그레텔의 꾀",
        hook: "",
        beats: [{
            art: "06-oven.png",
            emoji: "🔥",
            left: [
                "기다리다 지친 할멈이 화덕에 불을 지폈어요. '얘, 안에 들어가서 잘 달았는지 보고 오너라.' 그레텔은 눈치를 챘죠. '어떻게 들어가는지 모르겠어요.'"
            ],
            right: [
                "'에구, 답답해라. 이렇게 하는 거다!' 할멈이 몸을 숙이는 순간, 그레텔은 있는 힘껏 밀치고 화덕 문을 쾅 닫아 걸었어요. 그러고는 오빠의 우리를 열었답니다. '오빠, 도망가자!'"
            ]
        }]
    },
    {
        num: 7,
        title: "7장 · 집으로",
        hook: "",
        beats: [{
            art: "07-home.png",
            emoji: "💎",
            left: [
                "남매는 할멈이 숨겨 둔 보석을 주머니에 가득 담고 숲을 빠져나왔어요. 강가에서는 마음씨 좋은 오리가 등에 태워 건네주었죠. '고마워, 오리야!'"
            ],
            right: [
                "오두막 문을 열자 아버지가 달려 나왔어요. '얘들아! 얼마나 찾아 헤맸는지 아니!' 새어머니는 이미 집을 떠나고 없었답니다. 세 식구는 다시는 헤어지지 않고 오래오래 살았어요."
            ]
        }],
        moral: "무섭고 막막한 상황에서도 침착하게 방법을 찾으면 길이 열려요. 헨젤과 그레텔이 서로를 놓지 않았기에 둘 다 살아 돌아올 수 있었답니다.",
        question: "겁이 나는 상황에서 침착하게 방법을 찾아낸 적이 있나요?"
    }
];

function artFrame(src, emoji) {
    return `
        <div class="art-frame">
            <img src="images/${src}" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="art-fallback" style="display:none">${emoji}</div>
        </div>`;
}

function coverPage() {
    return `
        <div class="page page-cover">
            <div class="story-page-left story-page-left-full">
                ${artFrame('cover.png', '🍬')}
            </div>
            <div class="story-page-right">
                <h1>헨젤과 그레텔</h1>
                <p>헨젤과 그레텔은 독일의 그림 형제가 1812년에 펴낸 이야기집에 실린 이야기예요. 그림 형제는 고향 헤센 지방을 다니며 사람들이 들려주는 옛이야기를 받아 적었는데, 이 이야기도 그렇게 모은 것 가운데 하나랍니다.</p>
                <p>이 이야기가 만들어질 무렵 유럽에는 큰 흉년이 자주 들었어요. 먹을 것이 없어 온 마을이 굶던 시절의 두려움이 이야기 속에 그대로 담겨 있지요. 옛이야기는 이렇게 그 시대 사람들이 무엇을 가장 무서워했는지를 알려 주기도 해요.</p>
                <p>이 책은 어린이가 읽기에 알맞도록 무서운 장면을 부드럽게 다듬었어요.</p>
            </div>
        </div>`;
}

function tocPage() {
    const itemHtml = s => `
        <li>
            <button type="button" data-goto="${s.num}">
                <span class="toc-num">${s.num}</span>
                <span>
                    <strong>${s.title.replace(/^\d+장 · /, '')}</strong>
                </span>
            </button>
        </li>`;
    const quizItemHtml = `
        <li>
            <button type="button" data-goto-kind="quiz">
                <span class="toc-num">❓</span>
                <span>
                    <strong>이야기 문제</strong>
                </span>
            </button>
        </li>`;
    const half = Math.ceil(CHAPTERS.length / 2);
    const leftItems = CHAPTERS.slice(0, half).map(itemHtml).join('');
    const rightItems = CHAPTERS.slice(half).map(itemHtml).join('') + quizItemHtml;
    return `
        <div class="page page-toc">
            <div class="story-page-left">
                <h2>차례</h2>
                <ul class="toc-list">${leftItems}</ul>
            </div>
            <div class="story-page-right">
                <ul class="toc-list">${rightItems}</ul>
            </div>
        </div>`;
}

function spreadPage(chapter, beat, isFirst) {
    const badgeHtml = isFirst ? `<div class="spread-chapter-badge">${chapter.title}</div>` : '';
    const leftHtml = beat.left.map(p => `<p>${p}</p>`).join('');
    const rightHtml = beat.right.map(p => `<p>${p}</p>`).join('');
    const moralHtml = '';
    return `
        <div class="page page-story${moralHtml ? ' spread-final' : ''}">
            <div class="spread-art">
                ${badgeHtml}
                ${artFrame(beat.art, beat.emoji)}
            </div>
            <div class="spread-text">
                <div class="spread-text-left">${leftHtml}</div>
                <div class="spread-text-right">${rightHtml}</div>
                ${moralHtml}
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
    { q: "헨젤이 첫날 밤에 주운 것은 무엇인가요?", choices: ["하얀 조약돌", "빵 부스러기", "나뭇잎"], answer: 0 },
    { q: "조약돌은 어떻게 길을 알려 주었나요?", choices: ["소리가 나서", "달빛에 반짝여서", "냄새가 나서"], answer: 1 },
    { q: "두 번째로 뿌린 빵 부스러기는 어떻게 됐나요?", choices: ["비에 쓸려갔다", "새들이 먹었다", "바람에 날렸다"], answer: 1 },
    { q: "숲에서 발견한 집은 무엇으로 만들어져 있었나요?", choices: ["과자와 사탕", "통나무", "돌과 흙"], answer: 0 },
    { q: "헨젤은 손가락 대신 무엇을 내밀었나요?", choices: ["나뭇가지", "닭뼈", "밧줄"], answer: 1 },
    { q: "그레텔은 할멈에게 뭐라고 하며 시간을 벌었나요?", choices: ["배가 아프다고", "들어가는 법을 모른다고", "무섭다고"], answer: 1 },
    { q: "집에 돌아온 남매를 맞이한 사람은 누구인가요?", choices: ["아버지", "새어머니", "이웃"], answer: 0 }
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
            <h2>헨젤과 그레텔을 다 읽었어요!</h2>
            <a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a>
        </div>`;
}

const PAGES = [
    { kind: 'cover' },
    { kind: 'toc' },
    ...CHAPTERS.flatMap(chapter => chapter.beats.map((beat, i) => ({ kind: 'spread', chapter, beat, isFirst: i === 0 }))),
    { kind: 'reflection', chapter: CHAPTERS[CHAPTERS.length - 1] },
    { kind: 'quiz' },
    { kind: 'end' }
];

const TWO_PAGE_KINDS = new Set(['spread', 'toc', 'cover']);

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
        case 'toc':
            return tocPage();
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
    const idx = PAGES.findIndex(p => p.kind === 'toc');
    if (idx >= 0) goTo(idx);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
});

paint();
