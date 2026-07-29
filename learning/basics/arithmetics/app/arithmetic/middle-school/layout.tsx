import type { ReactNode } from "react";
import "../high-school/high-school.css";
import "./middle-school.css";

export default function MiddleSchoolLayout({ children }: { children: ReactNode }) {
  return <div className="middle-school-scope">{children}</div>;
}
