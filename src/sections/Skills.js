import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Cpu,
  Layers,
  ShoppingBag,
  Smartphone,
  Database,
  GitBranch,
  Workflow,
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
    icon: Code2,
    projectsUsed: ['All Web Applications'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Styling & Design Systems',
    level: 'Proficient',
    description: 'Rapid, maintainable utility-first design systems, responsive breakpoints, and dark mode theming.',
    icon: Layers,
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
    icon: Cpu,
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

  const filtered =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  // Keep the inspector in sync with the active filter — if the tech on
  // display disappears from the grid, fall back to the first visible one.
  useEffect(() => {
    if (!filtered.some((t) => t.name === inspectedTech?.name)) {
      setInspectedTech(filtered[0] ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <section
      id="skills"
      className="py-24 md:py-36 bg-white dark:bg-[#07080c] text-gray-950 dark:text-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-14 max-w-7xl relative z-10">
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
            Calibrated matrix of production-tested languages, frameworks, custom Liquid/WooCommerce logic, and autonomous pipelines. Hover — or tap — any mark to pull its full spec.
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
      <div className="container mx-auto px-6 sm:px-10 lg:px-14 max-w-7xl pt-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07080c] ${
                  isActive
                    ? 'text-[#ccff00] dark:text-black font-extrabold'
                    : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
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

        {/*
          Layout order flips by breakpoint:
          - Mobile/tablet: the inspector comes FIRST (order-1) and stays pinned
            near the top of the viewport, so tapping any icon below always
            surfaces its spec without a scroll round-trip.
          - Desktop (lg+): the inspector moves to a sticky right rail
            (order-2) beside the icon grid, matching a classic hover-detail
            pattern.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Inspector — compact row: mark on the left, spec on the right */}
          <div className="order-1 lg:order-2 lg:col-span-4 sticky top-20 lg:top-28 z-20">
            <AnimatePresence mode="wait">
              {inspectedTech ? (
                <motion.div
                  key={inspectedTech.name}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-black text-white dark:bg-[#10121a] border border-[#ccff00]/40 shadow-lg"
                  role="status"
                  aria-live="polite"
                >
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#ccff00] shrink-0">
                    <inspectedTech.icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-tight leading-tight truncate">
                        {inspectedTech.name}
                      </h4>
                      <span className="font-mono text-[10px] text-[#ccff00] shrink-0">
                        {inspectedTech.level}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-gray-400 mb-1.5">
                      {inspectedTech.categoryLabel}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {inspectedTech.description}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4 rounded-2xl border border-dashed border-black/15 dark:border-white/15 text-xs font-mono text-gray-500 dark:text-gray-400 text-center">
                  Hover or tap a mark to inspect it.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Icon-Only Grid */}
          <div className="order-2 lg:order-1 lg:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((tech) => {
                const Icon = tech.icon;
                const isInspected = inspectedTech?.name === tech.name;
                const isProficient = tech.level === 'Proficient';

                return (
                  <motion.button
                    key={tech.name}
                    type="button"
                    onClick={() => setInspectedTech(tech)}
                    onMouseEnter={() => setInspectedTech(tech)}
                    onFocus={() => setInspectedTech(tech)}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                    aria-pressed={isInspected}
                    aria-label={`${tech.name} — ${tech.level}`}
                    title={`${tech.name} — ${tech.level}`}
                    className={`group relative aspect-square rounded-2xl border flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07080c] ${
                      isInspected
                        ? 'bg-black text-white dark:bg-[#10121a] border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.18)]'
                        : 'bg-white dark:bg-[#0c0d13] text-gray-900 dark:text-white border-black/12 dark:border-white/10 shadow-sm hover:shadow-md hover:border-black/25 dark:hover:border-white/30'
                    }`}
                  >
                    {/* Level indicator — hidden until hovered, focused, or selected */}
                    <span
                      className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-opacity duration-150 ${
                        isProficient ? 'bg-[#ccff00]' : 'bg-gray-400 dark:bg-gray-500'
                      } ${isInspected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
                    />

                    <div
                      className={`p-2.5 sm:p-3 rounded-xl ${
                        isInspected ? 'bg-white/10' : 'bg-gray-100 dark:bg-white/5'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          isInspected ? 'text-[#ccff00]' : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </div>

                    <span className="font-display font-bold text-[10px] sm:text-xs uppercase tracking-tight text-center leading-tight line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;