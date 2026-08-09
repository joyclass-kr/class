import fs from 'node:fs';
import path from 'node:path';

const files = ['hanja-v2-lessons-01.json', 'hanja-v2-lessons-02.json', 'hanja-v2-lessons-03.json', 'hanja-v2-lessons-04.json', 'hanja-v2-lessons-05.json'];
const lessons = files.flatMap((name) => JSON.parse(fs.readFileSync(path.join(import.meta.dirname, name), 'utf8')));
const curriculum = {
  version: 2,
  principles: {
    charactersPerLesson: [2, 3],
    newCharactersPerLessonMax: 3,
    allowReviewCharacters: true,
    lessonUnit: '억지로 단어를 만들지 않고 함께 익힐 만한 2~3자',
    questionType: '목표 한자가 들어가지 않은 동음어 찾기',
    examplesVisible: true
  },
  lessons: lessons.map((lesson, index) => ({
    id: `v2-${String(index + 1).padStart(3, '0')}`,
    term: lesson.term,
    reading: lesson.reading,
    theme: lesson.theme
  }))
};
fs.writeFileSync(path.join(import.meta.dirname, 'hanja-curriculum-v2.json'), `${JSON.stringify(curriculum, null, 2)}\n`, 'utf8');
console.log(`Built curriculum: ${lessons.length} lessons.`);