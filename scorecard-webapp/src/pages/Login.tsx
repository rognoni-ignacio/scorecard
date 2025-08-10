import { type FormEvent, useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";
import AppFooter from "../components/AppFooter";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !password) return;
    login({ id: crypto.randomUUID(), name: trimmed });
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <div className="flex h-20 flex-shrink-0 items-center justify-center rounded-t-lg bg-white p-4 shadow dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Simple Scorecard</h1>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Track your golf scores with ease
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded border p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded border p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-500 py-4 text-xl font-bold text-white shadow transition-colors hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800"
              disabled={!name.trim() || !password}
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 dark:text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
