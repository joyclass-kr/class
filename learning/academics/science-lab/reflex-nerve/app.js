document.addEventListener('DOMContentLoaded', () => {
    const pathButtons = [...document.querySelectorAll('[data-path]')];
    const nerveButtons = [...document.querySelectorAll('[data-nerve]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const lengthRange = document.getElementById('lengthRange');
    const lengthOutput = document.getElementById('lengthOutput');
    const checkBtn = document.getElementById('checkBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const valueA = document.getElementById('valueA');
    const valueB = document.getElementById('valueB');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const mainGroup = document.getElementById('mainGroup');
    const graphGroup = document.getElementById('graphGroup');
    const dataNote = document.getElementById('dataNote');

    const SYNAPSE = 0.002;      // seconds lost at each junction between neurons
    const MUSCLE = 0.015;       // seconds for the muscle itself to move
    const BRAIN = 0.16;         // seconds the cerebrum needs to decide
    const G = 9.8;
    const SLOWDOWN = 8;         // the pulse is drawn this many times slower than real
    const BENCH = 0.1;          // the reaction time we compare against
    const GRAPH = { x0: 96, x1: 424, y0: 150, y1: 26 };

    // Signal path drawn as a chain of stations.
    const SENSE_X = 68, SPINE_X = 248, MUSCLE_X = 421, LINE_Y = 140;
    const PATHS = {
        conscious: { label: '의식적 반응', centre: '대뇌', apexY: 78, synapses: 4, brain: BRAIN,
                     sense: '눈', muscle: '손 근육', story: '떨어지는 자를 보고 잡습니다' },
        pupil: { label: '동공 반사', centre: '연수', apexY: 107, synapses: 3, brain: 0,
                 sense: '눈', muscle: '홍채', story: '밝은 빛에 동공이 작아집니다' },
        knee: { label: '무릎 반사', centre: '척수', apexY: LINE_Y, synapses: 2, brain: 0,
                sense: '무릎', muscle: '다리 근육', story: '무릎을 치면 다리가 올라갑니다' },
    };
    const NERVES = {
        thick: { label: '말이집 신경', speed: 100 },
        thin: { label: '가는 말이집 신경', speed: 20 },
        bare: { label: '민말이집 신경', speed: 2 },
    };

    let pathKey = 'conscious';
    let nerveKey = 'thick';
    let prediction = null;

    const length = () => Number(lengthRange.value);

    function analyse(pk = pathKey, nk = nerveKey, L = length()) {
        const p = PATHS[pk], n = NERVES[nk];
        const conduction = L / n.speed;
        const synapse = p.synapses * SYNAPSE;
        const total = conduction + synapse + p.brain + MUSCLE;
        // A dropped ruler falls s = ½gt² while you are still reacting.
        const drop = 0.5 * G * total * total;
        const verdict = total > BENCH * 1.1 ? 'longer' : total < BENCH * 0.9 ? 'shorter' : 'same';
        return { p, n, L, conduction, synapse, brain: p.brain, muscle: MUSCLE, total, drop, verdict };
    }

    // The pulse follows this line, pausing inside the centre while it thinks.
    function motionFor(a) {
        const p = a.p;
        const seg1 = SPINE_X - SENSE_X, seg2 = MUSCLE_X - SPINE_X;
        const up = LINE_Y - p.apexY;
        const d = up === 0
            ? `M${SENSE_X},${LINE_Y} L${MUSCLE_X},${LINE_Y}`
            : `M${SENSE_X},${LINE_Y} L${SPINE_X},${LINE_Y} L${SPINE_X},${p.apexY} L${SPINE_X},${LINE_Y} L${MUSCLE_X},${LINE_Y}`;
        const len = seg1 + 2 * up + seg2;
        const apexAt = (seg1 + up) / len;
        const dur = a.total * SLOWDOWN;
        let attrs = `dur="${dur.toFixed(3)}s" repeatCount="indefinite" path="${d}"`;
        if (a.brain > 0) {
            const think = a.brain / a.total;          // share of the time spent deciding
            const travel = 1 - think;
            const t1 = apexAt * travel, t2 = t1 + think;
            attrs += ` calcMode="linear" keyPoints="0;${apexAt.toFixed(4)};${apexAt.toFixed(4)};1" ` +
                     `keyTimes="0;${t1.toFixed(4)};${t2.toFixed(4)};1"`;
        }
        return { d, attrs, dur };
    }

    function nodeBox(x0, y0, w, h, cls, on) {
        return `<rect class="node ${cls}${on ? '' : ' off'}" x="${x0}" y="${y0}" width="${w}" height="${h}" rx="7"/>`;
    }

    function renderMain(a) {
        const p = a.p;
        const m = motionFor(a);
        let out = '';

        // the two centres this signal does not use, drawn faint
        const usesBrain = p.apexY === PATHS.conscious.apexY;
        const usesMedulla = p.apexY === PATHS.pupil.apexY;
        out += nodeBox(210, 50, 76, 30, 'centre', usesBrain);
        out += `<text class="node-label${usesBrain ? '' : ' off'}" x="248" y="69" text-anchor="middle">대뇌</text>`;
        out += nodeBox(216, 90, 64, 26, 'centre', usesMedulla);
        out += `<text class="node-label${usesMedulla ? '' : ' off'}" x="248" y="107" text-anchor="middle">연수</text>`;

        // the whole possible route, then the part this reaction really uses
        out += `<path class="nerve-path dim" d="M${SENSE_X},${LINE_Y} L${SPINE_X},${LINE_Y} L${SPINE_X},78 L${SPINE_X},${LINE_Y} L${MUSCLE_X},${LINE_Y}"/>`;
        out += `<path class="nerve-path" d="${m.d}"/>`;

        out += nodeBox(30, 122, 76, 34, 'sense', true);
        out += `<text class="node-label" x="68" y="137" text-anchor="middle">감각 기관</text>`;
        out += `<text class="node-sub" x="68" y="150" text-anchor="middle">${p.sense}</text>`;
        out += nodeBox(216, 122, 64, 34, 'centre', true);
        out += `<text class="node-label" x="248" y="143" text-anchor="middle">척수</text>`;
        out += nodeBox(386, 122, 70, 34, 'muscle', true);
        out += `<text class="node-label" x="421" y="137" text-anchor="middle">반응 기관</text>`;
        out += `<text class="node-sub" x="421" y="150" text-anchor="middle">${p.muscle}</text>`;

        out += `<text class="seg-label" x="161" y="134" text-anchor="middle">감각 신경</text>`;
        out += `<text class="seg-label" x="333" y="134" text-anchor="middle">운동 신경</text>`;

        // the signal itself, at the same slowdown for every reaction
        out += `<circle class="pulse-glow" r="9"><animateMotion ${m.attrs}/></circle>`;
        out += `<circle class="pulse" r="4.5"><animateMotion ${m.attrs}/></circle>`;

        out += `<text class="part-label" x="20" y="26">${p.label} — ${p.story}</text>`;
        out += `<text class="read-text" x="20" y="180">반응 시간 ${(a.total * 1000).toFixed(0)} ms (${a.total.toFixed(3)} 초)</text>`;
        out += `<text class="note-text" x="20" y="196">중추는 ${p.centre} · ${a.n.label} ${a.n.speed} m/s · 거리 ${a.L.toFixed(1)} m</text>`;
        out += `<text class="note-text" x="20" y="210">신호는 실제보다 ${SLOWDOWN}배 느리게 보여 줍니다 — 세 반응의 빠르기 차이는 그대로입니다</text>`;
        mainGroup.innerHTML = out;
    }

    const SEGMENTS = [
        ['신경 전도', a => a.conduction, '#52c7ff'],
        ['시냅스', a => a.synapse, '#c9a6f0'],
        ['중추 처리', a => a.brain, '#ffd166'],
        ['근육 수축', a => a.muscle, '#ff8a8a'],
    ];

    function renderGraph(a) {
        const all = Object.keys(PATHS).map(k => analyse(k, nerveKey, length()));
        const max = Math.max(...all.map(x => x.total), BENCH * 1.4) * 1.12;
        const gx = v => GRAPH.x0 + (v / max) * (GRAPH.x1 - GRAPH.x0);
        let out = '';
        SEGMENTS.forEach(([name, , colour], i) => {
            const x = 96 + i * 84;
            out += `<rect x="${x}" y="12" width="9" height="9" rx="2" fill="${colour}"/>`;
            out += `<text class="legend-text" fill="${colour}" x="${x + 13}" y="20">${name}</text>`;
        });
        for (let i = 0; i <= 4; i += 1) {
            const v = (max / 4) * i;
            out += `<line class="grid-line" x1="${gx(v).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(v).toFixed(1)}" y2="${GRAPH.y0}"/>`;
            out += `<text class="axis-text" x="${gx(v).toFixed(1)}" y="${GRAPH.y0 + 14}" text-anchor="middle">${v.toFixed(2)}</text>`;
        }
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        out += `<text class="axis-title" x="${((GRAPH.x0 + GRAPH.x1) / 2).toFixed(1)}" y="${GRAPH.y0 + 32}" text-anchor="middle">반응 시간 (초)</text>`;
        out += `<line class="mark-line" x1="${gx(BENCH).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(BENCH).toFixed(1)}" y2="${GRAPH.y0}"/>`;
        out += `<text class="mark-text" x="${(gx(BENCH) + 4).toFixed(1)}" y="${GRAPH.y1 + 9}">0.1초</text>`;

        all.forEach((row, i) => {
            const y = GRAPH.y1 + 30 + i * 38;
            const current = row.p === a.p;
            out += `<text class="axis-text" style="fill:${current ? '#cfe6ee' : '#7f9298'}" x="${GRAPH.x0 - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end">${row.p.label}</text>`;
            let cursor = 0;
            SEGMENTS.forEach(([, pick, colour]) => {
                const v = pick(row);
                if (v <= 0) return;
                out += `<rect class="seg" x="${gx(cursor).toFixed(1)}" y="${y - 7}" width="${Math.max(1, gx(cursor + v) - gx(cursor)).toFixed(1)}" ` +
                       `height="14" fill="${colour}" opacity="${current ? 0.9 : 0.4}"/>`;
                cursor += v;
            });
            const label = `${(row.total * 1000).toFixed(0)} ms`;
            const flip = gx(row.total) > GRAPH.x1 - 56;
            out += `<text class="bar-text" fill="${current ? '#cfe6ee' : '#7f9298'}" x="${(gx(row.total) + (flip ? -6 : 6)).toFixed(1)}" ` +
                   `y="${(y + 4).toFixed(1)}"${flip ? ' text-anchor="end"' : ''}>${label}</text>`;
        });
        graphGroup.innerHTML = out;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        renderGraph(a);
        lengthOutput.textContent = `${a.L.toFixed(1)} m`;
        stageBadge.textContent = `${a.p.label} · ${(a.total * 1000).toFixed(0)} ms`;
        dataNote.innerHTML =
            `<div class="data-row"><span class="data-name">신경 전도</span><span class="data-val">${a.L.toFixed(1)} m ÷ ${a.n.speed} m/s = ${(a.conduction * 1000).toFixed(0)} ms</span></div>` +
            `<div class="data-row"><span class="data-name">시냅스</span><span class="data-val">${a.p.synapses}곳 × 2 ms = ${(a.synapse * 1000).toFixed(0)} ms</span></div>` +
            `<div class="data-row"><span class="data-name">중추 처리</span><span class="data-val">${a.brain > 0 ? `대뇌에서 판단 ${(a.brain * 1000).toFixed(0)} ms` : `${a.p.centre}에서 바로 명령 — 0 ms`}</span></div>` +
            `<div class="data-row"><span class="data-name">근육 수축</span><span class="data-val">${(a.muscle * 1000).toFixed(0)} ms</span></div>` +
            `<div class="data-row match"><span class="data-name">반응 시간</span><span class="data-val">모두 더해 ${(a.total * 1000).toFixed(0)} ms · 자는 ${(a.drop * 100).toFixed(1)} cm 떨어집니다</span></div>`;
        return a;
    }

    function check() {
        const a = analyse();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        valueA.textContent = `${(a.total * 1000).toFixed(0)} ms`;
        valueB.textContent = `${(a.drop * 100).toFixed(1)} cm`;
        predictionResult.textContent = !prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        let s = `자극은 감각 기관 → 감각 신경 → ${a.p.centre} → 운동 신경 → 반응 기관 순서로 전달됩니다. `;
        s += `${a.L.toFixed(1)} m 를 ${a.n.speed} m/s 로 지나는 데 ${(a.conduction * 1000).toFixed(0)} ms, ` +
             `시냅스 ${a.p.synapses}곳에서 ${(a.synapse * 1000).toFixed(0)} ms, 근육이 움직이는 데 ${(a.muscle * 1000).toFixed(0)} ms 가 걸립니다. `;
        if (a.brain > 0) {
            const knee = analyse('knee', nerveKey, length());
            s += `여기에 대뇌가 판단하는 ${(a.brain * 1000).toFixed(0)} ms 가 더해져 모두 ${(a.total * 1000).toFixed(0)} ms 입니다. ` +
                 `같은 조건의 무릎 반사는 ${(knee.total * 1000).toFixed(0)} ms 이니 약 ${(a.total / knee.total).toFixed(1)}배 느립니다. `;
        } else {
            const con = analyse('conscious', nerveKey, length());
            s += `대뇌를 거치지 않아 판단하는 시간이 없으므로 모두 ${(a.total * 1000).toFixed(0)} ms 입니다. ` +
                 `같은 조건의 의식적 반응은 ${(con.total * 1000).toFixed(0)} ms 이니 약 ${(con.total / a.total).toFixed(1)}배 빠릅니다. `;
        }
        s += `이 시간 동안 떨어지는 자는 s = ½ × 9.8 × ${a.total.toFixed(3)}² = ${(a.drop * 100).toFixed(1)} cm 내려갑니다.`;
        explanation.textContent = s;
    }

    function changed() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }

    lengthRange.addEventListener('input', () => { render(); if (!resultContent.hidden) check(); });
    pathButtons.forEach(button => button.addEventListener('click', () => {
        pathKey = button.dataset.path;
        pathButtons.forEach(item => item.classList.toggle('selected', item === button));
        changed();
    }));
    nerveButtons.forEach(button => button.addEventListener('click', () => {
        nerveKey = button.dataset.nerve;
        nerveButtons.forEach(item => item.classList.toggle('selected', item === button));
        changed();
    }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkBtn.addEventListener('click', check);
    resetBtn.addEventListener('click', () => {
        lengthRange.value = '1.5';
        prediction = null;
        predictionButtons.forEach(item => item.classList.remove('selected'));
        nerveButtons.find(b => b.dataset.nerve === 'thick').click();
        pathButtons.find(b => b.dataset.path === 'conscious').click();
    });

    function shuffleQuizOptions(card) {
        const optionGroup = card.querySelector('.quiz-options');
        const options = Array.from(optionGroup.children);
        for (let index = options.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
        }
        optionGroup.append(...options);
    }

    document.querySelectorAll('.quiz-card').forEach(card => {
        shuffleQuizOptions(card);
        const answerButton = card.querySelector('.answer-button');
        const answerResult = card.querySelector('.answer-result');
        const answerExplanation = card.querySelector('.answer-explanation');
        answerButton.addEventListener('click', () => {
            const selected = card.querySelector('input:checked');
            if (!selected) {
                delete card.dataset.state;
                answerResult.textContent = '답을 먼저 선택하세요.';
                return;
            }
            const correct = selected.value === card.dataset.answer;
            card.dataset.state = correct ? 'correct' : 'incorrect';
            answerResult.textContent = correct ? '맞았습니다.' : '다시 생각해 보세요.';
            answerExplanation.hidden = !correct;
            if (!correct) {
                selected.checked = false;
                selected.disabled = true;
                answerResult.textContent = '다시 생각하고 다른 답을 골라보세요.';
            }
        });
    });

    window.__reflexModel = {
        SYNAPSE, MUSCLE, BRAIN, G, SLOWDOWN, BENCH, PATHS, NERVES, analyse, motionFor, render, check,
        setPath(k) { pathButtons.find(b => b.dataset.path === k).click(); },
        setNerve(k) { nerveButtons.find(b => b.dataset.nerve === k).click(); },
        setLength(v) { lengthRange.value = String(v); lengthRange.dispatchEvent(new Event('input')); },
        getPath: () => pathKey, getNerve: () => nerveKey, length,
    };

    resetBtn.click();
});
