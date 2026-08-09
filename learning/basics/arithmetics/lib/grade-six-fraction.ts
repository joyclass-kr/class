import {
  FRACTION_DENOMINATORS,
  greatestCommonDivisor,
  PAIRED_DENOMINATOR_ROWS,
  PRODUCT_DENOMINATOR_ROWS,
  PROPER_NUMERATOR_ROWS,
  toMixedFraction,
} from "./grade-five-fraction-one.ts";
import type { MixedFractionAnswer } from "./grade-five-fraction-one.ts";

export type GradeSixFractionOperand =
  | { kind: "fraction"; numerator: number; denominator: number }
  | { kind: "mixed"; whole: number; numerator: number; denominator: number }
  | { kind: "natural"; value: number };

export type GradeSixFractionProblem = {
  id: string;
  kind: "addition" | "subtraction" | "three-factor-product" | "mixed-division-fraction" | "mixed-division-natural" | "fraction-division-natural" | "fraction-natural-product";
  operands: GradeSixFractionOperand[];
  operators: Array<"+" | "−" | "×" | "÷">;
  answer: MixedFractionAnswer;
};

export type GradeSixFractionSet = {
  seed: number;
  problems: GradeSixFractionProblem[];
};

const NATURAL_OPERATION_NUMERATOR: Record<number, number> = {
  5: 4,
  6: 5,
  7: 6,
  8: 5,
  9: 8,
  10: 9,
};

