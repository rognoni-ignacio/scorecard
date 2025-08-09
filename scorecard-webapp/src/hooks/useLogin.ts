import { useNavigate } from "react-router";
import { useAppState } from "../context/useAppState";
import type { User } from "../models/User";

export function useLogin() {
  const { setUser } = useAppState();
  const navigate = useNavigate();
  return (user: User) => {
    setUser(user);
    navigate("/");
  };
}
