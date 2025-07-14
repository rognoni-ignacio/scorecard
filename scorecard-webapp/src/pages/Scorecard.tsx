import { useState } from "react";
import { useAppState } from "../context/useAppState";
import { useNavigate } from "react-router-dom";

export default function Scorecard() {
  const navigate = useNavigate();
  const { holes } = useAppState();
  const [strokes, setStrokes] = useState<number[]>(Array(holes ?? 0).fill(0));
  const totalStrokes = strokes.reduce((sum, s) => sum + s, 0);

  const handleStrokesChange = (hole: number, strokes: number) => {
    setStrokes((prev: number[]) =>
      prev.map((s, i) => (i === hole ? Math.max(0, strokes) : s)),
    );
  };

  const handleSaveRound = async () => {
    const url = `${import.meta.env.VITE_API_URL}/test-connection`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      alert(JSON.stringify(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isRoundComplete = strokes.every((s) => s > 0);

  if (!holes)
    return <div className="mt-8 text-center">No game in progress.</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between rounded-t-lg bg-white p-4 shadow">
          <button
            className="rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
            onClick={() => navigate("/")}
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold text-gray-900">
            Scorecard
          </h1>
          {/* Empty div to balance the flex layout, same width as the button */}
          <div className="w-12" />
        </div>
        {/* Scrollable List */}
        <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto px-4 py-2">
          {strokes.map((_, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <span className="text-lg font-medium text-gray-700">
                Hole {i + 1}
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
        {/* Footer */}
        <div className="flex-shrink-0 rounded-b-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {totalStrokes}
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
