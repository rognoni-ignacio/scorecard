import type { ReactNode } from "react";
import { useState } from "react";
import { AppStateContext } from "./context";
import type { CourseState } from "./context";
import type { User } from "../models/User";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState<CourseState | null>(null);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppStateContext.Provider value={{ course, setCourse, user, setUser }}>
      {children}
    </AppStateContext.Provider>
  );
}
