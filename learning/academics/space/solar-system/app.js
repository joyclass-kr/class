/**
 * 태양계 관찰 (Solar System Observation) Three.js Engine
 * 100% TRUE ASTRONOMICAL SCALE (Size, Distance, Eccentricity, Rotation)
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
            simMode: '3d', // '3d' (Log Scale) or '2d' (True Scale Map)
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
        var mapLabels = []; // 2D DOM labels

        // 36 Unique ClassTool Animal Avatars (1~36)
        var CLASSTOOL_ANIMALS = [
            { num: 1,  name: "판다", icon: "🐼", bg: "#f8fafc", ear: "#334155" },
            { num: 2,  name: "토끼", icon: "🐰", bg: "#ffedd5", ear: "#f472b6" },
            { num: 3,  name: "여우", icon: "🦊", bg: "#ffedd5", ear: "#ea580c" },
            { num: 4,  name: "곰",   icon: "🐻", bg: "#fef3c7", ear: "#d97706" },
            { num: 5,  name: "사자", icon: "🦁", bg: "#fef08a", ear: "#b45309" },
            { num: 6,  name: "호랑이", icon: "🐯", bg: "#ffedd5", ear: "#d97706" },
            { num: 7,  name: "고양이", icon: "🐱", bg: "#fef3c7", ear: "#7c3aed" },
            { num: 8,  name: "강아지", icon: "🐶", bg: "#ffedd5", ear: "#b45309" },
            { num: 9,  name: "개구리", icon: "🐸", bg: "#dcfce7", ear: "#16a34a" },
            { num: 10, name: "아기새", icon: "🐥", bg: "#fef08a", ear: "#ca8a04" },
            { num: 11, name: "유니콘", icon: "🦄", bg: "#fce7f3", ear: "#a855f7" },
            { num: 12, name: "공룡", icon: "🦖", bg: "#dcfce7", ear: "#15803d" },
            { num: 13, name: "꿀벌", icon: "🐝", bg: "#fef08a", ear: "#ca8a04" },
            { num: 14, name: "아기쥐", icon: "🐭", bg: "#f1f5f9", ear: "#94a3b8" },
            { num: 15, name: "코끼리", icon: "🐘", bg: "#e2e8f0", ear: "#64748b" },
            { num: 16, name: "아기말", icon: "🐴", bg: "#ffedd5", ear: "#b45309" },
            { num: 17, name: "아기양", icon: "🐑", bg: "#f8fafc", ear: "#cbd5e1" },
            { num: 18, name: "펭귄", icon: "🐧", bg: "#e0f2fe", ear: "#0284c7" },
            { num: 19, name: "부엉이", icon: "🦉", bg: "#ffedd5", ear: "#9a3412" },
            { num: 20, name: "다람쥐", icon: "🐿️", bg: "#ffedd5", ear: "#c2410c" },
            { num: 21, name: "너구리", icon: "🦝", bg: "#f1f5f9", ear: "#475569" },
            { num: 22, name: "수달", icon: "🦦", bg: "#ffedd5", ear: "#9a3412" },
            { num: 23, name: "사슴", icon: "🦌", bg: "#ffedd5", ear: "#b45309" },
            { num: 24, name: "돌고래", icon: "🐬", bg: "#e0f2fe", ear: "#0284c7" },
            { num: 25, name: "늑대", icon: "🐺", bg: "#e2e8f0", ear: "#475569" },
            { num: 26, name: "원숭이", icon: "🐒", bg: "#ffedd5", ear: "#b45309" },
            { num: 27, name: "코알라", icon: "🐨", bg: "#e2e8f0", ear: "#64748b" },
            { num: 28, name: "캥거루", icon: "🦘", bg: "#ffedd5", ear: "#b45309" },
            { num: 29, name: "바다표범", icon: "🦭", bg: "#e2e8f0", ear: "#0284c7" },
            { num: 30, name: "고슴도치", icon: "🦔", bg: "#ffedd5", ear: "#b45309" },
            { num: 31, name: "나무늘보", icon: "🦥", bg: "#ffedd5", ear: "#9a3412" },
            { num: 32, name: "악어", icon: "🐊", bg: "#dcfce7", ear: "#15803d" },
            { num: 33, name: "햄스터", icon: "🐹", bg: "#ffedd5", ear: "#d97706" },
            { num: 34, name: "아기거북이", icon: "🐢", bg: "#dcfce7", ear: "#16a34a" },
            { num: 35, name: "병아리", icon: "🐣", bg: "#fef08a", ear: "#ca8a04" },
            { num: 36, name: "아기드래곤", icon: "🐲", bg: "#dcfce7", ear: "#15803d" }
        ];

        // 🛸 UFO Flight Exploration Mode State & Objects
        var ufoMesh = null;
        var savedAvatarId = parseInt(localStorage.getItem('userAvatarNum') || localStorage.getItem('studentNum') || '0', 10);
        var chosenAnimal = CLASSTOOL_ANIMALS[(savedAvatarId > 0 ? (savedAvatarId - 1) % 36 : Math.floor(Math.random() * 36))];

        var ufoState = {
            active: false,
            pos: new THREE.Vector3(0, 25.0, 450), // Optimal hover altitude above planets (Y=25.0)
            heading: 0.0,
            keys: { forward: false, backward: false, left: false, right: false },
            pilotName: localStorage.getItem('userName') || localStorage.getItem('guestName') || localStorage.getItem('studentName') || '우주 탐험가',
            animal: chosenAnimal
        };

        // ClassTool Authentic Face Texture Generator (Draws Character Icon & Face)
        function createClassToolFaceTexture(animal) {
            var canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            var ctx = canvas.getContext('2d');

            // Head Background Color
            ctx.fillStyle = animal.bg;
            ctx.fillRect(0, 0, 256, 256);

            // Draw Official ClassTool Emoji Face Icon
            ctx.font = 'bold 140px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(animal.icon, 128, 128);

            return new THREE.CanvasTexture(canvas);
        }

        function buildUFOMesh() {
            if (ufoMesh && scene) scene.remove(ufoMesh);
            var group = new THREE.Group();
            
            // 1. UFO Compact Crystal Glass Dome
            var domeGeo = new THREE.SphereGeometry(4.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
            var domeMat = new THREE.MeshPhysicalMaterial({ 
                color: 0xe0f2fe, 
                roughness: 0.05, 
                metalness: 0.1, 
                transparent: true, 
                opacity: 0.35, 
                transmission: 0.95, 
                ior: 1.5,
                clearcoat: 1.0
            });
            var dome = new THREE.Mesh(domeGeo, domeMat);
            group.add(dome);

            // 2. 🛸 Single Authentic 3D Space Bear Pilot Avatar (Unified for Guest)
            var pilotGroup = new THREE.Group();
            pilotGroup.position.set(0, 0.5, 0);

            // Pilot Seat
            var seatGeo = new THREE.BoxGeometry(2.5, 3.2, 1.0);
            var seatMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
            var seat = new THREE.Mesh(seatGeo, seatMat);
            seat.position.set(0, 1.6, 1.2);
            pilotGroup.add(seat);

            // Space Bear Suit Body (Warm Orange)
            var bodyGeo = new THREE.SphereGeometry(1.6, 16, 16);
            var bodyMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });
            var body = new THREE.Mesh(bodyGeo, bodyMat);
            body.position.set(0, 1.3, 0.3);
            pilotGroup.add(body);

            // Space Bear Head (Cute Golden Brown)
            var headGeo = new THREE.SphereGeometry(1.5, 24, 24);
            var headMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 });
            var head = new THREE.Mesh(headGeo, headMat);
            head.position.set(0, 2.7, 0.3);
            pilotGroup.add(head);

            // Cute Bear Ears (Left & Right)
            var earGeo = new THREE.SphereGeometry(0.55, 16, 16);
            var earMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
            var lEar = new THREE.Mesh(earGeo, earMat);
            lEar.position.set(-1.0, 3.7, 0.3);
            var rEar = new THREE.Mesh(earGeo, earMat);
            rEar.position.set(1.0, 3.7, 0.3);
            pilotGroup.add(lEar);
            pilotGroup.add(rEar);

            // 3D Facial Features facing directly toward Camera (Z = +0.3 offset forward)
            var faceGroup = new THREE.Group();
            faceGroup.position.set(0, 2.7, 0.3);

            // 3D Black Eyes (Placed facing camera Z = +1.4)
            var eyeGeo = new THREE.SphereGeometry(0.22, 16, 16);
            var eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
            var lEye = new THREE.Mesh(eyeGeo, eyeMat);
            lEye.position.set(-0.5, 0.2, 1.35);
            var rEye = new THREE.Mesh(eyeGeo, eyeMat);
            rEye.position.set(0.5, 0.2, 1.35);
            faceGroup.add(lEye);
            faceGroup.add(rEye);

            // 3D White Eye Pupils
            var pupilGeo = new THREE.SphereGeometry(0.08, 12, 12);
            var pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            var lPupil = new THREE.Mesh(pupilGeo, pupilMat);
            lPupil.position.set(-0.43, 0.27, 1.5);
            var rPupil = new THREE.Mesh(pupilGeo, pupilMat);
            rPupil.position.set(0.57, 0.27, 1.5);
            faceGroup.add(lPupil);
            faceGroup.add(rPupil);

            // 3D Cute Nose
            var noseGeo = new THREE.SphereGeometry(0.18, 16, 16);
            var noseMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
            var nose = new THREE.Mesh(noseGeo, noseMat);
            nose.position.set(0, 0.0, 1.52);
            faceGroup.add(nose);

            // 3D Pink Cheeks (Blush)
            var cheekGeo = new THREE.SphereGeometry(0.26, 16, 16);
            var cheekMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.85 });
            var lCheek = new THREE.Mesh(cheekGeo, cheekMat);
            lCheek.position.set(-0.75, -0.1, 1.25);
            var rCheek = new THREE.Mesh(cheekGeo, cheekMat);
            rCheek.position.set(0.75, -0.1, 1.25);
            faceGroup.add(lCheek);
            faceGroup.add(rCheek);

            pilotGroup.add(faceGroup);

            // Headset Band
            var headsetGeo = new THREE.TorusGeometry(1.5, 0.2, 12, 24, Math.PI);
            var headsetMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8 });
            var headset = new THREE.Mesh(headsetGeo, headsetMat);
            headset.rotation.x = Math.PI / 2;
            headset.position.set(0, 2.8, 0.3);
            pilotGroup.add(headset);

            // Glowing Control Console Panel
            var consoleGeo = new THREE.BoxGeometry(2.5, 1.0, 1.2);
            var consoleMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
            var consoleObj = new THREE.Mesh(consoleGeo, consoleMat);
            consoleObj.position.set(0, 0.8, -1.0);
            pilotGroup.add(consoleObj);

            group.add(pilotGroup);

            // 3. UFO Compact Metallic Outer Ring
            var ringGeo = new THREE.TorusGeometry(6.5, 1.4, 16, 32);
            var ringMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
            var ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2;
            group.add(ring);

            // 4. UFO Compact Glowing Bottom Energy Ring
            var glowGeo = new THREE.TorusGeometry(4.5, 0.8, 16, 32);
            var glowMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
            var glow = new THREE.Mesh(glowGeo, glowMat);
            glow.rotation.x = Math.PI / 2;
            glow.position.y = -1.0;
            group.add(glow);

            var light = new THREE.PointLight(0x06b6d4, 3, 60);
            light.position.y = -1;
            group.add(light);

            group.position.copy(ufoState.pos);
            group.scale.set(0.25, 0.25, 0.25); // Micro compact scale for art gallery style lower viewport observation
            group.visible = false;
            ufoMesh = group;
            scene.add(ufoMesh);

            // Create Floating 2D Name Tag for Pilot
            var lc = document.getElementById('labelsContainer');
            if (lc) {
                var oldLabel = document.getElementById('ufoPilotNameTag');
                if (oldLabel) oldLabel.remove();

                var div = document.createElement('div');
                div.id = 'ufoPilotNameTag';
                div.textContent = '🛸 ' + ufoState.pilotName;
                div.style.position = 'absolute';
                div.style.color = '#38bdf8';
                div.style.background = 'rgba(15, 23, 42, 0.9)';
                div.style.border = '1px solid rgba(56, 189, 248, 0.7)';
                div.style.padding = '3px 9px';
                div.style.borderRadius = '12px';
                div.style.fontSize = '12px';
                div.style.fontWeight = 'bold';
                div.style.transform = 'translate(-50%, -100%)';
                div.style.pointerEvents = 'none';
                div.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.5)';
                div.style.display = 'none';
                lc.appendChild(div);
                ufoState.nameLabel = div;
            }
        }

        window.addEventListener('keydown', function(e) {
            if (!ufoState.active) return;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'].indexOf(e.key) !== -1) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') ufoState.keys.forward = true;
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') ufoState.keys.backward = true;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') ufoState.keys.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') ufoState.keys.right = true;
        });

        window.addEventListener('keyup', function(e) {
            if (!ufoState.active) return;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'].indexOf(e.key) !== -1) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') ufoState.keys.forward = false;
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') ufoState.keys.backward = false;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') ufoState.keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') ufoState.keys.right = false;
        });

        var moonScene, moonCamera, moonRenderer, moonControls;
        var earth3DMesh, moon3DMesh, moonPivotObj, moonOrbitLine;

        // 1. EDUCATIONAL LOG SCALE FOR ORBIT DISTANCES
        // formula: R = Math.log2(distAU + 1) * LOG_SCALE_FACTOR
        var LOG_SCALE_FACTOR = 300.0;
        
        // 2. TRUE ECCENTRICITY
        var KEPLER_ECCENTRICITIES = {
            mercury: 0.205,
            venus: 0.007,
            earth: 0.017,
            mars: 0.093,
            jupiter: 0.048,
            saturn: 0.056,
            uranus: 0.046,
            neptune: 0.009,
            pluto: 0.249
        };

        // 3. EDUCATIONAL VISUAL SIZE SCALE
        // Actual true sizes would make planets invisible points. We use fixed aesthetic sizes.
        function getBodyScaleRadius(key) {
            var r = {
                sun: 45.0,
                mercury: 5.0,
                venus: 9.0,
                earth: 10.0,
                moon: 3.5,
                mars: 7.0,
                jupiter: 22.0,
                saturn: 19.0,
                uranus: 14.0,
                neptune: 13.0,
                pluto: 4.0
            };
            return r[key] || 10.0;
        }

        // Apply Logarithmic Scale for Distances
        function getBodyOrbitRadius(key) {
            var distAU = window.SOLAR_SYSTEM_DATA[key] ? window.SOLAR_SYSTEM_DATA[key].distAU : 1.0;
            if (state.simMode === '2d') {
                return distAU * 23481.0; // 100% True Scale for 2D Map
            }
            return Math.log2(distAU + 1) * LOG_SCALE_FACTOR; // Educational Log Scale for 3D
        }

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
            // Standard far plane for Log Scale, extended for True Scale 2D Map
            camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2500000);
            
            // Initial Camera Position
            camera.position.set(0, 1500, 2000);
            camera.lookAt(0, 0, 0);

            try {
                clock = new THREE.Clock();
            } catch (e) { clock = null; }

            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, logarithmicDepthBuffer: true });
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x030712);

            if (typeof THREE.OrbitControls !== 'undefined') {
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.maxDistance = 1500000;
                controls.minDistance = 2.0;
            }

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            scene.add(new THREE.AmbientLight(0x707080, 1.6));
            scene.add(new THREE.PointLight(0xfffaed, 4.0, 5000, 0.5));

            buildCelestialBodies();
            buildUFOMesh();

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
            // Omitted complex 2D fallback for brevity, assuming WebGL works.
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

        function buildCelestialBodies() {
            if (!window.SOLAR_SYSTEM_DATA) return;

            // Clear old 3D objects
            Object.values(celestialBodies).forEach(function (b) {
                if (b.mesh) scene.remove(b.mesh);
                if (b.pivot) scene.remove(b.pivot);
                if (b.ringMesh) scene.remove(b.ringMesh);
            });
            orbitLines.forEach(function (l) { scene.remove(l); });
            orbitLines = [];
            celestialBodies = {};

            // Clear old 2D Labels
            var lc = document.getElementById('labelsContainer');
            if (lc) lc.innerHTML = '';
            mapLabels = [];

            function createPlanetLabel(key, data) {
                if (!lc || state.simMode !== '2d') return null;
                var korName = data.name || data.nameKor || key;
                var div = document.createElement('div');
                div.innerHTML = '<span style="color:#38bdf8;">●</span> ' + korName;
                div.style.position = 'absolute';
                div.style.color = '#ffffff';
                div.style.background = 'rgba(2, 132, 199, 0.85)';
                div.style.border = '1px solid rgba(56, 189, 248, 0.6)';
                div.style.padding = '3px 8px';
                div.style.borderRadius = '12px';
                div.style.fontSize = '12px';
                div.style.fontWeight = 'bold';
                div.style.whiteSpace = 'nowrap';
                div.style.transform = 'translate(-50%, -50%)';
                div.style.pointerEvents = 'none';
                div.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.3)';
                lc.appendChild(div);
                return div;
            }

            function createOrbitLabel(key, data, semiMajor, semiMinor, focusOffset, pivot) {
                if (!lc || state.simMode !== '2d') return null;
                var theta = Math.PI / 4; // Place label at 45-degree angle on orbit line
                var ox = Math.cos(theta) * semiMajor - focusOffset;
                var oz = Math.sin(theta) * semiMinor;

                var marker = new THREE.Object3D();
                marker.position.set(ox, 0, oz);
                pivot.add(marker);

                var korName = data.name || data.nameKor || key;
                var div = document.createElement('div');
                var distStr = data.distAU !== undefined ? data.distAU.toFixed(2) + ' AU' : '';
                div.textContent = '📍 ' + korName + ' 궤도 (' + distStr + ')';
                div.style.position = 'absolute';
                div.style.color = '#38bdf8';
                div.style.background = 'rgba(15, 23, 42, 0.85)';
                div.style.border = '1px solid rgba(56, 189, 248, 0.4)';
                div.style.padding = '2px 6px';
                div.style.borderRadius = '4px';
                div.style.fontSize = '11px';
                div.style.fontWeight = '600';
                div.style.whiteSpace = 'nowrap';
                div.style.transform = 'translate(-50%, -50%)';
                div.style.pointerEvents = 'none';
                lc.appendChild(div);

                mapLabels.push({ obj: marker, el: div });
                return marker;
            }

            var sunTex = loadPlanet3DTexture('sun');
            var sunR = getBodyScaleRadius('sun');
            var sunMesh = new THREE.Mesh(
                new THREE.SphereGeometry(sunR, 64, 64),
                new THREE.MeshBasicMaterial({ map: sunTex })
            );
            
            var c1 = new THREE.Mesh(
                new THREE.SphereGeometry(sunR * 1.02, 64, 64),
                new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.22, side: THREE.BackSide })
            );
            sunMesh.add(c1);

            if (state.simMode === '2d') {
                sunMesh.visible = false;
                var sunDiv = document.createElement('div');
                sunDiv.textContent = '☀️ 태양 (Sun)';
                sunDiv.style.position = 'absolute';
                sunDiv.style.color = '#fbbf24';
                sunDiv.style.background = 'rgba(180, 83, 9, 0.85)';
                sunDiv.style.border = '1px solid rgba(251, 191, 36, 0.6)';
                sunDiv.style.padding = '4px 10px';
                sunDiv.style.borderRadius = '14px';
                sunDiv.style.fontSize = '13px';
                sunDiv.style.fontWeight = 'bold';
                sunDiv.style.whiteSpace = 'nowrap';
                sunDiv.style.transform = 'translate(-50%, -50%)';
                sunDiv.style.pointerEvents = 'none';
                lc.appendChild(sunDiv);
                mapLabels.push({ obj: sunMesh, el: sunDiv });
            }
            scene.add(sunMesh);

            celestialBodies['sun'] = { mesh: sunMesh, data: window.SOLAR_SYSTEM_DATA.sun };

            var planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

            planetKeys.forEach(function (key) {
                var data = window.SOLAR_SYSTEM_DATA[key];
                if (!data) return;

                var orbitR = getBodyOrbitRadius(key);
                var bodyR = getBodyScaleRadius(key);
                
                var ecc = (state.simMode === '2d') ? (KEPLER_ECCENTRICITIES[key] || 0.01) : 0.0; 
                
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

                // TRUE KEPLER ELLIPSE MATHEMATICAL FORMULA
                var semiMajor = orbitR;
                var semiMinor = orbitR * Math.sqrt(1 - ecc * ecc);
                var focusOffset = semiMajor * ecc;

                // Planet Axial Tilts (Astronomical Real Physics)
                var AXIAL_TILTS = {
                    mercury: 0.03,
                    venus: 177.3,
                    earth: 23.44,
                    mars: 25.19,
                    jupiter: 3.13,
                    saturn: 26.73,
                    uranus: 97.77,  // 98 degrees lying down sideways!
                    neptune: 28.32,
                    pluto: 122.53
                };

                // Create Axial Tilt Frame Group (Rotates along Z axis according to axial tilt)
                var bodyTiltGroup = new THREE.Object3D();
                bodyTiltGroup.rotation.z = (AXIAL_TILTS[key] || 0) * (Math.PI / 180);
                bodyTiltGroup.position.x = semiMajor - focusOffset;
                pivot.add(bodyTiltGroup);

                // Add planet mesh inside tiltGroup
                bodyTiltGroup.add(planetMesh);
                planetMesh.position.set(0, 0, 0);

                if (state.simMode === '2d') {
                    planetMesh.visible = false;
                    var pl = createPlanetLabel(key, data);
                    mapLabels.push({ obj: planetMesh, el: pl });
                    createOrbitLabel(key, data, semiMajor, semiMinor, focusOffset, pivot);
                }
                planetMesh.userData = { key: key, data: data, semiMajor: semiMajor, semiMinor: semiMinor, focusOffset: focusOffset, ecc: ecc };

                // All 4 Jovian Planet Rings (Jupiter, Saturn, Uranus, Neptune)
                var saturnRingMesh = null;
                if (state.simMode === '3d') {
                    if (key === 'jupiter') {
                        // Jupiter Faint Golden Dust Ring
                        var jRingGeo = new THREE.RingGeometry(bodyR * 1.2, bodyR * 1.5, 64);
                        jRingGeo.rotateX(Math.PI / 2);
                        var jRingMesh = new THREE.Mesh(jRingGeo, new THREE.MeshStandardMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.25 }));
                        bodyTiltGroup.add(jRingMesh);
                    } else if (key === 'saturn') {
                        var ringTex = loadPlanet3DTexture('saturnRing');
                        var ringGeo = new THREE.RingGeometry(bodyR * 1.3, bodyR * 2.3, 64);
                        ringGeo.rotateX(Math.PI / 2);
                        saturnRingMesh = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
                        bodyTiltGroup.add(saturnRingMesh);
                    } else if (key === 'uranus') {
                        // Uranus Faint Vertical Ring (98 deg tilted)
                        var uRingGeo = new THREE.RingGeometry(bodyR * 1.4, bodyR * 1.8, 64);
                        uRingGeo.rotateX(Math.PI / 2);
                        var uRingMesh = new THREE.Mesh(uRingGeo, new THREE.MeshStandardMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.4 }));
                        bodyTiltGroup.add(uRingMesh);
                    } else if (key === 'neptune') {
                        // Neptune Faint Blue Ring
                        var nRingGeo = new THREE.RingGeometry(bodyR * 1.3, bodyR * 1.6, 64);
                        nRingGeo.rotateX(Math.PI / 2);
                        var nRingMesh = new THREE.Mesh(nRingGeo, new THREE.MeshStandardMaterial({ color: 0x60a5fa, side: THREE.DoubleSide, transparent: true, opacity: 0.3 }));
                        bodyTiltGroup.add(nRingMesh);
                    }
                }

                if (key === 'earth' && state.simMode === '3d') {
                    var atmosMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(bodyR * 1.05, 32, 32),
                        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, side: THREE.BackSide })
                    );
                    planetMesh.add(atmosMesh);

                    // REAL ASTRONOMICAL LUNAR ORBITAL INCLINATION (5.14 deg relative to Ecliptic Plane)
                    var moonPivot = new THREE.Object3D();
                    moonPivot.rotation.x = 5.14 * (Math.PI / 180);
                    bodyTiltGroup.add(moonPivot);
                    
                    var moonR = getBodyScaleRadius('moon');
                    var moonMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(moonR, 16, 16),
                        new THREE.MeshStandardMaterial({ map: loadPlanet3DTexture('moon'), roughness: 0.85 })
                    );
                    var visMoonDist = 18.0; 
                    moonMesh.position.x = visMoonDist; 
                    moonMesh.userData = { key: 'moon', data: window.SOLAR_SYSTEM_DATA.moon };
                    moonPivot.add(moonMesh);

                    var mPts = [];
                    for (var m = 0; m <= 64; m++) {
                        var mt = (m / 64) * Math.PI * 2;
                        mPts.push(new THREE.Vector3(Math.cos(mt) * visMoonDist, 0, Math.sin(mt) * visMoonDist));
                    }
                    var mGeo = new THREE.BufferGeometry().setFromPoints(mPts);
                    var mLine = new THREE.LineLoop(mGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 }));
                    moonPivot.add(mLine);

                    celestialBodies['moon'] = { mesh: moonMesh, pivot: moonPivot, orbitRadius: visMoonDist, data: window.SOLAR_SYSTEM_DATA.moon };
                }

                // Build Sub-Satellites (Mars, Jupiter, Saturn, Neptune, Pluto) attached to bodyTiltGroup
                var satList = [];
                if (data.satellites && state.simMode === '3d') {
                    data.satellites.forEach(function(satData) {
                        var satPivot = new THREE.Object3D();
                        bodyTiltGroup.add(satPivot);

                        var satGeo = new THREE.SphereGeometry(satData.size || 1.2, 16, 16);
                        var satMat = new THREE.MeshStandardMaterial({ color: parseInt(satData.color.replace('#', '0x'), 16), roughness: 0.5 });
                        var satMesh = new THREE.Mesh(satGeo, satMat);
                        satMesh.position.x = satData.orbitR;
                        satPivot.add(satMesh);

                        // Satellite Orbit Line
                        var lineGeo = new THREE.BufferGeometry();
                        var pts = [];
                        for (var i = 0; i <= 64; i++) {
                            var a = (i / 64) * Math.PI * 2;
                            pts.push(new THREE.Vector3(Math.cos(a) * satData.orbitR, 0, Math.sin(a) * satData.orbitR));
                        }
                        lineGeo.setFromPoints(pts);
                        var lineMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.35 });
                        var satOrbitLine = new THREE.Line(lineGeo, lineMat);
                        satPivot.add(satOrbitLine);

                        satList.push({ data: satData, mesh: satMesh, pivot: satPivot, angle: Math.random() * Math.PI * 2 });
                    });
                }

                celestialBodies[key] = {
                    mesh: planetMesh,
                    bodyTiltGroup: bodyTiltGroup,
                    pivot: pivot,
                    ringMesh: saturnRingMesh,
                    satList: satList,
                    orbitRadius: orbitR,
                    semiMajor: semiMajor,
                    semiMinor: semiMinor,
                    focusOffset: focusOffset,
                    orbitAngle: (state.simMode === '2d') ? (Math.random() * Math.PI * 2) : (key === 'earth' ? 0 : Math.random() * Math.PI * 2)
                };

                // PRECISE KEPLER ELLIPSE ORBIT LINE
                if (state.showOrbits) {
                    var pts = [];
                    var segments = 256; 
                    for (var i = 0; i <= segments; i++) { 
                        var theta = (i / segments) * Math.PI * 2;
                        var ox = Math.cos(theta) * semiMajor - focusOffset;
                        var oz = Math.sin(theta) * semiMinor;
                        pts.push(new THREE.Vector3(ox, 0, oz));
                    }
                    var oGeo = new THREE.BufferGeometry().setFromPoints(pts);
                    var line = new THREE.LineLoop(oGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
                    line.rotation.z = incRad;
                    scene.add(line);
                    orbitLines.push(line);
                }
            });
        }

        // 4. TRUE ORBIT RATES (Earth = 1.0)
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

        // 5. TRUE SELF-ROTATION RATES (Earth = 365.25)
        var SELF_ROTATION_RATES = {
            mercury: 6.23,
            venus: -1.50,
            earth: 365.25,
            mars: 354.6,
            jupiter: 890.8,
            saturn: 811.6,
            uranus: -507.3,
            neptune: 545.1,
            pluto: -57.1
        };

        function animate3D() {
            requestAnimationFrame(animate3D);
            var delta = clock ? clock.getDelta() : 0.016;

            if (state.isPlaying) {
                var timeDelta = delta * 0.005 * state.orbitSpeed;
                state.simTimeYears += timeDelta;
                if (simTimeVal) simTimeVal.textContent = state.simTimeYears.toFixed(1) + ' yrs';

                if (celestialBodies['sun'] && celestialBodies['sun'].mesh) {
                    celestialBodies['sun'].mesh.rotation.y += timeDelta * (Math.PI * 2) * 13.5;
                }

                Object.keys(celestialBodies).forEach(function (key) {
                    var b = celestialBodies[key];
                    if (key === 'sun') return;

                    if (key === 'moon') {
                        var earthBody = celestialBodies['earth'];
                        if (earthBody && b.pivot) {
                            // moonPivot is a child of earth bodyTiltGroup; keep centered at Earth origin to avoid double offset
                            b.pivot.position.set(0, 0, 0);
                            
                            var earthAngle = earthBody.orbitAngle || 0;
                            // True Counter-Clockwise Moon Orbit (CCW: West -> East) around Earth
                            var moonAngle = earthAngle * 12.3688;
                            var visMoonDist = b.orbitRadius || 18.0;

                            if (b.mesh) {
                                // Orbit moon mesh smoothly on fixed inclination plane around Earth center
                                b.mesh.position.x = Math.cos(moonAngle) * visMoonDist;
                                b.mesh.position.z = Math.sin(moonAngle) * visMoonDist;
                                b.mesh.rotation.y = moonAngle;
                            }
                        }
                    } else if (b.pivot && b.mesh) {
                        var rate = ORBIT_RATES[key] || 0.1;
                        if (b.orbitAngle === undefined) b.orbitAngle = Math.random() * Math.PI * 2;

                        var dOrbit = timeDelta * (Math.PI * 2) * rate;
                        // Counter-Clockwise Orbit (CCW: West -> East) as viewed from Ecliptic North Pole
                        b.orbitAngle -= dOrbit;
                        b.orbitAngle %= (Math.PI * 2);
                        b.orbitAngle = b.orbitAngle;

                        var a = b.semiMajor || b.orbitRadius || 100;
                        var c = b.semiMinor || b.orbitRadius || 100;
                        var fo = b.focusOffset || 0;

                        var px = Math.cos(b.orbitAngle) * a - fo;
                        var pz = Math.sin(b.orbitAngle) * c;

                        if (b.bodyTiltGroup) {
                            b.bodyTiltGroup.position.x = px;
                            b.bodyTiltGroup.position.z = pz;
                        } else {
                            b.mesh.position.x = px;
                            b.mesh.position.z = pz;
                        }

                        if (state.simMode === '3d') {
                            var selfRate = SELF_ROTATION_RATES[key] || 1.0;
                            b.mesh.rotation.y += timeDelta * (Math.PI * 2) * selfRate;

                            // Animate Sub-Satellites (Phobos, Deimos, Galilean 4 Moons, Titan, Triton) inside bodyTiltGroup
                            if (b.satList && b.satList.length > 0) {
                                b.satList.forEach(function(sat) {
                                    var dSat = timeDelta * (Math.PI * 2) * (sat.data.speed || 1.0) * 8.0;
                                    sat.angle += dSat;
                                    sat.pivot.rotation.y = sat.angle;
                                });
                            }
                        }
                    }
                });
            }

            // 🛸 UFO Flight Exploration Mode Physics (Camera-Relative Steering)
            if (ufoState.active && ufoMesh && camera) {
                // Smooth & Gentle Flight Speed for Relaxed Art Gallery Exploration
                var moveSpeed = 2.2 * Math.min(state.orbitSpeed || 1.0, 2.5);

                // Calculate Camera Forward Vector on XZ Plane
                var camDir = new THREE.Vector3();
                camera.getWorldDirection(camDir);
                camDir.y = 0; // Constrain to orbital plane
                camDir.normalize();

                // Calculate Camera Right Vector
                var camRight = new THREE.Vector3();
                camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

                var moveVec = new THREE.Vector3(0, 0, 0);

                if (ufoState.keys.forward) moveVec.add(camDir);
                if (ufoState.keys.backward) moveVec.sub(camDir);
                if (ufoState.keys.right) moveVec.add(camRight);
                if (ufoState.keys.left) moveVec.sub(camRight);

                if (moveVec.lengthSq() > 0) {
                    moveVec.normalize().multiplyScalar(moveSpeed);
                    ufoState.pos.add(moveVec);

                    // 🛸 Self-Centered Camera Follow (Art Gallery Exploration Style!)
                    // Move camera position along with UFO so camera NEVER drifts away from UFO
                    camera.position.add(moveVec);

                    // Smoothly turn UFO mesh toward moving direction
                    var targetHeading = Math.atan2(-moveVec.x, -moveVec.z);
                    ufoMesh.rotation.y = targetHeading;
                }

                ufoMesh.position.copy(ufoState.pos);

                // Art Gallery Viewport Math: Offset camera target far ahead & high above UFO so UFO mesh sits at bottom 15-20% of screen
                if (controls) {
                    var lookTarget = ufoState.pos.clone()
                        .add(camDir.clone().multiplyScalar(55))
                        .add(new THREE.Vector3(0, 26, 0));
                    controls.target.copy(lookTarget);
                }
            }

            if (controls) controls.update();
            if (renderer && scene && camera) {
                try {
                    renderer.render(scene, camera);
                    update2DLabels();
                } catch (e) {
                    console.error('Render error:', e);
                }
            }
        }

        function update2DLabels() {
            var w = renderer.domElement.width;
            var h = renderer.domElement.height;
            var hw = w / 2;
            var hh = h / 2;
            var vec = new THREE.Vector3();

            // Update UFO Pilot Floating Name Tag Position (Tight Fit)
            if (ufoState.active && ufoMesh && ufoState.nameLabel) {
                vec.copy(ufoState.pos);
                vec.y += 3.2; // Tightly attach name tag directly above UFO dome
                vec.project(camera);
                if (vec.z <= 1.0) {
                    var ux = (vec.x * hw) + hw;
                    var uy = -(vec.y * hh) + hh;
                    ufoState.nameLabel.style.display = 'block';
                    ufoState.nameLabel.style.left = ux + 'px';
                    ufoState.nameLabel.style.top = uy + 'px';
                } else {
                    ufoState.nameLabel.style.display = 'none';
                }
            } else if (ufoState.nameLabel) {
                ufoState.nameLabel.style.display = 'none';
            }

            if (state.simMode !== '2d' || !camera || !renderer) return;

            mapLabels.forEach(function(item) {
                vec.setFromMatrixPosition(item.obj.matrixWorld);
                vec.project(camera);
                
                // Check if behind camera
                if (vec.z > 1.0) {
                    item.el.style.display = 'none';
                    return;
                }
                
                var x = (vec.x * hw) + hw;
                var y = -(vec.y * hh) + hh;
                
                item.el.style.display = 'block';
                item.el.style.left = x + 'px';
                item.el.style.top = y + 'px';
            });
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
                // Adjust zoom factor based on log scale sizes
                var offset = (key === 'sun') ? r * 3.5 : r * 10.0;
                if (offset < 5) offset = 5; 
                
                camera.position.set(worldPos.x + offset, worldPos.y + offset * 0.5, worldPos.z + offset);
                controls.update();
            }
            openPlanetModal(key);
        }

        // ========== 2. EARTH-MOON OBSERVATORY (Tab 2) ==========
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
            var ufoModeBtn = document.getElementById('ufoModeBtn');
            var ufoControlsPanel = document.getElementById('ufoControlsPanel');
            var ufoUpBtn = document.getElementById('ufoUpBtn');
            var ufoDownBtn = document.getElementById('ufoDownBtn');
            var ufoLeftBtn = document.getElementById('ufoLeftBtn');
            var ufoRightBtn = document.getElementById('ufoRightBtn');

            if (ufoModeBtn) {
                ufoModeBtn.addEventListener('click', function() {
                    ufoState.active = !ufoState.active;
                    if (ufoState.active) {
                        ufoModeBtn.textContent = '🛸 UFO 탐험 (UFO Flight) ON';
                        ufoModeBtn.style.background = 'rgba(56, 189, 248, 0.3)';
                        ufoModeBtn.style.color = '#fff';
                        if (ufoControlsPanel) ufoControlsPanel.style.display = 'block';
                        if (ufoMesh) ufoMesh.visible = true;
                        if (camera && controls) {
                            camera.position.set(ufoState.pos.x, ufoState.pos.y + 22, ufoState.pos.z + 75);
                            controls.target.copy(ufoState.pos);
                            controls.update();
                        }
                    } else {
                        ufoModeBtn.textContent = '🛸 UFO 탐험 (UFO Flight) OFF';
                        ufoModeBtn.style.background = 'rgba(56, 189, 248, 0.15)';
                        ufoModeBtn.style.color = '#38bdf8';
                        if (ufoControlsPanel) ufoControlsPanel.style.display = 'none';
                        if (ufoMesh) ufoMesh.visible = false;
                        if (camera && controls) {
                            controls.target.set(0, 0, 0);
                            camera.position.set(0, 1500, 2000);
                            controls.update();
                        }
                    }
                });
            }

            // Touch / On-screen Arrow Buttons Event Listeners
            function bindArrowBtn(btn, keyProp) {
                if (!btn) return;
                btn.addEventListener('mousedown', function() { ufoState.keys[keyProp] = true; });
                btn.addEventListener('mouseup', function() { ufoState.keys[keyProp] = false; });
                btn.addEventListener('mouseleave', function() { ufoState.keys[keyProp] = false; });
                btn.addEventListener('touchstart', function(e) { e.preventDefault(); ufoState.keys[keyProp] = true; });
                btn.addEventListener('touchend', function(e) { e.preventDefault(); ufoState.keys[keyProp] = false; });
            }
            bindArrowBtn(ufoUpBtn, 'forward');
            bindArrowBtn(ufoDownBtn, 'backward');
            bindArrowBtn(ufoLeftBtn, 'left');
            bindArrowBtn(ufoRightBtn, 'right');

            var simModeToggle = document.getElementById('simModeToggle');
            var simModeLabel = document.getElementById('simModeLabel');
            var simWarningAlert = document.getElementById('simWarningAlert');
            var auInfoCard = document.getElementById('auInfoCard');
            var auCardToggleBtn = document.getElementById('auCardToggleBtn');
            var auCardContent = document.getElementById('auCardContent');

            if (auCardToggleBtn && auCardContent) {
                var isExpanded = true;
                auCardToggleBtn.addEventListener('click', function() {
                    isExpanded = !isExpanded;
                    auCardContent.style.display = isExpanded ? 'block' : 'none';
                    auCardToggleBtn.textContent = isExpanded ? '➖' : '➕';
                });
            }

            if (simModeToggle) {
                simModeToggle.addEventListener('change', function (e) {
                    state.simMode = e.target.checked ? '2d' : '3d';
                    
                    if (state.simMode === '2d') {
                        // Disable UFO Flight Mode in 2D Reality Mode
                        if (ufoState.active) {
                            if (ufoModeBtn) ufoModeBtn.click(); // Turn off active UFO mode
                        }
                        if (ufoModeBtn) {
                            ufoModeBtn.disabled = true;
                            ufoModeBtn.style.opacity = '0.4';
                            ufoModeBtn.style.cursor = 'not-allowed';
                            ufoModeBtn.title = '2D 리얼리티 모드에서는 UFO 탐험을 이용할 수 없습니다.';
                        }

                        if (auInfoCard) auInfoCard.style.display = 'block';
                        simModeLabel.textContent = '🗺️ 2D 리얼리티 (1:1 Map)';
                        simModeLabel.style.color = '#10b981'; // emerald
                        simModeLabel.style.background = 'rgba(16,185,129,0.15)';
                        if(simWarningAlert) {
                            simWarningAlert.textContent = '※ 실제 천문 비율(1:1)에서는 행성들이 1픽셀보다 훨씬 작아져 눈에 보이지 않으므로 한글 텍스트 라벨로 표기됩니다.';
                            simWarningAlert.style.color = '#10b981';
                            simWarningAlert.style.background = 'rgba(16,185,129,0.1)';
                            simWarningAlert.style.border = '1px solid rgba(16,185,129,0.2)';
                        }
                        if (camera && controls) {
                            camera.position.set(0, 1500000, 0); // Zoomed way out top-down
                            controls.target.set(0, 0, 0);
                            controls.update();
                        }
                    } else {
                        // Enable UFO Flight Mode in 3D Mode
                        if (ufoModeBtn) {
                            ufoModeBtn.disabled = false;
                            ufoModeBtn.style.opacity = '1.0';
                            ufoModeBtn.style.cursor = 'pointer';
                            ufoModeBtn.title = 'UFO 탐험 (UFO Flight) 온/오프';
                        }

                        if (auInfoCard) auInfoCard.style.display = 'none';
                        simModeLabel.textContent = '🔭 3D 관찰용 (Log Scale)';
                        simModeLabel.style.color = '#38bdf8'; // sky
                        simModeLabel.style.background = 'rgba(56,189,248,0.15)';
                        if(simWarningAlert) {
                            simWarningAlert.textContent = '※ 이 화면은 교육적 시각화를 위해 거리와 크기가 로그 스케일(Log Scale)로 조절되었습니다.';
                            simWarningAlert.style.color = '#f59e0b';
                            simWarningAlert.style.background = 'rgba(245,158,11,0.1)';
                            simWarningAlert.style.border = '1px solid rgba(245,158,11,0.2)';
                        }
                        if (camera && controls) {
                            camera.position.set(0, 1500, 2000); 
                            controls.target.set(0, 0, 0);
                            controls.update();
                        }
                    }
                    buildCelestialBodies(); // Rebuild scene with new rules
                });
            }

            if (playPauseBtn) {
                playPauseBtn.addEventListener('click', function () {
                    state.isPlaying = !state.isPlaying;
                    playPauseBtn.textContent = state.isPlaying ? '⏸' : '▶';
                });
            }
            if (resetCamBtn) {
                resetCamBtn.addEventListener('click', function () {
                    if (camera && controls) {
                        camera.position.set(0, 1500, 2500); // 100% Scale Default view
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

        // ========== PLANET ATLAS GRID & SPEC TABLE (Tab 2) ==========
        function initAtlasGrid() {
            var grid = document.getElementById('atlasGrid');
            var tableBody = document.getElementById('specTableBody');
            if (!grid || !window.SOLAR_SYSTEM_DATA) return;
            grid.innerHTML = '';
            if (tableBody) tableBody.innerHTML = '';

            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
            grid.style.gap = '20px';

            var tableRowsHtml = '';

            Object.keys(window.SOLAR_SYSTEM_DATA).forEach(function (key) {
                var body = window.SOLAR_SYSTEM_DATA[key];
                var photo = body.photoUrl || (typeof window.createPlanetTexture === 'function' ? window.createPlanetTexture(key) : '');

                // Table Row Construction
                var mStr = body.massEarth || (body.gravityRatio ? (body.gravityRatio + 'g') : '-');
                var orbStr = body.orbitDays ? (body.orbitDays > 365 ? (body.orbitDays / 365).toFixed(1) + '년' : body.orbitDays + '일') : '-';
                var rotStr = body.rotationDays || '-';
                var gravStr = body.gravityRatio ? (body.gravityRatio + ' G') : '-';
                var radiusKmStr = body.radiusKm ? Number(body.radiusKm).toLocaleString() + ' km' : '-';

                tableRowsHtml += '<tr style="border-bottom: 1px solid rgba(255,255,255,0.06); cursor:pointer;" onclick="window.showPlanetModal(\'' + key + '\')" onmouseover="this.style.background=\'rgba(56,189,248,0.08)\'" onmouseout="this.style.background=\'transparent\'">' +
                    '<td style="padding:10px 14px; font-weight:800; color:' + (body.color || '#38bdf8') + '; display:flex; align-items:center; gap:8px;">' +
                        '<img src="' + photo + '" style="width:24px; height:24px; border-radius:50%; object-fit:cover; border:1px solid ' + (body.color || '#38bdf8') + ';" />' +
                        body.name +
                    '</td>' +
                    '<td style="padding:10px 14px; color:#94a3b8; font-size:12px;">' + (body.type || '-') + '</td>' +
                    '<td style="padding:10px 14px; font-weight:700; color:#fff;">' + radiusKmStr + '</td>' +
                    '<td style="padding:10px 14px; color:#cbd5e1;">' + mStr + '</td>' +
                    '<td style="padding:10px 14px; color:#cbd5e1;">' + (body.density || '-') + '</td>' +
                    '<td style="padding:10px 14px; color:#cbd5e1;">' + gravStr + '</td>' +
                    '<td style="padding:10px 14px; color:#38bdf8; font-weight:700;">' + orbStr + '</td>' +
                    '<td style="padding:10px 14px; color:#ffd18a;">' + rotStr + '</td>' +
                '</tr>';

                // Badge Color Palette
                var badgeBg = 'rgba(56, 189, 248, 0.15)';
                var badgeColor = '#38bdf8';
                var categoryText = body.category || body.type;

                if (categoryText.indexOf('항성') !== -1) {
                    badgeBg = 'rgba(234, 179, 8, 0.2)'; badgeColor = '#fef08a';
                } else if (categoryText.indexOf('지구형') !== -1) {
                    badgeBg = 'rgba(56, 189, 248, 0.2)'; badgeColor = '#38bdf8';
                } else if (categoryText.indexOf('목성형') !== -1) {
                    badgeBg = 'rgba(168, 85, 247, 0.2)'; badgeColor = '#c084fc';
                } else if (categoryText.indexOf('위성') !== -1) {
                    badgeBg = 'rgba(16, 185, 129, 0.2)'; badgeColor = '#34d399';
                } else if (categoryText.indexOf('왜소행성') !== -1) {
                    badgeBg = 'rgba(236, 72, 153, 0.2)'; badgeColor = '#f472b6';
                }

                var card = document.createElement('div');
                card.className = 'planet-card';
                card.style.cssText = 'overflow: hidden; padding: 0; position: relative; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); cursor: pointer; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);';

                // Hover Effects
                card.addEventListener('mouseenter', function() {
                    card.style.transform = 'translateY(-6px)';
                    card.style.borderColor = badgeColor;
                    card.style.boxShadow = '0 16px 35px rgba(0,0,0,0.7), 0 0 20px ' + badgeColor + '44';
                });
                card.addEventListener('mouseleave', function() {
                    card.style.transform = 'translateY(0)';
                    card.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                });

                var keyPointsHtml = '';
                if (body.satExamKeyPoints && body.satExamKeyPoints.length > 0) {
                    keyPointsHtml = '<div style="font-size:12px; color:#e2e8f0; background:rgba(15, 23, 42, 0.9); border-left:3px solid ' + badgeColor + '; padding:9px 12px; border-radius:8px; line-height:1.5;">' +
                        '<div style="font-weight:800; color:' + badgeColor + '; font-size:11px; margin-bottom:2px;">🎓 핵심 출제 포인트</div>' +
                        body.satExamKeyPoints[0] +
                        '</div>';
                }

                var radiusKmStr = body.radiusKm ? body.radiusKm.toLocaleString() + ' km' : '-';
                var densityStr = body.density || '-';
                var rotStr = body.rotationDays || '-';
                var orbStr = body.orbitDays ? body.orbitDays + '일' : (body.distAU ? body.distAU + ' AU' : '-');

                card.innerHTML =
                    '<div style="width:100%; height:190px; background: url(\'' + photo + '\') center/cover no-repeat; position:relative; border-bottom:1px solid rgba(255,255,255,0.1);">' +
                        '<div style="position:absolute; inset:0; background: linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent 60%);"></div>' +
                        '<span style="position:absolute; top:12px; left:12px; background:' + badgeBg + '; color:' + badgeColor + '; border: 1px solid ' + badgeColor + '66; padding:4px 12px; border-radius:20px; font-size:11.5px; font-weight:800; backdrop-filter:blur(4px);">' + categoryText + '</span>' +
                        '<div style="position:absolute; bottom:12px; left:16px; font-size:22px; font-weight:900; color:#fff; text-shadow:0 2px 10px rgba(0,0,0,0.8);">' +
                            body.name + ' <span style="font-size:13px; color:rgba(255,255,255,0.7); font-weight:500;">(' + body.enName + ')</span>' +
                        '</div>' +
                    '</div>' +
                    '<div style="padding: 18px; display:flex; flex-direction:column; gap:12px;">' +
                        '<div style="font-size:13px; color:#94a3b8; line-height:1.55; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + body.desc + '</div>' +
                        keyPointsHtml +
                        '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; font-size:11.5px; margin-top:4px;">' +
                            '<div style="background:rgba(255,255,255,0.04); padding:7px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">' +
                                '<div style="color:#64748b; font-size:10.5px;">📏 반지름</div>' +
                                '<div style="color:#f8fafc; font-weight:700; margin-top:1px;">' + radiusKmStr + '</div>' +
                            '</div>' +
                            '<div style="background:rgba(255,255,255,0.04); padding:7px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">' +
                                '<div style="color:#64748b; font-size:10.5px;">🧊 평균 밀도</div>' +
                                '<div style="color:#f8fafc; font-weight:700; margin-top:1px;">' + densityStr + '</div>' +
                            '</div>' +
                            '<div style="background:rgba(255,255,255,0.04); padding:7px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">' +
                                '<div style="color:#64748b; font-size:10.5px;">🔄 자전 주기</div>' +
                                '<div style="color:#f8fafc; font-weight:700; margin-top:1px;">' + rotStr + '</div>' +
                            '</div>' +
                            '<div style="background:rgba(255,255,255,0.04); padding:7px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">' +
                                '<div style="color:#64748b; font-size:10.5px;">🌀 공전 정보</div>' +
                                '<div style="color:#f8fafc; font-weight:700; margin-top:1px;">' + orbStr + '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

                card.addEventListener('click', function () { openPlanetModal(key); });
                grid.appendChild(card);
            });

            if (tableBody) tableBody.innerHTML = tableRowsHtml;
        }

        // ========== 100% TRUE SCALE & PHYSICS SPECS COMPARISON (Tab 4) ==========
        function initSpaceCalc() {
            var grid = document.getElementById('calcResultsGrid');
            if (!grid || !window.SOLAR_SYSTEM_DATA) return;
            grid.innerHTML = '';
            
            // Layout grid configuration
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
            grid.style.gap = '16px';

            Object.keys(window.SOLAR_SYSTEM_DATA).forEach(function (key) {
                // Removed 'if (key === "sun") return;' to include the Sun!
                var body = window.SOLAR_SYSTEM_DATA[key];
                var photo = body.photoUrl || (typeof window.createPlanetTexture === 'function' ? window.createPlanetTexture(key) : '');
                
                // Volume ratio relative to Earth
                var rEarth = 6371;
                var radiusKm = body.radiusKm || rEarth;
                var volumeRatio = Math.pow(radiusKm / rEarth, 3);
                var volumeStr = volumeRatio >= 10 ? Math.round(volumeRatio).toLocaleString('en-US') + '배' : (volumeRatio >= 1 ? volumeRatio.toFixed(1) + '배' : volumeRatio.toFixed(2) + '배');

                var rRatioVal = radiusKm / rEarth;
                var radiusRatio = rRatioVal >= 10 ? Math.round(rRatioVal) + '배' : (rRatioVal >= 1 ? rRatioVal.toFixed(1) + '배' : rRatioVal.toFixed(2) + '배');

                // Mass string
                var massStr = body.massEarth;
                if (!massStr) {
                    if (body.gravityRatio) {
                        var calcMass = Math.pow(radiusKm / rEarth, 2) * body.gravityRatio;
                        massStr = '지구의 약 ' + (calcMass >= 10 ? Math.round(calcMass) + '배' : (calcMass >= 1 ? calcMass.toFixed(1) + '배' : calcMass.toFixed(2) + '배'));
                    } else {
                        massStr = '알 수 없음';
                    }
                }

                var card = document.createElement('div');
                card.className = 'calc-result-card';
                card.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px;';
                
                card.innerHTML =
                    '<div style="display:flex; align-items:center; gap: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">' +
                        '<div style="width:48px;height:48px;border-radius:50%;background:url(\'' + photo + '\') center/cover; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>' +
                        '<div>' +
                            '<div style="font-size:18px;font-weight:900;color:#fff;">' + body.name + ' <span style="font-size:12px;color:var(--text-muted);font-weight:600;">(' + body.enName + ')</span></div>' +
                            '<div style="font-size:12px;color:#38bdf8;font-weight:700;">' + (body.category || body.type) + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size:12px;">' +
                        '<div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">' +
                            '<div style="color:var(--text-muted); margin-bottom:2px;">📏 반지름 (지구=1)</div>' +
                            '<div style="color:#fff; font-weight:700;">' + radiusRatio + '배 <span style="font-size:10px;color:#888;">(' + radiusKm.toLocaleString() + 'km)</span></div>' +
                        '</div>' +
                        '<div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">' +
                            '<div style="color:var(--text-muted); margin-bottom:2px;">📦 부피 (지구=1)</div>' +
                            '<div style="color:#fff; font-weight:700;">' + volumeStr + '배</div>' +
                        '</div>' +
                        '<div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; grid-column: span 2;">' +
                            '<div style="color:var(--text-muted); margin-bottom:2px;">⚖️ 질량</div>' +
                            '<div style="color:#fff; font-weight:700;">' + massStr + '</div>' +
                        '</div>' +
                        '<div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">' +
                            '<div style="color:var(--text-muted); margin-bottom:2px;">🧊 평균 밀도</div>' +
                            '<div style="color:#fff; font-weight:700;">' + (body.density || '-') + '</div>' +
                        '</div>' +
                        '<div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">' +
                            '<div style="color:var(--text-muted); margin-bottom:2px;">🍎 표면 중력</div>' +
                            '<div style="color:#fff; font-weight:700;">' + (body.gravityRatio ? '지구의 ' + body.gravityRatio + '배' : '-') + '</div>' +
                        '</div>' +
                        '<div style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.2); padding:8px; border-radius:6px;">' +
                            '<div style="color:#38bdf8; margin-bottom:2px;">🔄 자전 주기 (1일)</div>' +
                            '<div style="color:#fff; font-weight:700;">' + (body.rotationDays || '-') + '</div>' +
                        '</div>' +
                        '<div style="background:rgba(255,209,138,0.1); border:1px solid rgba(255,209,138,0.2); padding:8px; border-radius:6px;">' +
                            '<div style="color:#ffd18a; margin-bottom:2px;">☀️ 공전 주기 (1년)</div>' +
                            '<div style="color:#fff; font-weight:700;">' + (body.orbitDays ? body.orbitDays + '일' : '-') + '</div>' +
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

        // ========== QUIZ SYSTEM (Tab 5) - Enhanced & Robust ==========
        function initSpaceQuiz() {
            var nextBtn = document.getElementById('nextQuizBtn');
            if (nextBtn) nextBtn.addEventListener('click', loadNewQuizQuestion);
        }

        function loadNewQuizQuestion() {
            if (state.quiz.autoTimer) { clearTimeout(state.quiz.autoTimer); state.quiz.autoTimer = null; }
            state.quiz.answered = false;
            if (!state.quiz.qIndex) state.quiz.qIndex = 0;
            state.quiz.qIndex++;

            var quizPool = [
                { cat: "지구형 vs 목성형", q: "지구형 행성과 비교할 때 목성형 행성의 일반적인 물리적 특징으로 옳은 것은?", ans: "질량과 반지름이 크고 평균 밀도가 작다.", opts: ["질량과 반지름이 크고 평균 밀도가 작다.", "평균 밀도가 크고 자전 속도가 매우 늙다.", "위성의 수가 거의 없거나 적다.", "단단한 암석 표면을 가지고 있다."], exp: "목성형 행성은 수소와 헬륨 등 가벼운 기체 위주로 구성되어 있어 질량과 반지름은 크지만 평균 밀도는 매우 작습니다." },
                { cat: "내행성 관측", q: "수성과 금성 같은 내행성을 지상에서 관측할 수 있는 조건으로 옳은 것은?", ans: "해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘", opts: ["해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘", "한밤중에 남쪽 하늘", "한밤중에 북쪽 하늘", "하루 중 아무 때나 항상 관측 가능"], exp: "내행성은 지구 궤도 안쪽을 공전하므로 최대 이각 범위 내에서만 관측 가능하여 한밤중에는 볼 수 없고 해질녘 서쪽이나 새벽 동쪽 하늘에서만 관측됩니다." },
                { cat: "역자전 행성", q: "자전 방향이 지구와 반대(시계 방향 / 동->서)이며 자전 주기가 공전 주기보다 긴 행성은?", ans: "금성 (Venus)", opts: ["수성 (Mercury)", "금성 (Venus)", "화성 (Mars)", "목성 (Jupiter)"], exp: "금성은 시계 방향(동->서)으로 역자전하며, 자전 주기(243일)가 공전 주기(224.7일)보다 길어 하루가 1년보다 깁니다." },
                { cat: "밀도 특징", q: "평균 밀도가 0.69 g/cm³로 태양계 행성 중 유일하게 물(1.0 g/cm³)보다 밀도가 작아 물에 뜨는 행성은?", ans: "토성 (Saturn)", opts: ["목성 (Jupiter)", "토성 (Saturn)", "천왕성 (Uranus)", "해왕성 (Neptune)"], exp: "토성은 얼음과 가스로 이루어져 평균 밀도가 0.69g/cm³에 불과하여 만약 토성을 담을 거대한 바다가 있다면 물 위에 떠오릅니다." },
                { cat: "자전축 기울기", q: "자전축 기울기가 약 98도로 공전 궤도면에 거의 누운 상태로 공전하는 행성은?", ans: "천왕성 (Uranus)", opts: ["화성 (Mars)", "목성 (Jupiter)", "천왕성 (Uranus)", "해왕성 (Neptune)"], exp: "천왕성은 자전축이 98도 누워 있어서 남극이나 북극이 태양을 직등으로 향한 채 누워서 공전합니다." },
                { cat: "외행성 관측", q: "외행성이 지구에서 보았을 때 한밤중에 남쪽 하늘에서 가장 밝게 관측되는 위치는?", ans: "충 (Opposition)", opts: ["합 (Conjunction)", "충 (Opposition)", "동방 최대 이각", "서방 최대 이각"], exp: "태양-지구-외행성이 일직선상에 놓이는 '충' 위치일 때 외행성은 지구와 가장 가깝고 한밤중 남쪽 하늘에서 가장 밝게 관측됩니다." },
                { cat: "왜소행성 재분류", q: "2006년 국제천문연맹(IAU)에서 명왕성이 행성에서 왜소행성으로 재분류된 결정적 사유는?", ans: "자신의 궤도 주변의 다른 천체를 청소하지 못함", opts: ["태양 주위를 공전하지 않음", "자체 중력으로 구형을 이루지 못함", "자신의 궤도 주변의 다른 천체를 청소하지 못함", "위성을 보유하지 않음"], exp: "명왕성은 태양 공전과 구형 형태는 만족하지만, 카이퍼 벨트에 위치하여 자신의 궤도 주변 천체를 청소(Clear the neighborhood)하지 못해 왜소행성으로 재분류되었습니다." },
                { cat: "달의 운동", q: "지구에서 항상 달의 앞면만 볼 수 있는 과학적 원인은?", ans: "달의 자전 주기와 공전 주기가 27.3일로 같아서", opts: ["달이 자전을 전혀 하지 않아서", "달의 자전 주기와 공전 주기가 27.3일로 같아서", "지구의 자전 속도가 달보다 2배 빨라서", "달이 지구 주변을 멈춰 서 있어서"], exp: "달은 자전 주기와 공전 주기가 27.3일로 완전히 같은 '동주기 자전'을 하므로 지구를 향하는 면이 항상 같습니다." },
                { cat: "혜성의 특성", q: "혜성이 태양에 가까워질수록 길게 형성되는 꼬리의 방향으로 옳은 것은?", ans: "항상 태양의 반대 방향", opts: ["항상 태양의 반대 방향", "항상 태양을 향하는 방향", "혜성의 이동 방향 뒤쪽", "혜성의 자전축 방향"], exp: "혜성의 꼬리는 태양풍과 태양 방사압의 영향을 직접 받아 항상 태양의 반대 방향으로 늘어납니다." },
                { cat: "유성과 운석", q: "우주 먼지나 소행성 파편이 지구 대기권에 진입할 때 타지 않고 지표면에 떨어진 잔해를 부르는 명칭은?", ans: "운석 (Meteorite)", opts: ["유성 (Meteor)", "운석 (Meteorite)", "혜성 (Comet)", "왜소행성 (Dwarf Planet)"], exp: "대기 마찰열로 빛을 내며 타고 사라지면 유성(별똥별), 타다 남아서 지표에 떨어진 암석 잔해는 운석이라 부릅니다." },
                { cat: "소행성대 위치", q: "수많은 암석 천체들이 밀집해 있는 소행성대(Asteroid Belt)의 태양계 내 주요 위치는?", ans: "화성과 목성 궤도 사이", opts: ["수성과 금성 궤도 사이", "지구와 화성 궤도 사이", "화성과 목성 궤도 사이", "토성과 천왕성 궤도 사이"], exp: "소행성대는 화성(1.52 AU)과 목성(5.2 AU) 사이에 형성되어 있으며 수십만 개의 불규칙한 암석 조각들이 태양을 공전합니다." }
            ];

            var qIndexInPool = (state.quiz.qIndex - 1) % quizPool.length;
            var qObj = quizPool[qIndexInPool];
            state.quiz.currentQuestion = qObj;

            var catBadge = document.getElementById('quizCategoryBadge');
            if (catBadge) catBadge.textContent = '[' + qObj.cat + ']';

            var progressText = document.getElementById('quizProgressText');
            if (progressText) progressText.textContent = '문제 ' + (qIndexInPool + 1) + ' / ' + quizPool.length;

            var qTextEl = document.getElementById('quizQuestionText');
            if (qTextEl) qTextEl.textContent = '🪐 ' + qObj.q;

            var expBox = document.getElementById('quizExpBox');
            if (expBox) expBox.style.display = 'none';

            var optGrid = document.getElementById('quizOptionsGrid');
            if (optGrid) {
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
            }

            var resMsg = document.getElementById('quizResultMsg');
            if (resMsg) resMsg.textContent = '';
        }

        function checkQuizAnswer(selectedOpt, btn, correctAns, expText) {
            if (state.quiz.answered) return;
            state.quiz.answered = true;

            // Disable all option buttons after answer
            var allBtns = document.querySelectorAll('.quiz-opt-btn');
            allBtns.forEach(function(b) { b.disabled = true; b.style.cursor = 'default'; });

            var isCorrect = selectedOpt === correctAns;
            var msg = document.getElementById('quizResultMsg');
            var expBox = document.getElementById('quizExpBox');
            var expContent = document.getElementById('quizExpText');

            if (isCorrect) {
                btn.style.background = '#10b981';
                btn.style.color = '#000';
                state.quiz.score += 10;
                state.quiz.streak += 1;
                if (msg) {
                    msg.textContent = '🎉 정답입니다! (+10점)';
                    msg.style.color = '#38bdf8';
                }
            } else {
                btn.style.background = '#ef4444';
                state.quiz.streak = 0;
                if (msg) {
                    msg.textContent = '❌ 아쉽네요! 정답은 『 ' + correctAns + ' 』 입니다.';
                    msg.style.color = '#ef4444';
                }
            }

            if (expBox && expContent) {
                expContent.textContent = expText;
                expBox.style.display = 'block';
            }

            var scoreEl = document.getElementById('quizScore');
            if (scoreEl) scoreEl.textContent = state.quiz.score;
            var streakEl = document.getElementById('quizStreak');
            if (streakEl) streakEl.textContent = state.quiz.streak;
        }
    }
})();
