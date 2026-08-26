import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type QuadraticFoundationKind =
  | "discriminant"
  | "double-root-parameter"
  | "root-sum-product"
  | "symmetric-roots"
  | "reciprocal-roots"
  | "shifted-root-equation"
  | "reciprocal-root-equation"
  | "root-distance"
  | "vertex"
  | "maximum-minimum"
  | "interval-extrema"
  | "line-intersections"
  | "tangent-parameter"
  | "intersection-points"
  | "determine-from-vertex"
  | "root-vertex-connection"
  | "difference-of-squares-system"
  | "sum-product-system"
  | "sum-squares-system"
  | "difference-product-system"
  | "line-parabola-system"
  | "two-sums-system"
  | "subtraction-system";

export type QuadraticFoundationProblem = GeometryChoiceItem & {
  kind: QuadraticFoundationKind;
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

function distinctNonzeroPair(next: () => number) {
  let first = nonzero(next, -5, 5);
  let second = nonzero(next, -5, 5);
  while (second === first || second === -first) second = nonzero(next, -5, 5);
  return [Math.min(first, second), Math.max(first, second)] as const;
}

function signedTerm(coefficient: number, variable = "") {
  if (coefficient === 0) return "";
  const magnitude = Math.abs(coefficient);
  const number = variable && magnitude === 1 ? "" : `${magnitude}`;
  return `${coefficient < 0 ? "-" : "+"}${number}${variable}`;
}

function quadraticLatex(a: number, b: number, c: number) {
  const leading = a === 1 ? "x^2" : a === -1 ? "-x^2" : `${a}x^2`;
  return `${leading}${signedTerm(b, "x")}${signedTerm(c)}`;
}

function linearLatex(coefficient: number, constant: number) {
  if (coefficient === 0) return `${constant}`;
  const variable = coefficient === 1 ? "x" : coefficient === -1 ? "-x" : `${coefficient}x`;
  return `${variable}${signedTerm(constant)}`;
}

function vertexFormLatex(coefficient: number, h: number, k: number) {
  const number = coefficient === 1 ? "" : coefficient === -1 ? "-" : `${coefficient}`;
  const base = h === 0 ? "x" : `(x${signedTerm(-h)})`;
  return `${number}${base}^2${signedTerm(k)}`;
}

function factoredQuadraticLatex(coefficient: number, firstRoot: number, secondRoot: number) {
  const number = coefficient === 1 ? "" : coefficient === -1 ? "-" : `${coefficient}`;
  const first = firstRoot === 0 ? "x" : `(x${signedTerm(-firstRoot)})`;
  const second = secondRoot === 0 ? "x" : `(x${signedTerm(-secondRoot)})`;
  return `${number}${first}${second}`;
}

function pairLatex(x: number, y: number) {
  return `(${x},${y})`;
}

function pairSetLatex(pairs: Array<[number, number]>) {
  return pairs.map(([x, y]) => pairLatex(x, y)).join(",\\ ");
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "-1", "2", "-2", "\\text{해 없음}"]) {
    if (unique.length === 3) break;
    if (fallback !== answer && !unique.includes(fallback)) unique.push(fallback);
  }
  return [answer, ...unique.slice(0, 3)].map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  group: string,
  seed: number,
  index: number,
  kind: QuadraticFoundationKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): QuadraticFoundationProblem {
  const id = `${group}-${seed}-${index}`;
  return {
    id,
    kind,
    label,
    prompt,
    latex,
    correctLatex: answer,
    choices: choices(id, answer, distractors),
  };
}

