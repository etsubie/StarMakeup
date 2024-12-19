import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('token');
          return;
        }

        setIsLoggedIn(true);
        setUserRole(decodedToken.role.name);

        if (decodedToken.role.name === 'Manager') {
          navigate('/manager/dashboard');
        } else {
          navigate('/coordinator/coodashboard');
        }
      } catch (error) {
        console.error('Token decoding error:', error);
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4200/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');

      const decodedToken = jwtDecode(response.data.token);
      setUserRole(decodedToken.role.name);

      if (decodedToken.role.name === 'Manager') {
        navigate('/manager/dashboard');
      } else {
        navigate('/coordinator/coodashboard');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {isLoggedIn && <p className="text-green-500 mt-4">You are logged in as {userRole}!</p>}
      </div>
    </div>
  );
};

export default Login;