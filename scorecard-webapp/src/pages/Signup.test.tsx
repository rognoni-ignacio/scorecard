import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";
import Signup from "./Signup";
import { AppStateContext } from "../context/context";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));

test("renders signup form", () => {
  render(
    <AppStateContext.Provider value={{ user: null, setUser: vi.fn(), course: null, setCourse: vi.fn() }}>
      <Signup />
    </AppStateContext.Provider>,
  );

  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});
