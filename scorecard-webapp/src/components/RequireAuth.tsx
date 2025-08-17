import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAppState } from "../context/useAppState";

export default function RequireAuth({ children }: PropsWithChildren) {
  const { user } = useAppState();
  if (user === undefined) {
    return null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
