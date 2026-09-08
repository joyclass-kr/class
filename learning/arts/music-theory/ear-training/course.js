(function () {
    "use strict";

    /*
     * 과정 하나는 줄의 사다리다. 줄마다 할 수 있는 것이 아이콘으로 붙는다 —
     * body/examples가 있으면 설명, read가 있으면 악보 보고 고르기, listen이
     * 있으면 소리 듣고 고르기, keys가 있으면 건반 찍기.
     * kind "preset"인 줄은 설명이 없는 줄, 곧 옛 「혼자 연습」의 판이다.
     */

    const INTERVAL_COURSE = {
        id: "interval",
        name: "Intervals​(음정)",
        lessons: [
            {
                id: "perfect",
                title: "Perfect Intervals​(완전음정)",
                body: [
                    "두 음을 함께 울렸을 때 서로 부딪히지 않고 하나처럼 섞이는 음정을 Perfect Interval​(완전음정)이라고 합니다. 같은 음인 P1​(완전1도), P4​(완전4도), P5​(완전5도), 그리고 위아래 같은 이름인 P8​(완전8도) 네 가지입니다.",
                    "P5​(완전5도)를 뒤집으면 P4​(완전4도)가 되고, P4​(완전4도)를 뒤집으면 P5​(완전5도)가 됩니다. 이것을 Inversion​(자리바꿈)이라고 하며, 아래 음을 한 옥타브 올려 만듭니다."
                ],
                examples: ["P4", "P5", "P8"],
                read: { drill: "reading", items: ["P4", "P5", "P8"] },
                listen: { drill: "interval", items: ["P4", "P5", "P8"], mode: "mixed", limit: 10 },
                keys: { items: ["P4", "P5", "P8"] }
            },
            {
                id: "thirds",
                title: "Thirds​(3도)",
                body: [
                    "Third​(3도)는 화음의 성질을 정하는 음정입니다. M3​(장3도)는 반음 네 개, m3​(단3도)는 반음 세 개입니다. 반음 하나 차이지만 화음의 이름이 통째로 바뀝니다.",
                    "Major Triad​(장3화음)과 Minor Triad​(단3화음)을 가르는 것도 맨 아래 두 음이 M3​(장3도)인지 m3​(단3도)인지 하나입니다."
                ],
                examples: ["m3", "M3"],
                read: { drill: "reading", items: ["m3", "M3"] },
                listen: { drill: "interval", items: ["m3", "M3"], mode: "mixed", limit: 10 },
                keys: { items: ["m3", "M3"] }
            },
            {
                id: "seconds",
                title: "Seconds​(2도)",
                body: [
                    "Second​(2도)는 가장 좁은 음정입니다. m2​(단2도)는 반음 하나로, 함께 울리면 서로 부딪혀 긁히는 소리가 납니다. M2​(장2도)는 반음 두 개로, Major Scale​(장음계)에서 한 계단 올라가는 소리입니다.",
                    "좁은 음정은 Harmonic​(화성)으로 함께 울릴 때와 Melodic​(선율)으로 차례로 울릴 때가 아주 다르게 들립니다."
                ],
                examples: ["m2", "M2"],
                read: { drill: "reading", items: ["m2", "M2"] },
                listen: { drill: "interval", items: ["m2", "M2"], mode: "mixed", limit: 10 },
                keys: { items: ["m2", "M2"] }
            },
            { kind: "preset", drill: "interval", preset: "p23" },
            { kind: "preset", drill: "interval", preset: "to5" },
            {
                id: "sixths",
                title: "Sixths​(6도)",
                body: [
                    "M6​(장6도)는 m3​(단3도)를 뒤집은 음정이고, m6​(단6도)는 M3​(장3도)를 뒤집은 음정입니다. 아래 음을 한 옥타브 올리면 Third​(3도)가 됩니다.",
                    "Triad​(3화음)을 뒤집으면 바깥 두 음이 Sixth​(6도)가 됩니다."
                ],
                examples: ["m6", "M6"],
                read: { drill: "reading", items: ["m6", "M6"] },
                listen: { drill: "interval", items: ["m6", "M6"], mode: "mixed", limit: 10 },
                keys: { items: ["m6", "M6"] }
            },
            {
                id: "sevenths",
                title: "Sevenths​(7도)",
                body: [
                    "Seventh​(7도)는 Octave​(옥타브)에서 반음 하나 또는 두 개가 모자란 음정입니다. M7​(장7도)는 반음 하나 모자라 아슬아슬하게 들리고, m7​(단7도)는 반음 두 개가 모자라 7th Chord​(7화음)에서 자주 만나는 소리입니다.",
                    "M7​(장7도)는 m2​(단2도)를, m7​(단7도)는 M2​(장2도)를 뒤집은 음정입니다."
                ],
                examples: ["m7", "M7"],
                read: { drill: "reading", items: ["m7", "M7"] },
                listen: { drill: "interval", items: ["m7", "M7"], mode: "mixed", limit: 10 },
                keys: { items: ["m7", "M7"] }
            },
            {
                id: "quality-chain",
                title: "Interval Quality​(음정의 성질)",
                diagram: "quality-chain",
                body: [
                    "음정 이름은 Number​(도수)와 Quality​(성질) 두 가지로 됩니다. 도수는 음이름을 세어 정하고, 성질은 그 사이 반음 수로 정합니다.",
                    "1·4·5·8도는 Perfect​(완전) 계열입니다. 완전에서 반음을 좁히면 Diminished​(감), 넓히면 Augmented​(증)이 됩니다. 2·3·6·7도는 Major​(장)·Minor​(단) 계열입니다. 장에서 반음을 좁히면 단, 단에서 더 좁히면 감, 장에서 넓히면 증이 됩니다.",
                    "완전 계열에는 장·단이 없고, 장·단 계열에는 완전이 없습니다."
                ],
                examples: ["P5", "A4"],
                read: {
                    drill: "reading",
                    items: ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"]
                },
                listen: {
                    drill: "interval",
                    items: ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"],
                    mode: "mixed",
                    limit: 20
                },
                keys: { items: ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"] }
            },
            {
                id: "tritone",
                title: "Tritone​(증4도)",
                body: [
                    "반음 여섯 개는 온음 세 개와 같습니다. tri는 셋을, tone은 온음을 뜻하니 Tritone​(삼온음)은 이름 그대로 온음 셋이라는 말입니다. 우리말 이름도 그대로 삼온음입니다.",
                    "이 음정은 한 옥타브를 정확히 반으로 자릅니다. 그래서 삼온음을 두 번 쌓으면 한 옥타브가 되고, 한 옥타브 안에서 가장 불안하게 들립니다.",
                    "적는 방법은 두 가지입니다. P4​(완전4도)보다 반음 넓게 적으면 A4​(증4도), P5​(완전5도)보다 반음 좁게 적으면 d5​(감5도)가 됩니다. 소리는 같지만 적는 방법이 다르며, 이것을 Enharmonic​(이명동음)이라고 합니다."
                ],
                examples: ["A4", "d5"],
                read: { drill: "reading", items: ["P4", "A4", "d5", "P5"] },
                listen: { drill: "interval", items: ["P4", "A4", "P5"], mode: "mixed", limit: 10 },
                keys: { items: ["P4", "A4", "P5"] }
            },
            { kind: "preset", drill: "interval", preset: "p45" },
            { kind: "preset", drill: "interval", preset: "to8" },
            {
                id: "compound",
                title: "Compound Intervals​(겹음정)",
                body: [
                    "한 옥타브보다 넓은 음정을 Compound Interval​(겹음정)이라고 합니다. 한 옥타브를 덜어 내면 Simple Interval​(홑음정)이 나옵니다. m9​(단9도)는 m2​(단2도), M10​(장10도)은 M3​(장3도)과 성질이 같습니다.",
                    "그래서 겹음정은 두 음 가운데 하나를 머릿속에서 한 옥타브 옮겨 좁은 음정으로 바꿔 듣습니다. 반음 수는 열두 개씩 커집니다. P12​(완전12도)는 P5​(완전5도)와 같습니다."
                ],
                examples: ["m9", "M10", "P12"],
                read: { drill: "reading", items: ["m9", "M9", "m10", "M10", "P11", "A11", "P12"] },
                listen: {
                    drill: "interval",
                    items: ["m9", "M9", "m10", "M10", "P11", "A11", "P12"],
                    mode: "mixed",
                    limit: 15
                },
                keys: { items: ["m9", "M9", "m10", "M10", "P11", "A11", "P12"] }
            },
            { kind: "preset", drill: "interval", preset: "to15" },
            { kind: "preset", drill: "melody", preset: "d1" },
            { kind: "preset", drill: "melody", preset: "d2" },
            { kind: "preset", drill: "melody", preset: "d3" },
            { kind: "preset", drill: "melody", preset: "d4" },
            { kind: "preset", drill: "melody", preset: "c1" },
            { kind: "preset", drill: "melody", preset: "c2" },
            { kind: "preset", drill: "melody", preset: "c3" },
            { kind: "preset", drill: "melody", preset: "c4" }
        ]
    };

    const CHORD_COURSE = {
        id: "chord",
        name: "Chords​(화음)",
        lessons: [
            {
                id: "triads",
                title: "Major and Minor Triads​(장3화음과 단3화음)",
                body: [
                    "Triad​(3화음)은 음 세 개로 된 화음입니다. Root​(밑음), 그 위 Third​(3도), 다시 그 위 3도로 쌓으면 맨 아래와 맨 위가 Fifth​(5도)가 됩니다.",
                    "아래 3도가 M3​(장3도)이면 Major Triad​(장3화음), m3​(단3도)이면 Minor Triad​(단3화음)입니다. 바깥 5도는 둘 다 P5​(완전5도)입니다."
                ],
                examples: [{ chord: "maj" }, { chord: "min" }],
                read: { drill: "chord", items: ["maj", "min"] },
                listen: { drill: "chord", items: ["maj", "min"], mode: "harmony", limit: 10 }
            },
            {
                id: "dim-aug",
                title: "Diminished and Augmented Triads​(감3화음과 증3화음)",
                body: [
                    "바깥 5도가 P5​(완전5도)가 아닌 3화음도 있습니다. m3​(단3도)를 두 번 쌓으면 바깥이 d5​(감5도)가 되어 Diminished Triad​(감3화음), M3​(장3도)를 두 번 쌓으면 A5​(증5도)가 되어 Augmented Triad​(증3화음)입니다.",
                    "감3화음은 좁혀진 5도, 증3화음은 벌어진 5도로 소리가 서로 다릅니다. 증3화음은 3도를 같은 크기로 두 번 쌓았으므로 자리를 바꿔도 쌓인 모양이 그대로입니다."
                ],
                examples: [{ chord: "dim" }, { chord: "aug" }],
                read: { drill: "chord", items: ["dim", "aug"] },
                listen: { drill: "chord", items: ["maj", "min", "dim", "aug"], mode: "mixed", limit: 15 }
            },
            {
                id: "inversions",
                title: "Chord Inversions​(화음 자리바꿈)",
                body: [
                    "실제 음악에서는 밑음이 맨 아래 있는 Root Position​(근음 자리)만 쓰지 않습니다. 맨 아래 음을 한 옥타브 올리면 1st Inversion​(첫째 자리바꿈), 아래 두 음을 올리면 2nd Inversion​(둘째 자리바꿈)이 됩니다.",
                    "첫째 자리바꿈은 바깥 두 음이 Sixth​(6도)가 되고, 둘째 자리바꿈은 아래 두 음이 P4​(완전4도)가 됩니다.",
                    "Augmented Triad​(증3화음)은 자리를 바꿔도 쌓인 모양이 그대로여서 귀로는 구별할 수 없습니다. 그래서 자리 문제에는 넣지 않습니다."
                ],
                examples: [{ chord: "maj", inversion: 0 }, { chord: "maj", inversion: 1 }, { chord: "maj", inversion: 2 }],
                read: { drill: "position", items: ["root", "first", "second"] },
                listen: { drill: "position", items: ["root", "first", "second"], mode: "harmony", limit: 15 }
            },
            { kind: "preset", drill: "position", preset: "easy" },
            {
                id: "dom7-maj7",
                title: "dom7​(속7화음)과 maj7​(장7화음)",
                body: [
                    "3화음 위에 3도를 하나 더 쌓으면 7th Chord​(7화음)이 됩니다. Major Triad​(장3화음) 위에 m3​(단3도)를 얹으면 Dominant 7th​(속7화음), M3​(장3도)를 얹으면 Major 7th​(장7화음)입니다.",
                    "속7화음은 어딘가로 풀려야 할 것처럼 들리고, 장7화음은 그 자리에 머무는 부드러운 소리입니다. 맨 아래 음과 맨 위 음이 m7​(단7도)인지 M7​(장7도)인지를 들으면 갈립니다."
                ],
                examples: [{ chord: "dom7" }, { chord: "maj7" }],
                read: { drill: "chord", items: ["dom7", "maj7"] },
                listen: { drill: "chord", items: ["dom7", "maj7"], mode: "mixed", limit: 10 }
            },
            {
                id: "min7-mmaj7",
                title: "m7​(단7화음)과 mMaj7​(단장7화음)",
                body: [
                    "Minor Triad​(단3화음) 위에 m3​(단3도)를 얹으면 Minor 7th​(단7화음), M3​(장3도)를 얹으면 Minor Major 7th​(단장7화음)입니다. 단7화음은 흔하게 쓰이고, 단장7화음은 아래는 어둡고 위는 팽팽한 소리가 납니다.",
                    "아래 3화음이 장인지 단인지를 먼저 듣고, 그다음 맨 위 7음이 m7​(단7도)인지 M7​(장7도)인지를 듣습니다."
                ],
                examples: [{ chord: "min7" }, { chord: "mmaj7" }],
                read: { drill: "chord", items: ["min7", "mmaj7"] },
                listen: { drill: "chord", items: ["min7", "mmaj7"], mode: "mixed", limit: 10 }
            },
            {
                id: "other7",
                title: "Other 7th Chords​(나머지 7화음)",
                body: [
                    "Diminished Triad​(감3화음) 위에 m3​(단3도)를 얹으면 Diminished 7th​(감7화음), M3​(장3도)를 얹으면 Half-diminished 7th​(반감7화음)입니다. 감7화음은 단3도만 세 번 쌓여 어디가 밑음인지 알 수 없는 소리가 납니다.",
                    "Augmented Triad​(증3화음) 위에 M3​(장3도)를 얹으면 Augmented Major 7th​(증장7화음)입니다. 셋 다 자주 쓰이지는 않습니다."
                ],
                examples: [{ chord: "m7b5" }, { chord: "dim7" }, { chord: "maj7s5" }],
                read: { drill: "chord", items: ["m7b5", "dim7", "maj7s5"] },
                listen: { drill: "chord", items: ["m7b5", "dim7", "maj7s5"], mode: "mixed", limit: 12 }
            },
            { kind: "preset", drill: "chord", preset: "basic7" },
            { kind: "preset", drill: "chord", preset: "adv7" },
            {
                id: "tensions",
                title: "Tensions​(텐션)",
                body: [
                    "7화음 위에 3도를 더 쌓으면 9도, 11도, 13도가 나옵니다. 이렇게 7화음 위에 얹는 음을 Tension​(텐션)이라고 합니다. 9도는 밑음에서 한 옥타브 위 2도, 11도는 4도, 13도는 6도 자리입니다.",
                    "음이 다섯을 넘으면 한 손에 다 들어가지 않습니다. 그래서 왼손이 뿌리음을 짚고 오른손이 나머지 넷을 잡습니다. 텐션이 하나면 5도를 넣어 자리를 메우고, 둘이면 5도를 빼고 그 자리에 넣습니다.",
                    "maj9​(장9화음)는 장7화음에 9도를, m9​(단9화음)는 단7화음에 9도를 얹은 것입니다. 6/9는 7도 대신 6도와 9도를 얹어 7도의 긴장을 없앤 화음입니다."
                ],
                examples: [{ chord: "maj9" }, { chord: "m9" }, { chord: "sixnine" }],
                read: { drill: "chord", items: ["maj9", "maj13", "sixnine", "m9", "m11", "m13"], limit: 12 },
                listen: { drill: "chord", preset: "majten", mode: "harmony", limit: 10 }
            },
            {
                id: "dom-tensions",
                title: "Dominant Tensions​(속화음의 텐션)",
                body: [
                    "속7화음의 텐션은 다른 화음보다 훨씬 자유롭습니다. 어차피 으뜸화음으로 가려는 힘이 센 화음이라, 텐션을 얹어 그 힘을 더 세게 만들어도 자리가 흔들리지 않습니다.",
                    "9도와 13도를 얹은 dom9​(속9화음)·dom13​(속13화음)이 기본입니다. 11도는 그냥 얹으면 3음과 반음으로 부딪히므로 반음 올려 ♯11로 씁니다. 이때 9도가 함께 있어야 합니다 — 9도가 없으면 그냥 7♭5로 들립니다.",
                    "9도와 13도를 반음 내리거나 올린 것이 Altered Dominant​(변화된 속화음)입니다. ♭9, ♯9, ♭13이 그것이고, 셋은 서로 잘 어울려 함께 쓰입니다."
                ],
                examples: [{ chord: "dom9" }, { chord: "dom13" }, { chord: "dom7b9" }],
                read: { drill: "chord", items: ["dom9", "dom13", "dom9s11", "dom7b9", "dom7s9", "dom7b9b13"], limit: 12 },
                listen: { drill: "chord", preset: "domten", mode: "harmony", limit: 10 }
            },
            { kind: "preset", drill: "chord", preset: "minten" },
            { kind: "preset", drill: "chord", preset: "altten" }
        ]
    };

    const PROGRESSION_COURSE = {
        id: "progression",
        name: "Chord Progressions​(화음 진행)",
        lessons: [
            {
                id: "numerals",
                title: "Roman Numerals​(로마숫자)",
                body: [
                    "화음을 C·F·G처럼 부르면 조가 바뀔 때마다 이름이 다 달라집니다. 그래서 음계의 몇째 음에 쌓았는지로 셉니다. 장음계 첫 음에 쌓으면 I, 넷째 음에 쌓으면 IV, 다섯째 음에 쌓으면 V입니다.",
                    "대문자는 장3화음, 소문자는 단3화음입니다. 그래서 로마숫자 하나에 자리와 성질이 함께 담깁니다.",
                    "I은 돌아가 쉬는 자리입니다. V는 I로 돌아가려는 힘이 가장 센 자리고, IV는 그 사이를 잇는 자리입니다. 이 셋만으로 노래 한 곡이 됩니다."
                ],
                examples: [{ prog: "I–IV–V–I" }, { prog: "I–V–IV–I" }],
                read: { drill: "progression", preset: "p1" },
                listen: { drill: "progression", preset: "p1", limit: 10 }
            },
            {
                id: "loops",
                title: "Four-chord Loops​(네 화음 순환)",
                body: [
                    "I·IV·V에 vi를 더한 네 화음을 돌려 쓰는 진행이 팝에서 가장 많이 쓰입니다. I–V–vi–IV가 대표입니다.",
                    "같은 네 화음이라도 어디서 시작하느냐에 따라 다른 진행이 됩니다. vi–IV–I–V와 IV–I–V–vi는 같은 고리를 다른 자리에서 끊은 것입니다.",
                    "그래서 이 진행을 알아들으려면 어느 화음이 I인지 먼저 찾아야 합니다. 조를 모르면 I–V–vi–IV와 vi–IV–I–V를 구별할 방법이 아예 없습니다."
                ],
                examples: [{ prog: "I–V–vi–IV" }, { prog: "vi–IV–I–V" }],
                read: { drill: "progression", preset: "p2" },
                listen: { drill: "progression", preset: "p2", limit: 10 }
            },
            { kind: "preset", drill: "progression", preset: "p4" },
            {
                id: "diatonic",
                title: "Diatonic Triads​(온음계 3화음)",
                body: [
                    "장음계 일곱 음에 3화음을 쌓으면 I ii iii IV V vi vii°가 됩니다. I·IV·V는 장3화음, ii·iii·vi는 단3화음, vii°는 감3화음입니다.",
                    "ii는 V로 가는 길을 열어 줍니다. ii–V–I은 가장 자주 쓰는 마침꼴입니다.",
                    "iii와 vi는 I과 음 두 개를 함께 갖고 있어 I 대신 놓아도 자리가 흔들리지 않습니다. 같은 자리를 되풀이하지 않고 색을 바꿀 때 씁니다."
                ],
                examples: [{ prog: "ii–V–I" }, { prog: "I–iii–IV–V" }],
                read: { drill: "progression", preset: "p3" },
                listen: { drill: "progression", preset: "p3", limit: 10 }
            },
            { kind: "preset", drill: "progression", preset: "p5" },
            {
                id: "minor-key",
                title: "Minor Key​(단조 진행)",
                body: [
                    "단조에서는 로마숫자를 그 단음계를 기준으로 셉니다. 자연단음계에 3화음을 쌓으면 i ii° III iv v VI VII입니다.",
                    "III·VI·VII에 ♭을 붙이지 않는 것이 중요합니다. 단음계 자신의 셋째·여섯째·일곱째 음이기 때문입니다. 숫자 앞의 ♭은 빌려 온 화음이라는 표시로만 씁니다.",
                    "i–VI–VII–i처럼 딸림화음을 거치지 않고 도는 진행이 단조에서 많이 쓰입니다. v를 V(장3화음)로 바꿔 쓰면 마침이 확실하게 닫히는데, 그것은 화성단음계에서 빌려 온 것입니다."
                ],
                examples: [{ prog: "i–VI–VII–i", minor: true }, { prog: "i–iv–V–i", minor: true }],
                read: { drill: "progression", preset: "p6" },
                listen: { drill: "progression", preset: "p6", limit: 10 }
            },
            {
                id: "borrowed",
                title: "Borrowed Chords​(차용화음)",
                body: [
                    "조를 바꾸지 않고 화음 하나만 나란한 단조에서 가져다 쓰는 것을 Modal Interchange​(차용화음)라고 합니다. 장조의 IV를 iv로 바꾸는 것이 가장 흔합니다.",
                    "무엇이 달라졌는지는 그 자리의 3음입니다. IV에서 iv로 가면 3음이 장3도에서 단3도로 반음 내려갑니다. 도수는 그대로고 성질만 바뀝니다.",
                    "♭VII은 딸림화음을 거치지 않고 으뜸화음으로 내려오는 길을 열어 줍니다. ♭VI–♭VII–I은 한 단계씩 올라서며 마치는 꼴입니다."
                ],
                examples: [{ prog: "I–IV–iv–I" }, { prog: "I–♭VII–IV–I" }, { prog: "I–♭VI–♭VII–I" }],
                read: { drill: "progression", preset: "p7" },
                listen: { drill: "progression", preset: "p7", limit: 10 }
            },
            { kind: "preset", drill: "progression", preset: "p8" },
            { kind: "preset", drill: "progression", preset: "p9" },
            { kind: "preset", drill: "progression", preset: "p10" },
            {
                id: "secondary",
                title: "Secondary Dominants​(부속화음)",
                body: [
                    "V가 I로 가려는 힘을 다른 자리에 빌려 쓰는 것이 Secondary Dominant​(부속화음)입니다. V로 가는 V를 V/V로 적습니다. C 장조에서 V/V는 D 장3화음입니다.",
                    "V/V는 라이디언에서 빌려 온 II와 소리가 같습니다. C 장조에서 둘 다 D 장3화음입니다. 가르는 것은 다음 화음입니다 — V로 가면 V/V, 가지 않으면 II입니다.",
                    "그래서 이 진행은 화음 하나만 듣고는 답이 없습니다. 두 화음을 묶어 들어야 합니다."
                ],
                examples: [{ prog: "I–V/V–V–I" }, { prog: "I–II–IV–I" }],
                read: { drill: "progression", preset: "p11" },
                listen: { drill: "progression", preset: "p11", limit: 10 }
            }
        ]
    };

    const SCALE_COURSE = {
        id: "scale",
        name: "Scales​(음계)",
        lessons: [
            {
                id: "major-minor",
                title: "Major and Natural Minor​(장음계와 자연단음계)",
                body: [
                    "Major Scale​(장음계)은 온음과 반음이 온-온-반-온-온-온-반으로 놓인 음계입니다. 셋째와 넷째 음 사이, 일곱째와 여덟째 음 사이가 반음입니다.",
                    "Natural Minor​(자연단음계)는 장음계에서 셋째·여섯째·일곱째 음을 반음 내린 것입니다. 장음계의 여섯째 음에서 시작해 같은 건반만 밟아도 자연단음계가 되며, 이렇게 짝을 이루는 두 조를 나란한조라고 합니다."
                ],
                examples: [{ scale: "major" }, { scale: "nminor" }],
                read: { drill: "scale", items: ["major", "nminor"], limit: 8 },
                listen: { drill: "scale", items: ["major", "nminor"], mode: "mixed", limit: 10 }
            },
            {
                id: "minors",
                title: "Three Minor Scales​(단음계 셋)",
                body: [
                    "Harmonic Minor​(화성단음계)는 자연단음계의 일곱째 음만 반음 올린 것입니다. 일곱째와 여덟째 음이 반음으로 붙고, 여섯째와 일곱째 음 사이가 한 음 반으로 벌어집니다.",
                    "Melodic Minor​(가락단음계)는 여섯째와 일곱째 음을 모두 반음 올린 것입니다. 올라갈 때 위쪽 네 음이 장음계와 같아지고, 악곡에서는 내려올 때 자연단음계로 되돌리는 일이 많습니다."
                ],
                examples: [{ scale: "nminor" }, { scale: "hminor" }, { scale: "mminor" }],
                read: { drill: "scale", items: ["nminor", "hminor", "mminor"], limit: 12 },
                listen: { drill: "scale", items: ["nminor", "hminor", "mminor"], mode: "mixed", limit: 12 }
            },
            { kind: "preset", drill: "scale", preset: "basic" },
            {
                id: "pentatonic",
                title: "Pentatonic Scales​(5음음계)",
                body: [
                    "Pentatonic Scale​(5음음계)은 한 옥타브를 다섯 음으로 밟는 음계입니다. Major Pentatonic​(장5음음계)은 장음계에서 넷째와 일곱째 음을 뺀 것으로, 반음이 하나도 없습니다.",
                    "Minor Pentatonic​(단5음음계)은 자연단음계에서 둘째와 여섯째 음을 뺀 것입니다. 장5음음계의 여섯째 음에서 시작하면 같은 음들이 됩니다."
                ],
                examples: [{ scale: "pmaj" }, { scale: "pmin" }],
                read: { drill: "scale", items: ["pmaj", "pmin", "major", "nminor"], limit: 12 },
                listen: { drill: "scale", items: ["pmaj", "pmin"], mode: "mixed", limit: 10 }
            },
            {
                id: "blues",
                title: "Blues Scale​(블루스음계)",
                body: [
                    "Blues Scale​(블루스음계)은 단5음음계에 음 하나를 더한 여섯 음 음계입니다. 더해진 음은 밑음에서 d5​(감5도) 떨어진 자리입니다.",
                    "그 음은 앞뒤가 모두 반음으로 붙어 있어, 셋째 음에서 넷째 음으로 지나가는 길처럼 쓰입니다."
                ],
                examples: [{ scale: "pmin" }, { scale: "blues" }],
                read: { drill: "scale", items: ["pmin", "blues", "pmaj"], limit: 10 },
                listen: { drill: "scale", items: ["pmin", "blues", "pmaj"], mode: "mixed", limit: 12 }
            },
            {
                id: "modes",
                title: "Church Modes​(교회 선법)",
                body: [
                    "장음계의 일곱 음 가운데 어느 음에서 시작하느냐에 따라 서로 다른 선법이 나옵니다. 첫째 음에서 시작하면 Ionian​(이오니아), 곧 장음계이고, 여섯째 음에서 시작하면 Aeolian​(에올리아), 곧 자연단음계입니다.",
                    "Lydian​(리디아)은 넷째 음, Mixolydian​(믹솔리디아)은 다섯째 음에서 시작합니다. 밑음을 같은 음으로 두고 장음계와 견주면 Lydian​(리디아)은 넷째 음이 반음 높고, Mixolydian​(믹솔리디아)은 일곱째 음이 반음 낮습니다."
                ],
                examples: [{ scale: "lydian" }, { scale: "mixolydian" }],
                read: { drill: "scale", items: ["lydian", "mixolydian", "major"], limit: 12 },
                listen: { drill: "scale", items: ["major", "lydian", "mixolydian"], mode: "mixed", limit: 12 }
            },
            {
                id: "minor-modes",
                title: "Minor Modes​(단음계 쪽 선법)",
                body: [
                    "Dorian​(도리아)은 장음계의 둘째 음, Phrygian​(프리지아)은 셋째 음, Locrian​(로크리아)은 일곱째 음에서 시작합니다.",
                    "밑음을 같은 음으로 두고 자연단음계와 견주면 Dorian​(도리아)은 여섯째 음이 반음 높고, Phrygian​(프리지아)은 둘째 음이 반음 낮습니다. Locrian​(로크리아)은 다섯째 음까지 반음 낮아 P5​(완전5도)가 없습니다."
                ],
                examples: [{ scale: "dorian" }, { scale: "phrygian" }, { scale: "locrian" }],
                read: { drill: "scale", items: ["dorian", "phrygian", "locrian", "nminor"], limit: 12 },
                listen: {
                    drill: "scale",
                    items: ["nminor", "dorian", "phrygian", "locrian"],
                    mode: "mixed",
                    limit: 12
                }
            },
            { kind: "preset", drill: "scale", preset: "modes" },
            {
                id: "whole",
                title: "Whole Tone Scale​(온음음계)",
                body: [
                    "Whole Tone Scale​(온음음계)은 온음만 여섯 번 쌓아 한 옥타브를 채운 음계입니다. 반음이 없어 어느 음이 으뜸음인지 정해지지 않습니다.",
                    "장음계와 견주면 넷째 음부터 어긋나기 시작하고, Lydian​(리디아)과는 넷째 음까지 같습니다."
                ],
                examples: [{ scale: "whole" }, { scale: "lydian" }],
                read: { drill: "scale", items: ["whole", "lydian", "major"], limit: 10 }
            },
            { kind: "preset", drill: "scale", preset: "sym" },
            { kind: "preset", drill: "scale", preset: "dom" }
        ]
    };

    const RHYTHM_COURSE = {
        id: "rhythm",
        name: "Rhythm​(리듬)",
        lessons: [
            {
                id: "values",
                title: "Note Values​(음표의 길이)",
                body: [
                    "4/4 박자는 한 마디를 4분음표 넷으로 세는 박자입니다. 위의 4는 마디마다 세는 박의 수, 아래의 4는 한 박이 4분음표라는 뜻입니다.",
                    "온음표는 네 박, 2분음표는 두 박, 4분음표는 한 박입니다. 음표마다 같은 길이의 쉼표가 있습니다."
                ],
                examples: [
                    { pattern: "w", caption: "Whole Note​(온음표) · 네 박" },
                    { pattern: "h h", caption: "Half Notes​(2분음표) · 두 박씩" },
                    { pattern: "q q q q", caption: "Quarter Notes​(4분음표) · 한 박씩" }
                ],
                read: { drill: "rhythmRead", items: ["t4"], limit: 8 },
                listen: { drill: "rhythmWrite", items: ["g4"], limit: 10 }
            },
            {
                id: "eighths",
                title: "Eighth Notes​(8분음표)",
                body: [
                    "4분음표를 반으로 자르면 8분음표입니다. 한 박에 둘이 들어가고, 대에 꼬리 하나가 붙습니다.",
                    "같은 박 안에 있는 8분음표는 꼬리 대신 대로 이어 적습니다."
                ],
                examples: [
                    { pattern: "e e q q q", caption: "첫째 박이 8분음표 둘" },
                    { pattern: "q e e q q", caption: "둘째 박이 8분음표 둘" },
                    { pattern: "e e e e q q", caption: "8분음표가 두 박" }
                ],
                read: { drill: "rhythmRead", items: ["t8"], limit: 10 },
                listen: { drill: "rhythmWrite", items: ["g8"], limit: 10 }
            },
            {
                id: "rests",
                title: "Rests​(쉼표)",
                body: [
                    "8분쉼표는 반 박을 쉽니다. 박의 앞을 쉬고 뒤를 치면 소리가 박에서 반 박 밀려 나옵니다.",
                    "쉼표는 치지 않는 자리이므로, 소리로는 그 앞 음표가 길어진 것과 구별되지 않습니다. 악보에서는 다르게 적히지만 귀에 들어오는 자리는 같습니다."
                ],
                examples: [
                    { pattern: "e -e q q q", caption: "박의 앞만 치기" },
                    { pattern: "-e e q q q", caption: "박의 뒤만 치기" },
                    { pattern: "q -q q -q", caption: "한 박씩 쉬기" }
                ],
                read: { drill: "rhythmRead", items: ["t8r"], limit: 10 },
                listen: { drill: "rhythmWrite", items: ["g8r"], limit: 10 }
            },
            {
                id: "syncopation",
                title: "Syncopation​(당김음)",
                body: [
                    "한 박보다 긴 음표는 박을 넘어 이어집니다. 2분음표를 둘째 박에서 시작하면 셋째 박에는 새로 치는 소리가 없습니다.",
                    "센 박이 아닌 자리에서 시작한 소리가 센 박을 넘겨 이어지는 것을 Syncopation​(당김음)이라고 합니다."
                ],
                examples: [
                    { pattern: "q h q", caption: "2분음표가 둘째 박에서 시작" },
                    { pattern: "e q q q e", caption: "반 박 밀린 당김음" },
                    { pattern: "e h qd", caption: "8분음표 뒤로 긴 음표가 이어짐" }
                ],
                read: { drill: "rhythmRead", items: ["ttie"], limit: 10 },
                listen: { drill: "rhythmWrite", items: ["gtie"], limit: 10 }
            },
            {
                id: "dotted",
                title: "Dotted Notes​(점음표)",
                body: [
                    "음표 오른쪽의 점은 그 음표 길이의 반을 더합니다. 점4분음표는 한 박 반, 점2분음표는 세 박입니다.",
                    "점8분음표와 16분음표가 짝을 이루면 한 박이 3 대 1로 나뉩니다."
                ],
                examples: [
                    { pattern: "qd e q q", caption: "점4분음표와 8분음표" },
                    { pattern: "ed s q q q", caption: "점8분음표와 16분음표" },
                    { pattern: "hd q", caption: "점2분음표와 4분음표" }
                ],
                read: { drill: "rhythmRead", items: ["tdot"], limit: 10 },
                listen: { drill: "rhythmWrite", items: ["gdot"], limit: 10 }
            },
            {
                id: "sixteenths",
                title: "Sixteenth Notes​(16분음표)",
                body: [
                    "8분음표를 다시 반으로 자르면 16분음표입니다. 한 박에 넷이 들어가고 꼬리가 둘입니다.",
                    "한 박을 16분음표 넷으로 세면 8분음표는 두 칸, 4분음표는 네 칸을 차지합니다. 한 박 안에서 16분음표와 8분음표를 섞으면 2+1, 1+2 같은 모양이 나옵니다."
                ],
                examples: [
                    { pattern: "s s s s q q q", caption: "16분음표 넷" },
                    { pattern: "s s e q q q", caption: "16분음표 둘 뒤에 8분음표" },
                    { pattern: "e s s q q q", caption: "8분음표 뒤에 16분음표 둘" }
                ],
                read: { drill: "rhythmRead", items: ["t16"], limit: 10 },
                listen: { drill: "rhythmWrite", items: ["g16"], limit: 12 }
            },
            {
                id: "triplets",
                title: "Triplets​(셋잇단음표)",
                body: [
                    "한 박을 셋으로 똑같이 나눈 것이 Triplet​(셋잇단음표)입니다. 8분음표 셋을 대로 묶고 위에 3을 적습니다.",
                    "8분음표 둘은 한 박을 반씩 나누고, 셋잇단음표는 3분의 1씩 나눕니다. 16분음표 넷과는 개수도, 치는 자리도 다릅니다.",
                    "칸으로는 3분의 1 자리를 적을 수 없으므로, 여기서부터는 악보를 골라 답합니다."
                ],
                examples: [
                    { pattern: "te te te q q q", caption: "첫째 박이 셋잇단음표" },
                    { pattern: "te te -te q q q", caption: "셋잇단음표의 셋째 자리를 쉬기" },
                    { pattern: "e e te te te q q", caption: "8분음표 둘과 셋잇단음표를 잇따라" }
                ],
                read: { drill: "rhythmRead", items: ["ttrip"], limit: 10 },
                listen: { drill: "rhythmWrite", items: ["trip"], limit: 12 }
            },
            { kind: "preset", drill: "rhythmWrite", preset: "pick" }
        ]
    };

    window.EarCourses = [INTERVAL_COURSE, CHORD_COURSE, PROGRESSION_COURSE, SCALE_COURSE, RHYTHM_COURSE];
})();
