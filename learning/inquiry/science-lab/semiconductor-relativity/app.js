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
    const C = 299792458, KB = 8.617e-5, EG = 1.12, I0_300 = 1e-12, R_SERIES = 100, V_BI = 0.7, TAU = 2.197e-6; // m/s, eV/K, eV, A, Ω, V, s
    const VOLTS = { m2: { label: '−2 V', hint: '역방향', v: -2 }, p03: { label: '+0.3 V', hint: '순방향', v: 0.3 }, p05: { label: '+0.5 V', hint: '순방향', v: 0.5 }, p07: { label: '+0.7 V', hint: '순방향', v: 0.7 }, p2: { label: '+2 V', hint: '순방향', v: 2 } };
    const TEMPS = { t300: { label: '실온 27 ℃', hint: '300 K', T: 300 }, t400: { label: '뜨거움 127 ℃', hint: '400 K', T: 400 } };
    const SPEEDS_M = { b05: { label: '0.5c', hint: 'γ = 1.15', b: 0.5 }, b09: { label: '0.9c', hint: 'γ = 2.29', b: 0.9 }, b099: { label: '0.99c', hint: 'γ = 7.09', b: 0.99 }, b0999: { label: '0.999c', hint: 'γ = 22.4', b: 0.999 } };
    const HEIGHTS = { h5: { label: '5 km', hint: '낮은 구름 높이', d: 5000 }, h10: { label: '10 km', hint: '여객기 높이', d: 10000 }, h20: { label: '20 km', hint: '성층권', d: 20000 } };
    const SPEEDS_E = { e01: { label: '0.1c', hint: 'γ = 1.005', b: 0.1 }, e05: { label: '0.5c', hint: 'γ = 1.15', b: 0.5 }, e09: { label: '0.9c', hint: 'γ = 2.29', b: 0.9 }, e099: { label: '0.99c', hint: 'γ = 7.09', b: 0.99 }, e0999: { label: '0.999c', hint: 'γ = 22.4', b: 0.999 } };
    const BODIES = { electron: { label: '전자', hint: 'mc² = 0.511 MeV', mc2: 0.511e6, unit: 'eV' }, proton: { label: '양성자', hint: 'mc² = 938 MeV', mc2: 938.27e6, unit: 'eV' }, kg: { label: '1 kg 물체', hint: 'mc² = 9 × 10¹⁶ J', mc2: 8.988e16, unit: 'J' } };

    const state = { mode: 'diode', volt: 'p07', temp: 't300', mspeed: 'b099', height: 'h10', espeed: 'e09', body: 'electron', progress: 0, prediction: null };
    let running = false, frameId = 0, lastStamp = 0;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const ease = p => p < 0.5 ? 2 * p * p : 1 - (1 - p) * (1 - p) * 2;
    const fmtN = (n, d = 0) => (+n.toFixed(d)).toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace('-', '−');
    const rnd = i => (((i * 7919 + 13) * 104729) % 100003) / 100003;
    const gamma = b => 1 / Math.sqrt(1 - b * b);
    const ra = v => /[013678]$/.test(String(v)) ? '이라' : '라';
    const cnt = f => f * 1000 < 0.005 ? '0' : fmtN(f * 1000, f < 0.001 ? 2 : 0);
    const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const pow10 = e => { const k = Math.floor(Math.log10(e)), m = e / 10 ** k; return `${fmtN(m, 2)} × 10${String(k).split('').map(ch => SUP[+ch]).join('')} J`; };
    const fmtI = a => { const x = Math.abs(a), s = a < 0 ? '−' : ''; if (x >= 1) return `${s}${fmtN(x, 2)} A`; if (x >= 1e-3) return `${s}${fmtN(x * 1e3, x >= 1e-2 ? 1 : 2)} mA`; if (x >= 1e-6) return `${s}${fmtN(x * 1e6, x >= 1e-5 ? 0 : 1)} μA`; if (x >= 1e-9) return `${s}${fmtN(x * 1e9, x >= 1e-8 ? 0 : 1)} nA`; return `${s}${fmtN(x * 1e12, 1)} pA`; };
    const fmtE = (e, unit) => { if (unit === 'J') return e > 0 ? pow10(e) : '0 J'; return e >= 1e9 ? `${fmtN(e / 1e9, 2)} GeV` : e >= 1e6 ? `${fmtN(e / 1e6, 2)} MeV` : `${fmtN(e / 1e3, 1)} keV`; };

    /* ------------------------------------------------------------ models */
    // Shockley diode with a 100 Ω series resistor; I₀ grows with temperature as T³·exp(−Eg/kT)
    function diodeModel() {
        const Vs = VOLTS[state.volt].v, T = TEMPS[state.temp].T, VT = KB * T, I0 = I0_300 * (T / 300) ** 3 * Math.exp(-EG / KB * (1 / T - 1 / 300));
        const Iof = Vd => I0 * (Math.exp(Vd / VT) - 1);
        let lo = -3, hi = 1.3;
        for (let k = 0; k < 80; k += 1) { const m = (lo + hi) / 2; if (m + R_SERIES * Iof(m) - Vs < 0) lo = m; else hi = m; }
        const Vd = (lo + hi) / 2, I = Iof(Vd), W = Math.max(0.05, Math.sqrt(Math.max(0, 1 - Vd / V_BI))); // depletion width relative to zero bias
        const verdict = Math.abs(I) >= 1e-3 ? 'well' : Math.abs(I) >= 1e-6 ? 'some' : 'none';
        return { kind: 'diode', Vs, T, VT, I0, Iof, Vd, I, W, verdict };
    }
    function muonModel() {
        const b = SPEEDS_M[state.mspeed].b, d = HEIGHTS[state.height].d, g = gamma(b), v = b * C;
        const tGround = d / v, tMuon = tGround / g, fRel = Math.exp(-tMuon / TAU), fNewton = Math.exp(-tGround / TAU);
        return { kind: 'muon', b, d, g, v, tGround, tMuon, fRel, fNewton, reach: v * g * TAU, verdict: fRel < 0.01 ? 'few' : fRel < 0.3 ? 'some' : 'many' };
    }
    function energyModel() {
        const b = SPEEDS_E[state.espeed].b, body = BODIES[state.body], g = gamma(b), L = 100 / g;
        const kRel = (g - 1) * body.mc2, kNewton = 0.5 * b * b * body.mc2, ratio = kRel / kNewton;
        return { kind: 'energy', b, body, g, L, kRel, kNewton, ratio, verdict: ratio < 1.1 ? 'same' : ratio < 2 ? 'bit' : 'much' };
    }
    function analyse() {
        if (state.mode === 'diode') return diodeModel();
        if (state.mode === 'muon') return muonModel();
        return energyModel();
    }
    const runSeconds = () => 5;

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
        if (state.mode === 'diode') controlArea.innerHTML = pickRow('전원 전압 (p쪽 기준)', 'volt', opts(VOLTS), state.volt, 5) + pickRow('다이오드 온도', 'temp', opts(TEMPS), state.temp, 2);
        else if (state.mode === 'muon') controlArea.innerHTML = pickRow('뮤온의 속력', 'mspeed', opts(SPEEDS_M), state.mspeed, 4) + pickRow('뮤온이 생긴 높이', 'height', opts(HEIGHTS), state.height, 3);
        else controlArea.innerHTML = pickRow('속력', 'espeed', opts(SPEEDS_E), state.espeed, 5) + pickRow('물체', 'body', opts(BODIES), state.body, 3);
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_D = [{ value: 'well', label: '잘 흐름 (1 mA 넘게)' }, { value: 'some', label: '조금 흐름 (1 μA ~ 1 mA)' }, { value: 'none', label: '거의 안 흐름 (1 μA 아래)' }];
    const PRED_M = [{ value: 'few', label: '거의 다 붕괴 (1 % 아래)' }, { value: 'some', label: '일부 닿음 (1~30 %)' }, { value: 'many', label: '많이 닿음 (30 % 넘게)' }];
    const PRED_E = [{ value: 'same', label: '거의 같음 (10 % 안)' }, { value: 'bit', label: '조금 큼 (10~100 %)' }, { value: 'much', label: '두 배 넘게' }];

    function buildPrediction() {
        const list = state.mode === 'diode' ? PRED_D : state.mode === 'muon' ? PRED_M : PRED_E;
        predictionLegend.textContent = state.mode === 'diode' ? `${VOLTS[state.volt].label}(${VOLTS[state.volt].hint}), ${TEMPS[state.temp].label}일 때 전류는?`
            : state.mode === 'muon' ? `${HEIGHTS[state.height].label} 위에서 생긴 ${SPEEDS_M[state.mspeed].label}의 뮤온 1,000개 가운데 지표에 닿는 것은?`
                : `${SPEEDS_E[state.espeed].label}로 움직이는 ${BODIES[state.body].label}의 운동 에너지는 ½mv²에 견줘?`;
        predictionArea.className = 'prediction-buttons three';
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    const arrow = (x1, y1, x2, y2, cls, head, w = 3.5) => {
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
        const bx = x2 - ux * 6, by = y2 - uy * 6;
        return `<line class="${cls}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}"/><polygon class="${head}" points="${x2.toFixed(1)},${y2.toFixed(1)} ${(bx - uy * w).toFixed(1)},${(by + ux * w).toFixed(1)} ${(bx + uy * w).toFixed(1)},${(by - ux * w).toFixed(1)}"/>`;
    };

    function renderDiode(a) {
        const p = state.progress, on = p > 0, flow = on ? clamp((Math.log10(Math.max(Math.abs(a.I), 1e-13)) + 7) / 6, 0, 1) : 0; // 0 at 0.1 μA, 1 at 100 mA
        const L = 30, Rr = 190, Tt = 50, Bb = 170, forward = a.Vs > 0;
        let out = '';
        // loop: battery on the left, resistor on top, diode on the right, ammeter at the bottom
        out += `<path class="wire${on ? '' : ' off'}" d="M${L},${Tt + 42} L${L},${Tt} L${L + 60},${Tt} M${L + 100},${Tt} L${Rr},${Tt} L${Rr},${Tt + 40} M${Rr},${Tt + 72} L${Rr},${Bb} L${(L + Rr) / 2 + 14},${Bb} M${(L + Rr) / 2 - 14},${Bb} L${L},${Bb} L${L},${Tt + 78}"/>`;
        // battery: long plate is +; p side (top of the diode) is + when forward
        const plates = forward ? [[Tt + 46, 12], [Tt + 56, 6], [Tt + 66, 12], [Tt + 76, 6]] : [[Tt + 46, 6], [Tt + 56, 12], [Tt + 66, 6], [Tt + 76, 12]];
        plates.forEach(([y, w]) => { out += `<line class="part" x1="${L - w}" y1="${y}" x2="${L + w}" y2="${y}"/>`; });
        out += `<text class="small-label" x="${L + 18}" y="${Tt + 52}">${forward ? '+' : '−'}</text><text class="small-label" x="${L + 18}" y="${Tt + 80}">${forward ? '−' : '+'}</text>`;
        out += `<text class="small-label" x="${L - 22}" y="${Tt + 98}" text-anchor="start">전원 ${VOLTS[state.volt].label}</text>`;
        // resistor zigzag
        let zz = `M${L + 60},${Tt}`; for (let i = 0; i < 8; i += 1) zz += ` L${L + 62.5 + i * 5},${Tt + (i % 2 ? 6 : -6)}`; zz += ` L${L + 100},${Tt}`;
        out += `<path class="part" d="${zz}"/><text class="small-label" x="${L + 80}" y="${Tt - 12}" text-anchor="middle">저항 100 Ω</text>`;
        // diode symbol: triangle points from p (top) to n (bottom)
        out += `<polygon class="diode-tri" points="${Rr - 9},${Tt + 42} ${Rr + 9},${Tt + 42} ${Rr},${Tt + 60}"/><line class="part" x1="${Rr - 9}" y1="${Tt + 60}" x2="${Rr + 9}" y2="${Tt + 60}"/><line class="wire${on ? '' : ' off'}" x1="${Rr}" y1="${Tt + 40}" x2="${Rr}" y2="${Tt + 72}"/>`;
        out += `<text class="small-label" x="${Rr + 13}" y="${Tt + 47}">p</text><text class="small-label" x="${Rr + 13}" y="${Tt + 70}">n</text>`;
        // ammeter
        out += `<circle class="meter" cx="${(L + Rr) / 2}" cy="${Bb}" r="14"/><text class="gen-text" x="${(L + Rr) / 2}" y="${Bb + 4}" text-anchor="middle">A</text>`;
        out += `<text class="trait-text" style="fill:#d97706" x="${(L + Rr) / 2}" y="${Bb + 26}" text-anchor="middle">${on ? fmtI(a.I) : '—'}</text>`;
        // moving charges along the loop when current flows (conventional current, p→n through the diode)
        if (on && flow > 0.02) {
            const path = [[L, Tt + 42], [L, Tt], [Rr, Tt], [Rr, Bb], [L, Bb], [L, Tt + 78]];
            const segs = []; let total = 0; for (let i = 0; i < path.length - 1; i += 1) { const len = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]); segs.push([path[i], path[i + 1], len]); total += len; }
            const n = 14, shift = (p * (0.3 + flow * 1.2) * total) % total, dir = forward ? 1 : -1;
            for (let k = 0; k < n; k += 1) {
                let s = ((k / n) * total + dir * shift) % total; if (s < 0) s += total;
                for (const [a0, a1, len] of segs) { if (s <= len) { const u = s / len; out += `<circle class="charge" opacity="${(0.4 + 0.6 * flow).toFixed(2)}" cx="${(a0[0] + (a1[0] - a0[0]) * u).toFixed(1)}" cy="${(a0[1] + (a1[1] - a0[1]) * u).toFixed(1)}" r="2.2"/>`; break; } s -= len; }
            }
        }
        // junction bar
        const JX = 236, JW = 200, JY = 56, JH = 60, mid = JX + JW / 2, wPx = clamp(14 * a.W * (a.Vs < 0 ? 1 : 1), 3, 60), wDraw = a.Vs < 0 ? clamp(14 * Math.sqrt(1 - a.Vd / V_BI), 3, 60) : wPx;
        out += `<rect class="p-side" x="${JX}" y="${JY}" width="${JW / 2}" height="${JH}"/><rect class="n-side" x="${mid}" y="${JY}" width="${JW / 2}" height="${JH}"/>`;
        out += `<rect class="depl" x="${(mid - wDraw).toFixed(1)}" y="${JY}" width="${(2 * wDraw).toFixed(1)}" height="${JH}"/>`;
        out += `<text class="small-label" x="${JX + 6}" y="${JY - 6}">p형 (양공 ○)</text><text class="small-label" x="${JX + JW - 6}" y="${JY - 6}" text-anchor="end">n형 (전자 ●)</text>`;
        const drift = on && forward ? p * flow * 60 : 0;
        for (let i = 0; i < 26; i += 1) {
            const ux = rnd(i), uy = rnd(i + 100);
            let hx = JX + 6 + ux * (JW / 2 - wDraw - 12) + drift, hy = JY + 8 + uy * (JH - 16);
            if (hx > mid + JW / 2 - 8) hx = JX + 6 + ((hx - JX - 6) % (JW / 2 - wDraw - 12));
            out += `<circle class="hole" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="3"/>`;
            let ex = JX + JW - 6 - ux * (JW / 2 - wDraw - 12) - drift, ey = JY + 8 + rnd(i + 200) * (JH - 16);
            if (ex < JX + 8) ex = JX + JW - 6 - ((JX + JW - 6 - ex) % (JW / 2 - wDraw - 12));
            out += `<circle class="electron" cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="2.6"/>`;
        }
        if (on && forward && flow > 0.02) out += arrow(mid + 40, JY + JH + 10, mid - 40, JY + JH + 10, 'wind', 'wind-head', 3) + `<text class="small-label" x="${mid}" y="${JY + JH + 24}" text-anchor="middle">전자는 n → p, 양공은 p → n</text>`;
        else out += `<text class="small-label" x="${mid}" y="${JY + JH + 24}" text-anchor="middle">${on ? '공핍층이 두꺼워져 운반자가 못 건넘' : '공핍층: 운반자가 없는 띠'}</text>`;
        out += `<text class="trait-text" x="${JX}" y="158">양단 ${on ? `${fmtN(a.Vd, 2)} V` : '—'} · 공핍층 ${on ? `${fmtN(wDraw / 14 * 100)} %` : '100 %'} (0 V일 때 기준)</text>`;
        out += `<text class="trait-text" x="${JX}" y="174">I₀ = ${fmtI(a.I0)} · V_T = kT/q = ${fmtN(a.VT * 1000, 1)} mV (${a.T} K)</text>`;
        out += `<text class="trait-text" style="fill:#d97706" x="${JX}" y="190">${on ? `I = I₀(e^(${fmtN(a.Vd, 2)}/${fmtN(a.VT, 4)}) − 1) = ${fmtI(a.I)}` : '전압을 걸면 쇼클리 식으로 전류가 나옵니다'}</text>`;
        const VERD = { well: '잘 흐름', some: '조금 흐름', none: '거의 안 흐름' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${p >= 1 ? `${VOLTS[state.volt].label} ${VOLTS[state.volt].hint} · ${a.T} K: ${fmtI(a.I)} — ${VERD[a.verdict]}` : `${VOLTS[state.volt].label} ${VOLTS[state.volt].hint} · ${TEMPS[state.temp].label}`}</text>`;
        out += `<text class="note-text" x="20" y="208">규소 다이오드, 실온 I₀ = 1 pA (대략) · 뜨거워지면 I₀ ∝ T³e^(−Eg/kT), Eg = 1.12 eV · 노란 점은 전류의 방향</text>`;
        return out;
    }

    function graphDiode(a) {
        const X0 = 60, X1 = 420, Y0 = 150, Y1 = 40, VA = -2, VB = 1, IM = 20e-3, xOf = v => X0 + (v - VA) / (VB - VA) * (X1 - X0), yOf = i => Y0 - clamp(i, -IM * 0.08, IM) / IM * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">다이오드의 전압–전류 곡선 (쇼클리 식) — 노란 점이 지금의 작동점</text>`;
        [-2, -1, 0, 0.5, 1].forEach(v => { out += `<line class="grid-line" x1="${xOf(v).toFixed(1)}" y1="${Y1}" x2="${xOf(v).toFixed(1)}" y2="${Y0}"/><text class="axis-text" x="${xOf(v).toFixed(1)}" y="${Y0 + 14}" text-anchor="${v === -2 ? 'start' : 'middle'}">${v} V</text>`; });
        [0, 5, 10, 15, 20].forEach(i => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(i * 1e-3).toFixed(1)}" x2="${X1}" y2="${yOf(i * 1e-3).toFixed(1)}"/><text class="axis-text" x="${X0 - 5}" y="${(yOf(i * 1e-3) + 3.5).toFixed(1)}" text-anchor="end">${i} mA</text>`; });
        out += `<line class="axis" x1="${X0}" y1="${yOf(0).toFixed(1)}" x2="${X1}" y2="${yOf(0).toFixed(1)}"/><line class="axis" x1="${xOf(0).toFixed(1)}" y1="${Y1}" x2="${xOf(0).toFixed(1)}" y2="${Y0}"/>`;
        Object.values(TEMPS).forEach(t => {
            const VT = KB * t.T, I0 = I0_300 * (t.T / 300) ** 3 * Math.exp(-EG / KB * (1 / t.T - 1 / 300));
            let d = ''; for (let v = VA; v <= VB + 1e-9; v += 0.01) { const i = I0 * (Math.exp(v / VT) - 1); if (i > IM * 1.05) break; d += `${d ? 'L' : 'M'}${xOf(v).toFixed(1)},${yOf(i).toFixed(1)} `; }
            out += `<path class="trace${t.T === a.T ? '' : ' faint'}" style="stroke:${t.T === 300 ? '#0284c7' : '#dc2626'}" d="${d}"/>`;
        });
        out += `<text class="small-label" style="fill:#0284c7" x="${X0 + 8}" y="${Y1 + 12}">파랑 300 K · 주황 400 K</text>`;
        if (state.progress > 0) out += `<circle fill="#d97706" stroke="#fff" cx="${xOf(clamp(a.Vd, VA, VB)).toFixed(1)}" cy="${yOf(a.I).toFixed(1)}" r="4.5"/><text class="small-label" style="fill:#d97706" x="${(xOf(clamp(a.Vd, VA, VB)) + (a.Vd > 0.4 ? -8 : 8)).toFixed(1)}" y="${(yOf(a.I) - 8).toFixed(1)}" text-anchor="${a.Vd > 0.4 ? 'end' : 'start'}">${fmtN(a.Vd, 2)} V · ${fmtI(a.I)}</text>`;
        out += `<text class="axis-title" x="${(X0 + X1) / 2}" y="${Y0 + 30}" text-anchor="middle">다이오드 양단 전압 — 0.6 V 근처부터 급히 켜지고, 역방향은 pA 수준. 뜨거우면 곡선이 왼쪽으로</text>`;
        return out;
    }

    function renderMuon(a) {
        const p = state.progress, TOP = 40, GND = 176, cols = [[38, 'without', a.fNewton, 1], [246, 'with', a.fRel, a.g]], CW = 150;
        let out = '';
        cols.forEach(([x, kind, f, g]) => {
            out += `<rect class="column" x="${x}" y="${TOP}" width="${CW}" height="${GND - TOP}" rx="4"/><rect class="ground" x="${x}" y="${GND}" width="${CW}" height="8"/><rect class="detector" x="${x + CW / 2 - 22}" y="${GND - 6}" width="44" height="6" rx="2"/>`;
            out += `<text class="small-label" x="${x + CW / 2}" y="${TOP - 6}" text-anchor="middle">${kind === 'without' ? '시간 지연이 없다면' : `시간 지연을 넣으면 (γ = ${fmtN(g, 2)})`}</text>`;
            // 60 muons start at the top; each decays after its own proper lifetime (exponential), stretched by γ in ground time
            const front = TOP + (GND - TOP - 6) * p, alive0 = 60; let alive = 0;
            for (let i = 0; i < alive0; i += 1) {
                const life = -Math.log(1 - rnd(i + (kind === 'with' ? 500 : 0)) * 0.999) * TAU * g, yDeath = TOP + (GND - TOP - 6) * clamp(life / a.tGround, 0, 1);
                const y = Math.min(front, yDeath), dead = front > yDeath + 0.01, xx = x + 10 + rnd(i + 300) * (CW - 20);
                if (!dead) alive += 1;
                out += `<circle class="muon${dead ? ' dead' : ''}" cx="${xx.toFixed(1)}" cy="${y.toFixed(1)}" r="${dead ? 2 : 2.6}"/>`;
            }
            const fNow = Math.exp(-(a.tGround * p) / (TAU * g));
            out += `<text class="trait-text" style="fill:${kind === 'with' ? '#d97706' : '#334155'}" x="${x + 6}" y="${GND - 12}">${cnt(fNow)}개 남음 / 1,000개</text>`;
        });
        // clocks in the middle
        const CX = 215, hand = (cy, frac) => `<line class="clock-hand" x1="${CX}" y1="${cy}" x2="${(CX + 10 * Math.sin(frac * 2 * Math.PI)).toFixed(1)}" y2="${(cy - 10 * Math.cos(frac * 2 * Math.PI)).toFixed(1)}"/>`;
        out += `<circle class="clock" cx="${CX}" cy="76" r="13"/>${hand(76, p * a.tGround / 10e-6)}<text class="small-label" x="${CX}" y="98" text-anchor="middle">지상 시계</text><text class="small-label" x="${CX}" y="110" text-anchor="middle">${fmtN(a.tGround * 1e6 * p, 1)} μs</text>`;
        out += `<circle class="clock" cx="${CX}" cy="136" r="13"/>${hand(136, p * a.tMuon / 10e-6)}<text class="small-label" x="${CX}" y="158" text-anchor="middle">뮤온 시계</text><text class="small-label" x="${CX}" y="170" text-anchor="middle">${fmtN(a.tMuon * 1e6 * p, 2)} μs</text>`;
        out += `<text class="small-label" x="${CX}" y="${TOP - 6}" text-anchor="middle">높이 ${HEIGHTS[state.height].label}</text>`;
        const VERD = { few: '거의 다 붕괴', some: '일부 닿음', many: '많이 닿음' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${p >= 1 ? `${SPEEDS_M[state.mspeed].label} 뮤온, ${HEIGHTS[state.height].label}: 1,000개 중 ${cnt(a.fRel)}개 도착 — ${VERD[a.verdict]}` : `${SPEEDS_M[state.mspeed].label} 뮤온이 ${HEIGHTS[state.height].label}에서 떨어지는 중`}</text>`;
        out += `<text class="note-text" x="20" y="208">정지 수명 2.2 μs · 남는 비율 e^(−t/2.2 μs), 뮤온 시계 t = 지상 시계 ÷ γ · 1963년 실험과 같은 셈</text>`;
        return out;
    }

    function graphMuon(a) {
        const X0 = 60, X1 = 420, Y0 = 150, Y1 = 40, DM = 20000, xOf = d => X0 + d / DM * (X1 - X0), yOf = f => Y0 - clamp(f, 0, 1) * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">높이에 따라 지표에 닿는 뮤온의 비율 — ${SPEEDS_M[state.mspeed].label}일 때, 점선은 시간 지연이 없을 때</text>`;
        [0, 5000, 10000, 15000, 20000].forEach(d => { out += `<line class="grid-line" x1="${xOf(d).toFixed(1)}" y1="${Y1}" x2="${xOf(d).toFixed(1)}" y2="${Y0}"/><text class="axis-text" x="${xOf(d).toFixed(1)}" y="${Y0 + 14}" text-anchor="${d === 0 ? 'start' : 'middle'}">${d / 1000} km</text>`; });
        [0, 0.3, 0.5, 1].forEach(f => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(f).toFixed(1)}" x2="${X1}" y2="${yOf(f).toFixed(1)}"/><text class="axis-text" x="${X0 - 5}" y="${(yOf(f) + 3.5).toFixed(1)}" text-anchor="end">${f * 100} %</text>`; });
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        let dR = '', dN = '';
        for (let d = 0; d <= DM + 1e-9; d += 250) { const t = d / a.v; dR += `${dR ? 'L' : 'M'}${xOf(d).toFixed(1)},${yOf(Math.exp(-t / a.g / TAU)).toFixed(1)} `; dN += `${dN ? 'L' : 'M'}${xOf(d).toFixed(1)},${yOf(Math.exp(-t / TAU)).toFixed(1)} `; }
        out += `<path class="trace faint" style="stroke:#97dad3" d="${dN}"/><path class="trace" style="stroke:#d97706" d="${dR}"/>`;
        const dNow = a.d * state.progress;
        out += `<line class="marker" x1="${xOf(a.d).toFixed(1)}" y1="${Y1}" x2="${xOf(a.d).toFixed(1)}" y2="${Y0}"/>`;
        out += `<circle fill="#d97706" stroke="#fff" cx="${xOf(dNow).toFixed(1)}" cy="${yOf(Math.exp(-dNow / a.v / a.g / TAU)).toFixed(1)}" r="4.5"/>`;
        out += `<text class="small-label" style="fill:#d97706" x="${(xOf(a.d) + (a.d > 15000 ? -6 : 6)).toFixed(1)}" y="${Y1 + 12}" text-anchor="${a.d > 15000 ? 'end' : 'start'}">${HEIGHTS[state.height].label}: ${fmtN(a.fRel * 100, a.fRel < 0.01 ? 2 : 1)} % (없다면 ${a.fNewton < 1e-4 ? '0.00' : fmtN(a.fNewton * 100, 2)} %)</text>`;
        out += `<text class="axis-title" x="${(X0 + X1) / 2}" y="${Y0 + 30}" text-anchor="middle">뮤온이 생긴 높이 — 한 수명 동안 가는 거리 v·γ·2.2 μs = ${fmtN(a.reach / 1000, 2)} km</text>`;
        return out;
    }

    function renderEnergy(a) {
        const p = state.progress, { g, b, body } = a, L0 = 150, L = L0 / g, Y = 62;
        let out = `<text class="small-label" x="20" y="36">정지한 우주선 100 m (점선) · 같은 우주선이 ${SPEEDS_E[state.espeed].label}로 지나갈 때 (파랑)</text>`;
        out += `<rect class="ship-rest" x="20" y="${Y - 14}" width="${L0}" height="28" rx="8"/><text class="small-label" x="${20 + L0 / 2}" y="${Y + 3.5}" text-anchor="middle">100 m</text>`;
        out += `<text class="small-label" style="fill:#0284c7" x="${20 + L0 + 12}" y="${Y + 3.5}">지나갈 때 ${fmtN(100 / g, 1)} m = 100 ÷ ${fmtN(g, 2)} · 높이는 그대로</text>`;
        const sx = 20 + (440 - 20 - L) * ease(p);
        out += `<rect class="ship" x="${sx.toFixed(1)}" y="${Y + 26}" width="${L.toFixed(1)}" height="28" rx="${Math.min(8, L / 2).toFixed(1)}"/>`;
        // energy bars
        const BY = 152, BX = 150, SC = 60, wN = SC, wR = Math.min(270, SC * a.ratio), grow = ease(p);
        out += `<text class="trait-text" x="20" y="${BY - 12}">½mv² (뉴턴)</text><rect class="bar-newton" x="${BX}" y="${BY - 20}" width="${(wN * grow).toFixed(1)}" height="12" rx="2"/><text class="small-label" x="${BX + wN * grow + 6}" y="${BY - 10}">${fmtE(a.kNewton * grow, body.unit)}</text>`;
        out += `<text class="trait-text" x="20" y="${BY + 10}">(γ − 1)mc² (상대론)</text><rect class="bar-rel" x="${BX}" y="${BY + 2}" width="${(wR * grow).toFixed(1)}" height="12" rx="2"/><text class="small-label" style="fill:#dc2626" x="${Math.min(BX + wR * grow + 6, 366).toFixed(1)}" y="${BY + 12}">${fmtE(a.kRel * grow, body.unit)}${wR >= 270 ? ' …' : ''}</text>`;
        out += `<text class="trait-text" x="20" y="${BY + 34}">γ = 1/√(1 − ${b}²) = ${fmtN(g, 3)} · 상대론 ÷ 뉴턴 = ${fmtN(a.ratio, 2)}배 · 정지 에너지 mc² = ${fmtE(body.mc2, body.unit)}</text>`;
        const VERD = { same: '거의 같음', bit: '조금 큼', much: '두 배 넘게' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${p >= 1 ? `${SPEEDS_E[state.espeed].label} ${body.label}: ${fmtN(100 / g, 1)} m · ${fmtE(a.kRel, body.unit)} · 뉴턴 식의 ${fmtN(a.ratio, 1)}배 — ${VERD[a.verdict]}` : `${SPEEDS_E[state.espeed].label} · ${body.label}`}</text>`;
        out += `<text class="note-text" x="20" y="208">길이는 운동 방향만 L = L₀/γ로 줄고 폭은 그대로. 운동 에너지 = (γ − 1)mc², 느릴 때 ½mv²과 같아짐</text>`;
        return out;
    }

    function graphEnergy(a) {
        const X0 = 60, X1 = 420, Y0 = 150, Y1 = 40, KM = 8, xOf = bb => X0 + bb * (X1 - X0), yOf = k => Y0 - clamp(k, 0, KM) / KM * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">속력에 따른 운동 에너지 (mc²의 배수) — 점선 ½mv², 실선 (γ − 1)mc²</text>`;
        [0, 0.2, 0.4, 0.6, 0.8, 1].forEach(bb => { out += `<line class="grid-line" x1="${xOf(bb).toFixed(1)}" y1="${Y1}" x2="${xOf(bb).toFixed(1)}" y2="${Y0}"/><text class="axis-text" x="${xOf(bb).toFixed(1)}" y="${Y0 + 14}" text-anchor="${bb === 0 ? 'start' : 'middle'}">${bb === 1 ? 'c' : `${bb}c`}</text>`; });
        [0, 2, 4, 6, 8].forEach(k => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(k).toFixed(1)}" x2="${X1}" y2="${yOf(k).toFixed(1)}"/><text class="axis-text" x="${X0 - 5}" y="${(yOf(k) + 3.5).toFixed(1)}" text-anchor="end">${k} mc²</text>`; });
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        let dN = '', dR = '';
        for (let bb = 0; bb <= 0.9995; bb += 0.005) { dN += `${dN ? 'L' : 'M'}${xOf(bb).toFixed(1)},${yOf(0.5 * bb * bb).toFixed(1)} `; const k = gamma(bb) - 1; if (k <= KM * 1.02) dR += `${dR ? 'L' : 'M'}${xOf(bb).toFixed(1)},${yOf(k).toFixed(1)} `; }
        out += `<path class="trace faint" style="stroke:#97dad3" d="${dN}"/><path class="trace" style="stroke:#ff7a59" d="${dR}"/>`;
        const kk = a.g - 1;
        out += `<line class="marker" x1="${xOf(a.b).toFixed(1)}" y1="${Y1}" x2="${xOf(a.b).toFixed(1)}" y2="${Y0}"/><circle fill="#d97706" stroke="#fff" cx="${xOf(a.b).toFixed(1)}" cy="${yOf(kk).toFixed(1)}" r="4.5"/><circle fill="#97dad3" stroke="#fff" cx="${xOf(a.b).toFixed(1)}" cy="${yOf(0.5 * a.b * a.b).toFixed(1)}" r="3.5"/>`;
        out += `<text class="small-label" style="fill:#d97706" x="${(xOf(a.b) + (a.b > 0.7 ? -8 : 8)).toFixed(1)}" y="${(clamp(yOf(kk), Y1 + 12, Y0) - 6).toFixed(1)}" text-anchor="${a.b > 0.7 ? 'end' : 'start'}">${SPEEDS_E[state.espeed].label}: ${fmtN(kk, kk < 0.1 ? 3 : 2)} mc² (뉴턴 ${fmtN(0.5 * a.b * a.b, 3)} mc²)</text>`;
        out += `<text class="axis-title" x="${(X0 + X1) / 2}" y="${Y0 + 30}" text-anchor="middle">속력 — 광속에 다가갈수록 에너지가 한없이 치솟아 광속을 넘지 못합니다</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'diode') {
            return `<div class="data-row"><span class="data-name">회로</span><span class="data-val">전원 ${VOLTS[state.volt].label} (${VOLTS[state.volt].hint}) — 저항 100 Ω — 규소 다이오드, ${a.T} K</span></div>` +
                `<div class="data-row"><span class="data-name">쇼클리 식</span><span class="data-val">I₀ = ${fmtI(a.I0)}, V_T = ${fmtN(a.VT * 1000, 1)} mV → 다이오드 양단 ${fmtN(a.Vd, 3)} V에서 I = ${fmtI(a.I)}</span></div>` +
                `<div class="data-row"><span class="data-name">공핍층</span><span class="data-val">0 V일 때에 견줘 ${fmtN(Math.sqrt(Math.max(0, 1 - a.Vd / V_BI)) * 100)} % 두께 (√(1 − V/0.7 V), 대략)</span></div>` +
                `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${{ well: '잘 흐름 (1 mA 넘게)', some: '조금 흐름 (1 μA ~ 1 mA)', none: '거의 안 흐름 (1 μA 아래)' }[a.verdict]}</span></div>`;
        }
        if (a.kind === 'muon') {
            return `<div class="data-row"><span class="data-name">지상에서 잰 시간</span><span class="data-val">${HEIGHTS[state.height].label} ÷ ${SPEEDS_M[state.mspeed].label} = ${fmtN(a.tGround * 1e6, 1)} μs (수명 2.2 μs의 ${fmtN(a.tGround / TAU, 1)}배)</span></div>` +
                `<div class="data-row"><span class="data-name">뮤온의 시간</span><span class="data-val">${fmtN(a.tGround * 1e6, 1)} ÷ γ ${fmtN(a.g, 2)} = ${fmtN(a.tMuon * 1e6, 2)} μs (수명의 ${fmtN(a.tMuon / TAU, 2)}배)</span></div>` +
                `<div class="data-row"><span class="data-name">남는 비율</span><span class="data-val">e^(−${fmtN(a.tMuon / TAU, 2)}) = ${fmtN(a.fRel * 100, a.fRel < 0.01 ? 3 : 1)} % — 시간 지연이 없다면 e^(−${fmtN(a.tGround / TAU, 1)}) = ${a.fNewton < 1e-6 ? '0.0000…' : fmtN(a.fNewton * 100, 4)} %</span></div>` +
                `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${{ few: '거의 다 붕괴 (1 % 아래)', some: '일부 닿음 (1~30 %)', many: '많이 닿음 (30 % 넘게)' }[a.verdict]}</span></div>`;
        }
        return `<div class="data-row"><span class="data-name">γ</span><span class="data-val">1 ÷ √(1 − ${a.b}²) = ${fmtN(a.g, 3)}</span></div>` +
            `<div class="data-row"><span class="data-name">길이</span><span class="data-val">100 m ÷ ${fmtN(a.g, 3)} = ${fmtN(100 / a.g, 1)} m (운동 방향만)</span></div>` +
            `<div class="data-row"><span class="data-name">운동 에너지</span><span class="data-val">(γ − 1)mc² = ${fmtE(a.kRel, a.body.unit)} / ½mv² = ${fmtE(a.kNewton, a.body.unit)} → ${fmtN(a.ratio, 3)}배</span></div>` +
            `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${{ same: '거의 같음 (10 % 안)', bit: '조금 큼 (10~100 %)', much: '두 배 넘게' }[a.verdict]}</span></div>`;
    }

    function render() {
        const a = analyse();
        mainGroup.innerHTML = a.kind === 'diode' ? renderDiode(a) : a.kind === 'muon' ? renderMuon(a) : renderEnergy(a);
        graphGroup.innerHTML = a.kind === 'diode' ? graphDiode(a) : a.kind === 'muon' ? graphMuon(a) : graphEnergy(a);
        stageBadge.textContent = a.kind === 'diode' ? `${VOLTS[state.volt].label} · ${TEMPS[state.temp].label}` : a.kind === 'muon' ? `${SPEEDS_M[state.mspeed].label} · ${HEIGHTS[state.height].label}` : `${SPEEDS_E[state.espeed].label} · ${BODIES[state.body].label}`;
        methodHint.textContent = a.kind === 'diode' ? '순방향 전압은 공핍층을 얇게 해 전류를 흘리고, 역방향은 두껍게 해 막습니다'
            : a.kind === 'muon' ? '움직이는 시계는 γ배 느리게 갑니다. 뮤온의 수명이 그만큼 늘어납니다'
                : '움직이는 물체는 γ분의 1로 짧아지고, 운동 에너지는 (γ − 1)mc²';
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
        if (a.kind === 'diode') {
            labelA.textContent = '전류'; valueA.textContent = fmtI(a.I);
            labelB.textContent = '다이오드 양단'; valueB.textContent = `${fmtN(a.Vd, 2)} V`;
            s = `${a.T} K에서 V_T = kT/q = ${fmtN(a.VT * 1000, 1)} mV이고 새는 전류 I₀는 ${fmtI(a.I0)}입니다. 전원 ${VOLTS[state.volt].label}를 저항 100 Ω과 다이오드에 걸면 다이오드 양단에는 ${fmtN(a.Vd, 2)} V가 걸리고, 쇼클리 식 I = I₀(e^(V/V_T) − 1)로 전류는 ${fmtI(a.I)}입니다. `;
            if (a.Vs < 0) s += `역방향이라 p쪽에 −극이 걸려 양공은 −극으로, 전자는 +극으로 끌려가 접합에서 멀어지고, 공핍층은 0 V일 때의 ${fmtN(a.W * 100)} %로 두꺼워집니다. 경계를 건널 운반자가 없으니 열로 생긴 극소수만 흘러 사실상 끊깁니다.${a.T === 400 ? ' 다만 뜨거우면 열로 생기는 운반자가 늘어 새는 전류가 실온의 십만 배가 됩니다.' : ''}`;
            else if (a.verdict === 'none') s += `순방향이지만 ${fmtN(a.Vd, 2)} V는 규소 접합의 전위 장벽 0.6~0.7 V에 한참 못 미쳐, 장벽을 넘는 전자와 양공이 아주 적습니다. 공핍층은 조금 얇아졌지만 아직 대부분이 남아 전류는 μA도 안 됩니다. 다이오드는 이렇게 "켜지는 전압" 아래에서는 거의 꺼진 것과 같습니다.`;
            else if (a.verdict === 'some') s += `순방향 전압이 켜지는 전압에 가까워져 장벽을 넘는 운반자가 늘고 공핍층은 ${fmtN(a.W * 100)} %로 얇아졌습니다. 전류가 지수 함수로 늘기 시작하는 중간 단계라 μA에서 mA 사이입니다.${a.T === 400 ? ' 뜨거워서 실온보다 훨씬 낮은 전압에서 이만큼 흐릅니다.' : ''}`;
            else s += `순방향 전압이 켜지는 전압을 넘어 공핍층이 거의 사라지고, 전자는 n에서 p로, 양공은 p에서 n으로 경계를 건너 재결합하며 전류가 잘 흐릅니다. 전압을 조금만 더 올려도 전류가 e배씩 뛰므로 실제 회로에서는 100 Ω 같은 저항이 전류를 정해 줍니다. 여기서도 다이오드 양단은 ${fmtN(a.Vd, 2)} V에 머물고 나머지 ${fmtN(a.Vs - a.Vd, 2)} V는 저항이 맡습니다.`;
        } else if (a.kind === 'muon') {
            labelA.textContent = '지표 도착'; valueA.textContent = `1,000개 중 ${cnt(a.fRel)}개`;
            labelB.textContent = '뮤온의 시간'; valueB.textContent = `${fmtN(a.tMuon * 1e6, 2)} μs`;
            s = `${HEIGHTS[state.height].label}를 ${SPEEDS_M[state.mspeed].label}로 내려오는 데 지상 시계로는 ${fmtN(a.tGround * 1e6, 1)} μs가 걸립니다. 수명 2.2 μs의 ${fmtN(a.tGround / TAU, 1)}배라, 시간 지연이 없다면 e^(−${fmtN(a.tGround / TAU, 1)})로 1,000개 중 ${a.fNewton * 1000 < 0.01 ? '0.01개도' : `${fmtN(a.fNewton * 1000, 2)}개만`} 닿아야 합니다. `;
            s += `그러나 γ = ${fmtN(a.g, 2)}${ra(fmtN(a.g, 2))} 뮤온 자신의 시계로는 ${fmtN(a.tMuon * 1e6, 2)} μs밖에 안 흘러, e^(−${fmtN(a.tMuon / TAU, 2)}) = ${fmtN(a.fRel * 100, a.fRel < 0.01 ? 3 : 1)} %, 곧 ${a.fRel * 1000 < 0.005 ? '사실상 0개' : `${cnt(a.fRel)}개`}가 닿습니다. `;
            if (a.verdict === 'many') s += `뮤온이 보기에는 자기 시계는 그대로이고 대기 두께가 ${fmtN(a.d / a.g / 1000, 2)} km로 줄어든 것입니다. 지표에서 뮤온이 1분에 손바닥마다 하나꼴로 검출되는 것이 이 시간 지연의 증거이고, 1963년 프리시와 스미스가 산꼭대기와 해수면에서 세어 확인했습니다.`;
            else if (a.verdict === 'some') s += `일부만 닿지만 시간 지연이 없을 때보다 ${a.fNewton > 0 ? `${fmtN(a.fRel / a.fNewton >= 1e6 ? 1e6 : a.fRel / a.fNewton)}배${a.fRel / a.fNewton >= 1e6 ? ' 넘게' : ''}` : '헤아릴 수 없이'} 많습니다. 속력을 더 높이거나 높이를 낮추면 닿는 비율이 급히 오릅니다.`;
            else s += `이 속력에서는 γ가 작아 수명이 별로 늘지 않고, 뮤온은 몇백 m를 가다 대부분 붕괴합니다. 실제 우주선 뮤온이 지표까지 닿는 것은 그 속력이 0.99c를 넘기 때문입니다.`;
        } else {
            labelA.textContent = '우주선 길이'; valueA.textContent = `${fmtN(100 / a.g, 1)} m`;
            labelB.textContent = '운동 에너지'; valueB.textContent = fmtE(a.kRel, a.body.unit);
            s = `${SPEEDS_E[state.espeed].label}에서 γ = 1/√(1 − ${a.b}²) = ${fmtN(a.g, 3)}입니다. 100 m 우주선은 지나가는 방향으로 100 ÷ ${fmtN(a.g, 3)} = ${fmtN(100 / a.g, 1)} m로 줄어 보이고 높이와 폭은 그대로입니다. ${a.body.label}의 운동 에너지는 (γ − 1)mc² = ${fmtE(a.kRel, a.body.unit)}로, 뉴턴 식 ½mv² = ${fmtE(a.kNewton, a.body.unit)}의 ${fmtN(a.ratio, 2)}배입니다. `;
            if (a.verdict === 'same') s += `광속의 10 %만 해도 γ는 1.005라 두 식의 차이가 1 %도 안 됩니다. 일상의 속력에서 뉴턴 식이 잘 맞는 까닭이고, 길이 수축도 0.5 %뿐이라 알아챌 수 없습니다.`;
            else if (a.verdict === 'bit') s += `광속의 절반쯤부터 두 식이 눈에 띄게 갈라집니다. 뉴턴 식은 속력의 제곱으로만 늘지만 상대론 식은 γ와 함께 더 빨리 늡니다.`;
            else s += `광속에 가까워지면 같은 속력을 내는 데 뉴턴 식보다 몇 배, 몇십 배의 에너지가 들고, 광속에 이르려면 무한한 에너지가 필요합니다. 그래서 가속기는 입자에 에너지를 아무리 넣어도 속력은 광속 바로 아래에서 더 오르지 않고 에너지(질량)만 늡니다.${a.body.unit === 'eV' ? ` ${a.body.label} ${fmtE(a.kRel, a.body.unit)}는 ${a.body.label === '전자' ? '작은 가속기' : '큰 가속기'} 수준입니다.` : ''}`;
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
        checkBtn.textContent = state.mode === 'diode' ? '전압 걸기' : state.mode === 'muon' ? '뮤온 떨어뜨리기' : '우주선 보내기';
        stageCaption.textContent = state.mode === 'diode' ? '왼쪽은 전원·저항·다이오드 회로, 오른쪽은 다이오드 속 p-n 접합입니다. 가운데 점선 띠가 전하 운반자가 없는 공핍층입니다.'
            : state.mode === 'muon' ? '왼쪽은 시간 지연이 없을 때, 오른쪽은 있을 때 같은 뮤온 무리가 떨어지는 모습입니다. 흐려진 점은 붕괴한 뮤온이고, 가운데 두 시계가 지상과 뮤온의 시간입니다.'
                : '위는 정지한 우주선과 지나가는 우주선의 길이, 아래는 뉴턴 식과 상대론 식의 운동 에너지 막대입니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { volt: 'p07', temp: 't300', mspeed: 'b099', height: 'h10', espeed: 'e09', body: 'electron', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'diode').click();
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

    window.__semiModel = {
        VOLTS, TEMPS, SPEEDS_M, HEIGHTS, SPEEDS_E, BODIES, state,
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
