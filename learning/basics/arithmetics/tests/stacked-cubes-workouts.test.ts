import assert from "node:assert/strict";
import test from "node:test";

import { computeViews, createStackedCubesProblemSet, sameViewGrids } from "../lib/stacked-cubes-workouts.ts";

test("problem set always has 5 problems in a fixed kind order with positive totals matching their height grids", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const set = createStackedCubesProblemSet(seed);
    assert.deepEqual(set.problems.map(({ kind }) => kind), ["three-view", "count", "count", "count-map", "count-map"]);
    for (const problem of set.problems) {
      const summed = problem.heights.reduce((sum, row) => sum + row.reduce((a, b) => a + b, 0), 0);
      assert.equal(problem.total, summed);
      assert.ok(problem.total > 0, `${problem.id}: total must be positive`);
      assert.equal(problem.heights.length, problem.size);
      assert.ok(problem.heights.every((row) => row.length === problem.size));
    }
  }
});

test("same seed produces the same problem set", () => {
  const a = createStackedCubesProblemSet(777);
  const b = createStackedCubesProblemSet(777);
  assert.deepEqual(a, b);
});

test("top view marks exactly the occupied footprint cells", () => {
  const heights = [
    [0, 2, 0],
    [1, 3, 1],
    [0, 1, 0],
  ];
  const views = computeViews(heights, 3);
  assert.deepEqual(views.top, [
    [false, true, false],
    [true, true, true],
    [false, true, false],
  ]);
});

test("front view collapses each column to its tallest cube, bottom-aligned", () => {
  const heights = [
    [0, 2, 0],
    [1, 3, 1],
    [0, 1, 0],
  ];
  const views = computeViews(heights, 3);
  // column heights: [1, 3, 1] -> bottom-aligned bars in a 3-row grid
  assert.deepEqual(views.front, [
    [false, true, false],
    [false, true, false],
    [true, true, true],
  ]);
});

test("side view collapses each row to its tallest cube, bottom-aligned", () => {
  const heights = [
    [0, 2, 0],
    [1, 3, 1],
    [0, 1, 0],
  ];
  const views = computeViews(heights, 3);
  // row heights: [2, 3, 1] -> bottom-aligned bars in a 3-row grid
  assert.deepEqual(views.side, [
    [false, true, false],
    [true, true, false],
    [true, true, true],
  ]);
});

test("sameViewGrids compares grids by value", () => {
  const a = [[true, false], [false, true]];
  const b = [[true, false], [false, true]];
  const c = [[true, true], [false, true]];
  assert.equal(sameViewGrids(a, b), true);
  assert.equal(sameViewGrids(a, c), false);
});
