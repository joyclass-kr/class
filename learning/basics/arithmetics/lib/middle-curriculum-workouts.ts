export type MiddleCurriculumKind =
  | "coordinate-proportion"
  | "linear-function-basics"
  | "linear-function-equations"
  | "plane-geometry"
  | "solid-geometry"
  | "triangle-quadrilateral"
  | "similarity"
  | "pythagorean"
  | "counting-probability"
  | "quartiles-boxplot";

export type MiddleCurriculumDifficulty = "basic" | "application" | "advanced";

export type MiddleCurriculumProblem = {
  id: string;
  kind: string;
  difficulty: MiddleCurriculumDifficulty;
  structure: string;
  label: string;
  latex: string;
  answerLatex: string;
  solutionHint: string;
  distractors: string[];
};

export const MIDDLE_CURRICULUM_KINDS: MiddleCurriculumKind[] = [
  "coordinate-proportion",
  "linear-function-basics",
  "linear-function-equations",
  "plane-geometry",
  "solid-geometry",
  "triangle-quadrilateral",
  "similarity",
  "pythagorean",
  "counting-probability",
  "quartiles-boxplot",
];

export const MIDDLE_CURRICULUM_TITLES: Record<MiddleCurriculumKind, string> = {
  "coordinate-proportion": "좌표·정비례·반비례 계산",
  "linear-function-basics": "일차함수의 값·기울기·절편",
  "linear-function-equations": "일차함수의 식과 방정식",
  "plane-geometry": "기본각·다각형·부채꼴 계산",
  "solid-geometry": "입체도형의 겉넓이와 부피",
  "triangle-quadrilateral": "삼각형과 사각형의 계산",
  similarity: "닮음과 평행선의 길이 계산",
  pythagorean: "피타고라스 정리 계산",
  "counting-probability": "경우의 수와 확률 계산",
  "quartiles-boxplot": "사분위수와 상자그림 계산",
};

export const MIDDLE_CURRICULUM_GRADES: Record<MiddleCurriculumKind, string> = {
  "coordinate-proportion": "중1",
  "linear-function-basics": "중2",
  "linear-function-equations": "중2",
  "plane-geometry": "중1",
  "solid-geometry": "중1",
  "triangle-quadrilateral": "중2",
  similarity: "중2",
  pythagorean: "중2",
  "counting-probability": "중2",
  "quartiles-boxplot": "중3",
};

const METHOD_PLANS: Record<MiddleCurriculumKind, string[]> = {
  "coordinate-proportion": [
    "quadrant",
    "point-on-axis",
    "direct-coefficient",
    "direct-value",
    "inverse-coefficient",
    "inverse-value",
    "direct-table",
    "inverse-table",
  ],
  "linear-function-basics": [
    "function-value",
    "input-from-value",
    "slope-two-points",
    "y-intercept",
    "x-intercept",
    "equation-slope-intercept",
    "coefficient-from-point",
    "parallel-slope",
  ],
  "linear-function-equations": [
    "point-parameter",
    "equation-two-points",
    "parallel-through-point",
    "intersection",
    "system-graph-solution",
    "x-axis-intersection",
    "y-axis-intersection",
    "two-lines-parameter",
  ],
  "plane-geometry": [
    "vertical-angles",
    "parallel-angles",
    "triangle-angle",
    "polygon-interior-sum",
    "regular-polygon-angle",
    "regular-polygon-exterior",
    "polygon-diagonals",
    "sector-arc-area",
  ],
  "solid-geometry": [
    "rectangular-prism-volume",
    "rectangular-prism-surface",
    "prism-volume",
    "pyramid-volume",
    "cylinder-volume",
    "cylinder-surface",
    "cone-volume",
    "sphere-volume-surface",
  ],
  "triangle-quadrilateral": [
    "isosceles-angle",
    "triangle-exterior",
    "parallelogram-angle",
    "parallelogram-side",
    "trapezoid-midline",
    "circumcenter-distance",
    "incenter-bisector",
    "centroid-ratio",
  ],
  similarity: [
    "scale-factor",
    "missing-side",
    "perimeter-ratio",
    "area-ratio",
    "parallel-segment",
    "midpoint-segment",
    "two-triangles",
    "combined-similarity",
  ],
  pythagorean: [
    "hypotenuse",
    "missing-leg",
    "rectangle-diagonal",
    "square-diagonal",
    "coordinate-distance",
    "right-triangle-check",
    "isosceles-height",
    "composite-distance",
  ],
  "counting-probability": [
    "addition-rule",
    "multiplication-rule",
    "two-digit-numbers",
    "outfit-count",
    "die-probability",
    "two-dice-sum",
    "complement-probability",
    "two-step-probability",
  ],
  "quartiles-boxplot": [
    "median",
    "first-quartile",
    "third-quartile",
    "interquartile-range",
    "range",
    "five-number-summary",
    "missing-maximum",
    "compare-boxplots",
  ],
};

