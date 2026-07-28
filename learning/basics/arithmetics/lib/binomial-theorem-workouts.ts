import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type BinomialTheoremKind =
  | "specific-coefficient"
  | "constant-term"
  | "coefficient-sum"
  | "alternating-sum"
  | "middle-term"
  | "numbered-term"
  | "binomial-coefficient-sum";

export type BinomialTheoremProblem = GeometryChoiceItem & {
  kind: BinomialTheoremKind;
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

function signedNonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}

function combination(n: number, r: number) {
  const count = Math.min(r, n - r);
  let result = 1;
  for (let index = 1; index <= count; index += 1) {
    result = (result * (n - count + index)) / index;
  }
  return result;
}

function variable(symbol: string, power = 1) {
  if (power === 0) return "";
  return power === 1 ? symbol : `${symbol}^${power}`;
}

function positiveTerm(coefficient: number, symbol: string, power = 1) {
  const variablePart = variable(symbol, power);
  if (!variablePart) return `${coefficient}`;
  return `${coefficient === 1 ? "" : coefficient}${variablePart}`;
}

function binomial(
  leftCoefficient: number,
  leftSymbol: string,
  rightCoefficient: number,
  rightSymbol: string,
) {
  const left = positiveTerm(leftCoefficient, leftSymbol);
  const right = positiveTerm(Math.abs(rightCoefficient), rightSymbol);
  return `(${left}${rightCoefficient < 0 ? "-" : "+"}${right})`;
}

function monomial(coefficient: number, powers: Array<[string, number]>) {
  const variables = powers
    .filter(([, power]) => power > 0)
    .map(([symbol, power]) => variable(symbol, power))
    .join("");
  const magnitude = Math.abs(coefficient);
  const coefficientText = variables && magnitude === 1 ? "" : `${magnitude}`;
  return `${coefficient < 0 ? "-" : ""}${coefficientText}${variables}`;
}

