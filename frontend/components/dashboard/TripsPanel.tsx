import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export default async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: trips, error } = await supabase
    .from("routes")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <div className="rounded-lg bg-neutral-700 p-4">
      <h1 className="mb-6 text-center text-4xl font-bold">Your Trips</h1>
      <div className="grid gap-4">
        {trips?.map((trip) => (
          <div className="md:grid-cols-3 grid-cols-2 grid gap-4 gap-y-2 rounded-lg border border-neutral-200 p-4 text-sm">
            <div className="grid grid gap-1">
              <h2 className="text-sm font-bold">From:</h2>
              <p className="text-[0.75rem]">{trip.source.name}</p>
            </div>
            <div className="row-start-2 grid gap-1">
              <h2 className="text-sm font-bold">To:</h2>
              <p className="text-[0.75rem]">{trip.destination.name}</p>
            </div>
            <div className="row-span-2 grid gap-2">
              <h2 className="text-sm font-bold">Date & Time:</h2>
              <p className="text-[0.75rem]">
                {trip.date} {trip.time}
              </p>
            </div>

            {/* <p className={twMerge("place-self-center rounded px-2 py-1", trip.status === "UPCOMING" ? "bg-yellow-500" : trip.status === "ONGOING" ? "bg-green-500" : "bg-red-500")}>{trip.status}</p> */}
            <div className="grid-cols-3 col-span-2 grid gap-4">
              <Link href={`/dashboard/trip/${trip.id}`} className="w-fit rounded bg-green-700 px-4 py-2">
                View Trip
              </Link>

              <button className="w-fit rounded bg-red-700 px-4 py-2">Delete Trip</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
