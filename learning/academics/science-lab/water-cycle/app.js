document.addEventListener('DOMContentLoaded', () => {
    const sunRange = document.getElementById('sunRange');
    const tempRange = document.getElementById('tempRange');
    const sunOutput = document.getElementById('sunOutput');
    const tempOutput = document.getElementById('tempOutput');
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const runBtn = document.getElementById('runBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const resultTotal = document.getElementById('resultTotal');
    const resultTime = document.getElementById('resultTime');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const sunBeams = document.getElementById('sunBeams');
    const sunDisc = document.getElementById('sunDisc');
    const cloudGroup = document.getElementById('cloudGroup');
    const rainGroup = document.getElementById('rainGroup');
    const vaporGroup = document.getElementById('vaporGroup');
    const seaRect = document.getElementById('seaRect');
    const seaSurface = document.getElementById('seaSurface');
    const riverPath = document.getElementById('riverPath');
    const reservoirBars = document.getElementById('reservoirBars');

    // Four reservoirs holding a fixed amount of water between them. Every flow
    // below moves water from one reservoir to another and never creates or
    // destroys any, so the total is conserved by construction — which is the
    // whole point of the lesson, not something tuned to look right.
    const TOTAL = 1000;
    const INITIAL = { sea: 850, vapor: 40, cloud: 40, land: 70 };
    const SEA_REF = 850;

    const K_EVAP = 0.10, K_COND = 0.18, K_PRECIP = 0.12, K_RUNOFF = 0.10;
    const CLOUD_MIN = 25;        // a thin cloud does not rain yet
    const LAND_FRAC = 0.30;      // share of rain that lands on ground, not sea
    const DT = 0.05;             // simulated days per solver step
    const DAYS_PER_SECOND = 2;

    let R = { ...INITIAL };
    let days = 0;
    let running = false;
    let prediction = null;
    let rafId = null, lastT = null;

    const total = () => R.sea + R.vapor + R.cloud + R.land;

    // One step of the compartment model. Each flow is capped by what the
    // source reservoir actually holds, so a reservoir can never go negative
    // and the water taken out is exactly the water put in.
    function step() {
        const sun = Number(sunRange.value) / 10;
        const cool = (11 - Number(tempRange.value)) / 10;

        let evap = K_EVAP * sun * (R.sea / SEA_REF) * DT * 100;
        let cond = K_COND * cool * R.vapor * DT;
        let precip = K_PRECIP * Math.max(0, R.cloud - CLOUD_MIN) * DT;
        let runoff = K_RUNOFF * R.land * DT;

        evap = Math.min(evap, R.sea);
        cond = Math.min(cond, R.vapor);
        precip = Math.min(precip, R.cloud);
        runoff = Math.min(runoff, R.land);

        R.sea += -evap + precip * (1 - LAND_FRAC) + runoff;
        R.vapor += evap - cond;
        R.cloud += cond - precip;
        R.land += precip * LAND_FRAC - runoff;

        days += DT;
        return { evap, cond, precip, runoff };
    }

    function advanceSim(simDays) {
        const steps = Math.round(simDays / DT);
        let last = null;
        for (let i = 0; i < steps; i += 1) last = step();
        return last;
    }

    function currentFlows() {
        const sun = Number(sunRange.value) / 10;
        const cool = (11 - Number(tempRange.value)) / 10;
        return {
            evap: K_EVAP * sun * (R.sea / SEA_REF) * DT * 100,
            cond: K_COND * cool * R.vapor * DT,
            precip: K_PRECIP * Math.max(0, R.cloud - CLOUD_MIN) * DT,
        };
    }

    function buildBeams() {
        let out = '';
        for (let i = 0; i < 5; i += 1) {
            const a = (215 + i * 25) * Math.PI / 180;
            out += `<line class="sun-beam" x1="${(60 + 27 * Math.cos(a)).toFixed(1)}" y1="${(46 + 27 * Math.sin(a)).toFixed(1)}" x2="${(60 + 38 * Math.cos(a)).toFixed(1)}" y2="${(46 + 38 * Math.sin(a)).toFixed(1)}"/>`;
        }
        sunBeams.innerHTML = out;
    }

    function render() {
        const sun = Number(sunRange.value);
        sunDisc.setAttribute('r', (14 + sun * 0.7).toFixed(1));
        sunBeams.setAttribute('opacity', (0.25 + 0.075 * sun).toFixed(2));

        // sea level tracks how much water the sea currently holds
        const seaH = Math.max(14, Math.min(140, 88 * (R.sea / SEA_REF)));
        const seaTop = 300 - seaH;
        seaRect.setAttribute('y', seaTop.toFixed(1));
        seaRect.setAttribute('height', seaH.toFixed(1));
        seaSurface.setAttribute('y1', seaTop.toFixed(1));
        seaSurface.setAttribute('y2', seaTop.toFixed(1));

        // the river swells with the water sitting on land
        riverPath.setAttribute('stroke-width', Math.max(1.5, Math.min(11, R.land / 9)).toFixed(1));

        // cloud grows with the condensed water it holds
        const s = Math.max(0.35, Math.min(2.1, R.cloud / 55));
        const cx = 300, cy = 78;
        cloudGroup.innerHTML =
            `<ellipse class="cloud-puff" cx="${cx - 26 * s}" cy="${cy + 4}" rx="${26 * s}" ry="${15 * s}" opacity="${(0.5 + 0.35 * Math.min(1, s)).toFixed(2)}"/>` +
            `<ellipse class="cloud-puff" cx="${cx}" cy="${cy - 6 * s}" rx="${32 * s}" ry="${20 * s}" opacity="${(0.55 + 0.35 * Math.min(1, s)).toFixed(2)}"/>` +
            `<ellipse class="cloud-puff" cx="${cx + 28 * s}" cy="${cy + 4}" rx="${24 * s}" ry="${14 * s}" opacity="${(0.5 + 0.35 * Math.min(1, s)).toFixed(2)}"/>`;

        // rising vapour: how many wisps reflects how much water is in the air
        const vaporCount = Math.max(0, Math.min(14, Math.round(R.vapor / 7)));
        let vout = '';
        for (let i = 0; i < vaporCount; i += 1) {
            const x = 250 + ((i * 37) % 190);
            const delay = ((i * 0.37) % 2.2).toFixed(2);
            vout += `<circle class="vapor" cx="${x}" cy="${(seaTop - 6).toFixed(1)}" r="${(2.6 + (i % 3) * 0.7).toFixed(1)}">` +
                    `<animate attributeName="cy" from="${(seaTop - 6).toFixed(1)}" to="102" dur="2.6s" begin="${delay}s" repeatCount="indefinite"/>` +
                    `<animate attributeName="opacity" values="0;.85;0" dur="2.6s" begin="${delay}s" repeatCount="indefinite"/></circle>`;
        }
        vaporGroup.innerHTML = vout;

        // rain only falls once the cloud is thick enough to precipitate
        const f = currentFlows();
        const rainCount = f.precip > 0.002 ? Math.max(1, Math.min(12, Math.round(f.precip * 90))) : 0;
        let rout = '';
        for (let i = 0; i < rainCount; i += 1) {
            const x = 258 + ((i * 29) % 96);
            const delay = ((i * 0.21) % 1.1).toFixed(2);
            rout += `<ellipse class="raindrop" cx="${x}" cy="100" rx="1.9" ry="4">` +
                    `<animate attributeName="cy" from="100" to="${(seaTop - 4).toFixed(1)}" dur="1.1s" begin="${delay}s" repeatCount="indefinite"/>` +
                    `<animate attributeName="opacity" values="0;.9;0" dur="1.1s" begin="${delay}s" repeatCount="indefinite"/></ellipse>`;
        }
        rainGroup.innerHTML = rout;

        const rows = [
            { key: 'sea', name: '바다', color: '#4aa3d0' },
            { key: 'vapor', name: '수증기', color: '#a8d8ee' },
            { key: 'cloud', name: '구름', color: '#d8e6ee' },
            { key: 'land', name: '땅의 물', color: '#6fbf73' },
        ];
        reservoirBars.innerHTML = rows.map(r =>
            `<div class="res-row"><span class="res-name">${r.name}</span>` +
            `<span class="res-track"><span class="res-fill" style="width:${(R[r.key] / TOTAL * 100).toFixed(1)}%;background:${r.color}"></span></span>` +
            `<span class="res-value">${Math.round(R[r.key])}</span></div>`
        ).join('') +
            `<div class="res-row total"><span class="res-name">전체</span>` +
            `<span class="res-track"><span class="res-fill" style="width:100%;background:rgba(84,230,193,.5)"></span></span>` +
            `<span class="res-value">${Math.round(total())}</span></div>`;

        resultTotal.textContent = `${Math.round(total())}`;
        resultTime.textContent = `${Math.round(days)}일`;
        stageBadge.textContent = running ? `${Math.round(days)}일째 순환 중` : '멈춤';
    }

    function frame(now) {
        const t = now / 1000;
        const dt = lastT === null ? 1 / 60 : Math.min(1 / 20, t - lastT);
        lastT = t;
        if (running) advanceSim(dt * DAYS_PER_SECOND);
        render();
        if (running) rafId = requestAnimationFrame(frame);
        else { rafId = null; lastT = null; }
    }

    function updateExplanation() {
        const sun = Number(sunRange.value), temp = Number(tempRange.value);
        const strong = sun >= 7, cool = temp <= 4;
        let s = `햇빛이 ${strong ? '강해 증발이 활발하고' : '약해 증발이 느리고'}, 공기가 ${cool ? '차가워 수증기가 잘 응결해 구름이 많이 만들어집니다.' : '따뜻해 수증기가 잘 응결하지 않아 공기 중에 오래 머무릅니다.'}`;
        s += ' 어느 쪽이든 바다·수증기·구름·땅에 나뉜 양만 달라질 뿐, 물의 총량은 그대로입니다.';
        explanation.textContent = s;
    }

    runBtn.addEventListener('click', () => {
        running = !running;
        runBtn.textContent = running ? '순환 멈춤' : '순환 시작';
        if (running) {
            resultEmpty.hidden = true;
            resultContent.hidden = false;
            predictionResult.textContent = !prediction
                ? '다음에는 결과를 먼저 예상해 보세요.'
                : prediction === 'same' ? '예상이 맞았습니다.' : '예상과 다른 결과입니다. 물의 총량은 변하지 않습니다.';
            updateExplanation();
            stageCaption.textContent = '증발한 물이 구름이 되었다가 비로 내려 다시 돌아옵니다.';
            if (rafId === null) { lastT = null; rafId = requestAnimationFrame(frame); }
        } else {
            stageCaption.textContent = '순환을 멈추었습니다. 각 곳에 나뉜 물의 양을 살펴보세요.';
        }
        render();
    });

    resetBtn.addEventListener('click', () => {
        running = false;
        R = { ...INITIAL };
        days = 0;
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; lastT = null; }
        runBtn.textContent = '순환 시작';
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        stageCaption.textContent = '햇빛과 기온을 정하고 순환을 시작해 보세요.';
        render();
    });

    [sunRange, tempRange].forEach(el => el.addEventListener('input', () => {
        sunOutput.textContent = sunRange.value;
        tempOutput.textContent = tempRange.value;
        if (!resultContent.hidden) updateExplanation();
        render();
    }));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));

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

    window.__cycleModel = {
        TOTAL, INITIAL, DT, advanceSim, render,
        reservoirs: () => ({ ...R }),
        total, days: () => days,
        setSun(v) { sunRange.value = String(v); sunRange.dispatchEvent(new Event('input')); },
        setTemp(v) { tempRange.value = String(v); tempRange.dispatchEvent(new Event('input')); },
        reset: () => resetBtn.click(),
    };

    buildBeams();
    resetBtn.click();
});
