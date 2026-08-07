"use client";

import { useEffect, useState } from "react";

type PrintMode = "worksheet" | "answers" | "both";
type DivisionKind = "quotative" | "partitive";
type GroupOption = { groupSize: number; groupCount: number };
type StoryProblem = {
  id: string;
  index: number;
  divisor: number;
  kind: DivisionKind;
  unit: string;
  options: [GroupOption, GroupOption];
  correctOption: 0 | 1;
};
type ProblemSet = { seed: number; problems: StoryProblem[] };

const INITIAL_SEED = 20260720;
const STORY_TYPES: Array<{ kind: DivisionKind; unit: string }> = [
  { kind: "quotative", unit: "명" },
  { kind: "partitive", unit: "개" },
  { kind: "quotative", unit: "통" },
  { kind: "quotative", unit: "명" },
  { kind: "quotative", unit: "일" },
  { kind: "partitive", unit: "개" },
  { kind: "quotative", unit: "일" },
  { kind: "partitive", unit: "장" },
  { kind: "partitive", unit: "명" },
  { kind: "quotative", unit: "대" },
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
    problems: STORY_TYPES.map(({ kind, unit }, index) => {
      const divisor = integer(next, 2, 3);
      const groupSize = kind === "quotative" ? divisor : 6 / divisor;
      const groupCount = 6 / groupSize;
      const correct: GroupOption = { groupSize, groupCount };
      const swapped: GroupOption = { groupSize: groupCount, groupCount: groupSize };
      const swap = next() < 0.5;
      const options: [GroupOption, GroupOption] = swap ? [swapped, correct] : [correct, swapped];
      const correctOption: 0 | 1 = swap ? 1 : 0;
      return { id: `division-story-${index}`, index, divisor, kind, unit, options, correctOption };
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
  const [answers, setAnswers] = useState<Record<string, 0 | 1>>({});
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

  function selectOption(id: string, optionIndex: 0 | 1) {
    setAnswers((current) => ({ ...current, [id]: optionIndex }));
    setResults((current) => {
      if (!(id in current)) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function checkAll() {
    setResults(Object.fromEntries(questionSet.problems.map((problem) => [problem.id, answers[problem.id] === problem.correctOption])));
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
          {problem.options.map((option, optionIndex) => {
            const isCorrectOption = optionIndex === problem.correctOption;
            const isSelected = selected === optionIndex;
            const stateClass = answerSheet ? (isCorrectOption ? "is-answer" : "") : (isSelected ? "is-selected" : "");
            const markClass = ["division-option-mark", stateClass].filter(Boolean).join(" ");
            const diagram = <GroupDiagram option={option} className={stateClass} />;
            return answerSheet ? (
              <div className="division-option" key={optionIndex}>
                {diagram}
                <span className={markClass} aria-hidden="true" />
              </div>
            ) : (
              <button
                type="button"
                className="division-option"
                onClick={() => selectOption(problem.id, optionIndex as 0 | 1)}
                aria-pressed={isSelected}
                aria-label={`${problem.index + 1}번 ${optionIndex === 0 ? "왼쪽" : "오른쪽"} 그림 선택`}
                key={optionIndex}
              >
                {diagram}
                <span className={markClass} aria-hidden="true" />
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
