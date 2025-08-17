import { useNavigate } from "react-router";
import { useAppState } from "../context/useAppState";
import { login as loginService } from "../services/authService";

export function useLogin() {
  const { setUser } = useAppState();
  const navigate = useNavigate();
  return async (email: string, password: string) => {
    const user = await loginService({ email, password });
    setUser(user);
    navigate("/");
  };
}
