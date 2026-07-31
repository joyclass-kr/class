export type CoordinateLineKind =
  | "distance" | "internal-division" | "two-point-line" | "parallel-line" | "perpendicular-line"
  | "point-line-distance" | "line-translation" | "point-reflection";
export type CoordinateLineProblem = {
  id: string;
  kind: CoordinateLineKind;
  label: string;
  prompt: string;
  latex: string;
  answer: number[];
  answerMode: "scalar" | "point" | "line";
};

const KINDS: CoordinateLineKind[] = [
  "distance", "internal-division", "two-point-line", "parallel-line",
  "perpendicular-line", "point-line-distance", "line-translation", "point-reflection",
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
function nonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}
function gcd(left: number, right: number): number {
  return right === 0 ? Math.abs(left) : gcd(right, left % right);
}
function normalizeLine(a: number, b: number, c: number) {
  const divisor = gcd(gcd(a, b), c) || 1;
  let result = [a / divisor, b / divisor, c / divisor];
  if (result[0] < 0 || (result[0] === 0 && result[1] < 0)) result = result.map((value) => -value);
  return result;
}
function pointLatex([x, y]: number[]) {
  return `(${x},\\ ${y})`;
}
function lineLatex([a, b, c]: number[]) {
  const aTerm = `${a === -1 ? "-" : a === 1 ? "" : a}x`;
  const bTerm = b === 0 ? "" : `${b < 0 ? "-" : "+"}${Math.abs(b) === 1 ? "" : Math.abs(b)}y`;
  const cTerm = c === 0 ? "" : `${c < 0 ? "-" : "+"}${Math.abs(c)}`;
  return `${aTerm}${bTerm}${cTerm}=0`;
}

function buildProblem(kind: CoordinateLineKind, next: () => number, id: string): CoordinateLineProblem {
  if (kind === "distance") {
    const [dx, dy, distance] = [[3, 4, 5], [5, 12, 13], [6, 8, 10]][integer(next, 0, 2)];
    const first = [integer(next, -6, 4), integer(next, -6, 4)];
    const second = [first[0] + (integer(next, 0, 1) ? dx : -dx), first[1] + (integer(next, 0, 1) ? dy : -dy)];
    return { id, kind, label: "두 점 사이의 거리", prompt: "두 점 $A, B$ 사이의 거리는?", latex: `A${pointLatex(first)},\\qquad B${pointLatex(second)}`, answer: [distance], answerMode: "scalar" };
  }
  if (kind === "internal-division") {
    const m = integer(next, 1, 4);
    const n = integer(next, 1, 4);
    const target = [integer(next, -5, 5), integer(next, -5, 5)];
    const vector = [nonzero(next, -3, 3), nonzero(next, -3, 3)];
    const first = [target[0] - m * vector[0], target[1] - m * vector[1]];
    const second = [target[0] + n * vector[0], target[1] + n * vector[1]];
    return { id, kind, label: "내분점", prompt: `선분 $AB$를 ${m}:${n}으로 내분하는 점 $P$의 좌표는?`, latex: `A${pointLatex(first)},\\qquad B${pointLatex(second)}`, answer: target, answerMode: "point" };
  }
  if (kind === "point-line-distance") {
    const base = [integer(next, -5, 5), integer(next, -5, 5)];
    const multiple = nonzero(next, -3, 3);
    const line = [3, 4, -3 * base[0] - 4 * base[1]];
    const point = [base[0] + 3 * multiple, base[1] + 4 * multiple];
    return {
      id, kind, label: "점과 직선 사이의 거리",
      prompt: "점 $P$와 직선 $l$ 사이의 거리는?",
      latex: `P${pointLatex(point)},\\qquad l:\\ ${lineLatex(line)}`,
      answer: [5 * Math.abs(multiple)], answerMode: "scalar",
    };
  }
  if (kind === "line-translation") {
    const a = integer(next, 1, 5);
    const b = nonzero(next, -5, 5);
    const c = integer(next, -8, 8);
    const p = nonzero(next, -4, 4);
    const q = nonzero(next, -4, 4);
    const original = normalizeLine(a, b, c);
    const answer = normalizeLine(original[0], original[1], original[2] - original[0] * p - original[1] * q);
    return {
      id, kind, label: "직선의 평행이동",
      prompt: "평행이동한 직선의 방정식은?",
      latex: `${lineLatex(original)},\\qquad (x,y)\\mapsto(x${p < 0 ? "" : "+"}${p},\\ y${q < 0 ? "" : "+"}${q})`,
      answer, answerMode: "line",
    };
  }
  if (kind === "point-reflection") {
    const point = [nonzero(next, -6, 6), nonzero(next, -6, 6)];
    const mode = integer(next, 0, 2);
    const labels = ["x\\text{축}", "y\\text{축}", "y=x"];
    const answers = [[point[0], -point[1]], [-point[0], point[1]], [point[1], point[0]]];
    return {
      id, kind, label: "점의 대칭이동",
      prompt: "대칭이동한 점 $P$의 좌표는?",
      latex: `P${pointLatex(point)},\\qquad \\text{대칭축 }${labels[mode]}`,
      answer: answers[mode], answerMode: "point",
    };
  }

  const a = integer(next, 1, 5);
  const b = nonzero(next, -5, 5);
  const base = [integer(next, -5, 5), integer(next, -5, 5)];
  const original = normalizeLine(a, b, -a * base[0] - b * base[1]);
  if (kind === "two-point-line") {
    const step = nonzero(next, -3, 3);
    const second = [base[0] + original[1] * step, base[1] - original[0] * step];
    return { id, kind, label: "두 점을 지나는 직선", prompt: "$a>0$, 계수가 서로소인 $ax+by+c=0$ 꼴의 식은?", latex: `A${pointLatex(base)},\\qquad B${pointLatex(second)}`, answer: original, answerMode: "line" };
  }
  const point = [integer(next, -5, 5), integer(next, -5, 5)];
  if (kind === "parallel-line") {
    const answer = normalizeLine(original[0], original[1], -original[0] * point[0] - original[1] * point[1]);
    return { id, kind, label: "평행한 직선", prompt: "$a>0$, 계수가 서로소인 $ax+by+c=0$ 꼴의 식은?", latex: `P${pointLatex(point)},\\qquad l:\\ ${lineLatex(original)}`, answer, answerMode: "line" };
  }
  const answer = normalizeLine(original[1], -original[0], -original[1] * point[0] + original[0] * point[1]);
  return { id, kind, label: "수직인 직선", prompt: "$a>0$, 계수가 서로소인 $ax+by+c=0$ 꼴의 식은?", latex: `P${pointLatex(point)},\\qquad l:\\ ${lineLatex(original)}`, answer, answerMode: "line" };
}

export function createCoordinateLineProblemSet(seed: number) {
  const next = random(seed);
  return { seed, problems: KINDS.map((kind, index) => buildProblem(kind, next, `coordinate-line-${index}`)) };
}
export function createCoordinateLineReviewProblems(kinds: CoordinateLineKind[], seed: number) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => buildProblem(kind, next, `coordinate-line-review-${index}-${seed}`));
}
export function sameCoordinateLineAnswer(values: string[], expected: number[]) {
  return values.length === expected.length && values.every((value, index) => /^-?\d+$/.test(value.trim()) && Number(value) === expected[index]);
}
export function coordinateLineAnswerLatex(problem: CoordinateLineProblem) {
  if (problem.answerMode === "scalar") return String(problem.answer[0]);
  if (problem.answerMode === "point") return pointLatex(problem.answer);
  return lineLatex(problem.answer);
}
