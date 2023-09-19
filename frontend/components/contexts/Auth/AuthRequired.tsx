"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export const AuthRequired = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  try {
    if (!user) {
      router.push("/login");
      return <></>;
    }
  } catch {}

  return <>{children}</>;
};
