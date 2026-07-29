"use client";

import { useEffect, useMemo, useState } from "react";
import MathFormula from "../../../components/math-formula";
import WorksheetChoicePanel, {
  type WorksheetChoiceProblem,
} from "../../high-school/components/worksheet-choice-panel";
import {
  createMiddleQuadraticEquationProblemSet,
  createMiddleQuadraticEquationReviewProblems,
  MIDDLE_QUADRATIC_EQUATION_TITLES,
  resolveMiddleQuadraticEquationKind,
  type MiddleQuadraticEquationKind,
  type MiddleQuadraticEquationProblem,
} from "../../../../lib/middle-quadratic-equation-workouts";

const DEFAULT_KIND: MiddleQuadraticEquationKind = "roots-and-squares";
const INITIAL_SEED = 20260729;
const DIFFICULTY_LABELS: Record<MiddleQuadraticEquationProblem["difficulty"], string> = {
  basic: "기본",
  application: "응용",
  advanced: "고난도",
};

function choiceProblem(problem: MiddleQuadraticEquationProblem): WorksheetChoiceProblem {
  const choices = [
    { id: `${problem.id}-correct`, latex: problem.answerLatex, correct: true },
    ...problem.distractors.map((latex, index) => ({
      id: `${problem.id}-wrong-${index}`,
      latex,
      correct: false,
    })),
  ];
  const shift = [...problem.id].reduce((total, character) => total + character.charCodeAt(0), 0) % choices.length;
  return {
    id: problem.id,
    label: "이차방정식의 해",
    correctLatex: problem.answerLatex,
    choices: [...choices.slice(shift), ...choices.slice(0, shift)],
  };
}

