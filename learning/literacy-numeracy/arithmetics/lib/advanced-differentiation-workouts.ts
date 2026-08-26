import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type AdvancedDifferentiationKind =
  | "parametric-first"
  | "parametric-second"
  | "implicit-circle"
  | "implicit-product"
  | "inverse-derivative-data"
  | "inverse-derivative-polynomial"
  | "logarithmic-differentiation";

export type AdvancedDifferentiationProblem = GeometryChoiceItem & {
  kind: AdvancedDifferentiationKind;
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

function integer(next: () => number, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

function pick<T>(next: () => number, values: readonly T[]) {
  return values[Math.floor(next() * values.length)]!;
}

function gcd(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function fraction(numerator: number, denominator: number) {
  if (numerator === 0) return "0";
  const sign = numerator * denominator < 0 ? "-" : "";
  const divisor = gcd(numerator, denominator);
  const top = Math.abs(numerator) / divisor;
  const bottom = Math.abs(denominator) / divisor;
  return bottom === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${bottom}}`;
}

function signed(value: number) {
  if (value === 0) return "";
  return value < 0 ? `${value}` : `+${value}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set([answer, ...distractors.filter((value) => value !== answer)])];
  for (const fallback of ["0", "1", "-1", "2"]) {
    if (unique.length === 4) break;
    if (!unique.includes(fallback)) unique.push(fallback);
  }
  return unique.slice(0, 4).map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  seed: number,
  index: number,
  kind: AdvancedDifferentiationKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): AdvancedDifferentiationProblem {
  const id = `advanced-differentiation-${seed}-${index}`;
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

export function createAdvancedDifferentiationProblems(seed: number) {
  const next = random(seed);
  const problems: AdvancedDifferentiationProblem[] = [];

  {
    const t = integer(next, 1, 3);
    const p = integer(next, 1, 4);
    const q = integer(next, 2, 5);
    const r = integer(next, -3, 4);
    const dx = 2 * t + p;
    const dy = 2 * q * t + r;
    const answer = fraction(dy, dx);
    problems.push(item(
      seed,
      0,
      "parametric-first",
      "매개변수로 나타낸 함수의 미분",
      "주어진 $t$에서 $\\frac{dy}{dx}$는?",
      `x=t^2+${p}t,\\quad y=${q}t^2${signed(r)}t,\\quad t=${t}`,
      answer,
      [fraction(dx, dy), fraction(dy, dx + 1), fraction(dy + 1, dx)],
    ));
  }

  {
    const t = integer(next, 1, 3);
    const c = integer(next, 1, 5);
    const numerator = 3 * t * t - c;
    const denominator = 4 * t ** 3;
    const answer = fraction(numerator, denominator);
    problems.push(item(
      seed,
      1,
      "parametric-second",
      "매개변수 함수의 이계미분",
      "주어진 $t$에서 $\\frac{d^2y}{dx^2}$는?",
      `x=t^2,\\quad y=t^3+${c}t,\\quad t=${t}`,
      answer,
      [
        fraction(3 * t * t + c, denominator),
        fraction(numerator, 2 * t),
        fraction(-numerator, denominator),
      ],
    ));
  }

  {
    const [x, y, radius] = pick(next, [
      [3, 4, 5],
      [4, 3, 5],
      [5, 12, 13],
      [12, 5, 13],
      [8, 15, 17],
      [15, 8, 17],
    ] as const);
    problems.push(item(
      seed,
      2,
      "implicit-circle",
      "음함수 미분: 원",
      "점 $P$에서 접선의 기울기는?",
      `x^2+y^2=${radius ** 2},\\quad P(${x},${y})`,
      fraction(-x, y),
      [fraction(x, y), fraction(-y, x), fraction(y, x)],
    ));
  }

  {
    const x = integer(next, 1, 5);
    const y = integer(next, 1, 5);
    const constant = x * y + x + y;
    problems.push(item(
      seed,
      3,
      "implicit-product",
      "음함수 미분: 곱이 있는 식",
      "주어진 점에서 $\\frac{dy}{dx}$는?",
      `xy+x+y=${constant},\\quad (${x},${y})`,
      fraction(-(y + 1), x + 1),
      [
        fraction(y + 1, x + 1),
        fraction(-(x + 1), y + 1),
        fraction(-y, x),
      ],
    ));
  }

  {
    const input = integer(next, -3, 3);
    const output = integer(next, 2, 9);
    const slope = integer(next, 2, 7);
    problems.push(item(
      seed,
      4,
      "inverse-derivative-data",
      "역함수의 미분계수",
      "$(f^{-1})'(b)$의 값은?",
      `f(${input})=${output},\\quad f'(${input})=${slope}`,
      `(f^{-1})'(${output})=${fraction(1, slope)}`,
      [
        `(f^{-1})'(${output})=${slope}`,
        `(f^{-1})'(${output})=${fraction(-1, slope)}`,
        `(f^{-1})'(${input})=${fraction(1, slope)}`,
      ],
    ));
  }

  {
    const a = integer(next, 1, 3);
    const c = integer(next, 1, 5);
    const output = a ** 3 + c * a;
    const slope = 3 * a * a + c;
    problems.push(item(
      seed,
      5,
      "inverse-derivative-polynomial",
      "역함수 식에서 미분계수",
      "$(f^{-1})'(b)$의 값은?",
      `f(x)=x^3+${c}x,\\quad b=f(${a})=${output}`,
      `(f^{-1})'(${output})=${fraction(1, slope)}`,
      [
        `(f^{-1})'(${output})=${slope}`,
        `(f^{-1})'(${output})=${fraction(1, 3 * a + c)}`,
        `(f^{-1})'(${a})=${fraction(1, slope)}`,
      ],
    ));
  }

  problems.push(item(
    seed,
    6,
    "logarithmic-differentiation",
    "로그미분법",
    "$y=x^x$의 도함수는?",
    `y=x^x\\quad(x>0)`,
    `y'=x^x(\\ln x+1)`,
    [
      `y'=x^{x-1}`,
      `y'=x^x\\ln x`,
      `y'=x^{x-1}(\\ln x+1)`,
    ],
  ));

  return problems;
}

export const advancedDifferentiationProblems =
  createAdvancedDifferentiationProblems(20260831);
