"use client";

import { Session, User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    setUser(user);
    setSession(session);

    sessionStorage.setItem("user", JSON.stringify({ email, password }));

    router.push("/profile");
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
  };

  const signUp = async (email: string, password: string, data: { first_name: string; last_name: string; phone: string }) => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({ email, password, options: { data } });

    if (error) {
      toast.error(error.message);
      if (error?.message === "User already registered") router.push("/login");
      return;
    }
    setUser(user);
    setSession(session);
    sessionStorage.setItem("user", JSON.stringify({ email, password }));
  };

  const updateProfile = async (data: any) => {
    const { error } = await supabase.auth.updateUser({ data: { ...user?.user_metadata, ...data } });
    if (error) toast.error(error.message);
    else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      toast.success("Profile Updated");
      router.push("/profile");
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const { email, password } = JSON.parse(user);
      login(email, password);
    }
  }, []);

  const value = { user, session, login, logout, signUp, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};