"use client";

import type { ReactNode } from "react";

import MathFormula from "../../../components/math-formula";
import InlineMathText from "../../../components/inline-math-text";
import { worksheetQuestion } from "../../../components/worksheet-question-prompt";

export type WorksheetChoice = {
  id: string;
  latex: string;
  correct: boolean;
};

export type WorksheetChoiceProblem = {
  id: string;
  label: string;
  prompt: string;
  latex?: string;
  visual?: ReactNode;
  choices: WorksheetChoice[];
  correctLatex: string;
};

type Props = {
  title: string;
  problems: WorksheetChoiceProblem[];
  displayStyle?: boolean;
  selected: Record<string, string>;
  results: Record<string, boolean>;
  onSelect: (problemId: string, choiceId: string) => void;
  onGrade: () => void;
  onClose: () => void;
};

export default function WorksheetChoicePanel({ title, problems, displayStyle = false, selected, results, onSelect, onGrade, onClose }: Props) {
  const completed = problems.filter((problem) => selected[problem.id] !== undefined).length;
  const graded = Object.keys(results).length > 0;
  const correct = Object.values(results).filter(Boolean).length;
  return (
    <div className="trig-derivative-answer-panel-backdrop" role="presentation" onClick={onClose}>
      <aside className="trig-derivative-answer-panel worksheet-choice-modal" role="dialog" aria-modal="true" aria-label={`${title} 답안 입력`} onClick={(event) => event.stopPropagation()}>
        <header>
          <div>
            <strong>답안 입력</strong>
            <span>{graded ? `${correct}/${problems.length}문제 정답` : `${completed}/${problems.length}문제 선택`}</span>
          </div>
          <button type="button" onClick={onClose} aria-label="닫기">×</button>
        </header>
        <div className="trig-derivative-answer-list">
          {problems.map((problem, problemIndex) => {
            const problemGraded = problem.id in results;
            const problemCorrect = results[problem.id] === true;
            return (
              <section className={`trig-derivative-answer-item${problemGraded ? problemCorrect ? " is-correct" : " is-wrong" : ""}`} key={problem.id}>
                <div className="trig-derivative-answer-item-heading">
                  <strong>{String(problemIndex + 1).padStart(2, "0")}</strong>
                  <span><InlineMathText text={worksheetQuestion(problem.label, problem.prompt)} /></span>
                  {problemGraded && <b className={`trig-derivative-answer-status ${problemCorrect ? "is-correct" : "is-wrong"}`}>{problemCorrect ? "맞음" : "틀림"}</b>}
                </div>
                {problem.visual && <div className="worksheet-choice-problem-visual">{problem.visual}</div>}
                {problem.latex && <div className="trig-derivative-answer-question"><MathFormula latex={problem.latex} displayStyle /></div>}
                <div className="trig-derivative-choices">
                  {problem.choices.map((choice, choiceIndex) => {
                    const isSelected = selected[problem.id] === choice.id;
                    const isCorrectAnswer = problemGraded && choice.correct;
                    const isWrongAnswer = problemGraded && isSelected && !choice.correct;
                    return (
                      <button
                        className={`trig-derivative-choice${isSelected ? " is-selected" : ""}${isCorrectAnswer ? " is-correct-answer" : ""}${isWrongAnswer ? " is-wrong-answer" : ""}`}
                        type="button"
                        key={choice.id}
                        aria-pressed={isSelected}
                        onClick={() => onSelect(problem.id, choice.id)}
                      >
                        <span>{choiceIndex + 1}</span><MathFormula latex={choice.latex} displayStyle={displayStyle} />
                      </button>
                    );
                  })}
                </div>
                {problemGraded && (
                  <div className={`trig-derivative-answer-feedback ${problemCorrect ? "is-correct" : "is-wrong"}`} role="status">
                    <strong>{problemCorrect ? "정답입니다" : "오답입니다"}</strong>
                    {!problemCorrect && <span>정답 <MathFormula latex={problem.correctLatex} displayStyle={displayStyle} /></span>}
                  </div>
                )}
              </section>
            );
          })}
        </div>
        <footer className="trig-derivative-answer-actions">
          <span>{graded ? `${correct}문제 맞음 · ${problems.length - correct}문제 틀림` : "답을 고른 뒤 채점하세요."}</span>
          <button className="button primary trig-derivative-panel-grade" type="button" disabled={completed === 0} onClick={onGrade}>{graded ? "다시 채점" : "전체 채점"}</button>
        </footer>
      </aside>
    </div>
  );
}
