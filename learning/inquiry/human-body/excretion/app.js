/**
 * 2022 개정 교육과정 배설계 & 콩팥·네프론 실시간 시뮬레이터 (마스터 에디션)
 * 최고화질 바이오루미네선스 3D 비주얼 + 60fps 실시간 물리 입자 & 네프론 줌 샌드박스
 */

(function () {
    'use strict';

    var canvas, ctx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    // High-Resolution 3D Masterpiece Assets
    var scenes = {
        main: {
            src: '../assets/images/excretion-kidney.webp',
            img: null,
            loaded: false
        },
        path: {
            src: '../assets/images/excretion-path.webp',
            img: null,
            loaded: false
        },
        torso: {
            src: '../assets/images/excretion-hero-v2.webp',
            img: null,
            loaded: false
        }
    };

    var currentSceneKey = 'main';

    // Real-Time Physiological Simulation Variables
    var bloodPressure = 120; // 80 ~ 160 mmHg (사구체 여과압 & 혈류 속도)
    var hydration = 50;      // 10 ~ 100% (수분 섭취량 ➔ 오줌 농도/색상)
    var adhLevel = 50;       // 0 ~ 100% (항이뇨호르몬 ➔ 수분 재흡수율)
    var bladderVolume = 35;  // 0 ~ 100% (방광 오줌 저장량)

    // Dynamic 60fps Particle Systems
    var bloodParticles = [];
    var urineDrops = [];
    var nephronMolecules = [];

    // Interactive Hotspots
    var hotspots = {
        main: [
            { x: 0.44, y: 0.46, r: 42, title: '사구체 & 보먼주머니', standard: '[6과04-05] · [9과14-04]', desc: '사구체의 높은 혈압으로 단백질·혈구를 제외한 물, 포도당, 요소가 보먼주머니로 여과(원뇨)됩니다.' },
            { x: 0.55, y: 0.65, r: 38, title: '세뇨관 (포도당 100% 재흡수)', standard: '[6과04-05] · [9과14-04]', desc: '포도당과 아미노산은 100% 모세혈관으로 능동수송 재흡수되며, ADH에 의해 물이 조절 재흡수됩니다.' },
            { x: 0.20, y: 0.60, r: 35, title: '신동맥 & 신정맥', standard: '[6과04-05]', desc: '신동맥(요소 많음)으로 들어와 여과된 후, 가장 깨끗해진 혈액이 신정맥을 통해 대정맥으로 나갑니다.' },
            { x: 0.75, y: 0.50, r: 45, title: '콩팥 겉질 & 속질 (Kidney)', standard: '[6과04-05]', desc: '신장 1개당 약 100만 개의 네프론이 밀집되어 오줌을 형성하고 체액 삼투압을 조절합니다.' }
        ],
        path: [
            { x: 0.50, y: 0.25, r: 45, title: '1. 사구체 여과 (Filtration)', standard: '[6과04-05] · [9과14-04]', desc: '높은 혈압 차이에 의해 단백질과 혈구를 제외한 물질이 보먼주머니로 이동합니다.' },
            { x: 0.50, y: 0.55, r: 45, title: '2. 세뇨관 재흡수 (Reabsorption)', standard: '[6과04-05] · [9과14-04]', desc: '포도당 100%, 아미노산 100%, 물 99%를 모세혈관으로 능동수송 재흡수합니다.' },
            { x: 0.50, y: 0.80, r: 45, title: '3. 집합관 오줌 농축 (Excretion)', standard: '[6과04-05] · [9과14-04]', desc: '물이 재흡수되어 요소가 67배 고농도로 농축된 최종 오줌이 형성됩니다.' }
        ],
        torso: [
            { x: 0.46, y: 0.38, r: 35, title: '콩팥 (Kidney)', standard: '[6과04-05]', desc: '강낭콩 모양의 배설 기관으로 혈액 속 요소를 걸러 오줌을 만듭니다.' },
            { x: 0.50, y: 0.52, r: 30, title: '수뇨관 (Ureter)', standard: '[6과04-05]', desc: '콩팥에서 생성된 오줌을 꿈틀운동으로 방광으로 수송합니다.' },
            { x: 0.50, y: 0.72, r: 40, title: '방광 (Urinary Bladder)', standard: '[6과04-05]', desc: '오줌을 300~500mL까지 모아두었다가 요도를 통해 배뇨합니다.' }
        ]
    };

    // DOM Elements
    var sceneBtns, playPauseBtn, urinateBtn;
    var bpSlider, bpValEl, hydrationSlider, hydrationValEl, adhSlider, adhValEl;
    var bladderProgressEl, bladderTextEl;
    var organDetailCard, organTitleEl, organStandardEl, organDescEl;
    var quizContainerEl;

    function init() {
        canvas = document.getElementById('excretionCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        // Preload High-Res Masterpiece Images
        Object.keys(scenes).forEach(function (key) {
            var item = scenes[key];
            var img = new Image();
            img.src = item.src;
            img.onload = function () {
                item.img = img;
                item.loaded = true;
            };
        });

        // Initialize Dynamic Particles
        initParticles();

        // Bind DOM & Controls
        bindDOM();
        renderSidebar();

        handleResize();
        window.addEventListener('resize', handleResize);

        // Start 60fps Render Loop
        requestAnimationFrame(renderLoop);
    }

    function initParticles() {
        bloodParticles = [];
        for (var i = 0; i < 45; i++) {
            bloodParticles.push({
                progress: Math.random(),
                side: Math.random() > 0.5 ? 'left' : 'right',
                speed: Math.random() * 0.22 + 0.18,
                type: Math.random() > 0.3 ? 'rbc' : 'urea'
            });
        }

        urineDrops = [];
        for (var u = 0; u < 14; u++) {
            urineDrops.push({
                progress: Math.random(),
                side: Math.random() > 0.5 ? 'left' : 'right',
                speed: Math.random() * 0.18 + 0.22
            });
        }

        nephronMolecules = [];
        for (var m = 0; m < 30; m++) {
            nephronMolecules.push({
                x: 0.82 + Math.random() * 0.12,
                y: 0.44 + Math.random() * 0.12,
                vx: (Math.random() - 0.5) * 0.0025,
                vy: (Math.random() - 0.5) * 0.0025,
                type: Math.random() > 0.65 ? 'glucose' : (Math.random() > 0.35 ? 'urea' : 'protein')
            });
        }
    }

    function handleResize() {
        if (!canvas) return;
        var parent = canvas.parentElement;
        width = parent.clientWidth || 800;
        height = parent.clientHeight || 600;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    function renderLoop(time) {
        var dt = (time - lastTime) / 1000 || 0.016;
        lastTime = time;

        if (isRunning) {
            updatePhysics(dt);
        }

        drawScene(time);
        requestAnimationFrame(renderLoop);
    }

    function updatePhysics(dt) {
        var speedMult = bloodPressure / 120;

        // 1. Blood Flow Animation
        for (var i = 0; i < bloodParticles.length; i++) {
            var bp = bloodParticles[i];
            bp.progress += dt * bp.speed * speedMult;
            if (bp.progress >= 1.0) {
                bp.progress = 0.0;
                bp.side = Math.random() > 0.5 ? 'left' : 'right';
            }
        }

        // 2. Urine Drops & Real-Time Bladder Accumulation
        for (var u = 0; u < urineDrops.length; u++) {
            var drop = urineDrops[u];
            drop.progress += dt * drop.speed * (hydration / 50);
            if (drop.progress >= 1.0) {
                drop.progress = 0.0;
                drop.side = Math.random() > 0.5 ? 'left' : 'right';
                // Accumulate urine in bladder
                bladderVolume = Math.min(100, bladderVolume + 0.22 * (hydration / 50));
                updateBladderUI();
            }
        }

        // 3. Nephron Molecule Diffusion
        for (var m = 0; m < nephronMolecules.length; m++) {
            var mol = nephronMolecules[m];
            mol.x += mol.vx * speedMult;
            mol.y += mol.vy * speedMult;
            if (mol.x < 0.81 || mol.x > 0.95) mol.vx *= -1;
            if (mol.y < 0.42 || mol.y > 0.58) mol.vy *= -1;
        }
    }

    function drawScene(time) {
        ctx.clearRect(0, 0, width, height);

        var current = scenes[currentSceneKey];
        if (current && current.loaded && current.img) {
            var img = current.img;
            var imgAspect = img.width / img.height;
            var canvasAspect = width / height;
            var dw, dh, dx, dy;

            if (canvasAspect > imgAspect) {
                dh = height; dw = height * imgAspect;
                dx = (width - dw) / 2; dy = 0;
            } else {
                dw = width; dh = width / imgAspect;
                dx = 0; dy = (height - dh) / 2;
            }

            // Draw Masterpiece High-Resolution Image
            ctx.drawImage(img, dx, dy, dw, dh);

            // Overlay Real-Time Simulation Physics
            if (currentSceneKey === 'main') {
                drawMainExcretionPhysics(dx, dy, dw, dh, time);
            }

            // Draw Interactive Hotspots
            drawHotspots(dx, dy, dw, dh, time);
        } else {
            ctx.fillStyle = '#0a0f1d';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 16px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('자료를 불러오는 중입니다.', width / 2, height / 2);
        }
    }

    function drawMainExcretionPhysics(dx, dy, dw, dh, time) {
        // 1. Glomerulus & Tubule Filtration Particles
        var gx = dx + 0.44 * dw;
        var gy = dy + 0.46 * dh;

        // Arterial blood stream entering glomerulus
        for (var i = 0; i < 8; i++) {
            var prog = ((time * 0.4 + i * 0.12) % 1.0);
            var px = dx + (0.22 + prog * 0.22) * dw;
            var py = dy + (0.60 - prog * 0.14) * dh;

            ctx.save();
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ef4444';
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 2. ADH-Driven Water & Glucose Reabsorption along Tubule
        var adhRatio = adhLevel / 100; // 0.0 ~ 1.0
        var waterReabsorbCount = Math.round(adhRatio * 12);

        // Water particles (Cyan) reabsorbing into bloodstream when ADH is active
        for (var w = 0; w < waterReabsorbCount; w++) {
            var wprog = ((time * 0.5 + w * 0.08) % 1.0);
            var wx = dx + (0.55 - wprog * 0.15) * dw;
            var wy = dy + (0.65 - Math.sin(wprog * Math.PI) * 0.08) * dh;

            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#38bdf8';
            ctx.fillStyle = '#7dd3fc';
            ctx.beginPath();
            ctx.arc(wx, wy, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Glucose (Green) 100% Reabsorbed back to blood
        for (var g = 0; g < 6; g++) {
            var gprog = ((time * 0.45 + g * 0.15) % 1.0);
            var glx = dx + (0.52 - gprog * 0.12) * dw;
            var gly = dy + (0.58 - Math.sin(gprog * Math.PI) * 0.06) * dh;

            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#10b981';
            ctx.fillStyle = '#34d399';
            ctx.beginPath();
            ctx.arc(glx, gly, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Concentrated Urine (Amber Urea) flowing down
        for (var u = 0; u < urineDrops.length; u++) {
            var drop = urineDrops[u];
            var ux = dx + (0.55 + drop.progress * 0.05) * dw;
            var uy = dy + (0.65 + drop.progress * 0.25) * dh;

            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#facc15';
            ctx.fillStyle = adhRatio > 0.6 ? '#d97706' : '#fef08a';
            ctx.beginPath();
            ctx.arc(ux, uy, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function drawHotspots(dx, dy, dw, dh, time) {
        var spotList = hotspots[currentSceneKey] || [];
        for (var i = 0; i < spotList.length; i++) {
            var s = spotList[i];
            var sx = dx + s.x * dw;
            var sy = dy + s.y * dh;
            var pulseR = s.r + Math.sin(time * 0.003 + i) * 3;

            // Glowing Outer Ring
            ctx.save();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            // Label Tag Box
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.fillRect(sx - 55, sy - 14, 110, 28);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx - 55, sy - 14, 110, 28);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(s.title.split(' ')[0], sx, sy);
            ctx.restore();
        }
    }

    function bindDOM() {
        sceneBtns = document.querySelectorAll('[data-scene]');
        playPauseBtn = document.getElementById('playPauseBtn');
        urinateBtn = document.getElementById('urinateBtn');

        bpSlider = document.getElementById('bpSlider');
        bpValEl = document.getElementById('bpVal');
        hydrationSlider = document.getElementById('hydrationSlider');
        hydrationValEl = document.getElementById('hydrationVal');
        adhSlider = document.getElementById('adhSlider');
        adhValEl = document.getElementById('adhVal');

        bladderProgressEl = document.getElementById('bladderProgress');
        bladderTextEl = document.getElementById('bladderText');

        organDetailCard = document.getElementById('organDetailCard');
        organTitleEl = document.getElementById('organTitle');
        organStandardEl = document.getElementById('organStandard');
        organDescEl = document.getElementById('organDesc');
        quizContainerEl = document.getElementById('quizContainer');

        sceneBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                sceneBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentSceneKey = btn.dataset.scene;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                isRunning = !isRunning;
                playPauseBtn.innerHTML = isRunning ? '<span>⏸️</span> 일시정지' : '<span>▶️</span> 재생';
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (urinateBtn) {
            urinateBtn.addEventListener('click', function () {
                bladderVolume = 0;
                updateBladderUI();
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (bpSlider) {
            bpSlider.addEventListener('input', function () {
                bloodPressure = parseInt(bpSlider.value, 10);
                if (bpValEl) bpValEl.textContent = bloodPressure + ' mmHg';
            });
        }

        if (hydrationSlider) {
            hydrationSlider.addEventListener('input', function () {
                hydration = parseInt(hydrationSlider.value, 10);
                if (hydrationValEl) hydrationValEl.textContent = hydration + ' %';
            });
        }

        if (adhSlider) {
            adhSlider.addEventListener('input', function () {
                adhLevel = parseInt(adhSlider.value, 10);
                if (adhValEl) adhValEl.textContent = adhLevel + ' %';
            });
        }

        // Canvas Pointer Click for Hotspots
        if (canvas) {
            canvas.addEventListener('pointerdown', function (event) {
                var rect = canvas.getBoundingClientRect();
                var clickX = event.clientX - rect.left;
                var clickY = event.clientY - rect.top;

                var current = scenes[currentSceneKey];
                if (!current || !current.loaded || !current.img) return;

                var img = current.img;
                var imgAspect = img.width / img.height;
                var canvasAspect = width / height;
                var dw, dh, dx, dy;

                if (canvasAspect > imgAspect) {
                    dh = height; dw = height * imgAspect;
                    dx = (width - dw) / 2; dy = 0;
                } else {
                    dw = width; dh = width / imgAspect;
                    dx = 0; dy = (height - dh) / 2;
                }

                var spotList = hotspots[currentSceneKey] || [];
                for (var i = 0; i < spotList.length; i++) {
                    var s = spotList[i];
                    var sx = dx + s.x * dw;
                    var sy = dy + s.y * dh;
                    var dist = Math.hypot(clickX - sx, clickY - sy);

                    if (dist <= s.r + 25) {
                        displayHotspotCard(s);
                        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                        break;
                    }
                }
            });
        }

        // Sidebar Tabs
        var tabBtns = document.querySelectorAll('.sidebar-tab-btn');
        var tabPanels = document.querySelectorAll('.sidebar-tab-panel');
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                tabPanels.forEach(function (p) { p.style.display = 'none'; });
                btn.classList.add('active');
                var targetId = 'tabPanel_' + btn.dataset.tab;
                var targetPanel = document.getElementById(targetId);
                if (targetPanel) targetPanel.style.display = 'block';
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });
    }

    function displayHotspotCard(data) {
        if (organTitleEl) organTitleEl.textContent = data.title;
        if (organDescEl) organDescEl.textContent = data.desc;
        if (organDetailCard) organDetailCard.style.display = 'block';
    }

    function updateBladderUI() {
        if (bladderProgressEl) bladderProgressEl.style.width = bladderVolume + '%';
        if (bladderTextEl) bladderTextEl.textContent = Math.round(bladderVolume) + ' % (' + Math.round(bladderVolume * 4) + ' mL)';
    }

    function renderSidebar() {
        if (typeof ExamData === 'undefined') return;
        var data = ExamData.excretion;
        if (!data) return;

        var trapListEl = document.getElementById('examTrapList');
        if (trapListEl) {
            var html = '';
            data.examTraps.forEach(function (t) {
                html += '<div class="exam-trap-box">' +
                    '<div class="exam-trap-badge"><span>⚡</span> ' + t.title + '</div>' +
                    '<div class="exam-trap-text">' + t.desc + '</div></div>';
            });
            trapListEl.innerHTML = html;
        }

        var conceptListEl = document.getElementById('conceptList');
        if (conceptListEl) {
            var html2 = '';
            data.checkpoints.forEach(function (c) {
                html2 += '<li class="concept-item"><span class="icon">📌</span><span>' + c + '</span></li>';
            });
            conceptListEl.innerHTML = html2;
        }

        if (quizContainerEl && data.quizzes && data.quizzes.length > 0 && typeof SimEngine !== 'undefined') {
            SimEngine.renderQuiz(quizContainerEl, data.quizzes[0]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
