(function () {
  "use strict";

  const dataset = window.KOREA_GEOGRAPHY || {};
  const themes = dataset.themes || {};
  const questions = Array.isArray(dataset.questions) ? dataset.questions : [];
  const THEME_ORDER = ["terrain", "climate", "population", "industry", "region"];
  const KOREA_BOUNDS = L.latLngBounds([[32.95, 123.85], [43.15, 131.35]]);
  const REGIONAL_RELIEF_BOUNDS = L.latLngBounds([[8.407168, 90], [60.239811, 171.5625]]);
  const DETAIL_RELIEF_BOUNDS = L.latLngBounds([[32.546813, 123.75], [43.580391, 131.484375]]);
  const BASEMAP_KEY = "cb1_2lqh_1_23aa6103cd67c20c2791ad29";
  const PROGRESS_KEY = "joyclass-korea-geography-progress-v1";
  const provinceLabels = [
    ["평북", 40.12, 125.18], ["평남", 39.43, 126.02], ["황북", 38.62, 126.23], ["황남", 38.38, 125.52],
    ["자강", 40.92, 126.45], ["양강", 41.45, 128.05], ["함북", 41.75, 129.45], ["함남", 40.28, 127.75],
    ["평양", 39.03, 125.75], ["신의주", 40.10, 124.40], ["원산", 39.15, 127.45], ["함흥", 39.91, 127.54], ["청진", 41.79, 129.78],
    ["서울", 37.57, 126.98], ["인천", 37.46, 126.70], ["경기", 37.35, 127.20], ["강원", 37.65, 128.25],
    ["충북", 36.75, 127.75], ["충남", 36.48, 126.82], ["대전", 36.35, 127.38], ["세종", 36.48, 127.29],
    ["전북", 35.75, 127.12], ["전남", 34.88, 126.82], ["광주", 35.16, 126.85], ["경북", 36.36, 128.72],
    ["경남", 35.25, 128.25], ["대구", 35.87, 128.60], ["울산", 35.54, 129.31], ["부산", 35.18, 129.08],
    ["제주", 33.38, 126.53]
  ];

  const RIVER_MOUTHS = {
    "한강": [37.65, 126.42],
    "남한강": [37.54, 127.31],
    "낙동강": [35.10, 128.96],
    "금강": [36.01, 126.76],
    "영산강": [34.77, 126.34],
    "섬진강": [34.94, 127.77],
    "압록강": [39.83, 124.18],
    "두만강": [42.43, 130.60],
    "대동강": [38.71, 125.22],
    "청천강": [39.67, 125.55],
    "북한강": [37.53, 127.31],
    "임진강": [37.76, 126.70]
  };

  let currentTheme = "terrain";
  let provinceFeatures = [];
  let majorRivers = null;
  let sessionQuestions = [];
  let sessionAnswers = [];
  let questionIndex = 0;
  let questionAnswered = false;
  let hintShown = false;
  let mainMap;
  let questionMap;
  let mainBoundaryLayer;
  let mainThemeLayer;
  let mainLabelLayer;
  let questionBoundaryLayer;
  let questionThemeLayer;
  let questionFocusLayer;
  const reliefZoomSync = new WeakMap();
  const annotationZoomSync = new WeakMap();

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initMaps();
    bindControls();
    updatePracticeAvailability();
    renderTheme(currentTheme);
    renderProgress();
    loadProvinceBoundaries();
    loadMajorRivers();
  }

  function createBaseMap(elementId, options) {
    const map = L.map(elementId, {
      center: [38.05, 127.65],
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
      zoomControl: true,
      attributionControl: true,
      preferCanvas: true,
      ...options
    });
    L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png?key=${BASEMAP_KEY}`, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a> · Elevation: <a href="https://registry.opendata.aws/terrain-tiles/">AWS Open Data Terrain Tiles</a>',
      subdomains: "abcd",
      maxZoom: 20
    }).addTo(map);
    return map;
  }

  function initMaps() {
    mainMap = createBaseMap("map", { zoomControl: true });
    mainMap.createPane("terrainPane");
    mainMap.getPane("terrainPane").style.zIndex = "210";
    mainMap.getPane("terrainPane").style.pointerEvents = "none";
    mainMap.createPane("reliefPane");
    mainMap.getPane("reliefPane").style.zIndex = "220";
    mainMap.getPane("reliefPane").style.pointerEvents = "none";
    mainMap.createPane("themeZones");
    mainMap.getPane("themeZones").style.zIndex = "420";
    mainMap.createPane("themeLines");
    mainMap.getPane("themeLines").style.zIndex = "450";
    mainMap.createPane("themeLabels");
    mainMap.getPane("themeLabels").style.zIndex = "580";
    mainMap.getPane("themeLabels").style.pointerEvents = "none";
    mainMap.createPane("studyMarkers");
    mainMap.getPane("studyMarkers").style.zIndex = "610";
    mainMap.createPane("adminLabels");
    mainMap.getPane("adminLabels").style.zIndex = "640";
    mainMap.getPane("adminLabels").style.pointerEvents = "none";
    mainBoundaryLayer = L.layerGroup().addTo(mainMap);
    mainThemeLayer = L.layerGroup().addTo(mainMap);
    mainLabelLayer = L.layerGroup().addTo(mainMap);
    renderProvinceLabels();
    fitKorea(mainMap);

    questionMap = createBaseMap("questionMap", { zoomControl: false, attributionControl: false, dragging: true });
    questionMap.createPane("terrainPane");
    questionMap.getPane("terrainPane").style.zIndex = "210";
    questionMap.getPane("terrainPane").style.pointerEvents = "none";
    questionMap.createPane("reliefPane");
    questionMap.getPane("reliefPane").style.zIndex = "220";
    questionMap.getPane("reliefPane").style.pointerEvents = "none";
    questionMap.createPane("themeZones");
    questionMap.getPane("themeZones").style.zIndex = "420";
    questionMap.createPane("themeLines");
    questionMap.getPane("themeLines").style.zIndex = "450";
    questionMap.createPane("themeLabels");
    questionMap.getPane("themeLabels").style.zIndex = "580";
    questionMap.getPane("themeLabels").style.pointerEvents = "none";
    questionMap.createPane("studyMarkers");
    questionMap.getPane("studyMarkers").style.zIndex = "610";
    questionBoundaryLayer = L.layerGroup().addTo(questionMap);
    questionThemeLayer = L.layerGroup().addTo(questionMap);
    questionFocusLayer = L.layerGroup().addTo(questionMap);
    fitKorea(questionMap);
    mainMap.on("zoomend", () => drawBoundaries(mainMap, mainBoundaryLayer, true));
    questionMap.on("zoomend", () => drawBoundaries(questionMap, questionBoundaryLayer, false));
  }

  function fitKorea(map) {
    map.fitBounds(KOREA_BOUNDS, { padding: [18, 18], animate: false });
  }

  function bindControls() {
    $$(".theme-tab").forEach((button) => {
      button.addEventListener("click", () => renderTheme(button.dataset.theme));
    });
    $("#resetMap").addEventListener("click", () => fitKorea(mainMap));
    $("#startPractice").addEventListener("click", startPractice);
    ["#practiceTopic", "#practiceDifficulty", "#practiceCount"].forEach((selector) => {
      $(selector).addEventListener("change", updatePracticeAvailability);
    });
    $("#showHint").addEventListener("click", showQuestionHint);
    $("#nextQuestion").addEventListener("click", nextQuestion);
    $("#finishPractice").addEventListener("click", finishPractice);
    $("#reviewWrong").addEventListener("click", reviewWrongQuestions);
    $("#progressButton").addEventListener("click", () => {
      const progress = readProgress();
      const message = progress.total
        ? `누적 ${progress.total}문제 중 ${progress.correct}문제를 맞혔어요. (${Math.round(progress.correct / progress.total * 100)}%)`
        : "아직 푼 문제가 없어요. 원하는 범위와 문항 수를 골라 시작해 보세요.";
      $("#conceptSummary").textContent = message;
      $("#conceptTitle").textContent = "나의 학습 기록";
      $("#conceptKicker").textContent = "누적 진도";
      $("#conceptPoints").replaceChildren();
      const point = document.createElement("div");
      point.className = "concept-point";
      point.textContent = progress.lastScore == null
        ? "첫 세트를 풀면 최근 점수가 기록됩니다."
        : progress.lastTotal == null
          ? "최근 세트: " + progress.lastScore + "문제 정답"
          : "최근 세트: " + progress.lastTotal + "문제 중 " + progress.lastScore + "문제 정답";
      $("#conceptPoints").append(point);
    });
    $("#practiceDialog").addEventListener("close", () => {
      questionFocusLayer.clearLayers();
      questionAnswered = false;
    });
  }

  async function loadProvinceBoundaries() {
    try {
      const response = await fetch("../korean-museum/data/skorea-provinces-topo-simple.json?v=20260730-1");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      provinceFeatures = topologyToFeatures(await response.json());
      drawBoundaries(mainMap, mainBoundaryLayer, true);
      drawBoundaries(questionMap, questionBoundaryLayer, false);
    } catch (error) {
      console.warn("시도 경계를 불러오지 못했습니다.", error);
    }
  }

  async function loadMajorRivers() {
    try {
      const response = await fetch("data/major-rivers.geojson?v=20260901-3");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      majorRivers = await response.json();
      if (currentTheme === "terrain") renderTheme("terrain");
    } catch (error) {
      console.warn("주요 하천 선형을 불러오지 못했습니다.", error);
    }
  }

  function drawBoundaries(map, group, interactive) {
    group.clearLayers();
    if (map.getZoom() > 8 || !provinceFeatures.length) return;
    L.geoJSON({ type: "FeatureCollection", features: provinceFeatures }, {
      interactive,
      pane: "overlayPane",
      style: {
        color: "#527681",
        weight: interactive ? 1.25 : 1.1,
        opacity: 0.78,
        fillColor: "#fff8db",
        fillOpacity: 0.08,
        lineJoin: "round"
      },
      onEachFeature(feature, layer) {
        if (!interactive) return;
        const name = normalizeProvinceName(feature.properties && feature.properties.name);
        layer.bindTooltip(name, { sticky: true, className: "province-tooltip" });
        layer.on("click", () => {
          const regionFeature = (themes.region.features || []).find((item) => regionMatches(name, item.name));
          if (regionFeature) focusFeature(regionFeature);
        });
      }
    }).addTo(group);
  }

  function normalizeProvinceName(name) {
    return String(name || "").replace("강원도", "강원특별자치도").replace("전라북도", "전북특별자치도");
  }

  function regionMatches(provinceName, regionName) {
    const regionMap = {
      "수도권": ["서울", "인천", "경기"],
      "강원권": ["강원"],
      "충청권": ["충청", "대전", "세종"],
      "호남권": ["전북", "전라남", "광주"],
      "영남권": ["경상", "대구", "부산", "울산"],
      "제주권": ["제주"]
    };
    return (regionMap[regionName] || []).some((token) => provinceName.includes(token));
  }

  function topologyToFeatures(topology) {
    if (!topology || topology.type !== "Topology" || !Array.isArray(topology.arcs)) return [];
    const object = Object.values(topology.objects || {})[0];
    if (!object || object.type !== "GeometryCollection") return [];
    const transform = topology.transform || { scale: [1, 1], translate: [0, 0] };
    const arcs = topology.arcs.map((arc) => {
      let x = 0;
      let y = 0;
      return arc.map((point) => {
        x += point[0];
        y += point[1];
        return [(x * transform.scale[0]) + transform.translate[0], (y * transform.scale[1]) + transform.translate[1]];
      });
    });
    const join = (indexes) => {
      const coordinates = [];
      indexes.forEach((arcIndex, index) => {
        const arc = arcIndex >= 0 ? arcs[arcIndex] : arcs[~arcIndex].slice().reverse();
        coordinates.push(...(index === 0 ? arc : arc.slice(1)));
      });
      return coordinates;
    };
    return object.geometries
      .filter((item) => item.type === "Polygon" || item.type === "MultiPolygon")
      .map((item) => ({
        type: "Feature",
        properties: item.properties || {},
        geometry: {
          type: item.type,
          coordinates: item.type === "Polygon" ? item.arcs.map(join) : item.arcs.map((polygon) => polygon.map(join))
        }
      }));
  }

  function renderProvinceLabels() {
    mainLabelLayer.clearLayers();
    provinceLabels.forEach(([name, lat, lng]) => {
      const icon = L.divIcon({
        className: "admin-label-wrapper",
        html: `<span class="admin-label">${name}</span>`,
        iconSize: [0, 0]
      });
      L.marker([lat, lng], { icon, interactive: false, pane: "adminLabels" }).addTo(mainLabelLayer);
    });
  }

  function renderTheme(themeKey) {
    if (!themes[themeKey]) return;
    currentTheme = themeKey;
    const theme = themes[themeKey];
    $$(".theme-tab").forEach((button) => {
      const active = button.dataset.theme === themeKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $("#conceptKicker").textContent = theme.kicker;
    $("#conceptTitle").textContent = theme.title;
    $("#conceptSummary").textContent = theme.summary;
    $("#conceptPoints").replaceChildren(...theme.points.map((text) => element("div", "concept-point", text)));
    renderFeatureButtons(theme.features || []);
    renderPrinciples(theme.principles || []);
    renderLegend(theme.legend || []);
    drawThemeOnMap(mainMap, mainThemeLayer, theme, true);
  }

  function renderFeatureButtons(features) {
    const fragment = document.createDocumentFragment();
    features.forEach((feature) => {
      const button = document.createElement("button");
      button.className = "feature-button";
      button.type = "button";
      button.innerHTML = `<span class="feature-symbol" style="--feature-color:${feature.color}" aria-hidden="true">${feature.icon}</span><span>${feature.name}</span>`;
      button.addEventListener("click", () => focusFeature(feature));
      fragment.append(button);
    });
    $("#featureList").replaceChildren(fragment);
  }

  function renderPrinciples(items) {
    const guide = $("#principleGuide");
    const list = $("#principleList");
    guide.hidden = !items.length;
    guide.open = false;
    $("#principleCount").textContent = `${items.length}개`;
    const fragment = document.createDocumentFragment();
    items.forEach((principle) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "principle-button";
      button.textContent = principle.title;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => showPrinciple(principle, button));
      fragment.append(button);
    });
    list.replaceChildren(fragment);
  }

  function showPrinciple(principle, activeButton) {
    $$("#principleList .principle-button").forEach((button) => {
      const active = button === activeButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $("#conceptKicker").textContent = "핵심 원리";
    $("#conceptTitle").textContent = principle.title;
    $("#conceptSummary").textContent = principle.explanation;
    $("#conceptPoints").replaceChildren(...(principle.steps || []).map((text) => element("div", "concept-point", text)));
    if (principle.focus) {
      mainMap.flyTo([principle.focus.lat, principle.focus.lng], principle.focus.zoom || 8, { duration: 0.45 });
      const marker = L.circleMarker([principle.focus.lat, principle.focus.lng], {
        pane: "studyMarkers", radius: 9, color: "#ffffff", weight: 3,
        fillColor: "#f5aa25", fillOpacity: 1, interactive: false
      }).addTo(mainThemeLayer);
      marker.bindTooltip(principle.focus.label, { permanent: true, direction: "top", offset: [0, -10], className: "study-tooltip" }).openTooltip();
      setTimeout(() => mainThemeLayer.removeLayer(marker), 4200);
    }
  }
  function renderLegend(items) {
    const nodes = items.map((item) => {
      const node = document.createElement("span");
      node.className = "key-item";
      node.innerHTML = `<span class="key-swatch" style="--swatch:${item.color}" aria-hidden="true"></span>${item.label}`;
      return node;
    });
    $("#mapKey").replaceChildren(...nodes);
  }

  function riverCoordinateLines(geometry) {
    if (!geometry) return [];
    if (geometry.type === "LineString") return [geometry.coordinates];
    if (geometry.type === "MultiLineString") return geometry.coordinates;
    return [];
  }

  function riverWidthAt(name, coordinate, maxDistance) {
    const mouth = RIVER_MOUTHS[name];
    if (!mouth) return 2;
    const distanceFromMouth = L.latLng(coordinate[1], coordinate[0]).distanceTo(L.latLng(mouth[0], mouth[1]));
    const downstreamRatio = 1 - Math.min(1, distanceFromMouth / Math.max(1, maxDistance));
    // 한강 선형은 두물머리 합류점부터 시작하므로 지류의 상류 폭으로 초기화하지 않는다.
    const minWidth = name === "한강" ? 3.6 : name === "남한강" ? 0.75 : name === "북한강" ? 0.85 : 1.15;
    const maxWidth = name === "한강" ? 5.2 : ["낙동강", "압록강", "두만강"].includes(name) ? 4.8 : ["남한강", "북한강"].includes(name) ? 2.8 : 4.2;
    return minWidth + ((maxWidth - minWidth) * Math.pow(downstreamRatio, 0.78));
  }

  function drawMajorRivers(group, interactive) {
    majorRivers.features.forEach((feature) => {
      const name = feature.properties && feature.properties.name;
      const system = feature.properties && feature.properties.system;
      const mouth = RIVER_MOUTHS[name];
      const lines = riverCoordinateLines(feature.geometry).filter((line) => Array.isArray(line) && line.length >= 2);
      if (!mouth || !lines.length) return;
      const mouthPoint = L.latLng(mouth[0], mouth[1]);
      const distances = lines.flatMap((line) => line.map((coordinate) => L.latLng(coordinate[1], coordinate[0]).distanceTo(mouthPoint)));
      const maxDistance = Math.max(1, ...distances);

      lines.forEach((line) => {
        for (let start = 0; start < line.length - 1; start += 8) {
          const coordinates = line.slice(start, Math.min(line.length, start + 9));
          if (coordinates.length < 2) continue;
          const midpoint = coordinates[Math.floor(coordinates.length / 2)];
          const weight = riverWidthAt(name, midpoint, maxDistance);
          const latLngs = coordinates.map((coordinate) => [coordinate[1], coordinate[0]]);
          L.polyline(latLngs, {
            pane: "themeLines", color: "#ffffff", weight: weight + 2.4, opacity: 0.8,
            lineCap: "round", lineJoin: "round", interactive: false, className: "major-river-casing"
          }).addTo(group);
          const path = L.polyline(latLngs, {
            pane: "themeLines", color: "#087eaf", weight, opacity: 0.96,
            lineCap: "round", lineJoin: "round", interactive, className: "major-river-path"
          }).addTo(group);
          if (interactive) path.bindTooltip(system ? `${name} · ${system}` : name, { sticky: true, className: "river-tooltip" });
        }
      });
    });
  }

  function drawThemeOnMap(map, group, theme, interactive) {
    const previousReliefSync = reliefZoomSync.get(map);
    if (previousReliefSync) {
      map.off("zoomend", previousReliefSync);
      reliefZoomSync.delete(map);
    }
    const previousAnnotationSync = annotationZoomSync.get(map);
    if (previousAnnotationSync) {
      map.off("zoomend", previousAnnotationSync);
      annotationZoomSync.delete(map);
    }
    group.clearLayers();
    if (theme.relief) {
      L.imageOverlay("assets/east-asia-physical-relief.webp?v=20260902-6", REGIONAL_RELIEF_BOUNDS, {
        pane: "reliefPane",
        opacity: 0.76,
        interactive: false,
        className: "east-asia-physical-relief"
      }).addTo(group);

      const detailRelief = L.imageOverlay("assets/korea-physical-relief.webp?v=20260902-6", DETAIL_RELIEF_BOUNDS, {
        pane: "reliefPane",
        opacity: 0.58,
        interactive: false,
        className: "korea-physical-relief"
      });
      const syncDetailRelief = () => {
        if (map.getZoom() >= 7) {
          if (!group.hasLayer(detailRelief)) group.addLayer(detailRelief);
        } else if (group.hasLayer(detailRelief)) {
          group.removeLayer(detailRelief);
        }
      };
      reliefZoomSync.set(map, syncDetailRelief);
      map.on("zoomend", syncDetailRelief);
      syncDetailRelief();
    }
    if (theme.rivers && majorRivers) drawMajorRivers(group, interactive);
    (theme.zones || []).forEach((zone) => {
      const polygon = L.polygon(zone.coords, {
        pane: "themeZones",
        color: zone.color,
        weight: 1.1,
        opacity: 0.66,
        fillColor: zone.color,
        fillOpacity: 0.12,
        dashArray: "4 5",
        interactive
      }).addTo(group);
      if (interactive) polygon.bindTooltip(zone.name, { sticky: true, className: "study-tooltip" });
    });
    (theme.lines || []).forEach((line) => {
      const polyline = L.polyline(line.coords, {
        pane: "themeLines",
        color: line.color,
        weight: line.kind === "transport" ? 2.2 : 2,
        opacity: 0.68,
        dashArray: line.kind === "transport" ? "7 7" : null,
        lineCap: "round",
        lineJoin: "round",
        interactive
      }).addTo(group);
      if (interactive) polyline.bindTooltip(line.name, { sticky: true, className: "study-tooltip" });
    });
    if (interactive) {
      const annotationMarkers = (theme.annotations || []).map((annotation) => {
        const icon = L.divIcon({
          className: "geo-annotation-wrapper",
          html: `<span class="geo-annotation geo-annotation--${annotation.kind}">${annotation.name}</span>`,
          iconSize: [0, 0]
        });
        return {
          marker: L.marker([annotation.lat, annotation.lng], { icon, pane: "themeLabels", interactive: false }),
          minZoom: annotation.minZoom || 5
        };
      });
      const syncAnnotationVisibility = () => {
        annotationMarkers.forEach(({ marker, minZoom }) => {
          if (map.getZoom() >= minZoom) {
            if (!group.hasLayer(marker)) group.addLayer(marker);
          } else if (group.hasLayer(marker)) {
            group.removeLayer(marker);
          }
        });
      };
      annotationZoomSync.set(map, syncAnnotationVisibility);
      map.on("zoomend", syncAnnotationVisibility);
      syncAnnotationVisibility();
    }
    if (theme.featureMarkers !== false) {
      (theme.features || []).forEach((feature) => {
        const marker = createStudyMarker(feature, false, interactive).addTo(group);
        if (interactive) {
          marker.bindTooltip(`${feature.name} · ${feature.note}`, { direction: "top", offset: [0, -15], className: "study-tooltip" });
          marker.on("click", () => focusFeature(feature));
        }
      });
    }
  }

  function createStudyMarker(feature, focused, interactive) {
    const size = focused ? 42 : 34;
    const icon = L.divIcon({
      className: "study-marker-wrapper",
      html: `<span class="study-marker${focused ? " is-focus" : ""}" style="--marker-color:${feature.color || "#176b72"}" aria-hidden="true">${feature.icon || "●"}</span>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
    return L.marker([feature.lat, feature.lng], { icon, pane: "studyMarkers", interactive, keyboard: interactive, title: feature.name || "학습 위치" });
  }

  function focusFeature(feature) {
    mainMap.flyTo([feature.lat, feature.lng], feature.zoom || 9, { duration: 0.45 });
    const marker = createStudyMarker(feature, true, false).addTo(mainThemeLayer);
    marker.bindTooltip(`${feature.name} · ${feature.note}`, { permanent: true, direction: "top", offset: [0, -18], className: "study-tooltip" }).openTooltip();
    setTimeout(() => mainThemeLayer.removeLayer(marker), 3500);
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    return node;
  }

  function getPracticePool() {
    const topic = $("#practiceTopic").value;
    const difficulty = $("#practiceDifficulty").value;
    let pool = questions.filter((question) => topic === "all" || question.topic === topic);
    if (difficulty !== "mixed") pool = pool.filter((question) => question.difficulty === difficulty);
    return pool;
  }

  function getPracticeCount(poolLength) {
    const selected = $("#practiceCount").value;
    return selected === "all" ? poolLength : Math.min(Number(selected) || 5, poolLength);
  }

  function updatePracticeAvailability() {
    const pool = getPracticePool();
    const count = getPracticeCount(pool.length);
    const allSelected = $("#practiceCount").value === "all";
    $("#questionBankSummary").textContent = "문제은행 " + questions.length + "문항";
    $("#practiceAvailability").textContent = "현재 조건에서 " + pool.length + "문항 출제 가능 · 매번 순서를 섞어 새로 구성합니다.";
    $("#startPractice").textContent = allSelected ? count + "문제 모두 풀기" : count + "문제 시작";
    $("#startPractice").disabled = count === 0;
  }

  function startPractice() {
    const pool = getPracticePool();
    const count = getPracticeCount(pool.length);
    sessionQuestions = shuffle(pool).slice(0, count).map(shuffleQuestionOptions);
    sessionAnswers = [];
    questionIndex = 0;
    openPracticeDialog();
  }

  function openPracticeDialog() {
    if (!sessionQuestions.length) return;
    $("#resultDialog").close && $("#resultDialog").open && $("#resultDialog").close();
    $("#practiceDialog").showModal();
    requestAnimationFrame(() => {
      questionMap.invalidateSize();
      renderQuestion();
    });
  }

  function renderQuestion() {
    const question = sessionQuestions[questionIndex];
    if (!question) return;
    questionAnswered = false;
    hintShown = false;
    $("#questionProgress").textContent = `${questionIndex + 1} / ${sessionQuestions.length}`;
    $("#questionProgressBar").style.width = `${((questionIndex + 1) / sessionQuestions.length) * 100}%`;
    $("#questionTopic").textContent = themes[question.topic].label;
    $("#questionDifficulty").textContent = question.difficulty === "advanced" ? "실전" : "기본";
    $("#questionTitle").innerHTML = question.prompt;
    renderQuestionStimulus(question);
    $("#answerFeedback").hidden = true;
    $("#answerFeedback").classList.remove("is-wrong");
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").textContent = questionIndex === sessionQuestions.length - 1 ? "결과 보기" : "다음 문제";
    $("#showHint").disabled = false;
    $("#showHint").textContent = "지도 단서";
    $("#questionMapCaption").textContent = "전국의 주제 분포를 먼저 살펴보세요.";
    renderAnswerOptions(question);
    questionThemeLayer.clearLayers();
    questionFocusLayer.clearLayers();
    drawThemeOnMap(questionMap, questionThemeLayer, themes[question.topic], false);
    fitKorea(questionMap);
    requestAnimationFrame(() => questionMap.invalidateSize());
  }

  function renderQuestionStimulus(question) {
    const container = $("#questionStimulus");
    container.replaceChildren();
    const stimulus = question.stimulus;
    if (!stimulus) return;

    const card = document.createElement("figure");
    card.className = "stimulus-card";

    const title = document.createElement("figcaption");
    title.className = "stimulus-title";
    title.textContent = stimulus.title;
    card.append(title);

    if (stimulus.type === "table") {
      const wrapper = document.createElement("div");
      wrapper.className = "stimulus-table-wrap";
      const table = document.createElement("table");
      table.className = "stimulus-table";
      const head = document.createElement("thead");
      const headRow = document.createElement("tr");
      stimulus.columns.forEach((column) => {
        const cell = document.createElement("th");
        cell.scope = "col";
        cell.textContent = column;
        headRow.append(cell);
      });
      head.append(headRow);
      const body = document.createElement("tbody");
      stimulus.rows.forEach((row) => {
        const tableRow = document.createElement("tr");
        row.forEach((value, index) => {
          const cell = document.createElement(index === 0 ? "th" : "td");
          if (index === 0) cell.scope = "row";
          cell.textContent = value;
          tableRow.append(cell);
        });
        body.append(tableRow);
      });
      table.append(head, body);
      wrapper.append(table);
      card.append(wrapper);
    }

    if (stimulus.type === "bars") {
      const max = Math.max(...stimulus.items.map((item) => item.value), 1);
      const chart = document.createElement("div");
      chart.className = "stimulus-bars";
      stimulus.items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "stimulus-bar-row";
        const label = document.createElement("span");
        label.textContent = item.label;
        const track = document.createElement("div");
        track.className = "stimulus-bar-track";
        const fill = document.createElement("span");
        fill.style.width = Math.max(8, (item.value / max) * 100) + "%";
        track.append(fill);
        const value = document.createElement("strong");
        value.textContent = item.value + (stimulus.unit || "");
        row.append(label, track, value);
        chart.append(row);
      });
      card.append(chart);
    }

    if (stimulus.note) {
      const note = document.createElement("p");
      note.className = "stimulus-note";
      note.textContent = stimulus.note;
      card.append(note);
    }

    container.append(card);
  }
  function renderAnswerOptions(question) {
    const fragment = document.createDocumentFragment();
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      const number = document.createElement("span");
      number.className = "answer-number";
      number.textContent = String(index + 1);
      const copy = document.createElement("span");
      copy.textContent = option;
      button.append(number, copy);
      button.addEventListener("click", () => answerQuestion(index));
      fragment.append(button);
    });
    $("#answerOptions").replaceChildren(fragment);
  }

  function answerQuestion(selectedIndex) {
    if (questionAnswered) return;
    questionAnswered = true;
    const question = sessionQuestions[questionIndex];
    const correct = selectedIndex === question.answer;
    sessionAnswers[questionIndex] = { selectedIndex, correct };
    $$("#answerOptions .answer-button").forEach((button, index) => {
      button.disabled = true;
      if (index === question.answer) button.classList.add("is-correct");
      if (index === selectedIndex && !correct) button.classList.add("is-wrong");
    });
    $("#feedbackTitle").textContent = correct ? "정답입니다" : `정답은 ${question.answer + 1}번입니다`;
    $("#feedbackExplanation").textContent = question.explanation;
    $("#answerFeedback").classList.toggle("is-wrong", !correct);
    $("#answerFeedback").hidden = false;
    $("#nextQuestion").disabled = false;
    showQuestionHint();
  }

  function showQuestionHint() {
    const question = sessionQuestions[questionIndex];
    if (!question || !question.focus) return;
    hintShown = true;
    const focus = question.focus;
    questionFocusLayer.clearLayers();
    const feature = { name: "문제 단서", icon: "?", color: "#f0a51f", lat: focus.lat, lng: focus.lng };
    createStudyMarker(feature, true, false).addTo(questionFocusLayer);
    L.circle([focus.lat, focus.lng], {
      pane: "themeLines", radius: 42000, color: "#f0a51f", weight: 3, fillColor: "#ffd77d", fillOpacity: 0.18, interactive: false
    }).addTo(questionFocusLayer);
    questionMap.flyTo([focus.lat, focus.lng], focus.zoom || 9, { duration: 0.4 });
    $("#questionMapCaption").textContent = focus.label;
    $("#showHint").disabled = true;
    $("#showHint").textContent = "단서 확인됨";
  }

  function nextQuestion() {
    if (!questionAnswered) return;
    if (questionIndex < sessionQuestions.length - 1) {
      questionIndex += 1;
      renderQuestion();
      return;
    }
    completePractice();
  }

  function completePractice() {
    const correct = sessionAnswers.filter((answer) => answer && answer.correct).length;
    saveProgress(correct, sessionQuestions.length);
    renderProgress();
    $("#practiceDialog").close();
    const total = sessionQuestions.length;
    const scoreRate = total ? correct / total : 0;
    $("#resultVisual").textContent = correct + "/" + total;
    $("#resultTitle").textContent = total + "문제 완료";
    $("#resultSummary").textContent = correct === total
      ? "위치와 개념의 연결이 아주 정확해요."
      : scoreRate >= 0.6
        ? "좋아요. 틀린 문제의 지도 단서를 한 번 더 확인해 보세요."
        : "지도 위치부터 다시 연결하면 점수가 빠르게 올라가요.";
    const wrongCount = sessionQuestions.length - correct;
    $("#resultBreakdown").innerHTML = `<div class="result-stat"><strong>${correct}</strong><span>정답</span></div><div class="result-stat"><strong>${wrongCount}</strong><span>복습 필요</span></div>`;
    $("#reviewWrong").disabled = wrongCount === 0;
    $("#resultDialog").showModal();
  }

  function reviewWrongQuestions() {
    const wrong = sessionQuestions.filter((_, index) => sessionAnswers[index] && !sessionAnswers[index].correct);
    if (!wrong.length) return;
    sessionQuestions = wrong;
    sessionAnswers = [];
    questionIndex = 0;
    $("#resultDialog").close();
    openPracticeDialog();
  }

  function finishPractice() {
    $("#resultDialog").close();
    const weakTopic = weakestTopic();
    if (weakTopic && themes[weakTopic]) renderTheme(weakTopic);
  }

  function weakestTopic() {
    const mistakes = new Map();
    sessionQuestions.forEach((question, index) => {
      if (sessionAnswers[index] && !sessionAnswers[index].correct) {
        mistakes.set(question.topic, (mistakes.get(question.topic) || 0) + 1);
      }
    });
    return [...mistakes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  }

  function shuffle(items) {
    const array = [...items];
    for (let index = array.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
    }
    return array;
  }

  function shuffleQuestionOptions(question) {
    const shuffledOptions = shuffle(question.options.map((text, index) => ({
      text,
      correct: index === question.answer
    })));
    return {
      ...question,
      options: shuffledOptions.map((option) => option.text),
      answer: shuffledOptions.findIndex((option) => option.correct)
    };
  }
  function readProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      return {
        correct: Number(parsed.correct) || 0,
        total: Number(parsed.total) || 0,
        lastScore: Number.isFinite(parsed.lastScore) ? parsed.lastScore : null,
        lastTotal: Number.isFinite(parsed.lastTotal) ? parsed.lastTotal : null
      };
    } catch (_) {
      return { correct: 0, total: 0, lastScore: null, lastTotal: null };
    }
  }

  function saveProgress(correct, total) {
    const progress = readProgress();
    progress.correct += correct;
    progress.total += total;
    progress.lastScore = correct;
    progress.lastTotal = total;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  function renderProgress() {
    const progress = readProgress();
    $("#progressScore").textContent = `${progress.correct} / ${progress.total}`;
  }
})();
