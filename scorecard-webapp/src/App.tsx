import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppState } from "./context/useAppState";
import Scorecard from "./pages/Scorecard";

function App() {
  const { setHoles } = useAppState();
  const navigate = useNavigate();

  const startGame = (holes: number) => {
    setHoles(holes);
    navigate(`/scorecard`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Golf Scorecard
              </h1>
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-700 text-center">
                  How many holes are you playing?
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => startGame(9)}
                    className="w-full py-3 px-4 rounded-lg border-2 font-medium transition-colors bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 cursor-pointer"
                  >
                    Play 9 Holes
                  </button>
                  <button
                    onClick={() => startGame(18)}
                    className="w-full py-3 px-4 rounded-lg border-2 font-medium transition-colors bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 cursor-pointer"
                  >
                    Play 18 Holes
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/scorecard" element={<Scorecard />} />
    </Routes>
  );
}

export default App;
