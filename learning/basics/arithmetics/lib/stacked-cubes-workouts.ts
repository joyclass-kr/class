export type StackKind = "count" | "count-map" | "three-view";

export type ViewGrids = { top: boolean[][]; front: boolean[][]; side: boolean[][] };

export type StackProblem = {
  id: string;
  kind: StackKind;
  heights: number[][];
  size: number;
  total: number;
  views: ViewGrids;
};

export type StackProblemSet = { seed: number; problems: StackProblem[] };

export const GRID_SIZE = 3;
export const MAX_HEIGHT = 3;

const KIND_PLAN: StackKind[] = ["three-view", "count", "count", "count-map", "count-map"];

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

function emptyGrid(size: number): boolean[][] {
  return Array.from({ length: size }, () => Array<boolean>(size).fill(false));
}

function randomFootprint(next: () => number, size: number, count: number): boolean[][] {
  const grid = emptyGrid(size);
  const cells: Array<[number, number]> = [];
  const startR = integer(next, 0, size - 1);
  const startC = integer(next, 0, size - 1);
  grid[startR][startC] = true;
  cells.push([startR, startC]);
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const;
  let attempts = 0;
  while (cells.length < count && attempts < 200) {
    attempts += 1;
    const [r, c] = cells[integer(next, 0, cells.length - 1)];
    const [dr, dc] = directions[integer(next, 0, directions.length - 1)];
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= size || nc < 0 || nc >= size || grid[nr][nc]) continue;
    grid[nr][nc] = true;
    cells.push([nr, nc]);
  }
  return grid;
}

function buildHeights(next: () => number, footprint: boolean[][], minHeight: number, maxHeight: number): number[][] {
  return footprint.map((row) => row.map((occupied) => (occupied ? integer(next, minHeight, maxHeight) : 0)));
}

function barsToGrid(bars: number[], size: number): boolean[][] {
  return Array.from({ length: size }, (_, row) => bars.map((height) => size - row <= height));
}

export function computeViews(heights: number[][], size: number): ViewGrids {
  const top = heights.map((row) => row.map((height) => height > 0));
  const frontHeights = Array.from({ length: size }, (_, col) => Math.max(...heights.map((row) => row[col])));
  const sideHeights = heights.map((row) => Math.max(...row));
  return { top, front: barsToGrid(frontHeights, size), side: barsToGrid(sideHeights, size) };
}

function total(heights: number[][]) {
  return heights.reduce((sum, row) => sum + row.reduce((rowSum, height) => rowSum + height, 0), 0);
}

function buildProblem(next: () => number, kind: StackKind, id: string): StackProblem {
  const size = GRID_SIZE;
  if (kind === "count") {
    const footprint = randomFootprint(next, size, integer(next, 4, 6));
    const heights = buildHeights(next, footprint, 1, 2);
    return { id, kind, heights, size, total: total(heights), views: computeViews(heights, size) };
  }
  if (kind === "count-map") {
    const footprint = randomFootprint(next, size, integer(next, 5, 8));
    const heights = buildHeights(next, footprint, 1, MAX_HEIGHT);
    return { id, kind, heights, size, total: total(heights), views: computeViews(heights, size) };
  }
  const footprint = randomFootprint(next, size, integer(next, 3, 5));
  const heights = buildHeights(next, footprint, 1, 2);
  return { id, kind, heights, size, total: total(heights), views: computeViews(heights, size) };
}

export function createStackedCubesProblemSet(seed: number): StackProblemSet {
  const next = random(seed);
  return {
    seed,
    problems: KIND_PLAN.map((kind, index) => buildProblem(next, kind, `stacked-cubes-${index}`)),
  };
}

export function sameViewGrids(a: boolean[][], b: boolean[][]) {
  return a.every((row, r) => row.every((value, c) => value === b[r][c]));
}