export function createQuadraticRootRelationProblems(seed: number) {
  const next = random(seed);
  const problems: QuadraticFoundationProblem[] = [];

  {
    const variant = integer(next, 0, 2);
    const center = integer(next, -4, 4);
    const gap = integer(next, 1, 4);
    const b = -2 * center;
    const c = variant === 0 ? center ** 2 - gap ** 2 : variant === 1 ? center ** 2 : center ** 2 + gap ** 2;
    const answer = variant === 0
      ? "\\text{서로 다른 두 실근}"
      : variant === 1
        ? "\\text{중근}"
        : "\\text{서로 다른 두 허근}";
    problems.push(item(
      "quadratic-roots",
      seed,
      0,
      "discriminant",
      "판별식으로 근의 종류 판단",
      "근의 종류는?",
      `${quadraticLatex(1, b, c)}=0`,
      answer,
      ["\\text{서로 다른 두 실근}", "\\text{중근}", "\\text{서로 다른 두 허근}", "\\text{판단할 수 없음}"],
    ));
  }

  {
    const magnitude = integer(next, 2, 6);
    problems.push(item(
      "quadratic-roots",
      seed,
      1,
      "double-root-parameter",
      "중근 조건과 매개변수",
      "중근을 갖도록 하는 k는?",
      `x^2+2kx+${magnitude ** 2}=0`,
      `k=\\pm ${magnitude}`,
      [`k=${magnitude}`, `k=-${magnitude}`, `k=\\pm ${magnitude ** 2}`],
    ));
  }

  const [alpha, beta] = distinctNonzeroPair(next);
  const sum = alpha + beta;
  const product = alpha * beta;
  const equation = `${quadraticLatex(1, -sum, product)}=0`;

  problems.push(item(
    "quadratic-roots",
    seed,
    2,
    "root-sum-product",
    "근과 계수의 관계",
    "\\alpha+\\beta와 \\alpha\\beta는?",
    `${equation}\\text{의 두 근을 }\\alpha,\\beta\\text{라 하자.}`,
    `\\alpha+\\beta=${sum},\\quad\\alpha\\beta=${product}`,
    [
      `\\alpha+\\beta=${-sum},\\quad\\alpha\\beta=${product}`,
      `\\alpha+\\beta=${sum},\\quad\\alpha\\beta=${-product}`,
      `\\alpha+\\beta=${product},\\quad\\alpha\\beta=${sum}`,
    ],
  ));

  const squareSum = sum ** 2 - 2 * product;
  problems.push(item(
    "quadratic-roots",
    seed,
    3,
    "symmetric-roots",
    "두 근의 대칭식",
    "\\alpha^2+\\beta^2의 값은?",
    `${equation}\\text{의 두 근을 }\\alpha,\\beta\\text{라 하자.}`,
    `${squareSum}`,
    [`${sum ** 2 + 2 * product}`, `${sum ** 2}`, `${product ** 2 - 2 * sum}`],
  ));

  problems.push(item(
    "quadratic-roots",
    seed,
    4,
    "reciprocal-roots",
    "두 근의 역수 합",
    "\\frac1\\alpha+\\frac1\\beta의 값은?",
    `${equation}\\text{의 두 근을 }\\alpha,\\beta\\text{라 하자.}`,
    `\\frac{${sum}}{${product}}`,
    [`\\frac{${product}}{${sum || 1}}`, `\\frac{${-sum}}{${product}}`, `\\frac{${sum}}{${-product}}`],
  ));

  {
    const shift = nonzero(next, -3, 3);
    const shiftedSum = sum + 2 * shift;
    const shiftedProduct = product + shift * sum + shift ** 2;
    const answer = `${quadraticLatex(1, -shiftedSum, shiftedProduct)}=0`;
    problems.push(item(
      "quadratic-roots",
      seed,
      5,
      "shifted-root-equation",
      "두 근을 평행이동한 새 방정식",
      "\\alpha+k,\\beta+k를 두 근으로 하는 이차방정식은?",
      `${equation},\\quad k=${shift}`,
      answer,
      [
        `${quadraticLatex(1, -(sum - 2 * shift), product - shift * sum + shift ** 2)}=0`,
        `${quadraticLatex(1, -shiftedSum, -shiftedProduct)}=0`,
        `${quadraticLatex(1, shiftedSum, shiftedProduct)}=0`,
      ],
    ));
  }

  problems.push(item(
    "quadratic-roots",
    seed,
    6,
    "reciprocal-root-equation",
    "역수를 근으로 하는 새 방정식",
    "\\frac1\\alpha,\\frac1\\beta를 두 근으로 하는 이차방정식은?",
    `${equation}\\text{의 두 근을 }\\alpha,\\beta\\text{라 하자.}`,
    `${quadraticLatex(product, -sum, 1)}=0`,
    [
      `${quadraticLatex(product, sum, 1)}=0`,
      `${quadraticLatex(1, -sum, product)}=0`,
      `${quadraticLatex(sum, -product, 1)}=0`,
    ],
  ));

  problems.push(item(
    "quadratic-roots",
    seed,
    7,
    "root-distance",
    "판별식과 두 근의 차",
    "|\\alpha-\\beta|의 값은?",
    `${equation}\\text{의 두 근을 }\\alpha,\\beta\\text{라 하자.}`,
    `${Math.abs(alpha - beta)}`,
    [`${Math.abs(sum)}`, `${Math.abs(product)}`, `${Math.abs(alpha - beta) ** 2}`],
  ));

  return problems;
}

