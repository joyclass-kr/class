"use client";

import {
  createExponentialLogFunctionProblems,
  exponentialLogFunctionProblems,
} from "../../../../lib/exponential-log-function-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function ExponentialLogFunctionsPage() {
  return (
    <GeometryChoiceWorksheet
      subject="대수"
      title="지수함수·로그함수 계산과 활용"
      seed={20260829}
      problems={exponentialLogFunctionProblems}
      createSet={createExponentialLogFunctionProblems}
    />
  );
}
