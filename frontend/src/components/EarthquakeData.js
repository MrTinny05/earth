// EarthquakeData.js
import React, { useEffect, useState } from 'react';

const EarthquakeData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&minmagnitude=4.5')
      .then(response => response.json())
      .then(data => setData(data.features))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="mt-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">รายการแผ่นดินไหวล่าสุด</h2>
      <ul className="mt-4 space-y-4">
        {data.map((quake, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition ease-in-out duration-300">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">{quake.properties.place}</span>
              <span className="text-lg font-medium text-blue-600">{quake.properties.mag}</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <strong>วันที่:</strong> {new Date(quake.properties.time).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarthquakeData;