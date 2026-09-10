const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(
  path.join(root, "learning", "inquiry", "korean-history", "styles.css"),
  "utf8"
);

assert.match(css, /--sheet-max:\s*clamp\(340px,\s*58vw,\s*680px\)/);
assert.match(css, /\.header-inner\s*\{[\s\S]*?justify-content:\s*center;[\s\S]*?gap:\s*28px;/);
assert.match(css, /\.figure img\s*\{[\s\S]*?width:\s*100%;[\s\S]*?height:\s*auto;/);
assert.doesNotMatch(css, /\.figure img\s*\{[\s\S]*?max-height:/);

console.log("Korean-history layout contract ok");
