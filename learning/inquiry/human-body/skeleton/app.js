/**
 * 2022 개정 교육과정 골격계 & 관절 바이오메카닉스 실시간 시뮬레이터
 * High-Resolution AI Visuals + 60fps Joint ROM & Antagonistic Muscle Mechanics
 */

(function () {
    'use strict';

    var canvas, ctx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    var sceneImg = new Image();
    var isImgLoaded = false;
    sceneImg.src = '../assets/images/skeleton-hero.jpg';
    sceneImg.onload = function () {
        isImgLoaded = true;
    };

    // Joint Biomechanical State
    var jointAngle = 75; // 30° (Max Flexion) ~ 180° (Full Extension)
    var isFlexing = false;

    // Hotspots
    var hotspots = [
        { x: 0.20, y: 0.28, r: 50, title: '위팔뼈 (Humerus)', desc: '팔의 위쪽 뼈로, 이두근과 삼두근이 부착되는 튼튼한 골격 지지대입니다.' },
        { x: 0.42, y: 0.35, r: 45, title: '위팔두갈래근 (이두근, Biceps)', desc: '팔을 굽힐 때 <strong>수축</strong>하여 노뼈를 당겨 올리는 주동근 역할을 합니다.' },
        { x: 0.28, y: 0.45, r: 45, title: '위팔세갈래근 (삼두근, Triceps)', desc: '팔을 굽힐 때 <strong>이완</strong>하고, 팔을 펼 때 <strong>수축</strong>하여 팔을 펴는 길항근입니다.' },
        { x: 0.45, y: 0.65, r: 40, title: '팔꿈치 관절 & 윤활액', desc: '관절 연골이 마찰을 방지하고 윤활액(활액)이 충격을 흡수하여 부드러운 회전을 가능케 합니다.' },
        { x: 0.58, y: 0.55, r: 35, title: '힘줄 (건, Tendon)', desc: '근육을 뼈에 단단히 고정하여 근육의 수축력을 뼈로 전달하는 질긴 결합 조직.' },
        { x: 0.72, y: 0.65, r: 45, title: '노뼈 & 자뼈 (Radius & Ulna)', desc: '아래팔의 2개 뼈로, 이두근이 노뼈(Radius)에 붙어 팔을 회전하고 당깁니다.' }
    ];

    // DOM Elements
    var playPauseBtn, flexBtn, extendBtn;
    var angleSlider, angleValEl;
    var bicepsStatusEl, tricepsStatusEl, romGaugeEl;
    var organDetailCard, organTitleEl, organDescEl;

    function init() {
        canvas = document.getElementById('skeletonCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        bindDOM();
        handleResize();
        window.addEventListener('resize', handleResize);

        requestAnimationFrame(renderLoop);
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
        if (isFlexing) {
            jointAngle -= dt * 45;
            if (jointAngle <= 45) {
                jointAngle = 45;
                isFlexing = false;
            }
            if (angleSlider) angleSlider.value = Math.round(jointAngle);
        }

        var isBicepsContracted = jointAngle < 110;

        if (angleValEl) angleValEl.textContent = Math.round(jointAngle) + '° (' + (jointAngle < 90 ? '굽힘 Flexion' : '폄 Extension') + ')';
        if (romGaugeEl) romGaugeEl.textContent = Math.round(jointAngle) + '°';

        if (bicepsStatusEl) {
            bicepsStatusEl.textContent = isBicepsContracted ? '수축 (Contracted 🔥)' : '이완 (Relaxed)';
            bicepsStatusEl.style.color = isBicepsContracted ? '#f43f5e' : '#94a3b8';
        }

        if (tricepsStatusEl) {
            tricepsStatusEl.textContent = isBicepsContracted ? '이완 (Relaxed)' : '수축 (Contracted 🔥)';
            tricepsStatusEl.style.color = isBicepsContracted ? '#94a3b8' : '#38bdf8';
        }
    }

    function drawScene(time) {
        ctx.clearRect(0, 0, width, height);

        if (isImgLoaded && sceneImg) {
            var imgAspect = sceneImg.width / sceneImg.height;
            var canvasAspect = width / height;
            var dw, dh, dx, dy;

            if (canvasAspect > imgAspect) {
                dh = height; dw = height * imgAspect;
                dx = (width - dw) / 2; dy = 0;
            } else {
                dw = width; dh = width / imgAspect;
                dx = 0; dy = (height - dh) / 2;
            }

            ctx.drawImage(sceneImg, dx, dy, dw, dh);

            // Draw Dynamic Biomechanical HUD Arc
            drawAngleHUD(dx, dy, dw, dh, time);

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

    function drawAngleHUD(dx, dy, dw, dh, time) {
        var elbowX = dx + 0.45 * dw;
        var elbowY = dy + 0.65 * dh;

        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#38bdf8';

        // Joint Range of Motion Arc
        ctx.beginPath();
        var startAngle = -Math.PI * 0.4;
        var endAngle = startAngle + (jointAngle / 180) * Math.PI * 0.8;
        ctx.arc(elbowX, elbowY, 40, startAngle, endAngle);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(jointAngle) + '°', elbowX + 25, elbowY - 20);
        ctx.restore();
    }

    function drawHotspots(dx, dy, dw, dh, time) {
        for (var i = 0; i < hotspots.length; i++) {
            var s = hotspots[i];
            var sx = dx + s.x * dw;
            var sy = dy + s.y * dh;
            var pulseR = s.r + Math.sin(time * 0.003 + i) * 4;

            ctx.save();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 14;
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
        playPauseBtn = document.getElementById('playPauseBtn');
        flexBtn = document.getElementById('flexBtn');
        extendBtn = document.getElementById('extendBtn');

        angleSlider = document.getElementById('angleSlider');
        angleValEl = document.getElementById('angleVal');
        romGaugeEl = document.getElementById('romGauge');

        bicepsStatusEl = document.getElementById('bicepsStatus');
        tricepsStatusEl = document.getElementById('tricepsStatus');

        organDetailCard = document.getElementById('organDetailCard');
        organTitleEl = document.getElementById('organTitle');
        organDescEl = document.getElementById('organDesc');

        if (flexBtn) {
            flexBtn.addEventListener('click', function () {
                isFlexing = true;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
            });
        }

        if (extendBtn) {
            extendBtn.addEventListener('click', function () {
                jointAngle = 170;
                isFlexing = false;
                if (angleSlider) angleSlider.value = 170;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                isRunning = !isRunning;
                playPauseBtn.innerHTML = isRunning ? '<span>⏸️</span> 일시정지' : '<span>▶️</span> 재생';
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (angleSlider) {
            angleSlider.addEventListener('input', function () {
                jointAngle = parseInt(angleSlider.value, 10);
                isFlexing = false;
            });
        }

        if (canvas) {
            canvas.addEventListener('pointerdown', function (event) {
                var rect = canvas.getBoundingClientRect();
                var clickX = event.clientX - rect.left;
                var clickY = event.clientY - rect.top;

                if (!isImgLoaded || !sceneImg) return;

                var imgAspect = sceneImg.width / sceneImg.height;
                var canvasAspect = width / height;
                var dw, dh, dx, dy;

                if (canvasAspect > imgAspect) {
                    dh = height; dw = height * imgAspect;
                    dx = (width - dw) / 2; dy = 0;
                } else {
                    dw = width; dh = width / imgAspect;
                    dx = 0; dy = (height - dh) / 2;
                }

                for (var i = 0; i < hotspots.length; i++) {
                    var s = hotspots[i];
                    var sx = dx + s.x * dw;
                    var sy = dy + s.y * dh;
                    var dist = Math.hypot(clickX - sx, clickY - sy);

                    if (dist <= s.r + 25) {
                        if (organTitleEl) organTitleEl.textContent = s.title;
                        if (organDescEl) organDescEl.innerHTML = s.desc;
                        if (organDetailCard) organDetailCard.style.display = 'block';
                        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                        break;
                    }
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
