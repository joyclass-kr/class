"use client";

import {
  createQuadraticFunctionRelationProblems,
  quadraticFunctionRelationProblems,
} from "../../../../lib/quadratic-foundation-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function QuadraticFunctionRelationsPage() {
  return (
    <GeometryChoiceWorksheet
      subject="공통수학1"
      title="이차방정식과 이차함수"
      seed={20260801}
      problems={quadraticFunctionRelationProblems}
      createSet={createQuadraticFunctionRelationProblems}
    />
  );
}
