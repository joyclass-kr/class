"use client";

import { useEffect, useMemo, useState } from "react";
import { createGradeSixCircleSet, normalizeCircleAnswer } from "../../../lib/grade-six-circle";
import type { CircleProblem } from "../../../lib/grade-six-circle";

type PrintMode = "worksheet" | "answers" | "both";
type Field = "perimeter" | "area";
type WrittenAnswers = Record<string, Partial<Record<Field, string>>>;

function CircleCompositeDiagram({ problem, instance }: { problem: CircleProblem; instance: "worksheet" | "answers" }) {
  const d = problem.dimensions;
  const common = { fill: "#d9d9d9", stroke: "#17233c", strokeWidth: 1.8 };
  const white = { fill: "white", stroke: "#17233c", strokeWidth: 1.8 };
  const label = (x: number, y: number, text: string) => <text x={x} y={y} className="circle-svg-label">{text}</text>;

  if (problem.kind === "square-yin-yang") return <svg viewBox="0 0 260 180" role="img" aria-label="정사각형과 S자 모양의 색칠한 부분"><rect x="50" y="10" width="160" height="160" {...common} /><circle cx="130" cy="90" r="80" {...white} /><path d="M50 90 A80 80 0 0 0 210 90 A40 40 0 0 0 130 90 A40 40 0 0 1 50 90 Z" {...common} /><line x1="50" y1="90" x2="130" y2="90" className="circle-svg-measure" />{label(88, 82, d.radius + "cm")}</svg>;
  if (problem.kind === "offset-half-circle") return <svg viewBox="0 0 260 180" role="img" aria-label="큰 원의 아랫부분과 안쪽 반원이 엇갈려 색칠된 부분"><circle cx="125" cy="90" r="76" {...white} /><path d="M49 90 A76 76 0 0 0 201 90 L49 90 Z" {...common} /><circle cx="150" cy="90" r="51" {...white} /><path d="M99 90 A51 51 0 0 1 201 90 L99 90 Z" {...common} /><line x1="49" y1="90" x2="201" y2="90" stroke="#17233c" strokeWidth="1.5" />{label(123, 106, d.offset + "cm")}{label(176, 82, d.innerRadius + "cm")}</svg>;
  if (problem.kind === "inward-semicircle-square") return <svg viewBox="0 0 260 180" role="img" aria-label="네 변의 반원 안쪽에 생긴 색칠한 부분"><polygon points="130,5 220,90 130,175 40,90" fill="#d9d9d9" stroke="#17233c" strokeWidth="1.8" /><path d="M130 5 Q130 90 220 90 L130 5" fill="white" stroke="#17233c" strokeWidth="1.4" /><path d="M220 90 Q130 90 130 175 L220 90" fill="white" stroke="#17233c" strokeWidth="1.4" /><path d="M130 175 Q130 90 40 90 L130 175" fill="white" stroke="#17233c" strokeWidth="1.4" /><path d="M40 90 Q130 90 130 5 L40 90" fill="white" stroke="#17233c" strokeWidth="1.4" />{label(67, 151, "한 변 " + d.side + "cm")}</svg>;
  if (problem.kind === "double-circle-rectangle") return <svg viewBox="0 0 260 180" role="img" aria-label="직사각형에서 두 원을 뺀 색칠한 부분"><rect x="90" y="5" width="80" height="170" {...common} /><circle cx="130" cy="47" r="40" {...white} /><circle cx="130" cy="133" r="40" {...white} />{label(64, 88, d.height + "cm")}{label(130, 17, "반지름 " + d.radius + "cm")}</svg>;
  if (problem.kind === "quarter-annulus") return <svg viewBox="0 0 260 180" role="img" aria-label="정사각형 안의 사분원 고리 모양 색칠한 부분"><rect x="45" y="5" width="170" height="170" fill="white" stroke="#17233c" strokeWidth="1.4" /><path d="M45 175 A170 170 0 0 1 215 5 L215 73 A102 102 0 0 0 113 175 Z" {...common} />{label(84, 166, d.outer + "cm")}{label(166, 98, d.inner + "cm")}</svg>;
  if (problem.kind === "annulus") return <svg viewBox="0 0 260 180" role="img" aria-label="고리 모양의 색칠한 부분"><circle cx="130" cy="90" r="78" {...common} /><circle cx="130" cy="90" r="34" {...white} /><line x1="130" y1="90" x2="164" y2="90" className="circle-svg-measure" /><line x1="164" y1="90" x2="208" y2="90" className="circle-svg-measure" />{label(147, 82, d.inner + "cm")}{label(186, 82, d.width + "cm")}</svg>;
  if (problem.kind === "one-sixth-sector") return <svg viewBox="0 0 260 180" role="img" aria-label="원을 육등분한 한 부채꼴의 색칠한 부분"><circle cx="130" cy="90" r="78" {...white} /><path d="M130 90 L208 90 A78 78 0 0 0 169 22 Z" {...common} /><line x1="130" y1="90" x2="91" y2="22" stroke="#17233c" /><line x1="130" y1="90" x2="52" y2="90" stroke="#17233c" /><line x1="130" y1="90" x2="91" y2="158" stroke="#17233c" /><line x1="130" y1="90" x2="169" y2="158" stroke="#17233c" />{label(166, 105, "반지름 " + d.radius + "cm")}</svg>;
  if (problem.kind === "circle-square-hole") return <svg viewBox="0 0 260 180" role="img" aria-label="원에서 안쪽 정사각형을 뺀 색칠한 부분"><circle cx="130" cy="90" r="78" {...common} /><rect x="75" y="35" width="110" height="110" {...white} /><line x1="130" y1="90" x2="185" y2="145" className="circle-svg-measure" />{label(174, 130, "반지름 " + d.radius + "cm")}{label(130, 31, "한 변 " + d.squareSide + "cm")}</svg>;
  if (problem.kind === "semicircle-circle-hole") return <svg viewBox="0 0 260 180" role="img" aria-label="반원에서 안쪽 원을 뺀 색칠한 부분"><path d="M35 155 A95 95 0 0 1 225 155 L35 155 Z" {...common} /><circle cx="130" cy="107.5" r="47.5" {...white} />{label(185, 148, "반지름 " + d.outerRadius + "cm")}{label(130, 106, "반지름 " + d.innerRadius + "cm")}</svg>;
  if (problem.kind === "square-semicircle-hole") return <svg viewBox="0 0 260 180" role="img" aria-label="정사각형에서 위쪽 반원을 뺀 색칠한 부분"><rect x="50" y="10" width="160" height="160" {...common} /><path d="M50 90 A80 80 0 0 1 210 90 L50 90 Z" {...white} />{label(130, 105, "한 변 " + d.side + "cm")}</svg>;
  if (problem.kind === "circle-yin-yang") return <svg viewBox="0 0 260 180" role="img" aria-label="두 반원으로 경계가 굽은 원 안의 색칠한 부분"><circle cx="130" cy="90" r="78" {...white} /><path d="M52 90 A78 78 0 0 1 208 90 A39 39 0 0 0 130 90 A39 39 0 0 1 52 90 Z" {...common} /><line x1="52" y1="90" x2="130" y2="90" className="circle-svg-measure" />{label(89, 81, d.radius + "cm")}</svg>;
  if (problem.kind === "square-top-bottom-cutouts") return <svg viewBox="0 0 260 180" role="img" aria-label="정사각형의 위아래 반원을 뺀 색칠한 부분"><rect x="50" y="10" width="160" height="160" {...common} /><path d="M50 10 A80 80 0 0 0 210 10 L50 10 Z" {...white} /><path d="M50 170 A80 80 0 0 1 210 170 L50 170 Z" {...white} />{label(130, 9, "한 변 " + d.side + "cm")}</svg>;
  if (problem.kind === "eccentric-circle-hole") return <svg viewBox="0 0 260 180" role="img" aria-label="큰 원에서 한쪽으로 치우친 작은 원을 뺀 색칠한 부분"><circle cx="130" cy="90" r="78" {...common} /><circle cx="91" cy="90" r="39" {...white} /><line x1="52" y1="90" x2="130" y2="90" className="circle-svg-measure" />{label(91, 82, d.outerRadius + "cm")}</svg>;
  if (problem.kind === "corner-quarter-shading") return <svg viewBox="0 0 260 180" role="img" aria-label="정사각형 네 모서리의 사분원이 색칠된 부분"><rect x="50" y="10" width="160" height="160" fill="white" stroke="#17233c" strokeWidth="1.8" /><path d="M50 10 H130 A80 80 0 0 1 50 90 Z" {...common} /><path d="M210 10 V90 A80 80 0 0 1 130 10 Z" {...common} /><path d="M210 170 H130 A80 80 0 0 1 210 90 Z" {...common} /><path d="M50 170 V90 A80 80 0 0 1 130 170 Z" {...common} />{label(130, 9, "한 변 " + d.side + "cm")}</svg>;
  if (problem.kind === "square-circle-hole") return <svg viewBox="0 0 260 180" role="img" aria-label="정사각형에서 내접원을 뺀 색칠한 부분"><rect x="50" y="10" width="160" height="160" {...common} /><circle cx="130" cy="90" r="80" {...white} />{label(130, 177, "한 변 " + d.side + "cm")}</svg>;
  return <svg viewBox="0 0 260 180" role="img" aria-label="큰 반원에서 왼쪽 작은 반원을 뺀 색칠한 부분"><path d="M30 155 A100 100 0 0 1 230 155 L30 155 Z" {...common} /><path d="M30 155 A50 50 0 0 1 130 155 L30 155 Z" {...white} /><line x1="130" y1="155" x2="230" y2="155" stroke="#17233c" strokeWidth="1.8" />{label(80, 149, d.outerRadius + "cm")}</svg>;
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

  return <main className="counting-page multiplication-page"><div className="counting-toolbar"><a className="counting-back" href="/arithmetic">← 연산</a><div className="counting-progress"><strong>{correct}<small>/6 정답</small></strong></div><div className="toolbar"><button className="button secondary" onClick={fresh}>새 문제</button><button className="button ghost" onClick={reset}>다시 풀기</button><div className="print-control"><button className="button ghost print-button" onClick={() => setPrintOpen(!printOpen)}>인쇄</button>{printOpen && <div className="print-menu"><button onClick={() => print("worksheet")}>문제지만 인쇄</button><button onClick={() => print("answers")}>답지만 인쇄</button><button onClick={() => print("both")}>문제지+답지 인쇄</button></div>}</div><button className="button primary" onClick={check}>전체 채점</button></div></div><div className="a4-stage counting-a4-stage worksheet-stage" style={{ width: 794 * scale, height: 1123 * scale }} aria-label="A4 6학년 원의 둘레와 넓이 문제지">{sheet(false)}</div><div className="a4-stage counting-a4-stage answer-stage" style={{ width: 794 * scale, height: 1123 * scale }} aria-label="A4 6학년 원의 둘레와 넓이 전체 답지">{sheet(true)}</div></main>;
}
