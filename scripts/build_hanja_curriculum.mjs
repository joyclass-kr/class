import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const repoRoot = path.resolve(import.meta.dirname, '..');
const lessonRoot = path.join(repoRoot, 'learning', 'literacy-numeracy', 'hanja-meaning');
const dataDir = path.join(repoRoot, 'scripts', 'hanja-lessons');
const cachePath = path.join(repoRoot, 'scripts', 'hanja-strokes.json');
const templatePath = path.join(lessonRoot, 'il-wol-nyeon', 'index.html');

const lessonFiles = fs.existsSync(dataDir)
  ? fs.readdirSync(dataDir).filter((name) => name.endsWith('.json')).sort()
  : [];
const lessons = lessonFiles.flatMap((name) => JSON.parse(fs.readFileSync(path.join(dataDir, name), 'utf8')));
const seenSlugs = new Set();
const seenCharacters = new Set();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const lesson of lessons) {
  assert(!seenSlugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`);
  seenSlugs.add(lesson.slug);
  assert(lesson.characters.length >= 3, `${lesson.slug}: use a meaningful character group`);
  for (const item of lesson.characters) {
    assert(!seenCharacters.has(item.character), `${lesson.slug}: repeated character ${item.character}`);
    seenCharacters.add(item.character);
    assert(item.words.length >= 3, `${lesson.slug}/${item.character}: too few useful words`);
  }
  assert(lesson.questions.length >= 2, `${lesson.slug}: too few questions`);
  const usedTerms = new Set();
  for (const [questionIndex, question] of lesson.questions.entries()) {
    assert(question.options.length === 4, `${lesson.slug} Q${questionIndex + 1}: needs four options`);
    assert(question.answer >= 0 && question.answer < 4, `${lesson.slug} Q${questionIndex + 1}: invalid answer`);
    for (const option of question.options) {
      assert(option.term && option.hanja && option.sentence, `${lesson.slug} Q${questionIndex + 1}: every option must be a Hanja word in a sentence`);
      assert(!usedTerms.has(option.term), `${lesson.slug}: repeated option term ${option.term}`);
      usedTerms.add(option.term);
    }
  }
}

function requestText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        requestText(response.headers.location).then(resolve, reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
        return;
      }
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function kanjiFile(character) {
  return `${character.codePointAt(0).toString(16).padStart(5, '0')}.svg`;
}

const strokeFallbacks = {
  '內': '内'
};

const strokeCache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : {};
for (const character of seenCharacters) {
  if (strokeCache[character]) continue;
  const sourceCharacter = strokeFallbacks[character] ?? character;
  const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${kanjiFile(sourceCharacter)}`;
  const svg = await requestText(url);
  const paths = [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/>/g)].map((match) => match[1]);
  assert(paths.length > 0, `No stroke paths found for ${character}`);
  strokeCache[character] = paths;
}
fs.writeFileSync(cachePath, `${JSON.stringify(strokeCache, null, 2)}\n`, 'utf8');

const template = fs.readFileSync(templatePath, 'utf8')
  .replace("\n      const nextLesson = document.getElementById('nextLesson');", '')
  .replace("\n        nextLesson.hidden = false;", '')
  .replace("\n        nextLesson.hidden = true;", '');

function renderHeader(lesson) {
  const count = lesson.characters.length;
  const size = count <= 3 ? 68 : count === 4 ? 62 : count === 5 ? 52 : 46;
  const characterText = lesson.characters.map((item) => item.character).join('·');
  const glyphs = lesson.characters.map((item) => `<span>${item.character}</span>`).join('');
  const sets = lesson.characters.map((item, index) => {
    const paths = strokeCache[item.character].map((stroke) => `            <path class="stroke-path" d="${escapeHtml(stroke)}" />`).join('\n');
    return `          <g class="stroke-set" data-character="${item.character}" transform="translate(10 8) scale(1.3)"${index ? ' hidden' : ''}>\n${paths}\n          </g>`;
  }).join('\n');
  const buttons = lesson.characters.map((item, index) => `            <button class="stroke-character" type="button" data-character="${item.character}" aria-pressed="${index === 0}">${item.character}</button>`).join('\n');
  return `    <header class="hanja-head">
      <div class="hanja hanja-generated" style="--hanja-size:${size}px" aria-label="${escapeHtml(lesson.ariaLabel)}">${glyphs}</div>
      <div>
        <p class="reading">${escapeHtml(lesson.reading)}</p>
        <p class="core-meaning">${escapeHtml(lesson.meaning)}</p>
      </div>
      <section class="stroke-demo" aria-label="${characterText} 획순">
        <svg class="stroke-stage" viewBox="0 0 160 160" role="img" aria-label="선택한 한자의 획순">
          <path class="stroke-guide" d="M80 0V160M0 80H160M0 0L160 160M160 0L0 160" />
${sets}
        </svg>
        <div class="stroke-controls">
          <div class="stroke-character-switch" style="--stroke-columns:${Math.min(count, 4)}" aria-label="획순을 볼 글자">
${buttons}
          </div>
          <p id="strokeStatus" class="stroke-status" aria-live="polite">${lesson.characters[0].character} · 준비</p>
          <button id="playStrokes" class="stroke-button" type="button">▶ 획순 보기</button>
          <button id="stepStroke" class="stroke-button" type="button">한 획씩</button>
        </div>
      </section>
    </header>`;
}

