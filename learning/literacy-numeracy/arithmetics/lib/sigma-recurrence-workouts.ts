export type SigmaRecurrenceKind =
  | "linear-sigma"
  | "square-sigma"
  | "cubic-sigma"
  | "geometric-sigma"
  | "telescoping-sigma"
  | "difference-recurrence"
  | "affine-recurrence";

export type SigmaRecurrenceProblem = {
  id: string;
  kind: SigmaRecurrenceKind;
  label: string;
  prompt: string;
  latex: string;
  answer: number;
};

const KINDS: SigmaRecurrenceKind[] = [
  "linear-sigma",
  "square-sigma",
  "cubic-sigma",
  "geometric-sigma",
  "telescoping-sigma",
  "difference-recurrence",
  "affine-recurrence",
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

function integer(next: () => number, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

function signed(value: number) {
  if (value === 0) return "";
  return value < 0 ? `${value}` : `+${value}`;
}

function build(
  kind: SigmaRecurrenceKind,
  next: () => number,
  id: string,
): SigmaRecurrenceProblem {
  if (kind === "linear-sigma") {
    const a = integer(next, 2, 5);
    const b = integer(next, -4, 4);
    const n = integer(next, 5, 9);
    return {
      id,
      kind,
      label: "일차식의 합",
      prompt: "합을 구하세요.",
      latex: `\\sum_{k=1}^{${n}}(${a}k${signed(b)})`,
      answer: a * n * (n + 1) / 2 + b * n,
    };
  }

  if (kind === "square-sigma") {
    const n = integer(next, 4, 8);
    const c = integer(next, 1, 4);
    return {
      id,
      kind,
      label: "자연수 제곱의 합",
      prompt: "합을 구하세요.",
      latex: `\\sum_{k=1}^{${n}}(k^2+${c}k)`,
      answer: n * (n + 1) * (2 * n + 1) / 6 + c * n * (n + 1) / 2,
    };
  }

  if (kind === "cubic-sigma") {
    const n = integer(next, 3, 7);
    return {
      id,
      kind,
      label: "자연수 세제곱의 합",
      prompt: "합을 구하세요.",
      latex: `\\sum_{k=1}^{${n}}k^3`,
      answer: (n * (n + 1) / 2) ** 2,
    };
  }

  if (kind === "geometric-sigma") {
    const ratio = integer(next, 2, 3);
    const n = integer(next, 4, 6);
    return {
      id,
      kind,
      label: "등비수열의 합",
      prompt: "합을 구하세요.",
      latex: `\\sum_{k=0}^{${n - 1}}${ratio}^{k}`,
      answer: (ratio ** n - 1) / (ratio - 1),
    };
  }

  if (kind === "telescoping-sigma") {
    const n = integer(next, 5, 10);
    return {
      id,
      kind,
      label: "이웃한 항이 소거되는 합",
      prompt: "합을 구하세요.",
      latex: `\\sum_{k=1}^{${n}}\\{(k+1)^2-k^2\\}`,
      answer: (n + 1) ** 2 - 1,
    };
  }

  if (kind === "difference-recurrence") {
    const first = integer(next, -5, 8);
    const difference = integer(next, 2, 6);
    const n = integer(next, 7, 12);
    return {
      id,
      kind,
      label: "등차형 점화식",
      prompt: "주어진 항을 구하세요.",
      latex: `a_1=${first},\\quad a_{n+1}=a_n${signed(difference)},\\quad a_{${n}}`,
      answer: first + (n - 1) * difference,
    };
  }

  const first = integer(next, 1, 4);
  const ratio = 2;
  const constant = integer(next, 1, 3);
  const n = integer(next, 4, 6);
  let value = first;
  for (let index = 1; index < n; index += 1) value = ratio * value + constant;
  return {
    id,
    kind,
    label: "일차 점화식",
    prompt: "주어진 항을 구하세요.",
    latex: `a_1=${first},\\quad a_{n+1}=${ratio}a_n+${constant},\\quad a_{${n}}`,
    answer: value,
  };
}

export function createSigmaRecurrenceSet(seed: number) {
  const next = random(seed);
  return {
    seed,
    problems: KINDS.map((kind, index) =>
      build(kind, next, `sigma-recurrence-${index}`)),
  };
}

export function createSigmaRecurrenceReviews(
  kinds: SigmaRecurrenceKind[],
  seed: number,
) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) =>
    build(kind, next, `sigma-recurrence-review-${index}-${seed}`));
}

export function sameSigmaRecurrenceAnswer(value: string, answer: number) {
  return /^-?\d+$/.test(value) && Number(value) === answer;
}
