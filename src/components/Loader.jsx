import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s snappy high-end load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between p-8 md:p-14 bg-[#060709] text-white select-none pointer-events-auto"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top Metadata */}
          <div className="flex justify-between items-center text-xs md:text-sm font-mono tracking-widest text-[#8e93a6] uppercase">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              PORTFOLIO 2026
            </span>
            <span>MANILA / PHILIPPINES</span>
          </div>

          {/* Center Typography */}
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs md:text-sm font-mono text-[#ccff00] tracking-widest mb-3 uppercase"
            >
              Creative Developer &bull; Digital Problem Solver
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter uppercase font-display"
            >
              ERIC <span className="text-stroke text-white/40">ZARAGOZA</span>
            </motion.h1>
          </div>

          {/* Bottom Loading Bar and Counter */}
          <div className="space-y-4">
            <div className="flex justify-between items-end font-mono text-xs md:text-sm text-[#8e93a6]">
              <span className="uppercase tracking-wider">SYSTEM INITIALIZATION</span>
              <span className="text-2xl md:text-4xl font-extrabold font-display text-[#ccff00]">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>
            <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-[#ccff00] shadow-[0_0_12px_#ccff00]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
