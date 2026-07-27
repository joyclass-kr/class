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

export type MiddleFactorizationDifficulty = "basic" | "application" | "advanced";

export type MiddleFactorizationProblem = {
  id: string;
  kind: MiddleFactorizationKind;
  difficulty: MiddleFactorizationDifficulty;
  structure: string;
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
  structure = kind,
  difficulty: MiddleFactorizationDifficulty = "basic",
): MiddleFactorizationProblem {
  return {
    id,
    kind,
    difficulty,
    structure,
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
  const progressionVariant = (
    variantHint < 2 ? 0
      : variantHint < 4 ? 1
        : variantHint < 6 ? 2
          : 3
  );
  const p = nonzero(next, -6, 6);
  let q = nonzero(next, -6, 6);
  while (q === p) q = nonzero(next, -6, 6);
  const [m, n] = coprimePositivePair(next, 2, 5);

  if (kind === "common-factor") {
    const common = integer(next, 2, 6);
    const left = integer(next, 2, 6);
    const right = coprimeNonzero(next, left, -6, 6);
    const variant = progressionVariant % 4;
    const forms = [
      {
        expression: polynomial([[common * left, "x^2"], [common * right, "x"]]),
        answer: `${common}x(${linear("x", right, left)})`,
        structure: "linear-common",
      },
      {
        expression: polynomial([[common * left, "x^3"], [common * right, "x^2"]]),
        answer: `${common}x^2(${linear("x", right, left)})`,
        structure: "power-common",
      },
      {
        expression: polynomial([[common * left, "x^2"], [common * right, "xy"]]),
        answer: `${common}x(${left}x${signed(right)}y)`,
        structure: "two-variable-common",
      },
      {
        expression: polynomial([[common * left, "a^2"], [common * right, "ab"]]),
        answer: `${common}a(${left}a${signed(right)}b)`,
        structure: "letter-common",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `${common}(${linear("x", right, left)})`,
      `${answer}+1`,
      `${answer}-1`,
    ], structure);
  }

  if (kind === "multiple-variables") {
    const common = integer(next, 2, 5);
    const left = integer(next, 2, 5);
    const right = coprimeNonzero(next, left, -5, 5);
    const third = coprimeNonzero(next, left, -5, 5);
    const variant = progressionVariant % 4;
    const forms = [
      {
        expression: polynomial([[common * left, "a^2b"], [common * right, "ab^2"]]),
        answer: `${common}ab(${left}a${signed(right)}b)`,
        structure: "ab-binomial",
      },
      {
        expression: polynomial([[common * left, "a^3b^2"], [common * right, "a^2b^3"]]),
        answer: `${common}a^2b^2(${left}a${signed(right)}b)`,
        structure: "higher-power-ab",
      },
      {
        expression: polynomial([[common * left, "a^2bc"], [common * right, "ab^2c"], [common * third, "abc^2"]]),
        answer: `${common}abc(${left}a${signed(right)}b${signed(third)}c)`,
        structure: "abc-trinomial",
      },
      {
        expression: polynomial([[common * left, "x^3y^2"], [common * right, "x^2y^4"]]),
        answer: `${common}x^2y^2(${left}x${signed(right)}y^2)`,
        structure: "unequal-powers",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `${answer}+a`,
      `${answer}+b`,
      `${answer}-1`,
    ], structure);
  }

  if (kind === "grouping") {
    const variant = progressionVariant % 4;
    const forms = [
      {
        expression: polynomial([[m, "ax"], [m, "ay"], [n, "bx"], [n, "by"]]),
        answer: `(${m}a+${n}b)(x+y)`,
        structure: "sum-sum",
      },
      {
        expression: polynomial([[m, "ax"], [m, "ay"], [-n, "bx"], [-n, "by"]]),
        answer: `(${m}a-${n}b)(x+y)`,
        structure: "difference-sum",
      },
      {
        expression: polynomial([[m, "ax"], [-m, "ay"], [n, "bx"], [-n, "by"]]),
        answer: `(${m}a+${n}b)(x-y)`,
        structure: "sum-difference",
      },
      {
        expression: polynomial([[m, "ax"], [n, "by"], [n, "bx"], [m, "ay"]]),
        answer: `(${m}a+${n}b)(x+y)`,
        structure: "reordered",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `(${m}a-${n}b)(x+y)`,
      `(${m}a+${n}b)(x-y)`,
      `(a+b)(${m}x+${n}y)`,
    ], structure);
  }

  if (kind === "perfect-square") {
    const sign = p < 0 ? -1 : 1;
    const variant = progressionVariant % 4;
    const forms = [
      {
        expression: polynomial([[1, "x^2"], [2 * p, "x"], [p * p, ""]]),
        answer: `(${linear("x", p)})^2`,
        structure: "monic-x",
      },
      {
        expression: polynomial([[m * m, "x^2"], [sign * 2 * m * n, "x"], [n * n, ""]]),
        answer: `(${linear("x", sign * n, m)})^2`,
        structure: "coefficient-x",
      },
      {
        expression: polynomial([[m * m, "a^2"], [sign * 2 * m * n, "ab"], [n * n, "b^2"]]),
        answer: `(${m}a${sign < 0 ? "-" : "+"}${n}b)^2`,
        structure: "two-variable-square",
      },
      {
        expression: polynomial([[1, "y^2"], [2 * p, "y"], [p * p, ""]]),
        answer: `(${linear("y", p)})^2`,
        structure: "monic-y",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `${answer}+1`,
      `${answer}-1`,
      `-${answer}`,
    ], structure);
  }

  if (kind === "difference-squares") {
    const distance = integer(next, 2, 6);
    const variant = progressionVariant % 4;
    const forms = [
      {
        expression: polynomial([[m * m, "x^2"], [-n * n, ""]]),
        answer: `(${m}x-${n})(${m}x+${n})`,
        structure: "number-and-x",
      },
      {
        expression: polynomial([[m * m, "a^2"], [-n * n, "b^2"]]),
        answer: `(${m}a-${n}b)(${m}a+${n}b)`,
        structure: "two-variable-difference",
      },
      {
        expression: `(${linear("x", p)})^2-${distance ** 2}`,
        answer: `(${linear("x", p - distance)})(${linear("x", p + distance)})`,
        structure: "shifted-square",
      },
      {
        expression: polynomial([[m * m, "x^4"], [-n * n, "y^2"]]),
        answer: `(${m}x^2-${n}y)(${m}x^2+${n}y)`,
        structure: "higher-power-difference",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `${answer}+1`,
      `${answer}-1`,
      `-${answer}`,
    ], structure);
  }

  if (kind === "monic-trinomial") {
    const firstMagnitude = integer(next, 1, 6);
    let secondMagnitude = integer(next, 1, 6);
    while (secondMagnitude === firstMagnitude) secondMagnitude = integer(next, 1, 6);
    const variant = progressionVariant % 4;
    const firstRoot = variant === 1 ? -firstMagnitude : firstMagnitude;
    const secondRoot = variant === 1
      ? -secondMagnitude
      : variant === 2
        ? -secondMagnitude
        : secondMagnitude;
    const variable = variant === 3 ? "y" : "x";
    const expression = polynomial([[1, `${variable}^2`], [firstRoot + secondRoot, variable], [firstRoot * secondRoot, ""]]);
    const answer = `(${linear(variable, firstRoot)})(${linear(variable, secondRoot)})`;
    return make(id, kind, expression, answer, [
      `(${linear(variable, -firstRoot)})(${linear(variable, -secondRoot)})`,
      `(${linear(variable, firstRoot)})(${linear(variable, -secondRoot)})`,
      `(${linear(variable, firstRoot + secondRoot)})(${linear(variable, firstRoot * secondRoot)})`,
    ], ["positive-pair", "negative-pair", "opposite-signs", "other-variable"][variant]);
  }

  if (kind === "nonmonic-trinomial") {
    const a = integer(next, 2, 4);
    const variant = progressionVariant % 4;
    const b = variant === 2 ? 1 : integer(next, 2, 4);
    const firstSign = variant === 1 ? -1 : 1;
    const secondSign = variant === 2 ? -1 : variant === 1 ? -1 : 1;
    const firstConstant = firstSign * Math.abs(coprimeNonzero(next, a, 1, 6));
    const secondConstant = secondSign * Math.abs(coprimeNonzero(next, b, 1, 6));
    const variable = variant === 3 ? "y" : "x";
    const expression = polynomial([[a * b, `${variable}^2`], [a * secondConstant + b * firstConstant, variable], [firstConstant * secondConstant, ""]]);
    const answer = `(${linear(variable, firstConstant, a)})(${linear(variable, secondConstant, b)})`;
    return make(id, kind, expression, answer, [
      `(${linear(variable, -firstConstant, a)})(${linear(variable, -secondConstant, b)})`,
      `(${linear(variable, secondConstant, a)})(${linear(variable, firstConstant, b)})`,
      `(${linear(variable, firstConstant, a * b)})(${linear(variable, secondConstant)})`,
    ], ["both-positive", "both-negative", "mixed-monic", "other-variable"][variant]);
  }

  if (kind === "three-variables") {
    const patterns = [
      ["a^2+ab+ac+bc", "(a+b)(a+c)", "shared-a"],
      ["ab+ac+bd+cd", "(a+d)(b+c)", "four-letter-grouping"],
      ["a^2b+ab^2+a+b", "(a+b)(ab+1)", "mixed-degree"],
      ["a^2-ab+ac-bc", "(a-b)(a+c)", "sign-change"],
      ["ab-ac+bd-cd", "(a+d)(b-c)", "difference-grouping"],
    ] as const;
    const fiveStepVariant = [0, 0, 1, 2, 3, 3, 4, 4][variantHint] ?? variantHint % patterns.length;
    const [expression, answer, structure] = patterns[fiveStepVariant];
    return make(id, kind, expression, answer, [
      "(a+b+c)^2",
      "(a-b)(a-c)",
      "(a+b)(a-c)",
    ], structure);
  }

  if (kind === "cubic-common") {
    const common = integer(next, 2, 5);
    const primitive = coprimeNonzero(next, m, -6, 6);
    const distance = integer(next, 2, 6);
    const variant = progressionVariant % 4;
    const forms = [
      {
        expression: polynomial([[common, "x^3"], [common * (p + q), "x^2"], [common * p * q, "x"]]),
        answer: `${common}x(${linear("x", p)})(${linear("x", q)})`,
        structure: "common-then-trinomial",
      },
      {
        expression: polynomial([[common * m, "x^3"], [common * primitive, "x^2"]]),
        answer: `${common}x^2(${linear("x", primitive, m)})`,
        structure: "x-squared-common",
      },
      {
        expression: polynomial([[common, "x^3"], [-common * distance ** 2, "x"]]),
        answer: `${common}x(x-${distance})(x+${distance})`,
        structure: "common-then-difference",
      },
      {
        expression: polynomial([[common * m, "a^3b"], [common * primitive, "a^2b^2"]]),
        answer: `${common}a^2b(${m}a${signed(primitive)}b)`,
        structure: "multivariable-cubic",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `${answer}+1`,
      `${answer}-1`,
      `-${answer}`,
    ], structure);
  }

  if (kind === "cubic-grouping") {
    const nonsquares = [2, 3, 5, 6, 7] as const;
    const positive = nonsquares[integer(next, 0, nonsquares.length - 1)];
    const variant = progressionVariant % 4;
    const sign = variant === 1 ? -1 : 1;
    const forms = [
      {
        expression: polynomial([[1, "x^3"], [p, "x^2"], [positive, "x"], [p * positive, ""]]),
        answer: `(${linear("x", p)})(x^2+${positive})`,
        structure: "monic-plus",
      },
      {
        expression: polynomial([[1, "x^3"], [p, "x^2"], [-positive, "x"], [-p * positive, ""]]),
        answer: `(${linear("x", p)})(x^2-${positive})`,
        structure: "monic-minus",
      },
      {
        expression: polynomial([[m, "x^3"], [n, "x^2"], [m * positive, "x"], [n * positive, ""]]),
        answer: `(${linear("x", n, m)})(x^2+${positive})`,
        structure: "nonmonic-grouping",
      },
      {
        expression: polynomial([[m, "x^3"], [m * sign * positive, "x"], [n, "x^2"], [n * sign * positive, ""]]),
        answer: `(${linear("x", n, m)})(x^2${sign < 0 ? "-" : "+"}${positive})`,
        structure: "reordered-cubic",
      },
    ];
    const { expression, answer, structure } = forms[variant];
    return make(id, kind, expression, answer, [
      `${answer}+1`,
      `${answer}-1`,
      `-${answer}`,
    ], structure);
  }

  if (kind === "normalize-first") {
    const a = integer(next, 2, 5);
    const variant = ([0, 0, 1, 2, 3, 3, 4, 4][variantHint] ?? variantHint) % 5;

    if (variant === 0) {
      const expression = `${a}x(${linear("x", p)})${signedFactorCoefficient(q)}(${linear("x", p)})`;
      const answer = formatNormalizedLinearCombination(a, q, p);
      return make(id, kind, expression, answer, [
        `(${linear("x", p)})(${linear("x", q, a)})`,
        `(${linear("x", -p)})(${linear("x", q, a)})`,
        `(${linear("x", p)})(${linear("x", -q, a)})`,
      ], "shared-binomial");
    }

    if (variant === 1) {
      const expression = `(${linear("x", p)})^2${signedFactorCoefficient(q)}(${linear("x", p)})`;
      const answer = `(${linear("x", p)})(${linear("x", p + q)})`;
      return make(id, kind, expression, answer, [
        `(${linear("x", p)})(${linear("x", p - q)})`,
        `(${linear("x", -p)})(${linear("x", p + q)})`,
        `(${linear("x", p + q)})^2`,
      ], "square-and-shared-factor");
    }

    if (variant === 2) {
      const distance = integer(next, 2, 6);
      const expression = `(${linear("x", p)})^2-${distance ** 2}`;
      const answer = `(${linear("x", p - distance)})(${linear("x", p + distance)})`;
      return make(id, kind, expression, answer, [
        `(${linear("x", p - distance)})^2`,
        `(${linear("x", p + distance)})^2`,
        `(${linear("x", p - distance ** 2)})(${linear("x", p + distance ** 2)})`,
      ], "shifted-difference-squares");
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
      ], "expanded-four-terms");
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
    ], "sum-of-two-products");
  }

  const comprehensiveKinds = [
    "common-factor",
    "common-factor",
    "perfect-square",
    "difference-squares",
    "nonmonic-trinomial",
    "cubic-common",
    "cubic-grouping",
    "normalize-first",
  ] as const;
  return build(
    comprehensiveKinds[variantHint] ?? comprehensiveKinds[integer(next, 0, comprehensiveKinds.length - 1)],
    next,
    id,
    variantHint,
  );
}

function difficultyForIndex(index: number): MiddleFactorizationDifficulty {
  if (index < 2) return "basic";
  if (index < 5) return "application";
  return "advanced";
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
      {
        ...build(kind, next, `middle-factorization-${kind}-${index}`, index),
        difficulty: difficultyForIndex(index),
      }
    )),
  };
}

export function createMiddleFactorizationReviewProblems(
  kinds: MiddleFactorizationKind[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => (
    {
      ...build(kind, next, `middle-factorization-review-${kind}-${index}-${seed}`, index),
      difficulty: difficultyForIndex(index),
    }
  ));
}
