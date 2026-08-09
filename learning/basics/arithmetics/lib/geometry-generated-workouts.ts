import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

type Next = () => number;

function rng(seed: number): Next {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function integer(next: Next, min: number, max: number) {
  return min + Math.floor(next() * (max - min + 1));
}

function nonzero(next: Next, min = -6, max = 6) {
  let value = 0;
  while (value === 0) value = integer(next, min, max);
  return value;
}

function greatestCommonDivisor(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function fractionLatex(numerator: number, denominator: number) {
  if (denominator === 0) throw new Error("분모는 0일 수 없습니다.");
  if (numerator === 0) return "0";
  const sign = numerator * denominator < 0 ? "-" : "";
  const divisor = greatestCommonDivisor(numerator, denominator);
  const absoluteNumerator = Math.abs(numerator) / divisor;
  const absoluteDenominator = Math.abs(denominator) / divisor;
  return absoluteDenominator === 1
    ? `${sign}${absoluteNumerator}`
    : `${sign}\\frac{${absoluteNumerator}}{${absoluteDenominator}}`;
}

function signed(value: number) {
  return value < 0 ? `${value}` : `+${value}`;
}

function shifted(variable: string, value: number) {
  if (value === 0) return variable;
  return `(${variable}${signed(-value)})`;
}

function choiceList(id: string, answer: string, distractors: string[]) {
  const unique = [...new Set([answer, ...distractors.filter((value) => value !== answer)])].slice(0, 4);
  if (unique.length < 4) throw new Error(`${id}: 실제 오답 후보가 3개보다 적습니다.`);
  return unique.map((latex, index) => ({ id: `${id}-${index}`, latex, correct: index === 0 }));
}

function item(id: string, label: string, latex: string, answer: string, distractors: string[], prompt?: string, visualVariant?: string): GeometryChoiceItem {
  return { id, label, prompt, latex, correctLatex: answer, choices: choiceList(id, answer, distractors), visualVariant };
}

export function createConicProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const a = integer(next, 4, 8);
  const b = integer(next, 2, a - 1);
  const a2 = a * a;
  const b2 = b * b;
  const c2 = a2 - b2;
  const p = integer(next, 2, 6);
  const h = nonzero(next, -4, 4);
  const k = nonzero(next, -4, 4);
  return [
    item("c1", "타원의 초점", `\\frac{x^2}{${a2}}+\\frac{y^2}{${b2}}=1`, `(\\pm\\sqrt{${c2}},0)`, [`(0,\\pm\\sqrt{${c2}})`, `(\\pm${a},0)`, `(\\pm\\sqrt{${a2 + b2}},0)`]),
    item("c2", "쌍곡선의 꼭짓점", `\\frac{x^2}{${a2}}-\\frac{y^2}{${b2}}=1`, `(\\pm${a},0)`, [`(0,\\pm${b})`, `(\\pm${b},0)`, `(\\pm\\sqrt{${a2 + b2}},0)`]),
    item("c3", "포물선의 초점", `y^2=${4 * p}x`, `(${p},0)`, [`(${2 * p},0)`, `(0,${p})`, `(-${p},0)`]),
    item("c4", "평행이동한 타원의 중심", `\\frac{${shifted("x", h)}^2}{${a2}}+\\frac{${shifted("y", k)}^2}{${b2}}=1`, `(${h},${k})`, [`(${-h},${-k})`, `(${k},${h})`, `(${-h},${k})`, `(${h},${-k})`, `(${-k},${h})`]),
    item("c5", "타원의 이심률", `\\frac{x^2}{${a2}}+\\frac{y^2}{${b2}}=1,\\quad e=?`, `\\frac{\\sqrt{${c2}}}{${a}}`, [`\\frac{${b}}{${a}}`, `\\frac{${a}}{\\sqrt{${c2}}}`, `\\frac{\\sqrt{${c2}}}{${b}}`]),
    item("c6", "쌍곡선의 점근선", `\\frac{x^2}{${a2}}-\\frac{y^2}{${b2}}=1`, `y=\\pm\\frac{${b}}{${a}}x`, [`y=\\pm\\frac{${a}}{${b}}x`, `y=\\pm${a}x`, `y=\\pm${b}x`]),
    item("c7", "포물선의 준선", `x^2=${-4 * p}y`, `y=${p}`, [`y=-${p}`, `x=${p}`, `x=-${p}`]),
  ];
}

export function createConicMoveTangentProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const m = integer(next, 1, 3);
  const n = integer(next, 1, 3);
  const h = nonzero(next, -4, 4);
  const k = nonzero(next, -4, 4);
  const p = integer(next, 2, 5);
  const t = integer(next, 2, 4);
  const ellipseA2 = 25 * m * m;
  const ellipseB2 = 25 * n * n;
  const hyperbolaA2 = 9 * m * m;
  const hyperbolaB2 = 9 * n * n;
  const movedEllipse = `\\frac{${shifted("x", h)}^2}{${ellipseA2}}+\\frac{${shifted("y", k)}^2}{${ellipseB2}}=1`;
  return [
    item("t1", "타원의 일반점에서의 접선", `\\frac{x^2}{${ellipseA2}}+\\frac{y^2}{${ellipseB2}}=1,\\quad P(${3 * m},${4 * n})`, `\\frac{3x}{${25 * m}}+\\frac{4y}{${25 * n}}=1`, [`\\frac{3x}{${5 * m}}+\\frac{4y}{${5 * n}}=1`, `\\frac{4x}{${25 * m}}+\\frac{3y}{${25 * n}}=1`, `\\frac{3x}{${25 * m}}-\\frac{4y}{${25 * n}}=1`]),
    item("t2", "타원의 다른 일반점에서의 접선", `\\frac{x^2}{${ellipseA2}}+\\frac{y^2}{${ellipseB2}}=1,\\quad P(${4 * m},${3 * n})`, `\\frac{4x}{${25 * m}}+\\frac{3y}{${25 * n}}=1`, [`\\frac{3x}{${25 * m}}+\\frac{4y}{${25 * n}}=1`, `\\frac{4x}{${5 * m}}+\\frac{3y}{${5 * n}}=1`, `\\frac{4x}{${25 * m}}-\\frac{3y}{${25 * n}}=1`]),
    item("t3", "쌍곡선의 일반점에서의 접선", `\\frac{x^2}{${hyperbolaA2}}-\\frac{y^2}{${hyperbolaB2}}=1,\\quad P(${5 * m},${4 * n})`, `\\frac{5x}{${9 * m}}-\\frac{4y}{${9 * n}}=1`, [`\\frac{5x}{${9 * m}}+\\frac{4y}{${9 * n}}=1`, `\\frac{4x}{${9 * m}}-\\frac{5y}{${9 * n}}=1`, `\\frac{5x}{${3 * m}}-\\frac{4y}{${3 * n}}=1`]),
    item("t4", "포물선의 매개변수 접선", `y^2=${4 * p}x,\\quad P(${p * t * t},${2 * p * t})`, `${t}y=x+${p * t * t}`, [`${t}y=x-${p * t * t}`, `y=${t}x+${p * t * t}`, `${t}x=y+${p * t * t}`]),
    item("t5", "세로 포물선의 매개변수 접선", `x^2=${4 * p}y,\\quad P(${2 * p * t},${p * t * t})`, `${t}x=y+${p * t * t}`, [`${t}x=y-${p * t * t}`, `x=${t}y+${p * t * t}`, `${t}y=x+${p * t * t}`]),
    item("t6", "평행이동한 타원의 접선", `${movedEllipse},\\quad P(${h + 3 * m},${k + 4 * n})`, `\\frac{3${shifted("x", h)}}{${25 * m}}+\\frac{4${shifted("y", k)}}{${25 * n}}=1`, [`\\frac{3${shifted("x", -h)}}{${25 * m}}+\\frac{4${shifted("y", -k)}}{${25 * n}}=1`, `\\frac{3${shifted("x", h)}}{${5 * m}}+\\frac{4${shifted("y", k)}}{${5 * n}}=1`, `\\frac{4${shifted("x", h)}}{${25 * m}}+\\frac{3${shifted("y", k)}}{${25 * n}}=1`]),
    item("t7", "평행이동한 포물선의 접선", `${shifted("y", k)}^2=${4 * p}${shifted("x", h)},\\quad P(${h + p * t * t},${k + 2 * p * t})`, `${t}${shifted("y", k)}=${shifted("x", h)}+${p * t * t}`, [`${t}${shifted("y", k)}=${shifted("x", h)}-${p * t * t}`, `${shifted("y", k)}=${t}${shifted("x", h)}+${p * t * t}`, `${t}${shifted("x", h)}=${shifted("y", k)}+${p * t * t}`]),
  ];
}

