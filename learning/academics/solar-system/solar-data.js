/**
 * 태양계 탐험 (Solar System Explorer) Data & Texture Generator
 */

window.SOLAR_SYSTEM_DATA = {
    sun: {
        name: '태양',
        enName: 'Sun',
        type: '항성 (Star)',
        radiusKm: 696340,
        tempC: '5,500°C (표면) / 1,500만°C (중심)',
        massEarth: '333,000배',
        rotationDays: '25~35일',
        desc: '태양계의 중심이며 전체 질량의 99.86%를 차지하는 뜨거운 가스 덩어리입니다. 수소 핵융합 반응으로 막대한 빛과 열을 방출합니다.',
        trivia: '태양 빛이 지구까지 도착하는 데 걸리는 시간은 약 8분 20초입니다.',
        color: '#ffaa00'
    },
    mercury: {
        name: '수성',
        enName: 'Mercury',
        type: '행성 (Planet)',
        order: 1,
        distAU: 0.39,
        orbitDays: 88,
        rotationDays: '58.6일',
        radiusKm: 2439.7,
        gravityRatio: 0.38,
        tempC: '-180°C ~ 430°C',
        moons: 0,
        atmosphere: '극도로 희박 (아주 미량의 수소, 헬륨)',
        desc: '태양에서 가장 가깝고 가장 작은 행성입니다. 대기가 거의 없어 낮과 밤의 온도 차이가 600°C 이상입니다.',
        trivia: '태양 주변을 가장 빨리 공전하며, 운석 구덩이가 달의 표면과 매우 비슷합니다.',
        missions: ['메신저(MESSENGER)', '베피콜롬보(BepiColombo)'],
        color: '#a8a29e'
    },
    venus: {
        name: '금성',
        enName: 'Venus',
        type: '행성 (Planet)',
        order: 2,
        distAU: 0.72,
        orbitDays: 224.7,
        rotationDays: '243일 (시계 방향 역자전)',
        radiusKm: 6051.8,
        gravityRatio: 0.91,
        tempC: '465°C (태양계 최고 온도의 행성)',
        moons: 0,
        atmosphere: '이산화탄소 96.5% (두꺼운 층), 황산 구름',
        desc: '지구와 크기가 가장 비슷한 형제 행성이지만, 두꺼운 이산화탄소 대기의 극심한 온실효과로 매우 뜨겁습니다.',
        trivia: '지구와 반대 방향(동쪽에서 서쪽)으로 자전하며, 하루(자전)가 1년(공전)보다 긴 독특한 행성입니다.',
        missions: ['마젤란(Magellan)', '아카츠키(Akatsuki)'],
        color: '#eab308'
    },
    earth: {
        name: '지구',
        enName: 'Earth',
        type: '행성 (Planet)',
        order: 3,
        distAU: 1.0,
        orbitDays: 365.25,
        rotationDays: '23.9시간',
        radiusKm: 6371,
        gravityRatio: 1.0,
        tempC: '-89°C ~ 58°C (평균 15°C)',
        moons: 1,
        atmosphere: '질소 78%, 산소 21%, 아르곤 0.9%',
        desc: '풍부한 액체 상태의 물과 완벽한 보호 대기층을 갖추어 생명체가 살아가는 유일하게 확인된 행성입니다.',
        trivia: '지구 표면의 약 71%가 푸른 바다로 덮여 있어 우주에서 보면 아름다운 푸른 구슬처럼 보입니다.',
        missions: ['국제우주정거장(ISS)', '허블/제임스웹 우주망원경'],
        color: '#3b82f6'
    },
    moon: {
        name: '달',
        enName: 'Moon',
        type: '위성 (Satellite)',
        parent: 'earth',
        distKm: 384400,
        orbitDays: 27.3,
        rotationDays: '27.3일 (동주기 자전)',
        radiusKm: 1737.4,
        gravityRatio: 0.166,
        tempC: '-130°C ~ 120°C',
        atmosphere: '진공에 가까움',
        desc: '지구의 유일한 자연위성이며 인류가 직접 발을 디뎌본 유일한 천체입니다.',
        trivia: '자전 주기와 공전 주기가 같아서 지구에서는 항상 달의 앞면만 볼 수 있습니다.',
        missions: ['아폴로 11호', '아르테미스 계획', '다누리호'],
        color: '#cbd5e1'
    },
    mars: {
        name: '화성',
        enName: 'Mars',
        type: '행성 (Planet)',
        order: 4,
        distAU: 1.52,
        orbitDays: 687,
        rotationDays: '24.6시간',
        radiusKm: 3389.5,
        gravityRatio: 0.38,
        tempC: '-140°C ~ 20°C (평균 -63°C)',
        moons: 2,
        atmosphere: '이산화탄소 95%, 질소 2.6%',
        desc: '토양에 산화철(녹슨 철) 성분이 많아 붉게 빛나는 붉은 행성입니다. 과거에 물이 흘렀던 흔적이 가득합니다.',
        trivia: '태양계에서 가장 거대한 산인 올림푸스 산(높이 25km)과 거대한 계곡이 존재합니다.',
        missions: ['퍼서비어런스(Perseverance)', '큐리오시티(Curiosity)', '인사이트'],
        color: '#ef4444'
    },
    jupiter: {
        name: '목성',
        enName: 'Jupiter',
        type: '가스 행성 (Gas Giant)',
        order: 5,
        distAU: 5.20,
        orbitDays: 4333, // 11.86년
        rotationDays: '9.9시간 (태양계 가장 빠름)',
        radiusKm: 69911,
        gravityRatio: 2.53,
        tempC: '-110°C (표면 구름층)',
        moons: 95,
        atmosphere: '수소 90%, 헬륨 10%',
        desc: '태양계에서 가장 거대한 행성으로, 다른 모든 행성을 합친 것보다 2.5배 이상 무게가 나가는 가스 거인입니다.',
        trivia: '목성 표면의 대적점(Great Red Spot)은 지구 크기보다 큰 엄청난 거대 소용돌이 폭풍입니다.',
        missions: ['주노(Juno)', '갈릴레오(Galileo)', '탐사선 탐사'],
        color: '#f97316'
    },
    saturn: {
        name: '토성',
        enName: 'Saturn',
        type: '가스 행성 (Gas Giant)',
        order: 6,
        distAU: 9.58,
        orbitDays: 10759, // 29.45년
        rotationDays: '10.7시간',
        radiusKm: 58232,
        gravityRatio: 1.07,
        tempC: '-140°C',
        moons: 146,
        atmosphere: '수소 96%, 헬륨 3%',
        desc: '얼음 입자와 암석 조각으로 이루어진 화려하고 거대한 고리를 자랑하는 가장 아름다운 행성입니다.',
        trivia: '밀도가 물보다 낮아서 만약 토성을 담을 수 있는 엄청나게 큰 바다가 있다면 물 위에 둥둥 떠오릅니다!',
        missions: ['카시니-하위헌스(Cassini-Huygens)'],
        color: '#eab308'
    },
    uranus: {
        name: '천왕성',
        enName: 'Uranus',
        type: '얼음 가스 행성 (Ice Giant)',
        order: 7,
        distAU: 19.22,
        orbitDays: 30687, // 84년
        rotationDays: '17.2시간 (98도 기울어진 자전)',
        radiusKm: 25362,
        gravityRatio: 0.89,
        tempC: '-224°C (태양계 가장 추운 표면)',
        moons: 28,
        atmosphere: '수소 83%, 헬륨 15%, 메탄 2%',
        desc: '대기 중의 메탄 기체가 붉은빛을 흡수하고 푸른빛을 반사하여 영롱한 청록색으로 보이는 얼음 가스 행성입니다.',
        trivia: '자전축이 98도나 누워 있어서 사실상 누워서 공전하는 독특한 행성입니다.',
        missions: ['보이저 2호(Voyager 2)'],
        color: '#06b6d4'
    },
    neptune: {
        name: '해왕성',
        enName: 'Neptune',
        type: '얼음 가스 행성 (Ice Giant)',
        order: 8,
        distAU: 30.05,
        orbitDays: 60190, // 164.8년
        rotationDays: '16.1시간',
        radiusKm: 24622,
        gravityRatio: 1.14,
        tempC: '-218°C',
        moons: 16,
        atmosphere: '수소 80%, 헬륨 19%, 메탄 1.5%',
        desc: '태양계의 가장 바깥쪽 행성으로 짙은 파란빛을 띠며 초속 600m의 상상을 초월하는 초강력 태풍이 붑니다.',
        trivia: '수학적 계산으로 위치를 예측한 후 망원경으로 발견된 최초의 행성입니다.',
        missions: ['보이저 2호(Voyager 2)'],
        color: '#2563eb'
    },
    pluto: {
        name: '명왕성',
        enName: 'Pluto',
        type: '왜소행성 (Dwarf Planet)',
        order: 9,
        distAU: 39.48,
        orbitDays: 90560, // 248년
        rotationDays: '6.4일',
        radiusKm: 1188.3,
        gravityRatio: 0.063,
        tempC: '-230°C',
        moons: 5,
        atmosphere: '희박한 질소, 메탄, 일산화탄소',
        desc: '2006년 왜소행성으로 분류 변경된 작고 차가운 천체로 표면에 하트 모양 질소 얼음 빙하(스푸트니크 평원)가 있습니다.',
        trivia: '달보다도 크기가 작은 아담한 천체이지만 위성 카론과 함께 서로를 마주 보며 회전합니다.',
        missions: ['뉴 허라이즌스(New Horizons)'],
        color: '#a1a1aa'
    }
};

