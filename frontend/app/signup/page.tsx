"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const { signUp } = useAuth();

  const router = useRouter();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { first_name, last_name, phone, email, password, password_confirm } = userData;
    if (password !== password_confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const sessionData = await signUp(email, password, { first_name, last_name, phone });
    if (sessionData) {
      toast.success("Sign up successful");
      router.push("/profile");
    }
  };

  return (
    <div className="m-auto grid min-w-[24rem] place-self-center sm:w-[32rem]">
      <form className="sm:grid-cols-2 grid gap-6 text-foreground" onSubmit={handleSubmit}>
        <label className="text-md grid gap-2" htmlFor="first_name">
          First Name
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="John" type="text" name="first_name" id="first_name" onChange={handleChange} value={userData["first_name"]} />
        </label>
        <label className="text-md grid gap-2" htmlFor="last_name">
          Last Name
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="Doe" type="text" name="last_name" id="last_name" onChange={handleChange} value={userData["last_name"]} />
        </label>
        <label className="text-md grid gap-2" htmlFor="phone">
          Phone
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="9876543210" type="text" name="phone" id="phone" onChange={handleChange} value={userData["phone"]} />
        </label>
        <label className="text-md grid gap-2" htmlFor="email">
          Email
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="you@example.com" type="email" name="email" id="email" onChange={handleChange} value={userData["email"]} />
        </label>
        <label className="text-md grid gap-2" htmlFor="password">
          Password
          <input
            className="rounded-md border bg-inherit px-4 py-2"
            placeholder="••••••••••"
            maxLength={72}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={userData["password"]}
          />
        </label>
        <label className="text-md grid gap-2" htmlFor="password_confirm">
          Confirm Password
          <input
            className="rounded-md border bg-inherit px-4 py-2"
            placeholder="••••••••••"
            maxLength={72}
            type="password"
            name="password_confirm"
            id="password_confirm"
            onChange={handleChange}
            value={userData["password_confirm"]}
          />
        </label>

        <button
          className="mt-4 rounded bg-green-700 px-4 py-2 text-white disabled:bg-green-800/80 sm:col-span-2"
          disabled={!userData.first_name || !userData.last_name || !userData.phone || !userData.email || !userData.password || !userData.password_confirm}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
