"use client";

import { useEffect } from "react";

const ELEMENTARY_GRADE = /^[1-6]학년$/;

function isElementaryWorksheetInput(target: EventTarget | null): target is HTMLInputElement {
  if (!(target instanceof HTMLInputElement)) return false;
  const sheet = target.closest<HTMLElement>(".worksheet-stage .counting-sheet");
  if (!sheet) return false;
  const grade = sheet.querySelector<HTMLElement>(".counting-sheet-title > span")?.textContent?.trim() ?? "";
  return ELEMENTARY_GRADE.test(grade);
}

export default function ElementaryFocusScroll() {
  useEffect(() => {
    let frame = 0;

    function revealFollowingProblems(event: FocusEvent) {
      if (!isElementaryWorksheetInput(event.target)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const input = event.target as HTMLInputElement;
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const rect = input.getBoundingClientRect();
        const lowerSafeLine = viewportHeight * 0.72;
        if (rect.bottom <= lowerSafeLine) return;
        const targetLine = viewportHeight * 0.5;
        window.scrollBy({ top: rect.top - targetLine, left: 0, behavior: "auto" });
      });
    }

    document.addEventListener("focusin", revealFollowingProblems);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("focusin", revealFollowingProblems);
    };
  }, []);

  return null;
}
