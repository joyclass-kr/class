import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type TrigonometricAdditionKind =
  | "sine-special-angle"
  | "cosine-special-angle"
  | "tangent-special-angle"
  | "given-tangent-addition"
  | "sine-sum-to-product"
  | "cosine-sum-to-product"
  | "product-to-sum";

export type TrigonometricAdditionProblem = GeometryChoiceItem & {
  kind: TrigonometricAdditionKind;
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

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((value) => value !== answer))];
  for (const fallback of ["0", "1", "-1", String.raw`\frac12`, String.raw`-\frac12`]) {
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
  kind: TrigonometricAdditionKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): TrigonometricAdditionProblem {
  const id = `trigonometric-addition-${seed}-${index}`;
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

type ExactValue = {
  angle: number;
  answer: string;
};

const sineValues: ExactValue[] = [
  { angle: 15, answer: String.raw`\frac{\sqrt6-\sqrt2}{4}` },
  { angle: 75, answer: String.raw`\frac{\sqrt6+\sqrt2}{4}` },
  { angle: 105, answer: String.raw`\frac{\sqrt6+\sqrt2}{4}` },
  { angle: 165, answer: String.raw`\frac{\sqrt6-\sqrt2}{4}` },
  { angle: 195, answer: String.raw`-\frac{\sqrt6-\sqrt2}{4}` },
  { angle: 285, answer: String.raw`-\frac{\sqrt6+\sqrt2}{4}` },
];

const cosineValues: ExactValue[] = [
  { angle: 15, answer: String.raw`\frac{\sqrt6+\sqrt2}{4}` },
  { angle: 75, answer: String.raw`\frac{\sqrt6-\sqrt2}{4}` },
  { angle: 105, answer: String.raw`-\frac{\sqrt6-\sqrt2}{4}` },
  { angle: 165, answer: String.raw`-\frac{\sqrt6+\sqrt2}{4}` },
  { angle: 195, answer: String.raw`-\frac{\sqrt6+\sqrt2}{4}` },
  { angle: 285, answer: String.raw`\frac{\sqrt6-\sqrt2}{4}` },
];

const tangentValues: ExactValue[] = [
  { angle: 15, answer: String.raw`2-\sqrt3` },
  { angle: 75, answer: String.raw`2+\sqrt3` },
  { angle: 105, answer: String.raw`-(2+\sqrt3)` },
  { angle: 165, answer: String.raw`-(2-\sqrt3)` },
  { angle: 195, answer: String.raw`2-\sqrt3` },
  { angle: 285, answer: String.raw`-(2+\sqrt3)` },
];

const sineCosineDistractors = [
  String.raw`\frac{\sqrt6+\sqrt2}{4}`,
  String.raw`\frac{\sqrt6-\sqrt2}{4}`,
  String.raw`-\frac{\sqrt6+\sqrt2}{4}`,
  String.raw`-\frac{\sqrt6-\sqrt2}{4}`,
];

const tangentDistractors = [
  String.raw`2+\sqrt3`,
  String.raw`2-\sqrt3`,
  String.raw`-(2+\sqrt3)`,
  String.raw`-(2-\sqrt3)`,
];

const anglePairs = [
  [5, 1],
  [7, 3],
  [8, 2],
  [9, 5],
  [11, 3],
  [6, 4],
] as const;

const tangentPairs = [
  [1, 2, 1, 3],
  [1, 2, 2, 3],
  [1, 3, 3, 4],
  [2, 3, 1, 4],
  [3, 4, 1, 2],
] as const;

function term(functionName: "sin" | "cos", coefficient: number) {
  return `\\${functionName}${coefficient === 1 ? " x" : `${coefficient}x`}`;
}

export function createTrigonometricAdditionProblems(seed: number) {
  const next = random(seed);
  const problems: TrigonometricAdditionProblem[] = [];

  {
    const selected = pick(next, sineValues);
    problems.push(item(
      seed,
      0,
      "sine-special-angle",
      "사인 덧셈·뺄셈정리",
      "사인값은?",
      `\\sin${selected.angle}^\\circ`,
      selected.answer,
      sineCosineDistractors,
    ));
  }

  {
    const selected = pick(next, cosineValues);
    problems.push(item(
      seed,
      1,
      "cosine-special-angle",
      "코사인 덧셈·뺄셈정리",
      "코사인값은?",
      `\\cos${selected.angle}^\\circ`,
      selected.answer,
      sineCosineDistractors,
    ));
  }

  {
    const selected = pick(next, tangentValues);
    problems.push(item(
      seed,
      2,
      "tangent-special-angle",
      "탄젠트 덧셈·뺄셈정리",
      "탄젠트값은?",
      `\\tan${selected.angle}^\\circ`,
      selected.answer,
      tangentDistractors,
    ));
  }

  {
    const [aTop, aBottom, bTop, bBottom] = pick(next, tangentPairs);
    const subtract = next() < 0.5;
    const numerator = subtract
      ? aTop * bBottom - bTop * aBottom
      : aTop * bBottom + bTop * aBottom;
    const denominator = subtract
      ? aBottom * bBottom + aTop * bTop
      : aBottom * bBottom - aTop * bTop;
    const answer = fraction(numerator, denominator);
    const wrongSignNumerator = subtract
      ? aTop * bBottom + bTop * aBottom
      : aTop * bBottom - bTop * aBottom;
    const wrongSignDenominator = subtract
      ? aBottom * bBottom - aTop * bTop
      : aBottom * bBottom + aTop * bTop;
    problems.push(item(
      seed,
      3,
      "given-tangent-addition",
      "주어진 값으로 합·차 계산",
      `$\\tan(\\alpha${subtract ? "-" : "+"}\\beta)$의 값은?`,
      `\\tan\\alpha=${fraction(aTop, aBottom)},\\quad\\tan\\beta=${fraction(bTop, bBottom)},\\quad\\tan(\\alpha${subtract ? "-" : "+"}\\beta)`,
      answer,
      [
        fraction(wrongSignNumerator, denominator),
        fraction(numerator, wrongSignDenominator),
        fraction(wrongSignNumerator, wrongSignDenominator),
      ],
    ));
  }

  {
    const [left, right] = pick(next, anglePairs);
    const sum = (left + right) / 2;
    const difference = (left - right) / 2;
    const subtract = next() < 0.5;
    const answer = subtract
      ? `2${term("cos", sum)}${term("sin", difference)}`
      : `2${term("sin", sum)}${term("cos", difference)}`;
    problems.push(item(
      seed,
      4,
      "sine-sum-to-product",
      "사인의 합·차를 곱으로",
      "곱의 꼴로 나타낸 식은?",
      `${term("sin", left)}${subtract ? "-" : "+"}${term("sin", right)}`,
      answer,
      [
        subtract
          ? `2${term("sin", sum)}${term("cos", difference)}`
          : `2${term("cos", sum)}${term("sin", difference)}`,
        `-2${term("cos", sum)}${term("sin", difference)}`,
        `2${term("sin", difference)}${term("cos", sum)}`,
      ],
    ));
  }

  {
    const [left, right] = pick(next, anglePairs);
    const sum = (left + right) / 2;
    const difference = (left - right) / 2;
    const subtract = next() < 0.5;
    const answer = subtract
      ? `-2${term("sin", sum)}${term("sin", difference)}`
      : `2${term("cos", sum)}${term("cos", difference)}`;
    problems.push(item(
      seed,
      5,
      "cosine-sum-to-product",
      "코사인의 합·차를 곱으로",
      "곱의 꼴로 나타낸 식은?",
      `${term("cos", left)}${subtract ? "-" : "+"}${term("cos", right)}`,
      answer,
      [
        `2${term("sin", sum)}${term("sin", difference)}`,
        `2${term("cos", sum)}${term("cos", difference)}`,
        `-2${term("cos", sum)}${term("cos", difference)}`,
      ],
    ));
  }

  {
    const [left, right] = pick(next, anglePairs);
    const sum = left + right;
    const difference = left - right;
    const variant = Math.floor(next() * 4);
    const variants = [
      {
        latex: `2${term("sin", left)}${term("cos", right)}`,
        answer: `${term("sin", sum)}+${term("sin", difference)}`,
        distractors: [
          `${term("sin", sum)}-${term("sin", difference)}`,
          `${term("cos", difference)}-${term("cos", sum)}`,
          `${term("cos", sum)}+${term("cos", difference)}`,
        ],
      },
      {
        latex: `2${term("cos", left)}${term("sin", right)}`,
        answer: `${term("sin", sum)}-${term("sin", difference)}`,
        distractors: [
          `${term("sin", sum)}+${term("sin", difference)}`,
          `${term("cos", difference)}-${term("cos", sum)}`,
          `${term("cos", sum)}+${term("cos", difference)}`,
        ],
      },
      {
        latex: `2${term("cos", left)}${term("cos", right)}`,
        answer: `${term("cos", sum)}+${term("cos", difference)}`,
        distractors: [
          `${term("cos", sum)}-${term("cos", difference)}`,
          `${term("sin", sum)}+${term("sin", difference)}`,
          `${term("sin", sum)}-${term("sin", difference)}`,
        ],
      },
      {
        latex: `2${term("sin", left)}${term("sin", right)}`,
        answer: `${term("cos", difference)}-${term("cos", sum)}`,
        distractors: [
          `${term("cos", sum)}-${term("cos", difference)}`,
          `${term("sin", sum)}+${term("sin", difference)}`,
          `${term("cos", sum)}+${term("cos", difference)}`,
        ],
      },
    ] as const;
    const selected = variants[variant]!;
    problems.push(item(
      seed,
      6,
      "product-to-sum",
      "곱을 합·차로",
      "합 또는 차의 꼴로 나타낸 식은?",
      selected.latex,
      selected.answer,
      [...selected.distractors],
    ));
  }

  return problems;
}

export const trigonometricAdditionProblems =
  createTrigonometricAdditionProblems(20260829);
