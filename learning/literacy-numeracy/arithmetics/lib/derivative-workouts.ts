export type DerivativeKind =
  | "power-rule"
  | "polynomial-derivative"
  | "derivative-at-point"
  | "difference-quotient"
  | "parameter-from-slope"
  | "second-derivative"
  | "equal-derivatives";

export type DerivativeProblem = {
  id: string;
  kind: DerivativeKind;
  label: string;
  prompt: string;
  latex: string;
  answers: number[];
  answerLabels: string[];
};

const KINDS: DerivativeKind[] = [
  "power-rule",
  "polynomial-derivative",
  "derivative-at-point",
  "difference-quotient",
  "parameter-from-slope",
  "second-derivative",
  "equal-derivatives",
];

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

function integer(next: () => number, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

function nonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}

function coefficient(value: number, symbol: string) {
  if (value === 0) return "";
  const magnitude = Math.abs(value) === 1 ? "" : Math.abs(value);
  return `${value < 0 ? "-" : ""}${magnitude}${symbol}`;
}

function signedTerm(value: number, symbol: string) {
  if (value === 0) return "";
  const magnitude = Math.abs(value) === 1 && symbol ? "" : Math.abs(value);
  return `${value < 0 ? "-" : "+"}${magnitude}${symbol}`;
}

function build(
  kind: DerivativeKind,
  next: () => number,
  id: string,
): DerivativeProblem {
  if (kind === "power-rule") {
    const c = nonzero(next, -6, 6);
    const n = integer(next, 3, 7);
    return {
      id,
      kind,
      label: "거듭제곱의 미분",
      prompt: "도함수의 계수와 차수를 구하세요.",
      latex: `f(x)=${coefficient(c, `x^{${n}}`)},\\qquad f'(x)=Ax^m`,
      answerLabels: ["A", "m"],
      answers: [c * n, n - 1],
    };
  }

  if (kind === "polynomial-derivative") {
    const a = nonzero(next, -4, 4);
    const b = nonzero(next, -5, 5);
    const c = nonzero(next, -6, 6);
    const d = integer(next, -7, 7);
    return {
      id,
      kind,
      label: "다항함수의 도함수",
      prompt: "도함수의 계수를 구하세요.",
      latex: `f(x)=${coefficient(a, "x^3")}${signedTerm(b, "x^2")}${signedTerm(c, "x")}${signedTerm(d, "")},\\qquad f'(x)=Ax^2+Bx+C`,
      answerLabels: ["A", "B", "C"],
      answers: [3 * a, 2 * b, c],
    };
  }

  if (kind === "derivative-at-point") {
    const a = nonzero(next, -3, 3);
    const b = integer(next, -4, 4);
    const c = integer(next, -5, 5);
    const point = integer(next, -2, 3);
    return {
      id,
      kind,
      label: "한 점에서의 미분계수",
      prompt: "주어진 점에서의 미분계수를 구하세요.",
      latex: `f(x)=${coefficient(a, "x^3")}${signedTerm(b, "x^2")}${signedTerm(c, "x")},\\qquad f'(${point})=?`,
      answerLabels: [`f'(${point})`],
      answers: [3 * a * point ** 2 + 2 * b * point + c],
    };
  }

  if (kind === "difference-quotient") {
    const a = nonzero(next, -4, 4);
    const b = integer(next, -5, 5);
    const c = integer(next, -6, 6);
    const point = integer(next, -3, 3);
    return {
      id,
      kind,
      label: "미분계수의 정의",
      prompt: "극한으로 나타낸 미분계수의 값을 구하세요.",
      latex: `f(x)=${coefficient(a, "x^2")}${signedTerm(b, "x")}${signedTerm(c, "")},\\qquad \\lim_{h\\to0}\\frac{f(${point}+h)-f(${point})}{h}`,
      answerLabels: ["미분계수"],
      answers: [2 * a * point + b],
    };
  }

  if (kind === "parameter-from-slope") {
    const parameter = nonzero(next, -5, 5);
    const b = integer(next, -5, 5);
    const c = integer(next, -6, 6);
    const point = nonzero(next, -3, 3);
    const slope = 2 * parameter * point + b;
    return {
      id,
      kind,
      label: "미분계수로 계수 결정",
      prompt: "조건을 만족하는 $k$를 구하세요.",
      latex: `f(x)=kx^2${signedTerm(b, "x")}${signedTerm(c, "")},\\qquad f'(${point})=${slope}`,
      answerLabels: ["k"],
      answers: [parameter],
    };
  }

  if (kind === "second-derivative") {
    const a = nonzero(next, -3, 3);
    const b = integer(next, -4, 4);
    const c = integer(next, -5, 5);
    const point = integer(next, -2, 2);
    return {
      id,
      kind,
      label: "이계도함수의 값",
      prompt: "주어진 점에서의 이계도함숫값을 구하세요.",
      latex: `f(x)=${coefficient(a, "x^4")}${signedTerm(b, "x^3")}${signedTerm(c, "x^2")},\\qquad f''(${point})=?`,
      answerLabels: [`f''(${point})`],
      answers: [12 * a * point ** 2 + 6 * b * point + 2 * c],
    };
  }

  const a = nonzero(next, -4, 4);
  let c = nonzero(next, -4, 4);
  if (c === a) c = c === 4 ? -4 : c + 1;
  const b = integer(next, -5, 5);
  const root = integer(next, -3, 3);
  const d = b + 2 * (a - c) * root;
  return {
    id,
    kind,
    label: "두 도함숫값이 같은 점",
    prompt: "$f'(x)=g'(x)$를 만족하는 $x$를 구하세요.",
    latex: `f(x)=${coefficient(a, "x^2")}${signedTerm(b, "x")},\\qquad g(x)=${coefficient(c, "x^2")}${signedTerm(d, "x")}`,
    answerLabels: ["x"],
    answers: [root],
  };
}

export function createDerivativeProblemSet(seed: number) {
  const next = random(seed);
  return {
    seed,
    problems: KINDS.map((kind, index) =>
      build(kind, next, `derivative-${index}`)),
  };
}

export function createDerivativeReviewProblems(
  kinds: DerivativeKind[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) =>
    build(kind, next, `derivative-review-${index}-${seed}`));
}

export function sameDerivativeAnswers(values: string[], expected: number[]) {
  return values.length === expected.length
    && values.every((value, index) =>
      /^-?\d+$/.test(value) && Number(value) === expected[index]);
}
