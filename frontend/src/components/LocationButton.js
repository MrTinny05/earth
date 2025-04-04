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
      className="bg-gradient-to-r from-blue-500 to-blue-600 
      hover:from-blue-600 hover:to-blue-700 
      text-white text-lg font-semibold 
      py-2 px-4 rounded-2xl 
      shadow-lg transition-all duration-300 
      transform hover:scale-105 active:scale-95"
    >
      📍 ค้นหาตำแหน่งของฉัน
    </button>
  );
};

export default LocationButton;