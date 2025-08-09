import CourseList from "../components/CourseList/CourseList";
import AppFooter from "../components/AppFooter";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex h-20 flex-shrink-0 items-center rounded-t-lg bg-white p-4 shadow">
          <div className="flex-1" />
          <h1 className="flex-1 text-center text-2xl font-bold text-gray-900">
            Simple Scorecard
          </h1>
          <Link to="/profile" className="flex-1 text-right text-sm text-blue-500">
            Profile
          </Link>
        </div>
        <div
          className="flex-1 overflow-y-auto overscroll-contain pt-6 pr-2 pb-6 pl-2"
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          <CourseList />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

