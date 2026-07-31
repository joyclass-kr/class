import type { GeometryChoiceItem } from "../app/arithmetic/high-school/components/geometry-choice-worksheet";

export const STEM_FOUNDATION_KINDS = [
  "complex-polar",
  "matrix-systems",
  "determinants-inverses",
  "vector-spaces-rank",
  "orthogonality-least-squares",
  "eigen-diagonalization",
  "vector-functions",
  "partial-derivatives",
  "gradient-optimization",
  "multiple-integrals",
  "vector-calculus",
  "applied-integrals",
  "first-order-ode",
  "second-order-ode",
  "laplace-transforms",
  "fourier-series",
  "linear-ode-systems",
  "numerical-methods",
] as const;

export const STEM_BRIDGE_KINDS = [
  "complex-polar",
  "matrix-systems",
  "vector-spaces-rank",
  "partial-derivatives",
  "multiple-integrals",
  "first-order-ode",
] as const satisfies readonly StemFoundationKind[];

export type StemFoundationKind = (typeof STEM_FOUNDATION_KINDS)[number];

export const STEM_FOUNDATION_TITLES: Record<StemFoundationKind, string> = {
  "complex-polar": "복소수의 극형식·오일러 공식",
  "matrix-systems": "행렬·행렬식·가우스 소거",
  "determinants-inverses": "행렬식·역행렬·LU 분해",
  "vector-spaces-rank": "벡터공간·기저·고유값 입문",
  "orthogonality-least-squares": "직교·정사영·최소제곱",
  "eigen-diagonalization": "고유값·대각화·행렬의 거듭제곱",
  "vector-functions": "벡터함수·매개곡선",
  "partial-derivatives": "편미분·그래디언트 입문",
  "gradient-optimization": "그래디언트·방향미분·최적화",
  "multiple-integrals": "이중적분·좌표변환 입문",
  "vector-calculus": "선적분·면적분·벡터미적분",
  "applied-integrals": "곡선 길이·회전체·이차곡선 넓이",
  "first-order-ode": "미분방정식 입문",
  "second-order-ode": "2계 선형 미분방정식",
  "laplace-transforms": "라플라스 변환",
  "fourier-series": "푸리에 급수",
  "linear-ode-systems": "연립 미분방정식·행렬지수",
  "numerical-methods": "수치해석 기초 계산",
};

const STEM_FOUNDATION_PROMPTS: Record<StemFoundationKind, readonly string[]> = {
  "complex-polar": [
    "절댓값 $|z|$와 주편각 $\\arg z$를 구하세요.",
    "직교형식 $a+bi$로 나타내세요.",
    "곱을 극형식으로 나타내세요.",
    "몫을 극형식으로 나타내세요.",
    "거듭제곱의 값을 구하세요.",
    "방정식을 만족하는 모든 복소수 $z$를 구하세요.",
    "복소지수식의 값을 구하세요.",
    "합의 값을 구하세요.",
  ],
  "matrix-systems": [
    "행렬의 복합식 $2A^{T}-3B$를 구하세요.",
    "두 행렬의 교환자 $AB-BA$를 구하세요.",
    "3×3 행렬의 행렬식을 구하세요.",
    "3×3 행렬의 역행렬을 구하세요.",
    "가우스 소거법으로 해 $(x,y,z)$를 구하세요.",
    "확대행렬의 기약행사다리꼴을 구하세요.",
    "$a$의 값에 따라 해의 개수를 판정하세요.",
    "가우스 소거법으로 행렬방정식 $AX=B$의 $X$를 구하세요.",
  ],
  "determinants-inverses": [
    "행렬식의 값을 구하세요.",
    "삼각행렬의 행렬식을 구하세요.",
    "여인수 전개로 행렬식을 구하세요.",
    "역행렬이 존재하지 않도록 하는 $a$를 구하세요.",
    "역행렬 $A^{-1}$을 구하세요.",
    "$\\det(AB)$를 구하세요.",
    "$A=LU$를 만족하는 $L$과 $U$를 구하세요.",
    "3×3 행렬의 역행렬을 구하세요.",
  ],
  "vector-spaces-rank": [
    "선형결합의 결과 벡터를 구하세요.",
    "등식을 만족하는 계수 $(a,b)$를 구하세요.",
    "두 벡터가 일차독립인지 판정하세요.",
    "부분공간 $W$의 차원을 구하세요.",
    "영공간 $N(A)$의 기저를 구하세요.",
    "열공간 $\\operatorname{Col}(A)$의 기저를 구하세요.",
    "행렬 $A$의 고유값을 모두 구하세요.",
    "주어진 고유값에 대한 고유공간을 구하세요.",
  ],
  "orthogonality-least-squares": [
    "두 벡터의 내적을 구하세요.",
    "$v$를 주어진 벡터 위로 정사영한 벡터를 구하세요.",
    "벡터 $v$와 직선 $L$ 사이의 거리를 구하세요.",
    "그람–슈미트 과정의 직교성분 $u_2$를 구하세요.",
    "정규화한 단위벡터 $e$를 구하세요.",
    "최소제곱 직선 $y=a+bx$의 $a$와 $b$를 구하세요.",
    "$A^{T}A$와 $A^{T}b$를 구하세요.",
    "직교행렬의 역행렬 $Q^{-1}$을 구하세요.",
  ],
  "eigen-diagonalization": [
    "특성다항식 $p(\\lambda)$를 구하세요.",
    "행렬 $A$의 고유값을 모두 구하세요.",
    "주어진 고유값에 대한 고유공간을 구하세요.",
    "대각화를 이용해 $A^2$을 구하세요.",
    "행렬 $A^4$을 구하세요.",
    "$A^3$을 $A$와 $I$의 일차결합으로 나타내세요.",
    "행렬지수 $e^{At}$를 구하세요.",
    "대칭행렬 $A$의 고유값을 모두 구하세요.",
  ],
  "vector-functions": [
    "도함수 $r'(t)$를 구하세요.",
    "속도벡터 $v(t)$와 가속도벡터 $a(t)$를 구하세요.",
    "속력 $\\lVert v(t)\\rVert$를 구하세요.",
    "단위접선벡터 $T$를 구하세요.",
    "주어진 점에서의 접선 방정식을 구하세요.",
    "매개곡선의 길이 $L$을 구하세요.",
    "곡률 $\\kappa$를 구하세요.",
    "초기조건을 만족하는 위치벡터 $r(t)$를 구하세요.",
  ],
  "partial-derivatives": [
    "$x$에 대한 편도함수 $f_x$를 구하세요.",
    "혼합편도함수 $f_{xy}$를 구하세요.",
    "$\\dfrac{dz}{dt}$를 구하세요.",
    "음함수의 도함수 $\\dfrac{dy}{dx}$를 구하세요.",
    "전미분 $dz$를 구하세요.",
    "주어진 점에서의 접평면 방정식을 구하세요.",
    "주어진 점에서 그래디언트 $\\nabla f$를 구하세요.",
    "단위벡터 $u$ 방향의 방향미분 $D_u f$를 구하세요.",
  ],
  "gradient-optimization": [
    "그래디언트 $\\nabla f$를 구하세요.",
    "단위벡터 $u$ 방향의 방향미분 $D_u f$를 구하세요.",
    "최대증가 방향의 단위벡터를 구하세요.",
    "함수 $f$의 임계점을 구하세요.",
    "주어진 이차미분 조건으로 임계점의 종류를 판정하세요.",
    "제약조건에서 $f$의 최댓값과 최솟값을 구하세요.",
    "제약조건에서 $xy$가 최대가 되는 점을 구하세요.",
    "야코비 행렬 $J_F$를 구하세요.",
  ],
  "multiple-integrals": [
    "이중적분의 값을 구하세요.",
    "적분순서를 바꾼 영역의 범위를 쓰세요.",
    "영역 $D$의 넓이를 구하세요.",
    "극좌표 이중적분의 값을 구하세요.",
    "원판 위 이중적분의 값을 구하세요.",
    "삼각영역 위 이중적분의 값을 구하세요.",
    "좌표변환의 야코비안 절댓값을 구하세요.",
    "극좌표로 바꾼 이중적분의 값을 구하세요.",
  ],
  "vector-calculus": [
    "벡터장 $F$의 발산 $\\nabla\\cdot F$를 구하세요.",
    "벡터장 $F$의 회전 $\\nabla\\times F$를 구하세요.",
    "$F=\\nabla\\phi$를 만족하는 퍼텐셜 $\\phi$를 구하세요.",
    "곡선 $C$를 따른 선적분을 구하세요.",
    "그린 정리를 이용해 주어진 선적분을 구하세요.",
    "스토크스 정리를 이용해 경계곡선의 선적분을 구하세요.",
    "발산정리를 이용해 닫힌 곡면의 플럭스를 구하세요.",
    "구면 $S$를 지나는 바깥쪽 플럭스를 구하세요.",
  ],
  "applied-integrals": [
    "타원의 넓이를 구하세요.",
    "두 곡선 사이의 넓이를 구하세요.",
    "곡선의 길이를 구하세요.",
    "매개곡선의 길이를 구하세요.",
    "원판법으로 회전체의 부피 $V$를 구하세요.",
    "원통껍질법으로 회전체의 부피 $V$를 구하세요.",
    "회전체의 겉넓이 $S$를 구하세요.",
    "곡선 아래 영역의 넓이를 구하세요.",
  ],
  "first-order-ode": [
    "초기조건을 만족하는 해 $y(x)$를 구하세요.",
    "초기조건을 만족하는 해 $y(x)$를 구하세요.",
    "미분방정식의 일반해 $y(x)$를 구하세요.",
    "적분인자 $\\mu(x)$를 구하세요.",
    "미분방정식의 음함수형 일반해를 구하세요.",
    "베르누이 방정식의 일반해 $y(x)$를 구하세요.",
    "특성방정식을 이용해 2계 방정식의 일반해 $y(x)$를 구하세요.",
    "초기조건을 만족하는 2계 방정식의 해 $y(x)$를 구하세요.",
  ],
  "second-order-ode": [
    "특성방정식을 이용해 일반해 $y(x)$를 구하세요.",
    "중근을 이용해 일반해 $y(x)$를 구하세요.",
    "복소근을 이용해 일반해 $y(x)$를 구하세요.",
    "초기조건을 만족하는 해 $y(x)$를 구하세요.",
    "미정계수법으로 특수해 $y_p$를 구하세요.",
    "공진을 고려한 특수해 $y_p$를 구하세요.",
    "코시–오일러 방정식의 일반해 $y(x)$를 구하세요.",
    "두 해의 론스키안 $W(y_1,y_2)$를 구하세요.",
  ],
  "laplace-transforms": [
    "라플라스 변환을 구하세요.",
    "지수함수의 라플라스 변환을 구하세요.",
    "삼각함수의 라플라스 변환을 구하세요.",
    "$\\mathcal L\\{y'\\}$를 $Y(s)$와 $y(0)$으로 나타내세요.",
    "역라플라스 변환을 구하세요.",
    "이동정리를 이용해 라플라스 변환을 구하세요.",
    "계단함수의 라플라스 변환을 구하세요.",
    "라플라스 변환한 해 $Y(s)$를 구하세요.",
  ],
  "fourier-series": [
    "상수항 계수 $a_0$를 구하세요.",
    "상수항 계수 $a_0$를 구하세요.",
    "사인계수 $b_1$을 구하세요.",
    "사인계수 $b_2$를 구하세요.",
    "기본 각주파수 $\\omega_0$를 구하세요.",
    "함수 $f(x)$의 푸리에 급수를 구하세요.",
    "삼각함수의 직교적분값을 구하세요.",
    "파르세발 등식으로 급수의 합을 구하세요.",
  ],
  "linear-ode-systems": [
    "연립식을 행렬형 $X'=AX$로 나타내세요.",
    "연립미분방정식의 일반해 $X(t)$를 구하세요.",
    "주어진 고유벡터에 대응하는 해 $X(t)$를 구하세요.",
    "행렬지수 $e^{At}$를 구하세요.",
    "원점 평형해의 안정성을 판정하세요.",
    "원점 평형점의 종류를 판정하세요.",
    "2계 방정식을 1계 연립식 $X'=AX$로 나타내세요.",
    "초기조건을 만족하는 해벡터 $X(t)$를 구하세요.",
  ],
  "numerical-methods": [
    "이분법의 중점 $c$를 구하세요.",
    "뉴턴 방법으로 두 번 반복한 $x_2$를 구하세요.",
    "할선법으로 한 번 반복한 $x_2$를 구하세요.",
    "오일러 방법으로 $y_1$을 구하세요.",
    "사다리꼴 공식의 근삿값 $T_1$을 구하세요.",
    "심프슨 공식의 근삿값 $S$를 구하세요.",
    "중심차분으로 $f'(2)$의 근삿값을 구하세요.",
    "리처드슨 외삽값을 구하세요.",
  ],
};

