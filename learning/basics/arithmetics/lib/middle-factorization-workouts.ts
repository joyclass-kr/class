export type MiddleFactorizationKind =
  | "common-factor"
  | "multiple-variables"
  | "grouping"
  | "perfect-square"
  | "difference-squares"
  | "monic-trinomial"
  | "nonmonic-trinomial"
  | "three-variables"
  | "cubic-common"
  | "cubic-grouping"
  | "normalize-first"
  | "comprehensive";

export type MiddleFactorizationProblem = {
  id: string;
  kind: MiddleFactorizationKind;
  label: string;
  latex: string;
  answerLatex: string;
  distractors: string[];
};

export const MIDDLE_FACTORIZATION_KINDS: MiddleFactorizationKind[] = [
  "common-factor",
  "multiple-variables",
  "grouping",
  "perfect-square",
  "difference-squares",
  "monic-trinomial",
  "nonmonic-trinomial",
  "three-variables",
  "cubic-common",
  "cubic-grouping",
  "normalize-first",
  "comprehensive",
];

export const MIDDLE_FACTORIZATION_TITLES: Record<MiddleFactorizationKind, string> = {
  "common-factor": "인수분해: 공통인수",
  "multiple-variables": "인수분해: 여러 문자",
  grouping: "인수분해: 두 항씩 묶기",
  "perfect-square": "인수분해: 완전제곱식",
  "difference-squares": "인수분해: 제곱의 차",
  "monic-trinomial": "인수분해: x²+(a+b)x+ab",
  "nonmonic-trinomial": "인수분해: ax²+bx+c",
  "three-variables": "인수분해: 세 문자식",
  "cubic-common": "인수분해: 3차식 공통인수",
  "cubic-grouping": "인수분해: 3차식 묶어내기",
  "normalize-first": "인수분해: 식 정리 후 인수분해",
  comprehensive: "인수분해 종합",
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

function nonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}

function gcd(left: number, right: number): number {
  return right === 0 ? Math.abs(left) : gcd(right, left % right);
}

function coprimeNonzero(
  next: () => number,
  relativeTo: number,
  minimum: number,
  maximum: number,
) {
  let value = nonzero(next, minimum, maximum);
  while (gcd(relativeTo, value) !== 1) value = nonzero(next, minimum, maximum);
  return value;
}

function coprimePositivePair(next: () => number, minimum: number, maximum: number) {
  const left = integer(next, minimum, maximum);
  let right = integer(next, minimum, maximum);
  while (gcd(left, right) !== 1) right = integer(next, minimum, maximum);
  return [left, right] as const;
}

function coefficient(value: number, variable: string, first = false) {
  if (value === 0) return "";
  const sign = value < 0 ? "-" : first ? "" : "+";
  const magnitude = Math.abs(value);
  return `${sign}${magnitude === 1 && variable ? "" : magnitude}${variable}`;
}

function polynomial(terms: Array<[number, string]>) {
  const visible = terms.filter(([value]) => value !== 0);
  return visible.map(([value, variable], index) => coefficient(value, variable, index === 0)).join("");
}

function signed(value: number) {
  return value < 0 ? String(value) : `+${value}`;
}

function signedFactorCoefficient(value: number) {
  if (value === 1) return "+";
  if (value === -1) return "-";
  return signed(value);
}

function linear(variable: string, constant: number, leading = 1) {
  const variableTerm = `${leading === 1 ? "" : leading === -1 ? "-" : leading}${variable}`;
  return constant === 0 ? variableTerm : `${variableTerm}${signed(constant)}`;
}

export function formatNormalizedLinearCombination(
  leading: number,
  constant: number,
  sharedConstant: number,
) {
  const common = gcd(leading, constant);
  const primitiveLeading = leading / common;
  const primitiveConstant = constant / common;
  const sharedFactor = linear("x", sharedConstant);
  const remainingFactor = linear("x", primitiveConstant, primitiveLeading);
  const outside = common === 1 ? "" : String(common);
  return sharedFactor === remainingFactor
    ? `${outside}(${sharedFactor})^2`
    : `${outside}(${sharedFactor})(${remainingFactor})`;
}

function uniqueDistractors(answer: string, candidates: string[]) {
  const unique = [...new Set(candidates.filter((candidate) => candidate !== answer))];
  while (unique.length < 3) unique.push(`${answer}+${unique.length + 1}`);
  return unique.slice(0, 3);
}

function make(
  id: string,
  kind: MiddleFactorizationKind,
  latex: string,
  answerLatex: string,
  distractors: string[],
): MiddleFactorizationProblem {
  return {
    id,
    kind,
    label: MIDDLE_FACTORIZATION_TITLES[kind],
    latex,
    answerLatex,
    distractors: uniqueDistractors(answerLatex, distractors),
  };
}

