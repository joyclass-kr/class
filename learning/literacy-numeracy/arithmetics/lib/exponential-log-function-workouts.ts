import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type ExponentialLogFunctionKind =
  | "exponential-value"
  | "exponential-shifted-value"
  | "exponential-base"
  | "logarithmic-value"
  | "logarithmic-shifted-value"
  | "inverse-function-value"
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
  if (unique.length < 4) throw new Error(`${id}: 실제 오답 후보가 3개보다 적습니다.`);
  return unique.map((latex, index) => ({ id: `${id}-${index}`, latex, correct: index === 0 }));
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
  return { id, kind, label, prompt, latex, correctLatex: answer, choices: choices(id, answer, distractors) };
}

export function createExponentialLogFunctionProblems(seed: number) {
  const next = random(seed);
  const problems: ExponentialLogFunctionProblem[] = [];

  {
    const base = pick(next, [2, 3, 4, 5] as const);
    const exponent = integer(next, 2, 4);
    const answer = base ** exponent;
    problems.push(item(seed, 0, "exponential-value", "지수함숫값 계산", "함숫값은?",
      `f(x)=${base}^x,\\quad f(${exponent})=?`, `f(${exponent})=${answer}`,
      [`f(${exponent})=${base * exponent}`, `f(${exponent})=${base ** (exponent - 1)}`, `f(${exponent})=${answer + base}`, `f(${exponent})=${answer - base}`, `f(${exponent})=${answer + 1}`, `f(${exponent})=${answer + 2}`, `f(${exponent})=${answer + 3}`]));
  }

  {
    const base = pick(next, [2, 3, 4] as const);
    const shift = integer(next, -3, 3);
    const vertical = integer(next, -4, 4);
    const exponent = integer(next, 2, 3);
    const input = shift + exponent;
    const answer = base ** exponent + vertical;
    problems.push(item(seed, 1, "exponential-shifted-value", "평행이동한 지수함숫값", "주어진 $x$에서 $y$는?",
      `y=${base}^{${shiftedVariable(shift)}}${signed(vertical)},\\quad x=${input}`, `y=${answer}`,
      [`y=${base ** input + vertical}`, `y=${base * exponent + vertical}`, `y=${base ** exponent - vertical}`, `y=${answer + base}`, `y=${answer - base}`, `y=${answer + 1}`, `y=${answer + 2}`, `y=${answer + 3}`]));
  }

  {
    const base = pick(next, [2, 3, 4, 5] as const);
    const exponent = pick(next, [2, 3] as const);
    const value = base ** exponent;
    problems.push(item(seed, 2, "exponential-base", "지수함수의 밑 계산", "밑 $a$의 값은?",
      `y=a^x,\\quad a>1,\\quad (${exponent},${value})`, `a=${base}`,
      [`a=${base + 1}`, `a=${Math.max(1, base - 1)}`, `a=${base * exponent}`, `a=${value}`]));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const exponent = integer(next, 2, 5);
    const value = base ** exponent;
    problems.push(item(seed, 3, "logarithmic-value", "로그값 계산", "로그의 값은?",
      `\\log_{${base}}${value}=?`, `${exponent}`,
      [`${exponent + 1}`, `${exponent - 1}`, `${base * exponent}`, `${value}`, `${base + exponent}`]));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const shift = integer(next, -4, 4);
    const vertical = integer(next, -3, 3);
    const exponent = integer(next, 2, 4);
    const input = shift + base ** exponent;
    const answer = exponent + vertical;
    problems.push(item(seed, 4, "logarithmic-shifted-value", "평행이동한 로그함숫값", "주어진 $x$에서 $y$는?",
      `y=\\log_{${base}}(${shiftedVariable(shift)})${signed(vertical)},\\quad x=${input}`, `y=${answer}`,
      [`y=${exponent - vertical}`, `y=${base + vertical}`, `y=${exponent + shift}`, `y=${answer + 1}`, `y=${answer - 1}`, `y=${answer + 2}`, `y=${answer + 3}`]));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const exponent = integer(next, 2, 5);
    const value = base ** exponent;
    problems.push(item(seed, 5, "inverse-function-value", "역함숫값 계산", "역함숫값은?",
      `f(x)=${base}^x,\\quad f^{-1}(${value})=?`, `${exponent}`,
      [`${base}`, `${value}`, `${exponent + 1}`, `${exponent - 1}`, `${base * exponent}`]));
  }

  {
    const initial = integer(next, 2, 8);
    const ratio = pick(next, [2, 3] as const);
    const time = integer(next, 3, 5);
    const answer = initial * ratio ** time;
    problems.push(item(seed, 6, "exponential-model", "지수적 증가 계산", `${time}시간 뒤의 양은?`,
      `N(t)=${initial}\\cdot${ratio}^{t}`, `N(${time})=${answer}`,
      [`N(${time})=${initial * ratio * time}`, `N(${time})=${initial + ratio ** time}`, `N(${time})=${initial * ratio ** (time - 1)}`, `N(${time})=${initial * ratio ** (time + 1)}`]));
  }

  {
    const base = pick(next, [2, 3, 5] as const);
    const exponent = integer(next, 2, 5);
    const value = base ** exponent;
    problems.push(item(seed, 7, "logarithmic-model", "지수 방정식의 지수 계산", "조건을 만족하는 $t$는?",
      `${base}^{t}=${value}`, `t=${exponent}`,
      [`t=${exponent + 1}`, `t=${exponent - 1}`, `t=${2 * exponent}`, `t=${base}`]));
  }

  return problems;
}

export const exponentialLogFunctionProblems = createExponentialLogFunctionProblems(20260829);
