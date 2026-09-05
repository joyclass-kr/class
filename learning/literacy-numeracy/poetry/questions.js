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
    }
]);
