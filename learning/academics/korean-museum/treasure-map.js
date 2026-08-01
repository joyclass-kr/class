(function () {
  'use strict';

  // --- State Variables ---
  let activeEraFilter = 'all';
  
  let leafletMap = null;
  let mapMarkersGroup = null;
  let mapMarkerLinksGroup = null;
  let mapLabelsGroup = null;
  let mapProvinceBoundariesGroup = null;
  let mapMarkerEntries = [];
  let koreaSigunguLabels = [];
  let currentActiveRelic = null;
  let quizSessionRelics = [];
  let quizSessionIndex = 0;
  let quizSessionScore = 0;
  let quizSessionAnswered = false;
  let quizSessionScope = 'all';
  let quizSessionLevel = 'mixed';

  const KOREA_MAP_LABELS = [
    // Low-zoom labels: keep only the administrative regions students need.
    { name: '서울특별시', lat: 37.5665, lng: 126.9780, minZoom: 7, maxZoom: 14, kind: 'region' },
    { name: '인천광역시', lat: 37.4563, lng: 126.7052, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '경기도', lat: 37.2751, lng: 127.0095, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '강원특별자치도', lat: 37.8228, lng: 128.1555, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '충청북도', lat: 36.6357, lng: 127.4917, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '충청남도', lat: 36.6588, lng: 126.6728, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '세종특별자치시', lat: 36.4800, lng: 127.2890, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '대전광역시', lat: 36.3504, lng: 127.3845, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '전북특별자치도', lat: 35.8203, lng: 127.1088, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '전라남도', lat: 34.8161, lng: 126.4629, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '광주광역시', lat: 35.1595, lng: 126.8526, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '경상북도', lat: 36.5760, lng: 128.5058, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '대구광역시', lat: 35.8714, lng: 128.6014, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '울산광역시', lat: 35.5384, lng: 129.3114, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '경상남도', lat: 35.2383, lng: 128.6924, minZoom: 6, maxZoom: 8, kind: 'region' },
    { name: '부산광역시', lat: 35.1796, lng: 129.0756, minZoom: 8, maxZoom: 14, kind: 'region' },
    { name: '제주특별자치도', lat: 33.3617, lng: 126.5292, minZoom: 6, maxZoom: 8, kind: 'region' },

    // North Korea: province names at overview zoom, major cities when enlarged.
    { name: '평안북도', lat: 40.10, lng: 124.95, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '평안남도', lat: 39.45, lng: 126.05, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '황해북도', lat: 38.55, lng: 126.15, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '황해남도', lat: 38.35, lng: 125.45, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '강원도(북)', lat: 39.20, lng: 127.15, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '함경남도', lat: 40.20, lng: 127.65, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '함경북도', lat: 41.85, lng: 129.45, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '자강도', lat: 40.90, lng: 126.35, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '량강도', lat: 41.50, lng: 128.05, minZoom: 6, maxZoom: 7, kind: 'north-region' },
    { name: '평양', lat: 39.0392, lng: 125.7625, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '개성', lat: 37.9382, lng: 126.5878, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '해주', lat: 38.0400, lng: 125.7150, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '남포', lat: 38.7375, lng: 125.4078, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '신의주', lat: 40.1006, lng: 124.3980, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '원산', lat: 39.1528, lng: 127.4436, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '함흥', lat: 39.9183, lng: 127.5364, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '청진', lat: 41.7956, lng: 129.7758, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '라선', lat: 42.2569, lng: 130.2844, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '강계', lat: 40.9695, lng: 126.5850, minZoom: 8, maxZoom: 14, kind: 'north-city' },
    { name: '혜산', lat: 41.4017, lng: 128.1770, minZoom: 8, maxZoom: 14, kind: 'north-city' },

    // Seoul's 25 districts: always show them together at city-level zoom.
    { name: '종로구', lat: 37.5735, lng: 126.9790, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '중구', lat: 37.5641, lng: 126.9979, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '용산구', lat: 37.5326, lng: 126.9900, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '성동구', lat: 37.5635, lng: 127.0369, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '광진구', lat: 37.5385, lng: 127.0824, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '동대문구', lat: 37.5744, lng: 127.0396, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '중랑구', lat: 37.6063, lng: 127.0927, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '성북구', lat: 37.5894, lng: 127.0167, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '강북구', lat: 37.6396, lng: 127.0257, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '도봉구', lat: 37.6688, lng: 127.0471, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '노원구', lat: 37.6542, lng: 127.0568, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '은평구', lat: 37.6027, lng: 126.9291, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '서대문구', lat: 37.5791, lng: 126.9368, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '마포구', lat: 37.5663, lng: 126.9019, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '양천구', lat: 37.5170, lng: 126.8665, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '강서구', lat: 37.5509, lng: 126.8497, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '구로구', lat: 37.4954, lng: 126.8874, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '금천구', lat: 37.4569, lng: 126.8955, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '영등포구', lat: 37.5264, lng: 126.8963, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '동작구', lat: 37.5124, lng: 126.9393, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '관악구', lat: 37.4784, lng: 126.9516, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '서초구', lat: 37.4837, lng: 127.0324, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '강남구', lat: 37.5172, lng: 127.0473, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '송파구', lat: 37.5145, lng: 127.1059, minZoom: 11, maxZoom: 14, kind: 'district' },
    { name: '강동구', lat: 37.5301, lng: 127.1238, minZoom: 11, maxZoom: 14, kind: 'district' }
  ];

  // --- DOM Elements ---
  const relicQuickSelect = document.getElementById('relic-quick-select');

  // Modal DOM
  const modal = document.getElementById('art-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalImagePlaceholder = document.getElementById('modal-image-placeholder');
  const modalMediaTitle = document.getElementById('modal-media-title');
  const modalMediaKind = document.getElementById('modal-media-kind');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesignation = document.getElementById('modal-designation');
  const modalEra = document.getElementById('modal-era');
  const modalLocation = document.getElementById('modal-location');
  const modalMuseum = document.getElementById('modal-museum');
  const modalDocent = document.getElementById('modal-docent');
  const modalContext = document.getElementById('modal-context');
  const modalExamTip = document.getElementById('modal-exam-tip');

  // Five-question practice DOM
  const quizScopeSelect = document.getElementById('quiz-scope-select');
  const quizLevelSelect = document.getElementById('quiz-level-select');
  const quizSessionStart = document.getElementById('quiz-session-start');
  const quizSessionModal = document.getElementById('quiz-session-modal');
  const quizSessionClose = document.getElementById('quiz-session-close');
  const quizSessionTitle = document.getElementById('quiz-session-title');
  const quizSessionProgress = document.getElementById('quiz-session-progress');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizSessionMedia = document.getElementById('quiz-session-media');
  const quizSessionImage = document.getElementById('quiz-session-image');
  const quizSessionEra = document.getElementById('quiz-session-era');
  const quizSessionQuestion = document.getElementById('quiz-session-question');
  const quizSessionOptions = document.getElementById('quiz-session-options');
  const quizSessionFeedback = document.getElementById('quiz-session-feedback');
  const quizSessionNext = document.getElementById('quiz-session-next');
  const quizSessionRestart = document.getElementById('quiz-session-restart');

  // Initialize App
  document.addEventListener('DOMContentLoaded', () => {
    initLeafletMap();
    initSmartFilters();
    initQuickSelectDropdown();
    initModalEvents();
    initQuizSession();
  });

  // --- 1. Leaflet Map Initialization & Markers ---
  function initLeafletMap() {
    if (typeof L === 'undefined') return;

    // Centered at Korean Peninsula & Manchuria Ji'an
    leafletMap = L.map('map-container', {
      center: [38.2, 127.5],
      zoom: 6,
      minZoom: 3,
      maxZoom: 14,
      zoomControl: true
    });

    // Use a label-free basemap so shops and restaurants do not compete with relics.
    // Korean administrative labels are rendered locally in a separate layer below.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(leafletMap);

    leafletMap.createPane('adminLabels');
    // Administrative names provide context, but relic markers must stay clickable
    // and visually dominant whenever the two overlap.
    leafletMap.getPane('adminLabels').style.zIndex = 550;
    leafletMap.getPane('adminLabels').style.pointerEvents = 'none';

    leafletMap.createPane('provinceBoundaries');
    leafletMap.getPane('provinceBoundaries').style.zIndex = 430;
    leafletMap.getPane('provinceBoundaries').style.pointerEvents = 'none';

    leafletMap.createPane('markerLinks');
    leafletMap.getPane('markerLinks').style.zIndex = 575;
    leafletMap.getPane('markerLinks').style.pointerEvents = 'none';

    mapProvinceBoundariesGroup = L.layerGroup().addTo(leafletMap);
    mapLabelsGroup = L.layerGroup().addTo(leafletMap);
    mapMarkerLinksGroup = L.layerGroup().addTo(leafletMap);
    mapMarkersGroup = L.featureGroup().addTo(leafletMap);

    loadProvinceBoundaries();
    renderMapLabels();
    loadSigunguLabels();
    renderMapMarkers();
    leafletMap.on('zoomend moveend', () => {
      renderMapLabels();
      resolveMarkerOverlaps();
    });

    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 200);

    window.addEventListener('resize', () => {
      if (leafletMap) leafletMap.invalidateSize();
    });
  }

  async function loadProvinceBoundaries() {
    try {
      const response = await fetch('data/skorea-provinces-topo-simple.json?v=20260730-1');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const topology = await response.json();
      const features = topologyToGeoJsonFeatures(topology);
      if (!features.length) throw new Error('No province boundary features');

      L.geoJSON({
        type: 'FeatureCollection',
        features
      }, {
        pane: 'provinceBoundaries',
        interactive: false,
        className: 'leaflet-province-boundaries',
        style: {
          color: '#59758b',
          weight: 1.35,
          opacity: 0.62,
          fill: false,
          lineCap: 'round',
          lineJoin: 'round'
        }
      }).addTo(mapProvinceBoundariesGroup);

      leafletMap.attributionControl.addAttribution(
        '<a href="https://github.com/southkorea/southkorea-maps">시·도 경계: KOSTAT</a>'
      );
    } catch (error) {
      console.warn('시·도 경계선을 불러오지 못했습니다.', error);
    }
  }

  function topologyToGeoJsonFeatures(topology) {
    if (!topology || topology.type !== 'Topology' || !Array.isArray(topology.arcs)) return [];

    const object = Object.values(topology.objects || {})[0];
    if (!object || object.type !== 'GeometryCollection') return [];

    const transform = topology.transform || { scale: [1, 1], translate: [0, 0] };
    const decodedArcs = topology.arcs.map(arc => {
      let x = 0;
      let y = 0;
      return arc.map(point => {
        x += point[0];
        y += point[1];
        return [
          (x * transform.scale[0]) + transform.translate[0],
          (y * transform.scale[1]) + transform.translate[1]
        ];
      });
    });

    const joinArcs = arcIndexes => {
      const coordinates = [];
      arcIndexes.forEach((arcIndex, index) => {
        const arc = arcIndex >= 0
          ? decodedArcs[arcIndex]
          : decodedArcs[~arcIndex].slice().reverse();
        coordinates.push(...(index === 0 ? arc : arc.slice(1)));
      });
      return coordinates;
    };

    return object.geometries
      .filter(geometry => geometry.type === 'Polygon' || geometry.type === 'MultiPolygon')
      .map(geometry => ({
        type: 'Feature',
        properties: geometry.properties || {},
        geometry: {
          type: geometry.type,
          coordinates: geometry.type === 'Polygon'
            ? geometry.arcs.map(joinArcs)
            : geometry.arcs.map(polygon => polygon.map(joinArcs))
        }
      }));
  }

  async function loadSigunguLabels() {
    try {
      const response = await fetch('data/korea-sigungu-centers.csv?v=20260730-7');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const bytes = await response.arrayBuffer();
      const csvText = new TextDecoder('euc-kr').decode(bytes);
      const retiredIncheonCodes = new Set(['28110', '28140', '28260']);

      const rawSigunguLabels = csvText
        .trim()
        .split(/\r?\n/)
        .slice(1)
        .map(line => line.split(','))
        .filter(columns => columns.length >= 5 && !retiredIncheonCodes.has(columns[2]))
        .map(columns => ({
          name: columns[columns.length - 1].trim(),
          lat: Number(columns[1]),
          lng: Number(columns[0]),
          minZoom: 8,
          maxZoom: 14,
          kind: 'municipality',
          code: columns[2]
        }))
        .filter(label => label.name && Number.isFinite(label.lat) && Number.isFinite(label.lng));

      // Seoul alone keeps district-level names. Outside Seoul, merge subdivided
      // cities (for example, "수원시 팔달구") into one city label and omit
      // metropolitan-city districts such as "부산진구".
      const municipalityGroups = new Map();
      rawSigunguLabels.forEach(label => {
        if (label.code.startsWith('11')) return;

        const subdividedCity = label.name.match(/^(.+시)\s+.+구$/u);
        const displayName = subdividedCity ? subdividedCity[1] : label.name;
        if (!subdividedCity && displayName.endsWith('구')) return;
        if (!/(시|군)$/u.test(displayName)) return;

        const group = municipalityGroups.get(displayName) || {
          name: displayName,
          latTotal: 0,
          lngTotal: 0,
          count: 0
        };
        group.latTotal += label.lat;
        group.lngTotal += label.lng;
        group.count += 1;
        municipalityGroups.set(displayName, group);
      });

      koreaSigunguLabels = Array.from(municipalityGroups.values(), group => ({
        name: group.name,
        lat: group.latTotal / group.count,
        lng: group.lngTotal / group.count,
        minZoom: 8,
        maxZoom: 14,
        kind: 'municipality'
      }));

      renderMapLabels();
    } catch (error) {
      console.warn('시·군·구 지도 이름을 불러오지 못했습니다.', error);
    }
  }

  function renderMapLabels() {
    if (!leafletMap || !mapLabelsGroup) return;

    const zoom = leafletMap.getZoom();
    const visibleBounds = leafletMap.getBounds().pad(0.15);
    const labels = KOREA_MAP_LABELS.concat(koreaSigunguLabels);
    const focusedLabel = findFocusedAdminLabel(visibleBounds, zoom);
    if (focusedLabel) labels.push(focusedLabel);
    mapLabelsGroup.clearLayers();

    labels.forEach(label => {
      if (zoom < label.minZoom || zoom > label.maxZoom) return;
      if (!visibleBounds.contains([label.lat, label.lng])) return;

      const icon = L.divIcon({
        className: 'map-admin-label-wrapper',
        html: `<span class="map-admin-label map-admin-label--${label.kind}">${label.name}</span>`,
        iconSize: null
      });

      mapLabelsGroup.addLayer(L.marker([label.lat, label.lng], {
        icon,
        pane: 'adminLabels',
        interactive: false
      }));
    });
  }

  function findFocusedAdminLabel(visibleBounds, zoom) {
    if (!currentActiveRelic || !koreaSigunguLabels.length || zoom < 10) return null;

    const relicText = `${currentActiveRelic.title} ${currentActiveRelic.location} ${currentActiveRelic.museum}`;
    const candidates = koreaSigunguLabels.filter(label => {
      const stem = label.name
        .replace(/^인천\s+/, '')
        .replace(/(특별자치시|특별시|광역시|시|군|구)$/u, '')
        .trim();
      return stem.length >= 2 && relicText.includes(stem);
    });
    if (!candidates.length) return null;

    candidates.sort((a, b) => {
      const distanceA = ((a.lat - currentActiveRelic.lat) ** 2) + ((a.lng - currentActiveRelic.lng) ** 2);
      const distanceB = ((b.lat - currentActiveRelic.lat) ** 2) + ((b.lng - currentActiveRelic.lng) ** 2);
      return distanceA - distanceB;
    });

    const match = candidates[0];
    if (visibleBounds.contains([match.lat, match.lng])) return null;

    return {
      ...match,
      lat: currentActiveRelic.lat,
      lng: currentActiveRelic.lng,
      kind: 'focus'
    };
  }

  function renderMapMarkers() {
    if (!leafletMap || !mapMarkersGroup || !window.KOREAN_MUSEUM_DATA) return;

    // Clear existing markers
    mapMarkersGroup.clearLayers();
    if (mapMarkerLinksGroup) mapMarkerLinksGroup.clearLayers();
    mapMarkerEntries = [];

    const relics = window.KOREAN_MUSEUM_DATA.relicsMaster;
    if (!relics || !relics.length) return;

    relics.forEach(relic => {
      // Check filters
      const matchEra = (activeEraFilter === 'all' || relic.eraCategory === activeEraFilter);
      if (!matchEra) return;

      // Custom Gold Icon Pin
      const pinIcon = L.divIcon({
        className: 'custom-pin-wrapper',
        html: `
          <div class="custom-relic-pin" style="width: 34px; height: 34px;" title="${relic.title}">
            <div class="pin-pulse"></div>
            <span>🏛️</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([relic.lat, relic.lng], { icon: pinIcon })
        .bindTooltip(`<b>${relic.title}</b><br><small>📍 ${relic.location}</small>`, { direction: 'top', offset: [0, -12] });

      marker.on('click', () => {
        openRelicModal(relic);
      });

      mapMarkersGroup.addLayer(marker);
      mapMarkerEntries.push({
        relic,
        marker,
        originalLatLng: L.latLng(relic.lat, relic.lng)
      });
    });

    resolveMarkerOverlaps();

    // Automatically adjust zoom/bounds safely
    if (activeEraFilter !== 'all') {
      if (mapMarkersGroup.getLayers().length > 0) {
        leafletMap.fitBounds(mapMarkersGroup.getBounds(), { padding: [60, 60], maxZoom: 9 });
      }
    } else {
      // Default view comfortably frames Korean Peninsula & Manchuria Ji'an (Gwanggaeto Stele)
      leafletMap.setView([38.2, 127.5], 6);
    }
  }

  function resolveMarkerOverlaps() {
    if (!leafletMap || !mapMarkerEntries.length || !mapMarkerLinksGroup) return;

    const collisionDistance = 50;
    const markerSpacing = 56;
    const mapSize = leafletMap.getSize();
    const visibleBounds = leafletMap.getBounds().pad(0.12);
    mapMarkerLinksGroup.clearLayers();

    mapMarkerEntries.forEach(entry => {
      entry.marker.setLatLng(entry.originalLatLng);
    });

    const visibleEntries = mapMarkerEntries
      .filter(entry => visibleBounds.contains(entry.originalLatLng))
      .map(entry => ({
        ...entry,
        point: leafletMap.latLngToContainerPoint(entry.originalLatLng)
      }));

    const parents = visibleEntries.map((_, index) => index);
    const find = index => {
      while (parents[index] !== index) {
        parents[index] = parents[parents[index]];
        index = parents[index];
      }
      return index;
    };
    const union = (left, right) => {
      const leftRoot = find(left);
      const rightRoot = find(right);
      if (leftRoot !== rightRoot) parents[rightRoot] = leftRoot;
    };

    for (let left = 0; left < visibleEntries.length; left += 1) {
      for (let right = left + 1; right < visibleEntries.length; right += 1) {
        if (visibleEntries[left].point.distanceTo(visibleEntries[right].point) < collisionDistance) {
          union(left, right);
        }
      }
    }

    const clusters = new Map();
    visibleEntries.forEach((entry, index) => {
      const root = find(index);
      const cluster = clusters.get(root) || [];
      cluster.push(entry);
      clusters.set(root, cluster);
    });

    clusters.forEach(cluster => {
      if (cluster.length < 2) return;

      cluster.sort((left, right) => left.relic.id.localeCompare(right.relic.id));
      const center = cluster.reduce(
        (sum, entry) => L.point(sum.x + entry.point.x, sum.y + entry.point.y),
        L.point(0, 0)
      ).divideBy(cluster.length);
      const radius = Math.max(
        32,
        Math.min(118, markerSpacing / (2 * Math.sin(Math.PI / cluster.length)))
      );

      cluster.forEach((entry, index) => {
        const angle = (-Math.PI / 2) + ((Math.PI * 2 * index) / cluster.length);
        const targetPoint = L.point(
          Math.max(24, Math.min(mapSize.x - 24, center.x + (Math.cos(angle) * radius))),
          Math.max(24, Math.min(mapSize.y - 24, center.y + (Math.sin(angle) * radius)))
        );
        const displayLatLng = leafletMap.containerPointToLatLng(targetPoint);

        entry.marker.setLatLng(displayLatLng);
        L.polyline([entry.originalLatLng, displayLatLng], {
          pane: 'markerLinks',
          interactive: false,
          className: 'relic-marker-link',
          color: '#a96a00',
          weight: 1.4,
          opacity: 0.58,
          dashArray: '3 4'
        }).addTo(mapMarkerLinksGroup);
      });
    });
  }

  // --- 3. Smart Filtering & Quick Select System ---
  function initSmartFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.getAttribute('data-filter-type');
        const val = btn.getAttribute('data-value');

        // Update active class in group
        btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (type === 'era') {
          activeEraFilter = val;
        }

        renderMapMarkers();
      });
    });
  }

  function initQuickSelectDropdown() {
    if (!relicQuickSelect || !window.KOREAN_MUSEUM_DATA) return;

    const relics = window.KOREAN_MUSEUM_DATA.relicsMaster;

    // Reset dropdown
    relicQuickSelect.innerHTML = '<option value="">빠른 이동</option>';

    relics.forEach(relic => {
      const opt = document.createElement('option');
      opt.value = relic.id;
      opt.textContent = `[${relic.era.split(' ')[0]}] ${relic.title} (${relic.location})`;
      relicQuickSelect.appendChild(opt);
    });

    relicQuickSelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (!selectedId) return;

      const relic = relics.find(r => r.id === selectedId);
      if (relic && leafletMap) {
        currentActiveRelic = relic;

        // Reset filters if necessary so marker is visible
        activeEraFilter = 'all';

        document.querySelectorAll('.filter-btn').forEach(b => {
          if (b.getAttribute('data-value') === 'all') {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });

        renderMapMarkers();

        // Smooth Fly to location
        leafletMap.flyTo([relic.lat, relic.lng], 11, { animate: true, duration: 1.2 });

        setTimeout(() => {
          openRelicModal(relic);
        }, 1200);
      }
    });
  }

  // --- 4. Modal Popup & Quiz System ---
  function initModalEvents() {
    modalClose.addEventListener('click', closeRelicModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeRelicModal();
    });
  }

  function initQuizSession() {
    if (!quizSessionStart || !quizSessionModal || !quizScopeSelect || !quizLevelSelect) return;

    quizSessionStart.addEventListener('click', startQuizSession);
    quizSessionRestart.addEventListener('click', startQuizSession);
    quizSessionNext.addEventListener('click', () => {
      if (!quizSessionAnswered) return;
      quizSessionIndex += 1;
      renderQuizSessionQuestion();
    });
    quizSessionClose.addEventListener('click', closeQuizSession);
    quizSessionModal.addEventListener('click', (event) => {
      if (event.target === quizSessionModal) closeQuizSession();
    });
  }

  function shuffledCopy(items) {
    const shuffled = items.slice();
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  }

  function startQuizSession() {
    if (!window.KOREAN_MUSEUM_DATA) return;

    quizSessionScope = quizScopeSelect.value;
    quizSessionLevel = quizLevelSelect.value;
    const relicPool = window.KOREAN_MUSEUM_DATA.relicsMaster.filter(relic => (
      relic.quiz && (quizSessionScope === 'all' || relic.eraCategory === quizSessionScope)
    ));
    const selectedRelics = shuffledCopy(relicPool).slice(0, 5);
    const mixedLevels = shuffledCopy(['basic', 'basic', 'inference', 'inference', 'inference']);
    quizSessionRelics = selectedRelics.map((relic, index) => {
      const level = quizSessionLevel === 'mixed' ? mixedLevels[index] : quizSessionLevel;
      return makeQuizSessionItem(relic, level, relicPool);
    });
    quizSessionIndex = 0;
    quizSessionScore = 0;
    quizSessionAnswered = false;

    const scopeOption = quizScopeSelect.options[quizScopeSelect.selectedIndex];
    const levelOption = quizLevelSelect.options[quizLevelSelect.selectedIndex];
    quizSessionTitle.textContent = `${scopeOption.textContent} · ${levelOption.textContent} 5문제`;
    renderQuizSessionQuestion();

    if (!quizSessionModal.open) {
      if (quizSessionModal.showModal) {
        quizSessionModal.showModal();
      } else {
        quizSessionModal.setAttribute('open', 'true');
      }
    }
  }

  function makeQuizSessionItem(relic, level, relicPool) {
    return {
      ...relic,
      quizKind: level === 'inference' ? '추론' : '개념',
      quiz: level === 'inference'
        ? buildInferenceQuiz(relic, relicPool)
        : buildConceptQuiz(relic)
    };
  }

  function buildConceptQuiz(relic) {
    const eraOrder = ['prehistoric', 'three_kingdoms', 'unified_silla', 'goryeo', 'joseon', 'modern'];
    const comparisonRelics = [relic];
    const otherCategories = shuffledCopy(eraOrder.filter(category => category !== relic.eraCategory));

    for (const category of otherCategories) {
      const candidates = shuffledCopy(window.KOREAN_MUSEUM_DATA.relicsMaster.filter(candidate => (
        candidate.id !== relic.id && candidate.eraCategory === category
      )));
      if (candidates.length) comparisonRelics.push(candidates[0]);
      if (comparisonRelics.length === 4) break;
    }

    const chronological = comparisonRelics
      .slice()
      .sort((a, b) => eraOrder.indexOf(a.eraCategory) - eraOrder.indexOf(b.eraCategory));
    const correctSequence = formatRelicSequence(chronological);
    const optionSequences = [correctSequence];
    const permutationPatterns = [
      [1, 0, 2, 3],
      [0, 2, 1, 3],
      [3, 1, 2, 0],
      [2, 3, 0, 1],
      [1, 3, 0, 2]
    ];
    for (const pattern of shuffledCopy(permutationPatterns)) {
      const sequence = formatRelicSequence(pattern.map(index => chronological[index]));
      if (!optionSequences.includes(sequence)) optionSequences.push(sequence);
      if (optionSequences.length === 4) break;
    }

    return {
      question: '다음 유물·유적을 제작·조성된 시기가 이른 것부터 순서대로 바르게 나열한 것은?',
      options: optionSequences,
      answer: 0,
      explanation: chronological
        .map(item => `${item.title}(${item.era})`)
        .join(' → ')
    };
  }

  function formatRelicSequence(relics) {
    return relics.map(item => item.title).join(' → ');
  }

  function buildInferenceQuiz(relic, relicPool) {
    const sentences = getContextSentences(relic);
    const source = sentences[0];
    const profile = getHistoricalProfile(relic);
    return {
      question: `[자료]\n${source}\n\n${profile.question}`,
      options: profile.options,
      answer: 0,
      explanation: `제시된 자료는 ${relic.title}입니다. ${profile.explanation} 핵심 연결: ${cleanExamTip(relic.examTip)}`
    };
  }

  function getHistoricalProfile(relic) {
    const id = relic.id;
    const title = relic.title;
    if (id === 'p05') return HISTORICAL_PROFILES.paleolithic;
    if (['p01', 'p11'].includes(id)) return HISTORICAL_PROFILES.neolithic;
    if (['p02', 'p03', 'p04', 'p06', 'p07', 'p08'].includes(id)) return HISTORICAL_PROFILES.bronze;
    if (id === 'p09') return HISTORICAL_PROFILES.earlyIron;
    if (id.startsWith('g')) return HISTORICAL_PROFILES.goguryeo;
    if (id.startsWith('b') || title.includes('칠지도')) return HISTORICAL_PROFILES.baekje;
    if (id === 'a01') return HISTORICAL_PROFILES.gaya;
    if (['s01', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's16'].includes(id)) return HISTORICAL_PROFILES.silla;
    if (['s13', 's14', 's17'].includes(id)) return HISTORICAL_PROFILES.balhae;
    if (id.startsWith('s')) return HISTORICAL_PROFILES.unifiedSilla;
    if (id.startsWith('k')) return HISTORICAL_PROFILES.goryeo;
    if (['j01', 'j02', 'j03', 'j12', 'j13', 'j14'].includes(id)) return HISTORICAL_PROFILES.sejong;
    if (['j04', 'j06', 'j07', 'j08', 'j20'].includes(id)) return HISTORICAL_PROFILES.earlyJoseon;
    if (['j09', 'j10', 'j11', 'j15', 'j17', 'j18', 'l01', 'l02', 'l03', 'l04'].includes(id)) return HISTORICAL_PROFILES.lateJoseon;
    if (id === 'm04') return HISTORICAL_PROFILES.daewongun;
    if (['m01', 'm05'].includes(id)) return HISTORICAL_PROFILES.independenceClub;
    if (title.includes('3·1') || title.includes('임시정부')) return HISTORICAL_PROFILES.marchFirst;
    if (id === 'm06') return HISTORICAL_PROFILES.liberation;
    return HISTORICAL_PROFILES.joseonCulture;
  }

  const HISTORICAL_PROFILES = {
    paleolithic: {
      question: '이 자료를 사용하던 사람들의 생활 모습으로 가장 적절한 것은?',
      options: ['동굴이나 막집에 거주하며 사냥과 채집을 하였다.', '벼농사를 바탕으로 계급 사회를 형성하였다.', '철제 농기구를 이용해 깊이갈이를 하였다.', '주로 지상 가옥을 짓고 목축에 종사하였다.'],
      explanation: '구석기인은 뗀석기를 사용하며 이동 생활을 했습니다.'
    },
    neolithic: {
      question: '이 자료가 나타난 시대의 사회 모습으로 옳은 것은?',
      options: ['농경과 목축이 시작되고 정착 생활이 확대되었다.', '군장이 청동 무기를 독점하며 국가를 형성하였다.', '철제 농기구가 보급되어 생산력이 크게 증가하였다.', '율령을 반포하고 불교를 공인하였다.'],
      explanation: '신석기 시대에는 농경이 시작되고 움집을 중심으로 정착 생활이 이루어졌습니다.'
    },
    bronze: {
      question: '이 자료가 사용된 시대의 변화로 가장 적절한 것은?',
      options: ['잉여 생산물이 늘면서 사유 재산과 계급이 나타났다.', '골품제가 폐지되고 유교 정치가 확립되었다.', '과거제가 실시되어 문신 관료가 성장하였다.', '상품 화폐 경제가 발달하고 공인이 등장하였다.'],
      explanation: '청동기 시대에는 농업 생산력이 늘고 지배자와 피지배자의 구분이 생겼습니다.'
    },
    earlyIron: {
      question: '이 자료가 확산되던 시기의 변화로 옳은 것은?',
      options: ['철제 농기구와 무기가 보급되고 여러 나라가 성장하였다.', '금속 활자로 불교 경전을 인쇄하였다.', '주자감에서 유교 경전을 교육하였다.', '전국에 서원을 세워 성리학을 보급하였다.'],
      explanation: '초기 철기 시대에는 철제 도구가 보급되고 부여·고구려·옥저·동예·삼한 등이 성장했습니다.'
    },
    goguryeo: {
      question: '이 자료가 속한 나라에 대한 설명으로 옳은 것은?',
      options: ['제가 회의에서 국가의 중대사를 결정하였다.', '정사암 회의에서 재상을 선출하였다.', '화백 회의에서 만장일치로 국사를 결정하였다.', '대대로와 상좌평을 두어 국정을 운영하였다.'],
      explanation: '고구려에서는 귀족 대표들이 제가 회의를 열어 국가의 중요한 일을 결정했습니다.'
    },
    baekje: {
      question: '이 자료가 속한 나라의 문화 교류에 대한 설명으로 옳은 것은?',
      options: ['아직기와 왕인을 보내 왜에 한문과 유학을 전하였다.', '혜초가 인도와 중앙아시아를 순례하였다.', '장보고가 청해진을 설치해 해상 무역을 장악하였다.', '이슬람 상인이 벽란도에 왕래하였다.'],
      explanation: '백제는 중국 남조 및 왜와 활발히 교류했고 일본 고대 문화 형성에 영향을 주었습니다.'
    },
    gaya: {
      question: '이 자료와 관련된 연맹 왕국에 대한 설명으로 옳은 것은?',
      options: ['낙동강 유역의 철을 주변 국가와 왜에 수출하였다.', '한강 유역을 차지하고 북한산에 순수비를 세웠다.', '중국 남조와 교류하며 웅진으로 천도하였다.', '당의 산둥반도를 공격하고 요서 지방을 점령하였다.'],
      explanation: '가야는 풍부한 철을 생산해 낙랑·왜 등과 교역했습니다.'
    },
    silla: {
      question: '이 자료가 속한 나라의 정치·사회 모습으로 옳은 것은?',
      options: ['골품에 따라 관등 승진과 일상생활에 제약을 받았다.', '제가 회의에서 왕을 선출하고 중대사를 결정하였다.', '22담로에 왕족을 파견해 지방을 통제하였다.', '5경 15부 62주의 지방 제도를 운영하였다.'],
      explanation: '신라는 골품제를 통해 관등과 관직, 혼인과 가옥 규모까지 제한했습니다.'
    },
    unifiedSilla: {
      question: '이 자료가 제작된 시기의 사회 모습으로 옳은 것은?',
      options: ['국학을 설치하고 유교 경전을 교육하였다.', '태학을 세우고 율령을 반포하였다.', '주자감을 설치해 유학생을 당에 파견하였다.', '성균관을 정비하고 소학을 보급하였다.'],
      explanation: '통일 신라는 신문왕 때 국학을 설치해 유교 교육을 강화했습니다.'
    },
    balhae: {
      question: '이 자료가 속한 나라에 대한 설명으로 옳은 것은?',
      options: ['고구려 계승 의식을 내세우며 3성 6부제를 운영하였다.', '독서삼품과를 실시해 관리를 선발하였다.', '9서당 10정을 두어 중앙과 지방을 방어하였다.', '상수리 제도를 실시해 지방 세력을 견제하였다.'],
      explanation: '발해는 고구려를 계승하면서 당의 제도를 받아들여 3성 6부제를 운영했습니다.'
    },
    goryeo: {
      question: '이 자료가 제작·발달한 왕조의 문화에 대한 설명으로 옳은 것은?',
      options: ['불교가 성행하고 지방 문화의 특색이 함께 나타났다.', '성리학을 통치 이념으로 삼아 불교 행사를 억제하였다.', '서민 문화가 성장하며 판소리와 탈춤이 유행하였다.', '신문과 잡지를 통해 국문 문학이 확산되었다.'],
      explanation: '고려 문화는 불교와 귀족 문화가 중심이면서 지방적 특색과 다원성이 나타났습니다.'
    },
    sejong: {
      question: '이 자료와 관련된 국왕의 재위 시기에 있었던 사실로 옳은 것은?',
      options: ['우리 풍토에 맞는 농법을 정리한 농사직설을 편찬하였다.', '경국대전을 완성해 유교적 통치 체제를 정비하였다.', '속대전을 편찬하고 균역법을 실시하였다.', '대전회통을 편찬하고 경복궁을 중건하였다.'],
      explanation: '세종 때 농사직설·칠정산을 편찬하고 훈민정음을 창제하는 등 민생과 과학을 중시했습니다.'
    },
    earlyJoseon: {
      question: '이 자료가 제작·조성된 조선 전기의 모습으로 옳은 것은?',
      options: ['의정부와 6조를 중심으로 유교적 통치 체제를 정비하였다.', '붕당이 예송과 환국을 거치며 대립하였다.', '세도 정치로 삼정의 문란이 심화되었다.', '통리기무아문을 설치하고 별기군을 창설하였다.'],
      explanation: '조선 전기에는 중앙 집권적 양반 관료 체제와 유교 통치 질서가 정비되었습니다.'
    },
    lateJoseon: {
      question: '이 자료가 발달한 조선 후기의 사회·문화 모습으로 옳은 것은?',
      options: ['상품 화폐 경제가 성장하고 서민 문화가 발달하였다.', '관학 진흥을 위해 국자감을 설치하였다.', '귀족이 녹읍과 식읍을 지급받았다.', '진대법을 실시해 빈민을 구제하였다.'],
      explanation: '조선 후기에는 상공업과 상품 화폐 경제가 성장하고 실학·서민 문화가 발달했습니다.'
    },
    joseonCulture: {
      question: '이 자료가 속한 조선 왕조의 문화적 특징으로 옳은 것은?',
      options: ['성리학적 질서를 바탕으로 기록과 편찬 사업을 중시하였다.', '골품제를 바탕으로 화랑도를 국가 조직으로 개편하였다.', '독서삼품과를 통해 유교 경전 독해 능력을 평가하였다.', '과거제를 처음 도입하고 쌍기의 건의를 받아들였다.'],
      explanation: '조선은 성리학을 통치 이념으로 삼고 국가 주도의 기록·편찬 사업을 활발히 전개했습니다.'
    },
    daewongun: {
      question: '이 자료와 관련된 집권자가 추진한 정책으로 옳은 것은?',
      options: ['서원을 대폭 정리하고 호포제를 실시하였다.', '별기군을 창설하고 조사 시찰단을 파견하였다.', '과거제를 폐지하고 신분제를 철폐하였다.', '통감부를 설치하고 외교권을 박탈하였다.'],
      explanation: '흥선 대원군은 서원 철폐, 호포제, 경복궁 중건 등을 추진했습니다.'
    },
    independenceClub: {
      question: '이 자료와 관련된 단체의 활동으로 옳은 것은?',
      options: ['관민 공동회를 열고 헌의 6조를 결의하였다.', '복벽주의를 내세우며 독립 의군부를 조직하였다.', '신흥 강습소를 세워 독립군을 양성하였다.', '조선 혁명 선언을 활동 지침으로 삼았다.'],
      explanation: '독립 협회는 만민 공동회와 관민 공동회를 개최하고 의회 설립 운동을 전개했습니다.'
    },
    marchFirst: {
      question: '이 자료와 관련된 운동의 영향으로 옳은 것은?',
      options: ['국내외 독립운동 세력이 대한민국 임시정부로 통합되었다.', '고종이 강제 퇴위하고 군대가 해산되었다.', '신민회가 해체되고 105인 사건이 일어났다.', '조선 총독부가 회사령을 처음 제정하였다.'],
      explanation: '3·1 운동은 대한민국 임시정부 수립과 일제 통치 방식 변화에 영향을 주었습니다.'
    },
    liberation: {
      question: '이 자료와 관련된 광복 직후의 사실로 옳은 것은?',
      options: ['모스크바 3국 외상 회의 결정에 따라 미소 공동위원회가 열렸다.', '좌우 합작 위원회가 남북 협상을 주도해 단독 정부 수립을 막았다.', '국제 연합 감시 아래 한반도 전역에서 총선거가 실시되었다.', '반민족 행위 특별 조사 위원회가 미군정 시기에 설치되었다.'],
      explanation: '광복 뒤 모스크바 3국 외상 회의 결정에 따라 미소 공동위원회가 개최되었습니다.'
    }
  };

  function getContextSentences(relic) {
    const text = String(relic.context || relic.docent || '').trim();
    const sentences = text.match(/[^.!?]+[.!?]?/g)
      ?.map(sentence => sentence.trim())
      .filter(Boolean) || [];
    return sentences.length ? sentences : [text];
  }

  function selectClaimDistractors(relic, relicPool, sentenceIndex, correctClaim) {
    const sameEra = shuffledCopy(relicPool.filter(candidate => (
      candidate.id !== relic.id && candidate.eraCategory === relic.eraCategory
    )));
    const otherEras = shuffledCopy(window.KOREAN_MUSEUM_DATA.relicsMaster.filter(candidate => (
      candidate.id !== relic.id && candidate.eraCategory !== relic.eraCategory
    )));
    const candidates = [...sameEra, ...otherEras];
    const claims = [];
    for (const candidate of candidates) {
      const sentences = getContextSentences(candidate);
      const claim = sentences[sentenceIndex] || sentences[0] || cleanExamTip(candidate.examTip);
      if (claim && claim !== correctClaim && !claims.includes(claim)) claims.push(claim);
      if (claims.length === 3) break;
    }
    return claims;
  }

  function cleanExamTip(examTip) {
    return String(examTip || '')
      .replace(/^📌\s*\[내신\/수능 핵심\]\s*/, '')
      .replace(/^📌\s*/, '')
      .trim();
  }

  function renderQuizSessionQuestion() {
    const total = quizSessionRelics.length;
    if (quizSessionIndex >= total) {
      renderQuizSessionResult();
      return;
    }

    const relic = quizSessionRelics[quizSessionIndex];
    const randomizedOptions = shuffledCopy(
      relic.quiz.options.map((text, index) => ({ text, correct: index === relic.quiz.answer }))
    );

    quizSessionAnswered = false;
    quizSessionEra.hidden = false;
    quizSessionEra.textContent = relic.quizKind === '추론'
      ? '유물·유적 자료 분석 · 추론형'
      : '한국사 시대 흐름 · 개념형';
    quizSessionMedia.hidden = relic.quizKind !== '추론';
    if (relic.quizKind === '추론') {
      quizSessionImage.src = window.KOREAN_MUSEUM_DATA.makeArtifactTextureSVG(relic.id);
      quizSessionImage.alt = '문제에 제시된 유물·유적 자료';
    } else {
      quizSessionImage.removeAttribute('src');
    }
    quizSessionQuestion.textContent = relic.quiz.question;
    quizSessionProgress.textContent = `${quizSessionIndex + 1} / ${total} · 현재 ${quizSessionScore}점`;
    quizProgressFill.style.width = `${(quizSessionIndex / total) * 100}%`;
    quizSessionOptions.innerHTML = '';
    quizSessionFeedback.hidden = true;
    quizSessionFeedback.className = 'quiz-result-card';
    quizSessionNext.hidden = true;
    quizSessionRestart.hidden = true;

    randomizedOptions.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'quiz-opt-btn';
      button.type = 'button';
      button.dataset.correct = String(option.correct);
      button.textContent = `${index + 1}. ${option.text}`;
      button.addEventListener('click', () => answerQuizSession(button, option.correct, relic));
      quizSessionOptions.appendChild(button);
    });
  }

  function answerQuizSession(selectedButton, isCorrect, relic) {
    if (quizSessionAnswered) return;
    if (!isCorrect) {
      selectedButton.classList.add('wrong');
      selectedButton.disabled = true;
      quizSessionFeedback.textContent = '다시 생각하고 다른 답을 골라보세요.';
      quizSessionFeedback.className = 'quiz-result-card fail';
      quizSessionFeedback.hidden = false;
      return;
    }
    quizSessionAnswered = true;
    if (isCorrect) quizSessionScore += 1;

    quizSessionOptions.querySelectorAll('.quiz-opt-btn').forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') button.classList.add('correct');
    });
    quizSessionFeedback.innerHTML = '';
    const resultTitle = document.createElement('strong');
    resultTitle.textContent = '정답입니다!';
    const explanation = document.createElement('p');
    explanation.textContent = `${relic.title} · ${relic.quiz.explanation}`;
    quizSessionFeedback.append(resultTitle, explanation);
    quizSessionFeedback.className = `quiz-result-card ${isCorrect ? 'success' : 'fail'}`;
    quizSessionFeedback.hidden = false;
    quizSessionProgress.textContent = `${quizSessionIndex + 1} / ${quizSessionRelics.length} · 현재 ${quizSessionScore}점`;
    quizProgressFill.style.width = `${((quizSessionIndex + 1) / quizSessionRelics.length) * 100}%`;
    quizSessionNext.textContent = quizSessionIndex === quizSessionRelics.length - 1 ? '결과 보기' : '다음 문제';
    quizSessionNext.hidden = false;
  }

  function renderQuizSessionResult() {
    const total = quizSessionRelics.length;
    const percentage = Math.round((quizSessionScore / total) * 100);
    quizSessionEra.hidden = true;
    quizSessionMedia.hidden = true;
    quizSessionImage.removeAttribute('src');
    quizSessionQuestion.textContent = '5문제 풀이 완료';
    quizSessionProgress.textContent = `완료 · ${quizSessionScore} / ${total}`;
    quizProgressFill.style.width = '100%';
    quizSessionOptions.innerHTML = '';
    quizSessionFeedback.innerHTML = '';

    const resultTitle = document.createElement('strong');
    resultTitle.textContent = `${quizSessionScore}개 정답 · ${percentage}점`;
    const resultMessage = document.createElement('p');
    resultMessage.textContent = percentage >= 80
      ? '핵심 유물과 유적을 잘 구분하고 있습니다.'
      : '틀린 문제의 유물 카드를 다시 확인해 보세요.';
    quizSessionFeedback.append(resultTitle, resultMessage);
    quizSessionFeedback.className = `quiz-result-card ${percentage >= 80 ? 'success' : 'fail'}`;
    quizSessionFeedback.hidden = false;
    quizSessionNext.hidden = true;
    quizSessionRestart.hidden = false;
  }

  function closeQuizSession() {
    if (quizSessionModal.close) {
      quizSessionModal.close();
    } else {
      quizSessionModal.removeAttribute('open');
    }
  }

  function openRelicModal(relic) {
    currentActiveRelic = relic;

    // Set Modal Fields
    const artifactImageURL = window.KOREAN_MUSEUM_DATA.makeArtifactTextureSVG(relic.id);
    const mediaLabel = relic.mediaLabel || '실물 자료';
    if (artifactImageURL) {
      modalImage.src = artifactImageURL;
      modalImage.alt = `${relic.title} ${mediaLabel}`;
      modalImage.hidden = false;
      modalImagePlaceholder.hidden = true;
    } else {
      modalImage.removeAttribute('src');
      modalImage.alt = '';
      modalImage.hidden = true;
      modalImagePlaceholder.hidden = false;
    }
    modalMediaKind.textContent = mediaLabel;
    modalMediaTitle.textContent = relic.title;
    modalTitle.textContent = relic.title;
    modalSubtitle.textContent = relic.titleEn;
    modalDesignation.textContent = relic.designation || '국보 유물';
    modalEra.textContent = relic.era;
    modalLocation.textContent = relic.location;
    modalMuseum.textContent = relic.museum;
    modalDocent.textContent = relic.docent;
    modalContext.textContent = relic.context || '';
    modalExamTip.textContent = cleanExamTip(relic.examTip);

    if (modal.showModal) {
      modal.showModal();
    } else {
      modal.setAttribute('open', 'true');
    }
  }

  function closeRelicModal() {
    if (modal.close) {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

})();
