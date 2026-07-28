import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type CubicQuarticEquationKind =
  | "cubic-integer-roots"
  | "cubic-rational-root"
  | "cubic-repeated-root"
  | "quartic-factor-theorem"
  | "biquadratic"
  | "reciprocal-quartic"
  | "common-part-substitution";

export type CubicQuarticEquationProblem = GeometryChoiceItem & {
  kind: CubicQuarticEquationKind;
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

function nonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}

function distinctIntegers(next: () => number, count: number, minimum: number, maximum: number) {
  const values = new Set<number>();
  while (values.size < count) values.add(nonzero(next, minimum, maximum));
  return [...values].sort((left, right) => left - right);
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

function formatPolynomial(coefficients: number[]) {
  const terms: string[] = [];
  for (let power = coefficients.length - 1; power >= 0; power -= 1) {
    const value = coefficients[power] ?? 0;
    if (value === 0) continue;
    const magnitude = Math.abs(value);
    const variable = power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
    const coefficient = variable && magnitude === 1 ? "" : `${magnitude}`;
    const term = `${coefficient}${variable}`;
    if (terms.length === 0) terms.push(value < 0 ? `-${term}` : term);
    else terms.push(`${value < 0 ? "-" : "+"}${term}`);
  }
  return terms.join("") || "0";
}

function integerRootSet(roots: number[]) {
  return `x=${[...roots].sort((left, right) => left - right).join(",\\ ")}`;
}

function fraction(numerator: number, denominator: number) {
  const sign = numerator < 0 ? "-" : "";
  return `${sign}\\frac{${Math.abs(numerator)}}{${denominator}}`;
}

function radicalParts(radicand: number) {
  for (let outside = Math.floor(Math.sqrt(radicand)); outside >= 2; outside -= 1) {
    if (radicand % (outside ** 2) === 0) {
      return { outside, inside: radicand / (outside ** 2) };
    }
  }
  return { outside: 1, inside: radicand };
}

function radical(radicand: number) {
  const { outside, inside } = radicalParts(radicand);
  if (inside === 1) return `${outside}`;
  return `${outside === 1 ? "" : outside}\\sqrt{${inside}}`;
}

function shiftedRootPair(center: number, radicand: number) {
  const { outside, inside } = radicalParts(radicand);
  if (inside === 1) {
    return [center - outside, center + outside]
      .sort((left, right) => left - right)
      .join(",\\ ");
  }
  return `${center}\\pm${radical(radicand)}`;
}

function reciprocalRootPair(substitution: number) {
  const { outside, inside } = radicalParts(substitution ** 2 - 4);
  if (substitution % 2 === 0 && outside % 2 === 0) {
    const center = substitution / 2;
    const radicalCoefficient = outside / 2;
    const radicalTerm = inside === 1
      ? `${radicalCoefficient}`
      : `${radicalCoefficient === 1 ? "" : radicalCoefficient}\\sqrt{${inside}}`;
    return `${center}\\pm${radicalTerm}`;
  }
  const numeratorRadical = outside === 1
    ? `\\sqrt{${inside}}`
    : `${outside}\\sqrt{${inside}}`;
  return `\\frac{${substitution}\\pm${numeratorRadical}}{2}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  for (const fallback of ["x=0", "x=1", "x=-1", "해가 없다"]) {
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
  kind: CubicQuarticEquationKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): CubicQuarticEquationProblem {
  const id = `cubic-quartic-${seed}-${index}`;
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

export function createCubicQuarticEquationProblems(seed: number) {
  const next = random(seed);
  const problems: CubicQuarticEquationProblem[] = [];

  {
    const roots = distinctIntegers(next, 3, -5, 5);
    const polynomial = roots.reduce(
      (result, root) => multiply(result, [-root, 1]),
      [1],
    );
    const answer = integerRootSet(roots);
    problems.push(item(
      seed,
      0,
      "cubic-integer-roots",
      "삼차방정식 · 정수근과 인수분해",
      "모든 해는?",
      `${formatPolynomial(polynomial)}=0`,
      answer,
      [
        integerRootSet([-roots[0]!, roots[1]!, roots[2]!]),
        integerRootSet([roots[0]!, -roots[1]!, roots[2]!]),
        integerRootSet([roots[0]!, roots[1]!, -roots[2]!]),
      ],
    ));
  }

  {
    const denominator = pick(next, [2, 3] as const);
    let numerator = nonzero(next, -5, 5);
    while (Math.abs(numerator) === denominator || numerator % denominator === 0) {
      numerator = nonzero(next, -5, 5);
    }
    const integerRoots = distinctIntegers(next, 2, -4, 4);
    const polynomial = multiply(
      multiply([-integerRoots[0]!, 1], [-integerRoots[1]!, 1]),
      [-numerator, denominator],
    );
    const rationalRoot = fraction(numerator, denominator);
    const answer = `x=${integerRoots.join(",\\ ")},\\ ${rationalRoot}`;
    problems.push(item(
      seed,
      1,
      "cubic-rational-root",
      "삼차방정식 · 유리근과 인수정리",
      "모든 해는?",
      `${formatPolynomial(polynomial)}=0`,
      answer,
      [
        `x=${integerRoots.join(",\\ ")},\\ ${fraction(-numerator, denominator)}`,
        `x=${integerRoots.map((root) => -root).join(",\\ ")},\\ ${rationalRoot}`,
        integerRootSet(integerRoots),
      ],
    ));
  }

  {
    const [repeatedRoot, simpleRoot] = distinctIntegers(next, 2, -5, 5);
    const polynomial = multiply(
      multiply([-repeatedRoot!, 1], [-repeatedRoot!, 1]),
      [-simpleRoot!, 1],
    );
    const answer = integerRootSet([repeatedRoot!, simpleRoot!]);
    problems.push(item(
      seed,
      2,
      "cubic-repeated-root",
      "삼차방정식 · 중근",
      "서로 다른 모든 해는?",
      `${formatPolynomial(polynomial)}=0`,
      answer,
      [
        integerRootSet([-repeatedRoot!, simpleRoot!]),
        integerRootSet([repeatedRoot!, -simpleRoot!]),
        `x=${repeatedRoot}`,
      ],
    ));
  }

  {
    const integerRoots = distinctIntegers(next, 2, -4, 4);
    const linearCoefficient = pick(next, [-3, -1, 1, 3] as const);
    const discriminant = pick(next, [5, 13, 17] as const);
    const constant = (linearCoefficient ** 2 - discriminant) / 4;
    const quadratic = [constant, linearCoefficient, 1];
    const polynomial = multiply(
      multiply([-integerRoots[0]!, 1], [-integerRoots[1]!, 1]),
      quadratic,
    );
    const quadraticRoots = `\\frac{${-linearCoefficient}\\pm\\sqrt{${discriminant}}}{2}`;
    const answer = `x=${integerRoots.join(",\\ ")},\\ ${quadraticRoots}`;
    problems.push(item(
      seed,
      3,
      "quartic-factor-theorem",
      "사차방정식 · 인수정리와 조립제법",
      "모든 해는?",
      `${formatPolynomial(polynomial)}=0`,
      answer,
      [
        `x=${integerRoots.join(",\\ ")},\\ \\frac{${linearCoefficient}\\pm\\sqrt{${discriminant}}}{2}`,
        `x=${integerRoots.map((root) => -root).join(",\\ ")},\\ ${quadraticRoots}`,
        `x=${integerRoots.join(",\\ ")},\\ \\frac{${-linearCoefficient}\\pm\\sqrt{${discriminant + 4}}}{2}`,
      ],
    ));
  }

  {
    const radicands = [...new Set([
      pick(next, [2, 3, 5, 6, 7, 10] as const),
      pick(next, [2, 3, 5, 6, 7, 10] as const),
    ])];
    while (radicands.length < 2) {
      const candidate = pick(next, [2, 3, 5, 6, 7, 10] as const);
      if (!radicands.includes(candidate)) radicands.push(candidate);
    }
    radicands.sort((left, right) => left - right);
    const [left, right] = radicands as [number, number];
    const polynomial = [left * right, 0, -(left + right), 0, 1];
    const answer = `x=\\pm\\sqrt{${left}},\\ \\pm\\sqrt{${right}}`;
    problems.push(item(
      seed,
      4,
      "biquadratic",
      "사차방정식 · 복이차식",
      "모든 실수 해는?",
      `${formatPolynomial(polynomial)}=0`,
      answer,
      [
        `x=\\sqrt{${left}},\\ \\sqrt{${right}}`,
        `x=\\pm${left},\\ \\pm${right}`,
        `x=\\pm\\sqrt{${left + right}},\\ \\pm\\sqrt{${left * right}}`,
      ],
    ));
  }

  {
    const substitutions = distinctIntegers(next, 2, 3, 6);
    const [left, right] = substitutions;
    const sum = left! + right!;
    const product = left! * right!;
    const polynomial = [1, -sum, product + 2, -sum, 1];
    const leftRoots = reciprocalRootPair(left!);
    const rightRoots = reciprocalRootPair(right!);
    const answer = `x=${leftRoots},\\ ${rightRoots}`;
    problems.push(item(
      seed,
      5,
      "reciprocal-quartic",
      "사차방정식 · 상반방정식",
      "모든 실수 해는?",
      `${formatPolynomial(polynomial)}=0`,
      answer,
      [
        `x=\\frac{${left}\\pm\\sqrt{${left! ** 2 + 4}}}{2},\\ ${rightRoots}`,
        `x=${leftRoots}`,
        `x=${left},\\ ${right}`,
      ],
    ));
  }

  {
    const center = nonzero(next, -3, 3);
    const values = distinctIntegers(next, 2, 1, 6);
    const [left, right] = values;
    const commonPart = center > 0
      ? `x^2-${2 * center}x`
      : `x^2+${2 * Math.abs(center)}x`;
    const equation = `(${commonPart})^2-${left! + right!}(${commonPart})+${left! * right!}=0`;
    const leftRadicand = center ** 2 + left!;
    const rightRadicand = center ** 2 + right!;
    const leftRoots = shiftedRootPair(center, leftRadicand);
    const rightRoots = shiftedRootPair(center, rightRadicand);
    const answer = `x=${leftRoots},\\ ${rightRoots}`;
    problems.push(item(
      seed,
      6,
      "common-part-substitution",
      "사차방정식 · 공통부분 치환",
      "모든 실수 해는?",
      equation,
      answer,
      [
        `x=${shiftedRootPair(-center, leftRadicand)},\\ ${shiftedRootPair(-center, rightRadicand)}`,
        `x=${leftRoots}`,
        `x=${rightRoots}`,
      ],
    ));
  }

  return problems;
}

export const cubicQuarticEquationProblems =
  createCubicQuarticEquationProblems(20260825);
