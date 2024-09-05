import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { FaGlobe } from 'react-icons/fa'; // Import an icon for the dropdown
import './styles.css'; // Import your CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // State for language dropdown
  const { i18n, t } = useTranslation(); // Destructure the i18n instance and the t function

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Function to handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false); // Close the dropdown after selecting a language
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-green-600">Farmers Goods</Link>
      </div>
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="text-gray-800 hover:text-green-600">{t('Home')}</Link>
        <Link to="/about" className="text-gray-800 hover:text-green-600">{t('About Us')}</Link>
        <Link to="/contact" className="text-gray-800 hover:text-green-600">{t('Contact')}</Link>
        <Link to="/MyAccount" className="text-gray-800 hover:text-green-600">{t('My Account')}</Link>
        
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center space-x-2 text-gray-800 hover:text-green-600 focus:outline-none"
          >
            <FaGlobe className="w-5 h-5" />
            <span>{t('Language')}</span>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  onClick={() => changeLanguage('en')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === 'en' ? 'bg-green-600 text-white' : 'text-gray-800'
                  }`}
                >
                  <img src="path/to/flag-en.png" alt="English" className="w-5 h-5 mr-2" />
                  English
                </li>
                <li
                  onClick={() => changeLanguage('hi')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === 'hi' ? 'bg-green-600 text-white' : 'text-gray-800'
                  }`}
                >
                  <img src="path/to/flag-hi.png" alt="Hindi" className="w-5 h-5 mr-2" />
                  हिंदी
                </li>
                <li
                  onClick={() => changeLanguage('be')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === 'be' ? 'bg-green-600 text-white' : 'text-gray-800'
                  }`}
                >
                  <img src="path/to/flag-be.png" alt="Bengali" className="w-5 h-5 mr-2" />
                  বাংলা
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-green-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-12 right-0 w-56 bg-white border border-gray-200 shadow-lg z-10">
          <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>{t('Home')}</Link>
          <Link to="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>{t('About Us')}</Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>{t('Contact')}</Link>
          <Link to="/MyAccount" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>{t('My Account')}</Link>
          
          {/* Language Dropdown for mobile */}
          <div className="border-t border-gray-200 mt-2">
            <div className="flex justify-center items-center py-2">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 text-gray-800 hover:text-green-600 focus:outline-none"
              >
                <FaGlobe className="w-5 h-5" />
                <span>{t('Language')}</span>
              </button>
            </div>
            {isLanguageDropdownOpen && (
              <div className="bg-white w-full border border-gray-200 shadow-lg">
                <ul className="py-2">
                  <li
                    onClick={() => changeLanguage('en')}
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      i18n.language === 'en' ? 'bg-green-600 text-white' : 'text-gray-800'
                    }`}
                  >
                    <img src="path/to/flag-en.png" alt="English" className="w-5 h-5 mr-2" />
                    English
                  </li>
                  <li
                    onClick={() => changeLanguage('hi')}
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      i18n.language === 'hi' ? 'bg-green-600 text-white' : 'text-gray-800'
                    }`}
                  >
                    <img src="path/to/flag-hi.png" alt="Hindi" className="w-5 h-5 mr-2" />
                    हिंदी
                  </li>
                  <li
                    onClick={() => changeLanguage('bn')}
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      i18n.language === 'bn' ? 'bg-green-600 text-white' : 'text-gray-800'
                    }`}
                  >
                    <img src="path/to/flag-be.png" alt="Bengali" className="w-5 h-5 mr-2" />
                    বাংলা
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