export function createQuadraticFunctionRelationProblems(seed: number) {
  const next = random(seed);
  const problems: QuadraticFoundationProblem[] = [];
  const a = integer(next, 1, 3);
  const h = integer(next, -4, 4);
  const k = integer(next, -6, 6);
  const b = -2 * a * h;
  const c = a * h ** 2 + k;
  const functionLatex = `f(x)=${quadraticLatex(a, b, c)}`;

  problems.push(item(
    "quadratic-functions",
    seed,
    0,
    "vertex",
    "꼭짓점과 축",
    "꼭짓점과 대칭축은?",
    functionLatex,
    `(${h},${k}),\\quad x=${h}`,
    [`(${-h},${k}),\\quad x=${-h}`, `(${h},${-k}),\\quad x=${h}`, `(${b},${c}),\\quad x=${b}`],
  ));

  problems.push(item(
    "quadratic-functions",
    seed,
    1,
    "maximum-minimum",
    "이차함수의 최솟값",
    "최솟값과 그때의 x는?",
    functionLatex,
    `${k},\\quad x=${h}`,
    [`${-k},\\quad x=${h}`, `${k},\\quad x=${-h}`, `${c},\\quad x=0`],
  ));

  {
    const left = h - integer(next, 1, 3);
    const right = h + integer(next, 1, 3);
    const leftValue = a * (left - h) ** 2 + k;
    const rightValue = a * (right - h) ** 2 + k;
    const maximum = Math.max(leftValue, rightValue);
    problems.push(item(
      "quadratic-functions",
      seed,
      2,
      "interval-extrema",
      "닫힌구간의 최대·최소",
      "최댓값과 최솟값은?",
      `${functionLatex},\\quad ${left}\\le x\\le ${right}`,
      `\\max=${maximum},\\quad\\min=${k}`,
      [`\\max=${k},\\quad\\min=${maximum}`, `\\max=${Math.min(leftValue, rightValue)},\\quad\\min=${k}`, `\\max=${maximum},\\quad\\min=${-k}`],
    ));
  }

  {
    const [first, second] = distinctNonzeroPair(next);
    const lineSlope = b + a * (first + second);
    const lineConstant = c - a * first * second;
    problems.push(item(
      "quadratic-functions",
      seed,
      3,
      "line-intersections",
      "이차함수와 직선의 교점 개수",
      "교점의 개수는?",
      `y=${quadraticLatex(a, b, c)},\\quad y=${linearLatex(lineSlope, lineConstant)}`,
      "2",
      ["0", "1", "3"],
    ));
  }

  {
    let slope = b + 2 * a * integer(next, -3, 3);
    while (slope === 0) slope = b + 2 * a * integer(next, -3, 3);
    const tangentX = (slope - b) / (2 * a);
    const tangentY = a * tangentX ** 2 + b * tangentX + c;
    const intercept = tangentY - slope * tangentX;
    problems.push(item(
      "quadratic-functions",
      seed,
      4,
      "tangent-parameter",
      "직선이 접할 조건",
      "직선이 접하도록 하는 m은?",
      `${functionLatex},\\quad y=${linearLatex(slope, 0)}+m`,
      `m=${intercept}`,
      [`m=${-intercept}`, `m=${intercept + 1}`, `m=${intercept - 1}`],
    ));
  }

  {
    const first = integer(next, -4, 1);
    const second = integer(next, 2, 5);
    const lineSlope = b + a * (first + second);
    const lineConstant = c - a * first * second;
    problems.push(item(
      "quadratic-functions",
      seed,
      5,
      "intersection-points",
      "교점의 x좌표",
      "두 교점의 x좌표는?",
      `${functionLatex},\\quad y=${linearLatex(lineSlope, lineConstant)}`,
      `x=${first},\\ ${second}`,
      [`x=${-first},\\ ${-second}`, `x=${first + 1},\\ ${second + 1}`, `x=${first},\\ ${-second}`],
    ));
  }

  {
    const pointX = h + nonzero(next, -3, 3);
    const pointY = a * (pointX - h) ** 2 + k;
    problems.push(item(
      "quadratic-functions",
      seed,
      6,
      "determine-from-vertex",
      "꼭짓점과 한 점으로 식 결정",
      "이차함수의 식은?",
      `\\text{꼭짓점 }(${h},${k}),\\quad (${pointX},${pointY})\\text{를 지난다.}`,
      `y=${vertexFormLatex(a, h, k)}`,
      [
        `y=${vertexFormLatex(-a, h, k)}`,
        `y=${vertexFormLatex(a, -h, k)}`,
        `y=${vertexFormLatex(a, h, -k)}`,
      ],
    ));
  }

  {
    const rootGap = integer(next, 1, 4);
    const rootLeft = h - rootGap;
    const rootRight = h + rootGap;
    const rootFunction = `g(x)=${factoredQuadraticLatex(a, rootLeft, rootRight)}`;
    const minimum = -a * rootGap ** 2;
    problems.push(item(
      "quadratic-functions",
      seed,
      7,
      "root-vertex-connection",
      "두 근과 최솟값의 연결",
      "g(x)의 최솟값은?",
      rootFunction,
      `${minimum}`,
      [`${-minimum}`, `${minimum + a}`, `${-a * rootGap}`],
    ));
  }

  return problems;
}

