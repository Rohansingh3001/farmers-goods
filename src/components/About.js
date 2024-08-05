import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mt-6">About Us</h1>
      <div className="w-full max-w-4xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          At Farmers Goods Marketplace, our mission is to connect local farmers with consumers, providing fresh and organic produce directly to your doorstep.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We believe in supporting local agriculture and offering our customers the best in quality and freshness.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Learn more about our values and vision for a sustainable future by reading our story.
        </p>
        <Link to="/story" className="text-blue-600 hover:underline">
          Read Our Story
        </Link>
      </div>
    </div>
  );
};

export default About;
