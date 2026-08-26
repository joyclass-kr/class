"use client";

import {
  advancedDifferentiationProblems,
  createAdvancedDifferentiationProblems,
} from "../../../../lib/advanced-differentiation-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function AdvancedDifferentiationPage() {
  return (
    <GeometryChoiceWorksheet
      subject="미적분Ⅱ"
      title="매개변수·음함수·역함수 미분"
      seed={20260831}
      problems={advancedDifferentiationProblems}
      createSet={createAdvancedDifferentiationProblems}
    />
  );
}
