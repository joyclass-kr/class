export type GeometryMeasurementMode = "plane" | "solid";

export type GeometryMeasurementProblem = {
  id: string;
  kind: string;
  dimensions: Record<string, number>;
  first: number;
  second: number;
  firstLabel: "둘레" | "겉넓이";
  secondLabel: "넓이" | "부피";
  firstUnit: "cm" | "cm²";
  secondUnit: "cm²" | "cm³";
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function pick<T>(random: () => number, values: readonly T[]) {
  return values[Math.floor(random() * values.length)];
}

export function createElementaryGeometryMeasurementSet(mode: GeometryMeasurementMode, seed: number): GeometryMeasurementProblem[] {
  const random = seededRandom(seed ^ (mode === "plane" ? 0x51a7 : 0x60b5));
  if (mode === "plane") {
    const width = pick(random, [10, 12, 14]);
    const height = pick(random, [8, 10, 12]);
    const cutWidth = pick(random, [3, 4, 5]);
    const cutHeight = pick(random, [3, 4]);
    const frameWidth = pick(random, [12, 14, 16]);
    const frameHeight = pick(random, [9, 10, 12]);
    const innerWidth = frameWidth - pick(random, [4, 6]);
    const innerHeight = frameHeight - pick(random, [4, 6]);
    const uWidth = pick(random, [10, 12, 14]);
    const uHeight = pick(random, [8, 10, 12]);
    const notchWidth = pick(random, [3, 4, 5]);
    const notchHeight = pick(random, [3, 4]);
    const roofScale = pick(random, [1, 2]);
    const houseWidth = 8 * roofScale;
    const houseHeight = pick(random, [5, 6, 7]) * roofScale;
    const roofHeight = 3 * roofScale;
    const roofSide = 5 * roofScale;
    return [
      { id: `l-${seed}`, kind: "l-shape", dimensions: { width, height, cutWidth, cutHeight }, first: 2 * (width + height), second: width * height - cutWidth * cutHeight, firstLabel: "둘레", secondLabel: "넓이", firstUnit: "cm", secondUnit: "cm²" },
      { id: `frame-${seed}`, kind: "frame", dimensions: { width: frameWidth, height: frameHeight, innerWidth, innerHeight }, first: 2 * (frameWidth + frameHeight + innerWidth + innerHeight), second: frameWidth * frameHeight - innerWidth * innerHeight, firstLabel: "둘레", secondLabel: "넓이", firstUnit: "cm", secondUnit: "cm²" },
      { id: `u-${seed}`, kind: "u-shape", dimensions: { width: uWidth, height: uHeight, notchWidth, notchHeight }, first: 2 * (uWidth + uHeight) + 2 * notchHeight, second: uWidth * uHeight - notchWidth * notchHeight, firstLabel: "둘레", secondLabel: "넓이", firstUnit: "cm", secondUnit: "cm²" },
      { id: `house-${seed}`, kind: "house", dimensions: { width: houseWidth, height: houseHeight, roofHeight, roofSide }, first: houseWidth + 2 * houseHeight + 2 * roofSide, second: houseWidth * houseHeight + houseWidth * roofHeight / 2, firstLabel: "둘레", secondLabel: "넓이", firstUnit: "cm", secondUnit: "cm²" },
    ];
  }
  const length = pick(random, [8, 10, 12]);
  const width = pick(random, [5, 6, 7]);
  const height = pick(random, [4, 5, 6]);
  const cubeSide = pick(random, [3, 4, 5]);
  const baseLength = pick(random, [8, 10, 12]);
  const baseWidth = pick(random, [6, 8]);
  const baseHeight = pick(random, [3, 4]);
  const topLength = baseLength / 2;
  const topWidth = baseWidth / 2;
  const topHeight = pick(random, [2, 3, 4]);
  const side = pick(random, [6, 8, 10]);
  const removedSide = side / 2;
  return [
    { id: `open-${seed}`, kind: "open-box", dimensions: { length, width, height }, first: length * width + 2 * length * height + 2 * width * height, second: length * width * height, firstLabel: "겉넓이", secondLabel: "부피", firstUnit: "cm²", secondUnit: "cm³" },
    { id: `joined-${seed}`, kind: "joined-cubes", dimensions: { side: cubeSide }, first: 10 * cubeSide ** 2, second: 2 * cubeSide ** 3, firstLabel: "겉넓이", secondLabel: "부피", firstUnit: "cm²", secondUnit: "cm³" },
    { id: `stacked-${seed}`, kind: "stacked-prisms", dimensions: { baseLength, baseWidth, baseHeight, topLength, topWidth, topHeight }, first: 2 * (baseLength * baseWidth + baseLength * baseHeight + baseWidth * baseHeight) + 2 * (topLength * topWidth + topLength * topHeight + topWidth * topHeight) - 2 * topLength * topWidth, second: baseLength * baseWidth * baseHeight + topLength * topWidth * topHeight, firstLabel: "겉넓이", secondLabel: "부피", firstUnit: "cm²", secondUnit: "cm³" },
    { id: `cut-${seed}`, kind: "corner-cut-cube", dimensions: { side, removedSide }, first: 6 * side ** 2, second: side ** 3 - removedSide ** 3, firstLabel: "겉넓이", secondLabel: "부피", firstUnit: "cm²", secondUnit: "cm³" },
  ];
}

export function normalizeGeometryMeasurementAnswer(value: string) {
  const normalized = value.replace(/,/g, "").trim();
  return /^-?\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : Number.NaN;
}
