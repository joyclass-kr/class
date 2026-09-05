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
        lesson("g4-simile", 4, "~같이, ~처럼", "무엇에 빗대었는지 찾아요",
            ["stevenson-geurimja", "leejanghee-bomeun", "dongju-haetbi", "stevenson-bi"],
            [
                "geurimja-follow", "geurimja-ball", "geurimja-alike",
                "bomeun-fur", "bomeun-eye", "bomeun-four",
                "haetbi-simile",
                "bi-places", "bi-far",
                "simile-mark"
            ]),
        lesson("g4-persona", 4, "사람처럼 말하기", "사물이 사람이 되어 움직여요",
            ["dongju-bom", "dongju-jogaekkeopjil", "rossetti-baram", "deokchul-bompyeonji"],
            [
                "bom-baby", "bom-wind", "bom-sun", "bom-family",
                "jogae-who", "jogae-miss", "jogae-me",
                "baram-tree",
                "bompyeonji-jebi",
                "persona-what"
            ]),
        lesson("g4-senses", 4, "오감으로 그리기", "눈·귀·코·혀·살갗으로 그린 시",
            ["rossetti-bunhong", "leebaek-jeongyasa", "dubo-chunyahuiu", "stevenson-geune"],
            [
                "bunhong-rose", "bunhong-white", "bunhong-sense",
                "jeongyasa-frost", "jeongyasa-head",
                "chunya-when", "chunya-quiet",
                "geune-see", "geune-body",
                "senses-why"
            ]),
        lesson("g4-speaker", 4, "말하는 이는 지금 어디에 있나", "시 속 사람의 자리를 찾아요",
            ["dongju-gulttuk", "kimyeongrang-omae", "jiyong-byeoltong", "dongju-jogaekkeopjil"],
            [
                "gulttuk-where", "gulttuk-potato", "gulttuk-lips", "gulttuk-outside",
                "omae-speaker", "omae-leaf", "omae-watcher",
                "byeoltong-when",
                "jogae-place",
                "speaker-why"
            ]),
        lesson("g4-bittersweet", 4, "웃긴데 왜 슬플까", "웃음 뒤에 숨은 마음",
            ["dongju-ojumssagae", "dongju-geojitburi", "dongju-chamsae", "jiyong-hongsi"],
            [
                "ojum-map", "ojum-mom", "ojum-dad", "ojum-sad",
                "geojit-dog", "geojit-hen", "geojit-twice",
                "chamsae-pity",
                "hongsi-wait",
                "bittersweet-how"
            ]),

        // ── 초5 · 감춰진 뜻과 짜임 ────────────────────────────────────
        lesson("g5-metaphor", 5, "빗댄 말을 감추기", "'~은 ~이다'로 곧장 말해요",
            ["manhae-narutbae", "dongju-sonyeon", "dongju-nun", "leejanghee-bomeun"],
            [
                "narutbae-two", "narutbae-direct", "narutbae-wait", "narutbae-frame",
                "sonyeon-palm", "sonyeon-blue", "sonyeon-face",
                "nun-metaphor",
                "bomeun-title",
                "metaphor-what"
            ]),
        lesson("g5-sound", 5, "소리가 만드는 느낌", "부드러운 소리와 센 소리",
            ["yeongrang-doldam", "dongju-bom", "kimyeongrang-omae", "dongju-haetbi"],
            [
                "doldam-sound", "doldam-simile", "doldam-want",
                "bom-four-sounds", "bom-soft-sounds",
                "omae-dialect", "omae-repeat-sound",
                "haetbi-sound-feel",
                "sound-why"
            ]),
        lesson("g5-empathy", 5, "사물이 대신 우는 것", "내 마음을 사물에 옮겨 놓아요",
            ["wangbangyeon-cheonmalli", "leegae-chokbul", "dongju-jogaekkeopjil"],
            [
                "cheonmalli-who", "cheonmalli-water", "cheonmalli-night",
                "chokbul-tears", "chokbul-inside", "chokbul-question",
                "jogae-empathy",
                "empathy-how"
            ]),
        lesson("g5-flow", 5, "처음과 끝이 어떻게 달라지나", "시가 흘러가는 길",
            ["sowol-sanyuhwa", "sowol-gaeyeoul", "dongju-saeroun-gil", "jiyong-byeoltong"],
            [
                "sanyuhwa-first", "sanyuhwa-last", "sanyuhwa-change", "sanyuhwa-alone",
                "gaeyeoul-start", "gaeyeoul-end", "gaeyeoul-middle",
                "saeroungil-frame", "saeroungil-middle",
                "byeoltong-flow"
            ]),
        lesson("g5-sijo", 5, "시조의 틀", "석 줄에 담는 옛 노래",
            ["leesunsin-hansanseom", "yunseondo-ouga", "hwanghui-daechu", "leejeongbo-gukhwa"],
            [
                "hansanseom-lines", "hansanseom-where", "hansanseom-turn",
                "ouga-count", "ouga-five", "ouga-water", "ouga-rock", "ouga-last-line",
                "daechu-autumn", "daechu-drink",
                "gukhwa-when", "gukhwa-answer",
                "sijo-shape"
            ]),

        // ── 초6 · 어긋난 말과 겹친 뜻 ─────────────────────────────────
        lesson("g6-irony", 6, "속마음과 반대로 말하기", "겉말과 속말이 어긋나요",
            ["sowol-jindallae", "sowol-meonhuil", "sasol-dukkeobi"],
            [
                "jindallae-send", "jindallae-tears", "jindallae-flower", "jindallae-frame2",
                "meonhuil-count", "meonhuil-truth", "meonhuil-future",
                "dukkeobi-fall", "dukkeobi-boast", "dukkeobi-satire",
                "irony-what"
            ]),
        lesson("g6-paradox", 6, "앞뒤가 안 맞는 말", "말이 안 되는데 뜻이 통해요",
            ["manhae-bokjong", "manhae-alsu", "manhae-narutbae"],
            [
                "bokjong-sweet", "bokjong-choice", "bokjong-refuse",
                "alsu-ash", "alsu-questions", "alsu-lamp",
                "narutbae-paradox",
                "paradox-what"
            ]),
        lesson("g6-symbol", 6, "하나가 여러 뜻", "별 하나가 여럿을 가리켜요",
            ["dongju-seosi", "yuksa-cheongpodo", "nocheonmyeong-saseum"],
            [
                "seosi-star", "seosi-wind", "seosi-last",
                "cheongpodo-guest", "cheongpodo-white", "cheongpodo-prepare",
                "saseum-neck", "saseum-mirror", "saseum-self",
                "symbol-what"
            ]),
        lesson("g6-contrast", 6, "맞세우기", "빛깔과 처지를 나란히 놓아요",
            ["dongju-jahwasang", "yuksa-cheongpodo", "sowol-sanyuhwa", "nocheonmyeong-saseum"],
            [
                "jahwasang-feel", "jahwasang-who", "jahwasang-last",
                "cheongpodo-contrast",
                "sanyuhwa-contrast",
                "saseum-contrast",
                "contrast-why"
            ]),
        lesson("g6-compare", 6, "두 편 나란히 읽기", "닮은 시와 다른 시",
            ["leebangwon-hayeoga", "jeongmongju-dansimga", "sowol-jindallae", "sowol-meonhuil"],
            [
                "hayeoga-ask", "hayeoga-chik",
                "dansimga-answer", "dansimga-hundred",
                "two-sijo-shape", "two-sijo-diff",
                "two-sowol-same", "two-sowol-diff",
                "compare-how"
            ]),
        lesson("g6-oldsong", 6, "옛 노래의 후렴과 가락", "가장 오래된 우리 노래들",
            ["goryeo-cheongsan", "goryeo-gasiri", "gojia-guji", "jiyong-hyangsu"],
            [
                "cheongsan-refrain", "cheongsan-where", "cheongsan-bird",
                "gasiri-refrain", "gasiri-mismatch", "gasiri-hope",
                "guji-three", "guji-call",
                "hyangsu-refrain", "hyangsu-scenes", "hyangsu-old-new",
                "oldsong-why"
            ]),

        // ── 중1 · 시인별로 묶어 읽기 ──────────────────────────────────
        // 여기서부터는 배우는 것이 아니라 시인으로 묶는다. 시험은 아는 시인의 처음 보는 시를 내니까,
        // 익숙한 시 곁에 처음 보는 시를 한 편씩 두어 그 시인의 버릇을 익히게 한다.
        lesson("m1-jiyong", 7, "정지용 다시 읽기", "아는 시인, 처음 보는 시",
            ["jiyong-yurichang", "jiyong-hyangsu", "jiyong-hosu", "jiyong-byeoltong"],
            [
                "yurichang-what", "yurichang-action", "yurichang-paradox", "yurichang-restraint", "yurichang-bird",
                "hyangsu-star-again",
                "jiyong-habit", "jiyong-new"
            ]),
        lesson("m1-sowol", 7, "김소월 다시 읽기", "헤어짐 앞에서 머뭇거리는 시",
            ["sowol-ganeungil", "sowol-jeopdongsae", "sowol-jindallae", "sowol-sanyuhwa"],
            [
                "ganeungil-hesitate", "ganeungil-crow", "ganeungil-water", "ganeungil-contrast",
                "jeopdongsae-who", "jeopdongsae-why-cry", "jeopdongsae-sound", "jeopdongsae-story",
                "sowol-habit"
            ]),
        lesson("m1-era", 7, "빼앗긴 땅에서 쓴 시", "시대를 알고 읽기",
            ["sanghwa-ppaeatgin", "yuksa-cheongpodo", "dongju-seosi"],
            [
                "ppaeatgin-question", "ppaeatgin-walk", "ppaeatgin-spring", "ppaeatgin-last", "ppaeatgin-land",
                "era-cheongpodo", "era-seosi",
                "era-how"
            ]),
        lesson("m1-hyangga", 7, "천 년 전의 노래", "신라 향가 세 편",
            ["hyangga-jemangmaega", "hyangga-seodongyo", "hyangga-heonhwaga"],
            [
                "jemangmaega-who", "jemangmaega-leaf", "jemangmaega-branch", "jemangmaega-hope",
                "seodongyo-purpose", "seodongyo-children",
                "heonhwaga-flower", "heonhwaga-condition",
                "hyangga-what"
            ]),
        lesson("m1-textbook", 7, "교과서에서 읽는 시", "본문은 교과서에서",
            ["gihyeongdo-eomma", "kimjonggil-seongtanje", "sinseokjeong-meonnara"],
            [
                "eomma-wait", "eomma-sell", "eomma-now", "eomma-feel",
                "seongtanje-father", "seongtanje-why", "seongtanje-now",
                "meonnara-who", "meonnara-where",
                "textbook-common"
            ]),

        // ── 중2 ───────────────────────────────────────────────────────
        lesson("m2-manhae", 8, "한용운 다시 읽기", "어긋난 말에 담은 님",
            ["manhae-nim", "manhae-narutbae", "manhae-bokjong", "manhae-alsu"],
            [
                "nim-gone", "nim-not-sent", "nim-turn", "nim-song", "nim-honorific",
                "manhae-you", "manhae-habit",
                "alsu-nim-again"
            ]),
        lesson("m2-yuksa", 8, "이육사 다시 읽기", "벼랑 끝에서 세운 뜻",
            ["yuksa-jeoljeong", "yuksa-kkot", "yuksa-cheongpodo"],
            [
                "jeoljeong-where", "jeoljeong-season", "jeoljeong-rainbow", "jeoljeong-eyes",
                "kkot-when", "kkot-promise",
                "yuksa-habit", "yuksa-two-places"
            ]),
        lesson("m2-yeongrang", 8, "김영랑 다시 읽기", "찬란한 슬픔의 봄",
            ["yeongrang-moran", "yeongrang-doldam", "kimyeongrang-omae"],
            [
                "moran-wait", "moran-fall", "moran-year", "moran-paradox", "moran-frame",
                "yeongrang-habit", "yeongrang-soft"
            ]),
        lesson("m2-dongju", 8, "윤동주 다시 읽기", "나를 들여다보는 시",
            ["dongju-ttodareun", "dongju-jahwasang", "dongju-seosi"],
            [
                "ttodareun-night", "ttodareun-cry", "ttodareun-dog", "ttodareun-go",
                "dongju-habit", "dongju-mirror"
            ]),
        lesson("m2-leaving", 8, "떠남과 돌아옴", "문턱에서 머뭇거리는 시",
            ["ojanghwan-gohyang", "yongcheol-tteonaganeun"],
            [
                "gohyang-where", "gohyang-season", "gohyang-ask", "gohyang-why",
                "tteonaganeun-repeat", "tteonaganeun-why", "tteonaganeun-hard", "tteonaganeun-ahead",
                "leaving-compare"
            ]),
        lesson("m2-old", 8, "옛 노래 더 읽기", "시조 세 수와 고려 노래 둘",
            ["leehwang-dosan", "goryeo-dongdong", "goryeo-jeongseokga"],
            [
                "dosan-first", "dosan-goin", "dosan-mountain",
                "dongdong-refrain", "dongdong-month", "dongdong-alone",
                "jeongseokga-nut", "jeongseokga-why",
                "old-refrain-again"
            ])
    ]);

    window.POETRY_GRADES = Object.freeze([
        { grade: 3, label: "초등 3학년", short: "초3" },
        { grade: 4, label: "초등 4학년", short: "초4" },
        { grade: 5, label: "초등 5학년", short: "초5" },
        { grade: 6, label: "초등 6학년", short: "초6" },
        { grade: 7, label: "중학 1학년", short: "중1" },
        { grade: 8, label: "중학 2학년", short: "중2" }
    ]);
})();
