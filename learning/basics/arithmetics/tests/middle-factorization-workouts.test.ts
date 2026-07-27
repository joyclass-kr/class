import assert from "node:assert/strict";
import test from "node:test";

import {
  createMiddleFactorizationProblemSet,
  createMiddleFactorizationReviewProblems,
  formatNormalizedLinearCombination,
  MIDDLE_FACTORIZATION_KINDS,
  MIDDLE_FACTORIZATION_TITLES,
} from "../lib/middle-factorization-workouts.ts";

type Polynomial = Map<string, bigint>;

const constantPolynomial = (value: bigint): Polynomial => (
  value === 0n ? new Map() : new Map([["", value]])
);

function monomialKey(variables: Record<string, number>) {
  return Object.entries(variables)
    .filter(([, exponent]) => exponent !== 0)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([variable, exponent]) => `${variable}${exponent}`)
    .join(",");
}

function multiplyMonomialKeys(left: string, right: string) {
  const variables: Record<string, number> = {};
  for (const key of [left, right]) {
    if (!key) continue;
    for (const part of key.split(",")) {
      const match = /^([a-z])(\d+)$/.exec(part);
      assert.ok(match, `invalid monomial key: ${part}`);
      variables[match[1]] = (variables[match[1]] ?? 0) + Number(match[2]);
    }
  }
  return monomialKey(variables);
}

function addPolynomials(left: Polynomial, right: Polynomial, sign = 1n) {
  const result = new Map(left);
  for (const [key, coefficient] of right) {
    const next = (result.get(key) ?? 0n) + sign * coefficient;
    if (next === 0n) result.delete(key);
    else result.set(key, next);
  }
  return result;
}

function multiplyPolynomials(left: Polynomial, right: Polynomial) {
  const result: Polynomial = new Map();
  for (const [leftKey, leftCoefficient] of left) {
    for (const [rightKey, rightCoefficient] of right) {
      const key = multiplyMonomialKeys(leftKey, rightKey);
      const coefficient = (result.get(key) ?? 0n) + leftCoefficient * rightCoefficient;
      if (coefficient === 0n) result.delete(key);
      else result.set(key, coefficient);
    }
  }
  return result;
}

function powerPolynomial(base: Polynomial, exponent: number) {
  let result = constantPolynomial(1n);
  for (let index = 0; index < exponent; index += 1) {
    result = multiplyPolynomials(result, base);
  }
  return result;
}

function parsePolynomial(source: string): Polynomial {
  const tokens = source.replace(/\s+/g, "").match(/\d+|[a-z]|[()+\-*^]/g) ?? [];
  assert.equal(tokens.join(""), source.replace(/\s+/g, ""), `unsupported formula: ${source}`);
  let position = 0;

  const startsFactor = () => (
    position < tokens.length
    && (/^\d+$/.test(tokens[position]) || /^[a-z]$/.test(tokens[position]) || tokens[position] === "(")
  );

  const parseAtom = (): Polynomial => {
    const token = tokens[position++];
    assert.ok(token, `unexpected end of formula: ${source}`);
    let result: Polynomial;
    if (/^\d+$/.test(token)) {
      result = constantPolynomial(BigInt(token));
    } else if (/^[a-z]$/.test(token)) {
      result = new Map([[monomialKey({ [token]: 1 }), 1n]]);
    } else {
      assert.equal(token, "(", `unexpected token ${token} in ${source}`);
      result = parseSum();
      assert.equal(tokens[position++], ")", `unclosed parenthesis in ${source}`);
    }
    if (tokens[position] === "^") {
      position += 1;
      const exponent = Number(tokens[position++]);
      assert.ok(Number.isInteger(exponent) && exponent >= 0, `invalid exponent in ${source}`);
      result = powerPolynomial(result, exponent);
    }
    return result;
  };

  const parseProduct = (): Polynomial => {
    let result = parseAtom();
    while (tokens[position] === "*" || startsFactor()) {
      if (tokens[position] === "*") position += 1;
      result = multiplyPolynomials(result, parseAtom());
    }
    return result;
  };

  const parseSignedProduct = (): Polynomial => {
    if (tokens[position] === "+") position += 1;
    if (tokens[position] !== "-") return parseProduct();
    position += 1;
    return multiplyPolynomials(constantPolynomial(-1n), parseProduct());
  };

  const parseSum = (): Polynomial => {
    let result = parseSignedProduct();
    while (tokens[position] === "+" || tokens[position] === "-") {
      const operator = tokens[position++];
      result = addPolynomials(result, parseProduct(), operator === "+" ? 1n : -1n);
    }
    return result;
  };

  const result = parseSum();
  assert.equal(position, tokens.length, `unparsed token ${tokens[position]} in ${source}`);
  return result;
}

