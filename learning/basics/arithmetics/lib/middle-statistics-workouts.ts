export type MiddleStatisticsMethodKind =
  | "mean"
  | "missing-from-mean"
  | "frequency-mean"
  | "median"
  | "mode"
  | "range"
  | "deviations"
  | "variance"
  | "standard-deviation"
  | "variance-from-deviations"
  | "compare-spread";

export type MiddleStatisticsKind =
  | "representative-values"
  | "mean-applications"
  | "dispersion"
  | "comprehensive";

export type MiddleStatisticsDifficulty = "basic" | "application" | "advanced";

export type MiddleStatisticsProblem = {
  id: string;
  kind: MiddleStatisticsMethodKind;
  difficulty: MiddleStatisticsDifficulty;
  structure: string;
  label: string;
  latex: string;
  answerLatex: string;
  solutionHint: string;
  distractors: string[];
};

export const MIDDLE_STATISTICS_KINDS: MiddleStatisticsKind[] = [
  "representative-values",
  "mean-applications",
  "dispersion",
  "comprehensive",
];

export const MIDDLE_STATISTICS_METHOD_KINDS: MiddleStatisticsMethodKind[] = [
  "mean",
  "missing-from-mean",
  "frequency-mean",
  "median",
  "mode",
  "range",
  "deviations",
  "variance",
  "standard-deviation",
  "variance-from-deviations",
  "compare-spread",
];

export const MIDDLE_STATISTICS_TITLES: Record<MiddleStatisticsKind, string> = {
  "representative-values": "통계: 대푯값 계산",
  "mean-applications": "통계: 평균 활용",
  dispersion: "통계: 산포도 계산",
  comprehensive: "대푯값과 산포도 계산 종합",
};

const MIDDLE_STATISTICS_METHOD_TITLES: Record<MiddleStatisticsMethodKind, string> = {
  mean: "평균 계산",
  "missing-from-mean": "평균으로 빠진 값 구하기",
  "frequency-mean": "도수 자료의 평균",
  median: "중앙값 계산",
  mode: "최빈값 찾기",
  range: "범위 계산",
  deviations: "편차 계산",
  variance: "분산 계산",
  "standard-deviation": "표준편차 계산",
  "variance-from-deviations": "편차에서 분산 구하기",
  "compare-spread": "두 자료의 산포도 비교",
};

const DEVIATION_PATTERNS = [
  [-2, -1, 0, 1, 2],
  [-3, -1, 0, 1, 3],
  [-2, -2, 0, 2, 2],
] as const;
const SPREAD_PATTERNS = [
  [-1, -1, 1, 1],
  [-2, -1, 0, 1, 2],
  [-1, -1, -1, 1, 1, 1],
] as const;

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

function gcd(left: number, right: number): number {
  return right === 0 ? Math.abs(left) : gcd(right, left % right);
}

function fraction(numerator: number, denominator: number) {
  const divisor = gcd(numerator, denominator);
  const top = numerator / divisor;
  const bottom = denominator / divisor;
  if (bottom === 1) return `${top}`;
  return `\\dfrac{${top}}{${bottom}}`;
}

function dataLatex(values: readonly number[]) {
  return `\\{${values.join(",\\ ")}\\}`;
}

function tupleLatex(values: readonly number[]) {
  return `(${values.join(",\\ ")})`;
}

function uniqueDistractors(answer: string, candidates: string[]) {
  const unique = [...new Set(candidates.filter((candidate) => candidate !== answer))];
  for (const fallback of ["0", "1", "2", "3", "4", "5", "A", "B", "A=B", "\\text{판단 불가}"]) {
    if (unique.length === 3) break;
    if (fallback !== answer && !unique.includes(fallback)) unique.push(fallback);
  }
  return unique.slice(0, 3);
}

function difficultyForIndex(index: number): MiddleStatisticsDifficulty {
  if (index < 2) return "basic";
  if (index < 5) return "application";
  return "advanced";
}

