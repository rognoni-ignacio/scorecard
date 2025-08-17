import type { User } from "../models/User";
import type { LoginRequest, SignupRequest, AuthResponse } from "../models/Auth";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, options);
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

export async function login(data: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
}

interface RefreshResponse {
  access_token: string;
}

export async function refresh(): Promise<string> {
  const data = await request<RefreshResponse>("/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  return data.access_token;
}

export async function getMe(token: string): Promise<User> {
  return request<User>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function logout(): Promise<void> {
  await request<unknown>("/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
