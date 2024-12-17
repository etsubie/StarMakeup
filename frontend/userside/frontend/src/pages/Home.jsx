import React, { useState } from 'react';
import Testmonial from '../components/Testmonial';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // List of images
  const images = [
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
  ];

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
                href="/course"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-custom-pink hover:bg-custom-pink hover:text-white text-md"
              >
                Explore Our Courses
              </a>
            </div>
            <span className="w-20 h-2 bg-custom-pink dark:bg-white ml-96 mt-8"></span>
          </div>
          
          {/* Carousel Images */}
          <div className="carousel relative w-full h-auto overflow-hidden ml-16">
            <div className="flip-card-container ml-16">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src="../img/05aedf84e7a1802cbaca2456d980570a-removebg-preview.png"
                      alt={`Slide ${currentIndex + 1}`}
                      className="flip-card-image w-full sm:w-3/4 lg:w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flip-card-back">
                    <img
                      src={images[currentIndex]}
                      alt={`Slide ${currentIndex + 1}`}
                      className="flip-card-image w-full sm:w-3/4 lg:w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Testmonial />
    </section>
  );
};

export default Home;











{/* 

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import About from './About';
import Testmonial from '../components/Testmonial';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // List of images
  const images = [
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
    "../img/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg",
  ];

  return (
    <section className="mt-4 mb-9">
      <div className="bg-white dark:bg-gray-800 flex flex-col sm:flex-row items-center relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between">
//           {/* Left Content */}
//           <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 ml-4 mt-3 sm:pl-3">
//             <span className="w-20 h-2 bg-custom-pink dark:bg-white mb-6"></span>
//             <h1 className="font-bebas-neue uppercase text-xl sm:text-3xl font-black flex flex-col leading-none dark:text-white text-gray-800 mb-4">
//               Discover the Art of Beauty-
//               <span className="sm:text-3xl">Transform, Empower & Shine</span>
//             </h1>
//             <p className="text-lg sm:text-2xl text-gray-700 dark:text-white mb-4">
//               Welcome to <span className='italic text-pink-400'>Star Beauty Salon & Academy </span> – Your Gateway to Stunning Transformations and Professional Mastery.
//             </p>
//             <div className="flex flex-col sm:flex-row sm:space-x-4 mt-8">
//               <a
//                 href="#"
//                 className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-custom-pink hover:bg-custom-pink hover:text-white text-md"
//               >
//                 Book an appointment
//               </a>
//               <a
//                 href="/course"
//                 className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-custom-pink hover:bg-custom-pink hover:text-white text-md"
//               >
//                 Explore Our Courses
//               </a>
//             </div>
//             <span className="w-20 h-2 bg-custom-pink dark:bg-white ml-96 mt-8"></span>
//           </div>

//           {/* Right Content (Image Card) */}
//           <div className="flip-card-container ml-16">
//             <div className="flip-card">
//               <div className="flip-card-inner">
//                 <div className="flip-card-front">
//                   <img
//                     src={images[currentIndex]}
//                     alt={`Slide ${currentIndex + 1}`}
//                     className="flip-card-image"
//                   />
//                 </div>
//                 <div className="flip-card-back">
//                   <p className="flip-card-text">Transform Your Beauty</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Testmonial />
//     </section>
//   );
// };

// export default Home; */}
