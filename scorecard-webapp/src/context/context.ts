import { createContext } from "react";
import type { Hole } from "../models/Hole";
import type { User } from "../models/User";

export interface CourseState {
  name: string;
  holes: Hole[];
}

type AppState = {
  course: CourseState | null;
  setCourse: (course: CourseState | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);
