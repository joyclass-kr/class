import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const lessonRoot = path.join(repoRoot, 'learning', 'literacy-numeracy', 'hanja-meaning');
const curriculumPath = path.join(repoRoot, 'scripts', 'hanja-curriculum-v2.json');

const indexHtml = fs.readFileSync(path.join(lessonRoot, 'index.html'), 'utf8');
const originalCharacters = new Set(
  [...indexHtml.matchAll(/<span class="lesson-hanja">([^<]+)<\/span>/g)]
    .flatMap((match) => [...match[1]])
);
const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));
const learned = new Set();
const covered = new Set();
const errors = [];
const introducedByLesson = [];

for (const [index, lesson] of curriculum.lessons.entries()) {
  const number = index + 1;
  const characters = [...lesson.term];
  const uniqueCharacters = [...new Set(characters)];

  if (characters.length < 2 || characters.length > 3) {
    errors.push(`${lesson.id}: 중심 한자어는 2~3글자여야 합니다.`);
  }
  if (uniqueCharacters.length !== characters.length) {
    errors.push(`${lesson.id}: 한 차시 안에서 같은 글자를 반복하지 마세요.`);
  }
  if (lesson.id !== `v2-${String(number).padStart(3, '0')}`) {
    errors.push(`${lesson.id}: 차시 ID와 순서가 일치하지 않습니다.`);
  }

  const newCharacters = uniqueCharacters.filter((character) => !learned.has(character));
  if (number > 1 && newCharacters.length > curriculum.principles.newCharactersPerLessonMax) {
    errors.push(`${lesson.id}: 새 글자가 ${newCharacters.length}자입니다 (${newCharacters.join('·')}).`);
  }

  introducedByLesson.push({
    lesson: number,
    term: lesson.term,
    newCharacters: newCharacters.join('')
  });
  uniqueCharacters.forEach((character) => {
    learned.add(character);
    if (originalCharacters.has(character)) covered.add(character);
  });
}

const missingOriginalCharacters = [...originalCharacters].filter((character) => !covered.has(character));
if (missingOriginalCharacters.length) {
  errors.push(`기존 109자 중 누락: ${missingOriginalCharacters.join('·')}`);
}

const addedCharacters = [...learned].filter((character) => !originalCharacters.has(character));
const report = {
  lessons: curriculum.lessons.length,
  originalCharacters: originalCharacters.size,
  coveredOriginalCharacters: covered.size,
  totalCharactersAfterReorganization: learned.size,
  addedCharacters,
  missingOriginalCharacters,
  errors,
  introducedByLesson
};

console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
