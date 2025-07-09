import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppState } from "./context/useAppState";
import Scorecard from "./pages/Scorecard";

function App() {
  const { setHoles } = useAppState();
  const navigate = useNavigate();

  const startGame = (holes: number) => {
    setHoles(holes);
    navigate(`/play`);
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
                  How many holes are you playing?
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => startGame(9)}
                    className="w-full cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
                  >
                    Play 9 Holes
                  </button>
                  <button
                    onClick={() => startGame(18)}
                    className="w-full cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
                  >
                    Play 18 Holes
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
