'use strict';

/* Four journeys through the body, with the real numbers attached. The one
   worth arriving at: a resting heart moves about five litres a minute and the
   body holds about five litres of blood, so the whole lot goes round roughly
   once a minute — and while running, once every seventeen seconds. Digestion
   and the kidneys, meanwhile, do not speed up at all. */

const BLOOD_ML = 5000;   // roughly what a 40 kg child carries

const ACTS = {
    rest: { name: '쉴 때', hr: 70, sv: 70, br: 15, tv: 500 },
    walk: { name: '걸을 때', hr: 100, sv: 85, br: 25, tv: 600 },
    run: { name: '달릴 때', hr: 160, sv: 110, br: 40, tv: 800 },
};

const SYSTEMS = {
    dig: {
        name: '소화 기관', mover: '음식', colour: '#e0b070', unit: '시간',
        label: '음식이 다 지나가는 시간',
        organs: [
            { n: '입', x: 150, y: 34, w: 26, h: 14, note: '이로 잘게 부수고 침을 섞습니다', stay: '30초' },
            { n: '식도', x: 150, y: 64, w: 12, h: 26, note: '꿈틀 운동으로 위까지 밀어 내립니다', stay: '7초' },
            { n: '위', x: 134, y: 100, w: 40, h: 30, note: '위액과 섞어 죽처럼 만듭니다', stay: '3시간' },
            { n: '작은창자', x: 150, y: 140, w: 52, h: 30, note: '영양소를 빨아들여 피로 보냅니다', stay: '5시간' },
            { n: '큰창자', x: 150, y: 176, w: 58, h: 18, note: '물을 빨아들이고 찌꺼기를 모읍니다', stay: '16시간' },
        ],
    },
    resp: {
        name: '호흡 기관', mover: '공기', colour: '#7fd4f0', unit: 'L/분',
        label: '1분에 들이마시는 공기',
        organs: [
            { n: '코', x: 150, y: 32, w: 20, h: 14, note: '먼지를 거르고 공기를 데웁니다', stay: '한순간' },
            { n: '기관', x: 150, y: 62, w: 12, h: 28, note: '목에서 가슴까지 곧게 내려갑니다', stay: '한순간' },
            { n: '기관지', x: 150, y: 92, w: 34, h: 14, note: '좌우 폐로 갈라집니다', stay: '한순간' },
            { n: '폐포', x: 150, y: 126, w: 62, h: 34, note: '산소를 피에 주고 이산화 탄소를 받습니다', stay: '숨 한 번' },
        ],
    },
    circ: {
        name: '순환 기관', mover: '피', colour: '#ff8a8a', unit: 'L/분',
        label: '1분에 내보내는 피',
        organs: [
            { n: '심장', x: 148, y: 104, w: 30, h: 34, note: '펌프처럼 피를 밀어 보냅니다', stay: '한 번 뜀' },
            { n: '동맥', x: 182, y: 140, w: 12, h: 44, note: '굵고 튼튼한 관으로 피가 힘차게 흘러 나갑니다', stay: '몇 초' },
            { n: '모세혈관', x: 150, y: 186, w: 68, h: 12, note: '온몸 구석구석에서 산소를 건넵니다', stay: '1초쯤' },
            { n: '정맥', x: 118, y: 140, w: 12, h: 44, note: '온몸을 돈 피가 심장으로 돌아옵니다', stay: '몇 초' },
        ],
    },
    excr: {
        name: '배설 기관', mover: '찌꺼기', colour: '#a8d6b0', unit: 'L/일',
        label: '하루에 거르는 피',
        organs: [
            { n: '콩팥', x: 150, y: 108, w: 56, h: 26, note: '피 속 찌꺼기를 걸러 냅니다', stay: '늘' },
            { n: '오줌관', x: 150, y: 144, w: 10, h: 30, note: '콩팥에서 방광까지 내려갑니다', stay: '몇 초' },
            { n: '방광', x: 150, y: 176, w: 34, h: 22, note: '오줌을 모아 두었다가 내보냅니다', stay: '몇 시간' },
        ],
    },
};

const state = {
    sys: 'circ', act: 'rest',
    prediction: null, checked: false,
    running: false, t: 0, phase: 0,
};

