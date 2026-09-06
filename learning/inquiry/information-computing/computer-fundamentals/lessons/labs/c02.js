(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.c02 = (spec, asset) => figure(spec, "visual-os-workbench", `
        <section class="os-workbench" data-os-lab data-os="windows" data-os-task-stage="0">
            <header class="os-lab-heading">
                <div>
                    <h3>운영체제마다 화면은 달라도 파일의 상태는 같다 <small>Different Interfaces, the Same File State</small></h3>
                    <p>운영체제를 고른 뒤, 아래 모형 화면 안에서 직접 사진 위치를 열고 파일을 선택해 이름을 바꾸세요.</p>
                </div>
                <figure><img src="${asset("c02-operating-system-devices-illustration-v1-768.webp")}" width="768" height="512" alt="노트북, Chromebook, 태블릿, 스마트폰에서 같은 그림 파일을 다루는 모습"><figcaption>PC·Chromebook·휴대전화·iPad의 대표 화면</figcaption></figure>
            </header>
            <nav class="os-choice-tabs" aria-label="비교할 운영체제">
                <button type="button" data-os-choice="windows" aria-pressed="true">Windows</button>
                <button type="button" data-os-choice="chromeos" aria-pressed="false">ChromeOS</button>
                <button type="button" data-os-choice="android" aria-pressed="false">Android</button>
                <button type="button" data-os-choice="ios" aria-pressed="false">iPhone <small>iOS</small></button>
                <button type="button" data-os-choice="ipados" aria-pressed="false">iPad <small>iPadOS</small></button>
            </nav>
            <div class="os-live-device" data-os-live-device>
                <div class="os-live-screen">
                    <header class="os-live-titlebar"><span data-os-window-controls>● ● ●</span><strong data-os-app-title>파일 탐색기</strong><time>10:24</time></header>
                    <div class="os-live-toolbar">
                        <button type="button" data-os-back disabled aria-label="이전 위치로">←</button>
                        <span data-os-path>내 PC › 사진</span>
                        <button type="button" data-os-reset>처음부터 <small>Reset</small></button>
                    </div>
                    <div class="os-live-body">
                        <aside data-os-sidebar><b>홈</b><span>내 PC</span><strong>사진</strong><span>다운로드</span></aside>
                        <main class="os-file-canvas" data-os-file-canvas>
                            <button type="button" class="os-location-tile" data-os-open-location>
                                <i aria-hidden="true"></i><span><b data-os-location-name>사진</b><small data-os-location-english>Pictures</small></span>
                            </button>
                            <div class="os-file-row" data-os-file-row hidden>
                                <button type="button" class="os-photo-file" data-os-file aria-label="바다.jpg 선택">
                                    <i aria-hidden="true"><span></span></i><span><b data-os-file-name>바다.jpg</b><small>JPEG 사진 · 2.4 MB</small></span>
                                </button>
                                <button type="button" class="os-file-menu-button" data-os-file-menu disabled aria-label="선택한 파일 메뉴 열기">⋯</button>
                            </div>
                            <div class="os-context-menu" data-os-context-menu hidden>
                                <button type="button" data-os-rename-command>이름 바꾸기 <small data-os-rename-method>Rename · F2</small></button>
                                <span>복사 <small>Copy</small></span><span>삭제 <small>Delete</small></span>
                            </div>
                            <form class="os-rename-form" data-os-rename-form hidden>
                                <label>새 파일 이름 <small>New Filename</small><input data-os-rename-input value="바다_여행.jpg" autocomplete="off" spellcheck="false"></label>
                                <button type="submit">이름 확인 <small>Apply Rename</small></button>
                            </form>
                            <p class="os-screen-hint" data-os-screen-hint>사진 폴더를 눌러 여세요.</p>
                        </main>
                    </div>
                    <footer class="os-live-footer" data-os-footer><i></i><i></i><i></i><span>파일 0개 선택</span></footer>
                </div>
            </div>
            <div class="os-state-ledger" aria-live="polite">
                <span><b>운영체제</b><small>Operating System</small><em data-os-name>Windows</em></span>
                <span><b>현재 위치</b><small>Current Location</small><em data-os-current-location>내 PC › 사진</em></span>
                <span><b>파일 이름</b><small>Filename</small><em data-os-current-file>바다.jpg</em></span>
                <span><b>현재 동작</b><small>Current Action</small><em data-os-current-action>위치 열기 전</em></span>
            </div>
            <p class="lab-readout" data-os-status aria-live="polite"><b>Windows:</b> 파일 탐색기 화면 안의 사진 폴더부터 누르세요. 화면 모양은 달라도 저장 위치와 파일 이름이라는 상태를 바꾸는 일은 같습니다.</p>
        </section>
    `);

    function setupOsLab() {
        const lab = document.querySelector("[data-os-lab]");
        if (!lab) return;
        const copy = {
            windows: { name: "Windows", app: "파일 탐색기", path: "내 PC › 사진", location: "사진", english: "Pictures", sidebar: "<b>홈</b><span>내 PC</span><strong>사진</strong><span>다운로드</span>", method: "Rename · F2", intro: "파일 탐색기의 사진 폴더를 누르세요." },
            chromeos: { name: "ChromeOS", app: "파일", path: "내 파일 › 이미지", location: "이미지", english: "Images", sidebar: "<b>최근</b><strong>내 파일</strong><span>다운로드</span><span>Google Drive</span>", method: "Rename · Menu", intro: "파일 앱의 이미지 위치를 누르세요." },
            android: { name: "Android", app: "내 파일", path: "내장 저장공간 › 이미지", location: "이미지", english: "Images", sidebar: "<b>최근 파일</b><strong>이미지</strong><span>다운로드</span><span>Drive</span>", method: "Rename · Long Press", intro: "내 파일 앱의 이미지 위치를 탭하세요." },
            ios: { name: "iOS", app: "파일", path: "나의 iPhone › 사진", location: "사진", english: "Photos", sidebar: "<b>최근 항목</b><span>iCloud Drive</span><strong>나의 iPhone</strong><span>다운로드</span>", method: "Rename · Touch and Hold", intro: "파일 앱에서 나의 iPhone의 사진 위치를 탭하세요." },
            ipados: { name: "iPadOS", app: "파일", path: "나의 iPad › 사진", location: "사진", english: "Photos", sidebar: "<b>최근 항목</b><span>iCloud Drive</span><strong>나의 iPad</strong><span>다운로드</span>", method: "Rename · Touch and Hold", intro: "왼쪽 위치 목록에서 나의 iPad를 확인하고 사진 위치를 탭하세요." }
        };
        const appTitle = lab.querySelector("[data-os-app-title]");
        const path = lab.querySelector("[data-os-path]");
        const sidebar = lab.querySelector("[data-os-sidebar]");
        const locationName = lab.querySelector("[data-os-location-name]");
        const locationEnglish = lab.querySelector("[data-os-location-english]");
        const openLocation = lab.querySelector("[data-os-open-location]");
        const fileRow = lab.querySelector("[data-os-file-row]");
        const fileButton = lab.querySelector("[data-os-file]");
        const fileName = lab.querySelector("[data-os-file-name]");
        const fileMenu = lab.querySelector("[data-os-file-menu]");
        const contextMenu = lab.querySelector("[data-os-context-menu]");
        const renameCommand = lab.querySelector("[data-os-rename-command]");
        const renameMethod = lab.querySelector("[data-os-rename-method]");
        const renameForm = lab.querySelector("[data-os-rename-form]");
        const renameInput = lab.querySelector("[data-os-rename-input]");
        const resetButton = lab.querySelector("[data-os-reset]");
        const backButton = lab.querySelector("[data-os-back]");
        const hint = lab.querySelector("[data-os-screen-hint]");
        const status = lab.querySelector("[data-os-status]");
        const ledgerName = lab.querySelector("[data-os-name]");
        const ledgerLocation = lab.querySelector("[data-os-current-location]");
        const ledgerFile = lab.querySelector("[data-os-current-file]");
        const ledgerAction = lab.querySelector("[data-os-current-action]");
        let currentOs = "windows";
        let taskStage = 0;
        let renamedFile = "바다.jpg";
        let holdTimer = 0;
        let holdOpened = false;
        const actionNames = ["위치 열기 전", "폴더 열림", "파일 선택", "파일 메뉴 열림", "새 이름 입력", "이름 변경 완료"];
        const renderTask = () => {
            const item = copy[currentOs];
            lab.dataset.osTaskStage = String(taskStage);
            fileRow.hidden = taskStage < 1;
            fileButton.classList.toggle("is-selected", taskStage >= 2);
            fileButton.setAttribute("aria-pressed", String(taskStage >= 2));
            fileMenu.disabled = taskStage < 2;
            contextMenu.hidden = taskStage !== 3;
            renameForm.hidden = taskStage !== 4;
            backButton.disabled = taskStage === 0;
            fileName.textContent = renamedFile;
            ledgerName.textContent = item.name;
            ledgerLocation.textContent = item.path;
            ledgerFile.textContent = renamedFile;
            ledgerAction.textContent = actionNames[taskStage];
            hint.textContent = taskStage === 0 ? item.intro
                : taskStage === 1 ? `${renamedFile} 파일을 눌러 선택하세요.`
                    : taskStage === 2 ? "선택한 파일 옆의 ⋯ 메뉴를 여세요. 휴대기기에서는 파일을 길게 눌러도 됩니다."
                        : taskStage === 3 ? "화면 안 메뉴에서 이름 바꾸기를 고르세요."
                            : taskStage === 4 ? "새 이름을 확인한 뒤 적용하세요. 확장자 .jpg도 파일 이름의 일부입니다."
                                : `${renamedFile} 이름이 이 저장 위치의 파일 기록에 반영되었습니다.`;
        };
        const resetTask = () => {
            taskStage = 0;
            renamedFile = "바다.jpg";
            renameInput.value = "바다_여행.jpg";
            renderTask();
            status.innerHTML = `<b>${copy[currentOs].name}:</b> ${copy[currentOs].intro} 운영체제가 파일을 보관하는 장치 자체는 아니며, 저장 장치의 파일을 찾고 다루는 화면과 규칙을 제공합니다.`;
        };
        const choose = (name) => {
            currentOs = name;
            lab.dataset.os = name;
            lab.querySelectorAll("[data-os-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.osChoice === name)));
            appTitle.textContent = copy[name].app;
            path.textContent = copy[name].path;
            sidebar.innerHTML = copy[name].sidebar;
            locationName.textContent = copy[name].location;
            locationEnglish.textContent = copy[name].english;
            renameMethod.textContent = copy[name].method;
            resetTask();
        };
        lab.querySelectorAll("[data-os-choice]").forEach((button) => button.addEventListener("click", () => choose(button.dataset.osChoice)));
        openLocation.addEventListener("click", () => {
            taskStage = 1;
            renderTask();
            status.innerHTML = `<b>위치 열림:</b> ${copy[currentOs].path}에 들어왔습니다. 이제 화면 안의 바다.jpg를 선택하세요.`;
        });
        fileButton.addEventListener("click", () => {
            if (holdOpened) { holdOpened = false; return; }
            if (taskStage < 1) return;
            taskStage = 2;
            renderTask();
            status.innerHTML = `<b>파일 선택:</b> ${renamedFile}를 선택했습니다. ${copy[currentOs].method} 방식으로 이름 바꾸기 명령을 찾습니다.`;
        });
        fileButton.addEventListener("keydown", (event) => {
            if (event.key !== "F2" || currentOs !== "windows" || taskStage < 2) return;
            event.preventDefault();
            taskStage = 4;
            renderTask();
            renameInput.focus();
            renameInput.select();
        });
        fileButton.addEventListener("pointerdown", (event) => {
            if (!["android", "ios", "ipados"].includes(currentOs) || taskStage < 1) return;
            holdOpened = false;
            holdTimer = window.setTimeout(() => {
                taskStage = 3;
                holdOpened = true;
                renderTask();
                status.innerHTML = "<b>길게 누르기 인식:</b> 손을 뗄 때까지 같은 파일을 누르고 있어 파일 명령 메뉴가 열렸습니다.";
            }, 550);
            fileButton.setPointerCapture?.(event.pointerId);
        });
        ["pointerup", "pointercancel", "pointerleave"].forEach((type) => fileButton.addEventListener(type, () => window.clearTimeout(holdTimer)));
        fileMenu.addEventListener("click", () => {
            if (taskStage < 2) return;
            taskStage = 3;
            renderTask();
            status.innerHTML = `<b>파일 메뉴:</b> ${copy[currentOs].method}에 해당하는 화면 메뉴가 열렸습니다. 이름 바꾸기를 누르세요.`;
        });
        renameCommand.addEventListener("click", () => {
            taskStage = 4;
            renderTask();
            renameInput.focus();
            renameInput.select();
            status.innerHTML = "<b>이름 편집:</b> 확장자 .jpg를 포함한 새 파일 이름을 확인하세요.";
        });
        renameForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const nextName = renameInput.value.trim();
            if (!nextName || !nextName.toLowerCase().endsWith(".jpg")) {
                status.innerHTML = "<b>이름을 적용하지 못했습니다:</b> 파일을 구별할 이름과 JPEG 형식을 나타내는 .jpg 확장자를 함께 남기세요.";
                renameInput.focus();
                return;
            }
            renamedFile = nextName;
            taskStage = 5;
            renderTask();
            status.innerHTML = `<b>이름 변경 완료:</b> ${copy[currentOs].name} 화면에서 파일 기록의 이름이 ${renamedFile}(으)로 바뀌었습니다. 다른 운영체제를 골라도 같은 종류의 상태 변화를 다시 시험할 수 있습니다.`;
        });
        backButton.addEventListener("click", resetTask);
        resetButton.addEventListener("click", resetTask);
        choose("windows");
    }

    window.COMPUTER_LAB_SETUPS.push(setupOsLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("c02");
})();
