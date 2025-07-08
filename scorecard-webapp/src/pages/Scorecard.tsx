import { useAppState } from "../context/useAppState";

export default function Scorecard() {
  const { holes } = useAppState();

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
            <span className="text-gray-400">[strokes here]</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
