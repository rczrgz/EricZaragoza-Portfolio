import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Cpu,
  ShoppingBag,
  Layers,
  Smartphone,
  Terminal,
  Palette,
  Database,
  Workflow,
  Server,
  GitBranch,
  Sparkles,
} from 'lucide-react';

const technologies = [
  {
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    level: 'Proficient',
    description: 'Component architecture, custom hooks, performance optimization, and reactive state management.',
    icon: Code2,
    projectsUsed: ['Portfolio App', 'Web Dashboards'],
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Core Language',
    level: 'Proficient',
    description: 'Static typing, strict type modeling, scalable codebase refactoring, and enterprise code safety.',
    icon: Cpu,
    projectsUsed: ['Modern Web Apps', 'Type-Safe APIs'],
  },
  {
    name: 'Shopify & Liquid',
    category: 'ecommerce',
    categoryLabel: 'E-commerce & CMS',
    level: 'Proficient',
    description: 'Bespoke Liquid theme development, dynamic collection filtering, checkout rules, and performance tuning.',
    icon: ShoppingBag,
    projectsUsed: ['Kids & Baby Store', 'Mamas & Papas'],
  },
  {
    name: 'WordPress & WooCommerce',
    category: 'ecommerce',
    categoryLabel: 'E-commerce & CMS',
    level: 'Proficient',
    description: 'Custom plugin engineering, regional shipping automation, delivery scheduling, and hooks architecture.',
    icon: Layers,
    projectsUsed: ['Love To Dream PH', 'PICPA Ireland'],
  },
  {
    name: 'Flutter & Dart',
    category: 'mobile',
    categoryLabel: 'Mobile App Engineering',
    level: 'Competent',
    description: 'Cross-platform mobile applications, state management (Provider), GPS telemetry, and Mapbox integrations.',
    icon: Smartphone,
    projectsUsed: ['ER PCR Hospital App', 'Weather Wheater Lang'],
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Core Language',
    level: 'Proficient',
    description: 'Asynchronous event loops, DOM manipulations, modern ES modules, and clean functional programming.',
    icon: Terminal,
    projectsUsed: ['All Web Applications'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Styling & Design Systems',
    level: 'Proficient',
    description: 'Rapid, maintainable utility-first design systems, responsive breakpoints, and dark mode theming.',
    icon: Palette,
    projectsUsed: ['Creative Portfolios', 'Client Webstores'],
  },
  {
    name: 'PHP & MySQL',
    category: 'backend',
    categoryLabel: 'Backend & Database',
    level: 'Competent',
    description: 'Relational schema design, normalization, custom queries, REST endpoints, and WordPress backend logic.',
    icon: Database,
    projectsUsed: ['OptiSnap Capstone', 'PICPA Custom Suite'],
  },
  {
    name: 'n8n Workflow Automation',
    category: 'automation',
    categoryLabel: 'Automation & AI Tools',
    level: 'Competent',
    description: 'Event-driven webhooks, automated CRM syncing, e-commerce notification pipelines, and AI orchestrations.',
    icon: Workflow,
    projectsUsed: ['E-commerce Pipelines', 'Data Automations'],
  },
  {
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend & Runtime',
    level: 'Competent',
    description: 'Server runtime, microservices, REST API integration, authentication, and package scripts.',
    icon: Server,
    projectsUsed: ['Full-stack Tools', 'Custom API Proxies'],
  },
  {
    name: 'Git & Version Control',
    category: 'automation',
    categoryLabel: 'DevOps & Collaboration',
    level: 'Proficient',
    description: 'Git branch workflows, conflict resolution, GitHub repository management, and deployment pipelines.',
    icon: GitBranch,
    projectsUsed: ['All Production Repositories'],
  },
  {
    name: 'UI/UX & Figma',
    category: 'frontend',
    categoryLabel: 'Product Design',
    level: 'Competent',
    description: 'Interactive wireframing, high-fidelity prototyping, design tokens, micro-interactions, and usability testing.',
    icon: Sparkles,
    projectsUsed: ['Self-Shoot Studio Prototype'],
  },
];

const categories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'ecommerce', label: 'E-commerce & CMS' },
  { id: 'mobile', label: 'Mobile Engineering' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'automation', label: 'Automation & Tools' },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [inspectedTech, setInspectedTech] = useState(technologies[0]);

  return (
    <section
      id="skills"
      className="py-24 md:py-36 bg-white dark:bg-[#07080c] text-gray-950 dark:text-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl xl:max-w-screen-2xl relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] tracking-[0.25em] uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          <span>[ 03 // ARSENAL &amp; PROFICIENCY ]</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">TECH MATRIX</span>
        </div>

        {/* Monumental Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/15 dark:border-white/10">
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5vw] font-black font-display uppercase tracking-tighter leading-[0.80] select-none">
              SKILLS &amp;
              <br />
              <span className="text-stroke dark:text-stroke text-black/85 dark:text-white/25 hover:text-black dark:hover:text-white transition-all duration-500 inline-block mt-1">
                /&nbsp;SYSTEMS
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base font-mono text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            Calibrated matrix of production-tested languages, frameworks, custom Liquid/WooCommerce logic, and autonomous pipelines.
          </p>
        </div>
      </div>

      {/* Kinetic Ribbon Marquee */}
      <div className="py-5 bg-black dark:bg-[#0b0d13] text-white border-y border-black/20 dark:border-white/10 select-none overflow-hidden my-4 shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight">
          <span>REACT</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">SHOPIFY &amp; LIQUID</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span>TYPESCRIPT</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">WORDPRESS &amp; WOOCOMMERCE</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span>FLUTTER &amp; DART</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">TAILWIND CSS</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span>PHP &amp; MYSQL</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">N8N AUTOMATION</span>
          <span className="text-[#ccff00]">&bull;</span>
          {/* Loop continuation */}
          <span>REACT</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">SHOPIFY &amp; LIQUID</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span>TYPESCRIPT</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">WORDPRESS &amp; WOOCOMMERCE</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span>FLUTTER &amp; DART</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">TAILWIND CSS</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span>PHP &amp; MYSQL</span>
          <span className="text-[#ccff00]">&bull;</span>
          <span className="text-stroke text-white/40">N8N AUTOMATION</span>
          <span className="text-[#ccff00]">&bull;</span>
        </div>
      </div>

      {/* Main Interactive Grid & Inspector */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl xl:max-w-screen-2xl pt-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.id);
                  if (c.id !== 'all') {
                    const match = technologies.find((t) => t.category === c.id);
                    if (match) setInspectedTech(match);
                  }
                }}
                className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-[#ccff00] dark:text-black font-extrabold'
                    : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
                data-cursor-text="FILTER"
              >
                {isActive && (
                  <motion.div
                    layoutId="skillsCategoryIndicator"
                    className="absolute inset-0 rounded-full bg-black dark:bg-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)] z-[-1]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Suite: 3-Row x 4-Column Icon Matrix on Left, Equal-Height Telemetry Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: 3-Row x 4-Column Icon-Only Matrix */}
          <div className="lg:col-span-7 grid grid-cols-4 grid-rows-3 gap-3 sm:gap-4 h-full">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              const isInspected = inspectedTech?.name === tech.name;
              const isDimmed = activeCategory !== 'all' && tech.category !== activeCategory;

              return (
                <motion.button
                  key={tech.name}
                  onClick={() => setInspectedTech(tech)}
                  onMouseEnter={() => setInspectedTech(tech)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  title={tech.name}
                  aria-label={tech.name}
                  className={`relative flex items-center justify-center p-3 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group aspect-square ${
                    isInspected
                      ? 'bg-black text-[#ccff00] dark:bg-[#10121a] dark:text-[#ccff00] border-[#ccff00] shadow-[0_0_25px_rgba(204,255,0,0.22)] ring-1 ring-[#ccff00]'
                      : 'bg-[#f8f9fb] dark:bg-[#0c0d13] text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                  } ${isDimmed ? 'opacity-25 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-100'}`}
                  data-cursor-text={tech.name.toUpperCase()}
                >
                  {/* Subtle Corner Crosshairs */}
                  <span className="absolute top-2 left-2 text-[9px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                    +
                  </span>
                  <span className="absolute top-2 right-2 text-[9px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                    +
                  </span>
                  <span className="absolute bottom-2 left-2 text-[9px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                    +
                  </span>
                  <span className="absolute bottom-2 right-2 text-[9px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                    +
                  </span>

                  {/* Active glowing indicator pill */}
                  {isInspected && (
                    <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                  )}

                  {/* Icon Only */}
                  <Icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110 ${
                      isInspected
                        ? 'text-[#ccff00]'
                        : 'text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white'
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right: Telemetry Inspector Card (Height strictly matched to the 3 rows) */}
          <div className="lg:col-span-5 h-full">
            <div className="h-full rounded-3xl bg-black text-white dark:bg-[#10121a] border border-[#ccff00]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#ccff00]/10 blur-3xl pointer-events-none rounded-full" />

              {/* Inspector Header */}
              <div className="flex items-center justify-between text-xs font-mono text-[#ccff00] uppercase tracking-widest pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                  <span>TELEMETRY // SPEC</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  ACTIVE SELECTION
                </span>
              </div>

              {/* Animated Details */}
              <AnimatePresence mode="wait">
                {inspectedTech && (
                  <motion.div
                    key={inspectedTech.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between py-6 space-y-6"
                  >
                    {/* Technology Identity Banner */}
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 text-[#ccff00] shadow-inner">
                        <inspectedTech.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
                          {inspectedTech.name}
                        </h4>
                        <span className="font-mono text-xs text-[#ccff00]">
                          {inspectedTech.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Practical Capabilities */}
                    <div>
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5">
                        PRACTICAL CAPABILITIES
                      </span>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                        {inspectedTech.description}
                      </p>
                    </div>

                    {/* Applications in Production */}
                    <div>
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-2">
                        APPLICATION IN PRODUCTION
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {inspectedTech.projectsUsed.map((p) => (
                          <span
                            key={p}
                            className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#ccff00] border border-white/5"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deployment & Level Status Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                        <span>STATUS: DEPLOYED IN PROD</span>
                      </div>
                      <span className="text-white font-bold px-2 py-0.5 rounded bg-white/10 text-[10px] tracking-wider uppercase">
                        {inspectedTech.level}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
