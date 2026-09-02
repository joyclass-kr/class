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
        synapse: {
            src: '../assets/images/synapse-hero.jpg',
            img: null,
            loaded: false
        },
        sensory: {
            src: '../assets/images/nervous-eye.jpg',
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

    // Synapse Molecular State
    var isSynapseFiring = false;
    var synapseProgress = 0.0;
    var calciumIons = [];
    var transmitterMolecules = [];
    var postSparks = [];

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
        synapse: [
            { x: 0.50, y: 0.22, r: 45, title: '축삭 말단 (Presynaptic Terminal)', desc: '활동전위 도달 시 전압 개폐성 Ca2+ 통로가 열려 칼슘 이온이 유입되고, 시냅스 소포가 세포막과 융합합니다.' },
            { x: 0.44, y: 0.35, r: 40, title: '시냅스 소포 (Synaptic Vesicles)', desc: '도파민, 아세틸콜린 등 신경전달물질을 담고 있으며 탈과립(엑소사이토시스)으로 분비됩니다.' },
            { x: 0.50, y: 0.60, r: 40, title: '시냅스 틈 (Synaptic Cleft)', desc: '약 20nm 두께의 미세 간극으로, 신경전달물질이 확산하여 수용체로 이동합니다.' },
            { x: 0.50, y: 0.78, r: 45, title: '시냅스 후 수용체 (Receptors)', desc: '신경전달물질이 결합하면 Na+ 이온 통로가 열려 탈분극(+30mV 활동전위)이 전파됩니다.' }
        ],
        sensory: [
            { x: 0.74, y: 0.50, r: 35, title: '각막 & 동공 (Cornea & Pupil)', desc: '빛이 눈으로 들어오는 첫 관문이자 창문. 빛의 양에 따라 동공 크기가 조절됩니다.' },
            { x: 0.70, y: 0.38, r: 35, title: '홍채 (Iris) - 명암 조절', desc: '밝은 곳: 홍채 확장 ➔ 동공 축소 / 어두운 곳: 홍채 수축 ➔ 동공 확대.' },
            { x: 0.64, y: 0.50, r: 40, title: '수정체 (Crystalline Lens) - 원근 굴절', desc: '볼록렌즈 형태로 빛을 굴절시켜 망막에 상을 맺히게 합니다. 가까운 곳은 두꺼워지고 먼 곳은 얇아집니다.' },
            { x: 0.66, y: 0.28, r: 35, title: '섬모체 & 진대 (Ciliary Body)', desc: '섬모체의 수축과 이완으로 진대(걸이인대)의 장력을 조절하여 수정체의 두께를 변화시킵니다.' },
            { x: 0.32, y: 0.50, r: 45, title: '망막 & 황반 (Retina & Fovea)', desc: '시각 세포(원뿔세포, 막대세포)가 밀집하여 빛 자극을 감지하고 신경 신호로 변환하는 스크린.' },
            { x: 0.15, y: 0.68, r: 40, title: '시각 신경 (Optic Nerve)', desc: '망막에서 생성된 시각 전기 신호를 대뇌 시각 피질로 전달하는 뇌신경 경로.' }
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
        var dt = Math.min(0.05, (time - lastTime) / 1000 || 0.016);
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

        // Synapse Action Potential Exocytosis Physics
        if (isSynapseFiring) {
            synapseProgress += dt * 1.8;
            if (synapseProgress >= 1.0) isSynapseFiring = false;
        }

        // Calcium Ions flow
        for (var ci = calciumIons.length - 1; ci >= 0; ci--) {
            var ca = calciumIons[ci];
            ca.progress += dt * ca.speed;
            ca.y = 0.15 + (ca.targetY - 0.15) * Math.min(1.0, ca.progress);
            if (ca.progress >= 1.0) calciumIons.splice(ci, 1);
        }

        // Transmitter diffusion
        for (var mi = transmitterMolecules.length - 1; mi >= 0; mi--) {
            var mol = transmitterMolecules[mi];
            mol.x += mol.vx * dt;
            mol.y += mol.vy * dt;

            if (mol.y >= 0.70 && !mol.isBound) {
                mol.isBound = true;
                mol.vy = 0;
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
                mol.alpha -= dt * 0.8;
                if (mol.alpha <= 0) transmitterMolecules.splice(mi, 1);
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

            // Overlay Molecular / Neural / Eye Simulation per Scene
            if (currentSceneKey === 'synapse') {
                drawSynapseMolecularOverlay(dx, dy, dw, dh, time);
            } else if (currentSceneKey === 'sensory') {
                drawEyeOpticsOverlay(dx, dy, dw, dh, time);
            } else {
                drawNeuralPulses(dx, dy, dw, dh, time);
            }

            drawHotspots(dx, dy, dw, dh, time);
        } else {
            ctx.fillStyle = '#0a0f1d';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#a855f7';
            ctx.font = 'bold 16px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('⚡ 신경계 시뮬레이터 로딩 중...', width / 2, height / 2);
        }
    }

    function drawEyeOpticsOverlay(dx, dy, dw, dh, time) {
        var corneaX = dx + 0.74 * dw;
        var pupilY = dy + 0.50 * dh;
        var lensX = dx + 0.64 * dw;
        var retinaX = dx + 0.32 * dw;
        var retinaY = dy + 0.50 * dh;

        var isNear = targetDist < 35;
        var pupilSpread = 12 + (1 - lightLevel / 100) * 16; // 12px (bright) ~ 28px (dark)
        var lensThickness = isNear ? 18 : 10;

        // 1. Dynamic Lens Bulge (수정체 두께 조절)
        ctx.save();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.ellipse(lensX, pupilY, lensThickness, 34, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // 2. Bioluminescent Refracting Light Rays (광선 추적)
        var rayCount = 5;
        for (var r = 0; r < rayCount; r++) {
            var rayOffset = (r - (rayCount - 1) / 2) * (pupilSpread / 2);
            var entryY = isNear ? (pupilY + rayOffset * 1.8) : (pupilY + rayOffset);

            ctx.save();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            // Ray 1: From target outside to Cornea/Pupil
            ctx.moveTo(dx + 0.95 * dw, entryY);
            ctx.lineTo(lensX, pupilY + rayOffset);
            // Ray 2: Refracted through lens converging onto retina fovea
            ctx.lineTo(retinaX, retinaY);
            ctx.stroke();
            ctx.restore();
        }

        // 3. Focal Point Spark on Retina
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.arc(retinaX, retinaY, 5 + Math.sin(time * 0.005) * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawSynapseMolecularOverlay(dx, dy, dw, dh, time) {
        // 1. Calcium Ions
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

        // 2. Neurotransmitter Molecules
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

        // 3. Postsynaptic Sparks
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
            var pulseR = s.r + Math.sin(time * 0.003 + i) * 3;

            // Glowing Outer Ring
            ctx.save();
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.75)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#a855f7';
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();

            // Center Pin
            ctx.fillStyle = '#a855f7';
            ctx.beginPath();
            ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
            ctx.fill();

            // Tag Label Pill
            var labelText = SimEngine.pinLabel(s);
            ctx.font = 'bold 11px Pretendard, sans-serif';
            var txtMetrics = ctx.measureText(labelText);
            var pillW = txtMetrics.width + 16;
            var pillH = 22;

            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(sx - pillW / 2, sy - 28, pillW, pillH, 6);
            } else {
                ctx.rect(sx - pillW / 2, sy - 28, pillW, pillH);
            }
            ctx.fill();
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(labelText, sx, sy - 17);
            ctx.restore();
        }
    }

    function triggerSynapseAction() {
        isSynapseFiring = true;
        synapseProgress = 0.0;

        // Spawn Calcium ions
        for (var c = 0; c < 15; c++) {
            calciumIons.push({
                x: 0.35 + Math.random() * 0.3,
                y: 0.15,
                targetY: 0.35 + Math.random() * 0.15,
                progress: 0,
                speed: Math.random() * 2 + 3
            });
        }

        // Spawn Neurotransmitter Molecules
        for (var m = 0; m < 50; m++) {
            transmitterMolecules.push({
                x: 0.42 + (Math.random() - 0.5) * 0.18,
                y: 0.48,
                vx: (Math.random() - 0.5) * 0.08,
                vy: Math.random() * 0.25 + 0.15,
                color: '#f59e0b',
                size: Math.random() * 3 + 2.5,
                alpha: 1.0,
                isBound: false
            });
        }

        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
    }

    function bindDOM() {
        sceneBtns = document.querySelectorAll('[data-scene]');
        playPauseBtn = document.getElementById('playPauseBtn');
        var actionTriggerBtn = document.getElementById('actionTriggerBtn');
        var actionBtnText = document.getElementById('actionBtnText');

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

                if (actionBtnText) {
                    actionBtnText.textContent = currentSceneKey === 'synapse' ? '활동전위 발사 (+30mV 탈분극)' : '신호 전도 레이스 시작';
                }

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

        if (actionTriggerBtn) {
            actionTriggerBtn.addEventListener('click', function () {
                if (currentSceneKey === 'synapse') {
                    triggerSynapseAction();
                } else {
                    isRacing = true;
                    consciousProgress = 0.0;
                    reflexProgress = 0.0;
                    if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                }
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
            SimEngine.renderQuizSet(quizContainerEl, data.quizzes);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
