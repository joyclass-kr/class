"use client";

import {
  createFunctionFoundationProblemSet,
  createFunctionFoundationReviewProblems,
  type FunctionFoundationProblem,
} from "../../../../lib/function-foundation-workouts";
import {
  createFunctionTransformationProblemSet,
  createFunctionTransformationReviewProblems,
  formatFunctionProblemLatex,
  formatLinearLatex,
  formatQuadraticLatex,
} from "../../../../lib/function-transformation-workouts";
import { createNumericChoices } from "../../../../lib/worksheet-choice-utils";
import NumericChoiceWorksheet, { type NumericWorksheetProblem } from "../components/numeric-choice-worksheet";

type FunctionPageProblem = NumericWorksheetProblem & { conceptOptions?: string[] };

function adapt(problem: ReturnType<typeof createFunctionTransformationProblemSet>["problems"][number]): NumericWorksheetProblem {
  const polynomial = problem.answer.type === "polynomial";
  const answers = polynomial ? [...problem.answer.coefficients] : [...problem.answer.numerator, ...problem.answer.denominator];
  return {
    ...problem,
    prompt: polynomial ? "합성함수를 계산하여 식을 간단히 하세요." : "역함수를 구하세요.",
    latex: formatFunctionProblemLatex(problem),
    answers,
    answerLabels: answers.map((_, index) => String(index + 1)),
    answerMode: polynomial ? "polynomial" : "rational",
  } as NumericWorksheetProblem;
}

function adaptFoundation(problem: FunctionFoundationProblem): FunctionPageProblem {
  return {
    id: problem.id,
    kind: problem.kind,
    label: problem.label,
    prompt: problem.prompt,
    latex: problem.latex,
    answers: [problem.answerIndex],
    answerLabels: ["선택"],
    conceptOptions: problem.options,
  };
}
function answerLatex(problem: NumericWorksheetProblem, values: number[]) {
  const extended = problem as FunctionPageProblem & { answerMode?: string };
  if (extended.conceptOptions) return extended.conceptOptions[values[0]];
  if (extended.answerMode === "polynomial") return formatQuadraticLatex(values as [number, number, number]);
  return `\\frac{${formatLinearLatex(values.slice(0, 2) as [number, number])}}{${formatLinearLatex(values.slice(2, 4) as [number, number])}}`;
}

function makeFunctionChoices(problem: NumericWorksheetProblem) {
  const conceptOptions = (problem as FunctionPageProblem).conceptOptions;
  if (!conceptOptions) return createNumericChoices(problem.answers, problem.id);
  return conceptOptions.map((_, index) => ({
    id: `${problem.id}-option-${index}`,
    values: [index],
    correct: index === problem.answers[0],
  }));
}
export default function FunctionTransformationsPage() {
  return <NumericChoiceWorksheet
    initialSeed={20260729}
    subject="공통수학 2"
    title="합성함수와 역함수"
    instruction="함수의 대응과 역함수 조건을 확인하고 필요한 계산을 하세요."
    createSet={(seed) => {
      const foundations = createFunctionFoundationProblemSet(seed);
      const calculations = createFunctionTransformationProblemSet(seed).problems
        .filter(({ kind }) => kind === "compose-fg" || kind === "rational-inverse")
        .map(adapt);
      return { seed, problems: [...foundations.problems.map(adaptFoundation), ...calculations] };
    }}
    createReviews={(kinds, seed) => {
      const foundations = createFunctionFoundationReviewProblems(kinds, seed).map(adaptFoundation);
      const calculations = createFunctionTransformationReviewProblems(kinds as never[], seed).map(adapt);
      return [...foundations, ...calculations].slice(0, 2);
    }}
    formatChoice={answerLatex}
    makeChoices={makeFunctionChoices}
  />;
}
