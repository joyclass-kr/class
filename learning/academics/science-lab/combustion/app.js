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

    const O2_START = 21, O2_FLOOR = 16;   // a candle goes out near 16 % oxygen
    const O2_RATE = 4;                    // mL of oxygen burned each second
    const GRAPH = { x0: 62, x1: 424, y0: 152, y1: 26 };

    const batchim = w => {
        const c = w.charCodeAt(w.length - 1);
        return c >= 0xAC00 && c <= 0xD7A3 ? (c - 0xAC00) % 28 !== 0 : false;
    };
    const eun = w => w + (batchim(w) ? '은' : '는');
    const iga = w => w + (batchim(w) ? '이' : '가');

    const FUELS = {
        none: { label: '없음', hint: '탈 물질 없음', ignite: null },
        candle: { label: '양초', hint: '발화점 190 ℃', ignite: 190 },
        paper: { label: '종이', hint: '발화점 450 ℃', ignite: 450 },
    };
    // Iron gains oxygen; wood loses its carbon and hydrogen as gas.
    const MATERIALS = {
        steel: { label: '강철솜', hint: '철 + 산소', eq: '4Fe + 3O₂ → 2Fe₂O₃',
                 oxygenPerGram: 48 / 111.7, ashFrac: 1, burnsAway: false },
        wood: { label: '나무', hint: '탄소·수소가 기체로', eq: 'C₆H₁₀O₅ + 6O₂ → 6CO₂ + 5H₂O',
                oxygenPerCombustible: 192 / 162.14, ashFrac: 0.03, burnsAway: true },
    };

    const state = {
        mode: 'burn',
        fuel: 'candle', temp: 300, oxygen: 'open', jar: 500,
        material: 'steel', vessel: 'open', mass: 5,
        progress: 0, prediction: null,
    };
    let running = false, frameId = 0, lastStamp = 0;

    /* ------------------------------------------------------------ models */
    function analyseBurn(s = state) {
        const fuel = FUELS[s.fuel];
        const hasFuel = fuel.ignite !== null;
        const hotEnough = hasFuel && s.temp >= fuel.ignite;
        let outcome, missing;
        if (!hasFuel) { outcome = 'none'; missing = 'fuel'; }
        else if (!hotEnough) { outcome = 'none'; missing = 'heat'; }
        else if (s.oxygen === 'closed') { outcome = 'out'; missing = 'oxygen'; }
        else { outcome = 'burn'; missing = null; }
        // How long the trapped oxygen lasts: the usable share above the floor,
        // divided by how fast the flame eats it.
        const outTime = ((O2_START - O2_FLOOR) / 100) * s.jar / O2_RATE;
        const runFor = outcome === 'out' ? outTime : outcome === 'burn' ? 8 : 3;
        return { kind: 'burn', fuel, hasFuel, hotEnough, outcome, missing, outTime, runFor };
    }

    function o2At(t, a, s = state) {
        if (s.oxygen === 'open' || a.outcome === 'none') return O2_START;
        return Math.max(O2_FLOOR, O2_START - ((O2_RATE * t) / s.jar) * 100);
    }

    function analyseOxide(s = state) {
        const mat = MATERIALS[s.material];
        const m = s.mass;
        let oxygenTotal, solidEnd, gasEnd, combustible;
        if (mat.burnsAway) {
            combustible = m * (1 - mat.ashFrac);
            oxygenTotal = combustible * mat.oxygenPerCombustible;
            solidEnd = m - combustible;
            gasEnd = combustible + oxygenTotal;   // conservation, by construction
        } else {
            combustible = 0;
            oxygenTotal = m * mat.oxygenPerGram;
            solidEnd = m + oxygenTotal;
            gasEnd = 0;
        }
        const totalBefore = m + oxygenTotal;
        const totalAfter = solidEnd + gasEnd;
        const verdict = s.vessel === 'sealed' ? 'same' : mat.burnsAway ? 'down' : 'up';
        return { kind: 'oxide', mat, m, combustible, oxygenTotal, solidEnd, gasEnd, totalBefore, totalAfter, verdict, runFor: 6 };
    }

    function stepOxide(p, a) {
        const oxygen = a.oxygenTotal * p;
        const solid = a.mat.burnsAway ? a.m - a.combustible * p : a.m + oxygen;
        const gas = a.mat.burnsAway ? (a.combustible + a.oxygenTotal) * p : 0;
        const measured = state.vessel === 'sealed' ? a.totalBefore : solid;
        return { oxygen, solid, gas, measured };
    }

    const analyse = () => (state.mode === 'burn' ? analyseBurn() : analyseOxide());
    const runSeconds = () => analyse().runFor;

    /* ---------------------------------------------------------- controls */
    function pickRow(legend, name, options, current, cols) {
        return `<fieldset class="pick-field"><legend>${legend}</legend>` +
            `<div class="pick-buttons cols${cols}" data-pick="${name}">` +
            options.map(o => `<button type="button" data-value="${o.value}" class="${o.value === String(current) ? 'selected' : ''}">` +
                `${o.label}${o.hint ? `<small>${o.hint}</small>` : ''}</button>`).join('') +
            `</div></fieldset>`;
    }

    function sliderRow(id, legend, min, max, step, value, scale) {
        return `<div class="range-heading"><label for="${id}">${legend}</label>` +
            `<output id="${id}Out" for="${id}"></output></div>` +
            `<input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">` +
            `<div class="range-scale" aria-hidden="true">${scale.map(s => `<span>${s}</span>`).join('')}</div>`;
    }

    function buildControls() {
        if (state.mode === 'burn') {
            controlArea.innerHTML =
                pickRow('탈 물질', 'fuel', Object.entries(FUELS).map(([k, v]) => ({ value: k, label: v.label, hint: v.hint })), state.fuel, 3) +
                sliderRow('tempRange', '가열 온도', 0, 500, 10, state.temp, ['0℃', '250℃', '500℃']) +
                pickRow('산소', 'oxygen', [{ value: 'open', label: '열어 둠', hint: '공기가 계속 들어옴' },
                                          { value: 'closed', label: '유리병으로 덮음', hint: '산소가 갇힘' }], state.oxygen, 2) +
                sliderRow('jarRange', '덮은 유리병의 크기', 250, 1000, 250, state.jar, ['250mL', '625mL', '1000mL']);
        } else {
            controlArea.innerHTML =
                pickRow('태울 물질', 'material', Object.entries(MATERIALS).map(([k, v]) => ({ value: k, label: v.label, hint: v.hint })), state.material, 2) +
                pickRow('용기', 'vessel', [{ value: 'open', label: '열린 그릇', hint: '기체가 드나듦' },
                                          { value: 'sealed', label: '밀폐 용기', hint: '기체가 갇힘' }], state.vessel, 2) +
                sliderRow('massRange', '처음 질량', 1, 10, 1, state.mass, ['1g', '5g', '10g']);
        }
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                settingsChanged();
            }));
        });
        ['tempRange', 'jarRange', 'massRange'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', () => {
                if (id === 'tempRange') state.temp = Number(el.value);
                if (id === 'jarRange') state.jar = Number(el.value);
                if (id === 'massRange') state.mass = Number(el.value);
                settingsChanged();
            });
        });
    }

    const PRED_BURN = [{ value: 'burn', label: '계속 탄다' }, { value: 'out', label: '타다가 꺼진다' }, { value: 'none', label: '불이 붙지 않는다' }];
    const PRED_OXIDE = [{ value: 'up', label: '늘어난다' }, { value: 'same', label: '그대로다' }, { value: 'down', label: '줄어든다' }];

    function buildPrediction() {
        const list = state.mode === 'burn' ? PRED_BURN : PRED_OXIDE;
        predictionLegend.textContent = state.mode === 'burn' ? '불은 어떻게 될까요?' : '저울에 재는 질량은 어떻게 될까요?';
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    function flame(cx, baseY, s, dim = 1) {
        if (s <= 0.02) return '';
        return `<path class="flame" opacity="${dim.toFixed(2)}" d="M${cx},${baseY} C${(cx - 9 * s).toFixed(1)},${(baseY - 6 * s).toFixed(1)} ` +
               `${(cx - 7 * s).toFixed(1)},${(baseY - 20 * s).toFixed(1)} ${cx},${(baseY - 29 * s).toFixed(1)} ` +
               `C${(cx + 7 * s).toFixed(1)},${(baseY - 20 * s).toFixed(1)} ${(cx + 9 * s).toFixed(1)},${(baseY - 6 * s).toFixed(1)} ${cx},${baseY} Z"/>` +
               `<path class="flame inner" opacity="${dim.toFixed(2)}" d="M${cx},${baseY} C${(cx - 4 * s).toFixed(1)},${(baseY - 4 * s).toFixed(1)} ` +
               `${(cx - 3 * s).toFixed(1)},${(baseY - 11 * s).toFixed(1)} ${cx},${(baseY - 16 * s).toFixed(1)} ` +
               `C${(cx + 3 * s).toFixed(1)},${(baseY - 11 * s).toFixed(1)} ${(cx + 4 * s).toFixed(1)},${(baseY - 4 * s).toFixed(1)} ${cx},${baseY} Z"/>`;
    }

    function renderBurn(a, p) {
        const t = p * a.runFor;
        const o2 = o2At(t, a);
        const STAND_Y = 178, CX = 200;
        let out = '';

        // thermometer, with the fuel's ignition point marked on it
        const TX = 44, TOP = 56, BOT = 172;
        out += `<rect class="therm-tube" x="${TX}" y="${TOP}" width="9" height="${BOT - TOP}" rx="4.5"/>`;
        const tf = Math.min(1, state.temp / 500);
        out += `<rect class="therm-fill" x="${TX + 2}" y="${(BOT - 4 - (BOT - TOP - 8) * tf).toFixed(1)}" width="5" height="${((BOT - TOP - 8) * tf + 4).toFixed(1)}" rx="2.5"/>`;
        // below the bulb, so the ignition-point label can never land on it
        out += `<text class="read-text" x="${TX + 4}" y="190" text-anchor="middle">${state.temp} ℃</text>`;
        if (a.hasFuel) {
            const iy = BOT - 4 - (BOT - TOP - 8) * (a.fuel.ignite / 500);
            out += `<line class="ignite-line" x1="${TX - 8}" y1="${iy.toFixed(1)}" x2="${TX + 74}" y2="${iy.toFixed(1)}"/>`;
            out += `<text class="ignite-text" x="${TX + 15}" y="${(iy - 4).toFixed(1)}">발화점 ${a.fuel.ignite} ℃</text>`;
        }

        // the burning thing on its stand
        out += `<rect class="stand" x="${CX - 50}" y="${STAND_Y}" width="100" height="8" rx="2"/>`;
        let flameBase = STAND_Y;
        const burning = (a.outcome === 'burn') || (a.outcome === 'out' && o2 > O2_FLOOR + 0.001);
        if (state.fuel === 'candle') {
            const used = a.outcome === 'none' ? 0 : 14 * p;
            const top = 128 + used;
            out += `<rect class="candle" x="${CX - 9}" y="${top.toFixed(1)}" width="18" height="${(STAND_Y - top).toFixed(1)}" rx="2"/>`;
            out += `<line class="wick" x1="${CX}" y1="${top.toFixed(1)}" x2="${CX}" y2="${(top - 7).toFixed(1)}"/>`;
            flameBase = top - 6;
        } else if (state.fuel === 'paper') {
            const left = a.outcome === 'none' ? 1 : 1 - 0.75 * p;
            out += `<rect class="paper" x="${(CX - 24 * left).toFixed(1)}" y="158" width="${(48 * left).toFixed(1)}" height="20" rx="2"/>`;
            flameBase = 156;
        } else {
            out += `<text class="small-label" x="${CX}" y="${STAND_Y - 8}" text-anchor="middle">탈 물질이 없습니다</text>`;
        }

        if (burning && a.hasFuel) {
            // the flame shrinks as the trapped oxygen runs low
            const strength = state.oxygen === 'closed' ? 0.4 + 0.6 * ((o2 - O2_FLOOR) / (O2_START - O2_FLOOR)) : 1;
            out += flame(CX, flameBase, strength);
        } else if (a.outcome === 'out' && p > 0) {
            for (let i = 0; i < 3; i += 1) {
                out += `<path class="smoke" d="M${CX + i * 4 - 4},${flameBase - i * 9} q6,-7 0,-13"/>`;
            }
        }

        // the jar that traps the air
        if (state.oxygen === 'closed') {
            const half = 34 + (state.jar - 250) / 250 * 8;
            out += `<path class="glass" d="M${CX - half},${STAND_Y + 2} L${CX - half},${76} Q${CX - half},${64} ${CX - half + 12},${64} ` +
                   `L${CX + half - 12},${64} Q${CX + half},${64} ${CX + half},${76} L${CX + half},${STAND_Y + 2}"/>`;
            out += `<text class="part-label" x="${CX}" y="56" text-anchor="middle">${state.jar} mL 유리병</text>`;
        }

        out += `<text class="part-label" x="300" y="86">산소 농도</text>`;
        out += `<text class="read-text" x="300" y="106">${o2.toFixed(1)} %</text>`;
        out += `<text class="note-text" x="300" y="124">꺼지는 농도 ${O2_FLOOR} %</text>`;
        out += `<text class="part-label" x="300" y="148">지난 시간</text>`;
        out += `<text class="note-text" x="300" y="164">${t.toFixed(1)} 초</text>`;
        return out;
    }

    function renderOxide(a, p) {
        const st = stepOxide(p, a);
        const CX = 214, PAN_Y = 150;
        let out = '';

        // the sample on the pan, changing as it burns
        if (state.material === 'steel') {
            const burnt = p > 0.05;
            for (let i = 0; i < 7; i += 1) {
                const x = CX - 30 + i * 10;
                out += `<path class="steel${burnt ? ' burnt' : ''}" d="M${x},${PAN_Y - 2} q6,-12 -2,-20 q-6,-8 4,-14"/>`;
            }
            if (p > 0 && p < 1) out += flame(CX, PAN_Y - 34, 0.7);
        } else {
            const left = 1 - 0.9 * p;
            out += `<rect class="wood${p > 0.6 ? ' ash' : ''}" x="${(CX - 26 * left).toFixed(1)}" y="${(PAN_Y - 22 * left).toFixed(1)}" ` +
                   `width="${(52 * left).toFixed(1)}" height="${(22 * left).toFixed(1)}" rx="3"/>`;
            if (p > 0 && p < 1) out += flame(CX, PAN_Y - 22 * left, 0.8);
        }

        // gases moving in or out, or trapped
        if (state.vessel === 'sealed') {
            out += `<path class="glass" d="M${CX - 62},${PAN_Y + 2} L${CX - 62},86 Q${CX - 62},74 ${CX - 50},74 L${CX + 50},74 Q${CX + 62},74 ${CX + 62},86 L${CX + 62},${PAN_Y + 2} Z"/>`;
            out += `<text class="small-label" x="${CX}" y="68" text-anchor="middle">밀폐 — 기체가 나가지 못합니다</text>`;
            if (p > 0.05) {
                for (let i = 0; i < 4; i += 1) {
                    const x = CX - 40 + i * 26;
                    out += `<circle fill="${state.material === 'steel' ? '#52c7ff' : '#ff9d6b'}" opacity=".5" cx="${x}" cy="${(104 + (i % 2) * 14).toFixed(1)}" r="3.4"/>`;
                }
            }
        } else if (p > 0.05) {
            const inward = !a.mat.burnsAway;
            for (let i = 0; i < 3; i += 1) {
                const x = CX - 34 + i * 34;
                const y0 = inward ? 96 : PAN_Y - 34, y1 = inward ? PAN_Y - 34 : 96;
                out += `<line class="gas-arrow ${inward ? 'gas-in' : 'gas-out'}" x1="${x}" y1="${y0}" x2="${x}" y2="${y1}"/>`;
                const dir = inward ? 1 : -1;
                out += `<path class="gas-arrow ${inward ? 'gas-in' : 'gas-out'}" d="M${x - 5},${y1 - dir * 6} L${x},${y1} L${x + 5},${y1 - dir * 6}"/>`;
            }
            out += `<text class="small-label" fill="${inward ? '#52c7ff' : '#ff9d6b'}" x="${CX}" y="88" text-anchor="middle">` +
                   `${inward ? '산소가 들어와 결합합니다' : '기체가 되어 날아갑니다'}</text>`;
        }

        // the balance underneath
        out += `<rect class="balance" x="${CX - 74}" y="${PAN_Y}" width="148" height="8" rx="2"/>`;
        out += `<rect class="balance" x="${CX - 60}" y="${PAN_Y + 8}" width="120" height="34" rx="5"/>`;
        out += `<rect class="balance-screen" x="${CX - 50}" y="${PAN_Y + 14}" width="100" height="22" rx="4"/>`;
        out += `<text class="balance-read" x="${CX}" y="${PAN_Y + 30}" text-anchor="middle">${st.measured.toFixed(2)} g</text>`;
        out += `<text class="small-label" x="${CX}" y="${PAN_Y + 54}" text-anchor="middle">전자저울</text>`;

        out += `<text class="note-text" x="316" y="112">처음 고체 ${a.m.toFixed(2)} g</text>`;
        out += `<text class="note-text" x="316" y="128">지금 고체 ${st.solid.toFixed(2)} g</text>`;
        out += `<text class="note-text" x="316" y="144">결합한 산소 ${st.oxygen.toFixed(2)} g</text>`;
        out += `<text class="note-text" x="316" y="160">날아간 기체 ${st.gas.toFixed(2)} g</text>`;
        // its own full-width line: the cellulose equation is too long for a column
        out += `<text class="part-label" x="20" y="204">${a.mat.eq}</text>`;
        return out;
    }

    const BURN_VERDICT = { burn: '계속 탄다', out: '타다가 꺼진다', none: '불이 붙지 않는다' };
    const BURN_TONE = { burn: '#ffd166', out: '#ff9d6b', none: '#8fa8b0' };
    const OXIDE_VERDICT = { up: '질량이 늘어난다', same: '질량이 그대로다', down: '질량이 줄어든다' };
    const OXIDE_TONE = { up: '#52c7ff', same: '#54e6c1', down: '#ff9d6b' };

    function renderMain(a) {
        const p = state.progress;
        let out = state.mode === 'burn' ? renderBurn(a, p) : renderOxide(a, p);
        const text = a.kind === 'burn'
            ? `${FUELS[state.fuel].label} · ${state.oxygen === 'open' ? '열어 둠' : '덮음'} · ${state.temp} ℃ → ${BURN_VERDICT[a.outcome]}`
            : `${a.mat.label} · ${state.vessel === 'open' ? '열린 그릇' : '밀폐 용기'} → ${OXIDE_VERDICT[a.verdict]}`;
        const tone = a.kind === 'burn' ? BURN_TONE[a.outcome] : OXIDE_TONE[a.verdict];
        out += `<text class="verdict-text" fill="${tone}" x="20" y="28">${text}</text>`;
        mainGroup.innerHTML = out;
    }

    /* ------------------------------------------------------------ graphs */
    function graphFrame(xTicks, yTicks, xTitle, yTitle) {
        let out = '';
        yTicks.forEach(([v, y]) => {
            out += `<line class="grid-line" x1="${GRAPH.x0}" y1="${y.toFixed(1)}" x2="${GRAPH.x1}" y2="${y.toFixed(1)}"/>`;
            out += `<text class="axis-text" x="${GRAPH.x0 - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end">${v}</text>`;
        });
        xTicks.forEach(([v, x]) => {
            out += `<text class="axis-text" x="${x.toFixed(1)}" y="${GRAPH.y0 + 14}" text-anchor="middle">${v}</text>`;
        });
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        out += `<text class="axis-title" x="${((GRAPH.x0 + GRAPH.x1) / 2).toFixed(1)}" y="${GRAPH.y0 + 30}" text-anchor="middle">${xTitle}</text>`;
        out += `<text class="axis-title" x="${GRAPH.x0 + 4}" y="${GRAPH.y1 - 8}">${yTitle}</text>`;
        return out;
    }

    function graphBurn(a) {
        const total = a.runFor, t = state.progress * total;
        const gx = s => GRAPH.x0 + (s / total) * (GRAPH.x1 - GRAPH.x0);
        const gy = v => GRAPH.y0 - ((v - 14) / 8) * (GRAPH.y0 - GRAPH.y1);
        let out = graphFrame(
            [0, 0.25, 0.5, 0.75, 1].map(f => [(f * total).toFixed(1), gx(f * total)]),
            [16, 18, 20, 22].map(v => [v, gy(v)]),
            '시간 (초)', '산소 농도 (%)');
        out += `<line class="limit-line" x1="${GRAPH.x0}" y1="${gy(O2_FLOOR).toFixed(1)}" x2="${GRAPH.x1}" y2="${gy(O2_FLOOR).toFixed(1)}"/>`;
        out += `<text class="limit-text" x="${GRAPH.x1 - 4}" y="${(gy(O2_FLOOR) - 5).toFixed(1)}" text-anchor="end">${O2_FLOOR} % 아래로는 탈 수 없습니다</text>`;
        const line = (t1, cls) => {
            const pts = [];
            for (let i = 0; i <= 80; i += 1) {
                const s = (t1 * i) / 80;
                pts.push(`${gx(s).toFixed(1)},${gy(o2At(s, a)).toFixed(1)}`);
            }
            return `<path class="${cls}" d="M${pts.join('L')}"/>`;
        };
        out += line(total, 'trace-done');
        if (t > 0) out += line(t, 'trace');
        out += `<circle class="trace-dot" cx="${gx(t).toFixed(1)}" cy="${gy(o2At(t, a)).toFixed(1)}" r="5" fill="#52c7ff"/>`;
        if (state.oxygen === 'open') {
            out += `<text class="note-text" x="${GRAPH.x0 + 8}" y="${(gy(O2_START) + 16).toFixed(1)}">공기가 계속 들어와 산소가 줄지 않습니다</text>`;
        } else if (a.outcome === 'none') {
            out += `<text class="note-text" x="${GRAPH.x0 + 8}" y="${(gy(O2_START) + 16).toFixed(1)}">타지 않으므로 산소도 줄지 않습니다</text>`;
        }
        return out;
    }

    function graphOxide(a) {
        const st = stepOxide(state.progress, a);
        const rows = [
            ['반응 전 고체', a.m, '#b4d2dc'],
            ['반응 후 고체', a.mat.burnsAway ? a.solidEnd : a.solidEnd, a.mat.burnsAway ? '#ff9d6b' : '#52c7ff'],
            ['반응 전 전체 (고체 + 산소)', a.totalBefore, '#54e6c1'],
            ['반응 후 전체 (고체 + 기체)', a.totalAfter, '#54e6c1'],
        ];
        const max = Math.max(...rows.map(r => r[1])) * 1.1;
        const gx = v => GRAPH.x0 + (v / max) * (GRAPH.x1 - GRAPH.x0);
        let out = graphFrame([0, 0.25, 0.5, 0.75, 1].map(f => [(f * max).toFixed(1), gx(f * max)]), [], '질량 (g)', '');
        rows.forEach(([name, value, colour], i) => {
            const y = GRAPH.y1 + 30 + i * 30;
            out += `<text class="bar-text" fill="${colour}" x="${GRAPH.x0}" y="${y - 10}">${name} ${value.toFixed(2)} g</text>`;
            out += `<rect class="bar" x="${GRAPH.x0}" y="${y - 4}" width="${Math.max(2, gx(value) - GRAPH.x0).toFixed(1)}" height="11" rx="3" fill="${colour}" opacity=".8"/>`;
        });
        out += `<text class="note-text" x="${GRAPH.x0}" y="${GRAPH.y0 - 4}">지금 저울이 가리키는 값 ${st.measured.toFixed(2)} g</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'burn') {
            const t = state.progress * a.runFor;
            return `<div class="data-row"><span class="data-name">탈 물질</span><span class="data-val">${a.fuel.label}${a.hasFuel ? ` · 발화점 ${a.fuel.ignite} ℃` : ' — 없으면 탈 수 없습니다'}</span></div>` +
                `<div class="data-row"><span class="data-name">온도</span><span class="data-val">${state.temp} ℃ ${a.hasFuel ? (a.hotEnough ? '— 발화점 이상' : '— 발화점보다 낮음') : ''}</span></div>` +
                `<div class="data-row"><span class="data-name">산소</span><span class="data-val">${state.oxygen === 'open' ? '계속 들어옴 (21 %)' : `${state.jar} mL 안에 갇힘 · 지금 ${o2At(t, a).toFixed(1)} %`}</span></div>` +
                (state.oxygen === 'closed'
                    ? `<div class="data-row"><span class="data-name">꺼지기까지</span><span class="data-val">쓸 수 있는 산소 ${(((O2_START - O2_FLOOR) / 100) * state.jar).toFixed(1)} mL ÷ 초당 ${O2_RATE} mL = ${a.outTime.toFixed(1)} 초</span></div>`
                    : '') +
                `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${BURN_VERDICT[a.outcome]}</span></div>`;
        }
        const st = stepOxide(state.progress, a);
        return `<div class="data-row"><span class="data-name">반응식</span><span class="data-val">${a.mat.eq}</span></div>` +
            `<div class="data-row"><span class="data-name">고체</span><span class="data-val">${a.m.toFixed(2)} g → ${a.solidEnd.toFixed(2)} g</span></div>` +
            `<div class="data-row"><span class="data-name">주고받은 기체</span><span class="data-val">산소 ${a.oxygenTotal.toFixed(2)} g 결합 · 기체 ${a.gasEnd.toFixed(2)} g 생성</span></div>` +
            `<div class="data-row"><span class="data-name">저울 눈금</span><span class="data-val">${st.measured.toFixed(2)} g</span></div>` +
            `<div class="data-row match"><span class="data-name">전체 질량</span><span class="data-val">${a.totalBefore.toFixed(2)} g → ${a.totalAfter.toFixed(2)} g (변하지 않습니다)</span></div>`;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        graphGroup.innerHTML = a.kind === 'burn' ? graphBurn(a) : graphOxide(a);
        const tOut = document.getElementById('tempRangeOut');
        if (tOut) tOut.textContent = `${state.temp} ℃`;
        const jOut = document.getElementById('jarRangeOut');
        if (jOut) jOut.textContent = `${state.jar} mL`;
        const mOut = document.getElementById('massRangeOut');
        if (mOut) mOut.textContent = `${state.mass} g`;
        stageBadge.textContent = a.kind === 'burn'
            ? `${FUELS[state.fuel].label} · ${BURN_VERDICT[a.outcome]}`
            : `${a.mat.label} · ${OXIDE_VERDICT[a.verdict]}`;
        methodHint.textContent = state.mode === 'burn'
            ? '연소에는 탈 물질·산소·발화점 이상의 온도가 모두 필요합니다'
            : '반응에 관여한 기체까지 세면 질량은 변하지 않습니다';
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
        if (a.kind === 'burn') {
            labelA.textContent = '결과'; labelB.textContent = '빠진 조건';
            valueA.textContent = BURN_VERDICT[a.outcome];
            valueB.textContent = a.missing === 'fuel' ? '탈 물질' : a.missing === 'heat' ? '발화점 이상의 온도' : a.missing === 'oxygen' ? '산소' : '없음';
            predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
                : state.prediction === a.outcome ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
            let s = '';
            if (a.missing === 'fuel') s = `탈 물질이 없으면 산소와 온도가 아무리 충분해도 탈 수 없습니다.`;
            else if (a.missing === 'heat') s = `${eun(a.fuel.label)} 발화점이 ${a.fuel.ignite} ℃ 인데 ${state.temp} ℃ 까지만 올렸습니다. 발화점보다 낮으면 불이 붙지 않습니다.`;
            else if (a.missing === 'oxygen') {
                s = `${state.jar} mL 유리병 안에서 쓸 수 있는 산소는 ${(((O2_START - O2_FLOOR) / 100) * state.jar).toFixed(1)} mL 입니다. ` +
                    `초당 ${O2_RATE} mL 씩 쓰므로 ${a.outTime.toFixed(1)} 초 만에 산소가 ${O2_FLOOR} % 까지 줄어 불이 꺼졌습니다. ` +
                    `병이 클수록 산소가 많아 더 오래 탑니다.`;
            } else s = `탈 물질 ${a.fuel.label}, 산소, ${a.fuel.ignite} ℃ 이상의 온도가 모두 갖추어져 계속 탑니다. 셋 중 하나만 없애도 불은 꺼집니다.`;
            explanation.textContent = s;
            return;
        }
        labelA.textContent = '저울 눈금'; labelB.textContent = '전체 질량';
        // both readings must come from the same meter: in a sealed vessel the
        // starting reading already includes the trapped air.
        const st0 = stepOxide(0, a), st = stepOxide(1, a);
        valueA.textContent = `${st0.measured.toFixed(2)} g → ${st.measured.toFixed(2)} g`;
        valueB.textContent = `${a.totalBefore.toFixed(2)} g 그대로`;
        predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        let s = '';
        if (state.vessel === 'sealed') {
            s = `밀폐 용기에서는 드나드는 기체가 없어 저울 눈금이 ${a.totalBefore.toFixed(2)} g 그대로입니다. ` +
                (a.mat.burnsAway
                    ? `나무가 타서 생긴 기체 ${a.gasEnd.toFixed(2)} g이 용기 안에 그대로 남아 있기 때문입니다.`
                    : `강철솜이 결합한 산소 ${a.oxygenTotal.toFixed(2)} g 도 원래 용기 안의 공기에서 온 것이기 때문입니다.`) +
                ` 반응 전 ${a.totalBefore.toFixed(2)} g, 반응 후 ${a.totalAfter.toFixed(2)} g으로 질량은 보존됩니다.`;
        } else if (a.mat.burnsAway) {
            s = `열린 그릇에서는 타서 생긴 기체 ${a.gasEnd.toFixed(2)} g이 날아가 버립니다. ` +
                `그래서 저울에는 재 ${a.solidEnd.toFixed(2)} g 만 남아 줄어든 것처럼 보입니다. ` +
                `하지만 날아간 기체까지 세면 ${a.totalBefore.toFixed(2)} g 그대로입니다.`;
        } else {
            s = `열린 그릇에서는 공기 중의 산소 ${a.oxygenTotal.toFixed(2)} g이 철과 결합해 들어옵니다. ` +
                `그래서 ${a.m.toFixed(2)} g 이던 강철솜이 ${a.solidEnd.toFixed(2)} g으로 늘어납니다. ` +
                `타면 가벼워질 것 같지만, 금속은 산소가 붙기 때문에 오히려 무거워집니다.`;
        }
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
        stageCaption.textContent = state.mode === 'burn'
            ? '세 가지 조건 가운데 하나라도 빠지면 불은 붙지 않거나 꺼집니다.'
            : '저울 눈금과 전체 질량이 어떻게 다른지 견주어 보세요.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { fuel: 'candle', temp: 300, oxygen: 'open', jar: 500, material: 'steel', vessel: 'open', mass: 5, progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'burn').click();
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

    window.__burnModel = {
        O2_START, O2_FLOOR, O2_RATE, FUELS, MATERIALS, state,
        analyseBurn, analyseOxide, analyse, o2At, stepOxide, render, runSeconds,
        setMode(m) { modeButtons.find(b => b.dataset.mode === m).click(); },
        set(key, value) { state[key] = value; buildControls(); settingsChanged(); },
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
