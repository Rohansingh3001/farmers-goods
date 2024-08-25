import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaSun, FaMoon } from 'react-icons/fa'; // Import icons for language and theme switcher

import './ThemeSwitcher.css'; // Import custom CSS for ThemeSwitcher styles

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // State for theme
    const { i18n, t } = useTranslation();

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

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

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className={`navbar ${theme}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">Farmers Goods</Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">{t('Home')}</Link>
                    <Link to="/about" className="nav-link">{t('About Us')}</Link>
                    <Link to="/contact" className="nav-link">{t('Contact')}</Link>
                    <Link to="/MyAccount" className="nav-link">{t('My Account')}</Link>

                    {/* Language Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleLanguageDropdown}
                            className="language-button"
                        >
                            <FaGlobe className="icon" />
                            <span>{t('Language')}</span>
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="language-dropdown">
                                <ul>
                                    <li onClick={() => changeLanguage('en')} className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}>
                                        <img src="path/to/flag-en.png" alt="English" className="flag" />
                                        English
                                    </li>
                                    <li onClick={() => changeLanguage('hi')} className={`language-option ${i18n.language === 'hi' ? 'active' : ''}`}>
                                        <img src="path/to/flag-hi.png" alt="Hindi" className="flag" />
                                        हिंदी
                                    </li>
                                    <li onClick={() => changeLanguage('bn')} className={`language-option ${i18n.language === 'bn' ? 'active' : ''}`}>
                                        <img src="path/to/flag-be.png" alt="Bengali" className="flag" />
                                        বাংলা
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Theme Switcher */}
                    <button onClick={toggleTheme} className="theme-button">
                        {theme === 'light' ? <FaMoon className="icon" /> : <FaSun className="icon" />}
                        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className="mobile-menu">
                    <button onClick={toggleMenu} className="mobile-menu-button">
                        <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className={`mobile-dropdown ${theme}`}>
                    <Link to="/" className="mobile-link" onClick={toggleMenu}>{t('Home')}</Link>
                    <Link to="/about" className="mobile-link" onClick={toggleMenu}>{t('About Us')}</Link>
                    <Link to="/contact" className="mobile-link" onClick={toggleMenu}>{t('Contact')}</Link>
                    <Link to="/MyAccount" className="mobile-link" onClick={toggleMenu}>{t('My Account')}</Link>
                    
                    {/* Language Dropdown for mobile */}
                    <div className="language-dropdown">
                        <button onClick={toggleLanguageDropdown} className="language-button">
                            <FaGlobe className="icon" />
                            <span>{t('Language')}</span>
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="language-options">
                                <ul>
                                    <li onClick={() => changeLanguage('en')} className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}>
                                        <img src="path/to/flag-en.png" alt="English" className="flag" />
                                        English
                                    </li>
                                    <li onClick={() => changeLanguage('hi')} className={`language-option ${i18n.language === 'hi' ? 'active' : ''}`}>
                                        <img src="path/to/flag-hi.png" alt="Hindi" className="flag" />
                                        हिंदी
                                    </li>
                                    <li onClick={() => changeLanguage('bn')} className={`language-option ${i18n.language === 'bn' ? 'active' : ''}`}>
                                        <img src="path/to/flag-be.png" alt="Bengali" className="flag" />
                                        বাংলা
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Theme Switcher for Mobile */}
                    <button onClick={toggleTheme} className="theme-button">
                        {theme === 'light' ? <FaMoon className="icon" /> : <FaSun className="icon" />}
                        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
