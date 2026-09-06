(() => {
    "use strict";
    // j03 차시의 다시 쓴 문항. 같은 번호가 여럿이면 뒤엣것이 살아남는다.
    (window.COMPUTER_REVIEWED_QUESTIONS = window.COMPUTER_REVIEWED_QUESTIONS || []).push(
        ["j03", 2, {
            text: "경로를 /pictures로 고친 뒤 cat.webp와 dog.webp는 존재하고 bird.webp는 없습니다. 수정과 오류 처리가 함께 맞는 시험 결과는 무엇입니까?",
            options: ["cat 표시 / dog 표시 / bird는 파일 없음 안내", "cat 표시 / dog 빈 화면 / bird는 파일 없음 안내", "cat 표시 / dog 표시 / bird에 cat 사진 표시", "cat만 표시 / dog와 bird는 시험하지 않음"],
            answer: 0, concept: "Retesting",
            explanation: "두 정상 파일이 표시되어야 경로 수정이 다른 파일에도 적용됐음을 알 수 있고, 없는 파일에는 이전 사진 대신 알맞은 오류 안내가 나와야 예외 처리도 확인됩니다."
        }],
        ["j03", 4, {
            text: "앱에서 사진 경로를 /pictures/cat.webp로 바꾼 뒤 기기를 완전히 껐다 켰습니다. 다시 시작해도 경로가 남을 설계는 무엇입니까?",
            options: ["종료 전 경로를 설정 파일에 기록하고 시작할 때 읽는다", "경로를 RAM 변수에 두고 전원이 꺼진 동안 유지한다", "경로 글자를 미리보기 화면에 그려 둔 뒤 다시 읽는다", "경로를 클립보드에 복사하고 앱이 시작할 때 붙인다"],
            answer: 0, concept: "Persistent Storage",
            explanation: "전원이 꺼져도 남아야 하는 경로는 설정 파일이나 데이터베이스 같은 비휘발성 저장 공간에 기록하고 시작할 때 다시 읽어야 합니다."
        }],
        ["j03", 5, {
            text: "경로를 고친 뒤 같은 사진을 열면 로그가 ‘pictures 읽기 권한 없음’으로 바뀝니다. 새 원인을 한 가지씩 확인하는 다음 시험은 무엇입니까?",
            options: ["경로와 파일은 두고 폴더 읽기 권한만 허용해 다시 실행한다", "경로와 권한을 함께 바꾼 뒤 결과만 비교한다", "읽기 권한은 두고 사진을 다른 형식으로 변환한다", "읽기 권한은 두고 저장 장치의 빈 공간을 늘린다"],
            answer: 0, concept: "Next Hypothesis",
            explanation: "새 로그가 읽기 권한을 가리키므로 경로와 파일을 같은 상태로 유지한 채 권한만 바꾸어야 원인 가설을 한 변수로 시험할 수 있습니다."
        }],
        ["j03", 1, {
            text: "로그에는 ‘/picture 폴더를 찾지 못함’이 나오고 실제 폴더는 /pictures입니다. 기록이 가장 직접적으로 가리키는 원인은 무엇입니까?",
            options: ["코드의 폴더 경로에서 s 한 글자가 빠졌다", "코드가 cat.webp 대신 dog.webp 파일 이름을 요청했다", "코드가 WebP 대신 JPG 형식으로 사진을 해석했다", "앱의 폴더 읽기 권한이 거부되어 다른 오류가 표시되었다"],
            answer: 0, concept: "Observed Evidence",
            explanation: "실제 폴더와 요청 경로를 글자 단위로 비교하면 /picture와 /pictures의 s 차이가 현재 로그와 정확히 맞습니다."
        }],
    );
})();
