(() => {
    "use strict";

    const lessons = [
        {
            id: "a02",
            number: 2,
            title: "하드웨어와 소프트웨어는 어떻게 다를까?",
            english: "Hardware and Software",
            conceptTitle: "물리적인 장치와 실행되는 명령",
            visual: `
                <div class="system-visual hardware-software-visual" aria-label="소프트웨어의 명령을 하드웨어가 실행하는 관계 그림">
                    <section class="visual-panel">
                        <h3>하드웨어 <small>Hardware</small></h3>
                        <div class="part-grid">
                            <span class="part-chip">CPU<small>계산 장치</small></span>
                            <span class="part-chip">RAM<small>작업 공간</small></span>
                            <span class="part-chip">디스플레이<small>Display</small></span>
                            <span class="part-chip">키보드<small>Keyboard</small></span>
                        </div>
                    </section>
                    <div class="execution-arrow" aria-hidden="true">←<small>명령을<br>실행</small></div>
                    <section class="visual-panel">
                        <h3>소프트웨어 <small>Software</small></h3>
                        <div class="part-grid">
                            <span class="software-card">운영체제<small>Operating System</small></span>
                            <span class="software-card">그림 앱<small>Drawing App</small></span>
                            <span class="software-card">웹 브라우저<small>Web Browser</small></span>
                            <span class="software-card">장치 드라이버<small>Device Driver</small></span>
                        </div>
                    </section>
                </div>`,
            details: [
                ["하드웨어", "Hardware", "손으로 만질 수 있는 물리적인 장치입니다. CPU·RAM처럼 본체 안에 있는 부품과 키보드·화면처럼 밖에서 보이는 장치가 모두 포함됩니다."],
                ["소프트웨어", "Software", "하드웨어가 어떤 일을 할지 정한 명령과 데이터입니다. 저장 장치에 기록되어 있다가 실행할 때 RAM으로 불려 오고 CPU가 명령을 처리합니다."],
                ["둘의 관계", "How They Work Together", "그림 앱만 있어도 화면과 CPU가 없으면 실행할 수 없고, 하드웨어만 있어도 실행할 소프트웨어가 없으면 원하는 작업을 지시할 수 없습니다."],
                ["경계가 헷갈리는 사례", "A Useful Boundary", "프린터 본체는 하드웨어이고 프린터 드라이버는 소프트웨어입니다. 같은 기능에 함께 쓰여도 물리 장치와 명령은 구별됩니다."]
            ],
            activity: {
                type: "sort",
                title: "장치와 프로그램 분류하기",
                instruction: "각 카드가 물리적인 장치인지, 저장되어 실행되는 명령인지 근거를 생각한 뒤 끌어다 놓으세요.",
                categories: [
                    { id: "hardware", label: "하드웨어", english: "Hardware" },
                    { id: "software", label: "소프트웨어", english: "Software" }
                ],
                items: [
                    { id: "keyboard", label: "키보드", english: "Keyboard", category: "hardware" },
                    { id: "cpu", label: "CPU", english: "Central Processing Unit", category: "hardware" },
                    { id: "monitor", label: "모니터", english: "Monitor", category: "hardware" },
                    { id: "windows", label: "Windows 11", english: "Operating System", category: "software" },
                    { id: "chromeos", label: "ChromeOS", english: "Operating System", category: "software" },
                    { id: "paint", label: "그림 앱", english: "Drawing App", category: "software" }
                ],
                success: "물리적인 부품과 실행되는 명령을 구별했습니다. 하드웨어와 소프트웨어는 서로 필요하지만 같은 종류는 아닙니다."
            },
            questions: [
                {
                    text: "학교 PC의 모니터만 새것으로 바꾸었습니다. 저장되어 있던 문서와 그림 앱은 그대로입니다. 바뀐 대상을 가장 정확하게 설명한 것은 무엇입니까?",
                    options: ["출력 하드웨어가 바뀌었다", "운영체제가 바뀌었다", "문서 파일의 형식이 바뀌었다", "그림 앱의 명령이 바뀌었다"],
                    answer: 0,
                    concept: "하드웨어",
                    explanation: "모니터는 처리 결과를 보여 주는 물리적인 출력 장치입니다. 모니터 교체만으로 저장된 소프트웨어와 파일이 바뀌지는 않습니다."
                },
                {
                    text: "같은 노트북에 ChromeOS 대신 Linux를 설치했습니다. 이 변화를 설명한 것은 무엇입니까?",
                    options: ["CPU를 다른 부품으로 교체했다", "같은 하드웨어에서 운영체제 소프트웨어를 바꿨다", "화면을 입력 장치로 바꿨다", "저장 장치를 RAM으로 바꿨다"],
                    answer: 1,
                    concept: "소프트웨어",
                    explanation: "운영체제는 소프트웨어입니다. 같은 물리 장치에서도 호환되는 다른 운영체제를 설치할 수 있습니다."
                },
                {
                    text: "프린터는 연결되어 있지만 운영체제에 알맞은 장치 드라이버가 없어 인쇄 명령을 전달하지 못합니다. 부족한 것은 어느 쪽입니까?",
                    options: ["종이를 잡아 주는 하드웨어", "프린터 본체의 물리적인 외장", "장치와 운영체제를 연결하는 소프트웨어", "모니터가 보여 주는 픽셀"],
                    answer: 2,
                    concept: "드라이버",
                    explanation: "프린터 본체는 이미 있지만 명령을 번역해 전달할 드라이버 소프트웨어가 없는 상황입니다."
                },
                {
                    text: "태블릿 화면을 손가락으로 눌러 그림을 그렸습니다. 화면과 그림 앱의 역할을 올바르게 연결한 것은 무엇입니까?",
                    options: ["화면과 앱 모두 물리적인 입력 장치다", "화면은 입출력 하드웨어이고 앱은 좌표를 처리하는 소프트웨어다", "화면은 소프트웨어이고 앱은 저장 장치다", "화면과 앱 모두 운영체제다"],
                    answer: 1,
                    concept: "협력 관계",
                    explanation: "터치스크린은 접촉을 입력받고 그림을 출력하는 하드웨어이며, 그림 앱은 좌표와 색을 처리하는 소프트웨어입니다."
                },
                {
                    text: "앱 파일이 저장 장치에 있지만 CPU와 RAM이 고장 난 컴퓨터가 있습니다. 앱을 바로 실행할 수 없는 까닭은 무엇입니까?",
                    options: ["앱은 저장되어 있어도 명령을 불러와 처리할 하드웨어가 필요하기 때문이다", "앱은 저장 장치에 기록되는 순간 스스로 실행 상태가 되기 때문이다", "CPU는 앱을 처음 설치할 때 사용되고 실행할 때는 사용되지 않기 때문이다", "RAM은 실행 중인 명령보다 완성된 파일을 장기간 보관하는 장치이기 때문이다"],
                    answer: 0,
                    concept: "실행",
                    explanation: "저장된 소프트웨어를 실행하려면 명령을 작업 공간으로 불러오고 처리할 RAM과 CPU가 필요합니다."
                }
            ]
        },
        {
            id: "a03",
            number: 3,
            title: "기기·운영체제·앱은 무엇이 다를까?",
            english: "Device, Operating System, and App",
            conceptTitle: "한 화면 안에 겹쳐 있는 세 층",
            visual: `
                <div class="system-visual layer-visual" aria-label="기기 위에서 운영체제가 동작하고 그 위에서 앱이 실행되는 층 구조">
                    <div class="layer-stack">
                        <div class="layer-card app-layer"><strong>앱</strong><span><small>Application / App</small>그림·웹·영상처럼 사용자가 고른 작업</span></div>
                        <div class="layer-card os-layer"><strong>운영체제</strong><span><small>Operating System / OS</small>하드웨어와 앱을 관리하는 기본 소프트웨어</span></div>
                        <div class="layer-card device-layer"><strong>기기</strong><span><small>Device</small>CPU·메모리·화면이 들어 있는 물리적인 제품</span></div>
                    </div>
                    <div class="example-paths">
                        <div class="example-path"><span>iPad</span><span>iPadOS</span><span>Safari</span></div>
                        <div class="example-path"><span>Chromebook</span><span>ChromeOS</span><span>Chrome</span></div>
                        <div class="example-path"><span>PC</span><span>Windows</span><span>그림 앱</span></div>
                        <div class="example-path"><span>스마트폰</span><span>Android</span><span>카메라 앱</span></div>
                    </div>
                </div>`,
            details: [
                ["기기", "Device", "iPad·Chromebook·스마트폰·PC처럼 실제 부품으로 이루어진 제품입니다. 제조사와 제품명은 운영체제 이름과 같지 않을 수 있습니다."],
                ["운영체제", "Operating System / OS", "Windows·Android·iOS·iPadOS·macOS·ChromeOS·Linux처럼 앱 실행, 파일, 화면, 입력 장치와 권한을 관리하는 기본 소프트웨어입니다."],
                ["앱", "Application / App", "브라우저·카메라·문서 편집기처럼 특정 작업을 수행하는 소프트웨어입니다. 같은 앱도 여러 운영체제용 버전이 따로 있을 수 있습니다."],
                ["층 사이의 요청", "Requests Between Layers", "앱은 운영체제에 파일 저장이나 카메라 사용을 요청하고, 운영체제는 드라이버를 통해 하드웨어를 제어합니다."]
            ],
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
                    concept: "세 층",
                    explanation: "Chromebook은 기기, ChromeOS는 기기를 관리하는 운영체제, Chrome은 웹을 여는 앱입니다."
                },
                {
                    text: "iPad의 그림 앱이 사진 보관함을 열려고 하자 접근 허용 창이 나타났습니다. 이 허용을 관리하는 층은 무엇입니까?",
                    options: ["그림 앱이 자신의 접근 범위를 직접 결정한다", "iPadOS 운영체제가 앱별 접근 권한을 관리한다", "iPad 기기가 앱 종류가 달라도 이전에 정한 권한을 그대로 적용한다", "사진 보관함의 첫 번째 파일이 다른 앱의 권한을 정한다"],
                    answer: 1,
                    concept: "운영체제",
                    explanation: "앱의 사진·카메라·마이크 접근 권한은 운영체제가 관리합니다."
                },
                {
                    text: "Android 스마트폰에 설치하려던 앱이 현재 Android 버전을 지원하지 않습니다. 가장 직접적인 관계는 무엇입니까?",
                    options: ["앱과 운영체제의 호환성", "화면 크기와 배터리 색상", "파일 이름과 스피커 크기", "키보드와 카메라 렌즈"],
                    answer: 0,
                    concept: "호환성",
                    explanation: "앱은 특정 운영체제가 제공하는 기능과 규칙에 맞게 만들어지므로 지원 버전이 맞아야 합니다."
                },
                {
                    text: "같은 웹 서비스를 Windows PC에서는 Edge로, iPad에서는 Safari로 열었습니다. 달라진 앱과 운영체제의 조합은 무엇입니까?",
                    options: ["Edge–Windows와 Safari–iPadOS", "Windows–Edge와 iPad–Safari", "PC–Windows와 iPad–iPadOS", "웹사이트–PC와 인터넷–iPad"],
                    answer: 0,
                    concept: "플랫폼",
                    explanation: "Edge와 Safari는 앱이고, Windows와 iPadOS는 각각의 운영체제입니다."
                },
                {
                    text: "카메라 앱이 운영체제에 촬영을 요청했습니다. 그다음 운영체제가 직접 제어해야 할 대상은 무엇입니까?",
                    options: ["카메라 센서 하드웨어", "촬영을 요청한 카메라 앱 자체", "사진을 나중에 열 웹 브라우저 앱", "사진 파일을 볼 사용자의 프로필"],
                    answer: 0,
                    concept: "층 사이 요청",
                    explanation: "운영체제는 앱의 요청을 받아 장치 드라이버를 통해 카메라 센서 같은 하드웨어를 제어합니다."
                }
            ]
        },
        {
            id: "a04",
            number: 4,
            title: "아날로그와 디지털은 무엇이 다를까?",
            english: "Analog and Digital",
            conceptTitle: "이어지는 변화와 정해진 단계의 기록",
            visual: `
                <div class="system-visual analog-visual" aria-label="연속적인 아날로그 변화와 단계별 디지털 기록 비교">
                    <section class="signal-card">
                        <h3>아날로그 <small>Analog</small></h3>
                        <div class="continuous-line" aria-hidden="true"></div>
                        <p>온도·빛·소리처럼 현실에서 매끄럽게 이어지는 변화를 그 변화에 대응하는 연속적인 값으로 나타냅니다.</p>
                    </section>
                    <section class="signal-card digital">
                        <h3>디지털 <small>Digital</small></h3>
                        <div class="step-line" aria-hidden="true"></div>
                        <p>측정한 값을 정해진 단계와 숫자·기호로 기록합니다. 작은 차이는 같은 단계로 기록될 수도 있습니다.</p>
                    </section>
                </div>`,
            details: [
                ["아날로그", "Analog", "값이 중간에서 끊기지 않고 이어집니다. 바늘의 위치, 홈에 새겨진 소리의 흔적처럼 물리량에 대응해 연속적으로 변할 수 있습니다."],
                ["디지털", "Digital", "정해진 단계의 값과 기호로 표현합니다. 숫자 화면이 없어도 디지털 카메라의 파일이나 컴퓨터 내부 데이터는 디지털입니다."],
                ["오래됨과 새로움의 구분이 아님", "Not Old versus New", "현대의 마이크 안에도 아날로그 전기 신호가 생기고, 최신 장비에도 아날로그 회로가 사용됩니다. 두 말은 표현 방식의 차이입니다."],
                ["변환", "Conversion", "센서가 현실의 변화를 측정하고 ADC가 숫자 데이터로 바꿉니다. 스피커는 디지털 데이터를 다시 전기 신호와 공기의 떨림으로 바꿉니다."]
            ],
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
                    concept: "단계 기록",
                    explanation: "실제 값은 달랐지만 0.1°C 단위로 반올림하는 과정에서 같은 표시값이 되었습니다."
                },
                {
                    text: "마이크 진동판이 공기 떨림에 따라 움직이고, 장치가 그 전기 신호를 일정한 간격으로 숫자로 기록했습니다. 앞과 뒤를 올바르게 구분한 것은 무엇입니까?",
                    options: ["진동판의 연속 움직임은 아날로그, 숫자 기록은 디지털", "진동판은 디지털, 숫자 기록은 아날로그", "둘 다 화면에 보이지 않으므로 아날로그", "둘 다 최신 장치 안에 있으므로 디지털"],
                    answer: 0,
                    concept: "변환",
                    explanation: "연속적으로 변하는 물리적 움직임과 전기 신호를 측정해 숫자 단계로 기록하는 과정입니다."
                },
                {
                    text: "바늘식 전압계의 바늘이 2.0V와 2.1V 사이 중간 위치를 가리킵니다. 이 표시가 보여 주는 특징은 무엇입니까?",
                    options: ["정해진 두 숫자 중 하나만 선택한다", "중간 위치를 이용해 이어지는 값을 나타낼 수 있다", "측정값을 파일 확장자로 저장한다", "전압을 0과 1 두 값으로만 표시한다"],
                    answer: 1,
                    concept: "연속값",
                    explanation: "바늘 위치는 눈금 사이에서도 연속적으로 달라질 수 있어 중간값을 나타냅니다."
                },
                {
                    text: "숫자가 적힌 화면이 없는 디지털 카메라가 사진을 메모리 카드의 파일로 저장합니다. 디지털이라고 판단할 근거는 무엇입니까?",
                    options: ["숫자를 보여 주는 화면이 없으므로 디지털 방식으로 볼 수 없다", "사진을 정해진 숫자 데이터와 파일 형식으로 기록한다", "렌즈가 들어온 빛을 JPG 파일로 직접 바꾸므로 별도의 측정 과정이 없다", "전자 부품이 들어 있으면 정보의 기록 방식도 따로 확인할 필요가 없다"],
                    answer: 1,
                    concept: "디지털 데이터",
                    explanation: "디지털 여부는 숫자 화면의 유무가 아니라 정보를 정해진 기호와 숫자 데이터로 표현하는 방식에 달려 있습니다."
                },
                {
                    text: "측정 범위가 같은 두 디지털 센서 중 A는 1°C 단위, B는 0.1°C 단위로 기록합니다. 20.3°C와 20.6°C의 차이를 기록하기에 더 알맞은 센서는 무엇입니까?",
                    options: ["A, 기록 단계가 더 크기 때문이다", "B, 더 작은 단계로 값을 구별할 수 있기 때문이다", "A, 표시 자릿수가 적을수록 작은 차이를 더 세밀하게 구별하기 때문이다", "두 센서는 기록 단계가 달라도 20.3°C와 20.6°C를 같은 값으로 묶기 때문이다"],
                    answer: 1,
                    concept: "분해능",
                    explanation: "0.1°C 단위 센서는 1°C 단위 센서보다 작은 온도 차이를 서로 다른 값으로 기록할 수 있습니다."
                }
            ]
        },
        {
            id: "a05",
            number: 5,
            title: "현실의 소리는 어떻게 숫자 데이터가 될까?",
            english: "From Sound to Digital Data",
            conceptTitle: "이어진 파형에서 측정점을 고르기",
            visual: `
                <div class="system-visual sample-visual" aria-label="소리 파형을 일정한 간격으로 측정해 숫자로 기록하는 과정">
                    <div class="sample-canvas-wrap"><canvas class="sample-canvas" data-samples="8" aria-label="연속 파형 위에 여덟 개의 측정점이 표시된 그래프"></canvas></div>
                    <div class="conversion-chain">
                        <span><b>1</b>&nbsp; 공기의 떨림</span>
                        <span><b>2</b>&nbsp; 마이크 전기 신호</span>
                        <span><b>3</b>&nbsp; 일정 간격 측정</span>
                        <span><b>4</b>&nbsp; 숫자 데이터</span>
                    </div>
                </div>`,
            details: [
                ["샘플링", "Sampling", "이어지는 신호의 값을 일정한 시간 간격으로 측정합니다. 한 번 측정해 얻은 값 하나를 샘플이라고 합니다."],
                ["샘플링 레이트", "Sampling Rate", "1초 동안 몇 번 측정하는지를 나타냅니다. 같은 시간에 더 자주 측정하면 빠른 변화도 더 자세히 기록할 수 있지만 데이터도 많아집니다."],
                ["양자화", "Quantization", "측정한 높이를 컴퓨터가 기록할 수 있는 정해진 숫자 단계에 맞춥니다. 실제 값과 기록값 사이에 작은 차이가 생길 수 있습니다."],
                ["재생", "Playback", "저장된 숫자를 시간 순서대로 읽고 전기 신호로 바꿔 스피커를 움직이면 다시 공기의 떨림인 소리로 들립니다."]
            ],
            activity: {
                type: "sampling",
                title: "측정점 수에 따라 무엇이 달라질까?",
                instruction: "같은 파형을 적은 측정점과 많은 측정점으로 각각 기록하세요. 파형의 봉우리와 골짜기를 어느 쪽이 더 자세히 따라가는지 비교합니다.",
                success: "같은 시간 동안 측정점이 많아지면 파형의 빠른 변화를 더 자세히 기록하지만 저장해야 할 숫자도 많아짐을 확인했습니다."
            },
            questions: [
                {
                    text: "같은 1초의 소리를 A는 8번, B는 32번 같은 간격으로 측정했습니다. 빠르게 변하는 구간의 모양을 더 자세히 기록할 가능성이 큰 것은 무엇입니까?",
                    options: ["A, 측정 사이 간격이 더 넓기 때문이다", "B, 같은 시간에 더 많은 지점을 측정했기 때문이다", "A, 만들어지는 숫자가 더 적기 때문이다", "B, 측정 횟수가 늘어나면 측정점 사이의 시간 간격도 더 넓어지기 때문이다"],
                    answer: 1,
                    concept: "샘플링 레이트",
                    explanation: "같은 시간에 더 자주 측정하면 측정점 사이에서 놓치는 빠른 변화가 줄어듭니다."
                },
                {
                    text: "파형 높이 0.63을 0.1 단위로만 기록하는 장치가 0.6으로 저장했습니다. 이때 일어난 일은 무엇입니까?",
                    options: ["1초 동안 측정하는 횟수를 늘려 샘플링 레이트를 바꾸었다", "측정값을 가까운 숫자 단계에 맞춰 양자화했다", "연속 신호의 크기를 키워 원래 값 자체를 0.6으로 바꾸었다", "저장된 숫자를 전기 신호로 되돌리는 재생 변환을 했다"],
                    answer: 1,
                    concept: "양자화",
                    explanation: "측정값을 정해진 숫자 단계에 맞추는 과정을 양자화라고 합니다."
                },
                {
                    text: "마이크가 만든 전기 신호가 아직 시간에 따라 매끄럽게 변하고 있습니다. 숫자 배열로 저장하기 전에 필요한 과정은 무엇입니까?",
                    options: ["신호를 일정한 간격으로 측정하고 숫자 단계로 기록한다", "연속 신호의 크기만 키운 뒤 그 상태를 숫자 변환 없이 저장한다", "신호를 스피커로 먼저 재생하고 나온 소리를 다시 마이크로 기록한다", "신호에 WAV라는 파일 이름을 붙이면 내용도 숫자로 바뀐다고 본다"],
                    answer: 0,
                    concept: "아날로그-디지털 변환",
                    explanation: "연속 신호를 샘플링하고 양자화해야 컴퓨터가 저장하고 처리할 숫자 데이터가 됩니다."
                },
                {
                    text: "측정 횟수를 네 배로 늘리고 각 측정값의 기록 단계도 더 촘촘하게 했습니다. 일반적으로 예상되는 변화는 무엇입니까?",
                    options: ["기록할 숫자는 줄고 변화는 덜 자세해진다", "기록할 숫자와 정밀도가 늘어 데이터 양도 커질 수 있다", "소리가 더 이상 숫자 데이터가 아니다", "마이크가 출력 장치로 바뀐다"],
                    answer: 1,
                    concept: "정밀도와 데이터 양",
                    explanation: "더 자주, 더 세밀한 단계로 기록하면 정보량과 필요한 저장 공간이 함께 늘어날 수 있습니다."
                },
                {
                    text: "저장된 소리 숫자 데이터를 스피커로 들려줄 때의 흐름으로 알맞은 것은 무엇입니까?",
                    options: ["숫자 데이터→전기 신호→스피커 진동→공기 떨림", "숫자 데이터→화면 픽셀→빛→마이크의 전기 신호", "숫자 데이터→전기 신호→마이크 진동판→공기 떨림", "공기 떨림→마이크 전기 신호→측정→숫자 데이터"],
                    answer: 0,
                    concept: "재생",
                    explanation: "재생할 때는 숫자 데이터를 시간 순서대로 전기 신호로 바꾸고, 스피커가 공기를 떨게 해 소리를 만듭니다."
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
            conceptTitle: "서로 다른 일을 맡은 부품이 한 시스템으로 연결된다",
            visual: `
                <div class="system-visual hardware-cutaway-grid">
                    <figure class="hardware-photo">
                        <picture>
                            <source srcset="../assets/images/desktop-hardware-cutaway-768.webp 768w, ../assets/images/desktop-hardware-cutaway-1448.webp 1448w" sizes="(max-width: 900px) calc(100vw - 60px), 65vw" type="image/webp">
                            <img src="../assets/images/desktop-hardware-cutaway-768.webp" width="768" height="576" alt="열린 데스크톱 본체 안에 메인보드, 금색 CPU, 파란 RAM, 청록색 GPU, 초록색 SSD, 은색 하드 디스크, 전원 공급 장치와 냉각 팬이 연결된 모습">
                        </picture>
                    </figure>
                    <div class="component-legend" aria-label="그림 속 부품 색상 범례">
                        <span class="cpu">CPU<small>명령 해석·계산</small></span>
                        <span class="gpu">GPU<small>많은 계산을 병렬 처리</small></span>
                        <span class="ram">RAM<small>실행 중인 작업 공간</small></span>
                        <span class="storage">SSD·HDD<small>전원이 꺼져도 보관</small></span>
                        <span class="board">메인보드<small>부품 연결·통신</small></span>
                        <span class="power">전원·냉각<small>전력 공급·열 배출</small></span>
                    </div>
                </div>`,
            details: [
                ["CPU", "Central Processing Unit", "프로그램 명령을 해석하고 계산을 수행합니다. 학교 비유에서는 여러 종류의 지시를 판단하는 선생님과 비슷하지만, CPU가 뜻을 스스로 정하는 것은 아닙니다."],
                ["GPU", "Graphics Processing Unit", "그림의 많은 픽셀처럼 비슷한 계산을 동시에 나누어 처리하는 데 강합니다. 미술부원 여러 명이 많은 그림 조각을 함께 계산하는 모습에 비유할 수 있습니다."],
                ["RAM과 저장 장치", "Memory and Storage", "RAM은 지금 펼쳐 둔 자료를 빠르게 쓰는 책상이고 전원이 꺼지면 내용이 사라집니다. SSD·HDD는 파일을 오래 보관하는 사물함에 가깝습니다."],
                ["메인보드·전원·냉각", "Motherboard, Power, and Cooling", "메인보드는 부품이 꽂히고 데이터를 주고받는 길을 제공합니다. 전원 공급 장치는 필요한 전력을 나누고, 팬과 방열판은 생긴 열을 밖으로 보냅니다."]
            ],
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
                    options: ["SSD의 기존 파일은 남고 RAM에 있던 저장 전 변경 내용은 사라질 수 있다", "RAM의 변경 내용은 남고 SSD의 기존 파일은 사라진다", "CPU가 입력 문장을 기억해 두었다가 파일을 다시 만든다", "메인보드가 저장하지 않은 문장을 자동으로 장기 보관한다"],
                    answer: 0,
                    concept: "휘발성과 비휘발성",
                    explanation: "SSD는 전원이 꺼져도 저장된 파일을 보관하지만 RAM에만 있던 변경 내용은 사라질 수 있습니다."
                },
                {
                    text: "CPU·RAM·GPU가 각각 제 역할을 하지만 서로 데이터를 주고받지 못하는 상황입니다. 먼저 확인할 부품과 기능은 무엇입니까?",
                    options: ["메인보드의 슬롯과 데이터 연결", "SSD의 파일 이름", "모니터의 화면 배율", "스피커의 음량 설정"],
                    answer: 0,
                    concept: "메인보드",
                    explanation: "메인보드는 주요 부품이 꽂히고 전기 신호와 데이터를 주고받을 수 있는 연결 기반을 제공합니다."
                },
                {
                    text: "고성능 작업 중 부품 온도가 계속 올라가 CPU가 속도를 낮췄습니다. 성능 저하의 원인과 가장 직접적으로 연결된 장치는 무엇입니까?",
                    options: ["방열판과 냉각 팬", "파일을 보관하는 SSD", "문자를 입력하는 키보드", "웹 주소를 여는 브라우저"],
                    answer: 0,
                    concept: "냉각",
                    explanation: "방열판과 팬이 열을 충분히 내보내지 못하면 부품은 손상을 막기 위해 처리 속도를 낮출 수 있습니다."
                }
            ]
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("lesson");
    const lessonIndex = Math.max(0, lessons.findIndex((item) => item.id === requestedId));
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

    function renderLesson() {
        document.title = `${lesson.title} | 컴퓨터 원리와 활용`;
        document.getElementById("lessonMeta").textContent = `${lesson.number}차시`;
        document.getElementById("lessonTitle").innerHTML = `${lesson.title} <small>${lesson.english}</small>`;
        document.getElementById("conceptTitle").textContent = lesson.conceptTitle;
        document.getElementById("conceptVisual").innerHTML = lesson.visual;
        const details = document.getElementById("conceptDetails");
        details.innerHTML = lesson.details.map((detail, index) => `
            <article><span class="concept-number">${index + 1}</span><h3>${detail[0]} <small>${detail[1]}</small></h3><p>${detail[2]}</p></article>
        `).join("");
        document.getElementById("activityTitle").textContent = lesson.activity.title;
        document.getElementById("activityInstruction").textContent = lesson.activity.instruction;
        renderStaticCanvases();
        renderLessonList();
        const back = document.querySelector(".back-button");
        back.href = lessonIndex === 0 ? "../" : `?lesson=${lessons[lessonIndex - 1].id}`;
        back.setAttribute("aria-label", lessonIndex === 0 ? "1차시로 돌아가기" : "이전 차시로 돌아가기");
    }

    function renderLessonList() {
        const list = document.getElementById("lessonList");
        const entries = [
            { id: "a01", code: "A01", number: 1, title: "컴퓨터는 무슨 일을 할까?", english: "What Does a Computer Do?", href: "../" },
            ...lessons.map((item) => ({ ...item, code: item.code || item.id.toUpperCase(), href: `?lesson=${item.id}` }))
        ];
        list.innerHTML = entries.map((item) => {
            let complete = false;
            try { complete = Boolean(JSON.parse(localStorage.getItem(`computer-literacy:${item.id}`) || "null")?.completed); } catch (_) { complete = false; }
            const current = item.id === lesson.id;
            return `<li class="${current ? "is-current" : ""} ${complete ? "is-complete" : ""}"><a href="${item.href}"><span>${item.code}</span><strong>${item.title}</strong><small>${item.english}</small></a></li>`;
        }).join("");
    }

    function resetActivity() {
        activityPassed = false;
        activityState = {};
        selectedItem = null;
        activityFeedback.textContent = "";
        activityFeedback.className = "feedback";
        checkActivity.hidden = false;
        checkActivity.textContent = "확인";
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

    function digitalTemperature(raw) {
        return Math.round(raw * 2) / 2;
    }

    function renderAnalogActivity() {
        activityState = { records: [null, null], raw: 20 };
        activityMount.innerHTML = `
            <div class="measurement-lab">
                <div class="thermometer-pair">
                    <section class="meter"><strong>바늘 위치</strong><small>Analog indication</small><div class="dial"><i class="dial-needle"></i></div></section>
                    <section class="meter"><strong>숫자 기록</strong><small>Digital reading: 0.5°C step</small><output class="digital-readout">20.0°C</output></section>
                </div>
                <div class="lab-controls">
                    <p class="exact-reading">실제 온도: <output id="exactTemperature">20.0°C</output></p>
                    <label for="temperatureSlider">실제 온도 조절</label>
                    <input id="temperatureSlider" type="range" min="200" max="220" step="1" value="200">
                    <div class="record-grid">
                        <div><button type="button" data-record="0">첫 번째 온도 기록</button><output class="record-value" data-value="0">기록 전</output></div>
                        <div><button type="button" data-record="1">두 번째 온도 기록</button><output class="record-value" data-value="1">기록 전</output></div>
                    </div>
                </div>
            </div>`;
        const slider = document.getElementById("temperatureSlider");
        slider.addEventListener("input", updateTemperature);
        activityMount.querySelectorAll("[data-record]").forEach((button) => button.addEventListener("click", () => {
            const index = Number(button.dataset.record);
            const raw = activityState.raw;
            activityState.records[index] = { raw, digital: digitalTemperature(raw) };
            activityMount.querySelector(`[data-value="${index}"]`).textContent = `실제 ${raw.toFixed(1)}°C → 표시 ${digitalTemperature(raw).toFixed(1)}°C`;
            checkActivity.disabled = activityState.records.some((record) => !record);
        }));
        updateTemperature();
    }

    function updateTemperature() {
        const slider = document.getElementById("temperatureSlider");
        if (!slider) return;
        const raw = Number(slider.value) / 10;
        activityState.raw = raw;
        document.getElementById("exactTemperature").textContent = `${raw.toFixed(1)}°C`;
        activityMount.querySelector(".digital-readout").textContent = `${digitalTemperature(raw).toFixed(1)}°C`;
        const rotation = -70 + ((raw - 20) / 2) * 140;
        activityMount.querySelector(".dial-needle").style.transform = `rotate(${rotation}deg)`;
    }

    function renderSamplingActivity() {
        activityState = { count: 4, low: null, high: null };
        activityMount.innerHTML = `
            <div class="sampling-lab">
                <div class="sample-canvas-wrap"><canvas class="sample-canvas activity-sample-canvas" aria-label="조절한 개수만큼 측정점이 표시되는 파형"></canvas></div>
                <div class="sampling-controls">
                    <label for="sampleSlider">같은 시간 동안의 측정점 수</label>
                    <input id="sampleSlider" type="range" min="4" max="20" step="1" value="4">
                    <output class="sample-count">4개</output>
                    <div class="sample-records">
                        <button type="button" data-sample-record="low">적은 측정점 기록</button><output data-sample-value="low">4~6개일 때 기록하세요.</output>
                        <button type="button" data-sample-record="high">많은 측정점 기록</button><output data-sample-value="high">14~20개일 때 기록하세요.</output>
                    </div>
                </div>
            </div>`;
        const slider = document.getElementById("sampleSlider");
        slider.addEventListener("input", () => {
            activityState.count = Number(slider.value);
            activityMount.querySelector(".sample-count").textContent = `${activityState.count}개`;
            drawWave(activityMount.querySelector(".activity-sample-canvas"), activityState.count);
        });
        activityMount.querySelectorAll("[data-sample-record]").forEach((button) => button.addEventListener("click", () => {
            const key = button.dataset.sampleRecord;
            activityState[key] = activityState.count;
            const message = key === "low" ? (activityState.count <= 6 ? `${activityState.count}개 기록 완료` : "6개 이하로 줄인 뒤 기록하세요.") : (activityState.count >= 14 ? `${activityState.count}개 기록 완료` : "14개 이상으로 늘린 뒤 기록하세요.");
            if ((key === "low" && activityState.count > 6) || (key === "high" && activityState.count < 14)) activityState[key] = null;
            activityMount.querySelector(`[data-sample-value="${key}"]`).textContent = message;
            checkActivity.disabled = !(activityState.low && activityState.high);
        }));
        drawWave(activityMount.querySelector(".activity-sample-canvas"), 4);
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
        if (lesson.activity.type === "sampling" && !(activityState.low <= 6 && activityState.high >= 14)) {
            activityFeedback.textContent = "6개 이하의 기록과 14개 이상의 기록을 하나씩 남겨 비교하세요.";
            activityFeedback.className = "feedback is-wrong";
            return;
        }
        activityPassed = true;
        activityFeedback.textContent = lesson.activity.success;
        activityFeedback.className = "feedback is-correct";
        checkActivity.textContent = "문제 풀기";
    }

    document.getElementById("startActivity").addEventListener("click", () => {
        resetActivity();
        showStage("activity", "직접 조작 2 / 3");
    });
    document.getElementById("resetActivity").addEventListener("click", resetActivity);
    checkActivity.addEventListener("click", () => {
        if (!activityPassed) {
            checkCurrentActivity();
            return;
        }
        resetQuiz();
        showStage("quiz", "문제 풀이 3 / 3");
    });

    let questionIndex = 0;
    let selectedOption = -1;
    let score = 0;
    let results = [];
    const quizCount = document.getElementById("quizCount");
    const questionText = document.getElementById("questionText");
    const questionOptions = document.getElementById("questionOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const submitAnswer = document.getElementById("submitAnswer");
    const nextQuestion = document.getElementById("nextQuestion");

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
        quizCount.textContent = `문제 ${questionIndex + 1} / ${lesson.questions.length}`;
        questionText.textContent = question.text;
        questionOptions.replaceChildren();
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "option-button";
            button.textContent = `${index + 1}. ${option}`;
            button.setAttribute("aria-pressed", "false");
            button.addEventListener("click", () => {
                if (submitAnswer.hidden) return;
                selectedOption = index;
                [...questionOptions.children].forEach((entry, entryIndex) => entry.setAttribute("aria-pressed", String(entryIndex === index)));
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
        if (correct) score += 1;
        results.push({ correct, concept: question.concept, explanation: question.explanation });
        [...questionOptions.children].forEach((button, index) => {
            button.disabled = true;
            if (index === question.answer) button.classList.add("is-answer");
            if (index === selectedOption && !correct) button.classList.add("is-selected-wrong");
        });
        quizFeedback.textContent = question.explanation;
        quizFeedback.className = `feedback quiz-feedback ${correct ? "is-correct" : "is-wrong"}`;
        submitAnswer.hidden = true;
        nextQuestion.hidden = false;
        nextQuestion.textContent = questionIndex === lesson.questions.length - 1 ? "결과 확인" : "다음 문제";
        nextQuestion.focus();
    });

    nextQuestion.addEventListener("click", () => {
        questionIndex += 1;
        if (questionIndex < lesson.questions.length) renderQuestion();
        else showResult();
    });

    function showResult() {
        document.getElementById("scoreNumber").textContent = String(score);
        const passed = score >= 4;
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
            nextLink.href = `?lesson=${lessons[lessonIndex + 1].id}`;
            nextLink.textContent = "다음 차시";
        } else {
            nextLink.href = "../";
            nextLink.textContent = "첫 차시로 돌아가기";
        }
        showStage("result", "차시 완료");
    }

    document.getElementById("retryQuiz").addEventListener("click", () => {
        resetQuiz();
        showStage("quiz", "문제 풀이 3 / 3");
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
