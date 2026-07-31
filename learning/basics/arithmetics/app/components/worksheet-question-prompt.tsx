import InlineMathText from "./inline-math-text";

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
  if (/정적분/.test(label)) return "정적분의 값은?";
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

export function worksheetQuestion(label: string, prompt?: string) {
  const directPrompt = prompt?.trim();
  return directPrompt || fallbackQuestion(label);
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
