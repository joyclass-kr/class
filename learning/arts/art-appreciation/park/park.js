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

  // 05번 전시실(입체·공간)과 100% 동일한 THREE.GLTFLoader 기반 3D 스캔 GLB 로딩 시스템
    const ZONES = [
    {
      id: 'haetae', order: '01', title: '광화문 해치상', short: '광화문 해치',
      subtitle: '조선 · 국립문화유산연구원 3D 스캔 GLB', position: [9, 0, -17.75], arrival: [9, 1.62, -23.75], lookAt: [9, 1.8, -17.75],
      modelPath: '../museum/assets/models/gwanghwamun-haetae.glb', realHeight: 3.507, materialTint: 0x817d75, preserveMaterials: true,
      image: 'assets/haetae.jpg',
      facts: [['길이', '2.756m'], ['너비', '1.862m'], ['높이', '3.507m']],
      size: '길이 275.6cm x 너비 186.2cm x 높이 350.7cm',
      scale: '국가유산청 3D 포토그래메트리 스캔 GLB 1:1',
      note: '국가유산 3D 기록정보 정밀 실측 포토그래메트리 스캔',
      docent: '광화문 앞 좌우에는 해치상이 한 쌍으로 서 있어요. 해치는 옳고 그름을 가리고 불과 나쁜 기운을 막는다고 여긴 상상의 수호 동물이에요.',
      caution: '사자와 비슷하지만 상상의 동물이며 머리의 뿔과 몸의 갈기 표현이 특징입니다.',
      look: '옆으로 돌아가며 둥근 눈과 코, 갈기와 몸을 덮은 소용돌이무늬가 어떻게 이어지는지 살펴보세요.',
      source: 'https://portal.nrich.go.kr/', rights: '국가유산청 3D 포토그래메트리 스캔 GLB',
      quiz: { q: '광화문 앞 해치 조각은 전통적으로 어떤 역할을 맡은 상상 동물일까요?', options: ['옳고 그름을 가리고 나쁜 기운을 막는 수호자', '비를 부르는 바다의 왕', '곡식을 나르는 농사 동물'], answer: 0, explain: '해치는 시비와 선악을 가리고 화재와 나쁜 기운을 막는 수호 동물로 여겨졌어요.' }
    },
    {
      id: 'thinker', order: '02', title: '생각하는 사람', short: '생각하는 사람',
      subtitle: '오귀스트 로댕 · Scan the World 3D 스캔 GLB', position: [-7.5, 0, -19.5], arrival: [-7.5, 1.62, -26.5], lookAt: [-7.5, 2.5, -19.5],
      modelPath: '../museum/assets/models/thinker.glb', realHeight: 1.89, materialColor: 0x38271d, metalness: 0.78, roughness: 0.3,
      image: '../museum/assets/artworks/d01.png',
      facts: [['높이', '1.89m'], ['재질', '청동 주조본'], ['제작', '1903년']],
      size: '높이 189cm (대형 청동 주조본 기준)',
      scale: 'Scan the World 3D 정밀 스캔 GLB 실물 크기',
      note: '로댕 미술관 소장 원작 Scan the World 3D 스캔',
      docent: '온몸의 근육에 힘을 준 채 깊이 생각하는 사람을 입체로 표현했어요.',
      caution: '단테의 신곡에 나오는 지옥의 문 위에서 인간을 관조하는 시인의 모습을 청동으로 표현했습니다.',
      look: '정면과 옆면을 오가며 팔·등·다리가 만드는 큰 덩어리를 비교해 보세요.',
      source: 'https://www.musee-rodin.fr/', rights: 'Public Domain · Scan the World 3D 스캔 GLB',
      quiz: { q: '로댕의 〈생각하는 사람〉 원작 대형 주조본의 재료는 무엇일까요?', options: ['청동', '종이', '유리'], answer: 0, explain: '거친 표면과 묵직한 근육을 청동으로 주조해 강한 에너지를 만들었어요.' }
    },
    {
      id: 'david', order: '03', title: '다비드상', short: '다비드상',
      subtitle: '미켈란젤로 · Scan the World 3D 스캔 GLB', position: [19.375, 0, -6.875], arrival: [19.375, 1.62, -23.875], lookAt: [19.375, 5, -6.875],
      modelPath: '../museum/assets/models/david.glb', realHeight: 5.17, materialColor: 0xded8cc, roughness: 0.55,
      image: '../museum/assets/artworks/d02.jpg',
      facts: [['높이', '5.17m'], ['재질', '대리석'], ['제작', '1501-1504년']],
      size: '높이 5.17m (좌대 제외 실측)',
      scale: 'Scan the World 3D 정밀 스캔 GLB 실물 크기',
      note: '피렌체 아카데미아 미술관 원작 Scan the World 3D 스캔',
      docent: '싸움을 시작하기 전 집중한 다윗을 사람보다 세 배 가까이 크게 조각했어요.',
      caution: '아래에서 올려다볼 때 비율이 자연스럽게 보이도록 머리와 오른손을 약간 더 크게 조각했습니다.',
      look: '커다란 머리와 손이 아래에서 올려다볼 때 자연스럽게 보이는지 살펴보세요.',
      source: 'https://www.galleriaaccademiafirenze.it/', rights: 'Public Domain · Scan the World 3D 스캔 GLB',
      quiz: { q: '미켈란젤로의 〈다비드〉는 이야기의 어느 순간을 표현했을까요?', options: ['싸움을 앞두고 긴장한 순간', '승리 뒤 잠든 순간', '왕관을 쓰는 순간'], answer: 0, explain: '집중한 눈과 팽팽한 몸, 커다란 손이 골리앗과 맞서기 직전의 긴장을 보여 줘요.' }
    },
    {
      id: 'venus', order: '04', title: '밀로의 비너스', short: '밀로의 비너스',
      subtitle: '알렉산드로스 추정 · Scan the World 3D 스캔 GLB', position: [-19.375, 0, -6.875], arrival: [-19.375, 1.62, -23.875], lookAt: [-19.375, 2.2, -6.875],
      modelPath: '../museum/assets/models/venus-de-milo.glb', realHeight: 2.04, materialColor: 0xd9d2c5, roughness: 0.58,
      image: '../museum/assets/artworks/d05.jpg',
      facts: [['높이', '2.04m'], ['재질', '대리석'], ['제작', '기원전 150-125년경']],
      size: '높이 204cm',
      scale: 'Scan the World 루브르 3D 스캔 GLB 실물 크기',
      note: '루브르 박물관 소장 원작 Scan the World 3D 스캔',
      docent: '몸의 무게를 한쪽 다리에 싣고 상체를 반대로 틀어 부드러운 S자 균형을 만들었어요.',
      caution: '두 팔은 발견 당시부터 없었지만, 그 비어있는 공간 덕분에 더욱 완벽한 클래식 미의 상징이 되었습니다.',
      look: '어깨와 골반이 서로 어느 방향으로 기울었는지 비교해 보세요.',
      source: 'https://collections.louvre.fr/', rights: 'Public Domain · Scan the World 3D 스캔 GLB',
      quiz: { q: '〈밀로의 비너스〉가 부드럽게 움직이는 것처럼 보이는 까닭은?', options: ['몸 전체가 완전한 직선이라서', '어깨와 골반이 반대로 기울어서', '좌우가 완벽히 대칭이라서'], answer: 1, explain: '한쪽 다리에 무게를 싣고 어깨와 골반을 반대로 기울인 자세가 S자 흐름을 만들어요.' }
    },
    {
      id: 'pieta', order: '05', title: '피에타상', short: '피에타상',
      subtitle: '미켈란젤로 · Scan the World 3D 스캔 GLB', position: [0, 0, -21.25], arrival: [0, 1.62, -29.25], lookAt: [0, 2.5, -21.25],
      modelPath: '../museum/assets/models/pieta.glb', realHeight: 1.75, materialColor: 0xdbd5c8, roughness: 0.56,
      image: '../museum/assets/artworks/d06.jpg',
      facts: [['높이', '1.75m'], ['너비', '1.95m'], ['재질', '대리석']],
      size: '높이 1.75m x 너비 1.95m',
      scale: 'Scan the World 3D 스캔 GLB 실물 크기',
      note: '바티칸 성 베드로 대성당 소장 원작 Scan the World 3D 스캔',
      docent: '마리아가 죽은 예수를 안고 있는 슬픈 순간을 하나의 안정된 삼각형으로 묶었어요.',
      caution: '미켈란젤로가 자신의 이름을 마리아 옷띠에 직접 조각한 유일한 작품입니다.',
      look: '머리에서 넓은 옷자락까지 이어지는 삼각형 구도를 찾아보세요.',
      source: 'https://www.museivaticani.va/', rights: 'Public Domain · Scan the World 3D 스캔 GLB',
      quiz: { q: '미켈란젤로의 〈피에타〉에서 두 인물을 안정적으로 묶는 큰 구도는?', options: ['삼각형', '가느다란 수직선', '완전한 원'], answer: 0, explain: '마리아의 머리에서 넓게 퍼진 옷자락까지 이어지는 삼각형이 예수의 몸을 품으며 안정감을 만들어요.' }
    },
    {
      id: 'sphinx', order: '06', title: '기자의 대스핑크스', short: '대스핑크스',
      subtitle: '고대 이집트 기원전 2500년경 · 3D 포토그래메트리 스캔', position: [0, 0, 50], arrival: [40, 1.62, 50], lookAt: [0, 10, 50], modelRotation: [0, Math.PI, 0],
      modelPath: 'assets/models/sphinx.glb', realHeight: 20.22, preserveMaterials: true,
      image: 'assets/sphinx.jpg',
      facts: [['길이', '73.5m'], ['너비', '19m'], ['높이', '20.22m']],
      size: '길이 73.5m x 너비 19m x 높이 20.22m',
      scale: '실측 1:1 포토그래메트리 스캔 GLB',
      note: '고대 이집트 기자 고원 실측 3D 스캔 데이터',
      docent: '사자의 몸과 왕의 머리가 결합된 고대 이집트의 거대한 수호상입니다. 석회암 바위산 하나를 통째로 깎아 만든 실제 크기 20m를 체험해 보세요.',
      caution: '세계 최대 크기의 단일 석조 조각상입니다.',
      look: '발끝에서 꼬리까지 옆길을 따라 걸어보세요.',
      source: 'https://giza.fas.harvard.edu/', rights: '3D 포토그래메트리 스캔 · CC Attribution',
      quiz: { q: '기자의 대스핑크스는 어떤 두 가지가 결합된 모습일까요?', options: ['사자의 몸과 사람의 머리', '새의 날개와 물고기의 꼬리', '말의 다리와 독수리의 머리'], answer: 0, explain: '사자의 강한 몸에 파라오의 얼굴을 결합해 절대적인 힘과 권위를 상징했어요.' }
    },
    {
      id: 'liberty', order: '07', title: '자유의 여신상', short: '자유의 여신상',
      subtitle: '프레데리크 바르톨디 1886 · 3D 포토그래메트리 스캔', position: [52, 0, 0], arrival: [52, 1.62, -58], lookAt: [52, 46, 0], modelRotation: [0, Math.PI, 0],
      modelPath: 'assets/models/statue-of-liberty.glb', realHeight: 46.05, preserveMaterials: true,
      image: 'assets/liberty.jpg',
      facts: [['조각상 높이', '46.05m'], ['받침대', '46.94m'], ['총 높이', '92.99m']],
      size: '조각상 46.05m (받침대 제외)',
      scale: '실측 1:1 포토그래메트리 스캔 GLB',
      note: '미국 국립공원관리청(NPS) 공식 실측 수치',
      docent: '미국 뉴욕의 상징인 자유의 여신상입니다. 조각상 본체만 46m의 실제 크기를 3D 공간에서 올려다보세요.',
      caution: '겉표면 동판이 산화되어 청록색으로 변했습니다.',
      look: '발밑에서 횃불 끝까지 올려다본 뒤 뒤로 멀리 물러나 전체 비례를 확인하세요.',
      source: 'https://www.nps.gov/stli/', rights: '3D 포토그래메트리 스캔 · CC Attribution',
      quiz: { q: '자유의 여신상 표면이 원래 구릿빛에서 지금의 청록색으로 변한 까닭은?', options: ['동판이 공기와 만나 산화되어서', '원래부터 청록색 동판을 사용해서', '바닷물에 오랫동안 잠겨 있어서'], answer: 0, explain: '구리로 만든 겉면이 오랜 세월 공기 중 산소와 만나 청록색 녹으로 덮였어요.' }
    },
    {
      id: 'moai', order: '08', title: '이스터섬 모아이 석상', short: '모아이 석상',
      subtitle: '칠레 라파누이 1250-1500년경 · 3D 포토그래메트리 스캔', position: [0, 0, 14], arrival: [0, 1.62, 6], lookAt: [0, 3, 14],
      modelPath: 'assets/models/moai.glb', realHeight: 4.0, preserveMaterials: true, modelRotation: [0.2198, -0.0040, -0.0370], groundSink: 0.45,
      image: 'assets/moai.jpg',
      facts: [['평균 높이', '약 4.0m'], ['무게', '약 14톤'], ['재질', '현무암']],
      size: '높이 약 4.0m (평균 크기 기준)',
      scale: '실측 1:1 포토그래메트리 스캔 GLB',
      note: '라파누이 국립공원 유적 3D 스캔',
      docent: '태평양 이스터섬에 우뚝 선 모아이 석상입니다. 돌출된 긴 코와 커다란 턱의 3D 입체 구조를 오가며 감상해 보세요.',
      caution: '모아이는 바다를 등지고 섬 내부의 마을을 바라보고 있습니다.',
      look: '우뚝 솟은 턱선과 귓볼의 묵직한 3D 형태를 살펴보세요.',
      source: 'https://whc.unesco.org/en/list/715/', rights: '3D 포토그래메트리 스캔 · CC Attribution',
      quiz: { q: '이스터섬 모아이 석상은 어느 방향을 바라보고 서 있을까요?', options: ['바다를 등지고 마을 쪽', '마을을 등지고 바다 쪽', '하늘을 향해 위쪽'], answer: 0, explain: '모아이는 바다를 등지고 서서 섬 안의 마을과 사람들을 지켜보듯 서 있어요.' }
    },
    {
      id: 'lamassu', order: '09', title: '람마수 (날개 달린 황소상)', short: '람마수 황소상',
      subtitle: '고대 아시리아 기원전 8세기 · 3D 포토그래메트리 스캔', position: [0, 0, -13.75], arrival: [0, 1.62, 0.25], lookAt: [0, 2.5, -13.75],
      modelPath: 'assets/models/lamassu.glb', realHeight: 4.4, preserveMaterials: true,
      image: 'assets/lamassu.jpg',
      facts: [['높이', '4.4m'], ['길이', '4.4m'], ['재질', '석회암']],
      size: '높이 4.4m x 길이 4.4m',
      scale: '실측 1:1 포토그래메트리 스캔 GLB',
      note: '대영박물관 소장 유물 3D 스캔',
      docent: '고대 아시리아 궁전 문을 지키던 수호신입니다. 사람의 얼굴, 독수리의 날개, 황소의 몸을 하고 있는 정교한 3D 입체 조각을 둘러보세요.',
      caution: '앞에서 볼 때는 서 있고 옆에서 볼 때는 걷는 것처럼 보이도록 발을 5개로 조각했습니다.',
      look: '황소 몸통의 옆면을 따라가며 5번째 발과 독수리 날개 조각을 확인해 보세요.',
      source: 'https://www.britishmuseum.org/', rights: '3D 포토그래메트리 스캔 · CC Attribution',
      quiz: { q: '람마수 조각상은 왜 다리를 5개로 조각했을까요?', options: ['앞에서도 옆에서도 자연스러워 보이도록', '실수로 하나를 더 조각해서', '다섯 신을 상징하기 위해서'], answer: 0, explain: '앞에서 보면 서 있는 모습, 옆에서 보면 걷는 모습이 되도록 다리를 하나 더 넣어 5개로 조각했어요.' }
    }
  ];
  const canvas = document.getElementById('park-canvas');
  const loading = document.getElementById('loading');
  const measurePanel = document.getElementById('measure-panel');
  const measureKicker = document.getElementById('measure-kicker');
  const measureTitle = document.getElementById('measure-title');
  const measureFacts = document.getElementById('measure-facts');
  const measureNote = document.getElementById('measure-note');
  const currentZone = document.getElementById('current-zone');
  const compassArrow = document.getElementById('compass-arrow');
  const detailModal = document.getElementById('detail-modal');
  const helpModal = document.getElementById('help-modal');
  const finaleModal = document.getElementById('finale-modal');
  const finaleOptions = document.getElementById('finale-options');
  const finaleNext = document.getElementById('finale-next');
  const finaleFeedback = document.getElementById('finale-feedback');
  let quizQuestions = [];
  let quizIndex = 0;
  let quizCorrect = 0;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9fc8d9);
  scene.fog = new THREE.Fog(0xaccbd0, 55, 150);

  const camera = new THREE.PerspectiveCamera(61, innerWidth / innerHeight, .08, 650);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, 1.62, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  const clock = new THREE.Clock();
  const gltfLoader = new THREE.GLTFLoader();
  const keys = Object.create(null);
  const raycaster = new THREE.Raycaster();
  const centerPointer = new THREE.Vector2(0, 0);
  const zoneObjects = [];
  const quizObjects = [];
  const zoneObstacles = [];
  const park = new THREE.Group();
  scene.add(park);
  let yaw = 0, pitch = -.06, dragging = false, dragStart = null, activeZone = null;
  const velocity = new THREE.Vector3();
  const tmpDirection = new THREE.Vector3();
  const tmpRight = new THREE.Vector3();

  const presenceEl = document.getElementById('class-presence');
  const remotePeople = new Map();
  const remoteLayer = new THREE.Group(); scene.add(remoteLayer);
  let presenceSocket = null, presenceTimer = 0, localPresenceId = null, presenceScope = 'class';
  const avatarColors = [0x547da6, 0x9d5b4c, 0x5a896a, 0x886ca5];
  function avatarColor(value) { const text = String(value || ''); let hash = 0; for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0; return avatarColors[hash % avatarColors.length]; }
  function personLabel(name) { const c = document.createElement('canvas'); c.width = 300; c.height = 64; const g = c.getContext('2d'); g.fillStyle = 'rgba(9,7,5,.82)'; g.fillRect(0, 4, 300, 52); g.strokeStyle = '#d6b66b'; g.strokeRect(1, 5, 298, 50); g.fillStyle = '#fff0ca'; g.textAlign = 'center'; g.font = 'bold 25px sans-serif'; g.fillText(name, 150, 39); const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false })); }
  function makeSelfAvatar() {
    const group = new THREE.Group();
    const cloth = new THREE.MeshStandardMaterial({ color: 0x547da6, roughness: .72 });
    const skin = new THREE.MeshStandardMaterial({ color: 0xe2ad88, roughness: .82 });
    const hair = new THREE.MeshStandardMaterial({ color: 0x241a15, roughness: .92 });
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(.2, .27, .58, 14), cloth); torso.position.y = .94;
    const shoulders = new THREE.Mesh(new THREE.BoxGeometry(.58, .16, .22), cloth); shoulders.position.set(0, 1.17, 0);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(.075, .085, .13, 12), skin); neck.position.y = 1.3;
    const head = new THREE.Mesh(new THREE.SphereGeometry(.19, 18, 14), skin); head.position.y = 1.47;
    const hairCap = new THREE.Mesh(new THREE.SphereGeometry(.198, 18, 10, 0, Math.PI * 2, 0, Math.PI * .58), hair); hairCap.position.set(0, 1.5, .005);
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(.065, .075, .48, 10), cloth); leftArm.position.set(-.28, .92, 0); leftArm.rotation.z = -.08;
    const rightArm = leftArm.clone(); rightArm.position.x = .28; rightArm.rotation.z = .08;
    group.add(torso, shoulders, neck, head, hairCap, leftArm, rightArm);
    group.userData.cloth = cloth;
    group.scale.setScalar(.72);
    group.traverse(part => { if (part.isMesh) { part.castShadow = false; part.receiveShadow = false; part.renderOrder = 3; } });
    return group;
  }
  const selfAvatar = makeSelfAvatar(); scene.add(selfAvatar);
  function makePerson(visitor) { const g = new THREE.Group(), cloth = new THREE.MeshStandardMaterial({ color: avatarColor(visitor.userId), roughness: .7, transparent: true, opacity: .86 }); const skin = new THREE.MeshStandardMaterial({ color: 0xe4b18d, roughness: .8, transparent: true, opacity: .86 }); const head = new THREE.Mesh(new THREE.SphereGeometry(.17, 16, 12), skin); head.position.y = 1.38; const body = new THREE.Mesh(new THREE.CylinderGeometry(.18, .24, .54, 12), cloth); body.position.y = .93; const leg = new THREE.Mesh(new THREE.CylinderGeometry(.07, .08, .42, 10), new THREE.MeshStandardMaterial({ color: 0x23252c, transparent: true, opacity: .86 })); leg.position.set(-.09, .42, 0); const leg2 = leg.clone(); leg2.position.x = .09; g.add(head, body, leg, leg2); const label = personLabel(visitor.name); label.position.y = 1.78; label.scale.set(.9, .19, 1); g.add(label); remoteLayer.add(g); return g; }
  function updatePeople(visitors) { const visible = visitors.filter(v => v.userId !== localPresenceId); const ids = new Set(visible.map(v => v.userId)); for (const [id, entry] of remotePeople) { if (!ids.has(id)) { remoteLayer.remove(entry.group); remotePeople.delete(id); } } for (const v of visible) { let entry = remotePeople.get(v.userId); if (!entry) { entry = { group: makePerson(v) }; remotePeople.set(v.userId, entry); } entry.x = v.x; entry.z = v.z; entry.yaw = v.yaw; entry.group.position.set(v.x, 0, v.z); entry.group.rotation.y = v.yaw; } }
  async function connectClassPresence() { try { const name = String(localStorage.getItem('classPlayerName') || '').trim(); let clientId = localStorage.getItem('museumPresenceClientId'); if (!clientId) { clientId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`; localStorage.setItem('museumPresenceClientId', clientId); } const query = new URLSearchParams({ name, clientId }); const response = await fetch(`/api/museum/presence-ticket?${query}`); if (!response.ok) return; const payload = await response.json(); presenceScope = payload.scope || 'class'; const proto = location.protocol === 'https:' ? 'wss' : 'ws'; presenceSocket = new WebSocket(`${proto}://${location.host}`); presenceSocket.addEventListener('open', () => presenceSocket.send(JSON.stringify({ type: 'PARK_JOIN', ticket: payload.ticket }))); presenceSocket.addEventListener('message', event => { const msg = JSON.parse(event.data); if (msg.type === 'PARK_JOINED') { localPresenceId = msg.userId; selfAvatar.userData.cloth.color.setHex(avatarColor(msg.userId)); } if (msg.type === 'PARK_STATE') { updatePeople(msg.visitors); const here = msg.visitors.length; presenceEl.textContent = presenceScope === 'open' ? `함께 탐험 중 ${here}명` : `우리 반 함께 탐험 중 ${here}명`; presenceEl.hidden = false; } }); } catch (_) {} }
  function sendPresence() { if (!presenceSocket || presenceSocket.readyState !== WebSocket.OPEN) return; const now = performance.now(); if (now - presenceTimer < 100) return; presenceTimer = now; presenceSocket.send(JSON.stringify({ type: 'PARK_MOVE', x: camera.position.x, z: camera.position.z, yaw })); }
  function updateSelfAvatar() {
    const forwardX = -Math.sin(yaw), forwardZ = -Math.cos(yaw);
    selfAvatar.position.set(camera.position.x + forwardX * 1.05, -.12, camera.position.z + forwardZ * 1.05);
    selfAvatar.rotation.y = yaw;
    selfAvatar.visible = !detailModal.open && !helpModal.open;
  }

  const textureLoader = new THREE.TextureLoader();

  function surfaceTexture(path, repeatX, repeatY, color = true) {
    const texture = textureLoader.load(path);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.anisotropy = Math.min(12, renderer.capabilities.getMaxAnisotropy());
    if (color) texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  const grassAlbedo = surfaceTexture('assets/textures/grass-albedo.jpg', 48, 48);
  const grassBump = surfaceTexture('assets/textures/grass-bump.jpg', 48, 48, false);
  const pathAlbedo = surfaceTexture('assets/textures/stone-path-albedo.jpg', 16, 16);
  const pathBump = surfaceTexture('assets/textures/stone-path-bump.jpg', 16, 16, false);
  const graniteAlbedo = surfaceTexture('assets/textures/granite-pedestal-albedo.jpg', 4, 4);
  const graniteBump = surfaceTexture('assets/textures/granite-pedestal-bump.jpg', 4, 4, false);

  const MAT = {
    grass: new THREE.MeshStandardMaterial({ map: grassAlbedo, bumpMap: grassBump, bumpScale: 0.12, roughness: .94 }),
    path: new THREE.MeshStandardMaterial({ map: pathAlbedo, bumpMap: pathBump, bumpScale: 0.08, roughness: .88 }),
    pathEdge: new THREE.MeshStandardMaterial({ map: pathAlbedo, bumpMap: pathBump, bumpScale: 0.15, roughness: .82 }),
    sandstone: new THREE.MeshStandardMaterial({ color: 0xc8ad78, roughness: .9 }),
    darkStone: new THREE.MeshStandardMaterial({ map: graniteAlbedo, bumpMap: graniteBump, bumpScale: 0.06, roughness: .92 }),
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
  function sculptureMaterial(zone) {
    if (zone.id === 'thinker') return new THREE.MeshStandardMaterial({ color: 0x38271d, roughness: .3, metalness: .78 });
    if (zone.id === 'emille') return new THREE.MeshStandardMaterial({ color: 0x4a4338, roughness: .45, metalness: .55 });
    if (zone.id === 'liberty') return new THREE.MeshStandardMaterial({ color: 0x5c9582, roughness: .65, metalness: .15 });
    if (zone.id === 'moai') return new THREE.MeshStandardMaterial({ color: 0x5e5b54, roughness: .98, metalness: .02 });
    return new THREE.MeshStandardMaterial({ color: 0xbab2a5, roughness: .58, metalness: .02 });
  }

  function loadZoneModel(zone) {
    const rootGroup = new THREE.Group();
    rootGroup.position.set(zone.position[0], 0, zone.position[2]);
    rootGroup.userData.zone = zone;

    const baseW = Math.max(3.5, zone.realHeight * 0.4);
    const plinth = box([baseW, 0.4, baseW], MAT.darkStone, rootGroup, [0, 0.2, 0]);
    plinth.receiveShadow = true;
    plinth.frustumCulled = false;  // 받침대가 카메라 경계에서 갑자기 사라지는 현상 방지

    gltfLoader.load(zone.modelPath, (gltf) => {
      const model = gltf.scene;
      model.matrixAutoUpdate = true;
      if (zone.modelRotation) model.rotation.set(zone.modelRotation[0], zone.modelRotation[1], zone.modelRotation[2]);

      const mat = zone.preserveMaterials ? null : sculptureMaterial(zone);

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.geometry.computeVertexNormals();

          if (mat) {
            child.material = mat;
          } else if (zone.materialTint && child.material) {
            child.material = child.material.clone();
            child.material.color.multiply(new THREE.Color(zone.materialTint));
            child.material.roughness = Math.max(.7, child.material.roughness || 0);
            child.material.metalness = 0;
          }
        }
      });

      const bounds = new THREE.Box3().setFromObject(model);
      const naturalH = Math.max(0.01, bounds.max.y - bounds.min.y);
      const scaleFactor = zone.realHeight / naturalH;
      model.scale.setScalar(scaleFactor);

      const scaledBounds = new THREE.Box3().setFromObject(model);
      const center = scaledBounds.getCenter(new THREE.Vector3());
      model.position.x = -center.x;
      model.position.z = -center.z;
      model.position.y = 0.4 - scaledBounds.min.y - (zone.groundSink || 0);

      rootGroup.add(model);
    }, undefined, (err) => {
      console.error('Error loading 3D GLB model for zone:', zone.id, err);
    });

    // Room 05-style Sculpture Spotlight & Rim Light
    const spot = new THREE.SpotLight(0xffc77a, 140, Math.max(25, zone.realHeight * 2), Math.PI * 0.25, 0.6, 1.4);
    spot.position.set(zone.position[0] - 3, Math.max(6, zone.realHeight * 0.75 + 3), zone.position[2] + 5);
    spot.target.position.set(zone.position[0], Math.max(2, zone.realHeight * 0.4), zone.position[2]);
    spot.castShadow = true;
    spot.shadow.mapSize.set(512, 512);
    park.add(spot, spot.target);

    const rim = new THREE.PointLight(0xffd6a0, 25, Math.max(15, zone.realHeight * 1.5), 2);
    rim.position.set(zone.position[0] + 3, Math.max(4, zone.realHeight * 0.6), zone.position[2] - 4);
    park.add(rim);

    // 3D 정보 라벨 (전시실 바닥 명패처럼 받침대 옆에 낮고 작게 배치해 관람 시야를 가리지 않도록)
    const label = makeLabel(zone.title, zone.size, 2.2);
    label.position.set(zone.position[0], 0.55, zone.position[2] + baseW / 2 + .6);
    label.lookAt(camera.position.x, 0.55, camera.position.z);
    label.userData.faceCamera = true;
    park.add(label);

    zoneObjects.push(rootGroup);
    park.add(rootGroup);
  }

  function makePark() {
    const ground = addMesh(new THREE.CircleGeometry(90, 96), MAT.grass, park, [0, -.08, 0]); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; ground.castShadow = false;
    const plaza = addMesh(new THREE.CircleGeometry(6, 64), MAT.path, park, [0, .01, 0]); plaza.rotation.x = -Math.PI / 2;
    const ring = addMesh(new THREE.RingGeometry(5, 6, 64), MAT.pathEdge, park, [0, .025, 0]); ring.rotation.x = -Math.PI / 2;

    ZONES.forEach(zone => {
      const dist = Math.hypot(zone.position[0], zone.position[2]);
      const pathMesh = box([6.4, 0.05, dist], MAT.path, park, [zone.position[0] / 2, 0.02, zone.position[2] / 2]);
      pathMesh.rotation.y = Math.atan2(zone.position[0], zone.position[2]);
    });

    const water = addMesh(new THREE.RingGeometry(3, 4.5, 64), MAT.water, park, [0, .04, 0]); water.rotation.x = -Math.PI / 2; water.castShadow = false;
    const hub = cylinder(1.1, 1.3, 1.1, 32, MAT.sandstone, park, [0, .55, 0]);
    const globe = sphere(.8, new THREE.MeshStandardMaterial({ color: 0x7a9f63, roughness: .62, metalness: .08 }), park, [0, 4.1, 0], 32, 20);
    globe.userData.isQuizTrigger = true; quizObjects.push(globe);

    ZONES.forEach(zone => {
      loadZoneModel(zone);
      if (zone.id === 'sphinx') {
        // 실측 비율(길이 73.5m x 너비 19m)과 다르게 원본 스캔은 세로(Z)로 긴 형태라 원형 충돌로는 몸통 안까지 걸어 들어갈 수 있어 실측 발자국에 맞춘 사각 충돌을 사용
        zoneObstacles.push({ x: zone.position[0], z: zone.position[2], hx: 20, hz: 30 });
        return;
      }
      const baseW = Math.max(3.5, zone.realHeight * 0.4);
      zoneObstacles.push({ x: zone.position[0], z: zone.position[2], r: baseW * .72 + .42 });
    });

    for (let i = 0; i < 45; i++) {
      const a = i * 2.399, r = 24 + (i * 37 % 78), x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (ZONES.some(q => Math.hypot(x - q.position[0], z - q.position[2]) < (['sphinx', 'liberty'].includes(q.id) ? 30 : 8))) continue;
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
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -68; sun.shadow.camera.right = 68; sun.shadow.camera.top = 68; sun.shadow.camera.bottom = -68; sun.shadow.camera.far = 150; sun.shadow.bias = -.0002; scene.add(sun);
  }

  function buildTabs() {
    const nav = document.getElementById('zone-tabs');
    nav.innerHTML = '';
    ZONES.forEach(zone => {
      const b = document.createElement('button'); b.className = 'zone-tab'; b.type = 'button'; b.innerHTML = `<i></i><b>${zone.order}. ${zone.short}</b>`;
      b.addEventListener('click', () => teleport(zone)); zone.tab = b; nav.appendChild(b);
    });
  }
  function teleport(zone) {
    camera.position.set(zone.arrival[0], zone.arrival[1], zone.arrival[2]);
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
    document.getElementById('modal-image').src = zone.image || '';
    document.getElementById('modal-kicker').textContent = `ZONE ${zone.order} · REAL 3D SCAN`;
    document.getElementById('modal-title').textContent = zone.title;
    document.getElementById('modal-subtitle').textContent = zone.subtitle;
    document.getElementById('modal-facts').innerHTML = zone.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('');
    document.getElementById('modal-docent').textContent = zone.docent;
    document.getElementById('modal-caution').textContent = zone.caution;
    document.getElementById('modal-look').textContent = zone.look;
    document.getElementById('modal-rights').textContent = zone.rights;
    document.getElementById('modal-source').href = zone.source;
    detailModal.showModal();
  }
  function shuffledCopy(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[result[i], result[j]] = [result[j], result[i]]; }
    return result;
  }
  function startQuiz() {
    quizQuestions = shuffledCopy(ZONES.filter(z => z.quiz).map(z => ({ ...z.quiz, zoneTitle: z.title })));
    quizIndex = 0; quizCorrect = 0;
    document.getElementById('finale-complete').hidden = true;
    document.getElementById('finale-question-wrap').hidden = false;
    renderQuizQuestion();
    finaleModal.showModal();
  }
  function renderQuizQuestion() {
    const item = quizQuestions[quizIndex];
    const total = quizQuestions.length;
    document.getElementById('finale-step').textContent = `QUESTION ${String(quizIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    document.getElementById('finale-progress').style.width = `${quizIndex / total * 100}%`;
    document.getElementById('finale-total').textContent = `${quizCorrect} / ${total}`;
    document.getElementById('finale-question').textContent = `${item.zoneTitle} · ${item.q}`;
    finaleFeedback.textContent = ''; finaleFeedback.classList.remove('correct');
    finaleNext.hidden = true;
    finaleOptions.replaceChildren(...item.options.map((label, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'finale-option'; button.dataset.letter = String.fromCharCode(65 + index); button.textContent = label;
      button.addEventListener('click', () => {
        if (index !== item.answer) { button.classList.add('wrong'); button.disabled = true; finaleFeedback.textContent = '다시 생각하고 다른 답을 골라보세요.'; return; }
        [...finaleOptions.children].forEach(option => option.disabled = true);
        button.classList.add('correct'); quizCorrect++; finaleFeedback.textContent = item.explain; finaleFeedback.classList.add('correct');
        document.getElementById('finale-total').textContent = `${quizCorrect} / ${total}`;
        finaleNext.hidden = false;
      });
      return button;
    }));
  }
  function showQuizCompletion() {
    document.getElementById('finale-question-wrap').hidden = true;
    document.getElementById('finale-complete').hidden = false;
    const total = quizQuestions.length;
    document.getElementById('finale-stamp-number').textContent = String(quizCorrect).padStart(2, '0');
    document.getElementById('finale-complete-title').textContent = quizCorrect === total ? '관찰의 눈을 얻었어요' : '조금만 더 살펴볼까요?';
    document.getElementById('finale-complete-copy').textContent = `${total}문제 중 ${quizCorrect}문제를 맞혔어요.`;
  }
  function nearestZone() {
    let best = null, dist = Infinity;
    ZONES.forEach(z => { const d = Math.hypot(camera.position.x - z.position[0], camera.position.z - z.position[2]); if (d < dist) { dist = d; best = z; } });
    const monumental = best && ['sphinx', 'liberty'].includes(best.id);
    return dist < (monumental ? 20 : 4) ? best : null;
  }
  function updateCamera() { camera.rotation.y = yaw; camera.rotation.x = pitch; }
  function updateMovement(dt) {
    if (detailModal.open || helpModal.open || finaleModal.open) return;
    const forward = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
    const strafe = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
    tmpDirection.set(-Math.sin(yaw), 0, -Math.cos(yaw)); tmpRight.set(Math.cos(yaw), 0, -Math.sin(yaw));
    const wish = new THREE.Vector3().addScaledVector(tmpDirection, forward).addScaledVector(tmpRight, strafe);
    if (wish.lengthSq() > 0) wish.normalize();
    const accel = 28, maxSpeed = (keys.ShiftLeft || keys.ShiftRight) ? 7.5 : 4.8;
    velocity.addScaledVector(wish, accel * dt); velocity.multiplyScalar(Math.pow(.03, dt));
    if (velocity.length() > maxSpeed) velocity.setLength(maxSpeed);
    const oldX = camera.position.x, oldZ = camera.position.z;
    camera.position.addScaledVector(velocity, dt);
    const radius = Math.hypot(camera.position.x, camera.position.z);
    if (radius > 85) { camera.position.x *= 85 / radius; camera.position.z *= 85 / radius; }
    for (const o of zoneObstacles) {
      const dx = camera.position.x - o.x, dz = camera.position.z - o.z;
      if (o.hx != null) {
        if (Math.abs(dx) < o.hx && Math.abs(dz) < o.hz) {
          const pushX = o.hx - Math.abs(dx), pushZ = o.hz - Math.abs(dz);
          if (pushX < pushZ) camera.position.x = o.x + Math.sign(dx || 1) * o.hx;
          else camera.position.z = o.z + Math.sign(dz || 1) * o.hz;
        }
        continue;
      }
      const dist = Math.hypot(dx, dz);
      if (dist < o.r) { if (dist < .001) { camera.position.x = oldX; camera.position.z = oldZ; } else { camera.position.x = o.x + dx / dist * o.r; camera.position.z = o.z + dz / dist * o.r; } }
    }
    camera.position.y = 1.62 + Math.sin(performance.now() * .009) * Math.min(velocity.length() * .012, .025);
    setActiveZone(nearestZone());
  }

  function animate() {
    requestAnimationFrame(animate); const dt = Math.min(clock.getDelta(), .05); updateMovement(dt);
    park.children.forEach(o => { if (o.userData.faceCamera) o.lookAt(camera.position.x, o.position.y, camera.position.z); });
    compassArrow.style.transform = `rotate(${-yaw}rad)`; updateSelfAvatar(); sendPresence(); renderer.render(scene, camera);
  }

  setupLights(); makePark(); buildTabs(); updateCamera(); connectClassPresence(); animate();
  setTimeout(() => loading.classList.add('done'), 650);

  addEventListener('keydown', e => { keys[e.code] = true; if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault(); });
  addEventListener('keyup', e => { keys[e.code] = false; });
  canvas.addEventListener('pointerdown', e => { dragging = true; dragStart = { x: e.clientX, y: e.clientY, moved: false }; canvas.classList.add('dragging'); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (!dragging) return; const dx = e.movementX || 0, dy = e.movementY || 0; if (Math.abs(dx) + Math.abs(dy) > 2) dragStart.moved = true; yaw -= dx * .0032; pitch = Math.max(-1.35, Math.min(1.35, pitch - dy * .0028)); updateCamera(); });
  canvas.addEventListener('pointerup', e => { if (!dragging) return; dragging = false; canvas.classList.remove('dragging'); if (dragStart && !dragStart.moved) { raycaster.setFromCamera(centerPointer, camera); const quizHit = raycaster.intersectObjects(quizObjects, true)[0]; if (quizHit) { startQuiz(); } else { const hit = raycaster.intersectObjects(zoneObjects, true)[0]; if (hit) { let o = hit.object; while (o && !o.userData.zone) o = o.parent; if (o) openDetail(o.userData.zone); } } } dragStart = null; });
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); });

  document.getElementById('detail-button').addEventListener('click', () => openDetail(activeZone));
  document.getElementById('modal-close').addEventListener('click', () => detailModal.close());
  document.getElementById('help-button').addEventListener('click', () => helpModal.showModal());
  document.getElementById('help-close').addEventListener('click', () => helpModal.close());
  document.getElementById('quiz-button').addEventListener('click', () => startQuiz());
  document.getElementById('finale-close').addEventListener('click', () => finaleModal.close());
  finaleNext.addEventListener('click', () => { quizIndex++; if (quizIndex >= quizQuestions.length) showQuizCompletion(); else renderQuizQuestion(); });
  document.getElementById('finale-again').addEventListener('click', () => startQuiz());
  document.querySelectorAll('.touch-controls button').forEach(btn => {
    const code = btn.dataset.key;
    const on = e => { e.preventDefault(); keys[code] = true; }, off = e => { e.preventDefault(); keys[code] = false; };
    btn.addEventListener('pointerdown', on); btn.addEventListener('pointerup', off); btn.addEventListener('pointercancel', off); btn.addEventListener('pointerleave', off);
  });
})();
