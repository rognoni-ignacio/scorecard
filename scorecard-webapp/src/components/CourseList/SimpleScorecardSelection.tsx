import { useNavigate } from "react-router";
import { useAppState } from "../../context/useAppState";
import type { Hole } from "../../models/Hole";

export default function SimpleScorecardSelection() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();

  const simpleScorecard = (holes: number): Hole[] =>
    Array.from({ length: holes }, (_, i) => ({ number: i + 1, par: 0 }));

  const startSimpleScorecard = (holes: number) => {
    setCourse({ name: `Simple ${holes} Holes`, holes: simpleScorecard(holes) });
    navigate("/play");
  };

  return (
    <div>
      <div className="space-y-3">
        <button
          onClick={() => startSimpleScorecard(9)}
          className="w-full cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
        >
          9 Holes
        </button>
        <button
          onClick={() => startSimpleScorecard(18)}
          className="w-full cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
        >
          18 Holes
        </button>
      </div>
    </div>
  );
}
