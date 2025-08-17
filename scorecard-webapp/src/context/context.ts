import { createContext } from "react";
import type { User } from "../models/User";
import type { Course } from "../models/Course";

type AppState = {
  course: Course | null;
  setCourse: (course: Course | null) => void;
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);
