import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { middleSchoolWorksheetCatalog } from "../lib/arithmetic-worksheets.ts";
import { createMiddleExpressionValueProblemSet } from "../lib/middle-expression-values.ts";

const root = process.cwd();
const pageRoot = path.join(root, "app", "arithmetic", "middle-school");
const physicalPages = fs.readdirSync(pageRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(pageRoot, entry.name, "page.tsx")))
  .map((entry) => entry.name)
  .sort();

const baseRoute = (route: string | null) => route?.split("?")[0].split("/").at(-1) ?? "";

test("중등 53개 목차는 중복 없이 모두 실제 페이지에 연결된다", () => {
  assert.equal(middleSchoolWorksheetCatalog.length, 53);
  assert.deepEqual(
    middleSchoolWorksheetCatalog.reduce<Record<string, number>>((counts, worksheet) => {
      counts[worksheet.grade] = (counts[worksheet.grade] ?? 0) + 1;
      return counts;
    }, {}),
    { 중1: 10, 중2: 10, 중3: 33 },
  );
  assert.equal(new Set(middleSchoolWorksheetCatalog.map(({ name }) => name)).size, 53);
  assert.equal(new Set(middleSchoolWorksheetCatalog.map(({ route }) => route)).size, 53);
  assert.deepEqual(
    middleSchoolWorksheetCatalog
      .filter(({ route }) => !physicalPages.includes(baseRoute(route)))
      .map(({ route }) => route),
    [],
  );
});

test("필수 연산 영역은 목차에 하나도 빠지지 않는다", () => {
  const routes = new Set(middleSchoolWorksheetCatalog.map(({ route }) => route));
  const required = [
    "/arithmetic/middle-school/core-calculations?kind=prime-factorization",
    "/arithmetic/middle-school/core-calculations?kind=gcd-lcm",
    "/arithmetic/middle-school/rational-mixed",
    "/arithmetic/middle-school/expression-values",
    "/arithmetic/middle-school/core-calculations?kind=linear-expression",
    "/arithmetic/middle-school/core-calculations?kind=linear-equation",
    "/arithmetic/middle-school/curriculum-calculations?kind=coordinate-proportion",
    "/arithmetic/middle-school/curriculum-calculations?kind=plane-geometry",
    "/arithmetic/middle-school/curriculum-calculations?kind=solid-geometry",
    "/arithmetic/middle-school/statistics?kind=representative-values",
    "/arithmetic/middle-school/core-calculations?kind=repeating-decimal",
    "/arithmetic/middle-school/core-calculations?kind=exponent-laws",
    "/arithmetic/middle-school/core-calculations?kind=polynomial-add-subtract",
    "/arithmetic/middle-school/core-calculations?kind=linear-system-comprehensive",
    "/arithmetic/middle-school/curriculum-calculations?kind=linear-function-basics",
    "/arithmetic/middle-school/curriculum-calculations?kind=linear-function-equations",
    "/arithmetic/middle-school/curriculum-calculations?kind=triangle-quadrilateral",
    "/arithmetic/middle-school/curriculum-calculations?kind=similarity",
    "/arithmetic/middle-school/curriculum-calculations?kind=pythagorean",
    "/arithmetic/middle-school/curriculum-calculations?kind=counting-probability",
    "/arithmetic/middle-school/core-calculations?kind=radical-calculation",
    "/arithmetic/middle-school/core-calculations?kind=formula-comprehensive",
    "/arithmetic/middle-school/factorization?kind=comprehensive",
    "/arithmetic/middle-school/quadratic-equations?kind=applications",
    "/arithmetic/middle-school/quadratic-functions?kind=values-and-forms",
    "/arithmetic/middle-school/trigonometry?kind=ratios",
    "/arithmetic/middle-school/circle-properties?kind=inscribed-angles",
    "/arithmetic/middle-school/statistics?kind=dispersion",
    "/arithmetic/middle-school/curriculum-calculations?kind=quartiles-boxplot",
  ];
  for (const route of required) assert.ok(routes.has(route), route);
});

test("개별 반복 가치가 낮은 쉬운 유형은 한 페이지에 통합한다", () => {
  const routes = middleSchoolWorksheetCatalog.map(({ route }) => route);
  for (const mergedRoute of [
    "/arithmetic/middle-school/core-calculations?kind=linear-equation-application",
    "/arithmetic/middle-school/core-calculations?kind=square-roots-real",
    "/arithmetic/middle-school/quadratic-equations?kind=roots-and-squares",
    "/arithmetic/middle-school/quadratic-functions?kind=vertex-and-axis",
    "/arithmetic/middle-school/trigonometry?kind=special-angles",
    "/arithmetic/middle-school/circle-properties?kind=angle-applications",
    "/arithmetic/middle-school/statistics?kind=mean-applications",
    "/arithmetic/middle-school/core-calculations?kind=monomial-comprehensive",
  ]) {
    assert.ok(!routes.includes(mergedRoute), mergedRoute);
  }
});

test("옛 유리수 세부 주소는 통합 학습지로 이동한다", () => {
  for (const legacy of ["rational-add-subtract", "rational-multiply-divide"]) {
    const source = fs.readFileSync(path.join(pageRoot, legacy, "page.tsx"), "utf8");
    assert.match(source, /redirect\("\/arithmetic\/middle-school\/rational-mixed"\)/);
    assert.doesNotMatch(source, /NumericChoiceWorksheet|createMiddleRational/);
  }
});

test("문자식은 계수가 1 또는 -1일 때 숫자 1을 쓰지 않는다", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const text = createMiddleExpressionValueProblemSet(seed).problems
      .map(({ latex }) => latex)
      .join(" ");
    assert.doesNotMatch(text, /(?:^|[=+(\-])1[xy]/);
    assert.doesNotMatch(text, /(?:^|[=+(])\-1[xy]/);
  }
});

test("중등 생성기는 정답과 무관한 고정 오답을 채우지 않는다", () => {
  for (const filename of fs.readdirSync(path.join(root, "lib"))) {
    if (!filename.startsWith("middle-") || !filename.endsWith(".ts")) continue;
    const source = fs.readFileSync(path.join(root, "lib", filename), "utf8");
    assert.doesNotMatch(source, /for\s*\(const fallback of/);
    assert.doesNotMatch(source, /\[\.\.\.candidates,\s*"x=0",\s*"x=1"/);
  }
});

test("같은 공용 페이지에서 kind만 바뀌어도 해당 학습지로 갱신한다", () => {
  for (const directory of [
    "core-calculations",
    "factorization",
    "curriculum-calculations",
    "quadratic-equations",
    "quadratic-functions",
    "trigonometry",
    "circle-properties",
    "statistics",
  ]) {
    const source = fs.readFileSync(path.join(pageRoot, directory, "page.tsx"), "utf8");
    assert.match(source, /useSearchParams/);
    assert.match(source, /searchParams\.get\("kind"\)/);
    assert.doesNotMatch(source, /window\.location\.search/);
  }
});
