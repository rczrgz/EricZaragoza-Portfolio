// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-center bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark">
      <p>&copy; {new Date().getFullYear()} Eric Zaragoza. All rights reserved.</p>
    </footer>
  );
};

export default Footer;