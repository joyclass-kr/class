import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const platformSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const helperStart = platformSource.indexOf("function normalizeContentPath(value)");
const helperEnd = platformSource.indexOf("const requireSiteAccess = asyncRoute", helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, "Student content path helpers must be extractable.");
const helperSource = platformSource.slice(helperStart, helperEnd);
const { contentRootForStaticAsset } = new Function(`${helperSource}\nreturn { contentRootForStaticAsset };`)();

test("game backgrounds and music resolve to their enabled content folder", () => {
  assert.equal(
    contentRootForStaticAsset("/learning/games/diamondgame/assets/images/diamond-bg.webp"),
    "/learning/games/diamondgame",
  );
  assert.equal(
    contentRootForStaticAsset("/learning/games/diamondgame/assets/sound/diamond-1.ogg"),
    "/learning/games/diamondgame",
  );
  assert.equal(
    contentRootForStaticAsset("/learning/basics/spelling/app.js?v=1"),
    "/learning/basics/spelling",
  );
});

test("documents and unsafe paths are never treated as static assets", () => {
  assert.equal(contentRootForStaticAsset("/learning/games/diamondgame/diamondgame"), "");
  assert.equal(contentRootForStaticAsset("/learning/games/diamondgame/diamondgame.html"), "");
  assert.equal(contentRootForStaticAsset("/learning/games/../admin/secret.js"), "");
});

test("student asset access remains tied to an enabled content path in the same folder", () => {
  const gateStart = platformSource.indexOf("const requireSiteAccess = asyncRoute");
  const gateEnd = platformSource.indexOf("function signMuseumPresence", gateStart);
  const gateSource = platformSource.slice(gateStart, gateEnd);
  assert.match(gateSource, /const assetRootPath = contentRootForStaticAsset\(requestPath\);/);
  assert.match(gateSource, /\$3 <> '' AND \(content_path = \$3 OR content_path LIKE \$3 \|\| '\/%'\)/);
  assert.match(gateSource, /\[classId, requestPath, assetRootPath\]/);
});
