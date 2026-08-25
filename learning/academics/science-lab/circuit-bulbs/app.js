document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = [...document.querySelectorAll('[data-mode]')];
    const wiringButtons = [...document.querySelectorAll('[data-wiring]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const bulbControls = document.getElementById('bulbControls');
    const magnetControls = document.getElementById('magnetControls');
    const bulbRange = document.getElementById('bulbRange');
    const bulbOutput = document.getElementById('bulbOutput');
    const removeBtn = document.getElementById('removeBtn');
    const batteryRange = document.getElementById('batteryRange');
    const batteryOutput = document.getElementById('batteryOutput');
    const coilRange = document.getElementById('coilRange');
    const coilOutput = document.getElementById('coilOutput');
    const checkBtn = document.getElementById('checkBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const resultA = document.getElementById('resultA');
    const resultB = document.getElementById('resultB');
    const resultLabelA = document.getElementById('resultLabelA');
    const resultLabelB = document.getElementById('resultLabelB');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const circuitGroup = document.getElementById('circuitGroup');

    let mode = 'bulb';
    let wiring = 'series';
    let removed = false;
    let prediction = null;

    const bulbCount = () => Number(bulbRange.value);

    // Circuit analysis with identical bulbs of resistance R across an EMF V.
    // Series: I = V/(nR) so each bulb dissipates V²/(n²R) — brightness falls
    // as 1/n². Parallel: every branch sees the full V, so each bulb stays at
    // V²/R no matter how many are added, while the total current rises with n.
    // Everything the picture shows is read off these two facts.
    function analyse() {
        const n = bulbCount();
        if (wiring === 'series') {
            const open = removed;                       // one gap breaks the only path
            return {
                lit: open ? 0 : n,
                brightnessEach: open ? 0 : 1 / (n * n),
                totalCurrent: open ? 0 : 1 / n,
                branchCurrent: open ? 0 : 1 / n,
                broken: open,
            };
        }
        const active = removed ? n - 1 : n;             // each branch is independent
        return {
            lit: active,
            brightnessEach: active > 0 ? 1 : 0,
            totalCurrent: active,
            branchCurrent: active > 0 ? 1 : 0,
            broken: false,
        };
    }

    function magnetState() {
        const batteries = Number(batteryRange.value);
        const turns = Number(coilRange.value);
        // Field strength of a solenoid goes as N·I, and with a fixed coil the
        // current follows the battery count, so strength ∝ turns × batteries.
        const strength = (batteries * turns) / 50;
        return { batteries, turns, strength, clips: Math.min(12, Math.round(strength)) };
    }

    const bulbSVG = (x, y, on, brightness) => {
        const glow = on ? `<circle cx="${x}" cy="${y}" r="${(16 + 26 * Math.sqrt(brightness)).toFixed(1)}" fill="url(#bulbGlow)" opacity="${(0.25 + 0.75 * brightness).toFixed(2)}"/>` : '';
        return glow +
            `<circle class="bulb-glass" cx="${x}" cy="${y}" r="15" fill="${on ? `rgba(255,225,150,${(0.25 + 0.6 * brightness).toFixed(2)})` : 'rgba(150,165,172,.18)'}"/>` +
            `<path class="bulb-filament${on ? '' : ' off'}" d="M${x - 6},${y + 3} L${x - 2},${y - 4} L${x + 2},${y + 4} L${x + 6},${y - 3}"/>` +
            `<rect class="bulb-base" x="${x - 7}" y="${y + 14}" width="14" height="7" rx="2"/>`;
    };

    const batterySVG = (x, y, count = 1) => {
        let out = '';
        for (let i = 0; i < count; i += 1) {
            const bx = x + i * 30;
            out += `<rect class="battery-body" x="${bx - 12}" y="${y - 11}" width="24" height="22" rx="3"/>` +
                   `<rect class="battery-cap" x="${bx - 3}" y="${y - 15}" width="6" height="4" rx="1"/>`;
        }
        return out;
    };

    function renderBulbCircuit() {
        const n = bulbCount();
        const a = analyse();
        const dur = t => `style="animation-duration:${t.toFixed(2)}s"`;
        let out = '';

        if (wiring === 'series') {
            const L = 70, R = 410, T = 80, B = 225;
            // one continuous loop, with the battery sitting on the left side
            const loop = `M${L},140 L${L},${T} L${R},${T} L${R},${B} L${L},${B} L${L},160`;
            out += `<path class="wire${a.broken ? ' dead' : ''}" d="${loop}"/>`;
            if (!a.broken && a.totalCurrent > 0) {
                out += `<path class="current" d="${loop}" ${dur(1 / a.totalCurrent)}/>`;
            }
            out += batterySVG(L, 150);
            out += `<text class="battery-label" x="${L - 34}" y="154">전지</text>`;
            for (let i = 0; i < n; i += 1) {
                const x = L + ((R - L) * (i + 1)) / (n + 1);
                const isGone = removed && i === n - 1;
                if (isGone) {
                    out += `<circle class="bulb-missing" cx="${x}" cy="${T}" r="15" fill="none"/>` +
                           `<text class="bulb-caption" x="${x}" y="${T + 40}" text-anchor="middle">빠짐</text>`;
                } else {
                    out += bulbSVG(x, T, !a.broken && a.lit > 0, a.brightnessEach);
                }
            }
            out += `<text class="stage-label" x="240" y="262" text-anchor="middle">${a.broken ? '길이 끊어져 전류가 흐르지 못합니다' : '전구가 한 줄로 이어져 있습니다'}</text>`;
        } else {
            const LR = 160, RR = 380, TOP = 60, BOT = 240;
            const ys = n === 1 ? [150] : n === 2 ? [100, 200] : [80, 150, 220];
            // battery out to the left rail, and back from the right rail
            const lead = `M70,138 L70,40 L${LR},40 L${LR},${TOP}`;
            const ret = `M70,162 L70,260 L${RR},260 L${RR},${BOT}`;
            out += `<path class="wire" d="${lead}"/><path class="wire" d="${ret}"/>`;
            out += `<path class="wire" d="M${LR},${TOP} L${LR},${BOT}"/>`;
            out += `<path class="wire" d="M${RR},${TOP} L${RR},${BOT}"/>`;
            if (a.totalCurrent > 0) {
                out += `<path class="current" d="${lead}" ${dur(1 / a.totalCurrent)}/>`;
                out += `<path class="current" d="${ret}" ${dur(1 / a.totalCurrent)}/>`;
            }
            ys.forEach((y, i) => {
                const isGone = removed && i === n - 1;
                const branch = `M${LR},${y} L${RR},${y}`;
                out += `<path class="wire${isGone ? ' dead' : ''}" d="${branch}"/>`;
                if (!isGone && a.branchCurrent > 0) {
                    // each branch carries the same current whatever n is
                    out += `<path class="current" d="${branch}" ${dur(1 / a.branchCurrent)}/>`;
                }
                const x = (LR + RR) / 2;
                if (isGone) {
                    out += `<circle class="bulb-missing" cx="${x}" cy="${y}" r="15" fill="none"/>` +
                           `<text class="bulb-caption" x="${x}" y="${y + 40}" text-anchor="middle">빠짐</text>`;
                } else {
                    out += bulbSVG(x, y, a.brightnessEach > 0, a.brightnessEach);
                }
            });
            out += batterySVG(70, 150);
            out += `<text class="battery-label" x="36" y="154">전지</text>`;
            out += `<text class="stage-label" x="270" y="286" text-anchor="middle">전구마다 전류가 흐르는 길이 따로 있습니다</text>`;
        }
        circuitGroup.innerHTML = out;
    }

    function renderMagnet() {
        const m = magnetState();
        let out = '';
        const coreX = 190, coreY = 150, coreW = 150, coreH = 26;
        out += batterySVG(70, 250, m.batteries);
        out += `<text class="battery-label" x="60" y="288">전지 ${m.batteries}개</text>`;
        const lead = `M70,239 L70,150 L${coreX - 14},150`;
        const ret = `M${70 + (m.batteries - 1) * 30},261 L${70 + (m.batteries - 1) * 30},290 L${coreX + coreW + 20},290 L${coreX + coreW + 20},176`;
        out += `<path class="wire" d="${lead}"/><path class="wire" d="${ret}"/>`;
        out += `<path class="current" d="${lead}" style="animation-duration:${(1 / m.batteries).toFixed(2)}s"/>`;
        out += `<path class="current" d="${ret}" style="animation-duration:${(1 / m.batteries).toFixed(2)}s"/>`;
        out += `<rect class="core" x="${coreX}" y="${coreY - coreH / 2}" width="${coreW}" height="${coreH}" rx="5"/>`;
        // number of drawn turns tracks the coil setting
        const loops = Math.round(m.turns / 16);
        let coil = '';
        for (let i = 0; i < loops; i += 1) {
            const x = coreX + 8 + (i * (coreW - 16)) / Math.max(1, loops - 1);
            coil += `<path class="coil" d="M${x.toFixed(1)},${coreY - coreH / 2 - 7} Q${(x + 7).toFixed(1)},${coreY} ${x.toFixed(1)},${coreY + coreH / 2 + 7}"/>`;
        }
        out += coil;
        out += `<text class="stage-label" x="${coreX + coreW / 2}" y="${coreY - 34}" text-anchor="middle">코일 ${m.turns}번 감음</text>`;
        // clips cling to the tip, more of them as the field gets stronger
        for (let i = 0; i < m.clips; i += 1) {
            const col = i % 4, row = Math.floor(i / 4);
            const cx = coreX + coreW + 12 + col * 13;
            const cy = coreY - 13 + row * 13;
            out += `<rect class="clip" x="${cx}" y="${cy}" width="9" height="5" rx="2"/>`;
        }
        out += `<text class="stage-label" x="${coreX + coreW + 34}" y="${coreY + 46}" text-anchor="middle">클립 ${m.clips}개</text>`;
        circuitGroup.innerHTML = out;
    }

    function render() {
        if (mode === 'bulb') {
            renderBulbCircuit();
            stageBadge.textContent = wiring === 'series' ? '직렬연결' : '병렬연결';
        } else {
            renderMagnet();
            const m = magnetState();
            stageBadge.textContent = `전지 ${m.batteries}개 · 코일 ${m.turns}번`;
        }
    }

    function clearResult() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
    }

    function check() {
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        if (mode === 'magnet') {
            const m = magnetState();
            resultLabelA.textContent = '전자석의 세기';
            resultLabelB.textContent = '붙은 클립';
            resultA.textContent = `${m.strength.toFixed(1)}`;
            resultB.textContent = `${m.clips}개`;
            predictionResult.textContent = '전지와 코일 수를 바꾸며 세기를 비교해 보세요.';
            explanation.textContent = `전지 ${m.batteries}개와 코일 ${m.turns}번을 곱한 만큼 세집니다. 전지를 늘리거나 코일을 더 감으면 클립이 더 많이 붙습니다.`;
            stageCaption.textContent = `전자석에 클립이 ${m.clips}개 붙었습니다.`;
            return;
        }
        const n = bulbCount();
        const a = analyse();
        resultLabelA.textContent = '전구 하나의 밝기';
        resultLabelB.textContent = '전체 전류';
        resultA.textContent = `${Math.round(a.brightnessEach * 100)}%`;
        resultB.textContent = `${a.totalCurrent.toFixed(2)}배`;

        const actual = a.brightnessEach < 1 ? 'dimmer' : a.brightnessEach > 1 ? 'brighter' : 'same';
        predictionResult.textContent = !prediction
            ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === actual ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';

        if (a.broken) {
            stageCaption.textContent = '직렬연결에서 전구 하나를 빼자 모든 전구가 꺼졌습니다.';
            explanation.textContent = '직렬연결은 전류가 흐르는 길이 하나뿐이라, 한 곳이 끊어지면 전체 회로가 끊겨 모두 꺼집니다.';
        } else if (wiring === 'series') {
            stageCaption.textContent = `직렬로 ${n}개를 연결하니 전구 하나의 밝기가 ${Math.round(a.brightnessEach * 100)}%입니다.`;
            // 밝기는 전류의 제곱을 따라가지만, 초등 과정에서는 "줄어든 만큼 다시
            // 한 번 더 줄어든다"로 풀어 씁니다.
            explanation.textContent = n === 1
                ? '전구가 하나뿐이라 전지의 힘을 그대로 받습니다. 이때의 밝기를 100%로 삼고 다른 경우와 견주어 봅니다.'
                : `직렬연결은 전류가 흐르는 길이 하나뿐이라, 전구를 ${n}개 이으면 전류가 ${n}분의 1로 줄어듭니다. ` +
                  `밝기는 전류가 줄어든 만큼 한 번 더 줄어들어 ${n * n}분의 1, 곧 ${Math.round(a.brightnessEach * 100)}%가 됩니다.`;
        } else if (removed) {
            stageCaption.textContent = `병렬연결에서 하나를 빼도 나머지 ${a.lit}개는 그대로 켜져 있습니다.`;
            explanation.textContent = '병렬연결은 전구마다 전류가 흐르는 길이 따로 있어, 하나를 빼도 나머지 밝기가 변하지 않습니다.';
        } else {
            stageCaption.textContent = `병렬로 ${n}개를 연결해도 전구 하나의 밝기는 100% 그대로입니다.`;
            explanation.textContent = `병렬연결에서는 전구마다 전지에 그대로 이어져 있어 밝기가 변하지 않습니다. 대신 전체 전류가 ${n}배로 늘어 전지가 더 빨리 닳습니다.`;
        }
    }

    modeButtons.forEach(button => button.addEventListener('click', () => {
        mode = button.dataset.mode;
        modeButtons.forEach(item => item.classList.toggle('selected', item === button));
        bulbControls.hidden = mode !== 'bulb';
        magnetControls.hidden = mode !== 'magnet';
        clearResult();
        stageCaption.textContent = mode === 'bulb'
            ? '연결 방법과 전구 수를 바꾸며 밝기를 비교해 보세요.'
            : '전지 수와 코일 감은 수를 바꾸며 전자석의 세기를 비교해 보세요.';
        render();
    }));
    wiringButtons.forEach(button => button.addEventListener('click', () => {
        wiring = button.dataset.wiring;
        wiringButtons.forEach(item => item.classList.toggle('selected', item === button));
        render(); clearResult();
    }));
    bulbRange.addEventListener('input', () => {
        bulbOutput.textContent = `${bulbRange.value}개`;
        render(); clearResult();
    });
    removeBtn.addEventListener('click', () => {
        removed = !removed;
        removeBtn.classList.toggle('active', removed);
        removeBtn.textContent = removed ? '전구 다시 끼우기' : '전구 하나 빼기';
        render(); clearResult();
    });
    [batteryRange, coilRange].forEach(el => el.addEventListener('input', () => {
        batteryOutput.textContent = `${batteryRange.value}개`;
        coilOutput.textContent = `${coilRange.value}번`;
        render(); clearResult();
    }));
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

    window.__circuitModel = {
        analyse, magnetState,
        setBulbs(n) { bulbRange.value = String(n); bulbOutput.textContent = `${n}개`; render(); },
        setWiring(w) { wiring = w; wiringButtons.forEach(b => b.classList.toggle('selected', b.dataset.wiring === w)); render(); },
        setRemoved(v) { if (removed !== v) removeBtn.click(); },
        setMode(m) { document.querySelector(`[data-mode="${m}"]`).click(); },
        setMagnet(b, t) { batteryRange.value = String(b); coilRange.value = String(t); batteryRange.dispatchEvent(new Event('input')); },
        state: () => ({ mode, wiring, n: bulbCount(), removed }),
    };

    render();
    clearResult();
});
