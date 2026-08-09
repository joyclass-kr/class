import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const lessonRoot = path.join(root, 'learning', 'basics', 'hanja-meaning', 'v2');
const files = ['hanja-v2-lessons-01.json', 'hanja-v2-lessons-02.json', 'hanja-v2-lessons-03.json', 'hanja-v2-lessons-04.json', 'hanja-v2-lessons-05.json'];
const lessons = files.flatMap((name) => JSON.parse(fs.readFileSync(path.join(import.meta.dirname, name), 'utf8')));
const curriculum = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'hanja-curriculum-v2.json'), 'utf8'));
const standard = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'hanja-grade6-300.json'), 'utf8'));
const strokes = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'hanja-strokes.json'), 'utf8'));
const errors = [];
const normalize = (character) => ({ 强: '強' }[character] || character);
const allCharacters = new Set();
let examples = 0;
let questions = 0;

if (curriculum.lessons.length !== lessons.length) errors.push('커리큘럼 차시 수가 수업 데이터와 다릅니다.');

for (const [lessonIndex, lesson] of lessons.entries()) {
  const number = lessonIndex + 1;
  const slug = String(number).padStart(3, '0');
  const lessonCharacters = lesson.characters.map((item) => item.character);
  if (lessonCharacters.length < 2 || lessonCharacters.length > 3) errors.push(`${slug}: 한 차시는 2~3자여야 합니다.`);
  if (new Set(lessonCharacters).size !== lessonCharacters.length) errors.push(`${slug}: 한 차시 안에 같은 글자가 반복됩니다.`);
  if (lesson.term !== lessonCharacters.join('')) errors.push(`${slug}: term과 글자 카드의 순서가 다릅니다.`);
  if (lesson.questions.length !== lesson.characters.length) errors.push(`${slug}: 글자마다 문제가 하나씩 필요합니다.`);
  if (curriculum.lessons[lessonIndex]?.term !== lesson.term) errors.push(`${slug}: 커리큘럼 term이 다릅니다.`);
  lessonCharacters.forEach((character) => {
    const normalized = normalize(character);
    if (allCharacters.has(normalized)) errors.push(`${slug} ${character}: 다른 차시에 이미 배치된 글자입니다.`);
    allCharacters.add(normalized);
  });

  for (const character of lesson.characters) {
    if (!Array.isArray(character.hunEum) || character.hunEum.length === 0) errors.push(`${slug} ${character.character}: 훈음이 없습니다.`);
    if (!Array.isArray(strokes[character.character]) || strokes[character.character].length === 0) errors.push(`${slug} ${character.character}: 필순이 없습니다.`);
    if (!Array.isArray(character.examples) || character.examples.length < 3) errors.push(`${slug} ${character.character}: 예문이 3개 미만입니다.`);
    examples += character.examples.length;
    for (const [term, hanja, sentence] of character.examples || []) {
      if (![...hanja].includes(character.character)) errors.push(`${slug} ${character.character}: ${term}의 한자어에 목표 글자가 없습니다.`);
      if (!sentence.includes(term)) errors.push(`${slug} ${character.character}: ${term} 예문에 낱말이 없습니다.`);
      if (/^자료에서 .+의 의미와 쓰임|^두 글에서 .+사용된 맥락|^발표문에서 .+관련된 근거|^문장의 앞뒤를 살펴|__MISSING_EXAMPLE__/.test(sentence)) errors.push(`${slug} ${character.character}: ${term}에 자동 생성 상투 문형이 남았습니다.`);
      if (/[?？]/.test(sentence) || !/(다|요|니다)\.$/.test(sentence)) errors.push(`${slug} ${character.character}: ${term} 예문이 완결된 서술문이 아닙니다.`);
    }
  }

  for (const question of lesson.questions) {
    questions += 1;
    const character = lesson.characters.find((item) => item.character === question.target);
    if (!character) { errors.push(`${slug}: 문제 목표 글자가 카드에 없습니다.`); continue; }
    if (question.options.length !== 4) errors.push(`${slug} ${question.target}: 보기가 4개가 아닙니다.`);
    if (new Set(question.options.map((option) => option[0])).size !== question.options.length) errors.push(`${slug} ${question.target}: 같은 보기 낱말이 반복됩니다.`);
    const contains = question.options.map((option) => [...option[1]].includes(question.target));
    if (contains.filter(Boolean).length !== 3) errors.push(`${slug} ${question.target}: 목표 한자가 든 보기는 정확히 3개여야 합니다.`);
    if (contains[question.answer] !== false) errors.push(`${slug} ${question.target}: 정답 번호가 목표 한자가 없는 보기를 가리키지 않습니다.`);
    const readings = character.reading.split('·').filter(Boolean);
    for (const option of question.options) {
      if (!readings.some((reading) => option[0].includes(reading))) errors.push(`${slug} ${question.target}: ${option[0]}에 표시 독음이 없습니다.`);
      if (!option[2].includes(`{{${option[0]}}}`)) errors.push(`${slug} ${question.target}: ${option[0]} 밑줄 표시가 없습니다.`);
    }
  }

  const pagePath = path.join(lessonRoot, slug, 'index.html');
  if (!fs.existsSync(pagePath)) { errors.push(`${slug}: 페이지가 없습니다.`); continue; }
  const html = fs.readFileSync(pagePath, 'utf8');
  if (!html.includes(`${number} / ${lessons.length}`)) errors.push(`${slug}: 전체 차시 표시가 틀렸습니다.`);
  if ((html.match(/class="meaning-card"/g) || []).length !== lesson.characters.length) errors.push(`${slug}: 뜻 카드 수가 다릅니다.`);
  if ((html.match(/class="question" data-answer=/g) || []).length !== lesson.questions.length) errors.push(`${slug}: 문제 카드 수가 다릅니다.`);
  if (/<details|펼쳐 보기|더 보기/.test(html)) errors.push(`${slug}: 예문을 감추는 펼치기 UI가 있습니다.`);
  if (/MISSING|\uFFFD/.test(html)) errors.push(`${slug}: 깨진 데이터 표지가 있습니다.`);
}