function make(
  id: string,
  kind: MiddleStatisticsMethodKind,
  latex: string,
  answerLatex: string,
  solutionHint: string,
  distractors: string[],
  structure = kind,
): MiddleStatisticsProblem {
  return {
    id,
    kind,
    difficulty: "basic",
    structure,
    label: MIDDLE_STATISTICS_METHOD_TITLES[kind],
    latex,
    answerLatex,
    solutionHint,
    distractors: uniqueDistractors(answerLatex, distractors),
  };
}

function spreadData(mean: number, scale: number, patternIndex: number) {
  const pattern = SPREAD_PATTERNS[patternIndex % SPREAD_PATTERNS.length];
  return pattern.map((deviation) => mean + deviation * scale);
}

function varianceForSpread(scale: number, patternIndex: number) {
  return patternIndex % SPREAD_PATTERNS.length === 1 ? 2 * scale * scale : scale * scale;
}

function standardDeviationLatex(scale: number, patternIndex: number) {
  if (patternIndex % SPREAD_PATTERNS.length !== 1) return `${scale}`;
  return scale === 1 ? "\\sqrt{2}" : `${scale}\\sqrt{2}`;
}

function rotate<T>(values: T[], shift: number) {
  const offset = shift % values.length;
  return [...values.slice(offset), ...values.slice(0, offset)];
}

