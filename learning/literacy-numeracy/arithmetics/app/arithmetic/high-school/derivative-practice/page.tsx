"use client";

import {
  createDerivativeProblemSet,
  createDerivativeReviewProblems,
} from "../../../../lib/derivative-workouts";
import NumericChoiceWorksheet, { type NumericWorksheetProblem } from "../components/numeric-choice-worksheet";

export default function DerivativePracticePage() {
  return <NumericChoiceWorksheet
    initialSeed={20260727}
    subject="미적분Ⅰ"
    title="다항함수의 미분"
    instruction="미분계수의 정의와 다항함수의 미분법을 이용하여 값을 구하세요."
    createSet={(seed) => createDerivativeProblemSet(seed) as { seed: number; problems: NumericWorksheetProblem[] }}
    createReviews={(kinds, seed) => createDerivativeReviewProblems(kinds as never[], seed) as NumericWorksheetProblem[]}
  />;
}
