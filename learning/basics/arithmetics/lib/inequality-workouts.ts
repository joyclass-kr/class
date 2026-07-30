export type InequalityKind =
  | "linear-system"
  | "absolute-inside"
  | "absolute-outside"
  | "quadratic-between"
  | "quadratic-outside"
  | "quadratic-repeated-root"
  | "quadratic-system";

export type SolutionPiece =
  | {
    kind: "interval";
    left: number | "-inf";
    right: number | "inf";
    leftClosed: boolean;
    rightClosed: boolean;
  }
  | {
    kind: "point";
    value: number;
  };

export type InequalityProblem = {
  id: string;
  kind: InequalityKind;
  label: string;
  expression: string;
  solution: SolutionPiece[];
};

export type InequalityProblemSet = {
  seed: number;
  problems: InequalityProblem[];
};

export type InequalityChoice = {
  solution: SolutionPiece[];
  correct: boolean;
};

const LABELS: Record<InequalityKind, string> = {
  "linear-system": "연립일차부등식 · 공통해",
  "absolute-inside": "절댓값부등식 · 안쪽 구간",
  "absolute-outside": "절댓값부등식 · 바깥 구간",
  "quadratic-between": "이차부등식 · 두 근 사이",
  "quadratic-outside": "이차부등식 · 두 근 바깥",
  "quadratic-repeated-root": "이차부등식 · 중근의 부호",
  "quadratic-system": "연립이차부등식 · 교집합",
};

const KINDS: InequalityKind[] = [
  "linear-system",
  "absolute-inside",
  "absolute-outside",
  "quadratic-between",
  "quadratic-outside",
  "quadratic-repeated-root",
  "quadratic-system",
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

function orderedRoots(next: () => number, minimum = -6, maximum = 6) {
  let first = integer(next, minimum, maximum);
  let second = integer(next, minimum, maximum);
  while (second === first) second = integer(next, minimum, maximum);
  return [Math.min(first, second), Math.max(first, second)] as const;
}

function factor(root: number) {
  if (root === 0) return "x";
  return root > 0 ? `(x − ${root})` : `(x + ${Math.abs(root)})`;
}

function shiftedAbsolute(center: number) {
  if (center === 0) return "|x|";
  return center > 0 ? `|x − ${center}|` : `|x + ${Math.abs(center)}|`;
}

function interval(
  left: number | "-inf",
  right: number | "inf",
  leftClosed = false,
  rightClosed = false,
): SolutionPiece {
  return { kind: "interval", left, right, leftClosed, rightClosed };
}

function buildProblem(kind: InequalityKind, next: () => number, id: string): InequalityProblem {
  let expression: string;
  let solution: SolutionPiece[];

  if (kind === "linear-system") {
    const [left, right] = orderedRoots(next);
    const leftClosed = integer(next, 0, 1) === 1;
    const rightClosed = integer(next, 0, 1) === 1;
    expression = `x ${leftClosed ? "≥" : ">"} ${left}  그리고  x ${rightClosed ? "≤" : "<"} ${right}`;
    solution = [interval(left, right, leftClosed, rightClosed)];
  } else if (kind === "absolute-inside") {
    const center = integer(next, -5, 5);
    const radius = integer(next, 2, 6);
    const closed = integer(next, 0, 1) === 1;
    expression = `${shiftedAbsolute(center)} ${closed ? "≤" : "<"} ${radius}`;
    solution = [interval(center - radius, center + radius, closed, closed)];
  } else if (kind === "absolute-outside") {
    const center = integer(next, -5, 5);
    const radius = integer(next, 2, 6);
    const closed = integer(next, 0, 1) === 1;
    expression = `${shiftedAbsolute(center)} ${closed ? "≥" : ">"} ${radius}`;
    solution = [
      interval("-inf", center - radius, false, closed),
      interval(center + radius, "inf", closed, false),
    ];
  } else if (kind === "quadratic-between") {
    const [left, right] = orderedRoots(next);
    const closed = integer(next, 0, 1) === 1;
    expression = `${factor(left)}${factor(right)} ${closed ? "≤" : "<"} 0`;
    solution = [interval(left, right, closed, closed)];
  } else if (kind === "quadratic-outside") {
    const [left, right] = orderedRoots(next);
    const closed = integer(next, 0, 1) === 1;
    expression = `${factor(left)}${factor(right)} ${closed ? "≥" : ">"} 0`;
    solution = [
      interval("-inf", left, false, closed),
      interval(right, "inf", closed, false),
    ];
  } else if (kind === "quadratic-repeated-root") {
    const root = integer(next, -5, 5);
    expression = `${factor(root)}² > 0`;
    solution = [
      interval("-inf", root),
      interval(root, "inf"),
    ];
  } else {
    const start = integer(next, -7, -3);
    const firstMiddle = integer(next, start + 1, 0);
    const secondMiddle = integer(next, 1, 4);
    const end = integer(next, secondMiddle + 1, 8);
    expression = `${factor(start)}${factor(secondMiddle)} ≤ 0  그리고  ${factor(firstMiddle)}${factor(end)} < 0`;
    solution = [interval(firstMiddle, secondMiddle, false, true)];
  }

  return { id, kind, label: LABELS[kind], expression, solution };
}

export function createInequalityProblemSet(seed: number): InequalityProblemSet {
  const next = random(seed);
  return { seed, problems: KINDS.map((kind, index) => buildProblem(kind, next, `inequality-${index}`)) };
}

export function createInequalityReviewProblems(kinds: InequalityKind[], seed: number) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => (
    buildProblem(kind, next, `inequality-review-${index}-${seed}`)
  ));
}

