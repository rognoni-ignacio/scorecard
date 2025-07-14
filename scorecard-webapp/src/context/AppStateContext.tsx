import type { ReactNode } from "react";
import { useState } from "react";
import { AppStateContext } from "./context";
import type { Hole } from "../types/Hole";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState<Hole[] | null>(null);

  return (
    <AppStateContext.Provider value={{ course, setCourse }}>
      {children}
    </AppStateContext.Provider>
  );
}