export type DefiniteIntegralApplicationKind =
  | "quadratic-factor-area"
  | "cubic-double-root-area"
  | "quartic-triple-root-area"
  | "quartic-double-pair-area"
  | "between-curves"
  | "extrema-value-difference"
  | "quadratic-velocity-distance"
  | "position-total-distance";

export type DefiniteIntegralApplicationProblem = {
  id: string;
  kind: DefiniteIntegralApplicationKind;
  label: string;
  prompt: string;
  latex: string;
  answerLabels: string[];
  answers: number[];
};

const KINDS: DefiniteIntegralApplicationKind[] = [
  "quadratic-factor-area",
  "cubic-double-root-area",
  "quartic-triple-root-area",
  "quartic-double-pair-area",
  "between-curves",
  "extrema-value-difference",
  "quadratic-velocity-distance",
  "position-total-distance",
];

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}
function integer(next: () => number, min: number, max: number) {
  return min + Math.floor(next() * (max - min + 1));
}
function choose<T>(next: () => number, values: readonly T[]) {
  return values[Math.floor(next() * values.length)];
}
function gcd(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b) [a, b] = [b, a % b];
  return a;
}
function integralCoefficient(width: number, power: number, denominator: number, multiplier: number) {
  return (denominator / gcd(denominator, width ** power)) * multiplier;
}
function coefficientPrefix(coefficient: number) {
  return coefficient === 1 ? "" : String(coefficient);
}
function leftFactor(root: number, power = 1) {
  const factor = root === 0 ? "x" : root > 0 ? `(x-${root})` : `(x+${Math.abs(root)})`;
  return power === 1 ? factor : `${factor}^{${power}}`;
}
function rightFactor(root: number, power = 1) {
  const factor = `(${root}-x)`;
  return power === 1 ? factor : `${factor}^{${power}}`;
}
function signedTerm(coefficient: number, variable = "") {
  if (coefficient === 0) return "";
  const sign = coefficient > 0 ? "+" : "-";
  const magnitude = Math.abs(coefficient);
  const value = variable && magnitude === 1 ? variable : `${magnitude}${variable}`;
  return `${sign}${value}`;
}
function areaProblem(
  kind: DefiniteIntegralApplicationKind,
  id: string,
  label: string,
  alpha: number,
  width: number,
  coefficient: number,
  denominator: number,
  power: number,
  leftPower: number,
  rightPower: number,
): DefiniteIntegralApplicationProblem {
  const beta = alpha + width;
  return {
    id,
    kind,
    label,
    prompt: "곡선과 𝑥축으로 둘러싸인 부분의 넓이는?",
    latex: `y=${coefficientPrefix(coefficient)}${leftFactor(alpha, leftPower)}${rightFactor(beta, rightPower)}\\quad(${alpha}\\le x\\le${beta})`,
    answerLabels: ["넓이"],
    answers: [(coefficient * width ** power) / denominator],
  };
}