function build(
  kind: MiddleFactorizationKind,
  next: () => number,
  id: string,
  variantHint = 0,
): MiddleFactorizationProblem {
  const p = nonzero(next, -6, 6);
  let q = nonzero(next, -6, 6);
  while (q === p) q = nonzero(next, -6, 6);
  const [m, n] = coprimePositivePair(next, 2, 5);

  if (kind === "common-factor") {
    const common = integer(next, 2, 6);
    const left = integer(next, 2, 6);
    const right = coprimeNonzero(next, left, -6, 6);
    const expression = polynomial([[common * left, "x^2"], [common * right, "x"]]);
    const answer = `${common}x(${linear("x", right, left)})`;
    return make(id, kind, expression, answer, [
      `${common}(${linear("x", right, left)})`,
      `x(${linear("x", common * right, common * left)})`,
      `${common}x(${linear("x", -right, left)})`,
    ]);
  }

  if (kind === "multiple-variables") {
    const common = integer(next, 2, 5);
    const left = integer(next, 2, 5);
    const right = coprimeNonzero(next, left, -5, 5);
    const expression = polynomial([[common * left, "a^2b"], [common * right, "ab^2"]]);
    const answer = `${common}ab(${left}a${signed(right)}b)`;
    return make(id, kind, expression, answer, [
      `${common}a(${left}a${signed(right)}b)`,
      `${common}b(${left}a${signed(right)}b)`,
      `${common}ab(${left}a${signed(-right)}b)`,
    ]);
  }

  if (kind === "grouping") {
    const expression = polynomial([[m, "ax"], [m, "ay"], [n, "bx"], [n, "by"]]);
    const answer = `(${m}a+${n}b)(x+y)`;
    return make(id, kind, expression, answer, [
      `(${m}a-${n}b)(x+y)`,
      `(${m}a+${n}b)(x-y)`,
      `(a+b)(${m}x+${n}y)`,
    ]);
  }

  if (kind === "perfect-square") {
    const expression = polynomial([[1, "x^2"], [2 * p, "x"], [p * p, ""]]);
    const answer = `(${linear("x", p)})^2`;
    return make(id, kind, expression, answer, [
      `(${linear("x", -p)})^2`,
      `(x${signed(p * p)})^2`,
      `(${linear("x", p)})(x${signed(-p)})`,
    ]);
  }

  if (kind === "difference-squares") {
    const expression = polynomial([[m * m, "x^2"], [-n * n, ""]]);
    const answer = `(${m}x-${n})(${m}x+${n})`;
    return make(id, kind, expression, answer, [
      `(${m}x-${n})^2`,
      `(${m}x+${n})^2`,
      `(${m * m}x-${n})(${m * m}x+${n})`,
    ]);
  }

  if (kind === "monic-trinomial") {
    const expression = polynomial([[1, "x^2"], [p + q, "x"], [p * q, ""]]);
    const answer = `(${linear("x", p)})(${linear("x", q)})`;
    return make(id, kind, expression, answer, [
      `(${linear("x", -p)})(${linear("x", -q)})`,
      `(${linear("x", p)})(${linear("x", -q)})`,
      `(${linear("x", p + q)})(x${signed(p * q)})`,
    ]);
  }

  if (kind === "nonmonic-trinomial") {
    const a = integer(next, 2, 4);
    const b = integer(next, 2, 4);
    const firstConstant = coprimeNonzero(next, a, -6, 6);
    const secondConstant = coprimeNonzero(next, b, -6, 6);
    const expression = polynomial([[a * b, "x^2"], [a * secondConstant + b * firstConstant, "x"], [firstConstant * secondConstant, ""]]);
    const answer = `(${linear("x", firstConstant, a)})(${linear("x", secondConstant, b)})`;
    return make(id, kind, expression, answer, [
      `(${linear("x", -firstConstant, a)})(${linear("x", -secondConstant, b)})`,
      `(${linear("x", secondConstant, a)})(${linear("x", firstConstant, b)})`,
      `(${linear("x", firstConstant, a * b)})(${linear("x", secondConstant)})`,
    ]);
  }

  if (kind === "three-variables") {
    const patterns = [
      ["a^2+ab+ac+bc", "(a+b)(a+c)"],
      ["ab+ac+bd+cd", "(a+d)(b+c)"],
      ["a^2b+ab^2+a+b", "(a+b)(ab+1)"],
    ] as const;
    const [expression, answer] = patterns[integer(next, 0, patterns.length - 1)];
    return make(id, kind, expression, answer, [
      "(a+b+c)^2",
      "(a-b)(a-c)",
      "(a+b)(a-c)",
    ]);
  }

  if (kind === "cubic-common") {
    const common = integer(next, 2, 5);
    const expression = polynomial([[common, "x^3"], [common * (p + q), "x^2"], [common * p * q, "x"]]);
    const answer = `${common}x(${linear("x", p)})(${linear("x", q)})`;
    return make(id, kind, expression, answer, [
      `${common}(${linear("x", p)})(${linear("x", q)})`,
      `${common}x(${linear("x", -p)})(${linear("x", -q)})`,
      `x(${linear("x", p, common)})(${linear("x", q)})`,
    ]);
  }

  if (kind === "cubic-grouping") {
    const positive = integer(next, 2, 7);
    const expression = polynomial([[1, "x^3"], [p, "x^2"], [positive, "x"], [p * positive, ""]]);
    const answer = `(${linear("x", p)})(x^2+${positive})`;
    return make(id, kind, expression, answer, [
      `(${linear("x", -p)})(x^2+${positive})`,
      `(${linear("x", p)})(x^2-${positive})`,
      `(x^2${signed(p)})(x+${positive})`,
    ]);
  }

  if (kind === "normalize-first") {
    const a = integer(next, 2, 5);
    const variant = variantHint % 5;

    if (variant === 0) {
      const expression = `${a}x(${linear("x", p)})${signedFactorCoefficient(q)}(${linear("x", p)})`;
      const answer = formatNormalizedLinearCombination(a, q, p);
      return make(id, kind, expression, answer, [
        `(${linear("x", p)})(${linear("x", q, a)})`,
        `(${linear("x", -p)})(${linear("x", q, a)})`,
        `(${linear("x", p)})(${linear("x", -q, a)})`,
      ]);
    }

    if (variant === 1) {
      const expression = `(${linear("x", p)})^2${signedFactorCoefficient(q)}(${linear("x", p)})`;
      const answer = `(${linear("x", p)})(${linear("x", p + q)})`;
      return make(id, kind, expression, answer, [
        `(${linear("x", p)})(${linear("x", p - q)})`,
        `(${linear("x", -p)})(${linear("x", p + q)})`,
        `(${linear("x", p + q)})^2`,
      ]);
    }

    if (variant === 2) {
      const distance = integer(next, 2, 6);
      const expression = `(${linear("x", p)})^2-${distance ** 2}`;
      const answer = `(${linear("x", p - distance)})(${linear("x", p + distance)})`;
      return make(id, kind, expression, answer, [
        `(${linear("x", p - distance)})^2`,
        `(${linear("x", p + distance)})^2`,
        `(${linear("x", p - distance ** 2)})(${linear("x", p + distance ** 2)})`,
      ]);
    }

    if (variant === 3) {
      const expression = polynomial([
        [a, "x^2"],
        [a * p, "x"],
        [q, "x"],
        [p * q, ""],
      ]);
      const answer = formatNormalizedLinearCombination(a, q, p);
      return make(id, kind, expression, answer, [
        `(${linear("x", -p)})(${linear("x", q, a)})`,
        `(${linear("x", p)})(${linear("x", -q, a)})`,
        `(${linear("x", p + q, a)})`,
      ]);
    }

    const b = integer(next, 2, 5);
    const r = nonzero(next, -6, 6);
    const shared = linear("x", p);
    const expression = `(${shared})(${linear("x", q, a)})+(${shared})(${linear("x", r, b)})`;
    const answer = formatNormalizedLinearCombination(a + b, q + r, p);
    return make(id, kind, expression, answer, [
      `(${shared})(${linear("x", q + r, a + b)})`,
      `(${shared})(${linear("x", q - r, a + b)})`,
      `(${linear("x", -p)})(${linear("x", q + r, a + b)})`,
    ]);
  }

  const comprehensiveKinds = MIDDLE_FACTORIZATION_KINDS.filter((value) => (
    value !== "comprehensive" && value !== "three-variables"
  ));
  return build(
    comprehensiveKinds[integer(next, 0, comprehensiveKinds.length - 1)],
    next,
    id,
    variantHint,
  );
}

export function isMiddleFactorizationKind(value: string | null): value is MiddleFactorizationKind {
  return MIDDLE_FACTORIZATION_KINDS.includes(value as MiddleFactorizationKind);
}

export function createMiddleFactorizationProblemSet(kind: MiddleFactorizationKind, seed: number) {
  const next = random(seed);
  return {
    seed,
    kind,
    problems: Array.from({ length: 8 }, (_, index) => (
      build(kind, next, `middle-factorization-${kind}-${index}`, index)
    )),
  };
}

export function createMiddleFactorizationReviewProblems(
  kinds: MiddleFactorizationKind[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => (
    build(kind, next, `middle-factorization-review-${kind}-${index}-${seed}`, index)
  ));
}
