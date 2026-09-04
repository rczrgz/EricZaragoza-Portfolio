import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Header from './components/Header';
import Home from './sections/Home';
import Projects from './sections/Projects';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-[#07080c] text-gray-950 dark:text-white transition-colors duration-500 selection:bg-[#ccff00] selection:text-black">
        {/* Editorial Loading Screen */}
        <Loader />

        {/* Global Custom Cursor */}
        <CustomCursor />

        {/* Minimal Editorial Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="relative">
          <Home />
          <Projects />
          <About />
          <Skills />
          <Experience />
          <Contact />
        </main>

        {/* Editorial Footer */}
        <Footer />

        {/* Concierge Chatbot */}
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}

export default App;