function choices(id: string, answer: string, distractors: Array<string | number>) {
  const candidates = distractors.map(String);
  const unique = [...new Set(candidates.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "-1", "2"]) {
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
  kind: BinomialTheoremKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string | number,
  distractors: Array<string | number>,
): BinomialTheoremProblem {
  const id = `binomial-theorem-${seed}-${index}`;
  const correctLatex = String(answer);
  return {
    id,
    kind,
    label,
    prompt,
    latex,
    correctLatex,
    choices: choices(id, correctLatex, distractors),
  };
}

export function createBinomialTheoremProblems(seed: number) {
  const next = random(seed);
  const problems: BinomialTheoremProblem[] = [];

  {
    const n = integer(next, 4, 7);
    const degree = integer(next, 1, n - 1);
    const constant = integer(next, 1, 2);
    const xCoefficient = signedNonzero(next, -2, 2);
    const answer =
      combination(n, degree) *
      constant ** (n - degree) *
      xCoefficient ** degree;
    const expression = `(${constant}${xCoefficient < 0 ? "-" : "+"}${positiveTerm(Math.abs(xCoefficient), "x")})^${n}`;
    problems.push(item(
      seed,
      0,
      "specific-coefficient",
      "특정 항의 계수",
      `$x^${degree}$의 계수는?`,
      expression,
      answer,
      [
        constant ** (n - degree) * xCoefficient ** degree,
        combination(n, degree) * constant ** degree * xCoefficient ** (n - degree),
        -answer,
      ],
    ));
  }

  {
    const [xPower, denominatorPower, n] = pick(next, [
      [1, 1, 6],
      [1, 1, 8],
      [2, 1, 6],
      [1, 2, 6],
    ] as const);
    const fractionCount = (xPower * n) / (xPower + denominatorPower);
    const leftCoefficient = integer(next, 1, 2);
    const numerator = integer(next, 1, 2);
    const answer =
      combination(n, fractionCount) *
      leftCoefficient ** (n - fractionCount) *
      numerator ** fractionCount;
    const left = positiveTerm(leftCoefficient, "x", xPower);
    const denominator = variable("x", denominatorPower);
    problems.push(item(
      seed,
      1,
      "constant-term",
      "상수항",
      "상수항은?",
      `\\left(${left}+\\frac{${numerator}}{${denominator}}\\right)^${n}`,
      answer,
      [
        combination(n, fractionCount),
        combination(n, fractionCount) * leftCoefficient ** fractionCount * numerator ** (n - fractionCount),
        answer / Math.max(1, numerator),
      ],
    ));
  }

  {
    const n = integer(next, 4, 6);
    const xCoefficient = integer(next, 1, 2);
    let constant = signedNonzero(next, -2, 2);
    while (xCoefficient + constant === 0) constant = signedNonzero(next, -2, 2);
    const answer = (xCoefficient + constant) ** n;
    const expression = `(${positiveTerm(xCoefficient, "x")}${constant < 0 ? "-" : "+"}${Math.abs(constant)})^${n}`;
    problems.push(item(
      seed,
      2,
      "coefficient-sum",
      "계수의 합",
      "각 항의 계수의 합은?",
      expression,
      answer,
      [
        (xCoefficient - constant) ** n,
        xCoefficient ** n + constant ** n,
        (xCoefficient + constant) * n,
      ],
    ));
  }

  {
    const n = integer(next, 4, 6);
    const xCoefficient = integer(next, 1, 2);
    let constant = signedNonzero(next, -2, 2);
    while (constant === xCoefficient) constant = signedNonzero(next, -2, 2);
    const answer = (constant - xCoefficient) ** n;
    const expression = `(${positiveTerm(xCoefficient, "x")}${constant < 0 ? "-" : "+"}${Math.abs(constant)})^${n}`;
    problems.push(item(
      seed,
      3,
      "alternating-sum",
      "계수의 교대합",
      "짝수 차수 항의 계수의 합에서 홀수 차수 항의 계수의 합을 뺀 값은?",
      expression,
      answer,
      [
        (xCoefficient + constant) ** n,
        -answer,
        Math.abs(constant - xCoefficient) ** (n - 1),
      ],
    ));
  }

  {
    const n = pick(next, [4, 6, 8] as const);
    const middlePower = n / 2;
    const leftCoefficient = integer(next, 1, 2);
    const rightCoefficient = signedNonzero(next, -2, 2);
    const coefficient =
      combination(n, middlePower) *
      leftCoefficient ** middlePower *
      rightCoefficient ** middlePower;
    const answer = monomial(coefficient, [["a", middlePower], ["b", middlePower]]);
    problems.push(item(
      seed,
      4,
      "middle-term",
      "가운데 항",
      "가운데 항은?",
      `${binomial(leftCoefficient, "a", rightCoefficient, "b")}^${n}`,
      answer,
      [
        monomial(combination(n - 1, middlePower) * leftCoefficient ** middlePower * rightCoefficient ** middlePower, [["a", middlePower], ["b", middlePower]]),
        monomial(-coefficient, [["a", middlePower], ["b", middlePower]]),
        monomial(coefficient, [["a", middlePower - 1], ["b", middlePower + 1]]),
      ],
    ));
  }

  {
    const n = integer(next, 5, 7);
    const termNumber = integer(next, 2, n);
    const rightCount = termNumber - 1;
    const leftCount = n - rightCount;
    const leftCoefficient = integer(next, 1, 2);
    const rightCoefficient = signedNonzero(next, -2, 2);
    const coefficient =
      combination(n, rightCount) *
      leftCoefficient ** leftCount *
      rightCoefficient ** rightCount;
    const answer = monomial(coefficient, [["x", leftCount], ["y", rightCount]]);
    problems.push(item(
      seed,
      5,
      "numbered-term",
      "전개식의 특정 순서 항",
      `${termNumber}번째 항은?`,
      `${binomial(leftCoefficient, "x", rightCoefficient, "y")}^${n}`,
      answer,
      [
        monomial(coefficient, [["x", rightCount], ["y", leftCount]]),
        monomial(-coefficient, [["x", leftCount], ["y", rightCount]]),
        monomial(
          leftCoefficient ** leftCount * rightCoefficient ** rightCount,
          [["x", leftCount], ["y", rightCount]],
        ),
      ],
    ));
  }

  {
    const n = integer(next, 6, 10);
    const answer = 2 ** n;
    problems.push(item(
      seed,
      6,
      "binomial-coefficient-sum",
      "이항계수의 합",
      "값은?",
      `\\sum_{k=0}^{${n}}\\binom{${n}}{k}`,
      answer,
      [2 ** (n - 1), 2 ** (n + 1), n * 2 ** (n - 1)],
    ));
  }

  return problems;
}

export const binomialTheoremProblems = createBinomialTheoremProblems(20260822);