export function solutionPieceKey(piece: SolutionPiece) {
  if (piece.kind === "point") return `point:${piece.value}`;
  const leftClosed = piece.left === "-inf" ? false : piece.leftClosed;
  const rightClosed = piece.right === "inf" ? false : piece.rightClosed;
  if (piece.left === piece.right && leftClosed && rightClosed) return `point:${piece.left}`;
  return `interval:${piece.left}:${leftClosed}:${piece.right}:${rightClosed}`;
}

export function normalizeSolutionPieces(pieces: SolutionPiece[]) {
  return [...new Set(pieces.map(solutionPieceKey))].sort();
}

function solutionKey(pieces: SolutionPiece[]) {
  return normalizeSolutionPieces(pieces).join("|");
}

export function createInequalityChoices(problem: InequalityProblem): InequalityChoice[] {
  const correct = problem.solution.map((piece) => ({ ...piece }));
  const toggleEndpoints = correct.map((piece) => piece.kind === "point" ? piece : ({
    ...piece,
    leftClosed: typeof piece.left === "number" ? !piece.leftClosed : false,
    rightClosed: typeof piece.right === "number" ? !piece.rightClosed : false,
  }));
  const shiftRight = correct.map((piece) => piece.kind === "point"
    ? { ...piece, value: piece.value + 1 }
    : {
      ...piece,
      left: typeof piece.left === "number" ? piece.left + 1 : piece.left,
      right: typeof piece.right === "number" ? piece.right + 1 : piece.right,
    });
  const expand = correct.map((piece) => piece.kind === "point"
    ? { ...piece, value: piece.value - 1 }
    : {
      ...piece,
      left: typeof piece.left === "number" ? piece.left - 1 : piece.left,
      right: typeof piece.right === "number" ? piece.right + 1 : piece.right,
    });
  const reflect = correct.map((piece) => piece.kind === "point"
    ? { ...piece, value: -piece.value }
    : {
      ...piece,
      left: typeof piece.right === "number" ? -piece.right : "-inf" as const,
      right: typeof piece.left === "number" ? -piece.left : "inf" as const,
      leftClosed: piece.rightClosed,
      rightClosed: piece.leftClosed,
    });
  const dropPiece = correct.length > 1 ? correct.slice(0, -1) : correct.map((piece) => piece.kind === "point"
    ? { ...piece, value: -piece.value }
    : { ...piece, leftClosed: false, rightClosed: false });
  const candidates = [...new Map(
    [correct, toggleEndpoints, shiftRight, expand, reflect, dropPiece]
      .map((solution) => [solutionKey(solution), solution]),
  ).values()].slice(0, 4);
  const offset = [...problem.id].reduce((sum, character) => sum + character.charCodeAt(0), 0) % candidates.length;
  return [...candidates.slice(offset), ...candidates.slice(0, offset)].map((solution) => ({
    solution,
    correct: solutionKey(solution) === solutionKey(correct),
  }));
}

export function formatInequalitySolution(pieces: SolutionPiece[]) {
  return pieces.map((piece) => {
    if (piece.kind === "point") return `{${piece.value}}`;
    const left = piece.left === "-inf" ? "−∞" : piece.left;
    const right = piece.right === "inf" ? "∞" : piece.right;
    const leftBracket = piece.left !== "-inf" && piece.leftClosed ? "[" : "(";
    const rightBracket = piece.right !== "inf" && piece.rightClosed ? "]" : ")";
    return `${leftBracket}${left}, ${right}${rightBracket}`;
  }).join(" ∪ ");
}
