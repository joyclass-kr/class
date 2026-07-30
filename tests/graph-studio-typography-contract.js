const assert = require("node:assert/strict");
const fs = require("node:fs");

const css = fs.readFileSync("learning/basics/graph-studio/styles.css", "utf8");
const html = fs.readFileSync("learning/basics/graph-studio/index.html", "utf8");
const script = fs.readFileSync("learning/basics/graph-studio/app.js", "utf8");
const { expressionToLatex } = require("../learning/basics/graph-studio/math-format.js");

assert.match(css, /\.sectionHeading small[^}]*font-size:\s*12px/);
assert.match(css, /\.functionComposer header small,[\s\S]*?font-size:\s*12px/);
assert.match(css, /\.functionTypeset[^}]*font-size:\s*21px/);
assert.match(css, /\.functionInput[^}]*font:\s*18px var\(--math-font\)/);
assert.match(css, /\.keyboardKeys button,[\s\S]*?font:\s*400 17px var\(--math-font\)/);
assert.match(css, /\.slider output[^}]*font-size:\s*15px/);
assert.doesNotMatch(css, /font-size:\s*(?:9|10)px/);
assert.match(html, /vendor\/katex\.min\.css/);
assert.match(html, /vendor\/katex\.min\.js/);
assert.match(html, /math-format\.js/);
assert.match(script, /window\.katex\.render/);
assert.match(script, /class="functionEditor"/);
assert.match(script, /class="functionTypeset"/);
assert.match(script, /class="functionSourceLabel"/);
assert.match(script, /renderFunctionPreview\(row,fn\.expression\)/);
assert.match(script, /String\.raw`y=\\frac\{a\}\{x\}`/);
assert.match(script, /String\.raw`y=a\\ln\(x-h\)\+k`/);
assert.doesNotMatch(script, /formulaDisplay\.innerHTML/);
assert.match(script, /빈 괄호 안에 수식을 입력하세요/);
assert.match(css, /\.functionEditor:focus-within\s*\{[^}]*height:\s*76px/);
assert.match(css, /\.functionEditor:focus-within \.functionTypeset\s*\{[^}]*border-bottom:/);
assert.doesNotMatch(css, /\.functionEditor:focus-within \.functionTypeset\s*\{[^}]*visibility:\s*hidden/);
assert.match(css, /\.functionEditor:focus-within \.functionInput\s*\{[^}]*top:\s*42px/);
assert.match(css, /\.formulaExamples button\s*\{[^}]*min-width:\s*max-content/);

const nested = expressionToLatex("x()ln(log10(sqrt(exp(xxxxxxx))))a(x-h)^2+k");
assert.match(nested, /\\ln\\left\(\\log_\{10\}\\left\(\\sqrt\{e\^\{xxxxxxx\}\}\\right\)\\right\)/);
assert.match(nested, /\^\{2\}\+k$/);
assert.doesNotMatch(nested, /\^\{2\+k\}/);

console.log("graph studio typography contract passed");
