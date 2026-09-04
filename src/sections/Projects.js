import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  X,
  Play,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

const projects = [
  {
    id: '01',
    num: '01',
    title: 'Love To Dream',
    client: 'Love To Dream PH',
    domain: 'lovetodream.ph',
    subtitle: 'WordPress & WooCommerce Custom Engineering',
    category: 'work',
    categoryLabel: 'Client Work',
    status: 'LIVE IN PRODUCTION',
    statusColor: 'text-[#ccff00]',
    year: '2025',
    description:
      'Led the core technical architecture and custom development for the Love To Dream PH e-commerce platform. Engineered proprietary WordPress plugins with advanced regional shipping logic, automated delivery date scheduling, and geo-targeted cart restrictions that dramatically reduced fulfillment bottlenecks.',
    highlights: [
      'Engineered automated regional shipping logic & province-based checkout restrictions.',
      'Developed bespoke WooCommerce delivery scheduler plugin with courier sync.',
      'Optimized page response and payment gateway throughput for high retail volume.',
    ],
    image: 'project-5.png',
    tags: ['WordPress', 'WooCommerce', 'Custom Plugins', 'Shipping Automation', 'PHP', 'JavaScript', 'MySQL'],
    liveLink: 'https://lovetodream.ph/',
    githubLink: '#',
    featureBadge: 'AUTOMATED REGIONAL SHIPPING ENGINE',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '02',
    num: '02',
    title: 'Mamas & Papas',
    client: 'Mamas & Papas PH',
    domain: 'mamasandpapas.ph',
    subtitle: 'Shopify E-Commerce Optimization & Architecture',
    category: 'work',
    categoryLabel: 'Client Work',
    status: 'HIGH-TRAFFIC RETAIL STORE',
    statusColor: 'text-[#ccff00]',
    year: '2025',
    description:
      'Engineered custom WooCommerce and Shopify enhancements for the premium nursery brand Mamas & Papas PH. Built custom delivery method toggling, dynamic cart calculations, and performance tuning that stabilized transactions during national campaign flash sales.',
    highlights: [
      'Engineered dynamic delivery method toggles based on inventory location.',
      'Fine-tuned Liquid templates and asset pipeline for sub-second mobile load times.',
      'Integrated resilient checkout fallbacks and fraud-filtering rules.',
    ],
    image: 'project6.png',
    tags: ['Shopify', 'Liquid', 'Shipping Rules', 'E-Commerce Optimization', 'JavaScript', 'Tailwind'],
    liveLink: 'https://mamasandpapas.ph/',
    githubLink: '#',
    featureBadge: 'RETAIL ARCHITECTURE & SCALING',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '03',
    num: '03',
    title: 'PICPA Ireland',
    client: 'PICPA Ireland / Pixel Profile',
    domain: 'picpaireland.ie',
    subtitle: 'Custom Membership & Event Management Suite',
    category: 'freelance',
    categoryLabel: 'Freelance Contract',
    status: 'DEPLOYED ACROSS IRELAND & EU',
    statusColor: 'text-[#ccff00]',
    year: '2024 — 2025',
    description:
      'Contracted by digital agency Pixel Profile to design and engineer the official digital ecosystem for PICPA Ireland—an international association of Filipino finance professionals across Ireland and Europe. Built an extensive suite of custom WordPress plugins governing member onboarding, subscription management, event ticketing, and automated dispatch.',
    highlights: [
      'Architected complete member authentication, profile management, and dues tracking.',
      'Built automated events calendar with multi-tier ticket reservations and QR confirmation.',
      'Integrated newsletter dispatch engine synced directly to member roles.',
    ],
    image: 'project8.png',
    tags: ['WordPress', 'Custom Plugin Development', 'PHP', 'Membership System', 'Events API', 'MySQL'],
    liveLink: 'https://picpaireland.ie/',
    githubLink: '#',
    featureBadge: 'BESPOKE MEMBERSHIP & EVENTS SUITE',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '04',
    num: '04',
    title: 'Kids & Baby',
    client: 'Kids & Baby Group',
    domain: 'kidsandbabygroup.myshopify.com',
    subtitle: 'Dynamic Collection-Aware Tag Filtering in Liquid',
    category: 'work',
    categoryLabel: 'Client Work',
    status: 'PRODUCTION OUTLET STORE',
    statusColor: 'text-[#ccff00]',
    year: '2025',
    description:
      'A consolidated markdown outlet storefront aggregating multi-brand inventory across Love To Dream, Mamas & Papas, and Kiddimoto. Engineered a custom collection-aware filtering algorithm in Shopify Liquid that dynamically surfaces category-specific tag sets—such as age ranges and sizes for apparel versus hardware specs for strollers.',
    highlights: [
      'Constructed context-aware Liquid filter trees dynamically generated from inventory tags.',
      'Eliminated empty filter states and reduced customer search time by 60%.',
      'Developed high-speed AJAX drawer cart with real-time multi-currency support.',
    ],
    image: 'project7.png',
    tags: ['Shopify', 'Liquid', 'Dynamic Tag Filtering', 'JavaScript', 'E-Commerce', 'CSS Architecture'],
    liveLink: 'https://kidsandbabygroup.myshopify.com/',
    githubLink: '#',
    featureBadge: 'FACETED LIQUID FILTERING ENGINE',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '05',
    num: '05',
    title: 'Weather Wheater Lang',
    client: 'Mobile Engineering Exploration',
    domain: 'github.com/rczrgz/Weather-App',
    subtitle: 'Flutter Mobile App with Live Forecast & Utilities',
    category: 'internship',
    categoryLabel: 'Internship Project',
    status: 'PRODUCTION MOBILE RELEASE',
    statusColor: 'text-[#ccff00]',
    year: '2024',
    description:
      'A cross-platform mobile application engineered with Flutter. Features live geo-located weather forecasting, an iPhone-style mathematical engine, and an offline-first quick note manager. Developed during internship to master enterprise reactive architecture using the Provider pattern.',
    highlights: [
      'Connected OpenWeather REST APIs with caching and offline fallback capabilities.',
      'Built custom physics-based UI components and stateful animation controllers.',
      'Architected state distribution via Provider for minimal rebuild overhead.',
    ],
    image: 'project3.jpg',
    tags: ['Flutter', 'Dart', 'Provider', 'REST API', 'Cross-Platform', 'Mobile UI'],
    liveLink: '#',
    githubLink: 'https://github.com/rczrgz/Weather-App/tree/master',
    featureBadge: 'REACTIVE FLUTTER & LIVE API SYNC',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '06',
    num: '06',
    title: 'ER PCR Telemetry',
    client: 'Hospital Systems & Emergency Response',
    domain: 'Internal Emergency Handoff Telemetry',
    subtitle: 'Emergency Patient Handoff & Mapbox GPS Workflow',
    category: 'internship',
    categoryLabel: 'Internship Project',
    status: 'MISSION-CRITICAL FIELD SYSTEM',
    statusColor: 'text-[#ccff00]',
    year: '2024',
    description:
      'A mission-critical emergency services application built for real-time patient handoff between paramedics and triage personnel. Integrates Mapbox GPS tracking to broadcast ambulance telemetry live while capturing vital signs, medication logs, and clinical handoff signatures.',
    highlights: [
      'Engineered live ambulance route tracking and ETA forecasting via Mapbox SDK.',
      'Designed high-contrast, touch-optimized vitals entry form for moving emergency vehicles.',
      'Reduced medical handoff communication latency and eliminated clerical errors.',
    ],
    video: 'project4.mp4',
    tags: ['Flutter', 'Dart', 'Mapbox SDK', 'Geolocation', 'Healthcare Workflow', 'Emergency UI'],
    liveLink: '#',
    githubLink: '#',
    featureBadge: 'REAL-TIME GPS AMBULANCE TELEMETRY',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '07',
    num: '07',
    title: 'OptiSnap Studio ERP',
    client: 'PUP Capstone Research',
    domain: 'github.com/rczrgz/Dos-Studio',
    subtitle: 'Comprehensive Photography Studio ERP System',
    category: 'school',
    categoryLabel: 'Academic Capstone',
    status: 'HONORS CAPSTONE PROJECT',
    statusColor: 'text-[#ccff00]',
    year: '2024',
    description:
      'An enterprise photography studio resource management system built for self-shoot photography studios. Automates the full studio lifecycle: online appointment scheduling, physical studio bay check-in, real-time inventory tracking for cameras and lenses, staff payroll attendance, and demand forecasting.',
    highlights: [
      'Designed relational schema managing customer bookings, camera gear, and studio bays.',
      'Built financial revenue reporting engine and inventory replenishment alerts.',
      'Earned Magna Cum Laude evaluation honors for system design and architecture.',
    ],
    image: 'project2.png',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'ERP Architecture', 'System Design'],
    liveLink: '#',
    githubLink: 'https://github.com/rczrgz/Dos-Studio',
    featureBadge: 'ENTERPRISE CAPSTONE ERP PLATFORM',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '08',
    num: '08',
    title: 'Self-Shoot Studio App',
    client: 'Design Systems & UX Prototype',
    domain: 'Figma Community Prototype',
    subtitle: 'Interactive Mobile Studio Prototype & UX Design',
    category: 'school',
    categoryLabel: 'Academic Design',
    status: 'HIGH-FIDELITY UX PROTOTYPE',
    statusColor: 'text-[#ccff00]',
    year: '2023',
    description:
      'An end-to-end self-service mobile studio experience conceptualized and prototyped in Figma. Features friction-free slot reservation, digital prop selection, session payment flows, live studio bay countdown timers, and instant cloud gallery downloads.',
    highlights: [
      'Developed cohesive multi-component design system with dark/light visual tokens.',
      'Conducted iterative user journey testing to simplify studio booking into 3 taps.',
      'Created realistic micro-interactions and interactive payment confirmation states.',
    ],
    image: 'project1.png',
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Interactive Prototype'],
    liveLink:
      'https://www.figma.com/proto/MZqvDkSiYImGyrOfVJQlYb/DOS-Prototype?node-id=323-2&t=Rnfm1D9jgk3BuzhM-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=323%3A2',
    githubLink: '#',
    featureBadge: 'AWARD-STYLE FIGMA DESIGN SYSTEM',
    aspectRatio: 'aspect-[16/10]',
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'work', label: 'Client Work' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'internship', label: 'Internship' },
  { id: 'school', label: 'Academic' },
];

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090b10] text-white border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-10 md:p-14"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black transition-all duration-300 z-20"
          data-cursor-text="CLOSE"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          <span>CASE FILE // {project.num}</span>
          <span className="text-gray-500">/</span>
          <span>{project.categoryLabel}</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-400">{project.year}</span>
        </div>

        {/* Headline */}
        <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter mb-3 leading-none">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-400 font-mono mb-8">
          [ {project.subtitle} ]
        </p>

        {/* Media Frame with Architectural Technical Markers */}
        <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/15 mb-10 shadow-2xl">
          {project.video ? (
            <video
              src={project.video}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto max-h-[540px] object-contain mx-auto"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[540px] object-cover"
            />
          )}

          {/* Technical Corner Overlays */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-white/80 bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10 uppercase">
            SPEC ID: {project.id} {'//'} {project.client}
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-[#ccff00] bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-[#ccff00]/30 font-bold uppercase">
            {project.status}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8 space-y-8">
            <div>
              <span className="font-mono text-xs text-[#ccff00] uppercase tracking-widest block mb-2">
                [ OVERVIEW &amp; PRODUCTION IMPACT ]
              </span>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Key Accomplishments Ledger */}
            <div>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                [ ENGINEERING HIGHLIGHTS ]
              </span>
              <div className="space-y-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-300 font-light">
                    <CheckCircle2 className="w-5 h-5 text-[#ccff00] flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Specs */}
          <div className="md:col-span-4 space-y-6 md:border-l md:border-white/10 md:pl-8">
            <div>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                CLIENT / STAKEHOLDER
              </span>
              <span className="font-display font-bold text-lg text-white block">
                {project.client}
              </span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                DEPLOYED STATUS
              </span>
              <span className="font-mono text-xs font-bold text-[#ccff00] block">
                {project.status}
              </span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded font-mono text-[11px] bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              {project.liveLink && project.liveLink !== '#' && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#ccff00] text-black font-display font-extrabold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                  data-cursor-text="VISIT"
                >
                  <span>LAUNCH LIVE PLATFORM</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubLink && project.githubLink !== '#' && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors border border-white/10"
                  data-cursor-text="CODE"
                >
                  <Github className="w-4 h-4" />
                  <span>INSPECT SOURCE CODE</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-28 md:py-40 bg-white dark:bg-[#07080c] text-gray-950 dark:text-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-14 max-w-7xl relative z-10">
        {/* Section Header with Monumental Scale & Editorial Metadata */}
        <div className="mb-24 md:mb-36">
          <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] tracking-[0.3em] uppercase mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] shadow-[0_0_12px_#ccff00] animate-pulse" />
            <span>[ 01 // SELECTED ARCHIVE ]</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">0{filteredProjects.length} VOLUMES AVAILABLE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10 border-b border-black/15 dark:border-white/10">
            <div>
              <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10vw] font-black uppercase font-display tracking-tighter leading-[0.78] select-none">
                SELECTED
                <br />
                <span className="text-stroke dark:text-stroke text-black/85 dark:text-white/25 hover:text-black dark:hover:text-white transition-all duration-500 inline-block mt-1">
                  /&nbsp;WORKS
                </span>
              </h2>
            </div>

            {/* Editorial Category Filter Navigation */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                FILTER BY DOMAIN
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count =
                    cat.id === 'all'
                      ? projects.length
                      : projects.filter((p) => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
                        isActive
                          ? 'bg-black text-[#ccff00] dark:bg-[#ccff00] dark:text-black font-extrabold shadow-[0_0_20px_rgba(204,255,0,0.35)] scale-105'
                          : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10'
                      }`}
                      data-cursor-text="FILTER"
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#ccff00] text-black dark:bg-black dark:text-[#ccff00]'
                            : 'bg-black/10 dark:bg-white/10 text-gray-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Monumental Art-Directed Project Showcase */}
        <div className="space-y-36 sm:space-y-48 lg:space-y-64">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Monolithic Number Background Watermark */}
                <div
                  className={`absolute -top-16 sm:-top-28 md:-top-36 z-0 font-display font-black text-8xl sm:text-[14rem] md:text-[18rem] lg:text-[22rem] text-black/[0.035] dark:text-white/[0.035] group-hover:text-[#ccff00]/[0.08] transition-colors duration-700 pointer-events-none select-none leading-none ${
                    isEven ? 'left-0' : 'right-0 text-right'
                  }`}
                >
                  {project.num}
                </div>

                {/* Main Asymmetric Spread */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Large Project Imagery Viewport (Visual Anchor - 7/12 cols) */}
                  <div
                    className={`lg:col-span-7 cursor-pointer ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                    onClick={() => setSelectedProject(project)}
                    data-cursor-text="EXPLORE"
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-black/10 dark:bg-white/[0.02] border border-black/15 dark:border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] group-hover:border-[#ccff00]/70 group-hover:shadow-[0_35px_100px_rgba(204,255,0,0.18)] transition-all duration-700">
                      {/* Corner Crosshair Architectural Markers */}
                      <span className="absolute top-3 left-3 z-30 font-mono text-[10px] text-white/50 select-none pointer-events-none">
                        +
                      </span>
                      <span className="absolute top-3 right-3 z-30 font-mono text-[10px] text-white/50 select-none pointer-events-none">
                        +
                      </span>
                      <span className="absolute bottom-3 left-3 z-30 font-mono text-[10px] text-white/50 select-none pointer-events-none">
                        +
                      </span>
                      <span className="absolute bottom-3 right-3 z-30 font-mono text-[10px] text-white/50 select-none pointer-events-none">
                        +
                      </span>

                      {/* Viewport Frame */}
                      <div className={`relative ${project.aspectRatio} overflow-hidden`}>
                        {project.video ? (
                          <div className="relative w-full h-full">
                            <video
                              src={project.video}
                              muted
                              loop
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute top-6 right-6 p-4 rounded-full bg-black/80 backdrop-blur-xl text-[#ccff00] border border-white/15 shadow-2xl">
                              <Play className="w-5 h-5 fill-current" />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale-[35%] contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            loading="lazy"
                          />
                        )}

                        {/* Editorial Subtle Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                        {/* Top Cockpit Overlay Bar */}
                        <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/90 pointer-events-none z-20">
                          <span className="px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-white/15 uppercase font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                            <span>CASE // {project.num}</span>
                          </span>
                          <span className="px-3 py-1 rounded bg-[#ccff00] text-black font-black uppercase tracking-wider shadow-lg">
                            {project.status}
                          </span>
                        </div>

                        {/* Bottom Ambient Inspection Bar */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none z-20">
                          <div className="space-y-1">
                            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest block bg-black/60 px-2.5 py-0.5 rounded backdrop-blur-sm w-fit">
                              {project.client}
                            </span>
                            <span className="font-mono text-xs text-white font-bold tracking-wider block">
                              {project.domain}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#ccff00] text-black font-display font-black text-xs uppercase tracking-widest shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <span>VIEW CASE</span>
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Storytelling & Editorial Specifications Ledger (5/12 cols) */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Index & Year Metadata */}
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest mb-4">
                      <span className="text-[#ccff00] font-bold">
                        [{project.num}]
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="text-black dark:text-white font-bold">
                        {project.categoryLabel}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        {project.year}
                      </span>
                    </div>

                    {/* Massive Typography Title */}
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black uppercase tracking-tighter text-gray-950 dark:text-white hover:text-[#ccff00] transition-colors duration-300 cursor-pointer leading-[0.92]"
                      data-cursor-text="CASE"
                    >
                      {project.title}
                    </h3>

                    {/* Technical Subtitle */}
                    <p className="mt-3 text-xs sm:text-sm font-mono text-[#ccff00] tracking-wider uppercase font-semibold">
                      [ {project.subtitle} ]
                    </p>

                    {/* Architectural Feature Badge */}
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold uppercase w-fit">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{project.featureBadge}</span>
                    </div>

                    {/* Project Narrative */}
                    <p className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Key Technical Highlights Checklist */}
                    <div className="mt-6 space-y-2 border-l-2 border-black/15 dark:border-white/10 pl-4">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-mono">
                          &gt; {h}
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Action Row */}
                    <div className="mt-8 pt-6 border-t border-black/15 dark:border-white/10 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-3 font-display font-black text-xs uppercase tracking-widest text-black dark:text-white hover:text-[#ccff00] transition-all group/btn"
                        data-cursor-text="CASE"
                      >
                        <span>READ FULL BRIEF</span>
                        <div className="w-8 h-[2px] bg-current group-hover/btn:w-14 transition-all duration-300" />
                      </button>

                      {project.liveLink && project.liveLink !== '#' && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00] text-black font-display font-extrabold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-md"
                          data-cursor-text="LAUNCH"
                        >
                          <span>LIVE SITE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.githubLink && project.githubLink !== '#' && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full border border-black/20 dark:border-white/20 text-gray-800 dark:text-gray-200 hover:border-[#ccff00] hover:text-[#ccff00] hover:scale-110 transition-all shadow"
                          title="Inspect Source Code"
                          data-cursor-text="CODE"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
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