const METHOD_TITLES: Record<string, string> = {
  quadrant: "좌표와 사분면",
  "point-on-axis": "좌표축 위의 점",
  "direct-coefficient": "정비례 상수",
  "direct-value": "정비례의 값",
  "inverse-coefficient": "반비례 상수",
  "inverse-value": "반비례의 값",
  "direct-table": "정비례 표의 빈칸",
  "inverse-table": "반비례 표의 빈칸",
  "function-value": "일차함수의 함숫값",
  "input-from-value": "함숫값에서 x 구하기",
  "slope-two-points": "두 점을 지나는 기울기",
  "y-intercept": "y절편",
  "x-intercept": "x절편",
  "equation-slope-intercept": "기울기와 절편으로 식 구하기",
  "coefficient-from-point": "한 점으로 계수 구하기",
  "parallel-slope": "평행한 직선의 기울기",
  "point-parameter": "그래프 위의 점",
  "equation-two-points": "두 점으로 일차함수 구하기",
  "parallel-through-point": "한 점을 지나는 평행선",
  intersection: "두 일차함수의 교점",
  "system-graph-solution": "그래프와 연립방정식",
  "x-axis-intersection": "x축과의 교점",
  "y-axis-intersection": "y축과의 교점",
  "two-lines-parameter": "두 직선의 교점 조건",
  "vertical-angles": "맞꼭지각",
  "parallel-angles": "평행선의 동위각·엇각",
  "triangle-angle": "삼각형의 내각",
  "polygon-interior-sum": "다각형의 내각의 합",
  "regular-polygon-angle": "정다각형의 한 내각",
  "regular-polygon-exterior": "정다각형의 한 외각",
  "polygon-diagonals": "다각형의 대각선",
  "sector-arc-area": "부채꼴의 호와 넓이",
  "rectangular-prism-volume": "직육면체의 부피",
  "rectangular-prism-surface": "직육면체의 겉넓이",
  "prism-volume": "각기둥의 부피",
  "pyramid-volume": "각뿔의 부피",
  "cylinder-volume": "원기둥의 부피",
  "cylinder-surface": "원기둥의 겉넓이",
  "cone-volume": "원뿔의 부피",
  "sphere-volume-surface": "구의 부피와 겉넓이",
  "isosceles-angle": "이등변삼각형의 각",
  "triangle-exterior": "삼각형의 외각",
  "parallelogram-angle": "평행사변형의 각",
  "parallelogram-side": "평행사변형의 변",
  "trapezoid-midline": "사다리꼴의 중점연결선",
  "circumcenter-distance": "외심과 꼭짓점의 거리",
  "incenter-bisector": "내심과 각의 이등분",
  "centroid-ratio": "삼각형의 무게중심",
  "scale-factor": "닮음비",
  "missing-side": "닮은 도형의 대응변",
  "perimeter-ratio": "둘레의 길이의 비",
  "area-ratio": "넓이의 비",
  "parallel-segment": "평행선과 선분의 비",
  "midpoint-segment": "삼각형의 중점연결정리",
  "two-triangles": "두 삼각형의 닮음",
  "combined-similarity": "닮음의 종합 계산",
  hypotenuse: "빗변의 길이",
  "missing-leg": "직각변의 길이",
  "rectangle-diagonal": "직사각형의 대각선",
  "square-diagonal": "정사각형의 대각선",
  "coordinate-distance": "좌표평면의 두 점 사이 거리",
  "right-triangle-check": "직각삼각형 판별",
  "isosceles-height": "이등변삼각형의 높이",
  "composite-distance": "피타고라스 정리의 활용",
  "addition-rule": "합의 법칙",
  "multiplication-rule": "곱의 법칙",
  "two-digit-numbers": "두 자리 수의 경우의 수",
  "outfit-count": "두 단계 선택",
  "die-probability": "주사위의 확률",
  "two-dice-sum": "두 주사위의 확률",
  "complement-probability": "여사건의 확률",
  "two-step-probability": "두 단계 사건의 확률",
  median: "중앙값",
  "first-quartile": "제1사분위수",
  "third-quartile": "제3사분위수",
  "interquartile-range": "사분위범위",
  range: "범위",
  "five-number-summary": "다섯 수 요약",
  "missing-maximum": "상자그림에서 최댓값",
  "compare-boxplots": "두 상자그림의 산포도 비교",
};

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

const integer = (next: () => number, minimum: number, maximum: number) =>
  minimum + Math.floor(next() * (maximum - minimum + 1));

function nonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}

function gcd(left: number, right: number): number {
  return right === 0 ? Math.abs(left) : gcd(right, left % right);
}

function fraction(numerator: number, denominator: number) {
  const sign = denominator < 0 ? -1 : 1;
  const divisor = gcd(numerator, denominator);
  const top = sign * numerator / divisor;
  const bottom = sign * denominator / divisor;
  if (bottom === 1) return `${top}`;
  return top < 0
    ? `-\\dfrac{${Math.abs(top)}}{${bottom}}`
    : `\\dfrac{${top}}{${bottom}}`;
}

function coefficient(value: number, variable: string, first = false) {
  if (value === 0) return "";
  const sign = value < 0 ? "-" : first ? "" : "+";
  const magnitude = Math.abs(value);
  return `${sign}${magnitude === 1 && variable ? "" : magnitude}${variable}`;
}

function linear(a: number, b: number, variable = "x") {
  return `${coefficient(a, variable, true)}${coefficient(b, "", false)}`;
}

function equation(m: number, b: number) {
  return `y=${linear(m, b)}`;
}

function degree(value: number) {
  return `${value}^{\\circ}`;
}

function piTerm(coefficientValue: number) {
  if (coefficientValue === 0) return "0";
  if (coefficientValue === 1) return "\\pi";
  if (Number.isInteger(coefficientValue)) return `${coefficientValue}\\pi`;
  for (let denominator = 2; denominator <= 360; denominator += 1) {
    const numerator = Math.round(coefficientValue * denominator);
    if (Math.abs(numerator / denominator - coefficientValue) > 1e-10) continue;
    const divisor = gcd(numerator, denominator);
    const top = numerator / divisor;
    const bottom = denominator / divisor;
    return `\\dfrac{${top === 1 ? "" : top}\\pi}{${bottom}}`;
  }
  throw new Error(`π의 계수를 정확한 분수로 나타낼 수 없습니다: ${coefficientValue}`);
}

function uniqueDistractors(answer: string, candidates: string[], context: string) {
  const unique = [...new Set(candidates.filter((candidate) => candidate !== answer))];
  if (unique.length < 3) {
    throw new Error(`${context}: 실제 오답이 부족합니다: ${answer} / ${candidates.join(",")}`);
  }
  return unique.slice(0, 3);
}

function make(
  id: string,
  kind: string,
  latex: string,
  answerLatex: string,
  solutionHint: string,
  distractors: string[],
  structure = kind,
): MiddleCurriculumProblem {
  return {
    id,
    kind,
    difficulty: "basic",
    structure,
    label: METHOD_TITLES[kind],
    latex,
    answerLatex,
    solutionHint,
    distractors: uniqueDistractors(answerLatex, distractors, kind),
  };
}

