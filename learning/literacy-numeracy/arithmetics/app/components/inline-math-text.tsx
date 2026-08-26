"use client";

import { Fragment, type ReactNode } from "react";
import MathFormula from "./math-formula";

const PLAIN_MATH_TOKENS = [
  { text: "a+b", latex: "a+b" },
  { text: "a-b", latex: "a-b" },
  { text: "x²+(a+b)x+ab", latex: "x^2+(a+b)x+ab" },
  { text: "30°·45°·60°", latex: "30^\\circ,\\ 45^\\circ,\\ 60^\\circ" },
  { text: "sin·cos·tan", latex: "\\sin,\\ \\cos,\\ \\tan" },
  { text: "ax²+bx+c", latex: "ax^2+bx+c" },
  { text: "y=ax²", latex: "y=ax^2" },
  { text: "x²=a", latex: "x^2=a" },
  { text: "(x, y)", latex: "(x,y)" },
  { text: "∠AQB", latex: "\\angle AQB" },
  { text: "∠ABC", latex: "\\angle ABC" },
  { text: "∠APB", latex: "\\angle APB" },
  { text: "∠C", latex: "\\angle C" },
  { text: "sin", latex: "\\sin" },
  { text: "cos", latex: "\\cos" },
  { text: "tan", latex: "\\tan" },
  { text: "x", latex: "x" },
  { text: "y", latex: "y" },
  { text: "a", latex: "a" },
  { text: "b", latex: "b" },
  { text: "c", latex: "c" },
  { text: "m", latex: "m" },
  { text: "n", latex: "n" },
] as const;

function findTokenIndex(text: string, token: string, cursor: number) {
  let index = text.indexOf(token, cursor);
  const alphabeticToken = /^[A-Za-z]+$/.test(token);

  while (index >= 0 && alphabeticToken) {
    const previous = text[index - 1] ?? "";
    const next = text[index + token.length] ?? "";
    if (!/[A-Za-z]/.test(previous) && !/[A-Za-z]/.test(next)) break;
    index = text.indexOf(token, index + 1);
  }

  return index;
}

function normalizeMathRun(run: string) {
  return run
    .replaceAll("²", "^2")
    .replaceAll("³", "^3")
    .replaceAll("×", "\\times ")
    .replaceAll("÷", "\\div ")
    .replaceAll("·", "\\cdot ");
}

function renderPlainText(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const latinRun = /(?:\([A-Za-z0-9]|[A-Za-z0-9])(?:[A-Za-z0-9^_+\-*/=()²³×÷·])*/.exec(text.slice(cursor));
    const fallbackToken = latinRun
      ? {
          text: latinRun[0],
          latex: normalizeMathRun(latinRun[0]),
          index: cursor + (latinRun.index ?? 0),
        }
      : null;
    const nextToken = [
      ...PLAIN_MATH_TOKENS
      .map((token) => ({ ...token, index: findTokenIndex(text, token.text, cursor) }))
      .filter(({ index }) => index >= 0),
      ...(fallbackToken ? [fallbackToken] : []),
    ]
      .sort((left, right) => left.index - right.index || right.text.length - left.text.length)[0];

    if (!nextToken) {
      parts.push(text.slice(cursor));
      break;
    }

    if (nextToken.index > cursor) parts.push(text.slice(cursor, nextToken.index));
    parts.push(
      <MathFormula
        key={`${keyPrefix}-${nextToken.text}-${nextToken.index}`}
        latex={nextToken.latex}
        className="inline-math-text-formula"
      />,
    );
    cursor = nextToken.index + nextToken.text.length;
  }

  return parts;
}

export default function InlineMathText({ text }: { text: string }) {
  return text.split(/(\$[^$]+\$)/g).map((part, index) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      return <MathFormula key={`${part}-${index}`} latex={part.slice(1, -1)} displayStyle />;
    }
    return (
      <Fragment key={`plain-${index}`}>
        {renderPlainText(part, `plain-${index}`)}
      </Fragment>
    );
  });
}
