"use client";

import { useEffect, useMemo, useState } from "react";
import explanationsData from "./data/explanations-77.json";
import questionsData from "./data/questions.json";

type Question = (typeof questionsData)[number];
type View = "home" | "quiz" | "result";
type QuizResult = { id: string; correct: boolean; chosen: number };
type StudyStats = Record<string, { tried: number; correct: number }>;
type Explanation = {
  answerReason: string;
  keyPoint: string;
  wrongReason: string;
};

const explanations = explanationsData as Record<string, Explanation>;
const questionImageVersion = "20260721-fit";

function TaegeukgiIcon() {
  return (
    <svg
      className="taegeukgi-icon"
      viewBox="0 0 36 24"
      width="30"
      height="20"
      aria-label="태극기"
      role="img"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        borderRadius: "3px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      <rect width="36" height="24" fill="#ffffff" rx="2" />
      <g transform="translate(18,12) rotate(-33.69)">
        <path d="M 0,-6 A 6,6 0 0,1 0,6 A 3,3 0 0,1 0,0 A 3,3 0 0,0 0,-6" fill="#CD2E3A" />
        <path d="M 0,6 A 6,6 0 0,1 0,-6 A 3,3 0 0,1 0,0 A 3,3 0 0,0 0,6" fill="#0047A0" />
      </g>
      <g transform="translate(18,12) rotate(-33.69) translate(-10.5,0) rotate(90)">
        <line x1="-3" y1="-2.2" x2="3" y2="-2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="2.2" x2="3" y2="2.2" stroke="#000" strokeWidth="0.75" />
      </g>
      <g transform="translate(18,12) rotate(-33.69) translate(10.5,0) rotate(90)">
        <line x1="-3" y1="-2.2" x2="-0.4" y2="-2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="0.4" y1="-2.2" x2="3" y2="-2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="0" x2="-0.4" y2="0" stroke="#000" strokeWidth="0.75" />
        <line x1="0.4" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="2.2" x2="-0.4" y2="2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="0.4" y1="2.2" x2="3" y2="2.2" stroke="#000" strokeWidth="0.75" />
      </g>
      <g transform="translate(18,12) rotate(33.69) translate(10.5,0) rotate(90)">
        <line x1="-3" y1="-2.2" x2="-0.4" y2="-2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="0.4" y1="-2.2" x2="3" y2="-2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="2.2" x2="-0.4" y2="2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="0.4" y1="2.2" x2="3" y2="2.2" stroke="#000" strokeWidth="0.75" />
      </g>
      <g transform="translate(18,12) rotate(33.69) translate(-10.5,0) rotate(90)">
        <line x1="-3" y1="-2.2" x2="3" y2="-2.2" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="0" x2="-0.4" y2="0" stroke="#000" strokeWidth="0.75" />
        <line x1="0.4" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.75" />
        <line x1="-3" y1="2.2" x2="3" y2="2.2" stroke="#000" strokeWidth="0.75" />
      </g>
    </svg>
  );
}

const units = [
  { id: "prehistoric", name: "선사 시대와 고조선", short: "선사·고조선", icon: "🪨", color: "mint" },
  { id: "early-states", name: "여러 나라의 성장", short: "여러 나라", icon: "🌾", color: "yellow" },
  { id: "three-kingdoms", name: "삼국과 가야", short: "삼국·가야", icon: "👑", color: "coral" },
  { id: "north-south", name: "남북국 시대", short: "남북국", icon: "🪷", color: "sky" },
  { id: "goryeo", name: "고려", short: "고려", icon: "🏺", color: "lavender" },
  { id: "joseon-early", name: "조선 전기", short: "조선 전기", icon: "📜", color: "mint" },
  { id: "joseon-late", name: "조선 후기", short: "조선 후기", icon: "🎨", color: "yellow" },
  { id: "opening", name: "개항기와 대한제국", short: "개항기", icon: "🚂", color: "coral" },
  { id: "occupation", name: "일제강점기", short: "일제강점기", icon: <TaegeukgiIcon />, color: "sky" },
  { id: "contemporary", name: "대한민국 현대사", short: "현대사", icon: "🏢", color: "lavender" },
  { id: "integrated", name: "시대 통합", short: "시대 통합", icon: "＋", color: "mint" },
];

const answerSymbols = ["", "①", "②", "③", "④"];
const playerNameKey = "classPlayerName";
const legacyWrongKey = "hanguksa-wrong";
const legacyStatsKey = "hanguksa-stats";
const solvedKey = "hanguksa-solved";

function normalizePlayerName(value: string | null) {
  const normalized = String(value || "").replace(/[^가-힣]/g, "").slice(0, 6);
  return /^[가-힣]{2,6}$/.test(normalized) ? normalized : "";
}

