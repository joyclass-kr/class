import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type SecondDerivativeApplicationKind =
  | "exponential-second"
  | "trigonometric-second"
  | "cubic-inflection"
  | "inflection-parameter"
  | "concavity-interval"
  | "stationary-classification"
  | "inflection-count";

export type SecondDerivativeApplicationProblem = GeometryChoiceItem & {
  kind: SecondDerivativeApplicationKind;
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

function pick<T>(next: () => number, values: readonly T[]) {
  return values[Math.floor(next() * values.length)]!;
}

function signed(value: number) {
  if (value === 0) return "";
  return value < 0 ? `${value}` : `+${value}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set([answer, ...distractors.filter((value) => value !== answer)])];
  for (const fallback of ["0", "1", "-1", "2"]) {
    if (unique.length === 4) break;
    if (!unique.includes(fallback)) unique.push(fallback);
  }
  return unique.slice(0, 4).map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  seed: number,
  index: number,
  kind: SecondDerivativeApplicationKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): SecondDerivativeApplicationProblem {
  const id = `second-derivative-application-${seed}-${index}`;
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

export function createSecondDerivativeApplicationProblems(seed: number) {
  const next = random(seed);
  const problems: SecondDerivativeApplicationProblem[] = [];

  {
    const rate = integer(next, 2, 5);
    problems.push(item(
      seed,
      0,
      "exponential-second",
      "지수함수의 이계도함수",
      "$f''(x)=Ae^{ax}$일 때 $A$는?",
      `f(x)=e^{${rate}x}`,
      `A=${rate ** 2}`,
      [`A=${rate}`, `A=${2 * rate}`, `A=${rate ** 3}`],
    ));
  }

  {
    const rate = integer(next, 2, 5);
    const trig = pick(next, ["sin", "cos"] as const);
    const command = trig === "sin" ? "\\sin" : "\\cos";
    problems.push(item(
      seed,
      1,
      "trigonometric-second",
      "삼각함수의 이계도함수",
      "$f''(x)$는?",
      `f(x)=${command}(${rate}x)`,
      `f''(x)=-${rate ** 2}${command}(${rate}x)`,
      [
        `f''(x)=${rate ** 2}${command}(${rate}x)`,
        `f''(x)=-${rate}${command}(${rate}x)`,
        `f''(x)=${rate}${command}(${rate}x)`,
      ],
    ));
  }

  {
    const inflection = integer(next, -4, 4);
    const quadratic = -3 * inflection;
    const linear = integer(next, -5, 5);
    problems.push(item(
      seed,
      2,
      "cubic-inflection",
      "삼차함수의 변곡점",
      "변곡점의 $x$좌표는?",
      `f(x)=x^3${signed(quadratic)}x^2${signed(linear)}x`,
      `x=${inflection}`,
      [`x=${-inflection}`, `x=${inflection + 1}`, `x=${3 * inflection}`],
    ));
  }

  {
    const inflection = integer(next, -4, 4);
    const parameter = -3 * inflection;
    const linear = integer(next, -5, 5);
    problems.push(item(
      seed,
      3,
      "inflection-parameter",
      "변곡점 조건으로 계수 결정",
      "$x=p$가 변곡점이 되도록 $k$를 구하면?",
      `f(x)=x^3+kx^2${signed(linear)}x,\\quad p=${inflection}`,
      `k=${parameter}`,
      [`k=${-parameter}`, `k=${inflection}`, `k=${-2 * inflection}`],
    ));
  }

  {
    const boundary = integer(next, 1, 4);
    problems.push(item(
      seed,
      4,
      "concavity-interval",
      "오목·볼록 구간",
      "$f''(x)>0$인 구간은?",
      `f(x)=x^4-${6 * boundary ** 2}x^2`,
      `x<-${boundary}\\ \\text{또는}\\ x>${boundary}`,
      [
        `-${boundary}<x<${boundary}`,
        `x<${boundary}`,
        `x>-${boundary}`,
      ],
    ));
  }

  {
    const point = integer(next, -3, 3);
    const minimum = next() >= 0.5;
    const coefficient = minimum ? integer(next, 1, 4) : -integer(next, 1, 4);
    problems.push(item(
      seed,
      5,
      "stationary-classification",
      "이계도함수로 극값 판정",
      "$x=p$에서의 극값 종류는?",
      `f'(p)=0,\\quad f''(p)=${2 * coefficient},\\quad p=${point}`,
      minimum ? "\\text{극솟값}" : "\\text{극댓값}",
      [
        minimum ? "\\text{극댓값}" : "\\text{극솟값}",
        "\\text{변곡점}",
        "\\text{판정할 수 없음}",
      ],
    ));
  }

  {
    const mode = integer(next, 0, 2);
    const a = integer(next, 1, 4);
    const formulas = [
      `f(x)=x^4`,
      `f(x)=x^3${signed(a)}x`,
      `f(x)=x^4-${6 * a}x^2`,
    ];
    const count = [0, 1, 2][mode]!;
    problems.push(item(
      seed,
      6,
      "inflection-count",
      "변곡점의 개수",
      "변곡점의 개수는?",
      formulas[mode]!,
      `${count}\\text{개}`,
      [`${(count + 1) % 3}\\text{개}`, `${(count + 2) % 3}\\text{개}`, "3\\text{개}"],
    ));
  }

  return problems;
}

export const secondDerivativeApplicationProblems =
  createSecondDerivativeApplicationProblems(20260901);
