import { useEffect } from "react";
import { Circle, useMap } from "react-leaflet";

const LocationMarker = ({ position }) => {
  const map = useMap();  

  useEffect(() => {
    if (position) {
      console.log("📍 อัปเดตตำแหน่ง Marker:", position);
      map.setView(position, 10); // ขยับแผนที่ไปยังตำแหน่งใหม่
    }
  }, [position, map]);

  return position ? (
    <Circle
      center={position}
      pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
      radius={5000} // ขนาดวงกลม 5 km
    />
  ) : null;
};

export default LocationMarker;