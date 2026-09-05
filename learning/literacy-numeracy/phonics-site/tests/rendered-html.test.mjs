import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the phonics course shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>영단어 기초<\/title>/);
  assert.match(html, /src=["']\/phonics\/index\.html["']/);
  assert.match(html, /title=["']영단어 기초["']/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("packages the complete phonics application", async () => {
  const [page, layout, curriculum, app, html] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/phonics/curriculum.js", import.meta.url), "utf8"),
    readFile(new URL("../public/phonics/app.js", import.meta.url), "utf8"),
    readFile(new URL("../public/phonics/index.html", import.meta.url), "utf8"),
  ]);

  assert.match(page, /\/phonics\/index\.html/);
  assert.match(layout, /영단어 기초/);
  assert.match(curriculum, /119–128 · -tion, -ture, -ness, bi-/);
  assert.match(curriculum, /확장 접사 복습\|suffix,prefix/);
  assert.match(app, /soundGameState\.firstTry = false/);
  assert.match(app, /revealFocus\(english, word, round\.sound\)/);
  assert.match(app, /const shuffledTargets = \(words, count = 8\)/);
  assert.match(app, /batch\[0\] === targets\.at\(-1\)/);
  assert.doesNotMatch(app, /firstSoundGameRounds/, "The first lesson must not use a stale mixed-sound question set.");
  assert.match(app, /const allPictureWords = Object\.keys\(data\.wordBank\)/);
  assert.match(app, /Object\.hasOwn\(saved\.soundScores, lesson\.id\)/);
  assert.doesNotMatch(app, /saved\.scores\[lesson\.id\].*\/3/);
  assert.match(app, /data\.lessons\.slice\(0, lessonPosition \+ 1\)/);
  assert.match(app, /const courseAreaFor = \(stage\)/);
  assert.match(app, /"철자 규칙과 단어 만들기"/);
  assert.match(app, /"고급 파닉스"/);
  assert.match(app, /"접사와 어휘"/);
  assert.match(html, /id=["']soundChoices["']/);

  for (const asset of [
    "../public/phonics/assets/images/alphabet-atlas-01.webp",
    "../public/phonics/assets/images/lesson-63-es-atlas.webp",
    "../public/phonics/assets/images/lesson-127-prefix-number-atlas.webp",
    "../public/phonics/assets/fonts/Andika-Bold.woff2",
  ]) {
    await access(new URL(asset, import.meta.url));
  }
});
