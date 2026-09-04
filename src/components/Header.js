import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const navItems = [
  { number: '01', name: 'WORK', href: '#projects' },
  { number: '02', name: 'ABOUT', href: '#about' },
  { number: '03', name: 'SKILLS', href: '#skills' },
  { number: '04', name: 'EXPERIENCE', href: '#experience' },
  { number: '05', name: 'CONTACT', href: '#contact' },
];

export const ThemeToggle = () => {
  const context = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    if (context && context.toggleTheme) {
      context.toggleTheme();
    } else {
      document.documentElement.classList.toggle('dark');
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-gray-100 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle theme"
      data-cursor-text="MODE"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4 w-4 text-[#ccff00]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4 w-4 text-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section spy
      const sections = ['home', 'projects', 'about', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 md:py-4 px-4 sm:px-8'
            : 'py-6 md:py-8 px-6 sm:px-12'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 dark:bg-[#090b10]/85 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full px-6 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
              : 'bg-transparent'
          }`}
        >
          {/* Logo / Identity */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3 cursor-pointer"
            data-cursor-text="HOME"
          >
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-display font-extrabold text-xs tracking-tighter group-hover:bg-[#ccff00] group-hover:text-black transition-colors duration-300">
              EZ
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm tracking-tight text-gray-950 dark:text-white uppercase leading-none">
                Eric Zaragoza
              </span>
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 tracking-wider">
                CREATIVE DEV
              </span>
            </div>
          </a>

          {/* Availability Status Badge (Hidden on small mobile) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[11px] font-mono text-gray-600 dark:text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span>AVAILABLE FOR WORK</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-black dark:text-black font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                  data-cursor-text={item.name}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 rounded-full bg-[#ccff00] shadow-[0_0_16px_rgba(204,255,0,0.5)] z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 text-[10px] ${isActive ? 'text-black opacity-80' : 'text-[#ccff00]'}`}>
                    {item.number}
                  </span>
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action & Theme Switch */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Quick Contact CTA (Desktop) */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-semibold hover:bg-[#ccff00] hover:text-black dark:hover:bg-[#ccff00] dark:hover:text-black transition-all duration-300"
              data-cursor-text="TALK"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-gray-100"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5 text-[#ccff00]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Editorial Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#060709]/95 backdrop-blur-2xl text-white flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="space-y-6">
              <span className="text-xs font-mono text-[#ccff00] tracking-widest uppercase">
                INDEX / NAVIGATION
              </span>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                    className="group flex items-baseline gap-4 py-2 border-b border-white/10"
                  >
                    <span className="font-mono text-sm text-[#ccff00]">
                      {item.number}
                    </span>
                    <span className="font-display text-3xl font-extrabold uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                      {item.name}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs text-gray-400">
              <div className="flex justify-between items-center">
                <span>STATUS: AVAILABLE FOR CONTRACT</span>
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              </div>
              <div className="text-[11px] text-gray-500">
                ERIC ZARAGOZA &bull; MANILA, PH
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
