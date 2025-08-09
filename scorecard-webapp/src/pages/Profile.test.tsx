import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AppStateContext } from "../context/context";
import Profile from "./Profile";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

test("shows user info and allows logout", async () => {
  const setUser = vi.fn();
  render(
    <AppStateContext.Provider
      value={{ user: { id: "123", name: "Alice" }, setUser, course: null, setCourse: vi.fn() }}
    >
      <Profile />
    </AppStateContext.Provider>,
  );

  expect(screen.getByText(/alice/i)).toBeInTheDocument();
  expect(screen.getByText(/123/)).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /logout/i }));
  expect(setUser).toHaveBeenCalledWith(null);
});
