import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EarthquakeMap from './components/EarthquakeMap';
import LocationButton from './components/LocationButton';

function App() {
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [userLocation, setUserLocation] = useState([20, 100]); // Default coordinates
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLocation) {
      setLoading(true);
      const [lat, lon] = userLocation;
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&minmagnitude=4.5&latitude=${lat}&longitude=${lon}&maxradius=100`;

      axios.get(url)
        .then(response => {
          setEarthquakeData(response.data.features);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error occurred:', error);
          setError('Unable to load data, please try again later.');
          setLoading(false);
        });
    }
  }, [userLocation]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-[#e51c23] mb-6">ข้อมูลแผ่นดินไหว</h1>

      <LocationButton setUserLocation={setUserLocation} />

      <div className="flex flex-row w-full max-w-7xl mt-6">
        <div className="flex-1 mr-4">
          <EarthquakeMap 
            earthquakes={earthquakeData} 
            userLocation={userLocation} 
          />
        </div>
        <div className="flex-1 max-h-[80vh] overflow-y-auto">
          {loading && <p className="my-4 text-gray-500">กำลังโหลดข้อมูล...</p>}
          {error && <p className="my-4 text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-[#e51c23]">รายการแผ่นดินไหวล่าสุด</h2>
              <ul className="mt-4 space-y-4">
                {earthquakeData.map((quake, index) => (
                  <li key={index} className="p-4 bg-[#f5f5f5] rounded-lg shadow-sm hover:bg-[#e1e1e1] transition ease-in-out duration-300">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{quake.properties.place}</span>
                      <span className="text-lg font-medium text-[#e51c23]">{quake.properties.mag}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      <strong>วันที่:</strong> {new Date(quake.properties.time).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;