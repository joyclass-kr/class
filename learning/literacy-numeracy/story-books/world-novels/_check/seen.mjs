/* 도구가 책을 조용히 건너뛰면, 안 본 책까지 통과한 줄로 잘못 안다.

   틀이 다르거나 읽다 실패한 책을 `continue`로 넘기면 화면에는 아무 표도 안 난다.
   이솝만 CHAPTERS 대신 FABLES를 쓰는 것을 나는 도구가 "읽지 못했습니다"라고
   찍어 준 덕에 알았다. 찍어 주지 않았으면 쉰일곱 권만 보고 쉰여덟 권을 봤다고
   여겼을 것이다. 전래동화 방이 같은 함정을 짚어 주었다.

   그래서 본 책 수를 끝에 함께 찍고, 못 본 책은 이름과 까닭을 대고,
   하나라도 있으면 종료값 1을 돌린다. 검사가 조용히 넘어가지 못하게 한다. */
export function tally(total) {
    const skipped = [];
    return {
        skip(book, why) { skipped.push(book + ' — ' + why); },
        report() {
            console.log('본 책 ' + (total - skipped.length) + '권 (' + total + '권 가운데).');
            if (skipped.length) {
                console.log('## 못 본 책 — 틀이 다르거나 읽다 실패했다');
                skipped.forEach(t => console.log('  ' + t));
                process.exitCode = 1;
            }
        }
    };
}
