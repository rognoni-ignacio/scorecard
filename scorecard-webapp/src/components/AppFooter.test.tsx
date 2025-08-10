import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AppFooter from "./AppFooter";
import { AppStateContext } from "../context/context";

test("renders link to GitHub repository", () => {
  render(
    <AppStateContext.Provider
      value={{ user: null, setUser: vi.fn(), course: null, setCourse: vi.fn(), theme: "light", setTheme: vi.fn() }}
    >
      <AppFooter />
    </AppStateContext.Provider>
  );
  const link = screen.getByRole("link", { name: /github/i });
  expect(link).toHaveAttribute(
    "href",
    "https://github.com/rognoni-ignacio/scorecard",
  );
});
