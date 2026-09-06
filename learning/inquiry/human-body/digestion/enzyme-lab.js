/**
 * 영양소 검출 실험 & 효소 활성 화면
 *
 * 옆 사이드바의 [가상 실험실] 조작(온도·pH·효소·시약·가열)을 그대로 읽어서
 * 시험관 네 개의 색을 실제로 바꾸고, 효소가 어느 pH·온도에서 잘 일하는지 곡선으로 보여 준다.
 *
 * app.js 는 건드리지 않는다. 이 파일과 styles.css, index.html 의 단추 한 줄만 쓴다.
 */

(function () {
    'use strict';

    // 시험관 넷. 시험에 나오는 네 가지 영양소를 한 줄에 세워 둔다.
    var TUBES = [
        { key: 'starch', name: '녹말물', base: '#f1f5f9' },
        { key: 'glucose', name: '포도당물', base: '#f1f5f9' },
        { key: 'protein', name: '단백질물', base: '#f8fafc' },
        { key: 'fat', name: '식용유', base: '#fef9c3' }
    ];

    // 시약별로 어떤 영양소를 찾아내고 무슨 색이 되는지
    var REAGENTS = {
        iodine: {
            name: '아이오딘-아이오딘화 칼륨 용액',
            target: 'starch',
            hitColor: '#1e3a8a', hitName: '청람색',
            missColor: '#b45309', missName: '갈색',
            needHeat: false
        },
        benedict: {
            name: '베네딕트 용액',
            target: 'glucose',
            hitColor: '#dc2626', hitName: '황적색',
            missColor: '#2563eb', missName: '푸른색',
            needHeat: true,
            coldColor: '#2563eb', coldName: '가열 안 함'
        },
        biuret: {
            name: '뷰렛 용액 (5% 수산화 나트륨 + 1% 황산 구리)',
            target: 'protein',
            hitColor: '#7e22ce', hitName: '보라색',
            missColor: '#93c5fd', missName: '연푸른색',
            needHeat: false
        },
        sudan: {
            name: '수단 Ⅲ 용액',
            target: 'fat',
            hitColor: '#e11d48', hitName: '선홍색',
            missColor: '#fdba74', missName: '옅은 주황색',
            needHeat: false
        }
    };

    // 효소마다 잘 일하는 자리 (교과서 값)
    var ENZYMES = {
        amylase: { name: '아밀레이스 (침·이자액)', optPh: 7, where: '입 · 소장', from: '녹말', to: '엿당' },
        pepsin: { name: '펩신 (위액)', optPh: 2, where: '위', from: '단백질', to: '펩톤' },
        trypsin: { name: '트립신 (이자액)', optPh: 8, where: '소장', from: '펩톤', to: '폴리펩타이드' },
        lipase: { name: '라이페이스 (이자액)', optPh: 8, where: '소장', from: '지방', to: '지방산 + 모노글리세리드' }
    };

    var SVG_NS = 'http://www.w3.org/2000/svg';

    var wrap, layer, svg, liquids = {}, tubeNotes = {}, curvePath, marker, headline, summary;

    function init() {
        wrap = document.querySelector('.cinematic-viewport');
        if (!wrap) return;

        addSceneButton();
        buildLayer();
        watchControls();
        render();
    }

    function addSceneButton() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar || bar.querySelector('[data-scene="lab"]')) return;
        var b = document.createElement('button');
        b.className = 'scene-btn';
        b.dataset.scene = 'lab';
        b.textContent = '🧪 5. 영양소 검출 실험';
        bar.appendChild(b);

        bar.querySelectorAll('.scene-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var on = btn.dataset.scene === 'lab';
                // 다른 장면 단추는 app.js 가 알아서 처리한다. 우리는 보이고 감추기만.
                bar.querySelectorAll('.scene-btn').forEach(function (x) {
                    x.classList.toggle('active', x === btn);
                });
                setVisible(on);
                if (on) openLabTab();
            });
        });
    }

    function openLabTab() {
        var t = document.querySelector('.sidebar-tab-btn[data-tab="lab"]');
        if (t && !t.classList.contains('active')) t.click();
    }

    function setVisible(on) {
        layer.hidden = !on;
        var canvas = document.getElementById('simulationCanvas');
        if (canvas) canvas.style.visibility = on ? 'hidden' : 'visible';
        if (on) render();
        toggleHud(on);
    }

    /** 떠 있는 안내 띠는 우리 장면의 표와 그림을 덮으므로 감춘다 */
    function toggleHud(hide) {
        if (!wrap) return;
        var hud = wrap.querySelector('.sim-hud-overlay');
        if (hud) hud.style.display = hide ? 'none' : '';
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'enzyme-lab-layer';
        layer.hidden = true;
        layer.innerHTML =
            '<div class="enzyme-lab-head"><span id="labHeadline">시약을 고르면 네 시험관의 색이 함께 바뀝니다.</span></div>' +
            '<div class="enzyme-lab-body"></div>';
        wrap.appendChild(layer);

        svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('viewBox', '0 0 1000 520');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        layer.querySelector('.enzyme-lab-body').appendChild(svg);

        drawRack();
        drawCurvePanel();
    }

    function drawRack() {
        var g = el('g');
        svg.appendChild(g);

        TUBES.forEach(function (t, i) {
            var x = 70 + i * 130;

            // 시험관 유리
            g.appendChild(el('rect', {
                x: x, y: 90, width: 68, height: 250, rx: 30,
                fill: 'rgba(226,232,240,0.10)', stroke: '#cbd5e1', 'stroke-width': 2.5
            }));

            // 속 액체
            var liquid = el('rect', {
                x: x + 5, y: 190, width: 58, height: 145, rx: 26,
                fill: t.base, opacity: 0.92
            });
            g.appendChild(liquid);
            liquids[t.key] = liquid;

            // 이름
            g.appendChild(text(x + 34, 70, t.name, 15, '#f8fafc', 700));

            // 결과 쪽지
            var note = text(x + 34, 372, '—', 13, '#94a3b8', 700);
            g.appendChild(note);
            tubeNotes[t.key] = note;
        });

        // 시험관 꽂이
        g.appendChild(el('rect', {
            x: 40, y: 344, width: 520, height: 22, rx: 8,
            fill: '#334155', stroke: '#64748b', 'stroke-width': 2
        }));
    }

    function drawCurvePanel() {
        var g = el('g', { transform: 'translate(620, 60)' });
        svg.appendChild(g);

        g.appendChild(text(0, 0, '효소가 잘 일하는 자리', 16, '#f8fafc', 800, 'start'));

        // 축
        g.appendChild(el('line', { x1: 0, y1: 210, x2: 320, y2: 210, stroke: '#64748b', 'stroke-width': 2 }));
        g.appendChild(el('line', { x1: 0, y1: 30, x2: 0, y2: 210, stroke: '#64748b', 'stroke-width': 2 }));
        g.appendChild(text(160, 244, 'pH (산성 ➔ 염기성)', 13, '#94a3b8', 700));
        for (var p = 1; p <= 13; p += 3) {
            var x = ((p - 1) / 13) * 320;
            g.appendChild(el('line', { x1: x, y1: 210, x2: x, y2: 216, stroke: '#64748b', 'stroke-width': 2 }));
            g.appendChild(text(x, 232, String(p), 12, '#94a3b8', 700));
        }
        g.appendChild(text(-8, 34, '활', 12, '#94a3b8', 700, 'end'));
        g.appendChild(text(-8, 50, '성', 12, '#94a3b8', 700, 'end'));

        curvePath = el('path', { fill: 'none', stroke: '#fbbf24', 'stroke-width': 3 });
        g.appendChild(curvePath);

        marker = el('circle', { r: 8, fill: '#f43f5e', stroke: '#ffffff', 'stroke-width': 2.5 });
        g.appendChild(marker);

        headline = text(0, 288, '', 14, '#fbbf24', 800, 'start');
        g.appendChild(headline);
        summary = text(0, 312, '', 13, '#cbd5e1', 600, 'start');
        g.appendChild(summary);
    }

    /* ── 현재 조작 상태 읽기 (app.js 를 건드리지 않으려고 화면에서 직접 읽는다) ── */

    function current() {
        var reagentBtn = document.querySelector('[data-reagent].active');
        var enzymeBtn = document.querySelector('[data-enzyme].active');
        var heatBtn = document.getElementById('heatBtn');
        var ph = parseFloat((document.getElementById('phSlider') || {}).value);
        var temp = parseFloat((document.getElementById('tempSlider') || {}).value);
        return {
            reagent: reagentBtn ? reagentBtn.dataset.reagent : null,
            enzyme: enzymeBtn ? enzymeBtn.dataset.enzyme : 'amylase',
            heating: !!(heatBtn && heatBtn.classList.contains('active')),
            ph: isNaN(ph) ? 7 : ph,
            temp: isNaN(temp) ? 37 : temp
        };
    }

    function watchControls() {
        ['[data-reagent]', '[data-enzyme]', '#heatBtn'].forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (b) {
                b.addEventListener('click', function () { setTimeout(render, 0); });
            });
        });
        ['phSlider', 'tempSlider'].forEach(function (id) {
            var s = document.getElementById(id);
            if (s) s.addEventListener('input', render);
        });
    }

    /* ── 그리기 ────────────────────────────────────────────── */

    function render() {
        if (!layer || layer.hidden) return;
        var c = current();
        paintTubes(c);
        paintCurve(c);
    }

    function paintTubes(c) {
        var r = c.reagent ? REAGENTS[c.reagent] : null;
        var head = document.getElementById('labHeadline');

        TUBES.forEach(function (t) {
            var liquid = liquids[t.key];
            var note = tubeNotes[t.key];
            if (!r) {
                liquid.setAttribute('fill', t.base);
                note.textContent = '—';
                note.setAttribute('fill', '#94a3b8');
                return;
            }

            var hit = (t.key === r.target);
            if (hit && r.needHeat && !c.heating) {
                liquid.setAttribute('fill', r.coldColor);
                note.textContent = r.coldName;
                note.setAttribute('fill', '#fbbf24');
            } else if (hit) {
                liquid.setAttribute('fill', r.hitColor);
                note.textContent = r.hitName + ' ✔';
                note.setAttribute('fill', '#f8fafc');
            } else {
                liquid.setAttribute('fill', r.missColor);
                note.textContent = r.missName;
                note.setAttribute('fill', '#94a3b8');
            }
        });

        if (!head) return;
        if (!r) {
            head.textContent = '시약을 고르면 네 시험관의 색이 함께 바뀝니다.';
        } else if (r.needHeat && !c.heating) {
            head.innerHTML = r.name + ' 을 넣었습니다. <strong style="color:#fbbf24">베네딕트 반응은 가열해야 색이 나옵니다.</strong> [베네딕트 가열]을 눌러 보세요.';
        } else {
            var t = TUBES.filter(function (x) { return x.key === r.target; })[0];
            head.innerHTML = r.name + ' ➔ <strong style="color:#f8fafc">' + t.name +
                '</strong> 만 <strong style="color:' + r.hitColor + '; text-shadow:0 0 6px ' + r.hitColor + '">' +
                r.hitName + '</strong> 으로 변했습니다.';
        }
    }

    /** 효소 활성: 잘 맞는 pH 에서 가장 높고, 60℃ 를 넘으면 단백질이 굳어 0 이 된다 */
    function activity(enzymeKey, ph, temp) {
        var opt = ENZYMES[enzymeKey].optPh;
        var byPh = Math.exp(-Math.pow(ph - opt, 2) / (2 * 1.3 * 1.3));
        var byTemp;
        if (temp >= 60) byTemp = 0;                       // 열에 굳으면 되돌아오지 않는다
        else byTemp = Math.exp(-Math.pow(temp - 37, 2) / (2 * 12 * 12));
        return byPh * byTemp;
    }

    function paintCurve(c) {
        var e = ENZYMES[c.enzyme];
        var d = '';
        for (var p = 1; p <= 14; p += 0.25) {
            var x = ((p - 1) / 13) * 320;
            var y = 210 - activity(c.enzyme, p, c.temp) * 175;
            d += (d ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        curvePath.setAttribute('d', d);

        var mx = ((c.ph - 1) / 13) * 320;
        var act = activity(c.enzyme, c.ph, c.temp);
        marker.setAttribute('cx', mx.toFixed(1));
        marker.setAttribute('cy', (210 - act * 175).toFixed(1));

        headline.textContent = e.name + ' · 알맞은 산성도 pH ' + e.optPh;
        var pct = Math.round(act * 100);
        var msg;
        if (c.temp >= 60) msg = '지금 ' + c.temp + '℃ — 열에 굳어 일하지 못합니다 (활성 0%)';
        else msg = '지금 pH ' + c.ph + ' · ' + c.temp + '℃ — 활성 ' + pct + '% · ' + e.from + ' ➔ ' + e.to;
        summary.textContent = msg;
        summary.setAttribute('fill', pct > 60 ? '#86efac' : (pct > 25 ? '#fbbf24' : '#fca5a5'));

        var stat = document.getElementById('statEnzymeActivity');
        if (stat) stat.textContent = pct + ' %';
    }

    /* ── 작은 도우미 ───────────────────────────────────────── */

    function el(tag, attrs) {
        var n = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
        return n;
    }

    function text(x, y, str, size, fill, weight, anchor) {
        var n = el('text', {
            x: x, y: y, fill: fill, 'font-size': size,
            'font-weight': weight || 700,
            'font-family': 'Pretendard, sans-serif',
            'text-anchor': anchor || 'middle'
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
