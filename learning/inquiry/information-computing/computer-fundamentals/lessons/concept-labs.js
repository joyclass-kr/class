(() => {
    "use strict";

    const fallbackRenderer = window.COMPUTER_CONCEPT_VISUAL;
    const renderers = {};
    const setBilingualButtonLabel = (button, korean, english) => {
        button.replaceChildren(document.createTextNode(korean + " "));
        const small = document.createElement("small");
        small.textContent = english;
        button.append(small);
    };
    const figure = (spec, className, body) => `
        <figure class="lesson-specific-figure premium-concept-figure visual-${spec.id} ${className}" aria-label="${spec.concept}">
            <div class="lesson-specific-board">${body}</div>
            <figcaption>${spec.caption}</figcaption>
        </figure>
    `;
    const contextImage = (asset, basename, alt, height = 512) => `
        <figure class="context-illustration">
            <picture>
                <img
                    src="${asset(`${basename}-768.webp`)}"
                    srcset="${asset(`${basename}-768.webp`)} 768w, ${asset(`${basename}-1536.webp`)} 1536w"
                    sizes="(max-width: 820px) calc(100vw - 72px), (max-width: 1180px) calc(100vw - 112px), 1020px"
                    width="768"
                    height="${height}"
                    alt="${alt}"
                >
            </picture>
            <figcaption><b>관찰 <small>Observe</small></b><span>${alt}</span></figcaption>
        </figure>
    `;

    const compactContextImage = (asset, basename, alt, caption, englishCaption) => `
        <figure class="lab-context-figure">
            <picture>
                <img
                    src="${asset(`${basename}-768.webp`)}"
                    srcset="${asset(`${basename}-768.webp`)} 768w, ${asset(`${basename}-1536.webp`)} 1536w"
                    sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px"
                    width="1536"
                    height="1024"
                    loading="eager"
                    decoding="async"
                    alt="${alt}"
                >
            </picture>
            <figcaption>${caption}<small>${englishCaption}</small></figcaption>
        </figure>
    `;

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

    renderers.c03 = (spec, asset) => figure(spec, "visual-program-process", `
        <section class="concept-lab-split">
            <section class="program-process-lab" data-program-lab data-program-state="stopped">
                <div class="program-state-board">
                    <section class="program-storage"><h3>저장 장치 <small>Storage</small></h3><div class="program-file"><i></i><b>그림 앱</b><small>Drawing App · 저장된 명령과 자료</small></div></section>
                    <span class="state-arrow"><b>실행 요청</b><i aria-hidden="true">→</i></span>
                    <section class="process-memory"><h3>실행 중인 프로세스 <small>Running Process</small></h3><div data-process-token hidden><i></i><b>그림 앱 프로세스</b><small data-process-copy>CPU 시간·RAM 공간 사용</small></div><em data-process-empty>실행 중인 프로세스 없음</em></section>
                    <span class="state-arrow"><b>화면 표시</b><i aria-hidden="true">→</i></span>
                    <section class="window-display"><h3>창 <small>Window</small></h3><div class="window-stack" data-window-stack></div><em data-window-empty>열린 창 없음</em></section>
                </div>
                <div class="program-actions" role="group" aria-label="프로그램 실행 상태 바꾸기">
                    <button type="button" data-program-action="run">프로그램 실행 <small>Run</small></button>
                    <button type="button" data-program-action="new" disabled>새 창 <small>New Window</small></button>
                    <button type="button" data-program-action="background" disabled>창 숨기기 <small>Keep in Background</small></button>
                    <button type="button" data-program-action="end" disabled>프로세스 끝내기 <small>End Process</small></button>
                </div>
                <p class="lab-readout" data-program-status aria-live="polite"><b>저장된 그림 앱:</b> 앱의 명령과 자료는 저장 장치에 있지만, 운영체제가 시작한 프로세스와 그 프로세스가 보여 주는 창은 아직 없습니다.</p>
                <p class="model-note">프로세스는 RAM 자체가 아니라 운영체제가 관리하는 실행 상태입니다. 이 실험의 그림 앱은 한 프로세스가 CPU 시간과 RAM 공간을 사용하며 여러 창을 관리하는 모형이고, 실제 앱은 여러 프로세스를 사용하기도 합니다.</p>
            </section>
            ${contextImage(asset, "c03-program-process-window-illustration-v1", "저장된 앱 아이콘에서 실행 중인 작업이 시작되고 여러 창과 탭으로 나타나는 장면")}
        </section>
    `);

    renderers.d03 = (spec, asset) => figure(spec, "visual-clipboard-workbench", `
        <section class="concept-lab-split">
            <section class="clipboard-workbench" data-clipboard-lab>
                <div class="clipboard-documents">
                    <label>원문 <small>Source Document</small><textarea data-clipboard-source rows="4">고양이와 강아지가 공원에서 달립니다.</textarea></label>
                    <div class="clipboard-shelf"><b>클립보드 <small>Clipboard</small></b><output data-clipboard-value>비어 있음</output><span>복사·잘라내기한 내용의 임시 사본</span></div>
                    <label>붙여넣을 문서 <small>Destination Document</small><textarea data-clipboard-target rows="4">관찰한 동물: </textarea></label>
                </div>
                <div class="selection-presets" role="group" aria-label="원문에서 선택할 말"><span>선택 <small>Select</small></span><button type="button" data-select-text="고양이">고양이 <small>Cat</small></button><button type="button" data-select-text="강아지">강아지 <small>Dog</small></button><button type="button" data-select-text="공원">공원 <small>Park</small></button></div>
                <div class="clipboard-actions" role="group" aria-label="클립보드 명령">
                    <button type="button" data-clipboard-action="copy">복사 <small>Ctrl/Cmd+C</small></button>
                    <button type="button" data-clipboard-action="cut">잘라내기 <small>Ctrl/Cmd+X</small></button>
                    <button type="button" data-clipboard-action="paste">붙여넣기 <small>Ctrl/Cmd+V</small></button>
                    <button type="button" data-clipboard-action="reset">처음 상태 <small>Reset</small></button>
                </div>
                <p class="lab-readout" data-clipboard-status aria-live="polite"><b>선택:</b> 원문에서 직접 드래그하거나 말 단추를 누른 뒤 복사·잘라내기를 실행하세요. 붙여넣기는 아래 문서의 커서 위치에 들어갑니다.</p>
            </section>
            ${contextImage(asset, "d03-keyboard-clipboard-flow-illustration-v1", "노트북 문서에서 복사한 내용이 임시 클립보드를 거쳐 태블릿 문서의 커서 위치에 붙여넣어지는 장면")}
        </section>
    `);

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

    renderers.e03 = (spec) => figure(spec, "visual-file-operation-lab", `
        <section class="file-operation-lab" data-file-operation-lab data-operation="start">
            <div class="file-manager-ui">
                <div class="window-chrome"><b>파일 <small>Files</small></b><span>—　□　×</span></div>
                <div class="file-toolbar" role="group" aria-label="비교할 파일 명령">
                    <button type="button" data-file-operation="start" aria-pressed="true">처음 상태 <small>Reset</small></button>
                    <button type="button" data-file-operation="save" aria-pressed="false">저장 <small>Save</small></button>
                    <button type="button" data-file-operation="save-as" aria-pressed="false">다른 이름으로 저장 <small>Save As</small></button>
                    <button type="button" data-file-operation="copy" aria-pressed="false">복사 <small>Copy</small></button>
                    <button type="button" data-file-operation="move" aria-pressed="false">이동 <small>Move</small></button>
                    <button type="button" data-file-operation="delete" aria-pressed="false">삭제 <small>Delete</small></button>
                </div>
                <div class="operation-file-workspace">
                    <aside class="file-effect-ledger" aria-live="polite">
                        <h3>명령 뒤 무엇이 바뀌었나? <small>What Changed?</small></h3>
                        <dl>
                            <div><dt>파일 ID</dt><dd data-file-effect="identity">A</dd></div>
                            <div><dt>파일 수</dt><dd data-file-effect="count">1 → 1</dd></div>
                            <div><dt>이름</dt><dd data-file-effect="name">그대로</dd></div>
                            <div><dt>위치</dt><dd data-file-effect="location">문서</dd></div>
                            <div><dt>내용</dt><dd data-file-effect="content">내용 1</dd></div>
                        </dl>
                    </aside>
                    <main>
                        <section class="operation-folder" data-file-folder="documents"><h4>문서 <small>Documents</small></h4><div data-file-list="documents"></div></section>
                        <section class="operation-folder" data-file-folder="homework"><h4>과제 <small>Homework</small></h4><div data-file-list="homework"></div></section>
                        <section class="operation-folder is-trash" data-file-folder="trash"><h4>휴지통 <small>Trash</small></h4><div data-file-list="trash"></div></section>
                    </main>
                </div>
            </div>
            <p class="lab-readout" data-file-operation-status><b>처음 상태:</b> 문서 폴더에 파일 A 한 개가 있습니다. 각 명령을 눌러 같은 시작점에서 결과를 비교하세요.</p>
        </section>
    `);

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

    renderers.e04 = (spec) => figure(spec, "visual-reference-lab", `
        <section class="reference-workbench" data-reference-lab data-reference="shortcut">
            <nav aria-label="비교할 화면 표시">
                <button type="button" data-reference-choice="icon" aria-pressed="false">아이콘 <small>Icon</small></button>
                <button type="button" data-reference-choice="shortcut" aria-pressed="true">바로가기 <small>Shortcut</small></button>
                <button type="button" data-reference-choice="bookmark" aria-pressed="false">북마크·즐겨찾기 <small>Bookmark / Favorite</small></button>
            </nav>
            <section class="reference-platform-guide" aria-label="기기별 빠른 접근 기능 비교">
                <header><b>같은 목적, 다른 화면 이름 <small>Same Goal, Different Device Features</small></b><span>자주 쓰는 대상을 빨리 여는 기능은 기기마다 위치와 이름이 다릅니다.</span></header>
                <div>
                    <article><strong>Windows PC</strong><span>파일·폴더 바로가기, 작업 표시줄 고정</span><small>Shortcut · Pin to Taskbar</small></article>
                    <article><strong>Chromebook</strong><span>앱을 선반에 고정, 파일 앱에서 위치 열기</span><small>Pin to Shelf · Files</small></article>
                    <article><strong>iPad</strong><span>앱을 Dock·홈 화면에 두고 파일 위치를 즐겨찾기</span><small>Dock · Home Screen · Files Favorite</small></article>
                    <article><strong>웹페이지 <small>Web Page</small></strong><span>Chrome·Safari 북마크 또는 홈 화면 웹 아이콘</span><small>Bookmark · Add to Home Screen</small></article>
                </div>
            </section>
            <div class="reference-scenes">
                <div class="desktop-scene">
                    <span class="desktop-file" data-original-file><i data-file-icon>PDF</i><b>과학보고서.pdf</b><em data-file-path>문서/과학보고서.pdf</em></span>
                    <button type="button" class="desktop-shortcut" data-reference-marker="shortcut"><i>PDF<em>↗</em></i><b>보고서 바로가기</b></button>
                    <span class="reference-path-label" data-shortcut-path>대상: 문서/과학보고서.pdf</span>
                    <small>파일 화면 <em>File Screen</em></small>
                </div>
                <div class="browser-scene">
                    <div class="browser-bar"><span>☆</span><b data-page-url>https://science.example/report</b></div>
                    <button type="button" class="bookmark-row" data-reference-marker="bookmark">★ 과학 보고서 웹페이지 <small>Science Report Webpage</small></button>
                    <span class="reference-path-label" data-bookmark-url>저장 주소: https://science.example/report</span>
                    <small>브라우저 <em>Browser</em></small>
                </div>
                <svg class="reference-lines" viewBox="0 0 1000 310" aria-hidden="true">
                    <path class="shortcut-line" d="M245 168 C360 70 470 70 565 135"/>
                    <path class="bookmark-line" d="M760 105 C760 55 845 48 915 78"/>
                </svg>
            </div>
            <div class="reference-state-board" aria-live="polite">
                <span><small>원본 파일</small><b data-file-state>남아 있음</b></span>
                <span><small>바로가기</small><b data-shortcut-state>연결됨</b></span>
                <span><small>웹페이지</small><b data-page-state>서버에 있음</b></span>
                <span><small>북마크</small><b data-bookmark-state>주소 저장됨</b></span>
            </div>
            <div class="reference-actions">
                <button type="button" data-reference-action="open">바로가기로 열기 <small>Open the Shortcut</small></button>
                <button type="button" data-reference-action="change">원본 위치 바꾸기 <small>Move the Original</small></button>
                <button type="button" data-reference-action="delete">바로가기 삭제 <small>Delete the Shortcut</small></button>
                <button type="button" data-reference-action="reset">처음 상태 <small>Reset</small></button>
            </div>
            <p class="lab-readout" data-reference-status><b>바로가기</b>에는 원본 파일의 경로가 기록되어 있습니다. 열기·이동·삭제를 직접 실행해 원본과 연결의 상태를 비교하세요.</p>
        </section>
    `);

    renderers.h03 = (spec) => figure(spec, "visual-browser-inspector", `
        <section class="browser-state-lab" data-browser-lab data-browser-highlight="">
            <div class="browser-state-window">
                <div class="browser-state-tabs" data-browser-tab-region>
                    <div role="tablist" aria-label="열린 웹페이지 탭" data-browser-tab-list></div>
                    <button type="button" data-browser-new-tab aria-label="새 탭 열기">＋ 새 탭 <small>New Tab</small></button>
                </div>
                <div class="browser-state-toolbar">
                    <button type="button" data-browser-back aria-label="이 탭의 이전 페이지로 뒤로 가기" disabled>←<small>뒤로</small></button>
                    <div class="browser-current-address" data-browser-address aria-label="현재 탭의 주소 표시(읽기 전용)">
                        <span>현재 주소 <small>Current URL</small></span><code data-browser-url>https://search.local/</code>
                    </div>
                </div>
                <main class="browser-state-viewport" id="browser-state-viewport" data-browser-viewport>
                    <section class="browser-search-home" data-browser-page="home" data-search-service>
                        <header><strong>교실 검색 <small>Class Search</small></strong><p>검색어와 관련된 로컬 웹페이지를 찾아 결과 목록으로 보여 주는 검색 서비스입니다.</p></header>
                        <form data-browser-search-form>
                            <label for="browserSearchInput">찾고 싶은 내용 <small>Search Query</small></label>
                            <div><input id="browserSearchInput" data-browser-search-input value="혜성의 꼬리는 왜 생길까?" autocomplete="off"><button type="submit">검색 <small>Search</small></button></div>
                        </form>
                        <div class="browser-search-topics" aria-label="이 검색 모형에 들어 있는 자료 주제">
                            <span>검색 가능한 자료 <small>Available Topics</small></span>
                            <div>
                                <button type="button" data-browser-suggestion="혜성">혜성 <small>Comet</small></button>
                                <button type="button" data-browser-suggestion="수달">수달 <small>Otter</small></button>
                                <button type="button" data-browser-suggestion="강">강 <small>River</small></button>
                                <button type="button" data-browser-suggestion="달">달 <small>Moon</small></button>
                                <button type="button" data-browser-suggestion="날씨">날씨 <small>Weather</small></button>
                            </div>
                        </div>
                    </section>
                    <section class="browser-search-results" data-browser-page="results" data-search-service hidden>
                        <header><strong><span data-browser-query></span> 검색 결과</strong><small>검색 엔진이 찾은 로컬 웹페이지</small></header>
                        <div data-browser-result-list></div>
                    </section>
                    <article class="browser-local-page" data-browser-page="page" data-webpage-region hidden>
                        <header data-site-region><span data-page-site></span><small data-page-domain></small></header>
                        <h2 data-page-title></h2>
                        <dl class="page-source-facts" aria-label="자료의 출처 정보">
                            <div><dt>운영 기관 <small>Publisher</small></dt><dd data-page-publisher></dd></div>
                            <div><dt>작성자 <small>Author</small></dt><dd data-page-author></dd></div>
                            <div><dt>게시·수정일 <small>Date</small></dt><dd data-page-date></dd></div>
                            <div><dt>근거 <small>Evidence</small></dt><dd data-page-evidence></dd></div>
                        </dl>
                        <p data-page-body></p>
                        <button type="button" data-page-related-link data-link-region></button>
                    </article>
                </main>
            </div>
            <p class="browser-state-status" data-browser-status aria-live="polite">검색어를 직접 입력하고 검색을 실행해 보세요. 검색 결과도 브라우저 안에 표시되는 웹페이지입니다.</p>
            <div class="browser-state-terms" aria-label="현재 화면에서 용어가 가리키는 곳 확인">
                <span>현재 화면에서 찾기 <small>Locate the Term</small></span>
                <div>
                    <button type="button" data-browser-term="address" aria-pressed="false">주소 <small>Address</small></button>
                    <button type="button" data-browser-term="tab" aria-pressed="false">탭 <small>Tab</small></button>
                    <button type="button" data-browser-term="search" aria-pressed="false">검색 엔진 <small>Search Engine</small></button>
                    <button type="button" data-browser-term="site" aria-pressed="false">웹사이트 <small>Website</small></button>
                    <button type="button" data-browser-term="page" aria-pressed="false">웹페이지 <small>Webpage</small></button>
                    <button type="button" data-browser-term="link" aria-pressed="false">링크 <small>Link</small></button>
                </div>
            </div>
        </section>
    `);

    renderers.h01 = (spec, asset) => figure(spec, "visual-network-journey", `
        <section class="network-path-lab" data-network-journey data-network-step="0">
            <header class="network-path-heading has-context">
                <div><h3>요청 패킷의 길을 직접 시험하기 <small>Network Path Test</small></h3><p>연결을 끄거나 켠 뒤 패킷을 한 단계씩 보내, 어느 연결 지점에서 멈추는지 확인하세요.</p></div>
                ${compactContextImage(asset, "h01-device-router-internet-illustration-v1", "교실의 태블릿·노트북·휴대전화가 무선 공유기에 연결되고, 공유기에서 건물 밖 통신망을 지나 원격 서버실로 이어지는 빛의 경로", "기기→공유기→인터넷→서버", "Device → Router → Internet → Server")}
            </header>
            <div class="network-path-scene" aria-label="내 기기에서 서버까지 이어지는 네트워크 경로">
                <article class="network-endpoint device-endpoint" data-network-node="device">
                    <span class="network-node-number">1</span><strong>내 기기 <small>Device</small></strong>
                    <p>수업 사이트 요청을 작은 패킷으로 준비합니다.</p>
                    <span class="network-packet" data-network-packet>요청 패킷</span>
                </article>
                <button type="button" class="network-link-switch wifi-link" data-network-link="wifi" aria-pressed="true">
                    <span>Wi-Fi 연결</span><b data-network-link-state>켜짐</b><small>기기 ↔ 공유기</small>
                </button>
                <article class="network-endpoint router-endpoint" data-network-node="router">
                    <span class="network-node-number">2</span><strong>Wi-Fi 공유기 <small>Router</small></strong>
                    <p>목적지를 보고 인터넷 쪽 길로 전달합니다.</p>
                </article>
                <button type="button" class="network-link-switch internet-link" data-network-link="internet" aria-pressed="true">
                    <span>인터넷 회선</span><b data-network-link-state>켜짐</b><small>공유기 ↔ 인터넷</small>
                </button>
                <article class="network-endpoint internet-endpoint" data-network-node="internet">
                    <span class="network-node-number">3</span><strong>인터넷 <small>Internet</small></strong>
                    <p>이어진 여러 네트워크가 서버까지 길을 만듭니다.</p>
                </article>
                <button type="button" class="network-link-switch server-link" data-network-link="server" aria-pressed="true">
                    <span>서버 연결</span><b data-network-link-state>켜짐</b><small>인터넷 ↔ 서버</small>
                </button>
                <article class="network-endpoint server-endpoint" data-network-node="server">
                    <span class="network-node-number">4</span><strong>수업 서버 <small>Server</small></strong>
                    <p>도착한 요청을 읽고 필요한 페이지를 찾습니다.</p>
                </article>
            </div>
            <div class="network-path-controls">
                <button type="button" class="network-send-action" data-network-send>패킷 한 단계 보내기 <small>Send Packet One Step</small></button>
                <button type="button" data-network-reset>모두 켜고 처음부터 <small>Reset All Links</small></button>
            </div>
            <p class="lab-readout" data-network-status aria-live="polite">패킷은 내 기기에 있습니다. 연결 하나를 끄거나 그대로 첫 단계를 보내 보세요.</p>
        </section>
    `);

    renderers.h02 = (spec, asset) => figure(spec, "visual-web-request-lab", `
        <section class="web-state-lab" data-request-lab data-request-stage="0">
            <header class="web-state-heading has-context">
                <div><h3>주소에서 페이지가 나타날 때까지 실행하기 <small>Web Request States</small></h3><p>한 번 누를 때마다 URL 읽기, DNS 조회, 요청, 응답, 화면 표시가 한 단계씩 실제로 바뀝니다.</p></div>
                ${compactContextImage(asset, "h02-browser-dns-server-journey-illustration-v1", "학생이 브라우저 주소창을 사용하자 요청이 DNS 장치를 거쳐 서버로 가고, 서버의 페이지 조각들이 브라우저 화면으로 돌아오는 흐름", "URL→DNS→서버→페이지", "URL → DNS → Server → Page")}
            </header>
            <div class="web-address-workbench">
                <label for="webRequestAddress">브라우저 주소창 <small>Address Bar · URL (Uniform Resource Locator)</small></label>
                <div class="web-address-input-row"><i class="address-lock-icon" aria-hidden="true"></i><input id="webRequestAddress" data-request-address value="https://animals.example/otter" autocomplete="off" spellcheck="false"></div>
                <div class="url-part-readout" aria-label="URL에서 읽은 세 부분">
                    <span><small>통신 방법</small><code data-url-part="protocol">읽기 전</code></span>
                    <span><small>도메인 이름</small><code data-url-part="domain">읽기 전</code></span>
                    <span><small>페이지 경로</small><code data-url-part="path">읽기 전</code></span>
                </div>
            </div>
            <div class="web-request-workspace">
                <section class="request-system-column" aria-label="DNS와 웹 서버의 상태">
                    <article class="dns-lookup-console" data-request-unit="dns">
                        <header><strong>DNS 이름 조회 <small>Domain Name System</small></strong><span data-dns-state>조회 전</span></header>
                        <dl><div><dt>묻는 이름</dt><dd><code data-dns-query>—</code></dd></div><div><dt>찾은 IP 주소<small>Internet Protocol Address</small></dt><dd><code data-dns-answer>—</code></dd></div></dl>
                    </article>
                    <div class="request-wire" data-request-wire><span>브라우저의 요청</span><i>↓</i></div>
                    <article class="web-server-console" data-request-unit="server">
                        <header><strong>웹 서버 <small>Web Server</small></strong><span data-server-state>요청 대기</span></header>
                        <div class="http-request-record"><b>받은 요청</b><code data-http-request>아직 요청 없음</code></div>
                        <div class="server-file-result"><b>찾은 자료</b><span data-server-file>—</span></div>
                    </article>
                </section>
                <section class="request-browser-window" data-request-unit="browser" aria-label="브라우저가 받은 응답과 표시 결과">
                    <header><span>브라우저 <small>Browser</small></span><b>— □ ×</b></header>
                    <div class="http-response-inbox">
                        <strong>서버 응답 <small>Response</small></strong>
                        <code data-http-response>아직 응답 없음</code>
                    </div>
                    <main data-request-screen>
                        <span class="browser-empty-page">페이지 표시 전</span>
                        <article class="browser-finished-page" data-finished-page hidden><small>animals.example</small><h4>수달은 어디에서 살까?</h4><p>수달은 강, 호수, 바닷가처럼 물과 가까운 곳에서 삽니다.</p></article>
                    </main>
                </section>
            </div>
            <div class="web-state-controls">
                <button type="button" class="web-request-action" data-request-action>주소 읽기 <small>Read the Address</small></button>
                <button type="button" data-request-reset>처음부터 <small>Reset</small></button>
            </div>
            <p class="lab-readout" data-request-status aria-live="polite">주소창의 URL을 읽기 전입니다. URL은 서버의 숫자 주소나 페이지 내용 그 자체가 아닙니다.</p>
        </section>
    `);

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

    renderers.i01 = (spec, asset) => figure(spec, "visual-account-lab", `
        ${contextImage(asset, "i01-account-auth-permission-illustration-v1", "학생이 자기 계정을 고르고 비밀 정보와 등록 기기로 두 번 확인한 뒤 학생에게 허용된 과제와 파일에 들어가는 장면", 384)}
        <section class="account-lab" data-account-lab data-account-stage="1" data-account-access="idle">
            <div class="school-service">
                <aside aria-label="연습용 학교 서비스 메뉴"><b>배움 교실</b><span>과제</span><span>내 파일</span><span>학급 관리</span></aside>
                <main>
                    <section class="sign-in-panel account-stage-one">
                        <h3>1. 연습용 계정으로 로그인 <small>Sign In</small></h3>
                        <div class="practice-account-card" aria-label="연습용 계정 카드">
                            <strong>실습 계정 카드</strong>
                            <span>계정 이름 <code>student01</code></span>
                            <span>연습용 비밀번호 <code>cedar27</code></span>
                        </div>
                        <label>계정 이름 <small>Username</small><input data-account-name autocomplete="off" spellcheck="false" placeholder="계정 카드에서 확인"></label>
                        <label>연습용 비밀번호 <small>Practice Password</small><input data-account-secret type="password" autocomplete="off" placeholder="연습용 비밀번호 입력"></label>
                    </section>
                    <section class="sign-in-panel account-stage-two">
                        <h3>2. 등록 기기로 한 번 더 확인 <small>Two-Factor Authentication</small></h3>
                        <div class="registered-device-code"><span>등록된 태블릿에 도착한 번호</span><strong>482 169</strong><small>이 번호는 이 실습 안에서만 사용합니다.</small></div>
                        <label>여섯 자리 인증번호 <small>Verification Code</small><input data-account-code inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="숫자 6자리"></label>
                    </section>
                    <section class="permission-panel account-stage-three">
                        <h3>3. 학생 계정의 권한 확인 <small>Authorization</small></h3>
                        <p>로그인이 끝났다고 모든 기능을 쓸 수 있는 것은 아닙니다. 두 기능을 직접 요청해 보세요.</p>
                        <div class="permission-attempts">
                            <button type="button" data-permission-attempt="assignment">내 과제 열기 <small>Open My Assignment</small></button>
                            <button type="button" data-permission-attempt="grades">다른 학생 점수 바꾸기 <small>Edit Another Student's Grade</small></button>
                        </div>
                        <div class="permission-result" data-permission-result role="status" aria-live="polite"><b>요청 전</b><span>서버가 학생 계정에 정해진 권한을 아직 확인하지 않았습니다.</span></div>
                        <section class="account-profile-demo" aria-label="계정과 프로필 비교">
                            <div>
                                <h4>계정과 프로필은 역할이 다르다 <small>Account and Profile</small></h4>
                                <p><b>계정 ID <small>Account ID</small></b><strong>student01</strong><span>로그인과 자료 소유자를 구별하는 값</span></p>
                                <p><b>표시 이름 <small>Display Name</small></b><strong data-profile-name>민준</strong><span>다른 사람에게 보이는 프로필 정보</span></p>
                            </div>
                            <button type="button" data-profile-change>표시 이름 바꾸기 <small>Change Display Name</small></button>
                            <p data-profile-status aria-live="polite">표시 이름을 바꾸어도 계정 ID와 로그인 권한은 그대로입니다.</p>
                        </section>
                    </section>
                </main>
            </div>
            <ol class="account-state-strip" aria-label="계정 접근 과정">
                <li data-account-step="1"><b>1</b><span>식별·비밀번호<small>Identity & Password</small></span></li>
                <li data-account-step="2"><b>2</b><span>등록 기기 확인<small>Second Factor</small></span></li>
                <li data-account-step="3"><b>3</b><span>기능별 권한 확인<small>Authorization</small></span></li>
            </ol>
            <div class="account-controller">
                <button type="button" data-account-prev disabled>이전 <small>Previous</small></button>
                <p data-account-status role="status" aria-live="polite"><b>1. 식별·인증</b>　계정 카드와 같은 두 정보를 직접 입력하세요.</p>
                <button type="button" data-account-next>확인하고 다음 <small>Check and Continue</small></button>
            </div>
        </section>
    `);

    renderers.i02 = (spec, asset) => figure(spec, "visual-evidence-lab", `
        <section class="evidence-lab" data-evidence-lab>
            <header class="evidence-lab-heading">
                <div><h3>메시지 원문에서 위험 근거 세 곳을 직접 찾는다 <small>Inspect the Message Itself</small></h3><p>이름이나 느낌이 아니라 실제 주소, 요구하는 정보, 재촉하는 표현을 원문에서 눌러 검사 기록에 담으세요.</p></div>
                ${compactContextImage(asset, "i02-suspicious-message-evidence-illustration-v1", "학생이 의심스러운 메시지의 주소와 정보 요구를 확대해 확인하는 장면", "주소와 요구 정보 대조", "Compare the Address and Request")}
            </header>
            <div class="message-app">
                <header><span>받은 메시지</span><button type="button" data-evidence-choice="time" data-evidence-correct="false" aria-pressed="false">오늘 10:18 <small>Received Time</small></button></header>
                <div class="official-address-card"><span>학교가 알려 준 공식 주소</span><code>https://portal.school.kr</code><small>Official School Portal</small></div>
                <div class="sender-row">
                    <i>?</i><button type="button" data-evidence-choice="name" data-evidence-correct="false" aria-pressed="false"><strong>학교 포털 지원팀</strong><span>notice@school-help.example</span><small>Visible Sender Name</small></button>
                </div>
                <div class="message-body">
                    <button type="button" class="message-urgency" data-evidence-choice="urgency" data-evidence-correct="true" aria-pressed="false">10분 안에 계정을 확인하세요 <small>Urgency</small></button>
                    <button type="button" class="message-secret-request" data-evidence-choice="secret" data-evidence-correct="true" aria-pressed="false">계정을 계속 쓰려면 비밀번호와 등록 기기에 온 인증번호를 입력하세요. <small>Password and Verification Code Request</small></button>
                    <button type="button" class="suspicious-cta" data-evidence-choice="link" data-evidence-correct="true" aria-pressed="false">https://school.kr.login-help.example/login <small>Link Address</small></button>
                </div>
            </div>
            <aside class="evidence-notebook">
                <h3>주소 확대와 검사 기록 <small>Address Magnifier and Evidence Record</small></h3>
                <div class="address-magnifier" aria-label="공식 주소와 의심 주소의 실제 소유 부분 비교">
                    <div><span>공식 주소 <small>Official</small></span><code><i>portal.</i><b data-address-segment="owner">school.kr</b></code></div>
                    <div><span>메시지 링크 <small>Message Link</small></span><code><i>school.kr.</i><b data-address-segment="owner">login-help.example</b><em>/login</em></code></div>
                    <p>앞쪽의 <code>school.kr</code>이 아니라 주소 끝의 <b>login-help.example</b>이 실제 소유 부분입니다.</p>
                </div>
                <ol class="evidence-records" aria-label="메시지에서 선택한 세 근거">
                    <li data-evidence-record="0"><b>1</b><span>선택 안 함</span></li>
                    <li data-evidence-record="1"><b>2</b><span>선택 안 함</span></li>
                    <li data-evidence-record="2"><b>3</b><span>선택 안 함</span></li>
                </ol>
                <div class="evidence-actions"><button type="button" data-evidence-check disabled>근거 확인 <small>Check Evidence</small></button><button type="button" data-evidence-reset>다시 고르기 <small>Choose Again</small></button></div>
                <p data-evidence-status role="status" aria-live="polite">메시지 안에서 근거 세 곳을 누르세요. 세 곳을 모두 고른 뒤에만 전체 판단을 확인할 수 있습니다.</p>
            </aside>
            <details class="citizenship-extension" data-citizenship-details>
                <summary>개인정보·저작권·디지털 발자국·기기 건강 <small>Privacy, Copyright, Digital Footprint, and Device Health</small></summary>
                <div class="citizenship-check" data-citizenship-check>
                <div class="citizenship-tabs" role="group" aria-label="직접 확인할 디지털 생활 원리">
                    <button type="button" data-citizenship-choice="privacy" aria-pressed="true">개인정보 <small>Privacy</small></button>
                    <button type="button" data-citizenship-choice="copyright" aria-pressed="false">저작권·라이선스 <small>Copyright & License</small></button>
                    <button type="button" data-citizenship-choice="footprint" aria-pressed="false">디지털 발자국 <small>Digital Footprint</small></button>
                    <button type="button" data-citizenship-choice="wellbeing" aria-pressed="false">기기 건강 <small>Digital Well-being</small></button>
                </div>
                <div class="citizenship-task-stage">
                    <section data-citizenship-panel="privacy">
                        <div class="privacy-post-card"><strong>사진 게시물에 포함된 정보</strong><span>이름: 민준</span><span>학교 운동장 사진</span><span>촬영 위치</span></div>
                        <div class="citizenship-action-row" role="group" aria-label="게시물 공개 범위">
                            <button type="button" data-privacy-audience="public" aria-pressed="false">누구나 <small>Public</small></button>
                            <button type="button" data-privacy-audience="class" aria-pressed="true">우리 학급 <small>Class</small></button>
                            <button type="button" data-privacy-audience="private" aria-pressed="false">나만 보기 <small>Private</small></button>
                        </div>
                        <div class="citizenship-result" data-privacy-result role="status" aria-live="polite"><b>우리 학급 24명</b><span>이름·사진·촬영 위치를 볼 수 있습니다.</span></div>
                    </section>
                    <section data-citizenship-panel="copyright" hidden>
                        <div class="license-card"><strong>수달 사진 <small>Otter Photo</small></strong><code>CC BY-NC 4.0</code><span>만든 사람 표시 필요 · 상업적 이용 금지 <small>Attribution Required · NonCommercial</small></span></div>
                        <div class="copyright-controls">
                            <label><input type="checkbox" data-license-credit> 만든 사람과 출처 표시 <small>Credit Creator and Source</small></label>
                            <label>사용 목적 <small>Purpose of Use</small><select data-license-purpose><option value="class">학교 발표 자료 · School Presentation</option><option value="sale">판매할 포스터 · Poster for Sale</option></select></label>
                        </div>
                        <div class="citizenship-result" data-license-result role="status" aria-live="polite"><b>조건 확인 전</b><span>사용 계획과 라이선스 조건을 서로 비교하세요.</span></div>
                    </section>
                    <section data-citizenship-panel="footprint" hidden>
                        <div class="footprint-copies">
                            <span data-footprint-copy="original">내 게시물 <b>없음</b></span>
                            <span data-footprint-copy="friend">친구의 복사본 <b>없음</b></span>
                            <span data-footprint-copy="log">서비스 기록 <b>없음</b></span>
                        </div>
                        <div class="citizenship-action-row"><button type="button" data-footprint-action="post">게시 <small>Post</small></button><button type="button" data-footprint-action="copy" disabled>친구가 복사 <small>Friend Copies</small></button><button type="button" data-footprint-action="delete" disabled>내 게시물 삭제 <small>Delete My Post</small></button><button type="button" data-footprint-action="reset">초기화 <small>Reset</small></button></div>
                        <div class="citizenship-result" data-footprint-result role="status" aria-live="polite"><b>게시 전</b><span>게시·복사·삭제를 차례로 눌러 남는 기록을 관찰하세요.</span></div>
                    </section>
                    <section data-citizenship-panel="wellbeing" hidden>
                        <label class="distance-control">눈과 화면 사이 거리 <small>Eye–Screen Distance</small><input type="range" min="15" max="70" value="35" data-screen-distance><output data-distance-output>35 cm</output></label>
                        <div class="wellbeing-cycle"><button type="button" data-rest-action="study">25분 학습 기록 <small>Study 25 Minutes</small></button><button type="button" data-rest-action="rest">5분 눈 휴식 기록 <small>Rest Eyes 5 Minutes</small></button><span>학습 <b data-study-count>0</b>회 · 휴식 <b data-rest-count>0</b>회</span></div>
                        <div class="citizenship-result" data-wellbeing-result role="status" aria-live="polite"><b>35 cm</b><span>화면이 매우 가깝지는 않지만 자세와 글자 크기도 함께 살펴야 합니다.</span></div>
                    </section>
                </div>
                <p data-citizenship-status role="status" aria-live="polite"><b>개인정보 Privacy:</b> 공개 범위를 바꾸면 같은 게시물을 볼 수 있는 사람이 달라집니다.</p>
            </div>
        </section>
    `);

    renderers.j03 = (spec, asset) => figure(spec, "visual-debug-lab", `
        <section class="debug-lab" data-debug-lab data-debug-stage="start">
            <header class="debug-lab-heading">
                ${compactContextImage(asset, "j03-photo-path-debug-illustration-v2", "같은 고양이 사진으로 오류를 다시 만들고, 잘못 적힌 폴더 이름을 고친 뒤 사진이 열리는지 다시 시험하는 과정", "오류 재현 → 경로 수정 → 재시험", "Reproduce → Fix Path → Retest")}
                <div>
                    <span>디버깅 절차 <small>Debugging Workflow</small></span>
                    <h3>같은 입력으로 오류를 다시 만든 뒤 원인 하나만 고친다</h3>
                    <p><code>cat.webp</code>는 그대로 두고 프로그램의 기본 폴더만 비교합니다. 고친 뒤에는 같은 사진, 다른 사진, 없는 사진을 차례로 시험합니다.</p>
                </div>
            </header>
            <div class="mini-photo-app">
                <header><b>파일 경로 검사기 <small>File Path Tester</small></b><button type="button" data-debug-run>실행 <small>Run</small></button></header>
                <main>
                    <section class="debug-file-and-preview" aria-label="실제 저장 폴더와 프로그램 출력">
                        <div class="debug-file-browser">
                            <header><b>실제 저장 폴더 <small>Actual Storage Folder</small></b><code>/pictures/</code><span>2개 파일</span></header>
                            <div class="debug-file-list">
                                <div><img src="${asset("j03-cat-file.webp")}" width="512" height="512" alt="실제 저장 폴더에 있는 주황색 고양이 사진"><span><b>cat.webp</b><small>Image File</small></span></div>
                                <div><img src="${asset("j03-dog-file.webp")}" width="512" height="512" alt="실제 저장 폴더에 있는 갈색 강아지 사진"><span><b>dog.webp</b><small>Image File</small></span></div>
                            </div>
                        </div>
                        <div class="photo-output" data-debug-output data-preview-state="waiting"><div class="debug-output-message"><i aria-hidden="true">▶</i><b>실행 전</b><span>실행하면 프로그램이 찾은 사진이나 오류가 이곳에 나타납니다.</span></div></div>
                    </section>
                    <div class="tiny-program">
                        <p class="debug-fixed-input"><b>선택한 사진 <small>Selected Input</small></b><code data-debug-selected-name>cat.webp</code></p>
                        <label>프로그램에 적힌 기본 폴더 <small>Base Folder in the Program</small><input data-debug-code value="/picture/" spellcheck="false" aria-describedby="debug-real-path"></label>
                        <p class="actual-path-note" id="debug-real-path">파일 앱에서 확인한 실제 폴더 <small>Actual Folder in the File App</small> <code>/pictures/</code></p>
                        <span>사진 입력은 <code>cat.webp</code>로 그대로 두고, 프로그램이 앞에 붙이는 폴더 이름의 한 글자를 고치세요.</span>
                    </div>
                </main>
                <footer data-debug-log aria-live="polite">아직 실행하지 않았습니다.</footer>
            </div>
            <aside class="debug-regression" data-debug-regression aria-label="수정 뒤 다른 입력 시험">
                <h4>나머지 입력 두 개 시험하기 <small>Regression Test</small></h4>
                <p>고양이 사진 재시험이 통과하면 다른 파일과 없는 파일이 활성화됩니다. 수정이 한 사례에만 맞춘 것은 아닌지 확인하세요.</p>
                <div class="debug-case-buttons">
                    <button type="button" data-debug-case="cat" data-debug-src="${asset("j03-cat-file.webp")}" data-debug-alt="주황색 고양이 사진" disabled><img src="${asset("j03-cat-file.webp")}" width="512" height="512" alt=""><span><b>cat.webp</b><small>Same-input Retest</small></span></button>
                    <button type="button" data-debug-case="dog" data-debug-src="${asset("j03-dog-file.webp")}" data-debug-alt="갈색 강아지 사진" disabled><img src="${asset("j03-dog-file.webp")}" width="512" height="512" alt=""><span><b>dog.webp</b><small>Existing File</small></span></button>
                    <button type="button" data-debug-case="missing" disabled><i class="debug-missing-thumbnail" aria-hidden="true"><svg viewBox="0 0 56 64"><path d="M8 3h27l13 13v45H8Z"/><path d="M35 3v14h13"/><path d="m18 32 20 20m0-20L18 52"/></svg></i><span><b>bird.webp</b><small>Missing File</small></span></button>
                </div>
                <ul class="debug-case-results" aria-live="polite">
                    <li data-debug-case-result="cat">cat.webp: 같은 입력 재시험 전</li>
                    <li data-debug-case-result="dog">dog.webp: 아직 시험하지 않음</li>
                    <li data-debug-case-result="missing">bird.webp: 아직 시험하지 않음</li>
                </ul>
            </aside>
            <ol class="debug-data-trace" aria-label="입력 처리 출력 저장 흐름">
                <li data-debug-flow="input"><b>입력 <small>Input</small></b><span>선택한 사진 cat.webp</span></li>
                <li data-debug-flow="storage"><b>저장 <small>Storage</small></b><span>파일 앱의 실제 경로</span></li>
                <li data-debug-flow="processing"><b>처리 <small>Processing</small></b><span>두 경로가 같은지 검사</span></li>
                <li data-debug-flow="output"><b>출력 <small>Output</small></b><span>사진 또는 오류 안내</span></li>
            </ol>
            <ol class="debug-observation">
                <li data-debug-step="reproduce"><b>1</b><span>오류 다시 만들기 <small>Reproduce</small></span></li>
                <li data-debug-step="observe"><b>2</b><span>두 경로 비교하기 <small>Observe</small></span></li>
                <li data-debug-step="fix"><b>3</b><span>원인 하나 고치기 <small>Fix</small></span></li>
                <li data-debug-step="retest"><b>4</b><span>같은 입력 재시험 <small>Retest</small></span></li>
                <li data-debug-step="regression"><b>5</b><span>다른 입력 시험 <small>Regression Test</small></span></li>
            </ol>
        </section>
    `);

    renderers.d01 = (spec) => figure(spec, "visual-pointer-lab", `
        <section class="pointer-operating-lab" data-pointer-lab data-pointer-state="point" data-file-location="desktop">
            <header class="pointer-lab-heading">
                <div><h3>한 화면에서 가리키기·클릭·글자 입력·드래그를 구분한다 <small>Point, Click, Type, and Drag in One Screen</small></h3><p>아래는 그림이 아니라 실제로 반응하는 작은 바탕화면입니다. 파일을 선택하고, 문장에 글자를 넣고, 파일을 폴더로 끌어 보세요.</p></div>
                <button type="button" data-pointer-reset>처음부터 <small>Reset</small></button>
            </header>
            <div class="pointer-demo-shell">
                <div class="pointer-app-bar"><strong>연습용 바탕화면 <small>Practice Desktop</small></strong><span data-pointer-clock>10:24</span></div>
                <div class="pointer-desktop" data-pointer-surface>
                    <div class="screen-pointer" data-screen-pointer aria-hidden="true"><svg viewBox="0 0 42 56"><path d="M4 3 35 31 21 34 29 50 20 54 12 38 4 48Z"/></svg><span>포인터 <small>Pointer</small></span></div>
                    <button type="button" class="pointer-file" data-pointer-file aria-pressed="false">
                        <svg viewBox="0 0 90 100" aria-hidden="true"><path d="M15 5h39l21 21v69H15Z"/><path d="M54 5v23h21"/><rect x="27" y="45" width="36" height="5"/><rect x="27" y="58" width="29" height="5"/></svg>
                        <span><b>관찰.txt</b><small>Text File</small></span>
                    </button>
                    <button type="button" class="pointer-folder" data-pointer-folder aria-label="과제 폴더">
                        <svg viewBox="0 0 120 90" aria-hidden="true"><path d="M6 20h43l10 12h55v51H6Z"/><path d="M6 32h108"/></svg>
                        <span><b>과제 폴더</b><small>Assignment Folder · <em data-folder-count>0개</em></small></span>
                        <i data-folder-file hidden>관찰.txt</i>
                    </button>
                    <label class="pointer-text-editor">
                        <span>메모 <small>Text Editor</small></span>
                        <input type="text" value="오늘 관찰한 것은 " data-pointer-input aria-label="텍스트 커서를 확인할 메모 입력 칸">
                        <em>입력 칸을 누르면 깜박이는 선이 다음 글자 위치를 표시합니다.</em>
                    </label>
                    <div class="pointer-drop-label" aria-hidden="true">파일을 이 폴더에 놓기 <small>Drop the File Here</small></div>
                </div>
                <footer data-pointer-status role="status" aria-live="polite">화면 위에서 마우스·트랙패드를 움직이면 포인터가 위치를 가리킵니다. 아직 파일은 선택되지 않았습니다.</footer>
            </div>
            <dl class="pointer-state-ledger" aria-label="현재 입력과 화면 상태">
                <div><dt>화면 표시 <small>Screen Indicator</small></dt><dd data-pointer-kind>화살표 포인터</dd></div>
                <div><dt>누름 상태 <small>Press State</small></dt><dd data-pointer-press>누르지 않음</dd></div>
                <div><dt>입력 초점 <small>Input Focus</small></dt><dd data-pointer-focus>없음</dd></div>
                <div><dt>파일 위치 <small>File Location</small></dt><dd data-pointer-location>바탕화면</dd></div>
            </dl>
            <ol class="pointer-action-trace" aria-label="파일을 드래그 앤 드롭하는 실제 동작">
                <li data-pointer-step="point"><b>1</b><span>파일을 가리킨다<small>Point</small></span></li>
                <li data-pointer-step="press"><b>2</b><span>파일을 누른 채 잡는다<small>Press and Hold</small></span></li>
                <li data-pointer-step="drag"><b>3</b><span>누른 채 폴더까지 움직인다<small>Drag</small></span></li>
                <li data-pointer-step="drop"><b>4</b><span>폴더 위에서 놓는다<small>Drop</small></span></li>
            </ol>
        </section>
    `);

    renderers.d02 = (spec, asset) => figure(spec, "visual-gesture-lab", `
        ${contextImage(asset, "d02-touch-gesture-signals-illustration-v1", "태블릿 화면에서 한 손가락과 두 손가락의 위치, 이동, 누른 시간이 신호로 측정되는 장면")}
        <section class="gesture-lab" data-gesture-lab data-gesture="tap">
            <div class="gesture-device">
                <div class="gesture-surface" data-gesture-surface role="button" tabindex="0" aria-label="선택한 터치 동작을 직접 해 보는 화면">
                    <div class="photo-card"><span></span><b>사진 1</b><em>선택됨</em></div>
                    <div class="photo-card photo-card-next"><span></span><b>사진 2</b></div>
                    <div class="gesture-context-menu" data-gesture-menu hidden><button type="button" data-gesture-menu-action="share">공유 <small>Share</small></button><button type="button" data-gesture-menu-action="rename">이름 바꾸기 <small>Rename</small></button><button type="button" data-gesture-menu-action="delete">삭제 <small>Delete</small></button><output data-gesture-action-result>명령을 선택하세요.</output></div>
                    <i class="finger finger-one"></i><i class="finger finger-two"></i><i class="gesture-trail"></i>
                    <div class="gesture-measure"><span>손가락 <b data-finger-count>1</b>개</span><span>누른 시간 <b data-press-time>0.1</b>초</span><span>이동 거리 <b data-move-distance>0</b></span></div>
                </div>
                <div class="home-indicator"></div>
            </div>
            <p class="gesture-prompt">동작 이름을 고른 뒤, 사진 화면에서 직접 탭·길게 누르기·스와이프·핀치를 해 보세요.</p>
            <div class="gesture-selector" role="group" aria-label="살펴볼 터치 동작">
                <button type="button" data-gesture-choice="tap" aria-pressed="true">탭 <small>Tap</small></button>
                <button type="button" data-gesture-choice="long">길게 누르기 <small>Long Press</small></button>
                <button type="button" data-gesture-choice="swipe">스와이프 <small>Swipe</small></button>
                <button type="button" data-gesture-choice="pinch">핀치 <small>Pinch</small></button>
            </div>
            <p class="lab-readout" data-gesture-status><b>탭</b>은 한 손가락으로 짧게 눌렀다 놓는 동작입니다. 앱은 위치와 누른 시간을 함께 봅니다.</p>
        </section>
    `);

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

    renderers.f01 = (spec) => figure(spec, "visual-pixel-lab", `
        <section class="display-lab" data-pixel-lab data-compare-mode="same-size" data-ui-scale="100">
            <div class="display-mode-switch" role="group" aria-label="화면 비교 기준">
                <button type="button" data-display-mode="same-size" aria-pressed="true">같은 화면 크기 <small>Same Screen Size</small></button>
                <button type="button" data-display-mode="same-resolution" aria-pressed="false">같은 해상도 <small>Same Resolution</small></button>
            </div>
            <div class="display-screen-pair">
                <figure class="display-model" data-screen-model="a" data-frame="same">
                    <div class="model-screen"><div class="model-pixel-grid" data-pixel-grid="a" aria-label="픽셀 모형으로 그린 같은 집"></div></div>
                    <figcaption><b data-screen-label="a">12 × 8 픽셀 모형</b><span data-screen-note="a">픽셀 칸이 큼</span></figcaption>
                </figure>
                <figure class="display-model" data-screen-model="b" data-frame="same">
                    <div class="model-screen"><div class="model-pixel-grid" data-pixel-grid="b" aria-label="픽셀 모형으로 그린 같은 집"></div></div>
                    <figcaption><b data-screen-label="b">24 × 16 픽셀 모형</b><span data-screen-note="b">픽셀 칸이 더 촘촘함</span></figcaption>
                </figure>
            </div>
            <p class="lab-readout" data-display-status aria-live="polite"></p>
            <section class="ui-scaling-demo">
                <header><b>표시 배율 <small>Display Scaling</small></b><output data-scale-output>100%</output></header>
                <div class="scale-viewport">
                    <div class="scale-ui">
                        <strong>과제 파일</strong><button type="button" data-scale-open aria-expanded="false">열기 <small>Open</small></button>
                        <span>글자와 단추는 더 많은 픽셀을 차지하지만 화면 해상도는 그대로입니다.</span>
                        <div class="scale-file-preview" data-scale-file-preview hidden><b>과제.pdf</b><span>파일 내용 미리보기 <small>File Preview</small></span></div>
                        <i></i><i></i><i></i><i></i>
                    </div>
                </div>
                <div class="scale-choice" role="group" aria-label="표시 배율">
                    <button type="button" data-ui-scale-choice="100" aria-pressed="true">100%</button>
                    <button type="button" data-ui-scale-choice="150" aria-pressed="false">150%</button>
                    <button type="button" data-ui-scale-choice="200" aria-pressed="false">200%</button>
                </div>
            </section>
            <p class="model-note"><b>학습 모형:</b> 12×8과 24×16은 차이를 크게 보여 주기 위한 격자입니다. 실제 화면은 훨씬 많은 픽셀을 사용합니다.</p>
        </section>
    `);

    renderers.f02 = (spec) => figure(spec, "visual-color-image-lab", `
        <section class="image-workbench" data-color-lab data-image-panel="rgb" style="--red:210;--green:126;--blue:48">
            <div class="image-concept-tabs" role="tablist" aria-label="이미지 개념 실험">
                <button type="button" role="tab" data-image-panel-choice="rgb" aria-selected="true" tabindex="0">1. RGB 빛 <small>RGB Light</small></button>
                <button type="button" role="tab" data-image-panel-choice="structure" aria-selected="false" tabindex="-1">2. 래스터·벡터 <small>Raster and Vector</small></button>
                <button type="button" role="tab" data-image-panel-choice="format" aria-selected="false" tabindex="-1">3. JPG·PNG·WebP <small>File Formats</small></button>
            </div>
            <section class="image-panel rgb-panel" role="tabpanel" data-image-panel-content="rgb">
                <div class="light-mixer">
                    <div class="light-beam red-beam"></div><div class="light-beam green-beam"></div><div class="light-beam blue-beam"></div>
                    <div class="mixed-light" data-mixed-light></div>
                    <output data-rgb-output>R 210 · G 126 · B 48</output>
                </div>
                <div class="color-sliders">
                    <label class="red-control">빨강 빛 <small>Red</small><input type="range" min="0" max="255" value="210" data-color-channel="red"></label>
                    <label class="green-control">초록 빛 <small>Green</small><input type="range" min="0" max="255" value="126" data-color-channel="green"></label>
                    <label class="blue-control">파랑 빛 <small>Blue</small><input type="range" min="0" max="255" value="48" data-color-channel="blue"></label>
                    <p>RGB는 파일 형식이 아니라 화면 픽셀에서 빨강·초록·파랑 <b>빛의 밝기</b>를 정하는 값입니다.</p>
                </div>
            </section>
            <section class="image-panel structure-panel" role="tabpanel" data-image-panel-content="structure" hidden>
                <div class="zoom-control"><label>확대 <small>Zoom</small><input type="range" min="1" max="8" step="1" value="1" data-image-zoom></label><output data-image-zoom-output>1×</output></div>
                <div class="zoom-compare">
                    <figure class="zoom-window raster-window">
                        <div class="zoom-stage"><canvas width="32" height="24" data-raster-canvas aria-label="32 곱하기 24 픽셀로 저장한 꽃 그림"></canvas></div>
                        <figcaption><b>래스터 <small>Raster</small></b><span>저장된 픽셀 칸을 그대로 크게 펼칩니다.</span></figcaption>
                    </figure>
                    <figure class="zoom-window vector-window">
                        <div class="zoom-stage"><svg data-vector-image viewBox="0 0 160 120" width="160" height="120" aria-label="선과 도형 규칙으로 그린 같은 꽃"><rect width="160" height="120" fill="#d8ece9"/><g fill="#d57934" stroke="#843f21" stroke-width="2"><ellipse cx="80" cy="35" rx="18" ry="28"/><ellipse cx="80" cy="85" rx="18" ry="28"/><ellipse cx="52" cy="60" rx="28" ry="18"/><ellipse cx="108" cy="60" rx="28" ry="18"/></g><circle cx="80" cy="60" r="16" fill="#f2c54f" stroke="#775116" stroke-width="2"/></svg></div>
                        <figcaption><b>벡터 <small>Vector</small></b><span>선과 도형 규칙을 현재 크기에 맞게 다시 계산합니다.</span></figcaption>
                    </figure>
                </div>
            </section>
            <section class="image-panel format-panel" role="tabpanel" data-image-panel-content="format" hidden>
                <div class="format-controls">
                    <div class="format-source-choice" role="group" aria-label="저장할 원본"><button type="button" data-format-source="photo" aria-pressed="true">사진 <small>Photo</small></button><button type="button" data-format-source="sticker" aria-pressed="false">투명 스티커 <small>Transparent Sticker</small></button></div>
                    <div class="format-choice" role="group" aria-label="파일 형식"><button type="button" data-format-choice="jpg" aria-pressed="true">JPG</button><button type="button" data-format-choice="png" aria-pressed="false">PNG</button><button type="button" data-format-choice="webp" aria-pressed="false">WebP</button></div>
                </div>
                <div class="format-result">
                    <div class="checkerboard"><img data-format-preview alt="선택한 형식으로 실제 저장한 결과"></div>
                    <dl>
                        <div><dt>실제 결과 크기</dt><dd data-format-size>계산 중</dd></div>
                        <div><dt>투명 배경</dt><dd data-format-alpha>지원하지 않음</dd></div>
                        <div><dt>저장 방식</dt><dd data-format-compression>손실 압축</dd></div>
                    </dl>
                </div>
                <canvas width="320" height="240" data-format-source-canvas hidden></canvas>
                <p class="model-note">표시된 바이트 수는 지금 이 원본을 이 설정으로 실제 저장한 결과입니다. 다른 사진이나 품질 설정에서는 파일 크기의 순서가 달라질 수 있습니다.</p>
            </section>
            <p class="lab-readout" data-image-status aria-live="polite"><b>RGB:</b> 세 빛의 밝기 값을 바꿔 화면 픽셀이 내는 색을 관찰하세요.</p>
        </section>
    `);

    renderers.f03 = (spec) => {
        const videoFrames = [
            { x: 12, y: 0, description: "공이 화면 왼쪽에서 움직이기 시작합니다." },
            { x: 26, y: -24, description: "다음 그림에서는 공이 오른쪽 위로 이동했습니다." },
            { x: 42, y: -38, description: "그림을 시간 순서대로 빠르게 보면 움직임으로 느껴집니다." },
            { x: 58, y: -30, description: "각 프레임은 서로 조금씩 다른 한 장의 그림입니다." },
            { x: 74, y: -10, description: "뒤의 프레임일수록 공이 화면 오른쪽에 있습니다." },
            { x: 86, y: 0, description: "마지막 그림까지 순서대로 이어져 하나의 영상이 됩니다." }
        ];
        const waveY = (ratio) => 105 - Math.sin(ratio * Math.PI * 4) * 43 - Math.sin(ratio * Math.PI * 10) * 11;
        const waveform = Array.from({ length: 145 }, (_, index) => {
            const ratio = index / 144;
            return `${(24 + ratio * 672).toFixed(1)},${waveY(ratio).toFixed(1)}`;
        }).join(" ");
        const sampleDots = (amount) => Array.from({ length: amount }, (_, index) => {
            const ratio = index / (amount - 1);
            return `<circle cx="${(24 + ratio * 672).toFixed(1)}" cy="${waveY(ratio).toFixed(1)}" r="${amount === 8 ? 7 : 5}"></circle>`;
        }).join("");
        return figure(spec, "visual-media-timeline-lab", `
            <section class="media-capture-lab" data-media-lab>
                <div class="media-concept-tabs" role="tablist" aria-label="소리와 영상, 화면 캡처 실험 선택">
                    <button type="button" role="tab" id="media-tab-video" aria-controls="media-panel-video" aria-selected="true" data-media-panel-choice="video">영상 프레임 <small>Video Frames</small></button>
                    <button type="button" role="tab" id="media-tab-audio" aria-controls="media-panel-audio" aria-selected="false" data-media-panel-choice="audio">소리 샘플링 <small>Audio Sampling</small></button>
                    <button type="button" role="tab" id="media-tab-capture" aria-controls="media-panel-capture" aria-selected="false" data-media-panel-choice="capture">화면 캡처 <small>Screen Capture</small></button>
                </div>
                <section class="media-concept-panel media-video-panel" id="media-panel-video" role="tabpanel" aria-labelledby="media-tab-video" data-media-panel="video">
                    <header><b>영상은 시간 순서대로 이어진 여러 장의 그림입니다.</b><small>A video is a sequence of frames shown over time.</small></header>
                    <div class="media-frame-workbench">
                        <div class="media-video-preview" data-video-preview style="--frame-x:12%;--frame-y:0px">
                            <span class="media-scene-sun"></span><span class="media-scene-ground"></span><i class="media-moving-ball"></i>
                            <p data-video-status>${videoFrames[0].description}</p>
                        </div>
                        <div class="media-frame-tools">
                            <button type="button" class="media-play-button" data-video-play aria-pressed="false"><span data-video-play-label>순서대로 재생</span><small>Play in Order</small></button>
                            <div class="media-filmstrip" aria-label="시간 순서대로 놓인 영상 프레임">
                                ${videoFrames.map((item, index) => `<button type="button" data-media-video-frame="${index}" data-frame-x="${item.x}%" data-frame-y="${item.y}px" data-frame-description="${item.description}" aria-pressed="${index === 0}" aria-label="${item.description}"><i style="--thumb-x:${item.x}%;--thumb-bottom:${12 - item.y * .28}px"></i></button>`).join("")}
                            </div>
                            <p>필름스트립의 그림을 누르면 그 순간을 자세히 볼 수 있습니다.</p>
                        </div>
                    </div>
                </section>
                <section class="media-concept-panel media-audio-panel" id="media-panel-audio" role="tabpanel" aria-labelledby="media-tab-audio" data-media-panel="audio" hidden>
                    <header><b>이어지는 소리를 정한 순간마다 측정해 숫자로 기록합니다.</b><small>Sampling measures a continuous sound at chosen moments.</small></header>
                    <div class="audio-wave-observer">
                        <svg viewBox="0 0 720 210" role="img" aria-labelledby="audio-wave-title audio-wave-description">
                            <title id="audio-wave-title">연속 파형과 소리 측정점</title>
                            <desc id="audio-wave-description">같은 연속 파형 위에 여덟 개 또는 스물네 개의 측정점을 표시합니다.</desc>
                            <line class="audio-zero-line" x1="24" y1="105" x2="696" y2="105"></line>
                            <polyline class="audio-continuous-wave" points="${waveform}"></polyline>
                            <g class="audio-sample-points" data-audio-points="8">${sampleDots(8)}</g>
                            <g class="audio-sample-points" data-audio-points="24" hidden>${sampleDots(24)}</g>
                        </svg>
                        <span class="audio-axis-label audio-axis-time">시간 <small>Time →</small></span>
                        <span class="audio-axis-label audio-axis-level">소리의 떨림 <small>Sound level</small></span>
                    </div>
                    <div class="audio-sampling-controls" role="group" aria-label="같은 소리를 측정할 횟수">
                        <button type="button" data-audio-sample-choice="8" aria-pressed="true">같은 구간을 8번 측정 <small>8 samples</small></button>
                        <button type="button" data-audio-sample-choice="24" aria-pressed="false">같은 구간을 24번 측정 <small>24 samples</small></button>
                    </div>
                    <p class="media-observation" data-audio-observation aria-live="polite">파형은 계속 이어지지만, 디지털 기록에는 파란 점 여덟 곳에서 잰 값이 들어갑니다.</p>
                </section>
                <section class="media-concept-panel media-capture-panel" id="media-panel-capture" role="tabpanel" aria-labelledby="media-tab-capture" data-media-panel="capture" hidden>
                    <header><b>스크린샷은 한 순간을, 화면 녹화는 여러 순간의 순서를 남깁니다.</b><small>A screenshot freezes one moment; a recording keeps moments in order.</small></header>
                    <div class="media-capture-workbench">
                        <div class="media-live-column">
                            <div class="media-live-screen" data-capture-screen style="--capture-x:12%">
                                <span class="media-scene-sun"></span><span class="media-scene-ground"></span><i class="media-moving-ball"></i>
                                <strong class="media-recording-indicator" data-recording-indicator hidden>● 녹화 중 <small>Recording</small></strong>
                                <output data-capture-moment>공이 화면 왼쪽에 있습니다.</output>
                            </div>
                            <div class="media-capture-actions">
                                <button type="button" data-capture-next>장면 움직이기 <small>Move Scene</small></button>
                                <button type="button" data-screenshot>스크린샷 찍기 <small>Take Screenshot</small></button>
                                <button type="button" data-record-toggle><span data-record-label>녹화 시작</span><small>Start Recording</small></button>
                            </div>
                        </div>
                        <div class="media-capture-results">
                            <section class="screenshot-result">
                                <h3>스크린샷 <small>Screenshot</small></h3>
                                <p data-screenshot-empty>버튼을 누른 한 순간만 이곳에 고정됩니다.</p>
                                <div class="captured-still" data-screenshot-result hidden><i></i><span>한 장의 화면</span></div>
                            </section>
                            <section class="recording-result">
                                <h3>화면 녹화 <small>Screen Recording</small></h3>
                                <p data-recording-empty>녹화를 시작하면 서로 다른 순간이 시간 순서대로 쌓입니다.</p>
                                <div data-recording-result hidden>
                                    <div class="recording-filmstrip" data-recording-strip aria-label="녹화한 장면을 시간 순서대로 표시"></div>
                                    <button type="button" data-recording-play hidden><span data-recording-play-label>녹화 재생</span><small>Play Recording</small></button>
                                </div>
                            </section>
                        </div>
                    </div>
                    <p class="media-observation" data-capture-observation aria-live="polite">장면을 움직인 뒤 스크린샷과 화면 녹화를 각각 시험해 보세요.</p>
                </section>
            </section>
        `);
    };

    renderers.g01 = (spec) => figure(spec, "visual-sensor-sampling-lab", `
        <section class="sampling-lab" data-sampling-lab style="--sample-position:42%">
            <div class="sampling-scene">
                <div class="thermometer"><i></i><b>따뜻함</b></div>
                <svg viewBox="0 0 760 220" aria-label="이어지는 온도 변화와 측정점">
                    <path class="continuous-curve" d="M20 155 C120 145 135 65 235 78 S380 180 475 118 S620 38 740 72"/>
                    <g class="sample-guides">
                        <path d="M85 30V190"/><path d="M170 30V190"/><path d="M255 30V190"/><path d="M340 30V190"/><path d="M425 30V190"/><path d="M510 30V190"/><path d="M595 30V190"/><path d="M680 30V190"/>
                    </g>
                    <g class="sample-dots">
                        <circle cx="85" cy="131" r="7"/><circle cx="170" cy="72" r="7"/><circle cx="255" cy="92" r="7"/><circle cx="340" cy="156" r="7"/><circle cx="425" cy="145" r="7"/><circle cx="510" cy="92" r="7"/><circle cx="595" cy="55" r="7"/><circle cx="680" cy="63" r="7"/>
                    </g>
                </svg>
                <div class="quantized-readout"><span>센서가 잰 값</span><strong data-sample-value>23.4°C</strong><span>정해진 칸으로 기록</span><b data-quantized-value>23°C</b><code data-binary-value>00010111</code></div>
            </div>
            <label class="sampling-control">측정할 순간 움직이기<input type="range" min="0" max="7" value="3" data-sample-index></label>
            <p class="encoding-rule"><b>이 실험의 기록 규칙:</b> 온도를 1℃ 단위 정수로 반올림한 뒤, 그 숫자를 8칸 이진수로 적습니다.</p>
            <p class="lab-readout">현실의 온도는 이어져 바뀝니다. 센서는 정한 순간의 값을 재고, 기기는 정해 둔 기록 규칙에 따라 숫자로 바꿉니다.</p>
        </section>
    `);

    renderers.g02 = (spec) => figure(spec, "visual-bit-byte-lab", `
        <section class="bit-unit-lab" data-bit-lab>
            <section class="bit-pattern-panel" aria-labelledby="bit-pattern-title">
                <header class="bit-lab-heading">
                    <div>
                        <h3 id="bit-pattern-title">8개의 비트로 한 바이트 읽기</h3>
                        <small>Reading One Byte from 8 Bits</small>
                    </div>
                    <p>버튼을 눌러 0과 1을 바꾸세요. 왼쪽 자리는 128, 오른쪽 자리는 1의 값을 가집니다.</p>
                </header>
                <div class="bit-switch-grid" aria-label="8비트 패턴 만들기">
                    ${Array.from({ length: 8 }, (_, index) => {
                        const place = 2 ** (7 - index);
                        return `<button type="button" data-bit-index="${index}" data-bit-place="${place}" aria-pressed="false" aria-label="${place}의 자리, 현재 0">
                            <small>${place}의 자리</small><i aria-hidden="true"></i><b data-bit-digit>0</b>
                        </button>`;
                    }).join("")}
                </div>
                <div class="bit-readout-strip" aria-live="polite">
                    <div><span>8비트 패턴 <small>8-bit Pattern</small></span><code data-bit-pattern>0000 0000</code></div>
                    <div><span>십진값 <small>Decimal Value</small></span><strong data-byte-value>0</strong><em>0부터 255</em></div>
                    <div><span>1의 개수 <small>Number of 1s</small></span><strong data-bit-count>0</strong><em>켜진 비트 수</em></div>
                    <div><span>바이트 수 <small>Byte Count</small></span><strong>1 B</strong><em>8칸 전체</em></div>
                </div>
                <p class="bit-count-rule"><b>1의 개수와 바이트 수는 다릅니다.</b> <code>0000 0000</code>도 1은 0개이지만, 비트 자리가 8개이므로 크기는 1바이트입니다.</p>
            </section>

            <section class="unit-ladder-panel" aria-labelledby="unit-ladder-title">
                <header class="bit-lab-heading">
                    <div>
                        <h3 id="unit-ladder-title">바이트 단위 사다리</h3>
                        <small>Decimal Byte-unit Ladder</small>
                    </div>
                    <p>단위를 선택하고 데이터 양을 바꾸어 같은 크기가 서로 다른 숫자로 적히는 모습을 관찰하세요.</p>
                </header>
                <ol class="decimal-unit-ladder" aria-label="B부터 TB까지 1000배 단위 사다리">
                    ${[
                        ["B", "Byte"],
                        ["KB", "Kilobyte"],
                        ["MB", "Megabyte"],
                        ["GB", "Gigabyte"],
                        ["TB", "Terabyte"]
                    ].map(([unit, name], index) => `<li data-unit-rung="${index}">
                        <button type="button" data-unit-index="${index}" aria-pressed="${index === 2}">
                            <b>${unit}</b><small>${name}</small>
                        </button>
                    </li>`).join("")}
                </ol>
                <div class="unit-experiment">
                    <label class="unit-amount-control">
                        <span>선택한 단위의 양 <small>Amount</small></span>
                        <input type="range" min="1" max="10" value="3" step="1" data-unit-amount>
                        <output data-unit-amount-output>3</output>
                    </label>
                    <div class="unit-equation" aria-live="polite">
                        <span>같은 데이터 양 <small>Same Data Size</small></span>
                        <code data-unit-equation>3 MB = 3,000 KB = 3,000,000 B</code>
                        <p data-unit-relation>MB에서 KB로 한 칸 내려오면 숫자는 1000배가 됩니다.</p>
                    </div>
                </div>
                <aside class="binary-unit-note">
                    <b>1000 기준과 1024 기준 <small>Decimal and Binary Prefixes</small></b>
                    <p>이 사다리의 <strong>KB·MB·GB·TB</strong>는 SI 십진 단위라서 한 칸마다 1000배입니다. <strong>KiB·MiB·GiB</strong>는 이진 접두어를 쓴 1024배 단위입니다. 따라서 <code>1 KB = 1000 B</code>, <code>1 KiB = 1024 B</code>입니다.</p>
                </aside>
            </section>
        </section>
    `);

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

    renderers.j01 = (spec) => figure(spec, "visual-algorithm-builder", `
        <section class="algorithm-file-lab" data-algorithm-lab data-algorithm-stage="0">
            <header class="algorithm-lab-heading">
                <div><h3>파일을 실제로 옮기며 실행 순서를 만든다 <small>Build an Algorithm by Operating a File Manager</small></h3><p>문장 카드를 먼저 맞히지 않습니다. 파일 관리자에서 할 수 있는 동작을 차례로 실행하면 그 기록이 알고리즘이 됩니다.</p></div>
                <button type="button" data-algo-reset>처음부터 <small>Reset</small></button>
            </header>
            <div class="algorithm-file-manager" aria-label="river.webp 파일을 과제 사진 폴더로 옮기는 파일 관리자">
                <header class="algorithm-window-bar"><strong>파일 관리자 <small>File Manager</small></strong><span>— □ ×</span></header>
                <div class="algorithm-toolbar"><button type="button" data-algo-back disabled>←</button><code data-algo-path>내 파일</code><button type="button" data-algo-move disabled>이동 <small>Move</small></button></div>
                <div class="algorithm-file-body">
                    <aside>
                        <button type="button" data-algo-location="downloads"><i></i><span>다운로드<small>Downloads</small></span></button>
                        <button type="button" data-algo-location="assignment"><i></i><span>과제 사진<small>Assignment Photos</small></span></button>
                    </aside>
                    <main>
                        <section class="algorithm-source-pane" data-algo-pane="downloads">
                            <h4>다운로드 <small>Downloads</small></h4>
                            <button type="button" draggable="true" class="algorithm-photo-file" data-file-source hidden><i><span></span></i><span><b>river.webp</b><small>WebP 사진 · 840 KB</small></span></button>
                            <span class="algorithm-file-item" data-algo-note hidden>▤ notes.txt</span>
                            <span class="algorithm-file-item" data-algo-pdf hidden>▦ homework.pdf</span>
                            <p data-algo-source-empty hidden>river.webp가 이 폴더에 없습니다.</p>
                        </section>
                        <section class="algorithm-target-pane" data-algo-pane="assignment" data-algo-dropzone tabindex="0" role="button" aria-label="river.webp를 놓을 과제 사진 폴더">
                            <h4>과제 사진 <small>Assignment Photos</small></h4>
                            <p data-file-empty>이곳을 목적지로 고르거나 river.webp를 끌어 놓으세요.</p>
                            <button type="button" class="algorithm-photo-file moved" data-file-moved hidden><i><span></span></i><span><b>river.webp</b><small>옮겨진 WebP 사진</small></span></button>
                        </section>
                    </main>
                </div>
                <footer data-file-result>왼쪽 위치 목록에서 다운로드 폴더를 먼저 여세요.</footer>
            </div>
            <ol class="algorithm-runtime-trace" aria-label="실제로 실행한 알고리즘 기록">
                <li data-algo-trace="open"><b>1</b><span>다운로드 열기<small>Open Downloads</small></span><em>대기</em></li>
                <li data-algo-trace="select"><b>2</b><span>river.webp 선택<small>Select File</small></span><em>대기</em></li>
                <li data-algo-trace="destination"><b>3</b><span>목적지 정하기<small>Choose Destination</small></span><em>대기</em></li>
                <li data-algo-trace="move"><b>4</b><span>파일 이동<small>Move File</small></span><em>대기</em></li>
                <li data-algo-trace="verify"><b>5</b><span>출발·도착 확인<small>Verify Both Locations</small></span><em>대기</em></li>
            </ol>
            <div class="algorithm-controller"><button type="button" data-algo-verify disabled>결과 확인 <small>Verify Move</small></button><p data-algo-status role="status" aria-live="polite">실행 전입니다. 알고리즘은 컴퓨터가 실행할 수 있을 만큼 대상과 순서가 분명해야 합니다.</p></div>
        </section>
    `);

    renderers.j02 = (spec) => figure(spec, "visual-control-path-lab", `
        <section class="control-path-lab" data-control-lab data-control-stage="ready" data-result="pending">
            <header class="control-lab-heading">
                <div><h3>로봇을 별과 같은 칸에 놓고 로봇을 누른다 <small>Place the Robot on the Star, Then Click It</small></h3><p>화살표는 위치만 바꿉니다. 로봇을 누르는 순간 프로그램이 조건을 검사하고 서로 다른 명령을 실행합니다.</p></div>
                <div class="control-scoreboard"><span>모은 별 <small>Collected</small></span><strong><b data-control-score>0</b> / 3</strong></div>
            </header>
            <div class="control-program-stage">
                <div class="control-world" data-control-world style="--robot-lane:0;--star-lane:2">
                    <div class="control-sky" aria-hidden="true"><span></span><span></span><span></span></div>
                    <div class="control-lanes" aria-hidden="true"><span>왼쪽 <small>Left</small></span><span>가운데 <small>Center</small></span><span>오른쪽 <small>Right</small></span></div>
                    <div class="control-star" data-control-star aria-label="모아야 할 별">
                        <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 5 61 37 95 38 68 58 77 91 50 72 23 91 32 58 5 38 39 37Z"/></svg>
                    </div>
                    <button type="button" class="control-robot" data-control-robot aria-label="로봇을 눌러 조건 검사">
                        <svg viewBox="0 0 120 140" aria-hidden="true"><path class="antenna" d="M60 10v18M48 10h24"/><rect class="head" x="20" y="28" width="80" height="58" rx="16"/><circle cx="43" cy="55" r="7"/><circle cx="77" cy="55" r="7"/><path class="mouth" d="M42 71h36"/><rect class="body" x="31" y="89" width="58" height="37" rx="10"/><path class="limb" d="M31 99 13 113M89 99l18 14M45 126v10M75 126v10"/></svg>
                        <span>로봇 누르기<small>Click Robot</small></span>
                    </button>
                    <div class="control-result-burst" data-control-burst aria-hidden="true"></div>
                </div>
                <div class="control-position-panel">
                    <div class="control-move-buttons" aria-label="로봇 위치 바꾸기">
                        <button type="button" data-control-move="-1">← <span>왼쪽</span><small>Move Left</small></button>
                        <button type="button" data-control-move="1"><span>오른쪽</span> →<small>Move Right</small></button>
                    </div>
                    <dl class="control-state-evidence">
                        <div><dt>로봇 칸 <small>Robot Lane</small></dt><dd data-control-robot-lane>왼쪽</dd></div>
                        <div><dt>별 칸 <small>Star Lane</small></dt><dd data-control-star-lane>오른쪽</dd></div>
                        <div><dt>조건 결과 <small>Condition</small></dt><dd data-control-condition>아직 검사 안 함</dd></div>
                    </dl>
                </div>
            </div>
            <ol class="program-flow" aria-label="로봇을 눌렀을 때 실행되는 프로그램 순서">
                <li data-flow-step="event"><b>1</b><span>로봇을 누름<small>Event</small></span><em>대기</em></li>
                <li data-flow-step="condition"><b>2</b><span>로봇 칸 = 별 칸?<small>Condition</small></span><em>대기</em></li>
                <li class="flow-branch" data-flow-step="branch"><b>3</b><span><i>참: 별 +1</i><i>거짓: 그대로</i><small>Branch</small></span><em>대기</em></li>
                <li data-flow-step="loop"><b>4</b><span>별이 남으면 새 위치로 반복<small>Loop</small></span><em>대기</em></li>
            </ol>
            <div class="control-observation">
                <p class="lab-readout" data-control-status aria-live="polite">현재 로봇은 왼쪽, 별은 오른쪽에 있습니다. 위치를 바꾸고 로봇을 눌러 보세요.</p>
                <ol class="loop-trace" data-loop-trace aria-label="프로그램 실행 기록"><li>실행 기록이 여기에 쌓입니다.</li></ol>
                <button type="button" data-control-reset>처음부터 <small>Reset</small></button>
                </div>
            </details>
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

    function setupProgramProcessLab() {
        const lab = document.querySelector("[data-program-lab]");
        if (!lab) return;
        const process = lab.querySelector("[data-process-token]");
        const processEmpty = lab.querySelector("[data-process-empty]");
        const processCopy = lab.querySelector("[data-process-copy]");
        const stack = lab.querySelector("[data-window-stack]");
        const windowEmpty = lab.querySelector("[data-window-empty]");
        const status = lab.querySelector("[data-program-status]");
        const buttons = Object.fromEntries(Array.from(lab.querySelectorAll("[data-program-action]")).map((button) => [button.dataset.programAction, button]));
        let running = false;
        let windowCount = 0;
        let hidden = false;
        const render = () => {
            process.hidden = !running;
            processEmpty.hidden = running;
            processCopy.textContent = hidden ? "CPU 시간·RAM 공간을 쓰며 백그라운드 실행" : "CPU 시간·RAM 공간 사용";
            stack.replaceChildren();
            if (running && !hidden) {
                for (let index = 0; index < windowCount; index += 1) {
                    const windowCard = document.createElement("div");
                    windowCard.className = "program-window-card";
                    windowCard.innerHTML = "<span>— □ ×</span><b>그림 " + (index + 1) + "</b><i></i>";
                    stack.append(windowCard);
                }
            }
            windowEmpty.hidden = running && !hidden && windowCount > 0;
            windowEmpty.textContent = hidden ? "창은 숨겨졌지만 프로세스는 실행 중" : "열린 창 없음";
            buttons.run.disabled = running;
            buttons.new.disabled = !running;
            buttons.background.disabled = !running;
            buttons.end.disabled = !running;
            buttons.background.innerHTML = hidden ? "창 다시 보이기 <small>Show Windows</small>" : "창 숨기기 <small>Keep in Background</small>";
            lab.dataset.programState = running ? (hidden ? "background" : "running") : "stopped";
        };
        buttons.run.addEventListener("click", () => {
            running = true; windowCount = 1; hidden = false; render();
            status.innerHTML = "<b>실행:</b> 운영체제가 저장 장치에서 그림 앱의 필요한 명령과 자료를 RAM에 읽고 프로세스를 시작했습니다. 프로세스는 CPU 시간과 RAM 공간을 사용하며 첫 창을 표시합니다.";
        });
        buttons.new.addEventListener("click", () => {
            hidden = false; windowCount += 1; render();
            status.innerHTML = "<b>새 창:</b> 이 모형에서는 같은 그림 앱 프로세스가 창을 " + windowCount + "개 관리합니다. 창과 프로세스의 수가 반드시 같은 것은 아닙니다.";
        });
        buttons.background.addEventListener("click", () => {
            hidden = !hidden; render();
            status.innerHTML = hidden
                ? "<b>백그라운드:</b> 창은 보이지 않지만 그림 앱 프로세스는 CPU 시간과 RAM 공간을 사용하며 계속 실행 중입니다."
                : "<b>창 다시 표시:</b> 실행 중이던 같은 프로세스가 창을 다시 화면에 나타냈습니다.";
        });
        buttons.end.addEventListener("click", () => {
            running = false; windowCount = 0; hidden = false; render();
            status.innerHTML = "<b>프로세스 종료:</b> 운영체제가 실행을 끝내고 프로세스가 쓰던 RAM 공간과 창을 정리했습니다. 저장 장치의 그림 앱 파일은 남아 다시 실행할 수 있습니다.";
        });
        render();
    }

    function setupClipboardLab() {
        const lab = document.querySelector("[data-clipboard-lab]");
        if (!lab) return;
        const source = lab.querySelector("[data-clipboard-source]");
        const target = lab.querySelector("[data-clipboard-target]");
        const clipboardOutput = lab.querySelector("[data-clipboard-value]");
        const status = lab.querySelector("[data-clipboard-status]");
        const initialSource = source.value;
        const initialTarget = target.value;
        let clipboard = "";
        const editorName = (editor) => editor === source ? "원문" : "붙여넣을 문서";
        const selectedText = (editor) => editor.value.slice(editor.selectionStart, editor.selectionEnd);
        const copy = (editor, cut) => {
            const selected = selectedText(editor);
            if (!selected) {
                status.innerHTML = "<b>선택이 필요합니다:</b> 복사하거나 잘라낼 글자를 먼저 드래그하거나 선택 단추로 고르세요.";
                return;
            }
            clipboard = selected;
            clipboardOutput.textContent = selected;
            if (cut) {
                const start = editor.selectionStart;
                editor.setRangeText("", editor.selectionStart, editor.selectionEnd, "start");
                editor.setSelectionRange(start, start);
                status.innerHTML = "<b>잘라내기:</b> " + editorName(editor) + "에서 선택한 ‘" + selected + "’를 없애고 그 사본을 클립보드에 임시로 두었습니다.";
            } else {
                status.innerHTML = "<b>복사:</b> " + editorName(editor) + "은 그대로 두고 선택한 ‘" + selected + "’의 사본을 클립보드에 임시로 두었습니다.";
            }
        };
        const paste = (editor) => {
            if (!clipboard) {
                status.innerHTML = "<b>클립보드가 비어 있습니다:</b> 먼저 원문을 선택해 복사하거나 잘라내세요.";
                return;
            }
            editor.focus();
            const start = editor.selectionStart;
            editor.setRangeText(clipboard, editor.selectionStart, editor.selectionEnd, "end");
            status.innerHTML = "<b>붙여넣기:</b> 클립보드의 ‘" + clipboard + "’ 사본을 " + editorName(editor) + "의 " + (start + 1) + "번째 위치부터 넣었습니다. 클립보드 내용은 남아 다시 붙여넣을 수 있습니다.";
        };
        const reset = () => {
            source.value = initialSource;
            target.value = initialTarget;
            target.setSelectionRange(target.value.length, target.value.length);
            clipboard = "";
            clipboardOutput.textContent = "비어 있음";
            status.innerHTML = "<b>선택:</b> 원문에서 직접 드래그하거나 말 단추를 누른 뒤 복사·잘라내기를 실행하세요. 붙여넣기는 아래 문서의 커서 위치에 들어갑니다.";
        };
        lab.querySelectorAll("[data-select-text]").forEach((button) => button.addEventListener("click", () => {
            const text = button.dataset.selectText;
            const start = source.value.indexOf(text);
            if (start < 0) {
                status.innerHTML = "<b>현재 원문에 없음:</b> 잘라낸 말은 처음 상태로 돌리기 전까지 다시 선택할 수 없습니다.";
                return;
            }
            source.focus();
            source.setSelectionRange(start, start + text.length);
            status.innerHTML = "<b>‘" + text + "’ 선택:</b> 선택 범위만 복사하거나 잘라낼 수 있습니다.";
        }));
        lab.querySelectorAll("[data-clipboard-action]").forEach((button) => button.addEventListener("click", () => {
            const action = button.dataset.clipboardAction;
            if (action === "copy") copy(source, false);
            if (action === "cut") copy(source, true);
            if (action === "paste") paste(target);
            if (action === "reset") reset();
        }));
        lab.addEventListener("keydown", (event) => {
            if (!(event.ctrlKey || event.metaKey)) return;
            const editor = event.target;
            if (editor !== source && editor !== target) return;
            const key = event.key.toLowerCase();
            if (!["c", "x", "v"].includes(key)) return;
            event.preventDefault();
            if (key === "c") copy(editor, false);
            if (key === "x") copy(editor, true);
            if (key === "v") paste(editor);
        });
        reset();
    }

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

    function setupFileOperationLab() {
        const lab = document.querySelector("[data-file-operation-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-file-operation-status]");
        const states = {
            start: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 1" }],
                effects: ["A", "1 → 1", "그대로", "문서", "내용 1"],
                message: "<b>처음 상태:</b> 문서 폴더에 파일 A 한 개가 있습니다. 각 명령은 이 상태에서 시작합니다."
            },
            save: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 2", changed: true }],
                effects: ["A 그대로", "1 → 1", "그대로", "문서 그대로", "내용 1 → 내용 2"],
                message: "<b>저장 Save:</b> 같은 파일 A의 내용을 고쳐 씁니다. 이름·개수·위치는 바뀌지 않습니다."
            },
            "save-as": {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 1" }, { id: "B", name: "보고서_편집본.docx", folder: "documents", version: "내용 2", changed: true }],
                effects: ["A + 새 B", "1 → 2", "새 이름 추가", "둘 다 문서", "A는 1 · B는 2"],
                message: "<b>다른 이름으로 저장 Save As:</b> 원본 A는 남고, 새 이름과 새 ID를 가진 편집본 B가 생깁니다."
            },
            copy: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "documents", version: "내용 1" }, { id: "C", name: "보고서_원본 - 복사본.docx", folder: "documents", version: "내용 1" }],
                effects: ["A + 새 C", "1 → 2", "복사본 이름", "둘 다 문서", "두 파일 내용 같음"],
                message: "<b>복사 Copy:</b> 원본 A와 같은 내용을 가진 별도 파일 C가 생깁니다. 이후 두 파일은 각각 고칠 수 있습니다."
            },
            move: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "homework", version: "내용 1" }],
                effects: ["A 그대로", "1 → 1", "그대로", "문서 → 과제", "그대로"],
                message: "<b>이동 Move:</b> 파일 A가 과제 폴더로 자리를 옮깁니다. 새 파일은 생기지 않습니다."
            },
            delete: {
                files: [{ id: "A", name: "보고서_원본.docx", folder: "trash", version: "내용 1", trashed: true }],
                effects: ["A 그대로", "1 → 1", "그대로", "문서 → 휴지통", "그대로"],
                message: "<b>삭제 Delete:</b> 이 예에서는 파일 A가 휴지통으로 이동합니다. 휴지통을 비우기 전에는 복원할 수 있습니다."
            }
        };
        const folderNames = { documents: "문서", homework: "과제", trash: "휴지통" };
        const render = (operation) => {
            const state = states[operation];
            lab.dataset.operation = operation;
            lab.querySelectorAll("[data-file-list]").forEach((list) => { list.replaceChildren(); });
            state.files.forEach((file) => {
                const item = document.createElement("div");
                item.className = `operation-file${file.changed ? " is-changed" : ""}${file.trashed ? " is-trashed" : ""}`;
                item.innerHTML = `<i>DOCX</i><span><b>${file.name}</b><small>파일 ${file.id} · ${file.version}</small></span>`;
                item.setAttribute("aria-label", `${file.name}, 파일 ${file.id}, ${file.version}, ${folderNames[file.folder]} 폴더`);
                lab.querySelector(`[data-file-list="${file.folder}"]`).append(item);
            });
            ["identity", "count", "name", "location", "content"].forEach((key, index) => {
                lab.querySelector(`[data-file-effect="${key}"]`).textContent = state.effects[index];
            });
            lab.querySelectorAll("[data-file-operation]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.fileOperation === operation)));
            status.innerHTML = state.message;
        };
        lab.querySelectorAll("[data-file-operation]").forEach((button) => button.addEventListener("click", () => render(button.dataset.fileOperation)));
        render("start");
    }

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

    function setupReferenceLab() {
        const lab = document.querySelector("[data-reference-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-reference-status]");
        const originalFile = lab.querySelector("[data-original-file]");
        const shortcut = lab.querySelector(".desktop-shortcut");
        const bookmark = lab.querySelector(".bookmark-row");
        const fileIcon = lab.querySelector("[data-file-icon]");
        const filePath = lab.querySelector("[data-file-path]");
        const shortcutPath = lab.querySelector("[data-shortcut-path]");
        const pageUrl = lab.querySelector("[data-page-url]");
        const bookmarkUrl = lab.querySelector("[data-bookmark-url]");
        const stateOutputs = {
            file: lab.querySelector("[data-file-state]"),
            shortcut: lab.querySelector("[data-shortcut-state]"),
            page: lab.querySelector("[data-page-state]"),
            bookmark: lab.querySelector("[data-bookmark-state]")
        };
        const actions = Object.fromEntries(Array.from(lab.querySelectorAll("[data-reference-action]")).map((button) => [button.dataset.referenceAction, button]));
        const initial = () => ({
            iconAlternate: false,
            filePath: "문서/과학보고서.pdf",
            shortcutPath: "문서/과학보고서.pdf",
            shortcutExists: true,
            pageUrl: "https://science.example/report",
            bookmarkUrl: "https://science.example/report",
            bookmarkExists: true
        });
        let state = initial();
        let choice = "shortcut";
        const labels = {
            icon: [["아이콘이 표시하는 항목 확인", "Inspect the Icon's Target"], ["아이콘 모양 바꾸기", "Change the Icon"], ["", ""]],
            shortcut: [["바로가기로 열기", "Open the Shortcut"], ["원본을 완료 폴더로 이동", "Move the Original"], ["바로가기 삭제", "Delete the Shortcut"]],
            bookmark: [["북마크로 열기", "Open the Bookmark"], ["웹페이지 주소 변경", "Change the Page Address"], ["북마크 삭제", "Delete the Bookmark"]]
        };
        const defaultMessages = {
            icon: "<b>아이콘</b>은 항목을 화면에서 알아보게 하는 표시입니다. 모양을 바꿔도 파일 이름·경로·내용은 그대로인지 확인하세요.",
            shortcut: "<b>바로가기</b>에는 원본 파일의 경로가 기록되어 있습니다. 열기·이동·삭제를 실행해 원본과 연결의 상태를 비교하세요.",
            bookmark: "<b>북마크·즐겨찾기</b>에는 웹 주소(URL)가 기록됩니다. 북마크와 서버의 웹페이지가 서로 다른 항목임을 확인하세요."
        };
        const render = (message = "") => {
            lab.dataset.reference = choice;
            const shortcutConnected = state.shortcutExists && state.shortcutPath === state.filePath;
            const bookmarkConnected = state.bookmarkExists && state.bookmarkUrl === state.pageUrl;
            lab.dataset.referenceConnection = choice === "shortcut"
                ? shortcutConnected ? "connected" : state.shortcutExists ? "broken" : "deleted"
                : choice === "bookmark"
                    ? bookmarkConnected ? "connected" : state.bookmarkExists ? "broken" : "deleted"
                    : "icon";
            lab.querySelectorAll("[data-reference-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.referenceChoice === choice)));
            fileIcon.textContent = state.iconAlternate ? "문서" : "PDF";
            originalFile.classList.toggle("has-alternate-icon", state.iconAlternate);
            filePath.textContent = state.filePath;
            shortcutPath.textContent = "저장 경로: " + state.shortcutPath;
            pageUrl.textContent = state.pageUrl;
            bookmarkUrl.textContent = "저장 주소: " + state.bookmarkUrl;
            shortcut.hidden = !state.shortcutExists;
            bookmark.hidden = !state.bookmarkExists;
            stateOutputs.file.textContent = "남아 있음";
            stateOutputs.shortcut.textContent = !state.shortcutExists ? "삭제됨" : shortcutConnected ? "연결됨" : "끊어진 경로";
            stateOutputs.page.textContent = "서버에 있음";
            stateOutputs.bookmark.textContent = !state.bookmarkExists ? "삭제됨" : bookmarkConnected ? "주소 연결됨" : "예전 주소";
            setBilingualButtonLabel(actions.open, ...labels[choice][0]);
            setBilingualButtonLabel(actions.change, ...labels[choice][1]);
            setBilingualButtonLabel(actions.delete, ...labels[choice][2]);
            actions.delete.hidden = choice === "icon";
            status.innerHTML = message || defaultMessages[choice];
        };
        const select = (nextChoice) => {
            choice = nextChoice;
            render();
        };
        lab.querySelectorAll("[data-reference-choice]").forEach((button) => button.addEventListener("click", () => select(button.dataset.referenceChoice)));
        lab.querySelectorAll("[data-reference-marker]").forEach((button) => button.addEventListener("click", () => select(button.dataset.referenceMarker)));
        actions.open.addEventListener("click", () => {
            if (choice === "icon") {
                render("<b>같은 파일을 확인했습니다.</b>　아이콘 모양과 관계없이 이름은 과학보고서.pdf이고 경로는 " + state.filePath + "입니다.");
                return;
            }
            if (choice === "shortcut") {
                if (!state.shortcutExists) render("<b>열 연결이 없습니다.</b>　바로가기는 삭제되었지만 원본 파일은 " + state.filePath + "에 남아 있습니다.");
                else if (state.shortcutPath !== state.filePath) render("<b>대상을 찾지 못했습니다.</b>　바로가기에 저장된 경로와 원본의 현재 경로가 다릅니다.");
                else render("<b>원본 파일을 열었습니다.</b>　바로가기가 저장 경로를 따라 " + state.filePath + "의 파일을 찾았습니다.");
                return;
            }
            if (!state.bookmarkExists) render("<b>열 주소가 없습니다.</b>　북마크는 삭제되었지만 웹페이지는 서버의 " + state.pageUrl + "에 있습니다.");
            else if (state.bookmarkUrl !== state.pageUrl) render("<b>예전 주소로는 열리지 않습니다.</b>　북마크의 저장 주소와 서버의 현재 주소가 다릅니다.");
            else render("<b>웹페이지를 요청했습니다.</b>　브라우저가 북마크의 URL을 이용해 서버에서 페이지를 받습니다.");
        });
        actions.change.addEventListener("click", () => {
            if (choice === "icon") {
                state.iconAlternate = !state.iconAlternate;
                render("<b>표시 모양만 바뀌었습니다.</b>　파일 이름·경로·내용은 바뀌지 않았습니다.");
                return;
            }
            if (choice === "shortcut") {
                state.filePath = "문서/완료/과학보고서.pdf";
                render("<b>원본을 새 폴더로 옮겼습니다.</b>　바로가기는 예전 경로를 계속 기억해 연결이 끊어졌습니다.");
                return;
            }
            state.pageUrl = "https://science.example/report-v2";
            render("<b>서버의 페이지 주소가 바뀌었습니다.</b>　북마크에는 예전 URL이 남아 있어 새 주소로 고쳐야 합니다.");
        });
        actions.delete.addEventListener("click", () => {
            if (choice === "shortcut") {
                state.shortcutExists = false;
                render("<b>바로가기만 삭제했습니다.</b>　원본 파일의 데이터와 현재 경로는 그대로 남아 있습니다.");
                return;
            }
            state.bookmarkExists = false;
            render("<b>북마크만 삭제했습니다.</b>　서버의 웹페이지는 지워지지 않고 현재 URL에 남아 있습니다.");
        });
        actions.reset.addEventListener("click", () => {
            state = initial();
            render("<b>처음 상태로 되돌렸습니다.</b>　연결과 대상이 다시 같은 경로·주소를 가리킵니다.");
        });
        select("shortcut");
    }

    function setupBrowserLab() {
        const lab = document.querySelector("[data-browser-lab]");
        if (!lab) return;
        const tabList = lab.querySelector("[data-browser-tab-list]");
        const newTabButton = lab.querySelector("[data-browser-new-tab]");
        const backButton = lab.querySelector("[data-browser-back]");
        const urlOutput = lab.querySelector("[data-browser-url]");
        const searchForm = lab.querySelector("[data-browser-search-form]");
        const searchInput = lab.querySelector("[data-browser-search-input]");
        const queryOutput = lab.querySelector("[data-browser-query]");
        const resultList = lab.querySelector("[data-browser-result-list]");
        const pageSite = lab.querySelector("[data-page-site]");
        const pageDomain = lab.querySelector("[data-page-domain]");
        const pageTitle = lab.querySelector("[data-page-title]");
        const pageBody = lab.querySelector("[data-page-body]");
        const pagePublisher = lab.querySelector("[data-page-publisher]");
        const pageAuthor = lab.querySelector("[data-page-author]");
        const pageDate = lab.querySelector("[data-page-date]");
        const pageEvidence = lab.querySelector("[data-page-evidence]");
        const relatedLink = lab.querySelector("[data-page-related-link]");
        const status = lab.querySelector("[data-browser-status]");
        const termButtons = Array.from(lab.querySelectorAll("[data-browser-term]"));
        const suggestionButtons = Array.from(lab.querySelectorAll("[data-browser-suggestion]"));
        const pageViews = Array.from(lab.querySelectorAll("[data-browser-page]"));
        const catalog = {
            comet: {
                site: "어린이 천문 관측소", domain: "astro.local", url: "https://astro.local/comets/tail",
                title: "혜성의 꼬리는 어떻게 생길까?", summary: "혜성이 태양 가까이 갈 때 얼음과 먼지가 어떻게 꼬리를 만드는지 관측 자료로 설명합니다.",
                body: "혜성의 얼음이 태양열을 받으면 기체와 먼지가 밖으로 나옵니다. 태양에서 오는 빛과 입자의 흐름이 이 물질을 태양 반대쪽으로 밀어 혜성의 꼬리가 나타납니다.",
                publisher: "어린이 천문 관측소", author: "별하늘 천문 교육팀", date: "2026-05-18 수정", evidence: "태양 탐사선 공개 사진 4장 · 혜성 꼬리 방향 모형 실험",
                keywords: ["혜성", "꼬리", "우주", "태양", "얼음", "comet"], related: "moon"
            },
            cometRumor: {
                site: "별빛 자유 게시판", domain: "star-talk.local", url: "https://star-talk.local/posts/comet-tail",
                title: "혜성은 빨리 달려서 꼬리가 뒤로 생긴다", summary: "작성자의 생각만으로 혜성 꼬리의 방향을 설명한 게시글입니다.",
                body: "혜성이 아주 빠르게 움직이기 때문에 머리 뒤쪽으로 꼬리가 생긴다고 생각합니다. 관측 자료나 참고 문헌은 따로 적지 않았습니다.",
                publisher: "운영 기관 표시 없음", author: "별명 ‘밤하늘친구’", date: "게시일 표시 없음", evidence: "관측 사진·자료 출처 링크 없음",
                keywords: ["혜성", "꼬리", "우주", "태양", "comet"], related: "comet"
            },
            otter: {
                site: "동물 관찰 도감", domain: "animals.local", url: "https://animals.local/otter/habitat",
                title: "수달의 서식지와 생활", summary: "강과 바다 가까이에서 사는 수달의 몸과 생활을 살펴봅니다.",
                body: "수달은 깨끗한 강과 바닷가처럼 먹이와 숨을 곳이 있는 물가에서 삽니다. 물갈퀴와 긴 꼬리는 헤엄칠 때 도움이 됩니다.",
                publisher: "우리생태연구원", author: "김하늘 생태 연구원", date: "2026-03-12 수정", evidence: "현장 관찰 기록 18회 · 생태 보고서 2건",
                keywords: ["수달", "동물", "서식지", "강", "바다", "otter"], related: "river"
            },
            otterStory: {
                site: "재미있는 동물 이야기", domain: "animal-story.local", url: "https://animal-story.local/posts/otter",
                title: "수달은 아무 물가에서나 살아요", summary: "여행에서 본 수달 한 마리를 바탕으로 쓴 개인 이야기입니다.",
                body: "여행 중 물가에서 수달을 보았습니다. 그래서 수달은 물만 있으면 어느 곳에서나 살 수 있다고 생각합니다.",
                publisher: "운영 기관 표시 없음", author: "작성자 표시 없음", date: "게시·수정일 표시 없음", evidence: "관찰 장소·자료 출처 링크 없음",
                keywords: ["수달", "동물", "서식지", "강", "바다", "otter"], related: "otter"
            },
            river: {
                site: "우리 강 연구소", domain: "river.local", url: "https://river.local/ecology/clean-water",
                title: "깨끗한 강과 물가 생물", summary: "강물의 상태와 물가 생물이 서로 어떤 영향을 주는지 알아봅니다.",
                body: "강에는 물고기, 곤충, 식물처럼 여러 생물이 함께 삽니다. 물이 오염되면 먹이와 숨을 곳이 줄어 물가 생물도 영향을 받습니다.",
                publisher: "우리 강 연구소", author: "박샘물 연구팀", date: "2026-02-08 수정", evidence: "수질 측정표 · 물가 생물 조사표",
                keywords: ["강", "물", "생물", "환경", "수달", "river"], related: "otter"
            },
            moon: {
                site: "어린이 우주 관측소", domain: "space.local", url: "https://space.local/moon/phases",
                title: "달의 모양은 왜 달라질까?", summary: "달과 지구, 태양의 위치로 달의 모양 변화를 관찰합니다.",
                body: "달이 스스로 모양을 바꾸는 것은 아닙니다. 태양빛을 받은 달의 부분 가운데 지구에서 보이는 부분이 달라집니다.",
                publisher: "어린이 우주 관측소", author: "이별빛 천문 교육팀", date: "2026-01-24 수정", evidence: "한 달 관측 기록 · 달 위치 모형",
                keywords: ["달", "우주", "태양", "관측", "moon", "space"], related: "weather"
            },
            weather: {
                site: "교실 날씨 자료실", domain: "weather.local", url: "https://weather.local/clouds/forecast",
                title: "구름을 보고 날씨 관찰하기", summary: "구름의 양과 모양을 기록하며 날씨 변화를 비교합니다.",
                body: "날씨를 알아볼 때에는 구름뿐 아니라 기온, 바람, 비처럼 여러 관측 자료를 함께 확인합니다.",
                publisher: "교실 기상 관찰단", author: "3학년 공동 관찰", date: "2026-04-03 기록", evidence: "기온·바람·강수 관찰표",
                keywords: ["날씨", "구름", "기온", "비", "관찰", "weather"], related: "moon"
            }
        };
        const makeHome = () => ({ type: "home", title: "교실 검색", url: "https://search.local/" });
        const tabs = [{ id: 1, title: "교실 검색", history: [makeHome()], historyIndex: 0 }];
        let activeTabId = 1;
        let nextTabId = 2;

        const activeTab = () => tabs.find((tab) => tab.id === activeTabId);
        const currentPage = () => {
            const tab = activeTab();
            return tab.history[tab.historyIndex];
        };
        const findResults = (query) => {
            const normalized = query.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ");
            return Object.entries(catalog).filter(([, page]) => page.keywords.some((keyword) => normalized.includes(keyword.toLocaleLowerCase()))).map(([id]) => id);
        };
        const pageRecord = (id) => ({ type: "page", pageId: id, title: catalog[id].title, url: catalog[id].url });
        const pushPage = (page) => {
            const tab = activeTab();
            tab.history = tab.history.slice(0, tab.historyIndex + 1);
            tab.history.push(page);
            tab.historyIndex += 1;
        };
        const renderTabs = () => {
            tabList.replaceChildren();
            tabs.forEach((tab, tabIndex) => {
                const button = document.createElement("button");
                button.type = "button";
                button.setAttribute("role", "tab");
                button.setAttribute("aria-controls", "browser-state-viewport");
                button.setAttribute("aria-selected", String(tab.id === activeTabId));
                button.tabIndex = tab.id === activeTabId ? 0 : -1;
                button.dataset.browserTabId = String(tab.id);
                button.textContent = tab.title;
                button.addEventListener("click", () => {
                    activeTabId = tab.id;
                    renderCurrentPage();
                    status.textContent = `‘${tab.title}’ 탭을 선택했습니다. 이 탭의 주소와 방문 기록이 표시됩니다.`;
                });
                button.addEventListener("keydown", (event) => {
                    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                    event.preventDefault();
                    const direction = event.key === "ArrowRight" ? 1 : -1;
                    const target = tabs[(tabIndex + direction + tabs.length) % tabs.length];
                    activeTabId = target.id;
                    renderCurrentPage();
                    tabList.querySelector(`[data-browser-tab-id="${target.id}"]`)?.focus();
                });
                tabList.append(button);
            });
        };
        const renderResults = (resultPage) => {
            queryOutput.textContent = `‘${resultPage.query}’`;
            resultList.replaceChildren();
            if (!resultPage.resultIds.length) {
                const empty = document.createElement("p");
                empty.className = "browser-empty-results";
                empty.textContent = "이 검색 모형에는 입력한 주제의 자료가 없습니다. 아래 주제를 골라 실제 결과와 출처를 비교하세요.";
                const choices = document.createElement("div");
                choices.className = "browser-empty-actions";
                ["혜성", "수달", "강", "달", "날씨"].forEach((query) => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.textContent = `${query} 검색`;
                    button.addEventListener("click", () => {
                        searchInput.value = query;
                        runSearch(query);
                    });
                    choices.append(button);
                });
                resultList.append(empty, choices);
                return;
            }
            resultPage.resultIds.forEach((id) => {
                const page = catalog[id];
                const result = document.createElement("article");
                result.className = "browser-search-result";
                result.dataset.resultCard = id;
                const site = document.createElement("span");
                site.dataset.siteRegion = "";
                site.textContent = `${page.site} · ${page.domain}`;
                const link = document.createElement("button");
                link.type = "button";
                link.dataset.linkRegion = "";
                link.textContent = page.title;
                link.addEventListener("click", () => openCatalogPage(id, false));
                const summary = document.createElement("p");
                summary.textContent = page.summary;
                const sourceFacts = document.createElement("div");
                sourceFacts.className = "result-source-facts";
                sourceFacts.innerHTML = "<span><b>작성자</b> " + page.author + "</span><span><b>날짜</b> " + page.date + "</span><span><b>근거</b> " + page.evidence + "</span>";
                const footer = document.createElement("footer");
                const url = document.createElement("code");
                url.textContent = page.url;
                const newTab = document.createElement("button");
                newTab.type = "button";
                newTab.dataset.linkRegion = "";
                newTab.textContent = "새 탭에서 열기";
                newTab.addEventListener("click", () => openCatalogPage(id, true));
                footer.append(url, newTab);
                result.append(site, link, summary, sourceFacts, footer);
                resultList.append(result);
            });
        };
        const renderLocalPage = (page) => {
            const record = catalog[page.pageId];
            pageSite.textContent = record.site;
            pageDomain.textContent = record.domain;
            pageTitle.textContent = record.title;
            pageBody.textContent = record.body;
            pagePublisher.textContent = record.publisher;
            pageAuthor.textContent = record.author;
            pageDate.textContent = record.date;
            pageEvidence.textContent = record.evidence;
            if (record.related && catalog[record.related]) {
                relatedLink.hidden = false;
                relatedLink.textContent = `관련 링크: ${catalog[record.related].title}`;
                relatedLink.onclick = () => openCatalogPage(record.related, false);
            } else {
                relatedLink.hidden = true;
                relatedLink.onclick = null;
            }
        };
        function renderCurrentPage() {
            const tab = activeTab();
            const page = currentPage();
            tab.title = page.title;
            pageViews.forEach((view) => { view.hidden = view.dataset.browserPage !== page.type; });
            urlOutput.textContent = page.url;
            backButton.disabled = tab.historyIndex === 0;
            if (page.type === "results") renderResults(page);
            if (page.type === "page") renderLocalPage(page);
            renderTabs();
        }
        function openCatalogPage(id, inNewTab) {
            const destination = pageRecord(id);
            if (inNewTab) {
                const source = currentPage();
                const newTab = { id: nextTabId, title: destination.title, history: [source, destination], historyIndex: 1 };
                nextTabId += 1;
                tabs.push(newTab);
                activeTabId = newTab.id;
                renderCurrentPage();
                status.textContent = `링크 주소 ${destination.url}을 새 탭에서 열었습니다. 새 탭에도 독립된 주소와 방문 기록이 생겼습니다.`;
                return;
            }
            pushPage(destination);
            renderCurrentPage();
            status.textContent = `링크를 현재 탭에서 열었습니다. 주소창과 함께 운영 기관·작성자·날짜·근거가 실제로 표시되는지 확인하세요.`;
        }
        const highlightTerm = (term) => {
            const page = currentPage();
            lab.dataset.browserHighlight = term;
            termButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.browserTerm === term)));
            const messages = {
                address: `주소: 현재 탭의 주소창은 ${page.url}을 표시합니다. 페이지가 바뀌면 이 URL도 바뀝니다.`,
                tab: `탭: 현재 브라우저에는 ${tabs.length}개의 탭이 열려 있습니다. 각 탭은 자기 주소와 방문 기록을 따로 기억합니다.`,
                search: page.type === "home" || page.type === "results" ? "검색 엔진: 지금 보이는 교실 검색은 검색어와 관련된 웹페이지를 찾아 결과 목록을 만드는 웹 서비스입니다." : "검색 엔진: 지금은 검색 결과에서 연 다른 웹사이트입니다. 뒤로 가면 이 탭의 검색 결과로 돌아갈 수 있습니다.",
                site: page.type === "page" ? `웹사이트: 이 페이지는 ${catalog[page.pageId].site} 사이트에 속하며 주소의 도메인은 ${catalog[page.pageId].domain}입니다.` : "웹사이트: 교실 검색도 search.local이라는 주소를 가진 하나의 웹사이트입니다.",
                page: `웹페이지: 현재 탭에 표시된 ‘${page.title}’ 화면 한 장입니다. 같은 웹사이트에도 주소가 다른 여러 페이지가 있을 수 있습니다.`,
                link: page.type === "results" ? `링크: 현재 결과에 ${page.resultIds.length}개의 페이지 제목 링크가 있습니다. 누르면 연결된 URL의 페이지가 열립니다.` : page.type === "page" ? "링크: 본문 아래의 관련 링크를 누르면 같은 탭에서 주소와 페이지가 바뀝니다." : "링크: 검색을 실행하면 결과 제목이 다른 웹페이지 주소로 연결되는 링크가 됩니다."
            };
            status.textContent = messages[term];
        };

        const runSearch = (rawQuery) => {
            const query = rawQuery.trim();
            if (!query) {
                status.textContent = "검색할 낱말이나 질문을 입력하세요.";
                searchInput.focus();
                return;
            }
            const resultIds = findResults(query);
            pushPage({ type: "results", title: `${query} 검색`, url: `https://search.local/?q=${encodeURIComponent(query)}`, query, resultIds });
            renderCurrentPage();
            status.textContent = resultIds.length
                ? `검색 결과는 관련성 순서일 뿐 믿을 만한 순서가 아닙니다. 결과마다 작성자·날짜·근거를 비교한 뒤 원문을 여세요.`
                : `현재 검색 모형에는 ‘${query}’ 자료가 없습니다. 화면에 표시된 주제 단추를 골라 다시 검색하세요.`;
        };
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            runSearch(searchInput.value);
        });
        suggestionButtons.forEach((button) => button.addEventListener("click", () => {
            const query = button.dataset.browserSuggestion;
            searchInput.value = query;
            runSearch(query);
        }));
        newTabButton.addEventListener("click", () => {
            const page = makeHome();
            const newTab = { id: nextTabId, title: page.title, history: [page], historyIndex: 0 };
            nextTabId += 1;
            tabs.push(newTab);
            activeTabId = newTab.id;
            renderCurrentPage();
            searchInput.focus();
            status.textContent = "빈 검색 페이지가 새 탭에 열렸습니다. 원래 탭의 페이지와 방문 기록은 그대로 남아 있습니다.";
        });
        backButton.addEventListener("click", () => {
            const tab = activeTab();
            if (tab.historyIndex === 0) return;
            tab.historyIndex -= 1;
            renderCurrentPage();
            status.textContent = `이 탭의 이전 페이지 ‘${currentPage().title}’(으)로 돌아왔습니다. 주소창도 이전 URL로 바뀌었습니다.`;
        });
        termButtons.forEach((button) => button.addEventListener("click", () => highlightTerm(button.dataset.browserTerm)));
        renderCurrentPage();
    }

    function setupNetworkJourney() {
        const lab = document.querySelector("[data-network-journey]");
        if (!lab) return;
        const status = lab.querySelector("[data-network-status]");
        const send = lab.querySelector("[data-network-send]");
        const packet = lab.querySelector("[data-network-packet]");
        const reset = lab.querySelector("[data-network-reset]");
        const nodeNames = ["device", "router", "internet", "server"];
        const linkNames = ["wifi", "internet", "server"];
        const nodes = nodeNames.map((name) => lab.querySelector(`[data-network-node="${name}"]`));
        const links = linkNames.map((name) => lab.querySelector(`[data-network-link="${name}"]`));
        const arrivalMessages = [
            "패킷은 내 기기에 있습니다. 연결 하나를 끄거나 그대로 첫 단계를 보내 보세요.",
            "Wi-Fi 연결을 지나 공유기에 도착했습니다. 공유기는 인터넷 쪽 다음 길을 고릅니다.",
            "인터넷 회선을 지나 연결된 네트워크에 도착했습니다. 이제 목적지 서버 연결을 확인합니다.",
            "요청 패킷이 수업 서버에 도착했습니다. Wi-Fi 표시만으로 전체 경로를 판단할 수 없다는 것을 확인했습니다."
        ];
        const stoppedMessages = {
            wifi: "기기에서 멈췄습니다. Wi-Fi 연결이 꺼져 있어 공유기까지 갈 수 없습니다.",
            internet: "공유기에서 멈췄습니다. 기기와 공유기는 연결됐지만 공유기 밖 인터넷 회선이 꺼져 있습니다.",
            server: "인터넷 구간에서 멈췄습니다. 공유기 밖까지 왔지만 목적지 서버로 이어지는 연결이 꺼져 있습니다."
        };
        let step = 0;
        let stoppedAt = "";
        const show = () => {
            lab.dataset.networkStep = String(step);
            lab.dataset.networkStopped = stoppedAt;
            nodes.forEach((node, index) => {
                node.classList.toggle("is-current", index === step);
                node.classList.toggle("is-passed", index < step);
            });
            links.forEach((link, index) => {
                const enabled = link.getAttribute("aria-pressed") === "true";
                link.classList.toggle("is-broken", !enabled);
                link.classList.toggle("is-passed", enabled && index < step);
                link.querySelector("[data-network-link-state]").textContent = enabled ? "켜짐" : "꺼짐";
            });
            nodes[step].append(packet);
            send.disabled = step === nodeNames.length - 1;
            const sendLabel = step === nodeNames.length - 1
                ? ["서버 도착 완료", "Arrived at the Server"]
                : stoppedAt
                    ? ["연결을 켠 뒤 다시 보내기", "Reconnect and Send Again"]
                    : ["패킷 한 단계 보내기", "Send Packet One Step"];
            setBilingualButtonLabel(send, ...sendLabel);
            status.textContent = stoppedAt ? stoppedMessages[stoppedAt] : arrivalMessages[step];
        };
        links.forEach((link) => link.addEventListener("click", () => {
            const enabled = link.getAttribute("aria-pressed") !== "true";
            link.setAttribute("aria-pressed", String(enabled));
            step = 0;
            stoppedAt = "";
            show();
            status.textContent = `${link.querySelector("span").textContent}을 ${enabled ? "켰습니다" : "껐습니다"}. 새 연결 상태를 시험하도록 패킷을 내 기기로 돌렸습니다.`;
        }));
        send.addEventListener("click", () => {
            if (step >= linkNames.length) return;
            const requiredLink = links[step];
            if (requiredLink.getAttribute("aria-pressed") !== "true") {
                stoppedAt = linkNames[step];
                show();
                return;
            }
            stoppedAt = "";
            step += 1;
            show();
        });
        reset.addEventListener("click", () => {
            links.forEach((link) => link.setAttribute("aria-pressed", "true"));
            step = 0;
            stoppedAt = "";
            show();
            send.focus();
        });
        show();
    }

    function setupRequestLab() {
        const lab = document.querySelector("[data-request-lab]");
        if (!lab) return;
        const address = lab.querySelector("[data-request-address]");
        const action = lab.querySelector("[data-request-action]");
        const reset = lab.querySelector("[data-request-reset]");
        const status = lab.querySelector("[data-request-status]");
        const protocol = lab.querySelector('[data-url-part="protocol"]');
        const domain = lab.querySelector('[data-url-part="domain"]');
        const path = lab.querySelector('[data-url-part="path"]');
        const dnsState = lab.querySelector("[data-dns-state]");
        const dnsQuery = lab.querySelector("[data-dns-query]");
        const dnsAnswer = lab.querySelector("[data-dns-answer]");
        const serverState = lab.querySelector("[data-server-state]");
        const requestRecord = lab.querySelector("[data-http-request]");
        const serverFile = lab.querySelector("[data-server-file]");
        const responseRecord = lab.querySelector("[data-http-response]");
        const routeLabel = lab.querySelector("[data-request-wire] span");
        const emptyPage = lab.querySelector(".browser-empty-page");
        const finishedPage = lab.querySelector("[data-finished-page]");
        const actionLabels = [["주소 읽기", "Read the Address"], ["DNS 이름 조회", "Look Up the DNS Name"], ["서버 요청 보내기", "Send the Server Request"], ["응답 받기", "Receive the Response"], ["브라우저에 표시", "Display in the Browser"], ["페이지 표시 완료", "Page Display Complete"]];
        const messages = [
            "주소창의 URL을 읽기 전입니다. URL은 서버의 숫자 주소나 페이지 내용 그 자체가 아닙니다.",
            "URL에서 통신 방법·도메인 이름·페이지 경로를 나눴습니다. 아직 서버의 IP 주소는 찾지 않았습니다.",
            "DNS가 도메인 이름을 서버의 IP 주소와 연결했습니다. DNS가 페이지 내용을 보내거나 로그인 판단을 한 것은 아닙니다.",
            "브라우저가 찾은 IP 주소의 서버에 페이지 경로를 적은 요청을 보냈습니다. 응답은 아직 오지 않았습니다.",
            "서버가 요청한 자료를 찾아 200 OK 응답과 HTML 내용을 돌려줬습니다. 브라우저 화면에는 아직 그리지 않았습니다.",
            "브라우저가 응답의 HTML을 읽어 글과 화면 구조로 표시했습니다. URL·DNS·요청·응답·표시의 역할이 모두 이어졌습니다."
        ];
        let stage = 0;
        let parsedAddress = null;
        const show = () => {
            lab.dataset.requestStage = String(stage);
            const hasUrl = stage >= 1;
            const hasDns = stage >= 2;
            const hasRequest = stage >= 3;
            const hasResponse = stage >= 4;
            const hasDisplay = stage >= 5;
            protocol.textContent = hasUrl ? parsedAddress.protocol.replace(":", "") : "읽기 전";
            domain.textContent = hasUrl ? parsedAddress.hostname : "읽기 전";
            path.textContent = hasUrl ? parsedAddress.pathname || "/" : "읽기 전";
            dnsState.textContent = hasDns ? "조회 완료" : "조회 전";
            dnsQuery.textContent = hasDns ? parsedAddress.hostname : "—";
            dnsAnswer.textContent = hasDns ? "203.0.113.24" : "—";
            serverState.textContent = hasResponse ? "응답 보냄" : hasRequest ? "요청 받음" : "요청 대기";
            requestRecord.textContent = hasRequest ? `GET ${parsedAddress.pathname || "/"}\nHost: ${parsedAddress.hostname}` : "아직 요청 없음";
            serverFile.textContent = hasRequest ? "otter.html" : "—";
            responseRecord.textContent = hasResponse ? "HTTP/1.1 200 OK\nContent-Type: text/html" : "아직 응답 없음";
            routeLabel.textContent = hasResponse ? "서버의 응답 → 브라우저" : hasRequest ? "브라우저의 요청 → 서버" : "브라우저의 요청";
            emptyPage.hidden = hasDisplay;
            finishedPage.hidden = !hasDisplay;
            address.disabled = stage > 0;
            action.disabled = stage === 5;
            setBilingualButtonLabel(action, ...actionLabels[stage]);
            status.textContent = messages[stage];
        };
        action.addEventListener("click", () => {
            if (stage === 0) {
                try {
                    parsedAddress = new URL(address.value.trim());
                    if (!["http:", "https:"].includes(parsedAddress.protocol)
                        || parsedAddress.hostname !== "animals.example"
                        || parsedAddress.pathname !== "/otter") throw new Error("invalid lesson address");
                } catch (_) {
                    status.textContent = "이 실험에서는 https://animals.example/otter 주소를 사용합니다. 통신 방법·도메인 이름·페이지 경로를 확인해 다시 입력하세요.";
                    address.focus();
                    return;
                }
            }
            stage = Math.min(5, stage + 1);
            show();
        });
        reset.addEventListener("click", () => {
            stage = 0;
            parsedAddress = null;
            address.value = "https://animals.example/otter";
            show();
            address.focus();
        });
        show();
    }

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

    function setupAccountLab() {
        const lab = document.querySelector("[data-account-lab]");
        if (!lab) return;
        const previous = lab.querySelector("[data-account-prev]");
        const next = lab.querySelector("[data-account-next]");
        const status = lab.querySelector("[data-account-status]");
        const nameInput = lab.querySelector("[data-account-name]");
        const secretInput = lab.querySelector("[data-account-secret]");
        const codeInput = lab.querySelector("[data-account-code]");
        const permissionResult = lab.querySelector("[data-permission-result]");
        const profileName = lab.querySelector("[data-profile-name]");
        const profileStatus = lab.querySelector("[data-profile-status]");
        const profileChange = lab.querySelector("[data-profile-change]");
        let stage = 1;
        const setStatus = (markup, tone = "") => {
            status.innerHTML = markup;
            status.dataset.tone = tone;
        };
        const show = (message = "") => {
            lab.dataset.accountStage = String(stage);
            previous.disabled = stage === 1;
            next.innerHTML = stage === 3
                ? '처음부터 <small>Reset</small>'
                : '확인하고 다음 <small>Check and Continue</small>';
            lab.querySelectorAll("[data-account-step]").forEach((item) => item.classList.toggle("is-current", item.dataset.accountStep === String(stage)));
            if (message) {
                setStatus(message);
                return;
            }
            if (stage === 1) setStatus("<b>1. 식별·첫 번째 인증</b>　계정 카드와 같은 두 정보를 직접 입력하세요.");
            if (stage === 2) setStatus("<b>2. 두 번째 인증</b>　비밀번호와 다른 종류의 증거인 등록 기기 번호를 입력하세요.");
            if (stage === 3) setStatus("<b>3. 권한</b>　로그인한 학생 계정이 두 요청을 각각 수행할 수 있는지 확인하세요.");
        };
        const reset = () => {
            stage = 1;
            nameInput.value = "";
            secretInput.value = "";
            codeInput.value = "";
            lab.dataset.accountAccess = "idle";
            permissionResult.innerHTML = "<b>요청 전</b><span>서버가 학생 계정에 정해진 권한을 아직 확인하지 않았습니다.</span>";
            lab.querySelectorAll("[data-permission-attempt]").forEach((button) => button.setAttribute("aria-pressed", "false"));
            profileName.textContent = "민준";
            profileChange.setAttribute("aria-pressed", "false");
            profileStatus.textContent = "표시 이름을 바꾸어도 계정 ID와 로그인 권한은 그대로입니다.";
            show();
            nameInput.focus();
        };
        previous.addEventListener("click", () => {
            stage = Math.max(1, stage - 1);
            show();
        });
        next.addEventListener("click", () => {
            if (stage === 1) {
                if (nameInput.value.trim() !== "student01" || secretInput.value !== "cedar27") {
                    setStatus("<b>로그인하지 못했습니다.</b>　연습용 계정 카드의 계정 이름과 비밀 문구를 한 글자씩 비교하세요.", "error");
                    return;
                }
                stage = 2;
                show("<b>첫 번째 인증 통과.</b>　비밀번호를 알아도 등록된 기기가 없으면 다음 확인을 통과할 수 없습니다.");
                codeInput.focus();
                return;
            }
            if (stage === 2) {
                if (codeInput.value.replace(/\D/g, "") !== "482169") {
                    setStatus("<b>등록 기기 번호가 맞지 않습니다.</b>　태블릿 화면의 여섯 자리를 순서대로 다시 확인하세요.", "error");
                    return;
                }
                stage = 3;
                show("<b>로그인 성공.</b>　이제 서버가 요청한 기능별로 학생 계정의 권한을 따로 확인합니다.");
                return;
            }
            reset();
        });
        lab.querySelectorAll("[data-permission-attempt]").forEach((button) => button.addEventListener("click", () => {
            const allowed = button.dataset.permissionAttempt === "assignment";
            lab.dataset.accountAccess = allowed ? "allowed" : "blocked";
            lab.querySelectorAll("[data-permission-attempt]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            permissionResult.innerHTML = allowed
                ? "<b>허용됨 · 200 OK</b><span>학생 역할에 ‘내 과제 읽기’ 권한이 있어 서버가 과제 데이터를 보냅니다.</span>"
                : "<b>거부됨 · 403 Forbidden</b><span>로그인은 되었지만 ‘다른 학생 점수 수정’ 권한은 없어 서버가 요청을 막습니다.</span>";
            setStatus(allowed
                ? "<b>인증과 권한은 다릅니다.</b>　사용자가 누구인지 확인한 뒤에도, 요청한 일을 해도 되는지 다시 검사했습니다."
                : "<b>권한 거부는 로그인 실패가 아닙니다.</b>　학생 계정으로 확인되었지만 이 기능은 교사 역할에만 허용됩니다.");
        }));
        profileChange.addEventListener("click", () => {
            const changed = profileChange.getAttribute("aria-pressed") !== "true";
            profileChange.setAttribute("aria-pressed", String(changed));
            profileName.textContent = changed ? "민준 · 과학 모둠" : "민준";
            profileStatus.innerHTML = changed
                ? "<b>프로필만 바뀜.</b> 계정 ID는 student01이고, 로그인 정보와 학생 권한도 그대로입니다."
                : "<b>표시 이름을 되돌림.</b> 프로필 표현은 바뀌어도 계정의 식별값은 student01입니다.";
        });
        [nameInput, secretInput, codeInput].forEach((input) => input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") next.click();
        }));
        codeInput.addEventListener("input", () => {
            codeInput.value = codeInput.value.replace(/\D/g, "").slice(0, 6);
        });
        show();
    }

    function setupEvidenceLab() {
        const lab = document.querySelector("[data-evidence-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-evidence-status]");
        const evidenceChoices = [...lab.querySelectorAll("[data-evidence-choice]")];
        const evidenceRecords = [...lab.querySelectorAll("[data-evidence-record]")];
        const evidenceCheck = lab.querySelector("[data-evidence-check]");
        const evidenceReset = lab.querySelector("[data-evidence-reset]");
        const evidenceLabels = {
            link: "실제 링크 주소가 login-help.example 아래임",
            secret: "비밀번호와 일회용 인증번호를 함께 요구함",
            urgency: "10분 제한으로 확인을 재촉함",
            name: "보이는 이름에 학교 포털이 적혀 있음",
            time: "오전 10시 18분에 받음"
        };
        let evidenceSolved = false;
        const updateEvidence = () => {
            const selected = evidenceChoices.filter((button) => button.getAttribute("aria-pressed") === "true");
            evidenceCheck.disabled = selected.length !== 3;
            evidenceRecords.forEach((record, index) => {
                const choice = selected[index];
                record.classList.toggle("is-filled", Boolean(choice));
                record.querySelector("span").textContent = choice ? evidenceLabels[choice.dataset.evidenceChoice] : "선택 안 함";
            });
            status.textContent = selected.length === 0
                ? "메시지 안에서 근거 세 곳을 누르세요. 세 곳을 모두 고른 뒤에만 전체 판단을 확인할 수 있습니다."
                : selected.length < 3
                    ? "3개 중 " + selected.length + "개를 골랐습니다. 세 근거를 함께 골라야 확인할 수 있습니다."
                    : selected.length === 3
                        ? "세 곳을 골랐습니다. 검사 기록이 모두 위험을 직접 뒷받침하는지 확인하세요."
                        : selected.length + "개를 골랐습니다. 정확히 3개가 되도록 선택을 줄이세요.";
        };
        evidenceChoices.forEach((button) => button.addEventListener("click", () => {
            if (evidenceSolved) return;
            const pressed = button.getAttribute("aria-pressed") === "true";
            button.setAttribute("aria-pressed", String(!pressed));
            evidenceChoices.forEach((item) => item.classList.remove("is-found", "is-wrong"));
            updateEvidence();
        }));
        evidenceCheck.addEventListener("click", () => {
            const selected = evidenceChoices.filter((button) => button.getAttribute("aria-pressed") === "true");
            const correct = selected.length === 3 && selected.every((button) => button.dataset.evidenceCorrect === "true");
            if (correct) {
                evidenceSolved = true;
                selected.forEach((button) => button.classList.add("is-found"));
                evidenceChoices.forEach((button) => { button.disabled = true; });
                status.textContent = "세 근거가 서로 맞물립니다. 링크를 열지 말고 공식 주소를 직접 입력하거나 선생님에게 다른 방법으로 확인하세요.";
                evidenceCheck.disabled = true;
                return;
            }
            evidenceChoices.forEach((button) => button.classList.remove("is-wrong"));
            status.textContent = "고른 세 곳 중 하나 이상은 위험을 직접 뒷받침하지 못합니다. 개별 정답 표시는 하지 않습니다. 실제 주소·요구 정보·재촉 표현을 다시 대조하세요.";
        });
        evidenceReset.addEventListener("click", () => {
            evidenceSolved = false;
            evidenceChoices.forEach((button) => {
                button.disabled = false;
                button.setAttribute("aria-pressed", "false");
                button.classList.remove("is-found", "is-wrong");
            });
            updateEvidence();
            evidenceChoices[0].focus();
        });
        updateEvidence();
        const citizenshipStatus = lab.querySelector("[data-citizenship-status]");
        const citizenshipMessages = {
            privacy: "<b>개인정보 Privacy:</b> 공개 범위를 바꾸면 같은 게시물을 볼 수 있는 사람이 달라집니다.",
            copyright: "<b>저작권·라이선스 Copyright & License:</b> 사용 목적과 표시 방법이 작품의 이용 조건에 맞는지 비교합니다.",
            footprint: "<b>디지털 발자국 Digital Footprint:</b> 내 게시물을 지워도 다른 사람이 만든 복사본과 서비스 기록은 별개의 상태입니다.",
            wellbeing: "<b>디지털 기기 건강 Digital Well-being:</b> 거리 한 가지가 아니라 글자 크기·자세·학습과 휴식의 리듬을 함께 조절합니다."
        };
        lab.querySelectorAll("[data-citizenship-choice]").forEach((button) => button.addEventListener("click", () => {
            const choice = button.dataset.citizenshipChoice;
            lab.querySelectorAll("[data-citizenship-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            lab.querySelectorAll("[data-citizenship-panel]").forEach((panel) => { panel.hidden = panel.dataset.citizenshipPanel !== choice; });
            citizenshipStatus.innerHTML = citizenshipMessages[choice];
        }));
        const privacyResult = lab.querySelector("[data-privacy-result]");
        const audiences = {
            public: ["인터넷을 보는 사람", "이름·사진·촬영 위치가 계정 밖의 사람에게도 보일 수 있습니다."],
            class: ["우리 학급 24명", "이름·사진·촬영 위치를 볼 수 있습니다."],
            private: ["이 계정의 사용자", "다른 계정에는 게시물이 표시되지 않습니다."]
        };
        lab.querySelectorAll("[data-privacy-audience]").forEach((button) => button.addEventListener("click", () => {
            const choice = button.dataset.privacyAudience;
            lab.querySelectorAll("[data-privacy-audience]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            privacyResult.innerHTML = "<b>" + audiences[choice][0] + "</b><span>" + audiences[choice][1] + "</span>";
        }));
        const credit = lab.querySelector("[data-license-credit]");
        const purpose = lab.querySelector("[data-license-purpose]");
        const licenseResult = lab.querySelector("[data-license-result]");
        const updateLicense = () => {
            if (!credit.checked) {
                licenseResult.innerHTML = "<b>BY 조건 부족</b><span>CC BY-NC는 만든 사람과 출처를 표시해야 합니다.</span>";
                licenseResult.dataset.state = "blocked";
                return;
            }
            if (purpose.value === "sale") {
                licenseResult.innerHTML = "<b>NC 조건과 충돌</b><span>NC는 상업적 이용을 허용하지 않으므로 판매용 포스터에는 사용할 수 없습니다.</span>";
                licenseResult.dataset.state = "blocked";
                return;
            }
            licenseResult.innerHTML = "<b>조건 충족</b><span>출처를 표시한 학교 발표 자료는 BY와 NC 조건에 맞습니다.</span>";
            licenseResult.dataset.state = "allowed";
        };
        credit.addEventListener("change", updateLicense);
        purpose.addEventListener("change", updateLicense);
        const footprintResult = lab.querySelector("[data-footprint-result]");
        const footprintButtons = Object.fromEntries(Array.from(lab.querySelectorAll("[data-footprint-action]")).map((button) => [button.dataset.footprintAction, button]));
        const footprintCopies = Object.fromEntries(Array.from(lab.querySelectorAll("[data-footprint-copy]")).map((item) => [item.dataset.footprintCopy, item]));
        let footprint = { original: false, friend: false, log: false };
        const renderFootprint = (message = "게시·복사·삭제를 차례로 눌러 남는 기록을 관찰하세요.") => {
            Object.entries(footprintCopies).forEach(([key, item]) => {
                item.classList.toggle("is-present", footprint[key]);
                item.querySelector("b").textContent = footprint[key] ? "남아 있음" : "없음";
            });
            footprintButtons.copy.disabled = !footprint.original || footprint.friend;
            footprintButtons.delete.disabled = !footprint.original;
            const remaining = [footprint.friend && "친구의 복사본", footprint.log && "서비스 기록"].filter(Boolean);
            footprintResult.innerHTML = "<b>" + (footprint.original ? "내 게시물 표시 중" : "내 게시물 없음") + "</b><span>" + message + (remaining.length ? " 현재 남은 것: " + remaining.join(", ") + "." : "") + "</span>";
        };
        footprintButtons.post.addEventListener("click", () => {
            footprint.original = true;
            footprint.log = true;
            renderFootprint(footprint.friend
                ? "다시 게시해도 친구 기기에 있던 이전 복사본은 사라지지 않습니다."
                : "게시 순간 서비스 기록이 함께 생겼습니다.");
        });
        footprintButtons.copy.addEventListener("click", () => {
            footprint.friend = true;
            renderFootprint("친구의 기기에 별도 복사본이 생겼습니다.");
        });
        footprintButtons.delete.addEventListener("click", () => {
            footprint.original = false;
            renderFootprint("내 화면의 게시물은 지워졌지만 다른 저장 위치는 함께 지워지지 않았습니다.");
        });
        footprintButtons.reset.addEventListener("click", () => {
            footprint = { original: false, friend: false, log: false };
            renderFootprint();
        });
        renderFootprint();
        const distance = lab.querySelector("[data-screen-distance]");
        const distanceOutput = lab.querySelector("[data-distance-output]");
        const wellbeingResult = lab.querySelector("[data-wellbeing-result]");
        let studyCount = 0;
        let restCount = 0;
        let waitingForRest = false;
        const updateDistance = () => {
            const centimeters = Number(distance.value);
            distanceOutput.textContent = centimeters + " cm";
            const note = centimeters < 30
                ? "화면이 매우 가깝습니다. 글자를 키우고 기기를 조금 멀리 놓아 보세요."
                : centimeters > 60
                    ? "화면이 멉니다. 몸을 숙이지 않도록 글자 크기와 기기 위치를 조절하세요."
                    : "일반적인 작업 거리 범위에 있지만 자세와 글자 크기도 함께 살펴야 합니다.";
            wellbeingResult.innerHTML = "<b>" + centimeters + " cm</b><span>" + note + "</span>";
        };
        distance.addEventListener("input", updateDistance);
        lab.querySelectorAll("[data-rest-action]").forEach((button) => button.addEventListener("click", () => {
            if (button.dataset.restAction === "study") {
                if (waitingForRest) {
                    wellbeingResult.innerHTML = "<b>먼저 눈 휴식이 필요함</b><span>이미 25분 학습을 기록했습니다. 다음 학습을 더하기 전에 5분 동안 화면에서 눈을 떼세요.</span>";
                    return;
                }
                studyCount += 1;
                waitingForRest = true;
            } else {
                if (!waitingForRest) {
                    wellbeingResult.innerHTML = "<b>학습 기록이 먼저 필요함</b><span>이 기록표에서는 25분 학습 뒤의 5분 눈 휴식을 한 묶음으로 확인합니다.</span>";
                    return;
                }
                restCount += 1;
                waitingForRest = false;
            }
            lab.querySelector("[data-study-count]").textContent = String(studyCount);
            lab.querySelector("[data-rest-count]").textContent = String(restCount);
            wellbeingResult.innerHTML = waitingForRest
                ? "<b>휴식 기록이 부족함</b><span>25분 학습 뒤에는 화면에서 눈을 떼고 먼 곳을 보는 5분 휴식을 기록해 보세요.</span>"
                : "<b>학습·휴식 한 묶음 기록</b><span>시간표와 몸 상태에 맞게 학습과 눈 휴식을 번갈아 배치했습니다.</span>";
        }));
        updateDistance();
    }

    function setupDebugLab() {
        const lab = document.querySelector("[data-debug-lab]");
        if (!lab) return;
        const output = lab.querySelector("[data-debug-output]");
        const code = lab.querySelector("[data-debug-code]");
        const log = lab.querySelector("[data-debug-log]");
        const run = lab.querySelector("[data-debug-run]");
        const caseButtons = [...lab.querySelectorAll("[data-debug-case]")];
        const selectedName = lab.querySelector("[data-debug-selected-name]");
        const flowCells = Object.fromEntries([...lab.querySelectorAll("[data-debug-flow]")].map((item) => [item.dataset.debugFlow, item.querySelector("span")]));
        const testedCases = new Set();
        let reproduced = false;
        let exactFixTried = false;
        const selectInput = (caseName) => {
            selectedName.textContent = (caseName === "missing" ? "bird" : caseName) + ".webp";
            caseButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.debugCase === caseName)));
        };
        const showOutputMessage = (title, detail, state = "message") => {
            const message = document.createElement("div");
            message.className = "debug-output-message";
            const icon = document.createElement("i");
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = state === "error" || state === "missing" ? "!" : "▶";
            const heading = document.createElement("b");
            heading.textContent = title;
            const copy = document.createElement("span");
            copy.textContent = detail;
            message.append(icon, heading, copy);
            output.dataset.previewState = state;
            output.replaceChildren(message);
        };
        const showPhotoPreview = (name) => {
            const sourceButton = caseButtons.find((button) => button.dataset.debugCase === name);
            if (!sourceButton?.dataset.debugSrc) return;
            const preview = document.createElement("figure");
            preview.className = "debug-photo-preview";
            const image = document.createElement("img");
            image.src = sourceButton.dataset.debugSrc;
            image.width = 512;
            image.height = 512;
            image.alt = sourceButton.dataset.debugAlt + " 미리보기";
            const caption = document.createElement("figcaption");
            const filename = document.createElement("b");
            filename.textContent = name + ".webp";
            const path = document.createElement("code");
            path.textContent = "/pictures/" + name + ".webp";
            caption.append(filename, path);
            preview.append(image, caption);
            output.dataset.previewState = "image";
            output.replaceChildren(preview);
        };
        const markStep = (name, complete) => {
            const step = lab.querySelector('[data-debug-step="' + name + '"]');
            if (step) step.classList.toggle("is-complete", complete);
        };
        const showDataFlow = (input, stored, processing, result) => {
            flowCells.input.textContent = input;
            flowCells.storage.textContent = stored;
            flowCells.processing.textContent = processing;
            flowCells.output.textContent = result;
        };
        const unlockRegression = () => {
            caseButtons.forEach((button) => { button.disabled = button.dataset.debugCase === "cat"; });
        };
        run.addEventListener("click", () => {
            selectInput("cat");
            const baseFolder = code.value.trim();
            const normalizedBaseFolder = baseFolder.endsWith("/") ? baseFolder : baseFolder + "/";
            const requestedPath = normalizedBaseFolder + "cat.webp";
            if (baseFolder === "/picture/" && !reproduced) {
                lab.dataset.debugStage = "error";
                reproduced = true;
                markStep("reproduce", true);
                markStep("observe", true);
                markStep("fix", false);
                markStep("retest", false);
                markStep("regression", false);
                log.textContent = "오류 재현: 같은 사진 cat.webp를 골랐지만 프로그램이 " + requestedPath + "를 찾아 멈췄습니다. 실제 폴더와 비교하세요.";
                showOutputMessage("사진을 불러오지 못했습니다.", "요청한 " + requestedPath + "에 파일이 없습니다.", "error");
                showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더와 파일 이름 조합 → " + requestedPath, "파일 없음 오류 표시");
                return;
            }
            if (normalizedBaseFolder !== "/pictures/") {
                lab.dataset.debugStage = "error";
                markStep("fix", false);
                markStep("retest", false);
                markStep("regression", false);
                log.textContent = reproduced
                    ? "아직 실제 폴더 /pictures/와 다릅니다. 기본 폴더의 철자를 다시 비교하세요."
                    : "처음 사례를 바꾸지 마세요. 기본 폴더를 /picture/로 되돌려 cat.webp 오류부터 재현하세요.";
                showOutputMessage("경로가 일치하지 않습니다.", "프로그램은 " + requestedPath + "를 찾지만 실제 파일은 /pictures/cat.webp에 있습니다.", "error");
                showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더와 파일 이름 조합 → " + requestedPath, "재현 조건 또는 폴더 이름 확인 필요");
                return;
            }
            if (!reproduced) {
                lab.dataset.debugStage = "start";
                log.textContent = "먼저 처음의 기본 폴더 /picture/와 같은 사진 cat.webp로 실행해 오류를 재현하고 기록하세요.";
                showOutputMessage("재현 기록이 없습니다.", "기본 폴더를 /picture/로 되돌린 뒤 같은 cat.webp로 먼저 실행하세요.", "message");
                showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "수정 전에 같은 조건을 재현했는지 확인", "재현 단계로 돌아가기");
                return;
            }
            exactFixTried = true;
            lab.dataset.debugStage = "retested";
            markStep("fix", true);
            markStep("retest", true);
            testedCases.add("cat");
            const catResult = lab.querySelector('[data-debug-case-result="cat"]');
            catResult.classList.add("is-pass");
            catResult.textContent = "cat.webp: 같은 입력 재시험 통과";
            const catButton = lab.querySelector('[data-debug-case="cat"]');
            catButton.classList.add("is-tested");
            log.textContent = "같은 입력 재시험 통과: cat.webp는 그대로 두고 기본 폴더만 고쳐 /pictures/cat.webp를 읽었습니다. 이제 다른 입력도 시험하세요.";
            showPhotoPreview("cat");
            showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더 /pictures/ + 파일 이름 → 경로 일치", "cat.webp 사진 표시");
            unlockRegression();
        });
        code.addEventListener("input", () => {
            const baseFolder = code.value.trim();
            const normalizedBaseFolder = baseFolder.endsWith("/") ? baseFolder : baseFolder + "/";
            const exact = normalizedBaseFolder === "/pictures/";
            const requestedPath = normalizedBaseFolder + "cat.webp";
            lab.dataset.debugStage = exact ? "fix-ready" : (reproduced ? "editing" : "start");
            markStep("fix", exact);
            markStep("retest", false);
            markStep("regression", false);
            caseButtons.forEach((button) => { button.disabled = true; });
            caseButtons.forEach((button) => button.classList.remove("is-tested"));
            selectInput("cat");
            exactFixTried = false;
            testedCases.clear();
            lab.querySelectorAll("[data-debug-case-result]").forEach((item) => {
                item.classList.remove("is-pass");
                const labels = { cat: "cat.webp: 같은 입력 재시험 전", dog: "dog.webp: 아직 시험하지 않음", missing: "bird.webp: 아직 시험하지 않음" };
                item.textContent = labels[item.dataset.debugCaseResult];
            });
            log.textContent = exact
                ? "실제 폴더와 같아졌습니다. cat.webp 입력은 그대로 둔 채 다시 실행해 수정 전후를 비교하세요."
                : "기본 폴더를 편집했습니다. 실제 폴더와 아직 다릅니다. 철자를 다시 비교하세요.";
            showOutputMessage(exact ? "수정 내용을 실행하기 전입니다." : "경로를 편집하는 중입니다.", exact ? "실행을 눌러 /pictures/cat.webp가 열리는지 확인하세요." : "프로그램 경로와 실제 폴더 /pictures/를 한 글자씩 비교하세요.", exact ? "ready" : "message");
            showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", exact ? "요청 경로 " + requestedPath + " · 실행 필요" : "요청 경로 " + requestedPath + " · 아직 다름", "아직 재시험하지 않음");
        });
        caseButtons.forEach((button) => button.addEventListener("click", () => {
            if (!exactFixTried || button.dataset.debugCase === "cat") return;
            const name = button.dataset.debugCase;
            const result = lab.querySelector('[data-debug-case-result="' + name + '"]');
            testedCases.add(name);
            result.classList.add("is-pass");
            button.classList.add("is-tested");
            selectInput(name);
            if (name === "missing") {
                result.textContent = "bird.webp: 없음 오류를 예상대로 처리함";
                showOutputMessage("bird.webp를 찾지 못했습니다.", "/pictures/ 폴더에는 cat.webp와 dog.webp만 있습니다. 없는 파일을 오류로 처리했습니다.", "missing");
                showDataFlow("선택한 사진 bird.webp", "실제 파일 없음", "기본 폴더 + 파일 이름 → 존재 여부: 아니요", "파일 없음 오류 표시");
            } else {
                result.textContent = name + ".webp: 사진 표시 통과";
                showPhotoPreview(name);
                showDataFlow("선택한 사진 " + name + ".webp", "실제 파일 /pictures/" + name + ".webp", "기본 폴더 + 파일 이름 → 존재 여부: 예", (name === "dog" ? "강아지" : "고양이") + " 사진 표시");
            }
            button.disabled = true;
            if (testedCases.size === caseButtons.length) {
                lab.dataset.debugStage = "success";
                markStep("regression", true);
                log.textContent = "검증 완료: 같은 입력 재시험, 다른 파일, 없는 파일에서 예상한 결과가 나왔습니다.";
            } else {
                log.textContent = "전체 시험 " + testedCases.size + "/3 통과. 남은 입력도 시험하세요.";
            }
        }));
        selectInput("cat");
        showDataFlow("선택한 사진 cat.webp", "실제 파일 /pictures/cat.webp", "기본 폴더 /picture/ + 파일 이름 → 실행 전", "아직 결과 없음");
    }

    function setupPointerLab() {
        const lab = document.querySelector("[data-pointer-lab]");
        if (!lab) return;
        const surface = lab.querySelector("[data-pointer-surface]");
        const screenPointer = lab.querySelector("[data-screen-pointer]");
        const file = lab.querySelector("[data-pointer-file]");
        const folder = lab.querySelector("[data-pointer-folder]");
        const folderFile = lab.querySelector("[data-folder-file]");
        const folderCount = lab.querySelector("[data-folder-count]");
        const input = lab.querySelector("[data-pointer-input]");
        const status = lab.querySelector("[data-pointer-status]");
        const kind = lab.querySelector("[data-pointer-kind]");
        const press = lab.querySelector("[data-pointer-press]");
        const focus = lab.querySelector("[data-pointer-focus]");
        const location = lab.querySelector("[data-pointer-location]");
        const resetButton = lab.querySelector("[data-pointer-reset]");
        const steps = Array.from(lab.querySelectorAll("[data-pointer-step]"));
        let selected = false;
        let moved = false;
        let dragging = false;
        let dragStarted = false;
        let suppressClick = false;
        let startX = 0;
        let startY = 0;

        const showPointer = (clientX, clientY) => {
            const rect = surface.getBoundingClientRect();
            const x = Math.max(8, Math.min(rect.width - 48, clientX - rect.left));
            const y = Math.max(8, Math.min(rect.height - 70, clientY - rect.top));
            screenPointer.style.left = `${x}px`;
            screenPointer.style.top = `${y}px`;
        };
        const markSteps = (state) => {
            const order = ["point", "press", "drag", "drop"];
            const currentIndex = order.indexOf(state);
            steps.forEach((item, index) => {
                item.classList.toggle("is-current", index === currentIndex && state !== "drop");
                item.classList.toggle("is-complete", state === "drop" || index < currentIndex);
            });
        };
        const render = () => {
            lab.dataset.fileLocation = moved ? "folder" : "desktop";
            file.hidden = moved;
            folderFile.hidden = !moved;
            folderCount.textContent = moved ? "1개" : "0개";
            file.setAttribute("aria-pressed", String(selected && !moved));
            file.classList.toggle("is-selected", selected && !moved);
            folder.classList.toggle("has-file", moved);
            location.textContent = moved ? "과제 폴더" : "바탕화면";
        };
        const selectFile = () => {
            if (moved) return;
            selected = true;
            lab.dataset.pointerState = "click";
            kind.textContent = "화살표 포인터";
            press.textContent = "짧게 눌렀다 놓음";
            focus.textContent = "관찰.txt 선택";
            status.textContent = "클릭으로 관찰.txt를 선택했습니다. 테두리만 바뀌었고 파일 위치는 아직 바뀌지 않았습니다.";
            markSteps("point");
            render();
        };
        const moveFile = () => {
            if (moved) return;
            selected = false;
            moved = true;
            dragging = false;
            dragStarted = false;
            file.style.transform = "";
            lab.dataset.pointerState = "drop";
            kind.textContent = "드롭 위치 표시";
            press.textContent = "폴더 위에서 놓음";
            focus.textContent = "과제 폴더";
            status.textContent = "폴더 위에서 놓는 순간 관찰.txt의 위치가 바탕화면에서 과제 폴더로 바뀌었습니다. 이것이 드래그 앤 드롭의 결과입니다.";
            markSteps("drop");
            render();
        };
        surface.addEventListener("pointermove", (event) => showPointer(event.clientX, event.clientY));
        file.addEventListener("pointerenter", () => {
            if (moved || dragging) return;
            lab.dataset.pointerState = "point";
            kind.textContent = "화살표 포인터";
            press.textContent = "누르지 않음";
            status.textContent = "포인터가 관찰.txt의 화면 위치를 가리킵니다. 가리키기만 해서는 파일이 선택되거나 이동하지 않습니다.";
            markSteps("point");
        });
        file.addEventListener("pointerdown", (event) => {
            if (moved || event.button > 0) return;
            dragging = true;
            dragStarted = false;
            startX = event.clientX;
            startY = event.clientY;
            file.setPointerCapture?.(event.pointerId);
            lab.dataset.pointerState = "press";
            press.textContent = "누른 채 유지";
            focus.textContent = "관찰.txt를 잡음";
            status.textContent = "파일을 누른 채 잡았습니다. 아직 놓지 않았으므로 저장 위치는 바탕화면 그대로입니다.";
            markSteps("press");
        });
        file.addEventListener("pointermove", (event) => {
            if (!dragging) return;
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            if (Math.hypot(dx, dy) < 7 && !dragStarted) return;
            dragStarted = true;
            suppressClick = true;
            event.preventDefault();
            file.style.transform = `translate(${dx}px, ${dy}px) scale(.96)`;
            lab.dataset.pointerState = "drag";
            press.textContent = "누른 채 이동 중";
            kind.textContent = "파일과 함께 이동하는 포인터";
            status.textContent = "누른 상태를 유지한 채 파일을 움직이고 있습니다. 폴더가 강조되면 그 위에서 놓으세요.";
            const folderRect = folder.getBoundingClientRect();
            const overFolder = event.clientX >= folderRect.left && event.clientX <= folderRect.right && event.clientY >= folderRect.top && event.clientY <= folderRect.bottom;
            folder.classList.toggle("is-drop-target", overFolder);
            markSteps("drag");
        });
        const finishPointer = (event) => {
            if (!dragging) return;
            dragging = false;
            folder.classList.remove("is-drop-target");
            const folderRect = folder.getBoundingClientRect();
            const dropped = dragStarted && event.clientX >= folderRect.left && event.clientX <= folderRect.right && event.clientY >= folderRect.top && event.clientY <= folderRect.bottom;
            if (dropped) moveFile();
            else if (dragStarted) {
                file.style.transform = "";
                lab.dataset.pointerState = "click";
                press.textContent = "놓음";
                status.textContent = "폴더 밖에서 놓아 파일이 원래 자리로 돌아왔습니다. 드롭 위치가 결과를 결정합니다.";
                markSteps("drag");
            } else selectFile();
            window.setTimeout(() => { suppressClick = false; }, 0);
        };
        file.addEventListener("pointerup", finishPointer);
        file.addEventListener("pointercancel", finishPointer);
        file.addEventListener("click", () => {
            if (suppressClick || dragging) return;
            selectFile();
        });
        folder.addEventListener("click", () => {
            if (selected && !moved) {
                moveFile();
                status.textContent = "선택한 관찰.txt에 ‘과제 폴더로 이동’ 명령을 실행했습니다. 키보드에서는 드래그 대신 선택 후 이동 명령을 사용할 수 있습니다.";
                return;
            }
            focus.textContent = "과제 폴더";
            status.textContent = moved ? "과제 폴더 안에 관찰.txt가 있습니다." : "과제 폴더를 열었습니다. 이동할 파일을 먼저 선택하거나 끌어 놓으세요.";
        });
        input.addEventListener("focus", () => {
            lab.dataset.pointerState = "caret";
            kind.textContent = "깜박이는 텍스트 커서";
            press.textContent = "입력 칸 클릭 완료";
            focus.textContent = "메모 입력 칸";
            status.textContent = "입력 칸 안의 깜박이는 선은 텍스트 커서입니다. 화살표 포인터와 달리 다음 글자가 들어갈 문장 속 자리를 표시합니다.";
            markSteps("");
        });
        input.addEventListener("input", () => {
            status.textContent = `텍스트 커서 위치에 글자가 입력되었습니다. 현재 메모는 ${input.value.length}글자입니다.`;
        });
        resetButton.addEventListener("click", () => {
            selected = false;
            moved = false;
            dragging = false;
            dragStarted = false;
            file.style.transform = "";
            input.value = "오늘 관찰한 것은 ";
            lab.dataset.pointerState = "point";
            kind.textContent = "화살표 포인터";
            press.textContent = "누르지 않음";
            focus.textContent = "없음";
            status.textContent = "화면 위에서 마우스·트랙패드를 움직이면 포인터가 위치를 가리킵니다. 아직 파일은 선택되지 않았습니다.";
            screenPointer.style.left = "34%";
            screenPointer.style.top = "31%";
            markSteps("point");
            render();
        });
        screenPointer.style.left = "34%";
        screenPointer.style.top = "31%";
        markSteps("point");
        render();
    }

    function setupGestureLab() {
        const lab = document.querySelector("[data-gesture-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-gesture-status]");
        const surface = lab.querySelector("[data-gesture-surface]");
        const fingerCount = lab.querySelector("[data-finger-count]");
        const pressTime = lab.querySelector("[data-press-time]");
        const moveDistance = lab.querySelector("[data-move-distance]");
        const photo = surface.querySelector(".photo-card:not(.photo-card-next)");
        const photoName = photo.querySelector("b");
        const menuResult = lab.querySelector("[data-gesture-action-result]");
        const copy = {
            tap: [1, "0.1", "0", "<b>탭</b>은 한 손가락으로 짧게 눌렀다 놓는 동작입니다. 앱은 위치와 누른 시간을 함께 봅니다."],
            long: [1, "0.8", "0", "<b>길게 누르기</b>는 같은 위치에서 누르는 시간을 늘린 동작입니다. 보조 메뉴가 열릴 수 있습니다."],
            swipe: [1, "0.3", "186px", "<b>스와이프</b>는 누른 채 한 방향으로 빠르게 움직이는 동작입니다. 목록이나 페이지를 넘길 수 있습니다."],
            pinch: [2, "0.5", "두 점 사이 92px", "<b>핀치</b>는 두 손가락 사이 거리를 바꾸는 동작입니다. 사진이나 지도를 확대·축소할 수 있습니다."]
        };
        const detectedNames = { tap: "탭으로", long: "길게 누르기로", swipe: "스와이프로", pinch: "핀치로" };
        const present = (gesture, metrics = copy[gesture], detected = false) => {
            lab.dataset.gesture = gesture;
            surface.dataset.gestureResult = detected ? gesture : "ready";
            lab.querySelector("[data-gesture-menu]").hidden = !(detected && gesture === "long");
            lab.querySelectorAll("[data-gesture-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.gestureChoice === gesture)));
            fingerCount.textContent = metrics[0];
            pressTime.textContent = metrics[1];
            moveDistance.textContent = metrics[2];
            status.innerHTML = detected
                ? "<b>" + detectedNames[gesture] + " 감지했습니다.</b> " + copy[gesture][3].replace(/^<b>.*?<\/b>/, "")
                : copy[gesture][3];
            if (detected) {
                surface.classList.remove("is-recognized");
                window.requestAnimationFrame(() => surface.classList.add("is-recognized"));
            }
        };
        lab.querySelectorAll("[data-gesture-choice]").forEach((button) => button.addEventListener("click", () => present(button.dataset.gestureChoice)));

        const points = new Map();
        let pinchStart = null;
        let pinchDelta = 0;
        let pinchStartedAt = 0;
        const distanceBetween = (items) => Math.hypot(items[0].x - items[1].x, items[0].y - items[1].y);
        surface.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            surface.setPointerCapture?.(event.pointerId);
            points.set(event.pointerId, { startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY, startedAt: performance.now() });
            if (points.size === 2) {
                const current = Array.from(points.values());
                pinchStart = distanceBetween(current);
                pinchDelta = 0;
                pinchStartedAt = performance.now();
            }
        });
        surface.addEventListener("pointermove", (event) => {
            const point = points.get(event.pointerId);
            if (!point) return;
            point.x = event.clientX;
            point.y = event.clientY;
            if (points.size === 2 && pinchStart !== null) {
                pinchDelta = Math.max(pinchDelta, Math.abs(distanceBetween(Array.from(points.values())) - pinchStart));
            }
        });
        surface.addEventListener("pointerup", (event) => {
            const point = points.get(event.pointerId);
            if (!point) return;
            point.x = event.clientX;
            point.y = event.clientY;
            if (pinchStart !== null) {
                const elapsed = Math.max(0.1, (performance.now() - pinchStartedAt) / 1000);
                if (pinchDelta >= 24) {
                    present("pinch", [2, elapsed.toFixed(1), `두 점 사이 ${Math.round(pinchDelta)}px 변화`], true);
                } else {
                    status.innerHTML = "<b>두 손가락을 더 벌리거나 모아 보세요.</b> 두 점 사이 거리의 변화가 핀치 신호가 됩니다.";
                }
                points.clear();
                pinchStart = null;
                return;
            }
            const elapsedMs = performance.now() - point.startedAt;
            const distance = Math.hypot(point.x - point.startX, point.y - point.startY);
            points.delete(event.pointerId);
            const metrics = [1, (elapsedMs / 1000).toFixed(1), `${Math.round(distance)}px`];
            if (distance >= 80) {
                present("swipe", metrics, true);
            } else if (elapsedMs >= 600 && distance < 25) {
                present("long", metrics, true);
            } else if (elapsedMs < 500 && distance < 25) {
                present("tap", metrics, true);
            } else {
                status.innerHTML = "<b>동작을 한 번 더 해 보세요.</b> 짧게 누르기, 같은 자리에서 오래 누르기, 누른 채 80px 이상 이동하기를 구분합니다.";
            }
        });
        surface.addEventListener("pointercancel", () => {
            points.clear();
            pinchStart = null;
        });
        surface.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            present(lab.dataset.gesture || "tap", undefined, true);
        });
        lab.querySelectorAll("[data-gesture-menu-action]").forEach((button) => button.addEventListener("click", (event) => {
            event.stopPropagation();
            const action = button.dataset.gestureMenuAction;
            surface.dataset.menuAction = action;
            if (action === "share") {
                menuResult.textContent = "공유할 사람과 앱을 고르는 화면이 열렸습니다.";
                status.innerHTML = "<b>공유 명령을 실행했습니다.</b> 사진 자체가 바로 전송된 것이 아니라 다음 대상을 고르는 공유 화면이 열린 상태입니다.";
            } else if (action === "rename") {
                photoName.textContent = "과제 사진.webp";
                menuResult.textContent = "사진 1 → 과제 사진.webp";
                status.innerHTML = "<b>이름 바꾸기 명령을 실행했습니다.</b> 같은 사진의 표시 이름이 ‘과제 사진.webp’로 바뀌었습니다.";
            } else {
                photo.classList.add("is-deleted");
                photoName.textContent = "최근 삭제됨";
                menuResult.textContent = "사진이 최근 삭제 항목으로 이동했습니다.";
                status.innerHTML = "<b>삭제 명령을 실행했습니다.</b> 사진 카드가 최근 삭제 상태로 바뀌고 다음 사진이 앞으로 이동했습니다.";
            }
        }));
        present("tap");
    }

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

    function setupPixelLab() {
        const lab = document.querySelector("[data-pixel-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-display-status]");
        const scaleOutput = lab.querySelector("[data-scale-output]");
        const openButton = lab.querySelector("[data-scale-open]");
        const filePreview = lab.querySelector("[data-scale-file-preview]");
        const drawModelGrid = (grid, columns, rows) => {
            grid.replaceChildren();
            grid.style.setProperty("--model-columns", columns);
            grid.style.setProperty("--model-rows", rows);
            const fragment = document.createDocumentFragment();
            for (let index = 0; index < columns * rows; index += 1) {
                const x = index % columns;
                const y = Math.floor(index / columns);
                const nx = x / Math.max(1, columns - 1);
                const ny = y / Math.max(1, rows - 1);
                let part = "sky";
                if (ny > .82) part = "ground";
                if (ny > .34 && ny < .58 && Math.abs(nx - .5) < (.62 - ny)) part = "roof";
                if (ny >= .53 && nx > .23 && nx < .78) part = "wall";
                if (ny > .65 && nx > .42 && nx < .58) part = "window";
                const cell = document.createElement("i");
                cell.className = part;
                fragment.append(cell);
            }
            grid.append(fragment);
        };
        const setComparison = (mode) => {
            const models = {
                "same-size": {
                    a: [12, 8, "same", "12 × 8 픽셀 모형", "픽셀 칸이 큼"],
                    b: [24, 16, "same", "24 × 16 픽셀 모형", "가로·세로 2배, 전체 픽셀 4배"],
                    message: "<b>같은 화면 크기:</b> 오른쪽은 같은 넓이에 가로·세로 픽셀이 2배라 전체 픽셀 수가 4배입니다. 한 칸이 더 작고 촘촘합니다."
                },
                "same-resolution": {
                    a: [18, 12, "small", "18 × 12 · 작은 화면", "같은 길이에 픽셀이 더 촘촘함"],
                    b: [18, 12, "large", "18 × 12 · 큰 화면", "같은 픽셀 수가 더 넓게 펼쳐짐"],
                    message: "<b>같은 해상도:</b> 두 화면의 픽셀 수는 같지만 작은 화면 쪽이 같은 길이 안에 픽셀이 더 많이 들어가므로 픽셀 밀도가 높습니다."
                }
            };
            const selected = models[mode];
            lab.dataset.compareMode = mode;
            lab.querySelectorAll("[data-display-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.displayMode === mode)));
            ["a", "b"].forEach((key) => {
                const values = selected[key];
                const model = lab.querySelector('[data-screen-model="' + key + '"]');
                model.dataset.frame = values[2];
                lab.querySelector('[data-screen-label="' + key + '"]').textContent = values[3];
                lab.querySelector('[data-screen-note="' + key + '"]').textContent = values[4];
                drawModelGrid(lab.querySelector('[data-pixel-grid="' + key + '"]'), values[0], values[1]);
            });
            status.innerHTML = selected.message;
        };
        const setDisplayScale = (value) => {
            lab.dataset.uiScale = value;
            scaleOutput.textContent = value + "%";
            lab.querySelectorAll("[data-ui-scale-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.uiScaleChoice === value)));
        };
        lab.querySelectorAll("[data-display-mode]").forEach((button) => button.addEventListener("click", () => setComparison(button.dataset.displayMode)));
        lab.querySelectorAll("[data-ui-scale-choice]").forEach((button) => button.addEventListener("click", () => setDisplayScale(button.dataset.uiScaleChoice)));
        openButton.addEventListener("click", () => {
            const opening = filePreview.hidden;
            filePreview.hidden = !opening;
            openButton.setAttribute("aria-expanded", String(opening));
            setBilingualButtonLabel(openButton, opening ? "닫기" : "열기", opening ? "Close" : "Open");
            status.innerHTML = opening
                ? "<b>파일 열기:</b> 과제.pdf의 내용 화면이 열렸습니다. 표시 배율과 화면 해상도는 바뀌지 않았습니다."
                : "<b>파일 닫기:</b> 미리보기만 닫혔습니다. 픽셀 수와 표시 배율은 그대로입니다.";
        });
        setComparison("same-size");
        setDisplayScale("100");
    }

    function setupColorLab() {
        const lab = document.querySelector("[data-color-lab]");
        if (!lab) return;
        const output = lab.querySelector("[data-rgb-output]");
        const status = lab.querySelector("[data-image-status]");
        const values = { red: 210, green: 126, blue: 48 };
        const updateColor = () => {
            Object.entries(values).forEach(([name, value]) => lab.style.setProperty(`--${name}`, value));
            lab.style.setProperty("--mixed-color", `rgb(${values.red}, ${values.green}, ${values.blue})`);
            output.textContent = `R ${values.red} · G ${values.green} · B ${values.blue}`;
        };
        lab.querySelectorAll("[data-color-channel]").forEach((input) => input.addEventListener("input", () => {
            values[input.dataset.colorChannel] = Number(input.value);
            updateColor();
        }));
        const tabButtons = Array.from(lab.querySelectorAll("[data-image-panel-choice]"));
        const showPanel = (name, focus = false) => {
            lab.dataset.imagePanel = name;
            tabButtons.forEach((button) => {
                const active = button.dataset.imagePanelChoice === name;
                button.setAttribute("aria-selected", String(active));
                button.tabIndex = active ? 0 : -1;
                if (active && focus) button.focus();
            });
            lab.querySelectorAll("[data-image-panel-content]").forEach((panel) => { panel.hidden = panel.dataset.imagePanelContent !== name; });
            if (name === "rgb") status.innerHTML = "<b>RGB:</b> 세 빛의 밝기 값을 바꿔 화면 픽셀이 내는 색을 관찰하세요. RGB는 파일 형식이 아닙니다.";
            if (name === "structure") status.innerHTML = "<b>래스터와 벡터:</b> 같은 꽃을 확대해 저장된 픽셀 칸과 도형 규칙의 차이를 비교하세요.";
            if (name === "format") status.innerHTML = "<b>파일 형식:</b> 같은 원본을 실제 JPG·PNG·WebP 데이터로 만들어 크기와 투명도 결과를 비교하세요.";
        };
        tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => showPanel(button.dataset.imagePanelChoice));
            button.addEventListener("keydown", (event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const direction = event.key === "ArrowRight" ? 1 : -1;
                const next = (index + direction + tabButtons.length) % tabButtons.length;
                showPanel(tabButtons[next].dataset.imagePanelChoice, true);
            });
        });
        const raster = lab.querySelector("[data-raster-canvas]");
        const rasterContext = raster.getContext("2d");
        rasterContext.fillStyle = "#d8ece9";
        rasterContext.fillRect(0, 0, raster.width, raster.height);
        rasterContext.fillStyle = "#d57934";
        rasterContext.fillRect(13, 3, 6, 8);
        rasterContext.fillRect(13, 13, 6, 8);
        rasterContext.fillRect(6, 9, 8, 6);
        rasterContext.fillRect(18, 9, 8, 6);
        rasterContext.fillStyle = "#f2c54f";
        rasterContext.fillRect(13, 9, 6, 6);
        const zoomInput = lab.querySelector("[data-image-zoom]");
        const zoomOutput = lab.querySelector("[data-image-zoom-output]");
        const vector = lab.querySelector("[data-vector-image]");
        const setZoom = (zoom) => {
            const width = 160 * zoom;
            const height = 120 * zoom;
            raster.style.width = width + "px";
            raster.style.height = height + "px";
            vector.setAttribute("width", String(width));
            vector.setAttribute("height", String(height));
            zoomOutput.textContent = zoom + "×";
            status.innerHTML = "<b>" + zoom + "배 확대:</b> 래스터는 기존 픽셀 칸도 함께 커집니다. 벡터는 도형 규칙을 현재 크기에 맞게 다시 그립니다. 벡터도 화면에 나타날 때는 마지막에 화면 픽셀로 바뀝니다.";
        };
        zoomInput.addEventListener("input", () => setZoom(Number(zoomInput.value)));
        let formatSource = "photo";
        let formatName = "jpg";
        let objectUrl = "";
        let encodeToken = 0;
        const sourceCanvas = lab.querySelector("[data-format-source-canvas]");
        const preview = lab.querySelector("[data-format-preview]");
        const sizeOutput = lab.querySelector("[data-format-size]");
        const alphaOutput = lab.querySelector("[data-format-alpha]");
        const compressionOutput = lab.querySelector("[data-format-compression]");
        const formatInfo = {
            jpg: ["image/jpeg", .72, "지원하지 않음", "손실 압축 · 사진에 널리 사용"],
            png: ["image/png", undefined, "지원", "픽셀 값을 손실 없이 보존"],
            webp: ["image/webp", .72, "지원", "손실·무손실과 투명도를 지원"]
        };
        const drawSource = () => {
            const context = sourceCanvas.getContext("2d");
            context.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
            if (formatSource === "photo") {
                const sky = context.createLinearGradient(0, 0, 0, 240);
                sky.addColorStop(0, "#78bdd1");
                sky.addColorStop(.58, "#f1d28d");
                sky.addColorStop(1, "#628951");
                context.fillStyle = sky;
                context.fillRect(0, 0, 320, 240);
                context.fillStyle = "#456c52";
                context.beginPath();
                context.moveTo(0, 190); context.lineTo(92, 74); context.lineTo(170, 185); context.lineTo(230, 104); context.lineTo(320, 190); context.lineTo(320, 240); context.lineTo(0, 240); context.fill();
                context.fillStyle = "#f5d466";
                context.beginPath(); context.arc(255, 54, 25, 0, Math.PI * 2); context.fill();
            } else {
                context.fillStyle = "#db6f39";
                for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                    context.save();
                    context.translate(160, 120);
                    context.rotate(angle);
                    context.beginPath(); context.ellipse(0, -50, 25, 48, 0, 0, Math.PI * 2); context.fill();
                    context.restore();
                }
                context.fillStyle = "#f3cb4f";
                context.beginPath(); context.arc(160, 120, 33, 0, Math.PI * 2); context.fill();
            }
        };
        const encodeFormat = () => {
            drawSource();
            const token = ++encodeToken;
            const info = formatInfo[formatName];
            const encodeCanvas = document.createElement("canvas");
            encodeCanvas.width = sourceCanvas.width;
            encodeCanvas.height = sourceCanvas.height;
            const context = encodeCanvas.getContext("2d");
            if (formatName === "jpg") {
                context.fillStyle = "#fff";
                context.fillRect(0, 0, encodeCanvas.width, encodeCanvas.height);
            }
            context.drawImage(sourceCanvas, 0, 0);
            sizeOutput.textContent = "계산 중";
            alphaOutput.textContent = info[2];
            compressionOutput.textContent = info[3];
            encodeCanvas.toBlob((blob) => {
                if (token !== encodeToken) return;
                if (!blob || blob.type !== info[0]) {
                    sizeOutput.textContent = "이 브라우저에서 만들기 미지원";
                    preview.removeAttribute("src");
                    return;
                }
                if (objectUrl) URL.revokeObjectURL(objectUrl);
                objectUrl = URL.createObjectURL(blob);
                preview.src = objectUrl;
                preview.alt = (formatSource === "photo" ? "사진" : "투명 스티커") + "를 " + formatName.toUpperCase() + " 형식으로 실제 저장한 결과";
                sizeOutput.textContent = blob.size.toLocaleString("ko-KR") + " B";
            }, info[0], info[1]);
        };
        lab.querySelectorAll("[data-format-source]").forEach((button) => button.addEventListener("click", () => {
            formatSource = button.dataset.formatSource;
            lab.querySelectorAll("[data-format-source]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            encodeFormat();
        }));
        lab.querySelectorAll("[data-format-choice]").forEach((button) => button.addEventListener("click", () => {
            formatName = button.dataset.formatChoice;
            lab.querySelectorAll("[data-format-choice]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            encodeFormat();
        }));
        window.addEventListener("pagehide", () => { if (objectUrl) URL.revokeObjectURL(objectUrl); }, { once: true });
        updateColor();
        setZoom(1);
        encodeFormat();
        showPanel("rgb");
    }

    function setupMediaLab() {
        const lab = document.querySelector("[data-media-lab]");
        if (!lab) return;
        const panelChoices = Array.from(lab.querySelectorAll("[data-media-panel-choice]"));
        const panels = Array.from(lab.querySelectorAll("[data-media-panel]"));
        const videoFrames = Array.from(lab.querySelectorAll("[data-media-video-frame]"));
        const videoPreview = lab.querySelector("[data-video-preview]");
        const videoStatus = lab.querySelector("[data-video-status]");
        const videoPlay = lab.querySelector("[data-video-play]");
        const videoPlayLabel = lab.querySelector("[data-video-play-label]");
        const audioChoices = Array.from(lab.querySelectorAll("[data-audio-sample-choice]"));
        const audioPointGroups = Array.from(lab.querySelectorAll("[data-audio-points]"));
        const audioObservation = lab.querySelector("[data-audio-observation]");
        const captureScreen = lab.querySelector("[data-capture-screen]");
        const captureMoment = lab.querySelector("[data-capture-moment]");
        const captureNext = lab.querySelector("[data-capture-next]");
        const screenshotButton = lab.querySelector("[data-screenshot]");
        const screenshotEmpty = lab.querySelector("[data-screenshot-empty]");
        const screenshotResult = lab.querySelector("[data-screenshot-result]");
        const recordButton = lab.querySelector("[data-record-toggle]");
        const recordLabel = lab.querySelector("[data-record-label]");
        const recordIndicator = lab.querySelector("[data-recording-indicator]");
        const recordEmpty = lab.querySelector("[data-recording-empty]");
        const recordResult = lab.querySelector("[data-recording-result]");
        const recordStrip = lab.querySelector("[data-recording-strip]");
        const recordPlayback = lab.querySelector("[data-recording-play]");
        const recordPlaybackLabel = lab.querySelector("[data-recording-play-label]");
        const captureObservation = lab.querySelector("[data-capture-observation]");
        const capturePositions = [12, 26, 42, 58, 74, 86, 70, 48, 28];
        const captureDescriptions = [
            "공이 화면 왼쪽에 있습니다.", "공이 오른쪽으로 움직이고 있습니다.", "공이 화면 가운데에 도착했습니다.",
            "공이 계속 오른쪽으로 이동합니다.", "공이 화면 오른쪽에 가까워졌습니다.", "공이 오른쪽 끝에 도착했습니다.",
            "공이 다시 왼쪽으로 움직입니다.", "공이 화면 가운데로 돌아왔습니다.", "공이 왼쪽으로 돌아가는 중입니다."
        ];
        let videoIndex = 0;
        let captureIndex = 0;
        let videoTimer = 0;
        let recordTimer = 0;
        let playbackTimer = 0;
        let recordedFrames = [];

        const stopVideo = () => {
            if (videoTimer) window.clearInterval(videoTimer);
            videoTimer = 0;
            videoPlay.setAttribute("aria-pressed", "false");
            videoPlayLabel.textContent = "순서대로 재생";
            videoPlay.querySelector("small").textContent = "Play in Order";
        };
        const showVideoFrame = (index) => {
            const frame = videoFrames[index];
            if (!frame) return;
            videoIndex = index;
            videoPreview.style.setProperty("--frame-x", frame.dataset.frameX);
            videoPreview.style.setProperty("--frame-y", frame.dataset.frameY);
            videoStatus.textContent = frame.dataset.frameDescription;
            videoFrames.forEach((item, itemIndex) => item.setAttribute("aria-pressed", String(itemIndex === index)));
        };
        const setAudioSamples = (amount) => {
            audioChoices.forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.audioSampleChoice) === amount)));
            audioPointGroups.forEach((group) => { group.hidden = Number(group.dataset.audioPoints) !== amount; });
            audioObservation.textContent = amount === 8
                ? "파형은 계속 이어지지만, 디지털 기록에는 파란 점 여덟 곳에서 잰 값이 들어갑니다."
                : "같은 소리를 더 자주 측정하면 파란 점이 파형의 굽은 모양을 더 촘촘하게 따라갑니다.";
        };
        const showCaptureFrame = (index, message = "") => {
            captureIndex = (index + capturePositions.length) % capturePositions.length;
            captureScreen.style.setProperty("--capture-x", `${capturePositions[captureIndex]}%`);
            captureMoment.textContent = message || captureDescriptions[captureIndex];
        };
        const stepCapture = () => showCaptureFrame(captureIndex + 1);
        const stopPlayback = () => {
            if (playbackTimer) window.clearInterval(playbackTimer);
            playbackTimer = 0;
            recordPlayback.setAttribute("aria-pressed", "false");
            recordPlaybackLabel.textContent = "녹화 재생";
            recordPlayback.querySelector("small").textContent = "Play Recording";
        };
        const addRecordedFrame = () => {
            const captured = { position: capturePositions[captureIndex], description: captureDescriptions[captureIndex] };
            recordedFrames.push(captured);
            const frame = document.createElement("i");
            frame.style.setProperty("--capture-x", `${captured.position}%`);
            frame.setAttribute("aria-label", captured.description);
            recordStrip.append(frame);
            if (recordedFrames.length > 12) {
                recordedFrames.shift();
                recordStrip.firstElementChild?.remove();
            }
        };
        const stopRecording = (announce = true) => {
            if (recordTimer) window.clearInterval(recordTimer);
            recordTimer = 0;
            lab.dataset.recording = "false";
            recordIndicator.hidden = true;
            captureNext.disabled = false;
            recordButton.setAttribute("aria-pressed", "false");
            recordLabel.textContent = "녹화 시작";
            recordButton.querySelector("small").textContent = "Start Recording";
            recordPlayback.hidden = recordedFrames.length < 2;
            if (announce && recordedFrames.length) captureObservation.textContent = "녹화가 끝났습니다. 저장된 장면을 재생하면 기록한 시간 순서대로 다시 움직입니다.";
        };
        const startRecording = () => {
            stopPlayback();
            recordedFrames = [];
            recordStrip.replaceChildren();
            recordEmpty.hidden = true;
            recordResult.hidden = false;
            recordPlayback.hidden = true;
            lab.dataset.recording = "true";
            recordIndicator.hidden = false;
            captureNext.disabled = true;
            recordButton.setAttribute("aria-pressed", "true");
            recordLabel.textContent = "녹화 끝내기";
            recordButton.querySelector("small").textContent = "Stop Recording";
            addRecordedFrame();
            captureObservation.textContent = "녹화하는 동안 서로 다른 순간이 왼쪽부터 시간 순서대로 저장됩니다.";
            recordTimer = window.setInterval(() => {
                stepCapture();
                addRecordedFrame();
            }, 650);
        };
        const showPanel = (name) => {
            if (name !== "video") stopVideo();
            if (name !== "capture") {
                stopRecording(false);
                stopPlayback();
            }
            panelChoices.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.mediaPanelChoice === name)));
            panels.forEach((panel) => { panel.hidden = panel.dataset.mediaPanel !== name; });
        };

        panelChoices.forEach((button) => button.addEventListener("click", () => showPanel(button.dataset.mediaPanelChoice)));
        videoFrames.forEach((button, index) => button.addEventListener("click", () => {
            stopVideo();
            showVideoFrame(index);
        }));
        videoPlay.addEventListener("click", () => {
            if (videoTimer) {
                stopVideo();
                return;
            }
            if (videoIndex >= videoFrames.length - 1) showVideoFrame(0);
            videoPlay.setAttribute("aria-pressed", "true");
            videoPlayLabel.textContent = "재생 멈추기";
            videoPlay.querySelector("small").textContent = "Pause";
            videoTimer = window.setInterval(() => {
                if (videoIndex >= videoFrames.length - 1) {
                    stopVideo();
                    return;
                }
                showVideoFrame(videoIndex + 1);
            }, 560);
        });
        audioChoices.forEach((button) => button.addEventListener("click", () => setAudioSamples(Number(button.dataset.audioSampleChoice))));
        captureNext.addEventListener("click", () => {
            stopPlayback();
            stepCapture();
        });
        screenshotButton.addEventListener("click", () => {
            screenshotEmpty.hidden = true;
            screenshotResult.hidden = false;
            screenshotResult.style.setProperty("--capture-x", `${capturePositions[captureIndex]}%`);
            captureObservation.textContent = "스크린샷에는 버튼을 누른 순간의 화면 한 장만 고정되었습니다. 원래 화면은 계속 바뀔 수 있습니다.";
        });
        recordButton.addEventListener("click", () => {
            if (recordTimer) stopRecording();
            else startRecording();
        });
        recordPlayback.addEventListener("click", () => {
            if (playbackTimer) {
                stopPlayback();
                return;
            }
            if (recordedFrames.length < 2) return;
            let playbackIndex = 0;
            recordPlayback.setAttribute("aria-pressed", "true");
            recordPlaybackLabel.textContent = "재생 멈추기";
            recordPlayback.querySelector("small").textContent = "Pause";
            showCaptureFrame(capturePositions.indexOf(recordedFrames[0].position), "녹화한 장면을 시간 순서대로 재생합니다.");
            playbackTimer = window.setInterval(() => {
                playbackIndex += 1;
                if (playbackIndex >= recordedFrames.length) {
                    stopPlayback();
                    captureObservation.textContent = "재생이 끝났습니다. 화면 녹화에는 한 장뿐 아니라 장면이 바뀐 순서도 들어 있습니다.";
                    return;
                }
                showCaptureFrame(capturePositions.indexOf(recordedFrames[playbackIndex].position), "녹화한 장면을 시간 순서대로 재생합니다.");
            }, 560);
        });
        window.addEventListener("pagehide", () => {
            stopVideo();
            stopRecording(false);
            stopPlayback();
        }, { once: true });
        showVideoFrame(0);
        setAudioSamples(8);
        showCaptureFrame(0);
        showPanel("video");
    }

    function setupSamplingLab() {
        const lab = document.querySelector("[data-sampling-lab]");
        if (!lab) return;
        const input = lab.querySelector("[data-sample-index]");
        const measured = lab.querySelector("[data-sample-value]");
        const quantized = lab.querySelector("[data-quantized-value]");
        const binary = lab.querySelector("[data-binary-value]");
        const values = [21.2, 22.8, 23.6, 23.4, 22.1, 24.2, 25.8, 25.1];
        const update = () => {
            const index = Number(input.value);
            const rounded = Math.round(values[index]);
            lab.style.setProperty("--sample-position", `${11 + index * 11.3}%`);
            measured.textContent = `${values[index].toFixed(1)}°C`;
            quantized.textContent = `${rounded}°C`;
            binary.textContent = rounded.toString(2).padStart(8, "0");
        };
        input.addEventListener("input", update);
        update();
    }

    function setupBitLab() {
        const lab = document.querySelector("[data-bit-lab]");
        if (!lab) return;
        const bitButtons = Array.from(lab.querySelectorAll("[data-bit-index]"));
        const bitPattern = lab.querySelector("[data-bit-pattern]");
        const bitCount = lab.querySelector("[data-bit-count]");
        const byteValue = lab.querySelector("[data-byte-value]");
        const updateBits = () => {
            const bits = bitButtons.map((button) => button.getAttribute("aria-pressed") === "true" ? 1 : 0);
            bitButtons.forEach((button, index) => {
                button.querySelector("[data-bit-digit]").textContent = bits[index];
                button.setAttribute("aria-label", `${button.dataset.bitPlace}의 자리, 현재 ${bits[index]}`);
            });
            const compactPattern = bits.join("");
            bitPattern.textContent = `${compactPattern.slice(0, 4)} ${compactPattern.slice(4)}`;
            bitCount.textContent = bits.reduce((sum, bit) => sum + bit, 0);
            byteValue.textContent = parseInt(compactPattern, 2);
        };
        bitButtons.forEach((button) => button.addEventListener("click", () => {
            button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
            updateBits();
        }));

        const units = ["B", "KB", "MB", "GB", "TB"];
        const unitButtons = Array.from(lab.querySelectorAll("[data-unit-index]"));
        const unitRungs = Array.from(lab.querySelectorAll("[data-unit-rung]"));
        const amountInput = lab.querySelector("[data-unit-amount]");
        const amountOutput = lab.querySelector("[data-unit-amount-output]");
        const equation = lab.querySelector("[data-unit-equation]");
        const relation = lab.querySelector("[data-unit-relation]");
        const numberFormat = new Intl.NumberFormat("ko-KR");
        let activeUnit = 2;

        const updateUnits = () => {
            const amount = Number(amountInput.value);
            amountOutput.textContent = amount;
            unitButtons.forEach((button, index) => button.setAttribute("aria-pressed", String(index === activeUnit)));
            unitRungs.forEach((rung, index) => {
                rung.classList.toggle("is-active", index === activeUnit);
                rung.classList.toggle("is-smaller", index < activeUnit);
            });

            const parts = [];
            for (let unitIndex = activeUnit; unitIndex >= 0; unitIndex -= 1) {
                const converted = amount * (1000 ** (activeUnit - unitIndex));
                parts.push(`${numberFormat.format(converted)} ${units[unitIndex]}`);
            }
            equation.textContent = parts.join(" = ");
            relation.textContent = activeUnit === 0
                ? "B는 이 사다리의 기준 단위입니다. 1000 B가 모이면 1 KB가 됩니다."
                : `${units[activeUnit]}에서 ${units[activeUnit - 1]}로 한 칸 내려오면 숫자는 1000배가 됩니다.`;
        };

        unitButtons.forEach((button) => button.addEventListener("click", () => {
            activeUnit = Number(button.dataset.unitIndex);
            updateUnits();
        }));
        amountInput.addEventListener("input", updateUnits);
        updateBits();
        updateUnits();
    }

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

    function setupAlgorithmLab() {
        const lab = document.querySelector("[data-algorithm-lab]");
        if (!lab) return;
        const locationButtons = Array.from(lab.querySelectorAll("[data-algo-location]"));
        const sourcePhoto = lab.querySelector("[data-file-source]");
        const movedPhoto = lab.querySelector("[data-file-moved]");
        const sourceEmpty = lab.querySelector("[data-algo-source-empty]");
        const targetEmpty = lab.querySelector("[data-file-empty]");
        const note = lab.querySelector("[data-algo-note]");
        const pdf = lab.querySelector("[data-algo-pdf]");
        const dropzone = lab.querySelector("[data-algo-dropzone]");
        const moveButton = lab.querySelector("[data-algo-move]");
        const verifyButton = lab.querySelector("[data-algo-verify]");
        const resetButton = lab.querySelector("[data-algo-reset]");
        const backButton = lab.querySelector("[data-algo-back]");
        const path = lab.querySelector("[data-algo-path]");
        const status = lab.querySelector("[data-algo-status]");
        const fileResult = lab.querySelector("[data-file-result]");
        const trace = Array.from(lab.querySelectorAll("[data-algo-trace]"));
        let stage = 0;
        let selected = false;
        let destinationChosen = false;
        let moved = false;
        const render = () => {
            lab.dataset.algorithmStage = String(stage);
            sourcePhoto.hidden = stage < 1 || moved;
            note.hidden = stage < 1;
            pdf.hidden = stage < 1;
            sourceEmpty.hidden = !moved;
            targetEmpty.hidden = moved;
            movedPhoto.hidden = !moved;
            sourcePhoto.classList.toggle("is-selected", selected && !moved);
            sourcePhoto.setAttribute("aria-pressed", String(selected && !moved));
            dropzone.classList.toggle("is-selected", destinationChosen && !moved);
            moveButton.disabled = !selected || !destinationChosen || moved;
            verifyButton.disabled = !moved || stage >= 5;
            backButton.disabled = stage === 0;
            locationButtons.forEach((button) => button.setAttribute("aria-pressed", String(
                button.dataset.algoLocation === "downloads" ? stage >= 1 : destinationChosen
            )));
            trace.forEach((item, index) => {
                const complete = stage >= index + 1;
                item.classList.toggle("is-complete", complete);
                item.classList.toggle("is-current", !complete && stage === index);
                item.querySelector("em").textContent = complete ? "완료" : stage === index ? "다음 동작" : "대기";
            });
        };
        const reset = () => {
            stage = 0;
            selected = false;
            destinationChosen = false;
            moved = false;
            path.textContent = "내 파일";
            fileResult.textContent = "왼쪽 위치 목록에서 다운로드 폴더를 먼저 여세요.";
            status.textContent = "실행 전입니다. 알고리즘은 컴퓨터가 실행할 수 있을 만큼 대상과 순서가 분명해야 합니다.";
            render();
        };
        const openDownloads = () => {
            if (moved) return;
            stage = Math.max(stage, 1);
            path.textContent = "내 파일 › 다운로드";
            fileResult.textContent = "다운로드 폴더를 열었습니다. 옮길 river.webp를 선택하세요.";
            status.textContent = "1단계가 실행되었습니다. 시작 위치가 분명해져 다음 동작의 대상 파일을 찾을 수 있습니다.";
            render();
        };
        const chooseDestination = () => {
            if (!selected || moved) {
                status.textContent = "먼저 다운로드 폴더를 열고 river.webp를 선택해야 어느 파일을 옮길지 정해집니다.";
                return;
            }
            destinationChosen = true;
            stage = Math.max(stage, 3);
            path.textContent = "내 파일 › 다운로드　→　과제 사진";
            fileResult.textContent = "목적지를 과제 사진으로 정했습니다. 이제 이동 명령을 실행할 수 있습니다.";
            status.textContent = "3단계가 실행되었습니다. ‘어디로’ 옮길지가 정해졌지만 아직 파일의 저장 위치는 바뀌지 않았습니다.";
            render();
        };
        const moveFile = () => {
            if (!selected) return;
            destinationChosen = true;
            moved = true;
            stage = 4;
            path.textContent = "내 파일 › 과제 사진";
            fileResult.textContent = "river.webp가 과제 사진에 나타났습니다. 이동은 복사와 달리 출발 위치에서 원본 항목이 사라져야 합니다.";
            status.textContent = "4단계가 실행되었습니다. 결과를 바로 믿지 말고 출발 폴더와 도착 폴더를 함께 확인하세요.";
            render();
        };
        locationButtons.forEach((button) => {
            button.addEventListener("click", () => button.dataset.algoLocation === "downloads" ? openDownloads() : chooseDestination());
        });
        sourcePhoto.addEventListener("click", () => {
            if (stage < 1 || moved) return;
            selected = true;
            stage = Math.max(stage, 2);
            fileResult.textContent = "river.webp를 선택했습니다. 목적지 과제 사진을 누르거나 파일을 그 칸으로 끌어 놓으세요.";
            status.textContent = "2단계가 실행되었습니다. 파일 이름과 형식을 확인해 notes.txt나 homework.pdf가 아닌 river.webp를 대상으로 정했습니다.";
            render();
        });
        sourcePhoto.addEventListener("dragstart", (event) => {
            selected = true;
            stage = Math.max(stage, 2);
            event.dataTransfer?.setData("text/plain", "river.webp");
            render();
        });
        dropzone.addEventListener("dragover", (event) => { event.preventDefault(); dropzone.classList.add("is-drop-target"); });
        dropzone.addEventListener("dragleave", () => dropzone.classList.remove("is-drop-target"));
        dropzone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropzone.classList.remove("is-drop-target");
            if (event.dataTransfer?.getData("text/plain") === "river.webp") moveFile();
        });
        dropzone.addEventListener("click", chooseDestination);
        dropzone.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            chooseDestination();
        });
        moveButton.addEventListener("click", moveFile);
        verifyButton.addEventListener("click", () => {
            if (!moved) return;
            stage = 5;
            fileResult.textContent = "확인 완료: 과제 사진에는 river.webp가 있고 다운로드에는 없습니다. 따라서 복사가 아니라 이동이 끝났습니다.";
            status.textContent = "다섯 동작이 실제로 이어졌습니다. 앞 단계의 결과가 다음 단계의 시작 조건이 되는 실행 가능한 알고리즘입니다.";
            render();
        });
        backButton.addEventListener("click", reset);
        resetButton.addEventListener("click", reset);
        reset();
    }

    function setupControlLab() {
        const lab = document.querySelector("[data-control-lab]");
        if (!lab) return;
        const world = lab.querySelector("[data-control-world]");
        const robot = lab.querySelector("[data-control-robot]");
        const moveButtons = Array.from(lab.querySelectorAll("[data-control-move]"));
        const scoreOutput = lab.querySelector("[data-control-score]");
        const robotLaneOutput = lab.querySelector("[data-control-robot-lane]");
        const starLaneOutput = lab.querySelector("[data-control-star-lane]");
        const conditionOutput = lab.querySelector("[data-control-condition]");
        const status = lab.querySelector("[data-control-status]");
        const resetButton = lab.querySelector("[data-control-reset]");
        const trace = lab.querySelector("[data-loop-trace]");
        const flowSteps = Array.from(lab.querySelectorAll("[data-flow-step]"));
        const laneNames = ["왼쪽", "가운데", "오른쪽"];
        const starSequence = [2, 0, 1];
        let robotLane = 0;
        let starIndex = 0;
        let score = 0;
        let runCount = 0;
        let running = false;
        let runToken = 0;

        const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
        const setFlow = (active, completed = []) => {
            flowSteps.forEach((item) => {
                const name = item.dataset.flowStep;
                const isComplete = completed.includes(name);
                item.classList.toggle("is-active", name === active);
                item.classList.toggle("is-complete", isComplete);
                item.querySelector("em").textContent = name === active ? "실행 중" : isComplete ? "완료" : "대기";
            });
        };
        const render = () => {
            const starLane = starSequence[Math.min(starIndex, starSequence.length - 1)];
            world.style.setProperty("--robot-lane", String(robotLane));
            world.style.setProperty("--star-lane", String(starLane));
            scoreOutput.textContent = String(score);
            robotLaneOutput.textContent = laneNames[robotLane];
            starLaneOutput.textContent = score >= 3 ? "모두 모음" : laneNames[starLane];
            const controlsLocked = running || score >= 3;
            robot.disabled = controlsLocked;
            moveButtons[0].disabled = controlsLocked || robotLane === 0;
            moveButtons[1].disabled = controlsLocked || robotLane === 2;
            lab.dataset.result = score >= 3 ? "finish" : "pending";
        };
        const addTrace = (message, state) => {
            if (!trace.firstElementChild?.dataset.traceState) trace.innerHTML = "";
            const item = document.createElement("li");
            item.dataset.traceState = state;
            item.textContent = message;
            trace.append(item);
            while (trace.children.length > 5) trace.firstElementChild.remove();
            trace.scrollTop = trace.scrollHeight;
        };
        const runCheck = async () => {
            if (running || score >= 3) return;
            running = true;
            const token = ++runToken;
            const runNumber = ++runCount;
            const starLane = starSequence[starIndex];
            lab.dataset.controlStage = "event";
            conditionOutput.textContent = "검사하는 중";
            status.textContent = "1. 로봇을 누른 클릭 이벤트가 발생했습니다.";
            setFlow("event");
            render();
            await wait(320);
            if (token !== runToken) return;
            lab.dataset.controlStage = "condition";
            status.textContent = `2. 로봇 칸 ${laneNames[robotLane]}과 별 칸 ${laneNames[starLane]}이 같은지 비교합니다.`;
            setFlow("condition", ["event"]);
            await wait(420);
            if (token !== runToken) return;
            const matched = robotLane === starLane;
            lab.dataset.controlStage = matched ? "yes" : "no";
            conditionOutput.textContent = matched ? "참 (같은 칸)" : "거짓 (다른 칸)";
            world.classList.toggle("is-success", matched);
            world.classList.toggle("is-miss", !matched);
            setFlow("branch", ["event", "condition"]);
            if (matched) {
                score += 1;
                addTrace(`${runNumber}번째 실행: 같은 칸 → 참 → 별 +1`, "finish");
                status.textContent = "3. 조건이 참이어서 별을 1개 더했습니다.";
            } else {
                addTrace(`${runNumber}번째 실행: 다른 칸 → 거짓 → 점수 그대로`, "retry");
                status.textContent = "3. 조건이 거짓이어서 점수는 그대로입니다. 위치를 바꾼 뒤 다시 로봇을 누르세요.";
            }
            render();
            await wait(520);
            if (token !== runToken) return;
            world.classList.remove("is-success", "is-miss");
            if (matched && score < 3) {
                lab.dataset.controlStage = "loop";
                setFlow("loop", ["event", "condition", "branch"]);
                starIndex += 1;
                status.textContent = `4. 별이 ${3 - score}개 남아 있으므로 새 별 위치로 반복합니다.`;
                render();
                await wait(420);
                if (token !== runToken) return;
            }
            if (score >= 3) {
                lab.dataset.controlStage = "finish";
                conditionOutput.textContent = "반복 종료";
                setFlow(null, ["event", "condition", "branch", "loop"]);
                addTrace("남은 별 0개 → 반복 종료", "finish");
                status.textContent = "별 3개를 모두 모아 반복이 끝났습니다. 같은 명령 묶음을 매번 다시 쓴 것이 아니라 조건이 참일 때 반복 실행했습니다.";
                running = false;
                render();
                resetButton.focus();
                return;
            }
            lab.dataset.controlStage = "ready";
            setFlow(null);
            running = false;
            render();
        };
        moveButtons.forEach((button) => button.addEventListener("click", () => {
            if (running || score >= 3) return;
            robotLane = Math.max(0, Math.min(2, robotLane + Number(button.dataset.controlMove)));
            conditionOutput.textContent = "아직 검사 안 함";
            lab.dataset.controlStage = "ready";
            setFlow(null);
            status.textContent = `로봇을 ${laneNames[robotLane]} 칸으로 옮겼습니다. 위치 이동만으로는 조건을 검사하지 않습니다. 로봇을 누르세요.`;
            render();
        }));
        robot.addEventListener("click", runCheck);
        resetButton.addEventListener("click", () => {
            runToken += 1;
            robotLane = 0;
            starIndex = 0;
            score = 0;
            runCount = 0;
            running = false;
            lab.dataset.controlStage = "ready";
            conditionOutput.textContent = "아직 검사 안 함";
            status.textContent = "현재 로봇은 왼쪽, 별은 오른쪽에 있습니다. 위치를 바꾸고 로봇을 눌러 보세요.";
            trace.innerHTML = "<li>실행 기록이 여기에 쌓입니다.</li>";
            world.classList.remove("is-success", "is-miss");
            setFlow(null);
            render();
            moveButtons[1].focus();
        });
        setFlow(null);
        render();
    }

    window.COMPUTER_CONCEPT_VISUAL = (spec, asset) => {
        const renderer = renderers[spec.id];
        return renderer ? renderer(spec, asset) : fallbackRenderer(spec, asset);
    };
    window.COMPUTER_PREMIUM_VISUAL_IDS = Object.keys(renderers);
    window.COMPUTER_SETUP_CONCEPT_LABS = () => {
        setupPortLab();
        setupRequestRelayLab();
        setupProgramProcessLab();
        setupClipboardLab();
        setupMobileAnatomyLab();
        setupOsLab();
        setupSettingsLab();
        setupPathLab();
        setupFormatLab();
        setupFileOperationLab();
        setupReferenceLab();
        setupNetworkJourney();
        setupRequestLab();
        setupBrowserLab();
        setupTransferLab();
        setupAccountLab();
        setupEvidenceLab();
        setupDebugLab();
        setupPointerLab();
        setupGestureLab();
        setupStorageLab();
        setupPixelLab();
        setupColorLab();
        setupMediaLab();
        setupSamplingLab();
        setupBitLab();
        setupCompressionLab();
        setupAlgorithmLab();
        setupControlLab();
    };
})();
