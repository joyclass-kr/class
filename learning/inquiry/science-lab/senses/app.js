'use strict';

/* A dropped ruler is a stopwatch you can read with your fingers. It falls
   d = ½gt², so catching it at a mark tells you how long you took. That also
   sets the method's limit: a 30 cm ruler runs out at 0.247 s, which is why
   touch and hearing can be measured this way and smell and taste cannot. */

const G = 9.8;
const RULER_CM = 30;

const SENSES = {
    skin: { name: '피부', mover: '손등을 톡 건드립니다', base: 0.15, organ: '피부', why: '살갗의 신경이 곧바로 느낍니다' },
    ear: { name: '귀', mover: '소리를 냅니다', base: 0.16, organ: '귀', why: '소리가 고막을 바로 흔듭니다' },
    eye: { name: '눈', mover: '자를 놓는 것을 봅니다', base: 0.19, organ: '눈', why: '본 것을 알아보는 데 시간이 조금 더 걸립니다' },
    nose: { name: '코', mover: '냄새를 풍깁니다', base: 0.45, organ: '코', why: '냄새 알갱이가 코 속까지 퍼져야 합니다' },
    tongue: { name: '혀', mover: '맛을 봅니다', base: 0.60, organ: '혀', why: '맛 물질이 침에 녹아야 느낄 수 있습니다' },
};
const CONDS = {
    fresh: { name: '잘 잤을 때', mult: 1.0 },
    sleepy: { name: '졸릴 때', mult: 1.3 },
    busy: { name: '딴생각할 때', mult: 1.6 },
};

const state = {
    sense: 'eye', cond: 'fresh',
    prediction: null, checked: false,
    running: false, t: 0, phase: 0,
};

const $ = id => document.getElementById(id);
const svgNS = 'http://www.w3.org/2000/svg';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = (v, d) => v.toFixed(d).replace('-', '−');
// 눈으로, 귀로 — 으로 after a final consonant, except ㄹ which takes로.
function ro(w) {
    const c = w.charCodeAt(w.length - 1);
    if (c < 0xac00 || c > 0xd7a3) return `${w}로`;
    const jong = (c - 0xac00) % 28;
    return w + (jong === 0 || jong === 8 ? '로' : '으로');
}

function reaction(sense, cond) { return SENSES[sense].base * CONDS[cond].mult; }
// Free fall: how far the ruler has gone, in centimetres.
function fallCm(t) { return 0.5 * G * t * t * 100; }
// And the inverse, which is how the mark you catch becomes a time.
function timeFor(cm) { return Math.sqrt(2 * (cm / 100) / G); }
const RULER_T = timeFor(RULER_CM);

function verdictFor(sense, cond) {
    const d = fallCm(reaction(sense, cond));
    return d <= 25 ? 'p1' : (d <= RULER_CM ? 'p2' : 'p3');
}

function analyse() {
    const s = SENSES[state.sense], c = CONDS[state.cond];
    const t = reaction(state.sense, state.cond);
    const d = fallCm(t);
    return {
        sense: s, cond: c, t, d, caught: d <= RULER_CM,
        freshT: s.base, freshD: fallCm(s.base),
        verdict: verdictFor(state.sense, state.cond),
    };
}

