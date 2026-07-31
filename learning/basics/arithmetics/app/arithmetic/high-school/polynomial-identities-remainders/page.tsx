"use client";

import {
  createPolynomialIdentityRemainderProblems,
  polynomialIdentityRemainderProblems,
} from "../../../../lib/polynomial-identity-remainder-workouts";
import GeometryChoiceWorksheet from "../components/geometry-choice-worksheet";

export default function PolynomialIdentitiesRemaindersPage() {
  return (
    <GeometryChoiceWorksheet
      subject="공통수학 1"
      title="항등식과 나머지정리"
      seed={20260730}
      problems={polynomialIdentityRemainderProblems}
      createSet={createPolynomialIdentityRemainderProblems}
    />
  );
}
