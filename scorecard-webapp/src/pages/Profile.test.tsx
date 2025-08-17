import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AppStateContext } from "../context/context";
import Profile from "./Profile";
import { logout } from "../services/authService";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../services/authService", () => ({
  logout: vi.fn().mockResolvedValue(undefined),
}));

test("shows user info and allows navigation and logout", async () => {
  const setUser = vi.fn();
  const setToken = vi.fn();
  render(
    <AppStateContext.Provider
      value={{
        user: { id: 123, name: "Alice", email: "alice@example.com" },
        setUser,
        token: "token",
        setToken,
        course: null,
        setCourse: vi.fn(),
        theme: "light",
        setTheme: vi.fn(),
      }}
    >
      <Profile />
    </AppStateContext.Provider>,
  );

  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/123/)).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /back/i }));
  expect(mockNavigate).toHaveBeenCalledWith("/");

  await user.click(screen.getByRole("button", { name: /logout/i }));
  expect(logout).toHaveBeenCalled();
  expect(setUser).toHaveBeenCalledWith(null);
  expect(setToken).toHaveBeenCalledWith(null);
});