function buildCoordinate(
  method: string,
  next: () => number,
  id: string,
  index: number,
) {
  if (method === "quadrant") {
    const quadrant = (index + integer(next, 0, 3)) % 4 + 1;
    const x = (quadrant === 2 || quadrant === 3 ? -1 : 1) * integer(next, 2, 8);
    const y = (quadrant >= 3 ? -1 : 1) * integer(next, 2, 8);
    const answer = `\\text{제${quadrant}사분면}`;
    return make(id, method, `P(${x},\\ ${y})`, answer,
      "x와 y의 부호를 차례로 확인해 점이 놓인 사분면을 정한다.",
      [1, 2, 3, 4].filter((value) => value !== quadrant).map((value) => `\\text{제${value}사분면}`));
  }
  if (method === "point-on-axis") {
    const xAxis = index % 2 === 1;
    const value = nonzero(next, -8, 8);
    const answer = xAxis ? "\\text{x축}" : "\\text{y축}";
    return make(id, method, xAxis ? `P(${value},\\ 0)` : `P(0,\\ ${value})`, answer,
      "x좌표가 0이면 y축, y좌표가 0이면 x축 위의 점이다.",
      [xAxis ? "\\text{y축}" : "\\text{x축}", "\\text{원점}", "\\text{좌표축 위가 아님}"]);
  }
  const a = nonzero(next, -6, 6);
  const x = nonzero(next, -6, 6);
  if (method === "direct-coefficient") {
    const y = a * x;
    return make(id, method, `y=ax,\\quad (x,y)=(${x},${y}),\\quad a=?`, `${a}`,
      `정비례식 y=ax에 좌표를 대입해 a=${y}\\div${x}로 구한다.`,
      [`${-a}`, `${a + 1}`, `${a * x}`, `${a - 1}`, `${x}`, `${y}`]);
  }
  if (method === "direct-value") {
    const y = a * x;
    return make(id, method, `y=${coefficient(a, "x", true)},\\quad x=${x},\\quad y=?`, `${y}`,
      `정비례식에 x=${x}를 대입해 ${a}\\times${x}를 계산한다.`,
      [`${a + x}`, `${-y}`, `${y + a}`, `${y - a}`, `${a}`, `${x}`]);
  }
  if (method === "inverse-coefficient") {
    const y = nonzero(next, -6, 6);
    const constant = x * y;
    return make(id, method, `y=\\dfrac{a}{x},\\quad (x,y)=(${x},${y}),\\quad a=?`, `${constant}`,
      `반비례식 xy=a를 이용해 ${x}\\times${y}를 계산한다.`,
      [`${x + y}`, `${-constant}`, `${x - y}`, `${y - x}`, `${x}`, `${y}`]);
  }
  if (method === "inverse-value") {
    const targetX = nonzero(next, 2, 7);
    const targetY = nonzero(next, -7, 7);
    const constant = targetX * targetY;
    return make(id, method, `y=\\dfrac{${constant}}{x},\\quad x=${targetX},\\quad y=?`, `${targetY}`,
      `y=${constant}\\div${targetX}로 반비례식의 값을 구한다.`,
      [`${-targetY}`, `${constant - targetX}`, `${targetX}`, `${constant}`, `${targetY + targetX}`, `${targetY - targetX}`]);
  }
  if (method === "direct-table") {
    const firstX = nonzero(next, 2, 5);
    const secondX = firstX + integer(next, 1, 4);
    return make(id, method,
      `\\begin{array}{c|cc}x&${firstX}&${secondX}\\\\\\hline y&${a * firstX}&\\square\\end{array}`,
      `${a * secondX}`,
      `첫째 열에서 정비례 상수 ${a}를 찾고 둘째 x에 곱한다.`,
      [`${a * firstX}`, `${a + secondX}`, `${a * (secondX - 1)}`, `${a - secondX}`, `${secondX}`, `${a}`]);
  }
  const firstX = nonzero(next, 2, 5);
  const secondX = firstX + integer(next, 1, 4);
  const constant = firstX * secondX * (index % 2 === 0 ? 1 : 2);
  const firstY = constant / firstX;
  const secondY = constant / secondX;
  return make(id, method,
    `\\begin{array}{c|cc}x&${firstX}&${secondX}\\\\\\hline y&${firstY}&\\square\\end{array}`,
    `${secondY}`,
    `첫째 열에서 xy=${constant}를 찾고 ${constant}\\div${secondX}를 계산한다.`,
    [`${firstY}`, `${secondX}`, `${firstY + secondY}`, `${constant}`, `${firstX}`, `${Math.abs(firstY - secondY)}`]);
}

function buildLinearFunction(
  method: string,
  next: () => number,
  id: string,
) {
  const m = nonzero(next, -5, 5);
  const b = nonzero(next, -8, 8);
  const x = nonzero(next, -6, 6);
  const y = m * x + b;
  if (method === "function-value") {
    return make(id, method, `f(x)=${linear(m, b)},\\quad f(${x})=?`, `${y}`,
      `함수식의 x에 ${x}를 대입해 계산한다.`,
      [
        `${m + x + b}`,
        `${m * x - b}`,
        `${y + m}`,
        `${m * x}`,
        `${b}`,
        `${x + b}`,
        `${-m * x + b}`,
        `${m * (x + b)}`,
        `${x * (m + b)}`,
        `${m + x - b}`,
      ]);
  }
  if (method === "input-from-value") {
    return make(id, method, `f(x)=${linear(m, b)},\\quad f(x)=${y},\\quad x=?`, `${x}`,
      `${linear(m, b)}=${y}인 일차방정식을 풀어 x를 구한다.`,
      [`${-x}`, `${x + 1}`, `${y - b}`, `${x - 1}`, `${y}`, `${b}`, `${x + m}`]);
  }
  if (method === "slope-two-points") {
    const x2 = x + integer(next, 2, 5);
    const y2 = m * x2 + b;
    return make(id, method, `A(${x},${y}),\\quad B(${x2},${y2})`, `${m}`,
      `기울기=\\dfrac{${y2}-${y}}{${x2}-${x}}로 계산한다.`,
      [
        `${-m}`,
        `${y2 - y}`,
        `${x2 - x}`,
        fraction(x2 - x, y2 - y),
        `${y2 + y}`,
        `${x2 + x}`,
        `${(y2 - y) + (x2 - x)}`,
        `${(y2 - y) - (x2 - x)}`,
      ]);
  }
  if (method === "y-intercept") {
    return make(id, method, equation(m, b), `${b}`,
      "y절편은 일차함수 y=mx+b의 상수항 b이다.",
      [`${m}`, `${-b}`, `${m + b}`, `${b - m}`, `${m - b}`, "0"]);
  }
  if (method === "x-intercept") {
    const root = nonzero(next, -7, 7);
    const constant = -m * root;
    return make(id, method, equation(m, constant), `${root}`,
      `y=0을 대입해 ${linear(m, constant)}=0을 푼다.`,
      [`${-root}`, `${constant}`, `${m}`, `${root + m}`, `${root - m}`, `${-constant}`]);
  }
  if (method === "equation-slope-intercept") {
    return make(id, method, `\\text{기울기 }${m},\\quad \\text{y절편 }${b}`, equation(m, b),
      "기울기 m과 y절편 b를 y=mx+b에 바로 대입한다.",
      [equation(-m, b), equation(m, -b), equation(b, m), equation(-m, -b), equation(b, -m), equation(-b, m)]);
  }
  if (method === "coefficient-from-point") {
    return make(id, method, `y=ax${b > 0 ? "+" : ""}${b},\\quad P(${x},${y}),\\quad a=?`, `${m}`,
      `점의 좌표를 식에 대입해 ${y}=a\\cdot${x}${b > 0 ? "+" : ""}${b}를 푼다.`,
      [`${-m}`, `${m + 1}`, `${y - b}`, `${m - 1}`, `${x}`, `${y}`, `${b}`]);
  }
  return make(id, method, `${equation(m, b)}\\text{와 평행한 직선의 기울기}`, `${m}`,
    "서로 평행한 두 일차함수의 그래프는 기울기가 같다.",
    [`${-m}`, `${b}`, `${m + 1}`, `${m - 1}`, `${m + b}`, `${m - b}`]);
}

