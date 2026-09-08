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

    var MIN_FONT = 13.5;   // 도식 글씨의 최소 크기

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var ATM = 760;

    var wrap, layer, svg, tagBox, verdictTag;
    var ribsGroup, lungsGroup, diaphragm, chestFill, airArrow, airText, bodyGroup;
    var jarMembrane, jarBalloonL, jarBalloonR, jarHand, jarKnob, jarShineL, jarShineR;
    var volBar, volText, presNeedle, presText, verdict;
    var raf;

    function init() {
        wrap = document.querySelector('.respiration-viewport');
        if (!wrap) return;
        addSceneButton();
        buildLayer();
        watchControls();
        window.addEventListener('resize', placeTags);
        setTimeout(placeTags, 120);
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
        // 화면 갱신이 멈춰 있어도(다른 갈피에 있을 때 등) 자리는 잡혀 있어야 한다
        if (on) { setTimeout(placeTags, 0); setTimeout(placeTags, 80); }
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

        // 글씨는 그림 안에 넣지 않는다. 그림 안 글씨는 창이 커지면 같이 커져서
        // 옆의 다른 글씨와 크기가 어긋난다. HTML 로 얹어야 어디서나 크기가 같다.
        tagBox = document.createElement('div');
        tagBox.className = 'breath-tags';
        layer.appendChild(tagBox);

        drawBody();
        drawJar();
        drawGauges();
    }

    /* ── 왼쪽: 몸통 앞모습 (ribcage.svg 정밀 해부학 도식 기반) ────────── */
    var RIBCAGE_INNER = "<defs>\n    <!-- linearGradient stop 2개, 밝기 차 15% 안쪽, 순백(#ffffff) 금지 -->\n    <linearGradient id=\"boneGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#dbe3eb\"/>\n      <stop offset=\"100%\" stop-color=\"#edf2f7\"/>\n    </linearGradient>\n    <linearGradient id=\"lungGradR\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#ba5d70\"/>\n      <stop offset=\"100%\" stop-color=\"#ab5566\"/>\n    </linearGradient>\n    <linearGradient id=\"lungGradL\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#b65a6d\"/>\n      <stop offset=\"100%\" stop-color=\"#a75263\"/>\n    </linearGradient>\n    <linearGradient id=\"tracheaGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#c5d0dc\"/>\n      <stop offset=\"100%\" stop-color=\"#d4dde6\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 1. 등뼈 (Spine): 뒤쪽 한가운데 세로로 위치                          -->\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <g id=\"spine\">\n    <!-- C7 마디 -->\n    <rect x=\"238\" y=\"112\" width=\"24\" height=\"14\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <!-- T1 ~ T12 흉추 마디들과 가로돌기 (Transverse processes) -->\n    <!-- T1 (130) -->\n    <rect x=\"236\" y=\"126\" width=\"28\" height=\"17\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 236 130 L 227 127 M 264 130 L 273 127\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T2 (151) -->\n    <rect x=\"236\" y=\"147\" width=\"28\" height=\"18\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 236 151 L 227 148 M 264 151 L 273 148\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T3 (174) -->\n    <rect x=\"236\" y=\"170\" width=\"28\" height=\"18\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 236 174 L 227 171 M 264 174 L 273 171\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T4 (197) -->\n    <rect x=\"236\" y=\"193\" width=\"28\" height=\"18\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 236 197 L 227 194 M 264 197 L 273 194\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T5 (220) -->\n    <rect x=\"235\" y=\"216\" width=\"30\" height=\"18\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 235 220 L 226 217 M 265 220 L 274 217\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T6 (243) -->\n    <rect x=\"235\" y=\"239\" width=\"30\" height=\"18\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 235 243 L 226 240 M 265 243 L 274 240\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T7 (265) -->\n    <rect x=\"235\" y=\"262\" width=\"30\" height=\"18\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <path d=\"M 235 265 L 226 262 M 265 265 L 274 262\" stroke=\"#94a3b8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    <!-- T8 ~ T12 하부 흉추 -->\n    <rect x=\"235\" y=\"285\" width=\"30\" height=\"19\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <rect x=\"234\" y=\"307\" width=\"32\" height=\"20\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <rect x=\"234\" y=\"330\" width=\"32\" height=\"20\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <rect x=\"233\" y=\"353\" width=\"34\" height=\"21\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <rect x=\"233\" y=\"377\" width=\"34\" height=\"21\" rx=\"3\" fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <!-- 척추 디스크 라인들 -->\n    <line x1=\"237\" y1=\"145\" x2=\"263\" y2=\"145\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"237\" y1=\"168\" x2=\"263\" y2=\"168\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"237\" y1=\"191\" x2=\"263\" y2=\"191\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"236\" y1=\"214\" x2=\"264\" y2=\"214\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"236\" y1=\"237\" x2=\"264\" y2=\"237\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"236\" y1=\"260\" x2=\"264\" y2=\"260\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"235\" y1=\"283\" x2=\"265\" y2=\"283\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"235\" y1=\"305\" x2=\"265\" y2=\"305\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"234\" y1=\"328\" x2=\"266\" y2=\"328\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"234\" y1=\"351\" x2=\"266\" y2=\"351\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n    <line x1=\"233\" y1=\"375\" x2=\"267\" y2=\"375\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 2. 기관 (Trachea) 및 기관지 (Bronchi)                               -->\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 오른쪽 기관지 (Right Bronchus): 더 가파르고 짧음 -> (206, 206) -->\n  <path id=\"bronchusR\" d=\"M 244 167 C 236 175, 222 188, 206 206 L 214 212 C 228 196, 242 182, 250 174 Z\"\n        fill=\"url(#tracheaGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n\n  <!-- 왼쪽 기관지 (Left Bronchus): 더 완만하고 긺 -> (296, 212) -->\n  <path id=\"bronchusL\" d=\"M 256 167 C 266 175, 282 192, 296 212 L 290 217 C 276 198, 260 181, 250 174 Z\"\n        fill=\"url(#tracheaGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n\n  <!-- 기관 본체: (250, 92) -> (250, 168), 너비 14px (x=243..257) -->\n  <g id=\"trachea\">\n    <path d=\"M 243 92 L 257 92 L 257 168 L 243 168 Z\" fill=\"url(#tracheaGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n    <path d=\"M 243 99 Q 250 102 257 99 M 243 107 Q 250 110 257 107 M 243 115 Q 250 118 257 115 M 243 123 Q 250 126 257 123 M 243 131 Q 250 134 257 131 M 243 139 Q 250 142 257 139 M 243 147 Q 250 150 257 147 M 243 155 Q 250 158 257 155 M 243 163 Q 250 166 257 163\"\n          fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.3\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 3. 폐 (Lungs): 오른쪽 3엽(세 갈래), 왼쪽 2엽(두 갈래)                 -->\n  <!--    바닥면은 가로막 돔(M 146 372 Q 250 312 354 372)의 곡면과 밀착        -->\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <g id=\"lungs\">\n    <!-- 오른쪽 폐 (Right Lung, 화면 왼쪽 x < 250): 3엽 (위엽, 가운데엽, 아래엽) -->\n    <g id=\"lungRight\">\n      <!-- 1) 우폐 위엽 (Superior Lobe) -->\n      <path d=\"M 196 136 C 170 136, 140 152, 126 176 C 118 192, 114 208, 112 222 L 174 222 C 202 222, 218 212, 222 194 C 226 176, 220 148, 208 138 C 204 136, 200 136, 196 136 Z\"\n            fill=\"url(#lungGradR)\" stroke=\"#f0a8b4\" stroke-width=\"1.5\"/>\n      <!-- 2) 우폐 가운데엽 (Middle Lobe) -->\n      <path d=\"M 112 224 L 174 224 C 204 224, 218 234, 220 250 L 206 270 C 176 270, 142 266, 114 262 C 112 250, 112 236, 112 224 Z\"\n            fill=\"url(#lungGradR)\" stroke=\"#f0a8b4\" stroke-width=\"1.5\"/>\n      <!-- 3) 우폐 아래엽 (Inferior Lobe): 바닥면이 가로막 경사를 따라 (118, 362) -> (224, 342) 형성 -->\n      <path d=\"M 114 264 C 142 268, 174 272, 206 272 L 222 252 C 226 272, 226 312, 224 342 C 196 344, 154 354, 118 362 C 113 336, 113 296, 114 264 Z\"\n            fill=\"url(#lungGradR)\" stroke=\"#f0a8b4\" stroke-width=\"1.5\"/>\n    </g>\n\n    <!-- 왼쪽 폐 (Left Lung, 화면 오른쪽 x > 250): 2엽 (위엽, 아래엽), 심장패임으로 더 작음 -->\n    <g id=\"lungLeft\">\n      <!-- 1) 좌폐 위엽 (Superior Lobe): 심장패임(Cardiac notch)으로 안쪽(x=280..286)이 깊게 패임 -->\n      <path d=\"M 304 140 C 308 140, 312 140, 316 142 C 328 152, 356 170, 370 194 C 380 212, 384 236, 382 258 C 380 272, 368 286, 352 294 C 336 294, 318 272, 308 260 C 296 246, 286 230, 280 212 C 276 192, 278 172, 290 152 C 294 144, 299 140, 304 140 Z\"\n            fill=\"url(#lungGradL)\" stroke=\"#f0a8b4\" stroke-width=\"1.5\"/>\n      <!-- 2) 좌폐 아래엽 (Inferior Lobe): 바닥면이 가로막 경사를 따라 (276, 342) -> (382, 362) 형성 -->\n      <path d=\"M 352 296 C 366 288, 378 274, 380 260 C 384 278, 384 316, 382 362 C 346 354, 304 344, 276 342 C 276 322, 278 304, 286 290 C 292 276, 302 264, 308 264 C 316 274, 334 296, 352 296 Z\"\n            fill=\"url(#lungGradL)\" stroke=\"#f0a8b4\" stroke-width=\"1.5\"/>\n    </g>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 4. 복장뼈 (Sternum): 앞쪽 한가운데 세로로 위치                      -->\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <g id=\"sternum\">\n    <!-- 복장뼈자루 (Manubrium): y=136..168, 쇄골·제1갈비뼈 부착 -->\n    <path d=\"M 242 136 Q 250 138 258 136 L 265 140 C 267 148, 265 158, 262 168 L 238 168 C 235 158, 233 148, 235 140 Z\"\n          fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n    <line x1=\"238\" y1=\"168\" x2=\"262\" y2=\"168\" stroke=\"#94a3b8\" stroke-width=\"1.2\"/>\n    <!-- 복장뼈몸통 (Body of sternum): y=168..278, 갈비뼈 2~7번 결합 -->\n    <path d=\"M 238 168 L 262 168 C 263 190, 263 220, 261 248 C 260 260, 258 270, 256 278 L 244 278 C 242 270, 240 260, 239 248 C 237 220, 237 190, 238 168 Z\"\n          fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n    <!-- 복장뼈 마디 음영선 -->\n    <line x1=\"239\" y1=\"195\" x2=\"261\" y2=\"195\" stroke=\"#94a3b8\" stroke-width=\"1\" opacity=\"0.6\"/>\n    <line x1=\"239\" y1=\"222\" x2=\"261\" y2=\"222\" stroke=\"#94a3b8\" stroke-width=\"1\" opacity=\"0.6\"/>\n    <line x1=\"240\" y1=\"250\" x2=\"260\" y2=\"250\" stroke=\"#94a3b8\" stroke-width=\"1\" opacity=\"0.6\"/>\n    <!-- 칼돌기 (Xiphoid process): y=278..304 -->\n    <path d=\"M 244 278 L 256 278 L 252 300 L 250 304 L 248 300 Z\"\n          fill=\"url(#boneGrad)\" stroke=\"#94a3b8\" stroke-width=\"1.4\"/>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 5. 갈비뼈 묶음 (Ribs): 갈비뼈 일곱 쌍 (rib1 ... rib7)               -->\n  <!--    양쪽 끝이 등뼈와 복장뼈에 완전히 닿아 있음 (틈 0)                -->\n  <!--    완벽하게 평행하며 우아한 입체 깊이감 제공                          -->\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <g id=\"ribs\">\n    <g id=\"rib1\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 130 C 212 127, 190 136, 172 138 M 256 130 C 288 127, 310 136, 328 138\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 130 C 212 127, 190 136, 172 138 M 256 130 C 288 127, 310 136, 328 138\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 172 138 C 164 150, 188 146, 239 148 M 328 138 C 336 150, 312 146, 261 148\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 172 138 C 164 150, 188 146, 239 148 M 328 138 C 336 150, 312 146, 261 148\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n    <g id=\"rib2\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 151 C 212 148, 164 158, 146 160 M 256 151 C 288 148, 336 158, 354 160\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 151 C 212 148, 164 158, 146 160 M 256 151 C 288 148, 336 158, 354 160\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 146 160 C 138 172, 188 169, 239 171 M 354 160 C 362 172, 312 169, 261 171\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 146 160 C 138 172, 188 169, 239 171 M 354 160 C 362 172, 312 169, 261 171\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n    <g id=\"rib3\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 174 C 212 171, 146 181, 128 183 M 256 174 C 288 171, 354 181, 372 183\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 174 C 212 171, 146 181, 128 183 M 256 174 C 288 171, 354 181, 372 183\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 128 183 C 120 195, 188 192, 239 194 M 372 183 C 380 195, 312 192, 261 194\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 128 183 C 120 195, 188 192, 239 194 M 372 183 C 380 195, 312 192, 261 194\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n    <g id=\"rib4\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 197 C 212 194, 134 204, 116 206 M 256 197 C 288 194, 366 204, 384 206\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 197 C 212 194, 134 204, 116 206 M 256 197 C 288 194, 366 204, 384 206\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 116 206 C 108 218, 188 215, 239 217 M 384 206 C 392 218, 312 215, 261 217\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 116 206 C 108 218, 188 215, 239 217 M 384 206 C 392 218, 312 215, 261 217\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n    <g id=\"rib5\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 220 C 212 217, 126 227, 108 229 M 256 220 C 288 217, 374 227, 392 229\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 220 C 212 217, 126 227, 108 229 M 256 220 C 288 217, 374 227, 392 229\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 108 229 C 100 241, 188 238, 239 240 M 392 229 C 400 241, 312 238, 261 240\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 108 229 C 100 241, 188 238, 239 240 M 392 229 C 400 241, 312 238, 261 240\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n    <g id=\"rib6\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 243 C 212 240, 123 250, 105 252 M 256 243 C 288 240, 377 250, 395 252\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 243 C 212 240, 123 250, 105 252 M 256 243 C 288 240, 377 250, 395 252\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 105 252 C 97 264, 188 261, 239 263 M 395 252 C 403 264, 312 261, 261 263\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 105 252 C 97 264, 188 261, 239 263 M 395 252 C 403 264, 312 261, 261 263\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n    <g id=\"rib7\">\n      <!-- 뒤쪽 갈비뼈 활 (등뼈에서 시작) -->\n      <path d=\"M 244 265 C 212 262, 124 272, 106 274 M 256 265 C 288 262, 376 272, 394 274\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2.8\" stroke-linecap=\"round\" opacity=\"0.55\"/>\n      <path d=\"M 244 265 C 212 262, 124 272, 106 274 M 256 265 C 288 262, 376 272, 394 274\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1.6\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <!-- 앞쪽 갈비뼈 활 (복장뼈로 결합) -->\n      <path d=\"M 106 274 C 98 286, 188 283, 239 285 M 394 274 C 402 286, 312 283, 261 285\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"4.4\" stroke-linecap=\"round\"/>\n      <path d=\"M 106 274 C 98 286, 188 283, 239 285 M 394 274 C 402 286, 312 283, 261 285\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n    </g>\n  </g>\n\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <!-- 6. 가로막 (Diaphragm): 완전히 내쉰 자세 (위로 볼록한 돔 하나)           -->\n  <!--    좌우 끝: (146, 372) · (354, 372)                                 -->\n  <!--    규격: stroke=\"#f59e0b\", stroke-width=\"9\", fill=\"none\"           -->\n  <!-- ═══════════════════════════════════════════════════════════════════ -->\n  <path id=\"diaphragm\" d=\"M 146 372 Q 250 312 354 372\"\n        fill=\"none\" stroke=\"#f59e0b\" stroke-width=\"9\" stroke-linecap=\"round\"/>";

    function drawBody() {
        bodyGroup = el('g', { id: 'bodyGroup' });
        svg.appendChild(bodyGroup);

        tag(250, 46, '몸속에서 일어나는 일', 'head');

        // 흉강 배경 (갈비뼈 우리와 가로막이 둘러싼 빈 곳)
        chestFill = el('path', { fill: 'rgba(56,189,248,0.12)', stroke: 'none' });
        bodyGroup.appendChild(chestFill);

        // 정밀 인체 도식 (등뼈, 기관, 세 갈래/두 갈래 폐, 복장뼈, 7쌍 갈비뼈, 가로막) 주입
        var temp = document.createElement('div');
        temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + RIBCAGE_INNER + '</svg>';
        var childNodes = Array.from(temp.firstChild.childNodes);
        childNodes.forEach(function (n) {
            bodyGroup.appendChild(n);
        });

        // 애니메이션을 위해 주요 조각 핸들 획득
        ribsGroup = bodyGroup.querySelector('#ribs');
        lungsGroup = bodyGroup.querySelector('#lungs');
        diaphragm = bodyGroup.querySelector('#diaphragm');

        tag(250, 438, '가로막 (횡격막)', 'warm');

        // 공기 드나듦 화살표
        airArrow = el('path', { fill: '#38bdf8' });
        bodyGroup.appendChild(airArrow);
        airText = tag(330, 96, '', 'cool', 'start');
    }

    /* ── 가운데: 종 모형 (고무막 실험) ────────────────────── */
    function drawJar() {
        var g = el('g', { transform: 'translate(470, 0)' });
        svg.appendChild(g);

        tag(590, 46, '종 모형 (고무막 실험)', 'head');

        // ── 유리종 ── 실험 기구로 보이게 유리 반사선을 넣는다.
        // 몸속 그림과 똑같이 생기면 「무엇이 무엇에 해당하는가」를 가르칠 수 없다.
        g.appendChild(el('path', {
            d: 'M30 122 L30 384 L210 384 L210 122 C210 96 176 80 120 80 C64 80 30 96 30 122 Z',
            fill: 'rgba(186,230,253,0.06)', stroke: '#cbd5e1', 'stroke-width': 3.5,
            'stroke-linejoin': 'round'
        }));
        // 유리 반사선 두 줄
        g.appendChild(el('path', {
            d: 'M52 134 C48 190 48 260 52 344', fill: 'none',
            stroke: '#f1f5f9', 'stroke-width': 3.5, 'stroke-linecap': 'round', opacity: 0.5
        }));
        g.appendChild(el('path', {
            d: 'M64 130 C61 176 61 228 64 288', fill: 'none',
            stroke: '#f1f5f9', 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.32
        }));
        // 유리종 바닥 테 (두꺼운 유리)
        g.appendChild(el('rect', { x: 24, y: 380, width: 192, height: 9, rx: 4, fill: '#cbd5e1' }));

        // ── 고무마개와 유리관 ──
        g.appendChild(el('rect', { x: 96, y: 66, width: 48, height: 20, rx: 5, fill: '#78716c' }));
        g.appendChild(el('path', {
            d: 'M120 52 L120 146 M120 146 L94 176 M120 146 L146 176',
            fill: 'none', stroke: '#e2e8f0', 'stroke-width': 6, 'stroke-linecap': 'round'
        }));

        // ── 고무 풍선 두 개 ── 목이 묶여 유리관에 달려 있다
        jarBalloonL = el('path', { fill: '#f9a8b8', stroke: '#fecdd3', 'stroke-width': 2 });
        jarBalloonR = el('path', { fill: '#f9a8b8', stroke: '#fecdd3', 'stroke-width': 2 });
        g.appendChild(jarBalloonL);
        g.appendChild(jarBalloonR);
        // 묶은 자리
        [94, 146].forEach(function (bx) {
            g.appendChild(el('rect', { x: bx - 7, y: 172, width: 14, height: 9, rx: 3, fill: '#e2e8f0' }));
        });
        // 고무의 빛 반사 점
        jarShineL = el('ellipse', { rx: 5, ry: 9, fill: '#ffffff', opacity: 0.45 });
        jarShineR = el('ellipse', { rx: 5, ry: 9, fill: '#ffffff', opacity: 0.45 });
        g.appendChild(jarShineL);
        g.appendChild(jarShineR);

        // ── 고무막 (유리종 바닥을 막은 고무 시트) ──
        jarMembrane = el('path', { fill: 'none', stroke: '#f59e0b', 'stroke-width': 11, 'stroke-linecap': 'round' });
        g.appendChild(jarMembrane);

        // 잡아당기는 손잡이 (고무막 한가운데에 달린 꼭지)
        jarHand = el('path', { fill: 'none', stroke: '#fbbf24', 'stroke-width': 6, 'stroke-linecap': 'round' });
        g.appendChild(jarHand);
        jarKnob = el('circle', { r: 11, fill: '#fbbf24', stroke: '#fef3c7', 'stroke-width': 2.5 });
        g.appendChild(jarKnob);

        tag(590, 470, '고무막 = 가로막 · 풍선 = 폐 · 유리종 = 흉강', 'dim');
    }

    /** 목이 묶인 고무 풍선 모양 */
    function balloonPath(cx, ty, w, h) {
        return 'M' + cx + ' ' + ty +
            ' C' + (cx - w * 0.30) + ' ' + (ty + h * 0.16) +
            ' ' + (cx - w) + ' ' + (ty + h * 0.40) +
            ' ' + (cx - w) + ' ' + (ty + h * 0.68) +
            ' C' + (cx - w) + ' ' + (ty + h * 0.98) +
            ' ' + (cx + w) + ' ' + (ty + h * 0.98) +
            ' ' + (cx + w) + ' ' + (ty + h * 0.68) +
            ' C' + (cx + w) + ' ' + (ty + h * 0.40) +
            ' ' + (cx + w * 0.30) + ' ' + (ty + h * 0.16) +
            ' ' + cx + ' ' + ty + ' Z';
    }

    /* ── 오른쪽: 부피·압력 눈금 ───────────────────────────── */
    function drawGauges() {
        var g = el('g', { transform: 'translate(760, 0)' });
        svg.appendChild(g);

        tag(760, 46, '재어 보기', 'head', 'start');

        // 부피
        tag(760, 92, '흉강 부피', '', 'start');
        g.appendChild(el('rect', { x: 0, y: 104, width: 170, height: 26, rx: 8, fill: 'rgba(148,163,184,0.18)' }));
        volBar = el('rect', { x: 0, y: 104, width: 80, height: 26, rx: 8, fill: '#34d399' });
        g.appendChild(volBar);
        volText = tag(760, 152, '', 'good', 'start');

        // 압력
        tag(760, 208, '흉강 내압 (대기압 760)', '', 'start');
        g.appendChild(el('line', { x1: 0, y1: 240, x2: 170, y2: 240, stroke: '#64748b', 'stroke-width': 3 }));
        g.appendChild(el('line', { x1: 85, y1: 228, x2: 85, y2: 252, stroke: '#facc15', 'stroke-width': 3 }));
        tag(845, 272, '760', 'warm');
        tag(766, 272, '낮음', 'cool', 'start');
        tag(924, 272, '높음', 'warm', 'end');
        presNeedle = el('circle', { r: 9, fill: '#38bdf8', stroke: '#ffffff', 'stroke-width': 2.5, cy: 240 });
        g.appendChild(presNeedle);
        presText = tag(760, 312, '', 'cool', 'start');

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
        placeTags();
        raf = requestAnimationFrame(loop);
    }

    function render() {
        if (!layer || layer.hidden) return;

        var p = pos();                       // 0 ~ 100
        var k = (p - 50) / 50;               // -1 (완전 날숨) ~ +1 (완전 들숨)
        var volumeL = 1.8 + (p / 100) * 2.5; // app.js 와 같은 식
        var pressure = ATM - (p - 50) * 0.16;

        /* 갈비뼈: 들숨이면 위로 들리고 가슴이 넓어진다 */
        if (ribsGroup) {
            var ribLift = -k * 10;
            var ribScaleX = 1 + k * 0.05;
            ribsGroup.setAttribute('transform',
                'translate(' + (250 * (1 - ribScaleX)).toFixed(2) + ', ' + ribLift.toFixed(2) + ') scale(' + ribScaleX.toFixed(3) + ', 1)');
        }

        /* 가로막: 들숨이면 내려가며 평평해지고, 날숨이면 올라가며 볼록해진다 */
        var dY = 372 + k * 26;
        var dome = -k * 46 + 40;               // 위로 볼록한 정도
        if (diaphragm) {
            diaphragm.setAttribute('d',
                'M146 ' + dY.toFixed(1) + ' Q250 ' + (dY - dome).toFixed(1) + ' 354 ' + dY.toFixed(1));
        }

        /* 흉강: 갈비뼈 안쪽과 가로막이 둘러싼 흉강 내면 (해부학적 돔형 경계) */
        if (chestFill) {
            var ribW = 142 + k * 14;
            chestFill.setAttribute('d',
                'M 250 130 ' +
                'C ' + (250 + ribW * 0.7).toFixed(1) + ' 136, ' + (250 + ribW).toFixed(1) + ' 190, ' + (250 + ribW).toFixed(1) + ' 260 ' +
                'C ' + (250 + ribW).toFixed(1) + ' 310, 354 ' + (dY - 10).toFixed(1) + ', 354 ' + dY.toFixed(1) + ' ' +
                'Q 250 ' + (dY - dome).toFixed(1) + ' 146 ' + dY.toFixed(1) + ' ' +
                'C 146 ' + (dY - 10).toFixed(1) + ', ' + (250 - ribW).toFixed(1) + ' 310, ' + (250 - ribW).toFixed(1) + ' 260 ' +
                'C ' + (250 - ribW).toFixed(1) + ' 190, ' + (250 - ribW * 0.7).toFixed(1) + ' 136, 250 130 Z');
        }

        /* 폐: 들숨이면 부풀고, 날숨이면 줄어든다.
           폐 아래는 가로막을 뚫고 내려갈 수 없다 — 가로막이 흉강의 바닥이다.
           그래서 세로 크기는 가로막 꼭대기에서 거꾸로 셈한다. */
        if (lungsGroup) {
            var domeApex = dY - dome / 2;          // 이차 곡선의 꼭대기
            var LUNG_TOP = 136, LUNG_BOTTOM = 362; // 그려진 폐의 위·아래
            var lungScaleX = 1 + k * 0.12;
            var lungScaleY = (domeApex - 6 - LUNG_TOP) / (LUNG_BOTTOM - LUNG_TOP);
            lungScaleY = Math.max(0.68, Math.min(1.24, lungScaleY));
            lungsGroup.setAttribute('transform',
                'translate(' + (250 * (1 - lungScaleX)).toFixed(2) + ', ' + (136 * (1 - lungScaleY)).toFixed(2) + ') ' +
                'scale(' + lungScaleX.toFixed(3) + ', ' + lungScaleY.toFixed(3) + ')');
        }

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
        // 풍선은 목이 유리관에 묶여 있으므로 위쪽은 그대로, 아래로 부푼다
        var bw = 27 + k * 9, bh = 92 + k * 30;
        jarBalloonL.setAttribute('d', balloonPath(94, 178, bw, bh));
        jarBalloonR.setAttribute('d', balloonPath(146, 178, bw, bh));
        setAttrs(jarShineL, { cx: 94 - bw * 0.45, cy: 178 + bh * 0.42 });
        setAttrs(jarShineR, { cx: 146 - bw * 0.45, cy: 178 + bh * 0.42 });
        jarKnob.setAttribute('cx', 120);
        jarKnob.setAttribute('cy', mY + 52);

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
            line = '손잡이를 움직여 가로막을 내려 보세요. 흉강이 넓어지면 압력이 어떻게 되는지 보입니다.';
            color = '#94a3b8';
        }
        if (!verdictTag) verdictTag = tag(500, 516, '', 'verdict');
        verdictTag.textContent = line;
        verdictTag.style.color = color;
        verdictTag.style.borderColor = color;
    }

    /* ── 이름표 (HTML) ─────────────────────────────────────
       그림 좌표(x, y)에 얹되 글씨 크기는 화면 기준으로 고정한다. */
    var TAGS = [];

    function tag(x, y, str, cls, anchor) {
        var e = document.createElement('span');
        e.className = 'breath-tag' + (cls ? ' ' + cls : '');
        e.textContent = str || '';
        e.dataset.anchor = anchor || 'middle';
        tagBox.appendChild(e);
        TAGS.push({ el: e, x: x, y: y });
        return e;
    }

    function placeTags() {
        if (!svg || !tagBox || !layer || layer.hidden) return;
        var box = svg.getBoundingClientRect();
        if (!box.width) return;
        var vb = svg.viewBox.baseVal;
        var k = Math.min(box.width / vb.width, box.height / vb.height);
        var lb = tagBox.getBoundingClientRect();
        var offX = (box.left - lb.left) + (box.width - vb.width * k) / 2;
        var offY = (box.top - lb.top) + (box.height - vb.height * k) / 2;
        TAGS.forEach(function (t) {
            t.el.style.left = (offX + t.x * k) + 'px';
            t.el.style.top = (offY + t.y * k) + 'px';
        });
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


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
