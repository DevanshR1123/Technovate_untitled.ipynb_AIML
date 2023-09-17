"use client";

import { Session, User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

    router.push("/dashboard");
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
    sessionStorage.removeItem("user");
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

  const publishTrip = async (routeData: any) => {
    const { error, data } = await supabase
      .from("routes")
      .insert([{ ...routeData, user_id: user?.id }])
      .select();
    if (error) toast.error(error.message);
    else {
      console.log(data);
      toast.success("Trip Published");
      router.push(`/dashboard/trip/${data[0].id}`);
    }
  };

  const deleteTrip = async (id: string) => {
    console.log("DELEETE", id);

    const { error } = await supabase.from("routes").delete().match({ id });
    if (error) toast.error(error.message);
    else toast.success("Trip Deleted");
  };

  const getTrips = async () => {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .match({ user_id: user?.id });
    if (error) toast.error(error.message);
    else return data;
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const { email, password } = JSON.parse(user);
      login(email, password);
    }
  }, []);

  const searchTrip = async (tripData: any) => {
    const { data } = await axios.post("http://localhost:5000/search", tripData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(data);
    setSearchResults(data);
    router.push("/dashboard/trip/search");
  };

  const getTrip = async (id: string) => {
    const { data: trip, error } = await supabase.from("routes").select("*").match({ id }).single();
    if (error || !trip) {
      toast.error(error?.message);
      return;
    }
    console.log(trip);

    // @ts-ignore
    const { data: geo_json } = await axios.post("http://localhost:5000/trip_map", { source: trip["source"], destination: trip["destination"] });

    return { trip, geo_json };
  };

  const value = { user, session, login, logout, signUp, updateProfile, publishTrip, deleteTrip, getTrips, searchTrip, searchResults, getTrip };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
