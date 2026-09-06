(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.g01 = (spec) => figure(spec, "visual-sensor-sampling-lab", `
        <section class="sampling-lab" data-sampling-lab style="--sample-position:42%">
            <div class="sampling-scene">
                <div class="thermometer"><i></i><b>따뜻함</b></div>
                <svg viewBox="0 0 760 220" aria-label="이어지는 온도 변화와 측정점">
                    <path class="continuous-curve" d="M20 155 C120 145 135 65 235 78 S380 180 475 118 S620 38 740 72"/>
                    <g class="sample-guides">
                        <path d="M85 30V190"/><path d="M170 30V190"/><path d="M255 30V190"/><path d="M340 30V190"/><path d="M425 30V190"/><path d="M510 30V190"/><path d="M595 30V190"/><path d="M680 30V190"/>
                    </g>
                    <g class="sample-dots">
                        <circle cx="85" cy="131" r="7"/><circle cx="170" cy="72" r="7"/><circle cx="255" cy="92" r="7"/><circle cx="340" cy="156" r="7"/><circle cx="425" cy="145" r="7"/><circle cx="510" cy="92" r="7"/><circle cx="595" cy="55" r="7"/><circle cx="680" cy="63" r="7"/>
                    </g>
                </svg>
                <div class="quantized-readout"><span>센서가 잰 값</span><strong data-sample-value>23.4°C</strong><span>정해진 칸으로 기록</span><b data-quantized-value>23°C</b><code data-binary-value>00010111</code></div>
            </div>
            <label class="sampling-control">측정할 순간 움직이기<input type="range" min="0" max="7" value="3" data-sample-index></label>
            <p class="encoding-rule"><b>이 실험의 기록 규칙:</b> 온도를 1℃ 단위 정수로 반올림한 뒤, 그 숫자를 8칸 이진수로 적습니다.</p>
            <p class="lab-readout">현실의 온도는 이어져 바뀝니다. 센서는 정한 순간의 값을 재고, 기기는 정해 둔 기록 규칙에 따라 숫자로 바꿉니다.</p>
        </section>
    `);

    function setupSamplingLab() {
        const lab = document.querySelector("[data-sampling-lab]");
        if (!lab) return;
        const input = lab.querySelector("[data-sample-index]");
        const measured = lab.querySelector("[data-sample-value]");
        const quantized = lab.querySelector("[data-quantized-value]");
        const binary = lab.querySelector("[data-binary-value]");
        const values = [21.2, 22.8, 23.6, 23.4, 22.1, 24.2, 25.8, 25.1];
        const update = () => {
            const index = Number(input.value);
            const rounded = Math.round(values[index]);
            lab.style.setProperty("--sample-position", `${11 + index * 11.3}%`);
            measured.textContent = `${values[index].toFixed(1)}°C`;
            quantized.textContent = `${rounded}°C`;
            binary.textContent = rounded.toString(2).padStart(8, "0");
        };
        input.addEventListener("input", update);
        update();
    }

    window.COMPUTER_LAB_SETUPS.push(setupSamplingLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("g01");
})();
