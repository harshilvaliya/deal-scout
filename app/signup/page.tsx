"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl  text-center py-8 text-red-600 border-b-2 border-red-600 font-bold mb-6">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white border p-6 rounded-lg shadow-2xl"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!name || !email || !password}
            className={`px-4 py-2 text-white rounded ${
              !name || !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 "
            }`}
          >
            Sign Up
          </button>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-red-600">Dont have an acc? </p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="px-4  py-2 bg-gray-300 bg-red-600 rounded"
            >
              <span className=" text-white font-spaceGrotesk duration-300">
                Sign In
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
