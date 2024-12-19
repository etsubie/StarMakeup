import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments'); // Adjust the endpoint as necessary
      setAppointments(response.data.data || []); // Ensure appointments is an array
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment._id} className="border-b py-2">
              <p>
                {appointment.customer_name} - {appointment.service} on {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
            </li>
          ))
        ) : (
          <p>No appointments available.</p>
        )}
      </ul>
    </div>
  );
};

export default FetchAppointments;