import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export type MatrixWorkoutKind =
  | "equal-matrices"
  | "addition"
  | "linear-combination"
  | "scalar-unknown"
  | "multiplication"
  | "square-component"
  | "matrix-equation";

export type MatrixWorkoutProblem = GeometryChoiceItem & {
  kind: MatrixWorkoutKind;
};

type Matrix = number[][];

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

const integer = (next: () => number, minimum: number, maximum: number) =>
  minimum + Math.floor(next() * (maximum - minimum + 1));

function nonzero(next: () => number, minimum: number, maximum: number) {
  let value = 0;
  while (value === 0) value = integer(next, minimum, maximum);
  return value;
}

function randomMatrix(
  next: () => number,
  rows: number,
  columns: number,
  minimum = -5,
  maximum = 5,
) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => nonzero(next, minimum, maximum)),
  );
}

function mapMatrix(matrix: Matrix, mapper: (value: number, row: number, column: number) => number) {
  return matrix.map((row, rowIndex) =>
    row.map((value, columnIndex) => mapper(value, rowIndex, columnIndex)),
  );
}

function add(left: Matrix, right: Matrix) {
  return mapMatrix(left, (value, row, column) => value + right[row]![column]!);
}

function subtract(left: Matrix, right: Matrix) {
  return mapMatrix(left, (value, row, column) => value - right[row]![column]!);
}

function scale(coefficient: number, matrix: Matrix) {
  return mapMatrix(matrix, (value) => coefficient * value);
}

function multiply(left: Matrix, right: Matrix) {
  return left.map((row) =>
    right[0]!.map((_, column) =>
      row.reduce(
        (sum, value, index) => sum + value * right[index]![column]!,
        0,
      ),
    ),
  );
}

function elementwiseMultiply(left: Matrix, right: Matrix) {
  return mapMatrix(left, (value, row, column) => value * right[row]![column]!);
}

function formatMatrix(matrix: Array<Array<number | string>>) {
  return `\\begin{pmatrix}${matrix.map((row) => row.join("&")).join("\\\\")}\\end{pmatrix}`;
}

function pair(A: Matrix, B: Matrix) {
  return `A=${formatMatrix(A)},\\quad B=${formatMatrix(B)}`;
}

function choices(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set(distractors.filter((candidate) => candidate !== answer))];
  const fallbacks = [
    formatMatrix([[0, 0], [0, 0]]),
    formatMatrix([[1, 0], [0, 1]]),
    "0",
    "-1",
  ];
  for (const fallback of fallbacks) {
    if (unique.length === 3) break;
    if (fallback !== answer && !unique.includes(fallback)) unique.push(fallback);
  }
  return [answer, ...unique.slice(0, 3)].map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  seed: number,
  index: number,
  kind: MatrixWorkoutKind,
  label: string,
  prompt: string,
  latex: string,
  answer: string,
  distractors: string[],
): MatrixWorkoutProblem {
  const id = `matrix-${seed}-${index}`;
  return {
    id,
    kind,
    label,
    prompt,
    latex,
    correctLatex: answer,
    choices: choices(id, answer, distractors),
  };
}

