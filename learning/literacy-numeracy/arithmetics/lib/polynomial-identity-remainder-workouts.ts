import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type PolynomialIdentityRemainderKind =
  | "coefficient-comparison"
  | "special-value-substitution"
  | "division-identity"
  | "remainder-theorem"
  | "factor-theorem"
  | "two-linear-remainders"
  | "quadratic-reduction"
  | "combined-divisors";

export type PolynomialIdentityRemainderProblem = GeometryChoiceItem & {
  kind: PolynomialIdentityRemainderKind;
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

function multiply(left: number[], right: number[]) {
  const result = Array(left.length + right.length - 1).fill(0);
  for (let i = 0; i < left.length; i += 1) {
    for (let j = 0; j < right.length; j += 1) result[i + j] += left[i] * right[j];
  }
  return result;
}

function add(left: number[], right: number[]) {
  return Array.from(
    { length: Math.max(left.length, right.length) },
    (_, index) => (left[index] ?? 0) + (right[index] ?? 0),
  );
}

function evaluate(coefficients: number[], value: number) {
  return coefficients.reduceRight((result, coefficient) => result * value + coefficient, 0);
}

function formatPolynomial(coefficients: number[]) {
  const terms: string[] = [];
  for (let power = coefficients.length - 1; power >= 0; power -= 1) {
    const value = coefficients[power] ?? 0;
    if (value === 0) continue;
    const magnitude = Math.abs(value);
    const variable = power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
    const number = variable && magnitude === 1 ? "" : `${magnitude}`;
    const term = `${number}${variable}`;
    if (terms.length === 0) terms.push(value < 0 ? `-${term}` : term);
    else terms.push(`${value < 0 ? "-" : "+"}${term}`);
  }
  return terms.join("") || "0";
}

function linearFactor(root: number) {
  return root > 0 ? `x-${root}` : `x+${Math.abs(root)}`;
}

function signed(value: number, suffix = "") {
  const magnitude = Math.abs(value);
  const number = suffix && magnitude === 1 ? "" : `${magnitude}`;
  return `${value < 0 ? "-" : "+"}${number}${suffix}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "-1", "x", "x^2"]) {
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
  kind: PolynomialIdentityRemainderKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): PolynomialIdentityRemainderProblem {
  const id = `polynomial-identity-remainder-${seed}-${index}`;
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

export function createPolynomialIdentityRemainderProblems(seed: number) {
  const next = random(seed);
  const problems: PolynomialIdentityRemainderProblem[] = [];

  {
    const shift = nonzero(next, -3, 3);
    const a = nonzero(next, 1, 4);
    const b = nonzero(next, -5, 5);
    const c = nonzero(next, -6, 6);
    const expanded = add(add(multiply([shift, 1], multiply([shift, 1], [a])), multiply([shift, 1], [b])), [c]);
    const answer = `a=${a},\\quad b=${b},\\quad c=${c}`;
    problems.push(item(
      seed,
      0,
      "coefficient-comparison",
      "항등식: 계수 비교",
      "a, b, c의 값은?",
      `${formatPolynomial(expanded)}\\equiv a(x${signed(shift)})^2+b(x${signed(shift)})+c`,
      answer,
      [
        `a=${a},\\quad b=${-b},\\quad c=${c}`,
        `a=${a},\\quad b=${b},\\quad c=${-c}`,
        `a=${-a},\\quad b=${b},\\quad c=${c}`,
      ],
    ));
  }

  {
    let p = nonzero(next, -4, 4);
    let q = nonzero(next, -4, 4);
    while (q === p) q = nonzero(next, -4, 4);
    const a = nonzero(next, -5, 5);
    const b = nonzero(next, -5, 5);
    const rhs = add(multiply([-p, 1], [a]), multiply([-q, 1], [b]));
    const answer = `A=${a},\\quad B=${b}`;
    problems.push(item(
      seed,
      1,
      "special-value-substitution",
      "항등식: 수치 대입법",
      "A, B의 값은?",
      `A(${linearFactor(p)})+B(${linearFactor(q)})\\equiv ${formatPolynomial(rhs)}`,
      answer,
      [
        `A=${b},\\quad B=${a}`,
        `A=${-a},\\quad B=${b}`,
        `A=${a},\\quad B=${-b}`,
      ],
    ));
  }

  {
    const root = nonzero(next, -3, 3);
    const quotient = [nonzero(next, -5, 5), nonzero(next, -4, 4), nonzero(next, 1, 3)];
    const remainder = nonzero(next, -7, 7);
    const dividend = add(multiply([-root, 1], quotient), [remainder]);
    const answer = `a=${quotient[2]},\\quad b=${quotient[1]},\\quad c=${quotient[0]},\\quad r=${remainder}`;
    problems.push(item(
      seed,
      2,
      "division-identity",
      "나눗셈 항등식",
      "a, b, c, r의 값은?",
      `${formatPolynomial(dividend)}\\equiv(${linearFactor(root)})(ax^2+bx+c)+r`,
      answer,
      [
        `a=${quotient[2]},\\quad b=${quotient[1]},\\quad c=${quotient[0]},\\quad r=${-remainder}`,
        `a=${quotient[2]},\\quad b=${-quotient[1]},\\quad c=${quotient[0]},\\quad r=${remainder}`,
        `a=${quotient[0]},\\quad b=${quotient[1]},\\quad c=${quotient[2]},\\quad r=${remainder}`,
      ],
    ));
  }

  {
    const root = nonzero(next, -3, 3);
    const polynomial = [
      nonzero(next, -6, 6),
      nonzero(next, -5, 5),
      nonzero(next, -4, 4),
      nonzero(next, -3, 3),
      nonzero(next, 1, 3),
    ];
    const answer = evaluate(polynomial, root);
    problems.push(item(
      seed,
      3,
      "remainder-theorem",
      "나머지정리",
      `${linearFactor(root)}로 나눈 나머지는?`,
      `f(x)=${formatPolynomial(polynomial)}`,
      `${answer}`,
      [`${-answer}`, `${evaluate(polynomial, -root)}`, `${polynomial[0]}`],
    ));
  }

  {
    const root = nonzero(next, -3, 3);
    const target = nonzero(next, -4, 4);
    const linear = nonzero(next, -6, 6);
    const constant = -(root ** 3 + target * root ** 2 + linear * root);
    problems.push(item(
      seed,
      4,
      "factor-theorem",
      "인수정리",
      `${linearFactor(root)}이 인수가 되도록 하는 k는?`,
      `f(x)=x^3+kx^2${signed(linear, "x")}${constant === 0 ? "" : signed(constant)}`,
      `k=${target}`,
      [`k=${-target}`, `k=${target + 1}`, `k=${target - 1}`],
    ));
  }

  {
    let left = nonzero(next, -4, 2);
    let right = nonzero(next, -2, 4);
    while (right === left) right = nonzero(next, -2, 4);
    const slope = nonzero(next, -5, 5);
    const intercept = nonzero(next, -7, 7);
    const leftValue = slope * left + intercept;
    const rightValue = slope * right + intercept;
    const divisor = multiply([-left, 1], [-right, 1]);
    const answer = formatPolynomial([intercept, slope]);
    problems.push(item(
      seed,
      5,
      "two-linear-remainders",
      "두 일차식 조건으로 나머지 결정",
      `${formatPolynomial(divisor)}로 나눈 나머지는?`,
      `f(${left})=${leftValue},\\quad f(${right})=${rightValue}`,
      answer,
      [
        formatPolynomial([-intercept, slope]),
        formatPolynomial([intercept, -slope]),
        formatPolynomial([slope, intercept]),
      ],
    ));
  }

  {
    const p = nonzero(next, -4, 4);
    const q = nonzero(next, 1, 5);
    const divisor = [q, p, 1];
    const quotient = [nonzero(next, -4, 4), nonzero(next, -3, 3), nonzero(next, 1, 3)];
    const remainder = [nonzero(next, -6, 6), nonzero(next, -5, 5)];
    const dividend = add(multiply(divisor, quotient), remainder);
    const answer = formatPolynomial(remainder);
    problems.push(item(
      seed,
      6,
      "quadratic-reduction",
      "이차식 관계로 고차식 낮추기",
      `${formatPolynomial(divisor)}로 나눈 나머지는?`,
      `f(x)=${formatPolynomial(dividend)}`,
      answer,
      [
        formatPolynomial([-remainder[0], remainder[1]]),
        formatPolynomial([remainder[0], -remainder[1]]),
        formatPolynomial([...remainder].reverse()),
      ],
    ));
  }

  {
    const root = nonzero(next, -3, 3);
    const quadratic = [integer(next, 2, 5), nonzero(next, -3, 3), 1];
    while (evaluate(quadratic, root) === 0) quadratic[0] += 1;
    const linearRemainder = [nonzero(next, -5, 5), nonzero(next, -4, 4)];
    const multiplier = nonzero(next, -3, 3);
    const combinedRemainder = add(linearRemainder, quadratic.map((value) => value * multiplier));
    const atRoot = evaluate(combinedRemainder, root);
    const answer = formatPolynomial(combinedRemainder);
    problems.push(item(
      seed,
      7,
      "combined-divisors",
      "각 나머지로 곱의 나머지 복원",
      `(${linearFactor(root)})(${formatPolynomial(quadratic)})로 나눈 나머지는?`,
      `f(x)\\equiv ${atRoot}\\pmod{${linearFactor(root)}},\\quad f(x)\\equiv ${formatPolynomial(linearRemainder)}\\pmod{${formatPolynomial(quadratic)}}`,
      answer,
      [
        formatPolynomial(linearRemainder),
        formatPolynomial(combinedRemainder.map((value, index) => index === 2 ? -value : value)),
        formatPolynomial(add(linearRemainder, quadratic.map((value) => -value * multiplier))),
      ],
    ));
  }

  return problems;
}

export const polynomialIdentityRemainderProblems =
  createPolynomialIdentityRemainderProblems(20260730);
