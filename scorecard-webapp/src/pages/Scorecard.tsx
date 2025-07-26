import { useEffect, useState } from "react";
import { useAppState } from "../context/useAppState";
import { useBlocker, useNavigate } from "react-router-dom";

export default function Scorecard() {
  const navigate = useNavigate();
  const { course } = useAppState();
  const [strokes, setStrokes] = useState<number[]>(
    Array(course?.holes.length ?? 0).fill(0),
  );
  const totalStrokes = strokes.reduce(
    (sum, strokesForHole) => sum + strokesForHole,
    0,
  );
  const isGameInProgress = strokes.some((strokesForHole) => strokesForHole > 0);

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

  const handleMinusClick = (holeIndex: number) => {
    setStrokes((previousStrokes) =>
      previousStrokes.map((strokesForHole, currentIndex) =>
        currentIndex === holeIndex
          ? Math.max(0, strokesForHole - 1)
          : strokesForHole,
      ),
    );
  };

  const handlePlusClick = (holeIndex: number) => {
    setStrokes((previousStrokes) =>
      previousStrokes.map((strokesForHole, currentIndex) => {
        if (currentIndex !== holeIndex) {
          return strokesForHole;
        }
        if (strokesForHole === 0) {
          const par = course?.holes[currentIndex].par;
          return par && par > 0 ? par : 1;
        }
        return strokesForHole + 1;
      }),
    );
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSaveRound = async () => {
    alert("Feature to be added...");
  };

  const isRoundComplete = strokes.every((stroke) => stroke > 0);

  if (!course) {
    return null;
  }

  const hasPar = course.holes.some((hole) => hole.par && hole.par > 0);
  const totalPar = hasPar
    ? course.holes.reduce((sum, hole) => sum + (hole.par || 0), 0)
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
            {course.name}
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
          {course.holes.map((hole, i) => (
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
                    onClick={() => handleMinusClick(i)}
                  >
                    -
                  </button>
                )}
                <span>{strokes[i]}</span>
                <button
                  className="h-10 w-10 cursor-pointer rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600"
                  onClick={() => handlePlusClick(i)}
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
