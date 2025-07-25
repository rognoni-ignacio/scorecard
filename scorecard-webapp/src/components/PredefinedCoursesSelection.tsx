import { useEffect, useState } from "react";
import type { CourseSummary } from "../types/CourseSummary";

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
      <div>
        <h2 className="mb-2 text-lg font-semibold">Available Courses</h2>
        <div className="space-y-3">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="w-full cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
