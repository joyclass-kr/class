(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.e05 = (spec) => figure(spec, "visual-storage-state-lab", `
        <section class="storage-tool-lab" data-storage-lab data-storage-mode="usb" data-storage-step="0">
            <div class="current-project-strip"><b>현재 작업본 <small>Current Working File</small></b><span>발표.pptx · v1 · 내 Chromebook</span></div>
            <div class="storage-mode-tabs" role="tablist" aria-label="저장 위치와 유지 방법">
                <button type="button" role="tab" data-storage-mode-choice="usb" aria-selected="true">USB <small>USB Storage</small></button>
                <button type="button" role="tab" data-storage-mode-choice="cloud" aria-selected="false">클라우드 <small>Cloud Storage</small></button>
                <button type="button" role="tab" data-storage-mode-choice="sync" aria-selected="false">동기화 <small>Synchronization</small></button>
                <button type="button" role="tab" data-storage-mode-choice="backup" aria-selected="false">백업 <small>Backup</small></button>
                <button type="button" role="tab" data-storage-mode-choice="zip" aria-selected="false">ZIP <small>ZIP Archive</small></button>
            </div>
            <div class="storage-panel-stack">
                <section class="storage-mode-panel" role="tabpanel" data-storage-panel="usb">
                    <div class="storage-location-diagram two-location"><div class="storage-location device-location"><b>내 Chromebook</b><span class="storage-file-token">발표.pptx · v1</span></div><div class="storage-route"><b>사본 만들기</b><span>Copy →</span></div><div class="storage-location usb-location"><b>USB 저장 장치</b><span class="storage-file-token" data-storage-result="usb-copy" hidden>발표.pptx · v1</span><em data-storage-empty="usb">아직 사본 없음</em></div></div>
                </section>
                <section class="storage-mode-panel" role="tabpanel" data-storage-panel="cloud" hidden>
                    <div class="storage-location-diagram two-location"><div class="storage-location device-location"><b>내 Chromebook</b><span class="storage-file-token">발표.pptx · <i data-cloud-device-version>v1</i></span></div><div class="storage-route"><b>인터넷으로 저장</b><span>Upload →</span></div><div class="storage-location cloud-location"><b>클라우드 서버</b><span class="storage-file-token" data-storage-result="cloud-copy" hidden>발표.pptx · v1</span><em data-storage-empty="cloud">아직 사본 없음</em></div></div>
                </section>
                <section class="storage-mode-panel" role="tabpanel" data-storage-panel="sync" hidden>
                    <div class="storage-location-diagram three-location"><div class="storage-location device-location"><b>Chromebook</b><span class="storage-file-token" data-sync-state="chromebook">발표.pptx · v1</span></div><div class="storage-route"><span>↔</span></div><div class="storage-location cloud-location"><b>동기화 서버</b><span class="storage-file-token" data-sync-state="cloud">발표.pptx · v1</span></div><div class="storage-route"><span>↔</span></div><div class="storage-location tablet-location"><b>iPad</b><span class="storage-file-token" data-sync-state="ipad">발표.pptx · v1</span></div></div>
                </section>
                <section class="storage-mode-panel" role="tabpanel" data-storage-panel="backup" hidden>
                    <div class="storage-location-diagram two-location"><div class="storage-location device-location"><b>현재 작업본</b><span class="storage-file-token" data-backup-current>발표.pptx · v2</span></div><div class="storage-route"><b>과거 사본 보관</b><span>Backup →</span></div><div class="storage-location backup-location"><b>날짜별 백업</b><span class="storage-file-token">발표_백업_v1.pptx</span></div></div>
                </section>
                <section class="storage-mode-panel" role="tabpanel" data-storage-panel="zip" hidden>
                    <div class="zip-workbench"><div class="zip-originals"><b>원본 폴더</b><span>발표.pptx</span><span>사진1.jpg</span><span>사진2.jpg</span></div><div class="storage-route"><b>하나로 묶기</b><span>ZIP →</span></div><div class="zip-result"><b>묶음 파일</b><span class="storage-file-token" data-storage-result="zip-file" hidden>발표자료.zip</span><em data-storage-empty="zip">아직 ZIP 없음</em><div data-storage-result="zip-extracted" hidden>새 폴더에 3개 파일을 꺼냄</div></div></div>
                </section>
            </div>
            <div class="storage-lab-actions"><button type="button" data-storage-action>USB에 사본 만들기 <small>Copy to USB</small></button><button type="button" data-storage-reset>이 실험 처음부터 <small>Reset Experiment</small></button></div>
            <dl class="storage-observation">
                <div><dt>무엇인가?</dt><dd data-storage-fact="kind">직접 꽂는 별도 저장 위치</dd></div>
                <div><dt>자동으로 맞춰지나?</dt><dd data-storage-fact="automatic">아니요</dd></div>
                <div><dt>과거 상태를 되찾나?</dt><dd data-storage-fact="recovery">사본을 따로 남겼을 때 가능</dd></div>
                <div><dt>여러 파일을 묶나?</dt><dd data-storage-fact="bundle">아니요</dd></div>
            </dl>
            <p class="lab-readout" data-storage-status aria-live="polite"><b>USB 저장 장치:</b> 기기에 직접 꽂는 별도 저장 위치입니다. 먼저 작업본의 사본을 만들어 보세요.</p>
        </section>
    `);

    function setupStorageLab() {
        const lab = document.querySelector("[data-storage-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-storage-status]");
        const action = lab.querySelector("[data-storage-action]");
        const facts = {
            usb: ["직접 꽂는 별도 저장 위치", "아니요", "사본을 따로 남겼을 때 가능", "아니요"],
            cloud: ["인터넷으로 쓰는 서버 저장 위치", "저장만으로는 아니요", "서비스가 기록 기능을 제공할 때 가능", "아니요"],
            sync: ["여러 위치의 현재 상태를 맞추는 관계", "설정 뒤 다음 동기화 때", "과거 사본을 남긴다는 뜻은 아님", "아니요"],
            backup: ["되찾기 위한 과거 사본", "예약하거나 새로 만들 때", "예", "아니요"],
            zip: ["여러 파일을 담는 묶음 파일 형식", "아니요", "백업과는 별개", "예"]
        };
        const initial = {
            usb: ["USB에 사본 만들기", "<b>USB 저장 장치:</b> 기기에 직접 꽂는 별도 저장 위치입니다. 먼저 작업본의 사본을 만들어 보세요."],
            cloud: ["클라우드에 저장하기", "<b>클라우드 저장:</b> 계정과 인터넷을 이용하는 서버 저장 위치입니다. 저장과 동기화는 같은 말이 아닙니다."],
            sync: ["Chromebook에서 v2로 수정", "<b>동기화:</b> 세 위치가 현재 v1로 맞아 있습니다. 한 기기의 변경이 언제 다른 곳에 반영되는지 확인하세요."],
            backup: ["현재 작업본 삭제", "<b>백업:</b> 현재 작업본은 v2이고, 복구용 과거 사본 v1은 따로 남아 있습니다."],
            zip: ["ZIP 만들기", "<b>ZIP:</b> 세 원본 파일을 하나의 묶음 파일로 만들어 보세요. 원본은 자동으로 없어지지 않습니다."]
        };
        const actionEnglish = {
            "USB에 사본 만들기": "Copy to USB",
            "클라우드에 저장하기": "Save to the Cloud",
            "Chromebook에서 v2로 수정": "Edit v2 on the Chromebook",
            "현재 작업본 삭제": "Delete the Current File",
            "ZIP 만들기": "Create a ZIP",
            "작업본을 v2로 수정": "Edit the Working File to v2",
            "변경 상태 동기화": "Synchronize the Change",
            "iPad에서 삭제": "Delete on the iPad",
            "삭제 상태 동기화": "Synchronize the Deletion",
            "백업에서 복구": "Restore from Backup",
            "ZIP 풀기": "Extract the ZIP"
        };
        const setStorageActionLabel = (label) => setBilingualButtonLabel(action, label, actionEnglish[label]);
        const resetVisuals = () => {
            lab.querySelectorAll("[data-storage-result]").forEach((item) => { item.hidden = true; });
            lab.querySelectorAll("[data-storage-empty]").forEach((item) => { item.hidden = false; });
            lab.querySelector("[data-cloud-device-version]").textContent = "v1";
            lab.querySelectorAll("[data-sync-state]").forEach((item) => { item.textContent = "발표.pptx · v1"; item.classList.remove("is-pending", "is-deleted"); });
            const current = lab.querySelector("[data-backup-current]");
            current.textContent = "발표.pptx · v2";
            current.classList.remove("is-deleted", "is-restored");
            action.disabled = false;
        };
        const setFacts = (mode) => {
            ["kind", "automatic", "recovery", "bundle"].forEach((key, index) => { lab.querySelector(`[data-storage-fact="${key}"]`).textContent = facts[mode][index]; });
        };
        const showMode = (mode) => {
            lab.dataset.storageMode = mode;
            lab.dataset.storageStep = "0";
            lab.querySelectorAll("[data-storage-mode-choice]").forEach((button) => button.setAttribute("aria-selected", String(button.dataset.storageModeChoice === mode)));
            lab.querySelectorAll("[data-storage-panel]").forEach((panel) => { panel.hidden = panel.dataset.storagePanel !== mode; });
            resetVisuals();
            setStorageActionLabel(initial[mode][0]);
            status.innerHTML = initial[mode][1];
            setFacts(mode);
        };
        const next = () => {
            const mode = lab.dataset.storageMode;
            const step = Number(lab.dataset.storageStep) + 1;
            lab.dataset.storageStep = String(step);
            if (mode === "usb") {
                if (step === 1) {
                    lab.querySelector('[data-storage-result="usb-copy"]').hidden = false;
                    lab.querySelector('[data-storage-empty="usb"]').hidden = true;
                    setStorageActionLabel("작업본을 v2로 수정");
                    status.innerHTML = "<b>USB 복사 완료:</b> Chromebook 원본은 남고 USB에 별도 사본 v1이 생겼습니다.";
                } else {
                    action.disabled = true;
                    status.innerHTML = "<b>작업본 수정:</b> Chromebook은 v2가 되었지만 USB 사본은 v1 그대로입니다. 복사 뒤 자동 동기화되지 않습니다.";
                }
            } else if (mode === "cloud") {
                if (step === 1) {
                    lab.querySelector('[data-storage-result="cloud-copy"]').hidden = false;
                    lab.querySelector('[data-storage-empty="cloud"]').hidden = true;
                    setStorageActionLabel("작업본을 v2로 수정");
                    status.innerHTML = "<b>클라우드 저장 완료:</b> 서버에 v1 사본이 생겼습니다.";
                } else {
                    lab.querySelector("[data-cloud-device-version]").textContent = "v2";
                    action.disabled = true;
                    status.innerHTML = "<b>작업본 수정:</b> Chromebook은 v2, 클라우드 사본은 v1입니다. 클라우드에 저장했다는 사실만으로 계속 동기화되지는 않습니다.";
                }
            } else if (mode === "sync") {
                const sync = (place) => lab.querySelector(`[data-sync-state="${place}"]`);
                if (step === 1) {
                    sync("chromebook").textContent = "발표.pptx · v2";
                    sync("chromebook").classList.add("is-pending");
                    setStorageActionLabel("변경 상태 동기화");
                    status.innerHTML = "<b>수정 직후:</b> Chromebook만 v2이고 서버와 iPad는 아직 v1입니다.";
                } else if (step === 2) {
                    ["chromebook", "cloud", "ipad"].forEach((place) => { sync(place).textContent = "발표.pptx · v2"; sync(place).classList.remove("is-pending"); });
                    setStorageActionLabel("iPad에서 삭제");
                    status.innerHTML = "<b>동기화 완료:</b> 세 위치의 현재 상태가 v2로 맞춰졌습니다.";
                } else if (step === 3) {
                    sync("ipad").textContent = "삭제 상태 · 전달 대기";
                    sync("ipad").classList.add("is-pending");
                    setStorageActionLabel("삭제 상태 동기화");
                    status.innerHTML = "<b>iPad에서 삭제:</b> 삭제도 현재 상태의 변화이며 아직 다른 위치로 전달되기 전입니다.";
                } else {
                    ["chromebook", "cloud", "ipad"].forEach((place) => { sync(place).textContent = "파일 삭제됨"; sync(place).classList.remove("is-pending"); sync(place).classList.add("is-deleted"); });
                    action.disabled = true;
                    status.innerHTML = "<b>삭제 상태 동기화:</b> 삭제가 다른 위치에도 반영되었습니다. 동기화는 과거 사본을 남긴다는 뜻이 아닙니다.";
                }
            } else if (mode === "backup") {
                const current = lab.querySelector("[data-backup-current]");
                if (step === 1) {
                    current.textContent = "현재 파일 삭제됨";
                    current.classList.add("is-deleted");
                    setStorageActionLabel("백업에서 복구");
                    status.innerHTML = "<b>현재 파일 삭제:</b> 작업본은 사라졌지만 날짜별 백업 v1은 따로 남아 있습니다.";
                } else {
                    current.textContent = "발표.pptx · v1 복구";
                    current.classList.remove("is-deleted");
                    current.classList.add("is-restored");
                    action.disabled = true;
                    status.innerHTML = "<b>백업에서 복구:</b> v1을 되찾았습니다. 백업 뒤에 만든 v2의 변화까지 되찾은 것은 아닙니다.";
                }
            } else if (mode === "zip") {
                if (step === 1) {
                    lab.querySelector('[data-storage-result="zip-file"]').hidden = false;
                    lab.querySelector('[data-storage-empty="zip"]').hidden = true;
                    setStorageActionLabel("ZIP 풀기");
                    status.innerHTML = "<b>ZIP 만들기:</b> 세 원본은 그대로 남고, 세 파일을 담은 발표자료.zip이 하나 더 생겼습니다.";
                } else {
                    lab.querySelector('[data-storage-result="zip-extracted"]').hidden = false;
                    action.disabled = true;
                    status.innerHTML = "<b>ZIP 풀기:</b> 묶음 안의 파일을 새 폴더에 꺼냈습니다. ZIP은 저장 위치·동기화·백업·암호화와 같은 뜻이 아닙니다.";
                }
            }
        };
        lab.querySelectorAll("[data-storage-mode-choice]").forEach((button) => button.addEventListener("click", () => showMode(button.dataset.storageModeChoice)));
        action.addEventListener("click", next);
        lab.querySelector("[data-storage-reset]").addEventListener("click", () => showMode(lab.dataset.storageMode));
        showMode("usb");
    }

    window.COMPUTER_LAB_SETUPS.push(setupStorageLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("e05");
})();
