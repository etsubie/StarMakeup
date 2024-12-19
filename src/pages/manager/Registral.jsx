import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationForm from './RegistrationForm'; // Import the new component

const Registral = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
      const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('No token provided'); // Early error handling
            }
    
            const response = await axios.get('http://localhost:4200/api/students', {
                headers: {
                    Authorization: `Bearer ${token}` // Correctly formatted token
                }
            });
    
            const data = response.data.data; // Assuming the response structure
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
            setError('Failed to fetch students.');
        } finally {
            setLoading(false);
        }
    };

        fetchStudents();
    }, []);

    const handleAddStudentClick = () => {
        setShowForm(true); // Show the registration form
    };

    const handleCloseForm = () => {
        setShowForm(false); // Hide the registration form
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Registered Students</h1>
            <button className="mb-4 p-2 bg-blue-500 text-white rounded" onClick={handleAddStudentClick}>
                Add Student
            </button>
            {showForm && <RegistrationForm onClose={handleCloseForm} />}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Age</th>
                        <th className="border border-gray-300 p-2">Gender</th>
                        <th className="border border-gray-300 p-2">Address</th>
                        <th className="border border-gray-300 p-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map(student => (
                            <tr key={student._id}>
                                <td className="border border-gray-300 p-2">{student.name}</td>
                                <td className="border border-gray-300 p-2">{student.age}</td>
                                <td className="border border-gray-300 p-2">{student.gender}</td>
                                <td className="border border-gray-300 p-2">{student.address}</td>
                                <td className="border border-gray-300 p-2">{student.user ? student.user.email : 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="border border-gray-300 p-2 text-center">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Registral;