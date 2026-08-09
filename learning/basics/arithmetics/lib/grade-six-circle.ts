export type CircleCompositeKind =
  | "annulus"
  | "square-circle-hole"
  | "corner-quarters"
  | "arbelos"
  | "stadium"
  | "quarter-annulus"
  | "square-side-cutouts"
  | "arched-rectangle";

export type CircleProblem = {
  id: string;
  kind: CircleCompositeKind;
  unit: "cm";
  dimensions: Record<string, number>;
  perimeter: number;
  area: number;
};

const PI = 3.14;

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

function even(next: () => number, minimum: number, maximum: number) {
  return integer(next, Math.ceil(minimum / 2), Math.floor(maximum / 2)) * 2;
}

function rounded(value: number) {
  return Number(value.toFixed(2));
}

function shuffle<T>(values: readonly T[], next: () => number) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function problem(kind: CircleCompositeKind, dimensions: Record<string, number>, perimeter: number, area: number): CircleProblem {
  return { id: "grade-six-circle-" + kind, kind, unit: "cm", dimensions, perimeter: rounded(perimeter), area: rounded(area) };
}

export function createGradeSixCircleSet(seed: number): CircleProblem[] {
  const next = random(seed);
  const outer = integer(next, 7, 11);
  const inner = integer(next, 2, outer - 3);
  const squareHoleSide = even(next, 8, 16);
  const squareHoleRadius = squareHoleSide / 2;
  const cornerSide = even(next, 10, 18);
  const cornerRadius = cornerSide / 2;
  const arbelosDiameter = even(next, 4, 10);
  const stadiumRadius = integer(next, 2, 5);
  const stadiumStraight = integer(next, 6, 12);
  const quarterOuter = integer(next, 8, 14);
  const quarterInner = integer(next, 2, quarterOuter - 3);
  const cutoutSide = even(next, 8, 16);
  const cutoutRadius = cutoutSide / 2;
  const archWidth = even(next, 8, 16);
  const archRadius = archWidth / 2;
  const archHeight = integer(next, 4, 10);

  return shuffle([
    problem("annulus", { outer, inner }, 2 * PI * (outer + inner), PI * (outer ** 2 - inner ** 2)),
    problem("square-circle-hole", { side: squareHoleSide, radius: squareHoleRadius }, 4 * squareHoleSide + 2 * PI * squareHoleRadius, squareHoleSide ** 2 - PI * squareHoleRadius ** 2),
    problem("corner-quarters", { side: cornerSide, radius: cornerRadius }, 2 * PI * cornerRadius, cornerSide ** 2 - PI * cornerRadius ** 2),
    problem("arbelos", { diameter: arbelosDiameter }, 2 * PI * arbelosDiameter, PI * arbelosDiameter ** 2 / 4),
    problem("stadium", { radius: stadiumRadius, straight: stadiumStraight }, 2 * stadiumStraight + 2 * PI * stadiumRadius, 2 * stadiumRadius * stadiumStraight + PI * stadiumRadius ** 2),
    problem("quarter-annulus", { outer: quarterOuter, inner: quarterInner }, PI * (quarterOuter + quarterInner) / 2 + 2 * (quarterOuter - quarterInner), PI * (quarterOuter ** 2 - quarterInner ** 2) / 4),
    problem("square-side-cutouts", { side: cutoutSide, radius: cutoutRadius }, 2 * cutoutSide + 2 * PI * cutoutRadius, cutoutSide ** 2 - PI * cutoutRadius ** 2),
    problem("arched-rectangle", { width: archWidth, radius: archRadius, height: archHeight }, archWidth + 2 * archHeight + PI * archRadius, archWidth * archHeight + PI * archRadius ** 2 / 2),
  ], next);
}

export function normalizeCircleAnswer(input: string) {
  const value = Number(input.replace(/[^0-9.-]/g, ""));
  return input.trim() && Number.isFinite(value) ? value : null;
}
