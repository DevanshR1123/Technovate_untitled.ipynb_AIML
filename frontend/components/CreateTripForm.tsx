"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import axios from "axios";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const CreateTripForm = () => {
  const { user, publishTrip, searchTrip } = useAuth();
  const [tripData, setTripData] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seats: 2,
  });
  const [mode, setMode] = useState<"search" | "offer">("search");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const url = "https://www.mapquestapi.com/geocoding/v1/address?key=CtAFAb6HhxbTJn5LIDknMagdoJpDMWye";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      data: {
        results: [
          {
            locations: [{ latLng: sourceCoords }],
          },
        ],
      },
    } = await axios.get(url, { headers: { "Access-Control-Allow-Origin": "*" }, params: { location: tripData["source"] } });
    const {
      data: {
        results: [
          {
            locations: [{ latLng: destinationCoords }],
          },
        ],
      },
    } = await axios.get(url, { headers: { "Access-Control-Allow-Origin": "*" }, params: { location: tripData["destination"] } });

    console.log(sourceCoords, destinationCoords);

    if (mode === "offer") {
      const trip = {
        source: {
          lat: sourceCoords.lat,
          lng: sourceCoords.lng,
          name: tripData["source"],
        },
        destination: {
          lat: destinationCoords.lat,
          lng: destinationCoords.lng,
          name: tripData["destination"],
        },
        date: tripData["date"],
        time: tripData["time"],
        seats: tripData["seats"],
        status: "UPCOMING",
      };

      await publishTrip(trip);
    } else {
      const trip = {
        source: {
          lat: sourceCoords.lat,
          lng: sourceCoords.lng,
          name: tripData["source"],
        },
        destination: {
          lat: destinationCoords.lat,
          lng: destinationCoords.lng,
          name: tripData["destination"],
        },
        date: tripData["date"],
        time: tripData["time"],
      };
      searchTrip(trip);
    }
  };

  return (
    <div className="m-auto grid min-w-[24rem] gap-8 place-self-center sm:w-[32rem]">
      <div className="grid-cols-2 relative grid cursor-pointer rounded-lg border-2 border-neutral-200 p-4" onClick={() => setMode(mode === "search" ? "offer" : "search")}>
        <div className={twMerge("absolute bottom-0 top-0 z-[-1] w-1/2 rounded-lg bg-green-600 transition-all", mode === "search" ? "left-0" : "left-1/2")}></div>
        <div className="grid select-none place-items-center font-bold">Search for Carpool</div>
        <div className="grid select-none place-items-center font-bold">Offer a Ride</div>
      </div>
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
          <input
            className="rounded-md border bg-inherit px-4 py-2"
            placeholder="Start Date"
            min={new Date().getDate()}
            type="date"
            name="date"
            id="date"
            onChange={handleChange}
            value={tripData["date"]}
          />
        </label>
        <label className="grid gap-2" htmlFor="time">
          Time
          <input className="rounded-md border bg-inherit px-4 py-2" placeholder="Start Time" type="time" name="time" id="time" onChange={handleChange} value={tripData["time"]} />
        </label>

        {mode === "offer" && (
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
        )}

        <button
          className="mt-4 rounded bg-green-700 px-4 py-2 text-white disabled:bg-green-800/80 sm:col-span-2"
          disabled={!tripData["source"] || !tripData["destination"] || !tripData["date"] || !tripData["time"] || (mode === "offer" && !tripData["seats"])}
        >
          {mode === "search" ? "Search for Carpool" : "Offer a Ride"}
        </button>
      </form>
    </div>
  );
};
export default CreateTripForm;
