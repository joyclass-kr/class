// 문제 창고.
// 공용 모양(학급 순위전과 같음): { id, category, prompt, sentence, choices, answer, explanation }
// 여기에 poemId 하나를 더 둔다. 문제 화면에서 그 시를 함께 보여 주기 위해서다.
// poemId가 없는 문제는 그 차시를 마무리하는 정리 문제라 시 없이 나온다.
window.POETRY_QUESTIONS = Object.freeze([
    // ── 1차시 · 짧은 시 한 편 통째로 그리기 ──────────────────────────
    {
        id: "hosu-hide",
        poemId: "jiyong-hosu",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "손바닥 둘로 폭 가릴 수 있다고 한 것은 무엇인가요?",
        choices: ["얼굴", "호수", "보고 싶은 마음"],
        answer: "얼굴",
        explanation: "얼굴은 손바닥 둘이면 가려지지만, 보고 싶은 마음은 호수만 해서 가릴 수가 없어요."
    },
    {
        id: "hosu-eyes",
        poemId: "jiyong-hosu",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 눈을 감는 까닭은 무엇인가요?",
        choices: ["보고 싶은 마음이 너무 커서", "호수가 눈부시게 반짝여서", "얼굴을 보이기 부끄러워서"],
        answer: "보고 싶은 마음이 너무 커서",
        explanation: "가릴 수 없을 만큼 커진 마음 앞에서 할 수 있는 일이 눈 감는 것뿐이었어요."
    },
    {
        id: "hosu-compare",
        poemId: "jiyong-hosu",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "보고 싶은 마음을 무엇에 견주었나요?",
        choices: ["호수", "손바닥", "얼굴"],
        answer: "호수",
        explanation: "'호수만 하니'라고 했어요. 마음의 크기를 눈에 보이는 것에 견주면 얼마나 큰지 곧바로 느껴져요."
    },
    {
        id: "byeoltong-place",
        poemId: "jiyong-byeoltong",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 가 보려고 마음먹었던 곳은 어디인가요?",
        choices: ["별똥이 떨어진 곳", "별이 가장 밝은 산꼭대기", "할머니가 사시는 마을"],
        answer: "별똥이 떨어진 곳",
        explanation: "첫 줄에 '별똥 떨어진 곳'이라고 못 박아 두었어요."
    },
    {
        id: "byeoltong-end",
        poemId: "jiyong-byeoltong",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄에서 말하는 이는 어떻게 되었나요?",
        choices: ["가 보지 못한 채 다 자랐어요", "드디어 별똥을 찾아냈어요", "동무와 함께 찾아 나섰어요"],
        answer: "가 보지 못한 채 다 자랐어요",
        explanation: "벼르다 벼르다 어느새 어른이 되었다는 말이에요. 일곱 줄 안에 오랜 세월이 들어 있어요."
    },
    {
        id: "gamjakkot-purple",
        poemId: "taeeung-gamjakkot",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "자주 꽃이 핀 감자를 파 보면 무엇이 나오나요?",
        choices: ["자주 감자", "하얀 감자", "감자 꽃씨"],
        answer: "자주 감자",
        explanation: "꽃 빛깔과 감자 빛깔이 똑같아요."
    },
    {
        id: "gamjakkot-rule",
        poemId: "taeeung-gamjakkot",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'파 보나 마나'라는 말은 무엇을 알려 주나요?",
        choices: ["파 보지 않아도 뻔히 안다는 것", "파 보면 안 된다는 것", "파 보는 일이 힘들다는 것"],
        answer: "파 보지 않아도 뻔히 안다는 것",
        explanation: "이 한마디가 꽃 빛깔과 감자 빛깔이 같다는 규칙을 못 박아 줘요."
    },
    {
        id: "hongsi-days",
        poemId: "jiyong-hongsi",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "홍시가 하나씩 남아 있던 날은 언제인가요?",
        choices: ["어저께와 오늘", "사흘 내내", "지난 한 달 동안"],
        answer: "어저께와 오늘",
        explanation: "'어저께도 홍시 하나, 오늘에도 홍시 하나'라고 했어요."
    },
    {
        id: "hongsi-why-left",
        poemId: "jiyong-hongsi",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "홍시를 따지 않고 남겨 둔 까닭은 무엇인가요?",
        choices: ["오빠에게 맛보이려고", "까마귀에게 나눠 주려고", "겨울까지 두고 먹으려고"],
        answer: "오빠에게 맛보이려고",
        explanation: "'우리 오빠 오시걸랑 맛뵐라구 남겨 뒀다'고 했어요. 그래서 까마귀를 쫓는 거예요."
    },
    {
        id: "scene-common",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "「호수」·「별똥」·「감자꽃」·「홍시」의 공통점은 무엇인가요?",
        choices: [
            "짧은 글 속에 장면이 하나씩 담겨 있어요",
            "모두 긴 이야기를 차례차례 들려줘요",
            "모두 동물이 주인공으로 나와요"
        ],
        answer: "짧은 글 속에 장면이 하나씩 담겨 있어요",
        explanation: "시는 사진 한 장처럼 장면 하나만 보여 주고도 마음을 다 전할 수 있어요."
    },

    // ── 2차시 · 되풀이 ────────────────────────────────────────────
    {
        id: "eommaya-repeat",
        poemId: "sowol-eommaya",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "똑같이 두 번 나온 줄은 어느 것인가요?",
        choices: ["엄마야 누나야 강변 살자", "뜰에는 반짝이는 금모랫빛", "뒷문 밖에는 갈잎의 노래"],
        answer: "엄마야 누나야 강변 살자",
        explanation: "첫 줄과 마지막 줄이 똑같아요. 처음과 끝을 같은 말로 묶으면 바라는 마음이 더 또렷해져요."
    },
    {
        id: "eommaya-where",
        poemId: "sowol-eommaya",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "함께 살자고 한 곳은 어디인가요?",
        choices: ["강변", "깊은 산속", "바닷가"],
        answer: "강변",
        explanation: "금빛 모래와 갈잎 노래가 있는 강가예요."
    },
    {
        id: "eommaya-remove",
        poemId: "sowol-eommaya",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄을 지우고 읽으면 무엇이 달라지나요?",
        choices: ["바라는 마음이 약해져요", "장면이 더 자세해져요", "시가 더 슬퍼져요"],
        answer: "바라는 마음이 약해져요",
        explanation: "같은 말을 한 번 더 하면 '정말로 그러고 싶다'는 마음이 얹혀요."
    },
    {
        id: "geumjandi-first",
        poemId: "sowol-geumjandi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "시는 어떤 낱말을 거듭하며 시작하나요?",
        choices: ["잔디", "봄빛", "버드나무"],
        answer: "잔디",
        explanation: "'잔디, 잔디, 금잔디' 하고 한 낱말을 세 번 거듭하며 시작해요."
    },
    {
        id: "geumjandi-spring",
        poemId: "sowol-geumjandi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'봄이 왔네'와 짝을 이루어 되풀이된 말은 무엇인가요?",
        choices: ["봄빛이 왔네", "임이 왔네", "잔디가 붙네"],
        answer: "봄빛이 왔네",
        explanation: "'봄이 왔네, 봄빛이 왔네' 하고 비슷한 말을 나란히 놓아 노래처럼 만들었어요."
    },
    {
        id: "bompyeonji-paper",
        poemId: "deokchul-bompyeonji",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "편지지로 삼은 것은 무엇인가요?",
        choices: ["버들잎", "연꽃잎", "흰 종이"],
        answer: "버들잎",
        explanation: "연못가에 새로 핀 버들잎을 따서 편지로 썼어요."
    },
    {
        id: "bompyeonji-who",
        poemId: "deokchul-bompyeonji",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "그 편지를 보고 돌아오는 것은 누구인가요?",
        choices: ["작년에 간 제비", "강남에 사는 동무", "겨울을 넘긴 개구리"],
        answer: "작년에 간 제비",
        explanation: "봄을 기다리는 마음을 제비에게 보내는 편지로 바꾸어 놓았어요."
    },
    {
        id: "banditbul-frame",
        poemId: "dongju-banditbul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "처음과 끝에 똑같이 놓인 묶음은 무엇인가요?",
        choices: ["가자 가자 가자 숲으로 가자", "그믐밤 반딧불은", "부서진 달 조각"],
        answer: "가자 가자 가자 숲으로 가자",
        explanation: "같은 묶음이 앞뒤를 감싸서 노래처럼 들려요."
    },
    {
        id: "banditbul-what",
        poemId: "dongju-banditbul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "반딧불을 무엇이라고 했나요?",
        choices: ["부서진 달 조각", "떨어진 별똥", "숲을 지키는 등불"],
        answer: "부서진 달 조각",
        explanation: "달이 보이지 않는 그믐밤이라, 반딧불을 부서진 달 조각으로 본 거예요."
    },
    {
        id: "repeat-why",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "시에서 같은 말을 되풀이하면 어떤 힘이 생기나요?",
        choices: [
            "그 말이 마음에 오래 남아요",
            "시가 길어져서 읽기 어려워져요",
            "말의 뜻이 반대로 바뀌어요"
        ],
        answer: "그 말이 마음에 오래 남아요",
        explanation: "되풀이는 노래의 후렴과 같아요. 한 번 더 들으면 그 말이 시의 중심이 돼요."
    },

    // ── 3차시 · 흉내내는 말 ────────────────────────────────────────
    {
        id: "haetbi-rain",
        poemId: "dongju-haetbi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비가 내리는 모습을 흉내낸 말은 무엇인가요?",
        choices: ["보슬보슬", "알롱알롱", "닷 자 엿 자"],
        answer: "보슬보슬",
        explanation: "가늘게 내리는 비를 나타내는 말이에요."
    },
    {
        id: "haetbi-rainbow",
        poemId: "dongju-haetbi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "무지개를 흉내낸 말은 무엇인가요?",
        choices: ["알롱알롱", "보슬보슬", "즐거워"],
        answer: "알롱알롱",
        explanation: "여러 빛깔이 어른어른 겹쳐 보이는 모습이에요."
    },
    {
        id: "haetbi-grow",
        poemId: "dongju-haetbi",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "아이들은 무엇처럼 크게 자라고 싶어 하나요?",
        choices: ["옥수숫대", "버드나무", "무지개"],
        answer: "옥수숫대",
        explanation: "비를 맞고 쑥쑥 자라는 옥수숫대에 자기를 견주었어요."
    },
    {
        id: "chamsae-sound",
        poemId: "dongju-chamsae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "참새 소리를 흉내낸 말은 무엇인가요?",
        choices: ["째액째액", "보슬보슬", "훠이 훠이"],
        answer: "째액째액",
        explanation: "참새가 우는 소리를 그대로 글자로 옮겼어요."
    },
    {
        id: "chamsae-paper",
        poemId: "dongju-chamsae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "가을이 지난 마당을 무엇이라고 했나요?",
        choices: ["하이얀 종이", "넓은 밭", "겨울 이불"],
        answer: "하이얀 종이",
        explanation: "마당을 종이로 보았기 때문에 참새 발자국이 글씨가 될 수 있었어요."
    },
    {
        id: "chamsae-letter",
        poemId: "dongju-chamsae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "참새가 하루 종일 공부해도 쓸 수 있는 글자는 무엇인가요?",
        choices: ["짹", "새", "글"],
        answer: "짹",
        explanation: "참새가 내는 소리가 그대로 참새가 쓰는 글자가 돼요."
    },
    {
        id: "hongsi-shoo",
        poemId: "jiyong-hongsi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "까마귀를 쫓을 때 내는 소리는 무엇인가요?",
        choices: ["훠이 훠이", "째액째액", "보슬보슬"],
        answer: "훠이 훠이",
        explanation: "'후락 딱 딱'은 팔을 휘두르는 소리이고, '훠이 훠이'는 새를 쫓는 소리예요."
    },
    {
        id: "mimetic-sound",
        poemId: "dongju-chamsae",
        category: "표현 찾기",
        prompt: "흉내내는 말에는 소리를 옮긴 것과 모습을 옮긴 것이 있어요.",
        sentence: "'째액째액'은 무엇을 흉내낸 말인가요?",
        choices: ["참새가 내는 소리", "참새가 걷는 모습", "참새의 깃털 빛깔"],
        answer: "참새가 내는 소리",
        explanation: "귀로 들은 것을 옮긴 말이에요."
    },
    {
        id: "mimetic-shape",
        poemId: "dongju-haetbi",
        category: "표현 찾기",
        prompt: "흉내내는 말에는 소리를 옮긴 것과 모습을 옮긴 것이 있어요.",
        sentence: "'알롱알롱'은 무엇을 흉내낸 말인가요?",
        choices: ["빛깔이 어른거리는 모습", "무지개가 내는 소리", "비가 떨어지는 소리"],
        answer: "빛깔이 어른거리는 모습",
        explanation: "눈으로 본 것을 옮긴 말이에요. 무지개는 소리를 내지 않아요."
    },

    // ── 4차시 · 부르는 말 ─────────────────────────────────────────
    {
        id: "saeya-who",
        poemId: "folk-saeya",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "말하는 이가 부르고 있는 것은 누구인가요?",
        choices: ["파랑새", "청포 장수", "녹두꽃"],
        answer: "파랑새",
        explanation: "'새야 새야 파랑새야' 하고 새를 두 번 세 번 부르며 시작해요."
    },
    {
        id: "saeya-ask",
        poemId: "folk-saeya",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "파랑새에게 부탁한 것은 무엇인가요?",
        choices: ["녹두밭에 앉지 말라는 것", "어서 날아오라는 것", "노래를 불러 달라는 것"],
        answer: "녹두밭에 앉지 말라는 것",
        explanation: "새가 앉으면 녹두꽃이 떨어지기 때문이에요."
    },
    {
        id: "saeya-cries",
        poemId: "folk-saeya",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "녹두꽃이 떨어지면 우는 사람은 누구인가요?",
        choices: ["청포 장수", "파랑새", "밭을 지나던 나그네"],
        answer: "청포 장수",
        explanation: "녹두로 청포묵을 쑤어 파는 사람이라, 녹두 농사가 잘못되면 장사를 못 하게 돼요."
    },
    {
        id: "dara-call",
        poemId: "folk-dara",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "이 노래가 부르고 있는 것은 무엇인가요?",
        choices: ["달", "계수나무", "이태백"],
        answer: "달",
        explanation: "'달아 달아 밝은 달아' 하고 달을 부르며 시작해요."
    },
    {
        id: "dara-tool",
        poemId: "folk-dara",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "계수나무를 찍어 내는 데 쓴 것은 무엇인가요?",
        choices: ["옥도끼", "금도끼", "톱"],
        answer: "옥도끼",
        explanation: "옥도끼로 찍어 내고, 그다음에 금도끼로 다듬는다고 했어요."
    },
    {
        id: "dara-wish",
        poemId: "folk-dara",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "집을 짓고 나서 하고 싶은 일은 무엇인가요?",
        choices: ["부모님을 모시고 오래오래 사는 것", "달까지 사다리를 놓는 것", "금도끼를 팔아 부자가 되는 것"],
        answer: "부모님을 모시고 오래오래 사는 것",
        explanation: "'양친 부모 모셔다가 천년만년 살고지고'가 이 노래가 바라는 전부예요."
    },
    {
        id: "dukkeobi-trade",
        poemId: "folk-dukkeobi",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "두꺼비에게 주겠다고 한 것은 무엇인가요?",
        choices: ["헌 집", "새 집", "모래 한 줌"],
        answer: "헌 집",
        explanation: "헌 집을 줄 테니 새 집을 달라고 조르는 노래예요."
    },
    {
        id: "dukkeobi-short",
        poemId: "folk-dukkeobi",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "세 줄뿐인 이 노래에 들어 있는 것은 무엇인가요?",
        choices: ["부르는 말과 주고받는 말", "묻는 말과 대답하는 말", "흉내내는 말만 여럿"],
        answer: "부르는 말과 주고받는 말",
        explanation: "'두껍아 두껍아'가 부르는 말이고, '줄게 / 다오'가 주고받는 말이에요."
    },
    {
        id: "eommaya-calling",
        poemId: "sowol-eommaya",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'엄마야', '누나야' 하고 부르면 어떤 느낌이 드나요?",
        choices: ["곁에 있는 사람에게 말을 거는 느낌", "혼자 중얼거리는 느낌", "화가 나 다그치는 느낌"],
        answer: "곁에 있는 사람에게 말을 거는 느낌",
        explanation: "부르는 말이 있으면 시가 혼잣말이 아니라 이야기가 돼요."
    },
    {
        id: "calling-no-answer",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 노래들을 떠올려 보세요.",
        sentence: "부름을 받은 새와 달과 두꺼비는 대답을 하나요?",
        choices: [
            "대답하지 않지만 말하는 이는 계속 말을 걸어요",
            "모두 또렷하게 대답해 줘요",
            "대답 대신 다른 노래를 불러 줘요"
        ],
        answer: "대답하지 않지만 말하는 이는 계속 말을 걸어요",
        explanation: "대답하지 못하는 것에게 말을 거는 것도 시가 하는 일이에요. 그래서 바라는 마음이 더 크게 들려요."
    },

    // ── 5차시 · 시로 물어보기 ──────────────────────────────────────
    {
        id: "baram-seen",
        poemId: "rossetti-baram",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시에서 바람을 본 사람이 있나요?",
        choices: ["아무도 보지 못했어요", "말하는 이만 보았어요", "나뭇잎만 보았어요"],
        answer: "아무도 보지 못했어요",
        explanation: "'나도 당신도 보지 못했지요'라고 두 번 다 말해요."
    },
    {
        id: "baram-how-know",
        poemId: "rossetti-baram",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "바람이 지나간다는 것을 무엇으로 아나요?",
        choices: [
            "나뭇잎이 떨고 나무가 고개를 숙이는 것",
            "바람 소리가 크게 들리는 것",
            "하늘에 구름이 하나도 없는 것"
        ],
        answer: "나뭇잎이 떨고 나무가 고개를 숙이는 것",
        explanation: "보이지 않는 것도 그것이 지나간 자리를 보면 알 수 있어요."
    },
    {
        id: "baram-why-ask",
        poemId: "rossetti-baram",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "물음으로 시를 시작하면 무엇이 좋은가요?",
        choices: ["읽는 사람이 함께 생각하게 돼요", "시가 짧아져요", "답을 감출 수 있어요"],
        answer: "읽는 사람이 함께 생각하게 돼요",
        explanation: "말하는 이는 답을 알면서도 일부러 물어요. 그래야 읽는 사람도 나뭇잎을 보게 되니까요."
    },
    {
        id: "nun-blanket",
        poemId: "dongju-nun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "눈을 무엇이라고 생각했나요?",
        choices: ["덮어 주는 이불", "하얀 종이", "부서진 달 조각"],
        answer: "덮어 주는 이불",
        explanation: "지붕과 길과 밭이 춥지 말라고 덮어 주는 이불로 보았어요."
    },
    {
        id: "nun-why-winter",
        poemId: "dongju-nun",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "눈이 추운 겨울에만 내린다고 한 까닭은 무엇인가요?",
        choices: ["추운 것들을 덮어 주려고", "겨울이 가장 조용해서", "여름에는 이불이 필요 없어서"],
        answer: "추운 것들을 덮어 주려고",
        explanation: "눈을 이불로 보았으니, 추울 때만 내리는 것이 앞뒤가 맞아요."
    },
    {
        id: "nun-guess",
        poemId: "dongju-nun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'이불인가 봐'는 어떤 뜻인가요?",
        choices: ["그럴 것이라고 짐작한다는 뜻", "이불을 덮고 싶다는 뜻", "이불이 없어졌다는 뜻"],
        answer: "그럴 것이라고 짐작한다는 뜻",
        explanation: "못 박아 말하지 않고 짐작으로 남겨 두어서 더 정답게 들려요."
    },
    {
        id: "eodikkaji-shape",
        poemId: "folk-eodikkaji",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "이 노래는 어떤 짜임으로 되어 있나요?",
        choices: ["묻고 답하기를 번갈아 해요", "한 사람이 혼자 노래해요", "같은 줄만 계속 되풀이해요"],
        answer: "묻고 답하기를 번갈아 해요",
        explanation: "묻는 사람과 답하는 사람이 있어야 이어지는 놀이 노래예요."
    },
    {
        id: "eodikkaji-closer",
        poemId: "folk-eodikkaji",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "대답은 어떻게 바뀌어 가나요?",
        choices: ["멀었다가 점점 가까워져요", "가까웠다가 점점 멀어져요", "처음부터 끝까지 똑같아요"],
        answer: "멀었다가 점점 가까워져요",
        explanation: "'당당 멀었다'에서 '문 앞에 다 왔다'까지, 같은 물음에 답만 바뀌면서 거리가 줄어들어요."
    },

    // ── 6차시 · ~같이, ~처럼 ──────────────────────────────────────
    {
        id: "geurimja-follow",
        poemId: "stevenson-geurimja",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "그림자는 말하는 이에게 무엇을 하나요?",
        choices: ["가는 곳마다 따라다녀요", "가끔씩만 나타나요", "앞장서서 길을 알려 줘요"],
        answer: "가는 곳마다 따라다녀요",
        explanation: "'내가 가는 곳이면 어디든 따라와요'라고 했어요."
    },
    {
        id: "geurimja-ball",
        poemId: "stevenson-geurimja",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "그림자가 훌쩍 커지는 모습을 무엇에 견주었나요?",
        choices: ["고무공", "나무", "구름"],
        answer: "고무공",
        explanation: "'고무공처럼 훌쩍 커졌다가'라고 했어요. '~처럼'이 두 가지를 이어 주는 말이에요."
    },
    {
        id: "geurimja-alike",
        poemId: "stevenson-geurimja",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "그림자가 나와 얼마나 닮았다고 했나요?",
        choices: ["발끝에서 머리끝까지 닮았어요", "얼굴만 닮았어요", "하나도 닮지 않았어요"],
        answer: "발끝에서 머리끝까지 닮았어요",
        explanation: "닮았다는 말도 두 가지를 견주는 말이에요."
    },
    {
        id: "bomeun-fur",
        poemId: "leejanghee-bomeun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "고양이의 부드러운 털을 무엇에 견주었나요?",
        choices: ["꽃가루", "금방울", "봄바람"],
        answer: "꽃가루",
        explanation: "'꽃가루와 같이 부드러운'이라고 했어요."
    },
    {
        id: "bomeun-eye",
        poemId: "leejanghee-bomeun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "동그란 고양이의 눈을 무엇에 견주었나요?",
        choices: ["금방울", "꽃가루", "불길"],
        answer: "금방울",
        explanation: "'금방울과 같이 호동그란'이라고 했어요. 방울처럼 동그랗고 반짝인다는 뜻이에요."
    },
    {
        id: "bomeun-four",
        poemId: "leejanghee-bomeun",
        category: "견주어 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 고양이의 어느 부분들을 차례로 살펴보나요?",
        choices: ["털·눈·입술·수염", "털·발·꼬리·귀", "눈·코·입·귀"],
        answer: "털·눈·입술·수염",
        explanation: "네 부분을 하나씩 짚으며 봄의 다른 모습에 견주어요."
    },
    {
        id: "haetbi-simile",
        poemId: "dongju-haetbi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비가 내리는 모습을 누구에 견주었나요?",
        choices: ["아씨", "무지개", "옥수숫대"],
        answer: "아씨",
        explanation: "'아씨처럼 나린다'고 했어요. 곱고 얌전하게 내린다는 뜻이에요."
    },
    {
        id: "bi-places",
        poemId: "stevenson-bi",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비가 내리는 곳으로 나오지 않은 것은 어디인가요?",
        choices: ["산꼭대기", "우산 위", "바다의 배 위"],
        answer: "산꼭대기",
        explanation: "들, 나무, 우산, 배 위 넷을 늘어놓았어요."
    },
    {
        id: "bi-far",
        poemId: "stevenson-bi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비가 내리는 곳을 어떤 차례로 말하나요?",
        choices: ["가까운 곳에서 먼 곳으로", "먼 곳에서 가까운 곳으로", "아무 차례 없이"],
        answer: "가까운 곳에서 먼 곳으로",
        explanation: "들과 나무에서 시작해 우산을 거쳐 바다의 배까지 눈길이 멀어져요."
    },
    {
        id: "simile-mark",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "두 가지를 견줄 때 쓰는 말은 어느 것인가요?",
        choices: ["~처럼, ~같이", "~인가 봐", "~하자"],
        answer: "~처럼, ~같이",
        explanation: "'고무공처럼', '꽃가루와 같이'처럼 두 가지를 이어 주는 말이에요."
    },

    // ── 7차시 · 사람처럼 말하기 ───────────────────────────────────
    {
        id: "bom-baby",
        poemId: "dongju-bom",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "우리 애기는 어디에서 자고 있나요?",
        choices: ["아래 발치", "부뚜막", "나뭇가지"],
        answer: "아래 발치",
        explanation: "부뚜막에서 자는 것은 고양이예요."
    },
    {
        id: "bom-wind",
        poemId: "dongju-bom",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "바람을 무엇이라고 불렀나요?",
        choices: ["애기 바람", "아저씨 바람", "누나 바람"],
        answer: "애기 바람",
        explanation: "바람에게 '애기'라는 사람 이름을 붙여 주었어요."
    },
    {
        id: "bom-sun",
        poemId: "dongju-bom",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "해님을 무엇이라고 불렀나요?",
        choices: ["아저씨 해님", "애기 해님", "할머니 해님"],
        answer: "아저씨 해님",
        explanation: "하늘 한가운데서 째앵째앵 내리쬐는 모습이 어른스러워 보였나 봐요."
    },
    {
        id: "bom-family",
        poemId: "dongju-bom",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "바람과 해님을 사람처럼 부르면 어떤 느낌이 드나요?",
        choices: ["온 봄이 한 식구처럼 느껴져요", "봄이 무섭게 느껴져요", "봄이 아주 멀게 느껴져요"],
        answer: "온 봄이 한 식구처럼 느껴져요",
        explanation: "애기와 고양이 곁에 바람과 해님이 나란히 놓여요."
    },
    {
        id: "jogae-who",
        poemId: "dongju-jogaekkeopjil",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "조개껍데기를 주워 온 사람은 누구인가요?",
        choices: ["언니", "동생", "말하는 이"],
        answer: "언니",
        explanation: "'울 언니 바닷가에서 주워 온'이라고 했어요."
    },
    {
        id: "jogae-miss",
        poemId: "dongju-jogaekkeopjil",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "조개껍데기가 그리워하는 것은 무엇인가요?",
        choices: ["잃어버린 한 짝", "바다에 사는 물고기", "주워 온 언니"],
        answer: "잃어버린 한 짝",
        explanation: "굴리며 놀다가 짝을 잃었어요. 조개껍데기가 사람처럼 그리워해요."
    },
    {
        id: "jogae-me",
        poemId: "dongju-jogaekkeopjil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'나처럼 그리워하네'는 무슨 뜻인가요?",
        choices: ["조개도 나도 그리운 것이 있다는 뜻", "조개가 나를 그리워한다는 뜻", "내가 조개를 그리워한다는 뜻"],
        answer: "조개도 나도 그리운 것이 있다는 뜻",
        explanation: "조개는 짝을, 말하는 이는 바다를 그리워해요. 둘을 나란히 놓았어요."
    },
    {
        id: "baram-tree",
        poemId: "rossetti-baram",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "나무들이 하는 행동으로 나오는 것은 무엇인가요?",
        choices: ["고개를 숙여요", "손뼉을 쳐요", "노래를 불러요"],
        answer: "고개를 숙여요",
        explanation: "나무에게 고개라는 사람의 몸을 붙여 주었어요."
    },
    {
        id: "bompyeonji-jebi",
        poemId: "deokchul-bompyeonji",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "제비가 하는 일로 나오는 것은 무엇인가요?",
        choices: ["편지를 보고 그리워해요", "편지를 물고 날아가요", "편지에 답장을 써요"],
        answer: "편지를 보고 그리워해요",
        explanation: "제비가 글을 읽고 마음이 움직이는 사람처럼 그려졌어요."
    },
    {
        id: "persona-what",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "사물을 사람처럼 그리면 무엇이 좋은가요?",
        choices: [
            "사물이 살아 움직이는 것처럼 느껴져요",
            "시가 짧아져요",
            "사물의 크기를 정확히 알 수 있어요"
        ],
        answer: "사물이 살아 움직이는 것처럼 느껴져요",
        explanation: "바람이 애기가 되고 조개가 그리워하면, 읽는 사람도 그 마음을 함께 느끼게 돼요."
    },

    // ── 8차시 · 오감으로 그리기 ───────────────────────────────────
    {
        id: "bunhong-rose",
        poemId: "rossetti-bunhong",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "분홍은 무엇이라고 했나요?",
        choices: ["장미", "양귀비꽃", "저녁 구름"],
        answer: "장미",
        explanation: "샘가에 피어 있는 장미가 분홍이라고 했어요."
    },
    {
        id: "bunhong-white",
        poemId: "rossetti-bunhong",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "하양은 무엇이라고 했나요?",
        choices: ["백조", "밀밭", "풀밭"],
        answer: "백조",
        explanation: "햇빛 아래 떠 가는 백조가 하양이라고 했어요."
    },
    {
        id: "bunhong-sense",
        poemId: "rossetti-bunhong",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 주로 어떤 감각으로 그렸나요?",
        choices: ["눈으로 보는 감각", "귀로 듣는 감각", "코로 맡는 감각"],
        answer: "눈으로 보는 감각",
        explanation: "처음부터 끝까지 빛깔만으로 시 한 편을 채웠어요."
    },
    {
        id: "jeongyasa-frost",
        poemId: "leebaek-jeongyasa",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "달빛을 무엇으로 잘못 보았나요?",
        choices: ["땅에 내린 서리", "쏟아진 물", "하얀 종이"],
        answer: "땅에 내린 서리",
        explanation: "달빛이 하도 하얘서 서리인가 했다는 말이에요."
    },
    {
        id: "jeongyasa-head",
        poemId: "leebaek-jeongyasa",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "고개를 숙이고 무엇을 생각했나요?",
        choices: ["고향", "서리", "잠자리"],
        answer: "고향",
        explanation: "고개를 드니 달, 고개를 숙이니 고향. 두 몸짓만으로 그리움을 말해요."
    },
    {
        id: "chunya-when",
        poemId: "dubo-chunyahuiu",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "좋은 비는 언제 내린다고 했나요?",
        choices: ["봄이 되자 곧", "여름이 다 가고", "겨울이 오기 전에"],
        answer: "봄이 되자 곧",
        explanation: "비가 때를 알아서 봄이 되자마자 내린다고 했어요."
    },
    {
        id: "chunya-quiet",
        poemId: "dubo-chunyahuiu",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비가 만물을 적시는 소리는 어떻다고 했나요?",
        choices: ["소리가 없다고 했어요", "요란하다고 했어요", "노래 같다고 했어요"],
        answer: "소리가 없다고 했어요",
        explanation: "'소리 없이 만물을 적시네'예요. 귀로 듣는 감각을 지워서 밤을 더 조용하게 만들어요."
    },
    {
        id: "geune-see",
        poemId: "stevenson-geune",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "담장 너머로 보이는 것으로 나오지 않은 것은 무엇인가요?",
        choices: ["바다", "강물", "소들"],
        answer: "바다",
        explanation: "들판, 강물, 소들이 보인다고 했어요."
    },
    {
        id: "geune-body",
        poemId: "stevenson-geune",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시가 그린 감각은 무엇인가요?",
        choices: ["몸이 오르내리는 느낌", "손끝이 따가운 느낌", "입안이 단 느낌"],
        answer: "몸이 오르내리는 느낌",
        explanation: "그네를 타고 하늘로 올라갈 때 몸이 붕 뜨는 느낌이 시 전체를 이끌어요."
    },
    {
        id: "senses-why",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "시가 오감을 쓰면 무엇이 좋은가요?",
        choices: [
            "읽는 사람이 그 자리에 있는 것처럼 느껴져요",
            "시를 외우기 쉬워져요",
            "글자 수를 줄일 수 있어요"
        ],
        answer: "읽는 사람이 그 자리에 있는 것처럼 느껴져요",
        explanation: "빛깔을 보고 소리를 듣고 몸으로 느끼면, 읽는 사람도 시 속에 들어가게 돼요."
    },

    // ── 9차시 · 말하는 이는 지금 어디에 있나 ──────────────────────
    {
        id: "gulttuk-where",
        poemId: "dongju-gulttuk",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "연기가 솟는 곳은 어디인가요?",
        choices: ["산골짜기 오막살이", "마을 한가운데 큰 집", "학교 옆 부엌"],
        answer: "산골짜기 오막살이",
        explanation: "산골짜기의 낮은 굴뚝에서 대낮에 연기가 솟아요."
    },
    {
        id: "gulttuk-potato",
        poemId: "dongju-gulttuk",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "아이들이 굽고 있는 것은 무엇인가요?",
        choices: ["감자", "고구마", "밤"],
        answer: "감자",
        explanation: "'감자를 굽는 게지'라고 짐작해요."
    },
    {
        id: "gulttuk-lips",
        poemId: "dongju-gulttuk",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "아이들 입술이 꺼먼 까닭은 무엇인가요?",
        choices: ["감자를 구우며 숯을 발라서", "어두워서 그렇게 보여서", "먹물을 묻혀서"],
        answer: "감자를 구우며 숯을 발라서",
        explanation: "굽고 먹느라 숯이 입술에 묻었어요."
    },
    {
        id: "gulttuk-outside",
        poemId: "dongju-gulttuk",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 어디에서 이 장면을 보고 있나요?",
        choices: ["굴뚝이 보이는 집 바깥에서", "아이들 곁에 앉아서", "감자를 굽는 아궁이 앞에서"],
        answer: "굴뚝이 보이는 집 바깥에서",
        explanation: "연기만 보고 '감자를 굽는 게지' 하고 짐작하니, 안이 아니라 밖에 있는 거예요."
    },
    {
        id: "omae-speaker",
        poemId: "kimyeongrang-omae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "따옴표 안의 말을 하는 사람은 누구인가요?",
        choices: ["누이", "말하는 이", "지나가던 이웃"],
        answer: "누이",
        explanation: "누이가 놀란 듯이 치어다보며 한 말을 그대로 옮겨 놓았어요."
    },
    {
        id: "omae-leaf",
        poemId: "kimyeongrang-omae",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "무엇이 날아와서 누이가 놀랐나요?",
        choices: ["붉게 물든 감잎", "떨어진 밤송이", "지나가는 새"],
        answer: "붉게 물든 감잎",
        explanation: "장독대에 골 붉은 감잎이 날아왔어요."
    },
    {
        id: "omae-watcher",
        poemId: "kimyeongrang-omae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 누이에게서 얼마나 떨어져 있나요?",
        choices: ["곁에서 누이를 바라볼 만큼 가까이", "말소리만 겨우 들릴 만큼 멀리", "다른 마을에 있어 소식으로만"],
        answer: "곁에서 누이를 바라볼 만큼 가까이",
        explanation: "'누이의 마음아 나를 보아라'라고 말을 걸 만큼 가까이 있어요."
    },
    {
        id: "byeoltong-when",
        poemId: "jiyong-byeoltong",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 지금 어느 때에 서서 이야기하나요?",
        choices: ["다 자란 뒤", "별똥이 떨어진 그날 밤", "가 보기로 마음먹은 다음 날"],
        answer: "다 자란 뒤",
        explanation: "'인젠 다 자랐소'라고 했어요. 지난 일을 돌아보며 말하고 있어요."
    },
    {
        id: "jogae-place",
        poemId: "dongju-jogaekkeopjil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 조개껍데기를 굴리며 노는 곳은 어디인가요?",
        choices: ["바다에서 먼 북쪽 나라", "조개를 주운 바닷가", "언니가 사는 남쪽 마을"],
        answer: "바다에서 먼 북쪽 나라",
        explanation: "'여긴 여긴 북쪽 나라요'라고 했어요. 바다가 멀어서 물소리가 더 그리운 거예요."
    },
    {
        id: "speaker-why",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "말하는 이가 어디에 있는지 알면 무엇이 좋은가요?",
        choices: [
            "시의 장면과 마음이 또렷해져요",
            "시를 더 빨리 읽을 수 있어요",
            "시의 글자 수를 셀 수 있어요"
        ],
        answer: "시의 장면과 마음이 또렷해져요",
        explanation: "집 밖에 있으니 짐작하고, 바다에서 머니 그리워해요. 자리가 마음을 만들어요."
    },

    // ── 10차시 · 웃긴데 왜 슬플까 ─────────────────────────────────
    {
        id: "ojum-map",
        poemId: "dongju-ojumssagae",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "요에 그려진 지도는 무엇으로 그린 것인가요?",
        choices: ["동생이 싼 오줌", "먹물", "물감"],
        answer: "동생이 싼 오줌",
        explanation: "지난밤에 동생이 오줌을 싸서 생긴 얼룩을 지도라고 불렀어요."
    },
    {
        id: "ojum-mom",
        poemId: "dongju-ojumssagae",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "엄마는 어디에 계신다고 했나요?",
        choices: ["별나라", "만주 땅", "바닷가 마을"],
        answer: "별나라",
        explanation: "'꿈에 가 본 엄마 계신 별나라'라고 했어요."
    },
    {
        id: "ojum-dad",
        poemId: "dongju-ojumssagae",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "아빠는 무엇을 하러 어디에 가 계신가요?",
        choices: ["돈을 벌러 만주 땅에", "고기를 잡으러 바다에", "공부를 하러 서울에"],
        answer: "돈을 벌러 만주 땅에",
        explanation: "먼 곳에 일하러 가 계셔서 곁에 없어요."
    },
    {
        id: "ojum-sad",
        poemId: "dongju-ojumssagae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시가 웃기면서도 마음이 짠한 까닭은 무엇인가요?",
        choices: [
            "우스운 지도 이야기 속에 엄마 아빠가 곁에 없다는 사정이 들어 있어서",
            "동생이 자꾸 오줌을 싸서",
            "지도를 잘 그리지 못해서"
        ],
        answer: "우스운 지도 이야기 속에 엄마 아빠가 곁에 없다는 사정이 들어 있어서",
        explanation: "웃음으로 시작해서 그리움으로 끝나요. 웃음이 슬픔을 감싸고 있어요."
    },
    {
        id: "geojit-dog",
        poemId: "dongju-geojitburi",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "문을 두드린 것은 무엇이었나요?",
        choices: ["검둥이의 꼬리", "밤길 나그네", "바람"],
        answer: "검둥이의 꼬리",
        explanation: "문을 열어 보니 사람이 아니라 개 꼬리였어요."
    },
    {
        id: "geojit-hen",
        poemId: "dongju-geojitburi",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "달걀을 낳았다고 거짓말한 것은 누구인가요?",
        choices: ["암탉", "간난이", "검둥이"],
        answer: "암탉",
        explanation: "간난이가 뛰어가 보니 달걀은 없었어요."
    },
    {
        id: "geojit-twice",
        poemId: "dongju-geojitburi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "두 묶음이 똑같이 되풀이하는 짜임은 무엇인가요?",
        choices: ["소리가 들리고, 가 보고, 속는 것", "묻고, 답하고, 웃는 것", "부르고, 대답하고, 헤어지는 것"],
        answer: "소리가 들리고, 가 보고, 속는 것",
        explanation: "같은 짜임을 두 번 겹쳐 놓아서 웃음이 두 배가 돼요."
    },
    {
        id: "chamsae-pity",
        poemId: "dongju-chamsae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "참새가 웃기면서도 짠한 까닭은 무엇인가요?",
        choices: [
            "하루 종일 애쓰는데 늘 같은 글자밖에 못 써서",
            "글씨를 배우기 싫어해서",
            "마당이 너무 좁아서"
        ],
        answer: "하루 종일 애쓰는데 늘 같은 글자밖에 못 써서",
        explanation: "열심인 모습이 우습기도 하고 안쓰럽기도 해요."
    },
    {
        id: "hongsi-wait",
        poemId: "jiyong-hongsi",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "오빠를 기다리는 마음은 어떤 행동으로 나타나나요?",
        choices: ["홍시를 남겨 두고 까마귀를 쫓는 행동", "감나무에 올라가는 행동", "홍시를 나눠 먹는 행동"],
        answer: "홍시를 남겨 두고 까마귀를 쫓는 행동",
        explanation: "새를 쫓느라 소리치는 모습은 우습지만, 그 밑에는 오빠를 기다리는 마음이 있어요."
    },
    {
        id: "bittersweet-how",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "웃음 뒤에 슬픔이 숨은 시는 무엇을 살펴 읽어야 하나요?",
        choices: [
            "우스운 장면 뒤에 어떤 사정이 있는지",
            "글자가 몇 개나 되는지",
            "누가 더 크게 웃는지"
        ],
        answer: "우스운 장면 뒤에 어떤 사정이 있는지",
        explanation: "웃고 넘기면 시의 절반만 읽은 것이 돼요."
    },

    // ── 11차시 · 빗댄 말을 감추기 ─────────────────────────────────
    {
        id: "narutbae-two",
        poemId: "manhae-narutbae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 자기를 무엇이라고 했나요?",
        choices: ["나룻배", "행인", "여울"],
        answer: "나룻배",
        explanation: "'나는 나룻배, 당신은 행인'이에요. '~같이'를 쓰지 않고 곧장 '~이다'로 말했어요."
    },
    {
        id: "narutbae-direct",
        poemId: "manhae-narutbae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'나는 나룻배같이 기다립니다'로 바꾸면 무엇이 달라지나요?",
        choices: ["빗댄 말이 드러나서 힘이 약해져요", "뜻이 아주 달라져요", "더 어려워져요"],
        answer: "빗댄 말이 드러나서 힘이 약해져요",
        explanation: "'~같이'를 감추고 곧장 '나는 나룻배'라고 하면 정말 나룻배가 된 것처럼 들려요."
    },
    {
        id: "narutbae-wait",
        poemId: "manhae-narutbae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "당신이 오지 않을 때 나룻배는 무엇을 하나요?",
        choices: ["바람과 눈비를 맞으며 기다려요", "다른 강으로 떠나요", "물가에 묶여 잠들어요"],
        answer: "바람과 눈비를 맞으며 기다려요",
        explanation: "밤에서 낮까지 기다리면서 날마다 낡아 간다고 했어요."
    },
    {
        id: "narutbae-frame",
        poemId: "manhae-narutbae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'나는 나룻배 / 당신은 행인'은 시의 어디에 놓여 있나요?",
        choices: ["맨 처음과 맨 끝", "가운데에만", "맨 끝에만"],
        answer: "맨 처음과 맨 끝",
        explanation: "같은 두 줄이 앞뒤를 감싸서, 읽고 나면 그 말만 남아요."
    },
    {
        id: "sonyeon-palm",
        poemId: "dongju-sonyeon",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "손금에 무엇이 흐른다고 했나요?",
        choices: ["맑은 강물", "파란 물감", "단풍잎"],
        answer: "맑은 강물",
        explanation: "손금을 강물이라고 곧장 말했어요. 그래서 그 안에 얼굴이 비칠 수 있어요."
    },
    {
        id: "sonyeon-blue",
        poemId: "dongju-sonyeon",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "하늘을 들여다보면 어디에 파란 물감이 드나요?",
        choices: ["눈썹", "머리카락", "옷소매"],
        answer: "눈썹",
        explanation: "눈썹에 들고, 볼을 쓸면 손바닥에도 묻어난다고 했어요."
    },
    {
        id: "sonyeon-face",
        poemId: "dongju-sonyeon",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "강물 속에 어리는 것은 무엇인가요?",
        choices: ["순이의 얼굴", "단풍잎", "소년의 손금"],
        answer: "순이의 얼굴",
        explanation: "눈을 감아도 그 얼굴이 사라지지 않아요. 그만큼 마음에 깊이 박혀 있어요."
    },
    {
        id: "nun-metaphor",
        poemId: "dongju-nun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'눈은 이불 같아요'가 아니라 '이불인가 봐'라고 하면 무엇이 다른가요?",
        choices: ["정말 이불이 된 것처럼 들려요", "뜻이 반대가 돼요", "눈이 더 차갑게 느껴져요"],
        answer: "정말 이불이 된 것처럼 들려요",
        explanation: "빗대는 말을 감추면 두 가지가 하나로 겹쳐 보여요."
    },
    {
        id: "bomeun-title",
        poemId: "leejanghee-bomeun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "제목 「봄은 고양이로다」는 어떤 말인가요?",
        choices: ["봄을 고양이라고 곧장 말한 것", "봄에 고양이가 많다는 것", "고양이가 봄을 좋아한다는 것"],
        answer: "봄을 고양이라고 곧장 말한 것",
        explanation: "시 안에서는 '~와 같이'로 견주다가, 제목에서는 아예 '봄은 고양이'라고 못 박았어요."
    },
    {
        id: "metaphor-what",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "'~처럼'을 쓰지 않고 '~은 ~이다'로 말하면 어떤 힘이 생기나요?",
        choices: [
            "두 가지가 하나로 겹쳐 보여요",
            "글자 수가 줄어들어요",
            "뜻이 흐릿해져요"
        ],
        answer: "두 가지가 하나로 겹쳐 보여요",
        explanation: "'나는 나룻배'라고 하면 사람과 배가 한 몸이 돼요."
    },

    // ── 12차시 · 소리가 만드는 느낌 ───────────────────────────────
    {
        id: "doldam-sound",
        poemId: "yeongrang-doldam",
        category: "표현 찾기",
        prompt: "소리 내어 읽고 답해 보세요.",
        sentence: "이 시를 소리 내어 읽으면 어떤 느낌이 드나요?",
        choices: ["부드럽고 매끄러워요", "딱딱하고 세요", "빠르고 급해요"],
        answer: "부드럽고 매끄러워요",
        explanation: "속삭이는, 샘물, 살포시, 실비단처럼 ㄹ과 ㅅ 소리가 이어져요."
    },
    {
        id: "doldam-simile",
        poemId: "yeongrang-doldam",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'~같이'라는 말이 몇 번 나오나요?",
        choices: ["네 번", "두 번", "한 번"],
        answer: "네 번",
        explanation: "햇발같이, 샘물같이, 부끄럼같이, 물결같이. 견주는 말을 네 번 거듭했어요."
    },
    {
        id: "doldam-want",
        poemId: "yeongrang-doldam",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 하고 싶다고 한 일은 무엇인가요?",
        choices: ["하늘을 우러르고 바라보는 일", "돌담을 쌓는 일", "샘물을 마시는 일"],
        answer: "하늘을 우러르고 바라보는 일",
        explanation: "두 묶음 모두 하늘을 보고 싶다는 말로 끝나요."
    },
    {
        id: "bom-four-sounds",
        poemId: "dongju-bom",
        category: "표현 찾기",
        prompt: "소리 내어 읽고 답해 보세요.",
        sentence: "네 흉내말 가운데 가장 크고 쨍한 느낌을 주는 것은 무엇인가요?",
        choices: ["째앵째앵", "코올코올", "소올소올"],
        answer: "째앵째앵",
        explanation: "된소리와 ㅐ 소리가 겹쳐서 한낮의 볕처럼 쨍하게 들려요."
    },
    {
        id: "bom-soft-sounds",
        poemId: "dongju-bom",
        category: "표현 찾기",
        prompt: "소리 내어 읽고 답해 보세요.",
        sentence: "'코올코올'과 '소올소올'처럼 길게 늘여 쓰면 어떤 느낌이 드나요?",
        choices: ["느리고 나른해져요", "빠르고 급해져요", "무섭고 어두워져요"],
        answer: "느리고 나른해져요",
        explanation: "글자를 늘여 적으면 읽는 속도도 늘어져요."
    },
    {
        id: "omae-dialect",
        poemId: "kimyeongrang-omae",
        category: "표현 찾기",
        prompt: "소리 내어 읽고 답해 보세요.",
        sentence: "'오매'를 '어머나'로 바꾸어 읽으면 무엇이 달라지나요?",
        choices: ["누이가 사는 고장의 말맛이 사라져요", "뜻이 반대가 돼요", "시가 더 슬퍼져요"],
        answer: "누이가 사는 고장의 말맛이 사라져요",
        explanation: "사투리는 뜻만이 아니라 그 고장의 소리까지 함께 데려와요."
    },
    {
        id: "omae-repeat-sound",
        poemId: "kimyeongrang-omae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "“오매 단풍 들것네”는 몇 번 나오나요?",
        choices: ["네 번", "두 번", "한 번"],
        answer: "네 번",
        explanation: "두 묶음마다 처음과 끝에 놓여서 노랫가락처럼 돌아와요."
    },
    {
        id: "haetbi-sound-feel",
        poemId: "dongju-haetbi",
        category: "표현 찾기",
        prompt: "소리 내어 읽고 답해 보세요.",
        sentence: "'보슬보슬'을 '쏴아쏴아'로 바꾸면 무엇이 달라지나요?",
        choices: ["가늘던 비가 굵고 세차게 느껴져요", "비가 그친 느낌이 들어요", "아무 차이가 없어요"],
        answer: "가늘던 비가 굵고 세차게 느껴져요",
        explanation: "같은 비라도 어떤 소리로 적느냐에 따라 세기가 달라져요."
    },
    {
        id: "sound-why",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "시를 소리 내어 읽어 보아야 하는 까닭은 무엇인가요?",
        choices: [
            "글자의 뜻만으로는 알 수 없는 느낌이 소리에 담겨 있어서",
            "소리 내어 읽으면 더 빨리 읽을 수 있어서",
            "외우기 쉬워서"
        ],
        answer: "글자의 뜻만으로는 알 수 없는 느낌이 소리에 담겨 있어서",
        explanation: "부드러운 소리는 부드러운 마음을, 센 소리는 센 마음을 데려와요."
    },

    // ── 13차시 · 사물이 대신 우는 것 ──────────────────────────────
    {
        id: "cheonmalli-who",
        poemId: "wangbangyeon-cheonmalli",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 지금 어디에 앉아 있나요?",
        choices: ["냇가", "산꼭대기", "집 마당"],
        answer: "냇가",
        explanation: "고운 님을 멀리 보내고 마음 둘 데가 없어 냇가에 앉았어요."
    },
    {
        id: "cheonmalli-water",
        poemId: "wangbangyeon-cheonmalli",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'저 물도 내 안 같아서 울어'에서 정말 우는 것은 누구인가요?",
        choices: ["말하는 이", "냇물", "떠나간 님"],
        answer: "말하는 이",
        explanation: "물소리를 울음소리로 들은 거예요. 제 마음을 물에 옮겨 놓았어요."
    },
    {
        id: "cheonmalli-night",
        poemId: "wangbangyeon-cheonmalli",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "물이 '울어 밤길 예놋다'는 무슨 뜻인가요?",
        choices: ["울면서 밤길을 간다는 뜻", "밤에는 물이 마른다는 뜻", "밤에 물소리가 그친다는 뜻"],
        answer: "울면서 밤길을 간다는 뜻",
        explanation: "물도 나처럼 밤새 울며 흘러간다고 본 거예요."
    },
    {
        id: "chokbul-tears",
        poemId: "leegae-chokbul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "촛불의 무엇을 눈물로 보았나요?",
        choices: ["흘러내리는 촛농", "흔들리는 불꽃", "타는 심지"],
        answer: "흘러내리는 촛농",
        explanation: "겉으로 눈물지고 속은 탄다고 했어요. 촛농이 눈물, 심지가 속이에요."
    },
    {
        id: "chokbul-inside",
        poemId: "leegae-chokbul",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'저 촉불 날과 같아서'는 무엇을 말하나요?",
        choices: ["촛불과 내가 똑같이 속을 태우고 있다는 것", "촛불이 나를 비춘다는 것", "촛불이 곧 꺼진다는 것"],
        answer: "촛불과 내가 똑같이 속을 태우고 있다는 것",
        explanation: "겉으로만 눈물을 보이고 속이 타는 줄은 아무도 모른다는 말이에요."
    },
    {
        id: "chokbul-question",
        poemId: "leegae-chokbul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 줄에서 촛불에게 무엇을 묻나요?",
        choices: ["누구와 이별했느냐고", "언제 켜졌느냐고", "왜 이리 밝으냐고"],
        answer: "누구와 이별했느냐고",
        explanation: "대답할 수 없는 것에게 묻고, 스스로 답을 내려요."
    },
    {
        id: "jogae-empathy",
        poemId: "dongju-jogaekkeopjil",
        category: "견주어 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "조개껍데기가 그리워한다고 한 것은 사실 누구의 마음인가요?",
        choices: ["말하는 이의 마음", "언니의 마음", "바다의 마음"],
        answer: "말하는 이의 마음",
        explanation: "'나처럼 그리워하네'라고 했어요. 제 마음을 조개에 얹어 놓은 거예요."
    },
    {
        id: "empathy-how",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "냇물이 울고 촛불이 눈물짓는 시를 읽을 때는 무엇을 살펴야 하나요?",
        choices: [
            "그 마음이 정말 누구의 것인지",
            "물과 촛불이 어디에 있는지",
            "몇 줄로 되어 있는지"
        ],
        answer: "그 마음이 정말 누구의 것인지",
        explanation: "우는 것은 사물이 아니라, 그 사물을 바라보는 사람이에요."
    },

    // ── 14차시 · 처음과 끝이 어떻게 달라지나 ──────────────────────
    {
        id: "sanyuhwa-first",
        poemId: "sowol-sanyuhwa",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 묶음에서 꽃은 어떻게 된다고 했나요?",
        choices: ["피네", "지네", "떨어지네"],
        answer: "피네",
        explanation: "'산에는 꽃 피네'로 시작해요."
    },
    {
        id: "sanyuhwa-last",
        poemId: "sowol-sanyuhwa",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 묶음에서 꽃은 어떻게 된다고 했나요?",
        choices: ["지네", "피네", "웃네"],
        answer: "지네",
        explanation: "첫 묶음과 글자 하나만 다르고 나머지는 똑같아요."
    },
    {
        id: "sanyuhwa-change",
        poemId: "sowol-sanyuhwa",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'피네'가 '지네'로 바뀌면서 시는 무엇을 보여 주나요?",
        choices: ["피고 지기를 되풀이하는 산의 한 해", "꽃이 사라져 버린 산", "봄이 오지 않는 산"],
        answer: "피고 지기를 되풀이하는 산의 한 해",
        explanation: "'갈 봄 여름 없이'라는 말이 앞뒤에 똑같이 있어서, 그 되풀이가 끝없이 이어져요."
    },
    {
        id: "sanyuhwa-alone",
        poemId: "sowol-sanyuhwa",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'저만치 혼자서 피어 있네'는 어떤 느낌을 주나요?",
        choices: ["가까이 갈 수 없는 거리감", "함께 있는 든든함", "곧 꺾일 것 같은 불안함"],
        answer: "가까이 갈 수 없는 거리감",
        explanation: "'저만치'라는 한마디가 꽃과 나 사이에 거리를 놓아요."
    },
    {
        id: "gaeyeoul-start",
        poemId: "sowol-gaeyeoul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 무엇으로 시작하나요?",
        choices: ["물음", "다짐", "인사"],
        answer: "물음",
        explanation: "'당신은 무슨 일로 그리합니까?' 하고 물으며 시작해요."
    },
    {
        id: "gaeyeoul-end",
        poemId: "sowol-gaeyeoul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 무엇으로 끝나나요?",
        choices: ["또 다른 물음", "또렷한 대답", "이별 인사"],
        answer: "또 다른 물음",
        explanation: "'굳이 잊지 말라는 부탁인지요'로 끝나요. 물음으로 시작해 물음으로 닫혀요."
    },
    {
        id: "gaeyeoul-middle",
        poemId: "sowol-gaeyeoul",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "두 물음 사이에서 떠올린 것은 무엇인가요?",
        choices: ["가도 아주 가지는 않겠다던 약속", "개여울에서 놀던 어린 날", "떠나간 사람의 얼굴"],
        answer: "가도 아주 가지는 않겠다던 약속",
        explanation: "그 약속 한마디를 두 번 되뇌면서 날마다 개여울에 나와 앉아요."
    },
    {
        id: "saeroungil-frame",
        poemId: "dongju-saeroun-gil",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시의 처음 두 줄과 마지막 두 줄은 어떤가요?",
        choices: ["똑같아요", "정반대예요", "마지막이 더 길어요"],
        answer: "똑같아요",
        explanation: "'내를 건너서 숲으로 / 고개를 넘어서 마을로'가 앞뒤에 그대로 놓여요."
    },
    {
        id: "saeroungil-middle",
        poemId: "dongju-saeroun-gil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "같은 길인데 '새로운 길'이라고 한 까닭은 무엇인가요?",
        choices: [
            "길에서 만나는 것이 날마다 달라서",
            "길이 해마다 새로 나서",
            "길을 처음 가 보아서"
        ],
        answer: "길에서 만나는 것이 날마다 달라서",
        explanation: "민들레가 피고 까치가 날고 바람이 일어요. 가운데 묶음이 그 다름을 보여 줘요."
    },
    {
        id: "byeoltong-flow",
        poemId: "jiyong-byeoltong",
        category: "견주어 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 짧은 시에서 처음과 끝 사이에 흐른 것은 무엇인가요?",
        choices: ["어린 날부터 다 자랄 때까지의 세월", "하룻밤", "별똥이 떨어지는 한순간"],
        answer: "어린 날부터 다 자랄 때까지의 세월",
        explanation: "'가 보려' 마음먹은 때와 '다 자랐소' 사이가 시의 처음과 끝이에요."
    },

    // ── 15차시 · 시조의 틀 ────────────────────────────────────────
    {
        id: "hansanseom-lines",
        poemId: "leesunsin-hansanseom",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 몇 줄로 되어 있나요?",
        choices: ["세 줄", "네 줄", "여섯 줄"],
        answer: "세 줄",
        explanation: "시조는 세 줄로 된 옛 노래예요. 세 줄을 차례로 초장·중장·종장이라고 불러요."
    },
    {
        id: "hansanseom-where",
        poemId: "leesunsin-hansanseom",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 어디에 혼자 앉아 있나요?",
        choices: ["한산섬의 수루", "배 위", "바닷가 모래밭"],
        answer: "한산섬의 수루",
        explanation: "달 밝은 밤, 적을 살피는 높은 망대에 큰 칼을 차고 앉아 있어요."
    },
    {
        id: "hansanseom-turn",
        poemId: "leesunsin-hansanseom",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄은 어떤 말로 시작하나요?",
        choices: ["어디서", "한산섬", "큰 칼"],
        answer: "어디서",
        explanation: "시조의 마지막 줄은 이렇게 앞의 흐름을 한 번 꺾는 말로 시작하는 일이 많아요."
    },
    {
        id: "ouga-count",
        poemId: "yunseondo-ouga",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "여기 실린 「오우가」는 몇 수인가요?",
        choices: ["세 수", "다섯 수", "한 수"],
        answer: "세 수",
        explanation: "빈 줄로 나뉜 세 덩어리예요. 시조는 이렇게 여러 수를 이어 붙이기도 해요."
    },
    {
        id: "ouga-five",
        poemId: "yunseondo-ouga",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 수에서 꼽은 다섯 벗에 들지 않는 것은 무엇인가요?",
        choices: ["구름", "물", "달"],
        answer: "구름",
        explanation: "물·돌·소나무·대나무·달이 다섯 벗이에요. 구름은 둘째 수에서 '검기를 자주 한다'며 물리쳤어요."
    },
    {
        id: "ouga-water",
        poemId: "yunseondo-ouga",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "둘째 수에서 물을 벗으로 삼은 까닭은 무엇인가요?",
        choices: ["좋으면서도 그치는 때가 없어서", "빛깔이 고와서", "소리가 맑아서"],
        answer: "좋으면서도 그치는 때가 없어서",
        explanation: "구름은 자주 검어지고 바람은 그칠 때가 있지만 물은 늘 흐른다고 했어요."
    },
    {
        id: "ouga-rock",
        poemId: "yunseondo-ouga",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "셋째 수에서 바위를 벗으로 삼은 까닭은 무엇인가요?",
        choices: ["변하지 않아서", "단단해서", "오래되어서"],
        answer: "변하지 않아서",
        explanation: "꽃은 금방 지고 풀은 곧 누레지는데 바위는 그대로예요."
    },
    {
        id: "ouga-last-line",
        poemId: "yunseondo-ouga",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "세 수의 마지막 줄이 모두 비슷하게 시작하는 말은 무엇인가요?",
        choices: ["두어라, 좋고도, 아마도 같은 감탄하는 말", "물음을 던지는 말", "사람을 부르는 말"],
        answer: "두어라, 좋고도, 아마도 같은 감탄하는 말",
        explanation: "시조의 마지막 줄은 이렇게 감탄으로 시작해 생각을 매듭짓는 일이 많아요."
    },
    {
        id: "daechu-autumn",
        poemId: "hwanghui-daechu",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시조가 그린 철은 언제인가요?",
        choices: ["가을", "봄", "겨울"],
        answer: "가을",
        explanation: "대추가 붉고 밤이 떨어지고 벼를 벤 뒤예요."
    },
    {
        id: "daechu-drink",
        poemId: "hwanghui-daechu",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄에서 말하는 이는 무엇이라고 하나요?",
        choices: ["이만하면 아니 먹고 어찌하겠느냐고", "일을 더 해야겠다고", "가을이 짧아 아쉽다고"],
        answer: "이만하면 아니 먹고 어찌하겠느냐고",
        explanation: "가을에 저절로 갖추어진 것을 늘어놓다가 마지막 줄에서 웃으며 매듭지어요."
    },
    {
        id: "gukhwa-when",
        poemId: "leejeongbo-gukhwa",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "국화는 언제 피었다고 했나요?",
        choices: ["잎이 다 진 추운 때", "삼월 봄바람이 불 때", "한여름"],
        answer: "잎이 다 진 추운 때",
        explanation: "좋은 봄철을 다 보내고 홀로 추운 때에 피었어요."
    },
    {
        id: "gukhwa-answer",
        poemId: "leejeongbo-gukhwa",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 줄에서 던진 물음에 누가 답하나요?",
        choices: ["말하는 이가 스스로 답해요", "국화가 답해요", "아무도 답하지 않아요"],
        answer: "말하는 이가 스스로 답해요",
        explanation: "'아마도 오상고절은 너뿐인가 하노라'가 스스로 내린 답이에요."
    },
    {
        id: "sijo-shape",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시조들을 떠올려 보세요.",
        sentence: "시조 네 편에서 똑같이 찾을 수 있는 것은 무엇인가요?",
        choices: [
            "한 수가 세 줄로 되어 있다는 것",
            "모두 가을을 노래한다는 것",
            "모두 물음으로 시작한다는 것"
        ],
        answer: "한 수가 세 줄로 되어 있다는 것",
        explanation: "석 줄이 시조의 틀이에요. 마지막 줄은 대개 감탄이나 물음으로 앞을 한 번 꺾어요."
    },

    // ── 16차시 · 속마음과 반대로 말하기 ───────────────────────────
    {
        id: "jindallae-send",
        poemId: "sowol-jindallae",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "떠나는 사람에게 무엇을 하겠다고 했나요?",
        choices: ["말없이 보내 드리고 꽃을 뿌리겠다고", "붙잡고 울겠다고", "함께 떠나겠다고"],
        answer: "말없이 보내 드리고 꽃을 뿌리겠다고",
        explanation: "약산 진달래꽃을 한 아름 따다 가는 길에 뿌리겠다고 했어요."
    },
    {
        id: "jindallae-tears",
        poemId: "sowol-jindallae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'죽어도 아니 눈물 흘리오리다'는 정말 울지 않겠다는 뜻인가요?",
        choices: [
            "울음을 참을 수 없을 만큼 슬프다는 뜻이에요",
            "정말로 울지 않겠다는 뜻이에요",
            "울고 싶지 않다는 뜻이에요"
        ],
        answer: "울음을 참을 수 없을 만큼 슬프다는 뜻이에요",
        explanation: "'죽어도'라는 말을 붙인 것부터가 그만큼 힘들다는 표시예요. 겉말과 속마음이 반대예요."
    },
    {
        id: "jindallae-flower",
        poemId: "sowol-jindallae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "가는 길에 꽃을 뿌리는 것은 어떤 마음일까요?",
        choices: [
            "가지 말라는 말을 차마 못 하고 대신 하는 몸짓",
            "빨리 가라고 재촉하는 몸짓",
            "떠나는 것을 축하하는 몸짓"
        ],
        answer: "가지 말라는 말을 차마 못 하고 대신 하는 몸짓",
        explanation: "밟고 가라고 깔아 놓은 꽃은 붙잡지 못하는 마음이 만든 길이에요."
    },
    {
        id: "jindallae-frame2",
        poemId: "sowol-jindallae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 묶음과 마지막 묶음에서 똑같이 되풀이된 말은 무엇인가요?",
        choices: ["나 보기가 역겨워 가실 때에는", "영변에 약산 진달래꽃", "사뿐히 즈려밟고"],
        answer: "나 보기가 역겨워 가실 때에는",
        explanation: "같은 말로 시작해서 같은 말로 돌아오는데, 끝에서는 눈물 이야기가 붙어요."
    },
    {
        id: "meonhuil-count",
        poemId: "sowol-meonhuil",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "“잊었노라”는 몇 번 나오나요?",
        choices: ["네 번", "두 번", "한 번"],
        answer: "네 번",
        explanation: "묶음마다 한 번씩 되풀이돼요."
    },
    {
        id: "meonhuil-truth",
        poemId: "sowol-meonhuil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 묶음에서 스스로 밝힌 사실은 무엇인가요?",
        choices: ["오늘도 어제도 잊지 않았다는 것", "이미 다 잊었다는 것", "잊으려고 애쓴다는 것"],
        answer: "오늘도 어제도 잊지 않았다는 것",
        explanation: "앞에서 세 번이나 잊었다고 해 놓고, 끝에서 아직 잊지 않았다고 털어놓아요."
    },
    {
        id: "meonhuil-future",
        poemId: "sowol-meonhuil",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "“잊었노라”라고 말하겠다는 때는 언제인가요?",
        choices: ["아직 오지 않은 먼 훗날", "바로 오늘", "어제"],
        answer: "아직 오지 않은 먼 훗날",
        explanation: "지금은 못 잊었으니, 잊었다는 말은 오지 않은 날로 미뤄 두는 거예요."
    },
    {
        id: "dukkeobi-fall",
        poemId: "sasol-dukkeobi",
        category: "장면 확인",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "두꺼비는 흰 매를 보고 어떻게 되었나요?",
        choices: ["놀라 뛰다가 두엄 아래로 자빠졌어요", "재빨리 숨었어요", "파리를 놓치고 도망쳤어요"],
        answer: "놀라 뛰다가 두엄 아래로 자빠졌어요",
        explanation: "가슴이 철렁해서 풀떡 뛰어 내닫다가 굴러떨어졌어요."
    },
    {
        id: "dukkeobi-boast",
        poemId: "sasol-dukkeobi",
        category: "마음 읽기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "자빠진 두꺼비가 마지막 줄에서 하는 말은 무엇인가요?",
        choices: ["내가 날래서 멍이 안 들었다고 뽐내요", "다시는 안 그러겠다고 다짐해요", "매가 무섭다고 하소연해요"],
        answer: "내가 날래서 멍이 안 들었다고 뽐내요",
        explanation: "'모쳐라 날랜 낼시망정'이 바로 그 자랑이에요."
    },
    {
        id: "dukkeobi-satire",
        poemId: "sasol-dukkeobi",
        category: "표현 찾기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "이 노래는 두꺼비를 어떻게 다루고 있나요?",
        choices: [
            "치켜세우는 척하면서 우습게 만들어요",
            "정말로 날래다고 칭찬해요",
            "불쌍하다고 위로해요"
        ],
        answer: "치켜세우는 척하면서 우습게 만들어요",
        explanation: "약한 파리에게는 사납고 센 매 앞에서는 자빠지는 모습을 그려서 비웃어요."
    },
    {
        id: "irony-what",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "겉말과 속마음이 반대인 말을 읽을 때는 무엇을 보아야 하나요?",
        choices: [
            "그렇게 말할 수밖에 없었던 사정",
            "말한 사람의 나이",
            "글자가 몇 개인지"
        ],
        answer: "그렇게 말할 수밖에 없었던 사정",
        explanation: "울지 않겠다는 말도 잊었다는 말도, 그 반대를 참고 있어서 나온 말이에요."
    },

    // ── 17차시 · 앞뒤가 안 맞는 말 ────────────────────────────────
    {
        id: "bokjong-sweet",
        poemId: "manhae-bokjong",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 복종이 무엇보다 달콤하다고 했나요?",
        choices: ["아름다운 자유", "높은 이름", "편안한 잠"],
        answer: "아름다운 자유",
        explanation: "누구나 자유가 더 좋다고 하는데, 이 시는 거꾸로 말해요."
    },
    {
        id: "bokjong-choice",
        poemId: "manhae-bokjong",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'복종하고 싶은데 복종하는 것'이라는 말은 무엇을 알려 주나요?",
        choices: [
            "스스로 골라서 하는 복종이라는 것",
            "억지로 시켜서 하는 복종이라는 것",
            "복종하기가 싫다는 것"
        ],
        answer: "스스로 골라서 하는 복종이라는 것",
        explanation: "스스로 고른 복종이니 그 안에 이미 자유가 들어 있어요. 그래서 앞뒤가 통해요."
    },
    {
        id: "bokjong-refuse",
        poemId: "manhae-bokjong",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 딱 하나 복종할 수 없다고 한 것은 무엇인가요?",
        choices: ["다른 사람에게 복종하라는 것", "혼자 지내라는 것", "자유를 버리라는 것"],
        answer: "다른 사람에게 복종하라는 것",
        explanation: "그러면 당신에게 복종할 수 없게 되니까요."
    },
    {
        id: "alsu-ash",
        poemId: "manhae-alsu",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'타고 남은 재가 다시 기름이 됩니다'는 실제로 일어날 수 있는 일인가요?",
        choices: [
            "일어날 수 없지만 끝나지 않는 마음을 그렇게 말한 거예요",
            "실제로 일어나는 일이에요",
            "잘못 적은 말이에요"
        ],
        answer: "일어날 수 없지만 끝나지 않는 마음을 그렇게 말한 거예요",
        explanation: "다 타서 없어졌는데 또 탈 수 있다는 말이에요. 그만큼 그치지 않는다는 뜻이에요."
    },
    {
        id: "alsu-questions",
        poemId: "manhae-alsu",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시의 줄들은 대부분 무엇으로 끝나나요?",
        choices: ["누구의 무엇입니까 하는 물음", "다짐하는 말", "부르는 말"],
        answer: "누구의 무엇입니까 하는 물음",
        explanation: "발자취·얼굴·입김·노래·시로 이름만 바꾸어 가며 같은 물음을 거듭해요."
    },
    {
        id: "alsu-lamp",
        poemId: "manhae-alsu",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄에서 자기 가슴을 무엇이라고 했나요?",
        choices: ["누구의 밤을 지키는 약한 등불", "꺼지지 않는 큰 불길", "재가 된 화로"],
        answer: "누구의 밤을 지키는 약한 등불",
        explanation: "약한 등불이지만 밤을 지킨다고 했어요. 작고 약한 것에 큰 일을 맡겼어요."
    },
    {
        id: "narutbae-paradox",
        poemId: "manhae-narutbae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "짓밟히면서도 안고 건너가는 모습은 어떤 말인가요?",
        choices: [
            "앞뒤가 안 맞아 보이지만 그만큼 깊은 마음을 보여 주는 말",
            "잘못 쓴 말",
            "화가 났다는 말"
        ],
        answer: "앞뒤가 안 맞아 보이지만 그만큼 깊은 마음을 보여 주는 말",
        explanation: "흙발로 밟는 사람을 그대로 안고 건너요. 말이 어긋날수록 마음이 커 보여요."
    },
    {
        id: "paradox-what",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "앞뒤가 안 맞는 말을 시에서 쓰는 까닭은 무엇인가요?",
        choices: [
            "보통 말로는 담기지 않는 마음을 담으려고",
            "읽는 사람을 헷갈리게 하려고",
            "시를 길게 늘이려고"
        ],
        answer: "보통 말로는 담기지 않는 마음을 담으려고",
        explanation: "자유보다 달콤한 복종, 다시 기름이 되는 재. 말이 어긋난 자리에 뜻이 생겨요."
    },

    // ── 18차시 · 하나가 여러 뜻 ───────────────────────────────────
    {
        id: "seosi-star",
        poemId: "dongju-seosi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시에서 '별'은 무엇을 함께 가리키나요?",
        choices: [
            "밤하늘의 별이면서 부끄럼 없이 살고 싶은 마음",
            "밤하늘의 별 하나뿐",
            "멀리 있는 고향"
        ],
        answer: "밤하늘의 별이면서 부끄럼 없이 살고 싶은 마음",
        explanation: "눈에 보이는 것 하나가 보이지 않는 뜻까지 함께 지고 있어요."
    },
    {
        id: "seosi-wind",
        poemId: "dongju-seosi",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'잎새에 이는 바람에도 나는 괴로워했다'는 무엇을 보여 주나요?",
        choices: ["아주 작은 일에도 부끄러워하는 마음", "바람을 무서워하는 마음", "나뭇잎을 아끼는 마음"],
        answer: "아주 작은 일에도 부끄러워하는 마음",
        explanation: "잎을 흔드는 바람만큼 작은 일에도 마음이 걸린다는 말이에요."
    },
    {
        id: "seosi-last",
        poemId: "dongju-seosi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 한 줄이 따로 떨어져 있는 까닭은 무엇일까요?",
        choices: [
            "다짐을 끝낸 뒤 다시 밤하늘로 눈을 돌리게 하려고",
            "글자가 남아서",
            "다른 시가 이어져서"
        ],
        answer: "다짐을 끝낸 뒤 다시 밤하늘로 눈을 돌리게 하려고",
        explanation: "앞에서 다짐한 마음이 그대로 별이 되어 밤바람에 스쳐요."
    },
    {
        id: "cheongpodo-guest",
        poemId: "yuksa-cheongpodo",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'청포를 입고 찾아온다'는 손님은 누구를 가리킬까요?",
        choices: [
            "이름을 대지 않은 채 기다리는 무언가",
            "이웃 마을에 사는 친구",
            "포도를 사러 오는 장수"
        ],
        answer: "이름을 대지 않은 채 기다리는 무언가",
        explanation: "누구인지 밝히지 않았기 때문에, 읽는 사람마다 자기가 기다리는 것을 떠올리게 돼요."
    },
    {
        id: "cheongpodo-white",
        poemId: "yuksa-cheongpodo",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "푸른 것들 사이에 놓인 흰 것으로 나오지 않은 것은 무엇인가요?",
        choices: ["흰 구름", "흰 돛단배", "하얀 모시 수건"],
        answer: "흰 구름",
        explanation: "흰 돛단배, 은쟁반, 하얀 모시 수건이 푸른 빛 사이에서 도드라져요."
    },
    {
        id: "cheongpodo-prepare",
        poemId: "yuksa-cheongpodo",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 묶음에서 아이에게 시킨 일은 무엇인가요?",
        choices: ["은쟁반에 모시 수건을 마련해 두라는 것", "포도를 따 오라는 것", "손님을 마중 나가라는 것"],
        answer: "은쟁반에 모시 수건을 마련해 두라는 것",
        explanation: "손님은 아직 오지 않았지만 상은 미리 차려 놓아요. 기다림이 그만큼 간절해요."
    },
    {
        id: "saseum-neck",
        poemId: "nocheonmyeong-saseum",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 줄에서 사슴을 무엇이라고 불렀나요?",
        choices: ["모가지가 길어서 슬픈 짐승", "관이 향기로운 임금", "물속의 그림자"],
        answer: "모가지가 길어서 슬픈 짐승",
        explanation: "긴 목이 왜 슬픈 것인지 말하지 않고 그대로 두어서 더 오래 남아요."
    },
    {
        id: "saseum-mirror",
        poemId: "nocheonmyeong-saseum",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "사슴이 물속을 들여다보고 떠올린 것은 무엇인가요?",
        choices: ["잃었던 전설", "먹이가 있는 곳", "쫓아오던 사냥꾼"],
        answer: "잃었던 전설",
        explanation: "높은 족속이었던 옛날을 떠올리고는 먼 데 산을 바라봐요."
    },
    {
        id: "saseum-self",
        poemId: "nocheonmyeong-saseum",
        category: "견주어 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시에서 사슴은 결국 누구를 가리키나요?",
        choices: ["말하는 이 자신", "산에 사는 진짜 사슴", "먼 데 산"],
        answer: "말하는 이 자신",
        explanation: "제 그림자를 들여다보고 옛날을 그리워하는 것은 사람이 하는 일이에요."
    },
    {
        id: "symbol-what",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "별이나 손님처럼 여러 뜻을 지닌 말을 만나면 어떻게 읽어야 하나요?",
        choices: [
            "눈에 보이는 뜻과 숨은 뜻을 함께 짚어 봐요",
            "사전에 나온 뜻 하나만 골라요",
            "그 줄은 건너뛰어요"
        ],
        answer: "눈에 보이는 뜻과 숨은 뜻을 함께 짚어 봐요",
        explanation: "하나만 고르면 시가 반쪽이 돼요. 둘이 겹쳐 있을 때 가장 넓게 읽혀요."
    },

    // ── 19차시 · 맞세우기 ─────────────────────────────────────────
    {
        id: "jahwasang-feel",
        poemId: "dongju-jahwasang",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "우물 속 사나이를 보는 마음은 어떻게 바뀌나요?",
        choices: [
            "미움 → 가엾음 → 미움 → 그리움",
            "그리움 → 미움 → 그리움",
            "처음부터 끝까지 미움"
        ],
        answer: "미움 → 가엾음 → 미움 → 그리움",
        explanation: "돌아섰다가 되돌아오기를 되풀이해요. 반대되는 두 마음이 번갈아 나와요."
    },
    {
        id: "jahwasang-who",
        poemId: "dongju-jahwasang",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "우물 속 사나이는 누구인가요?",
        choices: ["말하는 이 자신", "우물가에 온 낯선 사람", "돌아가신 아버지"],
        answer: "말하는 이 자신",
        explanation: "제목이 「자화상」이에요. 스스로를 미워했다 그리워했다 하는 거예요."
    },
    {
        id: "jahwasang-last",
        poemId: "dongju-jahwasang",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄이 둘째 줄과 다른 점은 무엇인가요?",
        choices: ["'추억처럼 사나이가 있습니다'가 덧붙었어요", "달이 사라졌어요", "가을이 겨울로 바뀌었어요"],
        answer: "'추억처럼 사나이가 있습니다'가 덧붙었어요",
        explanation: "똑같은 풍경으로 돌아왔는데 사나이를 보는 눈이 달라졌어요."
    },
    {
        id: "cheongpodo-contrast",
        poemId: "yuksa-cheongpodo",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시에서 맞세워 놓은 두 빛깔은 무엇인가요?",
        choices: ["푸른빛과 흰빛", "붉은빛과 검은빛", "노란빛과 초록빛"],
        answer: "푸른빛과 흰빛",
        explanation: "청포도·푸른 바다·청포에 흰 돛단배·은쟁반·모시 수건이 맞놓여요."
    },
    {
        id: "sanyuhwa-contrast",
        poemId: "sowol-sanyuhwa",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 묶음과 마지막 묶음을 맞세워 보면 무엇이 드러나나요?",
        choices: ["피는 일과 지는 일이 늘 함께 있다는 것", "산에는 꽃이 없다는 것", "봄이 가장 좋다는 것"],
        answer: "피는 일과 지는 일이 늘 함께 있다는 것",
        explanation: "글자 하나만 바꾸어 맞세웠기 때문에 그 차이가 더 크게 보여요."
    },
    {
        id: "saseum-contrast",
        poemId: "nocheonmyeong-saseum",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "사슴에게 맞놓인 두 가지는 무엇인가요?",
        choices: [
            "높은 족속이었다는 것과 지금 슬프다는 것",
            "긴 목과 짧은 다리",
            "산과 물"
        ],
        answer: "높은 족속이었다는 것과 지금 슬프다는 것",
        explanation: "향기로운 관을 쓴 높은 족속인데, 지금은 슬픈 모가지로 먼 산만 봐요."
    },
    {
        id: "contrast-why",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "반대되는 것을 나란히 놓으면 무엇이 좋은가요?",
        choices: [
            "서로가 서로를 도드라지게 해요",
            "시가 짧아져요",
            "뜻이 하나로 좁혀져요"
        ],
        answer: "서로가 서로를 도드라지게 해요",
        explanation: "푸른빛 곁의 흰빛이 더 희고, 피는 꽃 곁의 지는 꽃이 더 쓸쓸해요."
    },

    // ── 20차시 · 두 편 나란히 읽기 ────────────────────────────────
    {
        id: "hayeoga-ask",
        poemId: "leebangwon-hayeoga",
        category: "마음 읽기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "이 시조가 상대에게 건네는 말은 무엇인가요?",
        choices: ["우리도 어울려 함께 살자는 말", "떠나라는 말", "싸우자는 말"],
        answer: "우리도 어울려 함께 살자는 말",
        explanation: "얽힌 칡덩굴처럼 함께 백년을 누리자고 꾀어요."
    },
    {
        id: "hayeoga-chik",
        poemId: "leebangwon-hayeoga",
        category: "표현 찾기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "만수산 드렁칡을 끌어온 까닭은 무엇인가요?",
        choices: [
            "얽혀서 함께 사는 모습을 보여 주려고",
            "산이 아름답다고 자랑하려고",
            "칡을 캐러 가자고 하려고"
        ],
        answer: "얽혀서 함께 사는 모습을 보여 주려고",
        explanation: "눈에 보이는 것 하나로 하고 싶은 말을 대신했어요."
    },
    {
        id: "dansimga-answer",
        poemId: "jeongmongju-dansimga",
        category: "마음 읽기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "이 시조가 내놓은 대답은 무엇인가요?",
        choices: ["마음은 변하지 않는다는 것", "함께 살겠다는 것", "생각해 보겠다는 것"],
        answer: "마음은 변하지 않는다는 것",
        explanation: "백 번 고쳐 죽고 뼈가 흙이 되어도 그 마음은 변할 리 없다고 했어요."
    },
    {
        id: "dansimga-hundred",
        poemId: "jeongmongju-dansimga",
        category: "표현 찾기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "'일백 번 고쳐 죽어'는 어떤 표현인가요?",
        choices: ["크게 부풀려 마음의 굳기를 보여 주는 말", "실제로 일어난 일", "겁을 주는 말"],
        answer: "크게 부풀려 마음의 굳기를 보여 주는 말",
        explanation: "한 번도 어려운 일을 백 번이라고 해서 변하지 않음을 못 박아요."
    },
    {
        id: "two-sijo-shape",
        poemId: "jeongmongju-dansimga",
        category: "견주어 읽기",
        prompt: "두 시조를 나란히 놓고 답해 보세요.",
        sentence: "「하여가」와 「단심가」의 같은 점은 무엇인가요?",
        choices: ["둘 다 세 줄짜리 시조라는 것", "둘 다 같은 답을 낸다는 것", "둘 다 자연을 노래한다는 것"],
        answer: "둘 다 세 줄짜리 시조라는 것",
        explanation: "같은 틀에 정반대의 뜻을 담았기 때문에 견주어 읽기가 더 또렷해요."
    },
    {
        id: "two-sijo-diff",
        poemId: "leebangwon-hayeoga",
        category: "견주어 읽기",
        prompt: "두 시조를 나란히 놓고 답해 보세요.",
        sentence: "두 시조의 다른 점은 무엇인가요?",
        choices: [
            "하나는 어울리자고 하고 하나는 변할 수 없다고 해요",
            "하나는 길고 하나는 짧아요",
            "하나는 노래이고 하나는 편지예요"
        ],
        answer: "하나는 어울리자고 하고 하나는 변할 수 없다고 해요",
        explanation: "묻는 노래와 답하는 노래예요. 한 편만 읽으면 절반만 읽은 것이 돼요."
    },
    {
        id: "two-sowol-same",
        poemId: "sowol-jindallae",
        category: "견주어 읽기",
        prompt: "「진달래꽃」과 「먼 후일」을 나란히 놓고 답해 보세요.",
        sentence: "두 시가 똑같이 쓰는 방법은 무엇인가요?",
        choices: [
            "속마음과 반대로 말하기",
            "사물을 사람처럼 그리기",
            "소리를 흉내내기"
        ],
        answer: "속마음과 반대로 말하기",
        explanation: "울지 않겠다는 말과 잊었다는 말이 둘 다 반대예요."
    },
    {
        id: "two-sowol-diff",
        poemId: "sowol-meonhuil",
        category: "견주어 읽기",
        prompt: "「진달래꽃」과 「먼 후일」을 나란히 놓고 답해 보세요.",
        sentence: "두 시가 서 있는 때는 어떻게 다른가요?",
        choices: [
            "하나는 보내는 순간을, 하나는 먼 훗날을 말해요",
            "둘 다 지난날을 돌아봐요",
            "둘 다 오늘 일을 말해요"
        ],
        answer: "하나는 보내는 순간을, 하나는 먼 훗날을 말해요",
        explanation: "「진달래꽃」은 떠나는 길 위에서, 「먼 후일」은 아직 오지 않은 날에 대고 말해요."
    },
    {
        id: "compare-how",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 시들을 떠올려 보세요.",
        sentence: "두 편을 나란히 읽으면 무엇이 잘 보이나요?",
        choices: [
            "한 편만 볼 때는 안 보이던 같은 점과 다른 점",
            "어느 시가 더 긴지",
            "어느 시가 더 오래되었는지"
        ],
        answer: "한 편만 볼 때는 안 보이던 같은 점과 다른 점",
        explanation: "같은 틀에 다른 뜻이 담겼을 때, 견주어 보아야 그 뜻이 드러나요."
    },

    // ── 21차시 · 옛 노래의 후렴과 가락 ────────────────────────────
    {
        id: "cheongsan-refrain",
        poemId: "goryeo-cheongsan",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "'얄리얄리 얄랑셩 얄라리 얄라'에는 어떤 뜻이 있나요?",
        choices: ["뜻은 없고 가락을 맞추는 소리예요", "청산에 살자는 뜻이에요", "새 울음소리예요"],
        answer: "뜻은 없고 가락을 맞추는 소리예요",
        explanation: "뜻이 없어도 노래를 굴러가게 하고 슬픔을 견딜 만하게 만들어요."
    },
    {
        id: "cheongsan-where",
        poemId: "goryeo-cheongsan",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "어디에서 살고 싶다고 했나요?",
        choices: ["청산", "바다", "도읍"],
        answer: "청산",
        explanation: "머루와 다래를 먹고 청산에 살고 싶다고 했어요."
    },
    {
        id: "cheongsan-bird",
        poemId: "goryeo-cheongsan",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "우는 새를 보고 말하는 이는 무엇이라고 하나요?",
        choices: ["너보다 걱정 많은 나도 자고 일어나 운다고", "울지 말라고", "새가 부럽다고"],
        answer: "너보다 걱정 많은 나도 자고 일어나 운다고",
        explanation: "새 울음에 제 울음을 겹쳐 놓았어요."
    },
    {
        id: "gasiri-refrain",
        poemId: "goryeo-gasiri",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "'위 증즐가 대평성대'는 몇 번 나오나요?",
        choices: ["네 번", "두 번", "한 번"],
        answer: "네 번",
        explanation: "묶음마다 끝에 한 번씩 붙어요."
    },
    {
        id: "gasiri-mismatch",
        poemId: "goryeo-gasiri",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "슬픈 이별 노래에 흥겨운 후렴이 붙어 있는 것을 어떻게 볼 수 있을까요?",
        choices: [
            "여럿이 함께 부르던 노래라 가락이 따로 붙은 것이에요",
            "이별이 기쁜 일이었다는 뜻이에요",
            "잘못 적힌 것이에요"
        ],
        answer: "여럿이 함께 부르던 노래라 가락이 따로 붙은 것이에요",
        explanation: "글로 읽으면 어긋나 보이지만, 노래로 부르면 후렴이 있어야 함께 부를 수 있어요."
    },
    {
        id: "gasiri-hope",
        poemId: "goryeo-gasiri",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "마지막 묶음에서 떠나는 님에게 무엇을 바라나요?",
        choices: ["가시는 듯 곧 돌아오라는 것", "다시는 오지 말라는 것", "함께 가자는 것"],
        answer: "가시는 듯 곧 돌아오라는 것",
        explanation: "붙잡으면 서운해서 아니 올까 봐 보내면서, 곧 돌아오라고만 해요."
    },
    {
        id: "guji-three",
        poemId: "gojia-guji",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "네 줄 안에 담긴 세 걸음을 차례대로 고르세요.",
        choices: [
            "부르기 → 시키기 → 으르기",
            "묻기 → 답하기 → 웃기",
            "칭찬하기 → 부탁하기 → 헤어지기"
        ],
        answer: "부르기 → 시키기 → 으르기",
        explanation: "거북을 부르고, 머리를 내라 하고, 안 내면 구워 먹겠다고 해요."
    },
    {
        id: "guji-call",
        poemId: "gojia-guji",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "첫 줄에서 거북을 두 번 부른 까닭은 무엇일까요?",
        choices: [
            "여럿이 함께 부르기 좋게 가락을 만들려고",
            "거북이 둘이라서",
            "잘못 적혀서"
        ],
        answer: "여럿이 함께 부르기 좋게 가락을 만들려고",
        explanation: "되풀이는 노래의 가장 오래된 뼈대예요."
    },
    {
        id: "hyangsu-refrain",
        poemId: "jiyong-hyangsu",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "다섯 묶음마다 똑같이 돌아오는 줄은 무엇인가요?",
        choices: [
            "그곳이 참하 꿈엔들 잊힐 리야",
            "넓은 벌 동쪽 끝으로",
            "흙에서 자란 내 마음"
        ],
        answer: "그곳이 참하 꿈엔들 잊힐 리야",
        explanation: "옛 노래의 후렴이 현대시에 그대로 살아 있는 자리예요."
    },
    {
        id: "hyangsu-scenes",
        poemId: "jiyong-hyangsu",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "후렴 앞에 놓인 것은 무엇인가요?",
        choices: [
            "묶음마다 다른 고향의 장면",
            "묶음마다 같은 장면",
            "고향을 떠나던 날의 이야기"
        ],
        answer: "묶음마다 다른 고향의 장면",
        explanation: "실개천, 질화로와 아버지, 화살을 찾던 들, 누이와 아내, 초라한 지붕이 차례로 나와요."
    },
    {
        id: "hyangsu-old-new",
        poemId: "jiyong-hyangsu",
        category: "견주어 읽기",
        prompt: "「가시리」·「청산별곡」과 나란히 놓고 답해 보세요.",
        sentence: "세 노래가 똑같이 쓰는 방법은 무엇인가요?",
        choices: [
            "묶음마다 같은 줄을 되돌려 놓는 것",
            "묶음마다 다른 후렴을 쓰는 것",
            "후렴 없이 이어 가는 것"
        ],
        answer: "묶음마다 같은 줄을 되돌려 놓는 것",
        explanation: "고려 때 노래에서 쓰던 방법을 오백 년 뒤의 시가 그대로 쓰고 있어요."
    },
    {
        id: "oldsong-why",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 차시에서 읽은 노래들을 떠올려 보세요.",
        sentence: "옛 노래에 뜻 없는 후렴이 붙어 있는 까닭은 무엇인가요?",
        choices: [
            "글로 읽으려고 지은 것이 아니라 여럿이 부르려고 지었기 때문에",
            "글자가 모자라서",
            "뜻을 감추려고"
        ],
        answer: "글로 읽으려고 지은 것이 아니라 여럿이 부르려고 지었기 때문에",
        explanation: "후렴이 있어야 다 함께 들어와 부를 수 있어요. 노래로 태어난 자국이에요."
    },

    // ── 중1 · 정지용 다시 읽기 ────────────────────────────────────
    {
        id: "yurichang-what",
        poemId: "jiyong-yurichang",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "유리에 어른거리는 '차고 슬픈 것'은 무엇을 가리키나요?",
        choices: ["세상을 떠난 아이의 모습", "밤하늘의 별", "유리에 낀 성에"],
        answer: "세상을 떠난 아이의 모습",
        explanation: "마지막 줄의 '너는 산새처럼 날아갔구나'와 찢어진 폐혈관이 그 사정을 알려 줘요."
    },
    {
        id: "yurichang-action",
        poemId: "jiyong-yurichang",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 밤에 홀로 하는 일은 무엇인가요?",
        choices: ["유리를 닦는 일", "별을 세는 일", "창문을 여는 일"],
        answer: "유리를 닦는 일",
        explanation: "입김을 흐리고 지우고 보고 지우고 보는 것이 그 일이에요."
    },
    {
        id: "yurichang-paradox",
        poemId: "jiyong-yurichang",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'외로운 황홀한 심사'는 어떤 말인가요?",
        choices: [
            "어긋나는 두 말을 붙여 슬픔과 그리움이 겹친 마음을 보여 줘요",
            "외로움이 다 사라졌다는 말이에요",
            "잘못 쓴 말이에요"
        ],
        answer: "어긋나는 두 말을 붙여 슬픔과 그리움이 겹친 마음을 보여 줘요",
        explanation: "외로운데 황홀해요. 유리 너머에서 아이를 만나는 듯한 마음이라 그래요."
    },
    {
        id: "yurichang-restraint",
        poemId: "jiyong-yurichang",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 슬픔을 어떻게 드러내나요?",
        choices: [
            "울부짖지 않고 유리 닦는 손과 별 하나로 눌러서",
            "슬프다는 말을 여러 번 되풀이해서",
            "큰 소리로 이름을 불러서"
        ],
        answer: "울부짖지 않고 유리 닦는 손과 별 하나로 눌러서",
        explanation: "'아아' 한 마디를 빼면 감정을 말하는 낱말이 거의 없어요. 그래서 더 아파요."
    },
    {
        id: "yurichang-bird",
        poemId: "jiyong-yurichang",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄에서 '너'를 무엇에 견주었나요?",
        choices: ["산새", "별", "입김"],
        answer: "산새",
        explanation: "앞에서 '언 날개를 파다거린다'고 한 것이 여기서 산새로 이어져요."
    },
    {
        id: "hyangsu-star-again",
        poemId: "jiyong-hyangsu",
        category: "견주어 읽기",
        prompt: "「향수」와 「유리창 1」을 나란히 놓고 답해 보세요.",
        sentence: "두 시의 밤 장면에 똑같이 나오는 것은 무엇인가요?",
        choices: ["별", "달", "촛불"],
        answer: "별",
        explanation: "「향수」에는 성근 별이, 「유리창 1」에는 물 먹은 별이 있어요."
    },
    {
        id: "jiyong-habit",
        poemId: "",
        category: "견주어 읽기",
        prompt: "정지용의 시 네 편을 떠올려 보세요.",
        sentence: "정지용이 즐겨 쓰는 방법은 무엇인가요?",
        choices: [
            "마음을 곧장 말하지 않고 눈에 보이는 것으로 그려요",
            "마음을 첫 줄에 크게 외쳐요",
            "사물을 사람처럼 말하게 해요"
        ],
        answer: "마음을 곧장 말하지 않고 눈에 보이는 것으로 그려요",
        explanation: "호수, 별똥, 실개천, 유리창. 그림을 보여 주고 마음은 그 뒤에 숨겨요."
    },
    {
        id: "jiyong-new",
        poemId: "",
        category: "견주어 읽기",
        prompt: "정지용의 시 네 편을 떠올려 보세요.",
        sentence: "처음 보는 정지용의 시를 만나면 무엇부터 찾으면 좋은가요?",
        choices: [
            "감각으로 그린 장면과 그 뒤에 눌러 둔 마음",
            "몇 줄로 되어 있는지",
            "지은 해가 언제인지"
        ],
        answer: "감각으로 그린 장면과 그 뒤에 눌러 둔 마음",
        explanation: "시험에는 아는 시인의 처음 보는 시가 나와요. 시인의 버릇을 알면 길이 보여요."
    },

    // ── 중1 · 김소월 다시 읽기 ────────────────────────────────────
    {
        id: "ganeungil-hesitate",
        poemId: "sowol-ganeungil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "앞의 두 묶음에서 말하는 이는 무엇을 하고 있나요?",
        choices: ["갈까 말까 머뭇거려요", "빨리 떠나려고 서둘러요", "돌아가서 인사를 해요"],
        answer: "갈까 말까 머뭇거려요",
        explanation: "'말을 할까', '그냥 갈까', '다시 더 한 번'이 다 망설이는 말이에요."
    },
    {
        id: "ganeungil-crow",
        poemId: "sowol-ganeungil",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "까마귀가 지저귀는 말은 무엇인가요?",
        choices: ["서산에 해가 진다고", "어서 돌아오라고", "비가 온다고"],
        answer: "서산에 해가 진다고",
        explanation: "날이 저문다고 알려서 떠날 때가 되었다고 재촉해요."
    },
    {
        id: "ganeungil-water",
        poemId: "sowol-ganeungil",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "강물이 하는 말은 무엇인가요?",
        choices: ["어서 따라오라고, 따라가자고", "여기 머물라고", "돌아가라고"],
        answer: "어서 따라오라고, 따라가자고",
        explanation: "흐르는 물이 사람처럼 말을 걸어요. 앞 강물 뒷 강물이 연달아 재촉해요."
    },
    {
        id: "ganeungil-contrast",
        poemId: "sowol-ganeungil",
        category: "견주어 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "머뭇거리는 사람과 재촉하는 자연을 맞세운 까닭은 무엇인가요?",
        choices: [
            "떠나야 하는데 발이 떨어지지 않는 마음을 보여 주려고",
            "자연이 사람보다 빠르다는 것을 보여 주려고",
            "해 지는 풍경이 아름다워서"
        ],
        answer: "떠나야 하는데 발이 떨어지지 않는 마음을 보여 주려고",
        explanation: "둘레는 다 흘러가는데 나만 서 있어요. 그 어긋남이 시의 마음이에요."
    },
    {
        id: "jeopdongsae-who",
        poemId: "sowol-jeopdongsae",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "접동새가 된 사람은 누구인가요?",
        choices: ["의붓어미의 시샘에 죽은 누나", "진두강에 빠진 동생", "먼 데로 떠난 어머니"],
        answer: "의붓어미의 시샘에 죽은 누나",
        explanation: "죽어서 새가 되어 앞마을에 와서 운다고 했어요."
    },
    {
        id: "jeopdongsae-why-cry",
        poemId: "sowol-jeopdongsae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "밤마다 우는 까닭은 무엇인가요?",
        choices: ["남은 아홉 동생을 잊지 못해서", "새가 된 것이 억울해서", "집으로 돌아가는 길을 몰라서"],
        answer: "남은 아홉 동생을 잊지 못해서",
        explanation: "죽어서도 못 잊어 차마 못 잊어, 남들 다 자는 밤에 이 산 저 산 옮겨 가며 울어요."
    },
    {
        id: "jeopdongsae-sound",
        poemId: "sowol-jeopdongsae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 묶음의 '접동 접동 아우래비 접동'은 무엇인가요?",
        choices: [
            "새 울음소리를 아홉 오라비를 부르는 말로 들은 것",
            "누나의 이름",
            "마을 이름"
        ],
        answer: "새 울음소리를 아홉 오라비를 부르는 말로 들은 것",
        explanation: "새소리가 곧 누나가 동생들을 부르는 소리가 돼요."
    },
    {
        id: "jeopdongsae-story",
        poemId: "sowol-jeopdongsae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시는 무엇을 시로 옮긴 것인가요?",
        choices: ["전해 오는 옛이야기", "시인이 겪은 일", "신문에 난 사건"],
        answer: "전해 오는 옛이야기",
        explanation: "'옛날, 우리나라 먼 뒤쪽의'라고 시작하는 것이 이야기를 들려주는 말투예요."
    },
    {
        id: "sowol-habit",
        poemId: "",
        category: "견주어 읽기",
        prompt: "김소월의 시 네 편을 떠올려 보세요.",
        sentence: "「가는 길」「접동새」「진달래꽃」「산유화」에 똑같이 흐르는 것은 무엇인가요?",
        choices: [
            "헤어짐과 그리움",
            "나라를 되찾자는 다짐",
            "자연의 아름다움을 기리는 마음"
        ],
        answer: "헤어짐과 그리움",
        explanation: "떠나는 사람, 죽은 누나, 보내는 임, 저만치 혼자 핀 꽃. 김소월의 시는 늘 그 자리에 서 있어요."
    },

    // ── 중1 · 빼앗긴 땅에서 쓴 시 ─────────────────────────────────
    {
        id: "ppaeatgin-question",
        poemId: "sanghwa-ppaeatgin",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "제목이 묻고 있는 것은 무엇인가요?",
        choices: ["빼앗긴 들에도 봄이 오느냐", "봄이 언제 오느냐", "누가 들을 빼앗았느냐"],
        answer: "빼앗긴 들에도 봄이 오느냐",
        explanation: "첫 줄에서 한 번 더 묻고, 마지막 줄에서 스스로 답해요."
    },
    {
        id: "ppaeatgin-walk",
        poemId: "sanghwa-ppaeatgin",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 어디를 걸어가나요?",
        choices: ["가르마 같은 논길", "바닷가 모래밭", "산속 오솔길"],
        answer: "가르마 같은 논길",
        explanation: "푸른 하늘과 푸른 들이 맞붙은 곳으로 꿈속을 가듯 걸어요."
    },
    {
        id: "ppaeatgin-spring",
        poemId: "sanghwa-ppaeatgin",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "시 가운데의 봄 들판은 어떻게 그려지나요?",
        choices: [
            "보리밭·도랑·종다리가 살아 움직이며 반겨요",
            "메마르고 조용해요",
            "사람이 아무도 없어 무서워요"
        ],
        answer: "보리밭·도랑·종다리가 살아 움직이며 반겨요",
        explanation: "바람은 속삭이고 종다리는 웃고 도랑은 어깨춤을 춰요. 봄은 조금도 빼앗기지 않았어요."
    },
    {
        id: "ppaeatgin-last",
        poemId: "sanghwa-ppaeatgin",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄은 어떻게 끝나나요?",
        choices: [
            "들을 빼앗겨 봄조차 빼앗기겠다고",
            "봄이 왔으니 괜찮다고",
            "내년 봄을 기다리겠다고"
        ],
        answer: "들을 빼앗겨 봄조차 빼앗기겠다고",
        explanation: "봄 들판을 실컷 그려 놓고 마지막 한 줄로 그 봄을 도로 거둬 가요."
    },
    {
        id: "ppaeatgin-land",
        poemId: "sanghwa-ppaeatgin",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'지금은 남의 땅'은 어떤 때를 가리키나요?",
        choices: ["나라를 빼앗겼던 때", "땅을 팔았던 때", "이사를 간 때"],
        answer: "나라를 빼앗겼던 때",
        explanation: "1926년, 우리 땅이 남의 나라 것이던 때에 쓴 시예요."
    },
    {
        id: "era-cheongpodo",
        poemId: "yuksa-cheongpodo",
        category: "견주어 읽기",
        prompt: "그 시대를 떠올리며 답해 보세요.",
        sentence: "「청포도」에서 기다리는 손님을 그 시대와 함께 읽으면 무엇으로 볼 수 있나요?",
        choices: [
            "되찾을 나라, 돌아올 자유 같은 것",
            "먼 곳에 사는 친척",
            "포도를 사러 오는 사람"
        ],
        answer: "되찾을 나라, 돌아올 자유 같은 것",
        explanation: "이육사는 나라를 되찾으려다 여러 번 옥에 갇혔던 사람이에요. 손님이 누구인지 말하지 않은 까닭이 있어요."
    },
    {
        id: "era-seosi",
        poemId: "dongju-seosi",
        category: "견주어 읽기",
        prompt: "그 시대를 떠올리며 답해 보세요.",
        sentence: "「서시」의 부끄럼 없이 살겠다는 다짐이 그 시대에 유독 무거웠던 까닭은 무엇인가요?",
        choices: [
            "나라를 빼앗긴 때라 바르게 살기가 어려웠기 때문에",
            "시인이 아직 어렸기 때문에",
            "별이 잘 보이지 않는 곳에 살았기 때문에"
        ],
        answer: "나라를 빼앗긴 때라 바르게 살기가 어려웠기 때문에",
        explanation: "남의 나라 말로 살아야 하던 때에 우리말로 부끄럼을 말한 시예요."
    },
    {
        id: "era-how",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 시들을 떠올려 보세요.",
        sentence: "시대를 알고 시를 읽으면 무엇이 달라지나요?",
        choices: [
            "봄·손님·별을 말한 시가 무엇을 참고 말했는지 보여요",
            "시가 더 짧아 보여요",
            "시인의 나이를 알 수 있어요"
        ],
        answer: "봄·손님·별을 말한 시가 무엇을 참고 말했는지 보여요",
        explanation: "드러내 말할 수 없던 때라 시인들은 들판과 포도와 별에 마음을 실었어요."
    },

    // ── 중1 · 천 년 전의 노래 ─────────────────────────────────────
    {
        id: "jemangmaega-who",
        poemId: "hyangga-jemangmaega",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "누구의 죽음을 노래하나요?",
        choices: ["누이", "어머니", "벗"],
        answer: "누이",
        explanation: "제목의 '망매'가 죽은 누이라는 뜻이에요."
    },
    {
        id: "jemangmaega-leaf",
        poemId: "hyangga-jemangmaega",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "죽음을 무엇에 견주었나요?",
        choices: ["이른 바람에 떨어지는 잎", "지는 해", "마른 우물"],
        answer: "이른 바람에 떨어지는 잎",
        explanation: "'이른' 바람이라는 말이 너무 일찍 떠났다는 뜻을 담아요."
    },
    {
        id: "jemangmaega-branch",
        poemId: "hyangga-jemangmaega",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "'한 가지에 나고도'는 무슨 뜻인가요?",
        choices: ["같은 부모에게서 났다는 뜻", "같은 마을에 살았다는 뜻", "같은 해에 태어났다는 뜻"],
        answer: "같은 부모에게서 났다는 뜻",
        explanation: "한 가지에서 난 잎 둘이 서로 다른 곳으로 떨어져요."
    },
    {
        id: "jemangmaega-hope",
        poemId: "hyangga-jemangmaega",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "마지막에서 무엇을 다짐하나요?",
        choices: [
            "도를 닦으며 다시 만날 날을 기다리겠다고",
            "누이를 잊겠다고",
            "다시는 가을을 맞지 않겠다고"
        ],
        answer: "도를 닦으며 다시 만날 날을 기다리겠다고",
        explanation: "슬픔에서 끝내지 않고 다시 만날 곳을 바라봐요."
    },
    {
        id: "seodongyo-purpose",
        poemId: "hyangga-seodongyo",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "이 노래는 무엇을 하려고 지어 불렸나요?",
        choices: [
            "소문을 퍼뜨려 공주와 맺어지려고",
            "공주를 놀리려고",
            "임금을 칭찬하려고"
        ],
        answer: "소문을 퍼뜨려 공주와 맺어지려고",
        explanation: "노래가 온 장안에 퍼지자 공주는 궁에서 쫓겨나 정말 서동을 만나게 돼요."
    },
    {
        id: "seodongyo-children",
        poemId: "hyangga-seodongyo",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "이 노래를 퍼뜨린 사람들은 누구인가요?",
        choices: ["아이들", "신하들", "장사꾼들"],
        answer: "아이들",
        explanation: "서동이 마를 나눠 주며 아이들에게 부르게 했어요."
    },
    {
        id: "heonhwaga-flower",
        poemId: "hyangga-heonhwaga",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "노인이 바치겠다고 한 것은 무엇인가요?",
        choices: ["바위 위의 꽃", "암소", "바닷물"],
        answer: "바위 위의 꽃",
        explanation: "아무도 오르지 못한다던 바위의 꽃이에요."
    },
    {
        id: "heonhwaga-condition",
        poemId: "hyangga-heonhwaga",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "꽃을 바치는 데 붙인 조건은 무엇인가요?",
        choices: ["나를 부끄러워하지 않으신다면", "암소를 주신다면", "이름을 알려 주신다면"],
        answer: "나를 부끄러워하지 않으신다면",
        explanation: "늙은 자기를 부끄러워하지만 않는다면 위험한 바위도 오르겠다는 말이에요."
    },
    {
        id: "hyangga-what",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 노래들을 떠올려 보세요.",
        sentence: "향가는 어떤 노래인가요?",
        choices: [
            "천 년도 더 전, 신라 사람들이 우리말로 부른 노래",
            "조선 선비들이 한문으로 지은 시",
            "백 년 전 신문에 실린 시"
        ],
        answer: "천 년도 더 전, 신라 사람들이 우리말로 부른 노래",
        explanation: "한자를 빌려 우리말을 적었기 때문에, 오늘 말로 옮겨서 읽어요."
    },

    // ── 중1 · 교과서에서 읽는 시 ──────────────────────────────────
    {
        id: "eomma-wait",
        poemId: "gihyeongdo-eomma",
        category: "장면 확인",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "어린 말하는 이가 빈방에서 기다린 사람은 누구인가요?",
        choices: ["시장에 간 엄마", "학교에 간 누나", "일 나간 아버지"],
        answer: "시장에 간 엄마",
        explanation: "엄마는 팔 것을 이고 시장에 갔고, 밤이 되어도 오지 않아요."
    },
    {
        id: "eomma-sell",
        poemId: "gihyeongdo-eomma",
        category: "장면 확인",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "엄마가 팔러 간 것은 무엇인가요?",
        choices: ["열무", "생선", "옷감"],
        answer: "열무",
        explanation: "팔릴 때까지 돌아올 수 없으니 밤이 깊어요."
    },
    {
        id: "eomma-now",
        poemId: "gihyeongdo-eomma",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "시의 끝에서 말하는 이는 어느 때에 서 있나요?",
        choices: [
            "어른이 되어 어린 날을 돌아보는 때",
            "여전히 어린 그날 밤",
            "엄마가 돌아온 아침"
        ],
        answer: "어른이 되어 어린 날을 돌아보는 때",
        explanation: "그 밤을 떠올리면 지금도 마음 한쪽이 아프다는 말로 끝나요."
    },
    {
        id: "eomma-feel",
        poemId: "gihyeongdo-eomma",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "빈방에서 혼자 기다리던 아이의 마음은 어떠했나요?",
        choices: ["무섭고 외로웠어요", "신나고 즐거웠어요", "아무렇지도 않았어요"],
        answer: "무섭고 외로웠어요",
        explanation: "빗소리와 어둠 속에서 숙제를 하며 엄마를 기다려요."
    },
    {
        id: "seongtanje-father",
        poemId: "kimjonggil-seongtanje",
        category: "장면 확인",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "아버지가 눈 속을 헤치고 구해 온 것은 무엇인가요?",
        choices: ["붉은 산수유 열매", "약초 뿌리", "장작"],
        answer: "붉은 산수유 열매",
        explanation: "흰 눈 속의 붉은 열매라 빛깔이 또렷하게 남아요."
    },
    {
        id: "seongtanje-why",
        poemId: "kimjonggil-seongtanje",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "아버지가 그것을 구해 온 까닭은 무엇인가요?",
        choices: ["앓는 아들의 약으로 쓰려고", "성탄절 상을 차리려고", "이웃에게 팔려고"],
        answer: "앓는 아들의 약으로 쓰려고",
        explanation: "열이 나는 아이에게 먹일 약이 그 열매였어요."
    },
    {
        id: "seongtanje-now",
        poemId: "kimjonggil-seongtanje",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "어른이 된 말하는 이가 눈을 보며 떠올리는 것은 무엇인가요?",
        choices: ["아버지의 사랑", "어린 날의 병", "성탄절 선물"],
        answer: "아버지의 사랑",
        explanation: "세월이 흘러 그때 아버지 나이가 되어서야 그 마음을 알아요."
    },
    {
        id: "meonnara-who",
        poemId: "sinseokjeong-meonnara",
        category: "장면 확인",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "말하는 이가 함께 가자고 하는 사람은 누구인가요?",
        choices: ["어머니", "친구", "누이"],
        answer: "어머니",
        explanation: "'어머니'를 부르며 묻는 말이 묶음마다 되풀이돼요."
    },
    {
        id: "meonnara-where",
        poemId: "sinseokjeong-meonnara",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "그 먼 나라는 어떤 곳인가요?",
        choices: [
            "다툼 없이 자연 속에서 조용히 사는 곳",
            "큰 도시가 있는 곳",
            "전쟁이 벌어지는 곳"
        ],
        answer: "다툼 없이 자연 속에서 조용히 사는 곳",
        explanation: "실제로 있는 나라가 아니라 마음이 그리는 곳이에요."
    },
    {
        id: "textbook-common",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 시들을 떠올려 보세요.",
        sentence: "「엄마 걱정」「성탄제」「그 먼 나라를 알으십니까」에 똑같이 있는 것은 무엇인가요?",
        choices: [
            "부모를 향한 마음",
            "나라를 잃은 슬픔",
            "친구와 헤어진 아쉬움"
        ],
        answer: "부모를 향한 마음",
        explanation: "엄마, 아버지, 어머니. 세 시가 부르는 사람이 같아요."
    },

    // ── 중2 · 한용운 다시 읽기 ────────────────────────────────────
    {
        id: "nim-gone",
        poemId: "manhae-nim",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 줄에서 님은 어떻게 되었나요?",
        choices: ["갔어요", "돌아왔어요", "잠들었어요"],
        answer: "갔어요",
        explanation: "'님은 갔습니다'를 두 번 거듭하며 시작해요."
    },
    {
        id: "nim-not-sent",
        poemId: "manhae-nim",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'님은 갔지마는 나는 님을 보내지 아니하였습니다'는 어떤 말인가요?",
        choices: [
            "앞뒤가 어긋나지만 마음으로는 보내지 않았다는 말",
            "님이 아직 안 갔다는 말",
            "님을 붙잡았다는 말"
        ],
        answer: "앞뒤가 어긋나지만 마음으로는 보내지 않았다는 말",
        explanation: "몸은 갔어도 내 안에서는 떠나지 않았어요. 말이 어긋난 자리에 뜻이 있어요."
    },
    {
        id: "nim-turn",
        poemId: "manhae-nim",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'그러나'에서 시는 어느 쪽으로 방향을 트나요?",
        choices: [
            "슬픔에서 다시 만날 것을 믿는 쪽으로",
            "슬픔에서 더 깊은 슬픔으로",
            "님을 잊는 쪽으로"
        ],
        answer: "슬픔에서 다시 만날 것을 믿는 쪽으로",
        explanation: "슬픔의 힘을 옮겨서 새 희망에 들어붓는다고 했어요."
    },
    {
        id: "nim-song",
        poemId: "manhae-nim",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄에서 님의 침묵을 휩싸고 도는 것은 무엇인가요?",
        choices: ["사랑의 노래", "한숨의 미풍", "차디찬 티끌"],
        answer: "사랑의 노래",
        explanation: "님이 말이 없어도 내 노래는 그치지 않는다는 뜻이에요."
    },
    {
        id: "nim-honorific",
        poemId: "manhae-nim",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시가 '~습니다'라는 높임말로 쓰인 까닭은 무엇일까요?",
        choices: [
            "님을 높이며 말을 건네는 태도라서",
            "옛날 말투라서",
            "글자 수를 맞추려고"
        ],
        answer: "님을 높이며 말을 건네는 태도라서",
        explanation: "혼잣말이 아니라 님에게 드리는 말이라 끝까지 높여요."
    },
    {
        id: "manhae-you",
        poemId: "",
        category: "견주어 읽기",
        prompt: "한용운의 시 네 편을 떠올려 보세요.",
        sentence: "「님의 침묵」「나룻배와 행인」「복종」「알 수 없어요」의 '님·당신'은 무엇으로 읽을 수 있나요?",
        choices: [
            "사랑하는 사람이면서 잃어버린 나라, 깨달음 같은 여러 뜻",
            "시인의 어머니",
            "실제로 있던 한 사람"
        ],
        answer: "사랑하는 사람이면서 잃어버린 나라, 깨달음 같은 여러 뜻",
        explanation: "한용운은 스님이자 독립운동가였어요. 님이라는 한 글자에 여러 뜻이 겹쳐 있어요."
    },
    {
        id: "manhae-habit",
        poemId: "",
        category: "견주어 읽기",
        prompt: "한용운의 시 네 편을 떠올려 보세요.",
        sentence: "한용운이 즐겨 쓰는 방법은 무엇인가요?",
        choices: [
            "앞뒤가 안 맞는 말로 깊은 마음을 말하고 높임말로 건네요",
            "짧은 줄로 끊어서 소리를 흉내내요",
            "사투리로 정겨움을 살려요"
        ],
        answer: "앞뒤가 안 맞는 말로 깊은 마음을 말하고 높임말로 건네요",
        explanation: "보내지 않은 님, 달콤한 복종, 기름이 되는 재. 늘 어긋난 말 속에 뜻을 넣어요."
    },
    {
        id: "alsu-nim-again",
        poemId: "manhae-alsu",
        category: "견주어 읽기",
        prompt: "「알 수 없어요」와 「님의 침묵」을 나란히 놓고 답해 보세요.",
        sentence: "두 시의 끝에 똑같이 남는 것은 무엇인가요?",
        choices: ["꺼지지 않는 마음", "떠난 님의 발자국", "차가운 밤"],
        answer: "꺼지지 않는 마음",
        explanation: "하나는 밤을 지키는 약한 등불, 하나는 그치지 않는 사랑의 노래예요."
    },

    // ── 중2 · 이육사 다시 읽기 ────────────────────────────────────
    {
        id: "jeoljeong-where",
        poemId: "yuksa-jeoljeong",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 어디에 서 있나요?",
        choices: [
            "더 물러설 데 없는 고원의 서릿발 위",
            "따뜻한 남쪽 들판",
            "고향 마을 앞"
        ],
        answer: "더 물러설 데 없는 고원의 서릿발 위",
        explanation: "채찍에 갈겨 북방으로 휩쓸려 와서, 한 발 디딜 곳조차 없는 자리예요."
    },
    {
        id: "jeoljeong-season",
        poemId: "yuksa-jeoljeong",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'매운 계절'은 무엇을 가리키나요?",
        choices: [
            "견디기 힘든 겨울이자 고통스러운 시대",
            "고추가 익는 가을",
            "매운 음식을 먹는 철"
        ],
        answer: "견디기 힘든 겨울이자 고통스러운 시대",
        explanation: "계절을 채찍으로 그렸어요. 나라 잃은 때를 겨울에 실었어요."
    },
    {
        id: "jeoljeong-rainbow",
        poemId: "yuksa-jeoljeong",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'강철로 된 무지개'는 어떤 말인가요?",
        choices: [
            "차갑고 단단한 것과 아름다운 것을 붙인 어긋난 말",
            "실제로 본 무지개",
            "무지개가 사라졌다는 말"
        ],
        answer: "차갑고 단단한 것과 아름다운 것을 붙인 어긋난 말",
        explanation: "겨울의 고통을 무지개라 불러요. 고통 속에서 오히려 뜻을 세우는 마음이에요."
    },
    {
        id: "jeoljeong-eyes",
        poemId: "yuksa-jeoljeong",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "눈을 감고 생각하는 까닭은 무엇인가요?",
        choices: [
            "물러설 곳이 없어 마음으로 맞서려고",
            "너무 추워서",
            "잠이 와서"
        ],
        answer: "물러설 곳이 없어 마음으로 맞서려고",
        explanation: "몸은 갈 데가 없으니 눈을 감고 그 겨울을 다시 봐요."
    },
    {
        id: "kkot-when",
        poemId: "yuksa-kkot",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 묶음에서 꽃은 언제 핀다고 했나요?",
        choices: ["비 한 방울 내리지 않는 그때에도", "봄비가 내린 뒤에", "제비가 돌아온 날에"],
        answer: "비 한 방울 내리지 않는 그때에도",
        explanation: "필 수 없는 조건에서 오히려 핀다고 해요."
    },
    {
        id: "kkot-promise",
        poemId: "yuksa-kkot",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'저버리지 못할 약속'은 무엇인가요?",
        choices: [
            "얼어붙은 땅에도 꽃이 피고 봄이 온다는 것",
            "제비가 남쪽으로 간다는 것",
            "눈이 그친다는 것"
        ],
        answer: "얼어붙은 땅에도 꽃이 피고 봄이 온다는 것",
        explanation: "눈 속 깊이 싹눈이 움직이고 있어요. 지금은 겨울이어도 반드시 온다는 약속이에요."
    },
    {
        id: "yuksa-habit",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이육사의 시 세 편을 떠올려 보세요.",
        sentence: "이육사가 즐겨 쓰는 방법은 무엇인가요?",
        choices: [
            "극한의 자리에 서서 꺾이지 않는 뜻을 말해요",
            "웃음으로 슬픔을 감춰요",
            "사물을 사람처럼 그려요"
        ],
        answer: "극한의 자리에 서서 꺾이지 않는 뜻을 말해요",
        explanation: "고원의 서릿발, 비 없는 땅, 툰드라. 가장 힘든 자리에서 꽃과 무지개를 말해요."
    },
    {
        id: "yuksa-two-places",
        poemId: "yuksa-cheongpodo",
        category: "견주어 읽기",
        prompt: "「청포도」와 「절정」을 나란히 놓고 답해 보세요.",
        sentence: "두 시가 서 있는 자리는 어떻게 다른가요?",
        choices: [
            "하나는 기다림이 익어 가는 고장, 하나는 물러설 데 없는 고원",
            "둘 다 고향 마을",
            "둘 다 바닷가"
        ],
        answer: "하나는 기다림이 익어 가는 고장, 하나는 물러설 데 없는 고원",
        explanation: "같은 시인이 넉넉한 자리와 벼랑 끝을 오가며 같은 뜻을 말해요."
    },

    // ── 중2 · 김영랑 다시 읽기 ────────────────────────────────────
    {
        id: "moran-wait",
        poemId: "yeongrang-moran",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 기다리는 것은 무엇인가요?",
        choices: ["모란이 피는 봄", "떠난 사람", "여름의 무더위"],
        answer: "모란이 피는 봄",
        explanation: "모란이 피는 것이 곧 '나의 봄'이에요."
    },
    {
        id: "moran-fall",
        poemId: "yeongrang-moran",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "모란이 떨어져 버린 날 말하는 이는 어떻게 되나요?",
        choices: ["봄을 잃은 설움에 잠겨요", "다른 꽃을 심어요", "여름을 반겨요"],
        answer: "봄을 잃은 설움에 잠겨요",
        explanation: "꽃잎이 시들고 자취도 없어지면 보람이 무너져요."
    },
    {
        id: "moran-year",
        poemId: "yeongrang-moran",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "모란이 지고 나면 한 해가 어떻게 된다고 했나요?",
        choices: [
            "그뿐 다 가고 말아 삼백예순 날을 섭섭해 운다고",
            "다시 시작된다고",
            "가을이 기다려진다고"
        ],
        answer: "그뿐 다 가고 말아 삼백예순 날을 섭섭해 운다고",
        explanation: "피는 날은 며칠, 우는 날은 삼백예순 날. 숫자로 마음의 크기를 보여 줘요."
    },
    {
        id: "moran-paradox",
        poemId: "yeongrang-moran",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'찬란한 슬픔의 봄'은 어떤 말인가요?",
        choices: [
            "기다림의 기쁨과 잃음의 슬픔이 하나라는 어긋난 말",
            "봄이 슬프기만 하다는 말",
            "봄이 찬란하기만 하다는 말"
        ],
        answer: "기다림의 기쁨과 잃음의 슬픔이 하나라는 어긋난 말",
        explanation: "피기 때문에 지고, 지기 때문에 다시 기다려요. 두 마음이 한 낱말에 겹쳐요."
    },
    {
        id: "moran-frame",
        poemId: "yeongrang-moran",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "시의 처음과 끝은 어떻게 이어져 있나요?",
        choices: [
            "'모란이 피기까지는 기다리고 있을 테요'가 앞뒤를 감싸요",
            "처음은 기쁨, 끝은 슬픔으로 갈라져요",
            "처음과 끝이 아무 상관이 없어요"
        ],
        answer: "'모란이 피기까지는 기다리고 있을 테요'가 앞뒤를 감싸요",
        explanation: "끝에서는 같은 말 뒤에 '찬란한 슬픔의 봄을'이 덧붙어요."
    },
    {
        id: "yeongrang-habit",
        poemId: "",
        category: "견주어 읽기",
        prompt: "김영랑의 시 세 편을 떠올려 보세요.",
        sentence: "김영랑이 즐겨 쓰는 방법은 무엇인가요?",
        choices: [
            "부드러운 소리와 봄의 빛으로 마음을 노래해요",
            "극한의 자리에서 뜻을 세워요",
            "옛이야기를 시로 옮겨요"
        ],
        answer: "부드러운 소리와 봄의 빛으로 마음을 노래해요",
        explanation: "돌담의 햇발, 단풍 드는 감잎, 모란. 소리가 흐르고 빛이 고와요."
    },
    {
        id: "yeongrang-soft",
        poemId: "yeongrang-doldam",
        category: "견주어 읽기",
        prompt: "김영랑의 시 세 편을 소리 내어 읽고 답해 보세요.",
        sentence: "세 편에서 똑같이 느껴지는 소리의 결은 무엇인가요?",
        choices: ["부드럽고 흐르는 소리", "딱딱하고 끊기는 소리", "크고 거친 소리"],
        answer: "부드럽고 흐르는 소리",
        explanation: "ㄹ과 ㅅ, 그리고 '~테요' '~이리' 같은 말끝이 노래처럼 흘러요."
    },

    // ── 중2 · 윤동주 다시 읽기 ────────────────────────────────────
    {
        id: "ttodareun-night",
        poemId: "dongju-ttodareun",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "고향에 돌아온 날 밤 따라와 한 방에 누운 것은 무엇인가요?",
        choices: ["내 백골", "고향 친구", "지조 높은 개"],
        answer: "내 백골",
        explanation: "낡고 힘없는 또 하나의 나예요."
    },
    {
        id: "ttodareun-cry",
        poemId: "dongju-ttodareun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'우는 것이 누구냐'고 물으며 늘어놓은 셋은 무엇인가요?",
        choices: ["나, 백골, 아름다운 혼", "나, 개, 바람", "고향, 어둠, 우주"],
        answer: "나, 백골, 아름다운 혼",
        explanation: "한 사람 안에 셋이 있어요. 낡은 나, 지금의 나, 되고 싶은 나."
    },
    {
        id: "ttodareun-dog",
        poemId: "dongju-ttodareun",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "밤새 어둠을 짖는 개는 무엇을 하나요?",
        choices: [
            "나를 쫓아서 편히 눌러앉지 못하게 깨워요",
            "도둑을 막아요",
            "백골을 지켜요"
        ],
        answer: "나를 쫓아서 편히 눌러앉지 못하게 깨워요",
        explanation: "'지조 높은' 개예요. 어둠에 안주하려는 나를 몰아내요."
    },
    {
        id: "ttodareun-go",
        poemId: "dongju-ttodareun",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'또 다른 고향'은 어떤 곳인가요?",
        choices: [
            "돌아온 고향과 달리 참된 내가 살아야 할 곳",
            "태어난 마을",
            "백골이 묻힐 곳"
        ],
        answer: "돌아온 고향과 달리 참된 내가 살아야 할 곳",
        explanation: "백골 몰래 가자고 해요. 낡은 나를 두고 떠나는 길이에요."
    },
    {
        id: "dongju-habit",
        poemId: "",
        category: "견주어 읽기",
        prompt: "윤동주의 시 세 편을 떠올려 보세요.",
        sentence: "윤동주가 즐겨 쓰는 방법은 무엇인가요?",
        choices: [
            "자기를 들여다보며 부끄러움과 다짐을 말해요",
            "자연을 사람처럼 그려요",
            "옛 노래의 후렴을 빌려 와요"
        ],
        answer: "자기를 들여다보며 부끄러움과 다짐을 말해요",
        explanation: "우물 속 사나이, 한 방의 백골, 잎새에 이는 바람. 늘 자기를 보고 있어요."
    },
    {
        id: "dongju-mirror",
        poemId: "dongju-jahwasang",
        category: "견주어 읽기",
        prompt: "「자화상」「또 다른 고향」「서시」를 나란히 놓고 답해 보세요.",
        sentence: "세 시에서 자기를 비춰 보는 것은 무엇인가요?",
        choices: ["우물, 백골, 하늘", "거울, 사진, 강물", "친구, 부모, 스승"],
        answer: "우물, 백골, 하늘",
        explanation: "물에 비친 나, 방에 누운 낡은 나, 우러러본 하늘 앞의 나예요."
    },

    // ── 중2 · 떠남과 돌아옴 ───────────────────────────────────────
    {
        id: "gohyang-where",
        poemId: "ojanghwan-gohyang",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 고향 마을에 들어갔나요?",
        choices: [
            "아니요, 고향 앞 나루와 주막에서 서성여요",
            "네, 집집마다 인사를 다녀요",
            "네, 조상의 무덤에 갔어요"
        ],
        answer: "아니요, 고향 앞 나루와 주막에서 서성여요",
        explanation: "제목이 「고향 앞에서」예요. 진종일 나룻가에 서성거려요."
    },
    {
        id: "gohyang-season",
        poemId: "ojanghwan-gohyang",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "어느 철인가요?",
        choices: ["얼음이 풀리는 이른 봄", "한여름", "눈 오는 한겨울"],
        answer: "얼음이 풀리는 이른 봄",
        explanation: "흙이 풀리는 냄새가 나고 얼음장이 떠내려가요."
    },
    {
        id: "gohyang-ask",
        poemId: "ojanghwan-gohyang",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "장꾼들에게 무엇을 묻나요?",
        choices: [
            "전나무 우거진 마을을 보았느냐고",
            "장이 언제 서느냐고",
            "길이 어디로 났느냐고"
        ],
        answer: "전나무 우거진 마을을 보았느냐고",
        explanation: "코앞의 고향을 남에게 물어요. 그만큼 낯설어진 거예요."
    },
    {
        id: "gohyang-why",
        poemId: "ojanghwan-gohyang",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "고향 앞까지 와서 들어가지 못하는 마음은 무엇일까요?",
        choices: [
            "그리우면서도 선뜻 들어설 수 없는 마음",
            "길을 잃은 마음",
            "고향이 싫어진 마음"
        ],
        answer: "그리우면서도 선뜻 들어설 수 없는 마음",
        explanation: "누룩 뜨는 냄새까지 떠올리면서도 문턱을 넘지 못해요."
    },
    {
        id: "tteonaganeun-repeat",
        poemId: "yongcheol-tteonaganeun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "처음과 끝에 되풀이되는 말은 무엇인가요?",
        choices: ["나 두 야 간다", "아늑한 이 항구", "앞 대일 언덕"],
        answer: "나 두 야 간다",
        explanation: "한 글자씩 띄어 써서 한 걸음씩 떼는 것처럼 읽혀요."
    },
    {
        id: "tteonaganeun-why",
        poemId: "yongcheol-tteonaganeun",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "떠나는 까닭은 무엇인가요?",
        choices: [
            "젊은 나이를 눈물로 보낼 수 없어서",
            "항구가 싫어져서",
            "사람들이 쫓아내서"
        ],
        answer: "젊은 나이를 눈물로 보낼 수 없어서",
        explanation: "머무르면 우는 날만 남는다는 말이에요."
    },
    {
        id: "tteonaganeun-hard",
        poemId: "yongcheol-tteonaganeun",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "떠나기 어려운 까닭은 무엇인가요?",
        choices: [
            "눈에 익은 산과 사랑하던 사람들 때문에",
            "배가 없어서",
            "바람이 세서"
        ],
        answer: "눈에 익은 산과 사랑하던 사람들 때문에",
        explanation: "물 어린 눈에도 산봉우리와 주름진 얼굴들이 비쳐요."
    },
    {
        id: "tteonaganeun-ahead",
        poemId: "yongcheol-tteonaganeun",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "앞날은 어떻게 그려져 있나요?",
        choices: [
            "배를 댈 언덕조차 마련되지 않은 길",
            "환한 새 항구",
            "돌아올 날이 정해진 길"
        ],
        answer: "배를 댈 언덕조차 마련되지 않은 길",
        explanation: "'앞 대일 언덕인들 마련이나 있을 거냐'예요. 그런데도 가겠대요."
    },
    {
        id: "leaving-compare",
        poemId: "",
        category: "견주어 읽기",
        prompt: "「고향 앞에서」와 「떠나가는 배」를 나란히 놓고 답해 보세요.",
        sentence: "하나는 돌아오고 하나는 떠나는데, 두 시의 말하는 이가 서 있는 자리는 어떻게 같나요?",
        choices: [
            "둘 다 문턱에서 머뭇거리는 자리예요",
            "둘 다 이미 집 안에 있어요",
            "둘 다 바다 한가운데예요"
        ],
        answer: "둘 다 문턱에서 머뭇거리는 자리예요",
        explanation: "들어가지 못하는 사람과 떠나지 못하는 사람. 방향은 반대인데 자리는 같아요."
    },

    // ── 중2 · 옛 노래 더 읽기 ─────────────────────────────────────
    {
        id: "dosan-first",
        poemId: "leehwang-dosan",
        category: "표현 찾기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "첫 수의 '초야우생'은 누구를 가리키나요?",
        choices: ["시골에 사는 어리석은 자기 자신", "이름 없는 농부", "옛 성현"],
        answer: "시골에 사는 어리석은 자기 자신",
        explanation: "큰 학자가 자기를 낮춰 부른 말이에요."
    },
    {
        id: "dosan-goin",
        poemId: "leehwang-dosan",
        category: "마음 읽기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "둘째 수에서 옛 성현을 못 뵈어도 무엇이 앞에 있다고 했나요?",
        choices: ["성현이 가던 길", "성현의 초상", "성현의 무덤"],
        answer: "성현이 가던 길",
        explanation: "사람은 못 만나도 그 길은 남아 있으니 따라가겠다는 뜻이에요."
    },
    {
        id: "dosan-mountain",
        poemId: "leehwang-dosan",
        category: "마음 읽기",
        prompt: "시조를 읽고 답해 보세요.",
        sentence: "셋째 수에서 청산과 흐르는 물을 보고 무엇을 다짐하나요?",
        choices: [
            "그치지 않고 늘 푸르게 살겠다고",
            "산에 들어가 살겠다고",
            "물처럼 떠나겠다고"
        ],
        answer: "그치지 않고 늘 푸르게 살겠다고",
        explanation: "'우리도 그치지 말아 만고상청하리라'예요. 배움을 그치지 않겠다는 말이에요."
    },
    {
        id: "dongdong-refrain",
        poemId: "goryeo-dongdong",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "묶음마다 붙는 후렴은 무엇인가요?",
        choices: ["아으 동동다리", "위 증즐가 대평성대", "얄리얄리 얄랑셩"],
        answer: "아으 동동다리",
        explanation: "'동동'은 북소리를 흉내낸 말로 봐요."
    },
    {
        id: "dongdong-month",
        poemId: "goryeo-dongdong",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "이 노래는 어떤 짜임으로 이어지나요?",
        choices: [
            "정월, 이월, 삼월… 달마다 한 묶음씩",
            "아침, 낮, 밤으로",
            "봄, 여름, 가을, 겨울 넷으로"
        ],
        answer: "정월, 이월, 삼월… 달마다 한 묶음씩",
        explanation: "열두 달을 차례로 노래하는 짜임을 달거리라고 해요."
    },
    {
        id: "dongdong-alone",
        poemId: "goryeo-dongdong",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "정월 노래에서 얼었다 녹았다 하는 냇물과 맞세운 것은 무엇인가요?",
        choices: ["홀로 살아가는 이 몸", "높이 켠 등불", "덕과 복"],
        answer: "홀로 살아가는 이 몸",
        explanation: "냇물은 풀리기라도 하는데 나는 그대로 혼자라는 말이에요."
    },
    {
        id: "jeongseokga-nut",
        poemId: "goryeo-jeongseokga",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "구운 밤에서 싹이 나면 무엇을 하겠다고 했나요?",
        choices: ["님과 헤어지겠다고", "님을 찾아가겠다고", "밤을 심겠다고"],
        answer: "님과 헤어지겠다고",
        explanation: "구운 밤에서는 싹이 날 리 없으니, 절대 헤어지지 않겠다는 말이에요."
    },
    {
        id: "jeongseokga-why",
        poemId: "goryeo-jeongseokga",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "될 수 없는 조건을 걸어 놓은 까닭은 무엇인가요?",
        choices: [
            "절대로 헤어지지 않겠다는 뜻을 세게 말하려고",
            "정말 밤에서 싹이 난다고 믿어서",
            "농사 이야기를 하려고"
        ],
        answer: "절대로 헤어지지 않겠다는 뜻을 세게 말하려고",
        explanation: "'하늘이 무너져도'와 같은 말법이에요. 안 될 일을 걸어 마음을 못 박아요."
    },
    {
        id: "old-refrain-again",
        poemId: "",
        category: "견주어 읽기",
        prompt: "「동동」「가시리」「청산별곡」의 후렴을 떠올려 보세요.",
        sentence: "세 노래의 후렴이 똑같이 하는 일은 무엇인가요?",
        choices: [
            "뜻 없이 가락을 맞추고 여럿이 함께 부르게 해요",
            "노래의 뜻을 풀이해요",
            "지은이의 이름을 알려요"
        ],
        answer: "뜻 없이 가락을 맞추고 여럿이 함께 부르게 해요",
        explanation: "동동다리, 대평성대, 얄랑셩. 소리는 달라도 하는 일은 같아요."
    },

    // ── 중3 · 이육사 마지막 시들 ──────────────────────────────────
    {
        id: "gwangya-first",
        poemId: "yuksa-gwangya",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "첫 묶음은 어느 때를 말하나요?",
        choices: ["하늘이 처음 열리던 까마득한 옛날", "눈 내리는 지금", "천고 뒤의 먼 미래"],
        answer: "하늘이 처음 열리던 까마득한 옛날",
        explanation: "닭 우는 소리도 아직 없던, 세상이 시작되던 날이에요."
    },
    {
        id: "gwangya-mountain",
        poemId: "yuksa-gwangya",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "산맥들이 차마 하지 못한 일은 무엇인가요?",
        choices: ["이곳을 범하는 일", "바다에 닿는 일", "강물을 막는 일"],
        answer: "이곳을 범하는 일",
        explanation: "산맥이 바다를 그리워 내달릴 때도 이 광야만은 건드리지 못했어요. 신성한 땅이라는 뜻이에요."
    },
    {
        id: "gwangya-now",
        poemId: "yuksa-gwangya",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'지금'의 광야는 어떤 모습인가요?",
        choices: ["눈이 내리고 매화 향기만 홀로 아득해요", "꽃이 가득 피어 있어요", "큰 강물이 넘쳐요"],
        answer: "눈이 내리고 매화 향기만 홀로 아득해요",
        explanation: "겨울 한가운데인데 매화 향기 하나가 남아 있어요."
    },
    {
        id: "gwangya-seed",
        poemId: "yuksa-gwangya",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 지금 여기에 뿌리겠다는 것은 무엇인가요?",
        choices: ["가난한 노래의 씨", "매화 씨", "눈"],
        answer: "가난한 노래의 씨",
        explanation: "지금은 가난한 씨지만 언젠가 노래가 될 거라는 뜻이에요."
    },
    {
        id: "gwangya-superman",
        poemId: "yuksa-gwangya",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "천고 뒤에 백마 타고 오는 초인은 무엇을 하나요?",
        choices: ["이 광야에서 목놓아 노래를 불러요", "씨를 뿌려요", "산맥을 넘어요"],
        answer: "이 광야에서 목놓아 노래를 불러요",
        explanation: "내가 뿌린 씨가 그때 노래로 피어난다는 말이에요."
    },
    {
        id: "gwangya-time",
        poemId: "yuksa-gwangya",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시의 시간은 어떻게 흐르나요?",
        choices: ["까마득한 과거 → 지금 → 먼 미래", "지금 → 과거 → 지금", "미래 → 과거"],
        answer: "까마득한 과거 → 지금 → 먼 미래",
        explanation: "시간을 크게 펼쳐 놓았기 때문에 지금의 겨울이 짧아 보여요."
    },
    {
        id: "gyomok-spring",
        poemId: "yuksa-gyomok",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'차라리 봄도 꽃피진 말아라'는 어떤 마음인가요?",
        choices: [
            "꺾이느니 꽃도 피우지 않겠다는 단호함",
            "봄이 싫다는 마음",
            "꽃이 지는 것이 슬프다는 마음"
        ],
        answer: "꺾이느니 꽃도 피우지 않겠다는 단호함",
        explanation: "세월에 불타고도 우뚝 선 나무가 편한 봄을 마다해요."
    },
    {
        id: "gyomok-lake",
        poemId: "yuksa-gyomok",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 묶음에서 나무는 어떻게 끝나나요?",
        choices: [
            "호수 속에 거꾸러져도 바람이 흔들지 못해요",
            "바람에 쓰러져요",
            "다시 꽃을 피워요"
        ],
        answer: "호수 속에 거꾸러져도 바람이 흔들지 못해요",
        explanation: "쓰러지는 것까지 받아들이되 흔들리지는 않겠다는 뜻이에요."
    },
    {
        id: "yuksa-final",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이육사의 시 세 편을 떠올려 보세요.",
        sentence: "「광야」「교목」「절정」에 똑같이 있는 것은 무엇인가요?",
        choices: [
            "가장 힘든 자리에서 꺾이지 않는 뜻",
            "고향을 그리워하는 마음",
            "사랑하는 사람을 부르는 소리"
        ],
        answer: "가장 힘든 자리에서 꺾이지 않는 뜻",
        explanation: "눈 내리는 광야, 거꾸러진 나무, 서릿발 고원. 자리는 달라도 서 있는 태도는 하나예요."
    },

    // ── 중3 · 윤동주의 부끄러움 ───────────────────────────────────
    {
        id: "chamhoe-mirror",
        poemId: "dongju-chamhoerok",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "녹슨 구리 거울 속에 남아 있는 것은 무엇인가요?",
        choices: ["내 얼굴", "옛 임금의 얼굴", "별"],
        answer: "내 얼굴",
        explanation: "그 얼굴을 어느 왕조의 유물이라 부르며 욕되다고 해요. 나라 잃은 백성의 얼굴이에요."
    },
    {
        id: "chamhoe-line",
        poemId: "dongju-chamhoerok",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "참회의 글을 한 줄로 줄이면 무엇인가요?",
        choices: [
            "스물네 해를 무슨 기쁨을 바라 살아왔던가",
            "왜 거울을 닦았던가",
            "왜 고향을 떠났던가"
        ],
        answer: "스물네 해를 무슨 기쁨을 바라 살아왔던가",
        explanation: "살아온 날 전체를 한 줄로 되묻는 참회예요."
    },
    {
        id: "chamhoe-future",
        poemId: "dongju-chamhoerok",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "어느 즐거운 날에 또 쓸 참회록의 내용은 무엇인가요?",
        choices: [
            "그 젊은 나이에 왜 그런 부끄런 고백을 했던가",
            "왜 더 일찍 참회하지 않았던가",
            "왜 거울을 버렸던가"
        ],
        answer: "그 젊은 나이에 왜 그런 부끄런 고백을 했던가",
        explanation: "오늘의 참회마저 뒷날에는 부끄러울 거라고 해요. 부끄러움이 겹으로 있어요."
    },
    {
        id: "chamhoe-polish",
        poemId: "dongju-chamhoerok",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "밤마다 하는 일은 무엇인가요?",
        choices: ["거울을 손바닥 발바닥으로 닦는 일", "참회록을 태우는 일", "운석을 찾는 일"],
        answer: "거울을 손바닥 발바닥으로 닦는 일",
        explanation: "닦고 나면 홀로 걸어가는 슬픈 사람의 뒷모습이 나타나요. 그 사람이 나예요."
    },
    {
        id: "sipjaga-light",
        poemId: "dongju-sipjaga",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "쫓아오던 햇빛은 지금 어디에 걸려 있나요?",
        choices: ["교회당 꼭대기 십자가", "첨탑 아래 문", "나무 끝"],
        answer: "교회당 꼭대기 십자가",
        explanation: "빛은 저 높은 곳에 있고 나는 밑에서 서성거려요."
    },
    {
        id: "sipjaga-allow",
        poemId: "dongju-sipjaga",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "십자가가 허락된다면 무엇을 하겠다고 했나요?",
        choices: [
            "어두워 가는 하늘 밑에 조용히 자기를 바치겠다고",
            "종을 치겠다고",
            "첨탑에 올라 소리치겠다고"
        ],
        answer: "어두워 가는 하늘 밑에 조용히 자기를 바치겠다고",
        explanation: "큰 소리 없이 '조용히'예요. 윤동주의 다짐은 늘 조용해요."
    },
    {
        id: "swipge-room",
        poemId: "dongju-swipge",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'육첩방은 남의 나라'는 어디를 말하나요?",
        choices: ["유학 가서 지내는 일본의 하숙방", "고향 집 사랑방", "감옥"],
        answer: "유학 가서 지내는 일본의 하숙방",
        explanation: "다다미 여섯 장 방에서 밤비 소리를 들으며 쓴 시예요."
    },
    {
        id: "swipge-shame",
        poemId: "dongju-swipge",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 부끄러워하는 것은 무엇인가요?",
        choices: [
            "힘든 세상에서 시가 이렇게 쉽게 써지는 것",
            "학비를 받는 것",
            "동무들을 잊은 것"
        ],
        answer: "힘든 세상에서 시가 이렇게 쉽게 써지는 것",
        explanation: "남들은 살기 어렵다는데 나는 방에서 시나 쓴다는 자책이에요."
    },
    {
        id: "swipge-hands",
        poemId: "dongju-swipge",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄의 '최초의 악수'는 누구와 누구의 악수인가요?",
        choices: [
            "부끄러워하는 나와 아침을 기다리는 나",
            "나와 늙은 교수",
            "나와 어린 때 동무"
        ],
        answer: "부끄러워하는 나와 아침을 기다리는 나",
        explanation: "「거울」의 나는 악수를 못 했는데, 이 시의 나는 자기에게 손을 내밀어요."
    },
    {
        id: "dongju-shame",
        poemId: "",
        category: "견주어 읽기",
        prompt: "윤동주의 시 네 편을 떠올려 보세요.",
        sentence: "「참회록」「십자가」「쉽게 씌어진 시」「서시」의 부끄러움은 어디로 가나요?",
        choices: [
            "자기를 정면으로 보고 조용한 다짐으로 바뀌어요",
            "남을 탓하는 마음으로 바뀌어요",
            "그대로 주저앉아요"
        ],
        answer: "자기를 정면으로 보고 조용한 다짐으로 바뀌어요",
        explanation: "거울을 닦고, 십자가 밑에 서고, 자기와 악수하고, 주어진 길을 걸어요."
    },

    // ── 중3 · 김소월의 절규와 그리움 ──────────────────────────────
    {
        id: "chohon-name",
        poemId: "sowol-chohon",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이가 부르고 있는 것은 무엇인가요?",
        choices: ["세상을 떠난 사람의 이름", "산 너머 마을 이름", "자기 이름"],
        answer: "세상을 떠난 사람의 이름",
        explanation: "'초혼'은 죽은 사람의 넋을 부르는 일이에요. 불러도 주인이 없는 이름이에요."
    },
    {
        id: "chohon-unsaid",
        poemId: "sowol-chohon",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "끝내 하지 못한 것은 무엇인가요?",
        choices: ["마음속에 남은 말 한마디", "마지막 인사", "이름 부르기"],
        answer: "마음속에 남은 말 한마디",
        explanation: "그 한마디를 못 해서 이름만 부르고 또 불러요."
    },
    {
        id: "chohon-where",
        poemId: "sowol-chohon",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 어디에서 부르고 있나요?",
        choices: ["해 지는 서산 앞, 떨어져 나가 앉은 산 위", "강가", "무덤 앞"],
        answer: "해 지는 서산 앞, 떨어져 나가 앉은 산 위",
        explanation: "붉은 해가 걸리고 사슴도 우는 저녁 산이에요."
    },
    {
        id: "chohon-stone",
        poemId: "sowol-chohon",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'선 채로 이 자리에 돌이 되어도'는 무슨 뜻인가요?",
        choices: [
            "돌이 되도록 그 자리에서 부르겠다는 뜻",
            "슬퍼서 몸이 굳었다는 뜻",
            "돌을 세우겠다는 뜻"
        ],
        answer: "돌이 되도록 그 자리에서 부르겠다는 뜻",
        explanation: "옛이야기의 망부석처럼, 부르다가 돌이 되어도 그치지 않겠다는 말이에요."
    },
    {
        id: "chohon-repeat",
        poemId: "sowol-chohon",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'이름이여!', '그 사람이여!'를 거듭하면 어떤 힘이 생기나요?",
        choices: ["부르짖는 소리가 점점 커져요", "시가 잔잔해져요", "뜻이 흐릿해져요"],
        answer: "부르짖는 소리가 점점 커져요",
        explanation: "느낌표가 열 개 넘게 나와요. 김소월 시 가운데 가장 큰 소리로 우는 시예요."
    },
    {
        id: "sakju-distance",
        poemId: "sowol-sakju",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "삭주구성까지는 얼마나 멀다고 했나요?",
        choices: ["산을 넘은 육천 리", "물로 사흘", "걸어서 하루"],
        answer: "산을 넘은 육천 리",
        explanation: "물로 사흘 배 사흘에 걸어 넘는 삼천 리를 더해요."
    },
    {
        id: "sakju-dream",
        poemId: "sowol-sakju",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "꿈에서는 그 거리가 어떻게 되나요?",
        choices: ["사오천 리로 줄어요", "더 멀어져요", "없어져요"],
        answer: "사오천 리로 줄어요",
        explanation: "꿈에서도 다 못 가요. 가다오다 돌아오는 길이라 했어요."
    },
    {
        id: "sakju-bird",
        poemId: "sowol-sakju",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "새들을 끌어온 까닭은 무엇인가요?",
        choices: [
            "새들도 집이 그리워 오가는데 나는 못 간다는 것",
            "새가 소식을 전해 준다는 것",
            "새처럼 날고 싶다는 것"
        ],
        answer: "새들도 집이 그리워 오가는데 나는 못 간다는 것",
        explanation: "제비도 새도 구름도 오가는데 사람만 산 너머 육천 리에 막혀 있어요."
    },
    {
        id: "sowol-two",
        poemId: "sowol-jindallae",
        category: "견주어 읽기",
        prompt: "「진달래꽃」과 「초혼」을 나란히 놓고 답해 보세요.",
        sentence: "두 시의 슬픔은 어떻게 다르게 나오나요?",
        choices: [
            "하나는 눌러 참고 하나는 목놓아 불러요",
            "둘 다 눌러 참아요",
            "둘 다 웃음으로 감춰요"
        ],
        answer: "하나는 눌러 참고 하나는 목놓아 불러요",
        explanation: "같은 시인이 이별 앞에서 두 가지 목소리를 가졌어요."
    },

    // ── 중3 · 낯선 눈으로 본 나와 고향 ────────────────────────────
    {
        id: "geoul-space",
        poemId: "leesang-geoul",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "띄어쓰기를 없앤 까닭은 무엇일까요?",
        choices: [
            "읽는 사람을 멈춰 세워 낯설게 보게 하려고",
            "글자 수를 줄이려고",
            "잘못 적어서"
        ],
        answer: "읽는 사람을 멈춰 세워 낯설게 보게 하려고",
        explanation: "술술 읽히지 않게 만들어서, 거울 속 나를 보듯 말을 다시 보게 해요."
    },
    {
        id: "geoul-left",
        poemId: "leesang-geoul",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "거울 속의 나는 어떤 사람인가요?",
        choices: ["내 악수를 받을 줄 모르는 왼손잡이", "나와 똑같은 오른손잡이", "말을 잘 알아듣는 사람"],
        answer: "내 악수를 받을 줄 모르는 왼손잡이",
        explanation: "거울은 좌우를 뒤집어요. 그래서 손을 내밀어도 잡히지 않아요."
    },
    {
        id: "geoul-meet",
        poemId: "leesang-geoul",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "거울이 아니었다면 어떻게 되었을 거라고 했나요?",
        choices: [
            "거울 속의 나를 만나 보지도 못했을 거라고",
            "더 행복했을 거라고",
            "악수를 할 수 있었을 거라고"
        ],
        answer: "거울 속의 나를 만나 보지도 못했을 거라고",
        explanation: "거울 때문에 못 만지지만, 거울 덕분에 만나기는 해요. 앞뒤가 어긋난 관계예요."
    },
    {
        id: "geoul-worry",
        poemId: "leesang-geoul",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 줄에서 섭섭한 까닭은 무엇인가요?",
        choices: [
            "거울 속의 나를 근심하고 진찰할 수 없어서",
            "거울이 깨져서",
            "거울 속의 내가 사라져서"
        ],
        answer: "거울 속의 나를 근심하고 진찰할 수 없어서",
        explanation: "나와 또 다른 나가 갈라져 있는데 돌봐 줄 수가 없어요."
    },
    {
        id: "gohyang-not",
        poemId: "jiyong-gohyang",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "고향에 돌아온 말하는 이는 무엇을 느끼나요?",
        choices: ["그리던 고향이 아니라는 것", "고향이 더 좋아졌다는 것", "고향이 사라졌다는 것"],
        answer: "그리던 고향이 아니라는 것",
        explanation: "산꿩도 뻐꾸기도 그대로인데 고향이 아니래요. 변한 것은 나예요."
    },
    {
        id: "gohyang-cloud",
        poemId: "jiyong-gohyang",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마음을 무엇에 견주었나요?",
        choices: ["머언 항구로 떠도는 구름", "알을 품은 산꿩", "높푸른 하늘"],
        answer: "머언 항구로 떠도는 구름",
        explanation: "몸은 고향에 있는데 마음은 어디에도 머물지 못해요."
    },
    {
        id: "gohyang-sky",
        poemId: "jiyong-gohyang",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "처음과 끝은 어떻게 다른가요?",
        choices: [
            "'고향은 아니러뇨'가 '하늘만이 높푸르구나'로 바뀌어요",
            "똑같이 되풀이돼요",
            "끝에서 고향을 되찾아요"
        ],
        answer: "'고향은 아니러뇨'가 '하늘만이 높푸르구나'로 바뀌어요",
        explanation: "같은 첫 줄로 돌아오지만, 남은 것은 하늘뿐이라고 매듭지어요."
    },
    {
        id: "sewol-remember",
        poemId: "inhwan-sewol",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "잊은 것과 남은 것은 각각 무엇인가요?",
        choices: [
            "이름은 잊고 눈동자와 입술은 남았어요",
            "얼굴은 잊고 이름은 남았어요",
            "모두 잊었어요"
        ],
        answer: "이름은 잊고 눈동자와 입술은 남았어요",
        explanation: "머리로 기억하는 것은 사라지고 가슴에 남은 것만 남았어요."
    },
    {
        id: "sewol-leaf",
        poemId: "inhwan-sewol",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "나뭇잎은 무엇을 보여 주나요?",
        choices: [
            "떨어지고 흙이 되며 흐르는 세월",
            "가을 공원의 아름다움",
            "다시 올 봄"
        ],
        answer: "떨어지고 흙이 되며 흐르는 세월",
        explanation: "떨어지고, 흙이 되고, 덮어요. 세 걸음으로 사랑이 묻히는 시간을 그려요."
    },
    {
        id: "modern-strange",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 시 세 편을 떠올려 보세요.",
        sentence: "「거울」「고향」「세월이 가면」에서 낯설어진 것은 각각 무엇인가요?",
        choices: [
            "나, 고향, 사랑하던 사람",
            "거울, 산, 공원",
            "왼손, 구름, 나뭇잎"
        ],
        answer: "나, 고향, 사랑하던 사람",
        explanation: "가장 가까웠던 것들이 낯설어지는 자리에서 세 시가 나왔어요."
    },

    // ── 중3 · 강물에 실은 마음 ────────────────────────────────────
    {
        id: "nongae-colors",
        poemId: "yeongro-nongae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "묶음마다 맞세운 두 빛깔은 무엇인가요?",
        choices: [
            "강낭콩꽃보다 푸른 물결과 양귀비꽃보다 붉은 마음",
            "흰 눈과 검은 밤",
            "노란 들판과 초록 산"
        ],
        answer: "강낭콩꽃보다 푸른 물결과 양귀비꽃보다 붉은 마음",
        explanation: "꽃보다 더 푸르고 꽃보다 더 붉다고 해요. 빛깔을 견주어 마음을 세워요."
    },
    {
        id: "nongae-refrain",
        poemId: "yeongro-nongae",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "세 묶음 끝에 똑같이 붙는 것은 무엇인가요?",
        choices: [
            "'아, 강낭콩꽃보다도…' 하고 시작하는 네 줄",
            "'거룩한 분노는' 하고 시작하는 두 줄",
            "논개의 이름"
        ],
        answer: "'아, 강낭콩꽃보다도…' 하고 시작하는 네 줄",
        explanation: "옛 노래의 후렴처럼 같은 네 줄이 세 번 돌아와요."
    },
    {
        id: "nongae-deed",
        poemId: "yeongro-nongae",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'죽음을 입맞추었네'는 무슨 일을 말하나요?",
        choices: [
            "적장을 안고 강물에 몸을 던진 일",
            "병으로 세상을 떠난 일",
            "먼 길을 떠난 일"
        ],
        answer: "적장을 안고 강물에 몸을 던진 일",
        explanation: "임진왜란 때 진주 남강에서 있었던 일이에요. 죽음을 두려워하지 않았다는 뜻이에요."
    },
    {
        id: "songin-grass",
        poemId: "jisang-songin",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비 갠 긴 둑에 무엇이 짙다고 했나요?",
        choices: ["풀빛", "안개", "노을"],
        answer: "풀빛",
        explanation: "슬픈 이별을 환한 봄 풍경 위에 놓았어요."
    },
    {
        id: "songin-river",
        poemId: "jisang-songin",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "대동강 물이 마르지 않는 까닭은 무엇이라고 했나요?",
        choices: [
            "해마다 이별 눈물이 보태져서",
            "비가 자주 와서",
            "바다와 이어져서"
        ],
        answer: "해마다 이별 눈물이 보태져서",
        explanation: "눈물이 강을 채운다는 과장이 천 년 넘게 살아남았어요."
    },
    {
        id: "river-common",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 시 세 편을 떠올려 보세요.",
        sentence: "「논개」「님을 보내며」「천만 리 머나먼 길에」가 똑같이 쓰는 방법은 무엇인가요?",
        choices: [
            "마음을 강물에 실어 흐르게 해요",
            "마음을 별에 실어요",
            "마음을 꽃에 실어요"
        ],
        answer: "마음을 강물에 실어 흐르게 해요",
        explanation: "붉은 마음이 흐르고, 눈물이 강을 채우고, 냇물이 대신 울어요."
    },

    // ── 중3 · 가사와 어부의 노래 ──────────────────────────────────
    {
        id: "sangchun-who",
        poemId: "geugin-sangchun",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "말하는 이는 어디에 살고 있나요?",
        choices: ["푸른 시냇물 앞 몇 칸 초가집", "서울 한복판", "바닷가 어촌"],
        answer: "푸른 시냇물 앞 몇 칸 초가집",
        explanation: "세상 먼지를 떠나 소나무 대나무 우거진 곳에 자리 잡았어요."
    },
    {
        id: "sangchun-spring",
        poemId: "geugin-sangchun",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "새봄의 풍경으로 나온 것은 무엇인가요?",
        choices: [
            "석양 속 복숭아꽃 살구꽃과 가랑비 속 푸른 버들",
            "눈 덮인 산과 얼어붙은 시내",
            "단풍 든 골짜기"
        ],
        answer: "석양 속 복숭아꽃 살구꽃과 가랑비 속 푸른 버들",
        explanation: "꽃은 저녁 빛 속에, 풀은 가는 비 속에 두어 빛깔을 살렸어요."
    },
    {
        id: "sangchun-question",
        poemId: "geugin-sangchun",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "'칼로 말아 낸가 붓으로 그려 낸가'는 어떤 말인가요?",
        choices: [
            "봄 경치가 누가 만든 듯 아름답다는 감탄",
            "누가 산을 깎았느냐는 물음",
            "그림을 그리고 싶다는 말"
        ],
        answer: "봄 경치가 누가 만든 듯 아름답다는 감탄",
        explanation: "물음 꼴을 빌린 감탄이에요. 조화신공이 물물마다 요란하다고 이어요."
    },
    {
        id: "sangchun-unity",
        poemId: "geugin-sangchun",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "'물아일체'는 무슨 뜻인가요?",
        choices: ["자연과 내가 하나가 됨", "물과 물고기가 하나임", "몸과 마음이 하나임"],
        answer: "자연과 내가 하나가 됨",
        explanation: "새가 봄기운에 겨워 울듯 나도 흥이 다르지 않다고 해요."
    },
    {
        id: "eobu-refrain",
        poemId: "seondo-eobu",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "두 수에 붙은 후렴은 무엇인가요?",
        choices: [
            "'배 떠라 배 떠라' 같은 명령과 '지국총 지국총 어사와'",
            "'아으 동동다리'",
            "'얄리얄리 얄랑셩'"
        ],
        answer: "'배 떠라 배 떠라' 같은 명령과 '지국총 지국총 어사와'",
        explanation: "둘째 줄 후렴은 수마다 바뀌어요. 배 떠라, 닻 들어라, 돛 달아라 하며 하루 뱃일을 따라가요."
    },
    {
        id: "eobu-scene",
        poemId: "seondo-eobu",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "첫 수의 아침 풍경은 어떤가요?",
        choices: [
            "앞 포구에 안개 걷히고 뒷산에 해가 비쳐요",
            "비바람이 몰아쳐요",
            "눈이 내려요"
        ],
        answer: "앞 포구에 안개 걷히고 뒷산에 해가 비쳐요",
        explanation: "밤물이 빠지고 낮물이 밀려오는 이른 아침이에요."
    },
    {
        id: "eobu-gull",
        poemId: "seondo-eobu",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "둘째 수에서 배에 실었느냐고 묻는 것은 무엇인가요?",
        choices: ["막걸리 병", "그물", "도시락"],
        answer: "막걸리 병",
        explanation: "낚싯대는 쥐었으니 술도 챙겼느냐는 말이에요. 고기잡이보다 흥이 먼저예요."
    },
    {
        id: "gwandong-why",
        poemId: "jeongcheol-gwandong",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "말하는 이가 길을 떠나는 까닭은 무엇인가요?",
        choices: [
            "관동 팔백 리를 다스리라는 임금의 명을 받아서",
            "병을 고치러 가느라",
            "고향에 돌아가려고"
        ],
        answer: "관동 팔백 리를 다스리라는 임금의 명을 받아서",
        explanation: "죽림에 누워 있다가 강원도 관찰사가 되어 떠나요."
    },
    {
        id: "gwandong-feel",
        poemId: "jeongcheol-gwandong",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "임금의 은혜를 어떻다고 했나요?",
        choices: ["갈수록 망극하다", "부담스럽다", "당연하다"],
        answer: "갈수록 망극하다",
        explanation: "'어와 성은이야'라는 감탄으로 시작해요."
    },
    {
        id: "gwandong-road",
        poemId: "jeongcheol-gwandong",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "평구역, 흑수, 섬강, 치악, 소양강, 동주를 늘어놓은 것은 무엇을 보여 주나요?",
        choices: ["길을 떠나 지나온 곳을 차례로 적은 여정", "고향 마을의 이름들", "꿈에서 본 곳들"],
        answer: "길을 떠나 지나온 곳을 차례로 적은 여정",
        explanation: "가사는 이렇게 길 위의 일을 순서대로 늘어놓기에 좋은 틀이에요."
    },
    {
        id: "gasa-shape",
        poemId: "",
        category: "견주어 읽기",
        prompt: "「상춘곡」과 「관동별곡」을 떠올려 보세요.",
        sentence: "가사는 시조와 어떻게 다른가요?",
        choices: [
            "네 마디 가락이 끊기지 않고 길게 이어져요",
            "석 줄로 끝나요",
            "후렴이 반드시 있어요"
        ],
        answer: "네 마디 가락이 끊기지 않고 길게 이어져요",
        explanation: "시조가 석 줄에 담는 것을 가사는 수십 줄, 수백 줄로 늘여요."
    },

    // ── 고1 · 정지용의 산과 겨울 ──────────────────────────────────
    {
        id: "bi-start",
        poemId: "jiyong-bi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "비가 내리기 시작하는 순간을 무엇으로 그렸나요?",
        choices: [
            "붉은 잎을 소란히 밟고 가는 걸음",
            "우산을 펴는 손",
            "빗소리를 듣는 귀"
        ],
        answer: "붉은 잎을 소란히 밟고 가는 걸음",
        explanation: "빗방울이 낙엽 위로 떨어지는 것을 걸음으로 보았어요."
    },
    {
        id: "bi-no-feeling",
        poemId: "jiyong-bi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시에서 말하는 이의 감정을 나타내는 낱말은 몇 개나 되나요?",
        choices: ["하나도 없어요", "묶음마다 하나씩", "마지막에 하나"],
        answer: "하나도 없어요",
        explanation: "장면만 차례로 놓았어요. 느낌은 읽는 사람 몫으로 남겨요."
    },
    {
        id: "bi-bird",
        poemId: "jiyong-bi",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "바람 뒤에 오는 무엇을 산새 걸음걸이에 견주었나요?",
        choices: ["처음 듣는 빗방울 소리", "여울의 물살", "붉은 잎"],
        answer: "처음 듣는 빗방울 소리",
        explanation: "종종 까칠한 다리로 걷는 산새처럼, 비가 툭툭 시작돼요."
    },
    {
        id: "indong-winter",
        poemId: "jiyong-indongcha",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "산중의 겨울은 어떻다고 했나요?",
        choices: ["달력도 없이 석 달이 하얗다", "눈이 오지 않는다", "봄이 일찍 온다"],
        answer: "달력도 없이 석 달이 하얗다",
        explanation: "날짜를 셀 일도 없이 눈 속에 잠긴 겨울이에요."
    },
    {
        id: "indong-warm",
        poemId: "jiyong-indongcha",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "눈보라 치는 바깥과 달리 방 안에 있는 따뜻한 것들은 무엇인가요?",
        choices: [
            "자작나무 불, 파릇한 무 순, 훈훈한 흙냄새",
            "촛불, 이불, 화로",
            "난로, 책, 창"
        ],
        answer: "자작나무 불, 파릇한 무 순, 훈훈한 흙냄새",
        explanation: "빛깔과 냄새로 방 안의 온기를 그렸어요."
    },
    {
        id: "jangsu-quiet",
        poemId: "jiyong-jangsusan",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "장수산의 고요는 어느 정도라고 했나요?",
        choices: ["뼈를 저리게 하는 고요", "잠이 오는 고요", "새소리가 들리는 고요"],
        answer: "뼈를 저리게 하는 고요",
        explanation: "다람쥐도 산새도 없고 눈과 밤이 종이보다 희어요."
    },
    {
        id: "jangsu-endure",
        poemId: "jiyong-jangsusan",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'오오 견디랸다'에서 무엇을 어떻게 견디겠다고 하나요?",
        choices: [
            "슬픔도 꿈도 없이 겨울 한밤을 견디겠다고",
            "산을 내려가겠다고",
            "중을 따라가겠다고"
        ],
        answer: "슬픔도 꿈도 없이 겨울 한밤을 견디겠다고",
        explanation: "시름이 고요 속에서 흔들리는데, 차고 우뚝하게 견디겠대요."
    },
    {
        id: "jangsu-form",
        poemId: "jiyong-jangsusan",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시의 생김새는 어떤가요?",
        choices: ["줄을 나누지 않은 산문시", "세 줄 시조", "후렴이 있는 노래"],
        answer: "줄을 나누지 않은 산문시",
        explanation: "끊기지 않는 한 덩어리가 끊기지 않는 고요와 닮았어요."
    },
    {
        id: "jiyong-late",
        poemId: "",
        category: "견주어 읽기",
        prompt: "정지용의 시 네 편을 떠올려 보세요.",
        sentence: "「비」「인동차」「장수산 1」이 「유리창 1」과 닮은 점은 무엇인가요?",
        choices: [
            "감정을 지우고 장면과 견딤만 남겨요",
            "고향을 그리워해요",
            "후렴을 되풀이해요"
        ],
        answer: "감정을 지우고 장면과 견딤만 남겨요",
        explanation: "시험에 자주 나오는 정지용은 향수의 정지용이 아니라 이 산과 겨울의 정지용이에요."
    },

    // ── 고1 · 김영랑과 이육사, 다른 얼굴 ──────────────────────────
    {
        id: "dok-what",
        poemId: "yeongrang-dok",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "가슴에 찬 '독'은 무엇을 가리킬까요?",
        choices: [
            "세상에 맞서 자기를 지키는 굳은 마음",
            "남을 해치려는 마음",
            "병"
        ],
        answer: "세상에 맞서 자기를 지키는 굳은 마음",
        explanation: "아직 아무도 해한 일 없는 독이에요. 지키는 독이지 해치는 독이 아니에요."
    },
    {
        id: "dok-friend",
        poemId: "yeongrang-dok",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "벗은 무엇이라고 하나요?",
        choices: [
            "어차피 다 허무하니 독을 흩어 버리라고",
            "독을 더 차라고",
            "함께 싸우자고"
        ],
        answer: "어차피 다 허무하니 독을 흩어 버리라고",
        explanation: "'허무한듸!'가 벗의 말이에요. 시는 그 말에 맞서요."
    },
    {
        id: "dok-end",
        poemId: "yeongrang-dok",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "마지막 두 줄에서 무엇을 다짐하나요?",
        choices: [
            "독을 차고 가서 마지막 날 외로운 혼을 건지겠다고",
            "독을 버리고 벗을 따르겠다고",
            "짐승의 밥이 되겠다고"
        ],
        answer: "독을 차고 가서 마지막 날 외로운 혼을 건지겠다고",
        explanation: "봄을 노래하던 시인이 나라 잃은 때에 쓴 결의예요."
    },
    {
        id: "buk-leather",
        poemId: "yeongrang-buk",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "소리를 떠나면 북은 무엇이라고 했나요?",
        choices: ["오직 가죽일 뿐", "악기일 뿐", "장단일 뿐"],
        answer: "오직 가죽일 뿐",
        explanation: "북은 소리꾼과 숨결이 맞을 때만 북이에요."
    },
    {
        id: "buk-jeongjungdong",
        poemId: "yeongrang-buk",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "'정중동'을 시는 어떻게 풀었나요?",
        choices: ["소란 속에 고요 있어", "고요 속에 잠들어", "소란 속에 더 소란해"],
        answer: "소란 속에 고요 있어",
        explanation: "북소리 한복판에 고요가 있고 그때 인생이 가을같이 익는대요."
    },
    {
        id: "jayagok-home",
        poemId: "yuksa-jayagok",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "고향은 어떤 모습이라고 했나요?",
        choices: [
            "수만 집의 불빛이어야 할 곳이 무덤 위 이끼로",
            "불빛이 가득한 항구로",
            "나비가 날아드는 꽃밭으로"
        ],
        answer: "수만 집의 불빛이어야 할 곳이 무덤 위 이끼로",
        explanation: "'이라야 할'과 '이언만'이 마땅한 모습과 지금 모습을 맞세워요."
    },
    {
        id: "jayagok-frame",
        poemId: "yuksa-jayagok",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "시의 처음과 끝은 어떤가요?",
        choices: ["같은 두 줄로 감싸요", "정반대예요", "끝에서 희망으로 바뀌어요"],
        answer: "같은 두 줄로 감싸요",
        explanation: "「자야곡」에는 「광야」 같은 미래가 없어요. 같은 자리로 돌아와요."
    },
    {
        id: "two-faces",
        poemId: "",
        category: "견주어 읽기",
        prompt: "김영랑의 시들을 떠올려 보세요.",
        sentence: "「돌담에 속삭이는 햇발」과 「독을 차고」를 나란히 놓으면 무엇이 보이나요?",
        choices: [
            "같은 시인의 부드러운 얼굴과 결의에 찬 얼굴",
            "다른 두 시인의 시",
            "같은 마음을 두 번 쓴 것"
        ],
        answer: "같은 시인의 부드러운 얼굴과 결의에 찬 얼굴",
        explanation: "시험은 이런 낯선 얼굴을 내요. 시인의 이름만 믿고 봄 시라 여기면 틀려요."
    },

    // ── 고1 · 윤동주, 잃어버린 것을 찾아서 ────────────────────────
    {
        id: "gil-lost",
        poemId: "dongju-gil",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "말하는 이는 무엇을 잃었나요?",
        choices: ["무엇을 어디에 잃었는지도 몰라요", "지갑", "길"],
        answer: "무엇을 어디에 잃었는지도 몰라요",
        explanation: "잃었다는 것만 알고 그것이 무엇인지는 몰라요. 그래서 계속 걸어요."
    },
    {
        id: "gil-wall",
        poemId: "dongju-gil",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "길을 따라 이어지는 돌담과 굳게 닫힌 쇠문은 무엇일까요?",
        choices: ["나를 가로막는 것", "집", "고향의 풍경"],
        answer: "나를 가로막는 것",
        explanation: "담 저쪽에 내가 남아 있는데 문이 닫혀 있어요."
    },
    {
        id: "gil-sky",
        poemId: "dongju-gil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "돌담을 더듬다 쳐다본 하늘은 어떻다고 했나요?",
        choices: ["부끄럽게 푸르다", "어둡게 흐리다", "붉게 물들었다"],
        answer: "부끄럽게 푸르다",
        explanation: "「서시」의 하늘이 여기에도 있어요."
    },
    {
        id: "gil-why-walk",
        poemId: "dongju-gil",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "풀 한 포기 없는 길을 걷는 까닭은 무엇인가요?",
        choices: [
            "담 저쪽에 내가 남아 있어서",
            "집으로 가는 길이라서",
            "누가 시켜서"
        ],
        answer: "담 저쪽에 내가 남아 있어서",
        explanation: "잃은 것은 결국 참된 나예요. 그것을 찾는 것이 사는 까닭이래요."
    },
    {
        id: "gan-stories",
        poemId: "dongju-gan",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "이 시가 끌어온 두 이야기는 무엇인가요?",
        choices: [
            "토끼전의 토끼와 프로메테우스",
            "심청전과 흥부전",
            "견우직녀와 오디세우스"
        ],
        answer: "토끼전의 토끼와 프로메테우스",
        explanation: "둘 다 간을 노림 당하는 이야기예요. 용궁의 거북, 독수리."
    },
    {
        id: "gan-eagle",
        poemId: "dongju-gan",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "독수리에게 뭐라고 하나요?",
        choices: [
            "뜯어 먹어라, 너는 살찌고 나는 여위어야지",
            "저리 가라",
            "나를 지켜라"
        ],
        answer: "뜯어 먹어라, 너는 살찌고 나는 여위어야지",
        explanation: "내가 기르던 독수리예요. 양심의 가책을 스스로 받겠다는 말이에요."
    },
    {
        id: "gan-turtle",
        poemId: "dongju-gan",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "거북에게는 뭐라고 하나요?",
        choices: [
            "다시는 용궁의 유혹에 안 떨어진다고",
            "함께 가자고",
            "간을 주겠다고"
        ],
        answer: "다시는 용궁의 유혹에 안 떨어진다고",
        explanation: "용궁은 편하게 살라는 유혹이에요. 간을 지키겠다는 다짐이에요."
    },
    {
        id: "dongju-search",
        poemId: "",
        category: "견주어 읽기",
        prompt: "윤동주의 시 세 편을 떠올려 보세요.",
        sentence: "「길」「간」「참회록」에 똑같이 있는 것은 무엇인가요?",
        choices: [
            "잃은 것을 찾고 자기를 지키려는 다짐",
            "고향을 그리워하는 마음",
            "사랑하는 사람을 부르는 소리"
        ],
        answer: "잃은 것을 찾고 자기를 지키려는 다짐",
        explanation: "담 저쪽의 나, 지켜야 할 간, 닦아야 할 거울이에요."
    },

    // ── 고1 · 이상, 낯선 시 ───────────────────────────────────────
    {
        id: "ogamdo-children",
        poemId: "leesang-ogamdo",
        category: "장면 확인",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "열세 아이는 무엇을 하고 있나요?",
        choices: ["무섭다고 하며 도로를 달려요", "골목에서 놀아요", "집으로 돌아가요"],
        answer: "무섭다고 하며 도로를 달려요",
        explanation: "제1의 아이부터 제13의 아이까지 모두 무섭다고 해요."
    },
    {
        id: "ogamdo-alley",
        poemId: "leesang-ogamdo",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "길에 대해 괄호 안에서 두 번 말한 것은 어떻게 다른가요?",
        choices: [
            "처음엔 막다른 골목이 적당하다더니 끝엔 뚫린 골목이라도 좋다고 해요",
            "둘 다 막다른 골목이라고 해요",
            "둘 다 뚫린 골목이라고 해요"
        ],
        answer: "처음엔 막다른 골목이 적당하다더니 끝엔 뚫린 골목이라도 좋다고 해요",
        explanation: "길이 막혔든 뚫렸든 무서움은 같아요. 출구가 있어도 소용없다는 뜻이에요."
    },
    {
        id: "ogamdo-fear",
        poemId: "leesang-ogamdo",
        category: "마음 읽기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "열세 아이는 어떤 아이들로만 되어 있나요?",
        choices: [
            "무서운 아이와 무서워하는 아이",
            "착한 아이와 나쁜 아이",
            "큰 아이와 작은 아이"
        ],
        answer: "무서운 아이와 무서워하는 아이",
        explanation: "누가 무서운 쪽이고 누가 무서워하는 쪽인지도 상관없대요. 온 세상이 두려움뿐이에요."
    },
    {
        id: "ogamdo-why",
        poemId: "leesang-ogamdo",
        category: "표현 찾기",
        prompt: "시를 읽고 답해 보세요.",
        sentence: "같은 줄을 열세 번 거듭하고 띄어쓰기를 없앤 까닭은 무엇일까요?",
        choices: [
            "숨 막히는 두려움을 글의 생김새로 느끼게 하려고",
            "글자 수를 채우려고",
            "아이들 이름을 몰라서"
        ],
        answer: "숨 막히는 두려움을 글의 생김새로 느끼게 하려고",
        explanation: "읽다 보면 답답해져요. 그 답답함이 시가 말하려는 것이에요."
    },
    {
        id: "leesang-two",
        poemId: "leesang-geoul",
        category: "견주어 읽기",
        prompt: "「거울」과 「오감도 시제1호」를 나란히 놓고 답해 보세요.",
        sentence: "이상의 두 시가 생김새에서 똑같이 하는 일은 무엇인가요?",
        choices: [
            "띄어쓰기를 없애 낯설게 만들어요",
            "후렴을 되풀이해요",
            "높임말로 님에게 말해요"
        ],
        answer: "띄어쓰기를 없애 낯설게 만들어요",
        explanation: "1930년대에 이런 시가 신문에 실리자 독자들이 화를 내며 연재를 멈추게 했어요."
    },

    // ── 고1 · 향가 더 읽기 ────────────────────────────────────────
    {
        id: "changiparang-moon",
        poemId: "hyangga-changiparang",
        category: "장면 확인",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "달과 물가와 수풀에서 무엇을 보나요?",
        choices: ["기파랑의 모습", "떠난 님의 얼굴", "부처의 모습"],
        answer: "기파랑의 모습",
        explanation: "자연 곳곳에 기리는 사람의 모습을 실었어요."
    },
    {
        id: "changiparang-pine",
        poemId: "hyangga-changiparang",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "잣나무 가지가 높아 서리를 모른다는 것은 무엇을 기리는 말인가요?",
        choices: ["세상에 꺾이지 않는 높은 인격", "키가 큰 것", "잣나무를 심은 일"],
        answer: "세상에 꺾이지 않는 높은 인격",
        explanation: "서리는 시련이고, 그 서리가 닿지 않는 높이가 기파랑의 인품이에요."
    },
    {
        id: "anmin-family",
        poemId: "hyangga-anminga",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "임금·신하·백성을 무엇에 견주었나요?",
        choices: ["아버지·어머니·아이", "하늘·땅·사람", "머리·손·발"],
        answer: "아버지·어머니·아이",
        explanation: "나라를 한 집안으로 보았어요."
    },
    {
        id: "anmin-peace",
        poemId: "hyangga-anminga",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "나라가 태평해지는 조건은 무엇이라고 했나요?",
        choices: [
            "임금답게 신하답게 백성답게 하는 것",
            "세금을 줄이는 것",
            "전쟁에서 이기는 것"
        ],
        answer: "임금답게 신하답게 백성답게 하는 것",
        explanation: "저마다 제 자리에 맞게 하라는 말이에요. 임금이 지어 달라고 한 노래예요."
    },
    {
        id: "hyangga-ah",
        poemId: "hyangga-jemangmaega",
        category: "견주어 읽기",
        prompt: "「제망매가」「찬기파랑가」「안민가」를 나란히 놓고 답해 보세요.",
        sentence: "세 노래의 아홉째 줄이 똑같이 시작하는 말은 무엇인가요?",
        choices: ["아아", "님아", "달아"],
        answer: "아아",
        explanation: "열 줄 향가는 아홉째 줄을 감탄으로 시작해 매듭을 지어요."
    },
    {
        id: "hyangga-ten",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 향가들을 떠올려 보세요.",
        sentence: "열 줄 향가의 짜임은 어떤가요?",
        choices: [
            "네 줄, 네 줄, 그리고 감탄으로 시작하는 두 줄",
            "세 줄씩 세 묶음",
            "후렴이 있는 여러 묶음"
        ],
        answer: "네 줄, 네 줄, 그리고 감탄으로 시작하는 두 줄",
        explanation: "마지막 두 줄이 시조의 마지막 줄과 닮았다고 보기도 해요."
    },

    // ── 고1 · 조선의 노래 ─────────────────────────────────────────
    {
        id: "yongbi-tree",
        poemId: "joseon-yongbi",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "뿌리 깊은 나무는 어떻다고 했나요?",
        choices: [
            "바람에 흔들리지 않아 꽃 좋고 열매 많다",
            "바람에 쓰러진다",
            "그늘이 넓다"
        ],
        answer: "바람에 흔들리지 않아 꽃 좋고 열매 많다",
        explanation: "샘이 깊은 물이 바다에 이르는 것과 짝을 이뤄요."
    },
    {
        id: "yongbi-meaning",
        poemId: "joseon-yongbi",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "뿌리 깊은 나무와 샘 깊은 물은 무엇을 가리키나요?",
        choices: ["뿌리가 깊어 오래갈 조선 왕조", "산과 강", "농사"],
        answer: "뿌리가 깊어 오래갈 조선 왕조",
        explanation: "여섯 조상의 공덕이 뿌리이고, 그래서 나라가 흔들리지 않는다는 노래예요."
    },
    {
        id: "yongbi-first",
        poemId: "joseon-yongbi",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "이 노래가 특별한 까닭은 무엇인가요?",
        choices: [
            "훈민정음으로 지은 첫 노래라서",
            "가장 긴 노래라서",
            "임금이 직접 불러서"
        ],
        answer: "훈민정음으로 지은 첫 노래라서",
        explanation: "새 글자를 만들고 그 글자로 나라의 노래부터 지었어요."
    },
    {
        id: "samiin-who",
        poemId: "jeongcheol-samiin",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "말하는 이는 누구의 말투로 말하나요?",
        choices: [
            "님을 그리는 여인의 말투로, 실은 임금을 그리는 신하",
            "임금의 말투로",
            "농부의 말투로"
        ],
        answer: "님을 그리는 여인의 말투로, 실은 임금을 그리는 신하",
        explanation: "벼슬에서 물러난 정철이 임금 그리는 마음을 여인의 목소리로 썼어요."
    },
    {
        id: "samiin-time",
        poemId: "jeongcheol-samiin",
        category: "표현 찾기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "광한전에서 하계로 내려왔다는 말은 무엇을 뜻하나요?",
        choices: [
            "임금 곁에서 멀리 떨어지게 된 것",
            "달나라 여행",
            "죽어서 저승에 간 것"
        ],
        answer: "임금 곁에서 멀리 떨어지게 된 것",
        explanation: "머리 빗은 지 삼 년이라는 말이 떨어져 지낸 시간이에요."
    },
    {
        id: "samiin-plum",
        poemId: "jeongcheol-samiin",
        category: "마음 읽기",
        prompt: "노래를 읽고 답해 보세요.",
        sentence: "봄에 핀 매화를 어떻게 하고 싶어 하나요?",
        choices: ["꺾어서 님 계신 데 보내고 싶어 해요", "심고 싶어 해요", "혼자 보고 싶어 해요"],
        answer: "꺾어서 님 계신 데 보내고 싶어 해요",
        explanation: "달빛 속 매화가 님인가 싶다가, 님께 보내고 싶어져요."
    },
    {
        id: "joseon-purpose",
        poemId: "",
        category: "견주어 읽기",
        prompt: "「용비어천가」와 「사미인곡」을 떠올려 보세요.",
        sentence: "두 노래는 무엇을 위해 지어졌나요?",
        choices: [
            "하나는 왕조를 기리려고, 하나는 임금을 향한 마음을 전하려고",
            "둘 다 백성을 가르치려고",
            "둘 다 자연을 노래하려고"
        ],
        answer: "하나는 왕조를 기리려고, 하나는 임금을 향한 마음을 전하려고",
        explanation: "나라 이야기라도 하나는 나라의 노래, 하나는 한 사람의 노래예요."
    },

    // ── 고1 · 교과서에서 읽는 시 ──────────────────────────────────
    {
        id: "yeoseung-life",
        poemId: "baekseok-yeoseung",
        category: "장면 확인",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "여승이 되기 전 그 여인은 어떤 일을 겪었나요?",
        choices: [
            "남편이 떠나고 어린 딸마저 잃었어요",
            "큰 부자가 되었어요",
            "먼 나라로 떠났어요"
        ],
        answer: "남편이 떠나고 어린 딸마저 잃었어요",
        explanation: "가족을 다 잃고 절로 들어간 사연이에요."
    },
    {
        id: "yeoseung-time",
        poemId: "baekseok-yeoseung",
        category: "표현 찾기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "여승의 이야기는 어느 때부터 어느 때로 풀려 가나요?",
        choices: [
            "지금의 여승을 보고 지난날로 거슬러 올라가요",
            "어린 시절부터 차례로 흘러요",
            "하루 동안의 일이에요"
        ],
        answer: "지금의 여승을 보고 지난날로 거슬러 올라가요",
        explanation: "첫 묶음이 지금이고 그 뒤가 과거예요. 순서를 바꿔서 사연이 더 무거워져요."
    },
    {
        id: "yeoseung-last",
        poemId: "baekseok-yeoseung",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "마지막 장면은 무엇인가요?",
        choices: [
            "머리를 깎으며 눈물짓는 장면",
            "딸을 다시 만나는 장면",
            "절을 떠나는 장면"
        ],
        answer: "머리를 깎으며 눈물짓는 장면",
        explanation: "머리카락이 떨어지는 장면으로 한 사람의 삶을 닫아요."
    },
    {
        id: "platanus-friend",
        poemId: "hyeonseung-platanus",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "말하는 이에게 플라타너스는 어떤 존재인가요?",
        choices: ["길을 함께 가는 벗", "그늘을 주는 나무일 뿐", "베어야 할 나무"],
        answer: "길을 함께 가는 벗",
        explanation: "너를 맞아 줄 곳을 마련하겠다고 할 만큼 가까운 벗이에요."
    },
    {
        id: "platanus-soul",
        poemId: "hyeonseung-platanus",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "벗에게 나눠 줄 수 없다고 한 것은 무엇인가요?",
        choices: ["영혼", "그늘", "물"],
        answer: "영혼",
        explanation: "아무리 가까워도 넘어설 수 없는 선이 있어요. 나무와 사람의 거리예요."
    },
    {
        id: "bidulgi-lost",
        poemId: "gwangseop-bidulgi",
        category: "장면 확인",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "비둘기가 잃은 것은 무엇인가요?",
        choices: ["산이 파헤쳐지며 잃은 보금자리", "먹이", "짝"],
        answer: "산이 파헤쳐지며 잃은 보금자리",
        explanation: "돌 깨는 소리에 놀라 날아오른 비둘기가 앉을 곳이 없어요."
    },
    {
        id: "bidulgi-symbol",
        poemId: "gwangseop-bidulgi",
        category: "표현 찾기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "비둘기는 무엇을 가리키나요?",
        choices: ["사라져 가는 자연과 평화", "도시의 새", "가난한 사람"],
        answer: "사라져 가는 자연과 평화",
        explanation: "사람이 산을 허물면서 평화도 함께 잃는다는 말이에요."
    },
    {
        id: "nakhwa-time",
        poemId: "hyeonggi-nakhwa",
        category: "마음 읽기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "이 시가 아름답다고 하는 것은 무엇인가요?",
        choices: [
            "가야 할 때를 알고 가는 이의 뒷모습",
            "활짝 핀 꽃",
            "봄의 새싹"
        ],
        answer: "가야 할 때를 알고 가는 이의 뒷모습",
        explanation: "지는 꽃을 슬퍼하지 않고 때를 아는 것이라 봐요."
    },
    {
        id: "nakhwa-fruit",
        poemId: "hyeonggi-nakhwa",
        category: "표현 찾기",
        prompt: "교과서에서 시를 읽고 답해 보세요.",
        sentence: "꽃이 진 뒤에 무엇이 온다고 했나요?",
        choices: ["열매", "겨울", "다른 꽃"],
        answer: "열매",
        explanation: "헤어짐이 축복이 되는 까닭이에요. 지는 것이 있어야 맺히는 것이 있어요."
    },
    {
        id: "textbook-h1-common",
        poemId: "",
        category: "견주어 읽기",
        prompt: "이 묶음의 시 네 편을 떠올려 보세요.",
        sentence: "「여승」「플라타너스」「성북동 비둘기」「낙화」가 똑같이 바라보는 것은 무엇인가요?",
        choices: [
            "잃음과 떠남",
            "고향과 어머니",
            "나라와 임금"
        ],
        answer: "잃음과 떠남",
        explanation: "가족을 잃고, 영혼을 나누지 못하고, 보금자리를 잃고, 꽃이 져요."
    }
]);
