import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Dumbbell, Brain, CheckCircle2 } from 'lucide-react';

const About = () => {
  const [activePhoto, setActivePhoto] = useState('soft'); // 'soft' | 'hard'

  const pillars = [
    {
      number: '01',
      title: 'Structure Over Shortcuts',
      desc: 'Understanding the underlying architecture, system design, and database relationships yields resilient code that scales smoothly when traffic surges.',
      icon: Brain,
    },
    {
      number: '02',
      title: 'Human Intent + AI Lever',
      desc: 'AI is a powerful force multiplier, but engineering discernment, code quality control, and edge-case prevention remain strictly human-driven.',
      icon: CheckCircle2,
    },
    {
      number: '03',
      title: 'Discipline in Gym & Code',
      desc: 'Consistent progressive overload in the gym mirrors engineering: daily deliberate practice, unwavering patience, and continuous self-refinement.',
      icon: Dumbbell,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-36 bg-[#f5f6f9] dark:bg-[#090b10] text-gray-950 dark:text-white transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-display font-extrabold text-black/[0.02] dark:text-white/[0.02] select-none pointer-events-none uppercase">
        ARCHITECT
      </div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-14 max-w-7xl relative z-10">
        {/* Section Header Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] tracking-[0.25em] uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          <span>[ 02 // MANIFESTO &amp; DISCIPLINE ]</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">THE PHILOSOPHY</span>
        </div>

        {/* Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9vw] font-black font-display uppercase tracking-tighter leading-[0.80] select-none">
            I DON'T JUST
            <br />
            BUILD WEBSITES.
            <br />
            <span className="text-stroke dark:text-stroke text-black/85 dark:text-white/25 hover:text-black dark:hover:text-white transition-all duration-500 inline-block mt-1">
              /&nbsp;I CRAFT EXPERIENCES.
            </span>
          </h2>
        </motion.div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Narrative, Academic Accolade & Architectural Ledger */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-gray-700 dark:text-gray-300"
            >
              <p>
                Hello, I’m <strong className="font-extrabold text-black dark:text-white font-display uppercase">Eric Zaragoza</strong>—a creative software engineer who graduated{' '}
                <span className="inline-block px-3 py-1 rounded-full bg-[#ccff00] text-black font-mono text-xs font-black uppercase tracking-wider align-middle shadow-md">
                  ★ Magna Cum Laude
                </span>{' '}
                from the Polytechnic University of the Philippines with a BS in Computer Engineering.
              </p>

              <p>
                In an era where cookie-cutter templates and quick shortcuts are everywhere, I take pride in understanding the <strong className="font-semibold text-black dark:text-white">fundamental structure</strong> and the core <em>why</em> behind every line of code. Whether writing custom Shopify Liquid modules, optimizing WooCommerce delivery restrictions, or architecting cross-platform Flutter workflows, I engineer systems that stand the test of production reality.
              </p>

              <p>
                I actively harness AI as a cutting-edge lever to accelerate velocity, but the vision, architecture, and craftsmanship are always in my hands. Beyond code, my discipline is forged in the <strong className="font-semibold text-black dark:text-white">gym</strong> and strategic focus sharpened through <strong className="font-semibold text-black dark:text-white">gaming</strong>. Every project is an opportunity to explore, build, and deliver work that leaves a mark.
              </p>
            </motion.div>

            {/* Architectural Ledger Pillars (No generic card boxes) */}
            <div className="pt-8 border-t border-black/15 dark:border-white/10 space-y-8">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                <span>[ CORE PRINCIPLES &amp; STANDARDS ]</span>
                <span>03 PILLARS</span>
              </div>

              <div className="space-y-6">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.number}
                      className="group py-5 border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all duration-300 hover:border-[#ccff00]"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs text-[#ccff00] font-black tracking-widest pt-1">
                          [ {pillar.number} ]
                        </span>
                        <div>
                          <h4 className="font-display font-extrabold text-lg sm:text-xl text-black dark:text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors flex items-center gap-3">
                            <span>{pillar.title}</span>
                            <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#ccff00] transition-colors" />
                          </h4>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl font-light">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: High-Tension Dual Persona Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md p-4 sm:p-6 rounded-3xl bg-black/5 dark:bg-white/[0.04] backdrop-blur-xl border border-black/15 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative"
            >
              {/* Dual Mode Switcher Bar */}
              <div className="relative flex items-center justify-between p-1.5 mb-5 rounded-full bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/10">
                <button
                  onClick={() => setActivePhoto('soft')}
                  className={`relative flex-1 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-extrabold transition-colors duration-200 z-10 ${
                    activePhoto === 'soft'
                      ? 'text-[#ccff00] dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                  data-cursor-text="DEV"
                >
                  {activePhoto === 'soft' && (
                    <motion.div
                      layoutId="aboutModeIndicator"
                      className="absolute inset-0 rounded-full bg-black dark:bg-[#ccff00] shadow-md z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>ENGINEER MODE</span>
                </button>
                <button
                  onClick={() => setActivePhoto('hard')}
                  className={`relative flex-1 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-extrabold transition-colors duration-200 z-10 ${
                    activePhoto === 'hard'
                      ? 'text-[#ccff00] dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                  data-cursor-text="GYM"
                >
                  {activePhoto === 'hard' && (
                    <motion.div
                      layoutId="aboutModeIndicator"
                      className="absolute inset-0 rounded-full bg-black dark:bg-[#ccff00] shadow-md z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>DISCIPLINE MODE</span>
                </button>
              </div>

              {/* Interactive Visual Viewport */}
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/80 cursor-pointer group shadow-2xl"
                onClick={() => setActivePhoto(activePhoto === 'soft' ? 'hard' : 'soft')}
                data-cursor-text="SWITCH"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={activePhoto === 'soft' ? 'softguy.jpg' : 'hardguy.jpg'}
                    alt={activePhoto === 'soft' ? 'Eric Zaragoza Developer' : 'Eric Zaragoza Discipline'}
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {/* Tactical Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/90">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 uppercase font-bold">
                    {activePhoto === 'soft' ? 'DISK 01 // DEV & CODE' : 'DISK 02 // GYM & MIND'}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#ccff00] text-black font-extrabold uppercase">
                    CLICK TO TOGGLE
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-mono text-[11px] text-[#ccff00] uppercase tracking-wider block font-bold">
                    POLYTECHNIC UNIVERSITY OF THE PHILIPPINES
                  </span>
                  <h4 className="font-display font-black text-2xl uppercase tracking-tight">
                    Magna Cum Laude
                  </h4>
                </div>
              </div>

              {/* Bottom Quick Metric Card */}
              <div className="mt-4 p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#ccff00]" />
                  <span className="font-semibold">BS Computer Engineering</span>
                </span>
                <span className="text-[#ccff00] font-black uppercase">HONORS GRADUATE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
