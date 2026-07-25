/**
 * 태양계 관찰 (Solar System Observation) Three.js & HTML5 Canvas Engine
 * Zero-Fail Architecture (Protected UI Event Controls + 3D WebGL / 2D Canvas Engine)
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
            scaleMode: 'visual', // 'visual' | 'realistic'
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

        // 3D Engine Vars
        var scene, camera, renderer, controls, clock;
        var celestialBodies = {};
        var orbitLines = [];
        var raycaster, mouse;
        var is3DReady = false;

        // 1. ALWAYS initialize UI Event Listeners FIRST so buttons ALWAYS work 100%!
        initNavTabs();
        initQuickBar();
        initAtlasGrid();
        initSpaceCalc();
        initSpaceQuiz();
        initModal();
        initSimUIControls();

        // 2. Initialize 3D Engine safely with 2D Fallback
        try {
            if (typeof THREE !== 'undefined') {
                init3D();
            } else {
                init2DFallback();
            }
        } catch (e) {
            console.warn('3D Init Exception, falling back to 2D engine:', e);
            init2DFallback();
        }

        // ========== 3D ENGINE (Pure Safe Procedural Textures - No WebGL Security Exceptions) ==========
        function init3D() {
            if (!canvasContainer || !canvas) return;

            var w = canvasContainer.clientWidth || 900;
            var h = canvasContainer.clientHeight || 540;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
            camera.position.set(0, 120, 220);
            camera.lookAt(0, 0, 0);

            try {
                clock = new THREE.Clock();
            } catch (e) { clock = null; }

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

            // Lighting
            scene.add(new THREE.AmbientLight(0x505060, 1.4));
            scene.add(new THREE.PointLight(0xfffaed, 2.5, 1000));

            // Starfield & Solar System
            buildStarfield();
            buildCelestialBodies();

            window.addEventListener('resize', onWindowResize);
            canvas.addEventListener('click', onCanvasClick);

            is3DReady = true;
            animate3D();
        }

        function init2DFallback() {
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            if (!ctx) return;

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

                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                for (var i = 0; i < 150; i++) {
                    var sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
                    var sy = (Math.cos(i * 33) * 0.5 + 0.5) * h;
                    ctx.fillRect(sx, sy, 1.5, 1.5);
                }

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

                    if (state.showOrbits) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.ellipse(cx, cy, r, r * 0.5, 0, 0, Math.PI * 2);
                        ctx.stroke();
                    }

                    ctx.fillStyle = bodyData.color || '#3b82f6';
                    ctx.beginPath();
                    ctx.arc(px, py, getBodyScaleRadius(key) * 1.5, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '11px Pretendard, sans-serif';
                    ctx.fillText(bodyData.name || key, px + 10, py + 4);
                });

                requestAnimationFrame(render2D);
            }

            render2D();
        }

        // 3D Procedural Canvas Texture Loader (DataURL based - safe & colorful 3D rendering)
        function loadPlanet3DTexture(key) {
            var textureUrl = (key === 'saturnRing' && typeof window.createSaturnRingTexture === 'function')
                ? window.createSaturnRingTexture()
                : (typeof window.createPlanetTexture === 'function' ? window.createPlanetTexture(key) : '');

            if (textureUrl && typeof THREE !== 'undefined' && THREE.TextureLoader) {
                var loader = new THREE.TextureLoader();
                var tex = loader.load(textureUrl);
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.ClampToEdgeWrapping;
                return tex;
            }
            return null;
        }

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

        function createStarTexture() {
            var canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            var ctx = canvas.getContext('2d');
            var grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 16, 16);
            return new THREE.CanvasTexture(canvas);
        }

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
            var starTex = createStarTexture();
            var mat = new THREE.PointsMaterial({
                map: starTex,
                size: 2.2,
                transparent: true,
                opacity: 0.85,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            scene.add(new THREE.Points(geo, mat));
        }

        function buildCelestialBodies() {
            if (!window.SOLAR_SYSTEM_DATA) return;

            Object.values(celestialBodies).forEach(function (b) {
                if (b.mesh) scene.remove(b.mesh);
                if (b.pivot) scene.remove(b.pivot);
            });
            orbitLines.forEach(function (l) { scene.remove(l); });
            orbitLines = [];
            celestialBodies = {};

            // Sun
            var sunTex = loadPlanet3DTexture('sun');
            var sunR = getBodyScaleRadius('sun');
            var sunMesh = new THREE.Mesh(
                new THREE.SphereGeometry(sunR, 32, 32),
                new THREE.MeshBasicMaterial({ map: sunTex })
            );
            scene.add(sunMesh);

            var c1 = new THREE.Mesh(
                new THREE.SphereGeometry(sunR * 1.15, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.25, side: THREE.BackSide })
            );
            sunMesh.add(c1);

            celestialBodies['sun'] = { mesh: sunMesh, data: window.SOLAR_SYSTEM_DATA.sun };

            // Planets
            var planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

            planetKeys.forEach(function (key) {
                var data = window.SOLAR_SYSTEM_DATA[key];
                if (!data) return;

                var orbitR = getBodyOrbitRadius(key);
                var bodyR = getBodyScaleRadius(key);
                var ecc = data.eccentricity || 0.02;
                var incRad = (data.inclinationDeg || 0.0) * (Math.PI / 180);

                var pivot = new THREE.Object3D();
                // Apply Orbit Inclination Tilt
                pivot.rotation.z = incRad;
                scene.add(pivot);

                var texture = loadPlanet3DTexture(key);
                var geo = new THREE.SphereGeometry(bodyR, 32, 32);
                var mat = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: key === 'earth' ? 0.35 : (key === 'jupiter' || key === 'saturn') ? 0.8 : 0.6,
                    metalness: 0.1
                });
                var planetMesh = new THREE.Mesh(geo, mat);
                
                // Elliptical Orbit Position
                var semiMajor = orbitR;
                var semiMinor = orbitR * Math.sqrt(1 - ecc * ecc);
                planetMesh.position.x = semiMajor;
                planetMesh.userData = { key: key, data: data, semiMajor: semiMajor, semiMinor: semiMinor };
                pivot.add(planetMesh);

                if (key === 'saturn') {
                    var ringTex = loadPlanet3DTexture('saturnRing');
                    var ringGeo = new THREE.RingGeometry(bodyR * 1.3, bodyR * 2.3, 64);
                    ringGeo.rotateX(Math.PI / 2.3);
                    var ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
                    planetMesh.add(ringMesh);
                }

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
                        new THREE.SphereGeometry(moonR, 16, 16),
                        new THREE.MeshStandardMaterial({ map: loadPlanet3DTexture('moon'), roughness: 0.85 })
                    );
                    moonMesh.position.x = bodyR + 6;
                    moonMesh.userData = { key: 'moon', data: window.SOLAR_SYSTEM_DATA.moon };
                    moonPivot.add(moonMesh);
                    celestialBodies['moon'] = { mesh: moonMesh, pivot: moonPivot, orbitRadius: 6, data: window.SOLAR_SYSTEM_DATA.moon };
                }

                celestialBodies[key] = { mesh: planetMesh, pivot: pivot, orbitRadius: orbitR, semiMajor: semiMajor, semiMinor: semiMinor, data: data };

                if (state.showOrbits) {
                    var pts = [];
                    for (var i = 0; i <= 128; i++) {
                        var theta = (i / 128) * Math.PI * 2;
                        pts.push(new THREE.Vector3(Math.cos(theta) * semiMajor, 0, Math.sin(theta) * semiMinor));
                    }
                    var oGeo = new THREE.BufferGeometry().setFromPoints(pts);
                    var line = new THREE.LineLoop(oGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 }));
                    line.rotation.z = incRad;
                    scene.add(line);
                    orbitLines.push(line);
                }
            });
        }

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
                        if (b.mesh) b.mesh.rotation.y += 0.01;
                    } else if (b.pivot && b.mesh) {
                        var rate = ORBIT_RATES[key] || 0.1;
                        if (b.orbitAngle === undefined) b.orbitAngle = Math.random() * Math.PI * 2;
                        b.orbitAngle += delta * 0.5 * rate * state.orbitSpeed;
                        
                        var a = b.semiMajor || b.orbitRadius || 100;
                        var c = b.semiMinor || b.orbitRadius || 100;
                        b.mesh.position.x = Math.cos(b.orbitAngle) * a;
                        b.mesh.position.z = Math.sin(b.orbitAngle) * c;
                        
                        b.mesh.rotation.y += 0.01;
                    }
                });
            }

            if (controls) controls.update();
            if (renderer && scene && camera) {
                try { renderer.render(scene, camera); } catch (e) { }
            }
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
                    if (is3DReady && scene) buildCelestialBodies();
                });
                scaleRealisticBtn.addEventListener('click', function () {
                    scaleRealisticBtn.classList.add('active');
                    scaleVisualBtn.classList.remove('active');
                    state.scaleMode = 'realistic';
                    if (is3DReady && scene) buildCelestialBodies();
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

        // ========== PLANET ATLAS GRID (Tab 2: High-Res Large Fixed Photos) ==========
        function initAtlasGrid() {
            var grid = document.getElementById('atlasGrid');
            if (!grid || !window.SOLAR_SYSTEM_DATA) return;
            grid.innerHTML = '';
            Object.keys(window.SOLAR_SYSTEM_DATA).forEach(function (key) {
                var body = window.SOLAR_SYSTEM_DATA[key];
                var photo = body.photoUrl || (typeof window.createPlanetTexture === 'function' ? window.createPlanetTexture(key) : '');
                
                var card = document.createElement('div');
                card.className = 'planet-card';
                card.style.cssText = 'overflow: hidden; padding: 0; position: relative; border-radius: 16px; border: 1px solid var(--border-color); background: rgba(10,15,29,0.9); cursor: pointer; transition: all 0.3s ease;';
                
                var keyPointsHtml = '';
                if (body.satExamKeyPoints && body.satExamKeyPoints.length > 0) {
                    keyPointsHtml = '<div style="font-size:12px; color:#38bdf8; background:rgba(56,189,248,0.1); border-left:3px solid #38bdf8; padding:8px 12px; border-radius:4px; margin-top:8px;">' + body.satExamKeyPoints[0] + '</div>';
                }

                card.innerHTML =
                    '<div style="width:100%; height:200px; background: url(\'' + photo + '\') center/cover no-repeat; position:relative; border-bottom:1px solid var(--border-color);">' +
                    '<span style="position:absolute; top:12px; left:12px; background:rgba(3,7,18,0.85); color:#38bdf8; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:800;">' + (body.category || body.type) + '</span>' +
                    '</div>' +
                    '<div style="padding: 18px 20px; display:flex; flex-direction:column; gap:10px;">' +
                    '<div><div style="font-size:20px; font-weight:900; color:#fff;">' + body.name + ' <small style="font-size:13px; color:var(--text-muted); font-weight:500;">(' + body.enName + ')</small></div></div>' +
                    '<div style="font-size:13px; color:var(--text-secondary); line-height:1.5;">' + body.desc + '</div>' +
                    keyPointsHtml +
                    '<div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-muted); border-top:1px solid var(--border-color); padding-top:10px; margin-top:4px;">' +
                    '<span>자전: ' + (body.rotationDays || '-') + '</span>' +
                    '<span>공전: ' + (body.orbitDays ? body.orbitDays + '일' : '-') + '</span>' +
                    '</div></div>';
                
                card.addEventListener('click', function () { openPlanetModal(key); });
                grid.appendChild(card);
            });
        }

        // ========== ORBIT & ROTATION PERIOD COMPARISON (Tab 3) ==========
        function initSpaceCalc() {
            var grid = document.getElementById('calcResultsGrid');
            if (!grid || !window.SOLAR_SYSTEM_DATA) return;
            grid.innerHTML = '';
            Object.keys(window.SOLAR_SYSTEM_DATA).forEach(function (key) {
                if (key === 'sun') return;
                var body = window.SOLAR_SYSTEM_DATA[key];
                var photo = body.photoUrl || (typeof window.createPlanetTexture === 'function' ? window.createPlanetTexture(key) : '');
                
                var card = document.createElement('div');
                card.className = 'calc-result-card';
                card.innerHTML =
                    '<div class="planet-sphere-preview" style="width:48px;height:48px;background:url(\'' + photo + '\') center/cover;"></div>' +
                    '<div style="flex:1;">' +
                    '<div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:4px;">' + body.name + ' (' + body.enName + ')</div>' +
                    '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:2px;">' +
                    '🔄 <strong>자전 주기 (1일):</strong> <span style="color:#38bdf8;font-weight:700;">' + (body.rotationDays || '-') + '</span>' +
                    '</div>' +
                    '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:2px;">' +
                    '☀️ <strong>공전 주기 (1년):</strong> <span style="color:#ffd18a;font-weight:700;">' + (body.orbitDays ? body.orbitDays + '일' : '-') + '</span>' +
                    '</div>' +
                    '<div style="font-size:12px;color:var(--text-muted);">' +
                    '⚖️ 표면 중력: 지구의 ' + (body.gravityRatio || 1) + '배' +
                    '</div>' +
                    '</div>';
                grid.appendChild(card);
            });
        }

        // ========== MODAL POPUP (Large HD Photo & CSAT Key Points) ==========
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

            var photo = document.getElementById('modalPlanetPhoto');
            if (photo) {
                var fallbackTex = (typeof window.createPlanetTexture === 'function') ? window.createPlanetTexture(key) : '';
                var imgUrl = body.photoUrl || fallbackTex;
                photo.style.backgroundImage = "url('" + imgUrl + "')";
            }

            var catBadge = document.getElementById('modalPlanetCategory');
            if (catBadge) catBadge.textContent = body.category || body.type;

            var densityBox = document.getElementById('modalPlanetDensity');
            if (densityBox) densityBox.textContent = '평균 밀도: ' + (body.density || '-');

            document.getElementById('modalPlanetName').textContent = body.name;
            document.getElementById('modalPlanetSub').textContent = body.enName + ' | ' + body.type;

            var satPointsBox = document.getElementById('modalSatExamPoints');
            if (satPointsBox) {
                var points = body.satExamKeyPoints || [body.desc];
                satPointsBox.innerHTML = points.map(function (pt) { return '<li>' + pt + '</li>'; }).join('');
            }

            var propGrid = document.getElementById('modalPropGrid');
            if (propGrid) {
                propGrid.innerHTML =
                    '<div style="background:rgba(255,255,255,0.04);padding:10px 14px;border-radius:8px;border:1px solid var(--border-color);">' +
                    '<div style="font-size:11px;color:var(--text-muted);">표면 온도</div>' +
                    '<div style="font-size:14px;font-weight:800;color:#fff;">' + (body.tempC || '-') + '</div></div>' +
                    '<div style="background:rgba(255,255,255,0.04);padding:10px 14px;border-radius:8px;border:1px solid var(--border-color);">' +
                    '<div style="font-size:11px;color:var(--text-muted);">자전 주기 (1일)</div>' +
                    '<div style="font-size:14px;font-weight:800;color:#38bdf8;">' + (body.rotationDays || '-') + '</div></div>' +
                    '<div style="background:rgba(255,255,255,0.04);padding:10px 14px;border-radius:8px;border:1px solid var(--border-color);">' +
                    '<div style="font-size:11px;color:var(--text-muted);">공전 주기 (1년)</div>' +
                    '<div style="font-size:14px;font-weight:800;color:#ffd18a;">' + (body.orbitDays ? body.orbitDays + '일' : '-') + '</div></div>' +
                    '<div style="background:rgba(255,255,255,0.04);padding:10px 14px;border-radius:8px;border:1px solid var(--border-color);">' +
                    '<div style="font-size:11px;color:var(--text-muted);">위성 수</div>' +
                    '<div style="font-size:14px;font-weight:800;color:#fff;">' + (body.moons !== undefined ? body.moons + '개' : '-') + '</div></div>';
            }

            document.getElementById('modalDesc').textContent = body.desc;

            var missionsBox = document.getElementById('modalMissions');
            if (missionsBox) {
                missionsBox.innerHTML = (body.missions || ['국제 우주 관측선']).map(function (m) {
                    return '<span style="background:rgba(56,189,248,0.15);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);padding:4px 12px;border-radius:6px;font-size:12px;font-weight:700;">🚀 ' + m + '</span>';
                }).join('');
            }

            if (modalOverlay) modalOverlay.classList.add('active');
        }

        function closeModal() {
            if (modalOverlay) modalOverlay.classList.remove('active');
        }

        // ========== QUIZ SYSTEM ==========
        function initSpaceQuiz() {
            var nextBtn = document.getElementById('nextQuizBtn');
            if (nextBtn) nextBtn.addEventListener('click', loadNewQuizQuestion);
        }

        function loadNewQuizQuestion() {
            if (state.quiz.autoTimer) { clearTimeout(state.quiz.autoTimer); state.quiz.autoTimer = null; }
            state.quiz.answered = false;

            var quizPool = [
                { cat: "지구형 vs 목성형", q: "지구형 행성과 비교할 때 목성형 행성의 일반적인 물리적 특징으로 옳은 것은?", ans: "질량과 반지름이 크고 평균 밀도가 작다.", opts: ["질량과 반지름이 크고 평균 밀도가 작다.", "평균 밀도가 크고 자전 속도가 매우 늙다.", "위성의 수가 거의 없거나 적다.", "단단한 암석 표면을 가지고 있다."], exp: "목성형 행성은 수소와 헬륨 등 가벼운 기체 위주로 구성되어 있어 질량과 반지름은 크지만 평균 밀도는 매우 작습니다." },
                { cat: "내행성 관측", q: "수성과 금성 같은 내행성을 지상에서 관측할 수 있는 조건으로 옳은 것은?", ans: "해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘", opts: ["해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘", "한밤중에 남쪽 하늘", "한밤중에 북쪽 하늘", "하루 중 아무 때나 항상 관측 가능"], exp: "내행성은 지구 궤도 안쪽을 공전하므로 최대 이각 범위 내에서만 관측 가능하여 한밤중에는 볼 수 없고 해질녘 서쪽이나 새벽 동쪽 하늘에서만 관측됩니다." },
                { cat: "역자전 행성", q: "자전 방향이 지구와 반대(시계 방향 / 동->서)이며 자전 주기가 공전 주기보다 긴 행성은?", ans: "금성 (Venus)", opts: ["수성 (Mercury)", "금성 (Venus)", "화성 (Mars)", "목성 (Jupiter)"], exp: "금성은 시계 방향(동->서)으로 역자전하며, 자전 주기(243일)가 공전 주기(224.7일)보다 길어 하루가 1년보다 깁니다." },
                { cat: "밀도 특징", q: "평균 밀도가 0.69 g/cm³로 태양계 행성 중 유일하게 물(1.0 g/cm³)보다 밀도가 작아 물에 뜨는 행성은?", ans: "토성 (Saturn)", opts: ["목성 (Jupiter)", "토성 (Saturn)", "천왕성 (Uranus)", "해왕성 (Neptune)"], exp: "토성은 얼음과 가스로 이루어져 평균 밀도가 0.69g/cm³에 불과하여 만약 토성을 담을 거대한 바다가 있다면 물 위에 떠오릅니다." },
                { cat: "자전축 기울기", q: "자전축 기울기가 약 98도로 공전 궤도면에 거의 누운 상태로 공전하는 행성은?", ans: "천왕성 (Uranus)", opts: ["화성 (Mars)", "목성 (Jupiter)", "천왕성 (Uranus)", "해왕성 (Neptune)"], exp: "천왕성은 자전축이 98도 누워 있어서 남극이나 북극이 태양을 직등으로 향한 채 누워서 공전합니다." },
                { cat: "외행성 관측", q: "외행성이 지구에서 보았을 때 한밤중에 남쪽 하늘에서 가장 밝게 관측되는 위치는?", ans: "충 (Opposition)", opts: ["합 (Conjunction)", "충 (Opposition)", "동방 최대 이각", "서방 최대 이각"], exp: "태양-지구-외행성이 일직선상에 놓이는 '충' 위치일 때 외행성은 지구와 가장 가깝고 한밤중 남쪽 하늘에서 가장 밝게 관측됩니다." },
                { cat: "왜소행성 재분류", q: "2006년 국제천문연맹(IAU)에서 명왕성이 행성에서 왜소행성으로 재분류된 결정적 사유는?", ans: "자신의 궤도 주변의 다른 천체를 청소하지 못함", opts: ["태양 주위를 공전하지 않음", "자체 중력으로 구형을 이루지 못함", "자신의 궤도 주변의 다른 천체를 청소하지 못함", "위성을 보유하지 않음"], exp: "명왕성은 태양 공전과 구형 형태는 만족하지만, 카이퍼 벨트에 위치하여 자신의 궤도 주변 천체를 청소(Clear the neighborhood)하지 못해 왜소행성으로 재분류되었습니다." },
                { cat: "달의 운동", q: "지구에서 항상 달의 앞면만 볼 수 있는 과학적 원인은?", ans: "달의 자전 주기와 공전 주기가 27.3일로 같아서", opts: ["달이 자전을 전혀 하지 않아서", "달의 자전 주기와 공전 주기가 27.3일로 같아서", "지구의 자전 속도가 달보다 2배 빨라서", "달이 지구 주변을 멈춰 서 있어서"], exp: "달은 자전 주기와 공전 주기가 27.3일로 완전히 같은 '동주기 자전'을 하므로 지구를 향하는 면이 항상 같습니다." }
            ];

            var qObj = quizPool[Math.floor(Math.random() * quizPool.length)];
            state.quiz.currentQuestion = qObj;

            var catBadge = document.getElementById('quizCategoryBadge');
            if (catBadge) catBadge.textContent = '[' + qObj.cat + ']';

            document.getElementById('quizQuestionText').textContent = '🪐 ' + qObj.q;

            var expBox = document.getElementById('quizExpBox');
            if (expBox) expBox.style.display = 'none';

            var optGrid = document.getElementById('quizOptionsGrid');
            optGrid.innerHTML = '';

            var shuffled = qObj.opts.slice().sort(function () { return Math.random() - 0.5; });
            shuffled.forEach(function (optText) {
                var btn = document.createElement('button');
                btn.className = 'quiz-opt-btn';
                btn.style.cssText = 'background:rgba(255,255,255,0.05);border:1px solid var(--border-color);padding:16px;border-radius:10px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;text-align:left;line-height:1.4;';
                btn.textContent = optText;
                btn.addEventListener('click', function () { checkQuizAnswer(optText, btn, qObj.ans, qObj.exp); });
                optGrid.appendChild(btn);
            });

            document.getElementById('quizResultMsg').textContent = '';
        }

        function checkQuizAnswer(selectedOpt, btn, correctAns, expText) {
            if (state.quiz.answered) return;
            state.quiz.answered = true;
            var isCorrect = selectedOpt === correctAns;
            var msg = document.getElementById('quizResultMsg');
            var expBox = document.getElementById('quizExpBox');
            var expContent = document.getElementById('quizExpText');

            if (isCorrect) {
                btn.style.background = '#10b981';
                btn.style.color = '#000';
                state.quiz.score += 10;
                state.quiz.streak += 1;
                msg.textContent = '🎉 정답입니다! (+10점)';
                msg.style.color = '#38bdf8';
            } else {
                btn.style.background = '#ef4444';
                state.quiz.streak = 0;
                msg.textContent = '❌ 아쉽네요! 정답은 『 ' + correctAns + ' 』 입니다.';
                msg.style.color = '#ef4444';
            }

            if (expBox && expContent) {
                expContent.textContent = expText;
                expBox.style.display = 'block';
            }

            document.getElementById('quizScore').textContent = state.quiz.score;
            document.getElementById('quizStreak').textContent = state.quiz.streak;
        }
    }
})();
