import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import L from "leaflet"; // ใช้เพื่อสร้างไอคอน

const LocationMarker = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 3); //zoom level
    }
  }, [position, map]);

  const userIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios/452/user-location.png", // ไอคอนรูปคน
    iconSize: [32, 32], // ขนาดของไอคอน
    iconAnchor: [16, 32], // กำหนดจุดที่จะแสดงไอคอน
    popupAnchor: [0, -32] // กำหนดตำแหน่งของ Popup
  });

  return position ? (
    <Marker
      position={position}
      icon={userIcon} // ใช้ไอคอนที่กำหนด
    />
  ) : null;
};

const EarthquakeMap = ({ earthquakes, userLocation }) => {
  const validLocation = userLocation && userLocation[0] && userLocation[1];

  return (
    <div className="w-full h-96 rounded-lg shadow-lg bg-white overflow-hidden">
      <MapContainer
        center={validLocation ? userLocation : [20, 100]}
        zoom={6} // ซูมที่ระดับ 6 เพื่อให้เห็นทั้งตำแหน่งผู้ใช้และจุดแผ่นดินไหว
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* แสดงตำแหน่งผู้ใช้ */}
        {validLocation && <LocationMarker position={userLocation} />}

        {/* แสดงจุดแผ่นดินไหว */}
        {earthquakes && earthquakes.map((quake, index) => (
          <CircleMarker
            key={index}
            center={[quake.geometry.coordinates[1], quake.geometry.coordinates[0]]}
            radius={20} // ขนาดของวงกลม
            className="earthquake-pulse" // ใช้คลาสนี้สำหรับอนิเมชั่น
            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.7 }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 1 }); // ทำให้จุดมีความทึบขึ้นเมื่อ mouseover
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 0.7 }); // ทำให้จุดใสขึ้นเมื่อ mouseout
              },
            }}
          >
            <Popup>
              Magnitude: {quake.properties.mag} <br />
              Location: {quake.properties.place} <br />
              Time: {new Date(quake.properties.time).toLocaleString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;