/**
 * 2022 개정 교육과정 신경계 & 자극-반사 실시간 시뮬레이터
 * High-Resolution Bioluminescent Visuals + 60fps Reflex Race & Eye Optics
 */

(function () {
    'use strict';

    var canvas, ctx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    // High-Resolution Masterpiece Assets
    var scenes = {
        hero: {
            src: '../assets/images/nervous-hero.webp',
            img: null,
            loaded: false
        },
        response: {
            src: '../assets/images/nervous-response.webp',
            img: null,
            loaded: false
        },
        sensory: {
            src: '../assets/images/nervous-sensory.webp',
            img: null,
            loaded: false
        }
    };

    var currentSceneKey = 'hero';

    // Race Simulation State
    var isRacing = false;
    var consciousProgress = 0.0;
    var reflexProgress = 0.0;
    var consciousTimeMs = 0;
    var reflexTimeMs = 0;

    // Eye Optics State
    var targetDist = 50;  // 10 ~ 100cm (원근)
    var lightLevel = 50;  // 10 ~ 100% (명암)

    // Neural Impulses Particle System
    var neuralPulses = [];

    // Hotspots
    var hotspots = {
        hero: [
            { x: 0.50, y: 0.18, r: 45, title: '대뇌 (Cerebrum) - 의식 중추', desc: '감각 정보를 종합하여 판단하고 의식적인 반응 명령을 내립니다. (기억, 추론, 감정)' },
            { x: 0.50, y: 0.40, r: 40, title: '척수 (Spinal Cord) - 무조건 반사 중추', desc: '뇌와 온몸을 잇는 통로이자 뜨거운 것을 만졌을 때 손을 떼는 척수 반사의 중추.' },
            { x: 0.75, y: 0.48, r: 40, title: '말초 신경계 (PNS) - 감각/운동 신경', desc: '온몸의 감각을 중추로 전달하고, 중추의 명령을 반응기(근육)로 전달합니다.' }
        ],
        response: [
            { x: 0.35, y: 0.35, r: 45, title: '의식적 반응 경로 (~250ms)', desc: '자극 ➔ 감각기 ➔ 감각신경 ➔ 척수 ➔ 대뇌(판단) ➔ 척수 ➔ 운동신경 ➔ 반응기(근육)' },
            { x: 0.65, y: 0.65, r: 45, title: '무조건 반사 경로 (~30ms)', desc: '자극 ➔ 감각기 ➔ 감각신경 ➔ 척수(즉시 명령) ➔ 운동신경 ➔ 반응기 (대뇌를 거치지 않아 극도로 빠름)' }
        ],
        sensory: [
            { x: 0.50, y: 0.30, r: 40, title: '눈의 원근 조절 (섬모체-수정체)', desc: '가까운 곳: 섬모체 수축 ➔ 수정체 두꺼워짐 / 먼 곳: 섬모체 이완 ➔ 수정체 얇아짐' },
            { x: 0.50, y: 0.60, r: 40, title: '눈의 명암 조절 (홍채-동공)', desc: '어두운 곳: 동공 확대 / 밝은 곳: 동공 축소' }
        ]
    };

    // DOM Elements
    var sceneBtns, playPauseBtn, startRaceBtn;
    var distSlider, distValEl, lightSlider, lightValEl;
    var consciousTimerEl, reflexTimerEl;
    var organDetailCard, organTitleEl, organDescEl;
    var quizContainerEl;

    function init() {
        canvas = document.getElementById('nervousCanvas');
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
        neuralPulses = [];
        for (var i = 0; i < 40; i++) {
            neuralPulses.push({
                x: 0.3 + Math.random() * 0.4,
                y: 0.15 + Math.random() * 0.7,
                speed: Math.random() * 0.4 + 0.3,
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
            updatePhysics(dt);
        }

        drawScene(time);
        requestAnimationFrame(renderLoop);
    }

    function updatePhysics(dt) {
        if (isRacing) {
            // Conscious path travels longer (to cerebrum) -> takes ~250ms
            consciousProgress += dt * 1.5;
            consciousTimeMs = Math.min(248, Math.round(consciousProgress * 248));
            if (consciousTimerEl) consciousTimerEl.textContent = consciousTimeMs + ' ms';

            // Reflex path is short (spinal reflex) -> takes ~32ms (finishes 8x faster!)
            reflexProgress += dt * 8.5;
            reflexTimeMs = Math.min(32, Math.round(reflexProgress * 32));
            if (reflexTimerEl) reflexTimerEl.textContent = reflexTimeMs + ' ms (초고속!)';

            if (consciousProgress >= 1.0 && reflexProgress >= 1.0) {
                isRacing = false;
            }
        }

        for (var i = 0; i < neuralPulses.length; i++) {
            var np = neuralPulses[i];
            np.pulse += dt * 4;
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

            // Overlay Glowing Neural Pulses
            drawNeuralPulses(dx, dy, dw, dh, time);

            drawHotspots(dx, dy, dw, dh, time);
        } else {
            ctx.fillStyle = '#0a0f1d';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#a855f7';
            ctx.font = 'bold 16px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('자료를 불러오는 중입니다.', width / 2, height / 2);
        }
    }

    function drawNeuralPulses(dx, dy, dw, dh, time) {
        for (var i = 0; i < neuralPulses.length; i++) {
            var np = neuralPulses[i];
            var nx = dx + np.x * dw;
            var ny = dy + np.y * dh;

            ctx.save();
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#c084fc';
            ctx.fillStyle = '#e9d5ff';
            ctx.beginPath();
            ctx.arc(nx, ny, 3.5 + Math.sin(np.pulse) * 1.5, 0, Math.PI * 2);
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
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.75)';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#a855f7';
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.fillRect(sx - 55, sy - 14, 110, 28);
            ctx.strokeStyle = '#a855f7';
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
        startRaceBtn = document.getElementById('startRaceBtn');

        distSlider = document.getElementById('distSlider');
        distValEl = document.getElementById('distVal');
        lightSlider = document.getElementById('lightSlider');
        lightValEl = document.getElementById('lightVal');

        consciousTimerEl = document.getElementById('consciousTimer');
        reflexTimerEl = document.getElementById('reflexTimer');

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

        if (startRaceBtn) {
            startRaceBtn.addEventListener('click', function () {
                isRacing = true;
                consciousProgress = 0.0;
                reflexProgress = 0.0;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (distSlider) {
            distSlider.addEventListener('input', function () {
                targetDist = parseInt(distSlider.value, 10);
                if (distValEl) {
                    distValEl.textContent = targetDist < 30 ? targetDist + 'cm (가까움 ➔ 수정체 두꺼워짐)' : targetDist + 'cm (멂 ➔ 수정체 얇아짐)';
                    distValEl.style.color = targetDist < 30 ? '#c084fc' : '#38bdf8';
                }
            });
        }

        if (lightSlider) {
            lightSlider.addEventListener('input', function () {
                lightLevel = parseInt(lightSlider.value, 10);
                if (lightValEl) {
                    lightValEl.textContent = lightLevel < 40 ? lightLevel + '% (어두움 ➔ 동공 확대)' : lightLevel + '% (밝음 ➔ 동공 축소)';
                    lightValEl.style.color = lightLevel < 40 ? '#facc15' : '#34d399';
                }
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
        var data = ExamData.nervous;
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