function el(tag, attrs, text) {
    const n = document.createElementNS(svgNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    return n;
}

const PX_CM = 5;                 // screen pixels per centimetre of ruler
const HAND_Y = 176, RULER_X = 92, RULER_W = 30;

function drawRuler(g) {
    const a = analyse();
    // While running the ruler follows the same free-fall law the number uses.
    const elapsed = state.running ? state.t * Math.max(a.t, RULER_T) * 1.35 : a.t;
    const fallen = state.running ? Math.min(fallCm(elapsed), RULER_CM + 14) : Math.min(a.d, RULER_CM + 14);
    const top = HAND_Y - RULER_CM * PX_CM + fallen * PX_CM;

    // A ruler that is not caught keeps going past the bottom of the picture,
    // so the whole thing is drawn inside a clip the width of the canvas.
    const fall = el('g', { 'clip-path': 'url(#stageClip)' });
    fall.appendChild(el('rect', { x: RULER_X, y: top, width: RULER_W, height: RULER_CM * PX_CM, rx: 3, class: 'ruler' }));
    for (let cm = 0; cm <= RULER_CM; cm += 5) {
        const y = top + (RULER_CM - cm) * PX_CM;
        fall.appendChild(el('line', { x1: RULER_X, y1: y, x2: RULER_X + 9, y2: y, class: 'ruler-tick' }));
        if (cm > 0) fall.appendChild(el('text', { x: RULER_X + 12, y: y + 3, class: 'ruler-num' }, String(cm)));
    }
    g.appendChild(fall);

    g.appendChild(el('path', { d: `M ${RULER_X - 26} ${HAND_Y - 9} q 12 -5 24 0 l 0 16 q -12 5 -24 0 Z`, class: 'hand' }));
    g.appendChild(el('path', { d: `M ${RULER_X + RULER_W + 2} ${HAND_Y - 9} q 12 -5 24 0 l 0 16 q -12 5 -24 0 Z`, class: 'hand' }));
    g.appendChild(el('line', { x1: RULER_X - 30, y1: HAND_Y, x2: RULER_X + RULER_W + 30, y2: HAND_Y, class: 'catch-line' }));
    g.appendChild(el('text', { x: RULER_X + RULER_W + 34, y: HAND_Y + 3, class: 'tiny-label' }, '잡는 자리'));

    // Kept out of the ruler's column: the markings slide through that space.
    if (!a.caught) {
        g.appendChild(el('text', { x: 18, y: 86, class: 'missed' }, '놓쳤습니다'));
    }

    g.appendChild(el('text', { x: 18, y: 24, class: 'small-label' }, `${a.sense.name} · ${a.cond.name}`));
    g.appendChild(el('text', { x: 18, y: 48, class: 'big-read' }, `${fmt(a.t, 2)}초`));
    g.appendChild(el('text', { x: 18, y: 66, class: 'tiny-label' }, a.caught ? `자가 ${fmt(a.d, 1)} cm 떨어짐` : `${fmt(a.d, 0)} cm — 자보다 김`));

    // The road a signal travels, lit up in order while the ruler falls.
    const steps = ['자극', a.sense.organ, '신경', '뇌', '신경', '근육'];
    const lit = state.running ? Math.min(steps.length - 1, Math.floor(state.t * steps.length)) : -1;
    steps.forEach((n, i) => {
        const y = 26 + i * 30;
        const on = i === lit;
        g.appendChild(el('rect', { x: 232, y: y - 12, width: 76, height: 22, rx: 6, class: `step-box${on ? ' lit' : ''}` }));
        g.appendChild(el('text', { x: 270, y: y + 3, 'text-anchor': 'middle', class: 'step-name', style: `fill:${on ? '#ffd166' : '#cfe6ee'}` }, n));
        if (i < steps.length - 1) {
            g.appendChild(el('line', { x1: 270, y1: y + 10, x2: 270, y2: y + 18, class: 'arrow-line' }));
            g.appendChild(el('path', { d: `M 270 ${y + 19} l -4 -6 l 8 0 z`, class: 'arrow-head' }));
        }
    });
    g.appendChild(el('text', { x: 322, y: 30, class: 'tiny-label' }, a.sense.mover));
    g.appendChild(el('text', { x: 322, y: 116, class: 'tiny-label' }, '여기서 판단합니다'));
    g.appendChild(el('text', { x: 322, y: 176, class: 'tiny-label' }, '손가락을 오므립니다'));
    g.appendChild(el('text', { x: 322, y: 200, class: 'note-text' }, `이 모두가 ${fmt(a.t, 2)}초 안에`));
}

function drawGraph(g) {
    const a = analyse();
    const x0 = 54, x1 = 440, yTop = 30, yBot = 146;
    const keys = Object.keys(SENSES);
    const top = Math.max(...keys.map(k => reaction(k, state.cond))) * 1.2;
    const Y = t => yBot - (t / top) * (yBot - yTop);
    const slot = (x1 - x0) / keys.length;

    for (let i = 0; i <= 4; i += 1) {
        const t = top * i / 4;
        g.appendChild(el('line', { x1: x0, y1: Y(t), x2: x1, y2: Y(t), class: 'grid-line' }));
        if (i > 0) g.appendChild(el('text', { x: x0 - 6, y: Y(t) + 3.5, 'text-anchor': 'end', class: 'axis-text' }, `${fmt(t, 2)}초`));
    }
    g.appendChild(el('line', { x1: x0, y1: yBot, x2: x1, y2: yBot, class: 'axis' }));
    g.appendChild(el('line', { x1: x0, y1: yTop, x2: x0, y2: yBot, class: 'axis' }));

    keys.forEach((k, i) => {
        const cx = x0 + slot * (i + 0.5);
        const t = reaction(k, state.cond), d = fallCm(t);
        const on = k === state.sense, fits = d <= RULER_CM;
        const bw = Math.min(46, slot * 0.56);
        g.appendChild(el('rect', {
            x: cx - bw / 2, y: Y(t), width: bw, height: yBot - Y(t), rx: 3, class: 'bar',
            style: `fill:${fits ? 'rgba(84,230,193,' : 'rgba(255,138,138,'}${on ? '.75)' : '.35)'}`,
        }));
        g.appendChild(el('text', { x: cx, y: Y(t) - 16, 'text-anchor': 'middle', class: 'bar-text', style: `fill:${on ? '#54e6c1' : '#9cb6b4'}` }, `${fmt(t, 2)}초`));
        g.appendChild(el('text', { x: cx, y: Y(t) - 5, 'text-anchor': 'middle', class: 'bar-text', style: `fill:${fits ? '#9cb6b4' : '#ff9d9d'}` }, `${fmt(d, 0)} cm`));
        g.appendChild(el('text', { x: cx, y: yBot + 15, 'text-anchor': 'middle', class: 'axis-text', style: on ? 'fill:#54e6c1' : '' }, SENSES[k].name));
    });

    g.appendChild(el('line', { x1: x0, y1: Y(RULER_T), x2: x1, y2: Y(RULER_T), class: 'limit-line' }));
    g.appendChild(el('text', { x: x1 - 2, y: Y(RULER_T) - 5, 'text-anchor': 'end', class: 'legend-text', style: 'fill:#ff9d9d' },
        `30 cm 자의 한계 ${fmt(RULER_T, 2)}초`));
    g.appendChild(el('text', { x: (x0 + x1) / 2, y: 191, 'text-anchor': 'middle', class: 'axis-title' },
        `${CONDS[state.cond].name}의 감각별 반응 시간 — 막대 위는 자가 떨어지는 거리`));
}

function render() {
    const m = $('mainGroup'), gr = $('graphGroup');
    m.textContent = ''; gr.textContent = '';
    drawRuler(m); drawGraph(gr);
    updateReadout();
}

const WORDS = { p1: '잴 수 있다', p2: '아슬아슬하다', p3: '너무 느려 못 잰다' };

function updateReadout() {
    const a = analyse();
    $('stageBadge').textContent = `${a.sense.name} · ${a.cond.name}`;
    $('valueA').textContent = `${fmt(a.t, 2)}초`;
    $('valueB').textContent = a.caught ? `${fmt(a.d, 1)} cm` : `${fmt(a.d, 0)} cm — 자를 넘어감`;
    const rows = [
        ['잘 잤을 때라면', `${fmt(a.freshT, 2)}초 · ${fmt(a.freshD, 1)} cm`, state.cond === 'fresh'],
        ['지금 상태의 곱', `× ${fmt(a.cond.mult, 1)}`, a.cond.mult === 1],
        ['이 감각이 느린 까닭', a.sense.why, false],
        ['자가 떨어지는 거리', `${fmt(a.t, 2)}초 × ${fmt(a.t, 2)}초 × 4.9 m = ${fmt(a.d, 1)} cm`, false],
        ['30 cm 자의 한계', `${fmt(RULER_T, 3)}초까지`, a.caught],
        ['가장 빠른 감각', `${SENSES.skin.name} ${fmt(reaction('skin', state.cond), 2)}초`, false],
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

    let s = `자극이 ${a.sense.name}에 닿으면 신경이 뇌로 소식을 전하고, 뇌가 정한 명령이 다시 신경을 타고 손가락 근육으로 갑니다. ${a.cond.name} ${ro(a.sense.name)} 알아채는 데 걸리는 시간은 ${fmt(a.t, 2)}초입니다. `;
    s += `그동안 자는 가만히 있지 않고 점점 빨라지며 떨어져서 ${fmt(a.d, 1)} cm를 갑니다. `;
    if (a.caught) {
        s += `30 cm 자 안에 들어오므로 눈금 ${fmt(a.d, 0)} 언저리를 잡게 되고, 그 눈금만 읽으면 몇 초가 걸렸는지 거꾸로 알 수 있습니다. `;
    } else {
        s += `30 cm 자로는 ${fmt(RULER_T, 2)}초까지밖에 잴 수 없으므로 자가 손가락 사이로 빠져나가 버립니다. ${a.sense.why}. 이런 감각은 더 긴 자를 쓰거나 다른 방법으로 재야 합니다. `;
    }
    if (state.cond !== 'fresh') {
        s += `잘 잤을 때라면 ${fmt(a.freshT, 2)}초에 ${fmt(a.freshD, 1)} cm였을 텐데, ${a.cond.name}는 ${fmt(a.cond.mult, 1)}배가 되었습니다. `;
        s += `느려진 곳은 감각 기관이 아니라 뇌입니다. 신호는 똑같이 도착하는데 알아채고 결정하는 데 시간이 더 걸립니다. `;
    }
    // Saying "time rose 1.0 times and distance rose 1.00 times" says nothing,
    // so the comparison only appears when something actually changed.
    s += a.cond.mult === 1
        ? `떨어지는 물체는 갈수록 빨라지므로, 시간이 두 배가 되면 거리는 네 배가 됩니다. 반응이 조금만 늦어도 자는 훨씬 많이 내려가 있는 셈입니다.`
        : `여기서 눈여겨볼 것이 있습니다. 시간은 ${fmt(a.cond.mult, 1)}배 늘었는데 거리는 ${fmt(a.cond.mult * a.cond.mult, 2)}배가 되었습니다. 떨어지는 물체는 갈수록 빨라지기 때문에, 시간이 두 배면 거리는 네 배가 됩니다. 반응이 조금만 늦어도 자는 훨씬 많이 내려가 있는 셈입니다.`;
    $('elementaryExplanation').textContent = s;
}

// --- animation --------------------------------------------------------------
function tick(dt) {
    state.phase += dt;
    if (!state.running) return false;
    state.t = Math.min(1, state.t + dt / 4);
    if (state.t >= 1) {
        state.running = false;
        $('runBtn').textContent = '자 떨어뜨리기';
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

document.querySelectorAll('[data-sense]').forEach(b => b.addEventListener('click', () => {
    state.sense = b.dataset.sense; markSelected('[data-sense]', 'sense', state.sense); render();
}));
document.querySelectorAll('[data-cond]').forEach(b => b.addEventListener('click', () => {
    state.cond = b.dataset.cond; markSelected('[data-cond]', 'cond', state.cond); render();
}));
document.querySelectorAll('[data-prediction]').forEach(b => b.addEventListener('click', () => {
    state.prediction = b.dataset.prediction; markSelected('[data-prediction]', 'prediction', state.prediction);
}));
$('runBtn').addEventListener('click', () => {
    if (state.running) { state.running = false; state.t = 1; $('runBtn').textContent = '자 떨어뜨리기'; return; }
    state.t = 0; state.running = true; state.checked = true;
    $('runBtn').textContent = '멈추기';
    render();
});
$('resetBtn').addEventListener('click', () => {
    state.sense = 'eye'; state.cond = 'fresh';
    state.prediction = null; state.checked = false; state.running = false; state.t = 0;
    $('runBtn').textContent = '자 떨어뜨리기';
    document.querySelectorAll('[data-prediction]').forEach(x => x.classList.remove('selected'));
    $('resultEmpty').hidden = false; $('resultContent').hidden = true;
    markSelected('[data-sense]', 'sense', 'eye'); markSelected('[data-cond]', 'cond', 'fresh');
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

markSelected('[data-sense]', 'sense', state.sense);
markSelected('[data-cond]', 'cond', state.cond);
render();
requestAnimationFrame(frame);

window.__senseModel = {
    state, analyse, tick, render, reaction, fallCm, timeFor, verdictFor,
    SENSES, CONDS, G, RULER_CM, RULER_T,
    setSense(v) { document.querySelector(`[data-sense="${v}"]`).click(); },
    setCond(v) { document.querySelector(`[data-cond="${v}"]`).click(); },
    check() { state.checked = true; explain(analyse()); },
    runToEnd(dt = 1 / 30) {
        $('runBtn').click();
        let steps = 0;
        while (state.running && steps < 20000) { tick(dt); steps += 1; }
        render();
        return { steps, t: state.t };
    },
};
