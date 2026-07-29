export type MiddleCoreKind =
  | "prime-factorization"
  | "gcd-lcm"
  | "linear-expression"
  | "linear-equation"
  | "linear-equation-application"
  | "repeating-decimal"
  | "exponent-laws"
  | "monomial-multiply"
  | "monomial-divide"
  | "polynomial-add-subtract"
  | "linear-inequality"
  | "simultaneous-substitution"
  | "simultaneous-elimination"
  | "square-roots-real"
  | "radical-calculation"
  | "polynomial-multiply"
  | "formula-square"
  | "formula-sum-difference"
  | "formula-comprehensive";

export type MiddleCoreDifficulty = "basic" | "application" | "advanced";

export type MiddleCoreProblem = {
  id: string;
  kind: MiddleCoreKind;
  difficulty: MiddleCoreDifficulty;
  structure: string;
  label: string;
  latex: string;
  answerLatex: string;
  solutionHint: string;
  distractors: string[];
};

export const MIDDLE_CORE_KINDS: MiddleCoreKind[] = [
  "prime-factorization",
  "gcd-lcm",
  "linear-expression",
  "linear-equation",
  "linear-equation-application",
  "repeating-decimal",
  "exponent-laws",
  "monomial-multiply",
  "monomial-divide",
  "polynomial-add-subtract",
  "linear-inequality",
  "simultaneous-substitution",
  "simultaneous-elimination",
  "square-roots-real",
  "radical-calculation",
  "polynomial-multiply",
  "formula-square",
  "formula-sum-difference",
  "formula-comprehensive",
];

export const MIDDLE_CORE_TITLES: Record<MiddleCoreKind, string> = {
  "prime-factorization": "소인수분해",
  "gcd-lcm": "최대공약수와 최소공배수",
  "linear-expression": "일차식의 계산",
  "linear-equation": "일차방정식",
  "linear-equation-application": "일차방정식 활용 계산",
  "repeating-decimal": "유리수와 순환소수",
  "exponent-laws": "지수법칙",
  "monomial-multiply": "단항식의 곱셈",
  "monomial-divide": "단항식의 나눗셈",
  "polynomial-add-subtract": "다항식의 덧셈·뺄셈",
  "linear-inequality": "일차부등식",
  "simultaneous-substitution": "연립일차방정식 대입법",
  "simultaneous-elimination": "연립일차방정식 가감법",
  "square-roots-real": "제곱근과 실수",
  "radical-calculation": "근호를 포함한 식의 계산",
  "polynomial-multiply": "다항식의 곱셈",
  "formula-square": "곱셈공식: 완전제곱식",
  "formula-sum-difference": "곱셈공식: 합과 차",
  "formula-comprehensive": "곱셈공식 종합",
};

const COMPREHENSIVE_PARTS: Exclude<MiddleCoreKind, "formula-comprehensive">[] = [
  "polynomial-multiply",
  "formula-square",
  "formula-sum-difference",
];
const PRIME_PAIRS = [[2, 3], [2, 5], [3, 5], [2, 7]] as const;
const SQUARE_FREE = [2, 3, 5, 6, 7] as const;

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

function nonUnit(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (Math.abs(value) < 2) value = integer(next, minimum, maximum);
  return value;
}

function gcd(left: number, right: number): number {
  return right === 0 ? Math.abs(left) : gcd(right, left % right);
}

function gcdOf(values: number[]) {
  return values.reduce((result, value) => gcd(result, value));
}

function lcmOf(values: number[]) {
  return values.reduce((result, value) => Math.abs(result * value) / gcd(result, value));
}

function fraction(numerator: number, denominator: number) {
  const divisor = gcd(numerator, denominator);
  const top = numerator / divisor;
  const bottom = denominator / divisor;
  if (bottom === 1) return `${top}`;
  return `\\dfrac{${top}}{${bottom}}`;
}

function signed(value: number) {
  if (value === 0) return "";
  return value > 0 ? `+${value}` : `${value}`;
}

function coefficient(value: number, symbol: string) {
  if (value === 0) return "";
  if (value === 1) return symbol;
  if (value === -1) return `-${symbol}`;
  return `${value}${symbol}`;
}

function linear(a: number, b = 0, variable = "x") {
  const first = coefficient(a, variable);
  if (!first) return `${b}`;
  return `${first}${signed(b)}`;
}

