const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sfxPath = path.join(root, "assets", "sound", "game-sfx.js");
const musicControlPath = path.join(root, "assets", "sound", "music-control.js");
const musicControlCssPath = path.join(root, "assets", "sound", "music-control.css");
const hubPath = path.join(root, "index.html");
const fruitBellPath = path.join(root, "learning", "games", "fruitbell", "fruitbell.html");
const voyagePath = path.join(root, "learning", "academics", "age-of-exploration", "public", "index.html");

for (const filePath of [sfxPath, musicControlPath, musicControlCssPath, hubPath, fruitBellPath, voyagePath]) {
    assert.ok(fs.existsSync(filePath), `Missing sound effect file: ${filePath}`);
}

const sfxSource = fs.readFileSync(sfxPath, "utf8");
new vm.Script(sfxSource, { filename: sfxPath });
for (const soundName of ["click", "bell", "card", "stone", "success", "error", "tick"]) {
    assert.ok(sfxSource.includes(`${soundName}:`), `Missing synthesized ${soundName} sound.`);
}
assert.ok(sfxSource.includes('latencyHint: "interactive"'), "Sound effects should request an interactive low-latency audio context.");
assert.ok(sfxSource.includes('document.addEventListener("pointerdown"'), "Pointer feedback should begin on pointerdown.");
assert.ok(!sfxSource.includes("data:audio"), "Shared effects should be synthesized instead of decoding embedded audio.");

const musicControlSource = fs.readFileSync(musicControlPath, "utf8");
new vm.Script(musicControlSource, { filename: musicControlPath });
assert.ok(musicControlSource.includes('new URL("game-sfx.js", currentScript.src)'), "Music-enabled games should load the shared effect module.");
assert.ok(musicControlSource.includes("classmusicchange"), "Music controls should publish the shared mute and volume state.");
assert.ok(musicControlSource.includes('id="musicKnob"'), "Shared music volume should use the compact knob control.");
assert.ok(musicControlSource.includes('id="sfxKnob"'), "Shared effect volume should use the compact knob control.");
assert.ok(!musicControlSource.includes("unified-music-segment"), "The oversized segmented volume bar should not return.");

const musicControlCss = fs.readFileSync(musicControlCssPath, "utf8");
assert.ok(musicControlCss.includes(".unified-audio-knob"), "Shared audio controls need the compact knob styling.");
assert.ok(!/@media[\s\S]*?\.unified-music-control\s*\{[^}]*display:\s*none/.test(musicControlCss), "Compact knobs should remain available on touch devices.");

const voyage = fs.readFileSync(voyagePath, "utf8");
assert.ok(voyage.includes('id="bgmKnob"'), "World Voyage should use the same compact music knob.");
assert.ok(!voyage.includes('id="bgmVolume"'), "World Voyage should not keep its old volume slider.");

const hub = fs.readFileSync(hubPath, "utf8");
const gameLinks = [...hub.matchAll(/href="(learning\/games\/[^"]+)"/g)].map((match) => {
    const href = match[1].split(/[?#]/, 1)[0];
    return href.endsWith("/") ? `${href}index.html` : `${href}.html`;
});
assert.ok(gameLinks.length >= 15, "Expected the local game catalog in the hub.");
for (const relativePath of gameLinks) {
    const gameHtml = fs.readFileSync(path.join(root, ...relativePath.split("/")), "utf8");
    const hasSharedEffects = gameHtml.includes("assets/sound/game-sfx.js") || gameHtml.includes("assets/sound/music-control.js");
    assert.ok(hasSharedEffects, `${relativePath} does not load shared button effects.`);
}

const fruitBell = fs.readFileSync(fruitBellPath, "utf8");
assert.ok(fruitBell.includes('id="bellBtn" class="bell" type="button" data-sfx="none"'), "The bell should not also play a generic click.");
assert.ok(fruitBell.includes('id="flipBtn" class="flip" data-sfx="card"'), "Card flips should use the card effect.");
assert.ok(fruitBell.includes("playBrightBell();"), "Fruit Bell should retain its original dedicated bell sound.");
assert.ok(!/queueMicrotask\(playBrightBell\)/.test(fruitBell), "The bell effect should not be deferred to a microtask.");

console.log(`game-sfx-unit: ${gameLinks.length} local games share synthesized click effects; Fruit Bell keeps its original instant bell and card sound`);
