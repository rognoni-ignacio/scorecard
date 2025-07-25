import { useEffect, useState } from "react";
import type { CourseSummary } from "../types/CourseSummary";

interface CourseListProps {
  onSelectCourse: (courseId: number) => void;
}

export default function CourseList({ onSelectCourse }: CourseListProps) {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchLoading(true);
    // setCourses([]); // Clear previous results // todo: implement once all the data from the API can be recovered
    fetch(`${import.meta.env.VITE_API_URL}/courses/api-search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchLoading(false);
        const foundCourses = data.courses || [];
        if (foundCourses.length > 0) {
          alert(`Found ${foundCourses.length} course(s).`);
          // setCourses(foundCourses); // todo: implement once all the data from the API can be recovered
        } else {
          alert("Course not found.");
        }
      })
      .catch(() => {
        setSearchLoading(false);
        alert("An error occurred while searching for courses.");
      });
  };

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
      {searchLoading && (
        <div className="text-center text-gray-500">Searching courses...</div>
      )}
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
  );
}
