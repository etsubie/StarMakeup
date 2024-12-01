import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import imageTobase64 from "../helpers/imageTobase64";


const Signup = () => {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[data,setData] = useState({
    profilePic : "",
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
  }
  return (
    <section id="signup" >
    <div className="flex items-center justify-center  bg-gray-100 w-full">
      <div className="flex bg-white rounded-lg my-8 shadow-lg border overflow-hidden max-w-lg lg:max-w-2xl w-full p-2">
        <div className="w-full p-8">
          <div className="w-20 mx-auto relative overflow-hidden rounded-full">
          <div>
  {data.profilePic ? (
    <img
      src={data.profilePic}
      alt="Profile"
      className="w-20 h-20 rounded-full bg-blue-100"
    />
  ) : (
    <BsPersonCircle size={79} className="bg-blue-100" />
  )}
</div>

            <form >
              <label>
            <div className="text-xs bg-opacity-70 bg-blue-100 pb-6 pt-1 absolute bottom-0 w-full cursor-pointer">
              Upload Photo
            </div>
            <input type="file" className="hidden" onChange={handleUploadPic} />
            </label>
            </form>
         
          </div>

          <a
            href="#"
            className="flex items-center justify-center mt-4 bg-gray-100 text-gray-600 rounded-lg shadow-md py-3 px-5 hover:bg-gray-200"
          >
            <svg className="h-6 w-6 mr-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8317 32.6542 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            Sign up with Google
          </a>
         
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your name"
              required
            />
            </div>
         <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone:
            </label>
            <PhoneInput
              id="phone"
              country={"us"}
              value={phone}
              onChange={setPhone}
              enableSearch={true}
              placeholder="Enter phone number"
              autoFormat={true}
              containerClass="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
              inputClass="w-full py-2 px-4 text-gray-700 text-base border-none focus:outline-none"
              required
            />
          </div>
        
           <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <div className="relative flex items-center">
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <div
                className="absolute right-2 cursor-pointer"
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

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password:
            </label>
            <div className="relative flex items-center">
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
              />
              <div
                className="absolute right-2 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </div>
            </div>
           </div>
          <button className="mt-8 bg-pink-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
            Sign Up
          </button>
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
      </div>
    </div>
    </section>
  );
};

export default Signup;
