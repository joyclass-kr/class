import { highSchoolWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";

type AuditedProblem = {
  id?: string;
  kind?: string;
  structure?: string;
  label?: string;
  type?: string;
  skill?: string;
  prompt?: string;
  question?: string;
  correctLatex?: string;
  answerLatex?: string;
  answer?: string;
  choices?: Array<{ id?: string; latex?: string; correct?: boolean }>;
};

type FactoryResult = AuditedProblem[] | { problems: AuditedProblem[] };
type Factory = (seed: number) => FactoryResult;

const FACTORIES: Record<string, readonly [modulePath: string, exportName: string]> = {
  "polynomial-add-subtract": ["../lib/polynomial-worksheets.ts", "createPolynomialProblemSet"],
  "polynomial-division-remainder": ["../lib/polynomial-division-remainder-workouts.ts", "createPolynomialDivisionProblems"],
  "polynomial-identities-remainders": ["../lib/polynomial-identity-remainder-workouts.ts", "createPolynomialIdentityRemainderProblems"],
  "cubic-sum-difference-factorization": ["../lib/high-cubic-factorization-workouts.ts", "createHighCubicFactorizationProblemSet"],
  "advanced-factorization": ["../lib/high-advanced-factorization-workouts.ts", "createHighAdvancedFactorizationProblems"],
  "factorization-rational": ["../lib/rational-expression-worksheets.ts", "createRationalExpressionProblemSet"],
  "complex-numbers": ["../lib/complex-number-workouts.ts", "createComplexProblemSet"],
  "exponents-radicals": ["../lib/exponent-radical-worksheets.ts", "createExponentRadicalProblemSet"],
  "quadratic-root-relations": ["../lib/quadratic-foundation-workouts.ts", "createQuadraticRootRelationProblems"],
  "quadratic-function-relations": ["../lib/quadratic-foundation-workouts.ts", "createQuadraticFunctionRelationProblems"],
  "simultaneous-quadratic-equations": ["../lib/quadratic-foundation-workouts.ts", "createSimultaneousQuadraticProblems"],
  "cubic-quartic-equations": ["../lib/cubic-quartic-equation-workouts.ts", "createCubicQuarticEquationProblems"],
  "equation-transformations": ["../lib/equation-workouts.ts", "createEquationProblemSet"],
  "inequality-intervals": ["../lib/inequality-workouts.ts", "createInequalityProblemSet"],
  "permutations-combinations": ["../lib/permutations-combinations-workouts.ts", "createCommonCountingProblemSet"],
  matrices: ["../lib/matrix-workouts.ts", "createMatrixProblems"],
  "coordinate-lines": ["../lib/coordinate-line-workouts.ts", "createCoordinateLineProblemSet"],
  "circle-equations": ["../lib/circle-equation-workouts.ts", "createCircleProblemSet"],
  "sets-propositions": ["../lib/sets-propositions-workouts.ts", "createLogicProblemSet"],
  "function-transformations": ["../lib/function-foundation-workouts.ts", "createCombinedFunctionTransformationProblemSet"],
  "rational-radical-functions": ["../lib/rational-radical-function-workouts.ts", "createRationalRadicalProblemSet"],
  logarithms: ["../lib/logarithm-workouts.ts", "createLogarithmProblemSet"],
  "exponential-log-functions": ["../lib/exponential-log-function-workouts.ts", "createExponentialLogFunctionProblems"],
  "exponential-log-equations": ["../lib/exponential-log-equation-workouts.ts", "createExponentialLogEquationProblemSet"],
  "exponential-log-inequalities": ["../lib/exponential-log-inequality-workouts.ts", "createExponentialLogInequalityProblemSet"],
  "radian-measure": ["../lib/foundation-generated-workouts.ts", "createRadianArcSectorProblems"],
  "trigonometric-values": ["../lib/trigonometric-values-workouts.ts", "createTrigonometricValueProblemSet"],
  "trigonometric-graphs": ["../lib/trigonometric-graph-workouts.ts", "createTrigonometricGraphProblemSet"],
  "trigonometric-equations": ["../lib/trigonometric-equation-workouts.ts", "createTrigEquationSet"],
  "sine-cosine-laws": ["../lib/sine-cosine-law-workouts.ts", "createSineCosineLawProblems"],
  sequences: ["../lib/sequence-workouts.ts", "createSequenceSet"],
  "financial-sequences": ["../lib/financial-sequence-workouts.ts", "createFinancialSequenceProblems"],
  "sigma-recurrence": ["../lib/sigma-recurrence-workouts.ts", "createSigmaRecurrenceSet"],
  "mathematical-induction": ["../lib/mathematical-induction-workouts.ts", "createMathematicalInductionProblems"],
  "limits-continuity": ["../lib/limit-continuity-workouts.ts", "createLimitSet"],
  "derivative-practice": ["../lib/derivative-workouts.ts", "createDerivativeProblemSet"],
  "derivative-applications": ["../lib/derivative-application-workouts.ts", "createDerivativeApplicationSet"],
  "mean-value-theorem": ["../lib/mean-value-theorem-workouts.ts", "createMeanValueTheoremProblems"],
  "polynomial-integrals": ["../lib/polynomial-integral-workouts.ts", "createIntegralSet"],
  "sequence-limits-series": ["../lib/sequence-limits-series-workouts.ts", "createSequenceLimitsSeriesProblems"],
  "trigonometric-addition": ["../lib/trigonometric-addition-workouts.ts", "createTrigonometricAdditionProblems"],
  "exponential-log-derivatives": ["../lib/exponential-log-derivative-workouts.ts", "createExponentialLogDerivativeProblemSet"],
  "trigonometric-derivatives": ["../lib/trigonometric-derivative-workouts.ts", "createTrigonometricDerivativeProblemSet"],
  "trigonometric-derivatives-2": ["../lib/trigonometric-derivative-two-workouts.ts", "createTrigonometricDerivativeTwoProblemSet"],
  "advanced-differentiation": ["../lib/advanced-differentiation-workouts.ts", "createAdvancedDifferentiationProblems"],
  "second-derivative-applications": ["../lib/second-derivative-application-workouts.ts", "createSecondDerivativeApplicationProblems"],
  "transcendental-integrals": ["../lib/transcendental-integral-workouts.ts", "createTranscendentalIntegralProblemSet"],
  "integration-techniques": ["../lib/integration-technique-workouts.ts", "createIntegrationTechniqueProblemSet"],
  "definite-integrals": ["../lib/definite-integral-workouts.ts", "createDefiniteIntegralProblemSet"],
  "definite-integral-applications": ["../lib/definite-integral-application-workouts.ts", "createDefiniteIntegralApplicationSet"],
  "arc-length": ["../lib/arc-length-surface-area-workouts.ts", "createArcLengthProblems"],
  "solids-of-revolution": ["../lib/solid-of-revolution-workouts.ts", "createSolidOfRevolutionProblems"],
  "conic-sections": ["../lib/geometry-generated-workouts.ts", "createConicProblems"],
  "conic-transformations-tangents": ["../lib/geometry-generated-workouts.ts", "createConicMoveTangentProblems"],
  "plane-vectors": ["../lib/geometry-generated-workouts.ts", "createPlaneVectorProblems"],
  "vector-projections": ["../lib/geometry-generated-workouts.ts", "createProjectionProblems"],
  "vector-geometry": ["../lib/geometry-generated-workouts.ts", "createVectorGeometryProblems"],
  "space-geometry-projections": ["../lib/geometry-generated-workouts.ts", "createSpaceGeometryProjectionProblems"],
  "space-coordinates": ["../lib/geometry-generated-workouts.ts", "createSpaceCoordinateProblems"],
  combinations: ["../lib/permutations-combinations-workouts.ts", "createProbabilityCountingProblemSet"],
  "binomial-theorem": ["../lib/binomial-theorem-workouts.ts", "createBinomialTheoremProblems"],
  "probability-rules": ["../lib/foundation-generated-workouts.ts", "createProbabilityProblems"],
  "probability-rules-advanced": ["../lib/foundation-generated-workouts.ts", "createAdvancedProbabilityProblems"],
  "probability-distributions": ["../lib/foundation-generated-workouts.ts", "createDistributionProblems"],
  "normal-distributions": ["../lib/normal-distribution-workouts.ts", "createNormalDistributionProblems"],
  "statistical-inference": ["../lib/statistical-inference-workouts.ts", "createStatisticalInferenceProblems"],
};

const INTENSIVE_DRILL_ROUTES = new Map<string, string>([[
  "/arithmetic/high-school/probability-rules-advanced",
  "전체확률과 베이즈 정리를 필수 확률 계산에서 분리해 한 문제씩 확인",
]]);

function slugFromRoute(route: string) {
  return route.split("/").filter(Boolean).at(-1) ?? "";
}

function signatureOf(problem: AuditedProblem) {
  const signature = problem.structure ?? problem.kind ?? problem.label ?? problem.type ?? problem.skill;
  if (signature) return signature;
  throw new Error(`반복 구조를 판별할 유형 표지가 없습니다: ${JSON.stringify(problem)}`);
}

async function createProblems(route: string): Promise<AuditedProblem[]> {
  const slug = slugFromRoute(route);
  const entry = FACTORIES[slug];
  if (!entry) throw new Error(`감사 생성기가 연결되지 않은 고등 학습지: ${route}`);
  const [modulePath, exportName] = entry;
  const module = await import(modulePath) as Record<string, unknown>;
  const factory = module[exportName];
  if (typeof factory !== "function") throw new Error(`${route}: ${exportName} 생성기를 찾을 수 없습니다.`);
  const result = (factory as Factory)(20260803);
  return Array.isArray(result) ? result : result.problems;
}

const rows = await Promise.all(highSchoolWorksheetCatalog.map(async (worksheet) => {
  if (!worksheet.route) throw new Error(`주소가 없는 고등 학습지: ${worksheet.title}`);
  const problems = await createProblems(worksheet.route);
  const serialized = JSON.stringify(problems);
  if (/NaN|undefined/.test(serialized)) {
    throw new Error(`${worksheet.route}: 계산할 수 없는 정답 또는 선택지가 있습니다.`);
  }
  const displayedText = problems.flatMap((problem) => [
    problem.label,
    problem.prompt,
    problem.question,
    problem.correctLatex,
    problem.answerLatex,
    ...((problem.choices ?? []).map(({ latex }) => latex)),
  ]).filter((value): value is string => typeof value === "string").join(" ");
  if (/\d+\.\d{7,}/.test(displayedText)) {
    throw new Error(`${worksheet.route}: 정확한 값 대신 긴 부동소수점 근삿값이 노출됩니다.`);
  }
  for (const problem of problems) {
    if (!Array.isArray(problem.choices)) continue;
    const hasCorrectFlags = problem.choices.some(({ correct }) => typeof correct === "boolean");
    if (hasCorrectFlags) {
      const markedChoices = problem.choices.filter(({ correct }) => correct);
      if (markedChoices.length !== 1) {
        throw new Error(`${worksheet.route}: 정답으로 표시된 선택지가 정확히 하나가 아닙니다.`);
      }
      const expectedLatex = problem.correctLatex ?? problem.answerLatex;
      const markedLatex = markedChoices[0]?.latex;
      const matchesExpected = !expectedLatex
        || markedLatex === expectedLatex
        || (typeof markedLatex === "string" && expectedLatex.endsWith(`=${markedLatex}`));
      if (!matchesExpected) {
        throw new Error(`${worksheet.route}: 문제 정답과 정답 선택지가 서로 다릅니다.`);
      }
    } else if (typeof problem.answer === "string") {
      const matchingChoices = problem.choices.filter(({ id }) => id === problem.answer);
      if (matchingChoices.length !== 1) {
        throw new Error(`${worksheet.route}: 정답 식별자와 일치하는 선택지가 정확히 하나가 아닙니다.`);
      }
    }
    const latexChoices = problem.choices.map(({ latex }) => latex).filter((latex): latex is string => typeof latex === "string");
    if (latexChoices.length === problem.choices.length && new Set(latexChoices).size !== latexChoices.length) {
      throw new Error(`${worksheet.route}: 서로 같은 선택지가 중복됩니다.`);
    }
  }
  const counts = new Map<string, number>();
  for (const problem of problems) {
    const signature = signatureOf(problem);
    counts.set(signature, (counts.get(signature) ?? 0) + 1);
  }
  return {
    grade: worksheet.grade,
    title: worksheet.title,
    route: worksheet.route,
    questions: problems.length,
    structures: counts.size,
    maximumRepeat: Math.max(...counts.values()),
    signatures: [...counts.entries()].map(([signature, count]) => `${signature}×${count}`).join(", "),
  };
}));

console.table(rows.map(({ signatures: _signatures, route: _route, ...row }) => row));

const candidates = rows.filter(({ structures, maximumRepeat }) => structures <= 2 || maximumRepeat >= 4);
const unexpected = candidates.filter(({ route }) => !INTENSIVE_DRILL_ROUTES.has(route));

console.log("\n반복 집중 페이지(구조 2개 이하 또는 같은 구조 4회 이상):");
for (const row of candidates) {
  const reason = INTENSIVE_DRILL_ROUTES.get(row.route) ?? "통합 검토 필요";
  console.log(`- [${row.grade}] ${row.title}: ${row.signatures} — ${reason}`);
}

if (Object.keys(FACTORIES).length !== highSchoolWorksheetCatalog.length) {
  throw new Error(`고등 목차 ${highSchoolWorksheetCatalog.length}개와 감사 생성기 ${Object.keys(FACTORIES).length}개의 수가 다릅니다.`);
}

if (unexpected.length > 0) {
  console.error("\n새로 발견한 저다양성 페이지를 통합하거나 집중 반복 예외로 근거를 명시하세요.");
  process.exitCode = 1;
} else {
  console.log(`\n검사 완료: ${rows.length}개 학습지, 새 통합 후보 0개, 집중 반복 유지 ${candidates.length}개.`);
}
