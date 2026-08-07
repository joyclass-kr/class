"use client";

import {
  createCommonCountingProblemSet,
  createPermutationCombinationReviewProblems,
  createProbabilityCountingProblemSet,
} from "../../../lib/permutations-combinations-workouts";
import NumericChoiceWorksheet, { type NumericWorksheetProblem } from "./components/numeric-choice-worksheet";

function adapt(problem: ReturnType<typeof createCommonCountingProblemSet>["problems"][number]): NumericWorksheetProblem {
  return { ...problem, answers: [problem.answer], answerLabels: ["답"] };
}

export default function CombinatoricsWorksheet({ mode }: { mode: "common" | "probability" }) {
  const common = mode === "common";
  const title = common ? "경우의 수·순열·조합" : "순열의 활용과 중복조합";
  const createSet = common ? createCommonCountingProblemSet : createProbabilityCountingProblemSet;
  return <NumericChoiceWorksheet
    initialSeed={common ? 20260723 : 20260724}
    subject={common ? "공통수학 1" : "확률과 통계"}
    title={title}
    instruction="조건에 맞는 경우의 수를 계산하세요."
    createSet={(seed) => { const set = createSet(seed); return { seed: set.seed, problems: set.problems.map(adapt) }; }}
    createReviews={(kinds, seed) => createPermutationCombinationReviewProblems(kinds as never[], seed).map(adapt)}
  />;
}
