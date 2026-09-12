"use client";

import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import { createConicProblems } from "../../../../lib/geometry-generated-workouts";

const conicProblems = createConicProblems(20260811);

export default function ConicSectionsPage() {
  return <GeometryChoiceWorksheet title="이차곡선의 방정식" seed={20260811} problems={conicProblems} createSet={createConicProblems} />;
}
