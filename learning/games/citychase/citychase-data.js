(function (root, factory) {
  "use strict";
  const data = factory();
  if (typeof module === "object" && module.exports) module.exports = data;
  else root.CityChaseData = data;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const WIDTH = 1000;
  const HEIGHT = 640;
  const nodes = {};
  const edges = [];

  function addNode(id, x, y, options = {}) {
    nodes[id] = { id, x, y, label: options.label || "거리", ...options };
    return nodes[id];
  }

  function addEdge(a, b, options = {}) {
    edges.push({ a, b, teams: options.teams || null, oneWay: !!options.oneWay, kind: options.kind || "road" });
  }

  function addRoute(ids, options = {}) {
    for (let index = 0; index < ids.length - 1; index += 1) addEdge(ids[index], ids[index + 1], options);
  }

  const perimeter = [
    [110, 60], [200, 60], [290, 60], [380, 60], [470, 60], [560, 60], [650, 60], [740, 60], [830, 60], [920, 60],
    [940, 140], [940, 220], [940, 300], [940, 380], [940, 460], [940, 540],
    [850, 580], [760, 580], [670, 580], [580, 580], [490, 580], [400, 580], [310, 580], [220, 580], [130, 580],
    [60, 520], [60, 430], [60, 340], [60, 250], [60, 160]
  ];
  perimeter.forEach(([x, y], index) => addNode(`p${index}`, x, y));
  addRoute(perimeter.map((_, index) => `p${index}`));
  addEdge("p29", "p0");

  const upper = [[150, 205], [260, 205], [370, 205], [630, 205], [740, 205], [850, 205]];
  upper.forEach(([x, y], index) => addNode(`u${index}`, x, y));
  addRoute(["p29", "u0", "u1", "u2", "r3", "u3", "u4", "u5", "p10"]);

  const middle = [[150, 320], [250, 320], [350, 320], [450, 320], [550, 320], [650, 320], [750, 320], [850, 320]];
  middle.forEach(([x, y], index) => addNode(`m${index}`, x, y));
  addRoute(["p27", "m0", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "p12"]);

  const lower = [[160, 450], [280, 450], [400, 450], [600, 450], [720, 450], [840, 450]];
  lower.forEach(([x, y], index) => addNode(`l${index}`, x, y));
  addRoute(["p25", "l0", "l1", "l2", "r2", "l3", "l4", "l5", "p14"]);

  addNode("r4", 500, 100, { label: "4번 역", effect: "train", effectTarget: "r1", station: 4 });
  addNode("r3", 500, 235, { label: "3번 역", effect: "train", effectTarget: "r2", station: 3 });
  addNode("r2", 500, 405, { label: "2번 역", effect: "train", effectTarget: "r3", station: 2 });
  addNode("r1", 500, 540, { label: "1번 역", effect: "train", effectTarget: "r4", station: 1 });
  addRoute(["r4", "r3", "m3", "m4", "r2", "r1"], { kind: "rail" });
  addEdge("r4", "p4", { kind: "rail" });
  addEdge("r4", "p5", { kind: "rail" });
  addEdge("r1", "p19", { kind: "rail" });
  addEdge("r1", "p20", { kind: "rail" });

  addNode("hideout", 55, 65, { label: "도둑팀 비밀기지", safe: true, start: "thief", effect: "hideout" });
  addNode("jail", 945, 565, { label: "경찰팀 구금 구역", safe: true, start: "police", effect: "jail" });
  addEdge("hideout", "p0", { teams: ["thief"] });
  addEdge("jail", "p15");

  const buildings = [
    { id: "market", name: "별밤 마트", icon: "▦", x: 245, y: 135, doorNode: "d1", color: "#f4b942", blurb: "밤에도 환한 동네 마트" },
    { id: "air", name: "구름 항공", icon: "✦", x: 200, y: 315, doorNode: "d2", color: "#58a6d8", blurb: "도시를 잇는 작은 터미널" },
    { id: "burger", name: "왕관 버거", icon: "≋", x: 385, y: 315, doorNode: "d3", color: "#ef765d", blurb: "왕관 모양 간판의 식당" },
    { id: "electro", name: "번개 전자", icon: "ϟ", x: 730, y: 115, doorNode: "d4", color: "#7b6fd0", blurb: "빛나는 전자 상가" },
    { id: "pizza", name: "달빛 피자", icon: "◒", x: 832, y: 323, doorNode: "d5", color: "#f08b4d", blurb: "둥근 화덕 피자 가게" },
    { id: "snack", name: "골목 분식", icon: "♨", x: 355, y: 510, doorNode: "d6", color: "#e85c79", blurb: "김이 모락모락 나는 분식집" },
    { id: "cafe", name: "초록 카페", icon: "♣", x: 730, y: 518, doorNode: "d7", color: "#55a96f", blurb: "공원 옆 조용한 카페" }
  ];

  const doors = [
    ["d1", 245, 185, "u1"], ["d2", 200, 360, "m1"], ["d3", 385, 360, "m2"],
    ["d4", 730, 170, "c5"], ["d5", 832, 365, "m7"], ["d6", 355, 465, "l2"], ["d7", 730, 465, "l4"]
  ];
  doors.forEach(([id, x, y, link], index) => {
    addNode(id, x, y, { label: `${buildings[index].name} 수색`, building: buildings[index].id, safe: true, kind: "building" });
    addEdge(id, link, { teams: ["thief"] });
  });

  // 전체판 사진 기준 우상단의 큰 원형 일방통행 구역.
  const circle = [[715, 90], [810, 60], [900, 105], [920, 190], [835, 250], [735, 225]];
  circle.forEach(([x, y], index) => addNode(`c${index}`, x, y, { label: "원형 일방통행" }));
  addRoute(["c0", "c1", "c2", "c3", "c4", "c5", "c0"], { oneWay: true, kind: "roundabout" });
  addEdge("p7", "c0");
  addEdge("c3", "p11");
  addEdge("c5", "u4");

  // 서로 마주보는 두 전용 차선. 빨강은 도둑, 파랑은 경찰만 화살표 방향으로 쓸 수 있다.
  addNode("tLane1", 380, 260, { label: "도둑 전용로", lane: "thief" });
  addNode("tLane2", 380, 375, { label: "도둑 전용로", lane: "thief" });
  addRoute(["u2", "tLane1", "m2", "tLane2", "l2"], { teams: ["thief"], oneWay: true, kind: "thief-lane" });
  addNode("pLane1", 620, 375, { label: "경찰 전용로", lane: "police" });
  addNode("pLane2", 620, 260, { label: "경찰 전용로", lane: "police" });
  addRoute(["l3", "pLane1", "m5", "pLane2", "u3"], { teams: ["police"], oneWay: true, kind: "police-lane" });

  // 원작처럼 한 번의 이동에서 촘촘하게 칸을 세도록 일반 도로를 모두 두 칸으로 나눈다.
  // 수색 장소·비밀기지·구금 구역은 규칙상 한 번에 드나들어야 하므로 그대로 둔다.
  const originalEdges = edges.splice(0, edges.length);
  let denseIndex = 0;
  for (const edge of originalEdges) {
    const fixedEndpoint = [edge.a, edge.b].some(id => id === "hideout" || id === "jail" || id.startsWith("d"));
    if (edge.kind === "rail" || fixedEndpoint) {
      edges.push(edge);
      continue;
    }
    const from = nodes[edge.a];
    const to = nodes[edge.b];
    const midpoint = `x${denseIndex++}`;
    addNode(midpoint, Math.round((from.x + to.x) / 2), Math.round((from.y + to.y) / 2), {
      label: edge.kind === "roundabout" ? "원형 일방통행" : "거리",
      dense: true
    });
    addEdge(edge.a, midpoint, edge);
    addEdge(midpoint, edge.b, edge);
  }

  Object.assign(nodes.p3, { label: "도둑 위치 이동", effect: "thiefTeleport", tone: "red" });
  Object.assign(nodes.p8, { label: "도둑 위치 이동", effect: "thiefTeleport", tone: "red" });
  Object.assign(nodes.p14, { label: "도둑 위치 이동", effect: "thiefTeleport", tone: "red" });
  Object.assign(nodes.p22, { label: "도둑 위치 이동", effect: "thiefTeleport", tone: "red" });
  Object.assign(nodes.m1, { label: "경찰 위치 이동", effect: "policeTeleport", tone: "blue" });
  Object.assign(nodes.m6, { label: "경찰 위치 이동", effect: "policeTeleport", tone: "blue" });
  Object.assign(nodes.p11, { label: "무조건 멈춤", effect: "stop", tone: "white" });
  Object.assign(nodes.p12, { label: "버스 · 4칸 전진", effect: "jump", effectTarget: "p16", tone: "white" });
  Object.assign(nodes.p18, { label: "2칸 뒤로", effect: "jump", effectTarget: "p20", tone: "white" });
  Object.assign(nodes.p23, { label: "밥을 먹고 힘이 났다 · 3칸 전진", effect: "jump", effectTarget: "p26", tone: "white" });
  Object.assign(nodes.p26, { label: "잊은 물건", effect: "reset", tone: "white" });
  Object.assign(nodes.u1, { label: "정보 누설", effect: "reveal", tone: "pink" });
  Object.assign(nodes.u4, { label: "비밀 통로", effect: "jump", effectTarget: "d4", tone: "pink" });
  Object.assign(nodes.m3, { label: "보석을 동료에게 전달", effect: "transfer", tone: "pink" });
  Object.assign(nodes.l1, { label: "화장실이 급하다", effect: "reset", tone: "white" });
  Object.assign(nodes.l3, { label: "보석을 떨어뜨렸다", effect: "dropGem", tone: "pink" });
  Object.assign(nodes.l5, { label: "비타민 · 5칸 전진", effect: "jump", effectTarget: "p10", tone: "white" });
  Object.assign(nodes.c1, { label: "도둑 위치 이동", effect: "thiefTeleport", tone: "red" });
  Object.assign(nodes.c4, { label: "보석을 동료에게 전달", effect: "transfer", tone: "pink" });

  ["p1", "p6", "p9", "p13", "p16", "p21", "p24", "p29", "u2", "u5", "m0", "m4", "m7", "l0", "l2", "l4", "c2", "c5"].forEach(id => {
    nodes[id].trickSlot = true;
  });
  ["p2", "p7", "p10", "p15", "p17", "p20", "p25", "p28", "u0", "u3", "m2", "m5", "l1", "l3", "l5", "c0", "c3"].forEach(id => {
    nodes[id].inspectionSlot = true;
  });

  function neighbors(nodeId, team) {
    const result = [];
    for (const edge of edges) {
      if (edge.teams && !edge.teams.includes(team)) continue;
      if (edge.a === nodeId) result.push({ id: edge.b, edge });
      if (!edge.oneWay && edge.b === nodeId) result.push({ id: edge.a, edge });
    }
    return result;
  }

  const publicNodes = Object.freeze(Object.fromEntries(Object.entries(nodes).map(([id, node]) => [id, Object.freeze({ ...node })])));
  const publicEdges = Object.freeze(edges.map(edge => Object.freeze({ ...edge, teams: edge.teams ? Object.freeze([...edge.teams]) : null })));
  const publicBuildings = Object.freeze(buildings.map(building => Object.freeze({ ...building })));

  return Object.freeze({
    WIDTH,
    HEIGHT,
    NODES: publicNodes,
    EDGES: publicEdges,
    BUILDINGS: publicBuildings,
    neighbors
  });
});
