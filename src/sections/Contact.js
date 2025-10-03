import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InstagramIcon, LinkedinIcon, GitHubIcon } from '../components/SocialIcons.js'; // Custom social icons

// src/components/SocialIcons.js (Ensure this file exists with the SVG icons)
// export const InstagramIcon = (props) => ( ... );
// export const LinkedinIcon = (props) => ( ... );
// export const GitHubIcon = (props) => ( ... );


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    // For a static portfolio, you might use a service like Formspree or Netlify Forms
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <section id="contact" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Get in <span className="text-primary-light dark:text-primary-dark">Touch</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Contact Form */}
          <motion.div
            className="w-full lg:w-1/2 p-8 rounded-xl shadow-2xl backdrop-filter backdrop-blur-lg
                       bg-gradient-to-br from-card-light/70 to-card-light/40
                       dark:from-card-dark/70 dark:to-card-dark/40
                       border border-gray-200 dark:border-gray-700 glassmorphism-effect"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none
                             transition-colors duration-300 text-text-light dark:text-text-dark"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none
                             transition-colors duration-300 text-text-light dark:text-text-dark"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600
                             focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none
                             transition-colors duration-300 text-text-light dark:text-text-dark"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-primary-light dark:bg-primary-dark text-white font-semibold text-lg
                           hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="w-full lg:w-1/3 flex flex-col items-center justify-center p-8
                       bg-card-light dark:bg-card-dark rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Connect with Me</h3>
            <div className="flex space-x-6">
              <motion.a
                href="https://www.instagram.com/rc.zrgz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark
                           transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <InstagramIcon className="h-10 w-10" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/eric-zaragoza-7408a6252/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark
                           transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedinIcon className="h-10 w-10" />
              </motion.a>
              <motion.a
                href="https://github.com/rczrgz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark
                           transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <GitHubIcon className="h-10 w-10" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;