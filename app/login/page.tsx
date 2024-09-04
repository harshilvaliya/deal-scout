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

      console.log("Response:", response);
      console.log("Data:", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      const { userId, userName } = data;

      // Construct URL with query parameters
      const queryParams = new URLSearchParams({
        userId: userId,
        username: userName,
      }).toString();

      // Navigate to the homepage with query parameters
      router.push(`/?${queryParams}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
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
        <p className="mb-4 text-sm">
          Forgot Password?{" "}
          <a href="#" className="text-blue-500">
            Click Here
          </a>
        </p>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!email || !password}
            className={`px-4 py-2 rounded ${
              !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Go to Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
