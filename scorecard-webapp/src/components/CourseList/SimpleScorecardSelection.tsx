import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/useAppState";
import type { Hole } from "../../types/Hole";

export default function SimpleScorecardSelection() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();

  const simpleScorecard = (holes: number): Hole[] =>
    Array.from({ length: holes }, (_, i) => ({ number: i + 1, par: 0 }));

  const startSimpleScorecard = (holes: number) => {
    setCourse(simpleScorecard(holes));
    navigate("/play");
  };

  return (
    <div>
      <h2 className="mb-2 text-center text-lg font-medium text-gray-700">
        Simple Scorecard
      </h2>
      <div className="space-y-3">
        <button
          onClick={() => startSimpleScorecard(9)}
          className="w-full cursor-pointer rounded-lg border-2 border-gray-400 bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:border-gray-500 hover:bg-gray-300"
        >
          9 Holes
        </button>
        <button
          onClick={() => startSimpleScorecard(18)}
          className="w-full cursor-pointer rounded-lg border-2 border-gray-400 bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:border-gray-500 hover:bg-gray-300"
        >
          18 Holes
        </button>
      </div>
    </div>
  );
}
