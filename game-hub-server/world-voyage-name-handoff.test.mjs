import assert from "node:assert/strict";
import fs from "node:fs";

const home = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const voyage = fs.readFileSync(
  new URL("../learning/inquiry/age-of-exploration/public/index.html", import.meta.url),
  "utf8",
);

assert.match(
  home,
  /<a id="cds95GameLink"[\s\S]*?data-requires-player="true"[\s\S]*?data-player-handoff="query"/,
  "The home page must pass its authoritative player name to World Voyage.",
);
assert.doesNotMatch(
  voyage,
  /<input[^>]+id="studentName"/,
  "World Voyage must not ask for a separate player name.",
);
assert.match(
  voyage,
  /<strong id="playerIdentity"[^>]*aria-live="polite"><\/strong>/,
  "World Voyage should display the home-page identity as read-only text.",
);
assert.match(
  voyage,
  /const name=mainPlayerName;/,
  "Joining World Voyage must use only the identity handed off by the home page.",
);
assert.doesNotMatch(
  voyage,
  /localStorage\.setItem\(['"]uw3-name['"]/,
  "World Voyage must not keep an independent player-name setting.",
);

console.log("World Voyage player identity handoff contract passed.");