function seededRandom(seed: number) {
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

function pick<T>(next: () => number, values: readonly T[]): T {
  return values[integer(next, 0, values.length - 1)];
}

function fraction(numerator: number, denominator: number): GradeSixFractionOperand {
  return { kind: "fraction", numerator, denominator };
}

function mixed(whole: number, numerator: number, denominator: number): GradeSixFractionOperand {
  return { kind: "mixed", whole, numerator, denominator };
}

function natural(value: number): GradeSixFractionOperand {
  return { kind: "natural", value };
}

function denominatorIndex(denominator: number) {
  return FRACTION_DENOMINATORS.indexOf(denominator as (typeof FRACTION_DENOMINATORS)[number]);
}

function numeratorFromRows(next: () => number, denominator: number, rowStart: number, rowEnd: number) {
  return PROPER_NUMERATOR_ROWS[integer(next, rowStart, rowEnd)][denominatorIndex(denominator)];
}

function pairedDenominator(next: () => number, denominator: number) {
  const column = denominatorIndex(denominator);
  return pick(next, PAIRED_DENOMINATOR_ROWS.map((row) => row[column]));
}

// 6분수!A5:O35, 분수원본!A1:M15
function addOrSubtract(next: () => number, index: number, kind: "addition" | "subtraction"): GradeSixFractionProblem {
  const leftDenominator = pick(next, FRACTION_DENOMINATORS);
  const rightDenominator = pairedDenominator(next, leftDenominator);
  let leftNumerator = numeratorFromRows(next, leftDenominator, kind === "subtraction" ? 4 : 0, 6);
  let rightNumerator = numeratorFromRows(next, rightDenominator, 0, kind === "subtraction" ? 2 : 6);

  if (kind === "subtraction" && leftNumerator * rightDenominator < rightNumerator * leftDenominator) {
    [leftNumerator, rightNumerator] = [rightNumerator, leftNumerator];
    return {
      id: `grade-six-fraction-${index}`,
      kind,
      operands: [fraction(leftNumerator, rightDenominator), fraction(rightNumerator, leftDenominator)],
      operators: ["−"],
      answer: toMixedFraction(leftNumerator * leftDenominator - rightNumerator * rightDenominator, rightDenominator * leftDenominator),
    };
  }

  if (kind === "subtraction" && leftNumerator * rightDenominator === rightNumerator * leftDenominator) {
    leftNumerator = leftDenominator - 1;
    rightNumerator = 1;
  }

  const numerator = kind === "addition"
    ? leftNumerator * rightDenominator + rightNumerator * leftDenominator
    : leftNumerator * rightDenominator - rightNumerator * leftDenominator;
  return {
    id: `grade-six-fraction-${index}`,
    kind,
    operands: [fraction(leftNumerator, leftDenominator), fraction(rightNumerator, rightDenominator)],
    operators: [kind === "addition" ? "+" : "−"],
    answer: toMixedFraction(numerator, leftDenominator * rightDenominator),
  };
}

function productFraction(next: () => number) {
  const numerator = integer(next, 1, 15);
  const denominator = pick(next, PRODUCT_DENOMINATOR_ROWS.map((row) => row[numerator - 1]));
  return { numerator, denominator };
}

// 6분수!A41:O71, 분수원본!A18:Q35
function threeFactorProduct(next: () => number, index: number, naturalPosition: 0 | 1 | 2): GradeSixFractionProblem {
  let first = productFraction(next);
  let second = productFraction(next);
  let naturalValue = 2;
  let selected = false;

  for (let attempt = 0; attempt < 100; attempt += 1) {
    first = productFraction(next);
    second = productFraction(next);
    const rawDenominator = first.denominator * second.denominator;
    const cancellableNaturals = Array.from({ length: 14 }, (_, offset) => offset + 2)
      .filter((value) => {
        const rawNumerator = value * first.numerator * second.numerator;
        const divisor = greatestCommonDivisor(rawNumerator, rawDenominator);
        return divisor > 1 && rawDenominator / divisor <= 30;
      });
    if (cancellableNaturals.length === 0) continue;
    naturalValue = pick(next, cancellableNaturals);
    selected = true;
    break;
  }

  // 제한된 재추출 안에 조합을 못 찾은 극단적인 경우에도 약분과 작은 분모를 보장한다.
  if (!selected) naturalValue = first.denominator * second.denominator;

  const operands: GradeSixFractionOperand[] = [fraction(first.numerator, first.denominator), fraction(second.numerator, second.denominator)];
  operands.splice(naturalPosition, 0, natural(naturalValue));
  return {
    id: `grade-six-fraction-${index}`,
    kind: "three-factor-product",
    operands,
    operators: ["×", "×"],
    answer: toMixedFraction(naturalValue * first.numerator * second.numerator, first.denominator * second.denominator),
  };
}
function divisionNatural(next: () => number, numerator: number) {
  if (numerator === 4 || numerator === 8) return 2 * integer(next, 1, 4);
  if (numerator === 5) return integer(next, 2, 5);
  if (numerator === 6) return integer(next, 2, 4);
  return 3 * integer(next, 1, 4);
}

function multiplicationNatural(next: () => number, denominator: number) {
  if (denominator === 5) return 5 * integer(next, 2, 3);
  if (denominator === 6) return 3 * integer(next, 3, 5);
  if (denominator === 7) return integer(next, 2, 3);
  if (denominator === 8) return 2 * integer(next, 4, 6);
  if (denominator === 9) return 6 * integer(next, 1, 2);
  return 2 * integer(next, 2, 4);
}

// 대분수를 가분수로 바꾸고 나누는 분수의 역수를 곱하는 편이 자연스러운 유형.
function mixedDivisionFraction(next: () => number, index: number): GradeSixFractionProblem {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const denominator = integer(next, 3, 12);
    const numerator = integer(next, 1, denominator - 1);
    if (greatestCommonDivisor(numerator, denominator) !== 1) continue;
    const whole = integer(next, 2, 9);
    const divisorNumerator = integer(next, 2, 12);
    const divisorDenominator = integer(next, divisorNumerator + 1, 16);
    if (greatestCommonDivisor(divisorNumerator, divisorDenominator) !== 1) continue;

    const improperNumerator = whole * denominator + numerator;
    const rawNumerator = improperNumerator * divisorDenominator;
    const rawDenominator = denominator * divisorNumerator;
    if (greatestCommonDivisor(rawNumerator, rawDenominator) === 1) continue;
    const answer = toMixedFraction(rawNumerator, rawDenominator);
    if (answer.whole > 40) continue;
    return {
      id: `grade-six-fraction-${index}`,
      kind: "mixed-division-fraction",
      operands: [mixed(whole, numerator, denominator), fraction(divisorNumerator, divisorDenominator)],
      operators: ["÷"],
      answer,
    };
  }

  return {
    id: `grade-six-fraction-${index}`,
    kind: "mixed-division-fraction",
    operands: [mixed(3, 1, 2), fraction(7, 8)],
    operators: ["÷"],
    answer: toMixedFraction(28, 7),
  };
}
// 자연수 부분과 분자 부분이 모두 나누어떨어져 가분수로 바꾸지 않고 바로 계산하는 유형.
// 가분수로 바꾸면 분자가 네 자리 이상이 되도록 수를 구성한다.
function mixedDivisionNatural(next: () => number, index: number): GradeSixFractionProblem {
  const divisor = pick(next, [4, 5, 6, 7, 8, 9] as const);
  const denominator = pick(next, [23, 29, 31, 37, 41, 43, 47, 53] as const);
  const quotientWhole = integer(next, 12, 24);
  const quotientNumerator = integer(next, 1, Math.floor((denominator - 1) / divisor));
  const whole = quotientWhole * divisor;
  const numerator = quotientNumerator * divisor;
  return {
    id: `grade-six-fraction-${index}`,
    kind: "mixed-division-natural",
    operands: [mixed(whole, numerator, denominator), natural(divisor)],
    operators: ["÷"],
    answer: toMixedFraction(quotientWhole * denominator + quotientNumerator, denominator),
  };
}
// 6분수!A77:O89
function fractionAndNatural(next: () => number, index: number, kind: "fraction-division-natural" | "fraction-natural-product"): GradeSixFractionProblem {
  const denominator = integer(next, 5, 10);
  const numerator = NATURAL_OPERATION_NUMERATOR[denominator];
  const naturalValue = kind === "fraction-division-natural"
    ? divisionNatural(next, numerator)
    : multiplicationNatural(next, denominator);
  return {
    id: `grade-six-fraction-${index}`,
    kind,
    operands: [fraction(numerator, denominator), natural(naturalValue)],
    operators: [kind === "fraction-division-natural" ? "÷" : "×"],
    answer: kind === "fraction-division-natural"
      ? toMixedFraction(numerator, denominator * naturalValue)
      : toMixedFraction(numerator * naturalValue, denominator),
  };
}

export function createGradeSixFractionSet(seed: number): GradeSixFractionSet {
  const next = seededRandom(seed);
  return {
    seed,
    problems: [
      addOrSubtract(next, 0, "addition"),
      addOrSubtract(next, 1, "addition"),
      addOrSubtract(next, 2, "subtraction"),
      addOrSubtract(next, 3, "subtraction"),
      threeFactorProduct(next, 4, 0),
      threeFactorProduct(next, 5, 1),
      mixedDivisionFraction(next, 6),
      mixedDivisionNatural(next, 7),
      fractionAndNatural(next, 8, "fraction-division-natural"),
      fractionAndNatural(next, 9, "fraction-natural-product"),
    ],
  };
}