const $ = id => document.getElementById(id);
const svgNS = 'http://www.w3.org/2000/svg';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = (v, d) => v.toFixed(d).replace('-', '−');
// 음식은, 공기는 — the particle follows the final consonant.
function eun(w) {
    const ch = w.charCodeAt(w.length - 1);
    const jong = ch >= 0xac00 && ch <= 0xd7a3 && (ch - 0xac00) % 28 !== 0;
    return w + (jong ? '은' : '는');
}

// What this system gets through, in its own units. Digestion and excretion do
// not speed up when you run, and that is the point of asking.
function output(sys, act) {
    const a = ACTS[act];
    if (sys === 'circ') return a.hr * a.sv / 1000;
    if (sys === 'resp') return a.br * a.tv / 1000;
    if (sys === 'dig') return 24;
    return 180;
}
function ratio(sys, act) { return output(sys, act) / output(sys, 'rest'); }
function verdictFor(sys, act) {
    const r = ratio(sys, act);
    return r < 1.4 ? 'p1' : (r < 2.8 ? 'p2' : 'p3');
}

function analyse() {
    const s = SYSTEMS[state.sys], a = ACTS[state.act];
    const out = output(state.sys, state.act);
    return {
        sys: s, act: a, out, ratio: ratio(state.sys, state.act),
        // How long the whole blood supply takes to go round once.
        lapSec: 60 * BLOOD_ML / (a.hr * a.sv),
        verdict: verdictFor(state.sys, state.act),
    };
}