function polynomial2(a: number, b: number, c: number) {
  const parts: string[] = [];
  if (a !== 0) parts.push(coefficient(a, "x^2"));
  if (b !== 0) {
    const term = coefficient(Math.abs(b), "x");
    parts.push(parts.length === 0 ? coefficient(b, "x") : b > 0 ? `+${term}` : `-${term}`);
  }
  if (c !== 0) parts.push(parts.length === 0 ? `${c}` : signed(c));
  return parts.join("") || "0";
}

function monomial(coef: number, xPower: number, yPower = 0) {
  const symbols = `${xPower === 0 ? "" : xPower === 1 ? "x" : `x^{${xPower}}`}${yPower === 0 ? "" : yPower === 1 ? "y" : `y^{${yPower}}`}`;
  return symbols ? coefficient(coef, symbols) : `${coef}`;
}

function multipliedGroup(value: number, contents: string) {
  if (value === 1) return `(${contents})`;
  if (value === -1) return `-(${contents})`;
  return `${value}(${contents})`;
}

function factor(prime: number, exponent: number) {
  return exponent === 1 ? `${prime}` : `${prime}^{${exponent}}`;
}

function uniqueDistractors(answer: string, candidates: string[]) {
  const unique = [...new Set(candidates.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "-1", "2", "x", "-x", "x^2", "\\text{해 없음}"]) {
    if (unique.length === 3) break;
    if (fallback !== answer && !unique.includes(fallback)) unique.push(fallback);
  }
  return unique.slice(0, 3);
}

function difficultyForIndex(index: number): MiddleCoreDifficulty {
  if (index < 2) return "basic";
  if (index < 5) return "application";
  return "advanced";
}

function make(
  id: string,
  kind: MiddleCoreKind,
  latex: string,
  answerLatex: string,
  solutionHint: string,
  distractors: string[],
  structure = kind,
  label = MIDDLE_CORE_TITLES[kind],
): MiddleCoreProblem {
  return {
    id,
    kind,
    difficulty: "basic",
    structure,
    label,
    latex,
    answerLatex,
    solutionHint,
    distractors: uniqueDistractors(answerLatex, distractors),
  };
}

