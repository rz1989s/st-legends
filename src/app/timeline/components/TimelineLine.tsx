'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelineLineProps {
  className?: string;
}

export function TimelineLine({ className = '' }: TimelineLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 ${className}`}
    >
      {/* Background line */}
      <div className="absolute inset-0 bg-slate-700/50" />

      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 origin-top"
        style={{ height }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 blur-lg opacity-30 origin-top"
        style={{ height }}
      />
    </div>
  );
}
