/*
 * 수학 OX 단원 대조표 — 2022 개정 교육과정 기준
 *   node _coverage.js          빈 단원과 문항 수를 학년별로 보여 준다
 *   node _coverage.js --all    문항이 있는 단원까지 모두 보여 준다
 * 이 파일은 어느 페이지에서도 불러 쓰지 않는 검사 도구다.
 */
const fs = require("fs");
const path = require("path");

const CURRICULUM = {
  "초3": ["덧셈과 뺄셈", "곱셈", "나눗셈", "분수와 소수", "평면도형", "원", "길이와 시간", "들이와 무게", "자료의 정리"],
  "초4": ["큰 수", "각도", "곱셈과 나눗셈", "평면도형의 이동", "막대그래프", "규칙 찾기와 등호", "분수의 덧셈과 뺄셈", "삼각형", "소수의 덧셈과 뺄셈", "사각형", "꺾은선그래프", "다각형"],
  "초5": ["자연수의 혼합 계산", "약수와 배수", "규칙과 대응", "약분과 통분", "분수의 덧셈과 뺄셈", "다각형의 둘레와 넓이", "수의 범위와 어림하기", "분수의 곱셈", "합동과 대칭", "소수의 곱셈", "직육면체", "평균과 가능성"],
  "초6": ["분수의 나눗셈", "각기둥과 각뿔", "소수의 나눗셈", "비와 비율", "여러 가지 그래프", "직육면체의 부피와 겉넓이", "공간과 입체", "비례식과 비례배분", "원의 넓이", "원기둥·원뿔·구"],
  "중1": ["소인수분해", "정수와 유리수", "문자와 식", "좌표평면과 그래프", "기본 도형", "평면도형의 성질", "입체도형의 성질", "자료의 정리와 해석"],
  "중2": ["수와 식", "일차부등식", "연립일차방정식", "일차함수", "도형의 성질", "도형의 닮음", "피타고라스 정리", "확률"],
  "중3": ["제곱근과 실수", "다항식의 곱셈과 인수분해", "이차방정식", "이차함수", "삼각비", "원의 성질", "통계"],
  "공수1": ["다항식", "방정식과 부등식", "경우의 수", "행렬"],
  "공수2": ["도형의 방정식", "집합과 명제", "함수와 그래프"],
  "대수": ["지수와 로그", "삼각함수", "수열"],
  "미적1": ["함수의 극한과 연속", "미분", "적분"],
  "확률과 통계": ["경우의 수", "확률", "통계"],
  "기하": ["이차곡선", "공간도형과 공간좌표", "벡터"]
};

const src = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
const data = eval(src.match(/window\.MATH_OX_DATA = (\[[\s\S]*\n\]);/)[1]);

const showAll = process.argv.includes("--all");
let empty = 0, thin = 0, stray = 0;
const ids = new Set();

console.log("");
for (const [subject, units] of Object.entries(CURRICULUM)) {
  const mine = data.filter((q) => q.subject === subject);
  const rows = units.map((u) => [u, mine.filter((q) => q.unit === u)]);
  const off = mine.filter((q) => !units.includes(q.unit));
  const flagged = rows.filter(([, qs]) => qs.length < 2);
  if (!showAll && flagged.length === 0 && off.length === 0) {
    console.log(`  ${subject.padEnd(7)} 단원 ${units.length}개 · 문항 ${mine.length}개 — 모두 참`);
    continue;
  }
  console.log(`\n■ ${subject}  (단원 ${units.length}개 · 문항 ${mine.length}개)`);
  for (const [u, qs] of rows) {
    if (!showAll && qs.length >= 2) continue;
    const mark = qs.length === 0 ? "✗ 빈 단원" : qs.length === 1 ? "△ 한 개뿐" : "  ";
    if (qs.length === 0) empty++;
    else if (qs.length === 1) thin++;
    console.log(`   ${mark.padEnd(10)} ${u.padEnd(22)} ${qs.length}`);
  }
  for (const q of off) {
    stray++;
    console.log(`   ! 단원표에 없음  ${String(q.unit)} (id ${q.id})`);
  }
}

for (const q of data) {
  if (ids.has(q.id)) console.log(`\n! id 겹침: ${q.id}`);
  ids.add(q.id);
  if (!q.unit) console.log(`\n! unit 없음: id ${q.id}`);
  if (!CURRICULUM[q.subject]) console.log(`\n! 학년표에 없는 과목: ${q.subject} (id ${q.id})`);
}

const o = data.filter((q) => q.answer === "O").length;
console.log(`\n전체 ${data.length}문항 · O ${o} : X ${data.length - o}`);
console.log(`빈 단원 ${empty}개 · 한 개뿐인 단원 ${thin}개 · 단원표 밖 문항 ${stray}개\n`);