const missingStandard = [...standard.characters].map(normalize).filter((character) => !allCharacters.has(character));
if (missingStandard.length) errors.push(`공식 300자 누락: ${[...new Set(missingStandard)].join('')}`);
if (allCharacters.size !== 310) errors.push(`전체 고유 글자: ${allCharacters.size} (예상 310)`);
if (questions !== allCharacters.size) errors.push(`전체 문제: ${questions} (예상 ${allCharacters.size})`);

const progress = fs.readFileSync(path.join(lessonRoot, 'index.html'), 'utf8');
const progressLinks = [...progress.matchAll(/class="lesson-item" href="\.\/(\d{3})\//g)].map((match) => match[1]);
if (progressLinks.length !== lessons.length) errors.push(`진도표 링크: ${progressLinks.length} (예상 ${lessons.length})`);
if (!progress.includes(`${lessons.length}차시 · ${allCharacters.size}자`)) errors.push('진도표의 전체 차시·글자 수가 틀렸습니다.');

const carLesson = lessons.find((lesson) => lesson.characters.some((item) => item.character === '車'));
const carQuestion = carLesson?.questions.find((question) => question.target === '車');
const carTerms = carQuestion?.options.map((option) => option[0]) || [];
for (const term of ['전차', '주차장', '자전거', '차이']) if (!carTerms.includes(term)) errors.push(`車 문제에 ${term} 보기가 없습니다.`);
const long = lessons.flatMap((lesson) => lesson.characters).find((item) => item.character === '長');
if (!long?.hunEum?.some((item) => item.hun.includes('길')) || !long?.hunEum?.some((item) => /어른|우두머리/.test(item.hun))) errors.push('長의 길다·어른/대표자 뜻이 함께 설명되지 않았습니다.');

const report = {
  lessons: lessons.length,
  uniqueCharacters: allCharacters.size,
  officialGrade6Characters: [...new Set([...standard.characters].map(normalize))].length,
  missingStandard,
  characterPlacements: lessons.reduce((sum, lesson) => sum + lesson.characters.length, 0),
  examples,
  questions,
  progressLinks: progressLinks.length,
  errors
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
