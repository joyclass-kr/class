import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type PolynomialDivisionKind =
  | "exact-linear"
  | "linear-with-remainder"
  | "missing-term"
  | "synthetic-positive"
  | "synthetic-negative"
  | "quadratic-divisor"
  | "division-identity";

export type PolynomialDivisionProblem = GeometryChoiceItem & {
  kind: PolynomialDivisionKind;
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

function formatPolynomialWithUnknown(coefficients: number[], unknownPower: number) {
  const terms: string[] = [];
  for (let power = coefficients.length - 1; power >= 0; power -= 1) {
    if (power === unknownPower) {
      const variable = power === 0 ? "k" : power === 1 ? "kx" : `kx^${power}`;
      terms.push(`${terms.length === 0 ? "" : "+"}${variable}`);
      continue;
    }
    const value = coefficients[power] ?? 0;
    if (value === 0) continue;
    const magnitude = Math.abs(value);
    const variable = power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
    const number = variable && magnitude === 1 ? "" : `${magnitude}`;
    const term = `${number}${variable}`;
    if (terms.length === 0) terms.push(value < 0 ? `-${term}` : term);
    else terms.push(`${value < 0 ? "-" : "+"}${term}`);
  }
  return terms.join("") || "k";
}

function linearFactor(root: number) {
  return root > 0 ? `x-${root}` : `x+${Math.abs(root)}`;
}

function divisionAnswer(quotient: number[], remainder: number) {
  return `Q(x)=${formatPolynomial(quotient)},\\quad R=${remainder}`;
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
  kind: PolynomialDivisionKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): PolynomialDivisionProblem {
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

function linearDivisionProblem(
  next: () => number,
  seed: number,
  index: number,
  kind: PolynomialDivisionKind,
  label: string,
  root: number,
  remainder: number,
) {
  const quotient = [
    nonzero(next, -6, 6),
    nonzero(next, -5, 5),
    nonzero(next, 1, 4),
  ];
  const dividend = add(multiply([-root, 1], quotient), [remainder]);
  const answer = divisionAnswer(quotient, remainder);
  return item(
    seed,
    index,
    kind,
    label,
    "몫 Q(x)와 나머지 R은?",
    `(${formatPolynomial(dividend)})\\div(${linearFactor(root)})`,
    answer,
    [
      divisionAnswer(quotient, -remainder),
      divisionAnswer(quotient.map((value, coefficientIndex) => coefficientIndex === 0 ? -value : value), remainder),
      divisionAnswer([...quotient].reverse(), remainder),
    ],
  );
}

export function createPolynomialDivisionProblems(seed: number) {
  const next = random(seed);
  const problems: PolynomialDivisionProblem[] = [];

  problems.push(linearDivisionProblem(
    next,
    seed,
    0,
    "exact-linear",
    "일차식으로 나누어떨어지는 경우",
    nonzero(next, -4, 4),
    0,
  ));

  problems.push(linearDivisionProblem(
    next,
    seed,
    1,
    "linear-with-remainder",
    "일차식으로 나눈 몫과 나머지",
    nonzero(next, -4, 4),
    nonzero(next, -8, 8),
  ));

  {
    const root = nonzero(next, -4, 4);
    const quadratic = nonzero(next, 1, 4);
    const linear = nonzero(next, -4, 4);
    const quotient = [root * linear, linear, quadratic];
    const dividend = multiply([-root, 1], quotient);
    problems.push(item(
      seed,
      2,
      "missing-term",
      "빠진 차수에 0을 놓는 나눗셈",
      "몫은?",
      `(${formatPolynomial(dividend)})\\div(${linearFactor(root)})`,
      formatPolynomial(quotient),
      [
        formatPolynomial([linear, root * linear, quadratic]),
        formatPolynomial([root * linear, -linear, quadratic]),
        formatPolynomial([root * linear, linear, -quadratic]),
      ],
    ));
  }

  problems.push(linearDivisionProblem(
    next,
    seed,
    3,
    "synthetic-positive",
    "조립제법: x-a",
    integer(next, 1, 4),
    nonzero(next, -7, 7),
  ));

  problems.push(linearDivisionProblem(
    next,
    seed,
    4,
    "synthetic-negative",
    "조립제법: x+a",
    -integer(next, 1, 4),
    nonzero(next, -7, 7),
  ));

  {
    const divisor = [nonzero(next, -5, 5), nonzero(next, -4, 4), 1];
    const quotient = [nonzero(next, -4, 4), nonzero(next, 1, 3)];
    const remainder = [nonzero(next, -6, 6), nonzero(next, -5, 5)];
    const dividend = add(multiply(divisor, quotient), remainder);
    const answer = `Q(x)=${formatPolynomial(quotient)},\\quad R(x)=${formatPolynomial(remainder)}`;
    problems.push(item(
      seed,
      5,
      "quadratic-divisor",
      "이차식으로 나눈 몫과 나머지",
      "몫 Q(x)와 나머지 R(x)는?",
      `(${formatPolynomial(dividend)})\\div(${formatPolynomial(divisor)})`,
      answer,
      [
        `Q(x)=${formatPolynomial(quotient)},\\quad R(x)=${formatPolynomial([-remainder[0], remainder[1]])}`,
        `Q(x)=${formatPolynomial([-quotient[0], quotient[1]])},\\quad R(x)=${formatPolynomial(remainder)}`,
        `Q(x)=${formatPolynomial(quotient)},\\quad R(x)=${formatPolynomial([...remainder].reverse())}`,
      ],
    ));
  }

  {
    const root = nonzero(next, -4, 4);
    const quotient = [
      nonzero(next, -5, 5),
      nonzero(next, -4, 4),
      nonzero(next, 1, 3),
    ];
    const remainder = nonzero(next, -7, 7);
    const dividend = add(multiply([-root, 1], quotient), [remainder]);
    const nonzeroPowers = dividend
      .map((value, power) => ({ value, power }))
      .filter(({ value }) => value !== 0)
      .map(({ power }) => power);
    const hiddenPower = nonzeroPowers[integer(next, 0, nonzeroPowers.length - 1)];
    const hiddenCoefficient = dividend[hiddenPower];
    const expression = formatPolynomialWithUnknown(dividend, hiddenPower);
    problems.push(item(
      seed,
      6,
      "division-identity",
      "나눗셈식에서 미지계수 결정",
      "k의 값은?",
      `${expression}=(${linearFactor(root)})(${formatPolynomial(quotient)})${remainder > 0 ? "+" : ""}${remainder}`,
      `k=${hiddenCoefficient}`,
      [`k=${-hiddenCoefficient}`, `k=${hiddenCoefficient + 1}`, `k=${hiddenCoefficient - 1}`],
    ));
  }

  return problems;
}

export const polynomialDivisionProblems = createPolynomialDivisionProblems(20260826);
