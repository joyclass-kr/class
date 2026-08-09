"use client";
import { createAdvancedProbabilityProblems } from "../../../../lib/foundation-generated-workouts";
import { advancedProbabilityProblems } from "../../../../lib/high-school-foundation-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function AdvancedProbabilityRulesPage() {
  return <GeometryChoiceWorksheet
    subject="확률과 통계 심화"
    title="전체확률·베이즈 정리"
    seed={20260821}
    problems={advancedProbabilityProblems}
    createSet={createAdvancedProbabilityProblems}
  />;
}