function el(tag, attrs, text) {
    const n = document.createElementNS(svgNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    return n;
}

function drawBody(g) {
    const a = analyse();
    const organs = a.sys.organs;
    const stepAt = state.running ? Math.min(organs.length - 1, Math.floor(state.t * organs.length)) : -1;

    g.appendChild(el('path', {
        d: 'M 150 18 q 16 0 16 14 q 0 8 -6 12 q 22 6 26 26 l 4 44 q 1 8 -7 8 l -4 0 l -2 48 q -1 30 -6 40 l -3 0 l -4 -40 l -8 0 l -4 40 l -3 0 q -5 -10 -6 -40 l -2 -48 l -4 0 q -8 0 -7 -8 l 4 -44 q 4 -20 26 -26 q -6 -4 -6 -12 q 0 -14 16 -14 Z',
        class: 'body-outline',
    }));

    let d = '';
    organs.forEach((o, i) => { d += `${i ? 'L' : 'M'} ${o.x} ${o.y} `; });
    if (state.sys === 'circ') d += `L ${organs[0].x} ${organs[0].y} `;
    g.appendChild(el('path', { d, class: 'path-line' }));

    organs.forEach((o, i) => {
        const here = i === stepAt;
        g.appendChild(el('ellipse', {
            cx: o.x, cy: o.y, rx: o.w / 2, ry: o.h / 2,
            class: `organ${here ? ' here' : ''}`, style: `fill:${a.sys.colour}${here ? '' : '99'}`,
        }));
    });

    // The traveller walks the same path the organs sit on.
    if (state.running) {
        const n = organs.length;
        const legs = state.sys === 'circ' ? n : n - 1;
        const p = clamp(state.t, 0, 0.999) * legs;
        const i = Math.floor(p), f = p - i;
        const from = organs[i % n], to = organs[(i + 1) % n];
        g.appendChild(el('circle', {
            cx: from.x + (to.x - from.x) * f, cy: from.y + (to.y - from.y) * f,
            r: 6, class: 'traveller', style: `fill:${a.sys.colour}`,
        }));
    }

    // A heart that beats at the rate the numbers say.
    if (state.sys === 'circ') {
        const beat = (state.phase * a.act.hr / 60) % 1;
        g.appendChild(el('ellipse', {
            cx: organs[0].x, cy: organs[0].y, rx: 15 + beat * 6, ry: 17 + beat * 6,
            class: 'beat-ring', style: `opacity:${fmt(0.7 - beat * 0.7, 2)}`,
        }));
    }

    g.appendChild(el('text', { x: 20, y: 22, class: 'small-label' }, `${a.sys.name} · ${a.act.name}`));
    g.appendChild(el('text', { x: 20, y: 44, class: 'big-read' }, `${fmt(a.out, a.out < 10 ? 1 : 0)} ${a.sys.unit}`));
    g.appendChild(el('text', { x: 20, y: 60, class: 'tiny-label' }, a.sys.label));
    if (state.sys === 'circ') {
        g.appendChild(el('text', { x: 20, y: 84, class: 'note-text' }, '피 5 L가 몸을 한 바퀴'));
        g.appendChild(el('text', { x: 20, y: 100, class: 'read-text' }, `${fmt(a.lapSec, 0)}초`));
    }

    // The journey, listed in order beside the body.
    g.appendChild(el('text', { x: 244, y: 22, class: 'small-label' }, `${a.sys.mover}가 지나는 차례`));
    organs.forEach((o, i) => {
        const here = i === stepAt;
        const y = 44 + i * 32;
        g.appendChild(el('circle', { cx: 252, cy: y - 4, r: 8, class: 'organ', style: `fill:${a.sys.colour}${here ? '' : '77'}` }));
        g.appendChild(el('text', { x: 252, y: y - 1, 'text-anchor': 'middle', class: 'tiny-label', style: 'fill:#10202a;font-weight:900' }, String(i + 1)));
        g.appendChild(el('text', { x: 266, y: y - 6, class: `step-text${here ? ' here' : ''}` }, `${o.n} · ${o.stay}`));
        g.appendChild(el('text', { x: 266, y: y + 7, class: 'tiny-label' }, o.note));
    });
}

function drawGraph(g) {
    const a = analyse();
    const x0 = 54, x1 = 440, yTop = 30, yBot = 146;
    const keys = ['rest', 'walk', 'run'];
    const top = Math.max(...keys.map(k => output(state.sys, k))) * 1.25;
    const Y = v => yBot - (v / top) * (yBot - yTop);
    const slot = (x1 - x0) / keys.length;

    for (let i = 0; i <= 4; i += 1) {
        const v = top * i / 4;
        g.appendChild(el('line', { x1: x0, y1: Y(v), x2: x1, y2: Y(v), class: 'grid-line' }));
        if (i > 0) g.appendChild(el('text', { x: x0 - 6, y: Y(v) + 3.5, 'text-anchor': 'end', class: 'axis-text' }, fmt(v, v < 10 ? 1 : 0)));
    }
    g.appendChild(el('line', { x1: x0, y1: yBot, x2: x1, y2: yBot, class: 'axis' }));
    g.appendChild(el('line', { x1: x0, y1: yTop, x2: x0, y2: yBot, class: 'axis' }));

    keys.forEach((k, i) => {
        const cx = x0 + slot * (i + 0.5);
        const v = output(state.sys, k), on = k === state.act;
        const bw = Math.min(64, slot * 0.5);
        g.appendChild(el('rect', {
            x: cx - bw / 2, y: Y(v), width: bw, height: yBot - Y(v), rx: 3, class: 'bar',
            style: `fill:${a.sys.colour}${on ? '' : '66'}`,
        }));
        g.appendChild(el('text', { x: cx, y: Y(v) - 6, 'text-anchor': 'middle', class: 'bar-text', style: `fill:${on ? '#54e6c1' : '#9cb6b4'}` },
            `${fmt(v, v < 10 ? 1 : 0)} ${a.sys.unit}`));
        g.appendChild(el('text', { x: cx, y: yBot + 15, 'text-anchor': 'middle', class: 'axis-text', style: on ? 'fill:#54e6c1' : '' }, ACTS[k].name));
        g.appendChild(el('text', { x: cx, y: yBot + 28, 'text-anchor': 'middle', class: 'tiny-label' }, `쉴 때의 ${fmt(ratio(state.sys, k), 1)}배`));
    });

    g.appendChild(el('text', { x: (x0 + x1) / 2, y: 191, 'text-anchor': 'middle', class: 'axis-title' }, `무엇을 하고 있느냐에 따른 ${a.sys.label}`));
}

function render() {
    const m = $('mainGroup'), gr = $('graphGroup');
    m.textContent = ''; gr.textContent = '';
    drawBody(m); drawGraph(gr);
    updateReadout();
}

const WORDS = { p1: '거의 같다', p2: '2배쯤', p3: '4배쯤' };

function updateReadout() {
    const a = analyse();
    $('stageBadge').textContent = `${a.sys.name} · ${a.act.name}`;
    $('labelA').textContent = a.sys.label;
    $('valueA').textContent = `${fmt(a.out, a.out < 10 ? 1 : 0)} ${a.sys.unit}`;
    $('valueB').textContent = `${fmt(a.ratio, 1)}배`;
    const rows = [
        ['지나는 차례', a.sys.organs.map(o => o.n).join(' → '), false],
        ['심장이 뛰는 횟수', `1분에 ${a.act.hr}번`, false],
        ['숨 쉬는 횟수', `1분에 ${a.act.br}번`, false],
        ['1분에 내보내는 피', `${fmt(a.act.hr * a.act.sv / 1000, 1)} L`, state.sys === 'circ'],
        ['1분에 마시는 공기', `${fmt(a.act.br * a.act.tv / 1000, 1)} L`, state.sys === 'resp'],
        ['피가 한 바퀴 도는 시간', `${fmt(a.lapSec, 0)}초`, false],
    ];
    $('dataNote').innerHTML = rows.map(([n, v, m]) =>
        `<div class="data-row${m ? ' match' : ''}"><span class="data-name">${n}</span><span class="data-val">${v}</span></div>`).join('');
    if (state.checked) explain(a);
}

function explain(a) {
    $('resultEmpty').hidden = true;
    $('resultContent').hidden = false;
    const v = a.verdict;
    if (state.prediction) {
        const ok = state.prediction === v;
        $('predictionResult').textContent = ok ? `예상이 맞았습니다 — ${WORDS[v]}.`
            : `예상은 ${WORDS[state.prediction]}였지만 결과는 ${WORDS[v]}입니다.`;
        $('predictionResult').className = `prediction-result ${ok ? 'correct' : 'wrong'}`;
    } else {
        $('predictionResult').textContent = '';
        $('predictionResult').className = 'prediction-result';
    }

    const first = a.sys.organs[0], last = a.sys.organs[a.sys.organs.length - 1];
    let s = `${eun(a.sys.mover)} ${a.sys.organs.map(o => o.n).join(' → ')} 차례로 지나갑니다. `;
    // The notes are whole sentences and are used as they stand; trying to bend
    // them into a clause by trimming the ending produced nonsense.
    s += `맨 처음 ${first.n}에서는 ${first.note}. `;
    s += `그리고 마지막 ${last.n}에서는 ${last.note}. `;

    if (state.sys === 'circ') {
        s += `${a.act.name} 심장은 1분에 ${a.act.hr}번 뛰고 한 번에 ${a.act.sv} mL를 내보내므로, 1분에 ${a.act.hr} × ${a.act.sv} = ${fmt(a.out * 1000, 0)} mL, 곧 ${fmt(a.out, 1)} L를 보냅니다. `;
        s += `우리 몸에 든 피가 모두 5 L쯤이니, 피 전체가 몸을 한 바퀴 도는 데 ${fmt(a.lapSec, 0)}초밖에 걸리지 않습니다. `;
    } else if (state.sys === 'resp') {
        s += `${a.act.name} 숨은 1분에 ${a.act.br}번 쉬고 한 번에 ${a.act.tv} mL를 마시므로, 1분에 ${fmt(a.out, 1)} L의 공기가 드나듭니다. `;
        s += `그 공기에서 산소만 폐포를 지나 피로 넘어가고, 피가 실어 온 이산화 탄소는 반대로 나옵니다. `;
    } else if (state.sys === 'dig') {
        s += `먹은 음식이 몸을 다 지나는 데는 모두 ${a.out}시간쯤 걸립니다. 대부분은 큰창자에서 물을 빼앗기며 보내는 시간입니다. `;
    } else {
        s += `콩팥은 하루에 피를 ${a.out} L나 거르지만 오줌은 1.5 L밖에 나오지 않습니다. 걸러 낸 것의 99%를 다시 몸으로 돌려보내기 때문입니다. `;
    }

    if (v === 'p1') {
        s += state.act === 'rest'
            ? `지금은 쉬는 중이니 이것이 기준이 되는 값입니다. `
            : `${a.act.name}에도 이 기관계가 하는 일은 쉴 때와 거의 같습니다. 몸은 급한 일부터 하는데, 소화나 배설은 잠시 미뤄도 괜찮은 일이기 때문입니다. `;
    } else {
        s += `${a.act.name}는 쉴 때의 ${fmt(a.ratio, 1)}배로 일합니다. 달리는 근육이 산소를 훨씬 많이 쓰기 때문입니다. `;
    }
    s += `한 가지만 기억해 두세요. 기관들은 따로 떨어져 일하지 않습니다. 소화 기관이 얻은 영양소도, 호흡 기관이 들인 산소도 결국 피에 실려 온몸으로 갑니다.`;
    $('elementaryExplanation').textContent = s;
}

// --- animation --------------------------------------------------------------
function tick(dt) {
    state.phase += dt;
    if (!state.running) return false;
    state.t = Math.min(1, state.t + dt / 7);
    if (state.t >= 1) {
        state.running = false;
        $('runBtn').textContent = '따라가 보기';
        state.checked = true;
        return true;
    }
    return false;
}

let last = 0;
function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    tick(dt);
    render();
    requestAnimationFrame(frame);
}

