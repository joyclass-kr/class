document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = [...document.querySelectorAll('[data-mode]')];
    const fluidButtons = [...document.querySelectorAll('[data-fluid]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const buoyControls = document.getElementById('buoyControls');
    const gasControls = document.getElementById('gasControls');
    const massRange = document.getElementById('massRange');
    const volRange = document.getElementById('volRange');
    const gasVolRange = document.getElementById('gasVolRange');
    const massOutput = document.getElementById('massOutput');
    const volOutput = document.getElementById('volOutput');
    const gasVolOutput = document.getElementById('gasVolOutput');
    const checkBtn = document.getElementById('checkBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const labelA = document.getElementById('labelA');
    const labelB = document.getElementById('labelB');
    const valueA = document.getElementById('valueA');
    const valueB = document.getElementById('valueB');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const mainGroup = document.getElementById('mainGroup');
    const graphGroup = document.getElementById('graphGroup');
    const dataNote = document.getElementById('dataNote');

    const FLUIDS = {
        water: { name: '물',     rho: 1.00, fill: 'rgba(110,200,235,.30)' },
        brine: { name: '소금물', rho: 1.20, fill: 'rgba(150,215,240,.34)' },
        oil:   { name: '식용유', rho: 0.92, fill: 'rgba(232,208,122,.30)' },
    };
    const G = 9.8;
    const P0 = 100, V0 = 50;          // kPa at mL, the reference state

    /* 숫자 뒤 조사는 그 수를 읽은 끝소리를 따릅니다. 영 일 이 삼 사 오 육 칠 팔 구 —
       1.00은 '영'으로 끝나 받침이 있어 '과', 0.92는 '이'로 끝나 '와'입니다. */
    const DIGIT_JONG = { '0': 21, '1': 8, '2': 0, '3': 16, '4': 0, '5': 0, '6': 1, '7': 8, '8': 8, '9': 0 };
    const wa = n => `${n}${DIGIT_JONG[String(n).replace(/[^0-9]/g, '').slice(-1)] > 0 ? '과' : '와'}`;
    const TANK = { x0: 110, x1: 330, surface: 88, bottom: 228 };
    const GRAPH = { x0: 54, x1: 428, y0: 142, y1: 20 };

    let mode = 'buoy';
    let fluid = 'water';
    let prediction = null;

    const mass = () => Number(massRange.value);
    const vol = () => Number(volRange.value);
    const gasVol = () => Number(gasVolRange.value);

    // Density decides everything here. A floating body sinks until the liquid
    // it pushes aside weighs as much as the body does, which makes the
    // submerged fraction exactly the ratio of the two densities.
    function buoyancy() {
        const rhoObj = mass() / vol();
        const rhoFl = FLUIDS[fluid].rho;
        // Three outcomes, not two. When the densities match exactly the body is
        // neutrally buoyant: fully submerged, yet held up entirely by buoyancy
        // with nothing left for the floor to push against, so it hovers rather
        // than resting on the bottom.
        const EPS = 1e-9;
        const state = rhoObj < rhoFl - EPS ? 'float'
                    : rhoObj > rhoFl + EPS ? 'sink' : 'neutral';
        const floats = state === 'float';
        const frac = floats ? rhoObj / rhoFl : 1;
        const vSub = vol() * frac;
        // ρ in g/cm³ is 1000 kg/m³ and V in cm³ is 1e-6 m³, so ρ·V·g in these
        // units comes out in newtons with a factor of 9.8e-3.
        const buoyN = rhoFl * vSub * G * 1e-3;
        const weightN = mass() * G * 1e-3;
        return { rhoObj, rhoFl, state, floats, frac, vSub, buoyN, weightN,
            normalN: state === 'sink' ? Math.max(0, weightN - buoyN) : 0 };
    }

    // Boyle's law at constant temperature: the same particles in a smaller
    // space collide with the walls more often, so P V stays constant.
    const pressureOf = v => (P0 * V0) / v;

    // Fixed normalised particle spots, so shrinking the gas space genuinely
    // crowds the same particles instead of removing any.
    const PARTICLES = (() => {
        let seed = 11;
        const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
        return Array.from({ length: 22 }, () => ({ u: rnd(), v: rnd(), r: 2 + rnd() * 1.4 }));
    })();

    const gx = (v, lo, hi) => GRAPH.x0 + ((v - lo) / (hi - lo)) * (GRAPH.x1 - GRAPH.x0);
    const gy = (v, max) => GRAPH.y0 - (v / max) * (GRAPH.y0 - GRAPH.y1);

    function renderBuoy() {
        const b = buoyancy();
        const f = FLUIDS[fluid];
        const side = 12 * Math.cbrt(vol());
        const cx = (TANK.x0 + TANK.x1) / 2;
        // floating: broken by the surface; neutral: hovering mid-liquid;
        // sinking: resting on the floor
        const topY = b.state === 'float' ? TANK.surface - side * (1 - b.frac)
                   : b.state === 'neutral' ? (TANK.surface + TANK.bottom) / 2 - side / 2
                   : TANK.bottom - side;

        let out = '';
        out += `<rect class="liquid" x="${TANK.x0 + 2}" y="${TANK.surface}" width="${TANK.x1 - TANK.x0 - 4}" height="${TANK.bottom - TANK.surface}" fill="${f.fill}"/>`;
        out += `<ellipse class="liquid-surface" cx="${cx}" cy="${TANK.surface}" rx="${(TANK.x1 - TANK.x0 - 4) / 2}" ry="4"/>`;
        out += `<path class="tank" fill="none" d="M${TANK.x0},52 L${TANK.x0},${TANK.bottom} L${TANK.x1},${TANK.bottom} L${TANK.x1},52"/>`;
        out += `<rect class="block" x="${(cx - side / 2).toFixed(1)}" y="${topY.toFixed(1)}" width="${side.toFixed(1)}" height="${side.toFixed(1)}" rx="3" fill="#d97706"/>`;
        out += `<text class="block-label" x="${cx}" y="${(topY + side / 2 + 4).toFixed(1)}" text-anchor="middle">${b.rhoObj.toFixed(2)}</text>`;
        out += `<text class="zone-label" x="${TANK.x0}" y="44">${f.name} (밀도 ${f.rho.toFixed(2)})</text>`;
        out += `<text class="zone-label" x="${TANK.x1 + 6}" y="${TANK.surface + 4}">수면</text>`;

        // force arrows, drawn to scale against the largest weight in range
        const scale = 62 / (240 * G * 1e-3);
        const ax = 392, base = 150;
        const upLen = b.buoyN * scale, dnLen = b.weightN * scale;
        out += `<line class="force-arrow force-up" x1="${ax}" y1="${base}" x2="${ax}" y2="${(base - upLen).toFixed(1)}"/>`;
        out += `<path class="force-arrow force-up" d="M${ax - 5},${(base - upLen + 7).toFixed(1)} L${ax},${(base - upLen).toFixed(1)} L${ax + 5},${(base - upLen + 7).toFixed(1)}" fill="none"/>`;
        // With small forces both arrows are short and the two labels land on top
        // of each other, so each is held clear of the mid-line.
        const upTextY = Math.min(base - upLen + 4, base - 6);
        const dnTextY = Math.max(base + dnLen + 4, base + 18);
        out += `<text class="force-text" fill="#059669" x="${ax + 9}" y="${upTextY.toFixed(1)}">부력 ${b.buoyN.toFixed(2)} N</text>`;
        out += `<line class="force-arrow force-down" x1="${ax}" y1="${base}" x2="${ax}" y2="${(base + dnLen).toFixed(1)}"/>`;
        out += `<path class="force-arrow force-down" d="M${ax - 5},${(base + dnLen - 7).toFixed(1)} L${ax},${(base + dnLen).toFixed(1)} L${ax + 5},${(base + dnLen - 7).toFixed(1)}" fill="none"/>`;
        out += `<text class="force-text" fill="#ff8a8a" x="${ax + 9}" y="${dnTextY.toFixed(1)}">무게 ${b.weightN.toFixed(2)} N</text>`;
        if (b.state === 'sink' && b.normalN > 0) {
            out += `<text class="force-text" fill="#c79bff" x="${ax - 84}" y="${base + 34}">바닥이 ${b.normalN.toFixed(2)} N 받침</text>`;
        } else if (b.state === 'neutral') {
            out += `<text class="force-text" fill="#059669" x="${ax - 84}" y="${base + 34}">부력 = 무게 (중성 부력)</text>`;
        }
        mainGroup.innerHTML = out;

        // where each fluid's float/sink boundary lies against object density
        const rhoMax = 3;
        let g = '';
        for (let k = 0; k <= 3; k += 1) {
            const y = GRAPH.y0 - (k / 3) * (GRAPH.y0 - GRAPH.y1);
            g += `<line class="grid-line" x1="${GRAPH.x0}" y1="${y}" x2="${GRAPH.x1}" y2="${y}"/>`;
            g += `<text class="axis-text" x="${GRAPH.x0 - 6}" y="${y + 3}" text-anchor="end">${(k * 100 / 3).toFixed(0)}</text>`;
        }
        for (let r = 0; r <= rhoMax; r += 0.5) {
            g += `<text class="axis-text" x="${gx(r, 0, rhoMax)}" y="${GRAPH.y0 + 16}" text-anchor="middle">${r.toFixed(1)}</text>`;
        }
        g += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        g += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        g += `<text class="axis-title" x="${(GRAPH.x0 + GRAPH.x1) / 2}" y="${GRAPH.y0 + 32}" text-anchor="middle">물체의 밀도 (g/cm³)</text>`;
        g += `<text class="axis-title" x="${GRAPH.x0}" y="${GRAPH.y1 - 4}">잠긴 비율 (%)</text>`;
        // submerged fraction against object density: rises to 100% at the
        // fluid's density and stays there once it sinks
        const pts = [];
        for (let k = 0; k <= 120; k += 1) {
            const r = (rhoMax * k) / 120;
            const pct = Math.min(1, r / b.rhoFl) * 100;
            pts.push(`${gx(r, 0, rhoMax).toFixed(1)},${gy(pct, 100).toFixed(1)}`);
        }
        g += `<path class="curve" d="M${pts.join('L')}"/>`;
        g += `<line class="float-line" x1="${gx(b.rhoFl, 0, rhoMax)}" y1="${GRAPH.y0}" x2="${gx(b.rhoFl, 0, rhoMax)}" y2="${GRAPH.y1}"/>`;
        g += `<text class="axis-text" x="${gx(b.rhoFl, 0, rhoMax) + 4}" y="${GRAPH.y0 - 6}" fill="#059669">${f.name} ${b.rhoFl.toFixed(2)}</text>`;
        const px = gx(Math.min(rhoMax, b.rhoObj), 0, rhoMax), py = gy(b.frac * 100, 100);
        g += `<line class="op-guide" x1="${px}" y1="${GRAPH.y0}" x2="${px}" y2="${py.toFixed(1)}"/>`;
        g += `<circle class="op-point" cx="${px}" cy="${py.toFixed(1)}" r="5"/>`;
        const flip = px > (GRAPH.x0 + GRAPH.x1) / 2;
        g += `<text class="op-text" x="${(px + (flip ? -9 : 9)).toFixed(1)}" y="${Math.max(GRAPH.y1 - 4, py - 9).toFixed(1)}"${flip ? ' text-anchor="end"' : ''}>${(b.frac * 100).toFixed(0)}% 잠김</text>`;
        graphGroup.innerHTML = g;

        const equal = Math.abs(b.buoyN - b.weightN) < 1e-9;
        dataNote.innerHTML =
            `<div class="data-row"><span class="data-name">물체의 밀도</span><span class="data-val">${mass()} g ÷ ${vol()} cm³ = ${b.rhoObj.toFixed(3)} g/cm³</span></div>` +
            `<div class="data-row"><span class="data-name">잠긴 부피</span><span class="data-val">${b.vSub.toFixed(1)} cm³ (${(b.frac * 100).toFixed(0)}%)</span></div>` +
            `<div class="data-row${equal ? ' match' : ''}"><span class="data-name">부력 vs 무게</span><span class="data-val">${b.buoyN.toFixed(3)} N ${equal ? '=' : '<'} ${b.weightN.toFixed(3)} N${equal ? ' (평형)' : ''}</span></div>`;

        stageBadge.textContent = `${f.name} · ${b.state === 'float' ? '뜸' : b.state === 'neutral' ? '중성 부력' : '가라앉음'}`;
        massOutput.textContent = `${mass()} g`;
        volOutput.textContent = `${vol()} cm³`;
    }

    function renderGas() {
        const v = gasVol(), p = pressureOf(v);
        const BX0 = 176, BX1 = 260, BTOP = 44, BBOT = 232;
        const PX_PER_ML = (BBOT - BTOP - 16) / V0;
        const gasH = v * PX_PER_ML;
        const gasTop = BBOT - gasH;

        let out = '';
        out += `<rect class="gas-space" x="${BX0 + 3}" y="${gasTop.toFixed(1)}" width="${BX1 - BX0 - 6}" height="${gasH.toFixed(1)}"/>`;
        PARTICLES.forEach(pt => {
            const x = BX0 + 8 + pt.u * (BX1 - BX0 - 16);
            const y = gasTop + 5 + pt.v * Math.max(2, gasH - 10);
            out += `<circle class="gas-particle" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${pt.r.toFixed(1)}"/>`;
        });
        out += `<rect class="plunger" x="${BX0 - 4}" y="${(gasTop - 14).toFixed(1)}" width="${BX1 - BX0 + 8}" height="14" rx="3"/>`;
        out += `<rect class="plunger" x="${(BX0 + BX1) / 2 - 5}" y="${Math.max(10, gasTop - 46).toFixed(1)}" width="10" height="${Math.max(2, gasTop - 14 - Math.max(10, gasTop - 46)).toFixed(1)}" rx="3"/>`;
        out += `<path class="syringe-body" fill="none" d="M${BX0},${BTOP} L${BX0},${BBOT} L${BX1},${BBOT} L${BX1},${BTOP}"/>`;
        out += `<text class="zone-label" x="${BX1 + 12}" y="${(gasTop + gasH / 2).toFixed(1)}">기체 ${v} mL</text>`;
        out += `<text class="pressure-text" x="${BX1 + 12}" y="${(gasTop + gasH / 2 + 20).toFixed(1)}">${p.toFixed(0)} kPa</text>`;
        out += `<text class="axis-text" x="${(BX0 + BX1) / 2}" y="252" text-anchor="middle">입자 수는 그대로, 공간만 좁아집니다</text>`;
        mainGroup.innerHTML = out;

        const pMax = 550;
        let g = '';
        for (let k = 0; k <= 5; k += 1) {
            const y = GRAPH.y0 - (k / 5) * (GRAPH.y0 - GRAPH.y1);
            g += `<line class="grid-line" x1="${GRAPH.x0}" y1="${y}" x2="${GRAPH.x1}" y2="${y}"/>`;
            g += `<text class="axis-text" x="${GRAPH.x0 - 6}" y="${y + 3}" text-anchor="end">${((pMax * k) / 5).toFixed(0)}</text>`;
        }
        for (let vv = 10; vv <= 50; vv += 10) {
            g += `<text class="axis-text" x="${gx(vv, 8, 54)}" y="${GRAPH.y0 + 14}" text-anchor="middle">${vv}</text>`;
        }
        g += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        g += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        g += `<text class="axis-title" x="${(GRAPH.x0 + GRAPH.x1) / 2}" y="${GRAPH.y0 + 30}" text-anchor="middle">부피 (mL)</text>`;
        g += `<text class="axis-title" x="${GRAPH.x0}" y="${GRAPH.y1 - 4}">압력 (kPa)</text>`;
        const pts = [];
        for (let k = 0; k <= 120; k += 1) {
            const vv = 10 + (44 * k) / 120;
            pts.push(`${gx(vv, 8, 54).toFixed(1)},${gy(Math.min(pMax, pressureOf(vv)), pMax).toFixed(1)}`);
        }
        g += `<path class="curve" d="M${pts.join('L')}"/>`;
        const px = gx(v, 8, 54), py = gy(Math.min(pMax, p), pMax);
        g += `<line class="op-guide" x1="${px}" y1="${GRAPH.y0}" x2="${px}" y2="${py.toFixed(1)}"/>`;
        g += `<line class="op-guide" x1="${GRAPH.x0}" y1="${py.toFixed(1)}" x2="${px}" y2="${py.toFixed(1)}"/>`;
        g += `<circle class="op-point" cx="${px}" cy="${py.toFixed(1)}" r="5"/>`;
        const flip = px > (GRAPH.x0 + GRAPH.x1) / 2;
        g += `<text class="op-text" x="${(px + (flip ? -9 : 9)).toFixed(1)}" y="${Math.max(GRAPH.y1 - 4, py - 9).toFixed(1)}"${flip ? ' text-anchor="end"' : ''}>${v} mL, ${p.toFixed(0)} kPa</text>`;
        graphGroup.innerHTML = g;

        dataNote.innerHTML =
            `<div class="data-row"><span class="data-name">압력 × 부피</span><span class="data-val">${p.toFixed(1)} kPa × ${v} mL = ${(p * v).toFixed(0)}</span></div>` +
            `<div class="data-row match"><span class="data-name">기준값</span><span class="data-val">${P0} kPa × ${V0} mL = ${P0 * V0} (언제나 같습니다)</span></div>` +
            `<div class="data-row"><span class="data-name">부피 변화</span><span class="data-val">기준의 ${(v / V0).toFixed(2)}배 → 압력은 ${(p / P0).toFixed(2)}배</span></div>`;

        stageBadge.textContent = `${v} mL · ${p.toFixed(0)} kPa`;
        gasVolOutput.textContent = `${v} mL`;
    }

    const render = () => (mode === 'buoy' ? renderBuoy() : renderGas());
    const clearResult = () => { resultEmpty.hidden = false; resultContent.hidden = true; };

    function check() {
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        if (mode === 'buoy') {
            const b = buoyancy();
            const f = FLUIDS[fluid];
            labelA.textContent = '물체의 밀도';
            labelB.textContent = b.state === 'float' ? '잠긴 정도' : '결과';
            valueA.textContent = `${b.rhoObj.toFixed(2)} g/cm³`;
            valueB.textContent = b.state === 'float' ? `${(b.frac * 100).toFixed(0)} %`
                : b.state === 'neutral' ? '액체 속에 떠 있음' : '가라앉음';
            if (b.state === 'neutral') {
                predictionResult.textContent = '두 밀도가 같아 뜨지도 가라앉지도 않습니다.';
            } else {
                predictionResult.textContent = !prediction
                    ? '다음에는 결과를 먼저 예상해 보세요.'
                    : prediction === b.state ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
            }
            explanation.textContent = b.state === 'float'
                ? `물체의 밀도 ${b.rhoObj.toFixed(2)}가 ${f.name}의 밀도 ${f.rho.toFixed(2)}보다 작아 뜹니다. 뜬 물체는 부력과 무게가 같아지는 깊이까지만 잠기므로, 잠긴 비율이 두 밀도의 비인 ${b.rhoObj.toFixed(2)} ÷ ${f.rho.toFixed(2)} = ${(b.frac * 100).toFixed(0)} %가 됩니다. 부력 ${b.buoyN.toFixed(3)} N과 무게 ${b.weightN.toFixed(3)} N이 정확히 같습니다.`
                : b.state === 'neutral'
                ? `물체의 밀도가 ${f.name}의 밀도 ${wa(f.rho.toFixed(2))} 정확히 같습니다. 완전히 잠긴 상태에서 부력 ${b.buoyN.toFixed(3)} N과 무게 ${b.weightN.toFixed(3)} N이 같아지므로, 바닥에 닿지 않고 액체 속 어디에서든 그대로 머무릅니다. 이것을 중성 부력이라고 합니다.`
                : `물체의 밀도 ${b.rhoObj.toFixed(2)}가 ${f.name}의 밀도 ${f.rho.toFixed(2)}보다 커서 가라앉습니다. 완전히 잠겨도 부력은 ${b.buoyN.toFixed(3)} N 뿐이어서 무게 ${b.weightN.toFixed(3)} N을 못 이기고, 나머지 ${b.normalN.toFixed(3)} N은 바닥이 받쳐 줍니다.`;
        } else {
            const v = gasVol(), p = pressureOf(v);
            labelA.textContent = '기체의 압력';
            labelB.textContent = '압력 × 부피';
            valueA.textContent = `${p.toFixed(0)} kPa`;
            valueB.textContent = `${(p * v).toFixed(0)}`;
            predictionResult.textContent = '부피를 줄이면 압력이 그만큼 커집니다.';
            explanation.textContent = `온도가 일정하면 P V가 일정합니다. 부피를 기준 ${V0} mL 의 ${(v / V0).toFixed(2)}배인 ${v} mL로 줄이면 압력은 ${(p / P0).toFixed(2)}배인 ${p.toFixed(0)} kPa이 됩니다. 입자 수는 그대로인데 공간이 좁아져 벽에 부딪히는 횟수가 늘어난 것입니다.`;
        }
    }

    modeButtons.forEach(button => button.addEventListener('click', () => {
        mode = button.dataset.mode;
        modeButtons.forEach(item => item.classList.toggle('selected', item === button));
        buoyControls.hidden = mode !== 'buoy';
        gasControls.hidden = mode !== 'gas';
        stageCaption.textContent = mode === 'buoy'
            ? '밀도를 바꾸며 뜨는지 가라앉는지 관찰해 보세요.'
            : '부피를 줄이며 압력이 어떻게 변하는지 관찰해 보세요.';
        render(); clearResult();
    }));
    fluidButtons.forEach(button => button.addEventListener('click', () => {
        fluid = button.dataset.fluid;
        fluidButtons.forEach(item => item.classList.toggle('selected', item === button));
        render(); clearResult();
    }));
    [massRange, volRange, gasVolRange].forEach(el => el.addEventListener('input', () => { render(); clearResult(); }));
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

    window.__buoyModel = {
        FLUIDS, G, P0, V0, TANK, buoyancy, pressureOf, PARTICLES,
        setMode(m) { document.querySelector(`[data-mode="${m}"]`).click(); },
        setFluid(f) { document.querySelector(`[data-fluid="${f}"]`).click(); },
        set(m, v) { if (m !== undefined) massRange.value = String(m); if (v !== undefined) volRange.value = String(v); render(); },
        setGas(v) { gasVolRange.value = String(v); render(); },
        mass, vol, gasVol, render,
    };

    render();
    clearResult();
});
