'use strict';

/* Two things about an animal, side by side. How it grows — with or without a
   pupa, and how many days each step takes — and where it sits in the chain
   that feeds it. The pyramid narrows by ten each step up, because almost
   nothing an animal eats stays as body. */

const PASS = 10;   // roughly how many of a level it takes to feed one above
const NONE = '아무것도 먹지 않습니다';

const ANIMALS = {
    butterfly: {
        name: '배추흰나비', change: 'full', colour: '#f0d78a',
        stages: [
            { n: '알', days: 4, eat: NONE, food: '없음', tint: '#e8e0c0' },
            { n: '애벌레', days: 15, eat: '배춧잎을 갉아 먹습니다', food: '배춧잎', tint: '#a8cf7a' },
            { n: '번데기', days: 10, eat: NONE, food: '없음', tint: '#c8b98a' },
            { n: '어른벌레', days: null, eat: '꽃의 꿀을 빨아 먹습니다', food: '꽃의 꿀', tint: '#f2ecd2' },
        ],
        chain: ['배추', '배추흰나비 애벌레', '참새', '매'],
        units: ['포기', '마리', '마리', '마리'], at: 1,
        why: '애벌레는 갉아 먹는 턱을 가졌고 어른벌레는 빨아 먹는 대롱을 가졌습니다. 입이 통째로 바뀌었으니 먹는 것도 바뀝니다.',
    },
    mantis: {
        name: '사마귀', change: 'none', colour: '#9fd08a',
        stages: [
            { n: '알', days: 180, eat: NONE, food: '없음', tint: '#d6c9a0' },
            { n: '애벌레', days: 60, eat: '작은 벌레를 잡아먹습니다', food: '작은 벌레', tint: '#9fd08a' },
            { n: '어른벌레', days: null, eat: '메뚜기 같은 큰 벌레를 잡아먹습니다', food: '큰 벌레', tint: '#7ab86a' },
        ],
        chain: ['풀', '메뚜기', '사마귀', '새'],
        units: ['포기', '마리', '마리', '마리'], at: 2,
        moult: '몸에 맞지 않게 된 껍질을 여러 번 벗으며',
        why: '사마귀는 자라도 사는 곳이 바뀌지 않습니다. 다만 몸이 커진 만큼 잡을 수 있는 먹이도 커집니다.',
    },
    frog: {
        name: '개구리', change: 'shape', colour: '#8fd0b0',
        stages: [
            { n: '알', days: 7, eat: NONE, food: '없음', tint: '#cfe6e0' },
            { n: '올챙이', days: 60, eat: '물속 이끼를 먹습니다', food: '물속 이끼', tint: '#6f8f9a' },
            { n: '뒷다리 난 올챙이', days: 14, eat: '작은 벌레를 먹기 시작합니다', food: '작은 벌레', tint: '#79a68f' },
            { n: '개구리', days: null, eat: '곤충을 혀로 잡아먹습니다', food: '곤충', tint: '#8fd0b0' },
        ],
        chain: ['물풀', '물속 벌레', '개구리', '뱀'],
        units: ['포기', '마리', '마리', '마리'], at: 2,
        why: '올챙이는 물속에서 이끼를 훑어 먹고, 개구리는 뭍에서 혀를 뻗어 곤충을 잡습니다. 사는 곳이 바뀌니 먹는 것도 바뀝니다.',
    },
    chick: {
        name: '닭', change: 'none', colour: '#f0c98a',
        stages: [
            { n: '알', days: 21, eat: NONE, food: '없음', tint: '#f0e6d2' },
            { n: '병아리', days: 150, eat: '곡식과 벌레를 쪼아 먹습니다', food: '곡식과 벌레', tint: '#f5dd90' },
            { n: '어른 닭', days: null, eat: '곡식과 벌레를 먹습니다', food: '곡식과 벌레', tint: '#e0b070' },
        ],
        chain: ['곡식', '닭', '사람'],
        units: ['줌', '마리', '명'], at: 1,
        moult: '솜털이 빠지고 깃털이 자라며',
        // 병아리와 어른 닭은 먹는 것이 같습니다. 없는 차이를 만들어 내지 않습니다.
    },
};

