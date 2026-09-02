/**
 * 2022 개정 교육과정 뉴런 시냅스 & 신경전달물질 분자 시뮬레이터
 * High-Resolution AI Bioluminescent Visuals + 60fps Action Potential & Synaptic Transmission
 */

(function () {
    'use strict';

    var canvas, ctx, potentialCanvas, potentialCtx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    // Loaded Masterpiece Image
    var sceneImg = new Image();
    var isImgLoaded = false;
    sceneImg.src = '../assets/images/synapse-hero.jpg';
    sceneImg.onload = function () {
        isImgLoaded = true;
    };

    // Physiological & Molecular State
    var stimulusFreq = 20; // 1 ~ 100 Hz
    var selectedTransmitter = 'dopamine'; // 'dopamine', 'ach', 'serotonin', 'gaba'
    var selectedToxin = 'none'; // 'none', 'botox', 'nerve_gas'
    var membranePotential = -70; // -70 mV resting
    var isFiring = false;
    var fireProgress = 0.0;

    // Particles
    var transmitterMolecules = [];
    var calciumIons = [];
    var postSparks = [];
    var graphHistory = [];

    // Hotspots
    var hotspots = [
        { x: 0.50, y: 0.22, r: 55, title: '축삭 말단 (Presynaptic Terminal)', desc: '활동전위가 도달하면 전압 개폐성 Ca2+ 통로가 열려 칼슘 이온이 유입되고, 시냅스 소포가 세포막과 융합합니다.' },
        { x: 0.44, y: 0.35, r: 40, title: '시냅스 소포 (Synaptic Vesicles)', desc: '도파민, 아세틸콜린 등 신경전달물질을 고농도로 담고 있는 주머니로, 엑소사이토시스(탈과립)로 방출됩니다.' },
        { x: 0.50, y: 0.60, r: 45, title: '시냅스 틈 (Synaptic Cleft)', desc: '약 20nm 두께의 미세한 간극으로, 신경전달물질이 확산하여 시냅스 후 뉴런의 수용체로 이동합니다.' },
        { x: 0.50, y: 0.78, r: 55, title: '시냅스 후 수용체 & 이온 통로', desc: '신경전달물질이 결합하면 Na+ 이온 통로가 열려 나트륨이 유입되며 탈분극(활동전위)이 발생합니다.' }
    ];

    // DOM Elements
    var playPauseBtn, fireStimulusBtn, freqSlider, freqValEl;
    var transmitterBtns, toxinBtns;
    var potentialValEl, organTitleEl, organDescEl, organDetailCard;

    function init() {
        canvas = document.getElementById('synapseCanvas');
        potentialCanvas = document.getElementById('potentialCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        if (potentialCanvas) potentialCtx = potentialCanvas.getContext('2d');

        bindDOM();
        handleResize();
        window.addEventListener('resize', handleResize);

        // Pre-fill graph with resting potential
        for (var i = 0; i < 200; i++) graphHistory.push(-70);

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

        if (potentialCanvas) {
            potentialCanvas.width = potentialCanvas.clientWidth * dpr;
            potentialCanvas.height = potentialCanvas.clientHeight * dpr;
            if (potentialCtx) potentialCtx.scale(dpr, dpr);
        }
    }

    function renderLoop(time) {
        var dt = (time - lastTime) / 1000 || 0.016;
        lastTime = time;

        if (isRunning) {
            updatePhysics(dt);
            updateOscilloscope(dt);
        }

        drawScene(time);
        requestAnimationFrame(renderLoop);
    }

    function triggerActionPotential() {
        if (selectedToxin === 'botox') {
            // Botox blocks vesicle release!
            displayAlert('⚠️ 보톡스(Botox) 작용: 시냅스 소포의 융합 단백질(SNARE)을 파괴하여 신경전달물질 분비를 완벽히 차단합니다! (근육 마비)');
            return;
        }

        isFiring = true;
        fireProgress = 0.0;

        // Spawn Calcium Ions rushing into presynaptic terminal
        for (var c = 0; c < 15; c++) {
            calciumIons.push({
                x: 0.35 + Math.random() * 0.3,
                y: 0.15,
                targetY: 0.35 + Math.random() * 0.15,
                progress: 0,
                speed: Math.random() * 2 + 3
            });
        }

        // Spawn Neurotransmitter Molecules released into cleft
        var color = selectedTransmitter === 'dopamine' ? '#f59e0b' : (selectedTransmitter === 'ach' ? '#38bdf8' : (selectedTransmitter === 'serotonin' ? '#a855f7' : '#ef4444'));
        for (var m = 0; m < 50; m++) {
            transmitterMolecules.push({
                x: 0.42 + (Math.random() - 0.5) * 0.18,
                y: 0.48,
                vx: (Math.random() - 0.5) * 0.08,
                vy: Math.random() * 0.25 + 0.15,
                color: color,
                size: Math.random() * 3 + 2.5,
                alpha: 1.0,
                isBound: false
            });
        }

        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
    }

    function updatePhysics(dt) {
        if (isFiring) {
            fireProgress += dt * 2.0;

            // Action Potential phase calculation
            if (fireProgress < 0.2) {
                // Depolarization (-70 -> +30 mV)
                membranePotential = -70 + (fireProgress / 0.2) * 100;
            } else if (fireProgress < 0.5) {
                // Repolarization (+30 -> -80 mV)
                membranePotential = 30 - ((fireProgress - 0.2) / 0.3) * 110;
            } else if (fireProgress < 0.8) {
                // Hyperpolarization & refractory (-80 -> -70 mV)
                membranePotential = -80 + ((fireProgress - 0.5) / 0.3) * 10;
            } else {
                membranePotential = -70;
                isFiring = false;
            }
        } else {
            membranePotential = -70;
        }

        if (potentialValEl) {
            potentialValEl.textContent = Math.round(membranePotential) + ' mV (' + (membranePotential > 0 ? '탈분극 Depolarization' : (membranePotential < -75 ? '과분극 Hyperpolarization' : '휴지전위 Resting')) + ')';
            potentialValEl.style.color = membranePotential > 0 ? '#38bdf8' : (membranePotential < -75 ? '#a855f7' : '#34d399');
        }

        // Calcium Ions flow
        for (var ci = calciumIons.length - 1; ci >= 0; ci--) {
            var ca = calciumIons[ci];
            ca.progress += dt * ca.speed;
            ca.y = 0.15 + (ca.targetY - 0.15) * Math.min(1.0, ca.progress);
            if (ca.progress >= 1.0) calciumIons.splice(ci, 1);
        }

        // Neurotransmitter diffusion across synaptic gap
        for (var mi = transmitterMolecules.length - 1; mi >= 0; mi--) {
            var mol = transmitterMolecules[mi];
            mol.x += mol.vx * dt;
            mol.y += mol.vy * dt;

            // Reach postsynaptic membrane receptor
            if (mol.y >= 0.70 && !mol.isBound) {
                mol.isBound = true;
                mol.vy = 0;
                // Spawn postsynaptic electrical sparks!
                for (var s = 0; s < 3; s++) {
                    postSparks.push({
                        x: mol.x,
                        y: mol.y + 0.05,
                        vx: (Math.random() - 0.5) * 0.1,
                        vy: Math.random() * 0.15 + 0.1,
                        life: 1.0
                    });
                }
            }

            if (mol.isBound) {
                if (selectedToxin === 'nerve_gas') {
                    // Nerve gas inhibits breakdown -> remains bound!
                    mol.alpha = 1.0;
                } else {
                    mol.alpha -= dt * 0.8; // Breakdown by enzymes / reuptake
                    if (mol.alpha <= 0) transmitterMolecules.splice(mi, 1);
                }
            }
        }

        // Postsynaptic sparks
        for (var si = postSparks.length - 1; si >= 0; si--) {
            var sp = postSparks[si];
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.life -= dt * 2.5;
            if (sp.life <= 0) postSparks.splice(si, 1);
        }
    }

    function updateOscilloscope(dt) {
        if (!potentialCtx || !potentialCanvas) return;
        var pw = potentialCanvas.clientWidth;
        var ph = potentialCanvas.clientHeight;

        graphHistory.push(membranePotential);
        if (graphHistory.length > pw) graphHistory.shift();

        potentialCtx.clearRect(0, 0, pw, ph);

        // Baseline Resting -70 mV Line
        var restingY = ph - ((-70 + 90) / 130) * ph;
        potentialCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        potentialCtx.setLineDash([4, 4]);
        potentialCtx.beginPath();
        potentialCtx.moveTo(0, restingY);
        potentialCtx.lineTo(pw, restingY);
        potentialCtx.stroke();
        potentialCtx.setLineDash([]);

        // 0 mV Threshold Line
        var zeroY = ph - ((0 + 90) / 130) * ph;
        potentialCtx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        potentialCtx.beginPath();
        potentialCtx.moveTo(0, zeroY);
        potentialCtx.lineTo(pw, zeroY);
        potentialCtx.stroke();

        // Membrane Potential Waveform
        potentialCtx.strokeStyle = membranePotential > 0 ? '#38bdf8' : '#34d399';
        potentialCtx.lineWidth = 2.2;
        potentialCtx.shadowBlur = 8;
        potentialCtx.shadowColor = potentialCtx.strokeStyle;

        potentialCtx.beginPath();
        for (var p = 0; p < graphHistory.length; p++) {
            var val = graphHistory[p];
            var py = ph - ((val + 90) / 130) * ph;
            if (p === 0) potentialCtx.moveTo(p, py);
            else potentialCtx.lineTo(p, py);
        }
        potentialCtx.stroke();
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

            // Draw High-Res Masterpiece AI Image
            ctx.drawImage(sceneImg, dx, dy, dw, dh);

            // Overlay Molecular Simulation Particles
            drawMolecularOverlay(dx, dy, dw, dh, time);

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

    function drawMolecularOverlay(dx, dy, dw, dh, time) {
        // 1. Calcium Ions (Glowing Golden-Cyan spheres in presynaptic bulb)
        for (var ci = 0; ci < calciumIons.length; ci++) {
            var ca = calciumIons[ci];
            var cax = dx + ca.x * dw;
            var cay = dy + ca.y * dh;

            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#38bdf8';
            ctx.fillStyle = '#bae6fd';
            ctx.beginPath();
            ctx.arc(cax, cay, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 2. Neurotransmitter Molecules in Synaptic Cleft
        for (var mi = 0; mi < transmitterMolecules.length; mi++) {
            var mol = transmitterMolecules[mi];
            var mx = dx + mol.x * dw;
            var my = dy + mol.y * dh;

            ctx.save();
            ctx.globalAlpha = mol.alpha;
            ctx.shadowBlur = 14;
            ctx.shadowColor = mol.color;
            ctx.fillStyle = mol.color;
            ctx.beginPath();
            ctx.arc(mx, my, mol.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 3. Postsynaptic Receptor Electrical Sparks
        for (var si = 0; si < postSparks.length; si++) {
            var sp = postSparks[si];
            var sx = dx + sp.x * dw;
            var sy = dy + sp.y * dh;

            ctx.save();
            ctx.globalAlpha = sp.life;
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#38bdf8';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(sx - 4, sy - 4);
            ctx.lineTo(sx + 4, sy + 4);
            ctx.moveTo(sx + 4, sy - 4);
            ctx.lineTo(sx - 4, sy + 4);
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
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            // Label Tag Box
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.fillRect(sx - 65, sy - 14, 130, 28);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx - 65, sy - 14, 130, 28);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(s.title.split(' ')[0], sx, sy);
            ctx.restore();
        }
    }

    function displayAlert(msg) {
        if (organTitleEl) organTitleEl.textContent = '약물/독소 반응';
        if (organDescEl) organDescEl.innerHTML = msg;
        if (organDetailCard) organDetailCard.style.display = 'block';
    }

    function bindDOM() {
        playPauseBtn = document.getElementById('playPauseBtn');
        fireStimulusBtn = document.getElementById('fireStimulusBtn');

        freqSlider = document.getElementById('freqSlider');
        freqValEl = document.getElementById('freqVal');

        transmitterBtns = document.querySelectorAll('[data-transmitter]');
        toxinBtns = document.querySelectorAll('[data-toxin]');

        potentialValEl = document.getElementById('potentialVal');
        organDetailCard = document.getElementById('organDetailCard');
        organTitleEl = document.getElementById('organTitle');
        organDescEl = document.getElementById('organDesc');

        if (fireStimulusBtn) {
            fireStimulusBtn.addEventListener('click', triggerActionPotential);
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                isRunning = !isRunning;
                playPauseBtn.innerHTML = isRunning ? '<span>⏸️</span> 일시정지' : '<span>▶️</span> 재생';
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        if (freqSlider) {
            freqSlider.addEventListener('input', function () {
                stimulusFreq = parseInt(freqSlider.value, 10);
                if (freqValEl) freqValEl.textContent = stimulusFreq + ' Hz';
            });
        }

        transmitterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                transmitterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                selectedTransmitter = btn.dataset.transmitter;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });

        toxinBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                toxinBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                selectedToxin = btn.dataset.toxin;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });

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
                        if (organDescEl) organDescEl.textContent = s.desc;
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
