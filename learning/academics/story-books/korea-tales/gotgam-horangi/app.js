const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 마을로 내려온 호랑이",
        beats: [
            {
                art: "01-hungry.webp",
                emoji: "🐯",
                left: [
                    "깊은 산속에 호랑이 한 마리가 살았습니다. 사흘째 아무것도 못 먹어 뱃가죽이 등에 붙을 지경이었지요.",
                    "덤불을 아무리 뒤져도 토끼 한 마리 보이지 않았어요. 다람쥐마저 나무 구멍에 숨어 코빼기도 안 비쳤습니다.",
                    "\"어흥… 배고파 죽겠네.\"",
                    "\"이러다 굶어 죽지.\""
                ],
                right: [
                    "호랑이는 어슬렁어슬렁 산을 내려왔어요. 발밑에서 마른 가랑잎이 바스락바스락 소리를 냈지요.",
                    "\"오늘은 꼭 무엇이든 잡아야겠다.\"",
                    "'마을에 가면 뭐라도 있겠지. 돼지든 송아지든.'",
                    "해가 지고 어느새 캄캄한 밤이 되었습니다. 마을 개들이 짖다 말고 슬그머니 꼬리를 감췄답니다."
                ]
            },
            {
                art: "02-crying.webp",
                emoji: "👶",
                left: [
                    "마을 어귀 어느 집 앞에서 호랑이가 발을 딱 멈췄습니다. 방문 틈으로 노란 불빛이 새어 나오고 있었지요.",
                    "\"으앙! 으아앙!\"",
                    "\"음? 저건 무슨 소리지?\"",
                    "안에서 아기 우는 소리가 들렸거든요."
                ],
                right: [
                    "호랑이는 침을 꿀꺽 삼켰어요. 수염 끝이 저절로 파르르 떨렸습니다.",
                    "'옳지, 오늘 저녁은 저걸로 하자.'",
                    "\"저만하면 한 끼는 되겠는걸.\"",
                    "그러고는 문에 귀를 딱 붙이고 숨을 죽였답니다."
                ]
            },
            {
                art: "03-tiger-came.webp",
                emoji: "😾",
                left: [
                    "방 안에서 엄마 목소리가 들렸어요.",
                    "아기를 달래는 소리였어요.",
                    "\"뚝! 안 그치면 호랑이가 온다!\"",
                    "호랑이는 어깨를 으쓱했습니다. 제 이름만 나오면 아이들이 울음을 뚝 그친다는 것을 잘 알고 있었으니까요."
                ],
                right: [
                    "\"으아아앙!\"",
                    "그런데 아기는 아까보다 더 크게 울었어요. 발버둥까지 치는지 방바닥이 쿵쿵 울렸지요.",
                    "\"이 집 아기는 어째 이 모양이야?\"",
                    "'뭐야? 내 이름을 듣고도 안 무서워한다고?'",
                    "호랑이는 어이가 없어 코를 벌름거렸답니다."
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 곶감이 대체 뭐길래",
        beats: [
            {
                art: "04-persimmon.webp",
                emoji: "🍊",
                left: [
                    "그때 엄마가 다시 말했습니다.",
                    "호랑이가 귀를 쫑긋 세웠어요.",
                    "\"옳지, 여기 곶감 있다. 곶감 먹자.\"",
                    "그러자 거짓말처럼 울음이 뚝 그쳤어요. 방 안에서는 냠냠, 무언가를 맛있게 먹는 소리만 났지요."
                ],
                right: [
                    "문밖의 호랑이는 그 자리에 얼어붙었습니다. 세워 든 귀가 미처 내려오지도 못했어요.",
                    "'고, 곶감?'",
                    "\"곶감이라는 게 대체 뭐야?\"",
                    "난생처음 들어 보는 이름이었습니다."
                ]
            },
            {
                art: "05-scared.webp",
                emoji: "😱",
                left: [
                    "'내가 온다고 해도 안 그치던 아기가,'",
                    "'곶감이라니까 한 번에 뚝 그쳤어.'",
                    "눈앞이 아득해졌어요.",
                    "호랑이는 다리가 후들후들 떨렸어요. 등줄기를 타고 식은땀이 주르륵 흘렀습니다."
                ],
                right: [
                    "'곶감이라는 놈은 대체 얼마나 무서운 걸까?'",
                    "'나보다 백배는 무서운 놈이 틀림없어!'",
                    "\"큰일 났다. 여기 있다간 나도 잡아먹히겠어.\"",
                    "호랑이는 슬금슬금 뒷걸음질을 쳤어요. 그러다 얼떨결에 캄캄한 외양간 안으로 숨어들었지요."
                ]
            },
            {
                art: "06-thief.webp",
                emoji: "🥷",
                left: [
                    "바로 그때, 담을 스르르 넘는 그림자가 있었습니다. 얼굴을 검은 천으로 감싼 소도둑이었어요.",
                    "'오늘은 이 집 소를 끌고 가야지. 살이 통통하게 올랐더라고.'",
                    "소도둑은 발소리를 죽였어요."
                ],
                right: [
                    "소도둑은 캄캄한 외양간으로 살금살금 들어갔습니다. 손을 뻗자 털이 북슬북슬한 등이 만져졌어요.",
                    "'옳지, 여기 있구나!'",
                    "그런데 그 등이 어쩐 일인지 부들부들 떨리고 있지 뭐예요.",
                    "\"이 소가 어디 아픈가?\""
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 한밤중의 소동",
        beats: [
            {
                art: "07-mount.webp",
                emoji: "😨",
                left: [
                    "소도둑은 그 등에 훌쩍 올라탔습니다.",
                    "\"자, 얌전히 가자꾸나.\"",
                    "그런데 그건 소가 아니었어요. 곶감이 무서워 외양간에 숨어 있던 호랑이였지요."
                ],
                right: [
                    "호랑이는 소스라치게 놀랐습니다. 무언가 묵직한 것이 등에 턱 올라탔으니까요.",
                    "'으악! 고, 곶감이다!'",
                    "'저놈이 나를 어떻게 찾아냈지?'",
                    "'곶감이 기어이 나를 잡으러 왔구나!'",
                    "돌아볼 겨를도 없었답니다."
                ]
            },
            {
                art: "08-running.webp",
                emoji: "💨",
                left: [
                    "호랑이는 눈을 질끈 감고 달리기 시작했어요.",
                    "바람처럼, 화살처럼.",
                    "\"곶감아, 제발 좀 봐다오!\"",
                    "논두렁을 지나고 개울을 뛰어넘고 콩밭을 가로질렀습니다. 지나간 자리마다 흙먼지가 뿌옇게 일었지요."
                ],
                right: [
                    "등에 탄 소도둑은 눈이 휘둥그레졌어요. 소가 이렇게 달리는 것은 태어나 처음 보았거든요.",
                    "\"어? 이 소가 왜 이렇게 빨라?\"",
                    "\"이랴! 워워! 서라니까!\"",
                    "고삐를 아무리 당겨도 소용이 없었습니다."
                ]
            },
            {
                art: "09-branch.webp",
                emoji: "🌳",
                left: [
                    "동쪽 하늘이 부옇게 밝아 왔습니다. 그제야 등에 탄 것이 무엇인지 어렴풋이 보이기 시작했지요.",
                    "잠이 확 달아났어요.",
                    "소도둑이 아래를 힐끗 내려다본 순간, 노랗고 까만 줄무늬가 눈에 확 들어왔어요."
                ],
                right: [
                    "\"허, 헉! 호랑이잖아!\"",
                    "소도둑은 머리 위로 지나가는 나뭇가지를 냅다 붙잡았습니다. 그러고는 대롱대롱 매달려 발만 동동 굴렀지요.",
                    "\"으아아! 사람 살려!\""
                ]
            },
            {
                art: "10-flee.webp",
                emoji: "🏃",
                left: [
                    "등이 갑자기 가벼워지자 호랑이는 뒤도 안 돌아보고 산으로 내달렸어요.",
                    "'휴, 곶감이 떨어져 나갔구나!'",
                    "\"이제 살았다.\"",
                    "산꼭대기에 닿아서야 겨우 숨을 돌렸습니다."
                ],
                right: [
                    "나뭇가지에 매달린 소도둑도 반대쪽으로 줄행랑을 쳤어요. 둘 다 뒤를 한 번도 돌아보지 않았지요.",
                    "그날 이후 호랑이는 두 번 다시 마을에 내려오지 않았대요.",
                    "\"곶감… 그놈만은 정말 무섭단 말이야.\"",
                    "호랑이는 그 말을 평생 잊지 못했답니다."
                ]
            }
        ],
        moral: "잘 모르는 것을 지레짐작으로 무서워하면 엉뚱한 일이 벌어져요. 무엇인지 알아보지도 않고 겁부터 먹으면, 아무것도 아닌 것이 세상에서 제일 무서운 것이 된답니다.",
        question: "잘 모르면서 미리 겁먹었던 적이 있나요? 알고 보니 별것 아니었던 일은 없었나요?"
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
                ${artFrame('cover.webp', '🐯')}
            </div>
            <div class="story-page-right">
                <h1>곶감과 호랑이</h1>
                <p>곶감과 호랑이도 지은이가 없는 구전 설화예요. 우리 호랑이 이야기 가운데 가장 널리 알려졌고, 고을에 따라 곶감 대신 감이나 엿이 나오기도 한답니다.</p>
                <p>옛이야기 속 호랑이는 두 얼굴이에요. 산을 지키는 무서운 산신이기도 하고, 이 이야기처럼 어수룩하게 속는 웃음거리이기도 하지요. 뒤쪽을 바보 호랑이 이야기라고 부른답니다.</p>
                <p>조선 시대에 호랑이는 실제로 마을까지 내려오던 짐승이라, 나라에서 호랑이 잡는 군대를 따로 두었어요. 가장 무서운 짐승을 이야기 속에서 마음껏 놀리는 것이 옛사람들에게는 큰 즐거움이었지요.</p>
                <p>곶감은 감의 껍질을 벗겨 말린 것이에요. 과자도 냉장고도 없던 시절의 귀한 단맛이었지요.</p>
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
    { q: "호랑이는 왜 마을로 내려왔나요?", choices: ["길을 잃어서", "배가 고파서", "친구를 찾으려고"], answer: 1 },
    { q: "호랑이가 온다고 하자 아기는 어떻게 했나요?", choices: ["울음을 그쳤다", "잠이 들었다", "더 크게 울었다"], answer: 2 },
    { q: "아기가 울음을 그친 것은 무엇 때문이었나요?", choices: ["곶감", "호랑이", "자장가"], answer: 0 },
    { q: "호랑이는 아기를 그치게 한 것을 무엇이라 여겼나요?", choices: ["아주 힘센 사냥꾼", "마을에서 큰 짐승", "자기보다 무서운 놈"], answer: 2 },
    { q: "소도둑은 호랑이를 무엇으로 착각했나요?", choices: ["소", "말", "개"], answer: 0 },
    { q: "소도둑은 어떻게 호랑이 등에서 벗어났나요?", choices: ["개울로 뛰어들어서", "나뭇가지를 붙잡고", "호랑이를 때려서"], answer: 1 }
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
            <h2>곶감과 호랑이 이야기를 다 읽었어요!</h2>
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
