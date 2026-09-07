/**
 * 관절과 길항근 — 단색 평면 2D 교과서 도식
 *
 * 팔꿈치를 굽히고 펼 때 이두근과 삼두근이 언제나 반대로 움직인다.
 *   굽힘 - 이두근 수축(두꺼워지고 짧아짐) · 삼두근 이완(얇아지고 길어짐)
 *   폄   - 이두근 이완 · 삼두근 수축
 * 힘줄은 근육과 뼈를, 인대는 뼈와 뼈를 잇는다. 시험에 자주 나오는 대목이다.
 *
 * 각도는 옆 상자의 슬라이더(angleSlider)가 쥐고 있다. 이 그림은 그 값을 읽어
 * 다시 그리기만 하고, 손잡이를 끌면 슬라이더에 되돌려 준다.
 */

(function () {
    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var KEY = 'joint';

    /* 가상 화면 1000 x 700 */
    var SHOULDER = { x: 470, y: 120 };
    var UPPER_LEN = 250;                 // 위팔뼈 길이
    var FORE_LEN = 250;                  // 아래팔 길이
    var ELBOW = { x: SHOULDER.x, y: SHOULDER.y + UPPER_LEN };

    var BONE_FILL = '#e2e8f0';       // 뼈 밑색
    var BONE_SHADE = '#b8c2cf';      // 뼈 그늘 — 그라데이션이 아니라 납작한 두 번째 색
    var BONE_LINE = '#94a3b8';
    var TENDON = '#f1f5f9';

    var BICEPS_ON = '#e11d48', BICEPS_OFF = '#7f1d3a';
    var TRICEPS_ON = '#0284c7', TRICEPS_OFF = '#0b4a6f';

    var wrap, layer, svg, labelBox, leaderGroup;
    var foreGroup, biceps, triceps, bicepsTendonTop, bicepsTendonEnd, anglePlate;
    var tricepsTendonTop, tricepsTendonEnd, angleArc, angleText, handle;
    var stateText;
    var dragging = false;

    /* 이름표: ax·ay 는 이름표 자리, sx·sy 는 이음선이 나오는 자리 */
    var LABELS = [
        { id: 'humerus', text: '위팔뼈', ax: 292, ay: 128, sx: 452, sy: 152 },
        { id: 'triceps', text: '삼두근 (길항근)', ax: 232, ay: 300, sx: 440, sy: 260 },
        { id: 'joint', text: '팔꿈치 관절 (연골 · 윤활액)', ax: 238, ay: 452, sx: 470, sy: 370 },
        { id: 'forearm', text: '노뼈 (앞) · 자뼈 (뒤)', ax: 248, ay: 604, sx: 450, sy: 520 },
        { id: 'biceps', text: '이두근 (주동근)', ax: 768, ay: 210, sx: 505, sy: 260 },
        { id: 'tendon', text: '힘줄 — 근육과 뼈를 잇는다', ax: 784, ay: 350, sx: 520, sy: 420 }
    ];

    function init() {
        wrap = document.querySelector('.skeleton-viewport');
        if (!wrap) return;
        buildLayer();
        bindSceneButtons();
        window.addEventListener('resize', placeLabels);
        requestAnimationFrame(loop);
    }

    function bindSceneButtons() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar) return;
        bar.addEventListener('click', function (event) {
            var btn = event.target.closest ? event.target.closest('.scene-btn') : null;
            if (!btn || !bar.contains(btn)) return;
            setVisible(btn.dataset.scene === KEY);
        });
        var act = bar.querySelector('.scene-btn.active');
        setVisible(!!(act && act.dataset.scene === KEY));
    }

    function setVisible(on) {
        if (!layer) return;
        layer.hidden = !on;
        var canvas = document.getElementById('skeletonCanvas');
        if (canvas) canvas.style.visibility = on ? 'hidden' : 'visible';
        if (on) { render(); placeLabels(); }
    }

    /* ── 그림 짓기 ─────────────────────────────────────────── */

    function el(name, attrs) {
        var e = document.createElementNS(SVG_NS, name);
        for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
        return e;
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'joint-layer';
        layer.hidden = true;

        var stage = document.createElement('div');
        stage.className = 'joint-stage';
        layer.appendChild(stage);

        svg = el('svg', { viewBox: '0 0 1000 700', preserveAspectRatio: 'xMidYMid meet' });
        stage.appendChild(svg);

        labelBox = document.createElement('div');
        labelBox.className = 'joint-labels';
        stage.appendChild(labelBox);

        wrap.appendChild(layer);

        leaderGroup = el('g');
        svg.appendChild(leaderGroup);

        drawStatic();
        drawMoving();
        buildLabels();
        bindDrag();
    }

    /**
     * 뼈는 겹치는 조각 여럿으로 짓는다. 조각마다 테두리를 두르면 속에 없는 금이
     * 생기므로, 테두리 없이 같은 색으로 겹쳐 한 덩어리로 보이게 하고
     * 뒤쪽에만 그늘색을 한 겹 깐다. 시험에 이름이 나오는 돌기는 살린다.
     */
    function bone(parent, tag, attrs) {
        attrs.fill = attrs.fill || BONE_FILL;
        attrs.stroke = 'none';
        parent.appendChild(el(tag, attrs));
    }

    /** 어깨뼈와 위팔뼈처럼 움직이지 않는 것 */
    function drawStatic() {
        var g = el('g', { id: 'upperArm' });
        svg.appendChild(g);

        // ── 어깨뼈 (견갑골) 와 어깨봉우리 ──────────────────────
        bone(g, 'path', {
            d: 'M446 92 C420 74 386 68 358 78 L344 132 C376 142 412 140 440 128 Z',
            fill: '#cbd5e1'
        });
        bone(g, 'path', {   // 어깨봉우리 — 위팔뼈 머리 위를 덮는다
            d: 'M440 84 C458 78 476 82 486 94 L474 108 C462 98 450 96 438 100 Z',
            fill: '#cbd5e1'
        });

        // ── 위팔뼈 (상완골) ────────────────────────────────────
        // 몸통
        bone(g, 'path', { d: 'M456 132 L486 132 L482 300 L460 300 Z' });
        // 위 끝: 둥근 관절머리 + 앞쪽 큰결절
        bone(g, 'ellipse', { cx: 466, cy: 118, rx: 27, ry: 24 });
        bone(g, 'ellipse', { cx: 492, cy: 130, rx: 14, ry: 15 });
        // 아래 끝: 양옆으로 벌어진 관절융기
        bone(g, 'path', { d: 'M460 292 L482 292 L496 344 L444 344 Z' });
        bone(g, 'ellipse', { cx: 470, cy: 356, rx: 26, ry: 20 });   // 도르래
        bone(g, 'ellipse', { cx: 494, cy: 352, rx: 14, ry: 13 });   // 작은머리 (앞)
        bone(g, 'ellipse', { cx: 446, cy: 344, rx: 13, ry: 12 });   // 안쪽위관절융기 (뒤)

        // 그늘: 뒤쪽(왼쪽) 모서리에만 납작한 두 번째 색
        bone(g, 'path', { d: 'M456 132 L466 132 L462 300 L460 300 Z', fill: BONE_SHADE });
        bone(g, 'path', { d: 'M460 292 L468 292 L452 344 L444 344 Z', fill: BONE_SHADE });
        bone(g, 'path', {
            d: 'M446 100 C436 108 440 128 452 138 C440 132 436 112 446 100 Z',
            fill: BONE_SHADE
        });

        // 결절사이고랑 — 이두근 긴갈래 힘줄이 지나는 골
        g.appendChild(el('path', {
            d: 'M480 116 L478 148', fill: 'none', stroke: BONE_LINE, 'stroke-width': 2
        }));
        // 도르래 한가운데 고랑
        g.appendChild(el('path', {
            d: 'M470 340 L470 374', fill: 'none', stroke: BONE_LINE, 'stroke-width': 2, opacity: 0.8
        }));
    }

    /** 각도에 따라 다시 그려지는 것 */
    function drawMoving() {
        // 아래팔은 통째로 팔꿈치를 축으로 돈다
        foreGroup = el('g', { id: 'forearm' });
        svg.appendChild(foreGroup);

        // ── 자뼈 (뒤쪽) ───────────────────────────────────────
        // 팔꿈치머리 — 도르래 뒤를 갈고리처럼 감싼다. 삼두근이 여기 붙는다.
        bone(foreGroup, 'path', {
            d: 'M452 318 C430 318 418 332 420 350'
                + ' C422 366 434 376 450 380'
                + ' L462 358 C450 352 444 340 448 330 Z'
        });
        // 갈고리돌기 — 앞쪽으로 뾰족하게
        bone(foreGroup, 'path', { d: 'M454 372 L478 384 L466 396 L450 388 Z' });
        // 몸통: 위는 굵고 아래로 갈수록 가늘어진다
        bone(foreGroup, 'path', { d: 'M438 366 L466 382 L458 556 L444 556 Z' });
        // 아래 끝 머리와 붓돌기
        bone(foreGroup, 'ellipse', { cx: 450, cy: 566, rx: 11, ry: 12 });
        bone(foreGroup, 'path', { d: 'M442 570 L452 570 L446 590 Z' });

        // ── 노뼈 (앞쪽) ───────────────────────────────────────
        bone(foreGroup, 'ellipse', { cx: 494, cy: 368, rx: 16, ry: 11 });   // 원판 모양 노뼈머리
        bone(foreGroup, 'path', { d: 'M486 374 L502 374 L500 392 L484 392 Z' });  // 목
        bone(foreGroup, 'ellipse', { cx: 484, cy: 400, rx: 11, ry: 13 });   // 노뼈거친면 (이두근이 붙는다)
        // 몸통: 위는 가늘고 아래로 갈수록 굵어진다
        bone(foreGroup, 'path', { d: 'M482 392 L500 392 L512 552 L490 552 Z' });
        // 아래 끝 — 손목에서 가장 넓다
        bone(foreGroup, 'path', { d: 'M488 544 L514 544 L518 584 L486 584 Z' });
        bone(foreGroup, 'path', { d: 'M510 580 L520 580 L516 602 Z' });     // 붓돌기

        // 두 뼈의 뒤쪽 그늘
        bone(foreGroup, 'path', { d: 'M438 366 L448 371 L446 556 L444 556 Z', fill: BONE_SHADE });
        bone(foreGroup, 'path', { d: 'M482 392 L490 392 L496 552 L490 552 Z', fill: BONE_SHADE });

        // 뼈사이막 — 두 뼈를 잇는 질긴 막
        for (var mi = 0; mi < 7; mi++) {
            var my = 412 + mi * 22;
            foreGroup.appendChild(el('line', {
                x1: 452 + mi * 0.6, y1: my, x2: 490 + mi * 1.6, y2: my + 8,
                stroke: BONE_LINE, 'stroke-width': 1.4, opacity: 0.35
            }));
        }

        // ── 손 ───────────────────────────────────────────────
        // 손목뼈 두 줄
        [[456, 600], [474, 598], [492, 600], [508, 604]].forEach(function (c) {
            bone(foreGroup, 'ellipse', { cx: c[0], cy: c[1], rx: 9, ry: 8, fill: '#cbd5e1' });
        });
        [[462, 616], [480, 615], [498, 617]].forEach(function (c) {
            bone(foreGroup, 'ellipse', { cx: c[0], cy: c[1], rx: 9, ry: 8, fill: '#cbd5e1' });
        });
        // 손허리뼈 네 개와 엄지
        [[458, 626, 452, 664], [474, 626, 472, 668], [490, 627, 492, 666], [504, 628, 510, 660]]
            .forEach(function (m) {
                foreGroup.appendChild(el('line', {
                    x1: m[0], y1: m[1], x2: m[2], y2: m[3],
                    stroke: '#cbd5e1', 'stroke-width': 7, 'stroke-linecap': 'round'
                }));
            });
        foreGroup.appendChild(el('line', {
            x1: 512, y1: 612, x2: 534, y2: 634,
            stroke: '#cbd5e1', 'stroke-width': 7, 'stroke-linecap': 'round'
        }));
        // 손가락뼈 (마디 하나로 줄임)
        [[452, 664, 448, 690], [472, 668, 471, 694], [492, 666, 495, 692], [510, 660, 516, 682], [534, 634, 550, 646]]
            .forEach(function (m) {
                foreGroup.appendChild(el('line', {
                    x1: m[0], y1: m[1], x2: m[2], y2: m[3],
                    stroke: '#cbd5e1', 'stroke-width': 5.5, 'stroke-linecap': 'round'
                }));
            });

        // 근육은 뼈 옆에 나란히 놓아 둘 다 언제나 보이게 한다
        tricepsTendonTop = el('path', { fill: 'none', stroke: TENDON, 'stroke-width': 6, 'stroke-linecap': 'round' });
        tricepsTendonEnd = el('path', { fill: 'none', stroke: TENDON, 'stroke-width': 6, 'stroke-linecap': 'round' });
        triceps = el('path', { stroke: '#7dd3fc', 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
        svg.appendChild(tricepsTendonTop);
        svg.appendChild(tricepsTendonEnd);
        svg.appendChild(triceps);
        triceps._grain = el('path', { fill: 'none', 'stroke-width': 2 });
        svg.appendChild(triceps._grain);

        bicepsTendonTop = el('path', { fill: 'none', stroke: TENDON, 'stroke-width': 6, 'stroke-linecap': 'round' });
        bicepsTendonEnd = el('path', { fill: 'none', stroke: TENDON, 'stroke-width': 6, 'stroke-linecap': 'round' });
        biceps = el('path', { stroke: '#fda4af', 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
        svg.appendChild(bicepsTendonTop);
        svg.appendChild(bicepsTendonEnd);
        svg.appendChild(biceps);
        biceps._grain = el('path', { fill: 'none', 'stroke-width': 2 });
        svg.appendChild(biceps._grain);

        // 팔꿈치 관절
        svg.appendChild(el('circle', { cx: ELBOW.x, cy: ELBOW.y, r: 17, fill: '#fbbf24', opacity: 0.22 }));
        svg.appendChild(el('circle', { cx: ELBOW.x, cy: ELBOW.y, r: 8, fill: '#fbbf24' }));

        // 각도 호와 숫자
        angleArc = el('path', { fill: 'none', stroke: '#fbbf24', 'stroke-width': 3, opacity: 0.75 });
        svg.appendChild(angleArc);
        anglePlate = el('rect', { rx: 7, fill: 'rgba(6, 10, 24, 0.9)', stroke: '#fbbf24', 'stroke-width': 1.5 });
        svg.appendChild(anglePlate);
        angleText = el('text', {
            'font-size': 20, 'font-weight': 800, fill: '#fde68a',
            'text-anchor': 'middle', 'dominant-baseline': 'middle'
        });
        svg.appendChild(angleText);

        // 잡고 당기는 손잡이
        handle = el('circle', { r: 21, fill: '#38bdf8', stroke: '#e0f2fe', 'stroke-width': 3, cursor: 'grab' });
        svg.appendChild(handle);

        stateText = el('text', {
            x: 500, y: 672, 'font-size': 17, 'font-weight': 800,
            fill: '#f8fafc', 'text-anchor': 'middle'
        });
        svg.appendChild(stateText);
    }

    /* ── 각도 읽고 되돌려 주기 ──────────────────────────────── */

    function jointAngle() {
        var s = document.getElementById('angleSlider');
        var v = s ? parseFloat(s.value) : 75;
        if (isNaN(v)) v = 75;
        return Math.max(30, Math.min(180, v));
    }

    function setJointAngle(v) {
        var s = document.getElementById('angleSlider');
        if (!s) return;
        s.value = Math.round(Math.max(30, Math.min(180, v)));
        s.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /** 팔꿈치에서 손목으로 가는 방향 (180° 면 위팔과 일직선) */
    function foreDir(deg) {
        var phi = (180 - deg) * Math.PI / 180;
        return { x: Math.sin(phi), y: Math.cos(phi) };
    }

    /* ── 다시 그리기 ───────────────────────────────────────── */

    function render() {
        if (!svg || layer.hidden) return;

        var deg = jointAngle();
        var flex = (180 - deg) / 150;            // 0 = 완전히 폄, 1 = 최대로 굽힘
        var d = foreDir(deg);
        var n = { x: d.y, y: -d.x };             // 아래팔의 앞쪽(노뼈 쪽) 법선

        // SVG 의 rotate 는 시계 방향이 양수다. 앞으로 굽히려면 반대로 돌려야 한다.
        foreGroup.setAttribute('transform',
            'rotate(' + (deg - 180).toFixed(2) + ' ' + ELBOW.x + ' ' + ELBOW.y + ')');

        // 부피는 그대로이므로 하나가 두꺼워지면 하나는 얇아진다
        var bicepsW = 18 + flex * 34;
        var tricepsW = 52 - flex * 34;

        // 이두근: 어깨 앞 ➔ 노뼈 거친면 (위팔뼈 바깥쪽에 나란히 둔다)
        var bTop = { x: SHOULDER.x + 34, y: SHOULDER.y + 40 };
        var bEnd = {
            x: ELBOW.x + d.x * 74 + n.x * 20,
            y: ELBOW.y + d.y * 74 + n.y * 20
        };
        drawMuscle(biceps, bicepsTendonTop, bicepsTendonEnd, bTop, bEnd, bicepsW, -1,
            flex > 0.5 ? BICEPS_ON : BICEPS_OFF,
            flex > 0.5 ? '#fecdd3' : '#7f1d3a');

        // 삼두근: 어깨 뒤 ➔ 자뼈의 팔꿈치머리
        var tTop = { x: SHOULDER.x - 38, y: SHOULDER.y + 46 };
        var tEnd = {
            x: ELBOW.x - d.x * 40 - n.x * 34,
            y: ELBOW.y - d.y * 40 - n.y * 34
        };
        drawMuscle(triceps, tricepsTendonTop, tricepsTendonEnd, tTop, tEnd, tricepsW, +1,
            flex > 0.5 ? TRICEPS_OFF : TRICEPS_ON,
            flex > 0.5 ? '#0b4a6f' : '#bae6fd');

        drawAngle(deg, d);

        var wrist = { x: ELBOW.x + d.x * FORE_LEN, y: ELBOW.y + d.y * FORE_LEN };
        handle.setAttribute('cx', wrist.x.toFixed(1));
        handle.setAttribute('cy', wrist.y.toFixed(1));

        stateText.textContent = flex > 0.5
            ? '팔을 굽힘 — 이두근 수축 (두꺼워짐) · 삼두근 이완 (얇아짐)'
            : '팔을 폄 — 이두근 이완 (얇아짐) · 삼두근 수축 (두꺼워짐)';

        // 이음선이 나오는 자리는 그림을 따라 움직인다
        moveLabel('biceps', (bTop.x + bEnd.x) / 2 - 26, (bTop.y + bEnd.y) / 2);
        moveLabel('triceps', (tTop.x + tEnd.x) / 2 + 26, (tTop.y + tEnd.y) / 2);
        moveLabel('forearm', ELBOW.x + d.x * 150 - n.x * 26, ELBOW.y + d.y * 150 - n.y * 26);
        moveLabel('tendon', bEnd.x, bEnd.y);
    }

    /** 방추형 근육 배 하나. side 는 뼈의 어느 쪽으로 부풀 것인가. */
    function drawMuscle(bodyEl, topEl, endEl, a, b, w, side, color, edge) {
        var vx = b.x - a.x, vy = b.y - a.y;
        var len = Math.hypot(vx, vy) || 1;
        var ux = vx / len, uy = vy / len;
        var px = -uy * side, py = ux * side;

        var tLen = Math.min(len * 0.22, 60);   // 배는 관절을 넘지 않고 힘줄만 넘어간다
        var t1 = { x: a.x + ux * tLen, y: a.y + uy * tLen };
        var t2 = { x: b.x - ux * tLen, y: b.y - uy * tLen };
        var mid = { x: (t1.x + t2.x) / 2, y: (t1.y + t2.y) / 2 };

        topEl.setAttribute('d', 'M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + ' L' + t1.x.toFixed(1) + ' ' + t1.y.toFixed(1));
        endEl.setAttribute('d', 'M' + t2.x.toFixed(1) + ' ' + t2.y.toFixed(1) + ' L' + b.x.toFixed(1) + ' ' + b.y.toFixed(1));

        var out = { x: mid.x + px * w, y: mid.y + py * w };
        var inn = { x: mid.x - px * w * 0.30, y: mid.y - py * w * 0.30 };

        bodyEl.setAttribute('fill', color);
        bodyEl.setAttribute('stroke', edge);
        // 근육 한가운데를 지나는 밝은 결 한 줄. 그라데이션이 아니라 선 하나다.
        if (bodyEl._grain) {
            bodyEl._grain.setAttribute('d',
                'M' + t1.x.toFixed(1) + ' ' + t1.y.toFixed(1) +
                ' Q' + (mid.x + px * w * 0.45).toFixed(1) + ' ' + (mid.y + py * w * 0.45).toFixed(1) +
                ' ' + t2.x.toFixed(1) + ' ' + t2.y.toFixed(1));
            bodyEl._grain.setAttribute('stroke', edge);
            bodyEl._grain.setAttribute('opacity', 0.45);
        }
        bodyEl.setAttribute('d',
            'M' + t1.x.toFixed(1) + ' ' + t1.y.toFixed(1) +
            ' Q' + out.x.toFixed(1) + ' ' + out.y.toFixed(1) + ' ' + t2.x.toFixed(1) + ' ' + t2.y.toFixed(1) +
            ' Q' + inn.x.toFixed(1) + ' ' + inn.y.toFixed(1) + ' ' + t1.x.toFixed(1) + ' ' + t1.y.toFixed(1) + ' Z');
    }

    /** 위팔과 아래팔이 이루는 각을 호 하나와 숫자 하나로만 보여 준다 */
    function drawAngle(deg, d) {
        var r = 62;
        var a0 = { x: ELBOW.x, y: ELBOW.y - r };            // 위팔 쪽 (위로)
        var a1 = { x: ELBOW.x + d.x * r, y: ELBOW.y + d.y * r };
        angleArc.setAttribute('d',
            'M' + a0.x.toFixed(1) + ' ' + a0.y.toFixed(1) +
            ' A' + r + ' ' + r + ' 0 ' + (deg > 180 ? 1 : 0) + ' 1 ' + a1.x.toFixed(1) + ' ' + a1.y.toFixed(1));

        // 숫자는 두 방향의 한가운데 바깥에 둔다
        var bx = d.x + 0, by = d.y - 1;                     // 위(0,-1) 와 아래팔 방향의 합
        var blen = Math.hypot(bx, by);
        if (blen < 0.02) { bx = 1; by = 0; blen = 1; }      // 완전히 펴면 앞쪽으로
        var ux = bx / blen, uy = by / blen;
        var tx = ELBOW.x + ux * (r + 38);
        var ty = ELBOW.y + uy * (r + 38);
        angleText.setAttribute('x', tx.toFixed(1));
        angleText.setAttribute('y', ty.toFixed(1));
        angleText.textContent = Math.round(deg) + '°';
        anglePlate.setAttribute('x', (tx - 33).toFixed(1));
        anglePlate.setAttribute('y', (ty - 17).toFixed(1));
        anglePlate.setAttribute('width', 66);
        anglePlate.setAttribute('height', 34);
    }

    /* ── 이름표 ────────────────────────────────────────────── */

    function moveLabel(id, sx, sy) {
        for (var i = 0; i < LABELS.length; i++) {
            if (LABELS[i].id === id) { LABELS[i].sx = sx; LABELS[i].sy = sy; return; }
        }
    }

    /** 이름표와 이음선은 한 번만 만들고, 그 뒤로는 자리만 옮긴다 */
    function buildLabels() {
        labelBox.innerHTML = '';
        while (leaderGroup.firstChild) leaderGroup.removeChild(leaderGroup.firstChild);
        LABELS.forEach(function (item) {
            item._line = el('line', {
                stroke: 'rgba(148, 163, 184, 0.65)', 'stroke-width': 1.6
            });
            leaderGroup.appendChild(item._line);

            var tag = document.createElement('span');
            tag.className = 'joint-tag';
            tag.dataset.for = item.id;
            tag.textContent = item.text;
            labelBox.appendChild(tag);
            item._tag = tag;
        });
    }

    function placeLabels() {
        if (!svg || !labelBox || layer.hidden) return;
        var box = svg.getBoundingClientRect();
        if (!box.width) return;
        var vb = svg.viewBox.baseVal;
        // 그림은 가운데 맞춤으로 들어가므로 남는 여백을 더해 줘야 제자리에 붙는다
        var k = Math.min(box.width / vb.width, box.height / vb.height);
        var offX = (box.width - vb.width * k) / 2;
        var offY = (box.height - vb.height * k) / 2;

        LABELS.forEach(function (item) {
            if (!item._tag) return;
            item._line.setAttribute('x1', item.sx.toFixed(1));
            item._line.setAttribute('y1', item.sy.toFixed(1));
            item._line.setAttribute('x2', item.ax);
            item._line.setAttribute('y2', item.ay);
            item._tag.style.left = (offX + item.ax * k) + 'px';
            item._tag.style.top = (offY + item.ay * k) + 'px';
        });
    }

    /* ── 손잡이 끌기 ───────────────────────────────────────── */

    function bindDrag() {
        handle.addEventListener('pointerdown', function (e) {
            dragging = true;
            handle.setAttribute('cursor', 'grabbing');
            if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
            e.preventDefault();
        });
        window.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var box = svg.getBoundingClientRect();
            if (!box.width) return;
            var vb = svg.viewBox.baseVal;
            var k = Math.min(box.width / vb.width, box.height / vb.height);
            var offX = (box.width - vb.width * k) / 2;
            var offY = (box.height - vb.height * k) / 2;
            var vx = (e.clientX - box.left - offX) / k - ELBOW.x;
            var vy = (e.clientY - box.top - offY) / k - ELBOW.y;
            // 아래(0,1)에서 잰 각이 (180 - 관절각도) 이다
            var phi = Math.atan2(vx, vy) * 180 / Math.PI;   // 아래(0,1) 에서 잰 각
            setJointAngle(180 - phi);
        });
        window.addEventListener('pointerup', function () {
            if (!dragging) return;
            dragging = false;
            handle.setAttribute('cursor', 'grab');
        });
    }

    /* ── 돌리기 ────────────────────────────────────────────── */

    function loop() {
        if (wrap && layer) {
            var act = wrap.querySelector('.scene-btn.active');
            var mine = !!(act && act.dataset.scene === KEY);
            if (layer.hidden === mine) setVisible(mine);
        }
        if (layer && !layer.hidden) {
            render();
            placeLabels();
        }
        requestAnimationFrame(loop);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
