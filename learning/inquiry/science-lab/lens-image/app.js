document.addEventListener('DOMContentLoaded', () => {
    const lensButtons = [...document.querySelectorAll('[data-lens]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const focusRange = document.getElementById('focusRange');
    const distRange = document.getElementById('distRange');
    const focusOutput = document.getElementById('focusOutput');
    const distOutput = document.getElementById('distOutput');
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

    const LENS_X = 230, AXIS_Y = 118, SCALE = 3.3;   // pixels per centimetre
    const OBJ_CM = 5;                                 // how tall the object is
    const BENCH = { x0: 26, x1: 434 };
    // y1 leaves a clear row at the top for the axis title above the 60 tick
    const GRAPH = { x0: 66, x1: 424, y0: 152, y1: 34, aMax: 60, bMax: 60 };

    let lens = 'convex';
    let prediction = null;

    const focal = () => (lens === 'convex' ? 1 : -1) * Number(focusRange.value);
    const dist = () => Number(distRange.value);

    function analyse(f = focal(), a = dist()) {
        // 1/a + 1/b = 1/f, so b = af / (a - f)
        const parallel = Math.abs(a - f) < 1e-9;
        const b = parallel ? Infinity : (a * f) / (a - f);
        const m = parallel ? Infinity : b / a;
        const kind = parallel ? 'none' : b > 0 ? 'real' : 'virtual';
        return { f, a, b, m, kind, parallel, upright: b < 0, magnified: Math.abs(m) > 1 };
    }

    // Each ray is worked out from its own rule, never from the answer.
    function rays(a) {
        const xo = LENS_X - a.a * SCALE;
        const yo = AXIS_Y - OBJ_CM * SCALE;
        const fpx = a.f * SCALE;
        // 1. in parallel to the axis, out through the far focus
        const r1 = { x: LENS_X, y: yo, slope: (AXIS_Y - yo) / fpx };
        // 2. straight through the middle of the lens
        const r2 = { x: LENS_X, y: AXIS_Y, slope: (AXIS_Y - yo) / (LENS_X - xo) };
        // 3. in through the near focus, out parallel to the axis
        const nearF = LENS_X - fpx;
        const yAtLens = nearF === xo ? yo : yo + ((AXIS_Y - yo) * (LENS_X - xo)) / (nearF - xo);
        const r3 = { x: LENS_X, y: yAtLens, slope: 0 };
        return { xo, yo, r1, r2, r3 };
    }

    const at = (r, x) => r.y + r.slope * (x - r.x);
    // a negative focal length needs brackets, or the sums read as "20−-10"
    const sf = v => (v < 0 ? `(−${Math.abs(v)})` : String(v));

    function renderMain(a) {
        const R = rays(a);
        const fpx = a.f * SCALE;
        const imgX = LENS_X + a.b * SCALE;
        const imgY = AXIS_Y + OBJ_CM * SCALE * (a.b / a.a);
        const onScreen = !a.parallel && imgX > BENCH.x0 + 6 && imgX < BENCH.x1 - 6
            && imgY > 18 && imgY < 206;
        let body = '';

        // the bench
        body += `<line class="axis-line" x1="${BENCH.x0}" y1="${AXIS_Y}" x2="${BENCH.x1}" y2="${AXIS_Y}"/>`;
        for (let cm = -60; cm <= 60; cm += 10) {
            const x = LENS_X + cm * SCALE;
            if (x < BENCH.x0 || x > BENCH.x1) continue;
            body += `<line class="tick" x1="${x.toFixed(1)}" y1="${AXIS_Y - 4}" x2="${x.toFixed(1)}" y2="${AXIS_Y + 4}"/>`;
        }
        // the lens itself
        if (lens === 'convex') {
            body += `<path class="lens-body" d="M${LENS_X},${AXIS_Y - 54} Q${LENS_X + 15},${AXIS_Y} ${LENS_X},${AXIS_Y + 54} ` +
                    `Q${LENS_X - 15},${AXIS_Y} ${LENS_X},${AXIS_Y - 54} Z"/>`;
        } else {
            body += `<path class="lens-body" d="M${LENS_X - 9},${AXIS_Y - 54} L${LENS_X + 9},${AXIS_Y - 54} ` +
                    `Q${LENS_X - 1},${AXIS_Y} ${LENS_X + 9},${AXIS_Y + 54} L${LENS_X - 9},${AXIS_Y + 54} ` +
                    `Q${LENS_X + 1},${AXIS_Y} ${LENS_X - 9},${AXIS_Y - 54} Z"/>`;
        }
        // focal points on both sides
        [fpx, -fpx].forEach((d, i) => {
            const x = LENS_X + d;
            body += `<circle class="focus-dot" cx="${x.toFixed(1)}" cy="${AXIS_Y}" r="3.4"/>`;
            body += `<text class="focus-text" x="${x.toFixed(1)}" y="${AXIS_Y + 16}" text-anchor="middle">${i === 0 ? 'F′' : 'F'}</text>`;
        });

        // the object
        body += `<line class="object-arrow" x1="${R.xo.toFixed(1)}" y1="${AXIS_Y}" x2="${R.xo.toFixed(1)}" y2="${R.yo.toFixed(1)}"/>`;
        body += `<path class="object-arrow" d="M${(R.xo - 5).toFixed(1)},${(R.yo + 7).toFixed(1)} L${R.xo.toFixed(1)},${R.yo.toFixed(1)} L${(R.xo + 5).toFixed(1)},${(R.yo + 7).toFixed(1)}"/>`;
        body += `<text class="small-label" x="${R.xo.toFixed(1)}" y="${(R.yo - 8).toFixed(1)}" text-anchor="middle">물체</text>`;

        // the three rays, each drawn from its own rule
        const endX = a.kind === 'virtual' || a.parallel ? BENCH.x1 : Math.min(BENCH.x1, Math.max(imgX, LENS_X + 40));
        [['r1', R.r1], ['r2', R.r2], ['r3', R.r3]].forEach(([cls, r]) => {
            const inFrom = cls === 'r1' ? `M${R.xo.toFixed(1)},${R.yo.toFixed(1)} L${LENS_X},${R.yo.toFixed(1)}`
                : `M${R.xo.toFixed(1)},${R.yo.toFixed(1)} L${LENS_X},${r.y.toFixed(1)}`;
            body += `<path class="ray ${cls}" d="${inFrom}"/>`;
            body += `<path class="ray ${cls}" d="M${LENS_X},${r.y.toFixed(1)} L${endX.toFixed(1)},${at(r, endX).toFixed(1)}"/>`;
            // for a virtual image the rays never really meet, so trace them back
            if (a.kind === 'virtual') {
                body += `<path class="ray ${cls} back" d="M${LENS_X},${r.y.toFixed(1)} L${imgX.toFixed(1)},${at(r, imgX).toFixed(1)}"/>`;
            }
        });

        // the image
        if (onScreen) {
            body += `<line class="image-arrow${a.kind === 'virtual' ? ' virtual' : ''}" x1="${imgX.toFixed(1)}" y1="${AXIS_Y}" x2="${imgX.toFixed(1)}" y2="${imgY.toFixed(1)}"/>`;
            const dir = imgY > AXIS_Y ? -1 : 1;
            body += `<path class="image-arrow${a.kind === 'virtual' ? ' virtual' : ''}" d="M${(imgX - 5).toFixed(1)},${(imgY + dir * 7).toFixed(1)} ` +
                    `L${imgX.toFixed(1)},${imgY.toFixed(1)} L${(imgX + 5).toFixed(1)},${(imgY + dir * 7).toFixed(1)}"/>`;
            body += `<circle class="meet-dot" cx="${imgX.toFixed(1)}" cy="${imgY.toFixed(1)}" r="3.6"/>`;
            // on its own row near the foot of the bench, clear of the focus marks
            const lx = Math.max(44, Math.min(416, imgX));
            body += `<text class="small-label" x="${lx.toFixed(1)}" y="192" text-anchor="middle">${a.kind === 'virtual' ? '허상' : '실상'}</text>`;
        }

        let out = `<g clip-path="url(#benchClip)">${body}</g>`;
        out += `<text class="part-label" x="20" y="20">${lens === 'convex' ? '볼록' : '오목'} 렌즈 · f = ${a.f} cm · a = ${a.a} cm</text>`;
        if (a.parallel) {
            out += `<text class="warn-text" x="20" y="208">물체가 초점에 있어 굴절한 빛이 나란해집니다 — 상이 생기지 않습니다</text>`;
        } else if (!onScreen) {
            out += `<text class="warn-text" x="20" y="208">상이 화면 밖에 생깁니다 — b = ${a.b.toFixed(1)} cm, 배율 ${Math.abs(a.m).toFixed(1)}배</text>`;
        } else {
            out += `<text class="read-text" x="20" y="208">b = ${a.b.toFixed(1)} cm · 배율 ${Math.abs(a.m).toFixed(2)}배 · ${a.kind === 'real' ? '거꾸로 선 실상' : '바로 선 허상'}</text>`;
        }
        mainGroup.innerHTML = out;
    }

    function renderGraph(a) {
        const gx = v => GRAPH.x0 + (v / GRAPH.aMax) * (GRAPH.x1 - GRAPH.x0);
        const gy = v => (GRAPH.y0 + GRAPH.y1) / 2 - (v / GRAPH.bMax) * ((GRAPH.y0 - GRAPH.y1) / 2);
        let out = '';
        [-60, -30, 0, 30, 60].forEach(v => {
            out += `<line class="grid-line" x1="${GRAPH.x0}" y1="${gy(v).toFixed(1)}" x2="${GRAPH.x1}" y2="${gy(v).toFixed(1)}"/>`;
            out += `<text class="axis-text" x="${GRAPH.x0 - 6}" y="${(gy(v) + 3).toFixed(1)}" text-anchor="end">${v}</text>`;
        });
        [0, 15, 30, 45, 60].forEach(v => {
            out += `<text class="axis-text" x="${gx(v).toFixed(1)}" y="${GRAPH.y0 + 14}" text-anchor="middle">${v}</text>`;
        });
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x1}" y2="${GRAPH.y0}"/>`;
        out += `<line class="axis" x1="${GRAPH.x0}" y1="${GRAPH.y0}" x2="${GRAPH.x0}" y2="${GRAPH.y1}"/>`;
        out += `<line class="zero-line" x1="${GRAPH.x0}" y1="${gy(0).toFixed(1)}" x2="${GRAPH.x1}" y2="${gy(0).toFixed(1)}"/>`;
        out += `<text class="axis-title" x="${((GRAPH.x0 + GRAPH.x1) / 2).toFixed(1)}" y="${GRAPH.y0 + 32}" text-anchor="middle">물체 거리 a (cm)</text>`;
        out += `<text class="axis-title" x="22" y="18">상 거리 b (cm)</text>`;

        if (a.f > 0) {
            out += `<line class="asym-line" x1="${gx(a.f).toFixed(1)}" y1="${GRAPH.y1}" x2="${gx(a.f).toFixed(1)}" y2="${GRAPH.y0}"/>`;
            out += `<text class="asym-text" x="${(gx(a.f) + 5).toFixed(1)}" y="${GRAPH.y1 + 10}">a = f ${a.f} cm</text>`;
        }
        // the curve, split at the asymptote so the two branches are not joined
        const branch = (from, to) => {
            const pts = [];
            for (let v = from; v <= to + 1e-9; v += 0.25) {
                const b = analyse(a.f, v).b;
                if (!isFinite(b) || Math.abs(b) > GRAPH.bMax) continue;
                pts.push(`${gx(v).toFixed(1)},${gy(b).toFixed(1)}`);
            }
            return pts.length > 1 ? `<path class="trace" d="M${pts.join('L')}"/>` : '';
        };
        if (a.f > 0) { out += branch(0.25, a.f - 0.25); out += branch(a.f + 0.25, GRAPH.aMax); }
        else out += branch(0.25, GRAPH.aMax);
        if (isFinite(a.b) && Math.abs(a.b) <= GRAPH.bMax) {
            out += `<circle class="trace-dot" cx="${gx(a.a).toFixed(1)}" cy="${gy(a.b).toFixed(1)}" r="5" fill="#d97706"/>`;
        }
        out += `<text class="axis-text" x="${GRAPH.x1 - 4}" y="${(gy(0) - 6).toFixed(1)}" text-anchor="end">b &gt; 0 실상 · b &lt; 0 허상</text>`;
        graphGroup.innerHTML = out;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        renderGraph(a);
        focusOutput.textContent = `${Math.abs(a.f)} cm`;
        distOutput.textContent = `${a.a} cm`;
        stageBadge.textContent = a.parallel ? '상이 생기지 않음'
            : `${a.kind === 'real' ? '실상' : '허상'} · ${Math.abs(a.m).toFixed(2)}배`;
        dataNote.innerHTML = a.parallel
            ? `<div class="data-row"><span class="data-name">렌즈 공식</span><span class="data-val">1/${a.a} + 1/b = 1/${sf(a.f)} → 1/b = 0</span></div>` +
              `<div class="data-row match"><span class="data-name">결과</span><span class="data-val">b가 무한대라 상이 생기지 않습니다</span></div>`
            : `<div class="data-row"><span class="data-name">렌즈 공식</span><span class="data-val">1/${a.a} + 1/b = 1/${sf(a.f)}</span></div>` +
              `<div class="data-row"><span class="data-name">상 거리</span><span class="data-val">b = ${a.a}×${sf(a.f)} ÷ (${a.a}−${sf(a.f)}) = ${a.b.toFixed(2)} cm</span></div>` +
              `<div class="data-row"><span class="data-name">배율</span><span class="data-val">m = b/a = ${a.b.toFixed(2)} ÷ ${a.a} = ${a.m.toFixed(3)}</span></div>` +
              `<div class="data-row"><span class="data-name">상의 크기</span><span class="data-val">${OBJ_CM} cm × ${Math.abs(a.m).toFixed(2)} = ${(OBJ_CM * Math.abs(a.m)).toFixed(2)} cm</span></div>` +
              `<div class="data-row match"><span class="data-name">상의 종류</span><span class="data-val">${a.kind === 'real' ? '실상 · 거꾸로 · 스크린에 비침' : '허상 · 바로 · 스크린에 비치지 않음'}</span></div>`;
        return a;
    }

    function check() {
        const a = render();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        valueA.textContent = a.parallel ? '무한대' : `${a.b.toFixed(1)} cm`;
        valueB.textContent = a.parallel ? '—' : `${Math.abs(a.m).toFixed(2)}배`;
        predictionResult.textContent = !prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === a.kind ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        let s = `1/${a.a} + 1/b = 1/${sf(a.f)}을 풀면 b = ${a.a}×${sf(a.f)} ÷ (${a.a}−${sf(a.f)}) = ${a.b.toFixed(2)} cm 입니다. `;
        if (a.parallel) {
            s = `물체를 초점에 정확히 놓았습니다. 1/b = 1/${sf(a.f)} − 1/${a.a} = 0이 되어 b가 무한대입니다. ` +
                `렌즈를 지난 세 광선이 서로 나란해져 어디에서도 만나지 않으므로 상이 생기지 않습니다. ` +
                `물체를 조금만 더 멀리 옮기면 아주 먼 곳에 큰 실상이 생깁니다.`;
        } else if (a.kind === 'real') {
            s += `b가 양수이므로 빛이 렌즈 뒤 ${a.b.toFixed(1)} cm 에서 실제로 모입니다. 스크린을 대면 비치는 실상이고, 거꾸로 서 있습니다. `;
            s += `배율은 ${a.b.toFixed(2)} ÷ ${a.a} = ${Math.abs(a.m).toFixed(2)}배라 ${a.magnified ? '물체보다 큽니다' : '물체보다 작습니다'}. `;
            s += `작도한 세 광선이 정확히 그 점에서 만나는 것이 렌즈 공식이 맞다는 증거입니다.`;
        } else {
            s += `b가 음수이므로 빛이 실제로 모이지 않습니다. 굴절한 광선을 뒤로 이어야 만나므로 허상이고, 바로 서 있습니다. `;
            s += `배율은 ${Math.abs(a.m).toFixed(2)}배로 ${a.magnified ? '물체보다 크게 보입니다. 돋보기가 이렇게 씁니다' : '물체보다 작게 보입니다'}. `;
            s += a.f < 0
                ? `오목 렌즈는 초점 거리가 음수라 물체를 어디에 두어도 늘 이런 상만 생깁니다.`
                : `물체가 초점 ${a.f} cm 안쪽에 있기 때문입니다.`;
        }
        explanation.textContent = s;
    }

    function changed() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }

    [focusRange, distRange].forEach(el => el.addEventListener('input', () => {
        render(); if (!resultContent.hidden) check();
    }));
    lensButtons.forEach(button => button.addEventListener('click', () => {
        lens = button.dataset.lens;
        lensButtons.forEach(item => item.classList.toggle('selected', item === button));
        stageCaption.textContent = lens === 'convex'
            ? '세 광선은 렌즈 공식이 맞을 때만 한 점에서 만납니다.'
            : '오목 렌즈에서는 광선이 퍼지므로 뒤로 이어야 만납니다.';
        changed();
    }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkBtn.addEventListener('click', check);
    resetBtn.addEventListener('click', () => {
        focusRange.value = '10'; distRange.value = '30';
        prediction = null;
        predictionButtons.forEach(item => item.classList.remove('selected'));
        lensButtons.find(b => b.dataset.lens === 'convex').click();
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

    window.__lensModel = {
        LENS_X, AXIS_Y, SCALE, OBJ_CM, analyse, rays, at, render, check,
        setLens(k) { lensButtons.find(b => b.dataset.lens === k).click(); },
        setFocus(v) { focusRange.value = String(v); focusRange.dispatchEvent(new Event('input')); },
        setDist(v) { distRange.value = String(v); distRange.dispatchEvent(new Event('input')); },
        getLens: () => lens, focal, dist,
    };

    resetBtn.click();
});
