(function () {
    "use strict";

    /*
     * 음정 과정.
     * kind "text"  — 읽고 소리로 확인하는 차시. examples에 적은 음정을 눌러서 듣는다.
     * kind "drill" — 그 차시까지 배운 음정만 내는 연습.
     */
    const INTERVAL_COURSE = {
        id: "interval",
        name: "음정",
        lessons: [
            {
                id: "perfect",
                kind: "text",
                title: "완전음정",
                body: [
                    "두 음을 함께 울렸을 때 서로 부딪히지 않고 하나처럼 섞이는 음정을 완전음정이라고 합니다. 같은 음인 완전1도, 완전4도, 완전5도, 그리고 위아래 같은 이름인 완전8도 네 가지입니다.",
                    "완전5도를 뒤집으면 완전4도가 되고, 완전4도를 뒤집으면 완전5도가 됩니다. 아래 음을 한 옥타브 올려 보면 확인할 수 있습니다."
                ],
                examples: ["P4", "P5", "P8"]
            },
            {
                id: "perfect-drill",
                kind: "drill",
                title: "완전음정 가려듣기",
                drill: { items: ["P4", "P5", "P8"], mode: "mixed", limit: 10 }
            },
            {
                id: "thirds",
                kind: "text",
                title: "3도",
                body: [
                    "3도는 화음의 밝고 어두움을 정하는 음정입니다. 장3도는 반음 네 개로 밝게 들리고, 단3도는 반음 세 개로 어둡게 들립니다.",
                    "장3화음과 단3화음을 가르는 것도 맨 아래 두 음이 장3도인지 단3도인지 하나입니다. 3도를 확실히 익혀 두면 화음 차시가 쉬워집니다."
                ],
                examples: ["m3", "M3"]
            },
            {
                id: "thirds-drill",
                kind: "drill",
                title: "3도 가려듣기",
                drill: { items: ["m3", "M3"], mode: "mixed", limit: 10 }
            },
            {
                id: "perfect-thirds-drill",
                kind: "drill",
                title: "완전음정과 3도 섞어 듣기",
                drill: { items: ["m3", "M3", "P4", "P5", "P8"], mode: "mixed", limit: 15 }
            },
            {
                id: "seconds",
                kind: "text",
                title: "2도",
                body: [
                    "2도는 가장 좁은 음정입니다. 단2도는 반음 하나로, 함께 울리면 서로 부딪혀 긁히는 소리가 납니다. 장2도는 반음 두 개로, 장음계에서 한 계단 올라가는 소리입니다.",
                    "좁은 음정은 함께 울릴 때와 차례로 울릴 때가 아주 다르게 들립니다. 두 방법을 모두 들어 보세요."
                ],
                examples: ["m2", "M2"]
            },
            {
                id: "seconds-drill",
                kind: "drill",
                title: "2도 가려듣기",
                drill: { items: ["m2", "M2"], mode: "mixed", limit: 10 }
            },
            {
                id: "narrow-drill",
                kind: "drill",
                title: "여기까지 모아 듣기",
                drill: { items: ["m2", "M2", "m3", "M3", "P4", "P5", "P8"], mode: "mixed", limit: 15 }
            },
            {
                id: "sixths",
                kind: "text",
                title: "6도",
                body: [
                    "장6도는 단3도를 뒤집은 음정이고, 단6도는 장3도를 뒤집은 음정입니다. 아래 음을 한 옥타브 올려 3도로 바꿔 생각하면 알아맞히기 쉬워집니다.",
                    "3도처럼 6도도 부드럽게 어울리는 소리입니다. 3화음을 뒤집었을 때 바깥 두 음이 6도가 되므로 화음 차시에서 다시 만납니다."
                ],
                examples: ["m6", "M6"]
            },
            {
                id: "sixths-drill",
                kind: "drill",
                title: "6도 가려듣기",
                drill: { items: ["m6", "M6"], mode: "mixed", limit: 10 }
            },
            {
                id: "sevenths",
                kind: "text",
                title: "7도",
                body: [
                    "7도는 옥타브에서 반음 하나 또는 두 개가 모자란 음정입니다. 장7도는 옥타브에서 반음 하나 모자라 아슬아슬하게 들리고, 단7도는 반음 두 개가 모자라 7화음에서 자주 만나는 소리입니다.",
                    "장7도는 단2도를, 단7도는 장2도를 뒤집은 음정입니다. 좁은 음정으로 바꿔 생각하면 훨씬 잡기 쉽습니다."
                ],
                examples: ["m7", "M7"]
            },
            {
                id: "sevenths-drill",
                kind: "drill",
                title: "7도 가려듣기",
                drill: { items: ["m7", "M7"], mode: "mixed", limit: 10 }
            },
            {
                id: "quality-chain",
                kind: "text",
                title: "음정의 성질이 바뀌는 차례",
                body: [
                    "음정 이름은 도수와 성질 두 가지로 됩니다. 도수는 음이름을 세어 정하고, 성질은 그 사이 반음 수로 정합니다.",
                    "1·4·5·8도는 완전 계열입니다. 완전에서 반음을 좁히면 감, 넓히면 증이 됩니다. 2·3·6·7도는 장·단 계열입니다. 장에서 반음을 좁히면 단, 단에서 더 좁히면 감, 장에서 넓히면 증이 됩니다.",
                    "완전 계열에는 장·단이 없고, 장·단 계열에는 완전이 없습니다. 이 사슬만 외우면 이름이 흔들리지 않습니다."
                ],
                diagram: "quality-chain",
                examples: ["P5", "A4"]
            },
            {
                id: "tritone",
                kind: "text",
                title: "증4도",
                body: [
                    "반음 여섯 개짜리 음정은 한 옥타브를 정확히 반으로 자릅니다. 완전4도보다 반음 넓어 증4도라 하고, 완전5도보다 반음 좁게 적으면 감5도가 됩니다. 소리는 같지만 적는 방법이 다릅니다.",
                    "가장 불안하게 들리는 음정이라 한 번 익히면 다른 음정과 헷갈리지 않습니다. 완전4도, 완전5도와 나란히 들어 보세요."
                ],
                examples: ["P4", "A4", "P5"]
            },
            {
                id: "tritone-drill",
                kind: "drill",
                title: "완전4도·증4도·완전5도 가려듣기",
                drill: { items: ["P4", "A4", "P5"], mode: "mixed", limit: 10 }
            },
            {
                id: "all-simple-drill",
                kind: "drill",
                title: "한 옥타브 안 음정 전부",
                drill: {
                    items: ["m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8"],
                    mode: "mixed",
                    limit: 20
                }
            },
            {
                id: "compound",
                kind: "text",
                title: "겹음정",
                body: [
                    "한 옥타브보다 넓은 음정을 겹음정이라고 합니다. 한 옥타브를 덜어 내면 아는 음정이 나옵니다. 단9도는 단2도, 장10도는 장3도와 성질이 같습니다.",
                    "그래서 겹음정은 두 음 가운데 하나를 머릿속에서 한 옥타브 옮겨 좁은 음정으로 바꿔 듣습니다. 반음 수는 열두 개씩 커집니다."
                ],
                examples: ["m9", "M9", "m10", "M10", "P11", "P12"]
            },
            {
                id: "compound-drill",
                kind: "drill",
                title: "겹음정 가려듣기",
                drill: { items: ["m9", "M9", "m10", "M10", "P11", "A11", "P12"], mode: "mixed", limit: 15 }
            }
        ]
    };


    const CHORD_COURSE = {
        id: "chord",
        name: "화음",
        lessons: [
            {
                id: "triads",
                kind: "text",
                title: "3화음",
                body: [
                    "3화음은 음 세 개로 된 가장 기본이 되는 화음입니다. 밑음, 그 위 3도, 다시 그 위 3도로 쌓으면 맨 아래와 맨 위가 5도가 됩니다.",
                    "아래 3도가 장3도인지 단3도인지, 그리고 바깥 5도가 완전5도인지 아닌지에 따라 장·단·감·증 네 가지로 갈립니다. 화음이 통째로 안 들리면 펼쳐 듣기로 한 음씩 확인해 보세요."
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
                title: "장3화음과 단3화음 가리기",
                drill: { drillId: "chord", items: ["maj", "min"], mode: "harmony", limit: 10 }
            },
            {
                id: "triads-drill",
                kind: "drill",
                title: "3화음 네 가지 가려듣기",
                drill: { drillId: "chord", items: ["maj", "min", "dim", "aug"], mode: "mixed", limit: 15 }
            },
            {
                id: "inversions",
                kind: "text",
                title: "화음 자리바꿈",
                body: [
                    "실제 음악에서는 밑음이 맨 아래 있는 근음 자리만 쓰지 않습니다. 맨 아래 음을 한 옥타브 올리면 첫째 자리바꿈, 아래 두 음을 올리면 둘째 자리바꿈이 됩니다.",
                    "첫째 자리바꿈은 바깥 두 음이 6도가 되고, 둘째 자리바꿈은 아래 두 음이 완전4도가 됩니다. 이 두 소리를 먼저 익히면 자리를 가릴 수 있습니다.",
                    "증3화음은 자리를 바꿔도 쌓인 모양이 그대로여서 귀로는 가릴 수 없습니다. 그래서 자리 문제에는 넣지 않습니다."
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
                title: "화음 자리 가려듣기",
                drill: { drillId: "position", items: ["root", "first", "second"], mode: "harmony", limit: 15 }
            },
            {
                id: "triads-inv-drill",
                kind: "drill",
                title: "자리바꿈까지 섞은 3화음",
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
                title: "속7화음과 장7화음",
                body: [
                    "3화음 위에 3도를 하나 더 쌓으면 7화음이 됩니다. 장3화음 위에 단3도를 얹으면 속7화음, 장3도를 얹으면 장7화음입니다.",
                    "속7화음은 어딘가로 풀려야 할 것처럼 들리고, 장7화음은 그 자리에 머무는 부드러운 소리입니다. 맨 아래 음과 맨 위 음이 단7도인지 장7도인지를 들으면 갈립니다."
                ],
                examples: [
                    { chord: "dom7" },
                    { chord: "maj7" }
                ]
            },
            {
                id: "dom7-maj7-drill",
                kind: "drill",
                title: "속7화음과 장7화음 가리기",
                drill: { drillId: "chord", items: ["dom7", "maj7"], mode: "mixed", limit: 10 }
            },
            {
                id: "min7-mmaj7",
                kind: "text",
                title: "단7화음과 단장7화음",
                body: [
                    "단3화음 위에 단3도를 얹으면 단7화음, 장3도를 얹으면 단장7화음입니다. 단7화음은 흔하게 쓰이고, 단장7화음은 아래는 어둡고 위는 팽팽한 독특한 소리가 납니다.",
                    "아래 3화음이 장인지 단인지를 먼저 듣고, 그다음 맨 위 7음이 단7도인지 장7도인지를 듣는 순서로 가리면 헷갈리지 않습니다."
                ],
                examples: [
                    { chord: "min7" },
                    { chord: "mmaj7" }
                ]
            },
            {
                id: "min7-mmaj7-drill",
                kind: "drill",
                title: "단7화음과 단장7화음 가리기",
                drill: { drillId: "chord", items: ["min7", "mmaj7"], mode: "mixed", limit: 10 }
            },
            {
                id: "other7",
                kind: "text",
                title: "나머지 7화음",
                body: [
                    "감3화음 위에 단3도를 얹으면 감7화음, 장3도를 얹으면 반감7화음입니다. 감7화음은 단3도만 세 번 쌓여 어디가 밑음인지 알 수 없는 소리가 납니다.",
                    "증3화음 위에 단3도를 얹으면 증장7화음입니다. 셋 다 흔하지는 않지만 소리가 뚜렷해서 한 번 익히면 잘 잊히지 않습니다."
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
                title: "나머지 7화음 가려듣기",
                drill: { drillId: "chord", items: ["m7b5", "dim7", "maj7s5"], mode: "mixed", limit: 12 }
            },
            {
                id: "all7-drill",
                kind: "drill",
                title: "7화음 일곱 가지 전부",
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
