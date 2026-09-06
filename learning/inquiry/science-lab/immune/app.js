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
    // Days. A germ doubles every 8 h; the innate system removes about 40 % a day;
    // antibody 1 = the level that stops the germ; lymphocytes need 5 days the first time, 1.5 days with memory.
    const R = 2.08, C0 = 0.5, KA = 3, CAP = 1e9, DT = 0.02, SICK = 1e4;
    const LAG1 = 5, LAG2 = 1.5, STR1 = 1, STR2 = 10, PLASMA_LIFE = 5, A_DECAY = 0.033, LONG_RATE = 0.01, C_LONG = 0.3;

    const INFECTS = {
        first: { label: '처음 걸림', hint: '기억 세포 없음' },
        same: { label: '두 번째 · 같은 병원체', hint: '두 달 전에 앓았음' },
        other: { label: '두 번째 · 다른 병원체', hint: '다른 병을 앓았던 몸' },
        nolymph: { label: '림프구 없는 몸', hint: '후천 면역 못 함' },
    };
    const DOSES = { small: { label: '조금 들어옴', hint: '100마리', dose: 100 }, large: { label: '많이 들어옴', hint: '100만 마리', dose: 1e6 } };
    const SHOTS = { none: { label: '접종 안 함', hint: '기억 세포 없음', n: 0 }, one: { label: '1회 접종', hint: '한 번만', n: 1 }, two: { label: '2회 접종', hint: '3주 간격', n: 2 } };
    const WHENS = { m1: { label: '한 달 뒤 만남', hint: '30일 뒤', gap: 30 }, m6: { label: '여섯 달 뒤 만남', hint: '180일 뒤', gap: 180 } };
    const V_DOSE = 1e5;
    const ABO = ['A', 'B', 'AB', 'O'];
    const ANTIGENS = { A: ['A'], B: ['B'], AB: ['A', 'B'], O: [] };
    const ANTIBODIES = { A: ['B'], B: ['A'], AB: [], O: ['A', 'B'] };
    const RHS = {
        same: { label: 'Rh 같음', hint: '둘 다 Rh⁺' },
        first: { label: 'Rh⁺ → Rh⁻ 처음', hint: '받는 사람 첫 수혈' },
        second: { label: 'Rh⁺ → Rh⁻ 두 번째', hint: '전에 한 번 받았음' },
    };

    const state = { mode: 'infect', infect: 'first', dose: 'small', shot: 'none', when: 'm1', donor: 'A', recip: 'B', rh: 'same', progress: 0, prediction: null };
    let running = false, frameId = 0, lastStamp = 0;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const sig = x => 1 / (1 + Math.exp(-x));
    const log10 = x => Math.log(x) / Math.LN10;
    const fmtCount = P => P < 1 ? '0' : P >= 1e8 ? `${P >= 1e9 ? Math.round(P / 1e8) : (P / 1e8).toFixed(1)}억` : P >= 1e4 ? `${Math.round(P / 1e4).toLocaleString('ko-KR')}만` : Math.round(P).toLocaleString('ko-KR');
    const fmtGerms = P => { const c = fmtCount(P); return `${c}${/[만억]$/.test(c) ? ' ' : ''}마리`; };
    // particles after a number follow how the last digit is read: 영 일 이 삼 사 오 육 칠 팔 구
    const lastDigit = str => (String(str).match(/\d(?!.*\d)/) || [''])[0];
    const pIga = str => '013678'.includes(lastDigit(str)) ? '이' : '가';
    const roOf = str => '036'.includes(lastDigit(str)) ? '으로' : '로';
    const dayWord = d => d < 0.5 ? '들어온 날' : `${fmtDay(d)}일째`;
    const sickWord = sick => sick <= 0 ? '열은 나지 않았습니다.' : sick < 0.5 ? '열은 반나절도 채 나지 않았습니다.' : `열은 ${sick.toFixed(1)}일 났습니다.`;
    const fmtA = A => A < 0.01 ? '거의 없음' : A < 1 ? A.toFixed(2) : A < 10 ? A.toFixed(1) : Math.round(A).toLocaleString('ko-KR');
    const fmtDay = d => Number.isInteger(+d.toFixed(1)) ? `${Math.round(d)}` : d.toFixed(1);

    /* ------------------------------------------------------------ models */
    const cache = {};
    function immuneRun(o) {
        const key = JSON.stringify(o);
        if (cache[key]) return cache[key];
        const { days, exposures, lymph = true } = o;
        let P = 0, A = o.A0 || 0, M = o.M0 || 0, Ag = 0, plasma = 0, longP = o.long0 || 0;
        let lastExp = -1e9, memAtExp = 0, armed = false, memShown = o.M0 || 0;
        const out = { t: [], P: [], A: [], Ag: [], plasma: [], M: [], memShown: [], act: [], sick: 0, firstSick: null, lastSick: null, peak: 0, peakDay: 0, clearDay: null, infectDay: null, protectDay: null };
        let step = 0;
        for (let t = 0; t <= days + 1e-9; t += DT, step += 1) {
            for (const e of exposures) if (Math.abs(t - e.day) < DT / 2) {
                if (e.kind === 'infect') { P += e.dose; out.infectDay = t; out.clearDay = null; out.peak = 0; } else Ag += 1e6;
                lastExp = t; memAtExp = M; M = Math.min(3, M + 1); armed = true;
            }
            const antigen = P + Ag;
            const lag = memAtExp > 0 ? LAG2 : LAG1, strength = memAtExp > 0 ? STR2 : STR1;
            const act = lymph ? (antigen / (antigen + 1e4)) * sig((t - lastExp - lag) / 0.5) : 0;
            if (armed && act > 0.3) { memShown = Math.min(3, memShown + 1); armed = false; }
            plasma += DT * (strength * act - plasma / PLASMA_LIFE);
            longP += DT * C_LONG * strength * act;
            A += DT * (0.4 * plasma + LONG_RATE * longP - A_DECAY * A);
            if (P > 0) {
                P *= Math.exp(DT * ((R - C0) * (1 - P / CAP) - KA * A));
                if (P < 0.5) { P = 0; if (out.clearDay === null) out.clearDay = +t.toFixed(2); }
            }
            Ag *= Math.exp(-DT * 0.5);
            if (step % 5 === 0) { out.t.push(+t.toFixed(2)); out.P.push(P); out.A.push(A); out.Ag.push(Ag); out.plasma.push(plasma); out.M.push(M); out.memShown.push(memShown); out.act.push(act); }
            if (P > out.peak) { out.peak = P; out.peakDay = +t.toFixed(2); }
            if (P > SICK) { out.sick += DT; if (out.firstSick === null) out.firstSick = +t.toFixed(2); out.lastSick = +t.toFixed(2); }
            if (out.infectDay !== null && out.protectDay === null && A >= 1 && t >= out.infectDay) out.protectDay = +t.toFixed(2);
        }
        out.Aend = A; out.Mend = M; out.longEnd = longP; out.maxA = Math.max(...out.A);
        cache[key] = out;
        return out;
    }
    // what is left of a fight `gap` days later: antibody has decayed, long-lived plasma cells keep a little coming
    const afterGap = (run, gap) => ({ A0: +(run.Aend * Math.exp(-A_DECAY * gap) + LONG_RATE * run.longEnd / A_DECAY * (1 - Math.exp(-A_DECAY * gap))).toFixed(4), M0: run.Mend, long0: +run.longEnd.toFixed(4) });
    const verdictOf = run => !run.clearDay ? 'unbeaten' : run.sick >= 5 ? 'week' : run.sick >= 1 ? 'days' : 'none';

    function analyse() {
        if (state.mode === 'infect') {
            const dose = DOSES[state.dose].dose;
            const base = { days: 21, exposures: [{ day: 0, kind: 'infect', dose }] };
            let run, prior = null;
            if (state.infect === 'same') { prior = immuneRun({ days: 21, exposures: [{ day: 0, kind: 'infect', dose: 100 }] }); run = immuneRun({ ...base, ...afterGap(prior, 60) }); }
            else if (state.infect === 'nolymph') run = immuneRun({ ...base, lymph: false });
            else run = immuneRun(base);
            return { kind: 'infect', run, prior, dose, verdict: verdictOf(run), tEnd: 21 };
        }
        if (state.mode === 'vaccine') {
            const n = SHOTS[state.shot].n, gap = WHENS[state.when].gap;
            const ex = []; if (n >= 1) ex.push({ day: 0, kind: 'vaccine' }); if (n >= 2) ex.push({ day: 21, kind: 'vaccine' });
            const lastDose = n === 2 ? 21 : 0, infectDay = lastDose + gap;
            ex.push({ day: infectDay, kind: 'infect', dose: V_DOSE });
            const run = immuneRun({ days: infectDay + 21, exposures: ex });
            const iA = run.t.findIndex(t => t >= infectDay - 0.01);
            return { kind: 'vaccine', run, n, gap, lastDose, infectDay, segA: n ? [0, lastDose + 21] : null, segB: [infectDay - 2, infectDay + 21], Aat: run.A[iA], verdict: verdictOf(run) };
        }
        const d = state.donor, r = state.recip;
        const hits = ANTIGENS[d].filter(x => ANTIBODIES[r].includes(x));
        const rhClump = state.rh === 'second';
        const verdict = hits.length || rhClump ? 'clump' : state.rh === 'first' ? 'sensitize' : 'ok';
        return { kind: 'blood', d, r, hits, rhClump, verdict };
    }
    const runSeconds = () => state.mode === 'infect' ? 7 : state.mode === 'vaccine' ? 8 : 5;

    // where the clock stands for the current progress (vaccine mode skips the empty months)
    function dayOf(a) {
        if (a.kind === 'infect') return state.progress * a.tEnd;
        if (a.kind === 'vaccine') {
            const p = state.progress;
            if (a.segA) return p < 0.4 ? (p / 0.4) * a.segA[1] : a.segB[0] + ((p - 0.4) / 0.6) * (a.segB[1] - a.segB[0]);
            return a.segB[0] + p * (a.segB[1] - a.segB[0]);
        }
        return 0;
    }
    const at = (arr, run, t) => arr[clamp(Math.round(t / 0.1), 0, arr.length - 1)];

    /* ---------------------------------------------------------- controls */
    function pickRow(legend, name, options, current, cols) {
        return `<fieldset class="pick-field"><legend>${legend}</legend>` +
            `<div class="pick-buttons cols${cols}" data-pick="${name}">` +
            options.map(o => `<button type="button" data-value="${o.value}" class="${o.value === String(current) ? 'selected' : ''}">` +
                `${o.label}${o.hint ? `<small>${o.hint}</small>` : ''}</button>`).join('') +
            `</div></fieldset>`;
    }
    const opts = table => Object.entries(table).map(([k, v]) => ({ value: k, label: v.label, hint: v.hint }));
    const aboOpts = ABO.map(t => ({ value: t, label: `${t}형`, hint: ANTIGENS[t].length ? `응집원 ${ANTIGENS[t].join('·')}` : '응집원 없음' }));

    function buildControls() {
        if (state.mode === 'infect') controlArea.innerHTML = pickRow('몇 번째 감염인가', 'infect', opts(INFECTS), state.infect, 2) + pickRow('들어온 병원체', 'dose', opts(DOSES), state.dose, 2);
        else if (state.mode === 'vaccine') controlArea.innerHTML = pickRow('백신', 'shot', opts(SHOTS), state.shot, 3) + pickRow('진짜 병원체를 만난 때', 'when', opts(WHENS), state.when, 2);
        else controlArea.innerHTML = pickRow('주는 사람 (적혈구)', 'donor', aboOpts, state.donor, 4) + pickRow('받는 사람 (혈장)', 'recip', aboOpts, state.recip, 4) + pickRow('Rh', 'rh', opts(RHS), state.rh, 3);
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_I = [{ value: 'week', label: '일주일 가까이 앓음' }, { value: 'days', label: '하루 이틀 앓음' }, { value: 'none', label: '거의 앓지 않음' }, { value: 'unbeaten', label: '이기지 못함' }];
    const PRED_V = [{ value: 'week', label: '일주일 가까이 앓음' }, { value: 'days', label: '하루 이틀 앓음' }, { value: 'none', label: '거의 앓지 않음' }];
    const PRED_B = [{ value: 'ok', label: '괜찮음' }, { value: 'clump', label: '응집이 일어남' }, { value: 'sensitize', label: '이번엔 괜찮지만 항체가 생김' }];

    function buildPrediction() {
        const list = state.mode === 'infect' ? PRED_I : state.mode === 'vaccine' ? PRED_V : PRED_B;
        predictionLegend.textContent = state.mode === 'infect' ? `${INFECTS[state.infect].label} · 병원체가 ${DOSES[state.dose].label.replace(' 들어옴', '')} 들어오면 얼마나 앓을까요?`
            : state.mode === 'vaccine' ? `${SHOTS[state.shot].label}, ${WHENS[state.when].label.replace(' 만남', '')} 병원체를 만나면?`
                : `${state.donor}형 적혈구를 ${state.recip}형에게 주면? (${RHS[state.rh].label})`;
        predictionArea.className = `prediction-buttons ${list.length === 4 ? 'four' : 'three'}`;
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    const yShape = (x, y, cls, s = 4) => `<path class="${cls}" d="M${x},${y + s} L${x},${y} M${x},${y} L${x - s * 0.8},${y - s} M${x},${y} L${x + s * 0.8},${y - s}"/>`;

    function renderImmune(a) {
        const t = dayOf(a), { run } = a;
        const P = at(run.P, run, t), A = at(run.A, run, t), Ag = at(run.Ag, run, t), plasma = at(run.plasma, run, t), M = at(run.M, run, t), mem = at(run.memShown, run, t), act = at(run.act, run, t);
        const lymph = !(a.kind === 'infect' && state.infect === 'nolymph');
        let out = `<rect class="blood-field" x="16" y="26" width="290" height="146" rx="10"/>`;
        // germs: as many dots as the logarithm of the count
        const nG = P >= 1 ? clamp(Math.round(log10(P) * 4) + 1, 1, 40) : 0;
        for (let k = 0; k < nG; k += 1) { const x = 26 + ((k * 53 + Math.floor(t * 7)) % 270), y = 34 + ((k * 37) % 112); out += `<circle class="germ" cx="${x}" cy="${y}" r="3.2"/>`; }
        const nV = Ag >= 100 ? clamp(Math.round(log10(Ag) * 3), 1, 20) : 0;
        for (let k = 0; k < nV; k += 1) { const x = 30 + ((k * 71) % 262), y = 38 + ((k * 43) % 106); out += `<circle class="germ vaccine" cx="${x}" cy="${y}" r="3.2"/>`; }
        // antibodies
        const nA = A >= 0.02 ? clamp(Math.round((log10(A) + 2) * 5), 1, 40) : 0;
        for (let k = 0; k < nA; k += 1) { const x = 34 + ((k * 61 + Math.floor(t * 4)) % 258), y = 42 + ((k * 29) % 104); out += yShape(x, y, 'ab', 3.5); }
        out += `<text class="small-label" x="22" y="166">몸속 (혈액·조직액)${nV ? ' — 옅은 점은 백신 항원' : ''}</text>`;
        // the cells below
        const cells = [
            { x: 44, cls: 'cell-mac', r: 8, name: '큰포식세포', sub: P >= 1 || Ag >= 100 ? '잡아먹는 중' : '대기' },
            { x: 106, cls: 'cell-b', r: 7, name: 'B 림프구', sub: !lymph ? '없음' : act > 0.3 ? '항원 알아봄' : '대기' },
            { x: 168, cls: 'cell-plasma', r: 7, name: '형질 세포', sub: !lymph ? '없음' : plasma >= 0.5 ? `×${Math.round(plasma)} 항체 생산` : '아직 없음' },
            { x: 232, cls: 'cell-mem', r: 7, name: '기억 세포', sub: !lymph ? '없음' : mem > 0 ? `×${mem} 있음` : a.kind === 'infect' && state.infect === 'other' ? '다른 병원체용만' : '아직 없음' },
            { x: 292, cls: 'cell-t', r: 7, name: 'T 림프구', sub: !lymph ? '없음' : act > 0.3 ? '도움 신호' : '대기' },
        ];
        cells.forEach(c => {
            out += `<circle class="cell ${c.cls}" cx="${c.x}" cy="184" r="${c.r}"${!lymph && c.cls !== 'cell-mac' ? ' opacity=".3"' : ''}/>`;
            if (c.cls === 'cell-plasma' && plasma >= 0.5) out += yShape(c.x + 11, 180, 'ab', 3);
            out += `<text class="cell-text" x="${c.x}" y="200" text-anchor="middle">${c.name}</text><text class="small-label" x="${c.x}" y="210" text-anchor="middle">${c.sub}</text>`;
        });
        // right column: day, counts, fever
        const sick = P > SICK;
        out += `<text class="gen-text" x="320" y="42">${fmtDay(t)}일째</text>`;
        out += `<text class="trait-text" style="fill:#c084fc" x="320" y="62">병원체 ${P >= 1 ? fmtGerms(P) : '없음'}</text>`;
        out += `<text class="trait-text" style="fill:#059669" x="320" y="78">항체 ${fmtA(A)}</text>`;
        out += `<text class="small-label" x="320" y="90">(1을 넘으면 병원체를 막음)</text>`;
        out += `<rect class="fever" x="320" y="102" width="120" height="14" rx="7"/><rect class="fever-fill" x="322" y="104" width="${(116 * clamp(P >= 1 ? log10(P) / 9 : 0, 0, 1)).toFixed(1)}" height="10" rx="5"/>`;
        out += `<line class="ref-line" x1="${(322 + 116 * 4 / 9).toFixed(1)}" y1="99" x2="${(322 + 116 * 4 / 9).toFixed(1)}" y2="119"/>`;
        out += `<text class="small-label" x="320" y="130">막대: 병원체 수 (로그 눈금)</text><text class="small-label" x="320" y="141">점선(1만 마리)을 넘으면 열이 남</text>`;
        out += `<text class="trait-text" style="fill:${sick ? '#ff7a59' : '#475569'}" x="320" y="157">${sick ? '열이 나 앓는 중' : P >= 1 ? '병원체 있지만 괜찮음' : nV ? '백신 항원만 있음 — 앓지 않음' : '병원체 없음'}</text>`;
        let phase;
        if (!lymph) phase = P > 0 ? '림프구가 없어 항체가 안 나옴' : '';
        else if (P < 1 && Ag < 100 && A < 1) phase = M > 0 ? '기억 세포가 지키는 중' : '아직 아무 일 없음';
        else if (act < 0.3 && A < 1) phase = M > 1 || (a.kind === 'infect' && state.infect === 'same') ? '기억 세포가 깨어남 (하루 반)' : '림프구가 깨어남 (닷새쯤)';
        else if (P >= 1 && A >= 1) phase = '항체가 병원체를 치우는 중';
        else if (act >= 0.3) phase = '형질 세포가 항체를 쏟아냄';
        else phase = A >= 1 ? '항체가 남아 지킴' : '';
        out += `<text class="trait-text" x="320" y="171">${phase}</text>`;
        const title = a.kind === 'infect' ? `${INFECTS[state.infect].label} · ${DOSES[state.dose].hint}` : `${SHOTS[state.shot].label} · ${WHENS[state.when].label}`;
        const VERD = { week: `${run.sick.toFixed(1)}일 앓음`, days: `${run.sick.toFixed(1)}일 앓음`, none: run.sick > 0 ? `거의 앓지 않음 (${run.sick.toFixed(1)}일)` : '앓지 않음', unbeaten: '3주 뒤에도 병원체 그대로' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${title}: ${VERD[a.verdict]}${run.clearDay !== null ? `, ${run.clearDay - (run.infectDay || 0) < 0.5 ? '반나절 안에' : `${fmtDay(run.clearDay - (run.infectDay || 0))}일 만에`} 병원체 사라짐` : ''}` : title}</text>`;
        return out;
    }

    function graphImmune(a) {
        const t = dayOf(a), { run } = a;
        const X0 = 56, X1 = 404, Y0 = 150, Y1 = 40, XM = X0 + (X1 - X0) * 0.42;
        const yP = P => Y0 - clamp(P >= 1 ? log10(P) / 9 : 0, 0, 1) * (Y0 - Y1);
        const yA = A => Y0 - clamp((log10(Math.max(A, 0.01)) + 2) / 5, 0, 1) * (Y0 - Y1);
        let xOf;
        if (a.kind === 'infect') xOf = d => X0 + d / a.tEnd * (X1 - X0);
        else if (a.segA) xOf = d => d <= a.segA[1] + 1e-6 ? X0 + d / a.segA[1] * (XM - 6 - X0) : d < a.segB[0] ? NaN : XM + 6 + (d - a.segB[0]) / (a.segB[1] - a.segB[0]) * (X1 - XM - 6);
        else xOf = d => d < a.segB[0] ? NaN : X0 + (d - a.segB[0]) / (a.segB[1] - a.segB[0]) * (X1 - X0);
        let out = `<text class="axis-title" x="${X0}" y="14">보라 선: 병원체 수(왼쪽 눈금) · 초록 선: 항체(오른쪽 눈금) · 붉은 띠: 열이 나는 범위</text>`;
        out += `<rect class="band" x="${X0}" y="${Y1}" width="${X1 - X0}" height="${(yP(SICK) - Y1).toFixed(1)}"/>`;
        [0, 2, 4, 6, 8].forEach(e => { out += `<line class="grid-line" x1="${X0}" y1="${yP(10 ** e).toFixed(1)}" x2="${X1}" y2="${yP(10 ** e).toFixed(1)}"/><text class="axis-text" style="fill:#c084fc" x="${X0 - 5}" y="${(yP(10 ** e) + 3.5).toFixed(1)}" text-anchor="end">${['1', '100', '1만', '100만', '1억'][e / 2]}</text>`; });
        [-2, -1, 0, 1, 2, 3].forEach(e => { out += `<text class="axis-text" style="fill:#059669" x="${X1 + 5}" y="${(yA(10 ** e) + 3.5).toFixed(1)}">${e < 0 ? (10 ** e).toFixed(-e) : 10 ** e}</text>`; });
        out += `<line class="ref-line" style="stroke:#059669" x1="${X0}" y1="${yA(1).toFixed(1)}" x2="${X1}" y2="${yA(1).toFixed(1)}"/>`;
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/><line class="axis" x1="${X1}" y1="${Y1}" x2="${X1}" y2="${Y0}"/>`;
        // ticks
        const ticks = [];
        if (a.kind === 'infect') for (let d = 0; d <= 21; d += 3) ticks.push([d, `${d}`]);
        else {
            if (a.segA) { for (let d = 0; d < a.segA[1]; d += 7) ticks.push([d, `${d}`]); out += `<path class="axis" d="M${(XM - 5).toFixed(1)},${Y0 + 5} L${(XM - 1).toFixed(1)},${Y0 - 5} M${(XM + 1).toFixed(1)},${Y0 + 5} L${(XM + 5).toFixed(1)},${Y0 - 5}"/><line class="ref-line" x1="${XM.toFixed(1)}" y1="${Y1}" x2="${XM.toFixed(1)}" y2="${Y0}"/>`; }
            for (let d = a.infectDay; d < a.segB[1] - 1; d += 7) ticks.push([d, `${d}`]);
        }
        ticks.forEach(([d, lab]) => { const x = xOf(d); if (!Number.isNaN(x)) out += `<text class="axis-text" x="${x.toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${lab}</text>`; });
        // exposure markers
        if (a.kind === 'vaccine') {
            for (let k = 0; k < a.n; k += 1) { const x = xOf(k * 21); out += `<polygon fill="#a78bfa" points="${x.toFixed(1)},${Y1 - 1} ${(x - 4).toFixed(1)},${Y1 - 7} ${(x + 4).toFixed(1)},${Y1 - 7}"/><text class="small-label" style="fill:#a78bfa" x="${x.toFixed(1)}" y="${Y1 - 9}" text-anchor="middle">접종</text>`; }
            const xi = xOf(a.infectDay); out += `<polygon fill="#c084fc" points="${xi.toFixed(1)},${Y1 - 1} ${(xi - 4).toFixed(1)},${Y1 - 7} ${(xi + 4).toFixed(1)},${Y1 - 7}"/><text class="small-label" style="fill:#c084fc" x="${xi.toFixed(1)}" y="${Y1 - 9}" text-anchor="middle">병원체</text>`;
        }
        let dP = '', dA = '', penUp = true;
        run.t.forEach((d, i) => {
            if (d > t) return;
            const x = xOf(d);
            if (Number.isNaN(x)) { penUp = true; return; }
            if (run.P[i] >= 1) { dP += `${penUp ? 'M' : 'L'}${x.toFixed(1)},${yP(run.P[i]).toFixed(1)} `; penUp = false; } else penUp = true;
            dA += `${dA ? 'L' : 'M'}${x.toFixed(1)},${yA(run.A[i]).toFixed(1)} `;
        });
        out += `<path class="trace" style="stroke:#059669" d="${dA}"/>`;
        out += `<path class="trace" style="stroke:#c084fc" d="${dP}"/>`;
        out += `<text class="axis-title" x="${((X0 + X1) / 2).toFixed(1)}" y="${Y0 + 30}" text-anchor="middle">${a.kind === 'infect' ? '병원체가 들어온 뒤 날수' : '첫 접종 뒤 날수 (점선 자리에서 몇 달을 건너뜀)'}</text>`;
        return out;
    }

    // blood: red cells carrying their antigens, plasma carrying its antibodies
    const AG_COLOR = { A: 'antigen-a', B: 'antigen-b', D: 'antigen-d' };
    const AB_STROKE = { A: '#d97706', B: '#0284c7', D: '#7c3aed' };
    function rbc(x, y, antigens, r = 7) {
        let s = `<circle class="rbc" cx="${x}" cy="${y}" r="${r}"/><circle class="rbc-hole" cx="${x}" cy="${y}" r="${r * 0.38}"/>`;
        antigens.forEach((ag, i) => {
            const ang = -Math.PI / 2 + i * 2.1, px = x + Math.cos(ang) * r, py = y + Math.sin(ang) * r;
            if (ag === 'A') s += `<polygon class="antigen-a" points="${px},${py - 3} ${px - 2.8},${py + 2} ${px + 2.8},${py + 2}"/>`;
            else if (ag === 'B') s += `<rect class="antigen-b" x="${px - 2.4}" y="${py - 2.4}" width="4.8" height="4.8"/>`;
            else s += `<polygon class="antigen-d" points="${px},${py - 3.2} ${px + 1},${py - 1} ${px + 3.2},${py - 1} ${px + 1.5},${py + 0.6} ${px + 2},${py + 3} ${px},${py + 1.6} ${px - 2},${py + 3} ${px - 1.5},${py + 0.6} ${px - 3.2},${py - 1} ${px - 1},${py - 1}"/>`;
        });
        return s;
    }

    function renderBlood(a) {
        const p = state.progress;
        const donorAg = [...ANTIGENS[a.d], 'D'];   // the donor is Rh⁺ in every setting here
        const recipAb = [...ANTIBODIES[a.r], ...(state.rh === 'second' ? ['D'] : [])];
        const recipAg = [...ANTIGENS[a.r], ...(state.rh === 'same' ? ['D'] : [])];
        let out = `<rect class="bag" x="20" y="44" width="96" height="120" rx="12"/><text class="small-label" x="68" y="38" text-anchor="middle">주는 사람 ${a.d}형 Rh⁺</text>`;
        out += `<text class="small-label" x="68" y="176" text-anchor="middle">응집원 ${donorAg.join('·')}</text>`;
        const bagSpots = [[44, 66], [78, 62], [96, 88], [40, 98], [66, 116], [94, 130], [50, 146]];
        const moved = Math.round(p * 8);
        bagSpots.forEach(([x, y], i) => { if (i >= moved) out += rbc(x, y, donorAg); });
        out += `<path class="tube" d="M116,104 C150,104 160,104 196,104"/>`;
        out += `<rect class="vein" x="196" y="52" width="248" height="104" rx="16"/><text class="small-label" x="320" y="46" text-anchor="middle">받는 사람 ${a.r}형 ${state.rh === 'same' ? 'Rh⁺' : 'Rh⁻'} — 혈장에 응집소 ${recipAb.length ? recipAb.map(x => `항${x}`).join('·') : '없음'}</text>`;
        // the recipient's own cells, faint
        [[420, 76], [426, 132], [396, 140]].forEach(([x, y]) => { out += `<g opacity=".45">${rbc(x, y, recipAg, 6)}</g>`; });
        // plasma antibodies drifting
        recipAb.forEach((ab, j) => { for (let k = 0; k < 6; k += 1) { const x = 214 + ((k * 41 + j * 17 + Math.floor(p * 30)) % 200), y = 64 + ((k * 23 + j * 31) % 80); out += yShape(x, y, 'plasma-ab', 4).replace('class="plasma-ab"', `class="plasma-ab" style="stroke:${AB_STROKE[ab]}"`); } });
        // moved donor cells: spread out, or gather into a clump
        const clumpNow = a.verdict === 'clump';
        const cx = 300, cy = 104;
        for (let i = 0; i < moved; i += 1) {
            const spread = [[224, 80], [250, 124], [276, 72], [304, 126], [330, 82], [356, 120], [380, 76], [340, 100]][i];
            let x = spread[0], y = spread[1];
            if (clumpNow) { const g = clamp((p - 0.35) / 0.5, 0, 1); const ang = i * 0.785, rr = 16 * (1 - g) + 12; x = spread[0] + (cx + Math.cos(ang) * rr - spread[0]) * g; y = spread[1] + (cy + Math.sin(ang) * rr - spread[1]) * g; }
            out += rbc(x, y, donorAg);
            if (clumpNow && p > 0.6 && i > 0) { const prev = i - 1, ang0 = prev * 0.785, ang = i * 0.785; out += `<line class="clump-link" x1="${(cx + Math.cos(ang0) * 12).toFixed(1)}" y1="${(cy + Math.sin(ang0) * 12).toFixed(1)}" x2="${(cx + Math.cos(ang) * 12).toFixed(1)}" y2="${(cy + Math.sin(ang) * 12).toFixed(1)}"/>`; }
        }
        if (clumpNow && p > 0.6) { const hit = a.hits[0] || 'D'; out += yShape(cx, cy - 2, 'plasma-ab', 6).replace('class="plasma-ab"', `class="plasma-ab" style="stroke:${AB_STROKE[hit]};stroke-width:2.2"`); out += `<text class="trait-text" style="fill:#ff7a59" x="${cx}" y="${cy + 30}" text-anchor="middle">응집 — 항${hit} 응집소가 응집원 ${hit}를 붙잡음</text>`; }
        if (a.verdict === 'sensitize' && p > 0.6) { out += `<circle class="cell cell-b" cx="404" cy="118" r="7"/><text class="cell-text" x="404" y="134" text-anchor="middle">B 림프구</text>`; for (let k = 0; k < Math.round((p - 0.6) * 10); k += 1) out += yShape(388 + k * 8, 102, 'plasma-ab', 3).replace('class="plasma-ab"', 'class="plasma-ab" style="stroke:#7c3aed"'); out += `<text class="trait-text" style="fill:#7c3aed" x="320" y="146" text-anchor="middle">처음 본 응집원 D → 항D 응집소를 만들기 시작</text>`; }
        if (a.verdict === 'ok' && p >= 1) out += `<text class="trait-text" style="fill:#059669" x="320" y="146" text-anchor="middle">붙잡을 응집원이 없어 그대로 흐름</text>`;
        const VERD = { ok: '응집 없음 — 수혈 가능', clump: '응집 — 수혈 불가', sensitize: '이번엔 괜찮지만 항D 응집소가 생김' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${a.d}형 → ${a.r}형 (${RHS[state.rh].label}): ${VERD[a.verdict]}` : `${a.d}형 적혈구 → ${a.r}형 (${RHS[state.rh].label})`}</text>`;
        out += `<text class="note-text" x="20" y="194">응집원 = 적혈구 표면의 표지 (세모 A · 네모 B · 별 D)</text><text class="note-text" x="20" y="208">응집소 = 혈장 속 Y (같은 색끼리 짝). 짝이 맞으면 적혈구가 뭉칩니다</text>`;
        return out;
    }

    function graphBlood(a) {
        const X = 122, Y = 48, W = 62, H = 24;
        let out = `<text class="axis-title" x="20" y="18">적혈구를 줄 수 있는 짝 — 가로: 주는 사람, 세로: 받는 사람 (ABO만)</text>`;
        ABO.forEach((d, i) => { out += `<text class="chart-text" x="${X + i * W + W / 2}" y="${Y - 8}" text-anchor="middle">${d}형</text>`; });
        ABO.forEach((r, j) => {
            out += `<text class="chart-text" x="${X - 8}" y="${Y + j * H + H / 2 + 4}" text-anchor="end">${r}형에게</text>`;
            ABO.forEach((d, i) => {
                const ok = !ANTIGENS[d].some(x => ANTIBODIES[r].includes(x));
                out += `<rect class="chart-cell ${ok ? 'chart-ok' : 'chart-bad'}" x="${X + i * W}" y="${Y + j * H}" width="${W}" height="${H}"/>`;
                out += `<text class="chart-text" style="fill:${ok ? '#059669' : '#dc2626'}" x="${X + i * W + W / 2}" y="${Y + j * H + H / 2 + 4}" text-anchor="middle">${ok ? '○' : '✕ 응집'}</text>`;
            });
        });
        out += `<rect class="chart-now" x="${X + ABO.indexOf(a.d) * W}" y="${Y + ABO.indexOf(a.r) * H}" width="${W}" height="${H}" rx="3"/>`;
        out += `<text class="trait-text" x="20" y="${Y + 4 * H + 22}">O형 적혈구에는 응집원이 없어 어느 줄에도 ○, AB형 혈장에는 응집소가 없어 어느 칸도 ○입니다.</text>`;
        out += `<text class="trait-text" x="20" y="${Y + 4 * H + 38}">Rh: 항D 응집소는 태어날 때 없고 Rh⁺ 피를 한 번 받은 뒤 생깁니다 — 첫 수혈은 무사해 보여도 두 번째는 응집.</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'infect' || a.kind === 'vaccine') {
            const { run } = a, rel = d => d === null ? '-' : dayWord(d - (run.infectDay || 0));
            const head = a.kind === 'infect'
                ? `<div class="data-row"><span class="data-name">조건</span><span class="data-val">${INFECTS[state.infect].label} (${INFECTS[state.infect].hint}) · 병원체 ${DOSES[state.dose].hint} · 8시간마다 2배</span></div>`
                : `<div class="data-row"><span class="data-name">조건</span><span class="data-val">${SHOTS[state.shot].label} · ${WHENS[state.when].label.replace(' 만남', '')} 병원체 10만 마리를 만남 · 만난 날 항체 ${fmtA(a.Aat)}</span></div>`;
            return head +
                `<div class="data-row"><span class="data-name">병원체</span><span class="data-val">가장 많을 때 ${fmtGerms(run.peak)} (${rel(run.peakDay)}) · ${run.clearDay !== null ? `${rel(run.clearDay)} 사라짐` : '3주 뒤에도 남음'}</span></div>` +
                `<div class="data-row"><span class="data-name">항체</span><span class="data-val">${run.protectDay !== null ? `${rel(run.protectDay)} 막는 문턱(1) 넘음` : '문턱(1)에 못 미침'} · 가장 높을 때 ${fmtA(run.maxA)}</span></div>` +
                `<div class="data-row match"><span class="data-name">앓은 기간</span><span class="data-val">${run.sick > 0 ? `${run.sick.toFixed(1)}일 (${rel(run.firstSick)}~${fmtDay(run.lastSick - (run.infectDay || 0))}일째)` : '열이 나지 않음'} — 병원체 1만 마리 넘는 동안</span></div>`;
        }
        const donorAg = [...ANTIGENS[a.d], 'D'], recipAb = [...ANTIBODIES[a.r], ...(state.rh === 'second' ? ['D'] : [])];
        return `<div class="data-row"><span class="data-name">주는 적혈구</span><span class="data-val">${a.d}형 Rh⁺ — 응집원 ${donorAg.join('·')}</span></div>` +
            `<div class="data-row"><span class="data-name">받는 혈장</span><span class="data-val">${a.r}형 ${state.rh === 'same' ? 'Rh⁺' : 'Rh⁻'} — 응집소 ${recipAb.length ? recipAb.map(x => `항${x}`).join('·') : '없음'}${state.rh === 'first' ? ' (항D는 아직 없음)' : ''}</span></div>` +
            `<div class="data-row"><span class="data-name">짝이 맞는 것</span><span class="data-val">${a.hits.length || a.rhClump ? [...a.hits, ...(a.rhClump ? ['D'] : [])].map(x => `항${x} ↔ 응집원 ${x}`).join(', ') : '없음'}</span></div>` +
            `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${a.verdict === 'ok' ? '응집 없음' : a.verdict === 'clump' ? '응집 — 적혈구가 뭉쳐 혈관을 막음' : '이번엔 응집 없음, 항D 응집소 생김 → 다음 Rh⁺ 수혈은 위험'}</span></div>`;
    }

    function render() {
        const a = analyse();
        mainGroup.innerHTML = a.kind === 'blood' ? renderBlood(a) : renderImmune(a);
        graphGroup.innerHTML = a.kind === 'blood' ? graphBlood(a) : graphImmune(a);
        stageBadge.textContent = a.kind === 'infect' ? `${INFECTS[state.infect].label} · ${DOSES[state.dose].label}` : a.kind === 'vaccine' ? `${SHOTS[state.shot].label} · ${WHENS[state.when].label}` : `${a.d}형 → ${a.r}형 · ${RHS[state.rh].label}`;
        methodHint.textContent = a.kind === 'infect' ? '처음 만난 병원체에는 항체가 나오기까지 닷새쯤 걸립니다'
            : a.kind === 'vaccine' ? '백신은 앓지 않고 기억 세포를 만들어 둡니다'
                : '받는 사람의 응집소가 주는 적혈구의 응집원을 붙잡으면 뭉칩니다';
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
        if (a.kind === 'infect' || a.kind === 'vaccine') {
            const { run } = a, rel = d => fmtDay(d - (run.infectDay || 0)), relW = d => dayWord(d - (run.infectDay || 0));
            labelA.textContent = '앓은 기간'; valueA.textContent = run.sick > 0 ? `${run.sick.toFixed(1)}일` : '열 안 남';
            labelB.textContent = '병원체가 사라진 때'; valueB.textContent = run.clearDay !== null ? `${rel(run.clearDay)}일째` : '3주 안에 못 없앰';
            const tail = ' 처음 반응은 느리고 두 번째 반응은 빠르고 큰 것, 그것이 면역 기억입니다.';
            if (a.kind === 'infect') {
                const dose = DOSES[state.dose].hint;
                if (state.infect === 'nolymph') s = `림프구가 없는 몸에 병원체 ${dose}가 들어왔습니다. 큰포식세포가 하루에 절반 가까이 잡아먹었지만 8시간마다 두 배로 늘어나는 병원체를 따라잡지 못했고, 항체는 하나도 만들어지지 않았습니다. 병원체는 ${fmtGerms(run.peak)}까지 늘어 3주 내내 열이 났습니다. 후천 면역이 없으면 가벼운 감염도 이기지 못하는 까닭입니다.`;
                else {
                    const primary = state.infect !== 'same';
                    s = state.infect === 'other' ? `다른 병을 앓고 남은 기억 세포는 이 병원체의 항원을 알아보지 못합니다. 그래서 처음 걸린 것과 똑같이 진행됐습니다. ` : state.infect === 'same' ? `두 달 전에 같은 병원체를 앓아 기억 세포와 항체 ${fmtA(run.A[0])}${pIga(fmtA(run.A[0]))} 남아 있었습니다. ` : '';
                    s += `병원체 ${dose}가 들어와 8시간마다 두 배로 늘었습니다. `;
                    if (primary) s += `큰포식세포만으로는 막지 못해 ${run.firstSick !== null ? `${relW(run.firstSick)}부터 열이 났고, ` : ''}${rel(run.peakDay)}일째 ${fmtGerms(run.peak)}까지 늘었습니다. B 림프구가 형질 세포로 자라 항체를 내기까지 닷새 안팎이 걸려 ${run.protectDay !== null ? `${rel(run.protectDay)}일째에야` : '늦게'} 항체가 막는 문턱을 넘었고, 그 뒤 병원체가 빠르게 줄어 ${rel(run.clearDay)}일째 사라졌습니다. 앓은 기간은 ${run.sick.toFixed(1)}일이고, 이제 기억 세포가 남았습니다.`;
                    else if (run.maxA <= run.A[0] * 1.05) s += `남아 있던 항체만으로도 병원체가 늘어나지 못했습니다. 기억 세포가 나설 틈도 없이 병원체는 ${fmtGerms(run.peak)}를 넘지 못하고 ${rel(run.clearDay)}일째 모두 사라져 열이 나지 않았습니다.`;
                    else s += `기억 세포가 하루 반 만에 형질 세포로 바뀌어 처음보다 열 배 넘는 항체(최고 ${fmtA(run.maxA)})를 냈습니다. ${run.sick > 0 ? `그래도 한 번에 ${dose}가 들어와 ${run.sick.toFixed(1)}일쯤 열이 났지만, ` : `병원체는 ${fmtGerms(run.peak)}를 넘지 못해 열이 나지 않았고, `}${rel(run.clearDay)}일째 모두 사라졌습니다.`;
                }
            } else {
                const gap = WHENS[state.when].gap;
                if (a.n === 0) s = `백신을 맞지 않은 몸이 ${gap}일 뒤 병원체 10만 마리를 만났습니다. 기억 세포가 없어 처음 걸린 것과 똑같이 항체가 나오기까지 닷새 넘게 걸렸고, 병원체는 ${fmtGerms(run.peak)}까지 늘어 ${run.sick.toFixed(1)}일 앓았습니다. ${rel(run.clearDay)}일째에야 병원체가 사라졌습니다.`;
                else if (a.n === 1) s = gap <= 30
                    ? `한 번 맞은 뒤 30일에는 항체가 아직 ${fmtA(a.Aat)}${roOf(fmtA(a.Aat))} 문턱(1) 위에 있었습니다. 병원체 10만 마리가 들어왔지만 항체가 곧바로 붙잡고 기억 세포도 하루 반 만에 항체를 더 내어 ${relW(run.clearDay)} 사라졌습니다. ${sickWord(run.sick)}`
                    : `한 번 맞고 여섯 달이 지나 항체는 ${fmtA(a.Aat)}까지 줄었습니다(항체 반감기 3주). 기억 세포는 남아 있어 하루 반 만에 항체를 쏟아냈지만, 그 사이 병원체가 ${fmtGerms(run.peak)}까지 늘어 ${run.sick.toFixed(1)}일 앓았습니다. 그래도 맞지 않은 몸보다 훨씬 짧습니다. 몇 주 뒤 한 번 더 맞아 두라고 하는 까닭이 여기 있습니다.`;
                else s = `두 번 맞아 기억 세포가 늘고 오래 사는 형질 세포가 많아져 ${gap}일 뒤에도 항체가 ${fmtA(a.Aat)}${roOf(fmtA(a.Aat))} 문턱(1) 위에 있었습니다. 병원체 10만 마리가 들어왔지만 늘어나지 못하고 ${relW(run.clearDay)} 사라졌습니다. ${sickWord(run.sick)} 추가 접종은 항체를 오래 높게 남기는 방법입니다.`;
            }
            if (!(a.kind === 'infect' && state.infect === 'nolymph')) s += tail;
        } else {
            const abList = ANTIBODIES[a.r].map(x => `항${x}`).join('·') || '없음', agList = ANTIGENS[a.d].join('·') || '없음';
            labelA.textContent = '결과'; valueA.textContent = a.verdict === 'ok' ? '응집 없음' : a.verdict === 'clump' ? '응집' : '괜찮지만 항D 생김';
            labelB.textContent = '까닭'; valueB.textContent = a.hits.length ? `항${a.hits[0]} 응집소 ↔ 응집원 ${a.hits[0]}` : a.rhClump ? '항D 응집소 ↔ 응집원 D' : state.rh === 'first' ? '응집원 D를 처음 봄' : '짝이 맞는 응집소 없음';
            if (a.verdict === 'clump') {
                if (a.hits.length) s = `${a.r}형 혈장에는 ${abList} 응집소가 있고 ${a.d}형 적혈구에는 응집원 ${agList}가 있어, 만나는 즉시 항${a.hits[0]} 응집소가 응집원 ${a.hits[0]}를 붙잡아 적혈구가 뭉쳤습니다(응집). 뭉친 덩어리가 작은 혈관을 막고 적혈구가 터져 매우 위험합니다. `;
                else s = `ABO는 맞았지만 받는 사람은 Rh⁻이면서 전에 Rh⁺ 피를 받은 적이 있어 항D 응집소가 이미 만들어져 있었습니다. 이번 Rh⁺ 적혈구의 응집원 D와 만나 곧바로 응집했습니다. `;
                if (a.hits.length && a.rhClump) s += `Rh도 맞지 않아 항D 응집소까지 응집원 D를 붙잡았습니다. `;
                s += `수혈 전에 두 피를 조금 섞어 뭉치는지 보는 교차 시험을 꼭 하는 까닭입니다.`;
            } else if (a.verdict === 'sensitize') s = `${!ANTIGENS[a.d].length ? `${a.d}형 적혈구에는 응집원 A·B가 없어` : !ANTIBODIES[a.r].length ? `${a.r}형 혈장에는 응집소가 없어` : `${a.d}형 적혈구의 응집원(${agList})을 ${a.r}형 혈장의 응집소(${abList})가 붙잡을 수 없어`} ABO로는 뭉치지 않았습니다. 그러나 Rh⁻인 받는 사람의 림프구가 처음 본 응집원 D를 항원으로 알아보고 항D 응집소를 만들기 시작했습니다. 이번 수혈은 무사해 보이지만 기억 세포가 남아, 다음에 Rh⁺ 피를 받으면 바로 응집합니다. Rh⁻ 어머니가 Rh⁺ 아기를 가졌을 때도 같은 일이 일어나 둘째 아기가 위험해질 수 있어 미리 항D 주사를 맞습니다.`;
            else s = `${!ANTIGENS[a.d].length && !ANTIBODIES[a.r].length ? `${a.d}형 적혈구에는 응집원이, ${a.r}형 혈장에는 응집소가 없어 만날 것이 없었습니다.` : !ANTIGENS[a.d].length ? `${a.d}형 적혈구에는 응집원이 없어 ${a.r}형 혈장의 응집소(${abList})가 붙잡을 것이 없었습니다.` : !ANTIBODIES[a.r].length ? `${a.r}형 혈장에는 응집소가 없어 ${a.d}형 적혈구의 응집원(${agList})을 붙잡을 것이 없었습니다.` : `${a.d}형 적혈구의 응집원(${agList})을 ${a.r}형 혈장의 응집소(${abList})가 붙잡을 수 없었습니다.`} 적혈구는 뭉치지 않고 그대로 흘렀습니다. 둘 다 Rh⁺여서 응집원 D도 문제가 되지 않습니다. ${ANTIGENS[a.d].length === 0 ? 'O형 적혈구에는 응집원이 없어 누구에게나 줄 수 있습니다. ' : ''}${ANTIBODIES[a.r].length === 0 ? 'AB형 혈장에는 응집소가 없어 누구의 적혈구든 받을 수 있습니다. ' : ''}응집은 받는 사람의 응집소와 주는 사람의 응집원이 짝이 맞을 때만 일어납니다.`;
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
        checkBtn.textContent = state.mode === 'blood' ? '수혈하기' : '3주 흘려 보기';
        stageCaption.textContent = state.mode === 'infect' ? '보라 점이 병원체, 초록 Y가 항체입니다. 아래 줄의 세포들이 차례로 깨어나며 병원체를 치웁니다.'
            : state.mode === 'vaccine' ? '옅은 점은 백신 항원, 진한 보라 점은 진짜 병원체입니다. 그래프 가운데 점선에서 몇 달을 건너뜁니다.'
                : '왼쪽 주머니의 적혈구가 관을 타고 받는 사람의 혈관으로 들어갑니다. 혈장 속 Y가 응집소입니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { infect: 'first', dose: 'small', shot: 'none', when: 'm1', donor: 'A', recip: 'B', rh: 'same', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'infect').click();
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

    window.__immuneModel = {
        INFECTS, DOSES, SHOTS, WHENS, ABO, RHS, state,
        analyse, render, immuneRun, runSeconds,
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
