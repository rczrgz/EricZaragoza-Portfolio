import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsHovered(!isHovered);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-16 text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-blue-600 dark:text-blue-400">Me</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-200 dark:border-gray-700">
          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
              Hey, I’m <strong className="font-bold text-blue-600 dark:text-blue-400">Eric Zaragoza</strong>
              —a fresh graduate from the Polytechnic University of the Philippines (Magna Cum Laude).
              This website is built in just one day of pure coding vibes—a mix of learning,
              exploring, and creating on the go.
            </p>

            <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
              I’m not a “master” yet, but I believe knowing the
              <strong className="font-bold text-blue-600 dark:text-blue-400"> structure </strong>
              and the why behind the code matters more than shortcuts.
              I use <strong className="font-bold text-blue-600 dark:text-blue-400">AI</strong> as a tool,
              but I’m the one in control—constantly experimenting, learning, and pushing myself to grow.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Beyond coding, I enjoy the
              <strong className="font-bold text-blue-600 dark:text-blue-400"> gym </strong>
              and <strong className="font-bold text-blue-600 dark:text-blue-400"> gaming </strong>,
              which fuel my discipline, focus, and creativity.
              For me, every project is a first-time adventure—a chance to explore, build, and improve.
            </p>

          </motion.div>
          
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div 
              className="relative h-64 md:h-80 lg:h-96 w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl overflow-hidden cursor-pointer select-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={isHovered ? 'hard' : 'soft'}
                  src={isHovered ? "hardguy.jpg" : "softguy.jpg"}
                  alt="About Me"
                  className="h-full w-full object-cover rounded-xl"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              
              {/* Optional: Add a subtle overlay hint */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;