import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Hamburger and close icons

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State for sticky header background

  // Handle scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when a nav item is clicked (for mobile)
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-40 p-4 transition-all duration-300
                 ${isScrolled
                    ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-md'
                    : 'bg-transparent dark:bg-transparent' // Transparent when at top
                  }`}
    >
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand Name (Optional) */}
        <div className="flex-shrink-0">
          <a href="#home" className="text-2xl font-bold text-primary-light dark:text-primary-dark">
             <img 
      src="/EZ.png" 
      alt="EZ Logo" 
      className="h-8 md:h-12 lg:h-20 w-auto"
    />
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <a
                href={item.href}
                onClick={handleNavLinkClick}
                className="text-lg font-semibold hover:text-primary-light dark:hover:text-primary-dark
                           transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-light dark:bg-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-text-light dark:text-text-dark p-2 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
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

      {/* Mobile Menu (Off-canvas) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="md:hidden fixed inset-0 top-16 bg-card-light dark:bg-card-dark z-30 p-6 shadow-xl"
          >
            <ul className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
                >
                  <a
                    href={item.href}
                    onClick={handleNavLinkClick}
                    className="block text-2xl font-bold text-text-light dark:text-text-dark
                               hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300 py-2"
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