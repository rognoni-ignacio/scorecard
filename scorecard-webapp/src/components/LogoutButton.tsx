import { useLogout } from "../hooks/useLogout";

export default function LogoutButton() {
  const logout = useLogout();
  return (
    <button
      type="button"
      onClick={logout}
      className="cursor-pointer rounded bg-blue-500 p-2 text-white dark:bg-blue-600"
    >
      Logout
    </button>
  );
}