function renderMain(lesson, nextLesson) {
  const rows = lesson.characters.map((item) => `        <div class="word-row">
          <p class="word-family">${item.character}(${escapeHtml(item.reading)}) — ${item.words.map(escapeHtml).join(' · ')}</p>
          <p class="example">${escapeHtml(item.explanation)}</p>
        </div>`).join('\n');
  const questions = lesson.questions.map((question, questionIndex) => {
    const choices = question.options.map((option, optionIndex) => {
      const number = ['①', '②', '③', '④'][optionIndex];
      const sentence = escapeHtml(option.sentence).replace(`{{${escapeHtml(option.term)}}}`, `<u>${escapeHtml(option.term)}</u>`);
      return `            <button class="choice" type="button" data-hanja="${escapeHtml(option.hanja)}">${number} ${sentence}</button>`;
    }).join('\n');
    return `        <article class="question" data-answer="${question.answer}" data-note="${escapeHtml(question.note)}">
          <p class="question-context">“${escapeHtml(question.contextBefore)}<u>${escapeHtml(question.focus)}</u>${escapeHtml(question.contextAfter)}”</p>
          <h2><span class="q-number">${questionIndex + 1}</span>밑줄 친 뜻을 가진 한자어는?</h2>
          <div class="choices">
${choices}
          </div>
          <p class="feedback" aria-live="polite"></p>
        </article>`;
  }).join('\n\n');
  const nextLink = nextLesson ? `
        <a id="nextLesson" class="next-lesson" href="../${nextLesson.slug}/" hidden>다음 글자 ${nextLesson.characters.map((item) => item.character).join('·')}</a>` : '';
  return `    <section id="lessonView" class="view" aria-label="뜻과 예시">
      <p class="lesson-guide">${escapeHtml(lesson.guide)}</p>
      <div class="word-list">
${rows}
      </div>
      <button id="startQuiz" class="next-button" type="button">문제 풀기</button>
    </section>

    <section id="quizView" class="view" aria-label="확인 문제" hidden>
      <div class="quiz-grid">
${questions}
      </div>
      <p id="result" class="result" aria-live="polite" hidden></p>
      <div class="quiz-actions">
        <button id="backToLesson" class="back-button" type="button">설명 다시 보기</button>
        <button id="resetQuiz" class="reset-button" type="button">다시 풀기</button>${nextLink}
      </div>
    </section>
  </main>`;
}

for (const [index, lesson] of lessons.entries()) {
  const nextLesson = lessons[index + 1] ?? null;
  const firstCharacter = lesson.characters[0].character;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${lesson.characters.map((item) => item.character).join('·')} | 韓字</title>`)
    .replace(/    \.stroke-character-switch \{[^\n]+\}/, '    .stroke-character-switch { display: grid; grid-template-columns: repeat(var(--stroke-columns), 1fr); gap: 4px; }')
    .replace('  </style>', `    .hanja-generated { display:flex; gap:clamp(4px, .8vw, 9px); min-width:calc(var(--hanja-size) * 3); font-size:clamp(42px, 6vw, var(--hanja-size)); }\n  </style>`)
    .replace(/    <header class="hanja-head">[\s\S]*?    <\/header>/, renderHeader(lesson))
    .replace(/    <section id="lessonView"[\s\S]*?  <\/main>/, renderMain(lesson, nextLesson))
    .replace("let currentCharacter = '日';", `let currentCharacter = '${firstCharacter}';`)
    .replace("selectCharacter('日');", `selectCharacter('${firstCharacter}');`);
  if (nextLesson) {
    html = html
      .replace("      const result = document.getElementById('result');", "      const result = document.getElementById('result');\n      const nextLesson = document.getElementById('nextLesson');")
      .replace("        result.hidden = false;", "        result.hidden = false;\n        nextLesson.hidden = false;")
      .replace("        result.textContent = '';", "        result.textContent = '';\n        nextLesson.hidden = true;");
  }
  const outDir = path.join(lessonRoot, lesson.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

console.log(`Built ${lessons.length} lessons with ${seenCharacters.size} unique characters.`);
