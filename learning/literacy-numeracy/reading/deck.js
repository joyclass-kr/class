(function exposeReadingQuestionDeck(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ReadingQuestionDeck = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createReadingQuestionDeck() {
  "use strict";

  const HISTORY_VERSION = 1;

  function shuffle(values, random = Math.random) {
    const result = values.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function uniqueValidIds(values, validIds) {
    const seen = new Set();
    return (Array.isArray(values) ? values : []).filter((id) => {
      if (typeof id !== "string" || !validIds.has(id) || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }

  function normalizeHistory(history, itemIds) {
    const validIds = new Set(itemIds);
    const source = history && history.version === HISTORY_VERSION ? history : {};
    const retry = (Array.isArray(source.retry) ? source.retry : [])
      .filter((entry) => entry && validIds.has(entry.id))
      .map((entry) => ({
        id: entry.id,
        dueSession: Math.max(0, Number(entry.dueSession) || 0)
      }));
    return {
      version: HISTORY_VERSION,
      session: Math.max(0, Number(source.session) || 0),
      known: uniqueValidIds(source.known, validIds),
      remaining: uniqueValidIds(source.remaining, validIds),
      lastDrawn: uniqueValidIds(source.lastDrawn, validIds),
      retry
    };
  }

  function draw(items, count = 5, history = null, random = Math.random) {
    const available = Array.isArray(items)
      ? items.filter((item) => item && typeof item.id === "string")
      : [];
    const itemById = new Map(available.map((item) => [item.id, item]));
    const itemIds = [...itemById.keys()];
    const targetCount = Math.min(Math.max(0, Number(count) || 0), itemIds.length);
    const next = normalizeHistory(history, itemIds);
    next.session += 1;

    const selected = [];
    const selectedIds = new Set();
    const selectedFamilies = new Set();
    const lastDrawn = new Set(next.lastDrawn);
    const familyFor = (id) => {
      const item = itemById.get(id);
      return item?.familyId || item?.topicTitle || id;
    };
    const add = (id, allowSameFamily = false) => {
      if (!itemById.has(id) || selectedIds.has(id) || selected.length >= targetCount) return;
      const family = familyFor(id);
      if (!allowSameFamily && selectedFamilies.has(family)) return;
      selectedIds.add(id);
      selectedFamilies.add(family);
      selected.push(id);
    };
    const fill = (ids) => {
      ids.forEach((id) => add(id, false));
      if (selected.length < targetCount) ids.forEach((id) => add(id, true));
    };

    const dueRetry = shuffle(
      next.retry
        .filter((entry) => entry.dueSession <= next.session && !lastDrawn.has(entry.id))
        .map((entry) => entry.id),
      random
    );

    const known = new Set(next.known);
    const newIds = itemIds.filter((id) => !known.has(id));
    const queue = [
      ...shuffle(newIds, random),
      ...next.remaining.filter((id) => !newIds.includes(id))
    ];
    fill(dueRetry.concat(queue));

    let remaining = queue.filter((id) => !selectedIds.has(id));
    if (selected.length < targetCount) {
      const freshCycle = itemIds.filter((id) => !selectedIds.has(id));
      const notRecent = shuffle(freshCycle.filter((id) => !lastDrawn.has(id)), random);
      const recent = shuffle(freshCycle.filter((id) => lastDrawn.has(id)), random);
      const resetQueue = notRecent.concat(recent);
      fill(resetQueue);
      remaining = resetQueue.filter((id) => !selectedIds.has(id));
    }

    next.known = itemIds;
    next.remaining = remaining;
    next.lastDrawn = selected.slice();
    return {
      items: selected.map((id) => itemById.get(id)),
      history: next
    };
  }

  function recordAnswer(history, itemId, correct) {
    const next = {
      ...(history || {}),
      retry: Array.isArray(history?.retry) ? history.retry.slice() : []
    };
    next.retry = next.retry.filter((entry) => entry?.id !== itemId);
    if (!correct && typeof itemId === "string") {
      next.retry.push({
        id: itemId,
        dueSession: Math.max(0, Number(next.session) || 0) + 2
      });
    }
    return next;
  }

  return {
    HISTORY_VERSION,
    draw,
    normalizeHistory,
    recordAnswer,
    shuffle
  };
});
