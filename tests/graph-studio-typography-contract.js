const assert = require("node:assert/strict");
const fs = require("node:fs");

const css = fs.readFileSync("learning/basics/graph-studio/styles.css", "utf8");
const html = fs.readFileSync("learning/basics/graph-studio/index.html", "utf8");
const script = fs.readFileSync("learning/basics/graph-studio/app.js", "utf8");

assert.match(css, /\.sectionHeading small[^}]*font-size:\s*12px/);
assert.match(css, /\.functionComposer header small,[\s\S]*?font-size:\s*12px/);
assert.match(css, /\.functionInput[^}]*font:\s*21px var\(--math-font\)/);
assert.match(css, /\.keyboardKeys button,[\s\S]*?font:\s*400 17px var\(--math-font\)/);
assert.match(css, /\.slider output[^}]*font-size:\s*15px/);
assert.doesNotMatch(css, /font-size:\s*(?:9|10)px/);
assert.match(html, /vendor\/katex\.min\.css/);
assert.match(html, /vendor\/katex\.min\.js/);
assert.match(script, /window\.katex\.render/);
assert.match(script, /String\.raw`y=\\frac\{a\}\{x\}`/);
assert.match(script, /String\.raw`y=a\\ln\(x-h\)\+k`/);
assert.doesNotMatch(script, /formulaDisplay\.innerHTML/);

console.log("graph studio typography contract passed");
