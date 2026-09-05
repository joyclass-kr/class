// 평가원 기출 자료. 공통 과목(수학Ⅰ·수학Ⅱ)에서 유형이 되풀이되는 문항을 단원별로 담는다.
// 배점은 문항을 건져 올린 그물일 뿐이라 화면에 내세우지 않는다.
// topic은 화면에 안 나온다. 비슷한 문항을 여럿 싣지 않으려고 만드는 사람이 보는 표시일 뿐이다.
// 학생에게 유형 딱지를 보여 주면 문제를 읽는 대신 딱지부터 맞히려 든다.
// 문제 본문은 평가원 문제지에서 옮긴 것이고, 저작권은 한국교육과정평가원에 있다.
// source: 원본 문제지를 받은 곳. 화면에는 회차와 번호만 보이고 주소는 이 자료에만 남긴다.
// start: 풀이의 첫 수 한 줄.  trap: 막히는 곳.
(function () {
  "use strict";

  const R = String.raw;

  const units = [
    { id: "m1-explog", subject: "수학Ⅰ", name: "지수함수와 로그함수" },
    { id: "m1-trig",   subject: "수학Ⅰ", name: "삼각함수" },
    { id: "m1-seq",    subject: "수학Ⅰ", name: "수열" },
    { id: "m2-limit",  subject: "수학Ⅱ", name: "함수의 극한과 연속" },
    { id: "m2-diff",   subject: "수학Ⅱ", name: "미분" },
    { id: "m2-integ",  subject: "수학Ⅱ", name: "적분" }
  ];

  const exams = [
    {
      id: "2026-suneung", year: 2026, round: "수능", label: "2026학년도 수능",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
    }
  ];

  const problems = [
    {
      id: "2026-suneung-9", exam: "2026-suneung", no: 9, score: 4,
      units: ["m2-diff"], memo: "삼차함수에 접하는 직선",
      body: R`양수 \(a\)에 대하여 함수 \(f(x)\)를
        \[f(x)=x^{3}+3ax^{2}-9a^{2}x+4\]
        라 하자. 직선 \(y=5\)가 곡선 \(y=f(x)\)에 접할 때, \(f(2)\)의 값은?`,
      choices: [R`\(11\)`, R`\(12\)`, R`\(13\)`, R`\(14\)`, R`\(15\)`],
      answer: 4,
      start: R`접한다는 말은 극댓값이나 극솟값이 \(5\)라는 뜻이다. \(f'(x)=3(x+3a)(x-a)\)로 인수분해부터 한다.`,
      trap: R`극댓값과 극솟값을 둘 다 후보로 놓아야 한다. 하나는 \(a>0\) 조건에 걸려 스스로 떨어진다.`
    },
    {
      id: "2026-suneung-10", exam: "2026-suneung", no: 10, score: 4,
      units: ["m1-explog"], memo: "지수함수 그래프와 도형의 넓이",
      body: R`상수 \(a\,(a>1)\)에 대하여 곡선 \(y=a^{x}-2\) 위의 점 중
        제1사분면에 있는 점 \(\mathrm{A}\)를 지나고 \(y\)축에 평행한 직선이 \(x\)축과
        만나는 점을 \(\mathrm{B}\), 곡선 \(y=a^{x}-2\)의 점근선과 만나는 점을 \(\mathrm{C}\)라
        하자. \(\overline{\mathrm{AB}}=\overline{\mathrm{BC}}\)이고 삼각형 \(\mathrm{AOC}\)의 넓이가 \(8\)일 때,
        \(a\times\overline{\mathrm{OB}}\)의 값은? (단, \(\mathrm{O}\)는 원점이다.)`,
      choices: [R`\(2^{\frac{13}{6}}\)`, R`\(2^{\frac{7}{3}}\)`, R`\(2^{\frac{5}{2}}\)`, R`\(2^{\frac{8}{3}}\)`, R`\(2^{\frac{17}{6}}\)`],
      answer: 3,
      start: R`점근선 \(y=-2\)를 먼저 그린다. 세 점을 \(x=t\) 위에 세로로 놓으면 \(\overline{\mathrm{AB}}=\overline{\mathrm{BC}}\)에서 \(a^{t}=4\)가 한 줄에 나온다.`,
      trap: R`삼각형 \(\mathrm{AOC}\)의 밑변은 세로 선분 \(\overline{\mathrm{AC}}\)이고 높이가 \(t\)다. 밑변과 높이를 바꿔 잡기 쉽다.`
    },
    {
      id: "2026-suneung-11", exam: "2026-suneung", no: 11, score: 4,
      units: ["m2-integ"], memo: "속도와 위치, 움직인 거리",
      body: R`시각 \(t=0\)일 때 원점을 출발하여 수직선 위를 움직이는
        점 \(\mathrm{P}\)가 있다. 실수 \(k\)에 대하여 시각이 \(t\,(t\ge 0)\)일 때 점 \(\mathrm{P}\)의
        속도 \(v(t)\)가
        \[v(t)=t^{2}-kt+4\]
        이다. &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(k=0\)이면, 시각 \(t=1\)일 때 점 \(\mathrm{P}\)의 위치는 \(\dfrac{13}{3}\)이다.`,
        R`ㄴ. \(k=3\)이면, 출발한 후 점 \(\mathrm{P}\)의 운동 방향이 한 번 바뀐다.`,
        R`ㄷ. \(k=5\)이면, 시각 \(t=0\)에서 \(t=2\)까지 점 \(\mathrm{P}\)가 움직인 거리는 \(3\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 3,
      start: R`위치는 속도를 적분한 것, 움직인 거리는 속도의 절댓값을 적분한 것이다. 둘을 갈라 놓고 시작한다.`,
      trap: R`ㄴ은 계산할 것이 없다. \(t^{2}-3t+4\)의 판별식이 음수라 속도의 부호가 안 바뀌고, 그러면 방향도 안 바뀐다.`
    },
    {
      id: "2026-suneung-12", exam: "2026-suneung", no: 12, score: 4,
      units: ["m1-seq"], memo: "등비수열의 항 사이 관계",
      body: R`등비수열 \(\{a_{n}\}\)이
        \[2\left(a_{1}+a_{4}+a_{7}\right)=a_{4}+a_{7}+a_{10}=6\]
        을 만족시킬 때, \(a_{10}\)의 값은?`,
      choices: [R`\(\dfrac{22}{7}\)`, R`\(\dfrac{24}{7}\)`, R`\(\dfrac{26}{7}\)`, R`\(\dfrac{30}{7}\)`, R`\(\dfrac{32}{7}\)`],
      answer: 2,
      start: R`\(a_{4}+a_{7}+a_{10}\)은 \(a_{1}+a_{4}+a_{7}\)에 \(r^{3}\)을 곱한 것이다. 이걸 알아채면 \(r^{3}=2\)가 바로 나온다.`,
      trap: R`항을 하나하나 \(a_{1}r^{k}\)로 풀어 쓰면 식이 길어진다. 세 항을 한 덩어리로 묶는 것이 요령이다.`
    },
    {
      id: "2026-suneung-13", exam: "2026-suneung", no: 13, score: 4,
      units: ["m2-diff"], memo: "두 접선으로 둘러싸인 넓이",
      body: R`함수 \(f(x)=x^{2}-4x-3\)에 대하여
        곡선 \(y=f(x)\) 위의 점 \((1,\,-6)\)에서의 접선을 \(l\)이라 하고,
        함수 \(g(x)=\left(x^{3}-2x\right)f(x)\)에 대하여
        곡선 \(y=g(x)\) 위의 점 \((1,\,6)\)에서의 접선을 \(m\)이라 하자.
        두 직선 \(l\), \(m\)과 \(y\)축으로 둘러싸인 도형의 넓이는?`,
      choices: [R`\(21\)`, R`\(28\)`, R`\(35\)`, R`\(42\)`, R`\(49\)`],
      answer: 5,
      start: R`\(g'\)은 곱의 미분으로 \(x=1\)에서의 값만 내면 된다. \(g\)를 다 전개할 필요가 없다.`,
      trap: R`둘러싸인 도형은 삼각형이다. 두 접선의 \(y\)절편 사이 길이가 밑변, 교점의 \(x\)좌표가 높이다.`
    },
    {
      id: "2026-suneung-14", exam: "2026-suneung", no: 14, score: 4,
      units: ["m1-trig"], memo: "원과 삼각형에서 길이 구하기",
      body: R`그림과 같이 \(\overline{\mathrm{AB}}=3\), \(\overline{\mathrm{BC}}=4\)이고 \(\angle\mathrm{B}=\dfrac{\pi}{2}\)인 직각삼각형
        \(\mathrm{ABC}\)가 있다. 선분 \(\mathrm{AB}\)를 \(2:1\)로 내분하는 점을 \(\mathrm{D}\),
        점 \(\mathrm{A}\)를 중심으로 하고 반지름의 길이가 \(\overline{\mathrm{AD}}\)인 원이 선분 \(\mathrm{AC}\)와
        만나는 점을 \(\mathrm{E}\), 직선 \(\mathrm{AB}\)가 이 원과 만나는 점 중 \(\mathrm{D}\)가 아닌 점을
        \(\mathrm{F}\)라 하고, 호 \(\mathrm{EF}\) 위의 점 \(\mathrm{G}\)를 \(\overline{\mathrm{CG}}=2\sqrt{6}\)이 되도록 잡는다.
        세 점 \(\mathrm{C}\), \(\mathrm{E}\), \(\mathrm{G}\)를 지나는 원 위의 점 \(\mathrm{H}\)가 \(\angle\mathrm{HCG}=\angle\mathrm{BAC}\)를
        만족시킬 때, 선분 \(\mathrm{GH}\)의 길이는?`,
      figure: "2026-suneung-14.webp",
      choices: [R`\(\dfrac{6\sqrt{15}}{5}\)`, R`\(\dfrac{38\sqrt{10}}{25}\)`, R`\(\dfrac{14\sqrt{3}}{5}\)`, R`\(\dfrac{32\sqrt{15}}{25}\)`, R`\(\dfrac{8\sqrt{10}}{5}\)`],
      answer: 4,
      start: R`\(\overline{\mathrm{AB}}=3\)을 \(2:1\)로 나누므로 원의 반지름은 \(2\)다. 여기서 \(\overline{\mathrm{AE}}=2\)가 따라 나온다.`,
      trap: R`\(\angle\mathrm{HCG}=\angle\mathrm{BAC}\)는 길이 조건이 아니라 원주각 조건이다. 사인법칙으로 넘기라는 신호다.`
    },
    {
      id: "2026-suneung-15", exam: "2026-suneung", no: 15, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "정적분으로 정의된 함수의 극값",
      body: R`함수 \(f(x)\)가
        \[f(x)=\begin{cases}-x^{2} &amp; (x&lt;0)\\ x^{2}-x &amp; (x\ge 0)\end{cases}\]
        이고, 양수 \(a\)에 대하여 함수 \(g(x)\)를
        \[g(x)=\begin{cases}ax+a &amp; (x&lt;-1)\\ 0 &amp; (-1\le x&lt;1)\\ ax-a &amp; (x\ge 1)\end{cases}\]
        이라 하자. 함수 \(h(x)=\displaystyle\int_{0}^{x}\bigl(g(t)-f(t)\bigr)\,dt\)가 오직 하나의
        극값을 갖도록 하는 \(a\)의 최댓값을 \(k\)라 하자. \(a=k\)일 때,
        \(k+h(3)\)의 값은?`,
      choices: [R`\(\dfrac{9}{2}\)`, R`\(\dfrac{11}{2}\)`, R`\(\dfrac{13}{2}\)`, R`\(\dfrac{15}{2}\)`, R`\(\dfrac{17}{2}\)`],
      answer: 4,
      start: R`\(h'(x)=g(x)-f(x)\)다. 극값이 하나라는 말은 이 차가 부호를 딱 한 번만 바꾼다는 뜻이다.`,
      trap: R`\(f\)와 \(g\)가 둘 다 구간별로 나뉘어 있다. 구간을 겹쳐 놓고 부호가 바뀌는 자리부터 찾아야 한다.`
    },
    {
      id: "2026-suneung-20", exam: "2026-suneung", no: 20, score: 4,
      units: ["m1-seq"], memo: "수열의 합과 귀납적 관계",
      body: R`수열 \(\{a_{n}\}\)이 다음 조건을 만족시킨다.`,
      bullets: true,
      note: [
        R`\(a_{1}=7\)`,
        R`\(2\) 이상의 자연수 \(n\)에 대하여 \(\displaystyle\sum_{k=1}^{n}a_{k}=\frac{2}{3}a_{n}+\frac{1}{6}n^{2}-\frac{1}{6}n+10\) 이다.`
      ],
      bodyAfter: R`다음은 \(\displaystyle\sum_{k=1}^{12}a_{k}+\sum_{k=1}^{5}a_{2k+1}\)의 값을 구하는 과정이다.
        <div class="proof-box">
        <p>\(2\) 이상의 자연수 \(n\)에 대하여 \(a_{n+1}=\displaystyle\sum_{k=1}^{n+1}a_{k}-\sum_{k=1}^{n}a_{k}\)이므로</p>
        \[a_{n+1}=\frac{2}{3}\left(a_{n+1}-a_{n}\right)+\fbox{(가)}\]
        <p>이고, 이 식을 정리하면</p>
        \[2a_{n}+a_{n+1}=3\times\fbox{(가)}\qquad \cdots\cdots\ ㉠\]
        <p>이다.</p>
        \[\sum_{k=1}^{n}a_{k}=\frac{2}{3}a_{n}+\frac{1}{6}n^{2}-\frac{1}{6}n+10\quad(n\ge 2)\]
        <p>에서 양변에 \(n=2\)를 대입하면</p>
        \[a_{2}=\fbox{(나)}\qquad \cdots\cdots\ ㉡\]
        <p>이다. ㉠과 ㉡에 의하여</p>
        \[\sum_{k=1}^{12}a_{k}+\sum_{k=1}^{5}a_{2k+1}=a_{1}+a_{2}+\sum_{k=1}^{5}\left(2a_{2k+1}+a_{2k+2}\right)=\fbox{(다)}\]
        <p>이다.</p>
        </div>
        위의 (가)에 알맞은 식을 \(f(n)\)이라 하고, (나), (다)에 알맞은
        수를 각각 \(p\), \(q\)라 할 때, \(\dfrac{p\times q}{f(12)}\)의 값을 구하시오.`,
      short: true,
      answer: 130,
      start: R`\(a_{n+1}=\sum^{n+1}-\sum^{n}\)을 그대로 빼면 (가)가 나온다. \(n^{2}\) 항끼리 빼는 것이 계산의 전부다.`,
      trap: R`(다)를 구할 때 ㉠에 \(n=2k+1\)을 넣으면 \(2a_{2k+1}+a_{2k+2}=2k+1\)이 된다. 이 묶음을 알아채지 못하면 열두 항을 다 구하려 들게 된다.`
    },
    {
      id: "2026-suneung-21", exam: "2026-suneung", no: 21, score: 4,
      units: ["m2-limit"], memo: "연속과 극한 조건으로 함수 결정하기",
      body: R`최고차항의 계수가 양수인 삼차함수 \(f(x)\)와 실수 \(t\)에
        대하여 함수
        \[g(x)=\begin{cases}-f(x) &amp; (x&lt;t)\\ \ \ f(x) &amp; (x\ge t)\end{cases}\]
        는 실수 전체의 집합에서 연속이고 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 모든 실수 \(a\)에 대하여 \(\displaystyle\lim_{x\to a+}\frac{g(x)}{x(x-2)}\)의 값이 존재한다.`,
        R`(나) \(\displaystyle\lim_{x\to m+}\frac{g(x)}{x(x-2)}\)의 값이 음수가 되도록 하는 자연수 \(m\)의 집합은 \(\left\{g(-1),\,-\dfrac{7}{2}g(1)\right\}\)이다.`
      ],
      bodyAfter: R`\(g(-5)\)의 값을 구하시오. \(\left(\text{단, } g(-1)\ne-\dfrac{7}{2}g(1)\right)\)`,
      short: true,
      answer: 65,
      start: R`\(x=t\)에서 이어지려면 \(-f(t)=f(t)\), 곧 \(f(t)=0\)이다. 여기가 모든 것의 출발점이다.`,
      trap: R`(나)의 집합에 든 것이 자연수라는 점 자체가 조건이다. \(g(-1)\)과 \(-\frac{7}{2}g(1)\)이 둘 다 자연수여야 하고, 서로 달라야 한다.`
    },
    {
      id: "2026-suneung-22", exam: "2026-suneung", no: 22, score: 4,
      units: ["m1-explog"], memo: "지수·로그 그래프의 대칭과 중점",
      body: R`곡선 \(y=\log_{16}(8x+2)\) 위의 점 \(\mathrm{A}(a,\,b)\)와
        곡선 \(y=4^{\,x-1}-\dfrac{1}{2}\) 위의 점 \(\mathrm{B}\)가 제1사분면에 있다.
        점 \(\mathrm{A}\)를 직선 \(y=x\)에 대하여 대칭이동한 점이 직선 \(\mathrm{OB}\) 위에
        있고 선분 \(\mathrm{AB}\)의 중점의 좌표가 \(\left(\dfrac{77}{8},\,\dfrac{133}{8}\right)\)일 때,
        \(a\times b=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오.
        (단, \(\mathrm{O}\)는 원점이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 457,
      start: R`\(\mathrm{A}(a,b)\)를 \(y=x\)에 대칭하면 \((b,a)\)다. 이 점이 원점과 \(\mathrm{B}\)를 잇는 직선 위에 있다는 조건부터 식으로 쓴다.`,
      trap: R`중점 조건은 \(x\)에서 하나, \(y\)에서 하나로 모두 두 개의 식이다. 하나만 쓰고 넘어가기 쉽다.`
    }
  ];

  window.CSAT_MATH = { units, exams, problems };
})();
