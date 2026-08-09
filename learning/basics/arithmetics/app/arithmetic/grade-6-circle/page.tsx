"use client";

import { useEffect, useMemo, useState } from "react";
import { createGradeSixCircleSet, normalizeCircleAnswer } from "../../../lib/grade-six-circle";
import type { CircleProblem } from "../../../lib/grade-six-circle";

type PrintMode = "worksheet" | "answers" | "both";
type Field = "perimeter" | "area";
type WrittenAnswers = Record<string, Partial<Record<Field, string>>>;

function CircleCompositeDiagram({ problem, instance }: { problem: CircleProblem; instance: "worksheet" | "answers" }) {
  const d = problem.dimensions;
  const common = { fill: "#d8d8d8", stroke: "#17233c", strokeWidth: 1.6 };
  const label = (x: number, y: number, text: string) => <text x={x} y={y} className="circle-svg-label">{text}</text>;

  if (problem.kind === "annulus") return <svg viewBox="0 0 210 128" role="img" aria-label="고리 모양의 색칠한 부분"><circle cx="105" cy="64" r="52" {...common} /><circle cx="105" cy="64" r="24" fill="white" stroke="#17233c" strokeWidth="1.6" /><line x1="105" y1="64" x2="157" y2="64" className="circle-svg-measure" /><line x1="105" y1="64" x2="129" y2="64" className="circle-svg-measure" />{label(132, 58, d.outer + "cm")}{label(107, 79, d.inner + "cm")}</svg>;
  if (problem.kind === "square-circle-hole") return <svg viewBox="0 0 210 128" role="img" aria-label="정사각형에서 원을 뺀 색칠한 부분"><rect x="53" y="12" width="104" height="104" {...common} /><circle cx="105" cy="64" r="52" fill="white" stroke="#17233c" strokeWidth="1.6" />{label(82, 125, "한 변 " + d.side + "cm")}</svg>;
  if (problem.kind === "corner-quarters") {
    const clipId = `corner-clip-${instance}-${problem.id}`;
    return <svg viewBox="0 0 210 128" role="img" aria-label="정사각형 네 모서리의 사분원을 뺀 색칠한 부분"><defs><clipPath id={clipId}><rect x="53" y="12" width="104" height="104" /></clipPath></defs><rect x="53" y="12" width="104" height="104" {...common} /><g clipPath={`url(#${clipId})`} fill="white" stroke="#17233c" strokeWidth="1.6"><circle cx="53" cy="12" r="52" /><circle cx="157" cy="12" r="52" /><circle cx="53" cy="116" r="52" /><circle cx="157" cy="116" r="52" /></g>{label(82, 125, "한 변 " + d.side + "cm")}</svg>;
  }
  if (problem.kind === "arbelos") return <svg viewBox="0 0 210 128" role="img" aria-label="큰 반원에서 작은 반원 두 개를 뺀 색칠한 부분"><path d="M25 105 A80 80 0 0 1 185 105 Z" {...common} /><path d="M25 105 A40 40 0 0 1 105 105 Z" fill="white" stroke="#17233c" strokeWidth="1.6" /><path d="M105 105 A40 40 0 0 1 185 105 Z" fill="white" stroke="#17233c" strokeWidth="1.6" />{label(57, 118, d.diameter + "cm")}{label(137, 118, d.diameter + "cm")}</svg>;
  if (problem.kind === "stadium") return <svg viewBox="0 0 210 128" role="img" aria-label="직사각형 양끝에 반원이 붙은 색칠한 부분"><path d="M55 24 H155 A40 40 0 0 1 155 104 H55 A40 40 0 0 1 55 24 Z" {...common} />{label(82, 18, d.straight + "cm")}{label(8, 68, "반지름 " + d.radius + "cm")}</svg>;
  if (problem.kind === "quarter-annulus") return <svg viewBox="0 0 210 128" role="img" aria-label="사분원 고리 모양의 색칠한 부분"><path d="M32 112 L32 16 A96 96 0 0 1 128 112 L78 112 A46 46 0 0 0 32 66 Z" {...common} />{label(34, 29, d.outer + "cm")}{label(36, 81, d.inner + "cm")}</svg>;
  if (problem.kind === "square-side-cutouts") return <svg viewBox="0 0 210 128" role="img" aria-label="정사각형 양옆의 반원을 뺀 색칠한 부분"><rect x="53" y="12" width="104" height="104" {...common} /><path d="M53 12 A52 52 0 0 1 53 116 Z" fill="white" stroke="#17233c" strokeWidth="1.6" /><path d="M157 12 A52 52 0 0 0 157 116 Z" fill="white" stroke="#17233c" strokeWidth="1.6" />{label(82, 125, "한 변 " + d.side + "cm")}</svg>;
  return <svg viewBox="0 0 210 128" role="img" aria-label="직사각형 위에 반원이 붙은 색칠한 부분"><path d="M50 112 V60 A55 55 0 0 1 160 60 V112 Z" {...common} />{label(82, 125, d.width + "cm")}{label(3, 91, d.height + "cm")}</svg>;
}

