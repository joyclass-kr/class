const assert = require('node:assert/strict');
const fs = require('node:fs');

const root = fs.readFileSync('index.html', 'utf8');
const page = fs.readFileSync('learning/inquiry/chemistry-lab/index.html', 'utf8');
const app = fs.readFileSync('learning/inquiry/chemistry-lab/app.js', 'utf8');
const styles = fs.readFileSync('learning/inquiry/chemistry-lab/styles.css', 'utf8');

assert.match(root, /href="learning\/inquiry\/chemistry-lab\/"/);
assert.match(root, /<strong>화학 실험실<\/strong>/);
assert.match(page, /<h1 id="page-title">화학 실험실<\/h1>/);
assert.doesNotMatch(page, /초등 관찰에서/);
assert.doesNotMatch(page, /직접 바꾸고, 관찰하고, 설명하기/);
assert.match(page, /id="runExperimentBtn"/);
assert.match(page, /id="particleLegend"/);
assert.match(page, /data-level="elementary"/);
assert.match(page, /data-level="middle"/);
assert.match(page, /먼저 예상해 보세요/);
assert.match(app, /function runExperiment\(\)/);
assert.match(app, /amount: \{ min: 32, max: 42, step: 0\.5, initial: 36 \}/);
assert.match(app, /points: \[\[0, 35\.5\], \[20, 36\], \[40, 36\.5\]/);
assert.match(app, /function interpolateSolubility\(points, temperature\)/);
assert.match(app, /syncAmountRange\(true\)/);
assert.match(app, /particleType: 'ion'/);
assert.match(app, /particleType: 'molecule'/);
assert.match(app, /Na⁺/);
assert.match(app, /Cl⁻/);
assert.match(app, /particles\.innerHTML = ''/);
assert.match(styles, /\.sodium-ion/);
assert.match(styles, /\.chloride-ion/);
assert.match(styles, /\.sugar-molecule/);
assert.match(app, /prediction === actual/);
assert.match(styles, /@media \(max-width: 680px\)/);
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

console.log('chemistry lab contract: validated');
