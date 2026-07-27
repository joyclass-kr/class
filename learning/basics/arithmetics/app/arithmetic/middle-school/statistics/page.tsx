"use client";

import { useEffect, useMemo, useState } from "react";
import MathFormula from "../../../components/math-formula";
import WorksheetChoicePanel, {
  type WorksheetChoiceProblem,
} from "../../high-school/components/worksheet-choice-panel";
import {
  createMiddleStatisticsProblemSet,
  createMiddleStatisticsReviewProblems,
  isMiddleStatisticsKind,
  MIDDLE_STATISTICS_TITLES,
  type MiddleStatisticsKind,
  type MiddleStatisticsProblem,
} from "../../../../lib/middle-statistics-workouts";

const DEFAULT_KIND: MiddleStatisticsKind = "mean";
const INITIAL_SEED = 20260802;
const DIFFICULTY_LABELS: Record<MiddleStatisticsProblem["difficulty"], string> = {
  basic: "기본",
  application: "응용",
  advanced: "고난도",
};
const TARGET_LABELS: Record<MiddleStatisticsKind, string> = {
  mean: "평균은?",
  "missing-from-mean": "x의 값은?",
  "frequency-mean": "평균은?",
  median: "중앙값은?",
  mode: "최빈값은?",
  range: "범위는?",
  deviations: "편차는?",
  variance: "분산은?",
  "standard-deviation": "표준편차는?",
  "variance-from-deviations": "분산은?",
  "compare-spread": "산포도가 더 작은 자료는?",
  comprehensive: "구하는 값은?",
};

function choiceProblem(problem: MiddleStatisticsProblem): WorksheetChoiceProblem {
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
    label: TARGET_LABELS[problem.kind],
    correctLatex: problem.answerLatex,
    choices: [...choices.slice(shift), ...choices.slice(0, shift)],
  };
}

export default function MiddleStatisticsPage() {
  const [kind, setKind] = useState<MiddleStatisticsKind>(DEFAULT_KIND);
  const [problemSet, setProblemSet] = useState(() => (
    createMiddleStatisticsProblemSet(DEFAULT_KIND, INITIAL_SEED)
  ));
  const [reviews, setReviews] = useState<MiddleStatisticsProblem[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [panelOpen, setPanelOpen] = useState(false);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const requestedKind = new URLSearchParams(window.location.search).get("kind");
    if (!isMiddleStatisticsKind(requestedKind) || requestedKind === kind) return;
    setKind(requestedKind);
    setProblemSet(createMiddleStatisticsProblemSet(requestedKind, INITIAL_SEED));
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

  const title = MIDDLE_STATISTICS_TITLES[kind];
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
      const next = { ...current };
      delete next[problemId];
      return next;
    });
  }

  function grade() {
    const next: Record<string, boolean> = {};
    for (const problem of choiceProblems) {
      const choice = problem.choices.find((item) => item.id === selected[problem.id]);
      if (choice) next[problem.id] = choice.correct;
    }
    setResults(next);
  }

  function row(problem: MiddleStatisticsProblem, index: number, answerSheet: boolean) {
    const beginsDifficultySection = index === 0 || index === 2 || index === 5;
    return (
      <article
        className={`polynomial-question logarithm-question middle-equation-difficulty-${problem.difficulty}${beginsDifficultySection ? " middle-equation-difficulty-start" : ""}`}
        data-testid="middle-statistics-question"
        key={`${answerSheet ? "answer" : "question"}-${problem.id}`}
      >
        <div className="polynomial-question-number">{String(index + 1).padStart(2, "0")}</div>
        {beginsDifficultySection && (
          <span className="middle-equation-difficulty-label" data-testid="middle-statistics-difficulty-label">
            {DIFFICULTY_LABELS[problem.difficulty]}
          </span>
        )}
        <div className="polynomial-question-body">
          <span className="polynomial-focus-label">{problem.label}</span>
          <div className="logarithm-expression">
            <MathFormula latex={problem.latex} />
          </div>
          {answerSheet && (
            <>
              <div className="middle-equation-static-answer">
                <strong>정답</strong>
                <MathFormula latex={problem.answerLatex} />
              </div>
              <p className="middle-equation-solution-hint" data-testid="middle-statistics-solution-hint">
                <strong>핵심</strong> {problem.solutionHint}
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
        <div className="polynomial-instruction"><b>주어진 자료의 대푯값 또는 산포도를 계산하세요.</b><span>답안 입력에서 4지선다 채점 · 오답 보충 최대 2문제</span></div>
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
          <button className="button secondary" type="button" onClick={() => { setProblemSet(createMiddleStatisticsProblemSet(kind, Date.now() >>> 0)); reset(); }}>새 문제</button>
          <button className="button ghost" type="button" onClick={reset}>다시 풀기</button>
          {wrong.length > 0 && (
            <button className="button secondary" type="button" onClick={() => setReviews(createMiddleStatisticsReviewProblems(wrong.map(({ kind: wrongKind }) => wrongKind), problemSet.seed ^ 0x9e3779b9))}>
              오답 보충
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
