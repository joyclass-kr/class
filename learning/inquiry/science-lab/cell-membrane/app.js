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
    // Diffusion across a porous membrane: the count difference decays as each
    // second a fixed share of it crosses (Fick's law for a thin membrane).
    // Warm water is thinner and its molecules faster, so about 2.5 × the rate.
    const CONCS = {
        '40-0': { label: '왼쪽 40 · 오른쪽 0', L: 40, R: 0 },
        '30-10': { label: '왼쪽 30 · 오른쪽 10', L: 30, R: 10 },
        '20-20': { label: '왼쪽 20 · 오른쪽 20', L: 20, R: 20 },
    };
    const TEMPS = { cold: { label: '5 ℃', hint: '차가운 물', k: 0.04 }, warm: { label: '37 ℃', hint: '몸속 온도', k: 0.10 } };
    const SIM_T = 20;

    // Osmosis: a red cell is 0.29 mol of dissolved particles per litre inside.
    // What matters outside is the particle count, not the grams.
    const SOLUTIONS = {
        water: { label: '맹물', hint: '0 %', osm: 0, made: '녹은 알갱이가 없습니다' },
        salt09: { label: '소금물 0.9 %', hint: '링거액', osm: 0.29, made: '소금 9 g/L = 0.154 mol이 물에서 둘로 갈라져 0.29 mol입니다' },
        sugar09: { label: '설탕물 0.9 %', hint: '무게 %는 소금물과 같음', osm: 0.026, made: '설탕 9 g/L = 0.026 mol입니다 (설탕 알갱이는 소금보다 6배 무겁고 갈라지지 않음)' },
        sugar10: { label: '설탕물 10 %', hint: '', osm: 0.29, made: '설탕 100 g/L = 0.29 mol입니다' },
        glucose5: { label: '포도당 5 %', hint: '병원 수액', osm: 0.28, made: '포도당 50 g/L = 0.28 mol입니다' },
        salt3: { label: '소금물 3 %', hint: '바닷물에 가까움', osm: 0.95, made: '소금 30 g/L = 0.51 mol이 둘로 갈라져 0.95 mol입니다' },
    };
    const C_IN = 0.29, VB = 0.4, BURST = 1.6, TAU = 3, OSM_T = 15;   // inside particles, non-water share, bursting size, seconds

    const state = { mode: 'diffusion', conc: '40-0', temp: 'cold', solution: 'water', progress: 0, prediction: null };
    let running = false, frameId = 0, lastStamp = 0;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const jong = w => { const c = w.charCodeAt(w.length - 1); return c >= 0xac00 && c <= 0xd7a3 ? (c - 0xac00) % 28 : -1; };
    const pEun = w => jong(w) > 0 ? '은' : '는';

    /* ------------------------------------------------------------ models */
    const countsAt = (c, k, t) => { const mean = (c.L + c.R) / 2; const L = mean + (c.L - mean) * Math.exp(-2 * k * t); return { L, R: c.L + c.R - L }; };
    const volumeTarget = osm => VB + (1 - VB) * C_IN / Math.max(osm, 1e-4);
    const volumeAt = (osm, t) => { const target = volumeTarget(osm); return 1 + (target - 1) * (1 - Math.exp(-t / TAU)); };
    const burstTime = osm => { const target = volumeTarget(osm); return target <= BURST ? null : -TAU * Math.log(1 - (BURST - 1) / (target - 1)); };

    function analyse() {
        if (state.mode === 'diffusion') {
            const c = CONCS[state.conc], tmp = TEMPS[state.temp];
            const end = countsAt(c, tmp.k, SIM_T);
            const ratio = end.R > 0 ? end.L / end.R : Infinity;
            return { kind: 'diffusion', c, tmp, end, ratio, verdict: ratio >= 1.4 ? 'far' : ratio >= 1.15 ? 'mid' : 'same' };
        }
        const sol = SOLUTIONS[state.solution];
        const target = volumeTarget(sol.osm), bt = burstTime(sol.osm);
        const vEnd = bt !== null ? BURST : volumeAt(sol.osm, OSM_T);
        return { kind: 'osmosis', sol, target, bt, vEnd, verdict: bt !== null || vEnd >= 1.05 ? 'swell' : vEnd <= 0.95 ? 'shrink' : 'same' };
    }
    const runSeconds = () => 8;

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
        if (state.mode === 'diffusion') {
            controlArea.innerHTML = pickRow('처음 산소 알갱이 수', 'conc', opts(CONCS), state.conc, 3) + pickRow('물의 온도', 'temp', opts(TEMPS), state.temp, 2);
        } else {
            controlArea.innerHTML = pickRow('적혈구를 담글 용액', 'solution', opts(SOLUTIONS), state.solution, 3);
        }
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_DIFF = [{ value: 'far', label: '아직 왼쪽에 훨씬 많다 (1.4배 넘게)' }, { value: 'mid', label: '왼쪽이 조금 더 많다 (1.15~1.4배)' }, { value: 'same', label: '거의 같아졌다' }];
    const PRED_OSM = [{ value: 'swell', label: '부풀어 오른다' }, { value: 'same', label: '거의 그대로' }, { value: 'shrink', label: '쪼그라든다' }];

    function buildPrediction() {
        const list = state.mode === 'diffusion' ? PRED_DIFF : PRED_OSM;
        predictionLegend.textContent = state.mode === 'diffusion' ? `${TEMPS[state.temp].label} 물에서 20초 뒤, 양쪽 알갱이 수는?` : `${SOLUTIONS[state.solution].label}에 넣은 적혈구는?`;
        predictionArea.className = 'prediction-buttons three';
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    function renderDiffusion(a) {
        const t = state.progress * SIM_T;
        const { L, R } = countsAt(a.c, a.tmp.k, t);
        const nL = Math.round(L), nR = a.c.L + a.c.R - nL;
        const LX = 20, RX = 174, W = 150, Y = 40, H = 130, MX = 172;
        let out = `<rect class="chamber" x="${LX}" y="${Y}" width="${W}" height="${H}" rx="4"/><rect class="chamber" x="${RX}" y="${Y}" width="${W}" height="${H}" rx="4"/>`;
        out += `<line class="membrane" x1="${MX}" y1="${Y}" x2="${MX}" y2="${Y + H}"/>`;
        for (let k = 0; k < 6; k += 1) out += `<line class="pore" x1="${MX}" y1="${Y + 14 + k * 21}" x2="${MX}" y2="${Y + 20 + k * 21}"/>`;
        // molecules jiggle about fixed spots; warmer water, bigger jiggle
        const amp = a.tmp.k > 0.06 ? 7 : 4;
        const dot = (x0, i, count) => { for (let n = 0; n < count; n += 1) { const bx = x0 + 12 + ((n * 37) % (W - 24)), by = Y + 12 + ((n * 53) % (H - 24)); const ph = n * 1.7; out += `<circle class="molecule" cx="${(bx + amp * Math.sin(t * (1.3 + (n % 5) * 0.4) + ph)).toFixed(1)}" cy="${(by + amp * Math.cos(t * (1.1 + (n % 7) * 0.3) + ph * 2)).toFixed(1)}" r="3"/>`; } };
        dot(LX, 0, nL); dot(RX, 1, nR);
        out += `<text class="gen-text" x="${LX + W / 2}" y="${Y + H + 16}" text-anchor="middle">왼쪽 ${nL}개</text>`;
        out += `<text class="gen-text" x="${RX + W / 2}" y="${Y + H + 16}" text-anchor="middle">오른쪽 ${nR}개</text>`;
        // facts
        const IX = 340;
        out += `<text class="trait-text" x="${IX}" y="50">물 온도 ${a.tmp.label}</text>`;
        out += `<text class="trait-text" x="${IX}" y="66">1초에 차이의 ${Math.round(a.tmp.k * 100)} %가 건너감</text>`;
        out += `<text class="trait-text" x="${IX}" y="90">지난 시간 ${t.toFixed(1)}초</text>`;
        out += `<text class="trait-text" x="${IX}" y="106">차이 ${Math.max(0, nL - nR)}개</text>`;
        out += `<text class="trait-text" style="fill:#d97706" x="${IX}" y="130">${nR > 0 ? `왼쪽 : 오른쪽 = ${(nL / nR).toFixed(2)} : 1` : '오른쪽은 아직 0개'}</text>`;
        out += `<text class="trait-text" x="${IX}" y="154">${nL > nR ? '진한 쪽 → 옅은 쪽으로' : '양쪽에서 건너는 수가 같음'}</text>`;
        out += `<text class="trait-text" x="${IX}" y="168">${nL > nR ? '더 많이 건너감' : '— 수는 변하지 않음'}</text>`;
        const VERD = { far: '아직 왼쪽에 훨씬 많음', mid: '왼쪽이 조금 더 많음', same: '거의 같아짐' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `20초 뒤 왼쪽 ${Math.round(a.end.L)}개 · 오른쪽 ${Math.round(a.end.R)}개 → ${VERD[a.verdict]}` : `${a.c.label} · ${a.tmp.label} 물`}</text>`;
        out += `<text class="note-text" x="20" y="208">알갱이는 제멋대로 움직여 어느 쪽으로든 건너지만, 많은 쪽에서 건너오는 수가 더 많습니다</text>`;
        return out;
    }

    function graphDiffusion(a) {
        const t = state.progress * SIM_T;
        const X0 = 50, X1 = 430, Y0 = 150, Y1 = 40, NMAX = 40;
        const xOf = tt => X0 + tt / SIM_T * (X1 - X0), yOf = n => Y0 - n / NMAX * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">양쪽 알갱이 수 — 노란 선 왼쪽, 파란 선 오른쪽</text>`;
        for (let n = 0; n <= NMAX; n += 10) { out += `<line class="grid-line" x1="${X0}" y1="${yOf(n).toFixed(1)}" x2="${X1}" y2="${yOf(n).toFixed(1)}"/><text class="axis-text" x="${X0 - 6}" y="${(yOf(n) + 3.5).toFixed(1)}" text-anchor="end">${n}</text>`; }
        for (let tt = 0; tt <= SIM_T; tt += 5) out += `<text class="axis-text" x="${xOf(tt).toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${tt}</text>`;
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        const mean = (a.c.L + a.c.R) / 2;
        out += `<line class="trace dashed" style="stroke:#475569" x1="${X0}" y1="${yOf(mean).toFixed(1)}" x2="${X1}" y2="${yOf(mean).toFixed(1)}"/><text class="small-label" x="${X1}" y="${(yOf(mean) - 4).toFixed(1)}" text-anchor="end">같아지는 값 ${mean}개</text>`;
        let dL = '', dR = '';
        for (let tt = 0; tt <= t + 1e-9; tt += 0.2) { const c = countsAt(a.c, a.tmp.k, tt); dL += `${dL ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(c.L).toFixed(1)} `; dR += `${dR ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(c.R).toFixed(1)} `; }
        out += `<path class="trace" style="stroke:#d97706" d="${dL}"/><path class="trace" style="stroke:#0284c7" d="${dR}"/>`;
        // the other temperature, faintly, for comparison
        const other = TEMPS[state.temp === 'cold' ? 'warm' : 'cold'];
        let dO = ''; for (let tt = 0; tt <= SIM_T; tt += 0.5) dO += `${dO ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(countsAt(a.c, other.k, tt).L).toFixed(1)} `;
        out += `<path class="trace dashed" style="stroke:rgba(217, 119, 6, .45)" d="${dO}"/>`;
        out += `<text class="small-label" x="${X0 + 4}" y="${Y1 - 6}">점선: ${other.label}일 때의 왼쪽</text>`;
        out += `<text class="axis-title" x="${((X0 + X1) / 2).toFixed(1)}" y="${Y0 + 30}" text-anchor="middle">시간 (초) — 차이가 줄수록 건너가는 속도도 줄어듭니다</text>`;
        return out;
    }

    function renderOsmosis(a) {
        const { sol } = a;
        const t = state.progress * OSM_T;
        const burst = a.bt !== null && t >= a.bt;
        const V = burst ? BURST : volumeAt(sol.osm, t);
        const BX = 30, BY = 34, BW = 240, BH = 160, CX = 150, CY = 118;
        let out = `<rect class="solution ${sol.osm > 0.5 ? 'salty' : ''}" x="${BX + 2}" y="${BY + 20}" width="${BW - 4}" height="${BH - 22}" rx="3"/>`;
        out += `<path class="beaker" d="M${BX},${BY} L${BX},${BY + BH} L${BX + BW},${BY + BH} L${BX + BW},${BY}"/>`;
        // dissolved particles, as many as the concentration says
        const nDots = Math.round(sol.osm * 60);
        for (let n = 0; n < nDots; n += 1) { const px = BX + 12 + ((n * 41) % (BW - 24)), py = BY + 30 + ((n * 67) % (BH - 40)); if (Math.hypot(px - CX, py - CY) < 26 * Math.cbrt(V) + 6) continue; out += `<circle class="solute" cx="${px}" cy="${py}" r="2"/>`; }
        // the red cell: a disc that rounds out as it swells and crinkles as it shrinks
        const r = 26 * Math.cbrt(V);
        if (burst) {
            for (let k = 0; k < 8; k += 1) { const ang = k * Math.PI / 4; out += `<line class="burst" x1="${(CX + (r - 6) * Math.cos(ang)).toFixed(1)}" y1="${(CY + (r - 6) * Math.sin(ang) * 0.8).toFixed(1)}" x2="${(CX + (r + 16) * Math.cos(ang)).toFixed(1)}" y2="${(CY + (r + 16) * Math.sin(ang) * 0.8).toFixed(1)}"/>`; }
            out += `<ellipse class="cell-body" cx="${CX}" cy="${CY}" rx="${r.toFixed(1)}" ry="${(r * 0.85).toFixed(1)}" stroke-dasharray="6 5" opacity=".5"/>`;
            out += `<text class="trait-text" style="fill:#dc2626" x="${CX}" y="${CY + 4}" text-anchor="middle">터짐 (용혈)</text>`;
        } else if (V < 0.9) {
            const pts = []; for (let k = 0; k < 24; k += 1) { const ang = k * Math.PI / 12, rr = r * (1 + (k % 2 ? -0.12 : 0.04) * (1 - V) / 0.5); pts.push(`${(CX + rr * Math.cos(ang)).toFixed(1)},${(CY + rr * 0.8 * Math.sin(ang)).toFixed(1)}`); }
            out += `<polygon class="cell-body" points="${pts.join(' ')}"/>`;
        } else {
            const ry = r * clamp(0.55 + 0.45 * (V - 1) / 0.5, 0.55, 1);
            out += `<ellipse class="cell-body" cx="${CX}" cy="${CY}" rx="${r.toFixed(1)}" ry="${ry.toFixed(1)}"/>`;
        }
        // water arrows: in when the outside is thinner, out when it is thicker
        const diff = C_IN - sol.osm;
        if (Math.abs(diff) > 0.03 && !burst) {
            const inward = diff > 0;
            [0.9, 2.0, 3.1, 4.2, 5.3].forEach(ang => {
                const r1 = r + 30, r2 = r + 8;
                const [xa, ya] = [CX + (inward ? r1 : r2) * Math.cos(ang), CY + (inward ? r1 : r2) * Math.sin(ang) * 0.85];
                const [xb, yb] = [CX + (inward ? r2 : r1) * Math.cos(ang), CY + (inward ? r2 : r1) * Math.sin(ang) * 0.85];
                const dx = xb - xa, dy = yb - ya, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
                out += `<line class="water-arrow" x1="${xa.toFixed(1)}" y1="${ya.toFixed(1)}" x2="${(xb - ux * 5).toFixed(1)}" y2="${(yb - uy * 5).toFixed(1)}"/>`;
                out += `<polygon class="water-head" points="${xb.toFixed(1)},${yb.toFixed(1)} ${(xb - ux * 7 - uy * 3.5).toFixed(1)},${(yb - uy * 7 + ux * 3.5).toFixed(1)} ${(xb - ux * 7 + uy * 3.5).toFixed(1)},${(yb - uy * 7 - ux * 3.5).toFixed(1)}"/>`;
            });
        }
        // facts
        const IX = 300;
        out += `<text class="trait-text" x="${IX}" y="50">세포 안: 1 L에 알갱이 ${C_IN} mol</text>`;
        out += `<text class="trait-text" x="${IX}" y="66">${sol.label}: ${sol.osm} mol</text>`;
        out += `<text class="trait-text" style="fill:#0284c7" x="${IX}" y="90">${Math.abs(diff) <= 0.03 ? '물이 드나드는 양이 같음' : diff > 0 ? '물이 세포 안으로 들어옴' : '물이 세포 밖으로 빠져나감'}</text>`;
        out += `<text class="trait-text" x="${IX}" y="114">지난 시간 ${t.toFixed(1)}초</text>`;
        out += `<text class="trait-text" style="fill:#d97706" x="${IX}" y="130">부피 ${V.toFixed(2)}배${burst ? ' — 터짐' : ''}</text>`;
        out += `<text class="trait-text" x="${IX}" y="154">${sol.osm < 0.26 ? '밖이 옅음 (저장액)' : sol.osm > 0.32 ? '밖이 진함 (고장액)' : '안팎이 같음 (등장액)'}</text>`;
        const VERD = { swell: '부풀어 오름', same: '거의 그대로', shrink: '쪼그라듦' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${state.progress >= 1 ? `${sol.label}: 적혈구 부피 ${a.bt !== null ? `${BURST}배에서 터짐` : `${a.vEnd.toFixed(2)}배`} → ${VERD[a.verdict]}` : `적혈구를 ${sol.label}에 넣음`}</text>`;
        out += `<text class="note-text" x="20" y="208">물은 막을 지나지만 녹은 알갱이는 지나지 못해, 물이 알갱이가 진한 쪽으로 옮겨 갑니다</text>`;
        return out;
    }

    function graphOsmosis(a) {
        const t = state.progress * OSM_T;
        const X0 = 50, X1 = 430, Y0 = 150, Y1 = 40, VMIN = 0.4, VMAX = 1.7;
        const xOf = tt => X0 + tt / OSM_T * (X1 - X0), yOf = v => Y0 - (v - VMIN) / (VMAX - VMIN) * (Y0 - Y1);
        let out = `<text class="axis-title" x="${X0}" y="18">적혈구 부피 (처음 = 1) — 굵은 선이 고른 용액</text>`;
        [0.4, 0.7, 1.0, 1.3, 1.6].forEach(v => { out += `<line class="grid-line" x1="${X0}" y1="${yOf(v).toFixed(1)}" x2="${X1}" y2="${yOf(v).toFixed(1)}"/><text class="axis-text" x="${X0 - 6}" y="${(yOf(v) + 3.5).toFixed(1)}" text-anchor="end">${v.toFixed(1)}</text>`; });
        for (let tt = 0; tt <= OSM_T; tt += 5) out += `<text class="axis-text" x="${xOf(tt).toFixed(1)}" y="${Y0 + 14}" text-anchor="middle">${tt}</text>`;
        out += `<line class="axis" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="axis" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
        out += `<line class="trace dashed" style="stroke:#ff7a59" x1="${X0}" y1="${yOf(BURST).toFixed(1)}" x2="${X1}" y2="${yOf(BURST).toFixed(1)}"/><text class="small-label" style="fill:#ff7a59" x="${X1}" y="${(yOf(BURST) - 4).toFixed(1)}" text-anchor="end">${BURST}배에서 터짐</text>`;
        Object.entries(SOLUTIONS).forEach(([k, sol]) => {
            const mine = k === state.solution, bt = burstTime(sol.osm), tEnd = mine ? t : OSM_T;
            let d = '';
            for (let tt = 0; tt <= tEnd + 1e-9; tt += 0.25) { if (bt !== null && tt > bt) break; d += `${d ? 'L' : 'M'}${xOf(tt).toFixed(1)},${yOf(clamp(volumeAt(sol.osm, tt), VMIN, VMAX)).toFixed(1)} `; }
            out += `<path class="trace ${mine ? '' : 'dashed'}" style="stroke:${mine ? '#d97706' : 'rgba(156,182,180,.6)'}" d="${d}"/>`;
        });
        out += `<text class="axis-title" x="${((X0 + X1) / 2).toFixed(1)}" y="${Y0 + 30}" text-anchor="middle">시간 (초) — 점선은 다른 용액들</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'diffusion') {
            return `<div class="data-row"><span class="data-name">처음</span><span class="data-val">${a.c.label} (모두 ${a.c.L + a.c.R}개) · 막의 구멍은 산소 알갱이가 지날 만큼</span></div>` +
                `<div class="data-row"><span class="data-name">온도</span><span class="data-val">${a.tmp.label} — 1초에 양쪽 차이의 ${Math.round(a.tmp.k * 100)} %가 건너감 (37 ℃ 물은 5 ℃보다 덜 끈끈하고 알갱이가 빨라 약 2.5배)</span></div>` +
                `<div class="data-row"><span class="data-name">20초 뒤</span><span class="data-val">왼쪽 ${a.end.L.toFixed(1)}개 · 오른쪽 ${a.end.R.toFixed(1)}개</span></div>` +
                `<div class="data-row match"><span class="data-name">비율</span><span class="data-val">${a.end.R > 0 ? `${a.ratio.toFixed(2)} : 1` : '오른쪽 0'} · 결국 ${(a.c.L + a.c.R) / 2}개씩으로 같아짐</span></div>`;
        }
        const { sol } = a;
        return `<div class="data-row"><span class="data-name">세포 안</span><span class="data-val">1 L에 녹은 알갱이 ${C_IN} mol (물이 아닌 부분 ${Math.round(VB * 100)} %)</span></div>` +
            `<div class="data-row"><span class="data-name">용액</span><span class="data-val">${sol.label} — ${sol.made}</span></div>` +
            `<div class="data-row"><span class="data-name">물의 방향</span><span class="data-val">${Math.abs(C_IN - sol.osm) <= 0.03 ? '드나드는 양이 같음' : C_IN > sol.osm ? '안으로 (밖이 옅음)' : '밖으로 (밖이 진함)'} · 부피는 안팎 알갱이 농도가 같아질 때까지 바뀜</span></div>` +
            `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${a.bt !== null ? `${a.bt.toFixed(1)}초에 ${BURST}배가 되어 터짐` : `${OSM_T}초 뒤 부피 ${a.vEnd.toFixed(2)}배 (끝내 ${a.target.toFixed(2)}배)`}</span></div>`;
    }

    function render() {
        const a = analyse();
        mainGroup.innerHTML = a.kind === 'diffusion' ? renderDiffusion(a) : renderOsmosis(a);
        graphGroup.innerHTML = a.kind === 'diffusion' ? graphDiffusion(a) : graphOsmosis(a);
        stageBadge.textContent = a.kind === 'diffusion' ? `${a.c.label} · ${a.tmp.label}` : `적혈구 · ${a.sol.label}`;
        methodHint.textContent = a.kind === 'diffusion' ? '알갱이는 제멋대로 움직이지만, 많은 쪽에서 적은 쪽으로 더 많이 건너갑니다'
            : '물은 녹은 알갱이가 진한 쪽으로 옮겨 갑니다 — 알갱이의 종류가 아니라 수가 중요합니다';
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
        if (a.kind === 'diffusion') {
            labelA.textContent = '20초 뒤 왼쪽 : 오른쪽'; valueA.textContent = `${Math.round(a.end.L)} : ${Math.round(a.end.R)}개`;
            labelB.textContent = '비율'; valueB.textContent = a.end.R > 0 ? `${a.ratio.toFixed(2)}배` : '오른쪽 0';
            s = `${a.c.label}으로 시작해 ${a.tmp.label} 물에서 20초가 지나자 왼쪽 ${Math.round(a.end.L)}개, 오른쪽 ${Math.round(a.end.R)}개가 되었습니다. `;
            if (a.c.L === a.c.R) s += `처음부터 양쪽이 같아 수는 변하지 않았습니다. 그래도 알갱이는 제멋대로 움직여 계속 막을 건너는데, 양쪽에서 건너는 수가 같아 수가 그대로인 것입니다. `;
            else s += `알갱이는 저마다 아무 방향으로나 움직이지만, 진한 왼쪽에는 알갱이가 많아 막을 건너는 수도 많고 옅은 오른쪽에서 건너오는 수는 적어, 전체로는 왼쪽에서 오른쪽으로 옮겨 갑니다. 차이가 줄면 건너가는 속도도 줄어, 결국 ${(a.c.L + a.c.R) / 2}개씩으로 같아지고 그 뒤에는 오가는 수가 서로 같아 더 변하지 않습니다. `;
            s += a.tmp.k > 0.06 ? `37 ℃에서는 알갱이가 빨리 움직이고 물이 덜 끈끈해 5 ℃보다 약 2.5배 빨리 섞였습니다. ` : `5 ℃에서는 알갱이가 느리고 물이 끈끈해 37 ℃보다 2.5배쯤 느리게 섞입니다. `;
            s += `허파에서 산소가 피로, 이산화 탄소가 피에서 허파로 옮겨 가는 것도 이런 확산입니다.`;
        } else {
            const { sol } = a;
            labelA.textContent = '밖의 알갱이 농도'; valueA.textContent = `${sol.osm} mol/L (안 ${C_IN})`;
            labelB.textContent = '적혈구 부피'; valueB.textContent = a.bt !== null ? `${BURST}배에서 터짐` : `${a.vEnd.toFixed(2)}배`;
            s = `적혈구 안에는 1 L에 녹은 알갱이가 ${C_IN} mol 있고, ${sol.label}${pEun(sol.label)} ${sol.made}. `;
            if (a.verdict === 'swell') s += `밖이 안보다 옅어서 물이 세포 안으로 들어와 부풀었고, 벽이 없는 적혈구는 ${BURST}배에서 터졌습니다(용혈). `;
            else if (a.verdict === 'shrink') s += `밖이 안보다 진해서 물이 세포 밖으로 빠져나가 부피가 ${a.vEnd.toFixed(2)}배로 쪼그라들고 가장자리가 쭈글쭈글해졌습니다. `;
            else s += `안팎의 알갱이 수가 같아 드나드는 물이 같고, 적혈구는 그대로입니다. `;
            if (state.solution === 'sugar09') s += `소금물 0.9 %와 무게 비율은 같지만, 설탕 알갱이는 소금보다 6배 무겁고 물에서 갈라지지도 않아 알갱이 수가 11분의 1밖에 되지 않습니다. 삼투를 정하는 것은 그램이 아니라 알갱이 수입니다. `;
            else if (state.solution === 'sugar10' || state.solution === 'glucose5') s += `무게 비율은 소금물 0.9 %보다 훨씬 높지만 알갱이 하나가 무거워 알갱이 수는 같습니다. 그래서 병원 수액에는 소금물 0.9 %도, 포도당 5 %도 쓸 수 있습니다. `;
            else if (state.solution === 'salt09') s += `그래서 병원에서 혈관에 넣는 링거액은 0.9 % 소금물로 맞춥니다. `;
            else if (state.solution === 'salt3') s += `바닷물을 마시면 오히려 몸에서 물이 빠져나가는 것도 같은 까닭입니다. `;
            else s += `물은 막을 지나지만 녹은 알갱이는 지나지 못하므로, 물이 진한 쪽으로 옮겨 가는 것입니다. `;
            s += `세포막은 물과 작은 기체는 지나게 하고 녹은 알갱이는 골라서 막기 때문에, 안팎의 알갱이 수가 다르면 알갱이 대신 물이 움직입니다.`;
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
        checkBtn.textContent = state.mode === 'diffusion' ? '20초 흘려 보기' : '15초 흘려 보기';
        stageCaption.textContent = state.mode === 'diffusion' ? '가운데 노란 막에는 작은 구멍이 있어 산소 알갱이가 어느 쪽으로든 지나갈 수 있습니다.'
            : '비커의 흰 점은 녹은 알갱이입니다. 물(파란 화살표)만 세포막을 지나고, 알갱이는 지나지 못합니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { conc: '40-0', temp: 'cold', solution: 'water', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'diffusion').click();
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

    window.__membraneModel = {
        CONCS, TEMPS, SOLUTIONS, C_IN, VB, BURST, state,
        analyse, render, countsAt, volumeAt, volumeTarget, burstTime,
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
