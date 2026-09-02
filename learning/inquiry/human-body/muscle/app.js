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
        // X = Sarcomere Length (1.8 ~ 3.0)
        // A = 1.6 (Constant)
        // I = X - A
        // H = X - 2*(Actin - I/2) = X - 2*Actin + I = X - 2.0 + (X - 1.6) = 2X - 3.6
        var iBand = Math.max(0.2, sarcomereLength - aBandLength);
        var hZone = Math.max(0.0, 2 * sarcomereLength - 3.6);
        var overlap = Math.max(0.0, (aBandLength - hZone) / 2);

        if (lengthValEl) lengthValEl.textContent = sarcomereLength.toFixed(2) + ' μm';
        if (statXEl) statXEl.textContent = sarcomereLength.toFixed(2) + ' μm';
        if (statAEl) statAEl.textContent = aBandLength.toFixed(2) + ' μm (불변)';
        if (statIEl) statIEl.textContent = iBand.toFixed(2) + ' μm';
        if (statHEl) statHEl.textContent = hZone.toFixed(2) + ' μm';
        if (statOverlapEl) statOverlapEl.textContent = (overlap * 2).toFixed(2) + ' μm (증가)';

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

            ctx.drawImage(sceneImg, dx, dy, dw, dh);

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
