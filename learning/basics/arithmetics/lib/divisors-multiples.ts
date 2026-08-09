export type DivisorMultipleKind =
  | "divisors"
  | "multiples"
  | "common-divisors"
  | "common-multiples"
  | "gcd"
  | "lcm";

export type DivisorMultipleProblem = {
  id: string;
  kind: DivisorMultipleKind;
  left: number;
  right?: number;
  answer: string;
  prompt: string;
};

export type DivisorMultipleProblemSet = {
  seed: number;
  columns: DivisorMultipleProblem[][];
};

// 약수원본!H3:V23의 최대공약수 후보표.
export const GCD_CANDIDATE_ROWS = [
  [40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96],
  [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
  [24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108],
  [14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112],
  [40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120],
  [18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108],
  [20, 30, 40, 60, 80, 90],
  [22, 33, 44, 55, 66, 77, 88, 99],
  [24, 36, 48, 60, 72, 84, 96, 108],
  [26, 39, 52, 65, 78, 91, 104],
  [28, 42, 56, 70, 84, 98],
  [30, 45, 60, 75, 90, 105],
  [32, 48, 64, 80, 96, 112],
  [34, 51, 68, 85, 102],
  [36, 54, 72, 90, 108],
  [38, 57, 76, 95],
  [42, 63, 84, 105],
  [44, 66, 88, 110],
  [46, 69, 92, 115],
  [48, 72, 96, 120],
  [50, 75, 100, 125],
] as const;

// 약수원본!G26:J45에서 2부터 25까지의 2배·3배·4배를 사용한다.
export const LCM_BASES = Array.from({ length: 24 }, (_, index) => 25 - index);

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

function shuffle<T>(values: readonly T[], next: () => number) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(next() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function greatestCommonDivisor(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

export function leastCommonMultiple(left: number, right: number) {
  if (left === 0 || right === 0) return 0;
  return Math.abs((left / greatestCommonDivisor(left, right)) * right);
}

function combinations(values: readonly number[]) {
  const pairs: Array<[number, number]> = [];
  for (let left = 0; left < values.length - 1; left += 1) {
    for (let right = left + 1; right < values.length; right += 1) {
      pairs.push([values[left], values[right]]);
    }
  }
  return pairs;
}

export function divisors(value: number) {
  return Array.from({ length: value }, (_, index) => index + 1).filter((candidate) => value % candidate === 0);
}

export function multiples(value: number, count: number) {
  return Array.from({ length: count }, (_, index) => value * (index + 1));
}

export function commonDivisors(left: number, right: number) {
  return divisors(greatestCommonDivisor(left, right));
}

export function commonMultiples(left: number, right: number, count: number) {
  return multiples(leastCommonMultiple(left, right), count);
}

export function createDivisorMultipleSet(seed: number): DivisorMultipleProblemSet {
  const next = random(seed);
  const divisorValues = shuffle([12, 18, 20, 24, 28, 30], next).slice(0, 2);
  const multipleValues = shuffle([4, 6, 7, 8, 9], next).slice(0, 2);
  const commonDivisorPairs = shuffle([[12, 18], [18, 24], [20, 30], [24, 36]] as const, next).slice(0, 2);
  const commonMultiplePairs = shuffle([[4, 6], [6, 8], [6, 9], [8, 12]] as const, next).slice(0, 2);

  const basicProblems: DivisorMultipleProblem[] = [
    ...divisorValues.map((value, index) => ({
      id: "divisor-multiple-divisors-" + index,
      kind: "divisors" as const,
      left: value,
      answer: divisors(value).join(","),
      prompt: value + "의 약수는?",
    })),
    ...multipleValues.map((value, index) => ({
      id: "divisor-multiple-multiples-" + index,
      kind: "multiples" as const,
      left: value,
      answer: multiples(value, 5).join(","),
      prompt: value + "의 배수를 작은 것부터 5개 쓰면?",
    })),
    ...commonDivisorPairs.map(([left, right], index) => ({
      id: "divisor-multiple-common-divisors-" + index,
      kind: "common-divisors" as const,
      left,
      right,
      answer: commonDivisors(left, right).join(","),
      prompt: left + "와 " + right + "의 공약수는?",
    })),
    ...commonMultiplePairs.map(([left, right], index) => ({
      id: "divisor-multiple-common-multiples-" + index,
      kind: "common-multiples" as const,
      left,
      right,
      answer: commonMultiples(left, right, 3).join(","),
      prompt: left + "와 " + right + "의 공배수를 작은 것부터 3개 쓰면?",
    })),
  ];

  const usedPairs = new Set<string>();
  const gcdProblems = shuffle(GCD_CANDIDATE_ROWS, next).slice(0, 11).map((row, index) => {
    const candidates = shuffle(combinations(row), next);
    const pair = candidates.find(([left, right]) => !usedPairs.has(left + ":" + right)) ?? candidates[0];
    const [left, right] = next() < 0.5 ? pair : [pair[1], pair[0]];
    usedPairs.add(Math.min(left, right) + ":" + Math.max(left, right));
    return {
      id: "divisor-multiple-gcd-" + index,
      kind: "gcd" as const,
      left,
      right,
      answer: String(greatestCommonDivisor(left, right)),
      prompt: left + "와 " + right + "의 최대공약수는?",
    };
  });

  const lcmProblems = shuffle(LCM_BASES, next).slice(0, 11).map((base, index) => {
    const choices: Array<[number, number]> = [[base * 2, base * 3], [base * 3, base * 4], [base * 4, base * 2]];
    const [left, right] = choices[Math.floor(next() * choices.length)];
    return {
      id: "divisor-multiple-lcm-" + index,
      kind: "lcm" as const,
      left,
      right,
      answer: String(leastCommonMultiple(left, right)),
      prompt: left + "와 " + right + "의 최소공배수는?",
    };
  });

  return { seed, columns: [basicProblems, gcdProblems, lcmProblems] };
}
