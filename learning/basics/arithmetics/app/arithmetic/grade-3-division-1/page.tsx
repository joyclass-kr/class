"use client";

import { useEffect, useState } from "react";

type PrintMode = "worksheet" | "answers" | "both";
type DivisionKind = "quotative" | "partitive";
type GroupOption = { groupSize: number; groupCount: number };
type Card = { equation: string; option: GroupOption };
type StoryProblem = {
  id: string;
  index: number;
  divisor: number;
  kind: DivisionKind;
  cards: [Card, Card, Card, Card];
  correctCard: 0 | 1 | 2 | 3;
};
type ProblemSet = { seed: number; problems: StoryProblem[] };

const INITIAL_SEED = 20260720;
const STORY_KINDS: DivisionKind[] = [
  "quotative",
  "partitive",
  "quotative",
  "quotative",
  "quotative",
  "partitive",
  "quotative",
  "partitive",
  "partitive",
  "quotative",
];

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function integer(next: () => number, minimum: number, maximum: number) {
  return minimum + Math.floor(next() * (maximum - minimum + 1));
}

function createProblemSet(seed: number): ProblemSet {
  const next = random(seed);
  return {
    seed,
    problems: STORY_KINDS.map((kind, index) => {
      const divisor = integer(next, 2, 3);
      const quotient = 6 / divisor;
      const groupSize = kind === "quotative" ? divisor : quotient;
      const groupCount = 6 / groupSize;
      const correctOption: GroupOption = { groupSize, groupCount };
      const swappedOption: GroupOption = { groupSize: groupCount, groupCount: groupSize };
      const correctEquation = `6÷${divisor}=${quotient}`;
      const swappedEquation = `6÷${quotient}=${divisor}`;
      const shuffled = [
        { equation: correctEquation, option: correctOption, isCorrect: true },
        { equation: correctEquation, option: swappedOption, isCorrect: false },
        { equation: swappedEquation, option: correctOption, isCorrect: false },
        { equation: swappedEquation, option: swappedOption, isCorrect: false },
      ];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const correctCard = shuffled.findIndex((card) => card.isCorrect) as 0 | 1 | 2 | 3;
      const cards = shuffled.map(({ equation, option }) => ({ equation, option })) as [Card, Card, Card, Card];
      return { id: `division-story-${index}`, index, divisor, kind, cards, correctCard };
    }),
  };
}

function story(problem: StoryProblem) {
  const value = problem.divisor;
  switch (problem.index) {
    case 0: return <>선물 6개를 한 명당 {value}개씩 주면 몇 명이 받을까요?</>;
    case 1: return <>선물 6개를 {value}명이 똑같이 나누면 한 명당 몇 개일까요?</>;
    case 2: return <>선물 6개를 한 통에 {value}개씩 담으면 몇 통이 될까요?</>;
    case 3: return <>머핀 6개를 한 사람이 {value}개씩 사 가면 몇 명이 살 수 있을까요?</>;
    case 4: return <>과일 6개를 하루에 {value}개씩 먹으면 며칠 걸릴까요?</>;
    case 5: return <>과일 6개를 {value}일 동안 똑같이 먹으면 하루에 몇 개일까요?</>;
    case 6: return <>학습지 6장을 하루에 {value}장씩 풀면 며칠 걸릴까요?</>;
    case 7: return <>학습지 6장을 {value}일 동안 풀면 하루에 몇 장씩 풀까요?</>;
    case 8: return <>친구 6명이 자동차 {value}대에 똑같이 타면 한 차에 몇 명일까요?</>;
    default: return <>친구 6명이 한 차에 {value}명씩 타면 차가 몇 대 필요할까요?</>;
  }
}

function GroupDiagram({ option, className }: { option: GroupOption; className?: string }) {
  return (
    <div className={`division-group-diagram${className ? ` ${className}` : ""}`} aria-label={`${option.groupSize}개씩 ${option.groupCount}묶음 그림`}>
      {Array.from({ length: option.groupCount }, (_, group) => (
        <span className="division-dot-group" key={group}>
          {Array.from({ length: option.groupSize }, (_, dot) => <i key={dot} />)}
        </span>
      ))}
    </div>
  );
}

