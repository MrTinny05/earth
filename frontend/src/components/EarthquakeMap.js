// EarthquakeMap.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const EarthquakeMap = ({ earthquakes = [], userLocation }) => {
  const validLocation = userLocation && userLocation[0] && userLocation[1];

  return (
    <div className="w-full h-96 rounded-lg shadow-lg bg-white overflow-hidden">
      <MapContainer
        center={validLocation ? userLocation : [20, 100]}  
        zoom={5}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validLocation && <LocationMarker position={userLocation} />}
        {earthquakes && earthquakes.map((quake, index) => (
          <Marker key={index} position={[quake.lat, quake.lon]}>
            <Popup>
              Magnitude: {quake.mag} <br />
              Location: {quake.place}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;