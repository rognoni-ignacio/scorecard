import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppState } from "./context/useAppState";
import type { Hole } from "./types/Hole";
import Scorecard from "./pages/Scorecard";

function App() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();

  const demoGolfClub: Hole[] = [
    { number: 1, par: 4 },
    { number: 2, par: 3 },
    { number: 3, par: 5 },
    { number: 4, par: 4 },
    { number: 5, par: 4 },
    { number: 6, par: 3 },
    { number: 7, par: 5 },
    { number: 8, par: 4 },
    { number: 9, par: 4 },
  ];

  const demoChampionship: Hole[] = [
    { number: 1, par: 4 },
    { number: 2, par: 4 },
    { number: 3, par: 5 },
    { number: 4, par: 3 },
    { number: 5, par: 4 },
    { number: 6, par: 5 },
    { number: 7, par: 3 },
    { number: 8, par: 4 },
    { number: 9, par: 4 },
    { number: 10, par: 5 },
    { number: 11, par: 4 },
    { number: 12, par: 3 },
    { number: 13, par: 4 },
    { number: 14, par: 5 },
    { number: 15, par: 4 },
    { number: 16, par: 3 },
    { number: 17, par: 4 },
    { number: 18, par: 5 },
  ];

  // Simple scorecard (no par info)
  const simpleScorecard = (holes: number): Hole[] =>
    Array.from({ length: holes }, (_, i) => ({ number: i + 1, par: 0 }));

  const startDemoGolfClub = () => {
    setCourse(demoGolfClub);
    navigate("/play");
  };
  const startDemoChampionship = () => {
    setCourse(demoChampionship);
    navigate("/play");
  };
  const startSimpleScorecard = (holes: number) => {
    setCourse(simpleScorecard(holes));
    navigate("/play");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
                Golf Scorecard
              </h1>
              <div className="space-y-6">
                <h2 className="text-center text-lg font-medium text-gray-700">
                  Choose a course to play:
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={startDemoGolfClub}
                    className="w-full cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
                  >
                    Demo Golf Club (9 Holes)
                  </button>
                  <button
                    onClick={startDemoChampionship}
                    className="w-full cursor-pointer rounded-lg border-2 border-green-500 bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:border-green-600 hover:bg-green-600"
                  >
                    Demo Championship (18 Holes)
                  </button>
                  <button
                    onClick={() => startSimpleScorecard(9)}
                    className="w-full cursor-pointer rounded-lg border-2 border-gray-400 bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:border-gray-500 hover:bg-gray-300"
                  >
                    Simple Scorecard (9 Holes)
                  </button>
                  <button
                    onClick={() => startSimpleScorecard(18)}
                    className="w-full cursor-pointer rounded-lg border-2 border-gray-400 bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:border-gray-500 hover:bg-gray-300"
                  >
                    Simple Scorecard (18 Holes)
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/play" element={<Scorecard />} />
    </Routes>
  );
}

export default App;
