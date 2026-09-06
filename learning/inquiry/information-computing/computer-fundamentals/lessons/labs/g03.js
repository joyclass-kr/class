(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.g03 = (spec) => figure(spec, "visual-compression-transfer-lab", `
        <section class="actual-compression-lab" data-compression-lab data-encoding-state="idle">
            <section class="utf8-encoding-probe" data-utf8-probe>
                <header>
                    <div><h3>글자를 실제 바이트로 바꾸기</h3><small>Encode Text as UTF-8 Bytes</small></div>
                    <p>UTF-8은 글자마다 저장할 바이트의 순서를 정한 문자 인코딩입니다. 같은 두 글자라도 어떤 글자인지에 따라 바이트 수가 달라집니다.</p>
                </header>
                <div class="utf8-probe-controls">
                    <label>저장할 글자 <small>Text to Encode</small><input type="text" value="A가" maxlength="12" data-utf8-input autocomplete="off" spellcheck="false"></label>
                    <button type="button" data-utf8-run>UTF-8 바이트 확인 <small>Encode</small></button>
                </div>
                <div class="utf8-probe-result" aria-live="polite">
                    <span><b>입력</b><strong data-utf8-text>확인 전</strong></span>
                    <span><b>바이트 수</b><strong data-utf8-byte-count>— B</strong></span>
                    <code data-utf8-bytes>버튼을 눌러 실제 값을 확인하세요.</code>
                </div>
                <p class="utf8-probe-status" data-utf8-status>영문 A와 한글 가를 함께 인코딩해 바이트 묶음을 비교해 보세요.</p>
            </section>
            <header class="compression-lab-heading">
                <div><h3>같은 그림을 WebP 파일로 저장하기</h3><small>Save the Same Image as a WebP File</small></div>
                <p>그림은 그대로 두고 사진 품질만 바꿉니다. 저장된 파일의 크기와 전송 시간을 직접 비교하세요.</p>
            </header>
            <div class="actual-compression-comparison">
                <figure class="compression-source-card">
                    <div class="compression-image-frame"><canvas width="768" height="512" data-compression-source aria-label="WebP로 인코딩할 768 곱하기 512 픽셀 원본 장면"></canvas></div>
                    <figcaption><b>인코딩 전 픽셀 <small>Source Pixels</small></b><span>Canvas 768 × 512 px</span></figcaption>
                </figure>
                <div class="compression-encode-arrow" aria-hidden="true"><b>WebP</b><small>파일로 저장</small><i>→</i></div>
                <figure class="compression-result-card">
                    <div class="compression-image-frame result-frame">
                        <img data-compression-preview alt="실제로 WebP로 인코딩한 같은 캔버스" hidden>
                        <div class="encoding-status" data-encoding-status role="status">WebP 인코딩 준비 중</div>
                    </div>
                    <figcaption><b>실제 인코딩 결과 <small>Encoded Result</small></b><span data-encoded-quality>품질 75%</span></figcaption>
                </figure>
            </div>
            <div class="compression-measurements" aria-live="polite">
                <div><span>저장 전 그림 데이터 <small>Image Data Before Saving</small></span><strong data-raw-size>1,572,864 B</strong><em>작업할 때 펼쳐 둔 데이터의 양</em></div>
                <div><span>저장된 WebP 파일 <small>Saved WebP File</small></span><strong data-file-size>저장 중</strong><em data-file-bytes>파일의 바이트 수를 확인하는 중</em></div>
                <div><span>저장 전 데이터와 비교 <small>Size Compared with Image Data</small></span><strong data-compression-ratio>—</strong><em data-file-type>WebP 형식</em></div>
            </div>
            <div class="actual-compression-controls">
                <label><span>사진 품질 <small>Image Quality</small></span><input type="range" min="10" max="100" step="5" value="75" data-compression-quality><output data-quality-output>75%</output></label>
                <label><span>전송 속도 <small>Transfer Speed</small></span><input type="range" min="0.1" max="10" step="0.1" value="2" data-transfer-speed><output data-speed-output>2.0 MB/s</output></label>
            </div>
            <div class="actual-transfer-calculation" aria-live="polite">
                <span>파일 크기 <b data-calc-size>— MB</b></span><i>÷</i><span>전송 속도 <b data-calc-speed>2.0 MB/s</b></span><i>=</i><strong>예상 전송 시간 <b data-transfer-time>—</b><small>초 seconds</small></strong>
            </div>
            <details class="compression-technical-notes"><summary>실제 측정 방식 더 알아보기 <small>How the Browser Measures It</small></summary><div>
                <p class="compression-browser-note" data-compression-note>브라우저가 현재 그림을 WebP 파일 데이터로 만든 뒤 그 바이트 수를 직접 잽니다. 브라우저에 따라 결과가 조금 다를 수 있습니다.</p>
                <p class="compression-model-note">예상 시간은 <code>파일 바이트 ÷ 1,000,000 ÷ MB/s</code>로 계산합니다. 연결 준비, 서버 처리, 순간적인 속도 변화는 포함하지 않습니다.</p>
            </div></details>
        </section>
    `);

    function setupCompressionLab() {
        const lab = document.querySelector("[data-compression-lab]");
        if (!lab) return;
        const utf8Input = lab.querySelector("[data-utf8-input]");
        const utf8Run = lab.querySelector("[data-utf8-run]");
        const utf8Text = lab.querySelector("[data-utf8-text]");
        const utf8ByteCount = lab.querySelector("[data-utf8-byte-count]");
        const utf8Bytes = lab.querySelector("[data-utf8-bytes]");
        const utf8Status = lab.querySelector("[data-utf8-status]");
        const canvas = lab.querySelector("[data-compression-source]");
        const context = canvas.getContext("2d");
        const preview = lab.querySelector("[data-compression-preview]");
        const encodingStatus = lab.querySelector("[data-encoding-status]");
        const quality = lab.querySelector("[data-compression-quality]");
        const speed = lab.querySelector("[data-transfer-speed]");
        const qualityOutput = lab.querySelector("[data-quality-output]");
        const encodedQuality = lab.querySelector("[data-encoded-quality]");
        const speedOutput = lab.querySelector("[data-speed-output]");
        const rawSizeOutput = lab.querySelector("[data-raw-size]");
        const sizeOutput = lab.querySelector("[data-file-size]");
        const byteOutput = lab.querySelector("[data-file-bytes]");
        const ratioOutput = lab.querySelector("[data-compression-ratio]");
        const typeOutput = lab.querySelector("[data-file-type]");
        const calcSize = lab.querySelector("[data-calc-size]");
        const calcSpeed = lab.querySelector("[data-calc-speed]");
        const timeOutput = lab.querySelector("[data-transfer-time]");
        const browserNote = lab.querySelector("[data-compression-note]");
        const numberFormat = new Intl.NumberFormat("ko-KR");
        const rawBytes = canvas.width * canvas.height * 4;
        let currentBytes = null;
        let previewUrl = "";
        let requestNumber = 0;
        let encodeTimer = 0;

        const encodeText = () => {
            const text = utf8Input.value;
            if (!text) {
                utf8Text.textContent = "입력 없음";
                utf8ByteCount.textContent = "0 B";
                utf8Bytes.textContent = "저장할 글자를 입력하세요.";
                utf8Status.textContent = "빈 입력은 UTF-8 바이트를 만들지 않습니다.";
                return;
            }
            if (typeof TextEncoder !== "function") {
                utf8Text.textContent = text;
                utf8ByteCount.textContent = "지원하지 않음";
                utf8Bytes.textContent = "이 브라우저에서 TextEncoder를 사용할 수 없습니다.";
                utf8Status.textContent = "다른 인코딩 값으로 대신 표시하지 않습니다.";
                return;
            }
            const bytes = new TextEncoder().encode(text);
            utf8Text.textContent = text;
            utf8ByteCount.textContent = `${bytes.length} B`;
            utf8Bytes.textContent = Array.from(bytes, (value) => value.toString(16).toUpperCase().padStart(2, "0")).join(" ");
            utf8Status.textContent = `화면의 ${Array.from(text).length}개 문자 기호가 UTF-8 규칙으로 ${bytes.length}개의 바이트가 되었습니다. 한글은 영문 A와 다른 바이트 묶음을 사용합니다.`;
        };
        utf8Run.addEventListener("click", encodeText);
        utf8Input.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            encodeText();
        });

        const paintSource = () => {
            const width = canvas.width;
            const height = canvas.height;
            const sky = context.createLinearGradient(0, 0, 0, height * .68);
            sky.addColorStop(0, "#75b9cf");
            sky.addColorStop(.58, "#d6edf0");
            sky.addColorStop(1, "#f4d59d");
            context.fillStyle = sky;
            context.fillRect(0, 0, width, height);

            context.fillStyle = "#f7d45e";
            context.beginPath();
            context.arc(625, 92, 54, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = "rgba(255,255,255,.76)";
            [[135, 98, 72, 24], [330, 70, 92, 27], [535, 150, 78, 22]].forEach(([x, y, w, h]) => {
                context.beginPath();
                context.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
                context.fill();
            });

            context.fillStyle = "#6d9367";
            context.beginPath();
            context.moveTo(0, 300); context.lineTo(145, 164); context.lineTo(286, 300); context.closePath(); context.fill();
            context.fillStyle = "#56775a";
            context.beginPath();
            context.moveTo(165, 300); context.lineTo(365, 138); context.lineTo(535, 300); context.closePath(); context.fill();
            context.fillStyle = "#41634f";
            context.beginPath();
            context.moveTo(410, 300); context.lineTo(585, 177); context.lineTo(768, 300); context.closePath(); context.fill();

            const desk = context.createLinearGradient(0, 315, 0, height);
            desk.addColorStop(0, "#b8753e");
            desk.addColorStop(1, "#744529");
            context.fillStyle = desk;
            context.fillRect(0, 300, width, height - 300);
            context.strokeStyle = "rgba(73,37,19,.28)";
            context.lineWidth = 2;
            for (let y = 326; y < height; y += 24) {
                context.beginPath();
                context.moveTo(0, y + Math.sin(y) * 4);
                for (let x = 0; x <= width; x += 32) context.lineTo(x, y + Math.sin((x + y) / 43) * 5);
                context.stroke();
            }

            context.save();
            context.translate(245, 397);
            context.rotate(-.08);
            context.fillStyle = "rgba(28,21,15,.24)";
            context.fillRect(-164, -84, 338, 180);
            context.fillStyle = "#fffaf0";
            context.fillRect(-172, -92, 338, 180);
            context.fillStyle = "#0b747c";
            context.font = "700 25px sans-serif";
            context.fillText("WEBP LAB", -138, -48);
            context.font = "16px sans-serif";
            context.fillStyle = "#4b4036";
            context.fillText("같은 픽셀 · 다른 품질 · 실제 바이트", -138, -18);
            context.strokeStyle = "#b9d7d6";
            context.lineWidth = 2;
            for (let y = 10; y <= 62; y += 17) { context.beginPath(); context.moveTo(-138, y); context.lineTo(125, y); context.stroke(); }
            ["#d96a3b", "#e7b83d", "#4f8f6e", "#3d7da0", "#795e9d"].forEach((color, index) => {
                context.fillStyle = color;
                context.fillRect(30 + index * 23, 29, 17, 34);
            });
            context.restore();

            context.save();
            context.translate(625, 397);
            context.rotate(.14);
            ["#d2583f", "#e6b139", "#297d86", "#4e7953"].forEach((color, index) => {
                context.fillStyle = color;
                context.fillRect(-74 + index * 32, -70, 16, 142);
                context.fillStyle = "#ead0a0";
                context.beginPath();
                context.moveTo(-74 + index * 32, -70); context.lineTo(-66 + index * 32, -91); context.lineTo(-58 + index * 32, -70); context.closePath(); context.fill();
            });
            context.restore();

            context.fillStyle = "rgba(255,255,255,.48)";
            for (let y = 26; y < 276; y += 18) {
                for (let x = 22; x < 746; x += 18) {
                    if ((x + y) % 36 === 0) context.fillRect(x, y, 2, 2);
                }
            }
        };

        const revokePreviewUrl = () => {
            if (!previewUrl) return;
            URL.revokeObjectURL(previewUrl);
            previewUrl = "";
        };

        const updateTransfer = () => {
            const megabytesPerSecond = Number(speed.value);
            speedOutput.textContent = `${megabytesPerSecond.toFixed(1)} MB/s`;
            calcSpeed.textContent = `${megabytesPerSecond.toFixed(1)} MB/s`;
            if (currentBytes === null) {
                calcSize.textContent = "— MB";
                timeOutput.textContent = "—";
                return;
            }
            const megabytes = currentBytes / 1000000;
            const seconds = megabytes / megabytesPerSecond;
            calcSize.textContent = `${megabytes.toFixed(4)} MB`;
            timeOutput.textContent = seconds < .01 ? seconds.toFixed(4) : seconds < 1 ? seconds.toFixed(3) : seconds.toFixed(2);
        };

        const showUnsupported = (message) => {
            requestNumber += 1;
            clearTimeout(encodeTimer);
            revokePreviewUrl();
            currentBytes = null;
            preview.hidden = true;
            preview.removeAttribute("src");
            lab.dataset.encodingState = "unsupported";
            encodingStatus.hidden = false;
            encodingStatus.textContent = message;
            sizeOutput.textContent = "지원하지 않음";
            byteOutput.textContent = "WebP Blob이 만들어지지 않았습니다.";
            ratioOutput.textContent = "—";
            typeOutput.textContent = "다른 형식으로 바꾸지 않음";
            browserNote.innerHTML = "<b>WebP 인코딩 미지원:</b> 이 브라우저에서는 Canvas를 WebP Blob으로 만들 수 없습니다. 수치를 다른 형식으로 대신 표시하지 않습니다.";
            updateTransfer();
        };

        const encode = () => {
            const selectedQuality = Number(quality.value);
            const thisRequest = ++requestNumber;
            lab.dataset.encodingState = "encoding";
            encodingStatus.hidden = false;
            encodingStatus.textContent = "실제 WebP Blob을 만드는 중";
            qualityOutput.textContent = `${selectedQuality}%`;
            encodedQuality.textContent = `품질 ${selectedQuality}% 인코딩 중`;
            canvas.toBlob((blob) => {
                if (thisRequest !== requestNumber) return;
                if (!blob || blob.type !== "image/webp") {
                    showUnsupported("이 브라우저는 Canvas WebP 인코딩을 지원하지 않습니다.");
                    return;
                }
                revokePreviewUrl();
                previewUrl = URL.createObjectURL(blob);
                preview.src = previewUrl;
                preview.hidden = false;
                preview.alt = `WebP 품질 ${selectedQuality}%로 실제 인코딩한 같은 캔버스`;
                currentBytes = blob.size;
                lab.dataset.encodingState = "ready";
                encodingStatus.hidden = true;
                sizeOutput.textContent = blob.size >= 1000000 ? `${(blob.size / 1000000).toFixed(3)} MB` : `${(blob.size / 1000).toFixed(1)} KB`;
                byteOutput.textContent = `${numberFormat.format(blob.size)} B`;
                ratioOutput.textContent = `${(blob.size / rawBytes * 100).toFixed(1)}%`;
                typeOutput.textContent = blob.type;
                encodedQuality.textContent = `품질 ${selectedQuality}% · 실제 결과`;
                updateTransfer();
            }, "image/webp", selectedQuality / 100);
        };

        const scheduleEncode = () => {
            qualityOutput.textContent = `${quality.value}%`;
            encodedQuality.textContent = `품질 ${quality.value}% 요청`;
            encodingStatus.hidden = false;
            encodingStatus.textContent = "품질 변경을 반영하는 중";
            lab.dataset.encodingState = "encoding";
            clearTimeout(encodeTimer);
            encodeTimer = window.setTimeout(encode, 120);
        };

        if (!context || typeof canvas.toBlob !== "function") {
            showUnsupported("이 브라우저는 Canvas 파일 인코딩을 지원하지 않습니다.");
            return;
        }
        paintSource();
        rawSizeOutput.textContent = `${numberFormat.format(rawBytes)} B`;
        let supportsWebP = false;
        try { supportsWebP = canvas.toDataURL("image/webp", .75).startsWith("data:image/webp"); } catch (error) { supportsWebP = false; }
        if (!supportsWebP) {
            showUnsupported("이 브라우저는 Canvas WebP 인코딩을 지원하지 않습니다.");
            return;
        }
        quality.addEventListener("input", scheduleEncode);
        speed.addEventListener("input", updateTransfer);
        window.addEventListener("pagehide", () => {
            requestNumber += 1;
            clearTimeout(encodeTimer);
            revokePreviewUrl();
        }, { once: true });
        updateTransfer();
        encode();
    }

    window.COMPUTER_LAB_SETUPS.push(setupCompressionLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("g03");
})();
