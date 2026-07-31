import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function pick<T>(next: () => number, values: readonly T[]) {
  return values[Math.floor(next() * values.length)]!;
}

function format(value: number) {
  return Number(value.toFixed(4)).toString();
}

function choices(id: string, answer: string, distractors: string[]) {
  return [answer, ...distractors].map((latex, index) => ({
    id: `${id}-${index}`,
    latex,
    correct: index === 0,
  }));
}

function item(
  seed: number,
  index: number,
  label: string,
  latex: string,
  answer: string,
  distractors: string[],
): GeometryChoiceItem {
  const id = `normal-${seed}-${index}`;
  return { id, label, latex, correctLatex: answer, choices: choices(id, answer, distractors) };
}

export function createNormalDistributionProblems(seed: number): GeometryChoiceItem[] {
  const next = random(seed);
  const mu = pick(next, [40, 50, 60, 70, 80] as const);
  const sigma = pick(next, [4, 6, 8, 10] as const);
  const [z, area] = pick(next, [
    [0.5, 0.1915],
    [1, 0.3413],
    [1.5, 0.4332],
    [2, 0.4772],
  ] as const);
  const upper = format(mu + z * sigma);
  const lower = format(mu - z * sigma);
  const zText = format(z);
  const central = format(2 * area);
  const outside = format(1 - 2 * area);
  const left = format(0.5 + area);
  const right = format(0.5 - area);

  return [
    item(seed, 0, "정규확률변수의 표준화", `X\\sim N(${mu},${sigma}^2),\\quad X=${upper},\\quad Z=?`, `Z=${zText}`, [`Z=${format(z * sigma)}`, `Z=${format(-z)}`, `Z=${format(mu + z)}`]),
    item(seed, 1, "표준화에서 원래 값 복원", `X\\sim N(${mu},${sigma}^2),\\quad Z=-${zText},\\quad X=?`, `X=${lower}`, [`X=${upper}`, `X=${format(mu - z)}`, `X=${format(-z * sigma)}`]),
    item(seed, 2, "구간의 표준화", `X\\sim N(${mu},${sigma}^2),\\quad P(${lower}\\le X\\le${upper})`, `P(-${zText}\\le Z\\le${zText})`, [`P(0\\le Z\\le${zText})`, `P(Z\\le-${zText})`, `P(Z\\ge${zText})`]),
    item(seed, 3, "누적확률", `X\\sim N(${mu},${sigma}^2),\\ P(0\\le Z\\le${zText})=${format(area)},\\quad P(X\\le${upper})=?`, left, [right, format(area), central]),
    item(seed, 4, "한쪽 꼬리확률", `X\\sim N(${mu},${sigma}^2),\\ P(0\\le Z\\le${zText})=${format(area)},\\quad P(X\\ge${upper})=?`, right, [left, format(area), outside]),
    item(seed, 5, "평균을 중심으로 한 구간확률", `X\\sim N(${mu},${sigma}^2),\\ P(0\\le Z\\le${zText})=${format(area)},\\quad P(${lower}\\le X\\le${upper})=?`, central, [format(area), left, outside]),
    item(seed, 6, "양쪽 꼬리확률", `X\\sim N(${mu},${sigma}^2),\\ P(0\\le Z\\le${zText})=${format(area)},\\quad P(X\\le${lower}\\ \\text{또는}\\ X\\ge${upper})=?`, outside, [central, right, left]),
  ];
}

export const normalDistributionProblems = createNormalDistributionProblems(20260821);
