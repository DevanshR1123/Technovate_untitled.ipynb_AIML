"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/Auth/AuthContext";

export default () => {
  const [trips, setTrips] = useState<any[]>([]);
  const { getTrips, deleteTrip } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      const trips = await getTrips();
      setTrips(trips);
      console.log(trips);
    };

    fetchTrips();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTrip(id);
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div className="rounded-lg bg-neutral-700 p-4">
      <div className="grid-cols-2 grid items-center">
        <h1 className="mb-6 text-4xl font-bold">Your Trips</h1>
        <Link href="/dashboard/trip/create" className="w-fit justify-self-end rounded bg-green-700 px-4 py-2">
          Create Trip
        </Link>
      </div>

      <div className="md:grid-cols-2 grid gap-4">
        {trips?.map((trip) => (
          <div className="grid gap-6 rounded-lg border border-neutral-200 p-4" key={trip.id}>
            <div className="md:grid-cols-3 sm:grid-cols-2 grid gap-4 gap-y-2 text-sm">
              <div className="sm:grid-cols-1 grid-cols-2 grid gap-2">
                <h2 className="w-fit text-sm font-bold">From:</h2>
                <p className="text-right text-[0.75rem] sm:text-left">{trip.source.name}</p>
              </div>
              <div className="sm:grid-cols-1 grid-cols-2 grid gap-2">
                <h2 className="w-fit text-sm font-bold">To:</h2>
                <p className="text-right text-[0.75rem] sm:text-left">{trip.destination.name}</p>
              </div>
              <div className="sm:grid-cols-1 grid-cols-2 grid gap-2">
                <h2 className="w-fit text-sm font-bold">Date & Time:</h2>
                <p className="text-right text-[0.75rem] sm:text-left">
                  {trip.date} {trip.time}
                </p>
              </div>
            </div>
            {/* <p className={twMerge("place-self-center rounded px-2 py-1", trip.status === "UPCOMING" ? "bg-yellow-500" : trip.status === "ONGOING" ? "bg-green-500" : "bg-red-500")}>{trip.status}</p> */}
            <div className="grid-cols-2 grid place-items-center gap-4 text-[0.75rem]">
              <Link href={`/dashboard/trip/${trip.id}`} className="w-fit rounded bg-green-700 px-4 py-2">
                View Trip
              </Link>

              <button
                className="w-fit rounded bg-red-700 px-4 py-2"
                onClick={async () => {
                  handleDelete(trip.id);
                }}
              >
                Delete Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
