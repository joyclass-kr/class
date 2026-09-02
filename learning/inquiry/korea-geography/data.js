(function () {
  "use strict";

  const themes = {
    terrain: {
      label: "지형",
      kicker: "지형 환경",
      title: "한반도의 동고서저와 산지 체계",
      summary: "백두산·개마고원에서 태백산맥으로 이어지는 높은 산지는 한반도 동쪽에 치우치고, 큰 하천은 대체로 서쪽과 남쪽으로 흐릅니다. 남북 전체의 산지·하천·해안 관계를 연결해 보세요.",
      points: [
        "백두산·개마고원과 낭림·함경산맥은 북부의 높고 험준한 산지를 이룬다.",
        "북한강과 남한강은 양수리에서 합류해 한강을 이루고, 임진강은 하구 부근에서 합류한다.",
        "태백산맥은 동해안 가까이에 있어 동해안 하천은 짧고 경사가 급하다.",
        "서·남해안은 수심이 얕고 해안선이 복잡하며 조차가 큰 편이다.",
        "신생대 화산 활동은 제주도·울릉도·독도·철원 일대의 지형에 흔적을 남겼다."
      ],
      legend: [
        { label: "저지대", color: "#dce2ae" },
        { label: "중산지", color: "#8bb270" },
        { label: "고산지", color: "#977e52" },
        { label: "하천", color: "#2377b7" }
      ],
      relief: true,
      rivers: true,
      featureMarkers: false,
      annotations: [
        { name: "백두산", kind: "mountain", lat: 42.01, lng: 128.06 },
        { name: "개마고원", kind: "mountain", lat: 41.25, lng: 127.95 },
        { name: "낭림산맥", kind: "mountain", lat: 40.65, lng: 127.30, minZoom: 6 },
        { name: "함경산맥", kind: "mountain", lat: 40.85, lng: 128.65, minZoom: 6 },
        { name: "압록강", kind: "river", lat: 40.55, lng: 125.45 },
        { name: "두만강", kind: "river", lat: 42.25, lng: 129.60 },
        { name: "대동강", kind: "river", lat: 39.15, lng: 125.70 },
        { name: "청천강", kind: "river", lat: 40.08, lng: 126.21, minZoom: 6 },
        { name: "북한강", kind: "river", lat: 37.78, lng: 127.63, minZoom: 7 },
        { name: "남한강", kind: "river", lat: 37.47, lng: 127.48, minZoom: 7 },
        { name: "임진강", kind: "river", lat: 38.05, lng: 126.92, minZoom: 7 },
        { name: "태백산맥", kind: "mountain", lat: 37.22, lng: 128.78 },
        { name: "소백산맥", kind: "mountain", lat: 36.20, lng: 128.03 },
        { name: "한강", kind: "river", lat: 37.53, lng: 126.82 },
        { name: "금강", kind: "river", lat: 36.28, lng: 127.05 },
        { name: "낙동강", kind: "river", lat: 35.82, lng: 128.47 },
        { name: "영산강", kind: "river", lat: 35.05, lng: 126.68 },
        { name: "섬진강", kind: "river", lat: 35.30, lng: 127.58 }
      ],
      features: [
        { name: "백두산·개마고원", icon: "▲", color: "#75481f", lat: 41.60, lng: 128.02, zoom: 7, note: "한반도에서 가장 높고 험준한 북부 산지" },
        { name: "북부 4대 하천", icon: "川", color: "#2377b7", lat: 40.35, lng: 126.65, zoom: 7, note: "압록강·두만강·대동강·청천강" },
        { name: "한강 수계", icon: "水", color: "#176f9e", lat: 37.62, lng: 127.27, zoom: 8, note: "북한강·남한강 합류와 임진강의 하구 연결" },
        { name: "태백산맥", icon: "▲", color: "#8b5a2b", lat: 37.25, lng: 128.72, zoom: 8, note: "동해안 가까이 뻗은 1차 산맥" },
        { name: "대관령", icon: "고", color: "#a56c38", lat: 37.69, lng: 128.75, zoom: 10, note: "영서와 영동을 잇는 고개" },
        { name: "제주 화산 지형", icon: "火", color: "#bd5b34", lat: 33.38, lng: 126.53, zoom: 9, note: "한라산·오름·용암 동굴" },
        { name: "한반도 서남해안", icon: "灣", color: "#277a8f", lat: 35.05, lng: 126.25, zoom: 8, note: "복잡한 해안선과 넓은 갯벌" }
      ]
    },
    climate: {
      label: "기후",
      kicker: "기후 환경",
      title: "위도·해발·바다·지형의 조합",
      summary: "기온과 강수는 위도만으로 결정되지 않습니다. 내륙과 해안, 바람받이와 바람그늘, 해발 고도의 차이를 함께 읽어야 합니다.",
      points: [
        "겨울 기온은 대체로 남쪽이 높지만, 같은 위도에서는 해안이 내륙보다 온화하다.",
        "여름 강수 집중도가 높고, 장마·태풍·국지성 호우의 영향을 받는다.",
        "영동은 겨울 북동 기류 때, 호남 서해안은 북서 계절풍 때 많은 눈이 내릴 수 있다."
      ],
      legend: [
        { label: "다설 지역", color: "#4a90c2" },
        { label: "분지 기후", color: "#d46b3d" },
        { label: "고랭지", color: "#3b8f73" }
      ],
      zones: [
        { name: "영동 겨울 다설", coords: [[38.35, 128.15], [38.28, 128.62], [37.15, 129.12], [36.75, 129.38], [37.25, 128.60]], color: "#4a90c2" },
        { name: "호남 서해안 겨울 다설", coords: [[35.95, 126.20], [35.95, 126.95], [34.45, 126.90], [34.45, 126.25]], color: "#6ba7ce" },
        { name: "남해안 온난 지역", coords: [[34.15, 126.05], [35.00, 126.60], [35.05, 129.35], [34.35, 128.80]], color: "#e2a83b" }
      ],
      features: [
        { name: "대관령", icon: "❄", color: "#4a90c2", lat: 37.69, lng: 128.75, zoom: 10, note: "높은 해발과 겨울 다설" },
        { name: "대구 분지", icon: "☀", color: "#d46b3d", lat: 35.87, lng: 128.60, zoom: 10, note: "내륙 분지의 큰 기온 차" },
        { name: "제주 남부", icon: "🌧", color: "#277a8f", lat: 33.25, lng: 126.55, zoom: 9, note: "해양·지형성 강수의 영향" },
        { name: "태백 고랭지", icon: "🌱", color: "#3b8f73", lat: 37.16, lng: 128.99, zoom: 10, note: "서늘한 여름을 이용한 농업" }
      ]
    },
    population: {
      label: "인구·도시",
      kicker: "인구와 공간",
      title: "수도권 집중과 도시 체계",
      summary: "인구 분포는 일자리·교통·서비스의 집중과 연결됩니다. 대도시권의 팽창과 비수도권 중소 도시·농산어촌의 고령화를 함께 비교하세요.",
      points: [
        "수도권은 서울을 중심으로 인천·경기까지 통근권과 생활권이 넓게 이어진다.",
        "도심 공동화, 교외화, 재도시화는 도시 내부 구조 변화의 서로 다른 모습이다.",
        "청장년층 순유출이 지속된 지역은 고령 인구 비율이 빠르게 높아질 수 있다."
      ],
      legend: [
        { label: "대도시권", color: "#7b4ab0" },
        { label: "혁신·행정 도시", color: "#2f8a76" },
        { label: "인구 감소 관심", color: "#cf6a4a" }
      ],
      zones: [
        { name: "수도권", coords: [[38.25, 126.55], [38.15, 128.00], [36.85, 127.90], [36.72, 126.45]], color: "#7b4ab0" },
        { name: "동남권 도시축", coords: [[36.05, 128.35], [35.80, 129.50], [34.80, 129.25], [35.05, 128.15]], color: "#3b7fa8" }
      ],
      features: [
        { name: "수도권", icon: "◎", color: "#7b4ab0", lat: 37.53, lng: 127.05, zoom: 9, note: "최대 인구·기능 집중 지역" },
        { name: "세종", icon: "🏛", color: "#2f8a76", lat: 36.48, lng: 127.29, zoom: 11, note: "행정 기능 이전과 계획도시" },
        { name: "부산·울산권", icon: "●", color: "#3b7fa8", lat: 35.37, lng: 129.05, zoom: 9, note: "항만·공업 기반 대도시권" },
        { name: "전남 농산어촌", icon: "↘", color: "#cf6a4a", lat: 34.90, lng: 126.85, zoom: 8, note: "고령화와 인구 감소 과제" }
      ]
    },
    industry: {
      label: "산업·교통",
      kicker: "생산과 소비 공간",
      title: "산업 입지와 국토의 간선축",
      summary: "원료·시장·노동력·교통·집적 이익 가운데 무엇이 중요한지 산업별로 구분해야 합니다. 항만 공업과 지식 기반 산업의 입지는 특히 다릅니다.",
      points: [
        "제철·석유 화학·조선처럼 원료 수입과 대량 운송이 중요한 산업은 해안 항만에 집중한다.",
        "반도체·연구 개발 산업은 수도권 남부와 충청권의 인력·연구·교통망을 활용한다.",
        "경부축은 수도권과 충청권, 대구권, 동남권을 잇는 핵심 교통·도시 축이다."
      ],
      legend: [
        { label: "중화학 공업", color: "#b64f3e" },
        { label: "첨단 산업", color: "#5b53aa" },
        { label: "경부축", color: "#d28a18" }
      ],
      lines: [
        { name: "경부축", kind: "transport", coords: [[37.57, 126.98], [36.35, 127.38], [35.87, 128.60], [35.18, 129.08]], color: "#d28a18" },
        { name: "호남축", kind: "transport", coords: [[37.57, 126.98], [36.35, 127.38], [35.16, 126.85], [34.81, 126.39]], color: "#d5a13f" }
      ],
      features: [
        { name: "경기 남부 반도체", icon: "▦", color: "#5b53aa", lat: 37.18, lng: 127.20, zoom: 10, note: "연구 인력·협력 업체 집적" },
        { name: "포항 제철", icon: "⚙", color: "#b64f3e", lat: 36.02, lng: 129.37, zoom: 11, note: "항만형 제철 공업" },
        { name: "울산 공업", icon: "🏭", color: "#b64f3e", lat: 35.54, lng: 129.31, zoom: 10, note: "자동차·조선·석유 화학" },
        { name: "광양 제철", icon: "⚙", color: "#b64f3e", lat: 34.94, lng: 127.69, zoom: 11, note: "대규모 항만형 제철 공업" },
        { name: "대덕 연구개발", icon: "⌁", color: "#2f8a76", lat: 36.39, lng: 127.36, zoom: 11, note: "연구 기관과 첨단 기업 집적" }
      ]
    },
    region: {
      label: "권역",
      kicker: "지역 이해",
      title: "권역별 핵심 연결 고리",
      summary: "지역 이름을 외우는 데서 끝내지 말고 자연환경→산업→도시의 연결을 읽으세요. 지도의 지점을 누르면 대표 단서를 확인할 수 있습니다.",
      points: [
        "수도권은 인구·중추 관리 기능, 충청권은 교통 결절과 행정·연구 기능이 두드러진다.",
        "호남권은 평야 농업과 서남해안, 영남권은 동남 임해 공업과 대도시 축이 핵심이다.",
        "강원권은 산지·고원·동해안, 제주권은 화산 지형과 관광·아열대성 작물이 중요하다."
      ],
      legend: [
        { label: "권역 중심", color: "#176b72" },
        { label: "대표 자연", color: "#4b8c58" },
        { label: "대표 산업", color: "#b56b2d" }
      ],
      features: [
        { name: "수도권", icon: "首", color: "#176b72", lat: 37.55, lng: 127.00, zoom: 8, note: "중추 관리·첨단 산업·최대 인구" },
        { name: "강원권", icon: "山", color: "#4b8c58", lat: 37.45, lng: 128.35, zoom: 8, note: "태백산지·고원·동해안" },
        { name: "충청권", icon: "交", color: "#176b72", lat: 36.45, lng: 127.35, zoom: 8, note: "교통 결절·행정·연구" },
        { name: "호남권", icon: "田", color: "#4b8c58", lat: 35.25, lng: 126.95, zoom: 8, note: "평야 농업·서남해안·새만금" },
        { name: "영남권", icon: "工", color: "#b56b2d", lat: 35.65, lng: 128.75, zoom: 8, note: "동남 임해 공업·대도시축" },
        { name: "제주권", icon: "火", color: "#b56b2d", lat: 33.38, lng: 126.53, zoom: 9, note: "화산 지형·관광·특용 작물" }
      ]
    }
  };

  const questions = [
    {
      id: "terrain-01", topic: "terrain", difficulty: "basic",
      prompt: "우리나라 지형의 전반적인 특징인 ‘동고서저’와 가장 직접적으로 관련된 설명은?",
      options: ["큰 하천이 주로 동해로 흐른다.", "높고 연속적인 산지가 동쪽에 치우쳐 있다.", "서해안에 해식애가 연속적으로 발달한다.", "남부 지방일수록 산지 비율이 반드시 높다.", "평야가 동해안에 가장 넓게 분포한다."],
      answer: 1,
      explanation: "태백산맥을 비롯한 높은 산지가 동쪽에 치우쳐 있어 동쪽은 높고 서쪽은 낮은 지세가 나타납니다. 그래서 한강·금강 같은 큰 하천은 대체로 서쪽이나 남쪽으로 길게 흐릅니다.",
      focus: { theme: "terrain", lat: 37.25, lng: 128.72, zoom: 7, label: "태백산맥을 기준으로 동서 지형을 비교하세요." }
    },
    {
      id: "terrain-02", topic: "terrain", difficulty: "basic",
      prompt: "서해안과 남해안에서 공통적으로 잘 나타나는 지형 특성은?",
      options: ["해안선이 단조롭고 수심이 깊다.", "조차가 작고 천연 항만이 드물다.", "리아스 해안과 넓은 갯벌이 나타난다.", "융기 해안 단구가 해안 전역에 연속된다.", "용암 대지가 넓게 분포한다."],
      answer: 2,
      explanation: "서·남해안은 침수된 골짜기와 많은 섬 때문에 해안선이 복잡합니다. 특히 서해안은 수심이 얕고 조차가 커 넓은 갯벌이 발달합니다.",
      focus: { theme: "terrain", lat: 35.05, lng: 126.25, zoom: 7, label: "서남해안의 복잡한 해안선을 확인하세요." }
    },
    {
      id: "terrain-03", topic: "terrain", difficulty: "advanced",
      prompt: "동해로 흐르는 하천이 서해로 흐르는 하천보다 대체로 짧고 경사가 급한 주된 이유는?",
      options: ["동해안의 강수량이 항상 더 적어서", "태백산맥이 동해안 가까이에 있어서", "동해안의 조차가 더 커서", "서해안에 화산 지형이 많아서", "한반도의 남북 길이가 길어서"],
      answer: 1,
      explanation: "분수계 역할을 하는 태백산맥이 동해안 가까이 놓여 있습니다. 산맥 동쪽은 바다까지 거리가 짧아 하천이 짧고 급하며, 서쪽 하천은 완만한 사면을 따라 길게 흐릅니다.",
      focus: { theme: "terrain", lat: 37.45, lng: 128.75, zoom: 8, label: "태백산맥과 동해안 사이의 좁은 거리를 보세요." }
    },
    {
      id: "terrain-04", topic: "terrain", difficulty: "basic",
      prompt: "제주도의 화산 지형을 올바르게 묶은 것은?",
      options: ["칼데라호·석호·해안 단구", "오름·용암 동굴·주상 절리", "삼각주·선상지·범람원", "카르스트 와지·돌리네·석회 동굴", "갯벌·사주·육계도"],
      answer: 1,
      explanation: "제주도는 신생대 화산 활동으로 형성되어 한라산, 오름, 용암 동굴, 주상 절리 같은 화산 지형이 발달했습니다.",
      focus: { theme: "terrain", lat: 33.38, lng: 126.53, zoom: 9, label: "제주도는 대표적인 화산섬입니다." }
    },
    {
      id: "terrain-05", topic: "terrain", difficulty: "advanced",
      prompt: "석회암이 널리 분포하는 강원 남부와 충북 북동부에서 나타날 가능성이 큰 경관은?",
      options: ["용암 동굴과 오름", "갯벌과 염전", "돌리네와 석회 동굴", "사주와 석호", "넓은 삼각주"],
      answer: 2,
      explanation: "석회암이 빗물과 지하수에 용식되면 돌리네, 우발라, 석회 동굴 같은 카르스트 지형이 발달합니다. 단양·영월·삼척 일대가 대표적입니다.",
      focus: { theme: "terrain", lat: 37.05, lng: 128.35, zoom: 9, label: "단양·영월·삼척의 석회암 지대를 떠올리세요." }
    },
    {
      id: "climate-01", topic: "climate", difficulty: "basic",
      prompt: "같은 위도의 해안 도시가 내륙 도시보다 일반적으로 연교차가 작은 이유는?",
      options: ["해안은 언제나 해발 고도가 높아서", "바다가 육지보다 천천히 데워지고 식어서", "해안에는 산맥이 전혀 없어서", "내륙은 겨울 강수량이 항상 많아서", "해안의 일사량이 연중 일정해서"],
      answer: 1,
      explanation: "바다는 육지보다 비열이 커 기온 변화가 느립니다. 해안은 바다의 영향을 받아 여름 상승과 겨울 하강이 완화되므로 내륙보다 연교차가 작은 편입니다.",
      focus: { theme: "climate", lat: 36.20, lng: 129.15, zoom: 7, label: "동해안과 같은 위도의 내륙을 비교하세요." }
    },
    {
      id: "climate-02", topic: "climate", difficulty: "advanced",
      prompt: "겨울철 영동 지방에 많은 눈이 내리는 상황을 가장 잘 설명한 것은?",
      options: ["남서 기류가 소백산맥을 넘으며 상승한다.", "북동 기류가 동해에서 수증기를 얻어 태백산맥 사면에서 상승한다.", "북서 계절풍이 황해를 지나 제주 산지에서만 상승한다.", "푄 현상으로 공기가 건조해지며 눈이 내린다.", "장마 전선이 동해안에 정체한다."],
      answer: 1,
      explanation: "차가운 북동 기류가 상대적으로 따뜻한 동해를 지나며 수증기를 공급받고, 태백산맥 동쪽 사면에서 상승해 영동에 많은 눈을 내릴 수 있습니다.",
      focus: { theme: "climate", lat: 37.69, lng: 128.75, zoom: 9, label: "동해와 태백산맥 동쪽 사면의 관계가 핵심입니다." }
    },
    {
      id: "climate-03", topic: "climate", difficulty: "basic",
      prompt: "고랭지 농업이 발달하기 좋은 조건은?",
      options: ["겨울이 따뜻하고 무상 기간이 매우 길다.", "여름이 서늘하고 일교차가 비교적 크다.", "조차가 커서 갯벌이 넓다.", "연중 강수량이 거의 없다.", "용암 대지가 해안까지 이어진다."],
      answer: 1,
      explanation: "태백산지의 높은 지역은 여름이 서늘해 평지의 여름철 재배가 어려운 채소를 생산하기 좋습니다. 무·배추·감자 등의 고랭지 농업이 대표적입니다.",
      focus: { theme: "climate", lat: 37.16, lng: 128.99, zoom: 10, label: "태백 고원의 높은 해발을 확인하세요." }
    },
    {
      id: "climate-04", topic: "climate", difficulty: "advanced",
      prompt: "다음 기후 자료에 해당할 가능성이 가장 큰 지역은?<br><br><b>겨울 평균 기온이 비교적 높고, 연교차가 작으며, 한라산 남쪽 사면의 지형성 강수 영향을 받는다.</b>",
      options: ["대관령", "춘천", "서귀포", "대구", "백령도"],
      answer: 2,
      explanation: "서귀포는 저위도이면서 바다의 영향을 크게 받고 한라산 남쪽에 있어 겨울이 온화하고 연교차가 작습니다. 남쪽에서 유입되는 습윤 기류의 지형성 강수 영향도 받습니다.",
      focus: { theme: "climate", lat: 33.25, lng: 126.55, zoom: 10, label: "한라산 남쪽의 서귀포를 확인하세요." }
    },
    {
      id: "climate-05", topic: "climate", difficulty: "advanced",
      prompt: "봄철 영동 지방에 고온 건조하고 강한 바람이 나타나는 ‘양간지풍’과 관련 깊은 현상은?",
      options: ["해륙풍", "푄 현상", "열섬 현상", "기온 역전", "장마 전선"],
      answer: 1,
      explanation: "서쪽에서 넘어온 공기가 태백산맥을 넘은 뒤 동쪽 사면으로 하강하며 고온 건조해지는 푄 현상과 관련됩니다. 강풍과 건조가 겹쳐 산불 위험을 높이기도 합니다.",
      focus: { theme: "climate", lat: 37.55, lng: 128.95, zoom: 9, label: "태백산맥을 넘는 공기의 상승·하강을 생각하세요." }
    },
    {
      id: "population-01", topic: "population", difficulty: "basic",
      prompt: "수도권의 인구 집중을 강화하는 요인으로 가장 거리가 먼 것은?",
      options: ["다양한 일자리", "대학과 문화 시설", "광역 교통망", "중추 관리 기능", "농림어업 종사 기회의 전국 최대 집중"],
      answer: 4,
      explanation: "수도권 집중은 기업 본사, 행정·금융, 대학, 문화, 교통과 다양한 서비스 일자리의 집적과 관련됩니다. 농림어업은 수도권 집중을 설명하는 핵심 요인이 아닙니다.",
      focus: { theme: "population", lat: 37.53, lng: 127.05, zoom: 8, label: "서울을 중심으로 인천·경기가 연결된 대도시권입니다." }
    },
    {
      id: "population-02", topic: "population", difficulty: "advanced",
      prompt: "청장년층 순유출이 오랫동안 지속된 농촌 지역에서 나타날 가능성이 가장 큰 변화는?",
      options: ["유소년 부양비만 급증", "고령 인구 비율 상승", "주간 인구 지수의 급격한 상승", "제조업 본사 기능 집중", "도심 인구 공동화 해소"],
      answer: 1,
      explanation: "청장년층이 빠져나가면 출생아 수가 줄고 남아 있는 고령층의 비중이 커집니다. 이는 노동력 부족과 생활 서비스 접근성 저하로 이어질 수 있습니다.",
      focus: { theme: "population", lat: 34.90, lng: 126.85, zoom: 8, label: "농산어촌의 인구 구조 변화를 생각하세요." }
    },
    {
      id: "population-03", topic: "population", difficulty: "advanced",
      prompt: "서울의 도심보다 주변 업무·주거 지역에서 상주인구가 늘어나는 현상을 설명하기에 알맞은 것은?",
      options: ["교외화와 다핵 구조의 발달", "도시화 이전의 촌락 회귀", "산업 공동화의 완전한 해소", "농업적 토지 이용의 확대", "도심 접근성의 완전한 소멸"],
      answer: 0,
      explanation: "주거와 업무 기능이 외곽 및 부도심으로 이동하면 교외화와 다핵화가 진행됩니다. 광역 교통망은 서울 주변 도시와 부도심의 성장을 뒷받침합니다.",
      focus: { theme: "population", lat: 37.45, lng: 127.05, zoom: 10, label: "서울 도심과 경기의 위성·신도시를 함께 보세요." }
    },
    {
      id: "population-04", topic: "population", difficulty: "basic",
      prompt: "세종특별자치시의 성장 배경과 가장 관련 깊은 것은?",
      options: ["대규모 제철소 입지", "중앙 행정 기관의 이전", "국제 원유 수입항 건설", "화산 지형 관광 개발", "원양 어업 기지 조성"],
      answer: 1,
      explanation: "세종은 국토의 균형 발전과 수도권 과밀 완화를 목표로 중앙 행정 기관이 이전하며 성장한 계획도시입니다.",
      focus: { theme: "population", lat: 36.48, lng: 127.29, zoom: 11, label: "국토 중앙부의 행정 기능 계획도시입니다." }
    },
    {
      id: "population-05", topic: "population", difficulty: "advanced",
      prompt: "한 도시의 주간 인구 지수가 100보다 훨씬 높게 나타날 때 가장 타당한 해석은?",
      options: ["밤에만 인구가 유입된다.", "통근·통학으로 낮 시간 유입 인구가 많다.", "유소년 인구 비율이 높다.", "외국인 비율이 반드시 높다.", "인구의 자연 증가율이 높다."],
      answer: 1,
      explanation: "주간 인구 지수는 상주인구에 대한 주간 인구의 비율입니다. 100보다 높으면 업무·학교·상업 기능 때문에 낮 시간 유입 인구가 많다는 뜻입니다.",
      focus: { theme: "population", lat: 37.57, lng: 126.98, zoom: 11, label: "도심의 업무·상업 기능이 통근 인구를 끌어들입니다." }
    },
    {
      id: "industry-01", topic: "industry", difficulty: "basic",
      prompt: "울산의 대표 산업 조합으로 가장 적절한 것은?",
      options: ["반도체·소프트웨어·출판", "자동차·조선·석유 화학", "시멘트·도자기·양잠", "수산 가공·원양 어업만 집중", "항공 우주·애니메이션만 집중"],
      answer: 1,
      explanation: "울산은 대규모 항만과 공업 단지를 바탕으로 자동차, 조선, 석유 화학이 발달한 대표적인 동남 임해 공업 도시입니다.",
      focus: { theme: "industry", lat: 35.54, lng: 129.31, zoom: 10, label: "항만을 낀 동남 임해 공업 지역입니다." }
    },
    {
      id: "industry-02", topic: "industry", difficulty: "basic",
      prompt: "포항과 광양에 공통적으로 발달한 공업은?",
      options: ["제철", "반도체", "섬유", "출판", "항공기 조립"],
      answer: 0,
      explanation: "포항과 광양은 철광석·유연탄 같은 원료를 대량 수입하기 편리한 항만을 바탕으로 일관 제철 공업이 발달했습니다.",
      focus: { theme: "industry", lat: 35.48, lng: 128.72, zoom: 7, label: "포항과 광양은 서로 떨어져 있지만 모두 항만형 제철 도시입니다." }
    },
    {
      id: "industry-03", topic: "industry", difficulty: "advanced",
      prompt: "경기 남부와 충청 북부에 반도체 산업이 집적하는 이유로 가장 적절한 것은?",
      options: ["철광석 산지와 가깝기 때문", "숙련 인력·연구 시설·협력 업체와의 연계가 좋기 때문", "큰 조차를 이용할 수 있기 때문", "고랭지 농업과 연계하기 때문", "원목 수입항만 있기 때문"],
      answer: 1,
      explanation: "첨단 산업은 원료 산지보다 전문 인력, 연구 개발, 협력 업체, 교통·시장 접근성과 집적 이익이 중요합니다. 수도권 남부와 충청 북부가 이 조건을 갖춥니다.",
      focus: { theme: "industry", lat: 37.05, lng: 127.25, zoom: 9, label: "경기 남부에서 충청 북부로 이어지는 첨단 산업 벨트입니다." }
    },
    {
      id: "industry-04", topic: "industry", difficulty: "advanced",
      prompt: "제철·석유 화학 공업이 대규모 해안 공업 단지에 입지하는 공통 이유는?",
      options: ["제품이 모두 부패하기 쉬워서", "대량 원료의 수입과 운송에 항만이 유리해서", "고객과 매일 대면해야 해서", "겨울 적설량이 많아서", "지가가 전국에서 가장 높아서"],
      answer: 1,
      explanation: "두 공업은 부피와 무게가 큰 원료를 대량으로 들여옵니다. 대형 선박과 항만을 이용하면 운송 비용을 줄일 수 있어 임해 지역 입지가 유리합니다.",
      focus: { theme: "industry", lat: 35.35, lng: 128.95, zoom: 7, label: "동남해안의 항만 공업 지역을 확인하세요." }
    },
    {
      id: "industry-05", topic: "industry", difficulty: "basic",
      prompt: "대덕 연구개발특구가 위치한 도시는?",
      options: ["대전", "목포", "강릉", "포항", "제주"],
      answer: 0,
      explanation: "대덕 연구개발특구는 대전에 있으며 정부 출연 연구 기관, 대학, 첨단 기업이 모여 연구 개발 기능을 수행합니다.",
      focus: { theme: "industry", lat: 36.39, lng: 127.36, zoom: 11, label: "대전 북서부의 대덕 연구개발특구입니다." }
    },
    {
      id: "region-01", topic: "region", difficulty: "basic",
      prompt: "호남권의 지리적 특징으로 가장 적절한 것은?",
      options: ["태백산지의 고랭지 농업이 중심이다.", "호남평야와 나주평야 등 넓은 평야가 발달했다.", "우리나라 최대의 반도체 집적지가 있다.", "동해안의 석호가 권역 전역에 분포한다.", "수도권 통근 인구가 권역 인구의 대부분이다."],
      answer: 1,
      explanation: "호남권에는 만경강·동진강 유역의 호남평야, 영산강 유역의 나주평야 등 넓은 평야가 발달해 전통적으로 벼농사가 활발했습니다.",
      focus: { theme: "region", lat: 35.55, lng: 126.85, zoom: 8, label: "서해안과 큰 하천 하류의 넓은 평야를 보세요." }
    },
    {
      id: "region-02", topic: "region", difficulty: "advanced",
      prompt: "영남권의 도시·산업 구조에 대한 설명으로 옳은 것은?",
      options: ["부산·울산·창원으로 이어지는 동남 임해 공업 지역이 발달했다.", "중앙 행정 기관 이전이 권역 성장의 유일한 원인이다.", "대규모 평야 농업 외에는 제조업이 거의 없다.", "수도권보다 본사 기능이 더 집중되어 있다.", "동해안과 남해안에 항만이 거의 없다."],
      answer: 0,
      explanation: "영남권 남동부는 부산항과 울산·창원의 공업 단지를 중심으로 조선·자동차·기계·석유 화학 등이 발달한 대표적인 임해 공업 지역입니다.",
      focus: { theme: "region", lat: 35.35, lng: 128.85, zoom: 8, label: "부산·울산·창원이 이어지는 동남권을 확인하세요." }
    },
    {
      id: "region-03", topic: "region", difficulty: "advanced",
      prompt: "강원권의 영동과 영서를 구분하는 가장 중요한 자연 지리적 기준은?",
      options: ["금강", "태백산맥", "한강 하구", "소백산맥", "차령산맥"],
      answer: 1,
      explanation: "태백산맥을 기준으로 동쪽은 영동, 서쪽은 영서라고 합니다. 이 산맥은 기후·교통·하천 유역의 차이에도 큰 영향을 줍니다.",
      focus: { theme: "region", lat: 37.45, lng: 128.55, zoom: 8, label: "태백산맥이 영동과 영서를 가릅니다." }
    },
    {
      id: "region-04", topic: "region", difficulty: "basic",
      prompt: "제주권의 자연환경과 산업을 바르게 연결한 것은?",
      options: ["석회암 지형－시멘트 공업", "화산 지형－관광과 특용 작물", "넓은 갯벌－대규모 제철", "빙하 지형－고랭지 목축", "삼각주－반도체 공업"],
      answer: 1,
      explanation: "제주는 화산 지형과 온난한 기후를 활용한 관광업, 감귤을 비롯한 특용 작물 재배가 발달했습니다.",
      focus: { theme: "region", lat: 33.38, lng: 126.53, zoom: 9, label: "화산섬 제주도의 자연·산업 연결을 기억하세요." }
    },
    {
      id: "region-05", topic: "region", difficulty: "advanced",
      prompt: "충청권이 국토 교통의 결절지로 성장하는 데 유리한 이유는?",
      options: ["한반도 최북단에 위치해서", "수도권과 영·호남을 잇는 간선 교통망이 교차해서", "모든 지역이 해안에 접해서", "전국 최대 철광석 산지가 있어서", "국제 무역항만으로만 구성되어서"],
      answer: 1,
      explanation: "충청권은 국토의 중앙부에 가깝고 경부·호남축 등이 연결됩니다. 이 접근성은 행정, 연구, 물류와 산업 기능의 성장에 유리합니다.",
      focus: { theme: "region", lat: 36.42, lng: 127.25, zoom: 8, label: "수도권·영남·호남으로 이어지는 중앙 위치를 보세요." }
    },
    {
      id: "region-06", topic: "region", difficulty: "advanced",
      prompt: "다음 단서에 해당하는 도시는?<br><br><b>국제 무역항, 우리나라 제2의 대도시, 동남권의 중심, 해양 교통</b>",
      options: ["춘천", "부산", "전주", "청주", "원주"],
      answer: 1,
      explanation: "부산은 우리나라 최대 규모의 국제 무역항을 갖춘 제2의 대도시이며, 동남권의 중심 도시입니다.",
      focus: { theme: "region", lat: 35.18, lng: 129.08, zoom: 10, label: "한반도 남동단의 부산항입니다." }
    },
    {
      id: "terrain-06", topic: "terrain", difficulty: "advanced",
      prompt: "하천 중·상류의 감입 곡류 구간과 하류 평야 구간을 비교한 설명으로 옳은 것은?",
      options: ["상류는 하방 침식보다 퇴적이 우세하다.", "하류는 범람원과 자연 제방이 발달하기 쉽다.", "상류는 하천 경사가 더 완만하다.", "하류는 계곡이 깊고 좁다.", "상류와 하류의 지형 차이는 없다."],
      answer: 1,
      explanation: "하류는 경사가 완만하고 퇴적 작용이 활발해 범람원·자연 제방·배후 습지가 발달하기 쉽습니다. 중·상류는 침식이 활발하고 계곡이 깊습니다.",
      focus: { theme: "terrain", lat: 37.48, lng: 127.15, zoom: 8, label: "한강의 산지 구간과 하류 평야를 비교하세요." }
    },
    {
      id: "climate-06", topic: "climate", difficulty: "advanced",
      prompt: "두 지역 A와 B의 기후 특성이다. A가 B보다 해안에 가깝다고 추론할 수 있는 가장 강한 단서는?<br><br><b>A: 1월 -1℃, 8월 24℃ / B: 1월 -5℃, 8월 25℃</b>",
      options: ["A의 연교차가 더 작다.", "A의 8월 기온이 더 높다.", "B의 겨울 기온이 더 높다.", "두 지역의 위도가 반드시 다르다.", "B의 강수량이 반드시 더 많다."],
      answer: 0,
      explanation: "A의 연교차는 25℃, B는 30℃입니다. 바다의 완화 작용을 더 크게 받는 해안 지역은 일반적으로 겨울이 덜 춥고 연교차가 작습니다.",
      focus: { theme: "climate", lat: 36.70, lng: 129.00, zoom: 7, label: "해안과 내륙의 연교차 차이가 핵심 단서입니다." }
    },
    {
      id: "terrain-07", topic: "terrain", difficulty: "basic",
      prompt: "한반도 북부 지형의 특징으로 가장 적절한 것은?",
      options: ["서쪽보다 동쪽의 산지가 낮다.", "백두산 주변과 개마고원 일대의 해발 고도가 높다.", "압록강과 두만강은 모두 남해로 흐른다.", "평양은 태백산맥 동쪽에 있다.", "북부에는 큰 하천이 전혀 없다."],
      answer: 1,
      explanation: "한반도 북부는 백두산과 개마고원을 중심으로 높고 험준한 산지가 넓게 나타납니다. 낭림산맥은 관서와 관북을 구분하는 중요한 지형 축입니다.",
      focus: { theme: "terrain", lat: 41.35, lng: 128.05, zoom: 7, label: "백두산에서 개마고원으로 이어지는 높은 지형을 보세요." }
    },
    {
      id: "terrain-08", topic: "terrain", difficulty: "advanced",
      prompt: "한반도 북부의 하천을 위치와 함께 바르게 연결한 것은?",
      options: ["압록강－중국과의 서북쪽 국경", "두만강－남서해안의 하구", "대동강－동해로 유입", "청천강－제주도 남쪽", "낙동강－북한과 중국의 국경"],
      answer: 0,
      explanation: "압록강은 한반도 서북쪽에서 중국과의 국경을 이루며 황해로 흐릅니다. 두만강은 북동쪽 국경을 이루고, 대동강과 청천강은 서쪽으로 흐릅니다.",
      focus: { theme: "terrain", lat: 40.65, lng: 125.55, zoom: 7, label: "압록강과 두만강이 북쪽 국경을 이루는 모습을 비교하세요." }
    },
    {
      id: "terrain-09", topic: "terrain", difficulty: "advanced",
      prompt: "한강 수계의 연결 관계를 올바르게 설명한 것은?",
      options: ["북한강과 남한강이 양수리에서 합류해 한강 본류를 이룬다.", "임진강은 낙동강의 지류이다.", "남한강은 동해로 바로 흐른다.", "북한강은 제주도에서 발원한다.", "한강은 압록강의 지류이다."],
      answer: 0,
      explanation: "북한강과 남한강은 양수리 두물머리에서 만나 한강 본류를 이룹니다. 임진강은 북한에서 발원해 남서쪽으로 흐른 뒤 한강 하구 부근에서 합류합니다.",
      focus: { theme: "terrain", lat: 37.62, lng: 127.27, zoom: 9, label: "북한강·남한강의 합류와 임진강의 하구 연결을 확인하세요." }
    }
  ];

  window.KOREA_GEOGRAPHY = { themes, questions };
})();
