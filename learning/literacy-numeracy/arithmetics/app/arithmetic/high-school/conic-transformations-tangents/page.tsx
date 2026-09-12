"use client";

import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import { createConicMoveTangentProblems } from "../../../../lib/geometry-generated-workouts";

const conicMoveTangentProblems = createConicMoveTangentProblems(20260812);

export default function ConicTransformationsTangentsPage() {
  return <GeometryChoiceWorksheet title="이차곡선의 접선" seed={20260812} problems={conicMoveTangentProblems} createSet={createConicMoveTangentProblems} />;
}
