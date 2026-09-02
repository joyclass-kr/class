(function () {
  "use strict";

  const themes = {
    world: {
      label: "대륙·대양",
      kicker: "세계의 큰 틀",
      title: "대륙과 대양으로 읽는 세계",
      summary: "세계의 위치를 익힐 때는 나라 이름보다 먼저 대륙과 대양의 배열을 잡아야 합니다. 적도와 본초 자오선을 기준으로 동서남북을 연결해 보세요.",
      points: [
        "태평양은 아시아·오세아니아와 아메리카 사이에 놓인 가장 넓은 대양이다.",
        "대서양은 아메리카와 유럽·아프리카 사이를 남북으로 잇는다.",
        "인도양은 아시아 남부·아프리카 동부·오세아니아 서부 사이에 있다."
      ],
      legend: [{ label: "대륙", color: "#397f62" }, { label: "대양", color: "#267ca5" }],
      features: [
        { name: "아시아", icon: "亞", color: "#397f62", lat: 43, lng: 88, zoom: 2, note: "가장 넓고 인구가 많은 대륙" },
        { name: "유럽", icon: "歐", color: "#5b7698", lat: 51, lng: 15, zoom: 3, note: "아시아 서쪽에 이어진 대륙" },
        { name: "아프리카", icon: "阿", color: "#b87832", lat: 8, lng: 21, zoom: 2, note: "적도와 본초 자오선이 모두 지나는 대륙" },
        { name: "북아메리카", icon: "北", color: "#87644d", lat: 43, lng: -105, zoom: 2, note: "대서양과 태평양 사이의 북반구 대륙" },
        { name: "남아메리카", icon: "南", color: "#4f8d59", lat: -17, lng: -61, zoom: 2, note: "적도를 지나 남쪽으로 길게 뻗은 대륙" },
        { name: "오세아니아", icon: "澳", color: "#93618e", lat: -25, lng: 135, zoom: 3, note: "오스트레일리아와 태평양의 여러 섬" },
        { name: "남극", icon: "極", color: "#6f9ba7", lat: -78, lng: 15, zoom: 2, note: "남극점을 둘러싼 얼음 대륙" },
        { name: "태평양", icon: "洋", color: "#267ca5", lat: 4, lng: -155, zoom: 2, note: "세계에서 가장 넓은 대양" },
        { name: "대서양", icon: "洋", color: "#267ca5", lat: 10, lng: -33, zoom: 2, note: "아메리카와 유럽·아프리카 사이" },
        { name: "인도양", icon: "洋", color: "#267ca5", lat: -19, lng: 79, zoom: 2, note: "아시아 남쪽과 아프리카 동쪽 사이" }
      ]
    },
    coordinates: {
      label: "위도·경도",
      kicker: "지구의 주소",
      title: "위선과 경선으로 위치 읽기",
      summary: "위도는 적도에서 남북으로, 경도는 본초 자오선에서 동서로 잰 각도입니다. 두 값을 함께 쓰면 지구 위 어느 곳이든 위치를 나타낼 수 있습니다.",
      points: [
        "적도는 위도 0°이며 지구를 북반구와 남반구로 나눈다.",
        "영국 그리니치를 지나는 본초 자오선은 경도 0°이며 동경과 서경의 기준이다.",
        "날짜변경선은 경도 180° 부근을 지나며 나라와 섬을 가르지 않도록 일부 구간이 굽어 있다."
      ],
      legend: [{ label: "위선", color: "#d96d46" }, { label: "경선", color: "#6557a5" }, { label: "날짜변경선", color: "#b63053" }],
      lines: [
        { name: "적도 0°", color: "#d96d46", coords: [[0, -180], [0, 180]], dash: false },
        { name: "북회귀선 23.5°N", color: "#d99846", coords: [[23.5, -180], [23.5, 180]], dash: true },
        { name: "남회귀선 23.5°S", color: "#d99846", coords: [[-23.5, -180], [-23.5, 180]], dash: true },
        { name: "북극권 66.5°N", color: "#6c95ad", coords: [[66.5, -180], [66.5, 180]], dash: true },
        { name: "남극권 66.5°S", color: "#6c95ad", coords: [[-66.5, -180], [-66.5, 180]], dash: true },
        { name: "본초 자오선 0°", color: "#6557a5", coords: [[-90, 0], [90, 0]], dash: false },
        { name: "날짜변경선 180° 부근", color: "#b63053", coords: [[-90, 180], [-55, 180], [-45, 172], [-15, 172], [0, 180], [48, 180], [60, 168], [75, 180], [90, 180]], dash: true }
      ],
      features: [
        { name: "적도", icon: "0°", color: "#d96d46", lat: 0, lng: -35, zoom: 3, note: "위도 0°, 북반구와 남반구의 기준" },
        { name: "본초 자오선", icon: "0°", color: "#6557a5", lat: 51.48, lng: 0, zoom: 4, note: "영국 그리니치를 지나는 경도 0°" },
        { name: "날짜변경선", icon: "±", color: "#b63053", lat: 8, lng: 178, zoom: 3, note: "경도 180° 부근, 넘는 방향에 따라 날짜 조정" },
        { name: "북회귀선", icon: "N", color: "#d99846", lat: 23.5, lng: 80, zoom: 3, note: "북위 약 23.5°, 태양이 천정에 올 수 있는 북쪽 한계" },
        { name: "남회귀선", icon: "S", color: "#d99846", lat: -23.5, lng: 18, zoom: 3, note: "남위 약 23.5°, 태양이 천정에 올 수 있는 남쪽 한계" },
        { name: "대한민국", icon: "127", color: "#176b72", lat: 36.5, lng: 127.8, zoom: 4, note: "대략 북위 33~43°, 동경 124~132°" }
      ]
    },
    terrain: {
      label: "지형",
      kicker: "세계의 뼈대",
      title: "산맥·평원·강의 연결",
      summary: "큰 산맥은 기후와 이동을 가르고, 큰 강과 평원은 도시와 문명의 터전이 됩니다. 지형을 점이 아니라 긴 띠와 유역으로 읽어 보세요.",
      points: [
        "환태평양 조산대와 알프스·히말라야 조산대에는 높은 산과 지진·화산 활동이 집중된다.",
        "큰 강은 높은 산지에서 시작해 넓은 평야를 지나 바다로 흐른다.",
        "오래된 대륙 내부에는 넓은 평원과 고원이 발달한 곳이 많다."
      ],
      legend: [{ label: "산맥·고원", color: "#9a603b" }, { label: "강·유역", color: "#257aa2" }, { label: "평원", color: "#59945c" }],
      features: [
        { name: "히말라야산맥", icon: "▲", color: "#9a603b", lat: 29, lng: 84, zoom: 4, note: "인도판과 유라시아판의 충돌로 형성" },
        { name: "안데스산맥", icon: "▲", color: "#9a603b", lat: -20, lng: -69, zoom: 3, note: "남아메리카 서쪽을 따라 길게 이어지는 산맥" },
        { name: "로키산맥", icon: "▲", color: "#9a603b", lat: 44, lng: -113, zoom: 3, note: "북아메리카 서쪽의 대표 산맥" },
        { name: "아마존강", icon: "水", color: "#257aa2", lat: -3, lng: -60, zoom: 3, note: "유역 면적과 유량이 매우 큰 강" },
        { name: "나일강", icon: "水", color: "#257aa2", lat: 20, lng: 31, zoom: 3, note: "아프리카 동북부를 북쪽으로 흐르는 강" },
        { name: "시베리아 평원", icon: "平", color: "#59945c", lat: 59, lng: 75, zoom: 3, note: "아시아 북부의 광대한 저지대" },
        { name: "티베트고원", icon: "高", color: "#9a603b", lat: 32, lng: 88, zoom: 4, note: "세계에서 가장 높고 넓은 고원" }
      ]
    },
    climate: {
      label: "기후",
      kicker: "위도와 대기",
      title: "위도·바람·해류가 만든 기후",
      summary: "태양 에너지는 위도에 따라 다르게 들어오고, 바람과 해류가 열과 수분을 옮깁니다. 같은 위도라도 바다·산맥·해류에 따라 기후가 달라집니다.",
      points: [
        "적도 부근은 연중 기온이 높고 상승 기류가 발달해 비가 자주 내린다.",
        "남·북위 20~30도 부근의 대륙 서안과 내부에는 건조 지역이 넓게 나타난다.",
        "대륙의 동쪽과 서쪽은 계절풍·편서풍·해류의 영향이 서로 다르다."
      ],
      legend: [{ label: "열대 다우", color: "#278f68" }, { label: "건조", color: "#d39436" }, { label: "온대", color: "#4b7fb1" }, { label: "냉대", color: "#786ca6" }],
      features: [
        { name: "아마존 열대 우림", icon: "雨", color: "#278f68", lat: -4, lng: -63, zoom: 3, note: "적도 저압대의 상승 기류와 연중 많은 비" },
        { name: "사하라 사막", icon: "乾", color: "#d39436", lat: 24, lng: 13, zoom: 3, note: "아열대 고압대의 하강 기류가 만드는 건조 기후" },
        { name: "서유럽", icon: "西", color: "#4b7fb1", lat: 50, lng: 1, zoom: 4, note: "편서풍과 북대서양 난류의 영향" },
        { name: "시베리아", icon: "寒", color: "#786ca6", lat: 61, lng: 101, zoom: 3, note: "대륙 내부의 긴 겨울과 큰 연교차" },
        { name: "동남아시아", icon: "季", color: "#278f68", lat: 13, lng: 104, zoom: 4, note: "계절에 따라 바람 방향이 바뀌는 몬순" },
        { name: "지중해 연안", icon: "夏", color: "#b46b48", lat: 38, lng: 17, zoom: 4, note: "여름은 건조하고 겨울은 비교적 온화하고 습함" }
      ]
    },
    population: {
      label: "인구·도시",
      kicker: "사람과 공간",
      title: "사람은 어디에 모여 사는가",
      summary: "인구는 물·평야·온화한 기후·일자리·교통이 유리한 곳에 모입니다. 자연환경뿐 아니라 산업화와 도시화가 오늘날의 분포를 크게 바꾸었습니다.",
      points: [
        "동아시아·남아시아·유럽은 세계의 대표적인 인구 밀집 지역이다.",
        "사막·한대·고산 지역과 울창한 열대 우림 내부는 인구가 희박한 편이다.",
        "항구·하구·교통 결절에는 큰 도시권이 발달하기 쉽다."
      ],
      legend: [{ label: "인구 밀집", color: "#a34c78" }, { label: "세계 도시", color: "#405ca5" }, { label: "인구 희박", color: "#8a8f87" }],
      features: [
        { name: "동아시아", icon: "密", color: "#a34c78", lat: 33, lng: 118, zoom: 3, note: "큰 평야·하천 유역과 해안 도시축" },
        { name: "남아시아", icon: "密", color: "#a34c78", lat: 25, lng: 80, zoom: 3, note: "인더스·갠지스강 유역의 높은 인구 밀도" },
        { name: "서유럽", icon: "都", color: "#405ca5", lat: 51, lng: 6, zoom: 4, note: "산업화와 촘촘한 도시·교통망" },
        { name: "미국 북동부", icon: "都", color: "#405ca5", lat: 40, lng: -75, zoom: 4, note: "대서양 연안의 거대 도시권" },
        { name: "나일강 유역", icon: "川", color: "#a34c78", lat: 27, lng: 31, zoom: 4, note: "건조 지역 속 하천을 따라 모인 인구" },
        { name: "사하라 내부", icon: "疎", color: "#8a8f87", lat: 25, lng: 4, zoom: 4, note: "물이 부족해 인구가 희박한 지역" },
        { name: "아마존 내부", icon: "疎", color: "#8a8f87", lat: -5, lng: -66, zoom: 4, note: "교통과 정착이 어려운 열대 우림 내부" }
      ]
    },
    region: {
      label: "지역",
      kicker: "지역 비교",
      title: "자연·문화·산업을 함께 보기",
      summary: "세계의 지역은 하나의 기준으로만 나뉘지 않습니다. 위치와 자연환경, 역사·문화, 산업과 교류를 함께 놓고 공통점과 차이점을 비교하세요.",
      points: [
        "동아시아·동남아시아·남아시아는 모두 아시아지만 기후·종교·산업 구조가 다르다.",
        "유럽과 앵글로아메리카는 도시화율이 높지만 형성 과정과 지역 구조는 같지 않다.",
        "수에즈·파나마 같은 운하는 대양과 지역을 잇는 세계 교통의 좁은 길목이다."
      ],
      legend: [{ label: "아시아", color: "#397f62" }, { label: "유럽·아메리카", color: "#526fa6" }, { label: "아프리카·서남아시아", color: "#b87832" }, { label: "오세아니아", color: "#93618e" }],
      features: [
        { name: "동아시아", icon: "東", color: "#397f62", lat: 36, lng: 120, zoom: 3, note: "계절풍·대도시·제조업 네트워크" },
        { name: "동남아시아", icon: "南", color: "#397f62", lat: 9, lng: 106, zoom: 4, note: "반도와 섬, 열대 몬순, 해상 교통" },
        { name: "남아시아", icon: "印", color: "#397f62", lat: 23, lng: 78, zoom: 4, note: "히말라야 남쪽과 인도양 사이" },
        { name: "서남아시아", icon: "油", color: "#b87832", lat: 28, lng: 46, zoom: 4, note: "건조 기후와 석유 자원, 교통의 길목" },
        { name: "유럽", icon: "歐", color: "#526fa6", lat: 50, lng: 15, zoom: 3, note: "반도와 해안, 높은 도시화와 지역 통합" },
        { name: "사하라 이남 아프리카", icon: "阿", color: "#b87832", lat: -3, lng: 23, zoom: 3, note: "다양한 기후·언어·자원과 빠른 도시 성장" },
        { name: "앵글로아메리카", icon: "北", color: "#526fa6", lat: 44, lng: -98, zoom: 3, note: "미국과 캐나다를 중심으로 한 지역" },
        { name: "라틴아메리카", icon: "羅", color: "#526fa6", lat: -12, lng: -66, zoom: 3, note: "멕시코 이남의 아메리카 지역" },
        { name: "오세아니아", icon: "澳", color: "#93618e", lat: -26, lng: 138, zoom: 3, note: "오스트레일리아·뉴질랜드와 태평양 섬 지역" }
      ]
    }
  };

  const questions = [
    { id: "world-01", topic: "world", difficulty: "basic", prompt: "아시아·오세아니아와 아메리카 사이에 놓인 세계에서 가장 넓은 대양은?", options: ["대서양", "인도양", "태평양", "북극해"], answer: 2, explanation: "태평양은 아시아·오세아니아의 동쪽과 아메리카의 서쪽 사이에 놓인 세계 최대의 대양입니다.", focus: { lat: 4, lng: -155, zoom: 2, label: "아시아와 아메리카 사이의 넓은 바다를 보세요." } },
    { id: "world-02", topic: "world", difficulty: "basic", prompt: "아메리카와 유럽·아프리카 사이를 남북으로 길게 잇는 대양은?", options: ["대서양", "태평양", "인도양", "남극해"], answer: 0, explanation: "대서양은 서쪽의 아메리카와 동쪽의 유럽·아프리카 사이에 있습니다.", focus: { lat: 10, lng: -33, zoom: 2, label: "아메리카 동쪽과 유럽·아프리카 서쪽을 비교하세요." } },
    { id: "world-03", topic: "world", difficulty: "advanced", prompt: "적도와 본초 자오선이 모두 지나는 대륙은?", options: ["아시아", "아프리카", "남아메리카", "오세아니아"], answer: 1, explanation: "적도는 아프리카의 가운데를, 본초 자오선은 아프리카 서부를 지납니다.", focus: { lat: 8, lng: 21, zoom: 3, label: "위도 0도와 경도 0도가 지나는 대륙을 찾으세요." } },
    { id: "world-04", topic: "world", difficulty: "basic", prompt: "남극점을 둘러싸고 있으며 대부분이 얼음으로 덮인 대륙은?", options: ["유럽", "오세아니아", "남아메리카", "남극"], answer: 3, explanation: "남극 대륙은 남극점을 둘러싸며 두꺼운 빙상으로 덮여 있습니다.", focus: { lat: -78, lng: 15, zoom: 2, label: "세계 지도의 가장 아래쪽을 확인하세요." } },
    { id: "world-05", topic: "world", difficulty: "advanced", prompt: "아시아 남부·아프리카 동부·오세아니아 서부 사이에 있는 대양은?", options: ["인도양", "대서양", "북극해", "태평양"], answer: 0, explanation: "인도양은 세 지역 사이에 놓여 계절풍 교역과 해상 교통의 무대가 되었습니다.", focus: { lat: -19, lng: 79, zoom: 2, label: "인도 남쪽의 바다를 중심으로 세 대륙을 살펴보세요." } },

    { id: "coordinates-01", topic: "coordinates", difficulty: "basic", prompt: "지구를 북반구와 남반구로 나누는 위도 0°의 선은?", options: ["본초 자오선", "적도", "북회귀선", "날짜변경선"], answer: 1, explanation: "적도는 위도 0°이며 지구의 가운데를 둘러 북반구와 남반구를 나눕니다.", focus: { lat: 0, lng: -35, zoom: 2, label: "지구 가운데를 동서로 두르는 위선을 보세요." } },
    { id: "coordinates-02", topic: "coordinates", difficulty: "basic", prompt: "영국 그리니치를 지나며 동경과 서경을 나누는 경도 0°의 선은?", options: ["적도", "남회귀선", "본초 자오선", "날짜변경선"], answer: 2, explanation: "본초 자오선은 영국 그리니치를 지나는 경도 0°의 기준선입니다.", focus: { lat: 51.48, lng: 0, zoom: 4, label: "영국을 지나는 남북 방향의 경선을 보세요." } },
    { id: "coordinates-03", topic: "coordinates", difficulty: "advanced", prompt: "북위 35°, 동경 130°로 나타낸 위치에 대한 설명으로 옳은 것은?", options: ["적도 남쪽·본초 자오선 서쪽", "적도 북쪽·본초 자오선 동쪽", "적도 북쪽·본초 자오선 서쪽", "적도 남쪽·본초 자오선 동쪽"], answer: 1, explanation: "북위는 적도 북쪽, 동경은 본초 자오선 동쪽을 뜻합니다.", focus: { lat: 35, lng: 130, zoom: 4, label: "동아시아의 북반구·동반구 위치를 확인하세요." } },
    { id: "coordinates-04", topic: "coordinates", difficulty: "advanced", prompt: "날짜변경선이 경도 180°와 정확히 일치하지 않고 일부 구간에서 굽어 있는 주된 까닭은?", options: ["적도를 피하려고", "한 나라나 섬 안에서 날짜가 갈리는 일을 줄이려고", "본초 자오선과 만나지 않으려고", "북극과 남극을 피하려고"], answer: 1, explanation: "날짜변경선은 한 나라나 섬 무리 안에 서로 다른 날짜가 생기는 불편을 줄이기 위해 180° 부근에서 굽어 지나갑니다.", focus: { lat: 8, lng: 178, zoom: 3, label: "태평양의 180° 부근에서 굽은 선을 보세요." } },
    { id: "coordinates-05", topic: "coordinates", difficulty: "advanced", prompt: "날짜변경선을 서쪽으로 건너갈 때 날짜는 어떻게 조정하는가?", options: ["하루를 더한다", "하루를 뺀다", "한 시간을 더한다", "바꾸지 않는다"], answer: 0, explanation: "날짜변경선을 동쪽에서 서쪽으로 건너면 하루를 더하고, 서쪽에서 동쪽으로 건너면 하루를 뺍니다.", focus: { lat: 2, lng: 178, zoom: 3, label: "아시아·오세아니아 쪽으로 서진하는 상황을 떠올리세요." } },

    { id: "terrain-01", topic: "terrain", difficulty: "basic", prompt: "인도판과 유라시아판의 충돌로 형성된 높은 산맥은?", options: ["안데스산맥", "로키산맥", "히말라야산맥", "우랄산맥"], answer: 2, explanation: "히말라야산맥은 인도판이 유라시아판과 충돌하며 융기해 형성되었습니다.", focus: { lat: 29, lng: 84, zoom: 4, label: "인도 북쪽과 티베트고원 남쪽의 산맥입니다." } },
    { id: "terrain-02", topic: "terrain", difficulty: "basic", prompt: "남아메리카 서쪽 해안을 따라 남북으로 길게 이어지는 산맥은?", options: ["안데스산맥", "알프스산맥", "애팔래치아산맥", "히말라야산맥"], answer: 0, explanation: "안데스산맥은 남아메리카 서쪽 가장자리를 따라 길게 이어집니다.", focus: { lat: -20, lng: -69, zoom: 3, label: "남아메리카의 태평양 쪽 가장자리를 보세요." } },
    { id: "terrain-03", topic: "terrain", difficulty: "basic", prompt: "세계에서 유역 면적과 유량이 매우 크며 남아메리카를 흐르는 강은?", options: ["나일강", "아마존강", "미시시피강", "메콩강"], answer: 1, explanation: "아마존강은 안데스산지에서 시작해 열대 우림을 지나 대서양으로 흐릅니다.", focus: { lat: -3, lng: -60, zoom: 3, label: "남아메리카 북부의 넓은 유역을 확인하세요." } },
    { id: "terrain-04", topic: "terrain", difficulty: "advanced", prompt: "아프리카 동북부를 대체로 남쪽에서 북쪽으로 흘러 지중해로 들어가는 강은?", options: ["콩고강", "나이저강", "잠베지강", "나일강"], answer: 3, explanation: "나일강은 아프리카 동북부를 북쪽으로 흘러 이집트를 지나 지중해로 들어갑니다.", focus: { lat: 20, lng: 31, zoom: 3, label: "아프리카 동북부의 길게 이어진 강입니다." } },
    { id: "terrain-05", topic: "terrain", difficulty: "advanced", prompt: "히말라야산맥 북쪽에 있으며 ‘세계의 지붕’이라 불리는 고원은?", options: ["데칸고원", "브라질고원", "티베트고원", "에티오피아고원"], answer: 2, explanation: "티베트고원은 평균 고도가 매우 높은 광대한 고원으로 히말라야산맥 북쪽에 있습니다.", focus: { lat: 32, lng: 88, zoom: 4, label: "히말라야 북쪽의 넓고 높은 땅을 보세요." } },

    { id: "climate-01", topic: "climate", difficulty: "basic", prompt: "적도 부근에 연중 비가 많이 내리는 가장 직접적인 까닭은?", options: ["차가운 해류가 흘러서", "상승 기류가 자주 발달해서", "대륙 내부라서", "극동풍이 불어서"], answer: 1, explanation: "적도 부근은 강한 일사로 공기가 데워져 상승하고, 수증기가 응결하면서 비가 자주 내립니다.", focus: { lat: -4, lng: -63, zoom: 3, label: "적도가 지나는 아마존 열대 우림을 확인하세요." } },
    { id: "climate-02", topic: "climate", difficulty: "advanced", prompt: "사하라 사막이 넓게 발달한 원인과 가장 관련 깊은 것은?", options: ["아열대 고압대의 하강 기류", "적도 저압대의 상승 기류", "계절풍의 여름 강수", "극전선의 잦은 통과"], answer: 0, explanation: "남·북위 20~30도 부근에서는 아열대 고압대의 공기가 내려오며 구름 발달을 억제해 건조해집니다.", focus: { lat: 24, lng: 13, zoom: 3, label: "북회귀선 부근의 아프리카 북부입니다." } },
    { id: "climate-03", topic: "climate", difficulty: "advanced", prompt: "같은 위도의 다른 지역보다 서유럽의 겨울이 비교적 온화한 데 영향을 주는 것은?", options: ["북대서양 난류와 편서풍", "페루 한류와 무역풍", "시베리아 기단과 극동풍", "아열대 고압대와 계절풍"], answer: 0, explanation: "따뜻한 북대서양 난류와 바다에서 불어오는 편서풍이 서유럽의 겨울 기온을 완화합니다.", focus: { lat: 50, lng: 1, zoom: 4, label: "대서양과 맞닿은 유럽 서쪽을 보세요." } },
    { id: "climate-04", topic: "climate", difficulty: "basic", prompt: "계절에 따라 바람의 방향이 크게 바뀌어 우기와 건기에 영향을 주는 바람은?", options: ["편서풍", "극동풍", "계절풍", "해륙풍"], answer: 2, explanation: "계절풍(몬순)은 대륙과 해양의 가열 차이로 계절마다 방향이 바뀌며 남아시아와 동남아시아의 강수에 큰 영향을 줍니다.", focus: { lat: 13, lng: 104, zoom: 4, label: "아시아 남부와 동남부의 바다와 육지를 함께 보세요." } },
    { id: "climate-05", topic: "climate", difficulty: "basic", prompt: "대륙 내부인 시베리아에서 기온의 연교차가 큰 주된 이유는?", options: ["바다의 영향을 강하게 받아서", "적도와 가까워서", "바다의 온도 조절 영향이 약해서", "난류가 대륙 안쪽까지 흘러서"], answer: 2, explanation: "대륙 내부는 바다의 온도 조절 영향을 적게 받아 여름과 겨울의 기온 차가 커집니다.", focus: { lat: 61, lng: 101, zoom: 3, label: "아시아 북부의 바다에서 먼 내륙입니다." } },

    { id: "population-01", topic: "population", difficulty: "basic", prompt: "세계의 대표적인 인구 밀집 지역을 바르게 묶은 것은?", options: ["동아시아·남아시아·유럽", "사하라·그린란드·남극", "시베리아·아마존·티베트", "오스트레일리아 내륙·고비·파타고니아"], answer: 0, explanation: "동아시아, 남아시아, 유럽은 오랜 농업·산업·도시 발달과 함께 인구가 밀집한 대표 지역입니다.", focus: { lat: 35, lng: 93, zoom: 2, label: "유라시아의 남쪽과 서쪽 인구 밀집 지역을 비교하세요." } },
    { id: "population-02", topic: "population", difficulty: "advanced", prompt: "건조한 이집트에서 인구가 좁고 길게 모여 있는 공간은?", options: ["사하라 사막 한가운데", "나일강 유역과 삼각주", "홍해의 산지", "리비아 사막 서부"], answer: 1, explanation: "이집트 인구는 물과 농경지를 얻을 수 있는 나일강 유역과 삼각주에 집중합니다.", focus: { lat: 27, lng: 31, zoom: 4, label: "사막 사이를 흐르는 나일강을 따라가 보세요." } },
    { id: "population-03", topic: "population", difficulty: "basic", prompt: "일반적으로 인구가 희박한 곳의 자연환경으로 가장 알맞은 것은?", options: ["온화한 해안 평야", "교통이 편리한 하구", "물이 부족한 사막", "비옥한 충적 평야"], answer: 2, explanation: "사막은 물이 부족해 대규모 정착과 농업에 불리하므로 인구가 희박한 편입니다.", focus: { lat: 25, lng: 4, zoom: 4, label: "사하라 내부의 넓은 건조 지역을 보세요." } },
    { id: "population-04", topic: "population", difficulty: "advanced", prompt: "미국 북동부에 큰 도시들이 띠 모양으로 이어진 데 유리했던 조건은?", options: ["한대 기후와 빙상", "대서양 연안의 항구와 산업·교통 발달", "열대 우림과 플랜테이션", "고산 기후와 유목"], answer: 1, explanation: "미국 북동부는 대서양 항구, 이른 산업화, 발달한 교통망을 바탕으로 큰 도시권이 이어졌습니다.", focus: { lat: 40, lng: -75, zoom: 4, label: "보스턴에서 워싱턴으로 이어지는 대서양 연안을 보세요." } },
    { id: "population-05", topic: "population", difficulty: "basic", prompt: "도시 인구의 비율이 높아지고 도시의 생활 방식이 넓게 퍼지는 현상은?", options: ["도시화", "사막화", "빙하화", "고산화"], answer: 0, explanation: "도시화는 전체 인구에서 도시 인구가 차지하는 비율이 높아지고 도시적 생활 양식이 확산되는 현상입니다.", focus: { lat: 51, lng: 6, zoom: 4, label: "도시와 교통망이 촘촘한 서유럽을 살펴보세요." } },

    { id: "region-01", topic: "region", difficulty: "basic", prompt: "중국·한국·일본 등이 속하며 계절풍의 영향을 크게 받는 지역은?", options: ["동아시아", "남아메리카", "북유럽", "오세아니아"], answer: 0, explanation: "중국·한국·일본은 동아시아에 속하며 여름과 겨울 계절풍의 영향을 크게 받습니다.", focus: { lat: 36, lng: 120, zoom: 3, label: "유라시아 대륙의 동쪽 가장자리를 보세요." } },
    { id: "region-02", topic: "region", difficulty: "advanced", prompt: "지중해와 홍해를 이어 유럽과 아시아 사이의 항로를 크게 줄인 운하는?", options: ["파나마 운하", "수에즈 운하", "킬 운하", "볼가·돈 운하"], answer: 1, explanation: "수에즈 운하는 지중해와 홍해를 이어 유럽에서 인도양으로 가는 항로를 크게 줄였습니다.", focus: { lat: 30, lng: 32.5, zoom: 5, label: "아프리카와 아시아가 만나는 이집트 동북부입니다." } },
    { id: "region-03", topic: "region", difficulty: "advanced", prompt: "대서양과 태평양을 이어 아메리카 대륙 남쪽을 돌아가는 항로를 줄인 운하는?", options: ["수에즈 운하", "파나마 운하", "대운하", "코린트 운하"], answer: 1, explanation: "파나마 운하는 중앙아메리카의 좁은 지협을 가로질러 대서양과 태평양을 잇습니다.", focus: { lat: 9, lng: -79.6, zoom: 5, label: "북아메리카와 남아메리카 사이의 좁은 육지를 보세요." } },
    { id: "region-04", topic: "region", difficulty: "basic", prompt: "건조 기후와 석유 자원, 유럽·아시아·아프리카를 잇는 위치가 중요한 지역은?", options: ["서남아시아", "동남아시아", "북유럽", "오세아니아"], answer: 0, explanation: "서남아시아는 건조 지역이 넓고 석유 자원이 풍부하며 세 대륙을 잇는 교통의 길목입니다.", focus: { lat: 28, lng: 46, zoom: 4, label: "지중해 동쪽과 아라비아반도 주변을 보세요." } },
    { id: "region-05", topic: "region", difficulty: "basic", prompt: "오스트레일리아·뉴질랜드와 태평양의 여러 섬을 포함하는 지역은?", options: ["라틴아메리카", "앵글로아메리카", "오세아니아", "중앙아시아"], answer: 2, explanation: "오세아니아는 오스트레일리아와 뉴질랜드, 멜라네시아·미크로네시아·폴리네시아의 여러 섬을 포함합니다.", focus: { lat: -26, lng: 138, zoom: 3, label: "아시아 남동쪽과 태평양 남서부를 보세요." } }
  ];

  window.WORLD_GEOGRAPHY = { themes, questions };
})();
