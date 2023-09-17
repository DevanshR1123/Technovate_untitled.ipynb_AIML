import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: trip, error } = await supabase.from("routes").select("*").eq("id", params.id).single();

  if (!user || !trip) return null;

  const {
    source,
    destination,
    date,
    time,
    seats,
    status,
    metadata: { passengers },
  } = trip;

  const {
    user_metadata: {
      first_name,
      last_name,
      car: { Make, Model },
      color,
    },
  } = user;

  return (
    <div className="self-center p-8">
      <h1 className="text-white">
        {source.name} to {destination.name}
      </h1>
      <p className="text-white">
        {date} {time}
      </p>
      <p className="text-white">{seats} seats</p>
      <h2>Driver & Car Details</h2>
      <p className="text-white">
        {first_name} {last_name}
      </p>
      <p className="text-white">
        {color} {Make} {Model}
      </p>
    </div>
  );
};
