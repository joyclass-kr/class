"use client";

import {
  createSimultaneousQuadraticProblems,
  simultaneousQuadraticProblems,
} from "../../../../lib/quadratic-foundation-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function SimultaneousQuadraticEquationsPage() {
  return (
    <GeometryChoiceWorksheet
      subject="공통수학 1"
      title="연립이차방정식"
      seed={20260802}
      problems={simultaneousQuadraticProblems}
      createSet={createSimultaneousQuadraticProblems}
    />
  );
}
