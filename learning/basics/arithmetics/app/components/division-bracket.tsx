export type DivisionBracketAnswer = { quotient: string; remainder: string };

export function blankDivisionBracketAnswer(): DivisionBracketAnswer {
  return { quotient: "", remainder: "" };
}

export function divisionBracketAnswered(answer: DivisionBracketAnswer | undefined) {
  return Boolean(answer && (answer.quotient || answer.remainder));
}

export function divisionBracketIsCorrect(answer: DivisionBracketAnswer | undefined, quotient: number, remainder: number) {
  return answer?.quotient === String(quotient) && answer?.remainder === String(remainder);
}

export default function DivisionBracket({
  id,
  dividend,
  divisor,
  quotient,
  remainder,
  answerSheet,
  answer,
  onQuotientChange,
  onRemainderChange,
}: {
  id: string;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  answerSheet: boolean;
  answer?: DivisionBracketAnswer;
  onQuotientChange: (value: string) => void;
  onRemainderChange: (value: string) => void;
}) {
  const quotientLength = String(quotient).length;
  const currentQuotient = answer?.quotient ?? "";
  const currentRemainder = answer?.remainder ?? "";
  const remainderMaxLength = String(divisor).length;

  return (
    <div className="division-bracket">
      <span className="division-bracket-quotient" style={{ gridColumn: 2, gridRow: 1 }}>
        {answerSheet
          ? <strong className="multiplication-static-answer division-remainder-static">{quotient}</strong>
          : <input
            className="multiplication-input division-remainder-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={quotientLength}
            value={currentQuotient}
            onChange={(event) => onQuotientChange(event.target.value)}
            aria-label={`${id} 몫`}
          />}
      </span>
      <span className="division-bracket-ellipsis" style={{ gridColumn: 3, gridRow: 1 }}>···</span>
      <span style={{ gridColumn: 4, gridRow: 1 }}>
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
      <span className="division-bracket-divisor" style={{ gridColumn: 1, gridRow: 2 }}>{divisor}</span>
      <strong className="division-bracket-dividend" style={{ gridColumn: 2, gridRow: 2 }}>{dividend}</strong>
    </div>
  );
}
