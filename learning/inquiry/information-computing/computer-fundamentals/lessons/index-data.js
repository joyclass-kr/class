(() => {
    "use strict";
    // 차시 목록과 앞뒤 이동에만 쓰는 가벼운 차례표. 내용은 열어 본 차시 것만 따로 받는다.
    window.COMPUTER_LESSON_INDEX = [
        {
            "id": "a01",
            "code": "A01",
            "number": 1,
            "domain": "컴퓨터의 기본 원리",
            "title": "컴퓨터는 무슨 일을 할까?",
            "english": "What Does a Computer Do?"
        },
        {
            "id": "a02",
            "code": "A02",
            "number": 2,
            "domain": "",
            "title": "하드웨어와 소프트웨어는 어떻게 다를까?",
            "english": "Hardware and Software"
        },
        {
            "id": "a03",
            "code": "A03",
            "number": 3,
            "domain": "",
            "title": "기기·운영체제·앱은 무엇이 다를까?",
            "english": "Device, Operating System, and App"
        },
        {
            "id": "a04",
            "code": "A04",
            "number": 4,
            "domain": "",
            "title": "아날로그와 디지털은 무엇이 다를까?",
            "english": "Analog and Digital"
        },
        {
            "id": "a05",
            "code": "A05",
            "number": 5,
            "domain": "",
            "title": "현실의 소리는 어떻게 숫자 데이터가 될까?",
            "english": "From Sound to Digital Data"
        },
        {
            "id": "b01",
            "code": "B01",
            "number": 6,
            "domain": "컴퓨터 안의 하드웨어",
            "title": "본체 안에는 어떤 부품이 있을까?",
            "english": "Inside a Desktop Computer"
        },
        {
            "id": "b02",
            "code": "B02",
            "number": 7,
            "domain": "하드웨어와 기기",
            "title": "휴대전화와 태블릿 안에도 컴퓨터가 있을까?",
            "english": "Inside Phones and Tablets"
        },
        {
            "id": "b03",
            "code": "B03",
            "number": 8,
            "domain": "하드웨어와 기기",
            "title": "주변 기기와 단자는 어떻게 연결될까?",
            "english": "Peripherals, Ports, and Connections"
        },
        {
            "id": "c01",
            "code": "C01",
            "number": 9,
            "domain": "운영체제와 앱",
            "title": "하드웨어·운영체제·앱은 어떻게 이어질까?",
            "english": "Hardware, Operating System, and Apps"
        },
        {
            "id": "c02",
            "code": "C02",
            "number": 10,
            "domain": "운영체제와 앱",
            "title": "Windows·ChromeOS·Android·iOS·iPadOS는 무엇이 다를까?",
            "english": "Comparing Operating Systems"
        },
        {
            "id": "c03",
            "code": "C03",
            "number": 11,
            "domain": "운영체제와 앱",
            "title": "앱·프로그램·프로세스·창은 같은 말일까?",
            "english": "Apps, Programs, Processes, and Windows"
        },
        {
            "id": "c04",
            "code": "C04",
            "number": 12,
            "domain": "운영체제와 앱",
            "title": "설정에서 무엇을 바꾸고 관리할까?",
            "english": "What Can You Change and Manage in Settings?"
        },
        {
            "id": "d01",
            "code": "D01",
            "number": 13,
            "domain": "포인터·터치·키보드",
            "title": "포인터·텍스트 커서·클릭·드래그는 어떻게 다를까?",
            "english": "How Are the Pointer, Text Cursor, Click, and Drag Different?"
        },
        {
            "id": "d02",
            "code": "D02",
            "number": 14,
            "domain": "포인터·터치·키보드",
            "title": "터치·탭·길게 누르기·스크롤·확대는 어떻게 작동할까?",
            "english": "Touch Gestures"
        },
        {
            "id": "d03",
            "code": "D03",
            "number": 15,
            "domain": "포인터·터치·키보드",
            "title": "키보드·단축키·클립보드는 어떻게 이어질까?",
            "english": "Keyboard, Shortcuts, and Clipboard"
        },
        {
            "id": "e01",
            "code": "E01",
            "number": 16,
            "domain": "파일과 저장 공간",
            "title": "드라이브·폴더·파일·경로는 어떤 관계일까?",
            "english": "Drives, Folders, Files, and Paths"
        },
        {
            "id": "e02",
            "code": "E02",
            "number": 17,
            "domain": "파일과 저장 공간",
            "title": "파일 이름·확장자·형식·앱은 어떻게 연결될까?",
            "english": "File Names, Extensions, Formats, and Apps"
        },
        {
            "id": "e03",
            "code": "E03",
            "number": 18,
            "domain": "파일과 저장 공간",
            "title": "저장·다른 이름으로 저장·복사·이동·삭제는 무엇이 다를까?",
            "english": "Save, Save As, Copy, Move, and Delete"
        },
        {
            "id": "e04",
            "code": "E04",
            "number": 19,
            "domain": "파일과 저장 공간",
            "title": "아이콘·원본·바로가기·북마크·즐겨찾기는 같은 것일까?",
            "english": "Icons, Originals, Shortcuts, and Bookmarks"
        },
        {
            "id": "e05",
            "code": "E05",
            "number": 20,
            "domain": "파일과 저장 공간",
            "title": "USB·클라우드·동기화·백업·ZIP은 어떻게 다를까?",
            "english": "USB, Cloud, Sync, Backup, and ZIP"
        },
        {
            "id": "f01",
            "code": "F01",
            "number": 21,
            "domain": "화면과 디지털 미디어",
            "title": "픽셀·해상도·화면 크기·배율은 어떻게 다를까?",
            "english": "Pixels, Resolution, Screen Size, and Scaling"
        },
        {
            "id": "f02",
            "code": "F02",
            "number": 22,
            "domain": "화면과 디지털 미디어",
            "title": "RGB 색과 래스터·벡터·JPG·PNG·WebP는 어떤 관계일까?",
            "english": "Color, Raster, Vector, and Image Formats"
        },
        {
            "id": "f03",
            "code": "F03",
            "number": 23,
            "domain": "화면과 디지털 미디어",
            "title": "소리 샘플·영상 프레임·스크린샷·화면 녹화는 무엇일까?",
            "english": "Audio Samples, Video Frames, Screenshots, and Screen Recording"
        },
        {
            "id": "g01",
            "code": "G01",
            "number": 24,
            "domain": "0과 1·데이터 크기",
            "title": "아날로그와 디지털, 0과 1은 어떤 관계일까?",
            "english": "Analog, Digital, and Binary"
        },
        {
            "id": "g02",
            "code": "G02",
            "number": 25,
            "domain": "0과 1·데이터 크기",
            "title": "bit·byte·KB·MB·GB·TB는 어떻게 커질까?",
            "english": "Bits, Bytes, KB, MB, GB, and TB"
        },
        {
            "id": "g03",
            "code": "G03",
            "number": 26,
            "domain": "0과 1·데이터 크기",
            "title": "인코딩·압축·파일 크기·전송 속도는 어떤 관계일까?",
            "english": "Encoding, Compression, File Size, and Transfer Speed"
        },
        {
            "id": "h01",
            "code": "H01",
            "number": 27,
            "domain": "네트워크와 웹",
            "title": "네트워크·Wi-Fi·공유기·인터넷은 어떻게 이어질까?",
            "english": "Networks, Wi-Fi, Routers, and the Internet"
        },
        {
            "id": "h02",
            "code": "H02",
            "number": 28,
            "domain": "네트워크와 웹",
            "title": "클라이언트·서버·요청·응답·URL·DNS는 어떻게 이어질까?",
            "english": "Clients, Servers, Requests, Responses, URLs, and DNS"
        },
        {
            "id": "h03",
            "code": "H03",
            "number": 29,
            "domain": "네트워크와 웹",
            "title": "브라우저·검색 엔진·웹사이트·탭·링크는 무엇이 다를까?",
            "english": "Browsers, Search Engines, Websites, Tabs, and Links"
        },
        {
            "id": "h04",
            "code": "H04",
            "number": 30,
            "domain": "네트워크와 웹",
            "title": "온라인 문제를 제출하면 어디에서 채점할까?",
            "english": "What Happens After You Submit an Online Answer?"
        },
        {
            "id": "h05",
            "code": "H05",
            "number": 31,
            "domain": "네트워크와 웹",
            "title": "다운로드·업로드·쿠키·캐시·배포는 어떤 역할일까?",
            "english": "Downloads, Uploads, Cookies, Caches, and Deployment"
        },
        {
            "id": "i01",
            "code": "I01",
            "number": 32,
            "domain": "계정·보안·디지털 시민성",
            "title": "계정·프로필·로그인·권한·2단계 인증은 어떻게 이어질까?",
            "english": "Accounts, Profiles, Login, Permissions, and Two-Factor Authentication"
        },
        {
            "id": "i02",
            "code": "I02",
            "number": 33,
            "domain": "계정·보안·디지털 시민성",
            "title": "피싱·개인정보·저작권·디지털 발자국·기기 건강은 어떻게 판단할까?",
            "english": "Phishing, Privacy, Copyright, Digital Footprints, and Digital Well-being"
        },
        {
            "id": "j01",
            "code": "J01",
            "number": 34,
            "domain": "알고리즘과 코딩 논리",
            "title": "문제를 분해하고 순서가 분명한 알고리즘으로 만들려면?",
            "english": "Decomposition, Sequences, and Algorithms"
        },
        {
            "id": "j02",
            "code": "J02",
            "number": 35,
            "domain": "알고리즘과 코딩 논리",
            "title": "이벤트·조건·반복은 프로그램의 흐름을 어떻게 바꿀까?",
            "english": "Events, Conditions, and Loops"
        },
        {
            "id": "j03",
            "code": "J03",
            "number": 36,
            "domain": "알고리즘과 코딩 논리",
            "title": "사진이 보이지 않는 프로그램을 입력·처리·출력·저장으로 점검하려면?",
            "english": "Debugging a Photo Program with Input, Processing, Output, and Storage"
        }
    ];
})();
