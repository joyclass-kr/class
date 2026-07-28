import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type SequenceLimitsSeriesKind =
  | "rational-same-degree"
  | "rational-degree-comparison"
  | "radical-rationalization"
  | "geometric-series-sum"
  | "geometric-series-parameter"
  | "geometric-series-convergence"
  | "telescoping-series";

export type SequenceLimitsSeriesProblem = GeometryChoiceItem & {
  kind: SequenceLimitsSeriesKind;
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

function polynomial(terms: Array<{ coefficient: number; power: number }>) {
  let result = "";
  for (const { coefficient, power } of terms) {
    if (coefficient === 0) continue;
    const absolute = Math.abs(coefficient);
    const variable = power === 0
      ? ""
      : `n${power === 1 ? "" : `^${power}`}`;
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

function linearInX(center: number) {
  if (center === 0) return "x";
  return center > 0 ? `x-${center}` : `x+${Math.abs(center)}`;
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
  kind: SequenceLimitsSeriesKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): SequenceLimitsSeriesProblem {
  const id = `sequence-limits-series-${seed}-${index}`;
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

export function createSequenceLimitsSeriesProblems(seed: number) {
  const next = random(seed);
  const problems: SequenceLimitsSeriesProblem[] = [];

  {
    const degree = pick(next, [1, 2] as const);
    const numeratorLead = integer(next, 1, 8);
    const denominatorLead = integer(next, 2, 9);
    const numeratorConstant = pick(next, [-5, -3, -1, 1, 3, 5]);
    const denominatorConstant = pick(next, [-6, -4, -2, 1, 2, 4]);
    const numerator = polynomial([
      { coefficient: numeratorLead, power: degree },
      { coefficient: numeratorConstant, power: 0 },
    ]);
    const denominator = polynomial([
      { coefficient: denominatorLead, power: degree },
      { coefficient: denominatorConstant, power: 0 },
    ]);
    const answer = fraction(numeratorLead, denominatorLead);
    problems.push(item(
      seed,
      0,
      "rational-same-degree",
      "동차수 유리식의 극한",
      "극한값은?",
      `\\lim_{n\\to\\infty}\\frac{${numerator}}{${denominator}}`,
      answer,
      [
        fraction(denominatorLead, numeratorLead),
        fraction(numeratorConstant, denominatorConstant),
        "0",
      ],
    ));
  }

  {
    const numeratorLead = integer(next, 1, 7);
    const denominatorLead = integer(next, 1, 7);
    const lowerDegreeNumerator = next() < 0.5;
    const numerator = polynomial([
      { coefficient: numeratorLead, power: lowerDegreeNumerator ? 1 : 2 },
      { coefficient: integer(next, 1, 6), power: 0 },
    ]);
    const denominator = polynomial([
      { coefficient: denominatorLead, power: lowerDegreeNumerator ? 2 : 1 },
      { coefficient: -integer(next, 1, 6), power: 0 },
    ]);
    const answer = lowerDegreeNumerator ? "0" : String.raw`\infty`;
    problems.push(item(
      seed,
      1,
      "rational-degree-comparison",
      "차수가 다른 유리식의 극한",
      "극한값은?",
      `\\lim_{n\\to\\infty}\\frac{${numerator}}{${denominator}}`,
      answer,
      [
        lowerDegreeNumerator ? String.raw`\infty` : "0",
        fraction(numeratorLead, denominatorLead),
        String.raw`-\infty`,
      ],
    ));
  }

  {
    const linearCoefficient = pick(next, [-6, -4, -2, 1, 3, 5, 8]);
    const constant = pick(next, [-5, -3, 0, 2, 4, 7]);
    const radicand = polynomial([
      { coefficient: 1, power: 2 },
      { coefficient: linearCoefficient, power: 1 },
      { coefficient: constant, power: 0 },
    ]);
    const answer = fraction(linearCoefficient, 2);
    problems.push(item(
      seed,
      2,
      "radical-rationalization",
      "근호식의 유리화",
      "극한값은?",
      `\\lim_{n\\to\\infty}\\left(\\sqrt{${radicand}}-n\\right)`,
      answer,
      [
        `${linearCoefficient}`,
        fraction(constant, 2),
        linearCoefficient > 0 ? String.raw`\infty` : String.raw`-\infty`,
      ],
    ));
  }

  {
    const denominator = integer(next, 3, 9);
    const numerator = integer(next, 1, denominator - 1);
    const negative = next() < 0.35;
    const signedNumerator = negative ? -numerator : numerator;
    const ratio = fraction(signedNumerator, denominator);
    const answer = fraction(denominator, denominator - signedNumerator);
    problems.push(item(
      seed,
      3,
      "geometric-series-sum",
      "무한등비급수의 합",
      "급수의 합은?",
      `\\sum_{k=0}^{\\infty}\\left(${ratio}\\right)^k`,
      answer,
      [
        fraction(denominator, denominator + signedNumerator),
        ratio,
        fraction(denominator - signedNumerator, denominator),
      ],
    ));
  }

  {
    const ratioDenominator = integer(next, 3, 7);
    const ratioNumerator = integer(next, 1, ratioDenominator - 1);
    const negative = next() < 0.25;
    const signedRatioNumerator = negative ? -ratioNumerator : ratioNumerator;
    const firstTerm = integer(next, 2, 9);
    const sum = fraction(
      firstTerm * ratioDenominator,
      ratioDenominator - signedRatioNumerator,
    );
    const askFirstTerm = next() < 0.5;
    const answer = askFirstTerm
      ? `a=${firstTerm}`
      : `r=${fraction(signedRatioNumerator, ratioDenominator)}`;
    const latex = askFirstTerm
      ? `\\sum_{n=1}^{\\infty}a\\left(${fraction(signedRatioNumerator, ratioDenominator)}\\right)^{n-1}=${sum}`
      : `\\sum_{n=1}^{\\infty}${firstTerm}r^{n-1}=${sum}`;
    problems.push(item(
      seed,
      4,
      "geometric-series-parameter",
      askFirstTerm ? "무한등비급수의 첫째항" : "무한등비급수의 공비",
      askFirstTerm ? "첫째항 a는?" : "공비 r은?",
      latex,
      answer,
      askFirstTerm
        ? [`a=${firstTerm + 1}`, `a=${Math.max(1, firstTerm - 1)}`, `a=${sum}`]
        : [
            `r=${fraction(-signedRatioNumerator, ratioDenominator)}`,
            `r=${fraction(ratioDenominator - signedRatioNumerator, ratioDenominator)}`,
            `r=${fraction(signedRatioNumerator, ratioDenominator + 1)}`,
          ],
    ));
  }

  {
    const center = integer(next, -4, 5);
    const radius = integer(next, 1, 4);
    const left = center - radius;
    const right = center + radius;
    const ratio = radius === 1
      ? linearInX(center)
      : `\\frac{${linearInX(center)}}{${radius}}`;
    const answer = `${left}<x<${right}`;
    problems.push(item(
      seed,
      5,
      "geometric-series-convergence",
      "무한등비급수의 수렴구간",
      "급수가 수렴하는 x의 범위는?",
      `\\sum_{n=0}^{\\infty}\\left(${ratio}\\right)^n`,
      answer,
      [
        `${left}\\le x\\le${right}`,
        `${-radius}<x<${radius}`,
        `x<${left}\\ \\text{또는}\\ x>${right}`,
      ],
    ));
  }

  {
    const shift = integer(next, 0, 5);
    const gap = integer(next, 1, 3);
    let numerator = 0;
    let denominator = 1;
    for (let offset = 1; offset <= gap; offset += 1) {
      const termDenominator = shift + offset;
      numerator = numerator * termDenominator + denominator;
      denominator *= termDenominator;
      const divisor = gcd(numerator, denominator);
      numerator /= divisor;
      denominator /= divisor;
    }
    denominator *= gap;
    const divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    const firstFactor = shift === 0 ? "n" : `(n+${shift})`;
    const secondShift = shift + gap;
    const secondFactor = `(n+${secondShift})`;
    const answer = fraction(numerator, denominator);
    problems.push(item(
      seed,
      6,
      "telescoping-series",
      "부분분수와 망원급수",
      "급수의 합은?",
      `\\sum_{n=1}^{\\infty}\\frac{1}{${firstFactor}${secondFactor}}`,
      answer,
      [
        fraction(numerator + denominator, denominator),
        fraction(numerator, denominator + gap),
        fraction(numerator + gap, denominator),
      ],
    ));
  }

  return problems;
}

export const sequenceLimitsSeriesProblems =
  createSequenceLimitsSeriesProblems(20260830);
