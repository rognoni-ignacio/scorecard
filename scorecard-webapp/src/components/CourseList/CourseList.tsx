import PredefinedCoursesSelection from "./PredefinedCoursesSelection";
import SearchCourses from "./SearchCourses";
import SimpleScorecardSelection from "./SimpleScorecardSelection";

export default function CourseList() {
  return (
    <div className="space-y-6">
      <SimpleScorecardSelection />
      <PredefinedCoursesSelection />
      <SearchCourses />
    </div>
  );
}
