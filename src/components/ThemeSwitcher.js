import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css'; // Import the CSS file for custom styles

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.className = theme; // Set the body class to the current theme
        localStorage.setItem('theme', theme); // Store the theme in local storage
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="theme-switcher">
            <button onClick={toggleTheme} className={`theme-button ${theme}`}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
};

export default ThemeSwitcher;