// --- wiring -----------------------------------------------------------------
function markSelected(sel, attr, value) {
    document.querySelectorAll(sel).forEach(b => b.classList.toggle('selected', b.dataset[attr] === String(value)));
}

document.querySelectorAll('[data-sys]').forEach(b => b.addEventListener('click', () => {
    state.sys = b.dataset.sys; markSelected('[data-sys]', 'sys', state.sys); render();
}));
document.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
    state.act = b.dataset.act; markSelected('[data-act]', 'act', state.act); render();
}));
document.querySelectorAll('[data-prediction]').forEach(b => b.addEventListener('click', () => {
    state.prediction = b.dataset.prediction; markSelected('[data-prediction]', 'prediction', state.prediction);
}));
$('runBtn').addEventListener('click', () => {
    if (state.running) { state.running = false; $('runBtn').textContent = '따라가 보기'; return; }
    state.t = 0; state.running = true; state.checked = true;
    $('runBtn').textContent = '멈추기';
    render();
});
$('resetBtn').addEventListener('click', () => {
    state.sys = 'circ'; state.act = 'rest';
    state.prediction = null; state.checked = false; state.running = false; state.t = 0;
    $('runBtn').textContent = '따라가 보기';
    document.querySelectorAll('[data-prediction]').forEach(x => x.classList.remove('selected'));
    $('resultEmpty').hidden = false; $('resultContent').hidden = true;
    markSelected('[data-sys]', 'sys', 'circ'); markSelected('[data-act]', 'act', 'rest');
    render();
});

