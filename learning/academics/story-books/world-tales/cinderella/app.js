const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 재투성이 소녀",
        hook: "새어머니와 언니들 틈에서 신데렐라는 어떻게 지냈을까?",
        beats: [{
            art: "story-01-chores.png",
            emoji: "🧹",
            left: [
                "신데렐라는 새벽부터 물을 긷고 마루를 닦았어요. 그때 새어머니가 들어오더니 쨍쨍 소리쳤죠. '얘! 이 먼지 좀 봐라. 당장 다시 닦아!'"
            ],
            right: [
                "언니들은 깔깔대며 예쁜 옷을 차려입고 나가 버렸어요. 신데렐라는 벽난로 앞에 웅크려 앉아 조용히 중얼거렸죠. '괜찮아. 나에게도 좋은 날이 올 거야.'"
            ]
        }]
    },
    {
        num: 2,
        title: "2장 · 무도회 초대장",
        hook: "온 나라의 처녀들을 초대한 무도회, 신데렐라도 갈 수 있을까?",
        beats: [{
            art: "story-02-invite.png",
            emoji: "💌",
            left: [
                "'왕자님이 신붓감을 찾으신대! 무도회를 여신다고!' 언니들이 꽥꽥 소리치며 방방 뛰었어요. '저도 가 보면 안 될까요?' '네가? 호호, 웃기고 있네!'"
            ],
            right: [
                "'이 콩을 저녁까지 다 골라 놓으면 생각해 보마.' 새어머니는 콩을 와르르 쏟아 놓고 떠나 버렸어요. 텅 빈 집에서 신데렐라는 눈물을 뚝뚝 흘렸답니다."
            ]
        }]
    },
    {
        num: 3,
        title: "3장 · 요정 대모의 마법",
        hook: "눈물을 흘리던 신데렐라 앞에 누가 나타났을까?",
        beats: [{
            art: "story-03-magic.png",
            emoji: "🪄",
            left: [
                "'얘야, 왜 울고 있니?' 요정 대모가 나타났어요. 사정을 들은 대모가 지팡이를 휙 휘둘렀죠. '얍!' 그러자 호박이 반짝이는 황금 마차로 변했어요!"
            ],
            right: [
                "생쥐는 백마로, 낡은 옷은 눈부신 드레스로 변했어요. '잘 들으렴. 자정이 되면 마법이 싹 풀린단다. 늦으면 큰일 나!' '네, 꼭 기억할게요!'"
            ]
        }]
    },
    {
        num: 4,
        title: "4장 · 무도회의 밤",
        hook: "왕자님과 함께 춤춘 신비한 소녀는 자정이 되자 어떻게 됐을까?",
        beats: [{
            art: "story-04-ball.png",
            emoji: "💃",
            left: [
                "'저 아름다운 아가씨는 대체 누구지?' 사람들이 수군거렸어요. 왕자는 첫눈에 반해 밤새 신데렐라하고만 춤을 췄죠. 언니들조차 알아보지 못했답니다."
            ],
            right: [
                "'뎅— 뎅— 뎅—' '앗, 자정이다!' 신데렐라는 정신없이 계단을 뛰어 내려갔어요. 툭! 유리구두 한 짝이 벗겨졌지만 돌아볼 틈이 없었답니다."
            ]
        }]
    },
    {
        num: 5,
        title: "5장 · 유리구두를 찾아서",
        hook: "왕자는 유리구두의 주인을 어떻게 찾으려 했을까?",
        beats: [{
            art: "story-05-search.png",
            emoji: "🔍",
            left: [
                "'이 구두가 맞는 아가씨가 내 신부다!' 신하들이 온 나라를 뒤졌어요. 언니들은 서로 밀치며 발을 욱여넣었죠. '으윽… 조금만 더… 들어가라, 좀!'"
            ],
            right: [
                "'저도 신어 봐도 될까요?' '푸하하! 재투성이가 무슨 유리구두야!' 언니들이 배꼽을 잡고 웃었지만, 신하는 조용히 구두를 내밀었답니다."
            ]
        }]
    },
    {
        num: 6,
        title: "6장 · 신데렐라의 발",
        hook: "유리구두는 과연 누구의 것으로 밝혀졌을까?",
        beats: [{
            art: "story-06-fit.png",
            emoji: "👠",
            left: [
                "쓱— 유리구두가 신데렐라의 발에 쏙 들어갔어요! 방 안이 쥐 죽은 듯 조용해졌죠. '찾았습니다! 바로 이분이세요!' 신하가 벌떡 일어나 외쳤어요."
            ],
            right: [
                "왕자가 한달음에 달려왔어요. '역시 그날 밤의 그대였군요!' 언니들은 얼굴이 새빨개졌지만, 신데렐라는 웃으며 손을 내밀었답니다."
            ]
        }]
    },
    {
        num: 7,
        title: "7장 · 행복한 시작",
        hook: "신데렐라는 그 후 어떤 삶을 살게 됐을까?",
        beats: [{
            art: "story-07-wedding.png",
            emoji: "💍",
            left: [
                "신데렐라와 왕자는 성대한 결혼식을 올렸어요. 왕비가 된 뒤에도 신데렐라는 예전 그대로였죠. 자신을 괴롭혔던 언니들에게도 따뜻하게 대했답니다."
            ],
            right: [
                "'착한 마음은 아무리 힘들어도 빛을 잃지 않는구나.' 사람들은 그렇게 말하곤 했어요. 신데렐라는 화려한 옷이 아니라 끝까지 지킨 마음씨로 행복을 찾은 거예요."
            ]
        }],
        moral: "어려운 상황에서도 마음씨를 지킨 사람은, 결국 자기 힘으로 행복을 찾아가요. 화려함보다 중요한 건 그 사람이 끝까지 지켜온 마음이랍니다.",
        question: "힘든 순간에도 나답게 마음을 지켰던 적이 있나요?"
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
                ${artFrame('cover.png', '👠')}
            </div>
            <div class="story-page-right">
                <h1>신데렐라</h1>
                <p>신데렐라는 유럽 곳곳에서 오래도록 전해 내려온 옛이야기예요. 프랑스의 샤를 페로가 1697년에, 독일의 그림 형제가 1812년에 각각 자기가 들은 대로 책에 옮겨 적었답니다.</p>
                <p>두 판은 내용이 꽤 달라요. 유리 구두와 요정 대모, 호박 마차는 페로가 적은 판에서 나온 것이고, 그림 형제 판에는 요정 대신 어머니 무덤에서 자란 나무와 새들이 소녀를 돕지요. 오늘날 널리 알려진 이야기는 페로 판에 가까워요.</p>
                <p>비슷한 줄거리를 가진 이야기가 세계 곳곳에 수백 가지나 있어요. 중국에는 9세기에 이미 글로 적힌 섭한 이야기가 있는데, 페로보다 팔백 년이나 앞선 것이랍니다.</p>
                <p>우리나라의 콩쥐 팥쥐도 같은 갈래예요. 서로 만난 적 없는 먼 나라 사람들이 어째서 이렇게 닮은 이야기를 만들었는지는 지금도 학자들이 연구하고 있는 문제랍니다.</p>
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
    { q: "새어머니와 언니들은 신데렐라를 뭐라고 놀려 불렀나요?", choices: ["공주님", "재투성이", "막내딸"], answer: 1 },
    { q: "신데렐라는 왜 무도회에 갈 수 없었나요?", choices: ["몸이 아파서", "입을 옷이 없어서", "방법을 몰라서"], answer: 1 },
    { q: "요정 대모는 호박을 무엇으로 바꿨나요?", choices: ["황금 마차", "유리구두", "드레스"], answer: 0 },
    { q: "요정 대모가 신신당부한 것은 무엇인가요?", choices: ["예의 바르게 행동할 것", "자정 전에 돌아올 것", "왕자에게 먼저 말 걸 것"], answer: 1 },
    { q: "신데렐라는 계단에서 무엇을 잃어버렸나요?", choices: ["머리핀", "유리구두 한 짝", "목걸이"], answer: 1 },
    { q: "언니들은 왜 유리구두를 신지 못했나요?", choices: ["구두가 너무 커서", "발이 맞지 않아서", "구두를 잃어버려서"], answer: 1 },
    { q: "유리구두는 결국 누구의 발에 맞았나요?", choices: ["첫째 언니", "둘째 언니", "신데렐라"], answer: 2 }
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
            <h2>신데렐라 이야기를 다 읽었어요!</h2>
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
