const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'learning', 'arts', 'instrument-room');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

test('uses the five curriculum instrument families', () => {
  for (const family of ['keyboard', 'strings', 'woodwind', 'brass', 'percussion']) {
    assert.match(html, new RegExp(`data-family="${family}"`));
  }
});

test('keyboard library covers AP, EP, Hybrid, and Organ', () => {
  for (const model of ['concert-grand', 'tine-ep', 'pop-grand-fm', 'tonewheel-organ']) {
    assert.match(app, new RegExp(`id: "${model}"`));
  }
  assert.match(app, /AP · ACOUSTIC/);
  assert.match(app, /EP · ELECTRIC/);
  assert.match(app, /tag: "HYBRID"/);
  assert.match(app, /tag: "ORGAN"/);
});

test('percussion library includes playable kits and essential orchestral instruments', () => {
  for (const model of ['rock-kit', 'metal-kit', 'pop-kit', 'jazz-kit', 'funk-kit', 'timpani', 'glockenspiel', 'marimba', 'vibraphone', 'xylophone', 'drum-808', 'linn-machine', 'samulnori']) {
    assert.match(app, new RegExp(`id: "${model}"`));
  }
  assert.match(app, /renderKitHotspots/);
  assert.match(app, /renderMachine/);
  assert.match(app, /triggerVisualDrum/);
});

test('string and expressive families expose virtual-instrument presentation', () => {
  for (const model of ['p-bass', 's-style', 'metal-seven', 'upright-bass', 'violin', 'flute', 'trumpet']) {
    assert.match(app, new RegExp(`id: "${model}"`));
  }
  assert.match(html, /id="classicalControls"/);
  assert.match(html, /id="guitarFxControls"/);
  assert.match(css, /\.classical-render/);
  assert.match(css, /\.machine-deck/);
});

test('project-bound instrument artwork exists', () => {
  for (const asset of ['bass-p-style.png', 'bass-j-style.png', 'bass-active-five.png', 'bass-fretless.png', 'guitar-s-style.png', 'guitar-metal-seven.png', 'guitar-hollowbody-jazz.png', 'guitar-dreadnought.png', 'guitar-classical-nylon.png', 'drum-acoustic-kit.png', 'violin-expressive.png', 'cello-expressive.png', 'double-bass-expressive.png', 'flute-expressive.png', 'trumpet-expressive.png']) {
    assert.equal(fs.existsSync(path.join(root, 'assets', 'instruments', asset)), true, asset);
  }
});

test('range controls keep computer-keyboard performance available', () => {
  assert.match(app, /event\.target\.type !== "range"/);
});
