const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const hub = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const html = fs.readFileSync(path.join(root, 'learning/games/sliding-puzzle/index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'learning/games/sliding-puzzle/app.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'game-hub-server/server.js'), 'utf8');

assert.match(hub, /sliding-puzzle\/[^]*?<strong>8 퍼즐·15 퍼즐<\/strong>/);
assert.equal((hub.match(/href="learning\/games\/sliding-puzzle\//g) || []).length, 1);
assert.match(html, /data-size="3"/);
assert.match(html, /data-size="4"/);
assert.match(html, /id="board"[^>]+role="grid"/);
assert.match(html, /id="startScreen"/);
assert.match(html, /id="gameScreen"[^>]+hidden/);
assert.match(html, /TODAY’S FINISHERS/);
assert.match(html, /finisher-board\.js/);
assert.match(app, /function shuffledSolvableTiles\(\)/);
assert.match(app, /neighboringIndexes\(blank\)/);
assert.match(app, /document\.addEventListener\('keydown'/);
assert.match(app, /localStorage\.setItem\(bestKey\(\)/);
assert.match(app, /gameId:\s*'slidingpuzzle'/);
assert.match(app, /finisherBoard\.register/);
assert.match(server, /FINISHER_GAMES[^\n]+slidingpuzzle/);

console.log('sliding puzzle contract: ok');
