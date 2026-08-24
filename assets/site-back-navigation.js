(() => {
  "use strict";

  if (window.self !== window.top || document.querySelector("site-back-navigation")) return;
  if (["/", "/index.html"].includes(location.pathname)) return;

  const LEGACY_LABEL = /^(?:[←‹◀🏠🏡🌌]\s*)?(?:(?:포털|교사|교사\s*도구|우주\s*관찰)\s*)?(?:메인|홈)(?:\s*화면)?(?:\s*으로)?$/;
  const legacyControls = [...document.querySelectorAll("a, button")].filter(element => {
    const label = String(element.textContent || "").replace(/\s+/g, " ").trim();
    return LEGACY_LABEL.test(label);
  });

  let fallbackHref = "/";
  for (const control of legacyControls) {
    if (control instanceof HTMLAnchorElement && control.href) {
      try {
        const target = new URL(control.href, location.href);
        if (target.origin === location.origin) fallbackHref = target.href;
      } catch (_) {}
    }
    control.dataset.siteBackLegacy = "true";
    control.setAttribute("aria-hidden", "true");
    control.setAttribute("tabindex", "-1");
  }

  const legacyStyle = document.createElement("style");
  legacyStyle.textContent = "[data-site-back-legacy]{display:none!important}";
  document.head.append(legacyStyle);

  const host = document.createElement("site-back-navigation");
  const shadow = host.attachShadow({ mode: "open" });
  shadow.innerHTML = `
    <style>
      :host {
        position: fixed;
        top: max(12px, env(safe-area-inset-top));
        left: max(12px, env(safe-area-inset-left));
        z-index: 2147483647;
        width: 48px;
        height: 48px;
      }
      button {
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        margin: 0;
        padding: 0;
        border: 1px solid rgba(255, 255, 255, .16);
        border-radius: 13px;
        background: rgba(54, 54, 58, .92);
        color: #f4f4f5;
        box-shadow: 0 3px 12px rgba(0, 0, 0, .24);
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        backdrop-filter: blur(8px);
      }
      button:active { transform: scale(.95); background: rgba(72, 72, 77, .96); }
      button:focus-visible { outline: 3px solid #60a5fa; outline-offset: 3px; }
      svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    </style>
    <button type="button" aria-label="뒤로 가기" title="뒤로 가기">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/><path d="M9 12h10"/></svg>
    </button>`;

  const isVisible = element => {
    if (!element || element.hidden) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
  };

  const isGameLayerOpen = () => {
    if (!location.pathname.startsWith("/learning/games/")) return false;
    if (document.body.classList.contains("game-active")) return true;
    const game = document.querySelector("#gameScreen, #game-screen, #game-screen-container, #game");
    const lobby = document.querySelector("#lobbyScreen, #lobby-screen, #lobby-card, #lobby, #entry");
    return isVisible(game) && lobby && !isVisible(lobby);
  };

  shadow.querySelector("button").addEventListener("click", () => {
    const request = new CustomEvent("sitebackrequest", { bubbles: true, cancelable: true });
    if (!window.dispatchEvent(request)) return;
    if (isGameLayerOpen()) {
      location.reload();
      return;
    }

    let referrer;
    try { referrer = document.referrer ? new URL(document.referrer) : null; } catch (_) { referrer = null; }
    if (referrer?.origin === location.origin && history.length > 1) {
      history.back();
      return;
    }
    location.href = fallbackHref;
  });

  document.body.append(host);
})();
