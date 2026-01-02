import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, X } from 'lucide-react';

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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={onClose}
            className="bg-white/90 dark:bg-gray-800/90 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>

        {/* Media Content */}
        <div className="px-4 md:px-6 -mt-16">
          <div className="rounded-xl overflow-hidden shadow-lg mb-4">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 md:h-64 object-cover"
              />
            )}
          </div>

          {project.video && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-4">
              <video
                src={project.video}
                controls
                controlsList="nodownload"
                className="w-full h-48 md:h-64 object-cover"
                style={{ objectFit: 'contain' }}
                onLoadedMetadata={(e) => {
                  e.target.style.objectFit = 'contain';
                }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 pb-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.liveLink !== '#' && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Live Demo</span>
              </a>
            )}
            
            {project.githubLink !== '#' && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                <Eye className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id='projects' className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image/Video */}
              <div className="relative h-64 overflow-hidden">
                {project.video && !project.image ? (
                  <video
                    src={project.video}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;