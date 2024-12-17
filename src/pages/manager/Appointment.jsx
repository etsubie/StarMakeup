import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    phone: '',
    customer_name: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/appointments', formData);
      setSuccess(response.data.message);
      fetchAppointments(); // Refresh the appointment list
      setFormData({ service: '', date: '', time: '', phone: '', customer_name: '' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Handle potential undefined properties
    }
  };

  const handleConfirmAppointment = async (id) => {
    try {
      await axios.patch(`/api/appointments/${id}/confirm`);
      fetchAppointments(); // Refresh the appointment list
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Handle potential undefined properties
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      fetchAppointments(); // Refresh the appointment list
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Handle potential undefined properties
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <form onSubmit={handleCreateAppointment} className="mb-4">
        <input
          type="text"
          name="customer_name"
          placeholder="Your Name"
          value={formData.customer_name}
          onChange={handleInputChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="text"
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleInputChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Create Appointment
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
      <ul>
        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment._id} className="flex justify-between items-center border-b py-2">
              <span>
                {appointment.customer_name} - {appointment.service} on {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </span>
              <div>
                <button
                  onClick={() => handleConfirmAppointment(appointment._id)}
                  className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No appointments available.</p> // Fallback message
        )}
      </ul>
    </div>
  );
};

export default Appointment;