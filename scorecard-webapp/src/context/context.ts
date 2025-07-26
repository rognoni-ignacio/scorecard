import { createContext } from "react";
import type { Hole } from "../types/Hole";

export type CourseState = {
  name: string;
  holes: Hole[];
};

type AppState = {
  course: CourseState | null;
  setCourse: (course: CourseState | null) => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);