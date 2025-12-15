'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      {/* Background track */}
      <div className="h-1 bg-slate-800/50 backdrop-blur-sm" />

      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left"
        style={{ scaleX }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left blur-sm opacity-50"
        style={{ scaleX }}
      />
    </div>
  );
}
