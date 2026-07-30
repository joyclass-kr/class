import assert from "node:assert/strict";
import test from "node:test";

import {
  createSigmaRecurrenceSet,
  sameSigmaRecurrenceAnswer,
} from "../lib/sigma-recurrence-workouts.ts";

test("시그마·점화식은 다섯 합과 두 점화식 계산을 다룬다", () => {
  assert.deepEqual(
    createSigmaRecurrenceSet(1).problems.map(({ kind }) => kind),
    [
      "linear-sigma",
      "square-sigma",
      "cubic-sigma",
      "geometric-sigma",
      "telescoping-sigma",
      "difference-recurrence",
      "affine-recurrence",
    ],
  );
});

test("시그마·점화식 정답은 정확한 정수로 채점한다", () => {
  assert.equal(sameSigmaRecurrenceAnswer("125", 125), true);
  assert.equal(sameSigmaRecurrenceAnswer("125.0", 125), false);
});

test("시그마·점화식은 시드에 따라 다른 일곱 문제를 생성한다", () => {
  const first = createSigmaRecurrenceSet(1).problems;
  const second = createSigmaRecurrenceSet(2).problems;
  assert.equal(first.length, 7);
  assert.equal(second.length, 7);
  assert.notDeepEqual(
    first.map(({ latex, answer }) => [latex, answer]),
    second.map(({ latex, answer }) => [latex, answer]),
  );
});
