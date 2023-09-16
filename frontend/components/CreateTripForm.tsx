"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateTripForm = () => {
  const { user } = useAuth();
  const [tripData, setTripData] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seats: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tripData);
  };

  return (
    <div className="m-auto grid min-w-[24rem] place-self-center sm:w-[32rem]">
      <form className="sm:grid-cols-2 grid gap-6 text-foreground" onSubmit={handleSubmit}>
        <label className="grid gap-2" htmlFor="source">
          Source
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="Andheri" type="text" name="source" id="source" onChange={handleChange} value={tripData["source"]} />
        </label>
        <label className="grid gap-2" htmlFor="destination">
          Destination
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="Vile Parle" type="text" name="destination" id="destination" onChange={handleChange} value={tripData["destination"]} />
        </label>
        <label className="grid gap-2" htmlFor="date">
          Date
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="Start Date" type="date" name="date" id="date" onChange={handleChange} value={tripData["date"]} />
        </label>
        <label className="grid gap-2" htmlFor="time">
          Time
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="Start Time" type="time" name="time" id="time" onChange={handleChange} value={tripData["time"]} />
        </label>

        <label className="col-span-2 grid gap-2" htmlFor="seats">
          Available Seats : {tripData["seats"]}
          <input
            className="rounded-md border bg-inherit py-2 pl-4 accent-green-700"
            placeholder="Seats"
            type="range"
            name="seats"
            id="seats"
            min={1}
            max={user?.user_metadata.car.Seating_Capacity - 1}
            step={1}
            onChange={handleChange}
            value={tripData["seats"]}
          />
        </label>

        <button
          className="mt-4 rounded bg-green-700 px-4 py-2 text-white disabled:bg-green-800/80 sm:col-span-2"
          disabled={!tripData["source"] || !tripData["destination"] || !tripData["date"] || !tripData["time"] || !tripData["seats"]}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default CreateTripForm;
