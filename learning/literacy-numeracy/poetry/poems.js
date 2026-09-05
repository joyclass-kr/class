(() => {
    "use strict";

    // 시 본문 창고.
    // rights: "public"    = 사이트에 본문을 그대로 실을 수 있는 시
    //         "protected" = 아직 보호 기간 안이라 제목과 안내만 두는 시(lines를 두지 않는다)
    // basis:  왜 실을 수 있는지 — "expired"(사후 70년 지남) | "oral"(구전) | "own-translation"(직접 옮김)
    // tools/poetry-rights-check.mjs 가 이 두 칸을 검사한다.
    const poem = (data) => Object.freeze({ ...data, lines: Object.freeze(data.lines || []) });

    window.POETRY_POEMS = Object.freeze([
        poem({
            id: "jiyong-hosu",
            title: "호수",
            poet: "정지용",
            poetDied: 1950,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["그리움"],
            lines: [
                "얼굴 하나야",
                "손바닥 둘로",
                "폭 가리지만,",
                "",
                "보고 싶은 마음",
                "호수만 하니",
                "눈 감을밖에."
            ],
            words: [
                { word: "폭", mean: "빈틈없이 아주" },
                { word: "감을밖에", mean: "감는 수밖에 없다는 뜻" }
            ],
            point: "짧은 일곱 줄에 장면 하나와 마음 하나가 다 들어 있어요."
        }),
        poem({
            id: "jiyong-byeoltong",
            title: "별똥",
            poet: "정지용",
            poetDied: 1950,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["밤과 달"],
            lines: [
                "별똥 떨어진 곳,",
                "",
                "마음해 두었다",
                "다음날 가보려,",
                "",
                "벼르다 벼르다",
                "인젠 다 자랐소."
            ],
            words: [
                { word: "마음해 두다", mean: "마음속으로 정해 두다" },
                { word: "벼르다", mean: "하려고 마음먹고 기다리다" },
                { word: "인젠", mean: "이제는" }
            ],
            point: "짧은 시 한 편에 어린 날부터 다 자랄 때까지가 담겼어요."
        }),
        poem({
            id: "jiyong-hongsi",
            title: "홍시",
            poet: "정지용",
            poetDied: 1950,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["가을", "가족"],
            lines: [
                "어저께도 홍시 하나.",
                "오늘에도 홍시 하나.",
                "",
                "까마귀야. 까마귀야.",
                "우리 남게 왜 앉었나.",
                "",
                "우리 오빠 오시걸랑.",
                "맛뵐라구 남겨 뒀다.",
                "",
                "후락 딱 딱",
                "훠이 훠이!"
            ],
            words: [
                { word: "남게", mean: "나무에" },
                { word: "오시걸랑", mean: "오시거든" },
                { word: "맛뵐라구", mean: "맛보게 하려고" },
                { word: "훠이 훠이", mean: "새를 쫓을 때 내는 소리" }
            ],
            point: "감나무 아래 한 장면에 기다리는 마음과 쫓는 소리가 함께 있어요."
        }),
        poem({
            id: "taeeung-gamjakkot",
            title: "감자꽃",
            poet: "권태응",
            poetDied: 1951,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["여름"],
            lines: [
                "자주 꽃 핀 건",
                "자주 감자,",
                "파 보나 마나",
                "자주 감자.",
                "",
                "하얀 꽃 핀 건",
                "하얀 감자,",
                "파 보나 마나",
                "하얀 감자."
            ],
            words: [
                { word: "자주", mean: "짙은 보랏빛" },
                { word: "파 보나 마나", mean: "파 보지 않아도 뻔하다는 뜻" }
            ],
            point: "같은 짜임을 두 번 되풀이해서 규칙 하나를 못 박아요."
        }),
        poem({
            id: "sowol-eommaya",
            title: "엄마야 누나야",
            poet: "김소월",
            poetDied: 1934,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["가족"],
            lines: [
                "엄마야 누나야 강변 살자,",
                "뜰에는 반짝이는 금모랫빛,",
                "뒷문 밖에는 갈잎의 노래",
                "엄마야 누나야 강변 살자."
            ],
            words: [
                { word: "금모랫빛", mean: "금빛으로 반짝이는 모래 빛깔" },
                { word: "갈잎", mean: "갈대의 잎" }
            ],
            point: "첫 줄과 마지막 줄이 똑같아서 바라는 마음이 더 또렷해져요."
        }),
        poem({
            id: "sowol-geumjandi",
            title: "금잔디",
            poet: "김소월",
            poetDied: 1934,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["봄"],
            lines: [
                "잔디,",
                "잔디,",
                "금잔디,",
                "심심산천에 붙는 불은",
                "가신 임 무덤 가에 금잔디.",
                "봄이 왔네, 봄빛이 왔네.",
                "버드나무 끝에도 실가지에.",
                "봄빛이 왔네, 봄날이 왔네.",
                "심심산천에도 금잔디에."
            ],
            words: [
                { word: "심심산천", mean: "아주 깊은 산과 내" },
                { word: "실가지", mean: "실처럼 가느다란 나뭇가지" }
            ],
            point: "한 낱말을 거듭하며 시작하고, 비슷한 줄을 짝지어 되풀이해요."
        }),
        poem({
            id: "deokchul-bompyeonji",
            title: "봄편지",
            poet: "서덕출",
            poetDied: 1940,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["봄"],
            lines: [
                "연못가에 새로 핀",
                "버들잎을 따서요",
                "우표 한 장 붙여서",
                "강남으로 보내면",
                "",
                "작년에 간 제비가",
                "푸른 편지 보고요",
                "조선 봄이 그리워",
                "다시 찾아옵니다"
            ],
            words: [
                { word: "강남", mean: "제비가 겨울을 나러 가는 먼 남쪽 나라" }
            ],
            point: "소식을 물건 하나에 담아 보내는 생각이 시 전체를 이끌어요."
        }),
        poem({
            id: "dongju-haetbi",
            title: "햇비",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["여름"],
            lines: [
                "아씨처럼 나린다",
                "보슬보슬 햇비",
                "맞아 주자 다 같이",
                "옥수숫대처럼 크게",
                "닷 자 엿 자 자라게",
                "햇님이 웃는다",
                "나 보고 웃는다",
                "",
                "하늘 다리 놓였다",
                "알롱알롱 무지개",
                "노래하자 즐겁게",
                "동무들아 이리 오나",
                "다 같이 춤을 추자",
                "햇님이 웃는다",
                "즐거워 웃는다"
            ],
            words: [
                { word: "햇비", mean: "해가 난 채로 내리는 비" },
                { word: "닷 자 엿 자", mean: "다섯 자 여섯 자. 키를 재던 옛 단위" },
                { word: "동무", mean: "친구" }
            ],
            point: "흉내내는 말이 줄마다 놓여서 소리 내어 읽으면 더 신이 나요."
        }),
        poem({
            id: "dongju-chamsae",
            title: "참새",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["동물", "가을"],
            lines: [
                "가을 지난 마당은 하이얀 종이",
                "참새들이 글씨를 공부하지요.",
                "",
                "째액째액 입으로 받아 읽으며",
                "두 발로는 글씨를 연습하지요.",
                "",
                "하루 종일 글씨를 공부하여도",
                "짹 자 한 자밖에는 더 못 쓰는걸."
            ],
            words: [
                { word: "하이얀", mean: "하얀" }
            ],
            point: "참새 소리가 그대로 참새가 쓰는 글자가 되는 재미난 생각이에요."
        }),
        poem({
            id: "dongju-nun",
            title: "눈",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["겨울"],
            lines: [
                "지난밤에",
                "눈이 소오복이 왔네",
                "",
                "지붕이랑",
                "길이랑 밭이랑",
                "추워한다고",
                "덮어 주는 이불인가 봐",
                "",
                "그러기에",
                "추운 겨울에만 내리지"
            ],
            words: [
                { word: "소오복이", mean: "소복이. 도톰하게 쌓인 모양" },
                { word: "그러기에", mean: "그러니까" }
            ],
            point: "'인가 봐'라는 짐작으로 시를 맺어요. 답을 못 박지 않아 더 정답게 느껴져요."
        }),
        poem({
            id: "dongju-banditbul",
            title: "반딧불",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 3,
            topics: ["밤과 달", "여름"],
            lines: [
                "가자 가자 가자",
                "숲으로 가자",
                "달 조각을 주우러",
                "숲으로 가자.",
                "",
                "그믐밤 반딧불은",
                "부서진 달 조각,",
                "",
                "가자 가자 가자",
                "숲으로 가자",
                "달 조각을 주우러",
                "숲으로 가자."
            ],
            words: [
                { word: "그믐밤", mean: "달이 보이지 않는 캄캄한 밤" }
            ],
            point: "처음과 끝을 똑같은 묶음으로 감싸서 노래처럼 들려요."
        }),
        poem({
            id: "folk-saeya",
            title: "새야 새야 파랑새야",
            poet: "전래동요",
            poetDied: null,
            rights: "public",
            basis: "oral",
            grade: 3,
            topics: ["동물"],
            lines: [
                "새야 새야 파랑새야",
                "녹두밭에 앉지 마라",
                "녹두꽃이 떨어지면",
                "청포 장수 울고 간다"
            ],
            words: [
                { word: "녹두", mean: "작고 푸른 곡식. 청포묵을 쑤는 데 쓴다" },
                { word: "청포 장수", mean: "녹두로 쑨 묵을 파는 사람" }
            ],
            point: "새를 부르며 부탁하는 노래예요. 부름말이 첫 줄을 이끌어요."
        }),
        poem({
            id: "folk-dara",
            title: "달아 달아 밝은 달아",
            poet: "전래동요",
            poetDied: null,
            rights: "public",
            basis: "oral",
            grade: 3,
            topics: ["밤과 달", "가족"],
            lines: [
                "달아 달아 밝은 달아",
                "이태백이 놀던 달아",
                "저기 저기 저 달 속에",
                "계수나무 박혔으니",
                "옥도끼로 찍어 내어",
                "금도끼로 다듬어서",
                "초가삼간 집을 짓고",
                "양친 부모 모셔다가",
                "천년만년 살고지고"
            ],
            words: [
                { word: "이태백", mean: "달을 즐겨 노래한 옛 시인 이백" },
                { word: "초가삼간", mean: "방 세 칸짜리 작은 초가집" },
                { word: "양친 부모", mean: "아버지와 어머니" },
                { word: "살고지고", mean: "살고 싶구나" }
            ],
            point: "달을 부르는 것으로 시작해 바라는 일을 차례차례 늘어놓아요."
        }),
        poem({
            id: "folk-dukkeobi",
            title: "두껍아 두껍아",
            poet: "전래동요",
            poetDied: null,
            rights: "public",
            basis: "oral",
            grade: 3,
            topics: ["동물", "놀이"],
            lines: [
                "두껍아 두껍아",
                "헌 집 줄게",
                "새 집 다오"
            ],
            words: [
                { word: "헌", mean: "낡은" },
                { word: "다오", mean: "달라는 뜻의 옛말" }
            ],
            point: "세 줄뿐인데도 부름과 주고받기가 다 들어 있어요."
        }),
        poem({
            id: "folk-eodikkaji",
            title: "어디까지 왔니",
            poet: "전래동요",
            poetDied: null,
            rights: "public",
            basis: "oral",
            grade: 3,
            topics: ["놀이"],
            lines: [
                "어디까지 왔니",
                "당당 멀었다",
                "",
                "어디까지 왔니",
                "아직도 멀었다",
                "",
                "어디까지 왔니",
                "동네 앞에 왔다",
                "",
                "어디까지 왔니",
                "문 앞에 다 왔다"
            ],
            words: [
                { word: "당당 멀었다", mean: "아직 한참 멀었다고 받아 주는 소리" }
            ],
            point: "묻고 답하기를 번갈아 하면서 거리가 점점 가까워져요."
        }),
        poem({
            id: "rossetti-baram",
            title: "누가 바람을 보았나요",
            poet: "크리스티나 로세티",
            poetDied: 1894,
            rights: "public",
            basis: "own-translation",
            grade: 3,
            topics: ["자연"],
            lines: [
                "누가 바람을 보았나요?",
                "나도 당신도 보지 못했지요.",
                "그렇지만 나뭇잎이 떨며 흔들릴 때",
                "바람은 지나가고 있는 거예요.",
                "",
                "누가 바람을 보았나요?",
                "당신도 나도 보지 못했지요.",
                "그렇지만 나무들이 고개를 숙일 때",
                "바람은 지나가고 있는 거예요."
            ],
            words: [],
            point: "물음으로 시작해 물음으로 다시 시작해요. 보이지 않는 것을 어떻게 아는지 함께 생각하게 해요."
        })
    ]);
})();
