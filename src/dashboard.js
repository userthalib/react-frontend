import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard');
        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          setMessage('Unauthorized');
        }
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Dashboard;