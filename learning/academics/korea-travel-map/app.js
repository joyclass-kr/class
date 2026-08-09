(() => {
  const places = Array.isArray(window.KOREA_TRAVEL_PLACES) ? window.KOREA_TRAVEL_PLACES : [];
  const images = window.KOREA_TRAVEL_IMAGES || {};
  const labels = [
    ['서울특별시', 37.5665, 126.9780], ['인천광역시', 37.4563, 126.7052], ['경기도', 37.42, 127.20], ['강원특별자치도', 37.68, 128.30],
    ['충청북도', 36.73, 127.75], ['충청남도', 36.53, 126.80], ['대전광역시', 36.3504, 127.3845], ['세종특별자치시', 36.48, 127.289],
    ['전북특별자치도', 35.72, 127.12], ['전라남도', 34.82, 126.78], ['광주광역시', 35.1595, 126.8526], ['경상북도', 36.36, 128.70],
    ['경상남도', 35.25, 128.25], ['대구광역시', 35.8714, 128.6014], ['울산광역시', 35.5384, 129.3114], ['부산광역시', 35.1796, 129.0756],
    ['제주특별자치도', 33.37, 126.53]
  ];

  const modal = document.querySelector('#placeModal');
  const modalClose = document.querySelector('#modalClose');
  let membership = null;
  let currentPlace = places[0] || null;
  let currentCategory = 'all';
  let routeLine = null;
  let schoolOriginMarker = null;
  let routeRequestId = 0;

  const map = L.map('map-container', {
    center: [36.15, 127.75], zoom: 7, minZoom: 6, maxZoom: 14,
    zoomControl: true, attributionControl: true, preferCanvas: true
  });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 20
  }).addTo(map);

  const modalRouteMap = L.map('modalRouteMap', {
    center: [36.15, 127.75], zoom: 6, minZoom: 5, maxZoom: 15,
    zoomControl: true, attributionControl: true
  });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 20
  }).addTo(modalRouteMap);

  map.createPane('provinceBoundaries');
  map.getPane('provinceBoundaries').style.zIndex = 430;
  map.getPane('provinceBoundaries').style.pointerEvents = 'none';
  map.createPane('adminLabels');
  map.getPane('adminLabels').style.zIndex = 440;
  map.getPane('adminLabels').style.pointerEvents = 'none';

  const boundaryLayer = L.layerGroup().addTo(map);
  const labelLayer = L.layerGroup().addTo(map);
  const markerLayer = L.featureGroup().addTo(map);
  const modalRouteLayer = L.layerGroup().addTo(modalRouteMap);

  async function loadBoundaries() {
    try {
      const response = await fetch('../korean-museum/data/skorea-provinces-topo-simple.json?v=20260730-1');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const topology = await response.json();
      const features = topologyToFeatures(topology);
      L.geoJSON({ type: 'FeatureCollection', features }, {
        pane: 'provinceBoundaries', interactive: false,
        style: { color: '#557a86', weight: 1.45, opacity: 0.72, fillColor: '#f5edd0', fillOpacity: 0.13, lineCap: 'round', lineJoin: 'round' }
      }).addTo(boundaryLayer);
    } catch (error) {
      console.warn('시·도 경계를 불러오지 못했습니다.', error);
    }
  }

  function topologyToFeatures(topology) {
    if (!topology || topology.type !== 'Topology' || !Array.isArray(topology.arcs)) return [];
    const object = Object.values(topology.objects || {})[0];
    if (!object || object.type !== 'GeometryCollection') return [];
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
      .filter((item) => item.type === 'Polygon' || item.type === 'MultiPolygon')
      .map((item) => ({
        type: 'Feature', properties: item.properties || {},
        geometry: { type: item.type, coordinates: item.type === 'Polygon' ? item.arcs.map(join) : item.arcs.map((polygon) => polygon.map(join)) }
      }));
  }

  function renderLabels() {
    labelLayer.clearLayers();
    labels.forEach(([name, lat, lng]) => {
      const icon = L.divIcon({
        className: 'map-admin-label-wrapper',
        html: `<span class="map-admin-label">${name}</span>`,
        iconSize: [112, 24], iconAnchor: [56, 12]
      });
      labelLayer.addLayer(L.marker([lat, lng], { icon, pane: 'adminLabels', interactive: false }));
    });
  }

  function markerIcon(place) {
    return L.divIcon({
      className: 'travel-icon-wrapper',
      html: `<button class="travel-marker ${place.category}" type="button" aria-label="${place.name} 자세히 보기"><span aria-hidden="true">${place.emoji}</span></button>`,
      iconSize: [44, 44], iconAnchor: [22, 22]
    });
  }

  function clusterIcon(count) {
    return L.divIcon({
      className: 'travel-cluster-wrapper',
      html: `<button class="travel-cluster" type="button" aria-label="가까이 모인 체험 장소 ${count}곳 확대하기"><strong>${count}</strong><span>곳</span></button>`,
      iconSize: [50, 50], iconAnchor: [25, 25]
    });
  }

  function groupedPlaces(filteredPlaces) {
    if (map.getZoom() >= 9) return filteredPlaces.map((place) => [place]);
    const cellSize = map.getZoom() <= 7 ? 72 : 56;
    const groups = new Map();
    filteredPlaces.forEach((place) => {
      const point = map.project([place.lat, place.lng], map.getZoom());
      const key = `${Math.floor(point.x / cellSize)}:${Math.floor(point.y / cellSize)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(place);
    });
    return [...groups.values()];
  }

  function renderMarkers() {
    markerLayer.clearLayers();
    const filtered = places.filter((place) => currentCategory === 'all' || place.category === currentCategory);
    groupedPlaces(filtered).forEach((group) => {
      if (group.length === 1) {
        const place = group[0];
        const marker = L.marker([place.lat, place.lng], { icon: markerIcon(place), title: place.name, riseOnHover: true });
        marker.bindTooltip(place.name, { direction: 'top', offset: [0, -14], className: 'travel-place-tooltip' });
        marker.on('click', () => openPlace(place));
        markerLayer.addLayer(marker);
        return;
      }

      const bounds = L.latLngBounds(group.map((place) => [place.lat, place.lng]));
      const marker = L.marker(bounds.getCenter(), { icon: clusterIcon(group.length), riseOnHover: true });
      marker.bindTooltip(group.map((place) => place.name).join(' · '), { direction: 'top', offset: [0, -16], className: 'travel-place-tooltip cluster-tooltip' });
      marker.on('click', () => map.fitBounds(bounds.pad(0.55), { maxZoom: 10, padding: [60, 60] }));
      markerLayer.addLayer(marker);
    });
  }

  function openPlace(place) {
    currentPlace = place;
    renderModal();
    modal.showModal();
    requestAnimationFrame(() => modalRouteMap.invalidateSize());
    loadRoute(place);
  }

  function renderPhoto(place) {
    const photo = document.querySelector('#placePhoto');
    const fallback = document.querySelector('#photoFallback');
    const credit = document.querySelector('#photoCredit');
    const image = images[place.id];
    photo.onload = null;
    photo.onerror = null;
    photo.removeAttribute('src');
    photo.alt = '';
    photo.hidden = true;
    fallback.hidden = false;
    fallback.textContent = place.emoji;
    credit.replaceChildren();
    if (!image) return;

    photo.onload = () => {
      photo.hidden = false;
      fallback.hidden = true;
    };
    photo.onerror = () => {
      photo.hidden = true;
      fallback.hidden = false;
    };
    photo.alt = `${place.name} 대표 사진`;
    photo.src = image.src;

    const source = document.createElement('a');
    source.href = image.filePageUrl || image.pageUrl;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    source.textContent = `사진: ${image.author || 'Wikimedia Commons'}`;
    credit.append(source);
    if (image.license) credit.append(` · ${image.license}`);
  }

  function renderModal() {
    if (!currentPlace) return;
    document.querySelector('#placeName').textContent = currentPlace.name;
    document.querySelector('#visualPlaceName').textContent = currentPlace.name;
    document.querySelector('#placeRegion').textContent = currentPlace.region;
    document.querySelector('#placeCategory').textContent = currentPlace.categoryName;
    document.querySelector('#placeEmoji').textContent = currentPlace.emoji;
    document.querySelector('#routeSchool').textContent = membership?.schoolName || '등록된 학교 없음';
    document.querySelector('#routeDestination').textContent = currentPlace.name;
    document.querySelector('#placeDescription').textContent = currentPlace.description;
    document.querySelector('#placeMission').textContent = currentPlace.mission;
    document.querySelector('#placeSeason').textContent = `🗓️ ${currentPlace.season}`;
    document.querySelector('#placeWeather').textContent = `☔ ${currentPlace.weather}`;
    document.querySelector('#placeReservation').textContent = `🎟️ ${currentPlace.reservation}`;
    const officialSite = document.querySelector('#officialSite');
    officialSite.href = currentPlace.officialUrl;
    officialSite.setAttribute('aria-label', `${currentPlace.name} 공식 홈페이지 새 창에서 열기`);
    renderPhoto(currentPlace);
  }

  function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!hours) return `약 ${minutes}분`;
    return minutes ? `약 ${hours}시간 ${minutes}분` : `약 ${hours}시간`;
  }

  function clearRoute() {
    if (routeLine) {
      map.removeLayer(routeLine);
      routeLine = null;
    }
    if (schoolOriginMarker) {
      map.removeLayer(schoolOriginMarker);
      schoolOriginMarker = null;
    }
    modalRouteLayer.clearLayers();
  }

  async function loadRoute(place) {
    const requestId = ++routeRequestId;
    const status = document.querySelector('#routeStatus');
    status.textContent = '우리 학교에서 출발하는 자동차 경로를 계산하고 있어요.';
    clearRoute();
    try {
      const data = await fetchJson(`/api/travel/route?destinationLat=${encodeURIComponent(place.lat)}&destinationLng=${encodeURIComponent(place.lng)}`);
      if (requestId !== routeRequestId) return;
      membership = { ...(membership || {}), schoolName: data.school.name };
      document.querySelector('#routeSchool').textContent = data.school.name;
      document.querySelector('#schoolSummary').textContent = `${data.school.name}에서 출발하는 체험학습을 준비해요.`;
      status.textContent = `자동차 기준 ${formatDuration(data.route.durationMinutes)} · ${data.route.distanceKm.toLocaleString('ko-KR')}km · 실시간 교통은 반영되지 않은 참고값이에요.`;

      const latLngs = Array.isArray(data.route.coordinates)
        ? data.route.coordinates.map((point) => [Number(point[1]), Number(point[0])]).filter((point) => Number.isFinite(point[0]) && Number.isFinite(point[1]))
        : [];
      if (latLngs.length <= 1) return;

      routeLine = L.polyline(latLngs, { color: '#ef6b3b', weight: 6, opacity: 0.86, lineCap: 'round', lineJoin: 'round' }).addTo(map);
      schoolOriginMarker = L.circleMarker([data.school.latitude, data.school.longitude], { radius: 10, color: '#fff', weight: 4, fillColor: '#277562', fillOpacity: 1 }).addTo(map);
      schoolOriginMarker.bindTooltip(data.school.name, { direction: 'top', offset: [0, -8] });
      map.fitBounds(routeLine.getBounds(), { padding: [55, 55], maxZoom: 10 });

      const modalLine = L.polyline(latLngs, { color: '#ef6b3b', weight: 6, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(modalRouteLayer);
      L.circleMarker([data.school.latitude, data.school.longitude], { radius: 9, color: '#fff', weight: 3, fillColor: '#277562', fillOpacity: 1 })
        .bindTooltip(data.school.name, { direction: 'top' }).addTo(modalRouteLayer);
      L.circleMarker([place.lat, place.lng], { radius: 9, color: '#fff', weight: 3, fillColor: '#ef6b3b', fillOpacity: 1 })
        .bindTooltip(place.name, { direction: 'top' }).addTo(modalRouteLayer);
      modalRouteMap.invalidateSize();
      modalRouteMap.fitBounds(modalLine.getBounds(), { padding: [28, 28], maxZoom: 11 });
    } catch (error) {
      if (requestId !== routeRequestId) return;
      status.textContent = error.message || '현재 경로를 계산하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    }
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    let data = null;
    try { data = await response.json(); } catch (error) { data = null; }
    if (!response.ok) throw new Error(data?.message || '현재 경로를 계산하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    return data;
  }

  async function resolveSchoolContext(state) {
    if (state.membership?.schoolName) return { ...state.membership, source: 'student' };
    if (state.isTeacher) {
      try {
        const teacherState = await fetchJson('/api/teacher/profile');
        if (teacherState.registered && teacherState.profile?.schoolName) return { ...teacherState.profile, source: 'teacher' };
      } catch (error) {
        console.warn('교사 학교 정보를 불러오지 못했습니다.', error);
      }
    }
    const child = Array.isArray(state.guardianChildren) ? state.guardianChildren.find((item) => item?.schoolName) : null;
    return child ? { ...child, source: 'guardian' } : null;
  }

  async function loadMembership() {
    try {
      const state = await fetchJson('/api/auth/me');
      membership = await resolveSchoolContext(state);
      document.querySelector('#schoolSummary').textContent = membership?.schoolName
        ? `${membership.schoolName}에서 출발하는 체험학습을 준비해요.`
        : '학교가 등록되면 실제 경로와 예상 시간을 보여드려요.';
      renderModal();
    } catch (error) {
      console.warn('학교 정보를 불러오지 못했습니다.', error);
      document.querySelector('#schoolSummary').textContent = '학교 정보를 불러오지 못했어요.';
    }
  }

  modalClose.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener('close', () => { routeRequestId += 1; });

  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.category;
      document.querySelectorAll('.filter-btn').forEach((item) => item.classList.toggle('active', item === button));
      renderMarkers();
    });
  });

  map.on('zoomend', renderMarkers);
  loadBoundaries();
  renderLabels();
  renderMarkers();
  loadMembership();
  if (currentPlace) renderModal();
  map.fitBounds([[33.05, 125.65], [38.70, 129.75]], { padding: [30, 30] });
  window.addEventListener('resize', () => map.invalidateSize());
})();