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
        }),

        // ── 초4 ────────────────────────────────────────────────────
        poem({
            id: "stevenson-geurimja",
            title: "나의 그림자",
            poet: "로버트 루이스 스티븐슨",
            poetDied: 1894,
            rights: "public",
            basis: "own-translation",
            grade: 4,
            topics: ["놀이"],
            lines: [
                "나에게는 그림자가 하나 있어요.",
                "내가 가는 곳이면 어디든 따라와요.",
                "무엇에 쓰는 아이인지는 나도 잘 몰라요.",
                "",
                "발끝에서 머리끝까지 나를 꼭 닮았고,",
                "내가 잠자리에 들면 저도 따라 뛰어들어요.",
                "",
                "가장 우스운 것은 자라는 모습이에요.",
                "아이들처럼 천천히 자라지 않고,",
                "고무공처럼 훌쩍 커졌다가",
                "어느새 아주 작아져 보이지도 않아요."
            ],
            words: [],
            point: "'~처럼', '~닮았고' 같은 말로 그림자를 눈에 보이게 그려요."
        }),
        poem({
            id: "stevenson-bi",
            title: "비",
            poet: "로버트 루이스 스티븐슨",
            poetDied: 1894,
            rights: "public",
            basis: "own-translation",
            grade: 4,
            topics: ["자연"],
            lines: [
                "비가 사방에 내려요.",
                "들에도 내리고 나무에도 내려요.",
                "여기 우산들 위에도 내리고,",
                "저기 바다의 배 위에도 내려요."
            ],
            words: [],
            point: "가까운 곳에서 먼 곳으로 눈길을 옮기며 내리는 비를 그려요."
        }),
        poem({
            id: "stevenson-geune",
            title: "그네",
            poet: "로버트 루이스 스티븐슨",
            poetDied: 1894,
            rights: "public",
            basis: "own-translation",
            grade: 4,
            topics: ["놀이"],
            lines: [
                "그네를 타고 하늘로 올라가는 일,",
                "이보다 즐거운 일이 있을까요?",
                "아무리 생각해도 나는 그렇게 믿어요.",
                "아이가 할 수 있는 가장 즐거운 일이라고.",
                "",
                "담장 너머 저 멀리까지",
                "넓은 들판이 한눈에 보여요.",
                "강물도 보이고 소들도 보이고,",
                "온 세상이 발밑에 있어요."
            ],
            words: [],
            point: "몸이 오르내리는 느낌과 눈에 들어오는 풍경을 함께 그려요."
        }),
        poem({
            id: "rossetti-bunhong",
            title: "분홍은 무엇일까요",
            poet: "크리스티나 로세티",
            poetDied: 1894,
            rights: "public",
            basis: "own-translation",
            grade: 4,
            topics: ["자연"],
            lines: [
                "분홍은 무엇일까요? 장미가 분홍이에요.",
                "샘가에 피어 있는 장미가 분홍이에요.",
                "빨강은 무엇일까요? 양귀비꽃이 빨강이에요.",
                "밀밭 사이에 서 있는 양귀비꽃이 빨강이에요.",
                "",
                "파랑은 무엇일까요? 하늘이 파랑이에요.",
                "구름이 지나가는 하늘이 파랑이에요.",
                "하양은 무엇일까요? 백조가 하양이에요.",
                "햇빛 아래 떠 가는 백조가 하양이에요.",
                "",
                "노랑은 무엇일까요? 배와 참외가 노랑이에요.",
                "둘 다 잘 익어서 노랑이에요.",
                "초록은 무엇일까요? 풀밭이 초록이에요.",
                "작은 꽃들이 사이사이 섞여 있어요.",
                "",
                "보라는 무엇일까요? 저녁 구름이 보라예요.",
                "해가 질 무렵 구름이 보라예요.",
                "주황은 무엇일까요? 그야 오렌지가 주황이지요.",
                "오렌지는 그냥 오렌지 빛이에요."
            ],
            words: [
                { word: "양귀비꽃", mean: "빨간 꽃잎이 큰 꽃" }
            ],
            point: "빛깔마다 묻고 답하기를 되풀이하면서 눈으로 보는 것만으로 시 한 편을 채워요."
        }),
        poem({
            id: "leejanghee-bomeun",
            title: "봄은 고양이로다",
            poet: "이장희",
            poetDied: 1929,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["봄", "동물"],
            lines: [
                "꽃가루와 같이 부드러운 고양이의 털에",
                "고운 봄의 향기가 어리우도다",
                "",
                "금방울과 같이 호동그란 고양이의 눈에",
                "미친 봄의 불길이 흐르도다",
                "",
                "고요히 다물은 고양이의 입술에",
                "포근한 봄 졸음이 떠돌아라",
                "",
                "날카롭게 쭉 뻗은 고양이의 수염에",
                "푸른 봄의 생기가 뛰놀아라"
            ],
            words: [
                { word: "어리우도다", mean: "서리어 있구나" },
                { word: "호동그란", mean: "동그랗게 크게 뜬" },
                { word: "생기", mean: "살아 있는 기운" }
            ],
            point: "고양이의 털·눈·입술·수염을 봄의 네 가지에 하나씩 견주어 놓았어요."
        }),
        poem({
            id: "dongju-bom",
            title: "봄",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["봄", "가족"],
            lines: [
                "우리 애기는",
                "아래 발치에서 코올코올,",
                "",
                "고양이는",
                "부뚜막에서 가릉가릉,",
                "",
                "애기 바람이",
                "나뭇가지에서 소올소올,",
                "",
                "아저씨 해님이",
                "하늘 한가운데서 째앵째앵."
            ],
            words: [
                { word: "발치", mean: "누웠을 때 발이 놓이는 쪽" },
                { word: "부뚜막", mean: "아궁이 위 솥을 거는 자리" }
            ],
            point: "바람은 애기가 되고 해님은 아저씨가 돼요. 온 봄이 한 식구처럼 늘어앉아요."
        }),
        poem({
            id: "dongju-jogaekkeopjil",
            title: "조개껍질",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["그리움", "가족"],
            lines: [
                "아롱아롱 조개껍데기",
                "울 언니 바닷가에서",
                "주워 온 조개껍데기",
                "",
                "여긴 여긴 북쪽 나라요",
                "조개는 귀여운 선물",
                "장난감 조개껍데기",
                "",
                "데굴데굴 굴리며 놀다",
                "짝 잃은 조개껍데기",
                "한 짝을 그리워하네",
                "",
                "아롱아롱 조개껍데기",
                "나처럼 그리워하네",
                "물소리 바닷물 소리"
            ],
            words: [
                { word: "아롱아롱", mean: "여러 빛깔 무늬가 어른거리는 모양" }
            ],
            point: "조개껍데기가 짝을 그리워하고, 말하는 이도 바다를 그리워해요."
        }),
        poem({
            id: "dongju-gulttuk",
            title: "굴뚝",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["겨울", "놀이"],
            lines: [
                "산골짜기 오막살이 낮은 굴뚝엔",
                "몽기몽기 웨인 연기 대낮에 솟나",
                "",
                "감자를 굽는 게지 총각애들이",
                "깜박깜박 검은 눈이 모여 앉아서",
                "입술이 꺼멓게 숯을 바르고",
                "옛이야기 한 커리에 감자 하나씩"
            ],
            words: [
                { word: "오막살이", mean: "아주 작고 낮은 집" },
                { word: "몽기몽기", mean: "연기가 뭉게뭉게 피어오르는 모양" },
                { word: "웨인", mean: "웬. 어찌 된" },
                { word: "한 커리", mean: "한 자리, 한 판" }
            ],
            point: "말하는 이는 집 밖에서 굴뚝만 보고 안에서 벌어지는 일을 그려 냈어요."
        }),
        poem({
            id: "dongju-ojumssagae",
            title: "오줌싸개 지도",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["가족"],
            lines: [
                "빨랫줄에 걸어 논",
                "요에다 그린 지도",
                "지난밤에 내 동생",
                "오줌 싸 그린 지도",
                "",
                "꿈에 가 본 엄마 계신",
                "별나라 지돈가?",
                "돈 벌러 간 아빠 계신",
                "만주 땅 지돈가?"
            ],
            words: [
                { word: "요", mean: "바닥에 까는 이불" },
                { word: "만주", mean: "우리나라 북쪽 너머의 넓은 땅" }
            ],
            point: "웃음이 나는 제목인데, 읽고 나면 엄마 아빠가 곁에 없다는 사정이 남아요."
        }),
        poem({
            id: "dongju-geojitburi",
            title: "거짓부리",
            poet: "윤동주",
            poetDied: 1945,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["동물", "놀이"],
            lines: [
                "똑, 똑, 똑,",
                "문 좀 열어 주세요",
                "하룻밤 자고 갑시다",
                "밤은 깊고 날은 추운데",
                "거 누굴까?",
                "문 열어 주고 보니",
                "검둥이의 꼬리가",
                "거짓부리한걸.",
                "",
                "꼬기오, 꼬기오,",
                "달걀 낳았다.",
                "간난아! 어서 집어 가거라",
                "간난이가 뛰어가 보니",
                "달걀은 무슨 달걀,",
                "고놈의 암탉이",
                "대낮에 새빨간",
                "거짓부리한걸."
            ],
            words: [
                { word: "거짓부리", mean: "거짓말" },
                { word: "검둥이", mean: "검은 개를 부르는 이름" },
                { word: "간난이", mean: "여자아이를 부르던 옛 이름" }
            ],
            point: "두 번 다 속고 두 번 다 헛걸음이에요. 같은 짜임을 겹쳐서 웃음을 만들어요."
        }),
        poem({
            id: "kimyeongrang-omae",
            title: "오매 단풍 들것네",
            poet: "김영랑",
            poetDied: 1950,
            rights: "public",
            basis: "expired",
            grade: 4,
            topics: ["가을", "가족"],
            lines: [
                "“오매 단풍 들것네”",
                "장광에 골 붉은 감잎 날아오아",
                "누이는 놀란 듯이 치어다보며",
                "“오매 단풍 들것네”",
                "",
                "추석이 내일모레 기둘리리",
                "바람이 자지어서 걱정이리",
                "누이의 마음아 나를 보아라",
                "“오매 단풍 들것네”"
            ],
            words: [
                { word: "오매", mean: "어머나. 전라도 말" },
                { word: "장광", mean: "장독들을 놓아 둔 자리" },
                { word: "골 붉은", mean: "속까지 붉게 물든" },
                { word: "기둘리리", mean: "기다리겠지" },
                { word: "자지어서", mean: "잦아서. 자주 불어서" }
            ],
            point: "누이가 한 말을 그대로 옮겨 놓고, 그 곁에서 누이를 바라보는 사람이 말해요."
        }),
        poem({
            id: "leebaek-jeongyasa",
            title: "고요한 밤의 생각",
            poet: "이백",
            poetDied: 762,
            rights: "public",
            basis: "own-translation",
            grade: 4,
            topics: ["밤과 달", "그리움"],
            lines: [
                "잠자리 앞에 밝은 달빛",
                "땅에 내린 서리인가 했네",
                "고개 들어 밝은 달을 보고",
                "고개 숙여 고향을 생각하네"
            ],
            words: [
                { word: "서리", mean: "추운 밤에 땅에 하얗게 어는 것" }
            ],
            point: "고개를 들었다 숙이는 두 몸짓만으로 그리움을 다 말해요."
        }),
        poem({
            id: "dubo-chunyahuiu",
            title: "봄밤에 내리는 반가운 비",
            poet: "두보",
            poetDied: 770,
            rights: "public",
            basis: "own-translation",
            grade: 4,
            topics: ["봄", "자연"],
            lines: [
                "좋은 비는 시절을 알아",
                "봄이 되니 이내 내리네",
                "바람 따라 밤에 몰래 들어와",
                "소리 없이 만물을 적시네"
            ],
            words: [
                { word: "시절", mean: "때. 철" },
                { word: "만물", mean: "온갖 것" }
            ],
            point: "비를 눈치 빠른 손님처럼 그렸어요. 소리 없이 든다는 말이 밤을 조용하게 만들어요."
        })
    ]);
})();
