import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedCustomer = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ message: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback'); // Adjust the endpoint as necessary
      setFeedbacks(response.data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', formData);
      setSuccess(response.data.message);
      fetchFeedbacks(); // Refresh the feedback list
      setFormData({ message: '' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <form onSubmit={handleSubmitFeedback} className="mb-4">
        <textarea
          name="message"
          placeholder="Your feedback"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Submit Feedback
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Feedback Messages</h2>
      <ul>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <li key={feedback._id} className="border-b py-2">
              <p>{feedback.message}</p>
              <small className="text-gray-500">Posted on {new Date(feedback.createdAt).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </ul>
    </div>
  );
};

export default FeedCustomer;