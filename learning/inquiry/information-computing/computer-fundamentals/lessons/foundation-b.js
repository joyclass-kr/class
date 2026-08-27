(() => {
    "use strict";
    const make = window.COMPUTER_LESSON_FACTORY;
    const image = window.COMPUTER_IMAGE_ASSET;
    const lessons = [
        {
            id: "b02", number: 7, domain: "하드웨어와 기기", title: "휴대전화와 태블릿 안에도 컴퓨터가 있을까?", english: "Inside Phones and Tablets", concept: "작은 몸체 안에 계산·기억·통신·전원 부품이 함께 들어 있다",
            nodes: [["SoC", "System on a Chip", "CPU·GPU와 여러 제어 장치를 한 칩에 모은다."], ["RAM·저장 장치", "Memory and Storage", "실행 중인 데이터와 오래 보관할 파일을 서로 다른 곳에 둔다."], ["센서·통신", "Sensors and Radios", "카메라·가속도·GPS·Wi-Fi·이동통신이 주변 정보를 주고받는다."], ["배터리·화면", "Battery and Display", "전력을 공급하고 터치 입력과 화면 출력을 맡는다."]],
            caption: "휴대전화도 입력·처리·출력·저장을 수행하는 컴퓨터입니다. 다만 부품을 작게 합치고 배터리로 작동하도록 설계합니다.",
            deviceComparison: {
                title: "큰 부품이 작은 기기 안에서 어떻게 달라질까?",
                english: "How Components Change Across Devices",
                intro: "같은 처리·작업·저장 역할이 기기의 크기와 전력 조건에 따라 분리되거나 한 칩과 기판에 통합됩니다.",
                cards: [
                    { title: "데스크톱 PC", english: "Desktop PC", image: image("desktop-hardware-cutaway-768.webp"), alt: "CPU, RAM, 그래픽 카드와 저장 장치가 나뉘어 연결된 데스크톱 내부", relation: "CPU · 그래픽 카드 · RAM · SSD/HDD · 전원 공급 장치", note: "큰 슬롯과 케이블로 부품이 나뉘어 교체와 냉각이 비교적 쉽습니다." },
                    { title: "Chromebook", english: "Chromebook", image: image("chromebook-internals-exploded-768.webp"), alt: "화면, 메인 기판, 배터리와 스피커가 분리된 Chromebook형 노트북 내부", relation: "SoC/프로세서 · 기판 부착 RAM · 플래시 저장 · 배터리", note: "키보드와 화면을 포함하면서도 얇게 만들기 위해 여러 부품을 기판에 붙입니다." },
                    { title: "태블릿·iPad", english: "Tablet / iPad", image: image("tablet-internals-exploded-768.webp"), alt: "터치 화면, 큰 배터리, 좁은 로직 보드와 스피커가 분리된 태블릿 내부", relation: "터치 디스플레이 · SoC · RAM · 플래시 저장 · 큰 배터리", note: "넓은 화면과 배터리가 내부 대부분을 차지하고 주요 칩은 좁은 로직 보드에 모입니다." },
                    { title: "스마트폰", english: "Smartphone", image: image("smartphone-internals-exploded-768.webp"), alt: "화면, 배터리, 로직 보드, 카메라와 통신 부품이 층별로 분리된 스마트폰 내부", relation: "SoC · RAM · 플래시 저장 · 카메라 · 모뎀 · 안테나 · 배터리", note: "작은 공간에서 계산·그래픽·통신 기능을 통합하고 센서와 안테나를 함께 배치합니다." }
                ]
            },
            example: ["사진을 찍어 보내는 과정", "From Camera to Message", "카메라 버튼을 누른 뒤 사진이 상대에게 보일 때까지 여러 부품과 소프트웨어가 차례로 협력합니다."],
            steps: [["1", "카메라 센서가 빛을 전기 신호로 바꾼다."], ["2", "SoC가 색과 밝기를 계산하고 RAM에서 작업한다."], ["3", "완성된 사진을 플래시 저장 장치에 파일로 기록한다."], ["4", "통신 칩과 앱이 네트워크로 사진 데이터를 보낸다."]],
            compare: ["기기 안쪽 비교", "Device Interior Comparison"],
            comparisons: [["데스크톱 PC", "Desktop PC", "부품이 크고 분리되어 교체와 냉각이 쉽다."], ["크롬북", "Chromebook", "얇은 본체에 배터리·키보드·화면을 통합한다."], ["아이패드", "iPad", "SoC와 저장 장치를 기판에 붙이고 터치 화면을 쓴다."], ["휴대전화", "Smartphone", "통신·센서까지 작은 본체에 가장 촘촘히 넣는다."]],
            analogy: ["도시가 한 건물에 들어간 모습", "A City in One Building", "PC가 여러 건물로 나뉜 도시라면 SoC는 계산소·그림 작업실·교통 관제실을 한 건물에 모은 모습과 비슷합니다.", "실제 SoC 안의 장치는 복도처럼 이동하지 않고 전기 신호와 회로로 연결됩니다.", "사진 촬영에서 센서, SoC, RAM, 저장 장치가 맡는 일을 순서대로 설명해 보세요."],
            activity: ["휴대기기 부품에 맡기기", "동작 카드를 가장 직접 담당하는 부품 칸으로 드래그하거나, 카드와 칸을 차례로 선택하세요.", [["soc", "SoC", "System on a Chip"], ["memory", "RAM·저장 장치", "Memory and Storage"], ["sensor", "센서·통신", "Sensors and Radios"], ["power", "배터리·화면", "Battery and Display"]], [["b02i1", "앱의 명령을 계산한다", "Compute App Instructions", "soc"], ["b02i2", "실행 중인 화면 데이터를 잠시 둔다", "Hold Active Screen Data", "memory"], ["b02i3", "꺼져도 남을 사진 파일을 기록한다", "Keep a Photo File", "memory"], ["b02i4", "기울어진 방향을 감지한다", "Detect Device Tilt", "sensor"], ["b02i5", "Wi-Fi 신호를 주고받는다", "Send and Receive Wi-Fi", "sensor"], ["b02i6", "부품에 전력을 공급한다", "Supply Electrical Power", "power"], ["b02i7", "터치 위치를 입력받고 픽셀을 보여 준다", "Read Touch and Show Pixels", "power"]], "휴대기기 안에서 각 부품이 맡는 일을 연결했습니다."],
            questions: [
                ["사진 앱을 여러 개 켜자 화면 전환이 느려졌지만 저장된 사진 수는 거의 늘지 않았습니다. 가장 먼저 살펴볼 자원은?", ["실행 중인 데이터를 두는 RAM", "전원이 꺼져도 파일을 보관하는 저장 장치", "위치를 측정하는 GPS 센서", "전력을 공급하는 배터리"], 0, "RAM", "동시에 실행 중인 앱은 RAM 공간을 사용합니다. 저장 파일 수와는 다른 문제입니다."],
                ["휴대전화를 가로로 돌리자 화면 방향이 바뀌었습니다. 이 변화의 시작점은?", ["가속도·회전 센서가 방향 변화를 감지함", "저장 장치가 사진 파일을 다시 씀", "통신 칩이 서버에 방향을 문의함", "배터리가 화면을 회전시킴"], 0, "Sensors", "센서가 기기의 움직임과 방향을 측정하고 운영체제가 화면 배치를 바꿉니다."],
                ["전원을 끈 뒤에도 촬영한 사진이 남아 있는 까닭은?", ["플래시 저장 장치에 파일로 기록했기 때문", "RAM이 전원 없이도 계속 작동하기 때문", "화면 픽셀이 사진을 기억하기 때문", "카메라 렌즈가 빛을 보관하기 때문"], 0, "Storage", "RAM의 작업 내용은 전원과 함께 사라질 수 있지만 저장 장치의 파일은 남습니다."],
                ["데스크톱 CPU와 휴대전화 SoC의 관계를 가장 정확히 설명한 것은?", ["SoC는 CPU 기능을 포함해 여러 기능을 한 칩에 통합한다", "SoC는 사진만 보관하는 저장 장치다", "데스크톱 CPU는 입력 장치이고 SoC는 출력 장치다", "두 이름은 화면 크기만 구분한다"], 0, "SoC", "SoC에는 CPU 코어와 GPU, 통신·영상 처리 장치 등이 함께 들어갈 수 있습니다."],
                ["영상 통화에서 상대 목소리는 들리지만 내 모습이 전송되지 않습니다. 관련성이 가장 높은 부분은?", ["카메라 센서의 입력과 앱의 카메라 권한", "저장 장치의 폴더 이름", "화면 해상도의 가로 픽셀 수", "충전 단자의 모양"], 0, "Input and Permission", "영상 입력에는 카메라 센서와 그 센서를 사용할 수 있는 소프트웨어 권한이 모두 필요합니다."],
                ["같은 작업을 하는 휴대전화와 PC의 공통 원리로 알맞은 것은?", ["입력 데이터를 처리하고 결과를 출력하거나 저장한다", "부품의 크기와 배치가 서로 같다", "전원을 공급하는 방식이 서로 같다", "운영체제와 앱의 종류가 서로 같다"], 0, "Computer System", "겉모양과 부품 배치는 달라도 입력·처리·출력·저장이라는 기본 흐름은 같습니다."]
            ]
        },
        {
            id: "b03", number: 8, domain: "하드웨어와 기기", title: "주변 기기와 단자는 어떻게 연결될까?", english: "Peripherals, Ports, and Connections", concept: "장치의 역할과 연결 규격을 함께 알아야 정확히 연결할 수 있다",
            nodes: [["주변 기기", "Peripheral", "본체 밖에서 입력·출력·저장·통신 기능을 더한다."], ["단자", "Port", "케이블이나 기기를 꽂는 물리적인 연결 부분이다."], ["규격", "Standard", "모양뿐 아니라 전달할 데이터·전력의 약속을 정한다."], ["드라이버", "Device Driver", "운영체제가 하드웨어와 명령을 주고받게 하는 소프트웨어다."]],
            caption: "모양이 맞는 단자, 기능을 지원하는 규격, 장치를 이해하는 드라이버가 함께 맞아야 제대로 작동합니다.",
            example: ["외부 모니터 연결", "Connecting an External Monitor", "USB-C 케이블을 꽂았는데 화면이 나오지 않는 경우에는 연결의 세 층을 차례로 확인합니다."],
            steps: [["1", "모니터와 기기의 단자 모양을 확인한다."], ["2", "케이블과 USB-C 단자가 영상 출력을 지원하는지 확인한다."], ["3", "운영체제가 모니터를 인식했는지 확인한다."], ["4", "디스플레이 설정에서 복제 또는 확장을 선택한다."]],
            compare: ["연결 방법 비교", "Connection Types"],
            comparisons: [["USB", "Universal Serial Bus", "키보드·저장 장치·충전 등 여러 용도에 쓰며 버전과 기능이 다르다."], ["HDMI", "High-Definition Multimedia Interface", "화면과 소리를 모니터나 TV로 보낸다."], ["Bluetooth", "Bluetooth", "가까운 거리에서 마우스·이어폰 등을 무선 연결한다."], ["Wi-Fi", "Wireless Fidelity", "공유기를 통해 같은 네트워크나 인터넷에 연결한다."]],
            analogy: ["통역이 필요한 출입구", "A Doorway That Needs a Translator", "단자는 출입구, 규격은 어떤 짐을 어떤 방식으로 옮길지 정한 규칙, 드라이버는 운영체제와 장치 사이의 통역사와 비슷합니다.", "실제 단자는 사람이 드나드는 문이 아니며 데이터는 전기·빛·무선 신호로 전달됩니다.", "USB-C 모양이 같아도 기능이 다를 수 있는 까닭을 규격이라는 말로 설명해 보세요."],
            activity: ["연결 목적에 맞추기", "사용 목적을 가장 알맞은 연결 칸으로 옮기세요.", [["usb", "USB", "Universal Serial Bus"], ["hdmi", "HDMI", "High-Definition Multimedia Interface"], ["bt", "블루투스", "Bluetooth"], ["wifi", "와이파이", "Wi-Fi"]], [["b03i1", "USB 메모리에서 파일 읽기", "Read a USB Drive", "usb"], ["b03i2", "유선 키보드 연결", "Connect a Wired Keyboard", "usb"], ["b03i3", "교실 TV로 화면과 소리 보내기", "Send Video and Audio to a TV", "hdmi"], ["b03i4", "무선 이어폰 연결", "Connect Wireless Earbuds", "bt"], ["b03i5", "무선 마우스 페어링", "Pair a Wireless Mouse", "bt"], ["b03i6", "공유기를 통해 인터넷 접속", "Connect Through a Router", "wifi"]], "연결 방식과 쓰임을 구분했습니다."],
            questions: [
                ["USB-C 케이블이 충전은 되지만 외부 화면은 나오지 않습니다. 다음 확인으로 가장 적절한 것은?", ["케이블과 기기의 USB-C 영상 출력 지원 여부", "폴더의 파일 확장자", "키보드 입력 언어", "화면 배경 그림"], 0, "Standard", "USB-C는 단자 모양입니다. 케이블과 단자가 영상 전달 규격을 지원하는지는 별도로 확인해야 합니다."],
                ["새 프린터가 연결 목록에는 보이지만 인쇄 명령을 이해하지 못합니다. 관련성이 높은 소프트웨어는?", ["프린터 드라이버", "사진 편집 앱", "웹 북마크", "화면 보호기"], 0, "Driver", "드라이버는 운영체제의 인쇄 명령을 프린터가 이해할 방식으로 전달합니다."],
                ["교실 TV에 노트북 화면과 소리를 한 케이블로 보내려 합니다. 알맞은 연결은?", ["HDMI", "3.5mm 오디오 단자", "전원 전용 USB 케이블", "유선 마우스 케이블"], 0, "HDMI", "HDMI는 디지털 영상과 소리를 함께 전달할 수 있습니다."],
                ["블루투스 마우스가 다른 태블릿에 연결된 상태라 새 크롬북에서 보이지 않습니다. 먼저 할 일은?", ["기존 연결을 해제하고 페어링 모드로 전환한다", "모니터 해상도를 낮춘다", "파일 이름을 바꾼다", "웹 브라우저 기록을 지운다"], 0, "Pairing", "블루투스 장치는 발견 가능한 페어링 상태에서 연결 대상을 정합니다."],
                ["단자와 규격의 차이를 정확히 설명한 것은?", ["단자는 물리적 연결 부분이고 규격은 신호와 기능의 약속이다", "단자는 소프트웨어이고 규격은 배터리다", "단자는 파일 이름이고 규격은 폴더 위치다", "두 말은 케이블 길이만 다르게 부른다"], 0, "Port and Standard", "같은 모양의 단자라도 지원하는 전송 속도와 영상·충전 기능은 다를 수 있습니다."],
                ["Wi-Fi와 블루투스를 구분한 설명으로 가장 적절한 것은?", ["Wi-Fi는 주로 네트워크 접속, 블루투스는 가까운 주변 기기 연결에 쓴다", "Wi-Fi는 출력 장치, 블루투스는 저장 장치다", "Wi-Fi는 케이블 규격, 블루투스는 단자 모양이다", "둘 다 화면 해상도를 정하는 기술이다"], 0, "Wireless Connections", "두 기술 모두 무선이지만 일반적인 거리, 속도, 연결 대상과 목적이 다릅니다."]
            ]
        }
    ];
    window.COMPUTER_FOUNDATION_LESSONS.push(...lessons.map(make));
})();
