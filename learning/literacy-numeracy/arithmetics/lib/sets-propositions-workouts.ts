export type LogicKind =
  | "set-union-cardinality"
  | "set-intersection-cardinality"
  | "set-difference-cardinality"
  | "set-symmetric-difference"
  | "subset-condition"
  | "complement-cardinality"
  | "three-set-cardinality";

export type LogicProblem = {
  id: string;
  kind: LogicKind;
  label: string;
  prompt: string;
  latex: string;
  choices: { id: string; latex: string }[];
  answer: string;
};

const KINDS: LogicKind[] = [
  "set-union-cardinality",
  "set-intersection-cardinality",
  "set-difference-cardinality",
  "set-symmetric-difference",
  "subset-condition",
  "complement-cardinality",
  "three-set-cardinality",
];

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

function integer(next: () => number, min: number, max: number) {
  return min + Math.floor(next() * (max - min + 1));
}

function shuffled<T>(items: T[], next: () => number) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = integer(next, 0, index);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function numericChoices(answer: number, next: () => number) {
  const values = new Set([answer]);
  while (values.size < 4) {
    const offset = integer(next, -5, 5);
    if (offset !== 0 && answer + offset >= 0) values.add(answer + offset);
  }
  return shuffled([...values], next).map((value) => ({ id: String(value), latex: String(value) }));
}

function numericProblem(
  id: string,
  kind: LogicKind,
  label: string,
  prompt: string,
  latex: string,
  answer: number,
  next: () => number,
): LogicProblem {
  return { id, kind, label, prompt, latex, choices: numericChoices(answer, next), answer: String(answer) };
}

function build(kind: LogicKind, next: () => number, id: string): LogicProblem {
  const intersection = integer(next, 2, 7);
  const onlyA = integer(next, 3, 9);
  const onlyB = integer(next, 3, 9);
  const sizeA = onlyA + intersection;
  const sizeB = onlyB + intersection;
  const union = onlyA + onlyB + intersection;

  if (kind === "set-union-cardinality") {
    return numericProblem(
      id, kind, "합집합의 원소 개수", "합집합의 원소의 개수를 구하세요.",
      `n(A)=${sizeA},\\quad n(B)=${sizeB},\\quad n(A\\cap B)=${intersection}`,
      union, next,
    );
  }
  if (kind === "set-intersection-cardinality") {
    return numericProblem(
      id, kind, "교집합의 원소 개수", "교집합의 원소의 개수를 구하세요.",
      `n(A)=${sizeA},\\quad n(B)=${sizeB},\\quad n(A\\cup B)=${union}`,
      intersection, next,
    );
  }
  if (kind === "set-difference-cardinality") {
    return numericProblem(
      id, kind, "차집합의 원소 개수", "차집합의 원소의 개수를 구하세요.",
      `n(A)=${sizeA},\\quad n(A\\cap B)=${intersection},\\quad n(A-B)=?`,
      onlyA, next,
    );
  }
  if (kind === "set-symmetric-difference") {
    return numericProblem(
      id, kind, "대칭차의 원소 개수", "한 집합에만 속하는 원소의 개수를 구하세요.",
      `n(A)=${sizeA},\\quad n(B)=${sizeB},\\quad n(A\\cap B)=${intersection}`,
      onlyA + onlyB, next,
    );
  }
  if (kind === "subset-condition") {
    const size = integer(next, 6, 9);
    const required = integer(next, 1, 2);
    const excluded = integer(next, 1, 2);
    const answer = 2 ** (size - required - excluded);
    return numericProblem(
      id, kind, "조건이 있는 부분집합", "조건을 만족하는 부분집합의 개수를 구하세요.",
      `n(U)=${size},\\quad \\text{반드시 포함 }${required}\\text{개},\\quad \\text{반드시 제외 }${excluded}\\text{개}`,
      answer, next,
    );
  }
  if (kind === "complement-cardinality") {
    const universal = union + integer(next, 3, 8);
    return numericProblem(
      id, kind, "여집합의 원소 개수", "전체집합에서 A의 여집합의 원소의 개수를 구하세요.",
      `n(U)=${universal},\\quad n(A)=${sizeA},\\quad n(A^C)=?`,
      universal - sizeA, next,
    );
  }

  const onlyC = integer(next, 2, 6);
  const abOnly = integer(next, 1, 4);
  const acOnly = integer(next, 1, 4);
  const bcOnly = integer(next, 1, 4);
  const abc = integer(next, 1, 3);
  const a = onlyA + abOnly + acOnly + abc;
  const b = onlyB + abOnly + bcOnly + abc;
  const c = onlyC + acOnly + bcOnly + abc;
  const ab = abOnly + abc;
  const ac = acOnly + abc;
  const bc = bcOnly + abc;
  const answer = onlyA + onlyB + onlyC + abOnly + acOnly + bcOnly + abc;
  return numericProblem(
    id, kind, "세 집합의 합집합", "포함배제의 원리를 이용해 합집합의 원소의 개수를 구하세요.",
    `\\begin{aligned}n(A)&=${a},\\ n(B)=${b},\\ n(C)=${c}\\\\n(A\\cap B)&=${ab},\\ n(A\\cap C)=${ac},\\ n(B\\cap C)=${bc}\\\\n(A\\cap B\\cap C)&=${abc}\\end{aligned}`,
    answer, next,
  );
}

export function createLogicProblemSet(seed: number) {
  const next = random(seed);
  return { seed, problems: KINDS.map((kind, index) => build(kind, next, `logic-${index}`)) };
}

export function createLogicReviewProblems(kinds: LogicKind[], seed: number) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => build(kind, next, `logic-review-${index}-${seed}`));
}
