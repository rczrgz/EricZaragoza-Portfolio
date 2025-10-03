import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, EyeIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    id: 1,
    title: 'Self-Shoot Website',
    description: 'A self-service photography studio app that streamlines bookings, inventory management, and employee monitoring.',
    image: 'project1.png',
    tags: ['Figma', ],
    liveLink: 'https://www.figma.com/proto/MZqvDkSiYImGyrOfVJQlYb/DOS-Prototype?node-id=323-2&t=Rnfm1D9jgk3BuzhM-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=323%3A2',
    githubLink: '#',
  },
  {
    id: 2,
    title: 'OptiSnap',
    description: 'A comprehensive system for self-photography studios that streamlines bookings, inventory management, employee monitoring, and forecasting.',
    image: 'project2.png',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    liveLink: '#',
    githubLink: 'https://github.com/rczrgz/Dos-Studio',
  },
  {
    id: 3,
    title: 'Weather Wheater Lang',
    description: 'A Flutter mobile app featuring real-time weather updates, an iPhone-style calculator, and a simple notepad—built as my first Flutter project during my internship.',
    image: 'project3.jpg',
    tags: ['Flutter', 'Dart', 'Mobile App', 'Provider', 'API'],
    liveLink: '#',
    githubLink: 'https://github.com/rczrgz/Weather-App/tree/master',
  },
  {
    id: 4,
    title: 'ER PCR',
    description: 'An internal company app for recording patient data, including vitals and remarks, to streamline hospital handoffs. Built with Flutter and Mapbox API to track patient location from pickup to hospital transfer, inspired by MoveIt App.',
    video: 'project4.mp4',
    tags: ['Flutter', 'Mapbox API', 'Healthcare Workflow', 'Internal App'],
    liveLink: '#', // No public link
    githubLink: '#', // No public repository
},
];

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          {project.video && !project.image && (
            <video
              src={project.video}
              controls
              className="rounded-lg w-full h-auto object-cover"
            />
          )}
          {project.image && !project.video && (
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg w-full h-auto object-cover"
            />
          )}
          {project.image && project.video && (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg mb-4 w-full h-auto object-cover"
              />
              <video
                src={project.video}
                controls
                className="rounded-lg w-full h-auto object-cover"
              />
            </>
          )}
        </div>

        <h3 className="text-3xl font-bold mb-4 text-primary-light dark:text-primary-dark">{project.title}</h3>
        <p className="text-text-light dark:text-text-dark mb-4 text-lg">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            <LinkIcon className="h-5 w-5" /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            <EyeIcon className="h-5 w-5" /> GitHub
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="projects" className="py-20 bg-card-light dark:bg-card-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-primary-light dark:text-primary-dark">Projects</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative rounded-xl overflow-hidden shadow-lg bg-card-light dark:bg-card-dark
                         group cursor-pointer hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
            >
              {project.video ? (
                <video
                  src={project.video}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  controls
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-primary-light dark:bg-primary-dark text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;