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

    /* -------------------------------------------------------------- data */
    // Each bar magnet is two poles a magnet-length apart. Poles pull or push
    // with a force that falls with the square of their distance; adding the
    // four pole pairs gives like poles repelling and unlike poles attracting.
    const MAG_LEN = 0.04;           // m
    const KQQ = 0.0006;             // N·m², the strength of one pole pair
    const MASS = 0.05, MU = 0.25, G = 9.8;
    const FRICTION = MU * MASS * G; // N needed before the free magnet slides
    const NAIL_K = 1.6e-7;          // an iron nail: pulled as 1/gap⁴, ~1 N at 2 cm
    const SIM_SECONDS = 3;

    const FACING = {
        NS: { label: 'N극 ↔ S극', hint: '다른 극', left: 'N', right: 'S' },
        NN: { label: 'N극 ↔ N극', hint: '같은 극', left: 'N', right: 'N' },
        SS: { label: 'S극 ↔ S극', hint: '같은 극', left: 'S', right: 'S' },
        nail: { label: '자석 ↔ 쇠못', hint: '철로 된 물체', left: 'N', right: null },
    };
    const GAPS = [2, 4, 6];        // cm

    // Compass: the needle lines up with the bar magnet's field plus the Earth's.
    const Q_POLE = 1;               // magnet pole strength, arbitrary units
    const EARTH = 0.0015;           // Earth's field in the same units, pointing north (up)
    const PLACES = {
        nSide: { label: 'N극 옆', angle: 0 },
        above: { label: '자석 위', angle: -90 },
        sSide: { label: 'S극 옆', angle: 180 },
        below: { label: '자석 아래', angle: 90 },
    };
    const DISTS = [3, 10, 30];      // cm from the magnet's centre

    const state = {
        mode: 'force',
        facing: 'NS', gap: 4,
        place: 'nSide', dist: 3,
        progress: 0, prediction: null,
    };
    let running = false, frameId = 0, lastStamp = 0;

    /* ------------------------------------------------------------ models */
    // force on the free object at a given gap (m); positive pulls it toward the fixed magnet
    function forceAt(gap, facing) {
        const f = FACING[facing];
        if (f.right === null) return NAIL_K / Math.pow(Math.max(gap, 0.002), 4);
        // fixed magnet poles: far end at -L, facing pole at 0; free: facing pole at gap, far end at gap+L
        const leftPoles = [{ x: -MAG_LEN, s: f.left === 'N' ? -1 : 1 }, { x: 0, s: f.left === 'N' ? 1 : -1 }];
        const rightPoles = [{ x: gap, s: f.right === 'N' ? 1 : -1 }, { x: gap + MAG_LEN, s: f.right === 'N' ? -1 : 1 }];
        let total = 0;
        leftPoles.forEach(a => rightPoles.forEach(b => {
            const r = Math.max(b.x - a.x, 0.003);
            // like poles (same sign) push the free object away: negative
            total += -(a.s * b.s) * KQQ / (r * r);
        }));
        return total;
    }

    function analyseForce(s = state) {
        const f = FACING[s.facing];
        const gap0 = s.gap / 100;
        const f0 = forceAt(gap0, s.facing);
        // march the free object along the track under magnet force and friction
        const DT = 0.001;
        const path = [];
        let x = gap0, v = 0, moving = false, stuck = false;
        for (let t = 0, i = 0; t <= SIM_SECONDS + 1e-9; t += DT, i += 1) {
            if (i % 20 === 0) path.push({ t, gap: x, v, F: forceAt(x, s.facing) });
            if (stuck) continue;
            const F = forceAt(x, s.facing);
            if (!moving) {
                if (Math.abs(F) > FRICTION) moving = true; else continue;
            }
            const a = (-F - (v > 0 ? FRICTION : v < 0 ? -FRICTION : 0)) / MASS;   // F pulls toward smaller gap
            v += a * DT;
            x += v * DT;
            if (x <= 0) { x = 0; v = 0; stuck = true; }
            if (moving && Math.abs(v) < 0.005 && Math.abs(F) <= FRICTION) { v = 0; moving = false; }
        }
        const end = path[path.length - 1];
        const verdict = end.gap <= 1e-6 ? 'stick' : end.gap > gap0 + 0.002 ? 'push' : 'still';
        return { kind: 'force', f, gap0, f0, path, end, verdict, moved: end.gap - gap0 };
    }

    const forceAtProgress = (a, p) => {
        const t = p * SIM_SECONDS;
        let lo = 0, hi = a.path.length - 1;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (a.path[mid].t < t) lo = mid + 1; else hi = mid; }
        return a.path[lo];
    };

    // field of the bar magnet (centre at origin, N pole at +x) plus the Earth's, in cm coordinates
    function fieldAt(px, py, nRight = true) {
        const half = (MAG_LEN * 100) / 2;
        const poles = [{ x: nRight ? half : -half, y: 0, s: 1 }, { x: nRight ? -half : half, y: 0, s: -1 }];
        let bx = 0, by = -EARTH;   // north is up on the screen
        poles.forEach(pl => {
            const dx = px - pl.x, dy = py - pl.y;
            const r = Math.max(Math.hypot(dx, dy), 0.5);
            bx += pl.s * Q_POLE * dx / (r * r * r);
            by += pl.s * Q_POLE * dy / (r * r * r);
        });
        return { bx, by };
    }

    function analyseCompass(s = state) {
        const place = PLACES[s.place];
        const ang = place.angle * Math.PI / 180;
        const px = s.dist * Math.cos(ang), py = s.dist * Math.sin(ang);
        const b = fieldAt(px, py);
        const earthOnly = { bx: 0, by: -EARTH };
        const magOnly = { bx: b.bx, by: b.by + EARTH };
        const magStrength = Math.hypot(magOnly.bx, magOnly.by), ratio = magStrength / EARTH;
        const needle = Math.atan2(b.by, b.bx);            // screen angle of the needle's N end
        const verdict = ratio < 0.5 ? 'north' : 'toS';
        return { kind: 'compass', place, px, py, b, ratio, needle, verdict, earthOnly, magOnly };
    }

    const analyse = () => (state.mode === 'force' ? analyseForce() : analyseCompass());

    /* ---------------------------------------------------------- controls */
    function pickRow(legend, name, options, current, cols) {
        return `<fieldset class="pick-field"><legend>${legend}</legend>` +
            `<div class="pick-buttons cols${cols}" data-pick="${name}">` +
            options.map(o => `<button type="button" data-value="${o.value}" class="${o.value === String(current) ? 'selected' : ''}">` +
                `${o.label}${o.hint ? `<small>${o.hint}</small>` : ''}</button>`).join('') +
            `</div></fieldset>`;
    }

    function buildControls() {
        if (state.mode === 'force') {
            controlArea.innerHTML =
                pickRow('마주 보는 것', 'facing', Object.entries(FACING).map(([k, v]) => ({ value: k, label: v.label, hint: v.hint })), state.facing, 2) +
                pickRow('처음 떨어진 거리', 'gap', GAPS.map(g => ({ value: String(g), label: `${g} cm` })), state.gap, 3);
        } else {
            controlArea.innerHTML =
                pickRow('나침반을 놓는 자리', 'place', Object.entries(PLACES).map(([k, v]) => ({ value: k, label: v.label })), state.place, 4) +
                pickRow('자석 가운데에서 떨어진 거리', 'dist', DISTS.map(d => ({ value: String(d), label: `${d} cm`, hint: d === 3 ? '가까이' : d === 10 ? '조금 멀리' : '아주 멀리' })), state.dist, 3);
        }
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                const v = button.dataset.value;
                state[group.dataset.pick] = ['gap', 'dist'].includes(group.dataset.pick) ? Number(v) : v;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                settingsChanged();
            }));
        });
    }

    const PRED_FORCE = [{ value: 'stick', label: '끌려가 붙는다' }, { value: 'push', label: '밀려난다' }, { value: 'still', label: '움직이지 않는다' }];
    const PRED_COMPASS = [{ value: 'toS', label: '자석의 S극 쪽' }, { value: 'toN', label: '자석의 N극 쪽' }, { value: 'north', label: '북쪽' }];

    function buildPrediction() {
        const list = state.mode === 'force' ? PRED_FORCE : PRED_COMPASS;
        predictionLegend.textContent = state.mode === 'force' ? '오른쪽 것은 어떻게 될까요?' : '바늘의 N극은 어디를 가리킬까요?';
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}">${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    const PX_PER_CM = 14;

    function barMagnet(x, y, w, h, leftPole, rightPole) {
        const half = w / 2;
        let out = `<rect class="pole-${leftPole.toLowerCase()}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${half.toFixed(1)}" height="${h.toFixed(1)}" rx="3"/>` +
            `<rect class="pole-${rightPole.toLowerCase()}" x="${(x + half).toFixed(1)}" y="${y.toFixed(1)}" width="${half.toFixed(1)}" height="${h.toFixed(1)}" rx="3"/>`;
        // too small a magnet has no room for its letters
        if (half >= 14 && h >= 14) out += `<text class="pole-text" x="${(x + half / 2).toFixed(1)}" y="${(y + h / 2 + 4).toFixed(1)}" text-anchor="middle">${leftPole}</text>` +
            `<text class="pole-text" x="${(x + half * 1.5).toFixed(1)}" y="${(y + h / 2 + 4).toFixed(1)}" text-anchor="middle">${rightPole}</text>`;
        return out;
    }

    function renderForce(a, p) {
        const q = forceAtProgress(a, p);
        const TY = 150, MH = 28, MW = MAG_LEN * 100 * PX_PER_CM;   // 88 px
        const LX = 40;                                                 // fixed magnet's left edge
        let out = `<rect class="table" x="20" y="${TY + MH}" width="420" height="10" rx="3"/>`;
        // fixed magnet
        const f = a.f;
        const leftFar = f.left === 'N' ? 'S' : 'N';
        out += barMagnet(LX, TY, MW, MH, leftFar, f.left);
        out += `<text class="small-label" x="${LX + MW / 2}" y="${TY - 8}" text-anchor="middle">고정한 자석</text>`;
        // free object
        const FX = LX + MW + q.gap * 100 * PX_PER_CM;
        if (f.right === null) {
            out += `<rect class="nail" x="${FX.toFixed(1)}" y="${TY + 8}" width="60" height="12" rx="2"/>`;
            out += `<path class="nail" d="M${(FX + 60).toFixed(1)},${TY + 8} l10,6 l-10,6 z"/>`;
            out += `<text class="small-label" x="${(FX + 35).toFixed(1)}" y="${TY - 8}" text-anchor="middle">쇠못</text>`;
        } else {
            const rightFar = f.right === 'N' ? 'S' : 'N';
            out += barMagnet(FX, TY, MW, MH, f.right, rightFar);
            out += `<text class="small-label" x="${(FX + MW / 2).toFixed(1)}" y="${TY - 8}" text-anchor="middle">움직이는 자석</text>`;
        }
        // the force arrow on the free object: toward the fixed magnet when positive
        const F = q.F, mag = Math.min(90, Math.abs(F) * 60);
        if (mag > 2) {
            const dir = F > 0 ? -1 : 1;
            const ax0 = FX + (f.right === null ? 30 : MW / 2), ay = TY - 30;
            const ax1 = ax0 + dir * mag;
            out += `<line class="force-arrow" x1="${ax0.toFixed(1)}" y1="${ay}" x2="${ax1.toFixed(1)}" y2="${ay}"/>`;
            out += `<path class="force-head" d="M${ax1.toFixed(1)},${ay} l${(-dir * 9).toFixed(1)},-5 l0,10 z"/>`;
            out += `<text class="small-label" fill="#d97706" x="${((ax0 + ax1) / 2).toFixed(1)}" y="${ay - 8}" text-anchor="middle">${F > 0 ? '끌어당김' : '밀어냄'} ${Math.abs(F).toFixed(2)} N</text>`;
        }
        // gap marker
        if (q.gap > 0.002) {
            const gx0 = LX + MW, gx1 = FX;
            out += `<line class="ruler" x1="${gx0}" y1="${TY + MH + 18}" x2="${gx1.toFixed(1)}" y2="${TY + MH + 18}"/>`;
            out += `<text class="axis-text" x="${((gx0 + gx1) / 2).toFixed(1)}" y="${TY + MH + 31}" text-anchor="middle">${(q.gap * 100).toFixed(1)} cm</text>`;
        } else {
            out += `<text class="axis-text" x="${(LX + MW).toFixed(1)}" y="${TY + MH + 31}" text-anchor="middle">붙었습니다</text>`;
        }
        const VERD = { stick: '끌려가 붙는다', push: '밀려난다', still: '움직이지 않는다' };
        out += `<text class="verdict-text" fill="#d97706" x="20" y="16">${f.label} · ${state.gap} cm → ${VERD[a.verdict]}</text>`;
        out += `<text class="note-text" x="20" y="34">바닥 마찰: ${FRICTION.toFixed(2)} N보다 센 힘이어야 움직입니다 · 지난 시간 ${q.t.toFixed(1)}초</text>`;
        return out;
    }

    // a short field line traced from a start point, both ways
    function fieldLine(sx, sy, toPx) {
        const pts = [];
        [1, -1].forEach(dir => {
            let x = sx, y = sy;
            const seg = [];
            for (let i = 0; i < 160; i += 1) {
                const b = fieldAt(x, y);
                b.by += EARTH;   // trace the magnet's own field
                const m = Math.hypot(b.bx, b.by);
                if (m < 1e-6) break;
                x += dir * 0.25 * b.bx / m; y += dir * 0.25 * b.by / m;
                if (Math.abs(x) > 11 || Math.abs(y) > 5) break;
                if (Math.hypot(x - 2, y) < 0.6 || Math.hypot(x + 2, y) < 0.6) break;
                seg.push(toPx(x, y));
            }
            if (dir === -1) seg.reverse();
            pts.push(...(dir === -1 ? seg : []), ...(dir === 1 ? seg : []));
        });
        return pts;
    }

    function compassAt(cx, cy, r, angle, chosen) {
        const nx = cx + r * 0.8 * Math.cos(angle), ny = cy + r * 0.8 * Math.sin(angle);
        const sx = cx - r * 0.8 * Math.cos(angle), sy = cy - r * 0.8 * Math.sin(angle);
        const wx = r * 0.22 * Math.sin(angle), wy = -r * 0.22 * Math.cos(angle);
        return `<circle class="compass${chosen ? ' chosen' : ''}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"/>` +
            `<path class="needle-n" d="M${nx.toFixed(1)},${ny.toFixed(1)} L${(cx + wx).toFixed(1)},${(cy + wy).toFixed(1)} L${(cx - wx).toFixed(1)},${(cy - wy).toFixed(1)} Z"/>` +
            `<path class="needle-s" d="M${sx.toFixed(1)},${sy.toFixed(1)} L${(cx + wx).toFixed(1)},${(cy + wy).toFixed(1)} L${(cx - wx).toFixed(1)},${(cy - wy).toFixed(1)} Z"/>`;
    }

    function renderCompass(a, p) {
        const CX = 210, CY = 118;
        const MAG_SCALE = 14;
        const toPxField = (x, y) => ({ x: CX + x * MAG_SCALE, y: CY + y * MAG_SCALE });
        let out = '';
        // field lines of the magnet (stable, fixed scale)
        [-1.6, -0.9, 0, 0.9, 1.6].forEach(dy => {
            const pts = fieldLine(2.3, dy, toPxField);
            if (pts.length > 2) out += `<path class="field-line" d="M${pts.map(q => `${q.x.toFixed(1)},${q.y.toFixed(1)}`).join('L')}"/>`;
        });
        // the magnet, N pole to the right (stable, fixed size: 63px x 20px)
        const MW = MAG_LEN * 100 * MAG_SCALE, MH = 20;
        out += barMagnet(CX - MW / 2, CY - MH / 2, MW, MH, 'S', 'N');
        // the needle swings from north to where it settles, overshooting a little
        const target = a.needle, start = -Math.PI / 2;
        let diff = target - start; while (diff > Math.PI) diff -= 2 * Math.PI; while (diff < -Math.PI) diff += 2 * Math.PI;
        const tt = p * 4;
        const angle = target - diff * Math.exp(-2.2 * tt) * Math.cos(5 * tt);

        // Distance offset from magnet center in pixels:
        // 3 cm: 58px (right beside pole: 31.5px + 26.5px)
        // 10 cm: 112px (mid distance)
        // 30 cm: 172px (far distance)
        const distPx = state.dist === 3 ? 58 : state.dist === 10 ? 112 : 172;
        const getCompassPos = (angDeg) => {
            const rad = angDeg * Math.PI / 180;
            const x = CX + distPx * Math.cos(rad);
            const y = CY + Math.min(68, distPx * 0.44) * Math.sin(rad);
            return { x, y };
        };

        // the other three places, small and already settled, show the pattern
        Object.entries(PLACES).forEach(([k, pl]) => {
            if (k === state.place) return;
            const pos = getCompassPos(pl.angle);
            const angRad = pl.angle * Math.PI / 180;
            const px = state.dist * Math.cos(angRad), py = state.dist * Math.sin(angRad);
            const b = fieldAt(px, py);
            out += compassAt(pos.x, pos.y, 11, Math.atan2(b.by, b.bx), false);
        });
        const me = getCompassPos(a.place.angle);
        out += compassAt(me.x, me.y, 18, angle, true);
        // the label goes above a compass that sits low on the screen
        const labelY = state.place === 'below' ? me.y - 24 : me.y + 30;
        out += `<text class="small-label" x="${me.x.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle">${a.place.label} ${state.dist} cm</text>`;
        // north marker
        out += `<text class="north-text" x="428" y="36" text-anchor="middle">북 ↑</text>`;
        out += `<text class="note-text" x="428" y="52" text-anchor="middle">위쪽이 북쪽</text>`;
        const VERD = { toS: '자석의 S극 쪽', north: '북쪽' };
        out += `<text class="verdict-text" fill="var(--primary)" x="20" y="18">${a.place.label} ${state.dist} cm → 바늘 N극은 ${VERD[a.verdict]}</text>`;
        out += `<text class="note-text" x="20" y="36">여기서 자석의 힘은 지구의 ${a.ratio >= 10 ? Math.round(a.ratio) : a.ratio.toFixed(1)}배</text>`;
        out += `<text class="note-text" x="20" y="206">옅은 선: 자석의 힘이 뻗어 나가는 길 · 작은 나침반: 다른 자리에 놓았을 때</text>`;
        return out;
    }

    function renderMain(a) {
        mainGroup.innerHTML = a.kind === 'force' ? renderForce(a, state.progress) : renderCompass(a, state.progress);
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

    // how strong the pull or push is at each gap, with the friction it must beat
    function graphForce(a) {
        const q = forceAtProgress(a, state.progress);
        const gMax = 8, fMax = 1.5;
        const gx = cm => GRAPH.x0 + (cm / gMax) * (GRAPH.x1 - GRAPH.x0);
        const gy = f => GRAPH.y0 - Math.min(1, f / fMax) * (GRAPH.y0 - GRAPH.y1);
        let out = graphFrame(
            [0, 2, 4, 6, 8].map(c => [`${c} cm`, gx(c)]),
            [0.5, 1.0, 1.5].map(f => [`${f.toFixed(1)} N`, gy(f)]),
            '떨어진 거리', '힘의 세기');
        const pts = [];
        for (let cm = 0.6; cm <= gMax + 1e-9; cm += 0.1) pts.push(`${gx(cm).toFixed(1)},${gy(Math.abs(forceAt(cm / 100, state.facing))).toFixed(1)}`);
        out += `<path class="trace" style="stroke:#d97706" d="M${pts.join('L')}"/>`;
        out += `<line class="friction-line" x1="${GRAPH.x0}" y1="${gy(FRICTION).toFixed(1)}" x2="${GRAPH.x1}" y2="${gy(FRICTION).toFixed(1)}"/>`;
        out += `<text class="friction-text" x="${GRAPH.x1 - 4}" y="${(gy(FRICTION) - 5).toFixed(1)}" text-anchor="end">마찰 ${FRICTION.toFixed(2)} N — 이보다 세야 움직임</text>`;
        out += `<circle class="trace-dot" cx="${gx(Math.max(0.6, q.gap * 100)).toFixed(1)}" cy="${gy(Math.abs(q.F)).toFixed(1)}" r="5" fill="#d97706"/>`;
        out += `<text class="note-text" x="${GRAPH.x0 + 8}" y="${GRAPH.y1 + 14}">${a.f.right === null ? '쇠못을 끄는 힘' : a.f0 > 0 ? '끌어당기는 힘' : '밀어내는 힘'} — 가까울수록 세고 멀어지면 빠르게 약해집니다</text>`;
        return out;
    }

    // the magnet's pull on the needle against the Earth's, at the three distances
    function graphCompass(a) {
        const rows = DISTS.map(d => {
            const ang = a.place.angle * Math.PI / 180;
            const b = fieldAt(d * Math.cos(ang), d * Math.sin(ang));
            return { d, ratio: Math.hypot(b.bx, b.by + EARTH) / EARTH };
        });
        const max = Math.max(...rows.map(r => r.ratio), 2) * 1.08;
        const gx = v => GRAPH.x0 + (Math.log10(1 + v) / Math.log10(1 + max)) * (GRAPH.x1 - GRAPH.x0);
        let out = graphFrame([[0, gx(0)], [1, gx(1)], [10, gx(10)], [100, gx(100)]].filter(t => t[0] <= max), [], '지구의 힘을 1로 했을 때 자석의 힘 (칸이 갈수록 촘촘해짐)', '');
        rows.forEach((r, i) => {
            const y = GRAPH.y1 + 24 + i * 32;
            const chosen = r.d === state.dist;
            out += `<text class="bar-text" fill="${chosen ? '#d97706' : '#334155'}" x="${GRAPH.x0}" y="${y - 9}">${a.place.label} ${r.d} cm — 지구의 ${r.ratio >= 10 ? Math.round(r.ratio) : r.ratio.toFixed(1)}배${r.ratio < 0.5 ? ' → 북쪽을 가리킴' : ' → 자석 쪽으로 돌아감'}</text>`;
            out += `<rect class="bar" x="${GRAPH.x0}" y="${y - 4}" width="${Math.max(2, gx(r.ratio) - GRAPH.x0).toFixed(1)}" height="11" rx="3" fill="${chosen ? '#d97706' : '#6f8f8d'}" opacity=".85"/>`;
        });
        out += `<line class="friction-line" x1="${gx(1).toFixed(1)}" y1="${GRAPH.y1 + 8}" x2="${gx(1).toFixed(1)}" y2="${GRAPH.y0}"/>`;
        out += `<text class="friction-text" x="${(gx(1) + 4).toFixed(1)}" y="${GRAPH.y0 - 6}">지구의 힘과 같음</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'force') {
            const q = forceAtProgress(a, state.progress);
            return `<div class="data-row"><span class="data-name">마주 보는 것</span><span class="data-val">${a.f.label} (${a.f.hint})</span></div>` +
                `<div class="data-row"><span class="data-name">처음 힘</span><span class="data-val">${state.gap} cm에서 ${Math.abs(a.f0).toFixed(2)} N ${a.f0 > 0 ? '끌어당김' : '밀어냄'}</span></div>` +
                `<div class="data-row"><span class="data-name">바닥 마찰</span><span class="data-val">${FRICTION.toFixed(2)} N — ${Math.abs(a.f0) > FRICTION ? '자석의 힘이 더 세서 움직임' : '자석의 힘이 못 이겨 그대로'}</span></div>` +
                `<div class="data-row"><span class="data-name">지금</span><span class="data-val">${q.t.toFixed(1)}초 · 거리 ${(q.gap * 100).toFixed(1)} cm · 힘 ${Math.abs(q.F).toFixed(2)} N</span></div>` +
                `<div class="data-row match"><span class="data-name">${SIM_SECONDS}초 뒤</span><span class="data-val">${a.verdict === 'stick' ? '붙음' : a.verdict === 'push' ? `${(a.moved * 100).toFixed(1)} cm 밀려나 ${(a.end.gap * 100).toFixed(1)} cm에서 멈춤` : '그대로'}</span></div>`;
        }
        return `<div class="data-row"><span class="data-name">나침반 자리</span><span class="data-val">${a.place.label} · 자석 가운데에서 ${state.dist} cm</span></div>` +
            `<div class="data-row"><span class="data-name">자석의 힘</span><span class="data-val">지구의 ${a.ratio >= 10 ? Math.round(a.ratio) : a.ratio.toFixed(2)}배</span></div>` +
            `<div class="data-row"><span class="data-name">바늘 방향</span><span class="data-val">${(() => { const deg = ((a.needle * 180 / Math.PI) + 90 + 360) % 360; return `북쪽에서 ${deg <= 180 ? '오른쪽' : '왼쪽'}으로 ${Math.round(deg <= 180 ? deg : 360 - deg)}°`; })()}</span></div>` +
            `<div class="data-row match"><span class="data-name">가리키는 곳</span><span class="data-val">${a.verdict === 'north' ? '북쪽 — 지구가 큰 자석' : '자석의 S극 쪽 — 다른 극에 끌림'}</span></div>`;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        graphGroup.innerHTML = a.kind === 'force' ? graphForce(a) : graphCompass(a);
        stageBadge.textContent = a.kind === 'force' ? `${a.f.label} · ${state.gap} cm` : `${a.place.label} · ${state.dist} cm`;
        methodHint.textContent = state.mode === 'force'
            ? '같은 극은 서로 밀고, 다른 극은 서로 끌어당깁니다'
            : '나침반 바늘도 자석이어서 곁의 자석에 끌리고, 자석이 없으면 북쪽을 가리킵니다';
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
        if (a.kind === 'force') {
            labelA.textContent = '결과'; labelB.textContent = '처음 힘';
            valueA.textContent = a.verdict === 'stick' ? '붙었다' : a.verdict === 'push' ? `${(a.moved * 100).toFixed(1)} cm 밀려남` : '움직이지 않음';
            valueB.textContent = `${Math.abs(a.f0).toFixed(2)} N`;
            predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
                : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
            let s = '';
            if (a.f.right === null) {
                s = a.verdict === 'stick'
                    ? `쇠못은 자석의 어느 극에나 끌려 붙습니다. 자석 가까이 가면 못이 잠깐 자석처럼 되어 자석과 다른 극으로 마주하기 때문입니다. ${state.gap} cm에서 ${a.f0.toFixed(2)} N으로 끌려 붙었습니다.`
                    : `쇠못도 자석에 끌리지만 ${state.gap} cm에서는 힘이 ${a.f0.toFixed(2)} N밖에 되지 않아 바닥 마찰 ${FRICTION.toFixed(2)} N을 이기지 못했습니다. 못이 자석에 붙지 않는 것이 아니라, 멀어서 힘이 약해진 것입니다. 거리를 줄여 보세요.`;
            } else if (a.f0 > 0) {
                s = a.verdict === 'stick'
                    ? `${a.f.left}극과 ${a.f.right}극은 다른 극이어서 서로 끌어당깁니다. ${state.gap} cm에서 ${a.f0.toFixed(2)} N이던 힘이 가까워질수록 더 세져 결국 붙었습니다.`
                    : `다른 극이어서 끌어당기지만 ${state.gap} cm에서는 ${a.f0.toFixed(2)} N으로 마찰 ${FRICTION.toFixed(2)} N을 이기지 못해 움직이지 않았습니다.`;
            } else {
                s = a.verdict === 'push'
                    ? `${a.f.left}극과 ${a.f.right}극은 같은 극이어서 서로 밀어냅니다. ${state.gap} cm에서 ${Math.abs(a.f0).toFixed(2)} N으로 밀려 ${(a.moved * 100).toFixed(1)} cm 물러난 뒤, 멀어져 힘이 약해지자 마찰 때문에 ${(a.end.gap * 100).toFixed(1)} cm에서 멈췄습니다.`
                    : `같은 극이어서 밀어내지만 ${state.gap} cm에서는 힘이 ${Math.abs(a.f0).toFixed(2)} N으로 마찰 ${FRICTION.toFixed(2)} N보다 약해 움직이지 않았습니다. 가까이 놓으면 밀려납니다.`;
            }
            explanation.textContent = s;
            return;
        }
        labelA.textContent = '바늘 N극'; labelB.textContent = '자석의 힘';
        valueA.textContent = a.verdict === 'north' ? '북쪽' : '자석의 S극 쪽';
        valueB.textContent = `지구의 ${a.ratio >= 10 ? Math.round(a.ratio) : a.ratio.toFixed(1)}배`;
        predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        let s = `${a.place.label} ${state.dist} cm에 놓은 나침반에는 자석의 힘이 지구의 ${a.ratio >= 10 ? Math.round(a.ratio) : a.ratio.toFixed(1)}배로 미칩니다. `;
        if (a.verdict === 'north') s += `자석에서 이렇게 멀면 자석의 힘이 지구의 힘보다 약해져 바늘은 거의 북쪽을 가리킵니다. 자석이 없어도 바늘이 북쪽을 가리키는 것은 지구가 커다란 자석이기 때문입니다.`;
        else s += `바늘도 자석이어서 N극이 다른 극인 자석의 S극 쪽으로 돌아갑니다. 자석 둘레 어디에 놓아도 바늘은 자석의 힘이 뻗어 나가는 길을 따라 놓입니다. 자석을 치우면 다시 북쪽으로 돌아갑니다.`;
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
        stageCaption.textContent = state.mode === 'force'
            ? '왼쪽 자석은 고정되어 있고 오른쪽 것만 움직일 수 있습니다. 노란 화살표가 힘의 방향과 세기입니다.'
            : '큰 나침반이 내가 놓은 것, 작은 나침반은 다른 자리에 놓았을 때 모습입니다. 위쪽이 북쪽입니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { facing: 'NS', gap: 4, place: 'nSide', dist: 3, progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'force').click();
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

    window.__magnetModel = {
        FACING, GAPS, PLACES, DISTS, FRICTION, EARTH, state,
        analyseForce, analyseCompass, analyse, forceAt, fieldAt, render,
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
