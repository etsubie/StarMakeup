import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onClose, courseId }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:4200/api/students/${courseId}/register-student`, {
                name,
                age,
                gender,
                address,
                email,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Student added:', response.data);
            onClose(); // Close the form after successful submission
        } catch (err) {
            console.error('Error adding student:', err.message);
            setError('Failed to add student.');
        }
    };

    return (
        <div className="border p-6 rounded-lg shadow-md bg-white max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Student</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="age">Age:</label>
                    <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">Address:</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    >
                        Add Student
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;