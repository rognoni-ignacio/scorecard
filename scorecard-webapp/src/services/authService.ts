import type { User } from "../models/User";
import type { LoginRequest, SignupRequest } from "../models/Auth";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }
  return data as T;
}

export async function signup(data: SignupRequest): Promise<User> {
  return request<User>("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginRequest): Promise<User> {
  const { user } = await request<{ user: User }>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return user;
}

export async function refresh(): Promise<void> {
  await request<unknown>("/auth/refresh", {
    method: "POST",
  });
}

export async function getMe(): Promise<User> {
  return request<User>("/auth/me");
}

export async function logout(): Promise<void> {
  await request<unknown>("/auth/logout", {
    method: "POST",
  });
}
