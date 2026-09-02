/**
 * 2022 개정 교육과정 호흡계 & 가로막·폐포 실시간 시뮬레이터
 * High-Resolution Bioluminescent Visuals + 60fps Boyle's Law Diaphragm & Alveoli Gas Diffusion
 */

(function () {
    'use strict';

    var canvas, ctx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    // High-Resolution Masterpiece Assets
    var scenes = {
        alveoli: {
            src: '../assets/images/respiration-alveoli.webp',
            img: null,
            loaded: false
        },
        airway: {
            src: '../assets/images/respiration-airway.webp',
            img: null,
            loaded: false
        },
        hero: {
            src: '../assets/images/respiration-hero.webp',
            img: null,
            loaded: false
        }
    };

    var currentSceneKey = 'alveoli';

    // Real-Time Physical & Physiological State
    var diaphragmPosition = 50; // 0 (Up/Exhale) ~ 100 (Down/Inhale)
    var breathRate = 16;        // 10 ~ 40 breaths/min
    var thoracicPressure = 760; // 757 ~ 763 mmHg

    // Particle Systems
    var gasParticles = [];

    // Hotspots
    var hotspots = {
        alveoli: [
            { x: 0.35, y: 0.35, r: 50, title: '폐포 (Alveoli) - 기체 교환 표면', desc: '약 3~5억 개로 총 표면적이 약 100㎡(테니스 코트 크기)에 달해 모세혈관과의 기체 교환 효율을 극대화합니다.' },
            { x: 0.65, y: 0.65, r: 45, title: '모세혈관망 & 산소/이산화탄소 확산', desc: '분압차에 의한 확산으로 에너지를 쓰지 않고 산소는 혈액으로($104 \rightarrow 40$), 이산화탄소는 폐포로($46 \rightarrow 40\text{ mmHg}$) 이동합니다.' }
        ],
        airway: [
            { x: 0.50, y: 0.25, r: 40, title: '기관 (Trachea)', desc: '안쪽에 섬모와 점액이 있어 먼지와 세균을 걸러내는 원통형 기도.' },
            { x: 0.50, y: 0.55, r: 45, title: '기관지 분지 (Bronchi Tree)', desc: '좌우 폐로 갈라져 수많은 세기관지로 뻗어 나가는 통로.' }
        ],
        hero: [
            { x: 0.50, y: 0.45, r: 50, title: '가로막 & 갈비뼈 호흡 운동', desc: '들숨: 가로막 하강 + 갈비뼈 상승 ➔ 흉강 부피 증가 ➔ 흉강 내압 감소 ➔ 공기 유입(보일 법칙).' }
        ]
    };

    // DOM Elements
    var sceneBtns, playPauseBtn;
    var diaphragmSlider, diaphragmValEl, rateSlider, rateValEl;
    var organDetailCard, organTitleEl, organDescEl;
    var statPressureEl, statVolumeEl;
    var quizContainerEl;

    function init() {
        canvas = document.getElementById('respirationCanvas');
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

        initParticles();
        bindDOM();
        renderSidebar();

        handleResize();
        window.addEventListener('resize', handleResize);

        requestAnimationFrame(renderLoop);
    }

    function initParticles() {
        gasParticles = [];
        for (var i = 0; i < 50; i++) {
            gasParticles.push({
                x: 0.25 + Math.random() * 0.55,
                y: 0.25 + Math.random() * 0.55,
                vx: (Math.random() - 0.5) * 0.002,
                vy: (Math.random() - 0.5) * 0.002,
                type: Math.random() > 0.5 ? 'o2' : 'co2',
                pulse: Math.random() * Math.PI * 2
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
            updatePhysics(dt, time);
        }

        drawScene(time);
        requestAnimationFrame(renderLoop);
    }

    function updatePhysics(dt, time) {
        // Automatic breathing oscillation
        var breathCycle = (time * 0.001 * (breathRate / 60) * Math.PI * 2);
        var autoWave = (Math.sin(breathCycle) + 1) / 2; // 0 ~ 1

        // Boyle's law pressure calculation
        thoracicPressure = 760 - (diaphragmPosition - 50) * 0.12;

        if (statPressureEl) {
            statPressureEl.textContent = thoracicPressure.toFixed(1) + ' mmHg (' + (thoracicPressure < 760 ? '대기압보다 낮음 ➔ 들숨' : '대기압보다 높음 ➔ 날숨') + ')';
            statPressureEl.style.color = thoracicPressure < 760 ? '#38bdf8' : '#f59e0b';
        }

        // Particle brownian gas diffusion
        for (var i = 0; i < gasParticles.length; i++) {
            var g = gasParticles[i];
            g.x += g.vx;
            g.y += g.vy;
            g.pulse += dt * 3;

            if (g.x < 0.2 || g.x > 0.85) g.vx *= -1;
            if (g.y < 0.2 || g.y > 0.85) g.vy *= -1;
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

            ctx.drawImage(img, dx, dy, dw, dh);

            // Overlay Gas Particles
            drawGasDiffusionOverlay(dx, dy, dw, dh, time);

            drawHotspots(dx, dy, dw, dh, time);
        } else {
            ctx.fillStyle = '#0a0f1d';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#06b6d4';
            ctx.font = 'bold 16px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('자료를 불러오는 중입니다.', width / 2, height / 2);
        }
    }

    function drawGasDiffusionOverlay(dx, dy, dw, dh, time) {
        for (var i = 0; i < gasParticles.length; i++) {
            var g = gasParticles[i];
            var gx = dx + g.x * dw;
            var gy = dy + g.y * dh;

            ctx.save();
            if (g.type === 'o2') {
                ctx.fillStyle = '#38bdf8'; // O2 Oxygen (Cyan/Blue)
                ctx.shadowColor = '#38bdf8';
                ctx.shadowBlur = 10;
            } else {
                ctx.fillStyle = '#f43f5e'; // CO2 (Reddish Violet)
                ctx.shadowColor = '#f43f5e';
                ctx.shadowBlur = 10;
            }

            ctx.beginPath();
            ctx.arc(gx, gy, 4.5, 0, Math.PI * 2);
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
            var pulseR = s.r + Math.sin(time * 0.003 + i) * 4;

            ctx.save();
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.75)';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#06b6d4';
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.fillRect(sx - 55, sy - 14, 110, 28);
            ctx.strokeStyle = '#06b6d4';
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

        diaphragmSlider = document.getElementById('diaphragmSlider');
        diaphragmValEl = document.getElementById('diaphragmVal');
        rateSlider = document.getElementById('rateSlider');
        rateValEl = document.getElementById('rateVal');

        statPressureEl = document.getElementById('statPressure');
        statVolumeEl = document.getElementById('statVolume');

        organDetailCard = document.getElementById('organDetailCard');
        organTitleEl = document.getElementById('organTitle');
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

        if (diaphragmSlider) {
            diaphragmSlider.addEventListener('input', function () {
                diaphragmPosition = parseInt(diaphragmSlider.value, 10);
                if (diaphragmValEl) {
                    diaphragmValEl.textContent = diaphragmPosition > 50 ? '하강 (들숨 Inhale)' : '상승 (날숨 Exhale)';
                    diaphragmValEl.style.color = diaphragmPosition > 50 ? '#38bdf8' : '#f59e0b';
                }
            });
        }

        if (rateSlider) {
            rateSlider.addEventListener('input', function () {
                breathRate = parseInt(rateSlider.value, 10);
                if (rateValEl) rateValEl.textContent = breathRate + ' 회/분';
            });
        }

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

    function renderSidebar() {
        if (typeof ExamData === 'undefined') return;
        var data = ExamData.respiration;
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
