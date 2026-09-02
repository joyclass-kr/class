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

    var scenes = {
        joint: {
            src: '../assets/images/skeleton-hero.jpg',
            img: null,
            loaded: false
        },
        sarcomere: {
            src: '../assets/images/sarcomere-hero.jpg',
            img: null,
            loaded: false
        }
    };
    var currentSceneKey = 'joint';

    // Joint Biomechanical State
    var jointAngle = 75; // 30° (Max Flexion) ~ 180° (Full Extension)
    var isFlexing = false;
    var isDraggingHand = false;

    // Sarcomere Length State
    var sarcomereLength = 2.20; // 1.60 ~ 2.80 um

    // Hotspots per Scene
    var hotspots = {
        joint: [
            { x: 0.20, y: 0.28, r: 50, title: '위팔뼈 (Humerus)', desc: '팔의 위쪽 뼈로, 이두근과 삼두근이 부착되는 튼튼한 골격 지지대입니다.' },
            { x: 0.42, y: 0.35, r: 45, title: '위팔두갈래근 (이두근, Biceps)', desc: '팔을 굽힐 때 <strong>수축</strong>하여 노뼈를 당겨 올리는 주동근 역할을 합니다.' },
            { x: 0.28, y: 0.45, r: 45, title: '위팔세갈래근 (삼두근, Triceps)', desc: '팔을 굽힐 때 <strong>이완</strong>하고, 팔을 펼 때 <strong>수축</strong>하여 팔을 펴는 길항근입니다.' },
            { x: 0.45, y: 0.65, r: 40, title: '팔꿈치 관절 & 윤활액', desc: '관절 연골이 마찰을 방지하고 윤활액(활액)이 충격을 흡수하여 부드러운 회전을 가능케 합니다.' },
            { x: 0.58, y: 0.55, r: 35, title: '힘줄 (건, Tendon)', desc: '근육을 뼈에 단단히 고정하여 근육의 수축력을 뼈로 전달하는 질긴 결합 조직.' },
            { x: 0.72, y: 0.65, r: 45, title: '노뼈 & 자뼈 (Radius & Ulna)', desc: '아래팔의 2개 뼈로, 이두근이 노뼈(Radius)에 붙어 팔을 회전하고 당깁니다.' }
        ],
        sarcomere: [
            { x: 0.18, y: 0.50, r: 40, title: 'Z선 (Z-disc) - 근절 경계', desc: '근육 원섬유 마디(근절)의 양쪽 경계를 이루며, 수축 시 두 Z선 사이 거리가 짧아집니다.' },
            { x: 0.50, y: 0.50, r: 50, title: 'A대 (암대) - 마이오신 길이 (1.60μm 불변)', desc: '마이오신 필라멘트가 존재하는 구간으로, 수축이나 이완 시에도 <strong>길이가 절대 변하지 않습니다</strong>.' },
            { x: 0.50, y: 0.38, r: 40, title: 'H대 (마이오신만 있는 구간)', desc: 'A대 중앙에서 액틴과 겹치지 않는 구간으로, 근육 수축 시 <strong>감소</strong>합니다.' },
            { x: 0.30, y: 0.60, r: 40, title: 'I대 (명대) - 액틴만 있는 구간', desc: 'Z선을 중심으로 액틴만 존재하는 밝은 구간으로, 근육 수축 시 <strong>감소</strong>합니다.' }
        ]
    };

    // DOM Elements
    var playPauseBtn, flexBtn, extendBtn;
    var angleSlider, angleValEl;
    var bicepsStatusEl, tricepsStatusEl, romGaugeEl;
    var organDetailCard, organTitleEl, organDescEl;

    function init() {
        canvas = document.getElementById('skeletonCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        Object.keys(scenes).forEach(function (key) {
            var item = scenes[key];
            var img = new Image();
            img.src = item.src;
            img.onload = function () {
                item.img = img;
                item.loaded = true;
            };
        });

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
        var dt = Math.min(0.05, (time - lastTime) / 1000 || 0.016);
        lastTime = time;

        if (isRunning) {
            updatePhysics(dt);
        }

        drawScene(time);
        requestAnimationFrame(renderLoop);
    }

    function updatePhysics(dt) {
        if (isFlexing) {
            jointAngle -= dt * 60;
            if (jointAngle <= 40) {
                jointAngle = 40;
                isFlexing = false;
            }
            if (angleSlider) angleSlider.value = Math.round(jointAngle);
        }

        var isBicepsContracted = jointAngle < 100;

        // Map joint angle to sarcomere length (170° = 2.80um relaxed, 40° = 1.60um contracted)
        sarcomereLength = 1.60 + ((jointAngle - 40) / 130) * 1.20;

        if (angleValEl) angleValEl.textContent = Math.round(jointAngle) + '° (' + (jointAngle < 90 ? '굽힘 Flexion 🔥' : '폄 Extension ↔️') + ')';
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

            // Draw Dimmed Background Image
            ctx.save();
            ctx.globalAlpha = 0.45;
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();

            // Draw Dynamic Kinematic Arm or Sarcomere Sliding Model
            if (currentSceneKey === 'sarcomere') {
                drawSarcomereRig(dx, dy, dw, dh, time);
            } else {
                drawKinematicArmRig(dx, dy, dw, dh, time);
            }

            // Draw Interactive Hotspots
            drawHotspots(dx, dy, dw, dh, time);
        } else {
            ctx.fillStyle = '#0a0f1d';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 16px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('⚡ 근골격계 시뮬레이터 로딩 중...', width / 2, height / 2);
        }
    }

    // ------------------------------------------------------------------------
    // Sarcomere Sliding Filament Theory Rig
    // ------------------------------------------------------------------------
    function drawSarcomereRig(dx, dy, dw, dh, time) {
        var cx = dx + 0.50 * dw;
        var cy = dy + 0.50 * dh;

        // Sarcomere parameters: A-band is strictly 1.60um constant
        var aBandWidth = 240 * (dw / 800);
        var zDistance = (sarcomereLength / 2.20) * 320 * (dw / 800);
        var leftZ = cx - zDistance / 2;
        var rightZ = cx + zDistance / 2;

        // 1. Z-Lines (Left & Right)
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(leftZ, cy - 80);
        ctx.lineTo(leftZ, cy + 80);
        ctx.moveTo(rightZ, cy - 80);
        ctx.lineTo(rightZ, cy + 80);
        ctx.stroke();

        // 2. Thick Myosin Filament (A-Band, strictly fixed length!)
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 16;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(cx - aBandWidth / 2, cy);
        ctx.lineTo(cx + aBandWidth / 2, cy);
        ctx.stroke();

        // 3. Thin Actin Filaments attached to Z-lines (sliding inwards)
        var actinLen = 140 * (dw / 800);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#38bdf8';

        // Upper actin pair
        ctx.beginPath();
        ctx.moveTo(leftZ, cy - 30);
        ctx.lineTo(leftZ + actinLen, cy - 30);
        ctx.moveTo(rightZ, cy - 30);
        ctx.lineTo(rightZ - actinLen, cy - 30);

        // Lower actin pair
        ctx.moveTo(leftZ, cy + 30);
        ctx.lineTo(leftZ + actinLen, cy + 30);
        ctx.moveTo(rightZ, cy + 30);
        ctx.lineTo(rightZ - actinLen, cy + 30);
        ctx.stroke();

        // Telemetry HUD Card on Canvas
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(cx - 150, cy + 100, 300, 60);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 150, cy + 100, 300, 60);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('근절 길이(X): ' + sarcomereLength.toFixed(2) + ' μm | A대(불변): 1.60 μm', cx, cy + 124);
        ctx.fillStyle = sarcomereLength < 2.0 ? '#f43f5e' : '#38bdf8';
        ctx.fillText(sarcomereLength < 2.0 ? '🔥 활주설 수축 (I대·H대 감소, 겹치는 구간 증가)' : '↔️ 활주설 이완 상태', cx, cy + 146);
        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Real Kinematic Arm Rig: Bones, Rotating Forearm, and Bulging Muscles
    // ------------------------------------------------------------------------
    function drawKinematicArmRig(dx, dy, dw, dh, time) {
        var shoulderX = dx + 0.18 * dw;
        var shoulderY = dy + 0.28 * dh;
        var elbowX = dx + 0.45 * dw;
        var elbowY = dy + 0.65 * dh;

        var forearmLength = 0.38 * dw;
        // Joint angle mapping (170° = straight right, 40° = bent toward shoulder)
        var forearmAngleRad = -Math.PI * (1 - (jointAngle / 180));
        var wristX = elbowX + Math.cos(forearmAngleRad) * forearmLength;
        var wristY = elbowY + Math.sin(forearmAngleRad) * forearmLength;

        // Biceps attachment on Radius
        var radiusAttachX = elbowX + Math.cos(forearmAngleRad) * (forearmLength * 0.28);
        var radiusAttachY = elbowY + Math.sin(forearmAngleRad) * (forearmLength * 0.28);

        var flexRatio = (180 - jointAngle) / 140; // 0.0 (Extended) ~ 1.0 (Flexed)

        // 1. Triceps Muscle (Back of Upper Arm - Extensor)
        var tricepsThickness = 14 + (1 - flexRatio) * 22; // Thicker when extended
        var tricepsMidX = (shoulderX + elbowX) / 2 - 25 * (dw / 800);
        var tricepsMidY = (shoulderY + elbowY) / 2 + 10 * (dh / 600);

        ctx.save();
        ctx.strokeStyle = flexRatio < 0.4 ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = tricepsThickness;
        ctx.lineCap = 'round';
        ctx.shadowBlur = flexRatio < 0.4 ? 18 : 6;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(shoulderX - 10, shoulderY + 15);
        ctx.quadraticCurveTo(tricepsMidX, tricepsMidY, elbowX - 8, elbowY + 8);
        ctx.stroke();
        ctx.restore();

        // 2. Humerus Bone (Upper Arm)
        ctx.save();
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.lineTo(elbowX, elbowY);
        ctx.stroke();
        ctx.restore();

        // 3. Biceps Muscle (Front of Upper Arm - Flexor, Bulges on Flexion!)
        var bicepsThickness = 16 + flexRatio * 32; // 16px (thin) ~ 48px (bulging peak!)
        var bicepsMidX = (shoulderX + radiusAttachX) / 2 + (flexRatio * 18 - 8) * (dw / 800);
        var bicepsMidY = (shoulderY + radiusAttachY) / 2 - (15 + flexRatio * 20) * (dh / 600);

        ctx.save();
        var bicepsColor = flexRatio > 0.5 ? '#f43f5e' : 'rgba(244, 63, 94, 0.5)';
        ctx.strokeStyle = bicepsColor;
        ctx.lineWidth = bicepsThickness;
        ctx.lineCap = 'round';
        ctx.shadowBlur = flexRatio > 0.5 ? 24 : 8;
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(shoulderX + 5, shoulderY - 5);
        ctx.quadraticCurveTo(bicepsMidX, bicepsMidY, radiusAttachX, radiusAttachY);
        ctx.stroke();

        // Muscle striation lines on peak bulge
        if (flexRatio > 0.6) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(bicepsMidX - 10, bicepsMidY - 8);
            ctx.lineTo(bicepsMidX + 10, bicepsMidY + 8);
            ctx.stroke();
        }
        ctx.restore();

        // 4. White Tendon Attachments
        ctx.save();
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(radiusAttachX, radiusAttachY);
        ctx.lineTo(elbowX + Math.cos(forearmAngleRad) * 15, elbowY + Math.sin(forearmAngleRad) * 15);
        ctx.stroke();
        ctx.restore();

        // 5. Forearm Bones (Radius & Ulna) Rotates in Real-Time!
        ctx.save();
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(elbowX, elbowY);
        ctx.lineTo(wristX, wristY);
        ctx.stroke();
        ctx.restore();

        // 6. Elbow Joint Cartilage & Synovial Capsule
        ctx.save();
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(elbowX, elbowY, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 7. Interactive Draggable Hand/Wrist Handle
        ctx.save();
        ctx.fillStyle = '#0284c7';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(wristX, wristY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✋ 잡고 당기기', wristX, wristY + 32);
        ctx.restore();

        // 8. Range of Motion Arc
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(elbowX, elbowY, 50, -Math.PI * 0.9, 0);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    function drawHotspots(dx, dy, dw, dh, time) {
        for (var i = 0; i < hotspots.length; i++) {
            var s = hotspots[i];
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

            // Center Pin
            ctx.fillStyle = '#38bdf8';
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
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(labelText, sx, sy - 17);
            ctx.restore();
        }
    }

    function bindDOM() {
        var sceneBtns = document.querySelectorAll('[data-scene]');
        var skeletonHudText = document.getElementById('skeletonHudText');
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

        sceneBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                sceneBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentSceneKey = btn.dataset.scene;

                if (skeletonHudText) {
                    skeletonHudText.innerHTML = currentSceneKey === 'sarcomere' ?
                        '슬라이더나 버튼으로 팔을 움직이면 <strong>근절 길이(X)와 I대·H대가 실시간으로 줄어들고 A대(1.60μm)는 불변</strong>하는 것을 확인하세요.' :
                        '화면의 <strong>[✋ 잡고 당기기]</strong> 핸들을 마우스로 잡고 당겨 이두근과 삼두근의 실시간 수축을 확인하세요.';
                }

                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
            });
        });

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

                var current = scenes[currentSceneKey];
                if (!current || !current.loaded || !current.img) return;

                var imgAspect = current.img.width / current.img.height;
                var canvasAspect = width / height;
                var dw, dh, dx, dy;

                if (canvasAspect > imgAspect) {
                    dh = height; dw = height * imgAspect;
                    dx = (width - dw) / 2; dy = 0;
                } else {
                    dw = width; dh = width / imgAspect;
                    dx = 0; dy = (height - dh) / 2;
                }

                // Check Wrist/Hand Handle Drag
                var elbowX = dx + 0.45 * dw;
                var elbowY = dy + 0.65 * dh;
                var forearmLength = 0.38 * dw;
                var forearmAngleRad = -Math.PI * (1 - (jointAngle / 180));
                var wristX = elbowX + Math.cos(forearmAngleRad) * forearmLength;
                var wristY = elbowY + Math.sin(forearmAngleRad) * forearmLength;

                var distHand = Math.hypot(clickX - wristX, clickY - wristY);
                if (distHand <= 45) {
                    isDraggingHand = true;
                    canvas.setPointerCapture(event.pointerId);
                    if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
                    return;
                }

                var spotList = hotspots[currentSceneKey] || [];
                for (var i = 0; i < spotList.length; i++) {
                    var s = spotList[i];
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

            canvas.addEventListener('pointermove', function (event) {
                if (!isDraggingHand) return;
                var rect = canvas.getBoundingClientRect();
                var clickX = event.clientX - rect.left;
                var clickY = event.clientY - rect.top;

                var current = scenes[currentSceneKey];
                if (!current || !current.img) return;

                var imgAspect = current.img.width / current.img.height;
                var canvasAspect = width / height;
                var dw = canvasAspect > imgAspect ? height * imgAspect : width;
                var dh = canvasAspect > imgAspect ? height : width / imgAspect;
                var dx = canvasAspect > imgAspect ? (width - dw) / 2 : 0;
                var dy = canvasAspect > imgAspect ? 0 : (height - dh) / 2;

                var elbowX = dx + 0.45 * dw;
                var elbowY = dy + 0.65 * dh;

                // Calculate angle from elbow to mouse cursor
                var angleToCursor = Math.atan2(clickY - elbowY, clickX - elbowX); // -PI ~ PI
                // Map to Joint ROM: 40° ~ 170°
                var rawDeg = (1 + angleToCursor / Math.PI) * 180;
                var clampedAngle = Math.max(35, Math.min(175, rawDeg));

                jointAngle = Math.round(clampedAngle);
                if (angleSlider) angleSlider.value = jointAngle;
            });

            canvas.addEventListener('pointerup', function (event) {
                if (isDraggingHand) {
                    isDraggingHand = false;
                    try { canvas.releasePointerCapture(event.pointerId); } catch (e) {}
                }
            });

            canvas.addEventListener('pointercancel', function () {
                isDraggingHand = false;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
