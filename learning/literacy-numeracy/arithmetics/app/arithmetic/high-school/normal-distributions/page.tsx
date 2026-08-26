"use client";

import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import {
  createNormalDistributionProblems,
  normalDistributionProblems,
} from "../../../../lib/normal-distribution-workouts";

export default function NormalDistributionsPage() {
  return (
    <GeometryChoiceWorksheet
      subject="확률과 통계"
      title="정규분포의 계산"
      seed={20260821}
      problems={normalDistributionProblems}
      createSet={createNormalDistributionProblems}
    />
  );
}
