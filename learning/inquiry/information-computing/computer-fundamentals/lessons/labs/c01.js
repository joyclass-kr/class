(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.c01 = (spec, asset) => figure(spec, "visual-request-relay", `
        <section class="concept-lab-split">
            <section class="request-relay-lab" data-request-relay data-relay-state="idle">
                <div class="relay-controls">
                    <button type="button" data-relay-permission aria-pressed="true"><span>카메라 권한</span><small data-relay-permission-label>허용됨 · Allowed</small></button>
                    <button type="button" data-relay-hardware aria-pressed="true"><span>카메라 장치</span><small data-relay-hardware-label>켜짐 · On</small></button>
                </div>
                <div class="relay-flow" aria-label="앱 요청과 사진 데이터가 오가는 길">
                    <div data-relay-node="app"><i></i><b>사진 앱</b><small>App</small></div><span>→</span>
                    <div data-relay-node="os"><i></i><b>운영체제·권한</b><small>OS & Permission</small></div><span>→</span>
                    <div data-relay-node="driver"><i></i><b>드라이버</b><small>Driver</small></div><span>→</span>
                    <div data-relay-node="camera"><i></i><b>카메라 센서</b><small>Hardware</small></div>
                </div>
                <div class="relay-result"><div data-relay-preview><span>아직 사진 없음</span></div><p data-relay-result-copy>앱은 직접 센서를 움직이지 않고 운영체제에 요청합니다.</p></div>
                <div class="relay-actions"><button type="button" data-relay-run>사진 찍기 <small>Take Photo</small></button><button type="button" data-relay-reset>처음 상태 <small>Reset</small></button></div>
                <p class="lab-readout" data-relay-status aria-live="polite"><b>준비:</b> 권한과 카메라 장치 상태를 바꾼 뒤 사진 요청이 어디에서 멈추는지 확인하세요.</p>
            </section>
            ${contextImage(asset, "c01-app-os-hardware-request-illustration-v1", "아이가 태블릿을 누르자 앱의 요청이 운영체제와 처리 부품을 거쳐 카메라와 화면으로 이어지는 장면")}
        </section>
    `);

    function setupRequestRelayLab() {
        const lab = document.querySelector("[data-request-relay]");
        if (!lab) return;
        const permissionButton = lab.querySelector("[data-relay-permission]");
        const hardwareButton = lab.querySelector("[data-relay-hardware]");
        const permissionLabel = lab.querySelector("[data-relay-permission-label]");
        const hardwareLabel = lab.querySelector("[data-relay-hardware-label]");
        const run = lab.querySelector("[data-relay-run]");
        const status = lab.querySelector("[data-relay-status]");
        const preview = lab.querySelector("[data-relay-preview]");
        const resultCopy = lab.querySelector("[data-relay-result-copy]");
        let allowed = true;
        let powered = true;
        const timers = [];
        const clearTimers = () => { while (timers.length) window.clearTimeout(timers.pop()); };
        const resetNodes = () => lab.querySelectorAll("[data-relay-node]").forEach((node) => node.classList.remove("is-active", "is-blocked", "is-returning"));
        const setToggle = (kind, value) => {
            if (kind === "permission") {
                allowed = value;
                permissionButton.setAttribute("aria-pressed", String(value));
                permissionLabel.textContent = value ? "허용됨 · Allowed" : "거부됨 · Denied";
            } else {
                powered = value;
                hardwareButton.setAttribute("aria-pressed", String(value));
                hardwareLabel.textContent = value ? "켜짐 · On" : "꺼짐 · Off";
            }
            lab.dataset.relayState = "idle";
            resetNodes();
            preview.innerHTML = "<span>아직 사진 없음</span>";
            resultCopy.textContent = "설정을 바꾼 뒤 사진 요청을 다시 보내세요.";
        };
        const finish = () => { run.disabled = false; };
        const schedule = (callback, delay) => timers.push(window.setTimeout(callback, delay));
        const takePhoto = () => {
            clearTimers();
            resetNodes();
            run.disabled = true;
            lab.dataset.relayState = "requesting";
            const nodes = ["app", "os", "driver", "camera"].map((name) => lab.querySelector('[data-relay-node="' + name + '"]'));
            nodes[0].classList.add("is-active");
            status.innerHTML = "<b>1. 앱 요청:</b> 사진 앱이 운영체제에 카메라 사용을 요청했습니다.";
            schedule(() => {
                nodes[0].classList.remove("is-active");
                nodes[1].classList.add("is-active");
                if (!allowed) {
                    nodes[1].classList.add("is-blocked");
                    lab.dataset.relayState = "blocked";
                    status.innerHTML = "<b>권한에서 멈춤:</b> 운영체제가 이 앱의 카메라 사용을 허용하지 않아 드라이버와 센서로 요청을 보내지 않았습니다.";
                    resultCopy.textContent = "앱이 설치되어 있어도 장치 권한이 없으면 사용할 수 없습니다.";
                    finish();
                    return;
                }
                status.innerHTML = "<b>2. 운영체제 확인:</b> 앱의 카메라 권한을 확인하고 알맞은 장치 드라이버에 요청을 넘깁니다.";
                schedule(() => {
                    nodes[1].classList.remove("is-active");
                    nodes[2].classList.add("is-active");
                    status.innerHTML = "<b>3. 드라이버 변환:</b> 운영체제의 공통 요청을 카메라 장치가 알아듣는 명령으로 바꿉니다.";
                    schedule(() => {
                        nodes[2].classList.remove("is-active");
                        nodes[3].classList.add("is-active");
                        if (!powered) {
                            nodes[3].classList.add("is-blocked");
                            lab.dataset.relayState = "hardware-off";
                            status.innerHTML = "<b>장치에서 멈춤:</b> 권한은 있지만 카메라 장치가 꺼져 있어 빛을 사진 데이터로 바꾸지 못했습니다.";
                            resultCopy.textContent = "소프트웨어 요청이 정상이어도 하드웨어가 작동해야 결과가 생깁니다.";
                            finish();
                            return;
                        }
                        status.innerHTML = "<b>4. 하드웨어 입력:</b> 이미지 센서가 들어온 빛을 전기 신호와 디지털 사진 데이터로 바꿉니다.";
                        schedule(() => {
                            nodes.forEach((node) => { node.classList.remove("is-active"); node.classList.add("is-returning"); });
                            lab.dataset.relayState = "complete";
                            preview.innerHTML = '<i class="relay-photo" aria-label="카메라가 돌려준 산과 하늘 사진"></i>';
                            resultCopy.textContent = "사진 데이터가 드라이버와 운영체제를 거꾸로 지나 앱 화면에 도착했습니다.";
                            status.innerHTML = "<b>결과 반환:</b> 요청은 앱→운영체제→드라이버→하드웨어로 가고, 사진 데이터는 반대 방향으로 돌아옵니다.";
                            finish();
                        }, 420);
                    }, 420);
                }, 420);
            }, 420);
        };
        permissionButton.addEventListener("click", () => setToggle("permission", !allowed));
        hardwareButton.addEventListener("click", () => setToggle("hardware", !powered));
        run.addEventListener("click", takePhoto);
        lab.querySelector("[data-relay-reset]").addEventListener("click", () => { clearTimers(); setToggle("permission", true); setToggle("hardware", true); status.innerHTML = "<b>준비:</b> 권한과 카메라 장치 상태를 바꾼 뒤 사진 요청이 어디에서 멈추는지 확인하세요."; run.disabled = false; });
        window.addEventListener("pagehide", clearTimers, { once: true });
    }

    window.COMPUTER_LAB_SETUPS.push(setupRequestRelayLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("c01");
})();