export function isStemFoundationKind(value: string | null): value is StemFoundationKind {
  return STEM_FOUNDATION_KINDS.includes(value as StemFoundationKind);
}

function make(
  kind: StemFoundationKind,
  index: number,
  label: string,
  latex: string,
  answer: string,
  distractors: [string, string, string],
  prompt: string,
): GeometryChoiceItem {
  const id = `${kind}-${index + 1}`;
  return {
    id,
    label,
    prompt,
    latex,
    difficulty: index < 2 ? "basic" : index < 5 ? "application" : "advanced",
    correctLatex: answer,
    choices: [answer, ...distractors].map((value, choiceIndex) => ({
      id: `${id}-${choiceIndex}`,
      latex: value,
      correct: choiceIndex === 0,
    })),
  };
}

function problems(
  kind: StemFoundationKind,
  rows: Array<[string, string, string, [string, string, string], string?]>,
) {
  return rows.map(([label, latex, answer, distractors, prompt], index) => (
    make(
      kind,
      index,
      label,
      latex,
      answer,
      distractors,
      prompt ?? STEM_FOUNDATION_PROMPTS[kind][index],
    )
  ));
}

export function createStemFoundationProblems(
  kind: StemFoundationKind,
  seed: number,
): GeometryChoiceItem[] {
  const seededInteger = (salt: number, minimum: number, maximum: number) => {
    let value = Math.imul((seed >>> 0) ^ Math.imul(salt, 0x9e3779b1), 0x85ebca6b);
    value ^= value >>> 13;
    value = Math.imul(value, 0xc2b2ae35);
    value ^= value >>> 16;
    return minimum + ((value >>> 0) % (maximum - minimum + 1));
  };
  const k = seededInteger(1, 2, 5);

  if (kind === "complex-polar") {
    const rectangularScale = seededInteger(2, 1, 4);
    const productLeft = seededInteger(3, 2, 5);
    const productRight = seededInteger(4, 2, 5);
    const quotient = seededInteger(5, 2, 5);
    const powerRadius = seededInteger(6, 1, 3);
    const cubeRoot = seededInteger(7, 2, 5);
    const oddPower = 2 * seededInteger(8, 1, 4) - 1;
    const rootOrder = seededInteger(9, 3, 6);
    return problems(kind, [
      ["절댓값과 편각", `z=${k}+${k}i`, `|z|=${k}\\sqrt2,\\ \\arg z=\\frac\\pi4`, [`|z|=${2 * k},\\ \\arg z=\\frac\\pi4`, `|z|=${k}\\sqrt2,\\ \\arg z=\\frac{3\\pi}4`, `|z|=${k},\\ \\arg z=\\frac\\pi2`]],
      ["극형식에서 직교형식", `${2 * rectangularScale}\\left(\\cos\\frac\\pi3+i\\sin\\frac\\pi3\\right)`, `${rectangularScale}+${rectangularScale}\\sqrt3i`, [`${rectangularScale}\\sqrt3+${rectangularScale}i`, `${rectangularScale}-${rectangularScale}\\sqrt3i`, `${2 * rectangularScale}+${rectangularScale}\\sqrt3i`]],
      ["극형식의 곱", `${productLeft}\\operatorname{cis}\\frac\\pi6\\cdot${productRight}\\operatorname{cis}\\frac\\pi3`, `${productLeft * productRight}\\operatorname{cis}\\frac\\pi2`, [`${productLeft * productRight + 1}\\operatorname{cis}\\frac\\pi2`, `${productLeft * productRight}\\operatorname{cis}\\frac\\pi6`, `${productLeft * productRight}\\operatorname{cis}\\frac\\pi{18}`]],
      ["극형식의 나눗셈", `\\frac{${2 * quotient}\\operatorname{cis}(5\\pi/6)}{2\\operatorname{cis}(\\pi/3)}`, `${quotient}\\operatorname{cis}\\frac\\pi2`, [`${quotient}\\operatorname{cis}\\frac{7\\pi}6`, `${quotient + 1}\\operatorname{cis}\\frac\\pi2`, `${quotient}\\operatorname{cis}\\frac{5\\pi}{18}`]],
      ["드므아브르 정리", `\\left(${powerRadius}\\operatorname{cis}\\frac\\pi4\\right)^4`, `${-(powerRadius ** 4)}`, [`${powerRadius ** 4}`, `${-(powerRadius ** 4 + 1)}`, `${powerRadius ** 4}i`]],
      ["복소수의 세제곱근", `z^3=${cubeRoot ** 3}`, `z=${cubeRoot}\\operatorname{cis}\\frac{2k\\pi}{3}\\ (k=0,1,2)`, [`z=${cubeRoot ** 3}\\operatorname{cis}\\frac{2k\\pi}{3}`, `z=${cubeRoot}\\operatorname{cis}\\frac{k\\pi}{3}`, `z=${cubeRoot}\\operatorname{cis}\\frac{2k\\pi}{3}\\ (k=0,1)`]],
      ["오일러 공식", `e^{${oddPower}i\\pi}+1`, `0`, [`1`, `-1`, `i`]],
      ["단위근의 합", `1+\\omega+\\cdots+\\omega^{${rootOrder - 1}}\\quad(\\omega^{${rootOrder}}=1,\\ \\omega\\ne1)`, `0`, [`1`, `-1`, `${rootOrder}`]],
    ]);
  }

  if (kind === "matrix-systems") {
    const r = seededInteger(2, 1, 4);
    const q = seededInteger(3, 1, 4);
    const d = seededInteger(4, 2, 6);
    const diagonalA = seededInteger(5, 2, 5);
    const diagonalB = seededInteger(6, 2, 5);
    const diagonalC = seededInteger(7, 2, 5);
    const upperA = seededInteger(8, 1, 3);
    const upperB = seededInteger(9, 1, 3);
    const solutionX = seededInteger(10, -2, 3);
    const solutionY = seededInteger(11, 1, 4);
    const solutionZ = seededInteger(12, -1, 3);
    const rhs1 = solutionX + solutionY + solutionZ;
    const rhs2 = 2 * solutionX - solutionY + solutionZ;
    const rhs3 = solutionX + 2 * solutionY - solutionZ;
    const rrefX = seededInteger(13, -2, 2);
    const rrefY = seededInteger(14, 1, 4);
    const rrefZ = seededInteger(15, -1, 3);
    const rrefB1 = rrefX + 2 * rrefY - rrefZ;
    const rrefB2 = 2 * rrefX + 5 * rrefY;
    const rrefB3 = -rrefX - rrefY + 2 * rrefZ;
    const criticalA = seededInteger(16, -2, 4);
    const parameterCoefficient = criticalA === 0
      ? "a"
      : criticalA > 0
        ? `a-${criticalA}`
        : `a+${-criticalA}`;
    const simultaneousU = seededInteger(17, 1, 4);
    const simultaneousV = seededInteger(18, 1, 4);
    const simultaneousW = seededInteger(19, -2, 3);
    return problems(kind, [
      ["전치행렬 포함 복합연산", `A=\\begin{pmatrix}1&2&-1\\\\0&${k}&3\\end{pmatrix},\\quad B=\\begin{pmatrix}1&0\\\\1&-1\\\\-1&2\\end{pmatrix},\\quad 2A^T-3B`, `\\begin{pmatrix}-1&0\\\\1&${2 * k + 3}\\\\1&0\\end{pmatrix}`, [`\\begin{pmatrix}1&0\\\\3&${2 * k + 1}\\\\-1&4\\end{pmatrix}`, `\\begin{pmatrix}-2&0\\\\-1&${k + 3}\\\\2&-3\\end{pmatrix}`, `\\begin{pmatrix}-1&0\\\\1&${2 * k - 3}\\\\1&0\\end{pmatrix}`]],
      ["교환자 계산", `A=\\begin{pmatrix}1&${r}\\\\0&1\\end{pmatrix},\\quad B=\\begin{pmatrix}${d}&0\\\\${q}&${d}\\end{pmatrix},\\quad AB-BA`, `\\begin{pmatrix}${r * q}&0\\\\0&${-r * q}\\end{pmatrix}`, [`\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}`, `\\begin{pmatrix}${-r * q}&0\\\\0&${r * q}\\end{pmatrix}`, `\\begin{pmatrix}${d + r}&${r * d}\\\\${q}&${d}\\end{pmatrix}`]],
      ["3×3 행렬식", `\\det\\begin{pmatrix}${diagonalA}&1&0\\\\0&${diagonalB}&1\\\\0&0&${diagonalC}\\end{pmatrix}`, `${diagonalA * diagonalB * diagonalC}`, [`${diagonalA * diagonalB * diagonalC + 1}`, `${diagonalA * diagonalB * diagonalC - 1}`, `${-diagonalA * diagonalB * diagonalC}`]],
      ["3×3 역행렬", `A=\\begin{pmatrix}1&${upperA}&0\\\\0&1&${upperB}\\\\0&0&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&${-upperA}&${upperA * upperB}\\\\0&1&${-upperB}\\\\0&0&1\\end{pmatrix}`, [`A^{-1}=\\begin{pmatrix}1&${upperA}&${upperA * upperB}\\\\0&1&${upperB}\\\\0&0&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&${-upperA}&0\\\\0&1&${-upperB}\\\\0&0&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&0&${upperA * upperB}\\\\0&1&0\\\\0&0&1\\end{pmatrix}`]],
      ["3원 연립방정식", `\\begin{cases}x+y+z=${rhs1}\\\\2x-y+z=${rhs2}\\\\x+2y-z=${rhs3}\\end{cases}`, `(x,y,z)=(${solutionX},${solutionY},${solutionZ})`, [`(x,y,z)=(${solutionX + 1},${solutionY},${solutionZ})`, `(x,y,z)=(${solutionX},${solutionY + 1},${solutionZ})`, `(x,y,z)=(${solutionX},${solutionY},${solutionZ + 1})`]],
      ["확대행렬의 기약행사다리꼴", `\\operatorname{rref}\\left[\\begin{array}{ccc|c}1&2&-1&${rrefB1}\\\\2&5&0&${rrefB2}\\\\-1&-1&2&${rrefB3}\\end{array}\\right]`, `\\left[\\begin{array}{ccc|c}1&0&0&${rrefX}\\\\0&1&0&${rrefY}\\\\0&0&1&${rrefZ}\\end{array}\\right]`, [`\\left[\\begin{array}{ccc|c}1&0&0&${rrefX + 1}\\\\0&1&0&${rrefY}\\\\0&0&1&${rrefZ}\\end{array}\\right]`, `\\left[\\begin{array}{ccc|c}1&0&0&${rrefX}\\\\0&1&0&${rrefY + 1}\\\\0&0&1&${rrefZ}\\end{array}\\right]`, `\\left[\\begin{array}{ccc|c}1&0&0&${rrefX}\\\\0&1&0&${rrefY}\\\\0&0&1&${rrefZ + 1}\\end{array}\\right]`]],
      ["매개변수에 따른 해의 개수", `\\begin{cases}x+y+z=2\\\\2x-y+z=1\\\\3x+(${parameterCoefficient})y+2z=3\\end{cases}`, `a=${criticalA}:\\text{ 무수히 많음},\\quad a\\ne${criticalA}:\\text{ 유일해}`, [`a=${criticalA}:\\text{ 해 없음},\\quad a\\ne${criticalA}:\\text{ 유일해}`, `a=${criticalA}:\\text{ 유일해},\\quad a\\ne${criticalA}:\\text{ 무수히 많음}`, `a=${criticalA + 1}:\\text{ 무수히 많음},\\quad a\\ne${criticalA + 1}:\\text{ 유일해}`]],
      ["여러 우변의 동시 풀이", `\\begin{pmatrix}1&1&0\\\\0&1&1\\\\1&0&1\\end{pmatrix}X=\\begin{pmatrix}${simultaneousU}&${simultaneousV}\\\\${simultaneousW}&${simultaneousV - 1}\\\\${simultaneousU + simultaneousW}&-1\\end{pmatrix}`, `X=\\begin{pmatrix}${simultaneousU}&0\\\\0&${simultaneousV}\\\\${simultaneousW}&-1\\end{pmatrix}`, [`X=\\begin{pmatrix}0&${simultaneousU}\\\\${simultaneousV}&0\\\\${simultaneousW}&-1\\end{pmatrix}`, `X=\\begin{pmatrix}${simultaneousU}&${simultaneousV}\\\\${simultaneousW}&${simultaneousV - 1}\\\\${simultaneousU + simultaneousW}&-1\\end{pmatrix}`, `X=\\begin{pmatrix}${simultaneousU}&0\\\\0&${-simultaneousV}\\\\${simultaneousW}&1\\end{pmatrix}`]],
    ]);
  }

  if (kind === "determinants-inverses") {
    return problems(kind, [
      ["2×2 행렬식", `\\det\\begin{pmatrix}${k}&1\\\\2&3\\end{pmatrix}`, `${3 * k - 2}`, [`${3 * k + 2}`, `${2 * k - 3}`, `${3 * k - 1}`]],
      ["삼각행렬의 행렬식", `\\det\\begin{pmatrix}2&1&0\\\\0&-3&2\\\\0&0&4\\end{pmatrix}`, `-24`, [`24`, `-12`, `9`]],
      ["여인수 전개", `\\det\\begin{pmatrix}1&2&0\\\\0&3&1\\\\2&0&1\\end{pmatrix}`, `7`, [`5`, `9`, `-7`]],
      ["특이행렬의 조건", `A=\\begin{pmatrix}a&2\\\\3&6\\end{pmatrix},\\quad A^{-1}\\text{가 없을 때}`, `a=1`, [`a=-1`, `a=2`, `a=3`]],
      ["2×2 역행렬", `A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&-1\\\\-1&2\\end{pmatrix}`, [`A^{-1}=\\begin{pmatrix}2&-1\\\\-1&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}`]],
      ["곱의 행렬식", `\\det A=2,\\quad\\det B=-3,\\quad\\det(AB)`, `-6`, [`-1`, `5`, `6`]],
      ["LU 분해", `A=\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}=LU`, `L=\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix},\\ U=\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}`, [`L=\\begin{pmatrix}1&0\\\\4&1\\end{pmatrix},\\ U=\\begin{pmatrix}2&1\\\\0&-1\\end{pmatrix}`, `L=\\begin{pmatrix}2&0\\\\4&1\\end{pmatrix},\\ U=\\begin{pmatrix}1&1\\\\0&3\\end{pmatrix}`, `L=I,\\ U=A`]],
      ["3×3 역행렬", `A=\\begin{pmatrix}1&1&0\\\\0&1&1\\\\0&0&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&-1&1\\\\0&1&-1\\\\0&0&1\\end{pmatrix}`, [`A^{-1}=\\begin{pmatrix}1&1&1\\\\0&1&1\\\\0&0&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&-1&0\\\\0&1&-1\\\\0&0&1\\end{pmatrix}`, `A^{-1}=\\begin{pmatrix}1&0&1\\\\0&1&0\\\\0&0&1\\end{pmatrix}`]],
    ]);
  }

  if (kind === "vector-spaces-rank") {
    const spanA = seededInteger(2, 1, 4);
    const spanB = seededInteger(3, 1, 4);
    const independentSlope = seededInteger(4, 2, 5);
    const planeA = seededInteger(5, 1, 4);
    const planeB = seededInteger(6, 1, 4);
    const nullCoefficient = seededInteger(7, 2, 5);
    const columnCoefficient = seededInteger(8, 2, 5);
    const eigenA = seededInteger(9, 2, 5);
    const eigenB = eigenA + seededInteger(10, 1, 3);
    return problems(kind, [
      ["선형결합", `${k}\\begin{pmatrix}1\\\\0\\\\1\\end{pmatrix}-\\begin{pmatrix}0\\\\1\\\\1\\end{pmatrix}`, `\\begin{pmatrix}${k}\\\\-1\\\\${k - 1}\\end{pmatrix}`, [`\\begin{pmatrix}${k}\\\\1\\\\${k - 1}\\end{pmatrix}`, `\\begin{pmatrix}${k - 1}\\\\-1\\\\${k}\\end{pmatrix}`, `\\begin{pmatrix}${k}\\\\-1\\\\${k + 1}\\end{pmatrix}`]],
      ["생성공간 판정", `\\begin{pmatrix}${spanA + spanB}\\\\${spanA + 2 * spanB}\\end{pmatrix}=a\\begin{pmatrix}1\\\\1\\end{pmatrix}+b\\begin{pmatrix}1\\\\2\\end{pmatrix}`, `(a,b)=(${spanA},${spanB})`, [`(a,b)=(${spanA + 1},${spanB})`, `(a,b)=(${spanA},${spanB + 1})`, `(a,b)=(${spanA + 1},${spanB + 1})`]],
      ["일차독립 판정", `v_1=(1,0),\\ v_2=(${independentSlope},1)`, `\\text{일차독립}`, [`\\text{일차종속}`, `v_2=${independentSlope}v_1`, `\\dim\\operatorname{span}=1`]],
      ["기저와 차원", `W=\\{(x,y,z):${planeA}x+${planeB}y+z=0\\}`, `\\dim W=2`, [`\\dim W=1`, `\\dim W=3`, `\\dim W=0`]],
      ["영공간", `A=\\begin{pmatrix}1&${nullCoefficient}\\\\2&${2 * nullCoefficient}\\end{pmatrix},\\quad Ax=0`, `N(A)=\\operatorname{span}\\left\\{\\begin{pmatrix}${-nullCoefficient}\\\\1\\end{pmatrix}\\right\\}`, [`N(A)=\\operatorname{span}\\left\\{\\begin{pmatrix}${nullCoefficient}\\\\1\\end{pmatrix}\\right\\}`, `N(A)=\\{0\\}`, `N(A)=\\mathbb R^2`]],
      ["열공간의 기저", `A=\\begin{pmatrix}1&${columnCoefficient}&0\\\\0&0&1\\end{pmatrix}`, `\\left\\{\\begin{pmatrix}1\\\\0\\end{pmatrix},\\begin{pmatrix}0\\\\1\\end{pmatrix}\\right\\}`, [`\\left\\{\\begin{pmatrix}1\\\\0\\end{pmatrix}\\right\\}`, `\\left\\{\\begin{pmatrix}${columnCoefficient}\\\\0\\end{pmatrix}\\right\\}`, `\\left\\{\\begin{pmatrix}1\\\\1\\end{pmatrix}\\right\\}`]],
      ["고유값 입문", `A=\\begin{pmatrix}${eigenB}&1\\\\0&${eigenA}\\end{pmatrix}`, `\\lambda=${eigenB},${eigenA}`, [`\\lambda=${eigenB},${eigenA - 1}`, `\\lambda=${eigenB - 1},${eigenA}`, `\\lambda=${eigenA + eigenB},0`]],
      ["고유벡터 입문", `A=\\begin{pmatrix}${eigenA}&0\\\\0&${eigenB}\\end{pmatrix},\\quad\\lambda=${eigenA}`, `\\operatorname{span}\\{(1,0)\\}`, [`\\operatorname{span}\\{(0,1)\\}`, `\\operatorname{span}\\{(1,1)\\}`, `\\mathbb R^2`]],
    ]);
  }

  if (kind === "orthogonality-least-squares") {
    return problems(kind, [
      ["내적과 직교", `(1,${k},-1)\\cdot(${k},-1,0)`, `0`, [`${k}`, `${-k}`, `${2 * k}`]],
      ["벡터 정사영", `\\operatorname{proj}_{(1,1)}(3,1)`, `(2,2)`, [`(1,1)`, `(3,1)`, `(2,-2)`]],
      ["직선까지의 거리", `v=(3,1),\\quad L=\\operatorname{span}\\{(1,1)\\}`, `\\operatorname{dist}(v,L)=\\sqrt2`, [`2`, `\\frac1{\\sqrt2}`, `2\\sqrt2`]],
      ["그람–슈미트", `v_1=(1,1),\\quad v_2=(1,0)`, `u_2=\\left(\\frac12,-\\frac12\\right)`, [`u_2=(1,-1)`, `u_2=\\left(\\frac12,\\frac12\\right)`, `u_2=(0,1)`]],
      ["정규직교기저", `u=(1,1),\\quad e=\\frac1{\\|u\\|}u`, `e=\\left(\\frac1{\\sqrt2},\\frac1{\\sqrt2}\\right)`, [`e=\\left(\\frac12,\\frac12\\right)`, `e=(1,1)`, `e=\\left(\\frac1{\\sqrt2},-\\frac1{\\sqrt2}\\right)`]],
      ["최소제곱 직선", `(0,1),(1,2),(2,2)\\text{에 }y=a+bx`, `a=\\frac76,\\quad b=\\frac12`, [`a=1,\\quad b=1`, `a=\\frac12,\\quad b=\\frac76`, `a=\\frac43,\\quad b=\\frac13`]],
      ["정규방정식 계산", `A=\\begin{pmatrix}1&0\\\\1&1\\\\1&2\\end{pmatrix},\\quad b=\\begin{pmatrix}1\\\\2\\\\2\\end{pmatrix}`, `A^TA=\\begin{pmatrix}3&3\\\\3&5\\end{pmatrix},\\quad A^Tb=\\begin{pmatrix}5\\\\6\\end{pmatrix}`, [`A^TA=\\begin{pmatrix}3&3\\\\3&4\\end{pmatrix},\\quad A^Tb=\\begin{pmatrix}5\\\\5\\end{pmatrix}`, `A^TA=\\begin{pmatrix}1&3\\\\3&5\\end{pmatrix},\\quad A^Tb=\\begin{pmatrix}6\\\\5\\end{pmatrix}`, `A^TA=\\begin{pmatrix}3&5\\\\3&3\\end{pmatrix},\\quad A^Tb=\\begin{pmatrix}5\\\\6\\end{pmatrix}`]],
      ["직교행렬의 역행렬", `Q=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}`, `Q^{-1}=\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}`, [`Q^{-1}=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}`, `Q^{-1}=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}`, `Q^{-1}=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}`]],
    ]);
  }

  if (kind === "eigen-diagonalization") {
    return problems(kind, [
      ["특성다항식", `A=\\begin{pmatrix}${k}&1\\\\0&${k + 1}\\end{pmatrix}`, `p(\\lambda)=(\\lambda-${k})(\\lambda-${k + 1})`, [`p(\\lambda)=(\\lambda+${k})(\\lambda+${k + 1})`, `p(\\lambda)=\\lambda^2-${2 * k}\\lambda+${k * (k + 1)}`, `p(\\lambda)=\\lambda^2-\\lambda+${k * (k + 1)}`]],
      ["고유값", `A=\\begin{pmatrix}4&1\\\\0&2\\end{pmatrix}`, `\\lambda=4,2`, [`\\lambda=4,1`, `\\lambda=3,2`, `\\lambda=6,0`]],
      ["고유벡터", `A=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix},\\quad\\lambda=2`, `\\operatorname{span}\\{(1,0)\\}`, [`\\operatorname{span}\\{(0,1)\\}`, `\\operatorname{span}\\{(1,1)\\}`, `\\mathbb R^2`]],
      ["대각화로 거듭제곱", `A=\\begin{pmatrix}2&1\\\\0&3\\end{pmatrix}=PDP^{-1}`, `A^2=\\begin{pmatrix}4&5\\\\0&9\\end{pmatrix}`, [`A^2=\\begin{pmatrix}4&1\\\\0&9\\end{pmatrix}`, `A^2=\\begin{pmatrix}4&6\\\\0&9\\end{pmatrix}`, `A^2=\\begin{pmatrix}2&5\\\\0&3\\end{pmatrix}`]],
      ["행렬의 거듭제곱", `A=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}`, `A^4=\\begin{pmatrix}16&0\\\\0&81\\end{pmatrix}`, [`A^4=\\begin{pmatrix}8&0\\\\0&12\\end{pmatrix}`, `A^4=\\begin{pmatrix}16&0\\\\0&27\\end{pmatrix}`, `A^4=\\begin{pmatrix}6&0\\\\0&6\\end{pmatrix}`]],
      ["케일리–해밀턴으로 차수 낮추기", `A^2-5A+6I=O`, `A^3=19A-30I`, [`A^3=25A-30I`, `A^3=19A+30I`, `A^3=5A-6I`]],
      ["행렬지수", `A=\\begin{pmatrix}2&0\\\\0&-1\\end{pmatrix}`, `e^{At}=\\begin{pmatrix}e^{2t}&0\\\\0&e^{-t}\\end{pmatrix}`, [`e^{At}=\\begin{pmatrix}2e^t&0\\\\0&-e^t\\end{pmatrix}`, `e^{At}=\\begin{pmatrix}e^t&0\\\\0&e^{-t}\\end{pmatrix}`, `e^{At}=\\begin{pmatrix}e^{2t}&0\\\\0&-e^t\\end{pmatrix}`]],
      ["대칭행렬의 고유값", `A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}`, `\\lambda=3,1`, [`\\lambda=2,2`, `\\lambda=3,-1`, `\\lambda=4,0`]],
    ]);
  }

  if (kind === "vector-functions") {
    return problems(kind, [
      ["벡터함수의 미분", `r(t)=(t^{${k}},e^t,\\sin t)`, `r'(t)=(${k}t^{${k - 1}},e^t,\\cos t)`, [`r'(t)=(t^{${k - 1}},e^t,-\\cos t)`, `r'(t)=(${k}t^{${k}},te^{t-1},\\cos t)`, `r'(t)=(${k},e^t,\\sin t)`]],
      ["속도와 가속도", `r(t)=(t^2,3t)`, `v=(2t,3),\\quad a=(2,0)`, [`v=(t,3),\\quad a=(1,0)`, `v=(2t,3t),\\quad a=(2,3)`, `v=(2,3),\\quad a=(0,0)`]],
      ["속력", `v(t)=(3,4)`, `\\|v\\|=5`, [`\\|v\\|=7`, `\\|v\\|=\\sqrt7`, `\\|v\\|=12`]],
      ["단위접선벡터", `r'(t)=(3,4)`, `T=\\left(\\frac35,\\frac45\\right)`, [`T=(3,4)`, `T=\\left(\\frac45,\\frac35\\right)`, `T=\\left(-\\frac35,\\frac45\\right)`]],
      ["매개곡선의 접선", `r(t)=(t,t^2),\\quad t=1`, `y-1=2(x-1)`, [`y-1=x-1`, `y-1=\\frac12(x-1)`, `y+1=2(x+1)`]],
      ["매개곡선의 길이", `r(t)=(3\\cos t,3\\sin t),\\quad0\\le t\\le\\frac\\pi2`, `L=\\frac{3\\pi}{2}`, [`L=\\frac\\pi2`, `L=3\\pi`, `L=6\\pi`]],
      ["곡률", `r(t)=(R\\cos t,R\\sin t)`, `\\kappa=\\frac1R`, [`\\kappa=R`, `\\kappa=\\frac1{R^2}`, `\\kappa=2\\pi R`]],
      ["위치벡터 복원", `v(t)=(2t,1),\\quad r(0)=(1,2)`, `r(t)=(t^2+1,t+2)`, [`r(t)=(2t+1,t+2)`, `r(t)=(t^2,t)`, `r(t)=(t^2+2,t+1)`]],
    ]);
  }

  if (kind === "partial-derivatives") {
    const xExponent = seededInteger(2, 2, 4);
    const yExponent = seededInteger(3, 2, 4);
    const chainExponent = seededInteger(4, 2, 4);
    const circleRadius = seededInteger(5, 3, 7);
    const differentialA = seededInteger(6, 1, 4);
    const differentialB = seededInteger(7, 1, 4);
    const pointX = seededInteger(8, 1, 3);
    const pointY = pointX + seededInteger(9, 1, 3);
    const pointZ = pointX ** 2 + pointY ** 2;
    const directionScale = seededInteger(10, 1, 4);
    return problems(kind, [
      ["1계 편미분", `f(x,y)=x^3+${k}xy^2`, `f_x=3x^2+${k}y^2`, [`f_x=3x^2+${2 * k}xy`, `f_x=x^2+${k}y^2`, `f_x=3x^2`]],
      ["혼합편미분", `f(x,y)=x^{${xExponent}}y^{${yExponent}}`, `f_{xy}=${xExponent * yExponent}x^{${xExponent - 1}}y^{${yExponent - 1}}`, [`f_{xy}=${xExponent}x^{${xExponent - 1}}y^{${yExponent}}`, `f_{xy}=${yExponent}x^{${xExponent}}y^{${yExponent - 1}}`, `f_{xy}=${xExponent * yExponent}x^{${xExponent}}y^{${yExponent}}`]],
      ["다변수 연쇄법칙", `z=x^2+y^2,\\ x=t,\\ y=t^{${chainExponent}}`, `\\frac{dz}{dt}=2t+${2 * chainExponent}t^{${2 * chainExponent - 1}}`, [`\\frac{dz}{dt}=2t+2t^{${chainExponent}}`, `\\frac{dz}{dt}=2x+2y`, `\\frac{dz}{dt}=2t+${2 * chainExponent}t^{${chainExponent}}`]],
      ["음함수 미분", `x^2+y^2=${circleRadius ** 2}`, `\\frac{dy}{dx}=-\\frac{x}{y}`, [`\\frac{dy}{dx}=\\frac{x}{y}`, `\\frac{dy}{dx}=-\\frac{y}{x}`, `\\frac{dy}{dx}=2x+2y`]],
      ["전미분", `z=${differentialA}x^2+xy+${differentialB}y^2`, `dz=(${2 * differentialA}x+y)dx+(x+${2 * differentialB}y)dy`, [`dz=${2 * differentialA}x\\,dx+${2 * differentialB}y\\,dy`, `dz=(x+y)dx+(x+y)dy`, `dz=(${2 * differentialA}x+y)dy+(x+${2 * differentialB}y)dx`]],
      ["접평면", `z=x^2+y^2,\\quad(${pointX},${pointY},${pointZ})`, `z-${pointZ}=${2 * pointX}(x-${pointX})+${2 * pointY}(y-${pointY})`, [`z-${pointZ}=${pointX}(x-${pointX})+${pointY}(y-${pointY})`, `z=${2 * pointX}x+${2 * pointY}y`, `z-${pointZ}=${2 * pointY}(x-${pointX})+${2 * pointX}(y-${pointY})`]],
      ["그래디언트 입문", `f=x^2+xy+y^2,\\quad(${pointX},${pointY})`, `\\nabla f(${pointX},${pointY})=(${2 * pointX + pointY},${pointX + 2 * pointY})`, [`\\nabla f=(${pointX + pointY},${pointX + pointY})`, `\\nabla f(${pointX},${pointY})=(${pointX + 2 * pointY},${2 * pointX + pointY})`, `\\nabla f(${pointX},${pointY})=(${2 * pointX},${2 * pointY})`]],
      ["방향미분 입문", `\\nabla f(1,1)=(${3 * directionScale},${4 * directionScale}),\\quad u=\\left(\\frac35,\\frac45\\right)`, `D_uf=${5 * directionScale}`, [`D_uf=${7 * directionScale}`, `D_uf=${directionScale}`, `D_uf=${4 * directionScale}`]],
    ]);
  }

  if (kind === "gradient-optimization") {
    return problems(kind, [
      ["그래디언트", `f=${k}x^2+xy+y^2`, `\\nabla f=(${2 * k}x+y,x+2y)`, [`\\nabla f=(${k}x+y,x+y)`, `\\nabla f=(${2 * k}x+x,y+2y)`, `\\nabla f=(${k}x,2y)`]],
      ["방향미분", `\\nabla f(1,1)=(3,4),\\quad u=\\left(\\frac35,\\frac45\\right)`, `D_uf=5`, [`D_uf=7`, `D_uf=\\frac{25}{7}`, `D_uf=1`]],
      ["최대증가 방향", `\\nabla f(P)=(2,-1)`, `u=\\frac1{\\sqrt5}(2,-1)`, [`u=(2,-1)`, `u=\\frac1{\\sqrt5}(-1,2)`, `u=\\frac1{\\sqrt5}(-2,1)`]],
      ["임계점", `f=x^2+y^2-4x+6y`, `(x,y)=(2,-3)`, [`(x,y)=(-2,3)`, `(x,y)=(4,-6)`, `(x,y)=(0,0)`]],
      ["이차미분 판정", `D=f_{xx}f_{yy}-f_{xy}^2>0,\\quad f_{xx}>0`, `\\text{극소점}`, [`\\text{극대점}`, `\\text{안장점}`, `\\text{판정 불가}`]],
      ["라그랑주 승수", `f=x+y,\\quad x^2+y^2=2`, `\\max f=2,\\quad\\min f=-2`, [`\\max f=\\sqrt2,\\quad\\min f=-\\sqrt2`, `\\max f=4,\\quad\\min f=-4`, `\\max f=2,\\quad\\min f=0`]],
      ["제약조건 최적점", `xy\\text{의 최댓값},\\quad x+y=10,\\ x,y>0`, `(x,y)=(5,5)`, [`(x,y)=(10,0)`, `(x,y)=(4,6)`, `(x,y)=(2,8)`]],
      ["야코비 행렬", `F(x,y)=(x^2y,x+y^2)`, `J_F=\\begin{pmatrix}2xy&x^2\\\\1&2y\\end{pmatrix}`, [`J_F=\\begin{pmatrix}2x&y\\\\1&y^2\\end{pmatrix}`, `J_F=\\begin{pmatrix}x^2&2xy\\\\2y&1\\end{pmatrix}`, `J_F=\\begin{pmatrix}2xy&1\\\\x^2&2y\\end{pmatrix}`]],
    ]);
  }

  if (kind === "multiple-integrals") {
    const boundary = seededInteger(2, 2, 5);
    const rectangleA = seededInteger(3, 2, 5);
    const rectangleB = seededInteger(4, 2, 5);
    const diskRadius = seededInteger(5, 2, 4);
    const weightedDiskRadius = seededInteger(6, 2, 4);
    const triangleSide = seededInteger(7, 2, 5);
    const jacobianA = seededInteger(8, 2, 5);
    const jacobianB = seededInteger(9, 2, 5);
    const polarRadius = seededInteger(10, 1, 3);
    return problems(kind, [
      ["이중적분", `\\int_0^1\\int_0^{${k}}(x+y)\\,dy\\,dx`, `${k * (k + 1) / 2}`, [`${k * k}`, `${k}`, `${k * (k + 1)}`]],
      ["적분순서 교환", `0\\le x\\le${boundary},\\quad x\\le y\\le${boundary}`, `0\\le y\\le${boundary},\\quad0\\le x\\le y`, [`0\\le y\\le${boundary},\\quad y\\le x\\le${boundary}`, `0\\le y\\le x,\\quad0\\le x\\le${boundary}`, `0\\le x\\le y\\le${boundary + 1}`]],
      ["영역의 넓이", `\\iint_D1\\,dA,\\quad D=[0,${rectangleA}]\\times[0,${rectangleB}]`, `${rectangleA * rectangleB}`, [`${rectangleA * rectangleB + 1}`, `${rectangleA * rectangleB - 1}`, `${2 * rectangleA * rectangleB}`]],
      ["극좌표 이중적분", `\\int_0^{2\\pi}\\int_0^{${diskRadius}} r\\,dr\\,d\\theta`, `${diskRadius ** 2}\\pi`, [`${diskRadius}\\pi`, `${2 * diskRadius ** 2}\\pi`, `${diskRadius ** 2}`]],
      ["원판의 이중적분", `\\iint_{x^2+y^2\\le${weightedDiskRadius ** 2}}(x^2+y^2)\\,dA`, `${weightedDiskRadius ** 4 === 2 ? "\\pi" : `\\frac{${weightedDiskRadius ** 4}\\pi}{2}`}`, [`${weightedDiskRadius ** 2}\\pi`, `${weightedDiskRadius ** 4}\\pi`, `\\frac{${weightedDiskRadius ** 4}\\pi}{4}`]],
      ["삼각영역의 이중적분", `\\int_0^{${triangleSide}}\\int_0^{${triangleSide}-x}1\\,dy\\,dx`, `\\frac{${triangleSide ** 2}}2`, [`\\frac{${triangleSide ** 2 + 2}}2`, `\\frac{${triangleSide ** 2 - 2}}2`, `${triangleSide ** 2}`]],
      ["좌표변환의 야코비안", `x=${jacobianA}u,\\quad y=${jacobianB}v`, `\\left|\\frac{\\partial(x,y)}{\\partial(u,v)}\\right|=${jacobianA * jacobianB}`, [`${jacobianA * jacobianB + 1}`, `${jacobianA * jacobianB - 1}`, `${-jacobianA * jacobianB}`]],
      ["극좌표 함수 적분", `\\int_0^{\\pi/2}\\int_0^{${polarRadius}} r^3\\,dr\\,d\\theta`, `\\frac{${polarRadius ** 4}\\pi}{8}`, [`\\frac{${polarRadius ** 4}\\pi}{4}`, `\\frac{${polarRadius ** 4}\\pi}{2}`, `\\frac{${polarRadius ** 4}}8`]],
    ]);
  }

  if (kind === "vector-calculus") {
    return problems(kind, [
      ["발산", `F=(${k}x^2,xy,z^2)`, `\\nabla\\cdot F=${2 * k + 1}x+2z`, [`\\nabla\\cdot F=${2 * k}x+y+2z`, `\\nabla\\cdot F=(${2 * k}x,x,2z)`, `\\nabla\\cdot F=${2 * k}x+xy+2z`]],
      ["회전", `F=(-y,x,0)`, `\\nabla\\times F=(0,0,2)`, [`\\nabla\\times F=(0,0,0)`, `\\nabla\\times F=(0,0,-2)`, `\\nabla\\times F=(1,1,0)`]],
      ["보존장과 퍼텐셜", `F=(2x,2y)`, `\\phi=x^2+y^2+C`, [`\\phi=2x+2y+C`, `\\phi=x^2-y^2+C`, `\\phi=xy+C`]],
      ["선적분", `F=(2x,2y),\\quad C:(0,0)\\to(1,2)`, `\\int_CF\\cdot dr=5`, [`3`, `4`, `10`]],
      ["그린 정리 계산", `P=-y,\\ Q=x,\\quad C:x^2+y^2=1\\text{의 양의 방향}`, `\\oint_C P\\,dx+Q\\,dy=2\\pi`, [`\\pi`, `-2\\pi`, `4\\pi`]],
      ["스토크스 정리 계산", `F=\\left(-\\frac y2,\\frac x2,0\\right),\\quad S:x^2+y^2\\le1`, `\\oint_{\\partial S}F\\cdot dr=\\pi`, [`2\\pi`, `-\\pi`, `\\frac\\pi2`]],
      ["발산정리 계산", `F=(x,y,z),\\quad V:x^2+y^2+z^2\\le1`, `\\iint_{\\partial V}F\\cdot n\\,dS=4\\pi`, [`3\\pi`, `\\frac{4\\pi}{3}`, `12\\pi`]],
      ["구면의 플럭스", `F=(x,y,z),\\quad x^2+y^2+z^2=R^2`, `\\iint_SF\\cdot n\\,dS=4\\pi R^3`, [`4\\pi R^2`, `\\frac43\\pi R^3`, `3\\pi R^3`]],
    ]);
  }

  if (kind === "applied-integrals") {
    return problems(kind, [
      ["타원의 넓이", `\\frac{x^2}{${k * k}}+\\frac{y^2}{4}=1`, `${2 * k}\\pi`, [`${k}\\pi`, `${4 * k}\\pi`, `${k * k + 5}\\pi`]],
      ["포물선 사이의 넓이", `y=4-x^2,\\quad y=0`, `\\frac{32}{3}`, [`\\frac{16}{3}`, `8`, `\\frac{64}{3}`]],
      ["곡선의 길이", `y=3x,\\quad0\\le x\\le2`, `2\\sqrt{10}`, [`\\sqrt{10}`, `6`, `2\\sqrt3`]],
      ["매개곡선의 길이", `x=3\\cos t,\\ y=3\\sin t,\\quad0\\le t\\le\\frac\\pi2`, `\\frac{3\\pi}{2}`, [`\\frac\\pi2`, `3\\pi`, `6\\pi`]],
      ["원판법", `y=x,\\quad0\\le x\\le2\\text{를 }x\\text{축 회전}`, `V=\\frac{8\\pi}{3}`, [`V=4\\pi`, `V=\\frac{4\\pi}{3}`, `V=8\\pi`]],
      ["원통껍질법", `y=x,\\quad0\\le x\\le1\\text{을 }y\\text{축 회전}`, `V=\\frac{2\\pi}{3}`, [`V=\\pi`, `V=\\frac\\pi3`, `V=2\\pi`]],
      ["회전체의 겉넓이", `y=x,\\quad0\\le x\\le1\\text{을 }x\\text{축 회전}`, `S=\\sqrt2\\pi`, [`S=\\frac{\\sqrt2\\pi}{2}`, `S=2\\sqrt2\\pi`, `S=\\pi`]],
      ["쌍곡선 아래 넓이", `y=\\frac1x,\\quad1\\le x\\le e`, `1`, [`\\frac12`, `e-1`, `e`]],
    ]);
  }

  if (kind === "first-order-ode") {
    const decayRate = seededInteger(2, 1, 4);
    const initialValue = seededInteger(3, 2, 5);
    const linearP = seededInteger(4, 1, 3);
    const linearQ = seededInteger(5, 1, 3);
    const integratingPower = seededInteger(6, 1, 4);
    const exactA = 2 * seededInteger(7, 1, 3);
    const exactB = 2 * seededInteger(8, 1, 3);
    const bernoulliRate = seededInteger(9, 1, 4);
    const rootA = seededInteger(10, 1, 3);
    const rootB = rootA + seededInteger(11, 1, 3);
    const frequency = seededInteger(12, 1, 4);
    return problems(kind, [
      ["변수분리형", `y'=${k}y,\\quad y(0)=1`, `y=e^{${k}x}`, [`y=${k}e^x`, `y=e^x+${k}`, `y=e^{-${k}x}`]],
      ["성장·감쇠", `y'=-${decayRate}y,\\quad y(0)=${initialValue}`, `y=${initialValue}e^{-${decayRate}x}`, [`y=${initialValue}e^{${decayRate}x}`, `y=e^{-${decayRate * initialValue}x}`, `y=${initialValue}-${decayRate}x`]],
      ["1계 선형식", `y'+${linearP}y=e^{${linearQ}x}`, `y=\\frac1{${linearP + linearQ}}e^{${linearQ}x}+Ce^{-${linearP}x}`, [`y=e^{${linearQ}x}+Ce^{-${linearP}x}`, `y=\\frac1{${linearP + linearQ}}e^{${linearQ}x}+Ce^{${linearP}x}`, `y=e^{-${linearP}x}+Ce^{${linearQ}x}`]],
      ["적분인자", `y'+\\frac{${integratingPower}}x y=x^2`, `\\mu(x)=x^{${integratingPower}}`, [`\\mu=x^{${integratingPower + 1}}`, `\\mu=e^{${integratingPower}x}`, `\\mu=x^{-${integratingPower}}`]],
      ["완전미분방정식", `(${exactA}x+y)dx+(x+${exactB}y)dy=0`, `${exactA / 2}x^2+xy+${exactB / 2}y^2=C`, [`${exactA}x+y+x+${exactB}y=C`, `${exactA / 2}x^2-xy+${exactB / 2}y^2=C`, `xy=C`]],
      ["베르누이 방정식", `y'+${bernoulliRate}y=${bernoulliRate}y^2`, `y=\\frac1{1+Ce^{${bernoulliRate}x}}`, [`y=\\frac1{1+Ce^{-${bernoulliRate}x}}`, `y=1+Ce^{${bernoulliRate}x}`, `y=\\frac{e^{${bernoulliRate}x}}{1+C}`]],
      ["2계 상수계수 방정식", `y''-${rootA + rootB}y'+${rootA * rootB}y=0`, `y=C_1e^{${rootA}x}+C_2e^{${rootB}x}`, [`y=C_1e^{-${rootA}x}+C_2e^{-${rootB}x}`, `y=(C_1+C_2x)e^{${rootA}x}`, `y=C_1\\cos ${rootA}x+C_2\\sin ${rootB}x`]],
      ["2계 초기값 문제", `y''+${frequency ** 2}y=0,\\quad y(0)=0,\\ y'(0)=${frequency}`, `y=\\sin ${frequency}x`, [`y=\\cos ${frequency}x`, `y=e^{${frequency}x}`, `y=\\sin ${frequency + 1}x`]],
    ]);
  }

  if (kind === "second-order-ode") {
    return problems(kind, [
      ["서로 다른 실근", `y''-${2 * k + 1}y'+${k * (k + 1)}y=0`, `y=C_1e^{${k}x}+C_2e^{${k + 1}x}`, [`y=C_1e^{-${k}x}+C_2e^{-${k + 1}x}`, `y=(C_1+C_2x)e^{${k}x}`, `y=e^{${2 * k + 1}x}(C_1\\cos ${k}x+C_2\\sin ${k}x)`]],
      ["중근", `y''-4y'+4y=0`, `y=(C_1+C_2x)e^{2x}`, [`y=C_1e^{2x}+C_2e^{-2x}`, `y=(C_1+C_2x)e^{-2x}`, `y=C_1\\cos2x+C_2\\sin2x`]],
      ["복소근", `y''+4y=0`, `y=C_1\\cos2x+C_2\\sin2x`, [`y=C_1e^{2x}+C_2e^{-2x}`, `y=(C_1+C_2x)e^{2x}`, `y=C_1\\cos4x+C_2\\sin4x`]],
      ["초기값 문제", `y''-y=0,\\quad y(0)=2,\\ y'(0)=0`, `y=e^x+e^{-x}`, [`y=2e^x`, `y=e^x-e^{-x}`, `y=2\\cos x`]],
      ["미정계수법", `y''-y=e^{2x}`, `y_p=\\frac13e^{2x}`, [`y_p=e^{2x}`, `y_p=-\\frac13e^{2x}`, `y_p=xe^{2x}`]],
      ["공진", `y''+y=\\cos x`, `y_p=\\frac x2\\sin x`, [`y_p=\\cos x`, `y_p=\\frac12\\cos x`, `y_p=x\\cos x`]],
      ["코시–오일러", `x^2y''-3xy'+4y=0`, `y=C_1x^2+C_2x^2\\ln x`, [`y=C_1e^{2x}+C_2xe^{2x}`, `y=C_1x+C_2x^4`, `y=C_1\\cos2x+C_2\\sin2x`]],
      ["론스키안", `y_1=e^x,\\quad y_2=e^{-x}`, `W(y_1,y_2)=-2`, [`W=0`, `W=2`, `W=-2e^x`]],
    ]);
  }

  if (kind === "laplace-transforms") {
    return problems(kind, [
      ["기본 변환", `\\mathcal L\\{e^{${k}t}\\}`, `\\frac1{s-${k}}`, [`\\frac1{s+${k}}`, `\\frac{${k}}{s^2}`, `e^{${k}s}`]],
      ["지수함수", `\\mathcal L\\{e^{at}\\}`, `\\frac1{s-a}`, [`\\frac1{s+a}`, `\\frac a{s^2}`, `e^{as}`]],
      ["삼각함수", `\\mathcal L\\{\\sin bt\\}`, `\\frac b{s^2+b^2}`, [`\\frac s{s^2+b^2}`, `\\frac b{s^2-b^2}`, `\\frac1{s+b}`]],
      ["미분의 변환", `\\mathcal L\\{y'\\}`, `sY(s)-y(0)`, [`sY(s)+y(0)`, `s^2Y(s)-y(0)`, `Y'(s)`]],
      ["역변환", `\\mathcal L^{-1}\\left\\{\\frac1{s(s+1)}\\right\\}`, `1-e^{-t}`, [`1+e^{-t}`, `e^{-t}`, `t-e^{-t}`]],
      ["이동정리 계산", `\\mathcal L\\{e^{2t}\\sin3t\\}`, `\\frac3{(s-2)^2+9}`, [`\\frac3{(s+2)^2+9}`, `\\frac{s-2}{(s-2)^2+9}`, `\\frac3{s^2+13}`]],
      ["계단함수 계산", `\\mathcal L\\{u(t-2)(t-2)\\}`, `\\frac{e^{-2s}}{s^2}`, [`\\frac{e^{2s}}{s^2}`, `\\frac{e^{-2s}}s`, `\\frac1{(s-2)^2}`]],
      ["초기값 문제", `y'+y=1,\\quad y(0)=0`, `Y(s)=\\frac1{s(s+1)}`, [`Y=\\frac1{s+1}`, `Y=\\frac1{s^2+1}`, `Y=\\frac s{s+1}`]],
    ]);
  }

  if (kind === "fourier-series") {
    return problems(kind, [
      ["상수함수의 푸리에 계수", `f(x)=${k}\\quad(-\\pi<x<\\pi)`, `a_0=${2 * k}`, [`a_0=${k}`, `a_0=0`, `a_0=${k}\\pi`]],
      ["짝함수의 상수항", `f(x)=x^2\\quad(-\\pi<x<\\pi)`, `a_0=\\frac{2\\pi^2}{3}`, [`a_0=\\frac{\\pi^2}{3}`, `a_0=0`, `a_0=\\frac{2\\pi^3}{3}`]],
      ["홀함수의 사인계수", `f(x)=x\\quad(-\\pi<x<\\pi)`, `b_1=2`, [`b_1=0`, `b_1=-2`, `b_1=\\pi`]],
      ["사인계수 계산", `f(x)=\\sin2x\\quad(-\\pi<x<\\pi)`, `b_2=1`, [`b_2=0`, `b_2=2`, `b_2=\\frac12`]],
      ["주기함수의 기본 각주파수", `f(x+6)=f(x)`, `\\omega_0=\\frac\\pi3`, [`\\omega_0=\\frac{2\\pi}3`, `\\omega_0=3\\pi`, `\\omega_0=6\\pi`]],
      ["톱니파", `f(x)=x\\quad(-\\pi<x<\\pi)`, `f(x)=2\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}}n\\sin nx`, [`f=2\\sum\\frac1n\\cos nx`, `f=\\sum\\frac{(-1)^n}{n^2}\\sin nx`, `f=\\pi+2\\sum\\frac1n\\sin nx`]],
      ["직교성", `\\int_{-\\pi}^{\\pi}\\cos mx\\cos nx\\,dx\\quad(m\\ne n)`, `0`, [`\\pi`, `2\\pi`, `1`]],
      ["파르세발 등식의 활용", `x=2\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}}n\\sin nx`, `\\sum_{n=1}^{\\infty}\\frac1{n^2}=\\frac{\\pi^2}{6}`, [`\\frac{\\pi^2}{3}`, `\\frac{\\pi^2}{8}`, `\\frac\\pi2`]],
    ]);
  }

  if (kind === "linear-ode-systems") {
    return problems(kind, [
      ["행렬형 연립식", `x'=${k}x+y,\\quad y'=x+${k}y`, `X'=\\begin{pmatrix}${k}&1\\\\1&${k}\\end{pmatrix}X`, [`X'=\\begin{pmatrix}${k}&1\\\\${k}&1\\end{pmatrix}X`, `X'=\\begin{pmatrix}x&y\\\\x&y\\end{pmatrix}X`, `X'=\\begin{pmatrix}1&${k}\\\\${k}&1\\end{pmatrix}X`]],
      ["대각 시스템", `X'=\\begin{pmatrix}2&0\\\\0&-1\\end{pmatrix}X`, `X=\\begin{pmatrix}C_1e^{2t}\\\\C_2e^{-t}\\end{pmatrix}`, [`X=\\begin{pmatrix}2C_1e^t\\\\-C_2e^t\\end{pmatrix}`, `X=\\begin{pmatrix}C_1e^t\\\\C_2e^{-t}\\end{pmatrix}`, `X=\\begin{pmatrix}C_1e^{-2t}\\\\C_2e^t\\end{pmatrix}`]],
      ["고유값을 이용한 해", `A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix},\\quad v=\\begin{pmatrix}1\\\\1\\end{pmatrix}`, `X(t)=Ce^{3t}\\begin{pmatrix}1\\\\1\\end{pmatrix}`, [`X(t)=Ce^{2t}\\begin{pmatrix}1\\\\1\\end{pmatrix}`, `X(t)=Ce^{t}\\begin{pmatrix}1\\\\-1\\end{pmatrix}`, `X(t)=C\\begin{pmatrix}e^{2t}\\\\e^{2t}\\end{pmatrix}`]],
      ["행렬지수 계산", `A=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}`, `e^{At}=\\begin{pmatrix}\\cos t&-\\sin t\\\\\\sin t&\\cos t\\end{pmatrix}`, [`e^{At}=\\begin{pmatrix}\\cos t&\\sin t\\\\-\\sin t&\\cos t\\end{pmatrix}`, `e^{At}=\\begin{pmatrix}e^t&-e^t\\\\e^t&e^t\\end{pmatrix}`, `e^{At}=I+tA`]],
      ["안정성 판정", `A=\\begin{pmatrix}-1&0\\\\0&-2\\end{pmatrix}`, `\\text{점근 안정}`, [`\\text{불안정}`, `\\text{중심}`, `\\text{안장점}`]],
      ["안장점 판정", `A=\\begin{pmatrix}2&0\\\\0&-1\\end{pmatrix}`, `\\text{안장점}`, [`\\text{안정 결절점}`, `\\text{중심}`, `\\text{나선점}`]],
      ["2계식의 시스템화", `y''+3y'+2y=0,\\quad x_1=y,\\ x_2=y'`, `X'=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}X`, [`X'=\\begin{pmatrix}0&1\\\\2&3\\end{pmatrix}X`, `X'=\\begin{pmatrix}-2&-3\\\\0&1\\end{pmatrix}X`, `X'=\\begin{pmatrix}1&0\\\\-3&-2\\end{pmatrix}X`]],
      ["비제차 시스템", `X'=\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}X+\\begin{pmatrix}e^t\\\\0\\end{pmatrix},\\quad X(0)=0`, `X(t)=\\begin{pmatrix}te^t\\\\0\\end{pmatrix}`, [`X(t)=\\begin{pmatrix}e^t\\\\0\\end{pmatrix}`, `X(t)=\\begin{pmatrix}te^{-t}\\\\0\\end{pmatrix}`, `X(t)=\\begin{pmatrix}e^t-1\\\\0\\end{pmatrix}`]],
    ]);
  }

  return problems(kind, [
    ["이분법 1회 계산", `a=1,\\quad b=${2 * k + 1},\\quad c=\\frac{a+b}{2}`, `c=${k + 1}`, [`c=${k}`, `c=${2 * k}`, `c=${2 * k + 2}`]],
    ["뉴턴 방법 2회 계산", `f(x)=x^2-2,\\quad x_0=1`, `x_2=\\frac{17}{12}`, [`x_2=\\frac32`, `x_2=\\frac43`, `x_2=\\frac{12}{17}`]],
    ["할선법 1회 계산", `f(x)=x^2-2,\\quad x_0=1,\\ x_1=2`, `x_2=\\frac43`, [`x_2=\\frac32`, `x_2=\\frac54`, `x_2=\\frac23`]],
    ["오일러 방법 1회 계산", `y'=y,\\quad y(0)=1,\\quad h=0.1`, `y_1=1.1`, [`y_1=1.01`, `y_1=0.9`, `y_1=e^{0.1}`]],
    ["사다리꼴 공식 계산", `\\int_0^1x^2dx\\quad(n=1)`, `T_1=\\frac12`, [`T_1=\\frac13`, `T_1=1`, `T_1=\\frac14`]],
    ["심프슨 공식 계산", `\\int_0^2x^2dx`, `S=\\frac83`, [`S=2`, `S=4`, `S=\\frac43`]],
    ["중심차분 계산", `f(x)=x^2,\\quad x=2,\\quad h=0.1`, `f'(2)\\simeq4`, [`f'(2)\\simeq3.9`, `f'(2)\\simeq4.1`, `f'(2)\\simeq2`]],
    ["리처드슨 외삽", `D(h)=3.9,\\quad D(h/2)=3.975\\quad(O(h^2))`, `D\\simeq4`, [`D\\simeq3.95`, `D\\simeq3.975`, `D\\simeq4.05`]],
  ]);
}
