import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from '../store/authSlice';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Context from '../context';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart(formData)); 

    if (!loading && !error) {
      navigate("/"); // Redirect after successful login
      fetchUserDetails(); // Fetch user details after login
    }
  };

  return (
    <div className="flex items-center justify-center my-6 w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg my-8 shadow-lg border overflow-hidden max-w-lg lg:max-w-4xl w-full p-2">
        <div
          className="hidden md:block lg:w-1/2 bg-cover py-6"
          style={{
            backgroundImage: `url(/img/makeup.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="underlin h-0.5 mx-36 text-center bg-custom-pink"></div>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {user && <p className="text-green-500">Login successful!</p>}
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <div className="relative p-2 flex items-center">
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute right-2 cursor-pointer px-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </div>
              </div>
            </div>
            <div>
              <a
                href="/forgotpassword"
                className="text-xs text-gray-500 hover:text-gray-900 hover:underline text-end w-full mt-2"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button
                className="bg-pink-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                type="submit"
                disabled={loading} // Disable button while loading
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="/signup"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have an account yet?
              <span className="text-blue-700 hover:underline"> Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
