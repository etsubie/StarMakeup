import React from 'react';
import '../App.css';

function Header() {
  return (
<header className="h-16 mb-1 shadow-md bg-white pt-1 sticky top-0 z-50">
<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
                <img src="../img/Screenshot_from_2024-11-21_16-18-41-removebg-preview.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-custom-pink italic">Star Beauty</span>
            </a>
            <div className="flex items-center lg:order-2">
                {/* <a href="/login" className="text-gray-800 dark:text-white hover:bg-blue-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a> */}
                <a href="/login" className="text-white bg-custom-pink hover:bg-blue-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Log in</a>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                    <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white border-b-2 border-pink-400" aria-current="page">Home</a>

                    </li>
                    
                    <li>
                        <a href="/about" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
                    </li>
                    <li className="relative">
  <a 
    href="#"
    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("servicesDropdown").classList.toggle("hidden");
    }}
  >
    Services
    <svg
      className="w-3 ml-2 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1l4 4 4-4"
      />
    </svg>
  </a>
  {/* Dropdown menu for main services */}
  <div
    id="servicesDropdown"
    className="absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2 z-50 top-full left-0 transform translate-y-2 dark:bg-gray-700"
    style={{ position: 'absolute', zIndex: '50' }} // Ensures it's above everything else
  >
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <a
          href="/service"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Salon Services
        </a>
      </li>
      <li className="relative">
        <a
          href="#"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("beautyCoursesDropdown").classList.toggle("hidden");
          }}
        >
          Beauty Courses
          <svg
            className="w-3 ml-2 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l4 4 4-4"
            />
          </svg>
        </a>

        {/* Dropdown menu for Beauty Courses */}
        <div
          id="beautyCoursesDropdown"
          className="absolute left-44 top-0 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2 z-50 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="/course"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Nail Courses
              </a>
            </li>
            <li>
              <a
                href="/course"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Makeup Courses
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>
                    <li>
                        <a href="/footer" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  );
}

export default Header;
