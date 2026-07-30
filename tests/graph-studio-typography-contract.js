const assert = require("node:assert/strict");
const fs = require("node:fs");

const css = fs.readFileSync("learning/basics/graph-studio/styles.css", "utf8");

assert.match(css, /\.sectionHeading small[^}]*font-size:\s*12px/);
assert.match(css, /\.functionComposer header small,[\s\S]*?font-size:\s*12px/);
assert.match(css, /\.functionInput[^}]*font:\s*21px var\(--math-font\)/);
assert.match(css, /\.keyboardKeys button,[\s\S]*?font:\s*400 17px var\(--math-font\)/);
assert.match(css, /\.slider output[^}]*font-size:\s*15px/);
assert.doesNotMatch(css, /font-size:\s*(?:9|10)px/);

console.log("graph studio typography contract passed");
