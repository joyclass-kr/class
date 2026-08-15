"use client";

import {
  createDefiniteIntegralApplicationReviews,
  createDefiniteIntegralApplicationSet,
} from "../../../../lib/definite-integral-application-workouts";
import MathFormula from "../../../components/math-formula";
import NumericChoiceWorksheet, { type NumericWorksheetProblem } from "../components/numeric-choice-worksheet";

const areaFormulas = [
  String.raw`|a|(x-\alpha)(\beta-x)\ \Rightarrow\ \dfrac{|a|}{6}L^3`,
  String.raw`|a|(x-\alpha)^2(\beta-x)\ \Rightarrow\ \dfrac{|a|}{12}L^4`,
  String.raw`|a|(x-\alpha)^3(\beta-x)\ \Rightarrow\ \dfrac{|a|}{20}L^5`,
  String.raw`|a|(x-\alpha)^2(\beta-x)^2\ \Rightarrow\ \dfrac{|a|}{30}L^5`,
  String.raw`f'(x)=a(x-\alpha)(x-\beta)\ \Rightarrow\ |f(\alpha)-f(\beta)|=\dfrac{|a|}{6}L^3`,
];

function AreaFormulaGuide() {
  return <>
    <strong>넓이·극값 공식 <MathFormula latex={String.raw`L=\beta-\alpha`} /></strong>
    <div>{areaFormulas.map((formula) => <MathFormula latex={formula} key={formula} />)}</div>
  </>;
}

export default function DefiniteIntegralApplicationsPage() {
  return <NumericChoiceWorksheet
    initialSeed={20260812}
    subject="미적분Ⅱ"
    title="정적분의 활용"
    instruction=""
    formulaGuide={<AreaFormulaGuide />}
    pageClassName="definite-integral-applications-page"
    createSet={(seed) => createDefiniteIntegralApplicationSet(seed) as { seed: number; problems: NumericWorksheetProblem[] }}
    createReviews={(kinds, seed) => createDefiniteIntegralApplicationReviews(kinds as never[], seed) as NumericWorksheetProblem[]}
    formatChoice={(_problem, values) => String(values[0])}
  />;
}
