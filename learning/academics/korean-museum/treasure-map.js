(function () {
  'use strict';

  // --- State Variables ---
  let activeEraFilter = 'all';
  
  let leafletMap = null;
  let mapMarkersGroup = null;
  let mapLabelsGroup = null;
  let koreaSigunguLabels = [];
  let currentActiveRelic = null;

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
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesignation = document.getElementById('modal-designation');
  const modalEra = document.getElementById('modal-era');
  const modalLocation = document.getElementById('modal-location');
  const modalMuseum = document.getElementById('modal-museum');
  const modalDocent = document.getElementById('modal-docent');
  const modalContext = document.getElementById('modal-context');
  const modalExamTip = document.getElementById('modal-exam-tip');

  // Quiz DOM
  const tabDocentBtn = document.getElementById('tab-docent-btn');
  const tabQuizBtn = document.getElementById('tab-quiz-btn');
  const tabDocentContent = document.getElementById('tab-docent-content');
  const tabQuizContent = document.getElementById('tab-quiz-content');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizResult = document.getElementById('quiz-result');

  // Initialize App
  document.addEventListener('DOMContentLoaded', () => {
    initLeafletMap();
    initSmartFilters();
    initQuickSelectDropdown();
    initModalEvents();
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

    mapLabelsGroup = L.layerGroup().addTo(leafletMap);
    mapMarkersGroup = L.featureGroup().addTo(leafletMap);

    renderMapLabels();
    loadSigunguLabels();
    renderMapMarkers();
    leafletMap.on('zoomend moveend', renderMapLabels);

    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 200);

    window.addEventListener('resize', () => {
      if (leafletMap) leafletMap.invalidateSize();
    });
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
          minZoom: 10,
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
        minZoom: 10,
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
    });

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
    relicQuickSelect.innerHTML = `<option value="">⚡ 유물/비석 위치로 바로 순간 이동 (${relics.length}종)</option>`;

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

    tabDocentBtn.addEventListener('click', () => {
      tabDocentBtn.classList.add('active');
      tabQuizBtn.classList.remove('active');
      tabDocentBtn.setAttribute('aria-selected', 'true');
      tabQuizBtn.setAttribute('aria-selected', 'false');
      tabDocentContent.hidden = false;
      tabQuizContent.hidden = true;
    });

    tabQuizBtn.addEventListener('click', () => {
      tabQuizBtn.classList.add('active');
      tabDocentBtn.classList.remove('active');
      tabQuizBtn.setAttribute('aria-selected', 'true');
      tabDocentBtn.setAttribute('aria-selected', 'false');
      tabDocentContent.hidden = true;
      tabQuizContent.hidden = false;
    });
  }

  function openRelicModal(relic) {
    currentActiveRelic = relic;

    // Set Modal Fields
    const artifactImageURL = window.KOREAN_MUSEUM_DATA.makeArtifactTextureSVG(relic.id);
    if (artifactImageURL) {
      modalImage.src = artifactImageURL;
      modalImage.alt = `${relic.title} 실물 자료`;
      modalImage.hidden = false;
      modalImagePlaceholder.hidden = true;
    } else {
      modalImage.removeAttribute('src');
      modalImage.alt = '';
      modalImage.hidden = true;
      modalImagePlaceholder.hidden = false;
    }
    modalMediaTitle.textContent = relic.title;
    modalTitle.textContent = relic.title;
    modalSubtitle.textContent = relic.titleEn;
    modalDesignation.textContent = relic.designation || '국보 유물';
    modalEra.textContent = relic.era;
    modalLocation.textContent = relic.location;
    modalMuseum.textContent = relic.museum;
    modalDocent.textContent = relic.docent;
    modalContext.textContent = relic.context || '';
    modalExamTip.textContent = relic.examTip.replace(/^📌\s*\[내신\/수능 핵심\]\s*/, '');

    // Reset Tabs
    tabDocentBtn.click();

    // Render Quiz
    renderQuiz(relic.quiz);

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

  function renderQuiz(quiz) {
    if (!quiz) return;
    quizQuestion.textContent = quiz.question;
    quizOptions.innerHTML = '';
    quizResult.hidden = true;
    quizResult.className = 'quiz-result-card';

    quiz.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = `${idx + 1}. ${optText}`;
      btn.addEventListener('click', () => {
        checkQuizAnswer(idx, quiz.answer, quiz.explanation);
      });
      quizOptions.appendChild(btn);
    });
  }

  function checkQuizAnswer(selectedIdx, correctIdx, explanation) {
    const allBtns = quizOptions.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIdx) {
        btn.classList.add('correct');
      } else if (i === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    quizResult.hidden = false;
    if (selectedIdx === correctIdx) {
      quizResult.className = 'quiz-result-card success';
      quizResult.innerHTML = `🎉 <strong>정답입니다! (+100점)</strong><p>${explanation}</p>`;
    } else {
      quizResult.className = 'quiz-result-card fail';
      quizResult.innerHTML = `❌ <strong>오답입니다!</strong><p>${explanation}</p>`;
    }
  }

})();
