import type { Round, SaveRoundRequest } from "../models/Round";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }
  return data as T;
}

export async function saveRound(data: SaveRoundRequest): Promise<Round> {
  return request<Round>("/rounds", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getRounds(): Promise<Round[]> {
  const data = await request<{ rounds: Round[] }>("/rounds");
  return data.rounds || [];
}
