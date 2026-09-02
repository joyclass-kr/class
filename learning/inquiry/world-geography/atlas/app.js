(function () {
  "use strict";

  const atlas = window.WORLD_THEME_ATLAS || { categories: [], items: [] };
  const WORLD_BOUNDS = L.latLngBounds([[-90, -180], [90, 180]]);
  const VISIBLE_WORLD_BOUNDS = L.latLngBounds([[-77, -180], [84, 180]]);
  const MAP_IMAGE = "../../age-of-exploration/public/assets/maps/natural-earth-v58/overview.jpg?v=58";
  let activeCategory = "animal";
  let selectedItemId = "";
  let currentItem = null;
  let map;
  let atlasLayer;

  const $ = (selector) => document.querySelector(selector);

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    map = L.map("map", {
      crs: L.CRS.Simple,
      center: [8, 10],
      zoom: 1,
      minZoom: 0,
      maxZoom: 5,
      zoomSnap: .25,
      maxBounds: [[-105, -195], [105, 195]],
      maxBoundsViscosity: .85,
      preferCanvas: true
    });
    L.imageOverlay(MAP_IMAGE, WORLD_BOUNDS, { attribution: "Natural Earth", interactive: false }).addTo(map);
    map.createPane("themeAtlasPane");
    map.getPane("themeAtlasPane").style.zIndex = "660";
    atlasLayer = L.layerGroup().addTo(map);
    map.fitBounds(VISIBLE_WORLD_BOUNDS, { padding: [8, 8], animate: false });
    bindControls();
    renderCategoryControls();
    renderAtlas();
  }

  function bindControls() {
    $("#closeThemeItem").addEventListener("click", closeItem);
    $("#speakThemeItem").addEventListener("click", speakCurrentItem);
    if (!("speechSynthesis" in window)) $("#speakThemeItem").hidden = true;
  }

  function renderCategoryControls() {
    const controls = atlas.categories.map((category) => {
      const count = atlas.items.filter((item) => item.category === category.id).length;
      const active = category.id === activeCategory;
      const button = makeElement("button", "theme-layer-control");
      button.type = "button";
      button.style.setProperty("--layer-color", category.color);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", `${category.label} 테마 ${count}개 보기`);
      const icon = makeElement("span", "layer-icon", category.icon);
      icon.setAttribute("aria-hidden", "true");
      button.append(icon, makeElement("span", "", category.label), makeElement("small", "", String(count)));
      button.addEventListener("click", () => selectCategory(category.id));
      return button;
    });
    $("#themeLayerControls").replaceChildren(...controls);
  }

  function selectCategory(categoryId) {
    activeCategory = categoryId;
    selectedItemId = "";
    currentItem = null;
    $("#themeItemCard").hidden = true;
    $("#atlasPrompt").hidden = false;
    renderCategoryControls();
    renderAtlas();
    map.fitBounds(VISIBLE_WORLD_BOUNDS, { padding: [8, 8], animate: true });
  }

  function renderAtlas() {
    atlasLayer.clearLayers();
    const category = atlas.categories.find((entry) => entry.id === activeCategory);
    const visibleItems = atlas.items.filter((item) => item.category === activeCategory);
    visibleItems.forEach((item) => {
      const selected = item.id === selectedItemId;
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
      }).addTo(atlasLayer);
      marker.bindTooltip(`${item.name} · ${item.place}`, { direction: "top", offset: [0, -24], className: "theme-tooltip" });
      marker.on("click", () => showItem(item));
    });
    $("#themeItemCount").textContent = `${category ? category.label : "테마"} ${visibleItems.length}개`;
  }

  function showItem(item) {
    selectedItemId = item.id;
    currentItem = item;
    const category = atlas.categories.find((entry) => entry.id === item.category);
    $("#themeItemIcon").textContent = item.icon;
    $("#themeItemCategory").textContent = category ? category.label : "세계 테마";
    $("#themeItemName").textContent = item.name;
    $("#themeItemPlace").textContent = item.place;
    $("#themeItemDescription").textContent = item.description;
    $("#atlasPrompt").hidden = true;
    $("#themeItemCard").hidden = false;
    renderAtlas();
    map.setView([item.lat, item.lng], Math.max(3, map.getZoom()), { animate: true });
  }

  function closeItem() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    selectedItemId = "";
    currentItem = null;
    $("#themeItemCard").hidden = true;
    $("#atlasPrompt").hidden = false;
    renderAtlas();
  }

  function speakCurrentItem() {
    if (!currentItem || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(`${currentItem.name}. ${currentItem.place}. ${currentItem.description}`);
    speech.lang = "ko-KR";
    speech.rate = .9;
    const button = $("#speakThemeItem");
    button.textContent = "🔊 읽는 중";
    speech.addEventListener("end", () => { button.textContent = "🔊 설명 듣기"; });
    speech.addEventListener("error", () => { button.textContent = "🔊 설명 듣기"; });
    window.speechSynthesis.speak(speech);
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }
})();
