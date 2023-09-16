import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";
import TripsPanel from "@/components/dashboard/TripsPanel";

export default async () => {
  return (
    <div className="grid p-4">
      <TripsPanel />
    </div>
  );
};
