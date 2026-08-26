import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type SineCosineLawKind =
  | "sine-law-side"
  | "sine-law-angle"
  | "circumradius"
  | "cosine-law-side"
  | "cosine-law-angle"
  | "cosine-value"
  | "triangle-area";

export type SineCosineLawProblem = GeometryChoiceItem & {
  kind: SineCosineLawKind;
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

function radicalTerm(coefficient: number, radicand: number) {
  if (radicand === 1) return `${coefficient}`;
  return `${coefficient === 1 ? "" : coefficient}\\sqrt{${radicand}}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((value) => value !== answer))];
  const separator = answer.lastIndexOf("=");
  const prefix = separator >= 0 ? answer.slice(0, separator + 1) : "";
  for (const fallbackValue of ["1", "2", "3", "4", "5"]) {
    const fallback = `${prefix}${fallbackValue}`;
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
  kind: SineCosineLawKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): SineCosineLawProblem {
  const id = `sine-cosine-law-${seed}-${index}`;
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

type SineSideCase = {
  angleA: number;
  angleB: number;
  sideA: string;
  sideB: string;
  alternatives: string[];
};

const sineSideCases: SineSideCase[] = [
  { angleA: 30, angleB: 90, sideA: "3", sideB: "6", alternatives: ["3", "3\\sqrt2", "3\\sqrt3"] },
  { angleA: 30, angleB: 60, sideA: "4", sideB: "4\\sqrt3", alternatives: ["2\\sqrt3", "8", "4\\sqrt2"] },
  { angleA: 45, angleB: 90, sideA: "4", sideB: "4\\sqrt2", alternatives: ["2\\sqrt2", "8", "4"] },
  { angleA: 45, angleB: 30, sideA: "6", sideB: "3\\sqrt2", alternatives: ["3", "6\\sqrt2", "2\\sqrt3"] },
  { angleA: 60, angleB: 30, sideA: "6", sideB: "2\\sqrt3", alternatives: ["3\\sqrt2", "3", "6\\sqrt3"] },
  { angleA: 60, angleB: 90, sideA: "3\\sqrt3", sideB: "6", alternatives: ["3", "6\\sqrt3", "3\\sqrt2"] },
  { angleA: 30, angleB: 45, sideA: "4\\sqrt2", sideB: "8", alternatives: ["4", "8\\sqrt2", "2\\sqrt2"] },
  { angleA: 90, angleB: 45, sideA: "10", sideB: "5\\sqrt2", alternatives: ["5", "10\\sqrt2", "5\\sqrt3"] },
];

const sineAngleCases = [
  { angleA: 60, sideA: "2\\sqrt3", sideB: "2", angleB: 30 },
  { angleA: 45, sideA: "3\\sqrt2", sideB: "3", angleB: 30 },
  { angleA: 60, sideA: "2\\sqrt3", sideB: "2\\sqrt2", angleB: 45 },
  { angleA: 75, sideA: "\\sqrt6+\\sqrt2", sideB: "2", angleB: 30 },
  { angleA: 75, sideA: "\\sqrt6+\\sqrt2", sideB: "2\\sqrt2", angleB: 45 },
] as const;

const circumradiusCases = [
  { angle: 30, side: "4", radius: "4" },
  { angle: 30, side: "10", radius: "10" },
  { angle: 45, side: "4\\sqrt2", radius: "4" },
  { angle: 45, side: "6\\sqrt2", radius: "6" },
  { angle: 60, side: "4\\sqrt3", radius: "4" },
  { angle: 60, side: "6\\sqrt3", radius: "6" },
  { angle: 90, side: "8", radius: "4" },
  { angle: 90, side: "14", radius: "7" },
] as const;

const angleTriples = [
  { a: 3, b: 8, c: 7, angle: 60 },
  { a: 5, b: 8, c: 7, angle: 60 },
  { a: 7, b: 15, c: 13, angle: 60 },
  { a: 3, b: 4, c: 5, angle: 90 },
  { a: 5, b: 12, c: 13, angle: 90 },
  { a: 8, b: 15, c: 17, angle: 90 },
  { a: 3, b: 5, c: 7, angle: 120 },
  { a: 7, b: 8, c: 13, angle: 120 },
  { a: 5, b: 16, c: 19, angle: 120 },
] as const;

const integerTriangles = [
  [5, 5, 6],
  [4, 6, 7],
  [7, 8, 9],
  [5, 7, 8],
  [6, 8, 9],
  [7, 10, 12],
  [9, 10, 11],
] as const;

const areaCases = [
  { a: 6, b: 8, angle: 30, coefficient: 12, radicand: 1 },
  { a: 8, b: 10, angle: 30, coefficient: 20, radicand: 1 },
  { a: 4, b: 6, angle: 45, coefficient: 6, radicand: 2 },
  { a: 8, b: 12, angle: 45, coefficient: 24, radicand: 2 },
  { a: 4, b: 10, angle: 60, coefficient: 10, radicand: 3 },
  { a: 8, b: 14, angle: 60, coefficient: 28, radicand: 3 },
  { a: 5, b: 12, angle: 90, coefficient: 30, radicand: 1 },
  { a: 6, b: 10, angle: 120, coefficient: 15, radicand: 3 },
] as const;

export function createSineCosineLawProblems(seed: number) {
  const next = random(seed);
  const problems: SineCosineLawProblem[] = [];

  {
    const selected = pick(next, sineSideCases);
    const answer = `b=${selected.sideB}`;
    problems.push(item(
      seed,
      0,
      "sine-law-side",
      "사인법칙으로 변의 길이",
      "변 b의 길이는?",
      `A=${selected.angleA}^\\circ,\\quad B=${selected.angleB}^\\circ,\\quad a=${selected.sideA}`,
      answer,
      selected.alternatives.map((value) => `b=${value}`),
    ));
  }

  {
    const selected = pick(next, sineAngleCases);
    const answer = `B=${selected.angleB}^\\circ`;
    problems.push(item(
      seed,
      1,
      "sine-law-angle",
      "사인법칙으로 각의 크기",
      "각 B의 크기는?",
      `A=${selected.angleA}^\\circ,\\quad a=${selected.sideA},\\quad b=${selected.sideB}`,
      answer,
      [30, 45, 60, 90]
        .filter((angle) => angle !== selected.angleB)
        .map((angle) => `B=${angle}^\\circ`),
    ));
  }

  {
    const selected = pick(next, circumradiusCases);
    const answer = `R=${selected.radius}`;
    const radius = Number(selected.radius);
    problems.push(item(
      seed,
      2,
      "circumradius",
      "외접원의 반지름",
      "외접원의 반지름 R은?",
      `A=${selected.angle}^\\circ,\\quad a=${selected.side}`,
      answer,
      [`R=${radius * 2}`, `R=${Math.max(1, radius / 2)}`, `R=${radius + 2}`],
    ));
  }

  {
    const angle = pick(next, [60, 90, 120] as const);
    const a = 3 + Math.floor(next() * 6);
    const b = 3 + Math.floor(next() * 6);
    const cosineFactor = angle === 60 ? 1 : angle === 90 ? 0 : -1;
    const radicand = a * a + b * b - cosineFactor * a * b;
    const answer = `c=${squareRoot(radicand)}`;
    const candidateRadicands = [
      a * a + b * b,
      a * a + b * b - a * b,
      a * a + b * b + a * b,
      (a + b) * (a + b),
    ];
    problems.push(item(
      seed,
      3,
      "cosine-law-side",
      "코사인법칙으로 변의 길이",
      "변 c의 길이는?",
      `a=${a},\\quad b=${b},\\quad C=${angle}^\\circ`,
      answer,
      candidateRadicands.map((value) => `c=${squareRoot(value)}`),
    ));
  }

  {
    const selected = pick(next, angleTriples);
    const answer = `C=${selected.angle}^\\circ`;
    problems.push(item(
      seed,
      4,
      "cosine-law-angle",
      "코사인법칙으로 각의 크기",
      "각 C의 크기는?",
      `a=${selected.a},\\quad b=${selected.b},\\quad c=${selected.c}`,
      answer,
      [30, 45, 60, 90, 120]
        .filter((angle) => angle !== selected.angle)
        .map((angle) => `C=${angle}^\\circ`),
    ));
  }

  {
    const [a, b, c] = pick(next, integerTriangles);
    const numerator = a * a + b * b - c * c;
    const denominator = 2 * a * b;
    const answer = `\\cos C=${fraction(numerator, denominator)}`;
    problems.push(item(
      seed,
      5,
      "cosine-value",
      "코사인값 구하기",
      "cos C는?",
      `a=${a},\\quad b=${b},\\quad c=${c}`,
      answer,
      [
        `\\cos C=${fraction(a * a + b * b + c * c, denominator)}`,
        `\\cos C=${fraction(c * c - a * a - b * b, denominator)}`,
        `\\cos C=${fraction(numerator, a * b)}`,
      ],
    ));
  }

  {
    const selected = pick(next, areaCases);
    const answerValue = radicalTerm(selected.coefficient, selected.radicand);
    const otherRadicand = selected.radicand === 1 ? 3 : 1;
    problems.push(item(
      seed,
      6,
      "triangle-area",
      "두 변과 끼인각으로 넓이",
      "삼각형의 넓이 S는?",
      `a=${selected.a},\\quad b=${selected.b},\\quad C=${selected.angle}^\\circ`,
      `S=${answerValue}`,
      [
        `S=${radicalTerm(selected.coefficient * 2, selected.radicand)}`,
        `S=${radicalTerm(selected.coefficient, otherRadicand)}`,
        `S=${selected.a + selected.b}`,
      ],
    ));
  }

  return problems;
}

export const sineCosineLawProblems =
  createSineCosineLawProblems(20260827);
