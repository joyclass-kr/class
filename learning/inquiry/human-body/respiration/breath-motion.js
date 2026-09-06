/**
 * 갈비뼈·가로막과 부피·압력 (호흡 운동)
 *
 * 사이드바의 [가로막 위치] 슬라이더 하나로 갈비뼈가 올라가고 가로막이 내려가며
 * 흉강이 넓어지고 압력이 낮아져 공기가 들어오는 것을 눈으로 보이게 한다.
 * 옆에 종 모형(고무막 실험)을 나란히 두어 교과서 그림과 이어 준다.
 *
 * 부피·압력 식은 app.js 와 똑같이 맞춰 두었다 (숫자가 어긋나면 안 되므로).
 */

(function () {
    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var ATM = 760;

    var wrap, layer, svg;
    var ribs = [], lungLeft, lungRight, diaphragm, chestFill, airArrow, airText;
    var jarMembrane, jarBalloonL, jarBalloonR, jarHand;
    var volBar, volText, presNeedle, presText, verdict;
    var raf;

    function init() {
        wrap = document.querySelector('.respiration-viewport');
        if (!wrap) return;
        addSceneButton();
        buildLayer();
        watchControls();
        loop();
    }

    function addSceneButton() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar || bar.querySelector('[data-scene="breath"]')) return;
        var b = document.createElement('button');
        b.className = 'scene-btn';
        b.dataset.scene = 'breath';
        b.textContent = '🌬️ 3. 갈비뼈·가로막과 부피·압력';
        bar.appendChild(b);

        bar.querySelectorAll('.scene-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                bar.querySelectorAll('.scene-btn').forEach(function (x) {
                    x.classList.toggle('active', x === btn);
                });
                setVisible(btn.dataset.scene === 'breath');
            });
        });
    }

    function setVisible(on) {
        layer.hidden = !on;
        var canvas = document.getElementById('respirationCanvas');
        if (canvas) canvas.style.visibility = on ? 'hidden' : 'visible';
        toggleHud(on);
    }

    /** 떠 있는 안내 띠는 우리 장면의 표와 그림을 덮으므로 감춘다 */
    function toggleHud(hide) {
        if (!wrap) return;
        var hud = wrap.querySelector('.sim-hud-overlay');
        if (hud) hud.style.display = hide ? 'none' : '';
    }

    function pos() {
        var s = document.getElementById('diaphragmSlider');
        var v = s ? parseFloat(s.value) : 50;
        return isNaN(v) ? 50 : v;   // 0 = 완전 날숨, 100 = 완전 들숨
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'breath-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        svg = el('svg', { viewBox: '0 0 1000 560', preserveAspectRatio: 'xMidYMid meet' });
        layer.appendChild(svg);

        drawBody();
        drawJar();
        drawGauges();
    }

    /* ── 왼쪽: 몸통 앞모습 ─────────────────────────────────── */
    function drawBody() {
        var g = el('g');
        svg.appendChild(g);

        g.appendChild(text(250, 46, '몸속에서 일어나는 일', 17, '#f8fafc', 800));

        // 흉강 (갈비뼈와 가로막이 둘러싼 빈 곳)
        chestFill = el('path', { fill: 'rgba(56,189,248,0.14)', stroke: 'none' });
        g.appendChild(chestFill);

        // 기관과 기관지
        g.appendChild(el('path', {
            d: 'M250 92 L250 168 M250 168 L196 206 M250 168 L304 206',
            fill: 'none', stroke: '#cbd5e1', 'stroke-width': 9, 'stroke-linecap': 'round'
        }));

        // 폐 둘
        lungLeft = el('ellipse', { fill: 'rgba(244,63,94,0.42)', stroke: '#fda4af', 'stroke-width': 2.5 });
        lungRight = el('ellipse', { fill: 'rgba(244,63,94,0.42)', stroke: '#fda4af', 'stroke-width': 2.5 });
        g.appendChild(lungLeft);
        g.appendChild(lungRight);

        // 갈비뼈 (좌우 다섯 쌍)
        for (var i = 0; i < 5; i++) {
            var r = el('path', { fill: 'none', stroke: '#e8f4ff', 'stroke-width': 7, 'stroke-linecap': 'round' });
            g.appendChild(r);
            ribs.push(r);
        }

        // 척추 (가운데 세로)
        g.appendChild(el('rect', { x: 244, y: 150, width: 12, height: 190, rx: 6, fill: '#94a3b8', opacity: 0.55 }));

        // 가로막
        diaphragm = el('path', { fill: 'none', stroke: '#f59e0b', 'stroke-width': 10, 'stroke-linecap': 'round' });
        g.appendChild(diaphragm);
        g.appendChild(text(250, 452, '가로막 (횡격막)', 13, '#fbbf24', 800));

        // 공기 화살표
        airArrow = el('path', { fill: '#38bdf8' });
        g.appendChild(airArrow);
        airText = text(330, 96, '', 14, '#38bdf8', 800, 'start');
        g.appendChild(airText);
    }

    /* ── 가운데: 종 모형 (고무막 실험) ────────────────────── */
    function drawJar() {
        var g = el('g', { transform: 'translate(470, 0)' });
        svg.appendChild(g);

        g.appendChild(text(120, 46, '종 모형 (고무막 실험)', 17, '#f8fafc', 800));

        // 유리종
        g.appendChild(el('path', {
            d: 'M30 120 L30 380 L210 380 L210 120 C210 96 176 82 120 82 C64 82 30 96 30 120 Z',
            fill: 'rgba(226,232,240,0.07)', stroke: '#cbd5e1', 'stroke-width': 3
        }));
        // 유리관
        g.appendChild(el('path', {
            d: 'M120 60 L120 140 M120 140 L92 172 M120 140 L148 172',
            fill: 'none', stroke: '#cbd5e1', 'stroke-width': 7, 'stroke-linecap': 'round'
        }));

        jarBalloonL = el('ellipse', { fill: 'rgba(244,63,94,0.42)', stroke: '#fda4af', 'stroke-width': 2.5 });
        jarBalloonR = el('ellipse', { fill: 'rgba(244,63,94,0.42)', stroke: '#fda4af', 'stroke-width': 2.5 });
        g.appendChild(jarBalloonL);
        g.appendChild(jarBalloonR);

        // 고무막
        jarMembrane = el('path', { fill: 'none', stroke: '#f59e0b', 'stroke-width': 9, 'stroke-linecap': 'round' });
        g.appendChild(jarMembrane);

        // 잡아당기는 손
        jarHand = el('path', { fill: 'none', stroke: '#fbbf24', 'stroke-width': 5, 'stroke-linecap': 'round' });
        g.appendChild(jarHand);

        g.appendChild(text(120, 452, '고무막 = 가로막 · 풍선 = 폐 · 유리종 = 흉강', 12.5, '#94a3b8', 700));
    }

    /* ── 오른쪽: 부피·압력 눈금 ───────────────────────────── */
    function drawGauges() {
        var g = el('g', { transform: 'translate(760, 0)' });
        svg.appendChild(g);

        g.appendChild(text(0, 46, '재어 보기', 17, '#f8fafc', 800, 'start'));

        // 부피
        g.appendChild(text(0, 92, '흉강 부피', 14, '#cbd5e1', 700, 'start'));
        g.appendChild(el('rect', { x: 0, y: 104, width: 170, height: 26, rx: 8, fill: 'rgba(148,163,184,0.18)' }));
        volBar = el('rect', { x: 0, y: 104, width: 80, height: 26, rx: 8, fill: '#34d399' });
        g.appendChild(volBar);
        volText = text(0, 152, '', 16, '#34d399', 800, 'start');
        g.appendChild(volText);

        // 압력
        g.appendChild(text(0, 208, '흉강 내압 (대기압 760)', 14, '#cbd5e1', 700, 'start'));
        g.appendChild(el('line', { x1: 0, y1: 240, x2: 170, y2: 240, stroke: '#64748b', 'stroke-width': 3 }));
        g.appendChild(el('line', { x1: 85, y1: 228, x2: 85, y2: 252, stroke: '#facc15', 'stroke-width': 3 }));
        g.appendChild(text(85, 272, '760', 12, '#facc15', 700));
        g.appendChild(text(6, 272, '낮음', 12, '#38bdf8', 700, 'start'));
        g.appendChild(text(164, 272, '높음', 12, '#f59e0b', 700, 'end'));
        presNeedle = el('circle', { r: 9, fill: '#38bdf8', stroke: '#ffffff', 'stroke-width': 2.5, cy: 240 });
        g.appendChild(presNeedle);
        presText = text(0, 312, '', 16, '#38bdf8', 800, 'start');
        g.appendChild(presText);

        // 결론 한 줄
        verdict = el('g');
        svg.appendChild(verdict);
    }

    function watchControls() {
        var s = document.getElementById('diaphragmSlider');
        if (s) s.addEventListener('input', render);
    }

    function loop() {
        render();
        raf = requestAnimationFrame(loop);
    }

    function render() {
        if (!layer || layer.hidden) return;

        var p = pos();                       // 0 ~ 100
        var k = (p - 50) / 50;               // -1 (완전 날숨) ~ +1 (완전 들숨)
        var volumeL = 1.8 + (p / 100) * 2.5; // app.js 와 같은 식
        var pressure = ATM - (p - 50) * 0.16;

        /* 갈비뼈: 들숨이면 위로 들리고 가슴이 넓어진다 */
        for (var i = 0; i < ribs.length; i++) {
            var y = 176 + i * 34;
            var spread = 84 + i * 9 + k * 16;      // 좌우로 벌어지는 폭
            var lift = -k * (10 + i * 2);          // 앞쪽 끝이 들리는 정도
            var sag = 26 - k * 10;                 // 아래로 처지는 정도
            ribs[i].setAttribute('d',
                'M250 ' + y + ' C' + (250 - spread * 0.55) + ' ' + (y + lift) +
                ' ' + (250 - spread) + ' ' + (y + sag * 0.4) + ' ' + (250 - spread) + ' ' + (y + sag) +
                ' M250 ' + y + ' C' + (250 + spread * 0.55) + ' ' + (y + lift) +
                ' ' + (250 + spread) + ' ' + (y + sag * 0.4) + ' ' + (250 + spread) + ' ' + (y + sag));
        }

        /* 가로막: 들숨이면 내려가며 평평해지고, 날숨이면 올라가며 볼록해진다 */
        var dY = 372 + k * 26;
        var dome = -k * 46 + 40;               // 위로 볼록한 정도
        diaphragm.setAttribute('d',
            'M146 ' + dY + ' Q250 ' + (dY - dome) + ' 354 ' + dY);

        /* 흉강: 갈비뼈 안쪽과 가로막이 둘러싼 자리 */
        var halfW = 128 + k * 18;
        chestFill.setAttribute('d',
            'M' + (250 - halfW) + ' 168 L' + (250 + halfW) + ' 168 L' + (250 + halfW) + ' ' + dY +
            ' Q250 ' + (dY - dome) + ' ' + (250 - halfW) + ' ' + dY + ' Z');

        /* 폐: 부피에 따라 커졌다 작아졌다 */
        var lr = 44 + k * 12, lh = 74 + k * 20;
        setAttrs(lungLeft, { cx: 250 - 56, cy: 268, rx: lr, ry: lh });
        setAttrs(lungRight, { cx: 250 + 56, cy: 268, rx: lr, ry: lh });

        /* 공기 화살표 */
        if (k > 0.04) {
            airArrow.setAttribute('d', 'M262 62 L262 96 L274 96 L250 122 L226 96 L238 96 L238 62 Z');
            airArrow.setAttribute('fill', '#38bdf8');
            airText.textContent = '공기가 들어옵니다 (들숨)';
            airText.setAttribute('fill', '#38bdf8');
        } else if (k < -0.04) {
            airArrow.setAttribute('d', 'M262 122 L262 88 L274 88 L250 62 L226 88 L238 88 L238 122 Z');
            airArrow.setAttribute('fill', '#f59e0b');
            airText.textContent = '공기가 나갑니다 (날숨)';
            airText.setAttribute('fill', '#f59e0b');
        } else {
            airArrow.setAttribute('d', '');
            airText.textContent = '공기가 드나들지 않습니다';
            airText.setAttribute('fill', '#94a3b8');
        }

        /* 종 모형도 똑같이 움직인다 */
        var mY = 366 + k * 14;   // 유리종 바닥(380) 안쪽에서 움직이게
        var mDome = -k * 44 + 34;
        jarMembrane.setAttribute('d', 'M30 ' + mY + ' Q120 ' + (mY - mDome) + ' 210 ' + mY);
        jarHand.setAttribute('d', 'M120 ' + (mY - mDome + 6) + ' L120 ' + (mY + 46));
        var br = 28 + k * 9, bh = 46 + k * 14;
        setAttrs(jarBalloonL, { cx: 84, cy: 234, rx: br, ry: bh });
        setAttrs(jarBalloonR, { cx: 156, cy: 234, rx: br, ry: bh });

        /* 눈금 */
        volBar.setAttribute('width', Math.max(6, ((volumeL - 1.6) / 2.9) * 170).toFixed(1));
        volText.textContent = volumeL.toFixed(2) + ' L';
        presNeedle.setAttribute('cx', (85 + (pressure - ATM) * 10).toFixed(1));
        presText.textContent = pressure.toFixed(1) + ' mmHg';

        var low = pressure < ATM - 0.05;
        var high = pressure > ATM + 0.05;
        presNeedle.setAttribute('fill', low ? '#38bdf8' : (high ? '#f59e0b' : '#94a3b8'));
        presText.setAttribute('fill', low ? '#38bdf8' : (high ? '#f59e0b' : '#94a3b8'));

        /* 결론 한 줄 */
        while (verdict.firstChild) verdict.removeChild(verdict.firstChild);
        var line, color;
        if (low) {
            line = '가로막이 내려가고 갈비뼈가 올라감 ➔ 흉강이 넓어짐 ➔ 압력이 대기압보다 낮아짐 ➔ 공기가 들어옴';
            color = '#38bdf8';
        } else if (high) {
            line = '가로막이 올라가고 갈비뼈가 내려감 ➔ 흉강이 좁아짐 ➔ 압력이 대기압보다 높아짐 ➔ 공기가 나감';
            color = '#f59e0b';
        } else {
            line = '슬라이더를 움직여 가로막을 내려 보세요. 흉강이 넓어지면 압력이 어떻게 되는지 보입니다.';
            color = '#94a3b8';
        }
        var box = el('rect', { x: 40, y: 496, width: 920, height: 40, rx: 12, fill: 'rgba(6,10,24,0.85)', stroke: color, 'stroke-width': 1.6 });
        verdict.appendChild(box);
        verdict.appendChild(text(500, 522, line, 14.5, color, 800));
    }

    /* ── 도우미 ───────────────────────────────────────────── */
    function el(tag, attrs) {
        var n = document.createElementNS(SVG_NS, tag);
        setAttrs(n, attrs);
        return n;
    }

    function setAttrs(n, attrs) {
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
