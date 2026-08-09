(() => {
  const places = [
    { id:'gyeongbokgung', name:'경복궁', region:'서울특별시 종로구', category:'history', categoryName:'역사·문화', emoji:'🏯', lat:37.5796, lng:126.9770, elementary:'조선 시대 왕이 생활하고 나라의 중요한 일을 처리하던 궁궐이에요. 여러 전각의 위치와 모양을 살펴보며 조선의 궁궐 생활을 상상해 볼 수 있어요.', middle:'경복궁은 조선 왕조의 법궁으로 건립된 궁궐입니다. 공간의 배치와 전각의 역할을 살펴보면 조선의 통치 질서와 궁궐 건축의 특징을 이해할 수 있습니다.', mission:'근정전과 경회루의 위치와 생김새를 비교하고, 두 건물의 쓰임이 어떻게 달랐을지 설명해 보세요.' },
    { id:'hwaseong', name:'수원 화성', region:'경기도 수원시', category:'history', categoryName:'역사·문화', emoji:'🏰', lat:37.2872, lng:127.0133, elementary:'조선 시대 정조가 새로운 도시를 만들며 쌓은 성이에요. 성문과 포루를 살펴보면 옛사람들이 도시를 어떻게 지켰는지 알 수 있어요.', middle:'수원 화성은 정조의 개혁 구상과 조선 후기 축성 기술이 반영된 계획도시의 성곽입니다. 전통 방식과 새로운 기술이 함께 사용된 점을 탐구할 수 있습니다.', mission:'성벽을 따라 걸으며 방어를 위해 만든 시설을 두 가지 찾아 그 역할을 추리해 보세요.' },
    { id:'gongsanseong', name:'공산성', region:'충청남도 공주시', category:'history', categoryName:'역사·문화', emoji:'⛰️', lat:36.4624, lng:127.1282, elementary:'백제 사람들이 왕성과 마을을 지키기 위해 쌓은 성이에요. 성곽길에서 금강과 주변 산을 함께 살펴볼 수 있어요.', middle:'공산성은 백제 웅진 시기의 왕성으로 알려진 산성입니다. 금강과 주변 지형을 활용한 방어 구조에서 당시 도읍의 입지 조건을 살펴볼 수 있습니다.', mission:'성에서 금강이 보이는 방향을 찾고, 이 위치가 방어에 어떤 도움을 주었을지 설명해 보세요.' },
    { id:'jeonju', name:'전주 한옥마을', region:'전북특별자치도 전주시', category:'history', categoryName:'역사·문화', emoji:'🏘️', lat:35.8150, lng:127.1530, elementary:'한옥이 모여 있는 마을에서 우리 전통 집의 지붕과 마당, 골목 모습을 관찰할 수 있어요.', middle:'전주 한옥마을은 근대 도시 변화 속에서 형성된 한옥 밀집 지역입니다. 전통 건축이 오늘날 관광·생활 공간으로 활용되는 방식을 살펴볼 수 있습니다.', mission:'기와지붕의 선과 처마 모양을 관찰하고 현대 건물과 다른 점을 세 가지 찾아보세요.' },
    { id:'bulguksa', name:'불국사', region:'경상북도 경주시', category:'history', categoryName:'역사·문화', emoji:'🛕', lat:35.7900, lng:129.3320, elementary:'신라 사람들이 바라는 아름다운 불교 세계를 건물과 돌계단으로 표현한 절이에요. 석가탑과 다보탑의 서로 다른 모습을 비교해 보세요.', middle:'불국사는 통일 신라의 불교 문화와 건축 기술을 보여주는 사찰입니다. 건물·석축·탑의 배치를 통해 당시의 종교관과 미적 감각을 탐구할 수 있습니다.', mission:'석가탑과 다보탑에서 서로 다른 모양을 세 가지 찾아 기록해 보세요.' },
    { id:'suncheon', name:'순천만 습지', region:'전라남도 순천시', category:'nature', categoryName:'자연·생태', emoji:'🦆', lat:34.8855, lng:127.5090, elementary:'바닷물과 강물이 만나는 곳에 넓은 갯벌과 갈대밭이 펼쳐져 있어요. 다양한 새와 작은 생물이 함께 살아가는 모습을 관찰할 수 있어요.', middle:'순천만은 갯벌과 염습지, 갈대 군락이 이어지는 연안 습지입니다. 생물 다양성과 습지가 환경에 미치는 역할을 현장에서 살펴볼 수 있습니다.', mission:'갈대밭과 갯벌에서 발견한 생물의 흔적을 각각 하나씩 찾아보세요.' },
    { id:'seongsan', name:'성산일출봉', region:'제주특별자치도 서귀포시', category:'nature', categoryName:'자연·생태', emoji:'🌋', lat:33.4581, lng:126.9425, elementary:'바닷속 화산이 폭발하며 만들어진 커다란 봉우리예요. 정상의 둥근 분화구와 주변 바다를 함께 관찰할 수 있어요.', middle:'성산일출봉은 바닷속 화산 활동으로 형성된 응회구입니다. 화산재가 쌓여 만들어진 지층과 침식 지형을 통해 제주도의 형성 과정을 탐구할 수 있습니다.', mission:'봉우리 옆면에서 층처럼 보이는 부분을 찾아 화산 분출 당시의 모습을 상상해 보세요.' }
  ];

  const labels = [
    ['서울특별시',37.5665,126.9780],['인천광역시',37.4563,126.7052],['경기도',37.42,127.20],['강원특별자치도',37.68,128.30],
    ['충청북도',36.73,127.75],['충청남도',36.53,126.80],['대전광역시',36.3504,127.3845],['세종특별자치시',36.48,127.289],
    ['전북특별자치도',35.72,127.12],['전라남도',34.82,126.78],['광주광역시',35.1595,126.8526],['경상북도',36.36,128.70],
    ['경상남도',35.25,128.25],['대구광역시',35.8714,128.6014],['울산광역시',35.5384,129.3114],['부산광역시',35.1796,129.0756],['제주특별자치도',33.37,126.53]
  ];

  const modal = document.querySelector('#placeModal');
  const modalClose = document.querySelector('#modalClose');
  const levelButton = document.querySelector('#levelButton');
  const modalLevelButton = document.querySelector('#modalLevelButton');
  let membership = null;
  let middleLevel = false;
  let currentPlace = places[0];
  let markerLayer = null;
  let currentCategory = 'all';

  const map = L.map('map-container', { center:[36.15,127.75], zoom:7, minZoom:6, maxZoom:14, zoomControl:true, attributionControl:true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', { attribution:'&copy; OpenStreetMap &copy; CARTO', subdomains:'abcd', maxZoom:20 }).addTo(map);
  map.createPane('provinceBoundaries');
  map.getPane('provinceBoundaries').style.zIndex = 430;
  map.getPane('provinceBoundaries').style.pointerEvents = 'none';
  map.createPane('adminLabels');
  map.getPane('adminLabels').style.zIndex = 440;
  map.getPane('adminLabels').style.pointerEvents = 'none';
  const boundaryLayer = L.layerGroup().addTo(map);
  const labelLayer = L.layerGroup().addTo(map);
  markerLayer = L.featureGroup().addTo(map);

  async function loadBoundaries(){
    try{
      const response = await fetch('../korean-museum/data/skorea-provinces-topo-simple.json?v=20260730-1');
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      const topology = await response.json();
      const features = topologyToFeatures(topology);
      L.geoJSON({type:'FeatureCollection',features},{pane:'provinceBoundaries',interactive:false,style:{color:'#557a86',weight:1.45,opacity:.72,fillColor:'#f5edd0',fillOpacity:.13,lineCap:'round',lineJoin:'round'}}).addTo(boundaryLayer);
    }catch(error){ console.warn('시·도 경계를 불러오지 못했습니다.',error); }
  }

  function topologyToFeatures(topology){
    if(!topology || topology.type!=='Topology' || !Array.isArray(topology.arcs)) return [];
    const object=Object.values(topology.objects||{})[0];
    if(!object || object.type!=='GeometryCollection') return [];
    const transform=topology.transform||{scale:[1,1],translate:[0,0]};
    const arcs=topology.arcs.map(arc=>{let x=0,y=0;return arc.map(point=>{x+=point[0];y+=point[1];return[(x*transform.scale[0])+transform.translate[0],(y*transform.scale[1])+transform.translate[1]];});});
    const join=indexes=>{const coordinates=[];indexes.forEach((arcIndex,index)=>{const arc=arcIndex>=0?arcs[arcIndex]:arcs[~arcIndex].slice().reverse();coordinates.push(...(index===0?arc:arc.slice(1)));});return coordinates;};
    return object.geometries.filter(item=>item.type==='Polygon'||item.type==='MultiPolygon').map(item=>({type:'Feature',properties:item.properties||{},geometry:{type:item.type,coordinates:item.type==='Polygon'?item.arcs.map(join):item.arcs.map(polygon=>polygon.map(join))}}));
  }

  function renderLabels(){
    labelLayer.clearLayers();
    labels.forEach(([name,lat,lng])=>{
      const icon=L.divIcon({className:'map-admin-label-wrapper',html:`<span class="map-admin-label">${name}</span>`,iconSize:[110,24],iconAnchor:[55,12]});
      labelLayer.addLayer(L.marker([lat,lng],{icon,pane:'adminLabels',interactive:false}));
    });
  }

  function markerIcon(place){
    return L.divIcon({className:'travel-icon-wrapper',html:`<button class="travel-marker ${place.category}" type="button" aria-label="${place.name} 자세히 보기"><span aria-hidden="true">${place.emoji}</span><strong class="travel-marker-label">${place.name}</strong></button>`,iconSize:[70,92],iconAnchor:[35,76]});
  }

  function renderMarkers(){
    markerLayer.clearLayers();
    places.filter(place=>currentCategory==='all'||place.category===currentCategory).forEach(place=>{
      const marker=L.marker([place.lat,place.lng],{icon:markerIcon(place),title:place.name,riseOnHover:true});
      marker.on('click',()=>openPlace(place));
      markerLayer.addLayer(marker);
    });
  }

  function openPlace(place){ currentPlace=place; renderModal(); modal.showModal(); }
  function renderModal(){
    document.querySelector('#placeName').textContent=currentPlace.name;
    document.querySelector('#visualPlaceName').textContent=currentPlace.name;
    document.querySelector('#placeRegion').textContent=currentPlace.region;
    document.querySelector('#placeCategory').textContent=currentPlace.categoryName;
    document.querySelector('#placeEmoji').textContent=currentPlace.emoji;
    document.querySelector('#routeSchool').textContent=membership?.schoolName||'등록된 학교 없음';
    document.querySelector('#routeDestination').textContent=currentPlace.name;
    document.querySelector('#placeDescription').textContent=middleLevel?currentPlace.middle:currentPlace.elementary;
    document.querySelector('#placeMission').textContent=currentPlace.mission;
    const label=middleLevel?'중등 설명':'초등 설명';
    levelButton.textContent=label; modalLevelButton.textContent=label;
  }
  function toggleLevel(){ middleLevel=!middleLevel; levelButton.setAttribute('aria-pressed',String(middleLevel)); renderModal(); }
  levelButton.addEventListener('click',toggleLevel);
  modalLevelButton.addEventListener('click',toggleLevel);
  modalClose.addEventListener('click',()=>modal.close());
  modal.addEventListener('click',event=>{if(event.target===modal) modal.close();});
  document.querySelectorAll('.filter-btn').forEach(button=>button.addEventListener('click',()=>{currentCategory=button.dataset.category;document.querySelectorAll('.filter-btn').forEach(item=>item.classList.toggle('active',item===button));renderMarkers();}));

  async function fetchJson(url){
    const response=await fetch(url,{headers:{Accept:'application/json'}});
    if(!response.ok) throw new Error(`HTTP_${response.status}`);
    return response.json();
  }

  async function resolveSchoolContext(state){
    if(state.membership?.schoolName) return {...state.membership,source:'student'};

    if(state.isTeacher){
      try{
        const teacherState=await fetchJson('/api/teacher/profile');
        if(teacherState.registered && teacherState.profile?.schoolName){
          return {...teacherState.profile,source:'teacher'};
        }
      }catch(error){
        console.warn('교사 학교 정보를 불러오지 못했습니다.',error);
      }
    }

    const child=Array.isArray(state.guardianChildren)
      ? state.guardianChildren.find(item=>item?.schoolName)
      : null;
    return child ? {...child,source:'guardian'} : null;
  }

  async function loadMembership(){
    try{
      const state=await fetchJson('/api/auth/me');
      membership=await resolveSchoolContext(state);
      document.querySelector('#schoolSummary').textContent=membership?.schoolName
        ? `${membership.schoolName}에서 출발하는 여행을 준비해요.`
        : '등록된 학교 정보를 찾지 못했어요.';
      renderModal();
    }catch(error){
      console.warn('학교 정보를 불러오지 못했습니다.',error);
      document.querySelector('#schoolSummary').textContent='학교 정보를 불러오지 못했어요.';
    }
  }

  loadBoundaries(); renderLabels(); renderMarkers(); loadMembership();
  map.fitBounds([[33.05,125.65],[38.70,129.75]],{padding:[30,30]});
  window.addEventListener('resize',()=>map.invalidateSize());
})();