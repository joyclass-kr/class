(() => {
    "use strict";
    // a03 차시의 다시 쓴 문항. 같은 번호가 여럿이면 뒤엣것이 살아남는다.
    (window.COMPUTER_REVIEWED_QUESTIONS = window.COMPUTER_REVIEWED_QUESTIONS || []).push(
        ["a03", 2, {
            text: "앱 안내에는 ‘Android 14 이상, 빈 공간 200MB 필요’라고 적혀 있습니다. 기기는 Android 13이고 빈 공간은 4GB이며 Wi-Fi도 연결되어 있습니다. 설치가 막힌 원인은 무엇입니까?",
            options: ["빈 공간 4GB가 필요량보다 작은 상태", "Android 13이 최소 버전보다 낮은 상태", "Wi-Fi 연결이 설치 중 끊어진 상태", "카메라 권한이 설치 전에 거부된 상태"],
            answer: 1, concept: "호환성",
            explanation: "4GB는 200MB보다 크고 Wi-Fi도 연결되어 있습니다. Android 13은 앱이 요구한 Android 14 이상 조건을 충족하지 못하므로 운영체제 버전 호환성을 먼저 확인해야 합니다."
        }],
    );
})();
