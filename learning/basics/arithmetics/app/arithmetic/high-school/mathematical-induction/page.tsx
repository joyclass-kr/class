"use client";

import {
  createMathematicalInductionProblems,
  mathematicalInductionProblems,
} from "../../../../lib/mathematical-induction-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function MathematicalInductionPage() {
  return (
    <GeometryChoiceWorksheet
      subject="대수"
      title="수학적 귀납법"
      seed={20260830}
      problems={mathematicalInductionProblems}
      createSet={createMathematicalInductionProblems}
    />
  );
}
