/**
 * 눈의 원근·명암 조절 (그림 갈아 끼우기)
 *
 * 예전 눈 장면은 사진이었고 그림 안에 RETINA, PUPIL 같은 영어가 인쇄돼 있었다.
 * 글자 없는 눈 단면 그림(../assets/images/eye-diagram.svg)을 대신 얹고,
 * 조각 이름(id)만 찾아 수정체 두께와 동공 크기를 바꾼다.
 *
 * 시험에 나오는 대목:
 *   가까운 곳 - 섬모체 수축 ➔ 진대 느슨해짐 ➔ 수정체 두꺼워짐
 *   먼 곳     - 섬모체 이완 ➔ 진대 팽팽해짐 ➔ 수정체 얇아짐
 *   밝을 때 동공 축소 / 어두울 때 동공 확대
 */

(function () {
    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var SVG_URL = '../assets/images/eye-diagram.svg';

    // ax, ay = 이름표가 놓일 자리 (그림 좌표). 조각 한가운데에서 이 자리까지 선을 긋는다.
    var LABELS = [
        { id: 'cornea', text: '각막', ax: 880, ay: 150 },
        { id: 'iris', text: '홍채', ax: 880, ay: 218 },
        { id: 'pupil', text: '동공', ax: 880, ay: 286 },
        { id: 'lens', text: '수정체', ax: 880, ay: 424 },
        { id: 'zonule', text: '진대', ax: 880, ay: 492 },
        { id: 'ciliaryBody', text: '섬모체', ax: 880, ay: 560 },
        { id: 'retina', text: '망막', ax: 470, ay: 120 },
        { id: 'vitreous', text: '유리체', ax: 470, ay: 350 },
        { id: 'fovea', text: '황반', ax: 210, ay: 300 },
        { id: 'opticNerve', text: '시각 신경', ax: 150, ay: 610 }
    ];

    var DETAIL = {
        cornea: ['각막', '눈의 가장 바깥에서 빛이 처음 들어오는 투명한 창입니다. 빛을 한 번 꺾어 줍니다.'],
        iris: ['홍채', '동공의 크기를 바꿔 <strong>들어오는 빛의 양</strong>을 조절합니다.'],
        pupil: ['동공', '빛이 지나가는 구멍입니다. 밝은 곳에서는 작아지고 어두운 곳에서는 커집니다.'],
        lens: ['수정체', '볼록렌즈처럼 빛을 꺾어 망막에 상을 맺습니다. 가까운 곳을 볼 때 <strong>두꺼워지고</strong> 먼 곳을 볼 때 <strong>얇아집니다</strong>.'],
        ciliaryBody: ['섬모체', '수정체를 잡고 있는 근육입니다. 가까운 곳을 볼 때 <strong>수축</strong>합니다.'],
        zonule: ['진대 (걸이인대)', '섬모체와 수정체를 잇는 가는 끈입니다. 섬모체가 수축하면 <strong>느슨해지고</strong>, 그래서 수정체가 두꺼워집니다.'],
        retina: ['망막', '상이 맺히는 눈 속 스크린입니다. 시각 세포가 빛을 신호로 바꿉니다.'],
        fovea: ['황반', '시각 세포가 가장 빽빽하게 모인 곳입니다. 여기에 상이 맺힐 때 가장 뚜렷하게 보입니다.'],
        opticNerve: ['시각 신경', '망막이 만든 신호를 <strong>대뇌 시각 영역</strong>으로 보냅니다.'],
        vitreous: ['유리체', '눈알 속을 채운 투명한 젤리로, 눈 모양을 지탱합니다.']
    };

    var wrap, layer, svg, labelBox, capBox, capNear, capLight;
    var lens, pupil, ciliary, zonule, rayGroup, leaderGroup, focusDot;
    var foveaPt = { x: 0, y: 0 }, lensPt = { x: 0, y: 0 };

    function init() {
        wrap = document.querySelector('.nervous-viewport');
        if (!wrap) return;
        buildLayer();
        bindSceneButtons();
        watchControls();
        requestAnimationFrame(loop);
    }

    function bindSceneButtons() {
        var bar = wrap.querySelector('.scene-switcher');
        if (!bar) return;
        bar.querySelectorAll('.scene-btn').forEach(function (b) {
            b.addEventListener('click', function () {
                setVisible(b.dataset.scene === 'sensory');
            });
        });
    }

    function setVisible(on) {
        if (!layer) return;
        layer.hidden = !on;
        var canvas = document.getElementById('nervousCanvas');
        // 다른 장면들이 캔버스를 쓰므로, 우리 장면일 때만 감춘다
        if (canvas && on) canvas.style.visibility = 'hidden';
        else if (canvas && !document.querySelector('.pupil-layer:not([hidden])')) canvas.style.visibility = 'visible';
        if (on) placeLabels();
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
        layer.className = 'eye-optics-layer';
        layer.hidden = true;
        wrap.appendChild(layer);

        fetch(SVG_URL)
            .then(function (r) { return r.text(); })
            .then(function (markup) {
                layer.innerHTML = '<div class="eye-optics-stage">' + markup +
                    '<div class="eye-optics-labels"></div></div>' +
                    '<div class="eye-optics-caption"><span id="eyeCapNear"></span><span id="eyeCapLight"></span></div>';
                svg = layer.querySelector('svg');
                labelBox = layer.querySelector('.eye-optics-labels');
                capNear = layer.querySelector('#eyeCapNear');
                capLight = layer.querySelector('#eyeCapLight');
                if (!svg) return;
                svg.removeAttribute('width');
                svg.removeAttribute('height');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                setupDiagram();
                placeLabels();
                window.addEventListener('resize', placeLabels);
            })
            .catch(function () {
                layer.innerHTML = '<div class="eye-optics-error">눈 그림을 불러오지 못했습니다.</div>';
            });
    }

    function setupDiagram() {
        lens = svg.querySelector('#lens');
        pupil = svg.querySelector('#pupil');
        ciliary = svg.querySelector('#ciliaryBody');
        zonule = svg.querySelector('#zonule');

        foveaPt = centerOf('fovea', foveaPt);
        lensPt = centerOf('lens', lensPt);

        // 빛줄기는 우리가 그린다 (그림 뒤에 깔면 가려지므로 맨 위에)
        leaderGroup = document.createElementNS(SVG_NS, 'g');
        leaderGroup.setAttribute('id', 'eyeLeaders');
        svg.appendChild(leaderGroup);

        rayGroup = document.createElementNS(SVG_NS, 'g');
        rayGroup.setAttribute('id', 'eyeRays');
        svg.appendChild(rayGroup);

        focusDot = document.createElementNS(SVG_NS, 'circle');
        focusDot.setAttribute('r', 7);
        focusDot.setAttribute('fill', '#facc15');
        svg.appendChild(focusDot);

        Object.keys(DETAIL).forEach(function (id) {
            var elm = svg.querySelector('#' + id);
            if (!elm) return;
            elm.style.cursor = 'pointer';
            elm.addEventListener('click', function () { showDetail(id); });
        });
    }

    function centerOf(id, dflt) {
        var elm = svg.querySelector('#' + id);
        if (!elm) return dflt;
        try {
            var b = elm.getBBox();
            return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
        } catch (e) { return dflt; }
    }

    function showDetail(id) {
        var d = DETAIL[id];
        if (!d) return;
        var t = document.getElementById('organTitle');
        var p = document.getElementById('organDesc');
        if (t) t.textContent = d[0];
        if (p) p.innerHTML = d[1];
        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) SimEngine.SoundFX.playClick();
    }

    function placeLabels() {
        if (!svg || !labelBox) return;
        var box = svg.getBoundingClientRect();
        if (!box.width) return;
        var vb = svg.viewBox.baseVal;
        var sx = box.width / vb.width, sy = box.height / vb.height;

        labelBox.innerHTML = '';
        if (leaderGroup) { while (leaderGroup.firstChild) leaderGroup.removeChild(leaderGroup.firstChild); }

        LABELS.forEach(function (item) {
            var elm = svg.querySelector('#' + item.id);
            if (!elm) return;
            var b;
            try { b = elm.getBBox(); } catch (e) { return; }

            var cx = b.x + b.width / 2;
            var cy = b.y + b.height / 2;
            var ax = (item.ax === undefined) ? cx : item.ax;
            var ay = (item.ay === undefined) ? cy : item.ay;

            if (leaderGroup && (ax !== cx || ay !== cy)) {
                var line = document.createElementNS(SVG_NS, 'line');
                line.setAttribute('x1', cx);
                line.setAttribute('y1', cy);
                line.setAttribute('x2', ax);
                line.setAttribute('y2', ay);
                line.setAttribute('stroke', 'rgba(148, 163, 184, 0.75)');
                line.setAttribute('stroke-width', 1.6);
                leaderGroup.appendChild(line);
            }

            var tag = document.createElement('span');
            tag.className = 'eye-optics-tag';
            tag.textContent = item.text;
            tag.style.left = (ax * sx) + 'px';
            tag.style.top = (ay * sy) + 'px';
            tag.addEventListener('click', function () { showDetail(item.id); });
            labelBox.appendChild(tag);
        });
    }

    function watchControls() {
        ['distSlider', 'lightSlider'].forEach(function (id) {
            var s = document.getElementById(id);
            if (s) s.addEventListener('input', render);
        });
    }

    function num(id, dflt) {
        var s = document.getElementById(id);
        var v = s ? parseFloat(s.value) : dflt;
        return isNaN(v) ? dflt : v;
    }

    function loop() {
        render();
        requestAnimationFrame(loop);
    }

    function render() {
        if (!layer || layer.hidden || !svg) return;

        var dist = num('distSlider', 50);    // 10 ~ 100 cm
        var light = num('lightSlider', 50);  // 10 ~ 100 %
        var near = dist < 35;

        // 가까울수록 수정체가 두꺼워진다 (가로로 부푼다)
        var thick = 1.45 - ((dist - 10) / 90) * 0.5;   // 1.45 ~ 0.95
        if (lens) lens.setAttribute('transform', 'scale(' + thick.toFixed(3) + ' 1)');

        // 어두울수록 동공이 커진다
        var pup = 1.75 - ((light - 10) / 90) * 1.15;   // 1.75 ~ 0.6
        if (pupil) pupil.setAttribute('transform', 'scale(' + pup.toFixed(3) + ')');

        // 섬모체는 가까운 곳을 볼 때 수축, 진대는 그때 느슨해진다
        if (ciliary) ciliary.setAttribute('opacity', near ? 1 : 0.55);
        if (zonule) zonule.setAttribute('opacity', near ? 0.4 : 1);

        drawRays(light, thick);

        if (capNear) {
            capNear.innerHTML = near
                ? '<b>가까운 물체 (' + dist + 'cm)</b> ➔ 섬모체 <b>수축</b> ➔ 진대 느슨 ➔ 수정체 <b>두꺼워짐</b>'
                : '<b>먼 물체 (' + dist + 'cm)</b> ➔ 섬모체 <b>이완</b> ➔ 진대 팽팽 ➔ 수정체 <b>얇아짐</b>';
        }
        if (capLight) {
            capLight.innerHTML = light < 40
                ? '<b>어두움 (' + light + '%)</b> ➔ 동공 <b>확대</b>'
                : '<b>밝음 (' + light + '%)</b> ➔ 동공 <b>축소</b>';
        }
    }

    function drawRays(light, thick) {
        // 그림이 다 놓이기 전에는 크기를 재도 0 이 나온다. 제대로 잴 수 있을 때까지 다시 잰다.
        if (!lensPt.x || !foveaPt.x) {
            lensPt = centerOf('lens', lensPt);
            foveaPt = centerOf('fovea', foveaPt);
            if (!lensPt.x || !foveaPt.x) return;
        }

        while (rayGroup.firstChild) rayGroup.removeChild(rayGroup.firstChild);

        var spread = (14 + (100 - light) * 0.55);   // 어두우면 넓게 들어온다
        for (var i = -2; i <= 2; i++) {
            var off = i * spread / 2;
            var p = document.createElementNS(SVG_NS, 'path');
            p.setAttribute('d',
                'M990 ' + (lensPt.y + off * 1.25) +
                ' L' + lensPt.x + ' ' + (lensPt.y + off) +
                ' L' + foveaPt.x + ' ' + foveaPt.y);
            p.setAttribute('fill', 'none');
            p.setAttribute('stroke', 'rgba(250, 204, 21, 0.9)');
            p.setAttribute('stroke-width', 2);
            rayGroup.appendChild(p);
        }

        focusDot.setAttribute('cx', foveaPt.x);
        focusDot.setAttribute('cy', foveaPt.y);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
