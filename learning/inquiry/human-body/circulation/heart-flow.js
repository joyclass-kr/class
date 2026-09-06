/**
 * 심장 순환 도식 엔진
 *
 * 그림(../assets/images/heart-diagram.svg)을 그대로 화면에 넣고,
 * 그림 속 이름(id)만 찾아서 피를 흘리고 방을 뛰게 하고 판막을 여닫는다.
 *
 * 그림을 더 예쁘게 다시 그려도 다음 두 가지만 지키면 이 파일은 고칠 필요가 없다.
 *   - 요소의 id 를 그대로 둘 것
 *   - 피가 흐르는 길 #flowPulmonary, #flowSystemic 을 새 모양에 맞게 다시 그어 줄 것
 */

(function () {
    'use strict';

    var SVG_URL = '../assets/images/heart-diagram.svg';

    // 방·혈관에 흐르는 피의 종류. 시험에서 제일 자주 묻는 대목이다.
    var VENOUS = '#0284c7';   // 정맥혈 (산소 적음)
    var ARTERIAL = '#e11d48'; // 동맥혈 (산소 많음)

    var BLOOD_KIND = {
        rightAtrium: 'venous',
        rightVentricle: 'venous',
        vesselVenaCava: 'venous',
        vesselPulmonaryArtery: 'venous',   // 이름은 동맥인데 정맥혈이 흐른다
        leftAtrium: 'arterial',
        leftVentricle: 'arterial',
        vesselPulmonaryVein: 'arterial',   // 이름은 정맥인데 동맥혈이 흐른다
        vesselAorta: 'arterial'
    };

    // fx, fy 는 그 조각의 네모 안에서 이름표가 붙을 자리 (0 = 왼쪽·위, 1 = 오른쪽·아래)
    var LABELS = [
        { id: 'rightAtrium', text: '우심방', fx: 0.5, fy: 0.78 },
        { id: 'rightVentricle', text: '우심실', fx: 0.45, fy: 0.5 },
        { id: 'leftAtrium', text: '좌심방', fx: 0.5, fy: 0.78 },
        { id: 'leftVentricle', text: '좌심실', fx: 0.55, fy: 0.5 },
        { id: 'septum', text: '심실 사이막', fx: 0.5, fy: 0.92 },
        { id: 'valveTricuspid', text: '삼첨판', fx: 0.5, fy: 1.6 },
        { id: 'valveMitral', text: '이첨판', fx: 0.5, fy: 1.6 },
        { id: 'valvePulmonary', text: '폐동맥판', fx: 0.5, fy: -1.2 },
        { id: 'valveAortic', text: '대동맥판', fx: 0.5, fy: -1.2 },
        { id: 'vesselVenaCava', text: '대정맥', fx: 0.12, fy: 0.5 },
        { id: 'vesselPulmonaryArtery', text: '폐동맥', fx: 0.14, fy: 0.30 },
        { id: 'vesselPulmonaryVein', text: '폐정맥', fx: 0.86, fy: 0.30 },
        { id: 'vesselAorta', text: '대동맥', fx: 0.92, fy: 0.45 },
        { id: 'lungs', text: '폐 (허파)', fx: 0.09, fy: 0.22 },
        { id: 'bodyCapillaries', text: '온몸 (모세혈관)', fx: 0.5, fy: 0.5 }
    ];

    var DETAIL = {
        rightAtrium: ['우심방', '온몸을 돌고 온 <strong>정맥혈</strong>이 대정맥을 타고 들어오는 방입니다. 받은 피를 아래 우심실로 내려보냅니다.'],
        rightVentricle: ['우심실', '정맥혈을 <strong>폐동맥</strong>으로 밀어내 폐로 보냅니다. 폐까지만 보내면 되므로 벽이 좌심실보다 얇습니다.'],
        leftAtrium: ['좌심방', '폐에서 산소를 채우고 온 <strong>동맥혈</strong>이 폐정맥을 타고 들어옵니다.'],
        leftVentricle: ['좌심실', '동맥혈을 대동맥으로 밀어 <strong>온몸</strong>까지 보냅니다. 가장 멀리 보내야 해서 <strong>벽이 가장 두껍습니다</strong>.'],
        septum: ['심실 사이막', '좌우 심실을 갈라 놓아 <strong>정맥혈과 동맥혈이 섞이지 않게</strong> 합니다.'],
        valveTricuspid: ['삼첨판 (우심방 ↔ 우심실)', '피가 우심방에서 우심실로만 흐르게 하고 <strong>거꾸로 올라가지 못하게</strong> 막습니다.'],
        valveMitral: ['이첨판 (좌심방 ↔ 좌심실)', '피가 좌심방에서 좌심실로만 흐르게 합니다. 판막은 모두 <strong>한쪽으로만</strong> 열립니다.'],
        valvePulmonary: ['폐동맥판', '우심실에서 폐동맥으로 나간 피가 심실로 되돌아오지 못하게 막습니다.'],
        valveAortic: ['대동맥판', '좌심실에서 대동맥으로 나간 피가 되돌아오지 못하게 막습니다.'],
        vesselVenaCava: ['대정맥', '온몸을 돌고 온 <strong>정맥혈</strong>을 우심방으로 데려옵니다.'],
        vesselPulmonaryArtery: ['폐동맥', '이름은 <strong>동맥</strong>이지만 산소가 적은 <strong>정맥혈</strong>이 흐릅니다. 심장에서 나가는 혈관이라 동맥입니다.'],
        vesselPulmonaryVein: ['폐정맥', '이름은 <strong>정맥</strong>이지만 산소가 많은 <strong>동맥혈</strong>이 흐릅니다. 심장으로 들어오는 혈관이라 정맥입니다.'],
        vesselAorta: ['대동맥', '좌심실이 뿜어낸 <strong>동맥혈</strong>을 온몸으로 보냅니다. 몸에서 가장 굵고 압력이 높은 혈관입니다.'],
        lungs: ['폐 (허파)', '정맥혈이 여기서 이산화 탄소를 내놓고 산소를 받아 <strong>동맥혈로 바뀝니다</strong>.'],
        bodyCapillaries: ['온몸 모세혈관', '동맥혈이 여기서 산소와 영양소를 조직에 주고 이산화 탄소를 받아 <strong>정맥혈로 바뀝니다</strong>.']
    };

    var DOT_COUNT = 14;

    var layer, svg, wrap, labelBox;
    var pathPul, pathSys, lenPul, lenSys;
    var dots = [];
    var phase = 0;
    var mode = 'all';       // all | pulmonary | systemic
    var running = true;
    var loaded = false;
    var lastTs = 0;

    function bpm() {
        var el = document.getElementById('bpmSlider') || document.getElementById('heartRateSlider');
        var v = el ? parseInt(el.value, 10) : 75;
        return isNaN(v) ? 75 : v;
    }

    function init() {
        wrap = document.querySelector('.circulation-viewport');
        if (!wrap) return;

        layer = document.createElement('div');
        layer.className = 'heart-flow-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        bindSceneButtons();
        fetchDiagram();
        requestAnimationFrame(loop);
    }

    function bindSceneButtons() {
        var btns = wrap.querySelectorAll('.scene-btn');
        btns.forEach(function (b) {
            b.addEventListener('click', function () {
                setVisible(b.dataset.scene === 'heart');
            });
        });
        var active = wrap.querySelector('.scene-btn.active');
        if (active && active.dataset.scene === 'heart') setVisible(true);
    }

    function setVisible(on) {
        if (!layer) return;
        layer.hidden = !on;
        var canvas = document.getElementById('circulationCanvas');
        if (canvas) canvas.style.visibility = on ? 'hidden' : 'visible';
        if (on) placeLabels();
    }

    function fetchDiagram() {
        fetch(SVG_URL)
            .then(function (r) { return r.text(); })
            .then(function (markup) {
                layer.innerHTML =
                    '<div class="heart-flow-stage">' + markup +
                    '<div class="heart-flow-labels"></div></div>' +
                    modeBarMarkup() + legendMarkup();
                svg = layer.querySelector('svg');
                labelBox = layer.querySelector('.heart-flow-labels');
                if (!svg) return;
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                setupDiagram();
                loaded = true;
            })
            .catch(function () {
                layer.innerHTML = '<div class="heart-flow-error">심장 그림을 불러오지 못했습니다.</div>';
            });
    }

    function modeBarMarkup() {
        return '<div class="heart-flow-modes">' +
            '<button type="button" data-mode="all" class="on">전체 순환</button>' +
            '<button type="button" data-mode="pulmonary">폐순환만</button>' +
            '<button type="button" data-mode="systemic">체순환만</button>' +
            '</div>';
    }

    function legendMarkup() {
        return '<div class="heart-flow-legend">' +
            '<span><i style="background:' + VENOUS + '"></i>정맥혈 (산소 적음)</span>' +
            '<span><i style="background:' + ARTERIAL + '"></i>동맥혈 (산소 많음)</span>' +
            '</div>';
    }

    function setupDiagram() {
        pathPul = svg.querySelector('#flowPulmonary');
        pathSys = svg.querySelector('#flowSystemic');
        if (!pathPul || !pathSys) return;

        lenPul = pathPul.getTotalLength();
        lenSys = pathSys.getTotalLength();

        // 방과 혈관을 피의 종류에 맞게 칠한다
        Object.keys(BLOOD_KIND).forEach(function (id) {
            var el = svg.querySelector('#' + id);
            if (el) el.setAttribute('fill', BLOOD_KIND[id] === 'venous' ? VENOUS : ARTERIAL);
        });

        // 피 알갱이
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', 'bloodDots');
        svg.appendChild(g);
        dots = [];
        for (var i = 0; i < DOT_COUNT; i++) {
            dots.push(makeDot(g, 'pulmonary', i / DOT_COUNT));
            dots.push(makeDot(g, 'systemic', i / DOT_COUNT));
        }

        layer.querySelectorAll('.heart-flow-modes button').forEach(function (b) {
            b.addEventListener('click', function () {
                mode = b.dataset.mode;
                layer.querySelectorAll('.heart-flow-modes button').forEach(function (x) {
                    x.classList.toggle('on', x === b);
                });
            });
        });

        bindPartClicks();
        placeLabels();
        window.addEventListener('resize', placeLabels);
    }

    function makeDot(parent, circuit, offset) {
        var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('r', 7);
        parent.appendChild(c);
        return { el: c, circuit: circuit, t: offset };
    }

    function bindPartClicks() {
        Object.keys(DETAIL).forEach(function (id) {
            var el = svg.querySelector('#' + id);
            if (!el) return;
            el.style.cursor = 'pointer';
            el.addEventListener('click', function () { showDetail(id); });
        });
    }

    function showDetail(id) {
        var d = DETAIL[id];
        if (!d) return;
        var t = document.getElementById('organTitle');
        var p = document.getElementById('organDesc');
        if (t) t.textContent = d[0];
        if (p) p.innerHTML = d[1];
        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();

        svg.querySelectorAll('.part-on').forEach(function (e) { e.classList.remove('part-on'); });
        var el = svg.querySelector('#' + id);
        if (el) el.classList.add('part-on');
    }

    /** 이름표는 그림 속 조각의 자리를 재서 붙인다. 그림이 바뀌어도 따라간다. */
    function placeLabels() {
        if (!svg || !labelBox) return;
        var box = svg.getBoundingClientRect();
        if (!box.width) return;
        var vb = svg.viewBox.baseVal;
        var sx = box.width / vb.width, sy = box.height / vb.height;

        labelBox.innerHTML = '';
        LABELS.forEach(function (item) {
            var el = svg.querySelector('#' + item.id);
            if (!el) return;
            var b;
            try { b = el.getBBox(); } catch (e) { return; }

            var cx = (b.x + b.width * (item.fx === undefined ? 0.5 : item.fx)) * sx;
            var cy = (b.y + b.height * (item.fy === undefined ? 0.5 : item.fy)) * sy;

            var tag = document.createElement('span');
            tag.className = 'heart-flow-tag';
            tag.textContent = item.text;
            tag.style.left = cx + 'px';
            tag.style.top = cy + 'px';
            tag.addEventListener('click', function () { showDetail(item.id); });
            labelBox.appendChild(tag);
        });
    }

    function loop(ts) {
        if (!lastTs) lastTs = ts;
        var dt = Math.min((ts - lastTs) / 1000, 0.1);
        lastTs = ts;

        if (loaded && running && !layer.hidden) {
            step(dt);
        }
        requestAnimationFrame(loop);
    }

    function step(dt) {
        var beat = bpm() / 60;
        phase += dt * beat * Math.PI * 2;

        moveDots(dt, beat);
        pumpChambers();
        flapValves();
    }

    function moveDots(dt, beat) {
        var speed = dt * beat * 0.28;
        dots.forEach(function (d) {
            var show = (mode === 'all') || (mode === d.circuit);
            if (!show) { d.el.setAttribute('opacity', 0); return; }
            d.el.setAttribute('opacity', 1);

            d.t = (d.t + speed) % 1;
            var path = d.circuit === 'pulmonary' ? pathPul : pathSys;
            var len = d.circuit === 'pulmonary' ? lenPul : lenSys;
            var p = path.getPointAtLength(d.t * len);
            d.el.setAttribute('cx', p.x);
            d.el.setAttribute('cy', p.y);

            // 폐를 지나면 정맥혈 ➔ 동맥혈, 온몸을 지나면 동맥혈 ➔ 정맥혈
            var afterOrgan = d.t > 0.5;
            var color = (d.circuit === 'pulmonary')
                ? (afterOrgan ? ARTERIAL : VENOUS)
                : (afterOrgan ? VENOUS : ARTERIAL);
            d.el.setAttribute('fill', color);
        });
    }

    function pumpChambers() {
        var s = Math.sin(phase);
        // 심방이 짤 때 심실은 늘어난다 (한 박자 어긋난다)
        scalePart('rightAtrium', 1 - Math.max(0, s) * 0.05);
        scalePart('leftAtrium', 1 - Math.max(0, s) * 0.05);
        scalePart('rightVentricle', 1 - Math.max(0, -s) * 0.06);
        scalePart('leftVentricle', 1 - Math.max(0, -s) * 0.06);
    }

    function scalePart(id, k) {
        var el = svg.querySelector('#' + id);
        if (!el) return;
        var b;
        try { b = el.getBBox(); } catch (e) { return; }
        var cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        el.setAttribute('transform',
            'translate(' + (cx - cx * k).toFixed(2) + ' ' + (cy - cy * k).toFixed(2) + ') scale(' + k.toFixed(3) + ')');
    }

    function flapValves() {
        var s = Math.sin(phase);
        // 심방이 짤 때 방실판막이 열리고, 심실이 짤 때 동맥판막이 열린다
        setValve('valveTricuspid', s > 0);
        setValve('valveMitral', s > 0);
        setValve('valvePulmonary', s < 0);
        setValve('valveAortic', s < 0);
    }

    function setValve(id, open) {
        var el = svg.querySelector('#' + id);
        if (!el) return;
        el.setAttribute('opacity', open ? 0.35 : 1);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
