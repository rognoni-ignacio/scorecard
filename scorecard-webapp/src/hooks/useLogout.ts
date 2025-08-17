import { useNavigate } from "react-router";
import { useAppState } from "../context/useAppState";
import { logout as logoutService } from "../services/authService";

export function useLogout() {
  const { setUser, setToken } = useAppState();
  const navigate = useNavigate();
  return async () => {
    await logoutService();
    setUser(null);
    setToken(null);
    navigate("/login");
  };
}
