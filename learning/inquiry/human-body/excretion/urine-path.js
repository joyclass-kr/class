/**
 * 오줌이 만들어져 나가는 길
 *
 * 콩팥 ➔ 오줌관 ➔ 방광 ➔ 요도 로 오줌이 실제로 흘러 내려가고 방광이 차오른다.
 * [배뇨하기] 를 누르면 비워진다.
 *
 * 항이뇨호르몬과 수분 섭취량에 따라 만들어지는 양과 색이 달라진다.
 * 시험에 나오는 대목: 콩팥에서 오줌이 만들어지고, 오줌관을 지나 방광에 모였다가 요도로 나간다.
 */

(function () {
    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';

    var wrap, layer, svg;
    var drops = [], bladderFill, bladderOutline, urethraFlow, rateText, colorText;
    var bladderLevel = 0.35;   // 0 ~ 1
    var voiding = 0;           // 배뇨 중 남은 시간
    var lastTs = 0;

    // 오줌이 지나는 길 (가상 화면 1000x560 기준)
    var LEFT_KIDNEY = { x: 330, y: 210 };
    var RIGHT_KIDNEY = { x: 670, y: 210 };
    var BLADDER = { x: 500, y: 398 };

    function init() {
        wrap = document.querySelector('.excretion-viewport');
        if (!wrap) return;
        addSceneButton();
        buildLayer();
        watchControls();
        requestAnimationFrame(loop);
    }

    function addSceneButton() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar || bar.querySelector('[data-scene="urine"]')) return;
        var b = document.createElement('button');
        b.className = 'scene-btn';
        b.dataset.scene = 'urine';
        b.textContent = '🚰 2. 오줌이 만들어져 나가는 길';
        bar.appendChild(b);

        bar.querySelectorAll('.scene-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                bar.querySelectorAll('.scene-btn').forEach(function (x) {
                    x.classList.toggle('active', x === btn);
                });
                setVisible(btn.dataset.scene === 'urine');
            });
        });
    }

    function setVisible(on) {
        if (!layer) return;
        layer.hidden = !on;
        var canvas = document.getElementById('excretionCanvas');
        if (canvas && on) canvas.style.visibility = 'hidden';
        else if (canvas && !document.querySelector('.nephron-layer:not([hidden])')) canvas.style.visibility = 'visible';
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'urine-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        svg = el('svg', { viewBox: '0 0 1000 560', preserveAspectRatio: 'xMidYMid meet' });
        layer.appendChild(svg);

        draw();
    }

    function draw() {
        var g = el('g');
        svg.appendChild(g);

        g.appendChild(text(500, 112, '오줌은 콩팥에서 만들어져 오줌관을 지나 방광에 모였다가 요도로 나갑니다', 14, '#cbd5e1', 700));
        g.appendChild(text(500, 548, '몸을 앞에서 본 그림입니다. 그래서 화면 왼쪽이 몸의 오른쪽 콩팥입니다.', 12.5, '#94a3b8', 700));

        // 콩팥 둘
        [LEFT_KIDNEY, RIGHT_KIDNEY].forEach(function (k, i) {
            var flip = i === 0 ? 1 : -1;
            g.appendChild(el('path', {
                d: 'M' + (k.x + 44 * flip) + ' ' + (k.y - 52) +
                   ' C' + (k.x + 96 * flip) + ' ' + (k.y - 34) + ' ' + (k.x + 96 * flip) + ' ' + (k.y + 34) + ' ' + (k.x + 44 * flip) + ' ' + (k.y + 52) +
                   ' C' + (k.x - 6 * flip) + ' ' + (k.y + 62) + ' ' + (k.x - 20 * flip) + ' ' + (k.y + 20) + ' ' + (k.x - 20 * flip) + ' ' + k.y +
                   ' C' + (k.x - 20 * flip) + ' ' + (k.y - 20) + ' ' + (k.x - 6 * flip) + ' ' + (k.y - 62) + ' ' + (k.x + 44 * flip) + ' ' + (k.y - 52) + ' Z',
                fill: '#b91c1c', stroke: '#fca5a5', 'stroke-width': 3
            }));
            // 겉질 · 속질
            g.appendChild(el('path', {
                d: 'M' + (k.x + 40 * flip) + ' ' + (k.y - 34) +
                   ' C' + (k.x + 74 * flip) + ' ' + (k.y - 20) + ' ' + (k.x + 74 * flip) + ' ' + (k.y + 20) + ' ' + (k.x + 40 * flip) + ' ' + (k.y + 34),
                fill: 'none', stroke: '#fecaca', 'stroke-width': 2.5, 'stroke-dasharray': '5,5'
            }));
            g.appendChild(tag(k.x + 78 * flip, k.y - 74, i === 0 ? '오른쪽 콩팥' : '왼쪽 콩팥', '#fca5a5'));
        });

        // 겉질과 속질은 콩팥 한 개 안에 겹으로 있다 (오른쪽 콩팥에만 표시)
        g.appendChild(text(RIGHT_KIDNEY.x - 44, RIGHT_KIDNEY.y - 6, '겉질', 12, '#fee2e2', 800));
        g.appendChild(text(RIGHT_KIDNEY.x + 4, RIGHT_KIDNEY.y - 6, '속질', 12, '#fecaca', 800));

        // 오줌관 둘
        [LEFT_KIDNEY, RIGHT_KIDNEY].forEach(function (k) {
            g.appendChild(el('path', {
                d: 'M' + k.x + ' ' + (k.y + 46) + ' C' + k.x + ' ' + (k.y + 130) + ' ' + BLADDER.x + ' ' + (BLADDER.y - 120) + ' ' + BLADDER.x + ' ' + (BLADDER.y - 44),
                fill: 'none', stroke: '#fbbf24', 'stroke-width': 13, 'stroke-linecap': 'round', opacity: 0.35
            }));
        });
        g.appendChild(tag(392, 322, '오줌관', '#fbbf24'));

        // 방광
        bladderOutline = el('path', {
            d: 'M' + (BLADDER.x - 78) + ' ' + (BLADDER.y - 34) +
               ' C' + (BLADDER.x - 96) + ' ' + (BLADDER.y + 44) + ' ' + (BLADDER.x - 46) + ' ' + (BLADDER.y + 86) + ' ' + BLADDER.x + ' ' + (BLADDER.y + 86) +
               ' C' + (BLADDER.x + 46) + ' ' + (BLADDER.y + 86) + ' ' + (BLADDER.x + 96) + ' ' + (BLADDER.y + 44) + ' ' + (BLADDER.x + 78) + ' ' + (BLADDER.y - 34) + ' Z',
            fill: 'rgba(148,163,184,0.10)', stroke: '#cbd5e1', 'stroke-width': 3
        });
        g.appendChild(bladderOutline);

        // 방광에 차는 오줌 (아래에서 위로 찬다)
        var clip = el('clipPath', { id: 'bladderClip' });
        clip.appendChild(el('path', { d: bladderOutline.getAttribute('d') }));
        svg.appendChild(clip);

        bladderFill = el('rect', {
            x: BLADDER.x - 96, width: 192, fill: '#facc15', 'clip-path': 'url(#bladderClip)', opacity: 0.85
        });
        g.appendChild(bladderFill);
        g.appendChild(tag(BLADDER.x + 122, BLADDER.y + 30, '방광', '#cbd5e1'));

        // 요도
        g.appendChild(el('path', {
            d: 'M' + BLADDER.x + ' ' + (BLADDER.y + 86) + ' L' + BLADDER.x + ' ' + (BLADDER.y + 128),
            fill: 'none', stroke: '#cbd5e1', 'stroke-width': 10, 'stroke-linecap': 'round'
        }));
        g.appendChild(tag(BLADDER.x + 104, BLADDER.y + 62, '요도', '#cbd5e1'));

        urethraFlow = el('path', { fill: 'none', stroke: '#facc15', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0 });
        g.appendChild(urethraFlow);

        // 흐르는 오줌 방울
        for (var i = 0; i < 10; i++) {
            var d = el('circle', { r: 6, fill: '#facc15' });
            d._side = i % 2;
            d._t = i / 10;
            g.appendChild(d);
            drops.push(d);
        }

        rateText = text(500, 504, '', 13.5, '#fde68a', 800);
        svg.appendChild(rateText);
        colorText = text(BLADDER.x, BLADDER.y + 40, '', 13, '#78350f', 800);
        svg.appendChild(colorText);
    }

    function watchControls() {
        var b = document.getElementById('urinateBtn');
        if (b) b.addEventListener('click', function () { voiding = 1.6; });
    }

    function state() {
        return {
            water: num('hydrationSlider', 50),
            adh: num('adhSlider', 50)
        };
    }

    function num(id, dflt) {
        var s = document.getElementById(id);
        var v = s ? parseFloat(s.value) : dflt;
        return isNaN(v) ? dflt : v;
    }

    /** 물을 많이 마시고 항이뇨호르몬이 적으면 오줌이 많고 묽다 */
    function makeRate(st) {
        return Math.max(0.15, Math.min(1, (st.water / 100) * 1.1 - (st.adh / 100) * 0.55 + 0.25));
    }

    function loop(ts) {
        if (!lastTs) lastTs = ts;
        var dt = Math.min((ts - lastTs) / 1000, 0.1);
        lastTs = ts;
        if (layer && !layer.hidden) step(dt);
        requestAnimationFrame(loop);
    }

    function step(dt) {
        var st = state();
        var rate = makeRate(st);

        // 방광 차오름 · 비움
        if (voiding > 0) {
            voiding -= dt;
            bladderLevel = Math.max(0, bladderLevel - dt * 0.75);
        } else {
            bladderLevel = Math.min(1, bladderLevel + dt * rate * 0.05);
        }

        // 방울 흐르기
        drops.forEach(function (d, i) {
            d._t = (d._t + dt * (0.10 + rate * 0.22)) % 1;
            var k = d._side === 0 ? LEFT_KIDNEY : RIGHT_KIDNEY;
            var t = d._t;
            var x = bez(k.x, k.x, BLADDER.x, BLADDER.x, t);
            var y = bez(k.y + 46, k.y + 130, BLADDER.y - 120, BLADDER.y - 44, t);
            d.setAttribute('cx', x.toFixed(1));
            d.setAttribute('cy', y.toFixed(1));
            d.setAttribute('opacity', (0.35 + rate * 0.6).toFixed(2));
            d.setAttribute('r', (4 + rate * 3).toFixed(1));
        });

        // 방광 안 오줌 높이
        var top = BLADDER.y + 86 - bladderLevel * 120;
        bladderFill.setAttribute('y', top.toFixed(1));
        bladderFill.setAttribute('height', (BLADDER.y + 86 - top).toFixed(1));

        // 진하기: 물을 적게 마시고 호르몬이 많으면 진하다
        var dark = 1 - rate;
        bladderFill.setAttribute('fill', dark > 0.6 ? '#b45309' : (dark > 0.35 ? '#d97706' : '#fde047'));

        // 요도로 나가는 줄기
        if (voiding > 0) {
            urethraFlow.setAttribute('d', 'M' + BLADDER.x + ' ' + (BLADDER.y + 86) + ' L' + BLADDER.x + ' ' + (BLADDER.y + 150));
            urethraFlow.setAttribute('opacity', 0.95);
        } else {
            urethraFlow.setAttribute('opacity', 0);
        }

        rateText.textContent = '만들어지는 양 ' + Math.round(rate * 100) + '% · 방광에 ' +
            Math.round(bladderLevel * 100) + '% (' + Math.round(bladderLevel * 400) + ' mL)' +
            (bladderLevel > 0.85 ? ' — 가득 찼습니다. [배뇨하기]를 눌러 보세요' : '');
        rateText.setAttribute('fill', bladderLevel > 0.85 ? '#fca5a5' : '#fde68a');

        colorText.textContent = dark > 0.6 ? '진한 오줌' : (dark > 0.35 ? '보통' : '묽은 오줌');
        colorText.setAttribute('opacity', bladderLevel > 0.12 ? 1 : 0);
    }

    function bez(p0, p1, p2, p3, t) {
        var u = 1 - t;
        return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    }

    /* ── 도우미 ───────────────────────────────────────────── */

    function tag(x, y, str, color) {
        var g = el('g');
        g.appendChild(el('rect', { x: x - 48, y: y - 14, width: 96, height: 26, rx: 8, fill: 'rgba(6,10,24,0.86)', stroke: color, 'stroke-width': 1.4 }));
        g.appendChild(text(x, y + 5, str, 13, '#f8fafc', 800));
        return g;
    }

    function el(tagName, attrs) {
        var n = document.createElementNS(SVG_NS, tagName);
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
