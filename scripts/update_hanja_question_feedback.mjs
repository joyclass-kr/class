import fs from 'node:fs';
import path from 'node:path';

const scriptsDir = import.meta.dirname;
const lessonFiles = [1, 2, 3, 4, 5, 6].map((number) => `hanja-v2-lessons-0${number}.json`);
const hunEumData = JSON.parse(fs.readFileSync(path.join(scriptsDir, 'hanja-question-feedback-huneum.json'), 'utf8')).characters;
const loanwords = new Set(['로마', '본드', '친칠라', '이메일', '나일론', '벤처', '아이스크림', '이모티콘']);

function finalParticle(value, consonantParticle, vowelParticle) {
  const hangul = [...value].reverse().find((character) => /[가-힣]/.test(character));
  if (!hangul) return consonantParticle;
  const code = hangul.charCodeAt(0) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 ? consonantParticle : vowelParticle;
}

function hunEumMatches(hunEum, syllable) {
  const match = hunEum.match(/([가-힣]+)(?:\(([가-힣]+)\))?$/);
  return Boolean(match && [match[1], match[2]].filter(Boolean).includes(syllable));
}

function feedbackFor(lesson, question) {
  const target = lesson.characters.find((item) => item.character === question.target);
  const option = question.options[question.answer];
  const word = [...option[0]];
  const hanja = [...option[1]];
  const targetReadings = target.reading.split('·');
  const readingIndex = word.findIndex((syllable) => targetReadings.includes(syllable));
  for (let index = 0; index < Math.min(word.length, hanja.length); index += 1) {
    if (!targetReadings.includes(word[index]) || hanja[index] === question.target) continue;
    const hunEum = hunEumData[hanja[index]];
    if (hunEum && hunEumMatches(hunEum, word[index])) return `‘${option[0]}’에는 ‘${hunEum}’${finalParticle(hunEum, '을', '를')} 씁니다.`;
  }
  if (loanwords.has(option[0]) || option[1] === '외래어') return `‘${option[0]}’는 외래어이므로 한자를 쓰지 않습니다.`;
  const syllable = readingIndex >= 0 ? word[readingIndex] : target.reading.split('·')[0];
  return `‘${option[0]}’의 ‘${syllable}’${finalParticle(syllable, '은', '는')} 한자음이 아닙니다.`;
}

let questions = 0;
let hanjaFeedback = 0;
let nonHanjaFeedback = 0;
for (const file of lessonFiles) {
  const filePath = path.join(scriptsDir, file);
  const lessons = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const lesson of lessons) {
    for (const question of lesson.questions) {
      question.note = feedbackFor(lesson, question);
      questions += 1;
      if (question.note.includes('을 씁니다.') || question.note.includes('를 씁니다.')) hanjaFeedback += 1;
      else nonHanjaFeedback += 1;
    }
  }
  fs.writeFileSync(filePath, `${JSON.stringify(lessons, null, 2)}\n`, 'utf8');
}
console.log(JSON.stringify({ questions, hanjaFeedback, nonHanjaFeedback }, null, 2));