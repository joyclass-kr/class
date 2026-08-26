import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type MathematicalInductionKind =
  | "base-case"
  | "induction-hypothesis"
  | "add-next-term"
  | "complete-sum-step"
  | "divisibility-step"
  | "recurrence-step"
  | "odd-number-sum";

export type MathematicalInductionProblem = GeometryChoiceItem & {
  kind: MathematicalInductionKind;
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

function integer(next: () => number, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set([answer, ...distractors.filter((value) => value !== answer)])];
  return unique.slice(0, 4).map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  seed: number,
  index: number,
  kind: MathematicalInductionKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): MathematicalInductionProblem {
  const id = `mathematical-induction-${seed}-${index}`;
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

export function createMathematicalInductionProblems(seed: number) {
  const next = random(seed);
  const coefficient = integer(next, 2, 5);
  const base = integer(next, 2, 5);
  const difference = integer(next, 2, 6);

  return [
    item(
      seed,
      0,
      "base-case",
      "첫 단계 확인",
      "$P(1)$을 확인한 식은?",
      `${coefficient}+${2 * coefficient}+\\cdots+${coefficient}n=\\frac{${coefficient}n(n+1)}2`,
      `${coefficient}=\\frac{${coefficient}\\cdot1\\cdot2}{2}`,
      [
        `${coefficient}=\\frac{${coefficient}\\cdot2\\cdot3}{2}`,
        `2${coefficient}=\\frac{${coefficient}\\cdot1\\cdot2}{2}`,
        `${coefficient}=\\frac{1\\cdot2}{2}`,
      ],
    ),
    item(
      seed,
      1,
      "induction-hypothesis",
      "귀납 가정",
      "$P(k)$의 가정은?",
      `1+2+\\cdots+n=\\frac{n(n+1)}2`,
      `1+2+\\cdots+k=\\frac{k(k+1)}2`,
      [
        `1+2+\\cdots+k=\\frac{(k+1)(k+2)}2`,
        `1+2+\\cdots+n=\\frac{k(k+1)}2`,
        `1+2+\\cdots+(k+1)=\\frac{k(k+1)}2`,
      ],
    ),
    item(
      seed,
      2,
      "add-next-term",
      "다음 항 더하기",
      "$P(k+1)$의 좌변을 만든 식은?",
      `1+2+\\cdots+k+(k+1)`,
      `\\frac{k(k+1)}2+(k+1)`,
      [
        `\\frac{k(k+1)}2+k`,
        `\\frac{k(k+1)}2+1`,
        `\\frac{(k+1)(k+2)}2+(k+1)`,
      ],
    ),
    item(
      seed,
      3,
      "complete-sum-step",
      "귀납 단계 정리",
      "식을 정리한 결과는?",
      `\\frac{k(k+1)}2+(k+1)`,
      `\\frac{(k+1)(k+2)}2`,
      [
        `\\frac{k(k+2)}2`,
        `\\frac{k(k+1)}2`,
        `\\frac{(k+1)^2}2`,
      ],
    ),
    item(
      seed,
      4,
      "divisibility-step",
      "배수 성질의 귀납 단계",
      "$a^k-1$을 이용한 변형은?",
      `${base}^{k+1}-1`,
      `${base}(${base}^{k}-1)+(${base}-1)`,
      [
        `${base}(${base}^{k}-1)`,
        `(${base}-1)(${base}^{k}-1)`,
        `${base}(${base}^{k}+1)-(${base}-1)`,
      ],
    ),
    item(
      seed,
      5,
      "recurrence-step",
      "점화식의 귀납 단계",
      "$a_{k+1}$을 정리한 식은?",
      `a_1=A,\\quad a_{n+1}=a_n+${difference},\\quad a_k=A+(k-1)\\cdot${difference}`,
      `a_{k+1}=A+k\\cdot${difference}`,
      [
        `a_{k+1}=A+(k-1)\\cdot${difference}`,
        `a_{k+1}=A+(k+1)\\cdot${difference}`,
        `a_{k+1}=A+k+${difference}`,
      ],
    ),
    item(
      seed,
      6,
      "odd-number-sum",
      "홀수의 합 귀납 단계",
      "다음 등식의 빈칸은?",
      `1+3+\\cdots+(2k-1)+(2k+1)=k^2+(2k+1)=\\square`,
      `(k+1)^2`,
      [`k^2+1`, `(k+2)^2`, `2k^2+1`],
    ),
  ];
}

export const mathematicalInductionProblems =
  createMathematicalInductionProblems(20260830);
