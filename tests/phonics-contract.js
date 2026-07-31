const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const phonicsDir = path.join(root, "learning", "basics", "phonics");
const curriculumSource = fs.readFileSync(path.join(phonicsDir, "curriculum.js"), "utf8");
const appSource = fs.readFileSync(path.join(phonicsDir, "app.js"), "utf8");
const html = fs.readFileSync(path.join(phonicsDir, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(phonicsDir, "styles.css"), "utf8");
const sandbox = { window: {} };

vm.createContext(sandbox);
vm.runInContext(curriculumSource, sandbox);

const data = sandbox.window.PHONICS_CURRICULUM;
assert.equal(data.stages.length, 6, "The complete course should contain six stages.");
assert.equal(data.lessons.length, 34, "The complete course should contain 34 lessons.");
assert.equal(new Set(data.lessons.map((lesson) => lesson.id)).size, data.lessons.length, "Lesson ids must be unique.");
assert.ok(data.lessons.every((lesson) => lesson.words.length >= 1), "Every lesson needs decodable words.");
assert.ok(data.lessons.every((lesson) => lesson.blend.length >= 1), "Every lesson needs blending practice.");
assert.ok(data.lessons.every((lesson) => lesson.dictation.length >= 1), "Every lesson needs dictation.");
assert.ok(data.lessons.every((lesson) => lesson.sentence), "Every lesson needs a sentence.");

const usedWords = [...new Set(data.lessons.flatMap((lesson) => lesson.words))];
assert.deepEqual(usedWords.filter((word) => !data.wordBank[word]), [], "Every lesson word needs a visual word-bank entry.");

for (const id of ["dashboard", "stageList", "study", "wordCards", "blendArea", "dictationScene", "quizArea", "complete", "resetDialog"]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `Missing required UI region: ${id}`);
}
assert.match(appSource, /localStorage\.setItem/, "Progress must be saved on the learner's device.");
assert.match(appSource, /SpeechSynthesisUtterance/, "Listening activities must use speech synthesis.");
assert.match(appSource, /playPhoneme\(button\.dataset\.letter\)/, "Letter buttons must play phoneme audio instead of letter-name speech.");
assert.doesNotMatch(appSource, /`\$\{button\.dataset\.letter\},/, "Letter buttons must never speak the letter name followed by a word.");
assert.match(appSource, /quizState/, "Each lesson must include a mastery check.");
assert.match(appSource, /dataset\.quizQuestion/, "Quiz questions need independent layout containers.");
assert.doesNotMatch(appSource, /<fieldset class=\"quiz-question/, "Quiz cards must avoid fieldset layout nesting bugs.");
assert.doesNotMatch(appSource, /\$\("quizArea"\)\.innerHTML/, "Quiz rendering must not rebuild nested controls from an HTML string.");
assert.match(appSource, /document\.createElement\("section"\)/, "Quiz cards must be created as independent DOM elements.");
assert.match(styles, /\.quiz-area\{display:flex;flex-direction:column/, "Quiz questions must be stacked vertically.");
assert.match(styles, /@media\(max-width:540px\)/, "The course needs a small-screen layout.");
assert.match(styles, /prefers-reduced-motion/, "The course needs reduced-motion support.");
assert.match(styles, /Andika-Bold\.woff2/, "Learner-facing letters need the bundled literacy font.");
assert.ok(fs.existsSync(path.join(phonicsDir, "assets", "fonts", "Andika-Bold.woff2")), "The literacy font asset is missing.");
assert.ok(fs.statSync(path.join(phonicsDir, "assets", "fonts", "Andika-Bold.woff2")).size > 250000, "The literacy font asset is incomplete.");
const phonemeDir = path.join(phonicsDir, "assets", "sounds", "phonemes");
const phonemeFiles = fs.readdirSync(phonemeDir).filter((file) => file.endsWith(".wav"));
assert.ok(phonemeFiles.length >= 60, "The phoneme audio set is incomplete.");
for (const requiredSound of ["a.wav", "s.wav", "t.wav", "p.wav", "i.wav", "n.wav", "sh.wav", "a-e.wav"]) {
  assert.ok(fs.statSync(path.join(phonemeDir, requiredSound)).size > 1000, `Invalid phoneme audio: ${requiredSound}`);
}

console.log(`phonics-contract: ${data.stages.length} stages, ${data.lessons.length} lessons, ${usedWords.length} learning words`);
