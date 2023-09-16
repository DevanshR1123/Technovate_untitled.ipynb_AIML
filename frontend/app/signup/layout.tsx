"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Sign Up | Carpool Connect",
};

export default ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