function build(
  kind: Exclude<MiddleCoreKind, "formula-comprehensive">,
  next: () => number,
  id: string,
  index: number,
): MiddleCoreProblem {
  if (kind === "prime-factorization") {
    const [p, q] = PRIME_PAIRS[index % PRIME_PAIRS.length];
    const pExponent = 1 + (index % 3);
    const qExponent = 1 + (Math.floor(index / 2) % 2);
    const value = p ** pExponent * q ** qExponent;
    const answer = `${factor(p, pExponent)}\\times${factor(q, qExponent)}`;
    return make(id, kind, `${value}`, answer,
      `${value}을 소수로 계속 나누어 ${p}와 ${q}의 거듭제곱 곱으로 나타낸다.`,
      [
        `${factor(p, pExponent + 1)}\\times${factor(q, qExponent)}`,
        `${factor(p, pExponent)}\\times${factor(q, qExponent + 1)}`,
        `${p * q}^{${Math.max(pExponent, qExponent)}}`,
      ],
      `primes-${p}-${q}`);
  }

  if (kind === "gcd-lcm") {
    const exercises = [
      { values: [72, 108], mode: "gcd", structure: "two-gcd", label: "두 수의 최대공약수" },
      { values: [84, 126], mode: "lcm", structure: "two-lcm", label: "두 수의 최소공배수" },
      { values: [120, 168], mode: "both", structure: "two-both", label: "두 수의 소인수분해" },
      { values: [72, 108, 180], mode: "gcd", structure: "three-gcd", label: "세 수의 최대공약수" },
      { values: [60, 84, 90], mode: "lcm", structure: "three-lcm", label: "세 수의 최소공배수" },
      {
        values: [144, 540], mode: "both", structure: "factored-two-both", label: "소인수 지수 비교",
        display: ["2^4\\times3^2", "2^2\\times3^3\\times5"],
      },
      {
        values: [144, 216, 180], mode: "gcd", structure: "factored-three-gcd", label: "소인수 지수 비교",
        display: ["2^4\\times3^2", "2^3\\times3^3", "2^2\\times3^2\\times5"],
      },
      {
        values: [72, 540, 450], mode: "lcm", structure: "factored-three-lcm", label: "소인수 지수 비교",
        display: ["2^3\\times3^2", "2^2\\times3^3\\times5", "2\\times3^2\\times5^2"],
      },
    ] as const;
    const exercise = exercises[index];
    const values = [...exercise.values];
    const greatest = gcdOf(values);
    const least = lcmOf(values);
    const answer = exercise.mode === "gcd"
      ? `${greatest}`
      : exercise.mode === "lcm"
        ? `${least}`
        : `\\text{최대공약수 }${greatest},\\quad\\text{최소공배수 }${least}`;
    const request = exercise.mode === "gcd"
      ? "\\text{최대공약수를 구하여라.}"
      : exercise.mode === "lcm"
        ? "\\text{최소공배수를 구하여라.}"
        : "\\text{최대공약수와 최소공배수를 모두 구하여라.}";
    const displayedValues = "display" in exercise
      ? exercise.display
      : exercise.values.map((value) => `${value}`);
    const latex = `\\begin{gathered}${displayedValues.join(",\\quad")}\\\\${request}\\end{gathered}`;
    return make(
      id,
      kind,
      latex,
      answer,
      "각 수를 소인수분해한 뒤 최대공약수는 공통 소인수의 작은 지수, 최소공배수는 모든 소인수의 큰 지수를 택한다.",
      exercise.mode === "both"
        ? [
          `\\text{최대공약수 }${greatest * 2},\\quad\\text{최소공배수 }${least}`,
          `\\text{최대공약수 }${greatest},\\quad\\text{최소공배수 }${Math.floor(least / 2)}`,
          `\\text{최대공약수 }${greatest},\\quad\\text{최소공배수 }${values.reduce((product, value) => product * value)}`,
        ]
        : exercise.mode === "gcd"
          ? [`${greatest * 2}`, `${greatest * 3}`, `${least}`]
          : [`${Math.floor(least / 2)}`, `${least * 2}`, `${greatest}`],
      exercise.structure,
      exercise.label,
    );
  }

  if (kind === "linear-expression") {
    const mode = index % 4;
    const a = mode === 0 ? nonzero(next, -7, 7) : nonUnit(next, -7, 7);
    const b = nonzero(next, -6, 6);
    const c = mode === 0 ? nonzero(next, -5, 5) : nonUnit(next, -5, 5);
    const d = mode === 2 ? nonzero(next, -8, 8) : integer(next, -8, 8);
    if (mode === 0) {
      const answer = linear(a + b, d);
      return make(id, kind, `${linear(a, d)}${b > 0 ? "+" : ""}${coefficient(b, "x")}`, answer,
        "x항끼리 계수를 더하고 상수항은 그대로 둔다.",
        [linear(a - b, d), linear(a + b, -d), linear(a * b, d)], "combine-like-terms");
    }
    if (mode === 1) {
      const answer = linear(a + c, a * b);
      return make(id, kind, `${a}(x${signed(b)})${c > 0 ? "+" : ""}${coefficient(c, "x")}`, answer,
        "괄호 앞의 수를 분배한 뒤 x항끼리 합친다.",
        [linear(a + c, b), linear(a * c, a * b), linear(a - c, a * b)], "distribute-add");
    }
    if (mode === 2) {
      const answer = linear(a - c, a * b + c * d);
      const secondGroup = multipliedGroup(-c, `x${signed(-d)}`);
      return make(id, kind, `${multipliedGroup(a, `x${signed(b)}`)}${secondGroup.startsWith("-") ? "" : "+"}${secondGroup}`, answer,
        "두 괄호를 각각 분배하고 동류항을 정리한다.",
        [linear(a + c, a * b - c * d), linear(a - c, a * b - c * d), linear(a * c, b + d)], "distribute-subtract");
    }
    const answer = linear(a * b + c, a * d);
    return make(id, kind, `${a}(${linear(b, d)})${c > 0 ? "+" : ""}${coefficient(c, "x")}`, answer,
      "괄호를 먼저 분배하고 x항과 상수항을 각각 정리한다.",
      [linear(a * b - c, a * d), linear(a + b + c, d), linear(a * b + c, d)], "nested-linear");
  }

  if (kind === "linear-equation") {
    const solution = nonzero(next, -8, 8);
    const mode = index % 3;
    const a = nonzero(next, 2, 8);
    let c = nonzero(next, -6, 6);
    while (c === a) c = nonzero(next, -6, 6);
    const b = integer(next, -9, 9);
    if (mode === 0) {
      const d = (a - c) * solution + b;
      return make(id, kind, `${linear(a, b)}=${linear(c, d)}`, `x=${solution}`,
        "x항은 한쪽으로, 상수항은 반대쪽으로 이항한 뒤 x의 계수로 나눈다.",
        [`x=${-solution}`, `x=${solution + 1}`, `x=${solution - 1}`], "both-sides");
    }
    const shift = integer(next, -5, 5);
    const right = a * (solution + shift);
    if (mode === 1) {
      return make(id, kind, `${a}(x${signed(shift)})=${right}`, `x=${solution}`,
        "양변을 괄호 앞의 수로 나눈 뒤 괄호 안의 상수를 이항한다.",
        [`x=${-solution}`, `x=${solution + shift}`, `x=${right - shift}`], "parentheses");
    }
    const denominator = 2 + (index % 4);
    const numeratorRight = solution + shift;
    return make(id, kind, `\\dfrac{x${signed(shift)}}{${denominator}}=${fraction(numeratorRight, denominator)}`, `x=${solution}`,
      "양변에 분모를 곱해 없앤 뒤 상수항을 이항한다.",
      [`x=${-solution}`, `x=${solution + shift}`, `x=${solution + denominator}`], "fraction-equation");
  }

  if (kind === "linear-equation-application") {
    const solution = 4 + index + integer(next, 0, 3);
    const mode = index % 4;
    if (mode === 0) {
      return make(id, kind, `\\text{연속한 두 정수의 합이 }${solution * 2 + 1},\\quad \\text{작은 수 }x`, `x=${solution}`,
        `x+(x+1)=${solution * 2 + 1}을 세워 푼다.`,
        [`x=${solution + 1}`, `x=${solution - 1}`, `x=${solution * 2}`], "consecutive");
    }
    if (mode === 1) {
      const multiple = 2 + (index % 3);
      return make(id, kind, `\\text{어떤 수와 그 수의 }${multiple}\\text{배의 합이 }${solution * (multiple + 1)},\\quad x`, `x=${solution}`,
        `x+${multiple}x=${solution * (multiple + 1)}을 세워 x를 구한다.`,
        [`x=${solution * multiple}`, `x=${solution + multiple}`, `x=${solution - 1}`], "multiple-sum");
    }
    if (mode === 2) {
      const gap = 3 + (index % 5);
      const perimeter = 2 * (solution + solution + gap);
      return make(id, kind, `\\text{가로 }x,\\ \\text{세로 }x+${gap}\\text{인 직사각형의 둘레가 }${perimeter}`, `x=${solution}`,
        `2\\{x+(x+${gap})\\}=${perimeter}을 세워 푼다.`,
        [`x=${solution + gap}`, `x=${solution * 2}`, `x=${solution - gap}`], "rectangle");
    }
    const gap = 5 + (index % 4);
    return make(id, kind, `\\text{두 수의 차가 }${gap}\\text{이고 합이 }${solution * 2 + gap},\\quad \\text{작은 수 }x`, `x=${solution}`,
      `x+(x+${gap})=${solution * 2 + gap}을 세워 푼다.`,
      [`x=${solution + gap}`, `x=${solution - gap}`, `x=${solution * 2}`], "sum-difference");
  }

  if (kind === "repeating-decimal") {
    const mode = index % 4;
    if (mode === 0) {
      const digit = 1 + ((index + integer(next, 0, 3)) % 8);
      const answer = fraction(digit, 9);
      return make(id, kind, `0.\\overline{${digit}}`, answer,
        `x=0.\\overline{${digit}}로 놓고 10x-x=${digit}을 이용한다.`,
        [fraction(digit, 10), fraction(digit, 99), `${digit}`], "one-digit");
    }
    if (mode === 1) {
      const value = 12 + index * 7 + integer(next, 0, 5);
      const answer = fraction(value, 99);
      return make(id, kind, `0.\\overline{${value}}`, answer,
        `x=0.\\overline{${value}}로 놓고 100x-x=${value}을 이용한다.`,
        [fraction(value, 100), fraction(value, 9), fraction(value, 90)], "two-digit");
    }
    if (mode === 2) {
      const first = 1 + (index % 7);
      const repeat = 1 + ((index + 3) % 8);
      const numerator = first * 9 + repeat;
      const answer = fraction(numerator, 90);
      return make(id, kind, `0.${first}\\overline{${repeat}}`, answer,
        `100x-10x=${first * 10 + repeat}-${first}를 이용해 분수로 고친다.`,
        [fraction(first * 10 + repeat, 99), fraction(numerator, 99), fraction(first * 10 + repeat, 90)], "mixed-repeat");
    }
    const value = 123 + index * 11;
    const answer = fraction(value, 999);
    return make(id, kind, `0.\\overline{${value}}`, answer,
      `1000x-x=${value}을 이용해 x를 분수로 나타내고 약분한다.`,
      [fraction(value, 1000), fraction(value, 99), fraction(value, 900)], "three-digit");
  }

  if (kind === "exponent-laws") {
    const m = 2 + (index % 5);
    const n = 2 + ((index + 2) % 4);
    const mode = index % 5;
    if (mode === 0) {
      return make(id, kind, `x^{${m}}\\times x^{${n}}`, `x^{${m + n}}`,
        "밑이 같으므로 지수를 더한다.",
        [`x^{${m * n}}`, `x^{${Math.abs(m - n)}}`, `2x^{${m + n}}`], "multiply");
    }
    if (mode === 1) {
      return make(id, kind, `x^{${m + n}}\\div x^{${n}}`, `x^{${m}}`,
        "밑이 같으므로 나누기에서는 지수를 뺀다.",
        [`x^{${m + 2 * n}}`, `x^{${n}}`, `x^{${m * n}}`], "divide");
    }
    if (mode === 2) {
      return make(id, kind, `\\left(x^{${m}}\\right)^{${n}}`, `x^{${m * n}}`,
        "거듭제곱의 거듭제곱은 지수를 곱한다.",
        [`x^{${m + n}}`, `x^{${m ** 2}}`, `${n}x^{${m}}`], "power");
    }
    if (mode === 3) {
      return make(id, kind, `\\left(x^{${m}}y^{${n}}\\right)^2`, `x^{${m * 2}}y^{${n * 2}}`,
        "괄호 안의 각 문자의 지수에 바깥 지수 2를 곱한다.",
        [`x^{${m + 2}}y^{${n + 2}}`, `x^{${m * 2}}y^{${n}}`, `2x^{${m}}y^{${n}}`], "two-variables-power");
    }
    return make(id, kind, `x^{${m}}y^{${n}}\\times x^2y^3`, `x^{${m + 2}}y^{${n + 3}}`,
      "같은 문자끼리 지수를 각각 더한다.",
      [`x^{${m * 2}}y^{${n * 3}}`, `x^{${m + 3}}y^{${n + 2}}`, `x^{${m}}y^{${n + 5}}`], "two-variables-multiply");
  }

  if (kind === "monomial-multiply") {
    const a = nonzero(next, -7, 7);
    const b = nonzero(next, 2, 7);
    const m = 1 + (index % 4);
    const n = 1 + ((index + 1) % 3);
    const p = 1 + ((index + 2) % 4);
    const q = index % 3;
    const answer = monomial(a * b, m + p, n + q);
    return make(id, kind, `(${monomial(a, m, n)})(${monomial(b, p, q)})`, answer,
      "계수끼리 곱하고 같은 문자의 지수끼리 더한다.",
      [monomial(a + b, m + p, n + q), monomial(a * b, m * p, n + q), monomial(a * b, m + p, n * Math.max(1, q))],
      q === 0 ? "one-variable-second" : "two-variables");
  }

  if (kind === "monomial-divide") {
    const divisorCoef = nonzero(next, 2, 6);
    const quotientCoef = nonzero(next, -6, 6);
    const divisorX = 1 + (index % 3);
    const divisorY = index % 2;
    const quotientX = 1 + ((index + 1) % 4);
    const quotientY = 1 + ((index + 2) % 3);
    const dividend = monomial(divisorCoef * quotientCoef, divisorX + quotientX, divisorY + quotientY);
    const divisor = monomial(divisorCoef, divisorX, divisorY);
    const answer = monomial(quotientCoef, quotientX, quotientY);
    return make(id, kind, `${dividend}\\div(${divisor})`, answer,
      "계수끼리 나누고 같은 문자의 지수끼리 뺀다.",
      [monomial(divisorCoef * quotientCoef, quotientX, quotientY), monomial(quotientCoef, divisorX + quotientX, divisorY + quotientY), monomial(-quotientCoef, quotientX, quotientY)],
      divisorY === 0 ? "single-divisor-variable" : "two-divisor-variables");
  }

  if (kind === "polynomial-add-subtract") {
    const a = nonzero(next, -5, 5);
    const b = nonzero(next, -7, 7);
    const c = integer(next, -9, 9);
    const d = nonzero(next, -5, 5);
    const e = nonzero(next, -7, 7);
    const f = integer(next, -9, 9);
    const subtract = index % 2 === 1;
    const answer = polynomial2(a + (subtract ? -d : d), b + (subtract ? -e : e), c + (subtract ? -f : f));
    return make(id, kind,
      `(${polynomial2(a, b, c)})${subtract ? "-" : "+"}(${polynomial2(d, e, f)})`,
      answer,
      subtract ? "두 번째 괄호의 각 항의 부호를 바꾼 뒤 동류항끼리 계산한다." : "같은 차수의 동류항끼리 계수를 더한다.",
      [
        polynomial2(a + d, b + e, c + f),
        polynomial2(a - d, b - e, c - f),
        polynomial2(a + (subtract ? -d : d), b + (subtract ? e : -e), c + (subtract ? -f : f)),
      ],
      subtract ? "subtract" : "add");
  }

  if (kind === "linear-inequality") {
    const boundary = nonzero(next, -7, 7);
    const a = index % 2 === 0 ? 2 + (index % 5) : -(2 + (index % 5));
    const b = integer(next, -9, 9);
    const right = a * boundary + b;
    const inclusive = index % 4 >= 2;
    const sign = inclusive ? "\\le" : "<";
    const answerSign = a > 0 ? sign : inclusive ? "\\ge" : ">";
    return make(id, kind, `${linear(a, b)}${sign}${right}`, `x${answerSign}${boundary}`,
      a > 0 ? "상수항을 이항한 뒤 양수인 x의 계수로 나눈다." : "음수인 x의 계수로 나눌 때 부등호 방향을 바꾼다.",
      [`x${sign}${boundary}`, `x${a > 0 ? ">" : "<"}${boundary}`, `x${answerSign}${-boundary}`],
      `${a > 0 ? "positive" : "negative"}-${inclusive ? "inclusive" : "strict"}`);
  }

  if (kind === "simultaneous-substitution") {
    const x = nonzero(next, -6, 6);
    const y = nonzero(next, -7, 7);
    const p = nonzero(next, -4, 4);
    const a = nonzero(next, 2, 6);
    const b = nonzero(next, -5, 5);
    if (index % 2 === 0) {
      const q = y - p * x;
      const total = a * x + b * y;
      return make(id, kind,
        `\\begin{cases}y=${linear(p, q)}\\\\${linear(a, 0)}${b > 0 ? "+" : ""}${coefficient(b, "y")}=${total}\\end{cases}`,
        `(x,y)=(${x},${y})`,
        "첫째 식의 y를 둘째 식에 대입해 x를 구한 뒤 y를 계산한다.",
        [`(x,y)=(${y},${x})`, `(x,y)=(${-x},${y})`, `(x,y)=(${x},${-y})`], "substitute-y");
    }
    const q = x - p * y;
    const total = a * x + b * y;
    return make(id, kind,
      `\\begin{cases}x=${linear(p, q, "y")}\\\\${linear(a, 0)}${b > 0 ? "+" : ""}${coefficient(b, "y")}=${total}\\end{cases}`,
      `(x,y)=(${x},${y})`,
      "첫째 식의 x를 둘째 식에 대입해 y를 구한 뒤 x를 계산한다.",
      [`(x,y)=(${y},${x})`, `(x,y)=(${-x},${y})`, `(x,y)=(${x},${-y})`], "substitute-x");
  }

  if (kind === "simultaneous-elimination") {
    const x = nonzero(next, -6, 6);
    const y = nonzero(next, -7, 7);
    const a = 2 + (index % 4);
    const b = 1 + ((index + 1) % 5);
    const c = 1 + ((index + 2) % 4);
    if (index % 2 === 0) {
      const first = a * x + b * y;
      const second = a * x - c * y;
      return make(id, kind,
        `\\begin{cases}${coefficient(a, "x")}+${coefficient(b, "y")}=${first}\\\\${coefficient(a, "x")}-${coefficient(c, "y")}=${second}\\end{cases}`,
        `(x,y)=(${x},${y})`,
        "두 식을 빼서 x항을 없애고 y를 구한 뒤 한 식에 대입한다.",
        [`(x,y)=(${y},${x})`, `(x,y)=(${-x},${y})`, `(x,y)=(${x},${-y})`], "eliminate-x");
    }
    const first = a * x + b * y;
    const second = -c * x + b * y;
    return make(id, kind,
      `\\begin{cases}${coefficient(a, "x")}+${coefficient(b, "y")}=${first}\\\\${coefficient(-c, "x")}+${coefficient(b, "y")}=${second}\\end{cases}`,
      `(x,y)=(${x},${y})`,
      "두 식을 빼서 y항을 없애고 x를 구한 뒤 한 식에 대입한다.",
      [`(x,y)=(${y},${x})`, `(x,y)=(${-x},${y})`, `(x,y)=(${x},${-y})`], "eliminate-y");
  }

  if (kind === "square-roots-real") {
    const mode = index % 4;
    const root = 2 + index;
    const squareFree = SQUARE_FREE[index % SQUARE_FREE.length];
    if (mode === 0) {
      return make(id, kind, `\\sqrt{${root * root * squareFree}}`, `${root}\\sqrt{${squareFree}}`,
        `근호 안의 제곱인수 ${root * root}을 밖으로 꺼낸다.`,
        [`${root * squareFree}`, `\\sqrt{${root * squareFree}}`, `${squareFree}\\sqrt{${root}}`], "simplify-radical");
    }
    if (mode === 1) {
      return make(id, kind, `\\sqrt{${root * root}}`, `${root}`,
        `양수 ${root}의 제곱이 ${root * root}이므로 주어진 제곱근의 값은 ${root}이다.`,
        [`${-root}`, `\\pm${root}`, `${root * root}`], "perfect-square-root");
    }
    if (mode === 2) {
      const left = squareFree;
      const right = squareFree * 4;
      return make(id, kind, `\\sqrt{${left}}\\times\\sqrt{${right}}`, `${left * 2}`,
        `한 근호로 합쳐 \\sqrt{${left * right}}을 계산한다.`,
        [`${left * 4}`, `${left}\\sqrt{2}`, `\\sqrt{${left + right}}`], "radical-product");
    }
    return make(id, kind, `\\sqrt{(${root})^2}`, `${root}`,
      "제곱한 양수의 제곱근은 원래 양수와 같다.",
      [`${-root}`, `\\pm${root}`, `${root * root}`], "square-under-root");
  }

  if (kind === "radical-calculation") {
    const mode = index % 4;
    const n = SQUARE_FREE[index % SQUARE_FREE.length];
    const a = 2 + (index % 5);
    const b = 1 + ((index + 2) % 4);
    if (mode === 0) {
      return make(id, kind, `${a}\\sqrt{${n}}+${b}\\sqrt{${n}}`, `${a + b}\\sqrt{${n}}`,
        "근호 안이 같은 항끼리 근호 앞의 계수를 더한다.",
        [`${a * b}\\sqrt{${n}}`, `${a + b}\\sqrt{${n * 2}}`, `${a - b}\\sqrt{${n}}`], "like-radicals-add");
    }
    if (mode === 1) {
      return make(id, kind, `${a + b}\\sqrt{${n}}-${b}\\sqrt{${n}}`, `${a}\\sqrt{${n}}`,
        "근호 안이 같은 항끼리 근호 앞의 계수를 뺀다.",
        [`${a + 2 * b}\\sqrt{${n}}`, `${a}\\sqrt{${n * 2}}`, `${b}\\sqrt{${n}}`], "like-radicals-subtract");
    }
    if (mode === 2) {
      return make(id, kind, `\\sqrt{${n}}\\times\\sqrt{${n * 4}}`, `${n * 2}`,
        `근호를 합쳐 \\sqrt{${n * n * 4}}을 계산한다.`,
        [`${n * 4}`, `${n}\\sqrt{2}`, `\\sqrt{${n * 5}}`], "radical-multiply");
    }
    const constant = n + a;
    return make(id, kind, `(${constant}+\\sqrt{${n}})(${constant}-\\sqrt{${n}})`, `${constant * constant - n}`,
      "합과 차의 곱을 이용해 앞 수의 제곱에서 근호 안의 수를 뺀다.",
      [`${constant * constant + n}`, `${constant - n}`, `${constant * constant}`], "conjugates");
  }

  if (kind === "polynomial-multiply") {
    const mode = index % 3;
    const a = nonzero(next, -5, 5);
    const b = nonzero(next, -7, 7);
    const c = nonzero(next, -5, 5);
    const d = nonzero(next, -7, 7);
    if (mode === 0) {
      const answer = polynomial2(a * c, a * d, 0);
      return make(id, kind, `${coefficient(a, "x")}(${linear(c, d)})`, answer,
        "단항식을 괄호 안의 두 항에 각각 분배한다.",
        [polynomial2(a * c, d, 0), polynomial2(a + c, a * d, 0), polynomial2(a * c, a + d, 0)], "monomial-binomial");
    }
    const answer = polynomial2(a * c, a * d + b * c, b * d);
    return make(id, kind, `(${linear(a, b)})(${linear(c, d)})`, answer,
      "두 일차식의 각 항을 모두 곱한 뒤 가운데 항을 합친다.",
      [
        polynomial2(a * c, a * d - b * c, b * d),
        polynomial2(a * c, a * d + b * c, b + d),
        polynomial2(a + c, a * d + b * c, b * d),
      ],
      mode === 1 ? "binomial-binomial" : "signed-binomial");
  }

  if (kind === "formula-square") {
    const a = 1 + (index % 4);
    const b = index < 4 ? -integer(next, 2, 7) : integer(next, 2, 7);
    const answer = polynomial2(a * a, 2 * a * b, b * b);
    return make(id, kind, `(${linear(a, b)})^2`, answer,
      "첫째 항의 제곱, 두 항의 곱의 2배, 둘째 항의 제곱 순서로 전개한다.",
      [
        polynomial2(a * a, a * b, b * b),
        polynomial2(a * a, -2 * a * b, b * b),
        polynomial2(a * a, 2 * a * b, -b * b),
      ],
      b > 0 ? "plus-square" : "minus-square");
  }

  const a = 1 + (index % 5);
  const b = 2 + ((index + 1) % 7);
  return make(id, kind, `(${linear(a, b)})(${linear(a, -b)})`, polynomial2(a * a, 0, -b * b),
    "합과 차의 곱은 두 항의 제곱의 차로 계산한다.",
    [
      polynomial2(a * a, 0, b * b),
      polynomial2(a * a, -2 * a * b, b * b),
      polynomial2(a, 0, -b),
    ],
    a === 1 ? "unit-leading" : "nonunit-leading");
}

