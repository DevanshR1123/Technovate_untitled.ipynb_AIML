"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import Link from "next/link";

export default () => {
  const { user } = useAuth();

  console.log(user);

  if (user)
    return (
      <div>
        {!user.user_metadata.car?.Make && (
          <div className="text-fore-ground bg-gray-800 p-4 font-bold">
            Complete your profile
            <Link href="/profile-fill" className="ml-4 rounded-lg bg-green-700 p-1 px-2 font-bold">
              Here
            </Link>
          </div>
        )}
        <h1 className="">
          {user.user_metadata.first_name} {user.user_metadata.last_name}
        </h1>
      </div>
    );
};
