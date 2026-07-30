"use client";

import {
  createHighAdvancedFactorizationProblems,
  highAdvancedFactorizationProblems,
} from "../../../../lib/high-advanced-factorization-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function AdvancedFactorizationPage() {
  return (
    <GeometryChoiceWorksheet
      subject="공통수학1"
      title="고차식·대칭식 인수분해"
      seed={20260803}
      problems={highAdvancedFactorizationProblems}
      createSet={createHighAdvancedFactorizationProblems}
    />
  );
}