export function createPlaneVectorProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const ax = nonzero(next), ay = nonzero(next), bx = nonzero(next), by = nonzero(next);
  const scale = integer(next, 2, 4);
  const ratio = integer(next, 1, 3);
  return [
    item("v1", "벡터의 합", `(${ax},${ay})+(${bx},${by})=?`, `(${ax + bx},${ay + by})`, [`(${ax - bx},${ay - by})`, `(${ax + bx},${ay - by})`, `(${bx - ax},${by - ay})`, `(${ax - bx},${ay + by})`, `(${-ax - bx},${ay + by})`]),
    item("v2", "벡터의 크기", `\\left|(${3 * scale},${4 * scale})\\right|=?`, `${5 * scale}`, [`${7 * scale}`, `${25 * scale}`, `${scale}`]),
    item("v3", "실수배와 합", `${scale}(${ax},${ay})-(${bx},${by})=?`, `(${scale * ax - bx},${scale * ay - by})`, [`(${scale * ax + bx},${scale * ay + by})`, `(${ax - scale * bx},${ay - scale * by})`, `(${scale * ax - bx},${scale * ay + by})`, `(${scale * ax + bx},${scale * ay - by})`, `(${ax - bx},${ay - by})`]),
    item("v4", "단위벡터", `\\vec a=(${3 * scale},${4 * scale}),\\quad \\frac{\\vec a}{|\\vec a|}=?`, `\\left(\\frac35,\\frac45\\right)`, [`(${3 * scale},${4 * scale})`, `\\left(\\frac45,\\frac35\\right)`, `\\left(\\frac15,\\frac15\\right)`]),
    item("v5", "평행 조건", `(k,${scale * by})\\parallel(${bx},${by}),\\quad k=?`, `k=${scale * bx}`, [`k=${bx}`, `k=${scale * by}`, `k=${-scale * bx}`, `k=${scale * bx + by}`, `k=${scale * bx - by}`]),
    item("v6", "위치벡터", `\\overrightarrow{OA}=(${ax},${ay}),\\quad\\overrightarrow{AB}=(${bx},${by}),\\quad\\overrightarrow{OB}=?`, `(${ax + bx},${ay + by})`, [`(${ax - bx},${ay - by})`, `(${bx - ax},${by - ay})`, `(${ax + bx},${ay - by})`, `(${ax - bx},${ay + by})`, `(${-ax - bx},${-ay - by})`]),
    item("v7", "내분점의 위치벡터", `AP:PB=${ratio}:1,\\quad\\vec a=(${ax},${ay}),\\quad\\vec b=(${bx},${by})`, `\\vec p=\\frac{\\vec a+${ratio}\\vec b}{${ratio + 1}}`, [`\\vec p=\\frac{${ratio}\\vec a+\\vec b}{${ratio + 1}}`, `\\vec p=\\vec a+\\vec b`, `\\vec p=\\frac{\\vec a+\\vec b}{2}`]),
  ];
}

