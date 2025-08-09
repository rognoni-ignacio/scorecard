import { useNavigate } from "react-router";
import { useAppState } from "../context/useAppState";

export function useLogout() {
  const { setUser } = useAppState();
  const navigate = useNavigate();
  return () => {
    setUser(null);
    navigate("/login");
  };
}
