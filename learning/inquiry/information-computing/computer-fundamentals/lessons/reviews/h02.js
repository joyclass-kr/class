(() => {
    "use strict";
    // h02 차시의 다시 쓴 문항. 같은 번호가 여럿이면 뒤엣것이 살아남는다.
    (window.COMPUTER_REVIEWED_QUESTIONS = window.COMPUTER_REVIEWED_QUESTIONS || []).push(
        ["h02", 1, {
            text: "브라우저에 웹 주소를 입력한 뒤 페이지가 보일 때까지의 순서로 알맞은 것은 무엇입니까?",
            options: ["주소에서 도메인·경로 확인 → DNS로 서버 주소 찾기 → 서버에 경로 요청 → 응답을 받아 화면에 표시", "DNS로 페이지 그림 받기 → 주소에서 서버 찾기 → 브라우저가 경로 저장 → 화면에 표시", "서버가 먼저 브라우저를 찾기 → DNS가 경로를 그림 → 주소를 응답으로 보내기 → 화면에 표시", "주소에서 도메인 확인 → 브라우저가 페이지를 직접 만들기 → DNS에 완성 화면 보내기 → 서버에 저장"],
            answer: 0, concept: "Request and Response Sequence",
            explanation: "브라우저는 URL을 나누어 읽고 DNS로 서버 주소를 찾은 뒤 경로를 요청합니다. 서버 응답을 받은 브라우저가 내용을 화면에 그립니다."
        }],
    );
})();