function normalizedPolynomial(polynomial: Polynomial) {
  return [...polynomial.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, coefficient]) => `${coefficient}:${key}`)
    .join("|");
}

test("인수분해 13개 세부 유형이 각각 8문제를 생성한다", () => {
  assert.equal(MIDDLE_FACTORIZATION_KINDS.length, 13);
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    const problemSet = createMiddleFactorizationProblemSet(kind, 20260727);
    assert.equal(problemSet.problems.length, 8);
    assert.ok(problemSet.problems.every((problem) => problem.kind === kind || kind === "comprehensive"));
    assert.ok(problemSet.problems.every((problem) => problem.label === MIDDLE_FACTORIZATION_TITLES[problem.kind]));
  }
});

test("모든 인수분해 정답을 전개하면 출제식과 정확히 일치한다", () => {
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    for (let seed = 1; seed <= 200; seed += 1) {
      for (const problem of createMiddleFactorizationProblemSet(kind, seed).problems) {
        assert.equal(
          normalizedPolynomial(parsePolynomial(problem.answerLatex)),
          normalizedPolynomial(parsePolynomial(problem.latex)),
          `${kind}/${seed}/${problem.structure}: ${problem.latex} != ${problem.answerLatex}`,
        );
      }
    }
  }
});

test("각 인수분해 학습지는 기본에서 응용과 고난도 순서로 진행한다", () => {
  const expected = [
    "basic",
    "basic",
    "application",
    "application",
    "application",
    "advanced",
    "advanced",
    "advanced",
  ];

  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    const problems = createMiddleFactorizationProblemSet(kind, 20260728).problems;
    assert.deepEqual(
      problems.map(({ difficulty }) => difficulty),
      expected,
      `${kind} difficulty order`,
    );
    if (kind !== "comprehensive") {
      assert.equal(
        new Set(problems.slice(0, 2).map(({ structure }) => structure)).size,
        1,
        `${kind} should begin with two repetitions of its foundational structure`,
      );
    }
  }
});

test("세 문자식은 ab, bc, ca가 섞인 묶어내기부터 세 일차인수까지 확장한다", () => {
  const problems = createMiddleFactorizationProblemSet("three-variables", 20260728).problems;

  assert.equal(new Set(problems.map(({ structure }) => structure)).size, 7);
  assert.ok(problems.some(({ structure }) => structure === "ab-bc-ca-pattern"));
  assert.ok(problems.some(({ structure }) => structure === "three-variable-common-factor"));
  assert.equal(problems.at(-1)?.structure, "cyclic-three-factors");
  assert.match(problems.at(-1)?.answerLatex ?? "", /(?:^\d+)?\([a-z][+-][a-z]\)\([a-z][+-][a-z]\)\([a-z][+-][a-z]\)$/);
});

