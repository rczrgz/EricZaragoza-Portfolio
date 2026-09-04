import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-white dark:bg-[#050608] text-gray-950 dark:text-white border-t border-black/10 dark:border-white/10 transition-colors duration-500 relative">
      <div className="container mx-auto px-6 sm:px-10 lg:px-14 max-w-7xl">
        {/* Giant Monolithic Brand Sign-off */}
        <div className="pb-12 border-b border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8 select-none">
          <div>
            <span className="font-mono text-xs text-[#ccff00] uppercase tracking-widest block mb-2">
              CREATIVE ENGINEERING &bull; MANILA, PH
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold uppercase tracking-tighter leading-none text-black dark:text-white">
              ERIC <span className="text-stroke dark:text-stroke text-black/80 dark:text-white/30">ZARAGOZA</span>
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            className="group self-start md:self-end flex items-center gap-3 px-6 py-4 rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 font-mono text-xs uppercase tracking-wider hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
            data-cursor-text="TOP"
          >
            <span>BACK TO SUMMIT</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Details Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500 dark:text-gray-400">
          <div>
            &copy; {currentYear} ERIC ZARAGOZA. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-2">
            <span>BUILT WITH CRAFT &amp; INTENT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            <span className="text-gray-700 dark:text-gray-300">MAGNA CUM LAUDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
