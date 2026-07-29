"use client";

import { Fragment, type ReactNode } from "react";
import { learningWorksheetCatalog } from "../../lib/arithmetic-worksheets";
import MathFormula from "../components/math-formula";

type LearningStage = "elementary" | "middle" | "high" | "stem";

const stageMeta: Record<LearningStage, { label: string; shortLabel: string }> = {
  elementary: { label: "초", shortLabel: "초" },
  middle: { label: "중", shortLabel: "중" },
  high: { label: "고", shortLabel: "고" },
  stem: { label: "이공계 기초", shortLabel: "이공계 기초" },
};

const catalogMathTokens = [
  { text: "x²+(a+b)x+ab", latex: "x^2+(a+b)x+ab" },
  { text: "30°·45°·60°", latex: "30^\\circ,\\ 45^\\circ,\\ 60^\\circ" },
  { text: "sin·cos·tan", latex: "\\sin,\\ \\cos,\\ \\tan" },
  { text: "ax²+bx+c", latex: "ax^2+bx+c" },
  { text: "y=ax²", latex: "y=ax^2" },
  { text: "x²=a", latex: "x^2=a" },
] as const;

function renderWorksheetTitle(title: string): ReactNode {
  const parts: ReactNode[] = [];
  let cursor = 0;

  while (cursor < title.length) {
    const nextToken = catalogMathTokens
      .map((token) => ({ ...token, index: title.indexOf(token.text, cursor) }))
      .filter(({ index }) => index >= 0)
      .sort((left, right) => left.index - right.index || right.text.length - left.text.length)[0];

    if (!nextToken) {
      parts.push(title.slice(cursor));
      break;
    }

    if (nextToken.index > cursor) parts.push(title.slice(cursor, nextToken.index));
    parts.push(
      <MathFormula
        key={`${nextToken.text}-${nextToken.index}`}
        latex={nextToken.latex}
        className="worksheet-title-formula"
      />,
    );
    cursor = nextToken.index + nextToken.text.length;
  }

  return parts.length ? parts : title;
}

function worksheetStage(grade: string): LearningStage {
  if (grade.startsWith("초")) return "elementary";
  if (grade.startsWith("중")) return "middle";
  if (grade === "이공계 기초") return "stem";
  return "high";
}

export default function ArithmeticCatalog() {
  const availableStages = new Set(learningWorksheetCatalog.map(({ grade }) => worksheetStage(grade)));

  function scrollToStage(stage: LearningStage) {
    document.getElementById(`stage-${stage}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="portal-page catalog-page">
      <div className="catalog-shell">
        <header className="catalog-header">
          <a className="catalog-back" href="/arithmetic" aria-label="연산 모드 선택으로 돌아가기">← 연산</a>
          <div className="catalog-header-copy">
            <a className="catalog-race-link" href="/arithmetic/race">순위 모드 <span aria-hidden="true">→</span></a>
            <div className="catalog-title-row">
              <h1>기초 연산</h1>
              <nav className="catalog-stage-nav" aria-label="수학 과정">
                {(Object.keys(stageMeta) as LearningStage[]).map((stage) => {
                  const meta = stageMeta[stage];
                  const isAvailable = availableStages.has(stage);
                  return isAvailable
                    ? <button key={stage} className={`catalog-stage-link stage-${stage}`} type="button" onClick={() => scrollToStage(stage)}>{meta.label}</button>
                    : <span key={stage} className={`catalog-stage-link stage-${stage} is-upcoming`} aria-disabled="true">{meta.label}<small>준비 중</small></span>;
                })}
              </nav>
            </div>
          </div>
        </header>
        <ol className="worksheet-catalog" aria-label="연산 학습지 목록">
          {learningWorksheetCatalog.map(({ route, grade, title }, index) => {
            const stage = worksheetStage(grade);
            const previousStage = index > 0 ? worksheetStage(learningWorksheetCatalog[index - 1].grade) : null;
            const content = <>
              <span className="worksheet-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="worksheet-title">
                <small className="worksheet-grade">{`(${grade})`}</small>
                <strong>{renderWorksheetTitle(title)}</strong>
              </span>
              {route && <span className="worksheet-arrow" aria-hidden="true">→</span>}
            </>;
            return (
              <Fragment key={`${index}-${title}`}>
                {stage !== previousStage && (
                  <li className={`worksheet-stage-heading stage-${stage}`} id={`stage-${stage}`}>
                    <strong>{stageMeta[stage].shortLabel}</strong>
                  </li>
                )}
                <li>
                  {route
                    ? <a className={`worksheet-choice is-ready stage-${stage}`} href={route} data-stage={stage} data-testid="worksheet-choice">{content}</a>
                    : <div className={`worksheet-choice stage-${stage}`} data-stage={stage} data-testid="worksheet-choice">{content}</div>}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
