import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppState } from "./context/useAppState";
import type { Hole } from "./types/Hole";
import Scorecard from "./pages/Scorecard";
import CourseList from "./components/CourseList";
import SimpleScorecardSelection from "./components/SimpleScorecardSelection";
import PredefinedCoursesSelection from "./components/PredefinedCoursesSelection";

function App() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();

  const handleSelectCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`,
      );
      const data = await response.json();
      if (data.holes) {
        setCourse(data.holes as Hole[]);
        navigate("/play");
      } else {
        alert("Course not found!");
      }
    } catch (error) {
      alert(`Failed to load course data. ${error}`);
    }
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
                <SimpleScorecardSelection />
                <PredefinedCoursesSelection
                  onSelectCourse={handleSelectCourse}
                />
                <CourseList onSelectCourse={handleSelectCourse} />
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
