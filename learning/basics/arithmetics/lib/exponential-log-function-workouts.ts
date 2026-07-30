import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type ExponentialLogFunctionKind =
  | "exponential-monotonicity"
  | "exponential-asymptote"
  | "exponential-base"
  | "logarithmic-domain"
  | "logarithmic-asymptote"
  | "inverse-functions"
  | "exponential-model"
  | "logarithmic-model";

export type ExponentialLogFunctionProblem = GeometryChoiceItem & {
  kind: ExponentialLogFunctionKind;
};

type Next = () => number;

function random(seed: number): Next {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function integer(next: Next, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

function pick<T>(next: Next, values: readonly T[]) {
  return values[Math.floor(next() * values.length)]!;
}

function signed(value: number) {
  if (value === 0) return "";
  return value < 0 ? `${value}` : `+${value}`;
}

function shiftedVariable(shift: number) {
  if (shift === 0) return "x";
  return shift > 0 ? `x-${shift}` : `x+${Math.abs(shift)}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const values = [answer, ...distractors.filter((value) => value !== answer)];
  const unique = [...new Set(values)].slice(0, 4);
  for (let offset = 1; unique.length < 4; offset += 1) {
    unique.push(`\\text{해 없음 ${offset}}`);
  }
  return unique.map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  seed: number,
  index: number,
  kind: ExponentialLogFunctionKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): ExponentialLogFunctionProblem {
  const id = `exponential-log-function-${seed}-${index}`;
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

export function createExponentialLogFunctionProblems(seed: number) {
  const next = random(seed);
  const problems: ExponentialLogFunctionProblem[] = [];

  {
    const increasing = next() >= 0.5;
    const base = pick(next, [2, 3, 4] as const);
    const expression = increasing ? `${base}` : `\\frac1${base}`;
    const answer = increasing ? "\\text{증가함수}" : "\\text{감소함수}";
    problems.push(item(
      seed,
      0,
      "exponential-monotonicity",
      "지수함수의 증가·감소",
      "그래프의 증가·감소는?",
      `y=\\left(${expression}\\right)^x`,
      answer,
      [
        increasing ? "\\text{감소함수}" : "\\text{증가함수}",
        "\\text{상수함수}",
        "\\text{일대일함수가 아님}",
      ],
    ));
  }

  {
    const base = pick(next, [2, 3, 4] as const);
    const shift = integer(next, -3, 3);
    let vertical = integer(next, -4, 4);
    if (vertical === shift) vertical = vertical === 4 ? -4 : vertical + 1;
    problems.push(item(
      seed,
      1,
      "exponential-asymptote",
      "지수함수의 평행이동",
      "점근선의 방정식은?",
      `y=${base}^{${shiftedVariable(shift)}}${signed(vertical)}`,
      `y=${vertical}`,
      [`x=${shift}`, `y=${shift}`, `x=${vertical}`],
    ));
  }

  {
    const base = pick(next, [2, 3, 4] as const);
    const x = pick(next, [2, 3] as const);
    const y = base ** x;
    problems.push(item(
      seed,
      2,
      "exponential-base",
      "그래프 위의 점",
      "밑 $a$의 값은?",
      `y=a^x,\\quad a>1,\\quad (${x},${y})`,
      `a=${base}`,
      [`a=${base + 1}`, `a=${base - 1}`, `a=${base * x}`],
    ));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const shift = integer(next, -4, 4);
    const boundary = shift;
    problems.push(item(
      seed,
      3,
      "logarithmic-domain",
      "로그함수의 정의역",
      "정의역은?",
      `y=\\log_{${base}}(${shiftedVariable(shift)})`,
      `x>${boundary}`,
      [`x\\ge${boundary}`, `x<${boundary}`, `x\\le${boundary}`],
    ));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const shift = integer(next, -4, 4);
    let vertical = integer(next, -3, 3);
    if (vertical === shift) vertical = vertical === 3 ? -3 : vertical + 1;
    problems.push(item(
      seed,
      4,
      "logarithmic-asymptote",
      "로그함수의 평행이동",
      "점근선의 방정식은?",
      `y=\\log_{${base}}(${shiftedVariable(shift)})${signed(vertical)}`,
      `x=${shift}`,
      [`y=${shift}`, `x=${vertical}`, `y=${vertical}`],
    ));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    problems.push(item(
      seed,
      5,
      "inverse-functions",
      "지수함수와 로그함수의 관계",
      "역함수는?",
      `f(x)=${base}^x`,
      `f^{-1}(x)=\\log_{${base}}x`,
      [
        `f^{-1}(x)=-\\log_{${base}}x`,
        `f^{-1}(x)=\\frac1{${base}^x}`,
        `f^{-1}(x)=x^{${base}}`,
      ],
    ));
  }

  {
    const initial = integer(next, 2, 8);
    const ratio = pick(next, [2, 3] as const);
    const time = integer(next, 3, 5);
    const answer = initial * ratio ** time;
    problems.push(item(
      seed,
      6,
      "exponential-model",
      "지수적 증가 모델",
      `${time}시간 뒤의 양은?`,
      `N(t)=${initial}\\cdot${ratio}^{t}`,
      `N(${time})=${answer}`,
      [
        `N(${time})=${initial * ratio * time}`,
        `N(${time})=${initial + ratio ** time}`,
        `N(${time})=${initial * ratio ** (time - 1)}`,
      ],
    ));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const exponent = integer(next, 2, 5);
    const value = base ** exponent;
    problems.push(item(
      seed,
      7,
      "logarithmic-model",
      "로그를 이용한 지수 구하기",
      "조건을 만족하는 $t$는?",
      `${base}^{t}=${value}`,
      `t=${exponent}`,
      [`t=${exponent + 1}`, `t=${exponent - 1}`, `t=${2 * exponent}`],
    ));
  }

  return problems;
}

export const exponentialLogFunctionProblems =
  createExponentialLogFunctionProblems(20260829);
