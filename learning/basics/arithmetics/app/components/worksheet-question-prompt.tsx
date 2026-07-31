import InlineMathText from "./inline-math-text";
import { targetQuestion } from "../../lib/worksheet-question";

function fallbackQuestion(label: string) {
  if (/함숫값/.test(label)) return "함숫값은?";
  if (/인수분해/.test(label)) return "인수분해한 식은?";
  if (/전개/.test(label)) return "전개한 식은?";
  if (/꼭짓점.*대칭축|대칭축.*꼭짓점/.test(label)) return "꼭짓점과 대칭축은?";
  if (/꼭짓점형|완전제곱/.test(label)) return "꼭짓점형은?";
  if (/방정식|해 구하기|근의 공식/.test(label)) return "해는?";
  if (/부등식/.test(label)) return "해는?";
  if (/도함수|미분/.test(label)) return "도함수는?";
  if (/부정적분/.test(label)) return "부정적분한 결과는?";
  if (/정적분/.test(label)) return "정적분 값은?";
  if (/적분/.test(label)) return "적분한 결과는?";
  if (/절편/.test(label)) return "절편은?";
  if (/교점/.test(label)) return "교점은?";
  if (/평균/.test(label)) return "평균은?";
  if (/중앙값/.test(label)) return "중앙값은?";
  if (/최빈값/.test(label)) return "최빈값은?";
  if (/분산/.test(label)) return "분산은?";
  if (/표준편차/.test(label)) return "표준편차는?";
  if (/확률/.test(label)) return "확률은?";
  if (/넓이/.test(label)) return "넓이는?";
  if (/부피/.test(label)) return "부피는?";
  if (/좌표/.test(label)) return "좌표는?";
  if (/식 구하기|식 결정|방정식 구하기/.test(label)) return "구하는 식은?";
  if (/최댓값|최솟값/.test(label)) return "최댓값 또는 최솟값은?";
  if (/계수/.test(label)) return "계수의 값은?";
  if (/나머지/.test(label)) return "나머지는?";
  if (/값|계산|연산|덧셈|뺄셈|곱셈|나눗셈|정리|약분|근호|제곱근|복소수|행렬|다항식|다항함수|유리식/.test(label)) return "계산 결과는?";
  return "구할 값은?";
}

const CONCISE_QUESTION_RULES: Array<[RegExp, string]> = [
  [/참.*거짓.*판단/, "참인가, 거짓인가?"],
  [/좌극한과 우극한/, "좌극한과 우극한은?"],
  [/극한값.*\$?m\$?/, "$m$은?"],
  [/극한값/, "극한값은?"],
  [/모든 해|방정식의.*해|해가 되는.*구간/, "해는?"],
  [/중심과 반지름/, "중심과 반지름은?"],
  [/교점.*좌표/, "교점의 좌표는?"],
  [/좌표/, "좌표는?"],
  [/일반형/, "일반형은?"],
  [/방정식/, "방정식은?"],
  [/거리/, "거리는?"],
  [/최댓값과 최솟값/, "최댓값과 최솟값은?"],
  [/극댓값과 극솟값/, "극댓값과 극솟값은?"],
  [/속도와 가속도/, "속도와 가속도는?"],
  [/속도가 0.*시각/, "속도가 0인 시각은?"],
  [/이계도함숫값/, "이계도함숫값은?"],
  [/미분계수/, "미분계수는?"],
  [/계수와 차수/, "계수와 차수는?"],
  [/계수/, "계수는?"],
  [/공차/, "공차는?"],
  [/주기와.*점근선/, "주기와 가장 가까운 양의 점근선은?"],
  [/주기/, "주기는?"],
  [/이동량/, "이동량은?"],
  [/적분상수/, "적분상수는?"],
  [/부정적분|부분적분/, "부정적분은?"],
  [/정적분/, "정적분 값은?"],
  [/넓이/, "넓이는?"],
  [/합집합.*원소.*개수/, "합집합의 원소 개수는?"],
  [/부분집합.*개수/, "부분집합의 개수는?"],
  [/합을|주어진 합/, "합은?"],
  [/공차/, "공차는?"],
  [/주어진 항|항을/, "해당 항은?"],
  [/m\s*,\s*b/, "$m, b$는?"],
  [/\$k\$|\bk\b/, "$k$는?"],
  [/\$a\$|\ba\b/, "$a$는?"],
  [/값/, "값은?"],
  [/계산|간단히/, "계산 결과는?"],
];

function conciseQuestion(label: string, prompt: string) {
  if (/[?？]$/.test(prompt)) return prompt;
  if (!/(하세요|하시오|하여라|구하라|고르세요|쓰세요|판단하세요|나타내세요|확인하세요)/.test(prompt)) {
    return prompt;
  }
  for (const [pattern, question] of CONCISE_QUESTION_RULES) {
    if (pattern.test(prompt)) return question;
  }
  return targetQuestion(label);
}

export function worksheetQuestion(label: string, prompt?: string) {
  const directPrompt = prompt?.trim();
  return directPrompt ? conciseQuestion(label, directPrompt) : fallbackQuestion(label);
}

export default function WorksheetQuestionPrompt({
  label,
  prompt,
  className = "logarithm-prompt",
}: {
  label: string;
  prompt?: string;
  className?: string;
}) {
  return (
    <p className={`${className} worksheet-question-prompt`.trim()} data-testid="worksheet-question-prompt">
      <InlineMathText text={worksheetQuestion(label, prompt)} />
    </p>
  );
}