function buildLinearRelation(
  method: string,
  next: () => number,
  id: string,
) {
  const m = nonzero(next, -4, 4);
  const x = nonzero(next, -5, 5);
  const b = nonzero(next, -7, 7);
  const y = m * x + b;
  if (method === "point-parameter") {
    return make(id, method, `${equation(m, b)},\\quad P(k,${y}),\\quad k=?`, `${x}`,
      `점 P의 좌표를 직선의 식에 대입해 ${y}=${linear(m, b, "k")}를 푼다.`,
      [`${-x}`, `${x + 1}`, `${y - b}`, `${x - 1}`, `${y}`, `${b}`, `${m}`]);
  }
  if (method === "equation-two-points") {
    const x2 = x + integer(next, 2, 5);
    const y2 = m * x2 + b;
    return make(id, method, `P(${x},${y}),\\quad Q(${x2},${y2})`, equation(m, b),
      "두 점으로 기울기를 구한 뒤 한 점을 y=mx+b에 대입한다.",
      [equation(-m, b), equation(m, -b), equation(b, m), equation(-m, -b), equation(b, -m), equation(-b, m)]);
  }
  if (method === "parallel-through-point") {
    let givenIntercept = nonzero(next, -6, 6);
    while (givenIntercept === b) givenIntercept = nonzero(next, -6, 6);
    return make(id, method,
      `${equation(m, givenIntercept)}\\text{와 평행하고 }P(${x},${y})\\text{를 지나는 직선}`,
      equation(m, b),
      "평행하므로 기울기는 같고, 점의 좌표를 대입해 y절편을 구한다.",
      [equation(-m, b), equation(m, -b), equation(m, b + 1)]);
  }
  if (method === "x-axis-intersection") {
    const root = nonzero(next, -6, 6);
    const constant = -m * root;
    return make(id, method, `${equation(m, constant)}\\text{와 x축의 교점}`, `(${root},0)`,
      "x축 위에서는 y=0이므로 일차방정식을 풀어 x좌표를 구한다.",
      [`(0,${root})`, `(${-root},0)`, `(${constant},0)`, `(0,${-root})`, `(${m},0)`, `(0,${constant})`]);
  }
  if (method === "y-axis-intersection") {
    return make(id, method, `${equation(m, b)}\\text{와 y축의 교점}`, `(0,${b})`,
      "y축 위에서는 x=0이므로 y좌표는 상수항이다.",
      [`(${b},0)`, `(0,${-b})`, `(${m},0)`, `(0,${m})`, `(${b},${m})`, `(${-b},0)`]);
  }
  const otherSlope = m + (m > 0 ? 2 : -2);
  const otherIntercept = y - otherSlope * x;
  if (method === "two-lines-parameter") {
    return make(id, method,
      `${equation(m, b)},\\quad y=${coefficient(otherSlope, "x", true)}+k\\text{의 교점이 }(${x},${y}),\\quad k=?`,
      `${otherIntercept}`,
      `교점의 좌표를 둘째 직선에 대입해 k=${y}-${otherSlope}\\cdot${x}로 구한다.`,
      [`${-otherIntercept}`, `${b}`, `${otherSlope}`, `${m}`, `${x}`, `${y}`, `${otherIntercept + otherSlope}`, `${otherIntercept - otherSlope}`]);
  }
  const answer = `(${x},${y})`;
  return make(id, method,
    `\\begin{cases}${equation(m, b)}\\\\${equation(otherSlope, otherIntercept)}\\end{cases}`,
    answer,
    "두 식을 같게 놓아 x를 구하고 어느 한 식에 대입해 y를 구한다.",
    [
      `(${y},${x})`,
      `(${-x},${y})`,
      `(${x},${-y})`,
      `(${-x},${-y})`,
      `(${-y},${x})`,
      `(${y},${-x})`,
    ],
    method === "intersection" ? "line-intersection" : "system-as-graphs");
}

function buildPlaneGeometry(method: string, next: () => number, id: string) {
  const angle = integer(next, 25, 75);
  if (method === "vertical-angles") {
    return make(id, method, `\\angle 1=${degree(angle)},\\quad \\angle 1\\text{과 }\\angle x\\text{는 맞꼭지각}`, degree(angle),
      "맞꼭지각의 크기는 서로 같다.",
      [degree(180 - angle), degree(90 - angle), degree(angle + 10), degree(180), degree(90), degree(Math.abs(angle - 10))]);
  }
  if (method === "parallel-angles") {
    return make(id, method, `l\\parallel m,\\quad \\angle 1=${degree(angle)},\\quad \\angle x\\text{는 }\\angle 1\\text{의 엇각}`, degree(angle),
      "평행선에서 엇각의 크기는 서로 같다.",
      [degree(180 - angle), degree(90 - angle), degree(angle + 15), degree(180), degree(90), degree(Math.abs(angle - 15))]);
  }
  if (method === "triangle-angle") {
    const second = integer(next, 35, 80);
    const answer = 180 - angle - second;
    return make(id, method, `\\triangle ABC:\\quad \\angle A=${degree(angle)},\\quad \\angle B=${degree(second)},\\quad \\angle C=?`, degree(answer),
      "삼각형의 세 내각의 합 180°에서 두 각을 뺀다.",
      [
        degree(180 - angle),
        degree(angle + second),
        degree(90 - second),
        degree(angle),
        degree(second),
        degree(Math.abs(angle - second)),
      ]);
  }
  const sides = integer(next, 5, 12);
  if (method === "polygon-interior-sum") {
    const answer = (sides - 2) * 180;
    return make(id, method, `${sides}\\text{각형의 내각의 크기의 합}`, degree(answer),
      `n각형의 내각의 합 (n-2)\\times180^{\\circ}에 n=${sides}를 대입한다.`,
      [degree(sides * 180), degree((sides - 1) * 180), degree(360)]);
  }
  if (method === "regular-polygon-angle") {
    const candidates = [5, 6, 8, 9, 10, 12];
    const n = candidates[integer(next, 0, candidates.length - 1)];
    const answer = ((n - 2) * 180) / n;
    return make(id, method, `\\text{정}${n}\\text{각형의 한 내각}`, degree(answer),
      `내각의 합을 꼭짓점 수 ${n}으로 나눈다.`,
      [degree(360 / n), degree(180 - 360 / n + 10), degree(180 / n)]);
  }
  if (method === "regular-polygon-exterior") {
    const candidates = [5, 6, 8, 9, 10, 12];
    const n = candidates[integer(next, 0, candidates.length - 1)];
    const answer = 360 / n;
    return make(id, method, `\\text{정}${n}\\text{각형의 한 외각}`, degree(answer),
      `정다각형의 외각의 합 360°를 ${n}으로 나눈다.`,
      [degree(180 / n), degree(180 - answer), degree(answer + 10)]);
  }
  if (method === "polygon-diagonals") {
    const answer = (sides * (sides - 3)) / 2;
    return make(id, method, `${sides}\\text{각형의 대각선의 개수}`, `${answer}`,
      `대각선의 개수 \\dfrac{n(n-3)}2에 n=${sides}를 대입한다.`,
      [`${sides * (sides - 3)}`, `${(sides * (sides - 2)) / 2}`, `${sides - 3}`]);
  }
  const radii = [3, 4, 6, 8, 10, 12];
  const radius = radii[integer(next, 0, radii.length - 1)];
  const centralAngles = [60, 90, 120, 180];
  const central = centralAngles[integer(next, 0, centralAngles.length - 1)];
  const arcCoefficient = (2 * radius * central) / 360;
  const areaCoefficient = (radius * radius * central) / 360;
  const answer = `(${piTerm(arcCoefficient)},\\ ${piTerm(areaCoefficient)})`;
  return make(id, method, `r=${radius},\\quad \\theta=${degree(central)},\\quad (\\text{호의 길이},\\ \\text{넓이})`, answer,
    "원의 둘레와 넓이에 중심각/360을 각각 곱한다.",
    [
      `(${piTerm(areaCoefficient)},\\ ${piTerm(arcCoefficient)})`,
      `(${piTerm(2 * arcCoefficient)},\\ ${piTerm(areaCoefficient)})`,
      `(${piTerm(arcCoefficient)},\\ ${piTerm(2 * areaCoefficient)})`,
    ]);
}

