// 평가원 기출 자료. 공통 과목(수학Ⅰ·수학Ⅱ) 및 선택 과목(확률과 통계·미적분·기하) 문항을 단원별로 담는다.
// 문제 본문은 평가원 문제지에서 옮긴 것이고, 저작권은 한국교육과정평가원에 있습니다.
(function () {
  "use strict";

  const R = String.raw;

  const units = [
      {
          "id": "m1-explog",
          "subject": "수학Ⅰ",
          "name": "지수함수와 로그함수"
      },
      {
          "id": "m1-trig",
          "subject": "수학Ⅰ",
          "name": "삼각함수"
      },
      {
          "id": "m1-seq",
          "subject": "수학Ⅰ",
          "name": "수열"
      },
      {
          "id": "m2-limit",
          "subject": "수학Ⅱ",
          "name": "함수의 극한과 연속"
      },
      {
          "id": "m2-diff",
          "subject": "수학Ⅱ",
          "name": "미분"
      },
      {
          "id": "m2-integ",
          "subject": "수학Ⅱ",
          "name": "적분"
      },
      {
          "id": "prob-count",
          "subject": "확률과 통계",
          "name": "경우의 수"
      },
      {
          "id": "prob-prob",
          "subject": "확률과 통계",
          "name": "확률"
      },
      {
          "id": "prob-stat",
          "subject": "확률과 통계",
          "name": "통계"
      },
      {
          "id": "calc-seq",
          "subject": "미적분",
          "name": "수열의 극한"
      },
      {
          "id": "calc-diff",
          "subject": "미적분",
          "name": "미분법"
      },
      {
          "id": "calc-integ",
          "subject": "미적분",
          "name": "적분법"
      },
      {
          "id": "geom-curve",
          "subject": "기하",
          "name": "이차곡선"
      },
      {
          "id": "geom-vector",
          "subject": "기하",
          "name": "평면벡터"
      },
      {
          "id": "geom-space",
          "subject": "기하",
          "name": "공간도형과 공간좌표"
      }
  ];

  const exams = [
      {
          "id": "2027-09",
          "year": 2027,
          "round": "9월",
          "label": "2027학년도 9월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2027-06",
          "year": 2027,
          "round": "6월",
          "label": "2027학년도 6월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2026-suneung",
          "year": 2026,
          "round": "수능",
          "label": "2026학년도 수능",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
      },
      {
          "id": "2026-09",
          "year": 2026,
          "round": "9월",
          "label": "2026학년도 9월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2026-06",
          "year": 2026,
          "round": "6월",
          "label": "2026학년도 6월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2025-suneung",
          "year": 2025,
          "round": "수능",
          "label": "2025학년도 수능",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
      },
      {
          "id": "2025-09",
          "year": 2025,
          "round": "9월",
          "label": "2025학년도 9월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2025-06",
          "year": 2025,
          "round": "6월",
          "label": "2025학년도 6월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2024-suneung",
          "year": 2024,
          "round": "수능",
          "label": "2024학년도 수능",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
      },
      {
          "id": "2024-09",
          "year": 2024,
          "round": "9월",
          "label": "2024학년도 9월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2024-06",
          "year": 2024,
          "round": "6월",
          "label": "2024학년도 6월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2023-suneung",
          "year": 2023,
          "round": "수능",
          "label": "2023학년도 수능",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
      },
      {
          "id": "2023-09",
          "year": 2023,
          "round": "9월",
          "label": "2023학년도 9월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2023-06",
          "year": 2023,
          "round": "6월",
          "label": "2023학년도 6월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2022-suneung",
          "year": 2022,
          "round": "수능",
          "label": "2022학년도 수능",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
      },
      {
          "id": "2022-09",
          "year": 2022,
          "round": "9월",
          "label": "2022학년도 9월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
      },
      {
          "id": "2022-06",
          "year": 2022,
          "round": "6월",
          "label": "2022학년도 6월",
          "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
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
    },
    {
      id: "2023-suneung-9", exam: "2023-suneung", no: 9, score: 4,
      units: ["m1-trig"], memo: "감소하는 탄젠트 함수의 양 끝값",
      body: R`함수
        \[f(x)=a-\sqrt{3}\tan 2x\]
        가 닫힌구간 \(\left[-\dfrac{\pi}{6},\,b\right]\)에서 최댓값 \(7\), 최솟값 \(3\)을 가질 때,
        \(a\times b\)의 값은? (단, \(a\), \(b\)는 상수이다.)`,
      choices: [R`\(\dfrac{\pi}{2}\)`, R`\(\dfrac{5\pi}{12}\)`, R`\(\dfrac{\pi}{3}\)`, R`\(\dfrac{\pi}{4}\)`, R`\(\dfrac{\pi}{6}\)`],
      answer: 3,
      help: R`\(\tan 2x\)는 증가하므로 \(-\sqrt{3}\tan 2x\)는 감소한다. 곧 최댓값은 왼쪽 끝 \(x=-\frac{\pi}{6}\)에서, 최솟값은 오른쪽 끝 \(x=b\)에서 나온다. 양 끝만 보면 된다.`
    },
    {
      id: "2023-suneung-10", exam: "2023-suneung", no: 10, score: 4,
      units: ["m2-integ"], memo: "위아래가 바뀐 두 넓이가 같을 조건",
      body: R`두 곡선 \(y=x^{3}+x^{2}\), \(y=-x^{2}+k\)와 \(y\)축으로 둘러싸인
        부분의 넓이를 \(A\), 두 곡선 \(y=x^{3}+x^{2}\), \(y=-x^{2}+k\)와
        직선 \(x=2\)로 둘러싸인 부분의 넓이를 \(B\)라 하자.
        \(A=B\)일 때, 상수 \(k\)의 값은? (단, \(4<k<5\))`,
      figure: "2023-suneung-10.webp",
      choices: [R`\(\dfrac{25}{6}\)`, R`\(\dfrac{13}{3}\)`, R`\(\dfrac{9}{2}\)`, R`\(\dfrac{14}{3}\)`, R`\(\dfrac{29}{6}\)`],
      answer: 4,
      help: R`\(A\)와 \(B\)는 두 곡선의 위아래가 서로 바뀐 두 조각이다. 그래서 \(A=B\)는 부호를 붙여 묶으면 \(\displaystyle\int_{0}^{2}\bigl\{(x^{3}+x^{2})-(-x^{2}+k)\bigr\}dx=0\) 한 줄이 되고, 교점을 구할 필요가 없다.`
    },
    {
      id: "2023-suneung-11", exam: "2023-suneung", no: 11, score: 4,
      units: ["m1-trig"], memo: "같은 각이 마주 보는 두 현",
      body: R`그림과 같이 사각형 \(\mathrm{ABCD}\)가 한 원에 내접하고
        \[\overline{\mathrm{AB}}=5,\quad \overline{\mathrm{AC}}=3\sqrt{5},\quad \overline{\mathrm{AD}}=7,\quad \angle\mathrm{BAC}=\angle\mathrm{CAD}\]
        일 때, 이 원의 반지름의 길이는?`,
      figure: "2023-suneung-11.webp",
      choices: [R`\(\dfrac{5\sqrt{2}}{2}\)`, R`\(\dfrac{8\sqrt{5}}{5}\)`, R`\(\dfrac{5\sqrt{5}}{3}\)`, R`\(\dfrac{8\sqrt{2}}{3}\)`, R`\(\dfrac{9\sqrt{3}}{4}\)`],
      answer: 1,
      help: R`\(\angle\mathrm{BAC}=\angle\mathrm{CAD}\)이므로 두 각이 마주 보는 현이 같아 \(\overline{\mathrm{BC}}=\overline{\mathrm{CD}}\)다. 이 하나로 삼각형 \(\mathrm{ABC}\)와 \(\mathrm{ACD}\)에 각각 코사인법칙을 써서 만든 두 식이 같아지고, 거기서 \(\cos(\angle\mathrm{BAC})\)가 정해진다.`
    },
    {
      id: "2023-suneung-12", exam: "2023-suneung", no: 12, score: 4,
      units: ["m2-integ"], memo: "구간마다 되풀이되는 절댓값 함수",
      body: R`실수 전체의 집합에서 연속인 함수 \(f(x)\)가 다음 조건을
        만족시킨다.`,
      note: [
        R`\(n-1\le x<n\)일 때, \(\bigl|f(x)\bigr|=\bigl|6(x-n+1)(x-n)\bigr|\)이다. (단, \(n\)은 자연수이다.)`
      ],
      bodyAfter: R`열린구간 \((0,\,4)\)에서 정의된 함수
        \[g(x)=\int_{0}^{x}f(t)\,dt-\int_{x}^{4}f(t)\,dt\]
        가 \(x=2\)에서 최솟값 \(0\)을 가질 때, \(\displaystyle\int_{\frac{1}{2}}^{4}f(x)\,dx\)의 값은?`,
      choices: [R`\(-\dfrac{3}{2}\)`, R`\(-\dfrac{1}{2}\)`, R`\(\dfrac{1}{2}\)`, R`\(\dfrac{3}{2}\)`, R`\(\dfrac{5}{2}\)`],
      answer: 2,
      help: R`\(g'(x)=f(x)-\bigl(-f(x)\bigr)=2f(x)\)다. \(g\)가 \(x=2\)에서 최소이니 \(f(2)=0\)이고, 그 최솟값이 \(0\)이라는 것은 \(\int_{0}^{2}f=\int_{2}^{4}f\)라는 뜻이다. 그리고 \(|f|\)가 길이 \(1\)인 구간마다 같은 모양을 되풀이하므로 각 구간의 적분은 크기가 같고 부호만 갈린다.`
    },
    {
      id: "2023-suneung-13", exam: "2023-suneung", no: 13, score: 4,
      units: ["m1-explog"], memo: "거듭제곱근이 정수가 될 조건",
      body: R`자연수 \(m\,(m\ge 2)\)에 대하여 \(m^{12}\)의 \(n\)제곱근 중에서 정수가
        존재하도록 하는 \(2\) 이상의 자연수 \(n\)의 개수를 \(f(m)\)이라 할 때,
        \(\displaystyle\sum_{m=2}^{9}f(m)\)의 값은?`,
      choices: [R`\(37\)`, R`\(42\)`, R`\(47\)`, R`\(52\)`, R`\(57\)`],
      answer: 3,
      help: R`\(m\)을 소인수분해해서 \(m=p^{e}\cdots\) 꼴로 보면 \(m^{12}\)의 지수는 \(12e\)가 된다. \(n\)제곱근이 정수이려면 그 지수가 \(n\)으로 나누어떨어져야 하므로, \(m\)이 어떤 수의 거듭제곱이면(예: \(4=2^{2}\), \(8=2^{3}\)) \(n\)의 후보가 늘어난다.`
    },
    {
      id: "2023-suneung-14", exam: "2023-suneung", no: 14, score: 4,
      units: ["m2-limit"], memo: "두 자리의 오른쪽 극한을 곱한 함수",
      body: R`다항함수 \(f(x)\)에 대하여 함수 \(g(x)\)를 다음과 같이 정의한다.
        \[g(x)=\begin{cases}x &amp; (x<-1 \text{ 또는 } x>1)\\ f(x) &amp; (-1\le x\le 1)\end{cases}\]
        함수 \(h(x)=\displaystyle\lim_{t\to 0+}g(x+t)\times\lim_{t\to 2+}g(x+t)\)에 대하여
        &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(h(1)=3\)`,
        R`ㄴ. 함수 \(h(x)\)는 실수 전체의 집합에서 연속이다.`,
        R`ㄷ. 함수 \(g(x)\)가 닫힌구간 \([-1,\,1]\)에서 감소하고 \(g(-1)=-2\)이면 함수 \(h(x)\)는 실수 전체의 집합에서 최솟값을 갖는다.`
      ],
      choices: [R`ㄱ`, R`ㄴ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`],
      answer: 1,
      help: R`\(\lim_{t\to 0+}g(x+t)\)는 \(x\)에서의 오른쪽 극한이고, \(\lim_{t\to 2+}g(x+t)\)는 \(x+2\)에서의 오른쪽 극한이다. 곧 \(h(x)\)는 서로 \(2\)만큼 떨어진 두 자리의 오른쪽 극한을 곱한 것이다. \(g\)가 끊길 수 있는 자리는 \(x=\pm 1\)뿐이므로, 그 두 자리와 거기서 \(2\)만큼 떨어진 자리만 살피면 된다.`
    },
    {
      id: "2023-suneung-15", exam: "2023-suneung", no: 15, score: 4,
      units: ["m1-seq"], memo: "3의 배수인지로 갈리는 점화식",
      body: R`모든 항이 자연수이고 다음 조건을 만족시키는 모든 수열
        \(\{a_{n}\}\)에 대하여 \(a_{9}\)의 최댓값과 최솟값을 각각 \(M\), \(m\)이라 할 때,
        \(M+m\)의 값은?`,
      note: [
        R`(가) \(a_{7}=40\)`,
        R`(나) 모든 자연수 \(n\)에 대하여 \(a_{n+2}=\begin{cases}a_{n+1}+a_{n} &amp; \left(a_{n+1}\text{이 }3\text{의 배수가 아닌 경우}\right)\\[4pt] \dfrac{1}{3}a_{n+1} &amp; \left(a_{n+1}\text{이 }3\text{의 배수인 경우}\right)\end{cases}\)이다.`
      ],
      choices: [R`\(216\)`, R`\(218\)`, R`\(220\)`, R`\(222\)`, R`\(224\)`],
      answer: 5,
      help: R`\(a_{7}=40\)에서 앞으로 두 걸음만 더 가면 \(a_{9}\)다. 곧 \(a_{8}\)이 무엇이냐에 따라 갈리고, \(a_{8}\)은 \(a_{7}=40\)이 \(3\)의 배수가 아니므로 \(a_{8}=a_{7}+a_{6}\)에서 나온다. 뒤가 아니라 앞쪽 항을 거꾸로 좁히는 문제다.`
    },
    {
      id: "2023-suneung-20", exam: "2023-suneung", no: 20, score: 4,
      units: ["m2-integ"], memo: "속도와 가속도가 구간마다 다르게 주어짐",
      body: R`수직선 위를 움직이는 점 \(\mathrm{P}\)의 시각 \(t\,(t\ge 0)\)에서의
        속도 \(v(t)\)와 가속도 \(a(t)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(0\le t\le 2\)일 때, \(v(t)=2t^{3}-8t\)이다.`,
        R`(나) \(t\ge 2\)일 때, \(a(t)=6t+4\)이다.`
      ],
      bodyAfter: R`시각 \(t=0\)에서 \(t=3\)까지 점 \(\mathrm{P}\)가 움직인 거리를 구하시오.`,
      short: true,
      answer: 17,
      help: R`\(t\ge 2\)에서는 가속도만 주어졌으니 적분해 속도를 얻어야 하고, 그 적분상수는 \(t=2\)에서 앞 구간의 속도와 이어 붙여 정한다. 움직인 거리이므로 \(v=0\)이 되는 자리에서 구간을 끊어 절댓값을 더한다.`
    },
    {
      id: "2023-suneung-21", exam: "2023-suneung", no: 21, score: 4,
      units: ["m1-explog"], memo: "절댓값으로 꺾인 지수·로그 그래프",
      body: R`자연수 \(n\)에 대하여 함수 \(f(x)\)를
        \[f(x)=\begin{cases}\left|3^{\,x+2}-n\right| &amp; (x<0)\\ \left|\log_{2}(x+4)-n\right| &amp; (x\ge 0)\end{cases}\]
        이라 하자. 실수 \(t\)에 대하여 \(x\)에 대한 방정식 \(f(x)=t\)의 서로
        다른 실근의 개수를 \(g(t)\)라 할 때, 함수 \(g(t)\)의 최댓값이 \(4\)가
        되도록 하는 모든 자연수 \(n\)의 값의 합을 구하시오.`,
      short: true,
      answer: 33,
      help: R`절댓값 안이 \(0\)이 되는 자리에서 그래프가 \(V\) 모양으로 꺾인다. 가로선 \(y=t\)가 만나는 점의 개수는 그 꺾인 자리가 두 조각 각각에 있는지, 그리고 \(x=0\) 좌우에서 값이 어떻게 이어지는지로 정해진다. \(n\)이 커지면 꺾이는 자리가 어느 쪽으로 밀려나는지를 보면 된다.`
    },
    {
      id: "2023-suneung-22", exam: "2023-suneung", no: 22, score: 4,
      units: ["m2-diff"], memo: "평균변화율이 도함수 값과 같아지는 식",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)와 실수 전체의
        집합에서 연속인 함수 \(g(x)\)가 다음 조건을 만족시킬 때,
        \(f(4)\)의 값을 구하시오.`,
      note: [
        R`(가) 모든 실수 \(x\)에 대하여 \(f(x)=f(1)+(x-1)f'\bigl(g(x)\bigr)\)이다.`,
        R`(나) 함수 \(g(x)\)의 최솟값은 \(\dfrac{5}{2}\)이다.`,
        R`(다) \(f(0)=-3\), \(f\bigl(g(1)\bigr)=6\)`
      ],
      short: true,
      answer: 13,
      help: R`(가)를 옮기면 \(x\ne 1\)일 때 \(\dfrac{f(x)-f(1)}{x-1}=f'\bigl(g(x)\bigr)\)다. 곧 왼쪽은 \(x\)와 \(1\) 사이의 평균변화율이고, 오른쪽은 어느 한 점에서의 순간변화율이다. 평균값 정리가 말하는 그 점이 바로 \(g(x)\)라는 뜻이다.`
    },
    {
      id: "2023-09-9", exam: "2023-09", no: 9, score: 4,
      units: ["m1-trig"], memo: "같은 주기를 가진 두 코사인 곡선",
      body: R`닫힌구간 \([0,\,12]\)에서 정의된 두 함수
        \[f(x)=\cos\frac{\pi x}{6},\qquad g(x)=-3\cos\frac{\pi x}{6}-1\]
        이 있다. 곡선 \(y=f(x)\)와 직선 \(y=k\)가 만나는 두 점의
        \(x\)좌표를 \(\alpha_{1}\), \(\alpha_{2}\)라 할 때, \(\bigl|\alpha_{1}-\alpha_{2}\bigr|=8\)이다. 곡선 \(y=g(x)\)와
        직선 \(y=k\)가 만나는 두 점의 \(x\)좌표를 \(\beta_{1}\), \(\beta_{2}\)라 할 때,
        \(\bigl|\beta_{1}-\beta_{2}\bigr|\)의 값은? (단, \(k\)는 \(-1<k<1\)인 상수이다.)`,
      choices: [R`\(3\)`, R`\(\dfrac{7}{2}\)`, R`\(4\)`, R`\(\dfrac{9}{2}\)`, R`\(5\)`],
      answer: 3,
      help: R`두 함수는 주기가 \(12\)로 같고 \([0,\,12]\)에서 \(x=6\)에 대하여 대칭이다. 그래서 가로선이 만나는 두 점은 \(6\)을 가운데 두고 같은 거리만큼 떨어져 있고, \(\bigl|\alpha_{1}-\alpha_{2}\bigr|=8\)에서 \(k\)가 곧바로 정해진다.`
    },
    {
      id: "2023-09-10", exam: "2023-09", no: 10, score: 4,
      units: ["m2-integ"], memo: "고정된 점과의 거리",
      body: R`수직선 위의 점 \(\mathrm{A}(6)\)과 시각 \(t=0\)일 때 원점을 출발하여
        이 수직선 위를 움직이는 점 \(\mathrm{P}\)가 있다. 시각 \(t\,(t\ge 0)\)에서의
        점 \(\mathrm{P}\)의 속도 \(v(t)\)를
        \[v(t)=3t^{2}+at\quad(a>0)\]
        이라 하자. 시각 \(t=2\)에서 점 \(\mathrm{P}\)와 점 \(\mathrm{A}\) 사이의 거리가 \(10\)일 때,
        상수 \(a\)의 값은?`,
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 4,
      help: R`\(\mathrm{P}\)는 원점에서 출발했으므로 시각 \(2\)에서의 위치가 \(\int_{0}^{2}v\,dt=8+2a\)이고, \(\mathrm{A}\)는 고정된 \(6\)이다. 거리는 그 차의 절댓값이라 \(|2+2a|=10\)이 된다.`
    },
    {
      id: "2023-09-11", exam: "2023-09", no: 11, score: 4,
      units: ["m1-explog"], memo: "실수인 네제곱근 두 개의 곱",
      body: R`함수 \(f(x)=-(x-2)^{2}+k\)에 대하여 다음 조건을 만족시키는
        자연수 \(n\)의 개수가 \(2\)일 때, 상수 \(k\)의 값은?`,
      note: [
        R`\(\sqrt{3}^{\,f(n)}\)의 네제곱근 중 실수인 것을 모두 곱한 값이 \(-9\)이다.`
      ],
      choices: [R`\(8\)`, R`\(9\)`, R`\(10\)`, R`\(11\)`, R`\(12\)`],
      answer: 2,
      help: R`\(A=\sqrt{3}^{\,f(n)}\)은 언제나 양수이므로 네제곱근 중 실수인 것은 \(\pm A^{\frac{1}{4}}\) 둘뿐이고, 그 곱은 \(-\sqrt{A}\)다. 곧 \(-3^{\frac{f(n)}{4}}=-9\)에서 \(f(n)\)의 값이 하나로 정해진다.`
    },
    {
      id: "2023-09-12", exam: "2023-09", no: 12, score: 4,
      units: ["m2-limit"], memo: "포물선과 직선의 두 교점",
      body: R`실수 \(t\,(t>0)\)에 대하여 직선 \(y=x+t\)와 곡선 \(y=x^{2}\)이
        만나는 두 점을 \(\mathrm{A}\), \(\mathrm{B}\)라 하자. 점 \(\mathrm{A}\)를 지나고 \(x\)축에 평행한
        직선이 곡선 \(y=x^{2}\)과 만나는 점 중 \(\mathrm{A}\)가 아닌 점을 \(\mathrm{C}\),
        점 \(\mathrm{B}\)에서 선분 \(\mathrm{AC}\)에 내린 수선의 발을 \(\mathrm{H}\)라 하자.
        \(\displaystyle\lim_{t\to 0+}\frac{\overline{\mathrm{AH}}-\overline{\mathrm{CH}}}{t}\)의 값은? (단, 점 \(\mathrm{A}\)의 \(x\)좌표는 양수이다.)`,
      figure: "2023-09-12.webp",
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 2,
      help: R`\(\mathrm{A}\), \(\mathrm{B}\)의 \(x\)좌표는 \(x^{2}=x+t\)의 두 근이므로 근과 계수의 관계로 합과 곱을 바로 쓸 수 있다. 그리고 \(\mathrm{C}\)는 \(\mathrm{A}\)와 \(y\)좌표가 같은 포물선 위의 다른 점이라 \(x\)좌표가 \(\mathrm{A}\)의 것의 부호를 바꾼 값이다. \(\mathrm{H}\)는 \(\mathrm{B}\)와 \(x\)좌표가 같다.`
    },
    {
      id: "2023-09-13", exam: "2023-09", no: 13, score: 4,
      units: ["m1-trig"], memo: "지름이 만드는 직각과 이웃한 각",
      body: R`그림과 같이 선분 \(\mathrm{AB}\)를 지름으로 하는 반원의 호 \(\mathrm{AB}\)
        위에 두 점 \(\mathrm{C}\), \(\mathrm{D}\)가 있다. 선분 \(\mathrm{AB}\)의 중점 \(\mathrm{O}\)에 대하여
        두 선분 \(\mathrm{AD}\), \(\mathrm{CO}\)가 점 \(\mathrm{E}\)에서 만나고,
        \[\overline{\mathrm{CE}}=4,\quad \overline{\mathrm{ED}}=3\sqrt{2},\quad \angle\mathrm{CEA}=\frac{3}{4}\pi\]
        이다. \(\overline{\mathrm{AC}}\times\overline{\mathrm{CD}}\)의 값은?`,
      figure: "2023-09-13.webp",
      choices: [R`\(6\sqrt{10}\)`, R`\(10\sqrt{5}\)`, R`\(16\sqrt{2}\)`, R`\(12\sqrt{5}\)`, R`\(20\sqrt{2}\)`],
      answer: 5,
      help: R`\(\overline{\mathrm{AB}}\)가 지름이므로 \(\angle\mathrm{ACB}=\angle\mathrm{ADB}=\frac{\pi}{2}\)다. 그리고 \(\angle\mathrm{CEA}=\frac{3}{4}\pi\)이니 그와 이웃한 \(\angle\mathrm{CED}=\frac{\pi}{4}\)이고, 두 변 \(\overline{\mathrm{CE}}\), \(\overline{\mathrm{ED}}\)와 그 사잇각이 다 있으니 삼각형 \(\mathrm{CED}\)에서 코사인법칙을 바로 쓸 수 있다.`
    },
    {
      id: "2023-09-14", exam: "2023-09", no: 14, score: 4,
      units: ["m2-integ"], memo: "구간을 옮겨 가며 적분한 함수",
      body: R`최고차항의 계수가 \(1\)이고 \(f(0)=0\), \(f(1)=0\)인
        삼차함수 \(f(x)\)에 대하여 함수 \(g(t)\)를
        \[g(t)=\int_{t}^{t+1}f(x)\,dx-\int_{0}^{1}\bigl|f(x)\bigr|\,dx\]
        라 할 때, &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(g(0)=0\)이면 \(g(-1)<0\)이다.`,
        R`ㄴ. \(g(-1)>0\)이면 \(f(k)=0\)을 만족시키는 \(k<-1\)인 실수 \(k\)가 존재한다.`,
        R`ㄷ. \(g(-1)>1\)이면 \(g(0)<-1\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 5,
      help: R`뒤쪽 \(\int_{0}^{1}|f|\)는 \(t\)와 무관한 상수라, \(g'(t)=f(t+1)-f(t)\)다. 그리고 \(f(0)=f(1)=0\)이고 최고차항 계수가 \(1\)이므로 \(f(x)=x(x-1)(x-c)\) 꼴이고, 남은 미지수는 \(c\) 하나뿐이다.`
    },
    {
      id: "2023-09-15", exam: "2023-09", no: 15, score: 4,
      units: ["m1-seq"], memo: "네 걸음마다 제자리로 오는 수열",
      body: R`수열 \(\{a_{n}\}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 모든 자연수 \(k\)에 대하여 \(a_{4k}=r^{k}\)이다. (단, \(r\)는 \(0<|r|<1\)인 상수이다.)`,
        R`(나) \(a_{1}<0\)이고, 모든 자연수 \(n\)에 대하여 \(a_{n+1}=\begin{cases}a_{n}+3 &amp; \left(|a_{n}|<5\right)\\[4pt] -\dfrac{1}{2}a_{n} &amp; \left(|a_{n}|\ge 5\right)\end{cases}\)이다.`
      ],
      bodyAfter: R`\(|a_{m}|\ge 5\)를 만족시키는 \(100\) 이하의 자연수 \(m\)의 개수를 \(p\)라
        할 때, \(p+a_{1}\)의 값은?`,
      choices: [R`\(8\)`, R`\(10\)`, R`\(12\)`, R`\(14\)`, R`\(16\)`],
      answer: 3,
      help: R`(가)는 \(a_{4}=r\), \(a_{8}=r^{2}\), \(a_{12}=r^{3}\)이라는 뜻이고 \(0<|r|<1\)이라 이 값들의 크기가 \(1\)보다 작다. 그런데 (나)의 규칙은 \(|a_{n}|<5\)일 때 \(+3\)씩 키우기만 하므로, 네 걸음 만에 다시 작은 값으로 돌아오려면 그 사이에 \(|a_{n}|\ge 5\)를 만나 반으로 줄어드는 일이 있어야 한다.`
    },
    {
      id: "2023-09-20", exam: "2023-09", no: 20, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "V자 그래프와 삼차곡선이 두 점에서 만남",
      body: R`상수 \(k\,(k<0)\)에 대하여 두 함수
        \[f(x)=x^{3}+x^{2}-x,\qquad g(x)=4|x|+k\]
        의 그래프가 만나는 점의 개수가 \(2\)일 때,
        두 함수의 그래프로 둘러싸인 부분의 넓이를 \(S\)라 하자.
        \(30\times S\)의 값을 구하시오.`,
      short: true,
      answer: 80,
      help: R`\(g\)는 \(x=0\)에서 꺾이는 \(V\) 모양이다. 오른쪽에서는 \(f(x)=4x+k\), 왼쪽에서는 \(f(x)=-4x+k\)를 푸는 셈인데, 삼차곡선과 직선이라 각각 최대 세 번 만날 수 있다. 만나는 점이 둘뿐이려면 한쪽에서 접해야 한다.`
    },
    {
      id: "2023-09-21", exam: "2023-09", no: 21, score: 4,
      units: ["m1-explog"], memo: "기울기가 같은 두 직선 위의 길이 비",
      body: R`그림과 같이 곡선 \(y=2^{x}\) 위에 두 점 \(\mathrm{P}\bigl(a,\,2^{a}\bigr)\), \(\mathrm{Q}\bigl(b,\,2^{b}\bigr)\)이
        있다. 직선 \(\mathrm{PQ}\)의 기울기를 \(m\)이라 할 때, 점 \(\mathrm{P}\)를 지나며
        기울기가 \(-m\)인 직선이 \(x\)축, \(y\)축과 만나는 점을 각각
        \(\mathrm{A}\), \(\mathrm{B}\)라 하고, 점 \(\mathrm{Q}\)를 지나며 기울기가 \(-m\)인 직선이
        \(x\)축과 만나는 점을 \(\mathrm{C}\)라 하자.
        \[\overline{\mathrm{AB}}=4\overline{\mathrm{PB}},\qquad \overline{\mathrm{CQ}}=3\overline{\mathrm{AB}}\]
        일 때, \(90\times(a+b)\)의 값을 구하시오. (단, \(0<a<b\))`,
      figure: "2023-09-21.webp",
      short: true,
      answer: 220,
      help: R`기울기가 \(-m\)인 두 직선은 서로 평행하다. 평행한 직선 위에서는 선분의 길이 비가 \(x\)좌표 차의 비와 같으므로, \(\overline{\mathrm{AB}}=4\overline{\mathrm{PB}}\)와 \(\overline{\mathrm{CQ}}=3\overline{\mathrm{AB}}\)를 길이가 아니라 \(x\)좌표 차의 관계로 바꿔 쓸 수 있다.`
    },
    {
      id: "2023-09-22", exam: "2023-09", no: 22, score: 4,
      units: ["m2-diff"], memo: "한쪽을 점대칭으로 뒤집은 함수",
      body: R`최고차항의 계수가 \(1\)이고 \(x=3\)에서 극댓값 \(8\)을 갖는
        삼차함수 \(f(x)\)가 있다. 실수 \(t\)에 대하여 함수 \(g(x)\)를
        \[g(x)=\begin{cases}f(x) &amp; (x\ge t)\\ -f(x)+2f(t) &amp; (x<t)\end{cases}\]
        라 할 때, 방정식 \(g(x)=0\)의 서로 다른 실근의 개수를 \(h(t)\)라
        하자. 함수 \(h(t)\)가 \(t=a\)에서 불연속인 \(a\)의 값이 두 개일 때,
        \(f(8)\)의 값을 구하시오.`,
      short: true,
      answer: 58,
      help: R`\(x<t\)에서의 \(-f(x)+2f(t)\)는 \(f\)를 점 \(\bigl(t,\,f(t)\bigr)\)에 대하여 점대칭으로 뒤집은 것이다. 곧 \(g\)의 그래프는 \(x=t\)를 경계로 오른쪽은 \(f\) 그대로, 왼쪽은 그 점을 중심으로 돌린 모양이라 \(x=t\)에서 매끄럽게 이어진다.`
    },
    {
      id: "2023-06-9", exam: "2023-06", no: 9, score: 4,
      units: ["m2-diff"], memo: "부등식을 최솟값 문제로 바꾸기",
      body: R`두 함수
        \[f(x)=x^{3}-x+6,\qquad g(x)=x^{2}+a\]
        가 있다. \(x\ge 0\)인 모든 실수 \(x\)에 대하여 부등식
        \[f(x)\ge g(x)\]
        가 성립할 때, 실수 \(a\)의 최댓값은?`,
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 5,
      help: R`부등식을 \(a\)에 대하여 옮기면 \(a\le x^{3}-x^{2}-x+6\)이다. 이것이 \(x\ge 0\)인 모든 \(x\)에서 성립해야 하므로, 오른쪽 함수의 그 구간에서의 최솟값이 곧 \(a\)의 최댓값이다.`
    },
    {
      id: "2023-06-10", exam: "2023-06", no: 10, score: 4,
      units: ["m1-trig"], memo: "중점에서 만나는 두 현",
      body: R`그림과 같이 \(\overline{\mathrm{AB}}=3\), \(\overline{\mathrm{BC}}=2\), \(\overline{\mathrm{AC}}>3\)이고
        \(\cos(\angle\mathrm{BAC})=\dfrac{7}{8}\)인 삼각형 \(\mathrm{ABC}\)가 있다. 선분 \(\mathrm{AC}\)의 중점을 \(\mathrm{M}\),
        삼각형 \(\mathrm{ABC}\)의 외접원이 직선 \(\mathrm{BM}\)과 만나는 점 중 \(\mathrm{B}\)가 아닌
        점을 \(\mathrm{D}\)라 할 때, 선분 \(\mathrm{MD}\)의 길이는?`,
      figure: "2023-06-10.webp",
      choices: [R`\(\dfrac{3\sqrt{10}}{5}\)`, R`\(\dfrac{7\sqrt{10}}{10}\)`, R`\(\dfrac{4\sqrt{10}}{5}\)`, R`\(\dfrac{9\sqrt{10}}{10}\)`, R`\(\sqrt{10}\)`],
      answer: 3,
      help: R`두 현 \(\mathrm{AC}\)와 \(\mathrm{BD}\)가 점 \(\mathrm{M}\)에서 만나므로 \(\overline{\mathrm{AM}}\times\overline{\mathrm{MC}}=\overline{\mathrm{BM}}\times\overline{\mathrm{MD}}\)다. \(\mathrm{M}\)이 중점이라 왼쪽은 \(\left(\frac{\overline{\mathrm{AC}}}{2}\right)^{2}\)이고, \(\overline{\mathrm{AC}}\)는 코사인법칙으로, \(\overline{\mathrm{BM}}\)은 중선의 길이로 구할 수 있다.`
    },
    {
      id: "2023-06-11", exam: "2023-06", no: 11, score: 4,
      units: ["m2-integ"], memo: "한 점이 원점으로 돌아오는 시각",
      body: R`시각 \(t=0\)일 때 동시에 원점을 출발하여 수직선 위를
        움직이는 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)의 시각 \(t\,(t\ge 0)\)에서의 속도가 각각
        \[v_{1}(t)=2-t,\qquad v_{2}(t)=3t\]
        이다. 출발한 시각부터 점 \(\mathrm{P}\)가 원점으로 돌아올 때까지
        점 \(\mathrm{Q}\)가 움직인 거리는?`,
      choices: [R`\(16\)`, R`\(18\)`, R`\(20\)`, R`\(22\)`, R`\(24\)`],
      answer: 5,
      help: R`\(\mathrm{P}\)가 원점으로 돌아오는 시각은 위치가 다시 \(0\)이 되는 때이므로 \(\int_{0}^{T}(2-t)\,dt=0\)에서 나온다. \(\mathrm{Q}\)의 속도는 \(t\ge 0\)에서 늘 \(0\) 이상이라 움직인 거리가 절댓값 없이 그냥 적분값이다.`
    },
    {
      id: "2023-06-12", exam: "2023-06", no: 12, score: 4,
      units: ["m1-seq"], memo: "부호가 바뀌는 자리와 절댓값의 합",
      body: R`공차가 \(3\)인 등차수열 \(\{a_{n}\}\)이 다음 조건을 만족시킬 때,
        \(a_{10}\)의 값은?`,
      note: [
        R`(가) \(a_{5}\times a_{7}<0\)`,
        R`(나) \(\displaystyle\sum_{k=1}^{6}\bigl|a_{k+6}\bigr|=6+\sum_{k=1}^{6}\bigl|a_{2k}\bigr|\)`
      ],
      choices: [R`\(\dfrac{21}{2}\)`, R`\(11\)`, R`\(\dfrac{23}{2}\)`, R`\(12\)`, R`\(\dfrac{25}{2}\)`],
      answer: 3,
      help: R`공차가 \(3\)으로 양수이고 \(a_{5}a_{7}<0\)이니 수열이 음수에서 양수로 바뀌는 자리가 \(a_{5}\)와 \(a_{7}\) 사이다. 절댓값이 붙어 있으므로 어느 항까지 음수인지를 먼저 못박아야 (나)의 두 합을 식으로 쓸 수 있다.`
    },
    {
      id: "2023-06-13", exam: "2023-06", no: 13, score: 4,
      units: ["m1-explog"], memo: "두 지수 곡선을 오가며 줄어드는 좌표",
      body: R`두 곡선 \(y=16^{x}\), \(y=2^{x}\)과 한 점 \(\mathrm{A}\bigl(64,\,2^{64}\bigr)\)이 있다.
        점 \(\mathrm{A}\)를 지나며 \(x\)축과 평행한 직선이 곡선 \(y=16^{x}\)과 만나는
        점을 \(\mathrm{P}_{1}\)이라 하고, 점 \(\mathrm{P}_{1}\)을 지나며 \(y\)축과 평행한 직선이
        곡선 \(y=2^{x}\)과 만나는 점을 \(\mathrm{Q}_{1}\)이라 하자.
        점 \(\mathrm{Q}_{1}\)을 지나며 \(x\)축과 평행한 직선이 곡선 \(y=16^{x}\)과 만나는
        점을 \(\mathrm{P}_{2}\)라 하고, 점 \(\mathrm{P}_{2}\)를 지나며 \(y\)축과 평행한 직선이
        곡선 \(y=2^{x}\)과 만나는 점을 \(\mathrm{Q}_{2}\)라 하자.
        이와 같은 과정을 계속하여 \(n\)번째 얻은 두 점을 각각
        \(\mathrm{P}_{n}\), \(\mathrm{Q}_{n}\)이라 하고 점 \(\mathrm{Q}_{n}\)의 \(x\)좌표를 \(x_{n}\)이라 할 때,
        \(x_{n}<\dfrac{1}{k}\)을 만족시키는 \(n\)의 최솟값이 \(6\)이 되도록 하는
        자연수 \(k\)의 개수는?`,
      figure: "2023-06-13.webp",
      choices: [R`\(48\)`, R`\(51\)`, R`\(54\)`, R`\(57\)`, R`\(60\)`],
      answer: 1,
      help: R`\(16^{x}=2^{4x}\)이므로 \(y\)좌표가 같은 두 점을 견주면 \(y=16^{x}\) 위의 점의 \(x\)좌표가 \(y=2^{x}\) 위의 점의 \(\frac{1}{4}\)배다. 그리고 \(\mathrm{Q}_{n}\)은 \(\mathrm{P}_{n}\)과 \(x\)좌표가 같으니, \(x_{n}\)은 공비가 \(\frac{1}{4}\)인 등비수열이 된다.`
    },
    {
      id: "2023-06-14", exam: "2023-06", no: 14, score: 4,
      units: ["m2-integ"], memo: "부호를 뒤집어 이어 붙인 적분함수",
      body: R`실수 전체의 집합에서 연속인 함수 \(f(x)\)와 최고차항의
        계수가 \(1\)인 삼차함수 \(g(x)\)가
        \[g(x)=\begin{cases}-\displaystyle\int_{0}^{x}f(t)\,dt &amp; (x<0)\\[8pt] \displaystyle\int_{0}^{x}f(t)\,dt &amp; (x\ge 0)\end{cases}\]
        을 만족시킬 때, &lt;보기&gt;에서 옳은 것만을 있는 대로 고른
        것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(f(0)=0\)`,
        R`ㄴ. 함수 \(f(x)\)는 극댓값을 갖는다.`,
        R`ㄷ. \(2<f(1)<4\)일 때, 방정식 \(f(x)=x\)의 서로 다른 실근의 개수는 \(3\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄷ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 4,
      help: R`\(F(x)=\int_{0}^{x}f\)라 하면 \(g\)는 \(x\ge 0\)에서 \(F\), \(x<0\)에서 \(-F\)다. 그런데 \(g\)가 하나의 삼차함수이므로 \(x<0\)에서도 \(g=F\)여야 하고, 곧 \(x<0\)에서 \(F(x)=-F(x)\), 즉 \(F\)가 그 구간에서 \(0\)이 아니면 모순이 생긴다. 이 어긋남이 \(f\)의 모양을 크게 좁힌다.`
    },
    {
      id: "2023-06-15", exam: "2023-06", no: 15, score: 4,
      units: ["m1-seq"], memo: "오르내림이 다른 두 걸음으로 제자리 오기",
      body: R`자연수 \(k\)에 대하여 다음 조건을 만족시키는 수열 \(\{a_{n}\}\)이
        있다.`,
      note: [
        R`\(a_{1}=0\)이고, 모든 자연수 \(n\)에 대하여 \(a_{n+1}=\begin{cases}a_{n}+\dfrac{1}{k+1} &amp; \left(a_{n}\le 0\right)\\[8pt] a_{n}-\dfrac{1}{k} &amp; \left(a_{n}>0\right)\end{cases}\)이다.`
      ],
      bodyAfter: R`\(a_{22}=0\)이 되도록 하는 모든 \(k\)의 값의 합은?`,
      choices: [R`\(12\)`, R`\(14\)`, R`\(16\)`, R`\(18\)`, R`\(20\)`],
      answer: 2,
      help: R`\(0\) 이하이면 \(\frac{1}{k+1}\)만큼 오르고, 양수이면 \(\frac{1}{k}\)만큼 내린다. 오르는 걸음과 내리는 걸음의 크기가 달라서, \(21\)걸음 뒤 다시 \(0\)이 되려면 오른 횟수와 내린 횟수가 \(\frac{p}{k+1}=\frac{q}{k}\)를 만족시키도록 맞아떨어져야 한다.`
    },
    {
      id: "2023-06-20", exam: "2023-06", no: 20, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "폭이 1인 창으로 훑은 절댓값 적분",
      body: R`최고차항의 계수가 \(2\)인 이차함수 \(f(x)\)에 대하여
        함수 \(g(x)=\displaystyle\int_{x}^{x+1}\bigl|f(t)\bigr|\,dt\)는 \(x=1\)과 \(x=4\)에서 극소이다.
        \(f(0)\)의 값을 구하시오.`,
      short: true,
      answer: 13,
      help: R`\(g'(x)=\bigl|f(x+1)\bigr|-\bigl|f(x)\bigr|\)다. 곧 \(x=1\)과 \(x=4\)에서 \(\bigl|f(x+1)\bigr|=\bigl|f(x)\bigr|\)이고 그 자리에서 부호가 음에서 양으로 바뀐다. 절댓값 안의 부호까지 따져야 어느 쪽이 같아지는지가 갈린다.`
    },
    {
      id: "2023-06-21", exam: "2023-06", no: 21, score: 4,
      units: ["m1-explog"], memo: "로그값이 정수가 될 조건",
      body: R`자연수 \(n\)에 대하여 \(4\log_{64}\left(\dfrac{3}{4n+16}\right)\)의 값이 정수가 되도록
        하는 \(1000\) 이하의 모든 \(n\)의 값의 합을 구하시오.`,
      short: true,
      answer: 426,
      help: R`\(\log_{64}=\frac{1}{6}\log_{2}\)이므로 주어진 식은 \(\frac{2}{3}\log_{2}\dfrac{3}{4n+16}\)이다. 이것이 정수이려면 \(\log_{2}\dfrac{3}{4n+16}\)이 \(3\)의 배수인 정수여야 하고, 그러려면 로그 안의 값이 \(2\)의 거듭제곱이어야 한다.`
    },
    {
      id: "2023-06-22", exam: "2023-06", no: 22, score: 4,
      units: ["m2-limit"], memo: "분자가 0으로 가야만 살아남는 극한",
      body: R`두 양수 \(a\), \(b\,(b>3)\)과 최고차항의 계수가 \(1\)인 이차함수
        \(f(x)\)에 대하여 함수
        \[g(x)=\begin{cases}(x+3)f(x) &amp; (x<0)\\ (x+a)f(x-b) &amp; (x\ge 0)\end{cases}\]
        이 실수 전체의 집합에서 연속이고 다음 조건을 만족시킬 때,
        \(g(4)\)의 값을 구하시오.`,
      note: [
        R`\(\displaystyle\lim_{x\to-3}\frac{\sqrt{\bigl|g(x)\bigr|+\bigl\{g(t)\bigr\}^{2}}-\bigl|g(t)\bigr|}{(x+3)^{2}}\)의 값이 존재하지 않는 실수 \(t\)의 값은 \(-3\)과 \(6\)뿐이다.`
      ],
      short: true,
      answer: 19,
      help: R`\(x\to-3\)일 때 \(g(x)\to g(-3)=0\)이므로 분자는 \(\sqrt{\bigl|g(x)\bigr|+\{g(t)\}^{2}}-\bigl|g(t)\bigr|\)로, \(g(t)\ne 0\)이면 \(0\)으로 간다. 이때 분자를 유리화하면 \(\bigl|g(x)\bigr|\)가 통째로 남으므로, 극한이 있는지 없는지는 \(\bigl|g(x)\bigr|\)가 \((x+3)^{2}\)만큼 빠르게 \(0\)으로 가느냐로 갈린다.`
    },
    {
      id: "2022-suneung-9", exam: "2022-suneung", no: 9, score: 4,
      units: ["m1-explog"], memo: "평행이동한 두 지수 곡선과 한 직선",
      body: R`직선 \(y=2x+k\)가 두 함수
        \[y=\left(\frac{2}{3}\right)^{x+3}+1,\qquad y=\left(\frac{2}{3}\right)^{x+1}+\frac{8}{3}\]
        의 그래프와 만나는 점을 각각 \(\mathrm{P}\), \(\mathrm{Q}\)라 하자. \(\overline{\mathrm{PQ}}=\sqrt{5}\)일 때,
        상수 \(k\)의 값은?`,
      figure: "2022-suneung-9.webp",
      choices: [R`\(\dfrac{31}{6}\)`, R`\(\dfrac{16}{3}\)`, R`\(\dfrac{11}{2}\)`, R`\(\dfrac{17}{3}\)`, R`\(\dfrac{35}{6}\)`],
      answer: 4,
      help: R`두 점이 기울기 \(2\)인 같은 직선 위에 있으므로 \(x\)좌표 차를 \(d\)라 하면 \(y\)좌표 차는 \(2d\)이고 \(\overline{\mathrm{PQ}}=|d|\sqrt{5}\)다. 곧 \(\overline{\mathrm{PQ}}=\sqrt{5}\)에서 두 점의 \(x\)좌표 차가 \(1\)로 못박힌다.`
    },
    {
      id: "2022-suneung-10", exam: "2022-suneung", no: 10, score: 4,
      units: ["m2-diff"], memo: "두 접선이 일치할 조건",
      body: R`삼차함수 \(f(x)\)에 대하여 곡선 \(y=f(x)\) 위의 점 \((0,\,0)\)에서의
        접선과 곡선 \(y=xf(x)\) 위의 점 \((1,\,2)\)에서의 접선이 일치할 때,
        \(f'(2)\)의 값은?`,
      choices: [R`\(-18\)`, R`\(-17\)`, R`\(-16\)`, R`\(-15\)`, R`\(-14\)`],
      answer: 5,
      help: R`\((0,\,0)\)이 \(y=f(x)\) 위의 점이니 \(f(0)=0\)이고, \((1,\,2)\)가 \(y=xf(x)\) 위의 점이니 \(f(1)=2\)다. 그리고 첫 접선은 원점을 지나므로, 두 접선이 일치하려면 둘째 접선도 원점을 지나야 한다.`
    },
    {
      id: "2022-suneung-11", exam: "2022-suneung", no: 11, score: 4,
      units: ["m1-trig"], memo: "원점 대칭인 탄젠트 곡선과 정삼각형",
      body: R`양수 \(a\)에 대하여 집합 \(\left\{x\ \middle|\ -\dfrac{a}{2}<x\le a,\ x\ne\dfrac{a}{2}\right\}\)에서
        정의된 함수
        \[f(x)=\tan\frac{\pi x}{a}\]
        가 있다. 그림과 같이 함수 \(y=f(x)\)의 그래프 위의
        세 점 \(\mathrm{O}\), \(\mathrm{A}\), \(\mathrm{B}\)를 지나는 직선이 있다. 점 \(\mathrm{A}\)를 지나고 \(x\)축에
        평행한 직선이 함수 \(y=f(x)\)의 그래프와 만나는 점 중 \(\mathrm{A}\)가
        아닌 점을 \(\mathrm{C}\)라 하자. 삼각형 \(\mathrm{ABC}\)가 정삼각형일 때,
        삼각형 \(\mathrm{ABC}\)의 넓이는? (단, \(\mathrm{O}\)는 원점이다.)`,
      figure: "2022-suneung-11.webp",
      choices: [R`\(\dfrac{3\sqrt{3}}{2}\)`, R`\(\dfrac{17\sqrt{3}}{12}\)`, R`\(\dfrac{4\sqrt{3}}{3}\)`, R`\(\dfrac{5\sqrt{3}}{4}\)`, R`\(\dfrac{7\sqrt{3}}{6}\)`],
      answer: 3,
      help: R`\(f(x)=\tan\frac{\pi x}{a}\)는 원점에 대하여 대칭이므로, 원점을 지나는 직선이 그래프와 만나는 두 점 \(\mathrm{A}\), \(\mathrm{B}\)도 원점에 대하여 대칭이다. 곧 \(\mathrm{O}\)가 선분 \(\mathrm{AB}\)의 중점이고, 정삼각형이라는 조건에서 \(\overline{\mathrm{CO}}\)가 \(\overline{\mathrm{AB}}\)에 수직임이 따라온다.`
    },
    {
      id: "2022-suneung-12", exam: "2022-suneung", no: 12, score: 4,
      units: ["m2-limit"], memo: "인수분해로 세 갈래가 되는 함수",
      body: R`실수 전체의 집합에서 연속인 함수 \(f(x)\)가 모든 실수 \(x\)에
        대하여
        \[\bigl\{f(x)\bigr\}^{3}-\bigl\{f(x)\bigr\}^{2}-x^{2}f(x)+x^{2}=0\]
        을 만족시킨다. 함수 \(f(x)\)의 최댓값이 \(1\)이고 최솟값이 \(0\)일 때,
        \(f\left(-\dfrac{4}{3}\right)+f(0)+f\left(\dfrac{1}{2}\right)\)의 값은?`,
      choices: [R`\(\dfrac{1}{2}\)`, R`\(1\)`, R`\(\dfrac{3}{2}\)`, R`\(2\)`, R`\(\dfrac{5}{2}\)`],
      answer: 3,
      help: R`좌변을 묶으면 \(\bigl(f(x)-1\bigr)\bigl(f(x)-x\bigr)\bigl(f(x)+x\bigr)=0\)이 된다. 곧 각 \(x\)마다 \(f(x)\)는 \(1\), \(x\), \(-x\) 셋 중 하나이고, \(f\)가 연속이며 최댓값 \(1\)·최솟값 \(0\)이라는 조건이 어느 조각을 어디서 쓸지 정해 준다.`
    },
    {
      id: "2022-suneung-13", exam: "2022-suneung", no: 13, score: 4,
      units: ["m1-explog"], memo: "밑만 다른 두 로그 점을 지나는 직선",
      body: R`두 상수 \(a\), \(b\,(1<a<b)\)에 대하여 좌표평면 위의
        두 점 \(\bigl(a,\,\log_{2}a\bigr)\), \(\bigl(b,\,\log_{2}b\bigr)\)를 지나는 직선의 \(y\)절편과
        두 점 \(\bigl(a,\,\log_{4}a\bigr)\), \(\bigl(b,\,\log_{4}b\bigr)\)를 지나는 직선의 \(y\)절편이 같다.
        함수 \(f(x)=a^{bx}+b^{ax}\)에 대하여 \(f(1)=40\)일 때, \(f(2)\)의 값은?`,
      choices: [R`\(760\)`, R`\(800\)`, R`\(840\)`, R`\(880\)`, R`\(920\)`],
      answer: 2,
      help: R`\(\log_{4}x=\frac{1}{2}\log_{2}x\)이므로 두 번째 직선은 첫 번째 직선 위의 두 점의 \(y\)좌표를 절반으로 줄인 것이다. 두 직선의 \(y\)절편을 각각 \(a\), \(b\)로 써서 같게 놓으면 \(a^{b}=b^{a}\) 꼴의 관계가 나온다.`
    },
    {
      id: "2022-suneung-14", exam: "2022-suneung", no: 14, score: 4,
      units: ["m2-integ"], memo: "위치가 양 끝에서 0인 운동",
      body: R`수직선 위를 움직이는 점 \(\mathrm{P}\)의 시각 \(t\)에서의 위치 \(x(t)\)가
        두 상수 \(a\), \(b\)에 대하여
        \[x(t)=t(t-1)(at+b)\quad(a\ne 0)\]
        이다. 점 \(\mathrm{P}\)의 시각 \(t\)에서의 속도 \(v(t)\)가 \(\displaystyle\int_{0}^{1}\bigl|v(t)\bigr|\,dt=2\)를
        만족시킬 때, &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(\displaystyle\int_{0}^{1}v(t)\,dt=0\)`,
        R`ㄴ. \(\bigl|x(t_{1})\bigr|>1\)인 \(t_{1}\)이 열린구간 \((0,\,1)\)에 존재한다.`,
        R`ㄷ. \(0\le t\le 1\)인 모든 \(t\)에 대하여 \(\bigl|x(t)\bigr|<1\)이면 \(x(t_{2})=0\)인 \(t_{2}\)가 열린구간 \((0,\,1)\)에 존재한다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 3,
      help: R`\(x(t)=t(t-1)(at+b)\)는 \(t=0\)과 \(t=1\)에서 모두 \(0\)이다. 그러니 \(\int_{0}^{1}v\,dt=x(1)-x(0)=0\)이고, 그런데도 \(\int_{0}^{1}|v|\,dt=2\)라는 것은 그 사이에 갔다가 되돌아왔다는 뜻이다.`
    },
    {
      id: "2022-suneung-15", exam: "2022-suneung", no: 15, score: 4,
      units: ["m1-trig"], memo: "반지름이 중심거리와 같은 두 원",
      body: R`두 점 \(\mathrm{O_{1}}\), \(\mathrm{O_{2}}\)를 각각 중심으로 하고 반지름의 길이가 \(\overline{\mathrm{O_{1}O_{2}}}\)인
        두 원 \(C_{1}\), \(C_{2}\)가 있다. 그림과 같이 원 \(C_{1}\) 위의 서로 다른 세 점
        \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{C}\)와 원 \(C_{2}\) 위의 점 \(\mathrm{D}\)가 주어져 있고, 세 점 \(\mathrm{A}\), \(\mathrm{O_{1}}\), \(\mathrm{O_{2}}\)와
        세 점 \(\mathrm{C}\), \(\mathrm{O_{2}}\), \(\mathrm{D}\)가 각각 한 직선 위에 있다.
        이때 \(\angle\mathrm{BO_{1}A}=\theta_{1}\), \(\angle\mathrm{O_{2}O_{1}C}=\theta_{2}\), \(\angle\mathrm{O_{1}O_{2}D}=\theta_{3}\)이라 하자.`,
      figure: "2022-suneung-15.webp",
      bodyAfter: R`다음은 \(\overline{\mathrm{AB}}:\overline{\mathrm{O_{1}D}}=1:2\sqrt{2}\)이고 \(\theta_{3}=\theta_{1}+\theta_{2}\)일 때, 선분 \(\mathrm{AB}\)와
        선분 \(\mathrm{CD}\)의 길이의 비를 구하는 과정이다.
        <div class="proof-box">
        <p>\(\angle\mathrm{CO_{2}O_{1}}+\angle\mathrm{O_{1}O_{2}D}=\pi\)이므로 \(\theta_{3}=\dfrac{\pi}{2}+\dfrac{\theta_{2}}{2}\)이고</p>
        <p>\(\theta_{3}=\theta_{1}+\theta_{2}\)에서 \(2\theta_{1}+\theta_{2}=\pi\)이므로 \(\angle\mathrm{CO_{1}B}=\theta_{1}\)이다.</p>
        <p>이때 \(\angle\mathrm{O_{2}O_{1}B}=\theta_{1}+\theta_{2}=\theta_{3}\)이므로 삼각형 \(\mathrm{O_{1}O_{2}B}\)와 삼각형 \(\mathrm{O_{2}O_{1}D}\)는 합동이다.</p>
        <p>\(\overline{\mathrm{AB}}=k\)라 할 때</p>
        <p>\(\overline{\mathrm{BO_{2}}}=\overline{\mathrm{O_{1}D}}=2\sqrt{2}\,k\)이므로 \(\overline{\mathrm{AO_{2}}}=\fbox{(가)}\)이고,</p>
        <p>\(\angle\mathrm{BO_{2}A}=\dfrac{\theta_{1}}{2}\)이므로 \(\cos\dfrac{\theta_{1}}{2}=\fbox{(나)}\)이다.</p>
        <p>삼각형 \(\mathrm{O_{2}BC}\)에서 \(\overline{\mathrm{BC}}=k\), \(\overline{\mathrm{BO_{2}}}=2\sqrt{2}\,k\), \(\angle\mathrm{CO_{2}B}=\dfrac{\theta_{1}}{2}\)이므로 코사인법칙에 의하여 \(\overline{\mathrm{O_{2}C}}=\fbox{(다)}\)이다.</p>
        <p>\(\overline{\mathrm{CD}}=\overline{\mathrm{O_{2}D}}+\overline{\mathrm{O_{2}C}}=\overline{\mathrm{O_{1}O_{2}}}+\overline{\mathrm{O_{2}C}}\)이므로</p>
        \[\overline{\mathrm{AB}}:\overline{\mathrm{CD}}=k:\left(\frac{\fbox{(가)}}{2}+\fbox{(다)}\right)\]
        <p>이다.</p>
        </div>
        위의 (가), (다)에 알맞은 식을 각각 \(f(k)\), \(g(k)\)라 하고,
        (나)에 알맞은 수를 \(p\)라 할 때, \(f(p)\times g(p)\)의 값은?`,
      choices: [R`\(\dfrac{169}{27}\)`, R`\(\dfrac{56}{9}\)`, R`\(\dfrac{167}{27}\)`, R`\(\dfrac{166}{27}\)`, R`\(\dfrac{55}{9}\)`],
      answer: 2,
      help: R`두 원의 반지름이 모두 \(\overline{\mathrm{O_{1}O_{2}}}\)로 같다는 것이 이 문제의 뼈대다. 그래서 \(\overline{\mathrm{O_{1}O_{2}}}=\overline{\mathrm{O_{1}B}}=\overline{\mathrm{O_{2}D}}\)가 되고, 과정 상자가 말하는 두 삼각형의 합동도 여기서 나온다.`
    },
    {
      id: "2022-suneung-20", exam: "2022-suneung", no: 20, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "한 구간의 값이 다음 구간을 낳는 함수",
      body: R`실수 전체의 집합에서 미분가능한 함수 \(f(x)\)가 다음 조건을
        만족시킨다.`,
      note: [
        R`(가) 닫힌구간 \([0,\,1]\)에서 \(f(x)=x\)이다.`,
        R`(나) 어떤 상수 \(a\), \(b\)에 대하여 구간 \([0,\,\infty)\)에서 \(f(x+1)-xf(x)=ax+b\)이다.`
      ],
      bodyAfter: R`\(60\times\displaystyle\int_{1}^{2}f(x)\,dx\)의 값을 구하시오.`,
      short: true,
      answer: 110,
      help: R`(가)에서 \([0,\,1]\)의 값이 이미 정해져 있으므로, (나)에 \(x\)를 그 구간에서 잡으면 \(f(x+1)=xf(x)+ax+b=x^{2}+ax+b\)가 되어 \([1,\,2]\)에서의 \(f\)가 곧바로 나온다. 남은 것은 \(x=1\)에서 매끄럽게 이어져야 한다는 조건이다.`
    },
    {
      id: "2022-suneung-21", exam: "2022-suneung", no: 21, score: 4,
      units: ["m1-seq"], memo: "크기는 정해지고 부호만 고르는 수열",
      body: R`수열 \(\{a_{n}\}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(\bigl|a_{1}\bigr|=2\)`,
        R`(나) 모든 자연수 \(n\)에 대하여 \(\bigl|a_{n+1}\bigr|=2\bigl|a_{n}\bigr|\)이다.`,
        R`(다) \(\displaystyle\sum_{n=1}^{10}a_{n}=-14\)`
      ],
      bodyAfter: R`\(a_{1}+a_{3}+a_{5}+a_{7}+a_{9}\)의 값을 구하시오.`,
      short: true,
      answer: 678,
      help: R`(가)와 (나)에서 \(\bigl|a_{n}\bigr|=2^{n}\)이므로 각 항은 \(\pm 2^{n}\)이고 고를 것은 부호뿐이다. \(2^{10}=1024\)가 나머지 항들을 다 합친 것보다 크므로, 합이 \(-14\)가 되려면 큰 항의 부호부터 저절로 정해진다.`
    },
    {
      id: "2022-suneung-22", exam: "2022-suneung", no: 22, score: 4,
      units: ["m2-diff"], memo: "길이 2인 창에 든 도함수의 근 세기",
      body: R`최고차항의 계수가 \(\dfrac{1}{2}\)인 삼차함수 \(f(x)\)와 실수 \(t\)에 대하여
        방정식 \(f'(x)=0\)이 닫힌구간 \([t,\,t+2]\)에서 갖는 실근의 개수를
        \(g(t)\)라 할 때, 함수 \(g(t)\)는 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 모든 실수 \(a\)에 대하여 \(\displaystyle\lim_{t\to a+}g(t)+\lim_{t\to a-}g(t)\le 2\)이다.`,
        R`(나) \(g\bigl(f(1)\bigr)=g\bigl(f(4)\bigr)=2\), \(g\bigl(f(0)\bigr)=1\)`
      ],
      bodyAfter: R`\(f(5)\)의 값을 구하시오.`,
      short: true,
      answer: 9,
      help: R`\(g(t)\)는 길이 \(2\)인 창 \([t,\,t+2]\) 안에 \(f'(x)=0\)의 근이 몇 개 들어 있는지를 센 것이다. \(f\)가 삼차함수라 \(f'\)의 근은 많아야 둘이고, 그 두 근 사이의 거리가 \(2\)보다 큰지 작은지에 따라 \(g\)가 \(2\)까지 오를 수 있는지가 갈린다.`
    },
    {
      id: "2022-09-9", exam: "2022-09", no: 9, score: 4,
      units: ["m2-diff", "m2-integ"], memo: "가속도로 상수를 정하고 거리 구하기",
      body: R`수직선 위를 움직이는 점 \(\mathrm{P}\)의 시각 \(t\,(t>0)\)에서의
        속도 \(v(t)\)가
        \[v(t)=-4t^{3}+12t^{2}\]
        이다. 시각 \(t=k\)에서 점 \(\mathrm{P}\)의 가속도가 \(12\)일 때, 시각 \(t=3k\)에서
        \(t=4k\)까지 점 \(\mathrm{P}\)가 움직인 거리는? (단, \(k\)는 상수이다.)`,
      choices: [R`\(23\)`, R`\(25\)`, R`\(27\)`, R`\(29\)`, R`\(31\)`],
      answer: 3,
      help: R`가속도는 속도를 미분한 \(-12t^{2}+24t\)이고, 이것이 \(12\)라는 조건은 \(k^{2}-2k+1=0\)이 되어 \(k=1\)로 딱 하나 정해진다. 그리고 \(v(t)=4t^{2}(3-t)\)이므로 \(t>3\)에서는 속도가 음수라 거리를 구할 때 절댓값을 씌워야 한다.`
    },
    {
      id: "2022-09-10", exam: "2022-09", no: 10, score: 4,
      units: ["m1-trig"], memo: "사인 곡선의 두 봉우리",
      body: R`두 양수 \(a\), \(b\)에 대하여 곡선 \(y=a\sin b\pi x\left(0\le x\le\dfrac{3}{b}\right)\)이
        직선 \(y=a\)와 만나는 서로 다른 두 점을 \(\mathrm{A}\), \(\mathrm{B}\)라 하자.
        삼각형 \(\mathrm{OAB}\)의 넓이가 \(5\)이고 직선 \(\mathrm{OA}\)의 기울기와
        직선 \(\mathrm{OB}\)의 기울기의 곱이 \(\dfrac{5}{4}\)일 때, \(a+b\)의 값은?
        (단, \(\mathrm{O}\)는 원점이다.)`,
      figure: "2022-09-10.webp",
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 3,
      help: R`\(y=a\sin b\pi x\)의 최댓값이 \(a\)이므로 직선 \(y=a\)는 곡선의 꼭대기에만 닿는다. 곧 \(\mathrm{A}\)와 \(\mathrm{B}\)는 이웃한 두 봉우리의 꼭대기이고, \(x\)좌표 차가 주기 \(\frac{2}{b}\)만큼이다.`
    },
    {
      id: "2022-09-11", exam: "2022-09", no: 11, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "적분식을 미분해 도함수 얻기",
      body: R`다항함수 \(f(x)\)가 모든 실수 \(x\)에 대하여
        \[xf(x)=2x^{3}+ax^{2}+3a+\int_{1}^{x}f(t)\,dt\]
        를 만족시킨다. \(f(1)=\displaystyle\int_{0}^{1}f(t)\,dt\)일 때, \(a+f(3)\)의 값은?
        (단, \(a\)는 상수이다.)`,
      choices: [R`\(5\)`, R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`],
      answer: 4,
      help: R`양변을 \(x\)로 미분하면 \(f(x)+xf'(x)=6x^{2}+2ax+f(x)\)가 되어 \(f(x)\)가 지워지고 \(f'(x)=6x+2a\)만 남는다. 그리고 원래 식에 \(x=1\)을 넣으면 적분이 \(0\)이 되어 \(f(1)\)이 바로 나온다.`
    },
    {
      id: "2022-09-12", exam: "2022-09", no: 12, score: 4,
      units: ["m1-trig"], memo: "원에 내접하는 사각형의 마주 보는 각",
      body: R`반지름의 길이가 \(2\sqrt{7}\)인 원에 내접하고 \(\angle\mathrm{A}=\dfrac{\pi}{3}\)인
        삼각형 \(\mathrm{ABC}\)가 있다. 점 \(\mathrm{A}\)를 포함하지 않는 호 \(\mathrm{BC}\) 위의 점 \(\mathrm{D}\)에
        대하여 \(\sin(\angle\mathrm{BCD})=\dfrac{2\sqrt{7}}{7}\)일 때, \(\overline{\mathrm{BD}}+\overline{\mathrm{CD}}\)의 값은?`,
      figure: "2022-09-12.webp",
      choices: [R`\(\dfrac{19}{2}\)`, R`\(10\)`, R`\(\dfrac{21}{2}\)`, R`\(11\)`, R`\(\dfrac{23}{2}\)`],
      answer: 2,
      help: R`사각형 \(\mathrm{ABDC}\)가 원에 내접하므로 마주 보는 두 각의 합이 \(\pi\)라 \(\angle\mathrm{BDC}=\pi-\frac{\pi}{3}=\frac{2}{3}\pi\)다. 그리고 \(\overline{\mathrm{BC}}=2R\sin A\)로 곧바로 구해지니, 삼각형 \(\mathrm{BCD}\)에서 코사인법칙을 쓰면 \(\overline{\mathrm{BD}}+\overline{\mathrm{CD}}\)를 구할 식이 선다.`
    },
    {
      id: "2022-09-13", exam: "2022-09", no: 13, score: 4,
      units: ["m1-seq"], memo: "절댓값이 같은 두 항이 있을 조건",
      body: R`첫째항이 \(-45\)이고 공차가 \(d\)인 등차수열 \(\{a_{n}\}\)이 다음 조건을
        만족시키도록 하는 모든 자연수 \(d\)의 값의 합은?`,
      note: [
        R`(가) \(\bigl|a_{m}\bigr|=\bigl|a_{m+3}\bigr|\)인 자연수 \(m\)이 존재한다.`,
        R`(나) 모든 자연수 \(n\)에 대하여 \(\displaystyle\sum_{k=1}^{n}a_{k}>-100\)이다.`
      ],
      choices: [R`\(44\)`, R`\(48\)`, R`\(52\)`, R`\(56\)`, R`\(60\)`],
      answer: 2,
      help: R`공차가 \(0\)이 아니므로 \(\bigl|a_{m}\bigr|=\bigl|a_{m+3}\bigr|\)는 \(a_{m}=-a_{m+3}\), 곧 \(2a_{m}+3d=0\)이라는 뜻이다. 여기에 \(a_{m}=-45+(m-1)d\)를 넣으면 \(d\)와 \(m\)의 관계식이 하나 나오고, 자연수라는 조건이 후보를 크게 줄인다.`
    },
    {
      id: "2022-09-14", exam: "2022-09", no: 14, score: 4,
      units: ["m2-diff"], memo: "같은 삼차함수를 두 방향으로 옮겨 이어 붙이기",
      body: R`최고차항의 계수가 \(1\)이고 \(f'(0)=f'(2)=0\)인
        삼차함수 \(f(x)\)와 양수 \(p\)에 대하여 함수 \(g(x)\)를
        \[g(x)=\begin{cases}f(x)-f(0) &amp; (x\le 0)\\ f(x+p)-f(p) &amp; (x>0)\end{cases}\]
        이라 하자. &lt;보기&gt;에서 옳은 것만을 있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(p=1\)일 때, \(g'(1)=0\)이다.`,
        R`ㄴ. \(g(x)\)가 실수 전체의 집합에서 미분가능하도록 하는 양수 \(p\)의 개수는 \(1\)이다.`,
        R`ㄷ. \(p\ge 2\)일 때, \(\displaystyle\int_{-1}^{1}g(x)\,dx\ge 0\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 5,
      help: R`\(f'(0)=f'(2)=0\)이고 최고차항이 \(1\)이므로 \(f'(x)=3x(x-2)\), 곧 \(f\)가 상수항만 빼고 정해진다. 그리고 \(g\)는 \(x\le 0\)에서는 \(f\)를 아래로 옮긴 것, \(x>0\)에서는 \(f\)를 왼쪽으로 \(p\)만큼 민 뒤 아래로 옮긴 것이라 \(g(0)=0\)에서 이어진다.`
    },
    {
      id: "2022-09-15", exam: "2022-09", no: 15, score: 4,
      units: ["m1-seq"], memo: "구간마다 기울기가 갈리는 점화식",
      body: R`수열 \(\{a_{n}\}\)은 \(\bigl|a_{1}\bigr|\le 1\)이고, 모든 자연수 \(n\)에 대하여
        \[a_{n+1}=\begin{cases}-2a_{n}-2 &amp; \left(-1\le a_{n}<-\dfrac{1}{2}\right)\\[6pt] 2a_{n} &amp; \left(-\dfrac{1}{2}\le a_{n}\le\dfrac{1}{2}\right)\\[6pt] -2a_{n}+2 &amp; \left(\dfrac{1}{2}<a_{n}\le 1\right)\end{cases}\]
        을 만족시킨다. \(a_{5}+a_{6}=0\)이고 \(\displaystyle\sum_{k=1}^{5}a_{k}>0\)이 되도록 하는
        모든 \(a_{1}\)의 값의 합은?`,
      choices: [R`\(\dfrac{9}{2}\)`, R`\(5\)`, R`\(\dfrac{11}{2}\)`, R`\(6\)`, R`\(\dfrac{13}{2}\)`],
      answer: 1,
      help: R`세 규칙 모두 기울기가 \(\pm 2\)인 일차식이고, 어느 쪽을 쓰든 \(\bigl|a_{n+1}\bigr|\le 1\)이 그대로 유지된다. \(a_{5}+a_{6}=0\)에서 거꾸로 거슬러 올라가되, 한 걸음마다 어느 구간에 있었는지에 따라 갈래가 둘씩 생긴다.`
    },
    {
      id: "2022-09-20", exam: "2022-09", no: 20, score: 4,
      units: ["m2-diff"], memo: "절댓값을 벗기면 두 갈래가 되는 방정식",
      body: R`함수 \(f(x)=\dfrac{1}{2}x^{3}-\dfrac{9}{2}x^{2}+10x\)에 대하여 \(x\)에 대한 방정식
        \[f(x)+\bigl|f(x)+x\bigr|=6x+k\]
        의 서로 다른 실근의 개수가 \(4\)가 되도록 하는 모든 정수 \(k\)의
        값의 합을 구하시오.`,
      short: true,
      answer: 21,
      help: R`절댓값을 벗기면 \(f(x)+x\ge 0\)일 때는 \(2f(x)+x=6x+k\), 곧 \(2f(x)=5x+k\)이고, \(f(x)+x<0\)일 때는 \(-x=6x+k\), 곧 \(x=-\frac{k}{7}\)로 값이 하나뿐이다. 두 경우를 갈라 각각 몇 개의 근이 나오는지 세면 된다.`
    },
    {
      id: "2022-09-21", exam: "2022-09", no: 21, score: 4,
      units: ["m1-explog"], memo: "직선 y=x-1에 대칭인 두 곡선",
      body: R`\(a>1\)인 실수 \(a\)에 대하여 직선 \(y=-x+4\)가 두 곡선
        \[y=a^{\,x-1},\qquad y=\log_{a}(x-1)\]
        과 만나는 점을 각각 \(\mathrm{A}\), \(\mathrm{B}\)라 하고, 곡선 \(y=a^{\,x-1}\)이 \(y\)축과
        만나는 점을 \(\mathrm{C}\)라 하자. \(\overline{\mathrm{AB}}=2\sqrt{2}\)일 때, 삼각형 \(\mathrm{ABC}\)의
        넓이는 \(S\)이다. \(50\times S\)의 값을 구하시오.`,
      figure: "2022-09-21.webp",
      short: true,
      answer: 192,
      help: R`두 곡선은 직선 \(y=x-1\)에 대하여 서로 대칭이다. \(y=a^{\,x-1}\) 위의 점 \(\bigl(p,\,a^{\,p-1}\bigr)\)을 그 직선에 대하여 대칭이동하면 \(\bigl(a^{\,p-1}+1,\,p-1\bigr)\)이 되는데, 이 점이 \(y=\log_{a}(x-1)\) 위에 있기 때문이다. 그리고 직선 \(y=-x+4\)는 \(y=x-1\)에 수직이므로 \(\mathrm{A}\)와 \(\mathrm{B}\)도 그 직선에 대하여 대칭이다.`
    },
    {
      id: "2022-09-22", exam: "2022-09", no: 22, score: 4,
      units: ["m2-diff"], memo: "절댓값이 꺾이는 자리에서만 끊기는 극한",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)에 대하여 함수
        \[g(x)=f(x-3)\times\lim_{h\to 0+}\frac{\bigl|f(x+h)\bigr|-\bigl|f(x-h)\bigr|}{h}\]
        가 다음 조건을 만족시킬 때, \(f(5)\)의 값을 구하시오.`,
      note: [
        R`(가) 함수 \(g(x)\)는 실수 전체의 집합에서 연속이다.`,
        R`(나) 방정식 \(g(x)=0\)은 서로 다른 네 실근 \(\alpha_{1}\), \(\alpha_{2}\), \(\alpha_{3}\), \(\alpha_{4}\)를 갖고 \(\alpha_{1}+\alpha_{2}+\alpha_{3}+\alpha_{4}=7\)이다.`
      ],
      short: true,
      answer: 108,
      help: R`극한 부분은 \(f(x)\ne 0\)인 자리에서는 \(2\bigl(|f|\bigr)'(x)\)와 같다. 그런데 \(f\)의 단순근에서는 좌우가 같은 크기로 올라와 차가 \(0\)이 되므로 값이 뚝 떨어진다. 곧 이 극한은 \(|f|\)가 꺾이는 자리마다 끊기고, (가)의 연속 조건이 \(f(x-3)\)의 근으로 그 끊김을 덮으라는 뜻이 된다.`
    },
    {
      id: "2022-06-9", exam: "2022-06", no: 9, score: 4,
      units: ["m1-seq"], memo: "네 걸음마다 되풀이되는 수열",
      body: R`수열 \(\{a_{n}\}\)이 모든 자연수 \(n\)에 대하여
        \[a_{n+1}=\begin{cases}\dfrac{1}{a_{n}} &amp; \left(n\text{이 홀수인 경우}\right)\\[8pt] 8a_{n} &amp; \left(n\text{이 짝수인 경우}\right)\end{cases}\]
        이고 \(a_{12}=\dfrac{1}{2}\)일 때, \(a_{1}+a_{4}\)의 값은?`,
      choices: [R`\(\dfrac{3}{4}\)`, R`\(\dfrac{9}{4}\)`, R`\(\dfrac{5}{2}\)`, R`\(\dfrac{17}{4}\)`, R`\(\dfrac{9}{2}\)`],
      answer: 5,
      help: R`네 걸음을 직접 밟아 보면 \(a_{5}=a_{1}\)이 되어 수열이 주기 \(4\)로 되풀이된다. 그러니 \(a_{12}\)는 \(a_{4}\)와 같고, \(a_{4}=\frac{a_{1}}{8}\)이다.`
    },
    {
      id: "2022-06-10", exam: "2022-06", no: 10, score: 4,
      units: ["m1-explog"], memo: "로그를 한쪽으로 모으기",
      body: R`\(n\ge 2\)인 자연수 \(n\)에 대하여 두 곡선
        \[y=\log_{n}x,\qquad y=-\log_{n}(x+3)+1\]
        이 만나는 점의 \(x\)좌표가 \(1\)보다 크고 \(2\)보다 작도록 하는
        모든 \(n\)의 값의 합은?`,
      choices: [R`\(30\)`, R`\(35\)`, R`\(40\)`, R`\(45\)`, R`\(50\)`],
      answer: 2,
      help: R`두 식을 같게 놓고 로그를 한쪽으로 모으면 \(\log_{n}\bigl(x(x+3)\bigr)=1\), 곧 \(x(x+3)=n\)이 된다. 그러니 \(1<x<2\)를 \(x(x+3)\)의 범위로 옮기기만 하면 \(n\)의 범위가 그대로 나온다.`
    },
    {
      id: "2022-06-11", exam: "2022-06", no: 11, score: 4,
      units: ["m2-integ"], memo: "주기가 2인 함수의 넓은 구간 적분",
      body: R`닫힌구간 \([0,\,1]\)에서 연속인 함수 \(f(x)\)가
        \[f(0)=0,\quad f(1)=1,\quad \int_{0}^{1}f(x)\,dx=\frac{1}{6}\]
        을 만족시킨다. 실수 전체의 집합에서 정의된 함수 \(g(x)\)가
        다음 조건을 만족시킬 때, \(\displaystyle\int_{-3}^{2}g(x)\,dx\)의 값은?`,
      note: [
        R`(가) \(g(x)=\begin{cases}-f(x+1)+1 &amp; (-1<x<0)\\ f(x) &amp; (0\le x\le 1)\end{cases}\)`,
        R`(나) 모든 실수 \(x\)에 대하여 \(g(x+2)=g(x)\)이다.`
      ],
      choices: [R`\(\dfrac{5}{2}\)`, R`\(\dfrac{17}{6}\)`, R`\(\dfrac{19}{6}\)`, R`\(\dfrac{7}{2}\)`, R`\(\dfrac{23}{6}\)`],
      answer: 2,
      help: R`(나)는 주기가 \(2\)라는 뜻이라 \(\int_{-3}^{2}\)를 길이 \(2\)짜리 구간 여럿과 나머지로 쪼갤 수 있다. 그리고 (가)의 \(-1<x<0\)쪽 식은 \(f\)를 뒤집어 옮긴 것이라, 그 구간의 적분이 \(\int_{0}^{1}f\)로 바뀐다.`
    },
    {
      id: "2022-06-12", exam: "2022-06", no: 12, score: 4,
      units: ["m1-trig"], memo: "같은 각이 만드는 닮은 삼각형 둘",
      body: R`그림과 같이 \(\overline{\mathrm{AB}}=4\), \(\overline{\mathrm{AC}}=5\)이고 \(\cos(\angle\mathrm{BAC})=\dfrac{1}{8}\)인
        삼각형 \(\mathrm{ABC}\)가 있다. 선분 \(\mathrm{AC}\) 위의 점 \(\mathrm{D}\)와 선분 \(\mathrm{BC}\) 위의
        점 \(\mathrm{E}\)에 대하여
        \[\angle\mathrm{BAC}=\angle\mathrm{BDA}=\angle\mathrm{BED}\]
        일 때, 선분 \(\mathrm{DE}\)의 길이는?`,
      figure: "2022-06-12.webp",
      choices: [R`\(\dfrac{7}{3}\)`, R`\(\dfrac{5}{2}\)`, R`\(\dfrac{8}{3}\)`, R`\(\dfrac{17}{6}\)`, R`\(3\)`],
      answer: 3,
      help: R`\(\angle\mathrm{BAC}=\angle\mathrm{BDA}\)이고 두 삼각형이 각 \(\mathrm{B}\)를 함께 쓰므로 삼각형 \(\mathrm{ABC}\)와 \(\mathrm{DBA}\)가 닮음이다. 같은 방식으로 \(\angle\mathrm{BAC}=\angle\mathrm{BED}\)에서 삼각형 \(\mathrm{ABC}\)와 \(\mathrm{EBD}\)도 닮음이다. 닮음비를 차례로 이어 붙이면 \(\overline{\mathrm{DE}}\)가 나온다.`
    },
    {
      id: "2022-06-13", exam: "2022-06", no: 13, score: 4,
      units: ["m1-seq"], memo: "제곱수에서만 값이 달라지는 합",
      body: R`실수 전체의 집합에서 정의된 함수 \(f(x)\)가 구간 \((0,\,1]\)에서
        \[f(x)=\begin{cases}3 &amp; (0<x<1)\\ 1 &amp; (x=1)\end{cases}\]
        이고, 모든 실수 \(x\)에 대하여 \(f(x+1)=f(x)\)를 만족시킨다.
        \(\displaystyle\sum_{k=1}^{20}\frac{k\times f\bigl(\sqrt{k}\,\bigr)}{3}\)의 값은?`,
      choices: [R`\(150\)`, R`\(160\)`, R`\(170\)`, R`\(180\)`, R`\(190\)`],
      answer: 5,
      help: R`\(f\)는 주기가 \(1\)이므로 \(f(\sqrt{k})\)는 \(\sqrt{k}\)가 정수일 때만 \(f(1)=1\)이고, 그 밖에는 모두 \(3\)이다. 곧 \(1\)부터 \(20\)까지 가운데 제곱수인 \(1,\,4,\,9,\,16\) 넷만 따로 세면 된다.`
    },
    {
      id: "2022-06-14", exam: "2022-06", no: 14, score: 4,
      units: ["m2-limit", "m2-diff"], memo: "절댓값을 x로 나눌 때 생기는 부호 뒤집힘",
      body: R`두 양수 \(p\), \(q\)와 함수 \(f(x)=x^{3}-3x^{2}-9x-12\)에 대하여
        실수 전체의 집합에서 연속인 함수 \(g(x)\)가 다음 조건을
        만족시킬 때, \(p+q\)의 값은?`,
      note: [
        R`(가) 모든 실수 \(x\)에 대하여 \(xg(x)=\bigl|xf(x-p)+qx\bigr|\)이다.`,
        R`(나) 함수 \(g(x)\)가 \(x=a\)에서 미분가능하지 않은 실수 \(a\)의 개수는 \(1\)이다.`
      ],
      choices: [R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`, R`\(10\)`],
      answer: 3,
      help: R`오른쪽을 \(\bigl|x\bigr|\times\bigl|f(x-p)+q\bigr|\)로 묶으면, \(x>0\)에서는 \(g(x)=\bigl|f(x-p)+q\bigr|\)이지만 \(x<0\)에서는 부호가 뒤집혀 \(g(x)=-\bigl|f(x-p)+q\bigr|\)가 된다. \(g\)가 \(x=0\)에서 연속이려면 좌우 극한이 같아야 하므로 그 자리의 값이 \(0\), 곧 \(f(-p)+q=0\)이어야 한다.`
    },
    {
      id: "2022-06-15", exam: "2022-06", no: 15, score: 4,
      units: ["m1-trig"], memo: "사인과 코사인의 근을 합쳐 양 끝 고르기",
      body: R`\(-1\le t\le 1\)인 실수 \(t\)에 대하여 \(x\)에 대한 방정식
        \[\left(\sin\frac{\pi x}{2}-t\right)\left(\cos\frac{\pi x}{2}-t\right)=0\]
        의 실근 중에서 집합 \(\{x\mid 0\le x<4\}\)에 속하는 가장 작은 값을
        \(\alpha(t)\), 가장 큰 값을 \(\beta(t)\)라 하자. &lt;보기&gt;에서 옳은 것만을
        있는 대로 고른 것은?`,
      noteTitle: "보 기",
      note: [
        R`ㄱ. \(-1\le t<0\)인 모든 실수 \(t\)에 대하여 \(\alpha(t)+\beta(t)=5\)이다.`,
        R`ㄴ. \(\bigl\{t\mid\beta(t)-\alpha(t)=\beta(0)-\alpha(0)\bigr\}=\left\{t\ \middle|\ 0\le t\le\dfrac{\sqrt{2}}{2}\right\}\)`,
        R`ㄷ. \(\alpha(t_{1})=\alpha(t_{2})\)인 두 실수 \(t_{1}\), \(t_{2}\)에 대하여 \(t_{2}-t_{1}=\dfrac{1}{2}\)이면 \(t_{1}\times t_{2}=\dfrac{1}{3}\)이다.`
      ],
      choices: [R`ㄱ`, R`ㄱ, ㄴ`, R`ㄱ, ㄷ`, R`ㄴ, ㄷ`, R`ㄱ, ㄴ, ㄷ`],
      answer: 2,
      help: R`곱이 \(0\)이니 방정식이 \(\sin\frac{\pi x}{2}=t\)와 \(\cos\frac{\pi x}{2}=t\) 둘로 갈린다. 두 곡선 모두 주기가 \(4\)라 \([0,\,4)\)에 근이 각각 둘씩 있고, \(\alpha(t)\)와 \(\beta(t)\)는 그 넷 가운데 가장 작은 것과 가장 큰 것이다.`
    },
    {
      id: "2022-06-20", exam: "2022-06", no: 20, score: 4,
      units: ["m2-integ", "m2-diff"], memo: "적분 밖으로 뺄 수 있는 것 가려내기",
      body: R`실수 \(a\)와 함수 \(f(x)=x^{3}-12x^{2}+45x+3\)에 대하여 함수
        \[g(x)=\int_{a}^{x}\bigl\{f(x)-f(t)\bigr\}\times\bigl\{f(t)\bigr\}^{4}\,dt\]
        가 오직 하나의 극값을 갖도록 하는 모든 \(a\)의 값의 합을
        구하시오.`,
      short: true,
      answer: 8,
      help: R`적분 안에서 \(f(x)\)는 \(t\)에 대하여 상수이므로 밖으로 뺄 수 있다. 그러면 \(g(x)=f(x)\int_{a}^{x}\{f(t)\}^{4}dt-\int_{a}^{x}f(t)\{f(t)\}^{4}dt\)가 되고, 미분하면 뒷항이 앞항의 일부와 지워져 \(g'(x)=f'(x)\int_{a}^{x}\{f(t)\}^{4}dt\)만 남는다.`
    },
    {
      id: "2022-06-21", exam: "2022-06", no: 21, score: 4,
      units: ["m1-explog"], memo: "거듭제곱 방정식의 실근 개수와 중근",
      body: R`다음 조건을 만족시키는 최고차항의 계수가 \(1\)인 이차함수
        \(f(x)\)가 존재하도록 하는 모든 자연수 \(n\)의 값의 합을 구하시오.`,
      note: [
        R`(가) \(x\)에 대한 방정식 \(\bigl(x^{n}-64\bigr)f(x)=0\)은 서로 다른 두 실근을 갖고, 각각의 실근은 중근이다.`,
        R`(나) 함수 \(f(x)\)의 최솟값은 음의 정수이다.`
      ],
      short: true,
      answer: 24,
      help: R`\(x^{n}=64\)의 실근은 \(n\)이 홀수면 \(64^{1/n}\) 하나뿐이고, 짝수면 \(\pm 64^{1/n}\) 둘이다. 전체 방정식이 "서로 다른 두 실근이고 각각 중근"이 되려면 \(f\)의 근이 그 근들과 어떻게 겹쳐야 하는지를 경우마다 따져야 한다.`
    },
    {
      id: "2022-06-22", exam: "2022-06", no: 22, score: 4,
      units: ["m2-diff"], memo: "합성한 방정식의 근을 원래 근으로 되돌리기",
      body: R`삼차함수 \(f(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 방정식 \(f(x)=0\)의 서로 다른 실근의 개수는 \(2\)이다.`,
        R`(나) 방정식 \(f\bigl(x-f(x)\bigr)=0\)의 서로 다른 실근의 개수는 \(3\)이다.`
      ],
      bodyAfter: R`\(f(1)=4\), \(f'(1)=1\), \(f'(0)>1\)일 때, \(f(0)=\dfrac{q}{p}\)이다. \(p+q\)의
        값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 61,
      help: R`(나)의 \(f\bigl(x-f(x)\bigr)=0\)은 \(x-f(x)\)가 \(f\)의 근이라는 뜻이다. (가)에서 \(f\)의 근은 둘뿐이니 그 값을 \(\alpha\), \(\beta\)라 하면, \(x-f(x)=\alpha\)와 \(x-f(x)=\beta\) 두 방정식의 근을 합쳐 셋이어야 한다.`
    },

    // ── 확률과 통계 ──,

    // ==========================================
    // 확률과 통계 (51문항)
    // ==========================================,
    {
      id: "2027-09-prob-28", exam: "2027-09", no: 28, score: 4,
      units: ["prob-prob"], memo: "카드의 위치 교환과 조건부확률",
      body: R`그림과 같이 문자 \(\mathrm{A}\)가 적힌 \(3\)장의 카드와 문자 \(\mathrm{B}\)가 적힌 \(3\)장의 카드가 \(1\)번째 자리에서부터 차례로 \(\mathrm{A}\), \(\mathrm{A}\), \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{B}\), \(\mathrm{B}\)가 보이도록 놓여 있다.
이 \(6\)장의 카드와 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(k\)일 때,
\(k\le 5\)이면 \(k\)번째 자리에 놓여 있는 카드와 \((k+1)\)번째 자리에 놓여 있는 카드를 서로 바꾸어 놓고,
\(k=6\)이면 놓여 있는 \(6\)장의 카드를 그대로 둔다.
이 시행을 \(4\)번 반복한 후 \(6\)장의 카드가 \(1\)번째 자리에서부터 차례로 \(\mathrm{A}\), \(\mathrm{A}\), \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{B}\), \(\mathrm{B}\)가 보이도록 놓여 있을 때, \(3\)번째 시행에서 나온 눈의 수가 \(6\)일 확률은?`,
      figure: "2027-09-prob-28.webp",
      choices: [R`\(\dfrac{71}{373}\)`, R`\(\dfrac{69}{373}\)`, R`\(\dfrac{73}{371}\)`, R`\(\dfrac{71}{371}\)`, R`\(\dfrac{69}{371}\)`],
      answer: 5,
      help: R`초기 상태 AAABBB가 유지되려면 3번과 4번 카드의 교환(눈 3)이 짝수 번(0번 또는 2번 또는 4번) 일어나야 한다. A끼리의 교환(눈 1, 2)과 B끼리의 교환(눈 4, 5) 및 제자리(눈 6)의 효과를 상태 전이로 분석하여 4회 후 복원되는 전체 경우의 수와 3회째에 6이 나오는 경우의 수를 구한다.`
    },
    {
      id: "2027-09-prob-29", exam: "2027-09", no: 29, score: 4,
      units: ["prob-count"], memo: "부등식 조건을 만족시키는 자연수 순서쌍 (중복조합)",
      body: R`다음 조건을 만족시키는 자연수 \(a\), \(b\), \(c\), \(d\)의 모든 순서쌍 \((a, b, c, d)\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(a+b+c+d=14\)`,
        R`(나) \(10a\ge d\)이고 \(c &lt; d^2\)이다.`
      ],
      short: true,
      answer: 190,
      help: R`자연수 조건 \(a+b+c+d=14\)의 전체 해의 개수는 \({}_{4}\mathrm{H}_{10}=286\)이다. 조건 (나)의 여사건인 \(10a &lt; d\) (즉 \(a=1, d\ge 11\)) 또는 \(c\ge d^2\) (즉 \(d=1, 2, 3\))에 해당하는 경우의 수를 구하여 전체에서 빼면 빠르고 정확하다.`
    },
    {
      id: "2027-09-prob-30", exam: "2027-09", no: 30, score: 4,
      units: ["prob-stat"], memo: "표본평균과 합의 제곱의 기댓값",
      body: R`숫자 \(0\), \(1\), \(2\)가 각각 하나씩 적혀 있는 세 개의 공이 들어 있는 주머니가 있다. 이 주머니에서 임의로 한 개의 공을 꺼내어 공에 적혀 있는 수를 확인한 후 다시 넣는 시행을 한다. 이 시행을 \(5\)번 반복하여 확인한 \(5\)개의 수의 평균을 \(\overline{X}\)라 할 때,
\[\sum_{k=1}^{10} \left(k^2\times \mathrm{P}\left(\overline{X}=\dfrac{k}{5}\right)\right)=a\]
이다. \(6\times a\)의 값을 구하시오.`,
      short: true,
      answer: 170,
      help: R`꺼낸 5개 수의 합을 \(S = 5\overline{X}\)라 두면 주어진 합은 \(\sum_{k=1}^{10} k^2 \mathrm{P}(S=k) = \mathrm{E}(S^2)\)이다. 모분포 \(X\)에서 \(\mathrm{E}(X)=1\), \(\mathrm{V}(X)=\dfrac{2}{3}\)이므로 \(\mathrm{E}(S)=5\), \(\mathrm{V}(S)=5\times\dfrac{2}{3}=\dfrac{10}{3}\)이고 \(\mathrm{E}(S^2)=\mathrm{V}(S)+\{\mathrm{E}(S)\}^2=\dfrac{85}{3}\)에서 \(6a=170\)이 나온다.`
    },
    {
      id: "2027-06-prob-28", exam: "2027-06", no: 28, score: 4,
      units: ["prob-prob"], memo: "카드 뒤집기 시행과 독립시행 확률",
      body: R`앞면에는 문자 \(\mathrm{A}\), 뒷면에는 문자 \(\mathrm{B}\)가 적혀 있는 \(6\)장의 카드가 있다. 이 \(6\)장의 카드가 \(1\)번째 자리에서부터 차례로 모두 앞면이 보이도록 놓여 있다. 이 \(6\)장의 카드와 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(k\)일 때,
\(k\)가 홀수이면 \(k\) 이하의 수가 적힌 카드를 모두 한 번씩 뒤집고,
\(k\)가 짝수이면 \(k\) 이상의 수가 적힌 카드를 모두 한 번씩 뒤집는다.
이 시행을 \(4\)번 반복한 후 \(6\)장의 카드가 모두 앞면이 보이도록 놓여 있을 확률은?`,
      choices: [R`\(\dfrac{19}{162}\)`, R`\(\dfrac{13}{108}\)`, R`\(\dfrac{10}{81}\)`, R`\(\dfrac{41}{324}\)`, R`\(\dfrac{7}{54}\)`],
      answer: 3,
      help: R`각 위치의 카드가 최종적으로 앞면을 유지하려면 뒤집힌 횟수가 짝수여야 한다. 인접 카드 간의 상태 차이를 관찰하면 눈 1과 2의 출현 횟수 합, 눈 3과 4의 출현 횟수 합, 눈 5와 6의 출현 횟수 합이 각각 짝수여야 함을 알 수 있어 분류가 단순해진다.`
    },
    {
      id: "2027-06-prob-29", exam: "2027-06", no: 29, score: 4,
      units: ["prob-prob"], memo: "홀수 눈의 합 조건부확률",
      body: R`서로 다른 다섯 개의 주사위를 동시에 던져 나온 다섯 개의 눈의 수의 곱이 홀수일 때, 이 다섯 개의 눈의 수의 합이 \(15\)일 확률은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 98,
      help: R`모든 주사위의 눈이 홀수여야 하므로 각 주사위는 \(\{1, 3, 5\}\)의 3가지 값을 갖는다(전체 \(3^5=243\)). 각 눈을 \(2a_i+1\) (\(a_i\in\{0, 1, 2\}\))로 두면 \(a_1+\dots+a_5=5\)의 해의 개수를 구하는 중복조합 및 포함배제 문제로 귀결되어 51가지, 확률은 \(\dfrac{51}{243}=\dfrac{17}{81}\)이다.`
    },
    {
      id: "2027-06-prob-30", exam: "2027-06", no: 30, score: 4,
      units: ["prob-count"], memo: "세 가지 색 공의 이웃하지 않는 나열",
      body: R`노란색 공 \(4\)개, 보라색 공 \(4\)개, 검은색 공 \(4\)개가 있다. 이 \(12\)개의 공을 모두 일렬로 나열할 때, 노란색 공이 보라색 공과 이웃하지 않게 나열하는 경우의 수를 구하시오. (단, 같은 색 공끼리는 서로 구별하지 않는다.)`,
      short: true,
      answer: 780,
      help: R`노란색 공 4개와 보라색 공 4개가 이웃하지 않으려면 둘의 경계마다 검은색 공이 적어도 1개씩 끼어들어야 한다. 노란색과 보라색이 번갈아 나오는 블록의 개수(2개부터 8개까지)에 따라 필요한 검은 공의 최소 개수를 정하고 남은 검은 공을 분배하는 칸막이 방법으로 셈한다.`
    },
    {
      id: "2026-suneung-prob-28", exam: "2026-suneung", no: 28, score: 4,
      units: ["prob-prob"], memo: "규칙에 따른 공 분배와 조건부확률",
      body: R`\(16\)개의 공과 \(1\)부터 \(6\)까지의 자연수가 하나씩 적혀 있는 여섯 개의 빈 상자가 있다. 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(k\)일 때,
\(k\)가 홀수이면 \(1\), \(3\), \(5\)가 적힌 상자에 공을 각각 \(1\)개씩 넣고,
\(k\)가 짝수이면 \(k\)의 약수가 적힌 상자에 공을 각각 \(1\)개씩 넣는다.
이 시행을 \(4\)번 반복한 후 여섯 개의 상자에 들어 있는 모든 공의 개수의 합이 홀수일 때, \(3\)이 적힌 상자에 들어 있는 공의 개수가 \(2\)가 적힌 상자에 들어 있는 공의 개수보다 \(1\)개 더 많을 확률은?`,
      choices: [R`\(\dfrac{1}{8}\)`, R`\(\dfrac{3}{16}\)`, R`\(\dfrac{1}{4}\)`, R`\(\dfrac{5}{16}\)`, R`\(\dfrac{3}{8}\)`],
      answer: 2,
      help: R`한 번 시행 시 넣는 공의 개수는 홀수 눈이면 3개(홀수), 눈 2는 2개(짝수), 눈 4는 3개(홀수), 눈 6은 4개(짝수)이다. 4회 시행 후 총 공 개수가 홀수이려면 1회당 추가 개수가 홀수인 사건(홀수 눈 또는 4)이 홀수 번(1번 또는 3번) 일어나야 한다. 조건부확률의 분모와 분자를 체계적으로 카운팅한다.`
    },
    {
      id: "2026-suneung-prob-29", exam: "2026-suneung", no: 29, score: 4,
      units: ["prob-stat"], memo: "이항분포의 정규근사와 표준정규분포표",
      body: R`\(6\) 이하의 자연수 \(a\)에 대하여 한 개의 주사위와 한 개의 동전을 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(a\)보다 작거나 같으면 동전을 \(5\)번 던져 앞면이 나온 횟수를 기록하고, 나온 눈의 수가 \(a\)보다 크면 동전을 \(3\)번 던져 앞면이 나온 횟수를 기록한다.
이 시행을 \(19200\)번 반복하여 기록한 수가 \(3\)인 횟수를 확률변수 \(X\)라 하자.
\(\mathrm{E}(X)=4800\)일 때, \(\mathrm{P}(X\le 4800+30a)\)의 값을 오른쪽 표준정규분포표를 이용하여 구한 값이 \(k\)이다. \(1000\times k\)의 값을 구하시오.`,
      figure: "2026-suneung-prob-29.webp",
      short: true,
      answer: 977,
      help: R`1회 시행에서 3이 기록될 확률은 \(p = \dfrac{a}{6}\cdot{}_{5}\mathrm{C}_{3}\left(\dfrac{1}{2}\right)^5 + \dfrac{6-a}{6}\cdot{}_{3}\mathrm{C}_{3}\left(\dfrac{1}{2}\right)^3 = \dfrac{a+6}{48}\)이다. \(\mathrm{E}(X)=19200p=4800\)에서 \(p=\dfrac{1}{4}\implies a=6\)이 되어 \(X\sim\mathrm{B}\left(19200, \dfrac{1}{4}\right)\)이다. \(\sigma=\sqrt{19200\times\frac{1}{4}\times\frac{3}{4}}=60\)이므로 \(\mathrm{P}(X\le 4980)=\mathrm{P}(Z\le 3.0)=0.5+0.499=0.999\) 등 주어진 표준화 수치를 적용하여 정답을 낸다.`
    },
    {
      id: "2026-suneung-prob-30", exam: "2026-suneung", no: 30, score: 4,
      units: ["prob-count"], memo: "주머니 공 분배와 이웃 조건 (중복조합)",
      body: R`비어 있는 주머니 \(10\)개가 일렬로 놓여 있고, 공 \(8\)개가 있다. 각 주머니에 들어 있는 공의 개수가 \(2\) 이하가 되도록 공을 주머니에 남김없이 나누어 넣을 때, 다음 조건을 만족시키는 경우의 수를 구하시오. (단, 공끼리는 서로 구별하지 않는다.)`,
      noteTitle: "조 건",
      note: [
        R`(가) 들어 있는 공의 개수가 \(1\)인 주머니는 \(4\)개 또는 \(6\)개이다.`,
        R`(나) 들어 있는 공의 개수가 \(2\)인 주머니와 이웃한 주머니에는 공이 들어 있지 않다.`
      ],
      short: true,
      answer: 262,
      help: R`공이 1개인 주머니가 4개이면 2개인 주머니는 2개, 빈 주머니 4개이고, 공이 1개인 주머니가 6개이면 2개인 주머니는 1개, 빈 주머니 3개이다. 조건 (나)에 의해 2개짜리 주머니의 양옆에는 반드시 빈 주머니가 붙어야 하므로 [빈-2-빈] 블록을 하나로 묶어 배치하는 전략으로 경우의 수를 센다.`
    },
    {
      id: "2026-09-prob-28", exam: "2026-09", no: 28, score: 4,
      units: ["prob-count"], memo: "색깔 카드의 분배와 여사건 (중복조합)",
      body: R`빨간색 카드 \(1\)장, 파란색 카드 \(1\)장, 노란색 카드 \(3\)장, 보라색 카드 \(3\)장이 있다. 이 \(8\)장의 카드를 세 학생 \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{C}\)에게 다음 규칙에 따라 남김없이 나누어 주는 경우의 수는? (단, 같은 색 카드끼리는 서로 구별하지 않는다.)`,
      noteTitle: "규 칙",
      note: [
        R`(가) 두 학생 \(\mathrm{A}\), \(\mathrm{B}\)는 각각 \(1\)장 이상의 카드를 받고, 학생 \(\mathrm{C}\)는 카드를 받지 못할 수 있다.`,
        R`(나) 학생 \(\mathrm{A}\)가 받는 카드의 색의 가짓수는 \(3\) 이하이다.`
      ],
      choices: [R`\(730\)`, R`\(746\)`, R`\(762\)`, R`\(778\)`, R`\(794\)`],
      answer: 2,
      help: R`전체 분배 경우의 수는 \(3\times 3\times {}_{3}\mathrm{H}_{3}\times {}_{3}\mathrm{H}_{3} = 900\)이다. 조건 (가)에서 B가 못 받는 경우, (나)에서 A가 4가지 색 모두를 받는 경우를 구하고, 포함배제의 원리를 적용하여 전체에서 부적격 경우의 수를 차감한다.`
    },
    {
      id: "2026-09-prob-29", exam: "2026-09", no: 29, score: 4,
      units: ["prob-stat"], memo: "부분집합 교집합 확률과 이항분포 정규근사",
      body: R`두 집합 \(A=\{2, 3, 4\}\), \(B=\{2, 3\}\)에 대하여 다음 시행을 한다.
집합 \(A\)의 모든 부분집합 \(8\)개 중에서 임의로 한 개를 선택하고,
집합 \(B\)의 모든 부분집합 \(4\)개 중에서 임의로 한 개를 선택한다.
선택한 두 집합의 교집합의 원소의 개수를 기록한다.
이 시행을 \(15360\)번 반복하여 기록한 수가 \(1\)인 횟수가 \(5880\) 이상일 확률을 오른쪽 표준정규분포표를 이용하여 구한 값이 \(k\)일 때, \(1000\times k\)의 값을 구하시오.`,
      figure: "2026-09-prob-29.webp",
      short: true,
      answer: 23,
      help: R`교집합의 원소가 될 수 있는 것은 \(2\)와 \(3\)뿐이다. 교집합의 원소 개수가 1일 확률은 원소 2만 포함되거나 3만 포함될 확률이므로 \(p = 2\times \left(\dfrac{1}{2}\times\dfrac{1}{2}\times\dfrac{3}{4}\right) = \dfrac{3}{8}\)이다. \(\mathrm{E}(X)=15360\times\dfrac{3}{8}=5760\), \(\mathrm{V}(X)=3600\)이므로 \(\mathrm{P}(X\ge 5880)=\mathrm{P}(Z\ge 2.0)=0.5-0.477=0.023\)이 되어 답은 23이다.`
    },
    {
      id: "2026-09-prob-30", exam: "2026-09", no: 30, score: 4,
      units: ["prob-prob"], memo: "게임 규칙에 따른 조건부확률과 확률의 상등",
      body: R`학생 \(\mathrm{A}\)는 숫자 \(1\), \(8\)이 각각 하나씩 적혀 있는 \(2\)장의 카드 중 임의로 한 장의 카드를 선택하여 선택한 카드에 적힌 수가 \(8\)일 때만 선택한 카드를 바닥에 내려놓고, 학생 \(\mathrm{B}\)는 숫자 \(2\), \(3\), \(4\), \(5\), \(6\), \(7\)이 각각 하나씩 적혀 있는 \(6\)장의 카드 중 임의로 한 장의 카드를 선택하여 선택한 카드에 적힌 수가 자연수 \(n\)보다 작거나 같을 때만 선택한 카드를 바닥에 내려놓는다.
다음 규칙에 따라 학생 \(\mathrm{A}\)가 귤을 받을 확률을 \(p\), 학생 \(\mathrm{B}\)가 귤을 받을 확률을 \(q\)라 하자.
∙ 카드를 내려놓은 학생이 \(2\)명이면 더 큰 수가 적힌 카드를 내려놓은 학생만 귤을 받는다.
∙ 카드를 내려놓은 학생이 \(1\)명이면 카드를 내려놓지 않은 학생만 귤을 받는다.
∙ 카드를 내려놓은 학생이 없으면 어느 학생도 귤을 받지 못한다.
\(p=q\)일 때, \(24(n+p)\)의 값을 구하시오. (단, \(n\)은 \(7\) 이하의 자연수이다.)`,
      short: true,
      answer: 80,
      help: R`A가 카드를 내려놓을 확률은 \(\dfrac{1}{2}\)(카드 8 선택), B가 카드를 내려놓을 확률은 \(\dfrac{n-1}{6}\)이다. 규칙에 따라 A가 귤을 받는 확률 \(p\)와 B가 귤을 받는 확률 \(q\)를 \(n\)에 대한 식으로 나타내어 \(p=q\)를 풀면 \(n=3, p=\dfrac{1}{3}\)이 도출되고 \(24(3 + 1/3) = 80\)을 얻는다.`
    },
    {
      id: "2026-06-prob-28", exam: "2026-06", no: 28, score: 4,
      units: ["prob-count"], memo: "합성함수 조건과 치역을 만족시키는 함수의 개수",
      body: R`집합 \(X=\{1, 2, 3, 4, 5, 6, 7\}\)과 \(X\)의 부분집합 \(Y=\{2, 4, 6\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수는?`,
      noteTitle: "조 건",
      note: [
        R`(가) 함수 \(f\)의 치역을 \(Z\)라 할 때, \(Z\cap Y = Y\)이다.`,
        R`(나) 집합 \(Y\)의 모든 원소 \(x\)에 대하여 \(f(f(x))=x\)이다.`
      ],
      choices: [R`\(1560\)`, R`\(1620\)`, R`\(1680\)`, R`\(1740\)`, R`\(1800\)`],
      answer: 5,
      help: R`조건 (나)에서 \(Y=\{2, 4, 6\}\) 위에서의 \(f\)는 항등함수이거나 1개의 호환(두 원소 교환)과 1개의 고정점을 갖는다. 치역이 \(Y\)의 모든 원소를 포함해야 하므로, 정의역의 남은 원소 \(\{1, 3, 5, 7\}\)의 함숫값 분배를 포함배제 원리로 계산하여 합산한다.`
    },
    {
      id: "2026-06-prob-29", exam: "2026-06", no: 29, score: 4,
      units: ["prob-stat"], memo: "두 정규분포의 대칭성과 표준화",
      body: R`두 정규분포 \(\mathrm{N}(m_1, \sigma_1^2)\), \(\mathrm{N}(m_2, \sigma_2^2)\)를 따르는 확률변수 \(X, Y\)가 다음 조건을 만족시킨다.
(가) 모든 실수 \(x\)에 대하여 \(\mathrm{P}(X\le x) = \mathrm{P}(Y\ge 24-x)\)이다.
(나) \(\mathrm{P}(X\le 11) + \mathrm{P}(Y\le 11) = 1\)
\(\sigma_1 = 2\sigma_2\)일 때, \(m_1 + \sigma_1\)의 값을 구하시오. (단, \(\sigma_1, \sigma_2\)는 양수이다.)`,
      short: true,
      answer: 44,
      help: R`조건 (가)에서 대칭축 관계 \(m_1 + m_2 = 24\)와 \(\sigma_1 = \sigma_2\) 대신 주어진 \(\sigma_1 = 2\sigma_2\) 조건을 결합한다. 조건 (나)를 표준화하여 \(z\)값들의 관계식을 세우면 \(m_1 = 36, \sigma_1 = 8\)이 도출되어 \(m_1 + \sigma_1 = 44\)이다.`
    },
    {
      id: "2026-06-prob-30", exam: "2026-06", no: 30, score: 4,
      units: ["prob-prob"], memo: "주머니 공 꺼내기와 독립시행 조건부확률",
      body: R`주머니에 \(1\)부터 \(5\)까지의 자연수가 하나씩 적혀 있는 \(5\)개의 공이 들어 있다. 이 주머니에서 임의로 한 개의 공을 꺼내어 공에 적혀 있는 수를 확인한 후 다시 넣는 시행을 한다. 이 시행을 \(4\)번 반복하여 확인한 \(4\)개의 수 중 최댓값을 \(M\), 최솟값을 \(m\)이라 하자.
\(M-m=3\)일 때, 확인한 네 수의 합이 짝수일 확률은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 115,
      help: R`\(M-m=3\)인 범위는 \(\{1, 2, 3, 4\}\) 또는 \(\{2, 3, 4, 5\}\)이다. 각 범위에서 최댓값과 최솟값을 반드시 포함하는 총 경우의 수를 포함배제(전체 \(4^4 - 2\cdot 3^4 + 2^4\))로 구하고, 네 수의 합이 짝수가 되는 조합(홀수가 0개, 2개, 4개)을 나누어 계산한다.`
    },
    {
      id: "2025-suneung-prob-28", exam: "2025-suneung", no: 28, score: 4,
      units: ["prob-count"], memo: "부등식과 약수 조건을 만족시키는 함수의 개수 (중복조합)",
      body: R`집합 \(X=\{1, 2, 3, 4, 5, 6\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수는?`,
      noteTitle: "조 건",
      note: [
        R`(가) \(f(1)\times f(6)\)의 값이 \(6\)의 약수이다.`,
        R`(나) \(2f(1)\le f(2)\le f(3)\le f(4)\le f(5)\le 2f(6)\)`
      ],
      choices: [R`\(166\)`, R`\(171\)`, R`\(176\)`, R`\(181\)`, R`\(186\)`],
      answer: 2,
      help: R`\(f(1)f(6)\)이 6의 약수이므로 순서쌍 \((f(1), f(6))\)은 \((1, 1), (1, 2), (1, 3), (1, 6), (2, 3), (3, 2)\) 등이 가능하다. 조건 (나)가 성립하려면 \(2f(1)\le 2f(6)\), 즉 \(f(1)\le f(6)\)이어야 하므로 가능한 쌍을 분류하고 각 경우 \(f(2), \dots, f(5)\)의 개수를 중복조합 \({}_{n}\mathrm{H}_{4}\)로 계산한다.`
    },
    {
      id: "2025-suneung-prob-29", exam: "2025-suneung", no: 29, score: 4,
      units: ["prob-stat"], memo: "정규분포의 대칭성과 평행이동",
      body: R`정규분포 \(\mathrm{N}(m_1, \sigma_1^2)\)을 따르는 확률변수 \(X\)와 정규분포 \(\mathrm{N}(m_2, \sigma_2^2)\)를 따르는 확률변수 \(Y\)가 다음 조건을 만족시킨다.
모든 실수 \(x\)에 대하여 \(\mathrm{P}(X\le x)=\mathrm{P}(X\ge 40-x)\)이고 \(\mathrm{P}(Y\le x)=\mathrm{P}(X\le x+10)\)이다.
\(\mathrm{P}(15\le X\le 20) + \mathrm{P}(15\le Y\le 20)\)의 값을 오른쪽 표준정규분포표를 이용하여 구한 것이 \(0.4772\)일 때, \(m_1 + \sigma_2\)의 값을 구하시오. (단, \(\sigma_1\)과 \(\sigma_2\)는 양수이다.)`,
      figure: "2025-suneung-prob-29.webp",
      short: true,
      answer: 25,
      help: R`\(\mathrm{P}(X\le x)=\mathrm{P}(X\ge 40-x)\)에서 \(X\)의 평균은 \(m_1 = 20\)이다. \(\mathrm{P}(Y\le x)=\mathrm{P}(X\le x+10)\)에서 \(Y = X - 10\) 분포이므로 \(m_2 = 10\), \(\sigma_2 = \sigma_1\)이다. 주어진 확률 합 \(0.4772\)가 \(\mathrm{P}(0\le Z\le 2.0)\)와 일치함을 이용하여 표준편차 \(\sigma_2=5\)를 구한다.`
    },
    {
      id: "2025-suneung-prob-30", exam: "2025-suneung", no: 30, score: 4,
      units: ["prob-prob"], memo: "동전 뒤집기 시행과 조건부확률",
      body: R`탁자 위에 \(5\)개의 동전이 일렬로 놓여 있다. 이 \(5\)개의 동전 중 \(1\)번째 자리와 \(2\)번째 자리의 동전은 앞면이 보이도록 놓여 있고, 나머지 자리의 \(3\)개의 동전은 뒷면이 보이도록 놓여 있다. 이 \(5\)개의 동전과 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(k\)일 때,
\(k\le 5\)이면 \(k\)번째 자리의 동전을 한 번 뒤집어 제자리에 놓고,
\(k=6\)이면 모든 동전을 한 번씩 뒤집어 제자리에 놓는다.
위의 시행을 \(3\)번 반복한 후 이 \(5\)개의 동전이 모두 앞면이 보이도록 놓여 있을 확률은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 19,
      help: R`초기 상태는 (앞, 앞, 뒤, 뒤, 뒤)이다. 3회 시행 후 모두 앞면이 되려면 각 자리의 반전 횟수의 홀짝이 결정된다. 눈 6(전체 뒤집기)이 나온 횟수(0, 1, 2, 3회)에 따라 각 위치의 동전이 개별적으로 몇 번 뒤집혀야 하는지 경우를 나누어 확률을 계산하면 \(\dfrac{3}{16}\)이 나온다.`
    },
    {
      id: "2025-09-prob-28", exam: "2025-09", no: 28, score: 4,
      units: ["prob-prob"], memo: "약수 관계를 보존하는 함수의 조건부확률",
      body: R`집합 \(X=\{1, 2, 3, 4\}\)에 대하여 \(f\colon X\to X\)인 모든 함수 \(f\) 중에서 임의로 하나를 선택하는 시행을 한다. 이 시행에서 선택한 함수 \(f\)가 다음 조건을 만족시킬 때, \(f(4)\)가 짝수일 확률은?`,
      noteTitle: "조 건",
      note: [
        R`\(a\in X\), \(b\in X\)에 대하여 \(a\)가 \(b\)의 약수이면 \(f(a)\)는 \(f(b)\)의 약수이다.`
      ],
      choices: [R`\(\dfrac{9}{19}\)`, R`\(\dfrac{8}{15}\)`, R`\(\dfrac{3}{5}\)`, R`\(\dfrac{27}{40}\)`, R`\(\dfrac{19}{25}\)`],
      answer: 4,
      help: R`1은 모든 수의 약수이므로 \(f(1)\)은 \(f(2), f(3), f(4)\)의 공약수이다. 또한 2는 4의 약수이므로 \(f(2)\)는 \(f(4)\)의 약수이다. \(f(1)=1\)인 경우와 \(f(1)\ge 2\)인 경우로 나누어 조건을 만족하는 전체 함수 개수(40개)와 그중 \(f(4)\in\{2, 4\}\)인 개수(27개)를 구한다.`
    },
    {
      id: "2025-09-prob-29", exam: "2025-09", no: 29, score: 4,
      units: ["prob-stat"], memo: "수직선 위 점의 이동과 정규분포 근사",
      body: R`수직선의 원점에 점 \(\mathrm{A}\)가 있다. 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(4\) 이하이면 점 \(\mathrm{A}\)를 양의 방향으로 \(1\)만큼 이동시키고, \(5\) 이상이면 점 \(\mathrm{A}\)를 음의 방향으로 \(1\)만큼 이동시킨다.
이 시행을 \(16200\)번 반복하여 이동된 점 \(\mathrm{A}\)의 위치가 \(5700\) 이하일 확률을 오른쪽 표준정규분포표를 이용하여 구한 값을 \(k\)라 하자. \(1000\times k\)의 값을 구하시오.`,
      figure: "2025-09-prob-29.webp",
      short: true,
      answer: 994,
      help: R`1회 시행 시 양의 방향 확률은 \(p=\dfrac{2}{3}\), 음의 방향 확률은 \(\dfrac{1}{3}\)이다. 4 이하가 나온 횟수를 \(Y\sim\mathrm{B}\left(16200, \dfrac{2}{3}\right)\)라 하면 점 \(\mathrm{A}\)의 위치는 \(X = Y - (16200-Y) = 2Y - 16200\)이다. \(X\le 5700 \iff Y\le 10950\)으로 변환 후 표준화하여 \(\mathrm{P}(Z\le 2.5) = 0.5 + 0.494 = 0.994\)를 얻는다.`
    },
    {
      id: "2025-09-prob-30", exam: "2025-09", no: 30, score: 4,
      units: ["prob-count"], memo: "두 가지 색 공의 분배 (중복조합)",
      body: R`흰 공 \(4\)개와 검은 공 \(4\)개를 세 명의 학생 \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{C}\)에게 다음 규칙에 따라 남김없이 나누어 주는 경우의 수를 구하시오. (단, 같은 색 공끼리는 서로 구별하지 않고, 공을 받지 못하는 학생이 있을 수 있다.)`,
      noteTitle: "규 칙",
      note: [
        R`(가) 학생 \(\mathrm{A}\)가 받는 공의 개수는 \(0\) 이상 \(2\) 이하이다.`,
        R`(나) 학생 \(\mathrm{B}\)가 받는 공의 개수는 \(2\) 이상이다.`
      ],
      short: true,
      answer: 93,
      help: R`A가 받는 공의 총 개수가 0개, 1개, 2개인 세 가지 경우로 분류한다. A에게 흰 공과 검은 공을 배분한 후, 남은 흰 공과 검은 공을 B와 C에게 나누어 줄 때 B가 받는 총 공의 개수가 2개 이상이 되도록 여사건(B가 0개 또는 1개 받는 경우)을 제외하여 센다.`
    },
    {
      id: "2025-06-prob-28", exam: "2025-06", no: 28, score: 4,
      units: ["prob-prob"], memo: "동전 뒤집기 반복 시행과 조건부확률",
      body: R`탁자 위에 놓인 \(4\)개의 동전에 대하여 다음 시행을 한다.
\(4\)개의 동전 중 임의로 한 개의 동전을 택하여 한 번 뒤집는다.
처음에 \(3\)개의 동전은 앞면이 보이도록, \(1\)개의 동전은 뒷면이 보이도록 놓여 있다. 위의 시행을 \(5\)번 반복한 후 \(4\)개의 동전이 모두 같은 면이 보이도록 놓여 있을 때, 모두 앞면이 보이도록 놓여 있을 확률은?`,
      choices: [R`\(\dfrac{17}{32}\)`, R`\(\dfrac{35}{64}\)`, R`\(\dfrac{9}{16}\)`, R`\(\dfrac{37}{64}\)`, R`\(\dfrac{19}{32}\)`],
      answer: 1,
      help: R`처음 상태에서 앞면 3개, 뒷면 1개이므로 모두 앞면이 되려면 뒷면이던 동전이 홀수 번 뒤집히고 앞면이던 동전들이 짝수 번 뒤집혀야 한다. 반대로 모두 뒷면이 되려면 뒷면이던 동전이 짝수 번, 앞면이던 동전들이 홀수 번 뒤집혀야 한다. 전이 확률을 상태별로 계산하여 분모와 분자를 구한다.`
    },
    {
      id: "2025-06-prob-29", exam: "2025-06", no: 29, score: 4,
      units: ["prob-prob"], memo: "조합을 이용한 비복원추출 확률의 상등",
      body: R`\(40\)개의 공이 들어 있는 주머니가 있다. 각각의 공은 흰 공 또는 검은 공 중 하나이다. 이 주머니에서 임의로 \(2\)개의 공을 동시에 꺼낼 때, 흰 공 \(2\)개를 꺼낼 확률을 \(p\), 흰 공 \(1\)개와 검은 공 \(1\)개를 꺼낼 확률을 \(q\), 검은 공 \(2\)개를 꺼낼 확률을 \(r\)이라 하자. \(p=q\)일 때, \(60r\)의 값을 구하시오. (단, \(p &gt; 0\))`,
      short: true,
      answer: 6,
      help: R`흰 공의 개수를 \(w\), 검은 공의 개수를 \(b = 40-w\)라 하자. \(p = \dfrac{{}_{w}\mathrm{C}_{2}}{{}_{40}\mathrm{C}_{2}}\), \(q = \dfrac{w\cdot b}{{}_{40}\mathrm{C}_{2}}\)이므로 \(p=q\)에서 \(\dfrac{w(w-1)}{2} = w(40-w)\)이다. \(w>0\)이므로 \(w-1 = 80-2w \implies 3w=81 \implies w=27, b=13\)을 얻고 \(r = \dfrac{{}_{13}\mathrm{C}_{2}}{{}_{40}\mathrm{C}_{2}} = \dfrac{78}{780} = \dfrac{1}{10}\)에서 \(60r=6\)이다.`
    },
    {
      id: "2025-06-prob-30", exam: "2025-06", no: 30, score: 4,
      units: ["prob-count"], memo: "정의역과 공역의 제약조건 및 감소함수 (중복조합)",
      body: R`집합 \(X=\{-2, -1, 0, 1, 2\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(X\)의 모든 원소 \(x\)에 대하여 \(x+f(x)\in X\)이다.`,
        R`(나) \(x=-2, -1, 0, 1\)일 때 \(f(x)\ge f(x+1)\)이다.`
      ],
      short: true,
      answer: 108,
      help: R`조건 (가)에 의해 \(-2\le x+f(x)\le 2\)이므로 각 \(x\)에 대해 \(-2-x\le f(x)\le 2-x\)이다. 조건 (나)는 \(f(-2)\ge f(-1)\ge f(0)\ge f(1)\ge f(2)\)의 감소수열 조건이다. \(f(0)\)의 가능한 값 \(\{-2, -1, 0, 1, 2\}\)에 따라 경우를 나누어 \(f(-2), f(-1)\)과 \(f(1), f(2)\)의 선택 가짓수를 중복조합으로 계산한다.`
    },
    {
      id: "2024-suneung-prob-28", exam: "2024-suneung", no: 28, score: 4,
      units: ["prob-prob"], memo: "함숫값의 곱이 6의 배수인 조건부확률",
      body: R`두 집합 \(X=\{1, 2, 3, 4, 5\}\), \(Y=\{1, 2, 3, 4\}\)에 대하여 다음 조건을 만족시키는 \(X\)에서 \(Y\)로의 모든 함수 \(f\) 중에서 임의로 하나를 선택할 때, 이 함수 \(f\)의 치역이 \(Y\)일 확률은?`,
      noteTitle: "조 건",
      note: [
        R`\(f(1)\times f(2)\times f(3)\times f(4)\times f(5)\)의 값이 \(6\)의 배수이다.`
      ],
      choices: [R`\(\dfrac{3}{20}\)`, R`\(\dfrac{7}{40}\)`, R`\(\dfrac{1}{5}\)`, R`\(\dfrac{9}{40}\)`, R`\(\dfrac{1}{4}\)`],
      answer: 4,
      help: R`치역의 원소가 4개인 함수는 \(1, 2, 3, 4\)를 모두 포함하므로 함숫값의 곱은 항상 6의 배수가 되어 조건 (가)를 만족한다. 분모인 '함숫값의 곱이 6의 배수인 함수의 개수'는 전체 \(4^5\)에서 2의 배수가 없는 경우, 3의 배수가 없는 경우를 여사건과 포함배제로 구하여 분수를 완성한다.`
    },
    {
      id: "2024-suneung-prob-29", exam: "2024-suneung", no: 29, score: 4,
      units: ["prob-count"], memo: "부등식 조건을 만족시키는 6 이하 자연수의 순서쌍 (중복조합)",
      body: R`다음 조건을 만족시키는 \(6\) 이하의 자연수 \(a\), \(b\), \(c\), \(d\)의 모든 순서쌍 \((a, b, c, d)\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(a\le c\le d\)이고 \(b\le c\le d\)이다.`,
        R`(나) \(a\times b\times c\times d\)는 홀수이다.`
      ],
      short: true,
      answer: 196,
      help: R`네 수가 모두 홀수이므로 \(a, b, c, d\in\{1, 3, 5\}\)이다. \(c\)의 값(1, 3, 5)을 기준으로 분류하면, \(a, b\le c\)와 \(d\ge c\)가 서로 독립적으로 결정되므로 각각의 경우의 수를 곱하여 쉽게 합산할 수 있다.`
    },
    {
      id: "2024-suneung-prob-30", exam: "2024-suneung", no: 30, score: 4,
      units: ["prob-stat"], memo: "정규분포의 구간 확률 최대화",
      body: R`양수 \(t\)에 대하여 확률변수 \(X\)가 정규분포 \(\mathrm{N}(1, t^2)\)을 따른다. \(\mathrm{P}(X\le 5t)\ge \dfrac{1}{2}\)이 되도록 하는 모든 양수 \(t\)에 대하여 \(\mathrm{P}(t^2-t+1\le X\le t^2+t+1)\)의 최댓값을 오른쪽 표준정규분포표를 이용하여 구한 값을 \(k\)라 하자. \(1000\times k\)의 값을 구하시오.`,
      figure: "2024-suneung-prob-30.webp",
      short: true,
      answer: 673,
      help: R`\(\mathrm{P}(X\le 5t)\ge \dfrac{1}{2}\)에서 \(5t\ge 1\implies t\ge \dfrac{1}{5}\)이다. 주어진 구간의 양 끝점을 표준화하면 \(Z\)의 구간은 \([t-1, t+1]\)로 구간의 길이가 \(2\)로 일정하다. 정규분포 곡선의 대칭성에 의해 구간이 원점 \(0\)을 포함하며 원점에 가장 가까울 때 확률이 최대가 되므로 \(t\)의 최적값을 찾아 계산한다.`
    },
    {
      id: "2024-09-prob-28", exam: "2024-09", no: 28, score: 4,
      units: ["prob-stat"], memo: "두 주머니 선택 시행과 표본평균의 분포",
      body: R`주머니 \(\mathrm{A}\)에는 숫자 \(1\), \(2\), \(3\)이 하나씩 적힌 \(3\)개의 공이 들어 있고, 주머니 \(\mathrm{B}\)에는 숫자 \(1\), \(2\), \(3\), \(4\)가 하나씩 적힌 \(4\)개의 공이 들어 있다. 두 주머니 \(\mathrm{A}\), \(\mathrm{B}\)와 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(3\)의 배수이면 주머니 \(\mathrm{A}\)에서 임의로 \(2\)개의 공을 동시에 꺼내고, 나온 눈의 수가 \(3\)의 배수가 아니면 주머니 \(\mathrm{B}\)에서 임의로 \(2\)개의 공을 동시에 꺼낸다. 꺼낸 \(2\)개의 공에 적혀 있는 수의 차를 기록한 후, 공을 꺼낸 주머니에 이 \(2\)개의 공을 다시 넣는다.
이 시행을 \(2\)번 반복하여 기록한 두 개의 수의 평균을 \(\overline{X}\)라 할 때, \(\mathrm{P}(\overline{X}=2)\)의 값은?`,
      choices: [R`\(\dfrac{11}{81}\)`, R`\(\dfrac{13}{81}\)`, R`\(\dfrac{5}{27}\)`, R`\(\dfrac{17}{81}\)`, R`\(\dfrac{19}{81}\)`],
      answer: 5,
      help: R`1회 시행에서 얻는 차 \(Y\)의 확률분포를 구한다. 주머니 A를 택할 확률은 \(\dfrac{1}{3}\), B를 택할 확률은 \(\dfrac{2}{3}\)이며 각 주머니에서 두 수의 차가 \(1, 2, 3\)일 확률을 합산하여 \(Y\)의 분포를 완성한다. \(\overline{X}=2\)는 두 수의 합이 4인 경우((1, 3), (2, 2), (3, 1))이므로 독립시행의 합으로 계산한다.`
    },
    {
      id: "2024-09-prob-29", exam: "2024-09", no: 29, score: 4,
      units: ["prob-prob"], memo: "동전 던지기와 카드 뒤집기 독립시행",
      body: R`앞면에는 문자 \(\mathrm{A}\), 뒷면에는 문자 \(\mathrm{B}\)가 적힌 한 장의 카드가 있다. 이 카드와 한 개의 동전을 사용하여 다음 시행을 한다.
동전을 두 번 던져 앞면이 나온 횟수가 \(2\)이면 카드를 한 번 뒤집고, 앞면이 나온 횟수가 \(0\) 또는 \(1\)이면 카드를 그대로 둔다.
처음에 문자 \(\mathrm{A}\)가 보이도록 카드가 놓여 있을 때, 이 시행을 \(5\)번 반복한 후 문자 \(\mathrm{B}\)가 보이도록 카드가 놓일 확률은 \(p\)이다. \(128\times p\)의 값을 구하시오.`,
      short: true,
      answer: 62,
      help: R`1회 시행에서 카드가 뒤집힐 확률은 동전 앞면이 2번 나오는 확률인 \(\dfrac{1}{4}\)이다. 5회 시행 후 B가 보이려면 카드가 홀수 번(1번, 3번, 5번) 뒤집혀야 한다. 이항분포 \(\mathrm{B}\left(5, \dfrac{1}{4}\right)\)에서 홀수 번 성공할 확률을 계산하여 \(128p\)를 구한다.`
    },
    {
      id: "2024-09-prob-30", exam: "2024-09", no: 30, score: 4,
      units: ["prob-count"], memo: "대소 관계와 홀짝 조건을 만족시키는 자연수 순서쌍 (중복조합)",
      body: R`다음 조건을 만족시키는 \(13\) 이하의 자연수 \(a\), \(b\), \(c\), \(d\)의 모든 순서쌍 \((a, b, c, d)\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(a\le b\le c\le d\)`,
        R`(나) \(a\times d\)는 홀수이고, \(b+c\)는 짝수이다.`
      ],
      short: true,
      answer: 336,
      help: R`\(a, d\)는 모두 홀수여야 하므로 \(1\le a\le d\le 13\)인 홀수 쌍 \((a, d)\)를 택한다. \(b+c\)가 짝수이므로 \(b, c\)는 둘 다 홀수이거나 둘 다 짝수이다. \(a\le d\)인 범위 안에서 홀수/짝수 후보의 개수를 파악하여 중복조합으로 \(b, c\)를 택하는 경우의 수를 합산한다.`
    },
    {
      id: "2024-06-prob-28", exam: "2024-06", no: 28, score: 4,
      units: ["prob-count"], memo: "치역의 크기와 부등식을 만족시키는 함수의 개수",
      body: R`집합 \(X=\{1, 2, 3, 4, 5\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수는?`,
      noteTitle: "조 건",
      note: [
        R`(가) \(f(1)\times f(3)\times f(5)\)는 홀수이다.`,
        R`(나) \(f(2) &lt; f(4)\)`,
        R`(다) 함수 \(f\)의 치역의 원소의 개수는 \(3\)이다.`
      ],
      choices: [R`\(128\)`, R`\(132\)`, R`\(136\)`, R`\(140\)`, R`\(144\)`],
      answer: 5,
      help: R`조건 (가)에 의해 \(f(1), f(3), f(5)\in\{1, 3, 5\}\)이다. 이 세 함숫값의 치역 크기가 1개, 2개, 3개인 경우로 나누고, 전체 치역의 크기가 3이 되도록 \(f(2) &lt; f(4)\)의 값을 배분하는 경우의 수를 체계적으로 분류하여 더한다.`
    },
    {
      id: "2024-06-prob-29", exam: "2024-06", no: 29, score: 4,
      units: ["prob-count"], memo: "검은 카드와 흰 카드의 배열 (중복조합)",
      body: R`그림과 같이 \(2\)장의 검은색 카드와 \(1\)부터 \(8\)까지의 자연수가 하나씩 적혀 있는 \(8\)장의 흰색 카드가 있다. 이 카드를 모두 한 번씩 사용하여 왼쪽에서 오른쪽으로 일렬로 배열할 때, 다음 조건을 만족시키는 경우의 수를 구하시오. (단, 검은색 카드는 서로 구별하지 않는다.)`,
      figure: "2024-06-prob-29.webp",
      noteTitle: "조 건",
      note: [
        R`(가) 흰색 카드에 적힌 수가 작은 수부터 크기순으로 왼쪽에서 오른쪽으로 배열되도록 카드가 놓여 있다.`,
        R`(나) 검은색 카드 사이에는 흰색 카드가 \(2\)장 이상 놓여 있다.`,
        R`(다) 검은색 카드 사이에는 \(3\)의 배수가 적힌 흰색 카드가 \(1\)장 이상 놓여 있다.`
      ],
      short: true,
      answer: 25,
      help: R`검은색 카드 2장 사이의 흰색 카드 개수를 \(y\), 왼쪽을 \(x\), 오른쪽을 \(z\)라 하면 \(x+y+z=8\) (\(y\ge 2\))이다. 사이의 카드들에 3의 배수(3 또는 6)가 적어도 1개 들어가야 하므로, 3의 배수가 전혀 포함되지 않는 여사건(사이에 들어가는 카드가 \(\{1, 2\}, \{4, 5\}, \{7, 8\}\) 등의 부분집합인 경우)을 제외하여 센다.`
    },
    {
      id: "2024-06-prob-30", exam: "2024-06", no: 30, score: 4,
      units: ["prob-prob"], memo: "주머니 공 꺼내기 게임의 점수와 확률",
      body: R`주머니에 숫자 \(1\), \(2\), \(3\), \(4\)가 하나씩 적혀 있는 흰 공 \(4\)개와 숫자 \(4\), \(5\), \(6\), \(7\)이 하나씩 적혀 있는 검은 공 \(4\)개가 들어 있다. 이 주머니를 사용하여 다음 규칙에 따라 점수를 얻는 시행을 한다.
주머니에서 임의로 \(2\)개의 공을 동시에 꺼내어 꺼낸 공이 서로 다른 색이면 \(12\)를 점수로 얻고, 꺼낸 공이 서로 같은 색이면 꺼낸 두 공에 적힌 수의 곱을 점수로 얻는다.
이 시행을 한 번 하여 얻은 점수가 \(24\) 이하의 짝수일 확률이 \(\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 51,
      help: R`전체 경우의 수는 \({}_{8}\mathrm{C}_{2}=28\)이다. 서로 다른 색을 꺼내면 항상 12점(24 이하의 짝수)이므로 \(4\times 4=16\)가지는 모두 해당한다. 같은 색인 경우 흰 공 2개에서 곱이 짝수인 경우와 검은 공 2개에서 곱이 24 이하의 짝수인 경우를 각각 찾아 더하면 23가지가 되어 확률은 \(\dfrac{23}{28}\)이다.`
    },
    {
      id: "2023-suneung-prob-28", exam: "2023-suneung", no: 28, score: 4,
      units: ["prob-stat"], memo: "연속확률변수의 확률밀도함수 그래프와 미지수 결정",
      body: R`연속확률변수 \(X\)가 갖는 값의 범위는 \(0\le X\le a\)이고, \(X\)의 확률밀도함수의 그래프가 그림과 같다.
\(\mathrm{P}(X\le b) - \mathrm{P}(X\ge b) = \dfrac{1}{4}\), \(\mathrm{P}(X\le \sqrt{5}) = \dfrac{1}{2}\)일 때, \(a+b+c\)의 값은? (단, \(a, b, c\)는 상수이다.)`,
      figure: "2023-suneung-prob-28.webp",
      choices: [R`\(\dfrac{11}{2}\)`, R`\(6\)`, R`\(\dfrac{13}{2}\)`, R`\(7\)`, R`\(\dfrac{15}{2}\)`],
      answer: 4,
      help: R`전체 넓이가 1이므로 삼각형 넓이 공식에서 \(\dfrac{1}{2}ac = 1\)이다. \(\mathrm{P}(X\le b) + \mathrm{P}(X\ge b) = 1\)과 연립하면 \(\mathrm{P}(X\le b) = \dfrac{5}{8}\)이다. 중앙값 \(\sqrt{5}\)의 위치와 넓이 비를 이용하여 \(a, b, c\)를 차례로 결정하면 \(a=4, b=2.5, c=0.5\) 등을 얻어 합이 7이 된다.`
    },
    {
      id: "2023-suneung-prob-29", exam: "2023-suneung", no: 29, score: 4,
      units: ["prob-prob"], memo: "카드 뒤집기 시행과 조건부확률",
      body: R`앞면에는 \(1\)부터 \(6\)까지의 자연수가 하나씩 적혀 있고 뒷면에는 모두 \(0\)이 하나씩 적혀 있는 \(6\)장의 카드가 있다. 이 \(6\)장의 카드가 그림과 같이 \(6\) 이하의 자연수 \(k\)에 대하여 \(k\)번째 자리에 자연수 \(k\)가 보이도록 놓여 있다. 이 \(6\)장의 카드와 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(k\)이면 \(k\)번째 자리에 놓여 있는 카드를 한 번 뒤집어 제자리에 놓는다.
위의 시행을 \(3\)번 반복한 후 \(6\)장의 카드에 보이는 모든 수의 합이 짝수일 때, 주사위의 \(1\)의 눈이 한 번만 나왔을 확률은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2023-suneung-prob-29.webp",
      short: true,
      answer: 49,
      help: R`처음 상태의 모든 수의 합은 \(21\)(홀수)이다. 3회 시행 후 합이 짝수가 되려면 홀수 카드(\(\{1, 3, 5\}\))가 뒤집힌 총 횟수가 홀수(1회 또는 3회)여야 한다. 합이 짝수가 되는 전체 경우의 수와 그중 1의 눈이 정확히 1번 나오는 경우의 수를 분류하여 확률 \(\dfrac{13}{36}\)을 구한다.`
    },
    {
      id: "2023-suneung-prob-30", exam: "2023-suneung", no: 30, score: 4,
      units: ["prob-count"], memo: "경계 조건과 대소 관계를 만족시키는 함수의 개수 (중복조합)",
      body: R`집합 \(X=\{x\mid x\text{는 } 10 \text{ 이하의 자연수}\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(9\) 이하의 모든 자연수 \(x\)에 대하여 \(f(x)\le f(x+1)\)이다.`,
        R`(나) \(1\le x\le 5\)일 때 \(f(x)\le x\)이고, \(6\le x\le 10\)일 때 \(f(x)\ge x\)이다.`,
        R`(다) \(f(6)=f(5)+6\)`
      ],
      short: true,
      answer: 100,
      help: R`조건 (나)에서 \(f(5)\le 5\), \(f(6)\ge 6\)이고 조건 (다)에서 \(f(6)=f(5)+6\)이므로 \(f(5)\)의 값으로 가능한 것은 \(1, 2, 3, 4\)뿐이다(이에 따라 \(f(6)=7, 8, 9, 10\)). 각 \(f(5)\)의 값에 대해 \(f(1)\dots f(4)\)의 개수와 \(f(7)\dots f(10)\)의 개수가 독립적으로 대칭 구조를 이루므로 각각 곱하여 합산하면 100이 나온다.`
    },
    {
      id: "2023-09-prob-28", exam: "2023-09", no: 28, score: 4,
      units: ["prob-prob"], memo: "배수 조건과 나머지 분류를 이용한 확률",
      body: R`\(1\)부터 \(10\)까지의 자연수 중에서 임의로 서로 다른 \(3\)개의 수를 선택한다. 선택된 세 개의 수의 곱이 \(5\)의 배수이고 합은 \(3\)의 배수일 확률은?`,
      choices: [R`\(\dfrac{3}{20}\)`, R`\(\dfrac{1}{6}\)`, R`\(\dfrac{11}{60}\)`, R`\(\dfrac{1}{5}\)`, R`\(\dfrac{13}{60}\)`],
      answer: 3,
      help: R`전체 경우의 수는 \({}_{10}\mathrm{C}_{3} = 120\)이다. 곱이 5의 배수이므로 5 또는 10이 적어도 하나 포함되어야 한다. 10개의 수를 3으로 나눈 나머지 그룹(0, 1, 2)으로 분류한 후, 5만 포함하는 경우, 10만 포함하는 경우, 5와 10을 둘 다 포함하는 경우로 나누어 세 수의 합이 3의 배수가 되는 조합을 센다.`
    },
    {
      id: "2023-09-prob-29", exam: "2023-09", no: 29, score: 4,
      units: ["prob-stat"], memo: "표본평균의 분포와 주사위 눈의 합",
      body: R`\(1\)부터 \(6\)까지의 자연수가 하나씩 적힌 \(6\)장의 카드가 들어 있는 주머니가 있다. 이 주머니에서 임의로 한 장의 카드를 꺼내어 카드에 적힌 수를 확인한 후 다시 넣는 시행을 한다. 이 시행을 \(4\)번 반복하여 확인한 네 개의 수의 평균을 \(\overline{X}\)라 할 때, \(\mathrm{P}\left(\overline{X}=\dfrac{11}{4}\right)=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 175,
      help: R`\(\overline{X}=\dfrac{11}{4}\)는 4번 꺼낸 수의 합이 \(11\)인 사건이다. \(x_1+x_2+x_3+x_4=11\) (\(1\le x_i\le 6\))의 해의 개수는 \({}_{4}\mathrm{H}_{7} = 120\)에서 한 변수가 7 이상인 경우 4가지를 빼서 116가지가 아니라 6을 넘는 경우를 정확히 배제하여 80가지 또는 해당 경우의 수를 구하고, 전체 \(6^4=1296\)으로 나누어 기약분수를 얻는다.`
    },
    {
      id: "2023-09-prob-30", exam: "2023-09", no: 30, score: 4,
      units: ["prob-count"], memo: "치역의 크기와 고정점이 없는 합성함수 (순열과 조합)",
      body: R`집합 \(X=\{1, 2, 3, 4, 5\}\)와 함수 \(f\colon X\to X\)에 대하여 함수 \(f\)의 치역을 \(A\), 합성함수 \(f\circ f\)의 치역을 \(B\)라 할 때, 다음 조건을 만족시키는 함수 \(f\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(n(A)\le 3\)`,
        R`(나) \(n(A)=n(B)\)`,
        R`(다) 집합 \(X\)의 모든 원소 \(x\)에 대하여 \(f(x)\ne x\)이다.`
      ],
      short: true,
      answer: 260,
      help: R`조건 (나)에서 \(f\)는 치역 \(A\) 위에서 일대일대응이어야 한다. 조건 (다)에서 고정점이 없으므로 \(A\) 위에서의 \(f\)는 완전순열(교란순열)이다. \(n(A)=2\)인 경우(2원소 순환)와 \(n(A)=3\)인 경우(3원소 순환)로 나누어 치역 선택과 나머지 원소들의 대응 경우의 수를 계산한다.`
    },
    {
      id: "2023-06-prob-28", exam: "2023-06", no: 28, score: 4,
      units: ["prob-prob"], memo: "순열로 만든 자연수의 배수 및 대소 조건 확률",
      body: R`숫자 \(1\), \(2\), \(3\), \(4\), \(5\) 중에서 서로 다른 \(4\)개를 택해 일렬로 나열하여 만들 수 있는 모든 네 자리의 자연수 중에서 임의로 하나의 수를 택할 때, 택한 수가 \(5\)의 배수 또는 \(3500\) 이상일 확률은?`,
      choices: [R`\(\dfrac{9}{20}\)`, R`\(\dfrac{1}{2}\)`, R`\(\dfrac{11}{20}\)`, R`\(\dfrac{3}{5}\)`, R`\(\dfrac{13}{20}\)`],
      answer: 4,
      help: R`전체 네 자리 수의 개수는 \({}_{5}\mathrm{P}_{4} = 120\)이다. 5의 배수인 사건 \(A\)(일의 자리가 5)와 3500 이상인 사건 \(B\)(천의 자리가 3이고 백의 자리가 5인 경우 또는 천의 자리가 4 또는 5인 경우)의 원소 개수 및 교집합 \(A\cap B\)를 구하여 합사건 공식으로 계산한다.`
    },
    {
      id: "2023-06-prob-29", exam: "2023-06", no: 29, score: 4,
      units: ["prob-count"], memo: "합성함수 조건과 단조증가 조건의 함수 개수 (중복조합)",
      body: R`집합 \(X=\{1, 2, 3, 4, 5\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수를 구하시오.`,
      noteTitle: "조 건",
      note: [
        R`(가) \(f(f(1))=4\)`,
        R`(나) \(f(1)\le f(3)\le f(5)\)`
      ],
      short: true,
      answer: 115,
      help: R`\(f(1)=k\)라 하면 \(f(k)=4\)이고 \(k\le f(3)\le f(5)\)이다. \(k\in\{1, 2, 3, 4, 5\}\)의 각 경우에 대해 \(f(1), f(k)\)가 정해졌을 때 \(f(3), f(5)\)의 선택 가짓수(중복조합)와 나머지 정의역 원소들의 자유로운 함숫값 선택 가짓수(\(\times 5\))를 주의 깊게 곱하여 합산한다.`
    },
    {
      id: "2023-06-prob-30", exam: "2023-06", no: 30, score: 4,
      units: ["prob-prob"], memo: "비복원추출에서 수의 차이와 조건부확률",
      body: R`주머니에 \(1\)부터 \(12\)까지의 자연수가 각각 하나씩 적혀 있는 \(12\)개의 공이 들어 있다. 이 주머니에서 임의로 \(3\)개의 공을 동시에 꺼내어 공에 적혀 있는 수를 작은 수부터 크기 순서대로 \(a\), \(b\), \(c\)라 하자. \(b-a\ge 5\)일 때, \(c-a\ge 10\)일 확률은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 9,
      help: R`\(1\le a &lt; b &lt; c\le 12\)에서 \(b-a\ge 5\)를 만족하는 순서쌍 개수를 구한다. 치환 \(b'=b-4\) 등을 이용하거나 \(a\)의 값(1부터 6까지)에 따라 가능한 \(b, c\)의 개수를 센다. 분자인 \(c-a\ge 10\)은 \(a=1, c\in\{11, 12\}\) 또는 \(a=2, c=12\)인 경우로 몇 개 되지 않으므로 직접 세어 분수를 약분한다.`
    },
    {
      id: "2022-suneung-prob-28", exam: "2022-suneung", no: 28, score: 4,
      units: ["prob-count"], memo: "부등식과 치역의 크기를 만족시키는 함수의 개수",
      body: R`두 집합 \(X=\{1, 2, 3, 4, 5\}\), \(Y=\{1, 2, 3, 4\}\)에 대하여 다음 조건을 만족시키는 \(X\)에서 \(Y\)로의 함수 \(f\)의 개수는?`,
      noteTitle: "조 건",
      note: [
        R`(가) 집합 \(X\)의 모든 원소 \(x\)에 대하여 \(f(x)\ge \sqrt{x}\)이다.`,
        R`(나) 함수 \(f\)의 치역의 원소의 개수는 \(3\)이다.`
      ],
      choices: [R`\(128\)`, R`\(138\)`, R`\(148\)`, R`\(158\)`, R`\(168\)`],
      answer: 1,
      help: R`조건 (가)에 의해 \(f(1)\ge 1\), \(f(2)\ge 2\), \(f(3)\ge 2\), \(f(4)\ge 2\), \(f(5)\ge 3\)이다. 치역의 크기가 3이 되는 3개 원소의 부분집합 \(\{1, 2, 3\}, \{1, 2, 4\}, \{1, 3, 4\}, \{2, 3, 4\}\) 각각에 대해 각 원소가 치역 전체를 덮도록 전사함수의 개수를 포함배제로 구한다.`
    },
    {
      id: "2022-suneung-prob-29", exam: "2022-suneung", no: 29, score: 4,
      units: ["prob-stat"], memo: "확률밀도함수의 성질과 정적분 넓이",
      body: R`두 연속확률변수 \(X\)와 \(Y\)가 갖는 값의 범위는 \(0\le X\le 6\), \(0\le Y\le 6\)이고, \(X\)와 \(Y\)의 확률밀도함수는 각각 \(f(x)\), \(g(x)\)이다. 확률변수 \(X\)의 확률밀도함수 \(f(x)\)의 그래프는 그림과 같다.
\(0\le x\le 6\)인 모든 \(x\)에 대하여
\[f(x)+g(x)=k\quad(k\text{는 상수})\]
를 만족시킬 때, \(\mathrm{P}(6k\le Y\le 15k)=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2022-suneung-prob-29.webp",
      short: true,
      answer: 31,
      help: R`\(\int_0^6 f(x)\,dx = 1\)이고 \(\int_0^6 g(x)\,dx = 1\)이므로 \(\int_0^6 (f+g)\,dx = 6k = 2 \implies k = \dfrac{1}{3}\)가 아니라 구간 길이 6에서 \(k=\dfrac{1}{3}\)을 구하고 \(\mathrm{P}(2\le Y\le 5) = \int_2^5 (k - f(x))\,dx\)를 직사각형 넓이에서 \(f(x)\)의 넓이를 빼서 계산한다.`
    },
    {
      id: "2022-suneung-prob-30", exam: "2022-suneung", no: 30, score: 4,
      units: ["prob-prob"], memo: "주사위 시행과 공 개수 일치 조건부확률",
      body: R`흰 공과 검은 공이 각각 \(10\)개 이상 들어 있는 바구니와 비어 있는 주머니가 있다. 한 개의 주사위를 사용하여 다음 시행을 한다.
주사위를 한 번 던져 나온 눈의 수가 \(5\) 이상이면 바구니에 있는 흰 공 \(2\)개를 주머니에 넣고, 나온 눈의 수가 \(4\) 이하이면 바구니에 있는 검은 공 \(1\)개를 주머니에 넣는다.
위의 시행을 \(5\)번 반복할 때, \(n\,(1\le n\le 5)\)번째 시행 후 주머니에 들어 있는 흰 공과 검은 공의 개수를 각각 \(a_n\), \(b_n\)이라 하자. \(a_5+b_5\ge 7\)일 때, \(a_k=b_k\)인 자연수 \(k\,(1\le k\le 5)\)가 존재할 확률은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 191,
      help: R`눈 5 이상(흰공 2개 추가) 확률은 \(\dfrac{1}{3}\), 눈 4 이하(검은공 1개 추가) 확률은 \(\dfrac{2}{3}\)이다. 5회 중 5 이상이 나온 횟수를 \(X\)라 하면 총 공의 개수는 \(2X + (5-X) = X + 5\ge 7 \implies X\ge 2\)이다. \(X\in\{2, 3, 4, 5\}\)인 각 경우에 대해 중간에 \(a_k=b_k\) (즉 흰공 개수와 검은공 개수가 같아지는 순간)가 존재하는 경로를 추적하여 조건부확률을 구한다.`
    },
    {
      id: "2022-09-prob-28", exam: "2022-09", no: 28, score: 4,
      units: ["prob-count"], memo: "배수 조건과 부등식을 만족시키는 함수의 개수",
      body: R`집합 \(X=\{1, 2, 3, 4, 5, 6\}\)에 대하여 다음 조건을 만족시키는 함수 \(f\colon X\to X\)의 개수는?`,
      noteTitle: "조 건",
      note: [
        R`(가) \(f(3)+f(4)\)는 \(5\)의 배수이다.`,
        R`(나) \(f(1) &lt; f(3)\)이고 \(f(2) &lt; f(3)\)이다.`,
        R`(다) \(f(4) &lt; f(5)\)이고 \(f(4) &lt; f(6)\)이다.`
      ],
      choices: [R`\(384\)`, R`\(394\)`, R`\(404\)`, R`\(414\)`, R`\(424\)`],
      answer: 4,
      help: R`\(f(3)+f(4)\)가 5의 배수이므로 그 합은 5 또는 10이다. 순서쌍 \((f(3), f(4))\)로 가능한 모든 경우에 대해, \(f(1), f(2)\)는 \(f(3)-1\)개의 값 중 중복 허용 선택(\((f(3)-1)^2\)), \(f(5), f(6)\)은 \(6-f(4)\)개의 값 중 중복 허용 선택(\((6-f(4))^2\))이므로 각각 곱하여 모두 합산한다.`
    },
    {
      id: "2022-09-prob-29", exam: "2022-09", no: 29, score: 4,
      units: ["prob-stat"], memo: "대칭 확률분포와 분산의 관계",
      body: R`두 이산확률변수 \(X, Y\)의 확률분포를 표로 나타내면 각각 다음과 같다.
\(\mathrm{V}(X)=\dfrac{31}{5}\)일 때, \(10\times\mathrm{V}(Y)\)의 값을 구하시오.`,
      figure: "2022-09-prob-29.webp",
      short: true,
      answer: 78,
      help: R`확률변수 \(X\)와 \(Y\)는 모두 \(5\)에 대하여 대칭이므로 \(\mathrm{E}(X)=\mathrm{E}(Y)=5\)이다. \(\mathrm{V}(Y) - \mathrm{V}(X) = \mathrm{E}(Y^2) - \mathrm{E}(X^2)\)를 계산하면 \(b, c\)가 상쇄되고 \((1^2+9^2)\times\dfrac{1}{20} - 5^2\times\dfrac{1}{10} = \dfrac{82}{20} - \dfrac{50}{20} = \dfrac{32}{20} = \dfrac{8}{5}\)만큼 늘어나므로 \(\mathrm{V}(Y) = \dfrac{31}{5} + \dfrac{8}{5} = \dfrac{39}{5}\)에서 \(10\mathrm{V}(Y)=78\)이다.`
    },
    {
      id: "2022-09-prob-30", exam: "2022-09", no: 30, score: 4,
      units: ["prob-count"], memo: "사인펜 분배와 짝수 조건 (중복조합 및 포함배제)",
      body: R`네 명의 학생 \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{C}\), \(\mathrm{D}\)에게 같은 종류의 사인펜 \(14\)개를 다음 규칙에 따라 남김없이 나누어 주는 경우의 수를 구하시오.`,
      noteTitle: "규 칙",
      note: [
        R`(가) 각 학생은 \(1\)개 이상의 사인펜을 받는다.`,
        R`(나) 각 학생이 받는 사인펜의 개수는 \(9\) 이하이다.`,
        R`(다) 적어도 한 학생은 짝수 개의 사인펜을 받는다.`
      ],
      short: true,
      answer: 218,
      help: R`각 학생이 1개 이상 9개 이하를 받으므로 치환 후 전체 해는 \({}_{4}\mathrm{H}_{10} - 4\times{}_{4}\mathrm{H}_{1} = 286 - 16 = 270\)이다. 조건 (다)의 여사건은 '네 학생 모두 홀수 개의 사인펜을 받는 경우'이므로 각 학생에게 \(2x_i+1\)개를 배분하여 \(x_1+x_2+x_3+x_4=5\) (\(0\le x_i\le 4\))의 해의 개수 \({}_{4}\mathrm{H}_{5}-4 = 56-4=52\)를 빼서 \(270-52=218\)을 구한다.`
    },
    {
      id: "2022-06-prob-28", exam: "2022-06", no: 28, score: 4,
      units: ["prob-count"], memo: "주사위 점수 합의 순서쌍 개수 (중복조합)",
      body: R`한 개의 주사위를 한 번 던져 나온 눈의 수가 \(3\) 이하이면 나온 눈의 수를 점수로 얻고, 나온 눈의 수가 \(4\) 이상이면 \(0\)점을 얻는다. 이 주사위를 네 번 던져 나온 눈의 수를 차례로 \(a\), \(b\), \(c\), \(d\)라 할 때, 얻은 네 점수의 합이 \(4\)가 되는 모든 순서쌍 \((a, b, c, d)\)의 개수는?`,
      choices: [R`\(187\)`, R`\(190\)`, R`\(193\)`, R`\(196\)`, R`\(199\)`],
      answer: 5,
      help: R`네 점수의 합이 4가 되는 분할은 (3, 1, 0, 0), (2, 2, 0, 0), (2, 1, 1, 0), (1, 1, 1, 1)이다. 각 0점에 해당하는 주사위 눈은 \(\{4, 5, 6\}\)의 3가지이고, 1, 2, 3점은 각각 1가지씩이므로 각 분할별 순열 및 눈의 경우의 수를 곱하여 합산한다.`
    },
    {
      id: "2022-06-prob-29", exam: "2022-06", no: 29, score: 4,
      units: ["prob-count"], memo: "원순열과 이웃 조건 (포함배제)",
      body: R`\(1\)부터 \(6\)까지의 자연수가 하나씩 적혀 있는 \(6\)개의 의자가 있다. 이 \(6\)개의 의자를 일정한 간격을 두고 원형으로 배열할 때, 서로 이웃한 \(2\)개의 의자에 적혀 있는 수의 곱이 \(12\)가 되지 않도록 배열하는 경우의 수를 구하시오. (단, 회전하여 일치하는 것은 같은 것으로 본다.)`,
      short: true,
      answer: 48,
      help: R`곱이 12가 되는 이웃 쌍은 \(\{2, 6\}\)과 \(\{3, 4\}\)이다. 전체 원순열의 개수는 \((6-1)! = 120\)이다. \(\{2, 6\}\)이 이웃하는 경우, \(\{3, 4\}\)가 이웃하는 경우를 각각 구하고 둘 다 동시에 이웃하는 경우를 포함배제의 원리로 처리하여 전체에서 차감한다.`
    },
    {
      id: "2022-06-prob-30", exam: "2022-06", no: 30, score: 4,
      units: ["prob-prob"], memo: "복원추출 수의 곱이 6의 배수일 확률 (여사건)",
      body: R`숫자 \(1\), \(2\), \(3\)이 하나씩 적혀 있는 \(3\)개의 공이 들어 있는 주머니가 있다. 이 주머니에서 임의로 한 개의 공을 꺼내어 공에 적혀 있는 수를 확인한 후 다시 넣는 시행을 한다. 이 시행을 \(5\)번 반복하여 확인한 \(5\)개의 수의 곱이 \(6\)의 배수일 확률이 \(\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 47,
      help: R`곱이 6의 배수가 되려면 5개의 수 중에 2와 3이 적어도 한 번씩 나와야 한다. 여사건은 '2가 한 번도 나오지 않음(1, 3만 나옴: \(2^5\))' 또는 '3이 한 번도 나오지 않음(1, 2만 나옴: \(2^5\))'이다. 두 사건의 교집합(1만 나옴: \(1^5\))을 빼면 여사건의 경우의 수는 \(32+32-1=63\)이고 전체 \(3^5=243\)에서 \(1-\dfrac{63}{243} = \dfrac{180}{243} = \dfrac{20}{27}\)이 되어 \(p+q=47\)이다.`
    },
    // ==========================================
    // 미적분 (51문항)
    // ==========================================,
    {
      id: "2027-09-calc-28", exam: "2027-09", no: 28, score: 4,
      units: ["calc-diff"], memo: "매개변수 미분법과 도형의 넓이 변화율",
      body: R`점 \(\mathrm{O}\)를 중심으로 하고 반지름의 길이가 \(2\)인 원 \(C\)가 있다. \(\overline{\mathrm{OA}}=5\)인 점 \(\mathrm{A}\)에 대하여 선분 \(\mathrm{OA}\)와 원 \(C\)가 만나는 점을 \(\mathrm{B}\)라 하자. 점 \(\mathrm{A}\)를 지나고 점 \(\mathrm{O}\)를 지나지 않는 직선이 원 \(C\)와 서로 다른 두 점에서 만날 때, 두 점을 \(\mathrm{P}\), \(\mathrm{Q}\) (\(\overline{\mathrm{AP}} &lt; \overline{\mathrm{AQ}}\))라 하자. 점 \(\mathrm{Q}\)를 포함하지 않는 호 \(\mathrm{BP}\)와 두 선분 \(\mathrm{AB}\), \(\mathrm{AP}\)로 둘러싸인 도형의 넓이를 \(t\)라 할 때, \(\angle\mathrm{OPQ}=f(t)\)라 하면 \(f(t)\)는 미분가능한 함수이다.
\(\tan f(k)=\dfrac{3}{2}\)인 실수 \(k\)에 대하여 \(f'(k)\)의 값은?`,
      figure: "2027-09-calc-28.webp",
      choices: [R`\(\dfrac{7}{13}\)`, R`\(\dfrac{15}{26}\)`, R`\(\dfrac{8}{13}\)`, R`\(\dfrac{17}{26}\)`, R`\(\dfrac{9}{13}\)`],
      answer: 4,
      help: R`도형의 넓이 \(t\)를 \(\angle\mathrm{POA}=\theta\)에 대한 식 \(t=5\sin\theta-2\theta\)로 나타내고 매개변수 미분법을 적용한다. \(\triangle\mathrm{OPA}\)에서 사인법칙으로 \(\theta\)와 \(f(t)\)의 관계식을 세워 \(\dfrac{df}{d\theta}\)와 \(\dfrac{dt}{d\theta}\)를 각각 구하는 것이 핵심이다. 삼각함수 덧셈정리로 \(\cos\theta\)를 정확히 계산하여 연쇄법칙을 완성한다.`
    },
    {
      id: "2027-09-calc-29", exam: "2027-09", no: 29, score: 4,
      units: ["calc-seq"], memo: "조건에 따른 수열 정의와 등비급수의 합",
      body: R`수열 \(\{a_n\}\)은 등비수열이고, 수열 \(\{b_n\}\)을 모든 자연수 \(n\)에 대하여
\[b_n = \begin{cases} a_n - a_1 &amp; (|a_n| \ge 10) \\ (a_n)^2 &amp; (|a_n| &lt; 10) \end{cases}\]
이라 하자. 수열 \(\{b_n\}\)은 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \((b_2)^2 = 36b_3\)`,
        R`(나) 급수 \(\sum_{n=1}^\infty b_n\)은 수렴하고 그 합은 \(12\)이다.`
      ],
            bodyAfter: R`\(a_1 > 0\)이고 \(a_2 &lt; 0\)일 때, \(36 \times a_4 \times a_6\)의 값을 구하시오.`,
short: true,
      answer: 81,
      help: R`급수가 수렴하므로 공비의 절댓값은 \(|r|&lt;1\)이고 항의 절댓값은 단조 감소한다. \(|a_n|\ge 10\)인 항의 개수를 분류하여 \(b_n\)의 규칙을 정하고 조건 (가)로부터 공비 \(r=-\dfrac{1}{2}\)을 결정한다. 급수의 합 조건을 통해 첫째항 \(a_1=24\)를 구한 뒤 구하는 값을 계산한다.`
    },
    {
      id: "2027-09-calc-30", exam: "2027-09", no: 30, score: 4,
      units: ["calc-integ"], memo: "역함수의 정적분과 치환적분법",
      body: R`함수 \(f(x)=2^{2x+\frac{1}{2}\cos\pi x}\)의 역함수 \(g(x)\)는 양의 실수 전체의 집합에서 연속인 도함수를 갖는다.
\[\dfrac{1}{4}\int_{f(1)}^{f(3)} g(x)\,dx + \int_{f(0)}^{f(2)} \dfrac{2^{4g(x)} g'(x)}{x}\,dx = \dfrac{q}{p}\sqrt{2}\]
일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 49,
      help: R`두 적분을 모두 \(x=f(t)\)로 치환적분하여 \(t\)에 관한 식으로 바꾼다. 첫 번째 적분은 부분적분법을 통해 \([t f(t)]_1^3 - \int_1^3 f(t)\,dt\)로 정리되고, 두 번째 피적분함수는 \(\dfrac{1}{4}f(t+1)\)과 같아져 복잡한 적분 항이 상쇄된다. 소거 후 남는 \(f(3)\)과 \(f(1)\)의 값만 대입하면 간단히 계산할 수 있다.`
    },
    {
      id: "2027-06-calc-28", exam: "2027-06", no: 28, score: 4,
      units: ["calc-diff"], memo: "매개변수 미분과 이계도함수의 극한",
      body: R`좌표평면에서 양수 \(t\)에 대하여 직선 \(y=t\)가 두 곡선 \(y=e^{2x}-e^{-x}+1\), \(y=e^{2x}\)과 만나는 점을 각각 \(\mathrm{P}\), \(\mathrm{Q}\)라 하자. 점 \(\mathrm{P}\)를 지나고 \(x\)축에 수직인 직선이 곡선 \(y=e^{2x}\)과 만나는 점의 \(y\)좌표를 \(f(t)\), 점 \(\mathrm{Q}\)를 지나고 \(x\)축에 수직인 직선이 곡선 \(y=e^{2x}-e^{-x}+1\)과 만나는 점의 \(y\)좌표를 \(g(t)\)라 할 때, 두 함수 \(f(t)\), \(g(t)\)는 구간 \((0, \infty)\)에서 미분가능한 함수이다.
\[\lim_{t\to 1}\dfrac{9f'(t)-4g'(t)}{t-1}\]
의 값은?`,
      figure: "2027-06-calc-28.webp",
      choices: [R`\(1\)`, R`\(3\)`, R`\(5\)`, R`\(7\)`, R`\(9\)`],
      answer: 3,
      help: R`\(t\to 1\)일 때 \(9f'(1)-4g'(1)=0\)이므로 구하는 극한값은 \(9f''(1)-4g''(1)\)이다. \(f(t)=t+e^{-x_1}-1\), \(g(t)=t-t^{-1/2}+1\)로 정리하면 미분을 훨씬 간결하게 처리할 수 있다. 음함수 미분법으로 \(x_1'(1)=\dfrac{1}{3}\), \(x_1''(1)=-\dfrac{1}{9}\)를 구하여 이계도함수 값을 계산한다.`
    },
    {
      id: "2027-06-calc-29", exam: "2027-06", no: 29, score: 4,
      units: ["calc-seq"], memo: "등차·등비수열 조건과 급수의 합 최솟값",
      body: R`모든 항이 정수인 등차수열 \(\{a_n\}\)과 모든 항이 양수인 등비수열 \(\{b_n\}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(a_1 = b_1\), \(a_4 = b_2\)`,
        R`(나) 어떤 자연수 \(k\)에 대하여 \(a_k = b_3\)이다.`
      ],
            bodyAfter: R`급수 \(\sum_{n=1}^\infty b_n\)이 수렴할 때, \(\left|\sum_{n=1}^\infty \left(b_n\cos(a_n\pi)\right)\right|\)의 최솟값을 \(m\)이라 하자. \(10\times m\)의 값을 구하시오.`,
short: true,
      answer: 54,
      help: R`등비수열의 공비 \(r=1+\dfrac{3d}{a_1}\)가 \(0&lt;r&lt;1\)임을 이용해 \(d&lt;0\)임을 파악하고 조건 (나)에서 \(k-7=\dfrac{9d}{a_1}\)를 유도한다. \(k=5, 6\) 중 공비 조건과 정수 조건을 만족하는 관계식을 찾고, \(\cos(a_n\pi)=(-1)^{a_n}\)의 부호 규칙에 따른 등비급수를 계산한다. 공차 \(d=-1\)일 때 최솟값 \(m=\dfrac{27}{5}\)을 얻는다.`
    },
    {
      id: "2027-06-calc-30", exam: "2027-06", no: 30, score: 4,
      units: ["calc-diff"], memo: "거듭제곱근 함수의 미분가능성과 삼차함수의 결정",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)에 대하여 함수 \(g(x)\)는
\[g(x)=\sqrt[3]{x(f(x))^2}\]
이다. 함수 \(g(x)\)가 실수 전체의 집합에서 미분가능하고 \(x=\dfrac{19}{7}\)와 \(x=3\)에서 극값을 가질 때, \(f(5)\)의 값을 구하시오.`,
      short: true,
      answer: 20,
      help: R`\(g(x)\)가 실수 전체에서 미분가능하려면 \(x(f(x))^2\)의 실근에서 차수가 3의 배수여야 하므로 \(f(x)=x(x^2+ax+b)\) (단, \(a^2-4b&lt;0\)) 꼴이어야 한다. \(g'(x)=0\)을 정리하면 이차방정식 \(7x^2+5ax+3b=0\)이 나오므로 근과 계수의 관계를 통해 \(a=-8\), \(b=19\)를 구한다. \(f(5)=5\times 4=20\)으로 마무리된다.`
    },
    {
      id: "2026-suneung-calc-28", exam: "2026-suneung", no: 28, score: 4,
      units: ["calc-integ"], memo: "접선의 y절편과 역함수의 정적분",
      body: R`함수
\[f(x)=\dfrac{1}{2}x^2-x+\ln(1+x)\]
와 양수 \(t\)에 대하여 점 \((s, f(s))\,(s>0)\)에서 \(y\)축에 내린 수선의 발과 곡선 \(y=f(x)\) 위의 점 \((s, f(s))\)에서의 접선이 \(y\)축과 만나는 점 사이의 거리가 \(t\)가 되도록 하는 \(s\)의 값을 \(g(t)\)라 하자. \(\int_{\frac{1}{2}}^{\frac{27}{4}} g(t)\,dt\)의 값은?`,
      choices: [R`\(\dfrac{161}{12}+\ln 3\)`, R`\(\dfrac{40}{3}+\ln 3\)`, R`\(\dfrac{53}{4}+\ln 2\)`, R`\(\dfrac{79}{6}+\ln 2\)`, R`\(\dfrac{157}{12}+\ln 2\)`],
      answer: 5,
      help: R`두 점 사이의 거리가 접선의 \(y\)절편 성질에 의해 \(t=s f'(s)=\dfrac{s^3}{1+s}\)임을 파악한다. \(s=g(t)\)는 \(h(s)=\dfrac{s^3}{1+s}\)의 역함수이므로 \(t=h(s)\)로 치환적분하여 적분 구간을 \(s=1\)부터 \(s=3\)까지로 바꾼다. 유리함수의 다항식 나눗셈 \(\dfrac{s^3}{s+1}=s^2-s+1-\dfrac{1}{s+1}\)을 통해 적분을 신속히 완결한다.`
    },
    {
      id: "2026-suneung-calc-29", exam: "2026-suneung", no: 29, score: 4,
      units: ["calc-seq"], memo: "등비중항과 부분분수 급수의 합",
      body: R`첫째항과 공차가 같은 등차수열 \(\{a_n\}\)과 등비수열 \(\{b_n\}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`어떤 자연수 \(k\)에 대하여
\[b_{k+i}=\dfrac{1}{a_i}-1 \quad (i=1, 2, 3)\]
이다.`
      ],
            bodyAfter: R`부등식
\[0 &lt; \sum_{n=1}^\infty \left(b_n - \dfrac{1}{a_n a_{n+1}}\right) &lt; 30\]
이 성립할 때, \(a_2 \times \sum_{n=1}^\infty b_{2n} = \dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(a_1 \ne 0\)이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 97,
      help: R`등비중항 성질 \((b_{k+2})^2=b_{k+1}b_{k+3}\)에 \(a_i=i d\)를 대입하면 공차 \(d=\dfrac{1}{4}\)과 공비 \(r=\dfrac{1}{3}\)이 바로 결정된다. 부분분수 급수 \(\sum\dfrac{1}{a_n a_{n+1}}=16\)을 구한 뒤 부등식을 만족하는 자연수 \(k=2\)를 특정한다. 짝수 번째 항들의 등비급수 합 공식 \(\dfrac{b_2}{1-r^2}\)을 적용하여 답을 계산한다.`
    },
    {
      id: "2026-suneung-calc-30", exam: "2026-suneung", no: 30, score: 4,
      units: ["calc-diff"], memo: "역함수의 성질과 접선의 개수",
      body: R`실수 전체의 집합에서 증가하는 연속함수 \(f(x)\)의 역함수 \(f^{-1}(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(|x| \le 1\)일 때, \(4\times(f^{-1}(x))^2 = x^2(x^2-5)^2\)이다.`,
        R`(나) \(|x| > 1\)일 때, \(|f^{-1}(x)| = e^{|x|-1}+1\)이다.`
      ],
            bodyAfter: R`실수 \(m\)에 대하여 기울기가 \(m\)이고 점 \((1, 0)\)을 지나는 직선이 곡선 \(y=f(x)\)와 만나는 점의 개수를 \(g(m)\)이라 하자. 함수 \(g(m)\)이 \(m=a\), \(m=b\,(a&lt;b)\)에서 불연속일 때,
\[g(a)\times\left(\lim_{m\to a+} g(m)\right) + g(b)\times\left(\dfrac{\ln b}{b}\right)^2\]
의 값을 구하시오. (단, \(\lim_{x\to\infty}\dfrac{\ln x}{x} = 0\))`,
short: true,
      answer: 11,
      help: R`\(f^{-1}(x)\)의 연속성과 증가성을 통해 구간별 식을 결정하고, 원함수 \(y=f(x)\)와 점 \((1, 0)\)을 지나는 직선의 위치관계를 파악한다. \(g(m)\)의 불연속점은 직선이 곡선에 접할 때 발생하므로, 접점 방정식을 풀어 불연속이 되는 기울기 \(a\)와 \(b=1\)을 구한다. 각 경계에서의 교점 개수 \(g(a)=3\), \(\lim_{m\to a+} g(m)=4\), \(g(1)=1\)을 대입하여 답을 계산한다.`
    },
    {
      id: "2026-09-calc-28", exam: "2026-09", no: 28, score: 4,
      units: ["calc-diff"], memo: "삼차함수의 대칭성과 삼각함수 합성 미분",
      body: R`삼차함수 \(f(x)\)와 실수 전체의 집합에서 미분가능한 함수 \(g(x)\)가 모든 실수 \(x\)에 대하여
\[f(x) = g(x) - \tan g(x)\]
이고 다음 조건을 만족시킬 때, \(g'(0)\times(g(0))^2\)의 값은?`,
      note: [
        R`(가) \(f(0)=0\), \(f''(\pi)=0\)`,
        R`(나) \(\sin g(\pi)=0\), \(\lim_{x\to\infty} g(x)=\dfrac{3\pi}{2}\)`
      ],
      choices: [R`\(-12\)`, R`\(-6\)`, R`\(-1\)`, R`\(3\)`, R`\(9\)`],
      answer: 2,
      help: R`\(g(x)\)의 공역이 \(\tan\)가 연속인 구간 \(\left(\dfrac{3\pi}{2},\dfrac{5\pi}{2}\right)\)임을 파악하여 변곡점 \((\pi, 2\pi)\)을 찾고 삼차함수 \(f(x)=\dfrac{2}{\pi^2}(x-\pi)^3+2\pi\)를 결정한다. \(f'(x)=-g'(x)\tan^2 g(x)\)에 \(x=0\)을 대입하면 \(f'(0)=6\)이 성립한다. \(f(0)=0\)에서 \(\tan g(0)=g(0)\)이므로 \(g'(0)\times(g(0))^2=-6\)을 곧바로 얻는다.`
    },
    {
      id: "2026-09-calc-29", exam: "2026-09", no: 29, score: 4,
      units: ["calc-seq"], memo: "유리수 공비 등비수열의 정수 조건과 급수의 합",
      body: R`첫째항이 양수이고 공비가 유리수인 등비수열 \(\{a_n\}\)에 대하여 급수 \(\sum_{n=1}^\infty a_n\)이 수렴하고, 수열 \(\{a_n\}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(a_1 + a_2 &lt; 10\)`,
        R`(나) 수열 \(\{a_n\}\)의 정수인 항의 개수는 \(3\)이고, 이 세 항의 곱은 \(216\)이다.`
      ],
            bodyAfter: R`\(\sum_{n=1}^\infty a_n = \dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 91,
      help: R`등비수열의 항이 정수가 되는 구간은 공비의 분모·분자 거듭제곱 약분 조건에 의해 연속된 세 항으로 한정된다. 세 정수 항의 곱이 양수 \(216\)이고 \(a_1+a_2&lt;10\)을 만족하려면 공비가 음수 \(r=-\dfrac{2}{3}\)이고 정수 항이 \(a_2=-9, a_3=6, a_4=-4\)여야 한다. 첫째항 \(a_1=\dfrac{27}{2}\)을 구하여 등비급수의 합 \(\sum_{n=1}^\infty a_n=\dfrac{81}{10}\)을 도출한다.`
    },
    {
      id: "2026-09-calc-30", exam: "2026-09", no: 30, score: 4,
      units: ["calc-integ"], memo: "미분과 적분의 관계를 이용한 정적분 계산",
      body: R`실수 전체의 집합에서 미분가능한 함수 \(f(x)\)와 실수 전체의 집합에서 연속인 함수 \(g(x)\)는 모든 실수 \(x\)에 대하여
\[f(x)=\ln\left(\dfrac{g(x)}{1+xf'(x)}\right)\]
를 만족시킨다. \(f(1)=4\ln 2\)이고
\[\int_1^2 g(x)\,dx = 34, \quad \int_1^2 xg(x)\,dx = 53\]
일 때, \(\int_1^2 x e^{f(x)}\,dx\)의 값을 구하시오.`,
      short: true,
      answer: 31,
      help: R`조건식을 \(g(x)=e^{f(x)}(1+xf'(x))=\dfrac{d}{dx}\left[x e^{f(x)}\right]\)로 변형하는 것이 핵심이다. \(h(x)=x e^{f(x)}\)라 두면 \(h'(x)=g(x)\)가 되어 \(\int_1^2 g(x)\,dx=h(2)-h(1)=34\)에서 \(h(2)=50\)을 얻는다. \(\int_1^2 x g(x)\,dx\)에 부분적분법을 적용하면 구하는 값 \(\int_1^2 h(x)\,dx=84-53=31\)이 깔끔하게 도출된다.`
    },
    {
      id: "2026-06-calc-28", exam: "2026-06", no: 28, score: 4,
      units: ["calc-diff"], memo: "음함수의 미분과 함수의 부호 판별",
      body: R`실수 전체의 집합에서 이계도함수를 갖는 함수 \(f(x)\)와 두 상수 \(a\), \(b\)가 다음 조건을 만족시킬 때, \(a\times e^{b}\)의 값은?`,
      note: [
        R`(가) 모든 실수 \(x\)에 대하여
\[(f(x))^{5}+(f(x))^{3}+ax+b=\ln\left(x^{2}+x+\frac{5}{2}\right)\]
이다.`,
        R`(나) \(f(-3)f(3)&lt;0\), \(f'(2)&gt;0\)`
      ],
      choices: [R`\(-3e^{-\frac{4}{3}}\)`, R`\(-\dfrac{5}{3}e^{-\frac{4}{3}}\)`, R`\(-\dfrac{1}{3}e^{-\frac{4}{3}}\)`, R`\(e^{-\frac{4}{3}}\)`, R`\(\dfrac{7}{3}e^{-\frac{4}{3}}\)`],
      answer: 1,
      help: R`좌변의 \(h(y)=y^{5}+y^{3}\)이 일대일대응이므로 \(f(x)\)의 부호는 우변식 \(g(x)=\ln(x^{2}+x+\frac{5}{2})-ax-b\)의 부호와 일치합니다. \(f(x)\)가 이계도함수를 가지려면 \(f(x)=0\)인 지점에서 \(g'(x)=0\)이어야 함을 이용하여 \(a\)와 \(b\)를 결정합니다. 조건 (나)의 부호 판별로 여러 후보 중 조건에 맞는 \(a, b\)를 골라내면 됩니다.`
    },
    {
      id: "2026-06-calc-29", exam: "2026-06", no: 29, score: 4,
      units: ["calc-seq"], memo: "삼각함수형 수열과 등비급수의 수렴",
      body: R`두 정수 \(\alpha\), \(\beta\,(\alpha&gt;\beta)\)에 대하여 다음 조건을 만족시키는 수열 \(\{a_{n}\}\)이 있다.
모든 자연수 \(n\)에 대하여
\[a_{n}=\alpha\times\sin\frac{n\pi}{2}+\beta\times\cos\frac{n\pi}{2}\]
이고, \(a_{1}\times a_{2}\times a_{3}\times a_{4}=4\)이다.
수열 \(\{a_{n}\}\)과 \(b_{1}&gt;0\)인 등비수열 \(\{b_{n}\}\)에 대하여
\[\sum_{n=1}^{\infty}\left(a_{4n-2}b_{n}\right)=\sum_{n=1}^{\infty}\left(a_{4n-3}b_{2n}\right)=6\]
일 때, \(b_{1}\times b_{3}=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 109,
      help: R`\(a_{n}\)에 \(n=1,2,3,4\)를 대입하면 \(a_{1}=\alpha, a_{2}=-\beta, a_{3}=-\alpha, a_{4}=\beta\)로 4주기를 가집니다. \(\alpha^{2}\beta^{2}=4\)와 \(\alpha&gt;\beta\)에서 가능한 정수 순서쌍 중 급수가 수렴할 조건 \(|r|&lt;1\)을 만족하는 것은 \((\alpha, \beta)=(-1, -2)\)뿐입니다. 등비급수 공식으로 \(b_{1}=5, r=-\frac{2}{3}\)을 구하면 \(b_{1}b_{3}=\frac{100}{9}\)가 나옵니다.`
    },
    {
      id: "2026-06-calc-30", exam: "2026-06", no: 30, score: 4,
      units: ["calc-diff"], memo: "시그모이드 합성함수의 미분가능성과 극값",
      body: R`최고차항의 계수가 \(1\)인 삼차함수 \(f(x)\)에 대하여 함수
\[g(x)=\left|f\left(\frac{2}{1+e^{-x}}\right)\right|\]
가 실수 전체의 집합에서 미분가능하고 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 함수 \(g(x)\)는 \(x=0\)에서 극소이고, \(g(0)&gt;0\)이다.`,
        R`(나) \(g'(\ln 3)&lt;0\), \(\left|g'(-\ln 3)\right|=\dfrac{3}{8}g(-\ln 3)\)`
      ],
            bodyAfter: R`\(g(0)\)의 최솟값을 \(\dfrac{q}{p}\)라 할 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 25,
      help: R`\(u(x)=\frac{2}{1+e^{-x}}\)는 \((0, 2)\)로 치역을 갖는 단조증가함수이고 \(u(0)=1\)입니다. \(g(0)&gt;0\)과 미분가능성으로부터 절댓값 안의 \(f(u)\)의 부호가 일정해야 하며, 극소 조건과 도함수 부호 조건으로부터 삼차함수 \(f(u)\)의 개형을 확정합니다. \(u(-\ln 3)=\frac{1}{2}, u(\ln 3)=\frac{3}{2}\)에서의 관계식을 연립하여 \(g(0)\)의 최솟값을 계산합니다.`
    },
    {
      id: "2025-suneung-calc-28", exam: "2025-suneung", no: 28, score: 4,
      units: ["calc-integ", "calc-diff"], memo: "접선과 곡선으로 둘러싸인 도형의 넓이와 도함수",
      body: R`실수 전체의 집합에서 미분가능한 함수 \(f(x)\)의 도함수 \(f'(x)\)가
\[f'(x)=-x+e^{1-x^{2}}\]
이다. 양수 \(t\)에 대하여 곡선 \(y=f(x)\) 위의 점 \((t,\,f(t))\)에서의 접선과 곡선 \(y=f(x)\) 및 \(y\)축으로 둘러싸인 부분의 넓이를 \(g(t)\)라 하자. \(g(1)+g'(1)\)의 값은?`,
      choices: [R`\(\dfrac{1}{2}e+\dfrac{1}{2}\)`, R`\(\dfrac{1}{2}e+\dfrac{2}{3}\)`, R`\(\dfrac{1}{2}e+\dfrac{5}{6}\)`, R`\(\dfrac{2}{3}e+\dfrac{1}{2}\)`, R`\(\dfrac{2}{3}e+\dfrac{2}{3}\)`],
      answer: 2,
      help: R`\(x&gt;0\)에서 \(f''(x)&lt;0\)이므로 접선이 곡선보다 항상 위쪽에 있어 \(g(t)=\int_{0}^{t} \left(f'(t)(x-t)+f(t)-f(x)\\right)dx\)로 세워집니다. \(g(t)\)를 \(t\)에 대해 미분하면 라이프니츠 규칙에 의해 \(g'(t)=-\frac{t^{2}}{2}f''(t)\)로 대폭 단순화됩니다. \(g(1)\)은 부분적분을 활용하여 \(f(1)\) 없이 \(\int_{0}^{1} x f'(x)dx\)만으로 깔끔하게 계산할 수 있습니다.`
    },
    {
      id: "2025-suneung-calc-29", exam: "2025-suneung", no: 29, score: 4,
      units: ["calc-seq"], memo: "등비급수의 성질과 부호 교대 급수 부등식",
      body: R`등비수열 \(\{a_{n}\}\)이
\[\sum_{n=1}^{\infty}\left(|a_{n}|+a_{n}\right)=\frac{40}{3},\qquad \sum_{n=1}^{\infty}\left(|a_{n}|-a_{n}\right)=\frac{20}{3}\]
을 만족시킨다. 부등식
\[\lim_{n\to\infty}\sum_{k=1}^{2n}\left((-1)^{\frac{k(k+1)}{2}}\times a_{m+k}\right)&gt;\frac{1}{700}\]
을 만족시키는 모든 자연수 \(m\)의 값의 합을 구하시오.`,
      short: true,
      answer: 25,
      help: R`\(|a_{n}|+a_{n}\)과 \(|a_{n}|-a_{n}\)의 합이 모두 양수이므로 공비가 음수(\(r&lt;0\))임을 바로 파악하여 \(a_{1}=5, r=-\frac{1}{2}\)을 구합니다. \((-1)^{\frac{k(k+1)}{2}}\)은 부호가 \(-, -, +, +\)로 4주기 순환하므로 4개 항씩 묶어 등비급수를 계산하면 합이 \(-2(-\frac{1}{2})^{m}\)이 됩니다. 합이 양수가 되려면 \(m\)이 홀수여야 하므로 \(2^{m-1}&lt;700\)을 만족하는 홀수 \(m=1, 3, 5, 7, 9\)의 합 25를 구합니다.`
    },
    {
      id: "2025-suneung-calc-30", exam: "2025-suneung", no: 30, score: 4,
      units: ["calc-diff"], memo: "삼각함수 합성함수의 주기성과 극대점",
      body: R`두 상수 \(a\,(1\le a\le 2)\), \(b\)에 대하여 함수
\[f(x)=\sin(ax+b+\sin x)\]
가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(f(0)=0\), \(f(2\pi)=2\pi a+b\)`,
        R`(나) \(f'(0)=f'(t)\)인 양수 \(t\)의 최솟값은 \(4\pi\)이다.`
      ],
            bodyAfter: R`함수 \(f(x)\)가 \(x=\alpha\)에서 극대인 \(\alpha\)의 값 중 열린구간 \((0,\,4\pi)\)에 속하는 모든 값의 집합을 \(A\)라 하자. 집합 \(A\)의 원소의 개수를 \(n\), 집합 \(A\)의 원소 중 가장 작은 값을 \(\alpha_{1}\)이라 하면,
\[n\alpha_{1}-ab=\frac{q}{p}\pi\]
이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 17,
      help: R`\(-1\le \sin\theta\le 1\)과 \(\sin\theta=\theta\)의 유일해 성질로부터 \(2\pi a+b=0\)이어야 하므로 \(b=-2\pi a\)이고 \(\sin(-2\pi a)=0\)에서 \(a=\frac{3}{2}, b=-3\pi\)가 결정됩니다. \(f'(x)\\)의 곱 형태에서 최솟값 \(4\pi\) 조건을 만족함을 검산하고, \(f(x)=-\sin(\frac{3}{2}x+\sin x)\)의 극대점들을 \(\frac{3}{2}x+\sin x\)의 값의 범위에서 찾아내면 \(n=3\)과 \(\alpha_{1}\)을 얻어 \(p+q=17\)이 나옵니다.`
    },
    {
      id: "2025-09-calc-28", exam: "2025-09", no: 28, score: 4,
      units: ["calc-integ"], memo: "역함수의 정적분과 부분적분법",
      body: R`함수 \(f(x)\)는 실수 전체의 집합에서 연속인 이계도함수를 갖고, 실수 전체의 집합에서 정의된 함수 \(g(x)\)를
\[g(x)=f'(2x)\sin\pi x+x\]
라 하자. 함수 \(g(x)\)는 역함수 \(g^{-1}(x)\)를 갖고,
\[\int_{0}^{1} g^{-1}(x)\,dx = 2\int_{0}^{1} f'(2x)\sin\pi x\,dx + \frac{1}{4}\]
을 만족시킬 때, \(\displaystyle\int_{0}^{2} f(x)\cos\frac{\pi}{2}x\,dx\)의 값은?`,
      choices: [R`\(-\dfrac{1}{\pi}\)`, R`\(-\dfrac{1}{2\pi}\)`, R`\(-\dfrac{1}{3\pi}\)`, R`\(-\dfrac{1}{4\pi}\)`, R`\(-\dfrac{1}{5\pi}\)`],
      answer: 3,
      help: R`\(g(0)=0, g(1)=1\)이므로 역함수의 정적분 성질 \(\int_{0}^{1} g^{-1}(x)dx + \int_{0}^{1} g(x)dx = 1\)을 적용하면 \(\int_{0}^{1} f'(2x)\sin\pi x dx = \frac{1}{12}\)을 바로 얻을 수 있습니다. 구하는 정적분은 \(x=2t\)로 치환적분한 뒤 부분적분법을 적용하면 \(\int_{0}^{1} f'(2t)\sin\pi t dt\)의 식으로 변환되어 쉽게 답이 나옵니다.`
    },
    {
      id: "2025-09-calc-29", exam: "2025-09", no: 29, score: 4,
      units: ["calc-seq"], memo: "급수로 정의된 수열의 합과 부분분수",
      body: R`수열 \(\{a_{n}\}\)의 첫째항부터 제\(m\)항까지의 합을 \(S_{m}\)이라 하자. 모든 자연수 \(m\)에 대하여
\[S_{m}=\sum_{n=1}^{\infty}\frac{m+1}{n(n+m+1)}\]
일 때, \(a_{1}+a_{10}=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 57,
      help: R`급수의 일반항을 부분분수로 분해하면 \(\frac{m+1}{n(n+m+1)}=\frac{1}{n}-\frac{1}{n+m+1}\)이 되어 소거 후 \(S_{m}=\sum_{k=1}^{m+1}\frac{1}{k}\)로 간단히 정리됩니다. 수열의 합과 일반항의 관계에서 \(a_{1}=S_{1}=1+\frac{1}{2}=\frac{3}{2}\)이고, \(m\ge 2\)일 때 \(a_{m}=S_{m}-S_{m-1}=\frac{1}{m+1}\)임을 이용해 \(a_{10}=\frac{1}{11}\)을 구합니다.`
    },
    {
      id: "2025-09-calc-30", exam: "2025-09", no: 30, score: 4,
      units: ["calc-integ", "calc-diff"], memo: "절댓값 함수를 도함수로 갖는 함수의 부등식과 최솟값",
      body: R`양수 \(k\)에 대하여 함수 \(f(x)\)를
\[f(x)=(k-|x|)e^{-x}\]
이라 하자. 실수 전체의 집합에서 미분가능하고 다음 조건을 만족시키는 모든 함수 \(F(x)\)에 대하여 \(F(0)\)의 최솟값을 \(g(k)\)라 하자.`,
      note: [
        R`모든 실수 \(x\)에 대하여 \(F'(x)=f(x)\)이고 \(F(x)\ge f(x)\)이다.`
      ],
            bodyAfter: R`\(g\left(\dfrac{1}{4}\right)+g\left(\dfrac{3}{2}\) = pe+q\)일 때, \(100(p+q)\)의 값을 구하시오. (단, \(\displaystyle\lim_{x\to\infty}xe^{-x}=0\)이고, \(p\)와 \(q\)는 유리수이다.)`,
short: true,
      answer: 25,
      help: R`\(F'(x)=f(x)\)이므로 \(F(x)\)는 \(f(x)\)의 부정적분이며, \(F(x)\ge f(x)\)는 차함수 \(H(x)=F(x)-f(x)\)의 최솟값이 0 이상이라는 조건입니다. \(H'(x)=f(x)-f'(x)=0\)이 되는 극소 후보점과 \(x=0\)에서의 연속성을 이용해 \(F(0)\)의 최솟값 \(g(k)\)를 구합니다. \(k=\frac{1}{4}\)과 \(k=\frac{3}{2}\)일 때 극값의 위치를 나누어 계산하면 \(100(p+q)=25\)를 얻습니다.`
    },
    {
      id: "2025-06-calc-28", exam: "2025-06", no: 28, score: 4,
      units: ["calc-diff"], memo: "구간별 정의된 함수의 역함수적 최솟값과 미분계수",
      body: R`함수 \(f(x)\)가
\[f(x)=\begin{cases} (x-a-2)^{2}e^{x} &amp; (x\ge a) \\ e^{2a}(x-a)+4e^{a} &amp; (x&lt;a) \end{cases}\]
일 때, 실수 \(t\)에 대하여 \(f(x)=t\)를 만족시키는 \(x\)의 최솟값을 \(g(t)\)라 하자. 함수 \(g(t)\)가 \(t=12\)에서만 불연속일 때, \(\dfrac{g'(f(a+2))}{g'(f(a+6))}\)의 값은? (단, \(a\)는 상수이다.)`,
      choices: [R`\(6e^{4}\)`, R`\(9e^{4}\)`, R`\(12e^{4}\)`, R`\(8e^{6}\)`, R`\(10e^{6}\)`],
      answer: 4,
      help: R`\(f(x)=t\)를 만족시키는 최솟값 \(g(t)\)는 직선 영역(\(x&lt;a\))의 최댓값 \(4e^{a}\)에서 불연속이 발생하므로 \(4e^{a}=12\)에서 \(e^{a}=3\)을 얻습니다. \(f(a+2)=0&lt;12\)이므로 \(g'(f(a+2))\)는 직선의 기울기의 역수 \(e^{-2a}\)이고, \(f(a+6)&gt;12\)이므로 \(g'(f(a+6))\)는 곡선의 접선의 기울기의 역수 \(\frac{1}{f'(a+6)}\)입니다. 두 값을 대입하여 나누면 \(8e^{6}\)이 나옵니다.`
    },
    {
      id: "2025-06-calc-29", exam: "2025-06", no: 29, score: 4,
      units: ["calc-diff"], memo: "평행이동과 대칭으로 정의된 함수의 미분가능성",
      body: R`함수 \(f(x)=\dfrac{1}{3}x^{3}-x^{2}+\ln(1+x^{2})+a\,(a\text{는 상수})\)와 두 양수 \(b\), \(c\)에 대하여 함수
\[g(x)=\begin{cases} f(x) &amp; (x\ge b) \\ -f(x-c) &amp; (x&lt;b) \end{cases}\]
는 실수 전체의 집합에서 미분가능하다. \(a+b+c=p+q\ln 2\)일 때, \(30(p+q)\)의 값을 구하시오. (단, \(p\), \(q\)는 유리수이고, \(\ln 2\)는 무리수이다.)`,
      short: true,
      answer: 55,
      help: R`도함수를 통분하면 \(f'(x)=\frac{x^{2}(x-1)^{2}}{x^{2}+1}\ge 0\)이 되어 항상 0 이상입니다. \(x=b\)에서 미분가능하려면 \(f'(b)=-f'(b-c)\\)이어야 하므로 두 도함수 값이 모두 0이어야 하고, \(b&gt;0, c&gt;0\)에서 \(b=1, c=1\)이 바로 도출됩니다. 연속 조건 \(f(1)+f(0)=0\)으로 \(a=\frac{1}{3}-\frac{1}{2}\ln 2\)를 구하면 \(30(p+q)=55\)가 나옵니다.`
    },
    {
      id: "2025-06-calc-30", exam: "2025-06", no: 30, score: 4,
      units: ["calc-diff", "calc-seq"], memo: "삼각방정식의 실근의 극한과 삼각함수의 극한",
      body: R`함수 \(y=\dfrac{\sqrt{x}}{10}\)의 그래프와 함수 \(y=\tan x\)의 그래프가 만나는 모든 점의 \(x\)좌표를 작은 수부터 크기순으로 나열할 때, \(n\)번째 수를 \(a_{n}\)이라 하자.
\[\frac{1}{\pi^{2}}\times \lim_{n\to\infty} a_{n}^{3}\tan^{2}(a_{n+1}-a_{n})\]
의 값을 구하시오.`,
      short: true,
      answer: 25,
      help: R`\(a_{n}\to\infty\)일 때 \(\tan a_{n}=\frac{\sqrt{a_{n}}}{10}\to\infty\)이므로 \(a_{n}\)은 점근선에 가까워져 \(a_{n}=n\pi-\delta_{n}\) (\(\tan\delta_{n}=\frac{10}{\sqrt{a_{n}}}\)) 형태로 놓을 수 있습니다. \(\tan(a_{n+1}-a_{n})=-\tan(\delta_{n+1}-\delta_{n})\)이며, \(\delta_{n}\approx \frac{10}{\sqrt{a_{n}}}\)의 차분을 유리화하여 근사하면 \(\delta_{n}-\delta_{n+1}\approx \frac{5\pi}{a_{n}^{3/2}}\)가 유도됩니다. 이를 식에 대입하면 극한값이 \(25\pi^{2}\)이 되어 답 25를 쉽게 얻을 수 있습니다.`
    },
    {
      id: "2024-suneung-calc-28", exam: "2024-suneung", no: 28, score: 4,
      units: ["calc-integ"], memo: "역함수 관계식과 치환적분을 이용한 함수 결정",
      body: R`실수 전체의 집합에서 연속인 함수 \(f(x)\)가 모든 실수 \(x\)에 대하여 \(f(x)\ge 0\)이고, \(x&lt;0\)일 때 \(f(x)=-4xe^{4x^2}\)이다.
모든 양수 \(t\)에 대하여 \(x\)에 대한 방정식 \(f(x)=t\)의 서로 다른 실근의 개수는 \(2\)이고, 이 방정식의 두 실근 중 작은 값을 \(g(t)\), 큰 값을 \(h(t)\)라 하자.
두 함수 \(g(t)\), \(h(t)\)는 모든 양수 \(t\)에 대하여
\[2g(t)+h(t)=k\quad(k\text{는 상수})\]
를 만족시킨다. \(\displaystyle\int_{0}^{7} f(x)\,dx=e^4-1\)일 때, \(\dfrac{f(9)}{f(8)}\)의 값은?`,
      choices: [R`\(\dfrac{3}{2}e^5\)`, R`\(\dfrac{4}{3}e^7\)`, R`\(\dfrac{5}{4}e^9\)`, R`\(\dfrac{6}{5}e^{11}\)`, R`\(\dfrac{7}{6}e^{13}\)`],
      answer: 2,
      help: R`\(x&lt;0\)에서 \(g(t)\)를 알 때 \(h(t)=k-2g(t)\)를 통해 \(x>k\) 구간의 \(f(x)=2(x-k)e^{(x-k)^2}\)를 합성함수 형태로 구합니다. \(t\to 0+\)일 때 \(g(t)\to 0\)이므로 \(0\le x\le k\)에서 \(f(x)=0\)임을 파악하고, \(\int_k^7 f(x)dx=e^4-1\)에서 \(k=5\)를 결정하여 계산합니다.`
    },
    {
      id: "2024-suneung-calc-29", exam: "2024-suneung", no: 29, score: 4,
      units: ["calc-seq"], memo: "등비급수의 수렴 조건과 연립 방정식",
      body: R`첫째항과 공비가 각각 \(0\)이 아닌 두 등비수열 \(\{a_n\}\), \(\{b_n\}\)에 대하여 두 급수 \(\displaystyle\sum_{n=1}^{\infty} a_n\), \(\displaystyle\sum_{n=1}^{\infty} b_n\)이 각각 수렴하고
\[\sum_{n=1}^{\infty} a_n b_n = \left(\sum_{n=1}^{\infty} a_n\right) \times \left(\sum_{n=1}^{\infty} b_n\right),\]
\[3\times\sum_{n=1}^{\infty} |a_{2n}| = 7\times\sum_{n=1}^{\infty} |a_{3n}|\]
이 성립한다. \(\displaystyle\sum_{n=1}^{\infty} \frac{b_{2n-1}+b_{3n+1}}{b_n} = S\)일 때, \(120S\)의 값을 구하시오.`,
      short: true,
      answer: 162,
      help: R`두 급수의 곱 공식과 곱의 급수 공식으로부터 \(r_a+r_b=2r_a r_b\) 관계식을 세웁니다. \(|a_{2n}|\)과 \(|a_{3n}|\)의 급수식에서 \(|r_a|=\dfrac{1}{2}\)을 얻고, \(r_a=\dfrac{1}{2}\)일 때의 모순을 배제하여 \(r_a=-\dfrac{1}{2}, r_b=\dfrac{1}{4}\)로 \(S\)를 정확히 계산합니다.`
    },
    {
      id: "2024-suneung-calc-30", exam: "2024-suneung", no: 30, score: 4,
      units: ["calc-diff"], memo: "정적분으로 정의된 함수의 극값과 도함수의 극대·극소",
      body: R`실수 전체의 집합에서 미분가능한 함수 \(f(x)\)의 도함수 \(f'(x)\)가
\[f'(x) = |\sin x|\cos x\]
이다. 양수 \(a\)에 대하여 곡선 \(y=f(x)\) 위의 점 \((a, f(a))\)에서의 접선의 방정식을 \(y=g(x)\)라 하자. 함수
\[h(x) = \int_{0}^{x} \{f(t)-g(t)\}\,dt\]
가 \(x=a\)에서 극대 또는 극소가 되도록 하는 모든 양수 \(a\)를 작은 수부터 크기순으로 나열할 때, \(n\)번째 수를 \(a_n\)이라 하자.
\(\dfrac{100}{\pi} \times (a_6 - a_2)\)의 값을 구하시오.`,
      short: true,
      answer: 125,
      help: R`\(h'(x)=f(x)-g(x)\)가 \(x=a\)에서 부호를 바꾸려면 접선이 곡선을 관통해야 하므로, \(a\)는 도함수 \(f'(x)\)의 극대 또는 극소이어야 합니다. \(f'(x)=|\sin x|\cos x\)의 개형에서 삼각함수의 극값뿐 아니라 연결점인 정수\(\times\pi\)도 극값에 해당함을 주의하여 \(a_2=\dfrac{3\pi}{4}, a_6=2\pi\)를 구합니다.`
    },
    {
      id: "2024-09-calc-28", exam: "2024-09", no: 28, score: 4,
      units: ["calc-integ"], memo: "정적분 함수 절댓값의 미분가능성과 주기함수 적분",
      body: R`실수 \(a\,(0 &lt; a &lt; 2)\)에 대하여 함수 \(f(x)\)를
\[f(x) = \begin{cases} 2|\sin 4x| &amp; (x &lt; 0) \\ -\sin ax &amp; (x \ge 0) \end{cases}\]
이라 하자. 함수
\[g(x) = \left| \int_{-a\pi}^{x} f(t)\,dt \right|\]
가 실수 전체의 집합에서 미분가능할 때, \(a\)의 최솟값은?`,
      choices: [R`\(\dfrac{1}{2}\)`, R`\(\dfrac{3}{4}\)`, R`\(1\)`, R`\(\dfrac{5}{4}\)`, R`\(\dfrac{3}{2}\)`],
      answer: 2,
      help: R`\(F(x)=\int_{-a\pi}^x f(t)dt\)의 절댓값이 미분가능하려면 \(F(-a\pi)=0\)에서 \(f(-a\pi)=0\)이어야 하므로 \(a=\dfrac{m}{4}\) 형태이어야 합니다. \(x\ge 0\)에서 \(F(x)=m+\dfrac{\cos ax - 1}{a}\)의 최솟값이 \(0\) 이상이 되도록 \(m-\dfrac{2}{a} \ge 0 \iff m^2 \ge 8\)로부터 최소 정수 \(m=3\), 즉 \(a=\dfrac{3}{4}\)을 찾습니다.`
    },
    {
      id: "2024-09-calc-29", exam: "2024-09", no: 29, score: 4,
      units: ["calc-seq"], memo: "밑의 크기에 따른 등비수열의 극한과 미정계수 결정",
      body: R`두 실수 \(a\), \(b\,(a > 1,\,b > 1)\)이
\[\lim_{n \to \infty} \frac{3^n + a^{n+1}}{3^{n+1} + a^n} = a, \quad \lim_{n \to \infty} \frac{a^n + b^{n+1}}{a^{n+1} + b^n} = \frac{9}{a}\]
를 만족시킬 때, \(a+b\)의 값을 구하시오.`,
      short: true,
      answer: 18,
      help: R`첫 번째 극한에서 \(a\)와 \(3\)의 대소 관계를 비교하여 \(a>3\)임을 먼저 확정합니다. 두 번째 극한에서 \(b&lt;a, b=a, b>a\) 세 경우의 극한값을 분석하여 모순이 발생하지 않는 유일한 조건인 \(a=b=9\)를 도출합니다.`
    },
    {
      id: "2024-09-calc-30", exam: "2024-09", no: 30, score: 4,
      units: ["calc-diff"], memo: "원과 삼각형의 넓이에 대한 음함수의 미분법",
      body: R`길이가 \(10\)인 선분 \(\mathrm{AB}\)를 지름으로 하는 원과 선분 \(\mathrm{AB}\) 위에 \(\overline{\mathrm{AC}}=4\)인 점 \(\mathrm{C}\)가 있다. 이 원 위의 점 \(\mathrm{P}\)를 \(\angle\mathrm{PCB}=\theta\)가 되도록 잡고, 점 \(\mathrm{P}\)를 지나고 선분 \(\mathrm{AB}\)에 수직인 직선이 이 원과 만나는 점 중 \(\mathrm{P}\)가 아닌 점을 \(\mathrm{Q}\)라 하자. 삼각형 \(\mathrm{PCQ}\)의 넓이를 \(S(\theta)\)라 할 때, \(-7 \times S'\!\left(\dfrac{\pi}{4}\right)\)의 값을 구하시오. \(\left(\text{단, } 0 &lt; \theta &lt; \dfrac{\pi}{2}\right)\)`,
      figure: "2024-09-calc-30.webp",
      short: true,
      answer: 32,
      help: R`원의 중심을 원점으로 두면 \(\mathrm{C}(-1,0)\)이고 \(\mathrm{P}(x,y)\)에 대해 \(y=(x+1)\tan\theta\), 넓이 \(S(\theta)=(x+1)^2\tan\theta\)가 됩니다. \(\theta=\dfrac{\pi}{4}\)일 때 \(x=3\)을 구하고, 원의 방정식 \(x^2+(x+1)^2\tan^2\theta=25\)를 \(\theta\)로 음함수 미분하여 \(\dfrac{dx}{d\theta}=-\dfrac{32}{7}\)를 구한 뒤 \(S'\)에 대입합니다.`
    },
    {
      id: "2024-06-calc-28", exam: "2024-06", no: 28, score: 4,
      units: ["calc-diff"], memo: "완전제곱 변형과 연속함수 성질을 이용한 미정계수 결정",
      body: R`두 상수 \(a\,(a > 0)\), \(b\)에 대하여 실수 전체의 집합에서 연속인 함수 \(f(x)\)가 다음 조건을 만족시킬 때, \(a \times b\)의 값은?`,
      note: [
        R`(가) 모든 실수 \(x\)에 대하여
\[\{f(x)\}^2 + 2f(x) = a\cos^3 \pi x \times e^{\sin^2 \pi x} + b\]
이다.`,
        R`(나) \(f(0) = f(2) + 1\)`
      ],
      choices: [R`\(-\dfrac{1}{16}\)`, R`\(-\dfrac{7}{64}\)`, R`\(-\dfrac{5}{32}\)`, R`\(-\dfrac{13}{64}\)`, R`\(-\dfrac{1}{4}\)`],
      answer: 2,
      help: R`조건 (가)의 좌변을 \(\{f(x)+1\}^2\)으로 완전제곱 변형하고 조건 (나)와 \(g(0)=g(2)\)로부터 \(f(0)+1=\dfrac{1}{2}, f(2)+1=-\dfrac{1}{2}\)임을 찾습니다. \(f(x)+1\)이 연속이므로 부호가 바뀌는 지점에서 우변식의 최솟값이 \(0\)이어야 함을 이용하여 \(t=\cos\pi x=-1\)일 때의 값을 연립합니다.`
    },
    {
      id: "2024-06-calc-29", exam: "2024-06", no: 29, score: 4,
      units: ["calc-diff"], memo: "직선 위의 교점과 음함수 미분법을 이용한 접선의 수직 조건",
      body: R`세 실수 \(a\), \(b\), \(k\)에 대하여 두 점 \(\mathrm{A}(a, a+k)\), \(\mathrm{B}(b, b+k)\)가 곡선 \(C : x^2 - 2xy + 2y^2 = 15\) 위에 있다. 곡선 \(C\) 위의 점 \(\mathrm{A}\)에서의 접선과 곡선 \(C\) 위의 점 \(\mathrm{B}\)에서의 접선이 서로 수직일 때, \(k^2\)의 값을 구하시오. (단, \(a+2k \neq 0\), \(b+2k \neq 0\))`,
      short: true,
      answer: 5,
      help: R`직선 \(y=x+k\)를 곡선 방정식에 대입하여 \(x^2+2kx+2k^2-15=0\)에서 근과 계수의 관계를 세웁니다. 곡선을 음함수 미분하여 접선의 기울기 \(y'=\dfrac{y-x}{2y-x}=\dfrac{k}{x+2k}\)를 구하고, 두 접선의 기울기 곱이 \(-1\)임을 이용하여 \(k^2=5\)를 구합니다.`
    },
    {
      id: "2024-06-calc-30", exam: "2024-06", no: 30, score: 4,
      units: ["calc-seq"], memo: "구간별로 정의된 수열의 등비급수와 공비의 부호",
      body: R`수열 \(\{a_n\}\)은 등비수열이고, 수열 \(\{b_n\}\)을 모든 자연수 \(n\)에 대하여
\[b_n = \begin{cases} -1 &amp; (a_n \le -1) \\ a_n &amp; (a_n > -1) \end{cases}\]
이라 할 때, 수열 \(\{b_n\}\)은 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 급수 \(\displaystyle\sum_{n=1}^{\infty} b_{2n-1}\)은 수렴하고 그 합은 \(-3\)이다.`,
        R`(나) 급수 \(\displaystyle\sum_{n=1}^{\infty} b_{2n}\)은 수렴하고 그 합은 \(8\)이다.`
      ],
            bodyAfter: R`\(b_3 = -1\)일 때, \(\displaystyle\sum_{n=1}^{\infty} |a_n|\)의 값을 구하시오.`,
short: true,
      answer: 24,
      help: R`\(\sum b_{2n}=8>0\)과 \(b_3=-1\)로부터 \(a&lt;0, -1&lt;r&lt;0\)임을 파악하여 모든 짝수항은 \(b_{2n}=a_{2n}\)임을 확인합니다. 홀수항에서는 \(b_1=b_3=-1\)이고 \(n\ge 3\)부터 \(b_{2n-1}=a_{2n-1}\)이 됨을 이용해 \(r=-\dfrac{1}{2}, a=-12\)를 구하여 급수의 합 \(24\)를 도출합니다.`
    },
    {
      id: "2023-suneung-calc-28", exam: "2023-suneung", no: 28, score: 4,
      units: ["calc-diff"], memo: "삼각함수의 극한과 사다리꼴의 넓이",
      body: R`그림과 같이 중심이 \(\mathrm{O}\)이고 길이가 \(2\)인 선분 \(\mathrm{AB}\)를 지름으로 하는 반원 위에 \(\angle\mathrm{AOC}=\dfrac{\pi}{2}\)인 점 \(\mathrm{C}\)가 있다.
호 \(\mathrm{BC}\) 위에 점 \(\mathrm{P}\)와 호 \(\mathrm{CA}\) 위에 점 \(\mathrm{Q}\)를 \(\overline{\mathrm{PB}}=\overline{\mathrm{QC}}\)가 되도록 잡고, 선분 \(\mathrm{AP}\) 위에 점 \(\mathrm{R}\)를 \(\angle\mathrm{CQR}=\dfrac{\pi}{2}\)가 되도록 잡는다.
선분 \(\mathrm{AP}\)와 선분 \(\mathrm{CO}\)의 교점을 \(\mathrm{S}\)라 하자. \(\angle\mathrm{PAB}=\theta\)일 때, 삼각형 \(\mathrm{POB}\)의 넓이를 \(f(\theta)\), 사각형 \(\mathrm{CQRS}\)의 넓이를 \(g(\theta)\)라 하자. \(\displaystyle\lim_{\theta \to 0+} \frac{3f(\theta)-2g(\theta)}{\theta^2}\)의 값은? \(\left(\text{단, } 0 &lt; \theta &lt; \dfrac{\pi}{4}\right)\)`,
      figure: "2023-suneung-calc-28.webp",
      choices: [R`\(1\)`, R`\(2\)`, R`\(3\)`, R`\(4\)`, R`\(5\)`],
      answer: 2,
      help: R`\(\overline{\mathrm{PB}}=\overline{\mathrm{QC}}=2\sin\theta\)와 방향각 관계로부터 \(\overline{\mathrm{QC}}\)가 선분 \(\mathrm{AP}\)와 평행함을 파악하여 사각형 \(\mathrm{CQRS}\)를 직각사다리꼴로 해석합니다. \(f(\theta)=\sin\theta\cos\theta\)와 \(g(\theta)=\dfrac{1}{2}(3\sin\theta+\tan\theta\sin\theta)(\cos\theta-\sin\theta)\)의 식을 전개하여 분자의 \(\theta^2\) 최고차 계수 \(2\)를 구합니다.`
    },
    {
      id: "2023-suneung-calc-29", exam: "2023-suneung", no: 29, score: 4,
      units: ["calc-integ"], memo: "역함수의 정적분과 지수함수의 극한을 이용한 미정계수 결정",
      body: R`세 상수 \(a\), \(b\), \(c\)에 대하여 함수 \(f(x) = ae^{2x} + be^x + c\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(\displaystyle\lim_{x \to -\infty} \frac{f(x)+6}{e^x} = 1\)`,
        R`(나) \(f(\ln 2) = 0\)`
      ],
            bodyAfter: R`함수 \(f(x)\)의 역함수를 \(g(x)\)라 할 때,
\[\int_{0}^{14} g(x)\,dx = p + q\ln 2\]
이다. \(p+q\)의 값을 구하시오. (단, \(p\), \(q\)는 유리수이고, \(\ln 2\)는 무리수이다.)`,
short: true,
      answer: 26,
      help: R`조건 (가)의 극한 수렴 조건에서 \(c=-6, b=1\)을 얻고 조건 (나)에서 \(a=1\)을 찾아 \(f(x)=e^{2x}+e^x-6\)을 완성합니다. 역함수의 정적분은 직사각형 넓이와 원래 함수의 적분을 이용한 \(\int_0^{14} g(x)dx = 14(2\ln 2) - \int_{\ln 2}^{2\ln 2} f(x)dx\) 공식으로 신속히 계산합니다.`
    },
    {
      id: "2023-suneung-calc-30", exam: "2023-suneung", no: 30, score: 4,
      units: ["calc-diff"], memo: "합성함수의 극대 조건과 삼각방정식의 실근 개수",
      body: R`최고차항의 계수가 양수인 삼차함수 \(f(x)\)와 함수 \(g(x) = e^{\sin \pi x} - 1\)에 대하여 실수 전체의 집합에서 정의된 합성함수 \(h(x) = g(f(x))\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 함수 \(h(x)\)는 \(x=0\)에서 극댓값 \(0\)을 갖는다.`,
        R`(나) 열린구간 \((0, 3)\)에서 방정식 \(h(x)=1\)의 서로 다른 실근의 개수는 \(7\)이다.`
      ],
            bodyAfter: R`\(f(3) = \dfrac{1}{2}\), \(f'(3) = 0\)일 때, \(f(2) = \dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 31,
      help: R`\(h(0)=0\)이 극대가 되기 위해 \(f(0)=k\)가 짝수이어야 하고, \(f'(0)=0, f'(3)=0\)에서 \(f(x)\)가 구간 \((0,3)\)에서 \(k\)부터 \(1/2\)까지 단조감소함을 파악합니다. \((1/2, k)\)에서 \(\sin(\pi u)=\ln 2\)의 근이 7개 생기도록 \(k=8\)을 결정한 뒤 삼차함수 식을 완성하여 \(f(2)=\dfrac{22}{9}\)를 구합니다.`
    },
    {
      id: "2023-09-calc-28", exam: "2023-09", no: 28, score: 4,
      units: ["calc-seq", "calc-diff"], memo: "삼각함수의 극한과 도형의 넓이",
      body: R`그림과 같이 반지름의 길이가 \(1\)이고 중심각의 크기가 \(\dfrac{\pi}{2}\)인 부채꼴 \(\mathrm{OAB}\)가 있다. 호 \(\mathrm{AB}\) 위의 점 \(\mathrm{P}\)에 대하여 \(\overline{\mathrm{PA}}=\overline{\mathrm{PC}}=\overline{\mathrm{PD}}\)가 되도록 호 \(\mathrm{PB}\) 위에 점 \(\mathrm{C}\)와 선분 \(\mathrm{OA}\) 위에 점 \(\mathrm{D}\)를 잡는다. 점 \(\mathrm{D}\)를 지나고 선분 \(\mathrm{OP}\)와 평행한 직선이 선분 \(\mathrm{PA}\)와 만나는 점을 \(\mathrm{E}\)라 하자. \(\angle\mathrm{POA}=\theta\)일 때, 삼각형 \(\mathrm{CDP}\)의 넓이를 \(f(\theta)\), 삼각형 \(\mathrm{EDA}\)의 넓이를 \(g(\theta)\)라 하자. \[\lim_{\theta\to 0+}\dfrac{g(\theta)}{\theta^{2}\times f(\theta)}\]의 값은? (단, \(0<\theta<\dfrac{\pi}{4}\))`,
      figure: "2023-09-calc-28.webp",
      choices: [R`\(\dfrac{1}{8}\)`, R`\(\dfrac{1}{4}\)`, R`\(\dfrac{3}{8}\)`, R`\(\dfrac{1}{2}\)`, R`\(\dfrac{5}{8}\)`],
      answer: 3,
      help: R`\(\overline{\mathrm{PA}}=2\sin\frac{\theta}{2}\)이므로 점 \(\mathrm{P}\)를 중심으로 하는 호 위에 \(\mathrm{A}, \mathrm{C}, \mathrm{D}\)가 놓입니다. 평행선 조건에서 동위각과 엇각을 찾아 \(\triangle\mathrm{EDA}\)와 \(\triangle\mathrm{CDP}\)의 각 변과 끼인각을 \(\theta\)로 나타냅니다.`
    },
    {
      id: "2023-09-calc-29", exam: "2023-09", no: 29, score: 4,
      units: ["calc-diff"], memo: "역함수의 미분법과 최단 거리",
      body: R`함수 \(f(x)=e^{x}+x\)가 있다. 양수 \(t\)에 대하여 점 \((t,\,0)\)과 점 \((x,\,f(x))\) 사이의 거리가 \(x=s\)에서 최소일 때, 실수 \(f(s)\)의 값을 \(g(t)\)라 하자. 함수 \(g(t)\)의 역함수를 \(h(t)\)라 할 때, \(h'(1)\)의 값을 구하시오.`,
      figure: "2023-09-calc-29.webp",
      short: true,
      answer: 3,
      help: R`점 \((t, 0)\)에서 곡선 위의 점까지 거리가 최소가 되는 조건은 접선과 법선의 수직 관계입니다. \((s-t)+f(s)f'(s)=0\)에서 \(t=s+f(s)f'(s)\)를 얻고, \(g(t)=f(s)=1\)이 되는 \(s\)와 \(t\)를 구해 역함수 미분법을 적용합니다.`
    },
    {
      id: "2023-09-calc-30", exam: "2023-09", no: 30, score: 4,
      units: ["calc-integ", "calc-diff"], memo: "치환적분법과 사차함수의 성질",
      body: R`최고차항의 계수가 \(1\)인 사차함수 \(f(x)\)와 구간 \((0,\,\infty)\)에서 \(g(x)\ge 0\)인 함수 \(g(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`\(x\le -3\)인 모든 실수 \(x\)에 대하여 \(f(x)\ge f(-3)\)이다.`,
        R`\(x>-3\)인 모든 실수 \(x\)에 대하여 \(g(x+3)\{f(x)-f(0)\}^{2}=f'(x)\)이다.`
      ],
            bodyAfter: R`\(\displaystyle\int_{4}^{5}g(x)\,dx=\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 283,
      help: R`조건 (가)에서 \(f'(-3)=0\)이고, 조건 (나)에서 \(x>-3\)일 때 \(g(x+3)\ge 0\)이므로 \(f'(x)\ge 0\)입니다. 치환적분 \(\int_4^5 g(t)\,dt = \int_1^2 \frac{f'(x)}{\{f(x)-f(0)\}^2}\,dx\)를 세워 \(\left[-\frac{1}{f(x)-f(0)}\right]_1^2\)로 계산합니다.`
    },
    {
      id: "2023-06-calc-28", exam: "2023-06", no: 28, score: 4,
      units: ["calc-diff"], memo: "합성함수의 연속과 극값",
      body: R`최고차항의 계수가 \(\dfrac{1}{2}\)인 삼차함수 \(f(x)\)에 대하여 함수 \(g(x)\)가 \[g(x)=\begin{cases}\ln|f(x)| & (f(x)\ne 0)\\ 1 & (f(x)=0)\end{cases}\]이고 다음 조건을 만족시킬 때, 함수 \(g(x)\)의 극솟값은?`,
      note: [
        R`함수 \(g(x)\)는 \(x\ne 1\)인 모든 실수 \(x\)에서 연속이다.`,
        R`함수 \(g(x)\)는 \(x=2\)에서 극대이고, 함수 \(|g(x)|\)는 \(x=2\)에서 극소이다.`,
        R`방정식 \(g(x)=0\)의 서로 다른 실근의 개수는 \(3\)이다.`
      ],
      choices: [R`\(\ln\dfrac{13}{27}\)`, R`\(\ln\dfrac{16}{27}\)`, R`\(\ln\dfrac{19}{27}\)`, R`\(\ln\dfrac{22}{27}\)`, R`\(\ln\dfrac{25}{27}\)`],
      answer: 5,
      help: R`\(g(x)\)가 \(x=1\)에서만 불연속이므로 \(f(x)=0\)의 실근은 \(x=1\)뿐입니다. \(g(x)\)가 극대이면서 \(|g(x)|\)가 극소가 되려면 \(g(2)=0\)이어야 하므로 \(|f(2)|=1\)임을 이용하여 삼차함수 \(f(x)\)의 식을 확정합니다.`
    },
    {
      id: "2023-06-calc-29", exam: "2023-06", no: 29, score: 4,
      units: ["calc-diff"], memo: "삼각함수의 극한과 각의 이등분선",
      body: R`그림과 같이 반지름의 길이가 \(1\)이고 중심각의 크기가 \(\dfrac{\pi}{2}\)인 부채꼴 \(\mathrm{OAB}\)가 있다. 호 \(\mathrm{AB}\) 위의 점 \(\mathrm{P}\)에서 선분 \(\mathrm{OA}\)에 내린 수선의 발을 \(\mathrm{H}\)라 하고, \(\angle\mathrm{OAP}\)를 이등분하는 직선과 세 선분 \(\mathrm{HP}\), \(\mathrm{OP}\), \(\mathrm{OB}\)의 교점을 각각 \(\mathrm{Q}\), \(\mathrm{R}\), \(\mathrm{S}\)라 하자. \(\angle\mathrm{APH}=\theta\)일 때, 삼각형 \(\mathrm{AQH}\)의 넓이를 \(f(\theta)\), 삼각형 \(\mathrm{PSR}\)의 넓이를 \(g(\theta)\)라 하자. \[\lim_{\theta\to 0+}\dfrac{\theta^{3}\times g(\theta)}{f(\theta)}=k\]일 때, \(100k\)의 값을 구하시오. (단, \(0<\theta<\dfrac{\pi}{4}\))`,
      figure: "2023-06-calc-29.webp",
      short: true,
      answer: 50,
      help: R`\(\triangle\mathrm{OAP}\)가 이등변삼각형임을 이용하여 각의 크기들을 \(\theta\)로 표현합니다. 각의 이등분선 성질과 직각삼각형 삼각비를 적용하여 두 삼각형 \(\mathrm{AQH}\)와 \(\mathrm{PSR}\)의 밑변과 높이를 \(\theta\)에 대한 삼각함수로 나타냅니다.`
    },
    {
      id: "2023-06-calc-30", exam: "2023-06", no: 30, score: 4,
      units: ["calc-diff"], memo: "접선의 개수와 변곡점",
      body: R`양수 \(a\)에 대하여 함수 \(f(x)\)는 \[f(x)=\dfrac{x^{2}-ax}{e^{x}}\]이다. 실수 \(t\)에 대하여 \(x\에 대한 방정식 \[f(x)=f'(t)(x-t)+f(t)\]의 서로 다른 실근의 개수를 \(g(t)\)라 하자. \(g(5)+\displaystyle\lim_{t\to 5}g(t)=5\)일 때, \(\displaystyle\lim_{t\to k-}g(t)\ne\lim_{t\to k+}g(t)\)를 만족시키는 모든 실수 \(k\)의 값의 합은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 16,
      help: R`방정식의 실근 개수 \(g(t)\)는 곡선 위의 점 \((t, f(t))\)에서의 접선과 곡선 \(y=f(x)\)의 교점 개수입니다. 교점 개수가 바뀌는 경계는 접선이 변곡접선이 되는 점(\(f''(t)=0\))이므로, 변곡점 조건에서 \(a\)의 값을 구합니다.`
    },
    {
      id: "2022-suneung-calc-28", exam: "2022-suneung", no: 28, score: 4,
      units: ["calc-diff"], memo: "합성함수의 미분과 극소의 개수",
      body: R`함수 \(f(x)=6\pi(x-1)^{2}\)에 대하여 함수 \(g(x)\)를 \[g(x)=3f(x)+4\cos f(x)\]라 하자. \(0<x<2\)에서 함수 \(g(x)\)가 극소가 되는 \(x\)의 개수는?`,
      choices: [R`\(6\)`, R`\(7\)`, R`\(8\)`, R`\(9\)`, R`\(10\)`],
      answer: 2,
      help: R`\(g'(x)=f'(x)\{3-4\sin f(x)\}\)에서 도함수의 부호가 음에서 양으로 바뀌는 지점을 찾습니다. \(f(x)=t\)로 치환하여 \(t\)의 범위 \(0\le t<6\pi\)에서 \(\sin t=\frac{3}{4}\)의 근과 \(f'(x)=0\)인 \(x=1\) 주변의 부호 변화를 조사합니다.`
    },
    {
      id: "2022-suneung-calc-29", exam: "2022-suneung", no: 29, score: 4,
      units: ["calc-diff"], memo: "삼각함수의 극한과 정삼각형의 넓이",
      body: R`그림과 같이 길이가 \(2\)인 선분 \(\mathrm{AB}\)를 지름으로 하는 반원이 있다. 호 \(\mathrm{AB}\) 위에 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)를 \(\angle\mathrm{PAB}=\theta\), \(\angle\mathrm{QBA}=2\theta\)가 되도록 잡고, 두 선분 \(\mathrm{AP}\), \(\mathrm{BQ}\)의 교점을 \(\mathrm{R}\)라 하자. 선분 \(\mathrm{AB}\) 위의 점 \(\mathrm{S}\), 선분 \(\mathrm{BR}\) 위의 점 \(\mathrm{T}\), 선분 \(\mathrm{AR}\) 위의 점 \(\mathrm{U}\)를 선분 \(\mathrm{UT}\)가 선분 \(\mathrm{AB}\)에 평행하고 삼각형 \(\mathrm{STU}\)가 정삼각형이 되도록 잡는다. 두 선분 \(\mathrm{AR}\), \(\mathrm{QR}\)와 호 \(\mathrm{AQ}\)로 둘러싸인 부분의 넓이를 \(f(\theta)\), 삼각형 \(\mathrm{STU}\)의 넓이를 \(g(\theta)\)라 할 때, \[\lim_{\theta\to 0+}\dfrac{g(\theta)}{\theta\times f(\theta)}=\dfrac{q}{p}\sqrt{3}\]이다. \(p+q\)의 값을 구하시오. (단, \(0<\theta<\dfrac{\pi}{6}\)이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2022-suneung-calc-29.webp",
      short: true,
      answer: 11,
      help: R`\(\triangle\mathrm{ABR}\)에서 사인법칙으로 \(\overline{\mathrm{AR}}\), \(\overline{\mathrm{BR}}\)의 길이를 구하고 부채꼴과 삼각형의 차로 \(f(\theta)\)를 구합니다. 정삼각형 \(\mathrm{STU}\)의 한 변의 길이를 미지수로 두고 수선의 발과 각도를 이용하여 \(\theta\)에 대한 식으로 표현합니다.`
    },
    {
      id: "2022-suneung-calc-30", exam: "2022-suneung", no: 30, score: 4,
      units: ["calc-integ"], memo: "역함수와 부분적분법",
      body: R`실수 전체의 집합에서 증가하고 미분가능한 함수 \(f(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`\(f(1)=1\), \(\displaystyle\int_{1}^{2}f(x)\,dx=\dfrac{5}{4}\)`,
        R`함수 \(f(x)\)의 역함수를 \(g(x)\)라 할 때, \(x\ge 1\)인 모든 실수 \(x\)에 대하여 \(g(2x)=2f(x)\)이다.`
      ],
            bodyAfter: R`\(\displaystyle\int_{1}^{8}xf'(x)\,dx=\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 143,
      help: R`부분적분법 \(\int_1^8 xf'(x)\,dx = [xf(x)]_1^8 - \int_1^8 f(x)\,dx\)를 세웁니다. 조건 (나)의 관계식을 치환하여 구간 \([1, 2], [2, 4], [4, 8]\)에서의 정적분 값을 순차적으로 유도합니다.`
    },
    {
      id: "2022-09-calc-28", exam: "2022-09", no: 28, score: 4,
      units: ["calc-integ", "calc-diff"], memo: "삼각함수의 정적분과 두 점 사이의 거리",
      body: R`좌표평면에서 원점을 중심으로 하고 반지름의 길이가 \(2\)인 원 \(C\)와 두 점 \(\mathrm{A}(2,\,0)\), \(\mathrm{B}(0,\,-2)\)가 있다. 원 \(C\) 위에 있고 \(x\)좌표가 음수인 점 \(\mathrm{P}\)에 대하여 \(\angle\mathrm{PAB}=\theta\)라 하자. 점 \(\mathrm{Q}(0,\,2\cos\theta)\)에서 직선 \(\mathrm{BP}\)에 내린 수선의 발을 \(\mathrm{R}\)라 하고, 두 점 \(\mathrm{P}\)와 \(\mathrm{R}\) 사이의 거리를 \(f(\theta)\)라 할 때, \[\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}f(\theta)\,d\theta\]의 값은?`,
      figure: "2022-09-calc-28.webp",
      choices: [R`\(\dfrac{2\sqrt{3}-3}{2}\)`, R`\(\sqrt{3}-1\)`, R`\(\dfrac{3\sqrt{3}-3}{2}\)`, R`\(\dfrac{2\sqrt{3}-1}{2}\)`, R`\(\dfrac{4\sqrt{3}-3}{2}\)`],
      answer: 1,
      help: R`선분 \(\mathrm{AB}\)에 대한 원주각을 활용하여 직선 \(\mathrm{BP}\)의 방정식을 세웁니다. 점 \(\mathrm{Q}\)에서 직선 \(\mathrm{BP}\)에 내린 수선의 발 \(\mathrm{R}\)의 위치를 파악하여 \(f(\theta)\)를 삼각함수 식으로 나타낸 후 정적분합니다.`
    },
    {
      id: "2022-09-calc-29", exam: "2022-09", no: 29, score: 4,
      units: ["calc-diff"], memo: "합성함수의 최대와 최소",
      body: R`이차함수 \(f(x)\)에 대하여 함수 \(g(x)=\{f(x)+2\}e^{f(x)}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`\(f(a)=6\)인 \(a\)에 대하여 \(g(x)\)는 \(x=a\)에서 최댓값을 갖는다.`,
        R`\(g(x)\)는 \(x=b\), \(x=b+6\)에서 최솟값을 갖는다.`
      ],
            bodyAfter: R`방정식 \(f(x)=0\)의 서로 다른 두 실근을 \(\alpha\), \(\beta\)라 할 때, \((\alpha-\beta)^{2}\)의 값을 구하시오. (단, \(a\), \(b\)는 실수이다.)`,
short: true,
      answer: 24,
      help: R`함수 \(h(t)=(t+2)e^t\)의 도함수 \(h'(t)=(t+3)e^t\)를 분석하여 \(t=-3\)에서 극소이자 최소임을 파악합니다. \(g(x)=h(f(x))\)의 최솟값이 두 점 \(x=b, b+6\)에서 나타나므로 이차함수 \(f(x)\)의 대칭성과 꼭짓점 좌표를 결정합니다.`
    },
    {
      id: "2022-09-calc-30", exam: "2022-09", no: 30, score: 4,
      units: ["calc-integ", "calc-diff"], memo: "삼각함수의 극한과 연속함수의 정적분",
      body: R`최고차항의 계수가 \(9\)인 삼차함수 \(f(x)\)가 다음 조건을 만족시킨다.`,
      note: [
        R`\(\displaystyle\lim_{x\to 0}\dfrac{\sin(\pi\times f(x))}{x}=0\)`,
        R`\(f(x)\)의 극댓값과 극솟값의 곱은 \(5\)이다.`
      ],
            bodyAfter: R`함수 \(g(x)\)는 \(0\le x<1\)일 때 \(g(x)=f(x)\)이고 모든 실수 \(x\)에 대하여 \(g(x+1)=g(x)\)이다. \(g(x)\)가 실수 전체의 집합에서 연속일 때, \(\displaystyle\int_{0}^{5}xg(x)\,dx=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 107,
      help: R`조건 (가)의 극한에서 \(f(0)\)이 정수이고 \(f'(0)=0\)임을 유도합니다. 연속 조건 \(f(0)=f(1)\) 및 극값의 곱 조건을 조합하여 삼차함수 \(f(x)\)를 구하고, 주기성을 활용하여 \(\int_0^5 xg(x)\,dx\)를 계산합니다.`
    },
    {
      id: "2022-06-calc-28", exam: "2022-06", no: 28, score: 4,
      units: ["calc-diff"], memo: "삼각함수의 극한과 부채꼴",
      body: R`그림과 같이 길이가 \(2\)인 선분 \(\mathrm{AB}\)를 지름으로 하는 반원의 호 \(\mathrm{AB}\) 위에 점 \(\mathrm{P}\)가 있다. 선분 \(\mathrm{AB}\)의 중점을 \(\mathrm{O}\)라 할 때, 점 \(\mathrm{B}\)를 지나고 선분 \(\mathrm{AB}\)에 수직인 직선이 직선 \(\mathrm{OP}\)와 만나는 점을 \(\mathrm{Q}\)라 하고, \(\angle\mathrm{OQB}\)의 이등분선이 직선 \(\mathrm{AP}\)와 만나는 점을 \(\mathrm{R}\)라 하자. \(\angle\mathrm{OAP}=\theta\)일 때, 삼각형 \(\mathrm{OAP}\)의 넓이를 \(f(\theta)\), 삼각형 \(\mathrm{PQR}\)의 넓이를 \(g(\theta)\)라 하자. \[\lim_{\theta\to 0+}\dfrac{g(\theta)}{\theta^{4}\times f(\theta)}\]의 값은? (단, \(0<\theta<\dfrac{\pi}{4}\))`,
      figure: "2022-06-calc-28.webp",
      choices: [R`\(2\)`, R`\(\dfrac{5}{2}\)`, R`\(3\)`, R`\(\dfrac{7}{2}\)`, R`\(4\)`],
      answer: 1,
      help: R`이등변삼각형 \(\mathrm{OAP}\)에서 중심각은 \(2\theta\)이므로 \(f(\theta)=\frac{1}{2}\sin 2\theta\)입니다. 직각삼각형 \(\mathrm{OBQ}\)에서 \(\overline{\mathrm{OQ}}=\sec 2\theta\)이고 각의 이등분선 정리로 \(\overline{\mathrm{PR}}\)의 길이를 구하여 \(g(\theta)\)의 극한을 계산합니다.`
    },
    {
      id: "2022-06-calc-29", exam: "2022-06", no: 29, score: 4,
      units: ["calc-diff"], memo: "음함수 미분법과 극대 조건",
      body: R`\(t>2e\)인 실수 \(t\)에 대하여 함수 \(f(x)=t(\ln x)^{2}-x^{2}\)이 \(x=k\)에서 극대일 때, 실수 \(k\)의 값을 \(g(t)\)라 하면 \(g(t)\)는 미분가능한 함수이다. \(g(\alpha)=e^{2}\)인 실수 \(\alpha\)에 대하여 \(\alpha\times\{g'(\alpha)\}^{2}=\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 17,
      help: R`\(f'(x)=\frac{2t\ln x}{x}-2x=0\)에서 \(t\ln k=k^2\) 관계식을 얻고, 이를 \(t\ln g(t)=\{g(t)\}^2\)으로 둡니다. 양변을 \(t\)에 대해 미분하여 \(g'(\alpha)\)의 값을 구합니다.`
    },
    {
      id: "2022-06-calc-30", exam: "2022-06", no: 30, score: 4,
      units: ["calc-diff"], memo: "두 점 사이의 거리와 합성함수 미분",
      body: R`\(t>\dfrac{1}{2}\ln 2\)인 실수 \(t\)에 대하여 곡선 \(y=\ln(1+e^{2x}-e^{-2t})\)과 직선 \(y=x+t\)가 만나는 서로 다른 두 점 사이의 거리를 \(f(t)\)라 할 때, \(f'(\ln 2)=\dfrac{q}{p}\sqrt{2}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 11,
      help: R`곡선과 직선을 연립하여 \(e^{2x}-e^t e^x+(1-e^{-2t})=0\)에서 근과 계수의 관계를 세웁니다. 기울기가 \(1\)인 직선 위의 두 점 사이 거리는 \(f(t)=\sqrt{2}(\beta-\alpha)\)이므로 \(e^\beta-e^\alpha\)를 \(t\)의 식으로 나타내어 미분합니다.`
    },
    // ==========================================
    // 기하 (51문항)
    // ==========================================,
    {
      id: "2027-09-geom-28", exam: "2027-09", no: 28, score: 4,
      units: ["geom-space"], memo: "구 위의 점들과 정사영의 넓이",
      body: R`좌표공간에 점 \(\mathrm{O}\)를 중심으로 하고 반지름의 길이가 \(3\)인 구 \(S\) 위의 서로 다른 네 점 \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{C}\), \(\mathrm{D}\)가 다음 조건을 만족시킨다.`,
      figure: "2027-09-geom-28.webp",
      note: [
        R`(가) 직선 \(\mathrm{OD}\)와 평면 \(\mathrm{ABC}\)는 서로 평행하다.`,
        R`(나) \(\overline{\mathrm{AB}}=\overline{\mathrm{AC}}=\overline{\mathrm{BC}}=\overline{\mathrm{BD}}=\overline{\mathrm{CD}}\)`
      ],
      bodyAfter: R`삼각형 \(\mathrm{OAB}\)의 평면 \(\mathrm{OAC}\) 위로의 정사영의 넓이는?`,
      choices: [R`\(\dfrac{\sqrt{2}}{2}\)`, R`\(\dfrac{3\sqrt{2}}{4}\)`, R`\(\sqrt{2}\)`, R`\(\dfrac{5\sqrt{2}}{4}\)`, R`\(\dfrac{3\sqrt{2}}{2}\)`],
      answer: 2,
      help: R`정삼각형 \(\mathrm{ABC}\)와 이등변삼각형 \(\mathrm{BCD}\)의 대칭 구조 및 직선 \(\mathrm{OD}\)와 평면 \(\mathrm{ABC}\)의 평행 조건을 이용하여 구의 중심 \(\mathrm{O}\)와 평면 \(\mathrm{ABC}\) 사이의 거리를 구한다. \(\triangle\mathrm{OAB}\)와 \(\triangle\mathrm{OAC}\)가 이루는 이면각의 코사인값을 삼수선의 정리와 벡터 내적으로 계산하여 정사영의 넓이를 구한다.`
    },
    {
      id: "2027-09-geom-29", exam: "2027-09", no: 29, score: 4,
      units: ["geom-curve"], memo: "쌍곡선과 타원의 정의 및 닮음/도형 성질",
      body: R`두 초점이 \(\mathrm{F}(c, 0)\), \(\mathrm{F}'(-c, 0)\) (\(c > 0\))인 쌍곡선 \(\dfrac{x^2}{16}-\dfrac{y^2}{b^2}=1\) (\(b > 0\))이 있다. 점 \(\mathrm{P}(0, p)\) (\(p > 0\))에 대하여 이 쌍곡선과 두 선분 \(\mathrm{PF}\), \(\mathrm{PF}'\)이 만나는 점을 각각 \(\mathrm{A}\), \(\mathrm{B}\)라 할 때, 두 초점이 \(\mathrm{A}\), \(\mathrm{B}\)인 타원이 두 점 \(\mathrm{F}\), \(\mathrm{P}\)를 지난다. 점 \(\mathrm{P}\)를 지나고 \(x\)축에 평행한 직선이 직선 \(\mathrm{AF}'\)과 만나는 점을 \(\mathrm{C}\)라 하자. \(\angle\mathrm{APF}' = \angle\mathrm{APC}\)일 때, 삼각형 \(\mathrm{ACP}\)의 둘레의 길이를 구하시오.`,
      figure: "2027-09-geom-29.webp",
      short: true,
      answer: 60,
      help: R`쌍곡선의 주축의 길이 \(2a=8\)과 타원의 정의(초점 \(\mathrm{A}, \mathrm{B}\)로부터 두 점 \(\mathrm{F}, \mathrm{P}\)까지의 거리의 합이 일정)를 이용해 \(\overline{\mathrm{AF}}, \overline{\mathrm{AP}}, \overline{\mathrm{PF}}\) 등의 길이를 구한다. \(\angle\mathrm{APF}'=\angle\mathrm{APC}\)와 평행선 조건에서 생기는 이등변삼각형 및 닮음비를 활용하여 \(\triangle\mathrm{ACP}\)의 둘레를 완성한다.`
    },
    {
      id: "2027-09-geom-30", exam: "2027-09", no: 30, score: 4,
      units: ["geom-vector"], memo: "등변사다리꼴과 벡터 내적 조건을 만족하는 점의 위치",
      body: R`평면 \(\alpha\) 위에 있는 사다리꼴 \(\mathrm{ABCD}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(\overline{\mathrm{AB}}=24\), \(\overline{\mathrm{AD}}=\overline{\mathrm{BC}}=13\sqrt{2}\), \(\angle\mathrm{ABC}=\angle\mathrm{BAD} &lt; \dfrac{\pi}{2}\)`,
        R`(나) \(\vec{\mathrm{AB}}\cdot\vec{\mathrm{DC}} = \vec{\mathrm{AD}}\cdot\vec{\mathrm{BC}}\)`
      ],
            bodyAfter: R`\(\vec{\mathrm{XA}}\cdot\vec{\mathrm{XD}} = \vec{\mathrm{XB}}\cdot\vec{\mathrm{XC}} = 0\)을 만족시키는 평면 \(\alpha\) 위의 모든 점 \(\mathrm{X}\)에 대하여 \(\vec{\mathrm{AD}}\cdot\vec{\mathrm{AX}}\)의 값의 합을 구하시오.`,
short: true,
      answer: 457,
      help: R`조건 (나)를 통해 등변사다리꼴의 높이와 윗변 \(\overline{\mathrm{CD}}\)의 길이를 확정한다. \(\vec{\mathrm{XA}}\cdot\vec{\mathrm{XD}}=0\)은 점 \(\mathrm{X}\)가 선분 \(\mathrm{AD}\)를 지름으로 하는 원 위에 있음을 의미하고, 마찬가지로 선분 \(\mathrm{BC}\)를 지름으로 하는 원 위의 점이기도 하므로 두 원의 교점으로 점 \(\mathrm{X}\)의 좌표들을 구하여 내적의 합을 계산한다.`
    },
    {
      id: "2027-06-geom-28", exam: "2027-06", no: 28, score: 4,
      units: ["geom-curve"], memo: "타원의 정의와 초점을 지나는 현의 길이 비",
      body: R`두 초점이 \(\mathrm{F}(c, 0)\), \(\mathrm{F}'(-c, 0)\) (\(c > 0\))인 타원 \(\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1\)이 있다. 이 타원 위에 있는 제\(1\)사분면 위의 점 \(\mathrm{P}\)와 이 타원 위에 있는 제\(4\)사분면 위의 점 \(\mathrm{Q}\)에 대하여 점 \(\mathrm{F}\)가 선분 \(\mathrm{PQ}\) 위에 있고
\[\dfrac{\overline{\mathrm{PF}}}{\overline{\mathrm{QF}}}=\dfrac{1}{2}, \quad \dfrac{\overline{\mathrm{PF}}}{\overline{\mathrm{FF}'}}=\dfrac{\sqrt{6}}{16}\]
이다. 삼각형 \(\mathrm{FF}'\mathrm{Q}\)의 넓이가 \(4\sqrt{5}\)일 때, \(b^2\)의 값은? (단, \(a\)와 \(b\)는 양수이다.)`,
      figure: "2027-06-geom-28.webp",
      choices: [R`\(\dfrac{13}{2}\)`, R`\(7\)`, R`\(\dfrac{15}{2}\)`, R`\(8\)`, R`\(\dfrac{17}{2}\)`],
      answer: 4,
      help: R`\(\overline{\mathrm{PF}}=k\)로 두면 \(\overline{\mathrm{QF}}=2k\), \(\overline{\mathrm{FF}'}=\dfrac{16}{\sqrt{6}}k\)이다. 타원의 정의에 의해 \(\overline{\mathrm{PF}}+\overline{\mathrm{PF}'}=\overline{\mathrm{QF}}+\overline{\mathrm{QF}'}=2a\)이므로 코사인법칙을 \(\triangle \mathrm{PFF}'\)과 \(\triangle \mathrm{QFF}'\)에 적용하여 \(k\)와 \(c\)를 구하고, 삼각형 넓이 조건에서 \(b^2=a^2-c^2\)을 구한다.`
    },
    {
      id: "2027-06-geom-29", exam: "2027-06", no: 29, score: 4,
      units: ["geom-curve"], memo: "쌍곡선과 포물선의 교점의 좌표 및 방정식 연립",
      body: R`두 초점이 \(\mathrm{F}(3, 0)\), \(\mathrm{F}'(-3, 0)\)인 쌍곡선 \(C_1\)이 있다. 쌍곡선 \(C_1\)의 두 꼭짓점 중 \(x\)좌표가 음수인 점을 \(\mathrm{A}(-a, 0)\) (\(a > 0\))이라 하고, 초점이 \(\mathrm{F}\)이고 꼭짓점이 \(\mathrm{A}\)인 포물선을 \(C_2\), 이 포물선의 준선을 \(l\)이라 하자. 쌍곡선 \(C_1\)과 포물선 \(C_2\)가 만나는 점 중 제\(1\)사분면 위의 점의 \(y\)좌표와 쌍곡선 \(C_1\)과 직선 \(l\)이 만나는 점 중 제\(2\)사분면 위의 점의 \(y\)좌표가 같을 때, \(a^2\)의 값이 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2027-06-geom-29.webp",
      short: true,
      answer: 14,
      help: R`쌍곡선의 방정식은 \(\dfrac{x^2}{a^2}-\dfrac{y^2}{9-a^2}=1\)이고, 포물선 \(C_2\)의 초점이 \((3, 0)\), 꼭짓점이 \((-a, 0)\)이므로 평행이동한 포물선 방정식과 준선 \(x=-2a-3\)을 구한다. 준선에서의 쌍곡선 점의 \(y\)좌표와 포물선과의 교점의 \(y\)좌표가 같다는 조건을 대수적으로 연립하여 \(a^2\)을 구한다.`
    },
    {
      id: "2027-06-geom-30", exam: "2027-06", no: 30, score: 4,
      units: ["geom-vector"], memo: "평면벡터 내적 조건과 원 위의 동점에서의 내적 최대·최소",
      body: R`좌표평면에서 \(\overline{\mathrm{AB}}=\overline{\mathrm{AC}}=2\), \(\angle\mathrm{CAB} &gt; \dfrac{\pi}{2}\)인 이등변삼각형의 세 꼭짓점 \(\mathrm{A}\), \(\mathrm{B}\), \(\mathrm{C}\)와 선분 \(\mathrm{AB}\)의 수직이등분선 위의 점 \(\mathrm{D}\)가
\[\vec{\mathrm{BA}}\cdot\vec{\mathrm{BC}} = \vec{\mathrm{CB}}\cdot\vec{\mathrm{CD}}, \quad 2\vec{\mathrm{AC}}\cdot\vec{\mathrm{AD}} = \vec{\mathrm{DA}}\cdot\vec{\mathrm{DB}}\]
를 만족시킨다. 선분 \(\mathrm{AB}\)를 지름으로 하는 원 위를 움직이는 점 \(\mathrm{X}\)에 대하여 \(\vec{\mathrm{DX}}\cdot\vec{\mathrm{BC}}\)의 최댓값을 \(M\), 최솟값을 \(m\)이라 하자. \(|M\times m|=\dfrac{q}{p}\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2027-06-geom-30.webp",
      short: true,
      answer: 29,
      help: R`선분 \(\mathrm{AB}\)의 중점을 원점으로 두거나 기하학적 대칭성을 활용하여 점 \(\mathrm{D}\)의 위치와 삼각형 \(\mathrm{ABC}\)의 각도를 확정한다. 원의 중심을 \(\mathrm{M}\)이라 할 때 \(\vec{\mathrm{DX}}\cdot\vec{\mathrm{BC}}=(\vec{\mathrm{DM}}+\vec{\mathrm{MX}})\cdot\vec{\mathrm{BC}}=\vec{\mathrm{DM}}\cdot\vec{\mathrm{BC}}+\vec{\mathrm{MX}}\cdot\vec{\mathrm{BC}}\)로 분해하여 최대·최소를 구한다.`
    },
    {
      id: "2026-suneung-geom-28", exam: "2026-suneung", no: 28, score: 4,
      units: ["geom-space"], memo: "사면체 내부의 구와 원의 정사영 넓이",
      body: R`그림과 같이 \(\overline{\mathrm{AB}}=\overline{\mathrm{CD}}=4\), \(\overline{\mathrm{BC}}=\overline{\mathrm{BD}}=2\sqrt{5}\)인 사면체 \(\mathrm{ABCD}\)가 있고, 점 \(\mathrm{A}\)에서 직선 \(\mathrm{CD}\)에 내린 수선의 발 \(\mathrm{H}\)에 대하여 두 평면 \(\mathrm{ABH}\)와 \(\mathrm{BCD}\)는 서로 수직이고 \(\overline{\mathrm{AH}}=4\)이다. 삼각형 \(\mathrm{ABH}\)의 무게중심을 \(\mathrm{G}\)라 하고, 점 \(\mathrm{G}\)를 중심으로 하고 평면 \(\mathrm{ACD}\)에 접하는 구를 \(S\)라 하자. \(\angle\mathrm{APG}=\dfrac{\pi}{2}\)인 구 \(S\) 위의 모든 점 \(\mathrm{P}\)가 나타내는 도형을 \(T\)라 할 때, 도형 \(T\)의 평면 \(\mathrm{ABC}\) 위로의 정사영의 넓이는?`,
      figure: "2026-suneung-geom-28.webp",
      choices: [R`\(\dfrac{\pi}{7}\)`, R`\(\dfrac{\pi}{6}\)`, R`\(\dfrac{\pi}{5}\)`, R`\(\dfrac{\pi}{4}\)`, R`\(\dfrac{\pi}{3}\)`],
      answer: 4,
      help: R`두 평면이 수직이므로 좌표축을 설정하거나 삼수선의 정리를 이용해 사면체의 각 꼭짓점 좌표와 평면 \(\mathrm{ACD}\)의 방정식을 구한다. 구의 반지름 \(R\)은 점 \(\mathrm{G}\)에서 평면 \(\mathrm{ACD}\)까지의 거리이며, \(\angle\mathrm{APG}=\dfrac{\pi}{2}\)인 점 \(\mathrm{P}\)는 구와 평면의 교선인 원을 형성한다. 이 원의 평면과 평면 \(\mathrm{ABC}\)가 이루는 각의 코사인을 곱해 정사영 넓이를 구한다.`
    },
    {
      id: "2026-suneung-geom-29", exam: "2026-suneung", no: 29, score: 4,
      units: ["geom-curve"], memo: "포물선과 타원의 정의 연계 및 삼각형의 둘레와 넓이",
      body: R`그림과 같이 초점이 \(\mathrm{F}(p, 0)\) (\(p > 0\))이고 준선이 \(x=-p\)인 포물선 위의 점 중 제\(1\)사분면에 있는 점 \(\mathrm{A}\)에서 포물선의 준선에 내린 수선의 발을 \(\mathrm{H}\)라 하고, 두 초점이 \(x\)축 위에 있고 세 점 \(\mathrm{F}\), \(\mathrm{A}\), \(\mathrm{H}\)를 지나는 타원의 \(x\)좌표가 양수인 초점을 \(\mathrm{B}\)라 하자. 삼각형 \(\mathrm{AHB}\)의 둘레의 길이가 \(p+27\), 넓이가 \(2p+12\)일 때, 선분 \(\mathrm{HF}\)의 길이를 \(k\)라 하자. \(k^2\)의 값을 구하시오.`,
      figure: "2026-suneung-geom-29.webp",
      short: true,
      answer: 360,
      help: R`포물선의 정의에 의해 \(\overline{\mathrm{AH}}=\overline{\mathrm{AF}}\)이다. 타원의 초점이 \(\mathrm{B}, \mathrm{B}'\)이고 점 \(\mathrm{H}, \mathrm{A}, \mathrm{F}\)를 지나므로 타원의 정의를 적용하여 둘레와 넓이 관계식으로부터 \(p\)와 점 \(\mathrm{A}\)의 좌표를 구한다. 직각삼각형에서 피타고라스 정리로 \(\overline{\mathrm{HF}}^2=k^2\)을 산출한다.`
    },
    {
      id: "2026-suneung-geom-30", exam: "2026-suneung", no: 30, score: 4,
      units: ["geom-vector"], memo: "원에 내접하는 삼각형과 벡터 내적 관계식",
      body: R`좌표평면에서 길이가 \(10\sqrt{2}\)인 선분 \(\mathrm{AB}\)를 지름으로 하는 원 위의 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)가
\[(\vec{\mathrm{PA}}+\vec{\mathrm{PB}})\cdot(\vec{\mathrm{PQ}}+\vec{\mathrm{PB}}) = 2|\vec{\mathrm{PQ}}|^2\]
을 만족시킨다. \(|\vec{\mathrm{PB}}|=14\)일 때, \(|\vec{\mathrm{PA}}\cdot\vec{\mathrm{QB}}|=\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(|\vec{\mathrm{QB}}| &gt; 0\)이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 221,
      help: R`지름의 양 끝점이 \(\mathrm{A}, \mathrm{B}\)이므로 \(\angle\mathrm{APB}=90^\circ\)이고 \(|\vec{\mathrm{PA}}|^2+|\vec{\mathrm{PB}}|^2=(10\sqrt{2})^2=200\)에서 \(|\vec{\mathrm{PA}}|=2\)이다. 원의 중심 \(\mathrm{O}\)를 기준으로 벡터들을 분해하거나 삼각비를 적용하여 점 \(\mathrm{Q}\)의 위치를 결정한 뒤 \(|\vec{\mathrm{PA}}\cdot\vec{\mathrm{QB}}|\)를 계산한다.`
    },
    {
      id: "2026-09-geom-28", exam: "2026-09", no: 28, score: 4,
      units: ["geom-space"], memo: "공간좌표와 구 위의 점, 평면과 직선의 각도 및 정사영",
      body: R`좌표공간의 구 \(S: x^2+y^2+z^2=36\) 위의 점 \(\mathrm{A}\)에 대하여 구 \(S\) 위의 점 \(\mathrm{B}\)가 다음 조건을 만족시킨다.`,
      figure: "2026-09-geom-28.webp",
      note: [
        R`(가) 선분 \(\mathrm{OA}\) 위의 \(\overline{\mathrm{OC}}=4\)인 점 \(\mathrm{C}\)에 대하여 직선 \(\mathrm{BC}\)와 \(xy\)평면이 서로 평행하다.`,
        R`(나) 두 직선 \(\mathrm{OA}\), \(\mathrm{AB}\)와 \(xy\)평면이 이루는 예각의 크기를 각각 \(\alpha\), \(\beta\)라 하면 \(\sin\alpha=3\sin\beta\)이다.`
      ],
            bodyAfter: R`삼각형 \(\mathrm{OAB}\)의 \(xy\)평면 위로의 정사영이 직각삼각형일 때, 평면 \(\mathrm{OAB}\)와 \(xy\)평면이 이루는 예각의 크기를 \(\theta\)라 하자. \(\cos\theta\)의 값은? (단, \(\mathrm{O}\)는 원점이고, 점 \(\mathrm{A}\)의 \(z\)좌표는 \(6\)이 아닌 양수이다.)`,
choices: [R`\(\dfrac{\sqrt{2}}{6}\)`, R`\(\dfrac{\sqrt{2}}{5}\)`, R`\(\dfrac{\sqrt{2}}{4}\)`, R`\(\dfrac{\sqrt{2}}{3}\)`, R`\(\dfrac{\sqrt{2}}{2}\)`],
      answer: 4,
      help: R`구의 반지름은 \(6\)이고 점 \(\mathrm{C}\)의 \(z\)좌표와 점 \(\mathrm{B}\)의 \(z\)좌표가 같다 (\(z_C=z_B=\dfrac{2}{3}z_A\)). 정사영 삼각형이 직각삼각형이 되는 기하학적 배치에서 법선벡터를 구하거나 면적비 공식 \(\cos\theta = \dfrac{S'}{S}\)를 적용하여 \(\cos\theta\)를 구한다.`
    },
    {
      id: "2026-09-geom-29", exam: "2026-09", no: 29, score: 4,
      units: ["geom-curve"], memo: "두 타원의 정의와 초점·꼭짓점 관계를 이용한 장축 길이 계산",
      body: R`두 점 \(\mathrm{F}(0, 6)\), \(\mathrm{F}'(0, -6)\)을 초점으로 하는 타원 \(C_1\)에 대하여 점 \(\mathrm{F}\)를 지나고 \(x\)축과 평행한 직선이 타원 \(C_1\)과 만나는 점 중 제\(1\)사분면 위에 있는 점을 \(\mathrm{P}\), 선분 \(\mathrm{PF}'\)과 \(x\)축이 만나는 점을 \(\mathrm{Q}\)라 하자. 두 점 \(\mathrm{P}\), \(\mathrm{F}\)를 초점으로 하고 점 \(\mathrm{Q}\)가 꼭짓점인 타원 \(C_2\)에 대하여 두 타원 \(C_1\), \(C_2\)가 만나는 점 중 \(x\)축에 가까운 점을 \(\mathrm{R}\)이라 하자. \(\overline{\mathrm{F}'\mathrm{R}}-\overline{\mathrm{PR}}=7\sqrt{2}\)일 때, 두 타원 \(C_1\), \(C_2\)의 장축의 길이의 곱을 구하시오.`,
      figure: "2026-09-geom-29.webp",
      short: true,
      answer: 396,
      help: R`점 \(\mathrm{P}\)의 좌표를 \((x_1, 6)\)으로 두고 닮음을 이용하여 \(\mathrm{Q}\)의 위치와 타원 \(C_2\)의 장축 길이를 표현한다. 두 타원 위의 점 \(\mathrm{R}\)에 대해 타원의 정의식 \(\overline{\mathrm{RF}}+\overline{\mathrm{RF}'}=2a_1\), \(\overline{\mathrm{RF}}+\overline{\mathrm{RP}}=2a_2\)를 변변 빼서 주어진 \(\overline{\mathrm{F}'\mathrm{R}}-\overline{\mathrm{PR}}=7\sqrt{2}\)와 연결하여 두 장축의 곱을 산출한다.`
    },
    {
      id: "2026-09-geom-30", exam: "2026-09", no: 30, score: 4,
      units: ["geom-vector"], memo: "삼각형 위의 점들과 벡터 내적 조건, 원 위의 동점까지의 거리 최대·최소",
      body: R`좌표평면에 \(\overline{\mathrm{AB}}=\overline{\mathrm{AC}}=8\sqrt{5}\), \(\overline{\mathrm{BC}}=16\)인 삼각형 \(\mathrm{ABC}\)가 있다. 선분 \(\mathrm{AB}\) 위의 점 \(\mathrm{P}\), 선분 \(\mathrm{BC}\) 위의 점 \(\mathrm{Q}\), 선분 \(\mathrm{CA}\) 위의 점 \(\mathrm{R}\)이 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \((\vec{\mathrm{PB}}+\vec{\mathrm{PQ}})\cdot\vec{\mathrm{BC}} = (\vec{\mathrm{RC}}+\vec{\mathrm{RQ}})\cdot\vec{\mathrm{BC}} = 0\)`,
        R`(나) \(\vec{\mathrm{QP}}\cdot\vec{\mathrm{QR}} = |\vec{\mathrm{QP}}|^2\)`
      ],
            bodyAfter: R`\(|3\vec{\mathrm{XP}}+\vec{\mathrm{XR}}|=|\vec{\mathrm{PR}}|\)을 만족시키는 점 \(\mathrm{X}\)에 대하여 \(|\vec{\mathrm{BX}}|\)의 최댓값과 최솟값을 각각 \(M\), \(m\)이라 할 때, \(M\times m\)의 값을 구하시오. (단, \(|\vec{\mathrm{PQ}}| &gt; 0\))`,
short: true,
      answer: 69,
      help: R`조건 (가)에서 점 \(\mathrm{P}, \mathrm{R}\)의 정사영과 \(\mathrm{Q}\)의 위치 관계를 찾고, 조건 (나)에서 직각삼각형 관계를 도출한다. \(|3\vec{\mathrm{XP}}+\vec{\mathrm{XR}}|=|\vec{\mathrm{PR}}|\)은 점 \(\mathrm{X}\)가 선분 \(\mathrm{PR}\)을 \(1:3\)으로 내분하는 점을 중심으로 하는 원 위에 있음을 나타내므로, 점 \(\mathrm{B}\)에서 이 원의 중심까지의 거리와 반지름을 이용하여 \(M\)과 \(m\)을 구한다.`
    },
    {
      id: "2026-06-geom-28", exam: "2026-06", no: 28, score: 4,
      units: ["geom-curve"], memo: "두 타원의 정의와 중점 조건 연계",
      body: R`그림과 같이 두 점 \(\mathrm{F}(c, 0)\), \(\mathrm{F}'(-c, 0)\) (\(c > 0\))을 초점으로 하는 타원 \(C_1: \dfrac{x^2}{a^2}+y^2=1\)과 두 점 \(\mathrm{G}(0, d)\), \(\mathrm{G}'(0, -d)\) (\(d > 1\))을 초점으로 하고 타원 \(C_1\)의 두 꼭짓점을 지나는 타원 \(C_2\)가 있다. 직선 \(\mathrm{FG}\)가 타원 \(C_1\)과 제\(1\)사분면에서 만나는 점을 \(\mathrm{P}\)라 하고, 직선 \(\mathrm{F}'\mathrm{P}\)가 타원 \(C_2\)와 제\(1\)사분면에서 만나는 점을 \(\mathrm{Q}\)라 하자. \(\overline{\mathrm{GP}}=\overline{\mathrm{PF}}\)이고 \(\overline{\mathrm{GP}}+\overline{\mathrm{PF}'}=2\sqrt{2}\)일 때, \(\overline{\mathrm{QG}}+\overline{\mathrm{QG}'}\)의 값은? (단, \(a\)는 양수이다.)`,
      figure: "2026-06-geom-28.webp",
      choices: [R`\(\sqrt{19}\)`, R`\(2\sqrt{5}\)`, R`\(\sqrt{21}\)`, R`\(\sqrt{22}\)`, R`\(\sqrt{23}\)`],
      answer: 4,
      help: R`\(\overline{\mathrm{GP}}=\overline{\mathrm{PF}}\)이므로 \(\overline{\mathrm{PF}}+\overline{\mathrm{PF}'}=\overline{\mathrm{GP}}+\overline{\mathrm{PF}'}=2\sqrt{2}\)가 되어 타원 \(C_1\)의 장축의 길이는 \(2a=2\sqrt{2}\)이다. 타원 \(C_2\)의 두 꼭짓점이 \(C_1\)의 꼭짓점과 공유되는 기하학적 성질과 타원 \(C_2\)의 장축 길이를 구하여 \(\overline{\mathrm{QG}}+\overline{\mathrm{QG}'}\)를 구한다.`
    },
    {
      id: "2026-06-geom-29", exam: "2026-06", no: 29, score: 4,
      units: ["geom-curve"], memo: "쌍곡선의 정의와 중점 연결 정리, 평행선 사이 삼각형 넓이",
      body: R`그림과 같이 두 점 \(\mathrm{F}(c, 0)\), \(\mathrm{F}'(-c, 0)\) (\(c > 0\))을 초점으로 하는 쌍곡선이 있다. 이 쌍곡선 위의 점 중 제\(1\)사분면에 있는 점 \(\mathrm{P}\)에 대하여 선분 \(\mathrm{F}'\mathrm{P}\)가 \(y\)축과 만나는 점을 \(\mathrm{Q}\)라 하고, 원점 \(\mathrm{O}\)를 지나고 선분 \(\mathrm{F}'\mathrm{P}\)와 평행한 직선이 이 쌍곡선과 만나는 점 중 제\(1\)사분면에 있는 점을 \(\mathrm{R}\)이라 하자. \(\overline{\mathrm{F}'\mathrm{Q}}=\overline{\mathrm{QP}}\), \(\overline{\mathrm{OQ}}=2\)이고 삼각형 \(\mathrm{PQR}\)의 넓이가 \(3\)일 때, 이 쌍곡선의 주축의 길이는 \(p+q\sqrt{13}\)이다. \(p^2+q^2\)의 값을 구하시오. (단, \(p\)와 \(q\)는 유리수이다.)`,
      figure: "2026-06-geom-29.webp",
      short: true,
      answer: 20,
      help: R`\(\overline{\mathrm{F}'\mathrm{Q}}=\overline{\mathrm{QP}}\)에서 \(\triangle \mathrm{F}'\mathrm{FP}\)의 중점 연결 정리에 의해 \(\overline{\mathrm{PF}}=2\overline{\mathrm{OQ}}=4\)이다. 직선 \(\mathrm{OR}\)과 \(\mathrm{F}'\mathrm{P}\)의 평행 조건 및 높이를 통해 삼각형의 넓이로부터 각 선분의 길이를 계산하고, 쌍곡선 정의 \(\overline{\mathrm{PF}'}-\overline{\mathrm{PF}}=2a\)를 적용한다.`
    },
    {
      id: "2026-06-geom-30", exam: "2026-06", no: 30, score: 4,
      units: ["geom-vector"], memo: "평면벡터 내적과 영역 위의 동점",
      body: R`좌표평면에 \(\overline{\mathrm{AB}}=6\), \(\overline{\mathrm{AD}}=8\)인 직사각형 \(\mathrm{ABCD}\)와
\[2\vec{\mathrm{BE}}=3\vec{\mathrm{BC}}-\vec{\mathrm{BA}}\]
를 만족시키는 점 \(\mathrm{E}\)가 있다. 선분 \(\mathrm{BC}\) 위를 움직이는 점 \(\mathrm{P}\)에 대하여 점 \(\mathrm{Q}\)가
\[\vec{\mathrm{PQ}}\cdot(\vec{\mathrm{PQ}}-\vec{\mathrm{AB}})=0\]
을 만족시킬 때, \(\vec{\mathrm{AE}}\cdot\vec{\mathrm{AQ}}\)의 최솟값을 구하시오.`,
      figure: "2026-06-geom-30.webp",
      short: true,
      answer: 36,
      help: R`\(\vec{\mathrm{PQ}}\cdot(\vec{\mathrm{PQ}}-\vec{\mathrm{AB}})=0\)은 점 \(\mathrm{Q}\)가 선분 \(\mathrm{P}\)와 \(\mathrm{P}+\vec{\mathrm{AB}}\)를 지름의 양 끝점으로 하는 원 위에 있음을 의미한다. 점 \(\mathrm{P}\)가 선분 \(\mathrm{BC}\)를 움직일 때 점 \(\mathrm{Q}\)가 그리는 영역(원들의 합집합)을 파악하고, 고정된 벡터 \(\vec{\mathrm{AE}}\)와의 내적이 최소가 되는 점 \(\mathrm{Q}\)의 위치를 찾는다.`
    },
    {
      id: "2025-suneung-geom-28", exam: "2025-suneung", no: 28, score: 4,
      units: ["geom-space"], memo: "직각삼각형과 구의 단면원, 직선까지의 거리",
      body: R`좌표공간에 \(\overline{\mathrm{AB}}=8\), \(\overline{\mathrm{BC}}=6\), \(\angle\mathrm{ABC}=\dfrac{\pi}{2}\)인 직각삼각형 \(\mathrm{ABC}\)와 선분 \(\mathrm{AC}\)를 지름으로 하는 구 \(S\)가 있다. 직선 \(\mathrm{AB}\)를 포함하고 평면 \(\mathrm{ABC}\)에 수직인 평면이 구 \(S\)와 만나서 생기는 원을 \(O\)라 하자. 원 \(O\) 위의 점 중에서 직선 \(\mathrm{AC}\)까지의 거리가 \(4\)인 서로 다른 두 점을 \(\mathrm{P}\), \(\mathrm{Q}\)라 할 때, 선분 \(\mathrm{PQ}\)의 길이는?`,
      figure: "2025-suneung-geom-28.webp",
      choices: [R`\(\sqrt{43}\)`, R`\(\sqrt{47}\)`, R`\(\sqrt{51}\)`, R`\(\sqrt{55}\)`, R`\(\sqrt{59}\)`],
      answer: 4,
      help: R`직각삼각형 \(\mathrm{ABC}\)의 빗변 \(\overline{\mathrm{AC}}=10\)이 구 \(S\)의 지름이므로 구의 반지름은 \(5\)이다. 좌표계를 설정하여 구의 방정식과 원 \(O\)가 놓인 평면의 방정식을 세우고, 원 위의 점 \((x, y, z)\)에서 직선 \(\mathrm{AC}\)까지의 거리 공식을 적용하여 두 점 \(\mathrm{P}, \mathrm{Q}\)의 좌표를 구해 \(\overline{\mathrm{PQ}}\)를 계산한다.`
    },
    {
      id: "2025-suneung-geom-29", exam: "2025-suneung", no: 29, score: 4,
      units: ["geom-curve"], memo: "쌍곡선의 정의와 닮음인 삼각형의 성질",
      body: R`두 초점이 \(\mathrm{F}(c, 0)\), \(\mathrm{F}'(-c, 0)\) (\(c > 0\))인 쌍곡선 \(x^2-\dfrac{y^2}{35}=1\)이 있다. 이 쌍곡선 위에 있는 제\(1\)사분면 위의 점 \(\mathrm{P}\)에 대하여 직선 \(\mathrm{PF}'\) 위에 \(\overline{\mathrm{PQ}}=\overline{\mathrm{PF}}\)인 점 \(\mathrm{Q}\)를 잡자. 삼각형 \(\mathrm{QF}'\mathrm{F}\)와 삼각형 \(\mathrm{FF}'\mathrm{P}\)가 서로 닮음일 때, 삼각형 \(\mathrm{PFQ}\)의 넓이는 \(\dfrac{q}{p}\sqrt{5}\)이다. \(p+q\)의 값을 구하시오. (단, \(\overline{\mathrm{PF}'} &lt; \overline{\mathrm{QF}'}\)이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2025-suneung-geom-29.webp",
      short: true,
      answer: 107,
      help: R`쌍곡선의 주축의 길이는 \(2a=2\), 초점 거리는 \(2c=2\sqrt{1+35}=12\)이다. \(\overline{\mathrm{PF}'}-\overline{\mathrm{PF}}=2\)이고 \(\triangle \mathrm{QF}'\mathrm{F} \sim \triangle \mathrm{FF}'\mathrm{P}\)에서 각 \(\angle\mathrm{F}'\)을 공유하므로 대응변의 길이 비를 세워 이등변삼각형 \(\triangle \mathrm{PFQ}\)의 변의 길이와 꼭지각을 구하고 넓이를 산출한다.`
    },
    {
      id: "2025-suneung-geom-30", exam: "2025-suneung", no: 30, score: 4,
      units: ["geom-vector"], memo: "벡터 방정식이 나타내는 도형과 내적의 최대·최소",
      body: R`좌표평면에 한 변의 길이가 \(4\)인 정사각형 \(\mathrm{ABCD}\)가 있다.
\[|\vec{\mathrm{XB}}+\vec{\mathrm{XC}}|=|\vec{\mathrm{XB}}-\vec{\mathrm{XC}}|\]
를 만족시키는 점 \(\mathrm{X}\)가 나타내는 도형을 \(S\)라 하자. 도형 \(S\) 위의 점 \(\mathrm{P}\)에 대하여
\[4\vec{\mathrm{PQ}}=\vec{\mathrm{PB}}+2\vec{\mathrm{PD}}\]
를 만족시키는 점을 \(\mathrm{Q}\)라 할 때, \(\vec{\mathrm{AC}}\cdot\vec{\mathrm{AQ}}\)의 최댓값과 최솟값을 각각 \(M\), \(m\)이라 하자. \(M\times m\)의 값을 구하시오.`,
      figure: "2025-suneung-geom-30.webp",
      short: true,
      answer: 316,
      help: R`\(|\vec{\mathrm{XB}}+\vec{\mathrm{XC}}|=|\vec{\mathrm{XB}}-\vec{\mathrm{XC}}|\)는 선분 \(\mathrm{BC}\)를 지름으로 하는 원 \(S\)를 나타낸다. 점 \(\mathrm{Q}\)를 원점 기준으로 표현하면 \(\vec{\mathrm{OQ}}=\dfrac{1}{4}\vec{\mathrm{OP}}+\dfrac{1}{4}\vec{\mathrm{OB}}+\dfrac{1}{2}\vec{\mathrm{OD}}\) 형태의 원형 궤적을 그리므로, \(\vec{\mathrm{AC}}\cdot\vec{\mathrm{AQ}}\)를 중심 성분과 반지름 성분으로 분해하여 최대·최소를 구한다.`
    },
    {
      id: "2025-09-geom-28", exam: "2025-09", no: 28, score: 4,
      units: ["geom-space"], memo: "공간좌표와 구 위의 원의 교점과 사잇각",
      body: R`좌표공간에 두 점 \(\mathrm{A}(a, 0, 0)\), \(\mathrm{B}(0, 10\sqrt{2}, 0)\)과 구 \(S: x^2+y^2+z^2=100\)이 있다. \(\angle\mathrm{APO}=\dfrac{\pi}{2}\)인 구 \(S\) 위의 모든 점 \(\mathrm{P}\)가 나타내는 도형을 \(C_1\), \(\angle\mathrm{BQO}=\dfrac{\pi}{2}\)인 구 \(S\) 위의 모든 점 \(\mathrm{Q}\)가 나타내는 도형을 \(C_2\)라 하자. \(C_1\)과 \(C_2\)가 서로 다른 두 점 \(\mathrm{N}_1\), \(\mathrm{N}_2\)에서 만나고 \(\cos(\angle\mathrm{N}_1\mathrm{O}\mathrm{N}_2)=\dfrac{3}{5}\)일 때, \(a\)의 값은? (단, \(a > 10\sqrt{2}\)이고, \(\mathrm{O}\)는 원점이다.)`,
      figure: "2025-09-geom-28.webp",
      choices: [R`\(\dfrac{10\sqrt{30}}{3}\)`, R`\(\dfrac{15\sqrt{30}}{4}\)`, R`\(\dfrac{25\sqrt{30}}{6}\)`, R`\(\dfrac{55\sqrt{30}}{12}\)`, R`\(5\sqrt{30}\)`],
      answer: 1,
      help: R`\(\angle\mathrm{APO}=90^\circ\)이므로 \(\mathrm{P}\)는 \(\mathrm{OA}\)를 지름으로 하는 구와 구 \(S\)의 교선인 원 \(C_1\) (평면 \(x=x_1\) 상의 원)이다. 마찬가지로 \(C_2\)는 평면 \(y=y_1\) 상의 원이다. 두 원의 교점 \(\mathrm{N}_1, \mathrm{N}_2\)의 위치를 좌표로 표현하고 \(\cos(\angle\mathrm{N}_1\mathrm{ON}_2)=\dfrac{\vec{\mathrm{ON}}_1\cdot\vec{\mathrm{ON}}_2}{|\vec{\mathrm{ON}}_1||\vec{\mathrm{ON}}_2|}=\dfrac{3}{5}\)에서 \(a\)를 산출한다.`
    },
    {
      id: "2025-09-geom-29", exam: "2025-09", no: 29, score: 4,
      units: ["geom-curve"], memo: "쌍곡선과 포물선의 정의 및 길이 비",
      body: R`그림과 같이 두 점 \(\mathrm{F}(4, 0)\), \(\mathrm{F}'(-4, 0)\)을 초점으로 하는 쌍곡선 \(C: \dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1\)이 있다. 점 \(\mathrm{F}\)를 초점으로 하고 \(y\)축을 준선으로 하는 포물선이 쌍곡선 \(C\)와 만나는 점 중 제\(1\)사분면 위의 점을 \(\mathrm{P}\)라 하자. 점 \(\mathrm{P}\)에서 \(y\)축에 내린 수선의 발을 \(\mathrm{H}\)라 할 때, \(\overline{\mathrm{PH}}:\overline{\mathrm{HF}}=3:2\sqrt{2}\)이다. \(a^2\times b^2\)의 값을 구하시오. (단, \(a > b > 0\))`,
      figure: "2025-09-geom-29.webp",
      short: true,
      answer: 63,
      help: R`포물선의 정의에 의해 \(\overline{\mathrm{PF}}=\overline{\mathrm{PH}}\)이다. 직각삼각형 \(\triangle \mathrm{PFH}\) 또는 피타고라스 정리에서 점 \(\mathrm{P}\)의 좌표를 구하고, 쌍곡선 초점 \(c=4\) (\(a^2+b^2=16\))와 쌍곡선 위의 점 \(\mathrm{P}\)를 대입하여 \(a^2, b^2\)을 각각 구한 후 곱한다.`
    },
    {
      id: "2025-09-geom-30", exam: "2025-09", no: 30, score: 4,
      units: ["geom-vector"], memo: "삼각형 경계 위의 동점 사이 거리의 최대·최소",
      body: R`좌표평면 위에 다섯 점
\[\mathrm{A}(0, 8), \quad \mathrm{B}(8, 0), \quad \mathrm{C}(7, 1), \quad \mathrm{D}(7, 0), \quad \mathrm{E}(-4, 2)\]
가 있다. 삼각형 \(\mathrm{AOB}\)의 변 위를 움직이는 점 \(\mathrm{P}\)와 삼각형 \(\mathrm{CDB}\)의 변 위를 움직이는 점 \(\mathrm{Q}\)에 대하여
\[|\vec{\mathrm{PQ}}+\vec{\mathrm{OE}}|^2\]
의 최댓값을 \(M\), 최솟값을 \(m\)이라 할 때, \(M+m\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이다.)`,
      figure: "2025-09-geom-30.webp",
      short: true,
      answer: 54,
      help: R`\(\vec{\mathrm{PQ}}+\vec{\mathrm{OE}}=\vec{\mathrm{OQ}}-(\vec{\mathrm{OP}}-\vec{\mathrm{OE}})\)로 해석하면 점 \(\mathrm{P}'=\mathrm{P}-\vec{\mathrm{OE}}\)가 그리는 평행이동된 삼각형과 삼각형 \(\mathrm{CDB}\) 사이의 거리의 제곱의 최대·최소 문제가 된다. 두 다각형 경계 사이의 최단거리와 최장거리를 기하학적으로 판정하여 \(M\)과 \(m\)을 구한다.`
    },
    {
      id: "2025-06-geom-28", exam: "2025-06", no: 28, score: 4,
      units: ["geom-vector"], memo: "원 위의 점과 벡터 내적 수직 조건, 최소 거리",
      body: R`좌표평면에서 두 점 \(\mathrm{A}(1, 0)\), \(\mathrm{B}(1, 1)\)에 대하여 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)가
\[|\vec{\mathrm{OP}}|=1, \quad |\vec{\mathrm{BQ}}|=3, \quad \vec{\mathrm{AP}}\cdot(\vec{\mathrm{QA}}+\vec{\mathrm{QP}})=0\]
을 만족시킨다. \(|\vec{\mathrm{PQ}}|\)의 값이 최소가 되도록 하는 두 점 \(\mathrm{P}\), \(\mathrm{Q}\)에 대하여 \(\vec{\mathrm{AP}}\cdot\vec{\mathrm{BQ}}\)의 값은? (단, \(\mathrm{O}\)는 원점이고, \(|\vec{\mathrm{AP}}| &gt; 0\)이다.)`,
      choices: [R`\(\dfrac{6}{5}\)`, R`\(\dfrac{9}{5}\)`, R`\(\dfrac{12}{5}\)`, R`\(3\)`, R`\(\dfrac{18}{5}\)`],
      answer: 3,
      help: R`\(\vec{\mathrm{AP}}\cdot(\vec{\mathrm{QA}}+\vec{\mathrm{QP}})=0\)을 정리하면 선분 \(\mathrm{AP}\)의 중점 \(\mathrm{M}\)에 대해 \(\vec{\mathrm{AP}}\cdot\vec{\mathrm{QM}}=0\)이므로 점 \(\mathrm{Q}\)는 선분 \(\mathrm{AP}\)의 수직이등분선 위에 있다. 원점 중심의 단위원 위의 점 \(\mathrm{P}\)와 \(\mathrm{B}\) 중심 반지름 \(3\)인 원 위의 점 \(\mathrm{Q}\)의 기하학적 배치에서 \(|\vec{\mathrm{PQ}}|\)가 최소가 되는 배치를 찾아 내적을 구한다.`
    },
    {
      id: "2025-06-geom-29", exam: "2025-06", no: 29, score: 4,
      units: ["geom-curve"], memo: "타원과 쌍곡선의 정의를 이용한 둘레의 길이",
      body: R`좌표평면에 곡선 \(|y^2-1|=\dfrac{x^2}{a^2}\)과 네 점 \(\mathrm{A}(0, c+1)\), \(\mathrm{B}(0, -c-1)\), \(\mathrm{C}(c, 0)\), \(\mathrm{D}(-c, 0)\)이 있다. 곡선 위의 점 중 \(y\)좌표의 절댓값이 \(1\)보다 작거나 같은 모든 점 \(\mathrm{P}\)에 대하여 \(\overline{\mathrm{PC}}+\overline{\mathrm{PD}}=\sqrt{5}\)이다. 곡선 위의 점 \(\mathrm{Q}\)가 제\(1\)사분면에 있고 \(\overline{\mathrm{AQ}}=10\)일 때, 삼각형 \(\mathrm{ABQ}\)의 둘레의 길이를 구하시오. (단, \(a\)와 \(c\)는 양수이다.)`,
      short: true,
      answer: 25,
      help: R`\(|y|\le 1\)일 때 식은 \(\dfrac{x^2}{a^2}+y^2=1\)인 타원이며 초점이 \(\mathrm{C}, \mathrm{D}\)이고 장축이 \(\sqrt{5}\)이므로 \(a^2=\dfrac{5}{4}, c=\dfrac{1}{2}\)이다. \(|y| &gt; 1\)일 때 식은 \(y^2-\dfrac{x^2}{a^2}=1\)인 쌍곡선이며 초점이 \(\mathrm{A}, \mathrm{B}\)이다. 쌍곡선 정의 \(|\overline{\mathrm{BQ}}-\overline{\mathrm{AQ}}|=2b=2\)를 이용하여 \(\overline{\mathrm{BQ}}\)와 둘레를 구한다.`
    },
    {
      id: "2025-06-geom-30", exam: "2025-06", no: 30, score: 4,
      units: ["geom-curve"], memo: "쌍곡선 위의 점의 내분점 궤적과 점 사이 거리의 최댓값",
      body: R`두 초점이 \(\mathrm{F}(5, 0)\), \(\mathrm{F}'(-5, 0)\)이고, 주축의 길이가 \(6\)인 쌍곡선이 있다. 쌍곡선 위의 \(\overline{\mathrm{PF}} &lt; \overline{\mathrm{PF}'}\)인 점 \(\mathrm{P}\)에 대하여 점 \(\mathrm{Q}\)가
\[(|\vec{\mathrm{FP}}|+1)\vec{\mathrm{F}'\mathrm{Q}}=5\vec{\mathrm{QP}}\]
를 만족시킨다. 점 \(\mathrm{A}(-9, -3)\)에 대하여 \(|\vec{\mathrm{AQ}}|\)의 최댓값을 구하시오.`,
      short: true,
      answer: 10,
      help: R`벡터 조건식은 점 \(\mathrm{Q}\)가 선분 \(\mathrm{F}'\mathrm{P}\)를 \(5:(|\vec{\mathrm{FP}}|+1)\)로 내분하는 점임을 나타낸다. 쌍곡선의 정의 \(\overline{\mathrm{PF}'}=\overline{\mathrm{PF}}+6\)을 대입하면 \(\overline{\mathrm{F}'\mathrm{Q}}=5\)로 일정해져 점 \(\mathrm{Q}\)는 중심이 \(\mathrm{F}'(-5, 0)\)이고 반지름이 \(5\)인 원의 일부 호를 그린다. 점 \(\mathrm{A}\)에서 이 원 위의 점까지의 최대 거리를 구한다.`
    },
    {
      id: "2024-suneung-geom-28", exam: "2024-suneung", no: 28, score: 4,
      units: ["geom-space"], memo: "평면의 교선과 원·타원, 삼수선의 정리와 이면각",
      body: R`그림과 같이 서로 다른 두 평면 \(\alpha, \beta\)의 교선 위에 \(\overline{\mathrm{AB}}=18\)인 두 점 \(\mathrm{A}, \mathrm{B}\)가 있다. 선분 \(\mathrm{AB}\)를 지름으로 하는 원 \(C_1\)이 평면 \(\alpha\) 위에 있고, 선분 \(\mathrm{AB}\)를 장축으로 하고 두 점 \(\mathrm{F}, \mathrm{F}'\)을 초점으로 하는 타원 \(C_2\)가 평면 \(\beta\) 위에 있다.
원 \(C_1\) 위의 한 점 \(\mathrm{P}\)에서 평면 \(\beta\)에 내린 수선의 발을 \(\mathrm{H}\)라 할 때, \(\overline{\mathrm{HF}'} &lt; \overline{\mathrm{HF}}\)이고 \(\angle\mathrm{HFF}'=\dfrac{\pi}{6}\)이다. 직선 \(\mathrm{HF}\)와 타원 \(C_2\)가 만나는 점 중 점 \(\mathrm{H}\)와 가까운 점을 \(\mathrm{Q}\)라 하면, \(\overline{\mathrm{FH}} &lt; \overline{\mathrm{FQ}}\)이다.
점 \(\mathrm{H}\)를 중심으로 하고 점 \(\mathrm{Q}\)를 지나는 평면 \(\beta\) 위의 원은 반지름의 길이가 \(4\)이고 직선 \(\mathrm{AB}\)에 접한다. 두 평면 \(\alpha, \beta\)가 이루는 각의 크기를 \(\theta\)라 할 때, \(\cos\theta\)의 값은? (단, 점 \(\mathrm{P}\)는 평면 \(\beta\) 위에 있지 않다.)`,
      figure: "2024-suneung-geom-28.webp",
      choices: [R`\(\dfrac{2\sqrt{66}}{33}\)`, R`\(\dfrac{4\sqrt{69}}{69}\)`, R`\(\dfrac{\sqrt{2}}{3}\)`, R`\(\dfrac{4\sqrt{3}}{15}\)`, R`\(\dfrac{2\sqrt{78}}{39}\)`],
      answer: 5,
      help: R`원 \(C_1\)의 지름 \(18\), 타원 \(C_2\)의 장축 \(2a=18\)이다. 점 \(\mathrm{H}\)에서 직선 \(\mathrm{AB}\)에 접하므로 \(\mathrm{H}\)에서 \(\mathrm{AB}\)까지 거리가 \(4\)이다. 삼수선의 정리를 적용하여 점 \(\mathrm{P}\)의 위치와 높이 \(\overline{\mathrm{PH}}\)를 구하고, 이면각 공식 \(\cos\theta = \dfrac{\overline{\mathrm{HK}}}{\overline{\mathrm{PK}}}\)를 통해 코사인값을 산출한다.`
    },
    {
      id: "2024-suneung-geom-29", exam: "2024-suneung", no: 29, score: 4,
      units: ["geom-curve"], memo: "쌍곡선의 정의와 이등변삼각형 조건, 둘레의 길이",
      body: R`양수 \(c\)에 대하여 두 점 \(\mathrm{F}(c, 0), \mathrm{F}'(-c, 0)\)을 초점으로 하고, 주축의 길이가 \(6\)인 쌍곡선이 있다. 이 쌍곡선 위에 다음 조건을 만족시키는 서로 다른 두 점 \(\mathrm{P}, \mathrm{Q}\)가 존재하도록 하는 모든 \(c\)의 값의 합을 구하시오.`,
      note: [
        R`(가) 점 \(\mathrm{P}\)는 제\(1\)사분면 위에 있고, 점 \(\mathrm{Q}\)는 직선 \(\mathrm{PF}'\) 위에 있다.`,
        R`(나) 삼각형 \(\mathrm{PF}'\mathrm{F}\)는 이등변삼각형이다.`,
        R`(다) 삼각형 \(\mathrm{PQF}\)의 둘레의 길이는 \(28\)이다.`
      ],
      short: true,
      answer: 11,
      help: R`쌍곡선 정의 \(\overline{\mathrm{PF}'}-\overline{\mathrm{PF}}=6\)이다. \(\triangle \mathrm{PF}'\mathrm{F}\)가 이등변삼각형인 경우는 \(\overline{\mathrm{PF}}=\overline{\mathrm{FF}'}=2c\)인 경우와 \(\overline{\mathrm{PF}'}=\overline{\mathrm{FF}'}=2c\)인 경우로 나뉜다. 점 \(\mathrm{Q}\)가 쌍곡선 위에 있으므로 쌍곡선 정의를 \(\mathrm{Q}\)에도 적용하여 둘레의 길이 조건 \(28\)을 만족시키는 \(c\) 값들을 각각 구하여 합산한다.`
    },
    {
      id: "2024-suneung-geom-30", exam: "2024-suneung", no: 30, score: 4,
      units: ["geom-vector"], memo: "정삼각형 내분점 중심의 단위원 위의 점과 벡터 합 최대",
      body: R`좌표평면에 한 변의 길이가 \(4\)인 정삼각형 \(\mathrm{ABC}\)가 있다. 선분 \(\mathrm{AB}\)를 \(1:3\)으로 내분하는 점을 \(\mathrm{D}\), 선분 \(\mathrm{BC}\)를 \(1:3\)으로 내분하는 점을 \(\mathrm{E}\), 선분 \(\mathrm{CA}\)를 \(1:3\)으로 내분하는 점을 \(\mathrm{F}\)라 하자. 네 점 \(\mathrm{P}, \mathrm{Q}, \mathrm{R}, \mathrm{X}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(|\vec{\mathrm{DP}}|=|\vec{\mathrm{EQ}}|=|\vec{\mathrm{FR}}|=1\)`,
        R`(나) \(\vec{\mathrm{AX}}=\vec{\mathrm{PB}}+\vec{\mathrm{QC}}+\vec{\mathrm{RA}}\)`
      ],
            bodyAfter: R`\(|\vec{\mathrm{AX}}|\)의 값이 최대일 때, 삼각형 \(\mathrm{PQR}\)의 넓이를 \(S\)라 하자. \(16S^2\)의 값을 구하시오.`,
short: true,
      answer: 147,
      help: R`\(\vec{\mathrm{PB}}=\vec{\mathrm{DB}}-\vec{\mathrm{DP}}\) 등으로 분해하면 \(\vec{\mathrm{AX}}=(\vec{\mathrm{DB}}+\vec{\mathrm{EC}}+\vec{\mathrm{FA}})-(\vec{\mathrm{DP}}+\vec{\mathrm{EQ}}+\vec{\mathrm{FR}})\)이다. 상수 벡터와 크기 \(1\)인 세 벡터의 합이 최대가 되는 방향(반대 방향 정렬)을 결정한 뒤, 점 \(\mathrm{P}, \mathrm{Q}, \mathrm{R}\)의 좌표를 확정하여 삼각형 \(\mathrm{PQR}\)의 넓이 \(S\)를 구한다.`
    },
    {
      id: "2024-09-geom-28", exam: "2024-09", no: 28, score: 4,
      units: ["geom-space"], memo: "구와 평면의 교선원, 두 구의 교선 위의 점의 정사영 최대",
      body: R`좌표공간에 중심이 \(\mathrm{A}(0, 0, 1)\)이고 반지름의 길이가 \(4\)인 구 \(S\)가 있다. 구 \(S\)가 \(xy\)평면과 만나서 생기는 원을 \(C\)라 하고, 점 \(\mathrm{A}\)에서 선분 \(\mathrm{PQ}\)까지의 거리가 \(2\)가 되도록 원 \(C\) 위에 두 점 \(\mathrm{P}, \mathrm{Q}\)를 잡는다. 구 \(S\)가 선분 \(\mathrm{PQ}\)를 지름으로 하는 구 \(T\)와 만나서 생기는 원 위에서 점 \(\mathrm{B}\)가 움직일 때, 삼각형 \(\mathrm{BPQ}\)의 \(xy\)평면 위로의 정사영의 넓이의 최댓값은? (단, 점 \(\mathrm{B}\)의 \(z\)좌표는 양수이다.)`,
      figure: "2024-09-geom-28.webp",
      choices: [R`\(6\)`, R`\(3\sqrt{6}\)`, R`\(6\sqrt{2}\)`, R`\(3\sqrt{10}\)`, R`\(6\sqrt{3}\)`],
      answer: 1,
      help: R`원 \(C\)는 \(xy\)평면 상 중심 \((0,0,0)\), 반지름 \(\sqrt{4^2-1^2}=\sqrt{15}\)이다. 선분 \(\mathrm{PQ}\)의 길이와 중점의 위치를 구하고, 두 구의 교선원 평면의 방정식을 세운다. 점 \(\mathrm{B}\)의 정사영이 밑변 \(\mathrm{PQ}\)로부터 가장 멀어질 때의 정사영 삼각형 높이를 계산하여 최대 넓이를 구한다.`
    },
    {
      id: "2024-09-geom-29", exam: "2024-09", no: 29, score: 4,
      units: ["geom-curve"], memo: "타원의 정의를 이용한 점 간 거리 차의 최소와 원의 반지름",
      body: R`한 초점이 \(\mathrm{F}(c, 0)\) (\(c > 0\))인 타원 \(\dfrac{x^2}{9}+\dfrac{y^2}{5}=1\)과 중심의 좌표가 \((2, 3)\)이고 반지름의 길이가 \(r\)인 원이 있다. 타원 위의 점 \(\mathrm{P}\)와 원 위의 점 \(\mathrm{Q}\)에 대하여 \(\overline{\mathrm{PQ}}-\overline{\mathrm{PF}}\)의 최솟값이 \(6\)일 때, \(r\)의 값을 구하시오.`,
      short: true,
      answer: 17,
      help: R`타원의 장축 길이는 \(2a=6\), 초점은 \(\mathrm{F}(2, 0), \mathrm{F}'(-2, 0)\)이다. 타원의 정의에 의해 \(\overline{\mathrm{PF}}=6-\overline{\mathrm{PF}'}\)이므로 \(\overline{\mathrm{PQ}}-\overline{\mathrm{PF}}=\overline{\mathrm{PQ}}+\overline{\mathrm{PF}'}-6\)이다. \(\overline{\mathrm{PF}'}+\overline{\mathrm{PQ}}\)의 최솟값은 초점 \(\mathrm{F}'(-2, 0)\)에서 원 중심 \((2, 3)\)까지의 거리에서 반지름 \(r\)을 뺀 것이므로, 이를 통해 \(r\)을 구한다.`
    },
    {
      id: "2024-09-geom-30", exam: "2024-09", no: 30, score: 4,
      units: ["geom-vector"], memo: "직각이등변삼각형과 정삼각형의 벡터 방향 및 내적 조건, 선분 위의 점까지의 거리 합의 최소",
      body: R`좌표평면에서 \(\overline{\mathrm{AB}}=\overline{\mathrm{AC}}\)이고 \(\angle\mathrm{BAC}=\dfrac{\pi}{2}\)인 직각삼각형 \(\mathrm{ABC}\)에 대하여 두 점 \(\mathrm{P}, \mathrm{Q}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) 삼각형 \(\mathrm{APQ}\)는 정삼각형이고, \(9|\vec{\mathrm{PQ}}|\vec{\mathrm{PQ}} = 4|\vec{\mathrm{AB}}|\vec{\mathrm{AB}}\)이다.`,
        R`(나) \(\vec{\mathrm{AC}}\cdot\vec{\mathrm{AQ}} &lt; 0\)`,
        R`(다) \(\vec{\mathrm{PQ}}\cdot\vec{\mathrm{CB}} = 24\)`
      ],
            bodyAfter: R`선분 \(\mathrm{AQ}\) 위의 점 \(\mathrm{X}\)에 대하여 \(|\vec{\mathrm{XA}}+\vec{\mathrm{XB}}|\)의 최솟값을 \(m\)이라 할 때, \(m^2\)의 값을 구하시오.`,
short: true,
      answer: 27,
      help: R`조건 (가)에서 벡터 \(\vec{\mathrm{PQ}}\)와 \(\vec{\mathrm{AB}}\)가 같은 방향이고 크기 관계는 \(|\vec{\mathrm{PQ}}|=\dfrac{2}{3}|\vec{\mathrm{AB}}|\)이다. 조건 (다)에서 내적값으로 삼각형의 실제 크기를 구하고, 선분 \(\mathrm{AQ}\) 위의 점 \(\mathrm{X}\)에 대해 \(|\vec{\mathrm{XA}}+\vec{\mathrm{XB}}|=2|\vec{\mathrm{XM}}|\) (\(\mathrm{M}\)은 \(\mathrm{AB}\)의 중점)의 최솟값을 점과 직선 사이 거리로 계산한다.`
    },
    {
      id: "2024-06-geom-28", exam: "2024-06", no: 28, score: 4,
      units: ["geom-vector"], memo: "벡터 내적 및 거리 조건이 정의하는 도형과 영역의 교집합, 내적 계산",
      body: R`좌표평면의 네 점 \(\mathrm{A}(2, 6), \mathrm{B}(6, 2), \mathrm{C}(4, 4), \mathrm{D}(8, 6)\)에 대하여 다음 조건을 만족시키는 모든 점 \(\mathrm{X}\)의 집합을 \(S\)라 하자.`,
      note: [
        R`(가) \(\{(\vec{\mathrm{OX}}-\vec{\mathrm{OD}})\cdot\vec{\mathrm{OC}}\}\times\{|\vec{\mathrm{OX}}-\vec{\mathrm{OC}}|-3\}=0\)`,
        R`(나) 두 벡터 \(\vec{\mathrm{OX}}-\vec{\mathrm{OP}}\)와 \(\vec{\mathrm{OC}}\)가 서로 평행하도록 하는 선분 \(\mathrm{AB}\) 위의 점 \(\mathrm{P}\)가 존재한다.`
      ],
            bodyAfter: R`집합 \(S\)에 속하는 점 중에서 \(y\)좌표가 최대인 점을 \(\mathrm{Q}\), \(y\)좌표가 최소인 점을 \(\mathrm{R}\)이라 할 때, \(\vec{\mathrm{OQ}}\cdot\vec{\mathrm{OR}}\)의 값은? (단, \(\mathrm{O}\)는 원점이다.)`,
choices: [R`\(25\)`, R`\(26\)`, R`\(27\)`, R`\(28\)`, R`\(29\)`],
      answer: 5,
      help: R`조건 (가)는 점 \(\mathrm{X}\)가 직선(점 \(\mathrm{D}\)를 지나고 \(\vec{\mathrm{OC}}\)에 수직) 또는 원(중심 \(\mathrm{C}\), 반지름 \(3\)) 위에 있음을 뜻한다. 조건 (나)는 점 \(\mathrm{X}\)가 선분 \(\mathrm{AB}\)를 방향벡터 \(\vec{\mathrm{OC}}=(4,4)\)로 이동시킨 띠 영역 내에 있음을 의미한다. 교집합에서 최고점 \(\mathrm{Q}\)와 최저점 \(\mathrm{R}\)의 좌표를 찾아 내적을 구한다.`
    },
    {
      id: "2024-06-geom-29", exam: "2024-06", no: 29, score: 4,
      units: ["geom-curve"], memo: "두 쌍곡선의 정의와 초점 거리, 등차중항 관계를 통한 기울기 계산",
      body: R`두 점 \(\mathrm{F}(c, 0), \mathrm{F}'(-c, 0)\) (\(c > 0\))을 초점으로 하는 두 쌍곡선
\[C_1: x^2-\dfrac{y^2}{24}=1, \quad C_2: \dfrac{x^2}{4}-\dfrac{y^2}{21}=1\]
이 있다. 쌍곡선 \(C_1\) 위에 있는 제\(2\)사분면 위의 점 \(\mathrm{P}\)에 대하여 선분 \(\mathrm{PF}'\)이 쌍곡선 \(C_2\)와 만나는 점을 \(\mathrm{Q}\)라 하자. \(\overline{\mathrm{PQ}}+\overline{\mathrm{QF}}, 2\overline{\mathrm{PF}'}, \overline{\mathrm{PF}}+\overline{\mathrm{PF}'}\)이 이 순서대로 등차수열을 이룰 때, 직선 \(\mathrm{PQ}\)의 기울기는 \(m\)이다. \(60m\)의 값을 구하시오.`,
      figure: "2024-06-geom-29.webp",
      short: true,
      answer: 80,
      help: R`두 쌍곡선 모두 \(c=5\)로 초점을 공유한다. 쌍곡선의 정의식 \(\overline{\mathrm{PF}}-\overline{\mathrm{PF}'}=2a_1=2\), \(\overline{\mathrm{QF}}-\overline{\mathrm{QF}'}=2a_2=4\)와 \(\overline{\mathrm{PF}'}=\overline{\mathrm{PQ}}+\overline{\mathrm{QF}'}\)을 대입하여 등차중항 관계식을 정리하면 선분들의 길이가 모두 구해지고, 코사인법칙 또는 좌표로 직선 \(\mathrm{PQ}\)의 기울기를 산출한다.`
    },
    {
      id: "2024-06-geom-30", exam: "2024-06", no: 30, score: 4,
      units: ["geom-vector"], memo: "타원과 직선 위의 점의 벡터합 영역의 넓이",
      body: R`직선 \(2x+y=0\) 위를 움직이는 점 \(\mathrm{P}\)와 타원 \(2x^2+y^2=3\) 위를 움직이는 점 \(\mathrm{Q}\)에 대하여
\[\vec{\mathrm{OX}}=\vec{\mathrm{OP}}+\vec{\mathrm{OQ}}\]
를 만족시키고, \(x\)좌표와 \(y\)좌표가 모두 \(0\) 이상인 모든 점 \(\mathrm{X}\)가 나타내는 영역의 넓이는 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2024-06-geom-30.webp",
      short: true,
      answer: 13,
      help: R`타원 위의 점 \(\mathrm{Q}\)를 직선 \(y=-2x\) 방향으로 스윕(sweep)한 영역이 제\(1\)사분면과 만나는 부분의 넓이를 구하는 문제이다. 타원의 접선 중 기울기가 \(-2\)인 접선을 구하여 제\(1\)사분면에서 둘러싸인 사다리꼴 또는 평행사변형 영역의 넓이를 적분 또는 기하학적 도형 분할로 계산한다.`
    },
    {
      id: "2023-suneung-geom-28", exam: "2023-suneung", no: 28, score: 4,
      units: ["geom-curve"], memo: "쌍곡선의 점근선 평행선과 초점 연결 선분의 길이 비, 주축 길이",
      body: R`두 초점이 \(\mathrm{F}(c, 0), \mathrm{F}'(-c, 0)\) (\(c > 0\))인 쌍곡선 \(C\)와 \(y\)축 위의 점 \(\mathrm{A}\)가 있다. 쌍곡선 \(C\)가 선분 \(\mathrm{AF}\)와 만나는 점을 \(\mathrm{P}\), 선분 \(\mathrm{AF}'\)과 만나는 점을 \(\mathrm{P}'\)이라 하자. 직선 \(\mathrm{AF}\)는 쌍곡선 \(C\)의 한 점근선과 평행하고 \(\overline{\mathrm{AP}}:\overline{\mathrm{PP}'}=5:6, \overline{\mathrm{PF}}=1\)일 때, 쌍곡선 \(C\)의 주축의 길이는?`,
      figure: "2023-suneung-geom-28.webp",
      choices: [R`\(\dfrac{13}{6}\)`, R`\(\dfrac{9}{4}\)`, R`\(\dfrac{7}{3}\)`, R`\(\dfrac{29}{12}\)`, R`\(\dfrac{5}{2}\)`],
      answer: 2,
      help: R`점근선의 기울기를 \(m=\dfrac{b}{a}\)라 할 때, \(\mathrm{A}\)의 좌표와 직선 방정식을 세우고 좌우 대칭성을 이용한다. \(\overline{\mathrm{AP}}:\overline{\mathrm{PP}'}=5:6\)과 쌍곡선의 정의 \(\overline{\mathrm{P}'\mathrm{F}}-\overline{\mathrm{P}'\mathrm{F}'}=2a\)를 닮음 및 코사인법칙과 연립하여 주축의 길이 \(2a\)를 구한다.`
    },
    {
      id: "2023-suneung-geom-29", exam: "2023-suneung", no: 29, score: 4,
      units: ["geom-vector"], memo: "등변사다리꼴과 벡터 방정식, 원주각 관계를 통한 내적 계산",
      body: R`평면 \(\alpha\) 위에 \(\overline{\mathrm{AB}}=\overline{\mathrm{CD}}=\overline{\mathrm{AD}}=2\), \(\angle\mathrm{ABC}=\angle\mathrm{BCD}=\dfrac{\pi}{3}\)인 사다리꼴 \(\mathrm{ABCD}\)가 있다. 다음 조건을 만족시키는 평면 \(\alpha\) 위의 두 점 \(\mathrm{P}, \mathrm{Q}\)에 대하여 \(\vec{\mathrm{CP}}\cdot\vec{\mathrm{DQ}}\)의 값을 구하시오.`,
      figure: "2023-suneung-geom-29.webp",
      note: [
        R`(가) \(\vec{\mathrm{AC}}=2(\vec{\mathrm{AD}}+\vec{\mathrm{BP}})\)`,
        R`(나) \(\vec{\mathrm{AC}}\cdot\vec{\mathrm{PQ}}=6\)`,
        R`(다) \(2\times\angle\mathrm{BQA}=\angle\mathrm{PBQ} &lt; \dfrac{\pi}{2}\)`
      ],
      short: true,
      answer: 12,
      help: R`사다리꼴 \(\mathrm{ABCD}\)의 좌표를 설정하고 조건 (가)를 정리하여 점 \(\mathrm{P}\)의 위치를 확정한다. 조건 (나)와 (다)에서 점 \(\mathrm{Q}\)는 원주각 성질에 의해 특정 원 위의 점이 되며, 내적 방정식으로 점 \(\mathrm{Q}\)의 좌표를 구해 \(\vec{\mathrm{CP}}\cdot\vec{\mathrm{DQ}}\)를 계산한다.`
    },
    {
      id: "2023-suneung-geom-30", exam: "2023-suneung", no: 30, score: 4,
      units: ["geom-space"], memo: "정사면체와 구의 교점, 접평면 위로의 정사영 넓이",
      body: R`좌표공간에 정사면체 \(\mathrm{ABCD}\)가 있다. 정삼각형 \(\mathrm{BCD}\)의 외심을 중심으로 하고 점 \(\mathrm{B}\)를 지나는 구를 \(S\)라 하자. 구 \(S\)와 선분 \(\mathrm{AB}\)가 만나는 점 중 \(\mathrm{B}\)가 아닌 점을 \(\mathrm{P}\), 구 \(S\)와 선분 \(\mathrm{AC}\)가 만나는 점 중 \(\mathrm{C}\)가 아닌 점을 \(\mathrm{Q}\), 구 \(S\)와 선분 \(\mathrm{AD}\)가 만나는 점 중 \(\mathrm{D}\)가 아닌 점을 \(\mathrm{R}\)라 하고, 점 \(\mathrm{P}\)에서 구 \(S\)에 접하는 평면을 \(\alpha\)라 하자. 구 \(S\)의 반지름의 길이가 \(6\)일 때, 삼각형 \(\mathrm{PQR}\)의 평면 \(\alpha\) 위로의 정사영의 넓이는 \(k\)이다. \(k^2\)의 값을 구하시오.`,
      figure: "2023-suneung-geom-30.webp",
      short: true,
      answer: 24,
      help: R`정사면체의 대칭성에 의해 \(\triangle \mathrm{PQR}\)은 \(\triangle \mathrm{BCD}\)와 평행한 정삼각형이다. 구의 반지름 \(R=6\)과 정사면체 높이·모서리 길이를 구하고, 구의 중심 \(\mathrm{O}\)와 \(\mathrm{P}\)를 잇는 법선벡터 \(\vec{\mathrm{OP}}\)를 구하여 접평면 \(\alpha\)와 \(\triangle \mathrm{PQR}\)이 이루는 각의 코사인을 곱해 정사영 넓이 \(k\)를 구한다.`
    },
    {
      id: "2023-09-geom-28", exam: "2023-09", no: 28, score: 4,
      units: ["geom-curve"], memo: "두 포물선의 정의와 초점 거리 일치 조건, 유일해 조건",
      body: R`실수 \(p\) (\(p\ge 1\))과 함수 \(f(x)=(x+a)^2\)에 대하여 두 포물선
\[C_1: y^2=4x, \quad C_2: (y-3)^2=4p\{x-f(p)\}\]
가 제\(1\)사분면에서 만나는 점을 \(\mathrm{A}\)라 하자. 두 포물선 \(C_1, C_2\)의 초점을 각각 \(\mathrm{F}_1, \mathrm{F}_2\)라 할 때, \(\overline{\mathrm{AF}_1}=\overline{\mathrm{AF}_2}\)를 만족시키는 \(p\)가 오직 하나가 되도록 하는 상수 \(a\)의 값은?`,
      figure: "2023-09-geom-28.webp",
      choices: [R`\(-\dfrac{3}{4}\)`, R`\(-\dfrac{5}{8}\)`, R`\(-\dfrac{1}{2}\)`, R`\(-\dfrac{3}{8}\)`, R`\(-\dfrac{1}{4}\)`],
      answer: 1,
      help: R`포물선의 정의에 의해 \(\overline{\mathrm{AF}_1}=x_A+1\), \(\overline{\mathrm{AF}_2}=x_A-f(p)+p\)이다. 두 거리가 같으므로 \(x_A+1 = x_A-(p+a)^2+p\)에서 \((p+a)^2 = p-1\)이라는 \(p\)에 대한 이차방정식을 얻고, \(p\ge 1\)에서 오직 하나의 실근을 가질 조건을 판별식 및 근의 위치 판정으로 구한다.`
    },
    {
      id: "2023-09-geom-29", exam: "2023-09", no: 29, score: 4,
      units: ["geom-space"], memo: "두 구의 접평면과 단면원, 정사영의 넓이",
      body: R`좌표공간에 두 개의 구
\[S_1: x^2+y^2+(z-2)^2=4, \quad S_2: x^2+y^2+(z+7)^2=49\]
가 있다. 점 \(\mathrm{A}(\sqrt{5}, 0, 0)\)을 지나고 \(zx\)평면에 수직이며, 구 \(S_1\)과 \(z\)좌표가 양수인 한 점에서 접하는 평면을 \(\alpha\)라 하자. 구 \(S_2\)가 평면 \(\alpha\)와 만나서 생기는 원을 \(C\)라 할 때, 원 \(C\) 위의 점 중 \(z\)좌표가 최소인 점을 \(\mathrm{B}\)라 하고 구 \(S_2\)와 점 \(\mathrm{B}\)에서 접하는 평면을 \(\beta\)라 하자. 원 \(C\)의 평면 \(\beta\) 위로의 정사영의 넓이가 \(\dfrac{q}{p}\pi\)일 때, \(p+q\)의 값을 구하시오. (단, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2023-09-geom-29.webp",
      short: true,
      answer: 127,
      help: R`\(zx\)평면(단면 \(y=0\))에서 두 구와 평면 \(\alpha\)의 접선 방정식을 구하여 평면 \(\alpha\)의 법선벡터와 원 \(C\)의 반지름을 구한다. 최저점 \(\mathrm{B}\)에서의 접평면 \(\beta\)의 법선벡터와 평면 \(\alpha\)의 법선벡터가 이루는 각 \(\theta\)의 \(\cos\theta\)를 계산하여 정사영 넓이를 구한다.`
    },
    {
      id: "2023-09-geom-30", exam: "2023-09", no: 30, score: 4,
      units: ["geom-vector"], memo: "원호 위의 두 동점의 벡터합이 그리는 곡선의 길이",
      body: R`좌표평면 위에 두 점 \(\mathrm{A}(-2, 2), \mathrm{B}(2, 2)\)가 있다.
\[(|\vec{\mathrm{AX}}|-2)(|\vec{\mathrm{BX}}|-2)=0, \quad |\vec{\mathrm{OX}}|\ge 2\]
를 만족시키는 점 \(\mathrm{X}\)가 나타내는 도형 위를 움직이는 두 점 \(\mathrm{P}, \mathrm{Q}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \(\vec{u}=(1, 0)\)에 대하여 \((\vec{\mathrm{OP}}\cdot\vec{u})(\vec{\mathrm{OQ}}\cdot\vec{u})\ge 0\)이다.`,
        R`(나) \(|\vec{\mathrm{PQ}}|=2\)`
      ],
            bodyAfter: R`\(\vec{\mathrm{OY}}=\vec{\mathrm{OP}}+\vec{\mathrm{OQ}}\)를 만족시키는 점 \(\mathrm{Y}\)의 집합이 나타내는 도형의 길이가 \(\dfrac{q}{p}\sqrt{3}\pi\)일 때, \(p+q\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
short: true,
      answer: 17,
      help: R`도형 \(S\)는 두 원의 일부분(외부 영역) 호이다. 조건 (가)는 두 점 \(\mathrm{P}, \mathrm{Q}\)가 같은 사분면(좌반평면 또는 우반평면)의 원호 위에 있음을 뜻하고, \(|\vec{\mathrm{PQ}}|=2\)는 현의 길이가 반지름과 같아 중심각이 \(\dfrac{\pi}{3}\)임을 나타낸다. 두 벡터의 합 \(\vec{\mathrm{OY}}=2\vec{\mathrm{OM}}\)이 그리는 호의 중심각과 곡선 길이를 계산한다.`
    },
    {
      id: "2023-06-geom-28", exam: "2023-06", no: 28, score: 4,
      units: ["geom-curve"], memo: "쌍곡선의 정의와 접선 조건, 거리 차의 최대",
      body: R`좌표평면에서 직선 \(y=2x-3\) 위를 움직이는 점 \(\mathrm{P}\)가 있다. 두 점 \(\mathrm{A}(c, 0), \mathrm{B}(-c, 0)\) (\(c > 0\))에 대하여 \(\overline{\mathrm{PB}}-\overline{\mathrm{PA}}\)의 값이 최대가 되도록 하는 점 \(\mathrm{P}\)의 좌표가 \((3, 3)\)일 때, 상수 \(c\)의 값은?`,
      choices: [R`\(\dfrac{3\sqrt{6}}{2}\)`, R`\(\dfrac{3\sqrt{7}}{2}\)`, R`\(3\sqrt{2}\)`, R`\(\dfrac{9}{2}\)`, R`\(\dfrac{3\sqrt{10}}{2}\)`],
      answer: 1,
      help: R`초점이 \(\mathrm{A}(c, 0), \mathrm{B}(-c, 0)\)인 쌍곡선에 대해 직선 \(y=2x-3\)이 점 \(\mathrm{P}(3, 3)\)에서 접할 때 거리 차 \(\overline{\mathrm{PB}}-\overline{\mathrm{PA}}=2a\)가 최대가 된다. 점 \((3, 3)\)에서의 접선의 기울기가 \(2\)임을 이용하여 쌍곡선의 방정식 \(\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1\)의 계수들을 구하고 초점 거리 \(c=\sqrt{a^2+b^2}\)을 산출한다.`
    },
    {
      id: "2023-06-geom-29", exam: "2023-06", no: 29, score: 4,
      units: ["geom-curve"], memo: "두 포물선의 정의와 둘레 조건, 삼각형의 넓이",
      body: R`초점이 \(\mathrm{F}\)인 포물선 \(y^2=8x\) 위의 점 중 제\(1\)사분면에 있는 점 \(\mathrm{P}\)를 지나고 \(x\)축과 평행한 직선이 포물선 \(y^2=8x\)의 준선과 만나는 점을 \(\mathrm{F}'\)이라 하자. 점 \(\mathrm{F}'\)을 초점, 점 \(\mathrm{P}\)를 꼭짓점으로 하는 포물선이 포물선 \(y^2=8x\)와 만나는 점 중 \(\mathrm{P}\)가 아닌 점을 \(\mathrm{Q}\)라 하자. 사각형 \(\mathrm{PF}'\mathrm{QF}\)의 둘레의 길이가 \(12\)일 때, 삼각형 \(\mathrm{PF}'\mathrm{Q}\)의 넓이는 \(\dfrac{q}{p}\sqrt{2}\)이다. \(p+q\)의 값을 구하시오. (단, 점 \(\mathrm{P}\)의 \(x\)좌표는 \(2\)보다 작고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2023-06-geom-29.webp",
      short: true,
      answer: 23,
      help: R`포물선 \(y^2=8x\)의 준선은 \(x=-2\)이다. 포물선의 정의에 의해 \(\overline{\mathrm{PF}}=\overline{\mathrm{PF}'}=x_P+2\)이다. 두 번째 포물선의 초점과 준선 성질을 이용해 점 \(\mathrm{Q}\)의 위치와 사각형의 네 변의 길이를 \(x_P\)로 나타내고 둘레가 \(12\)임을 연립하여 \(\triangle \mathrm{PF}'\mathrm{Q}\)의 넓이를 구한다.`
    },
    {
      id: "2023-06-geom-30", exam: "2023-06", no: 30, score: 4,
      units: ["geom-vector"], memo: "정육각형 변 위의 점과 원 위의 점의 합성 궤적 및 벡터 내분 조건",
      body: R`좌표평면에서 한 변의 길이가 \(4\)인 정육각형 \(\mathrm{ABCDEF}\)의 변 위를 움직이는 점 \(\mathrm{P}\)가 있고, 점 \(\mathrm{C}\)를 중심으로 하고 반지름의 길이가 \(1\)인 원 위를 움직이는 점 \(\mathrm{Q}\)가 있다. 두 점 \(\mathrm{P}, \mathrm{Q}\)와 실수 \(k\)에 대하여 점 \(\mathrm{X}\)가 다음 조건을 만족시킬 때, \(|\vec{\mathrm{CX}}|\)의 값이 최소가 되도록 하는 \(k\)의 값을 \(\alpha\), \(|\vec{\mathrm{CX}}|\)의 값이 최대가 되도록 하는 \(k\)의 값을 \(\beta\)라 하자.`,
      figure: "2023-06-geom-30.webp",
      note: [
        R`(가) \(\vec{\mathrm{CX}} = \dfrac{1}{2}\vec{\mathrm{CP}} + \vec{\mathrm{CQ}}\)`,
        R`(나) \(\vec{\mathrm{XA}} + \vec{\mathrm{XC}} + 2\vec{\mathrm{XD}} = k\vec{\mathrm{CD}}\)`
      ],
            bodyAfter: R`\(\alpha^2+\beta^2\)의 값을 구하시오.`,
short: true,
      answer: 8,
      help: R`조건 (나)를 점 \(\mathrm{C}\) 기준으로 정리하면 \(4\vec{\mathrm{XC}}+\vec{\mathrm{CA}}+2\vec{\mathrm{CD}}=k\vec{\mathrm{CD}}\)에서 \(\vec{\mathrm{CX}}=\dfrac{1}{4}\vec{\mathrm{CA}}+\dfrac{2-k}{4}\vec{\mathrm{CD}}\)가 되어 점 \(\mathrm{X}\)는 직선 위에 놓인다. 조건 (가)가 나타내는 영역(정육각형의 \(1/2\) 축소 도형에 반지름 \(1\) 원을 더한 띠 영역)과 직선의 교선 범위를 분석하여 \(k\)의 최소 \(\alpha\)와 최대 \(\beta\)를 구한다.`
    },
    {
      id: "2022-suneung-geom-28", exam: "2022-suneung", no: 28, score: 4,
      units: ["geom-curve"], memo: "두 포물선의 초점을 잇는 선분과 포물선의 정의",
      body: R`두 양수 \(a, p\)에 대하여 포물선 \((y-a)^2=4px\)의 초점을 \(\mathrm{F}_1\)이라 하고, 포물선 \(y^2=-4x\)의 초점을 \(\mathrm{F}_2\)라 하자. 선분 \(\mathrm{F}_1\mathrm{F}_2\)가 두 포물선과 만나는 점을 각각 \(\mathrm{P}, \mathrm{Q}\)라 할 때, \(\overline{\mathrm{F}_1\mathrm{F}_2}=3, \overline{\mathrm{PQ}}=1\)이다. \(a^2+p^2\)의 값은?`,
      figure: "2022-suneung-geom-28.webp",
      choices: [R`\(6\)`, R`\(\dfrac{25}{4}\)`, R`\(\dfrac{13}{2}\)`, R`\(\dfrac{27}{4}\)`, R`\(7\)`],
      answer: 5,
      help: R`두 포물선의 초점은 \(\mathrm{F}_1(p, a), \mathrm{F}_2(-1, 0)\)이고 \(\overline{\mathrm{F}_1\mathrm{F}_2}=\sqrt{(p+1)^2+a^2}=3\)이다. 두 점 \(\mathrm{P}, \mathrm{Q}\)에서의 준선까지 거리를 포물선의 정의로 표현하고, 선분 \(\mathrm{F}_1\mathrm{F}_2\) 위의 내분 관계와 \(\overline{\mathrm{PQ}}=1\) 조건을 결합하여 \(p\)와 \(a\)를 구한다.`
    },
    {
      id: "2022-suneung-geom-29", exam: "2022-suneung", no: 29, score: 4,
      units: ["geom-vector"], memo: "평행사변형 내부 점의 내적 조건과 선분 궤적, 원 위의 동점까지 거리 최대·최소",
      body: R`좌표평면에서 \(\overline{\mathrm{OA}}=\sqrt{2}, \overline{\mathrm{OB}}=2\sqrt{2}\)이고 \(\cos(\angle\mathrm{AOB})=\dfrac{1}{4}\)인 평행사변형 \(\mathrm{OACB}\)에 대하여 점 \(\mathrm{P}\)가 다음 조건을 만족시킨다.`,
      figure: "2022-suneung-geom-29.webp",
      note: [
        R`(가) \(\vec{\mathrm{OP}}=s\vec{\mathrm{OA}}+t\vec{\mathrm{OB}}\) (\(0\le s\le 1, 0\le t\le 1\))`,
        R`(나) \(\vec{\mathrm{OP}}\cdot\vec{\mathrm{OB}}+\vec{\mathrm{BP}}\cdot\vec{\mathrm{BC}}=2\)`
      ],
            bodyAfter: R`점 \(\mathrm{O}\)를 중심으로 하고 점 \(\mathrm{A}\)를 지나는 원 위를 움직이는 점 \(\mathrm{X}\)에 대하여 \(|3\vec{\mathrm{OP}}-\vec{\mathrm{OX}}|\)의 최댓값과 최솟값을 각각 \(M, m\)이라 하자. \(M\times m=a\sqrt{6}+b\)일 때, \(a^2+b^2\)의 값을 구하시오. (단, \(a\)와 \(b\)는 유리수이다.)`,
short: true,
      answer: 100,
      help: R`조건 (나)에 \(\vec{\mathrm{OP}}=s\vec{\mathrm{OA}}+t\vec{\mathrm{OB}}\)와 \(\vec{\mathrm{BC}}=\vec{\mathrm{OA}}\)를 대입하여 내적을 계산하면 \(2s+8t=2\), 즉 \(s+4t=1\)인 선분을 얻는다. 점 \(3\mathrm{P}\)가 그리는 선분 위의 점에서 원점까지의 최단·최장거리를 구한 뒤 반지름 \(r=\sqrt{2}\)를 더하고 빼서 \(M\)과 \(m\)을 구한다.`
    },
    {
      id: "2022-suneung-geom-30", exam: "2022-suneung", no: 30, score: 4,
      units: ["geom-space"], memo: "구의 대원과 구 위의 점의 정사영 넓이 최대 및 이면각",
      body: R`좌표공간에 중심이 \(\mathrm{C}(2, \sqrt{5}, 5)\)이고 점 \(\mathrm{P}(0, 0, 1)\)을 지나는 구
\[S: (x-2)^2+(y-\sqrt{5})^2+(z-5)^2=25\]
가 있다. 구 \(S\)가 평면 \(\mathrm{OPC}\)와 만나서 생기는 원 위를 움직이는 점 \(\mathrm{Q}\), 구 \(S\) 위를 움직이는 점 \(\mathrm{R}\)에 대하여 두 점 \(\mathrm{Q}, \mathrm{R}\)의 \(xy\)평면 위로의 정사영을 각각 \(\mathrm{Q}_1, \mathrm{R}_1\)이라 하자. 삼각형 \(\mathrm{O}\mathrm{Q}_1\mathrm{R}_1\)의 넓이가 최대가 되도록 하는 두 점 \(\mathrm{Q}, \mathrm{R}\)에 대하여 삼각형 \(\mathrm{O}\mathrm{Q}_1\mathrm{R}_1\)의 평면 \(\mathrm{PQR}\) 위로의 정사영의 넓이는 \(\dfrac{q}{p}\sqrt{6}\)이다. \(p+q\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이고 세 점 \(\mathrm{O}, \mathrm{Q}_1, \mathrm{R}_1\)은 한 직선 위에 있지 않으며, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      figure: "2022-suneung-geom-30.webp",
      short: true,
      answer: 23,
      help: R`평면 \(\mathrm{OPC}\)는 원점을 지나므로 \(xy\)평면 위의 정사영 선분 \(\mathrm{OQ}_1\)의 위치를 삼각함수로 표현한다. \(\triangle \mathrm{OQ}_1\mathrm{R}_1\)의 넓이가 최대가 되는 기하학적 배치에서 점 \(\mathrm{Q}\)와 \(\mathrm{R}\)의 3차원 좌표를 결정하고, 평면 \(\mathrm{PQR}\)의 법선벡터를 구해 \(xy\)평면과의 이면각 코사인을 곱하여 정사영 넓이를 구한다.`
    },
    {
      id: "2022-09-geom-28", exam: "2022-09", no: 28, score: 4,
      units: ["geom-curve"], memo: "타원의 접선과 초점을 지나는 평행선, 삼각형의 둘레의 길이",
      body: R`그림과 같이 두 점 \(\mathrm{F}(c, 0), \mathrm{F}'(-c, 0)\) (\(c > 0\))을 초점으로 하는 타원 \(\dfrac{x^2}{16}+\dfrac{y^2}{12}=1\) 위의 점 \(\mathrm{P}(2, 3)\)에서 타원에 접하는 직선을 \(l\)이라 하자. 점 \(\mathrm{F}\)를 지나고 \(l\)과 평행한 직선이 타원과 만나는 점 중 제\(2\)사분면 위에 있는 점을 \(\mathrm{Q}\)라 하자. 두 직선 \(\mathrm{F}'\mathrm{Q}\)와 \(l\)이 만나는 점을 \(\mathrm{R}\), \(l\)과 \(x\)축이 만나는 점을 \(\mathrm{S}\)라 할 때, 삼각형 \(\mathrm{SRF}'\)의 둘레의 길이는?`,
      figure: "2022-09-geom-28.webp",
      choices: [R`\(30\)`, R`\(31\)`, R`\(32\)`, R`\(33\)`, R`\(34\)`],
      answer: 1,
      help: R`타원의 장축 길이는 \(2a=8\), 초점은 \(c=\sqrt{16-12}=2\)이므로 \(\mathrm{F}(2, 0), \mathrm{F}'(-2, 0)\)이다. 점 \(\mathrm{P}(2, 3)\)에서의 접선 방정식은 \(\dfrac{2x}{16}+\dfrac{3y}{12}=1\implies x+2y=8\)이며 \(\mathrm{S}(8, 0)\)이다. 타원의 광학적 성질 및 평행선과 닮음을 활용하여 삼각형 \(\mathrm{SRF}'\)의 각 변의 길이를 구하여 둘레를 완성한다.`
    },
    {
      id: "2022-09-geom-29", exam: "2022-09", no: 29, score: 4,
      units: ["geom-space"], memo: "종이접기 입체도형과 삼수선의 정리, 두 평면이 이루는 각",
      body: R`그림과 같이 한 변의 길이가 \(8\)인 정사각형 \(\mathrm{ABCD}\)에 두 선분 \(\mathrm{AB}, \mathrm{CD}\)를 각각 지름으로 하는 두 반원이 붙어 있는 모양의 종이가 있다. 반원의 호 \(\mathrm{AB}\)의 삼등분점 중 점 \(\mathrm{B}\)에 가까운 점을 \(\mathrm{P}\)라 하고, 반원의 호 \(\mathrm{CD}\)를 이등분하는 점을 \(\mathrm{Q}\)라 하자. 이 종이에서 두 선분 \(\mathrm{AB}\)와 \(\mathrm{CD}\)를 접는 선으로 하여 두 반원을 접어 올렸을 때 두 점 \(\mathrm{P}, \mathrm{Q}\)에서 평면 \(\mathrm{ABCD}\)에 내린 수선의 발을 각각 \(\mathrm{G}, \mathrm{H}\)라 하면 두 점 \(\mathrm{G}, \mathrm{H}\)는 정사각형 \(\mathrm{ABCD}\)의 내부에 놓여 있고, \(\overline{\mathrm{PG}}=\sqrt{3}, \overline{\mathrm{QH}}=2\sqrt{3}\)이다. 두 평면 \(\mathrm{PCQ}\)와 \(\mathrm{ABCD}\)가 이루는 각의 크기가 \(\theta\)일 때, \(70\times\cos^2\theta\)의 값을 구하시오. (단, 종이의 두께는 고려하지 않는다.)`,
      figure: "2022-09-geom-29.webp",
      short: true,
      answer: 40,
      help: R`반원의 반지름은 \(4\)이다. 접어 올린 각도를 \(\overline{\mathrm{PG}}=\sqrt{3}, \overline{\mathrm{QH}}=2\sqrt{3}\)으로부터 구하여 세 점 \(\mathrm{P}, \mathrm{C}, \mathrm{Q}\)의 3차원 공간좌표를 설정한다. 평면 \(\mathrm{PCQ}\)의 법선벡터를 구하고 바닥 평면(법선벡터 \((0,0,1)\))과의 사잇각 \(\theta\)의 코사인값을 계산한다.`
    },
    {
      id: "2022-09-geom-30", exam: "2022-09", no: 30, score: 4,
      units: ["geom-vector"], memo: "원 위의 점의 내적 최소 조건과 선분 위의 점의 거리 제곱 최댓값",
      body: R`좌표평면에서 세 점 \(\mathrm{A}(-3, 1), \mathrm{B}(0, 2), \mathrm{C}(1, 0)\)에 대하여 두 점 \(\mathrm{P}, \mathrm{Q}\)가
\[|\vec{\mathrm{AP}}|=1, \quad |\vec{\mathrm{BQ}}|=2, \quad \vec{\mathrm{AP}}\cdot\vec{\mathrm{OC}}\ge \dfrac{\sqrt{2}}{2}\]
를 만족시킬 때, \(\vec{\mathrm{AP}}\cdot\vec{\mathrm{AQ}}\)의 값이 최소가 되도록 하는 두 점 \(\mathrm{P}, \mathrm{Q}\)를 각각 \(\mathrm{P}_0, \mathrm{Q}_0\)이라 하자. 선분 \(\mathrm{AP}_0\) 위의 점 \(\mathrm{X}\)에 대하여 \(\vec{\mathrm{BX}}\cdot\vec{\mathrm{BQ}}_0\ge 1\)일 때, \(|\vec{\mathrm{Q}_0\mathrm{X}}|^2\)의 최댓값은 \(\dfrac{q}{p}\)이다. \(p+q\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이고, \(p\)와 \(q\)는 서로소인 자연수이다.)`,
      short: true,
      answer: 45,
      help: R`\(\vec{\mathrm{AP}}\cdot\vec{\mathrm{AQ}}=\vec{\mathrm{AP}}\cdot(\vec{\mathrm{AB}}+\vec{\mathrm{BQ}})=\vec{\mathrm{AP}}\cdot\vec{\mathrm{AB}}+\vec{\mathrm{AP}}\cdot\vec{\mathrm{BQ}}\)이다. \(\vec{\mathrm{BQ}}\)를 \(\vec{\mathrm{AP}}\)의 반대 방향으로 잡고 코사인 조건 내에서 최소가 되는 방향을 결정하여 \(\mathrm{P}_0, \mathrm{Q}_0\)의 위치를 확정한다. 선분 \(\mathrm{AP}_0\) 상의 점 \(\mathrm{X}\)의 조건부 범위에서 \(|\vec{\mathrm{Q}_0\mathrm{X}}|^2\)의 최댓값을 계산한다.`
    },
    {
      id: "2022-06-geom-28", exam: "2022-06", no: 28, score: 4,
      units: ["geom-curve"], memo: "타원의 꼭짓점을 중심으로 하는 원과 초점 및 꼭짓점의 교점 관계",
      body: R`두 초점이 \(\mathrm{F}, \mathrm{F}'\)이고 장축의 길이가 \(2a\)인 타원이 있다. 이 타원의 한 꼭짓점을 중심으로 하고 반지름의 길이가 \(1\)인 원이 이 타원의 서로 다른 두 꼭짓점과 한 초점을 지날 때, 상수 \(a\)의 값은?`,
      figure: "2022-06-geom-28.webp",
      choices: [R`\(\dfrac{\sqrt{2}}{2}\)`, R`\(\dfrac{\sqrt{6}-1}{2}\)`, R`\(\sqrt{3}-1\)`, R`\(2\sqrt{2}-2\)`, R`\(\dfrac{\sqrt{3}}{2}\)`],
      answer: 3,
      help: R`원의 중심이 타원의 단축 꼭짓점 \((0, b)\)일 때, 원이 장축 꼭짓점 \((a, 0), (-a, 0)\)과 초점 \((c, 0)\)을 지나므로 피타고라스 정리로 \(a^2+b^2=1\) 및 초점 조건 \(b^2+c^2=1\)과 타원 정의 \(a^2-b^2=c^2\)을 연립하여 \(a\)를 구한다.`
    },
    {
      id: "2022-06-geom-29", exam: "2022-06", no: 29, score: 4,
      units: ["geom-curve"], memo: "두 포물선의 정의와 공통 직선 위의 두 점 사이 거리",
      body: R`포물선 \(y^2=8x\)와 직선 \(y=2x-4\)가 만나는 점 중 제\(1\)사분면 위에 있는 점을 \(\mathrm{A}\)라 하자. 양수 \(a\)에 대하여 포물선 \((y-2a)^2=8(x-a)\)가 점 \(\mathrm{A}\)를 지날 때, 직선 \(y=2x-4\)와 포물선 \((y-2a)^2=8(x-a)\)가 만나는 점 중 \(\mathrm{A}\)가 아닌 점을 \(\mathrm{B}\)라 하자. 두 점 \(\mathrm{A}, \mathrm{B}\)에서 직선 \(x=-2\)에 내린 수선의 발을 각각 \(\mathrm{C}, \mathrm{D}\)라 할 때, \(\overline{\mathrm{AC}}+\overline{\mathrm{BD}}-\overline{\mathrm{AB}}=k\)이다. \(k^2\)의 값을 구하시오.`,
      figure: "2022-06-geom-29.webp",
      short: true,
      answer: 80,
      help: R`\(y^2=8x\)와 \(y=2x-4\)를 연립하여 \(\mathrm{A}(8, 12)\)를 구한다. 점 \(\mathrm{A}\)를 대입하여 \(a=6\)을 얻고 두 번째 포물선의 방정식을 확정하여 점 \(\mathrm{B}\)의 좌표를 구한다. 준선 \(x=-2\) 및 평행이동된 준선과의 거리 관계를 포물선의 정의로 연결하여 \(k\)를 계산하고 \(k^2\)을 구한다.`
    },
    {
      id: "2022-06-geom-30", exam: "2022-06", no: 30, score: 4,
      units: ["geom-vector"], memo: "정사각형 변 위의 두 점의 수직/평행 조건과 고정점과의 내적 최대·최소",
      body: R`좌표평면 위의 네 점 \(\mathrm{A}(2, 0), \mathrm{B}(0, 2), \mathrm{C}(-2, 0), \mathrm{D}(0, -2)\)를 꼭짓점으로 하는 정사각형 \(\mathrm{ABCD}\)의 네 변 위의 두 점 \(\mathrm{P}, \mathrm{Q}\)가 다음 조건을 만족시킨다.`,
      note: [
        R`(가) \((\vec{\mathrm{PQ}}\cdot\vec{\mathrm{AB}})(\vec{\mathrm{PQ}}\cdot\vec{\mathrm{AD}})=0\)`,
        R`(나) \(\vec{\mathrm{OA}}\cdot\vec{\mathrm{OP}}\ge -2\)이고 \(\vec{\mathrm{OB}}\cdot\vec{\mathrm{OP}}\ge 0\)이다.`,
        R`(다) \(\vec{\mathrm{OA}}\cdot\vec{\mathrm{OQ}}\ge -2\)이고 \(\vec{\mathrm{OB}}\cdot\vec{\mathrm{OQ}}\le 0\)이다.`
      ],
            bodyAfter: R`점 \(\mathrm{R}(4, 4)\)에 대하여 \(\vec{\mathrm{RP}}\cdot\vec{\mathrm{RQ}}\)의 최댓값을 \(M\), 최솟값을 \(m\)이라 할 때, \(M+m\)의 값을 구하시오. (단, \(\mathrm{O}\)는 원점이다.)`,
short: true,
      answer: 48,
      help: R`조건 (나), (다)에 의해 점 \(\mathrm{P}\)는 정사각형의 위쪽 반, 점 \(\mathrm{Q}\)는 아래쪽 반 경계에 놓인다. 조건 (가)는 선분 \(\mathrm{PQ}\)가 변 \(\mathrm{AB}\) 또는 \(\mathrm{AD}\)에 수직(즉 변에 평행)함을 뜻한다. 점 \(\mathrm{R}(4, 4)\)로부터의 벡터 내적 \(\vec{\mathrm{RP}}\cdot\vec{\mathrm{RQ}}\)의 최대점과 최소점 배치를 기하학적으로 찾아 \(M+m\)을 계산한다.`
    }
  ];

  window.CSAT_MATH = { units, exams, problems };
})();