export function createMatrixProblems(seed: number) {
  const next = random(seed);
  const problems: MatrixWorkoutProblem[] = [];

  {
    const x = integer(next, 1, 6);
    let y = integer(next, 1, 6);
    while (y === x) y = integer(next, 1, 6);
    const fixed = randomMatrix(next, 2, 2);
    const xPosition = integer(next, 0, 3);
    let yPosition = integer(next, 0, 3);
    while (yPosition === xPosition) yPosition = integer(next, 0, 3);
    const right = fixed.map((row) => [...row]);
    right[Math.floor(xPosition / 2)]![xPosition % 2] = x;
    right[Math.floor(yPosition / 2)]![yPosition % 2] = y;
    const left: Array<Array<number | string>> = fixed.map((row) => [...row]);
    left[Math.floor(xPosition / 2)]![xPosition % 2] = "x";
    left[Math.floor(yPosition / 2)]![yPosition % 2] = "y";
    const answer = `x=${x},\\quad y=${y}`;
    problems.push(item(
      seed,
      0,
      "equal-matrices",
      "행렬의 성분",
      "두 행렬이 같을 때 $x$와 $y$는?",
      `${formatMatrix(left)}=${formatMatrix(right)}`,
      answer,
      [
        `x=${y},\\quad y=${x}`,
        `x=${-x},\\quad y=${y}`,
        `x=${x},\\quad y=${-y}`,
      ],
    ));
  }

  {
    const A = randomMatrix(next, 2, 2);
    const B = randomMatrix(next, 2, 2);
    const answerMatrix = add(A, B);
    const signError = answerMatrix.map((row) => [...row]);
    signError[0]![0] = signError[0]![0] === 0 ? 1 : -signError[0]![0]!;
    problems.push(item(
      seed,
      1,
      "addition",
      "행렬의 덧셈",
      "$A+B$는?",
      pair(A, B),
      formatMatrix(answerMatrix),
      [
        formatMatrix(subtract(A, B)),
        formatMatrix(signError),
        formatMatrix(elementwiseMultiply(A, B)),
      ],
    ));
  }

  {
    const coefficient = integer(next, 2, 3);
    const A = randomMatrix(next, 2, 2);
    const B = randomMatrix(next, 2, 2);
    const answerMatrix = subtract(scale(coefficient, A), B);
    problems.push(item(
      seed,
      2,
      "linear-combination",
      "행렬의 실수배와 뺄셈",
      `$${coefficient}A-B$는?`,
      pair(A, B),
      formatMatrix(answerMatrix),
      [
        formatMatrix(subtract(A, B)),
        formatMatrix(add(scale(coefficient, A), B)),
        formatMatrix(scale(coefficient, subtract(A, B))),
      ],
    ));
  }

  {
    const A = randomMatrix(next, 2, 2, -4, 4);
    const row = integer(next, 0, 1);
    const column = integer(next, 0, 1);
    const coefficient = integer(next, 2, 5);
    const target = coefficient * A[row]![column]!;
    problems.push(item(
      seed,
      3,
      "scalar-unknown",
      "행렬의 실수배",
      `$kA$의 $(${row + 1},${column + 1})$성분이 ${target}일 때 $k$는?`,
      `A=${formatMatrix(A)}`,
      `k=${coefficient}`,
      [`k=${coefficient - 1}`, `k=${coefficient + 1}`, `k=${-coefficient}`],
    ));
  }

  {
    const A = randomMatrix(next, 2, 2, -3, 3);
    const B = randomMatrix(next, 2, 2, -3, 3);
    const product = multiply(A, B);
    const signError = product.map((row) => [...row]);
    signError[1]![1] = signError[1]![1] === 0 ? 1 : -signError[1]![1]!;
    problems.push(item(
      seed,
      4,
      "multiplication",
      "행렬의 곱셈",
      "$AB$는?",
      pair(A, B),
      formatMatrix(product),
      [
        formatMatrix(multiply(B, A)),
        formatMatrix(elementwiseMultiply(A, B)),
        formatMatrix(signError),
      ],
    ));
  }

  {
    const A = randomMatrix(next, 2, 2, -4, 4);
    const row = integer(next, 0, 1);
    const column = integer(next, 0, 1);
    const square = multiply(A, A);
    const answer = square[row]![column]!;
    const rowProduct = A[row]![0]! * A[row]![1]!;
    const entrySquare = A[row]![column]! ** 2;
    problems.push(item(
      seed,
      5,
      "square-component",
      "행렬의 거듭제곱",
      `$A^2$의 $(${row + 1},${column + 1})$성분은?`,
      `A=${formatMatrix(A)}`,
      `${answer}`,
      [`${-answer}`, `${rowProduct}`, `${entrySquare}`],
    ));
  }

  {
    const coefficient = integer(next, 2, 3);
    const X = randomMatrix(next, 2, 2, -4, 4);
    const A = randomMatrix(next, 2, 2, -5, 5);
    const B = add(scale(coefficient, X), A);
    problems.push(item(
      seed,
      6,
      "matrix-equation",
      "행렬 방정식",
      "행렬 $X$는?",
      `${coefficient}X+${formatMatrix(A)}=${formatMatrix(B)}`,
      `X=${formatMatrix(X)}`,
      [
        `X=${formatMatrix(scale(coefficient, X))}`,
        `X=${formatMatrix(add(X, A))}`,
        `X=${formatMatrix(scale(-1, X))}`,
      ],
    ));
  }

  return problems;
}

export const matrixProblems = createMatrixProblems(20260821);