function buildSolidGeometry(method: string, next: () => number, id: string) {
  const a = integer(next, 3, 8);
  const b = integer(next, 3, 8);
  let h = integer(next, 4, 10);
  while (a * b * h === 2 * (a * b + b * h + h * a)) h += 1;
  if (method === "rectangular-prism-volume") {
    const answer = a * b * h;
    return make(id, method, `\\text{가로 }${a},\\ \\text{세로 }${b},\\ \\text{높이 }${h}`, `${answer}`,
      "직육면체의 부피는 가로×세로×높이이다.",
      [
        `${2 * (a * b + b * h + h * a)}`,
        `${a + b + h}`,
        `${a * b}`,
        `${b * h}`,
        `${h * a}`,
        `${answer / 2}`,
      ]);
  }
  if (method === "rectangular-prism-surface") {
    const answer = 2 * (a * b + b * h + h * a);
    return make(id, method, `\\text{가로 }${a},\\ \\text{세로 }${b},\\ \\text{높이 }${h}`, `${answer}`,
      "서로 다른 세 면의 넓이를 더한 뒤 2배 한다.",
      [
        `${a * b * h}`,
        `${a * b + b * h + h * a}`,
        `${2 * (a + b + h)}`,
        `${a * b}`,
        `${b * h}`,
        `${h * a}`,
      ]);
  }
  if (method === "prism-volume") {
    const base = a * b;
    const answer = base * h;
    return make(id, method, `\\text{밑넓이 }${base},\\quad \\text{높이 }${h}`, `${answer}`,
      "각기둥의 부피는 밑넓이×높이이다.",
      [`${base + h}`, `${base * h / 2}`, `${2 * base + h}`]);
  }
  if (method === "pyramid-volume") {
    const base = 3 * a;
    const height = 3 * integer(next, 2, 5);
    const answer = (base * height) / 3;
    return make(id, method, `\\text{밑넓이 }${base},\\quad \\text{높이 }${height}`, `${answer}`,
      "각뿔의 부피는 밑넓이×높이÷3이다.",
      [`${base * height}`, `${(base * height) / 2}`, `${base + height}`]);
  }
  const radius = integer(next, 2, 6);
  if (method === "cylinder-volume") {
    const answer = radius * radius * h;
    return make(id, method, `r=${radius},\\quad h=${h}`, piTerm(answer),
      "원기둥의 부피는 πr²h이다.",
      [
        piTerm(2 * radius * h),
        piTerm(radius * radius + h),
        piTerm(answer * 2),
        piTerm(radius * radius),
        piTerm(radius * h),
        piTerm(answer / 2),
      ]);
  }
  if (method === "cylinder-surface") {
    const answer = 2 * radius * radius + 2 * radius * h;
    return make(id, method, `r=${radius},\\quad h=${h}`, piTerm(answer),
      "두 밑면 2πr²과 옆면 2πrh를 더한다.",
      [
        piTerm(radius * radius + 2 * radius * h),
        piTerm(2 * radius * h),
        piTerm(radius * radius * h),
        piTerm(2 * radius * radius),
        piTerm(radius * radius),
        piTerm(2 * radius * (radius + h) * 2),
      ]);
  }
  if (method === "cone-volume") {
    const height = 3 * integer(next, 2, 6);
    const answer = (radius * radius * height) / 3;
    return make(id, method, `r=${radius},\\quad h=${height}`, piTerm(answer),
      "원뿔의 부피는 πr²h÷3이다.",
      [
        piTerm(radius * radius * height),
        piTerm(2 * radius * height),
        piTerm(answer * 2),
        piTerm(radius * radius),
        piTerm(radius * height),
        piTerm((radius * radius * height) / 2),
      ]);
  }
  const sphereRadius = integer(next, 0, 1) === 0 ? 6 : 9;
  const volumeCoefficient = (4 * sphereRadius ** 3) / 3;
  const surfaceCoefficient = 4 * sphereRadius ** 2;
  const answer = `(${piTerm(volumeCoefficient)},\\ ${piTerm(surfaceCoefficient)})`;
  return make(id, method, `r=${sphereRadius},\\quad (\\text{부피},\\ \\text{겉넓이})`, answer,
    "구의 부피는 4πr³/3, 겉넓이는 4πr²이다.",
    [
      `(${piTerm(surfaceCoefficient)},\\ ${piTerm(volumeCoefficient)})`,
      `(${piTerm((4 * sphereRadius ** 2) / 3)},\\ ${piTerm(4 * sphereRadius ** 3)})`,
      `(${piTerm(volumeCoefficient * 2)},\\ ${piTerm(surfaceCoefficient * 2)})`,
    ]);
}

