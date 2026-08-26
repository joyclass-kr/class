"use client";

import {
  createDefiniteIntegralApplicationReviews,
  createDefiniteIntegralApplicationSet,
} from "../../../../lib/definite-integral-application-workouts";
import MathFormula from "../../../components/math-formula";
import NumericChoiceWorksheet, { type NumericWorksheetProblem } from "../components/numeric-choice-worksheet";

const areaFormulas = [
  String.raw`a(x-\alpha)(x-\beta)\ \Rightarrow\ S=\dfrac{|a|}{6}L^3`,
  String.raw`f(x)-\ell(x)=a(x-\alpha)^2(x-\beta)\ \Rightarrow\ S=\dfrac{|a|}{12}L^4`,
  String.raw`f(x)-\ell(x)=a(x-m+h)(x-m)(x-m-h)\ \Rightarrow\ S_{\text{한쪽}}=\dfrac{|a|}{4}h^4`,
  String.raw`f(x)=a(x-\alpha)(x-\beta)(x-\gamma)\ \Rightarrow\ S=\dfrac{|a|}{6}L^3|\gamma-m|`,
  String.raw`f(x)=Ax^3+\cdots\ \Rightarrow\ |f(\alpha)-f(\beta)|=\dfrac{|A|}{2}L^3`,
];

function AreaFormulaGuide() {
  return <>
    <strong>필수 넓이 공식 <MathFormula latex={String.raw`L=\beta-\alpha,\quad m=\dfrac{\alpha+\beta}{2}`} /></strong>
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
