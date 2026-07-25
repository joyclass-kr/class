/**
 * 태양계 탐험 (Solar System Explorer) Three.js & HTML5 Canvas Multi-Engine
 * Zero-Fail Architecture (3D WebGL + 2D HTML5 Canvas Automatic Fallback)
 */

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    function boot() {
        // App State
        var state = {
            currentTab: 'sim',
            isPlaying: true,
            orbitSpeed: 1.0,
            scaleMode: 'visual',
            showOrbits: true,
            simTimeYears: 0.0,
            selectedBody: null,
            quiz: { score: 0, streak: 0, currentQuestion: null, answered: false, autoTimer: null }
        };

        // DOM Elements
        var canvasContainer = document.getElementById('solarCanvasContainer');
        var canvas = document.getElementById('solarCanvas');
        var playPauseBtn = document.getElementById('playPauseBtn');
        var resetCamBtn = document.getElementById('resetCamBtn');
        var speedSlider = document.getElementById('speedSlider');
        var speedValBadge = document.getElementById('speedValBadge');
        var scaleVisualBtn = document.getElementById('scaleVisualBtn');
        var scaleRealisticBtn = document.getElementById('scaleRealisticBtn');
        var showOrbitsToggle = document.getElementById('showOrbitsToggle');
        var simTimeVal = document.getElementById('simTimeVal');
        var modalOverlay = document.getElementById('modalOverlay');

        // 3D Engine vars
        var scene, camera, renderer, controls, clock;
        var celestialBodies = {};
        var orbitLines = [];
        var raycaster, mouse;

        // Init UI components
        initNavTabs();
        initQuickBar();
        initAtlasGrid();
        initSpaceCalc();
        initSpaceQuiz();
        initModal();

        // Attempt 3D WebGL Engine, fallback to 2D Engine on any failure
        try {
            if (typeof THREE !== 'undefined') {
                init3D();
            } else {
                init2DFallback();
            }
        } catch (e) {
            console.warn('3D WebGL Engine init failed, starting 2D Canvas Fallback:', e);
            init2DFallback();
        }

        // ========== 3D ENGINE ==========
        function init3D() {
            if (!canvasContainer || !canvas) return;

            var w = canvasContainer.clientWidth || 900;
            var h = canvasContainer.clientHeight || 540;

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
            camera.position.set(0, 120, 220);
            camera.lookAt(0, 0, 0);

            clock = new THREE.Clock();

            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x030712);

            if (typeof THREE.OrbitControls !== 'undefined') {
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.maxDistance = 600;
                controls.minDistance = 10;
            }

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            // Ambient & Sun Point Light
            scene.add(new THREE.AmbientLight(0x505060, 1.4));
            scene.add(new THREE.PointLight(0xfffaed, 2.5, 1000));

            // Build Starfield & Solar System
            buildStarfield();
            buildCelestialBodies();

            // Event Listeners
            initSimUIControls();
            window.addEventListener('resize', onWindowResize);
            canvas.addEventListener('click', onCanvasClick);

            // Start 3D Loop
            animate3D();
        }

        // ========== 2D ENGINE FALLBACK ==========
        function init2DFallback() {
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            if (!ctx) return;

            initSimUIControls();

            var angle = 0;
            var planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
            var orbitRates = { mercury: 4.1, venus: 1.6, earth: 1.0, mars: 0.53, jupiter: 0.08, saturn: 0.03, uranus: 0.012, neptune: 0.006, pluto: 0.004 };
            var dists = { mercury: 45, venus: 70, earth: 100, mars: 135, jupiter: 180, saturn: 220, uranus: 255, neptune: 285, pluto: 310 };

            function render2D() {
                var w = canvasContainer ? (canvasContainer.clientWidth || 900) : 900;
                var h = canvasContainer ? (canvasContainer.clientHeight || 540) : 540;
                if (canvas.width !== w) canvas.width = w;
                if (canvas.height !== h) canvas.height = h;

                ctx.fillStyle = '#030712';
                ctx.fillRect(0, 0, w, h);

                var cx = w / 2;
                var cy = h / 2;

                // Draw Starfield Background
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                for (var i = 0; i < 150; i++) {
                    var sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
                    var sy = (Math.cos(i * 33) * 0.5 + 0.5) * h;
                    ctx.fillRect(sx, sy, 1.5, 1.5);
                }

                // Draw Central Sun
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
                    if (simTimeVal) simTimeVal.textContent = state.simTimeYears.toFixed(1) + ' yrs';
                }

                planetKeys.forEach(function (key) {
                    var bodyData = (window.SOLAR_SYSTEM_DATA && window.SOLAR_SYSTEM_DATA[key]) || {};
                    var r = dists[key] || 100;
                    var rate = orbitRates[key] || 0.1;
                    var curAngle = angle * rate * 2;

                    var px = cx + Math.cos(curAngle) * r;
                    var py = cy + Math.sin(curAngle) * (r * 0.5);

                    // Orbit Line
                    if (state.showOrbits) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.ellipse(cx, cy, r, r * 0.5, 0, 0, Math.PI * 2);
                        ctx.stroke();
                    }

                    // Planet Sphere
                    ctx.fillStyle = bodyData.color || '#3b82f6';
                    ctx.beginPath();
                    ctx.arc(px, py, getBodyScaleRadius(key) * 1.5, 0, Math.PI * 2);
                    ctx.fill();

                    // Saturn Ring
                    if (key === 'saturn') {
                        ctx.strokeStyle = '#eab308';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.ellipse(px, py, 16, 6, 0.3, 0, Math.PI * 2);
                        ctx.stroke();
                    }

                    // Label
                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '11px Pretendard, sans-serif';
                    ctx.fillText(bodyData.name || key, px + 10, py + 4);
                });

                requestAnimationFrame(render2D);
            }

            render2D();
        }

        // ========== TEXTURE LOADING ==========
        var TEX_FILES = {
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
            var canvasEl;
            if (key === 'saturnRing' && typeof window.createSaturnRingCanvas === 'function') {
                canvasEl = window.createSaturnRingCanvas();
            } else if (typeof window.createPlanetCanvas === 'function') {
                canvasEl = window.createPlanetCanvas(key);
            } else {
                canvasEl = document.createElement('canvas');
                canvasEl.width = 512;
                canvasEl.height = 256;
            }

            var texture = new THREE.CanvasTexture(canvasEl);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.needsUpdate = true;

            if (TEX_FILES[key] && typeof THREE.TextureLoader !== 'undefined') {
                try {
                    var loader = new THREE.TextureLoader();
                    loader.load(TEX_FILES[key], function (loadedTex) {
                        if (loadedTex && loadedTex.image) {
                            try {
                                var ctx = canvasEl.getContext('2d');
                                if (ctx) {
                                    ctx.drawImage(loadedTex.image, 0, 0, canvasEl.width, canvasEl.height);
                                    texture.needsUpdate = true;
                                }
                            } catch (e) { }
                        }
                    }, undefined, function () { });
                } catch (e) { }
            }

            return texture;
        }

        // ========== SCALE HELPERS ==========
        function getBodyScaleRadius(key) {
            if (state.scaleMode === 'realistic') {
                var r = { sun: 14, jupiter: 5.5, saturn: 4.5, uranus: 3.2, neptune: 3.0, earth: 1.8, venus: 1.7, mars: 1.2, mercury: 0.9, moon: 0.5, pluto: 0.7 };
                return r[key] || 2;
            } else {
                var v = { sun: 16, jupiter: 8.5, saturn: 7.2, uranus: 5.5, neptune: 5.2, earth: 3.8, venus: 3.6, mars: 2.8, mercury: 2.2, moon: 1.2, pluto: 1.8 };
                return v[key] || 3;
            }
        }

        function getBodyOrbitRadius(key) {
            if (state.scaleMode === 'realistic') {
                var r = { mercury: 25, venus: 40, earth: 60, mars: 85, jupiter: 140, saturn: 200, uranus: 270, neptune: 340, pluto: 400 };
                return r[key] || 0;
            } else {
                var v = { mercury: 32, venus: 50, earth: 72, mars: 98, jupiter: 135, saturn: 175, uranus: 215, neptune: 255, pluto: 295 };
                return v[key] || 0;
            }
        }

        // ========== BUILD SCENE ==========
        function buildStarfield() {
            var geo = new THREE.BufferGeometry();
            var count = 2500;
            var pos = new Float32Array(count * 3);
            for (var i = 0; i < count * 3; i += 3) {
                pos[i] = (Math.random() - 0.5) * 1200;
                pos[i + 1] = (Math.random() - 0.5) * 1200;
                pos[i + 2] = (Math.random() - 0.5) * 1200;
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            var mat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
            scene.add(new THREE.Points(geo, mat));
        }

        function buildCelestialBodies() {
            if (!window.SOLAR_SYSTEM_DATA) return;

            // Clear previous
            Object.values(celestialBodies).forEach(function (b) {
                if (b.mesh) scene.remove(b.mesh);
                if (b.pivot) scene.remove(b.pivot);
            });
            orbitLines.forEach(function (l) { scene.remove(l); });
            orbitLines = [];
            celestialBodies = {};

            // Sun
            var sunTex = loadPlanetTexture('sun');
            var sunR = getBodyScaleRadius('sun');
            var sunMesh = new THREE.Mesh(
                new THREE.SphereGeometry(sunR, 48, 48),
                new THREE.MeshBasicMaterial({ map: sunTex })
            );
            scene.add(sunMesh);

            // Sun Corona Glow
            var c1 = new THREE.Mesh(
                new THREE.SphereGeometry(sunR * 1.15, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.35, side: THREE.BackSide })
            );
            sunMesh.add(c1);
            var c2 = new THREE.Mesh(
                new THREE.SphereGeometry(sunR * 1.35, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 0.15, side: THREE.BackSide })
            );
            sunMesh.add(c2);

            celestialBodies['sun'] = { mesh: sunMesh, data: window.SOLAR_SYSTEM_DATA.sun };

            // Planets
            var planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

            planetKeys.forEach(function (key) {
                var data = window.SOLAR_SYSTEM_DATA[key];
                if (!data) return;

                var orbitR = getBodyOrbitRadius(key);
                var bodyR = getBodyScaleRadius(key);

                var pivot = new THREE.Object3D();
                scene.add(pivot);

                var texture = loadPlanetTexture(key);
                var matParams = {
                    map: texture,
                    roughness: key === 'earth' ? 0.35 : (key === 'jupiter' || key === 'saturn') ? 0.8 : 0.6,
                    metalness: 0.1
                };

                if (key === 'earth') {
                    var nightTex = loadPlanetTexture('earthNight');
                    matParams.emissiveMap = nightTex;
                    matParams.emissive = new THREE.Color(0xffd18a);
                    matParams.emissiveIntensity = 0.85;
                }

                var planetMesh = new THREE.Mesh(
                    new THREE.SphereGeometry(bodyR, 48, 48),
                    new THREE.MeshStandardMaterial(matParams)
                );
                planetMesh.position.x = orbitR;
                planetMesh.userData = { key: key, data: data };
                pivot.add(planetMesh);

                // Saturn Ring
                if (key === 'saturn') {
                    var ringTex = loadPlanetTexture('saturnRing');
                    var ringGeo = new THREE.RingGeometry(bodyR * 1.3, bodyR * 2.4, 64);
                    ringGeo.rotateX(Math.PI / 2.2);
                    var ringMesh = new THREE.Mesh(ringGeo,
                        new THREE.MeshStandardMaterial({ map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.92 })
                    );
                    planetMesh.add(ringMesh);
                }

                // Earth Atmosphere Glow & Moon
                if (key === 'earth') {
                    var atmosMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(bodyR * 1.12, 32, 32),
                        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, side: THREE.BackSide })
                    );
                    planetMesh.add(atmosMesh);

                    var moonPivot = new THREE.Object3D();
                    planetMesh.add(moonPivot);
                    var moonR = getBodyScaleRadius('moon');
                    var moonMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(moonR, 24, 24),
                        new THREE.MeshStandardMaterial({ map: loadPlanetTexture('moon'), roughness: 0.85 })
                    );
                    moonMesh.position.x = bodyR + 6;
                    moonMesh.userData = { key: 'moon', data: window.SOLAR_SYSTEM_DATA.moon };
                    moonPivot.add(moonMesh);
                    celestialBodies['moon'] = { mesh: moonMesh, pivot: moonPivot, orbitRadius: 6, data: window.SOLAR_SYSTEM_DATA.moon };
                }

                celestialBodies[key] = { mesh: planetMesh, pivot: pivot, orbitRadius: orbitR, data: data };

                // Orbit Line
                if (state.showOrbits) {
                    var pts = [];
                    for (var i = 0; i <= 128; i++) {
                        var theta = (i / 128) * Math.PI * 2;
                        pts.push(new THREE.Vector3(Math.cos(theta) * orbitR, 0, Math.sin(theta) * orbitR));
                    }
                    var oGeo = new THREE.BufferGeometry().setFromPoints(pts);
                    var line = new THREE.LineLoop(oGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 }));
                    scene.add(line);
                    orbitLines.push(line);
                }
            });
        }

        // ========== ANIMATION LOOP ==========
        var ORBIT_RATES = { mercury: 4.1, venus: 1.6, earth: 1.0, mars: 0.53, jupiter: 0.08, saturn: 0.03, uranus: 0.012, neptune: 0.006, pluto: 0.004 };

        function animate3D() {
            requestAnimationFrame(animate3D);
            var delta = clock ? clock.getDelta() : 0.016;

            if (state.isPlaying) {
                state.simTimeYears += delta * 0.05 * state.orbitSpeed;
                if (simTimeVal) simTimeVal.textContent = state.simTimeYears.toFixed(1) + ' yrs';

                if (celestialBodies['sun'] && celestialBodies['sun'].mesh) {
                    celestialBodies['sun'].mesh.rotation.y += 0.003;
                }

                Object.keys(celestialBodies).forEach(function (key) {
                    var b = celestialBodies[key];
                    if (key === 'sun') return;
                    if (key === 'moon' && b.pivot) {
                        b.pivot.rotation.y += delta * 2.0 * state.orbitSpeed;
                        b.mesh.rotation.y += 0.01;
                    } else if (b.pivot) {
                        var rate = ORBIT_RATES[key] || 0.1;
                        b.pivot.rotation.y += delta * 0.5 * rate * state.orbitSpeed;
                        if (b.mesh) b.mesh.rotation.y += 0.01;
                    }
                });
            }

            if (controls) controls.update();
            if (renderer && scene && camera) renderer.render(scene, camera);
        }

        function onWindowResize() {
            if (!canvasContainer || !camera || !renderer) return;
            var w = canvasContainer.clientWidth || 900;
            var h = canvasContainer.clientHeight || 540;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }

        function onCanvasClick(event) {
            if (!raycaster || !camera || !scene) return;
            var rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            for (var i = 0; i < intersects.length; i++) {
                if (intersects[i].object.userData && intersects[i].object.userData.key) {
                    focusCameraOnBody(intersects[i].object.userData.key);
                    break;
                }
            }
        }

        function focusCameraOnBody(key) {
            var bodyObj = celestialBodies[key];
            if (!bodyObj || !bodyObj.mesh) return;
            var worldPos = new THREE.Vector3();
            bodyObj.mesh.getWorldPosition(worldPos);
            var r = getBodyScaleRadius(key);
            if (controls) {
                controls.target.copy(worldPos);
                camera.position.set(worldPos.x + r * 4 + 10, worldPos.y + r * 3 + 10, worldPos.z + r * 5 + 15);
                controls.update();
            }
            openPlanetModal(key);
        }

        // ========== UI CONTROLS ==========
        function initSimUIControls() {
            if (playPauseBtn) {
                playPauseBtn.addEventListener('click', function () {
                    state.isPlaying = !state.isPlaying;
                    playPauseBtn.textContent = state.isPlaying ? '⏸' : '▶';
                });
            }
            if (resetCamBtn) {
                resetCamBtn.addEventListener('click', function () {
                    if (camera && controls) {
                        camera.position.set(0, 120, 220);
                        controls.target.set(0, 0, 0);
                        controls.update();
                    }
                });
            }
            if (speedSlider && speedValBadge) {
                speedSlider.addEventListener('input', function (e) {
                    state.orbitSpeed = parseFloat(e.target.value);
                    speedValBadge.textContent = state.orbitSpeed.toFixed(1) + 'x';
                });
            }
            if (scaleVisualBtn && scaleRealisticBtn) {
                scaleVisualBtn.addEventListener('click', function () {
                    scaleVisualBtn.classList.add('active');
                    scaleRealisticBtn.classList.remove('active');
                    state.scaleMode = 'visual';
                    if (typeof THREE !== 'undefined' && scene) buildCelestialBodies();
                });
                scaleRealisticBtn.addEventListener('click', function () {
                    scaleRealisticBtn.classList.add('active');
                    scaleVisualBtn.classList.remove('active');
                    state.scaleMode = 'realistic';
                    if (typeof THREE !== 'undefined' && scene) buildCelestialBodies();
                });
            }
            if (showOrbitsToggle) {
                showOrbitsToggle.addEventListener('change', function (e) {
                    state.showOrbits = e.target.checked;
                    orbitLines.forEach(function (l) { l.visible = state.showOrbits; });
                });
            }
        }

        // ========== NAV TABS ==========
        function initNavTabs() {
            var tabs = document.querySelectorAll('.nav-tab');
            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    var target = tab.dataset.tab;
                    tabs.forEach(function (t) { t.classList.remove('active'); });
                    tab.classList.add('active');
                    document.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
                    var pane = document.getElementById('tab-' + target);
                    if (pane) pane.classList.add('active');
                    state.currentTab = target;
                    if (target === 'quiz' && !state.quiz.currentQuestion) loadNewQuizQuestion();
                    if (target === 'sim' && renderer) onWindowResize();
                });
            });
        }

        // ========== QUICK BAR ==========
        function initQuickBar() {
            var bar = document.getElementById('planetQuickBar');
            if (!bar || !window.SOLAR_SYSTEM_DATA) return;
            bar.innerHTML = '';
            Object.keys(window.SOLAR_SYSTEM_DATA).forEach(function (key) {
                var body = window.SOLAR_SYSTEM_DATA[key];
                var chip = document.createElement('button');
                chip.className = 'planet-chip';
                chip.dataset.key = key;
                chip.innerHTML = body.name + ' <small>(' + body.enName + ')</small>';
                chip.addEventListener('click', function () { focusCameraOnBody(key); });
                bar.appendChild(chip);
            });
        }

        // ========== ATLAS GRID ==========
        function initAtlasGrid() {
            var grid = document.getElementById('atlasGrid');
            if (!grid || !window.SOLAR_SYSTEM_DATA) return;
            grid.innerHTML = '';
            Object.keys(window.SOLAR_SYSTEM_DATA).forEach(function (key) {
                var body = window.SOLAR_SYSTEM_DATA[key];
                var texData = (typeof window.createPlanetTexture === 'function') ? window.createPlanetTexture(key) : '';
                var card = document.createElement('div');
                card.className = 'planet-card';
                card.innerHTML =
                    '<div class="planet-card-header">' +
                    '<div class="planet-sphere-preview" style="background: url(\'' + texData + '\') center/cover;"></div>' +
                    '<div><div class="planet-card-title">' + body.name + '</div>' +
                    '<div class="planet-card-sub">' + body.enName + ' | ' + body.type + '</div></div></div>' +
                    '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' + body.desc + '</div>' +
                    '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border-color);padding-top:8px;">' +
                    '<span>중력: 지구의 ' + (body.gravityRatio || 1) + '배</span>' +
                    '<span>위성: ' + (body.moons !== undefined ? body.moons + '개' : '-') + '</span></div>';
                card.addEventListener('click', function () { openPlanetModal(key); });
                grid.appendChild(card);
            });
        }

        // ========== SPACE CALC ==========
        function initSpaceCalc() {
            var weightInput = document.getElementById('userWeightInput');
            var ageInput = document.getElementById('userAgeInput');
            var grid = document.getElementById('calcResultsGrid');
            if (!weightInput || !ageInput || !grid) return;

            function updateCalc() {
                var weight = parseFloat(weightInput.value) || 60;
                var age = parseFloat(ageInput.value) || 12;
                grid.innerHTML = '';
                Object.keys(window.SOLAR_SYSTEM_DATA || {}).forEach(function (key) {
                    if (key === 'sun') return;
                    var body = window.SOLAR_SYSTEM_DATA[key];
                    var calcWeight = (weight * (body.gravityRatio || 1.0)).toFixed(1);
                    var calcAge = body.orbitDays ? ((age * 365.25) / body.orbitDays).toFixed(2) : '-';
                    var texData = (typeof window.createPlanetTexture === 'function') ? window.createPlanetTexture(key) : '';
                    var card = document.createElement('div');
                    card.className = 'calc-result-card';
                    card.innerHTML =
                        '<div class="planet-sphere-preview" style="width:42px;height:42px;background:url(\'' + texData + '\') center/cover;"></div>' +
                        '<div style="flex:1;">' +
                        '<div style="font-size:15px;font-weight:800;color:#fff;">' + body.name + ' (' + body.enName + ')</div>' +
                        '<div style="font-size:12px;color:var(--text-muted);">몸무게: <span class="calc-val-main">' + calcWeight + ' kg</span></div>' +
                        '<div style="font-size:12px;color:var(--text-muted);">행성 나이: <span class="calc-val-main" style="color:#ffd18a;">' + calcAge + ' 세</span></div>' +
                        '</div>';
                    grid.appendChild(card);
                });
            }
            weightInput.addEventListener('input', updateCalc);
            ageInput.addEventListener('input', updateCalc);
            updateCalc();
        }

        // ========== MODAL ==========
        function initModal() {
            var closeBtn = document.getElementById('closeModalBtn');
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            if (modalOverlay) {
                modalOverlay.addEventListener('click', function (e) {
                    if (e.target === modalOverlay) closeModal();
                });
            }
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') closeModal();
            });
        }

        function openPlanetModal(key) {
            var body = (window.SOLAR_SYSTEM_DATA && window.SOLAR_SYSTEM_DATA[key]);
            if (!body) return;
            state.selectedBody = body;
            document.getElementById('modalPlanetName').textContent = body.name;
            document.getElementById('modalPlanetSub').textContent = body.enName + ' | ' + body.type;

            var preview = document.getElementById('modalPlanetPreview');
            var texData = (typeof window.createPlanetTexture === 'function') ? window.createPlanetTexture(key) : '';
            if (preview) preview.style.background = "url('" + texData + "') center/cover";

            var propGrid = document.getElementById('modalPropGrid');
            propGrid.innerHTML =
                '<div style="background:rgba(255,255,255,0.04);padding:10px;border-radius:6px;">' +
                '<div style="font-size:11px;color:var(--text-muted);">표면 온도</div>' +
                '<div style="font-size:14px;font-weight:800;color:#fff;">' + (body.tempC || '-') + '</div></div>' +
                '<div style="background:rgba(255,255,255,0.04);padding:10px;border-radius:6px;">' +
                '<div style="font-size:11px;color:var(--text-muted);">자전 주기</div>' +
                '<div style="font-size:14px;font-weight:800;color:#fff;">' + (body.rotationDays || '-') + '</div></div>' +
                '<div style="background:rgba(255,255,255,0.04);padding:10px;border-radius:6px;">' +
                '<div style="font-size:11px;color:var(--text-muted);">공전 주기</div>' +
                '<div style="font-size:14px;font-weight:800;color:#fff;">' + (body.orbitDays ? body.orbitDays + '일' : '-') + '</div></div>' +
                '<div style="background:rgba(255,255,255,0.04);padding:10px;border-radius:6px;">' +
                '<div style="font-size:11px;color:var(--text-muted);">위성 수</div>' +
                '<div style="font-size:14px;font-weight:800;color:#fff;">' + (body.moons !== undefined ? body.moons + '개' : '-') + '</div></div>';

            document.getElementById('modalDesc').textContent = body.desc;
            document.getElementById('modalTrivia').textContent = body.trivia || '알려진 흥미로운 특성 기록.';

            var missionsBox = document.getElementById('modalMissions');
            if (missionsBox) {
                missionsBox.innerHTML = (body.missions || ['국제 우주 관측선']).map(function (m) {
                    return '<span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:700;">🚀 ' + m + '</span>';
                }).join('');
            }

            if (modalOverlay) modalOverlay.classList.add('active');
        }

        function closeModal() {
            if (modalOverlay) modalOverlay.classList.remove('active');
        }

        // ========== QUIZ ==========
        function initSpaceQuiz() {
            var nextBtn = document.getElementById('nextQuizBtn');
            if (nextBtn) nextBtn.addEventListener('click', loadNewQuizQuestion);
        }

        function loadNewQuizQuestion() {
            if (state.quiz.autoTimer) { clearTimeout(state.quiz.autoTimer); state.quiz.autoTimer = null; }
            state.quiz.answered = false;

            var quizPool = [
                { q: "태양계에서 가장 크고 대적점(Great Red Spot)이라는 거대한 폭풍을 가진 행성은?", ans: "목성 (Jupiter)", opts: ["목성 (Jupiter)", "토성 (Saturn)", "화성 (Mars)", "천왕성 (Uranus)"], hint: "지구보다 큰 거대한 붉은 소용돌이 폭풍이 있습니다." },
                { q: "상온에서 얼음 입자와 암석 조각으로 이루어진 화려한 고리를 가진 행성은?", ans: "토성 (Saturn)", opts: ["수성 (Mercury)", "토성 (Saturn)", "해왕성 (Neptune)", "금성 (Venus)"], hint: "밀도가 물보다 낮아 바다에 띄우면 둥둥 뜨는 행성입니다." },
                { q: "태양에서 가장 가깝고 낮과 밤의 온도 차이가 600°C 이상 나는 행성은?", ans: "수성 (Mercury)", opts: ["수성 (Mercury)", "지구 (Earth)", "화성 (Mars)", "금성 (Venus)"], hint: "대기가 거의 없고 공전 속도가 가장 빠릅니다." },
                { q: "두꺼운 이산화탄소 대기의 극심한 온실효과로 태양계에서 가장 뜨거운 행성은?", ans: "금성 (Venus)", opts: ["금성 (Venus)", "수성 (Mercury)", "목성 (Jupiter)", "해왕성 (Neptune)"], hint: "표면 온도가 무려 465°C에 달합니다." },
                { q: "토양에 산화철(녹슨 철) 성분이 많아 붉은빛을 띠는 행성은?", ans: "화성 (Mars)", opts: ["화성 (Mars)", "목성 (Jupiter)", "지구 (Earth)", "천왕성 (Uranus)"], hint: "올림푸스 산이라는 태양계 최대 거대 화산이 있습니다." },
                { q: "자전축이 무려 98도나 누워 있어서 사실상 누워서 공전하는 행성은?", ans: "천왕성 (Uranus)", opts: ["천왕성 (Uranus)", "해왕성 (Neptune)", "토성 (Saturn)", "수성 (Mercury)"], hint: "메탄 대기로 인해 영롱한 청록색으로 보입니다." }
            ];

            var qObj = quizPool[Math.floor(Math.random() * quizPool.length)];
            state.quiz.currentQuestion = qObj;

            document.getElementById('quizQuestionText').textContent = '🪐 ' + qObj.q;
            document.getElementById('quizSubText').textContent = '💡 힌트: ' + qObj.hint;

            var optGrid = document.getElementById('quizOptionsGrid');
            optGrid.innerHTML = '';

            var shuffled = qObj.opts.slice().sort(function () { return Math.random() - 0.5; });
            shuffled.forEach(function (optText) {
                var btn = document.createElement('button');
                btn.className = 'quiz-opt-btn';
                btn.style.cssText = 'background:rgba(255,255,255,0.05);border:1px solid var(--border-color);padding:16px;border-radius:10px;color:#fff;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.2s;';
                btn.textContent = optText;
                btn.addEventListener('click', function () { checkQuizAnswer(optText, btn, qObj.ans); });
                optGrid.appendChild(btn);
            });

            document.getElementById('quizResultMsg').textContent = '';
        }

        function checkQuizAnswer(selectedOpt, btn, correctAns) {
            if (state.quiz.answered) return;
            state.quiz.answered = true;
            var isCorrect = selectedOpt === correctAns;
            var msg = document.getElementById('quizResultMsg');

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
                msg.textContent = '❌ 아쉽네요! 정답은 『 ' + correctAns + ' 』 입니다. ➔ 잠시 후 다음 문제로 이동합니다.';
                msg.style.color = '#ef4444';
                state.quiz.autoTimer = setTimeout(loadNewQuizQuestion, 2000);
            }

            document.getElementById('quizScore').textContent = state.quiz.score;
            document.getElementById('quizStreak').textContent = state.quiz.streak;
        }
    }
})();
