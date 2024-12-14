import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import imageTobase64 from "../helpers/imageTobase64";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from '../store/authSlice';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    profilePic: "",
  });

  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setFormData({ ...formData, profilePic: imagePic });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerStart(formData));
    if (!loading && !error) {
      navigate("/login"); 
    }
  };

  return (
    <section id="signup" className="flex items-center justify-center bg-gray-100 w-full min-h-screen">
      <div className="flex flex-col bg-white rounded-lg shadow-lg border overflow-hidden max-w-lg w-full p-6">
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {user && <p className="text-green-500">Registration successful!</p>}

        <div className="w-full mb-6 text-center">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <BsPersonCircle size={79} className="text-blue-500" />
            )}
            <label className="absolute bottom-0 left-0 w-full bg-blue-100 text-xs text-center py-1 cursor-pointer">
              Upload Photo
              <input type="file" className="hidden" onChange={handleUploadPic} />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
            <PhoneInput
              country="et"
              value={formData.phone}
              onChange={handlePhoneChange}
              enableSearch={true}
              placeholder="Enter phone number"
              autoFormat={true}
              containerClass="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
              inputClass="w-full py-2 px-4 text-gray-700 text-base border-none focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 flex items-center w-full text-center">
          <a
            href="/login"
            className="text-xs text-gray-500 capitalize text-center w-full"
          >
            Already have an account?
            <span className="text-blue-700 hover:underline"> Log In</span>
          </a>
        </div> 
      </div>
    </section>
  );
};

export default Signup;
