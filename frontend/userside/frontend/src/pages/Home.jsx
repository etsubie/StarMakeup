import React, {useState} from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import About from './About';
import Testmonial from '../components/Testmonial';
// import About from "../"

const Home = () => {
 const [currentIndex, setCurrentIndex] = useState(0);

  // List of images
  const images = [
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
  ];

  // Navigate to the previous slide
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  // Navigate to the next slide
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };
  return (
    <section className="mt-4 mb-9">
      <div className="bg-white dark:bg-gray-800 flex flex-col sm:flex-row items-center relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 ml-4 mt-3 sm:pl-3">
            <span className="w-20 h-2 bg-custom-pink dark:bg-white mb-6"></span>
            <h1 className="font-bebas-neue uppercase text-xl sm:text-3xl font-black flex flex-col leading-none dark:text-white text-gray-800 mb-4">
              Discover the Art of Beauty-
              <span className="sm:text-3xl">Transform, Empower & Shine</span>
            </h1>
            <p className="text-lg sm:text-2xl text-gray-700 dark:text-white mb-4">
              Welcome to <span className='italic text-pink-400'>Star Beauty Salon & Academy </span> – Your Gateway to Stunning Transformations and Professional Mastery.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-8">
            <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-custom-pink hover:bg-custom-pink hover:text-white text-md"
              >
                Book an appointment
              </a>
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-custom-pink hover:bg-custom-pink hover:text-white text-md"
              >
                Explore Our Courses
              </a>
            </div>
            <span className="w-20 h-2 bg-custom-pink dark:bg-white ml-96 mt-8"></span>
          </div>
          <div className="carousel relative w-full h-auto overflow-hidden ml-16">
      {/* Carousel Items */}
      <div
        className="carousel-inner relative flex transition-transform duration-500 ml-8"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="carousel-item w-full flex-shrink-0"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className=" "
            />
          </div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={prevSlide}
        className="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-pink-700 p-3 rounded-full z-10"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        onClick={nextSlide}
        className="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-pink-700 p-3 rounded-full z-10"
      >
        <FaChevronRight size={14} />
      </button>
    </div>

        </div>
      </div>
      {/* <About/> */}
      <Testmonial />
    </section>
  );
};

export default Home;
