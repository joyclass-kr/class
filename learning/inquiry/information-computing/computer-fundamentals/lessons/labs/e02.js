(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.e02 = (spec) => figure(spec, "visual-file-format-lab", `
        <section class="file-format-lab" data-format-lab data-format-stage="original">
            <div class="file-anatomy-stage">
                <div class="large-filename"><span>바다</span><i>.</i><b data-extension-label>jpg</b></div>
                <div class="file-inside">
                    <strong>파일 안의 저장 방법</strong>
                    <div class="image-data-preview"><i></i><span></span></div>
                    <b data-format-label>JPEG 방식의 사진 데이터</b>
                </div>
                <div class="open-app">
                    <strong>어떤 앱이 읽을까?</strong>
                    <i class="photo-app-icon"></i>
                    <b data-app-result>사진 앱이 JPG 형식으로 읽음</b>
                </div>
            </div>
            <div class="format-controls">
                <button type="button" data-format-action="rename">이름 끝만 .png로 바꾸기 <small>Rename Extension Only</small></button>
                <button type="button" data-format-action="convert">PNG 방식으로 변환해 저장 <small>Convert and Save as PNG</small></button>
                <button type="button" data-format-action="reset">처음으로 <small>Reset</small></button>
            </div>
            <p class="lab-readout" data-format-status><b>확장자 .jpg</b>는 사진 데이터가 어떤 방법으로 저장되었는지 알려 주는 이름표입니다.</p>
        </section>
    `);

    function setupFormatLab() {
        const lab = document.querySelector("[data-format-lab]");
        if (!lab) return;
        const extension = lab.querySelector("[data-extension-label]");
        const format = lab.querySelector("[data-format-label]");
        const app = lab.querySelector("[data-app-result]");
        const status = lab.querySelector("[data-format-status]");
        const show = (stage) => {
            lab.dataset.formatStage = stage;
            if (stage === "original") {
                extension.textContent = "jpg";
                format.textContent = "JPEG 방식의 사진 데이터";
                app.textContent = "사진 앱이 JPG 형식으로 읽음";
                status.innerHTML = "<b>확장자 .jpg</b>는 사진 데이터가 어떤 방법으로 저장되었는지 알려 주는 이름표입니다.";
            } else if (stage === "renamed") {
                extension.textContent = "png";
                format.textContent = "안쪽은 여전히 JPEG 방식";
                app.textContent = "이름표와 안쪽 형식이 달라 앱이 헷갈림";
                status.innerHTML = "<b>이름 끝만 바꿈:</b> 확장자는 .png가 되었지만 파일 안쪽의 저장 방법은 JPEG 그대로입니다.";
            } else {
                extension.textContent = "png";
                format.textContent = "PNG 방식으로 다시 저장한 데이터";
                app.textContent = "사진 앱이 PNG 형식으로 읽음";
                status.innerHTML = "<b>형식 변환:</b> 앱이 사진을 읽고 PNG의 저장 규칙으로 새 파일을 만들었습니다.";
            }
        };
        lab.querySelectorAll("[data-format-action]").forEach((button) => button.addEventListener("click", () => {
            const action = button.dataset.formatAction;
            show(action === "rename" ? "renamed" : action === "convert" ? "converted" : "original");
        }));
    }

    window.COMPUTER_LAB_SETUPS.push(setupFormatLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("e02");
})();
