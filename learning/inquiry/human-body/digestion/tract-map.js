/**
 * 전신 소화관 (소화계 1번 장면)
 *
 * 예전 1번은 어두운 남색 SF 사진이었다. 몸이 오른쪽으로 치우쳐 왼쪽 절반이
 * 비었고, 기관이 전부 같은 연어색이라 이름표 여덟 개가 어디를 가리키는지
 * 알 수 없었다. 이자는 아예 가려져서 설명글에 「그림에서는 가려져 있습니다」
 * 라고 적어 두어야 했다.
 *
 * 글자 없는 평면 도식(../assets/images/digestive-tract.svg)을 얹는다.
 * 간·위·쓸개·이자·소장·대장이 저마다 다른 색이고, 이자도 보인다.
 *
 * 시험에 나오는 대목:
 *   소화 효소가 없는 곳 — 식도, 대장 (그리고 간은 효소가 아니라 쓸개즙)
 *   쓸개즙은 간이 만들고 쓸개가 모아 둔다
 *   이자는 세 영양소를 모두 맡는 유일한 곳
 *   쓸개즙과 이자액은 소장 앞쪽(십이지장)으로 들어간다
 *   흡수한 것은 간문맥을 지나 먼저 간으로 간다
 */

(function () {
    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var SVG_URL = '../assets/images/digestive-tract.svg';
    var KEY = 'torso';

    function isPaused() {
        return typeof SimEngine !== 'undefined' && SimEngine.isPaused ? SimEngine.isPaused() : false;
    }

    // 이름표와 설명. 예전에는 app.js 의 hotspots.torso 에 있었는데,
    // 이 장면을 통째로 맡게 되었으므로 여기로 옮겼다. 한 군데에만 둔다.
    var PARTS = [
        {
            id: 'esophagus', text: '식도', ax: 120, ay: 150,
            enzyme: '소화 효소 없음', ph: '중성', product: '음식물을 위로 보냄',
            desc: '소화 효소가 <strong>나오지 않습니다</strong>. 근육이 <strong>꿈틀 운동</strong>으로 음식물을 위까지 밀어 보냅니다. 그래서 누워서 먹어도 내려갑니다.'
        },
        {
            id: 'stomach', text: '위', ax: 600, ay: 264,
            enzyme: '위액 (펩신 + 염산)', ph: 'pH 2.0 (강한 산성)', product: '단백질 ➔ 펩톤',
            desc: '염산이 강한 산성을 만들고 그 속에서 <strong>펩신이 단백질을 잘게 자릅니다</strong>. 염산은 세균도 죽입니다.'
        },
        {
            id: 'liver', text: '간', ax: 108, ay: 262,
            enzyme: '쓸개즙을 만듦 (효소는 없음)', ph: '약염기성', product: '지방을 잘게 흩음',
            desc: '<strong>소화 효소는 만들지 않습니다.</strong> 쓸개즙을 만들어 지방 덩어리를 잘게 흩어 놓아 라이페이스가 일하기 쉽게 합니다. 흡수한 영양소도 간문맥을 지나 <strong>먼저 이곳으로</strong> 옵니다.'
        },
        {
            id: 'gallbladder', text: '쓸개', ax: 108, ay: 352,
            enzyme: '쓸개즙 저장', ph: '약염기성', product: '십이지장으로 내보냄',
            desc: '간이 만든 쓸개즙을 <strong>모아 두었다가</strong> 음식이 오면 소장 앞쪽(십이지장)으로 내보냅니다. <strong>스스로 만들지는 않습니다.</strong>'
        },
        {
            id: 'pancreas', text: '이자', ax: 600, ay: 376,
            enzyme: '이자액 (아밀레이스 · 트립신 · 라이페이스)', ph: 'pH 8.0 (약염기성)', product: '세 영양소를 모두 분해',
            desc: '<strong>세 가지 효소를 모두 내는 유일한 곳</strong>입니다. 녹말·단백질·지방을 한꺼번에 맡습니다. 이자액은 쓸개즙과 함께 <strong>소장 앞쪽(십이지장)</strong>으로 들어가 위에서 온 산성 음식물을 중화합니다.'
        },
        {
            id: 'duodenum', text: '십이지장', ax: 108, ay: 440,
            enzyme: '쓸개즙 + 이자액이 들어오는 곳', ph: 'pH 8.0', product: '산성 음식물을 중화',
            desc: '위에서 내려온 산성 음식물이 <strong>쓸개즙과 이자액을 만나 중화되는</strong> 소장의 첫 토막입니다. 두 관이 여기로 들어옵니다.'
        },
        {
            id: 'smallIntestine', text: '소장', ax: 600, ay: 540,
            enzyme: '장액 + 이자액', ph: 'pH 8.0', product: '마지막 분해와 흡수',
            desc: '영양소가 <strong>마지막으로 분해되고 융털로 흡수되는</strong> 곳입니다. 안쪽에 주름과 융털이 있어 닿는 넓이가 넓습니다.'
        },
        {
            id: 'largeIntestine', text: '대장', ax: 108, ay: 610,
            enzyme: '소화 효소 없음', ph: '중성', product: '물을 흡수',
            desc: '<strong>소화 효소가 없습니다.</strong> 남은 찌꺼기에서 물을 빨아들여 똥을 만듭니다.'
        },
        {
            id: 'anus', text: '항문', ax: 560, ay: 790,
            enzyme: '없음', ph: '—', product: '몸 밖으로 내보냄',
            desc: '대장에서 만들어진 찌꺼기를 몸 밖으로 내보냅니다. 소화되지 않은 것이 지나온 길의 끝입니다.'
        }
    ];

    // 음식이 지나는 길. 그림 눈금(0~700, 0~900) 그대로.
    var ROUTE = [
        { x: 350, y: 80 },   // 입
        { x: 350, y: 240 },  // 식도
        { x: 398, y: 296 },  // 위
        { x: 323, y: 400 },  // 십이지장
        { x: 343, y: 560 },  // 소장
        { x: 353, y: 640 },  // 대장
        { x: 369, y: 740 },  // 곧창자
        { x: 350, y: 782 }   // 항문
    ];

    var wrap, layer, svg, labelBox, leaderGroup, bolus;
    var swallowing = false, progress = 1;
    var lastT = 0;

    function init() {
        wrap = document.querySelector('.cinematic-viewport');
        if (!wrap) return;
        buildLayer();
        bindSwallow();
        requestAnimationFrame(loop);
    }

    function bindSwallow() {
        var b = document.getElementById('swallowBtn');
        if (!b) return;
        b.addEventListener('click', function () {
            swallowing = true;
            progress = 0;
        });
    }

    function setVisible(on) {
        if (!layer) return;
        layer.hidden = !on;
        var canvas = document.getElementById('simulationCanvas');
        if (canvas && on) canvas.style.visibility = 'hidden';
        else if (canvas && !otherLayerShowing()) canvas.style.visibility = 'visible';
        if (on) placeLabels();
    }

    function otherLayerShowing() {
        return !!document.querySelector(
            '.enzyme-layer:not([hidden]), .stomach-layer:not([hidden]),' +
            ' .villus-layer:not([hidden]), .tract-layer:not([hidden])');
    }

    function buildLayer() {
        layer = document.createElement('div');
        layer.className = 'tract-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        fetch(SVG_URL)
            .then(function (r) { return r.text(); })
            .then(function (markup) {
                // 같은 쪽에 다른 도식이 얹힐 때 그라데이션 이름이 겹치지 않게 한다
                if (typeof SimEngine !== 'undefined' && SimEngine.isolateSvgIds) {
                    markup = SimEngine.isolateSvgIds(markup, 'tractfig');
                }
                layer.innerHTML = '<div class="tract-stage">' + markup + '<div class="tract-labels"></div></div>';
                svg = layer.querySelector('svg');
                labelBox = layer.querySelector('.tract-labels');
                if (!svg) return;

                svg.removeAttribute('width');
                svg.removeAttribute('height');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                leaderGroup = document.createElementNS(SVG_NS, 'g');
                svg.appendChild(leaderGroup);

                bolus = document.createElementNS(SVG_NS, 'circle');
                bolus.setAttribute('r', 13);
                bolus.setAttribute('fill', '#f59e0b');
                bolus.setAttribute('stroke', '#78350f');
                bolus.setAttribute('stroke-width', 2);
                bolus.setAttribute('opacity', 0);
                svg.appendChild(bolus);

                PARTS.forEach(function (item) {
                    var e = svg.querySelector('#' + item.id);
                    if (!e) return;
                    e.style.cursor = 'pointer';
                    e.addEventListener('click', function () { show(item); });
                });

                placeLabels();
                window.addEventListener('resize', placeLabels);
            })
            .catch(function () {
                layer.innerHTML = '<div class="tract-error">소화관 그림을 불러오지 못했습니다.</div>';
            });
    }

    function show(item) {
        // 누른 조각에 노란 테를 두른다
        if (typeof SimEngine !== 'undefined' && SimEngine.litPart) {
            SimEngine.litPart(svg, PARTS.map(function (x) { return x.id; }), item.id);
        }
        var set = function (id, v, html) {
            var e = document.getElementById(id);
            if (!e) return;
            if (html) e.innerHTML = v; else e.textContent = v;
        };
        set('organTitle', item.text);
        set('organEnzyme', item.enzyme);
        set('organPH', item.ph);
        set('organProduct', item.product);
        set('organDesc', item.desc, true);
        var card = document.getElementById('organFocusCard');
        if (card) card.style.display = 'block';
        if (labelBox) {
            labelBox.querySelectorAll('.tract-tag').forEach(function (t) {
                t.classList.toggle('on', t.dataset.for === item.id);
            });
        }
        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
    }

    function placeLabels() {
        if (!svg || !labelBox || layer.hidden) return;
        var box = svg.getBoundingClientRect();
        if (!box.width) return;
        var vb = svg.viewBox.baseVal;
        var k = Math.min(box.width / vb.width, box.height / vb.height);
        var offX = (box.width - vb.width * k) / 2;
        var offY = (box.height - vb.height * k) / 2;

        labelBox.innerHTML = '';
        while (leaderGroup && leaderGroup.firstChild) leaderGroup.removeChild(leaderGroup.firstChild);

        PARTS.forEach(function (item) {
            var e = svg.querySelector('#' + item.id);
            if (!e) return;
            var b;
            try { b = e.getBBox(); } catch (err) { return; }
            if (!b.width && !b.height) return;

            var cx = b.x + b.width / 2, cy = b.y + b.height / 2;
            var line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', cx); line.setAttribute('y1', cy);
            line.setAttribute('x2', item.ax); line.setAttribute('y2', item.ay);
            line.setAttribute('stroke', 'rgba(148, 163, 184, 0.6)');
            line.setAttribute('stroke-width', 1.6);
            leaderGroup.appendChild(line);

            var tag = document.createElement('span');
            tag.className = 'tract-tag';
            tag.dataset.for = item.id;
            tag.textContent = item.text;
            tag.style.left = (offX + item.ax * k) + 'px';
            tag.style.top = (offY + item.ay * k) + 'px';
            tag.addEventListener('click', function () { show(item); });
            labelBox.appendChild(tag);
        });
    }

    function loop(t) {
        var dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
        lastT = t;

        if (wrap && layer) {
            var act = wrap.querySelector('.scene-btn.active');
            var mine = !!(act && act.dataset.scene === KEY);
            if (layer.hidden === mine) setVisible(mine);
        }

        if (layer && !layer.hidden && bolus) {
            if (swallowing && !isPaused()) {
                progress += dt * 0.22;
                if (progress >= 1) { progress = 1; swallowing = false; }
            }
            if (progress < 1) {
                var seg = progress * (ROUTE.length - 1);
                var i = Math.floor(seg), f = seg - i;
                var p1 = ROUTE[i] || ROUTE[0];
                var p2 = ROUTE[Math.min(i + 1, ROUTE.length - 1)];
                bolus.setAttribute('cx', (p1.x + (p2.x - p1.x) * f).toFixed(1));
                bolus.setAttribute('cy', (p1.y + (p2.y - p1.y) * f).toFixed(1));
                bolus.setAttribute('opacity', 1);
            } else {
                bolus.setAttribute('opacity', 0);
            }
        }
        requestAnimationFrame(loop);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
