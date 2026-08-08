import type { CSSProperties } from "react";

export type DivisionBracketAnswer = { quotientDigits: string[]; remainder: string };

export function blankDivisionBracketAnswer(quotientDigitCount: number): DivisionBracketAnswer {
  return { quotientDigits: Array.from({ length: quotientDigitCount }, () => ""), remainder: "" };
}

export function divisionBracketAnswered(answer: DivisionBracketAnswer | undefined) {
  return Boolean(answer && (answer.quotientDigits.some((digit) => digit) || answer.remainder));
}

export function divisionBracketIsCorrect(answer: DivisionBracketAnswer | undefined, quotient: number, remainder: number) {
  return answer?.quotientDigits.join("") === String(quotient) && answer?.remainder === String(remainder);
}

export default function DivisionBracket({
  id,
  dividend,
  divisor,
  quotient,
  remainder,
  answerSheet,
  answer,
  onQuotientDigitChange,
  onRemainderChange,
}: {
  id: string;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  answerSheet: boolean;
  answer?: DivisionBracketAnswer;
  onQuotientDigitChange: (index: number, value: string) => void;
  onRemainderChange: (value: string) => void;
}) {
  const dividendDigits = String(dividend).split("");
  const quotientDigits = String(quotient).split("");
  const columnCount = dividendDigits.length;
  const offset = columnCount - quotientDigits.length;
  const currentQuotientDigits = answer?.quotientDigits ?? Array.from({ length: quotientDigits.length }, () => "");
  const currentRemainder = answer?.remainder ?? "";
  const remainderMaxLength = String(divisor).length;
  const style = { gridTemplateColumns: `auto repeat(${columnCount}, minmax(26px, auto)) auto auto` } as CSSProperties;

  return (
    <div className="division-bracket" style={style}>
      <span className="division-bracket-divisor" style={{ gridColumn: 1, gridRow: 2 }}>{divisor}</span>
      {dividendDigits.map((digit, index) => (
        <span
          className={`division-bracket-cell division-bracket-dividend-cell${index === 0 ? " division-bracket-dividend-first" : ""}`}
          style={{ gridColumn: index + 2, gridRow: 2 }}
          key={`dividend-${index}`}
        >
          {digit}
        </span>
      ))}
      {quotientDigits.map((digit, index) => (
        <span className="division-bracket-cell" style={{ gridColumn: offset + index + 2, gridRow: 1 }} key={`quotient-${index}`}>
          {answerSheet
            ? <strong className="multiplication-static-answer division-remainder-static">{digit}</strong>
            : <input
              className="multiplication-input division-remainder-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={currentQuotientDigits[index] ?? ""}
              onChange={(event) => onQuotientDigitChange(index, event.target.value)}
              aria-label={`${id} 몫 ${index + 1}번째 자리`}
            />}
        </span>
      ))}
      <span className="division-bracket-ellipsis" style={{ gridColumn: columnCount + 2, gridRow: 1 }}>···</span>
      <span style={{ gridColumn: columnCount + 3, gridRow: 1 }}>
        {answerSheet
          ? <strong className="multiplication-static-answer division-remainder-static division-remainder-static-small">{remainder}</strong>
          : <input
            className="multiplication-input division-remainder-input division-remainder-input-small"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={remainderMaxLength}
            value={currentRemainder}
            onChange={(event) => onRemainderChange(event.target.value)}
            aria-label={`${id} 나머지`}
          />}
      </span>
    </div>
  );
}