export function createSimultaneousQuadraticProblems(seed: number) {
  const next = random(seed);
  const problems: QuadraticFoundationProblem[] = [];

  {
    const difference = nonzero(next, -4, 4);
    const sum = nonzero(next, -6, 6);
    const productDifference = difference * sum;
    const x = (sum + difference) / 2;
    const y = (sum - difference) / 2;
    const scale = Number.isInteger(x) ? 1 : 2;
    const integerDifference = difference * scale;
    const integerSum = sum * scale;
    problems.push(item(
      "simultaneous-quadratic",
      seed,
      0,
      "difference-of-squares-system",
      "곱셈공식으로 연립방정식 풀기",
      "(x,y)는?",
      `\\begin{cases}x-y=${integerDifference}\\\\x^2-y^2=${productDifference * scale ** 2}\\end{cases}`,
      pairLatex(x * scale, y * scale),
      [pairLatex(y * scale, x * scale), pairLatex(-x * scale, -y * scale), pairLatex(x * scale, -y * scale)],
    ));
  }

  const [r, s] = distinctNonzeroPair(next);
  const sum = r + s;
  const product = r * s;
  const swapped = [[r, s], [s, r]] as Array<[number, number]>;

  problems.push(item(
    "simultaneous-quadratic",
    seed,
    1,
    "sum-product-system",
    "합과 곱이 주어진 연립방정식",
    "순서쌍 (x,y)는?",
    `\\begin{cases}x+y=${sum}\\\\xy=${product}\\end{cases}`,
    pairSetLatex(swapped),
    [pairSetLatex([[r, -s], [-s, r]]), pairSetLatex([[-r, -s], [-s, -r]]), pairLatex(r, s)],
  ));

  problems.push(item(
    "simultaneous-quadratic",
    seed,
    2,
    "sum-squares-system",
    "합과 제곱합이 주어진 연립방정식",
    "순서쌍 (x,y)는?",
    `\\begin{cases}x+y=${sum}\\\\x^2+y^2=${r ** 2 + s ** 2}\\end{cases}`,
    pairSetLatex(swapped),
    [pairSetLatex([[r, -s], [-s, r]]), pairSetLatex([[-r, -s], [-s, -r]]), pairLatex(s, r)],
  ));

  {
    const difference = r - s;
    const alternatives = [[r, s], [-s, -r]] as Array<[number, number]>;
    problems.push(item(
      "simultaneous-quadratic",
      seed,
      3,
      "difference-product-system",
      "차와 곱이 주어진 연립방정식",
      "순서쌍 (x,y)는?",
      `\\begin{cases}x-y=${difference}\\\\xy=${product}\\end{cases}`,
      pairSetLatex(alternatives),
      [pairSetLatex(swapped), pairSetLatex([[-r, -s], [-s, -r]]), pairLatex(r, s)],
    ));
  }

  {
    const first = integer(next, -4, 0);
    const second = integer(next, 1, 5);
    const slope = -(first + second);
    const intercept = integer(next, -4, 4);
    const constant = intercept - first * second;
    const firstY = slope * first + intercept;
    const secondY = slope * second + intercept;
    problems.push(item(
      "simultaneous-quadratic",
      seed,
      4,
      "line-parabola-system",
      "일차식 대입 후 이차방정식",
      "순서쌍 (x,y)는?",
      `\\begin{cases}y=${linearLatex(slope, intercept)}\\\\x^2+y=${constant}\\end{cases}`,
      pairSetLatex([[first, firstY], [second, secondY]]),
      [
        pairSetLatex([[first, -firstY], [second, -secondY]]),
        pairSetLatex([[firstY, first], [secondY, second]]),
        pairLatex(first, firstY),
      ],
    ));
  }

  {
    const difference = nonzero(next, -4, 4);
    const magnitude = integer(next, 2, 6);
    const positive = [(magnitude + difference) / 2, (magnitude - difference) / 2];
    const negative = [(-magnitude + difference) / 2, (-magnitude - difference) / 2];
    const scale = [...positive, ...negative].every(Number.isInteger) ? 1 : 2;
    const answers = [
      [positive[0] * scale, positive[1] * scale],
      [negative[0] * scale, negative[1] * scale],
    ] as Array<[number, number]>;
    problems.push(item(
      "simultaneous-quadratic",
      seed,
      5,
      "two-sums-system",
      "합을 치환하는 연립방정식",
      "순서쌍 (x,y)는?",
      `\\begin{cases}x-y=${difference * scale}\\\\(x+y)^2=${magnitude ** 2 * scale ** 2}\\end{cases}`,
      pairSetLatex(answers),
      [pairSetLatex(answers.map(([x, y]) => [y, x])), pairSetLatex([answers[0]]), pairSetLatex(answers.map(([x, y]) => [-x, -y]))],
    ));
  }

  {
    const solutionX = nonzero(next, -4, 4);
    const solutionY = nonzero(next, -4, 4);
    const secondX = solutionX + nonzero(next, 1, 3);
    const firstConstant = solutionX ** 2 + solutionY;
    const slope = -(solutionX + secondX);
    const intercept = firstConstant - solutionX ** 2 - slope * solutionX;
    const secondY = slope * secondX + intercept;
    problems.push(item(
      "simultaneous-quadratic",
      seed,
      6,
      "subtraction-system",
      "두 식을 빼서 차수 낮추기",
      "순서쌍 (x,y)는?",
      `\\begin{cases}x^2+y=${firstConstant}\\\\y=${linearLatex(slope, intercept)}\\end{cases}`,
      pairSetLatex([[solutionX, solutionY], [secondX, secondY]]),
      [
        pairSetLatex([[solutionX, -solutionY], [secondX, -secondY]]),
        pairSetLatex([[solutionY, solutionX], [secondY, secondX]]),
        pairLatex(solutionX, solutionY),
      ],
    ));
  }

  return problems;
}

export const quadraticRootRelationProblems = createQuadraticRootRelationProblems(20260731);
export const quadraticFunctionRelationProblems = createQuadraticFunctionRelationProblems(20260801);
export const simultaneousQuadraticProblems = createSimultaneousQuadraticProblems(20260802);
