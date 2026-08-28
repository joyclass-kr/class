(() => {
    "use strict";

    const isCourseRootPage = document.body.dataset.courseRoot === "true";
    const asset = (name) => `${isCourseRootPage ? "assets" : "../assets"}/images/${name}`;
    const portalHref = isCourseRootPage ? "../../../../" : "../../../../../";
    const lessonHref = (id) => {
        if (id === "a01") return isCourseRootPage ? "./" : "../";
        return isCourseRootPage ? `lessons/?lesson=${id}` : `?lesson=${id}`;
    };

    const detailedLessons = [
        {
            id: "a01",
            code: "A01",
            number: 1,
            domain: "컴퓨터의 기본 원리",
            title: "컴퓨터는 무슨 일을 할까?",
            english: "What Does a Computer Do?",
            conceptTitle: "컴퓨터는 정보를 받아 계산하고, 결과를 보여 주거나 저장한다",
            visual: `
                <section class="foundation-direct-lab a01-signal-lab" data-a01-lab data-input="camera" data-route="preview" data-run-state="idle" aria-labelledby="a01LabTitle">
                    <header class="foundation-lab-heading has-context">
                        <div><span>신호 추적 실험 <small>Signal Tracing Lab</small></span><h3 id="a01LabTitle">하나의 입력이 처리된 뒤 출력과 저장 중 어디로 가는지 실행해 보세요.</h3></div>
                        <button type="button" class="foundation-reset" data-a01-reset>처음 상태 <small>Reset</small></button>
                        <figure class="foundation-context-figure">
                            <img src="${asset("a01-input-process-output-storage-illustration-v1-768.webp")}" srcset="${asset("a01-input-process-output-storage-illustration-v1-768.webp")} 768w, ${asset("a01-input-process-output-storage-illustration-v1-1536.webp")} 1536w" sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px" width="1536" height="1024" loading="eager" decoding="async" alt="바람개비에서 온 빛이 태블릿 카메라로 들어가 처리 칩을 거친 뒤 화면에 보이고 사진 파일로 저장되는 흐름">
                            <figcaption>출력·저장 두 경로<small>Output &amp; Storage</small></figcaption>
                        </figure>
                    </header>
                    <div class="a01-controls">
                        <fieldset><legend>1. 입력 고르기 <small>Choose Input</small></legend><div class="foundation-choice-row" role="group" aria-label="추적할 입력 선택">
                            <button type="button" data-a01-input="camera" aria-pressed="true"><span aria-hidden="true">▣</span>카메라 <small>Camera</small></button>
                            <button type="button" data-a01-input="keyboard" aria-pressed="false"><span aria-hidden="true">⌨</span>키보드 <small>Keyboard</small></button>
                            <button type="button" data-a01-input="microphone" aria-pressed="false"><span aria-hidden="true">◉</span>마이크 <small>Microphone</small></button>
                        </div></fieldset>
                        <fieldset><legend>2. 처리 뒤 보낼 길 <small>Choose Route</small></legend><div class="foundation-choice-row a01-route-row" role="group" aria-label="처리한 데이터의 경로 선택">
                            <button type="button" data-a01-route="preview" aria-pressed="true">출력만 <small>Output Only</small></button>
                            <button type="button" data-a01-route="save" aria-pressed="false">출력 + 파일 저장 <small>Output + Save</small></button>
                        </div></fieldset>
                        <button type="button" class="foundation-run" data-a01-run>신호 보내기 <small>Run Signal</small></button>
                    </div>
                    <div class="a01-signal-stage" aria-label="입력 데이터가 처리된 뒤 출력과 저장으로 갈라지는 경로">
                        <article class="a01-node a01-input-node" data-a01-node="input"><span>입력 <small>Input</small></span><strong data-a01-input-title>카메라</strong><p data-a01-input-data>센서가 빛의 밝기와 색을 측정</p></article>
                        <span class="a01-arrow" aria-hidden="true">→</span>
                        <article class="a01-node a01-process-node" data-a01-node="process"><span>처리 <small>Processing</small></span><strong data-a01-process-title>사진 데이터 만들기</strong><p data-a01-process-data>빛 값을 픽셀로 배열하고 색을 보정</p></article>
                        <span class="a01-branch" aria-hidden="true"><i></i><b></b></span>
                        <div class="a01-destinations">
                            <article class="a01-node a01-output-node" data-a01-node="output"><span>출력 <small>Output</small></span><strong data-a01-output-title>화면 미리보기</strong><p data-a01-output-data>픽셀이 장면을 바로 보여 줌</p><em data-a01-output-state>아직 실행하지 않음</em></article>
                            <article class="a01-node a01-storage-node" data-a01-node="storage"><span>저장 <small>Storage</small></span><strong data-a01-storage-title>photo.jpg</strong><p data-a01-storage-data>저장 장치에 사진 파일 기록</p><em data-a01-storage-state>경로를 선택하지 않음</em></article>
                        </div>
                    </div>
                    <div class="foundation-evidence a01-evidence" aria-live="polite"><strong>실행 증거 <small>Run Evidence</small></strong><p data-a01-status>입력과 경로를 고른 뒤 신호를 보내세요.</p><dl><div><dt>화면·소리</dt><dd data-a01-output-proof>대기 중</dd></div><div><dt>저장 장치</dt><dd data-a01-storage-proof>대기 중</dd></div></dl></div>
                </section>`,
            details: [
                ["입력", "Input", "사람의 조작이나 센서의 측정값을 컴퓨터 안으로 받는 역할입니다. 스마트폰의 터치 좌표, 카메라 센서가 측정한 빛, 키보드가 보낸 키 신호가 입력 데이터가 됩니다."],
                ["처리", "Processing", "CPU·GPU와 실행 중인 앱이 명령에 따라 데이터를 계산·비교·변환합니다. 카메라 앱은 센서 값을 픽셀로 배열하고 밝기와 색을 보정합니다."],
                ["출력", "Output", "처리 결과를 사람이 확인할 수 있게 나타냅니다. 디스플레이의 픽셀, 스피커의 소리, 프린터의 종이 출력이 서로 다른 출력 방식입니다."],
                ["저장", "Storage", "나중에 다시 사용할 데이터를 파일로 기록합니다. 화면에 잠깐 보이는 것과 SSD나 모바일 플래시 저장 장치에 기록되어 전원을 꺼도 남는 것은 다릅니다."]
            ],
            deviceComparison: {
                title: "같은 네 역할이 기기마다 어디에서 일어날까?",
                english: "One Principle Across Four Devices",
                intro: "모양은 달라도 입력–처리–출력–저장 관계는 같습니다. 아래 그림은 각 기기의 대표적인 내부 구조입니다.",
                cards: [
                    { title: "데스크톱 PC", english: "Desktop PC", image: asset("desktop-hardware-cutaway-768.webp"), alt: "열린 데스크톱 본체의 대표적인 내부 구조", relation: "마우스·키보드 → CPU·GPU → 모니터 / SSD·HDD", note: "처리와 저장 부품을 따로 교체할 수 있는 경우가 많습니다." },
                    { title: "Chromebook", english: "Chromebook", image: asset("chromebook-internals-exploded-768.webp"), alt: "화면과 키보드 아래 메인 기판, 배터리, 스피커가 분리된 Chromebook형 노트북의 대표 내부 구조", relation: "키보드·트랙패드 → 프로세서 → 화면 / 플래시 저장 장치", note: "노트북 본체 안에 화면·입력·배터리가 함께 들어 있습니다." },
                    { title: "태블릿·iPad", english: "Tablet / iPad", image: asset("tablet-internals-exploded-768.webp"), alt: "터치 디스플레이, 배터리 두 장, 로직 보드와 스피커가 분리된 태블릿의 대표 내부 구조", relation: "터치·카메라 → SoC → 화면·스피커 / 플래시 저장 장치", note: "터치스크린이 입력 장치와 출력 장치 역할을 함께 합니다." },
                    { title: "스마트폰", english: "Smartphone", image: asset("smartphone-internals-exploded-768.webp"), alt: "화면, 배터리, 로직 보드, 카메라와 작은 부품이 층별로 분리된 스마트폰의 대표 내부 구조", relation: "터치·센서 → SoC → 화면·진동 / 플래시 저장 장치", note: "작은 공간에 처리·통신·저장 부품이 촘촘하게 결합됩니다." }
                ]
            },
            workedExample: {
                title: "태블릿으로 사진을 찍은 뒤 1초",
                english: "One Second After a Photo",
                intro: "입력·처리·출력·저장은 외울 네 단어가 아니라 한 작업 안에서 이어지는 역할입니다.",
                steps: [
                    ["촬영 입력", "Capture Input", "손가락의 터치 좌표와 이미지 센서가 측정한 빛이 입력 데이터로 들어옵니다."],
                    ["RAM에 작업 준비", "Working in RAM", "카메라 앱과 센서 데이터가 CPU가 빠르게 사용할 수 있도록 RAM에 놓입니다."],
                    ["사진 처리", "Image Processing", "CPU와 영상 처리 장치가 픽셀 배열, 밝기, 색, 흔들림 보정을 계산합니다."],
                    ["화면 출력", "Display Output", "처리된 픽셀값에 따라 디스플레이의 작은 빛점들이 색과 밝기를 나타냅니다."],
                    ["파일 만들기", "File Encoding", "이 예시에서는 사진 데이터와 촬영 정보를 JPG 파일 규칙으로 묶습니다. 기기에 따라 HEIC 같은 다른 형식도 씁니다."],
                    ["저장 장치 기록", "Storage Write", "완성된 파일을 플래시 저장 장치에 기록해 화면을 끄거나 전원을 꺼도 다시 열 수 있게 합니다."]
                ]
            },
            comparisons: {
                title: "화면에 보이는 것과 저장된 것을 구별하기",
                english: "Display Is Not Storage",
                cards: [
                    ["카메라 미리보기", "Live Preview", "센서 입력을 계속 처리해 화면에 출력하는 중", "아직 촬영 파일이 만들어지지 않을 수 있음"],
                    ["저장된 사진", "Saved Photo", "정해진 파일 형식으로 저장 장치에 기록된 데이터", "전원을 껐다 켜도 사진 앱에서 다시 열 수 있음"],
                    ["앱 실행 중 작업", "Working Data", "현재 필요한 명령과 데이터가 RAM에 펼쳐진 상태", "일반적인 RAM 내용은 전원이 끊기면 유지되지 않음"],
                    ["사진 파일", "Photo File", "이름·형식·위치를 가진 데이터 묶음", "앱이 파일을 읽어 다시 화면에 출력할 수 있음"]
                ]
            },
            analogy: {
                title: "비유: 방송 제작실",
                english: "Broadcast Studio Analogy",
                text: "카메라와 마이크는 입력, 편집실은 처리, 방송 화면과 스피커는 출력, 녹화 보관실은 저장에 비유할 수 있습니다.",
                limit: "컴퓨터 데이터는 실제 방송 장비 사이를 한 번만 이동하는 물건이 아닙니다. 같은 데이터를 복사해 화면에 보여 주면서 파일로도 기록할 수 있습니다.",
                teachback: "사진이 화면에는 보이지만 파일로 저장되지 않은 상황을 입력·처리·출력·저장 중 어떤 역할이 끝나지 않은 것인지 설명해 보세요."
            },
            activity: {
                type: "sort",
                title: "네 기기의 동작을 역할별로 연결하기",
                instruction: "기기 이름에 기대지 말고, 각 동작이 데이터를 받는지·계산하는지·나타내는지·남기는지를 근거로 끌어다 놓으세요.",
                categories: [
                    { id: "input", label: "입력", english: "Input" },
                    { id: "processing", label: "처리", english: "Processing" },
                    { id: "output", label: "출력", english: "Output" },
                    { id: "storage", label: "저장", english: "Storage" }
                ],
                items: [
                    { id: "camera-light", label: "스마트폰 카메라 센서가 빛을 측정한다", english: "Camera Sensor Measures Light", category: "input" },
                    { id: "keyboard-key", label: "Chromebook 키보드가 눌린 키 신호를 보낸다", english: "Keyboard Sends a Key Signal", category: "input" },
                    { id: "image-calc", label: "SoC가 사진의 밝기와 색을 계산한다", english: "SoC Calculates Image Data", category: "processing" },
                    { id: "page-layout", label: "브라우저가 글과 그림의 위치를 계산한다", english: "Browser Calculates Page Layout", category: "processing" },
                    { id: "screen-pixels", label: "디스플레이 픽셀이 사진을 보여 준다", english: "Display Shows Pixels", category: "output" },
                    { id: "speaker-sound", label: "스피커가 음악을 소리로 낸다", english: "Speaker Produces Sound", category: "output" },
                    { id: "photo-file", label: "사진 파일을 모바일 저장 장치에 기록한다", english: "Write Photo to Mobile Storage", category: "storage" },
                    { id: "document-file", label: "문서 파일을 SSD에 기록한다", english: "Write Document to SSD", category: "storage" }
                ],
                success: "기기의 모양이 달라도 입력–처리–출력–저장이라는 같은 관계로 설명할 수 있음을 확인했습니다."
            },
            questions: [
                { text: "태블릿 카메라 화면에는 장면이 계속 보이지만 촬영 버튼을 누르지 않았습니다. 현재 일어난 역할의 조합으로 가장 알맞은 것은 무엇입니까?", options: ["센서 입력–영상 처리–화면 출력", "센서 입력–영상 처리–파일 저장", "화면 입력–센서 처리–영상 출력", "센서 입력–파일 저장–화면 출력"], answer: 0, concept: "입력·처리·출력 · Input, Processing, and Output", explanation: "미리보기는 센서가 빛을 입력하고 앱과 처리 장치가 계산한 결과를 화면에 출력한 상태입니다. 촬영 파일 저장은 아직 일어나지 않을 수 있습니다." },
                { text: "사진을 찍은 뒤 기기를 완전히 종료했다가 다시 켰는데도 사진 앱에서 열 수 있었습니다. 이 사실을 가장 직접적으로 뒷받침하는 것은 무엇입니까?", options: ["사진 데이터가 저장 장치에 파일로 기록되었다", "사진 앱이 카메라 센서에서 이전 장면을 다시 측정했다", "디스플레이 회로가 꺼지기 전 픽셀 빛을 보존했다", "프로세서가 원본 데이터 없이 같은 사진을 다시 계산했다"], answer: 0, concept: "저장 · Storage", explanation: "전원을 끈 뒤에도 다시 열 수 있으려면 사진 데이터가 비휘발성 저장 장치에 파일로 기록되어 있어야 합니다." },
                { text: "Chromebook에서 키를 눌렀더니 문서 앱이 글자가 들어갈 위치를 계산했습니다. 키 신호와 위치 계산의 역할을 순서대로 고르면 무엇입니까?", options: ["입력–처리", "처리–저장", "저장–출력", "출력–입력"], answer: 0, concept: "입력과 처리 · Input and Processing", explanation: "키보드는 눌린 키를 입력으로 보내고, 앱과 CPU는 현재 커서 위치와 입력 규칙을 처리합니다." },
                { text: "스마트폰에서 음악 파일을 열자 CPU가 파일 형식을 해석하고 스피커가 소리를 냈습니다. CPU와 스피커의 역할을 순서대로 고르면 무엇입니까?", options: ["처리–출력", "입력–저장", "저장–처리", "출력–입력"], answer: 0, concept: "처리와 출력 · Processing and Output", explanation: "파일 데이터를 해석하는 것은 처리이고, 전기 신호를 실제 소리로 나타내는 스피커는 출력 장치입니다." },
                { text: "그림 앱에서 선을 그린 직후 저장하지 않고 앱을 강제로 종료했습니다. 다시 열었을 때 선이 사라질 수 있는 이유는 무엇입니까?", options: ["임시 작업 데이터가 RAM에 있었고 저장 장치 기록이 끝나지 않았기 때문이다", "저장된 파일의 화면 해상도가 터치 좌표와 달랐기 때문이다", "터치 센서가 입력 좌표를 디스플레이 픽셀로 출력했기 때문이다", "GPU의 그림 계산 결과가 원본 파일을 대신해 기록되었기 때문이다"], answer: 0, concept: "작업 데이터와 파일 · Working Data and Saved Files", explanation: "실행 중 작업이 RAM에 있고 저장 장치의 파일에 기록되지 않았다면 앱 종료 뒤 변경 내용이 남지 않을 수 있습니다." },
                { text: "PC, Chromebook, 태블릿, 스마트폰에서 공통으로 찾아야 할 관계는 무엇입니까?", options: ["입력을 받고 명령에 따라 처리한 뒤 결과를 출력하거나 저장한다", "처리 장치의 모양과 운영체제 이름이 일치해야 앱을 실행한다", "키보드나 터치 신호가 처리 장치를 거치지 않고 화면에 표시된다", "저장 장치가 앱 명령을 해석하고 CPU가 파일을 장기 보관한다"], answer: 0, concept: "공통 원리 · Common Computing Principle", explanation: "부품의 모양과 운영체제는 달라도 데이터를 입력받아 처리하고 출력하거나 저장하는 기본 관계는 공통입니다." }
            ]
        },
        {
            id: "a02",
            number: 2,
            title: "하드웨어와 소프트웨어는 어떻게 다를까?",
            english: "Hardware and Software",
            conceptTitle: "손으로 만지는 부품은 하드웨어이고, 그 부품에 일을 시키는 프로그램은 소프트웨어다",
            visual: `
                <section class="foundation-direct-lab a02-cooperation-lab" data-a02-lab data-hardware="display" data-command="pixels" data-result="idle" aria-labelledby="a02LabTitle">
                    <header class="foundation-lab-heading has-context">
                        <div><span>협업 실행 실험 <small>Hardware–Software Cooperation Lab</small></span><h3 id="a02LabTitle">물리 장치와 소프트웨어 명령을 연결해 실제 결과가 생기는 조건을 확인하세요.</h3></div>
                        <button type="button" class="foundation-reset" data-a02-reset>처음 상태 <small>Reset</small></button>
                        <figure class="foundation-context-figure">
                            <img src="${asset("a02-hardware-software-cooperation-illustration-v1-768.webp")}" srcset="${asset("a02-hardware-software-cooperation-illustration-v1-768.webp")} 768w, ${asset("a02-hardware-software-cooperation-illustration-v1-1536.webp")} 1536w" sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px" width="1536" height="1024" loading="eager" decoding="async" alt="학생이 태블릿에서 고른 명령이 투명한 로봇의 회로와 부품을 움직여 펜으로 선을 그리게 하는 모습">
                            <figcaption>명령과 장치의 협업<small>Software + Hardware</small></figcaption>
                        </figure>
                    </header>
                    <div class="a02-configurator">
                        <fieldset><legend>하드웨어 선택 <small>Physical Device</small></legend><div class="foundation-choice-row" role="group" aria-label="결과를 만들 하드웨어 선택"><button type="button" data-a02-hardware="display" aria-pressed="true">디스플레이 <small>Display</small></button><button type="button" data-a02-hardware="speaker" aria-pressed="false">스피커 <small>Speaker</small></button><button type="button" data-a02-hardware="printer" aria-pressed="false">프린터 <small>Printer</small></button></div></fieldset>
                        <fieldset><legend>소프트웨어 명령 선택 <small>Software Command</small></legend><div class="foundation-choice-row" role="group" aria-label="실행할 소프트웨어 명령 선택"><button type="button" data-a02-command="pixels" aria-pressed="true">픽셀 그리기 <small>Draw Pixels</small></button><button type="button" data-a02-command="tone" aria-pressed="false">소리 재생 <small>Play Tone</small></button><button type="button" data-a02-command="page" aria-pressed="false">문서 인쇄 <small>Print Page</small></button></div></fieldset>
                    </div>
                    <div class="a02-presence-row" aria-label="하드웨어와 소프트웨어 준비 상태"><button type="button" data-a02-presence="hardware" aria-pressed="true"><span>하드웨어 연결</span><small data-a02-hardware-presence>연결됨 · Connected</small></button><button type="button" data-a02-presence="software" aria-pressed="true"><span>소프트웨어 명령</span><small data-a02-software-presence>불러옴 · Loaded</small></button><button type="button" class="foundation-run" data-a02-run>협업 실행 <small>Run Together</small></button></div>
                    <div class="a02-execution-line" aria-label="소프트웨어 명령이 운영체제와 드라이버를 거쳐 하드웨어 결과가 되는 과정">
                        <article class="a02-stage software-stage" data-a02-stage="software"><span>소프트웨어 <small>Software</small></span><strong data-a02-command-title>픽셀 그리기</strong><p data-a02-command-packet>색·좌표 명령</p></article><span class="a02-link" aria-hidden="true">→</span>
                        <article class="a02-stage bridge-stage" data-a02-stage="bridge"><span>운영체제·드라이버 <small>OS &amp; Driver</small></span><strong>명령 전달</strong><p data-a02-interface>화면 출력 규칙</p></article><span class="a02-link" aria-hidden="true">→</span>
                        <article class="a02-stage hardware-stage" data-a02-stage="hardware"><span>하드웨어 <small>Hardware</small></span><strong data-a02-hardware-title>디스플레이</strong><p data-a02-capability>픽셀값을 실제 빛으로 바꿈</p></article><span class="a02-link" aria-hidden="true">→</span>
                        <div class="a02-result-stage" data-a02-output="display" aria-label="실행 결과 미리보기"><span class="a02-result-object" aria-hidden="true"></span><strong data-a02-result-title>실행 전</strong><p data-a02-result-copy>두 준비 상태와 조합을 확인하세요.</p></div>
                    </div>
                    <div class="foundation-evidence a02-evidence" aria-live="polite"><strong>조건 검사 <small>Evidence Check</small></strong><dl><div><dt>물리 장치</dt><dd data-a02-evidence-hardware>디스플레이 연결됨</dd></div><div><dt>실행 명령</dt><dd data-a02-evidence-software>픽셀 그리기 불러옴</dd></div><div><dt>연결 규칙</dt><dd data-a02-evidence-interface>화면 출력 명령과 디스플레이가 맞음</dd></div><div><dt>결과</dt><dd data-a02-evidence-result>아직 실행하지 않음</dd></div></dl></div>
                </section>`,
            details: [
                ["하드웨어", "Hardware", "손으로 만질 수 있는 물리적인 장치입니다. CPU·RAM처럼 본체 안에 있는 부품과 키보드·화면처럼 밖에서 보이는 장치가 모두 포함됩니다."],
                ["소프트웨어", "Software", "하드웨어가 어떤 일을 하도록 만든 프로그램과 명령입니다. 저장 장치에 기록되어 있다가 실행할 때 RAM으로 불려 오고 CPU가 명령을 처리합니다. 사진·문서처럼 프로그램이 다루는 내용은 데이터라고 따로 구분합니다."],
                ["둘의 관계", "How They Work Together", "그림 앱만 있어도 화면과 CPU가 없으면 실행할 수 없고, 하드웨어만 있어도 실행할 소프트웨어가 없으면 원하는 작업을 지시할 수 없습니다."],
                ["물리 장치와 명령의 경계", "Boundary Between Device and Instructions", "프린터 본체는 하드웨어이고 프린터 드라이버는 소프트웨어입니다. 같은 기능에 함께 쓰여도 물리 장치와 명령은 구별됩니다."]
            ],
            deviceComparison: {
                title: "PC와 모바일 기기에서 하드웨어·소프트웨어 찾기",
                english: "Hardware and Software Across Devices",
                intro: "모양과 결합 방식은 달라도 물리적인 부품은 하드웨어이고, 그 부품에서 실행되는 운영체제와 앱은 소프트웨어입니다.",
                cards: [
                    { title: "데스크톱 PC", english: "Desktop PC", image: asset("desktop-hardware-cutaway-768.webp"), alt: "CPU, RAM, 그래픽 카드와 저장 장치가 따로 연결된 데스크톱 내부", relation: "CPU·RAM·SSD = 하드웨어 / Windows·앱 = 소프트웨어", note: "부품이 슬롯과 케이블로 나뉘어 보여 역할을 관찰하기 쉽습니다." },
                    { title: "Chromebook", english: "Chromebook", image: asset("chromebook-internals-exploded-768.webp"), alt: "화면, 키보드, 배터리와 메인 기판이 분리된 Chromebook형 노트북 내부", relation: "프로세서·배터리 = 하드웨어 / ChromeOS·Chrome = 소프트웨어", note: "노트북 한 몸 안에 입력·출력·처리·저장 장치가 함께 들어 있습니다." },
                    { title: "태블릿·iPad", english: "Tablet / iPad", image: asset("tablet-internals-exploded-768.webp"), alt: "터치 화면, 배터리와 로직 보드가 분리된 태블릿 내부", relation: "터치 화면·SoC = 하드웨어 / iPadOS·그림 앱 = 소프트웨어", note: "터치 화면은 물리 장치이고 화면에 나타난 아이콘과 앱은 소프트웨어 쪽입니다." },
                    { title: "Android·iPhone", english: "Smartphone", image: asset("smartphone-internals-exploded-768.webp"), alt: "화면, 배터리, 로직 보드, 카메라가 분리된 스마트폰 내부", relation: "카메라·SoC·저장 칩 = 하드웨어 / Android·iOS·앱 = 소프트웨어", note: "작은 칩 안에 여러 기능이 합쳐져 있어도 물리 회로와 실행 명령은 구별됩니다." }
                ]
            },
            workedExample: {
                title: "메모장에 ‘가’를 입력하면",
                english: "From Key Press to Screen",
                intro: "키 하나를 눌러도 하드웨어와 소프트웨어가 차례로 요청과 결과를 주고받습니다.",
                steps: [
                    ["키보드", "Keyboard", "키 아래 스위치가 눌린 위치를 전기 신호로 보냅니다. 아직 화면의 글자는 아닙니다."],
                    ["RAM과 CPU", "RAM & CPU", "실행 중인 드라이버·운영체제·앱의 명령과 작업 데이터가 RAM에 놓이고 CPU가 다음 단계를 처리합니다."],
                    ["드라이버와 운영체제", "Driver & OS", "CPU가 드라이버와 운영체제의 명령을 실행해 어느 키가 눌렸는지 읽고 한글 입력 상태와 조합 규칙을 확인합니다."],
                    ["메모 앱", "Text App", "CPU가 메모 앱의 명령을 실행해 받은 글자를 현재 문서의 커서 위치에 넣습니다."],
                    ["화면", "Display", "글자 모양이 픽셀의 밝기와 색 데이터로 바뀌어 디스플레이에 나타납니다."],
                    ["저장 장치", "Storage", "저장 버튼을 눌러야 문서 데이터가 파일로 SSD에 기록되어 전원을 꺼도 남습니다."]
                ]
            },
            comparisons: {
                title: "물건·명령·내용을 구별하기",
                english: "Hardware, Software, and Data",
                cards: [
                    ["키보드", "Hardware", "손으로 누르는 물리 장치", "스위치가 눌린 위치를 신호로 보냄"],
                    ["메모 앱", "Software", "CPU가 실행할 명령의 묶음", "입력·편집·저장 방법을 정함"],
                    ["운영체제", "System Software", "여러 앱과 장치를 관리하는 기본 소프트웨어", "키보드 입력과 파일 저장 요청을 연결함"],
                    ["문서 파일", "Data", "앱으로 만든 내용", "소프트웨어 자체가 아니라 소프트웨어가 다루는 자료"]
                ]
            },
            analogy: {
                title: "비유: 주방과 요리법",
                english: "Kitchen Analogy",
                text: "주방 기구는 하드웨어, 요리 순서를 적은 조리법은 소프트웨어, 실제로 다루는 재료와 완성 음식은 데이터에 비유할 수 있습니다.",
                limit: "하지만 컴퓨터는 맛을 판단하거나 조리법의 뜻을 이해하지 않습니다. CPU는 주어진 기계 명령을 매우 빠르고 정확하게 실행할 뿐입니다.",
                teachback: "‘프린터 본체·프린터 드라이버·인쇄할 사진’이 각각 무엇인지 자신의 말로 설명해 보세요."
            },
            activity: {
                type: "sort",
                title: "장치·프로그램·자료 구분하기",
                instruction: "각 카드가 만질 수 있는 장치인지, 실행되는 명령인지, 프로그램이 다루는 자료인지 근거를 생각한 뒤 끌어다 놓으세요.",
                categories: [
                    { id: "hardware", label: "하드웨어", english: "Hardware" },
                    { id: "software", label: "소프트웨어", english: "Software" },
                    { id: "data", label: "데이터", english: "Data" }
                ],
                items: [
                    { id: "keyboard", label: "키보드", english: "Keyboard", category: "hardware" },
                    { id: "cpu", label: "CPU", english: "Central Processing Unit", category: "hardware" },
                    { id: "monitor", label: "모니터", english: "Monitor", category: "hardware" },
                    { id: "windows", label: "Windows 11", english: "Operating System", category: "software" },
                    { id: "chromeos", label: "ChromeOS", english: "Operating System", category: "software" },
                    { id: "paint", label: "그림 앱", english: "Drawing App", category: "software" },
                    { id: "document", label: "내가 쓴 문서 파일", english: "Document File", category: "data" },
                    { id: "photo", label: "카메라로 찍은 사진", english: "Photo Data", category: "data" }
                ],
                success: "물리 장치, 실행 명령, 프로그램이 다루는 자료를 구별했습니다. 세 범주는 함께 작동하지만 같은 종류는 아닙니다."
            },
            questions: [
                {
                    text: "학교 PC의 모니터만 새것으로 바꾸었습니다. 저장되어 있던 문서와 그림 앱은 그대로입니다. 바뀐 대상을 가장 정확하게 설명한 것은 무엇입니까?",
                    options: ["출력 하드웨어가 바뀌었다", "운영체제가 바뀌었다", "문서 파일의 형식이 바뀌었다", "그림 앱의 명령이 바뀌었다"],
                    answer: 0,
                    concept: "하드웨어 · Hardware",
                    explanation: "모니터는 처리 결과를 보여 주는 물리적인 출력 장치입니다. 모니터 교체만으로 저장된 소프트웨어와 파일이 바뀌지는 않습니다."
                },
                {
                    text: "같은 노트북에 ChromeOS 대신 Linux를 설치했습니다. 이 변화를 설명한 것은 무엇입니까?",
                    options: ["CPU를 다른 부품으로 교체했다", "같은 하드웨어에서 운영체제 소프트웨어를 바꿨다", "화면을 입력 장치로 바꿨다", "저장 장치를 RAM으로 바꿨다"],
                    answer: 1,
                    concept: "소프트웨어 · Software",
                    explanation: "운영체제는 소프트웨어입니다. 같은 물리 장치에서도 호환되는 다른 운영체제를 설치할 수 있습니다."
                },
                {
                    text: "프린터는 연결되어 있지만 운영체제에 알맞은 장치 드라이버가 없어 인쇄 명령을 전달하지 못합니다. 부족한 것은 어느 쪽입니까?",
                    options: ["종이를 잡아 주는 하드웨어", "프린터 본체의 물리적인 외장", "장치와 운영체제를 연결하는 소프트웨어", "모니터가 보여 주는 픽셀"],
                    answer: 2,
                    concept: "드라이버 · Device Driver",
                    explanation: "프린터 본체는 이미 있지만 명령을 번역해 전달할 드라이버 소프트웨어가 없는 상황입니다."
                },
                {
                    text: "태블릿 화면을 손가락으로 눌러 그림을 그렸습니다. 화면과 그림 앱의 역할을 올바르게 연결한 것은 무엇입니까?",
                    options: ["화면과 앱 모두 물리적인 입력 장치다", "화면은 입출력 하드웨어이고 앱은 좌표를 처리하는 소프트웨어다", "화면은 소프트웨어이고 앱은 저장 장치다", "화면과 앱 모두 운영체제다"],
                    answer: 1,
                    concept: "협력 관계 · Hardware–Software Cooperation",
                    explanation: "터치스크린은 접촉을 입력받고 그림을 출력하는 하드웨어이며, 그림 앱은 좌표와 색을 처리하는 소프트웨어입니다."
                },
                {
                    text: "앱 파일이 저장 장치에 있지만 CPU와 RAM이 고장 난 컴퓨터가 있습니다. 앱을 바로 실행할 수 없는 까닭은 무엇입니까?",
                    options: ["앱은 저장되어 있어도 명령을 불러와 처리할 하드웨어가 필요하기 때문이다", "앱은 저장 장치에 기록되는 순간 스스로 실행 상태가 되기 때문이다", "CPU는 앱을 처음 설치할 때 사용되고 실행할 때는 사용되지 않기 때문이다", "RAM은 실행 중인 명령보다 완성된 파일을 장기간 보관하는 장치이기 때문이다"],
                    answer: 0,
                    concept: "실행 · Program Execution",
                    explanation: "저장된 소프트웨어를 실행하려면 명령을 작업 공간으로 불러오고 처리할 RAM과 CPU가 필요합니다."
                },
{
                    text: "스마트폰 설명서에 ‘SoC, 8GB RAM, Android, 카메라 앱’이 적혀 있습니다. 하드웨어와 소프트웨어를 올바르게 나눈 것은 무엇입니까?",
                    options: ["SoC·RAM은 하드웨어이고 Android·카메라 앱은 소프트웨어다", "Android·RAM은 하드웨어이고 SoC·카메라 앱은 소프트웨어다", "SoC·Android는 하드웨어이고 RAM·카메라 앱은 소프트웨어다", "네 항목은 모두 스마트폰 안에 있으므로 같은 종류다"],
                    answer: 0,
                    concept: "모바일 하드웨어와 소프트웨어 · Mobile Hardware and Software",
                    explanation: "SoC와 RAM은 물리적인 전자 부품이고, Android는 운영체제 소프트웨어이며 카메라 앱은 응용 소프트웨어입니다."
                }
            ]
        },
        {
            id: "a03",
            number: 3,
            title: "기기·운영체제·앱은 무엇이 다를까?",
            english: "Device, Operating System, and App",
            conceptTitle: "기기는 실제 물건이고, 운영체제는 기기를 관리하며, 앱은 필요한 일을 한다",
            visual: `
                <section class="foundation-direct-lab a03-compatibility-lab" data-a03-lab data-device="pc" data-os="windows" data-app="paint" data-outcome="pending" aria-labelledby="a03LabTitle">
                    <header class="foundation-lab-heading has-context">
                        <div><span>층 조합 실험 <small>Compatibility Layer Lab</small></span><h3 id="a03LabTitle">기기–운영체제–앱을 바꿔 쌓고, 어디에서 실행이 멈추는지 증거로 확인하세요.</h3></div>
                        <button type="button" class="foundation-reset" data-a03-reset>처음 상태 <small>Reset</small></button>
                        <figure class="foundation-context-figure">
                            <img src="${asset("a03-device-os-app-layers-illustration-v1-768.webp")}" srcset="${asset("a03-device-os-app-layers-illustration-v1-768.webp")} 768w, ${asset("a03-device-os-app-layers-illustration-v1-1536.webp")} 1536w" sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px" width="1536" height="1024" loading="eager" decoding="async" alt="태블릿의 물리 부품 위에 운영체제가 장치를 관리하는 층과 그림 앱을 사용하는 화면 층이 겹쳐 있는 모습">
                            <figcaption>기기·OS·앱 세 층<small>Device · OS · App</small></figcaption>
                        </figure>
                    </header>
                    <div class="a03-selector-bank">
                        <fieldset><legend>1. 기기 <small>Device</small></legend><div class="foundation-choice-row" role="group" aria-label="기기 선택"><button type="button" data-a03-device="pc" aria-pressed="true">PC <small>Personal Computer</small></button><button type="button" data-a03-device="chromebook" aria-pressed="false">Chromebook</button><button type="button" data-a03-device="ipad" aria-pressed="false">iPad <small>Tablet</small></button><button type="button" data-a03-device="phone" aria-pressed="false">Phone <small>Android형</small></button></div></fieldset>
                        <fieldset><legend>2. 운영체제 <small>Operating System</small></legend><div class="foundation-choice-row" role="group" aria-label="운영체제 선택"><button type="button" data-a03-os="windows" aria-pressed="true">Windows</button><button type="button" data-a03-os="chromeos" aria-pressed="false">ChromeOS</button><button type="button" data-a03-os="ipados" aria-pressed="false">iPadOS</button><button type="button" data-a03-os="android" aria-pressed="false">Android</button></div></fieldset>
                        <fieldset><legend>3. 앱 <small>Application</small></legend><div class="foundation-choice-row" role="group" aria-label="앱 선택"><button type="button" data-a03-app="paint" aria-pressed="true">PC 그림판 <small>Windows App</small></button><button type="button" data-a03-app="chrome-files" aria-pressed="false">파일 앱 <small>ChromeOS App</small></button><button type="button" data-a03-app="ipad-sketch" aria-pressed="false">iPad 스케치 <small>iPadOS App</small></button><button type="button" data-a03-app="android-camera" aria-pressed="false">카메라 <small>Android App</small></button></div></fieldset>
                    </div>
                    <div class="a03-workbench">
                        <div class="a03-layer-machine" aria-label="선택한 기기 운영체제 앱의 층 구조"><article class="a03-layer app-layer" data-a03-layer="app"><span>앱 <small>App</small></span><strong data-a03-current-app>PC 그림판</strong><p data-a03-app-package>Windows용 .exe와 Windows API 요청</p></article><span class="a03-layer-link" aria-hidden="true">↕</span><article class="a03-layer os-layer" data-a03-layer="os"><span>운영체제 <small>Operating System</small></span><strong data-a03-current-os>Windows</strong><p data-a03-os-job>PC 장치 드라이버와 Windows API 제공</p></article><span class="a03-layer-link" aria-hidden="true">↕</span><article class="a03-layer device-layer" data-a03-layer="device"><span>기기 <small>Device</small></span><strong data-a03-current-device>PC</strong><p data-a03-device-hardware>PC 펌웨어·CPU·메모리·화면</p></article></div>
                        <aside class="a03-proof-panel" aria-live="polite"><div class="a03-app-preview" data-a03-preview><span aria-hidden="true"></span><strong data-a03-preview-title>실행 확인 전</strong><p data-a03-preview-copy>세 층을 고른 뒤 호환성을 확인하세요.</p></div><ol><li data-a03-proof="boot"><b>① 기기 ↔ OS</b><span data-a03-boot-proof>확인 전</span></li><li data-a03-proof="api"><b>② OS ↔ 앱</b><span data-a03-api-proof>확인 전</span></li><li data-a03-proof="run"><b>③ 실행 결과</b><span data-a03-run-proof>확인 전</span></li></ol><button type="button" class="foundation-run" data-a03-run>호환성 확인 <small>Check &amp; Run</small></button></aside>
                    </div>
                </section>`,
            details: [
                ["기기", "Device", "iPad · Chromebook · 스마트폰 · PC처럼 실제 부품으로 이루어진 제품입니다. 제조사와 제품명은 운영체제 이름과 같지 않을 수 있습니다."],
                ["운영체제", "Operating System / OS", "Windows · Android · iOS · iPadOS · macOS · ChromeOS · Linux처럼 앱 실행, 파일, 화면, 입력 장치와 권한을 관리하는 기본 소프트웨어입니다."],
                ["앱", "Application / App", "브라우저 · 카메라 · 문서 편집기처럼 특정 작업을 수행하는 소프트웨어입니다. 같은 앱도 여러 운영체제용 버전이 따로 있을 수 있습니다."],
                ["층 사이의 요청", "Requests Between Layers", "앱은 운영체제에 파일 저장이나 카메라 사용을 요청하고, 운영체제는 드라이버를 통해 하드웨어를 제어합니다."]
            ],
            deviceComparison: {
                title: "제품 이름·운영체제·앱을 층으로 나누기",
                english: "Device, OS, and App Layers",
                intro: "내부 사진은 기기 하드웨어를 보여 줍니다. 그 위에서 운영체제가 부품을 관리하고, 앱은 운영체제에 작업을 요청합니다.",
                cards: [
                    { title: "PC", english: "Device", image: asset("desktop-hardware-cutaway-768.webp"), alt: "데스크톱 PC의 대표 내부 하드웨어", relation: "PC → Windows·Linux → Edge·그림 앱", note: "PC는 제품 종류이고 Windows는 운영체제입니다." },
                    { title: "Chromebook", english: "Device Family", image: asset("chromebook-internals-exploded-768.webp"), alt: "Chromebook형 노트북의 대표 내부 하드웨어", relation: "Chromebook → ChromeOS → Chrome·파일 앱", note: "Chromebook과 ChromeOS와 Chrome은 비슷하게 들리지만 서로 다른 층입니다." },
                    { title: "iPad", english: "Tablet Device", image: asset("tablet-internals-exploded-768.webp"), alt: "iPad와 비슷한 태블릿의 대표 내부 하드웨어", relation: "iPad → iPadOS → Safari·그림 앱", note: "iPad는 기기, iPadOS는 운영체제, Safari는 앱입니다." },
                    { title: "스마트폰", english: "Smartphone Device", image: asset("smartphone-internals-exploded-768.webp"), alt: "스마트폰의 대표 내부 하드웨어", relation: "Galaxy 등 → Android → 카메라·브라우저 앱 / iPhone → iOS → Safari", note: "회사·제품 계열·운영체제·앱을 한 이름처럼 섞지 않습니다." }
                ]
            },
            workedExample: {
                title: "카메라 앱으로 사진을 찍을 때",
                english: "A Photo Request Through Three Layers",
                intro: "앱이 카메라를 직접 마음대로 움직이는 것이 아니라 운영체제에 요청하고 결과를 돌려받습니다.",
                steps: [
                    ["앱의 요청", "App Request", "카메라 앱이 운영체제에 카메라 사용과 촬영을 요청합니다."],
                    ["권한 확인", "Permission Check", "운영체제가 이 앱에 카메라 권한이 있는지 확인합니다."],
                    ["장치 제어", "Device Control", "운영체제와 드라이버가 이미지 센서 하드웨어를 켜고 빛을 측정하게 합니다."],
                    ["데이터 전달", "Data Return", "센서 데이터가 RAM으로 들어오고 앱이 미리보기와 보정을 처리합니다."],
                    ["파일 저장", "File Save", "앱이 저장을 요청하면 운영체제가 파일 이름·위치·접근 권한을 관리해 저장 장치에 기록합니다."]
                ]
            },
            comparisons: {
                title: "같이 불려도 층은 다르다",
                english: "Name the Correct Layer",
                cards: [
                    ["iPad·Chromebook·PC", "Device", "CPU·메모리·화면이 들어 있는 실제 제품", "손에 들거나 책상에 놓을 수 있음"],
                    ["iPadOS·ChromeOS·Windows", "Operating System", "앱·파일·장치·권한을 관리", "기기를 켜면 기본 환경을 제공"],
                    ["Safari·Chrome·그림 앱", "Application", "사용자가 고른 특정 작업을 수행", "웹 보기·그리기·촬영 같은 목적"],
                    ["Google 검색·학교 홈페이지", "Service / Website", "앱을 통해 접속하는 인터넷상의 대상", "브라우저 자체와 웹사이트는 서로 다름"]
                ]
            },
            analogy: {
                title: "비유: 학교 건물·운영 규칙·동아리",
                english: "School Analogy",
                text: "학교 건물과 교실은 기기, 교실 배정과 출입을 관리하는 운영 규칙은 운영체제, 미술부·방송부처럼 특정 활동을 하는 모임은 앱에 비유할 수 있습니다.",
                limit: "운영체제는 교장 선생님처럼 생각하는 사람이 아닙니다. 미리 작성된 규칙과 프로그램으로 메모리·파일·장치 사용을 배분합니다.",
                teachback: "‘Chromebook에서 Chrome으로 웹사이트를 연다’는 문장에서 기기·운영체제·앱·웹사이트를 나누어 말해 보세요."
            },
            activity: {
                type: "sort",
                title: "세 층에 알맞게 놓기",
                instruction: "이름이 가리키는 대상이 물리적인 제품인지, 기본 소프트웨어인지, 특정 작업용 앱인지 구별해 끌어다 놓으세요.",
                categories: [
                    { id: "device", label: "기기", english: "Device" },
                    { id: "os", label: "운영체제", english: "Operating System" },
                    { id: "app", label: "앱", english: "Application" }
                ],
                items: [
                    { id: "ipad", label: "iPad", english: "Tablet Device", category: "device" },
                    { id: "chromebook", label: "Chromebook", english: "Laptop Device", category: "device" },
                    { id: "android", label: "Android", english: "Operating System", category: "os" },
                    { id: "ios", label: "iOS", english: "Operating System", category: "os" },
                    { id: "chromeos", label: "ChromeOS", english: "Operating System", category: "os" },
                    { id: "safari", label: "Safari", english: "Web Browser App", category: "app" },
                    { id: "youtube", label: "YouTube 앱", english: "Video App", category: "app" },
                    { id: "camera", label: "카메라 앱", english: "Camera App", category: "app" }
                ],
                success: "기기·운영체제·앱의 세 층을 구별했습니다. 제품 이름과 운영체제 이름이 함께 불리더라도 역할은 다릅니다."
            },
            questions: [
                {
                    text: "Chromebook에서 Chrome을 열어 학교 사이트를 보았습니다. 기기–운영체제–앱 순서로 올바르게 배열한 것은 무엇입니까?",
                    options: ["Chrome–ChromeOS–Chromebook", "Chromebook–ChromeOS–Chrome", "ChromeOS–Chromebook–Chrome", "Chromebook–Chrome–ChromeOS"],
                    answer: 1,
                    concept: "세 층 · Three Layers",
                    explanation: "Chromebook은 기기, ChromeOS는 기기를 관리하는 운영체제, Chrome은 웹을 여는 앱입니다."
                },
                {
                    text: "iPad의 그림 앱이 사진 보관함을 열려고 하자 접근 허용 창이 나타났습니다. 이 허용을 관리하는 층은 무엇입니까?",
                    options: ["그림 앱이 자신의 접근 범위를 직접 결정한다", "iPadOS 운영체제가 앱별 접근 권한을 관리한다", "iPad 기기가 앱 종류가 달라도 이전에 정한 권한을 그대로 적용한다", "사진 보관함의 첫 번째 파일이 다른 앱의 권한을 정한다"],
                    answer: 1,
                    concept: "운영체제 · Operating System",
                    explanation: "앱의 사진·카메라·마이크 접근 권한은 운영체제가 관리합니다."
                },
                {
                    text: "Android 스마트폰에 설치하려던 앱이 현재 Android 버전을 지원하지 않습니다. 가장 직접적인 관계는 무엇입니까?",
                    options: ["앱과 운영체제의 호환성", "화면 크기와 배터리 색상", "파일 이름과 스피커 크기", "키보드와 카메라 렌즈"],
                    answer: 0,
                    concept: "호환성 · Compatibility",
                    explanation: "앱은 특정 운영체제가 제공하는 기능과 규칙에 맞게 만들어지므로 지원 버전이 맞아야 합니다."
                },
                {
                    text: "같은 웹 서비스를 Windows PC에서는 Edge로, iPad에서는 Safari로 열었습니다. 달라진 앱과 운영체제의 조합은 무엇입니까?",
                    options: ["Edge–Windows와 Safari–iPadOS", "Windows–Edge와 iPad–Safari", "PC–Windows와 iPad–iPadOS", "웹사이트–PC와 인터넷–iPad"],
                    answer: 0,
                    concept: "플랫폼 · Platform",
                    explanation: "Edge와 Safari는 앱이고, Windows와 iPadOS는 각각의 운영체제입니다."
                },
                {
                    text: "카메라 앱의 촬영 요청이 실제 카메라 부품까지 전달되는 순서로 알맞은 것은 무엇입니까?",
                    options: ["앱 → 운영체제 → 장치 드라이버 → 카메라 센서", "앱 → 카메라 센서 → 장치 드라이버 → 운영체제", "운영체제 → 앱 → 카메라 센서 → 장치 드라이버", "장치 드라이버 → 앱 → 운영체제 → 카메라 센서"],
                    answer: 0,
                    concept: "층 사이 요청 · Requests Between Layers",
                    explanation: "앱은 운영체제에 요청하고, 운영체제는 장치 드라이버를 거쳐 카메라 센서가 이해할 신호를 전달합니다."
                },
{
                    text: "iPhone에서 Safari로 학교 웹사이트를 열었습니다. 회사·기기·운영체제·앱을 순서대로 올바르게 연결한 것은 무엇입니까?",
                    options: ["Apple–iPhone–iOS–Safari", "iPhone–Apple–Safari–iOS", "Apple–iOS–iPhone–Safari", "Safari–iPhone–Apple–iOS"],
                    answer: 0,
                    concept: "회사·기기·운영체제·앱 · Company, Device, Operating System, and App",
                    explanation: "Apple은 회사, iPhone은 기기 제품 계열, iOS는 운영체제, Safari는 웹 브라우저 앱입니다."
                }
            ]
        },
        {
            id: "a04",
            number: 4,
            title: "아날로그와 디지털은 무엇이 다를까?",
            english: "Analog and Digital",
            conceptTitle: "현실의 값은 이어져 변하지만, 디지털 장치는 특정 순간의 값을 정해진 숫자 칸에 기록한다",
            visual: a04ConversionMarkup("concept"),
            details: [
                ["아날로그", "Analog", "값이 중간에서 끊기지 않고 이어집니다. 바늘의 위치, 홈에 새겨진 소리의 흔적처럼 물리량에 대응해 연속적으로 변할 수 있습니다."],
                ["디지털", "Digital", "정해진 단계의 값과 기호로 표현합니다. 숫자 화면이 없어도 디지털 카메라의 파일이나 컴퓨터 내부 데이터는 디지털입니다."],
                ["오래됨과 새로움의 구분이 아님", "Not Old versus New", "현대의 마이크 안에도 아날로그 전기 신호가 생기고, 최신 장비에도 아날로그 회로가 사용됩니다. 두 말은 표현 방식의 차이입니다."],
                ["변환", "Conversion", "센서가 현실의 변화를 측정하고 ADC가 숫자 데이터로 바꿉니다. 스피커는 디지털 데이터를 다시 전기 신호와 공기의 떨림으로 바꿉니다."],
                ["ADC", "Analog-to-Digital Converter", "센서가 만든 이어지는 전기 신호를 특정 순간에 측정하고, 가장 가까운 숫자 단계와 비트 데이터로 바꾸는 회로입니다."]
            ],
            workedExample: {
                title: "디지털 온도계가 숫자를 만드는 과정",
                english: "How a Digital Thermometer Records Temperature",
                intro: "표시창에 숫자가 나타나기 전에는 현실의 온도를 측정하고 정해진 기록 칸에 넣는 과정이 필요합니다.",
                steps: [
                    ["현실의 온도", "Real Temperature", "공기의 온도는 20.14°C에서 20.18°C처럼 중간값을 지나며 계속 변합니다."],
                    ["센서 반응", "Sensor Response", "온도 센서의 전기적 성질이 온도에 따라 연속적으로 달라집니다."],
                    ["측정 순간 선택", "Sampling", "장치가 일정한 시간마다 센서 신호를 읽습니다."],
                    ["기록 단계 선택", "Quantization", "읽은 값을 0.1°C 같은 정해진 간격의 가장 가까운 칸에 맞춥니다."],
                    ["숫자 부호화", "Encoding", "선택한 값을 컴퓨터가 저장·계산할 수 있는 비트의 조합으로 기록합니다."],
                    ["표시", "Display", "기록된 값을 사람이 읽을 수 있는 20.2°C 같은 문자와 숫자로 보여 줍니다."]
                ]
            },
            comparisons: {
                title: "아날로그와 디지털을 판단하는 근거",
                english: "What Actually Makes the Difference",
                cards: [
                    ["바늘식 온도계", "Analog Display", "바늘 위치가 눈금 사이에서도 이어져 변함", "오래되었기 때문이 아니라 표현 방식이 연속적이기 때문"],
                    ["디지털 녹음 파일", "Digital Data", "측정값을 정해진 숫자 단계와 순서로 기록", "화면에 숫자가 없어도 디지털"],
                    ["최신 마이크의 전기 신호", "Analog Signal", "마이크 내부에서 처음 생기는 신호는 연속적으로 변할 수 있음", "최신 제품 안에도 아날로그 단계가 존재"],
                    ["센서 기록값", "Digital Record", "측정 순간과 기록 단계가 정해짐", "실제 값과 기록값이 완전히 같다는 뜻은 아님"]
                ]
            },
            analogy: {
                title: "비유: 경사로와 계단",
                english: "Ramp and Stairs",
                text: "경사로에서는 어느 높이에도 설 수 있어 연속적인 아날로그 값과 비슷합니다. 계단에서는 정해진 단에 서므로 디지털 기록 단계와 비슷합니다.",
                limit: "디지털 계단의 단을 아주 촘촘하게 만들면 차이가 눈에 거의 보이지 않을 수 있습니다. 디지털이 거칠다거나 아날로그가 더 정확하다는 뜻은 아닙니다.",
                teachback: "20.14°C와 20.18°C가 모두 20.2°C로 표시될 수 있는 까닭을 ‘측정’과 ‘기록 단계’라는 말로 설명해 보세요."
            },
            activity: {
                type: "analog",
                title: "서로 다른 온도가 같은 숫자로 기록될까?",
                instruction: "실제 온도 슬라이더를 움직여 서로 다른 두 온도를 기록하세요. 0.5°C 단위 디지털 표시가 같은 두 값을 찾아야 합니다.",
                success: "실제 값은 달라도 측정·기록 단계가 0.5°C라면 같은 디지털 값으로 나타날 수 있음을 확인했습니다."
            },
            questions: [
                {
                    text: "실제 온도가 20.14°C와 20.18°C일 때 0.1°C 단위로 반올림하는 온도계는 두 값을 모두 20.2°C로 표시했습니다. 가장 정확한 설명은 무엇입니까?",
                    options: ["센서가 두 순간의 실제 온도를 같은 값으로 바꾸었다", "서로 다른 연속값이 같은 디지털 단계로 기록되었다", "표시된 20.2°C가 교실의 실제 온도를 20.2°C로 맞추었다", "0.1°C 단위 기록에서 20.14와 20.18은 서로 다른 단계에 놓인다"],
                    answer: 1,
                    concept: "단계 기록 · Discrete-Step Recording",
                    explanation: "실제 값은 달랐지만 0.1°C 단위로 반올림하는 과정에서 같은 표시값이 되었습니다."
                },
                {
                    text: "마이크 진동판이 공기 떨림에 따라 움직이고, 장치가 그 전기 신호를 일정한 간격으로 숫자로 기록했습니다. 앞과 뒤를 올바르게 구분한 것은 무엇입니까?",
                    options: ["진동판의 연속 움직임은 아날로그, 숫자 기록은 디지털", "진동판은 디지털, 숫자 기록은 아날로그", "진동판과 숫자 기록이 모두 매끄럽게 이어지므로 둘 다 아날로그", "진동판의 움직임도 장치 안에 들어오면 측정 전부터 디지털"],
                    answer: 0,
                    concept: "변환 · Analog-to-Digital Conversion",
                    explanation: "연속적으로 변하는 물리적 움직임과 전기 신호를 측정해 숫자 단계로 기록하는 과정입니다."
                },
                {
                    text: "바늘식 전압계의 바늘이 2.0V와 2.1V 사이 중간 위치를 가리킵니다. 이 표시가 보여 주는 특징은 무엇입니까?",
                    options: ["측정 순간마다 두 숫자 중 하나를 골라 기록한다", "중간 위치를 이용해 이어지는 값을 나타낼 수 있다", "측정값을 파일 확장자로 저장한다", "전압 변화 전체를 0과 1 두 단계로 압축해 표시한다"],
                    answer: 1,
                    concept: "연속값 · Continuous Values",
                    explanation: "바늘 위치는 눈금 사이에서도 연속적으로 달라질 수 있어 중간값을 나타냅니다."
                },
                {
                    text: "숫자가 적힌 화면이 없는 디지털 카메라가 사진을 메모리 카드의 파일로 저장합니다. 디지털이라고 판단할 근거는 무엇입니까?",
                    options: ["전자 센서가 들어 있으므로 빛을 숫자로 측정하기 전부터 사진이 디지털이다", "사진을 정해진 숫자 데이터와 파일 형식으로 기록한다", "렌즈가 들어온 빛을 JPG 파일로 직접 바꾸므로 별도의 측정 과정이 없다", "파일 이름 끝에 JPG를 붙이는 순간 사진 내용도 디지털 데이터가 된다"],
                    answer: 1,
                    concept: "디지털 데이터 · Digital Data",
                    explanation: "디지털 여부는 숫자 화면의 유무가 아니라 정보를 정해진 기호와 숫자 데이터로 표현하는 방식에 달려 있습니다."
                },
                {
                    text: "측정 범위가 같은 두 디지털 센서 중 A는 1°C 단위, B는 0.1°C 단위로 기록합니다. 20.3°C와 20.6°C의 차이를 기록하기에 더 알맞은 센서는 무엇입니까?",
                    options: ["A, 기록 단계가 더 크기 때문이다", "B, 더 작은 단계로 값을 구별할 수 있기 때문이다", "A, 표시 자릿수가 적을수록 작은 차이를 더 세밀하게 구별하기 때문이다", "두 센서는 기록 단계가 달라도 20.3°C와 20.6°C를 같은 값으로 묶기 때문이다"],
                    answer: 1,
                    concept: "분해능 · Resolution",
                    explanation: "0.1°C 단위 센서는 1°C 단위 센서보다 작은 온도 차이를 서로 다른 값으로 기록할 수 있습니다."
                },
                {
                    text: "같은 곡을 LP 음반과 MP3 파일로 보관했습니다. 두 기록 방식의 차이를 가장 정확히 설명한 것은 무엇입니까?",
                    options: ["LP와 MP3는 재생 결과가 소리이므로 둘 다 연속 홈으로 기록한다", "LP의 홈은 연속적인 물리 변화를 담고 MP3는 측정·부호화된 숫자 데이터를 담는다", "LP의 홈도 일정 간격의 숫자 표본이고 MP3도 같은 홈 모양을 파일로 복사한다", "LP는 연속 변화를 담고 MP3는 각 순간의 소리 크기 하나만 반복해 저장한다"],
                    answer: 1,
                    concept: "기록 방식 비교 · Comparing Recording Methods",
                    explanation: "재생 결과는 모두 소리지만 LP의 홈은 연속적인 물리 모양으로, MP3는 표본화·부호화된 디지털 데이터로 정보를 기록합니다."
                }
            ]
        },
        {
            id: "a05",
            number: 5,
            title: "현실의 소리는 어떻게 숫자 데이터가 될까?",
            english: "From Sound to Digital Data",
            conceptTitle: "마이크 신호를 일정한 시간 간격으로 재고, 각 값을 정해진 높이 단계와 비트로 기록한다",
            visual: a05DigitizerMarkup("concept"),
            details: [
                ["샘플링", "Sampling", "이어지는 신호의 값을 일정한 시간 간격으로 측정합니다. 한 번 측정해 얻은 값 하나를 샘플이라고 합니다."],
                ["샘플링 레이트", "Sampling Rate", "1초 동안 몇 번 측정하는지를 나타냅니다. 같은 시간에 더 자주 측정하면 빠른 변화도 더 자세히 기록할 수 있지만 데이터도 많아집니다."],
                ["양자화", "Quantization", "측정한 높이를 컴퓨터가 기록할 수 있는 정해진 숫자 단계에 맞춥니다. 실제 값과 기록값 사이에 작은 차이가 생길 수 있습니다."],
                ["비트 깊이", "Bit Depth", "한 샘플을 몇 비트로 기록하는지 나타냅니다. n비트는 2의 n제곱 개 숫자 단계를 구별할 수 있습니다."],
                ["부호화", "Encoding", "양자화한 단계 번호를 0과 1의 비트 조합으로 적습니다. 이 숫자들이 시간 순서대로 모여 소리 데이터가 됩니다."],
                ["재생", "Playback", "저장된 숫자를 시간 순서대로 읽고 전기 신호로 바꿔 스피커를 움직이면 다시 공기의 떨림인 소리로 들립니다."]
            ],
            workedExample: {
                title: "한 음을 녹음하고 다시 듣기까지",
                english: "Record and Play Back One Note",
                intro: "소리는 파일 속에 공기 떨림 그대로 들어가는 것이 아니라, 시간 순서가 있는 숫자 목록으로 기록됩니다.",
                steps: [
                    ["공기의 떨림", "Air Vibration", "기타 줄이 주변 공기를 밀고 당겨 압력 변화를 만듭니다."],
                    ["마이크 신호", "Microphone Signal", "마이크 진동판이 움직이며 공기 떨림에 대응하는 연속 전기 신호를 만듭니다."],
                    ["샘플링", "Sampling", "장치가 같은 시간 간격으로 전기 신호의 높이를 여러 번 측정합니다."],
                    ["양자화", "Quantization", "각 측정 높이를 컴퓨터가 기록할 수 있는 가까운 숫자 단계에 맞춥니다."],
                    ["파일 만들기", "Audio File", "측정값의 순서와 재생 속도 같은 정보를 WAV·AAC 등의 파일 형식으로 묶습니다."],
                    ["재생", "Playback", "숫자를 시간 순서대로 전기 신호로 바꾸고 스피커가 공기를 떨게 합니다."]
                ]
            },
            comparisons: {
                title: "서로 다른 네 가지 설정",
                english: "Do Not Mix These Up",
                cards: [
                    ["샘플링 레이트", "Sampling Rate", "1초에 몇 번 측정하는가", "시간 방향의 촘촘함"],
                    ["비트 깊이", "Bit Depth", "한 측정값을 몇 단계로 나누어 기록하는가", "높이 방향의 촘촘함"],
                    ["파일 형식", "File Format", "측정값과 부가 정보를 어떤 규칙으로 묶는가", "WAV·AAC·MP3 등의 저장 규칙"],
                    ["파일 크기", "File Size", "측정 횟수·단계·길이·압축 방식의 영향을 받음", "더 자세한 기록은 보통 더 많은 데이터가 필요"]
                ]
            },
            analogy: {
                title: "비유: 움직임을 여러 장의 사진으로 기록하기",
                english: "Snapshot Analogy",
                text: "점프 동작을 일정한 간격으로 여러 장 찍으면 사진 수가 많을수록 움직임 변화를 더 자세히 짐작할 수 있습니다. 소리 샘플링도 시간마다 신호 높이를 측정한다는 점이 비슷합니다.",
                limit: "샘플 하나는 짧은 소리 조각이 아니라 한 순간의 신호 높이 값입니다. 여러 값의 순서가 모여 파형을 나타냅니다.",
                teachback: "샘플링 레이트를 높이면 무엇이 더 촘촘해지고, 왜 데이터 양이 늘어나는지 설명해 보세요."
            },
            activity: {
                type: "sampling",
                title: "시간 간격과 높이 단계를 따로 비교하기",
                instruction: "A와 B에 기록을 저장하세요. 먼저 비트 깊이를 같게 두고 샘플링 레이트만 비교한 뒤, 샘플링 레이트를 같게 두고 비트 깊이만 비교합니다.",
                success: "샘플링 레이트는 시간 방향의 측정 횟수, 비트 깊이는 높이 방향의 숫자 단계 수를 바꾸며 둘 다 기록할 데이터 양에 영향을 줌을 확인했습니다."
            },
            questions: [
                {
                    text: "같은 1초의 소리를 A는 8번, B는 32번 같은 간격으로 측정했습니다. 빠르게 변하는 구간의 모양을 더 자세히 기록할 가능성이 큰 것은 무엇입니까?",
                    options: ["A, 측정 사이 간격이 더 넓기 때문이다", "B, 같은 시간에 더 많은 지점을 측정했기 때문이다", "A, 만들어지는 숫자가 더 적기 때문이다", "B, 측정 횟수가 늘어나면 측정점 사이의 시간 간격도 더 넓어지기 때문이다"],
                    answer: 1,
                    concept: "샘플링 레이트 · Sampling Rate",
                    explanation: "같은 시간에 더 자주 측정하면 측정점 사이에서 놓치는 빠른 변화가 줄어듭니다."
                },
                {
                    text: "파형 높이 0.63을 0.1 단위로만 기록하는 장치가 0.6으로 저장했습니다. 이때 일어난 일은 무엇입니까?",
                    options: ["1초 동안 측정하는 횟수를 늘려 샘플링 레이트를 바꾸었다", "측정값을 가까운 숫자 단계에 맞춰 양자화했다", "연속 신호의 크기를 키워 원래 값 자체를 0.6으로 바꾸었다", "저장된 숫자를 전기 신호로 되돌리는 재생 변환을 했다"],
                    answer: 1,
                    concept: "양자화 · Quantization",
                    explanation: "측정값을 정해진 숫자 단계에 맞추는 과정을 양자화라고 합니다."
                },
                {
                    text: "마이크가 만든 전기 신호가 아직 시간에 따라 매끄럽게 변하고 있습니다. 숫자 배열로 저장하기 전에 필요한 과정은 무엇입니까?",
                    options: ["신호를 일정한 간격으로 측정하고 숫자 단계로 기록한다", "신호를 일정한 간격으로 측정하되 각 측정 높이는 연속값 그대로 파일에 넣는다", "신호 높이를 한 번 측정한 뒤 그 숫자 하나를 전체 재생 시간에 반복한다", "측정 간격은 정하지 않고 가장 높은 값과 가장 낮은 값 두 개만 기록한다"],
                    answer: 0,
                    concept: "아날로그-디지털 변환 · Analog-to-Digital Conversion",
                    explanation: "연속 신호를 샘플링하고 양자화해야 컴퓨터가 저장하고 처리할 숫자 데이터가 됩니다."
                },
                {
                    text: "측정 횟수를 네 배로 늘리고 각 측정값의 기록 단계도 더 촘촘하게 했습니다. 일반적으로 예상되는 변화는 무엇입니까?",
                    options: ["기록할 숫자는 줄고 변화는 덜 자세해진다", "기록할 숫자와 정밀도가 늘어 데이터 양도 커질 수 있다", "측정 횟수만 늘고 값의 단계는 그대로이므로 데이터 양은 같아진다", "기록 단계가 촘촘해지면 숫자를 더 짧게 적을 수 있어 데이터 양이 줄어든다"],
                    answer: 1,
                    concept: "정밀도와 데이터 양 · Precision and Data Size",
                    explanation: "더 자주, 더 세밀한 단계로 기록하면 정보량과 필요한 저장 공간이 함께 늘어날 수 있습니다."
                },
                {
                    text: "저장된 소리 숫자 데이터를 스피커로 들려줄 때의 흐름으로 알맞은 것은 무엇입니까?",
                    options: ["숫자 데이터→전기 신호→스피커 진동→공기 떨림", "숫자 데이터→화면 픽셀→빛→마이크의 전기 신호", "숫자 데이터→전기 신호→마이크 진동판→공기 떨림", "공기 떨림→마이크 전기 신호→측정→숫자 데이터"],
                    answer: 0,
                    concept: "재생 · Playback",
                    explanation: "재생할 때는 숫자 데이터를 시간 순서대로 전기 신호로 바꾸고, 스피커가 공기를 떨게 해 소리를 만듭니다."
                },
                {
                    text: "두 녹음 설정의 샘플링 레이트는 같고, A는 8비트·B는 16비트로 한 측정값을 기록합니다. 가장 타당한 비교는 무엇입니까?",
                    options: ["A는 B보다 한 측정값을 더 촘촘한 크기 단계로 나눈다", "B는 같은 비트 깊이로 1초에 측정하는 횟수만 두 배로 늘린다", "B가 한 측정값의 크기를 더 촘촘한 단계로 기록할 수 있다", "A와 B의 크기 단계 수는 같고 B가 녹음 가능한 시간만 늘어난다"],
                    answer: 2,
                    concept: "비트 깊이 · Bit Depth",
                    explanation: "샘플링 레이트가 시간 방향의 측정 횟수라면 비트 깊이는 한 측정값을 나눌 수 있는 크기 단계의 수와 관련됩니다."
                }
            ]
        },
        {
            id: "b01",
            code: "B01",
            number: 6,
            domain: "컴퓨터 안의 하드웨어",
            title: "본체 안에는 어떤 부품이 있을까?",
            english: "Inside a Desktop Computer",
            conceptTitle: "부품은 맡은 일이 다르고, 메인보드에 연결되어 한 컴퓨터로 움직인다",
            visual: `
                <div class="system-visual hardware-cutaway-grid">
                    <figure class="hardware-photo">
                        <div class="hardware-photo-map">
                            <picture>
                                <source srcset="${asset("desktop-hardware-cutaway-768.webp")} 768w, ${asset("desktop-hardware-cutaway-1448.webp")} 1448w" sizes="(max-width: 900px) calc(100vw - 60px), 65vw" type="image/webp">
                                <img src="${asset("desktop-hardware-cutaway-768.webp")}" width="768" height="576" alt="열린 데스크톱 본체 안의 CPU, RAM, GPU, SSD, 하드 디스크, 메인보드, 전원 공급 장치와 냉각 팬">
                            </picture>
                            <button type="button" class="part-marker marker-cpu" data-cutaway-part-index="0" aria-label="1번 CPU 확대"><b>1</b></button>
                            <button type="button" class="part-marker marker-ram" data-cutaway-part-index="1" aria-label="2번 RAM 확대"><b>2</b></button>
                            <button type="button" class="part-marker marker-gpu" data-cutaway-part-index="2" aria-label="3번 GPU 확대"><b>3</b></button>
                            <button type="button" class="part-marker marker-ssd" data-cutaway-part-index="3" aria-label="4번 SSD 확대"><b>4</b></button>
                            <button type="button" class="part-marker marker-hdd" data-cutaway-part-index="4" aria-label="5번 HDD 확대"><b>5</b></button>
                            <button type="button" class="part-marker marker-psu" data-cutaway-part-index="6" aria-label="6번 전원 공급 장치 확대"><b>6</b></button>
                            <button type="button" class="part-marker marker-board" data-cutaway-part-index="5" aria-label="7번 메인보드 확대"><b>7</b></button>
                            <button type="button" class="part-marker marker-cooling" data-cutaway-part-index="7" aria-label="8번 냉각 장치 확대"><b>8</b></button>
                        </div>
                        <figcaption>번호를 누르면 그 자리에 있는 부품의 확대 사진과 이름의 뜻, 역할, 연결 방식을 함께 볼 수 있습니다.</figcaption>
                    </figure>
                    <div class="component-legend" aria-label="그림 속 부품 번호와 역할">
                        <span class="cpu"><b>1</b> CPU<small>Central Processing Unit<br>명령 해석·계산·작업 순서 제어</small></span>
                        <span class="ram"><b>2</b> RAM<small>Random Access Memory<br>실행 중인 명령과 데이터의 작업 공간</small></span>
                        <span class="gpu"><b>3</b> GPU<small>Graphics Processing Unit<br>비슷한 계산을 여러 개 병렬 처리</small></span>
                        <span class="ssd"><b>4</b> SSD<small>Solid-State Drive<br>반도체에 앱과 파일을 보관</small></span>
                        <span class="hdd"><b>5</b> HDD<small>Hard Disk Drive<br>자기 원판에 앱과 파일을 보관</small></span>
                        <span class="power"><b>6</b> PSU<small>Power Supply Unit<br>전기를 변환해 각 부품에 공급</small></span>
                        <span class="board"><b>7</b> 메인보드<small>Motherboard / Mainboard<br>부품을 연결하는 중심 기판</small></span>
                        <span class="cooling"><b>8</b> 냉각 장치<small>Heat Sink and Cooling Fan<br>부품의 열을 공기 쪽으로 이동</small></span>
                    </div>
                </div>`,
            details: [
                ["CPU", "Central Processing Unit", "프로그램 명령을 해석하고 계산을 수행합니다. 학교 비유에서는 여러 종류의 지시를 판단하는 선생님과 비슷하지만, CPU가 뜻을 스스로 정하는 것은 아닙니다."],
                ["GPU", "Graphics Processing Unit", "그림의 많은 픽셀처럼 비슷한 계산을 동시에 나누어 처리하는 데 강합니다. 미술부원 여러 명이 많은 그림 조각을 함께 계산하는 모습에 비유할 수 있습니다."],
                ["RAM과 저장 장치", "Memory and Storage", "RAM은 지금 펼쳐 둔 자료를 빠르게 쓰는 책상이고 전원이 꺼지면 내용이 사라집니다. SSD·HDD는 파일을 오래 보관하는 사물함에 가깝습니다."],
                ["메인보드·전원·냉각", "Motherboard, Power, and Cooling", "메인보드는 부품이 꽂히고 데이터를 주고받는 길을 제공합니다. 전원 공급 장치는 필요한 전력을 나누고, 팬과 방열판은 생긴 열을 밖으로 보냅니다."]
            ],
            deviceComparison: {
                title: "같은 역할, 다른 모양과 연결 방식",
                english: "Same Roles, Different Packaging",
                intro: "데스크톱은 부품이 크게 나뉘고 모바일 기기는 칩과 기판에 촘촘히 결합됩니다. 사진은 특정 제품의 수리도가 아닌 대표적인 구조입니다.",
                cards: [
                    { title: "데스크톱 PC", english: "Separate Modules", image: asset("desktop-hardware-cutaway-768.webp"), alt: "교체 가능한 부품이 나뉘어 연결된 데스크톱 내부", relation: "CPU 소켓 · RAM 슬롯 · 그래픽 카드 · SSD/HDD · PSU", note: "부품이 따로 보이고 교체 가능한 경우가 많습니다." },
                    { title: "Chromebook", english: "Compact Laptop", image: asset("chromebook-internals-exploded-768.webp"), alt: "메인 기판, 배터리, 스피커와 화면이 분리된 Chromebook 내부", relation: "프로세서/SoC · RAM · 플래시 저장 · 배터리 · Wi-Fi", note: "얇은 본체에 맞춰 RAM과 저장 장치가 기판에 붙는 제품이 많습니다." },
                    { title: "태블릿", english: "Tablet", image: asset("tablet-internals-exploded-768.webp"), alt: "큰 배터리와 좁은 로직 보드가 들어 있는 태블릿 내부", relation: "SoC · RAM · 플래시 저장 · 큰 배터리 · 터치 디스플레이", note: "화면과 배터리가 내부 공간의 대부분을 차지하고 주요 칩은 한쪽 기판에 모입니다." },
                    { title: "스마트폰", english: "Smartphone", image: asset("smartphone-internals-exploded-768.webp"), alt: "작은 로직 보드와 배터리, 카메라가 층별로 배치된 스마트폰 내부", relation: "SoC · RAM · 플래시 저장 · PMIC · 모뎀 · 안테나", note: "SoC에는 CPU와 GPU 같은 기능이 통합되고 통신 부품이 함께 필요합니다." }
                ]
            },
            parts: [
                {
                    key: "cpu",
                    short: "CPU",
                    full: "Central Processing Unit",
                    korean: "중앙 처리 장치",
                    image: asset("component-cpu-768.webp"),
                    alt: "금속 덮개가 있는 데스크톱 CPU의 윗면과 접점이 배열된 아랫면 확대 사진",
                    origin: "Central은 컴퓨터의 여러 작업을 중심에서 맡는다는 뜻, Processing은 명령과 데이터를 처리한다는 뜻, Unit은 하나의 기능 장치를 뜻합니다.",
                    look: "손바닥보다 작은 네모난 부품입니다. 윗면의 금속 덮개는 내부 칩의 열을 방열판으로 전달하고, 아랫면의 접점은 메인보드와 전기 신호를 주고받습니다.",
                    job: "프로그램의 기계 명령을 가져오고 해석한 뒤 계산·비교·이동 명령을 실행합니다. 입력 처리, 파일 열기, 앱의 진행 순서처럼 종류가 다른 작업을 빠르게 바꿔 가며 처리합니다.",
                    connection: "메인보드의 CPU 소켓에 장착되고 RAM에서 명령과 데이터를 읽습니다. 필요한 화면 계산은 GPU에 요청하고 결과를 다시 받습니다.",
                    misconception: "CPU가 사람의 뇌처럼 뜻을 이해하거나 스스로 목표를 정하는 것은 아닙니다. 작성된 명령과 현재 데이터에 따라 회로가 동작합니다."
                },
                {
                    key: "ram",
                    short: "RAM",
                    full: "Random Access Memory",
                    korean: "주기억장치(작업 메모리)",
                    image: asset("component-ram-768.webp"),
                    alt: "검은 메모리 칩과 금색 접점, 끼우는 홈이 보이는 데스크톱 RAM 모듈 확대 사진",
                    origin: "Random Access는 ‘무작위로 고른다’는 뜻이 아니라, 앞에서부터 찾지 않고 필요한 주소로 바로 접근할 수 있다는 뜻입니다. Memory는 실행 중 정보를 잠시 기억하는 장치라는 뜻입니다.",
                    look: "길고 좁은 회로 기판 위에 여러 메모리 칩이 붙어 있습니다. 아래쪽 금색 접점과 홈의 위치를 RAM 슬롯에 맞추어 꽂습니다.",
                    job: "현재 실행 중인 운영체제·앱의 명령과 작업 중인 데이터를 CPU가 빠르게 꺼내 쓰도록 펼쳐 둡니다. 용량이 넉넉하면 여러 앱과 큰 자료를 동시에 다루기 쉽습니다.",
                    connection: "메인보드의 DIMM 슬롯에 꽂히며 CPU의 메모리 제어 장치와 매우 빠르게 데이터를 주고받습니다.",
                    misconception: "RAM 용량은 SSD 저장 용량과 다릅니다. 일반적인 RAM은 전원이 끊기면 내용이 사라지므로 완성 파일을 오래 보관하는 창고가 아닙니다."
                },
                {
                    key: "gpu",
                    short: "GPU",
                    full: "Graphics Processing Unit",
                    korean: "그래픽 처리 장치",
                    image: asset("component-gpu-768.webp"),
                    alt: "냉각 팬, 회로 기판, 금속 브래킷과 금색 연결부가 보이는 데스크톱 그래픽 카드 확대 사진",
                    origin: "Graphics는 화면의 그림과 영상을 뜻하고 Processing Unit은 계산을 맡는 장치라는 뜻입니다. 처음에는 그래픽 계산이 중심이어서 이런 이름이 붙었습니다.",
                    look: "그래픽 처리 칩이 있는 회로 기판에 큰 방열판과 팬이 붙습니다. 화면 단자와 메인보드에 꽂는 PCI Express 접점이 보입니다.",
                    job: "픽셀·도형처럼 비슷한 계산을 아주 많이 동시에 처리합니다. 2D·3D 화면, 영상, 일부 과학·인공지능 계산에도 사용됩니다.",
                    connection: "그래픽 카드는 메인보드의 PCI Express 슬롯과 전원 케이블에 연결됩니다. CPU가 작업을 보내면 GPU가 계산하고 화면용 결과를 돌려줍니다.",
                    misconception: "GPU가 CPU보다 모든 계산에서 빠른 것은 아닙니다. 순서와 조건이 복잡한 일반 작업은 CPU가, 같은 계산을 많이 반복하는 작업은 GPU가 유리한 경우가 많습니다."
                },
                {
                    key: "ssd",
                    short: "SSD",
                    full: "Solid-State Drive",
                    korean: "반도체 저장 장치",
                    image: asset("component-ssd-768.webp"),
                    alt: "겉 케이스와 내부 플래시 메모리 칩, 제어 칩, 연결 단자가 보이는 SSD 확대 사진",
                    origin: "Solid-State는 움직이는 기계 부품 대신 반도체 회로로 동작한다는 전자공학 표현입니다. 단단한 상태라는 일상적 뜻만 가리키지 않습니다. Drive는 저장 장치를 부르던 이름이 이어진 것입니다.",
                    look: "2.5인치 SSD는 납작한 케이스 안에 NAND 플래시 메모리 칩과 제어 칩이 들어 있습니다. M.2 SSD는 막대 모양의 작은 회로 기판 형태도 있습니다.",
                    job: "운영체제·앱·사진·문서 파일을 전원이 꺼져도 보관합니다. 움직이는 헤드가 없어 HDD보다 빠르고 충격에 강한 경우가 많습니다.",
                    connection: "SATA 케이블로 메인보드에 연결하거나 M.2 슬롯에 직접 꽂습니다. 파일을 실행할 때 SSD의 데이터가 RAM으로 읽혀 올라갑니다.",
                    misconception: "SSD 용량이 크다고 실행 중 작업 공간인 RAM도 커지는 것은 아닙니다. 저장 장치와 작업 메모리는 역할과 속도가 다릅니다."
                },
                {
                    key: "hdd",
                    short: "HDD",
                    full: "Hard Disk Drive",
                    korean: "하드 디스크 드라이브",
                    image: asset("component-hdd-768.webp"),
                    alt: "덮개가 열린 하드 디스크 안의 원형 자기 디스크와 회전축, 읽기 쓰기 헤드 확대 사진",
                    origin: "Hard Disk의 Hard는 휘어지는 플로피 디스크와 달리 단단한 원판을 쓴다는 뜻입니다. Disk는 원형 기록판, Drive는 원판을 돌리고 읽고 쓰는 장치를 뜻합니다.",
                    look: "금속 케이스 안에 반짝이는 자기 원판, 원판을 돌리는 모터, 표면 가까이 움직이는 읽기·쓰기 헤드가 있습니다.",
                    job: "자기 원판 표면에 데이터를 기록해 오래 보관합니다. 같은 가격에서 큰 용량을 제공하기 쉬워 대용량 자료 보관에 사용됩니다.",
                    connection: "SATA 데이터 케이블로 메인보드와, 전원 케이블로 전원 공급 장치와 연결됩니다.",
                    misconception: "헤드가 원판을 정상적으로 긁으며 읽는 것이 아닙니다. 매우 가까이 떠서 자기 상태를 읽으며, 강한 충격은 기계 부품을 손상시킬 수 있습니다."
                },
                {
                    key: "motherboard",
                    short: "메인보드",
                    full: "Motherboard / Mainboard",
                    korean: "주기판",
                    image: asset("component-motherboard-768.webp"),
                    alt: "CPU 소켓, RAM 슬롯, PCI Express 슬롯과 여러 연결 단자가 보이는 메인보드 전체 확대 사진",
                    origin: "여러 부품과 작은 확장 보드가 연결되는 중심 기판이라 Motherboard 또는 Mainboard라고 부릅니다. 다른 부품의 어머니라는 생물학적 뜻은 아닙니다.",
                    look: "넓은 회로 기판 위에 CPU 소켓, RAM 슬롯, 그래픽 카드 슬롯, 저장 장치 단자와 전원 단자가 구역별로 배치됩니다.",
                    job: "부품을 고정하고 전기 신호·데이터·일부 전력을 주고받는 통로를 제공합니다. 칩셋과 펌웨어가 시작 과정과 장치 연결을 돕습니다.",
                    connection: "CPU·RAM·GPU·저장 장치·전원·팬과 직접 또는 케이블로 연결되는 컴퓨터의 중심 기판입니다.",
                    misconception: "메인보드가 모든 계산을 대신하는 것은 아닙니다. 계산과 저장은 연결된 전용 부품이 맡고, 메인보드는 이들이 통신할 기반을 제공합니다."
                },
                {
                    key: "psu",
                    short: "PSU",
                    full: "Power Supply Unit",
                    korean: "전원 공급 장치",
                    image: asset("component-psu-768.webp"),
                    alt: "금속 상자, 냉각 팬, 전원 스위치와 여러 출력 케이블이 보이는 데스크톱 전원 공급 장치 확대 사진",
                    origin: "Power는 전력, Supply는 필요한 곳에 공급한다는 뜻, Unit은 하나의 기능 장치를 뜻합니다. 줄여서 PSU라고 합니다.",
                    look: "통풍구와 팬이 있는 금속 상자에서 메인보드·CPU·GPU·저장 장치용 케이블이 여러 갈래로 나옵니다.",
                    job: "콘센트의 교류 전기를 컴퓨터 부품이 사용할 수 있는 여러 직류 전압으로 바꾸고 안정적으로 나누어 공급합니다.",
                    connection: "메인보드의 큰 전원 단자, CPU 보조 전원, 그래픽 카드, SSD·HDD 등에 각기 맞는 케이블을 연결합니다.",
                    misconception: "PSU는 배터리가 아닙니다. 전기를 오래 저장하기보다 들어온 전기를 부품에 알맞게 변환·공급합니다."
                },
                {
                    key: "cooling",
                    short: "냉각 장치",
                    full: "Heat Sink and Cooling Fan",
                    korean: "방열판과 냉각 팬",
                    image: asset("component-cooling-768.webp"),
                    alt: "금속 방열핀, 구리 히트파이프, 냉각 팬과 CPU에 닿는 바닥면이 보이는 CPU 냉각 장치 확대 사진",
                    origin: "Heat Sink는 열이 흘러 들어가 퍼지는 곳이라는 뜻으로 방열판을 가리킵니다. Cooling Fan은 공기를 움직여 열을 밖으로 보내는 팬입니다.",
                    look: "CPU에 닿는 금속 바닥, 열을 옮기는 구리 히트파이프, 넓은 금속 핀, 공기를 통과시키는 팬으로 이루어집니다.",
                    job: "CPU·GPU에서 생긴 열을 넓은 금속 표면으로 퍼뜨리고, 팬의 공기로 케이스 밖으로 이동시킵니다.",
                    connection: "방열판은 CPU나 GPU 표면에 밀착되고 팬 케이블은 메인보드에 연결되어 온도에 따라 속도를 조절합니다.",
                    misconception: "팬이 차가움을 만들어 내는 것은 아닙니다. 부품에서 생긴 열을 주변 공기와 케이스 밖으로 더 빠르게 옮깁니다."
                }
            ],
            workedExample: {
                title: "그림 앱과 사진 파일을 여는 1초",
                english: "What the Parts Do Together",
                intro: "한 부품이 혼자 앱을 여는 것이 아닙니다. 저장·작업 공간·계산·표시·전력·냉각이 이어집니다.",
                steps: [
                    ["SSD에서 읽기", "Load from Storage", "전원이 꺼져도 보관되던 그림 앱의 명령과 사진 파일을 읽습니다."],
                    ["RAM에 펼치기", "Place in RAM", "곧 사용할 명령과 사진 데이터를 빠르게 꺼내 쓸 수 있도록 RAM에 올립니다."],
                    ["CPU가 진행", "CPU Coordinates", "CPU가 앱 명령을 읽고 파일 해석·입력 처리·작업 순서를 진행합니다."],
                    ["GPU가 화면 계산", "GPU Draws", "GPU가 사진과 앱 창의 많은 픽셀 값을 동시에 계산해 화면용 이미지를 만듭니다."],
                    ["디스플레이에 출력", "Display Output", "계산된 픽셀 데이터가 화면으로 전달되어 빛과 색으로 보입니다."],
                    ["전원과 냉각", "Power & Cooling", "전원 공급 장치가 각 부품에 전력을 보내고 방열판과 팬이 생긴 열을 밖으로 옮깁니다."]
                ]
            },
            comparisons: {
                title: "CPU·GPU·RAM·저장 장치 비교",
                english: "Four Parts, Four Roles",
                cards: [
                    ["CPU", "General Processor", "서로 다른 명령을 순서와 조건에 따라 처리", "앱 실행, 입력 판단, 파일 처리"],
                    ["GPU", "Parallel Processor", "비슷한 계산을 아주 많이 동시에 처리", "픽셀·영상·3D·일부 인공지능 계산"],
                    ["RAM", "Working Memory", "지금 실행 중인 명령과 데이터를 빠르게 펼쳐 둠", "전원이 꺼지면 내용이 유지되지 않음"],
                    ["SSD·HDD", "Storage", "앱과 파일을 오래 보관", "전원이 꺼져도 기록이 남음"]
                ]
            },
            analogy: {
                title: "비유: 작업실",
                english: "Workshop Analogy",
                text: "CPU는 작업 순서를 진행하는 작업자, GPU는 같은 종류의 조각을 동시에 만드는 많은 작업대, RAM은 지금 재료를 펼친 큰 책상, SSD는 재료와 완성품을 보관하는 창고에 비유할 수 있습니다. 메인보드는 이들을 잇는 길, 전원과 냉각은 작업실의 전기와 환기입니다.",
                limit: "CPU가 항상 혼자 지휘하고 GPU가 그림만 처리하는 것은 아닙니다. 실제 프로그램은 작업의 종류에 따라 CPU와 GPU에 일을 나누며, 두 부품 모두 전자 회로로 명령과 데이터를 처리합니다.",
                teachback: "저장 공간이 256GB로 같아도 RAM 4GB와 16GB의 사용감이 달라질 수 있는 이유를 ‘창고’와 ‘책상’ 비유로 설명해 보세요."
            },
            activity: {
                type: "sort",
                title: "부품의 실제 역할로 분류하기",
                instruction: "부품 이름보다 실제로 맡은 일을 근거로 카드를 끌어다 놓으세요. 하나의 컴퓨터 안에서도 처리·작업 공간·보관·연결 기능이 나뉩니다.",
                categories: [
                    { id: "processing", label: "계산·처리", english: "Processing" },
                    { id: "working", label: "실행 중 작업 공간", english: "Working Memory" },
                    { id: "storage", label: "장기 보관", english: "Storage" },
                    { id: "support", label: "연결·전력·냉각", english: "System Support" }
                ],
                items: [
                    { id: "cpu", label: "CPU", english: "General Processing", category: "processing" },
                    { id: "gpu", label: "GPU", english: "Parallel Processing", category: "processing" },
                    { id: "ram", label: "RAM", english: "Working Memory", category: "working" },
                    { id: "ssd", label: "SSD", english: "Solid-State Drive", category: "storage" },
                    { id: "hdd", label: "HDD", english: "Hard Disk Drive", category: "storage" },
                    { id: "motherboard", label: "메인보드", english: "Motherboard", category: "support" },
                    { id: "psu", label: "전원 공급 장치", english: "Power Supply Unit", category: "support" },
                    { id: "fan", label: "냉각 팬", english: "Cooling Fan", category: "support" }
                ],
                success: "부품을 모양이 아니라 실제 역할로 분류했습니다. 컴퓨터는 역할이 다른 여러 부품이 연결되어 함께 작동하는 시스템입니다."
            },
            questions: [
                {
                    text: "저장 공간이 모두 256GB인 두 컴퓨터가 있습니다. A는 RAM 4GB, B는 RAM 16GB이고 같은 앱 여러 개를 동시에 열었습니다. B가 작업 공간을 더 넉넉하게 쓸 수 있는 근거는 무엇입니까?",
                    options: ["B의 RAM 용량이 실행 중인 명령과 데이터를 더 많이 펼쳐 둘 수 있기 때문이다", "B의 저장 공간 256GB가 A보다 더 큰 단위로 표시되기 때문이다", "A의 RAM 4GB가 파일을 장기간 보관하는 데 사용되기 때문이다", "두 컴퓨터의 저장 공간이 같으면 실행 중 작업 공간도 같아지기 때문이다"],
                    answer: 0,
                    concept: "RAM과 저장 공간",
                    explanation: "RAM은 실행 중인 작업 공간이고 256GB 저장 공간은 파일을 장기간 보관하는 용량입니다. 두 용량은 역할이 다릅니다."
                },
                {
                    text: "수천 개의 화면 픽셀에 같은 종류의 밝기 계산을 동시에 적용하는 작업이 있습니다. 이 작업에 특히 알맞게 설계된 부품은 무엇입니까?",
                    options: ["GPU", "SSD", "전원 공급 장치", "냉각 팬"],
                    answer: 0,
                    concept: "GPU",
                    explanation: "GPU는 많은 비슷한 계산을 병렬로 처리하도록 설계되어 픽셀·그래픽 계산에 강합니다."
                },
                {
                    text: "문서의 기존 파일은 SSD에 저장되어 있었지만 방금 입력한 문장은 저장하지 않은 채 전원이 꺼졌습니다. 다시 켰을 때 예상할 수 있는 결과는 무엇입니까?",
                    options: ["SSD의 기존 파일은 남고 RAM에 있던 저장 전 변경 내용은 사라질 수 있다", "RAM의 변경 내용은 남고 SSD의 기존 파일은 사라진다", "CPU가 입력 문장을 기억해 두었다가 파일을 다시 만든다", "메인보드의 대기 회로가 저장하지 않은 문장을 장기 보관한다"],
                    answer: 0,
                    concept: "휘발성과 비휘발성 · Volatile and Non-volatile Data Retention",
                    explanation: "SSD는 전원이 꺼져도 저장된 파일을 보관하지만 RAM에만 있던 변경 내용은 사라질 수 있습니다."
                },
                {
                    text: "CPU·RAM·GPU가 각각 제 역할을 하지만 서로 데이터를 주고받지 못하는 상황입니다. 먼저 확인할 부품과 기능은 무엇입니까?",
                    options: ["메인보드의 슬롯과 데이터 연결", "SSD의 파일 이름", "모니터의 화면 배율", "스피커의 음량 설정"],
                    answer: 0,
                    concept: "메인보드 · Motherboard",
                    explanation: "메인보드는 주요 부품이 꽂히고 전기 신호와 데이터를 주고받을 수 있는 연결 기반을 제공합니다."
                },
                {
                    text: "고성능 작업 중 부품 온도가 계속 올라가 CPU가 속도를 낮췄습니다. 성능 저하의 원인과 가장 직접적으로 연결된 장치는 무엇입니까?",
                    options: ["방열판과 냉각 팬", "파일을 보관하는 SSD", "문자를 입력하는 키보드", "웹 주소를 여는 브라우저"],
                    answer: 0,
                    concept: "냉각 · Cooling",
                    explanation: "방열판과 팬이 열을 충분히 내보내지 못하면 부품은 손상을 막기 위해 처리 속도를 낮출 수 있습니다."
                },
{
                    text: "스마트폰은 CPU와 GPU가 SoC에 함께 들어 있고 RAM과 저장 칩이 기판에 붙어 있습니다. 데스크톱과 비교한 설명으로 가장 정확한 것은 무엇입니까?",
                    options: ["같은 처리·작업·저장 역할이 더 작은 부품과 통합된 방식으로 구현된다", "SoC 안에 GPU가 있으므로 CPU는 필요하지 않다", "기판에 붙은 RAM은 파일을 전원이 꺼져도 보관한다", "스마트폰은 저장 칩이 있으므로 운영체제가 필요하지 않다"],
                    answer: 0,
                    concept: "기기별 부품 대응 · Component Equivalents Across Devices",
                    explanation: "스마트폰도 처리에는 CPU·GPU, 작업 공간에는 RAM, 장기 보관에는 플래시 저장 장치를 사용합니다. 다만 이들이 SoC와 로직 보드에 더 촘촘히 통합됩니다."
                }
            ]
        }
    ];

    const lessons = [...detailedLessons, ...(window.COMPUTER_FOUNDATION_LESSONS || [])]
        .sort((left, right) => left.number - right.number);

    (window.COMPUTER_REVIEWED_QUESTIONS || []).forEach(([lessonId, questionIndex, question]) => {
        const target = lessons.find((lesson) => lesson.id === lessonId);
        if (target?.questions?.[questionIndex]) {
            const concept = target.number <= 6
                ? target.questions[questionIndex].concept
                : question.concept;
            target.questions[questionIndex] = { ...question, concept };
        }
    });

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("lesson") || (isCourseRootPage ? "a01" : "a02");
    const requestedIndex = lessons.findIndex((item) => item.id === requestedId);
    const lessonIndex = requestedIndex >= 0 ? requestedIndex : 0;
    const lesson = lessons[lessonIndex];
    const stages = {
        concept: document.getElementById("stageConcept"),
        activity: document.getElementById("stageActivity"),
        quiz: document.getElementById("stageQuiz"),
        result: document.getElementById("stageResult")
    };
    const stepStatus = document.getElementById("stepStatus");
    const activityMount = document.getElementById("activityMount");
    const activityFeedback = document.getElementById("activityFeedback");
    const checkActivity = document.getElementById("checkActivity");
    let activityPassed = false;
    let activityState = {};
    let selectedItem = null;
    let dragState = null;
    let suppressClickUntil = 0;

    function showStage(name, status) {
        Object.entries(stages).forEach(([key, element]) => {
            const active = key === name;
            element.hidden = !active;
            element.classList.toggle("is-active", active);
        });
        stepStatus.textContent = status;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function focusStageHeading(name) {
        const heading = name === "activity"
            ? document.getElementById("activityTitle")
            : name === "result"
                ? document.getElementById("resultTitle")
                : null;
        if (!heading) return;
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
    }

    function pointerConceptLabMarkup() {
        return `
            <section class="pointer-concept-lab" aria-labelledby="pointerLabTitle">
                <div class="pointer-lab-heading">
                    <div><span>입력 상태 관찰 <small>Input State Lab</small></span><h3 id="pointerLabTitle">포인터·커서·클릭·드래그를 직접 구분하세요</h3></div>
                    <p><b>1</b>가리키기　<b>2</b>입력 위치　<b>3</b>짧게 누르기　<b>4</b>누른 채 옮기기</p>
                </div>
                <ol class="pointer-lab-states" aria-label="현재 관찰 중인 입력 상태">
                    <li class="is-active" data-lab-state="pointer"><strong>포인터 <small>Pointer</small></strong><span>화면에서 가리키는 위치</span></li>
                    <li data-lab-state="caret"><strong>텍스트 커서 <small>Text Cursor</small></strong><span>다음 글자가 들어갈 위치</span></li>
                    <li data-lab-state="click"><strong>클릭 <small>Click</small></strong><span>같은 자리에서 눌렀다 놓기</span></li>
                    <li data-lab-state="drag"><strong>드래그 앤 드롭 <small>Drag and Drop</small></strong><span>누른 채 이동해 목표에서 놓기</span></li>
                </ol>
                <div class="pointer-lab-workspace" data-pointer-workspace>
                    <div class="demo-pointer" data-demo-pointer aria-hidden="true"><span></span></div>
                    <div class="pointer-lab-toolbar">
                        <button type="button" data-demo-button><strong>단추 눌러 보기</strong><small>Click · <span data-click-count>0회</span></small></button>
                        <button type="button" class="pointer-lab-reset" data-demo-reset>전체 초기화 <small>Reset All</small></button>
                    </div>
                    <label class="demo-text-field"><span>문장 안의 입력 위치 <small>Place the Text Cursor</small></span><input data-demo-text type="text" value="파일을 폴더로 옮깁니다." aria-label="텍스트 커서 위치를 확인할 문장"></label>
                    <button type="button" class="demo-file" data-demo-file aria-label="관찰 기록 파일"><span class="demo-file-icon">TXT</span><strong>관찰 기록.txt</strong><small>누른 채 폴더까지 이동</small></button>
                    <button type="button" class="demo-folder" data-demo-folder aria-label="수업 자료 폴더"><span class="demo-folder-icon" aria-hidden="true"></span><strong>수업 자료</strong><small data-folder-state>비어 있음</small></button>
                    <p class="pointer-lab-live" data-pointer-live aria-live="polite">포인터: 작업판 안에서 가리키는 위치가 바뀝니다.</p>
                </div>
                <section class="pointer-command-lab" data-pointer-command-lab data-command="double" aria-labelledby="pointerCommandTitle">
                    <header class="pointer-command-heading"><strong id="pointerCommandTitle">추가 조작 실험 <small>Double-click · Context Menu · Scroll</small></strong><span>각 조작 뒤 대상의 상태가 실제로 바뀝니다.</span></header>
                    <div class="pointer-command-buttons" role="group" aria-label="추가 포인터 조작 선택">
                        <button type="button" data-pointer-command="double" aria-pressed="true">더블클릭 <small>Double-click</small></button>
                        <button type="button" data-pointer-command="context" aria-pressed="false">우클릭·길게 누르기 <small>Context Menu</small></button>
                        <button type="button" data-pointer-command="scroll" aria-pressed="false">휠·두 손가락 이동 <small>Scroll</small></button>
                    </div>
                    <div class="pointer-command-stage">
                        <section class="command-demo-panel double-command-demo" data-command-panel="double">
                            <button type="button" class="command-folder-target" data-double-target aria-describedby="doubleClickStatus"><i aria-hidden="true"></i><strong>수업 사진</strong><small>짧은 간격으로 두 번 누르기</small></button>
                            <div class="opened-folder-window" data-double-window hidden><strong>폴더 열림 <small>Folder Opened</small></strong><span>곤충.jpg　우주.png</span></div>
                            <p id="doubleClickStatus" data-double-status>한 번 누르면 선택, 짧은 간격으로 두 번 누르면 폴더가 열립니다.</p>
                        </section>
                        <section class="command-demo-panel context-command-demo" data-command-panel="context" hidden>
                            <button type="button" class="context-file-target" data-context-target aria-haspopup="menu" aria-expanded="false"><span>TXT</span><strong data-context-file-name>관찰 기록.txt</strong><small>우클릭·길게 누르기·Shift+F10</small></button>
                            <div class="context-action-menu" data-context-menu role="menu" hidden><button type="button" role="menuitem" data-context-action="rename">이름 바꾸기 <small>Rename</small></button><button type="button" role="menuitem" data-context-action="delete">휴지통으로 이동 <small>Move to Trash</small></button></div>
                            <p data-context-status>일반 클릭은 선택만 합니다. 메뉴 조작을 하면 파일 이름이나 위치가 바뀝니다.</p>
                        </section>
                        <section class="command-demo-panel scroll-command-demo" data-command-panel="scroll" hidden>
                            <div class="mini-scroll-document" data-scroll-viewport tabindex="0" aria-label="휠, 두 손가락, 스와이프 또는 방향키로 스크롤할 짧은 문서"><h4>관찰 순서</h4><p>1. 잎의 모양을 본다.</p><p>2. 줄기의 색을 기록한다.</p><p>3. 빛이 오는 방향을 확인한다.</p><p>4. 사진을 한 장 찍는다.</p><p>5. 아래쪽 결론을 읽는다.</p><strong>결론: 보이는 위치만 바뀌고 문서 파일의 위치는 바뀌지 않습니다.</strong></div>
                            <div class="scroll-state-readout"><b data-scroll-position>위쪽 · 0%</b><span class="scroll-meter"><i data-scroll-meter></i></span><button type="button" data-scroll-step>아래로 이동 <small>Scroll Down</small></button></div>
                            <p>휠·트랙패드·손가락·방향키로 문서의 보이는 부분을 바꿔 보세요.</p>
                        </section>
                    </div>
                    <p class="pointer-command-status" data-pointer-command-status aria-live="polite">더블클릭: 수업 사진 폴더를 짧은 간격으로 두 번 눌러 여세요.</p>
                </section>
            </section>
        `;
    }

    function setupPointerConceptLab() {
        const lab = document.querySelector(".pointer-concept-lab");
        if (!lab) return;
        const workspace = lab.querySelector("[data-pointer-workspace]");
        const marker = lab.querySelector("[data-demo-pointer]");
        const textInput = lab.querySelector("[data-demo-text]");
        const clickButton = lab.querySelector("[data-demo-button]");
        const clickCount = lab.querySelector("[data-click-count]");
        const file = lab.querySelector("[data-demo-file]");
        const folder = lab.querySelector("[data-demo-folder]");
        const folderState = lab.querySelector("[data-folder-state]");
        const live = lab.querySelector("[data-pointer-live]");
        const resetButton = lab.querySelector("[data-demo-reset]");
        const commandLab = lab.querySelector("[data-pointer-command-lab]");
        const commandStatus = lab.querySelector("[data-pointer-command-status]");
        const commandButtons = Array.from(commandLab.querySelectorAll("[data-pointer-command]"));
        const doubleTarget = lab.querySelector("[data-double-target]");
        const doubleWindow = lab.querySelector("[data-double-window]");
        const doubleStatus = lab.querySelector("[data-double-status]");
        const contextTarget = lab.querySelector("[data-context-target]");
        const contextMenu = lab.querySelector("[data-context-menu]");
        const contextName = lab.querySelector("[data-context-file-name]");
        const contextStatus = lab.querySelector("[data-context-status]");
        const scrollViewport = lab.querySelector("[data-scroll-viewport]");
        const scrollPosition = lab.querySelector("[data-scroll-position]");
        const scrollMeter = lab.querySelector("[data-scroll-meter]");
        const scrollStep = lab.querySelector("[data-scroll-step]");
        let clicks = 0;
        let fileSelected = false;
        let drag = null;
        let lastFolderClick = 0;
        let doubleTimer = 0;
        let contextTimer = 0;
        let contextLongPressed = false;

        const commandInstructions = {
            double: "더블클릭: 한 번은 선택, 짧은 간격의 두 번째 누름은 폴더 열기입니다.",
            context: "우클릭·길게 누르기: 대상에 맞는 메뉴를 열고 메뉴 명령으로 파일 상태를 바꿉니다.",
            scroll: "스크롤: 문서 안에서 보이는 위치를 바꾸지만 파일이나 문서의 저장 위치는 바꾸지 않습니다."
        };
        const chooseCommand = (command) => {
            commandLab.dataset.command = command;
            commandButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.pointerCommand === command)));
            commandLab.querySelectorAll("[data-command-panel]").forEach((panel) => { panel.hidden = panel.dataset.commandPanel !== command; });
            commandStatus.textContent = commandInstructions[command];
        };
        commandButtons.forEach((button, index) => {
            button.addEventListener("click", () => chooseCommand(button.dataset.pointerCommand));
            button.addEventListener("keydown", (event) => {
                const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
                if (!(event.key in moves)) return;
                event.preventDefault();
                const next = (index + moves[event.key] + commandButtons.length) % commandButtons.length;
                commandButtons[next].focus();
                commandButtons[next].click();
            });
        });

        const setState = (name, message) => {
            lab.querySelectorAll("[data-lab-state]").forEach((item) => item.classList.toggle("is-active", item.dataset.labState === name));
            live.textContent = message;
        };
        const moveMarker = (event) => {
            const bounds = workspace.getBoundingClientRect();
            const x = Math.max(10, Math.min(bounds.width - 18, event.clientX - bounds.left));
            const y = Math.max(10, Math.min(bounds.height - 18, event.clientY - bounds.top));
            marker.style.transform = `translate(${x}px, ${y}px)`;
            marker.classList.add("is-visible");
            if (!drag) setState("pointer", `포인터: 작업판의 (${Math.round(x)}, ${Math.round(y)}) 위치를 가리킵니다.`);
        };
        const resetFile = () => {
            file.classList.remove("is-held", "is-selected", "is-in-folder");
            file.style.removeProperty("transform");
            folder.classList.remove("is-target", "has-file");
            folderState.textContent = "비어 있음";
            fileSelected = false;
        };
        const placeFile = () => {
            file.classList.remove("is-held", "is-selected");
            file.classList.add("is-in-folder");
            file.style.removeProperty("transform");
            folder.classList.remove("is-target");
            folder.classList.add("has-file");
            folderState.textContent = "관찰 기록.txt 들어 있음";
            fileSelected = false;
            setState("drag", "드롭 완료: 폴더에서 놓아 파일의 실제 위치가 바뀌었습니다.");
        };

        workspace.addEventListener("pointermove", moveMarker);
        workspace.addEventListener("pointerdown", (event) => { if (event.target === workspace) moveMarker(event); });
        workspace.addEventListener("pointerleave", () => { if (!drag) marker.classList.remove("is-visible"); });
        textInput.addEventListener("focus", () => setState("caret", "텍스트 커서: 깜박이는 세로선 앞에 다음 글자가 입력됩니다."));
        const reportCaret = () => setState("caret", `텍스트 커서: 문장의 ${textInput.selectionStart + 1}번째 입력 위치입니다.`);
        textInput.addEventListener("click", reportCaret);
        textInput.addEventListener("keyup", reportCaret);
        clickButton.addEventListener("click", () => {
            clicks += 1;
            clickCount.textContent = `${clicks}회`;
            clickButton.classList.add("was-clicked");
            setTimeout(() => clickButton.classList.remove("was-clicked"), 180);
            setState("click", "클릭: 같은 자리에서 짧게 눌렀다 놓아 단추가 한 번 실행되었습니다.");
        });

        file.addEventListener("pointerdown", (event) => {
            if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
            event.preventDefault();
            if (file.classList.contains("is-in-folder")) resetFile();
            drag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
            file.setPointerCapture?.(event.pointerId);
            file.classList.add("is-held");
            setState("drag", "누르고 유지: 누른 채 폴더까지 이동한 다음 놓으세요.");
        });
        file.addEventListener("pointermove", (event) => {
            if (!drag || drag.pointerId !== event.pointerId) return;
            event.preventDefault();
            const dx = event.clientX - drag.startX;
            const dy = event.clientY - drag.startY;
            if (Math.hypot(dx, dy) > 6) drag.moved = true;
            file.style.transform = `translate(${dx}px, ${dy}px)`;
            const target = folder.getBoundingClientRect();
            const overFolder = event.clientX >= target.left && event.clientX <= target.right && event.clientY >= target.top && event.clientY <= target.bottom;
            folder.classList.toggle("is-target", overFolder);
            if (drag.moved) setState("drag", overFolder ? "드래그: 폴더가 강조되었습니다. 여기에서 놓으세요." : "드래그: 누른 상태를 유지하며 이동 중입니다.");
        });
        const finishFilePointer = (event) => {
            if (!drag || drag.pointerId !== event.pointerId) return;
            const finished = drag;
            drag = null;
            try { file.releasePointerCapture?.(event.pointerId); } catch (_) { /* capture may already be released */ }
            const target = folder.getBoundingClientRect();
            const overFolder = event.type !== "pointercancel" && event.clientX >= target.left && event.clientX <= target.right && event.clientY >= target.top && event.clientY <= target.bottom;
            if (finished.moved && overFolder) { placeFile(); return; }
            file.style.removeProperty("transform");
            file.classList.remove("is-held");
            folder.classList.remove("is-target");
            if (!finished.moved) {
                fileSelected = true;
                file.classList.add("is-selected");
                setState("click", "클릭: 파일이 선택되었지만 위치는 아직 바뀌지 않았습니다.");
            } else setState("drag", "드래그 취소: 폴더 밖에서 놓아 파일이 원래 자리로 돌아왔습니다.");
        };
        file.addEventListener("pointerup", finishFilePointer);
        file.addEventListener("pointercancel", finishFilePointer);
        file.addEventListener("click", (event) => {
            if (event.detail !== 0) return;
            fileSelected = true;
            file.classList.add("is-selected");
            setState("click", "키보드 실행: 파일을 선택했습니다. Tab으로 폴더에 이동해 Enter를 누르세요.");
        });
        folder.addEventListener("click", () => { if (fileSelected) placeFile(); });

        const resetDouble = () => {
            clearTimeout(doubleTimer);
            lastFolderClick = 0;
            doubleTarget.classList.remove("is-selected", "is-open");
            doubleWindow.hidden = true;
            doubleStatus.textContent = "한 번 누르면 선택, 짧은 간격으로 두 번 누르면 폴더가 열립니다.";
        };
        doubleTarget.addEventListener("click", () => {
            const now = performance.now();
            if (lastFolderClick && now - lastFolderClick <= 650) {
                clearTimeout(doubleTimer);
                lastFolderClick = 0;
                doubleTarget.classList.remove("is-selected");
                doubleTarget.classList.add("is-open");
                doubleWindow.hidden = false;
                doubleStatus.textContent = "두 번째 누름이 650ms 안에 들어와 수업 사진 폴더가 열렸습니다.";
                commandStatus.textContent = "더블클릭 성공: 같은 대상의 첫 누름은 선택, 빠른 두 번째 누름은 열기 명령이 되었습니다.";
                return;
            }
            lastFolderClick = now;
            doubleTarget.classList.add("is-selected");
            doubleWindow.hidden = true;
            doubleStatus.textContent = "1 / 2　폴더가 선택되었습니다. 650ms 안에 같은 곳을 한 번 더 누르세요.";
            clearTimeout(doubleTimer);
            doubleTimer = setTimeout(() => {
                lastFolderClick = 0;
                doubleStatus.textContent = "간격이 길어 한 번 클릭으로 끝났습니다. 폴더는 선택 상태이고 열리지는 않았습니다.";
            }, 670);
        });

        const closeContextMenu = () => {
            contextMenu.hidden = true;
            contextTarget.setAttribute("aria-expanded", "false");
        };
        const openContextMenu = (method) => {
            contextMenu.hidden = false;
            contextTarget.setAttribute("aria-expanded", "true");
            contextTarget.classList.add("is-selected");
            contextStatus.textContent = `${method}로 파일에 맞는 메뉴가 열렸습니다. 메뉴 명령을 실행해 보세요.`;
            commandStatus.textContent = `컨텍스트 메뉴 열림: ${method}는 현재 선택한 파일에 사용할 수 있는 명령을 보여 줍니다.`;
            requestAnimationFrame(() => contextMenu.querySelector("button")?.focus());
        };
        contextTarget.addEventListener("contextmenu", (event) => { event.preventDefault(); openContextMenu("우클릭"); });
        contextTarget.addEventListener("keydown", (event) => {
            if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
                event.preventDefault();
                openContextMenu("키보드 Shift+F10");
            }
        });
        contextTarget.addEventListener("pointerdown", (event) => {
            if (event.pointerType === "mouse") return;
            contextLongPressed = false;
            clearTimeout(contextTimer);
            contextTimer = setTimeout(() => { contextLongPressed = true; openContextMenu("길게 누르기"); }, 650);
        });
        ["pointerup", "pointercancel", "pointerleave"].forEach((name) => contextTarget.addEventListener(name, () => clearTimeout(contextTimer)));
        contextTarget.addEventListener("click", () => {
            if (contextLongPressed) { contextLongPressed = false; return; }
            contextTarget.classList.add("is-selected");
            contextStatus.textContent = "일반 클릭은 파일을 선택했지만 메뉴는 열지 않았습니다.";
        });
        contextMenu.querySelectorAll("[data-context-action]").forEach((button) => button.addEventListener("click", () => {
            if (button.dataset.contextAction === "rename") {
                contextName.textContent = "관찰 기록(이름 바꿈).txt";
                contextTarget.classList.remove("is-deleted");
                contextStatus.textContent = "이름 바꾸기 실행: 같은 파일의 이름이 바뀌었습니다.";
            } else {
                contextTarget.classList.add("is-deleted");
                contextStatus.textContent = "휴지통으로 이동 실행: 파일의 위치가 휴지통으로 바뀌었습니다.";
            }
            commandStatus.textContent = contextStatus.textContent;
            closeContextMenu();
            contextTarget.focus();
        }));

        const updateScroll = () => {
            const max = Math.max(1, scrollViewport.scrollHeight - scrollViewport.clientHeight);
            const percent = Math.max(0, Math.min(100, Math.round(scrollViewport.scrollTop / max * 100)));
            const place = percent <= 5 ? "위쪽" : percent >= 95 ? "아래쪽" : "중간";
            scrollPosition.textContent = `${place} · ${percent}%`;
            scrollMeter.style.width = `${percent}%`;
            scrollStep.innerHTML = percent >= 95 ? "맨 위로 <small>Back to Top</small>" : "아래로 이동 <small>Scroll Down</small>";
            commandStatus.textContent = `스크롤 위치 ${percent}%: 문서 안에서 보이는 부분만 바뀌고 파일의 저장 위치는 그대로입니다.`;
        };
        scrollViewport.addEventListener("scroll", updateScroll, { passive: true });
        scrollStep.addEventListener("click", () => {
            const max = scrollViewport.scrollHeight - scrollViewport.clientHeight;
            scrollViewport.scrollTo({ top: scrollViewport.scrollTop >= max - 2 ? 0 : Math.min(max, scrollViewport.scrollTop + 88), behavior: "smooth" });
        });

        resetButton.addEventListener("click", () => {
            clicks = 0;
            clickCount.textContent = "0회";
            resetFile();
            resetDouble();
            clearTimeout(contextTimer);
            closeContextMenu();
            contextTarget.classList.remove("is-selected", "is-deleted");
            contextName.textContent = "관찰 기록.txt";
            contextStatus.textContent = "일반 클릭은 선택만 합니다. 메뉴 조작을 하면 파일 이름이나 위치가 바뀝니다.";
            scrollViewport.scrollTop = 0;
            updateScroll();
            chooseCommand("double");
            setState("pointer", "포인터: 작업판 안에서 가리키는 위치가 바뀝니다.");
        });
        updateScroll();
        chooseCommand("double");
    }

    function setupA01SignalLab() {
        const lab = document.querySelector("[data-a01-lab]");
        if (!lab) return;
        const inputs = {
            camera: {
                input: ["카메라", "Camera"],
                inputData: "센서가 빛의 밝기와 색을 측정",
                process: ["사진 데이터 만들기", "Build Image Data"],
                processData: "빛 값을 픽셀로 배열하고 색을 보정",
                output: ["화면 미리보기", "Live Preview"],
                outputData: "디스플레이 픽셀이 장면을 바로 보여 줌",
                storage: "photo.jpg",
                storageData: "저장 장치에 사진 파일 기록",
                outputProof: "화면에 카메라 장면이 보임"
            },
            keyboard: {
                input: ["키보드", "Keyboard"],
                inputData: "눌린 키의 코드와 누름 상태를 보냄",
                process: ["문자와 위치 계산", "Resolve Key & Position"],
                processData: "키 코드를 문자로 바꾸고 커서 위치를 확인",
                output: ["문서에 A 표시", "Show A in Document"],
                outputData: "글자 모양을 화면 픽셀로 보여 줌",
                storage: "notes.txt",
                storageData: "문서 내용을 텍스트 파일로 기록",
                outputProof: "문서 화면에 A가 나타남"
            },
            microphone: {
                input: ["마이크", "Microphone"],
                inputData: "공기 진동을 시간마다 전기 신호로 측정",
                process: ["소리 데이터 만들기", "Build Audio Data"],
                processData: "측정값을 샘플로 배열하고 음량을 계산",
                output: ["화면에 파형 표시", "Show Waveform"],
                outputData: "소리의 높낮이를 파형으로 보여 줌",
                storage: "recording.webm",
                storageData: "소리 샘플을 녹음 파일로 기록",
                outputProof: "화면에 소리 파형이 움직임"
            }
        };
        const inputButtons = Array.from(lab.querySelectorAll("[data-a01-input]"));
        const routeButtons = Array.from(lab.querySelectorAll("[data-a01-route]"));
        const nodes = Array.from(lab.querySelectorAll("[data-a01-node]"));
        const fields = {
            inputTitle: lab.querySelector("[data-a01-input-title]"),
            inputData: lab.querySelector("[data-a01-input-data]"),
            processTitle: lab.querySelector("[data-a01-process-title]"),
            processData: lab.querySelector("[data-a01-process-data]"),
            outputTitle: lab.querySelector("[data-a01-output-title]"),
            outputData: lab.querySelector("[data-a01-output-data]"),
            storageTitle: lab.querySelector("[data-a01-storage-title]"),
            storageData: lab.querySelector("[data-a01-storage-data]"),
            outputState: lab.querySelector("[data-a01-output-state]"),
            storageState: lab.querySelector("[data-a01-storage-state]"),
            outputProof: lab.querySelector("[data-a01-output-proof]"),
            storageProof: lab.querySelector("[data-a01-storage-proof]"),
            status: lab.querySelector("[data-a01-status]")
        };
        const label = (pair) => `${pair[0]} <small>${pair[1]}</small>`;
        let selectedInput = "camera";
        let selectedRoute = "preview";

        const setPressed = (buttons, key, value) => {
            buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset[key] === value)));
        };
        const showSelection = () => {
            const item = inputs[selectedInput];
            lab.dataset.input = selectedInput;
            lab.dataset.route = selectedRoute;
            lab.dataset.runState = "idle";
            nodes.forEach((node) => node.classList.remove("is-active", "is-skipped"));
            fields.inputTitle.innerHTML = label(item.input);
            fields.inputData.textContent = item.inputData;
            fields.processTitle.innerHTML = label(item.process);
            fields.processData.textContent = item.processData;
            fields.outputTitle.innerHTML = label(item.output);
            fields.outputData.textContent = item.outputData;
            fields.storageTitle.textContent = item.storage;
            fields.storageData.textContent = item.storageData;
            fields.outputState.textContent = "실행 대기 · Ready";
            fields.storageState.textContent = selectedRoute === "save" ? "실행하면 파일 기록" : "이번 경로에서 제외";
            fields.outputProof.textContent = "대기 중";
            fields.storageProof.textContent = selectedRoute === "save" ? "저장 예정" : "저장하지 않음";
            fields.status.textContent = "신호 보내기를 누르면 입력과 처리를 거쳐 선택한 두 갈래의 상태가 바뀝니다.";
        };

        inputButtons.forEach((button) => button.addEventListener("click", () => {
            selectedInput = button.dataset.a01Input;
            setPressed(inputButtons, "a01Input", selectedInput);
            showSelection();
        }));
        routeButtons.forEach((button) => button.addEventListener("click", () => {
            selectedRoute = button.dataset.a01Route;
            setPressed(routeButtons, "a01Route", selectedRoute);
            showSelection();
        }));
        lab.querySelector("[data-a01-run]").addEventListener("click", () => {
            const item = inputs[selectedInput];
            lab.dataset.runState = "complete";
            nodes.forEach((node) => {
                const isStorage = node.dataset.a01Node === "storage";
                node.classList.toggle("is-active", !isStorage || selectedRoute === "save");
                node.classList.toggle("is-skipped", isStorage && selectedRoute !== "save");
            });
            fields.outputState.textContent = "출력 완료 · Displayed";
            fields.outputProof.textContent = item.outputProof;
            if (selectedRoute === "save") {
                fields.storageState.textContent = "파일 기록 완료 · Saved";
                fields.storageProof.textContent = `${item.storage} 파일이 저장 장치에 남음`;
                fields.status.textContent = "처리한 데이터가 복사되어 한 길은 출력으로, 다른 길은 저장으로 갔습니다. 화면 결과와 파일 기록이 모두 확인됩니다.";
            } else {
                fields.storageState.textContent = "건너뜀 · Not Saved";
                fields.storageProof.textContent = "파일 없음 — 전원을 끄면 다시 열 수 없음";
                fields.status.textContent = "출력은 되었지만 저장 경로를 사용하지 않았습니다. 화면에 보였다는 사실만으로 파일이 생긴 것은 아닙니다.";
            }
        });
        lab.querySelector("[data-a01-reset]").addEventListener("click", () => {
            selectedInput = "camera";
            selectedRoute = "preview";
            setPressed(inputButtons, "a01Input", selectedInput);
            setPressed(routeButtons, "a01Route", selectedRoute);
            showSelection();
        });
        showSelection();
    }

    function setupA02CooperationLab() {
        const lab = document.querySelector("[data-a02-lab]");
        if (!lab) return;
        const hardware = {
            display: { name: "디스플레이", english: "Display", accepts: "pixels", capability: "픽셀값을 실제 빛으로 바꿈", success: "디스플레이 픽셀이 켜져 파란 도형이 보입니다." },
            speaker: { name: "스피커", english: "Speaker", accepts: "tone", capability: "전기 신호를 공기 진동으로 바꿈", success: "스피커 진동판이 움직여 소리가 납니다." },
            printer: { name: "프린터", english: "Printer", accepts: "page", capability: "잉크·토너를 종이에 옮김", success: "프린터가 종이에 문서 한 장을 출력합니다." }
        };
        const commands = {
            pixels: { name: "픽셀 그리기", english: "Draw Pixels", packet: "색·좌표 명령", connection: "화면 출력 규칙" },
            tone: { name: "소리 재생", english: "Play Tone", packet: "주파수·음량 샘플", connection: "오디오 출력 규칙" },
            page: { name: "문서 인쇄", english: "Print Page", packet: "글자·그림·용지 배치", connection: "인쇄 드라이버 규칙" }
        };
        const hardwareButtons = Array.from(lab.querySelectorAll("[data-a02-hardware]"));
        const commandButtons = Array.from(lab.querySelectorAll("[data-a02-command]"));
        const presenceButtons = Array.from(lab.querySelectorAll("[data-a02-presence]"));
        let selectedHardware = "display";
        let selectedCommand = "pixels";
        let hardwareConnected = true;
        let softwareLoaded = true;

        const markPressed = (buttons, key, value) => buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset[key] === value)));
        const markPending = () => {
            const device = hardware[selectedHardware];
            const command = commands[selectedCommand];
            lab.dataset.hardware = selectedHardware;
            lab.dataset.command = selectedCommand;
            lab.dataset.result = "idle";
            lab.querySelector("[data-a02-output]").dataset.a02Output = selectedHardware;
            lab.querySelector("[data-a02-command-title]").innerHTML = `${command.name} <small>${command.english}</small>`;
            lab.querySelector("[data-a02-command-packet]").textContent = command.packet;
            lab.querySelector("[data-a02-interface]").textContent = command.connection;
            lab.querySelector("[data-a02-hardware-title]").innerHTML = `${device.name} <small>${device.english}</small>`;
            lab.querySelector("[data-a02-capability]").textContent = device.capability;
            lab.querySelector("[data-a02-hardware-presence]").textContent = hardwareConnected ? "연결됨 · Connected" : "연결 끊김 · Disconnected";
            lab.querySelector("[data-a02-software-presence]").textContent = softwareLoaded ? "불러옴 · Loaded" : "없음 · Not Loaded";
            presenceButtons.forEach((button) => {
                const on = button.dataset.a02Presence === "hardware" ? hardwareConnected : softwareLoaded;
                button.setAttribute("aria-pressed", String(on));
            });
            lab.querySelector("[data-a02-evidence-hardware]").textContent = `${device.name} ${hardwareConnected ? "연결됨" : "연결되지 않음"}`;
            lab.querySelector("[data-a02-evidence-software]").textContent = `${command.name} ${softwareLoaded ? "불러옴" : "불러오지 않음"}`;
            lab.querySelector("[data-a02-evidence-interface]").textContent = device.accepts === selectedCommand ? `${command.connection}이 ${device.name}와 맞음` : `${command.connection}과 ${device.name}의 기능이 맞지 않음`;
            lab.querySelector("[data-a02-evidence-result]").textContent = "아직 실행하지 않음";
            lab.querySelector("[data-a02-result-title]").textContent = "실행 전";
            lab.querySelector("[data-a02-result-copy]").textContent = "두 준비 상태와 조합을 확인하세요.";
            lab.querySelectorAll("[data-a02-stage]").forEach((stage) => stage.classList.remove("is-active", "is-blocked"));
        };

        hardwareButtons.forEach((button) => button.addEventListener("click", () => {
            selectedHardware = button.dataset.a02Hardware;
            markPressed(hardwareButtons, "a02Hardware", selectedHardware);
            markPending();
        }));
        commandButtons.forEach((button) => button.addEventListener("click", () => {
            selectedCommand = button.dataset.a02Command;
            markPressed(commandButtons, "a02Command", selectedCommand);
            markPending();
        }));
        presenceButtons.forEach((button) => button.addEventListener("click", () => {
            if (button.dataset.a02Presence === "hardware") hardwareConnected = !hardwareConnected;
            else softwareLoaded = !softwareLoaded;
            markPending();
        }));
        lab.querySelector("[data-a02-run]").addEventListener("click", () => {
            const device = hardware[selectedHardware];
            const command = commands[selectedCommand];
            const stages = {
                software: lab.querySelector('[data-a02-stage="software"]'),
                bridge: lab.querySelector('[data-a02-stage="bridge"]'),
                hardware: lab.querySelector('[data-a02-stage="hardware"]')
            };
            stages.software.classList.toggle("is-active", softwareLoaded);
            stages.software.classList.toggle("is-blocked", !softwareLoaded);
            stages.bridge.classList.toggle("is-active", softwareLoaded);
            stages.bridge.classList.toggle("is-blocked", !softwareLoaded || !hardwareConnected || device.accepts !== selectedCommand);
            stages.hardware.classList.toggle("is-active", hardwareConnected);
            stages.hardware.classList.toggle("is-blocked", !hardwareConnected || device.accepts !== selectedCommand);
            let result;
            let title;
            let explanation;
            if (!softwareLoaded && !hardwareConnected) {
                result = "missing-both";
                title = "실행할 수 없음";
                explanation = "명령도 없고 명령을 실제 결과로 바꿀 장치도 없습니다.";
            } else if (!softwareLoaded) {
                result = "missing-software";
                title = "명령 없음";
                explanation = `${device.name}은 연결되어 있지만 무엇을 할지 지시하는 소프트웨어 명령이 없습니다.`;
            } else if (!hardwareConnected) {
                result = "missing-hardware";
                title = "물리 장치 없음";
                explanation = `${command.name} 명령은 준비됐지만 결과를 실제 빛·소리·종이로 바꿀 하드웨어가 없습니다.`;
            } else if (device.accepts !== selectedCommand) {
                result = "mismatch";
                title = "연결 규칙 불일치";
                explanation = `${command.packet}은 ${command.connection}을 사용하지만 ${device.name}은 ${device.capability} 장치입니다.`;
            } else {
                result = "success";
                title = "협업 성공";
                explanation = device.success;
            }
            lab.dataset.result = result;
            lab.querySelector("[data-a02-result-title]").textContent = title;
            lab.querySelector("[data-a02-result-copy]").textContent = explanation;
            lab.querySelector("[data-a02-evidence-result]").textContent = explanation;
        });
        lab.querySelector("[data-a02-reset]").addEventListener("click", () => {
            selectedHardware = "display";
            selectedCommand = "pixels";
            hardwareConnected = true;
            softwareLoaded = true;
            markPressed(hardwareButtons, "a02Hardware", selectedHardware);
            markPressed(commandButtons, "a02Command", selectedCommand);
            markPending();
        });
        markPending();
    }

    function setupA03CompatibilityLab() {
        const lab = document.querySelector("[data-a03-lab]");
        if (!lab) return;
        const devices = {
            pc: { name: "PC", english: "Personal Computer", hardware: "PC 펌웨어·CPU·메모리·화면", osSupport: { windows: "Windows용 펌웨어·장치 드라이버", chromeos: "ChromeOS Flex 지원 PC용 펌웨어·장치 드라이버" } },
            chromebook: { name: "Chromebook", english: "Chromebook", hardware: "Chromebook 펌웨어·프로세서·키보드·화면", osSupport: { chromeos: "이 Chromebook 모델용 ChromeOS 펌웨어·장치 드라이버" } },
            ipad: { name: "iPad", english: "Tablet", hardware: "iPad 하드웨어·Apple 칩·터치 화면", osSupport: { ipados: "이 iPad 모델용 iPadOS 부팅 파일·장치 드라이버" } },
            phone: { name: "Phone (Android형)", english: "Android Phone", hardware: "Android형 스마트폰 SoC·터치 화면·센서", osSupport: { android: "이 스마트폰 모델용 Android 부팅 파일·장치 드라이버" } }
        };
        const systems = {
            windows: { name: "Windows", job: "지원되는 PC의 장치 드라이버와 Windows API 제공" },
            chromeos: { name: "ChromeOS", job: "지원되는 기기의 장치 관리와 ChromeOS API 제공" },
            ipados: { name: "iPadOS", job: "지원되는 iPad의 터치·파일·권한과 iPadOS API 관리" },
            android: { name: "Android", job: "지원되는 스마트폰의 장치와 Android API 관리" }
        };
        const apps = {
            paint: { name: "PC 그림판", english: "Windows Drawing App", os: "windows", osName: "Windows", package: "Windows용 .exe와 Windows API 요청", result: "그림판 창이 열리고 선을 그릴 수 있습니다." },
            "chrome-files": { name: "Chromebook 파일 앱", english: "ChromeOS Files App", os: "chromeos", osName: "ChromeOS", package: "ChromeOS 시스템 앱과 ChromeOS 파일 API 요청", result: "파일 앱이 열리고 Chromebook의 파일을 보여 줍니다." },
            "ipad-sketch": { name: "iPad 스케치", english: "iPadOS Sketch App", os: "ipados", osName: "iPadOS", package: "iPadOS용 앱 묶음과 터치·파일 API 요청", result: "스케치 앱이 열리고 Apple Pencil·터치 입력을 받습니다." },
            "android-camera": { name: "Android 카메라", english: "Android Camera App", os: "android", osName: "Android", package: "Android용 .apk와 Android 카메라 API 요청", result: "카메라 앱이 열리고 스마트폰 센서 미리보기를 보여 줍니다." }
        };
        const deviceButtons = Array.from(lab.querySelectorAll("[data-a03-device]"));
        const osButtons = Array.from(lab.querySelectorAll("[data-a03-os]"));
        const appButtons = Array.from(lab.querySelectorAll("[data-a03-app]"));
        let selectedDevice = "pc";
        let selectedOs = "windows";
        let selectedApp = "paint";
        const setPressed = (buttons, key, value) => buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset[key] === value)));
        const clearProof = () => {
            lab.dataset.outcome = "pending";
            lab.querySelectorAll("[data-a03-layer], [data-a03-proof]").forEach((item) => item.classList.remove("is-pass", "is-fail", "is-blocked"));
            lab.querySelector("[data-a03-preview-title]").textContent = "실행 확인 전";
            lab.querySelector("[data-a03-preview-copy]").textContent = "세 층을 고른 뒤 호환성을 확인하세요.";
            lab.querySelector("[data-a03-boot-proof]").textContent = "확인 전";
            lab.querySelector("[data-a03-api-proof]").textContent = "확인 전";
            lab.querySelector("[data-a03-run-proof]").textContent = "확인 전";
        };
        const showSelection = () => {
            const device = devices[selectedDevice];
            const os = systems[selectedOs];
            const app = apps[selectedApp];
            lab.dataset.device = selectedDevice;
            lab.dataset.os = selectedOs;
            lab.dataset.app = selectedApp;
            lab.querySelector("[data-a03-current-device]").innerHTML = `${device.name} <small>${device.english}</small>`;
            lab.querySelector("[data-a03-device-hardware]").textContent = device.hardware;
            lab.querySelector("[data-a03-current-os]").textContent = os.name;
            lab.querySelector("[data-a03-os-job]").textContent = os.job;
            lab.querySelector("[data-a03-current-app]").innerHTML = `${app.name} <small>${app.english}</small>`;
            lab.querySelector("[data-a03-app-package]").textContent = app.package;
            clearProof();
        };
        const choose = (buttons, key, setValue) => buttons.forEach((button) => button.addEventListener("click", () => {
            setValue(button.dataset[key]);
            setPressed(buttons, key, button.dataset[key]);
            showSelection();
        }));
        choose(deviceButtons, "a03Device", (value) => { selectedDevice = value; });
        choose(osButtons, "a03Os", (value) => { selectedOs = value; });
        choose(appButtons, "a03App", (value) => { selectedApp = value; });

        lab.querySelector("[data-a03-run]").addEventListener("click", () => {
            const device = devices[selectedDevice];
            const os = systems[selectedOs];
            const app = apps[selectedApp];
            const deviceLayer = lab.querySelector('[data-a03-layer="device"]');
            const osLayer = lab.querySelector('[data-a03-layer="os"]');
            const appLayer = lab.querySelector('[data-a03-layer="app"]');
            const bootProof = lab.querySelector('[data-a03-proof="boot"]');
            const apiProof = lab.querySelector('[data-a03-proof="api"]');
            const runProof = lab.querySelector('[data-a03-proof="run"]');
            deviceLayer.classList.add("is-pass");
            const bootSupport = device.osSupport[selectedOs];
            if (!bootSupport) {
                lab.dataset.outcome = "os-fail";
                osLayer.classList.add("is-fail");
                appLayer.classList.add("is-blocked");
                bootProof.classList.add("is-fail");
                apiProof.classList.add("is-blocked");
                runProof.classList.add("is-blocked");
                lab.querySelector("[data-a03-preview-title]").textContent = "운영체제에서 멈춤";
                lab.querySelector("[data-a03-preview-copy]").textContent = `${device.name}이라는 기기 이름만으로 운영체제가 정해지는 것은 아닙니다. 이 모형의 기기는 ${os.name}용 펌웨어·부팅 방식·드라이버 지원이 없습니다.`;
                lab.querySelector("[data-a03-boot-proof]").textContent = `${os.name}을 시작할 펌웨어·부팅 방식·장치 드라이버 지원을 이 ${device.name}에서 찾지 못했습니다.`;
                lab.querySelector("[data-a03-api-proof]").textContent = "운영체제가 시작되지 않아 앱의 API 요청까지 가지 못함";
                lab.querySelector("[data-a03-run-proof]").textContent = "앱 실행 안 됨";
                return;
            }
            osLayer.classList.add("is-pass");
            bootProof.classList.add("is-pass");
            lab.querySelector("[data-a03-boot-proof]").textContent = `${bootSupport}이 있어 ${os.name}이 시작됨`;
            if (app.os !== selectedOs) {
                lab.dataset.outcome = "app-fail";
                appLayer.classList.add("is-fail");
                apiProof.classList.add("is-fail");
                runProof.classList.add("is-blocked");
                lab.querySelector("[data-a03-preview-title]").textContent = "앱에서 멈춤";
                lab.querySelector("[data-a03-preview-copy]").textContent = `${app.name}은 ${app.osName}용이므로 현재 ${os.name}의 앱 규칙과 맞지 않습니다.`;
                lab.querySelector("[data-a03-api-proof]").textContent = `${app.package} — 현재 운영체제는 필요한 패키지·API를 제공하지 않음`;
                lab.querySelector("[data-a03-run-proof]").textContent = "운영체제는 켜졌지만 앱 실행 안 됨";
                return;
            }
            lab.dataset.outcome = "success";
            appLayer.classList.add("is-pass");
            apiProof.classList.add("is-pass");
            runProof.classList.add("is-pass");
            lab.querySelector("[data-a03-preview-title]").textContent = "앱 실행 성공";
            lab.querySelector("[data-a03-preview-copy]").textContent = app.result;
            lab.querySelector("[data-a03-api-proof]").textContent = `${app.osName}이 앱이 요구한 패키지·API를 제공함`;
            lab.querySelector("[data-a03-run-proof]").textContent = app.result;
        });
        lab.querySelector("[data-a03-reset]").addEventListener("click", () => {
            selectedDevice = "pc";
            selectedOs = "windows";
            selectedApp = "paint";
            setPressed(deviceButtons, "a03Device", selectedDevice);
            setPressed(osButtons, "a03Os", selectedOs);
            setPressed(appButtons, "a03App", selectedApp);
            showSelection();
        });
        showSelection();
    }

    function a04ConversionMarkup(mode = "concept") {
        const challenge = mode === "activity";
        const bins = [20, 20.5, 21, 21.5, 22];
        return `
            <section class="foundation-direct-lab a04-conversion-lab" data-a04-lab="${mode}" data-a04-recorded="false" aria-labelledby="a04LabTitle-${mode}">
                <header class="foundation-lab-heading has-context">
                    <div>
                        <span>아날로그→디지털 변환 <small>Analog-to-Digital Conversion</small></span>
                        <h3 id="a04LabTitle-${mode}">${challenge ? "서로 다른 실제 온도가 같은 숫자 칸에 들어가는지 기록하세요." : "온도를 움직이고, 기록 순간에 어느 숫자 칸이 선택되는지 보세요."}</h3>
                    </div>
                    <button type="button" class="foundation-reset" data-a04-reset>처음 상태 <small>Reset</small></button>
                    <figure class="foundation-context-figure">
                        <picture>
                            <source srcset="${asset("a04-analog-digital-representation-illustration-v1-768.webp")} 768w, ${asset("a04-analog-digital-representation-illustration-v1-1536.webp")} 1536w" sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px" type="image/webp">
                            <img src="${asset("a04-analog-digital-representation-illustration-v1-768.webp")}" width="1536" height="1024" alt="이어지는 현실의 움직임을 일정한 순간과 숫자 단계로 기록하는 장면">
                        </picture>
                        <figcaption>이어지는 값→숫자 칸<small>Continuous to Discrete</small></figcaption>
                    </figure>
                </header>
                <div class="a04-control-row">
                    <label>
                        <span>공기의 실제 온도 <small>Real Temperature</small></span>
                        <strong data-a04-raw>20.14°C</strong>
                        <input data-a04-slider type="range" min="2000" max="2200" step="1" value="2014" aria-label="공기의 실제 온도">
                    </label>
                    <button type="button" class="foundation-run" data-a04-capture>이 순간 기록 <small>Capture This Moment</small></button>
                </div>
                <div class="a04-conversion-stage">
                    <section class="a04-analog-source" aria-label="이어지는 아날로그 센서 신호">
                        <header><span>센서 신호 <small>Analog Signal</small></span><strong>중간에서 끊기지 않음</strong></header>
                        <div class="a04-thermometer" aria-hidden="true"><i data-a04-liquid></i><b data-a04-needle></b></div>
                        <div class="a04-continuous-track" aria-hidden="true"><i data-a04-signal-dot></i></div>
                        <p>슬라이더의 0.01°C 사이에도 더 많은 실제 값이 존재할 수 있습니다.</p>
                    </section>
                    <div class="a04-adc-gate" aria-label="아날로그 디지털 변환기">
                        <span>측정 순간</span>
                        <strong>ADC</strong>
                        <small>가까운 숫자 칸 선택</small>
                        <i aria-hidden="true">→</i>
                    </div>
                    <section class="a04-digital-bank" aria-label="0.5도 간격의 디지털 기록 칸">
                        <header><span>숫자 기록 <small>Digital Record</small></span><strong data-a04-candidate>지금 기록하면 20.0°C</strong></header>
                        <div class="a04-number-bins">
                            ${bins.map((value) => `<div data-a04-bin="${value.toFixed(1)}"><span>${value.toFixed(1)}°C</span></div>`).join("")}
                        </div>
                        <output data-a04-digital>아직 기록하지 않음</output>
                        <p>이 모형의 기록 간격은 0.5°C입니다.</p>
                    </section>
                </div>
                <div class="a04-capture-log" aria-label="두 번의 온도 기록">
                    <strong>기록 두 칸 <small>Two Captures</small></strong>
                    <div><output data-a04-record="0">첫 번째 기록 전</output><output data-a04-record="1">두 번째 기록 전</output></div>
                </div>
                <div class="foundation-evidence a04-evidence" aria-live="polite">
                    <strong>측정 기록 <small>Measurement Record</small></strong>
                    <p data-a04-status>온도를 정한 뒤 ‘이 순간 기록’을 누르세요.</p>
                    <dl>
                        <div><dt>이어지는 실제 값</dt><dd data-a04-proof-raw>20.14°C</dd></div>
                        <div><dt>가장 가까운 숫자 칸</dt><dd data-a04-proof-bin>20.0°C</dd></div>
                        <div><dt>최근 기록 차이</dt><dd data-a04-error>기록 전</dd></div>
                    </dl>
                </div>
            </section>`;
    }

    function a04RecordedTemperature(raw) {
        return Math.round(raw * 2) / 2;
    }

    function setupA04ConversionLab(root = document.querySelector('[data-a04-lab="concept"]'), options = {}) {
        if (!root || root.dataset.a04Ready === "true") return;
        root.dataset.a04Ready = "true";
        const slider = root.querySelector("[data-a04-slider]");
        const capture = root.querySelector("[data-a04-capture]");
        const reset = root.querySelector("[data-a04-reset]");
        const bins = Array.from(root.querySelectorAll("[data-a04-bin]"));
        const records = Array.from(root.querySelectorAll("[data-a04-record]"));
        const challenge = root.dataset.a04Lab === "activity";
        const state = { raw: Number(slider.value) / 100, recorded: null, captures: [] };

        const pairFound = () => state.captures.length === 2
            && Math.abs(state.captures[0].raw - state.captures[1].raw) > .0001
            && state.captures[0].digital === state.captures[1].digital;

        const notify = () => options.onState?.({
            records: state.captures.map((entry) => ({ ...entry })),
            pairFound: pairFound()
        });

        const renderRecords = () => {
            records.forEach((output, index) => {
                const entry = state.captures[index];
                output.textContent = entry
                    ? `실제 ${entry.raw.toFixed(2)}°C → 기록 ${entry.digital.toFixed(1)}°C`
                    : `${index === 0 ? "첫" : "두"} 번째 기록 전`;
                output.classList.toggle("is-filled", Boolean(entry));
                output.classList.toggle("is-pair", Boolean(entry) && pairFound());
            });
        };

        const render = () => {
            const candidate = a04RecordedTemperature(state.raw);
            const level = ((state.raw - 20) / 2) * 100;
            root.style.setProperty("--a04-level", `${level}%`);
            root.querySelector("[data-a04-raw]").textContent = `${state.raw.toFixed(2)}°C`;
            root.querySelector("[data-a04-proof-raw]").textContent = `${state.raw.toFixed(2)}°C`;
            root.querySelector("[data-a04-candidate]").textContent = `지금 기록하면 ${candidate.toFixed(1)}°C`;
            root.querySelector("[data-a04-proof-bin]").textContent = `${candidate.toFixed(1)}°C`;
            root.querySelector("[data-a04-digital]").textContent = state.recorded === null
                ? "아직 기록하지 않음"
                : `${state.recorded.toFixed(1)}°C 기록`;
            root.querySelector("[data-a04-liquid]").style.height = `${10 + level * .78}%`;
            root.querySelector("[data-a04-needle]").style.transform = `rotate(${-68 + level * 1.36}deg)`;
            slider.setAttribute("aria-valuetext", `${state.raw.toFixed(2)}도`);
            bins.forEach((bin) => {
                const value = Number(bin.dataset.a04Bin);
                bin.classList.toggle("is-candidate", value === candidate);
                bin.classList.toggle("is-recorded", state.recorded !== null && value === state.recorded);
            });
            const latest = state.captures.at(-1);
            root.querySelector("[data-a04-error]").textContent = latest
                ? `${latest.raw.toFixed(2)} − ${latest.digital.toFixed(1)} = ${(latest.raw - latest.digital).toFixed(2)}°C`
                : "기록 전";
            renderRecords();
        };

        slider.addEventListener("input", () => {
            state.raw = Number(slider.value) / 100;
            render();
        });
        capture.addEventListener("click", () => {
            state.recorded = a04RecordedTemperature(state.raw);
            if (state.captures.length === 2) state.captures.shift();
            state.captures.push({ raw: state.raw, digital: state.recorded });
            root.dataset.a04Recorded = "true";
            render();
            if (state.captures.length < 2) {
                root.querySelector("[data-a04-status]").textContent = "첫 기록을 남겼습니다. 실제 온도를 바꾼 뒤 한 번 더 기록하세요.";
            } else if (challenge) {
                root.querySelector("[data-a04-status]").textContent = "두 기록을 남겼습니다. ‘확인’을 눌러 실제값과 숫자 칸의 관계를 검사하세요.";
            } else {
                root.querySelector("[data-a04-status]").textContent = pairFound()
                    ? `실제 온도는 다르지만 두 값 모두 ${state.captures[0].digital.toFixed(1)}°C 칸에 기록되었습니다.`
                    : "두 실제값은 서로 다른 숫자 칸에 기록되었습니다. 값의 간격을 더 좁혀 다시 기록해 보세요.";
            }
            notify();
        });
        reset.addEventListener("click", () => {
            slider.value = "2014";
            state.raw = 20.14;
            state.recorded = null;
            state.captures = [];
            root.dataset.a04Recorded = "false";
            root.querySelector("[data-a04-status]").textContent = "온도를 정한 뒤 ‘이 순간 기록’을 누르세요.";
            render();
            notify();
        });
        render();
        notify();
    }

    function a05DigitizerMarkup(mode = "concept") {
        const challenge = mode === "activity";
        return `
            <section class="foundation-direct-lab a05-digitizer-lab" data-a05-lab="${mode}" data-a05-recorded="false" aria-labelledby="a05LabTitle-${mode}">
                <header class="foundation-lab-heading has-context">
                    <div>
                        <span>소리의 숫자 기록 <small>Sound Digitization</small></span>
                        <h3 id="a05LabTitle-${mode}">${challenge ? "한 조건만 바꾼 두 기록을 만들어 시간과 높이 방향을 비교하세요." : "같은 파형의 측정 횟수와 숫자 단계 수를 바꾸어 기록하세요."}</h3>
                    </div>
                    <button type="button" class="foundation-reset" data-a05-reset>처음 상태 <small>Reset</small></button>
                    <figure class="foundation-context-figure">
                        <picture>
                            <source srcset="${asset("a05-sound-sampling-data-illustration-v1-768.webp")} 768w, ${asset("a05-sound-sampling-data-illustration-v1-1536.webp")} 1536w" sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px" type="image/webp">
                            <img src="${asset("a05-sound-sampling-data-illustration-v1-768.webp")}" width="1536" height="1024" alt="기타 소리가 마이크 신호와 측정점을 거쳐 숫자 데이터가 되는 장면">
                        </picture>
                        <figcaption>소리→측정점→비트<small>Sound to Bits</small></figcaption>
                    </figure>
                </header>
                <div class="a05-control-row">
                    <fieldset>
                        <legend>시간 방향: 1초에 몇 번 측정할까? <small>Sampling Rate</small></legend>
                        <div class="foundation-choice-row" role="group" aria-label="모형의 샘플링 레이트">
                            ${[4, 8, 16].map((rate) => `<button type="button" data-a05-rate="${rate}" aria-pressed="${rate === 4}">${rate}번/초<small>${rate} samples/s</small></button>`).join("")}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>높이 방향: 한 값을 몇 칸으로 나눌까? <small>Bit Depth</small></legend>
                        <div class="foundation-choice-row" role="group" aria-label="모형의 비트 깊이">
                            ${[2, 3, 4].map((bits) => `<button type="button" data-a05-bits="${bits}" aria-pressed="${bits === 2}">${bits}비트 · ${2 ** bits}단계<small>${bits}-bit · ${2 ** bits} levels</small></button>`).join("")}
                        </div>
                    </fieldset>
                    <button type="button" class="foundation-run" data-a05-record>1초 기록 <small>Record One Second</small></button>
                </div>
                <div class="a05-workbench">
                    <section class="a05-wave-panel">
                        <header><strong>이어지는 마이크 신호와 기록점</strong><small>Continuous Signal and Recorded Samples</small></header>
                        <canvas data-a05-canvas aria-label="이어지는 파형, 측정 순간, 양자화한 숫자 단계를 비교하는 그래프"></canvas>
                        <div class="a05-graph-legend" aria-label="그래프 표시 뜻"><span class="raw">이어지는 신호</span><span class="measured">측정 높이</span><span class="stored">숫자 단계</span><span class="replay">기록값을 이은 재생 모형</span></div>
                        <p>점 사이의 청록 점선은 저장된 선이 아니라, 기록값을 시간 순서대로 재생한 모습을 단순화한 것입니다.</p>
                    </section>
                    <aside class="a05-sample-inspector">
                        <span>선택한 샘플 <small>Selected Sample</small></span>
                        <strong data-a05-selected>기록 전</strong>
                        <dl>
                            <div><dt>측정 높이</dt><dd data-a05-raw>—</dd></div>
                            <div><dt>가까운 단계</dt><dd data-a05-quantized>—</dd></div>
                            <div><dt>비트 코드</dt><dd><code data-a05-code>—</code></dd></div>
                            <div><dt>양자화 차이</dt><dd data-a05-error>—</dd></div>
                        </dl>
                    </aside>
                </div>
                <div class="a05-sample-strip" data-a05-sample-list aria-label="기록한 샘플 목록"><p>‘1초 기록’을 누르면 각 측정값의 비트 코드가 나타납니다.</p></div>
                <div class="a05-record-summary">
                    <div><span>측정 횟수</span><strong data-a05-sample-count>4번/초</strong></div>
                    <div><span>높이 단계</span><strong data-a05-level-count>2비트 · 4단계</strong></div>
                    <div><span>이 모형의 기록량</span><strong data-a05-total-bits>4 × 2 = 8비트</strong></div>
                </div>
                <section class="a05-snapshot-compare" aria-labelledby="a05CompareTitle-${mode}">
                    <header><strong id="a05CompareTitle-${mode}">A와 B 비교 <small>Compare Two Records</small></strong><span>한 번에 한 조건만 바꾸면 어느 설정이 결과를 바꾸었는지 알 수 있습니다.</span></header>
                    <div class="a05-snapshot-grid">
                        <div><button type="button" data-a05-save="a" disabled>현재 기록을 A에 저장 <small>Save as A</small></button><output data-a05-snapshot="a">A: 기록 전</output></div>
                        <div><button type="button" data-a05-save="b" disabled>현재 기록을 B에 저장 <small>Save as B</small></button><output data-a05-snapshot="b">B: 기록 전</output></div>
                    </div>
                    <p data-a05-comparison>A와 B에 기록을 하나씩 저장하세요.</p>
                    ${challenge ? `<ul class="a05-comparison-progress"><li data-a05-progress="rate">샘플링 레이트만 바꾼 비교</li><li data-a05-progress="bits">비트 깊이만 바꾼 비교</li></ul>` : ""}
                </section>
                <div class="foundation-evidence a05-evidence" aria-live="polite">
                    <strong>기록 상태 <small>Recording State</small></strong>
                    <p data-a05-status>두 설정을 고른 뒤 ‘1초 기록’을 누르세요.</p>
                </div>
            </section>`;
    }

    function a05WaveValue(fraction) {
        return Math.sin(fraction * Math.PI * 4) * .58 + Math.sin(fraction * Math.PI * 10) * .16;
    }

    function a05Quantize(value, bits) {
        const levels = 2 ** bits;
        const levelIndex = Math.round(((value + 1) / 2) * (levels - 1));
        return {
            levelIndex,
            value: (levelIndex / (levels - 1)) * 2 - 1,
            code: levelIndex.toString(2).padStart(bits, "0")
        };
    }

    function a05CreateSamples(rate, bits) {
        return Array.from({ length: rate }, (_, index) => {
            const fraction = index / rate;
            const raw = a05WaveValue(fraction);
            return { sampleIndex: index, fraction, raw, ...a05Quantize(raw, bits) };
        });
    }

    function drawA05DigitizationGraph(canvas, state) {
        if (!canvas) return;
        const ratio = Math.max(1, window.devicePixelRatio || 1);
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(560, Math.round(rect.width || 760));
        const height = Math.max(260, Math.round(rect.height || 290));
        const padding = { left: 34, right: 18, top: 18, bottom: 28 };
        const graphWidth = width - padding.left - padding.right;
        const graphHeight = height - padding.top - padding.bottom;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        const context = canvas.getContext("2d");
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, width, height);
        const xAt = (fraction) => padding.left + fraction * graphWidth;
        const yAt = (value) => padding.top + ((1 - value) / 2) * graphHeight;
        const levels = 2 ** state.bits;

        context.lineWidth = 1;
        for (let index = 0; index < levels; index += 1) {
            const value = (index / (levels - 1)) * 2 - 1;
            context.strokeStyle = index === 0 || index === levels - 1 ? "#a99475" : "rgba(143, 119, 83, .22)";
            context.beginPath();
            context.moveTo(padding.left, yAt(value));
            context.lineTo(width - padding.right, yAt(value));
            context.stroke();
        }
        context.strokeStyle = "#9a642d";
        context.lineWidth = 3;
        context.beginPath();
        for (let index = 0; index <= 240; index += 1) {
            const fraction = index / 240;
            const x = xAt(fraction);
            const y = yAt(a05WaveValue(fraction));
            if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.stroke();

        if (state.samples.length) {
            context.strokeStyle = "#08717c";
            context.lineWidth = 2;
            context.setLineDash([7, 5]);
            context.beginPath();
            state.samples.forEach((sample, index) => {
                const x = xAt(sample.fraction);
                const y = yAt(sample.value);
                if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
            });
            context.stroke();
            context.setLineDash([]);
            state.samples.forEach((sample) => {
                const x = xAt(sample.fraction);
                const rawY = yAt(sample.raw);
                const storedY = yAt(sample.value);
                context.strokeStyle = "#c16d28";
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(x, rawY);
                context.lineTo(x, storedY);
                context.stroke();
                context.fillStyle = "#fffdf8";
                context.strokeStyle = "#9a642d";
                context.lineWidth = 2;
                context.beginPath();
                context.arc(x, rawY, 5, 0, Math.PI * 2);
                context.fill();
                context.stroke();
                context.fillStyle = "#08717c";
                context.fillRect(x - 5, storedY - 5, 10, 10);
            });
        }
        context.fillStyle = "#5a4b3e";
        context.font = "700 12px system-ui, sans-serif";
        context.fillText("0초", padding.left, height - 8);
        context.fillText("1초", width - padding.right - 20, height - 8);
    }

    function setupA05DigitizerLab(root = document.querySelector('[data-a05-lab="concept"]'), options = {}) {
        if (!root || root.dataset.a05Ready === "true") return;
        root.dataset.a05Ready = "true";
        const rateButtons = Array.from(root.querySelectorAll("[data-a05-rate]"));
        const bitButtons = Array.from(root.querySelectorAll("[data-a05-bits]"));
        const saveButtons = Array.from(root.querySelectorAll("[data-a05-save]"));
        const canvas = root.querySelector("[data-a05-canvas]");
        const sampleList = root.querySelector("[data-a05-sample-list]");
        const state = {
            rate: 4,
            bits: 2,
            samples: [],
            selected: 0,
            snapshots: { a: null, b: null },
            rateCompared: false,
            bitsCompared: false
        };

        const notify = () => options.onState?.({
            rateCompared: state.rateCompared,
            bitsCompared: state.bitsCompared
        });
        const setPressed = (buttons, key, value) => buttons.forEach((button) => {
            button.setAttribute("aria-pressed", String(Number(button.dataset[key]) === value));
        });
        const clearRecording = () => {
            state.samples = [];
            state.selected = 0;
            root.dataset.a05Recorded = "false";
            saveButtons.forEach((button) => { button.disabled = true; });
            sampleList.innerHTML = "<p>설정을 기록하면 각 측정값의 비트 코드가 나타납니다.</p>";
            root.querySelector("[data-a05-selected]").textContent = "기록 전";
            root.querySelector("[data-a05-raw]").textContent = "—";
            root.querySelector("[data-a05-quantized]").textContent = "—";
            root.querySelector("[data-a05-code]").textContent = "—";
            root.querySelector("[data-a05-error]").textContent = "—";
            drawA05DigitizationGraph(canvas, state);
        };
        const renderSummary = () => {
            root.querySelector("[data-a05-sample-count]").textContent = `${state.rate}번/초`;
            root.querySelector("[data-a05-level-count]").textContent = `${state.bits}비트 · ${2 ** state.bits}단계`;
            root.querySelector("[data-a05-total-bits]").textContent = `${state.rate} × ${state.bits} = ${state.rate * state.bits}비트`;
        };
        const renderSelected = () => {
            const sample = state.samples[state.selected];
            if (!sample) return;
            root.querySelector("[data-a05-selected]").textContent = `${sample.sampleIndex + 1}번째 · ${sample.fraction.toFixed(2)}초`;
            root.querySelector("[data-a05-raw]").textContent = sample.raw.toFixed(2);
            root.querySelector("[data-a05-quantized]").textContent = `${sample.levelIndex}번 단계 → ${sample.value.toFixed(2)}`;
            root.querySelector("[data-a05-code]").textContent = sample.code;
            root.querySelector("[data-a05-error]").textContent = Math.abs(sample.raw - sample.value).toFixed(2);
            sampleList.querySelectorAll("[data-a05-sample-index]").forEach((button) => {
                const selected = Number(button.dataset.a05SampleIndex) === state.selected;
                button.setAttribute("aria-pressed", String(selected));
            });
        };
        const renderSamples = () => {
            sampleList.innerHTML = state.samples.map((sample) => `
                <button type="button" data-a05-sample-index="${sample.sampleIndex}" aria-pressed="${sample.sampleIndex === state.selected}">
                    <span>${sample.sampleIndex + 1}</span><code>${sample.code}</code>
                </button>`).join("");
            sampleList.querySelectorAll("[data-a05-sample-index]").forEach((button) => button.addEventListener("click", () => {
                state.selected = Number(button.dataset.a05SampleIndex);
                renderSelected();
            }));
            renderSelected();
        };
        const snapshotText = (key) => {
            const item = state.snapshots[key];
            return item
                ? `${key.toUpperCase()}: ${item.rate}번/초 · ${item.bits}비트(${2 ** item.bits}단계) · ${item.rate * item.bits}비트`
                : `${key.toUpperCase()}: 기록 전`;
        };
        const compareSnapshots = () => {
            const a = state.snapshots.a;
            const b = state.snapshots.b;
            const output = root.querySelector("[data-a05-comparison]");
            if (!a || !b) {
                output.textContent = "A와 B에 기록을 하나씩 저장하세요.";
            } else if (a.rate !== b.rate && a.bits === b.bits) {
                state.rateCompared = true;
                output.textContent = `비트 깊이는 ${a.bits}비트로 같고 샘플링 레이트만 ${a.rate}→${b.rate}번/초로 달라졌습니다. 시간 방향의 측정점 수가 달라집니다.`;
            } else if (a.rate === b.rate && a.bits !== b.bits) {
                state.bitsCompared = true;
                output.textContent = `샘플링 레이트는 ${a.rate}번/초로 같고 비트 깊이만 ${a.bits}→${b.bits}비트로 달라졌습니다. 높이 방향의 단계 수가 달라집니다.`;
            } else if (a.rate === b.rate && a.bits === b.bits) {
                output.textContent = "A와 B의 두 설정이 같습니다. 한 조건만 바꾼 기록을 다시 저장하세요.";
            } else {
                output.textContent = "샘플링 레이트와 비트 깊이가 함께 달라졌습니다. 어느 조건의 영향인지 비교하려면 한 번에 하나만 바꾸세요.";
            }
            root.querySelectorAll("[data-a05-progress]").forEach((item) => {
                const done = item.dataset.a05Progress === "rate" ? state.rateCompared : state.bitsCompared;
                item.classList.toggle("is-complete", done);
            });
            notify();
        };
        const chooseSetting = (buttons, key, assign, label) => buttons.forEach((button) => button.addEventListener("click", () => {
            const value = Number(button.dataset[key]);
            assign(value);
            setPressed(buttons, key, value);
            clearRecording();
            renderSummary();
            root.querySelector("[data-a05-status]").textContent = `${label}를 바꿨습니다. 이 설정으로 ‘1초 기록’을 누르세요.`;
        }));

        chooseSetting(rateButtons, "a05Rate", (value) => { state.rate = value; }, "샘플링 레이트");
        chooseSetting(bitButtons, "a05Bits", (value) => { state.bits = value; }, "비트 깊이");
        root.querySelector("[data-a05-record]").addEventListener("click", () => {
            state.samples = a05CreateSamples(state.rate, state.bits);
            state.selected = 0;
            root.dataset.a05Recorded = "true";
            saveButtons.forEach((button) => { button.disabled = false; });
            renderSummary();
            renderSamples();
            drawA05DigitizationGraph(canvas, state);
            root.querySelector("[data-a05-status]").textContent = `${state.rate}개의 측정값을 ${state.bits}비트(${2 ** state.bits}단계)로 기록했습니다. 표본 하나를 누르면 측정값과 비트 코드를 볼 수 있습니다.`;
        });
        saveButtons.forEach((button) => button.addEventListener("click", () => {
            const key = button.dataset.a05Save;
            state.snapshots[key] = { rate: state.rate, bits: state.bits };
            root.querySelector(`[data-a05-snapshot="${key}"]`).textContent = snapshotText(key);
            compareSnapshots();
        }));
        root.querySelector("[data-a05-reset]").addEventListener("click", () => {
            state.rate = 4;
            state.bits = 2;
            state.snapshots = { a: null, b: null };
            state.rateCompared = false;
            state.bitsCompared = false;
            setPressed(rateButtons, "a05Rate", state.rate);
            setPressed(bitButtons, "a05Bits", state.bits);
            root.querySelector('[data-a05-snapshot="a"]').textContent = snapshotText("a");
            root.querySelector('[data-a05-snapshot="b"]').textContent = snapshotText("b");
            root.querySelector("[data-a05-comparison]").textContent = "A와 B에 기록을 하나씩 저장하세요.";
            root.querySelectorAll("[data-a05-progress]").forEach((item) => item.classList.remove("is-complete"));
            root.querySelector("[data-a05-status]").textContent = "두 설정을 고른 뒤 ‘1초 기록’을 누르세요.";
            clearRecording();
            renderSummary();
            notify();
        });
        renderSummary();
        clearRecording();
        requestAnimationFrame(() => drawA05DigitizationGraph(canvas, state));
        notify();
    }

    function setupConceptSequences() {
        document.querySelectorAll("[data-concept-sequence]").forEach((sequence) => {
            const steps = Array.from(sequence.querySelectorAll("[data-sequence-step]"));
            const status = sequence.querySelector("[data-sequence-status]");
            const nextButton = sequence.querySelector("[data-sequence-next]");
            if (!steps.length || !status || !nextButton) return;
            let activeIndex = 0;

            const activate = (index) => {
                activeIndex = index;
                steps.forEach((step, stepIndex) => {
                    const selected = stepIndex === activeIndex;
                    step.classList.toggle("is-active", selected);
                    step.setAttribute("aria-pressed", String(selected));
                });
                const title = steps[activeIndex].querySelector("strong")?.childNodes[0]?.textContent?.trim() || "";
                const detail = steps[activeIndex].querySelector("p")?.textContent?.trim() || "";
                status.textContent = `${activeIndex + 1} / ${steps.length}　${title}${detail ? ` — ${detail}` : ""}`;
                nextButton.innerHTML = activeIndex === steps.length - 1
                    ? "처음부터 <small>Restart</small>"
                    : "다음 단계 <small>Next Step</small>";
            };

            steps.forEach((step, index) => {
                step.addEventListener("click", () => activate(index));
                step.addEventListener("keydown", (event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    activate(index);
                });
            });
            nextButton.addEventListener("click", () => activate((activeIndex + 1) % steps.length));
            activate(0);
        });
    }

    function setupFullStackLab() {
        const lab = document.querySelector("[data-stack-lab]");
        if (!lab) return;
        const startButton = lab.querySelector("[data-stack-start]");
        const nextButton = lab.querySelector("[data-stack-next]");
        const status = lab.querySelector("[data-stack-status]");
        const nodes = Array.from(lab.querySelectorAll("[data-stack-node]"));
        if (!startButton || !nextButton || !status || !nodes.length) return;
        const answerButtons = Array.from(lab.querySelectorAll("[data-stack-answer]"));
        const requestValue = lab.querySelector("[data-stack-request]");
        const responseValue = lab.querySelector("[data-stack-response]");
        const comparison = lab.querySelector("[data-stack-comparison]");
        const verdict = lab.querySelector("[data-stack-verdict]");
        const dbScore = lab.querySelector("[data-stack-db-score]");
        const screenScore = lab.querySelector("[data-stack-screen-score]");
        const selectedEvidence = lab.querySelector("[data-stack-selected]");
        const resultEvidence = lab.querySelector("[data-stack-result]");
        const storedEvidence = lab.querySelector("[data-stack-stored]");
        const displayedEvidence = lab.querySelector("[data-stack-displayed]");
        const messages = [
            "먼저 문제 화면에서 답 하나를 고르세요. 답은 아직 학생 기기 안에만 있습니다.",
            "1 / 6　문제 화면이 고른 답을 읽었습니다. 사용자가 보고 조작하는 이 화면 부분이 프론트엔드입니다.",
            "2 / 6　프론트엔드가 { answer }라는 약속된 이름으로 답을 요청 봉투에 담아 서버로 보냈습니다. 이 주소·방법·데이터 모양의 약속이 API입니다.",
            "3 / 6　서버의 백엔드가 데이터베이스에서 정답 3을 읽어 받은 답과 비교했습니다. 백엔드는 보관함이 아니라 규칙을 실행하는 프로그램입니다.",
            "4 / 6　백엔드가 계산 결과를 데이터베이스의 학생 17 점수 행에 기록했습니다. 데이터베이스는 관계를 정해 자료를 보관하고 찾게 합니다.",
            "5 / 6　백엔드가 저장된 점수를 응답 봉투에 담아 학생 기기로 돌려보냈습니다.",
            "6 / 6　프론트엔드가 응답에서 score 값을 읽어 화면에 표시했습니다. 고른 답부터 화면 결과까지 같은 값이 어떻게 이동하고 바뀌었는지 확인하세요."
        ];
        let stage = 0;
        let selectedAnswer = null;
        const baseScore = 4;

        const calculatedScore = () => baseScore + (selectedAnswer === 3 ? 1 : 0);

        const activate = (nextStage) => {
            stage = nextStage;
            lab.dataset.stage = String(stage);
            nodes.forEach((node) => {
                const stages = node.dataset.stackNode.split(",").map(Number);
                const selected = stages.includes(stage);
                node.classList.toggle("is-active", selected);
                node.setAttribute("aria-pressed", String(selected));
            });
            const hasRequest = stage >= 2;
            const hasCalculation = stage >= 3;
            const hasStored = stage >= 4;
            const hasResponse = stage >= 5;
            const hasDisplay = stage >= 6;
            const score = calculatedScore();
            requestValue.textContent = hasRequest ? `{ answer: ${selectedAnswer} }` : "{ answer: — }";
            comparison.textContent = hasCalculation ? `${selectedAnswer} = 3 ?` : "— = 3 ?";
            verdict.textContent = hasCalculation ? (selectedAnswer === 3 ? "같음 → 1점 더하기" : "다름 → 점수 유지") : "처리 전";
            dbScore.textContent = String(hasStored ? score : baseScore);
            responseValue.textContent = hasResponse ? `{ score: ${score} }` : "{ score: — }";
            screenScore.textContent = hasDisplay ? `${score}점 표시` : "아직 점수 없음";
            selectedEvidence.textContent = selectedAnswer === null ? "선택 전" : `${selectedAnswer}`;
            resultEvidence.textContent = hasCalculation ? (selectedAnswer === 3 ? "정답 · +1" : "오답 · +0") : "처리 전";
            storedEvidence.textContent = `${hasStored ? score : baseScore}점`;
            displayedEvidence.textContent = hasDisplay ? `${score}점` : "표시 전";
            status.textContent = messages[stage];
            answerButtons.forEach((button) => { button.disabled = stage > 0; });
            startButton.disabled = stage > 0 || selectedAnswer === null;
            nextButton.disabled = stage === 0;
            nextButton.innerHTML = stage === 6
                ? "다른 답 시험 <small>Try Another Answer</small>"
                : "다음 단계 <small>Next Step</small>";
        };

        const reset = () => {
            selectedAnswer = null;
            answerButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
            activate(0);
        };
        answerButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (stage !== 0) return;
                selectedAnswer = Number(button.dataset.stackAnswer);
                answerButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
                activate(0);
                status.textContent = `선택한 답은 ${selectedAnswer}입니다. 아직 서버에는 가지 않았습니다. 답 제출을 누르면 프론트엔드가 이 값을 읽습니다.`;
            });
        });
        startButton.addEventListener("click", () => { if (selectedAnswer !== null) activate(1); });
        nextButton.addEventListener("click", () => stage >= 6 ? reset() : activate(stage + 1));
        reset();
    }

    function renderLesson() {
        document.title = `${lesson.title} | 컴퓨터 이론`;
        document.getElementById("lessonMeta").textContent = `${lesson.number}차시`;
        document.getElementById("lessonTitle").innerHTML = `${lesson.title} <small>${lesson.english}</small>`;
        document.getElementById("situationTitle").innerHTML = `${lesson.workedExample.title} <small>${lesson.workedExample.english}</small>`;
        document.getElementById("situationLead").textContent = lesson.workedExample.intro;
        document.getElementById("conceptTitle").textContent = lesson.conceptTitle;
        const conceptVisual = document.getElementById("conceptVisual");
        const conceptDiagram = document.getElementById("conceptDiagram");
        const conceptOverview = document.getElementById("conceptOverview");
        const hasPointerLab = lesson.id === "d01";
        conceptVisual.innerHTML = hasPointerLab ? pointerConceptLabMarkup() : lesson.visual;
        conceptDiagram.innerHTML = "";
        const diagram = conceptVisual.querySelector(".system-visual");
        if (diagram) {
            conceptDiagram.innerHTML = `<div class="section-divider"><span>${lesson.parts?.length ? "본체 내부의 부품 위치" : "구조도"}</span><small>${lesson.parts?.length ? "Component Locations" : "Structure Diagram"}</small></div>`;
            conceptDiagram.appendChild(diagram);
        }
        const partsMount = document.getElementById("conceptParts");
        if (lesson.parts?.length) {
            partsMount.innerHTML = `
                <section class="component-inspector" aria-labelledby="componentInspectorTitle">
                    <div class="explanation-heading">
                        <span>본체 위치와 부품 확대 <small>Inside the Case and Component Close-ups</small></span>
                        <h2 id="componentInspectorTitle">전체 위치에서 부품 하나까지 이어서 보기</h2>
                        <p>본체 사진의 번호나 아래 부품 단추를 누르세요. 같은 선택이 확대 사진과 설명에 이어집니다.</p>
                    </div>
                    <div class="component-inspector-stage">
                        <div class="component-cutaway-mount" data-component-cutaway></div>
                        <div class="component-browser">
                            <div class="component-tabs" role="tablist" aria-label="자세히 볼 컴퓨터 부품">
                                ${lesson.parts.map((part, index) => `
                                    <button id="componentTab${index}" type="button" role="tab" data-part-index="${index}" aria-controls="componentPartPanel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">
                                        <img src="${part.image}" width="768" height="768" alt="">
                                        <span><strong>${part.short}</strong><small>${part.korean}</small></span>
                                    </button>
                                `).join("")}
                            </div>
                            <article id="componentPartPanel" class="component-detail-card" role="tabpanel" aria-live="polite"></article>
                        </div>
                    </div>
                </section>
            `;
            const cutawayMount = partsMount.querySelector("[data-component-cutaway]");
            if (diagram && cutawayMount) {
                cutawayMount.appendChild(diagram);
                conceptDiagram.replaceChildren();
            }
            const partButtons = [...partsMount.querySelectorAll("[data-part-index]")];
            const cutawayButtons = [...partsMount.querySelectorAll("[data-cutaway-part-index]")];
            const partPanel = document.getElementById("componentPartPanel");
            const showPart = (index, reveal = false) => {
                const part = lesson.parts[index];
                partButtons.forEach((button, buttonIndex) => {
                    button.setAttribute("aria-selected", String(buttonIndex === index));
                    button.tabIndex = buttonIndex === index ? 0 : -1;
                });
                cutawayButtons.forEach((button) => {
                    const selected = Number(button.dataset.cutawayPartIndex) === index;
                    button.setAttribute("aria-pressed", String(selected));
                    button.classList.toggle("is-selected", selected);
                });
                partPanel.setAttribute("aria-labelledby", `componentTab${index}`);
                partPanel.innerHTML = `
                    <figure>
                        <img src="${part.image}" width="768" height="768" alt="${part.alt}">
                        <figcaption>실물의 대표적인 형태입니다. 제품에 따라 크기·색·덮개 모양은 달라질 수 있습니다.</figcaption>
                    </figure>
                    <div class="component-copy">
                        <header><span>${part.short}</span><h3>${part.full}<small>${part.korean}</small></h3></header>
                        <section class="term-origin"><strong>명칭과 어원 <small>Name and Origin</small></strong><p>${part.origin}</p></section>
                        <dl>
                            <div><dt>생김새 <small>What It Looks Like</small></dt><dd>${part.look}</dd></div>
                            <div><dt>맡은 일 <small>What It Does</small></dt><dd>${part.job}</dd></div>
                            <div><dt>연결 방식 <small>How It Connects</small></dt><dd>${part.connection}</dd></div>
                            <div class="misconception"><dt>구별할 점 <small>Distinction</small></dt><dd>${part.misconception}</dd></div>
                        </dl>
                    </div>
                `;
                if (reveal && window.matchMedia("(max-width: 520px)").matches) {
                    requestAnimationFrame(() => {
                        partButtons[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                        partPanel.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                }
            };
            partButtons.forEach((button, index) => {
                button.addEventListener("click", () => showPart(index, true));
                button.addEventListener("keydown", (event) => {
                    const directions = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
                    if (!(event.key in directions)) return;
                    event.preventDefault();
                    const next = (index + directions[event.key] + partButtons.length) % partButtons.length;
                    showPart(next);
                    partButtons[next].focus();
                });
            });
            cutawayButtons.forEach((button) => {
                button.addEventListener("click", () => showPart(Number(button.dataset.cutawayPartIndex), true));
            });
            showPart(0);
        } else {
            partsMount.innerHTML = "";
        }
        const details = document.getElementById("conceptDetails");
        details.innerHTML = hasPointerLab ? "" : lesson.details.map((detail, index) => `
            <article><span class="concept-number">${index + 1}</span><h3>${detail[0]} <small>${detail[1]}</small></h3><p>${detail[2]}</p></article>
        `).join("");
        conceptOverview.classList.toggle("has-pointer-lab", hasPointerLab);
        conceptOverview.classList.toggle("has-stack-lab", lesson.id === "h04");
        const hasFoundationLab = ["a01", "a02", "a03", "a04", "a05"].includes(lesson.id);
        const hasPremiumVisual = hasFoundationLab || Boolean(window.COMPUTER_PREMIUM_VISUAL_IDS?.includes(lesson.id));
        conceptOverview.classList.toggle("has-premium-visual", hasPremiumVisual);
        conceptOverview.hidden = Boolean(lesson.parts?.length);
        const conceptGlossary = document.getElementById("conceptGlossary");
        conceptGlossary.hidden = hasPointerLab || !lesson.details?.length;
        conceptGlossary.open = !(hasPremiumVisual || hasPointerLab || lesson.id === "h04" || lesson.parts?.length);
        if (hasPointerLab) setupPointerConceptLab();
        if (lesson.id === "a01") setupA01SignalLab();
        if (lesson.id === "a02") setupA02CooperationLab();
        if (lesson.id === "a03") setupA03CompatibilityLab();
        if (lesson.id === "a04") setupA04ConversionLab();
        if (lesson.id === "a05") setupA05DigitizerLab();
        setupConceptSequences();
        setupFullStackLab();
        window.COMPUTER_SETUP_CONCEPT_LABS?.();
        const devicesMount = document.getElementById("conceptDevices");
        const deviceComparison = lesson.deviceComparison;
        if (deviceComparison?.cards?.length) {
            devicesMount.innerHTML = `
                <details class="device-comparison-disclosure">
                    <summary>
                        <span>기기별 구조 비교 <small>Device Structure Comparison</small></span>
                        <strong>PC·Chromebook·태블릿·스마트폰</strong>
                    </summary>
                <section class="device-comparison" aria-labelledby="deviceComparisonTitle">
                    <div class="explanation-heading compact">
                        <span>기기별 구조 비교 <small>Device Structure Comparison</small></span>
                        <h2 id="deviceComparisonTitle">${deviceComparison.title} <small>${deviceComparison.english}</small></h2>
                        <p>${deviceComparison.intro}</p>
                    </div>
                    <div class="device-comparison-grid">
                        ${deviceComparison.cards.map((card) => `
                            <article>
                                <figure><img src="${card.image}" width="768" height="512" alt="${card.alt}"></figure>
                                <div class="device-card-copy">
                                    <h3>${card.title} <small>${card.english}</small></h3>
                                    <p class="device-relation">${card.relation}</p>
                                    <p>${card.note}</p>
                                </div>
                            </article>
                        `).join("")}
                    </div>
                    <p class="representative-note"><strong>대표적인 구조</strong> 제품과 세대에 따라 부품의 위치·크기·결합 방식은 달라질 수 있습니다. 배터리가 있는 기기는 직접 분해하지 않고 시각 자료로 관찰합니다.</p>
                </section>
                </details>
            `;
        } else {
            devicesMount.innerHTML = "";
        }
        const story = lesson.workedExample;
        document.getElementById("conceptStory").innerHTML = `
            <section class="worked-example" aria-labelledby="workedExampleTitle">
                <div class="explanation-heading">
                    <span>동작 순서 <small>Operation Sequence</small></span>
                    <h2 id="workedExampleTitle">${story.title} <small>${story.english}</small></h2>
                    <p>${story.intro}</p>
                </div>
                <ol class="story-steps ${story.steps.length <= 4 ? "is-linear-row" : ""}" style="--story-columns:${story.steps.length === 4 ? 4 : 3}" data-step-count="${story.steps.length}">
                    ${story.steps.map((step, index) => `
                        <li>
                            <span class="story-number">${index + 1}</span>
                            <div><strong>${step[0]} <small>${step[1]}</small></strong><p>${step[2]}</p></div>
                        </li>
                    `).join("")}
                </ol>
            </section>
        `;

        const comparison = lesson.comparisons;
        document.getElementById("conceptCompare").innerHTML = `
            <section class="concept-comparison" aria-labelledby="comparisonTitle">
                <div class="explanation-heading compact">
                    <span>개념 비교 <small>Concept Comparison</small></span>
                    <h2 id="comparisonTitle">${comparison.title} <small>${comparison.english}</small></h2>
                </div>
                <div class="comparison-grid">
                    ${comparison.cards.map((card) => `
                        <article>
                            <h3>${card[0]} <small>${card[1]}</small></h3>
                            <p>${card[2]}</p>
                            ${card[3] ? `<dl><dt>구체적인 예 <small>Concrete Examples</small></dt><dd>${card[3]}</dd></dl>` : ""}
                        </article>
                    `).join("")}
                </div>
            </section>
        `;

        const analogy = lesson.analogy;
        document.getElementById("conceptAnalogy").innerHTML = `
            <section class="analogy-panel" aria-labelledby="analogyTitle">
                <div class="analogy-main">
                    <span class="analogy-label">비유 <small>Analogy</small></span>
                    <h2 id="analogyTitle">${analogy.title} <small>${analogy.english}</small></h2>
                    <p>${analogy.text}</p>
                </div>
                <aside class="analogy-limit">
                    <strong>비유가 실제와 다른 점 <small>Where the Analogy Stops</small></strong>
                    <p>${analogy.limit}</p>
                </aside>
                <div class="teachback"><strong>설명 문제 <small>Explanation Question</small></strong><p>${analogy.teachback}</p></div>
            </section>
        `;
        document.getElementById("activityTitle").textContent = lesson.activity.title;
        document.getElementById("activityInstruction").textContent = lesson.activity.instruction;
        const hasStandaloneActivity = lesson.activity.type !== "sort";
        document.getElementById("startActivity").innerHTML = hasStandaloneActivity
            ? "실험 시작 <small>Start Experiment</small>"
            : "문제 풀기 <small>Start Questions</small>";
        stepStatus.textContent = hasStandaloneActivity ? "장면·원리 1 / 3" : "장면·원리 1 / 2";
        renderStaticCanvases();
        renderLessonList();
        const back = document.querySelector(".back-button");
        back.href = lessonIndex === 0 ? portalHref : lessonHref(lessons[lessonIndex - 1].id);
        back.setAttribute("aria-label", lessonIndex === 0 ? "포털 메인으로 돌아가기" : "이전 차시로 돌아가기");
        document.getElementById("scoreTotal").textContent = `/ ${lesson.questions.length}`;
    }

    function renderLessonList() {
        const list = document.getElementById("lessonList");
        const modules = window.COMPUTER_CORE_MODULES || [];
        const completed = new Set();
        lessons.forEach((item) => {
            try {
                if (JSON.parse(localStorage.getItem(`computer-literacy:${item.id}`) || "null")?.completed) completed.add(item.id);
            } catch (_) { /* Ignore damaged local progress. */ }
        });
        list.innerHTML = modules.map((module) => {
            const items = lessons.filter((item) => item.id[0].toUpperCase() === module.code);
            const done = items.filter((item) => completed.has(item.id)).length;
            const currentModule = lesson.id[0].toUpperCase() === module.code;
            const links = items.map((item) => {
                const current = item.id === lesson.id;
                const complete = completed.has(item.id);
                return `<li class="${current ? "is-current" : ""} ${complete ? "is-complete" : ""}"><a href="${lessonHref(item.id)}" ${current ? 'aria-current="page"' : ""}><span>${item.code || item.id.toUpperCase()}</span><strong>${item.title}</strong><small>${item.english}</small></a></li>`;
            }).join("");
            return `<details class="course-module" ${currentModule ? "open" : ""}><summary><span><b>${module.code}</b><strong>${module.title}</strong><small>${module.english}</small></span><em>${done} / ${items.length}</em></summary><ol class="course-list lesson-link-list">${links}</ol></details>`;
        }).join("");
    }

    function resetActivity() {
        activityPassed = false;
        activityState = {};
        selectedItem = null;
        activityFeedback.textContent = "";
        activityFeedback.className = "feedback";
        checkActivity.hidden = false;
        checkActivity.innerHTML = "확인 <small>Check</small>";
        checkActivity.disabled = lesson.activity.type !== "sort";
        if (lesson.activity.type === "sort") renderSortActivity();
        if (lesson.activity.type === "analog") renderAnalogActivity();
        if (lesson.activity.type === "sampling") renderSamplingActivity();
    }

    function cardMarkup(item) {
        return `${item.label}<small>${item.english}</small>`;
    }

    function renderSortActivity() {
        const activity = lesson.activity;
        activityMount.innerHTML = `
            <div class="drag-explanation">
                <span><b>드래그</b> 누른 채 움직이기</span><span><b>드롭</b> 알맞은 칸에서 놓기</span><span>탭 방식: 카드와 분류 칸을 차례로 누르기</span>
            </div>
            <div class="sort-zone-grid" style="--zone-count:${activity.categories.length}">
                ${activity.categories.map((category) => `<section class="drop-zone" data-category="${category.id}" tabindex="0" role="button" aria-label="${category.label} 분류 칸"><h3>${category.label}<small>${category.english}</small></h3><div class="zone-items"></div></section>`).join("")}
            </div>
            <div class="sort-bank" data-category="" aria-label="분류할 카드"></div>`;
        activity.items.forEach((item) => {
            const category = activityState[item.id] || "";
            const target = category ? activityMount.querySelector(`[data-category="${category}"] .zone-items`) : activityMount.querySelector(".sort-bank");
            const button = document.createElement("button");
            button.type = "button";
            button.className = "sort-card";
            button.dataset.item = item.id;
            button.classList.toggle("is-selected", selectedItem === item.id);
            button.setAttribute("aria-pressed", String(selectedItem === item.id));
            button.innerHTML = cardMarkup(item);
            target.append(button);
        });
        checkActivity.disabled = Object.keys(activityState).length !== activity.items.length;
    }

    function assignItem(itemId, category) {
        if (category) activityState[itemId] = category;
        else delete activityState[itemId];
        selectedItem = null;
        activityFeedback.textContent = "";
        activityFeedback.className = "feedback";
        renderSortActivity();
    }

    function beginDrag(event, itemId, sourceElement) {
        if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
        dragState = { pointerId: event.pointerId, itemId, sourceElement, startX: event.clientX, startY: event.clientY, dragging: false, ghost: null };
        sourceElement.setPointerCapture?.(event.pointerId);
    }

    function dropTargetAt(x, y) {
        activityMount.querySelectorAll(".drop-zone").forEach((zone) => zone.classList.remove("is-drop-target"));
        const element = document.elementFromPoint(x, y);
        const target = element ? element.closest(".drop-zone, .sort-bank") : null;
        if (target?.classList.contains("drop-zone")) target.classList.add("is-drop-target");
        return target;
    }

    function moveDrag(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        if (!dragState.dragging && Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY) < 7) return;
        event.preventDefault();
        if (!dragState.dragging) {
            const item = lesson.activity.items.find((entry) => entry.id === dragState.itemId);
            const ghost = document.createElement("div");
            ghost.className = "lesson-drag-ghost";
            ghost.setAttribute("aria-hidden", "true");
            ghost.innerHTML = cardMarkup(item);
            document.body.append(ghost);
            dragState.ghost = ghost;
            dragState.dragging = true;
            dragState.sourceElement.classList.add("is-dragging");
        }
        dragState.ghost.style.left = `${event.clientX}px`;
        dragState.ghost.style.top = `${event.clientY}px`;
        dropTargetAt(event.clientX, event.clientY);
    }

    function endDrag(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        const finished = dragState;
        dragState = null;
        try { finished.sourceElement.releasePointerCapture?.(event.pointerId); } catch (_) { /* capture may already be released */ }
        if (!finished.dragging) return;
        event.preventDefault();
        const target = event.type === "pointercancel" ? null : dropTargetAt(event.clientX, event.clientY);
        finished.ghost?.remove();
        finished.sourceElement.classList.remove("is-dragging");
        activityMount.querySelectorAll(".drop-zone").forEach((zone) => zone.classList.remove("is-drop-target"));
        suppressClickUntil = performance.now() + 300;
        if (target) assignItem(finished.itemId, target.dataset.category || "");
    }

    activityMount.addEventListener("pointerdown", (event) => {
        const card = event.target.closest(".sort-card");
        if (card) beginDrag(event, card.dataset.item, card);
    });
    document.addEventListener("pointermove", moveDrag, { passive: false });
    document.addEventListener("pointerup", endDrag);
    document.addEventListener("pointercancel", endDrag);

    activityMount.addEventListener("click", (event) => {
        if (performance.now() < suppressClickUntil || lesson.activity.type !== "sort") return;
        const card = event.target.closest(".sort-card");
        if (card) {
            selectedItem = selectedItem === card.dataset.item ? null : card.dataset.item;
            renderSortActivity();
            return;
        }
        const zone = event.target.closest(".drop-zone, .sort-bank");
        if (zone && selectedItem) assignItem(selectedItem, zone.dataset.category || "");
    });

    activityMount.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && selectedItem) {
            const zone = event.target.closest(".drop-zone");
            if (zone) {
                event.preventDefault();
                assignItem(selectedItem, zone.dataset.category);
            }
        }
    });

    function renderAnalogActivity() {
        activityState = { records: [], pairFound: false };
        activityMount.innerHTML = a04ConversionMarkup("activity");
        setupA04ConversionLab(activityMount.querySelector('[data-a04-lab="activity"]'), {
            onState(snapshot) {
                activityState.records = snapshot.records;
                activityState.pairFound = snapshot.pairFound;
                checkActivity.disabled = snapshot.records.length < 2;
            }
        });
    }

    function renderSamplingActivity() {
        activityState = { rateCompared: false, bitsCompared: false };
        activityMount.innerHTML = a05DigitizerMarkup("activity");
        setupA05DigitizerLab(activityMount.querySelector('[data-a05-lab="activity"]'), {
            onState(snapshot) {
                activityState.rateCompared = snapshot.rateCompared;
                activityState.bitsCompared = snapshot.bitsCompared;
                checkActivity.disabled = !(snapshot.rateCompared && snapshot.bitsCompared);
            }
        });
    }

    function drawWave(canvas, sampleCount) {
        if (!canvas) return;
        const ratio = Math.max(1, window.devicePixelRatio || 1);
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(320, Math.round(rect.width || 600));
        const height = Math.max(160, Math.round(rect.height || 190));
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        const context = canvas.getContext("2d");
        context.scale(ratio, ratio);
        context.clearRect(0, 0, width, height);
        context.strokeStyle = "#d7c6a9";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(16, height / 2);
        context.lineTo(width - 16, height / 2);
        context.stroke();
        const valueAt = (fraction) => Math.sin(fraction * Math.PI * 4) * 0.58 + Math.sin(fraction * Math.PI * 10) * 0.16;
        context.strokeStyle = "#8d6a3b";
        context.lineWidth = 3;
        context.beginPath();
        for (let index = 0; index <= 240; index += 1) {
            const fraction = index / 240;
            const x = 16 + fraction * (width - 32);
            const y = height / 2 - valueAt(fraction) * (height * 0.38);
            if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.stroke();
        context.strokeStyle = "#0e6670";
        context.fillStyle = "#0e6670";
        context.lineWidth = 2;
        context.beginPath();
        for (let index = 0; index < sampleCount; index += 1) {
            const fraction = sampleCount === 1 ? 0 : index / (sampleCount - 1);
            const x = 16 + fraction * (width - 32);
            const y = height / 2 - valueAt(fraction) * (height * 0.38);
            if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.stroke();
        for (let index = 0; index < sampleCount; index += 1) {
            const fraction = sampleCount === 1 ? 0 : index / (sampleCount - 1);
            const x = 16 + fraction * (width - 32);
            const y = height / 2 - valueAt(fraction) * (height * 0.38);
            context.beginPath();
            context.arc(x, y, 4, 0, Math.PI * 2);
            context.fill();
        }
    }

    function renderStaticCanvases() {
        document.querySelectorAll("canvas[data-samples]").forEach((canvas) => drawWave(canvas, Number(canvas.dataset.samples)));
    }

    function checkCurrentActivity() {
        if (lesson.activity.type === "sort") {
            const wrong = lesson.activity.items.filter((item) => activityState[item.id] !== item.category);
            if (wrong.length) {
                activityFeedback.textContent = `${wrong.map((item) => item.label).join("·")} 카드가 놓인 칸의 이름과 실제 역할을 다시 비교하세요.`;
                activityFeedback.className = "feedback is-wrong";
                return;
            }
        }
        if (lesson.activity.type === "analog") {
            const [first, second] = activityState.records;
            if (!first || !second || first.raw === second.raw || first.digital !== second.digital) {
                activityFeedback.textContent = "실제 온도는 서로 다르면서 0.5°C 단위 표시값은 같은 두 값을 찾아 기록하세요.";
                activityFeedback.className = "feedback is-wrong";
                return;
            }
        }
        if (lesson.activity.type === "sampling" && !(activityState.rateCompared && activityState.bitsCompared)) {
            activityFeedback.textContent = "샘플링 레이트만 바꾼 비교와 비트 깊이만 바꾼 비교를 하나씩 완료하세요.";
            activityFeedback.className = "feedback is-wrong";
            return;
        }
        activityPassed = true;
        activityFeedback.textContent = lesson.activity.success;
        activityFeedback.className = "feedback is-correct";
        checkActivity.innerHTML = "문제 풀기 <small>Continue to Questions</small>";
    }

    const beginActivity = () => {
        if (lesson.activity.type === "sort") {
            resetQuiz();
            showStage("quiz", "문제 풀이 2 / 2");
            focusFirstQuizOption();
            return;
        }
        resetActivity();
        showStage("activity", "직접 조작 2 / 3");
        focusStageHeading("activity");
    };
    document.getElementById("startActivity").addEventListener("click", beginActivity);
    document.getElementById("resetActivity").addEventListener("click", resetActivity);
    checkActivity.addEventListener("click", () => {
        if (!activityPassed) {
            checkCurrentActivity();
            return;
        }
        resetQuiz();
        showStage("quiz", "문제 풀이 3 / 3");
        focusFirstQuizOption();
    });

    let questionIndex = 0;
    let selectedOption = -1;
    let score = 0;
    let results = [];
    let questionHadWrong = false;
    const quizCount = document.getElementById("quizCount");
    const questionText = document.getElementById("questionText");
    const questionOptions = document.getElementById("questionOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const submitAnswer = document.getElementById("submitAnswer");
    const nextQuestion = document.getElementById("nextQuestion");

    function focusFirstQuizOption() {
        const firstAvailable = questionOptions.querySelector("button:not(:disabled)");
        if (firstAvailable) firstAvailable.focus();
    }

    function resetQuiz() {
        questionIndex = 0;
        selectedOption = -1;
        score = 0;
        results = [];
        renderQuestion();
    }

    function renderQuestion() {
        const question = lesson.questions[questionIndex];
        selectedOption = -1;
        questionHadWrong = false;
        quizCount.textContent = `문제 ${questionIndex + 1} / ${lesson.questions.length}`;
        questionText.textContent = question.text;
        questionOptions.replaceChildren();
        const presentedOptions = question.options.map((text, originalIndex) => ({ text, originalIndex }));
        for (let index = presentedOptions.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [presentedOptions[index], presentedOptions[swapIndex]] = [presentedOptions[swapIndex], presentedOptions[index]];
        }
        presentedOptions.forEach((option, displayIndex) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "option-button";
            button.dataset.optionIndex = String(option.originalIndex);
            button.textContent = `${displayIndex + 1}. ${option.text}`;
            button.setAttribute("aria-pressed", "false");
            button.addEventListener("click", () => {
                if (submitAnswer.hidden) return;
                selectedOption = option.originalIndex;
                [...questionOptions.children].forEach((entry, entryIndex) => entry.setAttribute("aria-pressed", String(entryIndex === displayIndex)));
                submitAnswer.disabled = false;
            });
            questionOptions.append(button);
        });
        quizFeedback.textContent = "";
        quizFeedback.className = "feedback quiz-feedback";
        submitAnswer.hidden = false;
        submitAnswer.disabled = true;
        nextQuestion.hidden = true;
    }

    submitAnswer.addEventListener("click", () => {
        const question = lesson.questions[questionIndex];
        const correct = selectedOption === question.answer;
        const buttons = [...questionOptions.children];
        const chosenButton = buttons.find((button) => Number(button.dataset.optionIndex) === selectedOption);
        if (!correct) {
            questionHadWrong = true;
            chosenButton.disabled = true;
            chosenButton.classList.add("is-selected-wrong");
            chosenButton.setAttribute("aria-pressed", "false");
            selectedOption = -1;
            submitAnswer.disabled = true;
            quizFeedback.textContent = "선택한 답을 제외했습니다. 문제에 나온 수치·순서·현재 상태와 남은 설명을 하나씩 다시 대조하세요.";
            quizFeedback.className = "feedback quiz-feedback is-wrong";
            focusFirstQuizOption();
            return;
        }
        if (!questionHadWrong) score += 1;
        results.push({ correct: !questionHadWrong, concept: question.concept, explanation: question.explanation });
        buttons.forEach((button) => {
            button.disabled = true;
            if (Number(button.dataset.optionIndex) === question.answer) button.classList.add("is-answer");
        });
        quizFeedback.textContent = question.explanation;
        quizFeedback.className = "feedback quiz-feedback is-correct";
        submitAnswer.hidden = true;
        nextQuestion.hidden = false;
        nextQuestion.innerHTML = questionIndex === lesson.questions.length - 1
            ? "결과 확인 <small>View Results</small>"
            : "다음 문제 <small>Next Question</small>";
        nextQuestion.focus();
    });

    nextQuestion.addEventListener("click", () => {
        questionIndex += 1;
        if (questionIndex < lesson.questions.length) {
            renderQuestion();
            focusFirstQuizOption();
        }
        else showResult();
    });

    function showResult() {
        document.getElementById("scoreNumber").textContent = String(score);
        const passed = score >= Math.ceil(lesson.questions.length * 0.8);
        document.getElementById("resultMessage").textContent = passed ? "그림과 상황을 근거로 이번 차시의 개념을 적용했습니다." : "틀린 문제의 설명을 확인하고 개념 사이의 관계를 다시 적용해 보세요.";
        const reviewList = document.getElementById("reviewList");
        reviewList.replaceChildren();
        results.filter((result) => !result.correct).forEach((result) => {
            const item = document.createElement("div");
            item.className = "review-item";
            item.innerHTML = `<strong>${result.concept}</strong><br>${result.explanation}`;
            reviewList.append(item);
        });
        if (passed) {
            try { localStorage.setItem(`computer-literacy:${lesson.id}`, JSON.stringify({ completed: true, score, updatedAt: new Date().toISOString() })); } catch (_) { /* local progress may be blocked */ }
        }
        const nextLink = document.getElementById("nextLesson");
        if (lessonIndex < lessons.length - 1) {
            nextLink.href = lessonHref(lessons[lessonIndex + 1].id);
            nextLink.innerHTML = "다음 차시 <small>Next Lesson</small>";
        } else {
            nextLink.href = lessonHref("a01");
            nextLink.innerHTML = "첫 차시로 돌아가기 <small>Back to First Lesson</small>";
        }
        showStage("result", "차시 완료");
        focusStageHeading("result");
    }

    document.getElementById("retryQuiz").addEventListener("click", () => {
        resetQuiz();
        showStage("quiz", lesson.activity.type === "sort" ? "문제 풀이 2 / 2" : "문제 풀이 3 / 3");
        focusFirstQuizOption();
    });

    const courseDialog = document.getElementById("courseDialog");
    function openCourse() {
        if (typeof courseDialog.showModal === "function") courseDialog.showModal();
        else courseDialog.setAttribute("open", "");
    }
    document.getElementById("openCourse").addEventListener("click", openCourse);
    document.getElementById("closeCourse").addEventListener("click", () => courseDialog.close());
    courseDialog.addEventListener("click", (event) => { if (event.target === courseDialog) courseDialog.close(); });
    window.addEventListener("resize", renderStaticCanvases);

    renderLesson();
})();
