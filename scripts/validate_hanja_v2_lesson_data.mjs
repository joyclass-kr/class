import fs from 'node:fs';
import path from 'node:path';

const files = ['hanja-v2-lessons-01.json', 'hanja-v2-lessons-02.json', 'hanja-v2-lessons-03.json', 'hanja-v2-lessons-04.json', 'hanja-v2-lessons-05.json', 'hanja-v2-lessons-06.json'];
const lessons = files.flatMap((name) => JSON.parse(fs.readFileSync(path.join(import.meta.dirname, name), 'utf8')));
const errors = [];

for (const [lessonIndex, lesson] of lessons.entries()) {
  if ([...lesson.term].length < 2 || [...lesson.term].length > 3) {
    errors.push(`${lesson.term}: 중심 한자어는 2~3글자여야 합니다.`);
  }
  if (lesson.questions.length !== lesson.characters.length) {
    errors.push(`${lesson.term}: 구성 글자마다 문제가 하나씩 필요합니다.`);
  }
  for (const [questionIndex, question] of lesson.questions.entries()) {
    if (question.options.length !== 4) errors.push(`${lesson.term} Q${questionIndex + 1}: 보기는 4개여야 합니다.`);
    const containing = question.options.map((option) => [...option[1]].includes(question.target));
    const nonContaining = containing.filter((value) => !value).length;
    if (nonContaining !== 1) errors.push(`${lesson.term} Q${questionIndex + 1}: 목표 한자가 없는 보기는 정확히 하나여야 합니다.`);
    const targetCharacter = lesson.characters.find((item) => item.character === question.target);
    const readings = (targetCharacter?.reading || '').split('·').filter(Boolean);
    if (!question.options.every((option) => readings.some((reading) => option[0].includes(reading)))) {
      errors.push(`${lesson.term} Q${questionIndex + 1}: 모든 보기에 목표 글자의 독음이 드러나야 합니다.`);
    }
    if (containing[question.answer] !== false) errors.push(`${lesson.term} Q${questionIndex + 1}: 정답은 목표 한자가 없는 보기여야 합니다.`);
    if (!question.options.every((option) => option[2].includes(`{{${option[0]}}}`))) {
      errors.push(`${lesson.term} Q${questionIndex + 1}: 모든 문장에 밑줄 표시 대상이 필요합니다.`);
    }
  }
}

console.log(JSON.stringify({ lessons: lessons.length, questions: lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0), errors }, null, 2));
if (errors.length) process.exitCode = 1;
