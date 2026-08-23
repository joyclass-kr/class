const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 풍덩, 빠진 도끼",
        beats: [
            {
                art: "01-woodcutter.png",
                emoji: "🪓",
                left: [
                    "옛날 어느 산골에 가난한 나무꾼이 살았습니다.",
                    "가진 것이라고는 지게 하나와 낡은 쇠도끼 한 자루뿐이었지요."
                ],
                right: [
                    "\"이 도끼가 우리 식구를 먹여 살린다.\"",
                    "나무꾼은 밤마다 도끼날을 숫돌에 갈았어요.",
                    "날이 무디면 나무가 안 넘어가거든요."
                ]
            },
            {
                art: "02-splash.png",
                emoji: "💦",
                left: [
                    "그날은 연못가 나무를 찍고 있었어요.",
                    "팍! 팍!",
                    "그런데 손잡이가 땀에 미끄러졌지 뭐예요."
                ],
                right: [
                    "풍덩!",
                    "도끼는 연못 한가운데로 날아가 가라앉았습니다.",
                    "\"아이고, 내 도끼!\""
                ]
            },
            {
                art: "03-cry.png",
                emoji: "😭",
                left: [
                    "나무꾼은 물가에 주저앉았어요.",
                    "연못은 바닥이 안 보일 만큼 깊었습니다."
                ],
                right: [
                    "\"저 도끼가 없으면 우리 식구는 뭘 먹고 사나.\"",
                    "나무꾼은 무릎에 얼굴을 묻고 엉엉 울었지요.",
                    "해가 뉘엿뉘엿 넘어갔어요."
                ]
            },
            {
                art: "04-spirit.png",
                emoji: "✨",
                left: [
                    "그때였습니다.",
                    "연못 한가운데가 환해지더니 물이 스르르 갈라졌어요."
                ],
                right: [
                    "흰 수염에 흰옷을 입은 노인이 물 위로 올라섰습니다.",
                    "\"어인 일로 그리 우느냐?\"",
                    "나무꾼은 눈을 비볐어요. 산신령이었습니다."
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 이것이 네 도끼냐",
        beats: [
            {
                art: "05-gold.png",
                emoji: "🥇",
                left: [
                    "산신령이 물속으로 손을 넣더니 도끼 하나를 꺼냈어요.",
                    "번쩍번쩍하는 금도끼였지요."
                ],
                right: [
                    "\"이것이 네 도끼냐?\"",
                    "나무꾼은 눈이 부셔 손으로 얼굴을 가렸습니다.",
                    "\"아닙니다. 제 것이 아닙니다.\""
                ]
            },
            {
                art: "06-silver.png",
                emoji: "🥈",
                left: [
                    "산신령이 다시 손을 넣어 은도끼를 꺼냈어요.",
                    "달빛처럼 하얗게 빛났습니다."
                ],
                right: [
                    "\"그러면 이것이 네 도끼냐?\"",
                    "나무꾼은 또 고개를 저었어요.",
                    "\"그것도 제 것이 아닙니다.\""
                ]
            },
            {
                art: "07-iron.png",
                emoji: "🪓",
                left: [
                    "산신령이 세 번째로 꺼낸 것은",
                    "날이 다 닳고 손잡이가 반들반들해진 낡은 쇠도끼였어요."
                ],
                right: [
                    "나무꾼의 얼굴이 대번에 환해졌습니다.",
                    "\"예! 그겁니다! 그게 제 도끼입니다!\"",
                    "나무꾼은 두 손을 내밀며 펄쩍 뛰었지요."
                ]
            },
            {
                art: "08-reward.png",
                emoji: "🎁",
                left: [
                    "산신령이 껄껄 웃었어요.",
                    "\"금과 은을 앞에 두고도 제 것만 찾는구나.\""
                ],
                right: [
                    "\"이 셋을 모두 가져가거라.\"",
                    "\"예? 저는 이 쇠도끼면 됩니다!\"",
                    "\"그러니 주는 것이다.\""
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 따라 한 사람",
        beats: [
            {
                art: "09-copy.png",
                emoji: "😏",
                left: [
                    "이웃에 사는 욕심쟁이가 그 소문을 들었어요.",
                    "\"연못에 도끼만 빠뜨리면 된다고?\""
                ],
                right: [
                    "이튿날 욕심쟁이는 제 도끼를 들고 연못으로 달려갔습니다. 그러고는 있는 힘껏 물 한가운데로 던졌어요.",
                    "\"아이고, 내 도끼! 엉엉!\"",
                    "우는 소리가 어찌나 어색한지 몰라요."
                ]
            },
            {
                art: "10-greedy.png",
                emoji: "💨",
                left: [
                    "정말로 물이 갈라지고 산신령이 나타났어요.",
                    "금도끼를 꺼내 들고 물었지요.",
                    "\"이것이 네 도끼냐?\""
                ],
                right: [
                    "\"예! 바로 그겁니다! 제 것이 맞습니다!\"",
                    "산신령은 아무 말 없이 금도끼를 도로 물속에 넣고 스르르 사라졌어요.",
                    "욕심쟁이는 제가 던진 도끼마저 끝내 찾지 못했답니다."
                ]
            }
        ],
        moral: "나무꾼이 금도끼를 마다한 것은 욕심이 없어서가 아니었어요. 가난한 사람에게 금도끼가 왜 탐나지 않았겠어요. 다만 제 것이 아닌 것을 제 것이라 말할 수가 없었을 뿐이지요.",
        question: "내 것이 아닌 줄 알면서 갖고 싶었던 것이 있나요?"
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
                ${artFrame('cover.png', '🪓')}
            </div>
            <div class="story-page-right">
                <h1>금도끼 은도끼</h1>
                <p>금도끼 은도끼는 우리나라에서 모르는 사람이 거의 없는 이야기예요. 그런데 뿌리는 우리 옛이야기가 아니라 이솝 우화랍니다.</p>
                <p>이솝 우화에 실린 원래 제목은 나무꾼과 헤르메스예요. 헤르메스는 그리스 신화에 나오는 심부름꾼 신이고, 도끼를 빠뜨린 곳도 연못이 아니라 강가였답니다.</p>
                <p>우리나라에는 1906년 초등소학이라는 교과서에 처음 실렸어요. 그때는 신도 산신령도 아니고 그냥 노인이었지요. 강가가 산속 연못이 되고 노인이 산신령이 된 것은 그 뒤의 일이랍니다.</p>
                <p>산신령은 우리 옛이야기에서 산을 지키는 신이에요. 흰 수염에 흰옷을 입고 나타나 사람을 시험하거나 도와주지요. 호랑이를 데리고 다니는 모습으로도 자주 그려진답니다.</p>
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
    { q: "나무꾼이 연못에 빠뜨린 것은 무엇인가요?", choices: ["새로 산 지게", "낡은 쇠도끼", "아버지의 낫"], answer: 1 },
    { q: "연못에서 나타난 이는 누구인가요?", choices: ["용왕님", "도깨비", "산신령"], answer: 2 },
    { q: "산신령이 가장 먼저 내민 것은 무엇인가요?", choices: ["금도끼", "은도끼", "쇠도끼"], answer: 0 },
    { q: "나무꾼은 어느 도끼가 제 것이라고 했나요?", choices: ["금도끼", "은도끼", "쇠도끼"], answer: 2 },
    { q: "산신령은 나무꾼에게 무엇을 주었나요?", choices: ["도끼 셋을 모두", "금도끼 하나만", "쇠도끼만 도로"], answer: 0 },
    { q: "욕심쟁이는 어떻게 했나요?", choices: ["나무꾼의 금도끼를 훔쳤다", "일부러 도끼를 빠뜨렸다", "산신령을 찾아다녔다"], answer: 1 },
    { q: "욕심쟁이는 산신령이 내민 도끼를 보고 뭐라고 했나요?", choices: ["제 것이 아니라고 했다", "제 것이 맞다고 했다", "아무 말도 못 했다"], answer: 1 },
    { q: "욕심쟁이는 어떻게 되었나요?", choices: ["금도끼를 얻어 갔다", "산신령에게 혼났다", "제 도끼마저 잃었다"], answer: 2 }
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
            <h2>금도끼 은도끼 이야기를 다 읽었어요!</h2>
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
