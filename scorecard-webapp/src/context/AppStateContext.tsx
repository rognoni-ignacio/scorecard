import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AppStateContext } from "./context";
import type { CourseState } from "./context";
import type { User } from "../models/User";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState<CourseState | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.getItem("theme") as "light" | "dark")) ||
      "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AppStateContext.Provider
      value={{ course, setCourse, user, setUser, theme, setTheme }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
