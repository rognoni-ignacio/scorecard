import { useEffect, useState } from "react";
import type { CourseSummary } from "../../types/CourseSummary";
import { useAppState } from "../../context/useAppState";
import { useNavigate } from "react-router-dom";
import type { Hole } from "../../types/Hole";

export default function PredefinedCoursesSelection() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch for main course list
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSelectCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`,
      );
      const data = await response.json();
      setCourse({ name: data.name, holes: data.holes as Hole[] });
      navigate("/play");
    } catch (error) {
      alert(`Failed to load course data. ${error}`);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading courses...</div>;
  }

  return (
    <div>
      <h2 className="mb-2 text-center text-lg font-medium text-gray-700">
        Predefined courses
      </h2>
      <div className="space-y-3">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => handleSelectCourse(course.id)}
            className="w-full cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
          >
            {course.name}
          </button>
        ))}
      </div>
    </div>
  );
}
