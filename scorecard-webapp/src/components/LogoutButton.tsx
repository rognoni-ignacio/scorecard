import { useLogout } from "../hooks/useLogout";

export default function LogoutButton() {
  const logout = useLogout();
  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  );
}
