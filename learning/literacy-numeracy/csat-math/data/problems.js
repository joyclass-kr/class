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
      id: "2027-09", year: 2027, round: "9월", label: "2027학년도 9월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2027-06", year: 2027, round: "6월", label: "2027학년도 6월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2026-suneung", year: 2026, round: "수능", label: "2026학년도 수능",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
    },
    {
      id: "2026-09", year: 2026, round: "9월", label: "2026학년도 9월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2026-06", year: 2026, round: "6월", label: "2026학년도 6월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2025-suneung", year: 2025, round: "수능", label: "2025학년도 수능",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
    },
    {
      id: "2025-09", year: 2025, round: "9월", label: "2025학년도 9월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2025-06", year: 2025, round: "6월", label: "2025학년도 6월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2024-suneung", year: 2024, round: "수능", label: "2024학년도 수능",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
    },
    {
      id: "2024-09", year: 2024, round: "9월", label: "2024학년도 9월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
    },
    {
      id: "2024-06", year: 2024, round: "6월", label: "2024학년도 6월",
      source: "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
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
      help: R`직선 \(y=5\)가 접한다는 것은 극댓값이나 극솟값이 \(5\)라는 뜻이다. \(f'(x)=3(x+3a)(x-a)\)이고 \(a>0\)이므로 극솟값은 \(f(a)=-5a^{3}+4<4\)라 \(5\)가 될 수 없다. 남는 것은 극댓값 \(f(-3a)=27a^{3}+4=5\) 하나뿐이다.`
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
      help: R`세 점이 모두 \(x=t\) 위에 세로로 놓이고 점근선은 \(y=-2\)다. \(\overline{\mathrm{AB}}=a^{t}-2\), \(\overline{\mathrm{BC}}=2\)이므로 \(a^{t}=4\)가 곧바로 나온다. 삼각형 \(\mathrm{AOC}\)의 밑변은 세로 선분 \(\overline{\mathrm{AC}}=a^{t}\)이고 높이가 \(t\)다.`
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
      help: R`위치는 \(\int_{0}^{t}v\), 움직인 거리는 \(\int_{0}^{t}|v|\)다. ㄴ은 계산할 것이 없다. \(t^{2}-3t+4\)는 판별식이 음수라 속도의 부호가 바뀌지 않고, 그러면 운동 방향도 바뀌지 않는다.`
    },
    {
      id: "2026-suneung-12", exam: "2026-suneung", no: 12, score: 4,
      units: ["m1-seq"], memo: "등비수열의 항 사이 관계",
      body: R`등비수열 \(\{a_{n}\}\)이
        \[2\left(a_{1}+a_{4}+a_{7}\right)=a_{4}+a_{7}+a_{10}=6\]
        을 만족시킬 때, \(a_{10}\)의 값은?`,
      choices: [R`\(\dfrac{22}{7}\)`, R`\(\dfrac{24}{7}\)`, R`\(\dfrac{26}{7}\)`, R`\(\dfrac{30}{7}\)`, R`\(\dfrac{32}{7}\)`],
      answer: 2,
      help: R`\(a_{4}+a_{7}+a_{10}\)은 \(a_{1}+a_{4}+a_{7}\)에 \(r^{3}\)을 곱한 것이다. 이걸 보면 \(r^{3}=2\)와 \(a_{1}+a_{4}+a_{7}=3\)이 한 줄에 나온다.`
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
      help: R`두 직선과 \(y\)축이 둘러싸는 도형은 삼각형이라 적분이 필요 없다. \(g'(1)\)은 곱의 미분으로 \(x=1\)에서의 값만 내면 되므로 \(g\)를 전개할 일도 없다.`
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
      help: R`\(\overline{\mathrm{AB}}=3\)을 \(2:1\)로 나누므로 원의 반지름이 \(2\)이고, 따라서 \(\overline{\mathrm{AE}}=2\)다. \(\angle\mathrm{HCG}=\angle\mathrm{BAC}\)는 길이가 아니라 원주각 조건이라 사인법칙으로 넘어가라는 신호다.`
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
      help: R`\(h'(x)=g(x)-f(x)\)다. 극값이 오직 하나라는 말은 이 차가 부호를 딱 한 번만 바꾼다는 뜻이다.`
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
      help: R`\(a_{n+1}=\sum^{n+1}-\sum^{n}\)을 그대로 빼면 (가)가 \(\frac{n}{3}\)으로 나온다. 그리고 ㉠에 \(n=2k+1\)을 넣으면 \(2a_{2k+1}+a_{2k+2}=2k+1\)이 되어, 다섯 항의 묶음이 \(3+5+7+9+11\)이 된다.`
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
      help: R`\(x=t\)에서 이어지려면 \(-f(t)=f(t)\), 곧 \(f(t)=0\)이다. 그리고 (가)에서 \(\frac{g(x)}{x(x-2)}\)의 극한이 어디서나 있으려면 \(g\)가 \(x\)와 \(x-2\)를 인수로 가져야 한다.`
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
      help: R`\(\mathrm{A}(a,b)\)를 \(y=x\)에 대칭하면 \((b,a)\)이고, 이 점이 직선 \(\mathrm{OB}\) 위에 있다는 것이 첫 식이다. 중점 조건은 \(x\)에서 하나, \(y\)에서 하나로 식이 두 개다.`
    },
    {
      id: "2027-09-9", exam: "2027-09", no: 9, score: 4,
      units: ["m2-diff"], memo: "속도가 같아지는 순간의 가속도",
      body: R`수직선 위를 움직이는 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)가 있다. 시각이
        \(t\,(t\ge 0)\)일 때 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 위치가 각각
        \[x_{1}=4t^{3}-t^{2}-11t,\qquad x_{2}=2t^{2}+7t+3\]
        이다. 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 속도가 같아지는 순간 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의
        가속도를 각각 \(p\), \(q\)라 할 때, \(p-q\)의 값은?`,
      choices: [R`\(30\)`, R`\(33\)`, R`\(36\)`, R`\(39\)`, R`\(42\)`],
      answer: 1,
      help: R`속도가 같아지는 때는 \(12t^{2}-2t-11=4t+7\), 곧 \(2t^{2}-t-3=0\)에서 \(t=\frac{3}{2}\)다. 가속도는 각각 \(24t-2\)와 \(4\)로 상수에 가까워 바로 값이 나온다.`
    },
    {
      id: "2027-09-10", exam: "2027-09", no: 10, score: 4,
      units: ["m1-explog"], memo: "지수함수 두 개와 가로 선분의 길이",
      body: R`상수 \(a\,(a>1)\)에 대하여 직선 \(y=7\)이 두 곡선
        \(y=16a^{x}\), \(y=\dfrac{1}{4}a^{x}\)과 만나는 점을 각각 \(\mathrm{A}\), \(\mathrm{B}\)라 하자.
        \(\overline{\mathrm{AB}}=4\)일 때, \(a\)의 값은?`,
      choices: [R`\(\sqrt{2}\)`, R`\(2\)`, R`\(2\sqrt{2}\)`, R`\(4\)`, R`\(4\sqrt{2}\)`],
      answer: 3,
      help: R`두 점의 \(y\)좌표가 \(7\)로 같으니 \(\overline{\mathrm{AB}}\)는 \(x\)좌표의 차다. 두 로그를 빼면 한 덩어리로 묶여 \(\log_{a}64=4\)가 된다.`
    },
    {
      id: "2027-09-11", exam: "2027-09", no: 11, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "적분식으로 주어진 다항함수",
      body: R`다항함수 \(f(x)\)가 모든 실수 \(x\)에 대하여
        \[\int_{-1}^{x} f(t)\,dt = xf(x)-2x^{3}-3x^{2}+6\]
        을 만족시킬 때, \(f(0)\)의 값은?`,
      choices: [R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`, R`\(10\)`],
      answer: 3,
      help: R`양변을 \(x\)로 미분하면 오른쪽에서 \(f(x)\)가 지워져 \(xf'(x)=6x^{2}+6x\), 곧 \(f'(x)=6x+6\)만 남는다. 적분상수는 원래 식에 아래끝 \(x=-1\)을 넣어 \(f(-1)=5\)로 잡는다.`
    },
    {
      id: "2027-09-12", exam: "2027-09", no: 12, score: 4,
      units: ["m1-trig"], memo: "외접원과 원주각으로 길이 구하기",
      body: R`그림과 같이 \(\overline{\mathrm{AB}}=4\), \(\overline{\mathrm{AC}}=5\), \(\cos(\angle\mathrm{BAC})=\dfrac{1}{8}\)인
        삼각형 \(\mathrm{ABC}\)의 외접원에서 점 \(\mathrm{A}\)를 포함하지 않는 호 \(\mathrm{BC}\)
        위에 점 \(\mathrm{D}\)가 있다. \(\sin(\angle\mathrm{BCD})=\dfrac{\sqrt{14}}{4}\)일 때, 선분 \(\mathrm{BD}\)의
        길이는?`,
      figure: "2027-09-12.webp",
      choices: [R`\(2\sqrt{7}\)`, R`\(\dfrac{12\sqrt{5}}{5}\)`, R`\(\dfrac{7\sqrt{10}}{4}\)`, R`\(4\sqrt{2}\)`, R`\(\dfrac{9\sqrt{10}}{5}\)`],
      answer: 4,
      help: R`코사인법칙으로 \(\overline{\mathrm{BC}}=6\)이 먼저 나온다. \(\angle\mathrm{BCD}\)는 호 \(\mathrm{BD}\)에 대한 원주각이므로 \(\overline{\mathrm{BD}}=2R\sin(\angle\mathrm{BCD})\)로 외접원 반지름만 있으면 끝난다.`
    },
    {
      id: "2027-09-13", exam: "2027-09", no: 13, score: 4,
      units: ["m2-integ"], memo: "정적분과 절댓값, 일차함수 더하기",
      body: R`최고차항의 계수가 \(6\)인 이차함수 \(f(x)\)가
        \[f(0)=0,\qquad \int_{0}^{2} f(x)\,dx = 4\]
        를 만족시킨다. &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(\displaystyle\int_{0}^{2}\bigl|f(x)\bigr|\,dx = 6\)`,
        R`ㄴ. \(g(1)=0\)인 일차함수 \(g(x)\)에 대하여 \(\displaystyle\int_{0}^{2}\bigl(f(x)+g(x)\bigr)dx = 4\)이다.`,
        R`ㄷ. \(k>6\)인 각각의 실수 \(k\)에 대하여, \(\displaystyle\int_{0}^{2}\bigl(f(x)+h(x)\bigr)dx = 4\)와 \(\displaystyle\int_{0}^{2}\bigl|f(x)+h(x)\bigr|dx = k\)를 동시에 만족시키는 일차함수 \(h(x)\)가 존재한다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 5,
      help: R`조건에서 \(f(x)=6x(x-1)\)이 정해진다. 그리고 \(\int_{0}^{2}\)의 값이 \(0\)이 되는 일차함수는 \(x-1\)의 상수배뿐이라, ㄴ과 ㄷ이 같은 열쇠로 풀린다.`
    },
    {
      id: "2027-09-14", exam: "2027-09", no: 14, score: 4,
      units: ["m1-seq"], memo: "경우가 갈리는 함수의 합이 자연수가 될 조건",
      body: R`실수 전체의 집합에서 정의된 함수
        \[f(x)=\begin{cases}5 &amp; (x\text{가 자연수가 아닌 경우})\\[2pt] \dfrac{1}{x} &amp; (x\text{가 자연수인 경우})\end{cases}\]
        에 대하여, \(\displaystyle\sum_{k=1}^{n}\frac{f\left(\sqrt[3]{k}\right)}{5f(k)}\)의 값이 자연수가 되도록 하는
        \(300\) 이하의 자연수 \(n\)의 개수는?`,
      choices: [R`\(135\)`, R`\(144\)`, R`\(153\)`, R`\(162\)`, R`\(171\)`],
      answer: 5,
      help: R`\(k\)가 세제곱수가 아니면 항이 \(k\)로 정수이고, 세제곱수 \(m^{3}\)이면 항이 \(\frac{m^{2}}{5}\)다. 그러니 \(M=\left\lfloor\sqrt[3]{n}\right\rfloor\)로 두고 \(\sum_{m=1}^{M}m^{2}\)이 \(5\)의 배수인지만 따지면 된다.`
    },
    {
      id: "2027-09-15", exam: "2027-09", no: 15, score: 4,
      units: ["m2-limit"], memo: "분모가 0이 되는 자리와 극한의 존재",
      body: R`최고차항의 계수가 \(1\)인 이차함수 \(f(x)\)가 다음 조건을
        만족시킬 때, \(f(2)\)의 값은?`,
      note: [
        R`모든 실수 \(a\)에 대하여 \(\displaystyle\lim_{x\to a}\frac{(2x+1)f(x)}{f(x)+f(x-t)}\)의 값이 존재하도록 하는 양수 \(t\)의 집합은 \(\left\{t\ \middle|\ t\ge\dfrac{3}{2}\right\}\)이다.`
      ],
      choices: [R`\(\dfrac{5}{2}\)`, R`\(5\)`, R`\(\dfrac{15}{2}\)`, R`\(10\)`, R`\(\dfrac{25}{2}\)`],
      answer: 4,
      help: R`분모 \(f(x)+f(x-t)\)는 \(x\)의 이차식이고, 판별식이 음수면 어느 \(a\)에서도 극한이 있다. 경계인 \(t=\frac{3}{2}\)가 집합에 들어 있으니, 그때는 분모의 중근이 분자 \(2x+1\)의 근인 \(-\frac{1}{2}\)과 겹쳐야 한다.`
    },
    {
      id: "2027-09-20", exam: "2027-09", no: 20, score: 4,
      units: ["m1-trig"], memo: "사인과 코사인 곡선의 교점과 넓이의 비",
      body: R`\(0\le x\le 2\pi\)에서 정의된 두 함수
        \[f(x)=\sin x,\qquad g(x)=-k\cos x\quad(k>1)\]
        이 있다. 두 곡선 \(y=f(x)\)와 \(y=g(x)\)가 제1사분면에서
        만나는 점을 \(\mathrm{A}\), 제4사분면에서 만나는 점을 \(\mathrm{B}\)라 하자.
        점 \(\mathrm{A}\)를 지나고 \(x\)축에 평행한 직선이 곡선 \(y=g(x)\)와 만나는
        점 중 \(\mathrm{A}\)가 아닌 점을 \(\mathrm{C}\)라 하고, 점 \(\mathrm{B}\)를 지나고 \(x\)축에
        평행한 직선이 곡선 \(y=g(x)\)와 만나는 점 중 \(\mathrm{B}\)가 아닌 점을
        \(\mathrm{D}\)라 하자. 다음은
        \[(\text{삼각형 CDB의 넓이}):(\text{삼각형 AOD의 넓이})=14:5\]
        일 때, 상수 \(k\)의 값을 구하는 과정의 일부이다. (단, \(\mathrm{O}\)는 원점이다.)`,
      bodyAfter: R`<div class="proof-box">
        <p>두 곡선 \(y=f(x)\)와 \(y=g(x)\)는 그림과 같다.</p>
        <div class="figure"><img src="assets/figures/2027-09-20.webp" alt="2027학년도 9월 모의평가 20번 그림" loading="lazy"></div>
        <p>점 \(\mathrm{A}\)의 \(x\)좌표를 \(a\)라 하면 두 점 \(\mathrm{B}\), \(\mathrm{D}\)의 좌표는 다음과 같다.</p>
        \[\mathrm{B}\left(\fbox{(가)},\ -\sin a\right),\quad \mathrm{D}\left(\fbox{(나)},\ -\sin a\right)\]
        <p>삼각형 \(\mathrm{CDB}\)의 넓이는</p>
        \[\frac{1}{2}\times\overline{\mathrm{DB}}\times 2\sin a\]
        <p>이고,</p>
        \[(\text{삼각형 AOD의 넓이})=\frac{5}{14}\times(\text{삼각형 CDB의 넓이})\]
        <p>이므로 \(a=\fbox{(다)}\)이다. 따라서</p>
        \[k=-\tan\left(\fbox{(다)}\right)\]
        <p>이다.</p>
        </div>
        위의 (가), (나)에 알맞은 식을 각각 \(p(a)\), \(q(a)\)라 하고, (다)에
        알맞은 수를 \(\alpha\)라 하자. \(3\times\dfrac{p(\alpha)}{q(\alpha)}\)의 값을 구하시오.`,
      short: true,
      answer: 17,
      help: R`교점은 \(\sin x=-k\cos x\), 곧 \(\tan x=-k\)에서 나온다. 그래서 \(\mathrm{B}\)의 \(x\)좌표는 \(a+\pi\)이고, \(\mathrm{D}\)는 \(g\)의 대칭성으로 \(\pi-a\)에 놓인다.`
    },
    {
      id: "2027-09-21", exam: "2027-09", no: 21, score: 4,
      units: ["m2-diff"], memo: "꺾인 두 함수를 더해 미분가능하게 만들기",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)가 다음 조건을
        만족시킬 때, \(f(0)\)의 최댓값과 최솟값의 곱을 구하시오.`,
      note: [
        R`(가) 방정식 \(f(x)=0\)의 서로 다른 실근의 개수는 \(2\)이다.`,
        R`(나) \(g(x)=\begin{cases}-f(x) &amp; (f(x)\ge 0)\\ 7f(x) &amp; (f(x)&lt;0)\end{cases}\)일 때, 어떤 실수 \(a\)에 대하여 함수 \(h(x)=g(x)+\bigl|(x-1)(x-a)(x-4+a)\bigr|\)가 실수 전체의 집합에서 미분가능하다.`
      ],
      short: true,
      answer: 12,
      help: R`\(g\)는 \(f\)의 부호가 바뀌는 자리에서 꺾인다. (가)에서 실근이 두 개라는 것은 삼차함수가 중근을 하나 갖는다는 뜻이고, 중근에서는 부호가 바뀌지 않아 꺾이지도 않는다.`
    },
    {
      id: "2027-09-22", exam: "2027-09", no: 22, score: 4,
      units: ["m1-explog"], memo: "지수·로그 곡선과 포물선, 직사각형",
      body: R`상수 \(a\,(a>1)\)과 직사각형 \(\mathrm{ABCD}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 두 곡선 \(y=a^{x}\), \(y=2x^{2}-\dfrac{7}{2}x+3\)은 모두 점 \(\mathrm{A}\)와 점 \(\mathrm{B}\)를 지난다.`,
        R`(나) 두 곡선 \(y=\log_{a}\left(x-\dfrac{1}{4}\right)-\dfrac{1}{4}\), \(y=2x^{2}-\dfrac{15}{2}x+\dfrac{15}{2}\)는 모두 점 \(\mathrm{C}\)와 점 \(\mathrm{D}\)를 지난다.`
      ],
      bodyAfter: R`\(a^{3}=\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인
        자연수이다.)`,
      short: true,
      answer: 97,
      help: R`(나)의 로그 곡선은 \(y=a^{x}\)를 직선 \(y=x-\frac{1}{4}\)에 대하여 대칭이동한 것이고, 두 포물선은 \((1,-1)\)만큼 평행이동한 관계다.`
    },
    {
      id: "2027-06-9", exam: "2027-06", no: 9, score: 4,
      units: ["m2-integ"], memo: "속도가 다른 두 점의 위치가 같아지는 때",
      body: R`시각 \(t=0\)일 때 동시에 원점을 출발하여 수직선 위를
        움직이는 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)가 있다. 시각이 \(t\,(t\ge 0)\)일 때
        두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 속도가 각각
        \[v_{1}(t)=t^{2}-t,\qquad v_{2}(t)=t\]
        이다. 출발한 후 시각 \(t=k\)에서 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 위치가 같아질 때,
        양수 \(k\)의 값은?`,
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 3,
      help: R`둘 다 원점에서 출발했으니 위치가 같아진다는 것은 \(\int_{0}^{k}\bigl(v_{1}-v_{2}\bigr)dt=0\)이라는 뜻이다. 속도가 같아지는 때와 다르다.`
    },
    {
      id: "2027-06-10", exam: "2027-06", no: 10, score: 4,
      units: ["m1-explog"], memo: "밑이 다른 로그식 두 개",
      body: R`두 양수 \(a\), \(b\)가
        \[\log_{9}a+\log_{3}b=2,\qquad \log_{3}a=8\log_{9}b\]
        를 만족시킬 때, \(\dfrac{a}{b}\)의 값은?`,
      choices: [R`\(1\)`, R`\(3\)`, R`\(9\)`, R`\(27\)`, R`\(81\)`],
      answer: 3,
      help: R`\(\log_{9}x=\frac{1}{2}\log_{3}x\)로 밑을 \(3\)으로 맞춘다. 구할 것이 \(\frac{a}{b}\)이므로 \(\log_{3}a\)와 \(\log_{3}b\)를 따로 구하지 않고 차만 구하면 된다.`
    },
    {
      id: "2027-06-11", exam: "2027-06", no: 11, score: 4,
      units: ["m2-limit"], memo: "극한이 있고 없음으로 일차함수 정하기",
      body: R`일차함수 \(f(x)\)에 대하여
        \[\lim_{x\to a}\frac{f(x+2)}{x\bigl(f(x)-3\bigr)}\]
        의 값이 \(a=0\)일 때 존재하고 \(a=3\)일 때 존재하지 않는다.
        \(f(4)\)의 값은?`,
      choices: [R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`, R`\(10\)`],
      answer: 1,
      help: R`분모에 \(x\)가 곱해져 있어 \(x=0\)에서 반드시 \(0\)이 되는데도 극한이 있으니 분자가 \(0\), 곧 \(f(2)=0\)이다. \(a=3\)에서는 극한이 없으니 그 자리에서 분모만 \(0\)이어야 하고, 그래서 \(f(3)=3\)이다.`
    },
    {
      id: "2027-06-12", exam: "2027-06", no: 12, score: 4,
      units: ["m1-seq"], memo: "등비수열의 조건식 두 개",
      body: R`공비가 양수인 등비수열 \(\{a_{n}\}\)이
        \[2a_{1}\left(a_{1}+a_{3}\right)=5a_{2}\left(a_{1}+a_{2}\right)=20\]
        을 만족시킬 때, \(a_{1}\times a_{6}\)의 값은?`,
      choices: [R`\(\dfrac{1}{27}\)`, R`\(\dfrac{1}{9}\)`, R`\(\dfrac{1}{3}\)`, R`\(1\)`, R`\(3\)`],
      answer: 1,
      help: R`두 식이 같은 값 \(20\)이므로 나누면 \(a_{1}^{2}\)이 지워지고 공비만 남는다. 구할 것도 \(a_{1}\times a_{6}=a_{1}^{2}r^{5}\)라 \(a_{1}\)과 \(r\)을 따로 구할 필요가 없다.`
    },
    {
      id: "2027-06-13", exam: "2027-06", no: 13, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "넓이 함수의 도함수",
      body: R`두 다항함수 \(f(x)\)와 \(g(x)\)가 모든 실수 \(x\)에 대하여
        \(f(x)>g(x)\)를 만족시키고, \(f(1)=g(1)+1\)이다.
        양수 \(t\)에 대하여 두 곡선 \(y=f(x)\), \(y=g(x)\)와
        두 직선 \(x=0\), \(x=t\)로 둘러싸인 도형의 넓이를 \(S(t)\)라 할 때,
        \[S'(t)=t^{2}-2t+a\]
        이다. &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은? (단, \(a\)는 상수이다.)`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(a=1\)`,
        R`ㄴ. \(S(3)=6\)`,
        R`ㄷ. 두 곡선 \(y=f(x)\), \(y=g(x)\)와 두 직선 \(x=-2\), \(x=2\)로 둘러싸인 도형의 넓이는 \(S(4)\)의 값과 같다.`
      ],
      choices: [R`ㄴ`, R`ㄷ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`],
      answer: 5,
      help: R`\(f>g\)이므로 \(S(t)=\int_{0}^{t}\bigl(f-g\bigr)dx\)이고, 미분하면 \(S'(t)=f(t)-g(t)\)다. 곧 \(t^{2}-2t+a\)가 두 함수의 차 그 자체이고, \(f(1)-g(1)=1\)에서 \(a\)가 나온다. ㄷ의 구간은 \(0\)이 아니라 \(-2\)에서 시작하므로 \(S\)로 바로 옮겨 쓸 수 없다.`
    },
    {
      id: "2027-06-14", exam: "2027-06", no: 14, score: 4,
      units: ["m1-trig"], memo: "곱이 0인 삼각방정식의 실근 개수",
      body: R`양수 \(a\)와 자연수 \(b\)에 대하여 \(0\le x\le 2\)일 때 \(x\)에 대한 방정식
        \[\left(\cos(b\pi x)-\frac{1}{2}\right)\left(a\cos(b\pi x)+\frac{a+2}{2}\right)=0\]
        의 서로 다른 실근의 개수는 \(15\)이다. \(a+b\)의 값은?`,
      choices: [R`\(6\)`, R`\(\dfrac{13}{2}\)`, R`\(7\)`, R`\(\dfrac{15}{2}\)`, R`\(8\)`],
      answer: 3,
      help: R`\(\cos(b\pi x)=\frac{1}{2}\)과 \(\cos(b\pi x)=-\frac{a+2}{2a}\)로 갈린다. \(0\le x\le 2\)에서 코사인이 \(b\)바퀴 돌므로 앞의 것은 근이 \(2b\)개다. 전체가 홀수 \(15\)가 되려면 뒤의 값이 \(-1\)이 되어 한 바퀴에 근이 하나여야 한다.`
    },
    {
      id: "2027-06-15", exam: "2027-06", no: 15, score: 4,
      units: ["m2-integ"], memo: "절댓값을 씌운 적분이 달라지는 구간",
      body: R`상수항이 \(0\)인 삼차함수 \(f(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(\displaystyle\int_{p}^{p+3}\bigl|f(x)\bigr|dx \ne \left|\int_{p}^{p+3}f(x)\,dx\right|\)가 되도록 하는 모든 실수 \(p\)의 값의 범위는 \(0&lt;p&lt;3\)이다.`,
        R`(나) \(\displaystyle\int_{0}^{3}\bigl|f(x)+q\bigr|dx \ne \left|\int_{0}^{3}\bigl(f(x)+q\bigr)dx\right|\)가 되도록 하는 모든 실수 \(q\)의 값의 범위는 \(0&lt;q&lt;1\)이다.`
      ],
      bodyAfter: R`\(f(6)\)의 값은?`,
      choices: [R`\(18\)`, R`\(21\)`, R`\(24\)`, R`\(27\)`, R`\(30\)`],
      answer: 4,
      help: R`절댓값을 씌운 적분과 씌우지 않은 적분이 달라지는 것은 그 구간 안에서 함수의 부호가 바뀔 때뿐이다. 그러니 (가)는 "길이 \(3\)인 구간 \([p,\,p+3]\) 안에 \(f\)의 부호가 바뀌는 자리가 들어간다"가 \(0<p<3\)일 때만 참이라는 말이다.`
    },
    {
      id: "2027-06-20", exam: "2027-06", no: 20, score: 4,
      units: ["m1-explog"], memo: "지수와 로그 그래프의 교점, 과정 채우기",
      body: R`그림과 같이 \(1\)보다 큰 실수 \(b\)에 대하여
        두 함수 \(f(x)=b^{x}\)과 \(g(x)=-\log_{b}x\)의 그래프가
        제1사분면에서 만나는 점 \(\mathrm{P}\)의 좌표를 \((\alpha,\,\beta)\)라 하자.`,
      figure: "2027-06-20.webp",
      bodyAfter: R`다음은 \(\alpha\beta^{3}=1\)일 때, 직선 \(\mathrm{OP}\)의 기울기 \(m\)에 대하여
        \(g(m)\)의 값을 구하는 과정이다. (단, \(\mathrm{O}\)는 원점이다.)
        <div class="proof-box">
        <p>제1사분면에 있는 점 \(\mathrm{P}(\alpha,\,\beta)\)는 두 곡선 \(y=f(x)\), \(y=g(x)\) 위의 점이므로, 두 양수 \(\alpha\), \(\beta\)가</p>
        \[\beta=b^{\alpha},\qquad \beta=-\log_{b}\alpha\]
        <p>를 만족시킨다.</p>
        <p>\(\alpha\beta^{3}=1\)이고 \(\alpha=\log_{b}\beta\), \(\beta=-\log_{b}\alpha\)이므로</p>
        \[3\alpha-\beta=3\log_{b}\beta+\log_{b}\alpha=\log_{b}\left(\alpha\beta^{3}\right)=0\]
        <p>이다. 그러므로 \(m=\dfrac{\beta}{\alpha}=\fbox{(가)}\)이다.</p>
        <p>\(\beta^{4}=m\alpha\beta^{3}=m\)이므로 \(\beta=\fbox{(나)}\)이다.</p>
        <p>\(b=\alpha^{-\frac{1}{\beta}}\)이고 \(\alpha=\dfrac{\beta}{m}\)이므로</p>
        \[g(m)=-\log_{b}m=\frac{\beta}{\log_{m}\alpha}=\frac{\beta}{-1+\log_{m}\beta}=\fbox{(다)}\]
        <p>이다.</p>
        </div>
        위의 (가), (나), (다)에 알맞은 수를 각각 \(p\), \(q\), \(r\)이라 할 때,
        \((p\times q\times r)^{2}\)의 값을 구하시오.`,
      short: true,
      answer: 48,
      help: R`\(\beta=b^{\alpha}\)를 로그로 뒤집으면 \(\alpha=\log_{b}\beta\)다. 그러면 \(\alpha\beta^{3}=1\)에 밑이 \(b\)인 로그를 취해 \(3\alpha-\beta=0\)이 나오고, 여기서 \(m=\frac{\beta}{\alpha}\)가 곧바로 정해진다.`
    },
    {
      id: "2027-06-21", exam: "2027-06", no: 21, score: 4,
      units: ["m2-diff", "m2-limit"], memo: "최댓값 함수가 불연속이 되는 자리",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)가 있다.
        실수 \(t\)에 대하여
        \[f(\alpha)=f'(t)-4t^{2}+4\]
        를 만족시키는 실수 \(\alpha\)의 최댓값을 \(g(t)\)라 하자. 함수 \(g(t)\)가
        \(t=3\)에서만 불연속이고 \(g(3)=1\)일 때, \(f(2)\)의 값을 구하시오.`,
      short: true,
      answer: 11,
      help: R`오른쪽 \(f'(t)-4t^{2}+4\)는 \(t\)만의 식이니 그냥 어떤 높이 \(k\)로 보면 된다. 그러면 \(g(t)\)는 가로선 \(y=k\)가 삼차함수 \(y=f(x)\)와 만나는 가장 오른쪽 \(x\)이고, \(k\)가 극댓값을 지나는 순간 그 값이 뛴다.`
    },
    {
      id: "2027-06-22", exam: "2027-06", no: 22, score: 4,
      units: ["m1-seq"], memo: "규칙이 여러 갈래인 수열에서 값이 같은 항 세기",
      body: R`수열 \(\{a_{n}\}\)은 \(a_{1}=1\), \(a_{3}=4\)이고, 모든 자연수 \(n\)에 대하여
        \[a_{2n}=a_{n}+1,\]
        \[a_{4n+3}=a_{4n+1}=a_{n}+4\]
        를 만족시킨다. \(a_{k}=10\)을 만족시키는 자연수 \(k\)의 개수를
        구하시오.`,
      short: true,
      answer: 32,
      help: R`규칙이 \(n\)을 반이나 넷으로 줄이는 쪽으로만 되어 있어, 값이 \(1\)에서 \(10\)까지 오르는 데 \(+1\)과 \(+4\)를 몇 번씩 썼는지 세는 문제가 된다. 출발점은 \(a_{1}=1\)과 \(a_{3}=4\) 둘이다.`
    },
    {
      id: "2026-09-9", exam: "2026-09", no: 9, score: 4,
      units: ["m2-integ"], memo: "부정적분 두 개 사이의 관계",
      body: R`다항함수 \(f(x)\)의 한 부정적분을 \(F(x)\)라 하고,
        함수 \(2f(x)+1\)의 한 부정적분을 \(G(x)\)라 하자.
        \(G(3)=2F(3)\)일 때, \(G(5)-2F(5)\)의 값은?`,
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 2,
      help: R`\(2f(x)+1\)의 부정적분은 \(2F(x)+x+C\)다. 그러면 \(G(x)-2F(x)=x+C\)라는 일차식 하나로 줄어들어, \(f\)나 \(F\)가 무엇인지 몰라도 된다. \(G(3)=2F(3)\)이 \(C\)를 정해 준다.`
    },
    {
      id: "2026-09-10", exam: "2026-09", no: 10, score: 4,
      units: ["m1-seq"], memo: "부호가 번갈아 붙은 부분합의 합",
      body: R`모든 항이 양수인 등비수열 \(\{a_{n}\}\)의 첫째항부터
        제\(n\)항까지의 합을 \(S_{n}\)이라 하자.
        \[a_{2}=1,\qquad \sum_{k=1}^{6}(-1)^{k}S_{k}=21\]
        일 때, \(S_{2}+S_{7}\)의 값은?`,
      choices: [R`\(61\)`, R`\(63\)`, R`\(65\)`, R`\(67\)`, R`\(69\)`],
      answer: 3,
      help: R`\(-S_{1}+S_{2}-S_{3}+S_{4}-S_{5}+S_{6}\)을 두 개씩 묶으면 \(\left(S_{2}-S_{1}\right)+\left(S_{4}-S_{3}\right)+\left(S_{6}-S_{5}\right)\), 곧 \(a_{2}+a_{4}+a_{6}=21\)이 된다. \(a_{2}=1\)이니 \(1+r^{2}+r^{4}=21\)에서 공비가 정해진다.`
    },
    {
      id: "2026-09-11", exam: "2026-09", no: 11, score: 4,
      units: ["m2-integ"], memo: "속도의 부호가 바뀌는 자리",
      body: R`시각 \(t=0\)일 때 원점에서 출발하여 수직선 위를 움직이는
        점 \(\mathrm{P}\)가 있다. 시각이 \(t\,(t\ge 0)\)일 때 점 \(\mathrm{P}\)의 속도 \(v(t)\)가
        \[v(t)=3t^{2}-10t+7\]
        이다. &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. 시각 \(t=1\)일 때 점 \(\mathrm{P}\)의 운동 방향이 바뀐다.`,
        R`ㄴ. 시각 \(t=1\)일 때 점 \(\mathrm{P}\)의 위치는 \(3\)이다.`,
        R`ㄷ. 시각 \(t=0\)에서 \(t=2\)까지 점 \(\mathrm{P}\)가 움직인 거리는 \(4\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 5,
      help: R`\(v(t)=(3t-7)(t-1)\)로 인수분해된다. 운동 방향은 속도의 부호가 바뀌는 \(t=1\)에서만 바뀌고, 움직인 거리는 그 자리에서 구간을 끊어 각각의 절댓값을 더해야 한다.`
    },
    {
      id: "2026-09-12", exam: "2026-09", no: 12, score: 4,
      units: ["m1-explog"], memo: "지수 곡선 위 두 점과 이등변삼각형",
      body: R`상수 \(a\,(a>1)\)과 양수 \(t\)에 대하여 곡선 \(y=a^{x}\)과
        두 직선 \(x=t\), \(x=2t\)가 만나는 점을 각각 \(\mathrm{A}\), \(\mathrm{B}\)라 하고,
        점 \(\mathrm{B}\)에서 \(x\)축에 내린 수선의 발을 \(\mathrm{C}\)라 하자.
        \(\overline{\mathrm{AB}}=\overline{\mathrm{AC}}\)이고 삼각형 \(\mathrm{ACB}\)의 넓이가 \(8\)일 때,
        \(a\times t\)의 값은?`,
      choices: [R`\(2^{\frac{9}{4}}\)`, R`\(2^{\frac{23}{8}}\)`, R`\(2^{\frac{7}{2}}\)`, R`\(2^{\frac{33}{8}}\)`, R`\(2^{\frac{19}{4}}\)`],
      answer: 1,
      help: R`\(\mathrm{B}\)와 \(\mathrm{C}\)는 \(x\)좌표가 같아 \(\overline{\mathrm{BC}}\)가 세로 선분이고 길이가 \(a^{2t}\), 삼각형의 높이는 \(t\)다. \(\overline{\mathrm{AB}}=\overline{\mathrm{AC}}\)를 제곱하면 가로 차 \(t^{2}\)이 양쪽에서 지워져 \(\left(a^{2t}-a^{t}\right)^{2}=a^{2t}\)만 남고, 여기서 \(a^{t}=2\)가 나온다.`
    },
    {
      id: "2026-09-13", exam: "2026-09", no: 13, score: 4,
      units: ["m2-limit"], memo: "분모가 0이 되지 않게 하는 정수 세기",
      body: R`함수 \(f(x)=x^{2}+6x+12\)에 대하여 다음 조건을 만족시키는
        모든 정수 \(k\)의 개수는?`,
      note: [
        R`모든 실수 \(a\)에 대하여 \(\displaystyle\lim_{x\to a}\frac{x^{2}}{\bigl(f(x)\bigr)^{2}-k(x+2)f(x)}\)의 값이 존재한다.`
      ],
      choices: [R`\(5\)`, R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`],
      answer: 4,
      help: R`분모는 \(f(x)\bigl(f(x)-k(x+2)\bigr)\)로 묶인다. \(f(x)=x^{2}+6x+12\)는 판별식이 \(-12\)라 어디서도 \(0\)이 아니므로, 분모가 \(0\)이 되는 자리는 \(x^{2}+(6-k)x+(12-2k)=0\)의 근뿐이다. 이 이차식이 실근을 갖지 않으면 언제나 극한이 있고, 실근을 가질 때는 분자 \(x^{2}\)의 근인 \(0\)과 겹쳐야 하므로 중근이 \(0\)인 경우만 살아남는다.`
    },
    {
      id: "2026-09-14", exam: "2026-09", no: 14, score: 4,
      units: ["m1-trig"], memo: "탄젠트 곡선의 주기와 삼각형 넓이",
      body: R`양수 \(k\)에 대하여 집합 \(\left\{x\ \middle|\ 0\le x<\dfrac{3k\pi}{2},\ x\ne\dfrac{k\pi}{2}\right\}\)에서
        정의된 함수 \(f(x)=\tan\dfrac{x}{k}\)가 있다. 점 \(\mathrm{P}(0,\,p)\,(p>0)\)을 지나며
        \(x\)축에 평행한 직선이 함수 \(y=f(x)\)의 그래프와 만나는
        두 점을 \(\mathrm{A}\), \(\mathrm{B}\,\left(\overline{\mathrm{PA}}<\overline{\mathrm{PB}}\right)\)라 하고,
        직선 \(y=-p\)가 함수 \(y=f(x)\)의 그래프와 만나는 점을 \(\mathrm{C}\)라
        하자. \(\overline{\mathrm{AB}}=3\overline{\mathrm{PA}}\)이고 삼각형 \(\mathrm{OCB}\)의 넓이가
        \(\dfrac{5\pi}{3}\)일 때, \(k+p\)의 값은? (단, \(\mathrm{O}\)는 원점이다.)`,
      figure: "2026-09-14.webp",
      choices: [R`\(\dfrac{4\sqrt{3}}{3}\)`, R`\(\dfrac{13\sqrt{3}}{9}\)`, R`\(\dfrac{14\sqrt{3}}{9}\)`, R`\(\dfrac{5\sqrt{3}}{3}\)`, R`\(\dfrac{16\sqrt{3}}{9}\)`],
      answer: 3,
      help: R`\(f(x)=\tan\frac{x}{k}\)의 주기는 \(k\pi\)이고, 가로선 하나가 만나는 이웃한 두 점은 정확히 한 주기만큼 떨어져 있다. 그러니 \(\overline{\mathrm{AB}}=k\pi\)이고, \(\overline{\mathrm{AB}}=3\overline{\mathrm{PA}}\)에서 \(\overline{\mathrm{PA}}=\frac{k\pi}{3}\)이다. 곧 \(\mathrm{A}\)의 \(x\)좌표가 \(\frac{k\pi}{3}\)이므로 \(p=\tan\frac{\pi}{3}\)이 된다.`
    },
    {
      id: "2026-09-15", exam: "2026-09", no: 15, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "절댓값 두 개의 차를 적분한 함수의 극값",
      body: R`최고차항의 계수가 양수이고 \(f(0)=0\)인 삼차함수 \(f(x)\)에
        대하여 함수
        \[g(x)=\int_{0}^{x}\bigl(|f(t)|-|t|\bigr)dt\]
        가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 방정식 \(g'(x)=0\)의 서로 다른 실근의 개수는 \(4\)이다.`,
        R`(나) 함수 \(g(x)\)는 \(x=2\), \(x=6\)에서 극값을 갖는다.`
      ],
      bodyAfter: R`\(f(6)\times g(2)<0\)일 때, \(f(8)\)의 값은?`,
      choices: [R`\(16\)`, R`\(22\)`, R`\(28\)`, R`\(34\)`, R`\(40\)`],
      answer: 5,
      help: R`\(g'(x)=|f(x)|-|x|\)이므로 \(g'(x)=0\)은 \(|f(x)|=|x|\), 곧 \(f(x)=x\)와 \(f(x)=-x\)의 근을 모두 모은 것이다. 실근이 넷인데 극값은 \(x=2\), \(x=6\) 둘뿐이니, 나머지 두 근에서는 \(g'\)의 부호가 바뀌지 않는다.`
    },
    {
      id: "2026-09-20", exam: "2026-09", no: 20, score: 4,
      units: ["m1-trig"], memo: "원에 내접하는 사각형과 닮은 두 삼각형",
      body: R`그림과 같이 사각형 \(\mathrm{ABCD}\)가 한 원에 내접하고
        \(\overline{\mathrm{AB}}:\overline{\mathrm{CD}}=1:3\), \(\overline{\mathrm{BC}}<\overline{\mathrm{AD}}\)일 때, 직선 \(\mathrm{AB}\)와 직선 \(\mathrm{CD}\)가
        만나는 점을 \(\mathrm{P}\)라 하자.`,
      figure: "2026-09-20.webp",
      bodyAfter: R`다음은 \(\overline{\mathrm{PB}}:\overline{\mathrm{PC}}:\overline{\mathrm{BC}}=7:5:\sqrt{14}\)이고 \(\overline{\mathrm{AD}}=4\sqrt{13}\)일 때,
        삼각형 \(\mathrm{BPC}\)의 외접원의 반지름의 길이를 구하는 과정이다.
        <div class="proof-box">
        <p>\(\angle\mathrm{BPC}=\theta\)라 할 때, \(\overline{\mathrm{PB}}:\overline{\mathrm{PC}}:\overline{\mathrm{BC}}=7:5:\sqrt{14}\)이므로 삼각형 \(\mathrm{BPC}\)에서 코사인법칙에 의하여 \(\cos\theta=\dfrac{6}{7}\)이다.</p>
        <p>\(\overline{\mathrm{PB}}:\overline{\mathrm{PC}}=7:5\)에서 \(\overline{\mathrm{PB}}=7k\), \(\overline{\mathrm{PC}}=5k\), \(\overline{\mathrm{AB}}:\overline{\mathrm{CD}}=1:3\)에서 \(\overline{\mathrm{AB}}=l\), \(\overline{\mathrm{CD}}=3l\)이라 하자.</p>
        <p>원의 성질에 의하여 삼각형 \(\mathrm{BPC}\)와 삼각형 \(\mathrm{DPA}\)가 서로 닮음이므로 \(\overline{\mathrm{PB}}:\overline{\mathrm{PC}}=\overline{\mathrm{PD}}:\overline{\mathrm{PA}}\)이고, \(l=\fbox{(가)}\times k\)이다.</p>
        <p>삼각형 \(\mathrm{BPC}\)와 삼각형 \(\mathrm{DPA}\)의 닮음비가 \(1:\fbox{(나)}\)이므로</p>
        \[\overline{\mathrm{BC}}=\frac{1}{\fbox{(나)}}\times\overline{\mathrm{AD}}\]
        <p>이다.</p>
        <p>따라서 삼각형 \(\mathrm{BPC}\)의 외접원의 반지름의 길이를 \(R\)이라 할 때, 삼각형 \(\mathrm{BPC}\)에서 사인법칙에 의하여 \(R=\fbox{(다)}\)이다.</p>
        </div>
        위의 (가), (나), (다)에 알맞은 수를 각각 \(p\), \(q\), \(r\)이라 할 때,
        \(p+q+r\)의 값을 구하시오.`,
      short: true,
      answer: 12,
      help: R`원에 내접하는 사각형이라 \(\angle\mathrm{PBC}\)와 \(\angle\mathrm{PDA}\)가 같고, 각 \(\mathrm{P}\)를 함께 쓰므로 삼각형 \(\mathrm{BPC}\)와 \(\mathrm{DPA}\)가 닮음이다. 이 닮음이 \(\overline{\mathrm{PB}}\cdot\overline{\mathrm{PA}}=\overline{\mathrm{PC}}\cdot\overline{\mathrm{PD}}\)를 주고, 여기에 \(\overline{\mathrm{AB}}=l\), \(\overline{\mathrm{CD}}=3l\)을 넣으면 \(l\)이 \(k\)로 표현된다.`
    },
    {
      id: "2026-09-21", exam: "2026-09", no: 21, score: 4,
      units: ["m2-diff"], memo: "부등식 두 개에 끼인 삼차함수",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)가 다음 조건을
        만족시킬 때, \(f'(10)\)의 값을 구하시오.`,
      note: [
        R`\(0\)이 아닌 모든 실수 \(x\)에 대하여 \(\dfrac{f'(x)}{2}+x^{2}-2 \le \dfrac{f(2x)-f(0)}{2x} \le x^{4}\)이다.`
      ],
      short: true,
      answer: 296,
      help: R`\(f(x)=x^{3}+bx^{2}+cx+d\)로 놓으면 가운데 식이 \(4x^{2}+2bx+c\)로 깔끔해진다. 그러면 왼쪽 부등식은 \(\frac{3}{2}x^{2}+bx+\frac{c}{2}+2\ge 0\), 오른쪽은 \(x^{4}-4x^{2}-2bx-c\ge 0\)이 되고, 두 조건이 함께 성립하려면 둘 다 등호가 아슬아슬하게 걸리는 자리뿐이다.`
    },
    {
      id: "2026-09-22", exam: "2026-09", no: 22, score: 4,
      units: ["m1-explog"], memo: "로그 곡선 위 두 점과 사다리꼴",
      body: R`곡선 \(y=\log_{2}x\) 위에 서로 다른 두 점 \(\mathrm{A}\), \(\mathrm{B}\)가 있다.
        점 \(\mathrm{A}\)에서 직선 \(y=x\)에 내린 수선의 발을 \(\mathrm{P}\)라 하고,
        점 \(\mathrm{B}\)를 직선 \(y=x\)에 대하여 대칭이동한 점을 \(\mathrm{Q}\)라 할 때,
        네 점 \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{P}\), \(\mathrm{Q}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) (직선 \(\mathrm{AP}\)의 \(y\)절편) \(-\) (직선 \(\mathrm{BQ}\)의 \(y\)절편) \(=\dfrac{13}{2}\)`,
        R`(나) 직선 \(\mathrm{AB}\)의 기울기는 \(\dfrac{6}{7}\)이다.`
      ],
      bodyAfter: R`사각형 \(\mathrm{APQB}\)의 넓이가 \(\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오.
        (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 73,
      help: R`\(\mathrm{AP}\)와 \(\mathrm{BQ}\)는 둘 다 직선 \(y=x\)에 수직이라 기울기가 \(-1\)로 같다. 곧 두 선분이 평행이고 사각형 \(\mathrm{APQB}\)는 사다리꼴이며, (가)의 \(y\)절편 차가 두 평행선 사이의 거리를 준다.`
    },
    {
      id: "2026-06-9", exam: "2026-06", no: 9, score: 4,
      units: ["m2-integ"], memo: "대칭 구간에서의 정적분",
      body: R`함수 \(f(x)=x^{2}+ax\)에 대하여
        \[\int_{-3}^{3}(x+1)f(x)\,dx = 36+\int_{-3}^{3}f(x)\,dx\]
        일 때, 상수 \(a\)의 값은?`,
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 2,
      help: R`적분 구간이 \(-3\)부터 \(3\)까지 원점에 대하여 대칭이라 홀수 차수 항의 적분은 모두 \(0\)이다. \((x+1)f(x)\)를 전개하면 짝수 차수인 \((a+1)x^{2}\)만 살아남는다.`
    },
    {
      id: "2026-06-10", exam: "2026-06", no: 10, score: 4,
      units: ["m1-explog"], memo: "로그 곡선 두 개와 정삼각형",
      body: R`실수 \(a\,(a>1)\)에 대하여
        곡선 \(y=\log_{a}(x+3)\)이 곡선 \(y=\log_{a}(-x+3)\)과 만나는 점을 \(\mathrm{A}\),
        곡선 \(y=\log_{a}(x+3)\)이 \(x\)축과 만나는 점을 \(\mathrm{B}\),
        곡선 \(y=\log_{a}(-x+3)\)이 \(x\)축과 만나는 점을 \(\mathrm{C}\)라 하자.
        삼각형 \(\mathrm{ABC}\)가 정삼각형일 때, \(a\)의 값은?`,
      choices: [R`\(3^{\frac{\sqrt{3}}{6}}\)`, R`\(3^{\frac{\sqrt{3}}{4}}\)`, R`\(3^{\frac{\sqrt{3}}{3}}\)`, R`\(3^{\frac{5\sqrt{3}}{12}}\)`, R`\(3^{\frac{\sqrt{3}}{2}}\)`],
      answer: 1,
      help: R`두 곡선은 \(y\)축에 대하여 서로 대칭이므로 교점 \(\mathrm{A}\)는 \(y\)축 위에 있고, \(\mathrm{B}(-2,\,0)\), \(\mathrm{C}(2,\,0)\)이다. 밑변 \(\overline{\mathrm{BC}}=4\)가 정해지니 정삼각형이라는 조건은 높이가 \(2\sqrt{3}\), 곧 \(\log_{a}3=2\sqrt{3}\)이라는 말이 된다.`
    },
    {
      id: "2026-06-11", exam: "2026-06", no: 11, score: 4,
      units: ["m2-diff"], memo: "위치가 주어진 점의 속도와 가속도",
      body: R`시각 \(t=0\)일 때 출발하여 수직선 위를 움직이는 점 \(\mathrm{P}\)가 있다.
        시각이 \(t\,(t\ge 0)\)일 때 점 \(\mathrm{P}\)의 위치 \(x\)가
        \[x=t^{3}-t^{2}-t+1\]
        이다. &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. 시각 \(t=1\)일 때 점 \(\mathrm{P}\)의 위치는 \(1\)이다.`,
        R`ㄴ. 시각 \(t=1\)일 때 점 \(\mathrm{P}\)의 속도는 \(0\)이다.`,
        R`ㄷ. 출발한 후 점 \(\mathrm{P}\)의 운동 방향이 바뀌는 시각에 점 \(\mathrm{P}\)의 가속도는 \(4\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄴ`, R`ㄷ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`],
      answer: 5,
      help: R`위치가 바로 주어졌으니 속도는 \(x'=3t^{2}-2t-1=(3t+1)(t-1)\)이다. \(t\ge 0\)에서 부호가 바뀌는 곳은 \(t=1\) 하나뿐이라, ㄴ과 ㄷ이 같은 자리에서 함께 정해진다.`
    },
    {
      id: "2026-06-12", exam: "2026-06", no: 12, score: 4,
      units: ["m1-seq"], memo: "두 갈래로 갈리는 점화식",
      body: R`다음 조건을 만족시키는 모든 수열 \(\{a_{n}\}\)에 대하여
        \(a_{4}\)의 최댓값은?`,
      note: [
        R`(가) \(a_{1}=a_{3}\)`,
        R`(나) 모든 자연수 \(n\)에 대하여 \(\left(a_{n+1}-a_{n}+3\right)\left(a_{n+1}-2a_{n}\right)=0\)이다.`
      ],
      choices: [R`\(9\)`, R`\(12\)`, R`\(15\)`, R`\(18\)`, R`\(21\)`],
      answer: 2,
      help: R`(나)는 각 \(n\)마다 \(a_{n+1}=a_{n}-3\)이거나 \(a_{n+1}=2a_{n}\), 둘 중 하나라는 뜻이다. \(a_{1}=a_{3}\)이므로 두 걸음 만에 제자리로 돌아오는 조합만 살아남고, 그 조합이 \(a_{1}\)의 값까지 정해 준다.`
    },
    {
      id: "2026-06-13", exam: "2026-06", no: 13, score: 4,
      units: ["m2-integ"], memo: "넓이 세 조각을 부호로 묶기",
      body: R`그림과 같이 함수 \(f(x)=3x^{2}-7x+2\)에 대하여 곡선
        \(y=f(x)\)와 직선 \(y=\dfrac{1}{3}x-\dfrac{2}{3}\) 및 \(y\)축으로 둘러싸인 영역을 \(A\),
        곡선 \(y=f(x)\)와 직선 \(y=\dfrac{1}{3}x-\dfrac{2}{3}\)로 둘러싸인 영역을 \(B\),
        곡선 \(y=f(x)\)와 두 직선 \(y=\dfrac{1}{3}x-\dfrac{2}{3}\), \(x=k\,(k>2)\)로
        둘러싸인 영역을 \(C\)라 하자.
        \[(A\text{의 넓이})+(C\text{의 넓이})=(B\text{의 넓이})\]
        일 때, 상수 \(k\)의 값은?`,
      figure: "2026-06-13.webp",
      choices: [R`\(\dfrac{29}{12}\)`, R`\(\dfrac{5}{2}\)`, R`\(\dfrac{31}{12}\)`, R`\(\dfrac{8}{3}\)`, R`\(\dfrac{11}{4}\)`],
      answer: 4,
      help: R`\(B\)에서는 직선이 곡선보다 위에 있어 차의 부호가 반대다. 그래서 \(A+C=B\)는 부호를 붙여 더하면 \(\displaystyle\int_{0}^{k}\left(f(x)-\left(\frac{1}{3}x-\frac{2}{3}\right)\right)dx=0\)이라는 한 줄과 같은 말이 된다. 교점을 구할 필요가 없다.`
    },
    {
      id: "2026-06-14", exam: "2026-06", no: 14, score: 4,
      units: ["m1-trig"], memo: "중점과 내분점이 만든 선분의 길이",
      body: R`\(\overline{\mathrm{AB}}=2\sqrt{7}\)인 삼각형 \(\mathrm{ABC}\)에서 선분 \(\mathrm{BC}\)의 중점을 \(\mathrm{P}\),
        선분 \(\mathrm{BC}\)를 \(5:1\)로 내분하는 점을 \(\mathrm{Q}\)라 하자.
        \[\overline{\mathrm{AQ}}=3\sqrt{2},\qquad \sin(\angle\mathrm{QAP}):\sin(\angle\mathrm{APQ})=\sqrt{2}:3\]
        일 때, 삼각형 \(\mathrm{ABC}\)의 외접원의 넓이는?`,
      figure: "2026-06-14.webp",
      choices: [R`\(\dfrac{85}{9}\pi\)`, R`\(\dfrac{88}{9}\pi\)`, R`\(\dfrac{91}{9}\pi\)`, R`\(\dfrac{94}{9}\pi\)`, R`\(\dfrac{97}{9}\pi\)`],
      answer: 2,
      help: R`삼각형 \(\mathrm{APQ}\)에서 사인법칙을 쓰면 \(\overline{\mathrm{PQ}}:\overline{\mathrm{AQ}}=\sin(\angle\mathrm{QAP}):\sin(\angle\mathrm{APQ})=\sqrt{2}:3\)이라 \(\overline{\mathrm{PQ}}=2\)가 곧바로 나온다. 한편 \(\mathrm{P}\)가 중점이고 \(\mathrm{Q}\)가 \(5:1\) 내분점이므로 \(\overline{\mathrm{PQ}}=\frac{1}{3}\overline{\mathrm{BC}}\), 곧 \(\overline{\mathrm{BC}}=6\)이다.`
    },
    {
      id: "2026-06-15", exam: "2026-06", no: 15, score: 4,
      units: ["m2-diff"], memo: "오른쪽 미분계수가 늘 0 이하인 함수",
      body: R`상수 \(k\)와 \(f'(0)=6\)인 삼차함수 \(f(x)\)에 대하여 함수
        \[g(x)=\begin{cases}f(x)+k &amp; (|x|>1)\\ -f(x) &amp; (|x|\le 1)\end{cases}\]
        이 다음 조건을 만족시킬 때, \(k+f\left(\dfrac{1}{2}\right)\)의 값은?`,
      note: [
        R`(가) 모든 실수 \(a\)에 대하여 \(\displaystyle\lim_{x\to a+}\frac{g(x)-g(a)}{x-a}\)의 값이 존재하고 그 값은 \(0\) 이하이다.`,
        R`(나) \(x\)에 대한 방정식 \(g(x)=t\)의 서로 다른 실근의 개수가 \(2\)가 되도록 하는 실수 \(t\)의 최댓값은 \(13\)이다.`
      ],
      choices: [R`\(\dfrac{15}{4}\)`, R`\(\dfrac{27}{4}\)`, R`\(\dfrac{39}{4}\)`, R`\(\dfrac{51}{4}\)`, R`\(\dfrac{63}{4}\)`],
      answer: 1,
      help: R`(가)의 극한은 \(x=a\)에서의 오른쪽 미분계수다. 그 값이 어디서나 \(0\) 이하라는 것은 \(g\)에 올라가는 구간이 없다는 뜻이다. \(f'(0)=6>0\)인데도 이것이 가능한 까닭은 \(|x|\le 1\)에서 \(g=-f\)라 기울기의 부호가 뒤집히기 때문이다.`
    },
    {
      id: "2026-06-20", exam: "2026-06", no: 20, score: 4,
      units: ["m1-seq"], memo: "주기함수의 방정식이 만든 등차수열 셋",
      body: R`실수 전체의 집합에서 정의된 함수 \(f(x)\)가 다음 조건을
        만족시킨다.`,
      note: [
        R`\(0\le x<4\)일 때 \(f(x)=-x^{2}+4x\)이고, 모든 실수 \(x\)에 대하여 \(f(x+4)=f(x)\)이다.`
      ],
      bodyAfter: R`방정식 \(f\bigl(f(x)\bigr)=f(x)\)의 \(0\) 이상인 모든 실근을 작은 수부터
        크기순으로 나열할 때, \(n\)번째 수를 \(a_{n}\)이라 하자.
        다음은 \(a_{20}+a_{21}+a_{22}\)의 값을 구하는 과정이다.
        <div class="proof-box">
        <p>방정식 \(f(x)=x\)의 모든 실근이 \(0\), \(3\)이므로 방정식 \(f\bigl(f(x)\bigr)=f(x)\)의 실근을 구하는 것은 방정식 \(f(x)\times\bigl(f(x)-3\bigr)=0\)의 실근을 구하는 것과 같다.</p>
        <p>\(0\le x<4\)일 때, 방정식 \(f(x)\times\bigl(f(x)-3\bigr)=0\)의 모든 실근은 \(0\), \(\fbox{(가)}\), \(3\)이므로</p>
        \[a_{1}=0,\quad a_{2}=\fbox{(가)},\quad a_{3}=3\]
        <p>이다. 또한 모든 실수 \(x\)에 대하여 \(f(x+4)=f(x)\)이므로 세 수열 \(\{a_{3n-2}\}\), \(\{a_{3n-1}\}\), \(\{a_{3n}\}\)은 첫째항이 각각 \(0\), \(\fbox{(가)}\), \(3\)이고 공차가 모두 \(\fbox{(나)}\)인 등차수열이다.</p>
        <p>따라서 \(a_{20}+a_{21}+a_{22}=\fbox{(다)}\)이다.</p>
        </div>
        위의 (가), (나), (다)에 알맞은 수를 각각 \(p\), \(q\), \(r\)이라 할 때,
        \(p+q+r\)의 값을 구하시오.`,
      short: true,
      answer: 85,
      help: R`\(f\bigl(f(x)\bigr)=f(x)\)는 \(f(x)\)가 방정식 \(f(t)=t\)의 근이라는 뜻이고, 그 근이 \(0\)과 \(3\)뿐이라 \(f(x)\bigl(f(x)-3\bigr)=0\)으로 바뀐다. 한 주기 \([0,\,4)\)에서 근을 다 찾고 나면, \(f(x+4)=f(x)\)이므로 나머지는 공차가 \(4\)인 등차수열 셋으로 갈린다.`
    },
    {
      id: "2026-06-21", exam: "2026-06", no: 21, score: 4,
      units: ["m2-limit"], memo: "부호 함수와 절댓값이 든 두 극한",
      body: R`함수 \(f(x)=(x-1)(x-2)\)와 최고차항의 계수가 \(1\)인
        사차함수 \(g(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`모든 실수 \(a\)에 대하여 \(\displaystyle\lim_{x\to a}\frac{g(x)\times|f(x)|}{f(x)}\)의 값과 \(\displaystyle\lim_{x\to a}\frac{\bigl|g(x)-f(x)\bigr|}{g(x)}\)의 값이 모두 존재한다.`
      ],
      bodyAfter: R`\(g(-1)\)의 값을 구하시오.`,
      short: true,
      answer: 42,
      help: R`\(\frac{|f(x)|}{f(x)}\)는 \(f\)의 부호가 바뀌는 \(x=1\), \(x=2\)에서 \(1\)과 \(-1\)로 튄다. 첫 극한이 그 자리에서도 있으려면 곱해지는 \(g\)가 그 튐을 눌러야 하므로 \(g(1)=g(2)=0\)이다. 두 번째 극한은 \(g\)의 근에서 분모가 \(0\)이 되므로 분자도 \(0\)이어야 하고, 그래서 \(g\)의 근은 모두 \(f\)의 근이기도 해야 한다.`
    },
    {
      id: "2026-06-22", exam: "2026-06", no: 22, score: 4,
      units: ["m1-explog"], memo: "지수 곡선 두 개의 교점과 삼각형 넓이",
      body: R`\(k>1\)인 실수 \(k\)에 대하여 두 곡선
        \[y=2^{x}+\frac{k}{2},\qquad y=k\times\left(\frac{1}{2}\right)^{x}+k-2\]
        가 만나는 점을 \(\mathrm{A}\)라 하고, 점 \(\mathrm{A}\)를 지나고 기울기가 \(-1\)인
        직선이 곡선 \(y=2^{\,x-2}-3\)과 만나는 점을 \(\mathrm{B}\)라 하자.
        삼각형 \(\mathrm{AOB}\)의 넓이가 \(16\)일 때, \(k+\log_{2}k=\dfrac{q}{p}\)이다.
        \(p+q\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이고, \(p\)와 \(q\)는 서로소인
        자연수이다.)`,
      short: true,
      answer: 38,
      help: R`두 곡선을 같게 놓고 \(2^{x}=u\)로 바꾸면 \(u^{2}+\left(2-\frac{k}{2}\right)u-k=0\)이 되고, 이것은 \((u+2)\left(u-\frac{k}{2}\right)=0\)으로 인수분해된다. \(u>0\)이므로 \(2^{x}=\frac{k}{2}\), 곧 \(\mathrm{A}\)의 \(x\)좌표가 \(\log_{2}k-1\)이다.`
    },
    {
      id: "2025-suneung-9", exam: "2025-suneung", no: 9, score: 4,
      units: ["m2-integ"], memo: "적분 구간이 같은 두 정적분",
      body: R`함수 \(f(x)=3x^{2}-16x-20\)에 대하여
        \[\int_{-2}^{a} f(x)\,dx = \int_{-2}^{0} f(x)\,dx\]
        일 때, 양수 \(a\)의 값은?`,
      choices: [R`\(16\)`, R`\(14\)`, R`\(12\)`, R`\(10\)`, R`\(8\)`],
      answer: 4,
      help: R`양변에서 \(\int_{-2}^{0}\)을 빼면 \(\int_{0}^{a}f(x)\,dx=0\) 한 줄로 줄어든다. 아래끝 \(-2\)는 아무 일도 하지 않는다.`
    },
    {
      id: "2025-suneung-10", exam: "2025-suneung", no: 10, score: 4,
      units: ["m1-trig"], memo: "코사인 함수가 최대가 되는 자리",
      body: R`닫힌구간 \([0,\,2\pi]\)에서 정의된 함수 \(f(x)=a\cos bx+3\)이
        \(x=\dfrac{\pi}{3}\)에서 최댓값 \(13\)을 갖도록 하는 두 자연수 \(a\), \(b\)의
        순서쌍 \((a,\,b)\)에 대하여 \(a+b\)의 최솟값은?`,
      choices: [R`\(12\)`, R`\(14\)`, R`\(16\)`, R`\(18\)`, R`\(20\)`],
      answer: 3,
      help: R`최댓값이 \(13\)이니 \(a+3=13\), 곧 \(a=10\)으로 먼저 정해진다. 그리고 \(x=\frac{\pi}{3}\)에서 최대가 되려면 \(\cos\frac{b\pi}{3}=1\), 곧 \(\frac{b\pi}{3}\)가 \(2\pi\)의 배수여야 한다.`
    },
    {
      id: "2025-suneung-11", exam: "2025-suneung", no: 11, score: 4,
      units: ["m2-diff"], memo: "운동 방향이 바뀌는 시각의 가속도",
      body: R`시각 \(t=0\)일 때 출발하여 수직선 위를 움직이는 점 \(\mathrm{P}\)의
        시각 \(t\,(t\ge 0)\)에서의 위치 \(x\)가
        \[x=t^{3}-\frac{3}{2}t^{2}-6t\]
        이다. 출발한 후 점 \(\mathrm{P}\)의 운동 방향이 바뀌는 시각에서의
        점 \(\mathrm{P}\)의 가속도는?`,
      choices: [R`\(6\)`, R`\(9\)`, R`\(12\)`, R`\(15\)`, R`\(18\)`],
      answer: 2,
      help: R`속도는 \(x'=3t^{2}-3t-6=3(t-2)(t+1)\)이다. \(t\ge 0\)에서 부호가 바뀌는 시각은 \(t=2\) 하나뿐이라 그 자리만 보면 된다.`
    },
    {
      id: "2025-suneung-12", exam: "2025-suneung", no: 12, score: 4,
      units: ["m1-seq"], memo: "부분합이 주어진 수열의 항 구하기",
      body: R`\(a_{1}=2\)인 수열 \(\{a_{n}\}\)과 \(b_{1}=2\)인 등차수열 \(\{b_{n}\}\)이
        모든 자연수 \(n\)에 대하여
        \[\sum_{k=1}^{n}\frac{a_{k}}{b_{k+1}}=\frac{1}{2}n^{2}\]
        을 만족시킬 때, \(\displaystyle\sum_{k=1}^{5}a_{k}\)의 값은?`,
      choices: [R`\(120\)`, R`\(125\)`, R`\(130\)`, R`\(135\)`, R`\(140\)`],
      answer: 1,
      help: R`\(n=1\)을 넣으면 \(\frac{a_{1}}{b_{2}}=\frac{1}{2}\)에서 \(b_{2}=4\)가 나와 공차가 \(2\)로 정해진다. 그리고 \(\frac{a_{n}}{b_{n+1}}\)은 부분합의 차 \(\frac{n^{2}}{2}-\frac{(n-1)^{2}}{2}=\frac{2n-1}{2}\)이므로 \(a_{n}\)이 곧바로 구해진다.`
    },
    {
      id: "2025-suneung-13", exam: "2025-suneung", no: 13, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "위아래가 바뀐 두 넓이의 차",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)가
        \[f(1)=f(2)=0,\qquad f'(0)=-7\]
        을 만족시킨다. 원점 \(\mathrm{O}\)와 점 \(\mathrm{P}\bigl(3,\,f(3)\bigr)\)에 대하여 선분 \(\mathrm{OP}\)가
        곡선 \(y=f(x)\)와 만나는 점 중 \(\mathrm{P}\)가 아닌 점을 \(\mathrm{Q}\)라 하자.
        곡선 \(y=f(x)\)와 \(y\)축 및 선분 \(\mathrm{OQ}\)로 둘러싸인 부분의 넓이를 \(A\),
        곡선 \(y=f(x)\)와 선분 \(\mathrm{PQ}\)로 둘러싸인 부분의 넓이를 \(B\)라 할 때,
        \(B-A\)의 값은?`,
      figure: "2025-suneung-13.webp",
      choices: [R`\(\dfrac{37}{4}\)`, R`\(\dfrac{39}{4}\)`, R`\(\dfrac{41}{4}\)`, R`\(\dfrac{43}{4}\)`, R`\(\dfrac{45}{4}\)`],
      answer: 5,
      help: R`\(f'(0)=-7\)에서 \(f(x)=(x-1)(x-2)(x+3)\)이 정해지고, 그러면 \(\mathrm{P}(3,\,12)\)라 직선 \(\mathrm{OP}\)는 \(y=4x\)다. \(A\)와 \(B\)는 곡선과 직선의 위아래가 서로 바뀐 두 조각이므로, \(B-A\)는 부호를 붙여 묶으면 교점 \(\mathrm{Q}\)를 구하지 않고 \(\int_{0}^{3}\bigl(4x-f(x)\bigr)dx\) 한 줄이 된다.`
    },
    {
      id: "2025-suneung-14", exam: "2025-suneung", no: 14, score: 4,
      units: ["m1-trig"], memo: "각을 함께 쓰는 두 삼각형의 넓이비",
      body: R`그림과 같이 삼각형 \(\mathrm{ABC}\)에서 선분 \(\mathrm{AB}\) 위에 \(\overline{\mathrm{AD}}:\overline{\mathrm{DB}}=3:2\)인
        점 \(\mathrm{D}\)를 잡고, 점 \(\mathrm{A}\)를 중심으로 하고 점 \(\mathrm{D}\)를 지나는 원을 \(O\),
        원 \(O\)와 선분 \(\mathrm{AC}\)가 만나는 점을 \(\mathrm{E}\)라 하자.
        \(\sin A:\sin C=8:5\)이고, 삼각형 \(\mathrm{ADE}\)와 삼각형 \(\mathrm{ABC}\)의 넓이의
        비가 \(9:35\)이다. 삼각형 \(\mathrm{ABC}\)의 외접원의 반지름의 길이가 \(7\)일 때,
        원 \(O\) 위의 점 \(\mathrm{P}\)에 대하여 삼각형 \(\mathrm{PBC}\)의 넓이의 최댓값은?
        (단, \(\overline{\mathrm{AB}}<\overline{\mathrm{AC}}\))`,
      figure: "2025-suneung-14.webp",
      choices: [R`\(18+15\sqrt{3}\)`, R`\(24+20\sqrt{3}\)`, R`\(30+25\sqrt{3}\)`, R`\(36+30\sqrt{3}\)`, R`\(42+35\sqrt{3}\)`],
      answer: 4,
      help: R`\(\sin A:\sin C=8:5\)는 사인법칙으로 \(\overline{\mathrm{BC}}:\overline{\mathrm{AB}}=8:5\)라는 뜻이다. 그리고 삼각형 \(\mathrm{ADE}\)와 \(\mathrm{ABC}\)는 각 \(\mathrm{A}\)를 함께 쓰므로 넓이의 비가 \(\overline{\mathrm{AD}}\times\overline{\mathrm{AE}}\)와 \(\overline{\mathrm{AB}}\times\overline{\mathrm{AC}}\)의 비다. \(\overline{\mathrm{AD}}=\overline{\mathrm{AE}}\)가 원의 반지름이므로 이 두 비가 세 변을 한꺼번에 묶어 준다.`
    },
    {
      id: "2025-suneung-15", exam: "2025-suneung", no: 15, score: 4,
      units: ["m2-diff"], memo: "이어 붙인 두 함수가 미분가능할 조건",
      body: R`상수 \(a\,(a\ne 3\sqrt{5}\,)\)와 최고차항의 계수가 음수인 이차함수
        \(f(x)\)에 대하여 함수
        \[g(x)=\begin{cases}x^{3}+ax^{2}+15x+7 &amp; (x\le 0)\\ f(x) &amp; (x>0)\end{cases}\]
        이 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 함수 \(g(x)\)는 실수 전체의 집합에서 미분가능하다.`,
        R`(나) \(x\)에 대한 방정식 \(g'(x)\times g'(x-4)=0\)의 서로 다른 실근의 개수는 \(4\)이다.`
      ],
      bodyAfter: R`\(g(-2)+g(2)\)의 값은?`,
      choices: [R`\(30\)`, R`\(32\)`, R`\(34\)`, R`\(36\)`, R`\(38\)`],
      answer: 2,
      help: R`(가)에서 \(x=0\)이 이어지고 기울기도 같아야 하므로 \(f(0)=7\), \(f'(0)=15\)다. \(f\)가 이차함수라 이 둘이 잡히면 남는 것은 최고차항의 계수 하나뿐이고, 그것을 (나)가 정해 준다.`
    },
    {
      id: "2025-suneung-20", exam: "2025-suneung", no: 20, score: 4,
      units: ["m1-explog"], memo: "합성함수 조건으로 정의역 밖의 값 찾기",
      body: R`곡선 \(y=\left(\dfrac{1}{5}\right)^{x-3}\)과 직선 \(y=x\)가 만나는 점의 \(x\)좌표를
        \(k\)라 하자. 실수 전체의 집합에서 정의된 함수 \(f(x)\)가 다음
        조건을 만족시킨다.`,
      note: [
        R`\(x>k\)인 모든 실수 \(x\)에 대하여 \(f(x)=\left(\dfrac{1}{5}\right)^{x-3}\)이고 \(f\bigl(f(x)\bigr)=3x\)이다.`
      ],
      bodyAfter: R`\(f\left(\dfrac{1}{k^{3}\times 5^{3k}}\right)\)의 값을 구하시오.`,
      short: true,
      answer: 36,
      help: R`\(k\)는 \(k=5^{\,3-k}\)를 만족시키므로 \(k^{3}\times 5^{3k}=5^{\,9-3k}\times 5^{3k}=5^{9}\)이다. 곧 구하는 것은 \(f\left(5^{-9}\right)\)다. 그리고 \(x>k\)이면 \(f(x)<k\)이므로 \(k\)보다 작은 자리에서의 \(f\)는 주어진 식이 아니라 \(f\bigl(f(x)\bigr)=3x\)가 알려 준다.`
    },
    {
      id: "2025-suneung-21", exam: "2025-suneung", no: 21, score: 4,
      units: ["m2-limit"], memo: "근이 근을 낳는 극한 조건",
      body: R`함수 \(f(x)=x^{3}+ax^{2}+bx+4\)가 다음 조건을 만족시키도록
        하는 두 정수 \(a\), \(b\)에 대하여 \(f(1)\)의 최댓값을 구하시오.`,
      note: [
        R`모든 실수 \(\alpha\)에 대하여 \(\displaystyle\lim_{x\to\alpha}\frac{f(2x+1)}{f(x)}\)의 값이 존재한다.`
      ],
      short: true,
      answer: 16,
      help: R`분모가 \(0\)이 되는 자리, 곧 \(f\)의 실근 \(r\)마다 분자 \(f(2r+1)\)도 \(0\)이어야 한다. 그러니 \(r\)가 근이면 \(2r+1\)도 근이다. 삼차함수의 근은 많아야 셋뿐이라, 이 \(r\mapsto 2r+1\)이 근들 안에서 맴돌아야 하고 그럴 수 있는 경우는 몇 가지뿐이다.`
    },
    {
      id: "2025-suneung-22", exam: "2025-suneung", no: 22, score: 4,
      units: ["m1-seq"], memo: "홀짝에 따라 갈리는 점화식 거꾸로 오르기",
      body: R`모든 항이 정수이고 다음 조건을 만족시키는 모든 수열
        \(\{a_{n}\}\)에 대하여 \(|a_{1}|\)의 값의 합을 구하시오.`,
      note: [
        R`(가) 모든 자연수 \(n\)에 대하여 \(a_{n+1}=\begin{cases}a_{n}-3 &amp; \left(|a_{n}|\text{이 홀수인 경우}\right)\\[2pt] \dfrac{1}{2}a_{n} &amp; \left(a_{n}=0 \text{ 또는 } |a_{n}|\text{이 짝수인 경우}\right)\end{cases}\)이다.`,
        R`(나) \(|a_{m}|=|a_{m+2}|\)인 자연수 \(m\)의 최솟값은 \(3\)이다.`
      ],
      short: true,
      answer: 64,
      help: R`(나)의 "최솟값이 \(3\)"은 두 가지를 함께 말한다. \(|a_{3}|=|a_{5}|\)이면서, \(m=1\)과 \(m=2\)에서는 그렇지 않다는 것. 규칙이 값을 줄이는 쪽이라 \(a_{1}\)부터 앞으로 밀기보다 \(|a_{3}|=|a_{5}|\)가 되는 자리를 먼저 찾고 거꾸로 거슬러 올라가는 편이 빠르다.`
    },
    {
      id: "2025-09-9", exam: "2025-09", no: 9, score: 4,
      units: ["m2-integ"], memo: "같은 구간의 정적분 묶기",
      body: R`함수 \(f(x)=x^{2}+x\)에 대하여
        \[5\int_{0}^{1}f(x)\,dx-\int_{0}^{1}\bigl(5x+f(x)\bigr)dx\]
        의 값은?`,
      choices: [R`\(\dfrac{1}{6}\)`, R`\(\dfrac{1}{3}\)`, R`\(\dfrac{1}{2}\)`, R`\(\dfrac{2}{3}\)`, R`\(\dfrac{5}{6}\)`],
      answer: 5,
      help: R`적분 구간이 같으니 하나로 묶을 수 있다. 묶으면 \(4\displaystyle\int_{0}^{1}f(x)\,dx-5\int_{0}^{1}x\,dx\)로 줄어든다.`
    },
    {
      id: "2025-09-10", exam: "2025-09", no: 10, score: 4,
      units: ["m1-trig"], memo: "수선의 발과 외접원 반지름",
      body: R`\(\angle\mathrm{A}>\dfrac{\pi}{2}\)인 삼각형 \(\mathrm{ABC}\)의 꼭짓점 \(\mathrm{A}\)에서 선분 \(\mathrm{BC}\)에
        내린 수선의 발을 \(\mathrm{H}\)라 하자.
        \[\overline{\mathrm{AB}}:\overline{\mathrm{AC}}=\sqrt{2}:1,\qquad \overline{\mathrm{AH}}=2\]
        이고, 삼각형 \(\mathrm{ABC}\)의 외접원의 넓이가 \(50\pi\)일 때,
        선분 \(\mathrm{BH}\)의 길이는?`,
      choices: [R`\(6\)`, R`\(\dfrac{25}{4}\)`, R`\(\dfrac{13}{2}\)`, R`\(\dfrac{27}{4}\)`, R`\(7\)`],
      answer: 1,
      help: R`직각삼각형 \(\mathrm{ABH}\)에서 \(\sin B=\frac{\overline{\mathrm{AH}}}{\overline{\mathrm{AB}}}\)이고, 사인법칙에서 \(\overline{\mathrm{AC}}=2R\sin B\)다. 외접원의 넓이가 \(50\pi\)라 \(R=5\sqrt{2}\)이므로 이 두 식을 이으면 변의 길이가 한꺼번에 정해진다.`
    },
    {
      id: "2025-09-11", exam: "2025-09", no: 11, score: 4,
      units: ["m2-diff"], memo: "위치가 같아지는 시각 찾기",
      body: R`수직선 위를 움직이는 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 시각 \(t\,(t\ge 0)\)에서의
        위치가 각각
        \[x_{1}=t^{2}+t-6,\qquad x_{2}=-t^{3}+7t^{2}\]
        이다. 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 위치가 같아지는 순간 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의
        가속도를 각각 \(p\), \(q\)라 할 때, \(p-q\)의 값은?`,
      choices: [R`\(24\)`, R`\(27\)`, R`\(30\)`, R`\(33\)`, R`\(36\)`],
      answer: 1,
      help: R`위치를 같게 놓으면 \(t^{3}-6t^{2}+t-6=0\)이고, 이것은 \((t-6)(t^{2}+1)=0\)으로 인수분해되어 실근이 \(t=6\) 하나뿐이다.`
    },
    {
      id: "2025-09-12", exam: "2025-09", no: 12, score: 4,
      units: ["m1-seq"], memo: "부호가 번갈아 붙은 합",
      body: R`수열 \(\{a_{n}\}\)은 등차수열이고, 수열 \(\{b_{n}\}\)은 모든 자연수 \(n\)에
        대하여
        \[b_{n}=\sum_{k=1}^{n}(-1)^{k+1}a_{k}\]
        를 만족시킨다. \(b_{2}=-2\), \(b_{3}+b_{7}=0\)일 때, 수열 \(\{b_{n}\}\)의
        첫째항부터 제\(9\)항까지의 합은?`,
      choices: [R`\(-22\)`, R`\(-20\)`, R`\(-18\)`, R`\(-16\)`, R`\(-14\)`],
      answer: 2,
      help: R`\(b_{2}=a_{1}-a_{2}=-d\)이므로 공차가 곧바로 정해진다. 그리고 두 항씩 묶으면 \(n\)이 홀수일 때 \(b_{n}=a_{1}+\frac{(n-1)d}{2}\), 짝수일 때 \(b_{n}=-\frac{nd}{2}\)로 간단해진다.`
    },
    {
      id: "2025-09-13", exam: "2025-09", no: 13, score: 4,
      units: ["m2-integ"], memo: "y축 대칭인 조각함수의 두 넓이",
      body: R`함수
        \[f(x)=\begin{cases}-x^{2}-2x+6 &amp; (x<0)\\ -x^{2}+2x+6 &amp; (x\ge 0)\end{cases}\]
        의 그래프가 \(x\)축과 만나는 서로 다른 두 점을 \(\mathrm{P}\), \(\mathrm{Q}\)라 하고,
        상수 \(k\,(k>4)\)에 대하여 직선 \(x=k\)가 \(x\)축과 만나는 점을
        \(\mathrm{R}\)이라 하자. 곡선 \(y=f(x)\)와 선분 \(\mathrm{PQ}\)로 둘러싸인 부분의
        넓이를 \(A\), 곡선 \(y=f(x)\)와 직선 \(x=k\) 및 선분 \(\mathrm{QR}\)로
        둘러싸인 부분의 넓이를 \(B\)라 하자. \(A=2B\)일 때, \(k\)의 값은?
        (단, 점 \(\mathrm{P}\)의 \(x\)좌표는 음수이다.)`,
      choices: [R`\(\dfrac{9}{2}\)`, R`\(5\)`, R`\(\dfrac{11}{2}\)`, R`\(6\)`, R`\(\dfrac{13}{2}\)`],
      answer: 4,
      help: R`\(f\)는 \(y\)축에 대하여 대칭이다. \(F(0)=0\)인 \(f\)의 부정적분 \(F\)를 잡고 \(A=2B\)를 부호를 붙여 정리하면 \(F(k)=0\)이라는 한 줄이 되어, \(\mathrm{P}\)와 \(\mathrm{Q}\)의 좌표를 구하지 않아도 된다.`
    },
    {
      id: "2025-09-14", exam: "2025-09", no: 14, score: 4,
      units: ["m1-explog"], memo: "y=x에 대칭인 원과 두 곡선",
      body: R`자연수 \(n\)에 대하여 곡선 \(y=2^{x}\) 위의 두 점 \(\mathrm{A}_{n}\), \(\mathrm{B}_{n}\)이
        다음 조건을 만족시킨다.`,
      note: [
        R`(가) 직선 \(\mathrm{A}_{n}\mathrm{B}_{n}\)의 기울기는 \(3\)이다.`,
        R`(나) \(\overline{\mathrm{A}_{n}\mathrm{B}_{n}}=n\times\sqrt{10}\)`
      ],
      bodyAfter: R`중심이 직선 \(y=x\) 위에 있고 두 점 \(\mathrm{A}_{n}\), \(\mathrm{B}_{n}\)을 지나는 원이
        곡선 \(y=\log_{2}x\)와 만나는 두 점의 \(x\)좌표 중 큰 값을 \(x_{n}\)이라
        하자. \(x_{1}+x_{2}+x_{3}\)의 값은?`,
      choices: [R`\(\dfrac{150}{7}\)`, R`\(\dfrac{155}{7}\)`, R`\(\dfrac{160}{7}\)`, R`\(\dfrac{165}{7}\)`, R`\(\dfrac{170}{7}\)`],
      answer: 5,
      help: R`기울기가 \(3\)이고 길이가 \(n\sqrt{10}\)이면 두 점의 \(x\)좌표 차가 \(n\)이다. 그리고 중심이 \(y=x\) 위에 있는 원은 직선 \(y=x\)에 대하여 대칭이므로, \(y=2^{x}\) 위의 두 점을 지나면 그 대칭점인 \(y=\log_{2}x\) 위의 두 점도 지난다. 곧 \(x_{n}\)은 \(\mathrm{A}_{n}\), \(\mathrm{B}_{n}\)의 \(y\)좌표 중 큰 값이다.`
    },
    {
      id: "2025-09-15", exam: "2025-09", no: 15, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "적분식 두 개를 미분해 묶기",
      body: R`두 다항함수 \(f(x)\), \(g(x)\)는 모든 실수 \(x\)에 대하여 다음
        조건을 만족시킨다.`,
      note: [
        R`(가) \(\displaystyle\int_{1}^{x}t\,f(t)\,dt+\int_{-1}^{x}t\,g(t)\,dt=3x^{4}+8x^{3}-3x^{2}\)`,
        R`(나) \(f(x)=x\,g'(x)\)`
      ],
      bodyAfter: R`\(\displaystyle\int_{0}^{3}g(x)\,dx\)의 값은?`,
      choices: [R`\(72\)`, R`\(76\)`, R`\(80\)`, R`\(84\)`, R`\(88\)`],
      answer: 1,
      help: R`(가)의 양변을 미분하면 \(x f(x)+x g(x)=12x^{3}+24x^{2}-6x\), 곧 \(f(x)+g(x)=12x^{2}+24x-6\)이 된다. 여기에 (나)를 넣으면 \(g\)와 \(g'\)만 남은 관계식 하나가 된다.`
    },
    {
      id: "2025-09-20", exam: "2025-09", no: 20, score: 4,
      units: ["m1-trig"], memo: "진폭이 다른 두 조각의 가로선 자르기",
      body: R`닫힌구간 \([0,\,2\pi]\)에서 정의된 함수
        \[f(x)=\begin{cases}\sin x-1 &amp; (0\le x<\pi)\\ -\sqrt{2}\sin x-1 &amp; (\pi\le x\le 2\pi)\end{cases}\]
        가 있다. \(0\le t\le 2\pi\)인 실수 \(t\)에 대하여 \(x\)에 대한 방정식
        \(f(x)=f(t)\)의 서로 다른 실근의 개수가 \(3\)이 되도록 하는
        모든 \(t\)의 값의 합은 \(\dfrac{q}{p}\pi\)이다. \(p+q\)의 값을 구하시오.
        (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 15,
      help: R`\(f(t)\)를 어떤 높이 \(c\)로 보고, 가로선 \(y=c\)가 그래프와 몇 번 만나는지 세는 문제다. 앞 조각은 \(-1\)에서 \(0\)까지, 뒤 조각은 \(-1-\sqrt{2}\)에서 \(-1+\sqrt{2}\)까지 오르내려 진폭이 다르다. 두 조각이 겹치는 높이에서만 근이 셋이 된다.`
    },
    {
      id: "2025-09-21", exam: "2025-09", no: 21, score: 4,
      units: ["m2-diff"], memo: "평균변화율이 두 식 사이에 끼일 조건",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)가 모든 정수 \(k\)에
        대하여
        \[2k-8 \le \frac{f(k+2)-f(k)}{2} \le 4k^{2}+14k\]
        를 만족시킬 때, \(f'(3)\)의 값을 구하시오.`,
      short: true,
      answer: 31,
      help: R`가운데는 \(x=k\)와 \(x=k+2\) 사이의 평균변화율이다. \(f(x)=x^{3}+ax^{2}+bx+c\)로 놓고 계산하면 \(k\)에 대한 이차식이 되고, 그것이 모든 정수 \(k\)에서 두 식 사이에 끼여야 한다는 조건이 \(a\)와 \(b\)를 좁힌다.`
    },
    {
      id: "2025-09-22", exam: "2025-09", no: 22, score: 4,
      units: ["m1-seq"], memo: "두 갈래 점화식으로 0에 닿기",
      body: R`양수 \(k\)에 대하여 \(a_{1}=k\)인 수열 \(\{a_{n}\}\)이 다음 조건을
        만족시킨다.`,
      note: [
        R`(가) \(a_{2}\times a_{3}<0\)`,
        R`(나) 모든 자연수 \(n\)에 대하여 \(\left(a_{n+1}-a_{n}+\dfrac{2}{3}k\right)\left(a_{n+1}+k\,a_{n}\right)=0\)이다.`
      ],
      bodyAfter: R`\(a_{5}=0\)이 되도록 하는 서로 다른 모든 양수 \(k\)에 대하여
        \(k^{2}\)의 값의 합을 구하시오.`,
      short: true,
      answer: 8,
      help: R`(나)는 각 \(n\)마다 \(a_{n+1}=a_{n}-\frac{2}{3}k\)이거나 \(a_{n+1}=-k\,a_{n}\), 둘 중 하나라는 뜻이다. 뒤쪽 규칙은 \(a_{n}=0\)일 때만 \(0\)을 만드니, \(a_{5}=0\)에 닿는 마지막 걸음이 어느 쪽이었는지부터 갈라 보면 된다.`
    },
    {
      id: "2025-06-9", exam: "2025-06", no: 9, score: 4,
      units: ["m2-limit"], memo: "제곱해서 연속이 되게 하기",
      body: R`함수
        \[f(x)=\begin{cases}x-\dfrac{1}{2} &amp; (x<0)\\[4pt] -x^{2}+3 &amp; (x\ge 0)\end{cases}\]
        에 대하여 함수 \(\bigl(f(x)+a\bigr)^{2}\)이 실수 전체의 집합에서 연속일 때,
        상수 \(a\)의 값은?`,
      choices: [R`\(-\dfrac{9}{4}\)`, R`\(-\dfrac{7}{4}\)`, R`\(-\dfrac{5}{4}\)`, R`\(-\dfrac{3}{4}\)`, R`\(-\dfrac{1}{4}\)`],
      answer: 3,
      help: R`\(f\)는 \(x=0\)에서 좌극한이 \(-\frac{1}{2}\), 함숫값이 \(3\)이라 불연속이다. 제곱한 것이 연속이 되려면 두 값에 \(a\)를 더한 것이 부호만 반대여야 하므로 \(-\frac{1}{2}+a=-(3+a)\)다.`
    },
    {
      id: "2025-06-10", exam: "2025-06", no: 10, score: 4,
      units: ["m1-trig"], memo: "두 조건이 정하는 삼각형",
      body: R`다음 조건을 만족시키는 삼각형 \(\mathrm{ABC}\)의 외접원의 넓이가
        \(9\pi\)일 때, 삼각형 \(\mathrm{ABC}\)의 넓이는?`,
      note: [
        R`(가) \(3\sin A=2\sin B\)`,
        R`(나) \(\cos B=\cos C\)`
      ],
      choices: [R`\(\dfrac{32}{9}\sqrt{2}\)`, R`\(\dfrac{40}{9}\sqrt{2}\)`, R`\(\dfrac{16}{3}\sqrt{2}\)`, R`\(\dfrac{56}{9}\sqrt{2}\)`, R`\(\dfrac{64}{9}\sqrt{2}\)`],
      answer: 5,
      help: R`(나)는 \(B=C\), 곧 이등변삼각형이라는 뜻이고 (가)는 사인법칙으로 \(3a=2b\)라는 뜻이다. 세 변이 모두 \(a\)의 배수로 표현되므로 코사인법칙에서 \(\cos A\)가 곧바로 나온다.`
    },
    {
      id: "2025-06-11", exam: "2025-06", no: 11, score: 4,
      units: ["m2-diff"], memo: "극한값이 알려 주는 함숫값과 미분계수",
      body: R`최고차항의 계수가 \(1\)이고 \(f(0)=0\)인 삼차함수 \(f(x)\)가
        \[\lim_{x\to a}\frac{f(x)-1}{x-a}=3\]
        을 만족시킨다. 곡선 \(y=f(x)\) 위의 점 \(\bigl(a,\,f(a)\bigr)\)에서의 접선의
        \(y\)절편이 \(4\)일 때, \(f(1)\)의 값은? (단, \(a\)는 상수이다.)`,
      choices: [R`\(-1\)`, R`\(-2\)`, R`\(-3\)`, R`\(-4\)`, R`\(-5\)`],
      answer: 5,
      help: R`분모가 \(0\)으로 가는데 극한값이 있으니 분자도 \(0\), 곧 \(f(a)=1\)이고 그때 극한값이 \(f'(a)=3\)이다. 그러면 접선이 \(y=1+3(x-a)\)이므로 \(y\)절편 조건이 \(1-3a=4\)가 되어 \(a\)가 정해진다.`
    },
    {
      id: "2025-06-12", exam: "2025-06", no: 12, score: 4,
      units: ["m1-explog"], memo: "점에 대하여 대칭인 두 지수 곡선",
      body: R`그림과 같이 곡선 \(y=1-2^{-x}\) 위의 제1사분면에 있는
        점 \(\mathrm{A}\)를 지나고 \(y\)축에 평행한 직선이 곡선 \(y=2^{x}\)과 만나는
        점을 \(\mathrm{B}\)라 하자. 점 \(\mathrm{A}\)를 지나고 \(x\)축에 평행한 직선이 곡선
        \(y=2^{x}\)과 만나는 점을 \(\mathrm{C}\), 점 \(\mathrm{C}\)를 지나고 \(y\)축에 평행한 직선이
        곡선 \(y=1-2^{-x}\)과 만나는 점을 \(\mathrm{D}\)라 하자. \(\overline{\mathrm{AB}}=2\overline{\mathrm{CD}}\)일 때,
        사각형 \(\mathrm{ABCD}\)의 넓이는?`,
      figure: "2025-06-12.webp",
      choices: [R`\(\dfrac{5}{2}\log_{2}3-\dfrac{5}{4}\)`, R`\(3\log_{2}3-\dfrac{3}{2}\)`, R`\(\dfrac{7}{2}\log_{2}3-\dfrac{7}{4}\)`, R`\(4\log_{2}3-2\)`, R`\(\dfrac{9}{2}\log_{2}3-\dfrac{9}{4}\)`],
      answer: 3,
      help: R`두 곡선 \(y=2^{x}\)와 \(y=1-2^{-x}\)는 점 \(\left(0,\,\frac{1}{2}\right)\)에 대하여 대칭이다. \((x,\,y)\)를 \((-x,\,1-y)\)로 옮기면 한쪽 식이 다른 쪽 식이 되기 때문이다. 이 대칭이 네 점의 좌표를 서로 묶어 준다.`
    },
    {
      id: "2025-06-13", exam: "2025-06", no: 13, score: 4,
      units: ["m2-integ"], memo: "위아래가 바뀐 두 넓이의 차",
      body: R`곡선 \(y=\dfrac{1}{4}x^{3}+\dfrac{1}{2}x\)와 직선 \(y=mx+2\) 및 \(y\)축으로
        둘러싸인 부분의 넓이를 \(A\), 곡선 \(y=\dfrac{1}{4}x^{3}+\dfrac{1}{2}x\)와 두 직선
        \(y=mx+2\), \(x=2\)로 둘러싸인 부분의 넓이를 \(B\)라 하자.
        \(B-A=\dfrac{2}{3}\)일 때, 상수 \(m\)의 값은? (단, \(m<-1\))`,
      figure: "2025-06-13.webp",
      choices: [R`\(-\dfrac{3}{2}\)`, R`\(-\dfrac{17}{12}\)`, R`\(-\dfrac{4}{3}\)`, R`\(-\dfrac{5}{4}\)`, R`\(-\dfrac{7}{6}\)`],
      answer: 3,
      help: R`\(A\)와 \(B\)는 곡선과 직선의 위아래가 서로 바뀐 두 조각이다. 그래서 \(B-A\)를 부호를 붙여 묶으면 교점을 구하지 않고 \(\displaystyle\int_{0}^{2}\left(\frac{1}{4}x^{3}+\frac{1}{2}x-(mx+2)\right)dx=\frac{2}{3}\) 한 줄이 된다.`
    },
    {
      id: "2025-06-14", exam: "2025-06", no: 14, score: 4,
      units: ["m1-explog"], memo: "밑을 맞추면 드러나는 부등식",
      body: R`다음 조건을 만족시키는 모든 자연수 \(k\)의 값의 합은?`,
      note: [
        R`\(\log_{2}\sqrt{-n^{2}+10n+75}-\log_{4}(75-kn)\)의 값이 양수가 되도록 하는 자연수 \(n\)의 개수가 \(12\)이다.`
      ],
      choices: [R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`, R`\(10\)`],
      answer: 4,
      help: R`\(\log_{2}\sqrt{X}=\frac{1}{2}\log_{2}X=\log_{4}X\)이므로 두 항의 밑이 \(4\)로 같아진다. 그러면 조건이 \(-n^{2}+10n+75>75-kn>0\)이라는 부등식 두 개로 바뀐다.`
    },
    {
      id: "2025-06-15", exam: "2025-06", no: 15, score: 4,
      units: ["m2-diff", "m2-integ"], memo: "절댓값의 합과 차가 만드는 구간 조건",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)와 상수 \(k\,(k\ge 0)\)에
        대하여 함수
        \[g(x)=\begin{cases}2x-k &amp; (x\le k)\\ f(x) &amp; (x>k)\end{cases}\]
        가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 함수 \(g(x)\)는 실수 전체의 집합에서 증가하고 미분가능하다.`,
        R`(나) 모든 실수 \(x\)에 대하여 \(\displaystyle\int_{0}^{x}g(t)\bigl\{|t(t-1)|+t(t-1)\bigr\}dt\ge 0\)이고 \(\displaystyle\int_{3}^{x}g(t)\bigl\{|(t-1)(t+2)|-(t-1)(t+2)\bigr\}dt\ge 0\)이다.`
      ],
      bodyAfter: R`\(g(k+1)\)의 최솟값은?`,
      choices: [R`\(4-\sqrt{6}\)`, R`\(5-\sqrt{6}\)`, R`\(6-\sqrt{6}\)`, R`\(7-\sqrt{6}\)`, R`\(8-\sqrt{6}\)`],
      answer: 2,
      help: R`\(|X|+X\)는 \(X>0\)일 때 \(2X\), 아니면 \(0\)이다. \(|X|-X\)는 그 반대다. 그러니 (나)의 두 적분은 각각 \(t(t-1)>0\)인 구간과 \((t-1)(t+2)<0\)인 구간에서만 값을 갖고, 나머지 구간은 아예 \(0\)이다. 곧 \(g\)의 부호를 그 두 구간에서만 따지라는 말이다.`
    },
    {
      id: "2025-06-20", exam: "2025-06", no: 20, score: 4,
      units: ["m1-trig"], memo: "세 직선이 사인 곡선을 자르는 점 세기",
      body: R`\(5\) 이하의 두 자연수 \(a\), \(b\)에 대하여 열린구간 \((0,\,2\pi)\)에서
        정의된 함수 \(y=a\sin x+b\)의 그래프가 직선 \(x=\pi\)와 만나는
        점의 집합을 \(A\)라 하고, 두 직선 \(y=1\), \(y=3\)과 만나는 점의
        집합을 각각 \(B\), \(C\)라 하자. \(n(A\cup B\cup C)=3\)이 되도록 하는
        \(a\), \(b\)의 순서쌍 \((a,\,b)\)에 대하여 \(a+b\)의 최댓값을 \(M\), 최솟값을
        \(m\)이라 할 때, \(M\times m\)의 값을 구하시오.`,
      short: true,
      answer: 24,
      help: R`\(x=\pi\)에서 \(y=a\sin\pi+b=b\)이므로 \(A\)의 원소는 언제나 한 개다. 그러니 \(B\)와 \(C\)에서 나오는 점이 둘이어야 하는데, \(b\)가 \(1\)이나 \(3\)이면 \(A\)의 점이 \(B\)나 \(C\)에 들어가 겹친다. 그 겹침까지 세어야 한다.`
    },
    {
      id: "2025-06-21", exam: "2025-06", no: 21, score: 4,
      units: ["m2-diff"], memo: "사차함수의 두 극솟값 가운데 높은 쪽",
      body: R`최고차항의 계수가 \(1\)인 사차함수 \(f(x)\)가 다음 조건을
        만족시킨다.`,
      note: [
        R`(가) \(f'(a)\le 0\)인 실수 \(a\)의 최댓값은 \(2\)이다.`,
        R`(나) 집합 \(\{x\mid f(x)=k\}\)의 원소의 개수가 \(3\) 이상이 되도록 하는 실수 \(k\)의 최솟값은 \(\dfrac{8}{3}\)이다.`
      ],
      bodyAfter: R`\(f(0)=0\), \(f'(1)=0\)일 때, \(f(3)\)의 값을 구하시오.`,
      short: true,
      answer: 15,
      help: R`(가)는 \(f'\)의 가장 큰 실근이 \(2\)라는 뜻이니, \(f\)는 \(x=2\)에서 마지막 극소를 갖고 그 뒤로는 계속 증가한다. 그리고 사차함수에서 가로선이 세 번 이상 만나기 시작하는 높이는 두 극솟값 가운데 높은 쪽이므로, (나)의 \(\frac{8}{3}\)이 바로 그 값이다.`
    },
    {
      id: "2025-06-22", exam: "2025-06", no: 22, score: 4,
      units: ["m1-seq"], memo: "제곱수에서만 갈리는 점화식",
      body: R`수열 \(\{a_{n}\}\)은
        \[a_{2}=-a_{1}\]
        이고, \(n\ge 2\)인 모든 자연수 \(n\)에 대하여
        \[a_{n+1}=\begin{cases}a_{n}-\sqrt{n}\times a_{\sqrt{n}} &amp; \left(\sqrt{n}\text{이 자연수이고 } a_{n}>0\text{인 경우}\right)\\ a_{n}+1 &amp; (\text{그 외의 경우})\end{cases}\]
        를 만족시킨다. \(a_{15}=1\)이 되도록 하는 모든 \(a_{1}\)의 값의 곱을
        구하시오.`,
      short: true,
      answer: 231,
      help: R`규칙이 갈리는 자리는 \(\sqrt{n}\)이 자연수일 때, 곧 \(n=4\)와 \(n=9\)뿐이다. 나머지 자리에서는 \(a_{n+1}=a_{n}+1\)로 한 칸씩 오른다. 그 두 자리에서 \(a_{n}>0\)인지 아닌지에 따라 갈래가 생긴다.`
    },
    {
      id: "2024-suneung-9", exam: "2024-suneung", no: 9, score: 4,
      units: ["m1-explog"], memo: "로그값 두 개 사이의 내분점",
      body: R`수직선 위의 두 점 \(\mathrm{P}\bigl(\log_{5}3\bigr)\), \(\mathrm{Q}\bigl(\log_{5}12\bigr)\)에 대하여
        선분 \(\mathrm{PQ}\)를 \(m:(1-m)\)으로 내분하는 점의 좌표가 \(1\)일 때,
        \(4^{m}\)의 값은? (단, \(m\)은 \(0<m<1\)인 상수이다.)`,
      choices: [R`\(\dfrac{7}{6}\)`, R`\(\dfrac{4}{3}\)`, R`\(\dfrac{3}{2}\)`, R`\(\dfrac{5}{3}\)`, R`\(\dfrac{11}{6}\)`],
      answer: 4,
      help: R`내분점의 좌표는 \(\log_{5}3+m\left(\log_{5}12-\log_{5}3\right)=\log_{5}3+m\log_{5}4\)다. 이것이 \(1\)이라는 조건에서 \(m\log_{5}4=\log_{5}\frac{5}{3}\)가 나오고, 구하는 것이 \(4^{m}\)이라 \(m=\log_{4}\frac{5}{3}\)만 있으면 끝난다.`
    },
    {
      id: "2024-suneung-10", exam: "2024-suneung", no: 10, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "두 점 사이 거리가 늘고 주는 자리",
      body: R`시각 \(t=0\)일 때 동시에 원점을 출발하여 수직선 위를
        움직이는 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 시각 \(t\,(t\ge 0)\)에서의 속도가 각각
        \[v_{1}(t)=t^{2}-6t+5,\qquad v_{2}(t)=2t-7\]
        이다. 시각 \(t\)에서의 두 점 \(\mathrm{P}\), \(\mathrm{Q}\) 사이의 거리를 \(f(t)\)라 할 때,
        함수 \(f(t)\)는 구간 \([0,\,a]\)에서 증가하고, 구간 \([a,\,b]\)에서
        감소하고, 구간 \([b,\,\infty)\)에서 증가한다. 시각 \(t=a\)에서
        \(t=b\)까지 점 \(\mathrm{Q}\)가 움직인 거리는? (단, \(0<a<b\))`,
      choices: [R`\(\dfrac{15}{2}\)`, R`\(\dfrac{17}{2}\)`, R`\(\dfrac{19}{2}\)`, R`\(\dfrac{21}{2}\)`, R`\(\dfrac{23}{2}\)`],
      answer: 2,
      help: R`두 점 사이의 거리는 위치의 차의 절댓값이고, 그 차를 \(h(t)\)라 하면 \(h'(t)=v_{1}-v_{2}=(t-2)(t-6)\)이다. 곧 \(a=2\), \(b=6\)이 곧바로 나온다. 움직인 거리는 \(\int_{2}^{6}\bigl|v_{2}\bigr|dt\)이므로 \(v_{2}=0\)이 되는 \(t=\frac{7}{2}\)에서 구간을 끊어야 한다.`
    },
    {
      id: "2024-suneung-11", exam: "2024-suneung", no: 11, score: 4,
      units: ["m1-seq"], memo: "가운데 항이 0인 등차수열",
      body: R`공차가 \(0\)이 아닌 등차수열 \(\{a_{n}\}\)에 대하여
        \[\bigl|a_{6}\bigr|=a_{8},\qquad \sum_{k=1}^{5}\frac{1}{a_{k}a_{k+1}}=\frac{5}{96}\]
        일 때, \(\displaystyle\sum_{k=1}^{15}a_{k}\)의 값은?`,
      choices: [R`\(60\)`, R`\(65\)`, R`\(70\)`, R`\(75\)`, R`\(80\)`],
      answer: 1,
      help: R`공차가 \(0\)이 아니므로 \(|a_{6}|=a_{8}\)은 \(a_{6}=-a_{8}\), 곧 \(a_{7}=0\)이라는 뜻이다. 그러면 \(a_{n}=(n-7)d\)로 쓸 수 있고, \(\frac{1}{a_{k}a_{k+1}}\)이 \(\frac{1}{d^{2}}\left(\frac{1}{k-7}-\frac{1}{k-6}\right)\)로 갈라져 합이 접힌다.`
    },
    {
      id: "2024-suneung-12", exam: "2024-suneung", no: 12, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "곡선을 직선으로 갈아 끼운 넓이의 최댓값",
      body: R`함수 \(f(x)=\dfrac{1}{9}x(x-6)(x-9)\)와 실수 \(t\,(0<t<6)\)에 대하여
        함수 \(g(x)\)는
        \[g(x)=\begin{cases}f(x) &amp; (x<t)\\ -(x-t)+f(t) &amp; (x\ge t)\end{cases}\]
        이다. 함수 \(y=g(x)\)의 그래프와 \(x\)축으로 둘러싸인 영역의
        넓이의 최댓값은?`,
      choices: [R`\(\dfrac{125}{4}\)`, R`\(\dfrac{127}{4}\)`, R`\(\dfrac{129}{4}\)`, R`\(\dfrac{131}{4}\)`, R`\(\dfrac{133}{4}\)`],
      answer: 3,
      help: R`\(x\ge t\)에서 \(g\)는 점 \(\bigl(t,\,f(t)\bigr)\)를 지나고 기울기가 \(-1\)인 직선이다. 그러니 넓이는 \(t\)까지의 곡선 부분과 그 뒤 직선이 만드는 삼각형의 합이고, \(t\)에 대한 식으로 쓴 뒤 미분하면 최댓값이 나온다.`
    },
    {
      id: "2024-suneung-13", exam: "2024-suneung", no: 13, score: 4,
      units: ["m1-trig"], memo: "대각선을 함께 쓰는 두 삼각형",
      body: R`그림과 같이
        \[\overline{\mathrm{AB}}=3,\quad \overline{\mathrm{BC}}=\sqrt{13},\quad \overline{\mathrm{AD}}\times\overline{\mathrm{CD}}=9,\quad \angle\mathrm{BAC}=\frac{\pi}{3}\]
        인 사각형 \(\mathrm{ABCD}\)가 있다. 삼각형 \(\mathrm{ABC}\)의 넓이를 \(S_{1}\),
        삼각형 \(\mathrm{ACD}\)의 넓이를 \(S_{2}\)라 하고, 삼각형 \(\mathrm{ACD}\)의 외접원의
        반지름의 길이를 \(R\)이라 하자. \(S_{2}=\dfrac{5}{6}S_{1}\)일 때,
        \(\dfrac{R}{\sin(\angle\mathrm{ADC})}\)의 값은?`,
      figure: "2024-suneung-13.webp",
      choices: [R`\(\dfrac{54}{25}\)`, R`\(\dfrac{117}{50}\)`, R`\(\dfrac{63}{25}\)`, R`\(\dfrac{27}{10}\)`, R`\(\dfrac{72}{25}\)`],
      answer: 1,
      help: R`두 삼각형은 대각선 \(\mathrm{AC}\)를 함께 쓴다. 코사인법칙으로 \(\overline{\mathrm{AC}}=4\)가 먼저 나오고, \(S_{2}=\frac{1}{2}\overline{\mathrm{AD}}\times\overline{\mathrm{CD}}\times\sin(\angle\mathrm{ADC})\)에 \(\overline{\mathrm{AD}}\times\overline{\mathrm{CD}}=9\)를 그대로 넣을 수 있다. 그리고 사인법칙에서 \(R=\frac{\overline{\mathrm{AC}}}{2\sin(\angle\mathrm{ADC})}\)다.`
    },
    {
      id: "2024-suneung-14", exam: "2024-suneung", no: 14, score: 4,
      units: ["m2-diff"], memo: "가로선과 만나는 점의 개수가 뛰는 자리",
      body: R`두 자연수 \(a\), \(b\)에 대하여 함수 \(f(x)\)는
        \[f(x)=\begin{cases}2x^{3}-6x+1 &amp; (x\le 2)\\ a(x-2)(x-b)+9 &amp; (x>2)\end{cases}\]
        이다. 실수 \(t\)에 대하여 함수 \(y=f(x)\)의 그래프와 직선 \(y=t\)가
        만나는 점의 개수를 \(g(t)\)라 하자.
        \[g(k)+\lim_{t\to k-}g(t)+\lim_{t\to k+}g(t)=9\]
        를 만족시키는 실수 \(k\)의 개수가 \(1\)이 되도록 하는 두 자연수
        \(a\), \(b\)의 순서쌍 \((a,\,b)\)에 대하여 \(a+b\)의 최댓값은?`,
      choices: [R`\(51\)`, R`\(52\)`, R`\(53\)`, R`\(54\)`, R`\(55\)`],
      answer: 1,
      help: R`\(g(t)\)는 가로선 \(y=t\)가 그래프와 만나는 점의 개수라 \(t\)가 극값이나 끊어진 자리의 높이를 지날 때만 값이 뛴다. 그런 자리가 아니면 세 값이 모두 같아 합이 \(3\)의 배수가 되므로, 합이 \(9\)가 되는 \(k\)는 \(g(k)=3\)이면서 좌우 극한도 \(3\)인 자리이거나 값이 뛰는 자리다.`
    },
    {
      id: "2024-suneung-15", exam: "2024-suneung", no: 15, score: 4,
      units: ["m1-seq"], memo: "홀짝에 따라 뛰거나 줄어드는 수열",
      body: R`첫째항이 자연수인 수열 \(\{a_{n}\}\)이 모든 자연수 \(n\)에 대하여
        \[a_{n+1}=\begin{cases}2^{a_{n}} &amp; \left(a_{n}\text{이 홀수인 경우}\right)\\[2pt] \dfrac{1}{2}a_{n} &amp; \left(a_{n}\text{이 짝수인 경우}\right)\end{cases}\]
        를 만족시킬 때, \(a_{6}+a_{7}=3\)이 되도록 하는 모든 \(a_{1}\)의 값의
        합은?`,
      choices: [R`\(139\)`, R`\(146\)`, R`\(153\)`, R`\(160\)`, R`\(167\)`],
      answer: 3,
      help: R`홀수를 만나면 \(2^{a_{n}}\)으로 껑충 뛰고 짝수를 만나면 반으로 준다. \(a_{6}+a_{7}=3\)은 두 항이 \(1\)과 \(2\)라는 뜻이므로 뒷부분이 매우 작다. 그러니 앞으로 밀지 말고 \(a_{6}\), \(a_{7}\)에서 거꾸로 거슬러 올라가며 각 자리에서 어느 규칙을 썼는지 갈라 보면 된다.`
    },
    {
      id: "2024-suneung-20", exam: "2024-suneung", no: 20, score: 4,
      units: ["m2-diff"], memo: "두 접선이 수직이 되는 조건",
      body: R`\(a>\sqrt{2}\)인 실수 \(a\)에 대하여 함수 \(f(x)\)를
        \[f(x)=-x^{3}+ax^{2}+2x\]
        라 하자. 곡선 \(y=f(x)\) 위의 점 \(\mathrm{O}(0,\,0)\)에서의 접선이
        곡선 \(y=f(x)\)와 만나는 점 중 \(\mathrm{O}\)가 아닌 점을 \(\mathrm{A}\)라 하고,
        곡선 \(y=f(x)\) 위의 점 \(\mathrm{A}\)에서의 접선이 \(x\)축과 만나는 점을
        \(\mathrm{B}\)라 하자. 점 \(\mathrm{A}\)가 선분 \(\mathrm{OB}\)를 지름으로 하는 원 위의 점일 때,
        \(\overline{\mathrm{OA}}\times\overline{\mathrm{AB}}\)의 값을 구하시오.`,
      short: true,
      answer: 25,
      help: R`\(\mathrm{A}\)가 지름 \(\mathrm{OB}\) 위의 원에 있다는 것은 \(\angle\mathrm{OAB}=\frac{\pi}{2}\)라는 뜻이다. \(\mathrm{OA}\)는 원점에서 그은 접선이고 \(\mathrm{AB}\)는 \(\mathrm{A}\)에서의 접선이므로, 두 직선의 기울기의 곱이 \(-1\)이라는 식 하나가 \(a\)를 정해 준다.`
    },
    {
      id: "2024-suneung-21", exam: "2024-suneung", no: 21, score: 4,
      units: ["m1-explog"], memo: "움직이는 창 안에서의 최댓값",
      body: R`양수 \(a\)에 대하여 \(x\ge -1\)에서 정의된 함수 \(f(x)\)는
        \[f(x)=\begin{cases}-x^{2}+6x &amp; (-1\le x<6)\\ a\log_{4}(x-5) &amp; (x\ge 6)\end{cases}\]
        이다. \(t\ge 0\)인 실수 \(t\)에 대하여 닫힌구간 \([t-1,\,t+1]\)에서의
        \(f(x)\)의 최댓값을 \(g(t)\)라 하자. 구간 \([0,\,\infty)\)에서 함수 \(g(t)\)의
        최솟값이 \(5\)가 되도록 하는 양수 \(a\)의 최솟값을 구하시오.`,
      short: true,
      answer: 10,
      help: R`\(-x^{2}+6x\)는 \(x=3\)에서 최댓값 \(9\)이고, \(a\log_{4}(x-5)\)는 \(x=6\)에서 \(0\)으로 시작해 계속 커진다. 길이 \(2\)인 창을 오른쪽으로 밀면 최댓값은 처음엔 포물선 쪽에 붙어 있다가 어느 순간 로그 쪽으로 넘어간다. \(g\)가 가장 작아지는 곳은 그 넘어가기 직전, 창이 두 봉우리 사이 골짜기에 놓일 때다.`
    },
    {
      id: "2024-suneung-22", exam: "2024-suneung", no: 22, score: 4,
      units: ["m2-diff"], memo: "부호가 바뀌는 정수 자리가 없을 조건",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)가 다음 조건을
        만족시킨다.`,
      note: [
        R`함수 \(f(x)\)에 대하여 \(f(k-1)f(k+1)<0\)을 만족시키는 정수 \(k\)는 존재하지 않는다.`
      ],
      bodyAfter: R`\(f'\left(-\dfrac{1}{4}\right)=-\dfrac{1}{4}\), \(f'\left(\dfrac{1}{4}\right)<0\)일 때, \(f(8)\)의 값을 구하시오.`,
      short: true,
      answer: 483,
      help: R`\(f(k-1)f(k+1)<0\)인 정수 \(k\)가 없다는 것은, 어떤 정수 \(k\)를 잡아도 \(k-1\)과 \(k+1\)에서 \(f\)의 부호가 서로 다르지 않다는 뜻이다. 곧 \(f\)의 실근들이 길이 \(2\)인 구간 \([k-1,\,k+1]\)마다 부호를 뒤집지 못하도록 촘촘히 몰려 있어야 한다.`
    },
    {
      id: "2024-09-9", exam: "2024-09", no: 9, score: 4,
      units: ["m1-trig"], memo: "사인을 코사인으로 바꿔 견주기",
      body: R`\(0\le x\le 2\pi\)일 때, 부등식
        \[\cos x\le\sin\frac{\pi}{7}\]
        을 만족시키는 모든 \(x\)의 값의 범위는 \(\alpha\le x\le\beta\)이다.
        \(\beta-\alpha\)의 값은?`,
      choices: [R`\(\dfrac{8}{7}\pi\)`, R`\(\dfrac{17}{14}\pi\)`, R`\(\dfrac{9}{7}\pi\)`, R`\(\dfrac{19}{14}\pi\)`, R`\(\dfrac{10}{7}\pi\)`],
      answer: 3,
      help: R`\(\sin\frac{\pi}{7}=\cos\left(\frac{\pi}{2}-\frac{\pi}{7}\right)=\cos\frac{5\pi}{14}\)로 바꾸면 양변이 모두 코사인이 되어, 부등식이 \(\cos x\le\cos\frac{5\pi}{14}\)가 된다.`
    },
    {
      id: "2024-09-10", exam: "2024-09", no: 10, score: 4,
      units: ["m2-diff"], memo: "두 접선이 만나는 점",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)에 대하여
        곡선 \(y=f(x)\) 위의 점 \(\bigl(-2,\,f(-2)\bigr)\)에서의 접선과
        곡선 \(y=f(x)\) 위의 점 \((2,\,3)\)에서의 접선이
        점 \((1,\,3)\)에서 만날 때, \(f(0)\)의 값은?`,
      choices: [R`\(31\)`, R`\(33\)`, R`\(35\)`, R`\(37\)`, R`\(39\)`],
      answer: 3,
      help: R`점 \((2,\,3)\)이 곡선 위의 점이므로 \(f(2)=3\)이다. 그리고 두 접선이 만나는 점 \((1,\,3)\)은 \((2,\,3)\)과 \(y\)좌표가 같으므로, \((2,\,3)\)에서의 접선은 기울기가 \(0\)인 가로선 \(y=3\)이다. 곧 \(f'(2)=0\)이다.`
    },
    {
      id: "2024-09-11", exam: "2024-09", no: 11, score: 4,
      units: ["m2-integ"], memo: "출발점이 다른 두 점 사이의 거리",
      body: R`두 점 \(\mathrm{P}\)와 \(\mathrm{Q}\)는 시각 \(t=0\)일 때 각각 점 \(\mathrm{A}(1)\)과 점 \(\mathrm{B}(8)\)에서
        출발하여 수직선 위를 움직인다. 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 시각
        \(t\,(t\ge 0)\)에서의 속도는 각각
        \[v_{1}(t)=3t^{2}+4t-7,\qquad v_{2}(t)=2t+4\]
        이다. 출발한 시각부터 두 점 \(\mathrm{P}\), \(\mathrm{Q}\) 사이의 거리가 처음으로
        \(4\)가 될 때까지 점 \(\mathrm{P}\)가 움직인 거리는?`,
      choices: [R`\(10\)`, R`\(14\)`, R`\(19\)`, R`\(25\)`, R`\(32\)`],
      answer: 5,
      help: R`출발점이 다르므로 위치는 \(x_{1}=1+\int_{0}^{t}v_{1}\), \(x_{2}=8+\int_{0}^{t}v_{2}\)다. 처음 거리가 \(7\)인데 \(\mathrm{P}\)는 \(v_{1}(0)=-7\)로 뒤로 밀리므로 사이가 더 벌어졌다가 좁아진다. 그래서 \(x_{1}-x_{2}=-4\)가 되는 때를 찾아야 하고, 움직인 거리는 \(v_{1}=0\)이 되는 \(t=1\)에서 끊어 더한다.`
    },
    {
      id: "2024-09-12", exam: "2024-09", no: 12, score: 4,
      units: ["m1-seq"], memo: "홀짝으로 갈리는 점화식 거꾸로 세기",
      body: R`첫째항이 자연수인 수열 \(\{a_{n}\}\)이 모든 자연수 \(n\)에 대하여
        \[a_{n+1}=\begin{cases}a_{n}+1 &amp; \left(a_{n}\text{이 홀수인 경우}\right)\\[2pt] \dfrac{1}{2}a_{n} &amp; \left(a_{n}\text{이 짝수인 경우}\right)\end{cases}\]
        를 만족시킬 때, \(a_{2}+a_{4}=40\)이 되도록 하는 모든 \(a_{1}\)의 값의
        합은?`,
      choices: [R`\(172\)`, R`\(175\)`, R`\(178\)`, R`\(181\)`, R`\(184\)`],
      answer: 1,
      help: R`홀수를 만나면 \(+1\)로 짝수가 되고, 짝수를 만나면 반으로 준다. 곧 값이 커지는 일이 거의 없어 \(a_{2}+a_{4}=40\)은 앞쪽 항이 꽤 크다는 뜻이다. \(a_{1}\)의 홀짝에 따라 \(a_{2}\)가 갈리므로 두 갈래로 나눠 거꾸로 세면 된다.`
    },
    {
      id: "2024-09-13", exam: "2024-09", no: 13, score: 4,
      units: ["m2-diff"], memo: "꺾인 함수가 감소하다 증가할 조건",
      body: R`두 실수 \(a\), \(b\)에 대하여 함수
        \[f(x)=\begin{cases}-\dfrac{1}{3}x^{3}-ax^{2}-bx &amp; (x<0)\\[6pt] \dfrac{1}{3}x^{3}+ax^{2}-bx &amp; (x\ge 0)\end{cases}\]
        이 구간 \((-\infty,\,-1]\)에서 감소하고 구간 \([-1,\,\infty)\)에서 증가할 때,
        \(a+b\)의 최댓값을 \(M\), 최솟값을 \(m\)이라 하자. \(M-m\)의 값은?`,
      choices: [R`\(\dfrac{3}{2}+3\sqrt{2}\)`, R`\(3+3\sqrt{2}\)`, R`\(\dfrac{9}{2}+3\sqrt{2}\)`, R`\(6+3\sqrt{2}\)`, R`\(\dfrac{15}{2}+3\sqrt{2}\)`],
      answer: 3,
      help: R`\(x\ge 0\)에서 \(f'(x)=x^{2}+2ax-b\), \(x<0\)에서 \(f'(x)=-x^{2}-2ax-b\)다. \(x=-1\)을 경계로 감소가 증가로 딱 한 번 바뀌어야 하므로, 왼쪽 조각은 \(x=-1\)에서만 부호가 바뀌고 오른쪽 조각은 \(x\ge 0\) 내내 \(0\) 이상이어야 한다.`
    },
    {
      id: "2024-09-14", exam: "2024-09", no: 14, score: 4,
      units: ["m1-explog"], memo: "치역 안의 정수를 세는 조건",
      body: R`두 자연수 \(a\), \(b\)에 대하여 함수
        \[f(x)=\begin{cases}2^{\,x+a}+b &amp; (x\le -8)\\ -3^{\,x-3}+8 &amp; (x>-8)\end{cases}\]
        이 다음 조건을 만족시킬 때, \(a+b\)의 값은?`,
      note: [
        R`집합 \(\bigl\{f(x)\mid x\le k\bigr\}\)의 원소 중 정수인 것의 개수가 \(2\)가 되도록 하는 모든 실수 \(k\)의 값의 범위는 \(3\le k<4\)이다.`
      ],
      choices: [R`\(11\)`, R`\(13\)`, R`\(15\)`, R`\(17\)`, R`\(19\)`],
      answer: 2,
      help: R`\(x>-8\)에서 \(-3^{\,x-3}+8\)은 감소하며 \(8\)보다 작은 값을 훑고, \(x\le -8\)에서 \(2^{\,x+a}+b\)는 \(b\)에 아주 가까운 값들만 갖는다. \(k\)를 오른쪽으로 밀면서 새 정수가 치역에 들어오는 자리를 세는 문제이고, 그 자리가 정확히 \(k=3\)과 \(k=4\)라는 것이 두 조각의 값을 못박는다.`
    },
    {
      id: "2024-09-15", exam: "2024-09", no: 15, score: 4,
      units: ["m2-limit"], memo: "이어지지 않아야 한다는 조건",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)에 대하여
        함수 \(g(x)\)를
        \[g(x)=\begin{cases}\dfrac{f(x+3)\bigl\{f(x)+1\bigr\}}{f(x)} &amp; \bigl(f(x)\ne 0\bigr)\\[8pt] 3 &amp; \bigl(f(x)=0\bigr)\end{cases}\]
        이라 하자. \(\displaystyle\lim_{x\to 3}g(x)=g(3)-1\)일 때, \(g(5)\)의 값은?`,
      choices: [R`\(14\)`, R`\(16\)`, R`\(18\)`, R`\(20\)`, R`\(22\)`],
      answer: 4,
      help: R`\(f(3)\ne 0\)이면 \(g\)가 \(x=3\)에서 이어져 \(\lim_{x\to3}g(x)=g(3)\)이 되어 조건과 어긋난다. 그러니 \(f(3)=0\)이고, 그때 정의에 따라 \(g(3)=3\)이므로 \(\lim_{x\to 3}g(x)=2\)여야 한다.`
    },
    {
      id: "2024-09-20", exam: "2024-09", no: 20, score: 4,
      units: ["m1-trig"], memo: "공통 변을 마주 보는 두 외접원",
      body: R`그림과 같이
        \[\overline{\mathrm{AB}}=2,\quad \overline{\mathrm{AD}}=1,\quad \angle\mathrm{DAB}=\frac{2}{3}\pi,\quad \angle\mathrm{BCD}=\frac{3}{4}\pi\]
        인 사각형 \(\mathrm{ABCD}\)가 있다. 삼각형 \(\mathrm{BCD}\)의 외접원의 반지름의
        길이를 \(R_{1}\), 삼각형 \(\mathrm{ABD}\)의 외접원의 반지름의 길이를 \(R_{2}\)라 하자.`,
      figure: "2024-09-20.webp",
      bodyAfter: R`다음은 \(R_{1}\times R_{2}\)의 값을 구하는 과정이다.
        <div class="proof-box">
        <p>삼각형 \(\mathrm{BCD}\)에서 사인법칙에 의하여</p>
        \[R_{1}=\frac{\sqrt{2}}{2}\times\overline{\mathrm{BD}}\]
        <p>이고, 삼각형 \(\mathrm{ABD}\)에서 사인법칙에 의하여</p>
        \[R_{2}=\fbox{(가)}\times\overline{\mathrm{BD}}\]
        <p>이다. 삼각형 \(\mathrm{ABD}\)에서 코사인법칙에 의하여</p>
        \[\overline{\mathrm{BD}}^{\,2}=2^{2}+1^{2}-\left(\fbox{(나)}\right)\]
        <p>이므로</p>
        \[R_{1}\times R_{2}=\fbox{(다)}\]
        <p>이다.</p>
        </div>
        위의 (가), (나), (다)에 알맞은 수를 각각 \(p\), \(q\), \(r\)이라 할 때,
        \(9\times(p\times q\times r)^{2}\)의 값을 구하시오.`,
      short: true,
      answer: 98,
      help: R`두 삼각형 \(\mathrm{BCD}\)와 \(\mathrm{ABD}\)는 변 \(\mathrm{BD}\)를 함께 쓰고, 그 변을 마주 보는 각이 각각 \(\frac{3}{4}\pi\)와 \(\frac{2}{3}\pi\)로 주어져 있다. 그래서 사인법칙에서 두 반지름이 모두 \(\overline{\mathrm{BD}}\)의 상수배로 나오고, \(\overline{\mathrm{BD}}\) 자체는 몰라도 곱을 구할 수 있다.`
    },
    {
      id: "2024-09-21", exam: "2024-09", no: 21, score: 4,
      units: ["m1-seq"], memo: "부분합의 합이 만드는 정수 조건",
      body: R`모든 항이 자연수인 등차수열 \(\{a_{n}\}\)의 첫째항부터
        제\(n\)항까지의 합을 \(S_{n}\)이라 하자. \(a_{7}\)이 \(13\)의 배수이고
        \(\displaystyle\sum_{k=1}^{7}S_{k}=644\)일 때, \(a_{2}\)의 값을 구하시오.`,
      short: true,
      answer: 19,
      help: R`\(S_{n}=\frac{n}{2}\bigl(2a_{1}+(n-1)d\bigr)\)이므로 \(\sum_{k=1}^{7}S_{k}\)는 \(a_{1}\)과 \(d\)의 일차식이 된다. 그 한 식에 모든 항이 자연수라는 것과 \(a_{7}\)이 \(13\)의 배수라는 것을 얹으면 정수해가 하나로 좁혀진다.`
    },
    {
      id: "2024-09-22", exam: "2024-09", no: 22, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "곱의 미분을 거꾸로 읽기",
      body: R`두 다항함수 \(f(x)\), \(g(x)\)에 대하여 \(f(x)\)의 한 부정적분을
        \(F(x)\)라 하고 \(g(x)\)의 한 부정적분을 \(G(x)\)라 할 때,
        이 함수들은 모든 실수 \(x\)에 대하여 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(\displaystyle\int_{1}^{x}f(t)\,dt=xf(x)-2x^{2}-1\)`,
        R`(나) \(f(x)G(x)+F(x)g(x)=8x^{3}+3x^{2}+1\)`
      ],
      bodyAfter: R`\(\displaystyle\int_{1}^{3}g(x)\,dx\)의 값을 구하시오.`,
      short: true,
      answer: 10,
      help: R`(나)의 왼쪽은 곱의 미분을 거꾸로 읽으면 \(\bigl(F(x)G(x)\bigr)'\)이다. 그러니 양변을 적분하면 \(F(x)G(x)\)가 곧바로 나온다. 한편 (가)는 양변을 미분하면 \(xf'(x)=4x\), 곧 \(f'(x)=4\)가 되어 \(f\)가 정해진다.`
    },
    {
      id: "2024-06-9", exam: "2024-06", no: 9, score: 4,
      units: ["m1-seq"], memo: "부분합의 차로 항 구하기",
      body: R`수열 \(\{a_{n}\}\)이 모든 자연수 \(n\)에 대하여
        \[\sum_{k=1}^{n}\frac{1}{(2k-1)a_{k}}=n^{2}+2n\]
        을 만족시킬 때, \(\displaystyle\sum_{n=1}^{10}a_{n}\)의 값은?`,
      choices: [R`\(\dfrac{10}{21}\)`, R`\(\dfrac{4}{7}\)`, R`\(\dfrac{2}{3}\)`, R`\(\dfrac{16}{21}\)`, R`\(\dfrac{6}{7}\)`],
      answer: 1,
      help: R`부분합의 차를 구하면 \(\frac{1}{(2n-1)a_{n}}=2n+1\), 곧 \(a_{n}=\frac{1}{(2n-1)(2n+1)}\)이다. 이것은 \(\frac{1}{2}\left(\frac{1}{2n-1}-\frac{1}{2n+1}\right)\)로 갈라져 합이 접힌다.`
    },
    {
      id: "2024-06-10", exam: "2024-06", no: 10, score: 4,
      units: ["m2-integ"], memo: "x축 위와 아래의 두 넓이의 차",
      body: R`양수 \(k\)에 대하여 함수 \(f(x)\)는
        \[f(x)=kx(x-2)(x-3)\]
        이다. 곡선 \(y=f(x)\)와 \(x\)축이 원점 \(\mathrm{O}\)와 두 점 \(\mathrm{P}\), \(\mathrm{Q}\,\bigl(\overline{\mathrm{OP}}<\overline{\mathrm{OQ}}\bigr)\)
        에서 만난다. 곡선 \(y=f(x)\)와 선분 \(\mathrm{OP}\)로 둘러싸인 영역을 \(A\),
        곡선 \(y=f(x)\)와 선분 \(\mathrm{PQ}\)로 둘러싸인 영역을 \(B\)라 하자.
        \[(A\text{의 넓이})-(B\text{의 넓이})=3\]
        일 때, \(k\)의 값은?`,
      figure: "2024-06-10.webp",
      choices: [R`\(\dfrac{7}{6}\)`, R`\(\dfrac{4}{3}\)`, R`\(\dfrac{3}{2}\)`, R`\(\dfrac{5}{3}\)`, R`\(\dfrac{11}{6}\)`],
      answer: 2,
      help: R`\(A\)에서는 곡선이 \(x\)축 위에, \(B\)에서는 아래에 있다. 그래서 두 넓이의 차는 부호를 붙여 묶으면 \(\displaystyle\int_{0}^{3}f(x)\,dx=3\) 한 줄이 된다.`
    },
    {
      id: "2024-06-11", exam: "2024-06", no: 11, score: 4,
      units: ["m2-diff"], memo: "직선과 가장 가까운 곡선 위의 점",
      body: R`그림과 같이 실수 \(t\,(0<t<1)\)에 대하여 곡선 \(y=x^{2}\) 위의
        점 중에서 직선 \(y=2tx-1\)과의 거리가 최소인 점을 \(\mathrm{P}\)라 하고,
        직선 \(\mathrm{OP}\)가 직선 \(y=2tx-1\)과 만나는 점을 \(\mathrm{Q}\)라 할 때,
        \(\displaystyle\lim_{t\to 1-}\frac{\overline{\mathrm{PQ}}}{1-t}\)의 값은? (단, \(\mathrm{O}\)는 원점이다.)`,
      figure: "2024-06-11.webp",
      choices: [R`\(\sqrt{6}\)`, R`\(\sqrt{7}\)`, R`\(2\sqrt{2}\)`, R`\(3\)`, R`\(\sqrt{10}\)`],
      answer: 3,
      help: R`직선과의 거리가 가장 작은 점은 접선의 기울기가 그 직선과 같은 점이므로 \(\mathrm{P}=(t,\,t^{2})\)다. 그러면 직선 \(\mathrm{OP}\)가 \(y=tx\)이고, \(y=2tx-1\)과의 교점이 \(\mathrm{Q}\left(\frac{1}{t},\,1\right)\)로 곧바로 나온다.`
    },
    {
      id: "2024-06-12", exam: "2024-06", no: 12, score: 4,
      units: ["m1-seq"], memo: "공차가 두 배인 두 등차수열의 겹침",
      body: R`\(a_{2}=-4\)이고 공차가 \(0\)이 아닌 등차수열 \(\{a_{n}\}\)에 대하여
        수열 \(\{b_{n}\}\)을 \(b_{n}=a_{n}+a_{n+1}\,(n\ge 1)\)이라 하고, 두 집합 \(A\), \(B\)를
        \[A=\bigl\{a_{1},\,a_{2},\,a_{3},\,a_{4},\,a_{5}\bigr\},\qquad B=\bigl\{b_{1},\,b_{2},\,b_{3},\,b_{4},\,b_{5}\bigr\}\]
        라 하자. \(n(A\cap B)=3\)이 되도록 하는 모든 수열 \(\{a_{n}\}\)에
        대하여 \(a_{20}\)의 값의 합은?`,
      choices: [R`\(30\)`, R`\(34\)`, R`\(38\)`, R`\(42\)`, R`\(46\)`],
      answer: 5,
      help: R`\(b_{n}=a_{n}+a_{n+1}=2a_{n}+d\)이므로 \(\{b_{n}\}\)은 공차가 \(2d\)인 등차수열이다. 두 수열의 공차가 \(d\)와 \(2d\)로 다르니, 다섯 개씩 중에서 셋이 겹치려면 겹치는 자리가 몇 가지 꼴로만 가능하다.`
    },
    {
      id: "2024-06-13", exam: "2024-06", no: 13, score: 4,
      units: ["m1-trig"], memo: "지름이 만드는 직각과 현의 길이",
      body: R`그림과 같이
        \[\overline{\mathrm{BC}}=3,\quad \overline{\mathrm{CD}}=2,\quad \cos(\angle\mathrm{BCD})=-\frac{1}{3},\quad \angle\mathrm{DAB}>\frac{\pi}{2}\]
        인 사각형 \(\mathrm{ABCD}\)에서 두 삼각형 \(\mathrm{ABC}\)와 \(\mathrm{ACD}\)는 모두
        예각삼각형이다. 선분 \(\mathrm{AC}\)를 \(1:2\)로 내분하는 점 \(\mathrm{E}\)에 대하여
        선분 \(\mathrm{AE}\)를 지름으로 하는 원이 두 선분 \(\mathrm{AB}\), \(\mathrm{AD}\)와 만나는
        점 중 \(\mathrm{A}\)가 아닌 점을 각각 \(\mathrm{P}_{1}\), \(\mathrm{P}_{2}\)라 하고,
        선분 \(\mathrm{CE}\)를 지름으로 하는 원이 두 선분 \(\mathrm{BC}\), \(\mathrm{CD}\)와 만나는
        점 중 \(\mathrm{C}\)가 아닌 점을 각각 \(\mathrm{Q}_{1}\), \(\mathrm{Q}_{2}\)라 하자.
        \(\overline{\mathrm{P}_{1}\mathrm{P}_{2}}:\overline{\mathrm{Q}_{1}\mathrm{Q}_{2}}=3:5\sqrt{2}\)이고 삼각형 \(\mathrm{ABD}\)의 넓이가 \(2\)일 때,
        \(\overline{\mathrm{AB}}+\overline{\mathrm{AD}}\)의 값은? (단, \(\overline{\mathrm{AB}}>\overline{\mathrm{AD}}\))`,
      figure: "2024-06-13.webp",
      choices: [R`\(\sqrt{21}\)`, R`\(\sqrt{22}\)`, R`\(\sqrt{23}\)`, R`\(2\sqrt{6}\)`, R`\(5\)`],
      answer: 1,
      help: R`\(\overline{\mathrm{P}_{1}\mathrm{P}_{2}}\)는 지름이 \(\overline{\mathrm{AE}}\)인 원의 현이고, 그 현을 마주 보는 원주각이 \(\angle\mathrm{DAB}\)다. 그래서 사인법칙으로 \(\overline{\mathrm{P}_{1}\mathrm{P}_{2}}=\overline{\mathrm{AE}}\sin(\angle\mathrm{DAB})\)가 된다. \(\overline{\mathrm{Q}_{1}\mathrm{Q}_{2}}\)도 마찬가지로 \(\overline{\mathrm{CE}}\sin(\angle\mathrm{BCD})\)다.`
    },
    {
      id: "2024-06-14", exam: "2024-06", no: 14, score: 4,
      units: ["m2-integ"], memo: "속도의 근이 겹쳐야 하는 조건",
      body: R`실수 \(a\,(a\ge 0)\)에 대하여 수직선 위를 움직이는 점 \(\mathrm{P}\)의
        시각 \(t\,(t\ge 0)\)에서의 속도 \(v(t)\)를
        \[v(t)=-t(t-1)(t-a)(t-2a)\]
        라 하자. 점 \(\mathrm{P}\)가 시각 \(t=0\)일 때 출발한 후 운동 방향을
        한 번만 바꾸도록 하는 \(a\)에 대하여, 시각 \(t=0\)에서 \(t=2\)까지
        점 \(\mathrm{P}\)의 위치의 변화량의 최댓값은?`,
      choices: [R`\(\dfrac{1}{5}\)`, R`\(\dfrac{7}{30}\)`, R`\(\dfrac{4}{15}\)`, R`\(\dfrac{3}{10}\)`, R`\(\dfrac{1}{3}\)`],
      answer: 3,
      help: R`운동 방향은 \(v\)의 부호가 바뀔 때만 바뀐다. \(v\)의 근은 \(0,\,1,\,a,\,2a\)인데 \(t>0\)에서 부호가 딱 한 번만 바뀌려면 근들이 서로 겹쳐 중복근이 되어야 한다. 위치의 변화량은 절댓값 없이 \(\int_{0}^{2}v(t)\,dt\)다.`
    },
    {
      id: "2024-06-15", exam: "2024-06", no: 15, score: 4,
      units: ["m1-seq"], memo: "부호에 따라 반대로 밀리는 수열",
      body: R`자연수 \(k\)에 대하여 다음 조건을 만족시키는 수열 \(\{a_{n}\}\)이
        있다.`,
      note: [
        R`\(a_{1}=k\)이고, 모든 자연수 \(n\)에 대하여 \(a_{n+1}=\begin{cases}a_{n}+2n-k &amp; \left(a_{n}\le 0\right)\\ a_{n}-2n-k &amp; \left(a_{n}>0\right)\end{cases}\)이다.`
      ],
      bodyAfter: R`\(a_{3}\times a_{4}\times a_{5}\times a_{6}<0\)이 되도록 하는 모든 \(k\)의 값의 합은?`,
      choices: [R`\(10\)`, R`\(14\)`, R`\(18\)`, R`\(22\)`, R`\(26\)`],
      answer: 2,
      help: R`\(a_{n}\)이 \(0\) 이하면 \(+2n-k\), 양수면 \(-2n-k\)를 더한다. 곧 부호에 따라 방향이 갈린다. 네 항의 곱이 음수라는 것은 그 넷 가운데 음수가 홀수 개라는 뜻이므로, \(k\)를 작은 값부터 넣어 부호가 어떻게 갈리는지 직접 따라가는 편이 빠르다.`
    },
    {
      id: "2024-06-20", exam: "2024-06", no: 20, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "적분으로 만든 삼차함수의 최소",
      body: R`최고차항의 계수가 \(1\)인 이차함수 \(f(x)\)에 대하여 함수
        \[g(x)=\int_{0}^{x}f(t)\,dt\]
        가 다음 조건을 만족시킬 때, \(f(9)\)의 값을 구하시오.`,
      note: [
        R`\(x\ge 1\)인 모든 실수 \(x\)에 대하여 \(g(x)\ge g(4)\)이고 \(\bigl|g(x)\bigr|\ge\bigl|g(3)\bigr|\)이다.`
      ],
      short: true,
      answer: 39,
      help: R`\(g'=f\)이고 \(f\)가 최고차항 계수 \(1\)인 이차함수라 \(g\)는 삼차함수다. \(x\ge 1\)에서 \(g\)의 최솟값이 \(g(4)\)라는 것은 \(x=4\)가 극소, 곧 \(f(4)=0\)이라는 뜻이다. 그리고 \(g\)가 그 구간에서 값 \(0\)을 지나면 그 자리에서 \(|g|=0\)이 되므로, \(\bigl|g(x)\bigr|\ge\bigl|g(3)\bigr|\)이려면 \(g(3)=0\)이어야 한다.`
    },
    {
      id: "2024-06-21", exam: "2024-06", no: 21, score: 4,
      units: ["m1-explog"], memo: "감소 곡선과 증가 곡선의 교점",
      body: R`실수 \(t\)에 대하여 두 곡선 \(y=t-\log_{2}x\)와 \(y=2^{\,x-t}\)이 만나는
        점의 \(x\)좌표를 \(f(t)\)라 하자.
        &lt;보기&gt;의 각 명제에 대하여 다음 규칙에 따라 \(A\), \(B\), \(C\)의
        값을 정할 때, \(A+B+C\)의 값을 구하시오. (단, \(A+B+C\ne 0\))`,
      note: [
        R`명제 ㄱ이 참이면 \(A=100\), 거짓이면 \(A=0\)이다.`,
        R`명제 ㄴ이 참이면 \(B=10\), 거짓이면 \(B=0\)이다.`,
        R`명제 ㄷ이 참이면 \(C=1\), 거짓이면 \(C=0\)이다.`
      ],
      bullets: true,
      bodyAfter: R`<div class="note-box has-title"><span class="note-title">보 기</span><ul>
        <li>ㄱ. \(f(1)=1\)이고 \(f(2)=2\)이다.</li>
        <li>ㄴ. 실수 \(t\)의 값이 증가하면 \(f(t)\)의 값도 증가한다.</li>
        <li>ㄷ. 모든 양의 실수 \(t\)에 대하여 \(f(t)\ge t\)이다.</li>
        </ul></div>`,
      short: true,
      answer: 110,
      help: R`\(y=t-\log_{2}x\)는 감소하고 \(y=2^{\,x-t}\)는 증가하므로 교점은 언제나 하나뿐이다. ㄱ은 \(t=1\), \(t=2\)를 직접 넣어 보면 바로 확인된다. ㄴ과 ㄷ은 \(t\)가 커질 때 두 곡선이 각각 위로, 오른쪽으로 밀리는 것을 견주면 된다.`
    },
    {
      id: "2024-06-22", exam: "2024-06", no: 22, score: 4,
      units: ["m2-diff"], memo: "구간이 극값을 품는지 세기",
      body: R`정수 \(a\,(a\ne 0)\)에 대하여 함수 \(f(x)\)를
        \[f(x)=x^{3}-2ax^{2}\]
        이라 하자. 다음 조건을 만족시키는 모든 정수 \(k\)의 값의 곱이
        \(-12\)가 되도록 하는 \(a\)에 대하여 \(f'(10)\)의 값을 구하시오.`,
      note: [
        R`함수 \(f(x)\)에 대하여 \(\left\{\dfrac{f(x_{1})-f(x_{2})}{x_{1}-x_{2}}\right\}\times\left\{\dfrac{f(x_{2})-f(x_{3})}{x_{2}-x_{3}}\right\}<0\)을 만족시키는 세 실수 \(x_{1}\), \(x_{2}\), \(x_{3}\)이 열린구간 \(\left(k,\,k+\dfrac{3}{2}\right)\)에 존재한다.`
      ],
      short: true,
      answer: 380,
      help: R`두 평균변화율의 곱이 음수라는 것은 그 구간 안에서 \(f\)가 늘다가 줄거나 줄다가 는다는 뜻, 곧 구간이 극값을 품는다는 뜻이다. \(f'(x)=3x^{2}-4ax=x(3x-4a)\)이므로 극값은 \(x=0\)과 \(x=\frac{4a}{3}\)에 있고, 길이 \(\frac{3}{2}\)인 구간이 그 둘 중 하나를 품는 정수 \(k\)를 세는 문제가 된다.`
    }
  ];

  window.CSAT_MATH = { units, exams, problems };
})();
