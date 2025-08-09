import { FormEvent, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import AppFooter from "../components/AppFooter";

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
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex h-20 flex-shrink-0 items-center justify-center rounded-t-lg bg-white p-4 shadow">
          <h1 className="text-2xl font-bold text-gray-900">Simple Scorecard</h1>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6 p-6">
          <p className="text-center text-gray-600">Track your golf scores with ease.</p>
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
        <AppFooter />
      </div>
    </div>
  );
}
