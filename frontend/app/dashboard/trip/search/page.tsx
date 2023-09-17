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

  console.log(JSON.parse(geojson_data));

  return (
    <div>
      <MapContainer center={[40.8054, -74.0241]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        {JSON.parse(geojson_data).children.map((feature: any) => {
          return (
            <Marker position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
              <Popup>
                <h2>{feature.properties.name}</h2>
                <p>{feature.properties.description}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
export default SearchPage;
