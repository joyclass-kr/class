/**
 * 피부에서 일어나는 체온 조절
 *
 * 바깥 기온 슬라이더 하나로 피부 단면이 통째로 바뀐다.
 *   더울 때 - 피부 혈관 확장(열을 많이 내보냄) + 땀 분비(기화열)
 *   추울 때 - 피부 혈관 수축(열을 덜 내보냄) + 털세움근 수축 + 근육 떨림(열을 만듦)
 * 둘 다 간뇌 시상하부가 시킨다. 음성 피드백이라 체온은 36.5 ℃ 언저리로 되돌아온다.
 */

(function () {
    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';

    var wrap, layer, svg;
    var vessel, vesselGlow, sweatDrops = [], hairs = [], hairMuscles = [], shivers = [];
    var heatArrows = [], glandFill;
    var titleText, orderText, verdictBox, verdictText, lossBar, lossText, makeBar, makeText;
    var t0 = 0;

    function init() {
        wrap = document.querySelector('.homeostasis-viewport');
        if (!wrap) return;
        addSceneButton();
        buildLayer();
        watchControls();
        requestAnimationFrame(loop);
    }

    function addSceneButton() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar || bar.querySelector('[data-scene="skin"]')) return;
        var b = document.createElement('button');
        b.className = 'scene-btn';
        b.dataset.scene = 'skin';
        b.textContent = '🧴 4. 피부에서 일어나는 일';
        bar.appendChild(b);

        bar.querySelectorAll('.scene-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                bar.querySelectorAll('.scene-btn').forEach(function (x) {
                    x.classList.toggle('active', x === btn);
                });
                setVisible(btn.dataset.scene === 'skin');
            });
        });
    }

    function setVisible(on) {
        layer.hidden = !on;
        var canvas = document.getElementById('homeostasisCanvas');
        if (canvas) canvas.style.visibility = on ? 'hidden' : 'visible';
        toggleHud(on);
    }

    /** 떠 있는 안내 띠는 우리 장면의 표와 그림을 덮으므로 감춘다 */
    function toggleHud(hide) {
        if (!wrap) return;
        var hud = wrap.querySelector('.sim-hud-overlay');
        if (hud) hud.style.display = hide ? 'none' : '';
    }

    function envTemp() {
        var s = document.getElementById('envSlider');
        var v = s ? parseFloat(s.value) : 25;
        return isNaN(v) ? 25 : v;    // -10 ~ 40 ℃
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'skin-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        svg = el('svg', { viewBox: '0 0 1000 560', preserveAspectRatio: 'xMidYMid meet' });
        layer.appendChild(svg);

        drawSkin();
        drawPanel();
    }

    function drawSkin() {
        var g = el('g');
        svg.appendChild(g);

        titleText = text(330, 44, '', 16, '#f8fafc', 800);
        g.appendChild(titleText);

        // 피부 세 겹
        g.appendChild(el('rect', { x: 60, y: 120, width: 560, height: 52, fill: '#fcd9b6', stroke: '#e7b98d', 'stroke-width': 2 }));
        g.appendChild(el('rect', { x: 60, y: 172, width: 560, height: 176, fill: '#f6c3a0', stroke: '#e7b98d', 'stroke-width': 2 }));
        g.appendChild(el('rect', { x: 60, y: 348, width: 560, height: 96, fill: '#fde68a', stroke: '#e7b98d', 'stroke-width': 2, opacity: 0.75 }));

        g.appendChild(text(96, 152, '표피', 13, '#7c2d12', 800, 'start'));
        g.appendChild(text(96, 196, '진피', 13, '#7c2d12', 800, 'start'));
        g.appendChild(text(96, 374, '피하 지방', 13, '#7c2d12', 800, 'start'));

        // 털 (표피 위)
        [180, 300, 420, 520].forEach(function (x) {
            var hair = el('line', { stroke: '#78350f', 'stroke-width': 4, 'stroke-linecap': 'round' });
            var muscle = el('line', { stroke: '#b91c1c', 'stroke-width': 3, 'stroke-linecap': 'round' });
            hair._x = x;
            g.appendChild(hair);
            g.appendChild(muscle);
            hairs.push(hair);
            hairMuscles.push(muscle);
        });

        // 열이 빠져나가는 화살표
        for (var i = 0; i < 5; i++) {
            var a = el('path', { fill: '#f97316' });
            a._x = 140 + i * 110;
            g.appendChild(a);
            heatArrows.push(a);
        }

        // 피부 혈관 (굵기가 바뀐다)
        vesselGlow = el('path', { fill: 'none', stroke: '#ef4444', 'stroke-linecap': 'round', opacity: 0.25 });
        vessel = el('path', { fill: 'none', stroke: '#dc2626', 'stroke-linecap': 'round' });
        g.appendChild(vesselGlow);
        g.appendChild(vessel);
        g.appendChild(tagBox(560, 300, '피부 혈관', '#ef4444'));

        // 땀샘
        glandFill = el('path', {
            d: 'M300 344 C270 344 262 300 292 288 C322 276 338 300 330 320 L330 240',
            fill: 'none', stroke: '#38bdf8', 'stroke-width': 7, 'stroke-linecap': 'round'
        });
        g.appendChild(glandFill);
        g.appendChild(tagBox(214, 322, '땀샘', '#38bdf8'));

        // 땀방울
        for (var j = 0; j < 6; j++) {
            var d = el('ellipse', { rx: 6, ry: 8, fill: '#38bdf8' });
            d._i = j;
            g.appendChild(d);
            sweatDrops.push(d);
        }

        // 근육 떨림 표시
        for (var k = 0; k < 3; k++) {
            var s = el('path', { fill: 'none', stroke: '#facc15', 'stroke-width': 3, 'stroke-linecap': 'round' });
            s._x = 200 + k * 160;
            g.appendChild(s);
            shivers.push(s);
        }
    }

    function drawPanel() {
        var g = el('g', { transform: 'translate(680, 0)' });
        svg.appendChild(g);

        g.appendChild(text(0, 62, '몸이 내리는 명령', 17, '#f8fafc', 800, 'start'));
        g.appendChild(text(0, 92, '간뇌 시상하부가 시킵니다', 13, '#94a3b8', 700, 'start'));

        orderText = el('g');
        g.appendChild(orderText);

        // 열을 내보내는 양
        g.appendChild(text(0, 322, '내보내는 열', 13.5, '#cbd5e1', 700, 'start'));
        g.appendChild(el('rect', { x: 0, y: 334, width: 260, height: 22, rx: 7, fill: 'rgba(148,163,184,0.18)' }));
        lossBar = el('rect', { x: 0, y: 334, width: 120, height: 22, rx: 7, fill: '#f97316' });
        g.appendChild(lossBar);
        lossText = text(0, 376, '', 13, '#fdba74', 800, 'start');
        g.appendChild(lossText);

        // 열을 만드는 양
        g.appendChild(text(0, 412, '만들어 내는 열', 13.5, '#cbd5e1', 700, 'start'));
        g.appendChild(el('rect', { x: 0, y: 424, width: 260, height: 22, rx: 7, fill: 'rgba(148,163,184,0.18)' }));
        makeBar = el('rect', { x: 0, y: 424, width: 120, height: 22, rx: 7, fill: '#facc15' });
        g.appendChild(makeBar);
        makeText = text(0, 466, '', 13, '#fde68a', 800, 'start');
        g.appendChild(makeText);

        verdictBox = el('rect', { x: 40, y: 500, width: 920, height: 40, rx: 12, fill: 'rgba(6,10,24,0.85)', 'stroke-width': 1.6 });
        svg.appendChild(verdictBox);
        verdictText = text(500, 526, '', 14.5, '#f8fafc', 800);
        svg.appendChild(verdictText);
    }

    function watchControls() {
        var s = document.getElementById('envSlider');
        if (s) s.addEventListener('input', render);
    }

    function loop(ts) {
        t0 = ts || 0;
        render();
        requestAnimationFrame(loop);
    }

    function render() {
        if (!layer || layer.hidden) return;

        var env = envTemp();
        var hot = env >= 28;
        var cold = env <= 18;
        var h = Math.max(0, Math.min(1, (env - 18) / 22));    // 0 (추움) ~ 1 (더움)

        titleText.textContent = '피부 단면 — 바깥 기온 ' + env + ' ℃';
        titleText.setAttribute('fill', hot ? '#fdba74' : (cold ? '#7dd3fc' : '#f8fafc'));

        /* 혈관: 더우면 굵어지고 추우면 가늘어진다 */
        var w = 6 + h * 26;
        var path = 'M96 296 C200 268 240 324 340 296 C440 268 500 324 584 296';
        vessel.setAttribute('d', path);
        vessel.setAttribute('stroke-width', w.toFixed(1));
        vesselGlow.setAttribute('d', path);
        vesselGlow.setAttribute('stroke-width', (w + 14).toFixed(1));
        vesselGlow.setAttribute('opacity', (0.10 + h * 0.3).toFixed(2));

        /* 열 화살표: 혈관이 굵을수록 많이 빠져나간다 */
        heatArrows.forEach(function (a, i) {
            if (h < 0.25) { a.setAttribute('d', ''); return; }
            var len = 12 + h * 22;   // 화살표 끝이 제목 줄을 넘지 않게
            var wob = Math.sin(t0 * 0.004 + i) * 4;
            var x = a._x + wob;
            a.setAttribute('d', 'M' + (x - 7) + ' 120 L' + (x - 7) + ' ' + (120 - len) +
                ' L' + (x - 15) + ' ' + (120 - len) + ' L' + x + ' ' + (120 - len - 18) +
                ' L' + (x + 15) + ' ' + (120 - len) + ' L' + (x + 7) + ' ' + (120 - len) + ' L' + (x + 7) + ' 120 Z');
            a.setAttribute('opacity', (0.25 + h * 0.7).toFixed(2));
        });

        /* 땀: 더울 때만 흐른다 */
        sweatDrops.forEach(function (d, i) {
            if (!hot) { d.setAttribute('opacity', 0); return; }
            var p = ((t0 * 0.00035) + i / sweatDrops.length) % 1;
            d.setAttribute('opacity', (0.9 - p * 0.5).toFixed(2));
            d.setAttribute('cx', 330 + Math.sin(i * 2.1) * 8);
            d.setAttribute('cy', (240 - p * 150).toFixed(1));
        });
        glandFill.setAttribute('opacity', hot ? 1 : 0.35);

        /* 털과 털세움근: 추울 때 털이 곤두선다 */
        hairs.forEach(function (hair, i) {
            var x = hair._x;
            var lean = cold ? 0 : 26;             // 추우면 곧게 서고, 더우면 눕는다
            hair.setAttribute('x1', x);
            hair.setAttribute('y1', 120);
            hair.setAttribute('x2', x + lean);
            hair.setAttribute('y2', cold ? 44 : 78);
            hair.setAttribute('opacity', 0.95);

            var m = hairMuscles[i];
            m.setAttribute('x1', x);
            m.setAttribute('y1', 168);
            m.setAttribute('x2', x - (cold ? 4 : 18));
            m.setAttribute('y2', 206);
            m.setAttribute('stroke-width', cold ? 6 : 3);
            m.setAttribute('opacity', cold ? 1 : 0.45);
        });

        /* 근육 떨림: 추울 때만 */
        shivers.forEach(function (s, i) {
            if (!cold) { s.setAttribute('d', ''); return; }
            var y = 396 + Math.sin(t0 * 0.02 + i) * 4;
            var x = s._x;
            s.setAttribute('d', 'M' + x + ' ' + y + ' l14 -10 l14 20 l14 -20 l14 20 l14 -10');
            s.setAttribute('opacity', 0.9);
        });

        /* 오른쪽 명령 목록 */
        var orders = hot
            ? ['피부 혈관 확장', '땀 분비 늘림', '털세움근 이완', '몸 떨림 없음']
            : (cold
                ? ['피부 혈관 수축', '땀 분비 줄임', '털세움근 수축 (털이 섬)', '몸이 떨림 (열 발생)']
                : ['피부 혈관 보통', '땀 조금', '털세움근 보통', '떨림 없음']);
        var color = hot ? '#fb923c' : (cold ? '#38bdf8' : '#94a3b8');
        while (orderText.firstChild) orderText.removeChild(orderText.firstChild);
        orders.forEach(function (o, i) {
            var y = 124 + i * 44;
            orderText.appendChild(el('rect', {
                x: 0, y: y, width: 260, height: 34, rx: 9,
                fill: 'rgba(15,23,42,0.85)', stroke: color, 'stroke-width': 1.5
            }));
            orderText.appendChild(text(14, y + 23, o, 13.5, '#f8fafc', 800, 'start'));
        });

        /* 열 막대 */
        var loss = hot ? 0.85 : (cold ? 0.18 : 0.5);
        var make = cold ? 0.9 : (hot ? 0.3 : 0.5);
        lossBar.setAttribute('width', (loss * 260).toFixed(0));
        makeBar.setAttribute('width', (make * 260).toFixed(0));
        lossText.textContent = hot ? '혈관이 넓어져 열을 많이 내보냅니다' : (cold ? '혈관이 좁아져 열을 덜 내보냅니다' : '보통');
        makeText.textContent = cold ? '떨어서 열을 많이 만듭니다' : (hot ? '열을 적게 만듭니다' : '보통');

        /* 한 줄 결론 */
        var line;
        if (hot) line = '더움 ➔ 간뇌 시상하부 ➔ 피부 혈관 확장 · 땀 분비 ➔ 열을 많이 내보내 체온이 내려갑니다';
        else if (cold) line = '추움 ➔ 간뇌 시상하부 ➔ 피부 혈관 수축 · 몸 떨림 ➔ 열을 덜 내보내고 더 만들어 체온이 올라갑니다';
        else line = '슬라이더로 바깥 기온을 바꿔 보세요. 피부 혈관과 땀, 털이 어떻게 달라지는지 보입니다.';
        verdictText.textContent = line;
        verdictText.setAttribute('fill', color);
        verdictBox.setAttribute('stroke', color);
    }

    /* ── 도우미 ───────────────────────────────────────────── */

    function tagBox(x, y, str, color) {
        var g = el('g');
        g.appendChild(el('rect', { x: x - 44, y: y - 15, width: 88, height: 26, rx: 8, fill: 'rgba(6,10,24,0.86)', stroke: color, 'stroke-width': 1.4 }));
        g.appendChild(text(x, y + 4, str, 13, '#f8fafc', 800));
        return g;
    }

    function el(tag, attrs) {
        var n = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
        return n;
    }

    function text(x, y, str, size, fill, weight, anchor) {
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
