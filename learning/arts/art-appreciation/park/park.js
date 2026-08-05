(function () {
  'use strict';

  if (!window.THREE) {
    document.body.innerHTML = '<p style="padding:30px">3D 엔진을 불러오지 못했습니다.</p>';
    return;
  }
  if (!window.THREE.GLTFLoader) {
    document.body.innerHTML = '<p style="padding:30px">3D GLB 로더를 불러오지 못했습니다.</p>';
    return;
  }

  // 05번 전시실(입체·공간)과 동일한 THREE.GLTFLoader 기반 3D 입체 스캔 로딩 시스템
  const ZONES = [
    {
      id: 'sphinx', order: '01', title: '카프라 왕의 스핑크스', short: '기자의 대스핑크스',
      subtitle: '고대 이집트 · 3D GLB 모델 스캔', position: [-145, 0, -18], arrival: [-160, 1.62, -91], lookAt: [-145, 11, -34],
      modelPath: 'assets/models/sphinx.glb', realHeight: 20.0, materialColor: 0xd6c29b,
      facts: [['길이', '73.5m'], ['너비', '19m'], ['높이', '20m']],
      size: '길이 73.5m × 너비 19m × 높이 20m',
      scale: '05번 전시실과 동일한 THREE.GLTFLoader 3D 입체 모델 스캔 적용',
      note: '하버드 Digital Giza & 3D 실측 데이터를 기반으로 한 1:1 실측 3D 스캔',
      docent: '사자의 몸과 왕의 머리가 결합된 고대 이집트의 거대한 수호상입니다. 05번 전시실의 조각상처럼 360도로 돌려보며 73.5m의 거대한 3D 입체 실측 크기를 체험해 보세요.',
      caution: '석회암 바위산 하나를 통째로 깎아서 만든 세계 최대 크기의 단일 석조 조각상입니다.',
      look: '발끝에서 꼬리까지 옆길을 따라 걸어보고, 1.45m 어린이 캐릭터와 스핑크스 머리의 높이를 직접 비교해 보세요.',
      source: 'https://giza.fas.harvard.edu/faq/', rights: '원작: 고대 유물 · 3D 입체 스캔 모델'
    },
    {
      id: 'emille', order: '02', title: '성덕대왕신종 (에밀레종)', short: '에밀레종',
      subtitle: '통일신라 771년 · 국보 · 3D GLB 모델 스캔', position: [-72, 0, -142], arrival: [-72, 1.62, -148], lookAt: [-72, 2.5, -142],
      modelPath: 'assets/models/emille-bell.glb', realHeight: 6.8, materialColor: 0x5a5245,
      facts: [['높이', '3.75m'], ['입지름', '2.27m'], ['무게', '약 18.9톤']],
      size: '종 높이 3.75m × 입지름 2.27m (전각 포함 전체 높이 6.8m)',
      scale: '국가유산청 3D 정밀 실측 1:1 입체 스캔 적용',
      note: '국가지정 유산 3D 정밀 실측 데이터',
      docent: '우리나라에 남아있는 가장 큰 국보 종입니다. 종 꼭대기의 용뉴(용 모양 고리)와 음통, 종 몸통에 새겨진 비천상 조각을 3D 공간에서 오가며 감상해 보세요.',
      caution: '“에밀레”라는 이름은 아기를 넣었다는 전설에서 유래했지만, 성분 분석 결과 거짓으로 밝혀진 유언비어입니다.',
      look: '종 위쪽에 걸린 용 모양 고리(용뉴)와 비천상이 하늘로 날아오르는 문양을 입체로 살펴보세요.',
      source: 'https://www.heritage.go.kr/', rights: '원작: 국보 유물 · 3D 입체 스캔 모델'
    },
    {
      id: 'liberty', order: '03', title: '자유의 여신상', short: '자유의 여신상',
      subtitle: '프레데리크 오귀스트 바르톨디 · 1886 · 3D GLB 모델 스캔', position: [137, 0, -28], arrival: [137, 1.62, 95], lookAt: [137, 44, -28],
      modelPath: 'assets/models/statue-of-liberty.glb', realHeight: 92.99, materialColor: 0x629c8b,
      facts: [['지면→횃불', '92.99m'], ['조각상', '46.05m'], ['받침대', '46.94m']],
      size: '지면에서 횃불까지 92.99m (조각상 46.05m + 받침대 46.94m)',
      scale: '미국 국립공원관리청(NPS) 공식 3D 정밀 치수 적용',
      note: 'NPS & 스미소니언 3D 정밀 실측 수치',
      docent: '미국 뉴욕의 상징인 자유의 여신상입니다. 조각상 본체 높이(46m)와 정교한 석조 받침대(47m)가 합쳐진 93m의 압도적인 3D 입체 스케일을 확인해 보세요.',
      caution: '겉표면은 아주 얇은 동판(구리)으로 만들어져 처음에는 붉은 동색이었으나, 시간이 지나며 산화되어 현재의 청록색이 되었습니다.',
      look: '발밑에서 까마득히 높은 횃불 끝까지 올려다본 뒤, 뒤로 멀리 물러나 전체 3D 비례를 확인하세요.',
      source: 'https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm', rights: '원작: Public Domain · 3D 입체 스캔 모델'
    },
    {
      id: 'moai', order: '04', title: '이스터섬 모아이 석상', short: '모아이 석상',
      subtitle: '칠레 라파누이 · 1250–1500년경 · 3D GLB 모델 스캔', position: [72, 0, -142], arrival: [72, 1.62, -148], lookAt: [72, 2.5, -142],
      modelPath: 'assets/models/moai.glb', realHeight: 6.6, materialColor: 0x6e6960,
      facts: [['평균 높이', '약 4.0m'], ['대좌 포함', '6.6m'], ['무게', '약 20톤']],
      size: '석상 높이 4m (아후 석조 대좌 및 푸카오 포함 6.6m)',
      scale: '이스터섬 아후 통가리키 실측 3D 스캔 데이터 적용',
      note: '라파누이 국립공원 유적 3D 스캔',
      docent: '태평양 이스터섬에 우뚝 선 모아이 석상입니다. 돌출된 긴 코와 커다란 턱, 머리 위의 붉은 화산석 모자(푸카오)의 3D 입체 구조를 오가며 감상해 보세요.',
      caution: '모아이는 바다를 등지고 섬 내부의 마을을 바라보며 족장과 조상의 영혼을 수호하는 방향으로 서 있습니다.',
      look: '우뚝 솟은 턱선과 귓볼, 머리 위에 올려진 붉은 모자(푸카오)의 묵직한 3D 형태를 살펴보세요.',
      source: 'https://whc.unesco.org/en/list/715/', rights: '원작: 세계유산 · 3D 입체 스캔 모델'
    },
    {
      id: 'towers', order: '05', title: '불국사 다보탑 & 석가탑', short: '다보탑 · 석가탑',
      subtitle: '통일신라 751년 · 국보 · 3D GLB 모델 스캔', position: [132, 0, 118], arrival: [145, 1.62, 118], lookAt: [132, 6, 118],
      modelPath: 'assets/models/dabotap-seokgatap.glb', realHeight: 10.75, materialColor: 0xb5b0a5,
      facts: [['석가탑 높이', '10.75m'], ['다보탑 높이', '10.29m'], ['재질', '화강암']],
      size: '석가탑 10.75m / 다보탑 10.29m (불국사 대웅전 앞 마당 배치)',
      scale: '국가유산 3D 정밀 기록 정보 실측 치수 1:1 적용',
      note: '국가유산청 3D 정밀 실측 공공 데이터',
      docent: '한국 석탑 예술의 정점을 보여주는 두 탑입니다. 간결한 석가탑과 화려한 다보탑의 3D 입체 조형미를 불국사 마당에서 관람해 보세요.',
      caution: '두 탑은 모양이 전혀 다르지만 높이가 약 10.5m로 거의 같아 불국사 뜰에서 완벽한 조화를 이룹니다.',
      look: '석가탑의 단순하고 세련된 3층 비례와 다보탑의 난간 조각 차이를 3D로 비교하세요.',
      source: 'https://portal.nrich.go.kr/', rights: '원작: 국보 유물 · 3D 입체 스캔 모델'
    },
    {
      id: 'muyongchong', order: '06', title: '무용총 수렵도 (3D 부조 디오라마)', short: '무용총 수렵도',
      subtitle: '고구려 5세기 · 고분 벽화 3D 부조', position: [-142, 0, 112], arrival: [-142, 1.62, 106], lookAt: [-142, 2.2, 112],
      modelPath: 'assets/models/muyongchong.glb', realHeight: 3.6, materialColor: 0x94836f,
      facts: [['벽화 가로', '약 5.8m'], ['벽화 세로', '약 3.2m'], ['장소', '중국 길림성 집안']],
      size: '고구려 고분 벽면 1:1 실측 디오라마 (가로 5.8m × 높이 3.2m)',
      scale: '고구려 고분 벽화 실측 규격 1:1 부조 디오라마 적용',
      note: '유네스코 세계유산 고구려 고분 벽화 데이터',
      docent: '달리는 말 위에서 뒤를 돌아보며 활을 쏘는 고구려 무사의 모습을 고구려 고분 돌벽면 형태의 3D 입체 부조 디오라마로 체감할 수 있습니다.',
      caution: '평면 벽화를 야외 테마파크 3D 공간에서 1:1 실측으로 체감할 수 있도록 고분 돌벽면 형태의 입체 부조 디오라마 구조로 구현했습니다.',
      look: '말을 탄 무사가 활시위를 뒤로 당기는 역동적인 동작과 능선이 겹겹이 묘사된 산의 무늬를 찾아보세요.',
      source: 'http://nrich.go.kr/', rights: '원작: 고구려 벽화 · 3D 입체 부조 디오라마'
    },
    {
      id: 'lamassu', order: '07', title: '람마수 (날개 달린 황소상)', short: '람마수 황소상',
      subtitle: '고대 아시리아 기원전 8세기 · 3D GLB 모델 스캔', position: [0, 0, 135], arrival: [0, 1.62, 142], lookAt: [0, 2.5, 135],
      modelPath: 'assets/models/lamassu.glb', realHeight: 4.4, materialColor: 0xaeaa9f,
      facts: [['높이', '4.4m'], ['길이', '4.4m'], ['너비', '1.4m']],
      size: '높이 4.4m × 길이 4.4m × 너비 1.4m',
      scale: '루브르/대영박물관 소장 유물 3D 스캔 실측 적용',
      note: '대영박물관 / 루브르 소장 유물 3D 스캔',
      docent: '고대 아시리아 궁전 문을 지키던 수호신입니다. 사람의 얼굴, 독수리의 날개, 황소의 몸을 하고 있는 정교한 3D 입체 조각을 둘러보세요.',
      caution: '앞에서 볼 때는 서 있고 옆에서 볼 때는 걷는 것처럼 보이도록 발을 5개로 조각했습니다.',
      look: '황소 몸통의 옆면을 따라가며 5번째 발이 어디에 있는지, 독수리 날개 조각을 확인해 보세요.',
      source: 'https://www.britishmuseum.org/', rights: '원작: 고대 유물 · 3D 입체 스캔 모델'
    }
  ];

  const canvas = document.getElementById('park-canvas');
  const loading = document.getElementById('loading');
  const hero = document.getElementById('hero-panel');
  const measurePanel = document.getElementById('measure-panel');
  const measureKicker = document.getElementById('measure-kicker');
  const measureTitle = document.getElementById('measure-title');
  const measureFacts = document.getElementById('measure-facts');
  const measureNote = document.getElementById('measure-note');
  const currentZone = document.getElementById('current-zone');
  const compassArrow = document.getElementById('compass-arrow');
  const detailModal = document.getElementById('detail-modal');
  const helpModal = document.getElementById('help-modal');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9fc8d9);
  scene.fog = new THREE.Fog(0xaccbd0, 185, 470);

  const camera = new THREE.PerspectiveCamera(61, innerWidth / innerHeight, .08, 650);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, 1.62, 28);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .88;
  renderer.outputEncoding = THREE.sRGBEncoding;

  const clock = new THREE.Clock();
  const gltfLoader = new THREE.GLTFLoader();
  const keys = Object.create(null);
  const raycaster = new THREE.Raycaster();
  const centerPointer = new THREE.Vector2(0, 0);
  const zoneObjects = [];
  const park = new THREE.Group();
  scene.add(park);
  let yaw = 0, pitch = -.06, dragging = false, dragStart = null, activeZone = null;

  const MAT = {
    grass: new THREE.MeshStandardMaterial({ color: 0x315b36, roughness: .98 }),
    path: new THREE.MeshStandardMaterial({ color: 0xa29378, roughness: .92 }),
    pathEdge: new THREE.MeshStandardMaterial({ color: 0x8a806d, roughness: .86 }),
    sandstone: new THREE.MeshStandardMaterial({ color: 0xc8ad78, roughness: .9 }),
    darkStone: new THREE.MeshStandardMaterial({ color: 0x4a4943, roughness: .97 }),
    water: new THREE.MeshStandardMaterial({ color: 0x236f80, roughness: .28, metalness: .08, transparent: true, opacity: .88 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x68452f, roughness: .9 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x2e6740, roughness: .94 }),
    leaf2: new THREE.MeshStandardMaterial({ color: 0x6c8d45, roughness: .94 })
  };

  function addMesh(geometry, material, parent, position, shadow = true) {
    const m = new THREE.Mesh(geometry, material);
    if (position) m.position.set(position[0], position[1], position[2]);
    m.castShadow = shadow; m.receiveShadow = shadow; parent.add(m); return m;
  }
  function box(size, mat, parent, pos) { return addMesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat, parent, pos); }
  function cylinder(rt, rb, h, segments, mat, parent, pos) { return addMesh(new THREE.CylinderGeometry(rt, rb, h, segments), mat, parent, pos); }
  function sphere(radius, mat, parent, pos, ws = 24, hs = 16) { return addMesh(new THREE.SphereGeometry(radius, ws, hs), mat, parent, pos); }

  function makeLine(a, b, color = 0xf0efc4) {
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: .88 }));
  }
  function canvasTexture(draw, w = 1024, h = 256) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); return t;
  }
  function makeLabel(title, subtitle, width = 8) {
    const t = canvasTexture((g, w, h) => {
      g.fillStyle = 'rgba(14,35,28,.92)'; g.fillRect(0, 0, w, h); g.strokeStyle = '#dceab0'; g.lineWidth = 4; g.strokeRect(6, 6, w - 12, h - 12);
      g.fillStyle = '#eef2df'; g.font = '800 52px sans-serif'; g.fillText(title, 42, 95);
      g.fillStyle = '#b8caaf'; g.font = '28px sans-serif'; g.fillText(subtitle, 42, 160);
      g.fillStyle = '#dce9a6'; g.fillRect(42, 200, 120, 5);
    });
    return new THREE.Mesh(new THREE.PlaneGeometry(width, width * .25), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false, side: THREE.DoubleSide }));
  }
  function makeScaleMarker(height, label) {
    const g = new THREE.Group();
    const human = new THREE.Group();
    cylinder(.14, .17, .62, 12, new THREE.MeshStandardMaterial({ color: 0xe26f4f, roughness: .78 }), human, [0, .75, 0]);
    sphere(.15, new THREE.MeshStandardMaterial({ color: 0xc58d68, roughness: .82 }), human, [0, 1.19, 0], 16, 12);
    cylinder(.055, .06, .55, 8, new THREE.MeshStandardMaterial({ color: 0x273b48, roughness: .85 }), human, [-.09, .29, 0]);
    const leg = human.children[2].clone(); leg.position.x = .09; human.add(leg); human.scale.setScalar(height / 1.45); g.add(human);
    const line = makeLine(new THREE.Vector3(.42, 0, 0), new THREE.Vector3(.42, height, 0)); g.add(line);
    for (const y of [0, height]) g.add(makeLine(new THREE.Vector3(.32, y, 0), new THREE.Vector3(.52, y, 0)));
    const tag = makeLabel(label, '크기 비교 기준', 1.9); tag.position.set(.42, height + .3, 0); g.add(tag);
    return g;
  }

  // 05번 전시실과 동일한 3D 모델 설치 및 석조 좌대 시스템
  function loadZoneModel(zone) {
    const rootGroup = new THREE.Group();
    rootGroup.position.set(zone.position[0], 0, zone.position[2]);
    rootGroup.userData.zone = zone;

    // Stone Pedestal (05번 전시실과 동일한 석조 받침대)
    const baseW = Math.max(3.5, zone.realHeight * 0.4);
    const plinth = box([baseW, 0.4, baseW], MAT.darkStone, rootGroup, [0, 0.2, 0]);
    plinth.receiveShadow = true;

    gltfLoader.load(zone.modelPath, (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.geometry.computeVertexNormals();
          
          let matProps = { color: zone.materialColor || 0x888888, roughness: 0.88, metalness: 0.08 };
          if (zone.id === 'emille') { matProps.metalness = 0.45; matProps.roughness = 0.52; }
          else if (zone.id === 'liberty') { matProps.metalness = 0.15; matProps.roughness = 0.65; }
          else if (zone.id === 'moai') { matProps.roughness = 0.98; }

          child.material = new THREE.MeshStandardMaterial(matProps);
        }
      });

      const box3 = new THREE.Box3().setFromObject(model);
      const naturalH = Math.max(0.01, box3.max.y - box3.min.y);
      const scaleFactor = zone.realHeight / naturalH;
      model.scale.setScalar(scaleFactor);

      const scaledBox = new THREE.Box3().setFromObject(model);
      model.position.y = 0.4 - scaledBox.min.y;

      rootGroup.add(model);
    }, undefined, (err) => {
      console.error('Error loading 3D GLB model for zone:', zone.id, err);
    });

    // 1.45m 어린이 크기 비교 마커
    const marker = makeScaleMarker(1.45, '어린이 1.45m');
    marker.position.set(zone.position[0] + baseW / 2 + 1.8, 0, zone.position[2] + 2);
    park.add(marker);

    // 3D 정보 라벨
    const label = makeLabel(zone.title, zone.size, 9);
    label.position.set(zone.position[0], 3.8, zone.position[2] + 6);
    label.lookAt(camera.position.x, 3.8, camera.position.z);
    label.userData.faceCamera = true;
    park.add(label);

    zoneObjects.push(rootGroup);
    park.add(rootGroup);
  }

  function makePark() {
    const ground = addMesh(new THREE.CircleGeometry(300, 96), MAT.grass, park, [0, -.08, 0]); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; ground.castShadow = false;
    const plaza = addMesh(new THREE.CircleGeometry(31, 64), MAT.path, park, [0, .01, 0]); plaza.rotation.x = -Math.PI / 2;
    const ring = addMesh(new THREE.RingGeometry(25, 31, 64), MAT.pathEdge, park, [0, .025, 0]); ring.rotation.x = -Math.PI / 2;

    ZONES.forEach(zone => {
      const curve = new THREE.LineCurve3(new THREE.Vector3(0, .02, 0), new THREE.Vector3(zone.position[0], .02, zone.position[2]));
      const path = addMesh(new THREE.TubeGeometry(curve, 1, 3.2, 8, false), MAT.path, park); path.receiveShadow = true;
      const pad = addMesh(new THREE.CircleGeometry(zone.id === 'liberty' || zone.id === 'sphinx' ? 48 : 16, 48), MAT.path, park, [zone.position[0], .012, zone.position[2]]); pad.rotation.x = -Math.PI / 2;
    });

    const water = addMesh(new THREE.RingGeometry(15, 23, 64), MAT.water, park, [0, .04, 0]); water.rotation.x = -Math.PI / 2; water.castShadow = false;
    const hub = cylinder(4.2, 4.8, 1.1, 32, MAT.sandstone, park, [0, .55, 0]);
    const globe = sphere(2.7, new THREE.MeshStandardMaterial({ color: 0x7a9f63, roughness: .62, metalness: .08 }), park, [0, 4.1, 0], 32, 20);
    const hubLabel = makeLabel('실물 크기 3D 야외 미술 공원', '05번 전시실과 동일한 3D GLB 로딩 1m = 3D 1단위', 9); hubLabel.position.set(0, 7.5, 0); hubLabel.userData.faceCamera = true; park.add(hubLabel);

    // 05번 전시실과 동일한 3D GLB 로딩 적용
    ZONES.forEach(zone => loadZoneModel(zone));

    for (let i = 0; i < 115; i++) {
      const a = i * 2.399, r = 50 + (i * 37 % 220), x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (ZONES.some(q => Math.hypot(x - q.position[0], z - q.position[2]) < 42)) continue;
      const tree = new THREE.Group(), h = 3.5 + (i % 7) * .45;
      cylinder(.18, .28, h, 8, MAT.wood, tree, [0, h / 2, 0]);
      const crown = sphere(1.4 + (i % 4) * .18, i % 3 ? MAT.leaf : MAT.leaf2, tree, [0, h + .8, 0], 12, 9); crown.scale.y = 1.25;
      tree.position.set(x, 0, z); tree.rotation.y = a; tree.traverse(o => { if (o.isMesh) { o.castShadow = i % 4 === 0; o.receiveShadow = true; } }); park.add(tree);
    }
    for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2; const lamp = cylinder(.06, .09, 3.4, 10, MAT.darkStone, park, [Math.cos(a) * 28, 1.7, Math.sin(a) * 28]); sphere(.16, new THREE.MeshStandardMaterial({ color: 0xffe1a5, emissive: 0xffba55, emissiveIntensity: 1.2 }), park, [Math.cos(a) * 28, 3.5, Math.sin(a) * 28], 12, 8); }
  }

  function setupLights() {
    scene.add(new THREE.HemisphereLight(0xd9efff, 0x354b2d, .64));
    const sun = new THREE.DirectionalLight(0xffeed0, 1.35); sun.position.set(-90, 160, 70); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -190; sun.shadow.camera.right = 190; sun.shadow.camera.top = 190; sun.shadow.camera.bottom = -190; sun.shadow.camera.far = 420; sun.shadow.bias = -.0002; scene.add(sun);
  }

  function buildTabs() {
    const nav = document.getElementById('zone-tabs');
    nav.innerHTML = '';
    ZONES.forEach(zone => {
      const b = document.createElement('button'); b.className = 'zone-tab'; b.type = 'button'; b.innerHTML = `<i></i><b>${zone.order}. ${zone.short}</b><small>${zone.subtitle}</small>`;
      b.addEventListener('click', () => teleport(zone)); zone.tab = b; nav.appendChild(b);
    });
  }
  function teleport(zone) {
    hero.classList.add('hidden'); camera.position.set(zone.arrival[0], zone.arrival[1], zone.arrival[2]);
    const target = new THREE.Vector3(zone.lookAt[0], zone.lookAt[1], zone.lookAt[2]);
    const d = target.sub(camera.position); yaw = Math.atan2(-d.x, -d.z); pitch = Math.atan2(d.y, Math.hypot(d.x, d.z)); updateCamera();
    setActiveZone(zone);
  }
  function setActiveZone(zone) {
    if (activeZone === zone) return; activeZone = zone;
    ZONES.forEach(z => z.tab.classList.toggle('active', z === zone));
    currentZone.textContent = zone ? zone.short : '중앙 광장';
    if (!zone) { measurePanel.hidden = true; return; }
    measurePanel.hidden = false; measureKicker.textContent = `ZONE ${zone.order} · ACTUAL 3D SCAN`; measureTitle.textContent = zone.title;
    measureFacts.innerHTML = zone.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('');
    measureNote.textContent = zone.note;
  }
  function openDetail(zone) {
    if (!zone) return;
    document.getElementById('modal-kicker').textContent = `ZONE ${zone.order} · REAL 3D SCAN`;
    document.getElementById('modal-title').textContent = zone.title;
    document.getElementById('modal-subtitle').textContent = zone.subtitle;
    document.getElementById('modal-size').textContent = zone.size;
    document.getElementById('modal-scale').textContent = zone.scale;
    document.getElementById('modal-docent').textContent = zone.docent;
    document.getElementById('modal-caution').textContent = zone.caution;
    document.getElementById('modal-look').textContent = zone.look;
    document.getElementById('modal-rights').textContent = zone.rights;
    document.getElementById('modal-source').href = zone.source;
    document.getElementById('modal-photo-source').href = zone.source;
    detailModal.showModal();
  }
  function nearestZone() {
    let best = null, dist = Infinity;
    ZONES.forEach(z => { const d = Math.hypot(camera.position.x - z.position[0], camera.position.z - z.position[2]); if (d < dist) { dist = d; best = z; } });
    const monumental = best && ['sphinx', 'liberty'].includes(best.id);
    return dist < (monumental ? 148 : 34) ? best : null;
  }
  function updateCamera() { camera.rotation.y = yaw; camera.rotation.x = pitch; }
  function updateMovement(dt) {
    const forward = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
    const strafe = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
    if (forward || strafe) {
      const speed = (keys.ShiftLeft || keys.ShiftRight ? 31 : 13) * dt, len = Math.hypot(forward, strafe) || 1;
      camera.position.x += (-Math.sin(yaw) * forward + Math.cos(yaw) * strafe) / len * speed;
      camera.position.z += (-Math.cos(yaw) * forward - Math.sin(yaw) * strafe) / len * speed;
      const radius = Math.hypot(camera.position.x, camera.position.z); if (radius > 285) { camera.position.x *= 285 / radius; camera.position.z *= 285 / radius; }
    }
    camera.position.y = 1.62;
    setActiveZone(nearestZone());
  }

  function animate() {
    requestAnimationFrame(animate); const dt = Math.min(clock.getDelta(), .05); updateMovement(dt);
    park.children.forEach(o => { if (o.userData.faceCamera) o.lookAt(camera.position.x, o.position.y, camera.position.z); });
    compassArrow.style.transform = `rotate(${-yaw}rad)`; renderer.render(scene, camera);
  }

  setupLights(); makePark(); buildTabs(); updateCamera(); animate();
  setTimeout(() => loading.classList.add('done'), 650);

  addEventListener('keydown', e => { keys[e.code] = true; if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault(); });
  addEventListener('keyup', e => { keys[e.code] = false; });
  canvas.addEventListener('pointerdown', e => { dragging = true; dragStart = { x: e.clientX, y: e.clientY, moved: false }; canvas.classList.add('dragging'); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (!dragging) return; const dx = e.movementX || 0, dy = e.movementY || 0; if (Math.abs(dx) + Math.abs(dy) > 2) dragStart.moved = true; yaw -= dx * .0032; pitch = Math.max(-1.35, Math.min(1.35, pitch - dy * .0028)); updateCamera(); });
  canvas.addEventListener('pointerup', e => { if (!dragging) return; dragging = false; canvas.classList.remove('dragging'); if (dragStart && !dragStart.moved) { raycaster.setFromCamera(centerPointer, camera); const hit = raycaster.intersectObjects(zoneObjects, true)[0]; if (hit) { let o = hit.object; while (o && !o.userData.zone) o = o.parent; if (o) openDetail(o.userData.zone); } } dragStart = null; });
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); });

  document.getElementById('start-button').addEventListener('click', () => teleport(ZONES[0]));
  document.getElementById('detail-button').addEventListener('click', () => openDetail(activeZone));
  document.getElementById('modal-close').addEventListener('click', () => detailModal.close());
  document.getElementById('help-button').addEventListener('click', () => helpModal.showModal());
  document.getElementById('help-close').addEventListener('click', () => helpModal.close());
  document.querySelectorAll('.touch-controls button').forEach(btn => {
    const code = btn.dataset.key;
    const on = e => { e.preventDefault(); keys[code] = true; }, off = e => { e.preventDefault(); keys[code] = false; };
    btn.addEventListener('pointerdown', on); btn.addEventListener('pointerup', off); btn.addEventListener('pointercancel', off); btn.addEventListener('pointerleave', off);
  });
})();
