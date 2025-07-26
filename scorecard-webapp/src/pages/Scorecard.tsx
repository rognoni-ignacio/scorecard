import { useEffect, useState } from "react";
import { useAppState } from "../context/useAppState";
import { useBlocker, useNavigate } from "react-router-dom";

export default function Scorecard() {
  const navigate = useNavigate();
  const { course } = useAppState();
  const [strokes, setStrokes] = useState<number[]>(
    Array(course?.length ?? 0).fill(0),
  );
  const totalStrokes = strokes.reduce((sum, s) => sum + s, 0);
  const isGameInProgress = strokes.some((s) => s > 0);

  const blocker = useBlocker(isGameInProgress);

  useEffect(() => {
    if (!course) {
      navigate("/");
    }
  }, [course, navigate]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      if (
        window.confirm("A match is in play. Do you really want to go back?")
      ) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  const handleStrokesChange = (hole: number, strokes: number) => {
    setStrokes((prev: number[]) =>
      prev.map((s, i) => (i === hole ? Math.max(0, strokes) : s)),
    );
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSaveRound = async () => {
    alert("Feature to be added...");
  };

  const isRoundComplete = strokes.every((s) => s > 0);

  if (!course) {
    return null;
  }

  // Calculate total par and relative score if par is present
  const hasPar = course.some((h) => h.par && h.par > 0);
  const totalPar = hasPar
    ? course.reduce((sum, h) => sum + (h.par || 0), 0)
    : null;
  const relativeScore = hasPar ? totalStrokes - (totalPar ?? 0) : null;

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex h-20 flex-shrink-0 items-center justify-between rounded-t-lg bg-white p-4 shadow">
          <button
            className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
            onClick={handleGoBack}
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold text-gray-900">
            Scorecard
          </h1>
          {hasPar && totalPar !== null ? (
            <span className="ml-2 text-sm font-semibold text-blue-600">
              Par {totalPar}
            </span>
          ) : (
            <div className="w-12" />
          )}
        </div>
        <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto overscroll-contain px-4 py-2">
          {course.map((hole, i) => (
            <li
              key={hole.number}
              className="flex items-center justify-between py-3"
            >
              <span className="text-lg font-medium text-gray-700">
                Hole {hole.number}
                {hasPar && hole.par > 0 && (
                  <span className="ml-2 text-sm text-gray-500">
                    Par {hole.par}
                  </span>
                )}
              </span>
              <div className="flex items-center gap-4">
                {strokes[i] > 0 && (
                  <button
                    className="h-10 w-10 cursor-pointer rounded-lg bg-gray-200 transition-colors hover:bg-gray-300"
                    onClick={() =>
                      handleStrokesChange(i, Math.max(0, strokes[i] - 1))
                    }
                  >
                    -
                  </button>
                )}
                <span>{strokes[i]}</span>
                <button
                  className="h-10 w-10 cursor-pointer rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600"
                  onClick={() => handleStrokesChange(i, strokes[i] + 1)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex-shrink-0 rounded-b-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="flex items-center gap-2 text-2xl font-bold text-blue-600">
              {totalStrokes}
              {hasPar && relativeScore !== null && (
                <span
                  className={
                    "inline-block w-10 text-center align-middle " +
                    (relativeScore < 0
                      ? "text-green-600"
                      : relativeScore > 0
                        ? "text-red-600"
                        : "text-gray-500")
                  }
                >
                  {relativeScore > 0
                    ? `+${relativeScore}`
                    : relativeScore === 0
                      ? "E"
                      : relativeScore}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={handleSaveRound}
            className="w-full cursor-pointer rounded-lg bg-blue-500 py-4 text-xl font-bold text-white shadow transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isRoundComplete}
          >
            Save round
          </button>
        </div>
      </div>
    </div>
  );
}
