(function () {
  'use strict';

  // --- State Variables ---
  let currentMode = 'map'; // 'map' or '3d'
  let activeEraFilter = 'all';
  let activeRouteFilter = 'all';
  
  let leafletMap = null;
  let mapMarkersGroup = null;
  let currentActiveRelic = null;

  // Three.js State
  let scene, camera, renderer;
  let is3DInitialized = false;

  // --- DOM Elements ---
  const btnModeMap = document.getElementById('btn-mode-map');
  const btnMode3D = document.getElementById('btn-mode-3d');
  const filterBar = document.getElementById('filter-bar');
  const galleryNav = document.getElementById('gallery-nav');
  const mapContainer = document.getElementById('map-container');
  const museum3DContainer = document.getElementById('museum-3d-container');
  const relicQuickSelect = document.getElementById('relic-quick-select');

  // Modal DOM
  const modal = document.getElementById('art-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesignation = document.getElementById('modal-designation');
  const modalEra = document.getElementById('modal-era');
  const modalRoute = document.getElementById('modal-route');
  const modalLocation = document.getElementById('modal-location');
  const modalMuseum = document.getElementById('modal-museum');
  const modalDocent = document.getElementById('modal-docent');
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
    initModeSwitcher();
    initLeafletMap();
    initSmartFilters();
    initQuickSelectDropdown();
    initModalEvents();
  });

  // --- 1. Mode Switcher (Map vs 3D Museum) ---
  function initModeSwitcher() {
    btnModeMap.addEventListener('click', () => switchMode('map'));
    btnMode3D.addEventListener('click', () => switchMode('3d'));
  }

  function switchMode(mode) {
    currentMode = mode;
    if (mode === 'map') {
      btnModeMap.classList.add('active');
      btnMode3D.classList.remove('active');
      filterBar.style.display = 'flex';
      galleryNav.style.display = 'none';
      mapContainer.style.display = 'block';
      museum3DContainer.style.display = 'none';
      if (leafletMap) leafletMap.invalidateSize();
    } else {
      btnMode3D.classList.add('active');
      btnModeMap.classList.remove('active');
      filterBar.style.display = 'none';
      galleryNav.style.display = 'block';
      mapContainer.style.display = 'none';
      museum3DContainer.style.display = 'block';
      
      if (!is3DInitialized) {
        init3DMuseum();
        is3DInitialized = true;
      }
    }
  }

  // --- 2. Leaflet Map Initialization & Markers ---
  function initLeafletMap() {
    if (typeof L === 'undefined') return;

    // Centered at Korean Peninsula & Manchuria Ji'an
    leafletMap = L.map('map-container', {
      center: [38.2, 127.5],
      zoom: 6,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: true
    });

    // CartoDB Dark Matter Tile Layer (High Definition Dark Map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(leafletMap);

    mapMarkersGroup = L.featureGroup().addTo(leafletMap);

    renderMapMarkers();

    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 200);

    window.addEventListener('resize', () => {
      if (leafletMap) leafletMap.invalidateSize();
    });
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
      const matchRoute = (activeRouteFilter === 'all' || relic.route === activeRouteFilter);

      if (!matchEra || !matchRoute) return;

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
    if (activeRouteFilter === '해외선') {
      if (mapMarkersGroup.getLayers().length > 0) {
        leafletMap.fitBounds(mapMarkersGroup.getBounds(), { padding: [60, 60], maxZoom: 6 });
      }
    } else if (activeEraFilter !== 'all' || activeRouteFilter !== 'all') {
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
        } else if (type === 'route') {
          activeRouteFilter = val;
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
        // Reset filters if necessary so marker is visible
        activeEraFilter = 'all';
        activeRouteFilter = 'all';

        document.querySelectorAll('.filter-btn').forEach(b => {
          if (b.getAttribute('data-value') === 'all') {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });

        renderMapMarkers();

        // Smooth Fly to location
        leafletMap.flyTo([relic.lat, relic.lng], 10, { animate: true, duration: 1.2 });

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
      tabDocentContent.style.display = 'flex';
      tabQuizContent.style.display = 'none';
    });

    tabQuizBtn.addEventListener('click', () => {
      tabQuizBtn.classList.add('active');
      tabDocentBtn.classList.remove('active');
      tabDocentContent.style.display = 'none';
      tabQuizContent.style.display = 'flex';
    });
  }

  function openRelicModal(relic) {
    currentActiveRelic = relic;

    // Set Modal Fields
    modalImage.src = window.KOREAN_MUSEUM_DATA.makeArtifactTextureSVG(relic.id);
    modalTitle.textContent = relic.title;
    modalSubtitle.textContent = relic.titleEn;
    modalDesignation.textContent = relic.designation || '국보 유물';
    modalEra.textContent = relic.era;
    modalRoute.textContent = `🛣️ ${relic.route}`;
    modalLocation.textContent = relic.location;
    modalMuseum.textContent = relic.museum;
    modalDocent.textContent = relic.docent;
    modalExamTip.textContent = relic.examTip;

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
    quizResult.style.display = 'none';

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

    quizResult.style.display = 'block';
    if (selectedIdx === correctIdx) {
      quizResult.className = 'quiz-result-card success';
      quizResult.innerHTML = `🎉 <strong>정답입니다! (+100점)</strong><p>${explanation}</p>`;
    } else {
      quizResult.className = 'quiz-result-card fail';
      quizResult.innerHTML = `❌ <strong>오답입니다!</strong><p>${explanation}</p>`;
    }
  }

  // --- 5. 3D Museum Fallback Engine ---
  function init3DMuseum() {
    const container = museum3DContainer;
    container.innerHTML = '';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);

    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Simple Gallery Pedestal & Display
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const pedGeo = new THREE.CylinderGeometry(0.8, 1, 1.2, 32);
    const pedMat = new THREE.MeshStandardMaterial({ color: 0x2a2e39, metalness: 0.3 });
    const ped = new THREE.Mesh(pedGeo, pedMat);
    ped.position.set(0, 0.6, 0);
    scene.add(ped);

    // Artifact Frame
    const artGeo = new THREE.BoxGeometry(1.2, 1.6, 0.1);
    const artMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
    const art = new THREE.Mesh(artGeo, artMat);
    art.position.set(0, 2, 0);
    scene.add(art);

    function animate() {
      requestAnimationFrame(animate);
      art.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      if (!renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
})();
