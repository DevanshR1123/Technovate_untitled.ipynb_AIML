"use client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/contexts/Auth/AuthContext";

export default ({ params }: { params: { id: number } }) => {
  const { user, getTrip } = useAuth();

  const [trip, setTrip] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getTrip(`${params.id}`).then(({ trip, geo_json }) => {
      setTrip(trip);
      setData(geo_json);
    });
  }, []);

  return (
    <>
      {trip && (
        <div className="grid-cols-2 grid h-full p-8">
          <div className="self-center">
            <h1 className="text-white">
              {trip.source.name} to {trip.destination.name}
            </h1>
            <p className="text-white">
              {trip.date} {trip.time}
            </p>
            <p className="text-white">{trip.seats} seats</p>
            <h2>Driver & Car Details</h2>
            <p className="text-white">
              {user?.user_metadata.first_name} {user?.user_metadata.last_name}
            </p>
            <p className="text-white">
              {user?.user_metadata.color} {user?.user_metadata.car.Make} {user?.user_metadata.car.Model}
            </p>
          </div>
          <div className="pr-16">
            <MapContainer center={[19.11305, 72.85451]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png" />
              <GeoJSON data={data} />
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};
