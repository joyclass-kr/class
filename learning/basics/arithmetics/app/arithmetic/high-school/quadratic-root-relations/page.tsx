"use client";

import {
  createQuadraticRootRelationProblems,
  quadraticRootRelationProblems,
} from "../../../../lib/quadratic-foundation-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function QuadraticRootRelationsPage() {
  return (
    <GeometryChoiceWorksheet
      subject="공통수학 1"
      title="이차방정식: 판별식·근과 계수"
      seed={20260731}
      problems={quadraticRootRelationProblems}
      createSet={createQuadraticRootRelationProblems}
    />
  );
}
