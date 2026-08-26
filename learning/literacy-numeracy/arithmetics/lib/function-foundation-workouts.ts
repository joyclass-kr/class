import { createFunctionTransformationProblemSet } from "./function-transformation-workouts.ts";

export type FunctionFoundationKind =
  | "function-correspondence"
  | "one-to-one"
  | "inverse-existence"
  | "domain-range-restriction"
  | "composition-domain"
  | "inverse-graph-symmetry";

export type FunctionFoundationProblem = {
  id: string;
  kind: FunctionFoundationKind;
  label: string;
  prompt: string;
  latex: string;
  options: string[];
  answerIndex: number;
};

const KINDS: FunctionFoundationKind[] = [
  "function-correspondence",
  "one-to-one",
  "inverse-existence",
  "domain-range-restriction",
  "composition-domain",
  "inverse-graph-symmetry",
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

const integer = (next: () => number, min: number, max: number) =>
  min + Math.floor(next() * (max - min + 1));

function rotateOptions(options: string[], answerIndex: number, offset: number) {
  const amount = ((offset % options.length) + options.length) % options.length;
  return {
    options: [...options.slice(amount), ...options.slice(0, amount)],
    answerIndex: (answerIndex - amount + options.length) % options.length,
  };
}

function build(kind: FunctionFoundationKind, next: () => number, id: string): FunctionFoundationProblem {
  const shift = integer(next, 0, 3);

  if (kind === "function-correspondence") {
    const shuffled = rotateOptions([
      "1\\mapsto 2,\\ 2\\mapsto 3,\\ 3\\mapsto 4",
      "1\\mapsto 2,\\ 1\\mapsto 3,\\ 2\\mapsto 4",
      "1\\mapsto 2,\\ 2\\mapsto 3,\\ 2\\mapsto 4",
      "1\\mapsto 2,\\ 1\\mapsto 3,\\ 3\\mapsto 4",
    ], 0, shift);
    return { id, kind, label: "함수와 대응", prompt: "함수를 나타내는 대응은?", latex: "A=\\{1,2,3\\}", ...shuffled };
  }

  if (kind === "one-to-one") {
    const shuffled = rotateOptions([
      "f(x)=2x-1",
      "f(x)=x^2",
      "f(x)=|x|",
      "f(x)=3",
    ], 0, shift);
    return { id, kind, label: "일대일함수", prompt: "실수 전체에서 일대일함수인 것은?", latex: "f:\\mathbb{R}\\to\\mathbb{R}", ...shuffled };
  }

  if (kind === "inverse-existence") {
    const shuffled = rotateOptions([
      "f(x)=-3x+2",
      "f(x)=x^2+1",
      "f(x)=|x-1|",
      "f(x)=4",
    ], 0, shift);
    return { id, kind, label: "역함수 존재 조건", prompt: "실수 전체에서 역함수가 존재하는 함수는?", latex: "f:\\mathbb{R}\\to\\mathbb{R}", ...shuffled };
  }

  if (kind === "domain-range-restriction") {
    const shuffled = rotateOptions([
      "x\\ge 0",
      "x\\le 1",
      "-1\\le x\\le 1",
      "x\\ne 0",
    ], 0, shift);
    return { id, kind, label: "정의역 제한", prompt: "역함수가 존재하도록 제한한 정의역은?", latex: "f(x)=x^2", ...shuffled };
  }

  if (kind === "composition-domain") {
    const a = integer(next, 1, 4);
    const b = a + 1;
    const shuffled = rotateOptions([
      `x\\ne ${a},\\ ${b}`,
      `x\\ne ${a}`,
      `x\\ne ${b}`,
      "x\\in\\mathbb{R}",
    ], 0, shift);
    return {
      id,
      kind,
      label: "합성함수의 정의역",
      prompt: "합성함수의 정의역은?",
      latex: `f(x)=\\dfrac{1}{x-1},\\quad g(x)=\\dfrac{1}{x-${a}},\\quad (f\\circ g)(x)`,
      ...shuffled,
    };
  }

  const x = integer(next, 1, 4);
  const y = integer(next, -4, -1);
  const shuffled = rotateOptions([
    `(${y},${x})`,
    `(${x},${y})`,
    `(${-y},${x})`,
    `(${y},${-x})`,
  ], 0, shift);
  return {
    id,
    kind,
    label: "역함수 그래프의 대칭",
    prompt: "역함수의 그래프가 지나는 점은?",
    latex: `f(${x})=${y}`,
    ...shuffled,
  };
}

export function createFunctionFoundationProblemSet(seed: number) {
  const next = random(seed);
  return {
    seed,
    problems: KINDS.map((kind, index) => build(kind, next, `function-foundation-${index}`)),
  };
}

export function createFunctionFoundationReviewProblems(kinds: string[], seed: number) {
  const next = random(seed);
  return [...new Set(kinds)]
    .filter((kind): kind is FunctionFoundationKind => KINDS.includes(kind as FunctionFoundationKind))
    .slice(0, 2)
    .map((kind, index) => build(kind, next, `function-foundation-review-${index}-${seed}`));
}

export function createCombinedFunctionTransformationProblemSet(seed: number) {
  const foundations = createFunctionFoundationProblemSet(seed);
  const calculations = createFunctionTransformationProblemSet(seed).problems
    .filter(({ kind }) => kind === "compose-fg" || kind === "rational-inverse");
  return { seed, problems: [...foundations.problems, ...calculations] };
}