(function () {
    "use strict";

    /*
     * 음정 과정.
     * kind "text"  — 읽고 소리로 확인하는 차시. examples에 적은 음정을 눌러서 듣는다.
     * kind "drill" — 그 차시까지 배운 음정만 내는 연습.
     */
    const INTERVAL_COURSE = {
        id: "interval",
        name: "Intervals​(음정)",
        lessons: [
            {
                id: "perfect",
                kind: "text",
                title: "Perfect Intervals​(완전음정)",
                body: [
                    "두 음을 함께 울렸을 때 서로 부딪히지 않고 하나처럼 섞이는 음정을 Perfect Interval​(완전음정)이라고 합니다. 같은 음인 P1​(완전1도), P4​(완전4도), P5​(완전5도), 그리고 위아래 같은 이름인 P8​(완전8도) 네 가지입니다.",
                    "P5​(완전5도)를 뒤집으면 P4​(완전4도)가 되고, P4​(완전4도)를 뒤집으면 P5​(완전5도)가 됩니다. 이것을 Inversion​(자리바꿈)이라고 하며, 아래 음을 한 옥타브 올려 만듭니다."
                ],
                examples: ["P4", "P5", "P8"],
                quiz: ["P4", "P5", "P8"]
            },
            {
                id: "perfect-drill",
                kind: "drill",
                title: "Perfect Intervals​(완전음정) 듣기",
                drill: { items: ["P4", "P5", "P8"], mode: "mixed", limit: 10 }
            },
            {
                id: "thirds",
                kind: "text",
                title: "Thirds​(3도)",
                body: [
                    "Third​(3도)는 화음의 밝고 어두움을 정하는 음정입니다. M3​(장3도)는 반음 네 개로 밝게 들리고, m3​(단3도)는 반음 세 개로 어둡게 들립니다.",
                    "Major Triad​(장3화음)과 Minor Triad​(단3화음)을 가르는 것도 맨 아래 두 음이 M3​(장3도)인지 m3​(단3도)인지 하나입니다."
                ],
                examples: ["m3", "M3"],
                quiz: ["m3", "M3"]
            },
            {
                id: "thirds-drill",
                kind: "drill",
                title: "Thirds​(3도) 듣기",
                drill: { items: ["m3", "M3"], mode: "mixed", limit: 10 }
            },
            {
                id: "perfect-thirds-drill",
                kind: "drill",
                title: "Perfect​(완전음정)과 Thirds​(3도) 섞어 듣기",
                drill: { items: ["m3", "M3", "P4", "P5", "P8"], mode: "mixed", limit: 15 }
            },
            {
                id: "seconds",
                kind: "text",
                title: "Seconds​(2도)",
                body: [
                    "Second​(2도)는 가장 좁은 음정입니다. m2​(단2도)는 반음 하나로, 함께 울리면 서로 부딪혀 긁히는 소리가 납니다. M2​(장2도)는 반음 두 개로, Major Scale​(장음계)에서 한 계단 올라가는 소리입니다.",
                    "좁은 음정은 Harmonic​(화성)으로 함께 울릴 때와 Melodic​(선율)으로 차례로 울릴 때가 아주 다르게 들립니다."
                ],
                examples: ["m2", "M2"],
                quiz: ["m2", "M2"]
            },
            {
                id: "seconds-drill",
                kind: "drill",
                title: "Seconds​(2도) 듣기",
                drill: { items: ["m2", "M2"], mode: "mixed", limit: 10 }
            },
            {
                id: "narrow-drill",
                kind: "drill",
                title: "여기까지 듣기",
                drill: { items: ["m2", "M2", "m3", "M3", "P4", "P5", "P8"], mode: "mixed", limit: 15 }
            },
            {
                id: "sixths",
                kind: "text",
                title: "Sixths​(6도)",
                body: [
                    "M6​(장6도)는 m3​(단3도)를 뒤집은 음정이고, m6​(단6도)는 M3​(장3도)를 뒤집은 음정입니다. 아래 음을 한 옥타브 올리면 Third​(3도)가 됩니다.",
                    "Triad​(3화음)을 뒤집으면 바깥 두 음이 Sixth​(6도)가 됩니다."
                ],
                examples: ["m6", "M6"],
                quiz: ["m6", "M6"]
            },
            {
                id: "sixths-drill",
                kind: "drill",
                title: "Sixths​(6도) 듣기",
                drill: { items: ["m6", "M6"], mode: "mixed", limit: 10 }
            },
            {
                id: "sevenths",
                kind: "text",
                title: "Sevenths​(7도)",
                body: [
                    "Seventh​(7도)는 Octave​(옥타브)에서 반음 하나 또는 두 개가 모자란 음정입니다. M7​(장7도)는 반음 하나 모자라 아슬아슬하게 들리고, m7​(단7도)는 반음 두 개가 모자라 7th Chord​(7화음)에서 자주 만나는 소리입니다.",
                    "M7​(장7도)는 m2​(단2도)를, m7​(단7도)는 M2​(장2도)를 뒤집은 음정입니다."
                ],
                examples: ["m7", "M7"],
                quiz: ["m7", "M7"]
            },
            {
                id: "sevenths-drill",
                kind: "drill",
                title: "Sevenths​(7도) 듣기",
                drill: { items: ["m7", "M7"], mode: "mixed", limit: 10 }
            },
            {
                id: "quality-chain",
                kind: "text",
                title: "Interval Quality​(음정의 성질)",
                body: [
                    "음정 이름은 Number​(도수)와 Quality​(성질) 두 가지로 됩니다. 도수는 음이름을 세어 정하고, 성질은 그 사이 반음 수로 정합니다.",
                    "1·4·5·8도는 Perfect​(완전) 계열입니다. 완전에서 반음을 좁히면 Diminished​(감), 넓히면 Augmented​(증)이 됩니다. 2·3·6·7도는 Major​(장)·Minor​(단) 계열입니다. 장에서 반음을 좁히면 단, 단에서 더 좁히면 감, 장에서 넓히면 증이 됩니다.",
                    "완전 계열에는 장·단이 없고, 장·단 계열에는 완전이 없습니다."
                ],
                diagram: "quality-chain",
                examples: ["P5", "A4"],
                quiz: ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"]
            },
            {
                id: "tritone",
                kind: "text",
                title: "Tritone​(증4도)",
                body: [
                    "반음 여섯 개짜리 음정은 한 옥타브를 정확히 반으로 잘라 Tritone​(삼온음)이라고 부릅니다. P4​(완전4도)보다 반음 넓게 적으면 A4​(증4도), P5​(완전5도)보다 반음 좁게 적으면 d5​(감5도)가 됩니다. 소리는 같지만 적는 방법이 다르며, 이것을 Enharmonic​(이명동음)이라고 합니다.",
                    "한 옥타브 안에서 가장 불안하게 들리는 음정입니다."
                ],
                examples: ["P4", "A4", "d5", "P5"],
                quiz: ["P4", "A4", "d5", "P5"]
            },
            {
                id: "tritone-drill",
                kind: "drill",
                title: "P4·A4·P5 듣기",
                drill: { items: ["P4", "A4", "P5"], mode: "mixed", limit: 10 }
            },
            {
                id: "all-simple-drill",
                kind: "drill",
                title: "Simple Intervals​(한 옥타브 안 음정) 듣기",
                drill: {
                    items: ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"],
                    mode: "mixed",
                    limit: 20
                }
            },
            {
                id: "compound",
                kind: "text",
                title: "Compound Intervals​(겹음정)",
                body: [
                    "한 옥타브보다 넓은 음정을 Compound Interval​(겹음정)이라고 합니다. 한 옥타브를 덜어 내면 Simple Interval​(홑음정)이 나옵니다. m9​(단9도)는 m2​(단2도), M10​(장10도)은 M3​(장3도)과 성질이 같습니다.",
                    "그래서 겹음정은 두 음 가운데 하나를 머릿속에서 한 옥타브 옮겨 좁은 음정으로 바꿔 듣습니다. 반음 수는 열두 개씩 커집니다."
                ],
                examples: ["m9", "M9", "m10", "M10", "P11", "P12"],
                quiz: ["m9", "M9", "m10", "M10", "P11", "A11", "P12"]
            },
            {
                id: "compound-drill",
                kind: "drill",
                title: "Compound Intervals​(겹음정) 듣기",
                drill: { items: ["m9", "M9", "m10", "M10", "P11", "A11", "P12"], mode: "mixed", limit: 15 }
            }
        ]
    };


    const CHORD_COURSE = {
        id: "chord",
        name: "Chords​(화음)",
        lessons: [
            {
                id: "triads",
                kind: "text",
                title: "Triads​(3화음)",
                body: [
                    "Triad​(3화음)은 음 세 개로 된 화음입니다. Root​(밑음), 그 위 Third​(3도), 다시 그 위 3도로 쌓으면 맨 아래와 맨 위가 Fifth​(5도)가 됩니다.",
                    "아래 3도가 M3​(장3도)인지 m3​(단3도)인지, 그리고 바깥 5도가 P5​(완전5도)인지 아닌지에 따라 maj​(장)·min​(단)·dim​(감)·aug​(증) 네 가지로 갈립니다."
                ],
                examples: [
                    { chord: "maj" },
                    { chord: "min" },
                    { chord: "dim" },
                    { chord: "aug" }
                ]
            },
            {
                id: "major-minor-drill",
                kind: "drill",
                title: "maj·min 듣기",
                drill: { drillId: "chord", items: ["maj", "min"], mode: "harmony", limit: 10 }
            },
            {
                id: "triads-drill",
                kind: "drill",
                title: "Triads​(3화음) 듣기",
                drill: { drillId: "chord", items: ["maj", "min", "dim", "aug"], mode: "mixed", limit: 15 }
            },
            {
                id: "inversions",
                kind: "text",
                title: "Chord Inversions​(화음 자리바꿈)",
                body: [
                    "실제 음악에서는 밑음이 맨 아래 있는 Root Position​(근음 자리)만 쓰지 않습니다. 맨 아래 음을 한 옥타브 올리면 1st Inversion​(첫째 자리바꿈), 아래 두 음을 올리면 2nd Inversion​(둘째 자리바꿈)이 됩니다.",
                    "첫째 자리바꿈은 바깥 두 음이 Sixth​(6도)가 되고, 둘째 자리바꿈은 아래 두 음이 P4​(완전4도)가 됩니다.",
                    "Augmented Triad​(증3화음)은 자리를 바꿔도 쌓인 모양이 그대로여서 귀로는 구별할 수 없습니다. 그래서 자리 문제에는 넣지 않습니다."
                ],
                examples: [
                    { chord: "maj", inversion: 0 },
                    { chord: "maj", inversion: 1 },
                    { chord: "maj", inversion: 2 },
                    { chord: "min", inversion: 1 },
                    { chord: "min", inversion: 2 }
                ]
            },
            {
                id: "position-drill",
                kind: "drill",
                title: "Chord Inversions​(화음 자리) 듣기",
                drill: { drillId: "position", items: ["root", "first", "second"], mode: "harmony", limit: 15 }
            },
            {
                id: "triads-inv-drill",
                kind: "drill",
                title: "자리바꿈까지 섞어 듣기",
                drill: {
                    drillId: "chord",
                    items: ["maj", "min", "dim", "aug"],
                    mode: "mixed",
                    inversions: [0, 1, 2],
                    limit: 15
                }
            },
            {
                id: "dom7-maj7",
                kind: "text",
                title: "dom7​(속7화음)과 maj7​(장7화음)",
                body: [
                    "3화음 위에 3도를 하나 더 쌓으면 7th Chord​(7화음)이 됩니다. Major Triad​(장3화음) 위에 m3​(단3도)를 얹으면 Dominant 7th​(속7화음), M3​(장3도)를 얹으면 Major 7th​(장7화음)입니다.",
                    "속7화음은 어딘가로 풀려야 할 것처럼 들리고, 장7화음은 그 자리에 머무는 부드러운 소리입니다. 맨 아래 음과 맨 위 음이 m7​(단7도)인지 M7​(장7도)인지를 들으면 갈립니다."
                ],
                examples: [
                    { chord: "dom7" },
                    { chord: "maj7" }
                ]
            },
            {
                id: "dom7-maj7-drill",
                kind: "drill",
                title: "dom7·maj7 듣기",
                drill: { drillId: "chord", items: ["dom7", "maj7"], mode: "mixed", limit: 10 }
            },
            {
                id: "min7-mmaj7",
                kind: "text",
                title: "m7​(단7화음)과 mMaj7​(단장7화음)",
                body: [
                    "Minor Triad​(단3화음) 위에 m3​(단3도)를 얹으면 Minor 7th​(단7화음), M3​(장3도)를 얹으면 Minor Major 7th​(단장7화음)입니다. 단7화음은 흔하게 쓰이고, 단장7화음은 아래는 어둡고 위는 팽팽한 소리가 납니다.",
                    "아래 3화음이 장인지 단인지를 먼저 듣고, 그다음 맨 위 7음이 m7​(단7도)인지 M7​(장7도)인지를 듣습니다."
                ],
                examples: [
                    { chord: "min7" },
                    { chord: "mmaj7" }
                ]
            },
            {
                id: "min7-mmaj7-drill",
                kind: "drill",
                title: "m7·mMaj7 듣기",
                drill: { drillId: "chord", items: ["min7", "mmaj7"], mode: "mixed", limit: 10 }
            },
            {
                id: "other7",
                kind: "text",
                title: "Other 7th Chords​(나머지 7화음)",
                body: [
                    "Diminished Triad​(감3화음) 위에 m3​(단3도)를 얹으면 Diminished 7th​(감7화음), M3​(장3도)를 얹으면 Half-diminished 7th​(반감7화음)입니다. 감7화음은 단3도만 세 번 쌓여 어디가 밑음인지 알 수 없는 소리가 납니다.",
                    "Augmented Triad​(증3화음) 위에 M3​(장3도)를 얹으면 Augmented Major 7th​(증장7화음)입니다. 셋 다 자주 쓰이지는 않습니다."
                ],
                examples: [
                    { chord: "m7b5" },
                    { chord: "dim7" },
                    { chord: "maj7s5" }
                ]
            },
            {
                id: "other7-drill",
                kind: "drill",
                title: "Other 7th Chords​(나머지 7화음) 듣기",
                drill: { drillId: "chord", items: ["m7b5", "dim7", "maj7s5"], mode: "mixed", limit: 12 }
            },
            {
                id: "all7-drill",
                kind: "drill",
                title: "7th Chords​(7화음) 듣기",
                drill: {
                    drillId: "chord",
                    items: ["dom7", "maj7", "min7", "mmaj7", "m7b5", "dim7", "maj7s5"],
                    mode: "mixed",
                    limit: 20
                }
            }
        ]
    };

    window.EarCourses = [INTERVAL_COURSE, CHORD_COURSE];
})();
