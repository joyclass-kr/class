const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const keyboardPath = path.join(
    root,
    "learning",
    "arts",
    "music-theory",
    "ear-training",
    "keyboard.js"
);
const keyboardSource = fs.readFileSync(keyboardPath, "utf8");

const midiKeyBlocks = [...keyboardSource.matchAll(/key\.dataset\.midi = String\(midi\);([\s\S]*?)key\.setAttribute\("aria-label"/g)];

assert.strictEqual(midiKeyBlocks.length, 2, "Both white and black piano keys should declare their sound behavior.");
midiKeyBlocks.forEach((match) => {
    assert.ok(
        match[1].includes('key.dataset.sfx = "none";'),
        "Piano keys should suppress shared answer effects so the played note remains audible."
    );
});

console.log("ear-training-keyboard-sfx-contract: piano answer keys suppress overlapping shared effects");
