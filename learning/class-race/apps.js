(() => {
    "use strict";

    // 학급 순위전에 낼 수 있는 앱 목록.
    // 앱마다 다른 것은 "문제를 꺼내 오는 부분"뿐이다. 나머지(방, 참가, 순위)는 전부 공용이다.
    // 공용 문제 모양: { id, category, prompt, sentence, choices[2~4], answer, explanation }
    // 공용 차시 모양: { id, title, note, ids[] }

    const loadedScripts = new Map();

    function loadScript(url) {
        if (loadedScripts.has(url)) return loadedScripts.get(url);
        const promise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.async = false;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`불러오지 못했습니다: ${url}`));
            document.head.append(script);
        });
        loadedScripts.set(url, promise);
        return promise;
    }

    function shuffle(items) {
        const copy = [...items];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
        }
        return copy;
    }

    // 정답 하나에 다른 항목에서 뽑은 보기 둘을 더한다. 글자가 같은 보기는 피한다.
    function withDistractors(answer, pool, count = 2) {
        const others = shuffle(pool.filter((text) => text && text !== answer));
        const picked = [];
        for (const text of others) {
            if (picked.includes(text)) continue;
            picked.push(text);
            if (picked.length === count) break;
        }
        return shuffle([answer, ...picked]);
    }

    function chunkLessons(ids, size, titleFor, noteFor) {
        const lessons = [];
        for (let start = 0; start < ids.length; start += size) {
            const slice = ids.slice(start, start + size);
            const number = lessons.length + 1;
            // 끝에 몇 개만 남으면 새 묶음을 만들지 않고 앞 묶음에 붙인다.
            if (slice.length < size / 2 && lessons.length > 0) {
                lessons[lessons.length - 1].ids.push(...slice);
                break;
            }
            lessons.push({ id: `part-${number}`, title: titleFor(number), note: noteFor(slice), ids: slice });
        }
        return lessons;
    }

    const apps = [
        {
            id: "spelling",
            title: "한글 맞춤법",
            subject: "국어",
            scripts: [
                "/learning/literacy-numeracy/spelling/questions.js",
                "/learning/literacy-numeracy/spelling/questions-extra.js",
                "/learning/literacy-numeracy/spelling/lessons.js"
            ],
            getBank() {
                const questions = new Map((window.SPELLING_QUESTIONS || []).map((question) => [question.id, {
                    id: question.id,
                    category: question.category,
                    prompt: question.prompt,
                    sentence: question.sentence,
                    choices: [...question.choices],
                    answer: question.answer,
                    explanation: question.explanation
                }]));
                const lessons = (window.SPELLING_LESSONS || []).map((lesson) => ({
                    id: lesson.id, title: lesson.title, note: lesson.note, ids: [...lesson.ids]
                }));
                return { questions, lessons };
            }
        },
        {
            id: "proverbs",
            title: "속담",
            subject: "국어",
            scripts: [
                "/learning/literacy-numeracy/proverbs/proverbs-data.js",
                "/learning/literacy-numeracy/proverbs/proverbs-essential-additions.js"
            ],
            getBank() {
                // 자료는 배열 모양([속담, 뜻, 예문, 상황])과 객체 모양({proverb, meaning, example, question}) 둘 다 있다.
                const entries = (window.PROVERB_BANKS?.ko || []).map((entry) => (Array.isArray(entry)
                    ? { proverb: entry[0], meaning: entry[1], example: entry[2], question: entry[3] }
                    : entry));
                const allProverbs = entries.map((entry) => entry.proverb);
                const questions = new Map();
                entries.forEach((entry, index) => {
                    const { proverb, meaning, example, question: situation } = entry;
                    const id = `ko-${index + 1}`;
                    questions.set(id, {
                        id,
                        category: "속담",
                        prompt: "이 상황에 어울리는 속담을 고르세요.",
                        sentence: situation || example,
                        choices: withDistractors(proverb, allProverbs),
                        answer: proverb,
                        explanation: `${proverb}: ${meaning}`
                    });
                });
                const lessons = chunkLessons([...questions.keys()], 10,
                    (number) => `속담 ${number}묶음`,
                    (ids) => ids.slice(0, 3).map((id) => questions.get(id).answer).join(" · "));
                return { questions, lessons };
            }
        },
        {
            id: "idioms",
            title: "관용어",
            subject: "국어",
            scripts: ["/learning/literacy-numeracy/idiomatic-expressions/idiomatic-expressions-data.js"],
            getBank() {
                // 자료는 객체 모양({expression, category, meaning, example, question, lesson})이다. 옛 배열 모양도 받아 준다.
                const entries = (window.IDIOMATIC_EXPRESSION_BANK || []).map((entry) => (Array.isArray(entry)
                    ? { expression: entry[0], category: entry[1], meaning: entry[2], example: entry[3], question: entry[4] }
                    : entry));
                const allExpressions = entries.map((entry) => entry.expression);
                const questions = new Map();
                const lessonMap = new Map();
                entries.forEach((entry, index) => {
                    const { expression, category, meaning, example, question: situation } = entry;
                    const id = `ie-${index + 1}`;
                    questions.set(id, {
                        id,
                        category: category || "관용어",
                        prompt: "이 상황에 어울리는 관용어를 고르세요.",
                        sentence: situation || example,
                        choices: withDistractors(expression, allExpressions),
                        answer: expression,
                        explanation: `${expression}: ${meaning}`
                    });
                    const lessonNumber = Number(entry.lesson);
                    if (Number.isInteger(lessonNumber) && lessonNumber > 0) {
                        if (!lessonMap.has(lessonNumber)) lessonMap.set(lessonNumber, []);
                        lessonMap.get(lessonNumber).push(id);
                    }
                });
                const lessons = [...lessonMap.entries()]
                    .sort((a, b) => a[0] - b[0])
                    .map(([number, ids]) => ({
                        id: `lesson-${number}`,
                        title: `관용어 ${number}차시`,
                        note: ids.slice(0, 3).map((id) => questions.get(id).answer).join(" · "),
                        ids
                    }));
                return { questions, lessons: lessons.length ? lessons : chunkLessons([...questions.keys()], 10, (n) => `관용어 ${n}묶음`, () => "") };
            }
        },
        {
            id: "cci",
            title: "한자성어",
            subject: "국어",
            scripts: [
                "/learning/literacy-numeracy/classical-chinese-idioms/idioms-data.js",
                "/learning/literacy-numeracy/classical-chinese-idioms/idioms-lessons-data.js"
            ],
            getBank() {
                const entries = Array.isArray(window.IDIOM_DATA) ? window.IDIOM_DATA : [];
                const allWords = entries.map((entry) => entry.word);
                const questions = new Map(entries.map((entry) => [entry.id, {
                    id: entry.id,
                    category: entry.theme || "한자성어",
                    prompt: "이 뜻에 맞는 한자성어를 고르세요.",
                    sentence: entry.meaning,
                    choices: withDistractors(entry.word, allWords),
                    answer: entry.word,
                    explanation: `${entry.word}(${entry.hanja}) · ${entry.hanjaExpl || ""}`.trim()
                }]));
                const lessons = (window.IDIOM_LESSONS || []).map((lesson, index) => ({
                    id: `lesson-${index + 1}`,
                    title: lesson.title,
                    note: lesson.description || "",
                    ids: lesson.ids.filter((id) => questions.has(id))
                })).filter((lesson) => lesson.ids.length > 0);
                return { questions, lessons };
            }
        }
    ];

    const bankCache = new Map();

    async function load(appId) {
        const app = apps.find((entry) => entry.id === appId);
        if (!app) throw new Error("알 수 없는 앱입니다.");
        if (bankCache.has(appId)) return bankCache.get(appId);
        for (const url of app.scripts) await loadScript(url);
        const bank = app.getBank();
        if (!bank.questions.size) throw new Error(`${app.title} 문제를 불러오지 못했습니다.`);
        bankCache.set(appId, bank);
        return bank;
    }

    window.ClassRaceApps = Object.freeze({
        list: () => apps.map(({ id, title, subject }) => ({ id, title, subject })),
        get: (appId) => apps.find((entry) => entry.id === appId) || null,
        load,
        shuffle
    });
})();
