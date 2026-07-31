"use client";

import {
  createSecondDerivativeApplicationProblems,
  secondDerivativeApplicationProblems,
} from "../../../../lib/second-derivative-application-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function SecondDerivativeApplicationsPage() {
  return (
    <GeometryChoiceWorksheet
      subject="미적분Ⅱ"
      title="이계도함수·변곡점·그래프 개형"
      seed={20260901}
      problems={secondDerivativeApplicationProblems}
      createSet={createSecondDerivativeApplicationProblems}
    />
  );
}
