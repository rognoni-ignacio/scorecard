import { useEffect, useState } from "react";
import type { CourseSummary } from "../../types/CourseSummary";

interface CourseListProps {
  onSelectCourse: (courseId: number) => void;
}

export default function PredefinedCoursesSelection({
  onSelectCourse,
}: CourseListProps) {
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
            onClick={() => onSelectCourse(course.id)}
            className="w-full cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
          >
            {course.name}
          </button>
        ))}
      </div>
    </div>
  );
}
