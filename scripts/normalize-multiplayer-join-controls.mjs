import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gamesRoot = path.join(root, "learning", "games");
const modeIds = "joinTab|joinMode|join-tab|join-mode-btn";
const actionIds = "joinBtn|join|join-room-btn";

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filepath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(filepath);
    return entry.isFile() && entry.name.endsWith(".html") ? [filepath] : [];
  });
}

function normalizeButton(source, idPattern, label, ariaLabel, role) {
  const pattern = new RegExp(`<button\\b([^>]*\\bid="(?:${idPattern})"[^>]*)>[\\s\\S]*?<\\/button>`, "gi");
  return source.replace(pattern, (_match, attributes) => {
    let nextAttributes = attributes
      .replace(/\\saria-label="[^"]*"/i, "")
      .replace(/\\srole="[^"]*"/i, "");
    nextAttributes += ` aria-label="${ariaLabel}"`;
    if (role) nextAttributes += ` role="${role}"`;
    return `<button${nextAttributes}>${label}</button>`;
  });
}

let changed = 0;
for (const filepath of htmlFiles(gamesRoot)) {
  const source = fs.readFileSync(filepath, "utf8");
  if (!new RegExp(`id="(?:${modeIds})"`).test(source)) continue;

  let updated = normalizeButton(source, modeIds, "방번호 입력", "방 번호 입력 방식 선택", "tab");
  updated = normalizeButton(updated, actionIds, "참가", "입력한 방 번호로 참가", null);
  if (updated === source) continue;

  fs.writeFileSync(filepath, updated);
  changed += 1;
}

console.log(`Normalized multiplayer join controls in ${changed} files.`);
