import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const batchFiles = ['hanja-v2-lessons-01.json', 'hanja-v2-lessons-02.json', 'hanja-v2-lessons-03.json', 'hanja-v2-lessons-04.json', 'hanja-v2-lessons-05.json', 'hanja-v2-lessons-06.json'];
const outputDir = path.join(repoRoot, 'learning', 'basics', 'hanja-meaning', 'v2');
const rawLessons = batchFiles.flatMap((name) => JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts', name), 'utf8')));

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

const learned = new Set();
const lessons = rawLessons.map((lesson, index) => {
  const characters = [...lesson.term];
  const newCharacters = characters.filter((character) => !learned.has(character));
  characters.forEach((character) => learned.add(character));
  return { ...lesson, number: index + 1, newCharacters };
});

const stageSize = 14;
const stages = Array.from({ length: Math.ceil(lessons.length / stageSize) }, (_, index) => ({
  title: `${index + 1}단계`,
  start: index * stageSize + 1,
  end: Math.min((index + 1) * stageSize, lessons.length)
}));
const stageHtml = stages.map((stage, stageIndex) => {
  const stageLessons = lessons.filter((lesson) => lesson.number >= stage.start && lesson.number <= stage.end);
  const items = stageLessons.map((lesson) => `
          <a class="lesson-item" href="./${String(lesson.number).padStart(3, '0')}/">
            <span class="lesson-number">${String(lesson.number).padStart(3, '0')}</span>
            <span class="lesson-term" aria-label="${escapeHtml(lesson.reading)}">${lesson.term}</span>
            <span class="lesson-copy"><strong>${escapeHtml(lesson.reading)}</strong><small>${escapeHtml(lesson.theme)}</small></span>
            <span class="new-characters">${lesson.newCharacters.join(' · ')}</span>
          </a>`).join('');
  return `
      <details class="stage"${stageIndex === 0 ? ' open' : ''}>
        <summary><span>${stage.title}</span><small>${stage.start}~${stage.end}차시 · ${stageLessons.length}개</small></summary>
        <ol class="lesson-list" start="${stage.start}">${items}
        </ol>
      </details>`;
}).join('');

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>한자 진도표 | 기초학력</title>
<style>
@font-face{font-family:KleeHanja;src:url("../../../../assets/fonts/klee-one/KleeOne-SemiBold.ttf") format("truetype");font-display:swap}:root{--paper:#f7f5ef;--card:#fffdf8;--ink:#202630;--muted:#68717a;--line:#d8d4ca;--blue:#245f8d;--soft:#eaf2f7}*{box-sizing:border-box}body{margin:0;min-width:320px;color:var(--ink);background:#ded8ca url("../assets/hanja-background.webp") center/cover fixed no-repeat;font-family:"Noto Serif KR","Batang",serif}body:before{content:"";position:fixed;inset:0;background:rgba(247,245,239,.84);pointer-events:none}.page{position:relative;width:min(1060px,100%);min-height:100svh;margin:auto;padding:14px clamp(16px,3vw,36px) 32px}.topbar{min-height:52px;display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line)}h1{margin:0;font-size:clamp(26px,3.5vw,36px)}.back{min-height:44px;display:inline-flex;align-items:center;color:var(--blue);font:700 14px system-ui,sans-serif;text-decoration:none}.section-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin:16px 0 8px}.section-head h2{margin:0;font-size:20px}.count{color:var(--muted);font:700 14px system-ui,sans-serif;white-space:nowrap}.stages{display:grid;gap:9px}.stage{overflow:hidden;border:1px solid var(--line);border-radius:9px;background:rgba(255,253,248,.96)}summary{min-height:54px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:8px 14px;cursor:pointer;list-style:none;font-size:17px;font-weight:800}summary::-webkit-details-marker{display:none}summary small{color:var(--muted);font:700 13px system-ui,sans-serif}.lesson-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));margin:0;padding:0 10px 10px;list-style:none;border-top:1px solid var(--line)}.lesson-item{min-height:68px;color:inherit;text-decoration:none;display:grid;grid-template-columns:38px 76px minmax(0,1fr) auto;align-items:center;gap:8px;padding:8px 9px;border-bottom:1px solid #e4e0d7}.lesson-item:nth-child(odd){border-right:1px solid var(--line)}.lesson-number{color:var(--muted);font:800 12px system-ui,sans-serif}.lesson-term{color:var(--blue);font:600 27px KleeHanja,serif;white-space:nowrap}.lesson-copy{min-width:0;display:grid;gap:2px}.lesson-copy strong{font-size:15px}.lesson-copy small{overflow:hidden;color:var(--muted);font-size:13px;text-overflow:ellipsis;white-space:nowrap}.new-characters{padding:4px 7px;border-radius:999px;color:#3d5e76;background:var(--soft);font:700 11px system-ui,sans-serif;white-space:nowrap}summary:focus-visible,.back:focus-visible,.lesson-item:focus-visible{outline:3px solid #77a9cb;outline-offset:2px}@media(max-width:720px){.lesson-list{grid-template-columns:1fr}.lesson-item:nth-child(odd){border-right:0}}@media(max-width:500px){.lesson-item{grid-template-columns:34px 68px minmax(0,1fr)}.new-characters{grid-column:3;justify-self:start}}
</style></head><body><main class="page"><header class="topbar"><h1>한자 진도표</h1><a class="back" href="../../../../">학습 홈</a></header><div class="section-head"><h2>전체 차시</h2><span class="count">${lessons.length}차시 · ${learned.size}자</span></div><section class="stages" aria-label="단계별 진도">${stageHtml}</section></main></body></html>`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
console.log(`Built Hanja v2 progress: ${lessons.length} lessons, ${learned.size} characters.`);