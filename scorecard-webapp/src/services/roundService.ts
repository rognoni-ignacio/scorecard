import type { Round, SaveRoundRequest } from "../models/Round";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(endpoint: string, token: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options && options.headers ? options.headers : {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }
  return data as T;
}

export async function saveRound(data: SaveRoundRequest, token: string): Promise<Round> {
  return request<Round>("/rounds", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getRounds(token: string): Promise<Round[]> {
  const data = await request<{ rounds: Round[] }>("/rounds", token);
  return data.rounds || [];
}
