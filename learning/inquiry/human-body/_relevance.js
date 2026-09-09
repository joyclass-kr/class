/**
 * 「이 화면에서 쓸모없는 손잡이」를 재는 잣대.
 *
 * 쓰는 법 — 방을 열고 콘솔에서
 *     fetch('../_relevance.js').then(function(r){return r.text()}).then(eval)
 *     await __relAll()
 *
 * 장면을 하나씩 열고, 그 화면에서 보이는 손잡이를 하나씩 만져 본 뒤
 * 그림이 바뀌는지 본다. 안 바뀌면 이 화면에 있을 까닭이 없는 손잡이다.
 *
 * 두 가지를 조심한다.
 *   창이 잠들면 requestAnimationFrame 이 멈춘다. 그때 재면 죄다 죽은 것으로
 *   나온다 — 그래서 결과에 「틱」을 함께 적는다. 틱이 0 이면 그 값은 버린다.
 *   겹판이 옆칸의 숫자를 읽어 가는 경우가 있어(혈당값), 그림만이 아니라
 *   겹판 안의 글자도 함께 본다.
 */
(function () {
    'use strict';

    if (!window.__ticks) {
        window.__ticks = 0;
        (function tick() { window.__ticks++; requestAnimationFrame(tick); })();
    }

    function frame() {
        return new Promise(function (done) {
            var settled = false;
            var to = setTimeout(function () { if (!settled) { settled = true; done(); } }, 250);
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    if (!settled) { settled = true; clearTimeout(to); done(); }
                });
            });
        });
    }

    function liveLayer() {
        // div 만 본다. 그림(SVG) 안에도 이름이 -layer 로 끝나는 무리가 있어서
        // 그것을 겹판으로 잘못 집으면 손잡이가 0 개로 나온다.
        var ls = [].slice.call(document.querySelectorAll('div[class$="-layer"]'));
        for (var i = 0; i < ls.length; i++) if (!ls[i].hidden) return ls[i];
        return null;
    }

    function hash(c) {
        try {
            var g = c.getContext('2d');
            var d = g.getImageData(0, 0, c.width, c.height).data;
            var h = 0;
            for (var i = 0; i < d.length; i += 388) h = (h * 33 + d[i] + d[i + 1] * 5 + d[i + 2] * 11) % 1e9;
            return 'cv:' + h;
        } catch (e) { return 'cv:?'; }
    }

    var ATTRS = ['d', 'transform', 'opacity', 'fill', 'stroke', 'stroke-width',
        'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'points', 'class'];

    function picture() {
        var p = [];
        var l = liveLayer();
        if (l) {
            l.querySelectorAll('svg *').forEach(function (e) {
                ATTRS.forEach(function (a) {
                    var v = e.getAttribute(a);
                    if (v !== null) p.push(v);
                });
            });
            l.querySelectorAll('span,div,button').forEach(function (e) {
                if (!e.children.length) p.push(e.textContent + '|' + e.className + '|' + e.style.left + '|' + e.style.top);
            });
            l.querySelectorAll('canvas').forEach(function (c) { p.push(hash(c)); });
        }
        var c = document.querySelector('.sim-stage-area canvas');
        if (c && getComputedStyle(c).visibility !== 'hidden') p.push(hash(c));
        return p.join('|');
    }

    function label(el) {
        var t = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 22);
        if (!t) {
            var w = el.closest('.sim-slider-wrapper, .circulation-slider-item');
            var s = w && w.querySelector('.sim-slider-label');
            t = s ? s.textContent.trim() : (el.id || el.tagName.toLowerCase());
        }
        return t;
    }

    function visible(e) {
        var r = e.getBoundingClientRect();
        if (!(r.width > 0 && r.height > 0)) return false;
        for (var p = e; p && p !== document.body; p = p.parentElement) {
            var cs = getComputedStyle(p);
            if (cs.display === 'none' || cs.visibility === 'hidden' || p.hidden) return false;
        }
        return true;
    }

    // 장면 고르는 단추, 갈피 단추, 문제 단추, 멈춤, 뒤로가기는 셈에서 뺀다
    var SKIP = /scene-btn|sidebar-tab-btn|quiz|playPause|nav-back|back-btn/;

    function knobs() {
        return [].slice.call(document.querySelectorAll('.sim-sidebar button, .sim-sidebar input'))
            .filter(function (e) {
                var cls = (e.className && e.className.baseVal !== undefined) ? e.className.baseVal : (e.className || '');
                if (SKIP.test(cls) || SKIP.test(e.id || '')) return false;
                if (e.closest('#quizContainer')) return false;
                return visible(e);
            });
    }

    function operate(el) {
        if (el.tagName === 'INPUT' && el.type === 'range') {
            var min = +el.min || 0, max = +el.max || 100, cur = +el.value;
            var to = (cur - min) > (max - cur) ? min : max;
            if (to === cur) to = (min + max) / 2;
            el.value = to;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return function () { el.value = cur; el.dispatchEvent(new Event('input', { bubbles: true })); };
        }
        el.click();
        return function () { };
    }

    window.__scenes = function () {
        return [].slice.call(document.querySelectorAll('.scene-btn')).map(function (b) { return b.dataset.scene; });
    };

    /*
     * 걸음마다 끊어 재는 길.
     *
     * 도구로 원격 조종할 때는 스크립트가 도는 동안 화면 갱신이 아예 멈춘다.
     * (1초를 기다려도 틱이 0 이었다. 화면을 한 장 찍어야 그제서야 몇 틱 돈다.)
     * 그래서 한 번의 부름 안에서 「만지고 → 기다리고 → 본다」를 할 수 없다.
     * 만지는 부름과 보는 부름을 갈라 두고, 그 사이에 화면을 한 장 찍는다.
     *
     *   __prep('heart') → 화면 찍기 → __poke(0) → 화면 찍기 → __read(0)
     *   → __poke(1) → 화면 찍기 → __read(1) → … → __result()
     *
     * 되돌리기는 하지 않는다. 손잡이끼리는 서로 방해하지 않고,
     * 되돌리면 그 사이에 또 한 틱이 필요해져 걸음이 두 배로 는다.
     */
    var st = null;

    /*
     * 이 장면이 스스로 움직이는가.
     *
     * 스스로 움직이는 장면(피 흐르는 심장, 원심분리기)에서는 손잡이를 안 만져도
     * 그림이 매 틱 달라진다. 그러면 「만졌더니 바뀌었다」가 아무 뜻이 없다.
     * 그래서 손잡이를 재기 전에 먼저 이것부터 잰다.
     *   __idle0() → 화면 찍기 → __idle1()
     */
    var idleBefore = null;

    window.__idle0 = function () { idleBefore = picture(); return '잼'; };
    window.__idle1 = function () {
        return (idleBefore !== null && picture() !== idleBefore) ? '스스로 움직임' : '멈춰 있음';
    };

    window.__prep = function (scene) {
        var b = document.querySelector('.scene-btn[data-scene="' + scene + '"]');
        if (b) b.click();
        st = { 장면: scene, ks: knobs(), dead: [], live: 0, before: null };
        return { 장면: scene, 보임: st.ks.length };
    };

    window.__poke = function (i) {
        if (!st || !st.ks[i]) return '없음';
        st.before = picture();
        try { operate(st.ks[i]); } catch (e) { return '못 만짐'; }
        return label(st.ks[i]);
    };

    window.__read = function (i) {
        if (!st || !st.ks[i]) return '없음';
        if (picture() === st.before) st.dead.push(label(st.ks[i]));
        else st.live++;
        return st.dead.length ? ('죽음 ' + st.dead.length) : '삶';
    };

    window.__result = function () {
        if (!st) return '먼저 __prep 을 부르세요';
        return { 장면: st.장면, 보임: st.ks.length, 산것: st.live, 죽은것: st.dead };
    };

    window.__rel = async function (scene) {
        var t0 = window.__ticks;
        var b = document.querySelector('.scene-btn[data-scene="' + scene + '"]');
        if (b) b.click();
        await frame(); await frame();

        var ks = knobs(), dead = [], live = 0;
        for (var i = 0; i < ks.length; i++) {
            var before = picture();
            var undo;
            try { undo = operate(ks[i]); } catch (e) { continue; }
            await frame();
            if (before === picture()) dead.push(label(ks[i])); else live++;
            try { undo(); } catch (e) { }
            await frame();
        }
        return { 장면: scene, 보임: ks.length, 산것: live, 죽은것: dead, 틱: window.__ticks - t0 };
    };

    window.__relAll = async function () {
        var out = [];
        var list = window.__scenes();
        for (var i = 0; i < list.length; i++) out.push(await window.__rel(list[i]));
        return out;
    };

    return '준비됨 — await __relAll()';
})();

