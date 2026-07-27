const fs = require("node:fs");
const path = require("node:path");

const target = path.resolve(process.argv[2] || "index.html");

function normalizeFile(filePath) {
  let source = fs.readFileSync(filePath, "utf8");
  const normalized = source
    .replace(
      /href=(["'])(?!https?:|\/\/)([^"']*?)index\.html([?#][^"']*)?\1/g,
      (_match, quote, route, suffix = "") => `href=${quote}${route || "./"}${suffix}${quote}`,
    )
    .replace(
      /href=(["'])(?!https?:|\/\/)([^"']+?)\.html([?#][^"']*)?\1/g,
      (_match, quote, route, suffix = "") => `href=${quote}${route}${suffix}${quote}`,
    );
  if (normalized === source) return 0;
  fs.writeFileSync(filePath, normalized);
  return 1;
}

function walk(entryPath) {
  const stats = fs.statSync(entryPath);
  if (stats.isFile()) return entryPath.endsWith(".html") ? normalizeFile(entryPath) : 0;
  if (!stats.isDirectory()) return 0;

  let changed = 0;
  for (const entry of fs.readdirSync(entryPath, { withFileTypes: true })) {
    if (entry.isDirectory() && [".git", "node_modules", "dist"].includes(entry.name)) continue;
    changed += walk(path.join(entryPath, entry.name));
  }
  return changed;
}

const changed = walk(target);
console.log(`Normalized clean links in ${changed} HTML file(s)`);
