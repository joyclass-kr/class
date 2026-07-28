import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type FinancialSequenceKind =
  | "simple-future-value"
  | "compound-future-value"
  | "compound-principal"
  | "compound-rate"
  | "ordinary-annuity"
  | "annuity-due"
  | "simple-compound-difference";

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

function compound(principal: number, rate: number, years: number) {
  return principal * ((100 + rate) / 100) ** years;
}

function simple(principal: number, rate: number, years: number) {
  return principal * (1 + (rate * years) / 100);
}

function ordinaryAnnuity(payment: number, rate: number, years: number) {
  const factor = (100 + rate) / 100;
  return payment * Array.from({ length: years }, (_, index) => factor ** index)
    .reduce((sum, value) => sum + value, 0);
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  for (const fallback of [
    "0\\text{만 원}",
    "1\\text{만 원}",
    "5\\%",
    "10\\%",
  ]) {
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

function terms(principal: number, rate: number) {
  return `\\text{원금 }${principal}\\text{만 원},\\quad \\text{연이율 }${rate}\\%`;
}

export function createFinancialSequenceProblems(seed: number) {
  const next = random(seed);
  const problems: FinancialSequenceProblem[] = [];
  const rates = [5, 10, 20] as const;
  const accumulationRates = [10, 20] as const;
  const principals = [50, 100, 150, 200, 300] as const;
  const payments = [20, 50, 100] as const;

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = integer(next, 2, 5);
    const answer = simple(principal, rate, years);
    problems.push(item(
      seed,
      0,
      "simple-future-value",
      "단리의 원리합계",
      `${years}년 후 원리합계는?`,
      terms(principal, rate),
      money(answer),
      [
        money(compound(principal, rate, years)),
        money(simple(principal, rate, 1)),
        money(principal * (1 + years / 100)),
      ],
    ));
  }

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = integer(next, 2, rate === 5 ? 3 : 4);
    const answer = compound(principal, rate, years);
    problems.push(item(
      seed,
      1,
      "compound-future-value",
      "복리의 원리합계",
      `${years}년 후 원리합계는?`,
      terms(principal, rate),
      money(answer),
      [
        money(simple(principal, rate, years)),
        money(compound(principal, rate, years - 1)),
        money(compound(principal, rate, years + 1)),
      ],
    ));
  }

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = integer(next, 2, rate === 5 ? 3 : 4);
    const futureValue = compound(principal, rate, years);
    problems.push(item(
      seed,
      2,
      "compound-principal",
      "복리에서 원금",
      "처음 예금한 원금은?",
      `\\text{연이율 }${rate}\\%,\\quad ${years}\\text{년 후 }${money(futureValue)}`,
      money(principal),
      [
        money(futureValue / (1 + (rate * years) / 100)),
        money(futureValue / ((100 + rate) / 100) ** (years - 1)),
        money(futureValue),
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
      3,
      "compound-rate",
      "복리에서 이율",
      "연이율은?",
      `${principal}\\text{만 원}\\longrightarrow${money(futureValue)}\\quad(${years}\\text{년})`,
      `${rate}\\%`,
      [`${rate / 2}\\%`, `${rate + 5}\\%`, `${3 * rate}\\%`],
    ));
  }

  {
    const payment = pick(next, payments);
    const rate = pick(next, accumulationRates);
    const years = integer(next, 3, 4);
    const answer = ordinaryAnnuity(payment, rate, years);
    const due = answer * ((100 + rate) / 100);
    problems.push(item(
      seed,
      4,
      "ordinary-annuity",
      "매년 말 적립",
      `${years}년째 말의 적립금은?`,
      `\\text{매년 말 }${payment}\\text{만 원},\\quad \\text{연이율 }${rate}\\%`,
      money(answer),
      [
        money(payment * years),
        money(due),
        money(ordinaryAnnuity(payment, rate, years - 1)),
      ],
    ));
  }

  {
    const payment = pick(next, payments);
    const rate = pick(next, accumulationRates);
    const years = integer(next, 3, 4);
    const ordinary = ordinaryAnnuity(payment, rate, years);
    const answer = ordinary * ((100 + rate) / 100);
    problems.push(item(
      seed,
      5,
      "annuity-due",
      "매년 초 적립",
      `${years}년째 말의 적립금은?`,
      `\\text{매년 초 }${payment}\\text{만 원},\\quad \\text{연이율 }${rate}\\%`,
      money(answer),
      [
        money(ordinary),
        money(payment * years),
        money(answer * ((100 + rate) / 100)),
      ],
    ));
  }

  {
    const principal = pick(next, principals);
    const rate = pick(next, rates);
    const years = integer(next, 2, rate === 5 ? 3 : 4);
    const answer = compound(principal, rate, years) - simple(principal, rate, years);
    problems.push(item(
      seed,
      6,
      "simple-compound-difference",
      "단리와 복리의 비교",
      `${years}년 후 복리 원리합계에서 단리 원리합계를 뺀 값은?`,
      terms(principal, rate),
      money(answer),
      [
        money(0),
        money(compound(principal, rate, years - 1) - simple(principal, rate, years - 1)),
        money(principal * rate / 100),
      ],
    ));
  }

  return problems;
}

export const financialSequenceProblems =
  createFinancialSequenceProblems(20260828);
