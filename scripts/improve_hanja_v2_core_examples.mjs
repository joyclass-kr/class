import fs from 'node:fs';
import path from 'node:path';

const root = import.meta.dirname;
const normalizeHanja = (value) => value.normalize('NFKC').replace(/[\s^]/g, '');
const keyFor = (term, hanja) => `${term}|${normalizeHanja(hanja)}`;
const officialRows = JSON.parse(fs.readFileSync(path.join(root, 'hanja-krdict-examples.json'), 'utf8'));
const official = new Map(officialRows.map((row) => [keyFor(row.term, row.hanja), row.sentences ?? []]));
const overrides = JSON.parse(fs.readFileSync(path.join(root, 'hanja-example-overrides.json'), 'utf8'));

function score(sentence) {
  let value = Math.abs(sentence.length - 48);
  if (!/[다요]\.$/.test(sentence)) value += 80;
  if (/[?？!！]/.test(sentence)) value += 90;
  if (/[“”\"']/.test(sentence)) value += 35;
  if (/민준|지수|승규|과장님|김 과장|김 기자|그 친구|이 친구|어머니께서|아버지께서/.test(sentence)) value += 55;
  if (/^(네|아니요|그래|응|자|여보|얘들아)[, ]/.test(sentence)) value += 70;
  if (sentence.length < 24) value += 45;
  if (sentence.length > 90) value += 35;
  return value;
}

function clean(sentence) {
  return sentence.replace(/\s{2,}/g, ' ').trim();
}

function isWeak(sentence) {
  return sentence.length < 24 || /^(자료에서|두 글에서|발표문에서|문장의 앞뒤를)/.test(sentence);
}

function choose(term, hanja, current) {
  const key = keyFor(term, hanja);
  if (overrides[key]) return clean(overrides[key]);
  if (!isWeak(current)) return clean(current);
  const candidates = (official.get(key) ?? [])
    .map(clean)
    .filter((sentence) => sentence.includes(term) && /[다요]\.$/.test(sentence) && !/[?？]/.test(sentence));
  if (!candidates.length) return clean(current);
  return [...candidates].sort((a, b) => score(a) - score(b) || a.localeCompare(b, 'ko'))[0];
}

let changed = 0;
const unresolved = [];
for (let batchNumber = 1; batchNumber <= 4; batchNumber += 1) {
  const file = path.join(root, `hanja-v2-lessons-${String(batchNumber).padStart(2, '0')}.json`);
  const lessons = JSON.parse(fs.readFileSync(file, 'utf8'));
  const selected = new Map();

  for (const lesson of lessons) {
    for (const character of lesson.characters) {
      character.examples = character.examples.map(([term, hanja, sentence]) => {
        const replacement = choose(term, hanja, sentence);
        selected.set(keyFor(term, hanja), replacement);
        if (replacement !== sentence) changed += 1;
        return [term, hanja, replacement];
      });
    }
    for (const question of lesson.questions) {
      question.options = question.options.map(([term, hanja, maskedSentence]) => {
        const plain = maskedSentence.replaceAll('{{', '').replaceAll('}}', '');
        const replacement = selected.get(keyFor(term, hanja)) ?? choose(term, hanja, plain);
        const masked = replacement.replace(term, `{{${term}}}`);
        if (masked !== maskedSentence) changed += 1;
        return [term, hanja, masked];
      });
    }
  }

  for (const lesson of lessons) {
    for (const character of lesson.characters) {
      for (const [term, hanja, sentence] of character.examples) {
        if (isWeak(sentence)) unresolved.push({ character: character.character, term, hanja, sentence });
      }
    }
  }
  fs.writeFileSync(file, `${JSON.stringify(lessons, null, 2)}\n`);
}

console.log(JSON.stringify({ changed, unresolvedCount: unresolved.length, unresolved }, null, 2));