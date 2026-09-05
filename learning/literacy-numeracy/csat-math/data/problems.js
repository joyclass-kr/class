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
      help: R`접한다는 말은 극댓값이나 극솟값이 \(5\)라는 뜻이다. \(f'(x)=3(x+3a)(x-a)\)로 인수분해부터 한다. 극댓값과 극솟값을 둘 다 후보로 놓아야 한다. 하나는 \(a>0\) 조건에 걸려 스스로 떨어진다.`
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
      help: R`점근선 \(y=-2\)를 먼저 그린다. 세 점을 \(x=t\) 위에 세로로 놓으면 \(\overline{\mathrm{AB}}=\overline{\mathrm{BC}}\)에서 \(a^{t}=4\)가 한 줄에 나온다. 삼각형 \(\mathrm{AOC}\)의 밑변은 세로 선분 \(\overline{\mathrm{AC}}\)이고 높이가 \(t\)다. 밑변과 높이를 바꿔 잡기 쉽다.`
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
      help: R`위치는 속도를 적분한 것, 움직인 거리는 속도의 절댓값을 적분한 것이다. 둘을 갈라 놓고 시작한다. ㄴ은 계산할 것이 없다. \(t^{2}-3t+4\)의 판별식이 음수라 속도의 부호가 안 바뀌고, 그러면 방향도 안 바뀐다.`
    },
    {
      id: "2026-suneung-12", exam: "2026-suneung", no: 12, score: 4,
      units: ["m1-seq"], memo: "등비수열의 항 사이 관계",
      body: R`등비수열 \(\{a_{n}\}\)이
        \[2\left(a_{1}+a_{4}+a_{7}\right)=a_{4}+a_{7}+a_{10}=6\]
        을 만족시킬 때, \(a_{10}\)의 값은?`,
      choices: [R`\(\dfrac{22}{7}\)`, R`\(\dfrac{24}{7}\)`, R`\(\dfrac{26}{7}\)`, R`\(\dfrac{30}{7}\)`, R`\(\dfrac{32}{7}\)`],
      answer: 2,
      help: R`\(a_{4}+a_{7}+a_{10}\)은 \(a_{1}+a_{4}+a_{7}\)에 \(r^{3}\)을 곱한 것이다. 이걸 알아채면 \(r^{3}=2\)가 바로 나온다. 항을 하나하나 \(a_{1}r^{k}\)로 풀어 쓰면 식이 길어진다. 세 항을 한 덩어리로 묶는 것이 요령이다.`
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
      help: R`\(g'\)은 곱의 미분으로 \(x=1\)에서의 값만 내면 된다. \(g\)를 다 전개할 필요가 없다. 둘러싸인 도형은 삼각형이다. 두 접선의 \(y\)절편 사이 길이가 밑변, 교점의 \(x\)좌표가 높이다.`
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
      help: R`\(\overline{\mathrm{AB}}=3\)을 \(2:1\)로 나누므로 원의 반지름은 \(2\)다. 여기서 \(\overline{\mathrm{AE}}=2\)가 따라 나온다. \(\angle\mathrm{HCG}=\angle\mathrm{BAC}\)는 길이 조건이 아니라 원주각 조건이다. 사인법칙으로 넘기라는 신호다.`
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
      help: R`\(h'(x)=g(x)-f(x)\)다. 극값이 하나라는 말은 이 차가 부호를 딱 한 번만 바꾼다는 뜻이다. \(f\)와 \(g\)가 둘 다 구간별로 나뉘어 있다. 구간을 겹쳐 놓고 부호가 바뀌는 자리부터 찾아야 한다.`
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
      help: R`\(a_{n+1}=\sum^{n+1}-\sum^{n}\)을 그대로 빼면 (가)가 나온다. \(n^{2}\) 항끼리 빼는 것이 계산의 전부다. (다)를 구할 때 ㉠에 \(n=2k+1\)을 넣으면 \(2a_{2k+1}+a_{2k+2}=2k+1\)이 된다. 이 묶음을 알아채지 못하면 열두 항을 다 구하려 들게 된다.`
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
      help: R`\(x=t\)에서 이어지려면 \(-f(t)=f(t)\), 곧 \(f(t)=0\)이다. 여기가 모든 것의 출발점이다. (나)의 집합에 든 것이 자연수라는 점 자체가 조건이다. \(g(-1)\)과 \(-\frac{7}{2}g(1)\)이 둘 다 자연수여야 하고, 서로 달라야 한다.`
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
      help: R`\(\mathrm{A}(a,b)\)를 \(y=x\)에 대칭하면 \((b,a)\)다. 이 점이 원점과 \(\mathrm{B}\)를 잇는 직선 위에 있다는 조건부터 식으로 쓴다. 중점 조건은 \(x\)에서 하나, \(y\)에서 하나로 모두 두 개의 식이다. 하나만 쓰고 넘어가기 쉽다.`
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
      help: R`속도는 위치를 한 번, 가속도는 두 번 미분한 것이다. 두 속도를 같게 놓고 \(t\)부터 구한다. \(2t^{2}-t-3=0\)의 두 근 가운데 하나는 음수다. \(t\ge 0\)이라는 조건이 그것을 걸러 준다.`
    },
    {
      id: "2027-09-10", exam: "2027-09", no: 10, score: 4,
      units: ["m1-explog"], memo: "지수함수 두 개와 가로 선분의 길이",
      body: R`상수 \(a\,(a>1)\)에 대하여 직선 \(y=7\)이 두 곡선
        \(y=16a^{x}\), \(y=\dfrac{1}{4}a^{x}\)과 만나는 점을 각각 \(\mathrm{A}\), \(\mathrm{B}\)라 하자.
        \(\overline{\mathrm{AB}}=4\)일 때, \(a\)의 값은?`,
      choices: [R`\(\sqrt{2}\)`, R`\(2\)`, R`\(2\sqrt{2}\)`, R`\(4\)`, R`\(4\sqrt{2}\)`],
      answer: 3,
      help: R`두 점의 \(y\)좌표가 \(7\)로 같으니 \(\overline{\mathrm{AB}}\)는 \(x\)좌표의 차다. 두 \(x\)를 로그로 각각 써 놓는다. 두 로그를 따로 계산하면 길어진다. 빼는 순간 한 덩어리로 묶여 \(\log_{a}64=4\)가 된다.`
    },
    {
      id: "2027-09-11", exam: "2027-09", no: 11, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "적분식으로 주어진 다항함수",
      body: R`다항함수 \(f(x)\)가 모든 실수 \(x\)에 대하여
        \[\int_{-1}^{x} f(t)\,dt = xf(x)-2x^{3}-3x^{2}+6\]
        을 만족시킬 때, \(f(0)\)의 값은?`,
      choices: [R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`, R`\(10\)`],
      answer: 3,
      help: R`양변을 \(x\)로 미분한다. 왼쪽은 \(f(x)\)가 되고 오른쪽에서 \(f(x)\)가 지워져 \(f'(x)\)만 남는다. 미분만으로는 적분상수가 안 잡힌다. 아래끝인 \(x=-1\)을 원래 식에 넣는 한 수가 따로 필요하다.`
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
      help: R`코사인법칙으로 \(\overline{\mathrm{BC}}\)를 먼저 구한다. 그러면 사인법칙으로 외접원의 반지름이 잡힌다. \(\angle\mathrm{BCD}\)는 호 \(\mathrm{BD}\)에 대한 원주각이다. 삼각형 \(\mathrm{BCD}\)를 붙들지 말고 외접원 반지름으로 바로 넘어간다.`
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
      help: R`\(f(0)=0\)이므로 \(f(x)=6x^{2}+bx\)로 놓고 \(\int_{0}^{2}f=4\)에서 \(b\)를 잡는다. \(f(x)=6x(x-1)\)이 나오면 절반은 끝난다. ㄴ과 ㄷ의 열쇠는 같다. \(\int_{0}^{2}\)의 값이 \(0\)이 되는 일차함수는 \(x-1\)에 상수를 곱한 것뿐이다.`
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
      help: R`\(k\)가 세제곱수냐 아니냐로 항이 갈린다. 두 경우를 나눠 쓰면 합이 두 덩어리가 된다. 세제곱수가 아닌 항들의 합은 언제나 정수다. 그러니 분수가 될 수 있는 쪽, 곧 세제곱수 항의 합만 따지면 된다.`
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
      help: R`분모 \(f(x)+f(x-t)\)는 \(x\)에 대한 이차식이다. 그 판별식을 \(t\)로 나타내면 조건이 \(t\)의 부등식이 된다. 경계인 \(t=\frac{3}{2}\)가 집합에 들어 있다. 그러니 그때는 분모가 중근을 갖고도 극한이 있어야 하고, 그 중근이 분자의 \(2x+1\)이 \(0\)이 되는 자리와 겹쳐야 한다.`
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
      help: R`두 곡선의 교점은 \(\sin x=-k\cos x\), 곧 \(\tan x=-k\)에서 나온다. 제1사분면 교점이 \(a\)면 제4사분면 교점은 \(a+\pi\)다. \(\mathrm{D}\)는 \(g\)의 대칭성으로 \(\pi-a\)에 놓인다. 네 점의 \(x\)좌표를 \(a\) 하나로 쓰고 나면 넓이의 비가 \(a\)만의 식이 된다.`
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
      help: R`\(g\)는 \(f\)의 부호가 바뀌는 자리에서 꺾인다. 그 꺾임을 절댓값 쪽 꺾임이 정확히 지워야 \(h\)가 미분가능해진다. (가)에서 실근이 두 개라는 건 삼차함수가 중근을 하나 갖는다는 뜻이다. 중근에서는 \(f\)의 부호가 바뀌지 않아 꺾이지도 않는다.`
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
      help: R`(나)의 로그 곡선은 \(y=a^{x}\)를 직선 \(y=x-\dfrac{1}{4}\)에 대하여 대칭이동한 것이다. 먼저 이것부터 확인한다. 두 포물선은 \((1,-1)\)만큼 떨어진 평행이동 관계다. 대칭 하나와 평행이동 하나, 이 두 관계가 네 점을 직사각형으로 묶는다.`
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
      help: R`둘 다 원점에서 출발했으니 위치는 속도를 \(0\)부터 적분한 값이다. 위치가 같아진다는 것은 두 적분값이 같다는 것, 곧 \(\int_{0}^{k}\bigl(v_{1}-v_{2}\bigr)dt=0\)이라는 뜻이다. 속도가 같아지는 때와 헷갈리기 쉽다. 속도가 같아지는 것은 \(v_{1}=v_{2}\)이고, 위치가 같아지는 것은 그 차를 적분한 값이 \(0\)이 되는 것이다.`
    },
    {
      id: "2027-06-10", exam: "2027-06", no: 10, score: 4,
      units: ["m1-explog"], memo: "밑이 다른 로그식 두 개",
      body: R`두 양수 \(a\), \(b\)가
        \[\log_{9}a+\log_{3}b=2,\qquad \log_{3}a=8\log_{9}b\]
        를 만족시킬 때, \(\dfrac{a}{b}\)의 값은?`,
      choices: [R`\(1\)`, R`\(3\)`, R`\(9\)`, R`\(27\)`, R`\(81\)`],
      answer: 3,
      help: R`밑이 \(9\)와 \(3\)으로 섞여 있으니 \(\log_{9}x=\frac{1}{2}\log_{3}x\)로 밑부터 하나로 맞춘다. \(\log_{3}a=X\), \(\log_{3}b=Y\)로 놓으면 두 식이 \(X\)와 \(Y\)의 일차식 두 개가 되어 연립방정식이 된다. 마지막에 구할 것은 \(a\)와 \(b\)가 아니라 \(\frac{a}{b}\)다. \(\log_{3}\frac{a}{b}=X-Y\)이니 \(X\), \(Y\)를 따로 구해도 되지만 차만 구하면 더 빠르다.`
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
      help: R`분모는 \(x\bigl(f(x)-3\bigr)\)이라 \(x=0\)에서 반드시 \(0\)이 된다. 그런데도 \(a=0\)에서 극한이 있으려면 분자 \(f(x+2)\)도 \(x=0\)에서 \(0\)이어야 하니 \(f(2)=0\)이다. 한편 \(a=3\)에서 극한이 없다는 것은 그 자리에서 분모만 \(0\)이 된다는 뜻이고, \(x=3\)은 \(0\)이 아니므로 \(f(3)=3\)이다. 두 값으로 일차함수가 정해진다.`
    },
    {
      id: "2027-06-12", exam: "2027-06", no: 12, score: 4,
      units: ["m1-seq"], memo: "등비수열의 조건식 두 개",
      body: R`공비가 양수인 등비수열 \(\{a_{n}\}\)이
        \[2a_{1}\left(a_{1}+a_{3}\right)=5a_{2}\left(a_{1}+a_{2}\right)=20\]
        을 만족시킬 때, \(a_{1}\times a_{6}\)의 값은?`,
      choices: [R`\(\dfrac{1}{27}\)`, R`\(\dfrac{1}{9}\)`, R`\(\dfrac{1}{3}\)`, R`\(1\)`, R`\(3\)`],
      answer: 1,
      help: R`\(a_{1}=a\), 공비를 \(r\)로 놓고 두 식을 쓰면 둘 다 \(a^{2}\)에 \(r\)의 식을 곱한 꼴이 된다. 두 식이 같은 값 \(20\)이므로 나누면 \(a^{2}\)이 지워지고 \(r\)만 남는다. \(a\)와 \(r\)을 따로 구하려 들면 이차식이 나와 길어진다. 구할 것이 \(a_{1}\times a_{6}=a^{2}r^{5}\)이므로 \(a^{2}\)과 \(r\)만 있으면 된다.`
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
      help: R`\(f>g\)이므로 \(S(t)=\int_{0}^{t}\bigl(f(x)-g(x)\bigr)dx\)이고, 양변을 미분하면 \(S'(t)=f(t)-g(t)\)다. 곧 \(t^{2}-2t+a\)가 두 함수의 차 그 자체다. 여기에 \(f(1)-g(1)=1\)을 넣으면 \(a\)가 나온다. ㄷ에서는 넓이의 구간이 \(0\)부터가 아니라 \(-2\)부터다. \(S\)의 정의는 \(0\)에서 시작하므로 \(\int_{-2}^{2}\)를 \(S\)로 바로 쓸 수 없고, 차 함수를 적분해서 값을 직접 견주어야 한다.`
    },
    {
      id: "2027-06-14", exam: "2027-06", no: 14, score: 4,
      units: ["m1-trig"], memo: "곱이 0인 삼각방정식의 실근 개수",
      body: R`양수 \(a\)와 자연수 \(b\)에 대하여 \(0\le x\le 2\)일 때 \(x\)에 대한 방정식
        \[\left(\cos(b\pi x)-\frac{1}{2}\right)\left(a\cos(b\pi x)+\frac{a+2}{2}\right)=0\]
        의 서로 다른 실근의 개수는 \(15\)이다. \(a+b\)의 값은?`,
      choices: [R`\(6\)`, R`\(\dfrac{13}{2}\)`, R`\(7\)`, R`\(\dfrac{15}{2}\)`, R`\(8\)`],
      answer: 3,
      help: R`곱이 \(0\)이니 \(\cos(b\pi x)=\frac{1}{2}\)인 경우와 \(\cos(b\pi x)=-\frac{a+2}{2a}\)인 경우로 갈린다. \(0\le x\le 2\)에서 \(b\pi x\)는 \(0\)부터 \(2b\pi\)까지 도니 코사인이 \(b\)바퀴를 돈다. 한 바퀴마다 각 방정식의 근이 몇 개인지 세면 된다. 두 번째 값이 \(-1\)이거나 \(1\)이면 한 바퀴에 근이 두 개가 아니라 한 개다. \(15\)라는 홀수가 나오려면 그 경계가 걸려야 한다.`
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
      help: R`두 적분이 달라지는 것은 그 구간 안에서 함수의 부호가 바뀔 때뿐이다. 부호가 안 바뀌면 절댓값을 밖으로 빼도 같다. 그러니 (가)는 "길이 \(3\)인 구간 \([p,\,p+3]\) 안에 \(f\)의 부호가 바뀌는 자리가 있다"가 \(0&lt;p&lt;3\)일 때만 참이라는 뜻이다. 이 말에서 \(f\)가 \(x\)축을 지나는 자리의 위치가 잡힌다. (나)도 같은 읽기다. \(f+q\)의 부호가 바뀌느냐를 묻는 것이므로 \(f\)의 그래프를 \(q\)만큼 올렸을 때를 보면 된다.`
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
      help: R`\(\mathrm{P}\)가 두 그래프 위에 있다는 것을 \(\beta=b^{\alpha}\)와 \(\beta=-\log_{b}\alpha\) 두 식으로 쓰고, 앞의 식을 로그로 뒤집어 \(\alpha=\log_{b}\beta\)로 바꾸는 것이 시작이다. 그러면 \(\alpha\beta^{3}=1\)의 양변에 밑이 \(b\)인 로그를 취했을 때 \(\alpha\)와 \(\beta\)의 일차식이 되어 둘 사이 관계가 나온다. 과정 상자가 갈 길을 다 적어 두었으니, 빈칸은 그 줄에서 곧바로 나오는 값이다. 줄을 건너뛰지 말고 위에서부터 차례로 채우면 된다.`
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
      help: R`오른쪽 \(f'(t)-4t^{2}+4\)는 \(t\)만의 식이니 그냥 어떤 높이 \(k\)라고 보면 된다. 그러면 \(g(t)\)는 "가로선 \(y=k\)가 삼차함수 \(y=f(x)\)와 만나는 가장 오른쪽 \(x\)"다. 높이 \(k\)를 위아래로 움직일 때 이 오른쪽 끝이 갑자기 뛰는 순간이 있다. 삼차함수의 극댓값을 지나는 순간이다. 그러니 \(t=3\)에서만 불연속이라는 말은 \(k\)가 그 극댓값과 같아지는 \(t\)가 \(3\) 하나뿐이라는 뜻이다.`
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
      help: R`규칙이 \(n\)을 반으로 줄이거나 넷으로 줄이는 쪽으로만 되어 있다. 그러니 큰 \(k\)에서 시작해 거꾸로 내려오는 것보다, 작은 항부터 차례로 값을 채워 가며 규칙을 눈으로 보는 편이 빠르다. \(k\)를 \(2\)로 나눈 나머지, \(4\)로 나눈 나머지에 따라 어느 규칙을 쓸지가 갈린다. 짝수면 \(a_{n}+1\), \(4\)로 나눈 나머지가 \(1\)이나 \(3\)이면 \(a_{n}+4\)로 내려간다. 값이 \(1\)에서 \(10\)까지 오르는 데 \(+1\)과 \(+4\)를 몇 번씩 썼는지 세는 문제가 된다.`
    }
  ];

  window.CSAT_MATH = { units, exams, problems };
})();
