const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 크리스마스이브",
        hook: "가난한 오누이의 창밖에서는 무슨 소리가 들려왔을까?",
        beats: [{
            art: "01-eve.png",
            emoji: "🎄",
            left: [
                "오늘은 크리스마스이브예요. 가난한 나무꾼의 오누이 치르치르와 미치르가 잠들어 있는데, 창밖이 환해지며 시끌벅적한 소리가 들려왔어요. 이웃 부잣집에서 파티가 열리고 있었거든요."
            ],
            right: [
                "'아, 시끄러워.' 치르치르가 눈을 떴어요. '저기 좀 봐, 정말 근사하다!' 오누이는 반짝이는 불빛에 눈을 떼지 못했답니다."
            ]
        }]
    },
    {
        num: 2,
        title: "2장 · 빛의 요정",
        hook: "옆집 할머니는 사실 누구였을까?",
        beats: [{
            art: "02-fairy.png",
            emoji: "🧙‍♀️",
            left: [
                "'똑똑똑.' '누구세요?' '옆집 할머니란다. 아픈 딸이 파랑새를 보고 싶어 하는데, 너희가 찾아다 주겠니?' 오누이는 머뭇거렸어요. '저희는 아직 어려서 힘이 없는걸요.'"
            ],
            right: [
                "그 순간 할머니가 반짝이는 빛의 요정으로 변했어요! '이 모자를 쓰고 다이아몬드를 돌리렴. 사물의 진짜 마음이 보일 거야.' 치르치르가 다이아몬드를 돌리자, 신기한 일이 벌어졌어요."
            ]
        }]
    },
    {
        num: 3,
        title: "3장 · 요정들과의 만남",
        hook: "방 안 가득 나타난 요정들은 누구였을까?",
        beats: [{
            art: "03-elements.png",
            emoji: "🐕",
            left: [
                "강아지 치로와 고양이 치레트가 사람처럼 옷을 입고 걷기 시작했어요! 물독에서 물의 요정이, 난로에서 불의 요정이 통통 뛰어나왔답니다."
            ],
            right: [
                "'방이 요정들로 꽉 찼네!' 빛의 요정이 말했어요. '길은 제가 안내할게요.' '저희도 함께 가겠어요!' 모두 함께 파랑새를 찾아 길을 나섰답니다."
            ]
        }]
    },
    {
        num: 4,
        title: "4장 · 추억의 나라",
        hook: "안개 속 커다란 나무 너머에는 누가 기다리고 있었을까?",
        beats: [{
            art: "04-memory.png",
            emoji: "🕯️",
            left: [
                "안개 속 커다란 나무에 '추억의 나라'라고 쓰인 팻말이 걸려 있었어요. 그 나라에서 돌아가신 할아버지와 할머니가 반갑게 맞아 주셨어요. '오, 어서 오너라!'"
            ],
            right: [
                "할아버지와 할머니는 파랑새를 선물로 주셨어요. 그런데 돌아오는 길, 새장 속 파랑새가 그만 검은 새로 변해 있었어요. '이건 진짜가 아니구나.' 치르치르가 실망했답니다."
            ]
        }]
    },
    {
        num: 5,
        title: "5장 · 밤의 나라",
        hook: "성난 나무와 동물들에게 둘러싸인 오누이는 어떻게 됐을까?",
        beats: [{
            art: "05-night.png",
            emoji: "🌲",
            left: [
                "오누이는 다시 희망을 갖고 '밤의 나라'로 향했어요. 문을 열 때마다 무서운 괴물들이 뛰쳐나와 뒤쫓아 왔어요. '으악, 도망가자!'"
            ],
            right: [
                "숲으로 도망친 오누이 앞에 성난 나무와 동물들이 나타났어요. '너희 아버지가 우리 숲을 너무 베어냈어! 혼내 주자!' 오누이는 겁에 질려 옴짝달싹 못 했답니다."
            ]
        }]
    },
    {
        num: 6,
        title: "6장 · 무덤 앞에서",
        hook: "위기에서 벗어난 오누이가 다음으로 찾은 곳은 어디였을까?",
        beats: [{
            art: "06-escape.png",
            emoji: "🌹",
            left: [
                "'치르치르야, 빨리 다이아몬드를 돌리렴!' 빛의 요정의 목소리가 들려왔어요. 치르치르가 얼른 돌리자 무서운 숲이 사라지고, 오누이는 고요한 무덤 앞에 서 있었어요."
            ],
            right: [
                "'죽은 사람은 파랑새를 알지도 몰라.' 다시 돌려 보았지만, 그곳엔 붉은 장미꽃 한 송이만 피어 있었어요. 오누이는 어깨를 늘어뜨리고 다음 나라로 향했답니다."
            ]
        }]
    },
    {
        num: 7,
        title: "7장 · 행복의 나라",
        hook: "이곳의 음식을 먹으면 정말 게으름뱅이가 될까?",
        beats: [{
            art: "07-happiness.png",
            emoji: "🍰",
            left: [
                "'행복의 나라'엔 맛있는 냄새와 웃음소리가 가득했어요. '이번엔 찾을 수 있을 거야!' 하지만 이곳 음식을 먹으면 게으름뱅이가 된다는 걸 오누이는 몰랐어요."
            ],
            right: [
                "먹으려는 순간 빛의 요정이 날아왔어요. '안 돼, 돌리렴!' 음식이 연기처럼 사라졌어요. '진짜 행복이 뭔지 보여줄게.' 어머니가 나타나자 오누이는 웬일인지 마음이 쓸쓸했답니다."
            ]
        }]
    },
    {
        num: 8,
        title: "8장 · 미래의 나라",
        hook: "아직 태어나지 않은 아기들은 무엇을 하고 있었을까?",
        beats: [{
            art: "08-future.png",
            emoji: "👶",
            left: [
                "'기운 내렴, 미래의 나라로 가 보자.' 그곳엔 수많은 아기들이 무언가를 열심히 배우고 있었어요. '곧 태어날 아이들이 할 일을 미리 배우는 거란다.'"
            ],
            right: [
                "'배를 타렴!' 시간의 할아버지가 외치자 아기들이 줄지어 배에 올랐어요. 오누이는 파랑새를 발견하고 손을 뻗었지만, 그 새도 곧 빨간 새로 변해버렸답니다."
            ]
        }]
    },
    {
        num: 9,
        title: "9장 · 파랑새는 집에 있었다",
        hook: "그토록 찾아 헤맨 파랑새는 결국 어디에 있었을까?",
        beats: [{
            art: "09-home.png",
            emoji: "🐦",
            left: [
                "'치르치르, 미치르, 일어나렴.' 오누이는 잠에서 깼어요. 어머니와 옆집 할머니가 크리스마스 아침 인사를 건넸어요. '할머니, 죄송해요. 파랑새를 못 찾았어요.'"
            ],
            right: [
                "'파랑새라면, 저기 있잖니?' 할머니가 새장을 가리켰어요. '어, 우리 집에 있던 새잖아!' 오누이는 그제야 깨달았어요. 애타게 찾던 행복이 실은 늘 곁에 있었다는 것을요."
            ]
        }],
        moral: "행복은 멀리 떠나야만 찾을 수 있는 게 아니에요. 이미 내 곁에 있는 것들의 소중함을 알아차리는 마음이 진짜 행복이랍니다.",
        question: "이미 내 곁에 있던 소중한 것을 뒤늦게 깨달은 적이 있나요?"
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
                ${artFrame('cover.png', '🐦')}
            </div>
            <div class="story-page-right">
                <h1>파랑새</h1>
                <p>파랑새는 벨기에의 작가 모리스 마테를링크가 1908년에 쓴 작품이에요. 처음부터 동화책이었던 것이 아니라, 무대에서 배우들이 연기하는 연극이었답니다.</p>
                <p>이 연극은 벨기에가 아니라 러시아 모스크바의 극장에서 처음 무대에 올랐어요. 무대에 빛의 요정과 물의 요정, 사람처럼 걷는 개와 고양이가 등장하는 이 작품은 당시로서는 아주 새로운 시도였지요.</p>
                <p>마테를링크는 1911년에 노벨 문학상을 받았어요. 연극이 큰 사랑을 받자 아이들도 읽을 수 있도록 이야기책으로 옮긴 판이 여러 나라에서 나왔는데, 오늘날 우리가 읽는 파랑새는 대부분 그렇게 다시 쓰인 것이랍니다.</p>
                <p>행복을 뜻할 때 쓰는 파랑새라는 말도 이 작품에서 나왔어요. 작품 하나가 새로 만들어 낸 말이 백 년이 넘도록 여러 나라에서 쓰이고 있는 셈이지요.</p>
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
    { q: "오누이가 크리스마스이브에 들은 소리는 무엇이었나요?", choices: ["이웃집 파티 소리", "눈보라 소리", "종소리"], answer: 0 },
    { q: "옆집 할머니는 사실 누구였나요?", choices: ["마녀", "빛의 요정", "이웃 부잣집 사람"], answer: 1 },
    { q: "다이아몬드를 돌리면 어떤 일이 벌어졌나요?", choices: ["사물이 요정으로 변한다", "시간이 멈춘다", "하늘을 난다"], answer: 0 },
    { q: "추억의 나라에서 오누이를 맞아준 사람은 누구였나요?", choices: ["부모님", "돌아가신 할아버지 할머니", "왕과 왕비"], answer: 1 },
    { q: "밤의 나라에서 나무와 동물들이 화가 난 이유는 무엇인가요?", choices: ["아버지가 나무를 많이 베어서", "오누이가 시끄럽게 해서", "파랑새를 훔쳐가서"], answer: 0 },
    { q: "행복의 나라 음식을 먹으면 어떻게 되나요?", choices: ["게으름뱅이가 된다", "잠이 든다", "작아진다"], answer: 0 },
    { q: "미래의 나라에서 만난 아기들은 무엇을 하고 있었나요?", choices: ["잠을 잤다", "태어나서 할 일을 미리 배웠다", "파랑새를 키웠다"], answer: 1 },
    { q: "오누이가 그토록 찾아 헤맨 파랑새는 결국 어디 있었나요?", choices: ["미래의 나라", "자기 집 새장", "행복의 나라"], answer: 1 }
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
            <h2>파랑새 이야기를 다 읽었어요!</h2>
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
