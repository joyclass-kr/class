(() => {
    "use strict";
    const LABELS = { reverse: "방향 전환", half: "합계 절반", defuse: "완전 해제", hold: "합계 유지" };
    function createCard(card) {
        const node = document.createElement("div");
        const numeric = card.kind === "number";
        const reducing = numeric && card.value < 0;
        node.className = `bomb-card ${card.kind === "defuse" || reducing ? "bomb-card--cool" : numeric ? "bomb-card--hot" : "bomb-card--gear"}`;
        const value = numeric ? (card.value > 0 ? `+${card.value}` : String(card.value)) : ({ reverse: "↺", half: "½", defuse: "0", hold: "∥" }[card.kind] || "?");
        node.innerHTML = `<span class="bomb-card__corner">${value}</span><strong class="bomb-card__value">${value}</strong><small class="bomb-card__label">${numeric ? (reducing ? "COOL DOWN" : "CHARGE") : LABELS[card.kind] || "GEAR"}</small>`;
        return node;
    }
    window.Bomb77Cards = Object.freeze({ createCard });
})();
