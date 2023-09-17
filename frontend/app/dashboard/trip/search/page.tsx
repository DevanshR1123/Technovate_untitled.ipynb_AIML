"use client";

import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const SearchPage = () => {
  const {
    searchResults: [geojson_data, route_ids],
  } = useAuth();

  useEffect(() => {}, []);

  return (
    <div>
      <MapContainer center={[40.8054, -74.0241]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <Marker position={[40.8054, -74.0241]} draggable={true}>
          <Popup>Hey ! you found me</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default SearchPage;
