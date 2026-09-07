/**
 * 1차 반응과 2차 반응 (항체 농도 그래프)
 *
 * 시험에 그대로 나오는 그림이다.
 *   1차 침입 - 항체가 나오기까지 시간이 걸리고(잠복기), 양도 적고, 늦게 줄어든다
 *   2차 침입 - 기억 세포 덕분에 곧바로, 훨씬 많이, 오래 나온다
 *
 * [병원체 침입] 을 누르면 1차 반응이, [2차 감염 유발] 을 누르면 2차 반응이 그려진다.
 */

(function () {
    'use strict';

    var MIN_FONT = 13.5;   // 도식 글씨의 최소 크기

    var SVG_NS = 'http://www.w3.org/2000/svg';

    // 그래프 자리 (가상 화면 1000x560)
    var X0 = 110, Y0 = 442, X1 = 930, Y1 = 196;

    var wrap, layer, svg;
    var curve, memoryBand, marks = [], noteText, legendBox;
    var t = 0;                 // 흐른 시간 (그래프 가로축, 0~1)
    var events = [];           // { at: 0~1, kind: 'first' | 'second' }
    var running = false;

    function init() {
        wrap = document.querySelector('.immune-viewport');
        if (!wrap) return;
        addSceneButton();
        buildLayer();
        watchControls();
        requestAnimationFrame(loop);
    }

    function addSceneButton() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar || bar.querySelector('[data-scene="graph"]')) return;
        var b = document.createElement('button');
        b.className = 'scene-btn';
        b.dataset.scene = 'graph';
        b.textContent = '📈 2. 1차·2차 반응 그래프';
        bar.appendChild(b);

        bar.querySelectorAll('.scene-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                bar.querySelectorAll('.scene-btn').forEach(function (x) {
                    x.classList.toggle('active', x === btn);
                });
                setVisible(btn.dataset.scene === 'graph');
            });
        });
    }

    function setVisible(on) {
        if (!layer) return;
        layer.hidden = !on;
        var canvas = document.getElementById('immuneCanvas');
        if (canvas) canvas.style.visibility = on ? 'hidden' : 'visible';
        var hud = wrap.querySelector('.sim-hud-overlay');
        if (hud) hud.style.display = on ? 'none' : '';
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'antibody-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        svg = el('svg', { viewBox: '0 0 1000 560', preserveAspectRatio: 'xMidYMid meet' });
        layer.appendChild(svg);

        drawFrame();
    }

    function drawFrame() {
        var g = el('g');
        svg.appendChild(g);

        g.appendChild(text(500, 172, '같은 병원체가 두 번 들어왔을 때 항체가 얼마나 나오는가', 16, '#f8fafc', 800));

        // 축
        g.appendChild(el('line', { x1: X0, y1: Y0, x2: X1, y2: Y0, stroke: '#64748b', 'stroke-width': 2.5 }));
        g.appendChild(el('line', { x1: X0, y1: Y0, x2: X0, y2: Y1, stroke: '#64748b', 'stroke-width': 2.5 }));
        g.appendChild(text((X0 + X1) / 2, Y0 + 44, '시간', 13.5, '#94a3b8', 700));
        g.appendChild(text(X0 - 46, (Y0 + Y1) / 2 - 10, '항', 13.5, '#94a3b8', 700));
        g.appendChild(text(X0 - 46, (Y0 + Y1) / 2 + 8, '체', 13.5, '#94a3b8', 700));
        g.appendChild(text(X0 - 46, (Y0 + Y1) / 2 + 26, '양', 13.5, '#94a3b8', 700));

        // 기억 세포가 남아 있는 구간
        memoryBand = el('rect', { y: Y1, height: Y0 - Y1, fill: 'rgba(139, 92, 246, 0.10)', x: X0, width: 0 });
        g.appendChild(memoryBand);

        curve = el('path', { fill: 'none', stroke: '#f43f5e', 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
        g.appendChild(curve);

        noteText = text(500, 500, '위쪽 [병원체 침입 (항원 주입)] 을 눌러 1차 반응을 시작해 보세요.', 14, '#cbd5e1', 700);
        svg.appendChild(noteText);

        legendBox = el('g');
        svg.appendChild(legendBox);
    }

    function watchControls() {
        var first = document.getElementById('triggerInvasionBtn');
        var second = document.getElementById('secondaryInfectBtn');
        if (first) first.addEventListener('click', function () { addEvent('first'); });
        if (second) second.addEventListener('click', function () { addEvent('second'); });
    }

    function addEvent(kind) {
        if (layer && layer.hidden) return;
        if (!running) { running = true; t = 0.05; events = []; }   // 세로축에 딱 붙지 않게 조금 띄운다
        if (kind === 'second' && !events.length) kind = 'first';
        // 두 번째 침입은 첫 침입에서 충분히 떨어진 뒤에만
        if (kind === 'second' && t < 0.45) t = 0.45;
        events.push({ at: t, kind: kind });
        drawMarks();
    }

    /** 어느 시점의 항체 양 (0~1) */
    function level(x) {
        var sum = 0;
        events.forEach(function (e) {
            var d = x - e.at;
            if (d < 0) return;
            if (e.kind === 'first') {
                // 잠복기 뒤 천천히 오르고 낮게 머물다 천천히 준다
                if (d < 0.07) return;                       // 잠복기: 항체가 아직 없다
                var rise = Math.min(1, (d - 0.07) / 0.10);
                var fall = Math.exp(-Math.max(0, d - 0.20) * 4.5);
                sum += 0.28 * rise * fall;
            } else {
                // 기억 세포가 있어 곧바로, 크게, 오래
                var rise2 = Math.min(1, d / 0.025);
                var fall2 = Math.exp(-Math.max(0, d - 0.10) * 1.6);
                sum += 1.0 * rise2 * fall2;
            }
        });
        return Math.min(1, sum);
    }

    function loop() {
        if (layer && !layer.hidden && running) {
            t = Math.min(1, t + 0.0016);
            render();
        }
        requestAnimationFrame(loop);
    }

    function render() {
        var d = '';
        for (var x = 0; x <= t; x += 0.004) {
            var px = X0 + x * (X1 - X0);
            var py = Y0 - level(x) * (Y0 - Y1);
            d += (d ? ' L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1);
        }
        curve.setAttribute('d', d);

        // 기억 세포 구간: 1차 침입이 끝난 뒤부터
        var first = events.filter(function (e) { return e.kind === 'first'; })[0];
        if (first) {
            var startX = X0 + Math.min(t, first.at + 0.25) * (X1 - X0);
            memoryBand.setAttribute('x', startX);
            memoryBand.setAttribute('width', Math.max(0, X0 + t * (X1 - X0) - startX));
        }

        var hasSecond = events.some(function (e) { return e.kind === 'second'; });
        if (!first) {
            noteText.textContent = '위쪽 [병원체 침입 (항원 주입)] 을 눌러 1차 반응을 시작해 보세요.';
            noteText.setAttribute('fill', '#cbd5e1');
        } else if (!hasSecond) {
            noteText.textContent = '1차 반응 — 항체가 나오기까지 시간이 걸리고(잠복기), 양도 적습니다. 이제 오른쪽 [2차 감염 유발] 을 눌러 보세요.';
            noteText.setAttribute('fill', '#fca5a5');
        } else {
            noteText.textContent = '2차 반응 — 기억 세포 덕분에 잠복기 없이 곧바로, 훨씬 많이, 더 오래 나옵니다. 백신은 이것을 미리 만들어 두는 것입니다.';
            noteText.setAttribute('fill', '#a5b4fc');
        }
    }

    function drawMarks() {
        marks.forEach(function (m) { if (m.parentNode) m.parentNode.removeChild(m); });
        marks = [];
        events.forEach(function (e, i) {
            var px = X0 + e.at * (X1 - X0);
            var line = el('line', {
                x1: px, y1: Y0, x2: px, y2: Y1 + 10,
                stroke: e.kind === 'first' ? '#f43f5e' : '#a855f7',
                'stroke-width': 2, 'stroke-dasharray': '5,5'
            });
            svg.appendChild(line);
            marks.push(line);

            var lab = tag(px, Y1 - 4, e.kind === 'first' ? '1차 침입' : '2차 침입',
                e.kind === 'first' ? '#f43f5e' : '#a855f7');
            svg.appendChild(lab);
            marks.push(lab);
        });
    }

    /* ── 도우미 ───────────────────────────────────────────── */

    function tag(x, y, str, color) {
        var g = el('g');
        var w = str.length * 13 + 20;
        g.appendChild(el('rect', { x: x - w / 2, y: y - 14, width: w, height: 26, rx: 8, fill: 'rgba(6,10,24,0.9)', stroke: color, 'stroke-width': 1.4 }));
        g.appendChild(text(x, y + 5, str, 13, '#f8fafc', 800));
        return g;
    }

    function el(tagName, attrs) {
        var n = document.createElementNS(SVG_NS, tagName);
        Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
        return n;
    }

    function text(x, y, str, size, fill, weight, anchor) {
        size = Math.max(MIN_FONT, size || MIN_FONT);   // 너무 작은 글씨를 막는다
        var n = el('text', {
            x: x, y: y, fill: fill, 'font-size': size, 'font-weight': weight || 700,
            'font-family': 'Pretendard, sans-serif', 'text-anchor': anchor || 'middle'
        });
        n.textContent = str;
        return n;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