export function createProjectionProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const ax = nonzero(next), ay = nonzero(next), bx = nonzero(next), by = nonzero(next);
  const dot = ax * bx + ay * by;
  const perpendicularX = by;
  const perpendicularY = -bx;
  const scale = integer(next, 2, 5);
  const projectionFactorNumerator = dot;
  const projectionFactorDenominator = bx * bx + by * by;
  return [
    item("p1", "내적", `\\vec a=(${ax},${ay}),\\quad\\vec b=(${bx},${by}),\\quad\\vec a\\cdot\\vec b=?`, `${dot}`, [`${ax * bx - ay * by}`, `${ax + ay + bx + by}`, `${-dot}`, `${ax * by + ay * bx}`, `${ax * bx}`, `${ay * by}`]),
    item("p2", "수직 조건", `(k,${scale})\\perp(${perpendicularX},${perpendicularY}),\\quad k=?`, `k=${fractionLatex(scale * bx, by)}`, [`k=${fractionLatex(-scale * bx, by)}`, `k=${scale}`, `k=${perpendicularX}`, `k=${fractionLatex(-scale * by, bx)}`, `k=${scale * perpendicularX}`, `k=${-scale}`, "k=0"]),
    item("p3", "두 벡터가 이루는 각", `\\vec a=(1,0),\\quad\\vec b=(1,1),\\quad\\theta=?`, `\\frac{\\pi}{4}`, [`\\frac{\\pi}{3}`, `\\frac{\\pi}{6}`, `\\frac{3\\pi}{4}`]),
    item("p4", "스칼라 정사영", `\\vec a=(${3 * scale},${4 * scale}),\\quad\\vec b=(1,0),\\quad\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}=?`, `${3 * scale}`, [`${4 * scale}`, `${5 * scale}`, `${12 * scale * scale}`]),
    item("p5", "벡터 정사영", `\\vec a=(${ax},${ay}),\\quad\\vec b=(${bx},${by}),\\quad\\mathrm{proj}_{\\vec b}\\vec a=?`, `\\frac{${projectionFactorNumerator}}{${projectionFactorDenominator}}(${bx},${by})`, [`\\frac{${projectionFactorDenominator}}{${projectionFactorNumerator || 1}}(${bx},${by})`, `(${ax},${ay})`, `${dot}(${bx},${by})`, `-\\frac{${projectionFactorNumerator}}{${projectionFactorDenominator}}(${bx},${by})`, `\\frac{${projectionFactorNumerator}}{${projectionFactorDenominator}}(${ax},${ay})`, `\\frac{${projectionFactorNumerator}}{\\sqrt{${projectionFactorDenominator}}}(${bx},${by})`]),
    item("p6", "수직 성분", `\\vec a=(${ax},${ay}),\\quad\\vec b=(${bx},${by}),\\quad\\vec a_{\\perp}=?`, `\\vec a-\\frac{${projectionFactorNumerator}}{${projectionFactorDenominator}}\\vec b`, [`\\frac{${projectionFactorNumerator}}{${projectionFactorDenominator}}\\vec b`, `\\vec a+\\vec b`, `\\vec a-\\vec b`]),
    item("p7", "좌표축과 이루는 각", `\\vec a=(${3 * scale},${4 * scale}),\\quad\\cos\\angle(\\vec a,\\ x\\text{축})=?`, `\\frac35`, [`\\frac45`, `\\frac34`, `\\frac53`], "$\\cos\\angle(\\vec a, x\\text{축})$는?"),
  ];
}

