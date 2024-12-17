import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchCoursesStart } from '../store/courseSlice';
import { useNavigate } from 'react-router-dom';

const MAX_DESCRIPTION_LENGTH = 100;

const Course = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCoursesStart());
  }, [dispatch]);

  const handleRegister = (courseId) => {
    navigate('/register', { state: { courseId } });
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const groupBySchedule = (courses) => {
    const grouped = {};
    courses.forEach((course) => {
      course.schedules.forEach((schedule) => {
        const scheduleKey = schedule.type.join(', ');
        if (!grouped[scheduleKey]) {
          grouped[scheduleKey] = [];
        }
        grouped[scheduleKey].push(course);
      });
    });
    return grouped;
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses: {error}</p>;

  const groupedCourses = groupBySchedule(courses);

  return (
    <StyledWrapper>
      <section className="py-12 relative">
        <h1 className="text-gray-900 text-4xl font-bold font-manrope leading-normal text-center italic">
          Our Courses
        </h1>
        <div className="underlin h-0.5 mx-96 text-center bg-custom-pink mb-10"></div>
        <div className="grouped-container">
          {Object.entries(groupedCourses).map(([scheduleKey, scheduleCourses]) => (
            <div key={scheduleKey} className="schedule-group">
              <h2 className="schedule-header">{scheduleKey}</h2>
              <div className="course-container">
                {scheduleCourses.map((course) => (
                  <div className="flip-card" key={course._id}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                      
                      <img
                    src={`http://localhost:4200${course.image}`}
                    alt={course.name}   
                        className="course-image"
                      />

                        <p className="title">{course.name}</p>
                        <p className="description">
                          {truncateText(course.description, MAX_DESCRIPTION_LENGTH)}
                        </p>
                      </div>
                      <div className="flip-card-back">
                        <p className="title">{course.name}</p>
                        <p className="description">
                          {truncateText(course.description, MAX_DESCRIPTION_LENGTH)}
                        </p>
                        <p className="price">{course.fee} Birr</p>
                        <button
                          className="register-btn"
                          onClick={() => handleRegister(course._id)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </StyledWrapper>
  );
}; 

const StyledWrapper = styled.div`
  .grouped-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .schedule-group {
    margin-bottom: 30px;
  }

  .schedule-header {
    font-size: 2rem;
    font-weight: bold;
    margin-left: 3%;
    margin-bottom: 20px;
    color: coral;
  }

  .course-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .flip-card {
    background-color: transparent;
    width: 30%;
    height: 450px;
    perspective: 1000px;
    margin: 10px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flip-card-front {
    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgba(255, 127, 80, 0.603) 48%);
    color: coral;
  }

  .flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%, bisque 40%);
    color: white;
    transform: rotateY(180deg);
  }

  .course-image {
    width: 80%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 15px;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
  }

  .description {
    font-size: 1em;
    text-align: center;
    margin: 10px 0;
    color: #333;
  }

  .price {
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0;
  }

  .register-btn {
    background-color: coral;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .flip-card {
      width: 45%;
    }
  }

  @media (max-width: 768px) {
    .flip-card {
      width: 90%;
    }
  }
`;

export default Course;