/*
 * 「눌러도 설명이 안 보인다」를 잡는 잣대.
 *
 * 겹판들은 설명을 옆칸의 기관 설명 칸(#organTitle/#organDesc)에 쓴다.
 * 그런데 그 칸이 지금 안 보이는 갈피 안에 들어 있으면, 눌러도 아무 말이 없다.
 * 실제로 자율신경 장면이 그랬다 — 방이 스스로 다른 갈피로 옮겨 놓아서다.
 *
 *   await __says('autonomic')   → 무엇을 눌렀고, 그 글이 어디에 보였는지
 */
(function () {
    'use strict';

    function seen(el) {
        if (!el) return false;
        var r = el.getBoundingClientRect();
        if (!(r.width > 0 && r.height > 0)) return false;
        for (var p = el; p && p !== document.body; p = p.parentElement) {
            var cs = getComputedStyle(p);
            if (cs.display === 'none' || cs.visibility === 'hidden' || p.hidden) return false;
        }
        return true;
    }

    window.__says = async function (scene) {
        var b = document.querySelector('.scene-btn[data-scene="' + scene + '"]');
        if (b) b.click();
        await new Promise(function (r) { setTimeout(r, 150); });

        var layer = [].slice.call(document.querySelectorAll('div[class$="-layer"]')).filter(function (x) { return !x.hidden; })[0];
        if (!layer) return { 장면: scene, 결과: '겹판 없음' };

        // 이름표 가운데는 누르는 것이 아니라 그냥 적어 둔 안내글도 있다
        // (동공 반사 화면의 「자극이 지나가는 길」, 피부 화면의 「만들어 내는 열」).
        // 겹판이 누를 것에 clickable 을 달아 두었으면 그것만 본다 — 겹판이
        // 스스로 「이건 누르는 것」이라고 적어 둔 셈이니 가장 믿을 만하다.
        var 안내 = /head|warm|note|cap|title|lead|legend/;
        var 모두 = [].slice.call(layer.querySelectorAll('span,div')).filter(function (e) {
            return !e.children.length && e.textContent.trim() && seen(e);
        });
        var 눌림 = 모두.filter(function (e) { return /clickable/.test(e.className); });
        var tags = 눌림.length ? 눌림 : 모두.filter(function (e) {
            return /tag/.test(e.className) && !안내.test(e.className);
        });
        if (!tags.length) return { 장면: scene, 결과: '누를 이름표가 없다' };

        var pick = tags[Math.floor(tags.length / 2)];
        var 이름 = pick.textContent.trim();
        pick.click();
        await new Promise(function (r) { setTimeout(r, 80); });

        // 그 이름이 화면 어딘가에 보이는가.
        // 겹판마다 설명을 놓는 자리가 다르다 — 어떤 것은 #eyeDetail, 어떤 것은
        // .ear-caption, 어떤 것은 옆칸의 #organTitle 이다. 이름으로 찾으면
        // 자리를 새로 만들 때마다 잣대를 고쳐야 하니, 그냥 보이는 것을 다 훑는다.
        var 낱말 = 이름.split(/[\s(]/)[0];
        var 보인곳 = [];
        [].slice.call(document.querySelectorAll('#organTitle, #organDesc'))
            .concat([].slice.call(layer.querySelectorAll('*')))
            .forEach(function (e) {
                if (e === pick || pick.contains(e) || e.contains(pick)) return;   // 누른 이름표 자신은 뺀다
                if (e.children.length) return;
                if (!seen(e)) return;
                if (e.textContent.indexOf(낱말) >= 0) 보인곳.push(e.id || e.className || e.tagName);
            });
        return { 장면: scene, 누름: 이름, 보인곳: 보인곳, 판정: 보인곳.length ? '보인다 ✔' : '어디에도 안 보인다 ✘' };
    };

    window.__saysAll = async function () {
        var out = [];
        var list = [].slice.call(document.querySelectorAll('.scene-btn')).map(function (b) { return b.dataset.scene; });
        for (var i = 0; i < list.length; i++) out.push(await window.__says(list[i]));
        return out;
    };
})();

/*
 * 「음식이 관 밖을 지나간다」를 잡는 잣대.
 *
 * 음식 구슬이 지나는 길은 좌표로 적어 두는데, 옆방이 그림을 다시 그리면
 * 그 좌표가 관 밖으로 밀려난다. 실제로 소장을 다시 받았을 때 두 점이
 * 빈 곳이 되어 음식이 배 속을 가로질렀다.
 *
 *   await __routeCheck()   → 길을 촘촘히 훑어 관 밖으로 나간 자리를 센다
 */
(function () {
    'use strict';

    var TRACT = ['mouth', 'esophagus', 'stomach', 'duodenum',
        'smallIntestine', 'largeIntestine', 'rectum', 'anus', 'cecum', 'colon'];

    function shapes(g) {
        var SEL = 'path,rect,ellipse,circle,polygon,polyline,line';
        return g.matches(SEL) ? [g] : [].slice.call(g.querySelectorAll(SEL));
    }

    /** 길 전체를 촘촘히 훑어 관 밖으로 나간 자리를 센다 */
    window.__routeWalk = function () {
        var svg = [].slice.call(document.querySelectorAll('svg'))
            .filter(function (s) { return s.querySelector('#smallIntestine'); })[0];
        var route = window.__tractRoute;
        if (!svg || !route) return '길을 찾지 못했습니다 (겹판이 아직 안 떴을 수 있습니다)';

        var parts = [];
        TRACT.forEach(function (id) {
            var e = svg.querySelector('#' + id);
            if (e) shapes(e).forEach(function (s) { parts.push({ id: id, el: s }); });
        });
        function 어디(x, y) {
            var p = svg.createSVGPoint(); p.x = x; p.y = y;
            for (var i = 0; i < parts.length; i++) {
                try { if (parts[i].el.isPointInFill(p) || parts[i].el.isPointInStroke(p)) return parts[i].id; }
                catch (e) { }
            }
            return null;
        }

        var 밖 = [], 총 = 0;
        for (var i = 0; i < route.length - 1; i++) {
            var a = route[i], b = route[i + 1];
            var d = Math.hypot(b.x - a.x, b.y - a.y);
            var n = Math.max(1, Math.round(d / 2));
            for (var j = 0; j <= n; j++) {
                var x = a.x + (b.x - a.x) * j / n;
                var y = a.y + (b.y - a.y) * j / n;
                총++;
                if (!어디(x, y)) 밖.push(Math.round(x) + ',' + Math.round(y));
            }
        }
        return { 잰자리: 총, 관밖: 밖.length, 어디: 밖.slice(0, 12) };
    };

    window.__routeCheck = async function () {
        var svg = [].slice.call(document.querySelectorAll('svg'))
            .filter(function (s) { return s.querySelector('#smallIntestine'); })[0];
        if (!svg) return '소화관 그림을 찾지 못했습니다';

        var parts = [];
        TRACT.forEach(function (id) {
            var e = svg.querySelector('#' + id);
            if (e) shapes(e).forEach(function (s) { parts.push({ id: id, el: s }); });
        });

        function 어디(x, y) {
            var p = svg.createSVGPoint(); p.x = x; p.y = y;
            for (var i = 0; i < parts.length; i++) {
                try { if (parts[i].el.isPointInFill(p) || parts[i].el.isPointInStroke(p)) return parts[i].id; }
                catch (e) { }
            }
            return null;
        }

        // 겹판이 실제로 쓰는 길을 알 수 없으니, 구슬을 굴려 가며 자리를 본다.
        // 화면 갱신이 도구 부름 사이에만 도니 여기서는 길 자체를 다시 떠서 잰다.
        var b = document.getElementById('swallowBtn');
        var bolus = svg.querySelector('#bolus') || svg.querySelector('circle[r]');
        if (!b || !bolus) return '삼키기 단추나 음식 구슬을 찾지 못했습니다';

        return { 안내: '단추를 눌러 굴린 뒤 __routeSpot() 을 여러 번 부르세요' };
    };

    window.__routeSpot = function () {
        var svg = [].slice.call(document.querySelectorAll('svg'))
            .filter(function (s) { return s.querySelector('#smallIntestine'); })[0];
        if (!svg) return '없음';
        var cands = [].slice.call(svg.querySelectorAll('circle')).filter(function (c) {
            return c.getAttribute('opacity') === '1';
        });
        var bolus = cands[cands.length - 1];
        if (!bolus) return '구슬 안 보임';
        var x = +bolus.getAttribute('cx'), y = +bolus.getAttribute('cy');

        var parts = [];
        TRACT.forEach(function (id) {
            var e = svg.querySelector('#' + id);
            if (e) shapes(e).forEach(function (s) { parts.push({ id: id, el: s }); });
        });
        var p = svg.createSVGPoint(); p.x = x; p.y = y;
        var hit = null;
        for (var i = 0; i < parts.length && !hit; i++) {
            try { if (parts[i].el.isPointInFill(p) || parts[i].el.isPointInStroke(p)) hit = parts[i].id; }
            catch (e) { }
        }
        return Math.round(x) + ',' + Math.round(y) + ' → ' + (hit || '✘ 관 밖');
    };
})();

/*
 * 무대 위 손잡이 훑기.
 *
 * 정적 잣대(_controls-check.js)는 index.html 에 적힌 손잡이만 본다.
 * 그런데 겹판은 자기 무대 위에 단추를 스스로 만들어 붙인다 —
 * 방어 작용의 단계 단추, 반사궁의 갈래 단추, 귀의 세 가지 느끼기 같은 것.
 * 그것들은 글에 안 적혀 있으니 코드로는 셀 수 없다. 여기서 센다.
 *
 *   __stage()        지금 화면의 무대 위 손잡이 목록
 *   __stagePoke(i)   i 번째를 만진다 (그 다음 화면을 한 장 찍을 것)
 *   __stageRead(i)   그림이 바뀌었는지 본다
 */
(function () {
    'use strict';

    function seen(el) {
        var r = el.getBoundingClientRect();
        if (!(r.width > 0 && r.height > 0)) return false;
        for (var p = el; p && p !== document.body; p = p.parentElement) {
            var cs = getComputedStyle(p);
            if (cs.display === 'none' || cs.visibility === 'hidden' || p.hidden) return false;
        }
        return true;
    }

    function liveLayer() {
        // div 만 본다. 그림(SVG) 안에도 이름이 -layer 로 끝나는 무리가 있어서
        // 그것을 겹판으로 잘못 집으면 손잡이가 0 개로 나온다.
        var ls = [].slice.call(document.querySelectorAll('div[class$="-layer"]'));
        for (var i = 0; i < ls.length; i++) if (!ls[i].hidden) return ls[i];
        return null;
    }

    function shot() {
        var l = liveLayer();
        var p = [];
        if (l) {
            l.querySelectorAll('svg *').forEach(function (e) {
                ['d', 'transform', 'opacity', 'fill', 'stroke', 'stroke-width',
                 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'points', 'class'].forEach(function (a) {
                    var v = e.getAttribute(a);
                    if (v !== null) p.push(v);
                });
            });
            l.querySelectorAll('span,div,button').forEach(function (e) {
                if (!e.children.length) p.push(e.textContent + '|' + e.className);
            });
        }
        return p.join('|');
    }

    var st = null;

    window.__stage = function () {
        var l = liveLayer();
        if (!l) return { 겹판: '없음', 손잡이: [] };
        var ks = [].slice.call(l.querySelectorAll('button,input,select')).filter(function (e) {
            var cls = e.className || '';
            if (/scene-btn/.test(cls)) return false;
            return seen(e);
        });
        st = { ks: ks, dead: [], live: 0, before: null };
        return {
            겹판: l.className,
            손잡이: ks.map(function (e) { return (e.textContent || e.id || e.type).replace(/\s+/g, ' ').trim().slice(0, 22); })
        };
    };

    window.__stagePoke = function (i) {
        if (!st || !st.ks[i]) return '없음';
        st.before = shot();
        var e = st.ks[i];
        if (e.tagName === 'INPUT' && e.type === 'range') {
            var min = +e.min || 0, max = +e.max || 100, cur = +e.value;
            e.value = (cur - min) > (max - cur) ? min : max;
            e.dispatchEvent(new Event('input', { bubbles: true }));
        } else e.click();
        return (e.textContent || e.id).replace(/\s+/g, ' ').trim().slice(0, 22);
    };

    window.__stageRead = function (i) {
        if (!st || !st.ks[i]) return '없음';
        var name = (st.ks[i].textContent || st.ks[i].id).replace(/\s+/g, ' ').trim().slice(0, 22);
        if (shot() === st.before) { st.dead.push(name); return '✘ ' + name; }
        st.live++;
        return '✔ ' + name;
    };

    window.__stageResult = function () {
        if (!st) return '먼저 __stage 를 부르세요';
        return { 보임: st.ks.length, 산것: st.live, 죽은것: st.dead };
    };
})();
