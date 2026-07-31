export type PermutationCombinationKind =
  | "sum-rule" | "product-rule"
  | "basic-permutation" | "adjacent-arrangement" | "circular-permutation" | "circular-adjacent"
  | "repeated-permutation" | "repeated-leading-zero" | "identical-permutation"
  | "basic-combination" | "mixed-committee" | "not-together-selection" | "required-selection"
  | "repeated-combination" | "nonnegative-solutions" | "positive-solutions";

export type PermutationCombinationProblem = {
  id: string;
  kind: PermutationCombinationKind;
  label: string;
  prompt: string;
  latex: string;
  answer: number;
};

const COMMON_COUNTING_KINDS: PermutationCombinationKind[] = [
  "sum-rule", "product-rule", "basic-permutation", "adjacent-arrangement",
  "basic-combination", "required-selection", "not-together-selection",
];
const PROBABILITY_COUNTING_KINDS: PermutationCombinationKind[] = [
  "circular-permutation", "circular-adjacent", "repeated-permutation", "repeated-leading-zero",
  "identical-permutation", "repeated-combination", "nonnegative-solutions", "positive-solutions",
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
function pick<T>(next: () => number, values: readonly T[]) {
  return values[integer(next, 0, values.length - 1)];
}
export function factorial(value: number) {
  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) result *= factor;
  return result;
}
export function choose(total: number, count: number) {
  if (count < 0 || count > total) return 0;
  return factorial(total) / (factorial(count) * factorial(total - count));
}

