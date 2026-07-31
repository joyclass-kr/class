import { middleSchoolWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";
import { createMiddleCirclePropertiesProblemSet, type MiddleCirclePropertiesKind } from "../lib/middle-circle-properties-workouts.ts";
import { createMiddleCoreProblemSet, type MiddleCoreKind } from "../lib/middle-core-workouts.ts";
import { createMiddleCurriculumProblemSet, type MiddleCurriculumKind } from "../lib/middle-curriculum-workouts.ts";
import { createMiddleExpressionValueProblemSet } from "../lib/middle-expression-values.ts";
import { createMiddleFactorizationProblemSet, type MiddleFactorizationKind } from "../lib/middle-factorization-workouts.ts";
import { createMiddleQuadraticEquationProblemSet, type MiddleQuadraticEquationKind } from "../lib/middle-quadratic-equation-workouts.ts";
import { createMiddleQuadraticFunctionProblemSet, type MiddleQuadraticFunctionKind } from "../lib/middle-quadratic-function-workouts.ts";
import { createMiddleRationalMixedProblemSet } from "../lib/middle-rational-mixed.ts";
import { createMiddleStatisticsProblemSet, type MiddleStatisticsKind } from "../lib/middle-statistics-workouts.ts";
import { createMiddleTrigonometryProblemSet, type MiddleTrigonometryKind } from "../lib/middle-trigonometry-workouts.ts";

type AuditedProblem = {
  kind?: string;
  structure?: string;
  label: string;
};

const INTENSIVE_DRILL_ROUTES = new Map([
  [
    "/arithmetic/middle-school/quadratic-equations?kind=quadratic-formula",
    "계수 1인 식과 일반계수 식에 근의 공식을 각각 4회 적용",
  ],
  [
    "/arithmetic/middle-school/quadratic-functions?kind=determine-equation",
    "한 점으로 계수 구하기와 꼭짓점·한 점으로 식 구하기를 각각 4회 적용",
  ],
  [
    "/arithmetic/middle-school/quadratic-functions?kind=intercepts-and-intersections",
    "절편 계산과 직선·포물선의 교점 계산을 각각 4회 적용",
  ],
]);

function createProblems(route: string): AuditedProblem[] {
  const url = new URL(route, "https://worksheet.local");
  const kind = url.searchParams.get("kind") ?? "";

  if (url.pathname.endsWith("/core-calculations")) {
    return createMiddleCoreProblemSet(kind as MiddleCoreKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/curriculum-calculations")) {
    return createMiddleCurriculumProblemSet(kind as MiddleCurriculumKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/factorization")) {
    return createMiddleFactorizationProblemSet(kind as MiddleFactorizationKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/quadratic-equations")) {
    return createMiddleQuadraticEquationProblemSet(kind as MiddleQuadraticEquationKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/quadratic-functions")) {
    return createMiddleQuadraticFunctionProblemSet(kind as MiddleQuadraticFunctionKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/trigonometry")) {
    return createMiddleTrigonometryProblemSet(kind as MiddleTrigonometryKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/circle-properties")) {
    return createMiddleCirclePropertiesProblemSet(kind as MiddleCirclePropertiesKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/statistics")) {
    return createMiddleStatisticsProblemSet(kind as MiddleStatisticsKind, 20260803).problems;
  }
  if (url.pathname.endsWith("/rational-mixed")) {
    return createMiddleRationalMixedProblemSet(20260803).problems;
  }
  if (url.pathname.endsWith("/expression-values")) {
    return createMiddleExpressionValueProblemSet(20260803).problems;
  }
  throw new Error(`감사 생성기가 연결되지 않은 중등 학습지: ${route}`);
}

const rows = middleSchoolWorksheetCatalog.map((worksheet) => {
  if (!worksheet.route) throw new Error(`주소가 없는 중등 학습지: ${worksheet.title}`);
  const problems = createProblems(worksheet.route);
  const serialized = JSON.stringify(problems);
  if (/NaN|undefined/.test(serialized)) {
    throw new Error(`${worksheet.route}: 계산할 수 없는 정답 또는 선택지가 있습니다.`);
  }
  if (/\d+\.\d{7,}/.test(serialized)) {
    throw new Error(`${worksheet.route}: 정확한 값 대신 긴 부동소수점 근삿값이 노출됩니다.`);
  }
  const signatures = problems.map((problem) => problem.structure ?? problem.kind ?? problem.label);
  const counts = new Map<string, number>();
  for (const signature of signatures) counts.set(signature, (counts.get(signature) ?? 0) + 1);
  const maximumRepeat = Math.max(...counts.values());
  return {
    grade: worksheet.grade,
    title: worksheet.title,
    route: worksheet.route,
    questions: problems.length,
    structures: counts.size,
    maximumRepeat,
    signatures: [...counts.entries()].map(([signature, count]) => `${signature}×${count}`).join(", "),
  };
});

console.table(rows.map(({ signatures: _signatures, route: _route, ...row }) => row));

const candidates = rows.filter(({ structures, maximumRepeat }) => structures <= 2 || maximumRepeat >= 4);
const unexpected = candidates.filter(({ route }) => !INTENSIVE_DRILL_ROUTES.has(route));

console.log("\n반복 집중 페이지(구조 2개 이하 또는 같은 구조 4회 이상):");
for (const row of candidates) {
  const reason = INTENSIVE_DRILL_ROUTES.get(row.route) ?? "통합 검토 필요";
  console.log(`- [${row.grade}] ${row.title}: ${row.signatures} — ${reason}`);
}

for (const route of INTENSIVE_DRILL_ROUTES.keys()) {
  if (!rows.some((row) => row.route === route)) {
    throw new Error(`집중 반복 예외가 현재 중등 목차에 없습니다: ${route}`);
  }
}

if (unexpected.length > 0) {
  console.error("\n새로 생긴 저다양성 페이지를 통합하거나 집중 반복 예외로 근거를 명시하세요.");
  process.exitCode = 1;
} else {
  console.log(`\n검사 완료: ${rows.length}개 학습지, 새 통합 후보 0개, 집중 반복 유지 ${candidates.length}개.`);
}
