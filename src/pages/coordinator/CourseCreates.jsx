import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';

const CreateCourse = () => {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        duration: '',
        fee: '',
        image: null,
        schedules: [{ type: '' }]
    });

    const predefinedTypes = ["Night", "Weekend", "Regular"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleScheduleChange = (index, e) => {
        const { name, value } = e.target;
        const newSchedules = [...course.schedules];
        newSchedules[index][name] = value;
        setCourse((prevCourse) => ({
            ...prevCourse,
            schedules: newSchedules,
        }));
    };

    const addSchedule = () => {
        setCourse((prevCourse) => ({
            ...prevCourse,
            schedules: [...prevCourse.schedules, { type: '' }],
        }));
    };

    const removeSchedule = (index) => {
        const newSchedules = course.schedules.filter((_, i) => i !== index);
        setCourse((prevCourse) => ({
            ...prevCourse,
            schedules: newSchedules,
        }));
    };

    const handleFileChange = (e) => {
        setCourse((prevCourse) => ({
            ...prevCourse,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      // Append course data to formData
      for (const key in course) {
          if (key === 'schedules') {
              formData.append(key, JSON.stringify(course.schedules));
          } else {
              formData.append(key, course[key]);
          }
      }
  
      const token = localStorage.getItem('token'); // Retrieve token
  
      if (token) {
          try {
              const decoded = jwt_decode(token);
              console.log('Decoded Token:', decoded);
  
              // Check expiration
              const currentTime = Math.floor(Date.now() / 1000);
              if (decoded.exp < currentTime) {
                  console.error('Token has expired');
                  alert('Your session has expired. Please log in again.');
                  window.location.href = '/login'; // Redirect to login
                  return;
              }
  
              // You can also log the user role here
              console.log('User Role:', decoded.role);
          } catch (error) {
              console.error('Failed to decode token:', error);
              alert('Invalid token. Please log in again.');
              window.location.href = '/login'; // Redirect to login
              return;
          }
      } else {
          alert('No token found. Please log in.');
          window.location.href = '/'; // Redirect to login
          return;
      }
  
      try {
          const response = await fetch('http://localhost:4200/api/courses', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              body: formData,
          });
  
          if (!response.ok) {
              const errorText = await response.text();
              console.error('Response error:', errorText);
              throw new Error(`Error: ${response.status} ${errorText}`);
          }
  
          const result = await response.json();
          alert('Course created successfully!');
          // Reset the form or handle success
      } catch (error) {
          console.error('Error creating course:', error);
          alert('Failed to create course.');
      }
  };

    return (
        <div className="max-w-xl mx-auto p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Course Name"
                    value={course.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    placeholder="Course Description"
                    value={course.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (weeks)"
                    value={course.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="fee"
                    placeholder="Fee"
                    value={course.fee}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div id="schedulesContainer">
                    <h3 className="text-lg font-semibold">Schedules</h3>
                    {course.schedules.map((schedule, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <select
                                name="type"
                                value={schedule.type}
                                onChange={(e) => handleScheduleChange(index, e)}
                                required
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select Schedule Type</option>
                                {predefinedTypes.map((type) => (
                                    <option key={type} value={type.toLowerCase()}>{type}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => removeSchedule(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addSchedule}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Schedule
                </button>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;