import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-green-600">Farmers Goods</Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-800 hover:text-green-600">Home</Link>
        <Link to="/about" className="text-gray-800 hover:text-green-600">About Us</Link>
        <Link to="/contact" className="text-gray-800 hover:text-green-600">Contact</Link>
        <Link to="/my-account" className="text-gray-800 hover:text-green-600">My Account</Link>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-green-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-12 right-0 w-56 bg-white border border-gray-200 shadow-lg z-10">
          <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>About Us</Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>Contact</Link>
          <Link to="/my-account" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>My Account</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
