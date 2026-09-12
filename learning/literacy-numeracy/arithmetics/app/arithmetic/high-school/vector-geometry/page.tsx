"use client";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import { createVectorGeometryProblems } from "../../../../lib/geometry-generated-workouts";
const vectorGeometryProblems = createVectorGeometryProblems(20260815);
export default function VectorGeometryPage() {
  return <GeometryChoiceWorksheet title="도형과 벡터" seed={20260815} problems={vectorGeometryProblems} createSet={createVectorGeometryProblems} />;
}
