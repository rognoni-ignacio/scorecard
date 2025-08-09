import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-50 text-center">
      <div>
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mb-8 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
