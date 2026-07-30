(function exposeGraphMath(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.GraphMath = api;
})(typeof window === "undefined" ? globalThis : window, function createGraphMath() {
  const functionNames = [
    "log10", "sqrt", "floor", "round", "asin", "acos", "atan",
    "ceil", "sign", "sin", "cos", "tan", "abs", "log", "exp", "min", "max", "ln",
  ];

  function closingParenthesis(source, openingIndex) {
    let depth = 0;
    for (let index = openingIndex; index < source.length; index += 1) {
      if (source[index] === "(") depth += 1;
      if (source[index] === ")") depth -= 1;
      if (depth === 0) return index;
    }
    return -1;
  }

  function functionLatex(name, argument) {
    const inner = formatSegment(argument);
    if (name === "sqrt") return `\\sqrt{${inner}}`;
    if (name === "abs") return `\\left|${inner}\\right|`;
    if (name === "exp") return `e^{${inner}}`;
    if (name === "log10") return `\\log_{10}\\left(${inner}\\right)`;
    if (name === "ln" || name === "log" || name === "sin" || name === "cos" || name === "tan") {
      return `\\${name}\\left(${inner}\\right)`;
    }
    if (name === "asin" || name === "acos" || name === "atan") {
      return `\\${name.slice(1)}^{-1}\\left(${inner}\\right)`;
    }
    if (name === "floor") return `\\left\\lfloor ${inner}\\right\\rfloor`;
    if (name === "ceil") return `\\left\\lceil ${inner}\\right\\rceil`;
    return `\\operatorname{${name}}\\left(${inner}\\right)`;
  }

  function formatPower(source, start) {
    let cursor = start;
    while (source[cursor] === " ") cursor += 1;
    if (source[cursor] === "(") {
      const close = closingParenthesis(source, cursor);
      if (close >= 0) return { latex: `^{${formatSegment(source.slice(cursor + 1, close))}}`, end: close + 1 };
    }
    const match = source.slice(cursor).match(/^[+-]?(?:\d+(?:\.\d+)?|[A-Za-z])/);
    if (!match) return { latex: "^{}", end: cursor };
    return { latex: `^{${formatSegment(match[0])}}`, end: cursor + match[0].length };
  }

  function formatSegment(source) {
    let latex = "";
    let index = 0;
    while (index < source.length) {
      const rest = source.slice(index);
      const lowerRest = rest.toLowerCase();
      const functionName = functionNames.find((name) => {
        if (!lowerRest.startsWith(name)) return false;
        let next = index + name.length;
        while (source[next] === " ") next += 1;
        return source[next] === "(";
      });

      if (functionName) {
        let open = index + functionName.length;
        while (source[open] === " ") open += 1;
        const close = closingParenthesis(source, open);
        if (close >= 0) {
          latex += functionLatex(functionName, source.slice(open + 1, close));
          index = close + 1;
          continue;
        }
        latex += `\\operatorname{${functionName}}\\left(`;
        index = open + 1;
        continue;
      }

      if (/^pi\b/i.test(rest)) {
        latex += "\\pi ";
        index += 2;
        continue;
      }

      const character = source[index];
      if (character === "^") {
        const power = formatPower(source, index + 1);
        latex += power.latex;
        index = power.end;
        continue;
      }
      if (character === "*" || character === "×" || character === "·") latex += "\\cdot ";
      else if (character === "÷") latex += "\\div ";
      else if (character === "(") latex += "\\left(";
      else if (character === ")") latex += "\\right)";
      else if (character === " ") latex += "\\,";
      else if (character === "{") latex += "\\{";
      else if (character === "}") latex += "\\}";
      else latex += character;
      index += 1;
    }
    return latex;
  }

  function expressionToLatex(source) {
    return `y=${source.trim() ? formatSegment(source.trim()) : "\\square"}`;
  }

  return { expressionToLatex, formatSegment };
});
