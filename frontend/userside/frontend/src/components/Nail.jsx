import React from 'react';
import styled from 'styled-components';

const Nail = () => {
  return (
    <StyledWrapper>
        <section class="py-12 relative">
        <h1 className='text-gray-900 text-4xl font-bold font-manrope leading-normal text-center  italic'>
    Our Courses
  </h1>
  <div className="underlin h-0.5 mx-96 text-center bg-custom-pink mb-10"></div>
    <div className="flex items-center justify-center mb-10 italic">
  
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src="../img/nail2.jpg"
              alt="Nail Course"
              className="course-image"
            />
            <p className="title">Nail Learning Course</p>
            <p className="description">Master the art of nail design with our expert-led course.</p>
          </div>
          <div className="flip-card-back">
            <img
              src="../img/nail2.jpg"
              alt="Nail Course"
              className="course-image"
            />
            <p className="title">Nail Learning Course</p>
            <p className="description">Learn advanced techniques and become a professional nail artist.</p>
            <p className="price">10,000 Birr</p>
            <button className="register-btn">Register</button>
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src="../img/makeup.jpg"
              alt="Makeup Class"
              className="course-image"
            />
            <p className="title">Makeup Class</p>
            <p className="description">Learn professional makeup techniques in this comprehensive course.</p>
          </div>
          <div className="flip-card-back">
            <img
              src="../img/makeup.jpg"
              alt="Makeup Class"
              className="course-image"
            />
            <p className="title">Makeup Class</p>
            <p className="description">Become a certified makeup artist with advanced skills.</p>
            <p className="price">20,000 Birr</p>
            <button className="register-btn">Register</button>
          </div>
        </div>
      </div>
      </div>
      </section>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  background-color: #f9f9f9;

  .flip-card {
    background-color: transparent;
    width: 400px; /* Card size */
    height: 600px;
    perspective: 1000px;
    margin: 20px;
    font-family: sans-serif;
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

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
    padding: 10px;
  }

  .flip-card-front {
    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
      rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
    color: coral;
  }

  .flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
      bisque 40%, rgb(255, 185, 160) 78%);
    color: white;
    transform: rotateY(180deg);
  }

.course-image {
  width: 300px; 
  height: 300px; 
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 15px;
}
  .title {
    font-size: 1.5em;
    font-weight: 900;
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
    color: white;
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
    transition: background-color 0.3s;
  }

  .register-btn:hover {
    background-color: #ff7f50;
  }
    @media (max-width: 768px) {
  .flip-card {
    width: 90%; /* Adjust card width for smaller devices */
    height: auto; /* Allow height to adapt */
    margin: 10px; /* Reduce margin */
  }

  .course-image {
    width: 100%; /* Use full card width on smaller devices */
    height: auto; /* Maintain aspect ratio */
  }
}
`;

export default Nail;