export default function GradeThreeDivisionOnePage() {
  const [questionSet, setQuestionSet] = useState(() => createProblemSet(INITIAL_SEED));
  const [answers, setAnswers] = useState<Record<string, 0 | 1 | 2 | 3>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [sheetScale, setSheetScale] = useState(0.6);
  const [printMenuOpen, setPrintMenuOpen] = useState(false);

  useEffect(() => {
    function fitA4Sheet() {
      setSheetScale(Math.min((window.innerWidth - 32) / 794, 1));
    }
    fitA4Sheet();
    window.addEventListener("resize", fitA4Sheet);
    return () => window.removeEventListener("resize", fitA4Sheet);
  }, []);

  const completed = Object.keys(answers).length;
  const correctProblems = questionSet.problems.filter((problem) => results[problem.id] === true).length;

  function selectCard(id: string, cardIndex: 0 | 1 | 2 | 3) {
    setAnswers((current) => ({ ...current, [id]: cardIndex }));
    setResults((current) => {
      if (!(id in current)) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function checkAll() {
    setResults(Object.fromEntries(questionSet.problems.map((problem) => [problem.id, answers[problem.id] === problem.correctCard])));
  }

  function resetAnswers() {
    setAnswers({});
    setResults({});
  }

  function newSet() {
    if (completed > 0 && !window.confirm("고른 답이 사라집니다. 새 문제를 만들까요?")) return;
    setQuestionSet(createProblemSet((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0));
    setAnswers({});
    setResults({});
  }

  function printMaterials(mode: PrintMode) {
    setPrintMenuOpen(false);
    document.documentElement.dataset.printMode = mode;
    const clearPrintMode = () => delete document.documentElement.dataset.printMode;
    window.addEventListener("afterprint", clearPrintMode, { once: true });
    window.requestAnimationFrame(() => window.print());
  }

  function renderProblem(problem: StoryProblem, answerSheet: boolean) {
    const graded = problem.id in results;
    const isCorrect = graded && results[problem.id];
    const selected = answers[problem.id];
    return (
      <article className={`division-story-problem${graded ? isCorrect ? " is-correct" : " is-wrong" : ""}`} data-testid="division-story-problem" key={problem.id}>
        <p><b>{problem.index + 1}</b>{story(problem)}</p>
        <div className="division-story-options">
          {problem.cards.map((card, cardIndex) => {
            const isCorrectCard = cardIndex === problem.correctCard;
            const isSelected = selected === cardIndex;
            const stateClass = answerSheet ? (isCorrectCard ? "is-answer" : "") : (isSelected ? "is-selected" : "");
            const markClass = ["division-option-mark", stateClass].filter(Boolean).join(" ");
            const content = (
              <>
                <span className="division-option-equation">{card.equation}</span>
                <GroupDiagram option={card.option} className={stateClass} />
                <span className={markClass} aria-hidden="true" />
              </>
            );
            return answerSheet ? (
              <div className="division-option" key={cardIndex}>{content}</div>
            ) : (
              <button
                type="button"
                className="division-option"
                onClick={() => selectCard(problem.id, cardIndex as 0 | 1 | 2 | 3)}
                aria-pressed={isSelected}
                aria-label={`${problem.index + 1}번 ${cardIndex + 1}번 카드 선택`}
                key={cardIndex}
              >
                {content}
              </button>
            );
          })}
        </div>
        {!answerSheet && graded && <span className={`counting-result ${isCorrect ? "correct" : "wrong"}`} role="status">{isCorrect ? "맞음" : "틀림"}</span>}
      </article>
    );
  }

  function renderSheet(answerSheet: boolean) {
    return (
      <div className="a4-sheet counting-sheet division-story-sheet" style={{ transform: `scale(${sheetScale})` }}>
        <header className="counting-sheet-header">
          <div className="counting-sheet-title"><span>3학년</span><strong>나눗셈 ①{answerSheet ? " 정답" : ""}</strong></div>
          <div className="counting-sheet-info"><span>이름 <i /></span><span>날짜 <i /></span><small>문제지 {questionSet.seed}</small></div>
        </header>
        <div className="division-story-grid">{questionSet.problems.map((problem) => renderProblem(problem, answerSheet))}</div>
      </div>
    );
  }

  return (
    <main className="counting-page division-story-page">
      <div className="counting-toolbar">
        <a className="counting-back" href="/arithmetic">← 연산</a>
        <div className="counting-progress"><strong>{correctProblems}<small>/10 정답</small></strong></div>
        <div className="toolbar">
          <button className="button secondary" type="button" onClick={newSet}>새 문제</button>
          <button className="button ghost" type="button" onClick={resetAnswers}>다시 고르기</button>
          <div className="print-control">
            <button className="button ghost print-button" type="button" aria-expanded={printMenuOpen} aria-haspopup="menu" onClick={() => setPrintMenuOpen((open) => !open)}>인쇄</button>
            {printMenuOpen && <div className="print-menu" role="menu" aria-label="인쇄 자료 선택">
              <button type="button" role="menuitem" onClick={() => printMaterials("worksheet")}>문제지만 인쇄</button>
              <button type="button" role="menuitem" onClick={() => printMaterials("answers")}>답지만 인쇄</button>
              <button type="button" role="menuitem" onClick={() => printMaterials("both")}>문제지+답지 인쇄</button>
            </div>}
          </div>
          <button className="button primary" type="button" onClick={checkAll}>전체 채점</button>
        </div>
      </div>
      <div className="a4-stage counting-a4-stage worksheet-stage" style={{ width: 794 * sheetScale, height: 1123 * sheetScale }} aria-label="A4 3학년 나눗셈① 문제지">{renderSheet(false)}</div>
      <div className="a4-stage counting-a4-stage answer-stage" style={{ width: 794 * sheetScale, height: 1123 * sheetScale }} aria-label="A4 3학년 나눗셈① 전체 답지">{renderSheet(true)}</div>
    </main>
  );
}
