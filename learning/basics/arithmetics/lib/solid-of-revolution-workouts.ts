import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type SolidOfRevolutionKind =
  | "linear-x-axis-disk"
  | "square-root-x-axis-disk"
  | "parabolic-arch-x-axis"
  | "constant-parabola-washer"
  | "power-region-y-axis-washer"
  | "symmetric-parabola-x-axis"
  | "between-curves-x-axis";

export type SolidOfRevolutionProblem = GeometryChoiceItem & {
  kind: SolidOfRevolutionKind;
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

function gcd(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function piTerm(numerator: number, denominator = 1) {
  const divisor = gcd(numerator, denominator);
  const top = numerator / divisor;
  const bottom = denominator / divisor;
  if (bottom === 1) return top === 1 ? "\\pi" : `${top}\\pi`;
  return top === 1
    ? `\\frac{\\pi}{${bottom}}`
    : `\\frac{${top}\\pi}{${bottom}}`;
}

function coefficientVariable(coefficient: number, variable: string) {
  return `${coefficient === 1 ? "" : coefficient}${variable}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((value) => value !== answer))];
  for (const fallback of ["\\pi", "2\\pi", "3\\pi", "4\\pi", "5\\pi"]) {
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
  kind: SolidOfRevolutionKind,
  label: string,
  latex: string,
  answer: string,
  distractors: string[],
): SolidOfRevolutionProblem {
  const id = `solid-of-revolution-${seed}-${index}`;
  return {
    id,
    kind,
    label,
    prompt: "회전체의 부피 V는?",
    latex,
    correctLatex: answer,
    choices: choices(id, answer, distractors),
  };
}

export function createSolidOfRevolutionProblems(seed: number) {
  const next = random(seed);
  const problems: SolidOfRevolutionProblem[] = [];

  {
    const slope = integer(next, 2, 5);
    const bound = integer(next, 2, 5);
    const numerator = slope ** 2 * bound ** 3;
    problems.push(item(
      seed,
      0,
      "linear-x-axis-disk",
      "직선의 x축 회전·원판법",
      `y=${slope}x,\\quad 0\\le x\\le${bound},\\quad x\\text{축 둘레로 회전}`,
      piTerm(numerator, 3),
      [
        piTerm(slope * bound ** 3, 3),
        piTerm(slope ** 2 * bound ** 2, 3),
        piTerm(numerator, 2),
      ],
    ));
  }

  {
    const coefficient = integer(next, 2, 5);
    const bound = integer(next, 2, 6);
    const numerator = coefficient * bound ** 2;
    problems.push(item(
      seed,
      1,
      "square-root-x-axis-disk",
      "제곱근함수의 x축 회전",
      `y=\\sqrt{${coefficient}x},\\quad 0\\le x\\le${bound},\\quad x\\text{축 둘레로 회전}`,
      piTerm(numerator, 2),
      [
        piTerm(numerator),
        piTerm(coefficient * bound, 2),
        piTerm(bound ** 2, 2),
      ],
    ));
  }

  {
    const coefficient = integer(next, 2, 4);
    const bound = integer(next, 2, 4);
    const numerator = coefficient ** 2 * bound ** 5;
    problems.push(item(
      seed,
      2,
      "parabolic-arch-x-axis",
      "포물선 영역의 x축 회전",
      `y=${coefficient}x(${bound}-x),\\quad 0\\le x\\le${bound},\\quad x\\text{축 둘레로 회전}`,
      piTerm(numerator, 30),
      [
        piTerm(coefficient * bound ** 5, 30),
        piTerm(numerator, 15),
        piTerm(coefficient ** 2 * bound ** 4, 30),
      ],
    ));
  }

  {
    const coefficient = integer(next, 2, 4);
    const radius = integer(next, 2, 4);
    const height = coefficient * radius ** 2;
    const numerator = 8 * coefficient ** 2 * radius ** 5;
    problems.push(item(
      seed,
      3,
      "constant-parabola-washer",
      "두 곡선 사이의 x축 회전·와셔법",
      `y=${height},\\quad y=${coefficient}x^2,\\quad -${radius}\\le x\\le${radius},\\quad x\\text{축 둘레로 회전}`,
      piTerm(numerator, 5),
      [
        piTerm(4 * coefficient ** 2 * radius ** 5, 5),
        piTerm(8 * coefficient * radius ** 5, 5),
        piTerm(8 * coefficient ** 2 * radius ** 4, 5),
      ],
    ));
  }

  {
    const power = integer(next, 1, 2);
    const bound = integer(next, 2, 5);
    const numerator = 2 * bound ** (power + 2);
    const exponent = power === 1 ? "" : "^2";
    problems.push(item(
      seed,
      4,
      "power-region-y-axis-washer",
      "거듭제곱함수 영역의 y축 회전",
      `0\\le y\\le x${exponent},\\quad 0\\le x\\le${bound},\\quad y\\text{축 둘레로 회전}`,
      piTerm(numerator, power + 2),
      [
        piTerm(bound ** (power + 2), power + 2),
        piTerm(2 * bound ** (power + 1), power + 2),
        piTerm(bound ** (power + 2), 2),
      ],
    ));
  }

  {
    const coefficient = integer(next, 2, 4);
    const radius = integer(next, 2, 4);
    const height = coefficient * radius ** 2;
    const numerator = 16 * coefficient ** 2 * radius ** 5;
    problems.push(item(
      seed,
      5,
      "symmetric-parabola-x-axis",
      "대칭인 포물선 영역의 x축 회전",
      `y=${height}-${coefficientVariable(coefficient, "x^2")},\\quad -${radius}\\le x\\le${radius},\\quad x\\text{축 둘레로 회전}`,
      piTerm(numerator, 15),
      [
        piTerm(8 * coefficient ** 2 * radius ** 5, 15),
        piTerm(16 * coefficient * radius ** 5, 15),
        piTerm(16 * coefficient ** 2 * radius ** 4, 15),
      ],
    ));
  }

  {
    const coefficient = integer(next, 2, 4);
    const intersection = integer(next, 2, 4);
    const lineCoefficient = coefficient * intersection;
    const numerator = 2 * coefficient ** 2 * intersection ** 5;
    problems.push(item(
      seed,
      6,
      "between-curves-x-axis",
      "직선과 포물선 사이의 x축 회전",
      `y=${lineCoefficient}x,\\quad y=${coefficientVariable(coefficient, "x^2")},\\quad 0\\le x\\le${intersection},\\quad x\\text{축 둘레로 회전}`,
      piTerm(numerator, 15),
      [
        piTerm(coefficient ** 2 * intersection ** 5, 15),
        piTerm(2 * coefficient * intersection ** 5, 15),
        piTerm(2 * coefficient ** 2 * intersection ** 4, 15),
      ],
    ));
  }

  return problems;
}

export const solidOfRevolutionProblems =
  createSolidOfRevolutionProblems(20260831);
