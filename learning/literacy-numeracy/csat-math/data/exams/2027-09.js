(function () {
  "use strict";
  const R = String.raw;
  // 2027-09 회차의 문항. 수식은 data/problems.js에 손으로 옮긴 것을 그대로 옮겨 왔다.
  window.CSAT_MATH_PART = window.CSAT_MATH_PART || {};
  window.CSAT_MATH_PART["2027-09"] = [
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
    }
  ];
})();
