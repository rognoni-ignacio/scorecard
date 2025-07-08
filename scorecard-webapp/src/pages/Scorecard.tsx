import { useState } from "react";
import { useAppState } from "../context/useAppState";

export default function Scorecard() {
  const { holes } = useAppState();
  const [strokes, setStrokes] = useState<number[]>(Array(holes ?? 0).fill(0));
  const totalStrokes = strokes.reduce((sum, s) => sum + s, 0);

  const handleStrokesChange = (hole: number, strokes: number) => {
    setStrokes((prev: number[]) =>
      prev.map((s, i) => (i === hole ? Math.max(0, strokes) : s)),
    );
  };

  if (!holes)
    return <div className="mt-8 text-center">No game in progress.</div>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-2">
      <div className="mt-4 mb-24 w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Scorecard
        </h1>
        <ul className="space-y-3">
          {Array.from({ length: holes }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3"
            >
              <span className="text-lg font-medium text-gray-700">
                Hole {i + 1}
              </span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-20 rounded-lg border-2 border-gray-300 py-2 text-center text-lg focus:border-blue-400 focus:outline-none"
                value={strokes[i]}
                onChange={(e) => handleStrokesChange(i, Number(e.target.value))}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Sticky total bar at the bottom */}
      <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white py-4 shadow-lg">
        <div className="mx-auto flex max-w-md items-center justify-between px-4">
          <span className="text-lg font-semibold text-gray-700">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            {totalStrokes}
          </span>
        </div>
      </div>
    </div>
  );
}
