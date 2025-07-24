import { useState } from "react";
import type { CourseSummary } from "../types/CourseSummary";

interface CourseListProps {
  onSelectCourse: (courseId: number) => void;
}

export default function CourseList({ onSelectCourse }: CourseListProps) {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setLoading(true);
    setCourses([]); // Clear previous results
    fetch(`${import.meta.env.VITE_API_URL}/courses?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const foundCourses = data.courses || []; // Correctly access the 'courses' property
        if (foundCourses.length > 0) {
          alert(`Found ${foundCourses.length} course(s).`);
          setCourses(foundCourses);
        } else {
          alert("Course not found.");
        }
      })
      .catch(() => {
        setLoading(false);
        alert("An error occurred while searching for courses.");
      });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading courses...</div>
      ) : (
        courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="w-full cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
          >
            {course.course_name}
          </button>
        ))
      )}
    </div>
  );
}
