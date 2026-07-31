const assert = require("node:assert/strict");
const fs = require("node:fs");

const css = fs.readFileSync("learning/basics/graph-studio/styles.css", "utf8");
const html = fs.readFileSync("learning/basics/graph-studio/index.html", "utf8");
const script = fs.readFileSync("learning/basics/graph-studio/app.js", "utf8");
const { expressionToLatex, createGraphViewport } = require("../learning/basics/graph-studio/math-format.js");
const katex = require("../learning/basics/graph-studio/vendor/katex.min.js");

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
assert.doesNotMatch(html, /수학 그래프 스튜디오|교사용|교육과정의 그래프를 선택하고|단원을 선택하세요/);
assert.match(html, /<h1>수학 그래프<\/h1>/);
assert.match(html, /<strong>함수 목록<\/strong>/);
assert.match(script, /window\.katex\.render/);
assert.match(script, /class="functionEditor"/);
assert.match(script, /class="functionTypeset"/);
assert.match(script, /class="functionSourceLabel"/);
assert.match(script, /renderFunctionPreview\(row,fn\.expression\)/);
assert.match(script, /function renderFormulaHelp\(valid\)/);
assert.match(script, /formulaHelp\.replaceChildren\(\)/);
assert.match(script, /String\.raw`y=\\frac\{a\}\{x\}`/);
assert.match(script, /String\.raw`y=a\\ln\(x-h\)\+k`/);
assert.doesNotMatch(script, /formulaDisplay\.innerHTML/);
assert.doesNotMatch(html, /`2x`|`a\(x-h\)`/);
assert.match(html, /class="inlineMath" data-latex="2x"/);
assert.match(css, /\.formulaHelpMath, \.inlineMath\s*\{/);
assert.match(script, /빈 괄호 안에 수식을 입력하세요/);
assert.match(css, /\.functionEditor:focus-within\s*\{[^}]*height:\s*76px/);
assert.match(css, /\.functionEditor:focus-within \.functionTypeset\s*\{[^}]*border-bottom:/);
assert.doesNotMatch(css, /\.functionEditor:focus-within \.functionTypeset\s*\{[^}]*visibility:\s*hidden/);
assert.match(css, /\.functionEditor:focus-within \.functionInput\s*\{[^}]*top:\s*42px/);
assert.match(css, /\.formulaExamples button\s*\{[^}]*min-width:\s*max-content/);
assert.match(html, /data-zoom="in"/);
assert.match(html, /data-zoom="out"/);
assert.match(html, /id="zoomLevel"/);
assert.match(script, /canvas\.addEventListener\("wheel"/);

const viewport = createGraphViewport(900, 540, 10);
assert.equal(viewport.scale, 27);
assert.equal(viewport.yMin, -10);
assert.equal(viewport.yMax, 10);
assert.ok(viewport.xMax > 10);
assert.equal(viewport.px(2) - viewport.px(0), viewport.py(0) - viewport.py(2));

const nested = expressionToLatex("x()ln(log10(sqrt(exp(xxxxxxx))))a(x-h)^2+k");
assert.match(nested, /\\ln\\left\(\\log_\{10\}\\left\(\\sqrt\{e\^\{xxxxxxx\}\}\\right\)\\right\)/);
assert.match(nested, /\^\{2\}\+k$/);
assert.doesNotMatch(nested, /\^\{2\+k\}/);

const malformed = expressionToLatex("(x^2+1)/(x-1)abs)");
assert.equal(malformed, "y=(x^{2}+1)/(x-1)abs)");
assert.doesNotMatch(malformed, /\\left|\\right/);
assert.doesNotThrow(() => katex.renderToString(malformed, { throwOnError: true, strict: false }));

const piProduct = expressionToLatex("cos(pix)");
assert.equal(piProduct, String.raw`y=\cos\left(\pi x\right)`);
assert.doesNotThrow(() => katex.renderToString(piProduct, { throwOnError: true, strict: false }));

console.log("graph studio typography contract passed");
