import { Routes, Route } from "react-router-dom";
import Scorecard from "./pages/Scorecard";
import CourseList from "./components/CourseList/CourseList";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
                Simple Scorecard
              </h1>
              <CourseList />
            </div>
          </div>
        }
      />
      <Route path="/play" element={<Scorecard />} />
    </Routes>
  );
}

export default App;
