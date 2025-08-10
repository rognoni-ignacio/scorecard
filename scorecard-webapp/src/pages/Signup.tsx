import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";
import AppFooter from "../components/AppFooter";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password) return;
    login({ id: crypto.randomUUID(), name: trimmedName });
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex h-20 flex-shrink-0 items-center justify-center rounded-t-lg bg-white p-4 shadow">
          <h1 className="text-2xl font-bold text-gray-900">Simple Scorecard</h1>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <p className="text-center text-gray-600">Create an account to start tracking your golf scores</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded border p-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded border p-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded border p-2"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 p-2 text-white"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