function build(
  kind: MiddleStatisticsMethodKind,
  next: () => number,
  id: string,
  index: number,
): MiddleStatisticsProblem {
  const mean = 12 + index * 4 + integer(next, 0, 3);
  const scale = 1 + (index % 4);

  if (kind === "mean") {
    const pattern = DEVIATION_PATTERNS[index % DEVIATION_PATTERNS.length];
    const values = rotate(pattern.map((deviation) => mean + deviation * scale), index + 1);
    return make(id, kind, dataLatex(values), `${mean}`,
      `자료의 합을 자료 수 ${values.length}로 나눈다. 편차의 합이 0이므로 평균은 ${mean}이다.`,
      [`${mean + scale}`, `${mean - scale}`, `${values.reduce((sum, value) => sum + value, 0)}`],
      `mean-${pattern.length}-${index % DEVIATION_PATTERNS.length}`);
  }

  if (kind === "missing-from-mean") {
    const count = 5 + (index % 2);
    const targetSum = mean * count;
    const known = Array.from({ length: count - 1 }, (_, position) => (
      mean + (position - Math.floor((count - 2) / 2)) * scale
    ));
    const missing = targetSum - known.reduce((sum, value) => sum + value, 0);
    return make(id, kind,
      `\\text{평균}=${mean},\\quad ${dataLatex([...known, Number.NaN]).replace("NaN", "x")}`,
      `${missing}`,
      `전체 합 ${mean}\\times${count}에서 알려진 값의 합을 빼서 x를 구한다.`,
      [`${mean}`, `${missing + scale}`, `${targetSum}`],
      `missing-${count}`);
  }

  if (kind === "frequency-mean") {
    const gap = 2 + (index % 4);
    const values = [mean - gap, mean, mean + gap];
    const sideFrequency = 1 + (index % 3);
    const centerFrequency = 2 + ((index + 1) % 3);
    const totalFrequency = sideFrequency * 2 + centerFrequency;
    return make(id, kind,
      `\\begin{array}{c|ccc}\\text{값}&${values.join("&")}\\\\\\hline\\text{도수}&${sideFrequency}&${centerFrequency}&${sideFrequency}\\end{array}`,
      `${mean}`,
      `각 값에 도수를 곱해 더한 뒤 전체 도수 ${totalFrequency}로 나눈다.`,
      [`${mean + gap}`, `${mean - gap}`, `${totalFrequency}`],
      `frequency-${sideFrequency}-${centerFrequency}`);
  }

  if (kind === "median") {
    const oddMode = index % 2 === 0;
    const count = oddMode ? 5 : 6;
    const sorted = Array.from({ length: count }, (_, position) => mean + (position - Math.floor(count / 2)) * 2);
    const values = rotate(sorted, index + 2);
    const median = oddMode
      ? sorted[Math.floor(count / 2)]
      : (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
    return make(id, kind, dataLatex(values), `${median}`,
      oddMode
        ? `자료를 작은 순서로 놓고 가운데인 ${Math.floor(count / 2) + 1}번째 값을 찾는다.`
        : `자료를 작은 순서로 놓고 가운데 두 값의 평균을 계산한다.`,
      [`${sorted[0]}`, `${sorted[count - 1]}`, `${median + 2}`],
      oddMode ? "odd-count" : "even-count");
  }

  if (kind === "mode") {
    const mode = mean;
    const values = rotate([
      mode - 3, mode, mode + 2, mode, mode - 1, mode, mode + 4,
      ...(index % 2 === 0 ? [] : [mode + 2]),
    ], index + 1);
    return make(id, kind, dataLatex(values), `${mode}`,
      `${mode}이 가장 많이 나타나므로 최빈값은 ${mode}이다.`,
      [`${mode + 2}`, `${mode - 1}`, `${values.length}`],
      index % 2 === 0 ? "three-occurrences" : "three-vs-two");
  }

  if (kind === "range") {
    const minimum = 3 + index * 2 + integer(next, 0, 2);
    const maximum = minimum + 8 + index * 3;
    const values = rotate([minimum, minimum + 3, maximum - 2, minimum + 5, maximum], index + 1);
    const answer = maximum - minimum;
    return make(id, kind, dataLatex(values), `${answer}`,
      `가장 큰 값 ${maximum}에서 가장 작은 값 ${minimum}을 뺀다.`,
      [`${maximum}`, `${minimum}`, `${maximum + minimum}`]);
  }

  if (kind === "deviations") {
    const pattern = DEVIATION_PATTERNS[index % DEVIATION_PATTERNS.length];
    const values = pattern.map((deviation) => mean + deviation * scale);
    const deviations = values.map((value) => value - mean);
    return make(id, kind, `\\text{평균}=${mean},\\quad ${dataLatex(values)}`, tupleLatex(deviations),
      "각 자료의 값에서 평균을 빼고 주어진 자료의 순서대로 편차를 쓴다.",
      [
        tupleLatex(deviations.map((value) => -value)),
        tupleLatex(values),
        tupleLatex(deviations.map((value) => Math.abs(value))),
      ],
      `deviations-${index % DEVIATION_PATTERNS.length}`);
  }

  if (kind === "variance" || kind === "standard-deviation") {
    const patternIndex = index % SPREAD_PATTERNS.length;
    const values = rotate(spreadData(mean, scale, patternIndex), index + 1);
    const variance = varianceForSpread(scale, patternIndex);
    if (kind === "variance") {
      return make(id, kind, dataLatex(values), `${variance}`,
        `평균 ${mean}에서의 편차를 제곱해 더하고 자료 수 ${values.length}로 나눈다.`,
        [`${scale}`, `${variance * values.length}`, `${variance + scale}`],
        `variance-${patternIndex}`);
    }
    const answer = standardDeviationLatex(scale, patternIndex);
    return make(id, kind, dataLatex(values), answer,
      `분산 ${variance}의 양의 제곱근을 구해 표준편차로 쓴다.`,
      [`${variance}`, `${scale}\\sqrt{${variance}}`, `${variance * variance}`],
      `standard-deviation-${patternIndex}`);
  }

  if (kind === "variance-from-deviations") {
    const patternIndex = index % SPREAD_PATTERNS.length;
    const deviations = SPREAD_PATTERNS[patternIndex].map((value) => value * scale);
    const variance = varianceForSpread(scale, patternIndex);
    return make(id, kind, `\\text{편차}=${tupleLatex(deviations)}`, `${variance}`,
      `편차를 각각 제곱해 더하고 편차의 개수 ${deviations.length}로 나눈다.`,
      [`${scale}`, `${variance * deviations.length}`, `${variance + scale}`],
      `deviation-variance-${patternIndex}`);
  }

  const smallScale = 1 + (index % 3);
  const largeScale = smallScale + 2 + (index % 2);
  const smallFirst = index % 2 === 0;
  const dataA = spreadData(mean, smallFirst ? smallScale : largeScale, 0);
  const dataB = spreadData(mean, smallFirst ? largeScale : smallScale, 0);
  const answer = smallFirst ? "A" : "B";
  return make(id, kind, `A=${dataLatex(dataA)},\\quad B=${dataLatex(dataB)}`, answer,
    `두 자료의 평균은 같으므로 평균에서 덜 떨어진 자료 ${answer}의 분산과 표준편차가 더 작다.`,
    [smallFirst ? "B" : "A", "A=B", "\\text{판단 불가}"],
    smallFirst ? "a-smaller" : "b-smaller");
}

function comprehensiveKind(seed: number, index: number) {
  return MIDDLE_STATISTICS_METHOD_KINDS[
    (seed * 8 + index) % MIDDLE_STATISTICS_METHOD_KINDS.length
  ];
}

const GROUP_METHOD_PLANS: Record<Exclude<MiddleStatisticsKind, "comprehensive">, MiddleStatisticsMethodKind[]> = {
  "representative-values": [
    "mean", "median",
    "mode", "range", "mean",
    "median", "mode", "range",
  ],
  "mean-applications": [
    "mean", "missing-from-mean",
    "frequency-mean", "mean", "missing-from-mean",
    "frequency-mean", "missing-from-mean", "frequency-mean",
  ],
  dispersion: [
    "deviations", "variance",
    "standard-deviation", "variance-from-deviations", "compare-spread",
    "variance", "standard-deviation", "compare-spread",
  ],
};

const LEGACY_KIND_GROUPS: Record<MiddleStatisticsMethodKind, MiddleStatisticsKind> = {
  mean: "representative-values",
  median: "representative-values",
  mode: "representative-values",
  range: "representative-values",
  "missing-from-mean": "mean-applications",
  "frequency-mean": "mean-applications",
  deviations: "dispersion",
  variance: "dispersion",
  "standard-deviation": "dispersion",
  "variance-from-deviations": "dispersion",
  "compare-spread": "dispersion",
};

export function isMiddleStatisticsKind(value: string | null): value is MiddleStatisticsKind {
  return MIDDLE_STATISTICS_KINDS.includes(value as MiddleStatisticsKind);
}

export function resolveMiddleStatisticsKind(value: string | null): MiddleStatisticsKind | null {
  if (isMiddleStatisticsKind(value)) return value;
  if (MIDDLE_STATISTICS_METHOD_KINDS.includes(value as MiddleStatisticsMethodKind)) {
    return LEGACY_KIND_GROUPS[value as MiddleStatisticsMethodKind];
  }
  return null;
}

export function createMiddleStatisticsProblemSet(kind: MiddleStatisticsKind, seed: number) {
  const next = random(seed);
  return {
    seed,
    kind,
    problems: Array.from({ length: 8 }, (_, index) => {
      const actualKind = kind === "comprehensive"
        ? comprehensiveKind(seed, index)
        : GROUP_METHOD_PLANS[kind][index];
      return {
        ...build(actualKind, next, `middle-statistics-${kind}-${index}`, index),
        difficulty: difficultyForIndex(index),
      };
    }),
  };
}

export function createMiddleStatisticsReviewProblems(
  wrongKinds: MiddleStatisticsMethodKind[],
  seed: number,
) {
  const uniqueKinds = [...new Set(wrongKinds)].slice(0, 2);
  const next = random(seed);
  return uniqueKinds.map((kind, index) => {
    return {
      ...build(kind, next, `middle-statistics-review-${seed}-${index}`, 6 + index),
      difficulty: "advanced" as const,
    };
  });
}