test("세제곱의 합과 차는 공식부터 공통인수와 고차식 결합까지 독립 훈련한다", () => {
  const problems = createMiddleFactorizationProblemSet("cubic-sum-difference", 20260728).problems;

  assert.equal(problems.length, 8);
  assert.equal(new Set(problems.map(({ structure }) => structure)).size, 7);
  assert.match(problems[0].latex, /^x\^3\+\d+$/);
  assert.match(problems[1].latex, /^x\^3-\d+$/);
  assert.ok(problems.some(({ structure }) => structure === "two-variable-cube-sum"));
  assert.ok(problems.some(({ structure }) => structure === "common-then-cube-difference"));
  assert.ok(problems.some(({ structure }) => structure === "shifted-cube-sum"));
  assert.equal(problems.at(-1)?.answerLatex, "(2x^2-3y)(4x^4+6x^2y+9y^2)");
});

test("인수분해 오답은 임의의 수를 덧붙이지 않고 실제로 틀린 식만 사용한다", () => {
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const problem of createMiddleFactorizationProblemSet(kind, seed).problems) {
        const source = normalizedPolynomial(parsePolynomial(problem.latex));
        for (const distractor of problem.distractors) {
          assert.doesNotMatch(
            distractor.slice(problem.answerLatex.length),
            /^[+-](?:1|a|b)$/,
            `${problem.answerLatex} has a placeholder distractor: ${distractor}`,
          );
          assert.notEqual(
            normalizedPolynomial(parsePolynomial(distractor)),
            source,
            `${kind}/${seed}/${problem.structure}: distractor is also correct: ${distractor}`,
          );
        }
      }
    }
  }
});

test("종합 카드는 세 세트마다 전체 세부 유형을 정확히 두 번씩 순환한다", () => {
  const counts = new Map<string, number>();
  for (let seed = 1; seed <= 3; seed += 1) {
    for (const { kind } of createMiddleFactorizationProblemSet("comprehensive", seed).problems) {
      counts.set(kind, (counts.get(kind) ?? 0) + 1);
    }
  }

  assert.equal(counts.size, MIDDLE_FACTORIZATION_KINDS.length - 1);
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    if (kind === "comprehensive") continue;
    assert.equal(counts.get(kind), 2, `${kind} is not balanced in comprehensive rotation`);
  }
});

test("새 문제를 반복 생성해도 각 카드에 충분히 다양한 식이 나온다", () => {
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    const formulas = Array.from({ length: 100 }, (_, index) => (
      createMiddleFactorizationProblemSet(kind, index + 1).problems.map(({ latex }) => latex)
    )).flat();
    const uniqueFormulas = new Set(formulas);

    assert.ok(
      uniqueFormulas.size >= 120,
      `${kind} generated only ${uniqueFormulas.size} unique formulas out of ${formulas.length}`,
    );
  }
});

test("모든 인수분해 문제는 정답과 겹치지 않는 오답 세 개를 갖는다", () => {
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    for (let seed = 1; seed <= 20; seed += 1) {
      for (const problem of createMiddleFactorizationProblemSet(kind, seed).problems) {
        assert.equal(problem.distractors.length, 3);
        assert.equal(new Set([problem.answerLatex, ...problem.distractors]).size, 4);
        assert.ok(problem.latex.length > 0);
        assert.ok(problem.answerLatex.length > 0);
      }
    }
  }
});

test("같은 번호는 같은 문제를 만들고 오답 보충은 최대 두 유형만 만든다", () => {
  const first = createMiddleFactorizationProblemSet("cubic-common", 77);
  const second = createMiddleFactorizationProblemSet("cubic-common", 77);
  assert.deepEqual(first, second);

  const reviews = createMiddleFactorizationReviewProblems(
    ["common-factor", "grouping", "perfect-square"],
    78,
  );
  assert.equal(reviews.length, 2);
  assert.deepEqual(reviews.map(({ kind }) => kind), ["common-factor", "grouping"]);
});

