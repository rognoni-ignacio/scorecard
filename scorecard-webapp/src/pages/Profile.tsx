import LogoutButton from "../components/LogoutButton";
import { useAppState } from "../context/useAppState";

export default function Profile() {
  const { user } = useAppState();
  if (!user) return null;

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-4 rounded bg-white p-6 shadow">
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
