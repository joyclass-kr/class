(() => {
    "use strict";

    const figure = (spec, className, body) => `
        <figure class="lesson-specific-figure visual-${spec.id} ${className}" aria-label="${spec.concept}">
            <div class="lesson-specific-board">${body}</div>
            <figcaption>${spec.caption}</figcaption>
        </figure>
    `;

    const object = (title, english, detail = "", className = "") => `
        <div class="visual-object ${className}">
            <strong>${title}<small>${english}</small></strong>
            ${detail ? `<span>${detail}</span>` : ""}
        </div>
    `;

    const flow = (steps, className = "") => `
        <ol class="visual-process ${className}">
            ${steps.map((step, index) => `
                <li>
                    <span class="visual-step-number">${index + 1}</span>
                    <strong>${step[0]}<small>${step[1]}</small></strong>
                    ${step[2] ? `<p>${step[2]}</p>` : ""}
                </li>
            `).join("")}
        </ol>
    `;

    const renderers = {
        b02: (spec, asset) => figure(spec, "visual-mobile-parts", `
            <div class="visual-photo-devices">
                <article>
                    <img src="${asset("smartphone-internals-exploded-768.webp")}" width="768" height="512" alt="화면, 배터리, 로직 보드, 카메라가 분리된 스마트폰의 대표 내부 구조">
                    <h3>스마트폰 <small>Smartphone</small></h3>
                    <p><b>SoC</b>와 RAM·플래시가 작은 기판에 촘촘히 연결됩니다.</p>
                </article>
                <article>
                    <img src="${asset("tablet-internals-exploded-768.webp")}" width="768" height="512" alt="터치 화면, 배터리, 로직 보드, 스피커가 분리된 태블릿의 대표 내부 구조">
                    <h3>태블릿·iPad <small>Tablet / iPad</small></h3>
                    <p>넓은 화면 뒤에서 <b>배터리</b>가 가장 큰 면적을 차지합니다.</p>
                </article>
            </div>
            <div class="visual-callout-row">
                <span>센서 <small>Sensors</small></span><span>SoC·RAM <small>Processing</small></span><span>플래시 <small>Storage</small></span><span>통신 칩 <small>Wireless</small></span>
            </div>
        `),

        b03: (spec) => figure(spec, "visual-port-connection", `
            <div class="connection-bench">
                ${object("컴퓨터", "Computer", "USB-C 단자", "device-box")}
                <div class="connector-cable"><span>USB-C</span><i></i><span>USB-C</span></div>
                ${object("외장 저장 장치", "External Drive", "USB 데이터·전력", "device-box")}
            </div>
            <div class="driver-lane"><b>운영체제</b><span>장치 드라이버가 규격의 신호를 해석</span><b>주변 기기</b></div>
            <p class="visual-evidence">모양이 맞는 단자라도 지원 규격·속도·전력·드라이버가 맞아야 기능이 동작합니다.</p>
        `),

        c01: (spec) => figure(spec, "visual-os-layers", flow([
            ["사용자", "User", "터치·키·클릭으로 명령"],
            ["앱", "Application", "문서 열기·그림 그리기"],
            ["운영체제", "Operating System", "파일·메모리·장치 조정"],
            ["장치 드라이버", "Device Driver", "장치별 신호로 변환"],
            ["하드웨어", "Hardware", "CPU·화면·저장 장치가 실행"]
        ], "vertical-layers")),

        c02: (spec) => figure(spec, "visual-os-family", `
            <div class="os-device-row">
                ${object("PC", "Windows", "창·파일 탐색기", "os-windows")}
                ${object("Chromebook", "ChromeOS", "웹·클라우드 중심", "os-chrome")}
                ${object("휴대전화", "Android / iOS", "터치·앱 권한", "os-mobile")}
                ${object("iPad", "iPadOS", "터치·멀티태스킹", "os-tablet")}
            </div>
            <div class="shared-os-jobs"><strong>공통 역할 <small>Shared Jobs</small></strong><span>앱 실행</span><span>파일 관리</span><span>장치 제어</span><span>계정·보안</span></div>
            <p class="visual-evidence">역할은 비슷하지만 설치할 수 있는 앱, 파일 위치, 단추 모양과 조작 방식은 서로 다릅니다.</p>
        `),

        c03: (spec) => figure(spec, "visual-program-process", `
            ${flow([
                ["저장된 프로그램", "Program File", "저장 장치에 기록된 명령"],
                ["실행", "Launch", "운영체제가 RAM에 불러옴"],
                ["프로세스", "Process", "CPU가 처리 중인 실행 상태"]
            ])}
            <div class="window-output">
                <span class="window-frame"><b>창 1</b><small>Window</small></span>
                <span class="window-frame"><b>창 2</b><small>Window</small></span>
                <span class="tab-strip"><b>탭 A</b><b>탭 B</b><small>한 창 안의 여러 문서</small></span>
            </div>
        `),

        c04: (spec) => figure(spec, "visual-settings-scope", `
            <div class="settings-window">
                <aside><span>디스플레이</span><span>소리</span><span>네트워크</span><span>계정</span><span>업데이트</span></aside>
                <main>
                    <div class="setting-control"><b>화면 배율</b><i><em></em></i><strong>125%</strong></div>
                    <div class="permission-gate"><b>카메라 권한</b><span>허용된 앱만 센서 사용</span><button type="button" tabindex="-1">허용</button></div>
                    <div class="update-strip"><b>업데이트</b><span>운영체제 파일 교체 → 다시 시작</span></div>
                </main>
            </div>
            <p class="visual-evidence">개인 설정은 사용자의 표시·소리를 바꾸고, 관리자 권한과 업데이트는 시스템 전체에 영향을 줄 수 있습니다.</p>
        `),

        d02: (spec) => figure(spec, "visual-touch-gestures", `
            <div class="touch-screen-demo">
                <div class="gesture tap"><i></i><strong>탭<small>Tap</small></strong><span>짧게 눌렀다 놓기</span></div>
                <div class="gesture long-press"><i></i><strong>길게 누르기<small>Long Press</small></strong><span>누른 시간 유지</span></div>
                <div class="gesture swipe"><i></i><strong>스와이프<small>Swipe</small></strong><span>한 손가락 이동</span></div>
                <div class="gesture pinch"><i></i><i></i><strong>핀치<small>Pinch</small></strong><span>두 점 사이 거리 변화</span></div>
            </div>
            <div class="gesture-input-code"><span>위치 <b>x·y</b></span><span>시간 <b>ms</b></span><span>이동 <b>px</b></span><span>손가락 수 <b>1·2</b></span></div>
        `),

        d03: (spec) => figure(spec, "visual-keyboard-clipboard", `
            <div class="keyboard-shortcut">
                <div class="key-row"><kbd>Ctrl</kbd><b>+</b><kbd>C</kbd><span>복사 <small>Copy</small></span></div>
                <div class="key-row apple"><kbd>⌘</kbd><b>+</b><kbd>C</kbd><span>iPad·Mac 키보드</span></div>
            </div>
            <div class="clipboard-transfer">
                ${object("문서 A", "Document A", "선택한 문장")}
                ${object("클립보드", "Clipboard", "임시 복사본", "clipboard-tray")}
                ${object("문서 B", "Document B", "커서 위치에 붙여넣기")}
            </div>
        `),

        e01: (spec) => figure(spec, "visual-file-tree", `
            <div class="file-explorer">
                <div class="breadcrumb"><span>C:</span><b>›</b><span>사용자</span><b>›</b><span>민준</span><b>›</b><span>그림</span></div>
                <aside>
                    <strong>드라이브 C:</strong>
                    <span>└ 사용자</span><span>　└ 민준</span><span>　　└ 그림</span>
                </aside>
                <main>
                    <div class="folder-tile"><i></i><b>여행</b><small>Folder</small></div>
                    <div class="file-tile"><i>JPG</i><b>바다.jpg</b><small>File</small></div>
                </main>
            </div>
            <p class="path-readout"><b>경로 Path</b> C:\\사용자\\민준\\그림\\바다.jpg</p>
        `),

        e02: (spec) => figure(spec, "visual-file-anatomy", `
            <div class="filename-anatomy">
                <span class="base-name">여름여행<small>파일 이름 File Name</small></span><b>.</b><span class="extension">png<small>확장자 Extension</small></span>
            </div>
            ${flow([
                ["파일 이름 표시", "Name Shown", "사람이 구별하는 이름"],
                ["데이터 형식 확인", "Format Check", "파일 내부의 저장 규칙"],
                ["연결 앱 선택", "Choose an App", "형식을 읽을 수 있는 앱"]
            ], "file-open-flow")}
            <p class="visual-evidence">확장자는 형식을 알려 주는 이름표입니다. 글자만 바꿔도 파일 내부 데이터의 형식은 바뀌지 않습니다.</p>
        `),

        e03: (spec) => figure(spec, "visual-file-operations", `
            <div class="operation-center">${object("원본 문서", "Original File", "보고서.docx", "original-file")}</div>
            <div class="operation-orbit">
                <span><b>저장</b><small>같은 파일 갱신</small></span>
                <span><b>다른 이름으로 저장</b><small>새 파일 생성</small></span>
                <span><b>복사</b><small>원본과 사본 2개</small></span>
                <span><b>이동</b><small>같은 파일, 새 위치</small></span>
                <span><b>삭제</b><small>휴지통·복구 여부 확인</small></span>
            </div>
        `),

        e04: (spec) => figure(spec, "visual-reference-target", `
            <div class="reference-map">
                ${object("실제 보고서.pdf", "Original File", "저장 장치의 데이터", "reference-target")}
                <div class="reference-arrows">
                    <span class="desktop-icon"><i></i><b>아이콘</b><small>화면의 표시</small></span>
                    <span class="shortcut-icon"><i></i><b>바로가기</b><small>파일 위치를 가리킴</small></span>
                    <span class="bookmark-icon"><i></i><b>북마크·즐겨찾기</b><small>웹 주소를 기억</small></span>
                </div>
            </div>
            <p class="visual-evidence">표시나 연결을 지운 것과 실제 파일·웹페이지를 지운 것은 결과가 다릅니다.</p>
        `),

        e05: (spec) => figure(spec, "visual-storage-strategy", `
            <div class="storage-locations">
                ${object("내 기기", "Device", "현재 작업 파일", "storage-device")}
                ${object("USB", "Removable Storage", "직접 옮기는 사본", "storage-usb")}
                ${object("클라우드", "Cloud Storage", "인터넷의 계정 저장 공간", "storage-cloud")}
            </div>
            <div class="storage-actions">
                <span class="sync-action">↔ <b>동기화</b><small>두 위치의 최신 상태 맞춤</small></span>
                <span class="backup-action">→ <b>백업</b><small>복구용 사본 따로 보관</small></span>
                <span class="zip-action"><i>ZIP</i><b>압축 파일</b><small>여러 파일을 한 묶음으로 표현</small></span>
            </div>
        `),

        f01: (spec) => figure(spec, "visual-pixel-resolution", `
            <div class="display-demo">
                <div class="pixel-screen"><span></span><b>1920 × 1080<small>픽셀 수 Resolution</small></b></div>
                <div class="pixel-magnifier"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><strong>1픽셀씩 확대</strong></div>
            </div>
            <div class="display-measures"><span><b>13인치</b><small>물리 화면 크기</small></span><span><b>170 ppi</b><small>픽셀 밀도</small></span><span><b>125%</b><small>표시 배율</small></span></div>
        `),

        f02: (spec) => figure(spec, "visual-image-structure", `
            <div class="rgb-mix"><i class="red">R</i><i class="green">G</i><i class="blue">B</i><strong>빛의 세 값으로 픽셀 색 표현</strong></div>
            <div class="raster-vector">
                <div class="raster-sample"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><b>래스터<small>픽셀 격자 · JPG·PNG·WebP</small></b></div>
                <div class="vector-sample"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M12 66 L48 12 L74 45 L106 18" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><b>벡터<small>선·도형의 계산 규칙</small></b></div>
            </div>
        `),

        f03: (spec) => figure(spec, "visual-media-time", `
            <div class="sample-timeline"><span></span><i></i><i></i><i></i><i></i><i></i><b>소리 샘플<small>시간마다 측정한 값</small></b></div>
            <div class="frame-strip"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><b>영상 프레임<small>한 장씩 이어지는 화면</small></b></div>
            <div class="capture-compare"><span><b>스크린샷</b><small>한 순간의 화면 1장</small></span><span><b>화면 녹화</b><small>시간에 따른 화면과 소리</small></span></div>
        `),

        g01: (spec) => figure(spec, "visual-analog-binary", `
            <div class="analog-wave"><span></span><strong>연속 변화<small>Analog Signal</small></strong></div>
            <div class="sample-gate"><i></i><i></i><i></i><i></i><i></i><strong>기준에 따라 측정<small>Sampling and Decision</small></strong></div>
            <div class="binary-row"><b>0</b><b>1</b><b>1</b><b>0</b><b>1</b><b>0</b><strong>구분된 상태<small>Binary States</small></strong></div>
        `),

        g02: (spec) => figure(spec, "visual-data-units", `
            <div class="bit-byte"><div class="bits">${Array.from({ length: 8 }, (_, index) => `<b>${index % 3 === 0 ? 1 : 0}</b>`).join("")}</div><strong>8 bit = 1 byte</strong></div>
            <div class="size-ladder"><span><b>KB</b><small>짧은 글</small></span><span><b>MB</b><small>사진·음악</small></span><span><b>GB</b><small>영상·앱</small></span><span><b>TB</b><small>많은 파일</small></span></div>
            <p class="visual-evidence">단위가 커질수록 담을 수 있는 데이터 양이 커집니다. 파일 종류만으로 정확한 크기가 정해지지는 않습니다.</p>
        `),

        g03: (spec) => figure(spec, "visual-encoding-transfer", `
            ${flow([
                ["내용", "Content", "글·사진·소리"],
                ["인코딩", "Encoding", "정해진 숫자 표현 규칙"],
                ["압축", "Compression", "반복·예측을 이용해 크기 줄이기"],
                ["파일", "File", "저장·전송할 바이트 묶음"]
            ])}
            <div class="transfer-equation"><span><b>파일 크기</b><small>120 MB</small></span><b>÷</b><span><b>전송 속도</b><small>20 MB/s</small></span><b>=</b><span><b>예상 시간</b><small>약 6초</small></span></div>
        `),

        h01: (spec) => figure(spec, "visual-network-route", `
            <div class="network-map">
                ${object("Chromebook", "Device", "무선 신호", "network-device")}
                <span class="wifi-waves"><i></i><i></i><i></i><b>Wi-Fi</b></span>
                ${object("공유기", "Router", "집·교실 네트워크의 출입구", "router-box")}
                <span class="internet-line"></span>
                ${object("인터넷", "Internet", "여러 네트워크의 연결", "internet-cloud")}
            </div>
            <p class="visual-evidence">Wi-Fi 연결은 기기와 공유기 사이의 한 구간입니다. 인터넷 서비스까지 도달했는지는 따로 확인해야 합니다.</p>
        `),

        h02: (spec) => figure(spec, "visual-web-request", `
            ${flow([
                ["URL 입력", "Enter a URL", "www.example.com/page"],
                ["DNS 조회", "DNS Lookup", "이름을 서버 주소로 찾기"],
                ["서버 요청", "Request", "필요한 페이지 데이터 요청"],
                ["서버 응답", "Response", "상태와 데이터를 돌려보냄"]
            ])}
            <div class="request-return"><span>클라이언트 <small>Client</small></span><b>요청 →</b><i></i><b>← 응답</b><span>서버 <small>Server</small></span></div>
        `),

        h03: (spec) => figure(spec, "visual-browser-search", `
            <div class="browser-window">
                <div class="browser-tabs"><span class="active">동물 자료</span><span>새 탭</span></div>
                <div class="address-bar">https://example.org/animals</div>
                <main>
                    <label>검색 엔진 <span>수달의 서식지</span></label>
                    <article><b>웹사이트의 검색 결과</b><p>이 제목은 다른 웹페이지로 이동하는 <u>링크</u>입니다.</p></article>
                </main>
            </div>
            <p class="visual-evidence">브라우저는 페이지를 여는 앱이고, 검색 엔진은 페이지를 찾는 웹 서비스입니다. 탭은 열린 문서를 나눕니다.</p>
        `),

        h04: (spec) => figure(spec, "visual-full-stack", `
            <div class="full-stack-map">
                ${object("프론트엔드", "Frontend", "학생이 보는 화면", "frontend-box")}
                <span class="api-bridge"><b>API</b><small>요청·응답 규칙</small></span>
                ${object("백엔드", "Backend", "권한 확인·계산", "backend-box")}
                <span class="database-link">↕</span>
                ${object("데이터베이스", "Database", "계정·점수·콘텐츠 기록", "database-box")}
            </div>
            <div class="request-packet"><b>문제 제출</b><span>POST /answers</span><b>→ 채점 결과 JSON →</b><span>{ score: 5 }</span></div>
        `),

        h05: (spec) => figure(spec, "visual-web-storage", `
            <div class="transfer-arrows">
                ${object("내 기기", "Device", "파일·브라우저", "web-device")}
                <div><span class="download-arrow">← <b>다운로드</b></span><span class="upload-arrow"><b>업로드</b> →</span></div>
                ${object("웹 서버", "Web Server", "공개된 버전", "web-server")}
            </div>
            <div class="browser-storage-row"><span><b>쿠키</b><small>사이트가 기억할 작은 상태</small></span><span><b>캐시</b><small>다시 쓸 파일의 임시 사본</small></span><span><b>배포</b><small>새 버전을 서버에 공개</small></span></div>
        `),

        i01: (spec) => figure(spec, "visual-account-access", `
            ${flow([
                ["계정 식별", "Account", "사용자 이름·이메일"],
                ["로그인 인증", "Authentication", "비밀번호 등 첫 증거"],
                ["2단계 인증", "Two-Factor Authentication", "다른 종류의 추가 증거"],
                ["권한 적용", "Authorization", "할 수 있는 작업 범위"]
            ])}
            <div class="permission-keys"><span>학생 <small>읽기·제출</small></span><span>교사 <small>자료·평가 관리</small></span><span>관리자 <small>시스템 설정</small></span></div>
        `),

        i02: (spec) => figure(spec, "visual-digital-evidence", `
            <div class="message-evidence">
                <header><b>보안 확인 필요</b><small>보낸 주소: support-example.co</small></header>
                <p>지금 계정과 비밀번호를 입력하면 사진을 계속 볼 수 있습니다.</p>
                <span class="suspicious-link">http://account-check.example</span>
                <ul><li><b>주소</b> 공식 도메인과 같은가?</li><li><b>요구 행동</b> 비밀번호·인증번호를 요구하는가?</li><li><b>공개 범위</b> 올린 정보가 누구에게 남는가?</li><li><b>사용 허락</b> 저작권·라이선스가 있는가?</li></ul>
            </div>
            <div class="digital-footprint"><i></i><i></i><i></i><i></i><b>게시·검색·공유 기록이 이어지는 디지털 발자국</b></div>
        `),

        j01: (spec) => figure(spec, "visual-algorithm", `
            <div class="problem-parts"><span>로그인</span><span>자료 찾기</span><span>파일 열기</span><span>답 제출</span><strong>큰 문제를 작은 작업으로 분해</strong></div>
            ${flow([
                ["시작 조건 확인", "Check Preconditions", "인터넷·계정 준비"],
                ["분명한 순서", "Sequence", "한 단계씩 실행"],
                ["결과 확인", "Verify", "예상 결과와 비교"],
                ["수정 후 재시험", "Revise and Retest", "실패한 단계부터 고침"]
            ])}
        `),

        j02: (spec) => figure(spec, "visual-control-flow", `
            <div class="flowchart">
                <span class="event-node">단추 클릭<small>Event</small></span>
                <span class="flow-line"></span>
                <span class="condition-node">점수 ≥ 5?<small>Condition</small></span>
                <span class="yes-branch">예 → 완료 화면</span>
                <span class="no-branch">아니요 → 다시 풀기</span>
                <span class="loop-arrow">↶ <b>문제가 남아 있는 동안 반복</b></span>
            </div>
        `),

        j03: (spec) => figure(spec, "visual-debugging", `
            <div class="debug-console"><header>실행 기록 <small>Run Log</small></header><p><b>입력</b> 사진 선택 ✓</p><p><b>처리</b> 파일 읽기 <em>오류: 경로 없음</em></p><p><b>출력</b> 미리보기 중단</p></div>
            ${flow([
                ["재현", "Reproduce", "같은 입력과 순서로 다시 실행"],
                ["관찰", "Observe", "어느 상태부터 달라지는지 기록"],
                ["한 원인 수정", "Fix One Cause", "경로 값을 올바르게 변경"],
                ["재시험", "Retest", "입력·처리·출력·저장 전체 확인"]
            ], "debug-cycle")}
        `)
    };

    window.COMPUTER_CONCEPT_VISUAL = (spec, asset) => {
        const renderer = renderers[spec.id];
        return renderer ? renderer(spec, asset) : "";
    };
    window.COMPUTER_SPECIAL_VISUAL_IDS = Object.keys(renderers);
})();
