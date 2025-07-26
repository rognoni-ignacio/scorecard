import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/useAppState";
import type { Hole } from "../../types/Hole";
import PredefinedCoursesSelection from "./PredefinedCoursesSelection";
import SearchCourses from "./SearchCourses";
import SimpleScorecardSelection from "./SimpleScorecardSelection";

export default function CourseList() {
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
  };

  return (
    <div className="space-y-6">
      <SimpleScorecardSelection />
      <PredefinedCoursesSelection onSelectCourse={handleSelectCourse} />
      <SearchCourses onSelectCourse={handleSelectCourse} />
    </div>
  );
}
