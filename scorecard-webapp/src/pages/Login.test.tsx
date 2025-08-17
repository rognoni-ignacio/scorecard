import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";
import Login from "./Login";
import { AppStateContext } from "../context/context";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));

test("renders app name and description", () => {
  render(
    <AppStateContext.Provider
      value={{
        user: null,
        setUser: vi.fn(),
        course: null,
        setCourse: vi.fn(),
        theme: "light",
        setTheme: vi.fn(),
      }}
    >
      <Login />
    </AppStateContext.Provider>,
  );

  expect(
    screen.getByRole("heading", { name: /simple scorecard/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/track your golf scores with ease/i),
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
