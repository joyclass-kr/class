(function () {
  "use strict";

  // 초·중·고 및 자체 엄선 고품질 수학 개념 OX 정예 데이터 세트 (보강판)
  const mathOxData = [
    // --- [초등 3학년] ---
    {
      id: 1,
      subject: "초3",
      topic: "도형",
      prompt: "각의 두 변의 길이를 길게 그리면 각의 크기도 커진다.",
      answer: "X",
      pitfall: "변의 길이가 길어지면 각도 커질 것이라는 직관적 착각입니다.",
      reason: "각의 크기는 두 변이 벌어진 정도를 뜻하므로, 변의 길이를 길게 연장해도 각의 크기는 변하지 않습니다."
    },
    {
      id: 2,
      subject: "초3",
      topic: "분수",
      prompt: "분수 $1/3$과 $1/5$ 중에서 분모가 더 큰 $1/5$이 더 큰 수이다.",
      answer: "X",
      pitfall: "자연수 크기(5 > 3)에 낚여 분모가 크면 분수도 클 것이라 착각하기 쉽습니다.",
      reason: "같은 1을 더 많은 조각(5조각)으로 나눌수록 한 조각의 크기는 작아지므로 $1/3 > 1/5$ 이 맞습니다."
    },

    // --- [초등 4학년] ---
    {
      id: 3,
      subject: "초4",
      topic: "수와 연산",
      prompt: "소수 $0.7$과 $0.70$은 서로 다른 크기의 수이다.",
      answer: "X",
      pitfall: "자릿수가 더 길면 더 큰 수라는 착각을 하기 쉽습니다.",
      reason: "소수점 아래 끝자리에 붙은 0은 수의 크기에 영향을 주지 않으므로 $0.7$과 $0.70$은 완전히 같습니다."
    },
    {
      id: 4,
      subject: "초4",
      topic: "도형",
      prompt: "모든 정사각형은 직사각형이다.",
      answer: "O",
      pitfall: "도형의 포함관계를 오해하여 '정사각형은 정사각형일 뿐'이라고 낚이기 쉽습니다.",
      reason: "네 각이 모두 직각이면 직사각형의 정의를 만족하므로, 정사각형은 직사각형에 포함됩니다."
    },

    // --- [초등 5학년] ---
    {
      id: 5,
      subject: "초5",
      topic: "확률과 가능성",
      prompt: "[도박사의 오류] 동전을 5번 던져 계속 앞면이 나왔다면, 6번째에는 뒷면이 나올 가능성이 앞면보다 높다.",
      answer: "X",
      pitfall: "앞면이 많이 나왔으니 이제 뒷면이 나올 차례라고 착각하는 대표적 오개념입니다.",
      reason: "이전 동전 던지기 결과는 다음 던지기에 영향을 주지 않으므로, 6번째 던지기에서도 앞면과 뒷면이 나올 가능성은 여전히 똑같이 $1/2$ 입니다!"
    },
    {
      id: 6,
      subject: "초5",
      topic: "도형과 측정",
      prompt: "직사각형의 넓이가 같으면 둘레의 길이도 항상 같다.",
      answer: "X",
      pitfall: "둘레와 넓이를 동일시하는 대표적인 오개념입니다.",
      reason: "넓이가 $12\\text{cm}^2$인 직사각형도 가로·세로(예: $12 \\times 1 \\implies \\text{둘레 } 26$, $4 \\times 3 \\implies \\text{둘레 } 14$)에 따라 둘레의 길이가 완전히 다릅니다."
    },
    {
      id: 7,
      subject: "초5",
      topic: "분수·비율",
      prompt: "철수는 사과 전체의 $1/3$을 먹었고, 영희는 남은 사과의 $1/2$을 먹었다면 영희가 더 많이 먹었다.",
      answer: "X",
      pitfall: "분수 분모만 보고 $1/2 > 1/3$ 이라고 무작정 낚이기 쉽습니다.",
      reason: "철수가 먹고 남은 양은 전체의 $2/3$이고, 영희는 남은 양의 $1/2$인 $2/3 \\times 1/2 = 1/3$을 먹었으므로 두 사람이 먹은 사과의 양은 정확히 같습니다!"
    },

    // --- [초등 6학년] ---
    {
      id: 8,
      subject: "초6",
      topic: "수와 연산",
      prompt: "자연수를 1보다 작은 진분수로 나누면 그 몫은 처음 자연수보다 항상 작아진다.",
      answer: "X",
      pitfall: "'나눗셈을 하면 몫이 작아진다'는 고정관념입니다.",
      reason: "1보다 작은 수로 나누면 몫은 원래 수보다 오히려 커집니다 (예: $4 \\div (1/2) = 8$)."
    },
    {
      id: 9,
      subject: "초6",
      topic: "공간과 입체",
      prompt: "쌓기나무로 만든 입체도형을 위에서 본 모양만 알면 사용된 쌓기나무의 개수를 항상 정확히 알 수 있다.",
      answer: "X",
      pitfall: "평면 뷰(위에서 본 모양)만으로 입체 수량을 단정짓는 직관적 오류입니다.",
      reason: "위에서 본 모양은 1층의 바닥 배치만 보여줄 뿐, 각 칸에 쌓인 높이(2층, 3층 등)는 알 수 없습니다."
    },
    {
      id: 10,
      subject: "초6",
      topic: "도형과 측정",
      prompt: "원의 반지름을 2배로 늘리면 원의 넓이도 2배가 된다.",
      answer: "X",
      pitfall: "길이의 비와 넓이의 비를 혼동하는 대표적 낚시입니다.",
      reason: "원의 둘레는 2배가 되지만, 넓이는 반지름의 제곱에 비례하므로 **4배($2^2$)**가 됩니다."
    },

    // --- [중학교 1학년] ---
    {
      id: 11,
      subject: "중1",
      topic: "수와 연산",
      prompt: "두 음수는 절댓값이 큰 수가 더 큰 수이다.",
      answer: "X",
      pitfall: "절댓값의 크기와 수의 크기를 헷갈리기 쉽습니다.",
      reason: "수직선에서 음수는 원점에서 왼쪽으로 멀어질수록(절댓값이 클수록) 더 작은 수가 됩니다 (예: $-5 < -2$)."
    },
    {
      id: 12,
      subject: "중1",
      topic: "문자와 식",
      prompt: "방정식의 양변에 0을 곱하여 얻은 방정식은 원래 방정식과 항상 동치이다.",
      answer: "X",
      pitfall: "등식의 성질 중 '0이 아닌 수' 전제 조건을 간과하기 쉽습니다.",
      reason: "양변에 0을 곱하면 $0=0$ 항등식이 되어 원래 방정식 해의 정보를 잃어버리므로 동치가 아닙니다."
    },
    {
      id: 13,
      subject: "중1",
      topic: "도형",
      prompt: "서로 다른 세 점을 지나는 평면은 언제나 하나뿐이다.",
      answer: "X",
      pitfall: "평면의 결정 조건 중 '한 직선 위에 있지 않은' 조건을 누락한 낚시입니다.",
      reason: "세 점이 한 직선 위에 있으면 그 직선을 포함하는 평면은 무수히 많이 존재합니다."
    },

    // --- [중학교 2학년] ---
    {
      id: 14,
      subject: "중2",
      topic: "일차함수",
      prompt: "일차함수 $y = ax + b$ 에서 $a = 0$ 이면 이 함수는 일차함수이다.",
      answer: "X",
      pitfall: "일차함수의 정의 조건($a \\ne 0$)을 잊기 쉽습니다.",
      reason: "$a=0$ 이면 $y=b$ 상수함수가 되므로 $x$에 대한 일차함수가 아닙니다."
    },
    {
      id: 15,
      subject: "중2",
      topic: "사각형의 성질",
      prompt: "두 대각선이 서로를 수직이등분하는 사각형은 항상 정사각형이다.",
      answer: "X",
      pitfall: "마름모와 정사각형의 대각선 성질 차이 착각입니다.",
      reason: "두 대각선이 수직이등분하는 사각형은 **마름모**입니다. 대각선의 길이까지 같아야 정사각형입니다."
    },
    {
      id: 16,
      subject: "중2",
      topic: "피타고라스",
      prompt: "세 변의 길이가 $x, 5, 12$인 삼각형이 직각삼각형이 되는 실수 $x$의 값은 13 하나뿐이다.",
      answer: "X",
      pitfall: "피타고라스 수 $(5, 12, 13)$만 떠올리고 12가 빗변일 가능성을 누락하는 최고난도 낚시입니다.",
      reason: "$x$가 빗변일 때는 $x=13$이지만, **12가 빗변일 때는 $x^2+5^2=12^2 \\implies x=\\sqrt{119}$** 도 가능하므로 2개가 존재합니다!"
    },

    // --- [중학교 3학년] ---
    {
      id: 17,
      subject: "중3",
      topic: "실수와 제곱근",
      prompt: "모든 실수 $a$에 대하여 $\\sqrt{a^2} = a$ 이다.",
      answer: "X",
      pitfall: "근호 탈출 시 $a < 0$ 인 경우 부호 반전(-a)을 간과하는 1순위 낚시입니다.",
      reason: "$\\sqrt{a^2} = |a|$ 이므로, $a < 0$ 이면 **$-a$** 가 됩니다."
    },
    {
      id: 18,
      subject: "중3",
      topic: "인수분해",
      prompt: "모든 이차식 $ax^2 + bx + c$ 는 실수 범위에서 항상 두 일차식의 곱으로 인수분해할 수 있다.",
      answer: "X",
      pitfall: "실수 범위와 복소수 범위의 인수분해 한계를 헷갈리기 쉽습니다.",
      reason: "판별식 $D = b^2-4ac < 0$ 인 이차식(예: $x^2+1$)은 실수 범위에서 일차식의 곱으로 인수분해할 수 없습니다."
    },
    {
      id: 19,
      subject: "중3",
      topic: "통계",
      prompt: "어떤 자료의 분산이 0이면 그 자료의 모든 값은 서로 같다.",
      answer: "O",
      pitfall: "분산 0의 의미를 정확히 알고 있는지 묻는 명제입니다.",
      reason: "분산은 (편차)$^2$의 평균이므로 분산이 0이면 모든 편차가 0, 즉 모든 자료의 값이 평균값과 동일합니다."
    },

    // --- [공통수학1] ---
    {
      id: 20,
      subject: "공수1",
      topic: "다항식",
      prompt: "임의의 실수 $x, y, z$에 대하여 $x^2+y^2+z^2-xy-yz-zx \\ge 0$ 이다.",
      answer: "O",
      pitfall: "식의 형태가 복잡하여 음수가 나올 가능성이 있다고 착각하기 쉽습니다.",
      reason: "$\\frac{1}{2}\\{(x-y)^2 + (y-z)^2 + (z-x)^2\\} \\ge 0$ 변형 공식에 의해 항상 0 이상입니다."
    },
    {
      id: 21,
      subject: "공수1",
      topic: "절댓값 방정식",
      prompt: "방정식 $|x-1|=2x-1$의 해를 구할 때, 양변을 그냥 제곱하여 $(x-1)^2=(2x-1)^2$을 풀면 항상 올바른 해를 얻는다.",
      answer: "X",
      pitfall: "양변 제곱 시 우변 $2x-1 \\ge 0$ 범위를 벗어나는 무연근이 발생하는 점을 간과합니다.",
      reason: "우변 $2x-1 \\ge 0 \\implies x \\ge 1/2$ 필수입니다. 제곱하여 구한 $x=0$은 원래 식에 대입하면 $|-1| = -1$이 되어 무연근입니다."
    },

    // --- [공통수학2] ---
    {
      id: 22,
      subject: "공수2",
      topic: "함수의 그래프",
      prompt: "함수 $y=f(x)$의 그래프를 $x$축의 방향으로 $a$만큼 평행이동한 그래프의 식은 $y=f(x+a)$이다.",
      answer: "X",
      pitfall: "$x$축 양의 방향 $+a$ 이동 시 식에도 $+a$가 들어간다고 부호를 오해하기 쉽습니다.",
      reason: "$x$축 방향으로 $a$만큼 평행이동하면 $x$ 대신 **$x-a$를 대입한 $y=f(x-a)$**가 됩니다."
    },

    // --- [대수] ---
    {
      id: 23,
      subject: "대수",
      topic: "로그방정식",
      prompt: "모든 실수 $x$에 대하여 $\\log_2(x^2) = 2\\log_2 x$ 이다.",
      answer: "X",
      pitfall: "진수 조건에서 $x<0$ 가능성을 놓치고 지수를 무작정 앞으로 내리는 실수입니다.",
      reason: "$x < 0$이면 좌변 $\\log_2(x^2)$은 정의되지만 우변 $\\log_2 x$는 정의되지 않습니다. 올바른 식은 $2\\log_2 |x|$ 입니다."
    },
    {
      id: 24,
      subject: "대수",
      topic: "지수방정식 치환",
      prompt: "$x$에 대한 방정식 $a^{2x} - 2k a^x + k + 2 = 0 \\quad (a>1)$ 이 서로 다른 두 실근을 갖기 위한 필요충분조건은 판별식 $D > 0$ 이고 $k > -2$ 이다.",
      answer: "X",
      pitfall: "치환한 변수 $t = a^x > 0$ 의 양수 범위를 고려하지 않는 킬러급 낚시입니다.",
      reason: "$t = a^x > 0$ 이므로 $t^2-2kt+k+2=0$ 이 **'서로 다른 두 양의 실근'**을 가져야 합니다. 조건은 판별식 $D>0$, 두 근의 합 $2k>0$, 두 근의 곱 $k+2>0$ 의 공통범위인 **$k>2$** 입니다!"
    },

    // --- [미적분Ⅰ] ---
    {
      id: 25,
      subject: "미적1",
      topic: "도함수 연속성 반례",
      prompt: "실수 전체에서 미분가능한 함수 $f(x)$에 대하여 $\\lim_{x \\to a} f'(x) = L$ 이면, $f'(a) = L$ 이다.",
      answer: "X",
      pitfall: "미분가능하다고 해서 도함수 $f'(x)$가 '연속'이라는 보장이 있다는 착각입니다.",
      reason: "미분가능해도 도함수 $f'(x)$는 진동하여 극한값이 존재하지 않을 수 있습니다. (반례: $x^2 \\sin(1/x)$)"
    },
    {
      id: 26,
      subject: "미적1",
      topic: "극대와 극소",
      prompt: "함수 $f(x)$가 $x=a$에서 극댓값을 가지면 $f'(a) = 0$이다.",
      answer: "X",
      pitfall: "'미분가능한 함수'라는 전제 조건이 누락되었음을 놓치기 쉽습니다.",
      reason: "$f(x)=-|x|$는 $x=0$에서 극댓값을 가지지만, 미분불가능하므로 $f'(0)$ 값 자체가 존재하지 않습니다."
    },

    // --- [확률과 통계] ---
    {
      id: 27,
      subject: "확률과 통계",
      topic: "독립과 배반",
      prompt: "확률이 0이 아닌 두 사건 $A, B$가 서로 배반사건이면 $A$와 $B$는 서로 독립이다.",
      answer: "X",
      pitfall: "배반('겹치는 게 없다')과 독립('영향을 주지 않는다')을 일상 언어 의미로 착각하는 1순위 낚시입니다.",
      reason: "배반이면 $P(A \\cap B) = 0$ 이지만 $P(A)P(B) > 0$ 이므로 $P(A \\cap B) \\neq P(A)P(B)$ 입니다. 따라서 배반사건은 **무조건 종속사건**입니다."
    },
    {
      id: 28,
      subject: "확률과 통계",
      topic: "조건부확률 역설",
      prompt: "어느 집에 아이가 2명 있을 때, '첫째 아이가 딸'일 때 둘 다 딸일 확률과 '적어도 한 명이 딸'일 때 둘 다 딸일 확률은 같다.",
      answer: "X",
      pitfall: "둘 다 딸이 한 명 포함되었으니 남은 아이가 딸일 확률은 $1/2$로 같을 것이라는 착각입니다.",
      reason: "첫째가 딸일 때 둘 다 딸일 확률은 **$1/2$** 이지만, 적어도 한 명이 딸일 때((딸,딸), (딸,아들), (아들,딸)) 둘 다 딸일 확률은 **$1/3$** 이므로 서로 다릅니다!"
    },

    // --- [기하] ---
    {
      id: 29,
      subject: "기하",
      topic: "벡터 내적",
      prompt: "두 벡터 $\\vec{a}, \\vec{b}$에 대하여 $\\vec{a} \\cdot \\vec{b} = 0$이면 $\\vec{a}=\\vec{0}$ 또는 $\\vec{b}=\\vec{0}$이다.",
      answer: "X",
      pitfall: "실수의 곱이 0인 성질과 벡터 내적 0을 동일시하는 낚시입니다.",
      reason: "영벡터가 아니더라도 두 벡터가 **서로 수직($\\vec{a} \\perp \\vec{b}$)** 이면 내적은 0이 됩니다."
    },
    {
      id: 30,
      subject: "기하",
      topic: "SAT 전설의 낚시",
      prompt: "[SAT 출제 오류 문제] 반지름 1인 원이 반지름 3인 큰 원의 테두리를 따라 바깥쪽으로 한 바퀴 미끄럼 없이 돌아 제자리로 올 때 자전 횟수는 3회이다.",
      answer: "X",
      pitfall: "둘레가 3배이므로 $3 \\div 1 = 3$회 회전할 것이라는 직관적 낚시입니다.",
      reason: "작은 원 중심이 이동한 궤적 반지름이 $3+1=4$가 되므로, 큰 원 둘레(3회) + 원 자체 자전(1회)이 더해져 **정확히 4회** 회전합니다! (SAT 출제진도 낚였던 전설의 문제)"
    }
  ];

  let currentSubject = "전체";
  let answeredState = {};

  const filterNav = document.getElementById("filterNav");
  const questionsList = document.getElementById("questionsList");
  const answeredCountEl = document.getElementById("answeredCount");
  const totalCountEl = document.getElementById("totalCount");
  const progressFill = document.getElementById("progressFill");

  function init() {
    renderFilters();
    renderQuestions();
    updateProgress();
  }

  function renderFilters() {
    const subjects = ["전체", "초3", "초4", "초5", "초6", "중1", "중2", "중3", "공수1", "공수2", "대수", "미적1", "확률과 통계", "기하"];
    filterNav.innerHTML = subjects
      .map(
        (subj) =>
          `<button type="button" class="filter-btn ${subj === currentSubject ? "active" : ""}" data-subject="${subj}">${subj}</button>`
      )
      .join("");

    filterNav.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentSubject = btn.dataset.subject;
        renderFilters();
        renderQuestions();
      });
    });
  }

  function renderQuestions() {
    const filtered =
      currentSubject === "전체"
        ? mathOxData
        : mathOxData.filter((item) => item.subject === currentSubject);

    if (filtered.length === 0) {
      questionsList.innerHTML = `<div class="exp-box" style="text-align:center; padding: 40px;">등록된 문항이 없습니다.</div>`;
      return;
    }

    questionsList.innerHTML = filtered
      .map((q) => {
        const userState = answeredState[q.id];
        const isAnswered = Boolean(userState);
        const isCorrect = isAnswered && userState.isCorrect;
        const selectedChoice = isAnswered ? userState.selectedChoice : null;

        return `
          <div class="question-card ${isAnswered ? "answered " + (isCorrect ? "correct" : "wrong") : ""}" id="q-card-${q.id}">
            <div class="card-header">
              <div class="badge-group">
                <span class="q-number">문항 ${String(q.id).padStart(2, "0")}</span>
                <span class="q-subject">${q.subject}</span>
                <span class="q-topic">${q.topic}</span>
              </div>
            </div>
            
            <div class="q-prompt">${q.prompt}</div>

            <div class="ox-btn-group">
              <button type="button" 
                class="ox-btn btn-o ${selectedChoice === "O" ? (isCorrect ? "selected-correct" : "selected-wrong") : ""} ${isAnswered ? "disabled" : ""}" 
                data-id="${q.id}" data-choice="O" ${isAnswered ? "disabled" : ""}>
                O
              </button>
              <button type="button" 
                class="ox-btn btn-x ${selectedChoice === "X" ? (isCorrect ? "selected-correct" : "selected-wrong") : ""} ${isAnswered ? "disabled" : ""}" 
                data-id="${q.id}" data-choice="X" ${isAnswered ? "disabled" : ""}>
                X
              </button>
            </div>

            <div class="explanation-panel">
              <div class="feedback-badge ${isCorrect ? "is-correct" : "is-wrong"}">
                ${isCorrect ? "정답입니다! 🎉 (정답: " + q.answer + ")" : "아쉽습니다! 💡 (정답: " + q.answer + ")"}
              </div>
              <div class="explanation-section">
                <div class="exp-box pitfall">
                  <div class="exp-label">🎣 왜 낚일까요? (낚시 포인트)</div>
                  <div class="exp-content">${q.pitfall}</div>
                </div>
                <div class="exp-box reason">
                  <div class="exp-label">💡 명쾌한 이유 설명</div>
                  <div class="exp-content">${q.reason}</div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // O/X 이벤트 리스너 바인딩
    questionsList.querySelectorAll(".ox-btn:not(.disabled)").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const choice = btn.dataset.choice;
        handleAnswer(id, choice);
      });
    });

    // KaTeX 수식 렌더링
    if (window.renderMathInElement) {
      window.renderMathInElement(questionsList, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }
  }

  function handleAnswer(id, choice) {
    const item = mathOxData.find((q) => q.id === id);
    if (!item || answeredState[id]) return;

    const isCorrect = item.answer === choice;
    answeredState[id] = { selectedChoice: choice, isCorrect };

    renderQuestions();
    updateProgress();
  }

  function updateProgress() {
    const total = mathOxData.length;
    const answered = Object.keys(answeredState).length;
    const percentage = Math.round((answered / total) * 100);

    answeredCountEl.textContent = answered;
    totalCountEl.textContent = total;
    progressFill.style.width = `${percentage}%`;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
