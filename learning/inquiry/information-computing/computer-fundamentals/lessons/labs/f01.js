(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.f01 = (spec) => figure(spec, "visual-pixel-lab", `
        <section class="display-lab" data-pixel-lab data-compare-mode="same-size" data-ui-scale="100">
            <div class="display-mode-switch" role="group" aria-label="화면 비교 기준">
                <button type="button" data-display-mode="same-size" aria-pressed="true">같은 화면 크기 <small>Same Screen Size</small></button>
                <button type="button" data-display-mode="same-resolution" aria-pressed="false">같은 해상도 <small>Same Resolution</small></button>
            </div>
            <div class="display-screen-pair">
                <figure class="display-model" data-screen-model="a" data-frame="same">
                    <div class="model-screen"><div class="model-pixel-grid" data-pixel-grid="a" aria-label="픽셀 모형으로 그린 같은 집"></div></div>
                    <figcaption><b data-screen-label="a">12 × 8 픽셀 모형</b><span data-screen-note="a">픽셀 칸이 큼</span></figcaption>
                </figure>
                <figure class="display-model" data-screen-model="b" data-frame="same">
                    <div class="model-screen"><div class="model-pixel-grid" data-pixel-grid="b" aria-label="픽셀 모형으로 그린 같은 집"></div></div>
                    <figcaption><b data-screen-label="b">24 × 16 픽셀 모형</b><span data-screen-note="b">픽셀 칸이 더 촘촘함</span></figcaption>
                </figure>
            </div>
            <p class="lab-readout" data-display-status aria-live="polite"></p>
            <section class="ui-scaling-demo">
                <header><b>표시 배율 <small>Display Scaling</small></b><output data-scale-output>100%</output></header>
                <div class="scale-viewport">
                    <div class="scale-ui">
                        <strong>과제 파일</strong><button type="button" data-scale-open aria-expanded="false">열기 <small>Open</small></button>
                        <span>글자와 단추는 더 많은 픽셀을 차지하지만 화면 해상도는 그대로입니다.</span>
                        <div class="scale-file-preview" data-scale-file-preview hidden><b>과제.pdf</b><span>파일 내용 미리보기 <small>File Preview</small></span></div>
                        <i></i><i></i><i></i><i></i>
                    </div>
                </div>
                <div class="scale-choice" role="group" aria-label="표시 배율">
                    <button type="button" data-ui-scale-choice="100" aria-pressed="true">100%</button>
                    <button type="button" data-ui-scale-choice="150" aria-pressed="false">150%</button>
                    <button type="button" data-ui-scale-choice="200" aria-pressed="false">200%</button>
                </div>
            </section>
            <p class="model-note"><b>학습 모형:</b> 12×8과 24×16은 차이를 크게 보여 주기 위한 격자입니다. 실제 화면은 훨씬 많은 픽셀을 사용합니다.</p>
        </section>
    `);

    function setupPixelLab() {
        const lab = document.querySelector("[data-pixel-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-display-status]");
        const scaleOutput = lab.querySelector("[data-scale-output]");
        const openButton = lab.querySelector("[data-scale-open]");
        const filePreview = lab.querySelector("[data-scale-file-preview]");
        const drawModelGrid = (grid, columns, rows) => {
            grid.replaceChildren();
            grid.style.setProperty("--model-columns", columns);
            grid.style.setProperty("--model-rows", rows);
            const fragment = document.createDocumentFragment();
            for (let index = 0; index < columns * rows; index += 1) {
                const x = index % columns;
                const y = Math.floor(index / columns);
                const nx = x / Math.max(1, columns - 1);
                const ny = y / Math.max(1, rows - 1);
                let part = "sky";
                if (ny > .82) part = "ground";
                if (ny > .34 && ny < .58 && Math.abs(nx - .5) < (.62 - ny)) part = "roof";
                if (ny >= .53 && nx > .23 && nx < .78) part = "wall";
                if (ny > .65 && nx > .42 && nx < .58) part = "window";
                const cell = document.createElement("i");
                cell.className = part;
                fragment.append(cell);
            }
            grid.append(fragment);
        };
        const setComparison = (mode) => {
            const models = {
                "same-size": {
                    a: [12, 8, "same", "12 × 8 픽셀 모형", "픽셀 칸이 큼"],
                    b: [24, 16, "same", "24 × 16 픽셀 모형", "가로·세로 2배, 전체 픽셀 4배"],
                    message: "<b>같은 화면 크기:</b> 오른쪽은 같은 넓이에 가로·세로 픽셀이 2배라 전체 픽셀 수가 4배입니다. 한 칸이 더 작고 촘촘합니다."
                },
                "same-resolution": {
                    a: [18, 12, "small", "18 × 12 · 작은 화면", "같은 길이에 픽셀이 더 촘촘함"],
                    b: [18, 12, "large", "18 × 12 · 큰 화면", "같은 픽셀 수가 더 넓게 펼쳐짐"],
                    message: "<b>같은 해상도:</b> 두 화면의 픽셀 수는 같지만 작은 화면 쪽이 같은 길이 안에 픽셀이 더 많이 들어가므로 픽셀 밀도가 높습니다."
                }
            };
            const selected = models[mode];
            lab.dataset.compareMode = mode;
            lab.querySelectorAll("[data-display-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.displayMode === mode)));
            ["a", "b"].forEach((key) => {
                const values = selected[key];
                const model = lab.querySelector('[data-screen-model="' + key + '"]');
                model.dataset.frame = values[2];
                lab.querySelector('[data-screen-label="' + key + '"]').textContent = values[3];
                lab.querySelector('[data-screen-note="' + key + '"]').textContent = values[4];
                drawModelGrid(lab.querySelector('[data-pixel-grid="' + key + '"]'), values[0], values[1]);
            });
            status.innerHTML = selected.message;
        };
        const setDisplayScale = (value) => {
            lab.dataset.uiScale = value;
            scaleOutput.textContent = value + "%";
            lab.querySelectorAll("[data-ui-scale-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.uiScaleChoice === value)));
        };
        lab.querySelectorAll("[data-display-mode]").forEach((button) => button.addEventListener("click", () => setComparison(button.dataset.displayMode)));
        lab.querySelectorAll("[data-ui-scale-choice]").forEach((button) => button.addEventListener("click", () => setDisplayScale(button.dataset.uiScaleChoice)));
        openButton.addEventListener("click", () => {
            const opening = filePreview.hidden;
            filePreview.hidden = !opening;
            openButton.setAttribute("aria-expanded", String(opening));
            setBilingualButtonLabel(openButton, opening ? "닫기" : "열기", opening ? "Close" : "Open");
            status.innerHTML = opening
                ? "<b>파일 열기:</b> 과제.pdf의 내용 화면이 열렸습니다. 표시 배율과 화면 해상도는 바뀌지 않았습니다."
                : "<b>파일 닫기:</b> 미리보기만 닫혔습니다. 픽셀 수와 표시 배율은 그대로입니다.";
        });
        setComparison("same-size");
        setDisplayScale("100");
    }

    window.COMPUTER_LAB_SETUPS.push(setupPixelLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("f01");
})();
