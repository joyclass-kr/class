import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type FinancialSequenceKind =
  | "geometric-growth"
  | "geometric-decay"
  | "geometric-total"
  | "compound-future-value"
  | "compound-principal"
  | "compound-rate";

export type FinancialSequenceProblem = GeometryChoiceItem & {
  kind: FinancialSequenceKind;
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

function cleanNumber(value: number) {
  const rounded = Math.round(value * 1_000_000) / 1_000_000;
  return rounded.toFixed(6).replace(/\.?0+$/, "");
}

function money(value: number) {
  return `${cleanNumber(value)}\\text{만 원}`;
}

function amount(value: number) {
  return `${cleanNumber(value)}\\text{개}`;
}

function compound(principal: number, rate: number, years: number) {
  return principal * ((100 + rate) / 100) ** years;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "5\\%", "10\\%"]) {
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
  kind: FinancialSequenceKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): FinancialSequenceProblem {
  const id = `financial-sequence-${seed}-${index}`;
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

export function createFinancialSequenceProblems(seed: number) {
  const next = random(seed);
  const problems: FinancialSequenceProblem[] = [];

  {
    const first = integer(next, 2, 6);
    const ratio = pick(next, [2, 3] as const);
    const period = integer(next, 3, 5);
    const answer = first * ratio ** period;
    problems.push(item(
      seed,
      0,
      "geometric-growth",
      "등비적 증가",
      `${period}번 증가한 뒤의 양은?`,
      `a_0=${first},\\quad a_{n+1}=${ratio}a_n`,
      amount(answer),
      [amount(first * ratio ** (period - 1)), amount(first * ratio * period), amount(first + ratio * period)],
    ));
  }

  {
    const divisor = pick(next, [2, 3] as const);
    const period = integer(next, 2, 4);
    const answer = integer(next, 2, 8);
    const first = answer * divisor ** period;
    problems.push(item(
      seed,
      1,
      "geometric-decay",
      "등비적 감소",
      `${period}번 감소한 뒤의 양은?`,
      `a_0=${first},\\quad a_{n+1}=\\frac{1}{${divisor}}a_n`,
      amount(answer),
      [amount(answer * divisor), amount(first / divisor), amount(first - divisor * period)],
    ));
  }

  {
    const first = integer(next, 1, 5);
    const ratio = pick(next, [2, 3] as const);
    const count = integer(next, 4, 6);
    const answer = first * (ratio ** count - 1) / (ratio - 1);
    problems.push(item(
      seed,
      2,
      "geometric-total",
      "등비수열의 합 활용",
      `처음 ${count}번의 양을 모두 더한 값은?`,
      `a_1=${first},\\quad a_{n+1}=${ratio}a_n`,
      amount(answer),
      [
        amount(first * ratio ** (count - 1)),
        amount(first * (ratio ** (count - 1) - 1) / (ratio - 1)),
        amount(first * ratio * count),
      ],
    ));
  }

  const rates = [10, 20] as const;
  const principals = [50, 100, 150, 200, 300] as const;

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = integer(next, 2, 4);
    const answer = compound(principal, rate, years);
    problems.push(item(
      seed,
      3,
      "compound-future-value",
      "복리의 원리합계",
      `${years}년 후 원리합계는?`,
      `\\text{원금 }${principal}\\text{만 원},\\quad \\text{연이율 }${rate}\\%`,
      money(answer),
      [
        money(principal * (1 + (rate * years) / 100)),
        money(compound(principal, rate, years - 1)),
        money(compound(principal, rate, years + 1)),
      ],
    ));
  }

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = integer(next, 2, 4);
    const futureValue = compound(principal, rate, years);
    problems.push(item(
      seed,
      4,
      "compound-principal",
      "복리에서 원금",
      "처음 예금한 원금은?",
      `\\text{연이율 }${rate}\\%,\\quad ${years}\\text{년 후 }${money(futureValue)}`,
      money(principal),
      [
        money(futureValue),
        money(futureValue / ((100 + rate) / 100) ** (years - 1)),
        money(futureValue / (1 + (rate * years) / 100)),
      ],
    ));
  }

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = 2;
    const futureValue = compound(principal, rate, years);
    problems.push(item(
      seed,
      5,
      "compound-rate",
      "복리에서 이율",
      "연이율은?",
      `${principal}\\text{만 원}\\longrightarrow${money(futureValue)}\\quad(${years}\\text{년})`,
      `${rate}\\%`,
      [`${rate / 2}\\%`, `${rate + 5}\\%`, `${3 * rate}\\%`],
    ));
  }

  return problems;
}

export const financialSequenceProblems =
  createFinancialSequenceProblems(20260828);
