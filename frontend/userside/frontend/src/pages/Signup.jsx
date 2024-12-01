import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import imageTobase64 from "../helpers/imageTobase64";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/userSlice";

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
    dispatch(registerUser(formData));
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








// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { BsPersonCircle } from "react-icons/bs";
// import imageTobase64 from "../helpers/imageTobase64";
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../store/userSlice';


// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     passwordConfirmation: '',
//     profilePic : '',
//   });

//   const { loading, error, user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [phone, setPhone] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   // const[data,setData] = useState({
//   //   profilePic : "",
//   // })
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };
//   const handleUploadPic = async (e) => {
//     const file = e.target.files[0];
//     const imagePic = await imageTobase64(file);
//     setFormData({ ...formData, profilePic: imagePic });
//   };
  
//   const handlePhoneChange = (value) => {
//     setPhone(value);
//     setFormData({ ...formData, phone: value });
//   };
  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser({ ...formData, phone }));
//   };
  
//   return (
//     <section id="signup" >
//     <div className="flex items-center justify-center  bg-gray-100 w-full">
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {user && <p style={{ color: 'green' }}>Registration successful!</p>}

//       <div className="flex bg-white rounded-lg my-8 shadow-lg border overflow-hidden max-w-lg lg:max-w-2xl w-full p-2">
//               <div className="w-full p-8">
//                 <div className="w-20 mx-auto relative overflow-hidden rounded-full">
//                 <div>
//         {formData.profilePic ? (
//           <img
//             src={formData.profilePic}
//             alt="Profile"
//             className="w-20 h-20 rounded-full bg-blue-100"
//           />
//         ) : (
//           <BsPersonCircle size={79} className="bg-blue-100" />
//         )}
//       </div>

//       <form onSubmit={handleSubmit}>
//               <label>
//             <div className="text-xs bg-opacity-70 bg-blue-100 pb-6 pt-1 absolute bottom-0 w-full cursor-pointer">
//               Upload Photo
//             </div>
//             <input type="file" className="hidden" onChange={handleUploadPic} />
//             </label>
         

//           <a
//             href="#"
//             className="flex items-center justify-center mt-4 bg-gray-100 text-gray-600 rounded-lg shadow-md py-3 px-5 hover:bg-gray-200"
//           >
//             <svg className="h-6 w-6 mr-2" viewBox="0 0 40 40">
//               <path
//                 d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
//                 fill="#FFC107"
//               />
//               <path
//                 d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
//                 fill="#FF3D00"
//               />
//               <path
//                 d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
//                 fill="#4CAF50"
//               />
//               <path
//                 d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8317 32.6542 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
//                 fill="#1976D2"
//               />
//             </svg>
//             Sign up with Google
//           </a>
         
//             <div className="mt-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Name:
//               </label>
//               <input
//               className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               name="name"
//               type="text"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             </div>
//          <div className="mt-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Email:
//             </label>
//             <input
//               id="email"
//               className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label
//               htmlFor="phone"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Phone:
//             </label>
//             <PhoneInput
//               id="phone"
//               country={"us"}
//               value={phone}
//               onChange={handleChange}
//               enableSearch={true}
//               placeholder="Enter phone number"
//               autoFormat={true}
//               containerClass="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
//               inputClass="w-full py-2 px-4 text-gray-700 text-base border-none focus:outline-none"
//               required
//             />
//           </div>
        
//            <div className="mt-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password:
//             </label>
//             <div className="relative flex items-center">
//               <input
//                 className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 name="password"
//                 onChange={handleChange}
//                 required
//               />
//               <div
//                 className="absolute right-2 cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? (
//                   <IoEyeOffOutline size={20} />
//                 ) : (
//                   <IoEyeOutline size={20} />
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Confirm Password:
//             </label>
//             <div className="relative flex items-center">
//               <input
//                 className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm password"
//                 name="passwordConfirmation"
//                 onChange={handleChange}
//                 required
//               />
//               <div
//                 className="absolute right-2 cursor-pointer"
//                 onClick={toggleConfirmPasswordVisibility}
//               >
//                 {showConfirmPassword ? (
//                   <IoEyeOffOutline size={20} />
//                 ) : (
//                   <IoEyeOutline size={20} />
//                 )}
//               </div>
//             </div>
//            </div>
//           <button className="mt-8 bg-pink-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600" type="submit">
//             Sign Up
//           </button>
//       </form>
//           <div className="mt-4 flex items-center w-full text-center">
//             <a
//               href="/login"
//               className="text-xs text-gray-500 capitalize text-center w-full"
//             >
//               Already have an account?
//               <span className="text-blue-700 hover:underline"> Log In</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     </section>
//   );
// };

// export default Signup;