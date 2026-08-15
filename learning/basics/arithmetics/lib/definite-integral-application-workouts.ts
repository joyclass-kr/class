export type DefiniteIntegralApplicationKind =
  | "quadratic-factor-area"
  | "between-curves"
  | "cubic-tangent-area"
  | "cubic-inflection-area"
  | "cubic-correction-area"
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
  "between-curves",
  "cubic-tangent-area",
  "cubic-inflection-area",
  "cubic-correction-area",
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

function coefficientForInteger(numerator: number, denominator: number, multiplier: number) {
  return (denominator / gcd(denominator, numerator)) * multiplier;
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

function build(
  kind: DefiniteIntegralApplicationKind,
  next: () => number,
  id: string,
): DefiniteIntegralApplicationProblem {
  if (kind === "quadratic-factor-area") {
    const alpha = integer(next, 0, 3);
    const width = choose(next, [2, 3, 4, 6] as const);
    const beta = alpha + width;
    const coefficient = coefficientForInteger(width ** 3, 6, integer(next, 1, 2));
    return {
      id, kind, label: "이차함수 6분의 공식",
      prompt: "곡선과 𝑥축으로 둘러싸인 부분의 넓이는?",
      latex: `y=${coefficientPrefix(coefficient)}${leftFactor(alpha)}${rightFactor(beta)}\\quad(${alpha}\\le x\\le${beta})`,
      answerLabels: ["넓이"], answers: [(coefficient * width ** 3) / 6],
    };
  }

  if (kind === "between-curves") {
    const alpha = integer(next, 1, 3);
    const width = choose(next, [2, 3, 4, 6] as const);
    const beta = alpha + width;
    const coefficient = coefficientForInteger(width ** 3, 6, integer(next, 1, 2));
    const prefix = coefficientPrefix(coefficient);
    return {
      id, kind, label: "두 함수 사이의 6분의 공식",
      prompt: "두 함수로 둘러싸인 부분의 넓이는?",
      latex: `y=${prefix}x^2,\\quad y=${prefix}(${alpha + beta}x-${alpha * beta})`,
      answerLabels: ["넓이"], answers: [(coefficient * width ** 3) / 6],
    };
  }

  if (kind === "cubic-tangent-area") {
    const alpha = integer(next, 0, 3);
    const width = choose(next, [2, 3, 4] as const);
    const beta = alpha + width;
    const coefficient = coefficientForInteger(width ** 4, 12, integer(next, 1, 2));
    return {
      id, kind, label: "삼차함수와 접선 12분의 공식",
      prompt: "삼차함수와 접선으로 둘러싸인 부분의 넓이는?",
      latex: `f(x)-\\ell(x)=${coefficientPrefix(coefficient)}${leftFactor(alpha, 2)}${rightFactor(beta)}`,
      answerLabels: ["넓이"], answers: [(coefficient * width ** 4) / 12],
    };
  }

  if (kind === "cubic-inflection-area") {
    const midpoint = integer(next, 1, 4);
    const distance = choose(next, [2, 3, 4] as const);
    const leftRoot = midpoint - distance;
    const rightRoot = midpoint + distance;
    const coefficient = coefficientForInteger(distance ** 4, 4, integer(next, 1, 2));
    return {
      id, kind, label: "변곡점과 한쪽 넓이 4분의 공식",
      prompt: `왼쪽 교점부터 변곡점 x=${midpoint}까지의 넓이는?`,
      latex: `f(x)-\\ell(x)=${coefficientPrefix(coefficient)}${leftFactor(leftRoot)}${leftFactor(midpoint)}${leftFactor(rightRoot)}`,
      answerLabels: ["넓이"], answers: [(coefficient * distance ** 4) / 4],
    };
  }

  if (kind === "cubic-correction-area") {
    const alpha = integer(next, 0, 2);
    const width = choose(next, [2, 4, 6] as const);
    const beta = alpha + width;
    const correctionOffset = choose(next, [1, 2, 3] as const);
    const gamma = beta + correctionOffset;
    const midpoint = (alpha + beta) / 2;
    const correction = gamma - midpoint;
    const coefficient = coefficientForInteger(width ** 3 * correction, 6, integer(next, 1, 2));
    return {
      id, kind, label: "일반 삼차함수 6분의 보정치",
      prompt: `x=${alpha}부터 x=${beta}까지 곡선과 𝑥축 사이의 넓이는?`,
      latex: `y=${coefficientPrefix(coefficient)}${leftFactor(alpha)}${leftFactor(beta)}${leftFactor(gamma)}`,
      answerLabels: ["넓이"], answers: [(coefficient * width ** 3 * correction) / 6],
    };
  }

  const scale = integer(next, 1, 4);
  if (kind === "extrema-value-difference") {
    const alpha = integer(next, -2, 1);
    const width = choose(next, [2, 3, 4, 5] as const);
    const beta = alpha + width;
    const variant = choose(next, ["difference", "coefficient", "distance"] as const);

    if (variant === "coefficient") {
      const cubicCoefficient = choose(next, [2, 4] as const);
      return {
        id, kind, label: "극값 차로 최고차항 계수 찾기",
        prompt: "$a$의 값은?",
        latex: `\\begin{gathered}f'(x)=3a${leftFactor(alpha)}${leftFactor(beta)},\\quad a>0\\\\[3pt]|f(${alpha})-f(${beta})|=${(cubicCoefficient * width ** 3) / 2}\\end{gathered}`,
        answerLabels: ["값"], answers: [cubicCoefficient],
      };
    }

    if (variant === "distance") {
      return {
        id, kind, label: "극값 차로 두 극점의 간격 찾기",
        prompt: "$\\beta-\\alpha$의 값은?",
        latex: `\\begin{gathered}f'(x)=6(x-\\alpha)(x-\\beta),\\quad \\alpha<\\beta\\\\[3pt]|f(\\alpha)-f(\\beta)|=${width ** 3}\\end{gathered}`,
        answerLabels: ["값"], answers: [width],
      };
    }

    const cubicCoefficient = choose(next, [2, 4] as const);
    const derivativeScale = 3 * cubicCoefficient;
    const cubic = cubicCoefficient;
    const quadratic = -(derivativeScale * (alpha + beta)) / 2;
    const linear = derivativeScale * alpha * beta;
    const constant = integer(next, -5, 5);
    const polynomial = `${cubic}x^3${signedTerm(quadratic, "x^2")}${signedTerm(linear, "x")}${signedTerm(constant)}`;
    return {
      id, kind, label: "삼차함수 극댓값과 극솟값의 차이",
      prompt: "$f(\\alpha)$와 $f(\\beta)$의 차는?",
      latex: `\\begin{gathered}f(x)=${polynomial}\\\\[3pt]x=\\alpha(${alpha})\\text{에서 극대},\\quad x=\\beta(${beta})\\text{에서 극소}\\end{gathered}`,
      answerLabels: ["값"], answers: [(cubicCoefficient * width ** 3) / 2],
    };
  }

  if (kind === "quadratic-velocity-distance") {
    return {
      id, kind, label: "속도의 부호와 이동거리",
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