document.querySelectorAll('.quiz-card').forEach(card => {
    card.querySelector('.answer-button').addEventListener('click', () => {
        const picked = card.querySelector('input:checked');
        const result = card.querySelector('.answer-result');
        const why = card.querySelector('.answer-explanation');
        if (!picked) { result.textContent = '먼저 답을 골라 보세요.'; result.className = 'answer-result'; return; }
        const ok = picked.value === card.dataset.answer;
        result.textContent = ok ? '맞았습니다.' : '다시 생각해 볼까요?';
        result.className = `answer-result ${ok ? 'correct' : 'wrong'}`;
        why.hidden = false;
    });
});

markSelected('[data-sys]', 'sys', state.sys);
markSelected('[data-act]', 'act', state.act);
render();
requestAnimationFrame(frame);

window.__organModel = {
    state, analyse, tick, render, output, ratio, verdictFor,
    SYSTEMS, ACTS, BLOOD_ML,
    setSys(v) { document.querySelector(`[data-sys="${v}"]`).click(); },
    setAct(v) { document.querySelector(`[data-act="${v}"]`).click(); },
    check() { state.checked = true; explain(analyse()); },
    runToEnd(dt = 1 / 30) {
        $('runBtn').click();
        let steps = 0;
        while (state.running && steps < 20000) { tick(dt); steps += 1; }
        render();
        return { steps, t: state.t };
    },
};
