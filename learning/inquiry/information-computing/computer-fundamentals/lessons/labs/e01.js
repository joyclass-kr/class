(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.e01 = (spec) => figure(spec, "visual-path-explorer", `
        <section class="path-explorer-lab" data-path-lab data-path-stage="drive">
            <div class="path-file-manager">
                <div class="window-chrome"><b>파일 관리 실습 <small>File Manager</small></b><span>—　□　×</span></div>
                <div class="path-breadcrumb"><button type="button" data-path-choice="drive">기기 저장소 <small>Device Storage</small></button><i>›</i><button type="button" data-path-choice="user">민준 <small>Minjun</small></button><i>›</i><button type="button" data-path-choice="pictures">그림 <small>Pictures</small></button><i>›</i><button type="button" data-path-choice="trip">여행 <small>Trip</small></button></div>
                <div class="path-browser-body">
                    <aside><b>기기 저장소</b><span>└ 민준</span><span>　└ 그림</span><span>　　└ 여행</span></aside>
                    <main>
                        <button type="button" class="path-folder user-folder" data-path-choice="user"><i class="folder-art"></i><b>민준</b></button>
                        <button type="button" class="path-folder pictures-folder" data-path-choice="pictures"><i class="folder-art"></i><b>그림</b></button>
                        <button type="button" class="path-folder trip-folder" data-path-choice="trip"><i class="folder-art"></i><b>여행</b></button>
                        <button type="button" class="path-file beach-file" data-path-choice="file"><i>JPG</i><b>바다.jpg</b></button>
                    </main>
                </div>
            </div>
            <p class="path-address"><b>경로 <small>Path</small></b><code data-path-output>기기 저장소</code></p>
            <p class="lab-readout" data-path-status>드라이브는 폴더와 파일을 담는 큰 저장 공간입니다. 여기에서 사용자 폴더로 들어갈 수 있습니다.</p>
        </section>
    `);

    function setupPathLab() {
        const lab = document.querySelector("[data-path-lab]");
        if (!lab) return;
        const output = lab.querySelector("[data-path-output]");
        const status = lab.querySelector("[data-path-status]");
        const states = {
            drive: ["기기 저장소", "저장소는 폴더와 파일을 담는 큰 저장 공간입니다. 여기에서 사용자 폴더로 들어갈 수 있습니다."],
            user: ["기기 저장소/민준", "사용자 폴더는 한 사람이 쓰는 문서·그림·다운로드 폴더를 모아 둡니다."],
            pictures: ["기기 저장소/민준/그림", "저장소 안에 폴더가 있고, 그림 폴더 안에 여행 폴더가 있습니다. 폴더를 열면 경로가 한 칸 길어집니다."],
            trip: ["기기 저장소/민준/그림/여행", "여행 폴더 안에서 바다.jpg 파일을 찾았습니다. 파일을 눌러 파일 이름까지 포함한 전체 경로를 완성하세요."],
            file: ["기기 저장소/민준/그림/여행/바다.jpg", "저장소·폴더·파일 이름을 차례로 이어 쓴 값이 이 파일의 전체 경로입니다. 실제 구분 기호는 운영체제에 따라 / 또는 \\처럼 보일 수 있습니다."]
        };
        const choose = (stage) => {
            lab.dataset.pathStage = stage;
            output.textContent = states[stage][0];
            status.textContent = states[stage][1];
            lab.querySelectorAll("[data-path-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.pathChoice === stage)));
        };
        lab.querySelectorAll("[data-path-choice]").forEach((button) => button.addEventListener("click", () => choose(button.dataset.pathChoice)));
        choose("drive");
    }

    window.COMPUTER_LAB_SETUPS.push(setupPathLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("e01");
})();
