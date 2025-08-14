import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAppState } from "../context/useAppState";

export default function RequireAuth({ children }: PropsWithChildren) {
  const { user, token } = useAppState();
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  if (!user && token) {
    return null;
  }
  return children;
}
