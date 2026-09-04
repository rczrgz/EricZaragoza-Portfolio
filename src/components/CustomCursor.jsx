import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for an expensive, buttery feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has coarse pointer (touch screen / mobile)
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hovered element for cursor attributes
      const target = e.target;
      const interactiveEl = target.closest('[data-cursor-text], [data-cursor-variant], a, button, input, textarea, select');

      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor-text');
        const variant = interactiveEl.getAttribute('data-cursor-variant');

        if (text) {
          setCursorText(text);
          setCursorVariant('labeled');
        } else if (variant) {
          setCursorVariant(variant);
          setCursorText('');
        } else if (interactiveEl.tagName === 'A' || interactiveEl.tagName === 'BUTTON') {
          setCursorVariant('hover');
          setCursorText('');
        } else {
          setCursorVariant('default');
          setCursorText('');
        }
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer context ring / pill */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'labeled' ? 84 : cursorVariant === 'hover' ? 52 : 32,
          height: cursorVariant === 'labeled' ? 84 : cursorVariant === 'hover' ? 52 : 32,
          opacity: isVisible ? 1 : 0,
          backgroundColor: cursorVariant === 'labeled' ? 'rgba(204, 255, 0, 0.95)' : cursorVariant === 'hover' ? 'rgba(204, 255, 0, 0.25)' : 'rgba(255, 255, 255, 0.05)',
          borderWidth: cursorVariant === 'labeled' ? '0px' : '1px',
          borderColor: cursorVariant === 'hover' ? '#ccff00' : 'rgba(150, 150, 160, 0.4)',
          backdropFilter: cursorVariant === 'labeled' ? 'none' : 'blur(2px)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        {cursorText && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-[11px] font-extrabold tracking-widest text-black uppercase font-mono select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny inner center dot */}
      {cursorVariant !== 'labeled' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ccff00] pointer-events-none shadow-[0_0_8px_#ccff00]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: cursorVariant === 'hover' ? 0.3 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
