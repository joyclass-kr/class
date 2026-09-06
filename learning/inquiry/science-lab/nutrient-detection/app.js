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
    const TUBES = [
        { key: 'starch', label: '녹말물', base: '#dfe6ec', nutrient: '녹말' },
        { key: 'sugar', label: '포도당물', base: '#c9dfe8', nutrient: '당분' },
        { key: 'protein', label: '단백질물', base: '#efe6c8', nutrient: '단백질' },
        { key: 'fat', label: '식용유', base: '#f2df7a', nutrient: '지방' },
    ];
    const REAGENTS = {
        iodine: { label: '아이오딘', hint: '아이오딘화 칼륨 용액', full: '아이오딘-아이오딘화 칼륨 용액', target: 'starch', color: '#8a5a1a', result: '#1e3a8a', resultName: '청람색', tint: 0.35, needsHeat: false },
        benedict: { label: '베네딕트', hint: '푸른 용액', full: '베네딕트 용액', target: 'sugar', color: '#2f6fe0', result: '#e4650f', resultName: '황적색', tint: 0.55, needsHeat: true },
        biuret: { label: '뷰렛', hint: 'NaOH + CuSO₄', full: '뷰렛 용액 (수산화 나트륨 + 황산 구리)', target: 'protein', color: '#8fc3f2', result: '#7c3aed', resultName: '보라색', tint: 0.35, needsHeat: false },
        sudan: { label: '수단 Ⅲ', hint: '붉은 용액', full: '수단 Ⅲ 용액', target: 'fat', color: '#dc2626', result: '#e11d48', resultName: '선홍색', tint: 0.12, needsHeat: false },
    };
    const HEATS = { no: { label: '안 함', hint: '실온 그대로' }, yes: { label: '함', hint: '끓는 물에 담금' } };
    const SAMPLES = { glucose: { label: '포도당물', hint: '당분', sugar: true, name: '포도당' }, maltose: { label: '엿당물', hint: '당분', sugar: true, name: '엿당' }, starch: { label: '녹말물', hint: '큰 덩어리', sugar: false, name: '녹말' }, water: { label: '맹물', hint: '대조군', sugar: false, name: '물' } };
    const CONCS = { thin: { label: '묽게', hint: '조금만 녹임' }, thick: { label: '진하게', hint: '많이 녹임' } };
    const CONDS = {
        warm: { label: '아밀레이스 + 37 ℃', hint: '체온', enzyme: true, temp: 37, rate: 0.30 },
        cold: { label: '아밀레이스 + 5 ℃', hint: '차갑게', enzyme: true, temp: 5, rate: 0.045 },
        none: { label: '아밀레이스 없이 37 ℃', hint: '대조군', enzyme: false, temp: 37, rate: 0 },
        boiled: { label: '끓인 아밀레이스 + 37 ℃', hint: '효소 망가짐', enzyme: true, temp: 37, rate: 0.002 },
    };
    const REACT_MIN = 10;

    const state = { mode: 'reagent', reagent: 'iodine', heat: 'yes', sample: 'glucose', bheat: 'no', conc: 'thick', cond: 'warm', progress: 0, prediction: null };
    let running = false, frameId = 0, lastStamp = 0;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const ease = p => p < 0.5 ? 2 * p * p : 1 - (1 - p) * (1 - p) * 2;
    const fmtN = (n, d = 0) => (+n.toFixed(d)).toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace('-', '−');
    const rnd = i => (((i * 7919 + 13) * 104729) % 100003) / 100003;
    const hex = c => c.startsWith('rgb') ? c.match(/\d+/g).slice(0, 3).map(Number) : [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    const mix = (a, b, t) => { const A = hex(a), B = hex(b), u = clamp(t, 0, 1); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; };
    const jong = s => { const c = s.charCodeAt(s.length - 1); return c >= 0xac00 && c <= 0xd7a3 ? (c - 0xac00) % 28 : 0; };
    const eun = s => jong(s) ? '은' : '는', iga = s => jong(s) ? '이' : '가', eul = s => jong(s) ? '을' : '를';

    /* ------------------------------------------------------------ models */
    function reagentModel() {
        const r = REAGENTS[state.reagent], heated = state.heat === 'yes', works = !r.needsHeat || heated;
        const results = TUBES.map(t => ({ tube: t, reacts: works && t.key === r.target }));
        return { kind: 'reagent', r, heated, works, results, verdict: works ? r.target : 'none' };
    }
    function benedictModel() {
        const s = SAMPLES[state.sample], heated = state.bheat === 'yes', thick = state.conc === 'thick';
        const level = !heated || !s.sugar ? 0 : thick ? 1 : 0.45; // 0 blue, 0.45 green–yellow, 1 orange
        return { kind: 'benedict', s, heated, thick, level, verdict: level === 0 ? 'none' : level < 0.7 ? 'some' : 'much' };
    }
    function amylaseModel() {
        const c = CONDS[state.cond], remainAt = t => Math.exp(-c.rate * t), remain = remainAt(REACT_MIN), maltose = 1 - remain;
        const iodine = remain >= 0.15, benedict = maltose >= 0.15;
        return { kind: 'amylase', c, remainAt, remain, maltose, iodine, benedict, verdict: !iodine && benedict ? 'digested' : iodine && benedict ? 'partial' : 'none' };
    }
    function analyse() {
        if (state.mode === 'reagent') return reagentModel();
        if (state.mode === 'benedict') return benedictModel();
        return amylaseModel();
    }
    const runSeconds = () => 6;

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
        if (state.mode === 'reagent') controlArea.innerHTML = pickRow('넣을 시약', 'reagent', opts(REAGENTS), state.reagent, 4) + (state.reagent === 'benedict' ? pickRow('가열 (끓는 물에 담그기)', 'heat', opts(HEATS), state.heat, 2) : '');
        else if (state.mode === 'benedict') controlArea.innerHTML = pickRow('시료', 'sample', opts(SAMPLES), state.sample, 4) + pickRow('가열', 'bheat', opts(HEATS), state.bheat, 2) + pickRow('농도', 'conc', opts(CONCS), state.conc, 2);
        else controlArea.innerHTML = pickRow('녹말물에 넣는 것 · 10분 반응', 'cond', opts(CONDS), state.cond, 2);
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                if (group.dataset.pick === 'reagent') buildControls();
                else group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_R = [{ value: 'starch', label: '1번 녹말물만 변함' }, { value: 'sugar', label: '2번 포도당물만 변함' }, { value: 'protein', label: '3번 단백질물만 변함' }, { value: 'fat', label: '4번 식용유만 변함' }, { value: 'none', label: '아무것도 안 변함' }];
    const PRED_B = [{ value: 'none', label: '푸른색 그대로' }, { value: 'some', label: '녹색~황색 (당 조금)' }, { value: 'much', label: '황적색 (당 많음)' }];
    const PRED_A = [{ value: 'digested', label: '아이오딘 반응 사라지고 베네딕트 황적색' }, { value: 'partial', label: '둘 다 조금씩 반응' }, { value: 'none', label: '아이오딘 청람색, 베네딕트 푸른색 그대로' }];

    function buildPrediction() {
        const list = state.mode === 'reagent' ? PRED_R : state.mode === 'benedict' ? PRED_B : PRED_A;
        predictionLegend.textContent = state.mode === 'reagent' ? `네 시험관에 ${REAGENTS[state.reagent].full}${eul(REAGENTS[state.reagent].full)} 넣${state.reagent === 'benedict' ? (state.heat === 'yes' ? '고 가열하' : '고 가열하지 않으') : '으'}면?`
            : state.mode === 'benedict' ? `${CONCS[state.conc].label} 탄 ${SAMPLES[state.sample].label}에 베네딕트 용액을 넣고 ${state.bheat === 'yes' ? '가열하면' : '가열하지 않으면'}?`
                : `녹말물에 ${CONDS[state.cond].label}로 10분 두고 아이오딘·베네딕트 검사를 하면?`;
        predictionArea.className = `prediction-buttons ${list.length === 5 ? 'five' : 'three'}`;
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    const tubeShape = (x, top, w, bottom) => `<path class="tube" d="M${x},${top} L${x},${bottom - w / 2} A${w / 2},${w / 2} 0 0 0 ${x + w},${bottom - w / 2} L${x + w},${top}"/><line class="tube-rim" x1="${x - 3}" y1="${top}" x2="${x + w + 3}" y2="${top}"/>`;
    const liquidShape = (x, top, w, bottom, color, op = 0.9) => `<path class="liquid" fill="${color}" fill-opacity="${op}" d="M${x + 1},${top} L${x + 1},${bottom - w / 2} A${w / 2 - 1},${w / 2 - 1} 0 0 0 ${x + w - 1},${bottom - w / 2} L${x + w - 1},${top} Z"/>`;
    const bath = (x0, x1, y0, y1, p) => { let out = `<rect class="bath" x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="4"/>`; for (let i = 0; i < 4; i += 1) out += `<path class="flame" d="M${x0 + 20 + i * (x1 - x0 - 40) / 3 - 6},${y1 + 18} Q${x0 + 20 + i * (x1 - x0 - 40) / 3},${y1 - 4 + 3 * Math.sin(p * 40 + i)} ${x0 + 20 + i * (x1 - x0 - 40) / 3 + 6},${y1 + 18} Z"/>`; for (let i = 0; i < 8; i += 1) { const bx = x0 + 8 + rnd(i) * (x1 - x0 - 16), by = y1 - 4 - ((rnd(i + 30) * 60 + p * 90) % (y1 - y0 - 8)); out += `<circle class="bubble" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(1.5 + rnd(i + 60) * 1.5).toFixed(1)}"/>`; } return out; };
    const dropper = (x, y, color, dropY) => `<rect class="dropper" x="${x - 4}" y="${y - 22}" width="8" height="20" rx="2"/><circle class="bulb" cx="${x}" cy="${y - 24}" r="5"/>${dropY !== null ? `<ellipse class="drop" fill="${color}" cx="${x}" cy="${dropY.toFixed(1)}" rx="2.6" ry="3.6"/>` : ''}`;

    function renderReagent(a) {
        const p = state.progress, { r } = a, TW = 32, TOP = 46, BOT = 166, xs = [36, 106, 176, 246];
        let out = '';
        // stage 1 (0–0.6): the dropper visits the four tubes; stage 2 (0.6–1): colours develop (with the hot bath if heated)
        const dropPhase = clamp(p / 0.6, 0, 1), which = Math.min(3, Math.floor(dropPhase * 4)), develop = ease(clamp((p - 0.6) / 0.4, 0, 1));
        if (p > 0 && a.heated && r.needsHeat) out += bath(22, 292, 100, 178, p);
        TUBES.forEach((t, i) => {
            const x = xs[i], got = p > 0 && (dropPhase * 4 > i + 0.5 || p >= 0.6);
            let color = t.base;
            if (got) { const res = a.results[i]; color = res.reacts ? mix(mix(t.base, r.color, r.tint), r.result, develop) : mix(t.base, r.color, state.reagent === 'sudan' ? 0.05 : r.tint); }
            out += liquidShape(x, TOP + 30, TW, BOT, color, t.key === 'fat' ? 0.95 : 0.85);
            if (got && state.reagent === 'sudan' && t.key !== 'fat') for (let k = 0; k < 5; k += 1) out += `<circle class="speck" cx="${(x + 6 + rnd(i * 10 + k) * (TW - 12)).toFixed(1)}" cy="${(BOT - 8 - rnd(i * 10 + k + 5) * 12).toFixed(1)}" r="1.4"/>`;
            out += tubeShape(x, TOP, TW, BOT);
            out += `<text class="tube-label" x="${x + TW / 2}" y="${BOT + 18}" text-anchor="middle">${i + 1} ${t.label}</text>`;
        });
        if (p > 0 && p < 0.6) { const dx = xs[which] + TW / 2, dp = (dropPhase * 4) % 1; out += dropper(dx, 40, r.color, dp < 0.7 ? TOP + 4 + dp / 0.7 * 26 : null); }
        else if (p === 0) out += dropper(xs[0] + TW / 2, 40, r.color, null);
        const RX = 300, SHORT = { iodine: '아이오딘 용액', benedict: '베네딕트 용액', biuret: '뷰렛 용액', sudan: '수단 Ⅲ 용액' };
        out += `<text class="trait-text" x="${RX}" y="52">${SHORT[state.reagent]}</text>`;
        out += `<text class="small-label" x="${RX}" y="72">찾는 것: ${TUBES.find(t => t.key === r.target).nutrient}</text><text class="small-label" x="${RX}" y="90">→ ${r.resultName}</text>`;
        out += `<text class="small-label" x="${RX}" y="110">${r.needsHeat ? (a.heated ? '가열: 끓는 물에 담금' : '가열: 안 함') : '가열 필요 없음'}</text>`;
        a.results.forEach((res, i) => { const shown = p >= 0.6 && develop > 0.3; out += `<text class="small-label" style="fill:${shown && res.reacts ? '#d97706' : '#475569'}" x="${RX}" y="${134 + i * 17}">${i + 1} ${res.tube.label}: ${shown ? (res.reacts ? r.resultName : '변화 없음') : '…'}</text>`; });
        const VERD = { starch: '1번 녹말물만 청람색', sugar: '2번 포도당물만 황적색', protein: '3번 단백질물만 보라색', fat: '4번 식용유만 선홍색', none: '아무것도 안 변함' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${p >= 1 ? `${r.label}${r.needsHeat ? (a.heated ? ' (가열)' : ' (가열 안 함)') : ''}: ${VERD[a.verdict]}` : `${SHORT[state.reagent]}을 네 시험관에 넣는 중`}</text>`;
        out += `<text class="note-text" x="20" y="208">${state.reagent === 'sudan' ? '수단 Ⅲ은 물에 안 녹아 알갱이가 가라앉음 (색은 대략)' : state.reagent === 'benedict' ? '베네딕트는 끓는 물에 2~3분 담가야 반응 (색은 대략)' : '시약은 몇 방울씩 · 나머지는 시약 색만 옅게 섞임 (대략)'}</text>`;
        return out;
    }

    function graphReagent(a) {
        const X0 = 150, cw = 72, rh = 26, Y0 = 52;
        let out = `<text class="axis-title" x="20" y="18">영양소 검출 표 — 시약마다 찾는 것이 다릅니다</text>`;
        TUBES.forEach((t, j) => { out += `<text class="grid-text" x="${X0 + cw * j + cw / 2}" y="${Y0 - 8}" text-anchor="middle">${t.nutrient}</text>`; });
        Object.entries(REAGENTS).forEach(([k, r], i) => {
            const y = Y0 + i * rh, on = k === state.reagent;
            if (on) out += `<rect class="row-on" x="20" y="${y}" width="420" height="${rh}" rx="3"/>`;
            out += `<text class="grid-text" style="${on ? 'fill:#d97706' : ''}" x="${X0 - 8}" y="${y + 18}" text-anchor="end">${r.label}${r.needsHeat ? ' (가열)' : ''}</text>`;
            TUBES.forEach((t, j) => {
                const x = X0 + cw * j + 3, hit = t.key === r.target;
                out += `<rect class="cell${hit ? '' : ' dim'}" ${hit ? `fill="${r.result}"` : ''} x="${x}" y="${y + 3}" width="${cw - 6}" height="${rh - 6}" rx="3"/>`;
                out += `<text class="cell-text" style="fill:${hit ? '#fff' : '#64748b'}" x="${x + (cw - 6) / 2}" y="${y + 18}" text-anchor="middle">${hit ? r.resultName : '—'}</text>`;
            });
        });
        out += `<text class="small-label" x="20" y="${Y0 + 4 * rh + 18}">— 는 변화 없음 · 베네딕트는 가열해야 하고 녹말에는 반응 안 함</text>`;
        out += `<text class="small-label" x="20" y="${Y0 + 4 * rh + 34}">뷰렛 = 수산화 나트륨 + 황산 구리 · 수단 Ⅲ은 지방에 녹아 색을 냄</text>`;
        return out;
    }

    function renderBenedict(a) {
        const p = state.progress, { s } = a, TX = 90, TW = 40, TOP = 44, BOT = 166, drop = clamp(p / 0.3, 0, 1), develop = ease(clamp((p - 0.35) / 0.65, 0, 1));
        let out = '';
        if (p > 0.3 && a.heated) out += bath(54, 166, 96, 178, p);
        const base = s.sugar ? '#c9dfe8' : state.sample === 'starch' ? '#dfe6ec' : '#c9dfe8';
        const blue = mix(base, '#2f6fe0', 0.6 * drop);
        const target = a.level >= 0.7 ? '#e4650f' : a.level > 0 ? '#b9b31f' : blue;
        const color = a.level > 0 ? mix(blue, target, develop) : blue;
        out += liquidShape(TX, TOP + 34, TW, BOT, color, 0.9) + tubeShape(TX, TOP, TW, BOT);
        if (a.level >= 0.7 && develop > 0.6) for (let k = 0; k < 10; k += 1) out += `<circle fill="#c2410c" cx="${(TX + 6 + rnd(k) * (TW - 12)).toFixed(1)}" cy="${(BOT - 10 - rnd(k + 20) * 18).toFixed(1)}" r="1.6"/>`;
        out += `<text class="tube-label" x="${TX + TW / 2}" y="${BOT + 18}" text-anchor="middle">${CONCS[state.conc].label} 탄 ${s.label}</text>`;
        if (p < 0.3) out += dropper(TX + TW / 2, 38, '#2f6fe0', p > 0 && (p / 0.3) % 0.5 < 0.35 ? TOP + 4 + ((p / 0.3) % 0.5) / 0.35 * 30 : null);
        const RX = 196;
        out += `<text class="trait-text" x="${RX}" y="52">시료: ${s.label} (${s.sugar ? '당분 있음' : state.sample === 'starch' ? '당분 아님' : '아무것도 없음'})</text>`;
        out += `<text class="trait-text" x="${RX}" y="72">농도: ${CONCS[state.conc].label} · 가열: ${a.heated ? '함' : '안 함'}</text>`;
        out += `<text class="gen-text" style="fill:#d97706" x="${RX}" y="98">${p >= 0.9 ? (a.level === 0 ? '푸른색 그대로' : a.level < 0.7 ? '녹색~황색 (당 조금)' : '황적색 앙금 (당 많음)') : p > 0.3 ? (a.heated ? '데우는 중…' : '실온에 둔 채…') : '베네딕트 용액 넣는 중'}</text>`;
        out += `<text class="small-label" x="${RX}" y="122">${!a.heated ? '가열 안 하면 반응 안 함' : !s.sugar ? (state.sample === 'starch' ? '녹말은 큰 덩어리라 반응 안 함' : '당분이 없어 반응 없음') : '당분이 구리 이온을 환원함'}</text>`;
        out += `<text class="small-label" x="${RX}" y="142">${a.heated && s.sugar ? `당이 ${a.thick ? '많아 황적색까지' : '적어 녹색~황색에서 멈춤'}` : '청색→녹색→황색→황적색→적갈색'}</text>`;
        out += `<text class="small-label" x="${RX}" y="166">당분 + 구리 이온 → 붉은 앙금</text>`;
        out += `<text class="small-label" x="${RX}" y="186">끓는 물에 2~3분 담가야 반응</text>`;
        const VERD = { none: '푸른색 그대로', some: '녹색~황색', much: '황적색' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${p >= 1 ? `${s.label} ${CONCS[state.conc].label} · 가열 ${HEATS[state.bheat].label}: ${VERD[a.verdict]}` : `${s.label}에 베네딕트 · 가열 ${HEATS[state.bheat].label}`}</text>`;
        out += `<text class="note-text" x="20" y="208">황산 구리가 든 푸른 용액 · 당이 많을수록 짙은 색 (대략)</text>`;
        return out;
    }

    function graphBenedict(a) {
        const X0 = 60, X1 = 420, Y = 70, H = 30, stops = [['#2f6fe0', '청색', '당 없음'], ['#3a9d5d', '녹색', '아주 조금'], ['#c9b820', '황색', '조금'], ['#e4650f', '황적색', '많음'], ['#9a3412', '적갈색', '아주 많음']];
        let out = `<text class="axis-title" x="20" y="18">베네딕트 반응의 색 — 당이 많을수록 오른쪽 (가열했을 때)</text>`;
        const w = (X1 - X0) / stops.length;
        stops.forEach(([col, name, amt], i) => { out += `<rect class="scale-seg" fill="${col}" x="${(X0 + i * w).toFixed(1)}" y="${Y}" width="${w.toFixed(1)}" height="${H}"/><text class="cell-text" style="fill:#fff" x="${(X0 + i * w + w / 2).toFixed(1)}" y="${Y + 19}" text-anchor="middle">${name}</text><text class="axis-text" x="${(X0 + i * w + w / 2).toFixed(1)}" y="${Y + H + 16}" text-anchor="middle">${amt}</text>`; });
        const pos = a.level === 0 ? 0.5 : a.level < 0.7 ? 1.9 : 3.3, mx = X0 + (state.progress >= 0.9 ? pos : 0.5) * w;
        out += `<line class="marker" x1="${mx.toFixed(1)}" y1="${Y - 10}" x2="${mx.toFixed(1)}" y2="${Y + H + 4}"/><text class="small-label" style="fill:#d97706" x="${mx.toFixed(1)}" y="${Y - 14}" text-anchor="middle">${state.progress >= 0.9 ? '지금' : '시작'}</text>`;
        out += `<text class="small-label" x="20" y="${Y + H + 44}">${a.heated ? '가열함' : '가열 안 함 → 당분이 있어도 청색'} · ${a.s.sugar ? `${a.s.name}${eun(a.s.name)} 당분` : `${a.s.name}${eun(a.s.name)} 당분이 아님`}</text>`;
        out += `<text class="small-label" x="20" y="${Y + H + 62}">묽으면 녹색·황색에서 멈추고, 진하면 황적색·적갈색까지</text>`;
        return out;
    }

    function renderAmylase(a) {
        const p = state.progress, { c } = a, ph1 = clamp(p / 0.5, 0, 1), ph2 = clamp((p - 0.5) / 0.25, 0, 1), ph3 = clamp((p - 0.75) / 0.25, 0, 1);
        const tNow = REACT_MIN * ph1, remain = a.remainAt(tNow), maltose = 1 - remain;
        let out = '';
        // reaction beaker
        const BX = 26, BY = 62, BW = 80, BH = 100;
        out += `<rect class="beaker" x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="3"/>`;
        out += `<rect fill="${mix('#dfe6ec', '#c9dfe8', maltose)}" fill-opacity=".85" x="${BX + 1}" y="${BY + 26}" width="${BW - 2}" height="${BH - 27}"/>`;
        for (let i = 0; i < 24; i += 1) { const alive = rnd(i) > maltose; out += `<circle fill="${alive ? '#94a3b8' : '#d97706'}" cx="${(BX + 8 + rnd(i + 40) * (BW - 16)).toFixed(1)}" cy="${(BY + 32 + rnd(i + 80) * (BH - 40)).toFixed(1)}" r="${alive ? 2.4 : 1.6}"/>`; }
        out += `<rect class="thermo" x="${BX + BW - 14}" y="${BY - 20}" width="6" height="60" rx="3"/><rect class="thermo-fill" x="${BX + BW - 12}" y="${(BY + 40 - 56 * clamp(c.temp / 45, 0, 1)).toFixed(1)}" width="2" height="${(56 * clamp(c.temp / 45, 0, 1)).toFixed(1)}"/>`;
        out += `<text class="small-label" x="${BX + BW / 2 - 6}" y="${BY - 8}" text-anchor="middle">${fmtN(tNow, 1)}분 반응</text>`;
        out += `<rect class="bar-starch" x="${BX}" y="${BY + BH + 10}" width="${(BW * remain).toFixed(1)}" height="7"/><rect class="bar-maltose" x="${(BX + BW * remain).toFixed(1)}" y="${BY + BH + 10}" width="${(BW * maltose).toFixed(1)}" height="7"/>`;
        // two test tubes fed from the beaker
        const TW = 32, TOP = 62, BOT = 160, XA = 150, XB = 262;
        const iodColor = a.iodine ? mix(mix('#dfe6ec', '#8a5a1a', 0.3), '#1e3a8a', ease(ph2) * clamp(a.remain / 0.6, 0.35, 1)) : mix('#dfe6ec', '#8a5a1a', 0.3 * ease(ph2));
        const benColor = a.benedict ? mix(mix('#c9dfe8', '#2f6fe0', 0.6), a.maltose < 0.7 ? '#b9b31f' : '#e4650f', ease(ph3)) : mix('#c9dfe8', '#2f6fe0', 0.6);
        if (ph3 > 0) out += bath(XB - 14, XB + TW + 14, 104, 174, p);
        out += liquidShape(XA, TOP + 28, TW, BOT, ph2 > 0 ? iodColor : '#dfe6ec', 0.85) + tubeShape(XA, TOP, TW, BOT);
        out += liquidShape(XB, TOP + 28, TW, BOT, ph2 > 0 ? benColor : '#dfe6ec', 0.85) + tubeShape(XB, TOP, TW, BOT);
        if (ph2 > 0 && ph2 < 1) out += dropper(XA + TW / 2, 56, '#8a5a1a', ph2 < 0.7 ? TOP + 4 + ph2 / 0.7 * 22 : null);
        if (ph3 > 0 && ph3 < 0.5) out += dropper(XB + TW / 2, 56, '#2f6fe0', ph3 < 0.35 ? TOP + 4 + ph3 / 0.35 * 22 : null);
        out += `<text class="tube-label" x="${XA + TW / 2}" y="${BOT + 18}" text-anchor="middle">아이오딘 검사</text><text class="tube-label" x="${XB + TW / 2 + 12}" y="${BOT + 18}" text-anchor="middle">베네딕트 검사 (가열)</text>`;
        out += `<text class="small-label" x="118" y="${TOP - 10}">${ph2 >= 1 ? (a.iodine ? '청람색 (녹말 있음)' : '반응 없음 (녹말 없음)') : '녹말이 남았나?'}</text>`;
        out += `<text class="small-label" x="440" y="${TOP - 10}" text-anchor="end">${ph3 >= 1 ? (a.benedict ? (a.maltose < 0.7 ? '황색 (엿당 조금)' : '황적색 (엿당 있음)') : '푸른색 (엿당 없음)') : '엿당이 생겼나?'}</text>`;
        const RX = 316;
        out += `<text class="trait-text" x="${RX}" y="80">녹말 ${fmtN(remain * 100)} %</text><text class="trait-text" x="${RX}" y="98">엿당 ${fmtN(maltose * 100)} %</text>`;
        out += `<text class="small-label" x="${RX}" y="122">${c.enzyme ? (c.rate > 0.1 ? '체온이라 활발' : c.rate > 0.01 ? '차가워 느림' : '끓여서 망가짐') : '효소 없음'}</text>`;
        out += `<text class="small-label" x="${RX}" y="142">녹말은 베네딕트에</text><text class="small-label" x="${RX}" y="158">반응 안 함</text>`;
        const VERD = { digested: '녹말 → 엿당으로 소화됨', partial: '일부만 소화됨', none: '소화되지 않음' };
        const SHORT = { warm: '37 ℃ 아밀레이스', cold: '5 ℃ 아밀레이스', none: '아밀레이스 없음', boiled: '끓인 아밀레이스' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${p >= 1 ? `${SHORT[state.cond]}: ${VERD[a.verdict]}` : p < 0.5 ? `${SHORT[state.cond]}로 소화하는 중 (${fmtN(tNow, 1)}분)` : p < 0.75 ? '아이오딘 검사 중' : '베네딕트 검사 (가열) 중'}</text>`;
        out += `<text class="note-text" x="20" y="208">회색 점 녹말 · 노란 점 엿당 · 10분 뒤 반씩 나눠 검사 (빠르기는 대략)</text>`;
        return out;
    }

    function graphAmylase(a) {
        const X0 = 66, X1 = 420, Y0 = 150, Y1 = 40, xOf = t => X0 + t / REACT_MIN * (X1 - X0), yOf = f => Y0 - f * (Y0 - Y1);
        let out = `<text class="axis-title" x="20" y="18">시간에 따른 녹말과 엿당의 양 — ${a.c.label}</text>`;
        [0, 2, 4, 6, 8, 10].forEach(t => { out += `<line class="grid-line" x1="${xOf(t).toFixed(1)}" y1="${Y1}" x2="${xOf(t).toFixed(1)}" y2="${Y0}"/><text class="axis-text" x="${xOf(t).toFixed(1)}" y="${Y0 + 16}" text-anchor="${t === 0 ? 'start' : t === 10 ? 'end' : 'middle'}">${t}분</text>`; });
        [0, 0.5, 1].forEach(f => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(f).toFixed(1)}" x2="${X1}" y2="${yOf(f).toFixed(1)}"/><text class="axis-text" x="${X0 - 5}" y="${(yOf(f) + 4).toFixed(1)}" text-anchor="end">${f * 100} %</text>`; });
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        let dS = '', dM = '';
        for (let t = 0; t <= REACT_MIN + 1e-9; t += 0.2) { const r = a.remainAt(t); dS += `${dS ? 'L' : 'M'}${xOf(t).toFixed(1)},${yOf(r).toFixed(1)} `; dM += `${dM ? 'L' : 'M'}${xOf(t).toFixed(1)},${yOf(1 - r).toFixed(1)} `; }
        out += `<path class="trace" style="stroke:#64748b" d="${dS}"/><path class="trace" style="stroke:#d97706" d="${dM}"/>`;
        out += `<text class="small-label" style="fill:#475569" x="${X1 - 4}" y="${(yOf(a.remain) - 6).toFixed(1)}" text-anchor="end">녹말 ${fmtN(a.remain * 100)} %</text><text class="small-label" style="fill:#d97706" x="${X1 - 4}" y="${(yOf(a.maltose) - 6).toFixed(1)}" text-anchor="end">엿당 ${fmtN(a.maltose * 100)} %</text>`;
        out += `<line class="thresh" x1="${X0}" y1="${yOf(0.15).toFixed(1)}" x2="${X1}" y2="${yOf(0.15).toFixed(1)}"/><text class="small-label" x="${X0 + 6}" y="${(yOf(0.15) - 5).toFixed(1)}">15 % 넘으면 검사에 나타남</text>`;
        const tNow = REACT_MIN * clamp(state.progress / 0.5, 0, 1);
        out += `<line class="marker" x1="${xOf(tNow).toFixed(1)}" y1="${Y1}" x2="${xOf(tNow).toFixed(1)}" y2="${Y0}"/>`;
        out += `<text class="axis-title" x="${(X0 + X1) / 2}" y="${Y0 + 36}" text-anchor="middle">반응 시간 — 효소가 녹말을 엿당으로 잘라 갑니다</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'reagent') {
            return `<div class="data-row"><span class="data-name">시약</span><span class="data-val">${a.r.full} — ${TUBES.find(t => t.key === a.r.target).nutrient}을 찾음${a.r.needsHeat ? ` (가열 ${a.heated ? '함' : '안 함'})` : ''}</span></div>` +
                `<div class="data-row"><span class="data-name">시험관</span><span class="data-val">${a.results.map((res, i) => `${i + 1} ${res.tube.label} ${res.reacts ? a.r.resultName : '변화 없음'}`).join(' · ')}</span></div>` +
                `<div class="data-row"><span class="data-name">까닭</span><span class="data-val">${a.works ? `${a.r.label}${eun(a.r.label)} ${TUBES.find(t => t.key === a.r.target).nutrient}에만 반응함` : '베네딕트 용액은 가열해야 반응하므로 실온에서는 아무 시험관도 변하지 않음'}</span></div>` +
                `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${PRED_R.find(o => o.value === a.verdict).label}</span></div>`;
        }
        if (a.kind === 'benedict') {
            return `<div class="data-row"><span class="data-name">조건</span><span class="data-val">${a.s.label} ${CONCS[state.conc].label} · 베네딕트 용액 · 가열 ${HEATS[state.bheat].label}</span></div>` +
                `<div class="data-row"><span class="data-name">반응</span><span class="data-val">${!a.heated ? '가열하지 않아 반응 없음' : !a.s.sugar ? `${a.s.name}${eun(a.s.name)} 당분이 아니라 반응 없음` : `${a.s.name}이 구리 이온과 반응해 ${a.thick ? '황적색 앙금' : '녹색~황색'}`}</span></div>` +
                `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${PRED_B.find(o => o.value === a.verdict).label}</span></div>`;
        }
        return `<div class="data-row"><span class="data-name">조건</span><span class="data-val">녹말물 + ${a.c.label}, 10분</span></div>` +
            `<div class="data-row"><span class="data-name">남은 녹말·생긴 엿당</span><span class="data-val">${fmtN(a.remain * 100)} % · ${fmtN(a.maltose * 100)} %</span></div>` +
            `<div class="data-row"><span class="data-name">검사</span><span class="data-val">아이오딘 ${a.iodine ? '청람색 (녹말 남음)' : '반응 없음 (녹말 없음)'} · 베네딕트 ${a.benedict ? '황적색 (엿당 있음)' : '푸른색 (엿당 없음)'}</span></div>` +
            `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${PRED_A.find(o => o.value === a.verdict).label}</span></div>`;
    }

    function render() {
        const a = analyse();
        mainGroup.innerHTML = a.kind === 'reagent' ? renderReagent(a) : a.kind === 'benedict' ? renderBenedict(a) : renderAmylase(a);
        graphGroup.innerHTML = a.kind === 'reagent' ? graphReagent(a) : a.kind === 'benedict' ? graphBenedict(a) : graphAmylase(a);
        stageBadge.textContent = a.kind === 'reagent' ? `${a.r.label}${a.r.needsHeat ? ` · 가열 ${HEATS[state.heat].label}` : ''}` : a.kind === 'benedict' ? `${a.s.label} · ${CONCS[state.conc].label} · 가열 ${HEATS[state.bheat].label}` : a.c.label;
        methodHint.textContent = a.kind === 'reagent' ? '시약마다 찾아내는 영양소가 하나씩 정해져 있습니다'
            : a.kind === 'benedict' ? '베네딕트 용액은 당분과 만나도 가열해야 색이 납니다'
                : '녹말은 베네딕트에 반응하지 않고, 엿당으로 잘린 뒤라야 반응합니다';
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
        if (a.kind === 'reagent') {
            const { r } = a, tgt = TUBES.find(t => t.key === r.target);
            labelA.textContent = '변한 시험관'; valueA.textContent = a.works ? `${TUBES.indexOf(tgt) + 1}번 ${tgt.label}` : '없음';
            labelB.textContent = '색'; valueB.textContent = a.works ? r.resultName : '그대로';
            if (a.works) s = `${r.full}${eun(r.full)} ${tgt.nutrient}${eul(tgt.nutrient)} 찾아내는 시약입니다. 네 시험관에 똑같이 넣어도 ${tgt.nutrient}이 든 ${TUBES.indexOf(tgt) + 1}번 ${tgt.label}만 ${r.resultName}으로 변하고, 나머지 시험관은 시약 색이 옅게 섞일 뿐 반응하지 않습니다. ${r.target === 'starch' ? '밥이나 감자에 떨어뜨리면 청람색이 되는 것과 같습니다.' : r.target === 'sugar' ? '끓는 물에 담가 가열했기 때문에 반응이 일어났고, 가열하지 않았다면 푸른색 그대로였을 것입니다. 녹말물은 당분이 아니라 변하지 않습니다.' : r.target === 'protein' ? '달걀 흰자처럼 단백질이 든 것만 보라색이 됩니다. 우유나 두부에서도 같은 색이 납니다.' : '수단 Ⅲ은 물에 녹지 않고 지방에만 녹아 색을 내므로, 물 시험관에서는 붉은 알갱이가 가라앉을 뿐입니다.'}`;
            else s = `베네딕트 용액은 당분과 만나도 실온에서는 반응하지 않습니다. 끓는 물에 담가 데워야 당분이 구리 이온과 반응해 황적색 앙금이 생기므로, 가열하지 않은 지금은 2번 포도당물까지 푸른색 그대로입니다. 가열 단추를 켜고 다시 해 보세요.`;
        } else if (a.kind === 'benedict') {
            labelA.textContent = '색'; valueA.textContent = PRED_B.find(o => o.value === a.verdict).label;
            labelB.textContent = '가열'; valueB.textContent = HEATS[state.bheat].label;
            s = `${CONCS[state.conc].label} 탄 ${a.s.label}에 베네딕트 용액을 넣고 ${a.heated ? '끓는 물에 담가 가열했습니다' : '가열하지 않았습니다'}. `;
            if (!a.heated) s += `${a.s.sugar ? `${a.s.name}이 들어 있어도 ` : ''}가열하지 않으면 베네딕트 반응은 일어나지 않아 푸른색 그대로입니다. 반응에는 열이 필요하기 때문이고, 그래서 이 실험에서는 시험관을 끓는 물에 2~3분 담급니다.`;
            else if (!a.s.sugar) s += state.sample === 'starch' ? `가열했는데도 푸른색 그대로입니다. 녹말은 포도당이 수백 개 이어진 큰 덩어리라 베네딕트 용액과 반응하지 못하기 때문입니다. 아밀레이스로 엿당으로 잘라 준 뒤라야 반응합니다.` : `맹물에는 당분이 없으니 가열해도 푸른색 그대로입니다. 이렇게 아무것도 안 든 시험관을 나란히 두는 것이 대조 실험입니다.`;
            else s += a.thick ? `${a.s.name}이 많아 구리 이온이 충분히 환원되어 황적색 앙금이 생깁니다. 당분이 아주 많으면 적갈색까지 갑니다.` : `${a.s.name}이 조금뿐이라 청색이 녹색이나 황색으로 바뀌는 데서 멈춥니다. 색이 어디까지 가는지로 당분의 양을 어림할 수 있습니다.`;
        } else {
            const { c } = a;
            labelA.textContent = '아이오딘 · 베네딕트'; valueA.textContent = `${a.iodine ? '청람색' : '반응 없음'} · ${a.benedict ? '황적색' : '푸른색'}`;
            labelB.textContent = '남은 녹말'; valueB.textContent = `${fmtN(a.remain * 100)} %`;
            s = `녹말물에 ${c.label}로 10분 두었더니 녹말이 ${fmtN(a.remain * 100)} % 남고 엿당이 ${fmtN(a.maltose * 100)} % 생겼습니다. 아이오딘 검사는 ${a.iodine ? '청람색 (녹말이 남아 있음)' : '변하지 않음 (녹말이 다 없어짐)'}, 베네딕트 검사는 가열한 뒤 ${a.benedict ? '황적색 (엿당이 생김)' : '푸른색 그대로 (엿당이 없음)'}입니다. `;
            if (a.verdict === 'digested') s += `처음 녹말물은 아이오딘에는 반응하고 베네딕트에는 반응하지 않았는데, 결과가 정반대로 뒤집혔습니다. 아밀레이스가 체온에서 녹말을 엿당으로 다 잘랐다는 뜻이고, 입에서 밥을 오래 씹으면 단맛이 나는 까닭이 바로 이것입니다.`;
            else if (a.verdict === 'partial') s += `차가우면 효소가 느리게 일해 10분 동안 일부만 엿당으로 바뀝니다. 그래서 녹말도 남아 있고(아이오딘 청람색) 엿당도 조금 생겨(베네딕트 황적색) 두 검사가 다 나타납니다.`;
            else s += c.enzyme ? `끓인 아밀레이스는 모양이 망가져 다시는 일하지 못하므로 녹말이 그대로입니다. 효소는 열에 약합니다.` : `아밀레이스를 넣지 않은 대조군이라 녹말이 그대로입니다. 녹말은 베네딕트 용액에 반응하지 않으므로 가열해도 푸른색이고, 효소가 있어야만 결과가 바뀝니다.`;
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
        checkBtn.textContent = state.mode === 'reagent' ? '시약 넣기' : state.mode === 'benedict' ? '베네딕트 넣기' : '10분 반응시키고 검사하기';
        stageCaption.textContent = state.mode === 'reagent' ? '네 시험관에 같은 시약을 차례로 떨어뜨립니다. 찾는 영양소가 든 시험관만 색이 변하고, 나머지는 시약 색이 옅게 섞일 뿐입니다.'
            : state.mode === 'benedict' ? '시험관 하나에 베네딕트 용액을 넣고, 가열을 골랐으면 끓는 물에 담급니다. 오른쪽 색 눈금에서 당분의 양을 읽습니다.'
                : '왼쪽 비커에서 10분 동안 녹말이 엿당으로 잘리는 모습을 보고, 반씩 나누어 아이오딘 검사와 베네딕트 검사를 이어서 합니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { reagent: 'iodine', heat: 'yes', sample: 'glucose', bheat: 'no', conc: 'thick', cond: 'warm', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'reagent').click();
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

    window.__nutrientModel = {
        REAGENTS, HEATS, SAMPLES, CONCS, CONDS, TUBES, state,
        analyse, render, runSeconds,
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
