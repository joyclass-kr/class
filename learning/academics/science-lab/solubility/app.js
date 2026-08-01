document.addEventListener('DOMContentLoaded', () => {
    const temperatureRange = document.getElementById('temperatureRange');
    const amountRange = document.getElementById('amountRange');
    const temperatureOutput = document.getElementById('temperatureOutput');
    const amountOutput = document.getElementById('amountOutput');
    const amountMinLabel = document.getElementById('amountMinLabel');
    const amountMaxLabel = document.getElementById('amountMaxLabel');
    const amountGuide = document.getElementById('amountGuide');
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const runButton = document.getElementById('runExperimentBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const dissolvedValue = document.getElementById('dissolvedValue');
    const remainingValue = document.getElementById('remainingValue');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const solubilityBadge = document.getElementById('solubilityBadge');
    const beaker = document.getElementById('beaker');
    const water = document.getElementById('water');
    const sediment = document.getElementById('sediment');
    const thermometerFill = document.getElementById('thermometerFill');
    const saltDose = document.getElementById('saltDose');
    const saltPile = document.getElementById('saltPile');
    const saltDoseValue = document.getElementById('saltDoseValue');

    const points = [[0, 35.7], [20, 36], [40, 36.5], [60, 37.3], [80, 38.4], [100, 39.8]];
    let prediction = null;

    function solubilityAt(temperature) {
        return points.find(([pointTemperature]) => pointTemperature === temperature)[1];
    }

    function grams(value) {
        return Number(value).toLocaleString('ko-KR', { maximumFractionDigits: 1 });
    }

    function setAmountRange(resetValue = true) {
        const maximum = solubilityAt(Number(temperatureRange.value));
        const minimum = Math.floor((maximum - 3) * 2) / 2;
        const upper = Math.ceil((maximum + 3) * 2) / 2;
        amountRange.min = String(minimum);
        amountRange.max = String(upper);
        if (resetValue) amountRange.value = String(Math.min(upper, Math.ceil((maximum + 1) * 2) / 2));
        amountMinLabel.textContent = `${grams(minimum)}g`;
        amountMaxLabel.textContent = `${grams(upper)}g`;
        amountGuide.textContent = `${temperatureRange.value}℃에서 녹는 양의 근처만 조절합니다.`;
        solubilityBadge.textContent = `용해도 ${grams(maximum)}g`;
    }

    function clearResult() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        beaker.classList.remove('mixed');
        saltDose.classList.remove('poured');
        sediment.style.height = '0';
        stageCaption.textContent = '온도와 소금의 양을 정하세요.';
    }

    function syncControls(resetAmount = false) {
        if (resetAmount) setAmountRange(true);
        temperatureOutput.textContent = `${temperatureRange.value}℃`;
        amountOutput.textContent = `${grams(amountRange.value)}g`;
        saltDoseValue.textContent = `${grams(amountRange.value)}g`;
        const saltLevel = Number(amountRange.value) * 1.5;
        saltPile.style.setProperty('--salt-level', `${saltLevel}%`);
        thermometerFill.style.height = `${8 + Number(temperatureRange.value) * .86}%`;
        const warmth = Number(temperatureRange.value) / 100;
        water.style.background = `linear-gradient(180deg, rgba(${Math.round(69 + 90 * warmth)}, ${Math.round(189 - 35 * warmth)}, ${Math.round(231 - 65 * warmth)}, .46), rgba(29,111,165,.68))`;
    }

    function runExperiment() {
        const temperature = Number(temperatureRange.value);
        const amount = Number(amountRange.value);
        const maximum = solubilityAt(temperature);
        const dissolved = Math.min(amount, maximum);
        const remaining = Math.max(0, amount - maximum);
        const actual = remaining < .05 ? 'all' : 'some';

        beaker.classList.remove('mixed');
        void beaker.offsetWidth;
        beaker.classList.add('mixed');
        saltDose.classList.add('poured');
        sediment.style.height = remaining > 0 ? `${Math.max(5, Math.min(24, remaining * 6))}%` : '0';
        dissolvedValue.textContent = `${grams(dissolved)}g`;
        remainingValue.textContent = `${grams(remaining)}g`;
        resultEmpty.hidden = true;
        resultContent.hidden = false;

        predictionResult.textContent = !prediction
            ? '다음에는 결과를 먼저 예상해 보세요.'
            : prediction === actual ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        if (actual === 'all') {
            stageCaption.textContent = `${temperature}℃의 물 100g에 소금 ${grams(amount)}g이 모두 녹았습니다.`;
            explanation.textContent = `소금이 물속에 고르게 녹았으므로 눈에 보이는 소금 결정은 없습니다. 바닥에도 남은 소금이 없습니다.`;
        } else {
            stageCaption.textContent = `${temperature}℃에서 ${grams(maximum)}g까지 녹고 ${grams(remaining)}g이 바닥에 남았습니다.`;
            explanation.textContent = `이 온도에서 더 녹을 수 있는 양을 넘었기 때문에 남은 소금이 바닥에 모였습니다.`;
        }
    }

    temperatureRange.addEventListener('input', () => { syncControls(true); clearResult(); });
    amountRange.addEventListener('input', () => { syncControls(); clearResult(); });
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    runButton.addEventListener('click', runExperiment);

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

    setAmountRange(true);
    syncControls();
    clearResult();
});
