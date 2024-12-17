import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditCourses = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`http://localhost:4200/api/courses/${id}`);
            const data = await response.json();
            setCourse(data);
        };

        fetchCourse();
    }, [id]);

    return (
        <div>
            <h1>Edit Course</h1>
            {course ? (
                <form>
                    {/* Implement your form for editing the course here */}
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditCourses;