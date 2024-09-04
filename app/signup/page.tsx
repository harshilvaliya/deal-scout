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
      <h1 className="text-5xl text-center py-8 text-red-600 font-bold">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border-2 border-black border-dashed"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-dashed border-black rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
          />
        </div>
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
            disabled={!name || !email || !password}
            className={`px-4 py-2 text-white rounded ${
              !name || !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 "
            }`}
          >
            Sign Up
          </button>
          <div className="flex flex-col gap-2 items-center">
            <p
              onClick={() => router.push("/login")}
              className="text-sm underline text-red-600 cursor-pointer"
            >
              Already have an acc? Log in{" "}
            </p>
            {/* <button
              type="button"
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-red-500 rounded w-full"
            >
              <span className="text-white font-spaceGrotesk duration-300">
                Sign In
              </span>
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
