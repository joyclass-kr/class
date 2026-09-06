(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.g02 = (spec) => figure(spec, "visual-bit-byte-lab", `
        <section class="bit-unit-lab" data-bit-lab>
            <section class="bit-pattern-panel" aria-labelledby="bit-pattern-title">
                <header class="bit-lab-heading">
                    <div>
                        <h3 id="bit-pattern-title">8개의 비트로 한 바이트 읽기</h3>
                        <small>Reading One Byte from 8 Bits</small>
                    </div>
                    <p>버튼을 눌러 0과 1을 바꾸세요. 왼쪽 자리는 128, 오른쪽 자리는 1의 값을 가집니다.</p>
                </header>
                <div class="bit-switch-grid" aria-label="8비트 패턴 만들기">
                    ${Array.from({ length: 8 }, (_, index) => {
                        const place = 2 ** (7 - index);
                        return `<button type="button" data-bit-index="${index}" data-bit-place="${place}" aria-pressed="false" aria-label="${place}의 자리, 현재 0">
                            <small>${place}의 자리</small><i aria-hidden="true"></i><b data-bit-digit>0</b>
                        </button>`;
                    }).join("")}
                </div>
                <div class="bit-readout-strip" aria-live="polite">
                    <div><span>8비트 패턴 <small>8-bit Pattern</small></span><code data-bit-pattern>0000 0000</code></div>
                    <div><span>십진값 <small>Decimal Value</small></span><strong data-byte-value>0</strong><em>0부터 255</em></div>
                    <div><span>1의 개수 <small>Number of 1s</small></span><strong data-bit-count>0</strong><em>켜진 비트 수</em></div>
                    <div><span>바이트 수 <small>Byte Count</small></span><strong>1 B</strong><em>8칸 전체</em></div>
                </div>
                <p class="bit-count-rule"><b>1의 개수와 바이트 수는 다릅니다.</b> <code>0000 0000</code>도 1은 0개이지만, 비트 자리가 8개이므로 크기는 1바이트입니다.</p>
            </section>

            <section class="unit-ladder-panel" aria-labelledby="unit-ladder-title">
                <header class="bit-lab-heading">
                    <div>
                        <h3 id="unit-ladder-title">바이트 단위 사다리</h3>
                        <small>Decimal Byte-unit Ladder</small>
                    </div>
                    <p>단위를 선택하고 데이터 양을 바꾸어 같은 크기가 서로 다른 숫자로 적히는 모습을 관찰하세요.</p>
                </header>
                <ol class="decimal-unit-ladder" aria-label="B부터 TB까지 1000배 단위 사다리">
                    ${[
                        ["B", "Byte"],
                        ["KB", "Kilobyte"],
                        ["MB", "Megabyte"],
                        ["GB", "Gigabyte"],
                        ["TB", "Terabyte"]
                    ].map(([unit, name], index) => `<li data-unit-rung="${index}">
                        <button type="button" data-unit-index="${index}" aria-pressed="${index === 2}">
                            <b>${unit}</b><small>${name}</small>
                        </button>
                    </li>`).join("")}
                </ol>
                <div class="unit-experiment">
                    <label class="unit-amount-control">
                        <span>선택한 단위의 양 <small>Amount</small></span>
                        <input type="range" min="1" max="10" value="3" step="1" data-unit-amount>
                        <output data-unit-amount-output>3</output>
                    </label>
                    <div class="unit-equation" aria-live="polite">
                        <span>같은 데이터 양 <small>Same Data Size</small></span>
                        <code data-unit-equation>3 MB = 3,000 KB = 3,000,000 B</code>
                        <p data-unit-relation>MB에서 KB로 한 칸 내려오면 숫자는 1000배가 됩니다.</p>
                    </div>
                </div>
                <aside class="binary-unit-note">
                    <b>1000 기준과 1024 기준 <small>Decimal and Binary Prefixes</small></b>
                    <p>이 사다리의 <strong>KB·MB·GB·TB</strong>는 SI 십진 단위라서 한 칸마다 1000배입니다. <strong>KiB·MiB·GiB</strong>는 이진 접두어를 쓴 1024배 단위입니다. 따라서 <code>1 KB = 1000 B</code>, <code>1 KiB = 1024 B</code>입니다.</p>
                </aside>
            </section>
        </section>
    `);

    function setupBitLab() {
        const lab = document.querySelector("[data-bit-lab]");
        if (!lab) return;
        const bitButtons = Array.from(lab.querySelectorAll("[data-bit-index]"));
        const bitPattern = lab.querySelector("[data-bit-pattern]");
        const bitCount = lab.querySelector("[data-bit-count]");
        const byteValue = lab.querySelector("[data-byte-value]");
        const updateBits = () => {
            const bits = bitButtons.map((button) => button.getAttribute("aria-pressed") === "true" ? 1 : 0);
            bitButtons.forEach((button, index) => {
                button.querySelector("[data-bit-digit]").textContent = bits[index];
                button.setAttribute("aria-label", `${button.dataset.bitPlace}의 자리, 현재 ${bits[index]}`);
            });
            const compactPattern = bits.join("");
            bitPattern.textContent = `${compactPattern.slice(0, 4)} ${compactPattern.slice(4)}`;
            bitCount.textContent = bits.reduce((sum, bit) => sum + bit, 0);
            byteValue.textContent = parseInt(compactPattern, 2);
        };
        bitButtons.forEach((button) => button.addEventListener("click", () => {
            button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
            updateBits();
        }));

        const units = ["B", "KB", "MB", "GB", "TB"];
        const unitButtons = Array.from(lab.querySelectorAll("[data-unit-index]"));
        const unitRungs = Array.from(lab.querySelectorAll("[data-unit-rung]"));
        const amountInput = lab.querySelector("[data-unit-amount]");
        const amountOutput = lab.querySelector("[data-unit-amount-output]");
        const equation = lab.querySelector("[data-unit-equation]");
        const relation = lab.querySelector("[data-unit-relation]");
        const numberFormat = new Intl.NumberFormat("ko-KR");
        let activeUnit = 2;

        const updateUnits = () => {
            const amount = Number(amountInput.value);
            amountOutput.textContent = amount;
            unitButtons.forEach((button, index) => button.setAttribute("aria-pressed", String(index === activeUnit)));
            unitRungs.forEach((rung, index) => {
                rung.classList.toggle("is-active", index === activeUnit);
                rung.classList.toggle("is-smaller", index < activeUnit);
            });

            const parts = [];
            for (let unitIndex = activeUnit; unitIndex >= 0; unitIndex -= 1) {
                const converted = amount * (1000 ** (activeUnit - unitIndex));
                parts.push(`${numberFormat.format(converted)} ${units[unitIndex]}`);
            }
            equation.textContent = parts.join(" = ");
            relation.textContent = activeUnit === 0
                ? "B는 이 사다리의 기준 단위입니다. 1000 B가 모이면 1 KB가 됩니다."
                : `${units[activeUnit]}에서 ${units[activeUnit - 1]}로 한 칸 내려오면 숫자는 1000배가 됩니다.`;
        };

        unitButtons.forEach((button) => button.addEventListener("click", () => {
            activeUnit = Number(button.dataset.unitIndex);
            updateUnits();
        }));
        amountInput.addEventListener("input", updateUnits);
        updateBits();
        updateUnits();
    }

    window.COMPUTER_LAB_SETUPS.push(setupBitLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("g02");
})();
