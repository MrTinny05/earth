const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // เปิดใช้งาน CORS


app.get('https://earthquake.usgs.gov/fdsnws/event/1/application.json', (req, res) => {
  res.json({
    message: 'Earthquake occurred at coordinates: 35.6895° N, 139.6917° E'
  });
});

// รันเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