function playerStorageKey(baseKey: string, playerName: string) {
  return playerName ? `${baseKey}:${encodeURIComponent(playerName)}` : baseKey;
}

function migratePlayerStorage(baseKey: string, playerName: string) {
  const nextKey = playerStorageKey(baseKey, playerName);
  if (!playerName || localStorage.getItem(nextKey) !== null) return nextKey;

  const legacyValue = localStorage.getItem(baseKey);
  if (legacyValue !== null) {
    localStorage.setItem(nextKey, legacyValue);
    localStorage.removeItem(baseKey);
  }
  return nextKey;
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function StudyApp() {
  const questions = questionsData as Question[];
  const [view, setView] = useState<View>("home");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("전체 범위");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [questionCount, setQuestionCount] = useState(5);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [stats, setStats] = useState<StudyStats>({});
  const [playerName, setPlayerName] = useState("");
  const [imageExpanded, setImageExpanded] = useState(false);
  const [explanationOpen, setExplanationOpen] = useState(false);

  useEffect(() => {
    try {
      const fragmentParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const transferredName = normalizePlayerName(fragmentParams.get("student"));
      const savedName = normalizePlayerName(localStorage.getItem(playerNameKey));
      const activePlayerName = transferredName || savedName;

      if (activePlayerName) {
        localStorage.setItem(playerNameKey, activePlayerName);
        setPlayerName(activePlayerName);
      }

      if (transferredName) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }

      const wrongKey = migratePlayerStorage(legacyWrongKey, activePlayerName);
      const statsKey = migratePlayerStorage(legacyStatsKey, activePlayerName);
      const activeSolvedKey = migratePlayerStorage(solvedKey, activePlayerName);
      setWrongIds(JSON.parse(localStorage.getItem(wrongKey) || "[]"));
      setStats(JSON.parse(localStorage.getItem(statsKey) || "{}"));
      setSolvedIds(JSON.parse(localStorage.getItem(activeSolvedKey) || "[]"));
    } catch {
      setWrongIds([]);
      setStats({});
      setSolvedIds([]);
    }
  }, []);

  useEffect(() => {
    if (!imageExpanded) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setImageExpanded(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [imageExpanded]);

  const unitCounts = useMemo(() => {
    return Object.fromEntries(
      units.map((unit) => [unit.id, questions.filter((question) => question.unitId === unit.id).length]),
    );
  }, [questions]);
  const examNumbers = useMemo(
    () => Array.from(new Set(questions.map((question) => question.exam))).sort((a, b) => b - a),
    [questions],
  );
  const explainedQuestions = useMemo(
    () => questions.filter((question) => Boolean(explanations[question.id])),
    [questions],
  );

  const totalTried = Object.values(stats).reduce((sum, item) => sum + item.tried, 0);
  const currentQuestion = quiz[questionIndex];
  const currentExplanation = currentQuestion ? explanations[currentQuestion.id] : undefined;
  const correctCount = results.filter((result) => result.correct).length;

  function saveWrong(nextWrong: string[]) {
    setWrongIds(nextWrong);
    localStorage.setItem(playerStorageKey(legacyWrongKey, playerName), JSON.stringify(nextWrong));
  }

  function beginQuiz(pool: Question[], title: string, count = questionCount) {
    const picked = shuffle(pool).slice(0, Math.min(count, pool.length));
    if (picked.length === 0) return;
    setQuiz(picked);
    setQuizTitle(title);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setIncorrectAnswers([]);
    setImageExpanded(false);
    setExplanationOpen(false);
    setResults([]);
    setView("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function beginUnit(unitId: string, unitName: string) {
    beginQuiz(questions.filter((question) => question.unitId === unitId), unitName);
  }

  function chooseAnswer(answer: number) {
    if (!currentQuestion || selectedAnswer !== null || incorrectAnswers.includes(answer)) return;

    if (answer !== currentQuestion.answer) {
      setIncorrectAnswers((previous) => [...previous, answer]);
      return;
    }

    const firstTryCorrect = incorrectAnswers.length === 0;
    setSelectedAnswer(answer);
    setResults((previous) => [...previous, { id: currentQuestion.id, correct: firstTryCorrect, chosen: answer }]);

    const nextWrong = firstTryCorrect
      ? wrongIds.filter((id) => id !== currentQuestion.id)
      : Array.from(new Set([...wrongIds, currentQuestion.id]));
    saveWrong(nextWrong);

    const currentUnitStats = stats[currentQuestion.unitId] || { tried: 0, correct: 0 };
    const nextStats = {
      ...stats,
      [currentQuestion.unitId]: {
        tried: currentUnitStats.tried + 1,
        correct: currentUnitStats.correct + (firstTryCorrect ? 1 : 0),
      },
    };
    setStats(nextStats);
    localStorage.setItem(playerStorageKey(legacyStatsKey, playerName), JSON.stringify(nextStats));

    const nextSolvedIds = Array.from(new Set([...solvedIds, currentQuestion.id]));
    setSolvedIds(nextSolvedIds);
    localStorage.setItem(playerStorageKey(solvedKey, playerName), JSON.stringify(nextSolvedIds));
  }

  function resetProgress() {
    if (!window.confirm("지금까지의 풀이 기록과 오답 노트를 모두 초기화할까요?")) return;
    localStorage.removeItem(playerStorageKey(legacyWrongKey, playerName));
    localStorage.removeItem(playerStorageKey(legacyStatsKey, playerName));
    localStorage.removeItem(playerStorageKey(solvedKey, playerName));
    setWrongIds([]);
    setStats({});
    setSolvedIds([]);
  }

  function nextQuestion() {
    if (questionIndex + 1 >= quiz.length) {
      setView("result");
    } else {
      setQuestionIndex((index) => index + 1);
      setSelectedAnswer(null);
      setIncorrectAnswers([]);
      setImageExpanded(false);
      setExplanationOpen(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setView("home");
    setSelectedAnswer(null);
    setIncorrectAnswers([]);
    setImageExpanded(false);
    setExplanationOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (view === "quiz" && currentQuestion) {
    return (
      <main className={`site-shell quiz-shell quiz-shell-solving ${selectedAnswer !== null ? "quiz-shell-answered" : ""}`}>
        <header className="quiz-header">
          <nav className="quiz-nav" aria-label="바로가기">
            <button className="text-button" onClick={goHome} aria-label="단원 선택으로 돌아가기">←</button>
          </nav>
          <div className="quiz-heading">
            <span>{quizTitle}</span>
            <strong>{questionIndex + 1} / {quiz.length}</strong>
          </div>
          <div className="progress-track" aria-label={`전체 ${quiz.length}문제 중 ${questionIndex + 1}번째`}>
            <span style={{ width: `${((questionIndex + 1) / quiz.length) * 100}%` }} />
          </div>
        </header>

        <section className="question-card question-card-solving" aria-labelledby="question-label">
          <div className="question-meta">
            <span className="unit-pill">{currentQuestion.unit}</span>
            <div className="question-meta-actions">
              {selectedAnswer !== null ? (
                <div className="answer-complete-inline" role="status">
                  <strong>{incorrectAnswers.length > 0 ? "정답을 찾았습니다." : "정답입니다."}</strong>
                  {currentExplanation && (
                    <button type="button" onClick={() => setExplanationOpen(true)}>해설 보기</button>
                  )}
                  <button className="inline-next-button" type="button" onClick={nextQuestion}>
                    {questionIndex + 1 === quiz.length ? "결과 보기" : "다음 문제 →"}
                  </button>
                </div>
              ) : (
                <>
                  {incorrectAnswers.length > 0 && (
                    <span className="retry-notice" role="status">다시 생각하고 다른 답을 골라보세요.</span>
                  )}
                  <span>{currentQuestion.topic} · {currentQuestion.points}점</span>
                  <button
                    className="image-expand-button"
                    type="button"
                    onClick={() => setImageExpanded(true)}
                  >
                    크게 보기
                  </button>
                </>
              )}
            </div>
          </div>
          <h1 id="question-label" className="sr-only">제{currentQuestion.exam}회 기본 {currentQuestion.number}번 문제</h1>
          <div className="question-image-wrap">
            <img
              className="question-image"
              src={`${currentQuestion.image}?v=${questionImageVersion}`}
              alt={`제${currentQuestion.exam}회 기본 ${currentQuestion.number}번 문제`}
              decoding="async"
            />
          </div>

          <div className="answer-grid" aria-label="정답 선택">
            {[1, 2, 3, 4].map((answer) => {
              const state = selectedAnswer === null
                ? incorrectAnswers.includes(answer) ? "wrong" : ""
                : answer === currentQuestion.answer
                  ? "correct"
                  : answer === selectedAnswer
                    ? "wrong"
                    : "muted";
              return (
                <button
                  key={answer}
                  className={`answer-button ${state}`}
                  onClick={() => chooseAnswer(answer)}
                  disabled={selectedAnswer !== null || incorrectAnswers.includes(answer)}
                  aria-label={`${answer}번 선택`}
                >
                  {answerSymbols[answer]}
                </button>
              );
            })}
          </div>

        </section>
        {explanationOpen && currentExplanation && (
          <div className="explanation-modal" role="dialog" aria-modal="true" aria-labelledby="explanation-title">
            <aside className="explanation-modal-panel">
              <button className="explanation-modal-close" type="button" onClick={() => setExplanationOpen(false)}>닫기</button>
              <div className="explanation-card">
                <h2 id="explanation-title">정답 해설</h2>
                <p className="answer-reason">{currentExplanation.answerReason}</p>
                <div className="explanation-grid">
                  <section><h3>핵심 개념</h3><p>{currentExplanation.keyPoint}</p></section>
                  <section><h3>오답 정리</h3><p>{currentExplanation.wrongReason}</p></section>
                </div>
              </div>
              <p className="source-note">출처: {currentQuestion.source}</p>
            </aside>
          </div>
        )}
        {imageExpanded && (
          <div
            className="image-modal"
            role="dialog"
            aria-modal="true"
            aria-label="문제 이미지 크게 보기"
            onClick={() => setImageExpanded(false)}
          >
            <div className="image-modal-panel" onClick={(event) => event.stopPropagation()}>
              <button
                className="image-modal-close"
                type="button"
                onClick={() => setImageExpanded(false)}
              >
                닫기
              </button>
              <img
                src={`${currentQuestion.image}?v=${questionImageVersion}`}
                alt={`제${currentQuestion.exam}회 기본 ${currentQuestion.number}번 문제 크게 보기`}
              />
            </div>
          </div>
        )}
      </main>
    );
  }

  if (view === "result") {
    const runWrongIds = results.filter((result) => !result.correct).map((result) => result.id);
    const runWrongQuestions = questions.filter((question) => runWrongIds.includes(question.id));
    return (
      <main className="site-shell result-shell">
        <section className="result-card">
          <p className="eyebrow">{quizTitle}</p>
          <h1>채점 결과</h1>
          <div className="score-ring">
            <strong>{correctCount}</strong>
            <span>/ {quiz.length}문제</span>
          </div>
          <p className="result-message">
            {playerName ? `${playerName} 님, ` : ""}총 {quiz.length}문제 중 {correctCount}문제를 맞혔습니다.
            {quiz.length - correctCount > 0 && ` 틀린 ${quiz.length - correctCount}문제는 오답 노트에 저장되었습니다.`}
          </p>
          <div className="result-actions">
            {runWrongQuestions.length > 0 && (
              <button className="primary-button" onClick={() => beginQuiz(runWrongQuestions, "방금 틀린 문제", runWrongQuestions.length)}>
                틀린 문제 다시 풀기
              </button>
            )}
            <button className="secondary-button" onClick={goHome}>다른 단원 고르기</button>
            <a className="secondary-button button-link" href="/">포털 메인</a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell home-shell">
      <a className="home-back" href="/" aria-label="포털 메인으로 돌아가기">←</a>

      <section className="study-section" id="top" aria-label="문제 설정과 단원 목록">
        <div className="section-heading section-heading-actions">
          <div className="section-actions">
            <div className="count-picker" aria-label="한 번에 풀 문제 수">
              <span>문제 수</span>
              {[5, 10].map((count) => (
                <button
                  key={count}
                  className={questionCount === count ? "active" : ""}
                  onClick={() => setQuestionCount(count)}
                  aria-pressed={questionCount === count}
                >
                  {count}문제
                </button>
              ))}
            </div>
            <button
              className="explanation-quiz-button"
              onClick={() => beginQuiz(explainedQuestions, "해설 있는 문제")}
            >
              해설 있는 문제 <strong>{explainedQuestions.length}</strong>
            </button>
            {wrongIds.length > 0 && (
              <button
                className="wrong-note-button"
                onClick={() => beginQuiz(questions.filter((question) => wrongIds.includes(question.id)), "나의 오답 노트")}
              >
                오답 노트 <strong>{wrongIds.length}</strong>
              </button>
            )}
          </div>
        </div>

        <div className="unit-grid">
          {units.map((unit, index) => {
            const unitStats = stats[unit.id];
            const accuracy = unitStats ? Math.round((unitStats.correct / unitStats.tried) * 100) : null;
            return (
              <button
                className={`unit-card ${unit.color}`}
                key={unit.id}
                onClick={() => beginUnit(unit.id, unit.name)}
                disabled={!unitCounts[unit.id]}
              >
                <span className="unit-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="unit-icon" aria-hidden="true">{unit.icon}</span>
                <span className="unit-name">{unit.name}</span>
                <span className="unit-details">
                  {unitCounts[unit.id]}문제
                  {accuracy !== null && <> · 정답률 {accuracy}%</>}
                </span>
                <span className="unit-arrow">→</span>
              </button>
            );
          })}
        </div>
      </section>

      <details className="history-settings">
        <summary>학습 기록 관리</summary>
        <button className="reset-progress-button" type="button" onClick={resetProgress} disabled={totalTried === 0 && solvedIds.length === 0 && wrongIds.length === 0}>기록 초기화</button>
      </details>
    </main>
  );
}
