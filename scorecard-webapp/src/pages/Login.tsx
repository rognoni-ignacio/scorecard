import { FormEvent, useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [name, setName] = useState("");
  const login = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    login({ id: crypto.randomUUID(), name: trimmed });
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="rounded border p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
