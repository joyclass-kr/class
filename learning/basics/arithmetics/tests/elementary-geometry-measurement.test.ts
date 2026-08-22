import assert from "node:assert/strict";
import test from "node:test";
import { createElementaryGeometryMeasurementSet, normalizeGeometryMeasurementAnswer } from "../lib/elementary-geometry-measurement.ts";

test("plane measurement uses four composite figures", () => {
  const problems = createElementaryGeometryMeasurementSet("plane", 20260822);
  assert.deepEqual(problems.map((problem) => problem.kind), ["l-shape", "frame", "u-shape", "house"]);
  assert.ok(problems.every((problem) => problem.first > 0 && problem.second > 0));
});

test("solid measurement replaces elementary cylinder formula drills", () => {
  const problems = createElementaryGeometryMeasurementSet("solid", 20260823);
  assert.deepEqual(problems.map((problem) => problem.kind), ["open-box", "joined-cubes", "stacked-prisms", "corner-cut-cube"]);
  assert.ok(problems.every((problem) => problem.firstLabel === "겉넓이" && problem.secondLabel === "부피"));
});

test("answers accept commas but reject unit text", () => {
  assert.equal(normalizeGeometryMeasurementAnswer("1,250"), 1250);
  assert.ok(Number.isNaN(normalizeGeometryMeasurementAnswer("1250cm")));
});
