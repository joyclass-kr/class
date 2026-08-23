const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 거울아, 거울아",
        hook: "",
        beats: [{
            art: "01-mirror.png",
            emoji: "🪞",
            left: [
                "새 왕비에게는 무엇이든 사실대로 말하는 신기한 거울이 있었어요. 왕비는 아침마다 거울 앞에 섰죠. '거울아, 거울아. 이 나라에서 누가 제일 아름답지?' '그야 왕비님이시죠.'"
            ],
            right: [
                "그런데 어느 날 거울이 다르게 대답했어요. '이제는 백설공주가 제일 아름답습니다.' '뭐라고?!' 왕비는 거울을 노려보며 이를 갈았답니다. '어디 두고 보자.'"
            ]
        }]
    },
    {
        num: 2,
        title: "2장 · 숲으로 간 공주",
        hook: "",
        beats: [{
            art: "02-forest.png",
            emoji: "🌲",
            left: [
                "왕비는 사냥꾼을 불러 명령했어요. '공주를 숲 깊은 곳으로 데려가거라. 다시는 성으로 돌아오지 못하게 해라.' 사냥꾼은 차마 그럴 수 없었죠."
            ],
            right: [
                "'공주님, 어서 멀리 도망치세요. 절대 돌아오시면 안 됩니다.' 사냥꾼은 그렇게 말하고 공주를 놓아주었어요. 백설공주는 어두운 숲을 혼자 헤매기 시작했답니다."
            ]
        }]
    },
    {
        num: 3,
        title: "3장 · 일곱 난쟁이의 집",
        hook: "",
        beats: [{
            art: "03-dwarfs.png",
            emoji: "🏠",
            left: [
                "한참을 헤매다 공주는 자그마한 오두막을 발견했어요. 작은 침대가 일곱 개, 작은 의자도 일곱 개! 지친 공주는 그만 침대에 누워 잠이 들었죠."
            ],
            right: [
                "저녁에 돌아온 일곱 난쟁이가 깜짝 놀랐어요. '어, 누가 자고 있네!' 잠에서 깬 공주가 사정을 이야기하자 난쟁이들이 고개를 끄덕였어요. '여기서 같이 지내요. 대신 낯선 사람에게 문 열어 주면 안 돼요!'"
            ]
        }]
    },
    {
        num: 4,
        title: "4장 · 빗과 허리끈",
        hook: "",
        beats: [{
            art: "04-disguise.png",
            emoji: "🧣",
            left: [
                "거울을 통해 공주가 살아 있는 걸 알아챈 왕비는 장사꾼으로 변장했어요. '예쁜 허리끈 사세요!' 공주가 문틈으로 내다보자 왕비가 살살 꼬드겼죠."
            ],
            right: [
                "'딱 한 번만 매어 보세요.' 왕비는 허리끈을 있는 힘껏 졸라맸어요. 공주는 그 자리에 폭 쓰러졌지만, 돌아온 난쟁이들이 얼른 끈을 풀어 주었답니다. '낯선 사람은 안 된다고 했잖아요!'"
            ]
        }]
    },
    {
        num: 5,
        title: "5장 · 새빨간 사과",
        hook: "",
        beats: [{
            art: "05-apple.png",
            emoji: "🍎",
            left: [
                "왕비는 이번엔 할머니로 변장하고 새빨간 사과를 들고 왔어요. '얘야, 사과 하나 먹어 보렴.' '아니에요, 문 열면 안 돼요.' 공주가 고개를 저었죠."
            ],
            right: [
                "'그럼 내가 먼저 먹어 보마.' 할머니는 반쪽을 베어 물고 웃었어요. 사실 독은 빨간 쪽에만 발라 두었죠. 안심한 공주가 한 입 베어 물자마자 그대로 쓰러지고 말았답니다."
            ]
        }]
    },
    {
        num: 6,
        title: "6장 · 유리관 속의 공주",
        hook: "",
        beats: [{
            art: "06-glass-coffin.png",
            emoji: "💎",
            left: [
                "난쟁이들은 아무리 애를 써도 공주를 깨울 수 없었어요. 차마 땅에 묻지 못한 난쟁이들은 유리관을 만들어 언덕 위에 놓고 밤낮으로 곁을 지켰답니다."
            ],
            right: [
                "그렇게 오랜 시간이 흐른 어느 날, 지나가던 왕자가 유리관을 보고 걸음을 멈췄어요. '이토록 고운 분이…' 왕자는 난쟁이들에게 간곡히 청해 유리관을 성으로 옮기기로 했어요."
            ]
        }]
    },
    {
        num: 7,
        title: "7장 · 사과 조각이 튀어나오다",
        hook: "",
        beats: [{
            art: "07-awake.png",
            emoji: "👑",
            left: [
                "신하들이 유리관을 들고 언덕을 내려가는데, 돌부리에 발이 걸려 관이 크게 흔들렸어요. 그 바람에 공주의 목에 걸려 있던 사과 조각이 툭 튀어나왔답니다."
            ],
            right: [
                "'콜록!' 공주가 눈을 번쩍 떴어요. '여기가… 어디죠?' 난쟁이들이 우르르 달려와 껑충껑충 뛰었어요. 못된 왕비는 그 소식을 듣고 스스로 부끄러워 멀리 떠나 버렸답니다."
            ]
        }],
        moral: "남을 시기하는 마음은 결국 자기 자신을 가장 힘들게 해요. 그리고 여러 번 당부를 들었다면, 그 말에는 다 이유가 있는 법이랍니다.",
        question: "누군가를 부러워하다가 마음이 오히려 불편해진 적이 있나요?"
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
                ${artFrame('cover.png', '🍎')}
            </div>
            <div class="story-page-right">
                <h1>백설공주</h1>
                <p>백설공주는 독일의 그림 형제가 1812년에 펴낸 이야기집에 실린 이야기예요. 그림 형제는 헤센 지방 사람들에게 들은 이야기를 받아 적었는데, 마을마다 조금씩 다른 이야기를 하나로 정리해 지금의 모습으로 다듬었답니다.</p>
                <p>이야기에는 왕비가 세 번 공주를 찾아와요. 허리끈, 빗, 사과로 방법을 바꿔 가며 다가오지요. 이렇게 같은 일이 되풀이되면서 조금씩 위험해지는 구조는 옛이야기에서 자주 볼 수 있는 방식이에요. 이 책에는 그 가운데 두 번을 담았어요.</p>
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
    { q: "거울은 누가 제일 아름답다고 대답했나요?", choices: ["왕비", "백설공주", "난쟁이"], answer: 1 },
    { q: "사냥꾼은 공주를 어떻게 했나요?", choices: ["성으로 데려갔다", "몰래 놓아주었다", "왕비에게 넘겼다"], answer: 1 },
    { q: "숲속 오두막에는 무엇이 일곱 개씩 있었나요?", choices: ["침대와 의자", "창문과 문", "그릇과 냄비"], answer: 0 },
    { q: "난쟁이들이 공주에게 당부한 것은 무엇인가요?", choices: ["일찍 자라고", "문을 열지 말라고", "숲에 가지 말라고"], answer: 1 },
    { q: "왕비가 사과에 독을 바른 곳은 어디인가요?", choices: ["빨간 쪽", "하얀 쪽", "씨앗"], answer: 0 },
    { q: "난쟁이들은 공주를 어디에 눕혔나요?", choices: ["유리관", "나무 침대", "동굴"], answer: 0 },
    { q: "공주는 어떻게 깨어났나요?", choices: ["약을 먹고", "사과 조각이 튀어나와서", "시간이 지나서"], answer: 1 }
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
            <h2>백설공주를 다 읽었어요!</h2>
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
