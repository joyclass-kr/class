import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const serverSource = await readFile(new URL("./classroom-platform.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const mainScriptMatch = indexSource.match(/<script>\s*(\(\(\) => \{[\s\S]*?\}\)\(\);)\s*<\/script>/);

assert.ok(mainScriptMatch, "The home screen's main script must be extractable.");
assert.doesNotThrow(
  () => new Function(mainScriptMatch[1]),
  "The home screen's main script must remain valid JavaScript.",
);

const matcherStart = serverSource.indexOf("function matchesDisabledContentPath(");
const matcherEnd = serverSource.indexOf("const requireSiteAccess", matcherStart);
assert.ok(matcherStart >= 0 && matcherEnd > matcherStart, "Global path matchers must be extractable.");
const matcherRuntime = new Function(
  `${serverSource.slice(matcherStart, matcherEnd)}
   return { isGloballyDisabledContent };`,
)();
assert.equal(
  matcherRuntime.isGloballyDisabledContent(
    "/learning/games/example/play",
    "",
    ["/learning/games/example"],
  ),
  true,
  "A disabled menu must also block its descendant routes.",
);
assert.equal(
  matcherRuntime.isGloballyDisabledContent(
    "/learning/games/example-two",
    "",
    ["/learning/games/example"],
  ),
  false,
  "A similarly prefixed but different menu must remain available.",
);

assert.match(
  serverSource,
  /CREATE TABLE IF NOT EXISTS site_content_disabled \([\s\S]*content_path TEXT PRIMARY KEY/,
  "Global content locks must be stored independently from per-class settings.",
);
assert.match(
  serverSource,
  /router\.put\("\/admin\/home-content-access"[\s\S]*requireAdmin\(req\)[\s\S]*site_content_disabled/,
  "Only the site administrator may update global content locks.",
);
assert.match(
  serverSource,
  /isGloballyDisabledContent\(requestPath, assetRootPath, globallyDisabledPaths\)[\s\S]*sessionUser\(req\)[\s\S]*user\?\.role !== "admin"[\s\S]*CONTENT_GLOBALLY_DISABLED/,
  "Globally disabled content must block direct requests for non-admin users while allowing the site administrator.",
);
assert.match(
  serverSource,
  /globallyDisabledPaths,[\s\S]*canManageGlobally: user\.role === "admin"/,
  "The home access response must expose both global state and administrator capability.",
);

assert.match(
  indexSource,
  /id="globalContentAccessButton"[\s\S]*전체 메뉴\/게임 사용 중지 설정/,
  "The home screen must expose a site-administrator control.",
);
assert.match(
  indexSource,
  /\.is-global-locked[\s\S]*filter: grayscale\(100%\) opacity\(0\.55\)/,
  "A globally disabled menu must render in gray.",
);
assert.match(
  indexSource,
  /canBypassGlobalContentLock = result\.canManageGlobally === true;[\s\S]*classContentAccessApplies = result\.hasClassAccess === true && !canBypassGlobalContentLock;/,
  "The home screen must recognize that the site administrator bypasses global and class menu locks.",
);
assert.match(
  indexSource,
  /const globallyLocked = globallyDisabled && !canBypassGlobalContentLock;[\s\S]*link\.dataset\.globalLocked = String\(globallyLocked\);/,
  "A globally disabled menu must remain clickable for the site administrator while staying blocked for everyone else.",
);
assert.match(
  indexSource,
  /if \(selectedLink\?\.dataset\.globalLocked === 'true'\) \{[\s\S]*event\.preventDefault\(\);[\s\S]*event\.stopImmediatePropagation\(\);/,
  "A globally disabled menu click must be cancelled only when the current viewer cannot bypass it.",
);
assert.match(
  indexSource,
  /api\('\/api\/admin\/home-content-access',[\s\S]*disabled: nextDisabled/,
  "The administrator edit mode must persist global disabled state.",
);
assert.match(
  indexSource,
  /classList\.toggle\('is-class-locked', classLocked && !showGlobalDisabled\)/,
  "A visible global disabled state must take visual priority over the homeroom lock.",
);

console.log("Global content access contract passed.");
