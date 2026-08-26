export type MultiplicationFact = { multiplicand: number; factor: number };
export type MultiplicationFiveProblem = MultiplicationFact & { id: string; product: number };
export type MultiplicationFiveProblemSet = { seed: number; columns: MultiplicationFiveProblem[][] };

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

export function multiplicationFiveSourceFacts(): MultiplicationFact[] {
  const standard = Array.from({ length: 8 }, (_, leftIndex) =>
    Array.from({ length: 8 }, (_, rightIndex) => ({ multiplicand: leftIndex + 2, factor: rightIndex + 2 })),
  ).flat();

  const difficult = [
    [6, 7], [6, 8], [6, 9],
    [7, 6], [7, 7], [7, 8], [7, 9],
    [8, 6], [8, 7], [8, 8], [8, 9],
    [9, 6], [9, 7], [9, 8], [9, 9],
  ].map(([multiplicand, factor]) => ({ multiplicand, factor }));

  const repeatedDifficult = [
    ...difficult,
    ...difficult,
    { multiplicand: 7, factor: 8 },
    { multiplicand: 7, factor: 9 },
    { multiplicand: 8, factor: 9 },
    { multiplicand: 6, factor: 8 },
  ];

  return [
    ...standard,
    { multiplicand: 1, factor: 7 },
    { multiplicand: 8, factor: 0 },
    ...repeatedDifficult,
  ];
}

export function createMultiplicationFiveProblemSet(seed: number): MultiplicationFiveProblemSet {
  const ordered = shuffle(multiplicationFiveSourceFacts(), random(seed));
  const columns = Array.from({ length: 5 }, (_, columnIndex) =>
    ordered.slice(columnIndex * 20, columnIndex * 20 + 20).map((fact, rowIndex) => ({
      ...fact,
      id: `multiplication-five-${columnIndex}-${rowIndex}`,
      product: fact.multiplicand * fact.factor,
    })),
  );
  return { seed, columns };
}
