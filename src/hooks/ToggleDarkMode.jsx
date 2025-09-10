import React, { useState, useEffect } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

function ToggleDarkMode() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="absolute bottom-4 right-4">
        <button 
        className ={`
        flex items-center px-2 py-2 rounded-lg border-2 transition-colors duration-300
        ${darkMode ? 'border-violet-500 hover:border-emerald-300 bg-gray-700 text-gray-50 hover:text-gray-800 hover:bg-violet-50' : 'border-emerald-300 hover:border-violet-500 bg-violet-50 text-gray-800 hover:bg-violet-100'}
        `}
        onClick={() => setDarkMode(!darkMode)}
        >

        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} 
        className='h-5 w-5 m-1'/>
        {darkMode ? 'Mode clair' : 'Mode sombre'}
        
    </button>
    </div>
  );
}


export default ToggleDarkMode;
