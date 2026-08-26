"use client";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import { radianArcSectorProblems } from "../../../../lib/high-school-foundation-workouts";
import { createRadianArcSectorProblems } from "../../../../lib/foundation-generated-workouts";
export default function RadianMeasurePage() {
  return <GeometryChoiceWorksheet subject="대수" title="일반각·호도법·부채꼴" seed={20260817} problems={radianArcSectorProblems} createSet={createRadianArcSectorProblems} />;
}