function build(
  kind: DefiniteIntegralApplicationKind,
  next: () => number,
  id: string,
): DefiniteIntegralApplicationProblem {
  if (kind === "quadratic-factor-area") {
    const alpha = integer(next, 0, 3);
    const width = choose(next, [2, 3, 4, 6] as const);
    const coefficient = integralCoefficient(width, 3, 6, integer(next, 1, 2));
    return areaProblem(kind, id, "두 근 사이의 넓이", alpha, width, coefficient, 6, 3, 1, 1);
  }

  if (kind === "cubic-double-root-area") {
    const alpha = integer(next, 0, 3);
    const width = choose(next, [2, 3, 4] as const);
    const coefficient = integralCoefficient(width, 4, 12, integer(next, 1, 2));
    return areaProblem(kind, id, "이중근이 있는 삼차식", alpha, width, coefficient, 12, 4, 2, 1);
  }

  if (kind === "quartic-triple-root-area") {
    const alpha = integer(next, 0, 2);
    const width = choose(next, [2, 4, 5] as const);
    const coefficient = integralCoefficient(width, 5, 20, integer(next, 1, 2));
    return areaProblem(kind, id, "삼중근이 있는 사차식", alpha, width, coefficient, 20, 5, 3, 1);
  }

  if (kind === "quartic-double-pair-area") {
    const alpha = integer(next, 0, 2);
    const width = choose(next, [2, 3, 5, 6] as const);
    const coefficient = integralCoefficient(width, 5, 30, integer(next, 1, 2));
    return areaProblem(kind, id, "두 이중근이 있는 사차식", alpha, width, coefficient, 30, 5, 2, 2);
  }

  if (kind === "between-curves") {
    const alpha = integer(next, 1, 3);
    const width = choose(next, [2, 3, 4, 6] as const);
    const beta = alpha + width;
    const coefficient = integralCoefficient(width, 3, 6, integer(next, 1, 2));
    const prefix = coefficientPrefix(coefficient);
    return {
      id, kind, label: "두 곡선 사이의 넓이",
      prompt: "두 곡선으로 둘러싸인 부분의 넓이는?",
      latex: `y=${prefix}x^2,\\quad y=${prefix}(${alpha + beta}x-${alpha * beta})`,
      answerLabels: ["넓이"], answers: [(coefficient * width ** 3) / 6],
    };
  }

  const scale = integer(next, 1, 4);
  if (kind === "extrema-value-difference") {
    const alpha = integer(next, -2, 1);
    const width = choose(next, [2, 3, 4, 5] as const);
    const beta = alpha + width;
    const derivativeScale = 6 * integer(next, 1, 2);
    const variant = choose(next, ["difference", "coefficient", "distance"] as const);

    if (variant === "coefficient") {
      const coefficient = integer(next, 1, 4);
      return {
        id, kind, label: "극값 차로 계수 찾기",
        prompt: "$a$의 값은?",
        latex: `\\begin{gathered}f'(x)=a${leftFactor(alpha)}${leftFactor(beta)},\\quad a>0\\\\[3pt]|f(${alpha})-f(${beta})|=${(coefficient * width ** 3) / 6}\\end{gathered}`,
        answerLabels: ["값"], answers: [coefficient],
      };
    }

    if (variant === "distance") {
      return {
        id, kind, label: "극값 차로 두 근의 간격 찾기",
        prompt: "$\\beta-\\alpha$의 값은?",
        latex: `\\begin{gathered}f'(x)=6(x-\\alpha)(x-\\beta),\\quad \\alpha<\\beta\\\\[3pt]|f(\\alpha)-f(\\beta)|=${width ** 3}\\end{gathered}`,
        answerLabels: ["값"], answers: [width],
      };
    }

    const cubic = derivativeScale / 3;
    const quadratic = -(derivativeScale * (alpha + beta)) / 2;
    const linear = derivativeScale * alpha * beta;
    const constant = integer(next, -5, 5);
    const polynomial = `${cubic}x^3${signedTerm(quadratic, "x^2")}${signedTerm(linear, "x")}${signedTerm(constant)}`;
    return {
      id, kind, label: "극댓값과 극솟값의 차이",
      prompt: "$f(\\alpha)$와 $f(\\beta)$의 차는?",
      latex: `\\begin{gathered}f(x)=${polynomial}\\\\[3pt]x=\\alpha(${alpha})\\text{에서 극대},\\quad x=\\beta(${beta})\\text{에서 극소}\\end{gathered}`,
      answerLabels: ["값"], answers: [(derivativeScale * width ** 3) / 6],
    };
  }

  if (kind === "quadratic-velocity-distance") {
    return {
      id, kind, label: "여러 번 바뀌는 운동 방향",
      prompt: "주어진 시간 동안의 이동 거리는?",
      latex: `v(t)=${scale}(t-1)(t-3)\\quad(0\\le t\\le4)`,
      answerLabels: ["거리"], answers: [4 * scale],
    };
  }

  return {
    id, kind, label: "위치와 이동거리",
    prompt: "주어진 시간 동안의 이동 거리는?",
    latex: `s(t)=${scale}(t^3-6t^2+9t)\\quad(0\\le t\\le4)`,
    answerLabels: ["거리"], answers: [12 * scale],
  };
}

export function createDefiniteIntegralApplicationSet(seed: number) {
  const next = random(seed);
  return { seed, problems: KINDS.map((kind, index) => build(kind, next, `definite-integral-application-${index}`)) };
}
export function createDefiniteIntegralApplicationReviews(
  kinds: DefiniteIntegralApplicationKind[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) =>
    build(kind, next, `definite-integral-application-review-${index}-${seed}`),
  );
}
