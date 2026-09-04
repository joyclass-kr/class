// 손으로 그린 지도 층 자료: 해류, 바람 띠, 나라별 종교·수능 단원, 기후 그래프용 도시.
// 좌표는 [위도, 경도]. 선의 순서가 곧 흐르는 방향이다.
(function () {
  "use strict";

  const currents = [
    { name: "쿠로시오 해류", kind: "warm", coords: [[14, 124], [22, 123.5], [30, 131], [35, 140], [40, 152]] },
    { name: "북태평양 해류", kind: "warm", coords: [[40, 156], [42, 175], [42, -165], [40, -140]] },
    { name: "캘리포니아 해류", kind: "cold", coords: [[42, -128], [35, -124], [28, -118], [22, -110]] },
    { name: "오야시오 해류", kind: "cold", coords: [[56, 162], [50, 156], [43, 147]] },
    { name: "페루(훔볼트) 해류", kind: "cold", coords: [[-45, -77], [-35, -74], [-25, -72], [-15, -78], [-5, -84]] },
    { name: "멕시코 만류", kind: "warm", coords: [[24, -85], [27, -80], [33, -77], [38, -70], [42, -56]] },
    { name: "북대서양 해류", kind: "warm", coords: [[43, -50], [49, -35], [55, -20], [61, -5], [69, 10]] },
    { name: "래브라도 해류", kind: "cold", coords: [[62, -60], [55, -56], [47, -51]] },
    { name: "카나리아 해류", kind: "cold", coords: [[41, -12], [33, -14], [25, -18], [16, -20]] },
    { name: "벵겔라 해류", kind: "cold", coords: [[-34, 17], [-27, 14], [-20, 12], [-12, 10]] },
    { name: "브라질 해류", kind: "warm", coords: [[-8, -33], [-18, -37], [-28, -46]] },
    { name: "아굴라스 해류", kind: "warm", coords: [[-24, 38], [-31, 32], [-36, 24]] },
    { name: "동오스트레일리아 해류", kind: "warm", coords: [[-18, 152], [-27, 155], [-36, 152]] },
    { name: "서오스트레일리아 해류", kind: "cold", coords: [[-35, 113], [-27, 111], [-20, 112]] },
    { name: "남극 순환 해류", kind: "cold", coords: [[-58, -170], [-58, -110], [-58, -50], [-58, 10], [-58, 70], [-58, 130], [-58, 178]] }
  ];

  // 바람 띠: 각 대양 위 경도 몇 곳에 화살표를 놓는다.
  const windLongitudes = [-160, -115, -35, 70, 152];
  const windBands = [
    { name: "북동 무역풍", from: [22, 7], to: [8, -5] },
    { name: "남동 무역풍", from: [-22, 7], to: [-8, -5] },
    { name: "편서풍(북)", from: [40, -7], to: [55, 6] },
    { name: "편서풍(남)", from: [-40, -7], to: [-55, 6] },
    { name: "극동풍(북)", from: [76, 5], to: [68, -5] }
  ];
  const winds = [];
  windLongitudes.forEach((lng) => windBands.forEach((band) => {
    winds.push({ name: band.name, coords: [[band.from[0], lng + band.from[1]], [band.to[0], lng + band.to[1]]] });
  }));

  const religionClasses = {
    christ: { label: "크리스트교", color: "#3d6fb4" },
    islam: { label: "이슬람교", color: "#2e8b57" },
    hindu: { label: "힌두교", color: "#d98a2b" },
    buddh: { label: "불교", color: "#b0532f" },
    jew: { label: "유대교", color: "#7b4fa6" },
    east: { label: "유교·도교·무종교(동아시아)", color: "#8a8f6a" },
    mixed: { label: "여러 종교 혼재", color: "#9a9a9a" }
  };
  const byReligion = {
    christ: "US CA MX GT BZ HN SV NI CR PA CU HT DO JM PR BS TT CO VE GY SR EC PE BR BO PY UY AR CL FK GL " +
      "NO SE FI DK IS GB IE FR DE NL BE LU CH AT PL CZ SK HU RO BG MD UA BY LT LV EE RU GE AM " +
      "ES PT IT GR HR SI RS ME MK CY " +
      "ZA LS SZ NA BW ZW ZM MW MZ AO CD CG GA GQ CM CF UG RW BI KE TZ ET SS GH TG BJ LR MG " +
      "AU NZ PG FJ SB VU NC PH TL",
    islam: "AL BA XK CY-N TR SY IQ IR SA YE OM AE QA KW JO PS LB AZ KZ KG UZ TJ TM AF PK BD MY BN ID " +
      "MA DZ TN LY EG SD EH MR ML NE TD SN GM GN GW SL SO SO-L DJ BF",
    hindu: "IN NP",
    buddh: "JP MN TH KH LA MM LK BT VN",
    jew: "IL",
    east: "CN TW KP",
    mixed: "KR NG CI ER"
  };
  const religionByIso = {};
  Object.entries(byReligion).forEach(([key, list]) => list.split(/\s+/).forEach((iso) => { if (iso) religionByIso[iso] = key; }));

  // 수능 세계지리 단원(지역) 구분
  const regionClasses = {
    monsoon: { label: "몬순 아시아", color: "#3f9a6d" },
    oceania: { label: "오세아니아", color: "#93618e" },
    dry: { label: "건조 아시아·북부 아프리카", color: "#d0a24a" },
    europe: { label: "유럽·북부 아메리카", color: "#4f78b8" },
    subsahara: { label: "사하라 이남 아프리카", color: "#c2703a" },
    latin: { label: "중·남부 아메리카", color: "#4fa0a8" }
  };
  const byRegion = {
    monsoon: "KR KP JP CN TW IN BD NP BT LK PK MM TH LA KH VN MY BN ID PH TL",
    oceania: "AU NZ PG FJ SB VU NC",
    dry: "TR SY IQ IR SA YE OM AE QA KW JO IL PS LB AZ AM GE CY CY-N KZ UZ TM KG TJ AF MN MA DZ TN LY EG SD EH MR",
    europe: "US CA GL NO SE FI DK IS GB IE FR DE NL BE LU CH AT PL CZ SK HU RO BG MD UA BY LT LV EE RU ES PT IT GR HR SI RS ME MK AL BA XK",
    subsahara: "ML NE TD SN GM GN GW SL LR CI GH TG BJ BF NG CM CF GQ GA CG CD SS ET ER DJ SO SO-L KE UG RW BI TZ AO ZM MW MZ ZW BW NA ZA LS SZ MG",
    latin: "MX GT BZ HN SV NI CR PA CU HT DO JM PR BS TT CO VE GY SR EC PE BR BO PY UY AR CL FK"
  };
  const regionByIso = {};
  Object.entries(byRegion).forEach(([key, list]) => list.split(/\s+/).forEach((iso) => { if (iso) regionByIso[iso] = key; }));

  // 쾨펜 기후 구분 격자의 글자 → 이름·색
  const koppenClasses = {
    A: { label: "열대 우림(Af)", color: "#1b7f3b" },
    B: { label: "열대 몬순(Am)", color: "#3fa34d" },
    C: { label: "사바나(Aw)", color: "#8fc46a" },
    D: { label: "사막(BW)", color: "#e0a83a" },
    E: { label: "스텝(BS)", color: "#efd28a" },
    F: { label: "지중해성(Cs)", color: "#e9e35a" },
    G: { label: "온난 습윤(Cfa)", color: "#8fbf5f" },
    H: { label: "서안 해양성(Cfb)", color: "#5fb9a3" },
    I: { label: "온대 겨울 건조(Cw)", color: "#b7d867" },
    J: { label: "냉대 습윤(Df)", color: "#6c8fd6" },
    K: { label: "냉대 겨울 건조(Dw)", color: "#9b7fd0" },
    L: { label: "툰드라(ET)", color: "#a9c4d6" },
    M: { label: "빙설(EF)", color: "#e6ecf2" }
  };

  // 인구 밀도(명/km²) 눈금
  const densityClasses = [
    { min: 300, label: "300 이상", color: "#5d1a3c" },
    { min: 100, label: "100~300", color: "#a13a6a" },
    { min: 25, label: "25~100", color: "#d68aa9" },
    { min: 5, label: "5~25", color: "#f0cad8" },
    { min: 0, label: "5 미만", color: "#f8eef2" }
  ];

  // 기후 그래프용 도시: 월평균 기온(°C)과 월 강수량(mm), 대략값
  const stations = {
    singapore: { name: "싱가포르", climate: "열대 우림 기후(Af)", lat: 1.35, lng: 103.8, temp: [26.5, 27, 27.5, 28, 28.3, 28.3, 27.9, 27.9, 27.6, 27.6, 27, 26.4], rain: [240, 160, 185, 180, 170, 130, 150, 170, 165, 190, 255, 290] },
    mumbai: { name: "뭄바이", climate: "열대 몬순 기후(Am)", lat: 19.1, lng: 72.9, temp: [24, 25, 27, 28, 30, 29, 27, 27, 27, 28, 27, 25], rain: [1, 1, 0, 1, 15, 520, 710, 440, 290, 80, 15, 3] },
    darwin: { name: "다윈", climate: "사바나 기후(Aw)", lat: -12.5, lng: 130.8, temp: [28, 28, 28, 28, 27, 25, 25, 26, 28, 29, 29, 29], rain: [425, 370, 320, 100, 20, 2, 1, 5, 15, 70, 140, 250] },
    cairo: { name: "카이로", climate: "사막 기후(BW)", lat: 30, lng: 31.2, temp: [14, 15, 18, 22, 26, 28, 29, 29, 27, 24, 20, 15], rain: [5, 4, 4, 1, 0, 0, 0, 0, 0, 1, 4, 6] },
    lima: { name: "리마", climate: "한류 연안의 사막 기후(BW)", lat: -12, lng: -77, temp: [22, 23, 23, 21, 19, 17, 16, 16, 16, 17, 19, 21], rain: [1, 1, 1, 0, 1, 2, 3, 3, 2, 1, 1, 0] },
    rome: { name: "로마", climate: "지중해성 기후(Cs)", lat: 41.9, lng: 12.5, temp: [8, 9, 11, 14, 18, 22, 25, 25, 22, 17, 12, 9], rain: [80, 70, 65, 55, 40, 25, 15, 30, 70, 110, 120, 95] },
    london: { name: "런던", climate: "서안 해양성 기후(Cfb)", lat: 51.5, lng: -0.1, temp: [5, 5, 7, 9, 12, 15, 18, 17, 15, 11, 8, 5], rain: [55, 40, 40, 45, 50, 45, 45, 50, 50, 60, 60, 55] },
    seoul: { name: "서울", climate: "온대 겨울 건조 기후(Cw)·냉대 경계", lat: 37.6, lng: 127, temp: [-2.4, 0.4, 5.7, 12.5, 17.8, 22.2, 24.9, 25.7, 21.2, 14.8, 7.2, 0.4], rain: [20, 25, 47, 65, 105, 133, 395, 364, 169, 52, 53, 22] },
    moscow: { name: "모스크바", climate: "냉대 습윤 기후(Df)", lat: 55.8, lng: 37.6, temp: [-7, -6, -1, 7, 13, 17, 19, 17, 11, 5, -1, -5], rain: [45, 35, 35, 40, 50, 75, 85, 80, 65, 60, 55, 50] },
    yakutsk: { name: "야쿠츠크", climate: "냉대 기후(Df, 몹시 추운 겨울)", lat: 62, lng: 129.7, temp: [-39, -33, -20, -5, 8, 16, 19, 15, 6, -8, -27, -37], rain: [10, 8, 7, 10, 17, 35, 40, 38, 27, 20, 17, 13] },
    utqiagvik: { name: "우트키아그비크(배로)", climate: "툰드라 기후(ET)", lat: 71.3, lng: -156.8, temp: [-25, -26, -25, -17, -6, 2, 5, 4, 0, -9, -18, -23], rain: [5, 4, 4, 4, 4, 8, 22, 25, 17, 13, 7, 5] },
    quito: { name: "키토", climate: "고산 기후(연중 서늘)", lat: -0.2, lng: -78.5, temp: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14], rain: [100, 120, 150, 175, 120, 45, 25, 30, 75, 120, 110, 95] }
  };

  window.WORLD_LAYER_DATA = { currents, winds, religionClasses, religionByIso, regionClasses, regionByIso, koppenClasses, densityClasses, stations };
})();
