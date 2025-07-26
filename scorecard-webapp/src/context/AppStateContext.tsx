import type { ReactNode } from "react";
import { useState } from "react";
import { AppStateContext } from "./context";
import type { CourseState } from "./context";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState<CourseState | null>(null);

  return (
    <AppStateContext.Provider value={{ course, setCourse }}>
      {children}
    </AppStateContext.Provider>
  );
}
