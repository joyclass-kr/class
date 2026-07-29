export type MiddleQuadraticFunctionMethodKind =
  | "basic-value"
  | "vertex-value"
  | "expand-vertex-form"
  | "complete-square"
  | "vertex-axis"
  | "coefficient-from-point"
  | "equation-from-vertex-point"
  | "intercepts"
  | "line-intersections"
  | "normalize-first"
  | "fraction-decimal";

export type MiddleQuadraticFunctionKind =
  | "values-and-forms"
  | "vertex-and-axis"
  | "determine-equation"
  | "intercepts-and-intersections"
  | "comprehensive";

export type MiddleQuadraticFunctionDifficulty = "basic" | "application" | "advanced";

export type MiddleQuadraticFunctionProblem = {
  id: string;
  kind: MiddleQuadraticFunctionMethodKind;
  difficulty: MiddleQuadraticFunctionDifficulty;
  structure: string;
  label: string;
  latex: string;
  answerLatex: string;
  solutionHint: string;
  distractors: string[];
};

export const MIDDLE_QUADRATIC_FUNCTION_KINDS: MiddleQuadraticFunctionKind[] = [
  "values-and-forms",
  "vertex-and-axis",
  "determine-equation",
  "intercepts-and-intersections",
  "comprehensive",
];

export const MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS: MiddleQuadraticFunctionMethodKind[] = [
  "basic-value",
  "vertex-value",
  "expand-vertex-form",
  "complete-square",
  "vertex-axis",
  "coefficient-from-point",
  "equation-from-vertex-point",
  "intercepts",
  "line-intersections",
  "normalize-first",
  "fraction-decimal",
];

export const MIDDLE_QUADRATIC_FUNCTION_TITLES: Record<MiddleQuadraticFunctionKind, string> = {
  "values-and-forms": "이차함수: 함숫값과 식의 전개",
  "vertex-and-axis": "이차함수: 꼭짓점과 대칭축",
  "determine-equation": "이차함수: 조건으로 식 구하기",
  "intercepts-and-intersections": "이차함수: 절편과 교점",
  comprehensive: "이차함수 계산 종합",
};

