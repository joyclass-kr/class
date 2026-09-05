import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "영단어 기초",
  description: "파닉스부터 철자 규칙, 고급 파닉스, 접사와 어휘까지 단계별로 배우는 영어 읽기 과정",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
