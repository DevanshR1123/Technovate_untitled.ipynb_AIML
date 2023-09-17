"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import Link from "next/link";

export default () => {
  const { user } = useAuth();

  console.log(user);

  if (user)
    return (
      <div className="grid">
        {!user.user_metadata.car?.Make && (
          <div className="text-fore-ground bg-gray-800 p-4 font-bold">
            Complete your profile
            <Link href="/profile-fill" className="ml-4 rounded-lg bg-green-700 p-1 px-2 font-bold">
              Here
            </Link>
          </div>
        )}
        <div className="bg-hsl-200 place-self-center rounded-lg bg-neutral-300 p-4">
          <h1 className="text-2xl font-semibold text-green-700">
            {user.user_metadata.first_name} {user.user_metadata.last_name}
          </h1>
          <div className="mt-4 flex gap-4">
            <h2 className="text-lg text-neutral-800">{user.user_metadata.phone}</h2>
            <h2 className="text-lg text-neutral-800">{user.email}</h2>
          </div>
          <div className="mt-4 flex gap-4">
            <h2 className="text-lg font-bold text-neutral-900">Car Details</h2>
            <h2 className="text-lg text-neutral-800">
              {user.user_metadata.car?.Make} {user.user_metadata.car?.Model} {user.user_metadata.car?.Year}
            </h2>
            <h2 className="text-lg text-neutral-800">{user.user_metadata.color}</h2>
            <h2 className="text-lg text-neutral-800">{user.user_metadata.plate_no}</h2>
            <h2 className="text-lg text-neutral-800">({user.user_metadata.car.Seating_Capacity} persons)</h2>
          </div>
          <div className="mt-4 flex gap-4">
            <h2 className="text-lg font-bold text-neutral-900">Preferences</h2>
            <h2 className="text-lg text-neutral-800">{user.user_metadata.hobby}</h2>
            <h2 className="text-lg text-neutral-800">{user.user_metadata.personality}</h2>
            <h2 className="text-lg text-neutral-800">{user.user_metadata.music}</h2>
            <h2 className="text-lg text-neutral-800">{user.user_metadata.food}</h2>
          </div>
        </div>
      </div>
    );
};
