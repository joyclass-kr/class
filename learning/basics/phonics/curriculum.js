(() => {
  const W = (scene, korean, hint) => ({ scene, korean, hint });
  const wordBank = {
    sat: W("🧒🪑", "앉았다", "자리에 앉은 모습"), tap: W("🚰", "수도꼭지", "톡톡 두드리기도 해요"), pat: W("🫳", "토닥이다", "손으로 가볍게 두드려요"), pin: W("📌", "핀", "종이를 고정해요"), tin: W("🥫", "깡통", "금속으로 만든 통"), pan: W("🍳", "프라이팬", "음식을 볶는 도구"),
    mad: W("😠", "화난", "기분이 좋지 않아요"), mat: W("🧘", "매트", "바닥에 까는 것"), dip: W("🥣", "찍다", "소스에 살짝 담가요"), dim: W("🌘", "어두운", "빛이 약해요"), cat: W("🐱", "고양이", "야옹 하는 동물"), cap: W("🧢", "모자", "머리에 써요"), kid: W("🧒", "아이", "어린 사람"), sand: W("🏖️", "모래", "해변에서 만나요"),
    dog: W("🐶", "개", "멍멍 짖어요"), log: W("🪵", "통나무", "잘린 나무토막"), fox: W("🦊", "여우", "꼬리가 풍성한 동물"), hot: W("🔥", "뜨거운", "손을 조심해요"), sun: W("☀️", "해", "낮에 밝게 빛나요"), cup: W("🥤", "컵", "물을 담아 마셔요"), bug: W("🐞", "벌레", "작은 곤충"), run: W("🏃", "달리다", "빠르게 움직여요"),
    red: W("🔴", "빨간", "사과 같은 색"), hen: W("🐔", "암탉", "알을 낳는 닭"), bed: W("🛏️", "침대", "잠을 자는 곳"), leg: W("🦵", "다리", "걷고 뛸 때 써요"), jam: W("🍓", "잼", "빵에 발라 먹어요"), jet: W("✈️", "제트기", "아주 빠른 비행기"), van: W("🚐", "승합차", "사람을 태우는 큰 차"), vet: W("🩺", "수의사", "동물을 치료해요"),
    fish: W("🐟", "물고기", "물속에서 헤엄쳐요"), ship: W("🚢", "배", "바다를 건너요"), shop: W("🏪", "가게", "물건을 사는 곳"), chin: W("🙂", "턱", "입 아래에 있어요"), chip: W("🍟", "조각", "작고 얇은 조각"), chat: W("💬", "이야기하다", "친구와 말을 나눠요"), bath: W("🛁", "목욕", "몸을 깨끗이 씻어요"), moth: W("🦋", "나방", "밤에 다니는 곤충"), thin: W("📏", "얇은", "두껍지 않아요"),
    ring: W("💍", "반지", "손가락에 끼워요"), king: W("🤴", "왕", "나라를 다스려요"), song: W("🎵", "노래", "멜로디와 함께 불러요"), duck: W("🦆", "오리", "꽥꽥 우는 새"), sock: W("🧦", "양말", "발에 신어요"), rock: W("🪨", "바위", "단단한 돌"), whip: W("🌀", "휘젓다", "빠르게 저어요"), when: W("⏰", "언제", "시간을 물을 때 써요"),
    frog: W("🐸", "개구리", "폴짝 뛰어요"), crab: W("🦀", "게", "옆으로 걸어요"), drum: W("🥁", "북", "두드려 소리 내요"), flag: W("🚩", "깃발", "바람에 펄럭여요"), plum: W("🟣", "자두", "보라색 과일"), clap: W("👏", "박수치다", "두 손을 마주쳐요"), stop: W("🛑", "멈추다", "움직임을 그쳐요"), star: W("⭐", "별", "밤하늘에 빛나요"), swim: W("🏊", "수영하다", "물속에서 움직여요"),
    cake: W("🎂", "케이크", "생일에 자주 먹어요"), game: W("🎮", "게임", "규칙을 따라 놀아요"), lake: W("🏞️", "호수", "땅에 둘러싸인 물"), bike: W("🚲", "자전거", "두 바퀴로 달려요"), kite: W("🪁", "연", "바람에 날려요"), five: W("5️⃣", "다섯", "숫자 5"), home: W("🏠", "집", "가족과 지내는 곳"), nose: W("👃", "코", "냄새를 맡아요"), rose: W("🌹", "장미", "향기로운 꽃"), cube: W("🧊", "정육면체", "네모난 입체 모양"), tube: W("🧴", "관", "길고 속이 빈 모양"),
    rain: W("🌧️", "비", "하늘에서 물방울이 내려요"), train: W("🚆", "기차", "철길 위를 달려요"), snail: W("🐌", "달팽이", "천천히 기어가요"), tree: W("🌳", "나무", "줄기와 잎이 있어요"), feet: W("🦶", "두 발", "foot이 둘 이상일 때"), bee: W("🐝", "벌", "윙윙 날아다녀요"), boat: W("⛵", "배", "물 위를 다녀요"), coat: W("🧥", "외투", "추울 때 입어요"), goat: W("🐐", "염소", "수염이 난 동물"), moon: W("🌙", "달", "밤하늘에서 보여요"), book: W("📖", "책", "글과 그림을 읽어요"),
    car: W("🚗", "자동차", "도로 위를 달려요"), farm: W("🚜", "농장", "작물과 동물을 길러요"), park: W("🏞️", "공원", "밖에서 쉬고 놀아요"), fork: W("🍴", "포크", "음식을 찍어 먹어요"), corn: W("🌽", "옥수수", "노란 알갱이가 있어요"), bird: W("🐦", "새", "날개로 날아요"), girl: W("👧", "소녀", "어린 여자아이"), nurse: W("🧑‍⚕️", "간호사", "아픈 사람을 돌봐요"), turn: W("↪️", "돌다", "방향을 바꿔요"), boy: W("👦", "소년", "어린 남자아이"), coin: W("🪙", "동전", "금속으로 만든 돈"), cow: W("🐄", "소", "음매 하고 울어요"), owl: W("🦉", "부엉이", "밤에 활동하는 새")
  };

  const stages = [
    { id: "satpin", order: 1, title: "기초 자음·모음", subtitle: "SATPIN과 첫 단어", color: "violet" },
    { id: "short-vowels", order: 2, title: "짧은 모음", subtitle: "a · e · i · o · u", color: "coral" },
    { id: "digraphs", order: 3, title: "두 글자 한 소리", subtitle: "sh · ch · th · ng · ck · wh", color: "blue" },
    { id: "blends", order: 4, title: "자음 모으기", subtitle: "두 자음을 빠르게 이어 읽기", color: "green" },
    { id: "magic-e", order: 5, title: "장모음과 묵음 e", subtitle: "a_e · i_e · o_e · u_e", color: "gold" },
    { id: "vowel-teams", order: 6, title: "모음 조합", subtitle: "ai · ee · oa · oo · r모음 · 이중모음", color: "pink" }
  ];

  const rawLessons = [
    ["satpin","s1-l1","s · a",["s","a"],[],["sat"],"Sam sat.","첫 자음과 모음을 만나 입 모양과 소리를 익혀요."],
    ["satpin","s1-l2","t · p",["t","p"],["s","a"],["sat","tap","pat"],"Pat sat.","짧은 소리를 끊지 않고 왼쪽에서 오른쪽으로 이어요."],
    ["satpin","s1-l3","i · n",["i","n"],["s","a","t","p"],["pin","tin","pan"],"A pin is in a tin.","짧은 i와 a의 소리를 귀로 구별해요."],
    ["satpin","s1-l4","m · d",["m","d"],["s","a","t","p","i","n"],["mad","mat","dip","dim"],"A man sat on a mat.","마지막 소리까지 빠뜨리지 않고 말해요."],
    ["satpin","s1-l5","c · k",["c","k"],["s","a","t","p","i","n","m","d"],["cat","cap","kid"],"A cat sat.","c와 k가 내는 /k/ 소리를 찾아요."],
    ["satpin","s1-l6","SATPIN 복습",[],["s","a","t","p","i","n","m","d","c","k"],["sat","pin","cat","sand"],"A cat and a kid sat.","배운 소리와 단어를 섞어서 읽어요."],

    ["short-vowels","s2-l1","o · g",["o","g"],["d","c","t"],["dog","log","hot"],"A dog is on a log.","입을 둥글게 열어 짧은 o 소리를 내요."],
    ["short-vowels","s2-l2","u · b",["u","b"],["s","n","p"],["sun","cup","bug","run"],"The bug is in the cup.","짧은 u 소리를 힘 있게 말해요."],
    ["short-vowels","s2-l3","e · h",["e","h"],["d","n","t"],["red","hen","bed"],"The red hen is on the bed.","짧은 e 소리를 입을 살짝 벌려 말해요."],
    ["short-vowels","s2-l4","l · r",["l","r"],["o","e","g"],["leg","log","red","run"],"Run to the red log.","l과 r의 혀 위치 차이를 느껴요."],
    ["short-vowels","s2-l5","j · v",["j","v"],["a","e","n","t"],["jam","jet","van","vet"],"The vet has a van.","목소리가 울리는 j와 v 소리를 익혀요."],
    ["short-vowels","s2-l6","짧은 모음 복습",[],["a","e","i","o","u"],["cat","red","pin","dog","sun"],"The cat is on the red mat.","다섯 짧은 모음을 듣고 구별해요."],

    ["digraphs","s3-l1","sh",["sh"],["i","o","p"],["fish","ship","shop"],"The fish is on the ship.","s와 h가 만나 조용히 하라는 /sh/ 소리를 내요."],
    ["digraphs","s3-l2","ch",["ch"],["i","a","t"],["chin","chip","chat"],"The kid can chat.","c와 h가 만나 기차 같은 /ch/ 소리를 내요."],
    ["digraphs","s3-l3","th",["th"],["i","a","n"],["bath","moth","thin"],"The moth is in the bath.","혀끝을 이 사이에 살짝 내밀어 /th/ 소리를 내요."],
    ["digraphs","s3-l4","ng",["ng"],["i","o"],["ring","king","song"],"The king can sing a song.","코로 울리는 마지막 /ng/ 소리를 들어요."],
    ["digraphs","s3-l5","ck",["ck"],["u","o"],["duck","sock","rock"],"The duck is on a rock.","짧은 모음 뒤의 ck는 /k/ 소리를 내요."],
    ["digraphs","s3-l6","wh · 복습",["wh"],["sh","ch","th","ng","ck"],["whip","when","fish","chat","ring"],"When can the ship go?","두 글자가 한 소리를 만드는 규칙을 복습해요."],

    ["blends","s4-l1","r-blends",["br","cr","dr","fr","gr","tr"],["a","o","u"],["frog","crab","drum"],"The frog is on the drum.","두 자음 소리를 모두 살려 빠르게 이어요."],
    ["blends","s4-l2","l-blends",["bl","cl","fl","gl","pl","sl"],["a","u"],["flag","plum","clap"],"Clap for the flag.","두 번째 l 소리를 놓치지 않아요."],
    ["blends","s4-l3","s-blends",["sk","sm","sn","sp","st","sw"],["a","i","o"],["stop","star","swim"],"Stop and look at the star.","첫 s 소리부터 한 덩어리처럼 읽어요."],
    ["blends","s4-l4","끝소리 모음",["-nd","-mp","-st","-ft"],["a","i"],["sand","lamp","gift"],"The gift is in the sand.","단어 끝 두 자음을 모두 들려줘요."],
    ["blends","s4-l5","자음 모음 복습",[],["fr","cr","dr","fl","pl","st","sw"],["frog","crab","drum","flag","plum","stop","swim"],"The crab can swim.","자음 모음을 보고 막힘없이 읽어요."],

    ["magic-e","s5-l1","a_e",["a_e"],["a"],["cake","game","lake"],"We play a game by the lake.","끝의 e가 a에게 이름 소리 /에이/를 선물해요."],
    ["magic-e","s5-l2","i_e",["i_e"],["i"],["bike","kite","five"],"Five kids ride a bike.","끝의 e가 i를 긴 /아이/ 소리로 바꿔요."],
    ["magic-e","s5-l3","o_e",["o_e"],["o"],["home","nose","rose"],"A rose is at home.","끝의 e가 o를 긴 /오우/ 소리로 바꿔요."],
    ["magic-e","s5-l4","u_e",["u_e"],["u"],["cube","tube"],"The cube is in the tube.","끝의 e는 소리 내지 않고 u를 길게 만들어요."],
    ["magic-e","s5-l5","마법의 e 복습",[],["a_e","i_e","o_e","u_e"],["cake","bike","home","cube"],"Mike came home on a bike.","짧은 모음과 긴 모음을 비교하며 읽어요."],

    ["vowel-teams","s6-l1","ai · ay",["ai","ay"],["a_e"],["rain","train","snail"],"The train came in the rain.","두 모음이 함께 긴 a 소리를 내요."],
    ["vowel-teams","s6-l2","ee · ea",["ee","ea"],["e"],["tree","feet","bee"],"I see a bee in the tree.","ee와 ea가 긴 e 소리를 내는 단어를 읽어요."],
    ["vowel-teams","s6-l3","oa · ow",["oa","ow"],["o_e"],["boat","coat","goat"],"The goat is in the boat.","oa와 ow가 긴 o 소리를 낼 수 있어요."],
    ["vowel-teams","s6-l4","oo",["oo"],["u"],["moon","book"],"Look at the moon in the book.","oo가 내는 두 가지 소리를 단어로 익혀요."],
    ["vowel-teams","s6-l5","r이 바꾼 모음",["ar","or","ir","ur"],[],["car","farm","park","fork","corn","bird","girl","nurse","turn"],"The girl turns the car at the farm.","모음 뒤의 r이 만드는 특별한 소리를 들어요."],
    ["vowel-teams","s6-l6","oi · oy · ou · ow",["oi","oy","ou","ow"],[],["boy","coin","cow","owl"],"The boy found a coin by the cow.","입 모양이 움직이는 두 소리를 자연스럽게 이어요."]
  ];

  const unavailable = { lamp: W("💡", "램프", "빛을 내는 도구"), gift: W("🎁", "선물", "마음을 담아 주는 것") };
  Object.assign(wordBank, unavailable);

  const splitWord = (word, focus) => {
    const patterns = [...focus].sort((a, b) => b.length - a.length);
    const cleanPatterns = patterns.filter((part) => !part.includes("_") && !part.startsWith("-"));
    const parts = [];
    let rest = word;
    while (rest) {
      const match = cleanPatterns.find((part) => rest.startsWith(part));
      if (match) { parts.push(match); rest = rest.slice(match.length); }
      else { parts.push(rest[0]); rest = rest.slice(1); }
    }
    return parts;
  };

  const lessons = rawLessons.map((row, index) => {
    const [stageId, id, title, focus, review, words, sentence, note] = row;
    return {
      stageId, id, order: index + 1, stageOrder: rawLessons.filter((item, i) => i <= index && item[0] === stageId).length,
      title, focus, review, words, sentence, note,
      blend: words.slice(0, 3).map((word) => ({ parts: splitWord(word, [...focus, ...review]), answer: word })),
      dictation: words.slice(0, Math.min(3, words.length))
    };
  });

  window.PHONICS_CURRICULUM = { version: 3, stages, lessons, wordBank };
})();
