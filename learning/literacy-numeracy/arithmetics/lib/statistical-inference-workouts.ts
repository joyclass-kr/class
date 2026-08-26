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
  const id = `inference-${seed}-${index}`;
  return { id, label, latex, correctLatex: answer, choices: choices(id, answer, distractors) };
}

export function createStatisticalInferenceProblems(seed: number): GeometryChoiceItem[] {
  const next = random(seed);
  const sampleMean = pick(next, [10, 12, 14, 15, 16, 18] as const);
  const sampleValues = [sampleMean - 3, sampleMean + 2, sampleMean - 1, sampleMean + 4, sampleMean - 2];
  const populationMean = pick(next, [40, 45, 50, 55, 60] as const);
  const rootN = pick(next, [4, 5, 10] as const);
  const sampleN = rootN ** 2;
  const standardError = pick(next, [2, 3, 4] as const);
  const populationSigma = rootN * standardError;
  const z = pick(next, [-2, -1, 1, 2] as const);
  const observedMean = populationMean + z * standardError;
  const [areaZ, area] = pick(next, [
    [0.5, 0.1915],
    [1, 0.3413],
    [1.5, 0.4332],
    [2, 0.4772],
  ] as const);
  const confidenceMean = pick(next, [40, 45, 50, 55, 60] as const);
  const confidenceRootN = pick(next, [5, 10] as const);
  const confidenceN = confidenceRootN ** 2;
  const confidenceStep = pick(next, [1, 2] as const);
  const confidenceSigma = confidenceRootN * confidenceStep;
  const [confidenceLevel, critical] = pick(next, [
    [90, 1.645],
    [95, 1.96],
    [99, 2.576],
  ] as const);
  const margin = critical * confidenceStep;
  const requiredRootN = pick(next, [5, 10, 20] as const);
  const requiredSigma = pick(next, [5, 10, 20] as const);
  const requiredMargin = (1.96 * requiredSigma) / requiredRootN;
  const [sampleProportion, proportionN, proportionError] = pick(next, [
    [0.2, 100, 0.04],
    [0.5, 100, 0.05],
    [0.8, 100, 0.04],
  ] as const);
  const proportionMargin = 1.96 * proportionError;

  return [
    item(seed, 0, "표본평균 계산", `${sampleValues.join(",\\ ")},\\quad\\overline{x}=?`, `\\overline{x}=${sampleMean}`, [`\\overline{x}=${sampleMean - 2}`, `\\overline{x}=${sampleMean - 1}`, `\\overline{x}=${sampleMean + 1}`]),
    item(seed, 1, "표본평균의 분포", `\\mu=${populationMean},\\quad\\sigma=${populationSigma},\\quad n=${sampleN}`, `E(\\overline X)=${populationMean},\\quad\\sigma_{\\overline X}=${standardError}`, [`E(\\overline X)=${populationMean},\\quad\\sigma_{\\overline X}=${populationSigma}`, `E(\\overline X)=${standardError},\\quad\\sigma_{\\overline X}=${populationMean}`, `E(\\overline X)=${populationMean * rootN},\\quad\\sigma_{\\overline X}=${standardError}`]),
    item(seed, 2, "표본평균의 표준화", `\\mu=${populationMean},\\quad\\sigma=${populationSigma},\\quad n=${sampleN},\\quad\\overline X=${observedMean},\\quad Z=?`, `Z=${z}`, [`Z=${-z}`, `Z=${z * rootN}`, `Z=${z > 0 ? z + 1 : z - 1}`]),
    item(seed, 3, "표본평균의 구간확률", `\\overline X\\sim N(${populationMean},${standardError}^2),\\ P(0\\le Z\\le${format(areaZ)})=${format(area)},\\quad P(${populationMean - areaZ * standardError}\\le\\overline X\\le${populationMean + areaZ * standardError})=?`, format(2 * area), [format(area), format(0.5 + area), format(1 - 2 * area)]),
    item(seed, 4, "모평균의 신뢰구간", `\\overline{x}=${confidenceMean},\\quad\\sigma=${confidenceSigma},\\quad n=${confidenceN},\\quad\\text{신뢰도 }${confidenceLevel}\\%`, `${format(confidenceMean - margin)}\\le\\mu\\le${format(confidenceMean + margin)}`, [`${format(confidenceMean - margin / 2)}\\le\\mu\\le${format(confidenceMean + margin / 2)}`, `${format(confidenceMean - margin * 2)}\\le\\mu\\le${format(confidenceMean + margin * 2)}`, `${confidenceMean - confidenceStep}\\le\\mu\\le${confidenceMean + confidenceStep}`]),
    item(seed, 5, "오차한계로 표본 크기 구하기", `\\sigma=${requiredSigma},\\quad z_{0.025}=1.96,\\quad\\text{오차한계}\\le${format(requiredMargin)},\\quad n\\ge?`, `${requiredRootN ** 2}`, [`${requiredRootN}`, `${2 * requiredRootN ** 2}`, `${Math.max(1, requiredRootN ** 2 / 4)}`]),
    item(seed, 6, "모비율의 신뢰구간", `\\widehat p=${sampleProportion},\\quad n=${proportionN},\\quad z_{0.025}=1.96`, `${format(sampleProportion - proportionMargin)}\\le p\\le${format(sampleProportion + proportionMargin)}`, [`${format(sampleProportion - proportionMargin / 2)}\\le p\\le${format(sampleProportion + proportionMargin / 2)}`, `${format(sampleProportion - proportionMargin * 2)}\\le p\\le${format(sampleProportion + proportionMargin * 2)}`, `${format(sampleProportion - proportionError)}\\le p\\le${format(sampleProportion + proportionError)}`]),
  ];
}

export const statisticalInferenceProblems = createStatisticalInferenceProblems(20260823);
