import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "수학 OX 문항 검토",
  description: "개념과 대표 오개념을 짧고 정확하게 점검하는 수학 OX 문항 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