export function createVectorGeometryProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const a = nonzero(next), b = nonzero(next), c = nonzero(next);
  const px = nonzero(next), py = nonzero(next);
  const dx = nonzero(next), dy = nonzero(next);
  const distanceNumerator = Math.abs(a * px + b * py + c);
  return [
    item("g1", "직선의 방향벡터", `${a}x${signed(b)}y${signed(c)}=0`, `(${b},${-a})`, [`(${a},${b})`, `(${-a},${-b})`, `(${a},0)`]),
    item("g2", "법선벡터", `${a}x${signed(b)}y${signed(c)}=0`, `(${a},${b})`, [`(${b},${-a})`, `(${-b},${a})`, `(${a},${-b})`, `(0,${b})`]),
    item("g3", "벡터로 나타낸 직선", `P(${px},${py}),\\quad\\vec d=(${dx},${dy})`, `(x,y)=(${px},${py})+t(${dx},${dy})`, [`(x,y)=(${px},${py})+t(${-dy},${dx})`, `(x,y)=(${px - dy},${py + dx})+t(${dx},${dy})`, `(x,y)=(${px - 2 * dy},${py + 2 * dx})+t(${dx},${dy})`]),
    item("g4", "점과 직선 사이의 거리", `P(${px},${py}),\\quad ${a}x${signed(b)}y${signed(c)}=0`, `\\frac{${distanceNumerator}}{\\sqrt{${a * a + b * b}}}`, [`\\frac{${distanceNumerator}}{${a * a + b * b}}`, `${distanceNumerator}`, `\\sqrt{${a * a + b * b}}`]),
    item("g5", "삼각형의 넓이", `\\overrightarrow{AB}=(${ax(next)},${ay(next)}),\\quad\\overrightarrow{AC}=(${dx},${dy})`, `\\frac12|\\det(\\overrightarrow{AB},\\overrightarrow{AC})|`, [`|\\overrightarrow{AB}\\cdot\\overrightarrow{AC}|`, `|\\det(\\overrightarrow{AB},\\overrightarrow{AC})|`, `\\frac12|\\overrightarrow{AB}\\cdot\\overrightarrow{AC}|`]),
    item("g6", "좌표축에 내린 수선의 발", `P(${px},${py}),\\quad x\\text{축에 내린 수선의 발 }H=?`, `H=(${px},0)`, [`H=(0,${py})`, `H=(${px},${py})`, `H=(0,${px})`, `H=(${px},${-py})`, `H=(${-px},0)`], "수선의 발 $H$는?"),
    item("g7", "두 직선의 수직 조건", `\\vec d_1=(${dx},${dy}),\\quad\\vec d_2=(k,${dx}),\\quad\\vec d_1\\perp\\vec d_2`, `k=${-dy}`, [`k=${dy}`, `k=${dx}`, `k=${-dx}`, "k=0", `k=${dx + dy}`, `k=${dx - dy}`]),
  ];
}

