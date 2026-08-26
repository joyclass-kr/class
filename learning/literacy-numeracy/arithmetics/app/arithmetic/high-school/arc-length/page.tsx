"use client";

import {
  arcLengthProblems,
  createArcLengthProblems,
} from "../../../../lib/arc-length-surface-area-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function ArcLengthPage() {
  return (
    <GeometryChoiceWorksheet
      subject="미적분Ⅱ"
      title="곡선의 길이"
      seed={20260809}
      problems={arcLengthProblems}
      createSet={createArcLengthProblems}
    />
  );
}
