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
    }
]);
