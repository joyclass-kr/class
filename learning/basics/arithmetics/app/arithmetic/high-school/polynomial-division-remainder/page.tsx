"use client";

import {
  createPolynomialDivisionProblems,
  polynomialDivisionProblems,
} from "../../../../lib/polynomial-division-remainder-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function PolynomialDivisionRemainderPage() {
  return (
    <GeometryChoiceWorksheet
      subject="공통수학1"
      title="다항식의 나눗셈·조립제법"
      seed={20260826}
      problems={polynomialDivisionProblems}
      createSet={createPolynomialDivisionProblems}
    />
  );
}
