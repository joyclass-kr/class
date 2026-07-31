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
    const particles = document.getElementById('particles');
    const particleLegend = document.getElementById('particleLegend');
    const thermometerFill = document.getElementById('thermometerFill');

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

    function renderIons(ratio) {
        particles.replaceChildren();
        const count = Math.max(10, Math.round((12 + ratio * 18) / 2) * 2);
        for (let index = 0; index < count; index += 1) {
            const ion = document.createElement('i');
            const sodium = index % 2 === 0;
            ion.className = `particle ion ${sodium ? 'sodium-ion' : 'chloride-ion'}`;
            ion.textContent = sodium ? 'Na⁺' : 'Cl⁻';
            ion.style.left = `${8 + ((index * 23) % 84)}%`;
            ion.style.top = `${10 + ((index * 31) % 70)}%`;
            ion.style.setProperty('--delay', `${-(index % 7) * .7}s`);
            particles.appendChild(ion);
        }
        particleLegend.hidden = false;
    }

    function clearResult() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        beaker.classList.remove('mixed');
        particles.replaceChildren();
        particleLegend.hidden = true;
        sediment.style.height = '0';
        stageCaption.textContent = '온도와 소금의 양을 정하세요.';
    }

    function syncControls(resetAmount = false) {
        if (resetAmount) setAmountRange(true);
        temperatureOutput.textContent = `${temperatureRange.value}℃`;
        amountOutput.textContent = `${grams(amountRange.value)}g`;
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

        renderIons(dissolved / maximum);
        beaker.classList.remove('mixed');
        void beaker.offsetWidth;
        beaker.classList.add('mixed');
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
            explanation.textContent = `이온 모형은 녹지 않은 결정이 아니라 물속에 퍼진 소금 입자를 나타냅니다. 바닥에 남은 소금은 없습니다.`;
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

    setAmountRange(true);
    syncControls();
    clearResult();
});
