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

    const BAND_COLORS = {
        0: '#18181b', // Black
        1: '#854d0e', // Brown
        2: '#dc2626', // Red
        3: '#ea580c', // Orange
        4: '#eab308', // Yellow
        5: '#16a34a', // Green
        6: '#2563eb', // Blue
        7: '#9333ea', // Violet
        8: '#64748b', // Gray
        9: '#f8fafc', // White
        gold: '#d97706', // Gold 5%
    };

    function getResistorBands(val) {
        if (val === 5) {
            return [BAND_COLORS[5], BAND_COLORS[0], BAND_COLORS.gold, BAND_COLORS.gold];
        }
        const d1 = Math.floor(val / 10);
        const d2 = val % 10;
        return [BAND_COLORS[d1] || BAND_COLORS[1], BAND_COLORS[d2] || BAND_COLORS[0], BAND_COLORS[0], BAND_COLORS.gold];
    }

    const SVG_DEFS = `
    <defs>
        <linearGradient id="dcBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="dcScreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#021a12"/>
            <stop offset="100%" stop-color="#042f24"/>
        </linearGradient>
        <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#d6cbbe"/>
            <stop offset="25%" stop-color="#f5ede3"/>
            <stop offset="65%" stop-color="#d1c4b4"/>
            <stop offset="100%" stop-color="#9c8e7e"/>
        </linearGradient>
        <linearGradient id="metalCap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="40%" stop-color="#cbd5e1"/>
            <stop offset="70%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
        <linearGradient id="dmmBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#164e63"/>
            <stop offset="100%" stop-color="#082f49"/>
        </linearGradient>
        <linearGradient id="dmmLcd" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#022c22"/>
            <stop offset="100%" stop-color="#064e3b"/>
        </linearGradient>
        <radialGradient id="brassNode" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#854d0e"/>
        </radialGradient>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="compDrop" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
    </defs>`;

    function resistorSymbol(cx, cy, label, sub, val) {
        const bands = getResistorBands(val);
        return `
        <g class="resistor-component" filter="url(#compDrop)">
            <!-- Metallic Leads -->
            <line x1="${cx - 36}" y1="${cy}" x2="${cx - 24}" y2="${cy}" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="${cx + 24}" y1="${cy}" x2="${cx + 36}" y2="${cy}" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Ceramic Body -->
            <rect x="${cx - 24}" y="${cy - 10}" width="48" height="20" rx="6" fill="url(#ceramicBody)"/>
            <!-- 4-Band Color Code -->
            <rect x="${cx - 15}" y="${cy - 10}" width="3.5" height="20" fill="${bands[0]}"/>
            <rect x="${cx - 8}" y="${cy - 10}" width="3.5" height="20" fill="${bands[1]}"/>
            <rect x="${cx - 1}" y="${cy - 10}" width="3.5" height="20" fill="${bands[2]}"/>
            <rect x="${cx + 10}" y="${cy - 10}" width="3.5" height="20" fill="${bands[3]}"/>
            <!-- Metal End Caps -->
            <rect x="${cx - 25}" y="${cy - 10}" width="4" height="20" rx="2" fill="url(#metalCap)"/>
            <rect x="${cx + 21}" y="${cy - 10}" width="4" height="20" rx="2" fill="url(#metalCap)"/>
            <!-- Specular Sheen -->
            <line x1="${cx - 23}" y1="${cy - 6}" x2="${cx + 23}" y2="${cy - 6}" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" stroke-linecap="round"/>
        </g>
        <!-- Resistance Badge -->
        <g>
            <rect x="${cx - 38}" y="${cy - 31}" width="76" height="17" rx="8.5" fill="#091824" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1"/>
            <text x="${cx}" y="${cy - 19}" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="850" font-family="Pretendard, sans-serif">${label}</text>
        </g>
        <!-- Live Measurement Badge -->
        <g>
            <rect x="${cx - 48}" y="${cy + 15}" width="96" height="17" rx="8.5" fill="#05121c" stroke="rgba(148, 163, 184, 0.28)" stroke-width="1"/>
            <text x="${cx}" y="${cy + 27}" text-anchor="middle" fill="#cbd5e1" font-size="10" font-weight="800" font-family="Pretendard, monospace">${sub}</text>
        </g>`;
    }

    function batterySymbol(x, y) {
        const v = V();
        const angle = -135 + (v / 12) * 270;
        return `
        <g class="dc-power-supply" filter="url(#compDrop)">
            <!-- Main Chassis -->
            <rect x="${x - 39}" y="72" width="78" height="96" rx="8" fill="url(#dcBody)" stroke="rgba(148, 163, 184, 0.25)" stroke-width="1.2"/>
            <!-- Header bar -->
            <rect x="${x - 39}" y="72" width="78" height="16" rx="8" fill="#0f172a"/>
            <rect x="${x - 39}" y="80" width="78" height="8" fill="#0f172a"/>
            <text x="${x}" y="83.5" text-anchor="middle" fill="#94a3b8" font-size="7.5" font-weight="900" letter-spacing="0.8">DC POWER 12V</text>
            <!-- LED Display Bezel & Screen -->
            <rect x="${x - 33}" y="92" width="66" height="28" rx="4" fill="#09131a" stroke="#1e293b" stroke-width="1.2"/>
            <rect x="${x - 30}" y="95" width="60" height="22" rx="2" fill="url(#dcScreen)"/>
            <text x="${x}" y="111" text-anchor="middle" fill="#34d399" font-size="13.5" font-weight="900" font-family="'Courier New', monospace" filter="url(#neonGlow)">${v.toFixed(1)} V</text>
            <!-- Rotary Knob -->
            <circle cx="${x - 15}" cy="142" r="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            <circle cx="${x - 15}" cy="142" r="7" fill="#334155"/>
            <line x1="${x - 15}" y1="142" x2="${(x - 15 + 5 * Math.cos(angle * Math.PI / 180)).toFixed(1)}" y2="${(142 + 5 * Math.sin(angle * Math.PI / 180)).toFixed(1)}" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
            <text x="${x - 15}" y="159" text-anchor="middle" fill="#64748b" font-size="6.5" font-weight="800">VOLT</text>
            <!-- Power Indicator LED -->
            <circle cx="${x + 18}" cy="138" r="3.5" fill="${v > 0 ? '#22c55e' : '#64748b'}" filter="${v > 0 ? 'url(#neonGlow)' : 'none'}"/>
            <text x="${x + 18}" y="152" text-anchor="middle" fill="#64748b" font-size="6.5" font-weight="800">PWR</text>
            <!-- Red Binding Post (+) -->
            <circle cx="${x}" cy="64" r="5.5" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.2"/>
            <circle cx="${x}" cy="64" r="2.2" fill="#fca5a5"/>
            <text x="${x - 10}" y="67" text-anchor="end" fill="#ef4444" font-size="10" font-weight="900">+</text>
            <!-- Black Binding Post (-) -->
            <circle cx="${x}" cy="176" r="5.5" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
            <circle cx="${x}" cy="176" r="2.2" fill="#64748b"/>
            <text x="${x - 10}" y="179" text-anchor="end" fill="#94a3b8" font-size="12" font-weight="900">−</text>
        </g>`;
    }

    function meterSymbol(cx, cy, currentVal, orientation = 'h') {
        const isH = orientation === 'h';
        const w = isH ? 84 : 76;
        const h = isH ? 36 : 40;
        return `
        <g class="digital-multimeter" filter="url(#compDrop)">
            <!-- DMM Casing -->
            <rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="7" fill="url(#dmmBody)" stroke="#0e7490" stroke-width="1.5"/>
            <!-- Protective Bumper Corners -->
            <path d="M${cx - w / 2 + 6},${cy - h / 2} L${cx - w / 2},${cy - h / 2} L${cx - w / 2},${cy - h / 2 + 6}" stroke="#eab308" stroke-width="2.5" fill="none"/>
            <path d="M${cx + w / 2 - 6},${cy - h / 2} L${cx + w / 2},${cy - h / 2} L${cx + w / 2},${cy - h / 2 + 6}" stroke="#eab308" stroke-width="2.5" fill="none"/>
            <path d="M${cx - w / 2},${cy + h / 2 - 6} L${cx - w / 2},${cy + h / 2} L${cx - w / 2 + 6},${cy + h / 2}" stroke="#eab308" stroke-width="2.5" fill="none"/>
            <path d="M${cx + w / 2 - 6},${cy + h / 2} L${cx + w / 2},${cy + h / 2} L${cx + w / 2},${cy + h / 2 - 6}" stroke="#eab308" stroke-width="2.5" fill="none"/>
            <!-- LCD Screen Bezel & Display -->
            <rect x="${cx - w / 2 + 8}" y="${cy - h / 2 + 6}" width="${w - 16}" height="${h - 12}" rx="3" fill="#041c19" stroke="#064e3b" stroke-width="1"/>
            <rect x="${cx - w / 2 + 10}" y="${cy - h / 2 + 8}" width="${w - 20}" height="${h - 16}" rx="2" fill="url(#dmmLcd)"/>
            <text x="${cx - w / 2 + 13}" y="${cy + 3}" fill="#059669" font-size="7.5" font-weight="900" font-family="Pretendard, sans-serif">DMM</text>
            <text x="${cx + 8}" y="${cy + 5}" text-anchor="middle" fill="#34d399" font-size="12.5" font-weight="900" font-family="'Courier New', monospace" filter="url(#neonGlow)">${currentVal.toFixed(2)} A</text>
            ${isH ? `
            <!-- Binding Terminal Jacks -->
            <circle cx="${cx - w / 2}" cy="${cy}" r="3" fill="#ef4444"/>
            <circle cx="${cx + w / 2}" cy="${cy}" r="3" fill="#1e293b"/>
            ` : `
            <circle cx="${cx}" cy="${cy - h / 2}" r="3" fill="#ef4444"/>
            <circle cx="${cx}" cy="${cy + h / 2}" r="3" fill="#1e293b"/>
            `}
        </g>`;
    }

    function brassNode(x, y) {
        return `
        <g class="brass-junction">
            <circle cx="${x}" cy="${y}" r="5.5" fill="url(#brassNode)" stroke="#78350f" stroke-width="1.2"/>
            <circle cx="${x}" cy="${y}" r="2.2" fill="#fef08a"/>
            <line x1="${x - 2}" y1="${y}" x2="${x + 2}" y2="${y}" stroke="#78350f" stroke-width="0.8"/>
        </g>`;
    }

    function renderWire(d, current, durStr) {
        return `
        <path class="wire-base" d="${d}"/>
        <path class="wire-core" d="${d}"/>
        <path class="current-pulse" d="${d}" ${durStr}/>`;
    }

    function renderCircuit() {
        const a = analyse();
        const dur = i => {
            if (i <= 0.001) return 'style="display:none;"';
            const s = Math.max(0.2, Math.min(3.5, 0.85 / Math.max(0.04, i))).toFixed(2);
            const op = Math.min(1, Math.max(0.4, i * 1.5)).toFixed(2);
            return `style="animation-duration:${s}s; opacity:${op};"`;
        };
        let out = SVG_DEFS;

        if (wiring === 'series') {
            const L = 65, R = 400, T = 62, B = 176;
            const loop = `M${L},64 L${L},${T} L${R},${T} L${R},${B} L${L},${B} L${L},172`;
            out += renderWire(loop, a.I, dur(a.I));
            out += batterySymbol(L, 120);
            out += resistorSymbol(180, T, `R₁ ${R1()} Ω`, `${a.v1.toFixed(2)} V · ${a.i1.toFixed(2)} A`, R1());
            out += resistorSymbol(300, T, `R₂ ${R2()} Ω`, `${a.v2.toFixed(2)} V · ${a.i2.toFixed(2)} A`, R2());
            out += meterSymbol(235, B, a.I, 'h');
            out += `<text class="comp-sub" x="235" y="210" text-anchor="middle">직렬: 두 저항에 같은 전류(${a.I.toFixed(2)} A)가 흐르고 전압이 나뉩니다</text>`;
        } else {
            const L = 65, LR = 165, RR = 350, T = 62, B = 176;
            const lead = `M${L},64 L${L},38 L${LR},38 L${LR},${T}`;
            const branch1 = `M${LR},${T} L${RR},${T}`;
            const leftFeeder = `M${LR},${T} L${LR},${B}`;
            const branch2 = `M${LR},${B} L${RR},${B}`;
            const rightCollector = `M${RR},${T} L${RR},${B}`;
            const toMeter = `M${RR},119 L370,119`;
            const ret = `M440,119 L448,119 L448,202 L${L},202 L${L},176`;

            out += renderWire(lead, a.I, dur(a.I));
            out += renderWire(branch1, a.i1, dur(a.i1));
            out += renderWire(leftFeeder, a.i2, dur(a.i2));
            out += renderWire(branch2, a.i2, dur(a.i2));
            out += renderWire(rightCollector, a.I, dur(a.I));
            out += renderWire(toMeter, a.I, dur(a.I));
            out += renderWire(ret, a.I, dur(a.I));

            out += brassNode(LR, T);
            out += brassNode(LR, B);
            out += brassNode(RR, T);
            out += brassNode(RR, B);
            out += brassNode(RR, 119);

            out += batterySymbol(L, 120);
            out += resistorSymbol(257, T, `R₁ ${R1()} Ω`, `${a.v1.toFixed(2)} V · ${a.i1.toFixed(2)} A`, R1());
            out += resistorSymbol(257, B, `R₂ ${R2()} Ω`, `${a.v2.toFixed(2)} V · ${a.i2.toFixed(2)} A`, R2());
            out += meterSymbol(405, 119, a.I, 'h');
            out += `<text class="comp-sub" x="257" y="20" text-anchor="middle">병렬: 두 저항에 같은 전압(${V().toFixed(1)} V)이 걸리고 전류가 나뉩니다</text>`;
        }
        circuitGroup.innerHTML = out;
    }

    function renderGraph() {
        const a = analyse();
        const iAtMax = V_MAX / a.R;
        const iMax = niceMax(Math.max(iAtMax, V_MAX / R1()));
        let out = `
        <defs>
            <linearGradient id="graphAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#34d399" stop-opacity="0.32"/>
                <stop offset="100%" stop-color="#34d399" stop-opacity="0.02"/>
            </linearGradient>
        </defs>`;

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
        const flip = px > (GRAPH.x0 + GRAPH.x1) / 2;

        // Shaded area under combined I-V line
        const polyPoints = `${gx(0)},${GRAPH.y0} ${gx(0)},${gy(0, iMax)} ${px.toFixed(1)},${py.toFixed(1)} ${px.toFixed(1)},${GRAPH.y0}`;
        out += `<polygon points="${polyPoints}" fill="url(#graphAreaGrad)"/>`;

        // Slope badge in upper left
        out += `
        <g transform="translate(68, 26)">
            <rect width="186" height="20" rx="10" fill="rgba(5, 21, 32, 0.85)" stroke="rgba(52, 211, 153, 0.4)" stroke-width="1"/>
            <text x="93" y="14" text-anchor="middle" fill="#34d399" font-size="10.5" font-weight="850" font-family="Pretendard, monospace">합성 R: ${a.R.toFixed(1)} Ω · 기울기 ${(1 / a.R).toFixed(3)} A/V</text>
        </g>`;

        // R1 alone for comparison
        const r1Y = gy(V_MAX / R1(), iMax);
        out += `<path class="iv-line ghost" d="M${gx(0)},${gy(0, iMax)} L${gx(V_MAX)},${r1Y}"/>`;
        out += `<text class="axis-text" x="${GRAPH.x1 - 4}" y="${Math.min(GRAPH.y0 - 4, r1Y - 6).toFixed(1)}" text-anchor="end">R₁만</text>`;

        // Combined resistance I-V line
        out += `<path class="iv-line" d="M${gx(0)},${gy(0, iMax)} L${gx(V_MAX)},${gy(iAtMax, iMax)}"/>`;

        // Dotted guide lines to operating point
        out += `<line class="op-guide" x1="${px}" y1="${GRAPH.y0}" x2="${px}" y2="${py.toFixed(1)}"/>`;
        out += `<line class="op-guide" x1="${GRAPH.x0}" y1="${py.toFixed(1)}" x2="${px}" y2="${py.toFixed(1)}"/>`;

        // Pulsing radar ring & operating point
        out += `<circle class="pulse-ring" cx="${px}" cy="${py.toFixed(1)}" r="7" fill="none" stroke="#fbbf24" stroke-width="2"/>`;
        out += `<circle class="op-point" cx="${px}" cy="${py.toFixed(1)}" r="5"/>`;

        // Operating point pill badge
        const bw = 104, bh = 20;
        const bx = flip ? px - bw - 8 : px + 8;
        const by = Math.max(GRAPH.y1 - 2, py - bh / 2);
        out += `
        <g transform="translate(${bx.toFixed(1)}, ${by.toFixed(1)})">
            <rect width="${bw}" height="${bh}" rx="10" fill="rgba(9, 24, 36, 0.92)" stroke="rgba(251, 191, 36, 0.6)" stroke-width="1.2"/>
            <text x="${bw / 2}" y="14" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="900" font-family="Pretendard, monospace">${V().toFixed(1)} V, ${a.I.toFixed(2)} A</text>
        </g>`;

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
