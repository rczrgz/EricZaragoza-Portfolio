import React from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon, GlobeAltIcon, PaintBrushIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const skills = [
  { 
    name: 'React', 
    icon: CodeBracketIcon, 
    level: 'Proficient',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    description: 'Building dynamic UIs with component-based architecture'
  },
  { 
    name: 'Tailwind CSS', 
    icon: PaintBrushIcon, 
    level: 'Proficient',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop',
    description: 'Crafting responsive and modern UI designs with utility classes'
  },
  { 
    name: 'JavaScript', 
    icon: CommandLineIcon, 
    level: 'Proficient',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop',
    description: 'Writing modern, efficient code for web applications'
  },
  { 
    name: 'Node.js', 
    icon: GlobeAltIcon, 
    level: 'Competent',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    description: 'Building scalable server-side applications'
  },
  { 
    name: 'Git', 
    icon: CommandLineIcon, 
    level: 'Proficient',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop',
    description: 'Version control and collaborative development workflows'
  },
  { 
    name: 'Flutter', 
    icon: CodeBracketIcon, 
    level: 'Competent',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    description: 'Building cross-platform mobile applications'
  },
  { 
    name: 'Dart', 
    icon: CommandLineIcon, 
    level: 'Competent',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    description: 'Programming language for Flutter application development'
  },
  { 
    name: 'HTML', 
    icon: CodeBracketIcon, 
    level: 'Proficient',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    description: 'Structuring accessible and semantic web content'
  },
  { 
    name: 'MySQL', 
    icon: GlobeAltIcon, 
    level: 'Competent',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop',
    description: 'Managing relational databases and structured data'
  },
  { 
    name: 'PHP', 
    icon: CommandLineIcon, 
    level: 'Competent',
    image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&h=400&fit=crop',
    description: 'Server-side scripting for dynamic web applications'
  },
  { 
    name: 'n8n', 
    icon: GlobeAltIcon, 
    level: 'Competent',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    description: 'Workflow automation and integration platform'
  },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = React.useState(null);

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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-16 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-blue-600 dark:text-blue-400">Skills</span>
        </motion.h2>

        <div className="flex gap-10 items-start">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full lg:w-[58%]"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="p-5 rounded-xl shadow-md bg-white dark:bg-gray-800
                           flex flex-col items-center text-center hover:shadow-xl
                           hover:scale-105 transition-all duration-300 group cursor-pointer
                           border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
                variants={itemVariants}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <skill.icon className="h-12 w-12 mb-4 text-blue-600 dark:text-blue-400 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
                <motion.span
                  className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900
                             text-blue-600 dark:text-blue-300 font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {skill.level}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Image Preview Panel */}
          <div className="hidden lg:block sticky top-24 w-full lg:w-[42%]">
            <motion.div
              className="relative h-[550px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  className="absolute inset-0 p-6 flex flex-col"
                  initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Image Container with Glassmorphism */}
                  <div className="relative rounded-xl overflow-hidden mb-6 h-80 group">
                    <motion.img
                      src={hoveredSkill.image}
                      alt={hoveredSkill.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Floating Icon */}
                    <motion.div
                      className="absolute top-5 right-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-full shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <hoveredSkill.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <motion.div
                    className="flex-1 flex flex-col justify-between"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div>
                      <motion.h3
                        className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {hoveredSkill.name}
                      </motion.h3>
                      
                      <motion.div
                        className="inline-block px-5 py-2 rounded-full bg-blue-100 dark:bg-blue-900 mb-5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.25, type: 'spring' }}
                      >
                        <span className="text-base font-semibold text-blue-600 dark:text-blue-300">
                          {hoveredSkill.level} Level
                        </span>
                      </motion.div>

                      <motion.p
                        className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {hoveredSkill.description}
                      </motion.p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex gap-2 mt-6">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-1 flex-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center"
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <PaintBrushIcon className="h-12 w-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Explore My Skills
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Hover over any skill card to see more details
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;