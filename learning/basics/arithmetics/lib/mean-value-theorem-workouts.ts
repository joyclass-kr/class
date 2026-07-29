import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type MeanValueTheoremKind =
  | "polynomial-average-rate"
  | "parameter-from-average-rate"
  | "quadratic-mvt"
  | "cubic-mvt"
  | "rolle-theorem"
  | "reciprocal-mvt"
  | "two-mvt-points";

export type MeanValueTheoremProblem = GeometryChoiceItem & {
  kind: MeanValueTheoremKind;
  interval: readonly [number, number];
  solutionValues?: number[];
  verification?: {
    averageRate: number;
    derivativeValues: number[];
  };
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

function squareRoot(value: number) {
  const root = Math.sqrt(value);
  if (Number.isInteger(root)) return `${root}`;

  let outside = 1;
  let inside = value;
  for (let factor = Math.floor(root); factor >= 2; factor -= 1) {
    if (value % (factor * factor) === 0) {
      outside = factor;
      inside = value / (factor * factor);
      break;
    }
  }
  return `${outside === 1 ? "" : outside}\\sqrt{${inside}}`;
}

function overSquareRootThree(value: number) {
  const divisor = gcd(value, 3);
  const top = value / divisor;
  const bottom = 3 / divisor;
  const numerator = `${top === 1 ? "" : top}\\sqrt3`;
  return bottom === 1 ? numerator : `\\frac{${numerator}}{${bottom}}`;
}

function polynomial(terms: Array<{ coefficient: number; power: number }>) {
  let result = "";
  for (const { coefficient, power } of terms) {
    if (coefficient === 0) continue;
    const absolute = Math.abs(coefficient);
    const variable = power === 0
      ? ""
      : `x${power === 1 ? "" : `^${power}`}`;
    const magnitude = power > 0 && absolute === 1
      ? variable
      : `${absolute}${variable}`;
    if (!result) {
      result = `${coefficient < 0 ? "-" : ""}${magnitude}`;
    } else {
      result += `${coefficient < 0 ? "-" : "+"}${magnitude}`;
    }
  }
  return result || "0";
}

function shiftedCubic(coefficient: number, center: number, linear: number) {
  const shifted = center === 0
    ? "x"
    : center > 0
      ? `(x-${center})`
      : `(x+${Math.abs(center)})`;
  const cubic = `${coefficient === 1 ? "" : coefficient}${shifted}^3`;
  if (linear === 0) return cubic;
  const linearTerm = `${Math.abs(linear) === 1 ? "" : Math.abs(linear)}x`;
  return `${cubic}${linear < 0 ? "-" : "+"}${linearTerm}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((value) => value !== answer))];
  const separator = answer.lastIndexOf("=");
  const prefix = separator >= 0 ? answer.slice(0, separator + 1) : "";
  for (const value of ["0", "1", "-1", String.raw`\frac12`, String.raw`-\frac12`]) {
    const fallback = `${prefix}${value}`;
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
  seed: number,
  index: number,
  kind: MeanValueTheoremKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
  interval: readonly [number, number],
  solutionValues?: number[],
  verification?: MeanValueTheoremProblem["verification"],
): MeanValueTheoremProblem {
  const id = `mean-value-theorem-${seed}-${index}`;
  return {
    id,
    kind,
    label,
    prompt,
    latex,
    correctLatex: answer,
    choices: choices(id, answer, distractors),
    interval,
    solutionValues,
    verification,
  };
}

export function createMeanValueTheoremProblems(seed: number) {
  const next = random(seed);
  const problems: MeanValueTheoremProblem[] = [];

  {
    const quadratic = integer(next, 2, 5);
    const linear = pick(next, [-5, -3, -1, 1, 3, 5]);
    const constant = integer(next, -4, 6);
    const left = integer(next, -3, 2);
    const right = left + integer(next, 2, 5);
    const answer = quadratic * (left + right) + linear;
    problems.push(item(
      seed,
      0,
      "polynomial-average-rate",
      "이차함수의 평균변화율",
      "구간에서의 평균변화율은?",
      `f(x)=${polynomial([
        { coefficient: quadratic, power: 2 },
        { coefficient: linear, power: 1 },
        { coefficient: constant, power: 0 },
      ])},\\quad ${left}\\le x\\le${right}`,
      `${answer}`,
      [`${answer + quadratic}`, `${answer - quadratic}`, `${2 * quadratic * right + linear}`],
      [left, right],
    ));
  }

  {
    const parameter = integer(next, 2, 6);
    const linear = pick(next, [-4, -2, 1, 3, 5]);
    const constant = integer(next, -3, 5);
    const left = integer(next, 1, 3);
    const right = left + integer(next, 2, 4);
    const averageRate = parameter * (left + right) + linear;
    problems.push(item(
      seed,
      1,
      "parameter-from-average-rate",
      "평균변화율로 계수 구하기",
      "계수 k는?",
      `f(x)=kx^2${linear < 0 ? "" : "+"}${polynomial([
        { coefficient: linear, power: 1 },
        { coefficient: constant, power: 0 },
      ])},\\quad ${left}\\le x\\le${right},\\quad \\text{평균변화율}=${averageRate}`,
      `k=${parameter}`,
      [`k=${parameter + 1}`, `k=${parameter - 1}`, `k=${averageRate - linear}`],
      [left, right],
    ));
  }

  {
    const quadratic = integer(next, 2, 6);
    const linear = pick(next, [-5, -3, -1, 1, 3, 5]);
    const constant = integer(next, -4, 6);
    const left = integer(next, -4, 1);
    const right = left + integer(next, 2, 6);
    const midpoint = (left + right) / 2;
    const answer = `c=${fraction(left + right, 2)}`;
    problems.push(item(
      seed,
      2,
      "quadratic-mvt",
      "이차함수의 평균값정리",
      "평균값정리를 만족하는 c는?",
      `f(x)=${polynomial([
        { coefficient: quadratic, power: 2 },
        { coefficient: linear, power: 1 },
        { coefficient: constant, power: 0 },
      ])},\\quad ${left}\\le x\\le${right}`,
      answer,
      [`c=${left}`, `c=${right}`, `c=${fraction(left + right + 2, 2)}`],
      [left, right],
      [midpoint],
      {
        averageRate: quadratic * (left + right) + linear,
        derivativeValues: [2 * quadratic * midpoint + linear],
      },
    ));
  }

  {
    const coefficient = integer(next, 2, 5);
    const constant = integer(next, -4, 5);
    const bound = integer(next, 2, 6);
    const radical = overSquareRootThree(bound);
    const functionLatex = polynomial([
      { coefficient, power: 3 },
      { coefficient: constant, power: 0 },
    ]);
    problems.push(item(
      seed,
      3,
      "cubic-mvt",
      "삼차함수의 평균값정리",
      "평균값정리를 만족하는 c는?",
      `f(x)=${functionLatex},\\quad 0\\le x\\le${bound}`,
      `c=${radical}`,
      [`c=${fraction(bound, 3)}`, `c=${squareRoot(bound)}`, `c=${bound}`],
      [0, bound],
      [bound / Math.sqrt(3)],
      {
        averageRate: coefficient * bound ** 2,
        derivativeValues: [coefficient * bound ** 2],
      },
    ));
  }

  {
    const quadratic = integer(next, 2, 5);
    const left = integer(next, -4, 0);
    const right = left + integer(next, 3, 7);
    const constant = integer(next, -3, 5);
    const linear = -quadratic * (left + right);
    const finalConstant = quadratic * left * right + constant;
    const midpoint = (left + right) / 2;
    problems.push(item(
      seed,
      4,
      "rolle-theorem",
      "롤의 정리",
      "롤의 정리를 만족하는 c는?",
      `f(x)=${polynomial([
        { coefficient: quadratic, power: 2 },
        { coefficient: linear, power: 1 },
        { coefficient: finalConstant, power: 0 },
      ])},\\quad ${left}\\le x\\le${right}`,
      `c=${fraction(left + right, 2)}`,
      [`c=${left}`, `c=${right}`, `c=${fraction(left + right - 2, 2)}`],
      [left, right],
      [midpoint],
      {
        averageRate: 0,
        derivativeValues: [2 * quadratic * midpoint + linear],
      },
    ));
  }

  {
    const [left, right] = pick(next, [
      [1, 2],
      [1, 3],
      [2, 6],
      [2, 8],
      [3, 12],
      [4, 9],
      [5, 20],
    ] as const);
    const numerator = integer(next, 2, 8);
    const geometricMean = Math.sqrt(left * right);
    problems.push(item(
      seed,
      5,
      "reciprocal-mvt",
      "유리함수의 평균값정리",
      "평균값정리를 만족하는 c는?",
      `f(x)=\\frac{${numerator}}{x},\\quad ${left}\\le x\\le${right}`,
      `c=${squareRoot(left * right)}`,
      [
        `c=${fraction(left + right, 2)}`,
        `c=${left}`,
        `c=${right}`,
      ],
      [left, right],
      [geometricMean],
      {
        averageRate: -numerator / (left * right),
        derivativeValues: [-numerator / geometricMean ** 2],
      },
    ));
  }

  {
    const coefficient = integer(next, 2, 5);
    const linear = pick(next, [-4, -2, 0, 1, 3]);
    const center = integer(next, -2, 3);
    const halfWidth = integer(next, 2, 6);
    const left = center - halfWidth;
    const right = center + halfWidth;
    const offset = overSquareRootThree(halfWidth);
    const centerText = center === 0 ? "" : `${center}`;
    const answer = `c=${centerText}\\pm${offset}`;
    const onePoint = center + halfWidth / Math.sqrt(3);
    problems.push(item(
      seed,
      6,
      "two-mvt-points",
      "평균값정리를 만족하는 두 점",
      "평균값정리를 만족하는 모든 c는?",
      `f(x)=${shiftedCubic(coefficient, center, linear)},\\quad ${left}\\le x\\le${right}`,
      answer,
      [
        `c=${center}`,
        `c=${centerText}\\pm${halfWidth}`,
        `c=${centerText}\\pm${squareRoot(halfWidth)}`,
      ],
      [left, right],
      [onePoint, center - halfWidth / Math.sqrt(3)],
      {
        averageRate: coefficient * halfWidth ** 2 + linear,
        derivativeValues: [
          3 * coefficient * (onePoint - center) ** 2 + linear,
          3 * coefficient * (-halfWidth / Math.sqrt(3)) ** 2 + linear,
        ],
      },
    ));
  }

  return problems;
}

export const meanValueTheoremProblems =
  createMeanValueTheoremProblems(20260824);
