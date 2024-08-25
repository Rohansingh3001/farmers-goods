// src/components/ThemeSwitcher.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.className = theme; // Set the body class to the current theme
        localStorage.setItem('theme', theme); // Store the theme in local storage
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <button
                onClick={toggleTheme}
                className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
};

export default ThemeSwitcher;
