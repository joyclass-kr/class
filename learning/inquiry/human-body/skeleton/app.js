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
            jointAngle -= dt * 60;
            if (jointAngle <= 40) {
                jointAngle = 40;
                isFlexing = false;
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
            drawArmSchematic(0, 0, width, height, time);
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
            ctx.globalAlpha = 0.45;
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();

            // Draw Dynamic Kinematic Arm or Sarcomere Sliding Model
            drawSarcomereRig(dx, dy, dw, dh, time);

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
        var aBand = 1.60;                                   // 마이오신 길이 - 언제나 그대로
        var hZone = Math.max(0, sarcomereLength - 2.00);     // 액틴이 겹치지 않는 가운데
        var iBand = Math.max(0, (sarcomereLength - aBand) / 2); // 한쪽 I대
        var isContracting = sarcomereLength < 2.40;

        ctx.fillRect(cx - 190, cy + 100, 380, 74);
        ctx.strokeStyle = isContracting ? '#f43f5e' : '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 190, cy + 100, 380, 74);

        ctx.font = 'bold 13px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('근절 길이(X) ' + sarcomereLength.toFixed(2) + ' μm', cx, cy + 122);

        ctx.font = 'bold 12px Pretendard, sans-serif';
        ctx.fillStyle = '#facc15';
        ctx.fillText('A대 ' + aBand.toFixed(2) + ' (불변)   H대 ' + hZone.toFixed(2) + '   I대(한쪽) ' + iBand.toFixed(2), cx, cy + 142);

        ctx.fillStyle = isContracting ? '#fca5a5' : '#7dd3fc';
        ctx.fillText(isContracting ? '수축 - H대와 I대가 함께 줄고 A대는 그대로' : '이완 - H대와 I대가 함께 늘고 A대는 그대로', cx, cy + 162);
        ctx.restore();
    }

    // ------------------------------------------------------------------------
    // 팔 굽힘·폄 도식 (시험 그림 그대로: 옆에서 본 평면 그림)
    // ------------------------------------------------------------------------

    var jointPins = []; // 화면 좌표로 계산해 두는 클릭 자리

    /** 어깨·팔꿈치·손목 자리와 굽힌 정도를 한 곳에서 계산한다 */
    function armGeometry(dx, dy, dw, dh) {
        var sx = dx + 0.40 * dw;
        var sy = dy + 0.15 * dh;
        var upperLen = 0.35 * dh;
        var ex = sx, ey = sy + upperLen;
        var foreLen = 0.35 * dh;

        var th = jointAngle * Math.PI / 180;
        var fx = Math.sin(th), fy = -Math.cos(th); // 팔꿈치에서 손목으로 가는 방향
        var wx = ex + fx * foreLen, wy = ey + fy * foreLen;

        return {
            sx: sx, sy: sy, ex: ex, ey: ey, wx: wx, wy: wy,
            fx: fx, fy: fy, upperLen: upperLen, foreLen: foreLen,
            flex: (180 - jointAngle) / 150   // 0 = 곧게 폄, 1 = 다 굽힘
        };
    }

    /** 방추 모양 근육 하나. 양 끝은 힘줄, 가운데 배가 불룩하다 */
    function drawMuscleBelly(ax, ay, bx, by, bellyW, color, glow, side) {
        var vx = bx - ax, vy = by - ay;
        var len = Math.hypot(vx, vy) || 1;
        var ux = vx / len, uy = vy / len;
        var px = -uy * side, py = ux * side;   // 배가 부풀어 오르는 쪽

        var tendon = Math.min(len * 0.17, 26);
        var a2x = ax + ux * tendon, a2y = ay + uy * tendon;
        var b2x = bx - ux * tendon, b2y = by - uy * tendon;
        var mx = (a2x + b2x) / 2, my = (a2y + b2y) / 2;

        ctx.save();

        // 힘줄 (양 끝의 흰 끈)
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(a2x, a2y);
        ctx.moveTo(b2x, b2y); ctx.lineTo(bx, by);
        ctx.stroke();

        // 근육 배
        ctx.fillStyle = color;
        ctx.strokeStyle = glow;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 16;
        ctx.shadowColor = glow;
        ctx.beginPath();
        ctx.moveTo(a2x, a2y);
        ctx.quadraticCurveTo(mx + px * bellyW, my + py * bellyW, b2x, b2y);
        ctx.quadraticCurveTo(mx - px * bellyW * 0.38, my - py * bellyW * 0.38, a2x, a2y);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 결 무늬
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
        ctx.lineWidth = 1.2;
        for (var i = 1; i <= 3; i++) {
            var t = i / 4;
            var qx = a2x + (b2x - a2x) * t, qy = a2y + (b2y - a2y) * t;
            var d = bellyW * 0.55 * Math.sin(Math.PI * t);
            ctx.beginPath();
            ctx.moveTo(qx + px * d * 0.25, qy + py * d * 0.25);
            ctx.lineTo(qx + px * d, qy + py * d);
            ctx.stroke();
        }
        ctx.restore();

        return { mx: mx + px * bellyW * 0.55, my: my + py * bellyW * 0.55 };
    }

    /** 뼈 하나: 굵은 몸통에 양 끝이 볼록하다 */
    function drawBone(ax, ay, bx, by, thick) {
        ctx.save();
        ctx.strokeStyle = '#e8f4ff';
        ctx.lineWidth = thick;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(148, 197, 255, 0.75)';
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
        ctx.stroke();

        ctx.fillStyle = '#f8fbff';
        ctx.beginPath(); ctx.arc(ax, ay, thick * 0.72, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(bx, by, thick * 0.72, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    /** 부위 이름표 + 가리키는 선 */
    function drawTag(anchorX, anchorY, tagX, tagY, text, color) {
        ctx.save();
        ctx.font = 'bold 12px Pretendard, sans-serif';
        var tw = ctx.measureText(text).width;
        var boxW = tw + 18, boxH = 24;
        var bx = Math.min(Math.max(tagX - boxW / 2, 4), width - 4 - boxW);
        var by = Math.min(Math.max(tagY - boxH / 2, 90), height - 4 - boxH);

        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(anchorX, anchorY);
        ctx.lineTo(bx + (anchorX > bx ? boxW : 0), by + boxH / 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.fillStyle = 'rgba(6, 10, 24, 0.88)';
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 7);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, bx + boxW / 2, by + boxH / 2 + 0.5);
        ctx.textBaseline = 'alphabetic';
        ctx.restore();
    }

    /** 왼쪽 위 상태 판 */
    function drawStatePlate(px, py, lines, accent) {
        ctx.save();
        py = Math.max(py, 86); // 위쪽 장면 단추 줄 아래
        ctx.font = 'bold 12px Pretendard, sans-serif';
        var maxW = 0;
        lines.forEach(function (l) { maxW = Math.max(maxW, ctx.measureText(l.t).width); });
        var boxW = maxW + 24, boxH = 14 + lines.length * 19;

        ctx.fillStyle = 'rgba(6, 10, 24, 0.85)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'left';
        lines.forEach(function (l, i) {
            ctx.fillStyle = l.c || '#f8fafc';
            ctx.fillText(l.t, px + 12, py + 21 + i * 19);
        });
        ctx.restore();
    }

    function drawArmSchematic(dx, dy, dw, dh, time) {
        var g = armGeometry(dx, dy, dw, dh);
        var flex = g.flex;
        var isFlexed = jointAngle < 100;

        // 근육이 붙는 자리
        var bicepsTopX = g.sx + 0.035 * dw, bicepsTopY = g.sy + 0.04 * dh;
        var bicepsEndX = g.ex + g.fx * (g.foreLen * 0.26) + (-g.fy) * 0.022 * dw;
        var bicepsEndY = g.ey + g.fy * (g.foreLen * 0.26) + (g.fx) * 0.022 * dw;

        var tricepsTopX = g.sx - 0.038 * dw, tricepsTopY = g.sy + 0.05 * dh;
        var olecranonX = g.ex - g.fx * (g.foreLen * 0.16) - 0.026 * dw;
        var olecranonY = g.ey - g.fy * (g.foreLen * 0.16);

        // 두께: 굽힐수록 이두근이 두꺼워지고 삼두근이 얇아진다
        var bicepsW = (0.055 + flex * 0.075) * dh;
        var tricepsW = (0.115 - flex * 0.070) * dh;

        ctx.save();

        // 몸통 쪽 어깨
        ctx.fillStyle = 'rgba(148, 197, 255, 0.09)';
        ctx.strokeStyle = 'rgba(148, 197, 255, 0.40)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(g.sx - 0.012 * dw, g.sy - 0.02 * dh, 0.052 * dw, 0.075 * dh, -0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // 삼두근(뒤) ➔ 뼈 ➔ 이두근(앞) 차례로 겹쳐 그린다
        var triMid = drawMuscleBelly(
            tricepsTopX, tricepsTopY, olecranonX, olecranonY, tricepsW,
            isFlexed ? 'rgba(56, 189, 248, 0.40)' : 'rgba(56, 189, 248, 0.92)',
            '#38bdf8', -1
        );

        drawBone(g.sx, g.sy, g.ex, g.ey, 0.042 * dh);   // 위팔뼈
        drawBone(g.ex + (-g.fy) * 0.018 * dw, g.ey + g.fx * 0.018 * dw,
                 g.wx + (-g.fy) * 0.018 * dw, g.wy + g.fx * 0.018 * dw, 0.024 * dh); // 자뼈
        drawBone(g.ex, g.ey, g.wx, g.wy, 0.030 * dh);   // 노뼈

        var bicMid = drawMuscleBelly(
            bicepsTopX, bicepsTopY, bicepsEndX, bicepsEndY, bicepsW,
            isFlexed ? 'rgba(244, 63, 94, 0.92)' : 'rgba(244, 63, 94, 0.40)',
            '#f43f5e', 1
        );

        ctx.save();

        // 팔꿈치 관절
        ctx.fillStyle = '#0ea5e9';
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(g.ex, g.ey, 0.030 * dh, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 각도 호와 숫자
        var upAngle = -Math.PI / 2;
        var foreAngle = Math.atan2(g.fy, g.fx);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.arc(g.ex, g.ey, 0.105 * dh, upAngle, foreAngle);
        ctx.stroke();
        ctx.setLineDash([]);

        var midAngle = (upAngle + foreAngle) / 2;
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 13px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(jointAngle + '°', g.ex + Math.cos(midAngle) * 0.15 * dh, g.ey + Math.sin(midAngle) * 0.15 * dh + 4);

        // 손잡이
        ctx.fillStyle = '#0284c7';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.arc(g.wx, g.wy, 0.038 * dh, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Pretendard, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('✋ 잡고 당기기', g.wx + 0.055 * dh, g.wy + 4);
        ctx.textAlign = 'center';

        ctx.restore();

        // 이름표
        drawTag(g.sx, g.sy + g.upperLen * 0.30, g.sx + 0.105 * dw, g.sy + g.upperLen * 0.06, '위팔뼈', '#bae6fd');
        drawTag(triMid.mx, triMid.my, triMid.mx - 0.135 * dw, triMid.my, '삼두근 (팔을 펴는 근육)', '#38bdf8');
        drawTag(bicMid.mx, bicMid.my, bicMid.mx + 0.145 * dw, bicMid.my - 0.03 * dh, '이두근 (팔을 굽히는 근육)', '#f43f5e');
        drawTag(bicepsEndX, bicepsEndY, bicepsEndX + 0.075 * dw, bicepsEndY + 0.07 * dh, '힘줄', '#e2e8f0');
        drawTag(g.ex, g.ey, g.ex - 0.115 * dw, g.ey + 0.10 * dh, '팔꿈치 관절', '#0ea5e9');
        drawTag((g.ex + g.wx) / 2, (g.ey + g.wy) / 2,
                (g.ex + g.wx) / 2 + 0.105 * dw, (g.ey + g.wy) / 2 + 0.06 * dh, '노뼈 · 자뼈', '#bae6fd');

        // 상태 판
        drawStatePlate(dx + 12, dy + 12, [
            { t: (isFlexed ? '팔을 굽힘 (' : '팔을 폄 (') + jointAngle + '°)' },
            { t: '이두근: ' + (isFlexed ? '수축 — 두꺼워지고 짧아짐' : '이완 — 얇아지고 길어짐'), c: isFlexed ? '#fca5a5' : '#94a3b8' },
            { t: '삼두근: ' + (isFlexed ? '이완 — 얇아지고 길어짐' : '수축 — 두꺼워지고 짧아짐'), c: isFlexed ? '#94a3b8' : '#7dd3fc' },
            { t: '두 근육은 언제나 반대로 움직입니다 (길항 작용)', c: '#cbd5e1' }
        ], isFlexed ? '#f43f5e' : '#38bdf8');

        // 클릭 자리 갱신
        jointPins = [
            { x: g.sx, y: g.sy + g.upperLen * 0.32, r: 26, key: 0 },
            { x: bicMid.mx, y: bicMid.my, r: 30, key: 1 },
            { x: triMid.mx, y: triMid.my, r: 30, key: 2 },
            { x: g.ex, y: g.ey, r: 26, key: 3 },
            { x: bicepsEndX, y: bicepsEndY, r: 22, key: 4 },
            { x: (g.ex + g.wx) / 2, y: (g.ey + g.wy) / 2, r: 28, key: 5 }
        ];
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

                if (currentSceneKey === 'joint') {
                    var g = armGeometry(0, 0, width, height);
                    if (Math.hypot(clickX - g.wx, clickY - g.wy) <= 0.075 * height) {
                        isDraggingHand = true;
                        canvas.setPointerCapture(event.pointerId);
                        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playPulse();
                        return;
                    }

                    // 도식 위의 부위를 누르면 오른쪽 설명이 바뀐다
                    for (var pi = 0; pi < jointPins.length; pi++) {
                        var pin = jointPins[pi];
                        if (Math.hypot(clickX - pin.x, clickY - pin.y) <= pin.r) {
                            var info = hotspots.joint[pin.key];
                            if (info) {
                                if (organTitleEl) organTitleEl.textContent = info.title;
                                if (organDescEl) organDescEl.innerHTML = info.desc;
                                if (organDetailCard) organDetailCard.style.display = 'block';
                                if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
                            }
                            return;
                        }
                    }
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

                var geo = armGeometry(0, 0, width, height);

                // 위팔뼈(팔꿈치에서 어깨로)와 손끝 방향 사이의 각을 그대로 관절 각도로 쓴다
                var vx = clickX - geo.ex, vy = clickY - geo.ey;
                var vlen = Math.hypot(vx, vy) || 1;
                var dot = (vx * 0 + vy * -1) / vlen;      // 어깨 방향은 (0, -1)
                var deg = Math.acos(Math.max(-1, Math.min(1, dot))) * 180 / Math.PI;

                jointAngle = Math.round(Math.max(30, Math.min(180, deg)));
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
