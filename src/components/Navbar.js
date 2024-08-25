import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher'; // Import ThemeSwitcher
import './styles.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
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
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'text-gray-800'}`}
                >
                  English
                </li>
                <li
                  onClick={() => changeLanguage('hi')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${i18n.language === 'hi' ? 'bg-green-600 text-white' : 'text-gray-800'}`}
                >
                  हिंदी
                </li>
                <li
                  onClick={() => changeLanguage('bn')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${i18n.language === 'bn' ? 'bg-green-600 text-white' : 'text-gray-800'}`}
                >
                  বাংলা
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-green-600 focus:outline-none">
          {/* Toggle button SVG */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
