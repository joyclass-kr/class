(() => {
    "use strict";

    const { setBilingualButtonLabel, figure, contextImage, compactContextImage } = window.COMPUTER_LAB_HELPERS;
    const renderers = window.COMPUTER_LAB_RENDERERS;

    renderers.b02 = (spec, asset) => figure(spec, "visual-mobile-anatomy", `
        <section class="mobile-anatomy-lab" data-mobile-anatomy data-device="phone" data-part="board">
            <header>
                <h3>분해 사진에서 부품의 실제 자리 찾기 <small>Locate Parts Inside Mobile Devices</small></h3>
                <nav role="group" aria-label="살펴볼 기기">
                    <button type="button" data-device-choice="phone" aria-pressed="true">스마트폰 <small>Smartphone</small></button>
                    <button type="button" data-device-choice="tablet" aria-pressed="false">태블릿·iPad <small>Tablet / iPad</small></button>
                </nav>
            </header>
            <div class="mobile-part-key" role="group" aria-label="사진에서 찾을 부품">
                <button type="button" data-mobile-part="board" aria-pressed="true"><i></i><b>로직 보드</b><small>Logic Board · SoC·RAM·저장 칩</small></button>
                <button type="button" data-mobile-part="battery" aria-pressed="false"><i></i><b>배터리</b><small>Battery · 전력 보관·공급</small></button>
                <button type="button" data-mobile-part="camera" aria-pressed="false"><i></i><b>카메라·센서</b><small>Cameras &amp; Sensors · 입력</small></button>
                <button type="button" data-mobile-part="display" aria-pressed="false"><i></i><b>터치 화면</b><small>Touch Display · 입력·출력</small></button>
            </div>
            <div class="mobile-anatomy-stage">
                <div class="mobile-anatomy-view" id="mobileAnatomyView">
                    <figure data-device-panel="phone">
                        <img src="${asset("smartphone-internals-exploded-768.webp")}" srcset="${asset("smartphone-internals-exploded-768.webp")} 768w, ${asset("smartphone-internals-exploded-1536.webp")} 1536w" sizes="(max-width:620px) calc(100vw - 60px), (max-width:820px) calc(100vw - 300px), 680px" width="768" height="512" alt="화면, 배터리, 작은 로직 보드, 카메라가 분리된 스마트폰의 대표 내부 구조">
                        <span data-mobile-marker="board" style="--marker-x:55%;--marker-y:45%">로직 보드</span>
                        <span data-mobile-marker="battery" style="--marker-x:49%;--marker-y:69%">배터리</span>
                        <span data-mobile-marker="camera" style="--marker-x:28%;--marker-y:35%">카메라·센서</span>
                        <span data-mobile-marker="display" style="--marker-x:50%;--marker-y:17%">터치 화면</span>
                    </figure>
                    <figure data-device-panel="tablet" hidden>
                        <img src="${asset("tablet-internals-exploded-768.webp")}" srcset="${asset("tablet-internals-exploded-768.webp")} 768w, ${asset("tablet-internals-exploded-1536.webp")} 1536w" sizes="(max-width:620px) calc(100vw - 60px), (max-width:820px) calc(100vw - 300px), 680px" width="768" height="512" alt="터치 화면, 넓은 배터리, 좁은 로직 보드, 스피커가 분리된 태블릿의 대표 내부 구조">
                        <span data-mobile-marker="board" style="--marker-x:72%;--marker-y:53%">로직 보드</span>
                        <span data-mobile-marker="battery" style="--marker-x:43%;--marker-y:55%">배터리</span>
                        <span data-mobile-marker="camera" style="--marker-x:21%;--marker-y:27%">카메라·센서</span>
                        <span data-mobile-marker="display" style="--marker-x:50%;--marker-y:15%">터치 화면</span>
                    </figure>
                </div>
                <aside class="mobile-part-explanation" aria-live="polite">
                    <span>선택한 부품 <small>Selected Part</small></span>
                    <h4 data-mobile-title>로직 보드 <small>Logic Board</small></h4>
                    <p data-mobile-status>계산을 맡는 SoC, 작업 중 데이터를 두는 RAM, 파일을 보관하는 저장 칩이 좁은 기판에 모여 있습니다.</p>
                    <dl>
                        <div><dt>현재 기기 <small>Device</small></dt><dd data-mobile-device-name>스마트폰 · Smartphone</dd></div>
                        <div><dt>사진 속 위치 <small>Location in Photo</small></dt><dd data-mobile-location>사진 가운데 오른쪽의 좁은 기판</dd></div>
                    </dl>
                </aside>
            </div>
            <section class="mobile-chip-closeup" data-mobile-chip-closeup data-chip="soc" aria-label="스마트폰 로직 보드의 주요 칩 확대">
                <header><h4>로직 보드를 한 단계 더 확대하기 <small>Inside the Logic Board</small></h4><p>칩은 겉모양이 비슷해 보여도 연결된 회로와 맡은 일이 다릅니다. 번호를 눌러 PC 부품과의 관계까지 확인하세요.</p></header>
                <div class="mobile-chip-layout">
                    <div class="mobile-chip-photo">
                        <picture>
                            <source media="(min-width: 1100px)" srcset="${asset("b02-smartphone-logic-board-closeup-v1-1536.webp")}">
                            <img src="${asset("b02-smartphone-logic-board-closeup-v1-768.webp")}" width="768" height="512" alt="SoC, RAM, 저장 칩, 전원 관리 칩, 통신 칩을 구별해 볼 수 있는 스마트폰 로직 보드 확대 사진">
                        </picture>
                        <button type="button" data-mobile-chip-choice="soc" style="--chip-x:51%;--chip-y:48%" aria-pressed="true" aria-label="1번 SoC 위치"><b>1</b></button>
                        <button type="button" data-mobile-chip-choice="ram" style="--chip-x:31%;--chip-y:29%" aria-pressed="false" aria-label="2번 RAM 위치"><b>2</b></button>
                        <button type="button" data-mobile-chip-choice="storage" style="--chip-x:31%;--chip-y:57%" aria-pressed="false" aria-label="3번 저장 칩 위치"><b>3</b></button>
                        <button type="button" data-mobile-chip-choice="power" style="--chip-x:68%;--chip-y:66%" aria-pressed="false" aria-label="4번 전원 관리 칩 위치"><b>4</b></button>
                        <button type="button" data-mobile-chip-choice="radio" style="--chip-x:82%;--chip-y:41%" aria-pressed="false" aria-label="5번 통신 칩 위치"><b>5</b></button>
                    </div>
                    <div class="mobile-chip-side">
                        <div class="mobile-chip-key" role="group" aria-label="설명할 칩 선택">
                            <button type="button" data-mobile-chip-choice="soc" aria-pressed="true"><b>1</b><span>SoC<small>System on a Chip</small></span></button>
                            <button type="button" data-mobile-chip-choice="ram" aria-pressed="false"><b>2</b><span>RAM<small>Random Access Memory</small></span></button>
                            <button type="button" data-mobile-chip-choice="storage" aria-pressed="false"><b>3</b><span>저장 칩<small>NAND Flash Storage</small></span></button>
                            <button type="button" data-mobile-chip-choice="power" aria-pressed="false"><b>4</b><span>전원 관리 칩<small>Power Management IC</small></span></button>
                            <button type="button" data-mobile-chip-choice="radio" aria-pressed="false"><b>5</b><span>통신 칩<small>Radio / Modem</small></span></button>
                        </div>
                        <article class="mobile-chip-explanation" aria-live="polite">
                            <h5 data-mobile-chip-title>SoC <small>System on a Chip</small></h5>
                            <p data-mobile-chip-role>CPU·GPU와 여러 제어 기능을 한 칩에 모아 계산과 장치 제어를 맡습니다.</p>
                            <dl><div><dt>이름 뜻 <small>Name</small></dt><dd data-mobile-chip-name>‘한 칩 위의 시스템’이라는 뜻입니다.</dd></div><div><dt>PC에서 대응 <small>PC Counterpart</small></dt><dd data-mobile-chip-pc>CPU·GPU와 여러 제어 칩이 합쳐진 모습에 가깝습니다.</dd></div></dl>
                        </article>
                    </div>
                </div>
                <p class="mobile-chip-caveat"><b>실제 기기마다 배치가 다릅니다. <small>Layout Varies by Device</small></b><span>번호는 이 교육용 대표 이미지에서 역할을 구분하기 위한 위치입니다. 실제 제품을 분해하거나 수리할 때는 해당 모델의 분해도와 회로 자료를 따로 확인해야 합니다.</span></p>
            </section>
        </section>
    `);

    function setupMobileAnatomyLab() {
        const lab = document.querySelector("[data-mobile-anatomy]");
        if (!lab) return;
        const deviceButtons = Array.from(lab.querySelectorAll("[data-device-choice]"));
        const partButtons = Array.from(lab.querySelectorAll("[data-mobile-part]"));
        const title = lab.querySelector("[data-mobile-title]");
        const status = lab.querySelector("[data-mobile-status]");
        const location = lab.querySelector("[data-mobile-location]");
        const deviceName = lab.querySelector("[data-mobile-device-name]");
        const chipCloseup = lab.querySelector("[data-mobile-chip-closeup]");
        const chipButtons = Array.from(lab.querySelectorAll("[data-mobile-chip-choice]"));
        const chipTitle = lab.querySelector("[data-mobile-chip-title]");
        const chipRole = lab.querySelector("[data-mobile-chip-role]");
        const chipName = lab.querySelector("[data-mobile-chip-name]");
        const chipPc = lab.querySelector("[data-mobile-chip-pc]");
        const deviceCopy = {
            phone: "스마트폰 · Smartphone",
            tablet: "태블릿·iPad · Tablet / iPad"
        };
        const descriptions = {
            board: {
                name: "로직 보드", english: "Logic Board",
                detail: "계산을 맡는 SoC, 작업 중 데이터를 두는 RAM, 파일을 보관하는 저장 칩이 좁은 기판에 모여 있습니다.",
                location: { phone: "사진 가운데 오른쪽의 좁은 기판", tablet: "사진 오른쪽의 길고 좁은 기판" }
            },
            battery: {
                name: "배터리", english: "Battery",
                detail: "충전한 전기를 보관해 부품에 공급합니다. 얇은 기기 안에서 넓은 면적을 차지합니다.",
                location: { phone: "사진 아래쪽의 넓고 납작한 판", tablet: "사진 가운데를 크게 차지하는 두 장의 판" }
            },
            camera: {
                name: "카메라·센서", english: "Cameras and Sensors",
                detail: "빛과 움직임 같은 주변 변화를 전기 신호로 바꾸어 기기 안으로 보냅니다.",
                location: { phone: "사진 왼쪽 위의 작은 렌즈와 센서 묶음", tablet: "사진 왼쪽 위의 작은 카메라·센서" }
            },
            display: {
                name: "터치 화면", english: "Touch Display",
                detail: "손가락 위치를 받는 입력 장치이면서 픽셀로 글과 그림을 보여 주는 출력 장치입니다.",
                location: { phone: "사진 가장 위쪽의 길고 얇은 화면 판", tablet: "사진 가장 위쪽의 넓은 화면 판" }
            }
        };
        let selectedDevice = lab.dataset.device || "phone";
        let selectedPart = lab.dataset.part || "board";
        let selectedChip = "soc";
        const chips = {
            soc: {
                title: "SoC", english: "System on a Chip",
                role: "CPU·GPU와 여러 제어 기능을 한 칩에 모아 계산과 장치 제어를 맡습니다.",
                name: "‘한 칩 위의 시스템’이라는 뜻입니다.",
                pc: "PC의 CPU·GPU와 여러 제어 칩이 한 패키지에 합쳐진 모습에 가깝습니다."
            },
            ram: {
                title: "RAM", english: "Random Access Memory",
                role: "실행 중인 앱의 명령과 작업 데이터를 빠르게 두는 휘발성 작업 공간입니다.",
                name: "어느 저장 위치든 바로 접근할 수 있다는 뜻의 Random Access Memory입니다.",
                pc: "PC의 RAM과 같은 역할이지만 스마트폰에서는 보드에 납땜되거나 SoC와 가까이 붙습니다."
            },
            storage: {
                title: "NAND 저장 칩", english: "NAND Flash Storage",
                role: "앱·사진·문서를 전원이 꺼진 뒤에도 남도록 기록하는 비휘발성 저장 장치입니다.",
                name: "NAND는 NOT-AND 논리 구조에서 온 이름이고, flash는 전기로 여러 칸을 지우고 다시 기록하는 저장 방식을 가리킵니다.",
                pc: "PC의 SSD 안에 들어 있는 NAND 플래시 칩과 같은 계열입니다."
            },
            power: {
                title: "전원 관리 칩", english: "Power Management IC",
                role: "배터리 전압을 각 부품이 필요한 전압으로 바꾸고 공급 순서와 충전을 조절합니다.",
                name: "PMIC는 Power Management Integrated Circuit의 줄임말입니다.",
                pc: "PC의 전원 공급 장치와 메인보드 전원 회로가 나누어 맡는 일을 작은 칩에 모은 모습에 가깝습니다."
            },
            radio: {
                title: "통신 칩", english: "Radio and Modem",
                role: "이동통신·Wi-Fi 같은 무선 신호를 주고받을 수 있는 데이터 신호로 바꿉니다.",
                name: "modem은 modulator와 demodulator를 합친 말로, 보내는 신호와 받는 신호를 서로 바꾸는 기능을 가리킵니다.",
                pc: "PC의 Wi-Fi·Bluetooth 어댑터와 유선 네트워크 장치에 대응합니다."
            }
        };
        const renderChip = () => {
            if (!chipCloseup) return;
            const chip = chips[selectedChip];
            chipCloseup.dataset.chip = selectedChip;
            chipButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mobileChipChoice === selectedChip)));
            chipTitle.innerHTML = `${chip.title} <small>${chip.english}</small>`;
            chipRole.textContent = chip.role;
            chipName.textContent = chip.name;
            chipPc.textContent = chip.pc;
        };

        const render = () => {
            const copy = descriptions[selectedPart];
            lab.dataset.device = selectedDevice;
            lab.dataset.part = selectedPart;
            deviceButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.deviceChoice === selectedDevice)));
            partButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mobilePart === selectedPart)));
            lab.querySelectorAll("[data-device-panel]").forEach((panel) => { panel.hidden = panel.dataset.devicePanel !== selectedDevice; });
            title.innerHTML = `${copy.name} <small>${copy.english}</small>`;
            status.textContent = copy.detail;
            location.textContent = copy.location[selectedDevice];
            deviceName.textContent = deviceCopy[selectedDevice];
            if (chipCloseup) chipCloseup.hidden = selectedPart !== "board";
            renderChip();
        };

        const bindArrowNavigation = (buttons, dataKey, choose, columns) => {
            buttons.forEach((button, index) => {
                button.addEventListener("click", () => choose(button.dataset[dataKey]));
                button.addEventListener("keydown", (event) => {
                    const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns };
                    if (!(event.key in moves)) return;
                    event.preventDefault();
                    const next = (index + moves[event.key] + buttons.length) % buttons.length;
                    buttons[next].focus();
                    buttons[next].click();
                });
            });
        };
        bindArrowNavigation(deviceButtons, "deviceChoice", (value) => { selectedDevice = value; render(); }, 2);
        bindArrowNavigation(partButtons, "mobilePart", (value) => { selectedPart = value; render(); }, 2);
        chipButtons.forEach((button) => button.addEventListener("click", () => {
            selectedChip = button.dataset.mobileChipChoice;
            renderChip();
        }));
        render();
    }

    window.COMPUTER_LAB_SETUPS.push(setupMobileAnatomyLab);
    window.COMPUTER_PREMIUM_VISUAL_IDS.push("b02");
})();
