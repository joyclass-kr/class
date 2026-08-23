const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 집을 지어라",
        hook: "",
        beats: [{
            art: "01-leaving.png",
            emoji: "🐷",
            left: [
                "아기돼지 삼형제가 마당에서 뒹굴뒹굴 놀고 있었어요. 그때 엄마 돼지가 보따리 세 개를 들고 나왔죠. '얘들아, 이제 다 컸으니 각자 집을 지어 살 때가 됐구나.'"
            ],
            right: [
                "'집이요? 신난다!' 첫째가 폴짝 뛰었어요. '한 가지만 명심하렴. 튼튼하게 지어야 한다. 숲에 늑대가 살거든.' '에이, 걱정 마세요!' 삼형제는 씩씩하게 길을 나섰답니다."
            ]
        }]
    },
    {
        num: 2,
        title: "2장 · 짚으로 뚝딱",
        hook: "",
        beats: [{
            art: "02-straw.png",
            emoji: "🌾",
            left: [
                "첫째는 길에서 짚단을 파는 아저씨를 만났어요. '오, 저거면 되겠다!' 첫째는 짚을 잔뜩 사서 후다닥 쌓아 올렸죠. 반나절 만에 집이 뚝딱 완성됐어요."
            ],
            right: [
                "'히야, 벌써 다 지었네! 난 이제 실컷 놀아야지.' 첫째는 집 앞에 벌러덩 누워 콧노래를 불렀어요. 짚 벽이 바람에 살랑살랑 흔들렸지만 신경도 쓰지 않았답니다."
            ]
        }]
    },
    {
        num: 3,
        title: "3장 · 나뭇가지로 대충",
        hook: "",
        beats: [{
            art: "03-sticks.png",
            emoji: "🪵",
            left: [
                "둘째는 숲에서 나뭇가지를 한 아름 주워 왔어요. '짚보다야 튼튼하겠지.' 둘째는 나뭇가지를 얼기설기 엮어 하루 만에 집을 지었답니다."
            ],
            right: [
                "지나가던 막내가 걱정스레 말했어요. '형, 그거 흔들리는데 괜찮겠어?' '괜찮아, 괜찮아! 너나 열심히 해라.' 둘째는 손을 휘휘 젓고는 낮잠을 자러 들어갔어요."
            ]
        }]
    },
    {
        num: 4,
        title: "4장 · 벽돌을 한 장씩",
        hook: "",
        beats: [{
            art: "04-bricks.png",
            emoji: "🧱",
            left: [
                "막내는 벽돌을 한 장 한 장 쌓았어요. 땀이 뚝뚝 떨어졌죠. 형들이 지나가며 놀렸어요. '야, 아직도 그러고 있냐? 우린 벌써 다 놀고 왔는데!'"
            ],
            right: [
                "'하하, 미련하기는!' 형들이 배를 잡고 웃었어요. 막내는 묵묵히 벽돌만 올렸답니다. '난 튼튼한 게 좋아.' 꼬박 한 달이 걸려 벽돌집이 완성되었어요."
            ]
        }]
    },
    {
        num: 5,
        title: "5장 · 훅! 후!",
        hook: "",
        beats: [{
            art: "05-blown-down.png",
            emoji: "💨",
            left: [
                "그날 밤, 배고픈 늑대가 짚 집 앞에 섰어요. '아기돼지야, 문 열어라!' '싫어! 절대 안 열어!' '그럼 훅 불어서 날려 버리겠다!' 훅— 짚 집이 폭삭 무너졌어요."
            ],
            right: [
                "첫째는 걸음아 나 살려라 둘째네로 달렸죠. 늑대가 뒤따라와 또 외쳤어요. '그럼 훅 불어서 날려 버리겠다!' 후— 우지끈! 나뭇가지 집도 와르르 무너지고 말았답니다."
            ]
        }]
    },
    {
        num: 6,
        title: "6장 · 꿈쩍도 않는 집",
        hook: "",
        beats: [{
            art: "06-brick-house.png",
            emoji: "🏠",
            left: [
                "두 형은 헐레벌떡 막내네 벽돌집으로 뛰어들었어요. 쿵쿵쿵! 늑대가 문을 두드렸죠. '이번에도 훅 불어서 날려 버리겠다!'"
            ],
            right: [
                "훅— 후— 후우욱! 늑대는 얼굴이 새빨개지도록 불었지만 벽돌집은 꿈쩍도 하지 않았어요. '헉… 헉… 이게 왜 안 넘어가지?' 늑대는 숨이 턱까지 차올랐답니다."
            ]
        }]
    },
    {
        num: 7,
        title: "7장 · 굴뚝으로 내려온 늑대",
        hook: "",
        beats: [{
            art: "07-chimney.png",
            emoji: "🔥",
            left: [
                "'옳지, 굴뚝이 있었지!' 늑대는 지붕으로 살금살금 기어 올라갔어요. 하지만 막내가 눈치를 채고 벽난로에 솥을 걸어 물을 펄펄 끓여 두었죠."
            ],
            right: [
                "쑤욱— 첨벙! '아뜨뜨뜨!' 늑대는 비명을 지르며 굴뚝으로 도로 튀어 올라가 숲으로 줄행랑쳤어요. 그날 이후 삼형제는 튼튼한 벽돌집에서 오순도순 살았답니다."
            ]
        }],
        moral: "당장 편하려고 대충 해 두면, 정작 위험할 때 나를 지켜 주지 못해요. 시간이 걸려도 제대로 해 두는 것이 결국 나를 살린답니다.",
        question: "귀찮아서 대충 했다가 나중에 곤란했던 적이 있나요?"
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
                ${artFrame('cover.png', '🐷')}
            </div>
            <div class="story-page-right">
                <h1>아기돼지 삼형제</h1>
                <p>아기돼지 삼형제는 영국에서 오래전부터 전해 내려온 이야기예요. 1890년, 영국의 조지프 제이컵스가 여러 지방을 다니며 모은 영국 옛이야기집에 실리면서 지금의 모습으로 널리 알려졌답니다.</p>
                <p>이야기에는 같은 일이 세 번 되풀이돼요. 늑대가 세 집을 차례로 찾아가 똑같은 말을 외치는데, 결과는 점점 달라지지요. 옛이야기에는 이렇게 셋씩 짝을 지어 되풀이되는 구조가 자주 나와요. 듣는 사람이 다음에 무슨 일이 벌어질지 짐작하며 따라올 수 있고, 입으로 전하기도 쉽기 때문이랍니다.</p>
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
    { q: "엄마 돼지가 당부한 것은 무엇인가요?", choices: ["빨리 지어라", "튼튼하게 지어라", "크게 지어라"], answer: 1 },
    { q: "첫째는 무엇으로 집을 지었나요?", choices: ["짚", "나뭇가지", "벽돌"], answer: 0 },
    { q: "막내가 집을 짓는 데 걸린 시간은 얼마인가요?", choices: ["반나절", "하루", "한 달"], answer: 2 },
    { q: "형들은 막내를 보고 뭐라고 놀렸나요?", choices: ["미련하다고", "느리다고", "약하다고"], answer: 0 },
    { q: "늑대가 집 앞에서 외친 말은 무엇인가요?", choices: ["문을 부수겠다", "훅 불어서 날리겠다", "불을 지르겠다"], answer: 1 },
    { q: "늑대가 무너뜨리지 못한 집은 무엇으로 지었나요?", choices: ["짚", "나뭇가지", "벽돌"], answer: 2 },
    { q: "늑대는 마지막에 어디로 들어오려 했나요?", choices: ["창문", "굴뚝", "뒷문"], answer: 1 }
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
            <h2>아기돼지 삼형제를 다 읽었어요!</h2>
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
