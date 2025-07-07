import type { ReactNode } from "react";
import { useState } from "react";
import { AppStateContext } from "./context";

type AppState = {
  holes: number | null;
  setHoles: (holes: number) => void;
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [holes, setHoles] = useState<number | null>(null);

  return (
    <AppStateContext.Provider value={{ holes, setHoles }}>
      {children}
    </AppStateContext.Provider>
  );
}