import React from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon, GlobeAltIcon, PaintBrushIcon, CodeBracketIcon } from '@heroicons/react/24/outline'; // Example icons

const skills = [
  { name: 'React', icon: CodeBracketIcon, level: 'Advanced' },
  { name: 'Tailwind CSS', icon: PaintBrushIcon, level: 'Advanced' },
  { name: 'JavaScript', icon: CommandLineIcon, level: 'Advanced' },
  { name: 'Node.js', icon: GlobeAltIcon, level: 'Intermediate' },
  { name: 'Express.js', icon: GlobeAltIcon, level: 'Intermediate' },
  { name: 'MongoDB', icon: CodeBracketIcon, level: 'Intermediate' },
  { name: 'Framer Motion', icon: PaintBrushIcon, level: 'Advanced' },
  { name: 'Git', icon: CommandLineIcon, level: 'Advanced' },
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="skills" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-primary-light dark:text-primary-dark">Skills</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="p-6 rounded-lg shadow-md bg-card-light dark:bg-card-dark
                         flex flex-col items-center text-center hover:shadow-xl
                         hover:scale-105 transition-all duration-300 group"
              variants={itemVariants}
            >
              <skill.icon className="h-12 w-12 mb-4 text-primary-light dark:text-primary-dark group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
              <motion.span
                className="px-3 py-1 text-sm rounded-full bg-primary-light/20 dark:bg-primary-dark/20
                           text-primary-light dark:text-primary-dark font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                {skill.level}
              </motion.span>
              {/* Optional: Add an animated progress bar */}
              {/* <div className="w-full h-2 bg-gray-300 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="h-full bg-primary-light dark:bg-primary-dark rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }} // Example width, adjust based on skill level
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                ></motion.div>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;