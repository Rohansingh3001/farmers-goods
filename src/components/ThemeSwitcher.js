 import React, { useState, useEffect } from "react";  

    const ThemeSwitcher = () => {  
        const [theme, setTheme] = useState("light");  

        useEffect(() => {  
            document.body.className = theme;  
        }, [theme]);  

        const toggleTheme = () => {  
            setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));  
        };  

        return (  
            <div className={`flex items-center justify-center h-screen bg-${theme === "light" ? "white" : "gray-800"}`}>  
                <button  
                    onClick={toggleTheme}  
                    className={`px-4 py-2 rounded text-white ${theme === "light" ? "bg-blue-500" : "bg-blue-700"}`}  
                >  
                    Switch to {theme === "light" ? "Dark" : "Light"} Theme  
                </button>  
            </div>  
        );  
    };  

    export default ThemeSwitcher; 
