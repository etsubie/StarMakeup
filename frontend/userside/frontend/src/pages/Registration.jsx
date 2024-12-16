import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerStart } from '../store/studentSlice';

const Registration = () => {
  const location = useLocation();
  const courseId = location.state?.courseId || "";

  const [formData, setFormData] = useState({
    courseId: courseId,
    name: "",
    age: "",
    email: "",
    gender: "",
    address: "",
    subcity: "",
    woreda: "",
    education: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactAddress: "",
    emergencyContactPhone: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [emailError, setEmailError] = useState(""); // State for email validation error

  const { loading, error } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      // Basic email validation
      if (!value.includes("@") || !value.endsWith(".com")) {
        setEmailError("Email must contain '@' and end with '.com'");
      } else {
        setEmailError(""); // Clear error if valid
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleEmergencyPhoneChange = (value) => {
    setFormData({ ...formData, emergencyContactPhone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      return;
    }
    if (!agreeToTerms) {
      alert("You must agree to the Terms and Policy to register.");
      return;
    }

    const {
      emergencyContactName,
      emergencyContactAddress,
      emergencyContactPhone,
      name,
      age,
      email,
      gender,
      address,
      subcity,
      woreda,
      education,
      phone,
    } = formData;

    const completeFormData = {
      name,
      age,
      email,
      gender,
      address,
      subcity,
      woreda,
      education,
      phone,
      emergencyContact: {
        name: emergencyContactName,
        address: emergencyContactAddress,
        phone: emergencyContactPhone,
      },
      courseId: courseId,
    };

    dispatch(registerStart(completeFormData));
    setSuccessMessage("Registration successful!"); // Show success message
  };
  
  return (
    <section id="register" className="flex items-center justify-center bg-gray-100 w-full min-h-screen">
      <div className="flex flex-col bg-white rounded-lg shadow-lg border overflow-hidden max-w-lg w-full p-6">
      
        <h1 className="text-2xl italic text-center text-custom-pink mb-4">Student Registration Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcity</label>
            <input
              type="text"
              name="subcity"
              value={formData.subcity}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Woreda</label>
            <input
              type="text"
              name="woreda"
              value={formData.woreda}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <PhoneInput
              country={"et"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact Address</label>
            <input
              type="text"
              name="emergencyContactAddress"
              value={formData.emergencyContactAddress}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
            <PhoneInput
              country={"et"}
              value={formData.emergencyContactPhone}
              onChange={handleEmergencyPhoneChange}
              inputClass="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              // onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"

      onChange={() => setAgreeToTerms(!agreeToTerms)} // Toggle state on checkbox change
      required
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm text-gray-700"
            >
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-indigo-600 underline focus:outline-none"
              >
                Terms and Policy
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-400 text-white py-2 rounded shadow hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : successMessage ? (
            <p className="text-green-500 text-sm">{successMessage}</p>
          ) : null}
        </form>

        {showTerms && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
            onClick={() => setShowTerms(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">የሰልጣኝ ግዴታ(Student Agreement)</h2>
              <p className="text-sm text-gray-600">
               የተቕሙን ፖሊሲና መመሪያ በማክበር የሚሰጠኝን ስልጠና ለመከታተል ተስማምቻለዉ።<br/>
               I agree to abide by all institute policies and procedures.<br/><br/>
               የስልጠና ክፍያ ለተቆሙ (ለስታር ኢንት የዉበት አካዳሚ በጊዜዉ ለመክፈል ተስማምቻለዉ።)<br/>
               I agree to pay Star international Beauty Academy for training fees and any reasonable collection costs if applicable.

              </p>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
     
    </section>
  );
};

export default Registration;
