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

    const GRAPH = { x0: 62, x1: 424, y0: 152, y1: 26 };
    const RUN_SECONDS = 8;

    const batchim = w => {
        const c = w.charCodeAt(w.length - 1);
        return c >= 0xAC00 && c <= 0xD7A3 ? (c - 0xAC00) % 28 !== 0 : false;
    };
    const eun = w => w + (batchim(w) ? '은' : '는');
    const iga = w => w + (batchim(w) ? '이' : '가');

    /* -------------------------------------------------------------- data */
    // Absolute magnitude, surface temperature and the colour the eye sees.
    const STARS = {
        sun: { name: '태양 같은 별', abs: 4.8, temp: 5800, colour: '노란색', hex: '#ffe9a0' },
        sirius: { name: '시리우스', abs: 1.4, temp: 9900, colour: '흰색', hex: '#eef4ff' },
        betelgeuse: { name: '베텔게우스', abs: -5.5, temp: 3500, colour: '붉은색', hex: '#ff8c5a' },
        rigel: { name: '리겔', abs: -7.0, temp: 12100, colour: '청백색', hex: '#9fc5ff' },
    };
    const BASE_PC = 10;                    // absolute magnitude is the view from here
    const MULTIPLES = [2, 3, 4, 5];
    const apparent = (abs, d) => abs + 5 * Math.log10(d / BASE_PC);

    // Galaxies glued to a rubber band, one every notch; the band is stretched
    // over the run and every distance grows by the same factor.
    const GALAXIES = ['가', '나', '다', '라', '마'];
    const STRETCH = [1.5, 2, 3];

    const state = {
        mode: 'bright',
        star: 'sun', mult: 2,
        stretch: 2, home: 0,
        progress: 0, prediction: null,
    };
    let running = false, frameId = 0, lastStamp = 0;

    /* ------------------------------------------------------------ models */
    function analyseBright(s = state) {
        const star = STARS[s.star];
        const d = BASE_PC * s.mult;
        const ratio = 1 / (s.mult * s.mult);
        const m0 = apparent(star.abs, BASE_PC), m1 = apparent(star.abs, d);
        return { kind: 'bright', star, d, ratio, m0, m1, dm: m1 - m0, verdict: 'square' };
    }
    // the screen on its way out: distance and what reaches one cell of it
    const brightAt = (p, a) => {
        const d = BASE_PC + (a.d - BASE_PC) * p;
        const n = d / BASE_PC;
        return { d, n, ratio: 1 / (n * n), m: apparent(a.star.abs, d) };
    };

    function analyseExpand(s = state) {
        const S = s.stretch;
        const rows = GALAXIES.map((name, i) => {
            const d0 = Math.abs(i - s.home);
            return { name, i, d0, d1: d0 * S, moved: d0 * (S - 1), speed: d0 * (S - 1) / RUN_SECONDS };
        });
        return { kind: 'expand', S, home: s.home, rows, verdict: 'faster' };
    }
    const stretchAt = (p, a) => 1 + (a.S - 1) * p;

    const analyse = () => (state.mode === 'bright' ? analyseBright() : analyseExpand());

    /* ---------------------------------------------------------- controls */
    function pickRow(legend, name, options, current, cols) {
        return `<fieldset class="pick-field"><legend>${legend}</legend>` +
            `<div class="pick-buttons cols${cols}" data-pick="${name}">` +
            options.map(o => `<button type="button" data-value="${o.value}" class="${o.value === String(current) ? 'selected' : ''}">` +
                `${o.label}${o.hint ? `<small>${o.hint}</small>` : ''}</button>`).join('') +
            `</div></fieldset>`;
    }

    function buildControls() {
        if (state.mode === 'bright') {
            controlArea.innerHTML =
                pickRow('별', 'star', Object.entries(STARS).map(([k, v]) => ({ value: k, label: v.name, hint: `절대 등급 ${v.abs.toFixed(1)}` })), state.star, 2) +
                pickRow(`거리 (처음 ${BASE_PC} pc의 몇 배로)`, 'mult', MULTIPLES.map(n => ({ value: String(n), label: `${n}배`, hint: `${n * BASE_PC} pc` })), state.mult, 4);
        } else {
            controlArea.innerHTML =
                pickRow('고무줄을 늘리는 정도', 'stretch', STRETCH.map(S => ({ value: String(S), label: `${S}배` })), state.stretch, 3) +
                pickRow('내가 서 있는 은하', 'home', GALAXIES.map((g, i) => ({ value: String(i), label: g })), state.home, 5);
        }
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                const v = button.dataset.value;
                state[group.dataset.pick] = group.dataset.pick === 'star' ? v : Number(v);
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                if (group.dataset.pick === 'mult') buildPrediction();
                settingsChanged();
            }));
        });
    }

    const PRED_EXPAND = [{ value: 'faster', label: '더 빨리 멀어진다' }, { value: 'same', label: '같은 속도로 멀어진다' }, { value: 'slower', label: '더 느리게 멀어진다' }];

    function buildPrediction() {
        const n = state.mult;
        const list = state.mode === 'bright'
            ? [{ value: 'linear', label: `${n}분의 1로 줄어든다` }, { value: 'square', label: `${n * n}분의 1로 줄어든다` }, { value: 'same', label: '변하지 않는다' }]
            : PRED_EXPAND;
        predictionLegend.textContent = state.mode === 'bright' ? `거리를 ${n}배로 하면 밝기는 어떻게 될까요?` : '멀리 있는 은하는 가까운 은하보다 어떻게 될까요?';
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    const fmtMag = m => `${m.toFixed(1)}등급`;
    const fmtFrac = n => (Math.abs(n - Math.round(n)) < 1e-9 ? `${Math.round(n)}분의 1` : `${n.toFixed(1)}분의 1`);

    function renderBright(a, p) {
        const at = brightAt(p, a);
        const SX = 58, SY = 112, CELL = 13;
        const xOf = d => 128 + (d - BASE_PC) * (270 / (50 - BASE_PC));   // 10 pc → 128, 50 pc → 398
        let out = `<rect class="space" x="12" y="40" width="436" height="150" rx="8"/>`;

        // the star, coloured by its temperature
        out += `<circle fill="${a.star.hex}" opacity=".25" cx="${SX}" cy="${SY}" r="22"/>`;
        out += `<circle fill="${a.star.hex}" cx="${SX}" cy="${SY}" r="11"/>`;
        out += `<text class="small-label" x="${SX}" y="${SY + 34}" text-anchor="middle">${a.star.name}</text>`;
        out += `<text class="note-text" x="${SX}" y="${SY + 46}" text-anchor="middle">${a.star.temp} K · ${a.star.colour}</text>`;

        // the bundle of light that fills one reference cell at 10 pc, spreading outward
        const half0 = CELL / 2;
        const xRef = xOf(BASE_PC), xNow = xOf(at.d);
        const halfNow = half0 * at.n;
        out += `<path class="ray" stroke="${a.star.hex}" d="M${SX + 11},${SY - 3} L${xNow.toFixed(1)},${(SY - halfNow).toFixed(1)}"/>`;
        out += `<path class="ray" stroke="${a.star.hex}" d="M${SX + 11},${SY + 3} L${xNow.toFixed(1)},${(SY + halfNow).toFixed(1)}"/>`;
        // the reference cell at 10 pc
        out += `<rect class="screen-ref" x="${(xRef - half0).toFixed(1)}" y="${(SY - half0).toFixed(1)}" width="${CELL}" height="${CELL}"/>`;
        out += `<text class="small-label" fill="#059669" x="${xRef.toFixed(1)}" y="${SY - 12}" text-anchor="middle">10 pc</text>`;
        out += `<text class="note-text" x="${xRef.toFixed(1)}" y="${SY + 26}" text-anchor="middle">한 칸에 빛 전부</text>`;
        // the screen now: the same light over n × n cells
        if (p > 0.001) {
            const side = 2 * halfNow;
            out += `<rect fill="${a.star.hex}" opacity="${(0.85 * at.ratio).toFixed(3)}" x="${(xNow - halfNow).toFixed(1)}" y="${(SY - halfNow).toFixed(1)}" width="${side.toFixed(1)}" height="${side.toFixed(1)}"/>`;
            const cells = Math.ceil(at.n - 1e-9);
            for (let i = 0; i <= cells; i += 1) {
                const off = -halfNow + i * CELL;
                if (off > halfNow + 0.01) break;
                out += `<line class="screen-grid" x1="${(xNow + off).toFixed(1)}" y1="${(SY - halfNow).toFixed(1)}" x2="${(xNow + off).toFixed(1)}" y2="${(SY + halfNow).toFixed(1)}"/>`;
                out += `<line class="screen-grid" x1="${(xNow - halfNow).toFixed(1)}" y1="${(SY + off).toFixed(1)}" x2="${(xNow + halfNow).toFixed(1)}" y2="${(SY + off).toFixed(1)}"/>`;
            }
            out += `<rect class="screen-grid" style="stroke:#0f172a" x="${(xNow - halfNow).toFixed(1)}" y="${(SY - halfNow).toFixed(1)}" width="${side.toFixed(1)}" height="${side.toFixed(1)}"/>`;
            if (xNow - xRef >= 40) out += `<text class="small-label" x="${xNow.toFixed(1)}" y="${(SY - halfNow - 6).toFixed(1)}" text-anchor="middle">${at.d.toFixed(0)} pc</text>`;
            // the caption waits until the screen has cleared the reference cell's caption
            if (xNow - xRef >= 64) out += `<text class="note-text" x="${xNow.toFixed(1)}" y="${(SY + halfNow + 14).toFixed(1)}" text-anchor="middle">${(at.n * at.n).toFixed(1)}칸에 나뉨</text>`;
        }

        // readouts along the top of the frame
        out += `<text class="verdict-text" fill="${a.star.hex}" x="20" y="28">${a.star.name} · ${BASE_PC} pc → ${a.d} pc</text>`;
        out += `<text class="mag-text" fill="#0f172a" x="20" y="204">밝기 ${at.n > 1.001 ? `${BASE_PC} pc일 때의 ${fmtFrac(1 / at.ratio)}` : '처음 그대로'}</text>`;
        out += `<text class="mag-text" fill="#0f172a" x="250" y="204">겉보기 ${fmtMag(at.m)} · 절대 ${fmtMag(a.star.abs)}</text>`;
        return out;
    }

    function renderExpand(a, p) {
        const S = stretchAt(p, a);
        const X0 = 30, Y = 96, UNIT0 = 32;                 // one notch = 32 px before stretching
        const unit = UNIT0 * S;
        const len = unit * (GALAXIES.length - 1);
        let out = `<rect class="space" x="12" y="40" width="436" height="150" rx="8"/>`;
        out += `<rect class="band" x="${X0 - 10}" y="${Y - 7}" width="${(len + 20).toFixed(1)}" height="14" rx="4"/>`;
        for (let i = 0; i < GALAXIES.length; i += 1) {
            const x = X0 + i * unit;
            out += `<line class="band-tick" x1="${x.toFixed(1)}" y1="${Y - 7}" x2="${x.toFixed(1)}" y2="${Y + 7}"/>`;
        }
        const homeX = X0 + a.home * unit;
        // arrows from where I stand to every other galaxy, as long as they have moved away
        a.rows.forEach(r => {
            const x = X0 + r.i * unit;
            if (r.i !== a.home && p > 0.001) {
                const dir = r.i > a.home ? 1 : -1;
                const from = homeX + dir * (r.d0 * UNIT0), to = x;
                const ay = Y + 22 + (r.d0 % 2) * 12;
                out += `<line class="recede" x1="${from.toFixed(1)}" y1="${ay}" x2="${to.toFixed(1)}" y2="${ay}"/>`;
                out += `<path fill="#ea580c" d="M${to.toFixed(1)},${ay} l${-dir * 6},-3.5 l0,7 z"/>`;
                out += `<text class="recede-text" x="${((from + to) / 2).toFixed(1)}" y="${ay - 4}" text-anchor="middle">${(r.d0 * (S - 1)).toFixed(1)}칸</text>`;
                            }
            out += `<circle class="galaxy${r.i === a.home ? ' home' : ''}" cx="${x.toFixed(1)}" cy="${Y}" r="${r.i === a.home ? 7 : 5.5}"/>`;
            out += `<text class="galaxy-text" x="${x.toFixed(1)}" y="${Y - 14}" text-anchor="middle">${r.name}${r.i === a.home ? ' (여기)' : ''}</text>`;
        });
        out += `<text class="verdict-text" fill="#d97706" x="20" y="28">고무줄 ${S.toFixed(2)}배 · ${GALAXIES[a.home]} 은하에서 본 모습</text>`;
        out += `<text class="small-label" x="20" y="164">눈금 한 칸 = 처음 은하 사이 거리 · 화살표 = 나에게서 멀어진 거리</text>`;
        out += `<text class="mag-text" fill="#0f172a" x="20" y="204">가장 먼 은하 ${Math.max(...a.rows.map(r => r.d0))}칸 → ${(Math.max(...a.rows.map(r => r.d0)) * S).toFixed(1)}칸 · 가장 가까운 은하 1칸 → ${S.toFixed(1)}칸</text>`;
        return out;
    }

    function renderMain(a) {
        mainGroup.innerHTML = a.kind === 'bright' ? renderBright(a, state.progress) : renderExpand(a, state.progress);
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

    // brightness against distance: the inverse-square curve with the screen's point on it
    function graphBright(a) {
        const at = brightAt(state.progress, a);
        const dMax = 50;
        const gx = d => GRAPH.x0 + (d / dMax) * (GRAPH.x1 - GRAPH.x0);
        const gy = f => GRAPH.y0 - f * (GRAPH.y0 - GRAPH.y1);
        let out = graphFrame(
            [0, 10, 20, 30, 40, 50].map(d => [d, gx(d)]),
            [[0, gy(0)], ['1/4', gy(0.25)], ['1/2', gy(0.5)], ['3/4', gy(0.75)], ['1', gy(1)]],
            '거리 (pc)', `밝기 (${BASE_PC} pc일 때를 1로)`);
        const pts = [];
        for (let d = BASE_PC; d <= dMax + 1e-9; d += 0.5) pts.push(`${gx(d).toFixed(1)},${gy(Math.min(1, (BASE_PC / d) ** 2)).toFixed(1)}`);
        out += `<path class="trace-done" d="M${pts.join('L')}"/>`;
        MULTIPLES.forEach(n => {
            out += `<circle class="flash-dot" style="fill:#059669" cx="${gx(n * BASE_PC).toFixed(1)}" cy="${gy(1 / (n * n)).toFixed(1)}" r="2.6"/>`;
            out += `<text class="axis-text" style="fill:#059669" x="${(gx(n * BASE_PC) + 4).toFixed(1)}" y="${(gy(1 / (n * n)) - 6).toFixed(1)}">1/${n * n}</text>`;
        });
        const live = [];
        for (let d = BASE_PC; d <= at.d + 1e-9; d += 0.5) live.push(`${gx(d).toFixed(1)},${gy((BASE_PC / d) ** 2).toFixed(1)}`);
        live.push(`${gx(at.d).toFixed(1)},${gy(at.ratio).toFixed(1)}`);
        out += `<path class="trace" style="stroke:${a.star.hex}" d="M${live.join('L')}"/>`;
        out += `<circle class="trace-dot" cx="${gx(at.d).toFixed(1)}" cy="${gy(at.ratio).toFixed(1)}" r="5" fill="${a.star.hex}"/>`;
        out += `<text class="note-text" x="${GRAPH.x1 - 4}" y="${GRAPH.y1 + 14}" text-anchor="end">거리 n배 → 밝기 1/n² · 겉보기 등급은 ${a.dm > 0 ? '+' : ''}${a.dm.toFixed(1)}</text>`;
        return out;
    }

    // recession speed against distance: the points fall on a line through the origin
    function graphExpand(a) {
        const S = stretchAt(state.progress, a);
        const rows = a.rows.filter(r => r.i !== a.home);
        const dMax = 4, vMax = Math.max(...STRETCH) - 1;     // stretch 3× → the 4-notch galaxy moves 8 notches → 1 notch/s over 8 s
        const gx = d => GRAPH.x0 + (d / dMax) * (GRAPH.x1 - GRAPH.x0);
        const gy = v => GRAPH.y0 - (v / (vMax * dMax / RUN_SECONDS)) * (GRAPH.y0 - GRAPH.y1);
        let out = graphFrame(
            [0, 1, 2, 3, 4].map(d => [d, gx(d)]),
            [0, 0.25, 0.5, 0.75, 1].map(v => [v.toFixed(2), gy(v)]),
            '처음 거리 (칸)', '멀어지는 속도 (칸/초)');
        const slope = (a.S - 1) / RUN_SECONDS;
        out += `<line class="hubble-line" x1="${gx(0)}" y1="${gy(0)}" x2="${gx(dMax).toFixed(1)}" y2="${gy(slope * dMax).toFixed(1)}"/>`;
        // galaxies the same distance away on either side share one point and one label
        const byDist = new Map();
        rows.forEach(r => { const g = byDist.get(r.d0) || []; g.push(r); byDist.set(r.d0, g); });
        [...byDist.values()].forEach(group => {
            const r = group[0], moved = r.d0 * (S - 1);
            out += `<circle class="trace-dot" cx="${gx(r.d0).toFixed(1)}" cy="${gy(r.speed).toFixed(1)}" r="5" fill="#ea580c"/>`;
            // labels hang below their point; far points sit near the right edge, so theirs go on the left
            const left = r.d0 >= 3;
            // odd distances label above, even below, so neighbours never share a row
            const ly = Math.min(GRAPH.y0 - 2, r.d0 % 2 ? gy(r.speed) - 7 : gy(r.speed) + 14);
            out += `<text class="axis-text" x="${(gx(r.d0) + (left ? -10 : 10)).toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${left ? 'end' : 'start'}">${group.map(x => x.name).join('·')} ${moved.toFixed(1)}칸</text>`;
        });
        out += `<text class="note-text" x="${GRAPH.x0 + 8}" y="${GRAPH.y1 + 14}">거리에 비례하는 속도 — 허블 법칙</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'bright') {
            const at = brightAt(state.progress, a);
            return `<div class="data-row"><span class="data-name">별</span><span class="data-val">${a.star.name} · 표면 온도 ${a.star.temp} K · ${a.star.colour}</span></div>` +
                `<div class="data-row"><span class="data-name">거리</span><span class="data-val">${BASE_PC} pc → ${at.d.toFixed(0)} pc (${at.n.toFixed(1)}배)</span></div>` +
                `<div class="data-row"><span class="data-name">빛이 퍼진 넓이</span><span class="data-val">${at.n.toFixed(1)} × ${at.n.toFixed(1)} = ${(at.n * at.n).toFixed(1)}칸</span></div>` +
                `<div class="data-row"><span class="data-name">밝기</span><span class="data-val">처음의 ${fmtFrac(at.n * at.n)}</span></div>` +
                `<div class="data-row match"><span class="data-name">등급</span><span class="data-val">절대 ${fmtMag(a.star.abs)} 그대로 · 겉보기 ${fmtMag(a.m0)} → ${fmtMag(at.m)}</span></div>`;
        }
        const S = stretchAt(state.progress, a);
        return `<div class="data-row"><span class="data-name">고무줄</span><span class="data-val">${S.toFixed(2)}배로 늘어남 (끝까지 ${a.S}배)</span></div>` +
            a.rows.filter(r => r.i !== a.home).map(r =>
                `<div class="data-row"><span class="data-name">${r.name} 은하</span><span class="data-val">${r.d0}칸 → ${(r.d0 * S).toFixed(1)}칸 · 속도 1초에 ${r.speed.toFixed(3)}칸</span></div>`).join('') +
            `<div class="data-row match"><span class="data-name">규칙</span><span class="data-val">속도 = 거리 × ${((a.S - 1) / RUN_SECONDS).toFixed(3)} — 거리에 비례</span></div>`;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        graphGroup.innerHTML = a.kind === 'bright' ? graphBright(a) : graphExpand(a);
        stageBadge.textContent = a.kind === 'bright' ? `${a.star.name} · ${a.d} pc` : `${a.S}배 · ${GALAXIES[a.home]} 은하에서`;
        methodHint.textContent = state.mode === 'bright'
            ? '거리가 2배가 되면 같은 빛이 4배 넓은 곳에 퍼져 밝기는 4분의 1이 됩니다'
            : '고무줄이 늘어나면 멀리 있던 점이 더 많이 움직입니다';
        dataNote.innerHTML = noteFor(a);
        return a;
    }

    /* --------------------------------------------------------------- run */
    function tick(dt) {
        state.progress = Math.min(1, state.progress + dt / RUN_SECONDS);
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
        if (a.kind === 'bright') {
            const n = state.mult;
            labelA.textContent = '밝기'; labelB.textContent = '겉보기 등급';
            valueA.textContent = `${n * n}분의 1`;
            valueB.textContent = `${fmtMag(a.m0)} → ${fmtMag(a.m1)}`;
            predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
                : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
            explanation.textContent =
                `${eul(a.star.name)} ${BASE_PC} pc에서 ${a.d} pc로, ${n}배 멀리 놓았습니다. 같은 빛이 ${n} × ${n} = ${n * n}칸에 나뉘어 한 칸에 닿는 빛은 ${n * n}분의 1이 됩니다. ` +
                `그래서 겉보기 등급은 ${fmtMag(a.m0)}에서 ${fmtMag(a.m1)}으로 ${a.dm.toFixed(1)}등급 어두워졌지만, ${BASE_PC} pc에 놓았다고 치고 매기는 절대 등급은 ${fmtMag(a.star.abs)} 그대로입니다. ` +
                `${eun(a.star.name)} 표면 온도가 약 ${a.star.temp} K라서 ${a.star.colour}으로 보이는데, 색 역시 거리와는 상관없습니다.`;
            return;
        }
        const far = a.rows.reduce((x, y) => (y.d0 > x.d0 ? y : x));
        const near = a.rows.filter(r => r.d0 === 1)[0];
        labelA.textContent = '가장 먼 은하'; labelB.textContent = '가장 가까운 은하';
        valueA.textContent = `${far.moved.toFixed(1)}칸 멀어짐`;
        valueB.textContent = `${near.moved.toFixed(1)}칸 멀어짐`;
        predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        explanation.textContent =
            `고무줄을 ${a.S}배로 늘리자 ${GALAXIES[a.home]} 은하에서 볼 때 ${near.d0}칸 떨어져 있던 ${near.name} 은하는 ${near.moved.toFixed(1)}칸, ${far.d0}칸 떨어져 있던 ${far.name} 은하는 ${far.moved.toFixed(1)}칸 멀어졌습니다. ` +
            `같은 시간에 ${far.d0}배 멀리 있던 은하가 ${far.d0}배 많이 움직였으니 속도가 거리에 비례합니다. 이것이 허블 법칙이고, 실제 은하들이 이렇게 멀어지는 것은 우주 공간이 팽창하기 때문입니다. ` +
            `서 있는 은하를 바꿔도 똑같은 규칙이 나오므로 어느 은하도 우주의 중심이 아닙니다.`;
    }
    const eul = w => w + (batchim(w) ? '을' : '를');

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
        stageCaption.textContent = state.mode === 'bright'
            ? '점선 네모 한 칸에 들어오던 빛이 멀어질수록 여러 칸으로 퍼집니다.'
            : '내가 서 있는 은하를 바꿔도 멀리 있는 은하가 더 빨리 멀어지는지 보세요.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { star: 'sun', mult: 2, stretch: 2, home: 0, progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'bright').click();
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

    window.__starsModel = {
        STARS, GALAXIES, BASE_PC, MULTIPLES, STRETCH, state,
        analyseBright, analyseExpand, analyse, apparent, brightAt, stretchAt, render,
        runSeconds: () => RUN_SECONDS,
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
