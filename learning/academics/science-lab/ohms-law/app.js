document.addEventListener('DOMContentLoaded', () => {
    const wiringButtons = [...document.querySelectorAll('[data-wiring]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const voltRange = document.getElementById('voltRange');
    const r1Range = document.getElementById('r1Range');
    const r2Range = document.getElementById('r2Range');
    const voltOutput = document.getElementById('voltOutput');
    const r1Output = document.getElementById('r1Output');
    const r2Output = document.getElementById('r2Output');
    const checkBtn = document.getElementById('checkBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const resultR = document.getElementById('resultR');
    const resultI = document.getElementById('resultI');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const circuitGroup = document.getElementById('circuitGroup');
    const graphGroup = document.getElementById('graphGroup');

    const V_MAX = 12;
    const GRAPH = { x0: 60, x1: 430, y0: 170, y1: 20 };

    let wiring = 'series';
    let prediction = null;

    const V = () => Number(voltRange.value);
    const R1 = () => Number(r1Range.value);
    const R2 = () => Number(r2Range.value);

    // Ohm's law with two resistors. Series adds resistances and shares the
    // current; parallel shares the voltage and adds the currents. Every number
    // shown on the page is read off this one function.
    function analyse() {
        const v = V(), r1 = R1(), r2 = R2();
        if (wiring === 'series') {
            const R = r1 + r2;
            const I = v / R;
            return { R, I, v1: I * r1, v2: I * r2, i1: I, i2: I };
        }
        const R = (r1 * r2) / (r1 + r2);
        const i1 = v / r1, i2 = v / r2;
        return { R, I: i1 + i2, v1: v, v2: v, i1, i2 };
    }

    const NICE = [0.25, 0.5, 1, 2, 3, 5];
    const niceMax = i => NICE.find(n => n >= i * 1.05) ?? Math.ceil(i);

    const gx = v => GRAPH.x0 + (v / V_MAX) * (GRAPH.x1 - GRAPH.x0);
    const gy = (i, iMax) => GRAPH.y0 - (i / iMax) * (GRAPH.y0 - GRAPH.y1);

    function resistorSymbol(cx, cy, label, sub) {
        const w = 46, h = 11;
        let d = `M${cx - w / 2},${cy}`;
        for (let i = 0; i < 6; i += 1) {
            d += ` L${(cx - w / 2 + (w / 6) * (i + 0.5)).toFixed(1)},${cy + (i % 2 === 0 ? -h : h)}`;
        }
        d += ` L${cx + w / 2},${cy}`;
        return `<rect class="resistor-box" x="${cx - w / 2 - 4}" y="${cy - h - 5}" width="${w + 8}" height="${h * 2 + 10}" rx="4"/>` +
               `<path class="resistor" d="${d}"/>` +
               `<text class="comp-label" x="${cx}" y="${cy - h - 11}" text-anchor="middle">${label}</text>` +
               `<text class="comp-sub" x="${cx}" y="${cy + h + 18}" text-anchor="middle">${sub}</text>`;
    }

    const batterySymbol = (x, y) =>
        `<rect class="battery-body" x="${x - 13}" y="${y - 12}" width="26" height="24" rx="3"/>` +
        `<rect class="battery-cap" x="${x - 3}" y="${y - 16}" width="6" height="4" rx="1"/>` +
        `<text class="comp-label" x="${x}" y="${y + 30}" text-anchor="middle">${V().toFixed(1)} V</text>`;

    const meterSymbol = (x, y, text) =>
        `<rect class="meter" x="${x - 30}" y="${y - 13}" width="60" height="26" rx="6"/>` +
        `<text class="meter-text" x="${x}" y="${y + 4}" text-anchor="middle">${text}</text>`;

    function renderCircuit() {
        const a = analyse();
        const dur = i => `style="animation-duration:${Math.max(0.25, Math.min(4, 1 / Math.max(0.05, i))).toFixed(2)}s"`;
        let out = '';

        if (wiring === 'series') {
            const L = 70, R = 400, T = 62, B = 178;
            const loop = `M${L},${112} L${L},${T} L${R},${T} L${R},${B} L${L},${B} L${L},${138}`;
            out += `<path class="wire" d="${loop}"/>`;
            out += `<path class="current" d="${loop}" ${dur(a.I)}/>`;
            out += batterySymbol(L, 125);
            out += resistorSymbol(178, T, `R₁ ${R1()} Ω`, `${a.v1.toFixed(2)} V · ${a.i1.toFixed(2)} A`);
            out += resistorSymbol(300, T, `R₂ ${R2()} Ω`, `${a.v2.toFixed(2)} V · ${a.i2.toFixed(2)} A`);
            out += meterSymbol(235, B, `${a.I.toFixed(2)} A`);
            out += `<text class="comp-sub" x="235" y="${B + 30}" text-anchor="middle">두 저항에 같은 전류가 흐릅니다</text>`;
        } else {
            const LR = 175, RR = 355, T = 62, B = 178;
            const lead = `M70,112 L70,36 L${LR},36 L${LR},${T}`;
            const ret = `M70,138 L70,196 L${RR},196 L${RR},${B}`;
            out += `<path class="wire" d="${lead}"/><path class="wire" d="${ret}"/>`;
            out += `<path class="wire" d="M${LR},${T} L${LR},${B}"/><path class="wire" d="M${RR},${T} L${RR},${B}"/>`;
            out += `<path class="current" d="${lead}" ${dur(a.I)}/><path class="current" d="${ret}" ${dur(a.I)}/>`;
            [[T, `R₁ ${R1()} Ω`, a.v1, a.i1], [B, `R₂ ${R2()} Ω`, a.v2, a.i2]].forEach(([y, label, vv, ii]) => {
                const branch = `M${LR},${y} L${RR},${y}`;
                out += `<path class="wire" d="${branch}"/>`;
                out += `<path class="current" d="${branch}" ${dur(ii)}/>`;
                out += resistorSymbol((LR + RR) / 2, y, label, `${vv.toFixed(2)} V · ${ii.toFixed(2)} A`);
            });
            out += batterySymbol(70, 125);
            out += meterSymbol(408, 117, `${a.I.toFixed(2)} A`);
            out += `<text class="comp-sub" x="230" y="16" text-anchor="middle">두 저항에 같은 전압이 걸립니다</text>`;
        }
        circuitGroup.innerHTML = out;
    }

    function renderGraph() {
        const a = analyse();
        const iAtMax = V_MAX / a.R;
        const iMax = niceMax(Math.max(iAtMax, V_MAX / R1()));
        let out = '';

        for (let k = 0; k <= 4; k += 1) {
            const y = GRAPH.y0 - (k / 4) * (GRAPH.y0 - GRAPH.y1);
            out += `<line class="grid-line" x1="${GRAPH.x0}" y1="${y}" x2="${GRAPH.x1}" y2="${y}"/>`;
            out += `<text class="axis-text" x="${GRAPH.x0 - 8}" y="${y + 3}" text-anchor="end">${((iMax * k) / 4).toFixed(2)}</text>`;
        }
        for (let v = 0; v <= V_MAX; v += 3) {
            out += `<line class="grid-line" x1="${gx(v)}" y1="${GRAPH.y1}" x2="${gx(v)}" y2="${GRAPH.y0}"/>`;
            out += `<text class="axis-text" x="${gx(v)}" y="${GRAPH.y0 + 15}" text-anchor="middle">${v}</text>`;
        }
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        out += `<text class="axis-title" x="${(GRAPH.x0 + GRAPH.x1) / 2}" y="${GRAPH.y0 + 31}" text-anchor="middle">전압 (V)</text>`;
        out += `<text class="axis-title" x="${GRAPH.x0}" y="${GRAPH.y1 + 2}">전류 (A)</text>`;

        const px = gx(V()), py = gy(a.I, iMax);
        // At high voltage the point sits near the right edge, where a label
        // hung to its right runs off the canvas — flip it inward there, and
        // keep it clear of the top edge when the current is large.
        const flip = px > (GRAPH.x0 + GRAPH.x1) / 2;
        const labelY = Math.max(GRAPH.y1 - 6, py - 8);

        // R1 alone, for comparison with the combined resistance
        const r1Y = gy(V_MAX / R1(), iMax);
        // Both this label and the operating-point label hang off the right edge,
        // so when the two lines run close together drop this one below its line
        // rather than letting the two sit on top of each other.
        const r1LabelY = (flip && Math.abs((r1Y - 6) - labelY) < 15)
            ? Math.min(GRAPH.y0 - 4, r1Y + 15)
            : r1Y - 6;
        out += `<path class="iv-line ghost" d="M${gx(0)},${gy(0, iMax)} L${gx(V_MAX)},${r1Y}"/>`;
        out += `<text class="axis-text" x="${GRAPH.x1 - 4}" y="${r1LabelY.toFixed(1)}" text-anchor="end">R₁만</text>`;
        // the combined resistance: I = V/R is a straight line through the origin
        out += `<path class="iv-line" d="M${gx(0)},${gy(0, iMax)} L${gx(V_MAX)},${gy(iAtMax, iMax)}"/>`;

        out += `<line class="op-guide" x1="${px}" y1="${GRAPH.y0}" x2="${px}" y2="${py.toFixed(1)}"/>`;
        out += `<line class="op-guide" x1="${GRAPH.x0}" y1="${py.toFixed(1)}" x2="${px}" y2="${py.toFixed(1)}"/>`;
        out += `<circle class="op-point" cx="${px}" cy="${py.toFixed(1)}" r="5"/>`;
        out += `<text class="op-text" x="${(px + (flip ? -9 : 9)).toFixed(1)}" y="${labelY.toFixed(1)}"` +
               `${flip ? ' text-anchor="end"' : ''}>${V().toFixed(1)} V, ${a.I.toFixed(2)} A</text>`;
        graphGroup.innerHTML = out;
    }

    function render() {
        voltOutput.textContent = `${V().toFixed(1)} V`;
        r1Output.textContent = `${R1()} Ω`;
        r2Output.textContent = `${R2()} Ω`;
        stageBadge.textContent = wiring === 'series' ? '직렬연결' : '병렬연결';
        renderCircuit();
        renderGraph();
    }

    function clearResult() { resultEmpty.hidden = false; resultContent.hidden = true; }

    function check() {
        const a = analyse();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        resultR.textContent = `${a.R.toFixed(1)} Ω`;
        resultI.textContent = `${a.I.toFixed(2)} A`;

        const actual = a.R > R1() ? 'bigger' : a.R < R1() ? 'smaller' : 'same';
        predictionResult.textContent = !prediction
            ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === actual ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';

        if (wiring === 'series') {
            stageCaption.textContent = `직렬이라 합성 저항이 ${R1()} + ${R2()} = ${a.R.toFixed(0)} Ω 이고, 전류는 ${a.I.toFixed(2)} A 입니다.`;
            explanation.textContent = `직렬연결에서는 전류가 흐를 길이 하나뿐이라 두 저항에 같은 ${a.I.toFixed(2)} A가 흐르고, 전압은 저항에 비례해 ${a.v1.toFixed(2)} V와 ${a.v2.toFixed(2)} V로 나뉩니다. 두 전압을 더하면 전원 전압 ${V().toFixed(1)} V가 됩니다.`;
        } else {
            stageCaption.textContent = `병렬이라 합성 저항이 ${a.R.toFixed(1)} Ω 으로 각 저항보다 작고, 전류는 ${a.I.toFixed(2)} A 입니다.`;
            explanation.textContent = `병렬연결에서는 두 저항에 같은 ${V().toFixed(1)} V가 걸리고, 전류는 ${a.i1.toFixed(2)} A와 ${a.i2.toFixed(2)} A로 나뉘어 흐른 뒤 합쳐집니다. 길이 늘어난 셈이므로 합성 저항은 가장 작은 저항보다도 작아집니다.`;
        }
    }

    wiringButtons.forEach(button => button.addEventListener('click', () => {
        wiring = button.dataset.wiring;
        wiringButtons.forEach(item => item.classList.toggle('selected', item === button));
        render(); clearResult();
    }));
    [voltRange, r1Range, r2Range].forEach(el => el.addEventListener('input', () => { render(); clearResult(); }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkBtn.addEventListener('click', check);

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

    window.__ohmModel = {
        analyse, GRAPH, V_MAX, gx, gy, niceMax,
        set(v, r1, r2, w) {
            if (w) { wiring = w; wiringButtons.forEach(b => b.classList.toggle('selected', b.dataset.wiring === w)); }
            if (v !== undefined) voltRange.value = String(v);
            if (r1 !== undefined) r1Range.value = String(r1);
            if (r2 !== undefined) r2Range.value = String(r2);
            render();
        },
        state: () => ({ V: V(), R1: R1(), R2: R2(), wiring }),
    };

    render();
    clearResult();
});
