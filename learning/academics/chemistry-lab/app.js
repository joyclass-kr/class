document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const levelButtons = [...document.querySelectorAll('[data-level]')];
    const soluteSelect = document.getElementById('soluteSelect');
    const temperatureRange = document.getElementById('temperatureRange');
    const amountRange = document.getElementById('amountRange');
    const temperatureOutput = document.getElementById('temperatureOutput');
    const amountOutput = document.getElementById('amountOutput');
    const amountMinLabel = document.getElementById('amountMinLabel');
    const amountMaxLabel = document.getElementById('amountMaxLabel');
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const runButton = document.getElementById('runExperimentBtn');
    const resetButton = document.getElementById('resetExperimentBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const dissolvedValue = document.getElementById('dissolvedValue');
    const remainingValue = document.getElementById('remainingValue');
    const predictionResult = document.getElementById('predictionResult');
    const elementaryExplanation = document.getElementById('elementaryExplanation');
    const middleExplanation = document.getElementById('middleExplanation');
    const solubilityFormula = document.getElementById('solubilityFormula');
    const stageCaption = document.getElementById('stageCaption');
    const beaker = document.getElementById('beaker');
    const water = document.getElementById('water');
    const sediment = document.getElementById('sediment');
    const particles = document.getElementById('particles');
    const thermometerFill = document.getElementById('thermometerFill');

    let prediction = null;

    const solutes = {
        salt: {
            name: '소금',
            color: '#fff3c4',
            amount: { min: 32, max: 42, step: 0.5, initial: 36 },
            points: [[0, 35.5], [20, 36], [40, 36.5], [60, 37.5], [80, 38], [100, 39]]
        },
        sugar: {
            name: '설탕',
            color: '#f6d7ff',
            amount: { min: 160, max: 500, step: 5, initial: 205 },
            points: [[0, 179], [20, 204], [40, 241], [60, 288], [80, 363], [100, 487]]
        }
    };

    function interpolateSolubility(points, temperature) {
        const upperIndex = points.findIndex(([pointTemperature]) => pointTemperature >= temperature);
        if (upperIndex <= 0) return points[0][1];
        const [lowerTemperature, lowerValue] = points[upperIndex - 1];
        const [upperTemperature, upperValue] = points[upperIndex];
        const ratio = (temperature - lowerTemperature) / (upperTemperature - lowerTemperature);
        return lowerValue + ((upperValue - lowerValue) * ratio);
    }

    function formatGrams(value) {
        return Number(value).toLocaleString('ko-KR', { maximumFractionDigits: 1 });
    }

    function syncAmountRange(resetValue = false) {
        const { amount } = solutes[soluteSelect.value];
        amountRange.min = String(amount.min);
        amountRange.max = String(amount.max);
        amountRange.step = String(amount.step);
        if (resetValue) amountRange.value = String(amount.initial);
        amountMinLabel.textContent = `${formatGrams(amount.min)}g`;
        amountMaxLabel.textContent = `${formatGrams(amount.max)}g`;
    }

    function createParticles() {
        particles.innerHTML = '';
        for (let index = 0; index < 32; index += 1) {
            const particle = document.createElement('i');
            particle.className = 'particle';
            particle.style.left = `${8 + ((index * 23) % 84)}%`;
            particle.style.top = `${10 + ((index * 31) % 70)}%`;
            particle.style.setProperty('--delay', `${-(index % 7) * 0.45}s`);
            particles.appendChild(particle);
        }
    }

    function syncControls() {
        temperatureOutput.textContent = `${temperatureRange.value}℃`;
        amountOutput.textContent = `${formatGrams(amountRange.value)}g`;
        const temperaturePercent = (Number(temperatureRange.value) / 100) * 86 + 8;
        thermometerFill.style.height = `${temperaturePercent}%`;
        const warmth = Number(temperatureRange.value) / 100;
        water.style.background = `linear-gradient(180deg, rgba(${Math.round(69 + 90 * warmth)}, ${Math.round(189 - 35 * warmth)}, ${Math.round(231 - 65 * warmth)}, .46), rgba(29, 111, 165, .68))`;
    }

    function clearResult() {
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        beaker.classList.remove('mixed');
        sediment.style.height = '0';
        stageCaption.textContent = '조건을 정하고 결과를 예상해 보세요.';
    }

    function setLevel(level) {
        body.dataset.level = level;
        levelButtons.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.level === level));
        });
    }

    function runExperiment() {
        const temperature = Number(temperatureRange.value);
        const amount = Number(amountRange.value);
        const solute = solutes[soluteSelect.value];
        const maximum = interpolateSolubility(solute.points, temperature);
        const dissolved = Math.min(amount, maximum);
        const remaining = Math.max(0, amount - maximum);
        const actual = remaining < 0.05 ? 'all' : 'some';

        particles.style.setProperty('--particle-color', solute.color);
        beaker.classList.remove('mixed');
        void beaker.offsetWidth;
        beaker.classList.add('mixed');
        sediment.style.height = `${Math.min(34, remaining / 3)}%`;

        dissolvedValue.textContent = `${formatGrams(dissolved)}g`;
        remainingValue.textContent = `${formatGrams(remaining)}g`;
        resultEmpty.hidden = true;
        resultContent.hidden = false;

        if (!prediction) {
            predictionResult.textContent = '다음에는 결과를 먼저 예상하고 실험해 보세요.';
        } else if (prediction === actual) {
            predictionResult.textContent = '예상이 맞았습니다! 관찰 결과와 까닭도 확인하세요.';
        } else {
            predictionResult.textContent = '예상과 다른 결과입니다. 어떤 조건이 영향을 주었는지 살펴보세요.';
        }

        if (actual === 'all') {
            stageCaption.textContent = `${temperature}℃ 물 100mL에 ${solute.name} ${formatGrams(amount)}g이 모두 녹았습니다.`;
            elementaryExplanation.textContent = `물속에서 ${solute.name}이 눈에 보이지 않을 만큼 고르게 퍼졌습니다. 없어지는 것이 아니라 아주 작은 입자로 물속에 섞여 있습니다.`;
        } else {
            stageCaption.textContent = `${solute.name}이 더는 녹지 않고 비커 바닥에 남았습니다.`;
            elementaryExplanation.textContent = `물에 녹을 수 있는 양에는 한계가 있습니다. 이미 충분히 녹은 뒤 넣은 ${solute.name}은 바닥에 남습니다.`;
        }

        middleExplanation.textContent = `${temperature}℃에서 물 100mL에 녹을 수 있는 ${solute.name}의 최대 질량은 약 ${formatGrams(maximum)}g입니다. 넣은 양과 용해도를 비교하면 포화 여부와 남는 양을 판단할 수 있습니다.`;
        solubilityFormula.textContent = `${formatGrams(amount)}g - ${formatGrams(maximum)}g = ${formatGrams(remaining)}g ${remaining > 0 ? '남음' : '→ 모두 용해'}`;
    }

    levelButtons.forEach(button => button.addEventListener('click', () => setLevel(button.dataset.level)));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    [temperatureRange, amountRange].forEach(input => input.addEventListener('input', () => {
        syncControls();
        clearResult();
    }));
    soluteSelect.addEventListener('change', () => {
        syncAmountRange(true);
        syncControls();
        clearResult();
    });
    runButton.addEventListener('click', runExperiment);
    resetButton.addEventListener('click', () => {
        soluteSelect.value = 'salt';
        temperatureRange.value = '20';
        syncAmountRange(true);
        prediction = null;
        predictionButtons.forEach(button => button.classList.remove('selected'));
        syncControls();
        clearResult();
    });

    createParticles();
    setLevel('all');
    syncAmountRange(true);
    syncControls();
    clearResult();
});
