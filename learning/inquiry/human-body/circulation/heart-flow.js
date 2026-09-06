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
        { id: 'rightAtrium', text: '우심방', fx: 0.5, fy: 0.65 },
        { id: 'rightVentricle', text: '우심실', fx: 0.45, fy: 0.55 },
        { id: 'leftAtrium', text: '좌심방', fx: 0.5, fy: 0.65 },
        { id: 'leftVentricle', text: '좌심실', fx: 0.55, fy: 0.55 },
        { id: 'septum', text: '심실 사이막', fx: 0.5, fy: 0.88 },
        { id: 'valveTricuspid', text: '삼첨판', fx: 0.5, fy: 0.35 },
        { id: 'valveMitral', text: '이첨판', fx: 0.5, fy: 0.35 },
        { id: 'valvePulmonary', text: '폐동맥판', fx: 0.5, fy: -0.6 },
        { id: 'valveAortic', text: '대동맥판', fx: 0.5, fy: -0.6 },
        { id: 'vesselVenaCava', text: '대정맥', fx: 0.164, fy: 0.45 },
        { id: 'vesselPulmonaryArtery', text: '폐동맥', fx: 0.42, fy: 0.32 },
        { id: 'vesselPulmonaryVein', text: '폐정맥', fx: 0.58, fy: 0.32 },
        { id: 'vesselAorta', text: '대동맥', fx: 0.852, fy: 0.45 },
        { id: 'lungs', text: '폐 (허파)', fx: 0.5, fy: 0.10 },
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

    var DOT_COUNT = 8;

    var layer, svg, wrap, labelBox;
    var pathPul, pathSys, lenPul, lenSys;
    var dots = [];
    var phase = 0;
    var mode = 'all';       // all | pulmonary | systemic
    var running = true;
    var loaded = false;
    var lastTs = 0;

    var currentArterial = ARTERIAL;

    function bpm() {
        var el = document.getElementById('bpmSlider') || document.getElementById('heartRateSlider');
        var v = el ? parseInt(el.value, 10) : 72;
        return isNaN(v) ? 72 : v;
    }

    function getSpO2() {
        var el = document.getElementById('o2Slider');
        var v = el ? parseInt(el.value, 10) : 98;
        return isNaN(v) ? 98 : v;
    }

    function getArterialColor(o2) {
        var ratio = Math.max(0, Math.min(1, (o2 - 70) / 30));
        var r = Math.round(75 + ratio * 160);
        var g = Math.round(35 - ratio * 5);
        var b = Math.round(80 - ratio * 10);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function updateArterialVisuals() {
        var o2 = getSpO2();
        var color = getArterialColor(o2);
        currentArterial = color;

        if (svg) {
            ['leftAtrium', 'leftVentricle', 'vesselPulmonaryVein', 'vesselAorta'].forEach(function (id) {
                var el = svg.querySelector('#' + id);
                if (el) el.setAttribute('fill', color);
            });
            var wall = svg.querySelector('#leftVentricleWall');
            if (wall) {
                wall.setAttribute('stroke', color);
                wall.setAttribute('opacity', (0.4 + 0.35 * Math.max(0, (o2 - 70) / 30)).toFixed(2));
            }
        }

        if (layer) {
            var legendDot = layer.querySelector('.heart-flow-legend-arterial');
            var legendText = layer.querySelector('.heart-flow-legend-arterial-text');
            if (legendDot) legendDot.style.background = color;
            if (legendText) {
                if (o2 >= 95) legendText.textContent = '동맥혈 (산소 풍부 ➔ 선홍색)';
                else if (o2 >= 90) legendText.textContent = '동맥혈 (산소 부족 ➔ 암적색)';
                else legendText.textContent = '동맥혈 (저산소증 ➔ 암자색·청색증)';
            }
        }
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

    function loadDiagramMarkup(markup) {
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
        if (!layer.hidden) placeLabels();
    }

    function fetchDiagram() {
        // file:/// 로 직접 열었을 때는 브라우저 보안 정책(CORS)으로 외부 fetch가 불가능하므로 내장 SVG 즉시 사용
        if (window.location.protocol === 'file:' && typeof EMBEDDED_DIAGRAM !== 'undefined') {
            loadDiagramMarkup(EMBEDDED_DIAGRAM);
            return;
        }

        fetch(SVG_URL)
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            })
            .then(function (markup) {
                loadDiagramMarkup(markup);
            })
            .catch(function () {
                if (typeof EMBEDDED_DIAGRAM !== 'undefined') {
                    loadDiagramMarkup(EMBEDDED_DIAGRAM);
                } else {
                    layer.innerHTML = '<div class="heart-flow-error">심장 그림을 불러오지 못했습니다.</div>';
                }
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
            '<span><i class="heart-flow-legend-arterial" style="background:' + ARTERIAL + '"></i><span class="heart-flow-legend-arterial-text">동맥혈 (산소 풍부)</span></span>' +
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
        c.setAttribute('r', 7.5);
        c.setAttribute('stroke', '#ffffff');
        c.setAttribute('stroke-width', '1.6');
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

        updateArterialVisuals();
        moveDots(dt, beat);
        pumpChambers();
        flapValves();
    }

    function moveDots(dt, beat) {
        var speed = dt * beat * 0.07;
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
                ? (afterOrgan ? currentArterial : VENOUS)
                : (afterOrgan ? VENOUS : currentArterial);
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

    // file:/// 실행 시 브라우저 CORS 차단 대비용 내장 SVG
    var EMBEDDED_DIAGRAM = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\" width=\"100%\" height=\"100%\">\n  <!--\n    심장·폐·온몸 순환 도식 (2022 개정 / 의학 교육용 최고급 벡터 일러스트)\n  -->\n\n  <defs>\n    <!-- 폐 바이오루미네선트 그라데이션 -->\n    <linearGradient id=\"lungGradRightSide\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#0284c7\" stop-opacity=\"0.28\"/>\n      <stop offset=\"40%\" stop-color=\"#1e293b\" stop-opacity=\"0.95\"/>\n      <stop offset=\"100%\" stop-color=\"#0b1329\"/>\n    </linearGradient>\n    <linearGradient id=\"lungGradLeftSide\" x1=\"100%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#e11d48\" stop-opacity=\"0.28\"/>\n      <stop offset=\"40%\" stop-color=\"#1e293b\" stop-opacity=\"0.95\"/>\n      <stop offset=\"100%\" stop-color=\"#0b1329\"/>\n    </linearGradient>\n\n    <!-- 온몸 모세혈관 베드 입체 그라데이션 -->\n    <linearGradient id=\"capillaryBedGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#0284c7\" stop-opacity=\"0.38\"/>\n      <stop offset=\"50%\" stop-color=\"#334155\" stop-opacity=\"0.30\"/>\n      <stop offset=\"100%\" stop-color=\"#e11d48\" stop-opacity=\"0.38\"/>\n    </linearGradient>\n\n    <!-- 심근 및 심실사이막 근육질 그라데이션 -->\n    <linearGradient id=\"myoGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#334155\"/>\n      <stop offset=\"50%\" stop-color=\"#1e293b\"/>\n      <stop offset=\"100%\" stop-color=\"#090d16\"/>\n    </linearGradient>\n    <linearGradient id=\"septumGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#1e293b\"/>\n      <stop offset=\"50%\" stop-color=\"#475569\"/>\n      <stop offset=\"100%\" stop-color=\"#1e293b\"/>\n    </linearGradient>\n\n    <!-- 소프트 발광 필터 -->\n    <filter id=\"softGlow\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n      <feGaussianBlur stdDeviation=\"2\" result=\"blur\"/>\n      <feMerge>\n        <feMergeNode in=\"blur\"/>\n        <feMergeNode in=\"SourceGraphic\"/>\n      </feMerge>\n    </filter>\n\n    <style>\n      .organ-outline { stroke: #64748b; stroke-width: 2.2; stroke-linejoin: round; }\n      .chamber { stroke: #cbd5e1; stroke-width: 2.4; stroke-linejoin: round; }\n      .vessel { stroke: #cbd5e1; stroke-width: 2.5; stroke-linejoin: round; }\n      .valve-leaflet { fill: #f8fafc; stroke: #ffffff; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; filter: url(#softGlow); }\n      .chordae { stroke: #94a3b8; stroke-width: 1.4; stroke-dasharray: 2,3; stroke-linecap: round; opacity: 0.8; }\n      .papillary { fill: #475569; stroke: #64748b; stroke-width: 1.2; }\n      .bronchial { stroke: #38bdf8; stroke-width: 1.8; fill: none; opacity: 0.6; stroke-linecap: round; }\n      .alveoli { fill: #38bdf8; opacity: 0.45; filter: drop-shadow(0 0 4px rgba(56,189,248,0.5)); }\n      .cap-net { fill: none; stroke-linecap: round; }\n      .tissue-cell { fill: #1e293b; stroke: #475569; stroke-width: 1.4; }\n      .cell-nucleus { fill: #60a5fa; opacity: 0.65; }\n    </style>\n  </defs>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 1. 배경 흉강 및 척추 해부학 가이드                              -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <g id=\"thoracicContext\" opacity=\"0.25\">\n    <path d=\"M120 180 C120 35 880 35 880 180 C880 460 820 625 500 680 C180 625 120 460 120 180 Z\"\n          fill=\"none\" stroke=\"#334155\" stroke-width=\"1.5\" stroke-dasharray=\"6,6\"/>\n    <line x1=\"500\" y1=\"35\" x2=\"500\" y2=\"675\" stroke=\"#1e293b\" stroke-width=\"2\" stroke-dasharray=\"4,8\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 2. 폐 (Lungs, 위쪽 - 양측성 및 발광 폐포망)                     -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <g id=\"lungs\">\n    <!-- 우폐 (환자 우폐 - 3엽 구조) BBox: x: 196..344, y: 36..180 -->\n    <path class=\"organ-outline\" fill=\"url(#lungGradRightSide)\"\n          d=\"M295 36 C245 38 200 68 196 112 C194 138 208 168 238 178 C270 182 300 176 324 162 C342 140 346 102 342 66 C338 46 320 36 295 36 Z\"/>\n    <path d=\"M202 118 C242 122 288 116 340 100 M220 152 C258 148 294 138 328 126\"\n          fill=\"none\" stroke=\"#475569\" stroke-width=\"1.6\" stroke-dasharray=\"3,3\"/>\n\n    <!-- 좌폐 (환자 좌폐 - 2엽 구조 & 심장패임) BBox: x: 656..804, y: 36..180 -->\n    <path class=\"organ-outline\" fill=\"url(#lungGradLeftSide)\"\n          d=\"M705 36 C728 36 746 46 750 66 C754 102 750 140 732 162 C706 176 676 182 644 178 C674 168 688 138 686 112 C682 68 637 38 705 36 Z\"/>\n    <path d=\"M682 100 C724 116 768 134 798 148\"\n          fill=\"none\" stroke=\"#475569\" stroke-width=\"1.6\" stroke-dasharray=\"3,3\"/>\n\n    <!-- 기관(Trachea) & 좌우 기관지 수형도 -->\n    <g class=\"bronchial\">\n      <path d=\"M500 32 L500 58 L460 84 L410 102 M500 58 L540 84 L590 102\"/>\n      <path d=\"M295 56 L295 152 M295 86 L255 108 M295 114 L258 138 M295 132 L272 150 M318 92 L330 118\"/>\n      <path d=\"M705 56 L705 152 M705 86 L745 108 M705 114 L742 138 M705 132 L728 150 M682 92 L670 118\"/>\n    </g>\n\n    <!-- 발광 폐포 모세혈관 비드 -->\n    <g class=\"alveoli\">\n      <circle cx=\"248\" cy=\"88\" r=\"7\"/><circle cx=\"236\" cy=\"116\" r=\"8\"/>\n      <circle cx=\"252\" cy=\"142\" r=\"7\"/><circle cx=\"320\" cy=\"140\" r=\"7\"/>\n      <circle cx=\"752\" cy=\"88\" r=\"7\"/><circle cx=\"764\" cy=\"116\" r=\"8\"/>\n      <circle cx=\"748\" cy=\"142\" r=\"7\"/><circle cx=\"680\" cy=\"140\" r=\"7\"/>\n    </g>\n\n    <!-- 폐 가스교환 모세혈관 연결 브릿지 -->\n    <path d=\"M322 165 C350 138 385 92 450 92 L550 92 C615 92 650 138 678 165\"\n          fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"2.2\" stroke-dasharray=\"4,4\" opacity=\"0.55\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 3. 온몸 모세혈관 (Body Capillaries, 아래쪽 - 생체 조직 매트릭스)  -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <g id=\"bodyCapillaries\">\n    <rect class=\"organ-outline\" fill=\"url(#capillaryBedGrad)\"\n          x=\"340\" y=\"594\" width=\"320\" height=\"74\" rx=\"24\"/>\n    \n    <!-- 조직 세포들 (Somatic Cells & Nuclei) -->\n    <g class=\"tissue-cell\">\n      <circle cx=\"410\" cy=\"622\" r=\"10\"/><circle cx=\"445\" cy=\"640\" r=\"9\"/>\n      <circle cx=\"480\" cy=\"622\" r=\"10\"/><circle cx=\"520\" cy=\"640\" r=\"9\"/>\n      <circle cx=\"555\" cy=\"622\" r=\"10\"/><circle cx=\"590\" cy=\"640\" r=\"9\"/>\n    </g>\n    <g class=\"cell-nucleus\">\n      <circle cx=\"410\" cy=\"622\" r=\"3.5\"/><circle cx=\"445\" cy=\"640\" r=\"3\"/>\n      <circle cx=\"480\" cy=\"622\" r=\"3.5\"/><circle cx=\"520\" cy=\"640\" r=\"3\"/>\n      <circle cx=\"555\" cy=\"622\" r=\"3.5\"/><circle cx=\"590\" cy=\"640\" r=\"3\"/>\n    </g>\n\n    <!-- 모세혈관 교환망 -->\n    <path class=\"cap-net\" stroke=\"#fda4af\" stroke-width=\"2.2\" opacity=\"0.85\"\n          d=\"M640 618 C600 610 575 618 545 624 C515 630 480 622 450 624 C415 626 385 618 360 618\"/>\n    <path class=\"cap-net\" stroke=\"#7dd3fc\" stroke-width=\"2.2\" opacity=\"0.85\"\n          d=\"M640 644 C605 644 580 636 545 638 C510 640 480 646 450 640 C420 634 385 644 360 644\"/>\n    <path class=\"cap-net\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" opacity=\"0.65\"\n          d=\"M425 614 L425 650 M465 614 L465 650 M505 614 L505 650 M545 614 L545 650 M585 614 L585 650\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 4. 주요 혈관들 (유기적 유선형 라인)                               -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n\n  <!-- 대정맥 (Vessel Vena Cava): 온몸 ➔ 우심방 (x: 200..340, y: 248..605) -->\n  <path id=\"vesselVenaCava\" class=\"vessel\" fill=\"#0284c7\"\n        d=\"M340 605 C250 605 200 555 200 485 L200 310 C200 265 240 248 335 248 L335 294\n           C260 294 246 308 246 335 L246 475 C246 515 285 558 340 558 Z\"/>\n\n  <!-- 대동맥 (Vessel Aorta): 좌심실 ➔ 대동맥궁 ➔ 온몸 (x: 644..800, y: 178..605) -->\n  <path id=\"vesselAorta\" class=\"vessel\" fill=\"#e11d48\"\n        d=\"M644 248 C644 215 675 198 720 198 L720 178 L734 178 L734 198 L750 198 L750 178 L764 178 L764 200\n           C790 206 800 230 800 270 L800 485 C800 555 750 605 660 605 L660 558\n           C715 558 754 515 754 475 L754 305 C754 265 738 248 680 248 Z\"/>\n\n  <!-- 폐동맥 (Vessel Pulmonary Artery): 우심실 ➔ 폐 (x: 330..442, y: 172..245) -->\n  <path id=\"vesselPulmonaryArtery\" class=\"vessel\" fill=\"#0284c7\"\n        d=\"M394 245 L442 245 L442 196 C442 180 422 172 396 172 L330 172 L330 216 L394 216 Z\"/>\n\n  <!-- 폐정맥 (Vessel Pulmonary Vein): 폐 ➔ 좌심방 (x: 558..670, y: 172..245) -->\n  <path id=\"vesselPulmonaryVein\" class=\"vessel\" fill=\"#e11d48\"\n        d=\"M558 245 L558 216 L622 216 L622 172 L670 172 C644 172 624 180 624 196 L624 245 Z\"/>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 5. 심장 본체 (Myocardium & Chambers)                          -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n\n  <!-- 심장 외벽 윤곽 (원추형 심첨부 해부학 라인) -->\n  <path id=\"heartOutline\" fill=\"url(#myoGrad)\" stroke=\"#475569\" stroke-width=\"3\"\n        d=\"M338 238 C338 222 355 214 374 214 L626 214 C645 214 662 222 662 238\n           L662 420 C662 505 600 568 512 574 C410 568 338 505 338 420 Z\"/>\n\n  <!-- 심장 4개 방실 (Chambers) -->\n  <!-- 우심방 (Right Atrium): BBox: x: 342..484, y: 244..330 -->\n  <path id=\"rightAtrium\" class=\"chamber\" fill=\"#0284c7\"\n        d=\"M352 244 L484 244 L484 330 L352 330 C344 330 342 320 342 304 L342 268 C342 250 344 244 352 244 Z\"/>\n\n  <!-- 좌심방 (Left Atrium): BBox: x: 516..658, y: 244..330 -->\n  <path id=\"leftAtrium\" class=\"chamber\" fill=\"#e11d48\"\n        d=\"M516 244 L648 244 C656 244 658 250 658 268 L658 304 C658 320 656 330 648 330 L516 330 Z\"/>\n\n  <!-- 우심실 (Right Ventricle): BBox: x: 355..484, y: 356..544 -->\n  <path id=\"rightVentricle\" class=\"chamber\" fill=\"#0284c7\"\n        d=\"M358 356 L484 356 L484 544 C426 540 382 510 362 468 C352 444 354 396 358 356 Z\"/>\n\n  <!-- 좌심실 (Left Ventricle): BBox: x: 516..646, y: 356..552 -->\n  <path id=\"leftVentricle\" class=\"chamber\" fill=\"#e11d48\"\n        d=\"M516 356 L642 356 C650 398 646 444 628 474 C604 518 568 544 516 552 Z\"/>\n\n  <!-- ── 심실벽 두께 대비 (좌심실 3배 두꺼움) ───────────────────── -->\n  <path id=\"leftVentricleWall\" fill=\"none\" stroke=\"#fda4af\" stroke-width=\"22\" stroke-linecap=\"round\" opacity=\"0.65\"\n        d=\"M648 358 C662 402 656 450 636 482 C608 526 564 554 512 562\"/>\n  <path id=\"rightVentricleWall\" fill=\"none\" stroke=\"#7dd3fc\" stroke-width=\"8\" stroke-linecap=\"round\" opacity=\"0.55\"\n        d=\"M352 358 C344 402 350 446 366 476 C394 522 442 552 492 562\"/>\n\n  <!-- ── 심실 사이막 (Septum): 근육질 그라데이션 및 유기적 곡선 ──────── -->\n  <!-- BBox: x: 486..514, y: 244..556 -->\n  <path id=\"septum\" fill=\"url(#septumGrad)\" stroke=\"#94a3b8\" stroke-width=\"2.2\"\n        d=\"M488 244 L512 244 L512 556 C504 562 496 562 488 556 Z\"/>\n  <line x1=\"500\" y1=\"260\" x2=\"500\" y2=\"540\" stroke=\"#64748b\" stroke-width=\"1.2\" stroke-dasharray=\"4,6\" opacity=\"0.6\"/>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 6. 판막 넷 (Valves - 부드러운 해부학적 첨판 및 건삭)               -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n\n  <!-- 삼첨판 (Tricuspid Valve: 우심방 ➔ 우심실) BBox: x: 366..474, y: 336..386 -->\n  <g id=\"valveTricuspid\" class=\"valve\">\n    <path class=\"valve-leaflet\" d=\"M366 336 C382 352 402 352 418 340 C434 352 456 352 474 336\"/>\n    <line x1=\"392\" y1=\"348\" x2=\"396\" y2=\"384\" class=\"chordae\"/>\n    <line x1=\"418\" y1=\"342\" x2=\"420\" y2=\"384\" class=\"chordae\"/>\n    <line x1=\"446\" y1=\"348\" x2=\"442\" y2=\"384\" class=\"chordae\"/>\n    <circle cx=\"396\" cy=\"385\" r=\"3\" class=\"papillary\"/>\n    <circle cx=\"420\" cy=\"385\" r=\"3\" class=\"papillary\"/>\n    <circle cx=\"442\" cy=\"385\" r=\"3\" class=\"papillary\"/>\n  </g>\n\n  <!-- 이첨판 (Mitral Valve: 좌심방 ➔ 좌심실) BBox: x: 526..644, y: 336..386 -->\n  <g id=\"valveMitral\" class=\"valve\">\n    <path class=\"valve-leaflet\" d=\"M526 336 C548 352 572 352 590 340 C608 352 628 352 644 336\"/>\n    <line x1=\"556\" y1=\"348\" x2=\"560\" y2=\"384\" class=\"chordae\"/>\n    <line x1=\"590\" y1=\"342\" x2=\"592\" y2=\"384\" class=\"chordae\"/>\n    <line x1=\"616\" y1=\"348\" x2=\"614\" y2=\"384\" class=\"chordae\"/>\n    <circle cx=\"560\" cy=\"385\" r=\"3\" class=\"papillary\"/>\n    <circle cx=\"592\" cy=\"385\" r=\"3\" class=\"papillary\"/>\n    <circle cx=\"614\" cy=\"385\" r=\"3\" class=\"papillary\"/>\n  </g>\n\n  <!-- 폐동맥판 (Pulmonary Valve: 우심실 ➔ 폐동맥) BBox: x: 390..434, y: 224..240 -->\n  <g id=\"valvePulmonary\" class=\"valve\">\n    <path class=\"valve-leaflet\" d=\"M390 240 C390 224 434 224 434 240 C420 234 404 234 390 240 Z\"/>\n  </g>\n\n  <!-- 대동맥판 (Aortic Valve: 좌심실 ➔ 대동맥) BBox: x: 566..610, y: 224..240 -->\n  <g id=\"valveAortic\" class=\"valve\">\n    <path class=\"valve-leaflet\" d=\"M566 240 C566 224 610 224 610 240 C596 234 580 234 566 240 Z\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 7. 혈류 안내선 (보이지 않는 패스, 50% 분기점 정밀 일치)           -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <path id=\"flowPulmonary\" fill=\"none\" stroke=\"none\" d=\"M400 286 L400 320 C400 375 404 435 412 485 C414 498 420 495 420 480 L420 295 L420 236 L414 200 C410 186 394 186 368 188 L320 190 C295 168 295 120 295 95 C295 72 340 68 420 68 L500 68 L580 68 C660 68 705 72 705 95 C705 120 705 168 680 190 L620 188 C596 186 590 198 590 214 L590 350 C590 385 565 385 540 290 C490 290 440 288 400 286 Z\"/>\n  <path id=\"flowSystemic\" fill=\"none\" stroke=\"none\" d=\"M590 286 C590 325 588 365 585 415 C582 465 575 510 568 525 C560 535 554 525 554 505 C554 445 565 350 576 295 C580 260 585 240 588 230 C594 188 660 185 730 186 C790 190 780 225 780 285 L780 480 C780 535 740 575 660 595 C610 608 550 622 476 626 C426 630 390 618 340 598 C260 575 220 535 220 480 L220 285 C220 230 250 200 320 200 C365 200 395 230 405 255 C412 275 415 298 416 325 C416 365 408 435 398 472 C392 495 382 485 382 460 C382 400 396 330 400 290 C405 260 450 265 520 275 C555 280 580 284 590 286 Z\"/>\n</svg>";

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
