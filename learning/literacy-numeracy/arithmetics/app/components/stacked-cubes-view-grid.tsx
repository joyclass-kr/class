export default function StackedCubesViewGrid({
  size,
  value,
  onToggle,
  readOnly = false,
  correct,
  label,
}: {
  size: number;
  value: boolean[][];
  onToggle?: (row: number, col: number) => void;
  readOnly?: boolean;
  correct?: boolean[][];
  label: string;
}) {
  return (
    <div className="stack-view" aria-label={label}>
      <div className="stack-view-grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, gridTemplateRows: `repeat(${size}, 1fr)` }}>
        {value.map((row, r) => row.map((filled, c) => {
          const stateClass = correct ? (correct[r][c] ? "is-answer" : "") : (filled ? "is-filled" : "");
          const className = `stack-view-cell${stateClass ? ` ${stateClass}` : ""}`;
          return readOnly || !onToggle
            ? <div className={className} key={`${r}-${c}`} />
            : <button type="button" className={className} aria-pressed={filled} onClick={() => onToggle(r, c)} key={`${r}-${c}`} />;
        }))}
      </div>
      <small>{label}</small>
    </div>
  );
}
