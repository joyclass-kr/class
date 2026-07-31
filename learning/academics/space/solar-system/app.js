/**
 * 태양계 관찰 (Solar System Observation) Three.js Engine
 * 100% TRUE ASTRONOMICAL SCALE (Size, Distance, Eccentricity, Rotation)
 */

(function syncSpaceViewportHeight() {
    function updateHeaderHeight() {
        var header = document.querySelector('.top-header');
        if (header) {
            document.documentElement.style.setProperty('--space-header-height', header.offsetHeight + 'px');
        }
    }

    function start() {
        updateHeaderHeight();
        var header = document.querySelector('.top-header');
        if (header && typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(updateHeaderHeight).observe(header);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    window.addEventListener('orientationchange', updateHeaderHeight);
})();

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
        var galaxyBackdrop = null;
        var galaxyBackdropDom = document.getElementById('galaxyBackdropLayer');
        var localGroupLayer = document.getElementById('localGroupLayer');
        var localGroupCanvas = document.getElementById('localGroupCanvas');
        var deepSpaceLayer = document.getElementById('deepSpaceLayer');
        var deepSpaceCanvas = document.getElementById('deepSpaceCanvas');
        var galaxyScaleIndicator = document.getElementById('galaxyScaleIndicator');
        var galaxyInteractionLocked = false;
        var simulationErrorShown = false;
        var GALAXY_VIEW = {
            fadeStart: 6500,
            fadeEnd: 22000,
            planeSize: 70000,
            localGroupStart: 78000,
            milkyWayFullView: 85000,
            localGroupEnd: 260000,
            deepSpaceStart: 300000,
            deepSpaceEnd: 1100000,
            max3DDistance: 1500000,
            max2DDistance: 1500000
        };

        function reportSimulationError(error) {
            if (simulationErrorShown || !canvasContainer) return;
            simulationErrorShown = true;

            var message = error && error.message ? error.message : String(error || '알 수 없는 초기화 오류');
            var panel = document.createElement('div');
            panel.id = 'solarSimulationError';
            panel.style.cssText =
                'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:30;' +
                'max-width:min(620px,86%);padding:18px 22px;border-radius:14px;' +
                'border:1px solid rgba(248,113,113,.65);background:rgba(15,23,42,.96);' +
                'box-shadow:0 18px 48px rgba(0,0,0,.45);color:#f8fafc;text-align:center;' +
                'font:700 14px/1.55 system-ui,sans-serif;';
            panel.innerHTML =
                '<div style="color:#fca5a5;font-size:16px;margin-bottom:6px;">3D 시뮬레이션을 시작하지 못했습니다</div>' +
                '<div style="color:#cbd5e1;font-weight:600;word-break:break-word;">' +
                message.replace(/[&<>"']/g, function (char) {
                    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
                }) +
                '</div><div style="margin-top:9px;color:#7dd3fc;font-size:12px;">Ctrl+F5 후에도 반복되면 이 문구를 알려주세요.</div>';
            canvasContainer.appendChild(panel);
        }

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
            pilotName: (localStorage.getItem('classPlayerName') || '').trim(),
            animal: chosenAnimal
        };
        var ufoLobby = null;
        var ufoRoomRole = null;
        var ufoTimeSyncTimer = null;

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

        // These lookup tables must exist before init3D() starts its first
        // synchronous animation frame.
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

        var SELF_ROTATION_RATES = {
            mercury: 6.23,
            venus: 1.50,
            earth: 365.25,
            mars: 354.6,
            jupiter: 890.8,
            saturn: 811.6,
            uranus: 507.3,
            neptune: 545.1,
            pluto: 57.1
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
                reportSimulationError(new Error('Three.js 파일이 로드되지 않았습니다.'));
                init2DFallback();
                initMoon2DFallback();
            }
        } catch (e) {
            console.warn('3D Init Exception:', e);
            reportSimulationError(e);
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

            try {
                renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    antialias: true,
                    logarithmicDepthBuffer: true,
                    alpha: true
                });
            } catch (webglError) {
                console.warn('Enhanced WebGL context unavailable; retrying basic mode.', webglError);
                renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    antialias: false,
                    alpha: true
                });
            }
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x030712, 0);

            if (typeof THREE.OrbitControls !== 'undefined') {
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.enablePan = false;
                controls.maxDistance = GALAXY_VIEW.max3DDistance;
                controls.minDistance = 2.0;
            }

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            scene.add(new THREE.AmbientLight(0x707080, 1.6));
            scene.add(new THREE.PointLight(0xfffaed, 4.0, 5000, 0.5));

            createGalaxyBackdrop();
            buildCelestialBodies();
            buildUFOMesh();

            window.addEventListener('resize', onWindowResize);
            canvas.addEventListener('click', onCanvasClick);

            is3DReady = true;
            animate3D();
        }

        function createGalaxyBackdrop() {
            if (!galaxyBackdropDom) return;
            galaxyBackdropDom.style.opacity = '0';
            galaxyBackdropDom.style.transform =
                'translate3d(0,0,0) rotateX(0deg) rotateZ(-4deg) scale(2.4)';
            renderCosmicScaleCanvases();
        }

        function smoothStep01(value) {
            var t = Math.max(0, Math.min(1, value));
            return t * t * (3 - 2 * t);
        }

        function createSeededRandom(seed) {
            var value = seed >>> 0;
            return function () {
                value = (value * 1664525 + 1013904223) >>> 0;
                return value / 4294967296;
            };
        }

        function prepareCosmicCanvas(targetCanvas) {
            if (!targetCanvas || !canvasContainer) return null;
            var width = Math.max(1, canvasContainer.clientWidth || 900);
            var height = Math.max(1, canvasContainer.clientHeight || 540);
            var pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            targetCanvas.width = Math.round(width * pixelRatio);
            targetCanvas.height = Math.round(height * pixelRatio);
            var context = targetCanvas.getContext('2d');
            if (!context) return null;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.clearRect(0, 0, width, height);
            return { ctx: context, width: width, height: height };
        }

        function drawSoftGalaxy(ctx, x, y, radius, rotation, flatten, palette, random) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.scale(1, flatten);

            var halo = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            halo.addColorStop(0, palette.core);
            halo.addColorStop(0.12, palette.inner);
            halo.addColorStop(0.48, palette.arm);
            halo.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();

            var particleCount = Math.max(70, Math.round(radius * 9));
            for (var i = 0; i < particleCount; i++) {
                var arm = i % 2;
                var radial = Math.pow(random(), 0.72) * radius * 0.92;
                var theta = arm * Math.PI + radial / radius * 5.4 + (random() - 0.5) * 0.62;
                var px = Math.cos(theta) * radial;
                var py = Math.sin(theta) * radial;
                var size = 0.28 + random() * Math.max(0.8, radius * 0.012);
                ctx.globalAlpha = (0.15 + random() * 0.55) * (1 - radial / radius * 0.62);
                ctx.fillStyle = random() > 0.84 ? palette.spark : palette.dust;
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawBackgroundGalaxies(ctx, width, height, count, random, minSize, maxSize, exclusion) {
            var palettes = [
                ['rgba(220,232,255,.72)', 'rgba(115,166,255,.28)'],
                ['rgba(255,235,208,.72)', 'rgba(255,153,88,.25)'],
                ['rgba(235,221,255,.66)', 'rgba(158,116,255,.24)']
            ];
            for (var i = 0; i < count; i++) {
                var x = random() * width;
                var y = random() * height;
                if (exclusion) {
                    var exclusionDx = x - exclusion.x;
                    var exclusionDy = y - exclusion.y;
                    if (Math.sqrt(exclusionDx * exclusionDx + exclusionDy * exclusionDy) <
                        exclusion.radius) {
                        i--;
                        continue;
                    }
                }
                var radius = minSize + Math.pow(random(), 3.2) * (maxSize - minSize);
                var palette = palettes[Math.floor(random() * palettes.length)];
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(random() * Math.PI);
                ctx.scale(1, 0.18 + random() * 0.48);
                var glow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
                glow.addColorStop(0, palette[0]);
                glow.addColorStop(0.28, palette[1]);
                glow.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawDistantLightPoints(ctx, width, height, random) {
            var referenceArea = 1280 * 720;
            var areaScale = (width * height) / referenceArea;
            var pointCount = Math.max(2400, Math.min(6200, Math.round(3600 * areaScale)));
            var colors = [
                [188, 211, 255],
                [232, 226, 255],
                [255, 220, 174],
                [151, 187, 255]
            ];

            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            for (var i = 0; i < pointCount; i++) {
                var x = random() * width;
                var y = random() * height;
                var color = colors[Math.floor(random() * colors.length)];
                var intensity = Math.pow(random(), 2.25);
                var radius = 0.18 + Math.pow(random(), 4.2) * 0.82;
                var alpha = 0.055 + intensity * 0.34;

                // Only a small minority gets a halo. Most marks remain faint,
                // unresolved galaxies rather than a distracting star field.
                if (random() > 0.94) {
                    var haloRadius = 1.6 + radius * 3.6;
                    var halo = ctx.createRadialGradient(x, y, 0, x, y, haloRadius);
                    halo.addColorStop(0, 'rgba(' + color.join(',') + ',' +
                        Math.min(0.52, alpha + 0.16).toFixed(3) + ')');
                    halo.addColorStop(1, 'rgba(' + color.join(',') + ',0)');
                    ctx.fillStyle = halo;
                    ctx.beginPath();
                    ctx.arc(x, y, haloRadius, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillStyle = 'rgba(' + color.join(',') + ',' + alpha.toFixed(3) + ')';
                    ctx.fillRect(x, y, Math.max(0.45, radius), Math.max(0.45, radius));
                }
            }
            ctx.restore();
        }

        function drawEllipticalGalaxy(ctx, x, y, radius, rotation, flatten, palette) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.scale(1, flatten);
            ctx.globalCompositeOperation = 'screen';

            var halo = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            halo.addColorStop(0, palette.core);
            halo.addColorStop(0.16, palette.body);
            halo.addColorStop(0.58, palette.halo);
            halo.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();

            if (flatten < 0.24) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = 'rgba(3,5,12,.46)';
                ctx.fillRect(-radius * 0.72, -radius * 0.035, radius * 1.44, radius * 0.07);
            }
            ctx.restore();
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawDistantGalaxyClusters(ctx, width, height, random) {
            var clusters = [
                [0.16, 0.22, 0.11], [0.48, 0.28, 0.14], [0.79, 0.20, 0.1],
                [0.27, 0.67, 0.13], [0.62, 0.62, 0.15], [0.88, 0.75, 0.09]
            ];
            var minDimension = Math.min(width, height);
            var warmPalette = {
                core: 'rgba(255,245,218,.92)',
                body: 'rgba(255,201,139,.54)',
                halo: 'rgba(216,135,79,.12)'
            };
            var coolPalette = {
                core: 'rgba(240,244,255,.9)',
                body: 'rgba(161,184,239,.5)',
                halo: 'rgba(96,113,194,.12)'
            };

            clusters.forEach(function (cluster, clusterIndex) {
                var members = 14 + Math.floor(random() * 12);
                for (var i = 0; i < members; i++) {
                    // Sum several samples to concentrate galaxies around a
                    // cluster while preserving a few outlying members.
                    var spreadX = ((random() + random() + random()) / 3 - 0.5) * 2;
                    var spreadY = ((random() + random() + random()) / 3 - 0.5) * 2;
                    var x = width * (cluster[0] + spreadX * cluster[2]);
                    var y = height * (cluster[1] + spreadY * cluster[2] * 1.45);
                    var radius = minDimension * (0.007 + Math.pow(random(), 2.2) * 0.025);
                    var rotation = random() * Math.PI;
                    var galaxyType = random();
                    var isWarm = (clusterIndex + i) % 3 === 0;

                    if (galaxyType < 0.38) {
                        drawEllipticalGalaxy(ctx, x, y, radius, rotation,
                            0.34 + random() * 0.54, isWarm ? warmPalette : coolPalette);
                    } else if (galaxyType < 0.58) {
                        drawEllipticalGalaxy(ctx, x, y, radius * 1.15, rotation,
                            0.1 + random() * 0.1, isWarm ? warmPalette : coolPalette);
                    } else {
                        drawSoftGalaxy(ctx, x, y, radius, rotation,
                            0.28 + random() * 0.48, {
                                core: isWarm ? 'rgba(255,239,202,.88)' : 'rgba(228,236,255,.88)',
                                inner: isWarm ? 'rgba(240,185,125,.46)' : 'rgba(172,194,244,.46)',
                                arm: isWarm ? 'rgba(174,104,65,.15)' : 'rgba(92,125,201,.17)',
                                dust: isWarm ? 'rgba(255,204,145,.55)' : 'rgba(184,207,255,.58)',
                                spark: 'rgba(255,245,218,.72)'
                            }, random);
                    }
                }
            });
        }

        function renderLocalGroupCanvas() {
            var prepared = prepareCosmicCanvas(localGroupCanvas);
            if (!prepared) return;
            var ctx = prepared.ctx;
            var width = prepared.width;
            var height = prepared.height;
            var random = createSeededRandom(32452843);

            // At Local Group scale individual stars are not resolvable.  The
            // faint background marks are therefore kept small and elliptical,
            // representing much more distant galaxies.
            drawBackgroundGalaxies(ctx, width, height, 520, random, 0.35, 1.8, {
                x: width * 0.5,
                y: height * 0.5,
                radius: Math.min(width, height) * 0.1
            });
            // The Milky Way itself is intentionally not redrawn here. The
            // original high-detail galaxy layer remains visible and shrinks
            // continuously, so its real luminous nucleus becomes the final
            // point without a duplicate or positional hand-off.
            drawSoftGalaxy(ctx, width * 0.24, height * 0.37, Math.min(width, height) * 0.032,
                -0.12, 0.22, {
                    core: 'rgba(255,244,206,.94)',
                    inner: 'rgba(219,224,255,.62)',
                    arm: 'rgba(104,145,220,.22)',
                    dust: 'rgba(188,210,255,.7)',
                    spark: 'rgba(255,236,191,.9)'
                }, random);
            // M33 belongs to the Andromeda side of the Local Group rather than
            // floating alone on the opposite edge of the scene.
            drawSoftGalaxy(ctx, width * 0.18, height * 0.59, Math.min(width, height) * 0.013,
                0.42, 0.55, {
                    core: 'rgba(255,238,197,.88)',
                    inner: 'rgba(197,216,255,.48)',
                    arm: 'rgba(93,145,225,.18)',
                    dust: 'rgba(188,214,255,.62)',
                    spark: 'rgba(255,226,174,.85)'
                }, random);

            [
                // Milky Way satellite group
                [0.46, 0.56, 0.0042], [0.55, 0.44, 0.0035], [0.53, 0.59, 0.0028],
                [0.43, 0.43, 0.0024],
                // Andromeda / Triangulum satellite group
                [0.29, 0.31, 0.0040], [0.20, 0.43, 0.0031], [0.27, 0.52, 0.0026],
                [0.14, 0.51, 0.0022],
                // Isolated Local Group dwarfs
                [0.68, 0.68, 0.0024], [0.73, 0.29, 0.0020], [0.36, 0.76, 0.0018]
            ].forEach(function (dwarf) {
                drawSoftGalaxy(ctx, width * dwarf[0], height * dwarf[1],
                    Math.min(width, height) * dwarf[2], random() * Math.PI, 0.55, {
                        core: 'rgba(224,232,255,.72)',
                        inner: 'rgba(145,174,224,.28)',
                        arm: 'rgba(77,109,173,.12)',
                        dust: 'rgba(186,207,244,.45)',
                        spark: 'rgba(255,239,201,.6)'
                    }, random);
            });
        }

        function renderDeepSpaceCanvas() {
            var prepared = prepareCosmicCanvas(deepSpaceCanvas);
            if (!prepared) return;
            var ctx = prepared.ctx;
            var width = prepared.width;
            var height = prepared.height;
            var random = createSeededRandom(49979687);
            drawDistantLightPoints(ctx, width, height, random);
            drawBackgroundGalaxies(ctx, width, height, 1750, random, 0.4, 5.2);
            drawDistantGalaxyClusters(ctx, width, height, random);

            // A few visually prominent field galaxies keep the intermediate
            // scale readable before the smallest background population fills in.
            for (var i = 0; i < 34; i++) {
                var radius = Math.min(width, height) * (0.009 + random() * 0.025);
                drawSoftGalaxy(ctx, random() * width, random() * height, radius,
                    random() * Math.PI, 0.2 + random() * 0.48, {
                        core: random() > 0.45 ? 'rgba(255,237,207,.82)' : 'rgba(220,230,255,.82)',
                        inner: 'rgba(173,190,235,.38)',
                        arm: 'rgba(101,132,195,.16)',
                        dust: 'rgba(190,207,244,.52)',
                        spark: 'rgba(255,218,176,.72)'
                    }, random);
            }
        }

        function renderCosmicScaleCanvases() {
            renderLocalGroupCanvas();
            renderDeepSpaceCanvas();
        }

        function updateSolarSystemGalaxyBlend(galaxyVisibility) {
            // Compress the complete Solar System until it becomes
            // indistinguishable from the surrounding arm. Orbit guides
            // disappear earlier, and the final sub-pixel remnant is hidden.
            var assimilation = smoothStep01((galaxyVisibility - 0.08) / 0.92);
            var remainingPresence = 1 - assimilation;
            var systemScale = Math.max(0.0001, Math.pow(remainingPresence, 2.4));
            var systemOpacity = 1 - smoothStep01((galaxyVisibility - 0.04) / 0.38);
            var hideSolarSystem = assimilation >= 0.86;
            var orbitFade = 1 - smoothStep01((galaxyVisibility - 0.01) / 0.28);
            var scaledRoots = [];

            if (canvas) {
                canvas.style.opacity = Math.max(0, systemOpacity).toFixed(3);
            }

            Object.keys(celestialBodies).forEach(function (key) {
                var body = celestialBodies[key];
                if (!body) return;

                var root = null;
                if (body.pivot && body.pivot.parent === scene) {
                    root = body.pivot;
                } else if (body.bodyTiltGroup && body.bodyTiltGroup.parent === scene) {
                    root = body.bodyTiltGroup;
                } else if (body.mesh && body.mesh.parent === scene) {
                    root = body.mesh;
                }

                if (root && scaledRoots.indexOf(root) === -1) {
                    root.scale.setScalar(systemScale);

                    if (hideSolarSystem && root.visible) {
                        root.visible = false;
                        root.userData.hiddenByGalaxyTransition = true;
                    } else if (!hideSolarSystem && root.userData.hiddenByGalaxyTransition) {
                        root.visible = true;
                        delete root.userData.hiddenByGalaxyTransition;
                    }

                    scaledRoots.push(root);
                }
            });

            orbitLines.forEach(function (line) {
                line.scale.setScalar(systemScale);

                if (line.material) {
                    if (typeof line.material.userData.galaxyBaseOpacity !== 'number') {
                        line.material.userData.galaxyBaseOpacity = line.material.opacity;
                    }
                    line.material.opacity = line.material.userData.galaxyBaseOpacity * orbitFade;
                }

                line.visible = state.showOrbits && orbitFade > 0.012;
            });
        }

        function updateGalaxyBackdrop() {
            if (!camera || (!galaxyBackdrop && !galaxyBackdropDom)) return;

            var viewTarget = controls ? controls.target : new THREE.Vector3(0, 0, 0);
            var cameraDistance = camera.position.distanceTo(viewTarget);
            if (controls) {
                var shouldLockGalaxyView = galaxyInteractionLocked
                    ? cameraDistance >= GALAXY_VIEW.fadeStart * 0.82
                    : cameraDistance >= GALAXY_VIEW.fadeStart * 0.95;

                if (shouldLockGalaxyView && !galaxyInteractionLocked) {
                    // Preserve the current viewing direction and distance while
                    // recentering the Solar System before the galaxy becomes visible.
                    var lockedCameraOffset = camera.position.clone().sub(controls.target);
                    controls.target.set(0, 0, 0);
                    camera.position.copy(lockedCameraOffset);
                    camera.lookAt(controls.target);
                    controls.update();
                    viewTarget = controls.target;
                    cameraDistance = camera.position.distanceTo(viewTarget);
                }

                galaxyInteractionLocked = shouldLockGalaxyView;
                controls.enableRotate = !galaxyInteractionLocked;
                controls.enablePan = false;
                controls.enableZoom = true;
            }
            var range = GALAXY_VIEW.fadeEnd - GALAXY_VIEW.fadeStart;
            var fade = smoothStep01((cameraDistance - GALAXY_VIEW.fadeStart) / range);
            var canShow = state.simMode === '3d' && !ufoState.active;
            var visibility = canShow ? fade : 0;
            var localGroupPresence = canShow ? smoothStep01(
                (cameraDistance - GALAXY_VIEW.localGroupStart) /
                (GALAXY_VIEW.localGroupEnd - GALAXY_VIEW.localGroupStart)
            ) : 0;
            var deepSpacePresence = canShow ? smoothStep01(
                (cameraDistance - GALAXY_VIEW.deepSpaceStart) /
                (GALAXY_VIEW.deepSpaceEnd - GALAXY_VIEW.deepSpaceStart)
            ) : 0;
            // Hand the real image nucleus to a sub-pixel point only after the
            // detailed galaxy is already very small. The overlap prevents a
            // blink, while the point itself later fades into the deep field.
            var milkyWayDetailDissolve = smoothStep01(
                (cameraDistance - 235000) / 320000
            );
            var milkyWayCoreReveal = smoothStep01(
                (cameraDistance - 300000) / 200000
            );
            var milkyWayCoreFinalFade = 1 - smoothStep01(
                (cameraDistance - 900000) /
                (GALAXY_VIEW.max3DDistance - 900000)
            );
            var milkyWayCoreOpacity = canShow
                ? milkyWayCoreReveal * milkyWayCoreFinalFade
                : 0;

            if (galaxyBackdrop) {
                galaxyBackdrop.visible = visibility > 0.002;
                galaxyBackdrop.material.opacity =
                    visibility * (1 - milkyWayDetailDissolve) * 0.72;
            }
            if (galaxyBackdropDom) {
                var galaxyPresence = smoothStep01((visibility - 0.025) / 0.86);
                var viewportWidth = canvasContainer ? Math.max(1, canvasContainer.clientWidth) : 1;
                var viewportHeight = canvasContainer ? Math.max(1, canvasContainer.clientHeight) : 1;
                var viewportAspect = viewportWidth / viewportHeight;
                // The source PNG contains a wide transparent-looking black margin:
                // its luminous galactic disk radius is about 36.7% of the full
                // square image width.  Place the Sun at 53% of that *visible disk*
                // radius (about 26,500 ly in a 50,000 ly disk), on the same
                // Orion-side bright arm direction used by the artwork.
                var visibleDiskRadiusRatio = 0.367;
                var solarGalactocentricRadiusRatio = 0.53;
                var orionArmAngle = -0.369; // about -21.1 degrees in image space
                var armOffsetRatio =
                    visibleDiskRadiusRatio * solarGalactocentricRadiusRatio * Math.cos(orionArmAngle);
                var armVerticalOffsetRatio =
                    visibleDiskRadiusRatio * solarGalactocentricRadiusRatio * Math.sin(orionArmAngle);
                var galaxyCenterPercent = 50 - (armOffsetRatio * 43 / viewportAspect);
                var galaxyCenterYPercent = 50 - (armVerticalOffsetRatio * 43);
                galaxyBackdropDom.style.setProperty(
                    '--galaxy-center-x',
                    galaxyCenterPercent.toFixed(2) + '%'
                );
                galaxyBackdropDom.style.setProperty(
                    '--galaxy-center-y',
                    galaxyCenterYPercent.toFixed(2) + '%'
                );
                var galaxyOverviewZoom = smoothStep01(
                    (cameraDistance - GALAXY_VIEW.fadeStart) /
                    (GALAXY_VIEW.milkyWayFullView - GALAXY_VIEW.fadeStart)
                );
                var localGroupShrink = smoothStep01(
                    (cameraDistance - GALAXY_VIEW.milkyWayFullView) /
                    (GALAXY_VIEW.deepSpaceStart - GALAXY_VIEW.milkyWayFullView)
                );
                var deepSpaceShrink = smoothStep01(
                    (cameraDistance - GALAXY_VIEW.deepSpaceStart) /
                    (GALAXY_VIEW.max3DDistance - GALAXY_VIEW.deepSpaceStart)
                );
                var galaxyScale = (2.4 - galaxyOverviewZoom * 1.55) -
                    localGroupShrink * 0.73 - deepSpaceShrink * 0.07;
                var azimuth = controls && typeof controls.getAzimuthalAngle === 'function'
                    ? controls.getAzimuthalAngle()
                    : Math.atan2(camera.position.x, camera.position.z);
                var polar = controls && typeof controls.getPolarAngle === 'function'
                    ? controls.getPolarAngle()
                    : Math.acos(camera.position.y / Math.max(1, camera.position.length()));
                var azimuthDeg = azimuth * (180 / Math.PI);
                var tiltDeg = Math.max(-14, Math.min(14, (polar - 0.9273) * 24));
                var spinDeg = -4 - azimuthDeg * 0.35;
                var parallaxX = Math.sin(azimuth) * 1.2;
                var parallaxY = Math.max(-1.5, Math.min(1.5, (polar - 0.9273) * 2.6));
                galaxyScale += Math.abs(tiltDeg) * 0.0015;
                galaxyBackdropDom.style.opacity = (galaxyPresence * 0.98).toFixed(3);
                galaxyBackdropDom.style.setProperty(
                    '--galaxy-detail-opacity',
                    (1 - milkyWayDetailDissolve).toFixed(3)
                );
                galaxyBackdropDom.style.setProperty(
                    '--core-point-opacity',
                    milkyWayCoreOpacity.toFixed(3)
                );
                galaxyBackdropDom.style.setProperty(
                    '--core-point-counter-scale',
                    (1 / Math.max(0.05, galaxyScale)).toFixed(3)
                );
                galaxyBackdropDom.style.transform =
                    'translate3d(' + parallaxX.toFixed(2) + '%,' + parallaxY.toFixed(2) + '%,0)' +
                    ' rotateX(' + tiltDeg.toFixed(2) + 'deg)' +
                    ' rotateZ(' + spinDeg.toFixed(2) + 'deg)' +
                    ' scale(' + galaxyScale.toFixed(3) + ')';
            }
            var logarithmicCosmicZoom = smoothStep01(
                Math.log(Math.max(cameraDistance, GALAXY_VIEW.localGroupStart) /
                    GALAXY_VIEW.localGroupStart) /
                Math.log(GALAXY_VIEW.max3DDistance / GALAXY_VIEW.localGroupStart)
            );
            if (localGroupLayer) {
                // Keep the exact same Local Group galaxies alive through the
                // whole journey. They continuously contract toward the zoom
                // focus instead of being replaced by another picture.
                localGroupLayer.style.opacity = localGroupPresence.toFixed(3);
                localGroupLayer.style.transform =
                    'scale(' + (1.04 - logarithmicCosmicZoom * 0.91).toFixed(3) + ')';
            }
            if (deepSpaceLayer) {
                // Distant galaxies begin as a barely visible background while
                // the Local Group is still identifiable. Scaling this same
                // field down reveals progressively more galaxies from the
                // edges, avoiding a cut between two unrelated random fields.
                var distantFieldPresence = smoothStep01(
                    (logarithmicCosmicZoom - 0.10) / 0.90
                );
                deepSpaceLayer.style.opacity = distantFieldPresence.toFixed(3);
                deepSpaceLayer.style.transform =
                    'scale(' + (1.82 - logarithmicCosmicZoom * 0.82).toFixed(3) + ')';
            }
            updateSolarSystemGalaxyBlend(visibility);

            if (galaxyScaleIndicator) {
                var indicatorVisibility = smoothStep01((visibility - 0.08) / 0.52);
                galaxyScaleIndicator.style.setProperty('--galaxy-visibility', indicatorVisibility.toFixed(3));
                galaxyScaleIndicator.setAttribute('aria-hidden', indicatorVisibility > 0.02 ? 'false' : 'true');
                var stage = deepSpacePresence > 0.28 ? 'deep-space' :
                    (localGroupPresence > 0.2 ? 'local-group' : 'milky-way');
                if (galaxyScaleIndicator.dataset.stage !== stage) {
                    galaxyScaleIndicator.dataset.stage = stage;
                    var title = galaxyScaleIndicator.querySelector('strong');
                    var subtitle = galaxyScaleIndicator.querySelector('.galaxy-scale-indicator__copy > span');
                    var note = galaxyScaleIndicator.querySelector('small');
                    if (stage === 'deep-space') {
                        if (title) title.textContent = '심우주 은하 분포';
                        if (subtitle) subtitle.textContent = '광점 하나하나가 거대한 은하';
                        if (note) note.textContent = '관측 가능한 우주를 개념적으로 축약한 화면';
                    } else if (stage === 'local-group') {
                        if (title) title.textContent = '국부은하군';
                        if (subtitle) subtitle.textContent = '은하수 · 안드로메다 · 삼각형자리은하';
                        if (note) note.textContent = '약 1천만 광년 규모의 개념 축척';
                    } else {
                        if (title) title.textContent = '은하수 은하';
                        if (subtitle) subtitle.textContent = '태양계 · 오리온자리 팔';
                        if (note) note.textContent = '위치와 크기는 관찰을 위한 개념 축척';
                    }
                }
            }
        }

        function init2DFallback() {
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            if (!ctx) return;
            var width = canvasContainer ? (canvasContainer.clientWidth || 900) : 900;
            var height = canvasContainer ? (canvasContainer.clientHeight || 540) : 540;
            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = '#030712';
            ctx.fillRect(0, 0, width, height);
            ctx.save();
            ctx.translate(width / 2, height / 2);

            var orbitRadii = [55, 78, 104, 132, 172, 215, 255, 294];
            ctx.strokeStyle = 'rgba(148,163,184,.3)';
            ctx.lineWidth = 1;
            orbitRadii.forEach(function (radius) {
                ctx.beginPath();
                ctx.ellipse(0, 0, radius, radius * 0.38, 0, 0, Math.PI * 2);
                ctx.stroke();
            });

            var sunGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, 34);
            sunGlow.addColorStop(0, '#fff7b2');
            sunGlow.addColorStop(0.38, '#fbbf24');
            sunGlow.addColorStop(1, 'rgba(245,158,11,0)');
            ctx.fillStyle = sunGlow;
            ctx.beginPath();
            ctx.arc(0, 0, 34, 0, Math.PI * 2);
            ctx.fill();

            var colors = ['#a8a29e', '#f0b46b', '#60a5fa', '#ef4444', '#d6a66e', '#e8c47c', '#67e8f9', '#3b82f6'];
            orbitRadii.forEach(function (radius, index) {
                var angle = index * 0.84 + 0.35;
                ctx.fillStyle = colors[index];
                ctx.beginPath();
                ctx.arc(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.38, index < 4 ? 3.5 : 6, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();
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
            sunMesh.userData = { key: 'sun', data: window.SOLAR_SYSTEM_DATA.sun };
            
            var c1 = new THREE.Mesh(
                new THREE.SphereGeometry(sunR * 1.02, 64, 64),
                new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.22, side: THREE.BackSide })
            );
            sunMesh.add(c1);

            // ☀️ 3D DYNAMIC SUNSPOT ENGINE (Umbra/Penumbra 2-Layer Mesh + Mid-latitude 10-35° Rule + Life Cycle)
            var sunspotGroup = new THREE.Object3D();
            sunMesh.add(sunspotGroup);

            var sunspotList = [];
            var sunspotCount = 10;

            for (var sp = 0; sp < sunspotCount; sp++) {
                var spotGroup = new THREE.Object3D();

                // 1. Mid-Latitude Restriction: South/North Latitude 10°~35°
                var isNorth = Math.random() > 0.5;
                var latDeg = (Math.random() * 25 + 10) * (isNorth ? 1 : -1);
                var lonDeg = Math.random() * 360;

                var latRad = latDeg * (Math.PI / 180);
                var lonRad = lonDeg * (Math.PI / 180);

                var spotR = sunR * 1.002;
                var sx = spotR * Math.cos(latRad) * Math.cos(lonRad);
                var sy = spotR * Math.sin(latRad);
                var sz = spotR * Math.cos(latRad) * Math.sin(lonRad);

                spotGroup.position.set(sx, sy, sz);

                // Normal vector to align spot disk to sphere surface
                var normal = new THREE.Vector3(sx, sy, sz).normalize();
                spotGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

                // 2. Irregular Shape Generator
                var baseRadius = Math.random() * 2.5 + 1.8;

                // Layer A: Penumbra (Outer lighter brown/orange boundary)
                var pGeo = new THREE.DodecahedronGeometry(baseRadius * 1.4, 1);
                var pPos = pGeo.attributes.position;
                for (var p = 0; p < pPos.count; p++) {
                    var px = pPos.getX(p);
                    var py = pPos.getY(p);
                    var pz = pPos.getZ(p);
                    var n = 1.0 + (Math.sin(px * 4.0) + Math.cos(py * 4.0)) * 0.22;
                    pPos.setXYZ(p, px * n, py * n, pz * 0.1); // Flat disk on surface
                }
                pGeo.computeVertexNormals();
                var pMat = new THREE.MeshBasicMaterial({ color: 0x7c2d12, transparent: true, opacity: 0.85 });
                var penumbraMesh = new THREE.Mesh(pGeo, pMat);
                spotGroup.add(penumbraMesh);

                // Layer B: Umbra (Inner deep dark core)
                var uGeo = new THREE.DodecahedronGeometry(baseRadius * 0.75, 1);
                var uPos = uGeo.attributes.position;
                for (var u = 0; u < uPos.count; u++) {
                    var ux = uPos.getX(u);
                    var uy = uPos.getY(u);
                    var uz = uPos.getZ(u);
                    var un = 1.0 + (Math.sin(ux * 4.0) + Math.cos(uy * 4.0)) * 0.2;
                    uPos.setXYZ(u, ux * un, uy * un, uz * 0.12);
                }
                uGeo.computeVertexNormals();
                var uMat = new THREE.MeshBasicMaterial({ color: 0x0f0f11, transparent: true, opacity: 0.95 });
                var umbraMesh = new THREE.Mesh(uGeo, uMat);
                umbraMesh.position.z = 0.05;
                spotGroup.add(umbraMesh);

                spotGroup.scale.set(0, 0, 0); // Start born at 0 scale
                sunspotGroup.add(spotGroup);

                sunspotList.push({
                    group: spotGroup,
                    penumbraMat: pMat,
                    umbraMat: uMat,
                    latDeg: latDeg,
                    baseRadius: baseRadius,
                    life: Math.random() * 8.0,
                    maxLife: Math.random() * 10.0 + 8.0,
                    targetScale: Math.random() * 0.6 + 0.7
                });
            }

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

            celestialBodies['sun'] = { mesh: sunMesh, sunspotList: sunspotList, data: window.SOLAR_SYSTEM_DATA.sun };

            var planetKeys = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

            planetKeys.forEach(function (key) {
                var data = window.SOLAR_SYSTEM_DATA[key];
                if (!data) return;

                var orbitR = getBodyOrbitRadius(key);
                var bodyR = getBodyScaleRadius(key);
                
                var ecc = KEPLER_ECCENTRICITIES[key] || 0.0;
                
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

                // Keep orbital translation separate from the body's axial frame.
                // This prevents satellite planes from accidentally inheriting an
                // unrelated body tilt (notably Earth's Moon).
                var planetPositionGroup = new THREE.Object3D();
                planetPositionGroup.position.x = semiMajor - focusOffset;
                pivot.add(planetPositionGroup);

                // Directed obliquity: values over 90 degrees already encode a
                // retrograde spin axis, so the mesh rotation rate stays positive.
                var bodyTiltGroup = new THREE.Object3D();
                bodyTiltGroup.rotation.z = (data.axialTiltDeg || 0) * (Math.PI / 180);
                planetPositionGroup.add(bodyTiltGroup);

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

                    // Lunar orbit inclination is measured from the ecliptic, not
                    // from Earth's tilted equatorial plane.
                    var moonPivot = new THREE.Object3D();
                    moonPivot.rotation.z = 5.14 * (Math.PI / 180);
                    planetPositionGroup.add(moonPivot);
                    
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
                        var satPlane = new THREE.Object3D();
                        satPlane.rotation.z = (satData.inclinationDeg || 0) * (Math.PI / 180);
                        bodyTiltGroup.add(satPlane);

                        var satPivot = new THREE.Object3D();
                        satPlane.add(satPivot);

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
                        satPlane.add(satOrbitLine);

                        satList.push({ data: satData, mesh: satMesh, pivot: satPivot, angle: Math.random() * Math.PI * 2 });
                    });
                }

                celestialBodies[key] = {
                    mesh: planetMesh,
                    planetPositionGroup: planetPositionGroup,
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

            // ========== 🌟 3D SMALL SYSTEM BODIES (Asteroid Belt, Comet, Meteor) ==========
            if (state.simMode === '3d') {
                // 1. 🪐 3D Asteroid Belt (Main Belt between Mars and Jupiter)
                var asteroidCount = 1800;
                var astGeo = new THREE.BufferGeometry();
                var astPositions = new Float32Array(asteroidCount * 3);
                var marsR = getBodyOrbitRadius('mars');
                var jupR = getBodyOrbitRadius('jupiter');
                var minBeltR = marsR + (jupR - marsR) * 0.25;
                var maxBeltR = marsR + (jupR - marsR) * 0.75;

                for (var i = 0; i < asteroidCount; i++) {
                    var r = minBeltR + Math.random() * (maxBeltR - minBeltR);
                    var theta = Math.random() * Math.PI * 2;
                    var yOffset = (Math.random() - 0.5) * 15;
                    astPositions[i * 3] = Math.cos(theta) * r;
                    astPositions[i * 3 + 1] = yOffset;
                    astPositions[i * 3 + 2] = Math.sin(theta) * r;
                }
                astGeo.setAttribute('position', new THREE.BufferAttribute(astPositions, 3));
                var astMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 2.2, transparent: true, opacity: 0.75 });
                var astParticles = new THREE.Points(astGeo, astMat);
                astParticles.userData = { key: 'asteroid', data: window.SOLAR_SYSTEM_DATA.asteroid };
                scene.add(astParticles);
                celestialBodies['asteroid'] = { mesh: astParticles, data: window.SOLAR_SYSTEM_DATA.asteroid };

                // 2. ☄️ 3D comet: faceted nucleus, soft coma, straight ion tail,
                // and a broad dust tail that curves behind the orbital motion.
                var cometData = window.SOLAR_SYSTEM_DATA.comet;
                if (cometData) {
                    try {
                    var cometGroup = new THREE.Object3D();
                    cometGroup.userData = { key: 'comet', data: cometData };
                    
                    // 1) The solid nucleus is a jagged, elongated ice-rock body.
                    // The coma stays soft, but the core should not look spherical.
                    var cGeo = new THREE.DodecahedronGeometry(0.62, 0);
                    var posAttr = cGeo.attributes.position;
                    for (var i = 0; i < posAttr.count; i++) {
                        var vx = posAttr.getX(i);
                        var vy = posAttr.getY(i);
                        var vz = posAttr.getZ(i);
                        var vertexNoise =
                            0.82 +
                            Math.sin((i + 1) * 2.17) * 0.16 +
                            Math.cos((i + 3) * 1.31) * 0.09;
                        posAttr.setXYZ(
                            i,
                            vx * vertexNoise * 1.18,
                            vy * vertexNoise * 0.78,
                            vz * vertexNoise * 0.92
                        );
                    }
                    cGeo.computeVertexNormals();

                    var cMat = new THREE.MeshStandardMaterial({
                        map: loadPlanet3DTexture('comet'),
                        color: 0x756a5d,
                        roughness: 1.0,
                        metalness: 0.0,
                        flatShading: true,
                        emissive: 0x17202a,
                        emissiveIntensity: 0.18
                    });
                    var cometMesh = new THREE.Mesh(cGeo, cMat);
                    cometGroup.add(cometMesh);

                    // 2) Small cyan-white coma around the angular nucleus.
                    var cLight = new THREE.PointLight(0xb9f7ff, 0.55, 18);
                    cometGroup.add(cLight);

                    var comaGeo = new THREE.IcosahedronGeometry(0.9, 2);
                    var comaMat = new THREE.MeshBasicMaterial({
                        color: 0xb9f7ff,
                        transparent: true,
                        opacity: 0.11,
                        depthWrite: false,
                        side: THREE.BackSide,
                        blending: THREE.AdditiveBlending
                    });
                    var comaMesh = new THREE.Mesh(comaGeo, comaMat);
                    comaMesh.scale.set(1.05, 0.9, 1.35);
                    cometGroup.add(comaMesh);

                    // 3) Narrow blue ion tail: almost straight and anti-solar.
                    var ionCount = 620;
                    var ionGeo = new THREE.BufferGeometry();
                    var ionPos = new Float32Array(ionCount * 3);
                    var ionColors = new Float32Array(ionCount * 3);
                    var ionProgress = new Float32Array(ionCount);
                    var ionSeedX = new Float32Array(ionCount);
                    var ionSeedY = new Float32Array(ionCount);

                    for (var ionIndex = 0; ionIndex < ionCount; ionIndex++) {
                        var ionP = Math.random();
                        ionProgress[ionIndex] = ionP;
                        ionSeedX[ionIndex] = Math.random() - 0.5;
                        ionSeedY[ionIndex] = Math.random() - 0.5;
                        var ionWidth = 0.06 + Math.pow(ionP, 1.3) * 0.42;
                        ionPos[ionIndex * 3] = ionSeedX[ionIndex] * ionWidth;
                        ionPos[ionIndex * 3 + 1] = ionSeedY[ionIndex] * ionWidth;
                        ionPos[ionIndex * 3 + 2] = 0.45 + ionP * 10.5;
                        ionColors[ionIndex * 3] = 0.25;
                        ionColors[ionIndex * 3 + 1] = 0.82;
                        ionColors[ionIndex * 3 + 2] = 1.0;
                    }

                    ionGeo.setAttribute('position', new THREE.BufferAttribute(ionPos, 3));
                    ionGeo.setAttribute('color', new THREE.BufferAttribute(ionColors, 3));
                    var ionMat = new THREE.PointsMaterial({
                        size: 0.24,
                        vertexColors: true,
                        transparent: true,
                        opacity: 0.58,
                        depthWrite: false,
                        blending: THREE.AdditiveBlending,
                        sizeAttenuation: true
                    });
                    var ionTailParticles = new THREE.Points(ionGeo, ionMat);
                    cometGroup.add(ionTailParticles);

                    // 4) Warm dust tail: wider, slower, and curved opposite the
                    // comet's orbital velocity (local -X direction).
                    var dustCount = 1120;
                    var dustGeo = new THREE.BufferGeometry();
                    var dustPos = new Float32Array(dustCount * 3);
                    var dustColors = new Float32Array(dustCount * 3);
                    var dustProgress = new Float32Array(dustCount);
                    var dustSeedX = new Float32Array(dustCount);
                    var dustSeedY = new Float32Array(dustCount);

                    for (var dustIndex = 0; dustIndex < dustCount; dustIndex++) {
                        var dustP = Math.random();
                        dustProgress[dustIndex] = dustP;
                        dustSeedX[dustIndex] = Math.random() - 0.5;
                        dustSeedY[dustIndex] = Math.random() - 0.5;
                        var dustSpread = 0.16 + Math.pow(dustP, 1.15) * 2.35;
                        dustPos[dustIndex * 3] =
                            -Math.pow(dustP, 1.62) * 5.2 +
                            dustSeedX[dustIndex] * dustSpread;
                        dustPos[dustIndex * 3 + 1] =
                            Math.sin(dustP * Math.PI) * 0.24 +
                            dustSeedY[dustIndex] * dustSpread * 0.62;
                        dustPos[dustIndex * 3 + 2] = 0.32 + dustP * 8.4;
                        var dustFade = 1.0 - dustP * 0.58;
                        dustColors[dustIndex * 3] = 1.0 * dustFade;
                        dustColors[dustIndex * 3 + 1] = 0.78 * dustFade;
                        dustColors[dustIndex * 3 + 2] = 0.46 * dustFade;
                    }

                    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
                    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));
                    var dustMat = new THREE.PointsMaterial({
                        size: 0.34,
                        vertexColors: true,
                        transparent: true,
                        opacity: 0.46,
                        depthWrite: false,
                        blending: THREE.AdditiveBlending,
                        sizeAttenuation: true
                    });
                    var dustTailParticles = new THREE.Points(dustGeo, dustMat);
                    cometGroup.add(dustTailParticles);

                    var cSemiMajor = 650;
                    var cEcc = 0.88;
                    var cFocusOffset = cSemiMajor * cEcc;
                    cometGroup.position.set(cSemiMajor - cFocusOffset, 12, 0);

                    cometMesh.userData = { key: 'comet', data: cometData, semiMajor: cSemiMajor, focusOffset: cFocusOffset, ecc: cEcc };
                    scene.add(cometGroup);
                    celestialBodies['comet'] = {
                        mesh: cometMesh,
                        bodyTiltGroup: cometGroup,
                        comaMesh: comaMesh,
                        comaLight: cLight,
                        ionTail: {
                            particles: ionTailParticles,
                            geometry: ionGeo,
                            progress: ionProgress,
                            seedX: ionSeedX,
                            seedY: ionSeedY
                        },
                        dustTail: {
                            particles: dustTailParticles,
                            geometry: dustGeo,
                            progress: dustProgress,
                            seedX: dustSeedX,
                            seedY: dustSeedY
                        },
                        semiMajor: cSemiMajor,
                        focusOffset: cFocusOffset,
                        ecc: cEcc,
                        orbitAngle: 0.5,
                        data: cometData
                    };

                    // Comet Orbit Line
                    if (state.showOrbits) {
                        var cPts = [];
                        var cSemiMinor = cSemiMajor * Math.sqrt(1 - cEcc * cEcc);
                        for (var k = 0; k <= 128; k++) {
                            var ct = (k / 128) * Math.PI * 2;
                            cPts.push(new THREE.Vector3(Math.cos(ct) * cSemiMajor - cFocusOffset, 12, Math.sin(ct) * cSemiMinor));
                        }
                        var cLineGeo = new THREE.BufferGeometry().setFromPoints(cPts);
                        var cLine = new THREE.LineLoop(cLineGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 }));
                        scene.add(cLine);
                        orbitLines.push(cLine);
                    }
                    } catch (cometError) {
                        // A decorative body must never prevent the complete
                        // Solar System and galaxy backdrop from rendering.
                        console.error('Comet construction error:', cometError);
                    }
                }

                // 3. 🌠 3D Interactive Meteor Shower (Intermittent Flash & Burn-Up Shooting Star Engine)
                var meteorData = window.SOLAR_SYSTEM_DATA.meteor;
                if (meteorData) {
                    var mGroup = new THREE.Object3D();
                    
                    // Single Dynamic Shooting Star Line Mesh (Hidden by default, flashes intermittently!)
                    var starGeo = new THREE.BufferGeometry();
                    var starPositions = new Float32Array(6);
                    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
                    
                    var starMat = new THREE.LineBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0.0, // Hidden by default!
                        blending: THREE.AdditiveBlending,
                        linewidth: 2
                    });
                    var flashStarLine = new THREE.LineSegments(starGeo, starMat);
                    mGroup.add(flashStarLine);

                    // Invisible Click Target Mesh (No ugly circle rendered on screen!)
                    var mHeadGeo = new THREE.SphereGeometry(6.5, 16, 16);
                    var mHeadMat = new THREE.MeshBasicMaterial({ visible: false });
                    var mHeadMesh = new THREE.Mesh(mHeadGeo, mHeadMat);
                    mHeadMesh.position.set(0, 18, 0);
                    mGroup.add(mHeadMesh);

                    mHeadMesh.userData = { key: 'meteor', data: meteorData };
                    scene.add(mGroup);
                    
                    var meteorAnimState = {
                        cooldown: 2.0,
                        isShooting: false,
                        progress: 0.0,
                        startPos: new THREE.Vector3(),
                        endPos: new THREE.Vector3(),
                        starMat: starMat,
                        starGeo: starGeo
                    };

                    celestialBodies['meteor'] = { mesh: mHeadMesh, bodyTiltGroup: mGroup, animState: meteorAnimState, data: meteorData };
                }
            }
        }

        function animate3D() {
            requestAnimationFrame(animate3D);
            var delta = clock ? clock.getDelta() : 0.016;

            if (state.isPlaying) {
                var timeDelta = delta * 0.005 * state.orbitSpeed;
                state.simTimeYears += timeDelta;
                if (simTimeVal) simTimeVal.textContent = state.simTimeYears.toFixed(1) + ' yrs';

                if (celestialBodies['sun'] && celestialBodies['sun'].mesh) {
                    celestialBodies['sun'].mesh.rotation.y += timeDelta * (Math.PI * 2) * 13.5;

                    // ☀️ 3D Sunspot Life Cycle Animation (Birth -> Scale Growth -> Death -> Respawn)
                    var sunObj = celestialBodies['sun'];
                    if (sunObj.sunspotList && sunObj.sunspotList.length > 0) {
                        var realDelta = Math.min(delta, 0.05);
                        var sunR = getBodyScaleRadius('sun');

                        sunObj.sunspotList.forEach(function(spot) {
                            spot.life += realDelta;

                            // Life Cycle Normalized Progress (0.0 -> 1.0)
                            var normLife = spot.life / spot.maxLife;

                            if (normLife >= 1.0) {
                                // Respawn Sunspot to new mid-latitude location!
                                spot.life = 0;
                                spot.maxLife = Math.random() * 10.0 + 8.0;
                                spot.targetScale = Math.random() * 0.6 + 0.7;

                                var isNorth = Math.random() > 0.5;
                                var newLatDeg = (Math.random() * 25 + 10) * (isNorth ? 1 : -1);
                                var newLonDeg = Math.random() * 360;

                                var newLatRad = newLatDeg * (Math.PI / 180);
                                var newLonRad = newLonDeg * (Math.PI / 180);

                                var spotR = sunR * 1.002;
                                var sx = spotR * Math.cos(newLatRad) * Math.cos(newLonRad);
                                var sy = spotR * Math.sin(newLatRad);
                                var sz = spotR * Math.cos(newLatRad) * Math.sin(newLonRad);

                                spot.group.position.set(sx, sy, sz);

                                var normal = new THREE.Vector3(sx, sy, sz).normalize();
                                spot.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
                            } else {
                                // Sine Curve Life Scale (0.0 -> maxScale -> 0.0)
                                var currentScale = Math.sin(normLife * Math.PI) * spot.targetScale;
                                spot.group.scale.set(currentScale, currentScale, currentScale);
                            }
                        });
                    }
                }

                Object.keys(celestialBodies).forEach(function (key) {
                    var b = celestialBodies[key];
                    if (key === 'sun') return;

                    if (key === 'moon') {
                        var earthBody = celestialBodies['earth'];
                        if (earthBody && b.pivot) {
                            // The Moon has its own ecliptic-relative frame centered
                            // on Earth, independent of Earth's axial tilt.
                            b.pivot.position.set(0, 0, 0);

                            var lunarCyclesPerEarthYear = 365.25 / 27.321661;
                            b.orbitAngle = (b.orbitAngle || 0) - timeDelta * (Math.PI * 2) * lunarCyclesPerEarthYear;
                            b.orbitAngle %= (Math.PI * 2);
                            var moonAngle = b.orbitAngle;
                            var visMoonDist = b.orbitRadius || 18.0;

                            if (b.mesh) {
                                b.mesh.position.x = Math.cos(moonAngle) * visMoonDist;
                                b.mesh.position.z = Math.sin(moonAngle) * visMoonDist;
                                // Keep the same lunar hemisphere facing Earth.
                                b.mesh.rotation.y = -moonAngle;
                            }
                        }
                    } else if (key === 'comet') {
                        // ☄️ Kepler 2nd Law: Angular speed increases near Sun (perihelion) and slows down far away (aphelion)
                        var cA = b.semiMajor || 650;
                        var cEcc = b.ecc || 0.88;
                        var cB = cA * Math.sqrt(1 - cEcc * cEcc);
                        var cFo = b.focusOffset || (cA * cEcc);

                        var lastPx = Math.cos(b.orbitAngle || 0.5) * cA - cFo;
                        var lastPz = Math.sin(b.orbitAngle || 0.5) * cB;
                        var distToSun = Math.sqrt(lastPx * lastPx + lastPz * lastPz);
                        
                        // Kepler 2nd Law Speed Factor: Faster near Sun, slower far away!
                        var speedFactor = Math.pow(cA / Math.max(80, distToSun), 1.5);
                        b.orbitAngle = (b.orbitAngle || 0.5) - timeDelta * (Math.PI * 2) * 0.03 * speedFactor;

                        var cPx = Math.cos(b.orbitAngle) * cA - cFo;
                        var cPz = Math.sin(b.orbitAngle) * cB;

                        if (b.bodyTiltGroup) {
                            b.bodyTiltGroup.position.set(cPx, 12, cPz);

                            // 1. 🌟 CSAT Key Point: Comet tail ALWAYS points away from the Sun (Anti-Solar Direction)
                            var dirFromSun = new THREE.Vector3(cPx, 12, cPz).normalize();
                            var targetAngle = Math.atan2(dirFromSun.x, dirFromSun.z);
                            b.bodyTiltGroup.rotation.y = targetAngle;

                            // 2. 🌟 CSAT Key Point: Thermal Sublimation (Comet tail grows near the Sun, shrinks & fades far away)
                            var distToSun = Math.sqrt(cPx * cPx + cPz * cPz);
                            var minSublimationDist = 120; // Near perihelion
                            var maxSublimationDist = 800; // Near aphelion

                            var sublimationFactor = Math.max(0.0, Math.min(1.0, 1.0 - (distToSun - minSublimationDist) / (maxSublimationDist - minSublimationDist)));

                            // 3. 🌟 Dynamic Shimmering & Flowing Particle Tail Engine (Live Particle Flow & Pixel Color Shimmering!)
                            var curTime = clock ? clock.getElapsedTime() : Date.now() * 0.001;

                            if (b.mesh) {
                                b.mesh.rotation.x += delta * 0.32;
                                b.mesh.rotation.y += delta * 0.47;
                            }

                            if (b.comaMesh) {
                                var comaPulse = 1.0 + Math.sin(curTime * 1.2) * 0.025;
                                b.comaMesh.material.opacity = 0.045 + sublimationFactor * 0.12;
                                b.comaMesh.scale.set(
                                    1.05 * comaPulse,
                                    0.9 * comaPulse,
                                    (1.2 + sublimationFactor * 0.28) * comaPulse
                                );
                            }
                            if (b.comaLight) {
                                b.comaLight.intensity = 0.12 + sublimationFactor * 0.58;
                            }

                            if (b.ionTail) {
                                var ionPos = b.ionTail.geometry.attributes.position.array;
                                var ionCol = b.ionTail.geometry.attributes.color.array;
                                var ionCount = b.ionTail.progress.length;

                                for (var ionIndex = 0; ionIndex < ionCount; ionIndex++) {
                                    var ionProgress = (b.ionTail.progress[ionIndex] + delta * (0.18 + sublimationFactor * 0.16)) % 1;
                                    b.ionTail.progress[ionIndex] = ionProgress;

                                    var ionOffset = ionIndex * 3;
                                    var ionWidth = 0.05 + Math.pow(ionProgress, 1.35) * 0.42;
                                    var ionWave = Math.sin(curTime * 1.6 + ionIndex * 0.37) * 0.035 * ionProgress;
                                    ionPos[ionOffset] = b.ionTail.seedX[ionIndex] * ionWidth + ionWave;
                                    ionPos[ionOffset + 1] = b.ionTail.seedY[ionIndex] * ionWidth
                                        + Math.cos(curTime * 1.2 + ionIndex * 0.29) * 0.025 * ionProgress;
                                    ionPos[ionOffset + 2] = 0.45 + ionProgress * 10.5;

                                    var ionFade = 0.55 + 0.45 * (1 - ionProgress);
                                    var ionShimmer = 0.86 + Math.sin(curTime * 2.0 + ionIndex * 0.17) * 0.14;
                                    ionCol[ionOffset] = 0.2 * ionFade * ionShimmer;
                                    ionCol[ionOffset + 1] = 0.82 * ionFade * ionShimmer;
                                    ionCol[ionOffset + 2] = 1.0 * ionFade * ionShimmer;
                                }

                                b.ionTail.geometry.attributes.position.needsUpdate = true;
                                b.ionTail.geometry.attributes.color.needsUpdate = true;
                                b.ionTail.particles.material.opacity = 0.08 + sublimationFactor * 0.5;
                                b.ionTail.particles.scale.set(
                                    0.8 + sublimationFactor * 0.2,
                                    0.8 + sublimationFactor * 0.2,
                                    0.32 + sublimationFactor * 0.88
                                );
                            }

                            if (b.dustTail) {
                                var dustPos = b.dustTail.geometry.attributes.position.array;
                                var dustCol = b.dustTail.geometry.attributes.color.array;
                                var dustCount = b.dustTail.progress.length;

                                for (var dustIndex = 0; dustIndex < dustCount; dustIndex++) {
                                    var dustProgress = (b.dustTail.progress[dustIndex] + delta * (0.07 + sublimationFactor * 0.07)) % 1;
                                    b.dustTail.progress[dustIndex] = dustProgress;

                                    var dustOffset = dustIndex * 3;
                                    var dustSpread = 0.14 + Math.pow(dustProgress, 1.15) * 2.35;
                                    var dustCurve = -Math.pow(dustProgress, 1.62) * 5.2;
                                    dustPos[dustOffset] = dustCurve + b.dustTail.seedX[dustIndex] * dustSpread
                                        + Math.sin(curTime * 0.45 + dustIndex * 0.11) * 0.08 * dustProgress;
                                    dustPos[dustOffset + 1] = Math.sin(dustProgress * Math.PI) * 0.24
                                        + b.dustTail.seedY[dustIndex] * dustSpread * 0.62;
                                    dustPos[dustOffset + 2] = 0.32 + dustProgress * 8.4;

                                    var dustFade = (1 - dustProgress * 0.64)
                                        * (0.9 + Math.sin(curTime * 0.8 + dustIndex * 0.21) * 0.1);
                                    dustCol[dustOffset] = 1.0 * dustFade;
                                    dustCol[dustOffset + 1] = 0.78 * dustFade;
                                    dustCol[dustOffset + 2] = 0.46 * dustFade;
                                }

                                b.dustTail.geometry.attributes.position.needsUpdate = true;
                                b.dustTail.geometry.attributes.color.needsUpdate = true;
                                b.dustTail.particles.material.opacity = 0.05 + sublimationFactor * 0.41;
                                b.dustTail.particles.scale.set(
                                    0.65 + sublimationFactor * 0.35,
                                    0.65 + sublimationFactor * 0.35,
                                    0.28 + sublimationFactor * 0.82
                                );
                            }
                        }
                    } else if (key === 'asteroid') {
                        // 🪐 3D Asteroid Belt Rotation (Living Asteroid Belt Orbiting the Sun!)
                        if (b.mesh) {
                            b.mesh.rotation.y -= timeDelta * (Math.PI * 2) * 0.03;
                        }
                    } else if (key === 'meteor') {
                        // 🌠 Universal Space Meteor Engine (Flashes randomly anywhere across the Solar System!)
                        if (b.bodyTiltGroup && b.animState) {
                            var st = b.animState;
                            if (!st.isShooting) {
                                st.cooldown -= delta;
                                if (st.cooldown <= 0) {
                                    // Trigger a new shooting star anywhere in space!
                                    st.isShooting = true;
                                    st.progress = 0.0;
                                    st.cooldown = Math.random() * 2.5 + 1.5; // Next meteor in 1.5~4.0 seconds

                                    // Pick a random target celestial body or space coordinate (Earth, Mars, Venus, Jupiter, Asteroid Belt, or deep space)
                                    var targets = ['earth', 'mars', 'venus', 'jupiter', 'asteroid', 'sun'];
                                    var randomTargetKey = targets[Math.floor(Math.random() * targets.length)];
                                    var targetBody = celestialBodies[randomTargetKey];

                                    var basePos = new THREE.Vector3(0, 0, 0);
                                    if (targetBody && targetBody.mesh) {
                                        targetBody.mesh.getWorldPosition(basePos);
                                    } else {
                                        basePos.set((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 400);
                                    }

                                    // Anchor mGroup to this space location
                                    b.bodyTiltGroup.position.copy(basePos);

                                    var rx = (Math.random() - 0.5) * 60;
                                    var ry = Math.random() * 25 + 15;
                                    var rz = (Math.random() - 0.5) * 60;
                                    st.startPos.set(rx, ry, rz);

                                    // Random flight trajectory
                                    var tx = rx + (Math.random() - 0.5) * 40;
                                    var ty = ry - Math.random() * 30 - 10;
                                    var tz = rz + (Math.random() - 0.5) * 40;
                                    st.endPos.set(tx, ty, tz);
                                }
                            } else {
                                // 🌟 CSAT UI/UX Rule: Meteor flight speed is ALWAYS constant (Independent of orbitSpeed slider!)
                                var realDelta = Math.min(delta, 0.05); // Fixed real-world time step
                                st.progress += realDelta * 0.45; // Constant 2.2s flight time regardless of orbit speed!
                                if (st.progress >= 1.0) {
                                    st.isShooting = false;
                                    st.starMat.opacity = 0.0; // Disappear into deep space!
                                } else {
                                    var curHead = new THREE.Vector3().lerpVectors(st.startPos, st.endPos, st.progress);
                                    var trailLen = 12.0 * (1.0 - st.progress * 0.4);
                                    var dir = new THREE.Vector3().subVectors(st.endPos, st.startPos).normalize();
                                    var curTail = new THREE.Vector3().subVectors(curHead, dir.clone().multiplyScalar(trailLen));

                                    var pos = st.starGeo.attributes.position.array;
                                    pos[0] = curHead.x; pos[1] = curHead.y; pos[2] = curHead.z;
                                    pos[3] = curTail.x; pos[4] = curTail.y; pos[5] = curTail.z;
                                    st.starGeo.attributes.position.needsUpdate = true;

                                    // Track click hit-box mesh to shooting star head position
                                    if (b.mesh) {
                                        b.mesh.position.copy(curHead);
                                    }

                                    st.starMat.opacity = Math.sin(st.progress * Math.PI) * 0.95;
                                }
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

                        if (b.planetPositionGroup) {
                            b.planetPositionGroup.position.x = px;
                            b.planetPositionGroup.position.z = pz;
                        } else if (b.bodyTiltGroup) {
                            b.bodyTiltGroup.position.x = px;
                            b.bodyTiltGroup.position.z = pz;
                        } else {
                            b.mesh.position.x = px;
                            b.mesh.position.z = pz;
                        }

                        if (state.simMode === '3d') {
                            var selfRate = SELF_ROTATION_RATES[key] || 1.0;
                            b.mesh.rotation.y += timeDelta * (Math.PI * 2) * selfRate;

                            // Animate each planet's representative major moons.
                            if (b.satList && b.satList.length > 0) {
                                b.satList.forEach(function(sat) {
                                    var physicalCyclesPerEarthYear = sat.data.periodDays
                                        ? (365.25 / sat.data.periodDays)
                                        : ((sat.data.speed || 1.0) * 8.0);
                                    // Moon periods span several orders of magnitude.
                                    // Square-root compression keeps the physical
                                    // ordering while leaving direction observable.
                                    var visibleCyclesPerEarthYear = sat.data.periodDays
                                        ? Math.sqrt(physicalCyclesPerEarthYear)
                                        : physicalCyclesPerEarthYear;
                                    var dSat = timeDelta * (Math.PI * 2) * visibleCyclesPerEarthYear;
                                    var isRetrograde = sat.data && sat.data.retrograde;
                                    if (isRetrograde) {
                                        sat.angle -= dSat;
                                    } else {
                                        sat.angle += dSat;
                                    }
                                    sat.pivot.rotation.y = sat.angle;
                                });
                            }
                        }
                    }
                });
            }

            // 🛸 Kartrider-Style 3rd-Person Pursuit Camera System for UFO Explorer
            if (ufoState.active && ufoMesh && camera) {
                var moveSpeed = 2.2 * Math.min(state.orbitSpeed || 1.0, 2.5);

                // Smooth Heading Angle for Kartrider Steering
                if (ufoState.heading === undefined) ufoState.heading = ufoMesh.rotation.y || 0;

                // Kartrider Turning Math
                var turnSpeed = 2.4;
                if (ufoState.keys.left) ufoState.heading += turnSpeed * delta;
                if (ufoState.keys.right) ufoState.heading -= turnSpeed * delta;

                // Heading Vector
                var forwardDir = new THREE.Vector3(-Math.sin(ufoState.heading), 0, -Math.cos(ufoState.heading));

                var isMoving = false;
                if (ufoState.keys.forward) {
                    ufoState.pos.add(forwardDir.clone().multiplyScalar(moveSpeed));
                    isMoving = true;
                }
                if (ufoState.keys.backward) {
                    ufoState.pos.sub(forwardDir.clone().multiplyScalar(moveSpeed * 0.6));
                    isMoving = true;
                }

                ufoMesh.position.copy(ufoState.pos);
                ufoMesh.rotation.y = ufoState.heading;

                // 🚗 Kartrider Pursuit Camera Locked Offset (Always behind & slightly above UFO)
                var camDistance = 38.0; // Fixed distance (No drifting!)
                var camHeight = 18.0;   // Fixed elevation height
                
                var desiredCamPos = ufoState.pos.clone()
                    .sub(forwardDir.clone().multiplyScalar(camDistance))
                    .add(new THREE.Vector3(0, camHeight, 0));

                // Smoothly lerp camera position to avoid jitter
                camera.position.lerp(desiredCamPos, 0.15);

                // Target camera look-at far ahead of UFO so UFO sits locked at bottom 15% of screen!
                var lookAtTarget = ufoState.pos.clone()
                    .add(forwardDir.clone().multiplyScalar(40))
                    .add(new THREE.Vector3(0, 10, 0));
                
                camera.lookAt(lookAtTarget);
                if (controls) {
                    controls.target.copy(lookAtTarget);
                }
            }

            if (controls) controls.update();
            updateGalaxyBackdrop();
            if (renderer && scene && camera) {
                try {
                    renderer.render(scene, camera);
                    update2DLabels();
                } catch (e) {
                    console.error('Render error:', e);
                    reportSimulationError(e);
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
            renderCosmicScaleCanvases();
        }

        function onCanvasClick(event) {
            if (!raycaster || !camera || !scene) return;
            var rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            if (raycaster.params && raycaster.params.Points) {
                raycaster.params.Points.threshold = 12.0; // Responsive 3D click detection for Asteroid Belt particles
            }
            var intersects = raycaster.intersectObjects(scene.children, true);
            for (var i = 0; i < intersects.length; i++) {
                var hitObject = intersects[i].object;
                while (hitObject && (!hitObject.userData || !hitObject.userData.key)) {
                    hitObject = hitObject.parent;
                }
                if (hitObject && hitObject.userData && hitObject.userData.key) {
                    focusCameraOnBody(hitObject.userData.key);
                    break;
                }
            }
        }

        var cameraAnimTimer = null;

        function focusCameraOnBody(key) {
            var bodyObj = celestialBodies[key];
            if (!bodyObj || !bodyObj.mesh) return;
            var worldPos = new THREE.Vector3();
            bodyObj.mesh.getWorldPosition(worldPos);
            var r = getBodyScaleRadius(key);

            var offset = (key === 'sun') ? r * 3.5 : (key === 'asteroid' ? 80.0 : (key === 'comet' ? 35.0 : r * 10.0));
            if (offset < 5) offset = 5;

            var targetCamPos = new THREE.Vector3(
                worldPos.x + offset,
                worldPos.y + offset * 0.4,
                worldPos.z + offset
            );

            if (controls && camera) {
                // Cancel ongoing animation
                if (cameraAnimTimer) clearInterval(cameraAnimTimer);

                var startCamPos = camera.position.clone();
                var startTargetPos = controls.target.clone();
                var progress = 0;
                var duration = 28; // ~0.85s smooth approach animation

                cameraAnimTimer = setInterval(function() {
                    progress += 1;
                    var t = progress / duration;
                    // Ease-out cubic curve for smooth space flight
                    var easeT = 1 - Math.pow(1 - t, 3);

                    camera.position.lerpVectors(startCamPos, targetCamPos, easeT);
                    controls.target.lerpVectors(startTargetPos, worldPos, easeT);
                    controls.update();

                    if (progress >= duration) {
                        clearInterval(cameraAnimTimer);
                        cameraAnimTimer = null;
                        openPlanetModal(key);
                    }
                }, 30);
            } else {
                openPlanetModal(key);
            }
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

        function setUfoTimeAuthority(isTeacher) {
            var locked = ufoState.active && !isTeacher;
            if (playPauseBtn) {
                playPauseBtn.disabled = locked;
                playPauseBtn.classList.toggle('ufo-time-locked', locked);
                playPauseBtn.title = locked ? 'UFO Flight의 시간은 교사가 조작합니다.' : '시뮬레이션 일시정지 / 재생';
            }
            if (speedSlider) {
                speedSlider.disabled = locked;
                speedSlider.classList.toggle('ufo-time-locked', locked);
                speedSlider.title = locked ? 'UFO Flight의 공전 속도는 교사가 조작합니다.' : '';
            }
        }

        function setUfoFlightActive(active) {
            var ufoModeBtn = document.getElementById('ufoModeBtn');
            var ufoControlsPanel = document.getElementById('ufoControlsPanel');
            var ufoRoomStatus = document.getElementById('ufoRoomStatus');
            ufoState.active = active;

            if (active) {
                var roomCode = ufoLobby ? ufoLobby.snapshot().roomCode : '';
                var isTeacher = ufoRoomRole === 'host';
                if (ufoModeBtn) {
                    ufoModeBtn.textContent = '🛸 UFO Flight · ROOM ' + (roomCode || '----');
                    ufoModeBtn.style.background = 'rgba(56, 189, 248, 0.3)';
                    ufoModeBtn.style.color = '#fff';
                }
                if (ufoRoomStatus) {
                    ufoRoomStatus.textContent = isTeacher
                        ? '교사 · 시간 및 공전 속도 조작 가능'
                        : '학생 · 시간은 교사 화면과 동기화';
                }
                if (ufoControlsPanel) ufoControlsPanel.style.display = 'block';
                if (ufoMesh) ufoMesh.visible = true;
                if (camera && controls) {
                    camera.position.set(ufoState.pos.x, ufoState.pos.y + 22, ufoState.pos.z + 75);
                    controls.target.copy(ufoState.pos);
                    controls.update();
                }
                setUfoTimeAuthority(isTeacher);
            } else {
                if (ufoModeBtn) {
                    ufoModeBtn.textContent = '🛸 UFO Flight (방번호 입력)';
                    ufoModeBtn.style.background = 'rgba(56, 189, 248, 0.15)';
                    ufoModeBtn.style.color = '#38bdf8';
                }
                if (ufoControlsPanel) ufoControlsPanel.style.display = 'none';
                if (ufoMesh) ufoMesh.visible = false;
                setUfoTimeAuthority(true);
                if (camera && controls) {
                    controls.target.set(0, 0, 0);
                    camera.position.set(0, 1500, 2000);
                    controls.update();
                }
            }
        }

        function beginUfoTeacherTimeSync() {
            if (ufoTimeSyncTimer) clearInterval(ufoTimeSyncTimer);
            if (!ufoLobby || ufoRoomRole !== 'host') return;
            ufoTimeSyncTimer = setInterval(function () {
                if (!ufoState.active || !ufoLobby) return;
                ufoLobby.broadcast({
                    type: 'UFO_TIME_SYNC',
                    simTimeYears: state.simTimeYears,
                    orbitSpeed: state.orbitSpeed,
                    isPlaying: state.isPlaying
                });
            }, 350);
        }

        function initUfoClassroomLobby() {
            var overlay = document.getElementById('ufoRoomOverlay');
            var closeBtn = document.getElementById('ufoRoomCloseBtn');
            var ufoModeBtn = document.getElementById('ufoModeBtn');
            if (!overlay || !ufoModeBtn) return;

            ufoModeBtn.addEventListener('click', function () {
                overlay.classList.remove('hidden');
            });
            if (closeBtn) closeBtn.addEventListener('click', function () {
                overlay.classList.add('hidden');
            });
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) overlay.classList.add('hidden');
            });

            if (!window.ClassroomMultiplayerLobby) {
                var joinStatus = document.getElementById('ufoJoinStatus');
                if (joinStatus) joinStatus.textContent = '교실 통신 기능을 불러오지 못했습니다.';
                return;
            }

            ufoLobby = window.ClassroomMultiplayerLobby.create({
                gameId: 'solar-system-ufo-flight',
                getPlayerName: function () {
                    return (localStorage.getItem('classPlayerName') || '').trim();
                },
                initialMode: 'guest',
                allowedPlayerCounts: Array.from({ length: 30 }, function (_, index) { return index + 1; }),
                maxPlayers: 30,
                ids: {
                    missingScreen: 'ufoMissingName',
                    lobbyScreen: 'ufoLobbyScreen',
                    savedName: 'ufoSavedName',
                    hostTab: 'ufoHostTab',
                    joinTab: 'ufoJoinTab',
                    hostPane: 'ufoHostPane',
                    joinPane: 'ufoJoinPane',
                    roomCode: 'ufoRoomCode',
                    hostStatus: 'ufoHostStatus',
                    joinCode: 'ufoJoinCode',
                    joinButton: 'ufoJoinBtn',
                    joinStatus: 'ufoJoinStatus',
                    copyButton: 'ufoCopyBtn',
                    playerList: 'ufoLobbyPlayers',
                    guide: 'ufoLobbyGuide',
                    startButton: 'ufoStartBtn'
                },
                getLobbyPresentation: function (info) {
                    return {
                        canStart: info.role === 'host' && info.count >= 1,
                        startText: info.role === 'host' ? 'UFO FLIGHT 시작' : '교사의 시작을 기다리는 중',
                        guideText: info.role === 'host'
                            ? '방번호를 학생들에게 알려주세요. 현재 ' + info.count + '명'
                            : '교사가 비행을 시작하면 자동으로 입장합니다.'
                    };
                },
                createStartData: function () {
                    return {
                        teacherTime: {
                            simTimeYears: state.simTimeYears,
                            orbitSpeed: state.orbitSpeed,
                            isPlaying: state.isPlaying
                        }
                    };
                },
                onStarted: function (session) {
                    ufoRoomRole = session.role;
                    var teacherTime = session.data && session.data.teacherTime;
                    if (session.role !== 'host' && teacherTime) {
                        state.simTimeYears = Number(teacherTime.simTimeYears) || 0;
                        state.orbitSpeed = Number(teacherTime.orbitSpeed) || 1;
                        state.isPlaying = teacherTime.isPlaying !== false;
                        if (speedSlider) speedSlider.value = String(state.orbitSpeed);
                        if (speedValBadge) speedValBadge.textContent = state.orbitSpeed.toFixed(1) + 'x';
                        if (playPauseBtn) playPauseBtn.textContent = state.isPlaying ? '⏸' : '▶';
                    }
                    overlay.classList.add('hidden');
                    setUfoFlightActive(true);
                    beginUfoTeacherTimeSync();
                },
                onGameMessage: function (_senderId, payload) {
                    if (!payload || payload.type !== 'UFO_TIME_SYNC' || ufoRoomRole === 'host') return;
                    state.simTimeYears = Number(payload.simTimeYears) || 0;
                    state.orbitSpeed = Number(payload.orbitSpeed) || 1;
                    state.isPlaying = payload.isPlaying !== false;
                    if (speedSlider) speedSlider.value = String(state.orbitSpeed);
                    if (speedValBadge) speedValBadge.textContent = state.orbitSpeed.toFixed(1) + 'x';
                    if (playPauseBtn) playPauseBtn.textContent = state.isPlaying ? '⏸' : '▶';
                    if (simTimeVal) simTimeVal.textContent = state.simTimeYears.toFixed(1) + ' yrs';
                },
                onAbort: function () {
                    ufoRoomRole = null;
                    setUfoFlightActive(false);
                    overlay.classList.remove('hidden');
                }
            }).mount();
        }

        // ========== UI CONTROLS ==========
        function initSimUIControls() {
            var ufoModeBtn = document.getElementById('ufoModeBtn');
            var ufoControlsPanel = document.getElementById('ufoControlsPanel');
            var ufoUpBtn = document.getElementById('ufoUpBtn');
            var ufoDownBtn = document.getElementById('ufoDownBtn');
            var ufoLeftBtn = document.getElementById('ufoLeftBtn');
            var ufoRightBtn = document.getElementById('ufoRightBtn');

            initUfoClassroomLobby();

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
                        // Disable UFO Flight Mode in the true-distance reality view.
                        if (ufoState.active) {
                            setUfoFlightActive(false);
                        }
                        if (ufoModeBtn) {
                            ufoModeBtn.disabled = true;
                            ufoModeBtn.style.opacity = '0.4';
                            ufoModeBtn.style.cursor = 'not-allowed';
                            ufoModeBtn.title = '리얼리티 모드에서는 UFO Flight를 이용할 수 없습니다.';
                        }

                        if (auInfoCard) auInfoCard.style.display = 'block';
                        simModeLabel.textContent = '🌐 리얼리티 (실제 거리 비율)';
                        simModeLabel.style.color = '#10b981'; // emerald
                        simModeLabel.style.background = 'rgba(16,185,129,0.15)';
                        if(simWarningAlert) {
                            simWarningAlert.textContent = '※ 실제 천문 비율(1:1)에서는 행성들이 1픽셀보다 훨씬 작아져 눈에 보이지 않으므로 한글 텍스트 라벨로 표기됩니다.';
                            simWarningAlert.style.color = '#10b981';
                            simWarningAlert.style.background = 'rgba(16,185,129,0.1)';
                            simWarningAlert.style.border = '1px solid rgba(16,185,129,0.2)';
                        }
                        if (camera && controls) {
                            controls.maxDistance = GALAXY_VIEW.max2DDistance;
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
                            ufoModeBtn.title = '교실 UFO Flight 방번호 입력';
                        }

                        if (auInfoCard) auInfoCard.style.display = 'none';
                        simModeLabel.textContent = '🔭 관찰용 (Log Scale)';
                        simModeLabel.style.color = '#38bdf8'; // sky
                        simModeLabel.style.background = 'rgba(56,189,248,0.15)';
                        if(simWarningAlert) {
                            simWarningAlert.textContent = '※ 이 화면은 교육적 시각화를 위해 거리와 크기가 로그 스케일(Log Scale)로 조절되었습니다.';
                            simWarningAlert.style.color = '#f59e0b';
                            simWarningAlert.style.background = 'rgba(245,158,11,0.1)';
                            simWarningAlert.style.border = '1px solid rgba(245,158,11,0.2)';
                        }
                        if (camera && controls) {
                            controls.maxDistance = GALAXY_VIEW.max3DDistance;
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
            var tabs = document.querySelectorAll('.nav-tabs .nav-tab[data-tab]');
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

        // ========== QUICK BAR (Compact Korean Only Chips) ==========
        function initQuickBar() {
            var bar = document.getElementById('planetQuickBar');
            if (!bar || !window.SOLAR_SYSTEM_DATA) return;
            bar.innerHTML = '';
            
            // All 13 Solar System Bodies (Sun, Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Comet, Meteor)
            var allKeys = ['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'comet', 'meteor'];
            
            allKeys.forEach(function (key) {
                var body = window.SOLAR_SYSTEM_DATA[key];
                if (!body) return;
                var chip = document.createElement('button');
                chip.className = 'planet-chip';
                chip.dataset.key = key;
                chip.style.cssText = 'background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.3); color: #e2e8f0; padding: 4px 10px; border-radius: 18px; font-size: 11.5px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; backdrop-filter: blur(6px);';
                
                chip.addEventListener('mouseenter', function() {
                    chip.style.background = 'rgba(56, 189, 248, 0.25)';
                    chip.style.borderColor = '#38bdf8';
                    chip.style.color = '#fff';
                    chip.style.transform = 'translateY(-2px)';
                });
                chip.addEventListener('mouseleave', function() {
                    chip.style.background = 'rgba(15, 23, 42, 0.85)';
                    chip.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                    chip.style.color = '#e2e8f0';
                    chip.style.transform = 'translateY(0)';
                });

                // Pure Korean Name Only (No long English text in parentheses!)
                chip.textContent = body.name;
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
                var earthMassRatioLabels = {
                    sun: '약 333,000배',
                    mercury: '약 0.055배',
                    venus: '약 0.815배',
                    earth: '1배',
                    moon: '약 0.0123배',
                    mars: '약 0.107배',
                    jupiter: '약 318배',
                    saturn: '약 95.2배',
                    uranus: '약 14.5배',
                    neptune: '약 17.1배',
                    pluto: '약 0.00218배',
                    comet: '매우 작음',
                    meteor: '-',
                    asteroid: '매우 작음'
                };
                var mStr = earthMassRatioLabels[key] || '-';
                var orbStr = body.orbitDays ? (body.orbitDays > 365 ? (body.orbitDays / 365).toFixed(1) + '년' : body.orbitDays + '일') : '-';
                var rotStr = body.rotationDays || '-';
                var gravStr = body.gravityRatio ? (body.gravityRatio + ' G') : '-';
                var radiusRatioStr = '-';
                if (body.radiusKm) {
                    var radiusRatio = body.radiusKm / 6371;
                    var radiusRatioDigits = radiusRatio >= 10 ? 1 :
                        (radiusRatio >= 1 ? 2 :
                        (radiusRatio >= 0.01 ? 3 :
                        (radiusRatio >= 0.0001 ? 5 : 8)));
                    radiusRatioStr = '약 ' + radiusRatio.toFixed(radiusRatioDigits) + '배';
                }

                tableRowsHtml += '<tr class="spec-table-row" data-planet-key="' + key + '" tabindex="0" role="button" aria-label="' + body.name + ' 카드로 이동">' +
                    '<td style="padding:10px 14px; font-weight:800; color:' + (body.color || '#38bdf8') + '; display:flex; align-items:center; gap:8px;">' +
                        '<img src="' + photo + '" style="width:24px; height:24px; border-radius:50%; object-fit:cover; border:1px solid ' + (body.color || '#38bdf8') + ';" />' +
                        body.name +
                    '</td>' +
                    '<td style="padding:10px 14px; color:#94a3b8; font-size:12px;">' + (body.type || '-') + '</td>' +
                    '<td style="padding:10px 14px; font-weight:700; color:#fff;">' + radiusRatioStr + '</td>' +
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
                card.id = 'planet-card-' + key;
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

            if (tableBody) {
                tableBody.innerHTML = tableRowsHtml;
                tableBody.querySelectorAll('.spec-table-row').forEach(function (row) {
                    var key = row.dataset.planetKey;
                    row.addEventListener('click', function () { focusPlanetCard(key); });
                    row.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            focusPlanetCard(key);
                        }
                    });
                });
            }
        }

        function focusPlanetCard(key) {
            var card = document.getElementById('planet-card-' + key);
            if (!card) return;

            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.remove('table-focus');
            void card.offsetWidth;
            card.classList.add('table-focus');
            window.setTimeout(function () { card.classList.remove('table-focus'); }, 1800);
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

            var moonPhaseHeading = Array.from(document.querySelectorAll('.planet-modal h3')).find(function (heading) {
                return heading.textContent.indexOf('달의 위상') !== -1;
            });
            var moonPhaseStudy = moonPhaseHeading ? moonPhaseHeading.parentElement : null;
            if (moonPhaseStudy) {
                moonPhaseStudy.hidden = key !== 'moon';
            }

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
                // Earth Comparison Calculations
                var earthR = 6371;
                var sizeCompareStr = body.radiusKm ? (body.radiusKm === earthR ? '지구와 동일 (1.0배)' : ('지구의 약 ' + (body.radiusKm / earthR).toFixed(2) + '배')) : '-';
                var gravCompareStr = body.gravityRatio ? (body.gravityRatio === 1 ? '지구와 동일 (1.0 G)' : ('지구의 약 ' + body.gravityRatio + '배 (' + body.gravityRatio + ' G)')) : '-';
                
                var ringStr = '없음';
                if (key === 'saturn') ringStr = '✨ 거대 빙설 고리 보유';
                else if (key === 'jupiter') ringStr = '🪐 미세 기체/암석 고리';
                else if (key === 'uranus') ringStr = '🪐 13개 세로 좁은 고리';
                else if (key === 'neptune') ringStr = '🪐 5개 어두운 미세 고리';

                var moonDetailStr = (body.moons !== undefined) ? (body.moons + '개' + (body.satellites && body.satellites.length > 0 ? ' (' + body.satellites.map(function(s){ return s.name; }).join(', ') + ')' : '')) : '-';

                propGrid.style.cssText = 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:12px;width:100%;min-width:0;';
                propGrid.innerHTML =
                    '<div style="background:rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">' +
                        '<div style="font-size:11.5px;color:#cbd5e1;font-weight:700;">📏 지구 대비 크기 (반지름)</div>' +
                        '<div style="font-size:13.5px;font-weight:800;color:#f8fafc;margin-top:2px;">' + sizeCompareStr + '</div>' +
                    '</div>' +
                    '<div style="background:rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">' +
                        '<div style="font-size:11.5px;color:#cbd5e1;font-weight:700;">⚖️ 지구 대비 중력</div>' +
                        '<div style="font-size:13.5px;font-weight:800;color:#38bdf8;margin-top:2px;">' + gravCompareStr + '</div>' +
                    '</div>' +
                    '<div style="background:rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">' +
                        '<div style="font-size:11.5px;color:#cbd5e1;font-weight:700;">🌡️ 평균 표면 온도</div>' +
                        '<div style="font-size:13.5px;font-weight:800;color:#fef08a;margin-top:2px;">' + (body.tempC || '-') + '</div>' +
                    '</div>' +
                    '<div style="background:rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">' +
                        '<div style="font-size:11.5px;color:#cbd5e1;font-weight:700;">🪐 고리(Ring) 보유 유무</div>' +
                        '<div style="font-size:13.5px;font-weight:800;color:#c084fc;margin-top:2px;">' + ringStr + '</div>' +
                    '</div>' +
                    '<div style="background:rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">' +
                        '<div style="font-size:11.5px;color:#cbd5e1;font-weight:700;">🔄 자전 주기</div>' +
                        '<div style="font-size:13.5px;font-weight:800;color:#38bdf8;margin-top:2px;">' + (body.rotationDays || '-') + '</div>' +
                    '</div>' +
                    '<div style="background:rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">' +
                        '<div style="font-size:11.5px;color:#cbd5e1;font-weight:700;">🌙 위성 시스템 및 주요 위성</div>' +
                        '<div style="font-size:13.5px;font-weight:800;color:#34d399;margin-top:2px;">' + moonDetailStr + '</div>' +
                    '</div>';
            }

            document.getElementById('modalDesc').textContent = body.desc;
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

        function makeSpaceQuizOrder(length, previousQuestion) {
            var order = Array.from({ length: length }, function (_, index) { return index; });
            for (var index = order.length - 1; index > 0; index--) {
                var randomIndex = Math.floor(Math.random() * (index + 1));
                var temp = order[index];
                order[index] = order[randomIndex];
                order[randomIndex] = temp;
            }
            if (order.length > 1 && order[0] === previousQuestion) {
                var first = order[0];
                order[0] = order[1];
                order[1] = first;
            }
            return order;
        }

        function loadNewQuizQuestion() {
            if (state.quiz.autoTimer) { clearTimeout(state.quiz.autoTimer); state.quiz.autoTimer = null; }
            state.quiz.answered = false;

            var quizPool = [
                { cat: "태양계의 중심", q: "태양계 전체 질량의 대부분을 차지하며 행성의 공전을 지배하는 천체는?", ans: "태양", opts: ["태양", "목성", "지구", "토성"], exp: "태양은 태양계 전체 질량의 약 99.8%를 차지하며 강한 중력으로 행성과 작은 천체들을 붙잡고 있습니다." },
                { cat: "행성 순서", q: "태양에서 가까운 순서대로 처음 네 행성을 바르게 나열한 것은?", ans: "수성-금성-지구-화성", opts: ["수성-금성-지구-화성", "수성-지구-금성-화성", "금성-수성-화성-지구", "지구-금성-수성-화성"], exp: "태양에서 바깥쪽으로 수성, 금성, 지구, 화성 순이며 이 네 행성은 지구형 행성입니다." },
                { cat: "지구형 vs 목성형", q: "지구형 행성과 비교할 때 목성형 행성의 일반적인 물리적 특징으로 옳은 것은?", ans: "질량과 반지름이 크고 평균 밀도가 작다.", opts: ["질량과 반지름이 크고 평균 밀도가 작다.", "평균 밀도가 크고 자전 속도가 매우 느리다.", "위성의 수가 거의 없거나 적다.", "단단한 암석 표면을 가지고 있다."], exp: "목성형 행성은 가벼운 물질의 비중이 커 질량과 반지름은 크지만 평균 밀도는 비교적 작습니다." },
                { cat: "지구형 행성", q: "지구형 행성에 공통으로 나타나는 특징은?", ans: "크기가 비교적 작고 암석질 표면이 있다.", opts: ["크기가 비교적 작고 암석질 표면이 있다.", "모두 뚜렷한 고리를 가지고 있다.", "대부분 수소와 헬륨으로 이루어져 있다.", "모두 위성이 10개 이상이다."], exp: "수성, 금성, 지구, 화성은 비교적 작고 밀도가 크며 암석과 금속으로 이루어진 고체 표면을 가집니다." },
                { cat: "목성형 행성", q: "목성형 행성에 해당하는 행성만으로 묶인 것은?", ans: "목성·토성·천왕성·해왕성", opts: ["목성·토성·천왕성·해왕성", "화성·목성·토성·천왕성", "지구·화성·목성·토성", "수성·금성·천왕성·해왕성"], exp: "태양계 바깥쪽의 목성, 토성, 천왕성, 해왕성이 목성형 행성으로 분류됩니다." },
                { cat: "공전 주기", q: "태양에서 멀어질수록 행성의 공전 주기는 일반적으로 어떻게 변하는가?", ans: "길어진다.", opts: ["길어진다.", "짧아진다.", "모두 1년으로 같다.", "행성의 크기에만 따라 변한다."], exp: "태양에서 먼 행성일수록 공전 궤도가 크고 공전 속도도 느려지는 경향이 있어 공전 주기가 길어집니다." },
                { cat: "내행성 관측", q: "수성과 금성 같은 내행성을 지상에서 관측할 수 있는 조건으로 옳은 것은?", ans: "해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘", opts: ["해진 직후 서쪽 하늘 또는 해뜨기 직전 동쪽 하늘", "한밤중에 남쪽 하늘", "한밤중에 북쪽 하늘", "하루 중 아무 때나 항상 관측 가능"], exp: "내행성은 지구 궤도 안쪽을 공전하므로 최대 이각 범위 내에서만 관측 가능하여 한밤중에는 볼 수 없고 해질녘 서쪽이나 새벽 동쪽 하늘에서만 관측됩니다." },
                { cat: "내행성 관측", q: "금성이 달처럼 위상 변화를 보이는 까닭은?", ans: "지구보다 안쪽에서 태양을 공전하기 때문에", opts: ["지구보다 안쪽에서 태양을 공전하기 때문에", "금성이 스스로 밝기를 바꾸기 때문에", "지구 그림자가 매달 금성을 가리기 때문에", "금성에 큰 바다가 있기 때문에"], exp: "금성은 내행성이므로 공전 위치에 따라 태양빛을 받는 면을 보는 각도가 달라져 위상이 변합니다." },
                { cat: "역자전 행성", q: "자전 방향이 지구와 반대(시계 방향 / 동->서)이며 자전 주기가 공전 주기보다 긴 행성은?", ans: "금성 (Venus)", opts: ["수성 (Mercury)", "금성 (Venus)", "화성 (Mars)", "목성 (Jupiter)"], exp: "금성은 시계 방향(동->서)으로 역자전하며, 자전 주기(243일)가 공전 주기(224.7일)보다 길어 하루가 1년보다 깁니다." },
                { cat: "수성", q: "수성 표면의 낮과 밤 온도 차가 매우 큰 주된 이유는?", ans: "열을 붙잡아 줄 대기가 거의 없어서", opts: ["열을 붙잡아 줄 대기가 거의 없어서", "태양에서 가장 멀어서", "표면이 모두 얼음으로 덮여서", "자전축이 90° 기울어서"], exp: "수성은 대기가 거의 없어 낮에 받은 열을 저장하거나 밤으로 전달하기 어렵기 때문에 일교차가 매우 큽니다." },
                { cat: "화성", q: "화성이 붉게 보이는 주된 까닭은?", ans: "표면에 산화 철이 많이 있어서", opts: ["표면에 산화 철이 많이 있어서", "붉은 식물이 자라서", "대기가 모두 불꽃으로 이루어져서", "태양빛 중 붉은빛만 방출해서"], exp: "화성의 토양과 먼지에는 녹과 비슷한 산화 철 성분이 많아 붉게 보입니다." },
                { cat: "밀도 특징", q: "평균 밀도가 0.69 g/cm³로 태양계 행성 중 유일하게 물(1.0 g/cm³)보다 밀도가 작아 물에 뜨는 행성은?", ans: "토성 (Saturn)", opts: ["목성 (Jupiter)", "토성 (Saturn)", "천왕성 (Uranus)", "해왕성 (Neptune)"], exp: "토성은 얼음과 가스로 이루어져 평균 밀도가 0.69g/cm³에 불과하여 만약 토성을 담을 거대한 바다가 있다면 물 위에 떠오릅니다." },
                { cat: "행성의 고리", q: "행성의 고리는 주로 무엇으로 이루어져 있는가?", ans: "얼음과 암석의 수많은 작은 조각", opts: ["얼음과 암석의 수많은 작은 조각", "하나의 단단한 원반", "뜨거운 용암 띠", "행성에서 나온 연속적인 빛"], exp: "행성의 고리는 크기가 다양한 얼음과 암석 조각들이 행성 주위를 공전하며 만든 구조입니다." },
                { cat: "자전축 기울기", q: "자전축 기울기가 약 98도로 공전 궤도면에 거의 누운 상태로 공전하는 행성은?", ans: "천왕성 (Uranus)", opts: ["화성 (Mars)", "목성 (Jupiter)", "천왕성 (Uranus)", "해왕성 (Neptune)"], exp: "천왕성은 자전축이 98도 누워 있어서 남극이나 북극이 태양을 직등으로 향한 채 누워서 공전합니다." },
                { cat: "해왕성", q: "태양계의 8개 행성 중 태양에서 가장 멀리 있는 행성은?", ans: "해왕성 (Neptune)", opts: ["토성 (Saturn)", "천왕성 (Uranus)", "해왕성 (Neptune)", "명왕성 (Pluto)"], exp: "현재 행성으로 분류되는 8개 천체 가운데 태양에서 가장 먼 행성은 해왕성입니다. 명왕성은 왜소행성입니다." },
                { cat: "외행성 관측", q: "외행성이 지구에서 보았을 때 한밤중에 남쪽 하늘에서 가장 밝게 관측되는 위치는?", ans: "충 (Opposition)", opts: ["합 (Conjunction)", "충 (Opposition)", "동방 최대 이각", "서방 최대 이각"], exp: "태양-지구-외행성이 일직선상에 놓이는 '충' 위치일 때 외행성은 지구와 가장 가깝고 한밤중 남쪽 하늘에서 가장 밝게 관측됩니다." },
                { cat: "왜소행성 재분류", q: "2006년 국제천문연맹(IAU)에서 명왕성이 행성에서 왜소행성으로 재분류된 결정적 사유는?", ans: "자신의 궤도 주변의 다른 천체를 청소하지 못함", opts: ["태양 주위를 공전하지 않음", "자체 중력으로 구형을 이루지 못함", "자신의 궤도 주변의 다른 천체를 청소하지 못함", "위성을 보유하지 않음"], exp: "명왕성은 태양 공전과 구형 형태는 만족하지만, 카이퍼 벨트에 위치하여 자신의 궤도 주변 천체를 청소(Clear the neighborhood)하지 못해 왜소행성으로 재분류되었습니다." },
                { cat: "자연위성", q: "행성 주위를 공전하는 천체를 부르는 일반적인 명칭은?", ans: "자연위성", opts: ["자연위성", "왜소행성", "유성", "성운"], exp: "달처럼 행성의 중력에 묶여 그 행성 주위를 공전하는 천체를 자연위성이라고 합니다." },
                { cat: "소행성대", q: "태양계의 주 소행성대가 위치한 곳은?", ans: "화성과 목성 궤도 사이", opts: ["수성과 금성 궤도 사이", "지구와 화성 궤도 사이", "화성과 목성 궤도 사이", "천왕성과 해왕성 궤도 사이"], exp: "주 소행성대는 화성과 목성의 공전 궤도 사이에 있으며 많은 암석질 소천체가 태양을 공전합니다." },
                { cat: "혜성의 특성", q: "혜성이 태양에 가까워질수록 길게 형성되는 꼬리의 방향으로 옳은 것은?", ans: "항상 태양의 반대 방향", opts: ["항상 태양의 반대 방향", "항상 태양을 향하는 방향", "혜성의 이동 방향 뒤쪽", "혜성의 자전축 방향"], exp: "혜성의 꼬리는 태양풍과 태양 방사압의 영향을 직접 받아 항상 태양의 반대 방향으로 늘어납니다." },
                { cat: "혜성의 구성", q: "혜성의 핵을 이루는 물질의 조합으로 가장 알맞은 것은?", ans: "얼음·먼지·암석 물질", opts: ["얼음·먼지·암석 물질", "순수한 철과 니켈", "액체 수소만", "뜨거운 플라스마만"], exp: "혜성핵은 여러 종류의 얼음과 먼지, 암석질 물질이 섞인 작은 천체입니다." },
                { cat: "유성과 운석", q: "우주 먼지나 소행성 파편이 지구 대기권에 진입할 때 타지 않고 지표면에 떨어진 잔해를 부르는 명칭은?", ans: "운석 (Meteorite)", opts: ["유성 (Meteor)", "운석 (Meteorite)", "혜성 (Comet)", "왜소행성 (Dwarf Planet)"], exp: "대기 마찰열로 빛을 내며 타고 사라지면 유성(별똥별), 타다 남아서 지표에 떨어진 암석 잔해는 운석이라 부릅니다." },
                { cat: "유성체·유성·운석", q: "우주 공간의 작은 암석 조각이 지구 대기권에 들어와 빛나는 현상은?", ans: "유성 (Meteor)", opts: ["유성 (Meteor)", "운석 (Meteorite)", "위성 (Satellite)", "왜소행성 (Dwarf Planet)"], exp: "우주 공간의 작은 물체가 대기권에 진입해 가열되며 빛나는 현상을 유성이라고 합니다." },
                { cat: "태양계 외곽", q: "해왕성 바깥쪽에서 많은 얼음 천체와 왜소행성이 공전하는 영역은?", ans: "카이퍼 벨트", opts: ["카이퍼 벨트", "주 소행성대", "광구", "밴앨런대"], exp: "카이퍼 벨트는 해왕성 궤도 바깥쪽에 펼쳐진 얼음 소천체의 영역이며 명왕성도 이 영역에 속합니다." }
            ];

            if (!Array.isArray(state.quiz.questionOrder) || state.quiz.questionOrder.length !== quizPool.length) {
                state.quiz.questionOrder = makeSpaceQuizOrder(quizPool.length, state.quiz.previousQuestion);
                state.quiz.questionPosition = 0;
            }

            var displayPosition = state.quiz.questionPosition;
            var qIndexInPool = state.quiz.questionOrder[displayPosition];
            var qObj = quizPool[qIndexInPool];
            state.quiz.currentQuestion = qObj;
            state.quiz.previousQuestion = qIndexInPool;
            state.quiz.questionPosition += 1;
            if (state.quiz.questionPosition >= quizPool.length) {
                state.quiz.questionOrder = null;
                state.quiz.questionPosition = 0;
            }

            var catBadge = document.getElementById('quizCategoryBadge');
            if (catBadge) catBadge.textContent = '[' + qObj.cat + ']';

            var progressText = document.getElementById('quizProgressText');
            if (progressText) progressText.textContent = '문제 ' + (displayPosition + 1) + ' / ' + quizPool.length;

            var qTextEl = document.getElementById('quizQuestionText');
            if (qTextEl) qTextEl.textContent = '🪐 ' + qObj.q;

            var expBox = document.getElementById('quizExpBox');
            if (expBox) expBox.style.display = 'none';

            var optGrid = document.getElementById('quizOptionsGrid');
            if (optGrid) {
                optGrid.innerHTML = '';
                var shuffled = qObj.opts.slice();
                for (var optionIndex = shuffled.length - 1; optionIndex > 0; optionIndex--) {
                    var optionRandomIndex = Math.floor(Math.random() * (optionIndex + 1));
                    var optionTemp = shuffled[optionIndex];
                    shuffled[optionIndex] = shuffled[optionRandomIndex];
                    shuffled[optionRandomIndex] = optionTemp;
                }
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