const MIDDLE_QUADRATIC_FUNCTION_METHOD_TITLES: Record<MiddleQuadraticFunctionMethodKind, string> = {
  "basic-value": "이차함수: y=ax²의 함숫값",
  "vertex-value": "이차함수: 꼭짓점형의 함숫값",
  "expand-vertex-form": "이차함수: 꼭짓점형 전개",
  "complete-square": "이차함수: 일반형을 꼭짓점형으로",
  "vertex-axis": "이차함수: 꼭짓점과 대칭축",
  "coefficient-from-point": "이차함수: 한 점으로 계수 구하기",
  "equation-from-vertex-point": "이차함수: 꼭짓점과 한 점으로 식 구하기",
  intercepts: "이차함수: x절편과 y절편",
  "line-intersections": "이차함수와 직선의 교점 계산",
  "normalize-first": "이차함수: 식 정리 후 꼭짓점",
  "fraction-decimal": "이차함수: 분수·소수 계수",
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

function numberLatex(value: number) {
  if (Number.isInteger(value)) return String(value);
  const numerator = Math.round(value * 2);
  const divisor = gcd(numerator, 2);
  const top = numerator / divisor;
  const bottom = 2 / divisor;
  if (bottom === 1) return String(top);
  return top < 0
    ? `-\\dfrac{${Math.abs(top)}}{${bottom}}`
    : `\\dfrac{${top}}{${bottom}}`;
}

function signedNumber(value: number) {
  return value < 0 ? numberLatex(value) : `+${numberLatex(value)}`;
}

function coefficient(value: number, variable: string, first = false) {
  if (value === 0) return "";
  const sign = value < 0 ? "-" : first ? "" : "+";
  const magnitude = Math.abs(value);
  return `${sign}${magnitude === 1 && variable ? "" : numberLatex(magnitude)}${variable}`;
}

function quadraticExpression(a: number, b: number, c: number) {
  return `${coefficient(a, "x^2", true)}${coefficient(b, "x")}${coefficient(c, "")}`;
}

function linearExpression(a: number, b: number) {
  return `${coefficient(a, "x", true)}${coefficient(b, "")}`;
}

function vertexForm(a: number, p: number, q: number) {
  const factor = a === 1 ? "" : a === -1 ? "-" : numberLatex(a);
  const inside = p === 0 ? "x" : `x${p > 0 ? "-" : "+"}${Math.abs(p)}`;
  return `y=${factor}(${inside})^2${q === 0 ? "" : signedNumber(q)}`;
}

function generalForm(a: number, b: number, c: number) {
  return `y=${quadraticExpression(a, b, c)}`;
}

function valueAnswer(value: number) {
  return `y=${numberLatex(value)}`;
}

function rootPairAnswer(first: number, second: number) {
  const roots = [...new Set([first, second])].sort((left, right) => left - right);
  return roots.length === 1
    ? `x=${numberLatex(roots[0])}`
    : `x=${roots.map(numberLatex).join(",\\ ")}`;
}

function uniqueDistractors(answer: string, candidates: string[]) {
  return [...new Set([...candidates, "y=0", "a=1", "x=0"].filter((candidate) => candidate !== answer))].slice(0, 3);
}

function make(
  id: string,
  kind: MiddleQuadraticFunctionMethodKind,
  latex: string,
  answerLatex: string,
  solutionHint: string,
  distractors: string[],
  structure = kind,
): MiddleQuadraticFunctionProblem {
  return {
    id,
    kind,
    difficulty: "basic",
    structure,
    label: MIDDLE_QUADRATIC_FUNCTION_METHOD_TITLES[kind],
    latex,
    answerLatex,
    solutionHint,
    distractors: uniqueDistractors(answerLatex, distractors),
  };
}

function distinctRoots(next: () => number, limit: number) {
  const first = nonzero(next, -limit, limit);
  let second = nonzero(next, -limit, limit);
  while (second === first) second = nonzero(next, -limit, limit);
  return [first, second] as const;
}

function objectParticle(value: number) {
  return [0, 1, 3, 6, 7, 8].includes(Math.abs(value) % 10) ? "을" : "를";
}

function substitutedSquare(a: number, x: number) {
  if (a === 1) return `(${x})^2`;
  if (a === -1) return `-(${x})^2`;
  return `${a}\\times(${x})^2`;
}

function build(
  kind: MiddleQuadraticFunctionMethodKind,
  next: () => number,
  id: string,
  variantHint = 0,
): MiddleQuadraticFunctionProblem {
  const coefficientLimit = variantHint < 5 ? 4 : 6;
  const a = nonzero(next, -coefficientLimit, coefficientLimit);
  const p = integer(next, -6, 6);
  const q = integer(next, -8, 8);
  let x = integer(next, -7, 7);
  while (x === p) x = integer(next, -7, 7);

  if (kind === "basic-value") {
    const value = a * x * x;
    return make(id, kind, `y=${coefficient(a, "x^2", true)},\\quad x=${x}`, valueAnswer(value),
      `${x}${objectParticle(x)} x에 대입해 ${substitutedSquare(a, x)}을 계산한다.`,
      [valueAnswer(-value), valueAnswer(a * x), valueAnswer(value + a)],
      a > 0 ? "positive-coefficient-value" : "negative-coefficient-value");
  }

  if (kind === "vertex-value") {
    const value = a * (x - p) ** 2 + q;
    return make(id, kind, `${vertexForm(a, p, q)},\\quad x=${x}`, valueAnswer(value),
      `괄호 안의 값 ${x - p}을 먼저 계산한 뒤 제곱하고 ${q}를 더한다.`,
      [valueAnswer(a * (x - p) + q), valueAnswer(a * (x + p) ** 2 + q), valueAnswer(value - q)],
      p === 0 ? "unshifted-value" : "shifted-value");
  }

  if (kind === "expand-vertex-form") {
    const b = -2 * a * p;
    const c = a * p * p + q;
    const answer = generalForm(a, b, c);
    return make(id, kind, vertexForm(a, p, q), answer,
      `괄호를 제곱한 뒤 ${a}를 분배하고 동류항을 정리한다.`,
      [
        generalForm(a, 2 * a * p, c),
        generalForm(a, -2 * p, p * p + q),
        generalForm(a, b, q),
      ],
      a === 1 ? "monic-expansion" : "scaled-expansion");
  }

  if (kind === "complete-square") {
    const b = -2 * a * p;
    const c = a * p * p + q;
    const answer = vertexForm(a, p, q);
    return make(id, kind, generalForm(a, b, c), answer,
      `${a}를 먼저 묶고 x의 계수 절반을 이용해 완전제곱식을 만든다.`,
      [
        vertexForm(a, -p, q),
        vertexForm(a, p, -q),
        vertexForm(a, p, c),
      ],
      a === 1 ? "monic-completing-square" : "scaled-completing-square");
  }

  if (kind === "vertex-axis") {
    const b = -2 * a * p;
    const c = a * p * p + q;
    const answer = `\\text{꼭짓점 }(${p},${q}),\\quad x=${p}`;
    return make(id, kind, generalForm(a, b, c), answer,
      `완전제곱하여 ${vertexForm(a, p, q)}로 바꾸고 p와 q를 읽는다.`,
      [
        `\\text{꼭짓점 }(${-p},${q}),\\quad x=${-p}`,
        `\\text{꼭짓점 }(${p},${-q}),\\quad x=${p}`,
        `\\text{꼭짓점 }(${q},${p}),\\quad x=${q}`,
      ],
      a === 1 ? "monic-vertex-axis" : "scaled-vertex-axis");
  }

  if (kind === "coefficient-from-point") {
    const value = a * (x - p) ** 2 + q;
    const answer = `a=${a}`;
    const inside = p === 0 ? "x" : `x${p > 0 ? "-" : "+"}${Math.abs(p)}`;
    return make(id, kind,
      `y=a(${inside})^2${q === 0 ? "" : signedNumber(q)},\\quad (${x},${value})`,
      answer,
      `점의 좌표를 대입해 ${value}=a(${x - p})^2${q === 0 ? "" : signedNumber(q)} 꼴로 a를 구한다.`,
      [`a=${-a}`, `a=${a * (x - p)}`, `a=${a + q}`],
      Math.abs(x - p) === 1 ? "unit-distance-point" : "scaled-distance-point");
  }

  if (kind === "equation-from-vertex-point") {
    const value = a * (x - p) ** 2 + q;
    const answer = vertexForm(a, p, q);
    return make(id, kind,
      `\\text{꼭짓점 }(${p},${q}),\\quad \\text{지나는 점 }(${x},${value})`,
      answer,
      "꼭짓점형에 주어진 점을 대입해 a를 구한 뒤 식을 완성한다.",
      [vertexForm(-a, p, q), vertexForm(a, -p, q), vertexForm(a, p, -q)],
      a > 0 ? "upward-equation" : "downward-equation");
  }

  if (kind === "intercepts") {
    const [first, second] = distinctRoots(next, variantHint < 5 ? 5 : 8);
    const [smaller, larger] = [first, second].sort((left, right) => left - right);
    const b = -a * (first + second);
    const c = a * first * second;
    const answer = `x:${smaller},\\ ${larger},\\quad y:${c}`;
    return make(id, kind, generalForm(a, b, c), answer,
      "y=0을 놓아 두 x절편을 구하고 x=0을 대입해 y절편을 구한다.",
      [
        `x:${-first},\\ ${-second},\\quad y:${c}`,
        `x:${first},\\ ${second},\\quad y:${-c}`,
        `x:${first + second},\\ ${first * second},\\quad y:${c}`,
      ],
      c < 0 ? "opposite-sign-intercepts" : "same-sign-intercepts");
  }

  if (kind === "line-intersections") {
    const [first, second] = distinctRoots(next, variantHint < 5 ? 5 : 8);
    const lineSlope = nonzero(next, -4, 4);
    const lineConstant = integer(next, -6, 6);
    const quadraticB = lineSlope - a * (first + second);
    const quadraticC = lineConstant + a * first * second;
    const answer = rootPairAnswer(first, second);
    return make(id, kind,
      `${generalForm(a, quadraticB, quadraticC)},\\quad y=${linearExpression(lineSlope, lineConstant)}`,
      answer,
      "두 식의 y를 같게 놓고 한쪽으로 이항하여 이차방정식을 푼다.",
      [
        rootPairAnswer(-first, -second),
        rootPairAnswer(first + 1, second + 1),
        rootPairAnswer(first + second, first * second),
      ],
      first * second < 0 ? "mixed-intersections" : "same-side-intersections");
  }

  if (kind === "normalize-first") {
    const extraLinear = nonzero(next, -7, 7);
    const targetB = -2 * a * p;
    const firstLinear = targetB - extraLinear;
    const extraConstant = nonzero(next, -8, 8);
    const targetC = a * p * p + q;
    const firstConstant = targetC - extraConstant;
    const latex = `y=${quadraticExpression(a, firstLinear, firstConstant)}${coefficient(extraLinear, "x")}${coefficient(extraConstant, "")}`;
    const answer = `\\text{꼭짓점 }(${p},${q}),\\quad x=${p}`;
    return make(id, kind, latex, answer,
      "동류항을 먼저 합친 뒤 완전제곱하여 꼭짓점과 대칭축을 구한다.",
      [
        `\\text{꼭짓점 }(${-p},${q}),\\quad x=${-p}`,
        `\\text{꼭짓점 }(${p},${-q}),\\quad x=${p}`,
        `\\text{꼭짓점 }(${q},${p}),\\quad x=${q}`,
      ],
      variantHint < 4 ? "combine-linear-terms" : "combine-all-like-terms");
  }

  if (kind === "fraction-decimal") {
    const fractionalA = variantHint % 2 === 0 ? 0.5 : -0.5;
    const value = fractionalA * (x - p) ** 2 + q;
    const displayedA = variantHint % 2 === 0 ? "\\dfrac{1}{2}" : "-0.5";
    const inside = p === 0 ? "x" : `x${p > 0 ? "-" : "+"}${Math.abs(p)}`;
    return make(id, kind,
      `y=${displayedA}(${inside})^2${q === 0 ? "" : signedNumber(q)},\\quad x=${x}`,
      valueAnswer(value),
      "괄호 안을 먼저 계산하고 제곱한 뒤 분수·소수 계수를 곱한다.",
      [valueAnswer(-value), valueAnswer(fractionalA * (x + p) ** 2 + q), valueAnswer(value - q)],
      variantHint % 2 === 0 ? "fraction-value" : "decimal-value");
  }

  throw new Error(`지원하지 않는 이차함수 계산 유형: ${kind}`);
}

function difficultyForIndex(index: number): MiddleQuadraticFunctionDifficulty {
  if (index < 2) return "basic";
  if (index < 5) return "application";
  return "advanced";
}

function comprehensiveKind(seed: number, index: number) {
  const offset = (((seed - 1) * 8) % MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS.length
    + MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS.length)
    % MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS.length;
  return MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS[
    (offset + index) % MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS.length
  ];
}

const GROUP_METHOD_PLANS: Record<Exclude<MiddleQuadraticFunctionKind, "comprehensive">, MiddleQuadraticFunctionMethodKind[]> = {
  "values-and-forms": [
    "basic-value", "vertex-value",
    "basic-value", "vertex-value", "expand-vertex-form",
    "fraction-decimal", "fraction-decimal", "expand-vertex-form",
  ],
  "vertex-and-axis": [
    "vertex-axis", "complete-square",
    "vertex-axis", "complete-square", "normalize-first",
    "normalize-first", "complete-square", "vertex-axis",
  ],
  "determine-equation": [
    "coefficient-from-point", "equation-from-vertex-point",
    "coefficient-from-point", "equation-from-vertex-point", "coefficient-from-point",
    "equation-from-vertex-point", "coefficient-from-point", "equation-from-vertex-point",
  ],
  "intercepts-and-intersections": [
    "intercepts", "line-intersections",
    "intercepts", "line-intersections", "intercepts",
    "line-intersections", "intercepts", "line-intersections",
  ],
};

const LEGACY_KIND_GROUPS: Record<MiddleQuadraticFunctionMethodKind, MiddleQuadraticFunctionKind> = {
  "basic-value": "values-and-forms",
  "vertex-value": "values-and-forms",
  "expand-vertex-form": "values-and-forms",
  "fraction-decimal": "values-and-forms",
  "complete-square": "vertex-and-axis",
  "vertex-axis": "vertex-and-axis",
  "normalize-first": "vertex-and-axis",
  "coefficient-from-point": "determine-equation",
  "equation-from-vertex-point": "determine-equation",
  intercepts: "intercepts-and-intersections",
  "line-intersections": "intercepts-and-intersections",
};

export function isMiddleQuadraticFunctionKind(value: string | null): value is MiddleQuadraticFunctionKind {
  return MIDDLE_QUADRATIC_FUNCTION_KINDS.includes(value as MiddleQuadraticFunctionKind);
}

export function resolveMiddleQuadraticFunctionKind(value: string | null): MiddleQuadraticFunctionKind | null {
  if (isMiddleQuadraticFunctionKind(value)) return value;
  if (MIDDLE_QUADRATIC_FUNCTION_METHOD_KINDS.includes(value as MiddleQuadraticFunctionMethodKind)) {
    return LEGACY_KIND_GROUPS[value as MiddleQuadraticFunctionMethodKind];
  }
  return null;
}

export function createMiddleQuadraticFunctionProblemSet(
  kind: MiddleQuadraticFunctionKind,
  seed: number,
) {
  const next = random(seed);
  return {
    seed,
    kind,
    problems: Array.from({ length: 8 }, (_, index) => ({
      ...build(
        kind === "comprehensive" ? comprehensiveKind(seed, index) : GROUP_METHOD_PLANS[kind][index],
        next,
        `middle-quadratic-function-${kind}-${index}`,
        index,
      ),
      difficulty: difficultyForIndex(index),
    })),
  };
}

export function createMiddleQuadraticFunctionReviewProblems(
  kinds: MiddleQuadraticFunctionMethodKind[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => ({
    ...build(kind, next, `middle-quadratic-function-review-${kind}-${index}-${seed}`, index),
    difficulty: difficultyForIndex(index),
  }));
}