/* Korean particles depend on the last letter, so they cannot be hard-coded
   into a sentence that swaps its subject. */
function jong(w) {
    const c = String(w).trim().slice(-1).charCodeAt(0);
    if (c < 0xac00 || c > 0xd7a3) return -1;
    return (c - 0xac00) % 28;
}
const eun = w => w + (jong(w) > 0 ? '은' : '는');
const iga = w => w + (jong(w) > 0 ? '이' : '가');
const eul = w => w + (jong(w) > 0 ? '을' : '를');
const ro = w => { const j = jong(w); return w + (j <= 0 || j === 8 ? '로' : '으로'); };   // 8 = ㄹ

const state = {
    animal: 'butterfly', step: 0,
    prediction: null, checked: false,
    running: false, t: 0, phase: 0,
};

const $ = id => document.getElementById(id);
const svgNS = 'http://www.w3.org/2000/svg';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function daysToAdult(k) {
    return ANIMALS[k].stages.reduce((s, x) => s + (x.days || 0), 0);
}
function verdictFor(k) {
    const c = ANIMALS[k].change;
    return c === 'full' ? 'p1' : (c === 'shape' ? 'p2' : 'p3');
}
// How many of each level it takes to keep one of the top alive.
function pyramid(k) {
    const a = ANIMALS[k];
    return a.chain.map((name, i) => ({
        name, unit: a.units[i], level: i,
        count: Math.pow(PASS, a.chain.length - 1 - i),
    }));
}

function analyse() {
    const a = ANIMALS[state.animal];
    const step = clamp(state.step, 0, a.stages.length - 1);
    return {
        animal: a, step, stage: a.stages[step],
        total: daysToAdult(state.animal), pyramid: pyramid(state.animal),
        verdict: verdictFor(state.animal),
    };
}

