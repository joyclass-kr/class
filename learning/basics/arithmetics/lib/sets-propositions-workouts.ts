export type LogicKind =
  | "set-cardinality" | "subset-condition" | "set-law" | "truth-value"
  | "quantifier-negation" | "contrapositive" | "condition-relation";
export type LogicProblem = {
  id: string; kind: LogicKind; label: string; prompt: string; latex: string;
  choices: { id: string; latex: string }[]; answer: string;
};
const KINDS: LogicKind[] = [
  "set-cardinality", "subset-condition", "set-law", "truth-value",
  "quantifier-negation", "contrapositive", "condition-relation",
];
function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5; let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}
function integer(next: () => number, min: number, max: number) { return min + Math.floor(next() * (max - min + 1)); }
function shuffled<T>(items: T[], next: () => number) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) { const swap = integer(next, 0, index); [result[index], result[swap]] = [result[swap], result[index]]; }
  return result;
}
function numericChoices(answer: number, next: () => number) {
  const values = new Set([answer]);
  while (values.size < 4) values.add(Math.max(0, answer + integer(next, -4, 4)));
  return shuffled([...values], next).map((value) => ({ id: String(value), latex: String(value) }));
}
function build(kind: LogicKind, next: () => number, id: string): LogicProblem {
  if (kind === "set-cardinality") {
    const intersection = integer(next, 2, 7); const onlyA = integer(next, 3, 9); const onlyB = integer(next, 3, 9);
    const answer = onlyA + onlyB + intersection;
    return { id, kind, label: "집합의 연산", prompt: "두 집합의 합집합의 원소의 개수를 구하세요.", latex: `n(A)=${onlyA + intersection},\\quad n(B)=${onlyB + intersection},\\quad n(A\\cap B)=${intersection}`, choices: numericChoices(answer, next), answer: String(answer) };
  }
  if (kind === "subset-condition") {
    const size = integer(next, 6, 9); const required = integer(next, 1, 2); const excluded = integer(next, 1, 2);
    const answer = 2 ** (size - required - excluded);
    return { id, kind, label: "부분집합", prompt: "지정한 원소는 모두 포함하고 제외할 원소는 포함하지 않는 부분집합의 개수를 구하세요.", latex: `n(U)=${size},\\quad \\text{반드시 포함 }${required}\\text{개},\\quad \\text{반드시 제외 }${excluded}\\text{개}`, choices: numericChoices(answer, next), answer: String(answer) };
  }
  if (kind === "set-law") {
    const complement = next() < 0.5;
    return {
      id, kind, label: "집합의 연산과 드모르간 법칙",
      prompt: "다음과 같은 집합을 고르세요.",
      latex: complement ? `(A\\cup B)^C` : `(A\\cap B)^C`,
      choices: shuffled([
        { id: "answer", latex: complement ? "A^C\\cap B^C" : "A^C\\cup B^C" },
        { id: "wrong-1", latex: complement ? "A^C\\cup B^C" : "A^C\\cap B^C" },
        { id: "wrong-2", latex: complement ? "A\\cap B" : "A\\cup B" },
        { id: "wrong-3", latex: complement ? "A\\cup B" : "A\\cap B" },
      ], next),
      answer: "answer",
    };
  }
  if (kind === "truth-value") {
    const trueCase = next() < 0.5;
    return { id, kind, label: "명제의 참거짓", prompt: "다음 명제의 참, 거짓을 판단하세요.", latex: trueCase ? `\\forall x\\in\\mathbb{R},\\quad x^2-2x+2>0` : `\\forall x\\in\\mathbb{R},\\quad x^2-2x-3\\ge 0`, choices: [{ id: "true", latex: "\\text{참}" }, { id: "false", latex: "\\text{거짓}" }], answer: trueCase ? "true" : "false" };
  }
  if (kind === "quantifier-negation") {
    const universal = next() < 0.5;
    return {
      id, kind, label: "모든·어떤 명제의 부정",
      prompt: "주어진 명제의 부정을 고르세요.",
      latex: universal
        ? `\\forall x\\in\\mathbb{R},\\quad P(x)`
        : `\\exists x\\in\\mathbb{R},\\quad P(x)`,
      choices: shuffled([
        { id: "answer", latex: universal ? `\\exists x\\in\\mathbb{R},\\quad\\lnot P(x)` : `\\forall x\\in\\mathbb{R},\\quad\\lnot P(x)` },
        { id: "wrong-1", latex: universal ? `\\forall x\\in\\mathbb{R},\\quad\\lnot P(x)` : `\\exists x\\in\\mathbb{R},\\quad\\lnot P(x)` },
        { id: "wrong-2", latex: universal ? `\\exists x\\in\\mathbb{R},\\quad P(x)` : `\\forall x\\in\\mathbb{R},\\quad P(x)` },
        { id: "wrong-3", latex: universal ? `\\lnot\\exists x\\in\\mathbb{R},\\quad\\lnot P(x)` : `\\lnot\\forall x\\in\\mathbb{R},\\quad\\lnot P(x)` },
      ], next),
      answer: "answer",
    };
  }
  if (kind === "contrapositive") {
    const choices = [
      { id: "answer", latex: "\\lnot q\\rightarrow\\lnot p" },
      { id: "converse", latex: "q\\rightarrow p" },
      { id: "inverse", latex: "\\lnot p\\rightarrow\\lnot q" },
      { id: "original", latex: "p\\rightarrow q" },
    ];
    return { id, kind, label: "대우", prompt: "주어진 명제의 대우를 고르세요.", latex: `p\\rightarrow q`, choices: shuffled(choices, next), answer: "answer" };
  }
  const small = integer(next, 2, 5); const factor = integer(next, 2, 4); const large = small * factor;
  return {
    id, kind, label: "필요충분조건", prompt: "두 조건 사이의 관계로 옳은 것을 고르세요.",
    latex: `p:\\ x\\text{는 }${large}\\text{의 배수},\\qquad q:\\ x\\text{는 }${small}\\text{의 배수}`,
    choices: shuffled([
      { id: "sufficient", latex: "p\\text{는 }q\\text{이기 위한 충분조건}" },
      { id: "necessary", latex: "p\\text{는 }q\\text{이기 위한 필요조건}" },
      { id: "both", latex: "p\\text{는 }q\\text{이기 위한 필요충분조건}" },
      { id: "neither", latex: "p\\text{는 }q\\text{이기 위한 필요조건도 충분조건도 아님}" },
    ], next), answer: "sufficient",
  };
}
export function createLogicProblemSet(seed: number) { const next = random(seed); return { seed, problems: KINDS.map((kind, index) => build(kind, next, `logic-${index}`)) }; }
export function createLogicReviewProblems(kinds: LogicKind[], seed: number) {
  const next = random(seed); return [...new Set(kinds)].slice(0, 2).map((kind, index) => build(kind, next, `logic-review-${index}-${seed}`));
}
