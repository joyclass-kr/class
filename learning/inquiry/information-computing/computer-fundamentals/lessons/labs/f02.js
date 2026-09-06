(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.f02 = (spec) => figure(spec, "visual-color-image-lab", `
        <section class="image-workbench" data-color-lab data-image-panel="rgb" style="--red:210;--green:126;--blue:48">
            <div class="image-concept-tabs" role="tablist" aria-label="이미지 개념 실험">
                <button type="button" role="tab" data-image-panel-choice="rgb" aria-selected="true" tabindex="0">1. RGB 빛 <small>RGB Light</small></button>
                <button type="button" role="tab" data-image-panel-choice="structure" aria-selected="false" tabindex="-1">2. 래스터·벡터 <small>Raster and Vector</small></button>
                <button type="button" role="tab" data-image-panel-choice="format" aria-selected="false" tabindex="-1">3. JPG·PNG·WebP <small>File Formats</small></button>
            </div>
            <section class="image-panel rgb-panel" role="tabpanel" data-image-panel-content="rgb">
                <div class="light-mixer">
                    <div class="light-beam red-beam"></div><div class="light-beam green-beam"></div><div class="light-beam blue-beam"></div>
                    <div class="mixed-light" data-mixed-light></div>
                    <output data-rgb-output>R 210 · G 126 · B 48</output>
                </div>
                <div class="color-sliders">
                    <label class="red-control">빨강 빛 <small>Red</small><input type="range" min="0" max="255" value="210" data-color-channel="red"></label>
                    <label class="green-control">초록 빛 <small>Green</small><input type="range" min="0" max="255" value="126" data-color-channel="green"></label>
                    <label class="blue-control">파랑 빛 <small>Blue</small><input type="range" min="0" max="255" value="48" data-color-channel="blue"></label>
                    <p>RGB는 파일 형식이 아니라 화면 픽셀에서 빨강·초록·파랑 <b>빛의 밝기</b>를 정하는 값입니다.</p>
                </div>
            </section>
            <section class="image-panel structure-panel" role="tabpanel" data-image-panel-content="structure" hidden>
                <div class="zoom-control"><label>확대 <small>Zoom</small><input type="range" min="1" max="8" step="1" value="1" data-image-zoom></label><output data-image-zoom-output>1×</output></div>
                <div class="zoom-compare">
                    <figure class="zoom-window raster-window">
                        <div class="zoom-stage"><canvas width="32" height="24" data-raster-canvas aria-label="32 곱하기 24 픽셀로 저장한 꽃 그림"></canvas></div>
                        <figcaption><b>래스터 <small>Raster</small></b><span>저장된 픽셀 칸을 그대로 크게 펼칩니다.</span></figcaption>
                    </figure>
                    <figure class="zoom-window vector-window">
                        <div class="zoom-stage"><svg data-vector-image viewBox="0 0 160 120" width="160" height="120" aria-label="선과 도형 규칙으로 그린 같은 꽃"><rect width="160" height="120" fill="#d8ece9"/><g fill="#d57934" stroke="#843f21" stroke-width="2"><ellipse cx="80" cy="35" rx="18" ry="28"/><ellipse cx="80" cy="85" rx="18" ry="28"/><ellipse cx="52" cy="60" rx="28" ry="18"/><ellipse cx="108" cy="60" rx="28" ry="18"/></g><circle cx="80" cy="60" r="16" fill="#f2c54f" stroke="#775116" stroke-width="2"/></svg></div>
                        <figcaption><b>벡터 <small>Vector</small></b><span>선과 도형 규칙을 현재 크기에 맞게 다시 계산합니다.</span></figcaption>
                    </figure>
                </div>
            </section>
            <section class="image-panel format-panel" role="tabpanel" data-image-panel-content="format" hidden>
                <div class="format-controls">
                    <div class="format-source-choice" role="group" aria-label="저장할 원본"><button type="button" data-format-source="photo" aria-pressed="true">사진 <small>Photo</small></button><button type="button" data-format-source="sticker" aria-pressed="false">투명 스티커 <small>Transparent Sticker</small></button></div>
                    <div class="format-choice" role="group" aria-label="파일 형식"><button type="button" data-format-choice="jpg" aria-pressed="true">JPG</button><button type="button" data-format-choice="png" aria-pressed="false">PNG</button><button type="button" data-format-choice="webp" aria-pressed="false">WebP</button></div>
                </div>
                <div class="format-result">
                    <div class="checkerboard"><img data-format-preview alt="선택한 형식으로 실제 저장한 결과"></div>
                    <dl>
                        <div><dt>실제 결과 크기</dt><dd data-format-size>계산 중</dd></div>
                        <div><dt>투명 배경</dt><dd data-format-alpha>지원하지 않음</dd></div>
                        <div><dt>저장 방식</dt><dd data-format-compression>손실 압축</dd></div>
                    </dl>
                </div>
                <canvas width="320" height="240" data-format-source-canvas hidden></canvas>
                <p class="model-note">표시된 바이트 수는 지금 이 원본을 이 설정으로 실제 저장한 결과입니다. 다른 사진이나 품질 설정에서는 파일 크기의 순서가 달라질 수 있습니다.</p>
            </section>
            <p class="lab-readout" data-image-status aria-live="polite"><b>RGB:</b> 세 빛의 밝기 값을 바꿔 화면 픽셀이 내는 색을 관찰하세요.</p>
        </section>
    `);

    function setupColorLab() {
        const lab = document.querySelector("[data-color-lab]");
        if (!lab) return;
        const output = lab.querySelector("[data-rgb-output]");
        const status = lab.querySelector("[data-image-status]");
        const values = { red: 210, green: 126, blue: 48 };
        const updateColor = () => {
            Object.entries(values).forEach(([name, value]) => lab.style.setProperty(`--${name}`, value));
            lab.style.setProperty("--mixed-color", `rgb(${values.red}, ${values.green}, ${values.blue})`);
            output.textContent = `R ${values.red} · G ${values.green} · B ${values.blue}`;
        };
        lab.querySelectorAll("[data-color-channel]").forEach((input) => input.addEventListener("input", () => {
            values[input.dataset.colorChannel] = Number(input.value);
            updateColor();
        }));
        const tabButtons = Array.from(lab.querySelectorAll("[data-image-panel-choice]"));
        const showPanel = (name, focus = false) => {
            lab.dataset.imagePanel = name;
            tabButtons.forEach((button) => {
                const active = button.dataset.imagePanelChoice === name;
                button.setAttribute("aria-selected", String(active));
                button.tabIndex = active ? 0 : -1;
                if (active && focus) button.focus();
            });
            lab.querySelectorAll("[data-image-panel-content]").forEach((panel) => { panel.hidden = panel.dataset.imagePanelContent !== name; });
            if (name === "rgb") status.innerHTML = "<b>RGB:</b> 세 빛의 밝기 값을 바꿔 화면 픽셀이 내는 색을 관찰하세요. RGB는 파일 형식이 아닙니다.";
            if (name === "structure") status.innerHTML = "<b>래스터와 벡터:</b> 같은 꽃을 확대해 저장된 픽셀 칸과 도형 규칙의 차이를 비교하세요.";
            if (name === "format") status.innerHTML = "<b>파일 형식:</b> 같은 원본을 실제 JPG·PNG·WebP 데이터로 만들어 크기와 투명도 결과를 비교하세요.";
        };
        tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => showPanel(button.dataset.imagePanelChoice));
            button.addEventListener("keydown", (event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const direction = event.key === "ArrowRight" ? 1 : -1;
                const next = (index + direction + tabButtons.length) % tabButtons.length;
                showPanel(tabButtons[next].dataset.imagePanelChoice, true);
            });
        });
        const raster = lab.querySelector("[data-raster-canvas]");
        const rasterContext = raster.getContext("2d");
        rasterContext.fillStyle = "#d8ece9";
        rasterContext.fillRect(0, 0, raster.width, raster.height);
        rasterContext.fillStyle = "#d57934";
        rasterContext.fillRect(13, 3, 6, 8);
        rasterContext.fillRect(13, 13, 6, 8);
        rasterContext.fillRect(6, 9, 8, 6);
        rasterContext.fillRect(18, 9, 8, 6);
        rasterContext.fillStyle = "#f2c54f";
        rasterContext.fillRect(13, 9, 6, 6);
        const zoomInput = lab.querySelector("[data-image-zoom]");
        const zoomOutput = lab.querySelector("[data-image-zoom-output]");
        const vector = lab.querySelector("[data-vector-image]");
        const setZoom = (zoom) => {
            const width = 160 * zoom;
            const height = 120 * zoom;
            raster.style.width = width + "px";
            raster.style.height = height + "px";
            vector.setAttribute("width", String(width));
            vector.setAttribute("height", String(height));
            zoomOutput.textContent = zoom + "×";
            status.innerHTML = "<b>" + zoom + "배 확대:</b> 래스터는 기존 픽셀 칸도 함께 커집니다. 벡터는 도형 규칙을 현재 크기에 맞게 다시 그립니다. 벡터도 화면에 나타날 때는 마지막에 화면 픽셀로 바뀝니다.";
        };
        zoomInput.addEventListener("input", () => setZoom(Number(zoomInput.value)));
        let formatSource = "photo";
        let formatName = "jpg";
        let objectUrl = "";
        let encodeToken = 0;
        const sourceCanvas = lab.querySelector("[data-format-source-canvas]");
        const preview = lab.querySelector("[data-format-preview]");
        const sizeOutput = lab.querySelector("[data-format-size]");
        const alphaOutput = lab.querySelector("[data-format-alpha]");
        const compressionOutput = lab.querySelector("[data-format-compression]");
        const formatInfo = {
            jpg: ["image/jpeg", .72, "지원하지 않음", "손실 압축 · 사진에 널리 사용"],
            png: ["image/png", undefined, "지원", "픽셀 값을 손실 없이 보존"],
            webp: ["image/webp", .72, "지원", "손실·무손실과 투명도를 지원"]
        };
        const drawSource = () => {
            const context = sourceCanvas.getContext("2d");
            context.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
            if (formatSource === "photo") {
                const sky = context.createLinearGradient(0, 0, 0, 240);
                sky.addColorStop(0, "#78bdd1");
                sky.addColorStop(.58, "#f1d28d");
                sky.addColorStop(1, "#628951");
                context.fillStyle = sky;
                context.fillRect(0, 0, 320, 240);
                context.fillStyle = "#456c52";
                context.beginPath();
                context.moveTo(0, 190); context.lineTo(92, 74); context.lineTo(170, 185); context.lineTo(230, 104); context.lineTo(320, 190); context.lineTo(320, 240); context.lineTo(0, 240); context.fill();
                context.fillStyle = "#f5d466";
                context.beginPath(); context.arc(255, 54, 25, 0, Math.PI * 2); context.fill();
            } else {
                context.fillStyle = "#db6f39";
                for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                    context.save();
                    context.translate(160, 120);
                    context.rotate(angle);
                    context.beginPath(); context.ellipse(0, -50, 25, 48, 0, 0, Math.PI * 2); context.fill();
                    context.restore();
                }
                context.fillStyle = "#f3cb4f";
                context.beginPath(); context.arc(160, 120, 33, 0, Math.PI * 2); context.fill();
            }
        };
        const encodeFormat = () => {
            drawSource();
            const token = ++encodeToken;
            const info = formatInfo[formatName];
            const encodeCanvas = document.createElement("canvas");
            encodeCanvas.width = sourceCanvas.width;
            encodeCanvas.height = sourceCanvas.height;
            const context = encodeCanvas.getContext("2d");
            if (formatName === "jpg") {
                context.fillStyle = "#fff";
                context.fillRect(0, 0, encodeCanvas.width, encodeCanvas.height);
            }
            context.drawImage(sourceCanvas, 0, 0);
            sizeOutput.textContent = "계산 중";
            alphaOutput.textContent = info[2];
            compressionOutput.textContent = info[3];
            encodeCanvas.toBlob((blob) => {
                if (token !== encodeToken) return;
                if (!blob || blob.type !== info[0]) {
                    sizeOutput.textContent = "이 브라우저에서 만들기 미지원";
                    preview.removeAttribute("src");
                    return;
                }
                if (objectUrl) URL.revokeObjectURL(objectUrl);
                objectUrl = URL.createObjectURL(blob);
                preview.src = objectUrl;
                preview.alt = (formatSource === "photo" ? "사진" : "투명 스티커") + "를 " + formatName.toUpperCase() + " 형식으로 실제 저장한 결과";
                sizeOutput.textContent = blob.size.toLocaleString("ko-KR") + " B";
            }, info[0], info[1]);
        };
        lab.querySelectorAll("[data-format-source]").forEach((button) => button.addEventListener("click", () => {
            formatSource = button.dataset.formatSource;
            lab.querySelectorAll("[data-format-source]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            encodeFormat();
        }));
        lab.querySelectorAll("[data-format-choice]").forEach((button) => button.addEventListener("click", () => {
            formatName = button.dataset.formatChoice;
            lab.querySelectorAll("[data-format-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            encodeFormat();
        }));
        window.addEventListener("pagehide", () => { if (objectUrl) URL.revokeObjectURL(objectUrl); }, { once: true });
        updateColor();
        setZoom(1);
        encodeFormat();
        showPanel("rgb");
    }

    window.COMPUTER_LAB_SETUPS.push(setupColorLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("f02");
})();