function buildTriangleQuadrilateral(method: string, next: () => number, id: string) {
  const angle = integer(next, 30, 75);
  if (method === "isosceles-angle") {
    const apex = 180 - 2 * angle;
    return make(id, method, `AB=AC,\\quad \\angle A=${degree(apex)},\\quad \\angle B=?`, degree(angle),
      "이등변삼각형의 두 밑각은 같으므로 (180°-꼭지각)÷2를 계산한다.",
      [degree(apex), degree(180 - apex), degree(angle + 10), degree(angle - 10), degree(180 - angle)]);
  }
  if (method === "triangle-exterior") {
    const second = integer(next, 25, 70);
    const answer = angle + second;
    return make(id, method, `\\text{서로 이웃하지 않은 두 내각 }${degree(angle)},\\ ${degree(second)}`, degree(answer),
      "삼각형의 한 외각은 이웃하지 않은 두 내각의 합이다.",
      [
        degree(180 - answer),
        degree(Math.abs(angle - second)),
        degree(180 - angle),
        degree(angle),
        degree(second),
        degree(180 - second),
        degree(90),
        degree(180),
      ]);
  }
  if (method === "parallelogram-angle") {
    return make(id, method, `ABCD\\text{는 평행사변형},\\quad \\angle A=${degree(angle)},\\quad \\angle B=?`, degree(180 - angle),
      "평행사변형에서 이웃한 두 각의 합은 180°이다.",
      [degree(angle), degree(90 - angle), degree(180 + angle), degree(90), degree(180), degree(angle + 90)]);
  }
  if (method === "parallelogram-side") {
    const side = integer(next, 4, 14);
    return make(id, method, `ABCD\\text{는 평행사변형},\\quad AB=${side},\\quad CD=?`, `${side}`,
      "평행사변형의 마주 보는 두 변의 길이는 같다.",
      [`${side + 2}`, `${side * 2}`, `${side - 1}`]);
  }
  if (method === "trapezoid-midline") {
    const first = integer(next, 5, 12);
    const second = first + 2 * integer(next, 1, 5);
    const answer = (first + second) / 2;
    return make(id, method, `\\text{사다리꼴의 두 밑변 }${first},\\ ${second}`, `${answer}`,
      "두 빗변의 중점을 이은 선분의 길이는 두 밑변의 평균이다.",
      [`${first + second}`, `${second - first}`, `${answer + 1}`, `${first}`, `${second}`, `${answer - 1}`]);
  }
  if (method === "circumcenter-distance") {
    const radius = integer(next, 4, 12);
    return make(id, method, `O\\text{는 }\\triangle ABC\\text{의 외심},\\quad OA=${radius},\\quad OC=?`, `${radius}`,
      "외심에서 삼각형의 세 꼭짓점까지의 거리는 모두 같다.",
      [`${radius * 2}`, `${radius + 1}`, `${radius - 1}`]);
  }
  if (method === "incenter-bisector") {
    const whole = 2 * angle;
    return make(id, method, `I\\text{는 내심},\\quad \\angle A=${degree(whole)},\\quad \\angle BAI=?`, degree(angle),
      "내심을 지나는 선은 꼭짓각을 이등분한다.",
      [degree(whole), degree(180 - whole), degree(angle + 5), degree(angle - 5), degree(180 - angle)]);
  }
  const median = 3 * integer(next, 3, 8);
  const answer = (2 * median) / 3;
  return make(id, method, `G\\text{는 무게중심},\\quad AM=${median},\\quad AG=?`, `${answer}`,
    "무게중심은 중선을 꼭짓점 쪽에서 2:1로 나눈다.",
    [`${median / 3}`, `${median}`, `${median / 2}`]);
}

function buildSimilarity(method: string, next: () => number, id: string) {
  const ratio = integer(next, 2, 5);
  const small = integer(next, 3, 9);
  if (method === "scale-factor") {
    return make(id, method, `\\text{대응변 }${small}: ${small * ratio}`, `1:${ratio}`,
      "닮음비는 대응하는 두 변의 길이를 같은 순서로 나눈 비이다.",
      [`${ratio}:1`, `1:${ratio ** 2}`, `${small}:${ratio}`]);
  }
  if (method === "missing-side") {
    const other = integer(next, 3, 8);
    return make(id, method, `${small}:${small * ratio}=${other}:x`, `${other * ratio}`,
      "대응변의 비가 같으므로 비례식을 세워 x를 구한다.",
      [`${other + ratio}`, `${other * ratio ** 2}`, `${other}`]);
  }
  if (method === "perimeter-ratio") {
    return make(id, method, `\\text{닮음비 }1:${ratio}`, `1:${ratio}`,
      "닮은 도형의 둘레의 길이의 비는 닮음비와 같다.",
      [`1:${ratio ** 2}`, `${ratio}:1`, `1:${ratio ** 3}`]);
  }
  if (method === "area-ratio") {
    return make(id, method, `\\text{닮음비 }1:${ratio}`, `1:${ratio ** 2}`,
      "닮은 도형의 넓이의 비는 닮음비의 제곱이다.",
      [`1:${ratio}`, `${ratio}:1`, `1:${ratio ** 3}`]);
  }
  if (method === "parallel-segment") {
    const upper = integer(next, 2, 7);
    const lower = integer(next, 2, 7);
    const corresponding = upper * ratio;
    const answer = lower * ratio;
    return make(id, method, `DE\\parallel BC,\\quad AD:DB=${upper}:${lower},\\quad AE=${corresponding},\\quad EC=?`, `${answer}`,
      "평행선이 두 변을 같은 비로 나누므로 AD:DB=AE:EC를 이용한다.",
      [
        `${lower + ratio}`,
        `${corresponding}`,
        `${upper * lower}`,
        `${lower}`,
        `${upper}`,
        `${ratio}`,
        `${corresponding + lower}`,
        `${corresponding * ratio}`,
        `${Math.abs(corresponding - lower * ratio)}`,
      ]);
  }
  if (method === "midpoint-segment") {
    const base = 2 * integer(next, 4, 10);
    return make(id, method, `D,E\\text{는 두 변의 중점},\\quad BC=${base},\\quad DE=?`, `${base / 2}`,
      "삼각형의 두 변의 중점을 이은 선분은 나머지 한 변의 절반이다.",
      [`${base}`, `${base * 2}`, `${base / 2 + 1}`]);
  }
  if (method === "two-triangles") {
    const answer = small * ratio;
    return make(id, method, `\\triangle ABC\\sim\\triangle DEF,\\quad AB:DE=1:${ratio},\\quad BC=${small},\\quad EF=?`, `${answer}`,
      "닮음 순서에 맞는 대응변의 비로 BC:EF=1:비례상수를 세운다.",
      [`${small + ratio}`, `${small * ratio ** 2}`, `${small}`]);
  }
  const area = integer(next, 3, 10);
  const answer = area * ratio ** 2;
  return make(id, method, `\\text{닮음비 }1:${ratio},\\quad \\text{작은 도형의 넓이 }${area}`, `${answer}`,
    "넓이는 닮음비의 제곱만큼 커지므로 주어진 넓이에 비례상수의 제곱을 곱한다.",
    [`${area * ratio}`, `${area + ratio ** 2}`, `${area * ratio ** 3}`, `${area}`, `${answer + area}`, `${answer - area}`]);
}

const RIGHT_TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
] as const;

