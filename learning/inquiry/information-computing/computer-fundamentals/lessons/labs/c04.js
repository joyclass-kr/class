(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.c04 = (spec, asset) => figure(spec, "visual-permission-workbench", `
        ${contextImage(asset, "c04-settings-permissions-updates-illustration-v1", "학생이 기기 설정에서 카메라 사용 허락과 업데이트 상태를 확인하는 장면")}
        <section class="settings-workbench" data-settings-lab data-settings-section="privacy">
            <div class="settings-app">
                <aside>
                    <h3>설정 <small>Settings</small></h3>
                    <button type="button" data-settings-choice="privacy" aria-pressed="true">개인정보 <small>Privacy</small></button>
                    <button type="button" data-settings-choice="display" aria-pressed="false">디스플레이 <small>Display</small></button>
                    <button type="button" data-settings-choice="update" aria-pressed="false">업데이트 <small>Update</small></button>
                    <button type="button" data-settings-choice="power" aria-pressed="false">전원 <small>Power</small></button>
                </aside>
                <main>
                    <section data-settings-panel="privacy">
                        <p class="settings-path">개인 정보 › 카메라</p>
                        <h3>카메라를 사용할 수 있는 앱</h3>
                        <div class="permission-row"><span><i class="camera-lens"></i><b>그림 교실</b><small>사진을 찍어 과제에 넣는 앱</small></span><button type="button" data-permission-toggle aria-pressed="false"><i></i><span data-permission-label>꺼짐</span></button></div>
                        <div class="permission-result" data-permission-result>
                            <i class="camera-preview"></i>
                            <p><strong>카메라를 열 수 없습니다.</strong><span>앱은 설치되어 있어도 카메라 사용 허락이 필요합니다.</span></p>
                        </div>
                    </section>
                    <section data-settings-panel="display">
                        <p class="settings-path">시스템 › 디스플레이</p>
                        <h3>화면에 보이는 크기</h3>
                        <div class="display-setting-demo" data-display-setting="100"><span>가나다 ABC</span><button type="button" data-display-choice="100" aria-pressed="true">100%</button><button type="button" data-display-choice="150" aria-pressed="false">150%</button></div>
                        <p>표시 배율을 바꾸면 글자와 단추의 크기가 달라지지만 파일 내용은 바뀌지 않습니다.</p>
                    </section>
                    <section data-settings-panel="update">
                        <p class="settings-path">시스템 › 업데이트</p>
                        <h3>운영체제 새 버전 확인</h3>
                        <div class="update-setting-demo"><span data-update-result>마지막 확인: 어제</span><button type="button" data-update-check>업데이트 확인 <small>Check for Updates</small></button></div>
                        <p>업데이트는 오류 수정과 보안 개선을 운영체제에 적용합니다.</p>
                    </section>
                    <section data-settings-panel="power">
                        <p class="settings-path">시스템 › 전원 <small>System › Power</small></p>
                        <h3>시작·잠자기·다시 시작·종료 <small>Startup, Sleep, Restart, and Shut Down</small></h3>
                        <div class="power-state-demo" data-power-state="running">
                            <div class="power-device" aria-hidden="true">
                                <div class="power-screen"><b data-power-screen-label>사용 중</b><small data-power-screen-english>Running</small></div>
                                <i class="power-led"></i>
                            </div>
                            <div class="power-state-copy" aria-live="polite">
                                <strong data-power-state-name>사용 중 <small>Running</small></strong>
                                <p data-power-state-description>운영체제와 앱이 실행 중입니다. 작업 중인 데이터는 RAM 등에 놓입니다.</p>
                            </div>
                        </div>
                        <div class="power-action-grid" role="group" aria-label="기기의 전원 상태 바꾸기">
                            <button type="button" data-power-action="start" disabled><b data-power-start-label>시작(부팅)</b><small data-power-start-english>Start Up / Boot</small></button>
                            <button type="button" data-power-action="sleep"><b>잠자기</b><small>Sleep</small></button>
                            <button type="button" data-power-action="restart"><b>다시 시작</b><small>Restart</small></button>
                            <button type="button" data-power-action="shutdown"><b>종료</b><small>Shut Down</small></button>
                        </div>
                        <p class="power-device-note">잠자기는 실행 상태를 남겨 빠르게 돌아오고, 종료는 운영체제와 앱의 실행을 끝냅니다. 메뉴 위치와 단추 조합은 기기마다 다를 수 있습니다.</p>
                    </section>
                    <p class="control-panel-note"><b>제어판 Control Panel</b>은 Windows에서 일부 시스템 설정을 여는 기존 도구이며, 최신 설정 앱과 역할이 겹치는 항목이 있습니다.</p>
                </main>
            </div>
            <p class="lab-readout" data-settings-status><b>설정</b>은 값을 바꾸고, <b>권한</b>은 앱이 장치를 써도 되는지 정합니다.</p>
        </section>
    `);

    function setupSettingsLab() {
        const lab = document.querySelector("[data-settings-lab]");
        if (!lab) return;
        const button = lab.querySelector("[data-permission-toggle]");
        const label = lab.querySelector("[data-permission-label]");
        const result = lab.querySelector("[data-permission-result]");
        const status = lab.querySelector("[data-settings-status]");
        const powerDemo = lab.querySelector("[data-power-state]");
        const powerName = lab.querySelector("[data-power-state-name]");
        const powerDescription = lab.querySelector("[data-power-state-description]");
        const powerScreenLabel = lab.querySelector("[data-power-screen-label]");
        const powerScreenEnglish = lab.querySelector("[data-power-screen-english]");
        const powerStart = lab.querySelector('[data-power-action="start"]');
        const powerStartLabel = lab.querySelector("[data-power-start-label]");
        const powerStartEnglish = lab.querySelector("[data-power-start-english]");
        let powerTimer = 0;
        const powerStates = {
            running: { ko: "사용 중", en: "Running", detail: "운영체제와 앱이 실행 중입니다. 작업 중인 데이터는 RAM 등에 놓입니다." },
            sleeping: { ko: "잠자기", en: "Sleeping", detail: "화면과 여러 부품은 쉬고, 빠르게 돌아오도록 실행 상태를 RAM 등에 유지하며 전력 사용을 줄입니다." },
            off: { ko: "종료됨", en: "Shut Down", detail: "앱과 운영체제의 실행을 끝낸 상태입니다. 다시 사용하려면 운영체제를 불러오는 부팅이 필요합니다." },
            booting: { ko: "부팅 중", en: "Booting", detail: "기기 상태를 확인하고 운영체제를 저장 장치에서 RAM으로 불러온 뒤 로그인 화면을 준비합니다." },
            restarting: { ko: "다시 시작 중", en: "Restarting", detail: "앱과 운영체제를 닫은 뒤 전원 단추를 다시 누르지 않아도 운영체제를 곧바로 다시 불러옵니다." }
        };
        const setPowerState = (state) => {
            const copy = powerStates[state];
            powerDemo.dataset.powerState = state;
            powerName.innerHTML = `${copy.ko} <small>${copy.en}</small>`;
            powerDescription.textContent = copy.detail;
            powerScreenLabel.textContent = copy.ko;
            powerScreenEnglish.textContent = copy.en;
            const busy = state === "booting" || state === "restarting";
            powerStart.disabled = state === "running" || busy;
            lab.querySelector('[data-power-action="sleep"]').disabled = state !== "running";
            lab.querySelector('[data-power-action="restart"]').disabled = state !== "running";
            lab.querySelector('[data-power-action="shutdown"]').disabled = state !== "running";
            const waking = state === "sleeping";
            powerStartLabel.textContent = waking ? "깨우기" : "시작(부팅)";
            powerStartEnglish.textContent = waking ? "Wake" : "Start Up / Boot";
        };
        const chooseSection = (section) => {
            lab.dataset.settingsSection = section;
            lab.querySelectorAll("[data-settings-choice]").forEach((item) => {
                item.setAttribute("aria-pressed", String(item.dataset.settingsChoice === section));
            });
            lab.querySelectorAll("[data-settings-panel]").forEach((panel) => {
                panel.hidden = panel.dataset.settingsPanel !== section;
            });
            if (section === "privacy") {
                status.innerHTML = "<b>권한:</b> 앱이 카메라·마이크 같은 장치를 써도 되는지 앱별로 허락합니다.";
            } else if (section === "display") {
                status.innerHTML = "<b>디스플레이 설정:</b> 화면에 그리는 글자와 단추의 크기를 바꿉니다. 파일 속 내용은 그대로입니다.";
            } else if (section === "update") {
                status.innerHTML = "<b>업데이트:</b> 운영체제의 오류 수정과 보안 개선을 내려받아 적용합니다.";
            } else if (section === "power") {
                status.innerHTML = "<b>전원 상태:</b> 잠자기는 실행 상태를 남겨 전력을 줄이고, 종료는 실행을 끝냅니다. 다시 시작은 운영체제를 닫고 다시 불러옵니다.";
            }
        };
        lab.querySelectorAll("[data-settings-choice]").forEach((item) => {
            item.addEventListener("click", () => chooseSection(item.dataset.settingsChoice));
        });
        lab.querySelectorAll("[data-display-choice]").forEach((item) => {
            item.addEventListener("click", () => {
                const scale = item.dataset.displayChoice;
                const demo = lab.querySelector(".display-setting-demo");
                demo.dataset.displaySetting = scale;
                demo.querySelector("span").style.fontSize = scale === "150" ? "30px" : "20px";
                lab.querySelectorAll("[data-display-choice]").forEach((choice) => {
                    choice.setAttribute("aria-pressed", String(choice === item));
                });
                status.innerHTML = `<b>표시 배율 ${scale}%:</b> 화면 요소를 더 크게 그립니다. 해상도나 파일 데이터가 바뀌는 것은 아닙니다.`;
            });
        });
        lab.querySelector("[data-update-check]").addEventListener("click", (event) => {
            lab.querySelector("[data-update-result]").textContent = "확인 완료: 현재 최신 상태";
            event.currentTarget.disabled = true;
            status.innerHTML = "<b>업데이트 확인 완료:</b> 새 버전이 있는지 서버에 물어본 뒤 현재 상태를 표시했습니다.";
        });
        button.addEventListener("click", () => {
            const enabled = button.getAttribute("aria-pressed") !== "true";
            button.setAttribute("aria-pressed", String(enabled));
            label.textContent = enabled ? "켜짐" : "꺼짐";
            result.classList.toggle("is-allowed", enabled);
            result.querySelector("strong").textContent = enabled ? "카메라를 사용할 수 있습니다." : "카메라를 열 수 없습니다.";
            result.querySelector("span").textContent = enabled
                ? "운영체제가 이 앱에만 카메라 신호를 전달합니다."
                : "앱은 설치되어 있어도 카메라 사용 허락이 필요합니다.";
            status.innerHTML = enabled
                ? "<b>권한을 허용했습니다.</b> 앱이 카메라를 쓸 수 있게 되었지만 다른 앱의 권한은 바뀌지 않습니다."
                : "<b>권한을 끕니다.</b> 앱은 남아 있지만 카메라 신호를 받을 수 없습니다.";
        });
        lab.querySelectorAll("[data-power-action]").forEach((control) => {
            control.addEventListener("click", () => {
                const action = control.dataset.powerAction;
                const current = powerDemo.dataset.powerState;
                window.clearTimeout(powerTimer);
                if (action === "sleep") {
                    setPowerState("sleeping");
                    status.innerHTML = "<b>잠자기 Sleep:</b> 실행 상태를 유지하면서 화면과 여러 부품의 전력 사용을 줄입니다.";
                    return;
                }
                if (action === "start" && current === "sleeping") {
                    setPowerState("running");
                    status.innerHTML = "<b>깨우기 Wake:</b> 남겨 둔 실행 상태로 돌아옵니다. 운영체제를 처음부터 불러오는 부팅과 다릅니다.";
                    return;
                }
                if (action === "shutdown") {
                    setPowerState("off");
                    status.innerHTML = "<b>종료 Shut Down:</b> 앱과 운영체제의 실행을 끝냈습니다. 저장하지 않은 작업은 사라질 수 있습니다.";
                    return;
                }
                if (action === "start" && current === "off") {
                    setPowerState("booting");
                    status.innerHTML = "<b>부팅 Boot:</b> 운영체제를 저장 장치에서 RAM으로 불러오고 사용할 준비를 합니다.";
                    powerTimer = window.setTimeout(() => {
                        setPowerState("running");
                        status.innerHTML = "<b>시작 완료:</b> 운영체제가 실행되어 기기를 사용할 수 있습니다.";
                    }, 700);
                    return;
                }
                if (action === "restart") {
                    setPowerState("restarting");
                    status.innerHTML = "<b>다시 시작 Restart:</b> 운영체제를 닫고 다시 불러오는 중입니다.";
                    powerTimer = window.setTimeout(() => {
                        setPowerState("running");
                        status.innerHTML = "<b>다시 시작 완료:</b> 저장한 파일은 남지만 저장하지 않은 작업은 사라질 수 있습니다.";
                    }, 700);
                }
            });
        });
        window.addEventListener("pagehide", () => window.clearTimeout(powerTimer), { once: true });
        setPowerState("running");
        chooseSection("privacy");
    }

    window.COMPUTER_LAB_SETUPS.push(setupSettingsLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("c04");
})();
