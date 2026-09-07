import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2025 — NOW',
    role: 'E-Commerce & Web Engineer',
    company: 'Love To Dream PH & Mamas & Papas',
    type: 'Production Role',
    category: 'E-COMMERCE & WEB ENGINEERING',
    summary:
      'Spearheading WordPress & Shopify technical optimizations for leading consumer brands in the Philippines. Developed custom WooCommerce plugins with regional shipping restrictions and delivery automation, and created dynamic collection-aware Liquid tag filtering.',
    highlights: [
      'Engineered automated regional shipping logic & delivery scheduling.',
      'Developed custom Liquid collection-filtering logic for multi-brand catalog.',
      'Maintained high checkout throughput and low-latency asset delivery.',
    ],
    technologies: ['WordPress', 'WooCommerce', 'Shopify', 'Liquid', 'PHP', 'JavaScript'],
  },
  {
    year: '2024 — 2025',
    role: 'Full-Stack Developer (Contract)',
    company: 'PICPA Ireland / Pixel Profile',
    type: 'Freelance Contract',
    category: 'BESPOKE PLATFORM ARCHITECTURE',
    summary:
      'Contracted by Pixel Profile to engineer a comprehensive digital portal for PICPA Ireland—an international association of Filipino finance professionals across Ireland and Europe. Built a tailored suite of custom WordPress plugins.',
    highlights: [
      'Constructed complete membership onboarding and account management workflows.',
      'Engineered custom events management system with automated registration ticketing.',
      'Implemented automated member newsletter distribution synced to database.',
    ],
    technologies: ['WordPress', 'Custom Plugin Development', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    year: '2024',
    role: 'Mobile App Developer Intern',
    company: 'Mobile Engineering & Healthcare Systems',
    type: 'Internship',
    category: 'MOBILE ENGINEERING & TELEMETRY',
    summary:
      'Engineered reactive cross-platform mobile solutions using Flutter. Developed the ER PCR hospital handoff application with live Mapbox geolocation tracing and structured vital signs documentation.',
    highlights: [
      'Built ER PCR emergency patient tracking app with Mapbox API GPS handoff.',
      'Developed Weather Wheater Lang weather app with live API integration & Provider state.',
      'Streamlined hospital handoff speed and reduced manual administrative errors.',
    ],
    technologies: ['Flutter', 'Dart', 'Mapbox API', 'REST APIs', 'Provider'],
  },
  {
    year: '2020 — 2024',
    role: 'BS in Computer Engineering',
    company: 'Polytechnic University of the Philippines',
    type: 'Honors Degree',
    category: 'ACADEMIC FOUNDATION',
    summary:
      'Graduated Magna Cum Laude with deep training in computer architecture, algorithmic problem solving, software engineering, and database systems. Led capstone project OptiSnap.',
    highlights: [
      'Graduated Magna Cum Laude honors recognition.',
      'Engineered OptiSnap: complete photography studio management & inventory ERP.',
      'Designed high-fidelity interactive UX prototypes in Figma.',
    ],
    technologies: ['Computer Architecture', 'PHP', 'MySQL', 'Figma', 'System Design'],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 md:py-36 bg-[#f7f8fa] dark:bg-[#090b10] text-gray-950 dark:text-white transition-colors duration-500 relative"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl xl:max-w-screen-2xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] tracking-[0.25em] uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          <span>[ 04 // CAREER &amp; CHRONOLOGY ]</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">TRAJECTORY</span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-28 pb-8 border-b border-black/15 dark:border-white/10">
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5vw] font-black font-display uppercase tracking-tighter leading-[0.80] select-none">
              EXPERIENCE &amp;
              <br />
              <span className="text-stroke dark:text-stroke text-black/85 dark:text-white/25 hover:text-black dark:hover:text-white transition-all duration-500 inline-block mt-1">
                /&nbsp;TRAJECTORY
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base font-mono text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            A documented record of shipping production-grade platforms, from high-stakes retail stores to custom mobile healthcare workflows.
          </p>
        </div>

        {/* Editorial Timeline (Large years on one side, information on the other) */}
        <div className="space-y-20 md:space-y-32 relative">
          {/* Vertical subtle indicator line */}
          <div className="hidden lg:block absolute left-[30%] top-4 bottom-4 w-[1px] bg-black/10 dark:bg-white/10" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.year + exp.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-8 lg:gap-0 items-start relative group"
            >
              {/* Left Side: Large Bold Years & Category (Adjust lg:pr-* to control spacing to the vertical line) */}
              <div className="lg:text-right lg:pr-10 xl:pr-12">
                <div className="inline-flex lg:flex-col lg:items-end gap-2">
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                    ERA 0{idx + 1}
                  </span>
                  <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black dark:text-white group-hover:text-[#ccff00] transition-colors leading-none">
                    {exp.year}
                  </span>
                  <span className="font-mono text-xs text-[#ccff00] uppercase tracking-wider block font-bold mt-1">
                    {exp.category}
                  </span>
                  <span className="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 w-fit mt-1">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Right Side: Detailed Story & Impact */}
              <div className="lg:pl-10 xl:pl-12">
                <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0c0d14] border border-black/15 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] group-hover:border-[#ccff00]/60 transition-all duration-500 relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-black dark:text-white">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wider">
                      {exp.company}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light mb-8">
                    {exp.summary}
                  </p>

                  {/* Key Bullet Highlights */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                    [ PRODUCTION MILESTONES ]
                  </span>
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] mt-2 flex-shrink-0 shadow-[0_0_6px_#ccff00]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-black/10 dark:border-white/10">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full font-mono text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