function buildPythagorean(method: string, next: () => number, id: string, index: number) {
  const triple = RIGHT_TRIPLES[(index + integer(next, 0, RIGHT_TRIPLES.length - 1)) % RIGHT_TRIPLES.length];
  const scale = integer(next, 1, 3);
  const [a, b, c] = triple.map((value) => value * scale);
  if (method === "hypotenuse") {
    return make(id, method, `a=${a},\\quad b=${b},\\quad c=?`, `${c}`,
      "직각삼각형에서 c²=a²+b²을 이용해 양의 제곱근을 구한다.",
      [`${a + b}`, `${c ** 2}`, `${Math.abs(b - a)}`]);
  }
  if (method === "missing-leg") {
    return make(id, method, `c=${c},\\quad a=${a},\\quad b=?`, `${b}`,
      "b²=c²-a²을 계산한 뒤 양의 제곱근을 취한다.",
      [`${c - a}`, `${b ** 2}`, `${a}`]);
  }
  if (method === "rectangle-diagonal") {
    return make(id, method, `\\text{가로 }${a},\\quad \\text{세로 }${b},\\quad \\text{대각선}=?`, `${c}`,
      "직사각형의 대각선은 두 변을 직각변으로 하는 직각삼각형의 빗변이다.",
      [`${a + b}`, `${c ** 2}`, `${b - a}`]);
  }
  if (method === "square-diagonal") {
    const side = integer(next, 2, 9);
    return make(id, method, `\\text{정사각형의 한 변 }${side}`, `${side}\\sqrt{2}`,
      "대각선²=한 변²+한 변²이므로 대각선은 한 변×√2이다.",
      [`${side * 2}`, `${side}\\sqrt{3}`, `${side ** 2}`, "\\sqrt{2}", `${side ** 2}\\sqrt{2}`]);
  }
  if (method === "coordinate-distance") {
    const x1 = integer(next, -5, 1);
    const y1 = integer(next, -5, 1);
    return make(id, method, `A(${x1},${y1}),\\quad B(${x1 + a},${y1 + b})`, `${c}`,
      "x좌표 차와 y좌표 차를 직각변으로 하여 피타고라스 정리를 적용한다.",
      [`${a + b}`, `${c ** 2}`, `${Math.abs(b - a)}`]);
  }
  if (method === "right-triangle-check") {
    return make(id, method, `\\text{세 변의 길이 }${a},\\ ${b},\\ ${c}`, "\\text{직각삼각형}",
      `${a}^2+${b}^2=${c}^2이므로 피타고라스 정리의 역이 성립한다.`,
      ["\\text{예각삼각형}", "\\text{둔각삼각형}", "\\text{삼각형이 아님}"]);
  }
  if (method === "isosceles-height") {
    const halfBase = a;
    return make(id, method, `\\text{이등변삼각형의 밑변 }${2 * halfBase},\\quad \\text{같은 두 변 }${c}`, `${b}`,
      "꼭짓점에서 내린 높이는 밑변을 이등분하므로 절반과 높이로 피타고라스 정리를 쓴다.",
      [`${a}`, `${c}`, `${a + b}`]);
  }
  return make(id, method, `\\text{직각으로 }${a}\\text{만큼, 다시 }${b}\\text{만큼 이동한 두 점 사이 거리}`, `${c}`,
    "서로 수직인 두 이동 거리를 직각변으로 보아 빗변을 구한다.",
    [`${a + b}`, `${c ** 2}`, `${b - a}`]);
}

function buildProbability(method: string, next: () => number, id: string) {
  if (method === "addition-rule") {
    const a = integer(next, 3, 8);
    const b = integer(next, 3, 8);
    return make(id, method, `\\text{서로 겹치지 않는 A 방법 }${a}\\text{가지, B 방법 }${b}\\text{가지}`, `${a + b}`,
      "둘 중 하나를 택하고 두 경우가 겹치지 않으므로 경우의 수를 더한다.",
      [`${a * b}`, `${Math.abs(a - b)}`, `${a + b + 1}`]);
  }
  if (method === "multiplication-rule") {
    const a = integer(next, 2, 6);
    const b = integer(next, 3, 7);
    return make(id, method, `\\text{첫 선택 }${a}\\text{가지, 다음 선택 }${b}\\text{가지}`, `${a * b}`,
      "두 선택을 차례로 모두 하므로 각 단계의 경우의 수를 곱한다.",
      [`${a + b}`, `${a * b - 1}`, `${a * b + a}`, `${a * b + b}`, `${Math.abs(a - b)}`, `${a ** 2 + b}`]);
  }
  if (method === "two-digit-numbers") {
    const digits = integer(next, 4, 6);
    const answer = digits * (digits - 1);
    return make(id, method, `\\{1,2,\\ldots,${digits}\\}\\text{에서 서로 다른 두 숫자로 만든 두 자리 수}`, `${answer}`,
      `십의 자리 ${digits}가지에 일의 자리 ${digits - 1}가지를 곱한다.`,
      [`${digits ** 2}`, `${digits + (digits - 1)}`, `${answer / 2}`]);
  }
  if (method === "outfit-count") {
    const tops = integer(next, 3, 6);
    const bottoms = integer(next, 2, 5);
    return make(id, method, `\\text{윗옷 }${tops}\\text{벌, 아래옷 }${bottoms}\\text{벌}`, `${tops * bottoms}`,
      "윗옷 하나마다 모든 아래옷을 고를 수 있으므로 곱의 법칙을 쓴다.",
      [
        `${tops + bottoms}`,
        `${tops * bottoms - 1}`,
        `${tops * bottoms + tops}`,
        `${tops * bottoms + bottoms}`,
        `${Math.abs(tops - bottoms)}`,
        `${tops ** 2 + bottoms}`,
      ]);
  }
  if (method === "die-probability") {
    const threshold = integer(next, 2, 5);
    const favorable = 6 - threshold + 1;
    const answer = fraction(favorable, 6);
    return make(id, method, `\\text{주사위 한 개에서 }${threshold}\\text{ 이상이 나올 확률}`, answer,
      `유리한 눈 ${favorable}개를 전체 눈 6개로 나눈다.`,
      [
        fraction(threshold, 6),
        fraction(6 - favorable, 6),
        fraction(favorable, 5),
        fraction(favorable - 1, 6),
        fraction(favorable + 1, 6),
        fraction(1, 6),
      ]);
  }
  if (method === "two-dice-sum") {
    const target = integer(next, 5, 9);
    const favorable = target <= 7 ? target - 1 : 13 - target;
    const answer = fraction(favorable, 36);
    return make(id, method, `\\text{두 주사위의 눈의 합이 }${target}\\text{일 확률}`, answer,
      `순서 있는 전체 36가지 중 합이 ${target}인 경우 ${favorable}가지를 센다.`,
      [
        fraction(favorable, 12),
        fraction(target, 36),
        fraction(favorable + 1, 36),
        fraction(favorable - 1, 36),
        fraction(target, 6),
        fraction(1, 36),
      ]);
  }
  if (method === "complement-probability") {
    const numerator = integer(next, 1, 8);
    const denominator = 10;
    const answer = fraction(denominator - numerator, denominator);
    return make(id, method, `P(A)=${fraction(numerator, denominator)},\\quad P(A^c)=?`, answer,
      "어떤 사건과 그 여사건의 확률의 합은 1이다.",
      [
        fraction(numerator, denominator),
        fraction(denominator - numerator - 1, denominator),
        fraction(denominator + numerator, denominator),
        fraction(denominator - numerator + 1, denominator),
        fraction(numerator + 1, denominator),
        fraction(numerator - 1, denominator),
      ]);
  }
  const red = integer(next, 2, 5);
  const blue = integer(next, 2, 5);
  const total = red + blue;
  const answer = fraction(red * blue, total * (total - 1));
  return make(id, method, `\\text{빨강 }${red}\\text{개, 파랑 }${blue}\\text{개에서 되돌려 넣지 않고 빨강, 파랑 순으로 뽑을 확률}`, answer,
    "첫 확률과 한 개가 줄어든 둘째 확률을 곱한다.",
    [
      fraction(red * blue, total ** 2),
      fraction(red + blue, total * (total - 1)),
      fraction(red ** 2, total * (total - 1)),
      fraction(blue ** 2, total * (total - 1)),
      fraction(red, total),
      fraction(blue, total),
      fraction(red * blue, total * (total + 1)),
    ]);
}

