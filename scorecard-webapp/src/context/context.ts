import { createContext } from "react";

type AppState = {
  holes: number | null;
  setHoles: (holes: number) => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);