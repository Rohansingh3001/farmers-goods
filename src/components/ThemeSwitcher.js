import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#000000'; // Black background
            document.body.style.color = '#ffffff'; // White text
        } else {
            document.body.style.backgroundColor = ''; // Default background
            document.body.style.color = ''; // Default text color
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                backgroundColor: theme === 'light' ? '#6200ea' : '#bb86fc', // Adjust button color based on theme
                color: theme === 'light' ? '#ffffff' : '#000000', // Text color for button
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
            }}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

export default ThemeSwitcher;