function actualKind(kind: MiddleCoreKind, index: number): Exclude<MiddleCoreKind, "formula-comprehensive"> {
  if (kind !== "formula-comprehensive") return kind;
  return COMPREHENSIVE_PARTS[index % COMPREHENSIVE_PARTS.length];
}

export function isMiddleCoreKind(value: string | null): value is MiddleCoreKind {
  return MIDDLE_CORE_KINDS.includes(value as MiddleCoreKind);
}

export function createMiddleCoreProblemSet(kind: MiddleCoreKind, seed: number) {
  const next = random(seed);
  const signatures = new Set<string>();
  const problems = Array.from({ length: 8 }, (_, index) => {
    let problem = build(actualKind(kind, index), next, `middle-core-${kind}-${index}`, index);
    let signature = `${problem.latex}|${problem.answerLatex}`;
    for (let attempt = 0; signatures.has(signature) && attempt < 20; attempt += 1) {
      problem = build(actualKind(kind, index), next, `middle-core-${kind}-${index}`, index);
      signature = `${problem.latex}|${problem.answerLatex}`;
    }
    signatures.add(signature);
    return { ...problem, difficulty: difficultyForIndex(index) };
  });
  return {
    seed,
    kind,
    problems,
  };
}

export function createMiddleCoreReviewProblems(wrongKinds: MiddleCoreKind[], seed: number) {
  const uniqueKinds = [...new Set(wrongKinds)].slice(0, 2);
  const next = random(seed);
  return uniqueKinds.map((kind, index) => ({
    ...build(actualKind(kind, 6 + index), next, `middle-core-review-${seed}-${index}`, 6 + index),
    difficulty: "advanced" as const,
  }));
}
