import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">About Us</h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center max-w-2xl">
        At Farmers Good, we are dedicated to connecting local farmers with consumers who value fresh, sustainable, and high-quality produce. Our mission is to empower farmers by providing them with a platform to sell their goods directly to you, ensuring fair prices and supporting local agriculture.
      </p>
      <div className="flex flex-col items-center mb-6">
        <img src="https://placehold.co/400x300/eeeeee/4B5563/png?text=Farmers+Market" alt="Farmers Market" className="mb-4 rounded-lg shadow-lg" />
        <p className="text-gray-600 dark:text-gray-300">
          Our farmers are passionate about their craft, and we believe that their hard work deserves recognition. By choosing Farmers Good, you are not only getting the freshest produce but also supporting the livelihoods of local farmers.
        </p>
      </div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Our Values</h2>
      <ul className="list-disc list-inside mb-6 text-gray-600 dark:text-gray-300">
        <li>Quality: We prioritize high-quality products that are grown with care.</li>
        <li>Sustainability: We promote sustainable farming practices that protect our environment.</li>
        <li>Community: We believe in building strong relationships between farmers and consumers.</li>
      </ul>
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Join Us</h2>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center max-w-2xl">
        Join us in our journey to support local farmers and enjoy the freshest produce available. Together, we can make a difference in our communities and promote a healthier lifestyle.
      </p>
      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
        Get Started
        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path>
        </svg>
      </a>
    </div>
  );
};

export default About;
