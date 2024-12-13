import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import api from '../api/api';
import { setToken } from '../redux/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    try {
      const response = await api.post('/login', formData);
      const { token } = response.data;

      // Save token in Redux
      dispatch(setToken(token));

      // Decode token to retrieve user role
      const { role } = jwt_decode(token);

      // Navigate based on role
      switch (role) {
        case 'manager':
          navigate('/manager/Dashboard');
          break;
        case 'Coordinator':
          navigate('/coordinator/Coodashboard');
          break;
        default:
          navigate('/'); // Default route if role is unrecognized
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Display error message */}
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4" role="alert">
            {error}
          </p>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
              aria-label="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
              aria-label="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
            aria-label="Login"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
