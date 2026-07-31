"use client";

import { useEffect } from "react";

export default function StemLegacyRedirect({ target }: { target: string }) {
  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <main>
      <a href={target}>이공계 기초 학습지로 이동하기</a>
    </main>
  );
}
