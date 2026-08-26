"use strict";

const assert = require("node:assert/strict");
const deck = require("../learning/literacy-numeracy/reading/deck");

function fixedRandom() {
  return 0.37;
}

const items = Array.from({ length: 15 }, (_, index) => ({ id: `item-${index + 1}` }));

const first = deck.draw(items, 5, null, fixedRandom);
assert.equal(first.items.length, 5);
assert.equal(new Set(first.items.map((item) => item.id)).size, 5);

const wrongId = first.items[0].id;
const afterWrong = deck.recordAnswer(first.history, wrongId, false);
assert.equal(afterWrong.retry[0].dueSession, 3, "A wrong answer should wait two sessions.");

const second = deck.draw(items, 5, afterWrong, fixedRandom);
assert.equal(
  second.items.some((item) => first.history.lastDrawn.includes(item.id)),
  false,
  "Unseen questions should be used before repeating the previous set."
);
assert.equal(
  second.items.some((item) => item.id === wrongId),
  false,
  "A wrong answer should not return immediately."
);

const third = deck.draw(items, 5, second.history, fixedRandom);
assert.equal(
  third.items.some((item) => item.id === wrongId),
  true,
  "A due wrong answer should return after the delay."
);

const corrected = deck.recordAnswer(third.history, wrongId, true);
assert.equal(
  corrected.retry.some((entry) => entry.id === wrongId),
  false,
  "A corrected retry should leave the retry queue."
);

const expandedItems = items.concat({ id: "new-item" });
const expanded = deck.draw(expandedItems, 1, corrected, fixedRandom);
assert.equal(expanded.items[0].id, "new-item", "New bank items should be introduced before repeats.");

const topicItems = Array.from({ length: 12 }, (_, index) => ({
  id: `topic-item-${index + 1}`,
  topicTitle: `topic-${index % 4}`
}));
const topicDraw = deck.draw(topicItems, 4, null, fixedRandom);
assert.equal(
  new Set(topicDraw.items.map((item) => item.topicTitle)).size,
  4,
  "A set should prefer different topics when the bank has enough variety."
);

console.log("Reading question deck unit: OK");
