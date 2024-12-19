import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback'); // Adjust the endpoint as necessary
      setFeedbacks(response.data.data || []); // Ensure feedbacks is an array
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      {error && <p className="text-red-500">{error}</p>}
      
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

export default FetchFeedback;