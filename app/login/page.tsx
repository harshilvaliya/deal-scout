"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-5xl text-center py-8 text-red-600 font-bold">
        Log In
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border-2 border-black border-dashed"
      >
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-dashed border-black rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-dashed border-black rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
          />
        </div>
        <div className="flex flex-col gap-4 justify-between">
          <button
            type="submit"
            disabled={!email || !password}
            className={`px-4 py-2 text-white rounded ${
              !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 "
            }`}
          >
            Log In
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p
              onClick={() => router.push("/signup")}
              className="text-sm underline text-red-600 cursor-pointer"
            >
              Don't have an account? Sign Up
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
