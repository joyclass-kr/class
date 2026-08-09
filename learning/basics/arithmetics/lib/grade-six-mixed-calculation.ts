export type GradeSixMixedCalculationOperand =
  | { kind: "natural"; value: number }
  | { kind: "decimal"; value: string }
  | { kind: "fraction"; numerator: number; denominator: number }
  | { kind: "mixed"; whole: number; numerator: number; denominator: number };

export type GradeSixMixedCalculationProblem = {
  id: string;
  operands: GradeSixMixedCalculationOperand[];
  operators: Array<"+" | "−" | "×" | "÷">;
  answer: string;
  kind: "fraction" | "decimal";
};

type Rational = { numerator: number; denominator: number };

export function greatestCommonDivisor(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function rational(numerator: number, denominator = 1): Rational {
  const sign = denominator < 0 ? -1 : 1;
  const divisor = greatestCommonDivisor(numerator, denominator);
  return { numerator: sign * numerator / divisor, denominator: sign * denominator / divisor };
}

function add(left: Rational, right: Rational) {
  return rational(left.numerator * right.denominator + right.numerator * left.denominator, left.denominator * right.denominator);
}

function subtract(left: Rational, right: Rational) {
  return add(left, rational(-right.numerator, right.denominator));
}

function multiply(left: Rational, right: Rational) {
  return rational(left.numerator * right.numerator, left.denominator * right.denominator);
}

function divide(left: Rational, right: Rational) {
  return rational(left.numerator * right.denominator, left.denominator * right.numerator);
}

function formatFraction(value: Rational) {
  const whole = Math.trunc(value.numerator / value.denominator);
  const remainder = Math.abs(value.numerator % value.denominator);
  if (!remainder) return String(whole);
  if (!whole) return `${value.numerator}/${value.denominator}`;
  return `${whole} ${remainder}/${value.denominator}`;
}

function formatDecimal(value: Rational) {
  return String(value.numerator / value.denominator);
}

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
  return values[integer(next, 0, values.length - 1)];
}

function properFraction(next: () => number, minimumDenominator: number, maximumDenominator: number) {
  for (;;) {
    const denominator = integer(next, minimumDenominator, maximumDenominator);
    const numerator = integer(next, 1, denominator - 1);
    const value = rational(numerator, denominator);
    if (value.numerator > 0 && value.numerator < value.denominator) return value;
  }
}

function naturalOperand(value: number): GradeSixMixedCalculationOperand {
  return { kind: "natural", value };
}

function decimalOperand(value: Rational): GradeSixMixedCalculationOperand {
  return { kind: "decimal", value: formatDecimal(value) };
}

function fractionOperand(value: Rational): GradeSixMixedCalculationOperand {
  return { kind: "fraction", numerator: value.numerator, denominator: value.denominator };
}

function mixedOperand(whole: number, numerator: number, denominator: number): GradeSixMixedCalculationOperand {
  const fraction = rational(numerator, denominator);
  return { kind: "mixed", whole, numerator: fraction.numerator, denominator: fraction.denominator };
}

export function normalizeGradeSixMixedAnswer(input: string) {
  const compact = input.trim().replace(/\s+/g, " ");
  const mixed = compact.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return formatFraction(add(rational(Number(mixed[1])), rational(Number(mixed[2]), Number(mixed[3]))));
  const fraction = compact.match(/^(-?\d+)\/(\d+)$/);
  if (fraction) return formatFraction(rational(Number(fraction[1]), Number(fraction[2])));
  if (/^-?\d+(\.\d+)?$/.test(compact)) return String(Number(compact));
  return compact;
}

export function createGradeSixMixedCalculationSet(seed: number): GradeSixMixedCalculationProblem[] {
  const next = random(seed);

  const a = properFraction(next, 4, 9);
  const b = properFraction(next, 4, 9);
  const c = properFraction(next, 4, 9);
  const one = multiply(divide(a, b), c);

  const twoLeft = rational(integer(next, 666, 999), 100);
  const twoRight = rational(integer(next, 11, 55), 10);
  const twoDivisor = pick(next, [2, 4, 5, 8, 10, 20, 25, 40, 50] as const);

  const threeNatural = integer(next, 2, 4);
  const threeFraction = properFraction(next, 9, 15);
  const threeDecimal = rational(integer(next, 2, 9), 10);

  const fourDecimal = rational(integer(next, 7, 9), 10);
  const fourNatural = integer(next, 5, 8);
  const fourDenominator = pick(next, [4, 8] as const);
  const fourSubtractDenominator = pick(next, [4, 8] as const);

  const fiveNatural = integer(next, 6, 9);
  const fiveFractionDenominator = pick(next, [4, 8, 16] as const);
  const fiveDecimal = rational(integer(next, 101, 999), 100);
  const fiveMultiplier = integer(next, 3, 9);

  const sixNatural = integer(next, 2, 4);
  const sixFraction = properFraction(next, 5, 9);
  const sixDecimal = rational(integer(next, 12, 48), 100);
  const sixDivisor = integer(next, 4, 5);

  return [
    {
      id: "grade-six-mixed-1",
      operands: [fractionOperand(a), fractionOperand(b), fractionOperand(c)],
      operators: ["÷", "×"],
      answer: formatFraction(one),
      kind: "fraction",
    },
    {
      id: "grade-six-mixed-2",
      operands: [decimalOperand(twoLeft), decimalOperand(twoRight), naturalOperand(twoDivisor)],
      operators: ["−", "÷"],
      answer: formatDecimal(subtract(twoLeft, divide(twoRight, rational(twoDivisor)))),
      kind: "decimal",
    },
    {
      id: "grade-six-mixed-3",
      operands: [naturalOperand(threeNatural), fractionOperand(threeFraction), decimalOperand(threeDecimal)],
      operators: ["+", "÷"],
      answer: formatFraction(add(rational(threeNatural), divide(threeFraction, threeDecimal))),
      kind: "fraction",
    },
    {
      id: "grade-six-mixed-4",
      operands: [decimalOperand(fourDecimal), mixedOperand(fourNatural, 1, fourDenominator), fractionOperand(rational(1, fourSubtractDenominator))],
      operators: ["×", "−"],
      answer: formatDecimal(subtract(multiply(fourDecimal, add(rational(fourNatural), rational(1, fourDenominator))), rational(1, fourSubtractDenominator))),
      kind: "decimal",
    },
    {
      id: "grade-six-mixed-5",
      operands: [naturalOperand(fiveNatural), fractionOperand(rational(1, fiveFractionDenominator)), decimalOperand(fiveDecimal), naturalOperand(fiveMultiplier)],
      operators: ["+", "+", "×"],
      answer: formatDecimal(add(add(rational(fiveNatural), rational(1, fiveFractionDenominator)), multiply(fiveDecimal, rational(fiveMultiplier)))),
      kind: "decimal",
    },
    {
      id: "grade-six-mixed-6",
      operands: [naturalOperand(sixNatural), fractionOperand(sixFraction), decimalOperand(sixDecimal), naturalOperand(sixDivisor)],
      operators: ["+", "÷", "÷"],
      answer: formatFraction(add(rational(sixNatural), divide(divide(sixFraction, sixDecimal), rational(sixDivisor)))),
      kind: "fraction",
    },
  ];
}