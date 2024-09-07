import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUser, FaCog, FaSignOutAlt, FaUserAlt, FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // Mobile search toggle
  const { i18n, t } = useTranslation();
  const languageDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null); // Ref for mobile menu
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Sample product list
  const items = [
    "Apples", "Bananas", "Carrots", "Milk", "Eggplant", 
    "Cucumbers", "Tomatoes", "Lettuce", "Spinach", "Broccoli", 
    "Oranges", "Grapes", "Strawberries", "Blueberries", "Pineapple", 
    "Yogurt", "Cheese", "Butter", "Milk", "Eggs"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) &&
        (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) &&
        (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target))
      ) {
        setIsLanguageDropdownOpen(false);
        setIsAccountDropdownOpen(false);
        setIsOpen(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen); // Mobile search toggle
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
  };
  const handleLogout = () => {
    console.log("Logging out...");
    setIsAccountDropdownOpen(false);
  };

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

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      {/* Brand and Toggle Button */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-green-600">Farmers Goods</Link>
      </div>

      {/* Search Bar (Desktop) */}
      <div className="relative mx-6 hidden md:block">
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

      {/* Mobile Search and Hamburger Icons */}
      <div className="md:hidden flex items-center">
        {/* Mobile Search Icon */}
        <button onClick={toggleMobileSearch} className="text-gray-800 focus:outline-none">
          <FaSearch />
        </button>
        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="ml-4 text-gray-800 hover:text-green-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="text-gray-800 hover:text-green-600">{t('Home')}</Link>
        <Link to="/about" className="text-gray-800 hover:text-green-600">{t('About Us')}</Link>
        <Link to="/contact" className="text-gray-800 hover:text-green-600">{t('Contact')}</Link>

        {/* Account and Language Dropdowns */}
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
                  <img src="path/to/english-flag-icon" alt="English" className="mr-2 w-5 h-5" />
                  English
                </li>
                <li
                  onClick={() => changeLanguage('hi')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === 'hi' ? 'bg-green-600 text-white' : 'text-gray-800'
                  }`}
                >
                  <img src="path/to/hindi-flag-icon" alt="Hindi" className="mr-2 w-5 h-5" />
                  Hindi
                </li>
                <li
                  onClick={() => changeLanguage('bn')}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    i18n.language === 'bn' ? 'bg-green-600 text-white' : 'text-gray-800'
                  }`}
                >
                  <img src="path/to/bengali-flag-icon" alt="Bengali" className="mr-2 w-5 h-5" />
                  Bengali
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

     {/* Mobile Menu */}
<div
  className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-300`}
>
  <div ref={mobileMenuRef} className="bg-white w-64 h-full shadow-lg p-4">
    {/* Mobile Links */}
    <div className="mt-6 space-y-4">
      <Link to="/" className="block text-gray-800 hover:text-green-600" onClick={toggleMenu}>
        {t('Home')}
      </Link>
      <Link to="/about" className="block text-gray-800 hover:text-green-600" onClick={toggleMenu}>
        {t('About Us')}
      </Link>
      <Link to="/contact" className="block text-gray-800 hover:text-green-600" onClick={toggleMenu}>
        {t('Contact')}
      </Link>
    </div>

    {/* Account and Language Dropdowns */}
    <div className="mt-6">
      <button
        onClick={toggleAccountDropdown}
        className="flex items-center text-gray-800 hover:text-green-600 w-full focus:outline-none"
      >
        <FaUser className="mr-2" />
        {t('My Account')}
      </button>
      {isAccountDropdownOpen && (
        <div className="mt-2">
          <ul className="py-2 space-y-2">
            <li>
              <Link to="/MyAccount" className="flex items-center text-gray-800 hover:bg-gray-100 px-4 py-2" onClick={toggleMenu}>
                <FaUserAlt className="mr-2" />
                {t('View Profile')}
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center text-gray-800 hover:bg-gray-100 px-4 py-2" onClick={toggleMenu}>
                <FaCog className="mr-2" />
                {t('Settings')}
              </Link>
            </li>
            <li
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center text-gray-800 hover:bg-gray-100 px-4 py-2"
            >
              <FaSignOutAlt className="mr-2" />
              {t('Logout')}
            </li>
          </ul>
        </div>
      )}
    </div>

    <div className="mt-6">
      <button
        onClick={toggleLanguageDropdown}
        className="flex items-center text-gray-800 hover:text-green-600 w-full focus:outline-none"
      >
        <FaGlobe className="mr-2" />
        {t('Language')}
      </button>
      {isLanguageDropdownOpen && (
        <div className="mt-2">
          <ul className="py-2 space-y-2">
            <li onClick={() => { changeLanguage('en'); toggleMenu(); }} className="flex items-center text-gray-800 px-4 py-2">
              <img src="path/to/english-flag-icon" alt="English" className="mr-2 w-5 h-5" />
              English
            </li>
            <li onClick={() => { changeLanguage('hi'); toggleMenu(); }} className="flex items-center text-gray-800 px-4 py-2">
              <img src="path/to/hindi-flag-icon" alt="Hindi" className="mr-2 w-5 h-5" />
              Hindi
            </li>
            <li onClick={() => { changeLanguage('bn'); toggleMenu(); }} className="flex items-center text-gray-800 px-4 py-2">
              <img src="path/to/bengali-flag-icon" alt="Bengali" className="mr-2 w-5 h-5" />
              Bengali
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>
</div>

</nav>
  );
};

export default Navbar;
