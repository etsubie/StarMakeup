import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Spinner from './Spinner'; // Ensure correct path
import Modal from './Modal'; // Import the Modal component

const ListCourse = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decoded = jwt_decode(token);
                    const currentTime = Math.floor(Date.now() / 1000);
                    
                    if (decoded.exp < currentTime) {
                        alert('Your session has expired. Please log in again.');
                        window.location.href = '/';
                        return;
                    }

                    const response = await fetch('http://localhost:4200/api/courses', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Error: ${response.status} ${errorText}`);
                    }

                    const data = await response.json();
                    setCourses(data.data);
                } catch (error) {
                    setError('Failed to fetch courses. Please try again later.');
                } finally {
                    setLoading(false);
                }
            } else {
                alert('No token found. Please log in.');
                window.location.href = '/';
            }
        };

        fetchCourses();
    }, []);

    const openModal = (description) => {
        setSelectedDescription(description);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDescription('');
    };

    const handleEdit = (courseId) => {
        console.log('Editing course with ID:', courseId);
        window.location.href = `/EditCourses/${courseId}`; // Ensure this route exists
    };

    const handleDelete = async (courseId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this course?');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:4200/api/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete course.');
                }

                // Remove the deleted course from state
                setCourses(courses.filter(course => course._id !== courseId));
            } catch (error) {
                setError('Failed to delete course. Please try again later.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Course List</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <li key={course._id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
                            <p className="mt-2 text-gray-800"><strong>Duration:</strong> {course.duration} weeks</p>
                            <p className="mt-2 text-gray-800"><strong>Fee:</strong> ${course.fee}</p>
                            <p className="mt-2 text-gray-800"><strong>Schedules:</strong> {course.schedules.map(schedule => schedule.type).join(', ')}</p>
                            <button 
                                className="mt-4 text-blue-500 hover:underline"
                                onClick={() => openModal(course.description)}
                            >
                                View Description
                            </button>
                            <div className="mt-4 flex justify-between">
                                <button 
                                    className="text-green-500 hover:underline"
                                    onClick={() => handleEdit(course._id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(course._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No courses available.</p>
                )}
            </ul>

            {/* Modal for displaying description */}
            <Modal 
                isOpen={modalOpen} 
                onClose={closeModal} 
                description={selectedDescription} 
            />
        </div>
    );
};

export default ListCourse;