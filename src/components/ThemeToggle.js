import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {/* Desktop - In Header (top right) */}
      <motion.button
        onClick={toggleTheme}
        className="hidden md:block p-2 rounded-full shadow-lg
                   bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </motion.button>

      {/* Mobile - Bottom Right */}
      <motion.button
        onClick={toggleTheme}
        className="md:hidden fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-[100]
                   bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </motion.button>
    </>
  );
};

export default ThemeToggle;