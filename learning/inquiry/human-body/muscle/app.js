/**
 * 2022 개정 교육과정 근육 수축 & 액틴-마이오신 활주설 실시간 시뮬레이터
 * High-Resolution AI Visuals + 60fps Sarcomere Telemetry & Cross-Bridge Power Stroke
 */

(function () {
    'use strict';

    var canvas, ctx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    var sceneImg = new Image();
    var isImgLoaded = false;
    sceneImg.src = '../assets/images/muscle-hero.jpg';
    sceneImg.onload = function () {
        isImgLoaded = true;
    };

    // Sarcomere Physical Dimensions (μm)
    var sarcomereLength = 2.4; // 1.8 (Max Contraction) ~ 3.0 (Relaxed)
    var aBandLength = 1.6;     // CONSTANT (Myosin length)
    var actinLength = 1.0;     // CONSTANT (Actin length on each side)
    var isContracting = false;

    // Calcium & ATP Particle Systems
    var caIons = [];
    var atpSparks = [];

    // Hotspots
    var hotspots = [
        { x: 0.10, y: 0.50, r: 45, title: 'Z선 (Z-disc)', desc: '근육 원섬유 마디(근절, Sarcomere)의 양쪽 경계선으로, 수축 시 Z선 사이의 거리가 짧아집니다.' },
        { x: 0.32, y: 0.50, r: 50, title: 'A대 (암대, A-band)', desc: '마이오신 필라멘트가 존재하는 구간으로, <strong>근육이 수축하거나 이완해도 A대의 길이는 절대 변하지 않습니다 (시험 1순위)!</strong>' },
        { x: 0.50, y: 0.50, r: 40, title: 'H대 (H-zone)', desc: 'A대 중 마이오신만 있고 액틴과 겹치지 않는 중심부. 수축 시 액틴이 미끄러져 들어오므로 H대의 길이는 줄어듭니다.' },
        { x: 0.88, y: 0.50, r: 45, title: 'I대 (명대, I-band)', desc: '액틴 필라멘트만 있는 밝은 구간으로, 수축 시 Z선이 당겨지며 I대의 길이가 줄어듭니다.' },
        { x: 0.65, y: 0.40, r: 35, title: '마이오신 머리 (교차 가교)', desc: 'Ca2+이 트로포닌에 결합하고 ATP가 분해(ADP+Pi)될 때 마이오신 머리가 액틴을 끌어당겨 활주(Power Stroke)합니다.' }
    ];

    // DOM Elements
    var playPauseBtn, contractBtn, relaxBtn;
    var lengthSlider, lengthValEl;
    var statXEl, statAEl, statIEl, statHEl, statOverlapEl;
    var organDetailCard, organTitleEl, organDescEl;

    function init() {
        canvas = document.getElementById('muscleCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        bindDOM();
        initParticles();
        handleResize();
        window.addEventListener('resize', handleResize);

        requestAnimationFrame(renderLoop);
    }

    function initParticles() {
        caIons = [];
        for (var c = 0; c < 25; c++) {
            caIons.push({
                x: 0.2 + Math.random() * 0.6,
                y: 0.25 + Math.random() * 0.5,
                vx: (Math.random() - 0.5) * 0.02,
                vy: (Math.random() - 0.5) * 0.02,
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
        var dt = Math.min(0.05, (time - lastTime) / 1000 || 0.016);
        lastTime = time;

        if (isRunning) {
            updatePhysics(dt);
        }

        drawScene(time);
        requestAnimationFrame(renderLoop);
    }

    function updatePhysics(dt) {
        if (isContracting) {
            sarcomereLength -= dt * 0.4;
            if (sarcomereLength <= 1.8) {
                sarcomereLength = 1.8;
                isContracting = false;
            }
            if (lengthSlider) lengthSlider.value = Math.round(sarcomereLength * 100);
        }

        // Calculate Sarcomere Band Dimensions
        // X = 근절 길이 (1.8 ~ 3.0), A = 1.60 (불변), 액틴 한 가닥 = 1.00
        // I = X - A,  I의 한쪽 = (X - A) / 2
        // 한쪽 겹침 = 액틴 - I의 한쪽 = 1.0 - (X - 1.6) / 2
        // H = A - 2*(한쪽 겹침) = 1.6 - 2.0 + (X - 1.6) = X - 2.0
        // H는 A대 안쪽 구간이므로 0 ~ A 범위를 벗어날 수 없다.
        var iBand = Math.max(0.2, sarcomereLength - aBandLength);
        var hZone = Math.max(0.0, Math.min(aBandLength, sarcomereLength - 2.0));
        var overlap = Math.max(0.0, (aBandLength - hZone) / 2);

        if (lengthValEl) lengthValEl.textContent = sarcomereLength.toFixed(2) + ' μm';
        if (statXEl) statXEl.textContent = sarcomereLength.toFixed(2) + ' μm';
        if (statAEl) statAEl.textContent = aBandLength.toFixed(2) + ' μm (불변)';
        if (statIEl) statIEl.textContent = iBand.toFixed(2) + ' μm';
        if (statHEl) statHEl.textContent = hZone.toFixed(2) + ' μm';
        if (statOverlapEl) statOverlapEl.textContent = (overlap * 2).toFixed(2) + ' μm';

        // Particle diffusion
        for (var i = 0; i < caIons.length; i++) {
            var ca = caIons[i];
            ca.x += ca.vx;
            ca.y += ca.vy;
            ca.pulse += dt * 3;
            if (ca.x < 0.2 || ca.x > 0.8) ca.vx *= -1;
            if (ca.y < 0.25 || ca.y > 0.75) ca.vy *= -1;
        }

        // ATP power sparks
        for (var s = atpSparks.length - 1; s >= 0; s--) {
            var sp = atpSparks[s];
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.life -= dt * 2;
            if (sp.life <= 0) atpSparks.splice(s, 1);
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

            // 배경 그림은 눈금이 고정된 설명도라 실제로 미끄러지지 않는다.
            // 흐리게 깔고, 그 위에 근절 길이를 따라 진짜로 움직이는 모형을 그린다.
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.drawImage(sceneImg, dx, dy, dw, dh);
            ctx.restore();

            drawSlidingRig(dx, dy, dw, dh, time);

            // Overlay Sliding Filament Particles & Cross-Bridge Glow
            drawFilamentOverlay(dx, dy, dw, dh, time);

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

    /**
     * 근절 길이에 따라 실제로 미끄러지는 활주설 모형.
     * 마이오신(A대)은 길이가 고정이고, Z선과 액틴만 안쪽으로 들어온다.
     */
    function drawSlidingRig(dx, dy, dw, dh, time) {
        var cx = dx + 0.50 * dw;
        var cy = dy + 0.50 * dh;

        // 1 μm이 몇 픽셀인가. 가장 늘어난 3.0 μm이 화면 너비의 62%가 되게 잡는다.
        var pxPerUm = (0.62 * dw) / 3.0;

        var halfX = (sarcomereLength / 2) * pxPerUm;   // Z선까지 거리
        var halfA = (aBandLength / 2) * pxPerUm;       // A대 절반 (변하지 않음)
        var actinPx = actinLength * pxPerUm;          // 액틴 한 가닥
        var leftZ = cx - halfX;
        var rightZ = cx + halfX;

        var rowTop = cy - 26;
        var rowBottom = cy + 26;
        var halfH = Math.max(0, Math.min(aBandLength, sarcomereLength - 2 * actinLength)) / 2 * pxPerUm;

        ctx.save();

        // 겹치는 구간 — 액틴과 마이오신이 맞물린 곳
        ctx.fillStyle = 'rgba(250, 204, 21, 0.18)';
        ctx.fillRect(cx - halfA, cy - 44, halfA - halfH, 88);
        ctx.fillRect(cx + halfH, cy - 44, halfA - halfH, 88);

        // 마이오신(굵은 필라멘트) — A대. 길이 불변
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(cx - halfA, cy);
        ctx.lineTo(cx + halfA, cy);
        ctx.stroke();

        // 액틴(가는 필라멘트) — Z선에 붙어 안쪽으로 미끄러진다
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 7;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        [rowTop, rowBottom].forEach(function (y) {
            ctx.moveTo(leftZ, y);
            ctx.lineTo(leftZ + actinPx, y);
            ctx.moveTo(rightZ, y);
            ctx.lineTo(rightZ - actinPx, y);
        });
        ctx.stroke();

        // Z선
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(leftZ, cy - 60);
        ctx.lineTo(leftZ, cy + 60);
        ctx.moveTo(rightZ, cy - 60);
        ctx.lineTo(rightZ, cy + 60);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 이름표(핀)를 모형의 실제 위치로 옮긴다. 고정해 두면 근절이 줄어들 때
        // 이름표만 제자리에 남아 엉뚱한 곳을 가리킨다.
        var iHalf = Math.max(0, (halfX - halfA) / 2);
        // 윗줄과 아랫줄로 나눠 이름표가 서로 걹치지 않게 한다
        moveSpot('Z선', leftZ, cy - 92, dx, dy, dw, dh);
        moveSpot('H대', cx, cy - 92, dx, dy, dw, dh);
        moveSpot('마이오신', cx + halfA * 0.95, cy - 92, dx, dy, dw, dh);
        moveSpot('I대', leftZ + iHalf, cy + 92, dx, dy, dw, dh);
        moveSpot('A대', cx, cy + 92, dx, dy, dw, dh);

        ctx.restore();
    }

    /** 핀 하나를 화면 좌표로 옮긴다 (hotspots는 0~1 비율로 저장돼 있다) */
    function moveSpot(head, px, py, dx, dy, dw, dh) {
        for (var i = 0; i < hotspots.length; i++) {
            if (hotspots[i].title.indexOf(head) === 0) {
                hotspots[i].x = (px - dx) / dw;
                hotspots[i].y = (py - dy) / dh;
                return;
            }
        }
    }

    function drawFilamentOverlay(dx, dy, dw, dh, time) {
        // 1. Glowing Ca2+ Ions
        for (var c = 0; c < caIons.length; c++) {
            var ca = caIons[c];
            var cax = dx + ca.x * dw;
            var cay = dy + ca.y * dh;

            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#facc15';
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(cax, cay, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 2. Power Stroke ATP Sparks
        for (var s = 0; s < atpSparks.length; s++) {
            var sp = atpSparks[s];
            var sx = dx + sp.x * dw;
            var sy = dy + sp.y * dh;

            ctx.save();
            ctx.globalAlpha = sp.life;
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#fbbf24';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(sx, sy, 5 * (1.5 - sp.life), 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    function drawHotspots(dx, dy, dw, dh, time) {
        for (var i = 0; i < hotspots.length; i++) {
            var s = hotspots[i];
            var sx = dx + s.x * dw;
            var sy = dy + s.y * dh;
            var pulseR = s.r + Math.sin(time * 0.003 + i) * 4;

            ctx.save();
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.75)';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#f43f5e';
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            // Label Tag Box
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.fillRect(sx - 55, sy - 14, 110, 28);
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx - 55, sy - 14, 110, 28);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(SimEngine.pinLabel(s), sx, sy);
            ctx.restore();
        }
    }

    function bindDOM() {
        playPauseBtn = document.getElementById('playPauseBtn');
        contractBtn = document.getElementById('contractBtn');
        relaxBtn = document.getElementById('relaxBtn');

        lengthSlider = document.getElementById('lengthSlider');
        lengthValEl = document.getElementById('lengthVal');

        statXEl = document.getElementById('statX');
        statAEl = document.getElementById('statA');
        statIEl = document.getElementById('statI');
        statHEl = document.getElementById('statH');
        statOverlapEl = document.getElementById('statOverlap');

        organDetailCard = document.getElementById('organDetailCard');
        organTitleEl = document.getElementById('organTitle');
        organDescEl = document.getElementById('organDesc');

        if (contractBtn) {
            contractBtn.addEventListener('click', function () {
                isContracting = true;
                // Spawn ATP power sparks
                for (var i = 0; i < 15; i++) {
                    atpSparks.push({
                        x: 0.35 + Math.random() * 0.3,
                        y: 0.45 + (Math.random() - 0.5) * 0.15,
                        vx: (Math.random() - 0.5) * 0.05,
                        vy: (Math.random() - 0.5) * 0.05,
                        life: 1.0
                    });
                }
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
            });
        }

        if (relaxBtn) {
            relaxBtn.addEventListener('click', function () {
                sarcomereLength = 3.0;
                isContracting = false;
                if (lengthSlider) lengthSlider.value = 300;
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

        if (lengthSlider) {
            lengthSlider.addEventListener('input', function () {
                sarcomereLength = parseInt(lengthSlider.value, 10) / 100;
                isContracting = false;
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
