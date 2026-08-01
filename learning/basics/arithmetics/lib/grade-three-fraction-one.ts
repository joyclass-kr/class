export type GradeThreeFractionValueProblem = {
  id: string; kind: "value"; whole: number; numerator: number; denominator: number; answer: number;
};

export type GradeThreeFractionRelationProblem = {
  id: string; kind: "relation"; whole: number; part: number; selected: number; numerator: number; denominator: number;
};

export type GradeThreeFractionProblemSet = {
  seed: number;
  valueProblems: GradeThreeFractionValueProblem[];
  relationProblems: GradeThreeFractionRelationProblem[];
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

function integer(next: () => number, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

export function createGradeThreeFractionOneSet(seed: number): GradeThreeFractionProblemSet {
  const next = random(seed);
  const valueProblems = Array.from({ length: 10 }, (_, index): GradeThreeFractionValueProblem => {
    const numerator = integer(next, 1, 8);
    const denominator = integer(next, numerator + 1, 9);
    const unit = integer(next, 1, 9);
    return { id: `grade-three-fraction-value-${index}`, kind: "value", whole: unit * denominator, numerator, denominator, answer: unit * numerator };
  });
  const relationProblems: GradeThreeFractionRelationProblem[] = [];
  const seenRelations = new Set<string>();
  while (relationProblems.length < 5) {
    const groupNumerator = integer(next, 1, 3);
    const groupDenominator = integer(next, groupNumerator + 1, 4);
    const part = integer(next, 2, 12);
    const whole = part * groupDenominator;
    const selected = part * groupNumerator;
    const key = `${whole}:${part}:${selected}`;
    if (seenRelations.has(key)) continue;
    seenRelations.add(key);
    relationProblems.push({ id: `grade-three-fraction-relation-${relationProblems.length}`, kind: "relation", whole, part, selected, numerator: selected, denominator: whole });
  }
  return { seed, valueProblems, relationProblems };
}
