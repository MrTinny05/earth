import React from "react";

const LocationButton = ({ setUserLocation }) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);  // ส่งพิกัดกลับไปที่ App
        },
        () => alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้")
      );
    } else {
      alert("เบราว์เซอร์ของคุณไม่รองรับ Geolocation");
    }
  };

  return (
    <button 
    onClick={getLocation}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition ease-in-out duration-300 transform hover:scale-105"
  >
    📍 ค้นหาตำแหน่งของฉัน
  </button>
  );
};

export default LocationButton;