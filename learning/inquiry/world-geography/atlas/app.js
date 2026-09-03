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
  let baseMapLayer;
  let atlasLayer;
  let worldCopyIndex = 0;

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
      maxBounds: [[-90, -1000000], [90, 1000000]],
      maxBoundsViscosity: 1,
      zoomControl: false,
      preferCanvas: true
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    baseMapLayer = L.layerGroup().addTo(map);
    renderBaseMapCopies();
    map.createPane("themeAtlasPane");
    map.getPane("themeAtlasPane").style.zIndex = "660";
    atlasLayer = L.layerGroup().addTo(map);
    map.fitBounds(VISIBLE_WORLD_BOUNDS, { padding: [8, 8], animate: false });
    updateMinimumZoom();
    map.on("moveend", refreshWorldCopy);
    map.on("resize", updateMinimumZoom);
    bindControls();
    renderCategoryControls();
    renderAtlas();
  }

  function renderBaseMapCopies() {
    baseMapLayer.clearLayers();
    [-1, 0, 1].forEach((step) => {
      const offset = (worldCopyIndex + step) * 360;
      L.imageOverlay(MAP_IMAGE, [[-90, -180 + offset], [90, 180 + offset]], {
        attribution: "Natural Earth",
        interactive: false
      }).addTo(baseMapLayer);
    });
  }

  function refreshWorldCopy() {
    const nextIndex = Math.round(map.getCenter().lng / 360);
    if (nextIndex === worldCopyIndex) return;
    worldCopyIndex = nextIndex;
    renderBaseMapCopies();
    renderAtlas();
  }

  function updateMinimumZoom() {
    const size = map.getSize();
    if (!size.x || !size.y) return;
    const requiredScale = Math.max(size.x / 360, size.y / 180);
    const minimumZoom = Math.ceil(Math.log2(requiredScale) * 4) / 4;
    map.setMinZoom(minimumZoom);
    if (map.getZoom() < minimumZoom) map.setZoom(minimumZoom, { animate: false });
  }

  function visibleWorldOffsets() {
    return [-1, 0, 1].map((step) => (worldCopyIndex + step) * 360);
  }

  function bindControls() {
    $("#closeThemeItem").addEventListener("click", closeItem);
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
    renderCategoryControls();
    renderAtlas();
    const offset = worldCopyIndex * 360;
    map.fitBounds([[-77, -180 + offset], [84, 180 + offset]], { padding: [8, 8], animate: true });
    updateMinimumZoom();
  }

  function renderAtlas() {
    atlasLayer.clearLayers();
    const category = atlas.categories.find((entry) => entry.id === activeCategory);
    const visibleItems = atlas.items.filter((item) => item.category === activeCategory);
    visibleWorldOffsets().forEach((lngOffset) => {
      visibleItems.forEach((item) => {
        const selected = item.id === selectedItemId;
        const marker = L.marker([item.lat, item.lng + lngOffset], {
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
        marker.on("click", () => showItem(item, item.lng + lngOffset));
      });
    });
    $("#themeItemCount").textContent = `${category ? category.label : "테마"} ${visibleItems.length}개`;
  }

  function showItem(item, displayLng) {
    selectedItemId = item.id;
    currentItem = item;
    const category = atlas.categories.find((entry) => entry.id === item.category);
    $("#themeItemIcon").textContent = item.icon;
    $("#themeItemCategory").textContent = category ? category.label : "세계 테마";
    $("#themeItemName").textContent = item.name;
    $("#themeItemPlace").textContent = item.place;
    $("#themeItemDescription").textContent = item.description;
    $("#themeItemCard").hidden = false;
    renderAtlas();
    map.setView([item.lat, displayLng], Math.max(3, map.getZoom()), { animate: true });
  }

  function closeItem() {
    selectedItemId = "";
    currentItem = null;
    $("#themeItemCard").hidden = true;
    renderAtlas();
  }


  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }
})();
