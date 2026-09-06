document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = [...document.querySelectorAll('[data-mode]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const mixButtons = document.getElementById('mixButtons');
    const progressRange = document.getElementById('progressRange');
    const progressOutput = document.getElementById('progressOutput');
    const methodHint = document.getElementById('methodHint');
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

    const PORE_MM = 0.01;          // filter paper holes, about 10 micrometres
    const HEAT_RATE = 20;          // degrees per second while nothing is boiling
    const BOIL_SECONDS = 10;       // seconds to boil away a whole tank of one substance
    const GRAPH = { x0: 62, x1: 424, y0: 152, y1: 24 };

    // Korean particles depend on whether the noun ends in a consonant.
    const batchim = w => {
        const c = w.charCodeAt(w.length - 1);
        return c >= 0xAC00 && c <= 0xD7A3 ? (c - 0xAC00) % 28 !== 0 : false;
    };
    const eun = w => w + (batchim(w) ? '은' : '는');
    const iga = w => w + (batchim(w) ? '이' : '가');
    const eul = w => w + (batchim(w) ? '을' : '를');
    const wa = w => w + (batchim(w) ? '과' : '와');
    // 로/으로 after a number depends on how its last digit is read aloud:
    // 영·삼·육·칠 end in a consonant, and 일·팔 end in ㄹ which takes로.
    const ro = s => s + ('0367'.includes(s[s.length - 1]) ? '으로' : '로');

    const MIXTURES = {
        filter: [
            { id: 'sandWater', label: '모래 + 물', hint: '녹지 않는 알갱이',
              parts: [{ n: '모래', size: 0.5, dissolved: false, colour: '#c8a86a' },
                      { n: '물', size: 0.0000003, dissolved: true, colour: '#0284c7' }] },
            { id: 'saltWater', label: '소금물', hint: '녹아 있는 물질',
              parts: [{ n: '소금', size: 0.0000006, dissolved: true, colour: '#e6ecf0' },
                      { n: '물', size: 0.0000003, dissolved: true, colour: '#0284c7' }] },
            { id: 'sandSalt', label: '모래 + 소금물', hint: '둘이 섞인 것',
              parts: [{ n: '모래', size: 0.5, dissolved: false, colour: '#c8a86a' },
                      { n: '소금', size: 0.0000006, dissolved: true, colour: '#e6ecf0' },
                      { n: '물', size: 0.0000003, dissolved: true, colour: '#0284c7' }] },
        ],
        distill: [
            { id: 'saltWater', label: '소금물', hint: '물만 끓어 나감',
              parts: [{ n: '물', bp: 100, frac: 0.9, colour: '#0284c7' }],
              residue: { n: '소금', pure: true, colour: '#e6ecf0' } },
            { id: 'waterEthanol', label: '물 + 에탄올', hint: '끓는점 78 ℃와 100 ℃',
              parts: [{ n: '에탄올', bp: 78, frac: 0.4, colour: '#b8a6f0' },
                      { n: '물', bp: 100, frac: 0.6, colour: '#0284c7' }],
              residue: null },
            { id: 'seaWater', label: '바닷물', hint: '여러 물질이 녹아 있음',
              parts: [{ n: '물', bp: 100, frac: 0.9, colour: '#0284c7' }],
              residue: { n: '소금과 여러 물질', pure: false, colour: '#d8cbb0' } },
        ],
        chroma: [
            { id: 'blackInk', label: '검정 사인펜 잉크', hint: '색소 3가지',
              parts: [{ n: '노랑', rf: 0.86, colour: '#d97706' },
                      { n: '빨강', rf: 0.62, colour: '#ff7d6b' },
                      { n: '파랑', rf: 0.34, colour: '#0284c7' }] },
            { id: 'spinach', label: '시금치 색소', hint: '색소 4가지',
              parts: [{ n: '카로틴', rf: 0.93, colour: '#ffa94d' },
                      { n: '잔토필', rf: 0.72, colour: '#ffe066' },
                      { n: '엽록소 a', rf: 0.55, colour: '#51cf66' },
                      { n: '엽록소 b', rf: 0.41, colour: '#2f9e44' }] },
            { id: 'foodDye', label: '식용 색소', hint: 'Rf가 비슷한 것이 있음',
              parts: [{ n: '황색 4호', rf: 0.74, colour: '#ffd43b' },
                      { n: '적색 40호', rf: 0.57, colour: '#ff6b6b' },
                      { n: '적색 3호', rf: 0.53, colour: '#f06595' }] },
        ],
    };
    const MODE_NAME = { filter: '거름', distill: '증류', chroma: '크로마토그래피' };
    const MODE_HINT = {
        filter: '거름은 알갱이 크기 차이로 나눕니다',
        distill: '증류는 끓는점 차이로 나눕니다',
        chroma: '크로마토그래피는 이동 속도 차이로 나눕니다',
    };
    const VERDICT = { full: '완전히 나뉜다', partial: '일부만 나뉜다', none: '나뉘지 않는다' };
    const VERDICT_TONE = { full: '#059669', partial: '#d97706', none: '#ea580c' };

    let mode = 'filter';
    let mixId = 'sandWater';
    let prediction = null;
    let running = false, frameId = 0, lastStamp = 0;

    const mixture = () => MIXTURES[mode].find(m => m.id === mixId) || MIXTURES[mode][0];
    /* The slider only steps in whole percent, so a run's sub-percent increments
       were being rounded straight back to where they started and the animation
       never moved. The run keeps its own clock and the slider just follows. */
    let animP = null;
    const progress = () => (animP === null ? Number(progressRange.value) : animP) / 100;

    // How long one full run takes, so the clock and the picture agree.
    function schedule(mix) {
        const segs = [];
        let t = 0, T = 20;
        mix.parts.forEach(part => {
            const rise = (part.bp - T) / HEAT_RATE;
            segs.push({ kind: 'rise', t0: t, t1: t + rise, T0: T, T1: part.bp });
            t += rise; T = part.bp;
            const hold = part.frac * BOIL_SECONDS;
            segs.push({ kind: 'boil', t0: t, t1: t + hold, T0: T, T1: T, part });
            t += hold;
        });
        return { segs, total: t };
    }

    const runSeconds = () => (mode === 'distill' ? schedule(mixture()).total : mode === 'chroma' ? 8 : 6);

    function tempAt(t, sch) {
        for (const s of sch.segs) {
            if (t <= s.t1 || s === sch.segs[sch.segs.length - 1]) {
                const f = s.t1 === s.t0 ? 1 : Math.min(1, Math.max(0, (t - s.t0) / (s.t1 - s.t0)));
                return s.T0 + (s.T1 - s.T0) * f;
            }
        }
        return 20;
    }

    function collectedAt(part, t, sch) {
        const s = sch.segs.find(x => x.kind === 'boil' && x.part === part);
        if (!s) return 0;
        return part.frac * Math.min(1, Math.max(0, (t - s.t0) / (s.t1 - s.t0)));
    }

    // What this method can and cannot do with this mixture.
    function analyse(m = mode, id = mixId) {
        const mix = MIXTURES[m].find(x => x.id === id) || MIXTURES[m][0];
        if (m === 'filter') {
            const caught = mix.parts.filter(p => !p.dissolved && p.size > PORE_MM);
            const passed = mix.parts.filter(p => !caught.includes(p));
            const verdict = caught.length === 0 ? 'none' : passed.length > 1 ? 'partial' : 'full';
            return { mix, verdict, caught, passed };
        }
        if (m === 'distill') {
            const sch = schedule(mix);
            // more than one substance left behind means the leftover is still a mixture
            const verdict = mix.residue && !mix.residue.pure ? 'partial' : 'full';
            return { mix, verdict, sch };
        }
        const sorted = [...mix.parts].sort((a, b) => b.rf - a.rf);
        let closest = 1;
        for (let i = 1; i < sorted.length; i += 1) closest = Math.min(closest, sorted[i - 1].rf - sorted[i].rf);
        const verdict = closest < 0.08 ? 'partial' : 'full';
        return { mix, verdict, sorted, closest };
    }

    const round = (n, d = 2) => Number(n.toFixed(d));

    /* ---------------------------------------------------------- filtering */
    function renderFilter(a, p) {
        const F = { top: 46, wide0: 138, wide1: 242, tipY: 112, stemX0: 183, stemX1: 197, stemY: 140 };
        const B = { x0: 148, x1: 232, top: 146, bottom: 196 };
        let out = '';
        const liquidColour = a.passed.some(x => x.n === '소금') ? '#8fd0e8' : '#0284c7';

        // what is still waiting in the funnel
        const leftFrac = 1 - p;
        if (leftFrac > 0.01) {
            const surfaceY = F.top + (F.tipY - F.top) * (1 - leftFrac);
            const halfAt = y => ((F.wide1 - F.wide0) / 2) * (1 - (y - F.top) / (F.tipY - F.top));
            const cxF = (F.wide0 + F.wide1) / 2;
            out += `<path class="liquid" fill="${liquidColour}" opacity=".55" d="M${cxF - halfAt(surfaceY)},${surfaceY.toFixed(1)} ` +
                   `L${cxF + halfAt(surfaceY)},${surfaceY.toFixed(1)} L${cxF + 2},${F.tipY} L${cxF - 2},${F.tipY} Z"/>`;
        }
        // the funnel and the paper cone inside it
        out += `<path class="paper" d="M${F.wide0 + 6},${F.top + 4} L${F.wide1 - 6},${F.top + 4} L${(F.wide0 + F.wide1) / 2},${F.tipY - 2} Z"/>`;
        out += `<path class="glass" fill="none" d="M${F.wide0},${F.top} L${(F.wide0 + F.wide1) / 2 - 7},${F.tipY} L${F.stemX0},${F.stemY} ` +
               `M${F.wide1},${F.top} L${(F.wide0 + F.wide1) / 2 + 7},${F.tipY} L${F.stemX1},${F.stemY}"/>`;

        // residue piling up on the paper
        a.caught.forEach(part => {
            const h = 16 * p;
            if (h > 0.5) {
                const cxF = (F.wide0 + F.wide1) / 2;
                const halfB = ((F.wide1 - F.wide0) / 2) * (h / (F.tipY - F.top)) + 8;
                out += `<path class="residue" fill="${part.colour}" opacity=".92" d="M${cxF - halfB},${(F.tipY - h).toFixed(1)} ` +
                       `L${cxF + halfB},${(F.tipY - h).toFixed(1)} L${cxF + 3},${F.tipY} L${cxF - 3},${F.tipY} Z"/>`;
            }
        });

        // a drop on its way down while the run is going
        if (p > 0.02 && p < 0.99) {
            const dy = ((p * 7) % 1);
            out += `<circle class="drop" cx="190" cy="${(F.stemY + 4 + dy * (B.top - F.stemY - 6)).toFixed(1)}" r="3"/>`;
        }

        // what has come through, collecting in the beaker
        const fill = (B.bottom - B.top - 6) * p;
        if (fill > 0.5) {
            out += `<rect class="liquid" fill="${liquidColour}" opacity=".6" x="${B.x0 + 3}" y="${(B.bottom - 3 - fill).toFixed(1)}" ` +
                   `width="${B.x1 - B.x0 - 6}" height="${fill.toFixed(1)}" rx="2"/>`;
        }
        out += `<path class="glass" fill="none" d="M${B.x0},${B.top} L${B.x0},${B.bottom} L${B.x1},${B.bottom} L${B.x1},${B.top}"/>`;

        // beside the funnel, not above it, where the verdict line already sits
        out += `<text class="part-label" x="${F.wide0 - 8}" y="56" text-anchor="end">거름종이와 깔때기</text>`;
        out += `<text class="part-label" x="${(B.x0 + B.x1) / 2}" y="${B.bottom + 13}" text-anchor="middle">거른 액체</text>`;

        out += `<text class="part-label" x="266" y="60">거름종이에 남은 것</text>`;
        out += a.caught.length
            ? a.caught.map((x, i) => `<text class="read-text" x="266" y="${80 + i * 19}">${x.n} (${x.size} mm)</text>`).join('')
            : `<text class="note-text" x="266" y="80">없음 — 모두 빠져나갔습니다</text>`;
        const baseY = 80 + Math.max(1, a.caught.length) * 19 + 12;
        out += `<text class="part-label" x="266" y="${baseY}">빠져나간 것</text>`;
        out += a.passed.map((x, i) =>
            `<text class="note-text" x="266" y="${baseY + 18 + i * 15}">${x.n} — 구멍보다 작아 통과</text>`).join('');
        return out;
    }

    /* -------------------------------------------------------- distillation */
    function renderDistill(a, p) {
        const sch = a.sch, t = p * sch.total, T = tempAt(t, sch);
        const FL = { cx: 96, cy: 132, r: 33, neckY: 74 };
        const RC = { x0: 292, x1: 356, top: 138, bottom: 196 };
        let out = '';

        const collected = a.mix.parts.map(part => collectedAt(part, t, sch));
        const totalOut = collected.reduce((s, v) => s + v, 0);
        const startVol = a.mix.parts.reduce((s, x) => s + x.frac, 0);
        const leftFrac = Math.max(0, startVol - totalOut) / startVol;

        // flask contents shrinking as the run goes on
        const liqTop = FL.cy + FL.r - (2 * FL.r - 6) * leftFrac;
        if (leftFrac > 0.01) {
            out += `<path class="liquid" fill="#0284c7" opacity=".5" d="M${FL.cx - Math.sqrt(Math.max(0, FL.r * FL.r - (liqTop - FL.cy) ** 2))},${liqTop.toFixed(1)} ` +
                   `A${FL.r} ${FL.r} 0 0 0 ${FL.cx + Math.sqrt(Math.max(0, FL.r * FL.r - (liqTop - FL.cy) ** 2))},${liqTop.toFixed(1)} Z"/>`;
        }
        if (a.mix.residue && totalOut > 0.05) {
            out += `<rect class="residue" fill="${a.mix.residue.colour}" opacity=".9" x="${FL.cx - 16}" y="${FL.cy + FL.r - 7}" ` +
                   `width="32" height="${(5 * Math.min(1, totalOut / 0.6)).toFixed(1)}" rx="2"/>`;
        }
        out += `<circle class="glass" cx="${FL.cx}" cy="${FL.cy}" r="${FL.r}"/>`;
        out += `<path class="glass-thin" d="M${FL.cx - 9},${FL.cy - FL.r + 4} L${FL.cx - 9},${FL.neckY} M${FL.cx + 9},${FL.cy - FL.r + 4} L${FL.cx + 9},${FL.neckY}"/>`;

        // boiling only while the temperature sits on a plateau
        const boiling = sch.segs.some(s => s.kind === 'boil' && t >= s.t0 && t <= s.t1);
        if (boiling) {
            for (let i = 0; i < 6; i += 1) {
                const bx = FL.cx - 20 + ((i * 37) % 40);
                const by = FL.cy + FL.r - 8 - ((i * 23 + Math.floor(t * 60)) % 30);
                if (by > liqTop) out += `<circle class="bubble" cx="${bx}" cy="${by}" r="${2 + (i % 3) * 0.6}"/>`;
            }
        }

        // burner
        out += `<rect class="burner" x="${FL.cx - 13}" y="188" width="26" height="10" rx="3"/>`;
        out += `<path class="flame" d="M${FL.cx - 9},188 Q${FL.cx},${168 - (boiling ? 4 : 0)} ${FL.cx + 9},188 Z"/>`;
        out += `<path class="flame inner" d="M${FL.cx - 4},188 Q${FL.cx},176 ${FL.cx + 4},188 Z"/>`;

        // thermometer in the neck, reading the vapour temperature
        const tf = Math.max(0, Math.min(1, (T - 20) / 100));
        out += `<rect class="therm-tube" x="${FL.cx - 3}" y="40" width="7" height="46" rx="3.5"/>`;
        out += `<rect class="therm-fill" x="${FL.cx - 1.5}" y="${(82 - 40 * tf).toFixed(1)}" width="4" height="${(40 * tf + 4).toFixed(1)}" rx="2"/>`;
        out += `<text class="read-text" x="${FL.cx + 12}" y="46">${T.toFixed(0)} ℃</text>`;

        // condenser sloping down to the receiver
        out += `<path class="glass-thin" d="M${FL.cx + 9},78 L280,120 M${FL.cx + 9},92 L280,134"/>`;
        for (let i = 0; i < 6; i += 1) {
            const f = i / 5, x = FL.cx + 9 + (280 - FL.cx - 9) * f;
            out += `<line class="glass-thin" x1="${x.toFixed(1)}" y1="${(78 + 42 * f).toFixed(1)}" x2="${(x + 3).toFixed(1)}" y2="${(92 + 42 * f).toFixed(1)}"/>`;
        }
        out += `<text class="part-label" x="196" y="76" text-anchor="middle">냉각기</text>`;
        if (boiling) out += `<path class="vapour" d="M${FL.cx + 12},84 L272,126"/>`;

        // the receiver filling with whatever is coming over right now
        const cap = RC.bottom - RC.top - 6;
        let stack = 0;
        a.mix.parts.forEach((part, i) => {
            const h = cap * (collected[i] / startVol);
            if (h > 0.4) {
                out += `<rect class="liquid" fill="${part.colour}" opacity=".72" x="${RC.x0 + 3}" y="${(RC.bottom - 3 - stack - h).toFixed(1)}" ` +
                       `width="${RC.x1 - RC.x0 - 6}" height="${h.toFixed(1)}" rx="2"/>`;
                stack += h;
            }
        });
        out += `<path class="glass" fill="none" d="M${RC.x0},${RC.top} L${RC.x0},${RC.bottom} L${RC.x1},${RC.bottom} L${RC.x1},${RC.top}"/>`;
        out += `<text class="part-label" x="${(RC.x0 + RC.x1) / 2}" y="${RC.bottom + 14}" text-anchor="middle">받은 액체</text>`;

        out += `<text class="part-label" x="368" y="52">받은 것</text>`;
        a.mix.parts.forEach((part, i) => {
            out += `<text class="note-text" x="368" y="${70 + i * 16}">${part.n} ${(collected[i] * 100).toFixed(0)} %</text>`;
        });
        const ry = 70 + a.mix.parts.length * 16 + 12;
        out += `<text class="part-label" x="368" y="${ry}">남은 것</text>`;
        out += `<text class="note-text" x="368" y="${ry + 18}">${a.mix.residue ? a.mix.residue.n : '없음'}</text>`;
        return out;
    }

    /* ----------------------------------------------------- chromatography */
    function renderChroma(a, p) {
        const BK = { x0: 146, x1: 314, top: 34, bottom: 198 };
        const PAPER = { x0: 208, x1: 252, top: 40, bottom: 190 };
        const SOLVENT_Y = 178, BASE_Y = 168, TOP_Y = 56;
        const front = BASE_Y - (BASE_Y - TOP_Y) * p;
        const rise = BASE_Y - front;
        let out = '';

        out += `<rect class="liquid" fill="#0284c7" opacity=".3" x="${BK.x0 + 3}" y="${SOLVENT_Y}" width="${BK.x1 - BK.x0 - 6}" height="${BK.bottom - SOLVENT_Y - 3}"/>`;
        out += `<rect class="paper" x="${PAPER.x0}" y="${PAPER.top}" width="${PAPER.x1 - PAPER.x0}" height="${PAPER.bottom - PAPER.top}" rx="2"/>`;
        // the wetted part of the paper
        if (rise > 0.5) {
            out += `<rect fill="#0284c7" opacity=".13" x="${PAPER.x0}" y="${front.toFixed(1)}" width="${PAPER.x1 - PAPER.x0}" height="${(PAPER.bottom - front).toFixed(1)}"/>`;
        }
        out += `<path class="glass" fill="none" d="M${BK.x0},${BK.top} L${BK.x0},${BK.bottom} L${BK.x1},${BK.bottom} L${BK.x1},${BK.top}"/>`;

        out += `<line class="base-line" x1="${PAPER.x0 - 12}" y1="${BASE_Y}" x2="${PAPER.x1 + 12}" y2="${BASE_Y}"/>`;
        out += `<text class="small-label" x="${PAPER.x0 - 16}" y="${BASE_Y + 4}" text-anchor="end">기준선</text>`;
        out += `<text class="small-label" x="${BK.x1 + 4}" y="${SOLVENT_Y + 4}">용매</text>`;
        if (rise > 0.5) {
            out += `<line class="front-line" x1="${PAPER.x0 - 12}" y1="${front.toFixed(1)}" x2="${PAPER.x1 + 12}" y2="${front.toFixed(1)}"/>`;
            out += `<text class="small-label" x="${PAPER.x0 - 16}" y="${(front + 4).toFixed(1)}" text-anchor="end">용매가 올라간 곳</text>`;
        }

        // Each spot sits at Rf of however far the solvent has climbed, so the
        // ratio is the same at every moment of the run.
        a.mix.parts.forEach(part => {
            const y = BASE_Y - rise * part.rf;
            out += `<ellipse class="spot" fill="${part.colour}" opacity=".9" cx="${(PAPER.x0 + PAPER.x1) / 2}" cy="${y.toFixed(1)}" rx="15" ry="5.5"/>`;
        });

        out += `<text class="part-label" x="330" y="52">성분과 Rf</text>`;
        [...a.mix.parts].sort((x, y) => y.rf - x.rf).forEach((part, i) => {
            const y = 72 + i * 17;
            out += `<rect x="330" y="${y - 8}" width="9" height="9" rx="2" fill="${part.colour}"/>`;
            out += `<text class="note-text" x="344" y="${y}">${part.n} Rf ${part.rf.toFixed(2)}</text>`;
        });
        const yy = 72 + a.mix.parts.length * 17 + 10;
        out += `<text class="note-text" x="330" y="${yy}">용매가 ${rise.toFixed(0)} 칸 올라갔습니다</text>`;
        out += `<text class="note-text" x="330" y="${yy + 15}">Rf = 성분 거리 ÷ 용매 거리</text>`;
        return out;
    }

    function renderMain(a) {
        const p = progress();
        let out = '';
        if (mode === 'filter') out += renderFilter(a, p);
        else if (mode === 'distill') out += renderDistill(a, p);
        else out += renderChroma(a, p);
        out += `<text class="verdict-text" fill="${VERDICT_TONE[a.verdict]}" x="20" y="26">${MODE_NAME[mode]} · ${a.mix.label} → ${VERDICT[a.verdict]}</text>`;
        mainGroup.innerHTML = out;
    }

    /* ------------------------------------------------------------- graphs */
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
        // inside the plot's left edge, clear of the topmost y tick label
        out += `<text class="axis-title" x="${GRAPH.x0 + 4}" y="${GRAPH.y1 - 8}">${yTitle}</text>`;
        return out;
    }

    function graphFilter(a) {
        // Sizes span seven decades, so only a log axis can show them together.
        const LO = -7, HI = 0;
        const gx = mm => GRAPH.x0 + ((Math.log10(mm) - LO) / (HI - LO)) * (GRAPH.x1 - GRAPH.x0);
        let out = '';
        const ticks = [[-7, '0.0000001'], [-5, '0.00001'], [-3, '0.001'], [-1, '0.1']]
            .map(([e, s]) => [s, gx(10 ** e)]);
        out += graphFrame(ticks, [], '알갱이 크기 (mm)', '');
        out += `<line class="pore-line" x1="${gx(PORE_MM).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(PORE_MM).toFixed(1)}" y2="${GRAPH.y0}"/>`;
        out += `<text class="pore-text" x="${(gx(PORE_MM) + 5).toFixed(1)}" y="${GRAPH.y1 + 10}">거름종이 구멍 ${PORE_MM} mm</text>`;
        // Label above each bar rather than past its end: the sand bar reaches
        // the right edge, so a label after it would run off the canvas.
        a.mix.parts.forEach((part, i) => {
            const y = GRAPH.y1 + 34 + i * 34;
            const caught = a.caught.includes(part);
            out += `<text class="bar-text" fill="${caught ? '#ea580c' : '#8fd4c8'}" x="${GRAPH.x0}" y="${y - 10}">` +
                   `${part.n} ${part.size} mm${part.dissolved ? ' (물에 녹음)' : ''} — ${caught ? '걸러짐' : '통과'}</text>`;
            out += `<rect class="bar" x="${GRAPH.x0}" y="${y - 4}" width="${Math.max(2, gx(part.size) - GRAPH.x0).toFixed(1)}" height="11" rx="3" fill="${part.colour}" opacity=".8"/>`;
        });
        return out;
    }

    function graphDistill(a) {
        const sch = a.sch, t = progress() * sch.total;
        const gx = s => GRAPH.x0 + (s / sch.total) * (GRAPH.x1 - GRAPH.x0);
        const gy = T => GRAPH.y0 - (T / 120) * (GRAPH.y0 - GRAPH.y1);
        let out = '';
        const yTicks = [0, 40, 78, 100, 120].map(v => [v, gy(v)]);
        const xTicks = [0, 0.25, 0.5, 0.75, 1].map(f => [(f * sch.total).toFixed(0), gx(f * sch.total)]);
        out += graphFrame(xTicks, yTicks, '시간 (초)', '온도 (℃)');
        a.mix.parts.forEach(part => {
            out += `<line class="pore-line" x1="${GRAPH.x0}" y1="${gy(part.bp).toFixed(1)}" x2="${GRAPH.x1}" y2="${gy(part.bp).toFixed(1)}"/>`;
            out += `<text class="pore-text" x="${GRAPH.x1 - 4}" y="${(gy(part.bp) - 5).toFixed(1)}" text-anchor="end">${part.n} 끓는점 ${part.bp} ℃</text>`;
        });
        const line = (t1, cls) => {
            const pts = [];
            for (let i = 0; i <= 90; i += 1) {
                const s = (t1 * i) / 90;
                pts.push(`${gx(s).toFixed(1)},${gy(tempAt(s, sch)).toFixed(1)}`);
            }
            return `<path class="${cls}" d="M${pts.join('L')}"/>`;
        };
        out += line(sch.total, 'trace-done');
        if (t > 0) out += line(t, 'trace');
        out += `<circle class="trace-dot" cx="${gx(t).toFixed(1)}" cy="${gy(tempAt(t, sch)).toFixed(1)}" r="5" fill="#d97706"/>`;
        return out;
    }

    function graphChroma(a) {
        const gx = rf => GRAPH.x0 + rf * (GRAPH.x1 - GRAPH.x0);
        let out = '';
        const xTicks = [0, 0.25, 0.5, 0.75, 1].map(v => [v.toFixed(2), gx(v)]);
        out += graphFrame(xTicks, [], 'Rf 값 (이동 거리의 비)', '');
        a.sorted.forEach((part, i) => {
            const y = GRAPH.y1 + 22 + i * 26;
            out += `<rect class="bar" x="${GRAPH.x0}" y="${y - 7}" width="${(gx(part.rf) - GRAPH.x0).toFixed(1)}" height="14" rx="3" fill="${part.colour}" opacity=".85"/>`;
            out += `<text class="bar-text" fill="${part.colour}" x="${(gx(part.rf) + 6).toFixed(1)}" y="${y + 4}">${part.n} ${part.rf.toFixed(2)}</text>`;
        });
        if (a.verdict === 'partial') {
            // pick the tightest pair by comparing gaps, not by float equality
            let worst = 1, gap = Infinity;
            for (let i = 1; i < a.sorted.length; i += 1) {
                const g = a.sorted[i - 1].rf - a.sorted[i].rf;
                if (g < gap) { gap = g; worst = i; }
            }
            const y = GRAPH.y1 + 22 + (worst - 0.5) * 26;
            out += `<text class="pore-text" x="${GRAPH.x0 + 6}" y="${y.toFixed(1)}">이 둘은 Rf 차이가 ${a.closest.toFixed(2)} 뿐이라 겹칩니다</text>`;
        }
        return out;
    }

    function renderGraph(a) {
        graphGroup.innerHTML = mode === 'filter' ? graphFilter(a) : mode === 'distill' ? graphDistill(a) : graphChroma(a);
    }

    function renderMixButtons() {
        mixButtons.innerHTML = MIXTURES[mode].map(m =>
            `<button type="button" data-mix="${m.id}" class="${m.id === mixId ? 'selected' : ''}">` +
            `<span>${m.label}</span><small>${m.hint}</small></button>`).join('');
        mixButtons.querySelectorAll('[data-mix]').forEach(button => {
            button.addEventListener('click', () => {
                mixId = button.dataset.mix;
                mixButtons.querySelectorAll('[data-mix]').forEach(b => b.classList.toggle('selected', b === button));
                settingsChanged();
            });
        });
    }

    function render() {
        const a = analyse();
        renderMain(a);
        renderGraph(a);
        progressOutput.textContent = `${Math.round(progress() * 100)} %`;
        stageBadge.textContent = `${MODE_NAME[mode]} · ${a.mix.label}`;
        methodHint.textContent = MODE_HINT[mode];
        dataNote.innerHTML = noteFor(a);
        return a;
    }

    function noteFor(a) {
        if (mode === 'filter') {
            return `<div class="data-row"><span class="data-name">거름종이 구멍</span><span class="data-val">${PORE_MM} mm</span></div>` +
                a.mix.parts.map(part =>
                    `<div class="data-row"><span class="data-name">${part.n}</span><span class="data-val">${part.size} mm ${part.dissolved ? '(물에 녹아 있음)' : ''} → ${a.caught.includes(part) ? '걸러짐' : '통과'}</span></div>`).join('') +
                `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${VERDICT[a.verdict]}</span></div>`;
        }
        if (mode === 'distill') {
            const t = progress() * a.sch.total;
            return `<div class="data-row"><span class="data-name">지금 온도</span><span class="data-val">${tempAt(t, a.sch).toFixed(0)} ℃ (${a.sch.total.toFixed(1)} 초 가운데 ${t.toFixed(1)} 초)</span></div>` +
                a.mix.parts.map(part =>
                    `<div class="data-row"><span class="data-name">${part.n}</span><span class="data-val">끓는점 ${part.bp} ℃ · 지금까지 ${(collectedAt(part, t, a.sch) * 100).toFixed(0)} % 나옴</span></div>`).join('') +
                `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${VERDICT[a.verdict]}</span></div>`;
        }
        const rise = (168 - 56) * progress();
        return `<div class="data-row"><span class="data-name">용매가 간 거리</span><span class="data-val">${rise.toFixed(0)} 칸</span></div>` +
            a.sorted.map(part =>
                `<div class="data-row"><span class="data-name">${part.n}</span><span class="data-val">${(rise * part.rf).toFixed(0)} 칸 ÷ ${rise.toFixed(0)} 칸 = Rf ${part.rf.toFixed(2)}</span></div>`).join('') +
            `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">${VERDICT[a.verdict]}</span></div>`;
    }

    /* ----------------------------------------------------------- the run */
    function tick(dt) {
        const step = (dt / runSeconds()) * 100;
        const from = animP === null ? Number(progressRange.value) : animP;
        animP = Math.min(100, from + step);
        progressRange.value = String(Math.round(animP));   // the slider follows loosely
        render();
        return animP >= 100;
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
        progressRange.value = '0';
        animP = 0;
        running = true;
        lastStamp = performance.now();
        render();
        frameId = requestAnimationFrame(frame);
    }

    function finish() {
        const a = render();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        valueA.textContent = VERDICT[a.verdict];
        predictionResult.textContent = !prediction
            ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';

        if (mode === 'filter') {
            valueB.textContent = a.caught.length ? a.caught.map(x => x.n).join(', ') : '없음';
            let s = `거름종이의 구멍은 ${PORE_MM} mm 입니다. `;
            if (a.caught.length) s += `${a.caught.map(x => `${x.n}(${x.size} mm)`).join(', ')}${batchim(a.caught[a.caught.length - 1].n) ? '은' : '는'} 구멍보다 커서 걸러졌습니다. `;
            else s += `걸러진 것이 하나도 없습니다. `;
            s += `${a.passed.map(x => x.n).join(', ')}${batchim(a.passed[a.passed.length - 1].n) ? '은' : '는'} 구멍보다 훨씬 작아 그대로 빠져나갔습니다. `;
            if (a.verdict === 'none') s += `물에 녹은 물질은 알갱이가 너무 작아 거름으로는 나눌 수 없습니다.`;
            else if (a.verdict === 'partial') s += `모래는 걸러 냈지만 빠져나간 액체는 아직 소금물이라 완전히 나뉜 것이 아닙니다.`;
            else s += `걸러진 것과 빠져나간 것이 각각 한 가지씩이라 완전히 나뉘었습니다.`;
            explanation.textContent = s;
            return;
        }
        if (mode === 'distill') {
            valueB.textContent = a.mix.parts.map(x => x.n).join(', ');
            const order = a.mix.parts.map(x => `${x.n} ${x.bp} ℃`).join(', ');
            let s = `끓는점은 ${order} 입니다. 끓는점이 낮은 것부터 차례로 끓어 나옵니다. `;
            s += `끓는 동안에는 넣어 준 열이 모두 상태를 바꾸는 데 쓰여 온도가 오르지 않고 그래프가 평평해집니다. `;
            s += a.mix.residue
                ? `플라스크에는 ${iga(a.mix.residue.n)} 남습니다. `
                : `두 물질이 모두 차례로 나와 플라스크에는 남는 것이 없습니다. `;
            s += a.verdict === 'partial'
                ? `다만 남은 것이 여러 물질의 혼합물이라 한 번의 증류로는 완전히 나뉘지 않습니다.`
                : `그래서 완전히 나눌 수 있습니다.`;
            explanation.textContent = s;
            return;
        }
        valueB.textContent = `${a.mix.parts.length}가지 색소`;
        const top = a.sorted[0], bottom = a.sorted[a.sorted.length - 1];
        let s = `${eun(top.n)} Rf ${ro(top.rf.toFixed(2))} 가장 빠르게 올라갔고, ${eun(bottom.n)} Rf ${ro(bottom.rf.toFixed(2))} 가장 느리게 올라갔습니다. `;
        s += `Rf는 성분이 간 거리를 용매가 간 거리로 나눈 값이라, 용매가 얼마나 올라갔든 같은 값이 나옵니다. `;
        s += a.verdict === 'partial'
            ? `그런데 Rf 차이가 ${a.closest.toFixed(2)} 밖에 안 되는 성분이 있어 두 점이 겹쳐 보입니다. 완전히 나누려면 다른 용매를 써야 합니다.`
            : `Rf가 충분히 달라 ${a.mix.parts.length}가지 색소가 모두 따로 떨어졌습니다.`;
        explanation.textContent = s;
    }

    function settingsChanged() {
        stopRun();
        progressRange.value = '0';
        animP = null;                       // otherwise a finished run's clock would stick
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }

    progressRange.addEventListener('input', () => {
        stopRun();
        animP = null;                       // dragging takes over from playback
        render();
        if (Number(progressRange.value) >= 100) finish();
    });
    modeButtons.forEach(button => button.addEventListener('click', () => {
        mode = button.dataset.mode;
        mixId = MIXTURES[mode][0].id;
        modeButtons.forEach(item => item.classList.toggle('selected', item === button));
        renderMixButtons();
        stageCaption.textContent = mode === 'filter'
            ? '무엇이 걸러지고 무엇이 그대로 빠져나가는지 보세요.'
            : mode === 'distill'
                ? '온도가 멈춰 있는 구간에서만 액체가 나옵니다.'
                : '용매가 올라간 만큼 성분도 같은 비율로 올라갑니다.';
        settingsChanged();
    }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        prediction = null;
        predictionButtons.forEach(item => item.classList.remove('selected'));
        mixId = MIXTURES.filter[0].id;
        modeButtons.find(b => b.dataset.mode === 'filter').click();
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

    window.__sepModel = {
        PORE_MM, MIXTURES, analyse, schedule, tempAt, collectedAt, render, round,
        setMode(m) { modeButtons.find(b => b.dataset.mode === m).click(); },
        setMix(id) { mixId = id; renderMixButtons(); settingsChanged(); },
        setProgress(v) { stopRun(); progressRange.value = String(v); progressRange.dispatchEvent(new Event('input')); },
        runToEnd(dt = 1 / 60, cap = 20000) {
            stopRun(); progressRange.value = '0'; animP = 0;
            let steps = 0;
            while (!tick(dt) && steps < cap) steps += 1;
            finish();
            return { steps, progress: Number(progressRange.value) };
        },
        tick, finish, getMode: () => mode, getMix: () => mixId, runSeconds,
    };

    resetBtn.click();
});
