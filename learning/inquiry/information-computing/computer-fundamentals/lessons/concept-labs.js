(() => {
    "use strict";

    const fallbackRenderer = window.COMPUTER_CONCEPT_VISUAL;
    const renderers = {};
    const figure = (spec, className, body) => `
        <figure class="lesson-specific-figure premium-concept-figure visual-${spec.id} ${className}" aria-label="${spec.concept}">
            <div class="lesson-specific-board">${body}</div>
            <figcaption>${spec.caption}</figcaption>
        </figure>
    `;
    const contextImage = (asset, basename, alt, height = 512) => `
        <picture class="context-illustration">
            <img
                src="${asset(`${basename}-768.webp`)}"
                srcset="${asset(`${basename}-768.webp`)} 768w, ${asset(`${basename}-1536.webp`)} 1536w"
                sizes="(max-width: 820px) calc(100vw - 72px), (max-width: 1180px) calc(100vw - 112px), 1020px"
                width="768"
                height="${height}"
                alt="${alt}"
            >
        </picture>
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
        </section>
    `);

    renderers.b03 = (spec, asset) => figure(spec, "visual-port-bench", `
        <section class="concept-lab-split">
            <section class="connection-bench" data-port-lab data-port-device="usb" data-port-state="ready">
                <div class="port-device-tabs" role="group" aria-label="연결할 주변기기">
                    <button type="button" data-port-device="usb" aria-pressed="true">USB 메모리 <small>USB Flash Drive</small></button>
                    <button type="button" data-port-device="monitor" aria-pressed="false">외부 모니터 <small>External Monitor</small></button>
                    <button type="button" data-port-device="tablet" aria-pressed="false">그림 태블릿 <small>Drawing Tablet</small></button>
                </div>
                <div class="connection-scene">
                    <div class="selected-peripheral"><i data-port-device-icon></i><b data-port-device-name>USB 메모리</b><small data-port-connector-name>USB-A 플러그</small></div>
                    <div class="connection-cable" aria-hidden="true"><span></span><i></i></div>
                    <div class="port-socket-board" role="group" aria-label="꽂을 포트">
                        <button type="button" data-port-socket="usb-a" aria-pressed="true"><i></i><b>USB-A</b></button>
                        <button type="button" data-port-socket="hdmi" aria-pressed="false"><i></i><b>HDMI</b></button>
                        <button type="button" data-port-socket="usb-c" aria-pressed="false"><i></i><b>USB-C</b></button>
                    </div>
                </div>
                <div class="driver-setting"><span><b>장치 드라이버</b><small>Device Driver</small></span><button type="button" data-driver-toggle aria-pressed="true"><i></i><span data-driver-label>설치됨</span></button></div>
                <div class="port-actions"><button type="button" data-port-connect>연결해 보기 <small>Connect</small></button><button type="button" data-port-reset>처음 상태</button></div>
                <p class="lab-readout" data-port-status aria-live="polite"><b>USB 메모리:</b> 플러그 모양과 포트 규격이 맞는 곳을 고른 뒤 연결해 보세요.</p>
            </section>
            ${contextImage(asset, "b03-peripherals-ports-drivers-illustration-v1", "노트북의 여러 단자에 모양이 다른 케이블과 저장 장치, 화면, 키보드, 무선 기기가 각기 다른 방법으로 연결되는 장면")}
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
                <div class="relay-actions"><button type="button" data-relay-run>사진 찍기 <small>Take Photo</small></button><button type="button" data-relay-reset>처음 상태</button></div>
                <p class="lab-readout" data-relay-status aria-live="polite"><b>준비:</b> 권한과 카메라 장치 상태를 바꾼 뒤 사진 요청이 어디에서 멈추는지 확인하세요.</p>
            </section>
            ${contextImage(asset, "c01-app-os-hardware-request-illustration-v1", "아이가 태블릿을 누르자 앱의 요청이 운영체제와 처리 부품을 거쳐 카메라와 화면으로 이어지는 장면")}
        </section>
    `);

    renderers.c03 = (spec, asset) => figure(spec, "visual-program-process", `
        <section class="concept-lab-split">
            <section class="program-process-lab" data-program-lab data-program-state="stopped">
                <div class="program-state-board">
                    <section class="program-storage"><h3>저장 장치 <small>Storage</small></h3><div class="program-file"><i></i><b>그림판 프로그램</b><small>paint.app · 저장되어 있음</small></div></section>
                    <span class="state-arrow">실행 →</span>
                    <section class="process-memory"><h3>RAM <small>Running Process</small></h3><div data-process-token hidden><i></i><b>그림판 프로세스</b><small data-process-copy>명령 처리 중</small></div><em data-process-empty>실행 중인 작업 없음</em></section>
                    <span class="state-arrow">표시 →</span>
                    <section class="window-display"><h3>화면 <small>Windows</small></h3><div class="window-stack" data-window-stack></div><em data-window-empty>열린 창 없음</em></section>
                </div>
                <div class="program-actions" role="group" aria-label="프로그램 실행 상태 바꾸기">
                    <button type="button" data-program-action="run">프로그램 실행 <small>Run</small></button>
                    <button type="button" data-program-action="new" disabled>새 창 <small>New Window</small></button>
                    <button type="button" data-program-action="background" disabled>창 숨기기 <small>Keep in Background</small></button>
                    <button type="button" data-program-action="end" disabled>프로세스 끝내기 <small>End Process</small></button>
                </div>
                <p class="lab-readout" data-program-status aria-live="polite"><b>저장된 프로그램:</b> 실행 전에도 프로그램 파일은 저장 장치에 남아 있지만 RAM의 프로세스와 화면의 창은 아직 없습니다.</p>
                <p class="model-note">이 실험의 그림판은 한 프로세스가 여러 창을 관리하는 모형입니다. 실제 앱은 여러 프로세스를 사용하기도 합니다.</p>
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
                <div class="selection-presets" role="group" aria-label="원문에서 선택할 말"><span>선택:</span><button type="button" data-select-text="고양이">고양이</button><button type="button" data-select-text="강아지">강아지</button><button type="button" data-select-text="공원">공원</button></div>
                <div class="clipboard-actions" role="group" aria-label="클립보드 명령">
                    <button type="button" data-clipboard-action="copy">복사 <small>Ctrl/Cmd+C</small></button>
                    <button type="button" data-clipboard-action="cut">잘라내기 <small>Ctrl/Cmd+X</small></button>
                    <button type="button" data-clipboard-action="paste">붙여넣기 <small>Ctrl/Cmd+V</small></button>
                    <button type="button" data-clipboard-action="reset">처음 상태</button>
                </div>
                <p class="lab-readout" data-clipboard-status aria-live="polite"><b>선택:</b> 원문에서 직접 드래그하거나 말 단추를 누른 뒤 복사·잘라내기를 실행하세요. 붙여넣기는 아래 문서의 커서 위치에 들어갑니다.</p>
            </section>
            ${contextImage(asset, "d03-keyboard-clipboard-flow-illustration-v1", "노트북 문서에서 복사한 내용이 임시 클립보드를 거쳐 태블릿 문서의 커서 위치에 붙여넣어지는 장면")}
        </section>
    `);

    renderers.c02 = (spec, asset) => figure(spec, "visual-os-workbench", `
        ${contextImage(asset, "c02-operating-system-devices-illustration-v1", "한 학생이 노트북, Chromebook형 기기, 태블릿, 스마트폰에서 같은 그림 파일을 다루는 모습")}
        <section class="os-workbench" data-os-lab data-os="windows">
            <header>
                <h3>같은 사진 파일을 찾는 네 가지 화면 <small>The Same Task on Four Systems</small></h3>
                <nav aria-label="비교할 운영체제">
                    <button type="button" data-os-choice="windows" aria-pressed="true">Windows</button>
                    <button type="button" data-os-choice="chromeos" aria-pressed="false">ChromeOS</button>
                    <button type="button" data-os-choice="android" aria-pressed="false">Android</button>
                    <button type="button" data-os-choice="ipados" aria-pressed="false">iOS·iPadOS</button>
                </nav>
            </header>
            <div class="os-device-shell">
                <div class="os-screen os-windows-screen" data-os-panel="windows">
                    <div class="desktop-icons"><i class="trash-icon"></i><span>휴지통</span></div>
                    <div class="window-chrome"><span></span><b>파일 탐색기</b><em>— □ ×</em></div>
                    <div class="window-body"><aside>홈<br><strong>사진</strong><br>다운로드</aside><main><i class="folder-art"></i><b>사진</b><span>바다.jpg</span></main></div>
                    <div class="taskbar"><i></i><i></i><i></i></div>
                </div>
                <div class="os-screen os-chrome-screen" data-os-panel="chromeos" hidden>
                    <div class="window-chrome"><b>파일</b><em>○ □ ×</em></div>
                    <div class="window-body"><aside>최근<br><strong>내 파일</strong><br>Google Drive</aside><main><i class="folder-art"></i><b>이미지</b><span>바다.jpg</span></main></div>
                    <div class="shelf"><i></i><i></i><i></i><time>10:24</time></div>
                </div>
                <div class="os-screen os-android-screen" data-os-panel="android" hidden>
                    <div class="mobile-status"><time>10:24</time><span><i class="signal-bars"></i><i class="battery-status"></i></span></div>
                    <h4>내 파일</h4><div class="mobile-grid"><i class="download-icon"><span></span><small>다운로드</small></i><i class="image-icon"><span></span><small>이미지</small></i><i class="cloud-folder-icon"><span></span><small>Drive</small></i></div>
                    <div class="mobile-nav">‹　○　▢</div>
                </div>
                <div class="os-screen os-ipad-screen" data-os-panel="ipados" hidden>
                    <div class="mobile-status"><time>10:24</time><span>iPhone·iPad　Wi-Fi</span></div>
                    <div class="ipad-files"><aside><b>파일</b><strong>최근 항목</strong><span>iCloud Drive</span><span>나의 iPhone·iPad</span></aside><main><h4>사진</h4><i class="folder-art"></i><span>바다.jpg</span></main></div>
                    <div class="home-indicator"></div>
                </div>
            </div>
            <div class="os-observation">
                <strong data-os-name>Windows의 파일 탐색기</strong>
                <p data-os-description>작업 표시줄과 창을 이용하고, 파일 탐색기에서 드라이브와 폴더를 찾습니다.</p>
            </div>
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
                        <div class="update-setting-demo"><span data-update-result>마지막 확인: 어제</span><button type="button" data-update-check>업데이트 확인</button></div>
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
                <div class="path-breadcrumb"><button type="button" data-path-choice="drive">기기 저장소</button><i>›</i><button type="button" data-path-choice="user">민준</button><i>›</i><button type="button" data-path-choice="pictures">그림</button><i>›</i><button type="button" data-path-choice="trip">여행</button></div>
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
                <button type="button" data-format-action="rename">이름 끝만 .png로 바꾸기</button>
                <button type="button" data-format-action="convert">PNG 방식으로 변환해 저장</button>
                <button type="button" data-format-action="reset">처음으로</button>
            </div>
            <p class="lab-readout" data-format-status><b>확장자 .jpg</b>는 사진 데이터가 어떤 방법으로 저장되었는지 알려 주는 이름표입니다.</p>
        </section>
    `);

    renderers.e04 = (spec) => figure(spec, "visual-reference-lab", `
        <section class="reference-workbench" data-reference-lab data-reference="shortcut">
            <nav aria-label="비교할 화면 표시">
                <button type="button" data-reference-choice="icon" aria-pressed="false">아이콘</button>
                <button type="button" data-reference-choice="shortcut" aria-pressed="true">바로가기</button>
                <button type="button" data-reference-choice="bookmark" aria-pressed="false">북마크·즐겨찾기</button>
            </nav>
            <div class="reference-scenes">
                <div class="desktop-scene">
                    <span class="desktop-file" data-original-file><i data-file-icon>PDF</i><b>과학보고서.pdf</b><em data-file-path>문서/과학보고서.pdf</em></span>
                    <button type="button" class="desktop-shortcut" data-reference-marker="shortcut"><i>PDF<em>↗</em></i><b>보고서 바로가기</b></button>
                    <span class="reference-path-label" data-shortcut-path>대상: 문서/과학보고서.pdf</span>
                    <small>파일 화면 <em>File Screen</em></small>
                </div>
                <div class="browser-scene">
                    <div class="browser-bar"><span>☆</span><b data-page-url>https://science.example/report</b></div>
                    <button type="button" class="bookmark-row" data-reference-marker="bookmark">★ 과학 보고서 웹페이지</button>
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
                <button type="button" data-reference-action="open">바로가기로 열기</button>
                <button type="button" data-reference-action="change">원본 위치 바꾸기</button>
                <button type="button" data-reference-action="delete">바로가기 삭제</button>
                <button type="button" data-reference-action="reset">처음 상태</button>
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
                    <div class="browser-current-address" data-browser-address tabindex="0" aria-label="현재 탭의 주소">
                        <span>주소 <small>URL</small></span><code data-browser-url>https://search.local/</code>
                    </div>
                </div>
                <main class="browser-state-viewport" id="browser-state-viewport" data-browser-viewport>
                    <section class="browser-search-home" data-browser-page="home" data-search-service>
                        <header><strong>교실 검색 <small>Class Search</small></strong><p>검색어와 관련된 로컬 웹페이지를 찾아 결과 목록으로 보여 주는 검색 서비스입니다.</p></header>
                        <form data-browser-search-form>
                            <label for="browserSearchInput">찾고 싶은 내용 <small>Search Query</small></label>
                            <div><input id="browserSearchInput" data-browser-search-input value="수달은 어디에서 살까?" autocomplete="off"><button type="submit">검색 <small>Search</small></button></div>
                        </form>
                    </section>
                    <section class="browser-search-results" data-browser-page="results" data-search-service hidden>
                        <header><strong><span data-browser-query></span> 검색 결과</strong><small>검색 엔진이 찾은 로컬 웹페이지</small></header>
                        <div data-browser-result-list></div>
                    </section>
                    <article class="browser-local-page" data-browser-page="page" data-webpage-region hidden>
                        <header data-site-region><span data-page-site></span><small data-page-domain></small></header>
                        <h2 data-page-title></h2>
                        <p data-page-body></p>
                        <button type="button" data-page-related-link data-link-region></button>
                    </article>
                </main>
            </div>
            <p class="browser-state-status" data-browser-status aria-live="polite">검색어를 직접 입력하고 검색을 실행해 보세요. 검색 결과도 브라우저 안에 표시되는 웹페이지입니다.</p>
            <div class="browser-state-terms" aria-label="현재 화면에서 용어가 가리키는 곳 확인">
                <span>현재 화면에서 찾기 <small>Locate the Term</small></span>
                <div>
                    <button type="button" data-browser-term="address" aria-pressed="false">주소</button>
                    <button type="button" data-browser-term="tab" aria-pressed="false">탭</button>
                    <button type="button" data-browser-term="search" aria-pressed="false">검색 엔진</button>
                    <button type="button" data-browser-term="site" aria-pressed="false">웹사이트</button>
                    <button type="button" data-browser-term="page" aria-pressed="false">웹페이지</button>
                    <button type="button" data-browser-term="link" aria-pressed="false">링크</button>
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
                <button type="button" class="network-send-action" data-network-send>패킷 한 단계 보내기</button>
                <button type="button" data-network-reset>모두 켜고 처음부터</button>
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
                <button type="button" class="web-request-action" data-request-action>주소 읽기</button>
                <button type="button" data-request-reset>처음부터</button>
            </div>
            <p class="lab-readout" data-request-status aria-live="polite">주소창의 URL을 읽기 전입니다. URL은 서버의 숫자 주소나 페이지 내용 그 자체가 아닙니다.</p>
        </section>
    `);

    renderers.h05 = (spec) => figure(spec, "visual-web-transfer-lab", `
        <section class="transfer-state-lab" data-transfer-lab data-transfer-mode="download">
            <div class="transfer-state-tabs" role="tablist" aria-label="웹 데이터 상태 실험">
                <button type="button" role="tab" id="transfer-tab-download" aria-controls="transfer-panel-download" aria-selected="true" data-transfer-mode-choice="download">다운로드</button>
                <button type="button" role="tab" id="transfer-tab-upload" aria-controls="transfer-panel-upload" aria-selected="false" data-transfer-mode-choice="upload">업로드</button>
                <button type="button" role="tab" id="transfer-tab-cookie" aria-controls="transfer-panel-cookie" aria-selected="false" data-transfer-mode-choice="cookie">쿠키</button>
                <button type="button" role="tab" id="transfer-tab-cache" aria-controls="transfer-panel-cache" aria-selected="false" data-transfer-mode-choice="cache">캐시</button>
                <button type="button" role="tab" id="transfer-tab-deploy" aria-controls="transfer-panel-deploy" aria-selected="false" data-transfer-mode-choice="deploy">배포</button>
            </div>
            <section class="transfer-state-panel transfer-copy-panel" id="transfer-panel-download" role="tabpanel" aria-labelledby="transfer-tab-download" data-transfer-panel="download" data-transfer-stage="ready">
                <header><h3>서버 파일을 내 기기로 받기 <small>Download</small></h3><p>서버의 원본을 없애지 않고 내 기기에 사본을 만듭니다.</p></header>
                <div class="transfer-copy-scene">
                    <article class="transfer-file-place server-place"><strong>웹 서버 <small>Server</small></strong><div class="transfer-file-row"><i class="file-sheet"><b>별자리</b><small>.webp</small></i><span>원본 1개</span></div></article>
                    <div class="transfer-route" aria-label="서버에서 내 기기 방향"><span>서버 → 내 기기</span><i>→</i></div>
                    <article class="transfer-file-place device-place"><strong>내 기기 · 다운로드 폴더 <small>Device</small></strong><div class="transfer-empty" data-download-empty>파일 없음</div><div class="transfer-file-row transfer-new-copy" data-download-copy hidden><i class="file-sheet"><b>별자리</b><small>.webp</small></i><span>사본 1개</span></div></article>
                </div>
                <p class="lab-readout" data-transfer-status>서버에는 원본 1개가 있고, 내 기기에는 아직 사본이 없습니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>내 기기로 다운로드</button><button type="button" data-transfer-reset>초기화</button></div>
            </section>

            <section class="transfer-state-panel transfer-copy-panel" id="transfer-panel-upload" role="tabpanel" aria-labelledby="transfer-tab-upload" data-transfer-panel="upload" data-transfer-stage="ready" hidden>
                <header><h3>내 파일을 서버로 보내기 <small>Upload</small></h3><p>내 기기의 원본을 남긴 채 서버에 사본을 만듭니다.</p></header>
                <div class="transfer-copy-scene">
                    <article class="transfer-file-place device-place"><strong>내 기기 · 과제 폴더 <small>Device</small></strong><div class="transfer-file-row"><i class="file-sheet"><b>관찰일지</b><small>.pdf</small></i><span>원본 1개</span></div></article>
                    <div class="transfer-route" aria-label="내 기기에서 서버 방향"><span>내 기기 → 서버</span><i>→</i></div>
                    <article class="transfer-file-place server-place"><strong>수업 서버 · 제출함 <small>Server</small></strong><div class="transfer-empty" data-upload-empty>파일 없음</div><div class="transfer-file-row transfer-new-copy" data-upload-copy hidden><i class="file-sheet"><b>관찰일지</b><small>.pdf</small></i><span>사본 1개</span></div></article>
                </div>
                <p class="lab-readout" data-transfer-status>내 기기에는 원본 1개가 있고, 서버 제출함에는 아직 사본이 없습니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>서버로 업로드</button><button type="button" data-transfer-reset>초기화</button></div>
            </section>
            <section class="transfer-state-panel cookie-request-panel" id="transfer-panel-cookie" role="tabpanel" aria-labelledby="transfer-tab-cookie" data-transfer-panel="cookie" data-transfer-stage="empty" hidden>
                <header><h3>언어 선택을 다음 요청에 다시 보내기 <small>Cookie</small></h3><p>서버가 준 작은 값을 브라우저가 저장하고, 다음 요청에 붙여 보냅니다.</p></header>
                <div class="cookie-request-scene">
                    <article class="browser-state-window"><strong>브라우저 쿠키 저장소</strong><code data-cookie-store>저장된 값 없음</code></article>
                    <div class="http-message-log"><div><b>브라우저의 요청</b><code data-cookie-request>Cookie 헤더 없음</code></div><div><b>서버의 처리</b><code data-cookie-server>요청 대기</code></div></div>
                </div>
                <p class="lab-readout" data-transfer-status>처음 요청에는 언어 쿠키가 없습니다. 한국어 선택을 서버에 보내 보세요.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>한국어 선택 저장</button><button type="button" data-transfer-reset>초기화</button></div>
            </section>
            <section class="transfer-state-panel cache-request-panel" id="transfer-panel-cache" role="tabpanel" aria-labelledby="transfer-tab-cache" data-transfer-panel="cache" data-transfer-stage="empty" hidden>
                <header><h3>한 번 받은 그림 사본 다시 쓰기 <small>Cache</small></h3><p>첫 요청에서 받은 파일 사본을 브라우저 가까이에 두고 다음 표시에 재사용합니다.</p></header>
                <div class="cache-request-scene">
                    <article class="cache-server-source"><strong>웹 서버</strong><div class="transfer-file-row"><i class="file-sheet"><b>logo</b><small>.webp</small></i><span>원본</span></div><output data-cache-count>서버 요청 0회</output></article>
                    <div class="transfer-route"><span data-cache-route>첫 요청 전</span><i>→</i></div>
                    <article class="browser-cache-drawer"><strong>브라우저 캐시</strong><div class="transfer-empty" data-cache-empty>사본 없음</div><div class="transfer-file-row transfer-new-copy" data-cache-copy hidden><i class="file-sheet"><b>logo</b><small>.webp</small></i><span>임시 사본</span></div><output data-cache-screen>화면 표시 전</output></article>
                </div>
                <p class="lab-readout" data-transfer-status>캐시는 비어 있습니다. 첫 요청은 서버에서 그림을 받아야 합니다.</p>
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>그림 처음 열기</button><button type="button" data-transfer-reset>초기화</button></div>
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
                <div class="transfer-state-actions"><button type="button" class="transfer-primary-action" data-transfer-action>공개 서버에 v2 배포</button><button type="button" data-transfer-reset>초기화</button></div>
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
                            <span>비밀 문구 <code>cedar27</code></span>
                        </div>
                        <label>계정 이름 <small>Username</small><input data-account-name autocomplete="off" spellcheck="false" placeholder="계정 카드에서 확인"></label>
                        <label>비밀 문구 <small>Passphrase</small><input data-account-secret type="password" autocomplete="off" placeholder="연습용 비밀 문구 입력"></label>
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
                        <div class="permission-result" data-permission-result><b>요청 전</b><span>서버가 학생 계정에 정해진 권한을 아직 확인하지 않았습니다.</span></div>
                    </section>
                </main>
            </div>
            <ol class="account-state-strip" aria-label="계정 접근 과정">
                <li data-account-step="1"><b>1</b><span>식별·비밀번호<small>Identity & Password</small></span></li>
                <li data-account-step="2"><b>2</b><span>등록 기기 확인<small>Second Factor</small></span></li>
                <li data-account-step="3"><b>3</b><span>기능별 권한 확인<small>Authorization</small></span></li>
            </ol>
            <div class="account-controller">
                <button type="button" data-account-prev disabled>이전</button>
                <p data-account-status><b>1. 식별·인증</b>　계정 카드와 같은 두 정보를 직접 입력하세요.</p>
                <button type="button" data-account-next>확인하고 다음</button>
            </div>
        </section>
    `);

    renderers.i02 = (spec, asset) => figure(spec, "visual-evidence-lab", `
        ${contextImage(asset, "i02-suspicious-message-evidence-illustration-v1", "학생이 의심스러운 메시지를 누르기 전에 보낸 주소와 연결 경로, 개인정보 요구를 확대해 확인하는 장면", 384)}
        <section class="evidence-lab" data-evidence-lab>
            <div class="message-app">
                <header><span>받은 메시지</span><b>오늘 10:18</b></header>
                <div class="sender-row">
                    <i>?</i><p><strong>사진 서비스 지원팀</strong><button type="button" data-evidence="sender">support-example.co</button></p>
                </div>
                <div class="message-body">
                    <h3>지금 계정을 확인하세요</h3>
                    <p>사진을 계속 보려면 10분 안에 <button type="button" data-evidence="secret">비밀번호와 인증번호</button>를 입력하세요.</p>
                    <button type="button" class="suspicious-cta" data-evidence="link">http://account-check.example</button>
                </div>
            </div>
            <aside class="evidence-notebook">
                <h3>찾은 증거 <small>Evidence</small></h3>
                <ol>
                    <li data-evidence-note="sender">보낸 주소가 서비스의 공식 주소와 다릅니다.</li>
                    <li data-evidence-note="secret">비밀번호와 인증번호를 함께 요구합니다.</li>
                    <li data-evidence-note="link">연결 주소가 보낸 사람의 이름과 맞지 않습니다.</li>
                </ol>
                <p data-evidence-status>메시지에서 의심할 근거 세 곳을 직접 눌러 보세요.</p>
            </aside>
            <div class="citizenship-check" data-citizenship-check>
                <div class="citizenship-tabs" role="tablist" aria-label="직접 확인할 디지털 생활 원리">
                    <button type="button" data-citizenship-choice="privacy" aria-pressed="true">개인정보</button>
                    <button type="button" data-citizenship-choice="copyright" aria-pressed="false">저작권·라이선스</button>
                    <button type="button" data-citizenship-choice="footprint" aria-pressed="false">디지털 발자국</button>
                    <button type="button" data-citizenship-choice="wellbeing" aria-pressed="false">기기 건강</button>
                </div>
                <div class="citizenship-task-stage">
                    <section data-citizenship-panel="privacy">
                        <div class="privacy-post-card"><strong>사진 게시물에 포함된 정보</strong><span>이름: 민준</span><span>학교 운동장 사진</span><span>촬영 위치</span></div>
                        <div class="citizenship-action-row" role="group" aria-label="게시물 공개 범위">
                            <button type="button" data-privacy-audience="public" aria-pressed="false">누구나</button>
                            <button type="button" data-privacy-audience="class" aria-pressed="true">우리 학급</button>
                            <button type="button" data-privacy-audience="private" aria-pressed="false">나만 보기</button>
                        </div>
                        <div class="citizenship-result" data-privacy-result><b>우리 학급 24명</b><span>이름·사진·촬영 위치를 볼 수 있습니다.</span></div>
                    </section>
                    <section data-citizenship-panel="copyright" hidden>
                        <div class="license-card"><strong>수달 사진</strong><code>CC BY-NC 4.0</code><span>만든 사람 표시 필요 · 상업적 이용 금지</span></div>
                        <div class="copyright-controls">
                            <label><input type="checkbox" data-license-credit> 만든 사람과 출처 표시</label>
                            <label>사용 목적<select data-license-purpose><option value="class">학교 발표 자료</option><option value="sale">판매할 포스터</option></select></label>
                        </div>
                        <div class="citizenship-result" data-license-result><b>조건 확인 전</b><span>사용 계획과 라이선스 조건을 서로 비교하세요.</span></div>
                    </section>
                    <section data-citizenship-panel="footprint" hidden>
                        <div class="footprint-copies">
                            <span data-footprint-copy="original">내 게시물 <b>없음</b></span>
                            <span data-footprint-copy="friend">친구의 복사본 <b>없음</b></span>
                            <span data-footprint-copy="log">서비스 기록 <b>없음</b></span>
                        </div>
                        <div class="citizenship-action-row"><button type="button" data-footprint-action="post">게시</button><button type="button" data-footprint-action="copy" disabled>친구가 복사</button><button type="button" data-footprint-action="delete" disabled>내 게시물 삭제</button><button type="button" data-footprint-action="reset">초기화</button></div>
                        <div class="citizenship-result" data-footprint-result><b>게시 전</b><span>게시·복사·삭제를 차례로 눌러 남는 기록을 관찰하세요.</span></div>
                    </section>
                    <section data-citizenship-panel="wellbeing" hidden>
                        <label class="distance-control">눈과 화면 사이 거리 <input type="range" min="15" max="70" value="35" data-screen-distance><output data-distance-output>35 cm</output></label>
                        <div class="wellbeing-cycle"><button type="button" data-rest-action="study">25분 학습 기록</button><button type="button" data-rest-action="rest">5분 눈 휴식 기록</button><span>학습 <b data-study-count>0</b>회 · 휴식 <b data-rest-count>0</b>회</span></div>
                        <div class="citizenship-result" data-wellbeing-result><b>35 cm</b><span>화면이 매우 가깝지는 않지만 자세와 글자 크기도 함께 살펴야 합니다.</span></div>
                    </section>
                </div>
                <p data-citizenship-status><b>개인정보 Privacy:</b> 공개 범위를 바꾸면 같은 게시물을 볼 수 있는 사람이 달라집니다.</p>
            </div>
        </section>
    `);

    renderers.j03 = (spec, asset) => figure(spec, "visual-debug-lab", `
        ${contextImage(asset, "j03-photo-path-debug-illustration-v2", "학생이 잘못된 사진 폴더 경로 때문에 고양이 사진이 열리지 않는 장면을 확인하고 한 글자를 고친 뒤 다시 실행하는 모습")}
        <section class="debug-lab" data-debug-lab data-debug-stage="start">
            <div class="mini-photo-app">
                <header><b>사진 미리보기</b><button type="button" data-debug-run>실행</button></header>
                <main>
                    <div class="photo-output"><span>사진이 여기에 나타납니다.</span></div>
                    <div class="tiny-program">
                        <label>프로그램이 사용한 사진 주소 <small>Path Used by the Program</small><input data-debug-code value="/picture/cat.webp" spellcheck="false"></label>
                        <p class="actual-path-note">파일 앱에서 확인한 실제 위치 <code>/pictures/cat.webp</code></p>
                        <span>두 주소를 비교해 직접 고친 뒤 다시 실행하세요.</span>
                    </div>
                </main>
                <footer data-debug-log>실행 전입니다.</footer>
            </div>
            <ol class="debug-observation">
                <li data-debug-step="reproduce"><b>1</b><span>같은 순서로 실행</span></li>
                <li data-debug-step="observe"><b>2</b><span>멈춘 곳 관찰</span></li>
                <li data-debug-step="fix"><b>3</b><span>한 원인 수정</span></li>
                <li data-debug-step="retest"><b>4</b><span>다시 실행해 확인</span></li>
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
                    <div class="gesture-context-menu" data-gesture-menu hidden><button type="button">공유</button><button type="button">이름 바꾸기</button><button type="button">삭제</button></div>
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
            <div class="storage-lab-actions"><button type="button" data-storage-action>USB에 사본 만들기</button><button type="button" data-storage-reset>이 실험 처음부터</button></div>
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
                        <strong>과제 파일</strong><button type="button">열기</button>
                        <span>글자와 단추는 더 많은 픽셀을 차지하지만 화면 해상도는 그대로입니다.</span>
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
                <div><h3>같은 픽셀을 실제 WebP 파일로 만들기</h3><small>Encode the Same Pixels as a Real WebP Blob</small></div>
                <p>왼쪽 캔버스의 픽셀을 그대로 사용합니다. 품질을 바꿀 때마다 브라우저가 새 WebP Blob을 만들고 실제 바이트 수를 잽니다.</p>
            </header>
            <div class="actual-compression-comparison">
                <figure class="compression-source-card">
                    <div class="compression-image-frame"><canvas width="768" height="512" data-compression-source aria-label="WebP로 인코딩할 768 곱하기 512 픽셀 원본 장면"></canvas></div>
                    <figcaption><b>인코딩 전 픽셀 <small>Source Pixels</small></b><span>Canvas 768 × 512 px</span></figcaption>
                </figure>
                <div class="compression-encode-arrow" aria-hidden="true"><b>WebP</b><small>toBlob()</small><i>→</i></div>
                <figure class="compression-result-card">
                    <div class="compression-image-frame result-frame">
                        <img data-compression-preview alt="실제로 WebP로 인코딩한 같은 캔버스" hidden>
                        <div class="encoding-status" data-encoding-status role="status">WebP 인코딩 준비 중</div>
                    </div>
                    <figcaption><b>실제 인코딩 결과 <small>Encoded Result</small></b><span data-encoded-quality>품질 75%</span></figcaption>
                </figure>
            </div>
            <div class="compression-measurements" aria-live="polite">
                <div><span>픽셀 메모리 <small>RGBA Pixel Memory</small></span><strong data-raw-size>1,572,864 B</strong><em>파일 크기가 아닌 작업 중 메모리</em></div>
                <div><span>실제 WebP Blob <small>Actual Encoded Blob</small></span><strong data-file-size>인코딩 중</strong><em data-file-bytes>실제 바이트 수 준비 중</em></div>
                <div><span>픽셀 메모리 대비 <small>Share of Pixel Memory</small></span><strong data-compression-ratio>—</strong><em data-file-type>image/webp 요청</em></div>
            </div>
            <div class="actual-compression-controls">
                <label><span>WebP 품질 요청 <small>Requested Quality</small></span><input type="range" min="10" max="100" step="5" value="75" data-compression-quality><output data-quality-output>75%</output></label>
                <label><span>전송 속도 <small>Transfer Speed</small></span><input type="range" min="0.1" max="10" step="0.1" value="2" data-transfer-speed><output data-speed-output>2.0 MB/s</output></label>
            </div>
            <div class="actual-transfer-calculation" aria-live="polite">
                <span>실제 Blob 크기 <b data-calc-size>— MB</b></span><i>÷</i><span>전송 속도 <b data-calc-speed>2.0 MB/s</b></span><i>=</i><strong>예상 전송 시간 <b data-transfer-time>—</b><small>초 seconds</small></strong>
            </div>
            <p class="compression-browser-note" data-compression-note><b>실제 측정:</b> 표시된 바이트 수는 이 브라우저의 WebP 인코더가 지금 만든 Blob의 <code>size</code>입니다. 브라우저에 따라 결과가 조금 다를 수 있습니다.</p>
            <p class="compression-model-note"><b>전송 시간 계산 범위:</b> <code>Blob 바이트 ÷ 1,000,000 ÷ MB/s</code>만 계산합니다. 연결 준비, 요청·응답 머리말, 암호화, 서버 처리, 속도 변화는 포함하지 않습니다.</p>
        </section>
    `);

    renderers.j01 = (spec, asset) => figure(spec, "visual-algorithm-builder", `
        ${contextImage(asset, "j01-sandwich-algorithm-illustration-v2", "학생이 손 씻기와 재료 준비, 식빵 놓기, 치즈와 토마토 올리기, 다른 식빵으로 덮기의 네 장면을 순서대로 배열하는 모습")}
        <section class="algorithm-sequencer" data-algorithm-lab data-algorithm-stage="0">
            <div class="sandwich-scene">
                <div class="worktop"><span class="bread top"></span><span class="cheese"></span><span class="tomato"></span><span class="bread bottom"></span><i class="finished-sandwich"></i></div>
            </div>
            <div class="algorithm-order-workbench">
                <div class="algorithm-source" data-algo-source aria-label="순서를 정하지 않은 단계 카드">
                    <button type="button" draggable="true" data-algo-step="bread" data-order="2"><b>식빵 한 장을 놓는다</b><small>Put Down One Slice</small></button>
                    <button type="button" draggable="true" data-algo-step="cheese" data-order="3"><b>치즈와 토마토를 올린다</b><small>Add Cheese and Tomato</small></button>
                    <button type="button" draggable="true" data-algo-step="prepare" data-order="1"><b>손을 씻고 재료를 준비한다</b><small>Prepare Hands and Ingredients</small></button>
                    <button type="button" draggable="true" data-algo-step="close" data-order="4"><b>다른 식빵으로 덮는다</b><small>Close the Sandwich</small></button>
                </div>
                <ol class="algorithm-drop-list" data-algo-slots aria-label="정한 알고리즘 순서">
                    <li data-algo-slot="0"><span>1</span><em>첫 단계 놓기</em></li>
                    <li data-algo-slot="1"><span>2</span><em>둘째 단계 놓기</em></li>
                    <li data-algo-slot="2"><span>3</span><em>셋째 단계 놓기</em></li>
                    <li data-algo-slot="3"><span>4</span><em>마지막 단계 놓기</em></li>
                </ol>
            </div>
            <div class="algorithm-controller"><button type="button" data-algo-check disabled>순서 확인</button><button type="button" data-algo-reset>처음부터</button><p data-algo-status>카드를 누르거나 번호 칸으로 끌어 네 단계를 모두 놓으세요. 확인 전에는 정답을 판단하지 않습니다.</p></div>
        </section>
    `);

    renderers.j02 = (spec) => figure(spec, "visual-control-path-lab", `
        <section class="control-path-lab" data-control-lab data-result="pending" data-control-running="false">
            <div class="control-flow-scene">
                <div class="flow-event"><i class="press-icon"></i><b>한 문제 풀기</b><small>명령 Command</small></div>
                <svg viewBox="0 0 760 280" aria-hidden="true">
                    <path class="main-path" d="M125 68H365V120"/>
                    <path class="yes-path" d="M430 170H635V222"/>
                    <path class="no-path" d="M330 170H120V222"/>
                    <path class="loop-path" d="M120 250H60V68H125"/>
                </svg>
                <div class="flow-condition">점수가 5점 이상인가?<small>조건 Condition</small></div>
                <div class="flow-result retry"><b>1점 얻고 되돌아가기</b><small>반복 Loop</small></div>
                <div class="flow-result finish"><b>반복 끝</b><small>Stop</small></div>
                <i class="path-runner"></i>
            </div>
            <div class="loop-machine">
                <label class="score-control">시작 점수 <small>Start Score</small><input type="range" min="0" max="5" value="2" data-score-input><output data-score-output>2점</output></label>
                <div class="loop-counters" aria-live="polite"><span>현재 점수 <b data-loop-score>2</b></span><span>반복 횟수 <b data-loop-count>0</b></span><span>종료 조건 <b>5점 이상</b></span></div>
                <div class="control-run-panel"><button type="button" data-control-step>한 번 실행 <small>Run One Iteration</small></button><button type="button" data-control-run>끝날 때까지 실행 <small>Run Until Finished</small></button><button type="button" data-control-reset>다시 설정</button></div>
                <ol class="loop-trace" data-loop-trace aria-label="반복 실행 기록"><li>실행하면 조건 검사와 점수 변화를 차례로 기록합니다.</li></ol>
            </div>
            <p class="lab-readout" data-control-status>시작 점수를 정하고 한 번씩 실행하거나, 종료 조건을 만족할 때까지 이어서 실행해 보세요.</p>
        </section>
    `);

    function setupPortLab() {
        const lab = document.querySelector("[data-port-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-port-status]");
        const driverButton = lab.querySelector("[data-driver-toggle]");
        const driverLabel = lab.querySelector("[data-driver-label]");
        const deviceName = lab.querySelector("[data-port-device-name]");
        const connectorName = lab.querySelector("[data-port-connector-name]");
        const devices = {
            usb: { name: "USB 메모리", connector: "USB-A 플러그", port: "usb-a", needsDriver: false, description: "USB 대용량 저장 장치는 운영체제의 기본 드라이버로 인식되는 경우가 많습니다." },
            monitor: { name: "외부 모니터", connector: "HDMI 플러그", port: "hdmi", needsDriver: false, description: "HDMI는 화면과 소리 신호를 보낼 수 있지만, 전원은 모니터에 따로 연결하는 경우가 많습니다." },
            tablet: { name: "그림 태블릿", connector: "USB-C 플러그", port: "usb-c", needsDriver: true, description: "케이블이 연결되어도 전용 드라이버가 없으면 펜 압력 같은 기능을 운영체제가 해석하지 못할 수 있습니다." }
        };
        let device = "usb";
        let socket = "usb-a";
        let driverInstalled = true;
        const setDevice = (next) => {
            device = next;
            lab.dataset.portDevice = device;
            lab.dataset.portState = "ready";
            lab.querySelectorAll("[data-port-device]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.portDevice === device)));
            deviceName.textContent = devices[device].name;
            connectorName.textContent = devices[device].connector;
            status.innerHTML = "<b>" + devices[device].name + ":</b> " + devices[device].description + " 맞는 포트를 고르고 연결해 보세요.";
        };
        const setSocket = (next) => {
            socket = next;
            lab.querySelectorAll("[data-port-socket]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.portSocket === socket)));
            lab.dataset.portState = "ready";
        };
        const setDriver = (installed) => {
            driverInstalled = installed;
            driverButton.setAttribute("aria-pressed", String(installed));
            driverLabel.textContent = installed ? "설치됨" : "없음";
            lab.dataset.portState = "ready";
        };
        const connect = () => {
            const selected = devices[device];
            if (socket !== selected.port) {
                lab.dataset.portState = "mismatch";
                status.innerHTML = "<b>연결할 수 없음:</b> " + selected.connector + "와 선택한 포트의 물리적 모양·규격이 맞지 않습니다. 억지로 밀어 넣지 않습니다.";
                return;
            }
            if (selected.needsDriver && !driverInstalled) {
                lab.dataset.portState = "unknown";
                status.innerHTML = "<b>케이블 연결됨 · 장치 인식 안 됨:</b> USB-C 규격은 맞지만 그림 태블릿의 신호를 해석할 전용 드라이버가 없습니다.";
                return;
            }
            lab.dataset.portState = "recognized";
            status.innerHTML = "<b>장치 인식됨:</b> 플러그와 포트 규격이 맞고 운영체제가 필요한 드라이버로 " + selected.name + "의 신호를 해석했습니다.";
        };
        lab.querySelectorAll("[data-port-device]").forEach((button) => button.addEventListener("click", () => setDevice(button.dataset.portDevice)));
        lab.querySelectorAll("[data-port-socket]").forEach((button) => button.addEventListener("click", () => setSocket(button.dataset.portSocket)));
        driverButton.addEventListener("click", () => setDriver(!driverInstalled));
        lab.querySelector("[data-port-connect]").addEventListener("click", connect);
        lab.querySelector("[data-port-reset]").addEventListener("click", () => { setSocket("usb-a"); setDriver(true); setDevice("usb"); });
        setDevice("usb");
        setSocket("usb-a");
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
            processCopy.textContent = hidden ? "백그라운드에서 실행 중" : "명령 처리 중";
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
            status.innerHTML = "<b>실행:</b> 저장 장치의 프로그램 명령을 읽어 RAM에 실행 중인 프로세스를 만들고, 그 프로세스가 화면에 첫 창을 표시했습니다.";
        });
        buttons.new.addEventListener("click", () => {
            hidden = false; windowCount += 1; render();
            status.innerHTML = "<b>새 창:</b> 이 모형에서는 같은 그림판 프로세스가 화면 창을 " + windowCount + "개 관리합니다. 창과 프로세스의 수가 반드시 같은 것은 아닙니다.";
        });
        buttons.background.addEventListener("click", () => {
            hidden = !hidden; render();
            status.innerHTML = hidden
                ? "<b>백그라운드:</b> 화면의 창은 보이지 않지만 RAM의 프로세스는 계속 실행 중입니다."
                : "<b>창 다시 표시:</b> 실행 중이던 같은 프로세스가 창을 다시 화면에 나타냈습니다.";
        });
        buttons.end.addEventListener("click", () => {
            running = false; windowCount = 0; hidden = false; render();
            status.innerHTML = "<b>프로세스 종료:</b> RAM의 실행 상태와 화면의 창은 사라졌지만 저장 장치의 프로그램 파일은 그대로 남아 다시 실행할 수 있습니다.";
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
        const selectedSourceText = () => source.value.slice(source.selectionStart, source.selectionEnd);
        const copy = (cut) => {
            const selected = selectedSourceText();
            if (!selected) {
                status.innerHTML = "<b>선택이 필요합니다:</b> 복사하거나 잘라낼 글자를 먼저 드래그하거나 선택 단추로 고르세요.";
                return;
            }
            clipboard = selected;
            clipboardOutput.textContent = selected;
            if (cut) {
                const start = source.selectionStart;
                source.setRangeText("", source.selectionStart, source.selectionEnd, "start");
                source.setSelectionRange(start, start);
                status.innerHTML = "<b>잘라내기:</b> 선택한 ‘" + selected + "’를 원문에서 없애고 그 사본을 클립보드에 임시로 두었습니다.";
            } else {
                status.innerHTML = "<b>복사:</b> 원문은 그대로 두고 선택한 ‘" + selected + "’의 사본을 클립보드에 임시로 두었습니다.";
            }
        };
        const paste = () => {
            if (!clipboard) {
                status.innerHTML = "<b>클립보드가 비어 있습니다:</b> 먼저 원문을 선택해 복사하거나 잘라내세요.";
                return;
            }
            target.focus();
            const start = target.selectionStart;
            target.setRangeText(clipboard, target.selectionStart, target.selectionEnd, "end");
            status.innerHTML = "<b>붙여넣기:</b> 클립보드의 ‘" + clipboard + "’ 사본을 대상 문서의 " + (start + 1) + "번째 위치부터 넣었습니다. 클립보드 내용은 남아 다시 붙여넣을 수 있습니다.";
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
            if (action === "copy") copy(false);
            if (action === "cut") copy(true);
            if (action === "paste") paste();
            if (action === "reset") reset();
        }));
        lab.addEventListener("keydown", (event) => {
            if (!(event.ctrlKey || event.metaKey)) return;
            const key = event.key.toLowerCase();
            if (!["c", "x", "v"].includes(key)) return;
            event.preventDefault();
            if (key === "c") copy(false);
            if (key === "x") copy(true);
            if (key === "v") paste();
        });
        reset();
    }

    function setupOsLab() {
        const lab = document.querySelector("[data-os-lab]");
        if (!lab) return;
        const copy = {
            windows: ["Windows의 파일 탐색기", "작업 표시줄과 창을 이용하고, 파일 탐색기에서 드라이브와 폴더를 찾습니다."],
            chromeos: ["ChromeOS의 파일 앱", "화면 아래 선반과 파일 앱을 이용하고, 내 파일과 Google Drive를 함께 찾을 수 있습니다."],
            android: ["Android의 내 파일 앱", "손가락으로 큰 항목을 누르며, 사진·다운로드·클라우드 위치를 찾습니다."],
            ipados: ["iOS·iPadOS의 파일 앱", "iPhone과 iPad에서는 파일 앱의 위치 목록에서 iCloud Drive와 나의 iPhone·iPad를 나누어 찾습니다."]
        };
        const choose = (name) => {
            lab.dataset.os = name;
            lab.querySelectorAll("[data-os-choice]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.osChoice === name)));
            lab.querySelectorAll("[data-os-panel]").forEach((panel) => { panel.hidden = panel.dataset.osPanel !== name; });
            lab.querySelector("[data-os-name]").textContent = copy[name][0];
            lab.querySelector("[data-os-description]").textContent = copy[name][1];
        };
        lab.querySelectorAll("[data-os-choice]").forEach((button) => button.addEventListener("click", () => choose(button.dataset.osChoice)));
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
            icon: ["아이콘이 표시하는 항목 확인", "아이콘 모양 바꾸기", ""],
            shortcut: ["바로가기로 열기", "원본을 완료 폴더로 이동", "바로가기 삭제"],
            bookmark: ["북마크로 열기", "웹페이지 주소 변경", "북마크 삭제"]
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
            actions.open.textContent = labels[choice][0];
            actions.change.textContent = labels[choice][1];
            actions.delete.textContent = labels[choice][2];
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
        const address = lab.querySelector("[data-browser-address]");
        const urlOutput = lab.querySelector("[data-browser-url]");
        const searchForm = lab.querySelector("[data-browser-search-form]");
        const searchInput = lab.querySelector("[data-browser-search-input]");
        const queryOutput = lab.querySelector("[data-browser-query]");
        const resultList = lab.querySelector("[data-browser-result-list]");
        const pageSite = lab.querySelector("[data-page-site]");
        const pageDomain = lab.querySelector("[data-page-domain]");
        const pageTitle = lab.querySelector("[data-page-title]");
        const pageBody = lab.querySelector("[data-page-body]");
        const relatedLink = lab.querySelector("[data-page-related-link]");
        const status = lab.querySelector("[data-browser-status]");
        const termButtons = Array.from(lab.querySelectorAll("[data-browser-term]"));
        const pageViews = Array.from(lab.querySelectorAll("[data-browser-page]"));
        const catalog = {
            otter: {
                site: "동물 관찰 도감", domain: "animals.local", url: "https://animals.local/otter/habitat",
                title: "수달의 서식지와 생활", summary: "강과 바다 가까이에서 사는 수달의 몸과 생활을 살펴봅니다.",
                body: "수달은 깨끗한 강과 바닷가처럼 먹이와 숨을 곳이 있는 물가에서 삽니다. 물갈퀴와 긴 꼬리는 헤엄칠 때 도움이 됩니다.",
                keywords: ["수달", "동물", "서식지", "강", "바다", "otter"], related: "river"
            },
            river: {
                site: "우리 강 연구소", domain: "river.local", url: "https://river.local/ecology/clean-water",
                title: "깨끗한 강과 물가 생물", summary: "강물의 상태와 물가 생물이 서로 어떤 영향을 주는지 알아봅니다.",
                body: "강에는 물고기, 곤충, 식물처럼 여러 생물이 함께 삽니다. 물이 오염되면 먹이와 숨을 곳이 줄어 물가 생물도 영향을 받습니다.",
                keywords: ["강", "물", "생물", "환경", "수달", "river"], related: "otter"
            },
            moon: {
                site: "어린이 우주 관측소", domain: "space.local", url: "https://space.local/moon/phases",
                title: "달의 모양은 왜 달라질까?", summary: "달과 지구, 태양의 위치로 달의 모양 변화를 관찰합니다.",
                body: "달이 스스로 모양을 바꾸는 것은 아닙니다. 태양빛을 받은 달의 부분 가운데 지구에서 보이는 부분이 달라집니다.",
                keywords: ["달", "우주", "태양", "관측", "moon", "space"], related: "weather"
            },
            weather: {
                site: "교실 날씨 자료실", domain: "weather.local", url: "https://weather.local/clouds/forecast",
                title: "구름을 보고 날씨 관찰하기", summary: "구름의 양과 모양을 기록하며 날씨 변화를 비교합니다.",
                body: "날씨를 알아볼 때에는 구름뿐 아니라 기온, 바람, 비처럼 여러 관측 자료를 함께 확인합니다.",
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
                empty.textContent = "이 로컬 자료에서는 관련 페이지를 찾지 못했습니다. ‘수달’, ‘강’, ‘달’, ‘날씨’처럼 다시 검색해 보세요.";
                resultList.append(empty);
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
                const footer = document.createElement("footer");
                const url = document.createElement("code");
                url.textContent = page.url;
                const newTab = document.createElement("button");
                newTab.type = "button";
                newTab.dataset.linkRegion = "";
                newTab.textContent = "새 탭에서 열기";
                newTab.addEventListener("click", () => openCatalogPage(id, true));
                footer.append(url, newTab);
                result.append(site, link, summary, footer);
                resultList.append(result);
            });
        };
        const renderLocalPage = (page) => {
            const record = catalog[page.pageId];
            pageSite.textContent = record.site;
            pageDomain.textContent = record.domain;
            pageTitle.textContent = record.title;
            pageBody.textContent = record.body;
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
            status.textContent = `링크를 현재 탭에서 열었습니다. 주소창이 ${destination.url}(으)로 바뀌고 웹페이지 내용이 표시됩니다.`;
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

        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (!query) {
                status.textContent = "검색할 낱말이나 질문을 입력하세요.";
                searchInput.focus();
                return;
            }
            const resultIds = findResults(query);
            pushPage({ type: "results", title: `${query} 검색`, url: `https://search.local/?q=${encodeURIComponent(query)}`, query, resultIds });
            renderCurrentPage();
            status.textContent = resultIds.length
                ? `검색 엔진이 ‘${query}’와 관련된 로컬 웹페이지를 찾아 결과 목록으로 만들었습니다.`
                : `검색 엔진이 ‘${query}’와 관련된 로컬 페이지를 찾지 못했습니다. 뒤로 가서 다른 검색어를 입력해 보세요.`;
        });
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
        address.addEventListener("click", () => highlightTerm("address"));
        address.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            highlightTerm("address");
        });
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
            send.textContent = step === nodeNames.length - 1 ? "서버 도착 완료" : stoppedAt ? "연결을 켠 뒤 다시 보내기" : "패킷 한 단계 보내기";
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
        const actionLabels = ["주소 읽기", "DNS 이름 조회", "서버 요청 보내기", "응답 받기", "브라우저에 표시", "페이지 표시 완료"];
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
            action.textContent = actionLabels[stage];
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
            action.textContent = completed ? "사본 만들기 완료" : mode === "download" ? "내 기기로 다운로드" : "서버로 업로드";
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
            action.textContent = current === 0 ? "한국어 선택 저장" : current === 1 ? "다음 요청 보내기" : "다음 요청 확인 완료";
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
            action.textContent = current === 0 ? "그림 처음 열기" : current === 1 ? "같은 그림 다시 열기" : "캐시 재사용 확인 완료";
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
            action.textContent = current === 0 ? "공개 서버에 v2 배포" : current === 1 ? "학생 화면 새로고침" : "배포 확인 완료";
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
        let stage = 1;
        const setStatus = (markup, tone = "") => {
            status.innerHTML = markup;
            status.dataset.tone = tone;
        };
        const show = (message = "") => {
            lab.dataset.accountStage = String(stage);
            previous.disabled = stage === 1;
            next.textContent = stage === 3 ? "처음부터" : "확인하고 다음";
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
        const found = new Set();
        const status = lab.querySelector("[data-evidence-status]");
        lab.querySelectorAll("[data-evidence]").forEach((button) => button.addEventListener("click", () => {
            const key = button.dataset.evidence;
            found.add(key);
            button.classList.add("is-found");
            lab.querySelector(`[data-evidence-note="${key}"]`).classList.add("is-found");
            status.textContent = found.size === 3
                ? "세 가지 근거를 모두 찾았습니다. 링크를 열지 말고 선생님이나 보호자에게 확인합니다."
                : `${found.size} / 3　이름이 그럴듯한지가 아니라 주소와 요구 행동을 근거로 판단합니다.`;
        }));
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
            footprint = { original: true, friend: false, log: true };
            renderFootprint("게시 순간 서비스 기록이 함께 생겼습니다.");
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
            if (button.dataset.restAction === "study") studyCount += 1;
            else restCount += 1;
            lab.querySelector("[data-study-count]").textContent = String(studyCount);
            lab.querySelector("[data-rest-count]").textContent = String(restCount);
            wellbeingResult.innerHTML = restCount < studyCount
                ? "<b>휴식 기록이 부족함</b><span>25분 학습 뒤에는 화면에서 눈을 떼고 먼 곳을 보는 5분 휴식을 기록해 보세요.</span>"
                : "<b>학습·휴식 한 묶음 기록</b><span>시간표와 몸 상태에 맞게 학습과 눈 휴식을 번갈아 배치했습니다.</span>";
        }));
        updateDistance();
    }

    function setupDebugLab() {
        const lab = document.querySelector("[data-debug-lab]");
        if (!lab) return;
        const output = lab.querySelector(".photo-output");
        const code = lab.querySelector("[data-debug-code]");
        const log = lab.querySelector("[data-debug-log]");
        const run = lab.querySelector("[data-debug-run]");
        run.addEventListener("click", () => {
            const path = code.value.trim();
            if (path !== "/pictures/cat.webp") {
                lab.dataset.debugStage = "error";
                log.textContent = "오류: " + path + " 위치에서 파일을 찾지 못했습니다.";
                output.innerHTML = "<span>사진을 불러오지 못했습니다.</span>";
                return;
            }
            lab.dataset.debugStage = "success";
            log.textContent = "성공: 사진 파일을 읽어 화면에 표시했습니다.";
            output.innerHTML = '<span class="debug-photo" aria-label="고양이 사진을 나타내는 예시 그림"><i></i></span>';
        });
        code.addEventListener("input", () => {
            lab.dataset.debugStage = "fixed";
            log.textContent = "주소를 수정했습니다. 맞는지는 아직 알 수 없으므로 다시 실행해 확인하세요.";
        });
    }

    function setupGestureLab() {
        const lab = document.querySelector("[data-gesture-lab]");
        if (!lab) return;
        const status = lab.querySelector("[data-gesture-status]");
        const surface = lab.querySelector("[data-gesture-surface]");
        const fingerCount = lab.querySelector("[data-finger-count]");
        const pressTime = lab.querySelector("[data-press-time]");
        const moveDistance = lab.querySelector("[data-move-distance]");
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
            action.textContent = initial[mode][0];
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
                    action.textContent = "작업본을 v2로 수정";
                    status.innerHTML = "<b>USB 복사 완료:</b> Chromebook 원본은 남고 USB에 별도 사본 v1이 생겼습니다.";
                } else {
                    action.disabled = true;
                    status.innerHTML = "<b>작업본 수정:</b> Chromebook은 v2가 되었지만 USB 사본은 v1 그대로입니다. 복사 뒤 자동 동기화되지 않습니다.";
                }
            } else if (mode === "cloud") {
                if (step === 1) {
                    lab.querySelector('[data-storage-result="cloud-copy"]').hidden = false;
                    lab.querySelector('[data-storage-empty="cloud"]').hidden = true;
                    action.textContent = "작업본을 v2로 수정";
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
                    action.textContent = "변경 상태 동기화";
                    status.innerHTML = "<b>수정 직후:</b> Chromebook만 v2이고 서버와 iPad는 아직 v1입니다.";
                } else if (step === 2) {
                    ["chromebook", "cloud", "ipad"].forEach((place) => { sync(place).textContent = "발표.pptx · v2"; sync(place).classList.remove("is-pending"); });
                    action.textContent = "iPad에서 삭제";
                    status.innerHTML = "<b>동기화 완료:</b> 세 위치의 현재 상태가 v2로 맞춰졌습니다.";
                } else if (step === 3) {
                    sync("ipad").textContent = "삭제 상태 · 전달 대기";
                    sync("ipad").classList.add("is-pending");
                    action.textContent = "삭제 상태 동기화";
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
                    action.textContent = "백업에서 복구";
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
                    action.textContent = "ZIP 풀기";
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
        const cards = Array.from(lab.querySelectorAll("[data-algo-step]"));
        const slots = Array.from(lab.querySelectorAll("[data-algo-slot]"));
        const check = lab.querySelector("[data-algo-check]");
        const status = lab.querySelector("[data-algo-status]");
        const cardData = Object.fromEntries(cards.map((card) => [card.dataset.algoStep, { id: card.dataset.algoStep, order: Number(card.dataset.order), title: card.querySelector("b").textContent, english: card.querySelector("small").textContent }]));
        let placed = [];
        let draggedId = "";
        const render = () => {
            cards.forEach((card) => { card.hidden = placed.includes(card.dataset.algoStep); });
            slots.forEach((slot, index) => {
                slot.classList.remove("is-error", "is-correct");
                const old = slot.querySelector("button");
                if (old) old.remove();
                const placeholder = slot.querySelector("em");
                const id = placed[index];
                placeholder.hidden = Boolean(id);
                if (!id) return;
                const data = cardData[id];
                const button = document.createElement("button");
                button.type = "button";
                button.draggable = true;
                button.dataset.placedStep = id;
                button.innerHTML = "<b>" + data.title + "</b><small>" + data.english + "</small><i>다시 누르면 빼기</i>";
                button.addEventListener("click", () => {
                    placed.splice(index, 1);
                    lab.dataset.algorithmStage = "0";
                    status.textContent = "선택한 카드를 뺐습니다. 네 단계가 모두 놓인 뒤 순서를 확인할 수 있습니다.";
                    render();
                });
                button.addEventListener("dragstart", () => { draggedId = id; });
                slot.append(button);
            });
            check.disabled = placed.length !== 4;
        };
        const insertAt = (id, index) => {
            placed = placed.filter((item) => item !== id);
            placed.splice(Math.min(index, placed.length), 0, id);
            placed = placed.slice(0, 4);
            lab.dataset.algorithmStage = "0";
            status.textContent = placed.length === 4
                ? "네 단계를 모두 놓았습니다. ‘순서 확인’을 눌러 결과를 실행해 보세요."
                : placed.length + "개 단계를 놓았습니다. 남은 카드를 이어 놓으세요.";
            render();
        };
        const reset = () => {
            placed = [];
            lab.dataset.algorithmStage = "0";
            status.textContent = "카드를 누르거나 번호 칸으로 끌어 네 단계를 모두 놓으세요. 확인 전에는 정답을 판단하지 않습니다.";
            render();
        };
        cards.forEach((card) => {
            card.addEventListener("click", () => insertAt(card.dataset.algoStep, placed.length));
            card.addEventListener("dragstart", () => { draggedId = card.dataset.algoStep; });
        });
        slots.forEach((slot, index) => {
            slot.addEventListener("dragover", (event) => event.preventDefault());
            slot.addEventListener("drop", (event) => {
                event.preventDefault();
                if (draggedId) insertAt(draggedId, index);
                draggedId = "";
            });
        });
        check.addEventListener("click", () => {
            const firstError = placed.findIndex((id, index) => cardData[id].order !== index + 1);
            if (firstError >= 0) {
                slots[firstError].classList.add("is-error");
                lab.dataset.algorithmStage = "0";
                status.textContent = (firstError + 1) + "번째 단계에서 앞뒤 결과가 자연스럽게 이어지지 않습니다. 정답 카드는 표시하지 않으니 장면과 재료 상태를 보고 순서를 바꿔 보세요.";
                return;
            }
            slots.forEach((slot) => slot.classList.add("is-correct"));
            lab.dataset.algorithmStage = "4";
            status.textContent = "실행 가능한 순서입니다. 준비 → 식빵 → 속재료 → 덮기의 결과로 샌드위치가 완성되었습니다.";
        });
        lab.querySelector("[data-algo-reset]").addEventListener("click", reset);
        reset();
    }

    function setupControlLab() {
        const lab = document.querySelector("[data-control-lab]");
        if (!lab) return;
        const input = lab.querySelector("[data-score-input]");
        const output = lab.querySelector("[data-score-output]");
        const scoreOutput = lab.querySelector("[data-loop-score]");
        const countOutput = lab.querySelector("[data-loop-count]");
        const trace = lab.querySelector("[data-loop-trace]");
        const status = lab.querySelector("[data-control-status]");
        const stepButton = lab.querySelector("[data-control-step]");
        const runButton = lab.querySelector("[data-control-run]");
        const resetButton = lab.querySelector("[data-control-reset]");
        let score = Number(input.value);
        let count = 0;
        let timer = 0;
        const setControls = (running) => {
            lab.dataset.controlRunning = String(running);
            input.disabled = running;
            stepButton.disabled = running || score >= 5;
            runButton.disabled = running || score >= 5;
        };
        const addTrace = (text, state) => {
            if (count === 1) trace.innerHTML = "";
            const item = document.createElement("li");
            item.dataset.traceState = state;
            item.textContent = text;
            trace.append(item);
        };
        const show = () => {
            output.textContent = input.value + "점";
            scoreOutput.textContent = String(score);
            countOutput.textContent = String(count);
        };
        const prepare = () => {
            window.clearTimeout(timer);
            score = Number(input.value);
            count = 0;
            lab.dataset.result = score >= 5 ? "finish" : "pending";
            trace.innerHTML = "<li>시작 점수 " + score + "점. 아직 반복 명령을 실행하지 않았습니다.</li>";
            status.textContent = score >= 5
                ? "시작할 때 이미 5점 이상이므로 ‘5점 미만’ 조건이 거짓입니다. 반복 본문은 0번 실행됩니다."
                : "현재 " + score + "점입니다. ‘5점 미만인 동안 한 문제 풀기’를 실행할 수 있습니다.";
            setControls(false);
            show();
        };
        const iterate = () => {
            if (score >= 5) return false;
            const before = score;
            count += 1;
            score += 1;
            const finished = score >= 5;
            lab.dataset.result = finished ? "finish" : "retry";
            addTrace(count + "회: " + before + "점 < 5 → 한 문제 풀기 → " + score + "점", finished ? "finish" : "retry");
            status.textContent = finished
                ? count + "번 실행해 " + score + "점이 되었습니다. ‘5점 미만’ 조건이 거짓이 되어 반복을 끝냅니다."
                : count + "번 실행해 " + score + "점입니다. 아직 5점 미만이므로 시작 지점으로 돌아갑니다.";
            show();
            setControls(false);
            return !finished;
        };
        const runUntilFinished = () => {
            if (score >= 5) return;
            setControls(true);
            const tick = () => {
                const shouldContinue = iterate();
                if (!shouldContinue) {
                    setControls(false);
                    return;
                }
                setControls(true);
                timer = window.setTimeout(tick, 520);
            };
            tick();
        };
        input.addEventListener("input", prepare);
        stepButton.addEventListener("click", iterate);
        runButton.addEventListener("click", runUntilFinished);
        resetButton.addEventListener("click", () => {
            input.disabled = false;
            prepare();
            input.focus();
        });
        prepare();
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
