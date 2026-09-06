(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.b03 = (spec, asset) => figure(spec, "visual-port-bench", `
        <section class="usb-c-capability-lab" data-port-lab data-port-device="monitor" data-port-state="ready" data-port-cable="charge">
            <header class="usb-c-lab-heading">
                <div>
                    <h3>모양이 같은 USB-C 케이블도 할 수 있는 일이 다르다 <small>Same Connector Shape, Different Capabilities</small></h3>
                    <p>케이블을 연결 자리에 끌어다 놓거나 누른 뒤 시험하세요. 물리적으로 꽂히는지와 데이터·영상·전력 신호가 지나가는지는 따로 확인합니다.</p>
                </div>
                <figure class="usb-c-reference-photo">
                    <img src="${asset("b03-peripherals-ports-drivers-illustration-v1-768.webp")}" width="768" height="512" alt="노트북의 여러 단자와 주변기기를 케이블로 연결하는 모습">
                    <figcaption>포트와 케이블의 겉모양은 첫 확인 단계입니다.</figcaption>
                </figure>
            </header>
            <div class="port-device-tabs" role="group" aria-label="연결할 주변기기">
                <button type="button" data-port-device="monitor" aria-pressed="true">외부 모니터 <small>External Monitor</small></button>
                <button type="button" data-port-device="tablet" aria-pressed="false">그림 태블릿 <small>Drawing Tablet</small></button>
            </div>
            <div class="usb-c-connection-scene">
                <section class="usb-c-source-device" aria-label="학생의 노트북">
                    <header><b>학생의 노트북</b><small>Laptop</small></header>
                    <div class="laptop-display"><span>과제 화면</span><i></i></div>
                    <div class="usb-c-port-shape"><span>USB-C</span><i aria-hidden="true"></i></div>
                </section>
                <div class="usb-c-drop-track" data-port-dropzone tabindex="0" role="button" aria-label="선택한 USB-C 케이블을 연결할 자리">
                    <span class="usb-c-plug left-plug" aria-hidden="true"></span>
                    <span class="usb-c-cable-line"></span>
                    <strong data-port-cable-name>충전 전용 케이블</strong>
                    <small>여기에 케이블 놓기 <em>Drop Cable Here</em></small>
                    <span class="usb-c-plug right-plug" aria-hidden="true"></span>
                </div>
                <section class="usb-c-target-device" data-port-target>
                    <header><b data-port-device-name>외부 모니터</b><small data-port-device-english>External Monitor</small></header>
                    <div class="target-device-screen">
                        <span class="target-no-signal" data-port-output>연결 시험 전</span>
                        <div class="target-picture" aria-hidden="true"><i></i><b>과제 화면</b></div>
                        <div class="target-pen-line" aria-hidden="true"></div>
                    </div>
                    <div class="usb-c-port-shape"><span>USB-C</span><i aria-hidden="true"></i></div>
                </section>
            </div>
            <div class="usb-c-cable-choices" role="group" aria-label="시험할 USB-C 케이블">
                <button type="button" draggable="true" data-port-cable-choice="charge" aria-pressed="true"><i></i><span><b>충전 전용</b><small>Power Only</small></span><em>전력 ✓　데이터 —　영상 —</em></button>
                <button type="button" draggable="true" data-port-cable-choice="data" aria-pressed="false"><i></i><span><b>데이터 케이블</b><small>Power + Data</small></span><em>전력 ✓　데이터 ✓　영상 —</em></button>
                <button type="button" draggable="true" data-port-cable-choice="video" aria-pressed="false"><i></i><span><b>영상 지원 케이블</b><small>Power + Data + Video</small></span><em>전력 ✓　데이터 ✓　영상 ✓</em></button>
            </div>
            <div class="usb-c-signal-ledger" aria-label="연결 시험 결과">
                <span data-port-check="shape"><b>물리적 모양</b><small>Physical Fit</small><em>시험 전</em></span>
                <span data-port-check="power"><b>전력</b><small>Power</small><em>시험 전</em></span>
                <span data-port-check="data"><b>데이터</b><small>Data</small><em>시험 전</em></span>
                <span data-port-check="video"><b>영상</b><small>Video</small><em>시험 전</em></span>
                <span data-port-check="driver"><b>드라이버</b><small>Driver</small><em>해당 없음</em></span>
            </div>
            <div class="driver-setting" data-port-driver-row hidden><span><b>그림 태블릿 드라이버</b><small>Drawing Tablet Driver</small></span><button type="button" data-driver-toggle aria-pressed="true"><i></i><span data-driver-label>설치됨</span></button></div>
            <div class="port-actions"><button type="button" data-port-connect>이 연결 시험하기 <small>Test This Connection</small></button><button type="button" data-port-reset>처음 상태 <small>Reset</small></button></div>
            <p class="lab-readout" data-port-status aria-live="polite"><b>외부 모니터:</b> 세 케이블은 모두 USB-C 모양이라 꽂힙니다. 그러나 화면을 보내려면 영상 신호를 지원하는 케이블과 포트가 필요합니다.</p>
        </section>
    `);

    function setupPortLab() {
        const lab = document.querySelector("[data-port-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-port-status]");
        const driverButton = lab.querySelector("[data-driver-toggle]");
        const driverLabel = lab.querySelector("[data-driver-label]");
        const deviceName = lab.querySelector("[data-port-device-name]");
        const deviceEnglish = lab.querySelector("[data-port-device-english]");
        const cableName = lab.querySelector("[data-port-cable-name]");
        const output = lab.querySelector("[data-port-output]");
        const driverRow = lab.querySelector("[data-port-driver-row]");
        const dropzone = lab.querySelector("[data-port-dropzone]");
        const checkItems = Object.fromEntries(Array.from(lab.querySelectorAll("[data-port-check]")).map((item) => [item.dataset.portCheck, item]));
        const devices = {
            monitor: { name: "외부 모니터", english: "External Monitor", required: "video", needsDriver: false },
            tablet: { name: "그림 태블릿", english: "Drawing Tablet", required: "data", needsDriver: true }
        };
        const cables = {
            charge: { name: "충전 전용 케이블", power: true, data: false, video: false },
            data: { name: "데이터 케이블", power: true, data: true, video: false },
            video: { name: "영상 지원 케이블", power: true, data: true, video: true }
        };
        let device = "monitor";
        let cable = "charge";
        let driverInstalled = true;
        const setCheck = (key, state, label) => {
            const item = checkItems[key];
            if (!item) return;
            item.dataset.state = state;
            item.querySelector("em").textContent = label;
        };
        const resetChecks = () => {
            ["shape", "power", "data", "video"].forEach((key) => setCheck(key, "idle", "시험 전"));
            setCheck("driver", device === "tablet" ? "idle" : "neutral", device === "tablet" ? "시험 전" : "해당 없음");
            output.textContent = "연결 시험 전";
        };
        const setDevice = (next) => {
            device = next;
            lab.dataset.portDevice = device;
            lab.dataset.portState = "ready";
            lab.querySelectorAll("[data-port-device]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.portDevice === device)));
            deviceName.textContent = devices[device].name;
            deviceEnglish.textContent = devices[device].english;
            driverRow.hidden = !devices[device].needsDriver;
            resetChecks();
            status.innerHTML = device === "monitor"
                ? "<b>외부 모니터:</b> 세 케이블은 모두 USB-C 모양이라 꽂힙니다. 그러나 화면을 보내려면 영상 신호를 지원하는 케이블과 포트가 필요합니다."
                : "<b>그림 태블릿:</b> 펜 좌표를 보내려면 데이터가 지나가야 하고, 운영체제가 그 신호를 해석할 드라이버도 필요합니다.";
        };
        const setCable = (next) => {
            cable = next;
            lab.dataset.portCable = cable;
            lab.dataset.portState = "ready";
            lab.querySelectorAll("[data-port-cable-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.portCableChoice === cable)));
            cableName.textContent = cables[cable].name;
            resetChecks();
        };
        const setDriver = (installed) => {
            driverInstalled = installed;
            driverButton.setAttribute("aria-pressed", String(installed));
            driverLabel.textContent = installed ? "설치됨" : "없음";
            lab.dataset.portState = "ready";
            resetChecks();
        };
        const connect = () => {
            const selectedDevice = devices[device];
            const selectedCable = cables[cable];
            setCheck("shape", "pass", "꽂힘 ✓");
            setCheck("power", selectedCable.power ? "pass" : "fail", selectedCable.power ? "지나감 ✓" : "없음");
            setCheck("data", selectedCable.data ? "pass" : "fail", selectedCable.data ? "지나감 ✓" : "막힘");
            setCheck("video", selectedCable.video ? "pass" : "fail", selectedCable.video ? "지나감 ✓" : "막힘");
            setCheck("driver", selectedDevice.needsDriver ? (driverInstalled ? "pass" : "fail") : "neutral", selectedDevice.needsDriver ? (driverInstalled ? "설치됨 ✓" : "없음") : "해당 없음");
            if (!selectedCable[selectedDevice.required]) {
                lab.dataset.portState = "signal-blocked";
                output.textContent = device === "monitor" ? "신호 없음" : "펜 입력 없음";
                status.innerHTML = `<b>모양은 맞지만 기능이 부족합니다:</b> ${selectedCable.name}에는 ${selectedDevice.required === "video" ? "영상" : "데이터"} 신호가 지나가는 연결선과 규격이 없습니다. USB-C라는 겉모양만으로 기능을 결정할 수 없습니다.`;
                return;
            }
            if (selectedDevice.needsDriver && !driverInstalled) {
                lab.dataset.portState = "unknown";
                output.textContent = "알 수 없는 장치";
                status.innerHTML = "<b>데이터는 도착했지만 해석하지 못했습니다:</b> 케이블은 펜 좌표를 보냈지만 운영체제에 그림 태블릿 드라이버가 없어 입력 장치의 신호로 바꾸지 못했습니다.";
                return;
            }
            lab.dataset.portState = "recognized";
            output.textContent = device === "monitor" ? "화면 표시됨" : "펜 선이 그려짐";
            status.innerHTML = device === "monitor"
                ? "<b>화면 표시 성공:</b> 같은 USB-C 모양 가운데 영상 신호까지 지원하는 케이블을 사용해 노트북의 픽셀 데이터가 모니터로 전달되었습니다."
                : "<b>펜 입력 성공:</b> 데이터 케이블로 좌표가 도착했고 드라이버가 그 신호를 앱이 사용할 펜 입력으로 해석했습니다.";
        };
        lab.querySelectorAll("[data-port-device]").forEach((button) => button.addEventListener("click", () => setDevice(button.dataset.portDevice)));
        lab.querySelectorAll("[data-port-cable-choice]").forEach((button) => {
            button.addEventListener("click", () => setCable(button.dataset.portCableChoice));
            button.addEventListener("dragstart", (event) => event.dataTransfer?.setData("text/plain", button.dataset.portCableChoice));
        });
        dropzone.addEventListener("dragover", (event) => { event.preventDefault(); dropzone.classList.add("is-drop-target"); });
        dropzone.addEventListener("dragleave", () => dropzone.classList.remove("is-drop-target"));
        dropzone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropzone.classList.remove("is-drop-target");
            const droppedCable = event.dataTransfer?.getData("text/plain");
            if (cables[droppedCable]) setCable(droppedCable);
        });
        dropzone.addEventListener("click", connect);
        dropzone.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            connect();
        });
        driverButton.addEventListener("click", () => setDriver(!driverInstalled));
        lab.querySelector("[data-port-connect]").addEventListener("click", connect);
        lab.querySelector("[data-port-reset]").addEventListener("click", () => { setDriver(true); setCable("charge"); setDevice("monitor"); });
        setDevice("monitor");
        setCable("charge");
        setDriver(true);
    }

    window.COMPUTER_LAB_SETUPS.push(setupPortLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("b03");
})();
