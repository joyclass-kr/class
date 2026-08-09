"use client";

import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import { createSpaceGeometryProjectionProblems } from "../../../../lib/geometry-generated-workouts";

const initialProblems = createSpaceGeometryProjectionProblems(20260817);

export default function SpaceGeometryProjectionsPage() {
  return (
    <GeometryChoiceWorksheet
      title="공간도형의 위치 관계와 정사영"
      seed={20260817}
      problems={initialProblems}
      createSet={createSpaceGeometryProjectionProblems}
      problemsPerSheet={5}
    />
  );
}
