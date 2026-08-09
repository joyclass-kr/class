import fs from 'node:fs';
import path from 'node:path';

const batchNames = ['hanja-v2-lessons-01.json', 'hanja-v2-lessons-02.json', 'hanja-v2-lessons-03.json', 'hanja-v2-lessons-04.json'];
const sourceLessons = batchNames.flatMap((name) => JSON.parse(fs.readFileSync(path.join(import.meta.dirname, name), 'utf8')));
const byCharacter = new Map();
for (const lesson of sourceLessons) {
  for (const character of lesson.characters) {
    if (byCharacter.has(character.character)) continue;
    byCharacter.set(character.character, {
      character: structuredClone(character),
      question: structuredClone(lesson.questions.find((question) => question.target === character.character))
    });
  }
}

const plant = byCharacter.get('植');
plant.character.explanation = '기본 뜻은 식물을 심어 뿌리내리게 하는 것입니다. 여기에서 사람·제도·세력을 다른 곳에 옮겨 자리 잡게 한다는 뜻으로 넓어져 식민지(植民地)에도 쓰입니다.';
plant.character.examples = [
  ['식물', '植物', '식물은 햇빛을 이용해 양분을 만들고 산소를 내놓습니다.'],
  ['이식', '移植', '연구진은 병든 나무를 치료한 뒤 토양이 알맞은 곳으로 이식했습니다.'],
  ['식민지', '植民地', '제국주의 국가들은 다른 지역을 식민지로 지배하며 자원과 노동력을 빼앗았습니다.'],
  ['식목', '植木', '학생들은 식목 행사에서 학교 숲에 어린 나무를 심었습니다.']
];
plant.question = {
  target: '植',
  answer: 3,
  note: '식물(植物)·이식(移植)·식민지(植民地)에는 植 글자가 쓰입니다. 식사(食事)에는 쓰이지 않습니다.',
  options: [
    ['식물', '植物', '{{식물}}은 햇빛을 이용해 양분을 만들고 산소를 내놓습니다.'],
    ['이식', '移植', '연구진은 병든 나무를 치료한 뒤 토양이 알맞은 곳으로 {{이식}}했습니다.'],
    ['식민지', '植民地', '제국주의 국가들은 다른 지역을 {{식민지}}로 지배하며 자원과 노동력을 빼앗았습니다.'],
    ['식사', '食事', '규칙적인 {{식사}}가 건강에 미치는 영향을 조사했습니다.']
  ]
};

const groups = [
  '人生','男女','大小','多少','上下','左右','東西','南北','日月年','一二三','四五','六七','八九十','百千萬',
  '時分','正午','古今','春夏','秋冬','父母','子友','學校','先前後','中內外','入出門','天地','山川土','水火',
  '木材','金屬','風雨','降雪','目的','口手足','心身','體力','文字','國語民','對話','讀書','問答','家庭','敎室',
  '場所','道路','都市','農村','長短反','高低','新聞','同別','動物植','電光','音聲','空氣','自轉車'
];

const used = new Set();
const lessons = groups.map((term) => {
  const entries = [...term].map((character) => {
    const entry = byCharacter.get(character);
    if (!entry) throw new Error(`${character}: core character data is missing`);
    if (used.has(character)) throw new Error(`${character}: duplicated in core grouping`);
    used.add(character);
    return entry;
  });
  return {
    term,
    reading: entries.map(({ character }) => character.reading).join(' · '),
    theme: entries.map(({ character }) => character.meaning).join(' · '),
    characters: entries.map(({ character }) => character),
    questions: entries.map(({ question }) => question)
  };
});

const missing = [...byCharacter.keys()].filter((character) => !used.has(character));
if (missing.length) throw new Error(`ungrouped core characters: ${missing.join('')}`);
if (lessons.some((lesson) => lesson.characters.length < 2 || lesson.characters.length > 3)) throw new Error('every core lesson must contain 2-3 characters');

const sizes = [10, 10, 10, lessons.length - 30];
let offset = 0;
for (let index = 0; index < batchNames.length; index += 1) {
  const batch = lessons.slice(offset, offset + sizes[index]);
  fs.writeFileSync(path.join(import.meta.dirname, batchNames[index]), `${JSON.stringify(batch, null, 2)}\n`, 'utf8');
  offset += sizes[index];
}
console.log(`Reorganized core: ${lessons.length} lessons, ${used.size} unique characters, no duplicate placements.`);