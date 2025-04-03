const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(cors()); // เปิดใช้งาน CORS

// API endpoint สำหรับข้อมูลแผ่นดินไหว
app.get('/api/earthquake', async (req, res) => {
  try {
    // ใช้ข้อมูลจริงจาก USGS API
    const response = await axios.get(
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&minmagnitude=4.5'
    );
    
    // แปลงข้อมูลจาก GeoJSON เป็นรูปแบบที่เราต้องการใช้
    const earthquakes = response.data.features.map(feature => {
      return {
        id: feature.id,
        mag: feature.properties.mag,
        place: feature.properties.place,
        time: feature.properties.time,
        lat: feature.geometry.coordinates[1], // latitude
        lon: feature.geometry.coordinates[0], // longitude
        depth: feature.geometry.coordinates[2]
      };
    });
    
    res.json({
      success: true,
      count: earthquakes.length,
      earthquakes: earthquakes
    });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลแผ่นดินไหวได้',
      error: error.message
    });
  }
});

// สำรองกรณีไม่สามารถเชื่อมต่อ API จริงได้
app.get('/api/earthquake/mock', (req, res) => {
  const mockEarthquakes = [
    { id: "1", mag: 6.2, place: "Tokyo, Japan", time: Date.now(), lat: 35.6895, lon: 139.6917, depth: 10 },
    { id: "2", mag: 5.8, place: "Los Angeles, USA", time: Date.now() - 3600000, lat: 34.0522, lon: -118.2437, depth: 8 },
    { id: "3", mag: 4.9, place: "Mexico City, Mexico", time: Date.now() - 7200000, lat: 19.4326, lon: -99.1332, depth: 15 },
    { id: "4", mag: 5.1, place: "Bangkok, Thailand", time: Date.now() - 10800000, lat: 13.7563, lon: 100.5018, depth: 12 }
  ];
  
  res.json({
    success: true,
    count: mockEarthquakes.length,
    earthquakes: mockEarthquakes
  });
});

// รันเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});