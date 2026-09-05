(() => {
    "use strict";

    // 차시 배정표. 시 본문은 poems.js, 문제 본문은 questions.js에 있고 여기서는 묶기만 한다.
    // 시는 여러 차시에 겹쳐 나와도 되지만(다시 보되 다른 눈으로),
    // 문제는 정확히 한 차시에만 속해야 한다(tests/poetry-lessons-contract.js가 검사).
    // ids가 비어 있는 차시는 아직 만들지 않은 차시로, 화면에서 '준비 중'으로 보인다.
    const lesson = (id, grade, title, note, poemIds, ids) => ({ id, grade, title, note, poemIds, ids });

    window.POETRY_LESSONS = Object.freeze([
        // ── 초3 · 시가 어떻게 생겼는지 알기 ────────────────────────────
        lesson("g3-scene", 3, "짧은 시 한 편 통째로 그리기", "장면 하나가 시 한 편이 돼요",
            ["jiyong-hosu", "jiyong-byeoltong", "taeeung-gamjakkot", "jiyong-hongsi"],
            [
                "hosu-hide", "hosu-eyes", "hosu-compare",
                "byeoltong-place", "byeoltong-end",
                "gamjakkot-purple", "gamjakkot-rule",
                "hongsi-days", "hongsi-why-left",
                "scene-common"
            ]),
        lesson("g3-repeat", 3, "되풀이", "같은 말이 왜 자꾸 나올까요",
            ["sowol-eommaya", "sowol-geumjandi", "deokchul-bompyeonji", "dongju-banditbul"],
            [
                "eommaya-repeat", "eommaya-where", "eommaya-remove",
                "geumjandi-first", "geumjandi-spring",
                "bompyeonji-paper", "bompyeonji-who",
                "banditbul-frame", "banditbul-what",
                "repeat-why"
            ]),
        lesson("g3-mimetic", 3, "흉내내는 말", "소리와 모습을 글자로 옮겨요",
            ["dongju-haetbi", "dongju-chamsae", "jiyong-hongsi"],
            [
                "haetbi-rain", "haetbi-rainbow", "haetbi-grow",
                "chamsae-sound", "chamsae-paper", "chamsae-letter",
                "hongsi-shoo",
                "mimetic-sound", "mimetic-shape"
            ]),
        lesson("g3-calling", 3, "부르는 말", "대답 없는 것에게 말을 걸어요",
            ["folk-saeya", "folk-dara", "folk-dukkeobi", "sowol-eommaya"],
            [
                "saeya-who", "saeya-ask", "saeya-cries",
                "dara-call", "dara-tool", "dara-wish",
                "dukkeobi-trade", "dukkeobi-short",
                "eommaya-calling",
                "calling-no-answer"
            ]),
        lesson("g3-asking", 3, "시로 물어보기", "묻는 말로 시작하면 함께 생각하게 돼요",
            ["rossetti-baram", "dongju-nun", "folk-eodikkaji"],
            [
                "baram-seen", "baram-how-know", "baram-why-ask",
                "nun-blanket", "nun-why-winter", "nun-guess",
                "eodikkaji-shape", "eodikkaji-closer"
            ]),

        // ── 초4 · 빗대기와 감각 ───────────────────────────────────────
        lesson("g4-simile", 4, "~같이, ~처럼", "무엇에 빗대었는지 찾아요", [], []),
        lesson("g4-persona", 4, "사람처럼 말하기", "사물이 사람이 되어 움직여요", [], []),
        lesson("g4-senses", 4, "오감으로 그리기", "눈·귀·코·혀·살갗으로 그린 시", [], []),
        lesson("g4-speaker", 4, "말하는 이는 지금 어디에 있나", "시 속 사람의 자리를 찾아요", [], []),
        lesson("g4-bittersweet", 4, "웃긴데 왜 슬플까", "웃음 뒤에 숨은 마음", [], []),

        // ── 초5 · 감춰진 뜻과 짜임 ────────────────────────────────────
        lesson("g5-metaphor", 5, "빗댄 말을 감추기", "'~은 ~이다'로 곧장 말해요", [], []),
        lesson("g5-sound", 5, "소리가 만드는 느낌", "부드러운 소리와 센 소리", [], []),
        lesson("g5-empathy", 5, "사물이 대신 우는 것", "내 마음을 사물에 옮겨 놓아요", [], []),
        lesson("g5-flow", 5, "처음과 끝이 어떻게 달라지나", "시가 흘러가는 길", [], []),
        lesson("g5-sijo", 5, "시조의 틀", "석 줄에 담는 옛 노래", [], []),

        // ── 초6 · 어긋난 말과 겹친 뜻 ─────────────────────────────────
        lesson("g6-irony", 6, "속마음과 반대로 말하기", "겉말과 속말이 어긋나요", [], []),
        lesson("g6-paradox", 6, "앞뒤가 안 맞는 말", "말이 안 되는데 뜻이 통해요", [], []),
        lesson("g6-symbol", 6, "하나가 여러 뜻", "별 하나가 여럿을 가리켜요", [], []),
        lesson("g6-contrast", 6, "맞세우기", "빛깔과 처지를 나란히 놓아요", [], []),
        lesson("g6-compare", 6, "두 편 나란히 읽기", "닮은 시와 다른 시", [], []),
        lesson("g6-oldsong", 6, "옛 노래의 후렴과 가락", "가장 오래된 우리 노래들", [], [])
    ]);

    window.POETRY_GRADES = Object.freeze([
        { grade: 3, label: "초등 3학년", short: "초3" },
        { grade: 4, label: "초등 4학년", short: "초4" },
        { grade: 5, label: "초등 5학년", short: "초5" },
        { grade: 6, label: "초등 6학년", short: "초6" }
    ]);
})();
