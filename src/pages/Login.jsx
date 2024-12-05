import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions"; // Assuming you have actions to handle login
import { setErrorMessage } from "../redux/actions"; // Action to set error message in Redux store

const Login = () => {
  const [email, setEmail] = useState(""); // State for storing email
  const [username, setUsername] = useState(""); // State for storing username
  const [password, setPassword] = useState(""); // State for storing password
  const [role, setRole] = useState("coordinator"); // Role state (default to 'coordinator')
  const [error, setError] = useState(""); // Local state for error messages
  const [loginWithEmail, setLoginWithEmail] = useState(true); // Toggle between email or username login

  const dispatch = useDispatch(); // Redux dispatch to call actions
  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Simple validation
    if ((!email && !username) || !password || !role) {
      setError("All fields are required.");
      return;
    }

    try {
      // Dispatch login action with username or email
      const credentials = {
        email: loginWithEmail ? email : null,
        username: loginWithEmail ? null : username,
        password,
        role,
      };

      const userData = await dispatch(loginUser(credentials));

      if (userData) {
        // Redirect to different dashboards based on the role
        if (role === "admin") {
          navigate("/admin-dashboard"); // Admin dashboard
        } else {
          navigate("/user-dashboard"); // Coordinator or Instructor dashboard
        }
      }
    } catch (error) {
      // Handle error if login fails
      setError("Invalid email, username, password, or role.");
      dispatch(setErrorMessage("Login failed. Please try again.")); // Optional: Dispatch error message to Redux
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Display error message if any */}
        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loginOption" className="block text-sm font-medium text-gray-600">Login with</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="loginOption"
                  checked={loginWithEmail}
                  onChange={() => setLoginWithEmail(true)}
                  className="mr-2"
                />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="loginOption"
                  checked={!loginWithEmail}
                  onChange={() => setLoginWithEmail(false)}
                  className="mr-2"
                />
                Username
              </label>
            </div>
          </div>

          {/* Email or Username input */}
          {loginWithEmail ? (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                placeholder="Enter your email"
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
            >
              <option value="admin">Manager</option>
              <option value="coordinator">Coordinator</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
