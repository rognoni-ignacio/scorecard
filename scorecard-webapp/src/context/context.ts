import { createContext } from "react";
import type { Hole } from "../types/Hole";

type AppState = {
  course: Hole[] | null;
  setCourse: (course: Hole[]) => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);