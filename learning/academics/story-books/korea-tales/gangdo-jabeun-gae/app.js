const CHAPTERS = [
    {
        num: 1,
        title: "1장 · 장에서 돌아오는 길",
        beats: [
            {
                art: "01-dog.png",
                emoji: "🐕",
                left: [
                    "봇짐 장수에게는 개 한 마리가 있었습니다.",
                    "등에 까만 점이 박혀 있어서 이름은 바둑이."
                ],
                right: [
                    "몇 해 전 눈 오는 날 길가에서 떨고 있던 것을 품에 안고 온 개였지요.",
                    "\"바둑아, 가자!\"",
                    "바둑이는 늘 장수의 뒤를 졸졸 따라다녔답니다."
                ]
            },
            {
                art: "02-market.png",
                emoji: "💰",
                left: [
                    "그날은 장이 아주 잘됐어요.",
                    "봇짐이 텅 비도록 물건이 다 팔렸지요."
                ],
                right: [
                    "\"허허, 오늘은 운수가 좋구먼.\"",
                    "장수는 두둑해진 돈주머니를 허리춤에 단단히 매었습니다.",
                    "바둑이가 꼬리를 흔들며 앞장섰어요."
                ]
            },
            {
                art: "03-inn.png",
                emoji: "🍲",
                left: [
                    "해가 저물어 주막에 들었습니다.",
                    "장수는 국밥을 시켜 바둑이와 나눠 먹었어요."
                ],
                right: [
                    "그런데 옆자리 사내가 자꾸 이쪽을 흘끔거렸지요. 장수의 허리춤을, 정확히는 그 돈주머니를요.",
                    "바둑이가 낮게 으르렁거렸습니다."
                ]
            }
        ]
    },
    {
        num: 2,
        title: "2장 · 안개 낀 고갯길",
        beats: [
            {
                art: "04-dawn.png",
                emoji: "🌫️",
                left: [
                    "이튿날 새벽, 장수는 일찍 길을 나섰어요.",
                    "고갯길에는 안개가 자욱했습니다."
                ],
                right: [
                    "\"오늘 안에 집에 닿아야 할 텐데.\"",
                    "바둑이가 자꾸 뒤를 돌아보며 걸음을 늦추었어요.",
                    "\"왜 그러느냐? 어서 가자.\""
                ]
            },
            {
                art: "05-robbed.png",
                emoji: "😱",
                left: [
                    "고갯마루에 이르렀을 때였습니다. 안개 속에서 누군가 불쑥 튀어나왔어요.",
                    "주막에서 흘끔거리던 그 사내였지요."
                ],
                right: [
                    "사내는 장수를 밀치고 돈주머니를 낚아챘습니다.",
                    "그러고는 숲속으로 쏜살같이 사라졌어요.",
                    "\"도, 도둑이야!\""
                ]
            },
            {
                art: "06-lost.png",
                emoji: "😞",
                left: [
                    "장수는 숲으로 뛰어들었어요.",
                    "하지만 안개 속에서 이내 방향을 잃고 말았습니다."
                ],
                right: [
                    "\"한 해를 벌어 모은 돈인데…\"",
                    "장수는 길바닥에 털썩 주저앉았어요.",
                    "바둑이가 그 곁에서 코를 킁킁거렸지요."
                ]
            }
        ]
    },
    {
        num: 3,
        title: "3장 · 바둑이가 달렸다",
        beats: [
            {
                art: "07-scent.png",
                emoji: "👃",
                left: [
                    "바둑이가 갑자기 귀를 쫑긋 세웠어요.",
                    "그러고는 한 방향을 향해 컹! 하고 짖었습니다."
                ],
                right: [
                    "\"바둑아! 어디 가느냐!\"",
                    "바둑이는 대답 대신 안개 속으로 뛰어들었어요.",
                    "네 다리가 보이지 않을 만큼 빨랐답니다."
                ]
            },
            {
                art: "08-chase.png",
                emoji: "🌲",
                left: [
                    "바둑이는 나무 사이를 가로질러 달렸어요.",
                    "코를 땅에 대고, 다시 들고, 또 달리고."
                ],
                right: [
                    "골짜기 하나를 넘었을 때였습니다.",
                    "바위 뒤에 웅크린 사내가 보였어요. 돈주머니를 품에 꼭 안고 있었지요."
                ]
            },
            {
                art: "09-bark.png",
                emoji: "🗣️",
                left: [
                    "\"컹! 컹! 컹컹컹!\"",
                    "바둑이가 온 산이 울리도록 짖었어요.",
                    "\"저리 가! 저리 가란 말이야!\""
                ],
                right: [
                    "사내가 발을 굴러도 바둑이는 물러서지 않았습니다. 바짓자락을 꽉 물고 늘어졌지요.",
                    "그 소리를 듣고 나무하러 온 사람들이 달려왔어요."
                ]
            },
            {
                art: "10-return.png",
                emoji: "🍖",
                left: [
                    "사내는 그 자리에서 붙잡혔습니다.",
                    "돈주머니는 고스란히 장수에게 돌아왔지요."
                ],
                right: [
                    "장수는 바둑이를 끌어안고 한참을 놓지 못했어요.",
                    "\"네가 아니었으면 어쩔 뻔했느냐.\"",
                    "그날부터 바둑이의 밥그릇에는 늘 고기 한 점이 놓였답니다."
                ]
            }
        ],
        moral: "바둑이는 눈 오는 날 길가에서 구해진 개였어요. 그때 장수가 그냥 지나쳤다면 이날의 일도 없었겠지요. 베푼 마음은 잊고 지내도 어딘가에 남아 있답니다.",
        question: "내가 무심코 베푼 친절이 누군가에게 크게 남은 적이 있을까요?"
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
                ${artFrame('cover.png', '🐕')}
            </div>
            <div class="story-page-right">
                <h1>강도를 잡은 개</h1>
                <p>강도를 잡은 개는 지은이가 없는 구전 설화예요. 의로운 개가 주인공인 이야기를 의견 설화라고 부르는데, 그 갈래에 속한답니다.</p>
                <p>우리나라에는 개를 기리는 비석과 무덤이 실제로 여러 곳에 남아 있어요. 전라북도 임실의 오수라는 곳에는 잠든 주인을 불에서 구해 낸 개의 무덤이 있는데, 그 이야기는 고려 시대 책에도 실려 있지요.</p>
                <p>옛날 시골에서 개는 귀여워하는 짐승이 아니라 함께 일하는 식구였어요. 집을 지키고, 짐승을 몰고, 먼 길에 주인을 따라나섰지요. 그래서 개가 주인공인 옛이야기가 유난히 많답니다.</p>
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
    { q: "장수는 바둑이를 어떻게 만났나요?", choices: ["장에서 사 와서", "눈 오는 날 주워서", "이웃이 주어서"], answer: 1 },
    { q: "주막에서 사내가 흘끔거린 것은 무엇인가요?", choices: ["장수의 빈 봇짐", "장수의 국밥그릇", "장수의 돈주머니"], answer: 2 },
    { q: "사내는 어디에서 돈주머니를 빼앗았나요?", choices: ["안개 낀 고갯마루", "주막의 방 안에서", "강가 나루터에서"], answer: 0 },
    { q: "바둑이는 무엇으로 사내를 찾아냈나요?", choices: ["발자국을 보고", "소리를 들어서", "냄새를 맡아서"], answer: 2 },
    { q: "바둑이는 사내를 찾아내 어떻게 했나요?", choices: ["짖으며 물고 늘어졌다", "조용히 지켜보았다", "주인에게 돌아갔다"], answer: 0 },
    { q: "사람들이 달려온 까닭은 무엇인가요?", choices: ["장수가 소리쳐 불러서", "개 짖는 소리 때문에", "연기가 크게 나서"], answer: 1 }
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
            <h2>강도를 잡은 개 이야기를 다 읽었어요!</h2>
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