export default function MiddleQuadraticEquationsPage() {
  const [kind, setKind] = useState<MiddleQuadraticEquationKind>(DEFAULT_KIND);
  const [problemSet, setProblemSet] = useState(() => (
    createMiddleQuadraticEquationProblemSet(DEFAULT_KIND, INITIAL_SEED)
  ));
  const [reviews, setReviews] = useState<MiddleQuadraticEquationProblem[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [panelOpen, setPanelOpen] = useState(false);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const requestedKind = resolveMiddleQuadraticEquationKind(
      new URLSearchParams(window.location.search).get("kind"),
    );
    if (!requestedKind || requestedKind === kind) return;
    setKind(requestedKind);
    setProblemSet(createMiddleQuadraticEquationProblemSet(requestedKind, INITIAL_SEED));
    setReviews([]);
    setSelected({});
    setResults({});
  }, [kind]);

  useEffect(() => {
    const fit = () => setScale(Math.min((window.innerWidth - 32) / 794, 1));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const title = MIDDLE_QUADRATIC_EQUATION_TITLES[kind];
  const problems = useMemo(() => [...problemSet.problems, ...reviews], [problemSet.problems, reviews]);
  const choiceProblems = useMemo(() => problems.map(choiceProblem), [problems]);
  const wrong = problemSet.problems.filter((problem) => results[problem.id] === false);

  function reset() {
    setSelected({});
    setResults({});
    setReviews([]);
  }

  function choose(problemId: string, choiceId: string) {
    setSelected((current) => ({ ...current, [problemId]: choiceId }));
    setResults((current) => {
      if (!(problemId in current)) return current;
      const next = { ...current };
      delete next[problemId];
      return next;
    });
  }

  function grade() {
    setResults(Object.fromEntries(choiceProblems.map((problem) => [
      problem.id,
      problem.choices.find((choice) => choice.id === selected[problem.id])?.correct === true,
    ])));
  }

  function row(problem: MiddleQuadraticEquationProblem, index: number, answerSheet: boolean) {
    const previousDifficulty = index > 0 ? problemSet.problems[index - 1]?.difficulty : undefined;
    const beginsDifficultySection = (
      index < problemSet.problems.length
      && problem.difficulty !== previousDifficulty
    );

    return (
      <article
        className={`polynomial-question logarithm-question middle-equation-difficulty-${problem.difficulty}${beginsDifficultySection ? " middle-equation-difficulty-start" : ""}`}
        data-difficulty={problem.difficulty}
        data-testid="middle-quadratic-question"
        key={`${problem.id}-${answerSheet}`}
      >
        <div className="polynomial-question-number">{String(index + 1).padStart(2, "0")}</div>
        {beginsDifficultySection && (
          <span className="middle-equation-difficulty-label" data-testid="middle-equation-difficulty-label">
            {DIFFICULTY_LABELS[problem.difficulty]}
          </span>
        )}
        <div className="polynomial-question-body">
          <span className="polynomial-focus-label">{problem.label}</span>
          <div className="logarithm-expression">
            <MathFormula latex={problem.latex} display />
          </div>
          {answerSheet && (
            <>
              <div className="middle-equation-static-answer">
                <strong>정답</strong>
                <MathFormula latex={problem.answerLatex} />
              </div>
              <p className="middle-equation-solution-hint" data-testid="middle-equation-solution-hint">
                <strong>핵심</strong>
                {problem.solutionHint}
              </p>
            </>
          )}
        </div>
      </article>
    );
  }

  function sheet(answerSheet: boolean) {
    return (
      <div className={`a4-sheet counting-sheet polynomial-sheet logarithm-sheet polynomial-sheet-${problems.length}`} style={{ transform: `scale(${scale})` }}>
        <header className="counting-sheet-header polynomial-sheet-header">
          <div className="counting-sheet-title"><span>중학교 3학년</span><strong>{title}{answerSheet ? " 정답" : ""}</strong></div>
          <div className="counting-sheet-info"><span>이름 <i /></span><span>날짜 <i /></span><small>문제지 {problemSet.seed}</small></div>
        </header>
        <div className="polynomial-instruction"><b>이차방정식의 모든 해를 구하세요. 빈 공간에 계산 과정을 쓰세요.</b><span>답안 입력에서 4지선다 채점 · 오답 보충 최대 2문제</span></div>
        <div className="polynomial-problem-grid logarithm-grid">{problems.map((problem, index) => row(problem, index, answerSheet))}</div>
      </div>
    );
  }

  return (
    <main className="counting-page polynomial-page logarithm-page numeric-choice-page middle-quadratic-page">
      <div className="counting-toolbar">
        <a className="counting-back" href="/arithmetic">← 연산</a>
        <div className="counting-progress"><strong>{Object.values(results).filter(Boolean).length}<small>/{problems.length} 정답</small></strong></div>
        <div className="toolbar">
          <button className="button secondary" type="button" onClick={() => { setProblemSet(createMiddleQuadraticEquationProblemSet(kind, Date.now() >>> 0)); reset(); }}>새 문제</button>
          <button className="button ghost" type="button" onClick={reset}>다시 풀기</button>
          {reviews.length === 0 && wrong.length > 0 && (
            <button className="button secondary" type="button" onClick={() => setReviews(createMiddleQuadraticEquationReviewProblems(wrong.map(({ kind: wrongKind }) => wrongKind), problemSet.seed ^ 0x9e3779b9))}>
              틀린 유형 {Math.min(wrong.length, 2)}문제 더
            </button>
          )}
          <button className="button secondary" type="button" onClick={() => setPanelOpen(true)}>답안 입력</button>
          <button className="button ghost" type="button" onClick={() => window.print()}>인쇄</button>
          <button className="button primary" type="button" onClick={grade}>전체 채점</button>
        </div>
      </div>
      <div className="a4-stage counting-a4-stage worksheet-stage" style={{ width: 794 * scale, height: 1123 * scale }} aria-label={`A4 ${title} 문제지`}>{sheet(false)}</div>
      <div className="a4-stage counting-a4-stage answer-stage" style={{ width: 794 * scale, height: 1123 * scale }} aria-label={`A4 ${title} 정답지`}>{sheet(true)}</div>
      {panelOpen && <WorksheetChoicePanel title={title} problems={choiceProblems} selected={selected} results={results} onSelect={choose} onGrade={grade} onClose={() => setPanelOpen(false)} />}
    </main>
  );
}