/**
 * Procedural Realistic Planet Textures Generator via HTML5 Canvas
 */
window.createPlanetTexture = function (planetKey) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;

    if (planetKey === 'sun') {
        // Sun: Glowing Fire & Flares Plasma Texture
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#ff4500');
        grad.addColorStop(0.3, '#ffaa00');
        grad.addColorStop(0.7, '#ffcc00');
        grad.addColorStop(1, '#ff3300');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Sunspot & Solar Flare noise
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        for (let i = 0; i < 400; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            const r = Math.random() * 30 + 5;
            ctx.beginPath();
            ctx.arc(rx, ry, r, 0, Math.PI * 2);
            ctx.fill();
        }
        // Sunspots
        ctx.fillStyle = 'rgba(100, 20, 0, 0.6)';
        for (let i = 0; i < 15; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            ctx.beginPath();
            ctx.arc(rx, ry, Math.random() * 12 + 4, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (planetKey === 'earth') {
        // Ocean blue base
        ctx.fillStyle = '#0f52ba';
        ctx.fillRect(0, 0, w, h);

        // Continents (Green/Brown organic shapes)
        ctx.fillStyle = '#2e8b57';
        for (let i = 0; i < 35; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * (h * 0.7) + (h * 0.15);
            const r = Math.random() * 90 + 30;
            ctx.beginPath();
            ctx.ellipse(cx, cy, r * 1.5, r, Math.random(), 0, Math.PI * 2);
            ctx.fill();
        }
        // White cloud swirl overlays
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        for (let i = 0; i < 50; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            ctx.beginPath();
            ctx.ellipse(cx, cy, Math.random() * 120 + 20, Math.random() * 15 + 4, Math.random(), 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (planetKey === 'jupiter') {
        // Gas Giant Stripes (Orange, Beige, Brown bands)
        const bandColors = ['#c86432', '#e6c8a0', '#a05028', '#f0dcbe', '#8c3c14', '#d29664', '#b4461e'];
        const bandH = h / bandColors.length;
        bandColors.forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.fillRect(0, idx * bandH, w, bandH + 2);
        });

        // Wavy atmospheric storm noise
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        for (let i = 0; i < 80; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            ctx.fillRect(rx, ry, Math.random() * 80 + 20, Math.random() * 6 + 2);
        }

        // Great Red Spot (목성 대적점!)
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.ellipse(w * 0.65, h * 0.62, 55, 35, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.stroke();
    } else if (planetKey === 'saturn') {
        // Golden beige gas bands
        const saturnBands = ['#d4a373', '#faedcd', '#e9edc9', '#ccd5ae', '#d4a373', '#e07a5f'];
        const bH = h / saturnBands.length;
        saturnBands.forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.fillRect(0, idx * bH, w, bH + 2);
        });
    } else if (planetKey === 'mars') {
        // Red rust surface + polar caps
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#991b1b');
        grad.addColorStop(0.5, '#dc2626');
        grad.addColorStop(1, '#7f1d1d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Dark crater patches
        ctx.fillStyle = 'rgba(60, 10, 10, 0.4)';
        for (let i = 0; i < 40; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 40 + 10, 0, Math.PI * 2);
            ctx.fill();
        }
        // Polar Ice Caps (북극/남극 흰 얼음)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillRect(0, 0, w, h * 0.08);
        ctx.fillRect(0, h * 0.92, w, h * 0.08);
    } else if (planetKey === 'venus') {
        // Dense yellow-cream atmosphere
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
        // Cyan cyan-blue smooth atmosphere
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#06b6d4');
        grad.addColorStop(0.5, '#67e8f9');
        grad.addColorStop(1, '#0891b2');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    } else if (planetKey === 'neptune') {
        // Deep blue stormy atmosphere + Dark Spot
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#1d4ed8');
        grad.addColorStop(0.5, '#2563eb');
        grad.addColorStop(1, '#1e40af');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Great Dark Spot
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.5, 40, 25, 0.2, 0, Math.PI * 2);
        ctx.fill();
    } else if (planetKey === 'mercury') {
        // Grey rocky cratered surface
        ctx.fillStyle = '#78716c';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        for (let i = 0; i < 90; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 20 + 3, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (planetKey === 'moon') {
        // Grey lunar crater surface
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
        for (let i = 0; i < 70; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 25 + 4, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // Default Pluto / Dwarf planet
        ctx.fillStyle = '#a1a1aa';
        ctx.fillRect(0, 0, w, h);
    }

    return canvas.toDataURL('image/png');
};

/**
 * Saturn Ring Texture Generator
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
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.1)'); // Cassini Division Gap!
    grad.addColorStop(0.7, 'rgba(212, 163, 115, 0.85)');
    grad.addColorStop(0.9, 'rgba(204, 160, 100, 0.4)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
};
