// LocationMarker.js
import React, { useState, useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";

const LocationMarker = ({ onLocationFound }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        map.flyTo([latitude, longitude], 10);
        onLocationFound([latitude, longitude]);
      },
      () => {
        alert("Could not get location.");
      }
    );
  }, [map, onLocationFound]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here!</Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;