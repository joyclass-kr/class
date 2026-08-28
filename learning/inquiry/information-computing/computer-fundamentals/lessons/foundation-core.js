(() => {
    "use strict";

    const modules = [
        ["A", "컴퓨터의 기본 원리", "Computer Principles"],
        ["B", "하드웨어와 기기", "Hardware and Devices"],
        ["C", "운영체제와 앱", "Operating Systems and Apps"],
        ["D", "포인터·터치·키보드", "Pointer, Touch, and Keyboard"],
        ["E", "파일과 저장 공간", "Files and Storage"],
        ["F", "화면과 디지털 미디어", "Displays and Digital Media"],
        ["G", "0과 1·데이터 크기", "Binary and Data Size"],
        ["H", "네트워크와 웹", "Networks and the Web"],
        ["I", "계정·보안·디지털 시민성", "Accounts, Security, and Digital Citizenship"],
        ["J", "알고리즘과 코딩 논리", "Algorithms and Coding Logic"]
    ].map(([code, title, english]) => ({ code, title, english }));

    const imageAsset = (name) => {
        const courseRoot = typeof document !== "undefined" && document.body?.dataset.courseRoot === "true";
        return `${courseRoot ? "assets" : "../assets"}/images/${name}`;
    };

    const relationshipVisual = (nodes, caption) => `
        <figure class="concept-relationship-figure">
            <div class="concept-relationship-board" style="--node-count:${nodes.length}">
                ${nodes.map((node, index) => `
                    <article>
                        <span class="relationship-index">${index + 1}</span>
                        <strong>${node[0]} <small>${node[1]}</small></strong>
                        <p>${node[2]}</p>
                        ${node[3]?.length ? `<ul class="concept-example-list">${node[3].map((example) => `<li><b>${example[0]}</b><small>${example[1]}</small></li>`).join("")}</ul>` : ""}
                    </article>
                `).join("")}
            </div>
            <figcaption>${caption}</figcaption>
        </figure>`;

    const stepNames = Object.freeze({
        b02: [["빛 감지", "Sense Light"], ["사진 처리", "Process the Photo"], ["파일 저장", "Save the File"], ["사진 전송", "Send the Photo"]],
        b03: [["단자 확인", "Check the Ports"], ["규격 확인", "Check the Standard"], ["장치 인식", "Confirm Device Detection"], ["화면 방식 선택", "Choose a Display Mode"]],
        c01: [["촬영 입력", "Tap Capture"], ["카메라 요청", "Request Camera Access"], ["권한·드라이버", "Check Permission and Driver"], ["센서·화면 결과", "Capture and Display the Photo"]],
        c02: [["원본 열기", "Open the Original"], ["사진 편집", "Edit the Photo"], ["저장 확인", "Verify the Saved File"], ["파일 제출", "Submit the File"]],
        c03: [["실행 요청", "Request Launch"], ["RAM에서 실행", "Start in RAM"], ["창과 탭 표시", "Show Window and Tabs"], ["종료 상태 확인", "Check the Closing State"]],
        c04: [["물리 상태 확인", "Check Physical State"], ["시스템 카메라 확인", "Check the System Camera"], ["앱 권한 확인", "Check App Permission"], ["업데이트·다시 시작", "Update or Restart"]],
        d02: [["장소 탭", "Tap a Place"], ["두 손가락 확대", "Pinch to Zoom In"], ["지도 스크롤", "Pan the Map"], ["길게 눌러 메뉴 열기", "Long-press for Options"]],
        d03: [["문장 선택", "Select the Sentence"], ["클립보드에 복사", "Copy to the Clipboard"], ["붙일 자리 지정", "Place the Text Cursor"], ["문장 붙여넣기", "Paste the Sentence"]],
        e01: [["드라이브 열기", "Open the Drive"], ["폴더 따라가기", "Open Nested Folders"], ["파일 찾기", "Find the File"], ["전체 경로 확인", "Check the Full Path"]],
        e02: [["형식 확인", "Inspect the Format"], ["내보내기 열기", "Open Export"], ["형식과 이름 지정", "Choose Format and Name"], ["저장 결과 확인", "Verify the Saved File"]],
        e03: [["원본 편집", "Edit the Original"], ["새 파일로 저장", "Save as a New File"], ["이름 구분", "Use a Distinct Name"], ["두 파일 확인", "Verify Both Files"]],
        e04: [["대상 종류 확인", "Identify the Target"], ["연결 만들기", "Create a Link"], ["실제 대상 열기", "Open the Actual Target"], ["주소·경로 확인", "Check the URL or Path"]],
        e05: [["USB 사본", "Copy to USB"], ["클라우드·동기화", "Use Cloud Storage and Sync"], ["날짜별 백업", "Create a Dated Backup"], ["ZIP 묶음", "Create a ZIP Archive"]],
        f01: [["기기·화면 조건 확인", "Check the Device and Display"], ["기기별 표시 옵션 확인", "Check Device Display Options"], ["글자·배율 조절", "Adjust Text Size or Scale"], ["잘림·가독성 확인", "Check Fit and Readability"]],
        f02: [["그림 구조 구분", "Identify Image Structure"], ["사용 조건 확인", "Check the Requirements"], ["파일 형식 선택", "Choose a File Format"], ["결과 비교", "Compare the Results"]],
        f03: [["기록 범위 결정", "Decide What to Record"], ["기록 방식 선택", "Choose a Capture Method"], ["개인정보 가리기", "Hide Private Information"], ["파일 재생 확인", "Review the Recording"]],
        g01: [["공기 진동", "Create Air Vibration"], ["전기 신호", "Convert to an Electrical Signal"], ["표본·숫자", "Sample and Encode Values"], ["다시 소리", "Recreate Sound"]],
        g02: [["빈 공간 확인", "Check Free Space"], ["파일 크기 확인", "Check File Size"], ["단위 맞춰 계산", "Convert Units and Divide"], ["여유 공간 남기기", "Leave Working Space"]],
        g03: [["파일 크기 확인", "Check File Size"], ["실제 속도 확인", "Measure the Transfer Rate"], ["이론 시간 계산", "Calculate the Ideal Time"], ["실제 지연 고려", "Allow for Real-world Delay"]],
        h01: [["요청 준비", "Prepare the Request"], ["Wi-Fi로 공유기까지", "Send to the Router over Wi-Fi"], ["인터넷 경로 통과", "Travel Across Networks"], ["응답 화면 표시", "Display the Response"]],
        h02: [["URL 해석", "Read the URL"], ["DNS로 주소 찾기", "Resolve the Address with DNS"], ["서버에 요청", "Request the Page"], ["응답 화면 표시", "Render the Response"]],
        h03: [["검색어 입력", "Enter a Specific Query"], ["도메인·기관 확인", "Check Domain and Organization"], ["원문 근거 확인", "Check the Original Source"], ["출처 기록", "Record the Source"]],
        h04: [["답 선택", "Collect the Answer"], ["서버로 전송", "Send to the Server"], ["서버 채점", "Grade on the Server"], ["점수 저장·표시", "Store and Display the Result"]],
        h05: [["로컬 저장·시험", "Save and Test Locally"], ["서버 배포 확인", "Verify Deployment"], ["공개 주소 점검", "Check the Public Version"], ["캐시 새로고침", "Refresh Cached Files"]],
        i01: [["계정 정보 입력", "Enter Account Credentials"], ["두 번째 인증", "Enter the Second Factor"], ["허용 기능 요청", "Request an Allowed Action"], ["권한 거부 비교", "Compare a Blocked Action"]],
        i02: [["실제 주소 확인", "Inspect the Actual Address"], ["요구 정보 확인", "Check What Is Requested"], ["공식 주소 직접 열기", "Open the Official Site Directly"], ["별도 확인·신고", "Verify and Report Separately"]],
        j01: [["다운로드 폴더 열기", "Open Downloads"], ["사진 파일 선택", "Select the Photo File"], ["과제 폴더로 이동", "Move to the Assignment Folder"], ["양쪽 위치 확인", "Verify Both Locations"]],
        j02: [["로봇 위치 바꾸기", "Move the Robot"], ["클릭 사건 받기", "Receive the Click Event"], ["위치 조건·분기", "Compare and Branch"], ["남은 별 반복", "Loop While Stars Remain"]],
        j03: [["오류 재현", "Reproduce the Error"], ["기록 관찰", "Inspect the Log"], ["한 원인 수정", "Fix One Cause"], ["재시험·회귀 시험", "Retest and Run Regression"]]
    });

    const normalizeStep = (step, index, lessonId) => {
        if (Array.isArray(step) && step.length >= 3) return step;
        const namedStep = stepNames[lessonId]?.[index];
        const description = Array.isArray(step) ? step[1] : String(step);
        if (namedStep) return [namedStep[0], namedStep[1], description];
        if (Array.isArray(step) && step.length === 2) {
            const numbered = /^\d+$/.test(String(step[0]));
            return [numbered ? `${index + 1}단계` : step[0], `Step ${index + 1}`, step[1]];
        }
        return [`${index + 1}단계`, `Step ${index + 1}`, String(step)];
    };

    const makeLesson = (spec) => ({
        id: spec.id,
        code: spec.id.toUpperCase(),
        number: spec.number,
        domain: spec.domain,
        title: spec.title,
        english: spec.english,
        conceptTitle: spec.concept,
        visual: window.COMPUTER_CONCEPT_VISUAL?.(spec, imageAsset) || relationshipVisual(spec.nodes, spec.caption),
        details: spec.details || spec.nodes.map((node) => [node[0], node[1], node[2]]),
        deviceComparison: spec.deviceComparison,
        workedExample: {
            title: spec.example[0],
            english: spec.example[1],
            intro: spec.example[2],
            steps: spec.steps.map((step, index) => normalizeStep(step, index, spec.id))
        },
        comparisons: {
            title: spec.compare[0],
            english: spec.compare[1],
            cards: spec.comparisons
        },
        analogy: {
            title: spec.analogy[0],
            english: spec.analogy[1],
            text: spec.analogy[2],
            limit: spec.analogy[3],
            teachback: spec.analogy[4]
        },
        activity: {
            type: "sort",
            title: spec.activity[0],
            instruction: spec.activity[1],
            categories: spec.activity[2].map((entry) => ({ id: entry[0], label: entry[1], english: entry[2] })),
            items: spec.activity[3].map((entry) => ({ id: entry[0], label: entry[1], english: entry[2], category: entry[3] })),
            success: spec.activity[4]
        },
        questions: spec.questions.map((entry) => ({
            text: entry[0],
            options: entry[1],
            answer: entry[2],
            concept: entry[3],
            explanation: entry[4]
        }))
    });

    window.COMPUTER_CORE_MODULES = modules;
    window.COMPUTER_IMAGE_ASSET = imageAsset;
    window.COMPUTER_LESSON_FACTORY = makeLesson;
    window.COMPUTER_FOUNDATION_LESSONS = [];
})();
