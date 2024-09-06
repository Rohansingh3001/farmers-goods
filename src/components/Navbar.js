import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUser, FaCog, FaSignOutAlt, FaUserAlt, FaSearch } from 'react-icons/fa'; // Added FaSearch icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const languageDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Expanded product list to include vegetables, fruits, and dairy products
  const items = [
    "Apples", "Bananas", "Carrots", "Milk", "Eggplant", 
    "Cucumbers", "Tomatoes", "Lettuce", "Spinach", "Broccoli", 
    "Oranges", "Grapes", "Strawberries", "Blueberries", "Pineapple", 
    "Yogurt", "Cheese", "Butter", "Milk", "Eggs"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
      setIsOpen(false); 
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
  };
  const handleLogout = () => {
    console.log("Logging out...");
    setIsAccountDropdownOpen(false);
  };

  // Function to handle search query changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredSuggestions = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-green-600">Farmers Goods</Link>
      </div>

      {/* Search Bar in the center of the Navbar */}
      <div className="relative mx-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-64"
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="text-gray-800 hover:text-green-600">{t('Home')}</Link>
        <Link to="/about" className="text-gray-800 hover:text-green-600">{t('About Us')}</Link>
        <Link to="/contact" className="text-gray-800 hover:text-green-600">{t('Contact')}</Link>

        {/* My Account Dropdown */}
        <div className="relative" ref={accountDropdownRef}>
          <button
            onClick={toggleAccountDropdown}
            className="flex items-center text-gray-800 hover:text-green-600 focus:outline-none"
          >
            <FaUser className="w-5 h-5" />
          </button>
          {isAccountDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/MyAccount" className="flex items-center text-gray-800 block">
                    <FaUserAlt className="mr-2" />
                    {t('View Profile')}
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/settings" className="flex items-center text-gray-800 block">
                    <FaCog className="mr-2" />
                    {t('Settings')}
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                >
                  <FaSignOutAlt className="mr-2" />
                  {t('Logout')}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center text-gray-800 hover:text-green-600 focus:outline-none"
          >
            <FaGlobe className="w-5 h-5" />
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

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-green-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