function ax(next: Next) { return nonzero(next); }
function ay(next: Next) { return nonzero(next); }

export function createSpaceCoordinateProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const ax = nonzero(next), ay = nonzero(next), az = nonzero(next);
  const dx = nonzero(next, -4, 4), dy = nonzero(next, -4, 4), dz = nonzero(next, -4, 4);
  const bx = ax + dx, by = ay + dy, bz = az + dz;
  const cx = nonzero(next), cy = nonzero(next), cz = nonzero(next);
  const radius = integer(next, 2, 7);
  const ratio = integer(next, 1, 3);
  return [
    item("s1", "공간에서 두 점 사이의 거리", `A(${ax},${ay},${az}),\\quad B(${bx},${by},${bz})`, `\\sqrt{${dx * dx + dy * dy + dz * dz}}`, [`\\sqrt{${Math.abs(dx) + Math.abs(dy) + Math.abs(dz)}}`, `${dx * dx + dy * dy + dz * dz}`, `\\sqrt{${dx * dx + dy * dy}}`, `\\sqrt{${dx * dx + dz * dz}}`, `\\sqrt{${dy * dy + dz * dz}}`, `${Math.abs(dx) + Math.abs(dy) + Math.abs(dz)}`, `\\max\\{${Math.abs(dx)},${Math.abs(dy)},${Math.abs(dz)}\\}`]),
    item("s2", "선분의 중점", `A(${ax},${ay},${az}),\\quad B(${bx},${by},${bz})`, `\\left(\\frac{${ax + bx}}2,\\frac{${ay + by}}2,\\frac{${az + bz}}2\\right)`, [`(${ax + bx},${ay + by},${az + bz})`, `\\left(\\frac{${ax - bx}}2,\\frac{${ay - by}}2,\\frac{${az - bz}}2\\right)`, `(${bx},${by},${bz})`, `(${ax},${ay},${az})`, `\\left(\\frac{${ax + bx}}2,\\frac{${ay - by}}2,\\frac{${az + bz}}2\\right)`]),
    item("s3", "내분점", `AP:PB=${ratio}:1,\\quad A(${ax},${ay},${az}),\\quad B(${bx},${by},${bz})`, `P=\\frac{A+${ratio}B}{${ratio + 1}}`, [`P=\\frac{${ratio}A+B}{${ratio + 1}}`, `P=\\frac{A+B}{2}`, `P=A+${ratio}B`]),
    item("s4", "구의 중심과 반지름", `${shifted("x", cx)}^2+${shifted("y", cy)}^2+${shifted("z", cz)}^2=${radius * radius}`, `C=(${cx},${cy},${cz}),\\quad r=${radius}`, [`C=(${-cx},${-cy},${-cz}),\\quad r=${radius}`, `C=(${cx},${cy},${cz}),\\quad r=${radius * radius}`, `C=(${cy},${cz},${cx}),\\quad r=${radius}`, `C=(${-cx},${cy},${cz}),\\quad r=${radius}`, `C=(${cx},${-cy},${cz}),\\quad r=${radius}`]),
    item("s5", "구의 방정식", `C=(${cx},${cy},${cz}),\\quad r=${radius}`, `${shifted("x", cx)}^2+${shifted("y", cy)}^2+${shifted("z", cz)}^2=${radius * radius}`, [`${shifted("x", -cx)}^2+${shifted("y", -cy)}^2+${shifted("z", -cz)}^2=${radius * radius}`, `${shifted("x", cx)}^2+${shifted("y", cy)}^2+${shifted("z", cz)}^2=${radius}`, `x^2+y^2+z^2=${radius * radius}`], "구의 방정식은?"),
    item("s6", "좌표평면에 대한 대칭", `P(${ax},${ay},${az})\\text{를 }xy\\text{평면에 대칭이동}`, `(${ax},${ay},${-az})`, [`(${-ax},${-ay},${az})`, `(${ax},${-ay},${az})`, `(${-ax},${ay},${az})`], "대칭이동한 점의 좌표는?"),
    item("s7", "좌표평면 위의 점", `P(a,b,c)\\text{가 }yz\\text{평면 위}`, `a=0`, [`b=0`, `c=0`, `a=b=c`], "$a$는?"),
  ];
}

