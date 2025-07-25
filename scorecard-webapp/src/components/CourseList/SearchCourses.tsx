import { useState } from "react";
import type { CourseSummary } from "../../types/CourseSummary";

interface CourseListProps {
  onSelectCourse: (courseId: number) => void;
}

export default function SearchCourses({ onSelectCourse }: CourseListProps) {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCourses, setSearchedCourses] = useState<CourseSummary[]>([]);

  const handleSearch = () => {
    setSearchLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/courses/api-search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchLoading(false);
        const foundCourses = data.courses || [];
        if (foundCourses.length > 0) {
          setSearchedCourses(foundCourses);
        } else {
          setSearchedCourses([]);
          alert("Course not found.");
        }
      })
      .catch(() => {
        setSearchLoading(false);
        alert("An error occurred while searching for courses.");
      });
  };

  return (
    <div>
      <h2 className="mb-2 text-center text-lg font-medium text-gray-700">
        Search for a Course
      </h2>
      <div className="mb-2 flex gap-2">
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
      {searchLoading && (
        <div className="text-center text-gray-500">Searching courses...</div>
      )}
      {searchedCourses.length > 0 && (
        <div className="mt-2 space-y-3">
          {searchedCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="w-full cursor-pointer rounded-lg border-2 border-green-500 bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:border-green-600 hover:bg-green-600"
            >
              {course.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