export default function GradeSixCirclePage() {
  const [seed, setSeed] = useState(20260722);
  const [answers, setAnswers] = useState<WrittenAnswers>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [scale, setScale] = useState(.6);
  const [printOpen, setPrintOpen] = useState(false);
  const problems = useMemo(() => createGradeSixCircleSet(seed), [seed]);
  const correct = Object.values(results).filter(Boolean).length;

  useEffect(() => {
    const fit = () => setScale(Math.min((innerWidth - 32) / 794, 1));
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  const update = (id: string, field: Field, value: string) => {
    setAnswers((now) => ({ ...now, [id]: { ...now[id], [field]: value.replace(/[^0-9.]/g, "").slice(0, 8) } }));
    setResults((now) => { const next = { ...now }; delete next[id + "-" + field]; return next; });
  };
  const reset = () => { setAnswers({}); setResults({}); };
  const fresh = () => {
    if (Object.values(answers).some((value) => Object.values(value).some(Boolean)) && !confirm("답이 사라집니다. 새 문제를 만들까요?")) return;
    setSeed((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0);
    reset();
  };
  const check = () => setResults(Object.fromEntries(problems.flatMap((problem) => (["perimeter", "area"] as const).map((field) => [problem.id + "-" + field, normalizeCircleAnswer(answers[problem.id]?.[field] ?? "") === problem[field]]))));
  const print = (mode: PrintMode) => { setPrintOpen(false); document.documentElement.dataset.printMode = mode; addEventListener("afterprint", () => delete document.documentElement.dataset.printMode, { once: true }); requestAnimationFrame(() => window.print()); };

  const answerField = (problem: CircleProblem, field: Field, key: boolean) => {
    const resultId = problem.id + "-" + field;
    const unit = problem.unit + (field === "area" ? "²" : "");
    return <div className="circle-equation"><span>{field === "perimeter" ? "둘레" : "넓이"}</span><strong>=</strong>{key ? <em className="circle-static-answer">{problem[field]}</em> : <input data-circle-answer="true" type="text" inputMode="decimal" value={answers[problem.id]?.[field] ?? ""} onChange={(event) => update(problem.id, field, event.target.value)} aria-label={(field === "perimeter" ? "둘레" : "넓이") + " 답"} />}<small>{unit}</small>{!key && resultId in results && <b className={results[resultId] ? "correct" : "wrong"}>{results[resultId] ? "맞음" : "틀림"}</b>}</div>;
  };
  const question = (problem: CircleProblem, index: number, key: boolean) => {
    const perimeterResult = results[problem.id + "-perimeter"];
    const areaResult = results[problem.id + "-area"];
    const graded = perimeterResult !== undefined && areaResult !== undefined;
    return <article className={"circle-question" + (graded ? perimeterResult && areaResult ? " is-correct" : " is-wrong" : "")} key={problem.id} data-testid="grade-six-circle-question"><span className="circle-index">{index + 1}</span><CircleCompositeDiagram problem={problem} instance={key ? "answers" : "worksheet"} /><div className="circle-answer-pair">{answerField(problem, "perimeter", key)}{answerField(problem, "area", key)}</div></article>;
  };
  const sheet = (key: boolean) => <div className="a4-sheet counting-sheet circle-sheet" style={{ transform: "scale(" + scale + ")" }}><header className="counting-sheet-header"><div className="counting-sheet-title"><span>6학년</span><strong>원의 둘레와 넓이{key ? " 정답" : ""}</strong></div><div className="counting-sheet-info"><span>이름 <i /></span><span>날짜 <i /></span><small>문제지 {seed}</small></div></header><p className="circle-guide">원주율 3.14 · 색칠한 도형의 둘레와 넓이를 구하세요.</p><div className="circle-grid">{problems.map((problem, index) => question(problem, index, key))}</div></div>;

  return <main className="counting-page multiplication-page"><div className="counting-toolbar"><a className="counting-back" href="/arithmetic">← 연산</a><div className="counting-progress"><strong>{correct}<small>/16 정답</small></strong></div><div className="toolbar"><button className="button secondary" onClick={fresh}>새 문제</button><button className="button ghost" onClick={reset}>다시 풀기</button><div className="print-control"><button className="button ghost print-button" onClick={() => setPrintOpen(!printOpen)}>인쇄</button>{printOpen && <div className="print-menu"><button onClick={() => print("worksheet")}>문제지만 인쇄</button><button onClick={() => print("answers")}>답지만 인쇄</button><button onClick={() => print("both")}>문제지+답지 인쇄</button></div>}</div><button className="button primary" onClick={check}>전체 채점</button></div></div><div className="a4-stage counting-a4-stage worksheet-stage" style={{ width: 794 * scale, height: 1123 * scale }} aria-label="A4 6학년 원의 둘레와 넓이 문제지">{sheet(false)}</div><div className="a4-stage counting-a4-stage answer-stage" style={{ width: 794 * scale, height: 1123 * scale }} aria-label="A4 6학년 원의 둘레와 넓이 전체 답지">{sheet(true)}</div></main>;
}
