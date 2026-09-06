(() => {
    "use strict";
    // c02 차시의 다시 쓴 문항. 같은 번호가 여럿이면 뒤엣것이 살아남는다.
    (window.COMPUTER_REVIEWED_QUESTIONS = window.COMPUTER_REVIEWED_QUESTIONS || []).push(
        ["c02", 0, {
            text: "설치 안내는 ‘Windows 11용 .exe, 필요 공간 500MB’입니다. 기기는 ChromeOS, 빈 공간은 2GB이고 내려받기도 끝났습니다. 실행되지 않는 까닭은?",
            options: ["빈 공간 2GB가 필요 공간 500MB보다 적은 점", "파일이 Windows 실행 규칙에 맞춰져 있는 점", "설치 파일의 다운로드가 아직 끝나지 않은 점", "설치 파일이 다운로드 폴더에 들어 있는 점"],
            answer: 1, concept: "Operating System Compatibility",
            explanation: "저장 공간과 다운로드 상태는 조건을 충족합니다. 실행 파일이 Windows의 기능과 규칙에 맞춰져 있어 ChromeOS에서는 그대로 실행할 수 없습니다."
        }],
        ["c02", 1, {
            text: "Windows와 iPad에서 ‘보고서.docx’를 ‘과학’ 폴더의 ‘최종보고서.docx’로 바꿨습니다. 원래 폴더는 비었고 내용은 그대로입니다. 공통으로 한 일은?",
            options: ["이름을 바꾸고 원래 위치에 파일을 남겼다", "위치를 바꾸며 파일 형식도 PDF로 변환했다", "이름과 위치를 바꾸고 파일 내용은 유지했다", "새 위치에 사본을 만들고 원래 파일도 남겼다"],
            answer: 2, concept: "File Management Across Operating Systems",
            explanation: "조작 화면은 달라도 두 운영체제에서 파일의 이름과 위치를 바꿀 수 있습니다. 이동 뒤 파일 내용과 형식은 그대로 유지되었습니다."
        }],
        ["c02", 3, {
            text: "Android와 iPhone에서 QR 앱의 카메라 권한을 끄자 미리보기가 멈췄고, 켜자 다시 보였습니다. 두 운영체제가 공통으로 맡은 일은?",
            options: ["QR 앱이 카메라 센서의 해상도 값을 직접 바꾸는 일", "카메라 센서가 QR 앱의 계정 권한을 직접 정하는 일", "사진 확장자가 QR 앱의 센서 사용 범위를 정하는 일", "QR 앱의 요청을 확인해 카메라 사용을 허용하거나 막는 일"],
            answer: 3, concept: "Mobile Operating System Permission",
            explanation: "Android와 iOS는 앱별 권한을 확인한 뒤 카메라 같은 장치와 앱을 연결합니다. 센서나 사진 형식이 앱의 접근 권한을 정하는 것은 아닙니다."
        }],
        ["c02", 4, {
            text: "ChromeOS와 iPadOS에서 각각 사진 폴더의 ‘바다.jpg’를 ‘바다_여행.jpg’로 바꿨습니다. 두 기기에서 공통으로 확인할 결과는 무엇입니까?",
            options: ["같은 폴더에서 파일 내용과 JPG 형식은 유지되고 이름이 바다_여행.jpg로 바뀐다", "같은 폴더에 바다.jpg와 바다_여행.jpg가 사본으로 함께 남는다", "이름과 함께 사진 데이터가 PNG 방식으로 다시 저장된다", "이름은 바다.jpg로 남고 사진 폴더의 표시 이름이 바다_여행으로 바뀐다"],
            answer: 0, concept: "Rename Across Operating Systems",
            explanation: "메뉴 모양은 달라도 이름 바꾸기는 같은 파일의 이름을 바꾸며 내용·형식·현재 폴더는 그대로 둡니다."
        }],
        ["c02", 5, {
            text: "Windows PC에서 보던 ‘사진/바다.jpg’를 iPad에서 다시 찾으려 합니다. 운영체제 화면이 달라도 공통으로 따라갈 정보는 무엇입니까?",
            options: ["파일 앱에서 저장 위치와 폴더 경로를 열고 이름·확장자를 확인한다", "운영체제 설정에서 화면 배율을 같게 맞춘 뒤 같은 아이콘 색을 찾는다", "웹 검색창에 파일 이름을 입력해 인터넷의 같은 사진을 내려받는다", "두 기기의 바탕화면 배치를 같게 만든 뒤 같은 칸의 아이콘을 누른다"],
            answer: 0, concept: "Finding a File Across Operating Systems",
            explanation: "파일 앱의 이름과 화면 배치는 달라도 저장 위치·폴더 경로·파일 이름·확장자는 같은 파일을 찾는 공통 단서입니다."
        }],
    );
})();
