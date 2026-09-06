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
    const K = 8.988e9, E0 = 8.854e-12, QE = 1.602e-19, ME = 9.109e-31, MP = 1.673e-27, MA = 6.645e-27, C_LIGHT = 2.998e8;
    // two point charges 0.6 m apart, a +1 nC test charge between them
    const X_CH = 0.3, Q_TEST = 1e-9;
    const LEFTS = { p2: { label: '+2 μC', q: 2 }, n2: { label: '−2 μC', q: -2 } };
    const RIGHTS = { p2: { label: '+2 μC', q: 2 }, p05: { label: '+0.5 μC', q: 0.5 }, n2: { label: '−2 μC', q: -2 } };
    const SPOTS = { mid: { label: '한가운데', hint: '양쪽에서 0.3 m', x: 0 }, right: { label: '오른쪽 전하 가까이', hint: '오른쪽에서 0.15 m', x: 0.15 }, left: { label: '왼쪽 전하 가까이', hint: '왼쪽에서 0.15 m', x: -0.15 } };
    // two plates 2 cm apart
    const D_PLATE = 0.02;
    const VOLTS = { v100: { label: '100 V', V: 100 }, v1k: { label: '1,000 V', V: 1000 }, v10k: { label: '10,000 V', V: 10000 } };
    const PARTS = {
        e: { label: '전자', hint: '−e · 가장 가벼움', q: -QE, m: ME, cls: 'particle-e', sym: 'e⁻' },
        p: { label: '양성자', hint: '+e · 1,836배 무거움', q: QE, m: MP, cls: 'particle-p', sym: 'p⁺' },
        a: { label: '알파 입자', hint: '+2e · 7,300배 무거움', q: 2 * QE, m: MA, cls: 'particle-a', sym: 'α' },
    };
    // a capacitor on a 9 V battery
    const V_BAT = 9;
    const AREAS = { a10: { label: '10 cm × 10 cm', hint: '0.01 m²', A: 0.01, h: 84 }, a20: { label: '20 cm × 20 cm', hint: '0.04 m²', A: 0.04, h: 110 } };
    const GAPS = { g05: { label: '0.5 mm', d: 0.0005, px: 20 }, g1: { label: '1 mm', d: 0.001, px: 40 }, g2: { label: '2 mm', d: 0.002, px: 80 } };
    const DIELS = {
        air: { label: '공기', hint: '유전율 1', er: 1.0006, cls: 'di-air' },
        paper: { label: '종이', hint: '유전율 3.7', er: 3.7, cls: 'di-paper' },
        glass: { label: '유리', hint: '유전율 7', er: 7, cls: 'di-glass' },
        water: { label: '물', hint: '유전율 80', er: 80, cls: 'di-water' },
    };

    const state = { mode: 'field', left: 'p2', right: 'p2', spot: 'mid', volt: 'v1k', part: 'e', area: 'a10', gap: 'g1', diel: 'air', progress: 0, prediction: null };
    let running = false, frameId = 0, lastStamp = 0;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const ease = p => p < 0.5 ? 2 * p * p : 1 - (1 - p) * (1 - p) * 2;
    const fmtN = (n, d = 0) => (+n.toFixed(d)).toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace('-', '−');
    const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    const sup = s => String(s).split('').map(ch => SUP[ch] || ch).join('');
    const fmtSci = (x, d = 1) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); const m = x / 10 ** e; return `${m.toFixed(d)}×10${sup(e)}`; };
    const fmtE = E => { const a = Math.abs(E); return a >= 1e8 ? `${fmtN(a / 1e8, 1)}억 N/C` : a >= 1e4 ? `${fmtN(a / 1e4, a < 1e5 ? 1 : 0)}만 N/C` : `${fmtN(a)} N/C`; };
    const fmtF = F => { const a = Math.abs(F); return a >= 1e-3 ? `${fmtN(a * 1e3, 2)} mN` : `${fmtN(a * 1e6, a < 1e-5 ? 1 : 0)} μN`; };
    const dec = v => v < 10 ? 2 : v < 100 ? 1 : 0;
    const fmtC = C => C < 1e-9 ? `${fmtN(C * 1e12, C < 1e-11 ? 1 : 0)} pF` : C < 1e-6 ? `${fmtN(C * 1e9, dec(C * 1e9))} nF` : `${fmtN(C * 1e6, dec(C * 1e6))} μF`;
    const fmtQ = Q => Q < 1e-9 ? `${fmtN(Q * 1e12)} pC` : Q < 1e-6 ? `${fmtN(Q * 1e9, dec(Q * 1e9))} nC` : `${fmtN(Q * 1e6, dec(Q * 1e6))} μC`;
    const fmtU = U => U < 1e-9 ? `${fmtN(U * 1e12)} pJ` : U < 1e-6 ? `${fmtN(U * 1e9, dec(U * 1e9))} nJ` : `${fmtN(U * 1e6, dec(U * 1e6))} μJ`;
    const jong = ch => { const c = ch.charCodeAt(0); return c >= 0xac00 && c <= 0xd7a3 ? (c - 0xac00) % 28 : 0; };
    const eul = word => jong(word[word.length - 1]) ? '을' : '를';
    const fmtV = v => `초속 ${fmtN(v / 1000)} km`;
    const lastDigit = str => (String(str).match(/\d(?!.*\d)/) || [''])[0];
    const roNum = str => '036'.includes(lastDigit(str)) ? '으로' : '로';

    /* ------------------------------------------------------------ models */
    function fieldOnAxis(x, qL, qR) {
        // signed field along the axis, positive to the right, from both charges (Coulomb, SI)
        const dL = x + X_CH, dR = x - X_CH;
        const eL = K * qL * 1e-6 * Math.sign(dL) / (dL * dL), eR = K * qR * 1e-6 * Math.sign(dR) / (dR * dR);
        return { eL, eR, E: eL + eR };
    }

    function analyse() {
        if (state.mode === 'field') {
            const qL = LEFTS[state.left].q, qR = RIGHTS[state.right].q, x = SPOTS[state.spot].x;
            const f = fieldOnAxis(x, qL, qR);
            const verdict = Math.abs(f.E) < 1 ? 'zero' : f.E > 0 ? 'right' : 'left';
            return { kind: 'field', qL, qR, x, ...f, F: f.E * Q_TEST, verdict };
        }
        if (state.mode === 'accel') {
            const V = VOLTS[state.volt].V, pt = PARTS[state.part];
            const E = V / D_PLATE, F = Math.abs(pt.q) * E, a = F / pt.m;
            const gamma = 1 + Math.abs(pt.q) * V / (pt.m * C_LIGHT * C_LIGHT);
            const v = C_LIGHT * Math.sqrt(1 - 1 / (gamma * gamma)), vClassic = Math.sqrt(2 * Math.abs(pt.q) * V / pt.m);
            const t = Math.sqrt(2 * D_PLATE / a), KE = Math.abs(pt.q) * V, eV = V * Math.round(Math.abs(pt.q) / QE);
            const verdict = v < 1e6 ? 'slow' : v < 1e7 ? 'mid' : 'fast';
            return { kind: 'accel', V, pt, E, F, a, v, vClassic, t, KE, eV, verdict };
        }
        const A = AREAS[state.area].A, d = GAPS[state.gap].d, er = DIELS[state.diel].er;
        const C = E0 * er * A / d, Q = C * V_BAT, E = V_BAT / d, U = 0.5 * C * V_BAT * V_BAT;
        return { kind: 'cap', A, d, er, C, Q, E, U, verdict: C < 100e-12 ? 'small' : C < 1e-9 ? 'mid' : 'big' };
    }
    const runSeconds = () => state.mode === 'field' ? 4 : state.mode === 'accel' ? 5 : 5;

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
        if (state.mode === 'field') controlArea.innerHTML = pickRow('왼쪽 전하', 'left', opts(LEFTS), state.left, 2) + pickRow('오른쪽 전하', 'right', opts(RIGHTS), state.right, 3) + pickRow('+1 nC 시험 전하 자리', 'spot', opts(SPOTS), state.spot, 3);
        else if (state.mode === 'accel') controlArea.innerHTML = pickRow('두 판 사이 전압 (간격 2 cm)', 'volt', opts(VOLTS), state.volt, 3) + pickRow('입자', 'part', opts(PARTS), state.part, 3);
        else controlArea.innerHTML = pickRow('판 넓이', 'area', opts(AREAS), state.area, 2) + pickRow('판 간격', 'gap', opts(GAPS), state.gap, 3) + pickRow('판 사이 물질', 'diel', opts(DIELS), state.diel, 4);
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_F = [{ value: 'left', label: '왼쪽으로 밀림' }, { value: 'zero', label: '힘이 0 (그 자리)' }, { value: 'right', label: '오른쪽으로 밀림' }];
    const PRED_A = [{ value: 'slow', label: '초속 1,000 km 아래' }, { value: 'mid', label: '초속 1,000~10,000 km' }, { value: 'fast', label: '초속 10,000 km 넘게' }];
    const PRED_C = [{ value: 'small', label: '100 pF 아래' }, { value: 'mid', label: '100~1,000 pF' }, { value: 'big', label: '1,000 pF (1 nF) 넘게' }];

    function buildPrediction() {
        const list = state.mode === 'field' ? PRED_F : state.mode === 'accel' ? PRED_A : PRED_C;
        predictionLegend.textContent = state.mode === 'field' ? `왼쪽 ${LEFTS[state.left].label}, 오른쪽 ${RIGHTS[state.right].label} — ${SPOTS[state.spot].label}에 놓은 + 시험 전하는?`
            : state.mode === 'accel' ? `${VOLTS[state.volt].label}로 2 cm 가속한 ${PARTS[state.part].label}의 속력은?`
                : `${AREAS[state.area].label} 판, 간격 ${GAPS[state.gap].label}, 사이에 ${DIELS[state.diel].label} — 전기 용량은?`;
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

    // field lines in picture space: launched outward from + charges, traced backward from − charges
    const S_F = 800 / 3, CX = 230, CY = 113;
    const lineCache = {};
    function fieldLines(qL, qR) {
        const key = `${qL}|${qR}`;
        if (lineCache[key]) return lineCache[key];
        const charges = [{ x: CX - X_CH * S_F, y: CY, q: qL }, { x: CX + X_CH * S_F, y: CY, q: qR }];
        const fieldAt = (x, y) => { let ex = 0, ey = 0; for (const c of charges) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, r = Math.sqrt(r2); if (r < 1) continue; const e = c.q / (r2 * r); ex += e * dx; ey += e * dy; } return [ex, ey]; };
        let out = '';
        charges.forEach((c, ci) => {
            const n = Math.round(6 + 4 * Math.abs(c.q)), sgn = Math.sign(c.q);
            for (let i = 0; i < n; i += 1) {
                const ang = (2 * Math.PI * i) / n + (ci ? Math.PI / n : 0);
                let x = c.x + 12 * Math.cos(ang), y = c.y + 12 * Math.sin(ang);
                let d = `M${x.toFixed(1)},${y.toFixed(1)}`, mid = null;
                for (let s = 0; s < 260; s += 1) {
                    const [ex, ey] = fieldAt(x, y), m = Math.hypot(ex, ey) || 1;
                    const ux = (ex / m) * sgn, uy = (ey / m) * sgn;
                    x += ux * 3; y += uy * 3;
                    if (s === 24) mid = [x, y, ex / m, ey / m];
                    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
                    if (x < 8 || x > 452 || y < 26 || y > 200) break;
                    if (charges.some((o, oi) => oi !== ci && Math.hypot(x - o.x, y - o.y) < 12)) break;
                }
                out += `<path class="field-line" d="${d}"/>`;
                if (mid) out += `<polygon class="field-arrow" points="${(mid[0] + mid[2] * 4).toFixed(1)},${(mid[1] + mid[3] * 4).toFixed(1)} ${(mid[0] - mid[2] * 3 - mid[3] * 3).toFixed(1)},${(mid[1] - mid[3] * 3 + mid[2] * 3).toFixed(1)} ${(mid[0] - mid[2] * 3 + mid[3] * 3).toFixed(1)},${(mid[1] - mid[3] * 3 - mid[2] * 3).toFixed(1)}"/>`;
            }
        });
        lineCache[key] = out;
        return out;
    }

    function renderField(a) {
        const p = state.progress, { qL, qR, x } = a;
        let out = fieldLines(qL, qR);
        out += `<line class="axis-line" x1="20" y1="${CY}" x2="440" y2="${CY}"/>`;
        [[CX - X_CH * S_F, qL, LEFTS[state.left].label], [CX + X_CH * S_F, qR, RIGHTS[state.right].label]].forEach(([cx, q, lab]) => {
            out += `<circle class="${q > 0 ? 'charge-pos' : 'charge-neg'}" cx="${cx.toFixed(1)}" cy="${CY}" r="${(8 + 2 * Math.abs(q)).toFixed(1)}"/><text class="charge-text" x="${cx.toFixed(1)}" y="${CY + 5}" text-anchor="middle">${q > 0 ? '+' : '−'}</text>`;
            out += `<text class="trait-text" x="${cx.toFixed(1)}" y="${CY + 30}" text-anchor="middle">${lab}</text>`;
        });
        const dir = a.verdict === 'zero' ? 0 : Math.sign(a.E);
        const tx0 = CX + x * S_F, room = dir > 0 ? CX + X_CH * S_F - 18 - tx0 : dir < 0 ? tx0 - (CX - X_CH * S_F + 18) : 0;
        const tx = tx0 + dir * Math.min(46, room) * ease(p), ty = CY;
        if (p > 0 && dir) out += `<line class="trail" x1="${tx0.toFixed(1)}" y1="${ty}" x2="${tx.toFixed(1)}" y2="${ty}"/>`;
        out += `<circle class="test-charge" cx="${tx.toFixed(1)}" cy="${ty}" r="5"/><text class="charge-text" style="font-size:12px;font-weight:900;fill:#3a2a00" x="${tx.toFixed(1)}" y="${ty + 3}" text-anchor="middle">+</text>`;
        if (dir) { const L = clamp((Math.abs(a.E) / 2e5) * 40, 10, 60); out += arrow(tx, ty - 14, tx + dir * L, ty - 14, 'force force-e', 'arrow-e'); }
        out += `<text class="small-label" x="${tx0.toFixed(1)}" y="${CY - 22}" text-anchor="middle">시험 전하 ${SPOTS[state.spot].label}</text>`;
        // readouts
        out += `<text class="trait-text" style="fill:#dc2626" x="20" y="40">왼쪽 전하가 만드는 전기장 ${fmtE(a.eL)} ${a.eL > 0 ? '→' : '←'}</text>`;
        out += `<text class="trait-text" style="fill:#0284c7" x="20" y="56">오른쪽 전하가 만드는 전기장 ${fmtE(a.eR)} ${a.eR > 0 ? '→' : '←'}</text>`;
        out += `<text class="trait-text" style="fill:#d97706" x="20" y="72">합친 전기장 ${a.verdict === 'zero' ? '0' : `${fmtE(a.E)} ${a.E > 0 ? '→' : '←'}`} · +1 nC이 받는 힘 ${a.verdict === 'zero' ? '0' : fmtF(a.F)}</text>`;
        const VERD = { left: '왼쪽으로 밀림', zero: '두 전기장이 상쇄되어 힘 0', right: '오른쪽으로 밀림' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${LEFTS[state.left].label} · ${RIGHTS[state.right].label} · ${SPOTS[state.spot].label}: ${VERD[a.verdict]}` : `${LEFTS[state.left].label} · ${RIGHTS[state.right].label} · 시험 전하 ${SPOTS[state.spot].label}`}</text>`;
        out += `<text class="note-text" x="20" y="208">전기장 E = kQ/r² (k = 9.0×10⁹). 선이 빽빽한 곳이 센 곳, + 시험 전하는 화살표 방향으로 힘을 받습니다</text>`;
        return out;
    }

    function graphField(a) {
        const X0 = 56, X1 = 420, Y0 = 150, Y1 = 40, YM = (Y0 + Y1) / 2;
        const xOf = xm => X0 + (xm + 0.6) / 1.2 * (X1 - X0);
        const yOf = E => YM - Math.sign(E) * Math.log10(1 + Math.abs(E) / 1e3) / 3.3 * (YM - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">두 전하를 잇는 축 위의 전기장 — 위가 오른쪽 방향(+), 아래가 왼쪽 방향(−)</text>`;
        [[1e6, '100만'], [1e5, '10만'], [1e4, '1만'], [0, '0'], [-1e4, '−1만'], [-1e5, '−10만'], [-1e6, '−100만']].forEach(([E, lab]) => { const y = yOf(E); out += `<line class="grid-line" x1="${X0}" y1="${y.toFixed(1)}" x2="${X1}" y2="${y.toFixed(1)}"/><text class="axis-text" x="${X0 - 5}" y="${(y + 3.5).toFixed(1)}" text-anchor="end">${lab}</text>`; });
        [-0.6, -0.3, 0, 0.3, 0.6].forEach(xm => { out += `<text class="axis-text" x="${xOf(xm).toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${xm} m</text>`; });
        out += `<line class="axis" x1="${X0}" y1="${YM}" x2="${X1}" y2="${YM}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        [[-X_CH, a.qL], [X_CH, a.qR]].forEach(([xm, q]) => { out += `<line class="ref-line" style="stroke:${q > 0 ? '#dc2626' : '#0284c7'}" x1="${xOf(xm).toFixed(1)}" y1="${Y1}" x2="${xOf(xm).toFixed(1)}" y2="${Y0}"/>`; });
        let d = '', pen = false;
        for (let xm = -0.6; xm <= 0.6 + 1e-9; xm += 0.005) {
            if (Math.abs(xm + X_CH) < 0.02 || Math.abs(xm - X_CH) < 0.02) { pen = false; continue; }
            const E = fieldOnAxis(xm, a.qL, a.qR).E;
            d += `${pen ? 'L' : 'M'}${xOf(xm).toFixed(1)},${yOf(E).toFixed(1)} `; pen = true;
        }
        out += `<path class="trace" style="stroke:#d97706" d="${d}"/>`;
        // zero crossings away from the charges
        const zeros = [];
        for (let xm = -0.6; xm < 0.6; xm += 0.005) {
            if (Math.abs(xm + X_CH) < 0.02 || Math.abs(xm - X_CH) < 0.02 || Math.abs(xm + 0.005 + X_CH) < 0.02 || Math.abs(xm + 0.005 - X_CH) < 0.02) continue;
            const e1 = fieldOnAxis(xm, a.qL, a.qR).E, e2 = fieldOnAxis(xm + 0.005, a.qL, a.qR).E;
            if (e1 === 0 || (e1 < 0) !== (e2 < 0)) zeros.push(+(xm + (e1 === 0 ? 0 : 0.0025)).toFixed(3));
        }
        zeros.forEach(z => { out += `<circle fill="#059669" cx="${xOf(z).toFixed(1)}" cy="${YM}" r="3.5"/>`; });
        out += `<line class="ref-line" style="stroke:#d97706" x1="${xOf(a.x).toFixed(1)}" y1="${Y1}" x2="${xOf(a.x).toFixed(1)}" y2="${Y0}"/><text class="small-label" style="fill:#d97706" x="${xOf(a.x).toFixed(1)}" y="${Y1 - 4}" text-anchor="middle">시험 전하</text>`;
        out += `<text class="small-label" x="${X1}" y="${Y0 + 30}" text-anchor="end">${zeros.length ? `초록 점: 전기장이 0인 곳 (${zeros.map(z => `${z} m`).join(', ')})` : '이 축 위에는 전기장이 0인 곳이 없습니다 (전하 바로 위 제외)'}</text>`;
        return out;
    }

    function renderAccel(a) {
        const p = state.progress, { pt, V } = a, XL = 90, XR = 300, YT = 40, YB = 178;
        const leftPos = pt.q > 0;   // the particle starts by the plate that pushes it away
        let out = `<rect class="plate ${leftPos ? 'plate-pos' : 'plate-neg'}" x="${XL - 8}" y="${YT}" width="8" height="${YB - YT}" rx="2"/><rect class="plate ${leftPos ? 'plate-neg' : 'plate-pos'}" x="${XR}" y="${YT}" width="8" height="${YB - YT}" rx="2"/>`;
        out += `<text class="charge-text" x="${XL - 4}" y="${YT - 6}" text-anchor="middle">${leftPos ? '+' : '−'}</text><text class="charge-text" x="${XR + 4}" y="${YT - 6}" text-anchor="middle">${leftPos ? '−' : '+'}</text>`;
        for (let y = YT + 16; y < YB; y += 26) { out += leftPos ? arrow(XL + 4, y, XR - 4, y, 'uniform-line', 'field-arrow', 3) : arrow(XR - 4, y, XL + 4, y, 'uniform-line', 'field-arrow', 3); }
        const x = XL + 14 + (XR - XL - 28) * p * p;
        out += `<line class="trail" x1="${XL + 14}" y1="${CY}" x2="${x.toFixed(1)}" y2="${CY}"/>`;
        out += `<circle class="${pt.cls}" cx="${x.toFixed(1)}" cy="${CY}" r="${state.part === 'a' ? 8 : state.part === 'p' ? 6 : 4.5}"/><text class="charge-text" style="font-size:12px;font-weight:900" x="${x.toFixed(1)}" y="${CY + 3}" text-anchor="middle">${pt.sym}</text>`;
        const fl = 14 + 30 * p;
        out += arrow(x + 8, CY - 16, x + 8 + fl, CY - 16, 'force force-e', 'arrow-e');
        out += `<text class="small-label" style="fill:#d97706" x="${(x + 8).toFixed(1)}" y="${CY - 22}">힘 →</text>`;
        out += `<text class="small-label" x="${(XL + XR) / 2}" y="${YB + 13}" text-anchor="middle">간격 2 cm · 전압 ${VOLTS[state.volt].label} · 전기장 ${leftPos ? '→' : '←'} ${fmtN(a.E)} V/m</text>`;
        out += `<text class="trait-text" x="${XR + 22}" y="60">${pt.label} ${pt.sym}</text>`;
        out += `<text class="trait-text" x="${XR + 22}" y="78">힘 ${fmtSci(a.F)} N</text>`;
        out += `<text class="trait-text" x="${XR + 22}" y="94">가속도 ${fmtSci(a.a)} m/s²</text>`;
        out += `<text class="trait-text" style="fill:#059669" x="${XR + 22}" y="118">지금 속력</text><text class="gen-text" style="fill:#059669" x="${XR + 22}" y="134">${fmtN(a.v * p / 1000)} km/s</text>`;
        out += `<text class="trait-text" x="${XR + 22}" y="156">걸린 시간 ${fmtN(a.t * 1e9 * p, 2)} ns</text>`;
        out += `<text class="trait-text" x="${XR + 22}" y="172">에너지 ${fmtN(a.eV * p * p)} eV</text>`;
        const VERD = { slow: '초속 1,000 km 아래', mid: '초속 1,000~10,000 km', fast: '초속 10,000 km 넘게' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${pt.label} · ${VOLTS[state.volt].label}: ${fmtV(a.v)}${a.v / C_LIGHT >= 0.01 ? ` (빛의 ${fmtN(a.v / C_LIGHT * 100, 1)} %)` : ''} — ${VERD[a.verdict]}` : `${pt.label} · ${VOLTS[state.volt].label} · 2 cm`}</text>`;
        out += `<text class="note-text" x="20" y="208">전기장 E = V/d, 힘 F = qE, 얻는 운동 에너지 = qV. 음전하는 전기장과 반대쪽으로 힘을 받습니다</text>`;
        return out;
    }

    function graphAccel(a) {
        const X0 = 90, X1 = 420, Y = 46, H = 22;
        const xOf = v => X0 + (Math.log10(Math.max(v / 1000, 10)) - 1) / 5 * (X1 - X0);   // 10 km/s … 1,000,000 km/s
        let out = `<text class="axis-title" x="20" y="18">같은 전압에서 세 입자의 최종 속력 — 운동 에너지는 셋 다 qV로 같습니다 (로그 눈금)</text>`;
        [10, 100, 1000, 1e4, 1e5, 1e6].forEach(v => { const x = xOf(v * 1000); out += `<line class="grid-line" x1="${x.toFixed(1)}" y1="${Y - 8}" x2="${x.toFixed(1)}" y2="${Y + 3 * (H + 8)}"/><text class="axis-text" x="${x.toFixed(1)}" y="${Y + 3 * (H + 8) + 14}" text-anchor="middle">${v >= 1e4 ? `${fmtN(v / 1e4)}만` : fmtN(v)}</text>`; });
        Object.entries(PARTS).forEach(([k, pt], i) => {
            const gamma = 1 + Math.abs(pt.q) * a.V / (pt.m * C_LIGHT * C_LIGHT), v = C_LIGHT * Math.sqrt(1 - 1 / (gamma * gamma));
            const y = Y + i * (H + 8), w = xOf(v) - X0;
            out += `<rect class="${pt.cls}" style="opacity:${k === state.part ? 1 : 0.5}" x="${X0}" y="${y}" width="${w.toFixed(1)}" height="${H}" rx="3"/>`;
            if (k === state.part) out += `<rect class="bar-now" x="${X0}" y="${y}" width="${w.toFixed(1)}" height="${H}" rx="3"/>`;
            out += `<text class="trait-text" x="${X0 - 6}" y="${y + H / 2 + 4}" text-anchor="end">${pt.label}</text>`;
            out += `<text class="trait-text" x="${(X0 + w + 6).toFixed(1)}" y="${y + H / 2 + 4}">${fmtN(v / 1000)} km/s</text>`;
        });
        const xc = xOf(C_LIGHT);
        out += `<line class="ref-line" style="stroke:#ff7a59" x1="${xc.toFixed(1)}" y1="${Y - 8}" x2="${xc.toFixed(1)}" y2="${Y + 3 * (H + 8)}"/><text class="small-label" style="fill:#ff7a59" x="${(xc - 4).toFixed(1)}" y="${Y - 12}" text-anchor="end">빛 30만 km/s</text>`;
        out += `<text class="axis-title" x="${(X0 + X1) / 2}" y="${Y + 3 * (H + 8) + 32}" text-anchor="middle">최종 속력 (km/s)</text>`;
        return out;
    }

    function renderCap(a) {
        const p = state.progress, area = AREAS[state.area], gap = GAPS[state.gap], di = DIELS[state.diel];
        const XL = 200, XR = XL + gap.px, h = area.h, YT = CY - h / 2, YB = CY + h / 2;
        let out = '';
        // battery on the left; one wire from + to the left plate, one from − to the right plate
        out += `<path class="wire" d="M60,${CY - 14} L60,${YT - 18} L${XL + 2},${YT - 18} L${XL + 2},${YT - 10}"/>`;
        out += `<path class="wire" d="M60,${CY + 14} L60,${YB + 30} L${XR + 2},${YB + 30} L${XR + 2},${YB + 10}"/>`;
        out += `<line class="battery-long" x1="46" y1="${CY - 14}" x2="74" y2="${CY - 14}"/><line class="battery-short" x1="52" y1="${CY - 6}" x2="68" y2="${CY - 6}"/><line class="battery-long" x1="46" y1="${CY + 6}" x2="74" y2="${CY + 6}"/><line class="battery-short" x1="52" y1="${CY + 14}" x2="68" y2="${CY + 14}"/>`;
        out += `<text class="small-label" x="88" y="${CY + 4}">전지 9 V</text><text class="charge-text" style="font-size:12.5px;font-weight:900" x="80" y="${CY - 10}">+</text><text class="charge-text" style="font-size:12.5px;font-weight:900" x="80" y="${CY + 18}">−</text>`;
        // the capacitor
        out += `<rect class="dielectric ${di.cls}" x="${XL + 4}" y="${YT}" width="${gap.px - 4}" height="${h}"/>`;
        out += `<rect class="cap-plate" x="${XL}" y="${YT - 10}" width="4" height="${h + 20}"/><rect class="cap-plate" x="${XR}" y="${YT - 10}" width="4" height="${h + 20}"/>`;
        const nQ = clamp(Math.round(6 + 8 * Math.log10(a.Q / 4e-10)), 4, 34), shown = Math.round(nQ * ease(p));
        for (let i = 0; i < shown; i += 1) { const y = YT + 6 + (h - 12) * (i + 0.5) / nQ; out += `<circle class="q-pos" cx="${XL - 4}" cy="${y.toFixed(1)}" r="2.2"/><circle class="q-neg" cx="${XR + 8}" cy="${y.toFixed(1)}" r="2.2"/>`; }
        const nE = clamp(Math.round(a.E / 2250), 2, 12);
        if (p > 0.3) for (let i = 0; i < nE; i += 1) { const y = YT + 8 + (h - 16) * (i + 0.5) / nE; out += arrow(XL + 6, y, XR - 3, y, 'uniform-line', 'field-arrow', 2.5); }
        out += `<text class="small-label" x="${(XL + XR) / 2 + 2}" y="${YB + 22}" text-anchor="middle">${di.label} · ${gap.label}</text>`;
        out += `<text class="small-label" x="${XL - 10}" y="${CY - 22}" text-anchor="end">판 ${area.label}</text>`;
        // readouts
        const RX = 316;
        out += `<text class="trait-text" x="${RX}" y="52">전기 용량 C = ε₀·εr·A/d</text>`;
        out += `<text class="gen-text" style="fill:#d97706" x="${RX}" y="70">${fmtC(a.C)}</text>`;
        out += `<text class="trait-text" x="${RX}" y="92">쌓인 전하 Q = CV</text><text class="gen-text" style="fill:#dc2626" x="${RX}" y="108">${fmtQ(a.Q * ease(p))}</text>`;
        out += `<text class="trait-text" x="${RX}" y="130">판 사이 전기장 V/d</text><text class="trait-text" style="fill:#97dad3" x="${RX}" y="144">${fmtN(a.E)} V/m</text>`;
        out += `<text class="trait-text" x="${RX}" y="166">저장 에너지 ½CV²</text><text class="trait-text" style="fill:#059669" x="${RX}" y="180">${fmtU(a.U * ease(p) * ease(p))}</text>`;
        const VERD = { small: '100 pF 아래', mid: '100~1,000 pF', big: '1 nF 넘게' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${area.label} · ${gap.label} · ${di.label}: ${fmtC(a.C)} — ${VERD[a.verdict]}, 전하 ${fmtQ(a.Q)}` : `${area.label} · ${gap.label} · ${di.label}`}</text>`;
        out += `<text class="note-text" x="20" y="208">ε₀ = 8.85×10⁻¹² F/m. 판이 넓을수록·간격이 좁을수록·유전율이 클수록 같은 전압에서 전하가 더 쌓입니다</text>`;
        return out;
    }

    function graphCap(a) {
        const X0 = 70, X1 = 420, Y = 44, H = 20;
        const xOf = C => X0 + clamp((Math.log10(C) + 11) / 4, 0, 1) * (X1 - X0);   // 10 pF … 100 nF
        let out = `<text class="axis-title" x="20" y="18">같은 판·간격에서 사이 물질만 바꾸면 — 전기 용량은 유전율에 비례 (로그 눈금)</text>`;
        [[1e-11, '10 pF'], [1e-10, '100 pF'], [1e-9, '1 nF'], [1e-8, '10 nF'], [1e-7, '100 nF']].forEach(([C, lab]) => { const x = xOf(C); out += `<line class="grid-line" x1="${x.toFixed(1)}" y1="${Y - 8}" x2="${x.toFixed(1)}" y2="${Y + 4 * (H + 6)}"/><text class="axis-text" x="${x.toFixed(1)}" y="${Y + 4 * (H + 6) + 14}" text-anchor="middle">${lab}</text>`; });
        [[1e-10, '#dc2626'], [1e-9, '#dc2626']].forEach(([C, col]) => { out += `<line class="ref-line" style="stroke:${col}" x1="${xOf(C).toFixed(1)}" y1="${Y - 8}" x2="${xOf(C).toFixed(1)}" y2="${Y + 4 * (H + 6)}"/>`; });
        Object.entries(DIELS).forEach(([k, di], i) => {
            const C = E0 * di.er * a.A / a.d, y = Y + i * (H + 6), w = xOf(C) - X0;
            out += `<rect class="dielectric ${di.cls}" style="opacity:${k === state.diel ? 1 : 0.55}" x="${X0}" y="${y}" width="${w.toFixed(1)}" height="${H}" rx="3"/>`;
            if (k === state.diel) out += `<rect class="bar-now" x="${X0}" y="${y}" width="${w.toFixed(1)}" height="${H}" rx="3"/>`;
            out += `<text class="trait-text" x="${X0 - 6}" y="${y + H / 2 + 4}" text-anchor="end">${di.label} ${di.er >= 2 ? di.er : 1}</text>`;
            out += `<text class="trait-text" x="${(X0 + w + 6).toFixed(1)}" y="${y + H / 2 + 4}">${fmtC(C)}</text>`;
        });
        out += `<text class="small-label" x="20" y="${Y + 4 * (H + 6) + 32}">붉은 점선이 예상 보기의 경계(100 pF, 1 nF)입니다. 넓이를 4배로 하면 4배, 간격을 반으로 하면 2배가 됩니다.</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'field') {
            return `<div class="data-row"><span class="data-name">왼쪽 전하</span><span class="data-val">${LEFTS[state.left].label}, 시험 전하까지 ${(Math.abs(a.x + X_CH)).toFixed(2)} m → E = k·Q/r² = ${fmtE(a.eL)} (${a.eL > 0 ? '오른쪽' : '왼쪽'})</span></div>` +
                `<div class="data-row"><span class="data-name">오른쪽 전하</span><span class="data-val">${RIGHTS[state.right].label}, 시험 전하까지 ${(Math.abs(a.x - X_CH)).toFixed(2)} m → ${fmtE(a.eR)} (${a.eR > 0 ? '오른쪽' : '왼쪽'})</span></div>` +
                `<div class="data-row"><span class="data-name">합</span><span class="data-val">${a.verdict === 'zero' ? '0 — 크기 같고 방향 반대' : `${fmtE(a.E)} (${a.E > 0 ? '오른쪽' : '왼쪽'})`}</span></div>` +
                `<div class="data-row match"><span class="data-name">+1 nC이 받는 힘</span><span class="data-val">${a.verdict === 'zero' ? '0' : `F = qE = ${fmtF(a.F)}, ${a.E > 0 ? '오른쪽' : '왼쪽'}으로`}</span></div>`;
        }
        if (a.kind === 'accel') {
            return `<div class="data-row"><span class="data-name">전기장</span><span class="data-val">E = V/d = ${fmtN(a.V)} V ÷ 0.02 m = ${fmtN(a.E)} V/m</span></div>` +
                `<div class="data-row"><span class="data-name">힘과 가속도</span><span class="data-val">F = qE = ${fmtSci(a.F)} N · a = F/m = ${fmtSci(a.a)} m/s²</span></div>` +
                `<div class="data-row"><span class="data-name">운동 에너지</span><span class="data-val">qV = ${fmtN(a.eV)} eV = ${fmtSci(a.KE, 2)} J (질량과 무관)</span></div>` +
                `<div class="data-row match"><span class="data-name">최종 속력</span><span class="data-val">${fmtV(a.v)} (${fmtSci(a.v, 2)} m/s, 빛의 ${fmtN(a.v / C_LIGHT * 100, a.v / C_LIGHT < 0.01 ? 2 : 1)} %) · 걸린 시간 ${fmtN(a.t * 1e9, 2)} ns</span></div>`;
        }
        return `<div class="data-row"><span class="data-name">전기 용량</span><span class="data-val">C = ε₀·εr·A/d = 8.85×10⁻¹² × ${DIELS[state.diel].er >= 2 ? DIELS[state.diel].er : 1} × ${a.A} ÷ ${a.d} = ${fmtC(a.C)}</span></div>` +
            `<div class="data-row"><span class="data-name">쌓인 전하</span><span class="data-val">Q = CV = ${fmtC(a.C)} × 9 V = ${fmtQ(a.Q)}</span></div>` +
            `<div class="data-row"><span class="data-name">전기장·에너지</span><span class="data-val">E = V/d = ${fmtN(a.E)} V/m · U = ½CV² = ${fmtU(a.U)}</span></div>` +
            `<div class="data-row match"><span class="data-name">판정</span><span class="data-val">${a.verdict === 'small' ? '100 pF 아래' : a.verdict === 'mid' ? '100~1,000 pF' : '1 nF 넘게'}</span></div>`;
    }

    function render() {
        const a = analyse();
        mainGroup.innerHTML = a.kind === 'field' ? renderField(a) : a.kind === 'accel' ? renderAccel(a) : renderCap(a);
        graphGroup.innerHTML = a.kind === 'field' ? graphField(a) : a.kind === 'accel' ? graphAccel(a) : graphCap(a);
        stageBadge.textContent = a.kind === 'field' ? `${LEFTS[state.left].label} · ${RIGHTS[state.right].label} · ${SPOTS[state.spot].label}` : a.kind === 'accel' ? `${PARTS[state.part].label} · ${VOLTS[state.volt].label}` : `${AREAS[state.area].label} · ${GAPS[state.gap].label} · ${DIELS[state.diel].label}`;
        methodHint.textContent = a.kind === 'field' ? '전기장은 + 전하에서 나와 − 전하로 들어가고, 세기는 거리의 제곱에 반비례합니다'
            : a.kind === 'accel' ? '전위차 V를 지난 전하 q는 qV만큼의 운동 에너지를 얻습니다'
                : '전기 용량은 판 넓이에 비례, 간격에 반비례, 유전율에 비례합니다';
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
        if (a.kind === 'field') {
            labelA.textContent = '합친 전기장'; valueA.textContent = a.verdict === 'zero' ? '0' : `${fmtE(a.E)} ${a.E > 0 ? '→' : '←'}`;
            labelB.textContent = '+1 nC이 받는 힘'; valueB.textContent = a.verdict === 'zero' ? '0' : `${fmtF(a.F)} ${a.E > 0 ? '→' : '←'}`;
            const rL = Math.abs(a.x + X_CH), rR = Math.abs(a.x - X_CH);
            s = `왼쪽 ${LEFTS[state.left].label}은 시험 전하에서 ${rL.toFixed(2)} m 떨어져 ${fmtE(a.eL)}의 전기장을 ${a.eL > 0 ? '오른쪽' : '왼쪽'}으로 만들고(${a.qL > 0 ? '+ 전하에서 멀어지는 쪽' : '− 전하로 향하는 쪽'}), 오른쪽 ${RIGHTS[state.right].label}은 ${rR.toFixed(2)} m 떨어져 ${fmtE(a.eR)}을 ${a.eR > 0 ? '오른쪽' : '왼쪽'}으로 만듭니다. `;
            if (a.verdict === 'zero') s += `두 전기장은 크기가 같고 방향이 반대라 화살표를 더하면 0이 되어, 시험 전하는 힘을 받지 않고 그 자리에 머뭅니다. 다만 조금만 한쪽으로 치우쳐도 가까운 전하 쪽 전기장이 이겨 바깥으로 밀려나므로 불안정한 자리입니다.`;
            else s += `${(a.eL > 0) === (a.eR > 0) ? '두 전기장이 같은 쪽을 향해 더해져' : `방향이 반대라 빼면 ${Math.abs(a.eL) > Math.abs(a.eR) ? '왼쪽' : '오른쪽'} 전하 쪽이 이겨`} 합친 전기장은 ${fmtE(a.E)}, ${a.E > 0 ? '오른쪽' : '왼쪽'} 방향입니다. + 시험 전하 1 nC은 F = qE = ${fmtF(a.F)}의 힘을 받아 그쪽으로 밀립니다. 거리가 절반이면 전기장은 네 배가 되므로 가까운 전하가 훨씬 크게 작용합니다.`;
        } else if (a.kind === 'accel') {
            const { pt, V } = a;
            labelA.textContent = '최종 속력'; valueA.textContent = `${fmtV(a.v)} (빛의 ${fmtN(a.v / C_LIGHT * 100, a.v / C_LIGHT < 0.01 ? 2 : 1)} %)`;
            labelB.textContent = '얻은 에너지'; valueB.textContent = `${fmtN(a.eV)} eV`;
            s = `두 판 사이 2 cm에 ${fmtN(V)} V를 걸면 판 사이 전기장은 E = V/d = ${fmtN(a.E)} V/m로 어디서나 같습니다. ${pt.label}(${pt.sym})는 F = qE = ${fmtSci(a.F)} N의 힘을 ${pt.q < 0 ? '전기장과 반대쪽으로' : '전기장 쪽으로'} 받아 a = F/m = ${fmtSci(a.a)} m/s²로 가속되고, ${fmtN(a.t * 1e9, 2)} ns 만에 반대편 판에 닿습니다. `;
            s += `전위차 ${fmtN(V)} V를 지나며 받은 일은 qV = ${fmtN(a.eV)} eV로 질량과 상관없고, 이것이 모두 운동 에너지가 되어 속력은 √(2qV/m) = ${fmtV(a.v)}입니다. `;
            s += state.part === 'e' ? `같은 전압에서 양성자보다 43배 빠른 것은 질량이 1,836분의 1이기 때문입니다.${a.v / C_LIGHT > 0.1 ? ' 빛 속력의 10 %를 넘어 상대성 효과로 실제 속력은 고전 계산보다 조금 작으며, 여기서는 그 값을 썼습니다.' : ''}` : state.part === 'p' ? `전자보다 1,836배 무거워 같은 에너지로도 속력은 43배 느립니다.` : `전하가 두 배라 에너지는 양성자의 두 배지만 질량이 네 배라 속력은 양성자보다 느립니다.`;
        } else {
            const di = DIELS[state.diel];
            labelA.textContent = '전기 용량'; valueA.textContent = fmtC(a.C);
            labelB.textContent = '9 V에서 쌓인 전하'; valueB.textContent = fmtQ(a.Q);
            s = `판 넓이 ${a.A} m², 간격 ${fmtN(a.d * 1000, 1)} mm, 사이에 ${di.label}(유전율 ${di.er >= 2 ? di.er : 1})${eul(di.label)} 넣으면 C = ε₀·εr·A/d = ${fmtC(a.C)}입니다. 9 V 전지에 이으면 Q = CV = ${fmtQ(a.Q)}가 판에 쌓이고, 판 사이 전기장은 9 V ÷ ${fmtN(a.d * 1000, 1)} mm = ${fmtN(a.E)} V/m, 저장된 에너지는 ½CV² = ${fmtU(a.U)}입니다. `;
            s += di.er >= 2 ? `${di.label}의 분자들이 전기장 방향으로 정렬해 판의 전기장을 일부 상쇄하므로, 같은 9 V를 유지하려면 판에 ${di.er}배의 전하가 더 쌓여야 합니다. 그래서 전기 용량이 공기일 때의 ${di.er}배입니다. ` : `공기의 유전율은 1이나 다름없어 진공과 같습니다. `;
            s += a.verdict === 'small' ? '손바닥만 한 판으로는 100 pF도 안 되는 작은 용량이라, 실용 축전기는 얇은 유전체를 겹겹이 말아 만듭니다.' : a.verdict === 'mid' ? '수백 pF은 라디오 동조 회로 같은 데 쓰이는 크기입니다.' : '1 nF을 넘는 용량은 판이 넓거나 유전율이 큰 물질 덕분입니다. 물은 유전율이 80이나 되지만 전기가 조금 통해 실제 축전기에는 쓰지 못합니다.';
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
        checkBtn.textContent = state.mode === 'field' ? '시험 전하 놓기' : state.mode === 'accel' ? '입자 쏘기' : '전지에 잇기';
        stageCaption.textContent = state.mode === 'field' ? '두 전하가 0.6 m 떨어져 있습니다. 옅은 선이 전기력선, 노란 점이 +1 nC 시험 전하이고 노란 화살표가 받는 힘입니다.'
            : state.mode === 'accel' ? '왼쪽 판이 입자를 밀어내는 쪽입니다. 판 사이 화살표는 전기장(+에서 −로), 노란 화살표는 입자가 받는 힘입니다.'
                : '왼쪽 전지가 두 판에 9 V를 겁니다. 판의 점이 쌓인 전하, 판 사이 화살표가 전기장이고 색 칠한 곳이 사이 물질입니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { left: 'p2', right: 'p2', spot: 'mid', volt: 'v1k', part: 'e', area: 'a10', gap: 'g1', diel: 'air', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'field').click();
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

    window.__efieldModel = {
        LEFTS, RIGHTS, SPOTS, VOLTS, PARTS, AREAS, GAPS, DIELS, state,
        analyse, render, fieldOnAxis, runSeconds,
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
