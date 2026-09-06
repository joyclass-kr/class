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
    var EMBEDDED_DIAGRAM = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\" width=\"100%\" height=\"100%\">\n  <!--\n    심장·폐·온몸 순환 도식 (2022 개정 / 시험 그림 기준)\n    ※ 이것은 뼈대용 밑그림이다. 더 예쁘게 다시 그려도 좋으나 아래 약속은 지켜야 한다.\n\n    1. viewBox 는 \"0 0 1000 700\" 그대로.\n    2. 다음 id 를 가진 요소를 모두 남길 것. 코드가 이름으로 찾아 쓴다.\n       lungs  bodyCapillaries\n       rightAtrium  rightVentricle  leftAtrium  leftVentricle  septum\n       valveTricuspid  valveMitral  valvePulmonary  valveAortic\n       vesselVenaCava  vesselPulmonaryArtery  vesselPulmonaryVein  vesselAorta\n    3. 피가 흐르는 길 #flowPulmonary, #flowSystemic 을 새 그림에 맞게 다시 그을 것.\n       보이지 않는 안내선이며 피 알갱이가 이 길을 따라 흐른다. 방향(그리는 순서)도 그대로:\n         flowPulmonary : 우심방 ➔ 우심실 ➔ 폐동맥 ➔ 폐 ➔ 폐정맥 ➔ 좌심방\n         flowSystemic  : 좌심방 ➔ 좌심실 ➔ 대동맥 ➔ 온몸 ➔ 대정맥 ➔ 우심방\n       길의 딱 절반 지점이 폐(또는 온몸)여야 한다. 거기서 피 색이 바뀐다.\n    4. 글자(<text>)는 넣지 않는다. 이름표는 코드가 우리말로 붙인다.\n    5. 화면 왼쪽이 우심방·우심실(환자 기준 오른쪽). 좌심실 벽은 우심실보다 두껍게.\n    6. 방과 큰 혈관의 fill 은 코드가 다시 칠하므로 단색으로 둘 것.\n  -->\n\n  <defs>\n    <!-- 폐 음영 그라데이션 -->\n    <linearGradient id=\"lungGradLeft\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#334155\"/>\n      <stop offset=\"50%\" stop-color=\"#1e293b\"/>\n      <stop offset=\"100%\" stop-color=\"#0f172a\"/>\n    </linearGradient>\n    <linearGradient id=\"lungGradRight\" x1=\"100%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#334155\"/>\n      <stop offset=\"50%\" stop-color=\"#1e293b\"/>\n      <stop offset=\"100%\" stop-color=\"#0f172a\"/>\n    </linearGradient>\n\n    <!-- 모세혈관 베드 그라데이션 -->\n    <linearGradient id=\"capillaryBedGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#0369a1\" stop-opacity=\"0.35\"/>\n      <stop offset=\"50%\" stop-color=\"#475569\" stop-opacity=\"0.25\"/>\n      <stop offset=\"100%\" stop-color=\"#be123c\" stop-opacity=\"0.35\"/>\n    </linearGradient>\n\n    <!-- 심장 외벽 근육 그라데이션 -->\n    <linearGradient id=\"myoGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#1e293b\"/>\n      <stop offset=\"50%\" stop-color=\"#0f172a\"/>\n      <stop offset=\"100%\" stop-color=\"#090d16\"/>\n    </linearGradient>\n\n    <style>\n      .organ-outline { stroke: #64748b; stroke-width: 2.2; stroke-linejoin: round; }\n      .chamber { stroke: #cbd5e1; stroke-width: 2.5; stroke-linejoin: round; }\n      .vessel { stroke: #cbd5e1; stroke-width: 2.5; stroke-linejoin: round; }\n      .valve { stroke: #ffffff; stroke-width: 2.2; fill: #f8fafc; filter: drop-shadow(0 0 3px rgba(255,255,255,0.6)); }\n      .chordae { stroke: #f1f5f9; stroke-width: 1.4; stroke-dasharray: 2,2; opacity: 0.8; }\n      .bronchial { stroke: #38bdf8; stroke-width: 1.8; fill: none; opacity: 0.45; stroke-linecap: round; }\n      .alveoli { fill: #38bdf8; opacity: 0.25; }\n      .cap-net { fill: none; stroke-linecap: round; }\n    </style>\n  </defs>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 1. 배경 연결 가이드 및 흉강 구조선                            -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <g id=\"thoracicContext\" opacity=\"0.3\">\n    <!-- 흉곽 실루엣 가이드 -->\n    <path d=\"M120 180 C120 40 880 40 880 180 C880 450 820 620 500 680 C180 620 120 450 120 180 Z\"\n          fill=\"none\" stroke=\"#334155\" stroke-width=\"1.5\" stroke-dasharray=\"6,6\"/>\n    <!-- 척추 중심선 -->\n    <line x1=\"500\" y1=\"40\" x2=\"500\" y2=\"670\" stroke=\"#1e293b\" stroke-width=\"2\" stroke-dasharray=\"4,8\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 2. 폐 (Lungs, 위쪽)                                            -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <g id=\"lungs\">\n    <!-- 왼쪽 폐 (환자 기준 우폐 - 3엽 구조: 상엽, 중엽, 하엽) -->\n    <!-- BBox: x: 196..340, y: 32..180 -->\n    <path class=\"organ-outline\" fill=\"url(#lungGradLeft)\"\n          d=\"M298 34 C245 36 200 68 196 112 C194 138 206 166 235 178 C266 182 296 178 322 165 C340 142 344 105 340 68 C336 45 320 34 298 34 Z\"/>\n    <!-- 우폐 엽 분할선 (수평열 & 사열) -->\n    <path d=\"M202 118 C238 122 284 116 338 102 M218 152 C255 148 290 140 326 128\"\n          fill=\"none\" stroke=\"#475569\" stroke-width=\"1.8\" stroke-dasharray=\"3,3\"/>\n    \n    <!-- 오른쪽 폐 (환자 기준 좌폐 - 2엽 구조 & 심장패임 Cardiac Notch) -->\n    <!-- BBox: x: 660..804, y: 32..180 -->\n    <path class=\"organ-outline\" fill=\"url(#lungGradRight)\"\n          d=\"M702 34 C724 34 740 45 744 68 C748 105 744 142 726 165 C700 178 670 182 639 178 C668 166 680 138 678 112 C674 68 629 36 702 34 Z\"/>\n    <!-- 좌폐 엽 분할선 (사열) & 심장패임 -->\n    <path d=\"M676 102 C720 118 762 136 794 150\"\n          fill=\"none\" stroke=\"#475569\" stroke-width=\"1.8\" stroke-dasharray=\"3,3\"/>\n\n    <!-- 기관(Trachea) 및 좌우 기관지(Bronchial Trees) -->\n    <g class=\"bronchial\">\n      <!-- 중앙 기관지 분기 -->\n      <path d=\"M500 30 L500 58 L460 84 L410 102 M500 58 L540 84 L590 102\"/>\n      <!-- 좌측 기관지 가지 -->\n      <path d=\"M298 56 L298 152 M298 84 L258 106 M298 112 L260 136 M298 132 L274 150 M320 92 L332 118\"/>\n      <!-- 우측 기관지 가지 -->\n      <path d=\"M702 56 L702 152 M702 84 L742 106 M702 112 L740 136 M702 132 L726 150 M680 92 L668 118\"/>\n    </g>\n\n    <!-- 폐포 모세혈관망 (Alveolar Capillary Plexus) 미세 비드 -->\n    <g class=\"alveoli\">\n      <circle cx=\"248\" cy=\"88\" r=\"7\"/><circle cx=\"236\" cy=\"116\" r=\"8\"/>\n      <circle cx=\"252\" cy=\"142\" r=\"7\"/><circle cx=\"320\" cy=\"140\" r=\"7\"/>\n      <circle cx=\"752\" cy=\"88\" r=\"7\"/><circle cx=\"764\" cy=\"116\" r=\"8\"/>\n      <circle cx=\"748\" cy=\"142\" r=\"7\"/><circle cx=\"680\" cy=\"140\" r=\"7\"/>\n    </g>\n\n    <!-- 폐 모세혈관 가스교환 브릿지 (기체 교환 루프: CO2 방출 ➔ O2 흡수) -->\n    <path d=\"M322 168 C350 140 380 95 440 95 L560 95 C620 95 650 140 678 168\"\n          fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"2\" stroke-dasharray=\"4,4\" opacity=\"0.4\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 3. 온몸 모세혈관 (Body Capillaries, 아래쪽)                     -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <g id=\"bodyCapillaries\">\n    <!-- 베이스 컨테이너 캡슐 (x: 360, y: 596, w: 280, h: 72, rx: 24) -->\n    <rect class=\"organ-outline\" fill=\"url(#capillaryBedGrad)\"\n          x=\"360\" y=\"596\" width=\"280\" height=\"72\" rx=\"24\"/>\n    \n    <!-- 조직 세포들 (Somatic Tissue Cells - 육각형/원형 실루엣) -->\n    <g fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"1.2\" opacity=\"0.6\">\n      <circle cx=\"430\" cy=\"624\" r=\"11\"/>\n      <circle cx=\"465\" cy=\"640\" r=\"10\"/>\n      <circle cx=\"500\" cy=\"622\" r=\"11\"/>\n      <circle cx=\"535\" cy=\"640\" r=\"10\"/>\n      <circle cx=\"570\" cy=\"624\" r=\"11\"/>\n      <circle cx=\"500\" cy=\"648\" r=\"9\"/>\n    </g>\n\n    <!-- 모세혈관 그물망 (동맥소혈관 ➔ 모세혈관망 ➔ 정맥소혈관 교환망) -->\n    <path class=\"cap-net\" stroke=\"#fda4af\" stroke-width=\"2\" opacity=\"0.75\"\n          d=\"M620 620 C580 610 560 618 535 624 C510 630 480 622 450 624 C420 626 395 620 375 620\"/>\n    <path class=\"cap-net\" stroke=\"#7dd3fc\" stroke-width=\"2\" opacity=\"0.75\"\n          d=\"M620 644 C585 644 565 636 535 638 C505 640 480 646 450 640 C420 634 395 644 375 644\"/>\n    <!-- 교차 문합지 (Anastomotic loops) -->\n    <path class=\"cap-net\" stroke=\"#94a3b8\" stroke-width=\"1.6\" opacity=\"0.65\"\n          d=\"M440 616 L440 650 M475 616 L475 650 M510 614 L510 652 M545 616 L545 650 M580 616 L580 650\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 4. 큰 혈관들 (심장 뒷편에 먼저 배치)                           -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n\n  <!-- 대정맥 (Vena Cava): 온몸 ➔ 우심방 (좌측 외곽 주행) -->\n  <!-- BBox: x: 140..350, y: 248..604 -->\n  <path id=\"vesselVenaCava\" class=\"vessel\" fill=\"#0284c7\"\n        d=\"M360 604 L300 604 C210 604 140 570 140 500 L140 300 C140 268 168 248 205 248 L324 248 L324 296 L205 296\n           C196 296 190 300 190 310 L190 496 C190 536 240 556 300 556 L360 556 Z\"/>\n\n  <!-- 폐동맥 (Pulmonary Artery): 우심실 ➔ 폐 (전면 교차하여 좌측 폐로) -->\n  <!-- BBox: x: 322..440, y: 168..236 -->\n  <path id=\"vesselPulmonaryArtery\" class=\"vessel\" fill=\"#0284c7\"\n        d=\"M392 236 L440 236 L440 190 C440 176 424 168 402 168 L322 168 L322 214 L392 214 Z\"/>\n\n  <!-- 폐정맥 (Pulmonary Vein): 폐 ➔ 좌심방 (우측 폐에서 좌심방 후면으로 진입) -->\n  <!-- BBox: x: 560..678, y: 168..236 -->\n  <path id=\"vesselPulmonaryVein\" class=\"vessel\" fill=\"#e11d48\"\n        d=\"M560 236 L560 190 C560 176 576 168 598 168 L678 168 L678 214 L610 214 L610 236 Z\"/>\n\n  <!-- 대동맥 (Aorta): 좌심실 ➔ 온몸 (대동맥궁 ➔ 우측 외곽 주행 하행 대동맥) -->\n  <!-- BBox: x: 640..860, y: 202..604 -->\n  <path id=\"vesselAorta\" class=\"vessel\" fill=\"#e11d48\"\n        d=\"M640 604 L700 604 C790 604 860 570 860 500 L860 260 C860 222 826 202 782 202 L646 202 L646 250 L782 250\n           C800 250 810 254 810 268 L810 496 C810 536 760 556 700 556 L640 556 Z\"/>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 5. 심장 본체 (Myocardium & Chambers)                          -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n\n  <!-- 심장 외벽 윤곽 베이스 (해부학적 원추형 심근체) -->\n  <path id=\"heartOutline\" fill=\"url(#myoGrad)\" stroke=\"#64748b\" stroke-width=\"3\"\n        d=\"M330 240 C330 226 342 218 358 218 L642 218 C658 218 670 226 670 240\n           L670 425 C670 515 605 572 505 576 C400 572 330 515 330 425 Z\"/>\n\n  <!-- 심장 4개 방 (Chambers) -->\n  <!-- 우심방 (Right Atrium): BBox: x: 338..482, y: 244..330 -->\n  <path id=\"rightAtrium\" class=\"chamber\" fill=\"#0284c7\"\n        d=\"M348 244 L482 244 L482 330 L348 330 C340 330 338 320 338 306 L338 268 C338 252 340 244 348 244 Z\"/>\n\n  <!-- 좌심방 (Left Atrium): BBox: x: 518..662, y: 244..330 -->\n  <path id=\"leftAtrium\" class=\"chamber\" fill=\"#e11d48\"\n        d=\"M518 244 L652 244 C660 244 662 252 662 268 L662 306 C662 320 660 330 652 330 L518 330 Z\"/>\n\n  <!-- 우심실 (Right Ventricle): BBox: x: 348..482, y: 356..546 -->\n  <path id=\"rightVentricle\" class=\"chamber\" fill=\"#0284c7\"\n        d=\"M356 356 L482 356 L482 546 C424 542 378 512 358 468 C348 444 350 396 356 356 Z\"/>\n\n  <!-- 좌심실 (Left Ventricle): BBox: x: 518..646, y: 356..548 -->\n  <path id=\"leftVentricle\" class=\"chamber\" fill=\"#e11d48\"\n        d=\"M518 356 L638 356 C646 398 642 442 626 472 C602 516 566 542 518 548 Z\"/>\n\n  <!-- ── 심실벽 두께 대비 (좌심실벽 3배 두꺼움 - 시험 핵심) ────────── -->\n  <!-- 좌심실 두꺼운 심근벽 (고압력 체순환 펌프) -->\n  <path id=\"leftVentricleWall\" fill=\"none\" stroke=\"#fda4af\" stroke-width=\"22\" stroke-linecap=\"round\" opacity=\"0.65\"\n        d=\"M646 358 C660 402 654 448 634 480 C606 524 562 552 512 560\"/>\n  <!-- 우심실 얇은 심근벽 (저압력 폐순환 펌프) -->\n  <path id=\"rightVentricleWall\" fill=\"none\" stroke=\"#7dd3fc\" stroke-width=\"8\" stroke-linecap=\"round\" opacity=\"0.55\"\n        d=\"M350 358 C342 402 348 446 364 476 C392 522 440 552 490 560\"/>\n\n  <!-- ── 심실 사이막 (Septum): 정맥혈과 동맥혈 완벽 분리 ─────────── -->\n  <!-- BBox: x: 488..512, y: 244..556 -->\n  <path id=\"septum\" fill=\"#334155\" stroke=\"#cbd5e1\" stroke-width=\"2.5\"\n        d=\"M488 244 L512 244 L512 556 C504 562 496 562 488 556 Z\"/>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 6. 판막 넷 (Valves - 혈액 역류 방지)                           -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 삼첨판 (Tricuspid Valve: 우심방 ➔ 우심실 단방향) -->\n  <g id=\"valveTricuspid\" class=\"valve\">\n    <path d=\"M358 338 L412 364 L360 352 Z\"/>\n    <path d=\"M466 338 L420 364 L464 352 Z\"/>\n    <line x1=\"412\" y1=\"364\" x2=\"416\" y2=\"400\" class=\"chordae\"/>\n    <line x1=\"420\" y1=\"364\" x2=\"424\" y2=\"400\" class=\"chordae\"/>\n  </g>\n\n  <!-- 이첨판 (Mitral Valve: 좌심방 ➔ 좌심실 단방향) -->\n  <g id=\"valveMitral\" class=\"valve\">\n    <path d=\"M534 338 L584 364 L536 352 Z\"/>\n    <path d=\"M642 338 L592 364 L640 352 Z\"/>\n    <line x1=\"584\" y1=\"364\" x2=\"580\" y2=\"400\" class=\"chordae\"/>\n    <line x1=\"592\" y1=\"364\" x2=\"588\" y2=\"400\" class=\"chordae\"/>\n  </g>\n\n  <!-- 폐동맥판 (Pulmonary Valve: 우심실 ➔ 폐동맥 반월판) -->\n  <g id=\"valvePulmonary\" class=\"valve\">\n    <path d=\"M382 244 L410 218 L438 244 L410 234 Z\"/>\n  </g>\n\n  <!-- 대동맥판 (Aortic Valve: 좌심실 ➔ 대동맥 반월판) -->\n  <g id=\"valveAortic\" class=\"valve\">\n    <path d=\"M562 244 L590 218 L618 244 L590 234 Z\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 7. 혈류 안내선 (보이지 않는 패스, d.t=0.5에서 기관 중심 통과) -->\n  <!-- ═══════════════════════════════════════════════════════════════ -->\n  <!-- 폐순환: 우심방 ➔ 우심실 ➔ 폐동맥 ➔ 폐(50%) ➔ 폐정맥 ➔ 좌심방 -->\n  <path id=\"flowPulmonary\" fill=\"none\" stroke=\"none\"\n        d=\"M400 286 L400 320 C400 380 404 440 412 490 C414 504 420 500 420 484 L420 300 L420 236 L416 200 C412 186 396 186 370 188 L322 190 C300 168 300 120 300 100 C300 78 340 68 420 68 L500 68 L580 68 C660 68 705 78 705 100 C705 125 700 165 675 188 L615 192 C595 192 588 200 588 214 L588 359 C588 394 565 394 540 290 C490 290 440 288 400 286 Z\"/>\n\n  <!-- 체순환: 좌심방 ➔ 좌심실 ➔ 대동맥 ➔ 온몸(50%) ➔ 대정맥 ➔ 우심방 -->\n  <path id=\"flowSystemic\" fill=\"none\" stroke=\"none\"\n        d=\"M590 286 C590 325 588 365 585 415 C582 465 575 510 568 525 C560 535 554 525 554 505 C554 445 565 350 576 295 C580 260 585 240 588 230 C594 185 660 182 730 184 C810 188 842 225 842 285 L842 485 C842 540 800 580 720 598 C660 612 580 626 500 632 C420 626 340 612 280 598 C200 580 158 540 158 485 L158 285 C158 225 190 188 270 184 C340 180 385 220 395 245 C405 270 410 295 412 320.6 C412 360.6 405 430.6 396 470.6 C390 495.6 380 485.6 380 460.6 C380 400.6 395 330 400 290 C405 260 450 265 520 275 C555 280 580 284 590 286 Z\"/>\n</svg>\n";

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
