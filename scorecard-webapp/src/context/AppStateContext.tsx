import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AppStateContext } from "./context";
import type { Course } from "../models/Course";
import type { User } from "../models/User";
import { getMe, refresh } from "../services/authService";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        try {
          await refresh();
          const me = await getMe();
          setUser(me);
        } catch {
          setUser(null);
        }
      }
    };
    loadUser();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        course,
        setCourse,
        user,
        setUser,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
