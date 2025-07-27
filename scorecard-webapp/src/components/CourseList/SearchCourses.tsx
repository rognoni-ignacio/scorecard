import { useState } from "react";
import type { CourseSummary } from "../../types/CourseSummary";
import { useAppState } from "../../context/useAppState";
import type { Hole } from "../../types/Hole";
import { useNavigate } from "react-router-dom";

export default function SearchCourses() {
  const { setCourse } = useAppState();
  const navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCourses, setSearchedCourses] = useState<CourseSummary[]>([]);
  const [noCoursesFound, setNoCoursesFound] = useState(false);

  const searchCoursesAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchLoading(true);
    fetch(
      `${import.meta.env.VITE_API_URL}/external/courses/search?q=${searchQuery}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchLoading(false);
        const foundCourses = data.courses || [];
        if (foundCourses.length > 0) {
          setSearchedCourses(foundCourses);
        } else {
          setSearchedCourses([]);
          setNoCoursesFound(true);
        }
      })
      .catch(() => {
        setSearchLoading(false);
        alert("An error occurred while searching for courses.");
      });
  };

  const handleSelectExternalCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/external/courses/${courseId}`,
      );
      const data = await response.json();
      console.log(data);
      if (data.holes) {
        setCourse({ name: data.name, holes: data.holes as Hole[] });
        navigate("/play");
      } else {
        alert("Course not found!");
      }
    } catch (error) {
      alert(`Failed to load course data. ${error}`);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-center text-lg font-medium text-gray-700">
        Search
      </h2>
      <form onSubmit={searchCoursesAction} className="mb-2 flex gap-2">
        <input
          type="text"
          placeholder="Course name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {searchLoading && (
        <div className="text-center text-gray-500">Searching courses...</div>
      )}
      {noCoursesFound && (
        <div className="text-center text-gray-500">No courses found.</div>
      )}
      {searchedCourses.length > 0 && (
        <div className="mt-2 space-y-3">
          {searchedCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleSelectExternalCourse(course.id)}
              className="w-full cursor-pointer rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
            >
              {course.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
