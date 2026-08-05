(function () {
  'use strict';

  if (!window.THREE) {
    document.body.innerHTML = '<p style="padding:30px">3D 엔진을 불러오지 못했습니다.</p>';
    return;
  }

  const ZONES = [
    {
      id: 'sphinx', order: '01', title: '카프라 왕의 스핑크스', short: '기자의 대스핑크스',
      subtitle: '고대 이집트 · 실제 작품 사진 전시', position: [-145, 0, -18], arrival: [-160, 1.62, -91], lookAt: [-145, 11, -34],
      photoFile: 'assets/sphinx.jpg', boardW: 26.67, boardH: 20.0, footW: 19.0, footD: 73.5, footH: 20.0,
      facts: [['길이', '73.5m'], ['너비', '19m'], ['높이', '20m']],
      size: '길이 73.5m × 너비 19m × 높이 20m',
      scale: '실제 유물 사진 및 하버드 Digital Giza 1:1 실측 바닥 경계선',
      note: '하버드 Digital Giza 실측값을 1:1로 적용한 고화질 사진 전시',
      docent: '사자의 몸과 왕의 머리를 합친 거대한 고대 이집트 수호상입니다. 실제 사진과 1.45m 어린이 캐릭터를 비교하며 73.5m의 거대한 크기를 느껴보세요.',
      caution: '흔히 “카프라 왕의 스핑크스”라고 부르지만, 누구의 얼굴인지에 대해서는 학계의 논의가 계속되고 있습니다.',
      look: '발에서 꼬리까지 옆길을 걸어보며, 1.45m 어린이 캐릭터와 스핑크스 머리의 높이를 직접 비교해 보세요.',
      source: 'https://giza.fas.harvard.edu/faq/', rights: '원작: 고대 유물 · 고화질 실물 사진 전시'
    },
    {
      id: 'emille', order: '02', title: '성덕대왕신종 (에밀레종)', short: '에밀레종',
      subtitle: '통일신라 771년 · 국보 · 실제 작품 사진 전시', position: [-72, 0, -142], arrival: [-72, 1.62, -148], lookAt: [-72, 2.5, -142],
      photoFile: 'assets/emille.jpg', boardW: 4.5, boardH: 6.8, footW: 2.27, footD: 2.27, footH: 6.8,
      facts: [['높이', '3.75m'], ['입지름', '2.27m'], ['무게', '약 18.9톤']],
      size: '종 높이 3.75m × 입지름 2.27m (전각 포함 전체 높이 6.8m)',
      scale: '국가유산청 국보 실측 치수 1:1 실제 사진 전시',
      note: '국가유산청 정밀 실측 기반 고화질 사진 전시',
      docent: '우리나라에 남아있는 가장 아름답고 커다란 국보 종입니다. 종 꼭대기의 용뉴(용 모양 고리)와 연화문, 비천상의 고화질 실제 모습을 감상해 보세요.',
      caution: '아기를 넣었다는 에밀레 전설은 성분 분석 결과 거짓으로 밝혀진 유언비어입니다.',
      look: '종 꼭대기의 용뉴 조각과 몸통에 새겨진 비천상의 선명한 실물 사진을 살펴보세요.',
      source: 'https://www.heritage.go.kr/', rights: '원작: 국보 유물 · 고화질 실물 사진 전시'
    },
    {
      id: 'liberty', order: '03', title: '자유의 여신상', short: '자유의 여신상',
      subtitle: '프레데리크 오귀스트 바르톨디 · 1886 · 실제 작품 사진 전시', position: [137, 0, -28], arrival: [137, 1.62, 95], lookAt: [137, 44, -28],
      photoFile: 'assets/liberty.jpg', boardW: 61.99, boardH: 92.99, footW: 26.0, footD: 26.0, footH: 92.99,
      facts: [['지면→횃불', '92.99m'], ['조각상', '46.05m'], ['받침대', '46.94m']],
      size: '지면에서 횃불까지 92.99m (조각상 46.05m + 받침대 46.94m)',
      scale: '미국 국립공원관리청(NPS) 공식 실측 1:1 실제 사진 전시',
      note: '미국 국립공원관리청(NPS) 공식 치수 및 사진',
      docent: '미국 뉴욕의 상징인 자유의 여신상입니다. 받침 구조와 조각상이 합쳐져 93m에 달하는 웅장한 실물 사진과 높이를 비교해 보세요.',
      caution: '동판(구리)이 시간이 지나 산화되면서 붉은 동색에서 현재의 청록색(녹청)으로 변했습니다.',
      look: '발밑에서 까마득한 횃불 높이까지 올려다보며 실제 크기를 체감해 보세요.',
      source: 'https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm', rights: '원작: Public Domain · 고화질 실물 사진 전시'
    },
    {
      id: 'moai', order: '04', title: '이스터섬 모아이 석상', short: '모아이 석상',
      subtitle: '칠레 라파누이 · 1250–1500년경 · 실제 작품 사진 전시', position: [72, 0, -142], arrival: [72, 1.62, -148], lookAt: [72, 2.5, -142],
      photoFile: 'assets/moai.jpg', boardW: 4.8, boardH: 6.6, footW: 4.0, footD: 2.5, footH: 6.6,
      facts: [['석상 높이', '약 4.0m'], ['대좌 포함', '6.6m'], ['무게', '약 20톤']],
      size: '석상 높이 4m (아후 석조 대좌 및 푸카오 포함 6.6m)',
      scale: '라파누이 유적 아후 통가리키 실측 1:1 실제 사진 전시',
      note: '이스터섬 유적 고화질 사진 전시',
      docent: '칠레 이스터섬의 거대한 모아이 석상입니다. 우뚝 솟은 턱선과 길쭉한 얼굴, 머리 위의 붉은 화산석 모자(푸카오)의 실물 사진을 감상해 보세요.',
      caution: '모아이는 바다를 등지고 마을을 바라보며 주민들을 지키는 수호신의 역할을 했습니다.',
      look: '1.45m 어린이 캐릭터와 모아이 석상의 눈높이를 직접 비교해 보세요.',
      source: 'https://whc.unesco.org/en/list/715/', rights: '원작: 세계유산 · 고화질 실물 사진 전시'
    },
    {
      id: 'towers', order: '05', title: '불국사 다보탑 & 석가탑', short: '다보탑 · 석가탑',
      subtitle: '통일신라 751년 · 국보 · 실제 작품 사진 전시', position: [132, 0, 118], arrival: [145, 1.62, 118], lookAt: [132, 6, 118],
      photoFile: 'assets/towers.jpg', boardW: 14.0, boardH: 10.75, footW: 12.0, footD: 6.0, footH: 10.75,
      facts: [['석가탑 높이', '10.75m'], ['다보탑 높이', '10.29m'], ['재질', '화강암']],
      size: '석가탑 10.75m / 다보탑 10.29m',
      scale: '국가유산청 정밀 실측 1:1 실제 사진 전시',
      note: '국가유산청 공식 실측 및 고화질 사진',
      docent: '신라 석탑의 정수를 보여주는 다보탑과 석가탑입니다. 석가탑의 기하학적 균형미와 다보탑의 화려한 조각 예술을 실물 사진으로 살펴보세요.',
      caution: '두 탑은 형태가 완전히 다르지만 높이가 약 10.5m로 비슷하여 완벽한 조화를 이룹니다.',
      look: '화강암을 정교하게 깎아 만든 실물 탑의 비례와 문양을 비교해 보세요.',
      source: 'https://portal.nrich.go.kr/', rights: '원작: 국보 유물 · 고화질 실물 사진 전시'
    },
    {
      id: 'muyongchong', order: '06', title: '무용총 수렵도', short: '무용총 수렵도',
      subtitle: '고구려 5세기 · 고분 벽화 · 실제 작품 사진 전시', position: [-142, 0, 112], arrival: [-142, 1.62, 106], lookAt: [-142, 2.2, 112],
      photoFile: 'assets/muyongchong.jpg', boardW: 6.4, boardH: 3.6, footW: 5.8, footD: 1.0, footH: 3.2,
      facts: [['벽화 가로', '약 5.8m'], ['벽화 세로', '약 3.2m'], ['장소', '중국 길림성 집안']],
      size: '고분 벽면 1:1 실측 크기 (가로 5.8m × 높이 3.2m)',
      scale: '고구려 고분 벽화 1:1 실측 규격 실제 사진 전시',
      note: '고구려 벽화 1:1 실측 고화질 사진 전시',
      docent: '말 위에서 활을 쏘는 고구려 무사의 역동적인 모습과 달아나는 호랑이, 사슴의 원본 실물 벽화 사진입니다.',
      caution: '중국 길림성 집안에 위치한 무용총 고분의 현실 동쪽 벽면 벽화입니다.',
      look: '말을 탄 무사가 뒤를 돌아보며 활시위를 당기는 파르티안 쏘기 동작을 선명한 사진으로 찾아보세요.',
      source: 'http://nrich.go.kr/', rights: '원작: 고구려 벽화 · 고화질 실물 사진 전시'
    },
    {
      id: 'lamassu', order: '07', title: '람마수 (날개 달린 황소상)', short: '람마수 황소상',
      subtitle: '고대 아시리아 기원전 8세기 · 실제 작품 사진 전시', position: [0, 0, 135], arrival: [0, 1.62, 142], lookAt: [0, 2.5, 135],
      photoFile: 'assets/lamassu.jpg', boardW: 5.2, boardH: 4.4, footW: 1.4, footD: 4.4, footH: 4.4,
      facts: [['높이', '4.4m'], ['길이', '4.4m'], ['너비', '1.4m']],
      size: '높이 4.4m × 길이 4.4m × 너비 1.4m',
      scale: '루브르/대영박물관 소장 유물 1:1 실측 실제 사진 전시',
      note: '대영박물관 / 루브르 소장 유물 고화질 사진 전시',
      docent: '고대 아시리아 궁전을 지키던 수호신 람마수의 실제 유물 사진입니다. 사람의 얼굴, 황소의 몸, 독수리의 날개를 한 정교한 조각 형태를 관람해 보세요.',
      caution: '앞에서 볼 때는 서 있고 옆에서 볼 때는 걷는 것처럼 보이도록 발을 5개로 조각했습니다.',
      look: '네모난 수염과 뿔 달린 왕관, 독수리 깃털 조각의 선명한 실물 사진을 감상해 보세요.',
      source: 'https://www.britishmuseum.org/', rights: '원작: 고대 유물 · 고화질 실물 사진 전시'
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
  const textureLoader = new THREE.TextureLoader();
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
    darkStone: new THREE.MeshStandardMaterial({ color: 0x242726, roughness: .92 }),
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

  function footprintLines(width, depth, height) {
    const g = new THREE.Group(), color = 0xe6efac;
    const y = .07, x = width / 2, z = depth / 2;
    [[[-x, y, -z], [x, y, -z]], [[x, y, -z], [x, y, z]], [[x, y, z], [-x, y, z]], [[-x, y, z], [-x, y, -z]]]
      .forEach(pair => g.add(makeLine(new THREE.Vector3(...pair[0]), new THREE.Vector3(...pair[1]), color)));
    const corner = new THREE.Vector3(x, y, -z);
    g.add(makeLine(corner, new THREE.Vector3(x, height, -z), color));
    for (const yy of [0, height]) g.add(makeLine(new THREE.Vector3(x - .35, Math.max(y, yy), -z), new THREE.Vector3(x + .35, Math.max(y, yy), -z), color));
    return g;
  }

  function buildPhotoExhibit(zone) {
    const g = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x18392f, roughness: .74, metalness: .08 });
    
    box([zone.boardW + .5, .25, .28], frameMat, g, [0, .12, 0]);
    box([zone.boardW + .5, .25, .28], frameMat, g, [0, zone.boardH + .12, 0]);
    box([.25, zone.boardH, .28], frameMat, g, [-zone.boardW / 2 - .12, zone.boardH / 2 + .12, 0]);
    box([.25, zone.boardH, .28], frameMat, g, [zone.boardW / 2 + .12, zone.boardH / 2 + .12, 0]);
    
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, toneMapped: false });
    const photo = addMesh(new THREE.PlaneGeometry(zone.boardW, zone.boardH), material, g, [0, zone.boardH / 2 + .12, .19], false);
    
    textureLoader.load(zone.photoFile, t => {
      t.encoding = THREE.sRGBEncoding;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      material.map = t;
      material.needsUpdate = true;
    });

    box([Math.min(zone.boardW + 2, 68), .34, 2.2], MAT.darkStone, g, [0, .17, .28]);
    for (const x of [-Math.min(zone.boardW * .38, 11), Math.min(zone.boardW * .38, 11)]) {
      box([.28, Math.min(zone.boardH * .24, 5), .45], MAT.darkStone, g, [x, Math.min(zone.boardH * .12, 2.5), .18]);
    }

    const outline = footprintLines(zone.footW, zone.footD, zone.footH);
    outline.position.z = zone.footD / 2 + 3;
    g.add(outline);

    g.userData.zone = zone;
    photo.userData.zone = zone;
    return g;
  }

  function addPhotoMarker(zone, model) {
    const [x, , z] = zone.position;
    const marker = makeScaleMarker(1.45, '어린이 1.45m');
    marker.position.set(x + zone.boardW / 2 + 2.2, 0, z);
    park.add(marker);

    const label = makeLabel(zone.title, zone.size, 9);
    label.position.set(x, 3.8, z + 6);
    label.lookAt(camera.position.x, 3.8, camera.position.z);
    label.userData.faceCamera = true;
    park.add(label);

    zoneObjects.push(model);
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
    const hubLabel = makeLabel('실물 사진 야외 미술 공원', '1:1 실측 치수선 & 실제 작품 사진 전시', 9); hubLabel.position.set(0, 7.5, 0); hubLabel.userData.faceCamera = true; park.add(hubLabel);

    ZONES.forEach(zone => {
      const model = buildPhotoExhibit(zone);
      model.position.set(zone.position[0], 0, zone.position[2]);
      model.lookAt(zone.arrival[0], 0, zone.arrival[2]);
      park.add(model);
      addPhotoMarker(zone, model);
    });

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
    measurePanel.hidden = false; measureKicker.textContent = `ZONE ${zone.order} · ACTUAL PHOTO`; measureTitle.textContent = zone.title;
    measureFacts.innerHTML = zone.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('');
    measureNote.textContent = zone.note;
  }
  function openDetail(zone) {
    if (!zone) return;
    document.getElementById('modal-kicker').textContent = `ZONE ${zone.order} · REAL PHOTO`;
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
