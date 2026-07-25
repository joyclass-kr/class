/**
 * 태양계 관찰 (Solar System Observation) Three.js Engine
 * True Astronomical AU Proportions & Kepler Focus Ellipse Engine
 */

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    function boot() {
        var state = {
            currentTab: 'sim',
            isPlaying: true,
            orbitSpeed: 1.0,
            showOrbits: true,
            simTimeYears: 0.0,
            selectedBody: null,

            moonState: {
                isPlaying: true,
                speed: 1.0,
                showOrbit: true,
                angle: Math.PI / 2
            },

            quiz: { score: 0, streak: 0, currentQuestion: null, answered: false, autoTimer: null }
        };

        var canvasContainer = document.getElementById('solarCanvasContainer');
        var canvas = document.getElementById('solarCanvas');
        var playPauseBtn = document.getElementById('playPauseBtn');
        var resetCamBtn = document.getElementById('resetCamBtn');
        var speedSlider = document.getElementById('speedSlider');
        var speedValBadge = document.getElementById('speedValBadge');
        var showOrbitsToggle = document.getElementById('showOrbitsToggle');
        var simTimeVal = document.getElementById('simTimeVal');
        var modalOverlay = document.getElementById('modalOverlay');

        var scene, camera, renderer, controls, clock;
        var celestialBodies = {};
        var orbitLines = [];
        var raycaster, mouse;
        var is3DReady = false;

        var moonScene, moonCamera, moonRenderer, moonControls;
        var earth3DMesh, moon3DMesh, moonPivotObj, moonOrbitLine;

        initNavTabs();
        initQuickBar();
        initAtlasGrid();
        initSpaceCalc();
        initSpaceQuiz();
        initModal();
        initSimUIControls();
        initMoonUIControls();

        try {
            if (typeof THREE !== 'undefined') {
                init3D();
                initMoon3D();
            } else {
                init2DFallback();
                initMoon2DFallback();
            }
        } catch (e) {
            console.warn('3D Init Exception:', e);
            init2DFallback();
            initMoon2DFallback();
        }

        // ========== 1. SOLAR SYSTEM 3D ENGINE ==========
        function init3D() {
            if (!canvasContainer || !canvas) return;

            var w = canvasContainer.clientWidth || 900;
            var h = canvasContainer.clientHeight || 540;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 4000);
            
            // Panoramic Camera Angle showing full solar system scale
            camera.position.set(0, 320, 480);
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
                controls.maxDistance = 1800;
                controls.minDistance = 25;
            }

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            scene.add(new THREE.AmbientLight(0x707080, 1.6));
            scene.add(new THREE.PointLight(0xfffaed, 3.0, 2000));

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
            var orbitRates = { mercury: 4.15, venus: 1.62, earth: 1.0, mars: 0.53, jupiter: 0.084, saturn: 0.034, uranus: 0.012, neptune: 0.006, pluto: 0.004 };
            var dists = { mercury: 28, venus: 48, earth: 68, mars: 100, jupiter: 210, saturn: 320, uranus: 450, neptune: 580, pluto: 680 };

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
                ctx.arc(cx, cy, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                if (state.isPlaying) {
                    angle += 0.005 * state.orbitSpeed;
                    state.simTimeYears += 0.001 * state.orbitSpeed;
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

        // ACCURATE RELATIVE BODY SIZES
        function getBodyScaleRadius(key) {
            var r = {
                sun: 16,
                mercury: 2.2,
                venus: 3.6,
                earth: 3.8,
                moon: 1.2,
                mars: 2.8,
                jupiter: 9.5,
                saturn: 8.0,
                uranus: 5.5,
                neptune: 5.2,
                pluto: 1.8
            };
            return r[key] || 3.0;
        }

        // TRUE ASTRONOMICAL AU PROPORTIONAL ORBIT DISTANCES (1 AU Earth = 65px)
        // Inner planets (Terrestrial) are compact; Outer planets (Gas Giants) expand vastly across space!
        function getBodyOrbitRadius(key) {
            var r = {
                mercury: 25.3,  // 0.39 AU
                venus: 46.8,    // 0.72 AU
                earth: 65.0,    // 1.00 AU
                mars: 98.8,     // 1.52 AU
                // Asteroid Belt Space Gap
                jupiter: 230.0, // 5.20 AU (Vast realistic space distance!)
                saturn: 360.0,  // 9.58 AU
                uranus: 520.0,  // 19.2 AU
                neptune: 680.0, // 30.0 AU
                pluto: 810.0    // 39.5 AU
            };
            return r[key] || 100;
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
            var count = 3000;
            var pos = new Float32Array(count * 3);
            for (var i = 0; i < count * 3; i += 3) {
                pos[i] = (Math.random() - 0.5) * 2400;
                pos[i + 1] = (Math.random() - 0.5) * 2400;
                pos[i + 2] = (Math.random() - 0.5) * 2400;
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
                if (b.ringMesh) scene.remove(b.ringMesh);
            });
            orbitLines.forEach(function (l) { scene.remove(l); });
            orbitLines = [];
            celestialBodies = {};

            var sunTex = loadPlanet3DTexture('sun');
            var sunR = getBodyScaleRadius('sun');
            var sunMesh = new THREE.Mesh(
                new THREE.SphereGeometry(sunR, 32, 32),
                new THREE.MeshBasicMaterial({ map: sunTex })
            );
            scene.add(sunMesh);

            var c1 = new THREE.Mesh(
                new THREE.SphereGeometry(sunR * 1.12, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.22, side: THREE.BackSide })
            );
            sunMesh.add(c1);

            celestialBodies['sun'] = { mesh: sunMesh, data: window.SOLAR_SYSTEM_DATA.sun };

            var planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

            planetKeys.forEach(function (key) {
                var data = window.SOLAR_SYSTEM_DATA[key];
                if (!data) return;

                var orbitR = getBodyOrbitRadius(key);
                var bodyR = getBodyScaleRadius(key);
                var ecc = data.eccentricity || 0.02;
                var incRad = (data.inclinationDeg || 0.0) * (Math.PI / 180);

                var pivot = new THREE.Object3D();
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

                // Planet Axial Tilts
                if (key === 'earth') planetMesh.rotation.z = 23.44 * (Math.PI / 180);
                if (key === 'mars') planetMesh.rotation.z = 25.19 * (Math.PI / 180);
                if (key === 'saturn') planetMesh.rotation.z = 26.73 * (Math.PI / 180);
                if (key === 'uranus') planetMesh.rotation.z = 97.77 * (Math.PI / 180);

                var semiMajor = orbitR;
                var semiMinor = orbitR * Math.sqrt(1 - ecc * ecc);
                var focusOffset = semiMajor * ecc; // Kepler 1st Law Focus Correction!

                planetMesh.position.x = semiMajor - focusOffset;
                planetMesh.userData = { key: key, data: data, semiMajor: semiMajor, semiMinor: semiMinor, focusOffset: focusOffset };
                pivot.add(planetMesh);

                // Saturn Ring: Attached without Y-wobble
                var saturnRingMesh = null;
                if (key === 'saturn') {
                    var ringTex = loadPlanet3DTexture('saturnRing');
                    var ringGeo = new THREE.RingGeometry(bodyR * 1.3, bodyR * 2.3, 64);
                    ringGeo.rotateX(Math.PI / 2);
                    saturnRingMesh = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
                    saturnRingMesh.rotation.z = 26.73 * (Math.PI / 180);
                    saturnRingMesh.position.x = semiMajor - focusOffset;
                    pivot.add(saturnRingMesh);
                }

                if (key === 'earth') {
                    var atmosMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(bodyR * 1.12, 32, 32),
                        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, side: THREE.BackSide })
                    );
                    planetMesh.add(atmosMesh);

                    // MOON ORBIT TILT: Not perpendicular to Earth equator! Tilted by ~28.58° (Earth tilt 23.44° + Lunar inclination 5.14°)
                    var moonPivot = new THREE.Object3D();
                    moonPivot.rotation.z = 28.58 * (Math.PI / 180); // Tilted relative to Earth spin axis!
                    planetMesh.add(moonPivot);
                    var moonR = getBodyScaleRadius('moon');
                    var moonMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(moonR, 16, 16),
                        new THREE.MeshStandardMaterial({ map: loadPlanet3DTexture('moon'), roughness: 0.85 })
                    );
                    moonMesh.position.x = 12.0;
                    moonMesh.userData = { key: 'moon', data: window.SOLAR_SYSTEM_DATA.moon };
                    moonPivot.add(moonMesh);

                    var mPts = [];
                    for (var m = 0; m <= 64; m++) {
                        var mt = (m / 64) * Math.PI * 2;
                        mPts.push(new THREE.Vector3(Math.cos(mt) * 12.0, 0, Math.sin(mt) * 12.0));
                    }
                    var mGeo = new THREE.BufferGeometry().setFromPoints(mPts);
                    var mLine = new THREE.LineLoop(mGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 }));
                    moonPivot.add(mLine);

                    celestialBodies['moon'] = { mesh: moonMesh, pivot: moonPivot, orbitRadius: 12.0, data: window.SOLAR_SYSTEM_DATA.moon };
                }

                celestialBodies[key] = { mesh: planetMesh, ringMesh: saturnRingMesh, pivot: pivot, orbitRadius: orbitR, semiMajor: semiMajor, semiMinor: semiMinor, focusOffset: focusOffset, data: data };

                // Clean Kepler Orbit Line with Sun Focus Alignment
                if (state.showOrbits) {
                    var pts = [];
                    for (var i = 0; i <= 128; i++) {
                        var theta = (i / 128) * Math.PI * 2;
                        pts.push(new THREE.Vector3(Math.cos(theta) * semiMajor - focusOffset, 0, Math.sin(theta) * semiMinor));
                    }
                    var oGeo = new THREE.BufferGeometry().setFromPoints(pts);
                    var line = new THREE.LineLoop(oGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 }));
                    line.rotation.z = incRad;
                    scene.add(line);
                    orbitLines.push(line);
                }
            });
        }

        // Kepler Orbit Speed Rates (Earth 1 Year = 1.0)
        var ORBIT_RATES = {
            mercury: 4.15,
            venus: 1.62,
            earth: 1.00,
            mars: 0.53,
            jupiter: 0.084,
            saturn: 0.034,
            uranus: 0.012,
            neptune: 0.006,
            pluto: 0.004
        };

        // Smooth Self-Rotation Rates
        var SELF_ROTATION_RATES = {
            mercury: 0.05,
            venus: -0.03,
            earth: 8.0,
            mars: 7.8,
            jupiter: 18.0,
            saturn: 16.5,
            uranus: -11.0,
            neptune: 12.0,
            pluto: 1.2
        };

        function animate3D() {
            requestAnimationFrame(animate3D);
            var delta = clock ? clock.getDelta() : 0.016;

            if (state.isPlaying) {
                var timeDelta = delta * 0.05 * state.orbitSpeed;
                state.simTimeYears += timeDelta;
                if (simTimeVal) simTimeVal.textContent = state.simTimeYears.toFixed(1) + ' yrs';

                if (celestialBodies['sun'] && celestialBodies['sun'].mesh) {
                    celestialBodies['sun'].mesh.rotation.y += 0.003;
                }

                Object.keys(celestialBodies).forEach(function (key) {
                    var b = celestialBodies[key];
                    if (key === 'sun') return;

                    if (key === 'moon') {
                        // Moon Orbits Earth 13.37 times per Earth year
                        var earthBody = celestialBodies['earth'];
                        if (earthBody && earthBody.mesh && b.pivot) {
                            var earthAngle = earthBody.orbitAngle || 0;
                            var moonAngle = earthAngle * 13.37;
                            b.pivot.rotation.y = moonAngle;
                            if (b.mesh) b.mesh.rotation.y = moonAngle;
                        }
                    } else if (b.pivot && b.mesh) {
                        var rate = ORBIT_RATES[key] || 0.1;
                        if (b.orbitAngle === undefined) b.orbitAngle = Math.random() * Math.PI * 2;

                        var dOrbit = timeDelta * (Math.PI * 2) * rate;
                        b.orbitAngle += dOrbit;

                        var a = b.semiMajor || b.orbitRadius || 100;
                        var c = b.semiMinor || b.orbitRadius || 100;
                        var fo = b.focusOffset || 0;

                        var px = Math.cos(b.orbitAngle) * a - fo;
                        var pz = Math.sin(b.orbitAngle) * c;

                        b.mesh.position.x = px;
                        b.mesh.position.z = pz;

                        if (b.ringMesh) {
                            b.ringMesh.position.x = px;
                            b.ringMesh.position.z = pz;
                        }

                        var rotSpeed = SELF_ROTATION_RATES[key] || 1.0;
                        b.mesh.rotation.y += timeDelta * (Math.PI * 2) * rotSpeed;
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

        // ========== 2. EARTH-MOON OBSERVATORY (3D Dedicated Engine) ==========
        function initMoon3D() {
            var container = document.getElementById('moonCanvasContainer');
            var moonCanvas = document.getElementById('moonCanvas');
            if (!container || !moonCanvas) return;

            var w = container.clientWidth || 900;
            var h = container.clientHeight || 520;

            moonScene = new THREE.Scene();
            moonCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
            moonCamera.position.set(0, 40, 75);
            moonCamera.lookAt(0, 0, 0);

            moonRenderer = new THREE.WebGLRenderer({ canvas: moonCanvas, antialias: true });
            moonRenderer.setSize(w, h);
            moonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            moonRenderer.setClearColor(0x030712);

            if (typeof THREE.OrbitControls !== 'undefined') {
                moonControls = new THREE.OrbitControls(moonCamera, moonRenderer.domElement);
                moonControls.enableDamping = true;
                moonControls.dampingFactor = 0.05;
                moonControls.maxDistance = 180;
                moonControls.minDistance = 25;
            }

            var sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
            sunLight.position.set(500, 0, 0);
            moonScene.add(sunLight);
            moonScene.add(new THREE.AmbientLight(0x222233, 0.4));

            var earthTex = loadPlanet3DTexture('earth');
            var earthGeo = new THREE.SphereGeometry(10, 32, 32);
            var earthMat = new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.4 });
            earth3DMesh = new THREE.Mesh(earthGeo, earthMat);
            earth3DMesh.rotation.z = 23.44 * (Math.PI / 180);
            moonScene.add(earth3DMesh);

            var atmosMesh = new THREE.Mesh(
                new THREE.SphereGeometry(11.2, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.2, side: THREE.BackSide })
            );
            earth3DMesh.add(atmosMesh);

            moonPivotObj = new THREE.Object3D();
            moonPivotObj.rotation.z = 5.14 * (Math.PI / 180);
            moonScene.add(moonPivotObj);

            var moonTex = loadPlanet3DTexture('moon');
            var moonGeo = new THREE.SphereGeometry(2.8, 24, 24);
            var moonMat = new THREE.MeshStandardMaterial({ map: moonTex, roughness: 0.8 });
            moon3DMesh = new THREE.Mesh(moonGeo, moonMat);
            moon3DMesh.position.x = 35;
            moonPivotObj.add(moon3DMesh);

            var pts = [];
            for (var i = 0; i <= 128; i++) {
                var theta = (i / 128) * Math.PI * 2;
                pts.push(new THREE.Vector3(Math.cos(theta) * 35, 0, Math.sin(theta) * 35));
            }
            var oGeo = new THREE.BufferGeometry().setFromPoints(pts);
            moonOrbitLine = new THREE.LineLoop(oGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 }));
            moonOrbitLine.rotation.z = 5.14 * (Math.PI / 180);
            moonScene.add(moonOrbitLine);

            isMoon3DReady = true;
            animateMoon3D();
        }

        function initMoon2DFallback() {
            var container = document.getElementById('moonCanvasContainer');
            var moonCanvas = document.getElementById('moonCanvas');
            if (!container || !moonCanvas) return;
            var ctx = moonCanvas.getContext('2d');
            if (!ctx) return;

            function renderMoon2D() {
                var w = container.clientWidth || 900;
                var h = container.clientHeight || 520;
                moonCanvas.width = w;
                moonCanvas.height = h;

                ctx.fillStyle = '#030712';
                ctx.fillRect(0, 0, w, h);

                var cx = w / 2;
                var cy = h / 2;

                ctx.fillStyle = '#3b82f6';
                ctx.beginPath();
                ctx.arc(cx, cy, 30, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
                ctx.beginPath();
                ctx.arc(cx, cy, 140, 0, Math.PI * 2);
                ctx.stroke();

                if (state.moonState.isPlaying) {
                    state.moonState.angle += 0.008 * state.moonState.speed;
                }

                var mx = cx + Math.cos(state.moonState.angle) * 140;
                var my = cy + Math.sin(state.moonState.angle) * 140;

                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(mx, my, 12, 0, Math.PI * 2);
                ctx.fill();

                updateMoonPhaseDisplay(state.moonState.angle);
                requestAnimationFrame(renderMoon2D);
            }

            renderMoon2D();
        }

        function animateMoon3D() {
            requestAnimationFrame(animateMoon3D);

            if (state.moonState.isPlaying) {
                state.moonState.angle += 0.008 * state.moonState.speed;

                if (earth3DMesh) earth3DMesh.rotation.y += 0.01;
                if (moonPivotObj) moonPivotObj.rotation.y = state.moonState.angle;
                if (moon3DMesh) moon3DMesh.rotation.y = state.moonState.angle;

                updateMoonPhaseDisplay(state.moonState.angle);
            }

            if (moonControls) moonControls.update();
            if (moonRenderer && moonScene && moonCamera) {
                try { moonRenderer.render(moonScene, moonCamera); } catch (e) { }
            }
        }

        function updateMoonPhaseDisplay(angle) {
            var normAngle = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            var phaseName = document.getElementById('moonPhaseName');
            var timeInfo = document.getElementById('moonObsTimeInfo');
            var progressVal = document.getElementById('moonProgressVal');

            if (!phaseName || !timeInfo || !progressVal) return;

            if (normAngle >= 0 && normAngle < 0.35 || normAngle >= Math.PI * 2 - 0.35) {
                phaseName.textContent = '🌑 삭 (New Moon)';
                timeInfo.textContent = '남중 시각: 정오 (12:00) | 관측 불가';
                progressVal.textContent = '음력 1일 경 (삭)';
            } else if (normAngle >= 0.35 && normAngle < 1.22) {
                phaseName.textContent = '🌒 초승달 (Waxing Crescent)';
                timeInfo.textContent = '남중 시각: 오후 3시 (15:00) | 초저녁 서쪽 하늘';
                progressVal.textContent = '음력 3~4일 경 (초승)';
            } else if (normAngle >= 1.22 && normAngle < 1.92) {
                phaseName.textContent = '🌓 상현달 (First Quarter)';
                timeInfo.textContent = '남중 시각: 오후 6시 (18:00) | 초저녁 서쪽 하늘 관측';
                progressVal.textContent = '음력 7~8일 경 (상현)';
            } else if (normAngle >= 1.92 && normAngle < 2.79) {
                phaseName.textContent = '🌔 차오르는 달 (Waxing Gibbous)';
                timeInfo.textContent = '남중 시각: 밤 9시 (21:00) | 저녁 동쪽~남쪽 하늘';
                progressVal.textContent = '음력 11~12일 경';
            } else if (normAngle >= 2.79 && normAngle < 3.49) {
                phaseName.textContent = '🌕 망 / 보름달 (Full Moon)';
                timeInfo.textContent = '남중 시각: 한밤중 (24:00) | 밤새도록 관측';
                progressVal.textContent = '음력 15일 경 (망/보름)';
            } else if (normAngle >= 3.49 && normAngle < 4.36) {
                phaseName.textContent = '🌖 기울어가는 달 (Waning Gibbous)';
                timeInfo.textContent = '남중 시각: 새벽 3시 (03:00) | 늦은 밤~새벽 관측';
                progressVal.textContent = '음력 18~19일 경';
            } else if (normAngle >= 4.36 && normAngle < 5.06) {
                phaseName.textContent = '🌗 하현달 (Third Quarter)';
                timeInfo.textContent = '남중 시각: 새벽 6시 (06:00) | 새벽 동쪽 하늘 관측';
                progressVal.textContent = '음력 22~23일 경 (하현)';
            } else {
                phaseName.textContent = '🌘 그믐달 (Waning Crescent)';
                timeInfo.textContent = '남중 시각: 오전 9시 (09:00) | 새벽 동쪽 하늘';
                progressVal.textContent = '음력 26~27일 경 (그믐)';
            }
        }

        function onMoonWindowResize() {
            var container = document.getElementById('moonCanvasContainer');
            if (!container || !moonCamera || !moonRenderer) return;
            var w = container.clientWidth || 900;
            var h = container.clientHeight || 520;
            moonCamera.aspect = w / h;
            moonCamera.updateProjectionMatrix();
            moonRenderer.setSize(w, h);
        }

        function initMoonUIControls() {
            var moonPlayBtn = document.getElementById('moonPlayBtn');
            var resetMoonCamBtn = document.getElementById('resetMoonCamBtn');
            var moonSpeedSlider = document.getElementById('moonSpeedSlider');
            var showMoonOrbitToggle = document.getElementById('showMoonOrbitToggle');

            if (moonPlayBtn) {
                moonPlayBtn.addEventListener('click', function () {
                    state.moonState.isPlaying = !state.moonState.isPlaying;
                    moonPlayBtn.textContent = state.moonState.isPlaying ? '⏸ 일시정지' : '▶ 재생';
                });
            }
            if (resetMoonCamBtn) {
                resetMoonCamBtn.addEventListener('click', function () {
                    if (moonCamera && moonControls) {
                        moonCamera.position.set(0, 40, 75);
                        moonControls.target.set(0, 0, 0);
                        moonControls.update();
                    }
                });
            }
            if (moonSpeedSlider) {
                moonSpeedSlider.addEventListener('input', function (e) {
                    state.moonState.speed = parseFloat(e.target.value);
                });
            }
            if (showMoonOrbitToggle) {
                showMoonOrbitToggle.addEventListener('change', function (e) {
                    state.moonState.showOrbit = e.target.checked;
                    if (moonOrbitLine) moonOrbitLine.visible = state.moonState.showOrbit;
                });
            }
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
                        camera.position.set(0, 320, 480);
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
                    if (target === 'moon' && moonRenderer) onMoonWindowResize();
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

        // ========== PLANET ATLAS GRID (Tab 3) ==========
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

        // ========== ORBIT & ROTATION PERIOD COMPARISON (Tab 4) ==========
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

        // ========== MODAL POPUP ==========
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

        // ========== QUIZ SYSTEM (Tab 5) ==========
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