export function createSpaceGeometryProjectionProblems(seed: number): GeometryChoiceItem[] {
  const next = rng(seed);
  const scale = integer(next, 2, 5);
  const relationKind = integer(next, 0, 2);
  const hx = nonzero(next, -4, 4);
  const hy = nonzero(next, -4, 4);
  const hz = nonzero(next, -4, 4);
  const distanceScale = integer(next, 1, 4);
  const projectionScale = integer(next, 1, 4);
  const perpendicularScale = integer(next, 1, 3);
  const planeConstant = hx + 2 * hy + 2 * hz;
  const pointX = hx + distanceScale;
  const pointY = hy + 2 * distanceScale;
  const pointZ = hz + 2 * distanceScale;
  const relationVectors = [
    { direction: "(1,2,2)", equation: `2x-y=${scale}`, answer: "\\text{평행}" },
    { direction: "(1,2,2)", equation: `x+2y+2z=${scale}`, answer: "\\text{수직}" },
    { direction: "(1,2,2)", equation: `x+y+z=${scale}`, answer: "\\text{한 점에서 만남}" },
  ][relationKind];
  const projectionX = 3 * projectionScale + 4 * perpendicularScale;
  const projectionY = 4 * projectionScale - 3 * perpendicularScale;
  const projectionZ = nonzero(next, -4, 4);
  const originalArea = 12 * scale;
  const projectedArea = originalArea / 2;
  return [
    item("sg1", "두 직선이 이루는 각", `\\ell_1:\\vec x=(1,0,0)+s(${scale},0,0),\\quad\\ell_2:\\vec x=(0,1,0)+t(${scale},${scale},0)`, `\\frac{\\pi}{4}`, [`\\frac{\\pi}{3}`, `\\frac{\\pi}{6}`, `\\frac{\\pi}{2}`], "두 직선이 이루는 각은?", "space-lines-angle"),
    item("sg2", "직선과 평면의 위치 관계", `\\ell:\\vec x=(0,0,0)+t${relationVectors.direction},\\quad\\alpha:${relationVectors.equation}`, relationVectors.answer, ["\\text{평행}", "\\text{수직}", "\\text{한 점에서 만남}", "\\text{일치}"].filter((answer) => answer !== relationVectors.answer), "직선과 평면의 위치 관계는?", "space-line-plane"),
    item("sg3", "두 평면이 이루는 각", `\\alpha:${scale}x=${scale},\\quad\\beta:${scale}x+${scale}y=${2 * scale}`, `\\frac{\\pi}{4}`, [`\\frac{\\pi}{3}`, `\\frac{\\pi}{6}`, `\\frac{\\pi}{2}`], "두 평면이 이루는 각은?", "space-planes-angle"),
    item("sg4", "점과 평면 사이의 거리", `P(${pointX},${pointY},${pointZ}),\\quad\\alpha:x+2y+2z=${planeConstant}`, `${3 * distanceScale}`, [`${distanceScale}`, `${9 * distanceScale}`, `\\sqrt{${3 * distanceScale}}`], "점 P와 평면 α 사이의 거리는?", "space-point-plane-distance"),
    item("sg5", "평행한 두 평면 사이의 거리", `\\alpha:x+2y+2z=${planeConstant},\\quad\\beta:x+2y+2z=${planeConstant + 3 * scale}`, `${scale}`, [`${3 * scale}`, `${9 * scale}`, `\\frac{${scale}}{3}`], "두 평면 사이의 거리는?", "space-parallel-planes"),
    item("sg6", "평면에 내린 수선의 발", `P(${pointX},${pointY},${pointZ}),\\quad\\alpha:x+2y+2z=${planeConstant}`, `H=(${hx},${hy},${hz})`, [`H=(${pointX},${pointY},${pointZ})`, `H=(${hx},${hy},${pointZ})`, `H=(${-hx},${-hy},${-hz})`, `H=(${pointX},${hy},${hz})`, `H=(${hx},${pointY},${hz})`], "수선의 발 H의 좌표는?", "space-perpendicular-foot"),
    item("sg7", "직선 방향으로의 벡터 정사영", `\\vec a=(${projectionX},${projectionY},${projectionZ}),\\quad\\vec b=(3,4,0)`, `(${3 * projectionScale},${4 * projectionScale},0)`, [`(${projectionX},${projectionY},0)`, `(${4 * projectionScale},${3 * projectionScale},0)`, `(${-3 * projectionScale},${-4 * projectionScale},0)`], "$\\mathrm{proj}_{\\vec b}\\vec a$는?", "space-vector-projection"),
    item("sg8", "평면도형의 정사영 넓이", `S=${originalArea},\\quad \\theta=60^\\circ`, `${projectedArea}`, [`${originalArea}`, `${originalArea * 2}`, `${originalArea * 3 / 2}`], "정사영의 넓이는?", "space-area-projection"),
    item("sg9", "삼수선의 정리", `PH\\perp\\alpha,\\quad HA\\perp AB,\\quad A,B,H\\in\\alpha`, `PA\\perp AB`, [`PA\\parallel AB`, `PH\\perp AB`, `PA\\parallel HA`], "삼수선의 정리로 알 수 있는 관계는?", "space-three-perpendiculars"),
  ];
}