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
    <>
      <div className="fixed w-[120%] -z-10 rotate-180 -left-10 -bottom-52 -z-1">
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 490"
          xmlns="http://www.w3.org/2000/svg"
          class="transition duration-300 ease-in-out delay-150"
        >
          <style></style>
          <path
            d="M 0,500 L 0,0 C 91.23589743589744,89.24102564102564 182.47179487179488,178.4820512820513 265,198 C 347.5282051282051,217.5179487179487 421.348717948718,167.3128205128205 485,167 C 548.651282051282,166.6871794871795 602.1333333333332,216.26666666666662 690,227 C 777.8666666666668,237.73333333333338 900.1179487179488,209.62051282051286 993,204 C 1085.8820512820512,198.37948717948714 1149.394871794872,215.25128205128203 1219,185 C 1288.605128205128,154.74871794871797 1364.302564102564,77.37435897435898 1440,0 L 1440,500 L 0,500 Z"
            stroke="none"
            stroke-width="0"
            fill="#e43030"
            fill-opacity="1"
            class="transition-all duration-300 ease-in-out delay-150 path-0"
            transform="rotate(-180 720 250)"
          ></path>
        </svg>
      </div>
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
    </>
  );
}
