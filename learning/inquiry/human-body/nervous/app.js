/**
 * 2022 개정 교육과정 신경계 & 자극·반응·뇌 구조 실시간 시뮬레이터
 * High-Resolution Canvas + 60fps Brain Anatomy, 4 Reflex Arcs, Autonomic Antagonism & Sensory Mechanics
 */

(function () {
    'use strict';

    var canvas, ctx;
    var width, height, dpr;
    var isRunning = true;
    var lastTime = 0;

    // Assets
    var scenes = {
        brain: {
            src: '../assets/images/nervous-hero-v2.webp',
            fallback: '../assets/images/nervous-hero.webp',
            img: null,
            loaded: false
        },
        response: {
            src: '../assets/images/nervous-response.webp',
            img: null,
            loaded: false
        },
        autonomic: {
            src: '../assets/images/nervous-hero.webp',
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

    var currentSceneKey = 'brain';

    // 1. Brain Anatomy State
    var selectedBrainPart = 'cerebrum';
    var brainParts = {
        cerebrum: {
            x: 0.50, y: 0.28, r: 52, color: '#a855f7',
            title: '대뇌 (Cerebrum) - 고등 정신 활동의 최고 사령부',
            desc: '주름진 겉질(회색질)과 속질로 구성됩니다. 감각·운동을 총괄하며 <strong>기억, 추리, 판단, 언어, 감정 등 의식적인 활동</strong>의 최고 중추입니다.'
        },
        diencephalon: {
            x: 0.49, y: 0.42, r: 24, color: '#06b6d4',
            title: '간뇌 (Diencephalon - 시상 & 시상하부)',
            desc: '대뇌 아래에 위치하며, 자율신경계와 호르몬을 조절하여 <strong>체온, 혈당량, 삼투압 등 항상성을 일정하게 유지하는 최고 조절 중추</strong>입니다.'
        },
        midbrain: {
            x: 0.49, y: 0.50, r: 20, color: '#f43f5e',
            title: '중간뇌 (Midbrain, 중뇌) - 눈 조절 중추',
            desc: '간뇌 아래, 소뇌 앞쪽에 위치합니다. <strong>안구 운동과 홍채의 수축·이완을 통한 동공 반사(빛의 명암 조절)</strong>의 중추입니다.'
        },
        cerebellum: {
            x: 0.65, y: 0.54, r: 38, color: '#38bdf8',
            title: '소뇌 (Cerebellum) - 평형 & 정밀 운동',
            desc: '대뇌 후하방에 위치하며, 대뇌와 협력하여 정밀한 근육 운동을 조절하고 귀의 평형감각(반고리관·전정기관) 정보를 받아 <strong>몸의 균형(자세 평형)을 유지</strong>합니다.'
        },
        medulla: {
            x: 0.49, y: 0.60, r: 24, color: '#10b981',
            title: '연수 (Medulla Oblongata) - 생명 유지 & 내장 반사',
            desc: '중간뇌와 척수를 잇는 뇌줄기로 좌우 신경이 교차합니다. <strong>호흡 운동, 심장 박동, 소화 운동 조절(생명 유지 중추)</strong>과 <strong>기침, 재채기, 딸꾹질, 하품, 침 분비</strong>의 반사 중추입니다.'
        },
        spine: {
            x: 0.49, y: 0.76, r: 30, color: '#f59e0b',
            title: '척수 (Spinal Cord) - 뇌신경 통로 & 무조건 반사',
            desc: '척추 속 신경 다발로 뇌와 온몸 사이의 신호 전달 통로입니다. 위험을 피하는 <strong>무릎 반사, 뜨거운 물체 손 떼기(회피 반사), 배뇨·배변 반사</strong>의 중추입니다.'
        }
    };

    // 2. Reflex Race State
    var currentReflexMode = 'conscious'; // conscious, spinal, medulla, midbrain
    var isRacing = false;
    var raceProgress = 0.0;
    var raceTimerMs = 0;
    var raceTargets = {
        conscious: { targetMs: 250, label: '대뇌 의식적 반응 (자 잡기)', center: '대뇌' },
        spinal: { targetMs: 30, label: '척수 무조건 반사 (손 떼기)', center: '척수' },
        medulla: { targetMs: 40, label: '연수 무조건 반사 (기침·재채기)', center: '연수' },
        midbrain: { targetMs: 35, label: '중간뇌 동공 반사 (동공 축소)', center: '중간뇌' }
    };

    // 3. Autonomic State
    var isSympathetic = true; // true: 교감신경, false: 부교감신경
    var heartBpm = 120;
    var heartBeatPhase = 0;

    // 4. Eye & Ear State
    var targetDist = 50;  // 10 ~ 100cm (원근)
    var lightLevel = 50;  // 10 ~ 100% (명암)
    var earSoundPhase = 0;

    // 5. Synapse State
    var isSynapseFiring = false;
    var synapseProgress = 0.0;
    var transmitterMolecules = [];

    // General Impulses
    var neuralPulses = [];

    // Hotspots per scene
    var hotspots = {
        brain: [
            brainParts.cerebrum,
            brainParts.diencephalon,
            brainParts.midbrain,
            brainParts.cerebellum,
            brainParts.medulla,
            brainParts.spine
        ],
        response: [
            { x: 0.35, y: 0.30, r: 45, title: '의식적 반응 경로 (~250ms)', desc: '자극 ➔ 감각기 ➔ 감각신경 ➔ 척수 ➔ <strong>대뇌 (생각·판단)</strong> ➔ 척수 ➔ 운동신경 ➔ 근육' },
            { x: 0.65, y: 0.65, r: 45, title: '무조건 반사 경로 (~30ms)', desc: '자극 ➔ 감각기 ➔ 감각신경 ➔ <strong>척수/연수/중간뇌 (대뇌 패스!)</strong> ➔ 운동신경 ➔ 반응기' }
        ],
        autonomic: [
            { x: 0.50, y: 0.22, r: 35, title: '동공 조절 (자율신경)', desc: '교감신경: 동공 확대 (시야 확보) | 부교감신경: 동공 축소 (안정)' },
            { x: 0.50, y: 0.42, r: 40, title: '심장 박동 조절', desc: '교감신경: 심박 촉진 (혈압 상승, 위기 대응) | 부교감신경: 심박 억제 (심신 안정)' },
            { x: 0.50, y: 0.58, r: 40, title: '소화관 운동 조절', desc: '교감신경: 소화 억제 (에너지 근육 집중) | 부교감신경: 소화 촉진 (위액 분비, 흡수)' },
            { x: 0.50, y: 0.78, r: 35, title: '방광 조절', desc: '교감신경: 방광 이완 (배뇨 억제) | 부교감신경: 방광 수축 (배뇨 촉진)' }
        ],
        synapse: [
            { x: 0.20, y: 0.50, r: 40, title: '감각 뉴런 (Sensory Neuron)', desc: '신경세포체가 축삭 옆에 볼록하게 나와 있는 구심성 뉴런으로 감각기 자극을 중추로 전달합니다.' },
            { x: 0.50, y: 0.50, r: 45, title: '연합 뉴런 (Interneuron)', desc: '뇌와 척수를 구성하는 뉴런으로, 감각 정보를 분석하고 명령을 생성합니다.' },
            { x: 0.80, y: 0.50, r: 45, title: '운동 뉴런 (Motor Neuron)', desc: '연합 뉴런의 명령을 반응기(근육)로 전달하는 원심성 뉴런입니다.' }
        ],
        sensory: [
            { x: 0.70, y: 0.38, r: 35, title: '홍채 (Iris) - 명암 조절', desc: '밝은 곳: 홍채 확장 ➔ 동공 축소 / 어두운 곳: 홍채 수축 ➔ 동공 확대.' },
            { x: 0.64, y: 0.50, r: 40, title: '수정체 (Lens) - 원근 굴절', desc: '가까운 곳: 섬모체 수축 ➔ 진대 이완 ➔ <strong>수정체 두꺼워짐</strong> | 먼 곳: <strong>수정체 얇아짐</strong>.' },
            { x: 0.25, y: 0.40, r: 40, title: '달팽이관 (Cochlea) - 청각', desc: '음파의 진동으로 림프액 파동이 생겨 청각 세포를 흥분시키는 소리 감각 기관.' },
            { x: 0.25, y: 0.65, r: 40, title: '반고리관 & 전정기관 - 평형', desc: '반고리관: <strong>회전 감각</strong> | 전정기관: 이석이 쏠리며 <strong>기울기·중력</strong> 감지.' }
        ]
    };

    // DOM Elements
    var actionTriggerBtn, actionBtnText, playPauseBtn;
    var distSlider, distValEl, lightSlider, lightValEl;
    var consciousTimerEl, spinalTimerEl, medullaTimerEl, midbrainTimerEl;
    var organDetailCard, organTitleEl, organDescEl;
    var hudInstructionEl;
    var quizContainerEl;

    function init() {
        canvas = document.getElementById('nervousCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        // Preload Images
        Object.keys(scenes).forEach(function (key) {
            var item = scenes[key];
            var img = new Image();
            img.src = item.src;
            img.onload = function () {
                item.img = img;
                item.loaded = true;
            };
            img.onerror = function () {
                if (item.fallback) {
                    var fImg = new Image();
                    fImg.src = item.fallback;
                    fImg.onload = function () { item.img = fImg; item.loaded = true; };
                }
            };
        });

        bindDOM();
        renderSidebar();

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

    // ------------------------------------------------------------------------
    // Physics & Animation Loop
    // ------------------------------------------------------------------------
    function updatePhysics(dt) {
        if (!isRunning) return;

        // 1. Reflex Race Simulation
        if (isRacing) {
            var target = raceTargets[currentReflexMode];
            var speed = 1.0 / (target.targetMs / 1000.0);
            raceProgress += dt * speed;
            raceTimerMs = Math.round(Math.min(raceProgress, 1.0) * target.targetMs);

            // Update specific timer
            if (currentReflexMode === 'conscious' && consciousTimerEl) consciousTimerEl.textContent = raceTimerMs + ' ms';
            if (currentReflexMode === 'spinal' && spinalTimerEl) spinalTimerEl.textContent = raceTimerMs + ' ms';
            if (currentReflexMode === 'medulla' && medullaTimerEl) medullaTimerEl.textContent = raceTimerMs + ' ms';
            if (currentReflexMode === 'midbrain' && midbrainTimerEl) midbrainTimerEl.textContent = raceTimerMs + ' ms';

            if (raceProgress >= 1.0) {
                isRacing = false;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playCorrect();
            }
        }

        // 2. Autonomic Heart Phasing
        var targetBpm = isSympathetic ? 120 : 60;
        heartBeatPhase += dt * (targetBpm / 60.0) * Math.PI * 2;

        // 3. Synapse Firing
        if (isSynapseFiring) {
            synapseProgress += dt * 2.0;
            if (synapseProgress >= 1.0) isSynapseFiring = false;
        }

        // 4. Ear wave phase
        earSoundPhase += dt * 6.0;
    }

    function renderLoop(timestamp) {
        if (!lastTime) lastTime = timestamp;
        var dt = Math.min((timestamp - lastTime) / 1000, 0.1);
        lastTime = timestamp;

        updatePhysics(dt);
        drawScene(timestamp);

        requestAnimationFrame(renderLoop);
    }

    // ------------------------------------------------------------------------
    // Canvas Drawing per Scene
    // ------------------------------------------------------------------------
    function drawScene(time) {
        ctx.clearRect(0, 0, width, height);

        var current = scenes[currentSceneKey];
        var img = (current && current.loaded && current.img) ? current.img : null;

        var dw = width, dh = height, dx = 0, dy = 0;
        if (img) {
            var imgAspect = img.width / img.height;
            var canvasAspect = width / height;
            if (canvasAspect > imgAspect) {
                dh = height; dw = height * imgAspect;
                dx = (width - dw) / 2; dy = 0;
            } else {
                dw = width; dh = width / imgAspect;
                dx = 0; dy = (height - dh) / 2;
            }
            ctx.drawImage(img, dx, dy, dw, dh);
        } else {
            ctx.fillStyle = '#060a17';
            ctx.fillRect(0, 0, width, height);
        }

        // Scene-Specific Interactive Overlays
        if (currentSceneKey === 'brain') {
            drawBrainAnatomyOverlay(dx, dy, dw, dh, time);
        } else if (currentSceneKey === 'response') {
            drawReflexRaceOverlay(dx, dy, dw, dh, time);
        } else if (currentSceneKey === 'autonomic') {
            drawAutonomicOverlay(dx, dy, dw, dh, time);
        } else if (currentSceneKey === 'synapse') {
            drawNeuron3Overlay(dx, dy, dw, dh, time);
        } else if (currentSceneKey === 'sensory') {
            drawSensoryOrgansOverlay(dx, dy, dw, dh, time);
        }

        drawHotspots(dx, dy, dw, dh, time);
    }

    // ------------------------------------------------------------------------
    // Scene 1: Brain 5 Regions & Sagittal Cross-Section Overlay
    // ------------------------------------------------------------------------
    function drawBrainAnatomyOverlay(dx, dy, dw, dh, time) {
        var keys = Object.keys(brainParts);

        keys.forEach(function (key) {
            var part = brainParts[key];
            var px = dx + part.x * dw;
            var py = dy + part.y * dh;
            var isSelected = (selectedBrainPart === key);

            ctx.save();
            // Highlight pulse if selected
            if (isSelected) {
                var pulse = Math.sin(time * 0.008) * 8;
                ctx.fillStyle = part.color;
                ctx.globalAlpha = 0.35;
                ctx.beginPath();
                ctx.arc(px, py, part.r + 14 + pulse, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.shadowBlur = 20;
                ctx.shadowColor = part.color;
                ctx.beginPath();
                ctx.arc(px, py, part.r + 6, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Core Marker
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = part.color;
            ctx.shadowBlur = 14;
            ctx.shadowColor = part.color;
            ctx.beginPath();
            ctx.arc(px, py, 10, 0, Math.PI * 2);
            ctx.fill();

            // White center dot
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();

            // Label tag
            ctx.fillStyle = isSelected ? 'rgba(168, 85, 247, 0.95)' : 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = part.color;
            ctx.lineWidth = isSelected ? 2 : 1;
            var labelText = part.title.split(' ')[0]; // e.g. 대뇌, 간뇌
            ctx.font = 'bold 12px Pretendard, sans-serif';
            var tw = ctx.measureText(labelText).width;
            ctx.beginPath();
            ctx.roundRect(px - tw / 2 - 8, py + 16, tw + 16, 22, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(labelText, px, py + 31);

            ctx.restore();
        });
    }

    // ------------------------------------------------------------------------
    // Scene 2: 4 Reflex Arcs Race Overlay
    // ------------------------------------------------------------------------
    function drawReflexRaceOverlay(dx, dy, dw, dh, time) {
        var px0, py0, pxC, pyC, pxM, pyM; // Sensor, Center, Effector

        if (currentReflexMode === 'conscious') {
            // Eye -> Brain -> Spine -> Hand
            px0 = dx + 0.78 * dw; py0 = dy + 0.30 * dh;
            pxC = dx + 0.50 * dw; pyC = dy + 0.24 * dh; // Cerebrum
            pxM = dx + 0.22 * dw; pyM = dy + 0.65 * dh; // Hand muscle
        } else if (currentReflexMode === 'spinal') {
            // Hand sensory -> Spine -> Hand muscle (Bypasses brain!)
            px0 = dx + 0.25 * dw; py0 = dy + 0.65 * dh;
            pxC = dx + 0.50 * dw; pyC = dy + 0.50 * dh; // Spine
            pxM = dx + 0.22 * dw; pyM = dy + 0.65 * dh;
        } else if (currentReflexMode === 'medulla') {
            // Airway sensory -> Medulla -> Cough muscle
            px0 = dx + 0.65 * dw; py0 = dy + 0.45 * dh;
            pxC = dx + 0.50 * dw; pyC = dy + 0.38 * dh; // Medulla
            pxM = dx + 0.50 * dw; pyM = dy + 0.48 * dh;
        } else {
            // Eye sensory -> Midbrain -> Iris
            px0 = dx + 0.72 * dw; py0 = dy + 0.32 * dh;
            pxC = dx + 0.50 * dw; pyC = dy + 0.32 * dh; // Midbrain
            pxM = dx + 0.70 * dw; pyM = dy + 0.32 * dh;
        }

        // Draw Arc Path
        ctx.save();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(pxC, pyC);
        ctx.lineTo(pxM, pyM);
        ctx.stroke();
        ctx.setLineDash([]);

        // Racing Bioluminescent Impulse
        if (isRacing || raceProgress > 0) {
            var currX, currY;
            if (raceProgress < 0.5) {
                var p1 = raceProgress * 2;
                currX = px0 + (pxC - px0) * p1;
                currY = py0 + (pyC - py0) * p1;
            } else {
                var p2 = (raceProgress - 0.5) * 2;
                currX = pxC + (pxM - pxC) * p2;
                currY = pyC + (pyM - pyC) * p2;
            }

            ctx.fillStyle = '#facc15';
            ctx.shadowBlur = 24;
            ctx.shadowColor = '#facc15';
            ctx.beginPath();
            ctx.arc(currX, currY, 12, 0, Math.PI * 2);
            ctx.fill();

            // Center Flash when reached
            if (raceProgress >= 0.5) {
                ctx.fillStyle = '#38bdf8';
                ctx.shadowColor = '#38bdf8';
                ctx.beginPath();
                ctx.arc(pxC, pyC, 16, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Center Label Banner
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(pxC - 60, pyC - 38, 120, 26, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('중추: ' + raceTargets[currentReflexMode].center, pxC, pyC - 21);

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Scene 3: Autonomic Antagonism (Sympathetic vs Parasympathetic) Overlay
    // ------------------------------------------------------------------------
    function drawAutonomicOverlay(dx, dy, dw, dh, time) {
        var eyeX = dx + 0.50 * dw, eyeY = dy + 0.22 * dh;
        var heartX = dx + 0.50 * dw, heartY = dy + 0.42 * dh;
        var stomachX = dx + 0.50 * dw, stomachY = dy + 0.58 * dh;
        var bladderX = dx + 0.50 * dw, bladderY = dy + 0.78 * dh;

        ctx.save();

        // 1. Eye (동공)
        var pupilR = isSympathetic ? 20 : 9; // Large vs Small
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, 32, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isSympathetic ? '#f87171' : '#34d399';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, pupilR + 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, pupilR, 0, Math.PI * 2);
        ctx.fill();

        // Eye label
        ctx.fillStyle = isSympathetic ? '#fca5a5' : '#6ee7b7';
        ctx.font = 'bold 11.5px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(isSympathetic ? '👁️ 동공 확대' : '👁️ 동공 축소', eyeX, eyeY + 34);

        // 2. Heart (심장 박동)
        var beatScale = 1.0 + Math.sin(heartBeatPhase) * (isSympathetic ? 0.25 : 0.10);
        ctx.fillStyle = isSympathetic ? '#ef4444' : '#0284c7';
        ctx.shadowBlur = isSympathetic ? 20 : 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(heartX, heartY, 26 * beatScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(isSympathetic ? '💓 심박 촉진 (120 bpm)' : '💓 심박 억제 (60 bpm)', heartX, heartY + 42);

        // 3. Stomach (소화 운동)
        ctx.fillStyle = isSympathetic ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.4)';
        ctx.strokeStyle = isSympathetic ? '#ef4444' : '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(stomachX - 45, stomachY - 18, 90, 36, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSympathetic ? '#fca5a5' : '#6ee7b7';
        ctx.fillText(isSympathetic ? '🥪 소화 억제 (중단)' : '🥪 소화 촉진 (활성화)', stomachX, stomachY + 5);

        // 4. Bladder (방광)
        var bladderSize = isSympathetic ? 26 : 16;
        ctx.fillStyle = isSympathetic ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.4)';
        ctx.beginPath();
        ctx.arc(bladderX, bladderY, bladderSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(isSympathetic ? '🫘 방광 이완 (배뇨 억제)' : '🫘 방광 수축 (배뇨 촉진)', bladderX, bladderY + 34);

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Scene 4: 3 Neuron Types & Synapse Overlay
    // ------------------------------------------------------------------------
    function drawNeuron3Overlay(dx, dy, dw, dh, time) {
        var yPos = dy + 0.50 * dh;
        var sX = dx + 0.20 * dw; // Sensory
        var iX = dx + 0.50 * dw; // Interneuron
        var mX = dx + 0.80 * dw; // Motor

        ctx.save();

        // 1. Sensory Neuron (Dorsal root ganglion bulge!)
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sX - 50, yPos);
        ctx.lineTo(sX, yPos);
        ctx.lineTo(sX + 50, yPos);
        ctx.stroke();

        // Bulging cell body off to the side (감각 뉴런의 상징적 형태!)
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(sX, yPos - 24, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(sX, yPos);
        ctx.lineTo(sX, yPos - 12);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('감각 뉴런', sX, yPos + 24);
        ctx.font = '10px Pretendard, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('(신경세포체 돌출)', sX, yPos + 38);

        // 2. Interneuron (연합 뉴런 - 중추)
        ctx.fillStyle = '#c084fc';
        ctx.strokeStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(iX, yPos, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.fillText('연합 뉴런', iX, yPos + 24);
        ctx.font = '10px Pretendard, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('(뇌·척수 중추)', iX, yPos + 38);

        // 3. Motor Neuron (운동 뉴런)
        ctx.fillStyle = '#34d399';
        ctx.strokeStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(mX, yPos, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(mX, yPos);
        ctx.lineTo(mX + 60, yPos);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.fillText('운동 뉴런', mX, yPos + 24);
        ctx.font = '10px Pretendard, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('(근육 연결)', mX, yPos + 38);

        // 4. Direction Arrow
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 14px Pretendard, sans-serif';
        ctx.fillText('➔ 자극 전달 방향 (감각 ➔ 연합 ➔ 운동) ➔', dx + 0.50 * dw, dy + 0.28 * dh);

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Scene 5: Sensory Organs (Eye & Ear) Overlay
    // ------------------------------------------------------------------------
    function drawSensoryOrgansOverlay(dx, dy, dw, dh, time) {
        var eyeX = dx + 0.70 * dw;
        var eyeY = dy + 0.50 * dh;

        // Eye ray tracing
        var isNear = targetDist < 35;
        var lensThickness = isNear ? 18 : 10;
        var pupilSpread = 10 + (1 - lightLevel / 100) * 16;

        ctx.save();
        // Lens
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, lensThickness, 34, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Rays
        for (var r = -2; r <= 2; r++) {
            var off = r * (pupilSpread / 2);
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(dx + 0.95 * dw, eyeY + off * 1.5);
            ctx.lineTo(eyeX, eyeY + off);
            ctx.lineTo(eyeX - 100, eyeY);
            ctx.stroke();
        }

        // Ear schematic on left side
        var earX = dx + 0.25 * dw;
        var earY = dy + 0.50 * dh;

        // Tympanic membrane (고막)
        var wave = Math.sin(earSoundPhase) * 3;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(earX - 30, earY - 25);
        ctx.quadraticCurveTo(earX - 30 + wave, earY, earX - 30, earY + 25);
        ctx.stroke();

        // Cochlea (달팽이관 나선)
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (var a = 0; a < Math.PI * 4; a += 0.1) {
            var rad = a * 3;
            var cx = earX + 30 + Math.cos(a) * rad;
            var cy = earY + Math.sin(a) * rad;
            if (a === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('고막 진동 ➔ 달팽이관 (청각)', earX, earY + 45);

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Hotspots Rendering
    // ------------------------------------------------------------------------
    function drawHotspots(dx, dy, dw, dh, time) {
        if (currentSceneKey === 'brain') return; // Handled directly in overlay

        var list = hotspots[currentSceneKey] || [];
        list.forEach(function (spot) {
            var sx = dx + spot.x * dw;
            var sy = dy + spot.y * dh;

            ctx.save();
            var pulse = Math.sin(time * 0.006 + spot.x * 10) * 4;
            ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
            ctx.beginPath();
            ctx.arc(sx, sy, 16 + pulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#a855f7';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(sx, sy, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            var labelText = spot.title.split(' ')[0];
            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 1;
            ctx.font = 'bold 11px Pretendard, sans-serif';
            var tw = ctx.measureText(labelText).width;
            ctx.beginPath();
            ctx.roundRect(sx - tw / 2 - 8, sy + 14, tw + 16, 20, 4);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#f8fafc';
            ctx.textAlign = 'center';
            ctx.fillText(labelText, sx, sy + 28);
            ctx.restore();
        });
    }

    // ------------------------------------------------------------------------
    // DOM Bindings
    // ------------------------------------------------------------------------
    function bindDOM() {
        actionTriggerBtn = document.getElementById('actionTriggerBtn');
        actionBtnText = document.getElementById('actionBtnText');
        playPauseBtn = document.getElementById('playPauseBtn');

        distSlider = document.getElementById('distSlider');
        distValEl = document.getElementById('distVal');
        lightSlider = document.getElementById('lightSlider');
        lightValEl = document.getElementById('lightVal');

        consciousTimerEl = document.getElementById('consciousTimer');
        spinalTimerEl = document.getElementById('spinalTimer');
        medullaTimerEl = document.getElementById('medullaTimer');
        midbrainTimerEl = document.getElementById('midbrainTimer');

        organDetailCard = document.getElementById('organDetailCard');
        organTitleEl = document.getElementById('organTitle');
        organDescEl = document.getElementById('organDesc');
        hudInstructionEl = document.getElementById('hudInstruction');

        quizContainerEl = document.getElementById('quizContainer');

        // Scene switcher buttons
        var sceneBtns = document.querySelectorAll('.scene-btn');
        sceneBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                sceneBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentSceneKey = btn.dataset.scene;

                updateHudInstruction(currentSceneKey);
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });

        // Brain Part Quick Selector buttons
        var brainBtns = document.querySelectorAll('.brain-pill-btn');
        brainBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                brainBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var partKey = btn.dataset.part;
                selectBrainPart(partKey);
            });
        });

        // Reflex Mode buttons
        var reflexBtns = document.querySelectorAll('.reflex-mode-btn');
        reflexBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                reflexBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentReflexMode = btn.dataset.mode;
                isRacing = false;
                raceProgress = 0.0;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });

        // Autonomic Toggle Buttons
        var btnSym = document.getElementById('btnSympathetic');
        var btnPara = document.getElementById('btnParasympathetic');
        var autoTitle = document.getElementById('autonomicStateTitle');
        var autoDesc = document.getElementById('autonomicStateDesc');

        if (btnSym && btnPara) {
            btnSym.addEventListener('click', function () {
                isSympathetic = true;
                btnSym.classList.add('active');
                btnPara.classList.remove('active');
                if (autoTitle) {
                    autoTitle.textContent = '⚡ 교감신경 활성화 (Fight or Flight)';
                    autoTitle.style.color = '#ef4444';
                }
                if (autoDesc) {
                    autoDesc.textContent = '위기 상황이나 공포, 긴장 시 작동하여 동공 확대, 심박 촉진, 기관지 확장을 유도하고 소화는 억제합니다.';
                }
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
            });

            btnPara.addEventListener('click', function () {
                isSympathetic = false;
                btnPara.classList.add('active');
                btnSym.classList.remove('active');
                if (autoTitle) {
                    autoTitle.textContent = '🌿 부교감신경 활성화 (Rest & Digest)';
                    autoTitle.style.color = '#10b981';
                }
                if (autoDesc) {
                    autoDesc.textContent = '식사나 수면, 휴식 시 작동하여 심박과 호흡을 안정시키고 소화관 운동을 활성화합니다.';
                }
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        // Action Trigger Button (Start Race)
        if (actionTriggerBtn) {
            actionTriggerBtn.addEventListener('click', function () {
                if (currentSceneKey !== 'response') {
                    // switch to response scene
                    sceneBtns.forEach(function (b) {
                        b.classList.toggle('active', b.dataset.scene === 'response');
                    });
                    currentSceneKey = 'response';
                    updateHudInstruction('response');
                }

                isRacing = true;
                raceProgress = 0.0;
                raceTimerMs = 0;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
            });
        }

        // Play / Pause Button
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                isRunning = !isRunning;
                playPauseBtn.innerHTML = isRunning ? '<span>⏸️</span> 일시정지' : '<span>▶️</span> 재생';
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        }

        // Eye Slider Controls
        if (distSlider) {
            distSlider.addEventListener('input', function () {
                targetDist = parseInt(distSlider.value, 10);
                if (distValEl) {
                    distValEl.textContent = targetDist < 35 ? targetDist + 'cm (가까움 ➔ 수정체 두꺼워짐)' : targetDist + 'cm (멂 ➔ 수정체 얇아짐)';
                    distValEl.style.color = targetDist < 35 ? '#c084fc' : '#38bdf8';
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

        // Canvas Click for Brain Part & Hotspots
        if (canvas) {
            canvas.addEventListener('click', function (e) {
                var rect = canvas.getBoundingClientRect();
                var cx = e.clientX - rect.left;
                var cy = e.clientY - rect.top;

                var current = scenes[currentSceneKey];
                var img = (current && current.loaded && current.img) ? current.img : null;
                var dw = width, dh = height, dx = 0, dy = 0;
                if (img) {
                    var imgAspect = img.width / img.height;
                    var canvasAspect = width / height;
                    if (canvasAspect > imgAspect) {
                        dh = height; dw = height * imgAspect;
                        dx = (width - dw) / 2; dy = 0;
                    } else {
                        dw = width; dh = width / imgAspect;
                        dx = 0; dy = (height - dh) / 2;
                    }
                }

                if (currentSceneKey === 'brain') {
                    // Check brain parts
                    var keys = Object.keys(brainParts);
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        var bp = brainParts[k];
                        var bx = dx + bp.x * dw;
                        var by = dy + bp.y * dh;
                        if (Math.hypot(cx - bx, cy - by) <= bp.r + 15) {
                            selectBrainPart(k);
                            break;
                        }
                    }
                } else {
                    // Check other hotspots
                    var spotList = hotspots[currentSceneKey] || [];
                    for (var j = 0; j < spotList.length; j++) {
                        var s = spotList[j];
                        var sx = dx + s.x * dw;
                        var sy = dy + s.y * dh;
                        if (Math.hypot(cx - sx, cy - sy) <= s.r + 20) {
                            if (organTitleEl) organTitleEl.textContent = s.title;
                            if (organDescEl) organDescEl.innerHTML = s.desc;
                            if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                            break;
                        }
                    }
                }
            });
        }

        // Sidebar Tab Switching
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

    function selectBrainPart(partKey) {
        selectedBrainPart = partKey;
        var data = brainParts[partKey];
        if (!data) return;

        // Update pills
        var brainBtns = document.querySelectorAll('.brain-pill-btn');
        brainBtns.forEach(function (b) {
            b.classList.toggle('active', b.dataset.part === partKey);
        });

        if (organTitleEl) organTitleEl.textContent = data.title;
        if (organDescEl) organDescEl.innerHTML = data.desc;
        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
    }

    function updateHudInstruction(sceneKey) {
        if (!hudInstructionEl) return;
        if (sceneKey === 'brain') {
            hudInstructionEl.innerHTML = '화면 속 뇌 부위(<strong>대뇌, 소뇌, 간뇌, 중간뇌, 연수, 척수</strong>)를 클릭하여 핵심 기능을 탐색하세요.';
        } else if (sceneKey === 'response') {
            hudInstructionEl.innerHTML = '우측 상단 <strong>[반사 신호 레이스 시작]</strong>을 눌러 대뇌 반응과 척수·연수·중간뇌 반사의 속도를 비교하세요.';
        } else if (sceneKey === 'autonomic') {
            hudInstructionEl.innerHTML = '우측 탭에서 <strong>[교감신경]</strong>과 <strong>[부교감신경]</strong>을 토글하여 온몸 장기의 길항 작용을 관찰하세요.';
        } else if (sceneKey === 'synapse') {
            hudInstructionEl.innerHTML = '<strong>감각뉴런 ➔ 연합뉴런 ➔ 운동뉴런</strong>의 구조와 단방향 시냅스 전달 원리를 확인하세요.';
        } else if (sceneKey === 'sensory') {
            hudInstructionEl.innerHTML = '슬라이더를 조작하여 눈의 <strong>원근·명암 조절</strong>과 귀의 <strong>청각·평형감각</strong>을 실험하세요.';
        }
    }

    function renderSidebar() {
        if (typeof ExamData === 'undefined') return;
        var data = ExamData.nervous;
        if (!data) return;

        var trapListEl = document.getElementById('examTrapList');
        if (trapListEl) {
            var html = '';
            data.examTraps.forEach(function (t) {
                html += '<div class="exam-trap-item" style="margin-bottom:10px;">' +
                    '<div class="exam-trap-title">' + t.title + '</div>' +
                    '<div class="exam-trap-desc">' + t.desc + '</div></div>';
            });
            trapListEl.innerHTML = html;
        }

        var conceptListEl = document.getElementById('conceptList');
        if (conceptListEl) {
            var html2 = '';
            data.checkpoints.forEach(function (c) {
                html2 += '<li>' + c + '</li>';
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
