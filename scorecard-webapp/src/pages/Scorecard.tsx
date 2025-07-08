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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-2">
      <div className="flex h-[90vh] w-full max-w-md flex-col rounded-lg bg-white shadow-lg">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 rounded-t-lg bg-white p-4 shadow">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            Scorecard
          </h1>
          {/* Future: course and player info here */}
        </div>
        {/* Scrollable Holes List */}
        <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-2">
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
        {/* Sticky Total Bar */}
        <div className="sticky bottom-0 z-10 rounded-b-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {totalStrokes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
