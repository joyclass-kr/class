document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = [...document.querySelectorAll('[data-mode]')];
    const controlArea = document.getElementById('controlArea');
    const predictionArea = document.getElementById('predictionArea');
    const predictionLegend = document.getElementById('predictionLegend');
    const methodHint = document.getElementById('methodHint');
    const checkBtn = document.getElementById('checkBtn');
    const resetBtn = document.getElementById('resetBtn');
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

    /* -------------------------------------------------------------- data */
    // Blood sugar (mg/dL, minutes): sugar arrives from the gut, insulin drives it into cells,
    // and the liver pulls the level back toward 90 either way (glucagon when low).
    const MEALS = { meal: { label: '밥 한 끼', hint: '포도당 75 g, 천천히', tau: 35, cond: '먹으면', condEx: '먹고 운동하면', ja: '먹자' }, drink: { label: '단 음료', hint: '포도당 75 g, 빨리', tau: 22, cond: '마시면', condEx: '마시고 운동하면', ja: '마시자' } };
    const BODIES = {
        normal: { label: '정상', hint: '인슐린 잘 나오고 잘 듦', who: '정상 몸이', SI: 0.02, beta: 0.3, ex: 0 },
        t1: { label: '인슐린이 안 나옴', hint: '1형 당뇨', who: '인슐린이 안 나오는 몸이', SI: 0.02, beta: 0, ex: 0 },
        t2: { label: '인슐린이 잘 안 듦', hint: '2형 당뇨', who: '인슐린이 잘 안 듣는 몸이', SI: 0.004, beta: 0.09, ex: 0 },
        exercise: { label: '정상 + 식후 운동', hint: '근육이 스스로 포도당 씀', who: '정상 몸이', SI: 0.02, beta: 0.3, ex: 0.5 },
    };
    const G_BASE = 90, G_VOL = 150, P1 = 0.02, TAU_I = 10, G_END = 180, G_DOSE = 75;

    // Body heat (℃, seconds): 80 W at rest, a 245 kJ/K body, skin that opens or closes, sweat and shivering.
    const WEATHERS = {
        cold: { label: '추운 날 −10 ℃', hint: '젖은 옷, 바람', act: '1시간 서 있으면', env: -10, h: 10, ex: 0 },
        mild: { label: '보통 22 ℃', hint: '실내', act: '1시간 쉬면', env: 22, h: 6, ex: 0 },
        hot: { label: '더운 날 35 ℃', hint: '뙤약볕에서 운동', act: '1시간 운동하면', env: 35, h: 12, ex: 300 },
    };
    const STATES = {
        normal: { label: '정상', hint: '땀·떨림·혈관 모두 됨', who: '정상 몸이', adj: '정상 몸은', sweat: true, shiver: true },
        nosweat: { label: '땀 못 냄', hint: '심한 탈수', who: '땀을 못 내는 몸이', adj: '땀을 못 내는 몸은', sweat: false, shiver: true },
        noshiver: { label: '떨림 못 함', hint: '술에 취함·마취', who: '떨지 못하는 몸이', adj: '떨지 못하는 몸은', sweat: true, shiver: false },
    };
    const HEAT_C = 245000, BASAL_W = 80, T_HOURS = 1;

    // Body water (litres, minutes): 40 L holding 285 mOsm/kg; ADH decides how much water the kidney keeps.
    const INTAKES = {
        water: { label: '맹물 1 L', hint: '한 번에 마심', water: 1.0, salt: 0 },
        salt: { label: '짠 음식', hint: '소금 5 g', water: 0, salt: 171 },
        none: { label: '아무것도', hint: '그대로 둠', water: 0, salt: 0 },
    };
    const W_BODY = 40, OSM0 = 285, W_END = 180;

    const state = { mode: 'glucose', meal: 'meal', body: 'normal', weather: 'hot', bstate: 'normal', intake: 'water', progress: 0, prediction: null };
    let running = false, frameId = 0, lastStamp = 0;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const fmtN = n => Math.round(n).toLocaleString('ko-KR');

    /* ------------------------------------------------------------ models */
    const gCache = {};
    function glucoseRun(mealKey, bodyKey) {
        const key = `${mealKey}|${bodyKey}`;
        if (gCache[key]) return gCache[key];
        const m = MEALS[mealKey], b = BODIES[bodyKey], dt = 0.5;
        const out = { t: [], G: [], I: [], Ra: [] };
        let G = G_BASE, I = 0;
        for (let t = 0; t <= G_END + 1e-9; t += dt) {
            const Ra = G_DOSE * 1000 * (t / (m.tau * m.tau)) * Math.exp(-t / m.tau) / G_VOL;
            if (Math.round(t * 2) % 2 === 0) { out.t.push(t); out.G.push(G); out.I.push(I); out.Ra.push(Ra); }
            I += dt * (b.beta * Math.max(0, G - G_BASE) - I / TAU_I);
            G += dt * (Ra - P1 * (G - G_BASE) - b.SI * I * G / 100 - b.ex * G / 100);
        }
        out.peak = Math.max(...out.G); out.tPeak = out.t[out.G.indexOf(out.peak)];
        out.g120 = out.G[out.t.indexOf(120)];
        gCache[key] = out;
        return out;
    }

    const hCache = {};
    function heatRun(weatherKey, stateKey) {
        const key = `${weatherKey}|${stateKey}`;
        if (hCache[key]) return hCache[key];
        const w = WEATHERS[weatherKey], s = STATES[stateKey], dt = 5;
        const out = { t: [], T: [], sweat: [], shiver: [], h: [], loss: [], make: [] };
        let T = 37;
        for (let t = 0; t <= T_HOURS * 3600 + 1e-9; t += dt) {
            const dil = 1 / (1 + Math.exp(-(T - 37) / 0.15));
            const h = w.h * (0.5 + dil);
            const sweat = s.sweat ? clamp((T - 37) * 500, 0, 600) : 0;
            const shiver = s.shiver ? clamp((36.8 - T) * 400, 0, 350) : 0;
            const make = BASAL_W + w.ex + shiver, loss = h * (T - w.env) + sweat;
            if (Math.round(t) % 60 === 0) { out.t.push(t / 60); out.T.push(T); out.sweat.push(sweat); out.shiver.push(shiver); out.h.push(dil); out.loss.push(loss); out.make.push(make); }
            T += dt * (make - loss) / HEAT_C;
        }
        out.end = out.T[out.T.length - 1];
        hCache[key] = out;
        return out;
    }

    const wCache = {};
    function waterRun(intakeKey) {
        if (wCache[intakeKey]) return wCache[intakeKey];
        const it = INTAKES[intakeKey], dt = 0.5;
        const out = { t: [], osm: [], adh: [], flow: [], uosm: [], bladder: [], drank: [] };
        let W = W_BODY, S = OSM0 * W_BODY, bladder = 0, drank = 0, gutW = it.water, gutS = it.salt;
        for (let t = 0; t <= W_END + 1e-9; t += dt) {
            const osm = S / W;
            const adh = clamp((osm - 282) / 6, 0, 1);                 // half on at 285, full at 288
            const uosm = 60 + 1140 * adh ** 1.5;                       // mOsm/kg
            const solute = 0.6 + 0.05 * Math.max(0, osm - OSM0);      // mOsm/min the kidney must throw out
            const flow = solute * 1000 / uosm;                         // mL/min that carry it
            if (Math.round(t * 2) % 2 === 0) { out.t.push(t); out.osm.push(osm); out.adh.push(adh); out.flow.push(flow); out.uosm.push(uosm); out.bladder.push(bladder); out.drank.push(drank); }
            // what was eaten or drunk is absorbed over 20~30 minutes
            const absorbW = Math.min(gutW, it.water / 20 * dt), absorbS = Math.min(gutS, it.salt / 30 * dt);
            gutW -= absorbW; gutS -= absorbS; W += absorbW; S += absorbS;
            // thirst: a cup of water every half hour while the blood stays too salty
            if (osm > 288 && Math.round(t * 2) % 60 === 0 && t > 0) { W += 0.25; drank += 0.25; }
            S += 0.6 * dt;                                             // metabolic waste keeps coming
            W -= (flow + 0.4) * dt / 1000;                             // urine plus breath and skin
            S -= uosm * flow * dt / 1000; bladder += flow * dt;
        }
        wCache[intakeKey] = out;
        return out;
    }

    function analyse() {
        if (state.mode === 'glucose') {
            const run = glucoseRun(state.meal, state.body), g120 = Math.round(run.g120);
            return { kind: 'glucose', run, g120, verdict: g120 < 140 ? 'normal' : g120 < 200 ? 'elevated' : 'high' };
        }
        if (state.mode === 'temp') {
            const run = heatRun(state.weather, state.bstate);
            return { kind: 'temp', run, verdict: run.end >= 38 ? 'rise' : run.end <= 35.5 ? 'drop' : 'hold' };
        }
        const run = waterRun(state.intake), i60 = run.t.indexOf(60), flow60 = run.flow[i60];
        return { kind: 'water', run, flow60, uosm60: run.uosm[i60], verdict: flow60 >= 4 ? 'much' : flow60 <= 0.8 ? 'little' : 'usual' };
    }
    const runSeconds = () => 7;

    /* ---------------------------------------------------------- controls */
    function pickRow(legend, name, options, current, cols) {
        return `<fieldset class="pick-field"><legend>${legend}</legend>` +
            `<div class="pick-buttons cols${cols}" data-pick="${name}">` +
            options.map(o => `<button type="button" data-value="${o.value}" class="${o.value === String(current) ? 'selected' : ''}">` +
                `${o.label}${o.hint ? `<small>${o.hint}</small>` : ''}</button>`).join('') +
            `</div></fieldset>`;
    }
    const opts = table => Object.entries(table).map(([k, v]) => ({ value: k, label: v.label, hint: v.hint }));

    function buildControls() {
        if (state.mode === 'glucose') controlArea.innerHTML = pickRow('먹은 것', 'meal', opts(MEALS), state.meal, 2) + pickRow('몸 상태', 'body', opts(BODIES), state.body, 2);
        else if (state.mode === 'temp') controlArea.innerHTML = pickRow('날씨', 'weather', opts(WEATHERS), state.weather, 3) + pickRow('몸 상태', 'bstate', opts(STATES), state.bstate, 3);
        else controlArea.innerHTML = pickRow('마신 것·먹은 것', 'intake', opts(INTAKES), state.intake, 3);
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_G = [{ value: 'normal', label: '140 아래로 돌아옴 (정상)' }, { value: 'elevated', label: '140~199에 머묾' }, { value: 'high', label: '200 넘게 높음' }];
    const PRED_T = [{ value: 'hold', label: '36~37.5 ℃ 유지' }, { value: 'rise', label: '38 ℃ 넘게 오름' }, { value: 'drop', label: '35.5 ℃ 아래로 내림' }];
    const PRED_W = [{ value: 'much', label: '오줌이 많고 옅음' }, { value: 'little', label: '오줌이 적고 진함' }, { value: 'usual', label: '평소와 비슷' }];

    function buildPrediction() {
        const list = state.mode === 'glucose' ? PRED_G : state.mode === 'temp' ? PRED_T : PRED_W;
        predictionLegend.textContent = state.mode === 'glucose' ? `${BODIES[state.body].who} ${MEALS[state.meal].label}를 ${BODIES[state.body].ex ? MEALS[state.meal].condEx : MEALS[state.meal].cond} 2시간 뒤 혈당(mg/dL)은?`
            : state.mode === 'temp' ? `${WEATHERS[state.weather].label}에 ${STATES[state.bstate].who} ${WEATHERS[state.weather].act} 체온은?`
                : `${INTAKES[state.intake].label}${state.intake === 'salt' ? '을 먹고' : state.intake === 'water' ? '를 마시고' : ' 먹지 않고'} 1시간 뒤 오줌은?`;
        predictionArea.className = 'prediction-buttons three';
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    const at = (arr, tArr, t) => { let i = 0; while (i < tArr.length - 1 && tArr[i + 1] <= t) i += 1; return arr[i]; };

    function renderGlucose(a) {
        const t = state.progress * G_END;
        const { run } = a, b = BODIES[state.body];
        const G = at(run.G, run.t, t), I = at(run.I, run.t, t), Ra = at(run.Ra, run.t, t);
        let out = '';
        // the vessel across the middle, sugar dots as many as the level
        out += `<rect class="vessel" x="20" y="92" width="300" height="34" rx="17"/>`;
        const nDots = Math.round(G / 6);
        for (let k = 0; k < nDots; k += 1) { const x = 30 + ((k * 37 + Math.floor(t) * 3) % 280), y = 100 + ((k * 13) % 18); out += `<circle class="sugar" cx="${x}" cy="${y}" r="2.6"/>`; }
        out += `<text class="small-label" x="26" y="86">혈관 — 포도당 ${Math.round(G)} mg/dL</text>`;
        // organs: gut above, pancreas/liver/muscle below
        out += `<rect class="organ" x="30" y="30" width="90" height="34" rx="6"/><text class="organ-text" x="75" y="44" text-anchor="middle">소장</text><text class="small-label" x="75" y="58" text-anchor="middle">${Ra > 0.2 ? `흡수 중 ${Ra.toFixed(1)}/분` : '흡수 끝'}</text>`;
        if (Ra > 0.2) out += `<line class="flow-arrow" style="stroke:#d97706" x1="75" y1="66" x2="75" y2="88"/><polygon fill="#d97706" points="75,92 71,85 79,85"/>`;
        out += `<rect class="organ" x="130" y="30" width="110" height="34" rx="6"/><text class="organ-text" x="185" y="44" text-anchor="middle">이자</text>`;
        out += `<text class="small-label" style="fill:#059669" x="140" y="58">인슐린 ${b.beta === 0 ? '없음' : I < 1 ? '조금' : I < 50 ? '나옴' : '많이'}</text><text class="small-label" style="fill:#dc2626" x="200" y="58">글루카곤 ${G < 88 ? '나옴' : '조금'}</text>`;
        out += `<rect class="organ" x="30" y="150" width="120" height="36" rx="6"/><text class="organ-text" x="90" y="165" text-anchor="middle">간</text><text class="small-label" x="90" y="179" text-anchor="middle">${G > 95 && I > 1 ? '포도당 → 글리코젠 저장' : G < 88 ? '글리코젠 → 포도당 꺼냄' : '들고 내기 균형'}</text>`;
        out += `<rect class="organ" x="170" y="150" width="130" height="36" rx="6"/><text class="organ-text" x="235" y="165" text-anchor="middle">근육·지방 세포</text><text class="small-label" x="235" y="179" text-anchor="middle">${b.ex ? '운동으로 포도당 씀' : b.SI * I > 0.3 ? '인슐린 신호로 포도당 들임' : b.beta === 0 ? '인슐린 없어 못 들임' : b.SI < 0.01 && I > 1 ? '인슐린이 잘 안 들림' : '평소대로'}</text>`;
        const upt = b.SI * I * G / 100 + b.ex * G / 100;
        if (upt > 0.3) out += `<line class="flow-arrow" style="stroke:#059669" x1="235" y1="128" x2="235" y2="146"/><polygon fill="#059669" points="235,150 231,143 239,143"/>`;
        if (G < 88) out += `<line class="flow-arrow" style="stroke:#dc2626" x1="90" y1="148" x2="90" y2="130"/><polygon fill="#dc2626" points="90,126 86,133 94,133"/>`;
        // the meter
        const MX = 340, MT = 40, MB = 180;
        const yOf = g => MB - clamp(g, 0, 350) / 350 * (MB - MT);
        out += `<rect class="organ" x="${MX}" y="${MT}" width="20" height="${MB - MT}" rx="3"/>`;
        out += `<rect class="band" x="${MX + 1}" y="${yOf(140).toFixed(1)}" width="18" height="${(yOf(70) - yOf(140)).toFixed(1)}"/>`;
        out += `<rect fill="#d97706" x="${MX + 4}" y="${yOf(G).toFixed(1)}" width="12" height="${(MB - yOf(G)).toFixed(1)}"/>`;
        [[70, '70'], [140, '140'], [200, '200'], [300, '300']].forEach(([g, lab]) => { out += `<line class="ref-line" x1="${MX - 3}" y1="${yOf(g).toFixed(1)}" x2="${MX + 23}" y2="${yOf(g).toFixed(1)}"/><text class="small-label" x="${MX + 27}" y="${(yOf(g) + 3).toFixed(1)}">${lab}</text>`; });
        out += `<text class="gen-text" x="${MX + 60}" y="60">${Math.round(G)}</text><text class="small-label" x="${MX + 60}" y="74">mg/dL</text>`;
        out += `<text class="trait-text" x="${MX + 60}" y="100">${Math.round(t)}분</text>`;
        out += `<text class="trait-text" style="fill:#059669" x="${MX + 60}" y="120">인슐린 ${Math.round(I)}</text>`;
        out += `<text class="small-label" x="${MX + 60}" y="134">(평소 = 0)</text>`;
        const VERD = { normal: '정상', elevated: '당뇨 전 단계 범위', high: '당뇨 범위' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${MEALS[state.meal].label} · ${b.label}: 최고 ${Math.round(run.peak)} → 2시간 뒤 ${a.g120} — ${VERD[a.verdict]}` : `${MEALS[state.meal].label} · ${b.label} (${b.hint})`}</text>`;
        out += `<text class="note-text" x="20" y="208">포도당 75 g 부하 검사 기준: 2시간 뒤 140 미만 정상 · 140~199 당뇨 전 단계 · 200 이상 당뇨</text>`;
        return out;
    }

    function graphGlucose(a) {
        const t = state.progress * G_END;
        const { run } = a;
        const X0 = 50, X1 = 430, Y0 = 150, Y1 = 40, GMAX = 350;
        const xOf = tt => X0 + tt / G_END * (X1 - X0), yOf = g => Y0 - clamp(g, 0, GMAX) / GMAX * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">혈당–시간 — 초록 띠가 정상 범위(70~140), 점선은 정상 몸이 밥을 먹었을 때</text>`;
        out += `<rect class="band" x="${X0}" y="${yOf(140).toFixed(1)}" width="${X1 - X0}" height="${(yOf(70) - yOf(140)).toFixed(1)}"/>`;
        [0, 100, 200, 300].forEach(g => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(g).toFixed(1)}" x2="${X1}" y2="${yOf(g).toFixed(1)}"/><text class="axis-text" x="${X0 - 6}" y="${(yOf(g) + 3.5).toFixed(1)}" text-anchor="end">${g}</text>`; });
        out += `<line class="ref-line" style="stroke:#ff7a59" x1="${X0}" y1="${yOf(200).toFixed(1)}" x2="${X1}" y2="${yOf(200).toFixed(1)}"/>`;
        for (let tt = 0; tt <= G_END; tt += 30) out += `<text class="axis-text" x="${xOf(tt).toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${tt}</text>`;
        out += `<line class="ref-line" x1="${xOf(120).toFixed(1)}" y1="${Y1}" x2="${xOf(120).toFixed(1)}" y2="${Y0}"/><text class="small-label" x="${(xOf(120) + 3).toFixed(1)}" y="${Y1 + 10}">2시간</text>`;
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        const ref = glucoseRun('meal', 'normal');
        out += `<path class="trace faint" style="stroke:#475569" d="${ref.t.map((tt, i) => `${i ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(ref.G[i]).toFixed(1)}`).join(' ')}"/>`;
        let d = ''; run.t.forEach((tt, i) => { if (tt <= t) d += `${d ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(run.G[i]).toFixed(1)} `; });
        out += `<path class="trace" style="stroke:#d97706" d="${d}"/>`;
        let dI = ''; run.t.forEach((tt, i) => { if (tt <= t) dI += `${dI ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(run.I[i] * 0.5).toFixed(1)} `; });
        out += `<path class="trace" style="stroke:#059669;stroke-width:1.4" d="${dI}"/>`;
        out += `<text class="small-label" style="fill:#059669" x="${X1}" y="${Y1 - 4}" text-anchor="end">초록 선: 인슐린 (상대값)</text>`;
        out += `<text class="axis-title" x="${((X0 + X1) / 2).toFixed(1)}" y="${Y0 + 30}" text-anchor="middle">먹은 뒤 시간 (분) — 혈당 (mg/dL)</text>`;
        return out;
    }

    function renderTemp(a) {
        const t = state.progress * T_HOURS * 60;
        const { run } = a, w = WEATHERS[state.weather], s = STATES[state.bstate];
        const T = at(run.T, run.t, t), sweat = at(run.sweat, run.t, t), shiver = at(run.shiver, run.t, t), dil = at(run.h, run.t, t), loss = at(run.loss, run.t, t), make = at(run.make, run.t, t);
        let out = `<rect class="env-box" x="16" y="24" width="220" height="176" rx="8"/>`;
        out += `<text class="trait-text" x="26" y="42">${w.label} · ${w.hint}</text>`;
        // the body: skin colour by blood flow, sweat drops, shiver marks
        const skin = `rgb(${Math.round(120 + 135 * dil)}, ${Math.round(140 - 40 * dil)}, ${Math.round(220 - 140 * dil)})`;
        out += `<circle class="body" cx="126" cy="76" r="16"/><rect class="body" x="100" y="94" width="52" height="66" rx="14"/><rect class="body" x="104" y="158" width="18" height="36" rx="6"/><rect class="body" x="130" y="158" width="18" height="36" rx="6"/>`;
        out += `<rect class="skin" style="stroke:${skin};opacity:.7" x="100" y="94" width="52" height="66" rx="14"/>`;
        for (let k = 0; k < Math.round(sweat / 60); k += 1) { const x = 98 + (k * 37) % 60, y = 100 + ((k * 23 + Math.floor(t * 4)) % 60); out += `<circle class="sweat" cx="${x}" cy="${y}" r="2.4"/>`; }
        if (shiver > 0) for (let k = 0; k < Math.round(shiver / 50); k += 1) { const x = 90 - k * 4, y0 = 100 + k * 8; out += `<polyline class="shiver" fill="none" points="${x},${y0} ${x - 4},${y0 + 4} ${x},${y0 + 8} ${x - 4},${y0 + 12}"/>`; }
        out += `<text class="small-label" x="126" y="207" text-anchor="middle">${dil > 0.6 ? '피부 혈관 넓어짐 — 붉음' : dil < 0.4 ? '피부 혈관 좁아짐 — 창백' : '피부 혈관 보통'}</text>`;
        out += `<text class="trait-text" x="164" y="110">${sweat > 0 ? `땀 ${Math.round(sweat)} W` : s.sweat ? '땀 없음' : '땀 못 냄'}</text>`;
        out += `<text class="trait-text" x="164" y="126">${shiver > 0 ? `떨림 +${Math.round(shiver)} W` : s.shiver ? '떨림 없음' : '떨림 못 함'}</text>`;
        out += `<text class="trait-text" x="164" y="142">${w.ex ? `운동 +${w.ex} W` : '쉬는 중 80 W'}</text>`;
        // thermometer and budget on the right
        const MX = 260, MT = 40, MB = 180;
        const yOf = tc => MB - (tc - 32) / 10 * (MB - MT);
        out += `<rect class="thermo" x="${MX}" y="${MT}" width="20" height="${MB - MT}" rx="3"/>`;
        out += `<rect class="band" x="${MX + 1}" y="${yOf(37.5).toFixed(1)}" width="18" height="${(yOf(36) - yOf(37.5)).toFixed(1)}"/>`;
        out += `<rect class="thermo-fill" x="${MX + 4}" y="${yOf(clamp(T, 32, 42)).toFixed(1)}" width="12" height="${(MB - yOf(clamp(T, 32, 42))).toFixed(1)}"/>`;
        [[42, '42'], [38, '38'], [37, '37'], [35.5, '35.5'], [32, '32']].forEach(([tc, lab]) => { out += `<line class="ref-line" x1="${MX - 3}" y1="${yOf(tc).toFixed(1)}" x2="${MX + 23}" y2="${yOf(tc).toFixed(1)}"/><text class="small-label" x="${MX + 27}" y="${(yOf(tc) + 3).toFixed(1)}">${lab}</text>`; });
        out += `<text class="gen-text" x="${MX + 60}" y="56">${T.toFixed(1)} ℃</text>`;
        out += `<text class="trait-text" x="${MX + 60}" y="76">${Math.round(t)}분</text>`;
        out += `<text class="trait-text" style="fill:#dc2626" x="${MX + 60}" y="100">만드는 열 ${Math.round(make)} W</text>`;
        out += `<text class="trait-text" style="fill:#0284c7" x="${MX + 60}" y="116">내보내는 열 ${Math.round(loss)} W</text>`;
        out += `<text class="trait-text" style="fill:#d97706" x="${MX + 60}" y="136">${make - loss > 20 ? `+${Math.round(make - loss)} W → 오름` : loss - make > 20 ? `−${Math.round(loss - make)} W → 내림` : '거의 균형'}</text>`;
        out += `<text class="small-label" x="${MX + 60}" y="156">200 W가 어긋나면</text><text class="small-label" x="${MX + 60}" y="168">1시간에 3 ℃쯤</text>`;
        const VERD = { hold: '유지', rise: '오름 — 열사병 위험', drop: '내림 — 저체온증' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${w.label} · ${s.label}: 1시간 뒤 ${run.end.toFixed(1)} ℃ → ${VERD[a.verdict]}` : `${w.label} · ${s.label}`}</text>`;
        return out;
    }

    function graphTemp(a) {
        const t = state.progress * T_HOURS * 60;
        const { run } = a;
        const X0 = 50, X1 = 430, Y0 = 150, Y1 = 40;
        const xOf = m => X0 + m / (T_HOURS * 60) * (X1 - X0), yOf = tc => Y0 - (clamp(tc, 32, 42) - 32) / 10 * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">체온–시간 — 초록 띠가 정상 범위, 점선은 정상 몸일 때</text>`;
        out += `<rect class="band" x="${X0}" y="${yOf(37.5).toFixed(1)}" width="${X1 - X0}" height="${(yOf(36) - yOf(37.5)).toFixed(1)}"/>`;
        [32, 34, 36, 38, 40, 42].forEach(tc => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(tc).toFixed(1)}" x2="${X1}" y2="${yOf(tc).toFixed(1)}"/><text class="axis-text" x="${X0 - 6}" y="${(yOf(tc) + 3.5).toFixed(1)}" text-anchor="end">${tc}</text>`; });
        for (let m = 0; m <= 60; m += 10) out += `<text class="axis-text" x="${xOf(m).toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${m}</text>`;
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        const ref = heatRun(state.weather, 'normal');
        out += `<path class="trace faint" style="stroke:#475569" d="${ref.t.map((m, i) => `${i ? 'L' : 'M'}${xOf(m).toFixed(1)},${yOf(ref.T[i]).toFixed(1)}`).join(' ')}"/>`;
        let d = ''; run.t.forEach((m, i) => { if (m <= t) d += `${d ? 'L' : 'M'}${xOf(m).toFixed(1)},${yOf(run.T[i]).toFixed(1)} `; });
        out += `<path class="trace" style="stroke:#ff7a59" d="${d}"/>`;
        out += `<text class="axis-title" x="${((X0 + X1) / 2).toFixed(1)}" y="${Y0 + 30}" text-anchor="middle">시간 (분) — 몸속 온도 (℃)</text>`;
        return out;
    }

    function renderWater(a) {
        const t = state.progress * W_END;
        const { run } = a, it = INTAKES[state.intake];
        const osm = at(run.osm, run.t, t), adh = at(run.adh, run.t, t), flow = at(run.flow, run.t, t), uosm = at(run.uosm, run.t, t), bladder = at(run.bladder, run.t, t), drank = at(run.drank, run.t, t);
        let out = '';
        out += `<rect class="blood-box" x="20" y="36" width="150" height="60" rx="8"/><text class="organ-text" x="95" y="54" text-anchor="middle">몸속 물 (혈액)</text>`;
        out += `<text class="trait-text" x="95" y="72" text-anchor="middle">진하기 ${osm.toFixed(1)} mOsm/kg</text><text class="small-label" x="95" y="88" text-anchor="middle">${osm > 288 ? '너무 진함 → 목마름' : osm < 282 ? '너무 옅음' : '알맞음 (285)'}</text>`;
        out += `<rect class="organ" x="20" y="110" width="150" height="40" rx="6"/><text class="organ-text" x="95" y="126" text-anchor="middle">뇌하수체 — 항이뇨 호르몬</text>`;
        out += `<rect class="hormone-bar" fill="rgba(178,155,255,.3)" x="40" y="134" width="110" height="8" rx="4"/><rect fill="#7c3aed" x="40" y="134" width="${(110 * adh).toFixed(1)}" height="8" rx="4"/>`;
        out += `<line class="flow-arrow" style="stroke:#7c3aed" x1="170" y1="130" x2="200" y2="130"/><polygon fill="#7c3aed" points="204,130 197,126 197,134"/>`;
        // kidney and bladder
        out += `<path class="kidney" d="M230,96 C205,100 205,150 230,156 C250,160 262,140 258,126 C255,110 250,92 230,96 Z"/><text class="organ-text" x="232" y="130" text-anchor="middle">콩팥</text>`;
        out += `<text class="small-label" x="232" y="172" text-anchor="middle">물 다시 빨아들임 ${Math.round(adh * 100)} %</text>`;
        const BX = 300, BY = 90, BW = 60, BH = 90, fill = clamp(bladder / 700, 0, 1);
        out += `<rect class="bladder" x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="14"/>`;
        out += `<rect class="urine" style="opacity:${(0.35 + 0.65 * adh).toFixed(2)}" x="${BX + 2}" y="${(BY + 2 + (BH - 4) * (1 - fill)).toFixed(1)}" width="${BW - 4}" height="${((BH - 4) * fill).toFixed(1)}" rx="12"/>`;
        out += `<text class="small-label" x="${BX + BW / 2}" y="${BY - 6}" text-anchor="middle">모인 오줌 ${fmtN(bladder)} mL</text>`;
        out += `<text class="trait-text" x="${BX + BW + 12}" y="104">1분에 ${flow.toFixed(1)} mL</text>`;
        out += `<text class="trait-text" x="${BX + BW + 12}" y="120">진하기 ${fmtN(uosm)}</text><text class="small-label" x="${BX + BW + 12}" y="132">mOsm/kg</text>`;
        out += `<text class="trait-text" x="${BX + BW + 12}" y="156">${Math.round(t)}분</text>`;
        if (drank > 0) out += `<text class="trait-text" style="fill:#0284c7" x="${BX + BW + 12}" y="172">목말라 ${fmtN(drank * 1000)} mL 마심</text>`;
        out += `<text class="small-label" x="230" y="60" text-anchor="middle">${it.label} ${state.intake === 'salt' ? '먹음' : state.intake === 'water' ? '마심' : ''}</text>`;
        const VERD = { much: '많고 옅음', little: '적고 진함', usual: '평소와 비슷' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${it.label}: 1시간 뒤 오줌 1분에 ${a.flow60.toFixed(1)} mL, ${fmtN(a.uosm60)} mOsm/kg → ${VERD[a.verdict]}` : `${it.label} (${it.hint})`}</text>`;
        out += `<text class="note-text" x="20" y="208">오줌은 1분에 0.5~10 mL, 진하기는 60~1,200 mOsm/kg 사이에서 바뀌어 몸속 물의 진하기를 지킵니다</text>`;
        return out;
    }

    function graphWater(a) {
        const t = state.progress * W_END;
        const { run } = a;
        const X0 = 50, X1 = 410, Y0 = 150, Y1 = 40;
        const xOf = tt => X0 + tt / W_END * (X1 - X0), yO = o => Y0 - (clamp(o, 276, 292) - 276) / 16 * (Y0 - Y1), yF = f => Y0 - clamp(f, 0, 12) / 12 * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">붉은 선: 몸속 물의 진하기 (왼쪽 눈금) · 노란 선: 오줌 양 (오른쪽 눈금)</text>`;
        [276, 280, 284, 288, 292].forEach(o => { out += `<line class="grid-line" x1="${X0}" y1="${yO(o).toFixed(1)}" x2="${X1}" y2="${yO(o).toFixed(1)}"/><text class="axis-text" x="${X0 - 6}" y="${(yO(o) + 3.5).toFixed(1)}" text-anchor="end">${o}</text>`; });
        [0, 4, 8, 12].forEach(f => { out += `<text class="axis-text" style="fill:#d97706" x="${X1 + 6}" y="${(yF(f) + (f ? 3.5 : -1)).toFixed(1)}">${f} mL</text>`; });
        for (let tt = 0; tt <= W_END; tt += 30) out += `<text class="axis-text" x="${xOf(tt).toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${tt}</text>`;
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        out += `<line class="ref-line" x1="${X0}" y1="${yO(285).toFixed(1)}" x2="${X1}" y2="${yO(285).toFixed(1)}"/>`;
        let dO = '', dF = '';
        run.t.forEach((tt, i) => { if (tt <= t) { dO += `${dO ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yO(run.osm[i]).toFixed(1)} `; dF += `${dF ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yF(run.flow[i]).toFixed(1)} `; } });
        out += `<path class="trace" style="stroke:#ff7a59" d="${dO}"/><path class="trace" style="stroke:#d97706" d="${dF}"/>`;
        out += `<text class="axis-title" x="${((X0 + X1) / 2).toFixed(1)}" y="${Y0 + 30}" text-anchor="middle">시간 (분) — 진하기 mOsm/kg · 오줌 mL/분</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'glucose') {
            const { run } = a, b = BODIES[state.body];
            return `<div class="data-row"><span class="data-name">먹은 것</span><span class="data-val">${MEALS[state.meal].label} — 포도당 75 g, ${MEALS[state.meal].tau}분쯤에 가장 빨리 흡수됨</span></div>` +
                `<div class="data-row"><span class="data-name">몸</span><span class="data-val">${b.label}: 인슐린 분비 ${b.beta === 0 ? '없음' : b.beta < 0.2 ? '적음' : '정상'} · 인슐린 효과 ${b.SI < 0.01 ? '약함(정상의 5분의 1)' : '정상'}${b.ex ? ' · 운동으로 근육이 인슐린 없이도 포도당 씀' : ''}</span></div>` +
                `<div class="data-row"><span class="data-name">혈당</span><span class="data-val">최고 ${Math.round(run.peak)} mg/dL (${run.tPeak}분) · 2시간 뒤 ${a.g120}</span></div>` +
                `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${a.verdict === 'normal' ? '140 미만 — 정상' : a.verdict === 'elevated' ? '140~199 — 당뇨 전 단계 범위' : '200 이상 — 당뇨 범위'} (포도당 부하 검사 기준)</span></div>`;
        }
        if (a.kind === 'temp') {
            const { run } = a, w = WEATHERS[state.weather], s = STATES[state.bstate], last = run.t.length - 1;
            return `<div class="data-row"><span class="data-name">날씨</span><span class="data-val">${w.label} (${w.hint}) · 몸이 내는 열 ${BASAL_W + w.ex} W</span></div>` +
                `<div class="data-row"><span class="data-name">몸</span><span class="data-val">${s.label} — 땀 ${s.sweat ? '최대 600 W' : '못 냄'} · 떨림 ${s.shiver ? '최대 350 W' : '못 함'} · 피부 혈관 조절</span></div>` +
                `<div class="data-row"><span class="data-name">1시간 뒤</span><span class="data-val">체온 ${run.end.toFixed(1)} ℃ · 만드는 열 ${Math.round(run.make[last])} W · 내보내는 열 ${Math.round(run.loss[last])} W</span></div>` +
                `<div class="data-row match"><span class="data-name">열용량</span><span class="data-val">70 kg 몸을 1 ℃ 바꾸는 데 245 kJ — 200 W가 어긋나면 1시간에 약 3 ℃</span></div>`;
        }
        const { run } = a, it = INTAKES[state.intake], last = run.t.length - 1;
        return `<div class="data-row"><span class="data-name">한 일</span><span class="data-val">${it.label}${it.water ? ` — 물 ${it.water} L (몸속 물 40 L의 2.5 %)` : it.salt ? ` — 소금 5 g = 녹은 알갱이 ${it.salt} mOsm` : ''}</span></div>` +
            `<div class="data-row"><span class="data-name">진하기</span><span class="data-val">${Math.min(...run.osm).toFixed(1)} ~ ${Math.max(...run.osm).toFixed(1)} mOsm/kg (평소 285)</span></div>` +
            `<div class="data-row"><span class="data-name">1시간 뒤 오줌</span><span class="data-val">1분에 ${a.flow60.toFixed(1)} mL · ${fmtN(a.uosm60)} mOsm/kg</span></div>` +
            `<div class="data-row match"><span class="data-name">3시간 동안</span><span class="data-val">오줌 ${fmtN(run.bladder[last])} mL${run.drank[last] ? ` · 목말라 마신 물 ${fmtN(run.drank[last] * 1000)} mL` : ''}</span></div>`;
    }

    function render() {
        const a = analyse();
        mainGroup.innerHTML = a.kind === 'glucose' ? renderGlucose(a) : a.kind === 'temp' ? renderTemp(a) : renderWater(a);
        graphGroup.innerHTML = a.kind === 'glucose' ? graphGlucose(a) : a.kind === 'temp' ? graphTemp(a) : graphWater(a);
        stageBadge.textContent = a.kind === 'glucose' ? `${MEALS[state.meal].label} · ${BODIES[state.body].label}` : a.kind === 'temp' ? `${WEATHERS[state.weather].label} · ${STATES[state.bstate].label}` : INTAKES[state.intake].label;
        methodHint.textContent = a.kind === 'glucose' ? '혈당이 오르면 인슐린, 내리면 글루카곤이 되돌립니다'
            : a.kind === 'temp' ? '만드는 열과 내보내는 열이 같아야 체온이 머뭅니다'
                : '몸속 물이 진해지면 항이뇨 호르몬이 물을 아끕니다';
        dataNote.innerHTML = noteFor(a);
        return a;
    }

    /* --------------------------------------------------------------- run */
    function tick(dt) {
        state.progress = Math.min(1, state.progress + dt / runSeconds());
        render();
        return state.progress >= 1;
    }

    function stopRun() { running = false; if (frameId) cancelAnimationFrame(frameId); frameId = 0; }

    function frame(stamp) {
        if (!running) return;
        const dt = Math.min(0.05, (stamp - lastStamp) / 1000 || 0);
        lastStamp = stamp;
        if (tick(dt)) { stopRun(); finish(); } else frameId = requestAnimationFrame(frame);
    }

    function startRun() {
        stopRun();
        state.progress = 0;
        running = true;
        lastStamp = performance.now();
        render();
        frameId = requestAnimationFrame(frame);
    }

    function finish() {
        const a = render();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        let s = '';
        if (a.kind === 'glucose') {
            const { run } = a, b = BODIES[state.body], m = MEALS[state.meal];
            labelA.textContent = '최고 혈당'; valueA.textContent = `${Math.round(run.peak)} mg/dL (${run.tPeak}분)`;
            labelB.textContent = '2시간 뒤'; valueB.textContent = `${a.g120} mg/dL`;
            s = `${m.label}(포도당 75 g)를 ${m.ja} 혈당이 ${run.tPeak}분에 ${Math.round(run.peak)} mg/dL까지 올랐고, 2시간 뒤 ${a.g120} mg/dL이 되었습니다. `;
            if (state.body === 'normal' || state.body === 'exercise') s += `혈당이 오르자 이자의 β세포가 인슐린을 내어 근육·지방 세포가 포도당을 들이고 간이 글리코젠으로 저장했습니다. 혈당이 내려오면 인슐린도 줄고, 90 아래로 내려가면 글루카곤이 나와 간이 포도당을 꺼내므로 90 근처에 머뭅니다. ${state.body === 'exercise' ? '운동하는 근육은 인슐린 없이도 포도당을 써서 봉우리가 더 낮았습니다. ' : ''}${m.tau < 30 ? '단 음료는 빨리 흡수되어 봉우리가 높고 급합니다. ' : ''}`;
            else if (state.body === 't1') s += `이자가 인슐린을 내지 못해 세포가 포도당을 들이지 못했습니다. 혈당은 간이 조금씩 거두는 만큼만 천천히 내려와 2시간 뒤에도 200을 넘었습니다(1형 당뇨). 인슐린 주사가 필요합니다. `;
            else s += `인슐린은 나왔지만 세포가 잘 반응하지 않아(인슐린 저항) 포도당이 천천히만 들어갔습니다. 봉우리가 높고 2시간 뒤에도 140~199 사이에 머물렀습니다(2형 당뇨 범위). 운동과 식사 조절이 인슐린이 잘 듣게 도와줍니다. `;
            s += `포도당 75 g을 마신 뒤 2시간 혈당으로 정상(140 미만)·당뇨 전 단계(140~199)·당뇨(200 이상)를 가르는 것이 포도당 부하 검사입니다.`;
        } else if (a.kind === 'temp') {
            const { run } = a, w = WEATHERS[state.weather], s2 = STATES[state.bstate], last = run.t.length - 1;
            labelA.textContent = '1시간 뒤 체온'; valueA.textContent = `${run.end.toFixed(1)} ℃`;
            labelB.textContent = '열 수지'; valueB.textContent = `${Math.round(run.make[last])} W 만들고 ${Math.round(run.loss[last])} W 내보냄`;
            s = `${w.label}(${w.hint})에서 ${s2.adj} ${Math.round(run.make[last])} W를 만들고 ${Math.round(run.loss[last])} W를 내보내 1시간 뒤 ${run.end.toFixed(1)} ℃가 되었습니다. `;
            if (a.verdict === 'hold') s += state.weather === 'cold' ? `추위에 피부 혈관이 좁아져 열을 아끼고, 체온이 36.8 ℃ 아래로 내려가자 떨림이 ${Math.round(run.shiver[last])} W를 더 내어 빼앗기는 열을 메웠습니다. ` : state.weather === 'hot' ? `공기가 35 ℃라 피부로 내보낼 수 있는 열은 거의 없지만, 땀 ${Math.round(run.sweat[last])} W가 증발하며 운동으로 낸 열을 거두어 체온이 ${run.end.toFixed(1)} ℃ 안팎에서 멈췄습니다. ` : `쉴 때 내는 80 W가 피부로 그대로 빠져나가 균형을 이룹니다. `;
            else if (a.verdict === 'rise') s += `땀을 낼 수 없으니 운동으로 낸 300 W 넘는 열이 갈 데가 없어 그대로 쌓였습니다. 245 kJ이 1 ℃이므로 한 시간에 4 ℃ 넘게 올라 열사병(40 ℃ 이상)에 이릅니다. 더운 날 물을 충분히 마셔야 하는 까닭입니다. `;
            else s += `떨림이 없으니 젖은 옷과 바람으로 빼앗기는 ${Math.round(run.loss[last])} W를 80 W로는 메울 수 없어 체온이 계속 내려갔고 저체온증(35 ℃ 아래) 범위에 들어섰습니다. 술을 마시면 혈관이 넓어지고 떨림이 둔해져 추운 날 더 위험합니다. `;
            s += `체온 조절은 몸이 만드는 열과 내보내는 열의 저울질이며, 땀·떨림·혈관이 그 저울을 맞추는 손입니다.`;
        } else {
            const { run } = a, it = INTAKES[state.intake], last = run.t.length - 1;
            labelA.textContent = '1시간 뒤 오줌'; valueA.textContent = `1분에 ${a.flow60.toFixed(1)} mL`;
            labelB.textContent = '진하기'; valueB.textContent = `${fmtN(a.uosm60)} mOsm/kg`;
            if (state.intake === 'water') s = `맹물 1 L를 마시자 몸속 물 40 L가 옅어져 진하기가 ${Math.min(...run.osm).toFixed(1)} mOsm/kg까지 내렸습니다. 뇌하수체가 항이뇨 호르몬을 거의 내지 않아 콩팥이 물을 붙잡지 않았고, 오줌이 1분에 ${Math.max(...run.flow).toFixed(0)} mL 가까이 옅게(${fmtN(Math.min(...run.uosm))} mOsm/kg) 나와 두 시간쯤 만에 남은 물을 다 내보냈습니다. `;
            else if (state.intake === 'salt') s = `소금 5 g이 흡수되어 몸속 물이 ${Math.max(...run.osm).toFixed(1)} mOsm/kg까지 진해졌습니다. 뇌하수체가 항이뇨 호르몬을 많이 내어 콩팥이 물을 다시 빨아들였고, 오줌은 1분에 ${Math.min(...run.flow).toFixed(1)} mL로 줄며 ${fmtN(Math.max(...run.uosm))} mOsm/kg까지 진해졌습니다. 갈증 중추가 켜져 물을 ${fmtN(run.drank[last] * 1000)} mL 마시게 했고, 물이 들어오며 진하기가 천천히 돌아왔습니다. `;
            else s = `아무것도 마시지 않았습니다. 진하기 285 mOsm/kg에서 항이뇨 호르몬이 알맞게 나와 오줌이 1분에 ${a.flow60.toFixed(1)} mL, ${fmtN(a.uosm60)} mOsm/kg로 평소대로 나왔습니다. 마시지 않는 동안 숨과 피부로도 물이 조금씩 빠져 진하기가 ${Math.max(...run.osm).toFixed(1)}까지 천천히 올랐고, 그만큼 오줌이 조금씩 줄고 진해졌습니다. `;
            s += `오줌의 양과 진하기를 스무 배 넘게 바꾸어 몸속 물의 진하기를 1~2 % 안에서 지키는 것이 콩팥과 항이뇨 호르몬의 되먹임입니다.`;
        }
        predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        explanation.textContent = s;
    }

    function settingsChanged() {
        stopRun();
        state.progress = 0;
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }

    modeButtons.forEach(button => button.addEventListener('click', () => {
        state.mode = button.dataset.mode;
        state.prediction = null;
        modeButtons.forEach(item => item.classList.toggle('selected', item === button));
        buildControls();
        buildPrediction();
        checkBtn.textContent = state.mode === 'glucose' ? '3시간 흘려 보기' : state.mode === 'temp' ? '1시간 흘려 보기' : '3시간 흘려 보기';
        stageCaption.textContent = state.mode === 'glucose' ? '혈관 속 노란 점이 포도당입니다. 이자가 인슐린과 글루카곤을 내어 간·근육이 포도당을 넣고 꺼냅니다.'
            : state.mode === 'temp' ? '피부색이 혈관의 넓이, 파란 점이 땀, 왼쪽 물결이 떨림입니다. 오른쪽에 만드는 열과 내보내는 열이 있습니다.'
                : '몸속 물의 진하기를 뇌하수체가 재어 항이뇨 호르몬을 내면, 콩팥이 물을 얼마나 되돌릴지 정합니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { meal: 'meal', body: 'normal', weather: 'hot', bstate: 'normal', intake: 'water', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'glucose').click();
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

    window.__homeoModel = {
        MEALS, BODIES, WEATHERS, STATES, INTAKES, state,
        analyse, render, glucoseRun, heatRun, waterRun,
        runSeconds,
        setMode(m) { modeButtons.find(b => b.dataset.mode === m).click(); },
        set(key, value) { state[key] = value; buildControls(); buildPrediction(); settingsChanged(); },
        setProgress(p) { stopRun(); state.progress = p; render(); },
        runToEnd(dt = 0.25, cap = 5000) {
            stopRun(); state.progress = 0;
            let steps = 0;
            while (!tick(dt) && steps < cap) steps += 1;
            finish();
            return { steps, progress: state.progress };
        },
        tick, finish,
    };

    resetBtn.click();
});