function el(tag, attrs, text) {
    const n = document.createElementNS(svgNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    return n;
}

/* How many days have gone by: every finished stage in full, plus however far
   we are into the one we are standing in. */
function elapsedDays() {
    const a = analyse(), list = a.animal.stages;
    let d = 0;
    for (let i = 0; i < a.step; i++) d += list[i].days || 0;
    const within = clamp(state.t * list.length - a.step, 0, 1);
    return d + (list[a.step].days || 0) * (state.running || state.t > 0 ? within : 0);
}

function drawStages(g) {
    const a = analyse();
    const list = a.animal.stages, n = list.length;
    const slot = 440 / n;

    g.appendChild(el('text', { x: 16, y: 24, class: 'big-read' }, a.animal.name));
    g.appendChild(el('text', { x: 16, y: 42, class: 'tiny-label' },
        a.animal.change === 'full' ? '번데기를 거칩니다'
            : (a.animal.change === 'shape' ? '번데기 없이 모습이 크게 바뀝니다' : '번데기 없이 조금씩 커집니다')));
    g.appendChild(el('text', { x: 444, y: 24, 'text-anchor': 'end', class: 'read-text' }, `어른까지 ${a.total}일`));

    const beat = 1 + 0.05 * Math.sin(state.phase * 3.2);
    list.forEach((s, i) => {
        const cx = 10 + slot * (i + 0.5), cy = 92;
        const here = i === a.step;
        const r = here ? 25 * (state.running ? beat : 1) : 21;
        g.appendChild(el('circle', { cx, cy, r, class: `stage-disc${here ? ' now' : ''}`, style: `fill:${s.tint}` }));
        g.appendChild(el('text', { x: cx, y: cy + 4, 'text-anchor': 'middle', class: 'stage-name', style: 'fill:#14242c' }, String(i + 1)));
        g.appendChild(el('text', { x: cx, y: 132, 'text-anchor': 'middle', class: 'stage-name', style: `fill:${here ? '#ffd166' : '#cfe6ee'}` }, s.n));
        g.appendChild(el('text', { x: cx, y: 146, 'text-anchor': 'middle', class: 'stage-days' }, s.days ? `${s.days}일` : '어른'));
        if (i < n - 1) {
            const x1 = cx + 27, x2 = 10 + slot * (i + 1.5) - 27;
            g.appendChild(el('line', { x1, y1: cy, x2, y2: cy, class: 'step-arrow' }));
            g.appendChild(el('path', { d: `M ${x2} ${cy} l -6 -4 l 0 8 z`, class: 'arrow-head' }));
        }
    });

    // A day counter, so the run reads as time passing rather than steps jumping.
    const done = elapsedDays();
    g.appendChild(el('rect', { x: 22, y: 156, width: 416, height: 6, rx: 3, class: 'day-track' }));
    g.appendChild(el('rect', { x: 22, y: 156, width: Math.max(2, 416 * done / a.total), height: 6, rx: 3, class: 'day-fill' }));
    g.appendChild(el('text', { x: 438, y: 150, 'text-anchor': 'end', class: 'tiny-label' }, `${Math.round(done)}일째`));

    // What it is eating right now, given its own line so the row stays clean.
    g.appendChild(el('rect', { x: 22, y: 168, width: 416, height: 34, rx: 9, class: 'eat-box' }));
    g.appendChild(el('text', { x: 36, y: 182, class: 'tiny-label' }, `${a.stage.n}일 때 먹는 것`));
    g.appendChild(el('text', { x: 36, y: 196, class: 'part-label', style: 'fill:#dce9e8' }, a.stage.eat));
}

function drawPyramid(g) {
    const a = analyse();
    const tiers = a.pyramid;
    const n = tiers.length;
    const cx = 230, topW = 96, botW = 340;
    const hTop = 30, hBot = 150;
    const rowH = (hBot - hTop) / n;

    tiers.forEach((t, i) => {
        const fromTop = n - 1 - i;          // 0 at the very top of the pyramid
        const y = hTop + fromTop * rowH;
        const wTop = topW + (botW - topW) * (fromTop / n);
        const wBot = topW + (botW - topW) * ((fromTop + 1) / n);
        const here = i === a.animal.at;
        g.appendChild(el('polygon', {
            points: `${cx - wTop / 2},${y} ${cx + wTop / 2},${y} ${cx + wBot / 2},${y + rowH - 3} ${cx - wBot / 2},${y + rowH - 3}`,
            class: `tier${here ? ' here' : ''}`,
            style: `fill:${here ? a.animal.colour : 'rgba(150,190,175,.28)'}`,
        }));
        g.appendChild(el('text', { x: cx, y: y + rowH / 2, 'text-anchor': 'middle', class: 'tier-name', style: `fill:${here ? '#14242c' : '#cfe6ee'}` }, t.name));
        g.appendChild(el('text', {
            x: cx + wBot / 2 + 8, y: y + rowH / 2 + 1, class: 'tier-count',
            style: `fill:${here ? '#ffd166' : '#9cb6b4'}`,
        }, t.count === 1 ? `1${t.unit}` : `${t.count.toLocaleString('ko-KR')}${t.unit}쯤`));
        if (fromTop > 0) {
            g.appendChild(el('path', { d: `M ${cx - wBot / 2 - 14} ${y + rowH - 6} q -8 -8 0 -16`, class: 'eat-arrow' }));
        }
    });

    g.appendChild(el('text', { x: 16, y: 22, class: 'small-label' }, `${iga(a.animal.name)} 든 먹이 사슬`));
    g.appendChild(el('text', { x: 444, y: 22, 'text-anchor': 'end', class: 'legend-text', style: `fill:${a.animal.colour}` },
        `${eun(a.animal.chain[a.animal.at])} 여기`));
    g.appendChild(el('text', { x: 230, y: 172, 'text-anchor': 'middle', class: 'legend-text', style: 'fill:#9cb6b4' },
        '한 단계 올라갈 때마다 열 배쯤 적어집니다'));
    g.appendChild(el('text', { x: 230, y: 190, 'text-anchor': 'middle', class: 'axis-title' },
        '맨 위 하나를 먹여 살리는 데 필요한 수'));
}

function render() {
    const m = $('mainGroup'), gr = $('graphGroup');
    m.textContent = ''; gr.textContent = '';
    drawStages(m); drawPyramid(gr);
    updateReadout();
}

const WORDS = { p1: '번데기를 거친다', p2: '번데기 없이 모습이 크게 바뀐다', p3: '처음부터 어른과 닮았다' };

function updateReadout() {
    const a = analyse();
    $('stageBadge').textContent = `${a.animal.name} · ${a.stage.n}`;
    $('valueA').textContent = `${a.total}일`;
    $('valueB').textContent = a.stage.food;
    const top = a.pyramid[a.pyramid.length - 1];
    const rows = [
        ['자라는 차례', a.animal.stages.map(s => s.n).join(' → '), false],
        ['지금 단계', `${a.step + 1}번째 · ${a.stage.n}`, false],
        ['이 단계에 머무는 날', a.stage.days ? `${a.stage.days}일` : '어른이 되면 끝', false],
        ['번데기', a.animal.change === 'full' ? '있습니다' : '없습니다', a.animal.change === 'full'],
        ['먹이 사슬', a.animal.chain.join(' → '), false],
        [`${top.name} 한 ${eul(top.unit)} 먹이려면`,
            `${iga(a.pyramid[0].name)} ${a.pyramid[0].count.toLocaleString('ko-KR')}${a.pyramid[0].unit}쯤 있어야 합니다`, false],
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

    const names = a.animal.stages.map(s => s.n).join(' → ');
    let s = `${eun(a.animal.name)} ${names} 차례로 자랍니다. 알에서 어른이 되기까지 모두 ${a.total}일쯤 걸립니다. `;

    if (v === 'p1') {
        s += `가운데에 번데기가 있는 것이 눈에 띕니다. 번데기 속에서 몸이 새로 만들어지기 때문에, 애벌레와 어른벌레는 생김새가 전혀 다릅니다. 이런 자람을 완전 탈바꿈이라고 합니다. `;
    } else if (v === 'p2') {
        s += `번데기는 없지만 모습이 크게 바뀝니다. 올챙이는 물속에서 아가미로 숨 쉬고, 개구리가 되면 뭍으로 올라와 폐로 숨 쉽니다. 사는 곳이 통째로 바뀌는 셈입니다. `;
    } else {
        s += `번데기가 없습니다. 알에서 나올 때부터 어른과 제법 닮았고, ${a.animal.moult} 조금씩 커질 뿐입니다. `;
    }

    s += `지금은 ${a.stage.n} 단계이고, ${a.stage.eat}. `;
    const first = a.animal.stages.find(x => x.food !== '없음');
    const last = a.animal.stages[a.animal.stages.length - 1];
    if (first && first !== last && first.food !== last.food) {
        s += `${first.n}일 때는 ${first.food}, ${last.n}일 때는 ${last.food}입니다. ${a.animal.why} `;
    } else {
        s += `${eun(a.animal.name)} 새끼일 때와 어른일 때 먹는 것이 거의 같습니다. 모든 동물이 자라면서 먹이를 바꾸는 것은 아닙니다. `;
    }

    const p = a.pyramid, top = p[p.length - 1], bottom = p[0];
    s += `${eun(a.animal.name)} ${ro(a.animal.chain.join(' → '))} 이어지는 먹이 사슬 안에 있습니다. `;
    s += `먹은 것이 모두 몸이 되지는 않습니다. 대부분은 움직이고 숨 쉬는 데 쓰여 사라지므로, 한 단계 올라갈 때마다 수가 열 배쯤 줄어듭니다. `;
    s += `그래서 맨 위의 ${top.name} 한 ${eul(top.unit)} 먹여 살리려면 맨 아래의 ${iga(bottom.name)} ${bottom.count.toLocaleString('ko-KR')}${bottom.unit}쯤 있어야 합니다.`;
    $('elementaryExplanation').textContent = s;
}

// --- animation --------------------------------------------------------------
function tick(dt) {
    state.phase += dt;
    if (!state.running) return false;
    const n = ANIMALS[state.animal].stages.length;
    state.t = Math.min(1, state.t + dt / (n * 1.6));
    const step = Math.min(n - 1, Math.floor(state.t * n));
    if (step !== state.step) {
        state.step = step;
        $('stageRange').value = String(step);
        $('stageOutput').textContent = ANIMALS[state.animal].stages[step].n;
    }
    if (state.t >= 1) {
        state.running = false;
        $('runBtn').textContent = '키워 보기';
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
// Each animal has its own number of stages, so the dial has to be resized.
function fitRange() {
    const n = ANIMALS[state.animal].stages.length;
    const r = $('stageRange');
    r.max = String(n - 1);
    state.step = clamp(state.step, 0, n - 1);
    r.value = String(state.step);
    $('stageOutput').textContent = ANIMALS[state.animal].stages[state.step].n;
}

document.querySelectorAll('[data-animal]').forEach(b => b.addEventListener('click', () => {
    state.animal = b.dataset.animal; state.step = 0; state.running = false; state.t = 0;
    $('runBtn').textContent = '키워 보기';
    markSelected('[data-animal]', 'animal', state.animal);
    fitRange(); render();
}));
document.querySelectorAll('[data-prediction]').forEach(b => b.addEventListener('click', () => {
    state.prediction = b.dataset.prediction; markSelected('[data-prediction]', 'prediction', state.prediction);
}));
$('stageRange').addEventListener('input', e => {
    state.step = Number(e.target.value);
    state.running = false; state.t = 0;   // dragged here by hand, so no part-day is elapsed
    $('runBtn').textContent = '키워 보기';
    $('stageOutput').textContent = ANIMALS[state.animal].stages[state.step].n;
    render();
});
$('runBtn').addEventListener('click', () => {
    if (state.running) { state.running = false; $('runBtn').textContent = '키워 보기'; return; }
    state.t = 0; state.step = 0; state.running = true; state.checked = true;
    $('runBtn').textContent = '멈추기';
    render();
});
$('resetBtn').addEventListener('click', () => {
    state.animal = 'butterfly'; state.step = 0;
    state.prediction = null; state.checked = false; state.running = false; state.t = 0;
    $('runBtn').textContent = '키워 보기';
    document.querySelectorAll('[data-prediction]').forEach(x => x.classList.remove('selected'));
    $('resultEmpty').hidden = false; $('resultContent').hidden = true;
    markSelected('[data-animal]', 'animal', 'butterfly');
    fitRange(); render();
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

markSelected('[data-animal]', 'animal', state.animal);
fitRange();
render();
requestAnimationFrame(frame);

window.__lifeModel = {
    state, analyse, tick, render, daysToAdult, verdictFor, pyramid,
    ANIMALS, PASS,
    setAnimal(v) { document.querySelector(`[data-animal="${v}"]`).click(); },
    setStep(v) { const r = $('stageRange'); r.value = String(v); r.dispatchEvent(new Event('input')); },
    check() { state.checked = true; explain(analyse()); },
    runToEnd(dt = 1 / 30) {
        $('runBtn').click();
        let steps = 0;
        while (state.running && steps < 20000) { tick(dt); steps += 1; }
        render();
        return { steps, step: state.step };
    },
};
