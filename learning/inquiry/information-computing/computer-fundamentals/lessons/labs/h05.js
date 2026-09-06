(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.h05 = (spec) => figure(spec, "visual-web-transfer-lab", `
        <section class="transfer-state-lab" data-transfer-lab data-transfer-mode="download">
            <div class="transfer-state-tabs" role="tablist" aria-label="웹 데이터 상태 실험">
                <button type="button" role="tab" id="transfer-tab-download" aria-controls="transfer-panel-download" aria-selected="true" data-transfer-mode-choice="download">다운로드 <small>Download</small></button>
                <button type="button" role="tab" id="transfer-tab-upload" aria-controls="transfer-panel-upload" aria-selected="false" data-transfer-mode-choice="upload">업로드 <small>Upload</small></button>
                <button type="button" role="tab" id="transfer-tab-cookie" aria-controls="transfer-panel-cookie" aria-selected="false" data-transfer-mode-choice="cookie">쿠키 <small>Cookie</small></button>
                <button type="button" role="tab" id="transfer-tab-cache" aria-controls="transfer-panel-cache" aria-selected="false" data-transfer-mode-choice="cache">캐시 <small>Cache</small></button>
                <button type="button" role="tab" id="transfer-tab-deploy" aria-controls="transfer-panel-deploy" aria-selected="false" data-transfer-mode-choice="deploy">배포 <small>Deployment</small></button>
            </div>
            <section class="transfer-state-panel transfer-copy-panel" id="transfer-panel-download" role="tabpanel" aria-labelledby="transfer-tab-download" data-transfer-panel="download" data-transfer-stage="ready">
                <header><h3>서버 파일을 내 기기로 받기 <small>Download</small></h3><p>서버의 원본을 없애지 않고 내 기기에 사본을 만듭니다.</p></header>
                <div class="transfer-copy-scene">
                    <article class="transfer-file-place server-place"><strong>웹 서버 <small>Server</small></strong><div class="transfer-file-row"><i class="file-sheet"><b>별자리</b><small>.webp</small></i><span>원본 1개</span></div></article>
                    <div class="transfer-route" aria-label="서버에서 내 기기 방향"><span>서버 → 내 기기</span><i>→</i></div>
                    <article class="transfer-file-place device-place"><strong>내 기기 · 다운로드 폴더 <small>Device</small></strong><div class="transfer-empty" data-download-empty>파일 없음</div><div class="transfer-file-row transfer-new-copy" data-download-copy hidden><i class="file-sheet"><b>별자리</b><small>.webp</small></i><span>사본 1개</span></div></article>
                </div>
                <p class="lab-readout" data-transfer-status>서버에는 원본 1개가 있고, 내 기기에는 아직 사본이 없습니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>내 기기로 다운로드 <small>Download to My Device</small></button><button type="button" data-transfer-reset>초기화 <small>Reset</small></button></div>
            </section>

            <section class="transfer-state-panel transfer-copy-panel" id="transfer-panel-upload" role="tabpanel" aria-labelledby="transfer-tab-upload" data-transfer-panel="upload" data-transfer-stage="ready" hidden>
                <header><h3>내 파일을 서버로 보내기 <small>Upload</small></h3><p>내 기기의 원본을 남긴 채 서버에 사본을 만듭니다.</p></header>
                <div class="transfer-copy-scene">
                    <article class="transfer-file-place device-place"><strong>내 기기 · 과제 폴더 <small>Device</small></strong><div class="transfer-file-row"><i class="file-sheet"><b>관찰일지</b><small>.pdf</small></i><span>원본 1개</span></div></article>
                    <div class="transfer-route" aria-label="내 기기에서 서버 방향"><span>내 기기 → 서버</span><i>→</i></div>
                    <article class="transfer-file-place server-place"><strong>수업 서버 · 제출함 <small>Server</small></strong><div class="transfer-empty" data-upload-empty>파일 없음</div><div class="transfer-file-row transfer-new-copy" data-upload-copy hidden><i class="file-sheet"><b>관찰일지</b><small>.pdf</small></i><span>사본 1개</span></div></article>
                </div>
                <p class="lab-readout" data-transfer-status>내 기기에는 원본 1개가 있고, 서버 제출함에는 아직 사본이 없습니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>서버로 업로드 <small>Upload to the Server</small></button><button type="button" data-transfer-reset>초기화 <small>Reset</small></button></div>
            </section>
            <section class="transfer-state-panel cookie-request-panel" id="transfer-panel-cookie" role="tabpanel" aria-labelledby="transfer-tab-cookie" data-transfer-panel="cookie" data-transfer-stage="empty" hidden>
                <header><h3>언어 선택을 다음 요청에 다시 보내기 <small>Cookie</small></h3><p>서버가 준 작은 값을 브라우저가 저장하고, 다음 요청에 붙여 보냅니다.</p></header>
                <div class="cookie-request-scene">
                    <article class="browser-state-window"><strong>브라우저 쿠키 저장소</strong><code data-cookie-store>저장된 값 없음</code></article>
                    <div class="http-message-log"><div><b>브라우저의 요청</b><code data-cookie-request>Cookie 헤더 없음</code></div><div><b>서버의 처리</b><code data-cookie-server>요청 대기</code></div></div>
                </div>
                <p class="lab-readout" data-transfer-status>처음 요청에는 언어 쿠키가 없습니다. 한국어 선택을 서버에 보내 보세요.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>한국어 선택 저장 <small>Save Korean Preference</small></button><button type="button" data-transfer-reset>초기화 <small>Reset</small></button></div>
            </section>
            <section class="transfer-state-panel cache-request-panel" id="transfer-panel-cache" role="tabpanel" aria-labelledby="transfer-tab-cache" data-transfer-panel="cache" data-transfer-stage="empty" hidden>
                <header><h3>한 번 받은 그림 사본 다시 쓰기 <small>Cache</small></h3><p>첫 요청에서 받은 파일 사본을 브라우저 가까이에 두고 다음 표시에 재사용합니다.</p></header>
                <div class="cache-request-scene">
                    <article class="cache-server-source"><strong>웹 서버</strong><div class="transfer-file-row"><i class="file-sheet"><b>logo</b><small>.webp</small></i><span>원본</span></div><output data-cache-count>서버 요청 0회</output></article>
                    <div class="transfer-route"><span data-cache-route>첫 요청 전</span><i>→</i></div>
                    <article class="browser-cache-drawer"><strong>브라우저 캐시</strong><div class="transfer-empty" data-cache-empty>사본 없음</div><div class="transfer-file-row transfer-new-copy" data-cache-copy hidden><i class="file-sheet"><b>logo</b><small>.webp</small></i><span>임시 사본</span></div><output data-cache-screen>화면 표시 전</output></article>
                </div>
                <p class="lab-readout" data-transfer-status>캐시는 비어 있습니다. 첫 요청은 서버에서 그림을 받아야 합니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>그림 처음 열기 <small>Open the Image Once</small></button><button type="button" data-transfer-reset>초기화 <small>Reset</small></button></div>
            </section>
            <section class="transfer-state-panel deploy-state-panel" id="transfer-panel-deploy" role="tabpanel" aria-labelledby="transfer-tab-deploy" data-transfer-panel="deploy" data-transfer-stage="local" hidden>
                <header><h3>내 수정본을 학생 화면까지 보내기 <small>Deploy</small></h3><p>로컬 저장, 공개 서버 배포, 학생 화면 새로고침은 서로 다른 단계입니다.</p></header>
                <div class="deploy-state-scene">
                    <article class="deploy-environment local-environment"><strong>내 컴퓨터 <small>Local</small></strong><span class="version-badge">v2</span><p>수정 완료</p></article>
                    <i class="deploy-arrow">→</i>
                    <article class="deploy-environment public-environment"><strong>공개 서버 <small>Public Server</small></strong><span class="version-badge" data-deploy-server>v1</span><p data-deploy-server-note>아직 이전 버전</p></article>
                    <i class="deploy-arrow">→</i>
                    <article class="deploy-environment student-environment"><strong>학생 화면 <small>Student Device</small></strong><span class="version-badge" data-deploy-student>v1</span><p data-deploy-student-note>현재 보이는 버전</p></article>
                </div>
                <p class="lab-readout" data-transfer-status>내 컴퓨터에 v2를 저장했지만 공개 서버와 학생 화면은 아직 v1입니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>공개 서버에 v2 배포 <small>Deploy v2 Publicly</small></button><button type="button" data-transfer-reset>초기화 <small>Reset</small></button></div>
            </section>
        </section>
    `);

    function setupTransferLab() {
        const lab = document.querySelector("[data-transfer-lab]");
        if (!lab) return;
        const tabs = [...lab.querySelectorAll("[data-transfer-mode-choice]")];
        const panels = [...lab.querySelectorAll("[data-transfer-panel]")];
        const stage = { download: 0, upload: 0, cookie: 0, cache: 0, deploy: 0 };

        const showCopy = (panel, mode) => {
            const completed = stage[mode] === 1;
            const empty = panel.querySelector(mode === "download" ? "[data-download-empty]" : "[data-upload-empty]");
            const copy = panel.querySelector(mode === "download" ? "[data-download-copy]" : "[data-upload-copy]");
            const action = panel.querySelector("[data-transfer-action]");
            panel.dataset.transferStage = completed ? "copied" : "ready";
            empty.hidden = completed;
            copy.hidden = !completed;
            action.disabled = completed;
            const copyLabel = completed
                ? ["사본 만들기 완료", "Copy Complete"]
                : mode === "download"
                    ? ["내 기기로 다운로드", "Download to My Device"]
                    : ["서버로 업로드", "Upload to the Server"];
            setBilingualButtonLabel(action, ...copyLabel);
            panel.querySelector("[data-transfer-status]").textContent = completed
                ? mode === "download"
                    ? "서버의 원본 1개와 내 기기의 사본 1개가 모두 남았습니다."
                    : "내 기기의 원본 1개와 서버의 사본 1개가 모두 남았습니다."
                : mode === "download"
                    ? "서버에는 원본 1개가 있고, 내 기기에는 아직 사본이 없습니다."
                    : "내 기기에는 원본 1개가 있고, 서버 제출함에는 아직 사본이 없습니다.";
        };

        const showCookie = (panel) => {
            const current = stage.cookie;
            const action = panel.querySelector("[data-transfer-action]");
            panel.dataset.transferStage = current === 0 ? "empty" : current === 1 ? "stored" : "sent";
            panel.querySelector("[data-cookie-store]").textContent = current === 0 ? "저장된 값 없음" : "language = ko";
            panel.querySelector("[data-cookie-request]").textContent = current < 2 ? "Cookie 헤더 없음" : "Cookie: language=ko";
            panel.querySelector("[data-cookie-server]").textContent = current === 0
                ? "요청 대기"
                : current === 1
                    ? "응답: Set-Cookie: language=ko"
                    : "다음 요청의 language=ko를 읽어 한국어 페이지 선택";
            action.disabled = current === 2;
            const cookieLabel = current === 0
                ? ["한국어 선택 저장", "Save Korean Preference"]
                : current === 1
                    ? ["다음 요청 보내기", "Send the Next Request"]
                    : ["다음 요청 확인 완료", "Next Request Checked"];
            setBilingualButtonLabel(action, ...cookieLabel);
            panel.querySelector("[data-transfer-status]").textContent = current === 0
                ? "처음 요청에는 언어 쿠키가 없습니다. 한국어 선택을 서버에 보내 보세요."
                : current === 1
                    ? "서버의 응답을 받아 브라우저가 language=ko를 저장했습니다. 아직 다음 요청에는 보내지 않았습니다."
                    : "브라우저가 다음 요청에 Cookie: language=ko를 넣었고, 서버가 한국어 페이지를 골랐습니다.";
        };

        const showCache = (panel) => {
            const current = stage.cache;
            const action = panel.querySelector("[data-transfer-action]");
            const empty = panel.querySelector("[data-cache-empty]");
            const copy = panel.querySelector("[data-cache-copy]");
            panel.dataset.transferStage = current === 0 ? "empty" : current === 1 ? "stored" : "reused";
            empty.hidden = current > 0;
            copy.hidden = current === 0;
            panel.querySelector("[data-cache-count]").textContent = `서버 요청 ${current === 0 ? 0 : 1}회`;
            panel.querySelector("[data-cache-route]").textContent = current === 0 ? "첫 요청 전" : current === 1 ? "서버 응답 → 캐시에 저장" : "캐시 사본 → 화면";
            panel.querySelector("[data-cache-screen]").textContent = current === 0 ? "화면 표시 전" : current === 1 ? "서버에서 받은 그림 표시" : "캐시 사본으로 그림 표시";
            action.disabled = current === 2;
            const cacheLabel = current === 0
                ? ["그림 처음 열기", "Open the Image Once"]
                : current === 1
                    ? ["같은 그림 다시 열기", "Open the Same Image Again"]
                    : ["캐시 재사용 확인 완료", "Cache Reuse Checked"];
            setBilingualButtonLabel(action, ...cacheLabel);
            panel.querySelector("[data-transfer-status]").textContent = current === 0
                ? "캐시는 비어 있습니다. 첫 요청은 서버에서 그림을 받아야 합니다."
                : current === 1
                    ? "서버에서 logo.webp를 한 번 받아 화면에 표시하고 캐시에 사본을 저장했습니다."
                    : "같은 그림을 다시 열 때 캐시 사본을 사용했습니다. 서버 요청 횟수는 1회 그대로입니다.";
        };

        const showDeploy = (panel) => {
            const current = stage.deploy;
            const action = panel.querySelector("[data-transfer-action]");
            panel.dataset.transferStage = current === 0 ? "local" : current === 1 ? "public" : "student";
            panel.querySelector("[data-deploy-server]").textContent = current === 0 ? "v1" : "v2";
            panel.querySelector("[data-deploy-server-note]").textContent = current === 0 ? "아직 이전 버전" : "v2 배포 완료";
            panel.querySelector("[data-deploy-student]").textContent = current < 2 ? "v1" : "v2";
            panel.querySelector("[data-deploy-student-note]").textContent = current < 2 ? "현재 보이는 버전" : "새로고침 뒤 v2 표시";
            action.disabled = current === 2;
            const deployLabel = current === 0
                ? ["공개 서버에 v2 배포", "Deploy v2 Publicly"]
                : current === 1
                    ? ["학생 화면 새로고침", "Refresh the Student Screen"]
                    : ["배포 확인 완료", "Deployment Checked"];
            setBilingualButtonLabel(action, ...deployLabel);
            panel.querySelector("[data-transfer-status]").textContent = current === 0
                ? "내 컴퓨터에 v2를 저장했지만 공개 서버와 학생 화면은 아직 v1입니다."
                : current === 1
                    ? "공개 서버는 v2가 되었지만 학생 화면에는 아직 전에 받은 v1이 보입니다."
                    : "학생이 새로고침해 공개 서버의 v2를 받았습니다. 세 위치의 버전을 차례로 확인했습니다.";
        };

        const render = (mode) => {
            const panel = panels.find((item) => item.dataset.transferPanel === mode);
            if (mode === "download" || mode === "upload") showCopy(panel, mode);
            else if (mode === "cookie") showCookie(panel);
            else if (mode === "cache") showCache(panel);
            else showDeploy(panel);
        };
        const selectMode = (mode) => {
            lab.dataset.transferMode = mode;
            tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.transferModeChoice === mode)));
            panels.forEach((panel) => { panel.hidden = panel.dataset.transferPanel !== mode; });
            render(mode);
        };
        tabs.forEach((tab) => tab.addEventListener("click", () => selectMode(tab.dataset.transferModeChoice)));
        panels.forEach((panel) => {
            const mode = panel.dataset.transferPanel;
            panel.querySelector("[data-transfer-action]").addEventListener("click", () => {
                const maximum = mode === "cookie" || mode === "cache" || mode === "deploy" ? 2 : 1;
                stage[mode] = Math.min(maximum, stage[mode] + 1);
                render(mode);
            });
            panel.querySelector("[data-transfer-reset]").addEventListener("click", () => {
                stage[mode] = 0;
                render(mode);
                panel.querySelector("[data-transfer-action]").focus();
            });
        });
        selectMode("download");
    }

    window.COMPUTER_LAB_SETUPS.push(setupTransferLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("h05");
})();
