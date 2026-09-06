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

    window.EarCourses = [INTERVAL_COURSE];
})();
