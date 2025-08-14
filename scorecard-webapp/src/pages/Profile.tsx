import LogoutButton from "../components/LogoutButton";
import AppFooter from "../components/AppFooter";
import { useAppState } from "../context/useAppState";
import { useNavigate } from "react-router";

export default function Profile() {
  const { user } = useAppState();
  const navigate = useNavigate();
  if (!user) return null;

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <div className="flex h-20 flex-shrink-0 items-center rounded-t-lg bg-white p-4 shadow dark:bg-gray-900">
          <button
            className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={handleGoBack}
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Profile
          </h1>
          <div className="w-12" />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-6">
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            <span className="font-semibold">ID:</span> {user.id}
          </p>
          <LogoutButton />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
