/**
 * 태양계 관찰 (Solar System Observation) Data Definition & Canvas Texture Generators
 */

window.SOLAR_SYSTEM_DATA = {
    sun: {
        name: '태양',
        enName: 'Sun',
        type: '항성 (Star)',
        category: '주계열성',
        radiusKm: 696340,
        tempC: '5,500°C (표면) / 1,500만°C (중심)',
        massEarth: '333,000배 (태양계 전체 질량의 99.86%)',
        rotationDays: '25~35일 (위도별 차등자전)',
        density: '1.41 g/cm³',
        desc: '태양계의 중심이며 전체 질량의 99.86%를 차지하는 뜨거운 가스 덩어리입니다. 수소 핵융합 반응으로 막대한 빛과 열을 방출합니다.',
        satExamKeyPoints: [
            '☀️ 에너지는 중심부의 수소 핵융합 반응(p-p 반응 및 CNO 순환)에 의해 발생',
            '🌀 가스 천체이므로 적도 부근이 극지방보다 빠르게 자전 (차등 자전)',
            '흑점 수의 변화 주기: 약 11년 주기 극대기/극소기 반복 (흑점 부근은 주위보다 온도가 낮아 어둡게 보임)'
        ],
        trivia: '태양 빛이 지구까지 도착하는 데 걸리는 시간은 약 8분 20초입니다.',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
        color: '#ffaa00'
    },
    mercury: {
        name: '수성',
        enName: 'Mercury',
        type: '행성 (Planet)',
        category: '지구형 행성 | 내행성',
        order: 1,
        distAU: 0.39,
        orbitDays: 88,
        rotationDays: '58.6일',
        radiusKm: 2439.7,
        gravityRatio: 0.38,
        eccentricity: 0.205,
        inclinationDeg: 7.0,
        density: '5.43 g/cm³ (높은 밀도)',
        tempC: '-180°C ~ 430°C (일교차 극대)',
        moons: 0,
        atmosphere: '대기 없음 (진공에 가까움)',
        desc: '태양에서 가장 가깝고 가장 작은 지구형 행성입니다. 공전 궤도 이심률(0.205)과 경사각(7.0°)이 주요 행성 중 큰 편입니다.',
        satExamKeyPoints: [
            '📐 [케플러 제1법칙] 완벽한 원이 아닌 이심률 0.205의 타원 궤도를 따라 공전 (황도면 경사 7.0°)',
            '📌 [지구형 행성] 질량과 반지름은 작지만 평균 밀도가 매우 큼',
            '📌 [내행성 관측] 최대 이각(약 28°)이 작아 한밤중에는 관측 불가, 해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘에서만 잠시 관측',
            '🌫️ 대기가 거의 없어 운석 구덩이(크레이터)가 침식되지 않고 달 표면처럼 뚜렷하게 보존됨'
        ],
        trivia: '태양 주변을 가장 빨리 공전하며, 위성과 고리가 전혀 없습니다.',
        missions: ['메신저(MESSENGER)', '베피콜롬보(BepiColombo)'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
        color: '#a8a29e'
    },
    venus: {
        name: '금성',
        enName: 'Venus',
        type: '행성 (Planet)',
        category: '지구형 행성 | 내행성',
        order: 2,
        distAU: 0.72,
        orbitDays: 224.7,
        rotationDays: '243일 (시계방향 역자전)',
        radiusKm: 6051.8,
        gravityRatio: 0.91,
        eccentricity: 0.007,
        inclinationDeg: 3.4,
        density: '5.24 g/cm³',
        tempC: '465°C (태양계 최고 온도의 행성)',
        moons: 0,
        atmosphere: '이산화탄소(CO₂) 96.5% (약 90기압의 두꺼운 대기)',
        desc: '지구와 크기가 가장 비슷한 형제 행성이지만, 짙은 이산화탄소 대기의 극심한 온실효과로 기온과 기압이 매우 높습니다.',
        satExamKeyPoints: [
            '📌 [역자전] 자전 방향이 지구와 반대(시계 방향 / 동->서), 자전 주기가 공전 주기보다 긴 독특한 천체',
            '🔥 [극심한 온실효과] 수성보다 태양에서 멀지만 90기압의 짙은 CO₂ 대기로 인해 표면 온도가 태양계 행성 중 가장 뜨거움(약 465°C)',
            '✨ [내행성 관측] 최대 이각이 약 47°로 수성보다 커서 관측 가능 시간이 더 길며 샛별(초저녁 서쪽 하늘 / 새벽 동쪽 하늘)로 밝게 보임'
        ],
        trivia: '지구와 반대 방향으로 자전하므로 금성에서는 태양이 서쪽에서 떠서 동쪽으로 집니다.',
        missions: ['마젤란(Magellan)', '아카츠키(Akatsuki)'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus-real_color.jpg',
        color: '#eab308'
    },
    earth: {
        name: '지구',
        enName: 'Earth',
        type: '행성 (Planet)',
        category: '지구형 행성 | 내행성 밖',
        order: 3,
        distAU: 1.0,
        orbitDays: 365.25,
        rotationDays: '23.9시간',
        radiusKm: 6371,
        gravityRatio: 1.0,
        eccentricity: 0.017,
        inclinationDeg: 0.0, // 기준 평면 (황도면)
        density: '5.51 g/cm³ (태양계 최고의 밀도)',
        tempC: '-89°C ~ 58°C (평균 15°C)',
        moons: 1,
        atmosphere: '질소 78%, 산소 21%, 아르곤 0.9%',
        desc: '풍부한 액체 상태의 물(수권)과 적절한 온실효과의 대기층을 갖추어 생명체가 살아가는 유일하게 확인된 행성입니다.',
        satExamKeyPoints: [
            '📐 [황도면 기준] 지구 공전 궤도면을 황도면(Ecliptic)이라 하며 타원 이심률은 0.017로 거의 원에 가까움',
            '💧 [수권의 존재] 액체 상태의 물이 존재하는 유일한 행성 (태양과의 적정 거리 - 골디락스 존)',
            '🛡️ [자기장과 대기] 유동성 외핵에 의한 자기장이 우주선과 태양풍을 막아주며 지표면 상공의 오존층이 유해 자외선 차단'
        ],
        trivia: '지구 표면의 약 71%가 푸른 바다로 덮여 있습니다.',
        missions: ['국제우주정거장(ISS)', '허블/제임스웹 우주망원경'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
        color: '#3b82f6'
    },
    moon: {
        name: '달',
        enName: 'Moon',
        type: '위성 (Satellite)',
        category: '지구의 유일한 자연위성',
        parent: 'earth',
        distKm: 384400,
        orbitDays: 27.3,
        rotationDays: '27.3일 (동주기 자전)',
        radiusKm: 1737.4,
        gravityRatio: 0.166,
        eccentricity: 0.055,
        inclinationDeg: 5.1, // 백도면 경사
        density: '3.34 g/cm³',
        tempC: '-130°C ~ 120°C',
        atmosphere: '대기 없음 (진공)',
        desc: '지구의 유일한 자연위성이며 자전 주기와 공전 주기가 같아 지구에서는 항상 같은 면만 관측됩니다.',
        satExamKeyPoints: [
            '📐 [백도면] 달의 공전 궤도면(백도면)은 황도면과 약 5.1° 기울어져 있어 매달 일식과 월식이 일어나지 않고 교점에서만 발생',
            '🌕 [동주기 자전] 자전 주기 = 항성월 공전 주기 = 27.3일로 동일하여 지구에서는 항상 달의 앞면만 보임',
            '🌒 [위상 변화] 위상 변화 주기(삭망월)는 약 29.5일 (지구가 공전하는 동안 달도 이동하기 때문)'
        ],
        trivia: '인류가 직접 발을 디뎌본 유일한 지구 밖 천체입니다.',
        missions: ['아폴로 11호', '아르테미스 계획', '다누리호'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Full_Moon_Luc_Viatour.jpg',
        color: '#cbd5e1'
    },
    mars: {
        name: '화성',
        enName: 'Mars',
        type: '행성 (Planet)',
        category: '지구형 행성 | 외행성',
        order: 4,
        distAU: 1.52,
        orbitDays: 687,
        rotationDays: '24.6시간 (지구와 비슷)',
        radiusKm: 3389.5,
        gravityRatio: 0.38,
        eccentricity: 0.093,
        inclinationDeg: 1.85,
        density: '3.93 g/cm³',
        tempC: '-140°C ~ 20°C (평균 -63°C)',
        moons: 2,
        atmosphere: '이산화탄소(CO₂) 95% (희박한 대기, 약 0.006기압)',
        desc: '토양에 산화철(녹슨 철) 성분이 많아 붉게 보이며 계절에 따라 극관의 크기가 변하는 외행성입니다.',
        satExamKeyPoints: [
            '🔴 [산화철 토양] 지표 표면에 산화철 성분이 많아 붉은색으로 관측됨',
            '❄️ [극관의 계절 변화] 남극과 북극의 극관(얼음+드라이아이스)이 여름에는 얇아지고 겨울에는 커짐 (자전축이 약 25° 기울어져 계절 존재)',
            '📌 [외행성 관측] 지구 궤도 밖을 공전하므로 충(Opposition) 위치일 때 한밤중에 남쪽 하늘에서 가장 밝게 관측 가능'
        ],
        trivia: '지구와 자전 주기(24.6시간) 및 자전축 기울기(25.2°)가 매우 유사하여 4계절이 존재합니다.',
        missions: ['퍼서비어런스(Perseverance)', '큐리오시티(Curiosity)', '인사이트'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
        color: '#ef4444'
    },
    jupiter: {
        name: '목성',
        enName: 'Jupiter',
        type: '가스 행성 (Gas Giant)',
        category: '목성형 행성 | 외행성',
        order: 5,
        distAU: 5.20,
        orbitDays: 4333, // 11.86년
        rotationDays: '9.9시간 (자전 속도 매우 빠름)',
        radiusKm: 69911,
        gravityRatio: 2.53,
        eccentricity: 0.048,
        inclinationDeg: 1.3,
        density: '1.33 g/cm³ (밀도가 작음)',
        tempC: '-110°C (표면 구름층)',
        moons: 95,
        atmosphere: '수소 90%, 헬륨 10%',
        desc: '태양계에서 가장 거대한 가스 거인 행성으로, 빠른 자전으로 인한 적도 줄무늬와 대적점이 특징입니다.',
        satExamKeyPoints: [
            '📌 [목성형 행성 특성] 질량과 반지름이 매우 크지만 수소/헬륨 위주로 구성되어 평균 밀도가 매우 작음 (1.33 g/cm³)',
            '⚡ [빠른 자전과 편평도] 자전 주기가 약 9.9시간으로 매우 빠르고 자전축 직경보다 적도 직경이 큰 편평한 타원체 구조 (편평도가 큼)',
            '🌀 [대적점 및 줄무늬] 적도와 평행한 대기 줄무늬가 뚜렷하며, 지구보다 큰 고기압 소용돌이 폭풍인 대적점(Great Red Spot) 존재'
        ],
        trivia: '목성의 위성 가니메데는 수성보다도 크기가 큰 태양계 최대 위성입니다.',
        missions: ['주노(Juno)', '갈릴레오(Galileo)', '보아저 1/2호'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
        color: '#f97316'
    },
    saturn: {
        name: '토성',
        enName: 'Saturn',
        type: '가스 행성 (Gas Giant)',
        category: '목성형 행성 | 외행성',
        order: 6,
        distAU: 9.58,
        orbitDays: 10759, // 29.45년
        rotationDays: '10.7시간',
        radiusKm: 58232,
        gravityRatio: 1.07,
        eccentricity: 0.056,
        inclinationDeg: 2.5,
        density: '0.69 g/cm³ (물보다 낮은 밀도!)',
        tempC: '-140°C',
        moons: 146,
        atmosphere: '수소 96%, 헬륨 3%',
        desc: '얼음 입자와 암석 조각으로 이루어진 화려한 고리를 가진 행성으로, 밀도가 물보다 낮습니다.',
        satExamKeyPoints: [
            '🌊 [물보다 낮은 밀도] 평균 밀도가 0.69g/cm³로 태양계 행성 중 유일하게 물(1.0g/cm³)보다 밀도가 작아 물에 띄우면 뜸',
            '🪐 [화려한 얼음 고리] 적도면에 얼음 알갱이와 암석 조각으로 이루어진 무수한 얇고 뚜렷한 고리 보유',
            '📐 [최대 편평도] 자전에 의한 편평도가 태양계 행성 중 가장 큼 (동그란 공보다 납작한 형태)'
        ],
        trivia: '토성의 고리는 두께가 불과 수십 미터에 불과하지만 폭은 수십만 킬로미터에 달합니다.',
        missions: ['카시니-하위헌스(Cassini-Huygens)'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
        color: '#eab308'
    },
    uranus: {
        name: '천왕성',
        enName: 'Uranus',
        type: '얼음 가스 행성 (Ice Giant)',
        category: '목성형 행성 | 외행성',
        order: 7,
        distAU: 19.22,
        orbitDays: 30687, // 84년
        rotationDays: '17.2시간 (98° 자전축 기울어짐)',
        radiusKm: 25362,
        gravityRatio: 0.89,
        eccentricity: 0.046,
        inclinationDeg: 0.77,
        density: '1.27 g/cm³',
        tempC: '-195°C ~ -224°C',
        moons: 28,
        atmosphere: '수소 83%, 헬륨 15%, 메탄 2%',
        desc: '자전축이 공전 궤도면과 거의 평행하게 98도 누워 자전하는 영롱한 청록색 얼음 거인 행성입니다.',
        satExamKeyPoints: [
            '🛌 [누워서 자전하는 행성] 자전축 기울기가 약 98°로 공전 궤도면에 거의 누운 상태로 공전 및 시계 방향 역자전',
            '💎 [메탄 대기와 색상] 대기 중의 메탄(CH₄) 성분이 붉은 빛을 흡수하고 푸른 빛을 반사하여 영롱한 청록색으로 관측됨'
        ],
        trivia: '천왕성은 극지방이 42년 동안 태양 빛을 계속 받습니다.',
        missions: ['보이저 2호(Voyager 2)'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
        color: '#06b6d4'
    },
    neptune: {
        name: '해왕성',
        enName: 'Neptune',
        type: '얼음 가스 행성 (Ice Giant)',
        category: '목성형 행성 | 외행성',
        order: 8,
        distAU: 30.05,
        orbitDays: 60190, // 164.8년
        rotationDays: '16.1시간',
        radiusKm: 24622,
        gravityRatio: 1.14,
        eccentricity: 0.010,
        inclinationDeg: 1.77,
        density: '1.64 g/cm³',
        tempC: '-200°C',
        moons: 16,
        atmosphere: '수소 80%, 헬륨 19%, 메탄 1.5%',
        desc: '태양계 최외곽의 푸른 얼음 거인 행성으로, 대흑점 소용돌이와 시속 2,100km의 강력한 대기 풍속을 갖추고 있습니다.',
        satExamKeyPoints: [
            '🔵 [대흑점(Great Dark Spot)] 대기에 지구 크기만한 거대한 대기 소용돌이인 대흑점이 관측됨',
            '💨 [강력한 대기 풍속] 메탄 대기로 인해 짙은 파란색을 띠며 태양계 행성 중 대기 풍속이 가장 빠름 (시속 2,000km 이상)'
        ],
        trivia: '해왕성이 태양을 한 바퀴 도는 데는 164.8년이나 걸립니다.',
        missions: ['보이저 2호(Voyager 2)'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
        color: '#2563eb'
    },
    pluto: {
        name: '명왕성',
        enName: 'Pluto',
        type: '왜소행성 (Dwarf Planet)',
        category: '왜소행성 (2006년 재분류)',
        order: 9,
        distAU: 39.48,
        orbitDays: 90560, // 248년
        rotationDays: '6.4일',
        radiusKm: 1188.3,
        gravityRatio: 0.063,
        eccentricity: 0.249, // 매우 찌그러진 타원!
        inclinationDeg: 17.1, // 무려 17도나 기울어짐!
        density: '1.85 g/cm³',
        tempC: '-230°C',
        moons: 5,
        atmosphere: '희박한 질소, 메탄',
        desc: '2006년 국제천문연맹(IAU) 기준에 따라 행성에서 왜소행성으로 분류 변경된 천체로, 공전 궤도가 17.1° 기울어진 타원(이심률 0.249) 형태입니다.',
        satExamKeyPoints: [
            '📐 [큰 경사각과 이심률] 황도면과의 경사각이 17.1°로 매우 크고 이심률이 0.249로 매우 찌그러진 타원 공전 궤도를 가짐',
            '📌 [왜소행성 재분류 이유 (2006 IAU)] ① 태양 주위를 공전하고 ② 자체 중력으로 구형을 이루지만 ③ [자신의 궤도 주변의 다른 천체를 청소하지 못함] 조건 미충족'
        ],
        trivia: '달보다도 크기가 작은 아담한 왜소행성입니다.',
        missions: ['뉴 하이라이즌스(New Horizons)'],
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_February_2010.jpg',
        color: '#94a3b8'
    }
};

/**
 * Procedural Realistic Planet Textures Generator via HTML5 Canvas (DataURL Return for 3D Renderer)
 */
window.createPlanetTexture = function (planetKey) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    if (planetKey === 'sun') {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#ff4500');
        grad.addColorStop(0.3, '#ffaa00');
        grad.addColorStop(0.7, '#ffcc00');
        grad.addColorStop(1, '#ff3300');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        for (let i = 0; i < 400; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            const r = Math.random() * 30 + 5;
            ctx.beginPath();
            ctx.arc(rx, ry, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = 'rgba(100, 20, 0, 0.6)';
        for (let i = 0; i < 15; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            ctx.beginPath();
            ctx.arc(rx, ry, Math.random() * 12 + 4, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (planetKey === 'earth') {
        ctx.fillStyle = '#0f52ba';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#2e8b57';
        for (let i = 0; i < 35; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * (h * 0.7) + (h * 0.15);
            const r = Math.random() * 90 + 30;
            ctx.beginPath();
            ctx.ellipse(cx, cy, r * 1.5, r, Math.random(), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        for (let i = 0; i < 50; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            ctx.beginPath();
            ctx.ellipse(cx, cy, Math.random() * 120 + 20, Math.random() * 15 + 4, Math.random(), 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (planetKey === 'jupiter') {
        const bandColors = ['#c86432', '#e6c8a0', '#a05028', '#f0dcbe', '#8c3c14', '#d29664', '#b4461e'];
        const bandH = h / bandColors.length;
        bandColors.forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.fillRect(0, idx * bandH, w, bandH + 2);
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        for (let i = 0; i < 80; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            ctx.fillRect(rx, ry, Math.random() * 80 + 20, Math.random() * 6 + 2);
        }

        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.ellipse(w * 0.65, h * 0.62, 55, 35, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.stroke();
    } else if (planetKey === 'saturn') {
        const saturnBands = ['#d4a373', '#faedcd', '#e9edc9', '#ccd5ae', '#d4a373', '#e07a5f'];
        const bH = h / saturnBands.length;
        saturnBands.forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.fillRect(0, idx * bH, w, bH + 2);
        });
    } else if (planetKey === 'mars') {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#991b1b');
        grad.addColorStop(0.5, '#dc2626');
        grad.addColorStop(1, '#7f1d1d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(60, 10, 10, 0.4)';
        for (let i = 0; i < 40; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 40 + 10, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillRect(0, 0, w, h * 0.08);
        ctx.fillRect(0, h * 0.92, w, h * 0.08);
    } else if (planetKey === 'venus') {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#eab308');
        grad.addColorStop(0.5, '#fef08a');
        grad.addColorStop(1, '#ca8a04');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        for (let i = 0; i < 60; i++) {
            ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 100 + 30, Math.random() * 8 + 2);
        }
    } else if (planetKey === 'uranus') {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#06b6d4');
        grad.addColorStop(0.5, '#67e8f9');
        grad.addColorStop(1, '#0891b2');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    } else if (planetKey === 'neptune') {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#1d4ed8');
        grad.addColorStop(0.5, '#2563eb');
        grad.addColorStop(1, '#1e40af');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.5, 40, 25, 0.2, 0, Math.PI * 2);
        ctx.fill();
    } else if (planetKey === 'mercury') {
        ctx.fillStyle = '#78716c';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        for (let i = 0; i < 90; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 20 + 3, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (planetKey === 'moon') {
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
        for (let i = 0; i < 70; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 25 + 4, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        ctx.fillStyle = '#a1a1aa';
        ctx.fillRect(0, 0, w, h);
    }

    return canvas.toDataURL('image/png');
};

/**
 * Saturn Ring Texture Generator (DataURL Return)
 */
window.createSaturnRingTexture = function () {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.2, 'rgba(212, 163, 115, 0.9)');
    grad.addColorStop(0.4, 'rgba(250, 237, 205, 0.95)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.1)');
    grad.addColorStop(0.7, 'rgba(212, 163, 115, 0.85)');
    grad.addColorStop(0.9, 'rgba(204, 160, 100, 0.4)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
};
