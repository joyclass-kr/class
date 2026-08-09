import fs from 'node:fs';
import path from 'node:path';

const scriptDir = import.meta.dirname;
const batchFiles = Array.from({ length: 6 }, (_, index) => `hanja-v2-lessons-${String(index + 1).padStart(2, '0')}.json`);
const overrides = JSON.parse(fs.readFileSync(path.join(scriptDir, 'hanja-example-overrides.json'), 'utf8'));
const fallbacks = JSON.parse(fs.readFileSync(path.join(scriptDir, 'hanja-example-fallbacks.json'), 'utf8'));
const dictionaryRows = JSON.parse(fs.readFileSync(path.join(scriptDir, 'hanja-krdict-examples.json'), 'utf8'));
const normalize = (value) => String(value || '').normalize('NFKC').replaceAll(' ', '').replaceAll('^', '');
const keyOf = (term, hanja) => `${term}|${normalize(hanja)}`;
const dictionary = new Map(dictionaryRows.map((row) => [keyOf(row.term, row.hanja), row.sentences || []]));
const badContext = /(?<![가-힣])(?:나는|내가|우리는)(?![가-힣])|우리 가족|아버지|어머니|할머니|할아버지|남편|아내|엄마|아빠|언니|오빠|누나|형부|동생|사촌|여자 친구|남자 친구|친구가|친구에게|선생님께서|교수님|사모님|민수|민준|지수|승규|유민|영수|수지|지민|그는|그녀|그 사람|김 [가-힣]+|김씨|(?<![가-힣])형은(?![가-힣])|맞아요|있대요|심하네요|“|”|"|\?|!|네,|아뇨|저는|제가|나의|우리 집/;
const generic = /^자료에서 .+의 의미와 쓰임|^두 글에서 .+사용된 맥락|^발표문에서 .+관련된 근거|^문장의 앞뒤를 살펴|__MISSING_EXAMPLE__/;
const isUsable = (sentence, term) => { const context = sentence.replaceAll(term, ''); return sentence.includes(term) && sentence.length >= 24 && sentence.length <= 110 && /(다|요|니다)\.$/.test(sentence) && !badContext.test(context) && !generic.test(sentence); };
const score = (sentence) => Math.abs(sentence.length - 52) + (/습니다\.$/.test(sentence) ? 0 : 5) + (/회사|결혼|병원|술|담배/.test(sentence) ? 8 : 0);
const choose = (term, hanja, current) => {
  const key = keyOf(term, hanja);
  if (overrides[key]) return overrides[key];
  if (fallbacks[key]) return fallbacks[key];
  const plainCurrent = current.replaceAll(`{{${term}}}`, term);
  if (isUsable(plainCurrent, term)) return plainCurrent;
  const candidates = (dictionary.get(key) || []).filter((sentence) => isUsable(sentence, term)).sort((a, b) => score(a) - score(b) || a.localeCompare(b, 'ko'));
  if (candidates.length) return candidates[0];
  return null;
};

let changed = 0;
const unresolved = new Map();
for (const file of batchFiles) {
  const filePath = path.join(scriptDir, file);
  const lessons = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const lesson of lessons) {
    for (const character of lesson.characters) {
      character.examples = character.examples.map(([term, hanja, sentence]) => {
        const selected = choose(term, hanja, sentence);
        if (!selected) unresolved.set(keyOf(term, hanja), sentence);
        else if (selected !== sentence) changed += 1;
        return [term, hanja, selected || sentence];
      });
    }
    for (const question of lesson.questions) {
      question.options = question.options.map(([term, hanja, sentence]) => {
        const plain = sentence.replaceAll(`{{${term}}}`, term);
        const selected = choose(term, hanja, plain);
        if (!selected) unresolved.set(keyOf(term, hanja), plain);
        else if (selected !== plain) changed += 1;
        const finalSentence = selected || plain;
        return [term, hanja, finalSentence.replaceAll(term, `{{${term}}}`)];
      });
    }
  }
  fs.writeFileSync(filePath, `${JSON.stringify(lessons, null, 2)}\n`, 'utf8');
}
console.log(JSON.stringify({ changed, unresolved: unresolved.size, unresolvedItems: [...unresolved].map(([key, sentence]) => ({ key, sentence })) }, null, 2));
if (unresolved.size) process.exitCode = 1;