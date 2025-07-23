import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppState } from "./context/useAppState";
import type { Hole } from "./types/Hole";
import Scorecard from "./pages/Scorecard";
import CourseList from "./components/CourseList";
import { demoEighteenHoles, demoNineHoles } from "./data/demoCourses";

function App() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();

  // Simple scorecard (no par info)
  const simpleScorecard = (holes: number): Hole[] =>
    Array.from({ length: holes }, (_, i) => ({ number: i + 1, par: 0 }));

  const startDemoGolfClub = () => {
    setCourse(demoNineHoles);
    navigate("/play");
  };
  const startDemoChampionship = () => {
    setCourse(demoEighteenHoles);
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
                <CourseList
                  onSelectDemoGolfClub={startDemoGolfClub}
                  onSelectDemoChampionship={startDemoChampionship}
                />
                <div className="space-y-3">
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
