(function () {
  'use strict';

  // --- State Variables ---
  let activeEraFilter = 'all';
  
  let leafletMap = null;
  let mapMarkersGroup = null;
  let currentActiveRelic = null;

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
      maxZoom: 18,
      zoomControl: true
    });

    // CARTO Voyager keeps coastlines, roads, and place names readable.
    // A restrained navy treatment is applied in CSS to preserve the treasure-map mood.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
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
