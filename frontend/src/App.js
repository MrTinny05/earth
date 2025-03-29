import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [earthquakeData, setEarthquakeData] = useState('');

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/earthquake')
      .then(response => {
        setEarthquakeData(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Earthquake Data</h1>
      <p>{earthquakeData}</p>
    </div>
  );
}

export default App;
