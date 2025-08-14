import { useNavigate } from "react-router";
import { useAppState } from "../context/useAppState";

export function useLogout() {
  const { setUser, setToken } = useAppState();
  const navigate = useNavigate();
  return () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };
}
