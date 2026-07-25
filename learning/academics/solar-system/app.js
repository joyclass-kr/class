/**
 * 태양계 탐험 (Solar System Explorer) Three.js & App Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // App State
    const state = {
        currentTab: 'sim',
        isPlaying: true,
        orbitSpeed: 1.0,
        scaleMode: 'visual', // 'visual' | 'realistic'
        showOrbits: true,
        simTimeYears: 0.0,
        selectedBody: null,

        // Quiz State
        quiz: {
            score: 0,
            streak: 0,
            currentQuestion: null,
            answered: false,
            autoTimer: null
        }
    };

    // DOM Elements
    const canvasContainer = document.getElementById('solarCanvasContainer');
    const canvas = document.getElementById('solarCanvas');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const resetCamBtn = document.getElementById('resetCamBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValBadge = document.getElementById('speedValBadge');
    const scaleVisualBtn = document.getElementById('scaleVisualBtn');
    const scaleRealisticBtn = document.getElementById('scaleRealisticBtn');
    const showOrbitsToggle = document.getElementById('showOrbitsToggle');
    const simTimeVal = document.getElementById('simTimeVal');
    const modalOverlay = document.getElementById('modalOverlay');

    // Init UI Components
    initNavTabs();
    initQuickBar();
    initAtlasGrid();
    initSpaceCalc();
    initSpaceQuiz();
    initModal();

    // Init 3D WebGL Engine
    let scene, camera, renderer, controls;
    let celestialBodies = {}; // { sun, mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune, pluto }
    let orbitLines = [];
    let raycaster, mouse;
    let clock = null;

    initThreeDScene();

    /**
     * Navigation Tabs
     */
    function initNavTabs() {
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                const targetPane = document.getElementById(`tab-${target}`);
                if (targetPane) targetPane.classList.add('active');

                state.currentTab = target;
                if (target === 'quiz' && !state.quiz.currentQuestion) {
                    loadNewQuizQuestion();
                }
                if (target === 'sim' && renderer) {
                    onWindowResize();
                }
            });
        });
    }

    /**
     * Planet Quick Bar
     */
    function initQuickBar() {
        const bar = document.getElementById('planetQuickBar');
        if (!bar || !window.SOLAR_SYSTEM_DATA) return;

        bar.innerHTML = '';
        for (const [key, body] of Object.entries(window.SOLAR_SYSTEM_DATA)) {
            const chip = document.createElement('button');
            chip.className = 'planet-chip';
            chip.dataset.key = key;
            chip.innerHTML = `${body.name} <small>(${body.enName})</small>`;

            chip.addEventListener('click', () => {
                focusCameraOnBody(key);
            });

            bar.appendChild(chip);
        }
    }

    /**
     * Planet Atlas Grid in Tab 2
     */
    function initAtlasGrid() {
        const grid = document.getElementById('atlasGrid');
        if (!grid || !window.SOLAR_SYSTEM_DATA) return;

        grid.innerHTML = '';
        for (const [key, body] of Object.entries(window.SOLAR_SYSTEM_DATA)) {
            const card = document.createElement('div');
            card.className = 'planet-card';

            const texData = window.createPlanetTexture(key);

            card.innerHTML = `
                <div class="planet-card-header">
                    <div class="planet-sphere-preview" style="background: url('${texData}') center/cover;"></div>
                    <div>
                        <div class="planet-card-title">${body.name}</div>
                        <div class="planet-card-sub">${body.enName} | ${body.type}</div>
                    </div>
                </div>
                <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${body.desc}</div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 8px;">
                    <span>중력: 지구의 ${body.gravityRatio || 1}배</span>
                    <span>위성: ${body.moons !== undefined ? body.moons + '개' : '-'}</span>
                </div>
            `;

            card.addEventListener('click', () => openPlanetModal(key));
            grid.appendChild(card);
        }
    }

    /**
     * Space Weight & Age Calculator in Tab 3
     */
    function initSpaceCalc() {
        const weightInput = document.getElementById('userWeightInput');
        const ageInput = document.getElementById('userAgeInput');
        const grid = document.getElementById('calcResultsGrid');

        if (!weightInput || !ageInput || !grid) return;

        function updateCalc() {
            const weight = parseFloat(weightInput.value) || 60;
            const age = parseFloat(ageInput.value) || 12;

            grid.innerHTML = '';
            for (const [key, body] of Object.entries(window.SOLAR_SYSTEM_DATA)) {
                if (key === 'sun') continue;

                const calcWeight = (weight * (body.gravityRatio || 1.0)).toFixed(1);
                let calcAge = '-';
                if (body.orbitDays) {
                    calcAge = ((age * 365.25) / body.orbitDays).toFixed(2);
                }

                const texData = window.createPlanetTexture(key);

                const card = document.createElement('div');
                card.className = 'calc-result-card';
                card.innerHTML = `
                    <div class="planet-sphere-preview" style="width: 42px; height: 42px; background: url('${texData}') center/cover;"></div>
                    <div style="flex: 1;">
                        <div style="font-size: 15px; font-weight: 800; color: #fff;">${body.name} (${body.enName})</div>
                        <div style="font-size: 12px; color: var(--text-muted);">몸무게: <span class="calc-val-main">${calcWeight} kg</span></div>
                        <div style="font-size: 12px; color: var(--text-muted);">행성 나이: <span class="calc-val-main" style="color: #ffd18a;">${calcAge} 세</span></div>
                    </div>
                `;
                grid.appendChild(card);
            }
        }

        weightInput.addEventListener('input', updateCalc);
        ageInput.addEventListener('input', updateCalc);
        updateCalc();
    }

    /**
     * Modal Controller
     */
    function initModal() {
        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    function openPlanetModal(key) {
        const body = window.SOLAR_SYSTEM_DATA[key];
        if (!body) return;

        state.selectedBody = body;
        document.getElementById('modalPlanetName').textContent = body.name;
        document.getElementById('modalPlanetSub').textContent = `${body.enName} | ${body.type}`;

        const preview = document.getElementById('modalPlanetPreview');
        if (preview) {
            preview.style.background = `url('${window.createPlanetTexture(key)}') center/cover`;
        }

        const propGrid = document.getElementById('modalPropGrid');
        propGrid.innerHTML = `
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 6px;">
                <div style="font-size: 11px; color: var(--text-muted);">표면 온도</div>
                <div style="font-size: 14px; font-weight: 800; color: #fff;">${body.tempC || '-'}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 6px;">
                <div style="font-size: 11px; color: var(--text-muted);">자전 주기</div>
                <div style="font-size: 14px; font-weight: 800; color: #fff;">${body.rotationDays || '-'}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 6px;">
                <div style="font-size: 11px; color: var(--text-muted);">공전 주기</div>
                <div style="font-size: 14px; font-weight: 800; color: #fff;">${body.orbitDays ? body.orbitDays + '일' : '-'}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 6px;">
                <div style="font-size: 11px; color: var(--text-muted);">위성 수</div>
                <div style="font-size: 14px; font-weight: 800; color: #fff;">${body.moons !== undefined ? body.moons + '개' : '-'}</div>
            </div>
        `;

        document.getElementById('modalDesc').textContent = body.desc;
        document.getElementById('modalTrivia').textContent = body.trivia || '알려진 흥미로운 특성 기록.';

        const missionsBox = document.getElementById('modalMissions');
        if (missionsBox) {
            missionsBox.innerHTML = (body.missions || ['국제 우주 관측선']).map(m => `<span style="background: rgba(56,189,248,0.15); color: #38bdf8; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700;">🚀 ${m}</span>`).join('');
        }

        modalOverlay.classList.add('active');
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('active');
    }

    /**
     * 3D WebGL Engine via Three.js
     */
    function initThreeDScene() {
        if (!canvasContainer || !canvas) return;

        try {
            if (typeof THREE === 'undefined') {
                console.warn('Three.js not loaded, starting 2D Canvas Fallback Renderer.');
                initCanvas2DFallback();
                return;
            }

            const width = canvasContainer.clientWidth || 900;
            const height = canvasContainer.clientHeight || 540;

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
            camera.position.set(0, 120, 220);
            clock = new THREE.Clock();

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            if (typeof THREE.OrbitControls !== 'undefined') {
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.maxDistance = 600;
                controls.minDistance = 10;
            }

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            // Ambient Lighting & Central Sun Light
            const ambientLight = new THREE.AmbientLight(0x505060, 1.4);
            scene.add(ambientLight);

            const sunLight = new THREE.PointLight(0xfffaed, 2.5, 1000);
            scene.add(sunLight);

            // Build 3D Starfield Background Particles
            buildStarfield();

            // Build Celestial Objects & Orbits
            buildCelestialBodies();

            // Wire Up UI Controls
            initSimUIControls();

            window.addEventListener('resize', onWindowResize);
            canvas.addEventListener('click', onCanvasClick);

            // Animation Loop
            animate();
        } catch (err) {
            console.error('WebGL init error, falling back to 2D Canvas Renderer:', err);
            initCanvas2DFallback();
        }
    }

    /**
     * Bulletproof 2D HTML5 Canvas Solar System Renderer Fallback
     */
    function initCanvas2DFallback() {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvasContainer.clientWidth || 900;
        let height = canvasContainer.clientHeight || 540;
        canvas.width = width;
        canvas.height = height;

        initSimUIControls();

        // 2D Solar System State
        let angle = 0;
        const planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

        function render2DFallback() {
            width = canvasContainer.clientWidth || 900;
            height = canvasContainer.clientHeight || 540;
            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = '#030712';
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Draw Stars
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            for (let i = 0; i < 150; i++) {
                const sx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
                const sy = (Math.cos(i * 33) * 0.5 + 0.5) * height;
                ctx.fillRect(sx, sy, 1.5, 1.5);
            }

            // Draw Sun
            ctx.fillStyle = '#ffaa00';
            ctx.shadowColor = '#ff8800';
            ctx.shadowBlur = 24;
            ctx.beginPath();
            ctx.arc(cx, cy, 24, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            if (state.isPlaying) {
                angle += 0.008 * state.orbitSpeed;
                state.simTimeYears += 0.002 * state.orbitSpeed;
                if (simTimeVal) simTimeVal.textContent = `${state.simTimeYears.toFixed(1)} yrs`;
            }

            const orbitRates = { mercury: 4.1, venus: 1.6, earth: 1.0, mars: 0.53, jupiter: 0.08, saturn: 0.03, uranus: 0.012, neptune: 0.006, pluto: 0.004 };
            const dists = { mercury: 45, venus: 70, earth: 100, mars: 135, jupiter: 180, saturn: 220, uranus: 255, neptune: 285, pluto: 310 };

            planetKeys.forEach(key => {
                const bodyData = window.SOLAR_SYSTEM_DATA[key];
                const r = dists[key];
                const rate = orbitRates[key] || 0.1;
                const currentAngle = angle * rate * 2;

                const px = cx + Math.cos(currentAngle) * r;
                const py = cy + Math.sin(currentAngle) * (r * 0.5); // Elliptical 3D perspective tilt

                // Draw Orbit Ellipse
                if (state.showOrbits) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, r, r * 0.5, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Draw Planet
                ctx.fillStyle = bodyData.color || '#3b82f6';
                ctx.beginPath();
                ctx.arc(px, py, getBodyScaleRadius(key) * 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Draw Saturn Ring in 2D
                if (key === 'saturn') {
                    ctx.strokeStyle = '#eab308';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.ellipse(px, py, 16, 6, 0.3, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Planet Label
                ctx.fillStyle = '#94a3b8';
                ctx.font = '11px Pretendard, sans-serif';
                ctx.fillText(bodyData.name, px + 10, py + 4);
            });

            requestAnimationFrame(render2DFallback);
        }

        render2DFallback();
    }

    function buildStarfield() {
        const starGeo = new THREE.BufferGeometry();
        const count = 2500;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 1200;
            positions[i + 1] = (Math.random() - 0.5) * 1200;
            positions[i + 2] = (Math.random() - 0.5) * 1200;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
        const starMesh = new THREE.Points(starGeo, starMat);
        scene.add(starMesh);
    }

    function getBodyScaleRadius(key) {
        if (state.scaleMode === 'realistic') {
            const radMap = { sun: 14, jupiter: 5.5, saturn: 4.5, uranus: 3.2, neptune: 3.0, earth: 1.8, venus: 1.7, mars: 1.2, mercury: 0.9, moon: 0.5, pluto: 0.7 };
            return radMap[key] || 2;
        } else {
            // Visual Scale Mode
            const radMap = { sun: 16, jupiter: 8.5, saturn: 7.2, uranus: 5.5, neptune: 5.2, earth: 3.8, venus: 3.6, mars: 2.8, mercury: 2.2, moon: 1.2, pluto: 1.8 };
            return radMap[key] || 3;
        }
    }

    function getBodyOrbitRadius(key) {
        if (state.scaleMode === 'realistic') {
            const distMap = { mercury: 25, venus: 40, earth: 60, mars: 85, jupiter: 140, saturn: 200, uranus: 270, neptune: 340, pluto: 400 };
            return distMap[key] || 0;
        } else {
            // Visual Orbit Distance Mode
            const distMap = { mercury: 32, venus: 50, earth: 72, mars: 98, jupiter: 135, saturn: 175, uranus: 215, neptune: 255, pluto: 295 };
            return distMap[key] || 0;
        }
    }

    const LOCAL_TEXTURE_FILES = {
        sun: './assets/textures/2k_sun.jpg',
        earth: './assets/textures/2k_earth_daymap.jpg',
        earthNight: './assets/textures/2k_earth_nightmap.jpg',
        moon: './assets/textures/2k_moon.jpg',
        mars: './assets/textures/2k_mars.jpg',
        jupiter: './assets/textures/2k_jupiter.jpg',
        saturn: './assets/textures/2k_saturn.jpg',
        saturnRing: './assets/textures/2k_saturn_ring.png',
        venus: './assets/textures/2k_venus.jpg',
        mercury: './assets/textures/2k_mercury.jpg',
        uranus: './assets/textures/2k_uranus.jpg',
        neptune: './assets/textures/2k_neptune.jpg',
        pluto: './assets/textures/2k_pluto.jpg',
        milkyWay: './assets/textures/2k_stars_milky_way.jpg'
    };

    function loadPlanetTexture(key) {
        let canvasEl;
        if (key === 'saturnRing') {
            canvasEl = window.createSaturnRingCanvas();
        } else {
            canvasEl = window.createPlanetCanvas(key);
        }

        const texture = new THREE.CanvasTexture(canvasEl);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.needsUpdate = true;

        if (LOCAL_TEXTURE_FILES[key] && typeof THREE.TextureLoader !== 'undefined') {
            const loader = new THREE.TextureLoader();
            loader.load(
                LOCAL_TEXTURE_FILES[key],
                (loadedTex) => {
                    if (loadedTex && loadedTex.image) {
                        try {
                            const ctx = canvasEl.getContext('2d');
                            if (ctx) {
                                ctx.drawImage(loadedTex.image, 0, 0, canvasEl.width, canvasEl.height);
                                texture.needsUpdate = true;
                            }
                        } catch (e) {
                            console.warn('Texture draw warning:', e);
                        }
                    }
                },
                undefined,
                () => {}
            );
        }

        return texture;
    }

    function buildCelestialBodies() {
        // Clear previous bodies & orbits
        for (const bodyObj of Object.values(celestialBodies)) {
            if (bodyObj.mesh) scene.remove(bodyObj.mesh);
            if (bodyObj.pivot) scene.remove(bodyObj.pivot);
        }
        orbitLines.forEach(l => scene.remove(l));
        orbitLines = [];
        celestialBodies = {};

        // 1. Build Photorealistic Sun
        const sunTex = loadPlanetTexture('sun');
        const sunGeo = new THREE.SphereGeometry(getBodyScaleRadius('sun'), 48, 48);
        const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sunMesh);

        // Double Layer Sun Glow Atmosphere Corona Mesh
        const coronaGeo1 = new THREE.SphereGeometry(getBodyScaleRadius('sun') * 1.15, 32, 32);
        const coronaMat1 = new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.35, side: THREE.BackSide });
        const coronaMesh1 = new THREE.Mesh(coronaGeo1, coronaMat1);
        sunMesh.add(coronaMesh1);

        const coronaGeo2 = new THREE.SphereGeometry(getBodyScaleRadius('sun') * 1.35, 32, 32);
        const coronaMat2 = new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 0.15, side: THREE.BackSide });
        const coronaMesh2 = new THREE.Mesh(coronaGeo2, coronaMat2);
        sunMesh.add(coronaMesh2);

        celestialBodies['sun'] = { mesh: sunMesh, data: window.SOLAR_SYSTEM_DATA.sun };

        // 2. Build Planets & Moon
        const planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

        planetKeys.forEach(key => {
            const data = window.SOLAR_SYSTEM_DATA[key];
            const orbitR = getBodyOrbitRadius(key);
            const bodyR = getBodyScaleRadius(key);

            // Pivot for smooth orbit rotation around Sun (0,0,0)
            const pivot = new THREE.Object3D();
            scene.add(pivot);

            // Planet Mesh with TextureLoader
            const texture = loadPlanetTexture(key);
            const geo = new THREE.SphereGeometry(bodyR, 48, 48);
            
            // Material tuning
            const matParams = {
                map: texture,
                roughness: key === 'earth' ? 0.35 : key === 'jupiter' || key === 'saturn' ? 0.8 : 0.6,
                metalness: 0.1
            };

            // Earth Night Map City Lights Integration!
            if (key === 'earth') {
                const nightTex = loadPlanetTexture('earthNight');
                matParams.emissiveMap = nightTex;
                matParams.emissive = new THREE.Color(0xffd18a);
                matParams.emissiveIntensity = 0.85;
            }

            const mat = new THREE.MeshStandardMaterial(matParams);

            const planetMesh = new THREE.Mesh(geo, mat);
            planetMesh.position.x = orbitR;
            planetMesh.userData = { key, data };

            pivot.add(planetMesh);

            // Saturn Ring Mesh
            if (key === 'saturn') {
                const ringTex = loadPlanetTexture('saturnRing');
                const ringGeo = new THREE.RingGeometry(bodyR * 1.3, bodyR * 2.4, 64);

                ringGeo.rotateX(Math.PI / 2.2);
                const ringMat = new THREE.MeshStandardMaterial({ map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.92 });
                const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                planetMesh.add(ringMesh);
            }

            // Earth Atmosphere Glow
            if (key === 'earth') {
                // Cyan Blue Atmosphere Halo Glow
                const atmosGeo = new THREE.SphereGeometry(bodyR * 1.12, 32, 32);
                const atmosMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, side: THREE.BackSide });
                const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
                planetMesh.add(atmosMesh);

                // 3. Earth's Moon
                const moonPivot = new THREE.Object3D();
                planetMesh.add(moonPivot);

                const moonTex = loadPlanetTexture('moon');
                const moonR = getBodyScaleRadius('moon');
                const moonGeo = new THREE.SphereGeometry(moonR, 24, 24);
                const moonMat = new THREE.MeshStandardMaterial({ map: moonTex, roughness: 0.85 });
                const moonMesh = new THREE.Mesh(moonGeo, moonMat);
                moonMesh.position.x = bodyR + 6;
                moonMesh.userData = { key: 'moon', data: window.SOLAR_SYSTEM_DATA.moon };

                moonPivot.add(moonMesh);
                celestialBodies['moon'] = { mesh: moonMesh, pivot: moonPivot, orbitRadius: 6, data: window.SOLAR_SYSTEM_DATA.moon };
            }

            celestialBodies[key] = { mesh: planetMesh, pivot, orbitRadius: orbitR, data };

            // Render Orbit Ellipse Line
            if (state.showOrbits) {
                const orbitGeo = new THREE.BufferGeometry();
                const points = [];
                const segments = 128;
                for (let i = 0; i <= segments; i++) {
                    const theta = (i / segments) * Math.PI * 2;
                    points.push(new THREE.Vector3(Math.cos(theta) * orbitR, 0, Math.sin(theta) * orbitR));
                }
                orbitGeo.setFromPoints(points);
                const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
                const line = new THREE.LineLoop(orbitGeo, orbitMat);
                scene.add(line);
                orbitLines.push(line);
            }
        });
    }

    function initSimUIControls() {
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                state.isPlaying = !state.isPlaying;
                playPauseBtn.textContent = state.isPlaying ? '⏸' : '▶';
            });
        }

        if (resetCamBtn) {
            resetCamBtn.addEventListener('click', () => {
                if (camera && controls) {
                    camera.position.set(0, 120, 220);
                    controls.target.set(0, 0, 0);
                    controls.update();
                }
            });
        }

        if (speedSlider && speedValBadge) {
            speedSlider.addEventListener('input', (e) => {
                state.orbitSpeed = parseFloat(e.target.value);
                speedValBadge.textContent = `${state.orbitSpeed.toFixed(1)}x`;
            });
        }

        if (scaleVisualBtn && scaleRealisticBtn) {
            scaleVisualBtn.addEventListener('click', () => {
                scaleVisualBtn.classList.add('active');
                scaleRealisticBtn.classList.remove('active');
                state.scaleMode = 'visual';
                buildCelestialBodies();
            });

            scaleRealisticBtn.addEventListener('click', () => {
                scaleRealisticBtn.classList.add('active');
                scaleVisualBtn.classList.remove('active');
                state.scaleMode = 'realistic';
                buildCelestialBodies();
            });
        }

        if (showOrbitsToggle) {
            showOrbitsToggle.addEventListener('change', (e) => {
                state.showOrbits = e.target.checked;
                orbitLines.forEach(line => line.visible = state.showOrbits);
            });
        }
    }

    function focusCameraOnBody(key) {
        const bodyObj = celestialBodies[key];
        if (!bodyObj || !bodyObj.mesh) return;

        const worldPos = new THREE.Vector3();
        bodyObj.mesh.getWorldPosition(worldPos);

        const r = getBodyScaleRadius(key);

        if (controls) {
            controls.target.copy(worldPos);
            camera.position.set(worldPos.x + r * 4 + 10, worldPos.y + r * 3 + 10, worldPos.z + r * 5 + 15);
            controls.update();
        }

        openPlanetModal(key);
    }

    function onCanvasClick(event) {
        if (!raycaster || !camera) return;

        const rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);
        for (const hit of intersects) {
            if (hit.object.userData && hit.object.userData.key) {
                focusCameraOnBody(hit.object.userData.key);
                break;
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock ? clock.getDelta() : 0.016;

        if (state.isPlaying) {
            state.simTimeYears += delta * 0.05 * state.orbitSpeed;
            if (simTimeVal) {
                simTimeVal.textContent = `${state.simTimeYears.toFixed(1)} yrs`;
            }

            // Rotate Sun & Earth Clouds
            if (celestialBodies['sun']) {
                celestialBodies['sun'].mesh.rotation.y += 0.003;
            }
            if (celestialBodies['earthCloud']) {
                celestialBodies['earthCloud'].rotation.y += 0.006;
            }

            // Orbit & Rotate Planets
            const orbitSpeedRates = {
                mercury: 4.1,
                venus: 1.6,
                earth: 1.0,
                mars: 0.53,
                jupiter: 0.08,
                saturn: 0.03,
                uranus: 0.012,
                neptune: 0.006,
                pluto: 0.004
            };

            for (const [key, bodyObj] of Object.entries(celestialBodies)) {
                if (key === 'sun') continue;

                if (key === 'moon' && bodyObj.pivot) {
                    bodyObj.pivot.rotation.y += delta * 2.0 * state.orbitSpeed;
                    bodyObj.mesh.rotation.y += 0.01;
                } else if (bodyObj.pivot) {
                    const rate = orbitSpeedRates[key] || 0.1;
                    bodyObj.pivot.rotation.y += delta * 0.5 * rate * state.orbitSpeed;
                    bodyObj.mesh.rotation.y += 0.01;
                }
            }
        }

        if (controls) controls.update();
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    function onWindowResize() {
        if (!canvasContainer || !camera || !renderer) return;
        const w = canvasContainer.clientWidth || 900;
        const h = canvasContainer.clientHeight || 540;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    /**
     * Space Quiz Engine in Tab 4
     */
    function initSpaceQuiz() {
        const nextBtn = document.getElementById('nextQuizBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', loadNewQuizQuestion);
        }
    }

    function loadNewQuizQuestion() {
        if (state.quiz.autoTimer) {
            clearTimeout(state.quiz.autoTimer);
            state.quiz.autoTimer = null;
        }

        state.quiz.answered = false;

        const quizPool = [
            {
                q: "태양계에서 가장 크고 대적점(Great Red Spot)이라는 거대한 폭풍을 가진 행성은?",
                ans: "목성 (Jupiter)",
                opts: ["목성 (Jupiter)", "토성 (Saturn)", "화성 (Mars)", "천왕성 (Uranus)"],
                hint: "지구보다 큰 거대한 붉은 소용돌이 폭풍이 있습니다."
            },
            {
                q: "상온에서 얼음 입자와 암석 조각으로 이루어진 화려한 고리를 가진 행성은?",
                ans: "토성 (Saturn)",
                opts: ["수성 (Mercury)", "토성 (Saturn)", "해왕성 (Neptune)", "금성 (Venus)"],
                hint: "밀도가 물보다 낮아 바다에 띄우면 둥둥 뜨는 행성입니다."
            },
            {
                q: "태양에서 가장 가깝고 낮과 밤의 온도 차이가 600°C 이상 나는 행성은?",
                ans: "수성 (Mercury)",
                opts: ["수성 (Mercury)", "지구 (Earth)", "화성 (Mars)", "금성 (Venus)"],
                hint: "대기가 거의 없고 공전 속도가 가장 빠릅니다."
            },
            {
                q: "두꺼운 이산화탄소 대기의 극심한 온실효과로 태양계에서 가장 뜨거운 행성은?",
                ans: "금성 (Venus)",
                opts: ["금성 (Venus)", "수성 (Mercury)", "목성 (Jupiter)", "해왕성 (Neptune)"],
                hint: "표면 온도가 무려 465°C에 달합니다."
            },
            {
                q: "토양에 산화철(녹슨 철) 성분이 많아 붉은빛을 띠는 행성은?",
                ans: "화성 (Mars)",
                opts: ["화성 (Mars)", "목성 (Jupiter)", "지구 (Earth)", "천왕성 (Uranus)"],
                hint: "올림푸스 산이라는 태양계 최대 거대 화산이 있습니다."
            },
            {
                q: "자전축이 무려 98도나 누워 있어서 사실상 누워서 공전하는 행성은?",
                ans: "천왕성 (Uranus)",
                opts: ["천왕성 (Uranus)", "해왕성 (Neptune)", "토성 (Saturn)", "수성 (Mercury)"],
                hint: "메탄 대기로 인해 영롱한 청록색으로 보입니다."
            }
        ];

        const qObj = quizPool[Math.floor(Math.random() * quizPool.length)];
        state.quiz.currentQuestion = qObj;

        document.getElementById('quizQuestionText').textContent = `🪐 ${qObj.q}`;
        document.getElementById('quizSubText').textContent = `💡 힌트: ${qObj.hint}`;

        const optGrid = document.getElementById('quizOptionsGrid');
        optGrid.innerHTML = '';

        const shuffledOpts = [...qObj.opts].sort(() => Math.random() - 0.5);
        shuffledOpts.forEach(optText => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.style.cssText = 'background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 16px; border-radius: 10px; color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s;';
            btn.textContent = optText;
            btn.addEventListener('click', () => checkQuizAnswer(optText, btn, qObj.ans));
            optGrid.appendChild(btn);
        });

        document.getElementById('quizResultMsg').textContent = '';
    }

    function checkQuizAnswer(selectedOpt, btn, correctAns) {
        if (state.quiz.answered) return;
        state.quiz.answered = true;

        const isCorrect = selectedOpt === correctAns;
        const msg = document.getElementById('quizResultMsg');

        if (isCorrect) {
            btn.style.background = '#10b981';
            btn.style.color = '#000';
            state.quiz.score += 10;
            state.quiz.streak += 1;
            msg.textContent = '🎉 정답입니다! (+10점) ➔ 잠시 후 다음 문제로 이동합니다.';
            msg.style.color = '#38bdf8';

            state.quiz.autoTimer = setTimeout(loadNewQuizQuestion, 1200);
        } else {
            btn.style.background = '#ef4444';
            state.quiz.streak = 0;
            msg.textContent = `❌ 아쉽네요! 정답은 『 ${correctAns} 』 입니다. ➔ 잠시 후 다음 문제로 이동합니다.`;
            msg.style.color = '#ef4444';

            state.quiz.autoTimer = setTimeout(loadNewQuizQuestion, 2000);
        }

        document.getElementById('quizScore').textContent = state.quiz.score;
        document.getElementById('quizStreak').textContent = state.quiz.streak;
    }
});
