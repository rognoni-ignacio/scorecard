import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Scorecard from "./Scorecard";
import { AppStateContext } from "../context/context";
import type { Course } from "../models/Course";
import { vi } from "vitest";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  useBlocker: () => ({ state: "unblocked", proceed: vi.fn(), reset: vi.fn() }),
}));

function renderScorecard(course: Course) {
  const setCourse = vi.fn();
  const setUser = vi.fn();
  render(
    <AppStateContext.Provider value={{ course, setCourse, user: null, setUser, theme: "light", setTheme: vi.fn() }}>
      <Scorecard />
    </AppStateContext.Provider>,
  );
}

test("allows players to record strokes and enables save when round complete", async () => {
  const course: Course = {
    name: "Test Course",
    holes: [
      { number: 1, par: 3 },
      { number: 2, par: 4 },
    ],
  };
  renderScorecard(course);
  const user = userEvent.setup();
  const saveButton = screen.getByRole("button", { name: /save round/i });
  expect(saveButton).toBeDisabled();

  const plusButtons = screen.getAllByRole("button", { name: "+" });
  await user.click(plusButtons[0]);
  await user.click(plusButtons[1]);

  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("7")).toBeInTheDocument();
  expect(screen.getByText("E")).toBeInTheDocument();
  expect(saveButton).toBeEnabled();
});
