(() => {
    "use strict";
    // 목록·소재 화면이 쓰는 칸만 모은 차례표. 본문과 문제는 시를 열 때 poems/<아이디>.js로 따로 받는다.
    // 만드는 법은 tools/poetry-split.mjs 참고. 손으로 고치지 않는다.
    window.POETRY_POEM_INDEX = [
        {
            "id": "jiyong-hosu",
            "title": "호수",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "그리움"
            ],
            "questionCount": 3
        },
        {
            "id": "jiyong-byeoltong",
            "title": "별똥",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "밤과 달"
            ],
            "questionCount": 4
        },
        {
            "id": "jiyong-hongsi",
            "title": "홍시",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "가을",
                "가족"
            ],
            "questionCount": 4
        },
        {
            "id": "taeeung-gamjakkot",
            "title": "감자꽃",
            "poet": "권태응",
            "poetDied": 1951,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "여름"
            ],
            "questionCount": 2
        },
        {
            "id": "sowol-eommaya",
            "title": "엄마야 누나야",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "가족"
            ],
            "questionCount": 4
        },
        {
            "id": "sowol-geumjandi",
            "title": "금잔디",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "봄"
            ],
            "questionCount": 2
        },
        {
            "id": "deokchul-bompyeonji",
            "title": "봄편지",
            "poet": "서덕출",
            "poetDied": 1940,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "봄"
            ],
            "questionCount": 3
        },
        {
            "id": "dongju-haetbi",
            "title": "햇비",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "여름"
            ],
            "questionCount": 6
        },
        {
            "id": "dongju-chamsae",
            "title": "참새",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "동물",
                "가을"
            ],
            "questionCount": 5
        },
        {
            "id": "dongju-nun",
            "title": "눈",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "겨울"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-banditbul",
            "title": "반딧불",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 3,
            "topics": [
                "밤과 달",
                "여름"
            ],
            "questionCount": 2
        },
        {
            "id": "folk-saeya",
            "title": "새야 새야 파랑새야",
            "poet": "전래동요",
            "poetDied": null,
            "rights": "public",
            "basis": "oral",
            "grade": 3,
            "topics": [
                "동물"
            ],
            "questionCount": 3
        },
        {
            "id": "folk-dara",
            "title": "달아 달아 밝은 달아",
            "poet": "전래동요",
            "poetDied": null,
            "rights": "public",
            "basis": "oral",
            "grade": 3,
            "topics": [
                "밤과 달",
                "가족"
            ],
            "questionCount": 3
        },
        {
            "id": "folk-dukkeobi",
            "title": "두껍아 두껍아",
            "poet": "전래동요",
            "poetDied": null,
            "rights": "public",
            "basis": "oral",
            "grade": 3,
            "topics": [
                "동물",
                "놀이"
            ],
            "questionCount": 2
        },
        {
            "id": "folk-eodikkaji",
            "title": "어디까지 왔니",
            "poet": "전래동요",
            "poetDied": null,
            "rights": "public",
            "basis": "oral",
            "grade": 3,
            "topics": [
                "놀이"
            ],
            "questionCount": 2
        },
        {
            "id": "rossetti-baram",
            "title": "누가 바람을 보았나요",
            "poet": "크리스티나 로세티",
            "poetDied": 1894,
            "rights": "public",
            "basis": "own-translation",
            "grade": 3,
            "topics": [
                "자연"
            ],
            "questionCount": 4
        },
        {
            "id": "stevenson-geurimja",
            "title": "나의 그림자",
            "poet": "로버트 루이스 스티븐슨",
            "poetDied": 1894,
            "rights": "public",
            "basis": "own-translation",
            "grade": 4,
            "topics": [
                "놀이"
            ],
            "questionCount": 3
        },
        {
            "id": "stevenson-bi",
            "title": "비",
            "poet": "로버트 루이스 스티븐슨",
            "poetDied": 1894,
            "rights": "public",
            "basis": "own-translation",
            "grade": 4,
            "topics": [
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "stevenson-geune",
            "title": "그네",
            "poet": "로버트 루이스 스티븐슨",
            "poetDied": 1894,
            "rights": "public",
            "basis": "own-translation",
            "grade": 4,
            "topics": [
                "놀이"
            ],
            "questionCount": 2
        },
        {
            "id": "rossetti-bunhong",
            "title": "분홍은 무엇일까요",
            "poet": "크리스티나 로세티",
            "poetDied": 1894,
            "rights": "public",
            "basis": "own-translation",
            "grade": 4,
            "topics": [
                "자연"
            ],
            "questionCount": 3
        },
        {
            "id": "leejanghee-bomeun",
            "title": "봄은 고양이로다",
            "poet": "이장희",
            "poetDied": 1929,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "봄",
                "동물"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-bom",
            "title": "봄",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "봄",
                "가족"
            ],
            "questionCount": 6
        },
        {
            "id": "dongju-jogaekkeopjil",
            "title": "조개껍질",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "그리움",
                "가족"
            ],
            "questionCount": 5
        },
        {
            "id": "dongju-gulttuk",
            "title": "굴뚝",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "겨울",
                "놀이"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-ojumssagae",
            "title": "오줌싸개 지도",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "가족"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-geojitburi",
            "title": "거짓부리",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "동물",
                "놀이"
            ],
            "questionCount": 3
        },
        {
            "id": "kimyeongrang-omae",
            "title": "오매 단풍 들것네",
            "poet": "김영랑",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 4,
            "topics": [
                "가을",
                "가족"
            ],
            "questionCount": 5
        },
        {
            "id": "leebaek-jeongyasa",
            "title": "고요한 밤의 생각",
            "poet": "이백",
            "poetDied": 762,
            "rights": "public",
            "basis": "own-translation",
            "grade": 4,
            "topics": [
                "밤과 달",
                "그리움"
            ],
            "questionCount": 2
        },
        {
            "id": "dubo-chunyahuiu",
            "title": "봄밤에 내리는 반가운 비",
            "poet": "두보",
            "poetDied": 770,
            "rights": "public",
            "basis": "own-translation",
            "grade": 4,
            "topics": [
                "봄",
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "manhae-narutbae",
            "title": "나룻배와 행인",
            "poet": "한용운",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 5,
            "topics": [
                "기다림"
            ],
            "questionCount": 5
        },
        {
            "id": "dongju-sonyeon",
            "title": "소년",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 5,
            "topics": [
                "가을",
                "그리움"
            ],
            "questionCount": 3
        },
        {
            "id": "yeongrang-doldam",
            "title": "돌담에 속삭이는 햇발",
            "poet": "김영랑",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 5,
            "topics": [
                "봄"
            ],
            "questionCount": 4
        },
        {
            "id": "wangbangyeon-cheonmalli",
            "title": "천만 리 머나먼 길에",
            "poet": "왕방연",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 5,
            "topics": [
                "이별"
            ],
            "questionCount": 3
        },
        {
            "id": "leegae-chokbul",
            "title": "방 안에 혓는 촉불",
            "poet": "이개",
            "poetDied": 1456,
            "rights": "public",
            "basis": "classic",
            "grade": 5,
            "topics": [
                "이별"
            ],
            "questionCount": 3
        },
        {
            "id": "sowol-sanyuhwa",
            "title": "산유화",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 5,
            "topics": [
                "자연"
            ],
            "questionCount": 5
        },
        {
            "id": "sowol-gaeyeoul",
            "title": "개여울",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 5,
            "topics": [
                "기다림",
                "봄"
            ],
            "questionCount": 3
        },
        {
            "id": "dongju-saeroun-gil",
            "title": "새로운 길",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 5,
            "topics": [
                "다짐"
            ],
            "questionCount": 2
        },
        {
            "id": "yunseondo-ouga",
            "title": "오우가",
            "poet": "윤선도",
            "poetDied": 1671,
            "rights": "public",
            "basis": "classic",
            "grade": 5,
            "topics": [
                "자연"
            ],
            "questionCount": 5
        },
        {
            "id": "leesunsin-hansanseom",
            "title": "한산섬 달 밝은 밤에",
            "poet": "이순신",
            "poetDied": 1598,
            "rights": "public",
            "basis": "classic",
            "grade": 5,
            "topics": [
                "밤과 달"
            ],
            "questionCount": 3
        },
        {
            "id": "hwanghui-daechu",
            "title": "대추 볼 붉은 골에",
            "poet": "황희",
            "poetDied": 1452,
            "rights": "public",
            "basis": "classic",
            "grade": 5,
            "topics": [
                "가을"
            ],
            "questionCount": 2
        },
        {
            "id": "leejeongbo-gukhwa",
            "title": "국화야 너는 어이",
            "poet": "이정보",
            "poetDied": 1766,
            "rights": "public",
            "basis": "classic",
            "grade": 5,
            "topics": [
                "가을"
            ],
            "questionCount": 3
        },
        {
            "id": "sowol-jindallae",
            "title": "진달래꽃",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "이별",
                "봄"
            ],
            "questionCount": 6
        },
        {
            "id": "sowol-meonhuil",
            "title": "먼 후일",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "이별",
                "그리움"
            ],
            "questionCount": 4
        },
        {
            "id": "sasol-dukkeobi",
            "title": "두꺼비 파리를 물고",
            "poet": "사설시조",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 6,
            "topics": [
                "동물",
                "웃음"
            ],
            "questionCount": 4
        },
        {
            "id": "manhae-bokjong",
            "title": "복종",
            "poet": "한용운",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "사랑"
            ],
            "questionCount": 3
        },
        {
            "id": "manhae-alsu",
            "title": "알 수 없어요",
            "poet": "한용운",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "자연"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-seosi",
            "title": "서시",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "다짐",
                "밤과 달"
            ],
            "questionCount": 4
        },
        {
            "id": "yuksa-cheongpodo",
            "title": "청포도",
            "poet": "이육사",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "여름",
                "기다림"
            ],
            "questionCount": 6
        },
        {
            "id": "nocheonmyeong-saseum",
            "title": "사슴",
            "poet": "노천명",
            "poetDied": 1957,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "동물",
                "그리움"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-jahwasang",
            "title": "자화상",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "가을"
            ],
            "questionCount": 4
        },
        {
            "id": "leebangwon-hayeoga",
            "title": "하여가",
            "poet": "이방원",
            "poetDied": 1422,
            "rights": "public",
            "basis": "classic",
            "grade": 6,
            "topics": [
                "설득"
            ],
            "questionCount": 3
        },
        {
            "id": "jeongmongju-dansimga",
            "title": "단심가",
            "poet": "정몽주",
            "poetDied": 1392,
            "rights": "public",
            "basis": "classic",
            "grade": 6,
            "topics": [
                "다짐"
            ],
            "questionCount": 3
        },
        {
            "id": "goryeo-gasiri",
            "title": "가시리",
            "poet": "고려가요",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 6,
            "topics": [
                "이별"
            ],
            "questionCount": 4
        },
        {
            "id": "goryeo-cheongsan",
            "title": "청산별곡",
            "poet": "고려가요",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 6,
            "topics": [
                "자연"
            ],
            "questionCount": 4
        },
        {
            "id": "gojia-guji",
            "title": "구지가",
            "poet": "옛 노래",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 6,
            "topics": [
                "옛이야기"
            ],
            "questionCount": 2
        },
        {
            "id": "jiyong-hyangsu",
            "title": "향수",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 6,
            "topics": [
                "그리움",
                "가족"
            ],
            "questionCount": 4
        },
        {
            "id": "jiyong-yurichang",
            "title": "유리창 1",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 7,
            "topics": [
                "이별",
                "밤과 달"
            ],
            "questionCount": 5
        },
        {
            "id": "sowol-ganeungil",
            "title": "가는 길",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 7,
            "topics": [
                "이별",
                "그리움"
            ],
            "questionCount": 4
        },
        {
            "id": "sowol-jeopdongsae",
            "title": "접동새",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 7,
            "topics": [
                "가족",
                "옛이야기"
            ],
            "questionCount": 4
        },
        {
            "id": "sanghwa-ppaeatgin",
            "title": "빼앗긴 들에도 봄은 오는가",
            "poet": "이상화",
            "poetDied": 1943,
            "rights": "public",
            "basis": "expired",
            "grade": 7,
            "topics": [
                "봄",
                "시대"
            ],
            "questionCount": 5
        },
        {
            "id": "hyangga-jemangmaega",
            "title": "제망매가",
            "poet": "월명사",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 7,
            "topics": [
                "가족",
                "이별"
            ],
            "questionCount": 5
        },
        {
            "id": "hyangga-seodongyo",
            "title": "서동요",
            "poet": "서동",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 7,
            "topics": [
                "옛이야기"
            ],
            "questionCount": 2
        },
        {
            "id": "hyangga-heonhwaga",
            "title": "헌화가",
            "poet": "이름 모를 노인",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 7,
            "topics": [
                "옛이야기"
            ],
            "questionCount": 2
        },
        {
            "id": "gihyeongdo-eomma",
            "title": "엄마 걱정",
            "poet": "기형도",
            "poetDied": 1989,
            "rights": "protected",
            "grade": 7,
            "topics": [
                "가족",
                "그리움"
            ],
            "questionCount": 4
        },
        {
            "id": "kimjonggil-seongtanje",
            "title": "성탄제",
            "poet": "김종길",
            "poetDied": 2017,
            "rights": "protected",
            "grade": 7,
            "topics": [
                "가족",
                "겨울"
            ],
            "questionCount": 3
        },
        {
            "id": "sinseokjeong-meonnara",
            "title": "그 먼 나라를 알으십니까",
            "poet": "신석정",
            "poetDied": 1974,
            "rights": "protected",
            "grade": 7,
            "topics": [
                "가족",
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "manhae-nim",
            "title": "님의 침묵",
            "poet": "한용운",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "이별",
                "사랑"
            ],
            "questionCount": 5
        },
        {
            "id": "yuksa-jeoljeong",
            "title": "절정",
            "poet": "이육사",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "겨울",
                "시대"
            ],
            "questionCount": 4
        },
        {
            "id": "yuksa-kkot",
            "title": "꽃",
            "poet": "이육사",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "다짐",
                "시대"
            ],
            "questionCount": 2
        },
        {
            "id": "yeongrang-moran",
            "title": "모란이 피기까지는",
            "poet": "김영랑",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "봄",
                "기다림"
            ],
            "questionCount": 5
        },
        {
            "id": "dongju-ttodareun",
            "title": "또 다른 고향",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "다짐",
                "밤과 달"
            ],
            "questionCount": 4
        },
        {
            "id": "ojanghwan-gohyang",
            "title": "고향 앞에서",
            "poet": "오장환",
            "poetDied": 1951,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "고향",
                "봄"
            ],
            "questionCount": 4
        },
        {
            "id": "yongcheol-tteonaganeun",
            "title": "떠나가는 배",
            "poet": "박용철",
            "poetDied": 1938,
            "rights": "public",
            "basis": "expired",
            "grade": 8,
            "topics": [
                "이별",
                "다짐"
            ],
            "questionCount": 4
        },
        {
            "id": "leehwang-dosan",
            "title": "도산십이곡",
            "poet": "이황",
            "poetDied": 1570,
            "rights": "public",
            "basis": "classic",
            "grade": 8,
            "topics": [
                "자연",
                "배움"
            ],
            "questionCount": 3
        },
        {
            "id": "goryeo-dongdong",
            "title": "동동",
            "poet": "고려가요",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 8,
            "topics": [
                "기다림"
            ],
            "questionCount": 4
        },
        {
            "id": "goryeo-jeongseokga",
            "title": "정석가",
            "poet": "고려가요",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 8,
            "topics": [
                "사랑"
            ],
            "questionCount": 2
        },
        {
            "id": "yuksa-gwangya",
            "title": "광야",
            "poet": "이육사",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "다짐",
                "시대"
            ],
            "questionCount": 6
        },
        {
            "id": "yuksa-gyomok",
            "title": "교목",
            "poet": "이육사",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "다짐"
            ],
            "questionCount": 2
        },
        {
            "id": "dongju-chamhoerok",
            "title": "참회록",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "다짐",
                "시대"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-sipjaga",
            "title": "십자가",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "다짐"
            ],
            "questionCount": 2
        },
        {
            "id": "dongju-swipge",
            "title": "쉽게 씌어진 시",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "다짐",
                "시대"
            ],
            "questionCount": 3
        },
        {
            "id": "sowol-chohon",
            "title": "초혼",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "이별",
                "그리움"
            ],
            "questionCount": 5
        },
        {
            "id": "sowol-sakju",
            "title": "삭주구성",
            "poet": "김소월",
            "poetDied": 1934,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "그리움",
                "고향"
            ],
            "questionCount": 3
        },
        {
            "id": "leesang-geoul",
            "title": "거울",
            "poet": "이상",
            "poetDied": 1937,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "나"
            ],
            "questionCount": 5
        },
        {
            "id": "jiyong-gohyang",
            "title": "고향",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "고향",
                "그리움"
            ],
            "questionCount": 3
        },
        {
            "id": "inhwan-sewol",
            "title": "세월이 가면",
            "poet": "박인환",
            "poetDied": 1956,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "사랑",
                "그리움"
            ],
            "questionCount": 2
        },
        {
            "id": "yeongro-nongae",
            "title": "논개",
            "poet": "변영로",
            "poetDied": 1961,
            "rights": "public",
            "basis": "expired",
            "grade": 9,
            "topics": [
                "시대"
            ],
            "questionCount": 3
        },
        {
            "id": "jisang-songin",
            "title": "님을 보내며",
            "poet": "정지상",
            "poetDied": 1135,
            "rights": "public",
            "basis": "own-translation",
            "grade": 9,
            "topics": [
                "이별"
            ],
            "questionCount": 2
        },
        {
            "id": "geugin-sangchun",
            "title": "상춘곡",
            "poet": "정극인",
            "poetDied": 1481,
            "rights": "public",
            "basis": "classic",
            "grade": 9,
            "topics": [
                "봄",
                "자연"
            ],
            "questionCount": 4
        },
        {
            "id": "seondo-eobu",
            "title": "어부사시사",
            "poet": "윤선도",
            "poetDied": 1671,
            "rights": "public",
            "basis": "classic",
            "grade": 9,
            "topics": [
                "봄",
                "자연"
            ],
            "questionCount": 3
        },
        {
            "id": "jeongcheol-gwandong",
            "title": "관동별곡",
            "poet": "정철",
            "poetDied": 1593,
            "rights": "public",
            "basis": "classic",
            "grade": 9,
            "topics": [
                "여행",
                "자연"
            ],
            "questionCount": 3
        },
        {
            "id": "jiyong-bi",
            "title": "비",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "자연",
                "가을"
            ],
            "questionCount": 3
        },
        {
            "id": "jiyong-indongcha",
            "title": "인동차",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "겨울"
            ],
            "questionCount": 2
        },
        {
            "id": "jiyong-jangsusan",
            "title": "장수산 1",
            "poet": "정지용",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "겨울",
                "자연"
            ],
            "questionCount": 3
        },
        {
            "id": "yeongrang-dok",
            "title": "독을 차고",
            "poet": "김영랑",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "다짐",
                "시대"
            ],
            "questionCount": 3
        },
        {
            "id": "yeongrang-buk",
            "title": "북",
            "poet": "김영랑",
            "poetDied": 1950,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "소리"
            ],
            "questionCount": 2
        },
        {
            "id": "yuksa-jayagok",
            "title": "자야곡",
            "poet": "이육사",
            "poetDied": 1944,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "고향",
                "밤과 달"
            ],
            "questionCount": 2
        },
        {
            "id": "dongju-gil",
            "title": "길",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "다짐",
                "나"
            ],
            "questionCount": 4
        },
        {
            "id": "dongju-gan",
            "title": "간",
            "poet": "윤동주",
            "poetDied": 1945,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "다짐",
                "옛이야기"
            ],
            "questionCount": 3
        },
        {
            "id": "leesang-ogamdo",
            "title": "오감도 시제1호",
            "poet": "이상",
            "poetDied": 1937,
            "rights": "public",
            "basis": "expired",
            "grade": 10,
            "topics": [
                "나",
                "시대"
            ],
            "questionCount": 4
        },
        {
            "id": "hyangga-changiparang",
            "title": "찬기파랑가",
            "poet": "충담사",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 10,
            "topics": [
                "그리움"
            ],
            "questionCount": 2
        },
        {
            "id": "hyangga-anminga",
            "title": "안민가",
            "poet": "충담사",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 10,
            "topics": [
                "나라"
            ],
            "questionCount": 2
        },
        {
            "id": "joseon-yongbi",
            "title": "용비어천가",
            "poet": "정인지 등",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 10,
            "topics": [
                "나라"
            ],
            "questionCount": 3
        },
        {
            "id": "jeongcheol-samiin",
            "title": "사미인곡",
            "poet": "정철",
            "poetDied": 1593,
            "rights": "public",
            "basis": "classic",
            "grade": 10,
            "topics": [
                "그리움",
                "봄"
            ],
            "questionCount": 4
        },
        {
            "id": "baekseok-yeoseung",
            "title": "여승",
            "poet": "백석",
            "poetDied": 1996,
            "rights": "protected",
            "grade": 10,
            "topics": [
                "시대"
            ],
            "questionCount": 3
        },
        {
            "id": "hyeonseung-platanus",
            "title": "플라타너스",
            "poet": "김현승",
            "poetDied": 1975,
            "rights": "protected",
            "grade": 10,
            "topics": [
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "gwangseop-bidulgi",
            "title": "성북동 비둘기",
            "poet": "김광섭",
            "poetDied": 1977,
            "rights": "protected",
            "grade": 10,
            "topics": [
                "자연",
                "도시"
            ],
            "questionCount": 2
        },
        {
            "id": "hyeonggi-nakhwa",
            "title": "낙화",
            "poet": "이형기",
            "poetDied": 2005,
            "rights": "protected",
            "grade": 10,
            "topics": [
                "이별",
                "봄"
            ],
            "questionCount": 2
        },
        {
            "id": "jeongcheol-gwandong-2",
            "title": "관동별곡 — 금강산과 동해, 그리고 꿈",
            "poet": "정철",
            "poetDied": 1593,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "여행",
                "자연",
                "나라"
            ],
            "questionCount": 7
        },
        {
            "id": "jeongcheol-songmiin",
            "title": "속미인곡",
            "poet": "정철",
            "poetDied": 1593,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "그리움",
                "나라"
            ],
            "questionCount": 7
        },
        {
            "id": "heo-gyuwonga",
            "title": "규원가",
            "poet": "허난설헌",
            "poetDied": 1589,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "그리움",
                "여인"
            ],
            "questionCount": 6
        },
        {
            "id": "bakinro-nuhangsa",
            "title": "누항사",
            "poet": "박인로",
            "poetDied": 1642,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "가난",
                "다짐"
            ],
            "questionCount": 4
        },
        {
            "id": "bakinro-seonsangtan",
            "title": "선상탄",
            "poet": "박인로",
            "poetDied": 1642,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "나라",
                "바다"
            ],
            "questionCount": 2
        },
        {
            "id": "jeonghakyu-nongga",
            "title": "농가월령가",
            "poet": "정학유",
            "poetDied": 1859,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "농사",
                "봄"
            ],
            "questionCount": 4
        },
        {
            "id": "leei-gosan",
            "title": "고산구곡가",
            "poet": "이이",
            "poetDied": 1584,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "자연",
                "배움"
            ],
            "questionCount": 3
        },
        {
            "id": "seondo-manheung",
            "title": "만흥",
            "poet": "윤선도",
            "poetDied": 1671,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "자연",
                "나라"
            ],
            "questionCount": 3
        },
        {
            "id": "seondo-gyeonhoeyo",
            "title": "견회요",
            "poet": "윤선도",
            "poetDied": 1671,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "나라",
                "가족"
            ],
            "questionCount": 3
        },
        {
            "id": "minyeong-maehwasa",
            "title": "매화사",
            "poet": "안민영",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "겨울",
                "자연"
            ],
            "questionCount": 3
        },
        {
            "id": "goryeo-seogyeong",
            "title": "서경별곡",
            "poet": "고려가요",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "이별",
                "사랑"
            ],
            "questionCount": 4
        },
        {
            "id": "goryeo-manjeonchun",
            "title": "만전춘별사",
            "poet": "고려가요",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "사랑",
                "밤과 달"
            ],
            "questionCount": 2
        },
        {
            "id": "jeongseo-jeonggwajeong",
            "title": "정과정",
            "poet": "정서",
            "poetDied": null,
            "rights": "public",
            "basis": "classic",
            "grade": 11,
            "topics": [
                "나라",
                "그리움"
            ],
            "questionCount": 3
        },
        {
            "id": "jehyeon-sarihwa",
            "title": "사리화",
            "poet": "이제현",
            "poetDied": 1367,
            "rights": "public",
            "basis": "own-translation",
            "grade": 11,
            "topics": [
                "농사",
                "시대"
            ],
            "questionCount": 2
        },
        {
            "id": "leesaek-bubyeongnu",
            "title": "부벽루",
            "poet": "이색",
            "poetDied": 1396,
            "rights": "public",
            "basis": "own-translation",
            "grade": 11,
            "topics": [
                "역사",
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "hwanghyeon-jeolmyeong",
            "title": "절명시",
            "poet": "황현",
            "poetDied": 1910,
            "rights": "public",
            "basis": "own-translation",
            "grade": 11,
            "topics": [
                "시대",
                "나라"
            ],
            "questionCount": 2
        },
        {
            "id": "dasan-tamjin",
            "title": "탐진촌요",
            "poet": "정약용",
            "poetDied": 1836,
            "rights": "public",
            "basis": "own-translation",
            "grade": 11,
            "topics": [
                "농사",
                "시대"
            ],
            "questionCount": 2
        },
        {
            "id": "folk-sijipsari",
            "title": "시집살이 노래",
            "poet": "민요",
            "poetDied": null,
            "rights": "public",
            "basis": "oral",
            "grade": 11,
            "topics": [
                "여인",
                "가족"
            ],
            "questionCount": 5
        },
        {
            "id": "japga-yusanga",
            "title": "유산가",
            "poet": "잡가",
            "poetDied": null,
            "rights": "public",
            "basis": "oral",
            "grade": 11,
            "topics": [
                "봄",
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "baekseok-yeounangol",
            "title": "여우난골족",
            "poet": "백석",
            "poetDied": 1996,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "가족",
                "명절"
            ],
            "questionCount": 2
        },
        {
            "id": "baekseok-namsinuiju",
            "title": "남신의주 유동 박시봉방",
            "poet": "백석",
            "poetDied": 1996,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "나",
                "겨울"
            ],
            "questionCount": 2
        },
        {
            "id": "baekseok-huinbaram",
            "title": "흰 바람벽이 있어",
            "poet": "백석",
            "poetDied": 1996,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "나",
                "그리움"
            ],
            "questionCount": 2
        },
        {
            "id": "yongak-nalgeunjip",
            "title": "낡은 집",
            "poet": "이용악",
            "poetDied": 1971,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "시대",
                "고향"
            ],
            "questionCount": 2
        },
        {
            "id": "gwanggyun-wasadeung",
            "title": "와사등",
            "poet": "김광균",
            "poetDied": 1993,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "도시",
                "밤과 달"
            ],
            "questionCount": 2
        },
        {
            "id": "gwanggyun-chuil",
            "title": "추일서정",
            "poet": "김광균",
            "poetDied": 1993,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "가을",
                "도시"
            ],
            "questionCount": 2
        },
        {
            "id": "chihwan-gitbal",
            "title": "깃발",
            "poet": "유치환",
            "poetDied": 1967,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "다짐",
                "바다"
            ],
            "questionCount": 2
        },
        {
            "id": "chihwan-saengmyeong",
            "title": "생명의 서",
            "poet": "유치환",
            "poetDied": 1967,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "다짐",
                "나"
            ],
            "questionCount": 2
        },
        {
            "id": "mogwol-nageune",
            "title": "나그네",
            "poet": "박목월",
            "poetDied": 1978,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "자연",
                "여행"
            ],
            "questionCount": 2
        },
        {
            "id": "jihun-seungmu",
            "title": "승무",
            "poet": "조지훈",
            "poetDied": 1968,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "춤",
                "밤과 달"
            ],
            "questionCount": 2
        },
        {
            "id": "dujin-hae",
            "title": "해",
            "poet": "박두진",
            "poetDied": 1998,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "다짐",
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "jeongju-gukhwa",
            "title": "국화 옆에서",
            "poet": "서정주",
            "poetDied": 2000,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "가을",
                "삶"
            ],
            "questionCount": 2
        },
        {
            "id": "jeongju-chucheonsa",
            "title": "추천사",
            "poet": "서정주",
            "poetDied": 2000,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "옛이야기",
                "다짐"
            ],
            "questionCount": 2
        },
        {
            "id": "suyeong-pul",
            "title": "풀",
            "poet": "김수영",
            "poetDied": 1968,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "시대",
                "자연"
            ],
            "questionCount": 2
        },
        {
            "id": "suyeong-nun",
            "title": "눈",
            "poet": "김수영",
            "poetDied": 1968,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "겨울",
                "다짐"
            ],
            "questionCount": 3
        },
        {
            "id": "suyeong-pokpo",
            "title": "폭포",
            "poet": "김수영",
            "poetDied": 1968,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "자연",
                "다짐"
            ],
            "questionCount": 3
        },
        {
            "id": "suyeong-gogung",
            "title": "어느 날 고궁을 나오면서",
            "poet": "김수영",
            "poetDied": 1968,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "나",
                "시대"
            ],
            "questionCount": 3
        },
        {
            "id": "dongyeop-kkeopdegi",
            "title": "껍데기는 가라",
            "poet": "신동엽",
            "poetDied": 1969,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "시대",
                "나라"
            ],
            "questionCount": 2
        },
        {
            "id": "chunsu-kkot",
            "title": "꽃",
            "poet": "김춘수",
            "poetDied": 2004,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "나",
                "사랑"
            ],
            "questionCount": 2
        },
        {
            "id": "chunsu-seosi",
            "title": "꽃을 위한 서시",
            "poet": "김춘수",
            "poetDied": 2004,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "나"
            ],
            "questionCount": 3
        },
        {
            "id": "sangbyeong-gwicheon",
            "title": "귀천",
            "poet": "천상병",
            "poetDied": 1993,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "삶",
                "하늘"
            ],
            "questionCount": 2
        },
        {
            "id": "donggyu-pyeonji",
            "title": "즐거운 편지",
            "poet": "황동규",
            "poetDied": null,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "사랑",
                "기다림"
            ],
            "questionCount": 2
        },
        {
            "id": "gyeongnim-nongmu",
            "title": "농무",
            "poet": "신경림",
            "poetDied": 2024,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "농사",
                "시대"
            ],
            "questionCount": 2
        },
        {
            "id": "jaesam-chueok",
            "title": "추억에서",
            "poet": "박재삼",
            "poetDied": 1997,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "가족",
                "가난"
            ],
            "questionCount": 2
        },
        {
            "id": "jaesam-gaeulgang",
            "title": "울음이 타는 가을 강",
            "poet": "박재삼",
            "poetDied": 1997,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "가을",
                "이별"
            ],
            "questionCount": 3
        },
        {
            "id": "jaegu-sapyeong",
            "title": "사평역에서",
            "poet": "곽재구",
            "poetDied": null,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "겨울",
                "삶"
            ],
            "questionCount": 2
        },
        {
            "id": "gihyeongdo-binjip",
            "title": "빈집",
            "poet": "기형도",
            "poetDied": 1989,
            "rights": "protected",
            "grade": 11,
            "topics": [
                "이별",
                "사랑"
            ],
            "questionCount": 2
        }
    ];
})();
