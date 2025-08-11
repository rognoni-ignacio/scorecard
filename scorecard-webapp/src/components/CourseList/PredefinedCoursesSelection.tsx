import { useEffect, useState } from "react";
import type { CourseSummary } from "../../models/CourseSummary";
import { useAppState } from "../../context/useAppState";
import { useNavigate } from "react-router";
import { getCourses, getCourse } from "../../services/courseService";

export default function PredefinedCoursesSelection() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleSelectCourse = async (courseId: number) => {
    try {
      const course = await getCourse(courseId);
      setCourse(course);
      navigate("/play");
    } catch (error) {
      alert(`Failed to load course data. ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Loading courses...
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
        Predefined courses
      </h2>
      <div className="space-y-3">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => handleSelectCourse(course.id)}
            className="w-full cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-100 dark:hover:border-blue-600 dark:hover:bg-blue-800"
          >
            {course.name}
          </button>
        ))}
      </div>
    </div>
  );
}
