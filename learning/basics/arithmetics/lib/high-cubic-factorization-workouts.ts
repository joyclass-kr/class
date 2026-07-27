export type HighCubicFactorizationDifficulty = "basic" | "application" | "advanced";

export type HighCubicFactorizationProblem = {
  id: string;
  difficulty: HighCubicFactorizationDifficulty;
  structure:
    | "monic-sum"
    | "monic-difference"
    | "coefficient-sum"
    | "coefficient-difference"
    | "two-variable"
    | "common-factor"
    | "shifted-binomial"
    | "higher-power";
  label: string;
  latex: string;
  answerLatex: string;
  solutionHint: string;
  distractors: string[];
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

function coefficient(value: number, symbol: string) {
  if (value === 0) return "";
  if (value === 1) return symbol;
  if (value === -1) return `-${symbol}`;
  return `${value}${symbol}`;
}

function signedTerm(value: number, symbol = "") {
  if (value === 0) return "";
  const magnitude = Math.abs(value);
  const body = symbol ? coefficient(magnitude, symbol) : `${magnitude}`;
  return `${value > 0 ? "+" : "-"}${body}`;
}

function quadratic(a: number, b: number, c: number, variable = "x") {
  const first = coefficient(a, `${variable}^2`);
  return `${first}${signedTerm(b, variable)}${signedTerm(c)}`;
}

function difficulty(index: number): HighCubicFactorizationDifficulty {
  if (index < 2) return "basic";
  if (index < 5) return "application";
  return "advanced";
}

function uniqueDistractors(answer: string, candidates: string[]) {
  const result = [...new Set(candidates.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "-1", "x^3", "(x-1)(x^2+x+1)"]) {
    if (result.length === 3) break;
    if (fallback !== answer && !result.includes(fallback)) result.push(fallback);
  }
  return result.slice(0, 3);
}

function problem(
  id: string,
  index: number,
  structure: HighCubicFactorizationProblem["structure"],
  label: string,
  latex: string,
  answerLatex: string,
  solutionHint: string,
  distractors: string[],
): HighCubicFactorizationProblem {
  return {
    id,
    difficulty: difficulty(index),
    structure,
    label,
    latex,
    answerLatex,
    solutionHint,
    distractors: uniqueDistractors(answerLatex, distractors),
  };
}

function build(next: () => number, index: number, id: string): HighCubicFactorizationProblem {
  const r = integer(next, 2, 5);

  if (index === 0) {
    const answer = `(x+${r})(x^2-${r}x+${r ** 2})`;
    return problem(id, index, "monic-sum", "세제곱의 합 공식",
      `x^3+${r ** 3}`, answer,
      `a^3+b^3=(a+b)(a^2-ab+b^2)에서 a=x, b=${r}로 둔다.`,
      [
        `(x+${r})(x^2+${r}x+${r ** 2})`,
        `(x-${r})(x^2+${r}x+${r ** 2})`,
        `(x+${r})(x^2-${r}x-${r ** 2})`,
      ]);
  }

  if (index === 1) {
    const answer = `(x-${r})(x^2+${r}x+${r ** 2})`;
    return problem(id, index, "monic-difference", "세제곱의 차 공식",
      `x^3-${r ** 3}`, answer,
      `a^3-b^3=(a-b)(a^2+ab+b^2)에서 a=x, b=${r}로 둔다.`,
      [
        `(x-${r})(x^2-${r}x+${r ** 2})`,
        `(x+${r})(x^2-${r}x+${r ** 2})`,
        `(x-${r})(x^2+${r}x-${r ** 2})`,
      ]);
  }

  if (index === 2 || index === 3) {
    const a = integer(next, 2, 4);
    let b = integer(next, 2, 5);
    while (b === a) b = integer(next, 2, 5);
    const sum = index === 2;
    const first = `(${a}x${sum ? "+" : "-"}${b})`;
    const second = `(${a ** 2}x^2${sum ? "-" : "+"}${a * b}x+${b ** 2})`;
    const answer = `${first}${second}`;
    return problem(id, index, sum ? "coefficient-sum" : "coefficient-difference",
      sum ? "계수가 있는 세제곱의 합" : "계수가 있는 세제곱의 차",
      `${a ** 3}x^3${sum ? "+" : "-"}${b ** 3}`, answer,
      `${a ** 3}x^3=(${a}x)^3, ${b ** 3}=${b}^3으로 보고 세제곱의 ${sum ? "합" : "차"} 공식을 적용한다.`,
      [
        `(${a}x${sum ? "+" : "-"}${b})(${a ** 2}x^2${sum ? "+" : "-"}${a * b}x+${b ** 2})`,
        `(${a}x${sum ? "-" : "+"}${b})(${a ** 2}x^2${sum ? "-" : "+"}${a * b}x+${b ** 2})`,
        `(${a}x${sum ? "+" : "-"}${b})(${a ** 2}x^2${sum ? "-" : "+"}${a * b}x-${b ** 2})`,
      ]);
  }

  if (index === 4) {
    const a = integer(next, 2, 4);
    const sum = integer(next, 0, 1) === 0;
    const answer = `(x${sum ? "+" : "-"}${a}y)(x^2${sum ? "-" : "+"}${a}xy+${a ** 2}y^2)`;
    return problem(id, index, "two-variable", "두 문자의 세제곱식",
      `x^3${sum ? "+" : "-"}${a ** 3}y^3`, answer,
      `${a ** 3}y^3=(${a}y)^3으로 고친 뒤 a^3\\pm b^3 공식을 적용한다.`,
      [
        `(x${sum ? "+" : "-"}${a}y)(x^2${sum ? "+" : "-"}${a}xy+${a ** 2}y^2)`,
        `(x${sum ? "-" : "+"}${a}y)(x^2${sum ? "-" : "+"}${a}xy+${a ** 2}y^2)`,
        `(x${sum ? "+" : "-"}${a}y)(x^2${sum ? "-" : "+"}${a}xy-${a ** 2}y^2)`,
      ]);
  }

  if (index === 5) {
    const common = integer(next, 2, 5);
    const answer = `${common}x(x-${r})(x^2+${r}x+${r ** 2})`;
    return problem(id, index, "common-factor", "공통인수와 세제곱의 차",
      `${common}x^4-${common * r ** 3}x`, answer,
      `먼저 ${common}x를 묶어 ${common}x(x^3-${r ** 3})으로 만든 뒤 세제곱의 차 공식을 적용한다.`,
      [
        `${common}(x-${r})(x^2+${r}x+${r ** 2})`,
        `${common}x(x-${r})(x^2-${r}x+${r ** 2})`,
        `${common}x(x+${r})(x^2-${r}x+${r ** 2})`,
      ]);
  }

  if (index === 6) {
    const p = integer(next, 1, 5);
    const sum = integer(next, 0, 1) === 0;
    const firstConstant = sum ? p + r : p - r;
    const middle = sum ? 2 * p - r : 2 * p + r;
    const constant = p ** 2 + (sum ? -p * r : p * r) + r ** 2;
    const first = firstConstant === 0 ? "x" : `x${signedTerm(firstConstant)}`;
    const second = quadratic(1, middle, constant);
    const firstFactor = firstConstant === 0 ? "x" : `(${first})`;
    const wrongFirstConstant = sum ? p - r : p + r;
    const wrongFirst = wrongFirstConstant === 0 ? "x" : `(x${signedTerm(wrongFirstConstant)})`;
    const answer = `${firstFactor}(${second})`;
    return problem(id, index, "shifted-binomial", "일차식의 세제곱",
      `(x+${p})^3${sum ? "+" : "-"}${r ** 3}`, answer,
      `a=x+${p}, b=${r}로 놓아 공식을 적용한 뒤 두 인수를 각각 정리한다.`,
      [
        `${firstFactor}(${quadratic(1, -middle, constant)})`,
        `${firstFactor}(${quadratic(1, middle, -constant)})`,
        `${wrongFirst}(${second})`,
      ]);
  }

  const a = integer(next, 2, 4);
  const b = a === 2 ? 3 : 2;
  const sum = integer(next, 0, 1) === 0;
  const answer = `(${a}x^2${sum ? "+" : "-"}${b}y)(${a ** 2}x^4${sum ? "-" : "+"}${a * b}x^2y+${b ** 2}y^2)`;
  return problem(id, index, "higher-power", "고차식의 세제곱 구조",
    `${a ** 3}x^6${sum ? "+" : "-"}${b ** 3}y^3`, answer,
    `${a ** 3}x^6=(${a}x^2)^3, ${b ** 3}y^3=(${b}y)^3으로 바꾸어 세제곱 공식을 적용한다.`,
    [
      `(${a}x^2${sum ? "+" : "-"}${b}y)(${a ** 2}x^4${sum ? "+" : "-"}${a * b}x^2y+${b ** 2}y^2)`,
      `(${a}x^2${sum ? "-" : "+"}${b}y)(${a ** 2}x^4${sum ? "-" : "+"}${a * b}x^2y+${b ** 2}y^2)`,
      `(${a}x^2${sum ? "+" : "-"}${b}y)(${a ** 2}x^4${sum ? "-" : "+"}${a * b}x^2y-${b ** 2}y^2)`,
    ]);
}

export function createHighCubicFactorizationProblemSet(seed: number) {
  const next = random(seed);
  return {
    seed,
    problems: Array.from({ length: 8 }, (_, index) => (
      build(next, index, `high-cubic-factorization-${seed}-${index}`)
    )),
  };
}

export function createHighCubicFactorizationReviewProblems(
  structures: HighCubicFactorizationProblem["structure"][],
  seed: number,
) {
  const unique = [...new Set(structures)].slice(0, 2);
  const structureIndexes: Record<HighCubicFactorizationProblem["structure"], number> = {
    "monic-sum": 0,
    "monic-difference": 1,
    "coefficient-sum": 2,
    "coefficient-difference": 3,
    "two-variable": 4,
    "common-factor": 5,
    "shifted-binomial": 6,
    "higher-power": 7,
  };
  const next = random(seed);
  return unique.map((structure, reviewIndex) => ({
    ...build(next, structureIndexes[structure], `high-cubic-factorization-review-${seed}-${reviewIndex}`),
    difficulty: "advanced" as const,
  }));
}
