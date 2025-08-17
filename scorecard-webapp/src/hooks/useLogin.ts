import { useNavigate } from "react-router";
import { useAppState } from "../context/useAppState";
import { login as loginService } from "../services/authService";

export function useLogin() {
  const { setUser, setToken, setRefreshToken } = useAppState();
  const navigate = useNavigate();
  return async (email: string, password: string) => {
    const { access_token, refresh_token, user } = await loginService({ email, password });
    setUser(user);
    setToken(access_token);
    setRefreshToken(refresh_token);
    navigate("/");
  };
}
