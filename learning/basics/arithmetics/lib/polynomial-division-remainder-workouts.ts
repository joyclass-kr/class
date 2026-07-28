import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type PolynomialDivisionRemainderKind =
  | "multiply"
  | "exact-division"
  | "quotient-remainder"
  | "remainder-theorem"
  | "factor-theorem"
  | "quadratic-divisor"
  | "determine-remainder";

export type PolynomialDivisionRemainderProblem = GeometryChoiceItem & {
  kind: PolynomialDivisionRemainderKind;
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
    for (let j = 0; j < right.length; j += 1) {
      result[i + j] += left[i] * right[j];
    }
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
  kind: PolynomialDivisionRemainderKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): PolynomialDivisionRemainderProblem {
  const id = `polynomial-division-${seed}-${index}`;
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

export function createPolynomialDivisionRemainderProblems(seed: number) {
  const next = random(seed);
  const problems: PolynomialDivisionRemainderProblem[] = [];

  {
    const quadratic = [
      nonzero(next, -6, 6),
      nonzero(next, -5, 5),
      nonzero(next, 1, 4),
    ];
    const linear = [nonzero(next, -5, 5), nonzero(next, 1, 4)];
    const product = multiply(quadratic, linear);
    const wrongMiddle = [...product];
    wrongMiddle[1] *= -1;
    problems.push(item(seed, 0, "multiply", "다항식의 곱셈", "전개한 식은?",
      `(${formatPolynomial(quadratic)})(${formatPolynomial(linear)})`,
      formatPolynomial(product),
      [
        formatPolynomial(wrongMiddle),
        formatPolynomial(product.map((value, index) => index === 0 ? -value : value)),
        formatPolynomial(product.map((value, index) => index === product.length - 1 ? -value : value)),
      ]));
  }

  {
    const root = nonzero(next, -4, 4);
    const quotient = [
      nonzero(next, -6, 6),
      nonzero(next, -5, 5),
      nonzero(next, 1, 4),
    ];
    const dividend = multiply([-root, 1], quotient);
    const wrongConstant = [...quotient];
    wrongConstant[0] *= -1;
    problems.push(item(seed, 1, "exact-division", "다항식의 나눗셈", "몫은?",
      `(${formatPolynomial(dividend)})\\div(${linearFactor(root)})`,
      formatPolynomial(quotient),
      [
        formatPolynomial(wrongConstant),
        formatPolynomial(quotient.map((value, index) => index === 1 ? -value : value)),
        formatPolynomial([...quotient].reverse()),
      ]));
  }

  {
    const root = nonzero(next, -4, 4);
    const quotient = [
      nonzero(next, -5, 5),
      nonzero(next, -4, 4),
      nonzero(next, 1, 3),
    ];
    const remainder = nonzero(next, -8, 8);
    const dividend = add(multiply([-root, 1], quotient), [remainder]);
    const answer = `Q(x)=${formatPolynomial(quotient)},\\quad R=${remainder}`;
    problems.push(item(seed, 2, "quotient-remainder", "몫과 나머지", "몫 Q(x)와 나머지 R은?",
      `${formatPolynomial(dividend)}=(${linearFactor(root)})Q(x)+R`,
      answer,
      [
        `Q(x)=${formatPolynomial(quotient)},\\quad R=${-remainder}`,
        `Q(x)=${formatPolynomial(quotient.map((value, index) => index === 0 ? -value : value))},\\quad R=${remainder}`,
        `Q(x)=${formatPolynomial([...quotient, remainder])},\\quad R=0`,
      ]));
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
    problems.push(item(seed, 3, "remainder-theorem", "나머지정리",
      `${linearFactor(root)}로 나눈 나머지는?`,
      `f(x)=${formatPolynomial(polynomial)}`,
      `${answer}`,
      [`${-answer}`, `${evaluate(polynomial, -root)}`, `${polynomial[0]}`]));
  }

  {
    const root = nonzero(next, -3, 3);
    const targetK = nonzero(next, -4, 4);
    const linearCoefficient = nonzero(next, -6, 6);
    const constant = -(root ** 3 + targetK * root ** 2 + linearCoefficient * root);
    const linearText = `${linearCoefficient > 0 ? "+" : "-"}${Math.abs(linearCoefficient) === 1 ? "x" : `${Math.abs(linearCoefficient)}x`}`;
    const constantText = constant === 0 ? "" : `${constant > 0 ? "+" : "-"}${Math.abs(constant)}`;
    const polynomialText = `x^3+kx^2${linearText}${constantText}`;
    problems.push(item(seed, 4, "factor-theorem", "인수정리",
      `${linearFactor(root)}가 인수가 되도록 하는 k는?`,
      `f(x)=${polynomialText}`,
      `k=${targetK}`,
      [`k=${-targetK}`, `k=${targetK + 1}`, `k=${targetK - 1}`]));
  }

  {
    const divisor = [
      nonzero(next, -5, 5),
      nonzero(next, -4, 4),
      1,
    ];
    const quotient = [
      nonzero(next, -4, 4),
      nonzero(next, -3, 3),
      nonzero(next, 1, 3),
    ];
    const remainder = [nonzero(next, -6, 6), nonzero(next, -5, 5)];
    const dividend = add(multiply(divisor, quotient), remainder);
    const answer = formatPolynomial(remainder);
    problems.push(item(seed, 5, "quadratic-divisor", "이차식으로 나눈 나머지",
      `${formatPolynomial(divisor)}로 나눈 나머지는?`,
      formatPolynomial(dividend),
      answer,
      [
        formatPolynomial([-remainder[0], remainder[1]]),
        formatPolynomial([remainder[0], -remainder[1]]),
        formatPolynomial([...remainder].reverse()),
      ]));
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
    problems.push(item(seed, 6, "determine-remainder", "나머지의 결정",
      `${formatPolynomial(divisor)}로 나눈 나머지는?`,
      `f(${left})=${leftValue},\\quad f(${right})=${rightValue}`,
      answer,
      [
        formatPolynomial([-intercept, slope]),
        formatPolynomial([intercept, -slope]),
        formatPolynomial([slope, intercept]),
      ]));
  }

  return problems;
}

export const polynomialDivisionRemainderProblems =
  createPolynomialDivisionRemainderProblems(20260826);
