/**
 * 2022 개정 교육과정 솔리드 3D 콩팥 & 해부학 정밀 시뮬레이터 (Solid Anatomical Cross-Section Engine)
 * Solid Capped Meshes, Integrated Renal Pyramids, Anatomical Blood Vessels & 360° OrbitControls
 */

(function () {
    'use strict';

    var container, renderer, scene, camera, controls;
    var width, height;
    var isRunning = true;
    var clock = new THREE.Clock();

    var master3DGroup;
    var kidneyWholeMesh, kidneyCutGroup, bloodVesselsGroup;
    var isCutMode = false;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var interactiveMeshes = [];

    var organTitleEl, organStandardEl, organDescEl, organDetailCard;
    var dissectBtn, resetCamBtn, playPauseBtn;

    function init() {
        container = document.getElementById('threeCanvasContainer');
        if (!container || typeof THREE === 'undefined') return;

        width = container.clientWidth || 800;
        height = container.clientHeight || 600;

        // 1. Scene & Camera
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x060914);

        camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
        camera.position.set(0, 0.8, 12);

        // 2. WebGL Renderer with High-Precision Shadows & Antialiasing
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // 3. Orbit Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 3;
        controls.maxDistance = 30;
        controls.target.set(0, 0, 0);

        // 4. Studio Lighting
        setupStudioLighting();

        // 5. Build True Solid Kidney Anatomy
        master3DGroup = new THREE.Group();
        scene.add(master3DGroup);

        buildSolidKidneyAnatomy();

        // 6. Bind DOM & Controls
        bindDOM();
        bindRaycaster();

        window.addEventListener('resize', handleResize);
        animate();
    }

    function setupStudioLighting() {
        var ambient = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambient);

        var hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.55);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        // Key light
        var keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
        keyLight.position.set(10, 15, 14);
        keyLight.castShadow = true;
        scene.add(keyLight);

        // Soft Fill light
        var fillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
        fillLight.position.set(-14, -6, -8);
        scene.add(fillLight);

        // Rim light
        var rimLight = new THREE.DirectionalLight(0xffedd5, 0.6);
        rimLight.position.set(0, 12, -12);
        scene.add(rimLight);

        // Warm Internal Point Light
        var pointLight = new THREE.PointLight(0xf43f5e, 0.5, 12);
        pointLight.position.set(0, 0.5, 2);
        scene.add(pointLight);
    }

    // ------------------------------------------------------------------------
    // Precision Solid Anatomical Kidney Construction
    // ------------------------------------------------------------------------
    function buildSolidKidneyAnatomy() {
        // Texture Generation for Internal Cross Section Plane
        var crossSectionCanvas = document.createElement('canvas');
        crossSectionCanvas.width = 512;
        crossSectionCanvas.height = 512;
        var cctx = crossSectionCanvas.getContext('2d');

        // Outer Cortex (겉질 - 진한 적갈색)
        cctx.fillStyle = '#831843';
        cctx.fillRect(0, 0, 512, 512);

        // Inner Medulla Zone (속질 바탕 - 적색 톤)
        cctx.fillStyle = '#9f1239';
        cctx.beginPath();
        cctx.ellipse(280, 256, 180, 210, 0, 0, Math.PI * 2);
        cctx.fill();

        // 7 Fan-Shaped Renal Pyramids (신원추 부채꼴 주름)
        for (var p = 0; p < 7; p++) {
            var angle = (p / 6 - 0.5) * Math.PI * 0.75;
            var px = 270 + Math.cos(angle) * 110;
            var py = 256 + Math.sin(angle) * 140;

            cctx.save();
            cctx.translate(px, py);
            cctx.rotate(angle);
            cctx.fillStyle = '#4c0519'; // Deep Medulla Crimson
            cctx.beginPath();
            cctx.moveTo(-28, -35);
            cctx.lineTo(28, -35);
            cctx.lineTo(0, 45);
            cctx.closePath();
            cctx.fill();

            // Striations (방사상 세뇨관 선)
            cctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            cctx.lineWidth = 2;
            for (var s = -20; s <= 20; s += 8) {
                cctx.beginPath();
                cctx.moveTo(s, -32);
                cctx.lineTo(0, 40);
                cctx.stroke();
            }
            cctx.restore();
        }

        // Renal Pelvis / Calyces (콩팥깔때기 - 황금빛 점막)
        cctx.fillStyle = '#ca8a04';
        cctx.beginPath();
        cctx.ellipse(140, 256, 60, 90, 0, 0, Math.PI * 2);
        cctx.fill();

        // Renal Hilum vessel origins
        cctx.fillStyle = '#dc2626'; // Artery
        cctx.beginPath();
        cctx.arc(80, 220, 22, 0, Math.PI * 2);
        cctx.fill();

        cctx.fillStyle = '#2563eb'; // Vein
        cctx.beginPath();
        cctx.arc(80, 280, 24, 0, Math.PI * 2);
        cctx.fill();

        var crossSectionTex = new THREE.CanvasTexture(crossSectionCanvas);

        // Materials
        var kidneyOuterMat = new THREE.MeshStandardMaterial({
            color: 0x7f1d1d,
            roughness: 0.22,
            metalness: 0.1
        });

        var crossSectionMat = new THREE.MeshStandardMaterial({
            map: crossSectionTex,
            roughness: 0.3,
            metalness: 0.05,
            side: THREE.DoubleSide
        });

        var arteryMat = new THREE.MeshStandardMaterial({
            color: 0xdc2626,
            roughness: 0.2,
            metalness: 0.15
        });

        var veinMat = new THREE.MeshStandardMaterial({
            color: 0x1d4ed8,
            roughness: 0.2,
            metalness: 0.15
        });

        var ureterMat = new THREE.MeshStandardMaterial({
            color: 0xeab308,
            roughness: 0.25,
            transparent: true,
            opacity: 0.9
        });

        // --------------------------------------------------------------------
        // A. Whole Uncut Kidney (온전한 3D 외형)
        // --------------------------------------------------------------------
        var wholeGeo = new THREE.SphereGeometry(2.4, 36, 32);
        var wPos = wholeGeo.attributes.position;
        for (var wi = 0; wi < wPos.count; wi++) {
            var wx = wPos.getX(wi);
            var wy = wPos.getY(wi);
            var wz = wPos.getZ(wi);
            wy *= 1.45;
            wz *= 0.7;
            if (wx < 0) {
                wx *= 0.65;
                if (Math.abs(wy) < 1.2) wx += Math.cos(wy) * 0.55;
            } else {
                wx *= 1.15;
            }
            wPos.setXYZ(wi, wx, wy, wz);
        }
        wholeGeo.computeVertexNormals();

        kidneyWholeMesh = new THREE.Mesh(wholeGeo, kidneyOuterMat);
        kidneyWholeMesh.position.set(1.4, 0.3, 0);
        kidneyWholeMesh.rotation.z = -0.15;
        master3DGroup.add(kidneyWholeMesh);
        registerInteractive(kidneyWholeMesh, '콩팥 (Kidney) - 신장 외형', '[6과04-05] 혈액 속 노폐물(요소) 여과 및 체액 조절', '체중의 약 0.5%에 불과하지만 심박출량의 20~25%를 공급받아 하루 180L의 원뇨를 생성하고 99%를 재흡수합니다.');

        // --------------------------------------------------------------------
        // B. Solid Half Kidney for Cross-Section Cut Mode
        // --------------------------------------------------------------------
        kidneyCutGroup = new THREE.Group();
        kidneyCutGroup.position.set(1.4, 0.3, 0);
        kidneyCutGroup.rotation.z = -0.15;
        kidneyCutGroup.visible = false;
        master3DGroup.add(kidneyCutGroup);

        // Posterior Curved Shell (후면 둥근 반구)
        var halfGeo = new THREE.SphereGeometry(2.4, 36, 32, 0, Math.PI, 0, Math.PI);
        var hPos = halfGeo.attributes.position;
        for (var hi = 0; hi < hPos.count; hi++) {
            var hx = hPos.getX(hi);
            var hy = hPos.getY(hi);
            var hz = hPos.getZ(hi);
            hy *= 1.45;
            hz *= 0.7;
            if (hx < 0) {
                hx *= 0.65;
                if (Math.abs(hy) < 1.2) hx += Math.cos(hy) * 0.55;
            } else {
                hx *= 1.15;
            }
            hPos.setXYZ(hi, hx, hy, hz);
        }
        halfGeo.computeVertexNormals();

        var halfShellMesh = new THREE.Mesh(halfGeo, kidneyOuterMat);
        halfShellMesh.rotation.y = Math.PI / 2;
        kidneyCutGroup.add(halfShellMesh);

        // Flat Solid Cross-Section Cap Plane (꽉 찬 해부 단면 판)
        var capGeo = new THREE.PlaneGeometry(3.2, 4.8);
        var capMesh = new THREE.Mesh(capGeo, crossSectionMat);
        capMesh.position.set(0.2, 0, 0.02);
        kidneyCutGroup.add(capMesh);
        registerInteractive(capMesh, '콩팥 단면 (겉질, 속질, 신원추, 신우)', '[6과04-05] 사구체(겉질) ➔ 세뇨관(속질) ➔ 콩팥깔때기(신우)', '겉질에는 여과를 담당하는 사구체와 보먼주머니가 모여 있고, 속질에는 세뇨관과 집합관이 뻗어 오줌을 농축합니다.');

        // --------------------------------------------------------------------
        // C. Realistic Anatomical Blood Vessel & Ureter Network
        // --------------------------------------------------------------------
        bloodVesselsGroup = new THREE.Group();
        master3DGroup.add(bloodVesselsGroup);

        // Curving Abdominal Aorta (대동맥 - 자연스러운 곡선)
        var aortaCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.4, 3.8, -0.3),
            new THREE.Vector3(-0.35, 1.5, -0.2),
            new THREE.Vector3(-0.35, -1.5, -0.2),
            new THREE.Vector3(-0.4, -3.8, -0.3)
        ]);
        var aortaMesh = new THREE.Mesh(new THREE.TubeGeometry(aortaCurve, 32, 0.32, 16, false), arteryMat);
        bloodVesselsGroup.add(aortaMesh);

        // Curving Inferior Vena Cava (하대정맥)
        var venaCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.35, 3.8, -0.2),
            new THREE.Vector3(0.35, 1.5, -0.1),
            new THREE.Vector3(0.35, -1.5, -0.1),
            new THREE.Vector3(0.35, -3.8, -0.2)
        ]);
        var venaMesh = new THREE.Mesh(new THREE.TubeGeometry(venaCurve, 32, 0.36, 16, false), veinMat);
        bloodVesselsGroup.add(venaMesh);

        // Branching Renal Artery (신동맥 가지)
        var arteryBranchCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.35, 0.4, -0.2),
            new THREE.Vector3(0.2, 0.35, -0.05),
            new THREE.Vector3(0.8, 0.3, 0.0),
            new THREE.Vector3(1.2, 0.25, 0.0)
        ]);
        var arteryBranch = new THREE.Mesh(new THREE.TubeGeometry(arteryBranchCurve, 20, 0.15, 12, false), arteryMat);
        bloodVesselsGroup.add(arteryBranch);
        registerInteractive(arteryBranch, '신동맥 (Renal Artery)', '[6과04-05] 요소가 많은 동맥혈 유입', '대동맥에서 분지하여 사구체로 혈액을 전달하는 가장 높은 압력의 혈관입니다.');

        // Branching Renal Vein (신정맥 가지)
        var veinBranchCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(1.2, 0.1, 0.1),
            new THREE.Vector3(0.8, 0.15, 0.05),
            new THREE.Vector3(0.35, 0.2, -0.1)
        ]);
        var veinBranch = new THREE.Mesh(new THREE.TubeGeometry(veinBranchCurve, 20, 0.18, 12, false), veinMat);
        bloodVesselsGroup.add(veinBranch);
        registerInteractive(veinBranch, '신정맥 (Renal Vein)', '[6과04-05] 요소가 제거된 가장 맑은 혈액', '사구체 여과와 세뇨관 재흡수를 거쳐 노폐물이 빠져나간 깨끗한 혈액이 하대정맥으로 나갑니다.');

        // Ureter & Bladder
        var ureterCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(1.1, 0.0, 0.0),
            new THREE.Vector3(0.9, -1.6, 0.1),
            new THREE.Vector3(0.35, -3.0, 0.25)
        ]);
        var ureterMesh = new THREE.Mesh(new THREE.TubeGeometry(ureterCurve, 24, 0.11, 10, false), ureterMat);
        bloodVesselsGroup.add(ureterMesh);
        registerInteractive(ureterMesh, '수뇨관 (Ureter)', '[6과04-05] 신우에서 방광으로 오줌 수송', '근육의 연동 운동(꿈틀운동)으로 중력에 무관하게 방광으로 오줌을 보냅니다.');

        // Bladder
        var bladderGeo = new THREE.SphereGeometry(1.0, 24, 20);
        bladderGeo.scale(1.1, 0.9, 1.0);
        var bladderMesh = new THREE.Mesh(bladderGeo, ureterMat);
        bladderMesh.position.set(0, -3.3, 0.25);
        bloodVesselsGroup.add(bladderMesh);
        registerInteractive(bladderMesh, '방광 (Urinary Bladder)', '[6과04-05] 오줌 저장 및 배뇨 중추 조절', '신축성 있는 이행상피 세포로 구성되어 약 400mL까지 오줌을 저장할 수 있습니다.');
    }

    function registerInteractive(mesh, title, standard, desc) {
        mesh.userData = {
            title: title,
            standard: standard,
            desc: desc
        };
        interactiveMeshes.push(mesh);
    }

    function bindRaycaster() {
        container.addEventListener('pointerdown', function (event) {
            var rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(interactiveMeshes, true);

            if (intersects.length > 0) {
                var hit = intersects[0].object;
                while (hit && !hit.userData.title && hit.parent) {
                    hit = hit.parent;
                }
                if (hit && hit.userData && hit.userData.title) {
                    updateOrganInfo(hit.userData.title, hit.userData.standard, hit.userData.desc);
                    smoothFocus(intersects[0].point);
                    if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                }
            }
        });
    }

    function updateOrganInfo(title, standard, desc) {
        if (organTitleEl) organTitleEl.textContent = title;
        if (organStandardEl) organStandardEl.textContent = standard;
        if (organDescEl) organDescEl.textContent = desc;
        if (organDetailCard) organDetailCard.style.display = 'block';
    }

    function smoothFocus(targetPoint) {
        var targetCamPos = targetPoint.clone().add(new THREE.Vector3(0, 0.1, 5.0));
        var startCamPos = camera.position.clone();
        var startTarget = controls.target.clone();
        var p = 0;

        function step() {
            p += 0.06;
            camera.position.lerpVectors(startCamPos, targetCamPos, p);
            controls.target.lerpVectors(startTarget, targetPoint, p);
            controls.update();
            if (p < 1.0) requestAnimationFrame(step);
        }
        step();
    }

    function bindDOM() {
        dissectBtn = document.getElementById('dissectBtn');
        resetCamBtn = document.getElementById('resetCamBtn');
        playPauseBtn = document.getElementById('playPauseBtn');

        organTitleEl = document.getElementById('organTitle');
        organStandardEl = document.getElementById('organStandard');
        organDescEl = document.getElementById('organDesc');
        organDetailCard = document.getElementById('organDetailCard');

        if (dissectBtn) {
            dissectBtn.addEventListener('click', function () {
                isCutMode = !isCutMode;
                dissectBtn.classList.toggle('active', isCutMode);
                dissectBtn.innerHTML = isCutMode ? '<span>✂️</span> 3D 단면 닫기 (외형 보기)' : '<span>🔪</span> 3D 솔리드 단면 절단 (속질 공개)';
                
                kidneyWholeMesh.visible = !isCutMode;
                kidneyCutGroup.visible = isCutMode;

                if (isCutMode) {
                    updateOrganInfo('콩팥 단면 (겉질, 속질, 신원추, 신우)', '[6과04-05] 사구체(겉질) ➔ 세뇨관(속질) ➔ 콩팥깔때기(신우)', '겉질의 사구체에서 여과된 원뇨가 속질의 부채꼴 신원추(세뇨관·집합관)를 거치며 100% 포도당 재흡수와 67배 요소 농축이 일어납니다.');
                } else {
                    updateOrganInfo('콩팥 (Kidney) - 신장 외형', '[6과04-05] 혈액 속 노폐물(요소) 여과 및 체액 조절', '체중의 약 0.5%에 불과하지만 심박출량의 20~25%를 공급받아 하루 180L의 원뇨를 생성하고 99%를 재흡수합니다.');
                }

                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (resetCamBtn) {
            resetCamBtn.addEventListener('click', function () {
                camera.position.set(0, 0.8, 12);
                controls.target.set(0, 0, 0);
                controls.update();
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                isRunning = !isRunning;
                playPauseBtn.innerHTML = isRunning ? '<span>⏸️</span> 일시정지' : '<span>▶️</span> 3D 재생';
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }
    }

    function handleResize() {
        if (!container || !renderer || !camera) return;
        width = container.clientWidth;
        height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
