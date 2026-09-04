// 지도 층 관리: 나라 경계·이름, 강, 판 경계, 해류, 바람, 기후 구분, 종교·인구 밀도·수능 단원 색칠.
// app.js가 WorldLayers.create(map, options)로 만들고 setActive/toggle/refresh를 부른다.
(function () {
  "use strict";

  const countries = window.WORLD_COUNTRIES || [];
  const rivers = window.WORLD_RIVERS || [];
  const plates = window.PLATE_BOUNDARIES || [];
  const grid = window.KOPPEN_GRID;
  const extra = window.WORLD_LAYER_DATA || {};

  const countryCollection = {
    type: "FeatureCollection",
    features: countries.map((country) => ({ type: "Feature", properties: country, geometry: country.geometry }))
  };
  const countryByIso = new Map(countries.map((country) => [country.iso, country]));

  function densityOf(country) {
    return country.area ? country.pop / country.area : 0;
  }
  function densityClass(country) {
    const density = densityOf(country);
    return (extra.densityClasses || []).find((entry) => density >= entry.min) || null;
  }
  function religionOf(country) {
    const key = (extra.religionByIso || {})[country.iso];
    return key ? extra.religionClasses[key] : null;
  }
  function regionOf(country) {
    const key = (extra.regionByIso || {})[country.iso];
    return key ? extra.regionClasses[key] : null;
  }

  function formatCount(value, unit) {
    if (!value) return "-";
    if (value >= 1e8) return `${(value / 1e8).toFixed(1)}억 ${unit}`;
    if (value >= 1e4) return `${Math.round(value / 1e4).toLocaleString("ko-KR")}만 ${unit}`;
    return `${Math.round(value).toLocaleString("ko-KR")} ${unit}`;
  }

  // 쾨펜 격자를 그림으로 바꾼다(한 번만).
  let koppenImage = null;
  function buildKoppenImage() {
    if (koppenImage || !grid) return koppenImage;
    const canvas = document.createElement("canvas");
    canvas.width = grid.width;
    canvas.height = grid.height;
    const ctx = canvas.getContext("2d");
    const image = ctx.createImageData(grid.width, grid.height);
    const colors = {};
    Object.entries(extra.koppenClasses || {}).forEach(([key, entry]) => {
      const hex = entry.color.replace("#", "");
      colors[key] = [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    });
    let cell = 0;
    const runs = grid.runs;
    let index = 0;
    while (index < runs.length) {
      const key = runs[index];
      let end = index + 1;
      while (end < runs.length && /[0-9a-z]/.test(runs[end])) end += 1;
      const count = parseInt(runs.slice(index + 1, end), 36);
      const color = colors[key];
      if (color) {
        for (let n = 0; n < count; n += 1) {
          const at = (cell + n) * 4;
          image.data[at] = color[0]; image.data[at + 1] = color[1]; image.data[at + 2] = color[2]; image.data[at + 3] = 255;
        }
      }
      cell += count;
      index = end;
    }
    ctx.putImageData(image, 0, 0);
    koppenImage = canvas.toDataURL("image/png");
    return koppenImage;
  }

  function screenAngle(from, to) {
    // 화면 기준 각도: 오른쪽이 0°, 아래쪽이 90°
    return Math.atan2(-(to[0] - from[0]), to[1] - from[1]) * 180 / Math.PI;
  }

  function arrowMarker(coords, offset, color, size) {
    const from = coords[coords.length - 2];
    const to = coords[coords.length - 1];
    const angle = screenAngle(from, to);
    return L.marker([to[0], to[1] + offset], {
      interactive: false,
      icon: L.divIcon({
        className: "",
        html: `<span class="flow-arrow" style="--flow:${color};--size:${size}px;transform:rotate(${angle}deg)"></span>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      })
    });
  }

  function create(map, options) {
    const opts = options || {};
    const active = new Set();
    const built = new Map(); // id → L.LayerGroup
    let offsets = [0];
    let zoomHandlerBound = false;

    if (!map.getPane("koppenPane")) map.createPane("koppenPane").style.zIndex = "390";
    // 그리는 순서: 면(색칠) → 선 → 이름
    const drawOrder = ["koppen", "religion", "density", "region", "rivers", "plates", "currents", "winds", "borders", "names"];
    const definitions = {
      borders: {
        label: "나라 경계", group: "line",
        build() {
          const group = L.layerGroup();
          offsets.forEach((offset) => {
            L.geoJSON(countryCollection, {
              coordsToLatLng: (coords) => L.latLng(coords[1], coords[0] + offset),
              style: { color: "#ffffff", weight: 1, opacity: .85, fillColor: "#000", fillOpacity: .01 },
              onEachFeature: (feature, layer) => bindCountry(feature.properties, layer)
            }).addTo(group);
          });
          return group;
        }
      },
      names: {
        label: "나라 이름", group: "line",
        build() {
          const group = L.layerGroup();
          const zoom = map.getZoom();
          const minArea = zoom < 2.25 ? 1700000 : zoom < 3 ? 600000 : zoom < 4 ? 100000 : 0;
          offsets.forEach((offset) => {
            countries.forEach((country) => {
              if (!country.label || country.area < minArea || country.iso === "AQ" || country.iso === "TF") return;
              L.marker([country.label[0], country.label[1] + offset], {
                interactive: false,
                icon: L.divIcon({ className: "", html: `<span class="country-label">${country.name}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] })
              }).addTo(group);
            });
          });
          return group;
        },
        rebuildOnZoom: true
      },
      rivers: {
        label: "큰 강", group: "line",
        legend: [{ color: "#4fb3ff", label: "큰 강(자료: Natural Earth)" }],
        build() {
          const group = L.layerGroup();
          offsets.forEach((offset) => {
            rivers.forEach((river) => {
              L.geoJSON({ type: "Feature", geometry: river.geometry }, {
                coordsToLatLng: (coords) => L.latLng(coords[1], coords[0] + offset),
                style: { color: "#4fb3ff", weight: 2.2, opacity: .95 }
              }).bindTooltip(river.name, { sticky: true, className: "feature-tooltip" }).addTo(group);
            });
          });
          return group;
        }
      },
      plates: {
        label: "판 경계", group: "line",
        legend: [{ color: "#e0403a", label: "섭입대(판이 밀려 들어감)" }, { color: "#f2a03d", label: "그 밖의 판 경계(해령·변환 단층 등)" }],
        build() {
          const group = L.layerGroup();
          offsets.forEach((offset) => {
            plates.forEach((boundary) => {
              const subduction = boundary.type === "subduction";
              L.polyline(boundary.coords.map(([lng, lat]) => [lat, lng + offset]), {
                color: subduction ? "#e0403a" : "#f2a03d", weight: subduction ? 2.6 : 1.8, opacity: .95, dashArray: subduction ? null : "6 5"
              }).bindTooltip(`${subduction ? "섭입대" : "판 경계"} · ${boundary.a}–${boundary.b}`, { sticky: true, className: "feature-tooltip" }).addTo(group);
            });
          });
          return group;
        }
      },
      currents: {
        label: "해류", group: "line",
        legend: [{ color: "#ff5a4e", label: "난류(따뜻한 해류)" }, { color: "#4f8fe8", label: "한류(차가운 해류)" }],
        build() {
          const group = L.layerGroup();
          offsets.forEach((offset) => {
            (extra.currents || []).forEach((current) => {
              const color = current.kind === "warm" ? "#ff5a4e" : "#4f8fe8";
              L.polyline(current.coords.map(([lat, lng]) => [lat, lng + offset]), { color, weight: 3.2, opacity: .95 })
                .bindTooltip(`${current.name}(${current.kind === "warm" ? "난류" : "한류"})`, { sticky: true, className: "feature-tooltip" }).addTo(group);
              arrowMarker(current.coords, offset, color, 16).addTo(group);
            });
          });
          return group;
        }
      },
      winds: {
        label: "바람 띠", group: "line",
        legend: [{ color: "#fff4b8", label: "무역풍·편서풍·극동풍(화살표 방향으로 붐)" }],
        build() {
          const group = L.layerGroup();
          offsets.forEach((offset) => {
            (extra.winds || []).forEach((wind) => {
              L.polyline(wind.coords.map(([lat, lng]) => [lat, lng + offset]), { color: "#fff4b8", weight: 2, opacity: .9 })
                .bindTooltip(wind.name, { sticky: true, className: "feature-tooltip" }).addTo(group);
              arrowMarker(wind.coords, offset, "#fff4b8", 12).addTo(group);
            });
          });
          return group;
        }
      },
      koppen: {
        label: "기후 구분", group: "fill",
        legend: Object.values(extra.koppenClasses || {}).map((entry) => ({ color: entry.color, label: entry.label })),
        build() {
          const group = L.layerGroup();
          const image = buildKoppenImage();
          if (!image) return group;
          offsets.forEach((offset) => {
            L.imageOverlay(image, [[-90, -180 + offset], [90, 180 + offset]], { pane: "koppenPane", opacity: .6, interactive: false, attribution: "기후: Peel et al. 2007" }).addTo(group);
          });
          return group;
        }
      },
      religion: {
        label: "종교", group: "fill",
        legend: Object.values(extra.religionClasses || {}).map((entry) => ({ color: entry.color, label: entry.label })),
        build() { return choropleth((country) => religionOf(country)); }
      },
      density: {
        label: "인구 밀도", group: "fill",
        legend: (extra.densityClasses || []).map((entry) => ({ color: entry.color, label: `${entry.label} 명/km²` })),
        build() { return choropleth((country) => densityClass(country)); }
      },
      region: {
        label: "수능 단원 지역", group: "fill",
        legend: Object.values(extra.regionClasses || {}).map((entry) => ({ color: entry.color, label: entry.label })),
        build() { return choropleth((country) => regionOf(country)); }
      }
    };

    function choropleth(classify) {
      const group = L.layerGroup();
      offsets.forEach((offset) => {
        L.geoJSON(countryCollection, {
          coordsToLatLng: (coords) => L.latLng(coords[1], coords[0] + offset),
          style: (feature) => {
            const entry = classify(feature.properties);
            return { color: "#ffffff", weight: .6, opacity: .7, fillColor: entry ? entry.color : "#777", fillOpacity: entry ? .62 : .15 };
          },
          onEachFeature: (feature, layer) => bindCountry(feature.properties, layer, classify(feature.properties))
        }).addTo(group);
      });
      return group;
    }

    function bindCountry(country, layer, entry) {
      const detail = entry ? ` · ${entry.label}` : "";
      layer.bindTooltip(`${country.name}${detail}`, { sticky: true, className: "feature-tooltip" });
      layer.on("click", () => { if (opts.onCountryClick) opts.onCountryClick(describe(country)); });
    }

    function describe(country) {
      const religion = religionOf(country);
      const region = regionOf(country);
      return {
        iso: country.iso,
        name: country.name,
        en: country.en,
        continent: country.continent,
        sub: country.sub,
        pop: country.pop,
        area: country.area,
        density: densityOf(country),
        religion: religion ? religion.label : null,
        region: region ? region.label : null,
        label: country.label,
        popText: formatCount(country.pop, "명"),
        areaText: formatCount(country.area, "km²"),
        densityText: `${Math.round(densityOf(country))} 명/km²`
      };
    }

    function mount(id) {
      const definition = definitions[id];
      if (!definition) return;
      unmount(id);
      const group = definition.build();
      built.set(id, group);
      group.addTo(map);
    }
    function unmount(id) {
      const group = built.get(id);
      if (group) { map.removeLayer(group); built.delete(id); }
    }

    function setOffsets(nextOffsets) {
      offsets = nextOffsets.slice();
    }
    function refresh() {
      [...built.keys()].forEach(unmount);
      drawOrder.filter((id) => active.has(id)).forEach(mount);
    }
    function setActive(ids) {
      active.clear();
      ids.filter((id) => definitions[id]).forEach((id) => active.add(id));
      refresh();
      if (opts.onChange) opts.onChange([...active]);
    }
    function toggle(id) {
      if (!definitions[id]) return;
      if (active.has(id)) active.delete(id); else active.add(id);
      refresh();
      if (opts.onChange) opts.onChange([...active]);
    }
    function legends() {
      return drawOrder.filter((id) => active.has(id)).filter((id) => definitions[id].legend).map((id) => ({ id, title: definitions[id].label, items: definitions[id].legend }));
    }
    function list() {
      return ["borders", "names", "rivers", "plates", "currents", "winds", "koppen", "religion", "density", "region"].map((id) => ({ id, label: definitions[id].label, group: definitions[id].group, active: active.has(id) }));
    }

    if (!zoomHandlerBound) {
      zoomHandlerBound = true;
      map.on("zoomend", () => {
        [...active].forEach((id) => { if (definitions[id].rebuildOnZoom) mount(id); });
      });
    }

    return { setActive, toggle, refresh, setOffsets, legends, list, describe, countryByIso, has: (id) => active.has(id) };
  }

  window.WorldLayers = { create };
})();