const QUARTILE_DATA = [
  [1, 3, 5, 7, 9, 11, 13, 15],
  [2, 4, 6, 8, 12, 14, 16, 18],
  [3, 5, 7, 9, 11, 13, 17, 19],
] as const;

function quartiles(values: readonly number[]) {
  return {
    minimum: values[0],
    q1: (values[1] + values[2]) / 2,
    median: (values[3] + values[4]) / 2,
    q3: (values[5] + values[6]) / 2,
    maximum: values[7],
  };
}

function dataLatex(values: readonly number[]) {
  return `\\{${values.join(",\\ ")}\\}`;
}

function buildQuartiles(method: string, next: () => number, id: string, index: number) {
  const shift = integer(next, 0, 5) + index * 2;
  const values = QUARTILE_DATA[index % QUARTILE_DATA.length].map((value) => value + shift);
  const stats = quartiles(values);
  if (method === "median") {
    return make(id, method, dataLatex(values), `${stats.median}`,
      "자료를 크기순으로 놓고 가운데 두 값의 평균을 구한다.",
      [`${values[3]}`, `${values[4]}`, `${stats.q1}`]);
  }
  if (method === "first-quartile") {
    return make(id, method, dataLatex(values), `${stats.q1}`,
      "아래쪽 절반 자료의 중앙값을 구한다.",
      [`${stats.median}`, `${values[1]}`, `${values[2]}`]);
  }
  if (method === "third-quartile") {
    return make(id, method, dataLatex(values), `${stats.q3}`,
      "위쪽 절반 자료의 중앙값을 구한다.",
      [`${stats.median}`, `${values[5]}`, `${values[6]}`]);
  }
  if (method === "interquartile-range") {
    const answer = stats.q3 - stats.q1;
    return make(id, method, dataLatex(values), `${answer}`,
      "사분위범위는 제3사분위수에서 제1사분위수를 뺀 값이다.",
      [`${stats.q3 + stats.q1}`, `${stats.maximum - stats.minimum}`, `${answer + 1}`]);
  }
  if (method === "range") {
    const answer = stats.maximum - stats.minimum;
    return make(id, method, dataLatex(values), `${answer}`,
      "범위는 최댓값에서 최솟값을 뺀 값이다.",
      [`${stats.maximum + stats.minimum}`, `${stats.q3 - stats.q1}`, `${answer - 1}`]);
  }
  if (method === "five-number-summary") {
    const answer = `(${stats.minimum},${stats.q1},${stats.median},${stats.q3},${stats.maximum})`;
    return make(id, method, dataLatex(values), answer,
      "최솟값, 제1사분위수, 중앙값, 제3사분위수, 최댓값 순으로 적는다.",
      [
        `(${stats.minimum},${stats.median},${stats.q1},${stats.q3},${stats.maximum})`,
        `(${stats.minimum},${stats.q1},${stats.q3},${stats.median},${stats.maximum})`,
        `(${stats.maximum},${stats.q3},${stats.median},${stats.q1},${stats.minimum})`,
      ]);
  }
  if (method === "missing-maximum") {
    const range = stats.maximum - stats.minimum;
    return make(id, method, `\\text{최솟값 }${stats.minimum},\\quad \\text{범위 }${range},\\quad \\text{최댓값}=?`, `${stats.maximum}`,
      "최댓값=최솟값+범위로 계산한다.",
      [
        `${range}`,
        `${stats.maximum - 1}`,
        `${stats.minimum + stats.q3}`,
        `${stats.minimum}`,
        `${stats.q3}`,
        `${range + stats.q1}`,
      ]);
  }
  const firstIqr = stats.q3 - stats.q1;
  const secondIqr = firstIqr + integer(next, 2, 5);
  return make(id, method, `A:\\ IQR=${firstIqr},\\quad B:\\ IQR=${secondIqr}`, "A",
    "사분위범위가 작을수록 자료의 가운데 50%가 덜 퍼져 있다.",
    ["B", "A=B", "\\text{판단 불가}"]);
}

function build(
  group: MiddleCurriculumKind,
  method: string,
  next: () => number,
  id: string,
  index: number,
) {
  if (group === "coordinate-proportion") return buildCoordinate(method, next, id, index);
  if (group === "linear-function-basics") return buildLinearFunction(method, next, id);
  if (group === "linear-function-equations") return buildLinearRelation(method, next, id);
  if (group === "plane-geometry") return buildPlaneGeometry(method, next, id);
  if (group === "solid-geometry") return buildSolidGeometry(method, next, id);
  if (group === "triangle-quadrilateral") return buildTriangleQuadrilateral(method, next, id);
  if (group === "similarity") return buildSimilarity(method, next, id);
  if (group === "pythagorean") return buildPythagorean(method, next, id, index);
  if (group === "counting-probability") return buildProbability(method, next, id);
  return buildQuartiles(method, next, id, index);
}

function difficultyForIndex(index: number): MiddleCurriculumDifficulty {
  if (index < 2) return "basic";
  if (index < 5) return "application";
  return "advanced";
}

export function isMiddleCurriculumKind(value: string | null): value is MiddleCurriculumKind {
  return MIDDLE_CURRICULUM_KINDS.includes(value as MiddleCurriculumKind);
}

export function createMiddleCurriculumProblemSet(kind: MiddleCurriculumKind, seed: number) {
  const next = random(seed);
  const signatures = new Set<string>();
  return {
    seed,
    kind,
    problems: METHOD_PLANS[kind].map((method, index) => {
      let problem = build(kind, method, next, `middle-curriculum-${kind}-${index}`, index);
      let signature = `${problem.latex}|${problem.answerLatex}`;
      for (let attempt = 0; signatures.has(signature) && attempt < 20; attempt += 1) {
        problem = build(kind, method, next, `middle-curriculum-${kind}-${index}`, index);
        signature = `${problem.latex}|${problem.answerLatex}`;
      }
      if (signatures.has(signature)) {
        throw new Error(`${kind}: 한 학습지 안에 같은 문제와 정답이 반복됩니다.`);
      }
      signatures.add(signature);
      return {
        ...problem,
        difficulty: difficultyForIndex(index),
      };
    }),
  };
}

export function createMiddleCurriculumReviewProblems(
  group: MiddleCurriculumKind,
  methods: string[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(methods)].slice(0, 2).map((method, index) => ({
    ...build(group, method, next, `middle-curriculum-review-${group}-${index}-${seed}`, 6 + index),
    difficulty: "advanced" as const,
  }));
}
