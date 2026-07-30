import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type HighAdvancedFactorizationKind =
  | "common-factor-quadratic"
  | "cubic-grouping"
  | "biquadratic"
  | "nested-difference"
  | "quartic-special"
  | "sophie-germain"
  | "symmetric-cubic"
  | "cyclic-three-variable";

export type HighAdvancedFactorizationProblem = GeometryChoiceItem & {
  kind: HighAdvancedFactorizationKind;
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

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "x^2-1", "(x-1)(x+1)", "a+b+c"]) {
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
  kind: HighAdvancedFactorizationKind,
  label: string,
  latex: string,
  answer: string,
  distractors: string[],
): HighAdvancedFactorizationProblem {
  const id = `high-advanced-factorization-${seed}-${index}`;
  return {
    id,
    kind,
    label,
    prompt: "완전히 인수분해한 식은?",
    latex,
    correctLatex: answer,
    choices: choices(id, answer, distractors),
  };
}

export function createHighAdvancedFactorizationProblems(seed: number) {
  const next = random(seed);
  const problems: HighAdvancedFactorizationProblem[] = [];

  {
    const common = integer(next, 2, 5);
    const first = integer(next, 1, 4);
    const second = integer(next, first + 1, 6);
    const sum = first + second;
    const product = first * second;
    const answer = `${common}x(x-${first})(x-${second})`;
    problems.push(item(
      seed, 0, "common-factor-quadratic", "공통인수 뒤 이차식 인수분해",
      `${common}x^3-${common * sum}x^2+${common * product}x`,
      answer,
      [`${common}(x-${first})(x-${second})`, `${common}x(x+${first})(x+${second})`, `${common}x(x-${sum})(x-${product})`],
    ));
  }

  {
    const p = integer(next, 2, 5);
    const q = integer(next, 2, 6);
    const answer = `(x+${p})(x^2+${q})`;
    problems.push(item(
      seed, 1, "cubic-grouping", "네 항 묶어내기",
      `x^3+${p}x^2+${q}x+${p * q}`,
      answer,
      [`(x-${p})(x^2+${q})`, `(x+${p})(x^2-${q})`, `(x+${q})(x^2+${p})`],
    ));
  }

  {
    const first = integer(next, 1, 3);
    const second = integer(next, first + 1, 5);
    const firstSquare = first ** 2;
    const secondSquare = second ** 2;
    const answer = `(x-${first})(x+${first})(x-${second})(x+${second})`;
    problems.push(item(
      seed, 2, "biquadratic", "x²을 한 문자로 보는 사차식",
      `x^4-${firstSquare + secondSquare}x^2+${firstSquare * secondSquare}`,
      answer,
      [`(x^2+${firstSquare})(x^2+${secondSquare})`, `(x^2-${firstSquare})(x^2-${secondSquare})`, `(x-${first})(x-${second})`],
    ));
  }

  {
    const value = integer(next, 2, 5);
    const answer = `(x-${value})(x+${value})(x^2+${value ** 2})`;
    problems.push(item(
      seed, 3, "nested-difference", "제곱의 차를 두 번 적용",
      `x^4-${value ** 4}`,
      answer,
      [`(x^2-${value ** 2})^2`, `(x-${value})(x+${value})(x^2-${value ** 2})`, `(x-${value})^2(x+${value})^2`],
    ));
  }

  {
    const value = integer(next, 1, 4);
    const square = value ** 2;
    const fourth = value ** 4;
    const answer = `(x^2+${value}x+${square})(x^2-${value}x+${square})`;
    problems.push(item(
      seed, 4, "quartic-special", "가운데 항을 보충하는 사차식",
      `x^4+${square}x^2+${fourth}`,
      answer,
      [`(x^2+${square})^2`, `(x^2+${value}x-${square})(x^2-${value}x-${square})`, `(x^2+${value}x+${square})^2`],
    ));
  }

  {
    const value = integer(next, 1, 4);
    const answer = `(x^2-${2 * value}x+${2 * value ** 2})(x^2+${2 * value}x+${2 * value ** 2})`;
    problems.push(item(
      seed, 5, "sophie-germain", "소피 제르맹 항등식",
      `x^4+${4 * value ** 4}`,
      answer,
      [`(x^2-${2 * value ** 2})(x^2+${2 * value ** 2})`, `(x^2-${value}x+${2 * value ** 2})(x^2+${value}x+${2 * value ** 2})`, `(x^2+${2 * value ** 2})^2`],
    ));
  }

  problems.push(item(
    seed, 6, "symmetric-cubic", "a³+b³+c³−3abc",
    "a^3+b^3+c^3-3abc",
    "(a+b+c)(a^2+b^2+c^2-ab-bc-ca)",
    [
      "(a+b+c)(a^2+b^2+c^2+ab+bc+ca)",
      "(a-b-c)(a^2+b^2+c^2-ab-bc-ca)",
      "(a+b+c)(a^2+b^2+c^2-2ab-2bc-2ca)",
    ],
  ));

  problems.push(item(
    seed, 7, "cyclic-three-variable", "ab·bc·ca가 섞인 교대식",
    "a^2(b-c)+b^2(c-a)+c^2(a-b)",
    "(a-b)(a-c)(b-c)",
    [
      "(a-b)(b-c)(c-a)",
      "(a+b)(a+c)(b+c)",
      "(a-b)(a-c)(b+c)",
    ],
  ));

  return problems;
}

export const highAdvancedFactorizationProblems =
  createHighAdvancedFactorizationProblems(20260803);
