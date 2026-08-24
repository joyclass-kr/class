document.addEventListener('DOMContentLoaded', () => {
    const leftCountRange = document.getElementById('leftCountRange');
    const rightCountRange = document.getElementById('rightCountRange');
    const rightDistRange = document.getElementById('rightDistRange');
    const leftCountOutput = document.getElementById('leftCountOutput');
    const rightCountOutput = document.getElementById('rightCountOutput');
    const rightDistOutput = document.getElementById('rightDistOutput');
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const checkButton = document.getElementById('checkBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const resultLeft = document.getElementById('resultLeft');
    const resultRight = document.getElementById('resultRight');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const balanceBadge = document.getElementById('balanceBadge');
    const beamGroup = document.getElementById('beamGroup');
    const beamTicks = document.getElementById('beamTicks');
    const leftHanger = document.getElementById('leftHanger');
    const rightHanger = document.getElementById('rightHanger');

    const PIVOT_X = 240, BEAM_Y = 150;
    const UNITS_PER_CM = 3.6;
    const LEFT_DIST_CM = 20;
    const GRAM_PER_WEIGHT = 100;
    const MAX_ANGLE = 12;          // degrees at full saturation

    // Hooke's law: the spring's extension is directly proportional to the load
    // hanging from it. 500 g stretches it 45 units, so every 100 g adds 9.
    const SPRING_NATURAL = 30;
    const SPRING_UNITS_PER_GRAM = 45 / 500;

    const BLOCK_W = 28, BLOCK_H = 13, BLOCK_PITCH = 15;

    let prediction = null;
    let angle = 0, angVel = 0, rafId = null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = () => ({
        leftWeight: Number(leftCountRange.value) * GRAM_PER_WEIGHT,
        rightWeight: Number(rightCountRange.value) * GRAM_PER_WEIGHT,
        leftDist: LEFT_DIST_CM,
        rightDist: Number(rightDistRange.value),
    });

    // The two quantities the whole experiment is about: weight × distance on
    // each side. Everything visual below is derived from these, so the beam
    // cannot show a tilt that disagrees with the arithmetic on the panel.
    function moments(s) {
        return { left: s.leftWeight * s.leftDist, right: s.rightWeight * s.rightDist };
    }

    // Resting angle. Positive tilts the right side down, matching a positive
    // net moment on the right. tanh saturates smoothly so a huge imbalance
    // pins the beam at MAX_ANGLE instead of spinning past it, while staying
    // exactly zero when the two moments are equal.
    function equilibriumAngle(s) {
        const m = moments(s);
        return MAX_ANGLE * Math.tanh((m.right - m.left) / 5000);
    }

    function balanceState(s) {
        const m = moments(s);
        if (m.right === m.left) return 'level';
        return m.right > m.left ? 'right' : 'left';
    }

    function springPath(length) {
        // A coil whose zig-zags spread apart as it stretches, so the drawing
        // lengthens the way a real spring does rather than just sliding down.
        const coils = 6;
        const seg = length / (coils * 2);
        let d = 'M0,0';
        for (let i = 0; i < coils * 2; i += 1) {
            d += ` L${i % 2 === 0 ? 7 : -7},${(seg * (i + 1)).toFixed(2)}`;
        }
        return `${d} L0,${length.toFixed(2)}`;
    }

    function weightBlocks(count, topY) {
        let out = '';
        for (let i = 0; i < count; i += 1) {
            out += `<rect class="weight-block" x="${-BLOCK_W / 2}" y="${(topY + i * BLOCK_PITCH).toFixed(1)}" width="${BLOCK_W}" height="${BLOCK_H}" rx="3"/>`;
        }
        return out;
    }

    function buildTicks() {
        let out = '';
        for (const cm of [10, 20, 30, 40, 50]) {
            for (const side of [-1, 1]) {
                const x = PIVOT_X + side * cm * UNITS_PER_CM;
                out += `<line class="beam-tick" x1="${x}" y1="154" x2="${x}" y2="160"/>`;
                out += `<text class="beam-tick-label" x="${x}" y="141" text-anchor="middle">${cm}</text>`;
            }
        }
        beamTicks.innerHTML = out;
    }

    function renderHangers(s) {
        const leftX = PIVOT_X - s.leftDist * UNITS_PER_CM;
        const rightX = PIVOT_X + s.rightDist * UNITS_PER_CM;

        const springLen = SPRING_NATURAL + s.leftWeight * SPRING_UNITS_PER_GRAM;
        const leftTop = springLen + 4;
        leftHanger.innerHTML =
            `<path class="spring-coil" d="${springPath(springLen)}"/>` +
            `<text class="spring-label" x="14" y="${(springLen / 2).toFixed(1)}">${s.leftWeight} g</text>` +
            weightBlocks(s.leftWeight / GRAM_PER_WEIGHT, leftTop);

        const rightTop = SPRING_NATURAL + 4;
        rightHanger.innerHTML =
            `<line class="hang-line" x1="0" y1="0" x2="0" y2="${SPRING_NATURAL}"/>` +
            `<text class="weight-total" x="14" y="${(SPRING_NATURAL / 2).toFixed(1)}">${s.rightWeight} g</text>` +
            weightBlocks(s.rightWeight / GRAM_PER_WEIGHT, rightTop);

        return { leftX, rightX };
    }

    function applyAngle(theta, positions) {
        beamGroup.setAttribute('transform', `rotate(${theta.toFixed(3)} ${PIVOT_X} ${BEAM_Y})`);
        // Each hanger is counter-rotated by the same angle about its own
        // attachment point. It therefore travels with the beam but its load
        // still hangs straight down, the way gravity actually works.
        leftHanger.setAttribute('transform', `translate(${positions.leftX} ${BEAM_Y}) rotate(${(-theta).toFixed(3)})`);
        rightHanger.setAttribute('transform', `translate(${positions.rightX} ${BEAM_Y}) rotate(${(-theta).toFixed(3)})`);
    }

    function render() {
        const s = state();
        const positions = renderHangers(s);
        applyAngle(angle, positions);
    }

    // A real balance beam does not snap to its resting angle; it swings past
    // and settles. This integrates a damped oscillator toward the equilibrium
    // angle, so the motion is the physical settling rather than a tween.
    const STIFFNESS = 60, DAMPING = 9;
    let lastT = null;

    function step(now) {
        const t = now / 1000;
        const dt = lastT === null ? 1 / 60 : Math.min(1 / 30, t - lastT);
        lastT = t;
        const target = equilibriumAngle(state());
        const acc = -STIFFNESS * (angle - target) - DAMPING * angVel;
        angVel += acc * dt;
        angle += angVel * dt;
        render();
        if (Math.abs(angle - target) < .02 && Math.abs(angVel) < .05) {
            angle = target; angVel = 0; render();
            rafId = null; lastT = null;
            return;
        }
        rafId = requestAnimationFrame(step);
    }

    function nudge() {
        if (reduceMotion) {
            angle = equilibriumAngle(state()); angVel = 0; render(); return;
        }
        if (rafId === null) { lastT = null; rafId = requestAnimationFrame(step); }
    }

    function syncOutputs() {
        const s = state();
        leftCountOutput.textContent = `${s.leftWeight / GRAM_PER_WEIGHT}개 (${s.leftWeight} g)`;
        rightCountOutput.textContent = `${s.rightWeight / GRAM_PER_WEIGHT}개 (${s.rightWeight} g)`;
        rightDistOutput.textContent = `${s.rightDist} cm`;
        const bs = balanceState(s);
        balanceBadge.textContent = bs === 'level' ? '수평' : bs === 'left' ? '왼쪽이 내려감' : '오른쪽이 내려감';
    }

    function clearResult() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
    }

    function check() {
        const s = state();
        const m = moments(s);
        const bs = balanceState(s);
        resultLeft.textContent = `${m.left.toLocaleString()}`;
        resultRight.textContent = `${m.right.toLocaleString()}`;
        resultEmpty.hidden = true;
        resultContent.hidden = false;

        predictionResult.textContent = !prediction
            ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === bs ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';

        if (bs === 'level') {
            stageCaption.textContent = `양쪽 모두 ${m.left.toLocaleString()}이라서 지레가 수평을 이룹니다.`;
            explanation.textContent = `왼쪽 ${s.leftWeight} g × ${s.leftDist} cm와 오른쪽 ${s.rightWeight} g × ${s.rightDist} cm가 같으므로 수평이 됩니다.`;
        } else {
            const downLabel = bs === 'left' ? '왼쪽' : '오른쪽';
            const bigger = bs === 'left' ? m.left : m.right;
            const smaller = bs === 'left' ? m.right : m.left;
            stageCaption.textContent = `${downLabel}의 무게×거리가 더 커서 ${downLabel}이 내려갑니다.`;
            explanation.textContent = `${downLabel}은 ${bigger.toLocaleString()}, 반대쪽은 ${smaller.toLocaleString()}입니다. 무게를 바꾸거나 거리를 조절해 두 값을 같게 만들면 수평이 됩니다.`;
        }
    }

    [leftCountRange, rightCountRange, rightDistRange].forEach(input => {
        input.addEventListener('input', () => { syncOutputs(); render(); nudge(); clearResult(); });
    });
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    checkButton.addEventListener('click', check);

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

    // Verification hook: lets the physics be checked by exact numbers, and lets
    // the beam be placed at its resting angle without waiting on animation
    // frames (which are paused whenever the page isn't composited).
    window.__leverModel = {
        PIVOT_X, BEAM_Y, UNITS_PER_CM, MAX_ANGLE, SPRING_NATURAL, SPRING_UNITS_PER_GRAM,
        state, moments, equilibriumAngle, balanceState,
        settle() {
            if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
            angle = equilibriumAngle(state()); angVel = 0; lastT = null; render();
            return { angle, ...moments(state()) };
        },
        setAngle(a) { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } angle = a; render(); },
        currentAngle: () => angle,
    };

    buildTicks();
    syncOutputs();
    render();
    clearResult();
});
