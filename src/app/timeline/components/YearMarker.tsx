'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface YearMarkerProps {
  year: string;
  isFirst?: boolean;
  className?: string;
}

export function YearMarker({ year, isFirst = false, className = '' }: YearMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center justify-center py-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Year badge */}
      <motion.div
        className="relative"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, type: 'spring' }}
      >
        {/* Glow ring */}
        {isFirst && (
          <motion.div
            className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-md"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Badge */}
        <div className={`
          relative px-6 py-3 rounded-full
          ${isFirst
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
            : 'bg-slate-800/80 border border-slate-700'
          }
        `}>
          <span className={`
            text-lg font-bold font-mono
            ${isFirst ? 'text-white' : 'text-slate-300'}
          `}>
            {year}
          </span>
        </div>

        {/* Decorative lines */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
