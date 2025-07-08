import { useState } from "react";
import { useAppState } from "../context/useAppState";

export default function Scorecard() {
  const { holes } = useAppState();
  const [strokes, setStrokes] = useState<number[]>(Array(holes ?? 0).fill(0));

  const handleStrokesChange = (hole: number, strokes: number) => {
    setStrokes((prev: number[]) =>
      prev.map((s, i) => (i === hole ? Math.max(0, strokes) : s))
    );
  };

  if (!holes)
    return <div className="text-center mt-8">No game in progress.</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Scorecard</h1>
      <ul className="space-y-3">
        {Array.from({ length: holes }).map((_, i) => (
          <li
            key={i}
            className="flex items-center justify-between bg-white rounded shadow p-3"
          >
            <span className="font-medium text-gray-700">Hole {i + 1}</span>
            <input
              type="number"
              min={0}
              className="w-16 text-center border rounded"
              value={strokes[i]}
              onChange={(e) => handleStrokesChange(i, Number(e.target.value))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
