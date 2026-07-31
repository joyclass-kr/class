const assert = require('node:assert/strict');
const fs = require('node:fs');

const root = fs.readFileSync('index.html', 'utf8');
const page = fs.readFileSync('learning/academics/chemistry-lab/index.html', 'utf8');
const app = fs.readFileSync('learning/academics/chemistry-lab/app.js', 'utf8');
const styles = fs.readFileSync('learning/academics/chemistry-lab/styles.css', 'utf8');

assert.match(root, /href="learning\/academics\/chemistry-lab\/"/);
assert.match(root, /<strong>화학 실험실<\/strong>/);
assert.match(page, /초등 관찰에서/);
assert.match(page, /id="runExperimentBtn"/);
assert.match(page, /data-level="elementary"/);
assert.match(page, /data-level="middle"/);
assert.match(page, /먼저 예상해 보세요/);
assert.match(app, /function runExperiment\(\)/);
assert.match(app, /const maximum = solute\.solubility\(temperature\)/);
assert.match(app, /prediction === actual/);
assert.match(styles, /@media \(max-width: 680px\)/);
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

console.log('chemistry lab contract: validated');