test("핵심 문자식과 3차식 유형이 실제 식 형태로 생성된다", () => {
  const severalVariables = createMiddleFactorizationProblemSet("multiple-variables", 5);
  assert.ok(severalVariables.problems.every(({ latex }) => /[a-z].*[a-z]/.test(latex)));
  assert.ok(severalVariables.problems.some(({ latex }) => /abc/.test(latex)));

  const cubicCommon = createMiddleFactorizationProblemSet("cubic-common", 5);
  assert.ok(cubicCommon.problems.every(({ latex }) => /[xa]\^3/.test(latex)));
  assert.ok(cubicCommon.problems.some(({ answerLatex }) => /x\(/.test(answerLatex)));

  const cubicGrouping = createMiddleFactorizationProblemSet("cubic-grouping", 5);
  assert.ok(cubicGrouping.problems.every(({ latex }) => /x\^3/.test(latex)));
});

test("괄호 안의 숫자 공통인수까지 밖으로 꺼내 완전히 인수분해한다", () => {
  assert.equal(
    formatNormalizedLinearCombination(2, -2, -1),
    "2(x-1)^2",
  );
  assert.equal(
    formatNormalizedLinearCombination(4, 2, -1),
    "2(x-1)(2x+1)",
  );
  assert.equal(
    formatNormalizedLinearCombination(3, -2, 4),
    "(x+4)(3x-2)",
  );
});

test("생성된 일차 인수 안에는 다시 꺼낼 숫자 공통인수가 남지 않는다", () => {
  const gcd = (left: number, right: number): number => (
    right === 0 ? Math.abs(left) : gcd(right, left % right)
  );

  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    for (let seed = 1; seed <= 100; seed += 1) {
      for (const { answerLatex } of createMiddleFactorizationProblemSet(kind, seed).problems) {
        for (const match of answerLatex.matchAll(/\((\d*)x([+-]\d+)\)/g)) {
          const leading = match[1] ? Number(match[1]) : 1;
          const constant = Number(match[2]);
          assert.equal(gcd(leading, constant), 1, `${answerLatex} has a hidden common factor`);
        }
      }
    }
  }
});

test("문자식의 계수가 1 또는 -1이면 숫자 1을 표기하지 않는다", () => {
  for (let seed = 1; seed <= 500; seed += 1) {
    for (const problem of createMiddleFactorizationProblemSet("normalize-first", seed).problems) {
      assert.doesNotMatch(problem.latex, /[+-]1\(/);
    }
  }
});

test("식 정리 후 인수분해 한 장은 숫자만 다른 문제가 아니라 다섯 구조를 섞는다", () => {
  const formulas = createMiddleFactorizationProblemSet("normalize-first", 20260727)
    .problems
    .map(({ latex }) => latex);

  assert.ok(formulas.some((latex) => /^\d+x\(/.test(latex)), "공통 괄호 묶기");
  assert.ok(formulas.some((latex) => /\)\^2[+-](?:\d+)?\(/.test(latex)), "제곱식에서 공통인수 묶기");
  assert.ok(formulas.some((latex) => /\)\^2-\d+$/.test(latex)), "이동된 제곱의 차");
  assert.ok(formulas.some((latex) => /^\d+x\^2/.test(latex)), "네 항 정리와 묶어내기");
  assert.ok(formulas.some((latex) => /^\(.+\)\(.+\)\+\(.+\)\(.+\)$/.test(latex)), "두 곱을 합친 뒤 재인수분해");
});

test("모든 인수분해 카드가 숫자만 바꾸지 않고 여러 식 구조를 섞는다", () => {
  for (const kind of MIDDLE_FACTORIZATION_KINDS) {
    const structures = new Set(
      createMiddleFactorizationProblemSet(kind, 20260728)
        .problems
        .map(({ structure }) => structure),
    );
    const minimum = kind === "three-variables" || kind === "normalize-first" ? 5 : 4;
    assert.ok(
      structures.size >= minimum,
      `${kind} only generated ${structures.size} structures: ${[...structures].join(", ")}`,
    );
  }
});
