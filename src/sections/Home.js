import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, Sparkles, Code2, Gamepad2, GraduationCap } from 'lucide-react';

const roles = [
  { id: 'dev', label: 'Programmer', title: 'PROGRAMMER', image: 'programmer.jpg', icon: Code2, desc: 'Clean architecture, modern web stacks & mobile engineering' },
  { id: 'grad', label: 'Zaragoza', title: 'ZARAGOZA', image: 'profile.jpg', icon: GraduationCap, desc: 'PUP Magna Cum Laude graduate & perpetual builder' },
  { id: 'gamer', label: 'Gamer', title: 'GAMER', image: 'gamer.png', icon: Gamepad2, desc: 'Strategy, tactical focus, and competitive problem solving' },
  { id: 'eager', label: 'Eager to Learn', title: 'EAGER TO LEARN', image: 'eager.jpg', icon: Sparkles, desc: 'Constantly testing bleeding-edge tools & generative AI' },
];

const SubtleCanvas = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Subtle ambient constellation particles
    const count = 45;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.8,
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const pointColor = isDark ? 'rgba(204, 255, 0, 0.4)' : 'rgba(15, 23, 42, 0.25)';
      const lineColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse push
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pointColor;
        ctx.fill();

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />;
};

const Home = () => {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [timeString, setTimeString] = useState('');

  // Auto cycle roles gently every 6 seconds if not manually interacted with
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Update real-time clock (Manila, Philippines Time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Interactive parallax 3D card tilt
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setMouseTilt({ rotateX, rotateY });
  };

  const handleCardMouseLeave = () => {
    setMouseTilt({ rotateX: 0, rotateY: 0 });
  };

  const currentRole = roles[activeRoleIndex];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 md:pt-36 pb-16 flex flex-col justify-between overflow-hidden bg-white dark:bg-[#07080c] text-gray-950 dark:text-white transition-colors duration-500 bg-grid-pattern"
    >
      <SubtleCanvas />

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 relative z-10 max-w-7xl xl:max-w-screen-2xl flex-1 flex flex-col justify-center">
        {/* Top Editorial Eyebrow with Crosshairs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-5 border-b border-black/15 dark:border-white/10 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ccff00]" />
            </span>
            <span className="font-extrabold text-black dark:text-white tracking-wider">ERIC ZARAGOZA</span>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-600 dark:text-gray-300">MNL [ {timeString || '12:00:00 PM'} ]</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-wider">
            <span className="text-gray-400">COORD: 14.5995° N // 120.9842° E</span>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 font-bold">
              OPEN FOR COMMISSIONS 2026
            </span>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[58vh]">
          {/* Left Column: Monumental Bleeding-Edge Typography */}
          <div className="lg:col-span-8 flex flex-col justify-center relative">
            {/* Architectural Sub-header / Discipline Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-6 font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400"
            >
              <span className="w-8 h-[1px] bg-[#ccff00]" />
              <span className="text-black dark:text-white font-semibold">CREATIVE DEVELOPER &amp; ARCHITECT</span>
            </motion.div>

            {/* Monumental Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] font-black tracking-tighter leading-[0.82] uppercase font-display select-none"
            >
              ERIC
              <br />
              <span className="text-stroke dark:text-stroke text-black/90 dark:text-white/20 hover:text-black dark:hover:text-white hover:text-stroke-thick transition-all duration-500 inline-block mt-1">
              ZARAGOZA
              </span>
            </motion.h1>

            {/* Asymmetrical Positioning Content & Editorial Quote */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="md:col-span-8"
              >
                <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 leading-snug">
                  Engineering high-stakes e-commerce, reactive applications, and bespoke digital platforms with obsessive craftsmanship.
                </p>
              </motion.div>

              <div className="md:col-span-4 font-mono text-[11px] text-gray-400 dark:text-gray-500 border-l border-black/10 dark:border-white/10 pl-4 space-y-1">
                <p className="text-black dark:text-white font-bold uppercase tracking-widest">HONORS</p>
                <p>Magna Cum Laude</p>
                <p>BS Computer Eng. (PUP)</p>
              </div>
            </div>

            {/* Persona Switcher Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500 mr-2 uppercase tracking-widest">
                [ ALTER DISCIPLINE ]:
              </span>
              {roles.map((role, idx) => {
                const Icon = role.icon;
                const isActive = activeRoleIndex === idx;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRoleIndex(idx)}
                    className={`relative group px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors duration-200 z-10 ${
                      isActive
                        ? 'text-[#ccff00] dark:text-black font-extrabold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5'
                    }`}
                    data-cursor-text="SWITCH"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="homeRoleIndicator"
                        className="absolute inset-0 rounded-full bg-black dark:bg-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.35)] z-[-1]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-[#ccff00] dark:text-black' : 'text-gray-400'}`} />
                    <span className="relative z-10">{role.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Persona Micro Context Line */}
            <div className="mt-3 font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="text-[#ccff00]">↳</span>
              <span className="italic">{currentRole.desc}</span>
            </div>

            {/* High-Tension Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-4 px-9 py-4 rounded-full bg-black text-white dark:bg-[#ccff00] dark:text-black font-display font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-2xl"
                data-cursor-text="CASES"
              >
                <span>EXPLORE WORK</span>
                <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-black/20 dark:border-white/20 text-black dark:text-white font-mono text-xs uppercase tracking-widest font-bold hover:border-[#ccff00] hover:text-[#ccff00] transition-all duration-300"
                data-cursor-text="CONTACT"
              >
                <span>COMMISSION / CONTACT</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Architectural Off-Grid Floating 3D Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md lg:-mt-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                perspective: 1000,
              }}
            >
              {/* Outer Decorative Architectural Frame */}
              <motion.div
                className="relative p-3 rounded-2xl bg-black/5 dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden group"
                style={{
                  rotateX: mouseTilt.rotateX,
                  rotateY: mouseTilt.rotateY,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              >
                {/* Image Viewport */}
                <div className="relative h-[400px] sm:h-[480px] w-full rounded-xl overflow-hidden bg-black/60">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentRole.image}
                      src={currentRole.image}
                      alt={currentRole.label}
                      className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  {/* Gradient & Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                  {/* Overlay Coordinates & Technical Label */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/90">
                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10">
                      FIG. 0{activeRoleIndex + 1} {'//'} MATRIX
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#ccff00] text-black font-extrabold uppercase">
                      {currentRole.title}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                    <div>
                      <p className="text-[11px] font-mono text-[#ccff00] tracking-wider uppercase">
                        LOC: MANILA // PUP HONORS
                      </p>
                      <h4 className="font-display font-extrabold text-2xl tracking-tight uppercase">
                        Eric Zaragoza
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-white/60">
                      EDITION 2026
                    </span>
                  </div>
                </div>

                {/* Card Base Controls */}
                <div className="mt-3 px-2 flex justify-between items-center text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  <span>DISCIPLINE DISK 0{activeRoleIndex + 1}/04</span>
                  <div className="flex gap-1.5">
                    {roles.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveRoleIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeRoleIndex === i ? 'bg-[#ccff00] w-6' : 'bg-gray-400/40 w-2'
                        }`}
                        aria-label={`View persona ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Ticker / Scroll Prompt */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 pt-10 relative z-10 max-w-7xl xl:max-w-screen-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/10 dark:border-white/10 text-xs font-mono text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest text-[#ccff00] font-bold">DISCIPLINES:</span>
            <span>ECOMMERCE &bull; FULL-STACK &bull; UI/UX &bull; FLUTTER &bull; AUTOMATION</span>
          </div>

          <a
            href="#projects"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#ccff00] transition-colors"
            data-cursor-text="DOWN"
          >
            <span className="uppercase tracking-widest text-[11px]">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowDownRight className="w-4 h-4 text-[#ccff00]" />
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
