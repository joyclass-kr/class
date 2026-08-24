document.addEventListener('DOMContentLoaded', () => {
    const actButtons = [...document.querySelectorAll('[data-act]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const timeRange = document.getElementById('timeRange');
    const timeOutput = document.getElementById('timeOutput');
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

    // Textbook resting and exercising values for a healthy adult.
    const ACTS = {
        rest: { label: '앉아 있기', when: '앉아 있을 때', vo2: 250, hr: 70, sv: 70, rr: 12, tv: 500, gfr: 125, urine: 1.0 },
        water: { label: '물 마시고 쉬기', when: '물을 마시고 쉴 때', vo2: 250, hr: 72, sv: 70, rr: 12, tv: 500, gfr: 130, urine: 4.0 },
        walk: { label: '걷기', when: '걸을 때', vo2: 900, hr: 100, sv: 85, rr: 20, tv: 900, gfr: 110, urine: 0.7 },
        run: { label: '달리기', when: '달릴 때', vo2: 2500, hr: 160, sv: 110, rr: 35, tv: 1800, gfr: 95, urine: 0.4 },
    };
    const DEAD_SPACE = 150;      // mL of each breath that never reaches the air sacs
    const O2_PER_GLUCOSE = 0.746; // litres of oxygen to burn one gram of glucose
    const BLOOD_VOLUME = 5;      // litres
    const PLASMA_GLUCOSE = 1;    // mg per mL of blood plasma
    const AIR_O2 = 0.21;
    const GRAPH = { x0: 116, x1: 424, y0: 158, y1: 24 };

    let act = 'rest';
    let prediction = null;

    const minutes = () => Number(timeRange.value);

    function derive(key = act) {
        const d = ACTS[key];
        const co = (d.hr * d.sv) / 1000;                 // litres of blood each minute
        const avDiff = d.vo2 / co;                       // mL of oxygen taken from each litre
        const ve = (d.rr * d.tv) / 1000;                 // all the air moved
        const va = (d.rr * (d.tv - DEAD_SPACE)) / 1000;  // only the air that reaches the air sacs
        const feO2 = AIR_O2 - d.vo2 / (va * 1000);       // what is left in the breath we let out
        const glucose = d.vo2 / 1000 / O2_PER_GLUCOSE;   // grams burned each minute
        const kcal = (d.vo2 / 1000) * 5;
        const filteredGlucose = d.gfr * PLASMA_GLUCOSE;  // mg filtered each minute, all taken back
        const circTime = (BLOOD_VOLUME / co) * 60;       // seconds for one lap of the body
        const ratio = d.urine / ACTS.rest.urine;
        const verdict = ratio > 1.05 ? 'more' : ratio < 0.95 ? 'less' : 'same';
        return { key, d, co, avDiff, ve, va, feO2, glucose, kcal, filteredGlucose, circTime, ratio, verdict };
    }

    const fmt = (n, d = 1) => n.toFixed(d);

    function statRow(x, y, name, value, colour, alignEnd) {
        return `<text class="stat-name" x="${x}" y="${y}">${name}</text>` +
               `<text class="stat-value" style="fill:${colour}" x="${alignEnd}" y="${y}" text-anchor="end">${value}</text>`;
    }

    function renderMain(a) {
        const CX = 230;
        const beat = 60 / a.d.hr, breath = 60 / a.d.rr;
        let out = '';
        out += `<text class="organ-label" x="${CX}" y="18" text-anchor="middle">${a.d.label}</text>`;
        out += `<rect class="torso" x="186" y="24" width="88" height="148" rx="28"/>`;

        // the blood loop, with cells taking one real lap of the body
        const path = 'M230,80 C194,86 192,118 200,142 C210,168 250,168 260,142 C268,118 266,86 230,80';
        out += `<path id="bloodPath" class="vessel" d="${path}"/>`;
        for (let i = 0; i < 8; i += 1) {
            out += `<circle class="blood${i % 2 ? ' spent' : ''}" r="3.2">` +
                   `<animateMotion dur="${a.circTime.toFixed(2)}s" repeatCount="indefinite" ` +
                   `begin="${(-i * a.circTime / 8).toFixed(2)}s"><mpath href="#bloodPath"/></animateMotion></circle>`;
        }

        // lungs filling and emptying at the real breathing rate
        [206, 254].forEach(cx => {
            out += `<ellipse class="lung" cx="${cx}" cy="56" rx="16" ry="22">` +
                   `<animate attributeName="ry" values="19;25;19" dur="${breath.toFixed(2)}s" repeatCount="indefinite"/></ellipse>`;
        });
        out += `<text class="organ-label" x="186" y="58" text-anchor="end">폐</text>`;

        // the heart, squeezing at the real pulse
        out += `<ellipse class="heart" cx="${CX}" cy="96" rx="15" ry="17">` +
               `<animate attributeName="rx" values="15;11.5;15" dur="${beat.toFixed(3)}s" repeatCount="indefinite"/>` +
               `<animate attributeName="ry" values="17;13;17" dur="${beat.toFixed(3)}s" repeatCount="indefinite"/></ellipse>`;
        // outside the torso: the right side of the blood loop passes there
        out += `<text class="organ-label" x="182" y="99" text-anchor="end">심장</text>`;

        out += `<path class="gut" d="M204,120 q10,-8 20,0 q10,8 20,0 q10,-8 12,6 q-2,12 -14,10 q-12,-2 -20,4 q-10,6 -18,-2 q-6,-8 0,-18 Z"/>`;
        out += `<text class="organ-label" x="190" y="132" text-anchor="end">소장</text>`;

        [206, 254].forEach(cx => { out += `<ellipse class="kidney" cx="${cx}" cy="156" rx="12" ry="14"/>`; });
        out += `<text class="organ-label" x="190" y="160" text-anchor="end">콩팥</text>`;

        // Breathing and pumping on the left, feeding and filtering on the right.
        // The columns stop short of the body so the organ labels have room.
        out += `<text class="group-title" style="fill:#8fd0ef" x="14" y="40">호흡</text>`;
        out += statRow(14, 56, '호흡수', `${a.d.rr} 회/분`, '#cfe6ee', 144);
        out += statRow(14, 70, '1회 호흡량', `${a.d.tv} mL`, '#cfe6ee', 144);
        out += statRow(14, 84, '분당 환기량', `${fmt(a.ve)} L/분`, '#8fd0ef', 144);
        out += `<text class="group-title" style="fill:#ff8a8a" x="14" y="106">순환</text>`;
        out += statRow(14, 122, '심장 박동수', `${a.d.hr} 회/분`, '#cfe6ee', 144);
        out += statRow(14, 136, '1회 박출량', `${a.d.sv} mL`, '#cfe6ee', 144);
        out += statRow(14, 150, '심박출량', `${fmt(a.co)} L/분`, '#ff8a8a', 144);

        out += `<text class="group-title" style="fill:#d9b070" x="300" y="40">소화·흡수</text>`;
        out += statRow(300, 56, '쓰는 포도당', `${fmt(a.glucose, 2)} g/분`, '#d9b070', 452);
        out += statRow(300, 70, '내는 열량', `${fmt(a.kcal, 1)} kcal/분`, '#cfe6ee', 452);
        out += `<text class="group-title" style="fill:#c9a6f0" x="300" y="106">배설</text>`;
        out += statRow(300, 122, '사구체 여과량', `${a.d.gfr} mL/분`, '#cfe6ee', 452);
        out += statRow(300, 136, '오줌 양', `${fmt(a.d.urine, 1)} mL/분`, '#c9a6f0', 452);
        out += statRow(300, 150, '오줌 속 포도당', `0 mg`, '#cfe6ee', 452);

        out += `<text class="note-text" x="14" y="188">산소 소비량 ${a.d.vo2} mL/분 = 심박출량 ${fmt(a.co)} L × 1 L에서 뽑아 쓴 ${fmt(a.avDiff, 0)} mL</text>`;
        out += `<text class="note-text" x="14" y="204">피가 온몸을 한 바퀴 도는 데 ${fmt(a.circTime, 0)} 초 · 내쉰 숨의 산소 ${fmt(a.feO2 * 100, 1)} % — 심장과 폐는 실제 빠르기입니다</text>`;
        mainGroup.innerHTML = out;
    }

    const ROWS = [
        { name: '산소 소비량', pick: a => a.d.vo2, unit: 'mL/분', colour: '#8fd0ef' },
        { name: '분당 환기량', pick: a => a.ve, unit: 'L/분', colour: '#52c7ff', digits: 1 },
        { name: '심박출량', pick: a => a.co, unit: 'L/분', colour: '#ff8a8a', digits: 1 },
        { name: '사구체 여과량', pick: a => a.d.gfr, unit: 'mL/분', colour: '#c9a6f0' },
        { name: '오줌 양', pick: a => a.d.urine, unit: 'mL/분', colour: '#b8a6f0', digits: 1 },
    ];

    function renderGraph(a) {
        const base = derive('rest');
        const ratios = ROWS.map(r => r.pick(a) / r.pick(base));
        const max = Math.max(1.3, ...ratios) * 1.12;
        const gx = v => GRAPH.x0 + (v / max) * (GRAPH.x1 - GRAPH.x0);
        let out = '';
        for (let i = 0; i <= 4; i += 1) {
            const v = (max / 4) * i;
            out += `<line class="grid-line" x1="${gx(v).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(v).toFixed(1)}" y2="${GRAPH.y0}"/>`;
            out += `<text class="axis-text" x="${gx(v).toFixed(1)}" y="${GRAPH.y0 + 14}" text-anchor="middle">${v.toFixed(1)}</text>`;
        }
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        out += `<text class="axis-title" x="${((GRAPH.x0 + GRAPH.x1) / 2).toFixed(1)}" y="${GRAPH.y0 + 30}" text-anchor="middle">앉아 있을 때를 1로 본 배수</text>`;
        out += `<line class="base-line" x1="${gx(1).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(1).toFixed(1)}" y2="${GRAPH.y0}"/>`;
        out += `<text class="base-text" x="${(gx(1) + 4).toFixed(1)}" y="${GRAPH.y1 + 9}">기준 1배</text>`;

        ROWS.forEach((row, i) => {
            const y = GRAPH.y1 + 22 + i * 26;
            const value = row.pick(a), ratio = ratios[i];
            const colour = ratio > 1.02 ? row.colour : ratio < 0.98 ? '#ff9d6b' : '#9cb6b4';
            out += `<text class="axis-text" x="${GRAPH.x0 - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end">${row.name}</text>`;
            out += `<rect class="bar" x="${GRAPH.x0}" y="${y - 5}" width="${Math.max(2, gx(ratio) - GRAPH.x0).toFixed(1)}" height="13" rx="3" fill="${colour}" opacity=".82"/>`;
            const label = `${ratio.toFixed(2)}배 · ${value.toFixed(row.digits ?? 0)} ${row.unit}`;
            const flip = gx(ratio) > GRAPH.x1 - 110;
            out += `<text class="bar-text" fill="${colour}" x="${(gx(ratio) + (flip ? -6 : 6)).toFixed(1)}" y="${(y + 5).toFixed(1)}"${flip ? ' text-anchor="end"' : ''}>${label}</text>`;
        });
        graphGroup.innerHTML = out;
    }

    function render() {
        const a = derive();
        renderMain(a);
        renderGraph(a);
        timeOutput.textContent = `${minutes()} 분`;
        stageBadge.textContent = `${a.d.label} · 심장 ${a.d.hr}회/분`;
        const t = minutes();
        dataNote.innerHTML =
            `<div class="data-row"><span class="data-name">산소 소비량</span><span class="data-val">심박출량 ${fmt(a.co)} L/분 × 1 L당 ${fmt(a.avDiff, 0)} mL = ${a.d.vo2} mL/분</span></div>` +
            `<div class="data-row"><span class="data-name">숨</span><span class="data-val">${a.d.rr} 회 × ${a.d.tv} mL = ${fmt(a.ve)} L/분 · 내쉰 숨의 산소 ${fmt(a.feO2 * 100, 1)} %</span></div>` +
            `<div class="data-row"><span class="data-name">양분</span><span class="data-val">포도당 ${fmt(a.glucose, 2)} g/분 · ${t} 분이면 ${fmt(a.glucose * t, 1)} g (${fmt(a.kcal * t, 0)} kcal)</span></div>` +
            `<div class="data-row"><span class="data-name">콩팥</span><span class="data-val">포도당 ${fmt(a.filteredGlucose, 0)} mg/분을 걸렀다가 모두 되찾습니다</span></div>` +
            `<div class="data-row match"><span class="data-name">${t} 분 동안</span><span class="data-val">산소 ${fmt((a.d.vo2 * t) / 1000, 1)} L · 오줌 ${fmt(a.d.urine * t, 0)} mL</span></div>`;
        return a;
    }

    const VERDICT = { more: '늘어난다', same: '그대로다', less: '줄어든다' };

    function check() {
        const a = derive();
        const t = minutes();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        valueA.textContent = `${fmt((a.d.vo2 * t) / 1000, 1)} L`;
        valueB.textContent = `${fmt(a.d.urine * t, 0)} mL`;
        predictionResult.textContent = !prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        const base = derive('rest');
        let s = `${a.d.when} 산소를 1분에 ${a.d.vo2} mL 씁니다. `;
        s += a.key === 'rest' || a.key === 'water'
            ? `이것이 견주어 볼 기준입니다. `
            : `앉아 있을 때의 ${fmt(a.d.vo2 / base.d.vo2, 1)}배입니다. `;
        s += `이만큼을 나르려고 심장은 1분에 ${a.d.hr}번 뛰며 ${fmt(a.co)} L 를 내보내고, 폐는 ${a.d.rr}번 숨 쉬며 ${fmt(a.ve)} L 의 공기를 움직입니다. `;
        if (a.key === 'run') {
            s += `이때 심박출량은 ${fmt(a.co / base.co, 1)}배밖에 늘지 않았는데 산소 소비량은 ${fmt(a.d.vo2 / base.d.vo2, 1)}배가 되었습니다. ` +
                 `세포가 피 1 L 에서 뽑아 쓰는 산소가 ${fmt(base.avDiff, 0)} mL 에서 ${fmt(a.avDiff, 0)} mL 로 늘었기 때문입니다. `;
            s += `숨을 아주 많이 쉬어서 내쉰 숨의 산소가 오히려 ${fmt(base.feO2 * 100, 1)} % 에서 ${fmt(a.feO2 * 100, 1)} % 로 높아졌습니다. `;
        }
        if (a.verdict === 'less') s += `피가 근육으로 몰려 콩팥으로 가는 피가 줄었습니다. 사구체 여과량이 ${base.d.gfr} 에서 ${a.d.gfr} mL/분으로 줄어 오줌도 ${fmt(a.d.urine, 1)} mL/분으로 적어졌습니다.`;
        else if (a.verdict === 'more') s += `물을 마셔 몸속 물이 많아지자 콩팥이 물을 덜 되찾아 오줌이 ${fmt(a.d.urine, 1)} mL/분으로 늘었습니다. 몸속 물의 양을 콩팥이 조절합니다.`;
        else s += `콩팥은 걸러 낸 포도당 ${fmt(a.filteredGlucose, 0)} mg/분을 모두 되찾아 오줌으로는 내보내지 않습니다.`;
        explanation.textContent = s;
    }

    timeRange.addEventListener('input', () => { render(); if (!resultContent.hidden) check(); });
    actButtons.forEach(button => button.addEventListener('click', () => {
        act = button.dataset.act;
        actButtons.forEach(item => item.classList.toggle('selected', item === button));
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkBtn.addEventListener('click', check);
    resetBtn.addEventListener('click', () => {
        timeRange.value = '10';
        prediction = null;
        predictionButtons.forEach(item => item.classList.remove('selected'));
        stageCaption.textContent = '심장과 폐는 실제 빠르기로 뜁니다. 활동을 바꾸면 눈에 띄게 빨라집니다.';
        actButtons.find(b => b.dataset.act === 'rest').click();
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

    window.__bodyModel = {
        ACTS, DEAD_SPACE, O2_PER_GLUCOSE, BLOOD_VOLUME, AIR_O2, derive, render, check,
        setAct(k) { actButtons.find(b => b.dataset.act === k).click(); },
        setMinutes(v) { timeRange.value = String(v); timeRange.dispatchEvent(new Event('input')); },
        getAct: () => act, minutes,
    };

    resetBtn.click();
});
