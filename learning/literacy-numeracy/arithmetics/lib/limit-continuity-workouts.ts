export type LimitKind =
  | "direct-substitution"
  | "factorization"
  | "rationalization"
  | "infinity"
  | "infinity-rationalization"
  | "one-sided"
  | "continuity";

export type LimitProblem = {
  id: string;
  kind: LimitKind;
  label: string;
  prompt: string;
  latex: string;
  answerLabels: string[];
  answers: number[];
};

const KINDS: LimitKind[] = [
  "direct-substitution",
  "factorization",
  "rationalization",
  "infinity",
  "infinity-rationalization",
  "one-sided",
  "continuity",
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

function signed(value: number) {
  if (value === 0) return "";
  return value < 0 ? `${value}` : `+${value}`;
}

function term(value: number, symbol: string) {
  if (value === 0) return "";
  const magnitude = Math.abs(value) === 1 ? "" : Math.abs(value);
  return `${value < 0 ? "-" : "+"}${magnitude}${symbol}`;
}

function build(kind: LimitKind, next: () => number, id: string): LimitProblem {
  if (kind === "direct-substitution") {
    const a = integer(next, -3, 4);
    const p = integer(next, 2, 5);
    const q = integer(next, -5, 5);
    const r = integer(next, -6, 6);
    return {
      id,
      kind,
      label: "다항함수의 극한",
      prompt: "극한값을 구하세요.",
      latex: `\\lim_{x\\to${a}}\\left(${p}x^2${term(q, "x")}${signed(r)}\\right)`,
      answerLabels: ["극한값"],
      answers: [p * a * a + q * a + r],
    };
  }

  if (kind === "factorization") {
    const a = integer(next, 2, 5);
    return {
      id,
      kind,
      label: "인수분해로 약분",
      prompt: "극한값을 구하세요.",
      latex: `\\lim_{x\\to${a}}\\frac{x^3-${a ** 3}}{x-${a}}`,
      answerLabels: ["극한값"],
      answers: [3 * a * a],
    };
  }

  if (kind === "rationalization") {
    const root = integer(next, 2, 5);
    const a = integer(next, 1, 5);
    const constant = root * root - a;
    return {
      id,
      kind,
      label: "근호식의 유리화",
      prompt: "극한값을 $\\frac1m$이라 할 때 $m$을 구하세요.",
      latex: `\\lim_{x\\to${a}}\\frac{\\sqrt{x${signed(constant)}}-${root}}{x-${a}}=\\frac1m`,
      answerLabels: ["m"],
      answers: [2 * root],
    };
  }

  if (kind === "infinity") {
    const ratio = integer(next, 2, 6);
    const denominator = integer(next, 2, 5);
    const b = integer(next, -6, 6);
    return {
      id,
      kind,
      label: "무한대에서 최고차항 비교",
      prompt: "극한값을 구하세요.",
      latex: `\\lim_{x\\to\\infty}\\frac{${ratio * denominator}x^3${term(b, "x^2")}+1}{${denominator}x^3-3x+2}`,
      answerLabels: ["극한값"],
      answers: [ratio],
    };
  }

  if (kind === "infinity-rationalization") {
    const a = integer(next, 2, 7);
    const constant = integer(next, 1, 6);
    return {
      id,
      kind,
      label: "무한대에서 근호식 유리화",
      prompt: "극한값을 구하세요.",
      latex: `\\lim_{x\\to\\infty}\\left(\\sqrt{x^2+${2 * a}x+${constant}}-x\\right)`,
      answerLabels: ["극한값"],
      answers: [a],
    };
  }

  if (kind === "one-sided") {
    const a = integer(next, 2, 6);
    const m = integer(next, 2, 5);
    const b = integer(next, 1, 6);
    const value = m * a + b;
    return {
      id,
      kind,
      label: "절댓값과 좌우극한",
      prompt: "좌극한과 우극한을 각각 구하세요.",
      latex: `\\lim_{x\\to${a}^{-}}\\frac{(x-${a})(${m}x+${b})}{|x-${a}|},\\qquad \\lim_{x\\to${a}^{+}}\\frac{(x-${a})(${m}x+${b})}{|x-${a}|}`,
      answerLabels: ["좌극한", "우극한"],
      answers: [-value, value],
    };
  }

  const a = integer(next, 2, 5);
  const b = integer(next, -4, 4);
  const c = integer(next, 1, 6);
  const q = b - a;
  const r = c - a * b;
  const s = -a * c;
  const value = a * a + b * a + c;
  return {
    id,
    kind,
    label: "연속이 되도록 함수값 결정",
    prompt: "주어진 점에서 연속이 되도록 $k$를 구하세요.",
    latex: `f(x)=\\begin{cases}\\dfrac{x^3${term(q, "x^2")}${term(r, "x")}${signed(s)}}{x-${a}}&(x\\ne${a})\\\\k&(x=${a})\\end{cases}`,
    answerLabels: ["k"],
    answers: [value],
  };
}

export function createLimitSet(seed: number) {
  const next = random(seed);
  return {
    seed,
    problems: KINDS.map((kind, index) => build(kind, next, `limit-${index}`)),
  };
}

export function createLimitReviews(kinds: LimitKind[], seed: number) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) =>
    build(kind, next, `limit-review-${index}-${seed}`));
}

export function sameLimitAnswers(values: string[], answers: number[]) {
  return values.length === answers.length
    && values.every((value, index) =>
      /^-?\d+$/.test(value) && Number(value) === answers[index]);
}
