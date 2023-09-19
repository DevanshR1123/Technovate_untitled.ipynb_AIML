"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(userData.email, userData.password);
  };

  return (
    <div className="grid min-w-[24rem] place-self-center">
      <form className="grid gap-6 text-foreground" action="#" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-base" htmlFor="email">
          Email
          <input className="rounded-md border bg-inherit px-4 py-2" name="email" id="email" value={userData["email"]} onChange={handleChange} placeholder="you@example.com" required />
        </label>
        <label className="grid gap-2 text-base" htmlFor="password">
          Password
          <input
            className="rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            id="password"
            value={userData["password"]}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </label>
        <button className="mt-4 rounded bg-green-700 px-4 py-2 text-white disabled:bg-green-800/80" disabled={!userData["email"] || !userData["password"]}>
          Sign In
        </button>
      </form>
    </div>
  );
}
