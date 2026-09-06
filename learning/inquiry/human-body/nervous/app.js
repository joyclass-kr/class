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
            src: '../assets/images/nervous-brain.webp',
            fallback: '../assets/images/nervous-hero-v2.webp',
            img: null,
            loaded: false
        },
        response: {
            src: '../assets/images/nervous-response.webp',
            img: null,
            loaded: false
        },
        // 자율신경 장면은 사진 대신 우리가 그린 몸 도식을 쓴다 (사진 속 몸에는 심장·방광이 없다)
        autonomic: {
            src: null,
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
        },
        ear: {
            src: '../assets/images/nervous-ear.webp',
            img: null,
            loaded: false
        }
    };

    var currentSceneKey = 'brain';

    // 1. Brain Anatomy State
    var selectedBrainPart = 'cerebrum';
    var brainParts = {
        cerebrum: {
            x: 0.37, y: 0.22, r: 52, side: 'below', color: '#a855f7',
            title: '대뇌 (Cerebrum) - 고등 정신 활동의 최고 사령부',
            desc: '주름진 겉질(회색질)과 속질로 구성됩니다. 감각·운동을 총괄하며 <strong>기억, 추리, 판단, 언어, 감정 등 의식적인 활동</strong>의 최고 중추입니다.'
        },
        diencephalon: {
            x: 0.495, y: 0.435, r: 26, side: 'left', color: '#06b6d4',
            title: '간뇌 (Diencephalon - 시상 & 시상하부)',
            desc: '대뇌 아래에 위치하며, 자율신경계와 호르몬을 조절하여 <strong>체온, 혈당량, 삼투압 등 항상성을 일정하게 유지하는 최고 조절 중추</strong>입니다.'
        },
        midbrain: {
            x: 0.545, y: 0.545, r: 22, side: 'left', color: '#f43f5e',
            title: '중간뇌 (Midbrain, 중뇌) - 눈 조절 중추',
            desc: '간뇌 아래, 소뇌 앞쪽에 위치합니다. <strong>안구 운동과 홍채의 수축·이완을 통한 동공 반사(빛의 명암 조절)</strong>의 중추입니다.'
        },
        cerebellum: {
            x: 0.635, y: 0.655, r: 38, side: 'right', color: '#38bdf8',
            title: '소뇌 (Cerebellum) - 평형 & 정밀 운동',
            desc: '대뇌 후하방에 위치하며, 대뇌와 협력하여 정밀한 근육 운동을 조절하고 귀의 평형감각(반고리관·전정기관) 정보를 받아 <strong>몸의 균형(자세 평형)을 유지</strong>합니다.'
        },
        medulla: {
            x: 0.555, y: 0.79, r: 24, side: 'left', color: '#10b981',
            title: '연수 (Medulla Oblongata) - 생명 유지 & 내장 반사',
            desc: '중간뇌와 척수를 잇는 뇌줄기로 좌우 신경이 교차합니다. <strong>호흡 운동, 심장 박동, 소화 운동 조절(생명 유지 중추)</strong>과 <strong>기침, 재채기, 딸꾹질, 하품, 침 분비</strong>의 반사 중추입니다.'
        },
        spine: {
            x: 0.60, y: 0.90, r: 26, side: 'right', color: '#f59e0b',
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
            { x: 0.500, y: 0.170, r: 30, title: '눈 (동공)', desc: '교감신경이 일하면 동공이 <strong>커지고</strong>(빛을 많이 받아 잘 보려고), 부교감신경이 일하면 <strong>작아집니다</strong>.' },
            { x: 0.483, y: 0.360, r: 30, title: '심장', desc: '교감신경이 일하면 <strong>빨리 뜁니다</strong>(1분에 120회쯤). 부교감신경이 일하면 <strong>천천히 뜁니다</strong>(60회쯤).' },
            { x: 0.500, y: 0.455, r: 28, title: '기관지', desc: '교감신경이 일하면 <strong>넓어져</strong> 산소를 많이 받아들이고, 부교감신경이 일하면 <strong>좁아집니다</strong>.' },
            { x: 0.500, y: 0.560, r: 30, title: '소화관', desc: '교감신경이 일하면 소화가 <strong>멈추고</strong>(힘을 근육에 몰아줘야 하니까), 부교감신경이 일하면 <strong>활발해집니다</strong>.' },
            { x: 0.500, y: 0.690, r: 28, title: '방광', desc: '교감신경이 일하면 <strong>느슨해져</strong> 오줌을 참고, 부교감신경이 일하면 <strong>오므라들어</strong> 오줌을 눕니다.' }
        ],
        synapse: [
            { x: 0.20, y: 0.50, r: 40, title: '감각 뉴런 (Sensory Neuron)', desc: '신경세포체가 축삭 옆에 볼록하게 나와 있는 구심성 뉴런으로 감각기 자극을 중추로 전달합니다.' },
            { x: 0.50, y: 0.50, r: 45, title: '연합 뉴런 (Interneuron)', desc: '뇌와 척수를 구성하는 뉴런으로, 감각 정보를 분석하고 명령을 생성합니다.' },
            { x: 0.80, y: 0.50, r: 45, title: '운동 뉴런 (Motor Neuron)', desc: '연합 뉴런의 명령을 반응기(근육)로 전달하는 원심성 뉴런입니다.' }
        ],
        sensory: [
            { x: 0.700, y: 0.615, r: 26, side: 'right', title: '각막', desc: '눈의 가장 바깥에서 빛이 처음 들어오는 투명한 창입니다. 빛을 한 번 꺾어 주는 곳이기도 합니다.' },
            { x: 0.663, y: 0.395, r: 24, side: 'above', title: '홍채', desc: '동공의 크기를 바꿔 <strong>들어오는 빛의 양</strong>을 조절합니다. 밝은 곳에서는 동공이 작아지고, 어두운 곳에서는 동공이 커집니다.' },
            { x: 0.625, y: 0.500, r: 30, side: 'left', title: '수정체', desc: '볼록렌즈처럼 빛을 꺾어 망막에 상을 맺습니다. 가까운 곳을 볼 때는 <strong>두꺼워지고</strong>, 먼 곳을 볼 때는 <strong>얇아집니다</strong>.' },
            { x: 0.638, y: 0.185, r: 24, side: 'above', title: '섬모체', desc: '수정체를 잡고 있는 근육입니다. 가까운 곳을 볼 때 <strong>수축</strong>하여 진대를 느슨하게 만들고, 그래서 수정체가 두꺼워집니다.' },
            { x: 0.618, y: 0.735, r: 24, side: 'below', title: '진대', desc: '섬모체와 수정체를 잇는 가는 끈(걸이인대)입니다. 섬모체가 수축하면 <strong>느슨해지고</strong>, 이완하면 팽팽해집니다.' },
            { x: 0.345, y: 0.230, r: 26, side: 'left', title: '망막', desc: '상이 맺히는 눈 속 스크린입니다. 시각 세포(원뿔세포·막대세포)가 빛을 신호로 바꿉니다.' },
            { x: 0.325, y: 0.490, r: 24, side: 'below', title: '황반', desc: '망막에서 시각 세포가 가장 빽빽하게 모인 곳으로, 여기에 상이 맺힐 때 가장 뚜렷하게 보입니다.' },
            { x: 0.150, y: 0.655, r: 30, side: 'below', title: '시각 신경', desc: '망막이 만든 신호를 <strong>대뇌 시각 영역</strong>으로 보내는 신경 다발입니다.' }
        ],
        ear: [
            { x: 0.100, y: 0.450, r: 34, side: 'below', title: '귓바퀴', desc: '바깥으로 퍼지는 소리를 모아 귓구멍으로 보내는 깔때기 노릇을 합니다.' },
            { x: 0.350, y: 0.570, r: 30, side: 'below', title: '외이도', desc: '귓바퀴가 모은 소리가 지나가는 통로입니다. 끝에 고막이 있습니다.' },
            { x: 0.535, y: 0.500, r: 24, side: 'left', title: '고막', desc: '소리(음파)를 받아 <strong>떨리는 얇은 막</strong>입니다. 이 떨림이 귓속뼈로 넘어갑니다.' },
            { x: 0.565, y: 0.405, r: 22, side: 'above', title: '귓속뼈', desc: '망치뼈·모루뼈·등자뼈 세 개가 지렛대처럼 이어져 고막의 떨림을 <strong>크게 키워</strong> 달팽이관으로 넘깁니다.' },
            { x: 0.665, y: 0.215, r: 30, side: 'above', title: '반고리관', desc: '서로 직각으로 놓인 세 개의 고리입니다. 속 림프액이 흐르며 <strong>몸의 회전</strong>을 느낍니다. 이 정보는 소뇌로 갑니다.' },
            { x: 0.675, y: 0.450, r: 24, side: 'left', title: '전정기관', desc: '속에 든 작은 돌(이석)이 중력에 쏠리며 <strong>몸의 기울기</strong>를 느낍니다. 이 정보도 소뇌로 갑니다.' },
            { x: 0.785, y: 0.505, r: 34, side: 'below', title: '달팽이관', desc: '소용돌이 모양의 관입니다. 속 림프액이 출렁이며 <strong>청각 세포</strong>를 흥분시켜 소리를 느끼게 합니다.' },
            { x: 0.885, y: 0.290, r: 26, side: 'above', title: '청각 신경', desc: '달팽이관이 만든 신호를 <strong>대뇌 청각 영역</strong>으로 보내는 신경입니다.' }
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
            if (!item.src) return; // 배경 그림 없이 직접 그리는 장면
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
            var bg = ctx.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.5, width * 0.75);
            bg.addColorStop(0, '#0d1730');
            bg.addColorStop(1, '#05070f');
            ctx.fillStyle = bg;
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
        } else if (currentSceneKey === 'ear') {
            drawEarOverlay(dx, dy, dw, dh, time);
        }

        drawHotspots(dx, dy, dw, dh, time);
    }

    // ------------------------------------------------------------------------
    // Scene 1: Brain 5 Regions & Sagittal Cross-Section Overlay
    // ------------------------------------------------------------------------
    /**
     * 표시점 옆에 붙는 이름표. side로 위/아래/왼쪽/오른쪽을 정하고,
     * 화면 밖으로 나가면 안쪽으로 밀어 넣어 글자가 잘리지 않게 한다.
     */
    function drawLabelTag(px, py, text, side, fillColor, lineColor) {
        var padX = 8, boxH = 21, gap = 15;
        ctx.font = 'bold 12px Pretendard, sans-serif';
        var tw = ctx.measureText(text).width;
        var boxW = tw + padX * 2;
        var bx, by;

        if (side === 'above') { bx = px - boxW / 2; by = py - gap - boxH; }
        else if (side === 'left') { bx = px - gap - boxW; by = py - boxH / 2; }
        else if (side === 'right') { bx = px + gap; by = py - boxH / 2; }
        else { bx = px - boxW / 2; by = py + gap; }

        // 화면 밖으로 넘치면 안으로 당긴다
        if (bx < 4) bx = 4;
        if (bx + boxW > width - 4) bx = width - 4 - boxW;
        if (by < 4) by = 4;
        if (by + boxH > height - 4) by = height - 4 - boxH;

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, bx + boxW / 2, by + boxH / 2 + 0.5);
        ctx.textBaseline = 'alphabetic';
    }

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
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.shadowBlur = 0;
            drawLabelTag(
                px, py,
                part.title.split(' ')[0], // 대뇌, 간뇌 …
                part.side,
                isSelected ? 'rgba(168, 85, 247, 0.95)' : 'rgba(9, 14, 30, 0.88)',
                part.color
            );

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
        // 위쪽 장면 단추 줄에 머리가 가리지 않도록 그리는 범위를 아래로 물린다
        var H = 0.82 * dh;
        var top = dy + 0.14 * dh;
        var cx = dx + 0.50 * dw;
        var spineX = cx - 0.052 * dw;   // 등쪽 척수
        var organX = cx + 0.020 * dw;   // 기관 자리
        var labelX = cx + 0.115 * dw;   // 오른쪽 설명 줄

        var accent = isSympathetic ? '#ef4444' : '#10b981';
        var accentSoft = isSympathetic ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.28)';

        var organs = [
            { y: 0.170, name: '눈 (동공)', sym: '동공 확대', para: '동공 축소' },
            { y: 0.360, name: '심장', sym: '빨리 뜀 (120회/분)', para: '천천히 뜀 (60회/분)' },
            { y: 0.455, name: '기관지', sym: '넓어짐 (산소↑)', para: '좁아짐' },
            { y: 0.560, name: '소화관', sym: '소화 멈춤', para: '소화 활발' },
            { y: 0.690, name: '방광', sym: '느슨해짐 (오줌 참기)', para: '오므라듦 (오줌 누기)' }
        ];

        ctx.save();

        // ── 몸 도식 (머리 + 몸통) ───────────────────────────────
        ctx.fillStyle = 'rgba(56, 189, 248, 0.07)';
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.55)';
        ctx.lineWidth = 1.6;

        ctx.beginPath();
        ctx.ellipse(cx, top + 0.155 * H, 0.048 * dw, 0.088 * dh, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(cx - 0.088 * dw, top + 0.255 * H, 0.176 * dw, 0.505 * dh, [0.05 * dw, 0.05 * dw, 0.03 * dw, 0.03 * dw]);
        ctx.fill();
        ctx.stroke();

        // ── 척수 (자율신경이 뻗어 나오는 곳) ────────────────────
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(spineX, top + 0.245 * H);
        ctx.lineTo(spineX, top + 0.730 * H);
        ctx.stroke();

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 11px Pretendard, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('척수', spineX - 8, top + 0.245 * H);

        // ── 기관마다: 신경 가닥 + 기관 그림 + 오른쪽 설명 ────────
        organs.forEach(function (org, i) {
            var oy = dy + org.y * dh;

            // 척수에서 기관으로 뻗는 신경
            ctx.strokeStyle = accent;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.75;
            ctx.beginPath();
            ctx.moveTo(spineX, oy);
            ctx.quadraticCurveTo(spineX + 0.02 * dw, oy, organX - 0.018 * dw, oy);
            ctx.stroke();
            ctx.globalAlpha = 1;

            // 신경을 타고 흐르는 신호
            var t = ((time * 0.0009) + i * 0.2) % 1;
            var sx = spineX + (organX - 0.018 * dw - spineX) * t;
            ctx.fillStyle = accent;
            ctx.shadowBlur = 12;
            ctx.shadowColor = accent;
            ctx.beginPath();
            ctx.arc(sx, oy, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // 기관 그림
            drawAutonomicOrgan(org.name, organX, oy, dw, dh, time, accent, accentSoft);

            // 오른쪽 설명 줄 (서로 세로로 떨어져 있어 겹치지 않는다)
            var text = org.name + ' ➔ ' + (isSympathetic ? org.sym : org.para);
            ctx.font = 'bold 12px Pretendard, sans-serif';
            var tw = ctx.measureText(text).width;
            var boxW = tw + 20, boxH = 24;
            var bx = Math.min(labelX, width - 6 - boxW);

            ctx.strokeStyle = accent;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.moveTo(organX + 0.022 * dw, oy);
            ctx.lineTo(bx, oy);
            ctx.stroke();
            ctx.globalAlpha = 1;

            ctx.fillStyle = 'rgba(6, 10, 24, 0.86)';
            ctx.beginPath();
            ctx.roundRect(bx, oy - boxH / 2, boxW, boxH, 7);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#f8fafc';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, bx + 10, oy + 0.5);
            ctx.textBaseline = 'alphabetic';
        });

        ctx.textAlign = 'center';

        drawCaptionPlate(
            dx + 12, dy + 12,
            [
                isSympathetic ? '⚡ 교감신경 - 놀라거나 뛸 때' : '🌿 부교감신경 - 쉬거나 밥 먹을 때',
                '같은 기관에 두 신경이 반대로 작용합니다 (길항 작용)'
            ],
            accent
        );

        ctx.restore();
    }

    /** 자율신경 도식 속 기관 하나를 그린다 */
    function drawAutonomicOrgan(name, ox, oy, dw, dh, time, accent, accentSoft) {
        ctx.save();
        ctx.strokeStyle = accent;
        ctx.fillStyle = accentSoft;
        ctx.lineWidth = 2;

        if (name === '눈 (동공)') {
            var pupilR = isSympathetic ? 9 : 4;
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.ellipse(ox, oy, 20, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(ox, oy, pupilR + 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0b1120';
            ctx.beginPath();
            ctx.arc(ox, oy, pupilR, 0, Math.PI * 2);
            ctx.fill();
        } else if (name === '심장') {
            var beat = 1 + Math.sin(heartBeatPhase) * (isSympathetic ? 0.22 : 0.09);
            ctx.fillStyle = accent;
            ctx.shadowBlur = isSympathetic ? 18 : 8;
            ctx.shadowColor = accent;
            ctx.beginPath();
            ctx.arc(ox, oy, 17 * beat, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        } else if (name === '기관지') {
            var open = isSympathetic ? 11 : 5;
            ctx.beginPath();
            ctx.moveTo(ox, oy - 14);
            ctx.lineTo(ox, oy - 2);
            ctx.moveTo(ox, oy - 2);
            ctx.lineTo(ox - 15, oy + 13);
            ctx.moveTo(ox, oy - 2);
            ctx.lineTo(ox + 15, oy + 13);
            ctx.lineWidth = open;
            ctx.stroke();
            ctx.lineWidth = 2;
        } else if (name === '소화관') {
            var churn = isSympathetic ? 0 : Math.sin(time * 0.005) * 4;
            ctx.beginPath();
            ctx.roundRect(ox - 26 - churn / 2, oy - 15, 52 + churn, 30, 12);
            ctx.fill();
            ctx.stroke();
        } else {
            var size = isSympathetic ? 17 : 11;
            ctx.beginPath();
            ctx.arc(ox, oy, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
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
        var arrowText = '➔ 자극 전달 방향 (감각 ➔ 연합 ➔ 운동) ➔';
        ctx.font = 'bold 14px Pretendard, sans-serif';
        var atw = ctx.measureText(arrowText).width;
        var acx = dx + 0.50 * dw, acy = dy + 0.24 * dh;
        ctx.fillStyle = 'rgba(6, 10, 24, 0.82)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(acx - atw / 2 - 12, acy - 15, atw + 24, 28, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#facc15';
        ctx.textAlign = 'center';
        ctx.fillText(arrowText, acx, acy + 5);

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Scene 5: Sensory Organs (Eye & Ear) Overlay
    // ------------------------------------------------------------------------
    function drawSensoryOrgansOverlay(dx, dy, dw, dh, time) {
        // 그림 속 수정체 자리에 정확히 겹치도록 좌표를 잡는다
        var lensX = dx + 0.625 * dw;
        var lensY = dy + 0.500 * dh;
        var foveaX = dx + 0.325 * dw;
        var foveaY = dy + 0.490 * dh;

        var isNear = targetDist < 35;
        var lensHalfW = isNear ? 26 : 14;          // 가까울수록 두꺼워짐
        var lensHalfH = 0.115 * dh;
        var pupilSpread = (0.03 + (1 - lightLevel / 100) * 0.075) * dh; // 어두울수록 넓게

        ctx.save();

        // 수정체 (두께가 변하는 볼록렌즈)
        ctx.fillStyle = isNear ? 'rgba(192, 132, 252, 0.45)' : 'rgba(56, 189, 248, 0.38)';
        ctx.strokeStyle = isNear ? '#c084fc' : '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(lensX, lensY, lensHalfW, lensHalfH, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 빛줄기: 오른쪽에서 들어와 수정체에서 꺾이고 황반에 모인다
        for (var r = -2; r <= 2; r++) {
            var off = r * (pupilSpread / 2);
            ctx.strokeStyle = 'rgba(250, 204, 21, 0.9)';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(dx + 0.99 * dw, lensY + off * 1.35);
            ctx.lineTo(lensX, lensY + off);
            ctx.lineTo(foveaX, foveaY);
            ctx.stroke();
        }

        // 황반에 맺히는 상 (깜빡임)
        var blink = 0.6 + Math.sin(time * 0.006) * 0.4;
        ctx.fillStyle = 'rgba(250, 204, 21, ' + blink.toFixed(2) + ')';
        ctx.beginPath();
        ctx.arc(foveaX, foveaY, 6, 0, Math.PI * 2);
        ctx.fill();

        drawCaptionPlate(
            dx + 12, dy + 12,
            [
                (isNear ? '가까운 물체 (' : '먼 물체 (') + targetDist + 'cm) ➔ 섬모체 ' + (isNear ? '수축' : '이완') + ' ➔ 수정체 ' + (isNear ? '두꺼워짐' : '얇아짐'),
                (lightLevel < 40 ? '어두움 (' : '밝음 (') + lightLevel + '%) ➔ 동공 ' + (lightLevel < 40 ? '확대' : '축소')
            ],
            isNear ? '#c084fc' : '#38bdf8'
        );

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Scene 6: Ear (청각 & 평형감각) Overlay
    // ------------------------------------------------------------------------
    function drawEarOverlay(dx, dy, dw, dh, time) {
        // 소리가 지나가는 길: 귓바퀴 ➔ 외이도 ➔ 고막 ➔ 귓속뼈 ➔ 달팽이관
        var path = [
            { x: 0.100, y: 0.450 },
            { x: 0.350, y: 0.570 },
            { x: 0.535, y: 0.500 },
            { x: 0.565, y: 0.405 },
            { x: 0.700, y: 0.470 },
            { x: 0.785, y: 0.505 }
        ];

        ctx.save();

        // 길 안내선
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        path.forEach(function (pt, i) {
            var px = dx + pt.x * dw, py = dy + pt.y * dh;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // 소리 알갱이 세 개가 길을 따라 흐른다
        var segCount = path.length - 1;
        for (var k = 0; k < 3; k++) {
            var t = ((earSoundPhase * 0.09) + k / 3) % 1;
            var fs = t * segCount;
            var si = Math.min(Math.floor(fs), segCount - 1);
            var lt = fs - si;
            var ax = dx + (path[si].x + (path[si + 1].x - path[si].x) * lt) * dw;
            var ay = dy + (path[si].y + (path[si + 1].y - path[si].y) * lt) * dh;

            ctx.fillStyle = '#38bdf8';
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            ctx.arc(ax, ay, 6, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // 귓바퀴로 들어오는 음파
        var waveX = dx + 0.100 * dw, waveY = dy + 0.450 * dh;
        for (var w = 0; w < 3; w++) {
            var rr = 14 + ((earSoundPhase * 2.2 + w * 14) % 42);
            ctx.strokeStyle = 'rgba(56, 189, 248, ' + (1 - rr / 56).toFixed(2) + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(waveX - 26, waveY, rr, -Math.PI / 3, Math.PI / 3);
            ctx.stroke();
        }

        // 고막 떨림
        var drumX = dx + 0.535 * dw, drumY = dy + 0.500 * dh;
        var wobble = Math.sin(earSoundPhase * 1.6) * 4;
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(drumX - 4, drumY - 0.075 * dh);
        ctx.quadraticCurveTo(drumX - 4 + wobble, drumY, drumX - 4, drumY + 0.075 * dh);
        ctx.stroke();

        // 반고리관·전정기관은 평형감각이라 소리 길과 색을 달리한다
        var balX = dx + 0.665 * dw, balY = dy + 0.215 * dh;
        var spin = time * 0.002;
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(balX, balY, 0.085 * dh, spin, spin + Math.PI * 1.35);
        ctx.stroke();

        drawCaptionPlate(
            dx + 12, dy + 12,
            [
                '소리: 귓바퀴 ➔ 외이도 ➔ 고막 ➔ 귓속뼈 ➔ 달팽이관 ➔ 대뇌',
                '평형: 반고리관(회전) · 전정기관(기울기) ➔ 소뇌'
            ],
            '#38bdf8'
        );

        ctx.restore();
    }

    /**
     * 화면 왼쪽 위에 까만 판을 깔고 설명 줄을 올린다. 배경 그림이 밝아도 글자가 읽힌다.
     */
    function drawCaptionPlate(px, py, lines, accent) {
        ctx.save();
        py = Math.max(py, 86); // 위쪽 장면 단추 줄 아래에서 시작
        ctx.font = 'bold 12px Pretendard, sans-serif';
        var maxW = 0;
        lines.forEach(function (t) { maxW = Math.max(maxW, ctx.measureText(t).width); });
        var boxW = maxW + 24, boxH = 14 + lines.length * 19;

        ctx.fillStyle = 'rgba(6, 10, 24, 0.82)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'left';
        lines.forEach(function (t, i) {
            ctx.fillStyle = i === 0 ? '#f8fafc' : '#cbd5e1';
            ctx.fillText(t, px + 12, py + 21 + i * 19);
        });
        ctx.textAlign = 'center';
        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Hotspots Rendering
    // ------------------------------------------------------------------------
    function drawHotspots(dx, dy, dw, dh, time) {
        if (currentSceneKey === 'brain') return; // Handled directly in overlay

        // 자율신경 장면은 도식이 기관과 설명을 직접 그리므로 표시점을 또 찍지 않는다
        if (currentSceneKey === 'autonomic') return;

        // 뉴런 장면도 그림 안에 이름이 이미 쓰여 있어 이름표를 또 달면 글자가 겹친다
        var labelDrawnByScene = (currentSceneKey === 'synapse');
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

            if (!labelDrawnByScene) {
                ctx.lineWidth = 1;
                drawLabelTag(sx, sy, spot.title.split(' (')[0], spot.side, 'rgba(9, 14, 30, 0.88)', '#a855f7');
            }
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
                activateSidebarTab(sidebarTabForScene(currentSceneKey));
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
                    activateSidebarTab('focus');
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
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                activateSidebarTab(btn.dataset.tab);
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });
    }

    function sidebarTabForScene(sceneKey) {
        if (sceneKey === 'autonomic') return 'autonomic';
        if (sceneKey === 'sensory' || sceneKey === 'ear' || sceneKey === 'synapse') return 'sensory';
        return 'focus';
    }

    function activateSidebarTab(tabName) {
        var tabBtns = document.querySelectorAll('.sidebar-tab-btn');
        var tabPanels = document.querySelectorAll('.sidebar-tab-panel');
        tabBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.tab === tabName); });
        tabPanels.forEach(function (p) { p.style.display = (p.id === 'tabPanel_' + tabName) ? 'block' : 'none'; });
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
            hudInstructionEl.innerHTML = '오른쪽 슬라이더로 <strong>물체 거리</strong>와 <strong>빛의 밝기</strong>를 바꿔 수정체 두께와 동공 크기를 살펴보세요.';
        } else if (sceneKey === 'ear') {
            hudInstructionEl.innerHTML = '소리가 <strong>귓바퀴 ➔ 외이도 ➔ 고막 ➔ 귓속뼈 ➔ 달팽이관</strong>으로 흐르는 길을 따라가 보세요. 부위를 누르면 설명이 나옵니다.';
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
