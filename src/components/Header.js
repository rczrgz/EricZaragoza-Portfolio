import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const handleNavLinkClick = () => setIsMenuOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300
        ${isScrolled || isMenuOpen
          ? 'bg-white dark:bg-gray-900 shadow-md'
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between relative z-50">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#home" className="text-2xl font-bold">
            <img
              src={isDarkMode ? '/darklogo.png' : '/lightlogo.png'}
              alt="EZ Logo"
              className="h-8 md:h-12 lg:h-20 w-auto transition-opacity duration-300"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <a
                href={item.href}
                onClick={handleNavLinkClick}
                className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 relative group transition-colors duration-300"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button (Always visible) */}
        <div className="md:hidden flex items-center z-[60]">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 dark:text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Slide from Right) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center
                       bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          >
            <ul className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={item.href}
                    onClick={handleNavLinkClick}
                    className="text-3xl font-bold hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
