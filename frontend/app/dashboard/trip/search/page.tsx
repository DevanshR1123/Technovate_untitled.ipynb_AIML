"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const SearchPage = () => {
  const {
    searchResults: [geojson_data, route_ids],
  } = useAuth();

  //   useEffect(() => {}, []);

  return (
    <div className="h-96 w-96 place-self-center">
      <MapContainer center={[19.11305, 72.85451]} zoom={14} scrollWheelZoom={false} style={{ height: "80%", width: "80%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png" />
        <GeoJSON data={geojson_data} />
      </MapContainer>
    </div>
  );
};
export default SearchPage;