function buildProblem(kind: PermutationCombinationKind, next: () => number, id: string): PermutationCombinationProblem {
  if (kind === "sum-rule") {
    const first = integer(next, 4, 9);
    const second = integer(next, 3, 8);
    return {
      id, kind, label: "합의 법칙",
      prompt: pick(next, [
        `서로 겹치지 않는 A형 상품 ${first}개와 B형 상품 ${second}개 중 하나를 고르는 경우의 수를 구하세요.`,
        `버스 노선 ${first}개와 지하철 노선 ${second}개 중 한 가지 방법으로 이동할 때 경우의 수를 구하세요.`,
        `국어 선택지 ${first}개와 수학 선택지 ${second}개 중 한 과목의 선택지 하나만 고를 때 경우의 수를 구하세요.`,
      ]),
      latex: `${first}+${second}`,
      answer: first + second,
    };
  }
  if (kind === "product-rule") {
    const first = integer(next, 3, 7);
    const second = integer(next, 3, 6);
    return {
      id, kind, label: "곱의 법칙",
      prompt: pick(next, [
        `상의 ${first}벌과 하의 ${second}벌 중 하나씩 골라 입는 경우의 수를 구하세요.`,
        `출발지에서 중간 지점까지 ${first}개, 중간 지점에서 도착지까지 ${second}개의 길이 있을 때 경우의 수를 구하세요.`,
        `메인 메뉴 ${first}가지와 음료 ${second}가지 중 하나씩 고르는 경우의 수를 구하세요.`,
      ]),
      latex: `${first}\\times${second}`,
      answer: first * second,
    };
  }
  if (kind === "basic-permutation") {
    const total = integer(next, 6, 9);
    const roles = pick(next, [["회장", "부회장", "총무"], ["대표", "부대표", "서기"], ["금상", "은상", "동상"]] as const);
    return {
      id, kind, label: "서로 다른 자리",
      prompt: pick(next, [
        `${total}명 중 서로 다른 세 사람에게 ${roles.join(", ")} 역할을 하나씩 맡기는 경우의 수를 구하세요.`,
        `후보 ${total}명 중 ${roles.join(", ")}을 각각 한 명씩 정하는 경우의 수를 구하세요.`,
        `${total}명이 참가한 대회에서 ${roles.join(", ")} 수상자를 정하는 경우의 수를 구하세요.`,
      ]),
      latex: `{}_{{${total}}}P_3`, answer: total * (total - 1) * (total - 2),
    };
  }
  if (kind === "adjacent-arrangement") {
    const total = integer(next, 6, 9);
    const [a, b] = pick(next, [["민수", "지수"], ["서준", "하윤"], ["도윤", "서연"]] as const);
    return {
      id, kind, label: "이웃하는 순열",
      prompt: pick(next, [
        `${total}명이 한 줄로 설 때 ${a}와 ${b}가 서로 이웃하는 경우의 수를 구하세요.`,
        `학생 ${total}명이 일렬로 사진을 찍습니다. ${a}와 ${b}가 나란히 서는 경우의 수를 구하세요.`,
        `${total}명의 발표 순서를 정할 때 ${a}의 바로 앞이나 뒤에 ${b}가 오는 경우의 수를 구하세요.`,
      ]),
      latex: `n=${total},\\qquad \\text{두 사람을 한 묶음으로 생각}`, answer: 2 * factorial(total - 1),
    };
  }
  if (kind === "circular-permutation") {
    const total = integer(next, 5, 8);
    return {
      id, kind, label: "원순열",
      prompt: pick(next, [
        `${total}명이 원탁에 둘러앉는 방법의 수를 구하세요.`,
        `서로 다른 ${total}개의 장식을 원형 화환에 같은 간격으로 배치합니다. 회전하여 같은 배치는 하나로 볼 때 경우의 수를 구하세요.`,
        `${total}명이 둥근 탁자에 앉아 회의를 할 때 자리 배치의 수를 구하세요.`,
      ]),
      latex: `n=${total},\\qquad \\text{회전한 배치는 같음}`, answer: factorial(total - 1),
    };
  }
  if (kind === "circular-adjacent") {
    const total = integer(next, 6, 9);
    return {
      id, kind, label: "원순열에서 이웃하기",
      prompt: pick(next, [
        `${total}명이 원탁에 둘러앉을 때 두 특정 사람이 서로 이웃하는 경우의 수를 구하세요.`,
        `서로 다른 ${total}개의 장식을 원형으로 놓을 때 지정한 두 장식을 나란히 놓는 방법의 수를 구하세요.`,
        `${total}명이 둥근 탁자에 앉을 때 두 친구가 옆자리에 앉는 배치의 수를 구하세요.`,
      ]),
      latex: `2\\times(${total - 2})!`,
      answer: 2 * factorial(total - 2),
    };
  }
  if (kind === "repeated-permutation") {
    const choices = integer(next, 3, 6);
    const length = integer(next, 3, 5);
    return {
      id, kind, label: "중복순열",
      prompt: pick(next, [
        `${choices}개의 숫자를 중복해서 사용할 수 있을 때 ${length}자리 암호를 만드는 경우의 수를 구하세요.`,
        `${choices}가지 색 중에서 매번 하나를 골라 ${length}칸을 칠합니다. 같은 색을 여러 번 써도 될 때 경우의 수를 구하세요.`,
        `${choices}종류의 기호를 반복해서 사용하여 길이가 ${length}인 문자열을 만드는 경우의 수를 구하세요.`,
      ]),
      latex: `{}_{{${choices}}}\\Pi_{${length}}`, answer: choices ** length,
    };
  }
  if (kind === "repeated-leading-zero") {
    const choices = integer(next, 4, 7);
    const length = integer(next, 3, 5);
    return {
      id, kind, label: "첫 자리가 0이 아닌 중복순열",
      prompt: pick(next, [
        `숫자 0부터 ${choices - 1}까지를 중복 사용하여 ${length}자리 자연수를 만드는 경우의 수를 구하세요.`,
        `0을 포함한 ${choices}개의 숫자로 ${length}자리 번호를 만들되 첫 자리는 0이 아닐 때 경우의 수를 구하세요.`,
        `${choices}개의 숫자 중 0도 허용하여 ${length}자리 수를 만들 때 맨 앞에 0이 오지 않는 경우의 수를 구하세요.`,
      ]),
      latex: `(${choices}-1)\\times${choices}^{${length - 1}}`,
      answer: (choices - 1) * choices ** (length - 1),
    };
  }
  if (kind === "identical-permutation") {
    const a = integer(next, 2, 4);
    const b = integer(next, 2, 3);
    const c = integer(next, 1, 2);
    const total = a + b + c;
    return {
      id, kind, label: "같은 것이 있는 순열",
      prompt: pick(next, [
        `같은 빨간 공 ${a}개, 같은 파란 공 ${b}개, 같은 흰 공 ${c}개를 한 줄로 놓는 방법의 수를 구하세요.`,
        `문자 A ${a}개, B ${b}개, C ${c}개를 모두 사용하여 만들 수 있는 문자열의 개수를 구하세요.`,
        `같은 종류끼리는 구별하지 않는 세 종류의 카드 ${a}개, ${b}개, ${c}개를 일렬로 배열하는 방법의 수를 구하세요.`,
      ]),
      latex: `\\frac{${total}!}{${a}!\\,${b}!\\,${c}!}`, answer: factorial(total) / (factorial(a) * factorial(b) * factorial(c)),
    };
  }
  if (kind === "basic-combination") {
    const total = integer(next, 8, 12);
    const selected = integer(next, 3, 5);
    return {
      id, kind, label: "조합",
      prompt: pick(next, [
        `${total}명 중 순서를 따지지 않고 대표 ${selected}명을 뽑는 경우의 수를 구하세요.`,
        `서로 다른 ${total}권의 책 중 ${selected}권을 고르는 방법의 수를 구하세요.`,
        `후보 ${total}명 중 운영위원 ${selected}명을 선발하는 경우의 수를 구하세요.`,
      ]),
      latex: `{}_{{${total}}}C_{${selected}}`, answer: choose(total, selected),
    };
  }
  if (kind === "mixed-committee") {
    const boys = integer(next, 4, 6);
    const girls = integer(next, 3, 5);
    const selected = integer(next, 3, 4);
    return {
      id, kind, label: "적어도 한 명",
      prompt: pick(next, [
        `남학생 ${boys}명과 여학생 ${girls}명 중 ${selected}명을 뽑을 때 남녀가 모두 포함되는 경우의 수를 구하세요.`,
        `남자 후보 ${boys}명, 여자 후보 ${girls}명 중 대표 ${selected}명을 정합니다. 한 성별로만 뽑지 않는 경우의 수를 구하세요.`,
        `남학생 ${boys}명과 여학생 ${girls}명 중 준비위원 ${selected}명을 뽑되 각 성별을 한 명 이상 포함하는 경우의 수를 구하세요.`,
      ]),
      latex: `\\text{남 }${boys}\\text{명},\\quad \\text{여 }${girls}\\text{명},\\quad ${selected}\\text{명 선택}`,
      answer: choose(boys + girls, selected) - choose(boys, selected) - choose(girls, selected),
    };
  }
  if (kind === "not-together-selection") {
    const total = integer(next, 8, 11);
    const selected = integer(next, 3, 5);
    return {
      id, kind, label: "동시에 뽑지 않기",
      prompt: pick(next, [
        `${total}명 중 ${selected}명을 뽑을 때 두 특정 학생을 동시에 뽑지 않는 경우의 수를 구하세요.`,
        `후보 ${total}명에서 대표 ${selected}명을 정합니다. 두 특정 후보가 함께 선발되지 않는 경우의 수를 구하세요.`,
        `${total}명 중 운영진 ${selected}명을 뽑을 때 두 특정 인물 중 적어도 한 명이 빠지는 경우의 수를 구하세요.`,
      ]),
      latex: `{}_{{${total}}}C_{${selected}}-{}_{{${total - 2}}}C_{${selected - 2}}`,
      answer: choose(total, selected) - choose(total - 2, selected - 2),
    };
  }
  if (kind === "required-selection") {
    const total = integer(next, 8, 11);
    const selected = integer(next, 4, 6);
    const required = integer(next, 1, 2);
    return {
      id, kind, label: "반드시 포함하기",
      prompt: pick(next, [
        `${total}명 중 ${selected}명을 뽑을 때 특정한 ${required}명을 모두 포함하는 경우의 수를 구하세요.`,
        `후보 ${total}명에서 대표 ${selected}명을 정합니다. 지정된 ${required}명이 반드시 선발되는 경우의 수를 구하세요.`,
        `${total}명 중 준비위원 ${selected}명을 뽑되 특정 ${required}명을 모두 뽑는 경우의 수를 구하세요.`,
      ]),
      latex: `{}_{{${total - required}}}C_{${selected - required}}`, answer: choose(total - required, selected - required),
    };
  }
  if (kind === "repeated-combination") {
    const types = integer(next, 3, 5);
    const count = integer(next, 4, 7);
    return {
      id, kind, label: "중복조합",
      prompt: pick(next, [
        `${types}종류의 사탕에서 중복을 허용하여 모두 ${count}개를 고르는 경우의 수를 구하세요.`,
        `${types}가지 맛의 빵을 합하여 ${count}개 삽니다. 같은 맛을 여러 개 골라도 될 때 경우의 수를 구하세요.`,
        `서로 다른 ${types}종류의 공을 중복 선택하여 ${count}개를 고르는 방법의 수를 구하세요.`,
      ]),
      latex: `{}_{{${types}}}H_{${count}}={}_{{${types + count - 1}}}C_{${count}}`,
      answer: choose(types + count - 1, count),
    };
  }
  if (kind === "nonnegative-solutions") {
    const variables = integer(next, 3, 5);
    const total = integer(next, 6, 10);
    const names = ["x", "y", "z", "w", "v"].slice(0, variables).join("+");
    return {
      id, kind, label: "음이 아닌 정수해",
      prompt: pick(next, [
        `${names}=${total}을 만족하는 음이 아닌 정수해의 개수를 구하세요.`,
        `${total}개의 같은 공을 ${variables}개의 상자에 빈 상자를 허용하여 나누는 방법의 수를 구하세요.`,
        `${variables}종류를 합하여 ${total}개 고를 때 어떤 종류는 고르지 않아도 되는 선택의 수를 구하세요.`,
      ]),
      latex: `{}_{{${variables}}}H_{${total}}={}_{{${total + variables - 1}}}C_{${variables - 1}}`,
      answer: choose(total + variables - 1, variables - 1),
    };
  }
  const variables = integer(next, 3, 5);
  const total = integer(next, variables + 3, variables + 7);
  const names = ["x", "y", "z", "w", "v"].slice(0, variables).join("+");
  return {
    id, kind, label: "양의 정수해",
    prompt: pick(next, [
      `${names}=${total}을 만족하는 양의 정수해의 개수를 구하세요.`,
      `${total}개의 같은 공을 ${variables}개의 상자에 적어도 하나씩 나누는 방법의 수를 구하세요.`,
      `${variables}종류를 각각 하나 이상 골라 합계 ${total}개를 고르는 방법의 수를 구하세요.`,
    ]),
    latex: `{}_{{${total - 1}}}C_{${variables - 1}}`,
    answer: choose(total - 1, variables - 1),
  };
}

function createSet(kinds: PermutationCombinationKind[], seed: number, prefix: string) {
  const next = random(seed);
  return { seed, problems: kinds.map((kind, index) => buildProblem(kind, next, `${prefix}-${index}`)) };
}
export function createCommonCountingProblemSet(seed: number) {
  return createSet(COMMON_COUNTING_KINDS, seed, "common-counting");
}
export function createProbabilityCountingProblemSet(seed: number) {
  return createSet(PROBABILITY_COUNTING_KINDS, seed, "probability-counting");
}
export function createPermutationCombinationReviewProblems(kinds: PermutationCombinationKind[], seed: number) {
  const next = random(seed);
  return [...new Set(kinds)].slice(0, 2).map((kind, index) => buildProblem(kind, next, `review-${index}-${seed}`));
}
export function samePermutationCombinationAnswer(value: string, expected: number) {
  return /^\d+$/.test(value.trim()) && Number(value) === expected;
}
