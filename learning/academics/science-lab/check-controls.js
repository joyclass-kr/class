'use strict';
/* Guards against two things that have actually gone wrong.

   A control whose value is used as a lookup key must name a key that exists.
   Renaming a material in the model and not in the markup left a button that
   threw the moment it was pressed. Values handled by an if/else branch are not
   lookups and are left alone, which is why this only compares a control
   against tables it already partly matches.

   And each quiz card's marked answer must be one of the options it offers.

   Usage: node check-controls.js <experiment-directory> */

const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) { console.error('usage: node check-controls.js <dir>'); process.exit(2); }

const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

const SKIP = new Set(['prediction', 'answer', 'level', 'grade', 'topic', 'subject']);
const buttons = {};
for (const m of html.matchAll(/data-([a-z0-9]+)="([^"]*)"/g)) {
    if (SKIP.has(m[1])) continue;
    (buttons[m[1]] = buttons[m[1]] || new Set()).add(m[2]);
}

// Top-level lookup tables and the keys they offer.
const tables = {};
for (const m of js.matchAll(/const\s+([A-Za-z_]\w*)\s*=\s*\{/g)) {
    let i = m.index + m[0].length - 1, depth = 0, end = -1;
    for (; i < js.length; i += 1) {
        if (js[i] === '{') depth += 1;
        else if (js[i] === '}') { depth -= 1; if (depth === 0) { end = i; break; } }
    }
    if (end < 0) continue;
    const body = js.slice(m.index + m[0].length, end);
    const keys = new Set();
    let d = 0;
    for (let j = 0; j < body.length; j += 1) {
        if ('{['.includes(body[j])) d += 1;
        else if ('}]'.includes(body[j])) d -= 1;
        else if (d === 0) {
            const rest = body.slice(j);
            const k = rest.match(/^([A-Za-z_]\w*|'[^']+'|\d+)\s*:/);
            if (k && (j === 0 || /[\s,{]/.test(body[j - 1]))) keys.add(k[1].replace(/'/g, ''));
        }
    }
    if (keys.size) tables[m[1]] = keys;
}

// A control is only checked against a table the code actually indexes with it,
// so a table that merely happens to share a key name is left out of it.
const exempt = new Set();
for (const m of js.matchAll(/check-controls:\s*(\w+)\s+([\w,]+)/g)) {
    m[2].split(',').forEach(v => exempt.add(`${m[1]}=${v}`));
}

const orphans = [];
for (const [attr, valueSet] of Object.entries(buttons)) {
    const values = [...valueSet];
    for (const [name, keys] of Object.entries(tables)) {
        const indexed = new RegExp(`\\b${name}\\s*\\[\\s*(state\\.)?${attr}\\b`).test(js);
        if (!indexed) continue;
        values.filter(v => !keys.has(v) && !exempt.has(`${attr}=${v}`)).forEach(v =>
            orphans.push(`data-${attr}="${v}" has no entry in ${name} (which holds ${[...keys].join(', ')})`));
    }
}

const quizProblems = [];
const cards = html.split('<article class="quiz-card"').slice(1);
cards.forEach((card, i) => {
    const key = (card.match(/data-answer="([^"]+)"/) || [])[1];
    const values = [...card.matchAll(/<input type="radio"[^>]*value="([^"]+)"/g)].map(m => m[1]);
    if (!key) quizProblems.push(`quiz ${i + 1} has no answer key`);
    else if (!values.includes(key)) quizProblems.push(`quiz ${i + 1} answers "${key}" but offers ${JSON.stringify(values)}`);
    if (new Set(values).size !== values.length) quizProblems.push(`quiz ${i + 1} repeats an option value`);
});

const report = Object.fromEntries(Object.entries(buttons).map(([k, v]) => [k, [...v]]));
console.log(JSON.stringify({ dir, controls: report, orphans, quizProblems }, null, 1));
process.exit(orphans.length + quizProblems.length ? 1 : 0);
