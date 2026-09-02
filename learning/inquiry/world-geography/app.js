(function () {
  "use strict";

  const dataset = window.WORLD_GEOGRAPHY || {};
  const atlas = window.WORLD_THEME_ATLAS || { categories: [], items: [] };
  const themes = dataset.themes || {};
  const questions = Array.isArray(dataset.questions) ? dataset.questions : [];
  const WORLD_BOUNDS = L.latLngBounds([[-90, -180], [90, 180]]);
  const VISIBLE_WORLD_BOUNDS = L.latLngBounds([[-77, -180], [84, 180]]);
  const MAP_IMAGE = "../age-of-exploration/public/assets/maps/natural-earth-v58/overview.jpg?v=58";
  const PROGRESS_KEY = "joyclass-world-geography-progress-v1";
  let currentTheme = "world";
  let map;
  let featureLayer;
  let lineLayer;
  let themeAtlasLayer;
  let selectedThemeItemId = "";
  let currentThemeItem = null;
  const activeThemeCategories = new Set(["animal", "landmark"]);
  let questionMap;
  let questionFocusLayer;
  let sessionQuestions = [];
  let sessionAnswers = [];
  let questionIndex = 0;
  let questionAnswered = false;
  let hintShown = false;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    map = createMap("map", true);
    map.createPane("themeAtlasPane");
    map.getPane("themeAtlasPane").style.zIndex = "660";
    featureLayer = L.layerGroup().addTo(map);
    lineLayer = L.layerGroup().addTo(map);
    themeAtlasLayer = L.layerGroup().addTo(map);
    fitWorld(map);
    bindControls();
    renderThemeLayerControls();
    renderThemeAtlas();
    renderTheme(currentTheme);
    renderProgress();
  }

  function createMap(elementId, interactive) {
    const instance = L.map(elementId, {
      crs: L.CRS.Simple,
      center: [8, 10],
      zoom: 1,
      minZoom: 0,
      maxZoom: 5,
      zoomSnap: 0.25,
      maxBounds: [[-105, -195], [105, 195]],
      maxBoundsViscosity: 0.85,
      attributionControl: interactive,
      zoomControl: interactive,
      dragging: true,
      preferCanvas: true
    });
    L.imageOverlay(MAP_IMAGE, WORLD_BOUNDS, {
      attribution: "Natural Earth",
      interactive: false
    }).addTo(instance);
    return instance;
  }

  function fitWorld(targetMap) {
    targetMap.fitBounds(VISIBLE_WORLD_BOUNDS, { padding: [8, 8], animate: false });
  }

  function bindControls() {
    $$(".theme-tab").forEach((button) => {
      button.addEventListener("click", () => renderTheme(button.dataset.theme));
    });
    $("#progressButton").addEventListener("click", showProgressSummary);
    $("#startPractice").addEventListener("click", startPractice);
    $("#closePractice").addEventListener("click", () => $("#practiceDialog").close());
    $("#showHint").addEventListener("click", showQuestionHint);
    $("#nextQuestion").addEventListener("click", nextQuestion);
    $("#reviewWrong").addEventListener("click", reviewWrongQuestions);
    $("#finishPractice").addEventListener("click", () => $("#resultDialog").close());
    $("#themeLayerToggle").addEventListener("click", toggleThemeLayerDock);
    $("#recommendedLayers").addEventListener("click", showRecommendedLayers);
    $("#closeThemeItem").addEventListener("click", closeThemeItem);
    $("#speakThemeItem").addEventListener("click", speakCurrentThemeItem);
    $("#practiceDialog").addEventListener("close", () => {
      questionAnswered = false;
      if (questionFocusLayer) questionFocusLayer.clearLayers();
    });
    if (!("speechSynthesis" in window)) $("#speakThemeItem").hidden = true;
    if (window.matchMedia("(max-width: 620px)").matches) setThemeLayerDockCollapsed(true);
  }

  function renderThemeLayerControls() {
    const controls = atlas.categories.map((category) => {
      const count = atlas.items.filter((item) => item.category === category.id).length;
      const button = makeElement("button", "theme-layer-control");
      button.type = "button";
      button.dataset.category = category.id;
      button.style.setProperty("--layer-color", category.color);
      button.setAttribute("aria-pressed", String(activeThemeCategories.has(category.id)));
      button.setAttribute("aria-label", `${category.label} 테마 ${count}개 ${activeThemeCategories.has(category.id) ? "숨기기" : "보기"}`);
      const icon = makeElement("span", "layer-icon", category.icon);
      icon.setAttribute("aria-hidden", "true");
      const label = makeElement("span", "", category.label);
      const tally = makeElement("small", "", String(count));
      button.append(icon, label, tally);
      button.addEventListener("click", () => toggleThemeCategory(category.id));
      return button;
    });
    $("#themeLayerControls").replaceChildren(...controls);
  }

  function toggleThemeCategory(categoryId) {
    if (activeThemeCategories.has(categoryId)) activeThemeCategories.delete(categoryId);
    else activeThemeCategories.add(categoryId);
    selectedThemeItemId = "";
    currentThemeItem = null;
    $("#themeItemCard").hidden = true;
    renderThemeLayerControls();
    renderThemeAtlas();
  }

  function showRecommendedLayers() {
    activeThemeCategories.clear();
    activeThemeCategories.add("animal");
    activeThemeCategories.add("landmark");
    activeThemeCategories.add("nature");
    renderThemeLayerControls();
    renderThemeAtlas();
  }

  function renderThemeAtlas() {
    themeAtlasLayer.clearLayers();
    const visibleItems = atlas.items.filter((item) => activeThemeCategories.has(item.category));
    visibleItems.forEach((item) => {
      const selected = item.id === selectedThemeItemId;
      const marker = L.marker([item.lat, item.lng], {
        pane: "themeAtlasPane",
        title: `${item.name}, ${item.place}`,
        alt: item.name,
        keyboard: true,
        icon: L.divIcon({
          className: "",
          html: `<div class="theme-pin${selected ? " is-selected" : ""}" style="--pin-color:${item.color}"><span>${item.icon}</span></div>`,
          iconSize: selected ? [38, 38] : [30, 30],
          iconAnchor: selected ? [19, 34] : [15, 27]
        })
      }).addTo(themeAtlasLayer);
      marker.bindTooltip(`${item.name} · ${item.place}`, { direction: "top", offset: [0, -24], className: "theme-tooltip" });
      marker.on("click", () => showThemeItem(item));
    });
    $("#themeItemCount").textContent = `${atlas.items.length}개 중 ${visibleItems.length}개 표시`;
    $("#mapHelp").textContent = visibleItems.length
      ? "색 표식은 지리 개념, 그림 표식은 테마 정보예요."
      : "테마 지도에서 보고 싶은 주제를 하나 이상 켜 보세요.";
  }

  function showThemeItem(item) {
    selectedThemeItemId = item.id;
    currentThemeItem = item;
    const category = atlas.categories.find((entry) => entry.id === item.category);
    $("#themeItemIcon").textContent = item.icon;
    $("#themeItemCategory").textContent = category ? category.label : "세계 테마";
    $("#themeItemName").textContent = item.name;
    $("#themeItemPlace").textContent = item.place;
    $("#themeItemDescription").textContent = item.description;
    $("#themeItemCard").hidden = false;
    renderThemeAtlas();
    map.setView([item.lat, item.lng], Math.max(3, map.getZoom()), { animate: true });
  }

  function closeThemeItem() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    selectedThemeItemId = "";
    currentThemeItem = null;
    $("#themeItemCard").hidden = true;
    renderThemeAtlas();
  }

  function speakCurrentThemeItem() {
    if (!currentThemeItem || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(`${currentThemeItem.name}. ${currentThemeItem.place}. ${currentThemeItem.description}`);
    speech.lang = "ko-KR";
    speech.rate = .9;
    const button = $("#speakThemeItem");
    button.textContent = "🔊 읽는 중";
    speech.addEventListener("end", () => { button.textContent = "🔊 설명 듣기"; });
    speech.addEventListener("error", () => { button.textContent = "🔊 설명 듣기"; });
    window.speechSynthesis.speak(speech);
  }

  function toggleThemeLayerDock() {
    setThemeLayerDockCollapsed(!$("#themeLayerDock").classList.contains("is-collapsed"));
  }

  function setThemeLayerDockCollapsed(collapsed) {
    $("#themeLayerDock").classList.toggle("is-collapsed", collapsed);
    $("#themeLayerToggle").setAttribute("aria-expanded", String(!collapsed));
    $("#themeLayerToggle").textContent = collapsed ? "펼치기" : "접기";
  }

  function renderTheme(themeId) {
    const theme = themes[themeId];
    if (!theme) return;
    currentTheme = themeId;
    $$(".theme-tab").forEach((button) => {
      const active = button.dataset.theme === themeId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    $("#conceptKicker").textContent = theme.kicker;
    $("#conceptTitle").textContent = theme.title;
    $("#conceptSummary").textContent = theme.summary;
    $("#conceptPoints").replaceChildren(...(theme.points || []).map((copy) => makeElement("div", "concept-point", copy)));
    renderLegend(theme.legend || []);
    renderMapContent(theme);
    renderFeatureButtons(theme);
    const questionCount = questions.filter((question) => question.topic === themeId).length;
    $("#startPractice").textContent = `${theme.label} 문제 ${questionCount}개 풀기`;
    $("#startPractice").disabled = questionCount === 0;
  }

  function renderLegend(items) {
    $("#mapKey").replaceChildren(...items.map((item) => {
      const row = makeElement("span", "key-item");
      const swatch = makeElement("span", "key-swatch");
      swatch.style.background = item.color;
      row.append(swatch, document.createTextNode(item.label));
      return row;
    }));
  }

  function renderMapContent(theme) {
    featureLayer.clearLayers();
    lineLayer.clearLayers();
    (theme.lines || []).forEach((line) => {
      const path = L.polyline(line.coords, {
        color: line.color,
        weight: line.name.includes("날짜변경선") ? 3 : 2,
        opacity: .9,
        dashArray: line.dash ? "7 7" : null,
        interactive: true
      }).addTo(lineLayer);
      path.bindTooltip(line.name, { sticky: true, className: "feature-tooltip" });
    });
    (theme.features || []).forEach((feature) => {
      const marker = makeMarker(feature).addTo(featureLayer);
      marker.bindTooltip(feature.name, { direction: "top", offset: [0, -28], className: "feature-tooltip" });
      marker.on("click", () => focusFeature(feature));
    });
    fitWorld(map);
  }

  function renderFeatureButtons(theme) {
    const buttons = (theme.features || []).map((feature) => {
      const button = makeElement("button", "feature-button");
      button.type = "button";
      const title = makeElement("strong", "", feature.name);
      const note = makeElement("small", "", feature.note);
      button.append(title, note);
      button.addEventListener("click", () => focusFeature(feature));
      return button;
    });
    $("#featureList").replaceChildren(...buttons);
  }

  function makeMarker(feature) {
    return L.marker([feature.lat, feature.lng], {
      icon: L.divIcon({
        className: "",
        html: `<div class="map-marker" style="--marker:${feature.color}"><span>${feature.icon}</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 31]
      })
    });
  }

  function focusFeature(feature) {
    map.setView([feature.lat, feature.lng], feature.zoom || 3, { animate: true });
    $("#conceptKicker").textContent = themes[currentTheme].label + " 핵심 지점";
    $("#conceptTitle").textContent = feature.name;
    $("#conceptSummary").textContent = feature.note;
  }

  function showProgressSummary() {
    const progress = readProgress();
    $("#conceptKicker").textContent = "나의 학습 기록";
    $("#conceptTitle").textContent = progress.total ? "세계지리 연습 기록" : "첫 지도를 살펴볼 시간";
    $("#conceptSummary").textContent = progress.total
      ? `누적 ${progress.total}문제 중 ${progress.correct}문제를 맞혔어요. 정답률은 ${Math.round(progress.correct / progress.total * 100)}%예요.`
      : "대륙·대양과 위도·경도부터 차례로 살펴보면 세계의 큰 위치 관계를 잡기 쉬워요.";
  }

  function startPractice() {
    const pool = questions.filter((question) => question.topic === currentTheme);
    if (!pool.length) return;
    sessionQuestions = shuffle(pool).slice(0, 5);
    sessionAnswers = [];
    questionIndex = 0;
    $("#practiceDialog").showModal();
    ensureQuestionMap();
    renderQuestion();
  }

  function ensureQuestionMap() {
    if (!questionMap) {
      questionMap = createMap("questionMap", false);
      questionFocusLayer = L.layerGroup().addTo(questionMap);
    }
    requestAnimationFrame(() => {
      questionMap.invalidateSize(false);
      fitWorld(questionMap);
    });
  }

  function renderQuestion() {
    const question = sessionQuestions[questionIndex];
    if (!question) return;
    questionAnswered = false;
    hintShown = false;
    const theme = themes[question.topic];
    $("#questionProgress").textContent = `${questionIndex + 1} / ${sessionQuestions.length}`;
    $("#questionTopic").textContent = theme ? theme.label : "세계지리";
    $("#questionProgressBar").style.width = `${(questionIndex / sessionQuestions.length) * 100}%`;
    $("#questionDifficulty").textContent = question.difficulty === "advanced" ? "심화" : "기본";
    $("#questionTitle").textContent = question.prompt;
    $("#answerFeedback").hidden = true;
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").textContent = questionIndex === sessionQuestions.length - 1 ? "결과 보기" : "다음 문제";
    $("#showHint").disabled = false;
    $("#showHint").textContent = "지도 단서";
    $("#questionMapCaption").textContent = "지도 단서를 누르면 관련 위치를 확인할 수 있어요.";
    if (questionFocusLayer) questionFocusLayer.clearLayers();
    if (questionMap) fitWorld(questionMap);

    const optionButtons = question.options.map((option, optionIndex) => {
      const button = makeElement("button", "answer-option", `${optionIndex + 1}. ${option}`);
      button.type = "button";
      button.addEventListener("click", () => answerQuestion(optionIndex));
      return button;
    });
    $("#answerOptions").replaceChildren(...optionButtons);
  }

  function answerQuestion(selectedIndex) {
    if (questionAnswered) return;
    questionAnswered = true;
    const question = sessionQuestions[questionIndex];
    const correct = selectedIndex === question.answer;
    sessionAnswers.push({ question, selectedIndex, correct });
    $$(".answer-option").forEach((button, index) => {
      button.disabled = true;
      if (index === question.answer) button.classList.add("is-correct");
      else if (index === selectedIndex) button.classList.add("is-wrong");
    });
    $("#feedbackTitle").textContent = correct ? "정답이에요!" : "한 번 더 연결해 봐요.";
    $("#feedbackExplanation").textContent = question.explanation;
    $("#answerFeedback").hidden = false;
    $("#nextQuestion").disabled = false;
    $("#questionProgressBar").style.width = `${((questionIndex + 1) / sessionQuestions.length) * 100}%`;
    if (!hintShown) showQuestionHint();
  }

  function showQuestionHint() {
    const question = sessionQuestions[questionIndex];
    if (!question || !questionMap || !question.focus) return;
    hintShown = true;
    questionFocusLayer.clearLayers();
    L.circleMarker([question.focus.lat, question.focus.lng], {
      radius: 10,
      color: "#fff",
      weight: 3,
      fillColor: "#c53555",
      fillOpacity: .95
    }).addTo(questionFocusLayer);
    questionMap.setView([question.focus.lat, question.focus.lng], question.focus.zoom || 3, { animate: true });
    $("#questionMapCaption").textContent = question.focus.label;
    $("#showHint").textContent = "단서 확인됨";
    $("#showHint").disabled = true;
  }

  function nextQuestion() {
    if (!questionAnswered) return;
    if (questionIndex < sessionQuestions.length - 1) {
      questionIndex += 1;
      renderQuestion();
      return;
    }
    finishPractice();
  }

  function finishPractice() {
    const correct = sessionAnswers.filter((answer) => answer.correct).length;
    const total = sessionAnswers.length;
    saveProgress(correct, total);
    renderProgress();
    $("#practiceDialog").close();
    $("#resultVisual").textContent = `${correct}/${total}`;
    $("#resultSummary").textContent = correct === total
      ? "모든 위치 관계를 정확히 연결했어요. 다음 주제로 이동해 보세요."
      : `${total - correct}문제는 지도의 위치를 다시 확인하면 더 단단해져요.`;
    const wrongCount = sessionAnswers.filter((answer) => !answer.correct).length;
    $("#reviewWrong").hidden = wrongCount === 0;
    $("#resultDialog").showModal();
  }

  function reviewWrongQuestions() {
    const wrongQuestions = sessionAnswers.filter((answer) => !answer.correct).map((answer) => answer.question);
    if (!wrongQuestions.length) return;
    sessionQuestions = wrongQuestions;
    sessionAnswers = [];
    questionIndex = 0;
    $("#resultDialog").close();
    $("#practiceDialog").showModal();
    ensureQuestionMap();
    renderQuestion();
  }

  function shuffle(items) {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function readProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY));
      return {
        correct: Number(saved && saved.correct) || 0,
        total: Number(saved && saved.total) || 0
      };
    } catch (_) {
      return { correct: 0, total: 0 };
    }
  }

  function saveProgress(correct, total) {
    const progress = readProgress();
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      correct: progress.correct + correct,
      total: progress.total + total
    }));
  }

  function renderProgress() {
    const progress = readProgress();
    $("#progressScore").textContent = `${progress.correct} / ${progress.total}`;
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }
})();
