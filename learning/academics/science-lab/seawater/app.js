document.addEventListener('DOMContentLoaded', () => {
    const placeButtons = [...document.querySelectorAll('[data-place]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const tempRange = document.getElementById('tempRange');
    const saltRange = document.getElementById('saltRange');
    const windRange = document.getElementById('windRange');
    const tempOutput = document.getElementById('tempOutput');
    const saltOutput = document.getElementById('saltOutput');
    const windOutput = document.getElementById('windOutput');
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

    // The usual straight-line stand-in for how sea water density depends on
    // temperature and salt: colder is heavier, saltier is heavier.
    const RHO0 = 1027, T0 = 10, S0 = 35;
    const ALPHA = 1.7e-4;     // per degree
    const BETA = 7.6e-4;      // per psu
    const MEAN_RHO = 1026;    // what we compare against
    const DEEP_T = 4, THERMO_M = 400, MAX_DEPTH = 1000;
    const SEA = { x0: 20, x1: 250, top: 48, bottom: 190 };
    const PX_PER_M = (SEA.bottom - SEA.top) / MAX_DEPTH;
    // depth runs downward, so the temperature axis sits along the top
    const GRAPH = { x0: 74, x1: 424, y0: 172, y1: 52 };

    // Whatever the total salinity, the salts keep these proportions.
    const SALTS = [
        { n: '염화 나트륨', pct: 77.7, c: '#e8ecee' },
        { n: '염화 마그네슘', pct: 10.9, c: '#8fd0c0' },
        { n: '황산 마그네슘', pct: 4.7, c: '#7fb8e8' },
        { n: '황산 칼슘', pct: 3.6, c: '#c9a8e0' },
        { n: '기타', pct: 3.1, c: '#b8a888' },
    ];
    const PLACES = {
        equator: { label: '적도', temp: 28, salt: 34, wind: 3, why: '비가 많이 내려 염분이 조금 낮습니다' },
        middle: { label: '중위도', temp: 18, salt: 36, wind: 5, why: '증발이 활발해 염분이 높습니다' },
        polar: { label: '극지방', temp: 1, salt: 33, wind: 7, why: '얼음이 녹아 염분이 낮지만 아주 차갑습니다' },
    };

    let place = 'middle';
    let prediction = null;

    const temp = () => Number(tempRange.value);
    const salt = () => Number(saltRange.value);
    const wind = () => Number(windRange.value);

    function analyse(T = temp(), S = salt(), W = wind()) {
        const rho = RHO0 * (1 - ALPHA * (T - T0) + BETA * (S - S0));
        const mixed = 20 + 8 * W;                       // metres the wind can stir
        const verdict = rho > MEAN_RHO + 0.3 ? 'heavier' : rho < MEAN_RHO - 0.3 ? 'lighter' : 'same';
        // A thermocline needs a warm surface over cold deep water. Where the
        // surface is already as cold, the column is even or slightly inverted.
        const thermo = T - DEEP_T > 2 ? 'normal' : DEEP_T - T > 2 ? 'inverse' : 'weak';
        const grams = SALTS.map(s => (S * s.pct) / 100);
        return { T, S, W, rho, mixed, verdict, thermo, grams, place: PLACES[place] };
    }

    // Temperature at any depth: stirred on top, falling away below, steady deep down.
    function tempAt(z, a) {
        if (z <= a.mixed) return a.T;
        if (z >= a.mixed + THERMO_M) return DEEP_T;
        return a.T + (DEEP_T - a.T) * ((z - a.mixed) / THERMO_M);
    }

    const dy = m => SEA.top + m * PX_PER_M;

    function renderMain(a) {
        const thermoEnd = Math.min(MAX_DEPTH, a.mixed + THERMO_M);
        let out = '';
        let body = '';
        body += `<rect class="layer-mixed" x="${SEA.x0}" y="${SEA.top}" width="${SEA.x1 - SEA.x0}" height="${(dy(a.mixed) - SEA.top).toFixed(1)}"/>`;
        body += `<rect class="layer-thermo" x="${SEA.x0}" y="${dy(a.mixed).toFixed(1)}" width="${SEA.x1 - SEA.x0}" height="${(dy(thermoEnd) - dy(a.mixed)).toFixed(1)}"/>`;
        body += `<rect class="layer-deep" x="${SEA.x0}" y="${dy(thermoEnd).toFixed(1)}" width="${SEA.x1 - SEA.x0}" height="${(SEA.bottom - dy(thermoEnd)).toFixed(1)}"/>`;
        // the wind stirring the top layer
        for (let i = 0; i < Math.max(1, Math.round(a.W / 2) + 1); i += 1) {
            const cx = SEA.x0 + 30 + i * 42;
            if (cx > SEA.x1 - 16) break;
            const r = Math.max(4, (dy(a.mixed) - SEA.top) * 0.3);
            body += `<path class="swirl" d="M${cx - r},${(SEA.top + r + 3).toFixed(1)} a${r},${r} 0 1 1 ${r * 0.7},${r * 0.5}">` +
                    `<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${(SEA.top + r + 3).toFixed(1)}" ` +
                    `to="360 ${cx} ${(SEA.top + r + 3).toFixed(1)}" dur="${(6 - a.W * 0.4).toFixed(1)}s" repeatCount="indefinite"/></path>`;
        }
        // heavy water sinking, light water staying up
        const px = SEA.x1 - 34;
        if (a.verdict === 'heavier') {
            body += `<circle class="parcel" cx="${px}" cy="${SEA.top + 12}" r="7" fill="#5aa8d8">` +
                    `<animate attributeName="cy" values="${SEA.top + 12};${SEA.bottom - 10}" dur="4s" repeatCount="indefinite"/>` +
                    `<animate attributeName="opacity" values="1;1;0" dur="4s" repeatCount="indefinite"/></circle>`;
        } else if (a.verdict === 'lighter') {
            body += `<circle class="parcel" cx="${px}" cy="${SEA.top + 20}" r="7" fill="#ffd8a8">` +
                    `<animate attributeName="cy" values="${SEA.top + 26};${SEA.top + 12};${SEA.top + 26}" dur="3s" repeatCount="indefinite"/></circle>`;
        } else {
            body += `<circle class="parcel" cx="${px}" cy="${SEA.top + 40}" r="7" fill="#bcd8e0"/>`;
        }
        out += `<g clip-path="url(#seaClip)">${body}</g>`;
        out += `<rect class="sea-frame" x="${SEA.x0}" y="${SEA.top}" width="${SEA.x1 - SEA.x0}" height="${SEA.bottom - SEA.top}"/>`;
        out += `<line class="surface-line" x1="${SEA.x0}" y1="${SEA.top}" x2="${SEA.x1}" y2="${SEA.top}"/>`;
        [a.mixed, thermoEnd].forEach(m => {
            out += `<line class="layer-line" x1="${SEA.x0}" y1="${dy(m).toFixed(1)}" x2="${SEA.x1}" y2="${dy(m).toFixed(1)}"/>`;
        });
        // Thin layers would stack their captions on top of one another, so each
        // one is pushed at least a line below the last.
        const l1 = SEA.top + 12;
        const l2 = Math.max(dy(a.mixed) + 12, l1 + 14);
        const l3 = Math.min(Math.max(dy(thermoEnd) + 12, l2 + 14), SEA.bottom - 5);
        out += `<text class="layer-text" x="${SEA.x0 + 6}" y="${l1.toFixed(1)}">혼합층 ${a.mixed} m</text>`;
        out += `<text class="layer-text" x="${SEA.x0 + 6}" y="${l2.toFixed(1)}">${THERMO_NAME[a.thermo]}</text>`;
        out += `<text class="layer-text" x="${SEA.x0 + 6}" y="${l3.toFixed(1)}">심해층 ${DEEP_T} ℃</text>`;
        [0, 500, 1000].forEach(m => {
            // the deepest label goes above its line, clear of the reading below
            const ty = m === MAX_DEPTH ? dy(m) - 5 : dy(m) + 3;
            out += `<text class="depth-text" x="${SEA.x1 + 4}" y="${ty.toFixed(1)}">${m} m</text>`;
        });
        // wind arrows above the water
        for (let i = 0; i < Math.max(1, a.W); i += 1) {
            const y = 34 + (i % 2) * 8, x = SEA.x0 + 10 + Math.floor(i / 2) * 44;
            if (x + 26 > SEA.x1) break;
            out += `<line class="wind-arrow" x1="${x}" y1="${y}" x2="${x + 22}" y2="${y}"/>`;
            out += `<path class="wind-arrow" d="M${x + 16},${y - 4} L${x + 22},${y} L${x + 16},${y + 4}"/>`;
        }
        if (a.W === 0) out += `<text class="small-label" x="${SEA.x0 + 10}" y="40">바람 없음</text>`;

        // the salts, always in the same proportions
        const BX = 282, BW = 158, BY = 60;
        out += `<text class="part-label" x="${BX}" y="${BY - 8}">바닷물 1 kg에 녹은 염류 ${a.S} g</text>`;
        let cursor = BX;
        SALTS.forEach(s => {
            const w = (BW * s.pct) / 100;
            out += `<rect class="salt-seg" x="${cursor.toFixed(1)}" y="${BY}" width="${w.toFixed(1)}" height="15" fill="${s.c}"/>`;
            cursor += w;
        });
        SALTS.forEach((s, i) => {
            const y = BY + 32 + i * 14;
            out += `<rect x="${BX}" y="${y - 8}" width="9" height="9" rx="2" fill="${s.c}"/>`;
            out += `<text class="salt-text" style="fill:${s.c}" x="${BX + 14}" y="${y}">${s.n} ${s.pct}%</text>`;
            out += `<text class="salt-text" style="fill:#cfe6ee" x="448" y="${y}" text-anchor="end">${a.grams[i].toFixed(2)} g</text>`;
        });
        out += `<text class="note-text" x="${BX}" y="${BY + 32 + SALTS.length * 14 + 8}">염분이 달라져도 비율은 그대로입니다</text>`;

        out += `<text class="part-label" x="20" y="24">${a.place.label} · 수온 ${a.T} ℃ · 염분 ${a.S} psu</text>`;
        out += `<text class="read-text" x="20" y="208">밀도 ${a.rho.toFixed(2)} kg/m³ — ${VERDICT[a.verdict]}</text>`;
        mainGroup.innerHTML = out;
    }

    const VERDICT = { heavier: '평균보다 무거워 가라앉습니다', same: '평균과 비슷해 그대로 있습니다', lighter: '평균보다 가벼워 떠 있습니다' };
    const THERMO_NAME = { normal: '수온 약층', weak: '수온이 거의 일정', inverse: '깊을수록 조금 따뜻해짐' };
    const THERMO_WHY = {
        normal: `그 아래에서 수온이 심해층의 ${DEEP_T} ℃까지 빠르게 떨어지는 수온 약층이 나타납니다. `,
        weak: `표층 수온이 심해층과 비슷해 수온 약층이 뚜렷하게 나타나지 않습니다. `,
        inverse: `표층이 심해층보다 오히려 차가워, 깊어질수록 수온이 조금 올라갑니다. 극지방 바다에서 볼 수 있는 모습입니다. `,
    };
    const SHORT = { heavier: '크다', same: '비슷하다', lighter: '작다' };
    const SENTENCE = { heavier: '커서 아래로 가라앉습니다', same: '비슷해서 그 자리에 머무릅니다', lighter: '작아서 위에 떠 있습니다' };
    // 이/가 after a number depends on the last digit read aloud:
    // 영·일·삼·육·칠·팔 end in a consonant, 이·사·오·구 do not.
    const numIga = s => s + ('013678'.includes(s[s.length - 1]) ? '이' : '가');

    function renderGraph(a) {
        const gx = t => GRAPH.x0 + (t / 30) * (GRAPH.x1 - GRAPH.x0);
        const gy = m => GRAPH.y1 + (m / MAX_DEPTH) * (GRAPH.y0 - GRAPH.y1);
        let out = '';
        [0, 10, 20, 30].forEach(t => {
            out += `<line class="grid-line" x1="${gx(t).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(t).toFixed(1)}" y2="${GRAPH.y0}"/>`;
            out += `<text class="axis-text" x="${gx(t).toFixed(1)}" y="${GRAPH.y1 - 8}" text-anchor="middle">${t}</text>`;
        });
        [0, 250, 500, 750, 1000].forEach(m => {
            out += `<text class="axis-text" x="${GRAPH.x0 - 6}" y="${(gy(m) + 3).toFixed(1)}" text-anchor="end">${m}</text>`;
        });
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y1}" x2="${GRAPH.x1}" y2="${GRAPH.y1}"/>`;
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y1}" x2="${GRAPH.x0}" y2="${GRAPH.y0}"/>`;
        out += `<text class="axis-title" x="${((GRAPH.x0 + GRAPH.x1) / 2).toFixed(1)}" y="26" text-anchor="middle">수온 (℃)</text>`;
        out += `<text class="axis-title" x="22" y="26">깊이 (m)</text>`;

        const thermoEnd = Math.min(MAX_DEPTH, a.mixed + THERMO_M);
        [[a.mixed, '혼합층 아래'], [thermoEnd, '심해층 위']].forEach(([m, name]) => {
            out += `<line class="band-line" x1="${GRAPH.x0}" y1="${gy(m).toFixed(1)}" x2="${GRAPH.x1}" y2="${gy(m).toFixed(1)}"/>`;
            // a line near the top has no room above it, so its caption drops below
            const ly = gy(m) - 4 < GRAPH.y1 + 12 ? gy(m) + 13 : gy(m) - 4;
            out += `<text class="band-text" x="${GRAPH.x1 - 4}" y="${ly.toFixed(1)}" text-anchor="end">${name} ${Math.round(m)} m</text>`;
        });
        const pts = [];
        for (let m = 0; m <= MAX_DEPTH; m += 5) pts.push(`${gx(tempAt(m, a)).toFixed(1)},${gy(m).toFixed(1)}`);
        out += `<path class="trace" d="M${pts.join('L')}"/>`;
        out += `<circle class="trace-dot" cx="${gx(a.T).toFixed(1)}" cy="${gy(0).toFixed(1)}" r="5" fill="#ffd166"/>`;
        graphGroup.innerHTML = out;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        renderGraph(a);
        tempOutput.textContent = `${a.T} ℃`;
        saltOutput.textContent = `${a.S} psu`;
        windOutput.textContent = `${a.W} 단계`;
        stageBadge.textContent = `${a.place.label} · 밀도 ${a.rho.toFixed(2)}`;
        dataNote.innerHTML =
            `<div class="data-row"><span class="data-name">밀도</span><span class="data-val">${RHO0} × (1 − 0.00017×(${a.T}−10) + 0.00076×(${a.S}−35)) = ${a.rho.toFixed(2)} kg/m³</span></div>` +
            `<div class="data-row"><span class="data-name">평균과 비교</span><span class="data-val">평균 ${MEAN_RHO} kg/m³보다 ${(a.rho - MEAN_RHO).toFixed(2)}만큼 ${a.rho >= MEAN_RHO ? '큽니다' : '작습니다'}</span></div>` +
            `<div class="data-row"><span class="data-name">혼합층</span><span class="data-val">바람 ${a.W} 단계 → 20 + 8×${a.W} = ${a.mixed} m</span></div>` +
            `<div class="data-row"><span class="data-name">염화 나트륨</span><span class="data-val">${a.S} g × 77.7% = ${a.grams[0].toFixed(2)} g — 염분이 달라도 비율은 그대로</span></div>` +
            `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${VERDICT[a.verdict]}</span></div>`;
        return a;
    }

    function check() {
        const a = render();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        valueA.textContent = `${a.rho.toFixed(2)} kg/m³`;
        valueB.textContent = `${a.mixed} m`;
        predictionResult.textContent = !prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        const colder = analyse(Math.max(0, a.T - 10), a.S, a.W);
        const saltier = analyse(a.T, Math.min(38, a.S + 2), a.W);
        let s = `수온 ${a.T} ℃, 염분 ${a.S} psu인 바닷물의 밀도는 ${a.rho.toFixed(2)} kg/m³입니다. `;
        s += `평균 ${MEAN_RHO} kg/m³보다 ${SENTENCE[a.verdict]}. `;
        s += `수온만 ${Math.max(0, a.T - 10)} ℃로 낮추면 ${colder.rho.toFixed(2)}, 염분만 ${Math.min(38, a.S + 2)} psu로 높이면 ${numIga(saltier.rho.toFixed(2))} 됩니다. `;
        s += `차갑고 짤수록 무거워진다는 뜻입니다. `;
        s += `바람이 ${a.W} 단계이므로 물이 섞이는 혼합층은 ${a.mixed} m까지이고, `;
        s += THERMO_WHY[a.thermo];
        s += `녹아 있는 염류는 모두 ${a.S} g이지만, 그 가운데 염화 나트륨이 77.7%인 ${a.grams[0].toFixed(2)} g이라는 비율은 어느 바다에서나 같습니다.`;
        explanation.textContent = s;
    }

    function changed() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }

    [tempRange, saltRange, windRange].forEach(el => el.addEventListener('input', () => {
        render(); if (!resultContent.hidden) check();
    }));
    placeButtons.forEach(button => button.addEventListener('click', () => {
        place = button.dataset.place;
        const p = PLACES[place];
        tempRange.value = String(p.temp);
        saltRange.value = String(p.salt);
        windRange.value = String(p.wind);
        placeButtons.forEach(item => item.classList.toggle('selected', item === button));
        changed();
    }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkBtn.addEventListener('click', check);
    resetBtn.addEventListener('click', () => {
        prediction = null;
        predictionButtons.forEach(item => item.classList.remove('selected'));
        stageCaption.textContent = '바람이 셀수록 섞이는 층이 두꺼워집니다. 염류의 비율은 언제나 그대로입니다.';
        placeButtons.find(b => b.dataset.place === 'middle').click();
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

    window.__seaModel = {
        RHO0, T0, S0, ALPHA, BETA, MEAN_RHO, DEEP_T, THERMO_M, MAX_DEPTH, SALTS, PLACES,
        analyse, tempAt, render, check,
        setPlace(p) { placeButtons.find(b => b.dataset.place === p).click(); },
        setTemp(v) { tempRange.value = String(v); tempRange.dispatchEvent(new Event('input')); },
        setSalt(v) { saltRange.value = String(v); saltRange.dispatchEvent(new Event('input')); },
        setWind(v) { windRange.value = String(v); windRange.dispatchEvent(new Event('input')); },
        getPlace: () => place,
    };

    resetBtn.click();
});
