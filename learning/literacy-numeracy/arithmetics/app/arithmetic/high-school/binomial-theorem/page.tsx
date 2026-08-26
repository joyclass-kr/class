"use client";

import {
  binomialTheoremProblems,
  createBinomialTheoremProblems,
} from "../../../../lib/binomial-theorem-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function BinomialTheoremPage() {
  return (
    <GeometryChoiceWorksheet
      subject="확률과 통계"
      title="이항정리"
      seed={20260822}
      problems={binomialTheoremProblems}
      createSet={createBinomialTheoremProblems}
    />
  );
}
