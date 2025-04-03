import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EarthquakeMap from './components/EarthquakeMap';
import LocationButton from './components/LocationButton';
import EarthquakeData from './components/EarthquakeData';


function App() {
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [userLocation, setUserLocation] = useState([20, 100]);  // พิกัดเริ่มต้น
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLocation) {
      setLoading(true);
      // กำหนดขอบเขตของพื้นที่ (สมมติเป็น 100 km)
      const [lat, lon] = userLocation;
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&minmagnitude=4.5&latitude=${lat}&longitude=${lon}&maxradius=100`;

      axios.get(url)
        .then(response => {
          setEarthquakeData(response.data.features);  // ดึงข้อมูลแผ่นดินไหวที่เกี่ยวข้อง
          setLoading(false);
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาด:', error);
          setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
          setLoading(false);
        });
    }
  }, [userLocation]);  // ทุกครั้งที่ตำแหน่งผู้ใช้เปลี่ยนจะดึงข้อมูลใหม่

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">ข้อมูลแผ่นดินไหว</h1>
      
      <LocationButton setUserLocation={setUserLocation} />
      
      {loading && <p className="my-4">กำลังโหลดข้อมูล...</p>}
      {error && <p className="my-4 text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
          <EarthquakeMap 
            earthquakes={earthquakeData} 
            userLocation={userLocation}
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">รายการแผ่นดินไหวล่าสุด</h2>
            <ul className="mt-2">
              {earthquakeData.map((quake, index) => (
                <li key={index} className="border-b py-2">
                  <strong>สถานที่:</strong> {quake.properties.place} | 
                  <strong> ขนาด:</strong> {quake.properties.mag}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;