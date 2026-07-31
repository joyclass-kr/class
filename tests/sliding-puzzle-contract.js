const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const hub = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const html = fs.readFileSync(path.join(root, 'learning/games/sliding-puzzle/index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'learning/games/sliding-puzzle/app.js'), 'utf8');

assert.match(hub, /sliding-puzzle\/\?size=3[^]*?<strong>8 퍼즐<\/strong>/);
assert.match(hub, /sliding-puzzle\/\?size=4[^]*?<strong>15 퍼즐<\/strong>/);
assert.match(html, /data-size="3"/);
assert.match(html, /data-size="4"/);
assert.match(html, /id="board"[^>]+role="grid"/);
assert.match(app, /function shuffledSolvableTiles\(\)/);
assert.match(app, /neighboringIndexes\(blank\)/);
assert.match(app, /document\.addEventListener\('keydown'/);
assert.match(app, /localStorage\.setItem\(bestKey\(\)/);

console.log('sliding puzzle contract: ok');
