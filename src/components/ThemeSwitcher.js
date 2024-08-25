import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("bg-black", "text-white");
            document.body.classList.remove("bg-white", "text-black");
        } else {
            document.body.classList.add("bg-white", "text-black");
            document.body.classList.remove("bg-black", "text-white");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded text-white ${
                theme === "light" ? "bg-blue-500" : "bg-blue-700"
            }`}
        >
            Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
    );
};

export default ThemeSwitcher;
