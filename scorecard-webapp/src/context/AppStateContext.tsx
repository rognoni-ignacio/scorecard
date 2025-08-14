import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AppStateContext } from "./context";
import type { Course } from "../models/Course";
import type { User } from "../models/User";
import { getMe } from "../services/authService";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (token) {
      getMe(token)
        .then(setUser)
        .catch(() => {
          setToken(null);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [token, setToken]);

  return (
    <AppStateContext.Provider
      value={{ course, setCourse, user, setUser, token, setToken, theme, setTheme }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
