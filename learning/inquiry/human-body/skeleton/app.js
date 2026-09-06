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
    var isExtending = false;
    var isDraggingHand = false;

    // Sarcomere Length State
    var sarcomereLength = 2.24; // 2.00 ~ 2.80 μm (A대 1.60 + 액틴 한쪽 1.00 기준)

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
        renderQuizSkeleton();
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

    /** 사이드바 아래 개념 퀴즈를 그린다 */
    function renderQuizSkeleton() {
        if (typeof ExamData === 'undefined' || typeof SimEngine === 'undefined') return;
        var box = document.getElementById('quizContainer');
        var data = ExamData.skeleton;
        if (!box || !data || !data.quizzes) return;
        SimEngine.renderQuizSet(box, data.quizzes);
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
            jointAngle -= dt * 70;
            if (jointAngle <= 40) {
                jointAngle = 40;
                isFlexing = false;
            }
            if (angleSlider) angleSlider.value = Math.round(jointAngle);
        } else if (isExtending) {
            jointAngle += dt * 70;
            if (jointAngle >= 170) {
                jointAngle = 170;
                isExtending = false;
            }
            if (angleSlider) angleSlider.value = Math.round(jointAngle);
        }

        var isBicepsContracted = jointAngle < 100;

        // Map joint angle to sarcomere length (170° = 2.80um relaxed, 40° = 1.60um contracted)
        sarcomereLength = 2.00 + ((jointAngle - 30) / 150) * 0.80;

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

        // 팔 장면은 사진을 쓰지 않는다. 사진은 비스듬한 데다 영어 이름이 박혀 있어
        // 팔을 펴도 'BICEPS (CONTRACTED)'라고 적힌 채로 남는다.
        if (currentSceneKey === 'joint') {
            var stage = ctx.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.5, width * 0.75);
            stage.addColorStop(0, '#0d1730');
            stage.addColorStop(1, '#05070f');
            ctx.fillStyle = stage;
            ctx.fillRect(0, 0, width, height);
            var box = stageBox();
            ctx.save();
            ctx.translate(box.ox, box.oy);
            ctx.scale(box.k, box.k);
            drawArmSchematic(0, 0, VW, VH, time);
            ctx.restore();
            return;
        }

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
            ctx.globalAlpha = 0.22;
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();

            // Draw Dynamic Kinematic Arm or Sarcomere Sliding Model
            drawSarcomereRig(dx, dy, dw, dh, time);
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
    // Scene 2: Sarcomere Sliding Filament Theory (근절 활주설)
    // ------------------------------------------------------------------------
    function drawSarcomereRig(dx, dy, dw, dh, time) {
        smartTagBoxes = [];
        var cx = dx + 0.50 * dw;
        var cy = dy + 0.44 * dh;

        // Sarcomere parameters: A-band is strictly 1.60um constant
        var aBandWidth = 240 * (dw / 800);
        var zDistance = (sarcomereLength / 2.20) * 320 * (dw / 800);
        var leftZ = cx - zDistance / 2;
        var rightZ = cx + zDistance / 2;

        var isContracting = sarcomereLength < 2.40;

        ctx.save();

        // ── 0. 배경 미세 그리드 ──────────────────────────────────
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.lineWidth = 1;
        for (var gy = -120; gy <= 120; gy += 40) {
            ctx.beginPath();
            ctx.moveTo(cx - 360, cy + gy);
            ctx.lineTo(cx + 360, cy + gy);
            ctx.stroke();
        }

        // ── 1. Z선 (Z-disc: α-액티닌 지그재그 골격 격자) ─────────
        [leftZ, rightZ].forEach(function (zx) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 5;
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            var zTop = cy - 90, zBottom = cy + 90;
            var zSteps = 12;
            var stepH = (zBottom - zTop) / zSteps;
            ctx.moveTo(zx, zTop);
            for (var zi = 1; zi <= zSteps; zi++) {
                var zigX = zx + ((zi % 2 === 1) ? 7 : -7);
                ctx.lineTo(zigX, zTop + zi * stepH);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Z선 상/하단 앵커 닷
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(zx, zTop, 4.5, 0, Math.PI * 2);
            ctx.arc(zx, zBottom, 4.5, 0, Math.PI * 2);
            ctx.fill();
        });

        // ── 2. M선 (M-line: 근절 중심 고정 단백질) ───────────────
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.65)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 75);
        ctx.lineTo(cx, cy + 75);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 11px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('M선 (중심선)', cx, cy - 82);

        // ── 3. 굵은 마이오신 필라멘트 (A대, 1.60μm 길이 불변!) ────
        var myoLeft = cx - aBandWidth / 2;
        var myoRight = cx + aBandWidth / 2;

        // 마이오신 줄기 본체
        var myoGrad = ctx.createLinearGradient(0, cy - 10, 0, cy + 10);
        myoGrad.addColorStop(0, '#9f1239');
        myoGrad.addColorStop(0.5, '#f43f5e');
        myoGrad.addColorStop(1, '#881337');

        ctx.fillStyle = myoGrad;
        ctx.strokeStyle = '#fda4af';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(244, 63, 94, 0.65)';
        ctx.beginPath();
        ctx.roundRect(myoLeft, cy - 10, aBandWidth, 20, 5);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 마이오신 머리 (Myosin Heads / Cross-Bridges): 액틴을 향해 돋아난 머리들
        var headPairs = 8;
        var headSpacing = aBandWidth / (headPairs + 1);
        for (var hi = 1; hi <= headPairs; hi++) {
            // M선 중앙 근처(베어 존)는 머리가 없음
            if (hi === 4 || hi === 5) continue;

            var hx = myoLeft + hi * headSpacing;
            // 활주 운동 시 마이오신 머리가 액틴을 중앙으로 끌어당기는 파워 스트로크 틸트 각도
            var strokeTilt = isContracting ? Math.sin(time * 0.007 + hi) * 5 : 0;
            var tiltDir = (hx < cx) ? 1 : -1; // 양쪽에서 중앙(M선) 쪽으로 당김

            // 위쪽 머리들
            ctx.fillStyle = '#fb7185';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(hx + tiltDir * strokeTilt, cy - 16, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(hx, cy - 8);
            ctx.lineTo(hx + tiltDir * strokeTilt, cy - 13);
            ctx.stroke();

            // 아래쪽 머리들
            ctx.beginPath();
            ctx.arc(hx + tiltDir * strokeTilt, cy + 16, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(hx, cy + 8);
            ctx.lineTo(hx + tiltDir * strokeTilt, cy + 13);
            ctx.stroke();
        }

        // ── 4. 가는 액틴 필라멘트 (Z선에 고정되어 중앙으로 미끄러져 들어감) ─
        var actinLen = 145 * (dw / 800);
        var actinLevels = [-32, 32];

        actinLevels.forEach(function (ayOff) {
            var yPos = cy + ayOff;

            // 좌측 액틴 가닥 (Z선 ➔ 오른쪽으로 연장)
            var leftActinEnd = leftZ + actinLen;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 6;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            ctx.moveTo(leftZ, yPos);
            ctx.lineTo(leftActinEnd, yPos);
            ctx.stroke();

            // 우측 액틴 가닥 (Z선 ➔ 왼쪽으로 연장)
            var rightActinEnd = rightZ - actinLen;
            ctx.beginPath();
            ctx.moveTo(rightZ, yPos);
            ctx.lineTo(rightActinEnd, yPos);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // 이중 나선형 액틴 비드 질감 묘사
            ctx.fillStyle = '#bae6fd';
            for (var bx = leftZ + 8; bx < leftActinEnd - 4; bx += 10) {
                ctx.beginPath();
                ctx.arc(bx, yPos + Math.sin(bx * 0.4) * 2, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
            for (var rx = rightZ - 8; rx > rightActinEnd + 4; rx -= 10) {
                ctx.beginPath();
                ctx.arc(rx, yPos + Math.sin(rx * 0.4) * 2, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // ── 5. 구간별 측정 치수선 (A대, I대, H대, 근절 X) ────────
        // 상단 근절 전체 길이 (X) 치수선
        var dimY = cy - 110;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(leftZ, dimY); ctx.lineTo(rightZ, dimY);
        ctx.moveTo(leftZ, dimY - 6); ctx.lineTo(leftZ, dimY + 6);
        ctx.moveTo(rightZ, dimY - 6); ctx.lineTo(rightZ, dimY + 6);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('근절 길이 (X): ' + sarcomereLength.toFixed(2) + ' μm', cx, dimY - 8);

        // 하단 A대 (마이오신 길이, 1.60μm 절대 불변) 치수선
        var aDimY = cy + 55;
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(myoLeft, aDimY); ctx.lineTo(myoRight, aDimY);
        ctx.moveTo(myoLeft, aDimY - 6); ctx.lineTo(myoLeft, aDimY + 6);
        ctx.moveTo(myoRight, aDimY - 6); ctx.lineTo(myoRight, aDimY + 6);
        ctx.stroke();

        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.fillText('A대 (암대): 1.60 μm (절대 불변!)', cx, aDimY + 18);

        // ── 6. 하단 실시간 텔레메트리 HUD 카드 ───────────────────
        var aBand = 1.60;
        var hZone = Math.max(0, sarcomereLength - 2.00);
        var iBand = Math.max(0, (sarcomereLength - aBand) / 2);

        var hudW = Math.min(460, dw - 40);
        var hudH = 88;
        var hudX = cx - hudW / 2;
        var hudY = cy + 105;

        ctx.fillStyle = 'rgba(6, 11, 25, 0.92)';
        ctx.strokeStyle = isContracting ? '#f43f5e' : '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(hudX, hudY, hudW, hudH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 13px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('🔬 근절 수축 텔레메트리 (근원섬유 마디 실시간 측정)', cx, hudY + 22);

        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.fillStyle = '#facc15';
        ctx.fillText('A대 1.60μm (불변)   |   H대 ' + hZone.toFixed(2) + 'μm   |   I대(한쪽) ' + iBand.toFixed(2) + 'μm', cx, hudY + 46);

        ctx.font = '11.5px Pretendard, sans-serif';
        ctx.fillStyle = isContracting ? '#fca5a5' : '#7dd3fc';
        ctx.fillText(
            isContracting ?
            '🔥 수축: 마이오신 머리가 액틴을 끌어당겨 H대와 I대가 함께 감소' :
            '↔️ 이완: 액틴이 바깥으로 밀려나며 H대와 I대가 함께 증가',
            cx, hudY + 70
        );

        // ── 7. 스마트 라벨 태그 (Z선, A대, H대, I대 클릭 연동) ────
        drawSmartTag(
            leftZ, cy - 75,
            leftZ - 0.12 * dw, cy - 0.14 * dh,
            'Z선 (Z-disc)', '근절 경계 (수축 시 접근)', '#38bdf8', 0
        );

        drawSmartTag(
            myoRight, cy,
            myoRight + 0.12 * dw, cy + 0.05 * dh,
            'A대 (암대)', '1.60μm (길이 절대 불변!)', '#f43f5e', 1
        );

        drawSmartTag(
            cx, cy - 10,
            cx + 0.12 * dw, cy - 0.12 * dh,
            'H대 (H-zone)', '수축 시 감소 (마이오신만)', '#facc15', 2
        );

        drawSmartTag(
            (leftZ + myoLeft) / 2, cy - 32,
            (leftZ + myoLeft) / 2 - 0.08 * dw, cy + 0.06 * dh,
            'I대 (명대)', '수축 시 감소 (액틴만)', '#bae6fd', 3
        );

        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // Scene 1: Biomechanical Anatomical Arm Kinematics (골격 & 길항근 렌더링 엔진)
    // ------------------------------------------------------------------------

    var jointPins = []; // 클릭 판정 랜드마크 핀

    // 팔 도식은 이 크기의 가상 화면에 그린 뒤 통째로 줄여 넣는다.
    // 그래야 화면이 좁아져도 그림과 글자가 같은 비율로 작아진다.
    var VW = 1000, VH = 560;

    function stageBox() {
        var k = Math.min(width / VW, height / VH);
        return { k: k, ox: (width - VW * k) / 2, oy: (height - VH * k) / 2 };
    }

    /** 위쪽 장면 단추 줄이 가리는 높이를 가상 좌표로 환산한다 */
    function topGuard() {
        var k = stageBox().k || 1;
        return Math.min(92 / k, VH * 0.35);
    }

    function toVirtual(x, y) {
        var b = stageBox();
        return { x: (x - b.ox) / b.k, y: (y - b.oy) / b.k };
    }

    /** 어깨·팔꿈치·손목 관절 좌표 및 굽힘도 계산 */
    function armGeometry(dx, dy, dw, dh) {
        var sx = dx + 0.38 * dw;
        var sy = dy + 0.16 * dh;
        var upperLen = 0.35 * dh;
        var ex = sx, ey = sy + upperLen;
        var foreLen = 0.35 * dh;

        var th = jointAngle * Math.PI / 180;
        var fx = Math.sin(th), fy = -Math.cos(th); // 팔꿈치 ➔ 손목 방향 벡터
        var wx = ex + fx * foreLen, wy = ey + fy * foreLen;

        return {
            sx: sx, sy: sy, ex: ex, ey: ey, wx: wx, wy: wy,
            fx: fx, fy: fy, upperLen: upperLen, foreLen: foreLen,
            flex: (180 - jointAngle) / 150   // 0 = 완전 신전(180°), 1 = 최대 굴곡(30°)
        };
    }

    /** 1. 배경 바이오메카닉스 모션 분석 랩 무대 */
    function drawBiomechanicalStage(dw, dh, g, time) {
        ctx.save();
        var bg = ctx.createRadialGradient(g.ex, g.ey, 40, g.ex, g.ey, Math.max(dw, dh) * 0.85);
        bg.addColorStop(0, '#0c1a36');
        bg.addColorStop(0.55, '#060d20');
        bg.addColorStop(1, '#02050f');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, dw, dh);

        // 정밀 모션 분석 그리드 & 동심원 가이드라인
        var rList = [g.foreLen * 0.40, g.foreLen * 0.70, g.foreLen * 1.00, g.foreLen * 1.25];
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        rList.forEach(function (r) {
            ctx.beginPath();
            ctx.arc(g.ex, g.ey, r, 0, Math.PI * 2);
            ctx.stroke();
        });

        // 각도 방사선 가이드 (30°, 60°, 90°, 120°, 150°, 180°)
        [30, 60, 90, 120, 150, 180].forEach(function (deg) {
            var rad = (deg * Math.PI / 180);
            var rfx = Math.sin(rad), rfy = -Math.cos(rad);
            ctx.beginPath();
            ctx.moveTo(g.ex, g.ey);
            ctx.lineTo(g.ex + rfx * g.foreLen * 1.30, g.ey + rfy * g.foreLen * 1.30);
            ctx.stroke();
        });
        ctx.setLineDash([]);

        // 굴곡존 (30° ~ 90°): 장미빛 틴트
        ctx.fillStyle = 'rgba(244, 63, 94, 0.035)';
        ctx.beginPath();
        ctx.moveTo(g.ex, g.ey);
        ctx.arc(g.ex, g.ey, g.foreLen * 1.15, -Math.PI / 2 + (30 * Math.PI / 180), -Math.PI / 2 + (90 * Math.PI / 180));
        ctx.closePath();
        ctx.fill();

        // 신전존 (90° ~ 180°): 시안빛 틴트
        ctx.fillStyle = 'rgba(56, 189, 248, 0.035)';
        ctx.beginPath();
        ctx.moveTo(g.ex, g.ey);
        ctx.arc(g.ex, g.ey, g.foreLen * 1.15, -Math.PI / 2 + (90 * Math.PI / 180), -Math.PI / 2 + (180 * Math.PI / 180));
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    /** 2. 어깨뼈(견갑골) 및 빗장뼈(쇄골), 흉곽 실루엣 */
    function drawAnatomicalTorsoAndShoulder(g, dw, dh) {
        ctx.save();
        var sx = g.sx, sy = g.sy;

        // 흉곽 및 어깨 실루엣 (해부학적 몸체 맥락 부여)
        ctx.fillStyle = 'rgba(15, 28, 60, 0.45)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(sx - 0.15 * dw, sy + 0.32 * dh);
        ctx.quadraticCurveTo(sx - 0.13 * dw, sy + 0.08 * dh, sx - 0.04 * dw, sy - 0.04 * dh);
        ctx.quadraticCurveTo(sx + 0.02 * dw, sy - 0.05 * dh, sx + 0.06 * dw, sy - 0.02 * dh);
        ctx.quadraticCurveTo(sx + 0.04 * dw, sy + 0.06 * dh, sx - 0.01 * dw, sy + 0.18 * dh);
        ctx.quadraticCurveTo(sx - 0.03 * dw, sy + 0.32 * dh, sx - 0.15 * dw, sy + 0.32 * dh);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 어깨뼈(견갑골 - Scapula) 입체 렌더링
        var scapulaGrad = ctx.createLinearGradient(sx - 0.09 * dw, sy, sx - 0.01 * dw, sy + 0.12 * dh);
        scapulaGrad.addColorStop(0, '#1e293b');
        scapulaGrad.addColorStop(0.4, '#475569');
        scapulaGrad.addColorStop(0.8, '#64748b');
        scapulaGrad.addColorStop(1, '#94a3b8');

        ctx.fillStyle = scapulaGrad;
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.65)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx - 0.08 * dw, sy + 0.02 * dh);
        ctx.lineTo(sx - 0.02 * dw, sy - 0.02 * dh);
        ctx.lineTo(sx - 0.005 * dw, sy + 0.04 * dh);
        ctx.lineTo(sx - 0.06 * dw, sy + 0.16 * dh);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 빗장뼈 (쇄골 - Clavicle)
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sx - 0.12 * dw, sy - 0.05 * dh);
        ctx.quadraticCurveTo(sx - 0.05 * dw, sy - 0.07 * dh, sx - 0.01 * dw, sy - 0.025 * dh);
        ctx.stroke();

        ctx.restore();
    }

    /** 3. 위팔뼈 (상완골 - Humerus): 3D 원통 볼륨 셰이딩 및 상/하단 관절면 */
    function drawAnatomicalHumerus(g, dw, dh) {
        ctx.save();
        var sx = g.sx, sy = g.sy;
        var ex = g.ex, ey = g.ey;
        var len = g.upperLen;

        // 위팔뼈 3D 셰이딩 선형 그라데이션
        var boneGrad = ctx.createLinearGradient(sx - 0.028 * dw, sy, sx + 0.028 * dw, sy);
        boneGrad.addColorStop(0.00, '#334155');
        boneGrad.addColorStop(0.18, '#94a3b8');
        boneGrad.addColorStop(0.42, '#ffffff'); // 중심 능선 하이라이트
        boneGrad.addColorStop(0.70, '#e2e8f0');
        boneGrad.addColorStop(1.00, '#475569');

        ctx.fillStyle = boneGrad;
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(148, 197, 255, 0.35)';

        ctx.beginPath();
        // 1. 위팔뼈 머리 (Humeral Head - 둥근 관절구)
        ctx.arc(sx, sy, 0.038 * dh, Math.PI, 0, false);
        // 2. 외측 대결절 및 외측 윤곽
        ctx.quadraticCurveTo(sx + 0.024 * dw, sy + len * 0.18, sx + 0.016 * dw, sy + len * 0.50);
        // 3. 외측 상과로 넓어짐
        ctx.quadraticCurveTo(sx + 0.018 * dw, sy + len * 0.82, ex + 0.025 * dw, ey - 0.012 * dh);
        // 4. 도르래(활차) 및 소두 관절면 하단
        ctx.quadraticCurveTo(ex + 0.012 * dw, ey + 0.015 * dh, ex, ey + 0.015 * dh);
        ctx.quadraticCurveTo(ex - 0.012 * dw, ey + 0.015 * dh, ex - 0.025 * dw, ey - 0.012 * dh);
        // 5. 내측 윤곽 및 결절 능선
        ctx.quadraticCurveTo(sx - 0.018 * dw, sy + len * 0.82, sx - 0.016 * dw, sy + len * 0.50);
        ctx.quadraticCurveTo(sx - 0.024 * dw, sy + len * 0.18, sx - 0.038 * dh, sy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 관절 연골 캡 (Articular Cartilage)
        ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.beginPath();
        ctx.arc(sx, sy, 0.038 * dh, Math.PI * 1.15, Math.PI * 1.85);
        ctx.fill();

        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.beginPath();
        ctx.arc(ex, ey, 0.022 * dh, 0, Math.PI);
        ctx.fill();

        ctx.restore();
    }

    /** 4. 아래팔 뼈 (노뼈 Radius & 자뼈 Ulna): 주두(팔꿈치머리) 및 노뼈거친면 */
    function drawAnatomicalForearm(g, dw, dh) {
        ctx.save();
        var ex = g.ex, ey = g.ey;
        var wx = g.wx, wy = g.wy;
        var fx = g.fx, fy = g.fy;
        var px = -fy, py = fx; // 팔 방향의 수직 법선 벡터
        var foreLen = g.foreLen;

        // ── 1. 자뼈 (Ulna - 뒤쪽, 주두로 관절을 감싸고 삼두근이 붙음) ──
        var oleX = ex - fx * 0.026 * dh + px * 0.024 * dw;
        var oleY = ey - fy * 0.026 * dh + py * 0.024 * dw;
        var uBaseX = ex + px * 0.016 * dw, uBaseY = ey + py * 0.016 * dw;
        var uWristX = wx + px * 0.014 * dw, uWristY = wy + py * 0.014 * dw;

        var ulnaGrad = ctx.createLinearGradient(uBaseX - px * 15, uBaseY - py * 15, uBaseX + px * 15, uBaseY + py * 15);
        ulnaGrad.addColorStop(0.0, '#334155');
        ulnaGrad.addColorStop(0.3, '#94a3b8');
        ulnaGrad.addColorStop(0.5, '#ffffff');
        ulnaGrad.addColorStop(0.8, '#cbd5e1');
        ulnaGrad.addColorStop(1.0, '#475569');

        ctx.fillStyle = ulnaGrad;
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.85)';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(oleX, oleY); // 주두 끝 (삼두근건 부착부)
        ctx.quadraticCurveTo(oleX - px * 0.015 * dw, oleY - py * 0.015 * dw, ex + px * 0.005 * dw, ey + py * 0.005 * dw);
        ctx.lineTo(uWristX, uWristY);
        ctx.quadraticCurveTo(uWristX + px * 0.012 * dw, uWristY + py * 0.012 * dw, uWristX + px * 0.018 * dw, uWristY + py * 0.018 * dw);
        ctx.lineTo(uBaseX + px * 0.024 * dw, uBaseY + py * 0.024 * dw);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // ── 2. 골간막 (Interosseous membrane) ──
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        for (var mi = 0.25; mi <= 0.85; mi += 0.12) {
            var mx1 = ex + fx * (foreLen * mi);
            var my1 = ey + fy * (foreLen * mi);
            var mx2 = uBaseX + fx * (foreLen * mi);
            var my2 = uBaseY + fy * (foreLen * mi);
            ctx.beginPath();
            ctx.moveTo(mx1, my1);
            ctx.lineTo(mx2, my2);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // ── 3. 노뼈 (Radius - 앞쪽, 원판형 요골두와 이두근건 부착 거친면) ──
        var rHeadX = ex - px * 0.008 * dw, rHeadY = ey - py * 0.008 * dw;
        var rTubX = ex + fx * (foreLen * 0.22) - px * 0.016 * dw; // 노뼈 거친면 (이두근건 부착)
        var rTubY = ey + fy * (foreLen * 0.22) - py * 0.016 * dw;
        var rWristX = wx - px * 0.008 * dw, rWristY = wy - py * 0.008 * dw;

        var radGrad = ctx.createLinearGradient(rHeadX - px * 15, rHeadY - py * 15, rHeadX + px * 15, rHeadY + py * 15);
        radGrad.addColorStop(0.0, '#334155');
        radGrad.addColorStop(0.2, '#94a3b8');
        radGrad.addColorStop(0.45, '#ffffff');
        radGrad.addColorStop(0.75, '#e2e8f0');
        radGrad.addColorStop(1.0, '#475569');

        ctx.fillStyle = radGrad;
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.9)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(rHeadX, rHeadY, 0.016 * dh, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rHeadX, rHeadY);
        ctx.lineTo(rTubX, rTubY); // 노뼈 거친면
        ctx.quadraticCurveTo(rTubX - px * 0.008 * dw, rTubY - py * 0.008 * dw, ex + fx * (foreLen * 0.35) - px * 0.010 * dw, ey + fy * (foreLen * 0.35) - py * 0.010 * dw);
        ctx.lineTo(rWristX - px * 0.016 * dw, rWristY - py * 0.016 * dw);
        ctx.lineTo(rWristX, rWristY);
        ctx.lineTo(ex + fx * (foreLen * 0.22), ey + fy * (foreLen * 0.22));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        return {
            oleX: oleX, oleY: oleY,
            rTubX: rTubX, rTubY: rTubY
        };
    }

    /** 5. 방추형 3D 근육 배 (이두근 / 삼두근): 볼륨감, 근섬유 결, 실시간 수축 발광 */
    function drawVolumetricMuscle(ax, ay, bx, by, bellyW, isContracted, isBiceps, flex, time, side, dw, dh) {
        var vx = bx - ax, vy = by - ay;
        var len = Math.hypot(vx, vy) || 1;
        var ux = vx / len, uy = vy / len;
        var px = -uy * side, py = ux * side;

        var tendonLen = Math.min(len * 0.16, 28);
        var t1x = ax + ux * tendonLen, t1y = ay + uy * tendonLen;
        var t2x = bx - ux * tendonLen, t2y = by - uy * tendonLen;

        var peakRatio = isContracted ? 0.44 : 0.50;
        var mx = ax + ux * (len * peakRatio) + px * bellyW;
        var my = ay + uy * (len * peakRatio) + py * bellyW;

        ctx.save();

        // ── 힘줄 (은백색 콜라겐 다발) ──
        var tendonGrad = ctx.createLinearGradient(ax, ay, t1x, t1y);
        tendonGrad.addColorStop(0, '#cbd5e1');
        tendonGrad.addColorStop(0.5, '#ffffff');
        tendonGrad.addColorStop(1, '#e2e8f0');

        ctx.strokeStyle = tendonGrad;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(t1x, t1y);
        ctx.moveTo(t2x, t2y); ctx.lineTo(bx, by);
        ctx.stroke();

        // ── 근육 배 3D 원통 그라데이션 및 볼륨 채우기 ──
        var muscleGrad = ctx.createLinearGradient(mx - px * bellyW, my - py * bellyW, mx + px * bellyW, my + py * bellyW);
        if (isBiceps) {
            if (isContracted) {
                muscleGrad.addColorStop(0.00, '#881337');
                muscleGrad.addColorStop(0.22, '#be123c');
                muscleGrad.addColorStop(0.55, '#f43f5e'); // 중앙 근육稜 하이라이트
                muscleGrad.addColorStop(0.85, '#fda4af');
                muscleGrad.addColorStop(1.00, '#e11d48');
            } else {
                muscleGrad.addColorStop(0.00, '#4c0519');
                muscleGrad.addColorStop(0.40, '#9f1239');
                muscleGrad.addColorStop(0.75, '#e11d48');
                muscleGrad.addColorStop(1.00, '#be123c');
            }
        } else {
            if (isContracted) {
                muscleGrad.addColorStop(0.00, '#0c4a6e');
                muscleGrad.addColorStop(0.25, '#0284c7');
                muscleGrad.addColorStop(0.55, '#38bdf8');
                muscleGrad.addColorStop(0.85, '#bae6fd');
                muscleGrad.addColorStop(1.00, '#0ea5e9');
            } else {
                muscleGrad.addColorStop(0.00, '#0f172a');
                muscleGrad.addColorStop(0.45, '#0369a1');
                muscleGrad.addColorStop(0.80, '#0284c7');
                muscleGrad.addColorStop(1.00, '#0284c7');
            }
        }

        if (isContracted) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = isBiceps ? 'rgba(244, 63, 94, 0.75)' : 'rgba(56, 189, 248, 0.75)';
        }

        ctx.fillStyle = muscleGrad;
        ctx.strokeStyle = isContracted ? (isBiceps ? '#fecdd3' : '#e0f2fe') : (isBiceps ? '#f43f5e' : '#38bdf8');
        ctx.lineWidth = isContracted ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.moveTo(t1x, t1y);
        ctx.quadraticCurveTo(mx, my, t2x, t2y);
        ctx.quadraticCurveTo((t1x + t2x) / 2 - px * bellyW * 0.32, (t1y + t2y) / 2 - py * bellyW * 0.32, t1x, t1y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // ── 근섬유 다발 결 (Muscle Fascicle Striations) ──
        var fiberCount = isContracted ? 8 : 5;
        ctx.lineWidth = 1.3;
        for (var f = 1; f <= fiberCount; f++) {
            var ft = f / (fiberCount + 1);
            var fx1 = t1x + (t2x - t1x) * ft;
            var fy1 = t1y + (t2y - t1y) * ft;
            var fDepth = Math.sin(Math.PI * ft) * bellyW * 0.78;

            var shimmer = isContracted ? (0.35 + Math.sin(time * 0.008 + f * 1.2) * 0.35) : 0.25;
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + shimmer.toFixed(2) + ')';

            ctx.beginPath();
            ctx.moveTo(fx1 - px * fDepth * 0.15, fy1 - py * fDepth * 0.15);
            ctx.quadraticCurveTo(fx1 + px * fDepth * 0.65, fy1 + py * fDepth * 0.65, fx1 + px * fDepth * 0.95, fy1 + py * fDepth * 0.95);
            ctx.stroke();
        }

        ctx.restore();

        return { mx: mx, my: my };
    }

    /** 6. 관절 각도계(Goniometer) & 팔꿈치 관절축 */
    function drawGoniometerAndElbow(g, jointAngle, dh, time) {
        ctx.save();
        var ex = g.ex, ey = g.ey;
        var isFlexed = jointAngle < 100;

        // 팔꿈치 관절 회전축 링
        ctx.fillStyle = '#0ea5e9';
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(ex, ey, 0.024 * dh, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 중심 회전축 십자선
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ex - 8, ey); ctx.lineTo(ex + 8, ey);
        ctx.moveTo(ex, ey - 8); ctx.lineTo(ex, ey + 8);
        ctx.stroke();

        // 각도계 호(Goniometer Arc)
        var upAngle = -Math.PI / 2;
        var foreAngle = Math.atan2(g.fy, g.fx);
        var arcR = 0.115 * dh;

        ctx.strokeStyle = isFlexed ? '#f43f5e' : '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(ex, ey, arcR, upAngle, foreAngle);
        ctx.stroke();

        // 각도계 눈금 틱
        var totalDeg = Math.abs(jointAngle);
        var step = 15;
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.65)';
        ctx.lineWidth = 1.5;
        for (var a = 0; a <= totalDeg; a += step) {
            var currRad = upAngle + (a * Math.PI / 180);
            var inX = ex + Math.cos(currRad) * (arcR - 5);
            var inY = ey + Math.sin(currRad) * (arcR - 5);
            var outX = ex + Math.cos(currRad) * (arcR + 5);
            var outY = ey + Math.sin(currRad) * (arcR + 5);
            ctx.beginPath();
            ctx.moveTo(inX, inY);
            ctx.lineTo(outX, outY);
            ctx.stroke();
        }

        // 실시간 각도 디지털 뱃지
        var midAngle = (upAngle + foreAngle) / 2;
        var badgeDist = arcR + 32;
        var bx = ex + Math.cos(midAngle) * badgeDist;
        var by = ey + Math.sin(midAngle) * badgeDist;

        var badgeW = 96, badgeH = 28;
        ctx.fillStyle = 'rgba(6, 11, 25, 0.90)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx - badgeW / 2, by - badgeH / 2, badgeW, badgeH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 13px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(jointAngle) + '° (ROM)', bx, by);
        ctx.textBaseline = 'alphabetic';

        ctx.restore();
    }

    /** 7. 인체공학적 손잡이 및 드래그 조작계 */
    function drawHandHandle(g, dh, time, isDraggingHand) {
        ctx.save();
        var wx = g.wx, wy = g.wy;
        var pulse = Math.sin(time * 0.007) * 4;

        // 드래그 링 타겟
        ctx.strokeStyle = isDraggingHand ? '#f43f5e' : '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 16;
        ctx.shadowColor = isDraggingHand ? '#f43f5e' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(wx, wy, 0.040 * dh + (isDraggingHand ? 5 : pulse), 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 손목 관절 볼
        ctx.fillStyle = isDraggingHand ? '#ef4444' : '#0284c7';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(wx, wy, 0.026 * dh, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // ✋ 잡고 당기기 라벨 뱃지 (노뼈·자뼈 태그와 절대로 겹치지 않게 손 진행 방향 앞쪽에 배치)
        var labelDist = 0.058 * dh;
        var lx = wx + g.fx * labelDist;
        var ly = wy + g.fy * labelDist + 16;

        ctx.fillStyle = 'rgba(6, 11, 25, 0.92)';
        ctx.strokeStyle = isDraggingHand ? '#f43f5e' : '#38bdf8';
        ctx.lineWidth = 1.4;
        var boxW = 126, boxH = 26;
        ctx.beginPath();
        ctx.roundRect(lx - boxW / 2, ly - boxH / 2, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(isDraggingHand ? '✊ 당기는 중...' : '✋ 잡고 당기기', lx, ly + 0.5);
        ctx.textBaseline = 'alphabetic';

        ctx.restore();
    }

    /** 8. 겹치지 않는 스마트 리더선 라벨 태그 */
    var smartTagBoxes = [];
    function drawSmartTag(anchorX, anchorY, tagX, tagY, title, subtext, color, hotspotKey) {
        ctx.save();
        ctx.font = 'bold 12px Pretendard, sans-serif';
        var tw = ctx.measureText(title).width;
        if (subtext) {
            ctx.font = '10px Pretendard, sans-serif';
            tw = Math.max(tw, ctx.measureText(subtext).width);
        }
        var boxW = tw + 22;
        var boxH = subtext ? 36 : 24;
        var bx = Math.min(Math.max(tagX - boxW / 2, 8), VW - 8 - boxW);
        var by = Math.min(Math.max(tagY - boxH / 2, topGuard()), VH - 8 - boxH);

        if (typeof hotspotKey !== 'undefined') {
            smartTagBoxes.push({ x: bx, y: by, w: boxW, h: boxH, key: hotspotKey });
        }

        // 앵커 닷
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(anchorX, anchorY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 연결선
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.moveTo(anchorX, anchorY);
        var targetEdgeX = anchorX > (bx + boxW / 2) ? (bx + boxW) : bx;
        ctx.lineTo(targetEdgeX, by + boxH / 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // 카드 배경
        ctx.fillStyle = 'rgba(6, 11, 25, 0.90)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 7);
        ctx.fill();
        ctx.stroke();

        // 텍스트
        ctx.textAlign = 'left';
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11.5px Pretendard, sans-serif';
        ctx.fillText(title, bx + 10, by + (subtext ? 15 : 16));

        if (subtext) {
            ctx.fillStyle = color;
            ctx.font = '10px Pretendard, sans-serif';
            ctx.fillText(subtext, bx + 10, by + 29);
        }

        ctx.restore();
    }

    /** 9. 왼쪽 위 상태 판 (클램핑) */
    function drawStatePlate(px, py, lines, accent) {
        ctx.save();
        px = Math.max(16, px);
        py = Math.max(py, topGuard());
        ctx.font = 'bold 12px Pretendard, sans-serif';
        var maxW = 0;
        lines.forEach(function (l) { maxW = Math.max(maxW, ctx.measureText(l.t).width); });
        var boxW = Math.min(maxW + 24, width - px - 16);
        var boxH = 14 + lines.length * 19;

        ctx.fillStyle = 'rgba(6, 11, 25, 0.90)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'left';
        lines.forEach(function (l, i) {
            ctx.fillStyle = l.c || '#f8fafc';
            ctx.fillText(l.t, px + 12, py + 21 + i * 19, boxW - 24);
        });
        ctx.restore();
    }

    function drawArmSchematic(dx, dy, dw, dh, time) {
        smartTagBoxes = [];
        var g = armGeometry(dx, dy, dw, dh);
        var flex = g.flex;
        var isFlexed = jointAngle < 100;

        // 1. 바이오메카닉스 랩 무대 배경
        drawBiomechanicalStage(dw, dh, g, time);

        // 2. 어깨 및 흉곽 해부학적 맥락
        drawAnatomicalTorsoAndShoulder(g, dw, dh);

        // 3. 근육 부착부 좌표 계산
        // 이두근: 어깨 관절상결절 ➔ 노뼈 거친면(Radial tuberosity)
        var bicepsTopX = g.sx + 0.030 * dw, bicepsTopY = g.sy + 0.02 * dh;
        var bicepsEndX = g.ex + g.fx * (g.foreLen * 0.22) + (-g.fy) * 0.016 * dw;
        var bicepsEndY = g.ey + g.fy * (g.foreLen * 0.22) + (g.fx) * 0.016 * dw;

        // 삼두근: 어깨 관절하결절 & 위팔뼈 뒷면 ➔ 자뼈 주두(Olecranon process)
        var tricepsTopX = g.sx - 0.034 * dw, tricepsTopY = g.sy + 0.04 * dh;
        var olecranonX = g.ex - g.fx * 0.026 * dh + (-g.fy) * 0.022 * dw;
        var olecranonY = g.ey - g.fy * 0.026 * dh + (g.fx) * 0.022 * dw;

        // 생리적 부피 보존 법칙에 따른 근육 두께 계산
        var bicepsW = (0.052 + flex * 0.082) * dh;
        var tricepsW = (0.118 - flex * 0.075) * dh;

        // 4. 삼두근 (후면 근육) 렌더링
        var triMid = drawVolumetricMuscle(
            tricepsTopX, tricepsTopY, olecranonX, olecranonY,
            tricepsW, !isFlexed, false, flex, time, -1, dw, dh
        );

        // 5. 위팔뼈 (상완골) 입체 렌더링
        drawAnatomicalHumerus(g, dw, dh);

        // 6. 아래팔 뼈 (노뼈 & 자뼈, 주두, 골간막) 입체 렌더링
        drawAnatomicalForearm(g, dw, dh);

        // 7. 이두근 (전면 근육) 렌더링
        var bicMid = drawVolumetricMuscle(
            bicepsTopX, bicepsTopY, bicepsEndX, bicepsEndY,
            bicepsW, isFlexed, true, flex, time, 1, dw, dh
        );

        // 8. 팔꿈치 관절 & 관절 각도계(Goniometer) HUD
        drawGoniometerAndElbow(g, jointAngle, dh, time);

        // 9. 손잡이 및 드래그 조작계
        drawHandHandle(g, dh, time, isDraggingHand);

        // 10. 스마트 리더선 라벨 (위치 분산으로 겹침 완벽 방지 & 클릭 연동)
        drawSmartTag(
            g.sx + 0.01 * dw, g.sy + g.upperLen * 0.35,
            g.sx + 0.16 * dw, g.sy + g.upperLen * 0.10,
            '위팔뼈 (상완골)', '이두·삼두근의 뼈대', '#bae6fd', 0
        );

        drawSmartTag(
            bicMid.mx, bicMid.my,
            bicMid.mx + 0.16 * dw, bicMid.my - 0.05 * dh,
            '이두근 (위팔두갈래근)', isFlexed ? '수축 🔥 (두꺼워짐)' : '이완 (늘어남)', '#f43f5e', 1
        );

        drawSmartTag(
            triMid.mx, triMid.my,
            triMid.mx - 0.16 * dw, triMid.my,
            '삼두근 (위팔세갈래근)', isFlexed ? '이완 (늘어남)' : '수축 🔥 (두꺼워짐)', '#38bdf8', 2
        );

        drawSmartTag(
            bicepsEndX, bicepsEndY,
            bicepsEndX + 0.14 * dw, bicepsEndY - 0.02 * dh,
            '힘줄 (건, Tendon)', '근육 ➔ 뼈 고정·힘 전달', '#e2e8f0', 4
        );

        drawSmartTag(
            g.ex, g.ey,
            g.ex - 0.15 * dw, g.ey + 0.08 * dh,
            '팔꿈치 관절 & 윤활액', '경첩관절 · 연골 마찰방지', '#0ea5e9', 3
        );

        var midForeX = (g.ex + g.wx) / 2;
        var midForeY = (g.ey + g.wy) / 2;
        var pxFore = -g.fy, pyFore = g.fx;
        var foreTagDist = 0.11 * dh;
        drawSmartTag(
            midForeX, midForeY,
            midForeX + pxFore * foreTagDist, midForeY + pyFore * foreTagDist,
            '노뼈(앞) · 자뼈(뒤)', '이두근 ➔ 노뼈 당김', '#93c5fd', 5
        );

        // 11. 좌측 상단 상태 판 (클램핑 적용)
        // 화면이 낮으면 판이 그림을 덮는다. 오른쪽 사이드바에 같은 내용이 이미 있으므로 건너뛴다.
        if (height >= 420) drawStatePlate(Math.max(16, dx + 16), dy + 16, [
            { t: (isFlexed ? '팔을 굽힘 [굴곡 Flexion] (' : '팔을 폄 [신전 Extension] (') + Math.round(jointAngle) + '°)' },
            { t: '• 이두근(주동근): ' + (isFlexed ? '수축 🔥 — 두꺼워지고 짧아짐' : '이완 — 얇아지고 길어짐'), c: isFlexed ? '#fca5a5' : '#94a3b8' },
            { t: '• 삼두근(길항근): ' + (isFlexed ? '이완 — 얇아지고 길어짐' : '수축 🔥 — 두꺼워지고 짧아짐'), c: isFlexed ? '#94a3b8' : '#7dd3fc' },
            { t: '두 근육은 언제나 반대로 움직입니다 [길항 작용]', c: '#facc15' }
        ], isFlexed ? '#f43f5e' : '#38bdf8');

        // 12. 클릭 핀 좌표 갱신 (사이드바 연동)
        jointPins = [
            { x: g.sx, y: g.sy + g.upperLen * 0.35, r: 28, key: 0 },
            { x: bicMid.mx, y: bicMid.my, r: 32, key: 1 },
            { x: triMid.mx, y: triMid.my, r: 32, key: 2 },
            { x: g.ex, y: g.ey, r: 28, key: 3 },
            { x: bicepsEndX, y: bicepsEndY, r: 24, key: 4 },
            { x: midForeX, y: midForeY, r: 28, key: 5 }
        ];
    }

    function drawHotspots(dx, dy, dw, dh, time) {
        var list = hotspots[currentSceneKey] || [];
        for (var i = 0; i < list.length; i++) {
            var s = list[i];
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
                isExtending = false;
                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
            });
        }

        if (extendBtn) {
            extendBtn.addEventListener('click', function () {
                isExtending = true;
                isFlexing = false;
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
                isExtending = false;
            });
        }

        if (canvas) {
            canvas.addEventListener('pointerdown', function (event) {
                var rect = canvas.getBoundingClientRect();
                var clickX = event.clientX - rect.left;
                var clickY = event.clientY - rect.top;

                // 1. 공통: 스마트 리더선 라벨 카드 클릭 확인
                for (var ti = 0; ti < smartTagBoxes.length; ti++) {
                    var tb = smartTagBoxes[ti];
                    if (clickX >= tb.x && clickX <= tb.x + tb.w && clickY >= tb.y && clickY <= tb.y + tb.h) {
                        var spotTag = hotspots[currentSceneKey] && hotspots[currentSceneKey][tb.key];
                        if (spotTag) {
                            if (organTitleEl) organTitleEl.textContent = spotTag.title;
                            if (organDescEl) organDescEl.innerHTML = spotTag.desc;
                            if (organDetailCard) {
                                organDetailCard.style.display = 'block';
                                organDetailCard.style.borderColor = '#38bdf8';
                                organDetailCard.style.boxShadow = '0 0 16px rgba(56, 189, 248, 0.35)';
                            }
                            if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                        }
                        return;
                    }
                }

                if (currentSceneKey === 'joint') {
                    var cv = toVirtual(clickX, clickY);
                    clickX = cv.x; clickY = cv.y;
                    var g = armGeometry(0, 0, VW, VH);
                    if (Math.hypot(clickX - g.wx, clickY - g.wy) <= 0.085 * VH) {
                        isDraggingHand = true;
                        isFlexing = false;
                        isExtending = false;
                        canvas.setPointerCapture(event.pointerId);
                        canvas.style.cursor = 'grabbing';
                        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
                        return;
                    }

                    // 도식 위의 해부학적 랜드마크 핀 클릭 확인
                    for (var pi = 0; pi < jointPins.length; pi++) {
                        var pin = jointPins[pi];
                        if (Math.hypot(clickX - pin.x, clickY - pin.y) <= pin.r) {
                            var info = hotspots.joint[pin.key];
                            if (info) {
                                if (organTitleEl) organTitleEl.textContent = info.title;
                                if (organDescEl) organDescEl.innerHTML = info.desc;
                                if (organDetailCard) {
                                    organDetailCard.style.display = 'block';
                                    organDetailCard.style.borderColor = '#38bdf8';
                                    organDetailCard.style.boxShadow = '0 0 16px rgba(56, 189, 248, 0.35)';
                                }
                                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                            }
                            return;
                        }
                    }
                    return;
                }

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
                var rect = canvas.getBoundingClientRect();
                var moveX = event.clientX - rect.left;
                var moveY = event.clientY - rect.top;

                if (isDraggingHand) {
                    var mv = toVirtual(moveX, moveY);
                    moveX = mv.x; moveY = mv.y;
                    var geo = armGeometry(0, 0, VW, VH);
                    var vx = moveX - geo.ex, vy = moveY - geo.ey;
                    var vlen = Math.hypot(vx, vy) || 1;
                    var dot = (vx * 0 + vy * -1) / vlen;
                    var deg = Math.acos(Math.max(-1, Math.min(1, dot))) * 180 / Math.PI;

                    jointAngle = Math.round(Math.max(30, Math.min(180, deg)));
                    isFlexing = false;
                    isExtending = false;
                    if (angleSlider) angleSlider.value = jointAngle;
                    canvas.style.cursor = 'grabbing';
                    return;
                }

                // 스마트 태그 카드 호버
                for (var ti = 0; ti < smartTagBoxes.length; ti++) {
                    var tb = smartTagBoxes[ti];
                    if (moveX >= tb.x && moveX <= tb.x + tb.w && moveY >= tb.y && moveY <= tb.y + tb.h) {
                        canvas.style.cursor = 'pointer';
                        return;
                    }
                }

                // 관절 드래그 핸들 및 핀 호버
                if (currentSceneKey === 'joint') {
                    var hv = toVirtual(moveX, moveY);
                    moveX = hv.x; moveY = hv.y;
                    var g = armGeometry(0, 0, VW, VH);
                    if (Math.hypot(moveX - g.wx, moveY - g.wy) <= 0.085 * VH) {
                        canvas.style.cursor = 'grab';
                        return;
                    }
                    for (var pi = 0; pi < jointPins.length; pi++) {
                        var pin = jointPins[pi];
                        if (Math.hypot(moveX - pin.x, moveY - pin.y) <= pin.r) {
                            canvas.style.cursor = 'pointer';
                            return;
                        }
                    }
                }
                canvas.style.cursor = 'default';
            });

            canvas.addEventListener('pointerup', function (event) {
                if (isDraggingHand) {
                    isDraggingHand = false;
                    try { canvas.releasePointerCapture(event.pointerId); } catch (e) {}
                    canvas.style.cursor = 'grab';
                }
            });

            canvas.addEventListener('pointercancel', function () {
                isDraggingHand = false;
                canvas.style.cursor = 'default';
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
