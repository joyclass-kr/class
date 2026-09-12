"use client";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";
import { createSpaceCoordinateProblems } from "../../../../lib/geometry-generated-workouts";
const spaceCoordinateProblems = createSpaceCoordinateProblems(20260816);
export default function SpaceCoordinatesPage() {
  return <GeometryChoiceWorksheet title="공간좌표" seed={20260816} problems={spaceCoordinateProblems} createSet={createSpaceCoordinateProblems} />;
}
